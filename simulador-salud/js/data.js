/* Martin´s Capacitaciones · Banco de cursos del área de salud.
   Cada curso tiene: lecciones (teoría), prácticas 2D (motores en sims2d.js),
   una escena 3D con puntos interactivos (scene3d.js) y una evaluación final.

   Tipos de práctica disponibles:
   - secuencia  : ordenar pasos de un procedimiento.
   - objetivo   : tocar zonas anatómicas en una figura (cuerpo, brazo, arcada, tórax...).
   - calculo    : ejercicios numéricos aleatorios (dosis, goteo, IMC...).
   - signos     : monitor de signos vitales / ritmos de ECG.
   - sutura     : realizar puntos de sutura sobre una herida.
   - rcp        : compresiones torácicas al ritmo correcto.
   - caso       : caso clínico paso a paso.
   - clasificar : llevar cada elemento a su categoría.

   Las escenas 3D definen sus coordenadas en scene3d.js; aquí solo se indica
   el nombre (n) del punto y su explicación. */

const CATEGORIAS = [
  "Enfermería",
  "Emergencias",
  "Farmacia",
  "Odontología",
  "Cirugía menor",
  "Geriatría",
  "Laboratorio",
  "Bioseguridad",
  "Materno-infantil",
  "Rehabilitación",
  "Nutrición"
];

