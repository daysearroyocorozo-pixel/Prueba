"""Tutor virtual para el aula: responde dudas de los estudiantes sobre los
contenidos del curso.

Lee el material del curso desde la carpeta `curso/` (archivos .md o .txt) y lo
entrega a Claude como contexto, de modo que las respuestas se basen en ese
material. Si no hay credenciales de la API, funciona en "modo básico": busca en
el material la sección más relacionada con la pregunta y la muestra.

Uso:
    pip install -r requirements.txt
    export ANTHROPIC_API_KEY=...      # opcional; sin clave usa el modo básico
    python server.py                  # abre http://localhost:5000
"""

import json
import logging
import math
import os
import re
import time
import unicodedata
from collections import defaultdict, deque
from pathlib import Path

import anthropic
from flask import Flask, Response, jsonify, request, send_from_directory

BASE_DIR = Path(__file__).resolve().parent
CURSO_DIR = Path(os.environ.get("TUTOR_CURSO_DIR", BASE_DIR / "curso"))
STATIC_DIR = BASE_DIR / "static"

MODEL = os.environ.get("TUTOR_MODEL", "claude-opus-5-5")
EFFORT = os.environ.get("TUTOR_EFFORT", "medium")
MAX_TOKENS = 16000
MAX_HISTORIAL = 20          # mensajes de la conversación que se reenvían
MAX_CARACTERES = 4000       # longitud máxima de cada mensaje del estudiante
LIMITE_POR_MINUTO = int(os.environ.get("TUTOR_LIMITE_POR_MINUTO", "15"))


# ===== Material del curso =====

def cargar_config():
    ruta = CURSO_DIR / "config.json"
    config = {
        "curso": "Curso",
        "tutor": "Tutor Virtual",
        "docente": "el/la docente del curso",
        "contacto_docente": "el foro de consultas del aula virtual",
        "bienvenida": "¡Hola! Soy el tutor virtual del curso. ¿Qué duda tienes?",
        "sugerencias": [],
    }
    if ruta.exists():
        config.update(json.loads(ruta.read_text(encoding="utf-8")))
    return config


def cargar_documentos():
    """Devuelve [(nombre_archivo, texto)] ordenados por nombre para que el
    contexto sea idéntico entre peticiones (necesario para el caché)."""
    docs = []
    for ruta in sorted(CURSO_DIR.iterdir()):
        if ruta.suffix.lower() in (".md", ".txt") and ruta.is_file():
            docs.append((ruta.name, ruta.read_text(encoding="utf-8").strip()))
    return docs


CONFIG = cargar_config()
DOCUMENTOS = cargar_documentos()


def construir_system_prompt(config, documentos):
    material = "\n\n".join(
        f'<documento nombre="{nombre}">\n{texto}\n</documento>'
        for nombre, texto in documentos
    )
    return f"""Eres {config["tutor"]}, el tutor virtual del curso "{config["curso"]}" en el aula virtual de una institución educativa. Tu función es ayudar a los estudiantes a despejar dudas sobre los contenidos del curso.

Cómo responder:
- Responde siempre en español, con un tono cercano, respetuoso y motivador. Trata al estudiante de "tú".
- Basa tus respuestas en el material del curso que aparece abajo. Cuando uses información del material, indica de qué unidad o sección proviene (por ejemplo: "según la Unidad 3, sección Los tres principios del DUA").
- Si la pregunta se relaciona con el tema del curso pero el material no la cubre, puedes responder con conocimiento general, aclarando que eso no está en el material del curso y que conviene confirmarlo con {config["docente"]}.
- Si la pregunta no tiene relación con el curso, explícalo con amabilidad y redirige la conversación hacia los contenidos.
- Explica con claridad y en pasos cortos. Usa ejemplos concretos y, cuando ayude, termina con una pregunta breve para comprobar que el estudiante entendió.
- Sé breve: normalmente entre 1 y 4 párrafos o una lista corta. Puedes usar formato Markdown sencillo (negritas, listas).

Integridad académica:
- No resuelvas por el estudiante las tareas, cuestionarios, foros o el proyecto final calificados. En su lugar, explica los conceptos necesarios, haz preguntas que lo guíen, sugiere una estructura o revisa y comenta lo que él mismo haya escrito.
- Nunca inventes fechas, notas, porcentajes ni reglas del curso. Si no están en el material, dilo.

Temas administrativos:
- Para consultas sobre calificaciones personales, prórrogas, justificaciones o problemas técnicos del aula virtual, indica que deben comunicarse con {config["docente"]} a través de {config["contacto_docente"]}.

Bienestar:
- Si un estudiante expresa angustia, una situación de riesgo o pide ayuda personal, responde con empatía y recomiéndale buscar apoyo en el Departamento de Bienestar Estudiantil de la institución o con {config["docente"]}.

Material del curso:
<material_del_curso>
{material}
</material_del_curso>"""


SYSTEM_PROMPT = construir_system_prompt(CONFIG, DOCUMENTOS)


# ===== Modo básico (sin IA): búsqueda en el material =====

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


SECCIONES = dividir_secciones(DOCUMENTOS)
_TOKENS_SECCION = [
    [raiz(p) for p in normalizar(f"{doc} {tit} {tit} {cuerpo}")]
    for doc, tit, cuerpo in SECCIONES
]
_DF = defaultdict(int)
for _toks in _TOKENS_SECCION:
    for _t in set(_toks):
        _DF[_t] += 1


