# Tutor Virtual para el aula 🎓

Chat que responde las dudas de los estudiantes **sobre los contenidos del
curso**. Las respuestas se basan en el material que el docente coloca en la
carpeta `curso/`, usando Claude (Anthropic) como modelo de lenguaje.

## Qué hace

- Explica conceptos del curso en español, con ejemplos, y cita la unidad o
  sección del material de donde sale la información.
- Si la pregunta no está en el material, lo dice y recomienda confirmar con el
  docente. Si no tiene relación con el curso, redirige con amabilidad.
- **Integridad académica**: no resuelve tareas, cuestionarios ni el proyecto
  final; guía con preguntas, explica conceptos y comenta borradores del
  estudiante.
- Deriva al docente las consultas administrativas (notas, prórrogas,
  justificaciones) y a Bienestar Estudiantil los temas personales.
- Respuestas en tiempo real (streaming), preguntas sugeridas, modo claro/oscuro
  y diseño adaptable a móvil.
- **Modo básico sin IA**: si no hay clave de API, busca en el material la
  sección más relacionada con la pregunta y la muestra. Sirve para probar el
  tutor sin costo.

## Puesta en marcha

```bash
cd tutor
pip install -r requirements.txt
export ANTHROPIC_API_KEY="tu-clave"   # sin esta línea arranca en modo básico
python server.py
# Abrir http://localhost:5000
```

La clave se obtiene en https://console.anthropic.com. Nunca se envía al
navegador: solo la usa el servidor.

## Cargar el contenido de TU curso

1. Borra los archivos de ejemplo de `curso/` (`00_programa.md`,
   `01_fundamentos.md`, …).
2. Copia ahí el material del curso como archivos `.md` o `.txt`: programa o
   sílabo, contenidos de cada unidad, instrucciones de tareas, rúbricas,
   calendario, preguntas frecuentes. Si tienes PDF o Word, copia el texto en
   un `.txt`.
   - Usa títulos (`# Unidad 1`, `## Tema`) para que el tutor pueda citar la
     sección.
   - Los archivos se leen en orden alfabético; numerarlos ayuda.
3. Edita `curso/config.json`: nombre del curso, del tutor, cómo contactar al
   docente, mensaje de bienvenida y preguntas sugeridas.
4. Reinicia el servidor (`python server.py`).

Todo el material se envía como contexto en cada consulta, con **caché de
prompt**: tras la primera pregunta, el material se lee del caché a ~10 % del
costo normal durante unos minutos. Un curso típico (decenas o cientos de
páginas) cabe sin problema.

## Integrarlo en el aula virtual (Moodle u otra)

Publica el servidor en una dirección accesible (por ejemplo
`https://tutor.tu-institucion.edu.ec`) y agrégalo al curso:

- **Moodle**: *Añadir actividad o recurso → Página* (o una etiqueta / bloque
  HTML) y pega en el editor, en modo HTML:

  ```html
  <iframe src="https://tutor.tu-institucion.edu.ec/" width="100%" height="650"
          style="border:0; border-radius:12px;" title="Tutor virtual del curso"></iframe>
  ```

- **Otras plataformas** (Google Classroom, Canvas, Chamilo): agrega un enlace
  o un iframe a la misma dirección.

Para producción, ejecútalo con un servidor WSGI, por ejemplo:

```bash
pip install gunicorn
gunicorn -w 1 --threads 8 -b 0.0.0.0:5000 server:app
```

## Configuración opcional (variables de entorno)

| Variable | Valor por defecto | Para qué sirve |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | Clave de la API. Sin ella se usa el modo básico. |
| `TUTOR_MODEL` | `claude-opus-5-5` | Modelo de Claude. |
| `TUTOR_EFFORT` | `medium` | Profundidad de razonamiento: `low`, `medium`, `high`. `low` responde más rápido y cuesta menos. |
| `TUTOR_MODO` | `auto` | `ia` o `basico` para forzar un modo. |
| `TUTOR_CURSO_DIR` | `./curso` | Carpeta con el material del curso. |
| `TUTOR_LIMITE_POR_MINUTO` | `15` | Preguntas por minuto permitidas por cada dirección IP. |
| `HOST` / `PORT` | `127.0.0.1` / `5000` | Dirección del servidor. |

El servidor registra en consola los tokens usados por cada respuesta
(incluidos los leídos del caché) para controlar el costo.

## Estructura

```
tutor/
├── server.py          Servidor Flask: API del chat, Claude y modo básico
├── requirements.txt
├── curso/             Material del curso (reemplazar por el propio)
│   ├── config.json    Nombre del curso, tutor, bienvenida, sugerencias
│   └── *.md           Programa y unidades
└── static/            Interfaz del chat (HTML, CSS, JS)
```

## Privacidad

- No se piden datos personales ni se guardan conversaciones en el servidor.
  El historial vive solo en la pestaña del navegador del estudiante y se borra
  al cerrarla o con **Nueva conversación**.
- Las preguntas se envían a la API de Anthropic para generar la respuesta.
  Informa de ello a los estudiantes según la normativa de tu institución.