const COURSES = [
  /* ============================================================ */
  {
    id: "signos-vitales",
    nombre: "Enfermería: Signos vitales",
    cat: "Enfermería",
    icono: "🩺",
    horas: 20,
    nivel: "Básico",
    desc: "Valoración de frecuencia cardíaca, respiratoria, presión arterial, temperatura y saturación de oxígeno.",
    escena: {
      tipo: "cuerpo",
      hotspots: [
        { n: "temporal", label: "Pulso temporal", info: "Sobre el hueso temporal, por delante de la oreja. Útil en lactantes y cuando no se accede a otros pulsos." },
        { n: "carotideo", label: "Pulso carotídeo", info: "A un lado de la tráquea. Es el pulso de elección en emergencias y RCP. Nunca palpar ambas carótidas a la vez." },
        { n: "apical", label: "Pulso apical", info: "5.º espacio intercostal izquierdo, línea medioclavicular. Se ausculta con estetoscopio durante 1 minuto completo." },
        { n: "braquial", label: "Pulso braquial", info: "Cara interna del pliegue del codo. Aquí se coloca la campana del estetoscopio al tomar la presión arterial." },
        { n: "radial", label: "Pulso radial", info: "Cara anterior de la muñeca, lado del pulgar. Es el más usado en la valoración rutinaria del adulto." },
        { n: "femoral", label: "Pulso femoral", info: "En el pliegue inguinal. Se valora en shock o cuando los pulsos periféricos no se palpan." },
        { n: "popliteo", label: "Pulso poplíteo", info: "Detrás de la rodilla, con la pierna ligeramente flexionada." },
        { n: "pedio", label: "Pulso pedio", info: "Dorso del pie. Valora la circulación de miembros inferiores (diabetes, enfermedad arterial)." }
      ]
    },
    lecciones: [
      {
        t: "¿Qué son los signos vitales?",
        c: [
          "Son mediciones que reflejan el estado de las funciones esenciales del cuerpo.",
          "Incluyen: frecuencia cardíaca (FC), frecuencia respiratoria (FR), presión arterial (PA), temperatura (T°) y saturación de oxígeno (SpO₂). Muchos protocolos consideran también el dolor como un signo vital más.",
          "Se registran siempre con fecha, hora, unidad y la condición del paciente (reposo, actividad, oxígeno)."
        ]
      },
      {
        t: "Valores normales en el adulto",
        c: [
          "FC: 60 a 100 latidos por minuto (lpm).",
          "FR: 12 a 20 respiraciones por minuto (rpm).",
          "PA óptima: menor de 120/80 mmHg. Hipertensión: igual o mayor a 140/90 (o 130/80 según la guía usada).",
          "Temperatura: 36,0 a 37,5 °C axilar. Fiebre: mayor o igual a 38 °C.",
          "SpO₂: 95 a 100 % en aire ambiente."
        ]
      },
      {
        t: "Técnica de la presión arterial",
        c: [
          "Paciente sentado, en reposo de 5 minutos, brazo apoyado a la altura del corazón y sin ropa ajustada.",
          "Elegir el manguito adecuado: la cámara debe cubrir el 80 % del perímetro del brazo.",
          "Colocar el manguito 2–3 cm por encima del pliegue del codo y palpar la arteria braquial.",
          "Inflar 20–30 mmHg por encima de la desaparición del pulso radial y desinflar a 2–3 mmHg por segundo.",
          "Primer ruido de Korotkoff = presión sistólica; desaparición del ruido = presión diastólica."
        ]
      },
      {
        t: "Frecuencia respiratoria y pulso",
        c: [
          "Contar la FR sin avisar al paciente (se altera si se sabe observado), durante 60 segundos.",
          "Palpar el pulso con los dedos índice y medio, nunca con el pulgar (tiene pulso propio).",
          "Valorar frecuencia, ritmo (regular/irregular) y amplitud (fuerte, débil, filiforme).",
          "Taquicardia > 100 lpm, bradicardia < 60 lpm; taquipnea > 20 rpm, bradipnea < 12 rpm."
        ]
      }
    ],
    practicas: [
      { tipo: "signos", modo: "vitales", titulo: "Monitor: identifica el valor alterado", desc: "Observa el monitor del paciente y detecta qué signo vital está fuera de rango.", rondas: 6 },
      {
        tipo: "objetivo", figura: "cuerpo", titulo: "Localiza los pulsos", desc: "Toca en la figura el sitio correcto para palpar cada pulso.",
        objetivos: [
          { label: "Pulso carotídeo", pts: [[91, 66], [109, 66]] },
          { label: "Pulso radial", pts: [[37, 226], [163, 226]] },
          { label: "Pulso braquial", pts: [[50, 150], [150, 150]] },
          { label: "Pulso femoral", pts: [[84, 222], [116, 222]] },
          { label: "Pulso apical (corazón)", pts: [[114, 122]] },
          { label: "Pulso temporal", pts: [[77, 36], [123, 36]] },
          { label: "Pulso pedio", pts: [[80, 404], [120, 404]] }
        ]
      },
      {
        tipo: "secuencia", titulo: "Toma de presión arterial", desc: "Ordena los pasos de la técnica auscultatoria.",
        pasos: [
          "Higiene de manos e identificar al paciente",
          "Paciente sentado en reposo 5 minutos, brazo a la altura del corazón",
          "Colocar el manguito 2–3 cm sobre el pliegue del codo",
          "Palpar la arteria braquial y colocar el estetoscopio",
          "Inflar 20–30 mmHg por encima de la desaparición del pulso",
          "Desinflar lentamente (2–3 mmHg por segundo)",
          "Registrar sistólica (primer ruido) y diastólica (último ruido)"
        ]
      }
    ],
    quiz: [
      { q: "¿Cuál es la frecuencia cardíaca normal de un adulto en reposo?", ops: ["40–60 lpm", "60–100 lpm", "100–140 lpm", "120–160 lpm"], ok: 1, exp: "En el adulto en reposo la FC normal es de 60 a 100 lpm." },
      { q: "¿Con qué dedos NO se debe palpar el pulso?", ops: ["Índice", "Medio", "Pulgar", "Anular"], ok: 2, exp: "El pulgar tiene pulso propio y puede confundir la medición." },
      { q: "Una SpO₂ de 89 % en aire ambiente indica:", ops: ["Valor normal", "Hipoxemia", "Hipercapnia", "Error del equipo siempre"], ok: 1, exp: "Valores menores de 90–92 % indican hipoxemia y requieren valoración inmediata." },
      { q: "El primer ruido de Korotkoff corresponde a:", ops: ["La presión diastólica", "La presión media", "La presión sistólica", "La frecuencia cardíaca"], ok: 2, exp: "El primer ruido audible marca la presión sistólica." },
      { q: "¿Cuál es el pulso de elección para valorar a un adulto inconsciente?", ops: ["Radial", "Pedio", "Carotídeo", "Temporal"], ok: 2, exp: "El carotídeo es el más fiable en emergencias." },
      { q: "Una FR de 26 rpm en un adulto se denomina:", ops: ["Bradipnea", "Eupnea", "Taquipnea", "Apnea"], ok: 2, exp: "Más de 20 rpm en el adulto es taquipnea." },
      { q: "¿Durante cuánto tiempo se ausculta el pulso apical?", ops: ["15 segundos", "30 segundos", "1 minuto completo", "5 minutos"], ok: 2, exp: "El pulso apical se cuenta durante 60 segundos completos." }
    ]
  },

  /* ============================================================ */
  {
    id: "inyectables",
    nombre: "Enfermería: Administración de medicamentos e inyectables",
    cat: "Enfermería",
    icono: "💉",
    horas: 30,
    nivel: "Intermedio",
    desc: "Correctos de la administración, vías parenterales, sitios de inyección intramuscular y cálculo de dosis.",
    escena: {
      tipo: "cuerpo",
      hotspots: [
        { n: "deltoides", label: "Deltoides (IM)", info: "3 traveses de dedo bajo el acromion. Volumen máximo aproximado 1 mL en adultos. Ideal para vacunas." },
        { n: "ventrogluteo", label: "Ventroglúteo (IM)", info: "Sitio más seguro en adultos: lejos de nervios y vasos grandes. Se ubica con la palma sobre el trocánter mayor, índice a la espina ilíaca anterosuperior." },
        { n: "vasto", label: "Vasto lateral (IM)", info: "Tercio medio de la cara externa del muslo. Sitio de elección en lactantes." },
        { n: "dorsogluteo", label: "Dorsoglúteo (IM)", info: "Cuadrante superior externo del glúteo. Hoy menos recomendado por riesgo de lesión del nervio ciático." },
        { n: "abdomen", label: "Subcutánea abdominal", info: "A 5 cm del ombligo. Sitio habitual para insulina y heparinas de bajo peso molecular. Rotar los puntos de punción." },
        { n: "antebrazo", label: "Intradérmica", info: "Cara anterior del antebrazo. Ángulo de 10–15°, bisel hacia arriba, se forma una pápula (ej.: PPD, pruebas de alergia)." }
      ]
    },
    lecciones: [
      {
        t: "Los correctos de la administración",
        c: [
          "Paciente correcto: verificar con dos identificadores (nombre completo y fecha de nacimiento o historia clínica).",
          "Medicamento correcto, dosis correcta, vía correcta y hora correcta.",
          "Además: registro correcto, educación al paciente, derecho a rechazar, verificar alergias y evaluar la respuesta.",
          "Nunca administrar un medicamento preparado por otra persona ni con etiqueta ilegible."
        ]
      },
      {
        t: "Vías parenterales y ángulos",
        c: [
          "Intradérmica (ID): ángulo 10–15°, volumen muy pequeño (0,1 mL).",
          "Subcutánea (SC): ángulo 45° (o 90° con agujas cortas o pellizco amplio), hasta 1 mL.",
          "Intramuscular (IM): ángulo 90°, volumen según el músculo (deltoides ≈ 1 mL, ventroglúteo/vasto ≈ 3–5 mL en adulto).",
          "Intravenosa (IV): ángulo 15–30° al canalizar; efecto inmediato y máximo riesgo, requiere vigilancia."
        ]
      },
      {
        t: "Técnica de inyección intramuscular",
        c: [
          "Seleccionar el sitio según edad, volumen y masa muscular.",
          "Antisepsia del sitio con alcohol al 70 % y dejar secar.",
          "Técnica en Z: desplazar la piel antes de puncionar para sellar el trayecto y evitar reflujo.",
          "Introducir la aguja a 90° con un movimiento firme, inyectar lentamente (≈10 s/mL).",
          "Retirar, presionar sin masajear y desechar la aguja sin reencapuchar en el guardián."
        ]
      },
      {
        t: "Fórmula básica de dosis",
        c: [
          "Volumen a administrar = (Dosis prescrita ÷ Concentración disponible) × Volumen del frasco.",
          "Ejemplo: prescritos 250 mg; frasco de 500 mg en 2 mL → (250 ÷ 500) × 2 = 1 mL.",
          "Verificar siempre unidades: 1 g = 1000 mg; 1 mg = 1000 mcg.",
          "Ante dudas, doble chequeo con otro profesional, especialmente con medicamentos de alto riesgo."
        ]
      }
    ],
    practicas: [
      {
        tipo: "objetivo", figura: "cuerpo", titulo: "Sitios de inyección", desc: "Toca el sitio anatómico indicado.",
        objetivos: [
          { label: "Deltoides (IM)", pts: [[57, 92], [143, 92]] },
          { label: "Vasto lateral (IM)", pts: [[67, 282], [133, 282]] },
          { label: "Ventroglúteo (IM)", pts: [[62, 212], [138, 212]] },
          { label: "Subcutánea abdominal (lado del ombligo)", pts: [[85, 185], [115, 185]] },
          { label: "Intradérmica (cara anterior del antebrazo)", pts: [[43, 195], [157, 195]] }
        ]
      },
      { tipo: "calculo", generador: "dosis", titulo: "Cálculo de dosis", desc: "Calcula el volumen exacto a administrar.", rondas: 5 },
      {
        tipo: "secuencia", titulo: "Inyección intramuscular", desc: "Ordena el procedimiento.",
        pasos: [
          "Verificar la prescripción y los correctos",
          "Higiene de manos y colocación de guantes",
          "Cargar el medicamento con técnica aséptica",
          "Seleccionar y localizar el sitio de punción",
          "Antisepsia de la piel y dejar secar",
          "Puncionar a 90° con técnica en Z",
          "Inyectar lentamente y retirar la aguja",
          "Desechar la aguja en el guardián sin reencapuchar",
          "Registrar y vigilar la respuesta"
        ]
      }
    ],
    quiz: [
      { q: "¿Qué ángulo se usa en una inyección intramuscular?", ops: ["10–15°", "45°", "90°", "180°"], ok: 2, exp: "La IM se aplica a 90° para alcanzar el músculo." },
      { q: "El sitio IM más seguro en el adulto es:", ops: ["Dorsoglúteo", "Ventroglúteo", "Deltoides", "Antebrazo"], ok: 1, exp: "El ventroglúteo está lejos de grandes nervios y vasos." },
      { q: "En lactantes, el sitio IM de elección es:", ops: ["Vasto lateral", "Deltoides", "Dorsoglúteo", "Abdomen"], ok: 0, exp: "El vasto lateral es el músculo más desarrollado en lactantes." },
      { q: "Prescripción 500 mg; ampolla de 1 g en 4 mL. ¿Cuántos mL se administran?", ops: ["1 mL", "2 mL", "4 mL", "0,5 mL"], ok: 1, exp: "(500 ÷ 1000) × 4 = 2 mL." },
      { q: "Tras una inyección, la aguja se debe:", ops: ["Reencapuchar con dos manos", "Desechar sin reencapuchar en el guardián", "Tirar en la funda negra", "Guardar para reutilizar"], ok: 1, exp: "Nunca se reencapucha: va directo al recipiente de cortopunzantes." },
      { q: "La técnica en Z sirve para:", ops: ["Disminuir el dolor del pinchazo únicamente", "Sellar el trayecto y evitar reflujo del medicamento", "Calentar el músculo", "Localizar el nervio"], ok: 1, exp: "Desplazar la piel crea un trayecto en zigzag que impide que el fármaco salga." },
      { q: "¿Cuántos identificadores del paciente se recomiendan antes de administrar?", ops: ["Uno", "Dos", "Ninguno si se conoce al paciente", "El número de cama"], ok: 1, exp: "Dos identificadores, nunca el número de cama." }
    ]
  },

  /* ============================================================ */
  {
    id: "venoclisis",
    nombre: "Enfermería: Canalización venosa y fluidoterapia",
    cat: "Enfermería",
    icono: "🩸",
    horas: 25,
    nivel: "Intermedio",
    desc: "Selección de vena, técnica de canalización periférica, cálculo de goteo y prevención de flebitis.",
    escena: {
      tipo: "brazo",
      hotspots: [
        { n: "cefalica", label: "Vena cefálica", info: "Recorre el borde radial (lado del pulgar) del antebrazo. Buena para catéteres periféricos de larga duración." },
        { n: "basilica", label: "Vena basílica", info: "Borde cubital (lado del meñique). Profunda y móvil; cuidado con el nervio mediano y la arteria braquial cercanos." },
        { n: "mediana", label: "Vena mediana cubital", info: "En la fosa del codo. De elección para extracción de sangre; para catéter limita la flexión del brazo." },
        { n: "dorsal", label: "Venas dorsales de la mano", info: "Primera opción para empezar de distal a proximal, preservando venas superiores." },
        { n: "torniquete", label: "Torniquete", info: "10 cm por encima del sitio de punción, no más de 1 minuto. Debe permitir palpar el pulso distal." },
        { n: "cateter", label: "Catéter periférico", info: "Calibre según uso: 14–16G trauma/cirugía, 18G transfusión, 20–22G uso general, 24G pediatría o venas frágiles." }
      ]
    },
    lecciones: [
      {
        t: "Selección de la vena",
        c: [
          "Elegir venas rectas, palpables y elásticas, empezando por la zona más distal.",
          "Evitar zonas de flexión, extremidades con fístula, linfedema, lado de mastectomía o con flebitis previa.",
          "Preferir el brazo no dominante si es posible.",
          "El calibre del catéter debe ser el menor que permita la terapia prescrita."
        ]
      },
      {
        t: "Técnica de canalización periférica",
        c: [
          "Preparar el material: catéter, torniquete, antiséptico (clorhexidina 2 % o alcohol 70 %), apósito transparente, extensión purgada.",
          "Colocar torniquete, antisepsia y dejar secar sin volver a palpar.",
          "Fijar la piel por debajo y puncionar con bisel hacia arriba a 15–30°.",
          "Al ver reflujo en la cámara, bajar el ángulo, avanzar el catéter y retirar el fiador.",
          "Retirar el torniquete, conectar, permeabilizar con suero, fijar y rotular (fecha, calibre, iniciales)."
        ]
      },
      {
        t: "Cálculo de goteo",
        c: [
          "Gotas/min = Volumen (mL) × factor de goteo ÷ tiempo (min).",
          "Macrogotero: 20 gotas = 1 mL. Microgotero: 60 microgotas = 1 mL.",
          "Atajo: con macrogotero, gotas/min = mL/hora ÷ 3. Con microgotero, microgotas/min = mL/hora.",
          "Ejemplo: 1000 mL en 8 h con macrogotero → 1000 × 20 ÷ 480 ≈ 42 gotas/min."
        ]
      },
      {
        t: "Complicaciones",
        c: [
          "Flebitis: dolor, calor, rubor y cordón venoso. Retirar el catéter y aplicar escala de flebitis.",
          "Extravasación/infiltración: edema frío y pálido en el sitio. Detener la infusión.",
          "Infección: mantener técnica aséptica y valorar el sitio cada turno.",
          "Embolia gaseosa: purgar siempre los equipos."
        ]
      }
    ],
    practicas: [
      { tipo: "calculo", generador: "goteo", titulo: "Cálculo de goteo", desc: "Calcula gotas o microgotas por minuto.", rondas: 5 },
      {
        tipo: "objetivo", figura: "brazo", titulo: "Anatomía venosa del brazo", desc: "Toca la estructura indicada.",
        objetivos: [
          { label: "Vena cefálica (lado del pulgar)", pts: [[70, 250], [74, 300], [78, 200]] },
          { label: "Vena basílica (lado del meñique)", pts: [[130, 250], [126, 300], [128, 200]] },
          { label: "Vena mediana cubital", pts: [[100, 160]] },
          { label: "Arteria radial (¡no canalizar!)", pts: [[80, 345]] }
        ]
      },
      {
        tipo: "secuencia", titulo: "Canalización venosa periférica", desc: "Ordena los pasos.",
        pasos: [
          "Higiene de manos, identificar al paciente y explicar el procedimiento",
          "Preparar material y purgar el equipo",
          "Colocar el torniquete 10 cm por encima",
          "Seleccionar la vena y realizar antisepsia",
          "Puncionar con bisel hacia arriba a 15–30°",
          "Observar reflujo, avanzar el catéter y retirar el fiador",
          "Retirar el torniquete y conectar el sistema",
          "Fijar con apósito transparente y rotular"
        ]
      }
    ],
    quiz: [
      { q: "Factor de goteo de un macrogotero estándar:", ops: ["10 gotas/mL", "20 gotas/mL", "60 gotas/mL", "100 gotas/mL"], ok: 1, exp: "El macrogotero estándar es de 20 gotas por mL." },
      { q: "500 mL en 4 horas con macrogotero equivale a:", ops: ["≈21 gotas/min", "≈42 gotas/min", "≈125 gotas/min", "≈60 gotas/min"], ok: 1, exp: "500 × 20 ÷ 240 = 41,7 ≈ 42 gotas/min." },
      { q: "Con microgotero, 30 mL/h equivale a:", ops: ["10 microgotas/min", "30 microgotas/min", "60 microgotas/min", "90 microgotas/min"], ok: 1, exp: "Con microgotero, microgotas/min = mL/h." },
      { q: "¿Cuánto tiempo máximo debe permanecer el torniquete?", ops: ["1 minuto aprox.", "5 minutos", "10 minutos", "No importa"], ok: 0, exp: "Más de 1 minuto produce hemoconcentración y molestias." },
      { q: "Calibre recomendado para una transfusión en adulto:", ops: ["24G", "22G", "18G", "26G"], ok: 2, exp: "18G permite flujo adecuado sin dañar los hematíes." },
      { q: "Signos de flebitis:", ops: ["Edema frío y pálido", "Dolor, calor, rubor y cordón venoso", "Hipotensión", "Bradicardia"], ok: 1, exp: "Son los signos inflamatorios clásicos sobre el trayecto venoso." }
    ]
  },

  /* ============================================================ */
  {
    id: "rcp",
    nombre: "RCP y Soporte Vital Básico",
    cat: "Emergencias",
    icono: "❤️",
    horas: 16,
    nivel: "Básico",
    desc: "Reconocimiento del paro, cadena de supervivencia, compresiones de alta calidad y uso del DEA.",
    escena: {
      tipo: "cuerpo",
      hotspots: [
        { n: "rcp", label: "Punto de compresión", info: "Centro del pecho, mitad inferior del esternón. Talón de una mano y la otra encima, brazos rectos." },
        { n: "carotideo", label: "Comprobar pulso", info: "Pulso carotídeo durante no más de 10 segundos (solo personal de salud), a la vez que se observa la respiración." },
        { n: "via_aerea", label: "Vía aérea", info: "Maniobra frente-mentón para abrir la vía aérea. Ventilar 1 segundo por insuflación hasta ver elevar el tórax." },
        { n: "dea1", label: "Parche DEA (derecho)", info: "Debajo de la clavícula derecha, junto al esternón." },
        { n: "dea2", label: "Parche DEA (izquierdo)", info: "En el costado izquierdo, por debajo y a la izquierda del pezón, en la línea axilar media." }
      ]
    },
    lecciones: [
      {
        t: "Reconocer el paro cardiorrespiratorio",
        c: [
          "Verificar la seguridad de la escena antes de acercarse.",
          "Comprobar respuesta: tocar los hombros y preguntar en voz alta.",
          "Si no responde y no respira o solo boquea (respiración agónica): activar el sistema de emergencias (en Ecuador, ECU 911) y pedir un DEA.",
          "Personal de salud: comprobar pulso carotídeo y respiración simultáneamente en menos de 10 segundos."
        ]
      },
      {
        t: "Compresiones de alta calidad",
        c: [
          "Frecuencia: 100 a 120 compresiones por minuto.",
          "Profundidad: 5 a 6 cm en adultos.",
          "Permitir la reexpansión completa del tórax tras cada compresión.",
          "Minimizar las interrupciones (menos de 10 segundos).",
          "Relación 30 compresiones : 2 ventilaciones (un reanimador o dos sin vía aérea avanzada)."
        ]
      },
      {
        t: "Desfibrilador externo automático (DEA)",
        c: [
          "Encenderlo apenas llegue y seguir sus instrucciones de voz.",
          "Colocar los parches en el pecho desnudo y seco.",
          "Nadie debe tocar al paciente mientras analiza ni al descargar.",
          "Tras la descarga, reanudar de inmediato las compresiones durante 2 minutos."
        ]
      },
      {
        t: "Cadena de supervivencia (extrahospitalaria)",
        c: [
          "1. Reconocimiento y activación del sistema de emergencias.",
          "2. RCP de alta calidad inmediata.",
          "3. Desfibrilación rápida.",
          "4. Soporte vital avanzado.",
          "5. Cuidados posparo.",
          "6. Recuperación."
        ]
      }
    ],
    practicas: [
      { tipo: "rcp", titulo: "Entrenador de compresiones", desc: "Toca el pecho al ritmo correcto (100–120/min). Usa el metrónomo si lo necesitas.", ciclos: 2 },
      {
        tipo: "secuencia", titulo: "Algoritmo de SVB en adultos", desc: "Ordena las acciones.",
        pasos: [
          "Verificar que la escena es segura",
          "Comprobar si la persona responde",
          "Pedir ayuda: llamar al ECU 911 y solicitar un DEA",
          "Comprobar respiración y pulso (máximo 10 segundos)",
          "Iniciar 30 compresiones torácicas",
          "Abrir la vía aérea y dar 2 ventilaciones",
          "Conectar el DEA en cuanto llegue y seguir sus instrucciones"
        ]
      },
      {
        tipo: "caso", titulo: "Caso: colapso en la sala de espera", desc: "Toma decisiones paso a paso.",
        paciente: { nombre: "Hombre de 58 años", motivo: "Se desploma en la sala de espera", vitales: { FC: "—", PA: "—", FR: "0", T: "—", SpO2: "—" } },
        pasos: [
          { q: "Ves a un hombre caer al suelo. ¿Qué haces primero?", ops: ["Iniciar compresiones de inmediato", "Verificar que la escena es segura", "Buscar sus documentos", "Darle agua"], ok: 1, fb: "La seguridad del reanimador es lo primero." },
          { q: "No responde a estímulos. ¿Siguiente paso?", ops: ["Pedir ayuda, activar emergencias y solicitar el DEA", "Esperar a que despierte", "Colocarlo sentado", "Tomarle la presión"], ok: 0, fb: "Activar la respuesta de emergencia lo antes posible." },
          { q: "No respira, solo boquea, y no tiene pulso. ¿Qué haces?", ops: ["Posición lateral de seguridad", "Dar 2 ventilaciones y esperar", "Iniciar RCP: 30 compresiones y 2 ventilaciones", "Buscar una vena"], ok: 2, fb: "La respiración agónica no es respiración normal: inicia RCP." },
          { q: "Llega el DEA. ¿Cuándo lo usas?", ops: ["Después de 10 minutos de RCP", "Inmediatamente, encendiéndolo y siguiendo sus instrucciones", "Solo si un médico lo indica", "Nunca en la calle"], ok: 1, fb: "Cada minuto sin desfibrilación reduce la supervivencia." },
          { q: "El DEA indica descarga y se realiza. ¿Qué sigue?", ops: ["Comprobar pulso durante 1 minuto", "Reanudar compresiones de inmediato durante 2 minutos", "Retirar los parches", "Dar agua"], ok: 1, fb: "Reanudar RCP sin demora; el DEA volverá a analizar a los 2 minutos." }
        ]
      }
    ],
    quiz: [
      { q: "Frecuencia de compresiones recomendada en el adulto:", ops: ["60–80/min", "80–100/min", "100–120/min", "140–160/min"], ok: 2, exp: "100 a 120 compresiones por minuto." },
      { q: "Profundidad de compresión en adultos:", ops: ["2–3 cm", "5–6 cm", "8–10 cm", "1 cm"], ok: 1, exp: "Al menos 5 cm sin superar 6 cm." },
      { q: "Relación compresión : ventilación en adulto con 1 reanimador:", ops: ["15:2", "30:2", "5:1", "30:1"], ok: 1, exp: "30:2." },
      { q: "Número de emergencias en Ecuador:", ops: ["112", "911", "ECU 911", "Las opciones 2 y 3 son correctas"], ok: 3, exp: "Se marca 911 y corresponde al Servicio Integrado de Seguridad ECU 911." },
      { q: "La respiración agónica (boqueo) debe considerarse:", ops: ["Respiración normal", "Signo de paro: iniciar RCP", "Signo de mejoría", "Indicación de esperar"], ok: 1, exp: "El boqueo no es una respiración eficaz." },
      { q: "Durante el análisis del DEA:", ops: ["Se continúan las compresiones", "Nadie toca al paciente", "Se dan ventilaciones", "Se mueve al paciente"], ok: 1, exp: "Tocar al paciente altera el análisis y puede causar una descarga al reanimador." },
      { q: "Las interrupciones de las compresiones deben durar:", ops: ["Menos de 10 segundos", "30 segundos", "1 minuto", "No importa"], ok: 0, exp: "Minimizar las pausas mejora la perfusión coronaria y cerebral." }
    ]
  },

  /* ============================================================ */
  {
    id: "primeros-auxilios",
    nombre: "Primeros auxilios y triaje",
    cat: "Emergencias",
    icono: "🚑",
    horas: 20,
    nivel: "Básico",
    desc: "Conducta PAS, hemorragias, quemaduras, atragantamiento, posición lateral de seguridad y triaje START.",
    escena: {
      tipo: "cuerpo",
      hotspots: [
        { n: "via_aerea", label: "Atragantamiento", info: "Si tose, animar a toser. Si no puede hablar ni toser: 5 golpes interescapulares y 5 compresiones abdominales (Heimlich), alternando." },
        { n: "abdomen", label: "Maniobra de Heimlich", info: "Puño por encima del ombligo, debajo del esternón, compresiones hacia adentro y arriba." },
        { n: "antebrazo", label: "Hemorragia", info: "Presión directa firme con gasas o tela limpia. Si no cede en extremidades y es masiva, torniquete por encima de la herida y anotar la hora." },
        { n: "vasto", label: "Fractura", info: "Inmovilizar en la posición encontrada, incluyendo articulación superior e inferior. No intentar alinear." },
        { n: "carotideo", label: "Valoración ABC", info: "Vía aérea, respiración (ver, oír, sentir) y circulación. Si no respira: RCP." }
      ]
    },
    lecciones: [
      {
        t: "Conducta PAS",
        c: [
          "Proteger: asegurar la escena para ti, la víctima y los demás.",
          "Avisar: llamar al ECU 911 indicando lugar, número de víctimas y su estado.",
          "Socorrer: valorar y actuar según lo aprendido, sin hacer más de lo que sabes."
        ]
      },
      {
        t: "Hemorragias y heridas",
        c: [
          "Usar guantes si es posible.",
          "Presión directa sobre la herida durante al menos 10 minutos; no retirar gasas empapadas, añadir más encima.",
          "En hemorragias masivas de extremidad: torniquete 5–7 cm por encima de la herida, anotando la hora.",
          "No extraer objetos clavados: inmovilizarlos."
        ]
      },
      {
        t: "Quemaduras",
        c: [
          "Enfriar con agua a temperatura ambiente durante 10–20 minutos.",
          "No aplicar hielo, pasta dental, aceite ni remedios caseros.",
          "Retirar anillos y objetos antes de que aparezca la inflamación.",
          "No reventar ampollas; cubrir con apósito limpio y húmedo."
        ]
      },
      {
        t: "Triaje START en múltiples víctimas",
        c: [
          "VERDE: puede caminar.",
          "NEGRO: no respira tras abrir la vía aérea.",
          "ROJO: respira más de 30 rpm, relleno capilar mayor de 2 s o no obedece órdenes.",
          "AMARILLO: no camina pero respira menos de 30, perfunde bien y obedece órdenes."
        ]
      }
    ],
    practicas: [
      {
        tipo: "clasificar", titulo: "Triaje START", desc: "Clasifica a cada víctima según su color de prioridad.",
        categorias: [
          { id: "rojo", label: "Rojo · Inmediato", color: "#d64545" },
          { id: "amarillo", label: "Amarillo · Urgente", color: "#e0b020" },
          { id: "verde", label: "Verde · Leve", color: "#2e9d5b" },
          { id: "negro", label: "Negro · Fallecido", color: "#333" }
        ],
        items: [
          { t: "Camina por sus propios medios con una herida en el brazo", c: "verde" },
          { t: "No camina, respira 36 veces por minuto", c: "rojo" },
          { t: "No respira ni siquiera tras abrir la vía aérea", c: "negro" },
          { t: "No camina, respira 18 rpm, relleno capilar 1 s, obedece órdenes", c: "amarillo" },
          { t: "No camina, respira 22 rpm, relleno capilar de 4 segundos", c: "rojo" },
          { t: "No camina, respira 20 rpm, no obedece órdenes simples", c: "rojo" },
          { t: "Se levanta y camina, refiere dolor de cabeza", c: "verde" },
          { t: "Fractura de pierna, respira 16 rpm, responde y obedece", c: "amarillo" }
        ]
      },
      {
        tipo: "caso", titulo: "Caso: quemadura en la cocina", desc: "Decide la mejor acción en cada momento.",
        paciente: { nombre: "Mujer de 34 años", motivo: "Se derramó agua hirviendo en el antebrazo", vitales: { FC: "104", PA: "125/80", FR: "20", T: "36,7", SpO2: "98" } },
        pasos: [
          { q: "¿Qué haces primero?", ops: ["Aplicar hielo directamente", "Enfriar con agua a temperatura ambiente 10–20 min", "Aplicar pasta dental", "Reventar las ampollas"], ok: 1, fb: "El agua a temperatura ambiente limita la profundidad de la quemadura." },
          { q: "Lleva un anillo y una pulsera. ¿Qué haces?", ops: ["Dejarlos", "Retirarlos antes de que aparezca el edema", "Cortarlos después", "Cubrirlos con hielo"], ok: 1, fb: "La inflamación puede comprometer la circulación." },
          { q: "Aparecen ampollas. ¿Qué haces?", ops: ["Pincharlas con una aguja", "No reventarlas y cubrir con apósito limpio", "Aplicar aceite", "Frotar con alcohol"], ok: 1, fb: "La ampolla protege de la infección." },
          { q: "¿Cuándo derivar a un centro de salud?", ops: ["Nunca", "Si es extensa, profunda, en cara, manos, genitales o articulaciones", "Solo si sangra", "Solo al día siguiente"], ok: 1, fb: "Estas localizaciones y extensiones requieren atención especializada." }
        ]
      },
      {
        tipo: "secuencia", titulo: "Atragantamiento en adulto consciente", desc: "Ordena la actuación.",
        pasos: [
          "Preguntar: ¿te estás atragantando?",
          "Si tose con fuerza, animarle a seguir tosiendo",
          "Si no puede toser ni hablar: 5 golpes entre los omóplatos",
          "Realizar 5 compresiones abdominales (Heimlich)",
          "Alternar golpes y compresiones hasta expulsar el objeto",
          "Si pierde el conocimiento: llamar al ECU 911 e iniciar RCP"
        ]
      }
    ],
    quiz: [
      { q: "¿Qué significa PAS?", ops: ["Pulso, Aire, Sangre", "Proteger, Avisar, Socorrer", "Prevenir, Asistir, Salir", "Presión, Aire, Soporte"], ok: 1, exp: "Proteger, Avisar y Socorrer." },
      { q: "Ante una quemadura térmica se debe aplicar:", ops: ["Hielo", "Agua a temperatura ambiente 10–20 min", "Mantequilla", "Alcohol"], ok: 1, exp: "El hielo puede causar más daño tisular." },
      { q: "En el triaje START, una víctima que camina se clasifica como:", ops: ["Rojo", "Amarillo", "Verde", "Negro"], ok: 2, exp: "Quien camina es verde." },
      { q: "Un objeto clavado en una herida se debe:", ops: ["Extraer rápidamente", "Inmovilizar sin extraer", "Girar para aflojar", "Empujar hacia dentro"], ok: 1, exp: "Puede estar taponando un vaso sanguíneo." },
      { q: "Posición para una persona inconsciente que respira normalmente:", ops: ["Boca arriba con almohada", "Posición lateral de seguridad", "Sentada", "Boca abajo"], ok: 1, exp: "Evita la aspiración de vómito y mantiene la vía aérea permeable." },
      { q: "Una víctima que respira 34 rpm en START es:", ops: ["Verde", "Amarillo", "Rojo", "Negro"], ok: 2, exp: "FR > 30 → rojo." }
    ]
  },

  /* ============================================================ */
  {
    id: "farmacia",
    nombre: "Auxiliar de Farmacia",
    cat: "Farmacia",
    icono: "💊",
    horas: 40,
    nivel: "Básico",
    desc: "Dispensación, lectura de recetas, grupos farmacológicos, almacenamiento, cadena de frío y FEFO.",
    escena: {
      tipo: "farmacia",
      hotspots: [
        { n: "nevera", label: "Cadena de frío (2–8 °C)", info: "Insulinas, vacunas y algunos colirios. Registrar la temperatura dos veces al día. Nunca congelar." },
        { n: "controlados", label: "Medicamentos controlados", info: "Psicotrópicos y estupefacientes: armario con llave, receta especial y libro de registro." },
        { n: "fefo", label: "Rotación FEFO", info: "First Expired, First Out: lo que vence primero se coloca adelante y sale primero." },
        { n: "venta_libre", label: "Venta libre (OTC)", info: "Medicamentos sin receta para síntomas leves. Aun así se debe orientar sobre dosis y contraindicaciones." },
        { n: "mostrador", label: "Mostrador de dispensación", info: "Verificar la receta, interpretar, preparar, entregar con información clara y registrar." },
        { n: "termometro", label: "Termohigrómetro", info: "Ambiente seco y fresco: temperatura por debajo de 25–30 °C y humedad relativa menor de 65–70 %." }
      ]
    },
    lecciones: [
      {
        t: "Proceso de dispensación",
        c: [
          "Recepción y validación de la receta: datos del paciente, del prescriptor, fecha, medicamento (nombre genérico/DCI), concentración, forma farmacéutica, dosis, frecuencia, duración y firma.",
          "Interpretación: resolver dudas con el prescriptor; nunca adivinar.",
          "Preparación: seleccionar el producto correcto revisando lote y fecha de vencimiento.",
          "Entrega con información: cómo, cuándo y cuánto tiempo tomarlo, posibles efectos adversos y conservación."
        ]
      },
      {
        t: "Abreviaturas frecuentes en recetas",
        c: [
          "VO: vía oral · SL: sublingual · IM: intramuscular · IV: intravenosa · SC: subcutánea.",
          "c/8h: cada 8 horas · PRN: si es necesario · STAT: inmediatamente.",
          "Tab: tableta · Cáp: cápsula · Susp: suspensión · Amp: ampolla · UI: unidades internacionales.",
          "Evitar abreviaturas ambiguas como 'U' (puede leerse como 0) o 'cc'."
        ]
      },
      {
        t: "Almacenamiento y conservación",
        c: [
          "Temperatura ambiente controlada (generalmente 15–30 °C), lejos de la luz y la humedad.",
          "Cadena de frío: 2–8 °C para insulinas, vacunas y biológicos.",
          "Rotación FEFO y revisión mensual de fechas de vencimiento.",
          "Separar productos vencidos, deteriorados o retirados del mercado en zona de cuarentena."
        ]
      },
      {
        t: "Grupos farmacológicos esenciales",
        c: [
          "Analgésicos/antipiréticos: paracetamol.",
          "AINEs: ibuprofeno, diclofenaco, naproxeno (cuidado con úlcera gástrica y anticoagulantes).",
          "Antibióticos: amoxicilina, azitromicina, ciprofloxacino (solo con receta; completar el tratamiento).",
          "Antihipertensivos: enalapril, losartán, amlodipino. Antidiabéticos: metformina, insulina.",
          "Antihistamínicos: loratadina, cetirizina, clorfenamina (esta última produce somnolencia)."
        ]
      }
    ],
    practicas: [
      {
        tipo: "clasificar", titulo: "Grupos farmacológicos", desc: "Ubica cada medicamento en su grupo.",
        categorias: [
          { id: "aine", label: "Analgésico / AINE", color: "#c6ae96" },
          { id: "atb", label: "Antibiótico", color: "#223146" },
          { id: "hta", label: "Antihipertensivo", color: "#6b8bb5" },
          { id: "dm", label: "Antidiabético", color: "#8a6a4f" },
          { id: "ah", label: "Antihistamínico", color: "#4f8a7a" }
        ],
        items: [
          { t: "Ibuprofeno", c: "aine" }, { t: "Amoxicilina", c: "atb" }, { t: "Enalapril", c: "hta" },
          { t: "Metformina", c: "dm" }, { t: "Loratadina", c: "ah" }, { t: "Diclofenaco", c: "aine" },
          { t: "Azitromicina", c: "atb" }, { t: "Losartán", c: "hta" }, { t: "Insulina glargina", c: "dm" },
          { t: "Cetirizina", c: "ah" }, { t: "Ciprofloxacino", c: "atb" }, { t: "Amlodipino", c: "hta" },
          { t: "Paracetamol", c: "aine" }, { t: "Glibenclamida", c: "dm" }
        ]
      },
      { tipo: "calculo", generador: "jarabe", titulo: "Dosis en jarabes y tabletas", desc: "Calcula cuántos mL o tabletas entregar.", rondas: 5 },
      {
        tipo: "caso", titulo: "Caso: dispensación en mostrador", desc: "Atiende correctamente al paciente.",
        paciente: { nombre: "Señor de 67 años", motivo: "Trae receta de amoxicilina 500 mg c/8h por 7 días y pide además ibuprofeno", vitales: { FC: "—", PA: "—", FR: "—", T: "—", SpO2: "—" } },
        pasos: [
          { q: "Al recibir la receta, ¿qué verificas primero?", ops: ["El precio", "Datos del paciente, prescriptor, fecha, fármaco, dosis y firma", "Solo el nombre del medicamento", "Si tiene seguro"], ok: 1, fb: "Una receta incompleta o ilegible no se dispensa sin aclarar." },
          { q: "¿Cuántas cápsulas de amoxicilina de 500 mg necesita para todo el tratamiento?", ops: ["14", "21", "7", "28"], ok: 1, fb: "3 al día × 7 días = 21 cápsulas." },
          { q: "Comenta que toma warfarina. Pide ibuprofeno. ¿Qué haces?", ops: ["Vendérselo sin comentar", "Advertir el riesgo de sangrado y derivar al médico/farmacéutico; sugerir paracetamol si lo autoriza", "Darle el doble de dosis", "Ignorarlo"], ok: 1, fb: "AINEs + anticoagulantes aumentan el riesgo de hemorragia." },
          { q: "¿Qué información das al entregar el antibiótico?", ops: ["Tomarlo solo si hay fiebre", "Cada 8 horas, completar los 7 días aunque se sienta mejor", "Suspenderlo al segundo día", "Tomarlo con alcohol"], ok: 1, fb: "Completar el tratamiento previene recaídas y resistencia bacteriana." }
        ]
      }
    ],
    quiz: [
      { q: "La regla FEFO significa:", ops: ["Lo primero que entra sale primero", "Lo primero que vence sale primero", "Lo más caro sale primero", "Lo más vendido adelante"], ok: 1, exp: "First Expired, First Out." },
      { q: "Rango de temperatura de la cadena de frío:", ops: ["0–2 °C", "2–8 °C", "8–15 °C", "−20 °C"], ok: 1, exp: "Entre 2 y 8 °C, sin congelar." },
      { q: "La abreviatura c/12h significa:", ops: ["12 veces al día", "Cada 12 horas", "Por 12 días", "12 mg"], ok: 1, exp: "Cada 12 horas (2 veces al día)." },
      { q: "¿Cuál es un antihistamínico?", ops: ["Loratadina", "Enalapril", "Metformina", "Amoxicilina"], ok: 0, exp: "La loratadina es un antihistamínico H1 de segunda generación." },
      { q: "Combinación con riesgo de hemorragia:", ops: ["Paracetamol + agua", "Warfarina + ibuprofeno", "Loratadina + vitamina C", "Metformina + dieta"], ok: 1, exp: "Los AINEs potencian el riesgo de sangrado de los anticoagulantes." },
      { q: "Los medicamentos vencidos se deben:", ops: ["Vender con descuento", "Separar en cuarentena para su disposición final", "Mezclar con los nuevos", "Regalar"], ok: 1, exp: "Se retiran del área de dispensación y se gestionan como residuo farmacéutico." }
    ]
  },

  /* ============================================================ */
  {
    id: "farmacologia",
    nombre: "Farmacología básica para el área de salud",
    cat: "Farmacia",
    icono: "⚗️",
    horas: 30,
    nivel: "Intermedio",
    desc: "Farmacocinética, vías de administración, formas farmacéuticas, reacciones adversas y conversiones.",
    escena: {
      tipo: "farmacia",
      hotspots: [
        { n: "mostrador", label: "Formas farmacéuticas", info: "Sólidas (tabletas, cápsulas), líquidas (jarabes, suspensiones), semisólidas (cremas, pomadas) y estériles (inyectables)." },
        { n: "nevera", label: "Biológicos", info: "Vacunas, insulinas y anticuerpos monoclonales: son proteínas sensibles al calor." },
        { n: "venta_libre", label: "Vía oral", info: "La más cómoda y económica. Sufre efecto de primer paso hepático, lo que reduce la biodisponibilidad de algunos fármacos." },
        { n: "controlados", label: "Margen terapéutico estrecho", info: "Digoxina, warfarina, litio, fenitoína: pequeñas variaciones de dosis causan toxicidad. Requieren monitorización." },
        { n: "fefo", label: "Estabilidad", info: "La fecha de vencimiento garantiza al menos el 90 % del principio activo si se conserva correctamente." }
      ]
    },
    lecciones: [
      {
        t: "Farmacocinética: ADME",
        c: [
          "Absorción: paso del fármaco desde el sitio de administración a la sangre.",
          "Distribución: llegada a los tejidos (influyen la unión a proteínas y el flujo sanguíneo).",
          "Metabolismo: principalmente hepático (citocromo P450).",
          "Excreción: principalmente renal; ajustar dosis en insuficiencia renal y adultos mayores."
        ]
      },
      {
        t: "Conceptos clave",
        c: [
          "Biodisponibilidad: fracción del fármaco que llega inalterada a la circulación (IV = 100 %).",
          "Vida media: tiempo en que la concentración plasmática se reduce a la mitad.",
          "Margen terapéutico: diferencia entre la dosis eficaz y la tóxica.",
          "Reacción adversa (RAM): respuesta nociva y no intencionada a dosis habituales. Se reporta a farmacovigilancia."
        ]
      },
      {
        t: "Conversión de unidades",
        c: [
          "1 g = 1000 mg · 1 mg = 1000 mcg (µg) · 1 L = 1000 mL.",
          "1 kg = 2,2 libras.",
          "Porcentaje: una solución al 5 % contiene 5 g en 100 mL.",
          "Siempre convertir a la misma unidad antes de calcular."
        ]
      }
    ],
    practicas: [
      { tipo: "calculo", generador: "conversion", titulo: "Conversión de unidades", desc: "Convierte g, mg, mcg, L y mL.", rondas: 6 },
      {
        tipo: "clasificar", titulo: "Vías de administración", desc: "¿Qué vía es?",
        categorias: [
          { id: "enteral", label: "Enteral", color: "#c6ae96" },
          { id: "parenteral", label: "Parenteral", color: "#223146" },
          { id: "topica", label: "Tópica / otras", color: "#4f8a7a" }
        ],
        items: [
          { t: "Tableta de paracetamol tragada", c: "enteral" }, { t: "Nitroglicerina sublingual", c: "enteral" },
          { t: "Inyección intramuscular", c: "parenteral" }, { t: "Insulina subcutánea", c: "parenteral" },
          { t: "Crema de hidrocortisona", c: "topica" }, { t: "Supositorio rectal", c: "enteral" },
          { t: "Suero intravenoso", c: "parenteral" }, { t: "Colirio oftálmico", c: "topica" },
          { t: "Parche transdérmico", c: "topica" }, { t: "Sonda nasogástrica", c: "enteral" }
        ]
      }
    ],
    quiz: [
      { q: "¿Qué vía tiene una biodisponibilidad del 100 %?", ops: ["Oral", "Intravenosa", "Rectal", "Tópica"], ok: 1, exp: "La vía IV entrega todo el fármaco directamente a la circulación." },
      { q: "1 mg equivale a:", ops: ["10 mcg", "100 mcg", "1000 mcg", "0,1 mcg"], ok: 2, exp: "1 mg = 1000 microgramos." },
      { q: "La vida media de un fármaco es:", ops: ["El tiempo hasta que hace efecto", "El tiempo en que su concentración se reduce a la mitad", "La mitad de su fecha de vencimiento", "La dosis mínima"], ok: 1, exp: "Determina la frecuencia de administración." },
      { q: "Una solución al 10 % contiene:", ops: ["10 g en 1000 mL", "10 g en 100 mL", "10 mg en 100 mL", "1 g en 100 mL"], ok: 1, exp: "% = gramos por 100 mL." },
      { q: "El principal órgano de excreción de fármacos es:", ops: ["Hígado", "Riñón", "Pulmón", "Piel"], ok: 1, exp: "La mayoría se elimina por vía renal." },
      { q: "Ejemplo de fármaco de margen terapéutico estrecho:", ops: ["Paracetamol", "Digoxina", "Vitamina C", "Loratadina"], ok: 1, exp: "La digoxina requiere niveles plasmáticos controlados." }
    ]
  },

  /* ============================================================ */
  {
    id: "odontologia",
    nombre: "Asistente de Odontología",
    cat: "Odontología",
    icono: "🦷",
    horas: 40,
    nivel: "Básico",
    desc: "Nomenclatura dental FDI, odontograma, instrumental, bioseguridad en el consultorio y trabajo a cuatro manos.",
    escena: {
      tipo: "dental",
      hotspots: [
        { n: "incisivos", label: "Incisivos (11, 21...)", info: "8 piezas. Función de corte. En FDI son las piezas X1 y X2 de cada cuadrante." },
        { n: "caninos", label: "Caninos (13, 23, 33, 43)", info: "Los dientes más largos de la boca; desgarran y guían la oclusión." },
        { n: "premolares", label: "Premolares (X4, X5)", info: "8 en total; no existen en la dentición temporal." },
        { n: "molares", label: "Primer molar (16, 26, 36, 46)", info: "Erupciona alrededor de los 6 años; clave de la oclusión. Muy susceptible a caries." },
        { n: "terceros", label: "Terceros molares (X8)", info: "'Muelas del juicio'. Suelen erupcionar entre los 17 y 25 años o quedar retenidas." },
        { n: "encia", label: "Encía", info: "Una encía sana es rosada, firme y no sangra. El sangrado es signo de gingivitis." }
      ]
    },
    lecciones: [
      {
        t: "Sistema de numeración FDI",
        c: [
          "Cada diente se nombra con dos dígitos: el primero indica el cuadrante y el segundo la pieza contando desde la línea media.",
          "Permanentes: cuadrante 1 = superior derecho, 2 = superior izquierdo, 3 = inferior izquierdo, 4 = inferior derecho.",
          "Piezas: 1 incisivo central, 2 lateral, 3 canino, 4 y 5 premolares, 6, 7 y 8 molares.",
          "Temporales (20 piezas): cuadrantes 5 a 8, piezas 1 a 5. Ej.: 55 = segundo molar temporal superior derecho.",
          "Recuerda: el lado derecho del paciente aparece a la izquierda de quien lo mira."
        ]
      },
      {
        t: "Instrumental básico",
        c: [
          "Diagnóstico: espejo bucal, explorador, pinza algodonera y sonda periodontal.",
          "Operatoria: turbina (alta velocidad), micromotor (baja velocidad), cucharillas, condensadores, bruñidores.",
          "Exodoncia: fórceps y elevadores (botadores).",
          "Periodoncia: curetas y raspadores (scaler/ultrasonido)."
        ]
      },
      {
        t: "Trabajo a cuatro manos y bioseguridad",
        c: [
          "El asistente se ubica entre las 2 y las 4 (posición horaria) para un operador diestro.",
          "Transferencia de instrumentos en la zona de intercambio, por debajo del mentón del paciente.",
          "EPP: guantes, mascarilla, gafas o careta, gorro y bata.",
          "Esterilización en autoclave (121 °C por 15–20 min o 134 °C por 3–5 min) y control con indicadores químicos y biológicos."
        ]
      }
    ],
    practicas: [
      {
        tipo: "objetivo", figura: "arcada", titulo: "Odontograma FDI", desc: "Toca la pieza dental indicada. (Activa la numeración si necesitas ayuda.)",
        objetivosDientes: ["11", "16", "23", "36", "48", "21", "45", "17", "32", "28"]
      },
      {
        tipo: "clasificar", titulo: "Instrumental odontológico", desc: "Clasifica cada instrumento por su uso.",
        categorias: [
          { id: "diag", label: "Diagnóstico", color: "#c6ae96" },
          { id: "oper", label: "Operatoria", color: "#223146" },
          { id: "exo", label: "Exodoncia", color: "#8a4f4f" },
          { id: "perio", label: "Periodoncia", color: "#4f8a7a" }
        ],
        items: [
          { t: "Espejo bucal", c: "diag" }, { t: "Explorador", c: "diag" }, { t: "Sonda periodontal", c: "diag" },
          { t: "Turbina de alta velocidad", c: "oper" }, { t: "Condensador de amalgama/resina", c: "oper" },
          { t: "Fórceps", c: "exo" }, { t: "Elevador (botador)", c: "exo" }, { t: "Cureta Gracey", c: "perio" },
          { t: "Scaler ultrasónico", c: "perio" }, { t: "Pinza algodonera", c: "diag" }, { t: "Lámpara de fotocurado", c: "oper" }
        ]
      },
      {
        tipo: "secuencia", titulo: "Esterilización del instrumental", desc: "Ordena el ciclo de procesamiento.",
        pasos: [
          "Prelavado/descontaminación en solución enzimática",
          "Lavado manual o ultrasónico",
          "Enjuague y secado",
          "Inspección y empaquetado con indicador químico",
          "Esterilización en autoclave",
          "Almacenamiento en área limpia y seca"
        ]
      }
    ],
    quiz: [
      { q: "En FDI, la pieza 36 es:", ops: ["Primer molar superior derecho", "Primer molar inferior izquierdo", "Canino inferior", "Segundo premolar superior"], ok: 1, exp: "3 = cuadrante inferior izquierdo, 6 = primer molar." },
      { q: "¿Cuántos dientes tiene la dentición temporal?", ops: ["20", "24", "28", "32"], ok: 0, exp: "20 piezas: 10 superiores y 10 inferiores." },
      { q: "El cuadrante 1 corresponde a:", ops: ["Superior izquierdo", "Superior derecho", "Inferior derecho", "Inferior izquierdo"], ok: 1, exp: "Se numera en sentido horario empezando por el superior derecho del paciente." },
      { q: "Instrumento usado para extracciones:", ops: ["Espejo", "Fórceps", "Cureta", "Condensador"], ok: 1, exp: "El fórceps sujeta y luxa el diente." },
      { q: "Parámetros de esterilización en autoclave habituales:", ops: ["60 °C, 5 min", "121 °C, 15–20 min", "200 °C, 1 min", "37 °C, 24 h"], ok: 1, exp: "También es válido 134 °C por 3–5 minutos." },
      { q: "La pieza 55 corresponde a:", ops: ["Un diente permanente", "Segundo molar temporal superior derecho", "Canino temporal", "Tercer molar"], ok: 1, exp: "Cuadrante 5 = temporal superior derecho; pieza 5 = segundo molar." }
    ]
  },

  /* ============================================================ */
  {
    id: "odonto-preventiva",
    nombre: "Odontología preventiva e higiene bucal",
    cat: "Odontología",
    icono: "🪥",
    horas: 20,
    nivel: "Básico",
    desc: "Anatomía del diente, placa bacteriana, caries, técnica de cepillado de Bass y uso del flúor.",
    escena: {
      tipo: "diente",
      hotspots: [
        { n: "esmalte", label: "Esmalte", info: "El tejido más duro del cuerpo (96 % mineral). No se regenera; el flúor lo hace más resistente a los ácidos." },
        { n: "dentina", label: "Dentina", info: "Debajo del esmalte. Tiene túbulos que transmiten estímulos: por eso duele cuando la caries llega aquí." },
        { n: "pulpa", label: "Pulpa", info: "Nervios y vasos sanguíneos. Su inflamación (pulpitis) produce dolor intenso; puede requerir endodoncia." },
        { n: "cemento", label: "Cemento radicular", info: "Recubre la raíz y fija las fibras del ligamento periodontal." },
        { n: "encia", label: "Encía", info: "Protege el hueso. La gingivitis es reversible con buena higiene; la periodontitis destruye el soporte." },
        { n: "hueso", label: "Hueso alveolar", info: "Sostiene el diente. Se pierde en la periodontitis avanzada, causando movilidad dental." }
      ]
    },
    lecciones: [
      {
        t: "Placa bacteriana y caries",
        c: [
          "La placa es una biopelícula de bacterias que se forma continuamente sobre los dientes.",
          "Las bacterias fermentan azúcares y producen ácidos que desmineralizan el esmalte.",
          "Factores de la caries: huésped (diente), bacterias, dieta azucarada y tiempo.",
          "La frecuencia de consumo de azúcar importa más que la cantidad total."
        ]
      },
      {
        t: "Técnica de cepillado de Bass modificada",
        c: [
          "Cerdas a 45° hacia el surco entre diente y encía.",
          "Pequeños movimientos vibratorios de adelante hacia atrás sobre 2–3 dientes.",
          "Luego barrer desde la encía hacia el borde del diente.",
          "Cepillar caras externas, internas y de masticación, además de la lengua.",
          "Mínimo 2 minutos, 2–3 veces al día; cambiar el cepillo cada 3 meses."
        ]
      },
      {
        t: "Flúor y otras medidas",
        c: [
          "Pasta con 1000–1450 ppm de flúor desde la erupción del primer diente (cantidad de un grano de arroz en menores de 3 años, de una arveja de 3 a 6 años).",
          "Escupir sin enjuagar abundantemente para mantener el flúor.",
          "Hilo dental una vez al día; sellantes de fosas y fisuras en molares.",
          "Control odontológico cada 6 meses."
        ]
      }
    ],
    practicas: [
      {
        tipo: "secuencia", titulo: "Cepillado de Bass modificado", desc: "Ordena la técnica.",
        pasos: [
          "Colocar una cantidad de pasta del tamaño de una arveja",
          "Inclinar las cerdas a 45° hacia la encía",
          "Realizar movimientos vibratorios cortos",
          "Barrer desde la encía hacia el borde del diente",
          "Repetir en caras internas y superficies de masticación",
          "Cepillar la lengua",
          "Escupir el exceso sin enjuagar en exceso"
        ]
      },
      {
        tipo: "clasificar", titulo: "Alimentos y riesgo de caries", desc: "Clasifica según su potencial cariogénico.",
        categorias: [
          { id: "alto", label: "Alto riesgo", color: "#d64545" },
          { id: "bajo", label: "Bajo riesgo / protector", color: "#2e9d5b" }
        ],
        items: [
          { t: "Caramelos masticables", c: "alto" }, { t: "Queso", c: "bajo" }, { t: "Gaseosa azucarada", c: "alto" },
          { t: "Zanahoria cruda", c: "bajo" }, { t: "Galletas dulces entre comidas", c: "alto" }, { t: "Agua", c: "bajo" },
          { t: "Jugos envasados", c: "alto" }, { t: "Chicle sin azúcar (xilitol)", c: "bajo" }
        ]
      }
    ],
    quiz: [
      { q: "El tejido más duro del cuerpo humano es:", ops: ["Hueso", "Dentina", "Esmalte", "Cemento"], ok: 2, exp: "El esmalte tiene alrededor de 96 % de contenido mineral." },
      { q: "En la técnica de Bass, las cerdas se colocan a:", ops: ["90°", "45° hacia la encía", "0°", "180°"], ok: 1, exp: "45° hacia el surco gingival." },
      { q: "¿Cada cuánto se recomienda cambiar el cepillo?", ops: ["Cada año", "Cada 3 meses", "Cada semana", "Nunca"], ok: 1, exp: "O antes si las cerdas están deformadas." },
      { q: "La pulpa dental contiene:", ops: ["Solo minerales", "Nervios y vasos sanguíneos", "Esmalte", "Saliva"], ok: 1, exp: "Por eso su inflamación es tan dolorosa." },
      { q: "La gingivitis se caracteriza por:", ops: ["Pérdida de hueso irreversible", "Encía inflamada que sangra, reversible", "Caries en la raíz", "Dientes más blancos"], ok: 1, exp: "Es reversible con una buena higiene." },
      { q: "Concentración de flúor recomendada en pasta para adultos:", ops: ["100 ppm", "1000–1450 ppm", "5 ppm", "10 000 ppm"], ok: 1, exp: "Pastas de 1000–1450 ppm son las de uso general." }
    ]
  },

  /* ============================================================ */
  {
    id: "sutura",
    nombre: "Técnicas de sutura y cirugía menor",
    cat: "Cirugía menor",
    icono: "🪡",
    horas: 24,
    nivel: "Intermedio",
    desc: "Tipos de hilos, agujas, puntos simples, colchonero, intradérmico, nudos y retiro de puntos.",
    escena: {
      tipo: "piel",
      hotspots: [
        { n: "herida", label: "Bordes de la herida", info: "Lavar con suero fisiológico, valorar profundidad, cuerpos extraños y tejido desvitalizado antes de suturar." },
        { n: "punto", label: "Punto simple", info: "La aguja entra perpendicular a la piel, a igual distancia de ambos bordes (≈ 3–5 mm). El nudo se deja a un lado de la herida." },
        { n: "espacio", label: "Separación entre puntos", info: "Aproximadamente igual a la distancia del borde al punto de entrada (5–10 mm en tronco y extremidades)." },
        { n: "aguja", label: "Aguja curva", info: "Se sujeta con el portaagujas en la unión del tercio medio con el tercio posterior. Agujas triangulares (cortantes) para piel." },
        { n: "porta", label: "Portaagujas", info: "Instrumento que sujeta la aguja. Se usa con pinza de disección con dientes (Adson) para manipular la piel con delicadeza." },
        { n: "nudo", label: "Nudo instrumental", info: "Primer lazo doble y luego lazos simples alternando dirección (3–4 lanzadas para monofilamento)." }
      ]
    },
    lecciones: [
      {
        t: "Materiales de sutura",
        c: [
          "Absorbibles: ácido poliglicólico/poliglactina (Vicryl), poliglecaprone (Monocryl), polidioxanona (PDS), catgut. Para planos profundos o mucosas.",
          "No absorbibles: nylon, polipropileno (Prolene), seda, acero. Para piel; se retiran.",
          "Monofilamento: menos infección y menos fricción. Multifilamento: mejor manejo y nudo.",
          "Calibre: más ceros = más fino. Cara 5-0/6-0; tronco y extremidades 3-0/4-0."
        ]
      },
      {
        t: "Tipos de puntos",
        c: [
          "Punto simple: el más usado, fácil de retirar individualmente.",
          "Colchonero vertical: eversión de bordes; útil en zonas de tensión.",
          "Colchonero horizontal: distribuye la tensión, hemostático.",
          "Intradérmico: estético, en la cara o heridas quirúrgicas lineales.",
          "Continuo (surgete): rápido, pero si se rompe se abre toda la herida."
        ]
      },
      {
        t: "Técnica correcta",
        c: [
          "Asepsia, anestesia local (lidocaína; verificar alergias) y lavado de la herida.",
          "Entrar con la aguja a 90° y seguir su curvatura con giro de muñeca.",
          "Misma profundidad y distancia a ambos lados para evitar escalones.",
          "Aproximar los bordes sin estrangular el tejido: 'aproximar, no apretar'.",
          "Comenzar por el centro en heridas largas para alinear correctamente."
        ]
      },
      {
        t: "Retiro de puntos (orientativo)",
        c: [
          "Cara: 4–5 días.",
          "Cuero cabelludo: 7–10 días.",
          "Tronco y extremidades superiores: 10–14 días.",
          "Extremidades inferiores y articulaciones: 14 días.",
          "Cortar el hilo junto a la piel y tirar hacia la herida para no abrirla."
        ]
      }
    ],
    practicas: [
      { tipo: "sutura", titulo: "Simulador de sutura: puntos simples", desc: "Arrastra el dedo o el mouse cruzando la herida, de un borde al otro, para dar cada punto.", puntos: 6 },
      {
        tipo: "clasificar", titulo: "Hilos absorbibles y no absorbibles", desc: "Clasifica cada material.",
        categorias: [
          { id: "abs", label: "Absorbible", color: "#c6ae96" },
          { id: "noabs", label: "No absorbible", color: "#223146" }
        ],
        items: [
          { t: "Poliglactina 910 (Vicryl)", c: "abs" }, { t: "Nylon", c: "noabs" }, { t: "Polipropileno (Prolene)", c: "noabs" },
          { t: "Catgut crómico", c: "abs" }, { t: "Seda", c: "noabs" }, { t: "Polidioxanona (PDS)", c: "abs" },
          { t: "Poliglecaprone (Monocryl)", c: "abs" }, { t: "Acero inoxidable", c: "noabs" }
        ]
      },
      {
        tipo: "secuencia", titulo: "Sutura de una herida simple", desc: "Ordena el procedimiento.",
        pasos: [
          "Valorar la herida y preguntar por alergias",
          "Higiene de manos y colocación de guantes estériles",
          "Lavar la herida con suero fisiológico",
          "Antisepsia y colocación de campo estéril",
          "Infiltrar anestesia local",
          "Realizar los puntos simples comenzando por el centro",
          "Limpiar y cubrir con apósito",
          "Indicar cuidados y fecha de retiro"
        ]
      }
    ],
    quiz: [
      { q: "¿Cuál es un hilo absorbible?", ops: ["Nylon", "Seda", "Poliglactina (Vicryl)", "Polipropileno"], ok: 2, exp: "La poliglactina se reabsorbe en unas semanas." },
      { q: "Calibre más adecuado para la cara:", ops: ["0", "2-0", "3-0", "6-0"], ok: 3, exp: "Hilos finos (5-0, 6-0) dejan menos cicatriz." },
      { q: "¿Cuándo se retiran los puntos de la cara?", ops: ["4–5 días", "10 días", "14 días", "21 días"], ok: 0, exp: "Por su buena irrigación, la cara cicatriza rápido." },
      { q: "La aguja debe entrar en la piel con un ángulo de:", ops: ["15°", "45°", "90°", "180°"], ok: 2, exp: "Perpendicular para lograr eversión de bordes." },
      { q: "El punto que favorece la eversión en zonas de tensión es:", ops: ["Simple", "Colchonero vertical", "Continuo", "Intradérmico"], ok: 1, exp: "El colchonero vertical evierte los bordes." },
      { q: "Principio fundamental al anudar:", ops: ["Apretar al máximo", "Aproximar sin estrangular", "Dejar los bordes separados", "Anudar sobre la herida"], ok: 1, exp: "Apretar demasiado causa isquemia y marcas." }
    ]
  },

  /* ============================================================ */
  {
    id: "instrumentacion",
    nombre: "Instrumentación quirúrgica",
    cat: "Cirugía menor",
    icono: "🔪",
    horas: 40,
    nivel: "Avanzado",
    desc: "Tiempos quirúrgicos, instrumental básico, lavado quirúrgico, vestido estéril y manejo de la mesa de Mayo.",
    escena: {
      tipo: "bandeja",
      hotspots: [
        { n: "bisturi", label: "Mango de bisturí n.º 3/4", info: "Corte (diéresis). Mango n.º 3 lleva hojas 10, 11, 12 y 15; mango n.º 4 lleva hojas 20 a 24." },
        { n: "tijera", label: "Tijera Metzenbaum / Mayo", info: "Metzenbaum: tejidos delicados. Mayo: tejidos gruesos y corte de suturas." },
        { n: "kelly", label: "Pinza Kelly / mosquito", info: "Hemostasia: pinzan vasos sangrantes. La mosquito es más pequeña y fina." },
        { n: "diseccion", label: "Pinza de disección", info: "Prensión: con dientes (tejidos firmes, piel) o sin dientes (tejidos delicados, vísceras)." },
        { n: "separador", label: "Separador Farabeuf", info: "Separación/exposición: mantiene abiertos los planos para que el cirujano vea." },
        { n: "portaagujas", label: "Portaagujas Mayo-Hegar", info: "Síntesis: sujeta la aguja. Se identifica por su punta corta y estrías cruzadas." }
      ]
    },
    lecciones: [
      {
        t: "Tiempos quirúrgicos",
        c: [
          "1. Diéresis: corte o separación de tejidos (bisturí, tijeras).",
          "2. Hemostasia: control del sangrado (pinzas hemostáticas, electrobisturí, ligaduras).",
          "3. Exposición/separación: separadores para ver el campo.",
          "4. Síntesis: unión de tejidos (portaagujas, suturas, grapas).",
          "La mesa de Mayo se ordena siguiendo estos tiempos."
        ]
      },
      {
        t: "Lavado quirúrgico de manos",
        c: [
          "Retirar anillos, reloj y pulseras; uñas cortas y sin esmalte.",
          "Duración de 3 a 5 minutos con antiséptico (clorhexidina 4 % o yodopovidona).",
          "Manos siempre por encima de los codos para que el agua escurra hacia ellos.",
          "Secado con compresa estéril, de los dedos hacia el codo."
        ]
      },
      {
        t: "Principios de asepsia",
        c: [
          "Solo lo estéril toca lo estéril.",
          "La parte estéril de la bata es de la cintura a los hombros por delante y los antebrazos.",
          "Nunca dar la espalda al campo estéril.",
          "Ante la duda de contaminación, se considera contaminado."
        ]
      }
    ],
    practicas: [
      {
        tipo: "clasificar", titulo: "Instrumental por tiempo quirúrgico", desc: "Clasifica el instrumental.",
        categorias: [
          { id: "dieresis", label: "Diéresis (corte)", color: "#c6ae96" },
          { id: "hemostasia", label: "Hemostasia", color: "#d64545" },
          { id: "separacion", label: "Separación", color: "#6b8bb5" },
          { id: "sintesis", label: "Síntesis", color: "#223146" }
        ],
        items: [
          { t: "Bisturí", c: "dieresis" }, { t: "Tijera Metzenbaum", c: "dieresis" }, { t: "Pinza Kelly", c: "hemostasia" },
          { t: "Pinza mosquito", c: "hemostasia" }, { t: "Separador Farabeuf", c: "separacion" }, { t: "Valva maleable", c: "separacion" },
          { t: "Portaagujas Mayo-Hegar", c: "sintesis" }, { t: "Grapadora de piel", c: "sintesis" }, { t: "Tijera Mayo", c: "dieresis" },
          { t: "Separador Balfour (autoestático)", c: "separacion" }, { t: "Electrobisturí (coagulación)", c: "hemostasia" }
        ]
      },
      {
        tipo: "secuencia", titulo: "Lavado y vestido quirúrgico", desc: "Ordena los pasos.",
        pasos: [
          "Colocar gorro, mascarilla y botas",
          "Retirar joyas y revisar uñas",
          "Lavado quirúrgico de manos y antebrazos (3–5 min)",
          "Secado con compresa estéril",
          "Colocación de la bata estéril",
          "Colocación de guantes estériles (técnica cerrada)",
          "Cerrar la bata con ayuda de la circulante"
        ]
      }
    ],
    quiz: [
      { q: "El primer tiempo quirúrgico es:", ops: ["Síntesis", "Hemostasia", "Diéresis", "Separación"], ok: 2, exp: "Diéresis: apertura de los tejidos." },
      { q: "La pinza Kelly se usa para:", ops: ["Cortar", "Hemostasia", "Separar", "Suturar"], ok: 1, exp: "Pinza hemostática." },
      { q: "El lavado quirúrgico dura:", ops: ["20 segundos", "3–5 minutos", "15 minutos", "1 minuto"], ok: 1, exp: "Según el antiséptico, de 3 a 5 minutos." },
      { q: "Durante el lavado, las manos se mantienen:", ops: ["Por debajo de los codos", "Por encima de los codos", "En los bolsillos", "Indiferente"], ok: 1, exp: "El agua debe escurrir de la zona más limpia a la menos limpia." },
      { q: "La tijera Metzenbaum se usa en:", ops: ["Tejidos delicados", "Hueso", "Cortar alambre", "Gasas"], ok: 0, exp: "Es fina y larga, para disección delicada." },
      { q: "Si dudas de que algo esté estéril:", ops: ["Se usa igual", "Se considera contaminado", "Se sopla", "Se pregunta al paciente"], ok: 1, exp: "Principio de asepsia." }
    ]
  },

  /* ============================================================ */
  {
    id: "geriatria",
    nombre: "Cuidado del adulto mayor (Geriatría)",
    cat: "Geriatría",
    icono: "🧓",
    horas: 40,
    nivel: "Básico",
    desc: "Síndromes geriátricos, prevención de úlceras por presión y caídas, movilización y escalas de valoración.",
    escena: {
      tipo: "cama",
      hotspots: [
        { n: "occipital", label: "Occipital", info: "Zona de presión en decúbito supino, frecuente en pacientes muy inmóviles." },
        { n: "escapulas", label: "Escápulas", info: "Proteger con superficies de redistribución de presión." },
        { n: "codos", label: "Codos", info: "Usar protectores y evitar el arrastre al movilizar." },
        { n: "sacro", label: "Sacro", info: "La localización más frecuente de úlceras por presión. Mantener la piel limpia y seca; vigilar la incontinencia." },
        { n: "trocanter", label: "Trocánteres", info: "Zona de riesgo en decúbito lateral. Inclinar 30° en lugar de 90°." },
        { n: "talones", label: "Talones", info: "Segunda zona más frecuente. Dejarlos 'flotando' con una almohada bajo la pantorrilla." },
        { n: "barandas", label: "Barandas y cama baja", info: "Cama en la posición más baja, frenos puestos y timbre al alcance para prevenir caídas." }
      ]
    },
    lecciones: [
      {
        t: "Síndromes geriátricos",
        c: [
          "Caídas, inmovilidad, incontinencia, deterioro cognitivo, delirium (síndrome confusional agudo), polifarmacia, desnutrición y alteraciones sensoriales.",
          "Son frecuentes, multifactoriales y generan dependencia.",
          "La valoración geriátrica integral explora lo clínico, funcional, mental y social."
        ]
      },
      {
        t: "Úlceras por presión (UPP)",
        c: [
          "Lesiones de piel y tejidos por presión mantenida, fricción o cizalla, sobre prominencias óseas.",
          "Valorar el riesgo con la escala de Braden (≤ 12 = riesgo alto) o Norton.",
          "Cambios posturales cada 2 horas (o según superficie y riesgo).",
          "Piel limpia, seca e hidratada; nutrición e hidratación adecuadas.",
          "Estadios: I eritema que no palidece, II pérdida parcial de piel, III pérdida total de piel, IV exposición de músculo/hueso."
        ]
      },
      {
        t: "Prevención de caídas",
        c: [
          "Valorar riesgo (escala de Downton o Morse).",
          "Iluminación adecuada, retirar alfombras, barras en el baño, calzado cerrado antideslizante.",
          "Revisar medicamentos que causan mareo (sedantes, antihipertensivos).",
          "Fomentar el ejercicio de fuerza y equilibrio."
        ]
      },
      {
        t: "Escalas funcionales",
        c: [
          "Índice de Barthel: actividades básicas de la vida diaria (0–100; menor puntaje = más dependencia).",
          "Escala de Lawton y Brody: actividades instrumentales (teléfono, compras, medicación...).",
          "Minimental (MMSE) o Pfeiffer: cribado cognitivo."
        ]
      }
    ],
    practicas: [
      {
        tipo: "objetivo", figura: "espalda", titulo: "Zonas de riesgo de úlceras por presión", desc: "Vista posterior: toca la zona indicada.",
        objetivos: [
          { label: "Sacro", pts: [[100, 214]] },
          { label: "Talones", pts: [[82, 412], [118, 412]] },
          { label: "Escápulas", pts: [[78, 100], [122, 100]] },
          { label: "Occipital", pts: [[100, 32]] },
          { label: "Codos", pts: [[42, 160], [158, 160]] },
          { label: "Trocánteres (cadera)", pts: [[62, 222], [138, 222]] }
        ]
      },
      {
        tipo: "caso", titulo: "Caso: riesgo de caída", desc: "Valora y actúa.",
        paciente: { nombre: "Doña Rosa, 82 años", motivo: "Se levanta sola por la noche para ir al baño; toma lorazepam y enalapril", vitales: { FC: "72", PA: "100/60 de pie", FR: "16", T: "36,4", SpO2: "96" } },
        pasos: [
          { q: "Su PA baja al ponerse de pie. ¿Qué significa?", ops: ["Nada importante", "Hipotensión ortostática: riesgo de caída", "Hipertensión", "Fiebre"], ok: 1, fb: "La caída de la PA al incorporarse produce mareo y caídas." },
          { q: "¿Qué indicas antes de levantarse?", ops: ["Levantarse rápido", "Sentarse al borde de la cama unos minutos antes de ponerse de pie", "No moverse nunca", "Tomar otro lorazepam"], ok: 1, fb: "Cambios posturales lentos y progresivos." },
          { q: "¿Qué medida ambiental es más útil?", ops: ["Apagar todas las luces", "Luz nocturna, timbre a mano y cama baja con frenos", "Alfombras sueltas", "Encerar el piso"], ok: 1, fb: "Un entorno seguro reduce el riesgo de caídas." },
          { q: "Sobre su medicación:", ops: ["Duplicar el lorazepam", "Comunicar al médico para revisar sedantes y antihipertensivos", "Suspenderla por cuenta propia", "No es relevante"], ok: 1, fb: "La polifarmacia es un factor de riesgo modificable." }
        ]
      },
      {
        tipo: "secuencia", titulo: "Cambio postural en cama", desc: "Ordena los pasos para movilizar al paciente.",
        pasos: [
          "Explicar el procedimiento al paciente",
          "Higiene de manos y frenar la cama",
          "Elevar la cama a la altura de trabajo y bajar la baranda del lado de trabajo",
          "Colocar los brazos del paciente sobre el pecho y flexionar la rodilla",
          "Girar en bloque usando la sábana (sin arrastrar)",
          "Colocar almohadas en espalda, entre rodillas y bajo pantorrillas",
          "Revisar la piel, subir la baranda y bajar la cama"
        ]
      }
    ],
    quiz: [
      { q: "Zona más frecuente de úlceras por presión:", ops: ["Codo", "Sacro", "Oreja", "Rodilla"], ok: 1, exp: "Seguida por los talones." },
      { q: "Frecuencia recomendada de cambios posturales:", ops: ["Cada 2 horas", "Cada 8 horas", "Una vez al día", "Nunca"], ok: 0, exp: "Ajustable según riesgo y superficie especial." },
      { q: "La escala de Braden valora:", ops: ["Riesgo de caídas", "Riesgo de úlceras por presión", "Estado cognitivo", "Dolor"], ok: 1, exp: "Puntaje ≤ 12 indica riesgo alto." },
      { q: "El índice de Barthel mide:", ops: ["Actividades básicas de la vida diaria", "Memoria", "Presión arterial", "Peso"], ok: 0, exp: "Evalúa la dependencia funcional." },
      { q: "UPP estadio I es:", ops: ["Úlcera con hueso expuesto", "Eritema que no palidece con piel íntegra", "Ampolla rota", "Necrosis"], ok: 1, exp: "Piel intacta con enrojecimiento persistente." },
      { q: "Para proteger los talones se recomienda:", ops: ["Masajearlos con fuerza", "Dejarlos flotando con almohada bajo la pantorrilla", "Usar flotadores tipo rosca", "Calentarlos con bolsas de agua"], ok: 1, exp: "Los flotadores tipo rosca están contraindicados." }
    ]
  },

  /* ============================================================ */
  {
    id: "laboratorio",
    nombre: "Laboratorio clínico y toma de muestras",
    cat: "Laboratorio",
    icono: "🧪",
    horas: 30,
    nivel: "Intermedio",
    desc: "Flebotomía, orden de llenado de tubos, aditivos, preparación del paciente y uso del microscopio.",
    escena: {
      tipo: "laboratorio",
      hotspots: [
        { n: "celeste", label: "Tubo celeste (citrato)", info: "Pruebas de coagulación (TP, TTP). Llenado exacto hasta la marca: relación sangre/anticoagulante 9:1." },
        { n: "rojo", label: "Tubo rojo / amarillo (suero)", info: "Química sanguínea, serología. El amarillo tiene gel separador. Dejar coagular 30 min antes de centrifugar." },
        { n: "verde", label: "Tubo verde (heparina)", info: "Química en plasma, gasometría y amonio." },
        { n: "lila", label: "Tubo lila (EDTA)", info: "Hemograma, grupo y factor Rh, HbA1c. Invertir suavemente 8 veces." },
        { n: "gris", label: "Tubo gris (fluoruro)", info: "Glucosa y lactato: el fluoruro inhibe la glucólisis." },
        { n: "microscopio", label: "Microscopio", info: "Enfocar primero con el objetivo de menor aumento (4x/10x) y el macrométrico; el objetivo 100x requiere aceite de inmersión." },
        { n: "centrifuga", label: "Centrífuga", info: "Balancear siempre los tubos (pesos iguales enfrentados) y no abrir hasta que se detenga por completo." }
      ]
    },
    lecciones: [
      {
        t: "Preparación del paciente",
        c: [
          "Ayuno de 8 a 12 horas para glucosa y perfil lipídico (agua permitida).",
          "Evitar ejercicio intenso y alcohol el día previo.",
          "Identificar al paciente y rotular los tubos frente a él.",
          "Registrar la medicación que toma (anticoagulantes, etc.)."
        ]
      },
      {
        t: "Orden de llenado de tubos (CLSI)",
        c: [
          "1. Hemocultivos (frascos estériles).",
          "2. Celeste (citrato).",
          "3. Rojo o amarillo (suero, con o sin gel).",
          "4. Verde (heparina).",
          "5. Lila (EDTA).",
          "6. Gris (fluoruro/oxalato).",
          "Este orden evita la contaminación cruzada de aditivos."
        ]
      },
      {
        t: "Técnica de venopunción",
        c: [
          "Torniquete 7–10 cm por encima, máximo 1 minuto.",
          "Antisepsia con alcohol 70 % y dejar secar.",
          "Puncionar con bisel hacia arriba a 15–30°.",
          "Retirar el torniquete cuando la sangre empiece a fluir, luego retirar la aguja y presionar.",
          "Invertir suavemente los tubos con aditivo; nunca agitarlos (hemólisis)."
        ]
      },
      {
        t: "Valores de referencia de glucosa",
        c: [
          "Normal en ayunas: 70–99 mg/dL.",
          "Prediabetes: 100–125 mg/dL.",
          "Diabetes: ≥ 126 mg/dL en dos ocasiones.",
          "Hipoglucemia: < 70 mg/dL."
        ]
      }
    ],
    practicas: [
      {
        tipo: "secuencia", titulo: "Orden de llenado de tubos", desc: "Toca los tubos en el orden correcto de extracción.",
        pasos: ["Hemocultivo", "Celeste · Citrato", "Rojo/Amarillo · Suero", "Verde · Heparina", "Lila · EDTA", "Gris · Fluoruro"]
      },
      {
        tipo: "clasificar", titulo: "¿Qué tubo uso?", desc: "Elige el tubo correcto para cada examen.",
        categorias: [
          { id: "celeste", label: "Celeste · Citrato", color: "#7cc6e8" },
          { id: "rojo", label: "Rojo · Suero", color: "#d64545" },
          { id: "lila", label: "Lila · EDTA", color: "#9a6bc4" },
          { id: "gris", label: "Gris · Fluoruro", color: "#8c8c8c" }
        ],
        items: [
          { t: "Hemograma completo", c: "lila" }, { t: "Tiempo de protrombina (TP)", c: "celeste" }, { t: "Glucosa", c: "gris" },
          { t: "Perfil lipídico", c: "rojo" }, { t: "Grupo sanguíneo y Rh", c: "lila" }, { t: "TTP", c: "celeste" },
          { t: "Creatinina y urea", c: "rojo" }, { t: "Hemoglobina glicosilada (HbA1c)", c: "lila" }, { t: "Serología VIH", c: "rojo" }
        ]
      },
      { tipo: "calculo", generador: "dilucion", titulo: "Diluciones de laboratorio", desc: "Calcula volúmenes con C₁·V₁ = C₂·V₂.", rondas: 4 }
    ],
    quiz: [
      { q: "El tubo para hemograma es de tapa:", ops: ["Roja", "Lila", "Celeste", "Gris"], ok: 1, exp: "EDTA (lila)." },
      { q: "Las pruebas de coagulación se toman en tubo:", ops: ["Celeste", "Verde", "Gris", "Amarillo"], ok: 0, exp: "Citrato de sodio (celeste)." },
      { q: "¿Cuál va primero en el orden de llenado?", ops: ["Lila", "Gris", "Hemocultivo", "Verde"], ok: 2, exp: "Los hemocultivos se toman primero para evitar contaminación." },
      { q: "Glucosa en ayunas de 130 mg/dL en dos ocasiones sugiere:", ops: ["Normalidad", "Prediabetes", "Diabetes", "Hipoglucemia"], ok: 2, exp: "≥ 126 mg/dL en dos ocasiones." },
      { q: "Agitar vigorosamente un tubo de sangre provoca:", ops: ["Mejor mezcla", "Hemólisis", "Coagulación más rápida", "Nada"], ok: 1, exp: "Se debe invertir suavemente." },
      { q: "El objetivo de 100x del microscopio requiere:", ops: ["Agua", "Aceite de inmersión", "Alcohol", "Nada"], ok: 1, exp: "El aceite mejora la resolución." }
    ]
  },

  /* ============================================================ */
  {
    id: "bioseguridad",
    nombre: "Bioseguridad y control de infecciones",
    cat: "Bioseguridad",
    icono: "🧤",
    horas: 16,
    nivel: "Básico",
    desc: "Higiene de manos (OMS), equipo de protección personal, manejo de residuos y precauciones de aislamiento.",
    escena: {
      tipo: "residuos",
      hotspots: [
        { n: "rojo", label: "Funda roja · Infecciosos", info: "Material contaminado con sangre o fluidos: gasas, guantes usados, apósitos, cultivos." },
        { n: "negro", label: "Funda negra · Comunes", info: "Residuos no peligrosos: papel no reciclable, restos de comida, envolturas." },
        { n: "guardian", label: "Recipiente cortopunzante", info: "Agujas, bisturíes, lancetas, ampollas rotas. Rígido, resistente a perforación; llenar solo hasta 3/4." },
        { n: "reciclable", label: "Reciclables", info: "Papel, cartón y plástico limpios, no contaminados." },
        { n: "lavamanos", label: "Higiene de manos", info: "Agua y jabón 40–60 s cuando hay suciedad visible; solución alcohólica 20–30 s en el resto de casos." }
      ]
    },
    lecciones: [
      {
        t: "Los 5 momentos de la higiene de manos (OMS)",
        c: [
          "1. Antes del contacto con el paciente.",
          "2. Antes de realizar una tarea limpia/aséptica.",
          "3. Después del riesgo de exposición a fluidos corporales.",
          "4. Después del contacto con el paciente.",
          "5. Después del contacto con el entorno del paciente."
        ]
      },
      {
        t: "Equipo de protección personal (EPP)",
        c: [
          "Colocación: bata → mascarilla/respirador → gafas o careta → guantes.",
          "Retiro: guantes → gafas/careta → bata → mascarilla (o guantes y bata juntos), con higiene de manos al final.",
          "El retiro es el momento de mayor riesgo de autocontaminación.",
          "Respirador N95 para enfermedades de transmisión aérea (tuberculosis, sarampión)."
        ]
      },
      {
        t: "Clasificación de residuos sanitarios",
        c: [
          "Infecciosos/biológicos: funda roja.",
          "Comunes: funda negra.",
          "Cortopunzantes: recipiente rígido (guardián).",
          "Reciclables: según el sistema local.",
          "Farmacéuticos y químicos: recipientes específicos según la normativa vigente de cada país."
        ]
      },
      {
        t: "Precauciones de aislamiento",
        c: [
          "Estándar: con todos los pacientes (higiene de manos, EPP según riesgo, manejo de cortopunzantes).",
          "Contacto: bata y guantes (ej.: bacterias multirresistentes, C. difficile).",
          "Gotas: mascarilla quirúrgica a menos de 1 m (ej.: influenza).",
          "Aérea: respirador N95 y habitación con presión negativa (ej.: tuberculosis)."
        ]
      }
    ],
    practicas: [
      {
        tipo: "secuencia", titulo: "Lavado de manos según la OMS", desc: "Ordena los pasos (40–60 segundos).",
        pasos: [
          "Mojar las manos con agua",
          "Aplicar jabón suficiente",
          "Frotar palma con palma",
          "Palma derecha sobre dorso izquierdo entrelazando dedos, y viceversa",
          "Palma con palma con los dedos entrelazados",
          "Dorso de los dedos contra la palma opuesta",
          "Frotar los pulgares con movimiento de rotación",
          "Frotar las yemas contra la palma opuesta",
          "Enjuagar con agua",
          "Secar con toalla desechable y cerrar el grifo con ella"
        ]
      },
      {
        tipo: "clasificar", titulo: "Clasificación de residuos", desc: "Lleva cada residuo a su recipiente.",
        categorias: [
          { id: "rojo", label: "Funda roja · Infeccioso", color: "#d64545" },
          { id: "negro", label: "Funda negra · Común", color: "#333333" },
          { id: "guardian", label: "Guardián · Cortopunzante", color: "#e0b020" },
          { id: "reciclable", label: "Reciclable", color: "#2e9d5b" }
        ],
        items: [
          { t: "Aguja usada", c: "guardian" }, { t: "Gasa con sangre", c: "rojo" }, { t: "Envoltura de papel de un dulce", c: "negro" },
          { t: "Hoja de bisturí", c: "guardian" }, { t: "Guantes con fluidos", c: "rojo" }, { t: "Caja de cartón limpia", c: "reciclable" },
          { t: "Ampolla de vidrio rota", c: "guardian" }, { t: "Restos de comida del personal", c: "negro" }, { t: "Apósito de herida", c: "rojo" },
          { t: "Botella plástica limpia", c: "reciclable" }, { t: "Lanceta de glucometría", c: "guardian" }
        ]
      },
      {
        tipo: "secuencia", titulo: "Colocación del EPP", desc: "Ordena la colocación correcta.",
        pasos: ["Higiene de manos", "Bata", "Mascarilla o respirador", "Gafas o careta", "Guantes (cubriendo el puño de la bata)"]
      }
    ],
    quiz: [
      { q: "Duración del lavado de manos con agua y jabón:", ops: ["5–10 s", "40–60 s", "5 minutos", "2 minutos"], ok: 1, exp: "40 a 60 segundos según la OMS." },
      { q: "Una aguja usada va en:", ops: ["Funda roja", "Funda negra", "Recipiente cortopunzante", "Reciclaje"], ok: 2, exp: "Siempre en recipiente rígido." },
      { q: "Lo primero que se retira del EPP es:", ops: ["Mascarilla", "Guantes", "Gafas", "Gorro"], ok: 1, exp: "Los guantes son lo más contaminado." },
      { q: "Para tuberculosis se usa precaución:", ops: ["Contacto", "Gotas", "Aérea con N95", "Ninguna"], ok: 2, exp: "Transmisión aérea por núcleos de gotitas." },
      { q: "¿Hasta qué nivel se llena el recipiente cortopunzante?", ops: ["Hasta rebosar", "Tres cuartas partes", "La mitad", "No importa"], ok: 1, exp: "Para evitar pinchazos al cerrarlo." },
      { q: "¿Cuántos momentos de higiene de manos define la OMS?", ops: ["3", "5", "7", "10"], ok: 1, exp: "Los 5 momentos." }
    ]
  },

  /* ============================================================ */
  {
    id: "materno",
    nombre: "Enfermería materno-infantil y pediátrica",
    cat: "Materno-infantil",
    icono: "👶",
    horas: 30,
    nivel: "Intermedio",
    desc: "Atención del recién nacido, test de Apgar, lactancia materna, signos vitales pediátricos y dosis por peso.",
    escena: {
      tipo: "cuerpo",
      bebe: true,
      hotspots: [
        { n: "temporal", label: "Fontanelas", info: "La anterior cierra entre los 12 y 18 meses. Abombada: posible hipertensión intracraneal; hundida: deshidratación." },
        { n: "apical", label: "FC del recién nacido", info: "120–160 lpm. Se ausculta el pulso apical durante 1 minuto." },
        { n: "abdomen", label: "Cordón umbilical", info: "Mantener limpio y seco; cae entre los 5 y 15 días. Signos de alarma: enrojecimiento, mal olor, secreción." },
        { n: "vasto", label: "Vitamina K y vacunas", info: "Vitamina K IM en el vasto lateral al nacer para prevenir la enfermedad hemorrágica." },
        { n: "carotideo", label: "Respiración", info: "FR normal del recién nacido: 30–60 rpm, respiración principalmente abdominal." }
      ]
    },
    lecciones: [
      {
        t: "Test de Apgar",
        c: [
          "Se valora al minuto y a los 5 minutos de vida.",
          "Apariencia (color), Pulso, Gesticulación (respuesta a estímulos), Actividad (tono) y Respiración: 0 a 2 puntos cada uno.",
          "7–10: normal · 4–6: depresión moderada · 0–3: depresión severa.",
          "No se espera al Apgar para iniciar la reanimación si es necesaria."
        ]
      },
      {
        t: "Signos vitales pediátricos",
        c: [
          "Recién nacido: FC 120–160 lpm, FR 30–60 rpm.",
          "Lactante: FC 100–160 lpm, FR 30–50 rpm.",
          "Preescolar: FC 80–140 lpm, FR 20–30 rpm.",
          "Escolar: FC 70–120 lpm, FR 18–25 rpm."
        ]
      },
      {
        t: "Lactancia materna",
        c: [
          "Exclusiva durante los primeros 6 meses y complementada hasta los 2 años o más.",
          "Inicio en la primera hora de vida (contacto piel con piel).",
          "Buen agarre: boca bien abierta, labios evertidos, mentón tocando el pecho, más areola visible arriba que abajo.",
          "A libre demanda: 8 a 12 tomas al día en el recién nacido."
        ]
      },
      {
        t: "Dosis pediátricas por peso",
        c: [
          "Dosis (mg) = peso (kg) × dosis indicada (mg/kg).",
          "Volumen (mL) = dosis (mg) ÷ concentración (mg/mL).",
          "Ejemplo: paracetamol 15 mg/kg en un niño de 12 kg = 180 mg; jarabe de 160 mg/5 mL → 5,6 mL.",
          "Nunca superar la dosis máxima del adulto."
        ]
      }
    ],
    practicas: [
      { tipo: "calculo", generador: "pediatrica", titulo: "Dosis pediátrica por peso", desc: "Calcula la dosis y el volumen.", rondas: 5 },
      {
        tipo: "caso", titulo: "Caso: Apgar al minuto", desc: "Calcula y decide.",
        paciente: { nombre: "Recién nacido a término", motivo: "Valoración al minuto de vida", vitales: { FC: "110", PA: "—", FR: "Llanto débil", T: "36,6", SpO2: "—" } },
        pasos: [
          { q: "FC de 110 lpm. ¿Cuántos puntos de Pulso?", ops: ["0", "1", "2"], ok: 2, fb: "FC ausente = 0, menor de 100 = 1, igual o mayor de 100 = 2 puntos." },
          { q: "Respiración: llanto débil, irregular. ¿Puntos?", ops: ["0", "1", "2"], ok: 1, fb: "Respiración lenta o irregular = 1 punto." },
          { q: "Tono: cierta flexión de extremidades. ¿Puntos?", ops: ["0", "1", "2"], ok: 1, fb: "Flexión leve = 1; movimiento activo = 2." },
          { q: "Color: cuerpo rosado, extremidades azuladas (acrocianosis). ¿Puntos?", ops: ["0", "1", "2"], ok: 1, fb: "La acrocianosis puntúa 1." },
          { q: "Mueca ante la estimulación. Con todo lo anterior el Apgar total es 2+1+1+1+1 = 6. ¿Interpretación?", ops: ["Normal", "Depresión moderada: estimular y vigilar, apoyo ventilatorio si es necesario", "Depresión severa", "Fallecido"], ok: 1, fb: "4–6 = depresión moderada." }
        ]
      },
      {
        tipo: "secuencia", titulo: "Atención inmediata del recién nacido", desc: "Ordena las acciones.",
        pasos: [
          "Recibir al bebé en campo tibio y seco",
          "Secar y estimular",
          "Valorar respiración, tono y llanto",
          "Contacto piel con piel con la madre",
          "Pinzamiento tardío del cordón (1–3 min)",
          "Apgar al minuto y a los 5 minutos",
          "Inicio de lactancia en la primera hora",
          "Vitamina K, profilaxis ocular e identificación"
        ]
      }
    ],
    quiz: [
      { q: "FC normal del recién nacido:", ops: ["60–100 lpm", "120–160 lpm", "180–220 lpm", "40–60 lpm"], ok: 1, exp: "120 a 160 lpm." },
      { q: "El Apgar se valora:", ops: ["Solo al nacer", "Al minuto y a los 5 minutos", "A las 24 horas", "Al mes"], ok: 1, exp: "Y se repite cada 5 minutos si es < 7." },
      { q: "Un Apgar de 8 indica:", ops: ["Depresión severa", "Depresión moderada", "Normal", "Muerte"], ok: 2, exp: "7–10 es normal." },
      { q: "Lactancia materna exclusiva durante:", ops: ["1 mes", "3 meses", "6 meses", "12 meses"], ok: 2, exp: "Recomendación de la OMS." },
      { q: "Niño de 20 kg, ibuprofeno 10 mg/kg. Dosis:", ops: ["100 mg", "200 mg", "400 mg", "20 mg"], ok: 1, exp: "20 × 10 = 200 mg." },
      { q: "Una fontanela hundida sugiere:", ops: ["Deshidratación", "Fiebre", "Buena salud", "Hipertensión intracraneal"], ok: 0, exp: "Signo de deshidratación en lactantes." }
    ]
  },

  /* ============================================================ */
  {
    id: "ecg",
    nombre: "Electrocardiografía básica",
    cat: "Enfermería",
    icono: "📈",
    horas: 20,
    nivel: "Intermedio",
    desc: "Colocación de electrodos, papel del ECG, cálculo de frecuencia e identificación de ritmos básicos.",
    escena: {
      tipo: "ecg",
      hotspots: [
        { n: "V1", label: "V1", info: "4.º espacio intercostal, borde derecho del esternón." },
        { n: "V2", label: "V2", info: "4.º espacio intercostal, borde izquierdo del esternón." },
        { n: "V3", label: "V3", info: "Punto medio entre V2 y V4." },
        { n: "V4", label: "V4", info: "5.º espacio intercostal, línea medioclavicular izquierda." },
        { n: "V5", label: "V5", info: "Línea axilar anterior, mismo nivel horizontal que V4." },
        { n: "V6", label: "V6", info: "Línea axilar media, mismo nivel que V4 y V5." },
        { n: "corazon", label: "Sistema de conducción", info: "Nodo sinusal → aurículas (onda P) → nodo AV → haz de His → fibras de Purkinje (QRS). La onda T es la repolarización ventricular." }
      ]
    },
    lecciones: [
      {
        t: "Electrodos",
        c: [
          "Miembros: rojo brazo derecho (RA), amarillo brazo izquierdo (LA), verde pierna izquierda (LL), negro pierna derecha (RL). Regla: 'el sol (amarillo) arriba a la izquierda, el pasto (verde) abajo'.",
          "Precordiales: V1 y V2 en el 4.º espacio intercostal a cada lado del esternón; V4 en el 5.º espacio, línea medioclavicular; V3 entre V2 y V4; V5 y V6 al nivel de V4 en las líneas axilar anterior y media.",
          "Piel limpia y seca; rasurar el vello si es necesario.",
          "Paciente en reposo, sin hablar ni moverse."
        ]
      },
      {
        t: "El papel del ECG",
        c: [
          "Velocidad estándar: 25 mm/s.",
          "Cuadro pequeño = 1 mm = 0,04 s; cuadro grande = 5 mm = 0,20 s.",
          "FC (ritmo regular) = 300 ÷ número de cuadros grandes entre dos ondas R.",
          "FC (ritmo irregular) = número de QRS en 6 segundos × 10."
        ]
      },
      {
        t: "Ritmos básicos",
        c: [
          "Ritmo sinusal: onda P antes de cada QRS, regular, 60–100 lpm.",
          "Bradicardia sinusal: < 60 lpm. Taquicardia sinusal: > 100 lpm.",
          "Fibrilación auricular: irregularmente irregular, sin ondas P.",
          "Fibrilación ventricular: ondas caóticas sin QRS: ¡paro, desfibrilar!",
          "Asistolia: línea plana; comprobar conexiones y derivaciones. No es desfibrilable."
        ]
      }
    ],
    practicas: [
      { tipo: "signos", modo: "ritmos", titulo: "Identifica el ritmo", desc: "Observa el trazado del monitor y elige el ritmo correcto.", rondas: 6 },
      {
        tipo: "objetivo", figura: "torax", titulo: "Coloca los electrodos precordiales", desc: "Toca la posición correcta de cada electrodo.",
        r: 9,
        objetivos: [
          { label: "V1", pts: [[90, 92]] },
          { label: "V2", pts: [[110, 92]] },
          { label: "V3", pts: [[121, 103]] },
          { label: "V4", pts: [[132, 114]] },
          { label: "V5", pts: [[148, 114]] },
          { label: "V6", pts: [[164, 114]] }
        ]
      },
      { tipo: "calculo", generador: "fc_ecg", titulo: "Frecuencia cardíaca en el papel", desc: "Calcula la FC con la regla del 300.", rondas: 5 }
    ],
    quiz: [
      { q: "V1 se coloca en:", ops: ["5.º EIC línea medioclavicular izq.", "4.º EIC borde esternal derecho", "Línea axilar media", "2.º EIC"], ok: 1, exp: "4.º espacio intercostal, borde derecho del esternón." },
      { q: "Un cuadro grande del papel equivale a:", ops: ["0,04 s", "0,20 s", "1 s", "0,5 s"], ok: 1, exp: "5 cuadros pequeños × 0,04 s." },
      { q: "Si hay 4 cuadros grandes entre R y R, la FC es:", ops: ["50 lpm", "75 lpm", "100 lpm", "150 lpm"], ok: 1, exp: "300 ÷ 4 = 75 lpm." },
      { q: "Ritmo irregularmente irregular sin ondas P:", ops: ["Ritmo sinusal", "Fibrilación auricular", "Bradicardia sinusal", "Asistolia"], ok: 1, exp: "Característico de la FA." },
      { q: "¿Qué ritmo es desfibrilable?", ops: ["Asistolia", "Fibrilación ventricular", "Ritmo sinusal", "Bradicardia sinusal"], ok: 1, exp: "FV y taquicardia ventricular sin pulso." },
      { q: "El electrodo rojo de miembros va en:", ops: ["Brazo derecho", "Brazo izquierdo", "Pierna izquierda", "Pierna derecha"], ok: 0, exp: "Rojo = brazo derecho (norma AHA usa blanco; en la norma europea/IEC, rojo)." }
    ]
  },

  /* ============================================================ */
  {
    id: "fisioterapia",
    nombre: "Fisioterapia y rehabilitación",
    cat: "Rehabilitación",
    icono: "🦵",
    horas: 30,
    nivel: "Básico",
    desc: "Anatomía muscular, rangos de movimiento, ayudas técnicas para la marcha y transferencias seguras.",
    escena: {
      tipo: "cuerpo",
      hotspots: [
        { n: "deltoides", label: "Deltoides", info: "Abducción del hombro. Rango de abducción: 0–180°." },
        { n: "pectoral", label: "Pectoral mayor", info: "Aducción y rotación interna del hombro." },
        { n: "biceps", label: "Bíceps braquial", info: "Flexión del codo y supinación del antebrazo. Flexión de codo: 0–145°." },
        { n: "abdomen", label: "Recto abdominal", info: "Flexión del tronco. Su fortalecimiento protege la zona lumbar." },
        { n: "cuadriceps", label: "Cuádriceps", info: "Extensión de la rodilla. Clave para levantarse de una silla y subir escaleras." },
        { n: "isquios", label: "Isquiotibiales", info: "Flexión de la rodilla y extensión de la cadera. Su acortamiento limita la flexión del tronco." },
        { n: "gemelos", label: "Gastrocnemio", info: "Flexión plantar del tobillo; impulso en la marcha." }
      ]
    },
    lecciones: [
      {
        t: "Movimientos y planos",
        c: [
          "Flexión/extensión (plano sagital), abducción/aducción (plano frontal), rotación (plano transversal).",
          "Goniometría: medición de los rangos articulares con goniómetro.",
          "Rangos normales: flexión de hombro 0–180°, flexión de codo 0–145°, flexión de rodilla 0–135°, flexión de cadera 0–120°."
        ]
      },
      {
        t: "Ayudas para la marcha",
        c: [
          "Bastón: se lleva en la mano del lado sano y avanza junto con la pierna afectada.",
          "Altura del bastón o andador: a la altura del trocánter mayor (codo flexionado 15–30°).",
          "Escaleras: 'sube con la buena, baja con la mala' (la pierna sana sube primero; la afectada baja primero, junto con el bastón).",
          "Andador: avanzar el andador, luego la pierna afectada y después la sana."
        ]
      },
      {
        t: "Transferencias seguras",
        c: [
          "Frenar la silla de ruedas y retirar los apoyapiés.",
          "Colocar la silla a 45° de la cama, del lado sano del paciente.",
          "Mecánica corporal del cuidador: base amplia, rodillas flexionadas, espalda recta, carga cerca del cuerpo.",
          "Usar cinturón de transferencia si está disponible."
        ]
      }
    ],
    practicas: [
      {
        tipo: "objetivo", figura: "cuerpo", titulo: "Músculos principales (vista anterior)", desc: "Toca el músculo indicado.",
        objetivos: [
          { label: "Deltoides", pts: [[57, 92], [143, 92]] },
          { label: "Pectoral mayor", pts: [[82, 108], [118, 108]] },
          { label: "Bíceps braquial", pts: [[48, 128], [152, 128]] },
          { label: "Recto abdominal", pts: [[100, 172]] },
          { label: "Cuádriceps", pts: [[82, 282], [118, 282]] },
          { label: "Tibial anterior", pts: [[82, 360], [118, 360]] }
        ]
      },
      {
        tipo: "caso", titulo: "Caso: marcha con bastón", desc: "Enseña el uso correcto.",
        paciente: { nombre: "Don Luis, 70 años", motivo: "Debilidad en la pierna derecha tras un ACV leve", vitales: { FC: "76", PA: "130/80", FR: "16", T: "36,5", SpO2: "97" } },
        pasos: [
          { q: "¿En qué mano debe llevar el bastón?", ops: ["Derecha", "Izquierda (lado sano)", "Cualquiera", "En ninguna"], ok: 1, fb: "Se lleva en el lado contrario a la pierna afectada." },
          { q: "¿Cómo se ajusta la altura?", ops: ["A la altura del hombro", "A la altura del trocánter mayor (muñeca)", "Lo más bajo posible", "A la altura de la rodilla"], ok: 1, fb: "Con el codo ligeramente flexionado." },
          { q: "Para subir escaleras:", ops: ["Primero la pierna derecha (afectada)", "Primero la pierna izquierda (sana), luego bastón y pierna afectada", "Saltando", "De espaldas"], ok: 1, fb: "Sube con la buena." },
          { q: "Para bajar escaleras:", ops: ["Primero bastón y pierna afectada, luego la sana", "Primero la sana", "Corriendo", "Sin bastón"], ok: 0, fb: "Baja con la mala." }
        ]
      },
      {
        tipo: "secuencia", titulo: "Transferencia cama → silla de ruedas", desc: "Ordena los pasos.",
        pasos: [
          "Explicar el procedimiento al paciente",
          "Colocar la silla a 45° del lado sano y frenarla",
          "Retirar los apoyapiés",
          "Sentar al paciente al borde de la cama",
          "Esperar unos segundos por si hay mareo",
          "Ponerse de pie con apoyo y pivotar sobre la pierna sana",
          "Sentarse lentamente y colocar los apoyapiés"
        ]
      }
    ],
    quiz: [
      { q: "El bastón se lleva en:", ops: ["El lado afectado", "El lado sano", "Ambos lados", "No importa"], ok: 1, exp: "Lado contrario a la pierna afectada." },
      { q: "El músculo que extiende la rodilla es:", ops: ["Isquiotibiales", "Cuádriceps", "Gastrocnemio", "Glúteo"], ok: 1, exp: "El cuádriceps." },
      { q: "Rango normal de flexión de hombro:", ops: ["0–90°", "0–180°", "0–45°", "0–360°"], ok: 1, exp: "0 a 180°." },
      { q: "En escaleras se dice:", ops: ["Sube con la mala, baja con la buena", "Sube con la buena, baja con la mala", "Siempre primero la derecha", "Siempre primero el bastón"], ok: 1, exp: "Sube con la buena, baja con la mala." },
      { q: "La silla de ruedas se coloca respecto a la cama a:", ops: ["90° del lado afectado", "45° del lado sano", "180°", "Lejos de la cama"], ok: 1, exp: "Facilita el giro sobre la pierna sana." },
      { q: "La goniometría mide:", ops: ["Fuerza", "Rangos articulares", "Presión", "Peso"], ok: 1, exp: "Con un goniómetro." }
    ]
  },

  /* ============================================================ */
  {
    id: "nutricion",
    nombre: "Nutrición clínica y alimentación saludable",
    cat: "Nutrición",
    icono: "🥗",
    horas: 20,
    nivel: "Básico",
    desc: "IMC, plato saludable, macronutrientes, requerimientos de agua y alimentación del paciente hospitalizado.",
    escena: {
      tipo: "plato",
      hotspots: [
        { n: "verduras", label: "Verduras y hortalizas (½ plato)", info: "Fibra, vitaminas y minerales. La mitad del plato con verduras y frutas variadas." },
        { n: "proteina", label: "Proteínas (¼ plato)", info: "Pescado, pollo, legumbres, huevo. Limitar carnes rojas y procesadas." },
        { n: "cereales", label: "Cereales integrales (¼ plato)", info: "Arroz integral, quinua, avena, pan integral. Energía de liberación lenta." },
        { n: "fruta", label: "Fruta", info: "Preferir la fruta entera al jugo para conservar la fibra." },
        { n: "agua", label: "Agua", info: "Bebida de elección. Requerimiento aproximado: 30–35 mL/kg/día en adultos sanos." },
        { n: "aceite", label: "Aceites saludables", info: "Oliva, aguacate, frutos secos con moderación. Las grasas aportan 9 kcal/g." }
      ]
    },
    lecciones: [
      {
        t: "Índice de masa corporal (IMC)",
        c: [
          "IMC = peso (kg) ÷ talla² (m).",
          "< 18,5 bajo peso · 18,5–24,9 normal · 25–29,9 sobrepeso · ≥ 30 obesidad.",
          "No distingue grasa de músculo: complementar con el perímetro abdominal (riesgo: > 94 cm en hombres y > 80 cm en mujeres, según la IDF)."
        ]
      },
      {
        t: "Macronutrientes",
        c: [
          "Carbohidratos: 4 kcal/g (45–65 % de la energía).",
          "Proteínas: 4 kcal/g (10–35 %; aprox. 0,8 g/kg/día en adultos sanos).",
          "Grasas: 9 kcal/g (20–35 %).",
          "Fibra: 25–30 g/día."
        ]
      },
      {
        t: "Paciente hospitalizado",
        c: [
          "Cribado nutricional al ingreso (ej.: NRS-2002, MUST).",
          "Dietas terapéuticas: líquida clara, blanda, hiposódica, para diabético, hipograsa.",
          "Posición semisentada (30–45°) para comer y en la nutrición enteral, para prevenir aspiración.",
          "Registrar ingesta y control de peso."
        ]
      }
    ],
    practicas: [
      { tipo: "calculo", generador: "imc", titulo: "Calcula e interpreta el IMC", desc: "Calcula el IMC con un decimal.", rondas: 5 },
      {
        tipo: "clasificar", titulo: "Arma el plato saludable", desc: "¿En qué parte del plato va cada alimento?",
        categorias: [
          { id: "verdura", label: "Verduras / frutas", color: "#2e9d5b" },
          { id: "proteina", label: "Proteínas", color: "#8a4f4f" },
          { id: "cereal", label: "Cereales / tubérculos", color: "#c6ae96" }
        ],
        items: [
          { t: "Brócoli", c: "verdura" }, { t: "Pechuga de pollo", c: "proteina" }, { t: "Arroz integral", c: "cereal" },
          { t: "Lentejas", c: "proteina" }, { t: "Tomate", c: "verdura" }, { t: "Quinua", c: "cereal" },
          { t: "Pescado", c: "proteina" }, { t: "Papa cocida", c: "cereal" }, { t: "Manzana", c: "verdura" }, { t: "Huevo", c: "proteina" }
        ]
      }
    ],
    quiz: [
      { q: "Una persona de 80 kg y 1,60 m tiene un IMC aproximado de:", ops: ["21,3", "25", "31,3", "50"], ok: 2, exp: "80 ÷ 2,56 = 31,25 → obesidad." },
      { q: "IMC normal:", ops: ["< 18,5", "18,5–24,9", "25–29,9", "≥ 30"], ok: 1, exp: "Según la OMS." },
      { q: "1 gramo de grasa aporta:", ops: ["4 kcal", "7 kcal", "9 kcal", "2 kcal"], ok: 2, exp: "Las grasas son el macronutriente más energético." },
      { q: "En el plato saludable, las verduras y frutas ocupan:", ops: ["¼", "½", "Todo", "Nada"], ok: 1, exp: "La mitad del plato." },
      { q: "Requerimiento hídrico aproximado en adultos sanos:", ops: ["5 mL/kg/día", "30–35 mL/kg/día", "100 mL/kg/día", "1 L/kg/día"], ok: 1, exp: "Para 70 kg ≈ 2,1–2,5 L/día." },
      { q: "Posición del paciente con nutrición enteral:", ops: ["Decúbito supino plano", "Semisentado 30–45°", "Boca abajo", "Trendelenburg"], ok: 1, exp: "Previene la broncoaspiración." }
    ]
  }
];
