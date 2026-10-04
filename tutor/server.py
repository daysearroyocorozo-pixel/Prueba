"""Tutor virtual para el aula: responde dudas de los estudiantes sobre los
contenidos del curso.

Con Moodle configurado, el tutor lee por sí solo el contenido de cada curso
(secciones, páginas, archivos, tareas…) mediante los servicios web de Moodle y
lo mantiene actualizado. Sin Moodle, usa el material de la carpeta `curso/`.

Las respuestas las genera Claude a partir de ese material. Sin credenciales de
la API, funciona en "modo básico": busca en el material la sección más
relacionada con la pregunta y la muestra.

Uso:
    pip install -r requirements.txt
    export ANTHROPIC_API_KEY=...          # opcional; sin clave usa el modo básico
    export TUTOR_MOODLE_URL=https://aula.mi-instituto.edu.ec
    export TUTOR_MOODLE_TOKEN=...         # token del servicio web de Moodle
    python server.py                      # http://localhost:5000

    python server.py --probar-curso 25    # muestra lo que el tutor lee del curso 25
"""

import hmac
import json
import logging
import math
import os
import re
import sys
import threading
import time
import unicodedata
import urllib.parse
from collections import defaultdict, deque
from datetime import datetime
from pathlib import Path

import anthropic
from flask import Flask, Response, jsonify, request, send_from_directory

from moodle import ErrorMoodle, Moodle

BASE_DIR = Path(__file__).resolve().parent
CURSO_DIR = Path(os.environ.get("TUTOR_CURSO_DIR", BASE_DIR / "curso"))
CACHE_DIR = Path(os.environ.get("TUTOR_CACHE_DIR", BASE_DIR / "cache"))
STATIC_DIR = BASE_DIR / "static"

MODEL = os.environ.get("TUTOR_MODEL", "claude-opus-5-5")
EFFORT = os.environ.get("TUTOR_EFFORT", "medium")
MAX_TOKENS = 16000
MAX_HISTORIAL = 20          # mensajes de la conversación que se reenvían
MAX_CARACTERES = 4000       # longitud máxima de cada mensaje del estudiante
LIMITE_POR_MINUTO = int(os.environ.get("TUTOR_LIMITE_POR_MINUTO", "15"))
# Material máximo por curso (~4 caracteres por token).
MAX_MATERIAL = int(os.environ.get("TUTOR_MAX_CARACTERES_CURSO", "1200000"))
# Cada cuántos minutos se vuelve a leer un curso de Moodle.
ACTUALIZAR_MIN = int(os.environ.get("TUTOR_ACTUALIZAR_MINUTOS", "120"))

MOODLE_URL = os.environ.get("TUTOR_MOODLE_URL", "").rstrip("/")
MOODLE_TOKEN = os.environ.get("TUTOR_MOODLE_TOKEN", "")
MOODLE = Moodle(MOODLE_URL, MOODLE_TOKEN) if MOODLE_URL and MOODLE_TOKEN else None
CURSOS_PERMITIDOS = {c.strip() for c in os.environ.get("TUTOR_CURSOS_PERMITIDOS", "").split(",") if c.strip()}
CLAVE_ADMIN = os.environ.get("TUTOR_CLAVE_ADMIN", "")

log = logging.getLogger("tutor")


# ===== Configuración general =====

def cargar_config():
    ruta = CURSO_DIR / "config.json"
    config = {
        "curso": "Curso",
        "tutor": "Tutor Virtual",
        "docente": "el/la docente del curso",
        "contacto_docente": "el foro de consultas del aula virtual",
        "bienvenida": "¡Hola! Soy el tutor virtual del curso. ¿Qué duda tienes?",
        "sugerencias": [],
        "sugerencias_moodle": [
            "¿De qué trata este curso?",
            "¿Qué actividades tengo pendientes y cuándo se entregan?",
            "Explícame el tema que estoy viendo",
            "Hazme preguntas de repaso sobre esta unidad",
        ],
    }
    if ruta.exists():
        config.update(json.loads(ruta.read_text(encoding="utf-8")))
    return config


