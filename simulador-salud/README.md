# Martin´s Capacitaciones · Simulador de Salud 🩺

Simulador web interactivo de capacitación en el área de salud, con la identidad
visual de **Martin´s Capacitaciones** (azul marino `#223146` y arena `#C6AE96`).
Funciona en **celular, tablet y computadora**, sin instalación ni cuentas, y se
puede instalar como app (PWA) y usar sin conexión después de la primera visita.

## Cursos incluidos (18)

| Área | Cursos |
|------|--------|
| Enfermería | Signos vitales · Administración de medicamentos e inyectables · Canalización venosa y fluidoterapia · Electrocardiografía básica |
| Emergencias | RCP y Soporte Vital Básico · Primeros auxilios y triaje START |
| Farmacia | Auxiliar de Farmacia · Farmacología básica |
| Odontología | Asistente de Odontología (FDI, odontograma, instrumental) · Odontología preventiva e higiene bucal |
| Cirugía menor | Técnicas de sutura · Instrumentación quirúrgica |
| Geriatría | Cuidado del adulto mayor (UPP, caídas, movilización) |
| Laboratorio | Laboratorio clínico y toma de muestras |
| Bioseguridad | Bioseguridad y control de infecciones |
| Materno-infantil | Enfermería materno-infantil y pediátrica (Apgar, dosis por peso) |
| Rehabilitación | Fisioterapia y rehabilitación |
| Nutrición | Nutrición clínica y alimentación saludable |

## Cada curso tiene 7 secciones

1. **📘 Teoría** – lecciones cortas con narración en voz alta.
2. **✋ Práctica 2D** – simuladores interactivos:
   - *Secuencia*: ordenar los pasos de un procedimiento (lavado de manos, RCP, IM…).
   - *Anatomía*: tocar la zona correcta (pulsos, sitios de inyección, venas, UPP, electrodos, odontograma FDI).
   - *Cálculo*: dosis, goteo, dosis pediátrica, diluciones, IMC, FC en el ECG (valores aleatorios).
   - *Monitor*: signos vitales y ritmos de ECG animados en tiempo real.
   - *Sutura*: dar puntos simples con el dedo o el mouse; evalúa ángulo, simetría y separación.
   - *RCP*: entrenador de compresiones con medidor de frecuencia (100–120/min) y metrónomo.
   - *Caso clínico* y *Clasificar* (triaje, residuos, tubos, instrumental, fármacos…).
3. **🧊 3D** – modelo 3D con puntos interactivos (cuerpo humano, brazo con venas,
   arcada dental, corte de un diente, piel con sutura, farmacia, mesa de Mayo,
   cama hospitalaria, laboratorio, residuos, plato saludable, corazón y electrodos) + **Reto 3D**.
4. **🎬 Cine** – recorrido cinematográfico narrado por cada punto clave.
5. **🥽 VR / AR**
   - **VR** con visores WebXR (Meta Quest, Pico, etc.): modelo a tamaño real y selección con los mandos.
   - **AR** en Android con Chrome (ARCore): coloca el modelo sobre una mesa o el piso.
   - **Cardboard**: pantalla dividida + giroscopio para gafas de cartón; se selecciona mirando 1,5 s.
6. **📝 Evaluación** – preguntas aleatorias con retroalimentación; se aprueba con 70 %.
7. **🎓 Certificado** – imprimible / PDF con el logo, nombre, horas, nota y código de verificación.

Además: puntos ⭐, progreso por curso, tema claro/oscuro, tamaño de texto,
velocidad de narración y opción de reducir animaciones.

## Cómo usarlo

Es HTML/CSS/JS puro. Para que el 3D funcione hay que servirlo desde un servidor web
(los módulos JavaScript no cargan abriendo el archivo directamente):

```bash
cd simulador-salud
python3 -m http.server 8080
# Abrir http://localhost:8080
```

**Para usarlo desde el celular** lo más fácil es publicarlo con **GitHub Pages**
(Settings → Pages → rama `main`, carpeta `/root`) y abrir
`https://<usuario>.github.io/<repositorio>/simulador-salud/`.
VR y AR requieren **https**, que GitHub Pages ya incluye.

## Estructura

```
index.html            Interfaz (inicio, curso, ajustes)
css/styles.css         Estilos y colores de la marca
js/data.js             Banco de cursos: lecciones, prácticas, escenas 3D y evaluaciones
js/sims2d.js           Motores de práctica 2D
js/scene3d.js          Visor 3D / Cine / VR / AR / Cardboard (Three.js)
js/app.js              Navegación, progreso, evaluación y certificado
vendor/                Three.js r160 (licencia MIT), incluido para funcionar sin conexión
assets/                Logo e íconos
sw.js, manifest.webmanifest   Instalación como app y modo sin conexión
```

## Agregar un curso

Añade un objeto a `COURSES` en `js/data.js` con `lecciones`, `practicas`
(usando cualquiera de los 8 tipos), `escena` (uno de los modelos 3D existentes y
sus puntos) y `quiz`. No hace falta tocar el resto del código.

> Simulador con fines educativos. No reemplaza la práctica clínica supervisada
> ni los protocolos oficiales vigentes de cada institución.
