# Leo y Comprendo 📖

Aplicación web para ayudar a niños y niñas con necesidades educativas específicas
(dislexia, TDAH, TEA, discapacidad intelectual leve, entre otras) a practicar la
**comprensión lectora** de forma accesible, motivadora y sin presión de tiempo.

## Características

- **Cuentos cortos paginados**: un párrafo por pantalla, con emoji ilustrativo, para
  no saturar la atención del niño o niña.
- **Lectura en voz alta** (Web Speech API) con **resaltado de la palabra** que se
  está leyendo, y velocidad de voz ajustable.
- **Preguntas de comprensión** de opción múltiple, una a la vez, con
  retroalimentación inmediata, positiva y por voz. Se puede reintentar sin castigo.
- **Sistema de estrellas** para motivar el progreso, guardado en el dispositivo
  (`localStorage`), sin necesidad de cuentas ni conexión a un servidor.
- **Panel de accesibilidad** con:
  - Tamaño de texto (4 niveles).
  - Temas de color: claro, oscuro, pastel y alto contraste.
  - Tipografía pensada para lectura fácil (Lexend).
  - Mayor espaciado entre letras y líneas.
  - Reducción de animaciones.
- Botones grandes, navegación simple y predecible, y textos en lenguaje sencillo.

## Cómo usarla

No requiere instalación ni compilación: es HTML/CSS/JS puro.

```bash
# Desde la carpeta del proyecto
python3 -m http.server 8080
# Abrir http://localhost:8080 en el navegador
```

O simplemente abre `index.html` directamente en un navegador moderno (Chrome o
Edge recomendados por su buen soporte de síntesis de voz en español).

## Estructura

```
index.html         Pantallas de la aplicación (bienvenida, menú, lectura, preguntas, resultados)
css/styles.css      Estilos y temas de accesibilidad
js/stories.js       Banco de cuentos y preguntas de comprensión
js/app.js           Lógica de la aplicación (navegación, voz, progreso)
```

## Agregar nuevos cuentos

Edita `js/stories.js` y agrega un objeto siguiendo la misma estructura: título,
nivel, emoji, lista de párrafos (cada uno con su propio emoji) y preguntas de
opción múltiple con el índice de la respuesta correcta.