CONFIG = cargar_config()


# ===== Búsqueda en el material (modo básico) =====

PALABRAS_VACIAS = set("""
a al algo como con cual cuales cuando de del donde el ella en entre es esa ese
eso esta este esto hay la las le les lo los me mi mas para pero por que quien
se ser si sin sobre son su sus te tu un una uno unos unas y ya o u qué cómo
cuál cuáles dónde explica explicame dame puedes favor hola gracias
""".split())


def normalizar(texto):
    texto = unicodedata.normalize("NFD", texto.lower())
    texto = "".join(c for c in texto if unicodedata.category(c) != "Mn")
    return [p for p in re.findall(r"[a-zñ0-9]+", texto)
            if p not in PALABRAS_VACIAS and len(p) > 1]


def raiz(palabra):
    # Reducción muy simple para que "adaptaciones" coincida con "adaptacion".
    for sufijo in ("aciones", "acion", "es", "s"):
        if palabra.endswith(sufijo) and len(palabra) - len(sufijo) >= 4:
            return palabra[: -len(sufijo)]
    return palabra


def dividir_secciones(documentos):
    secciones = []
    for nombre, texto in documentos:
        titulo_doc = ""
        actual_titulo, actual_lineas = "", []
        for linea in texto.splitlines():
            m = re.match(r"^(#{1,3})\s+(.*)", linea)
            if m:
                if actual_lineas and any(l.strip() for l in actual_lineas):
                    secciones.append((titulo_doc, actual_titulo, "\n".join(actual_lineas).strip()))
                if len(m.group(1)) == 1:
                    titulo_doc = m.group(2).strip()
                actual_titulo, actual_lineas = m.group(2).strip(), []
            else:
                actual_lineas.append(linea)
        if actual_lineas and any(l.strip() for l in actual_lineas):
            secciones.append((titulo_doc, actual_titulo, "\n".join(actual_lineas).strip()))
    return secciones


def unir_lineas(texto):
    """Une las líneas cortadas a mano dentro de párrafos y viñetas."""
    return re.sub(r"(?<!\n)\n(?!\n|\s*[-*]\s|\s*\d+[.)]\s|#)[ \t]*", " ", texto)


# ===== Curso: material, prompt y búsqueda =====

def construir_system_prompt(nombre_curso, documentos):
    material = "\n\n".join(
        f'<documento nombre="{nombre}">\n{texto}\n</documento>'
        for nombre, texto in documentos
    )
    c = CONFIG
    return f"""Eres {c["tutor"]}, el tutor virtual del curso "{nombre_curso}" en el aula virtual de una institución educativa. Tu función es ayudar a los estudiantes a despejar dudas sobre los contenidos del curso en el momento en que las tienen.

Cómo responder:
- Responde siempre en español, con un tono cercano, respetuoso y motivador. Trata al estudiante de "tú".
- Basa tus respuestas en el material del curso que aparece abajo. Cuando uses información del material, indica de qué sección o recurso proviene (por ejemplo: "según la página «Los tres principios del DUA» de la Unidad 3").
- Si la pregunta se relaciona con el tema del curso pero el material no la cubre, puedes responder con conocimiento general, aclarando que eso no está en el material del curso y que conviene confirmarlo con {c["docente"]}.
- Si la pregunta no tiene relación con el curso, explícalo con amabilidad y redirige la conversación hacia los contenidos.
- Explica con claridad y en pasos cortos. Usa ejemplos concretos y, cuando ayude, termina con una pregunta breve para comprobar que el estudiante entendió.
- Sé breve: normalmente entre 1 y 4 párrafos o una lista corta. Puedes usar formato Markdown sencillo (negritas, listas).
- La plataforma añade automáticamente a la pregunta un bloque <contexto> con la fecha de hoy y, si se conoce, la actividad que el estudiante tiene abierta. Úsalo para entender a qué se refiere (por ejemplo "este tema" o "esta tarea") y para calcular plazos, pero no lo menciones si no hace falta.

Integridad académica:
- No resuelvas por el estudiante las tareas, cuestionarios, foros, exámenes o proyectos calificados. En su lugar, explica los conceptos necesarios, haz preguntas que lo guíen, sugiere una estructura o revisa y comenta lo que él mismo haya escrito.
- Nunca inventes fechas, notas, porcentajes ni reglas del curso. Si no están en el material, dilo.

Temas administrativos:
- Para consultas sobre calificaciones personales, prórrogas, justificaciones o problemas técnicos del aula virtual, indica que deben comunicarse con {c["docente"]} a través de {c["contacto_docente"]}.

Bienestar:
- Si un estudiante expresa angustia, una situación de riesgo o pide ayuda personal, responde con empatía y recomiéndale buscar apoyo en el Departamento de Bienestar Estudiantil de la institución o con {c["docente"]}.

Material del curso (leído del aula virtual):
<material_del_curso>
{material}
</material_del_curso>"""


