"""Lectura automática del contenido de un curso de Moodle mediante sus
servicios web (REST).

Recorre las secciones visibles del curso y extrae el texto de páginas,
etiquetas, libros, archivos (PDF, Word, PowerPoint, texto), tareas,
cuestionarios (solo su descripción, nunca las preguntas), foros y enlaces.
"""

import io
import json
import logging
import re
import urllib.parse
import urllib.request
import zipfile
from datetime import datetime, timezone
from html.parser import HTMLParser

log = logging.getLogger("tutor.moodle")

MAX_BYTES_ARCHIVO = 25 * 1024 * 1024
EXTENSIONES_TEXTO = (".txt", ".md", ".csv")


class ErrorMoodle(Exception):
    pass


# ===== Conversión de formatos a texto =====

class _HtmlATexto(HTMLParser):
    BLOQUES = {"p", "div", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6",
               "section", "article", "blockquote", "pre", "table", "ul", "ol"}
    IGNORAR = {"script", "style", "noscript"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.partes = []
        self._ignorar = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.IGNORAR:
            self._ignorar += 1
        elif tag == "li":
            self.partes.append("\n- ")
        elif tag in self.BLOQUES:
            self.partes.append("\n")
        elif tag == "img":
            alt = dict(attrs).get("alt")
            if alt:
                self.partes.append(f" [imagen: {alt}] ")

    def handle_endtag(self, tag):
        if tag in self.IGNORAR:
            self._ignorar = max(0, self._ignorar - 1)
        elif tag in self.BLOQUES and tag != "li":
            self.partes.append("\n")

    def handle_data(self, data):
        if not self._ignorar:
            self.partes.append(data)


def html_a_texto(html):
    if not html:
        return ""
    p = _HtmlATexto()
    p.feed(html)
    texto = "".join(p.partes).replace("\xa0", " ")
    texto = re.sub(r"[ \t]+", " ", texto)
    texto = re.sub(r" *\n *", "\n", texto)
    return re.sub(r"\n{3,}", "\n\n", texto).strip()


def _xml_zip_a_texto(datos, patron_archivos, etiqueta_parrafo, etiqueta_texto):
    """Extrae texto de formatos Office/OpenDocument (que son ZIP con XML)."""
    with zipfile.ZipFile(io.BytesIO(datos)) as z:
        nombres = sorted(
            (n for n in z.namelist() if re.fullmatch(patron_archivos, n)),
            key=lambda n: [int(x) if x.isdigit() else x for x in re.split(r"(\d+)", n)],
        )
        bloques = []
        for nombre in nombres:
            xml = z.read(nombre).decode("utf-8", "ignore")
            parrafos = re.findall(rf"<{etiqueta_parrafo}[ >].*?</{etiqueta_parrafo}>", xml, re.S)
            lineas = []
            for par in parrafos:
                textos = re.findall(rf"<{etiqueta_texto}(?: [^>]*)?>([^<]*)</{etiqueta_texto}>", par)
                linea = "".join(textos).strip()
                if linea:
                    lineas.append(linea)
            if lineas:
                bloques.append("\n".join(lineas))
        texto = "\n\n".join(bloques)
    from html import unescape
    return unescape(texto)


def extraer_texto(nombre, datos):
    """Devuelve el texto de un archivo según su extensión, o "" si no se
    puede leer (imágenes, videos, formatos no soportados)."""
    ext = "." + nombre.lower().rsplit(".", 1)[-1] if "." in nombre else ""
    try:
        if ext == ".pdf":
            from pypdf import PdfReader
            lector = PdfReader(io.BytesIO(datos))
            paginas = [(p.extract_text() or "").strip() for p in lector.pages]
            return "\n\n".join(f"[Página {i}]\n{t}" for i, t in enumerate(paginas, 1) if t)
        if ext == ".docx":
            return _xml_zip_a_texto(datos, r"word/document\.xml", "w:p", "w:t")
        if ext == ".pptx":
            return _xml_zip_a_texto(datos, r"ppt/slides/slide\d+\.xml", "a:p", "a:t")
        if ext in (".odt", ".odp"):
            return _xml_zip_a_texto(datos, r"content\.xml", "text:(?:p|h)", "text:(?:p|h|span)")
        if ext in (".html", ".htm"):
            return html_a_texto(datos.decode("utf-8", "ignore"))
        if ext in EXTENSIONES_TEXTO:
            return datos.decode("utf-8", "ignore").strip()
    except Exception as e:  # un archivo dañado no debe detener la lectura del curso
        log.warning("No se pudo leer %s: %s", nombre, e)
    return ""


def _fecha(ts):
    if not ts:
        return ""
    return datetime.fromtimestamp(ts, tz=timezone.utc).astimezone().strftime("%d/%m/%Y %H:%M")


# ===== Cliente de Moodle =====

class Moodle:
    def __init__(self, url, token, timeout=60):
        self.url = url.rstrip("/")
        self.token = token
        self.timeout = timeout

    def llamar(self, funcion, **params):
        datos = {"wstoken": self.token, "wsfunction": funcion,
                 "moodlewsrestformat": "json"}
        for clave, valor in params.items():
            if isinstance(valor, (list, tuple)):
                for i, v in enumerate(valor):
                    datos[f"{clave}[{i}]"] = v
            else:
                datos[clave] = valor
        cuerpo = urllib.parse.urlencode(datos).encode()
        req = urllib.request.Request(f"{self.url}/webservice/rest/server.php", data=cuerpo)
        with urllib.request.urlopen(req, timeout=self.timeout) as r:
            respuesta = json.loads(r.read().decode("utf-8"))
        if isinstance(respuesta, dict) and respuesta.get("exception"):
            raise ErrorMoodle(f"{funcion}: {respuesta.get('message') or respuesta.get('errorcode')}")
        return respuesta

    def llamar_opcional(self, funcion, **params):
        """Igual que llamar(), pero si la función no está habilitada en el
        servicio web devuelve None en vez de fallar."""
        try:
            return self.llamar(funcion, **params)
        except ErrorMoodle as e:
            log.info("Función opcional no disponible (%s)", e)
            return None

    def descargar(self, fileurl):
        separador = "&" if "?" in fileurl else "?"
        url = f"{fileurl}{separador}token={urllib.parse.quote(self.token)}"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=self.timeout) as r:
            tamano = int(r.headers.get("Content-Length") or 0)
            if tamano > MAX_BYTES_ARCHIVO:
                raise ErrorMoodle(f"archivo demasiado grande ({tamano} bytes)")
            datos = r.read(MAX_BYTES_ARCHIVO + 1)
        if len(datos) > MAX_BYTES_ARCHIVO:
            raise ErrorMoodle("archivo demasiado grande")
        # Moodle responde con JSON cuando el token no permite descargar archivos.
        if datos[:1] == b"{" and b'"errorcode"' in datos[:300]:
            raise ErrorMoodle(json.loads(datos).get("message", "descarga rechazada"))
        return datos

    # ----- Lectura de un curso -----

    def leer_curso(self, curso_id):
        """Devuelve un dict con el nombre del curso, los documentos de texto
        (uno por sección) y un mapa cmid -> (sección, actividad)."""
        cursos = self.llamar("core_course_get_courses_by_field", field="id", value=curso_id)
        cursos = cursos.get("courses", [])
        if not cursos:
            raise ErrorMoodle(f"El curso {curso_id} no existe o el usuario del servicio no tiene acceso.")
        info = cursos[0]
        if not info.get("visible", 1):
            raise ErrorMoodle(f"El curso {curso_id} está oculto.")

        secciones = self.llamar("core_course_get_contents", courseid=curso_id)
        extras = self._datos_por_actividad(curso_id)

        documentos, actividades = [], {}
        resumen = html_a_texto(info.get("summary", ""))
        cabecera = f"# Curso: {info.get('fullname', '')}\n"
        if resumen:
            cabecera += f"\n## Descripción del curso\n{resumen}\n"
        documentos.append(("00_curso", cabecera))

        for n, seccion in enumerate(secciones):
            if not seccion.get("visible", 1) or seccion.get("uservisible") is False:
                continue
            nombre_sec = seccion.get("name") or f"Sección {n}"
            partes = [f"# {nombre_sec}"]
            sumario = html_a_texto(seccion.get("summary", ""))
            if sumario:
                partes.append(sumario)
            for mod in seccion.get("modules", []):
                if not mod.get("visible", 1) or mod.get("uservisible") is False:
                    continue
                actividades[mod["id"]] = (nombre_sec, mod.get("name", ""))
                texto = self._texto_actividad(mod, extras.get(mod["id"], {}))
                if texto:
                    partes.append(texto)
            if len(partes) > 1:
                documentos.append((f"{n + 1:02d}_{nombre_sec}", "\n\n".join(partes)))

        return {"nombre": info.get("fullname", f"Curso {curso_id}"),
                "nombre_corto": info.get("shortname", ""),
                "documentos": documentos, "actividades": actividades}

    def _datos_por_actividad(self, curso_id):
        """Información extra que core_course_get_contents no trae: contenido
        de páginas y descripciones/fechas de tareas, cuestionarios y foros."""
        extras = {}

        r = self.llamar_opcional("mod_page_get_pages_by_courses", courseids=[curso_id])
        for p in (r or {}).get("pages", []):
            extras[p["coursemodule"]] = {"intro": p.get("intro", ""), "contenido": p.get("content", "")}

        r = self.llamar_opcional("mod_label_get_labels_by_courses", courseids=[curso_id])
        for l in (r or {}).get("labels", []):
            extras[l["coursemodule"]] = {"intro": l.get("intro", "")}

        r = self.llamar_opcional("mod_assign_get_assignments", courseids=[curso_id])
        for c in (r or {}).get("courses", []):
            for a in c.get("assignments", []):
                extras[a["cmid"]] = {
                    "intro": a.get("intro", ""),
                    "fechas": [("Disponible desde", a.get("allowsubmissionsfromdate")),
                               ("Fecha de entrega", a.get("duedate")),
                               ("Fecha límite", a.get("cutoffdate"))],
                }

        r = self.llamar_opcional("mod_quiz_get_quizzes_by_courses", courseids=[curso_id])
        for q in (r or {}).get("quizzes", []):
            extras[q["coursemodule"]] = {
                "intro": q.get("intro", ""),
                "fechas": [("Abre", q.get("timeopen")), ("Cierra", q.get("timeclose"))],
            }

        r = self.llamar_opcional("mod_forum_get_forums_by_courses", courseids=[curso_id])
        for f in r or []:
            extras[f["cmid"]] = {"intro": f.get("intro", ""),
                                 "fechas": [("Fecha de entrega", f.get("duedate"))]}
        return extras

    def _texto_actividad(self, mod, extra):
        tipo = mod.get("modname", "")
        partes = [f"## {mod.get('name', '')} ({NOMBRES_TIPO.get(tipo, tipo)})"]

        intro = html_a_texto(extra.get("intro") or mod.get("description", ""))
        if intro:
            partes.append(intro)
        for etiqueta, ts in extra.get("fechas", []):
            if ts:
                partes.append(f"{etiqueta}: {_fecha(ts)}")
        if extra.get("contenido"):
            partes.append(html_a_texto(extra["contenido"]))

        if tipo == "url":
            for c in mod.get("contents", []):
                if c.get("fileurl"):
                    partes.append(f"Enlace: {c['fileurl']}")
        elif tipo in ("resource", "folder", "book") or (tipo == "page" and not extra.get("contenido")):
            partes.extend(self._texto_archivos(mod))

        if tipo == "label":
            # Las etiquetas no tienen título propio: su nombre es el inicio del texto.
            return f"## Nota en la página del curso\n{intro}" if intro else ""
        return "\n\n".join(p for p in partes if p)

    def _texto_archivos(self, mod):
        partes = []
        capitulos = {}  # en los libros, "1" -> título del capítulo 1
        for c in mod.get("contents", []):
            if c.get("type") == "content" and c.get("filename") == "structure":
                try:
                    pendientes = list(json.loads(c.get("content") or "[]"))
                    while pendientes:
                        cap = pendientes.pop(0)
                        capitulos[cap.get("href", "").split("/")[0]] = cap.get("title", "")
                        pendientes.extend(cap.get("subitems") or [])
                except (ValueError, AttributeError):
                    pass
        for c in mod.get("contents", []):
            if c.get("type") != "file" or not c.get("fileurl"):
                continue
            nombre = c.get("filename", "")
            if mod.get("modname") in ("book", "page") and nombre != "index.html":
                continue  # imágenes y adjuntos de los capítulos
            if (c.get("filesize") or 0) > MAX_BYTES_ARCHIVO:
                log.warning("Se omite %s: supera el tamaño máximo", nombre)
                continue
            try:
                texto = extraer_texto(nombre, self.descargar(c["fileurl"]))
            except Exception as e:
                log.warning("No se pudo descargar %s: %s", nombre, e)
                continue
            if texto:
                if mod.get("modname") == "book":
                    num = c.get("filepath", "/").strip("/")
                    titulo = capitulos.get(num) or f"Capítulo {num}"
                else:
                    titulo = nombre
                partes.append(f"### {titulo or nombre}\n{texto}")
        return partes


NOMBRES_TIPO = {
    "page": "página", "label": "etiqueta", "resource": "archivo", "folder": "carpeta",
    "book": "libro", "url": "enlace", "assign": "tarea", "quiz": "cuestionario",
    "forum": "foro", "lesson": "lección", "glossary": "glosario", "wiki": "wiki",
    "feedback": "encuesta", "choice": "consulta", "h5pactivity": "actividad H5P",
    "scorm": "paquete SCORM", "lti": "herramienta externa", "workshop": "taller",
    "data": "base de datos", "chat": "chat",
}
