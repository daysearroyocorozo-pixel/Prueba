# Aula Simulada EGB 🏫

Simulador de clases para la **formación docente de la carrera de Educación Básica**.
El usuario asume el **rol de docente** y dicta una clase a un grupo de **estudiantes
virtuales** que responden, se distraen, hacen preguntas y aprenden según su perfil.
Funciona en **computadora, celular y gafas de realidad aumentada** (WebXR).

## Características

- **4 subniveles de EGB**: Preparatoria (1.º), Elemental (2.º–4.º), Media (5.º–7.º) y Superior (8.º–10.º).
- **4 áreas**: Matemática, Ciencias Naturales, Ciencias Sociales y Lengua y Comunicación,
  con 2 temas por área y subnivel (32 temas). En Matemática se generan además preguntas aleatorias.
- **Estudiantes virtuales con perfiles**: aplicado/a, tímido/a, se distrae, conversador/a,
  curioso/a, requiere refuerzo, promedio y estudiantes con **NEE** (TDAH, dislexia).
  Cada uno tiene atención, comprensión y motivación que cambian según las decisiones del docente.
- **Clase completa según el ciclo de aprendizaje (ERCA)**:
  - *Anticipación*: saludar y motivar, presentar el objetivo, activar conocimientos previos.
  - *Construcción*: explicar en la pizarra, hacer preguntas y elegir quién responde,
    resolver ejercicios frente a la clase, trabajo colaborativo.
  - *Consolidación*: evaluación rápida (todos responden, con gráfico), resumen y tarea.
  - *Gestión del aula*: llamar la atención, apoyo individual, pedir silencio, pausa activa.
- **Retroalimentación docente**: felicitar, pedir el razonamiento, dar pistas, explicar el error,
  pasar a otro estudiante o corregir de forma negativa, cada opción con efectos distintos.
- **Situaciones imprevistas**: distracciones, celulares, conversaciones, cansancio,
  “no entiendo” y **preguntas de los estudiantes** que el docente debe responder.
- **Voz**: los estudiantes hablan con síntesis de voz (tono distinto para cada uno) y el docente
  puede dar **órdenes por voz** (🎤), por ejemplo “Sofía, responde”, “muy bien”, “pausa activa”.
- **Evaluación del desempeño** con rúbrica de 100 puntos (estructura, comprensión lograda,
  clima de aula, equidad en la participación, retroalimentación formativa, inclusión),
  recomendaciones pedagógicas, estado de cada estudiante y registro completo de la clase.
  Se puede imprimir o guardar como PDF y descargar en JSON. Historial guardado en el dispositivo.
- **Vista 3D** del aula (arrastrar para girar, pellizcar para acercar, tocar un estudiante).
- **Realidad aumentada**:
  - **Gafas de RA/RM con WebXR** (Meta Quest 3/3S/Pro, Android XR, Magic Leap 2, Pico…):
    el aula aparece **a tamaño real** alrededor del docente; un **panel flotante** sigue la
    mirada con las opciones de la clase, y se interactúa apuntando o pellizcando.
  - **Celulares Android con ARCore** (Chrome): se detecta una superficie y se coloca el aula
    **en miniatura sobre la mesa**; la interfaz se muestra superpuesta a la cámara.
  - **Celulares sin WebXR (iPhone)**: modo alternativo con cámara + giroscopio.
  - Botón **↕ Escala** para alternar entre miniatura y tamaño real.
- **Gafas sencillas tipo VR Box / cardboard** (botón **📱 VR Box**, en los cuatro simuladores):
  el celular va dentro del visor; la pantalla se divide en dos (visión estereoscópica) y la
  vista sigue el movimiento de la cabeza con el giroscopio. Abajo flota un panel con el texto
  y las opciones. Para elegir: mirar un botón 1,6 s (aparece un anillo amarillo de carga) o
  usar el control Bluetooth del visor (joystick/flechas o volumen para moverse, gatillo/Enter
  para elegir). En EGB, mirar a un estudiante y pulsar el gatillo le da la palabra.
  Requiere HTTPS para el giroscopio; en iPhone se pide permiso de movimiento.

## Módulos alineados con la malla de Educación Básica

Desde el menú principal se accede a:

- **Dictar una clase**: el aula simulada descrita arriba.
- **Planificar y dictar**: planificación microcurricular (objetivo, modelo, actividades y minutos por fase,
  recursos, evaluación y adaptaciones curriculares) con retroalimentación; luego se dicta la clase y el
  reporte mide la coherencia entre lo planificado y lo ejecutado.
- **Evaluar resultados**: media, mediana, rango, escala cualitativa (DAR, AAR, PAAR, NAAR), refuerzo
  académico y decisiones pedagógicas, con las notas de la clase dictada o de un curso simulado.
- **Casos profesionales**: 8 casos (familias, interculturalidad, rutas de actuación, acoso, calificaciones,
  adaptaciones, proyectos educativos) con personajes que reaccionan y fundamento de cada decisión.
- **Mapa curricular**: las 23 asignaturas por PAO y el módulo con el que se relaciona cada una
  (datos en `js/curriculum.js`).

## Cómo usarlo

Es HTML/CSS/JS puro, sin compilación ni dependencias externas (three.js está incluido en
`vendor/`, por lo que funciona sin internet en el laboratorio).

```bash
# desde la raíz del repositorio
python3 -m http.server 8080
# abrir http://localhost:8080/simulador/
```

> **Realidad aumentada**: los navegadores exigen **HTTPS** para WebXR y la cámara.
> Publique la carpeta en un servidor con HTTPS (por ejemplo GitHub Pages o el servidor
> institucional) y abra la dirección desde el navegador de las gafas o del celular.

## Estructura

```
simulador/
├── index.html          Pantallas: inicio, preparación, aula y reporte
├── css/sim.css         Estilos responsive (celular/computadora), tema claro/oscuro
├── js/content.js       Banco curricular: subniveles, áreas, temas, preguntas, dudas
├── js/sim.js           Motor de simulación: perfiles, estados, acciones y evaluación
├── js/curriculum.js    Malla, opciones de planificación, escala de calificaciones y casos
├── js/modules.js       Menú, planificación, evaluación, casos y mapa curricular
├── js/app.js           Interfaz: aula 2D, diálogo, acciones, voz, reporte, historial
├── js/ar.js            Vista 3D y realidad aumentada (WebXR + modo cámara)
└── vendor/three.module.min.js   three.js r160 (MIT)
```

## Agregar o editar contenidos

En `js/content.js`, cada tema dentro de `CONTENT[área][subnivel]` tiene:
`titulo`, `objetivo`, `previo` (pregunta y respuestas de los estudiantes), `explicacion`
(puntos de la pizarra), `preguntas` (`q`, opciones `o`, índice correcto `c`, `pista`, `porque`),
`ejercicio` (con `pasos`), `dudas` (preguntas de estudiantes al docente) y `tarea`.
Opcionalmente `gen()` genera preguntas aleatorias.