def limitar_material(documentos, maximo):
    total = sum(len(t) for _, t in documentos)
    if total <= maximo:
        return documentos
    log.warning("El material (%d caracteres) supera el máximo (%d); se recorta el final. "
                "Sube TUTOR_MAX_CARACTERES_CURSO si necesitas incluirlo todo.", total, maximo)
    recortados, usado = [], 0
    for nombre, texto in documentos:
        disponible = maximo - usado
        if disponible <= 0:
            break
        if len(texto) > disponible:
            texto = texto[:disponible] + "\n[… material recortado por longitud …]"
        recortados.append((nombre, texto))
        usado += len(texto)
    return recortados


class Curso:
    def __init__(self, id, nombre, documentos, actividades=None, cargado=None, es_moodle=False):
        self.id = str(id)
        self.nombre = nombre
        self.documentos = limitar_material(documentos, MAX_MATERIAL)
        self.actividades = {int(k): tuple(v) for k, v in (actividades or {}).items()}
        self.cargado = cargado or time.time()
        self.es_moodle = es_moodle
        self.system_prompt = construir_system_prompt(nombre, self.documentos)
        self.secciones = dividir_secciones(self.documentos)
        self._tokens = [[raiz(p) for p in normalizar(f"{doc} {tit} {tit} {cuerpo}")]
                        for doc, tit, cuerpo in self.secciones]
        self._df = defaultdict(int)
        for toks in self._tokens:
            for t in set(toks):
                self._df[t] += 1

    def a_dict(self):
        return {"id": self.id, "nombre": self.nombre, "documentos": self.documentos,
                "actividades": self.actividades, "cargado": self.cargado}

    def buscar(self, pregunta, limite=2):
        terminos = {raiz(p) for p in normalizar(pregunta)}
        n = len(self.secciones)
        puntajes = []
        for i, toks in enumerate(self._tokens):
            if not toks:
                continue
            puntaje = sum(
                (toks.count(t) / (1 + math.log(len(toks)))) * math.log(1 + n / self._df[t])
                for t in terminos if self._df.get(t)
            )
            if puntaje > 0:
                puntajes.append((puntaje, i))
        puntajes.sort(reverse=True)
        # Solo se muestran secciones con una relevancia cercana a la mejor.
        return [self.secciones[i] for p, i in puntajes[:limite] if p >= puntajes[0][0] * 0.6]

    def respuesta_basica(self, pregunta):
        resultados = self.buscar(pregunta)
        if not resultados:
            return (
                "No encontré esa información en el material del curso. "
                "Intenta formular la pregunta con otras palabras o consulta con "
                f"{CONFIG['docente']} en {CONFIG['contacto_docente']}."
            )
        partes = ["Encontré esto en el material del curso:"]
        for doc, titulo, cuerpo in resultados:
            encabezado = f"{doc} — {titulo}" if doc != titulo else doc
            partes.append(f"**{encabezado}**\n\n{unir_lineas(cuerpo)}")
        partes.append("_(Modo básico: el tutor está mostrando fragmentos del material sin IA.)_")
        return "\n\n".join(partes)