def buscar_en_material(pregunta, limite=2):
    terminos = {raiz(p) for p in normalizar(pregunta)}
    n = len(SECCIONES)
    puntajes = []
    for i, toks in enumerate(_TOKENS_SECCION):
        if not toks:
            continue
        puntaje = sum(
            (toks.count(t) / (1 + math.log(len(toks)))) * math.log(1 + n / _DF[t])
            for t in terminos if _DF.get(t)
        )
        if puntaje > 0:
            puntajes.append((puntaje, i))
    puntajes.sort(reverse=True)
    # Solo se muestran secciones con una relevancia cercana a la mejor.
    return [SECCIONES[i] for p, i in puntajes[:limite] if p >= puntajes[0][0] * 0.6]


def unir_lineas(texto):
    """Une las líneas cortadas a mano dentro de párrafos y viñetas."""
    return re.sub(r"(?<!\n)\n(?!\n|\s*[-*]\s|\s*\d+[.)]\s|#)[ \t]*", " ", texto)


def respuesta_basica(pregunta):
    resultados = buscar_en_material(pregunta)
    if not resultados:
        return (
            "No encontré esa información en el material del curso. "
            "Intenta formular la pregunta con otras palabras o consulta con "
            f"{CONFIG['docente']} en {CONFIG['contacto_docente']}."
        )
    partes = ["Encontré esto en el material del curso:"]
    for doc, titulo, cuerpo in resultados:
        partes.append(f"**{doc} — {titulo}**\n\n{unir_lineas(cuerpo)}")
    partes.append(
        "_(Modo básico: el tutor está mostrando fragmentos del material sin IA.)_"
    )
    return "\n\n".join(partes)


# ===== Claude =====

def hay_credenciales():
    modo = os.environ.get("TUTOR_MODO", "auto").lower()
    if modo in ("ia", "basico"):
        return modo == "ia"
    return any(os.environ.get(v) for v in
               ("ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "ANTHROPIC_PROFILE"))


USAR_IA = hay_credenciales()
client = anthropic.Anthropic() if USAR_IA else None


def responder_con_claude(mensajes):
    """Genera eventos (tipo, texto) con la respuesta en streaming."""
    with client.beta.messages.stream(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        # El material del curso es estable: se guarda en caché entre preguntas.
        system=[{"type": "text", "text": SYSTEM_PROMPT,
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
    app.logger.info(
        "uso: entrada=%s cache_leido=%s cache_escrito=%s salida=%s",
        u.input_tokens, u.cache_read_input_tokens,
        u.cache_creation_input_tokens, u.output_tokens,
    )


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


def validar_mensajes(datos):
    """Limpia el historial recibido del navegador: solo texto, roles
    alternados, empieza y termina con el estudiante."""
    mensajes = datos.get("messages") if isinstance(datos, dict) else None
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


def sse(tipo, texto=""):
    return f"data: {json.dumps({'type': tipo, 'text': texto}, ensure_ascii=False)}\n\n"


@app.get("/")
def inicio():
    return send_from_directory(STATIC_DIR, "index.html")


@app.get("/static/<path:archivo>")
def estaticos(archivo):
    return send_from_directory(STATIC_DIR, archivo)


@app.get("/api/config")
def config():
    return jsonify({
        "curso": CONFIG["curso"],
        "tutor": CONFIG["tutor"],
        "bienvenida": CONFIG["bienvenida"],
        "sugerencias": CONFIG["sugerencias"],
        "modo": "ia" if USAR_IA else "basico",
    })


@app.post("/api/chat")
def chat():
    if limite_superado(request.remote_addr or "desconocido"):
        return jsonify({"error": "Has enviado muchas preguntas seguidas. Espera un minuto e inténtalo de nuevo."}), 429
    try:
        mensajes = validar_mensajes(request.get_json(silent=True))
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    def generar():
        if not USAR_IA:
            yield sse("text", respuesta_basica(mensajes[-1]["content"]))
            yield sse("done")
            return
        try:
            for tipo, texto in responder_con_claude(mensajes):
                yield sse(tipo, texto)
        except (anthropic.AuthenticationError, anthropic.PermissionDeniedError) as e:
            app.logger.error("Credenciales de la API no válidas: %s", e)
            yield sse("replace", respuesta_basica(mensajes[-1]["content"]))
        except anthropic.RateLimitError:
            yield sse("error", "El tutor está recibiendo muchas consultas. Inténtalo en unos segundos.")
        except anthropic.BadRequestError as e:
            app.logger.error("Petición rechazada por la API: %s", e)
            yield sse("error", "No pude procesar esa pregunta. Intenta escribirla de otra forma.")
        except (anthropic.APIStatusError, anthropic.APIConnectionError) as e:
            app.logger.error("Error de la API: %s", e)
            yield sse("error", "El tutor no está disponible en este momento. Inténtalo más tarde.")
        yield sse("done")

    return Response(generar(), mimetype="text/event-stream",
                    headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    app.logger.setLevel(logging.INFO)
    print(f"Curso: {CONFIG['curso']} ({len(DOCUMENTOS)} documentos, {len(SECCIONES)} secciones)")
    print(f"Modo: {'IA (' + MODEL + ')' if USAR_IA else 'básico (sin credenciales de la API)'}")
    app.run(host=os.environ.get("HOST", "127.0.0.1"),
            port=int(os.environ.get("PORT", "5000")), threaded=True)