def curso_local():
    docs = []
    for ruta in sorted(CURSO_DIR.iterdir()):
        if ruta.suffix.lower() in (".md", ".txt") and ruta.is_file():
            docs.append((ruta.name, ruta.read_text(encoding="utf-8").strip()))
    return Curso("local", CONFIG["curso"], docs)


# ===== Almacén de cursos (memoria + disco) con actualización automática =====

class ErrorCurso(Exception):
    pass


class Almacen:
    def __init__(self):
        self.cursos = {}
        self.cargando = {}            # id -> threading.Event
        self.errores = {}             # id -> hora del último fallo al leerlo
        self.lock = threading.Lock()
        self.local = None

    def _ruta_cache(self, id):
        return CACHE_DIR / f"curso_{id}.json"

    def _leer_disco(self, id):
        ruta = self._ruta_cache(id)
        if not ruta.exists():
            return None
        try:
            d = json.loads(ruta.read_text(encoding="utf-8"))
            return Curso(d["id"], d["nombre"], [tuple(x) for x in d["documentos"]],
                         d.get("actividades"), d.get("cargado"), es_moodle=True)
        except (ValueError, KeyError) as e:
            log.warning("Caché dañada para el curso %s: %s", id, e)
            return None

    def _cargar_de_moodle(self, id):
        inicio = time.time()
        datos = MOODLE.leer_curso(int(id))
        curso = Curso(id, datos["nombre"], datos["documentos"], datos["actividades"], es_moodle=True)
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        tmp = self._ruta_cache(id).with_suffix(".tmp")
        tmp.write_text(json.dumps(curso.a_dict(), ensure_ascii=False), encoding="utf-8")
        tmp.replace(self._ruta_cache(id))
        log.info("Curso %s «%s» leído de Moodle en %.1f s (%d caracteres, %d secciones)",
                 id, curso.nombre, time.time() - inicio,
                 sum(len(t) for _, t in curso.documentos), len(curso.secciones))
        return curso

    def _actualizar(self, id):
        try:
            curso = self._cargar_de_moodle(id)
            with self.lock:
                self.cursos[id] = curso
                self.errores.pop(id, None)
        except Exception as e:
            log.error("No se pudo leer el curso %s de Moodle: %s", id, e)
            with self.lock:
                self.errores[id] = time.time()
            raise
        finally:
            with self.lock:
                evento = self.cargando.pop(id, None)
            if evento:
                evento.set()

    def _iniciar_carga(self, id):
        """Lanza la lectura en segundo plano si no hay otra en curso."""
        with self.lock:
            if id in self.cargando:
                return self.cargando[id]
            evento = self.cargando[id] = threading.Event()

        def tarea():
            try:
                self._actualizar(id)
            except Exception:
                pass
        threading.Thread(target=tarea, daemon=True).start()
        return evento

    def obtener(self, id, esperar=True):
        if not MOODLE or not id or id == "local":
            if self.local is None:
                self.local = curso_local()
            return self.local

        id = str(id)
        if not id.isdigit() or int(id) <= 1:
            raise ErrorCurso("Curso no válido.")
        if CURSOS_PERMITIDOS and id not in CURSOS_PERMITIDOS:
            raise ErrorCurso("El tutor no está habilitado para este curso.")

        with self.lock:
            curso = self.cursos.get(id)
        if curso is None:
            curso = self._leer_disco(id)
            if curso:
                with self.lock:
                    self.cursos[id] = curso

        if curso is not None:
            if time.time() - curso.cargado > ACTUALIZAR_MIN * 60:
                self._iniciar_carga(id)   # se responde con lo que hay mientras se actualiza
            return curso

        # Tras un fallo se espera un minuto antes de volver a intentarlo.
        if time.time() - self.errores.get(id, 0) < 60:
            raise ErrorCurso("No pude leer el contenido de este curso. Avisa a tu docente.")
        evento = self._iniciar_carga(id)
        if not esperar:
            return None
        evento.wait(timeout=600)
        with self.lock:
            curso = self.cursos.get(id)
        if curso is None:
            raise ErrorCurso("No pude leer el contenido de este curso. Avisa a tu docente.")
        return curso

    def recargar(self, id):
        self._actualizar(str(id))


ALMACEN = Almacen()


# ===== Claude =====

def hay_credenciales():
    modo = os.environ.get("TUTOR_MODO", "auto").lower()
    if modo in ("ia", "basico"):
        return modo == "ia"
    return any(os.environ.get(v) for v in
               ("ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "ANTHROPIC_PROFILE"))


USAR_IA = hay_credenciales()
client = anthropic.Anthropic() if USAR_IA else None

DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]


def contexto_pregunta(curso, cm):
    ahora = datetime.now()
    partes = [f"Hoy es {DIAS[ahora.weekday()]} {ahora:%d/%m/%Y}, {ahora:%H:%M}."]
    if cm and cm in curso.actividades:
        seccion, actividad = curso.actividades[cm]
        partes.append(f"El estudiante tiene abierta la actividad «{actividad}» de la sección «{seccion}».")
    elif curso.es_moodle:
        partes.append("El estudiante está en la página principal del curso.")
    return "<contexto>" + " ".join(partes) + "</contexto>"


def responder_con_claude(curso, mensajes, cm):
    """Genera eventos (tipo, texto) con la respuesta en streaming."""
    # El contexto (fecha y actividad abierta) va solo en la última pregunta,
    # para que el resto del historial siga aprovechando el caché.
    ultima = mensajes[-1]
    mensajes = mensajes[:-1] + [{"role": "user", "content": [
        {"type": "text", "text": contexto_pregunta(curso, cm)},
        {"type": "text", "text": ultima["content"]},
    ]}]
    with client.beta.messages.stream(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        # El material del curso es estable: se guarda en caché entre preguntas.
        system=[{"type": "text", "text": curso.system_prompt,
                 "cache_control": {"type": "ephemeral"}}],
        messages=mensajes,
        output_config={"effort": EFFORT},
        # Si un filtro de seguridad rechaza la petición, se reintenta en otro modelo.
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
    ) as stream:
        for texto in stream.text_stream:
            yield "text", texto
        final = stream.get_final_message()

    if final.stop_reason == "refusal":
        yield "replace", (
            "Lo siento, no puedo ayudarte con esa consulta. Si tienes dudas "
            f"sobre los contenidos del curso, con gusto te ayudo, o puedes "
            f"escribir a {CONFIG['docente']} en {CONFIG['contacto_docente']}."
        )
    elif final.stop_reason == "max_tokens":
        yield "text", "\n\n_(La respuesta se cortó por ser muy larga. Pídeme que continúe.)_"

    u = final.usage
    log.info("curso=%s uso: entrada=%s cache_leido=%s cache_escrito=%s salida=%s",
             curso.id, u.input_tokens, u.cache_read_input_tokens,
             u.cache_creation_input_tokens, u.output_tokens)


# ===== Aplicación web =====

app = Flask(__name__, static_folder=None)
_peticiones = defaultdict(deque)


def limite_superado(ip):
    ahora = time.time()
    cola = _peticiones[ip]
    while cola and ahora - cola[0] > 60:
        cola.popleft()
    if len(cola) >= LIMITE_POR_MINUTO:
        return True
    cola.append(ahora)
    return False


def origen(url):
    p = urllib.parse.urlsplit(url or "")
    return f"{p.scheme}://{p.netloc}" if p.scheme and p.netloc else ""


ORIGENES_MARCO = [o for o in [origen(MOODLE_URL)] +
                  [origen(u) for u in os.environ.get("TUTOR_ORIGENES_PERMITIDOS", "").split(",")] if o]


def validar_mensajes(mensajes):
    """Limpia el historial recibido del navegador: solo texto, roles
    alternados, empieza y termina con el estudiante."""
    if not isinstance(mensajes, list) or not mensajes:
        raise ValueError("Falta la pregunta.")
    limpios = []
    for m in mensajes[-MAX_HISTORIAL:]:
        if not isinstance(m, dict) or m.get("role") not in ("user", "assistant"):
            raise ValueError("Formato de mensaje no válido.")
        contenido = m.get("content")
        if not isinstance(contenido, str) or not contenido.strip():
            continue
        contenido = contenido.strip()[:MAX_CARACTERES]
        if limpios and limpios[-1]["role"] == m["role"]:
            limpios[-1]["content"] += "\n\n" + contenido
        else:
            limpios.append({"role": m["role"], "content": contenido})
    while limpios and limpios[0]["role"] != "user":
        limpios.pop(0)
    if not limpios or limpios[-1]["role"] != "user":
        raise ValueError("El último mensaje debe ser una pregunta del estudiante.")
    return limpios


def entero(valor):
    try:
        return int(valor)
    except (TypeError, ValueError):
        return None


def sse(tipo, texto=""):
    return f"data: {json.dumps({'type': tipo, 'text': texto}, ensure_ascii=False)}\n\n"


@app.get("/")
def inicio():
    curso = request.args.get("curso", "")
    if MOODLE and curso:
        try:
            ALMACEN.obtener(curso, esperar=False)   # empieza a leer el curso si hace falta
        except ErrorCurso:
            pass
    respuesta = send_from_directory(STATIC_DIR, "index.html")
    # Solo el aula virtual (y el propio tutor) pueden mostrar el chat dentro de un iframe.
    respuesta.headers["Content-Security-Policy"] = "frame-ancestors " + " ".join(["'self'"] + ORIGENES_MARCO)
    return respuesta


@app.get("/widget.js")
def widget():
    respuesta = send_from_directory(STATIC_DIR, "widget.js", mimetype="application/javascript")
    respuesta.headers["Cache-Control"] = "public, max-age=3600"
    return respuesta


@app.get("/static/<path:archivo>")
def estaticos(archivo):
    return send_from_directory(STATIC_DIR, archivo)


@app.get("/api/preparar")
def preparar():
    """Lo llama el muñequito al cargar una página del curso, para que el
    contenido ya esté leído cuando el estudiante haga su primera pregunta."""
    try:
        ALMACEN.obtener(request.args.get("curso", ""), esperar=False)
    except ErrorCurso:
        pass
    return "", 204


@app.get("/api/config")
def config():
    id = request.args.get("curso", "")
    nombre = CONFIG["curso"]
    estado = "listo"
    if MOODLE and id:
        try:
            curso = ALMACEN.obtener(id, esperar=False)
        except ErrorCurso as e:
            return jsonify({"error": str(e)}), 403
        nombre = curso.nombre if curso else ""
        estado = "listo" if curso else "leyendo"
    return jsonify({
        "curso": nombre,
        "tutor": CONFIG["tutor"],
        "bienvenida": CONFIG["bienvenida"],
        "sugerencias": CONFIG["sugerencias_moodle"] if MOODLE and id else CONFIG["sugerencias"],
        "modo": "ia" if USAR_IA else "basico",
        "estado": estado,
    })


@app.post("/api/chat")
def chat():
    # Solo se aceptan preguntas enviadas desde la propia página del tutor.
    if request.headers.get("Origin") and urllib.parse.urlsplit(request.headers["Origin"]).netloc != request.host:
        return jsonify({"error": "Origen no permitido."}), 403
    if limite_superado(request.remote_addr or "desconocido"):
        return jsonify({"error": "Has enviado muchas preguntas seguidas. Espera un minuto e inténtalo de nuevo."}), 429
    datos = request.get_json(silent=True) or {}
    try:
        mensajes = validar_mensajes(datos.get("messages"))
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    try:
        curso = ALMACEN.obtener(str(datos.get("curso") or ""))
    except ErrorCurso as e:
        return jsonify({"error": str(e)}), 403
    cm = entero(datos.get("cm"))

    def generar():
        if not USAR_IA:
            yield sse("text", curso.respuesta_basica(mensajes[-1]["content"]))
            yield sse("done")
            return
        try:
            for tipo, texto in responder_con_claude(curso, mensajes, cm):
                yield sse(tipo, texto)
        except (anthropic.AuthenticationError, anthropic.PermissionDeniedError) as e:
            log.error("Credenciales de la API no válidas: %s", e)
            yield sse("replace", curso.respuesta_basica(mensajes[-1]["content"]))
        except anthropic.RateLimitError:
            yield sse("error", "El tutor está recibiendo muchas consultas. Inténtalo en unos segundos.")
        except anthropic.BadRequestError as e:
            log.error("Petición rechazada por la API: %s", e)
            yield sse("error", "No pude procesar esa pregunta. Intenta escribirla de otra forma.")
        except (anthropic.APIStatusError, anthropic.APIConnectionError) as e:
            log.error("Error de la API: %s", e)
            yield sse("error", "El tutor no está disponible en este momento. Inténtalo más tarde.")
        yield sse("done")

    return Response(generar(), mimetype="text/event-stream",
                    headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


@app.post("/api/actualizar")
def actualizar():
    """Vuelve a leer un curso de Moodle en el momento (por ejemplo, después de
    que el docente sube material nuevo). Requiere TUTOR_CLAVE_ADMIN."""
    clave = request.headers.get("X-Clave-Admin", "")
    if not CLAVE_ADMIN or not hmac.compare_digest(clave, CLAVE_ADMIN):
        return jsonify({"error": "No autorizado."}), 401
    if not MOODLE:
        return jsonify({"error": "Moodle no está configurado."}), 400
    id = request.args.get("curso", "")
    try:
        ALMACEN.obtener(id, esperar=False)   # valida el id y los cursos permitidos
        ALMACEN.recargar(id)
    except (ErrorCurso, ErrorMoodle) as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"No se pudo leer el curso: {e}"}), 502
    curso = ALMACEN.obtener(id)
    return jsonify({"curso": curso.nombre, "secciones": len(curso.secciones),
                    "caracteres": sum(len(t) for _, t in curso.documentos)})


def probar_curso(id):
    """Lee un curso de Moodle y muestra un resumen de lo que el tutor verá."""
    if not MOODLE:
        sys.exit("Configura TUTOR_MOODLE_URL y TUTOR_MOODLE_TOKEN primero.")
    datos = MOODLE.leer_curso(int(id))
    print(f"Curso: {datos['nombre']}")
    for nombre, texto in datos["documentos"]:
        print(f"\n=== {nombre} ({len(texto)} caracteres) ===")
        print(texto[:600] + ("…" if len(texto) > 600 else ""))
    total = sum(len(t) for _, t in datos["documentos"])
    print(f"\nTotal: {total} caracteres (~{total // 4} tokens), {len(datos['actividades'])} actividades.")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    if len(sys.argv) == 3 and sys.argv[1] == "--probar-curso":
        probar_curso(sys.argv[2])
        sys.exit()
    print(f"Fuente del material: {'Moodle ' + MOODLE_URL if MOODLE else 'carpeta ' + str(CURSO_DIR)}")
    print(f"Modo: {'IA (' + MODEL + ')' if USAR_IA else 'básico (sin credenciales de la API)'}")
    app.run(host=os.environ.get("HOST", "127.0.0.1"),
            port=int(os.environ.get("PORT", "5000")), threaded=True)
