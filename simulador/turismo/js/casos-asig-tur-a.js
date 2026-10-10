/* Prácticas por asignatura – Gestión de Operaciones Turísticas (PAO 1–2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  {
    id: 'asig-GOT-B-101', cod: 'GOT-B-101',
    titulo: 'Presentar el informe técnico del tour',
    asignaturas: ['GOT-B-101'],
    persona: { nombre: 'Lic. Verónica Santi', rol: 'Jefa de operaciones de la operadora', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'Tras el tour del fin de semana, la jefa te pide entregar un informe técnico escrito y presentarlo oralmente al equipo de la operadora en cinco minutos.',
    objetivo: 'Aplicar la estructura de los textos técnicos, la presentación oral efectiva y el lenguaje técnico-turístico.',
    pasos: [
      { dice: '¿Cómo vas a organizar el informe escrito?', opciones: [
        { t: 'Con portada, introducción con el objetivo, desarrollo con datos del tour (pax, itinerario, novedades), conclusiones y recomendaciones.', p: 2, r: 'Perfecto, así se lee rápido.', fb: 'El informe técnico tiene una estructura clara: introducción, desarrollo, conclusiones y recomendaciones.' },
        { t: 'Escribo todo lo que pasó en un solo párrafo largo.', p: 1, r: 'Va a ser difícil encontrar los datos.', fb: 'Contar lo ocurrido no basta: un texto técnico se organiza en partes.' },
        { t: 'Le mando un audio de WhatsApp contando cómo fue.', p: 0, r: 'Necesito un documento formal.', fb: 'Un informe técnico es un texto escrito formal que queda como respaldo.' }
      ]},
      { dice: 'Ahora preséntalo al equipo. ¿Cómo lo harás?', opciones: [
        { t: 'Saludo, anuncio los tres puntos, hablo con voz clara y contacto visual, me apoyo en una diapositiva con cifras y cierro con una conclusión.', p: 2, r: 'Muy clara la exposición.', fb: 'Estructura anunciada, voz, contacto visual y apoyo visual son técnicas de presentación oral efectiva.' },
        { t: 'Leo el informe completo sin levantar la vista.', p: 1, r: '(El equipo se distrae.)', fb: 'Leer textualmente pierde la atención del público.' },
        { t: 'Improviso y cuento anécdotas graciosas del grupo.', p: 0, r: '¿Y los resultados?', fb: 'La presentación profesional prioriza la información relevante.' }
      ]},
      { dice: 'Tu compañero dijo "llevamos a unos manes al río". ¿Qué le sugieres?', opciones: [
        { t: 'Usar lenguaje técnico-turístico: "operamos un grupo de 8 pax en la actividad de tubing según el itinerario".', p: 2, r: 'Suena mucho más profesional.', fb: 'El lenguaje técnico (pax, itinerario, operación) da precisión y profesionalismo.' },
        { t: 'Que hable como quiera, todos entienden.', p: 0, r: '…', fb: 'El registro informal resta credibilidad ante clientes y socios.' },
        { t: 'Que evite hablar y solo muestre fotos.', p: 1, r: 'Hmm.', fb: 'Las imágenes ayudan, pero no reemplazan una comunicación verbal adecuada.' }
      ]}
    ],
    vivo: {
      lugar: 'Sala de reuniones de la operadora, Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🗂️', t: 'Abrir la plantilla de informe técnico de la operadora', p: 2, fb: 'La plantilla asegura la estructura formal del documento.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📊', t: 'Anotar las cifras del tour: pax, horarios y costos', p: 2, fb: 'Los datos verificables son el núcleo del desarrollo del informe.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🎙️', t: 'Grabar un audio informal contando el viaje', p: 0, fb: 'Un audio no es un informe técnico ni sirve como respaldo.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Menciona la estructura del informe', claves: ['introduccion', 'desarrollo', 'conclusion', 'estructura', 'portada', 'partes'] },
            { n: 'Incluye datos concretos del tour', claves: ['datos', 'pax', 'itinerario', 'cifras', 'novedades', 'horarios', 'costos'] },
            { n: 'Cierra con recomendaciones', claves: ['recomendacion', 'mejora', 'sugerencia', 'propuesta', 'recomiendo'] }
          ],
          evitar: [ { claves: ['un audio', 'por whatsapp nomas', 'asi nomas'], fb: 'El informe técnico debe ser un documento escrito formal.' } ],
          modelo: 'Organizaré el informe con portada, introducción con el objetivo, desarrollo con los datos del tour como pax, itinerario y novedades, y al final conclusiones y recomendaciones de mejora.'
        },
        {
          acciones: [
            { icono: '🖥️', t: 'Proyectar una diapositiva con tres cifras clave', p: 2, fb: 'Un apoyo visual sencillo refuerza el mensaje oral.', efecto: { confianza: 8, tension: -4 } },
            { icono: '👀', t: 'Mirar al equipo y hablar con voz clara', p: 2, fb: 'El contacto visual y la voz clara mantienen la atención.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📄', t: 'Leer el informe completo sin levantar la vista', p: 1, fb: 'Leer textualmente aburre y pierde al público.', efecto: { confianza: -4, tension: 4 } },
            { icono: '😂', t: 'Contar chistes del grupo en lugar de resultados', p: 0, fb: 'Una presentación profesional prioriza la información relevante.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Saluda y anuncia los puntos', claves: ['buenos dias', 'buenas tardes', 'les presento', 'tres puntos', 'primero', 'agenda'] },
            { n: 'Presenta resultados con datos', claves: ['resultado', 'satisfaccion', 'por ciento', 'cifra', 'pax', 'costo'] },
            { n: 'Cierra con una conclusión', claves: ['conclusion', 'en resumen', 'para cerrar', 'finalmente', 'recomend'] }
          ],
          evitar: [ { claves: ['no se que decir', 'bueno ya'], fb: 'Prepara la presentación para no improvisar.' } ],
          modelo: 'Buenos días, les presento tres puntos: el itinerario, los resultados y las recomendaciones. Operamos 8 pax con 90 por ciento de satisfacción. En resumen, recomiendo reforzar el plan de lluvia.'
        },
        {
          acciones: [
            { icono: '📖', t: 'Compartir un glosario de términos técnico-turísticos', p: 2, fb: 'Un glosario ayuda al equipo a unificar el lenguaje profesional.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✏️', t: 'Reescribir con él la frase en lenguaje técnico', p: 2, fb: 'Practicar la reformulación fija el uso del lenguaje técnico.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🤷', t: 'Reírse y dejar que siga hablando igual', p: 0, fb: 'El registro informal resta credibilidad ante clientes y socios.', efecto: { confianza: 2, tension: 2 } }
          ],
          conceptos: [
            { n: 'Recomienda el lenguaje técnico-turístico', claves: ['lenguaje tecnico', 'tecnico', 'profesional', 'formal', 'terminos'] },
            { n: 'Usa términos del sector', claves: ['pax', 'itinerario', 'operamos', 'grupo', 'actividad', 'servicio'] },
            { n: 'Lo sugiere con respeto', claves: ['te sugiero', 'podrias', 'que tal si', 'companero', 'mejor decir', 'te propongo'] }
          ],
          evitar: [ { claves: ['manes', 'habla como quieras'], fb: 'Evita la jerga en contextos profesionales.' } ],
          modelo: 'Compañero, te sugiero usar lenguaje técnico y decir: operamos un grupo de 8 pax en la actividad de tubing según el itinerario. Suena más profesional.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-B-102', cod: 'GOT-B-102',
    titulo: 'Explicar el Ecuador desde un mirador amazónico',
    asignaturas: ['GOT-B-102'],
    persona: { nombre: 'Laura', rol: 'Turista española que recorrerá el Ecuador', avatar: '👩🏼', pitch: 1.15 },
    contexto: 'En un mirador sobre la selva cerca de Puyo, una turista te pregunta dónde está, cómo es el clima y qué destinos del país le recomiendas.',
    objetivo: 'Aplicar la ubicación, regiones, clima, biodiversidad, áreas protegidas y destinos turísticos del Ecuador.',
    pasos: [
      { dice: '¿En qué parte del Ecuador estamos exactamente?', opciones: [
        { t: 'En la región amazónica, provincia de Pastaza, cuya capital es Puyo; el Ecuador tiene cuatro regiones: Costa, Sierra, Amazonía y Galápagos.', p: 2, r: '¡Qué país tan diverso!', fb: 'Ubicación y división en regiones naturales son la base de la geografía turística.' },
        { t: 'En la selva, cerca de Quito.', p: 1, r: '¿Cerca de Quito?', fb: 'Es impreciso: Puyo está en la Amazonía, a varias horas de Quito.' },
        { t: 'En Colombia, creo.', p: 0, r: '¿En serio?', fb: 'Un guía debe conocer con precisión la ubicación del destino.' }
      ]},
      { dice: '¿Siempre llueve tanto aquí?', opciones: [
        { t: 'Es un clima tropical húmedo, con lluvias frecuentes todo el año, que sostiene una biodiversidad enorme; por eso recomiendo poncho de agua y botas.', p: 2, r: 'Entonces vale la pena mojarse.', fb: 'Relacionar clima, biodiversidad y recomendaciones prácticas es interpretación geográfica.' },
        { t: 'Sí, siempre llueve, es aburrido.', p: 0, r: 'Qué desánimo…', fb: 'Desvalorizar el destino perjudica la experiencia.' },
        { t: 'A veces llueve, a veces no.', p: 1, r: 'Ya…', fb: 'Es correcto pero pobre en información.' }
      ]},
      { dice: 'Tengo dos semanas. ¿Qué más me recomiendas visitar?', opciones: [
        { t: 'Una ruta por regiones: áreas protegidas amazónicas como Yasuní, los volcanes Cotopaxi y Chimborazo en la Sierra, Quito o Cuenca coloniales, la Costa y, si puede, Galápagos, siempre con operadores responsables.', p: 2, r: '¡Ya tengo mi ruta!', fb: 'Recomendar destinos por regiones con criterio sostenible demuestra dominio de la geografía turística.' },
        { t: 'Solo vaya a la playa.', p: 1, r: 'Hmm, quería más variedad.', fb: 'Limita la experiencia y no aprovecha la diversidad del país.' },
        { t: 'Le digo que no hay nada más que ver.', p: 0, r: 'Qué pena…', fb: 'El país tiene destinos diversos en todas sus regiones.' }
      ]}
    ],
    vivo: {
      lugar: 'Mirador sobre la selva amazónica, cerca de Puyo', fondo: 'exterior',
      inicio: { confianza: 55, tension: 30 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Desplegar el mapa del Ecuador y señalar Pastaza', p: 2, fb: 'El mapa ubica visualmente a la turista en el país.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧭', t: 'Señalar hacia el oeste, donde están los Andes', p: 2, fb: 'Relacionar el paisaje real con el mapa mejora la comprensión.', efecto: { confianza: 6, tension: -2 } },
            { icono: '❓', t: 'Responder sin estar seguro: "creo que es Colombia"', p: 0, fb: 'La imprecisión geográfica resta credibilidad al guía.', efecto: { confianza: -12, tension: 6 } }
          ],
          conceptos: [
            { n: 'Ubica la Amazonía y Pastaza', claves: ['amazonia', 'amazonica', 'pastaza', 'puyo', 'oriente', 'selva'] },
            { n: 'Menciona las cuatro regiones', claves: ['cuatro regiones', 'costa', 'sierra', 'galapagos', 'insular', 'regiones'] },
            { n: 'Da una referencia de ubicación', claves: ['capital', 'provincia', 'andes', 'al este', 'cordillera', 'quito'] }
          ],
          evitar: [ { claves: ['colombia', 'no se donde'], fb: 'Un guía debe conocer con precisión la ubicación.' } ],
          modelo: 'Estamos en la región amazónica, en la provincia de Pastaza, cuya capital es Puyo, al este de la cordillera de los Andes. El Ecuador tiene cuatro regiones: Costa, Sierra, Amazonía y Galápagos.'
        },
        {
          acciones: [
            { icono: '🌧️', t: 'Mostrar las nubes que suben desde la selva', p: 2, fb: 'Interpretar el fenómeno visible hace comprensible el clima.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🥾', t: 'Prestarle un poncho de agua y recomendar botas', p: 2, fb: 'La recomendación práctica mejora la experiencia en clima húmedo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '😒', t: 'Quejarse de la lluvia frente a ella', p: 0, fb: 'Desvalorizar el destino perjudica la experiencia.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Describe el clima tropical húmedo', claves: ['tropical', 'humedo', 'lluvi', 'calido', 'humedad', 'clima'] },
            { n: 'Lo relaciona con la biodiversidad', claves: ['biodiversidad', 'especies', 'flora', 'fauna', 'selva', 'vida'] },
            { n: 'Da recomendaciones prácticas', claves: ['poncho', 'botas', 'impermeable', 'recomiendo', 'ropa', 'repelente'] }
          ],
          evitar: [ { claves: ['es aburrido', 'que fastidio'], fb: 'Presenta el clima como parte del atractivo.' } ],
          modelo: 'Es un clima tropical húmedo con lluvias frecuentes todo el año, y gracias a eso tenemos una biodiversidad enorme de flora y fauna. Le recomiendo poncho de agua y botas.'
        },
        {
          acciones: [
            { icono: '📍', t: 'Marcar en el mapa una ruta por las cuatro regiones', p: 2, fb: 'La ruta por regiones muestra la diversidad del país.', efecto: { confianza: 10, tension: -4 } },
            { icono: '🐢', t: 'Entregar información de operadores responsables en Galápagos', p: 2, fb: 'Recomendar operadores responsables protege los ecosistemas frágiles.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🏖️', t: 'Decirle que solo vaya a la playa', p: 1, fb: 'Limita la experiencia a una sola región.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🚫', t: 'Decirle que no hay nada más que ver', p: 0, fb: 'El Ecuador tiene destinos en todas sus regiones.', efecto: { confianza: -12, tension: 4 } }
          ],
          conceptos: [
            { n: 'Recomienda destinos de varias regiones', claves: ['galapagos', 'cotopaxi', 'chimborazo', 'cuenca', 'quito', 'costa', 'ingapirca'] },
            { n: 'Incluye áreas protegidas', claves: ['yasuni', 'area protegida', 'areas protegidas', 'parque nacional', 'reserva', 'sangay'] },
            { n: 'Promueve el turismo sostenible', claves: ['sostenible', 'responsable', 'conserv', 'respet', 'operadores registrados'] }
          ],
          evitar: [ { claves: ['no hay nada', 'solo playa'], fb: 'Aprovecha la diversidad del país.' } ],
          modelo: 'Le recomiendo una ruta: el Parque Nacional Yasuní en la Amazonía, los volcanes Cotopaxi y Chimborazo, Quito y Cuenca coloniales, la Costa y Galápagos, siempre con operadores responsables y sostenibles.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-B-103', cod: 'GOT-B-103',
    titulo: 'Las nacionalidades de Pastaza ante un grupo escolar',
    asignaturas: ['GOT-B-103'],
    persona: { nombre: 'Profe Andrés', rol: 'Docente de un colegio de Quito en gira de estudios', avatar: '👨🏻‍🏫', pitch: 0.95 },
    contexto: 'Guías a un grupo escolar en Puyo. El docente te pide explicar la diversidad cultural de Pastaza; un estudiante hace un comentario despectivo.',
    objetivo: 'Interpretar la multiculturalidad, la tradición y el patrimonio cultural del Ecuador con respeto al "otro".',
    pasos: [
      { dice: '¿Qué pueblos viven en Pastaza?', opciones: [
        { t: 'Pastaza es una de las provincias más diversas: conviven nacionalidades como kichwa, shuar, achuar, waorani, sápara, andoa y shiwiar, además de población mestiza y colona.', p: 2, r: '¡No sabía que eran tantas!', fb: 'Reconocer la multiculturalidad del territorio es el punto de partida de la interpretación cultural.' },
        { t: 'Aquí viven los indígenas, y ya.', p: 1, r: '¿Todos son iguales?', fb: 'Generalizar invisibiliza la diversidad de nacionalidades.' },
        { t: 'Ya no quedan pueblos originarios.', p: 0, r: '¿De verdad?', fb: 'Es falso y niega la existencia de pueblos vivos.' }
      ]},
      { dice: '¿Qué tradiciones mantienen hoy?', opciones: [
        { t: 'Por ejemplo, la toma de guayusa al amanecer para compartir los sueños y organizar el día, la cerámica y la chakra; son herencia viva que se transmite entre generaciones.', p: 2, r: '¡Qué interesante!', fb: 'Explicar tradición y herencia con ejemplos concretos da sentido al patrimonio inmaterial.' },
        { t: 'Bailan para los turistas.', p: 0, r: '…', fb: 'Reducir la cultura a espectáculo la folcloriza.' },
        { t: 'Hacen artesanías.', p: 1, r: '¿Solo eso?', fb: 'Es cierto pero superficial.' }
      ]},
      { dice: '(Un estudiante dice: "son atrasados, viven en la selva".)', opciones: [
        { t: 'Le respondo con respeto que no hay culturas superiores, que sus saberes sobre la selva son valiosos y que la diversidad nos enriquece como ecuatorianos.', p: 2, r: '(El estudiante reflexiona.)', fb: 'El reconocimiento del otro es una premisa del enfoque intercultural.' },
        { t: 'Lo ignoro y sigo hablando.', p: 1, r: '…', fb: 'Dejar pasar el comentario refuerza el prejuicio.' },
        { t: 'Me río con él.', p: 0, r: '…', fb: 'Validar un prejuicio es discriminatorio.' }
      ]}
    ],
    vivo: {
      lugar: 'Plaza cívica de Puyo con un grupo escolar', fondo: 'comunidad',
      inicio: { confianza: 55, tension: 35 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Mostrar el mapa de territorios de las nacionalidades', p: 2, fb: 'El mapa visibiliza la diversidad del territorio.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧑🏽‍🤝‍🧑🏻', t: 'Invitar a una guía kichwa a presentarse', p: 2, fb: 'Dar voz a los propios actores es la mejor interpretación cultural.', efecto: { confianza: 10, tension: -4 } },
            { icono: '🙅', t: 'Decir que ya no quedan pueblos originarios', p: 0, fb: 'Es falso y niega la existencia de pueblos vivos.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Nombra varias nacionalidades', claves: ['kichwa', 'shuar', 'achuar', 'waorani', 'sapara', 'andoa', 'shiwiar'] },
            { n: 'Reconoce la multiculturalidad', claves: ['diversidad', 'diversa', 'multicultural', 'nacionalidades', 'pueblos', 'conviven'] },
            { n: 'Incluye población mestiza y colona', claves: ['mestiz', 'colon', 'afro', 'todos', 'ecuatorianos'] }
          ],
          evitar: [ { claves: ['ya no quedan', 'son todos iguales'], fb: 'Evita negar o uniformizar la diversidad.' } ],
          modelo: 'Pastaza es una provincia muy diversa: conviven nacionalidades como kichwa, shuar, achuar, waorani, sápara, andoa y shiwiar, junto con población mestiza y colona.'
        },
        {
          acciones: [
            { icono: '🍵', t: 'Mostrar hojas de guayusa y explicar su uso', p: 2, fb: 'Un objeto real conecta a los estudiantes con la tradición.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏺', t: 'Enseñar una pieza de cerámica kichwa', p: 2, fb: 'La cerámica es expresión de saberes transmitidos entre generaciones.', efecto: { confianza: 6, tension: -2 } },
            { icono: '💃', t: 'Pedir a la guía kichwa que baile para la foto', p: 0, fb: 'Reducir la cultura a espectáculo la folcloriza.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Da un ejemplo concreto de tradición', claves: ['guayusa', 'ceramica', 'chakra', 'minga', 'cantos', 'medicina'] },
            { n: 'Explica que es herencia que se transmite', claves: ['herencia', 'transmit', 'generacion', 'abuelos', 'ancestral', 'heredad'] },
            { n: 'La presenta como cultura viva', claves: ['viva', 'hoy', 'actual', 'mantienen', 'practican', 'siguen'] }
          ],
          evitar: [ { claves: ['bailan para los turistas', 'disfrazados'], fb: 'No folclorices las tradiciones.' } ],
          modelo: 'Mantienen tradiciones vivas como la toma de guayusa al amanecer, la cerámica y la chakra. Son una herencia ancestral que se transmite de generación en generación y que practican hoy.'
        },
        {
          acciones: [
            { icono: '🤝', t: 'Acercarse al estudiante y hablarle con calma', p: 2, fb: 'Corregir con respeto abre la reflexión sin humillar.', efecto: { confianza: 6, tension: -6 } },
            { icono: '🌿', t: 'Mostrar una planta medicinal que la comunidad conoce', p: 2, fb: 'Evidenciar los saberes desmonta el prejuicio de "atraso".', efecto: { confianza: 8, tension: -4 } },
            { icono: '😆', t: 'Reírse del comentario con el grupo', p: 0, fb: 'Validar un prejuicio es discriminatorio.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Afirma que no hay culturas superiores', claves: ['no hay culturas superiores', 'ninguna cultura', 'iguales en dignidad', 'diferentes', 'no son atrasad', 'no es atraso'] },
            { n: 'Valora sus saberes', claves: ['saberes', 'conocimiento', 'sabiduria', 'plantas', 'medicina', 'selva'] },
            { n: 'Promueve el respeto y la interculturalidad', claves: ['respeto', 'intercultural', 'diversidad', 'enriquece', 'reconocer', 'convivencia'] }
          ],
          evitar: [ { claves: ['tienes razon', 'son salvajes', 'atrasados de verdad'], fb: 'Nunca valides un prejuicio.' } ],
          modelo: 'Con respeto te digo que no hay culturas superiores: sus saberes sobre las plantas y la selva son muy valiosos, y la diversidad nos enriquece a todos los ecuatorianos.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-B-104', cod: 'GOT-B-104',
    titulo: '¿Qué es el turismo? Charla para nuevos emprendedores',
    asignaturas: ['GOT-B-104'],
    persona: { nombre: 'Don Luis', rol: 'Finquero de Pastaza que quiere recibir turistas', avatar: '👨🏽‍🌾', pitch: 0.9 },
    contexto: 'En un taller de la Cámara de Turismo, un finquero te pregunta qué es exactamente el turismo, qué tipos existen y qué efectos puede tener en su finca.',
    objetivo: 'Explicar conceptos básicos, tipos de turismo, actores del sistema turístico e impactos.',
    pasos: [
      { dice: '¿Qué es el turismo, en palabras sencillas?', opciones: [
        { t: 'Son las actividades de las personas que viajan fuera de su entorno habitual, por menos de un año, por ocio, negocios u otros motivos; incluye al visitante, el destino y los servicios.', p: 2, r: 'Ahora entiendo.', fb: 'Es la noción básica de turismo usada por la OMT, con sus elementos.' },
        { t: 'Es pasear.', p: 1, r: '¿Solo eso?', fb: 'Es incompleto: faltan el desplazamiento, la temporalidad y los servicios.' },
        { t: 'Es lo que hacen los gringos.', p: 0, r: '…', fb: 'Es un estereotipo; también hay turismo interno.' }
      ]},
      { dice: '¿Qué tipo de turismo podría hacer en mi finca?', opciones: [
        { t: 'Turismo rural o agroturismo: mostrar el cultivo de cacao o guayusa, convivencia y senderos; es un segmento de naturaleza que crece.', p: 2, r: '¡Eso me gusta!', fb: 'Identificar el tipo de turismo según los recursos y el segmento es clave.' },
        { t: 'Turismo de sol y playa.', p: 0, r: 'Pero no tengo playa…', fb: 'El producto debe basarse en los recursos reales.' },
        { t: 'Cualquiera, da igual.', p: 1, r: 'Hmm.', fb: 'Sin definir el tipo y el segmento no se puede diseñar el producto.' }
      ]},
      { dice: '¿Y qué efectos traerá el turismo?', opciones: [
        { t: 'Positivos como ingresos y empleo, pero también riesgos sociales y ambientales: basura, presión sobre la cultura; por eso hay que gestionarlo de forma sostenible y coordinar con agencias y operadoras.', p: 2, r: 'Hay que planificar bien.', fb: 'Los impactos son económicos, socioculturales y ambientales; la gestión responsable los equilibra.' },
        { t: 'Solo trae dinero.', p: 1, r: '¡Qué bien!', fb: 'Omite los impactos negativos que deben gestionarse.' },
        { t: 'Ninguno.', p: 0, r: '…', fb: 'Toda actividad turística genera impactos.' }
      ]}
    ],
    vivo: {
      lugar: 'Salón de la Cámara Provincial de Turismo de Pastaza', fondo: 'aula',
      inicio: { confianza: 50, tension: 30 },
      pasos: [
        {
          acciones: [
            { icono: '🧳', t: 'Dibujar en la pizarra: visitante, destino y servicios', p: 2, fb: 'Los elementos del sistema turístico ayudan a entender el concepto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🌐', t: 'Citar la definición de la OMT', p: 2, fb: 'La OMT es la organización internacional de referencia.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🤠', t: 'Decir que turismo es "lo que hacen los gringos"', p: 0, fb: 'Es un estereotipo; también existe el turismo interno.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Menciona el viaje fuera del entorno habitual', claves: ['fuera de su entorno', 'entorno habitual', 'viajan', 'desplaza', 'salen de su'] },
            { n: 'Incluye el tiempo y los motivos', claves: ['menos de un ano', 'ocio', 'negocios', 'motivo', 'descanso', 'temporal'] },
            { n: 'Nombra los elementos del sistema', claves: ['visitante', 'destino', 'servicios', 'turista', 'oferta', 'demanda'] }
          ],
          evitar: [ { claves: ['gringos', 'solo extranjeros'], fb: 'El turismo interno es muy importante.' } ],
          modelo: 'El turismo son las actividades de las personas que viajan fuera de su entorno habitual por menos de un año, por ocio, negocios u otros motivos; incluye al visitante, el destino y los servicios.'
        },
        {
          acciones: [
            { icono: '🍫', t: 'Mostrar fotos de experiencias de cacao en fincas', p: 2, fb: 'Los ejemplos del entorno ayudan a imaginar el producto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📋', t: 'Listar con él los recursos de su finca', p: 2, fb: 'El producto se basa en los recursos reales.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🏖️', t: 'Recomendarle turismo de sol y playa', p: 0, fb: 'No corresponde a los recursos de la Amazonía.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Propone turismo rural o agroturismo', claves: ['rural', 'agroturismo', 'agro', 'finca', 'ecoturismo', 'naturaleza'] },
            { n: 'Basa el producto en sus recursos', claves: ['cacao', 'guayusa', 'cultivo', 'sendero', 'recursos', 'animales'] },
            { n: 'Identifica el segmento de turistas', claves: ['segmento', 'familias', 'estudiantes', 'turistas que buscan', 'mercado', 'publico'] }
          ],
          evitar: [ { claves: ['sol y playa', 'da igual'], fb: 'El tipo de turismo depende de los recursos.' } ],
          modelo: 'En su finca puede hacer turismo rural o agroturismo: mostrar el cultivo de cacao y guayusa y un sendero. Es ideal para el segmento de familias y estudiantes que buscan naturaleza.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Dibujar una balanza de impactos positivos y negativos', p: 2, fb: 'Visualizar ambos lados de los impactos ayuda a planificar.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤝', t: 'Presentarle a una operadora registrada de Puyo', p: 2, fb: 'Las alianzas con agencias y operadoras son parte de la estructura turística.', efecto: { confianza: 6, tension: -2 } },
            { icono: '💰', t: 'Decirle que solo traerá dinero', p: 1, fb: 'Omite los impactos negativos que deben gestionarse.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🚫', t: 'Asegurarle que el turismo no tiene impactos', p: 0, fb: 'Toda actividad turística genera impactos que deben gestionarse.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Menciona impactos económicos positivos', claves: ['ingreso', 'empleo', 'trabajo', 'economic', 'ventas', 'ganancia'] },
            { n: 'Reconoce impactos sociales y ambientales', claves: ['basura', 'ambiental', 'social', 'cultura', 'contaminacion', 'negativ'] },
            { n: 'Propone gestión sostenible y alianzas', claves: ['sostenible', 'gestion', 'planific', 'agencia', 'operadora', 'responsable'] }
          ],
          evitar: [ { claves: ['ningun impacto', 'no pasa nada'], fb: 'Toda actividad turística genera impactos.' } ],
          modelo: 'El turismo trae ingresos y empleo, pero también impactos negativos ambientales y sociales, como la basura o la presión sobre la cultura. Hay que planificar una gestión sostenible y aliarse con operadoras.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-105', cod: 'GOT-P-105',
    titulo: 'Reserva en el GDS y control de cupos',
    asignaturas: ['GOT-P-105'],
    persona: { nombre: 'Sr. Mauricio', rol: 'Cliente de la agencia de viajes', avatar: '🧑🏻‍💼', pitch: 0.95 },
    contexto: 'En el mostrador de la agencia, un cliente quiere un vuelo Quito–Baltra y un paquete de tres días en Galápagos. Debes registrar la reserva en el GDS y controlar los cupos.',
    objetivo: 'Aplicar procedimientos de un GDS (Amadeus/Sabre), control de inventarios y software de oficina en la agencia de viajes.',
    pasos: [
      { dice: 'Quiero reservar ya mismo el vuelo y el paquete.', opciones: [
        { t: 'Creo la reserva (PNR) en el GDS con los elementos obligatorios: nombre, itinerario, contacto, plazo de emisión y quién solicita, y le leo el código de reserva.', p: 2, r: 'Perfecto, anoto el código.', fb: 'Un PNR completo tiene los elementos obligatorios y un localizador para su seguimiento.' },
        { t: 'Anoto sus datos en un cuaderno y luego lo ingreso.', p: 1, r: '¿Y si se acaban los asientos?', fb: 'El registro manual retrasa la reserva y puede perder el cupo.' },
        { t: 'Le digo que ya está reservado sin ingresarlo.', p: 0, r: 'Confío en usted.', fb: 'Confirmar sin registrar genera un incumplimiento grave.' }
      ]},
      { dice: '¿Seguro que hay cupo en el paquete?', opciones: [
        { t: 'Reviso el inventario de cupos del proveedor en el sistema, descuento el cupo vendido y confirmo la disponibilidad real.', p: 2, r: 'Qué ordenado.', fb: 'El control de inventario evita la sobreventa.' },
        { t: 'Creo que sí, siempre hay cupo.', p: 0, r: '¿Cree?', fb: 'Vender sin verificar el inventario provoca sobreventa.' },
        { t: 'Llamo al proveedor por teléfono.', p: 1, r: 'Bueno.', fb: 'Es válido, pero el inventario debe quedar actualizado en el sistema.' }
      ]},
      { dice: '(Al cierre del día, la gerente pide el reporte de ventas.)', opciones: [
        { t: 'Exporto las ventas a una hoja de cálculo, uso fórmulas de suma y tabla por proveedor, y protejo los datos personales de los clientes.', p: 2, r: 'Excelente reporte.', fb: 'Las herramientas de oficina organizan la gestión y los datos personales deben protegerse.' },
        { t: 'Le envío fotos de las facturas.', p: 1, r: 'Así no puedo analizar.', fb: 'Las fotos no permiten consolidar ni analizar la información.' },
        { t: 'Publico la lista de clientes en el grupo de WhatsApp del personal.', p: 0, r: '¡Eso no!', fb: 'Exponer datos personales de clientes es una falta grave.' }
      ]}
    ],
    vivo: {
      lugar: 'Mostrador de una agencia de viajes en Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '💻', t: 'Abrir el GDS y consultar disponibilidad del vuelo', p: 2, fb: 'Consultar disponibilidad es el primer paso de la reserva.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🪪', t: 'Pedir la cédula o pasaporte para el nombre exacto', p: 2, fb: 'El nombre del PNR debe coincidir con el documento.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📓', t: 'Anotar los datos en un cuaderno para después', p: 1, fb: 'El registro manual puede perder el cupo.', efecto: { confianza: -2, tension: 4 } },
            { icono: '👍', t: 'Decir "ya está reservado" sin registrar nada', p: 0, fb: 'Confirmar sin registrar es un incumplimiento grave.', efecto: { confianza: 6, tension: -4 } }
          ],
          conceptos: [
            { n: 'Crea la reserva o PNR en el GDS', claves: ['pnr', 'gds', 'amadeus', 'sabre', 'reserva', 'sistema'] },
            { n: 'Registra los elementos obligatorios', claves: ['nombre', 'itinerario', 'contacto', 'telefono', 'plazo de emision', 'quien solicita'] },
            { n: 'Entrega el código de reserva', claves: ['codigo', 'localizador', 'record locator', 'confirmacion', 'numero de reserva'] }
          ],
          evitar: [ { claves: ['ya esta reservado', 'confie nomas'], fb: 'Nunca confirmes sin registrar la reserva.' } ],
          modelo: 'Creo su reserva en el GDS Amadeus con el nombre, el itinerario, su teléfono de contacto, el plazo de emisión y quién solicita. Su código localizador es este.'
        },
        {
          acciones: [
            { icono: '📦', t: 'Revisar el inventario de cupos del proveedor', p: 2, fb: 'El inventario actualizado evita la sobreventa.', efecto: { confianza: 8, tension: -6 } },
            { icono: '➖', t: 'Descontar el cupo vendido en el sistema', p: 2, fb: 'Actualizar el inventario mantiene la información confiable para todos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎲', t: 'Vender suponiendo que siempre hay cupo', p: 0, fb: 'Vender sin verificar provoca sobreventa.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Revisa el inventario de cupos', claves: ['inventario', 'cupos', 'disponibilidad', 'revis', 'stock'] },
            { n: 'Actualiza el sistema tras la venta', claves: ['descuento', 'descontar', 'actualiz', 'registro', 'sistema'] },
            { n: 'Confirma la disponibilidad real', claves: ['confirm', 'disponible', 'real', 'seguro', 'verific'] }
          ],
          evitar: [ { claves: ['creo que si', 'siempre hay cupo'], fb: 'Verifica antes de confirmar.' } ],
          modelo: 'Reviso el inventario de cupos del proveedor en el sistema, descuento el cupo vendido y le confirmo la disponibilidad real: sí, hay cupo para usted.'
        },
        {
          acciones: [
            { icono: '📈', t: 'Exportar las ventas a una hoja de cálculo', p: 2, fb: 'La hoja de cálculo permite consolidar y analizar las ventas.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔒', t: 'Proteger el archivo con contraseña', p: 2, fb: 'Los datos personales de los clientes deben resguardarse.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📢', t: 'Enviar la lista de clientes al chat del personal', p: 0, fb: 'Exponer datos personales es una falta grave.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Usa la hoja de cálculo y fórmulas', claves: ['excel', 'hoja de calculo', 'formula', 'suma', 'tabla'] },
            { n: 'Organiza por proveedor o servicio', claves: ['proveedor', 'servicio', 'codigo', 'clasific', 'por fecha'] },
            { n: 'Protege los datos personales', claves: ['datos personales', 'proteg', 'contrasena', 'confidencial', 'privacidad'] }
          ],
          evitar: [ { claves: ['whatsapp del personal', 'lo publico'], fb: 'Los datos de clientes son confidenciales.' } ],
          modelo: 'Exporto las ventas a Excel, uso fórmulas de suma y una tabla por proveedor, y protejo el archivo con contraseña porque contiene datos personales de los clientes.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-106', cod: 'GOT-P-106',
    titulo: 'Motivaciones del turista y convivencia con los residentes',
    asignaturas: ['GOT-P-106'],
    persona: { nombre: 'Doña Carmen', rol: 'Vecina del malecón de Puyo', avatar: '👵🏽', pitch: 1.15 },
    contexto: 'Trabajas en una operadora junto al malecón. Una vecina se queja de los turistas y debes entender las motivaciones de los visitantes y mejorar la convivencia.',
    objetivo: 'Analizar las motivaciones turísticas, la relación residente-turista y los efectos del contacto entre culturas.',
    pasos: [
      { dice: '¿Para qué vienen tantos turistas aquí, si no hay nada?', opciones: [
        { t: 'Le explico que vienen por distintos motivos: descanso y salud en la naturaleza, aventura, conocer culturas; el ocio les hace bien y también trae ingresos al barrio.', p: 2, r: 'No lo había pensado.', fb: 'Comprender las motivaciones y los beneficios del ocio mejora la percepción del residente.' },
        { t: 'Le digo que vienen a gastar plata.', p: 1, r: 'Ya…', fb: 'Es una visión parcial de la motivación turística.' },
        { t: 'Le respondo que no es su asunto.', p: 0, r: '¡Qué grosero!', fb: 'Desestimar al residente deteriora la convivencia.' }
      ]},
      { dice: 'Pero hacen bulla hasta tarde y dejan basura.', opciones: [
        { t: 'Reconozco el problema, propongo horarios de silencio, normas de convivencia para los grupos y una reunión con vecinos y operadoras.', p: 2, r: 'Eso sería justo.', fb: 'Mediar y acordar normas mejora las relaciones entre residentes y turistas.' },
        { t: 'Le digo que se acostumbre.', p: 0, r: '¡Indignante!', fb: 'Ignorar los efectos negativos genera rechazo al turismo.' },
        { t: 'Le prometo hablar con los turistas algún día.', p: 1, r: 'Ojalá.', fb: 'Una promesa vaga no resuelve el conflicto.' }
      ]},
      { dice: 'Mi nieta ya quiere vestirse como los turistas y olvidar el kichwa.', opciones: [
        { t: 'Le comento que el contacto entre culturas puede generar pérdida de identidad, y que el turismo bien gestionado puede valorar el idioma y las tradiciones, por ejemplo con guías jóvenes bilingües.', p: 2, r: 'Eso me da esperanza.', fb: 'Reconocer los efectos socioculturales y proponer su gestión es parte del análisis del turismo.' },
        { t: 'Le digo que es normal, el kichwa ya no sirve.', p: 0, r: '…', fb: 'Desvalorizar la lengua contribuye a la aculturación.' },
        { t: 'No sé qué responder.', p: 1, r: '…', fb: 'Se pierde la oportunidad de orientar.' }
      ]}
    ],
    vivo: {
      lugar: 'Malecón de Puyo, frente a la operadora', fondo: 'exterior',
      inicio: { confianza: 35, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '☕', t: 'Invitarla a sentarse y conversar con calma', p: 2, fb: 'Crear un espacio de diálogo favorece la comprensión.', efecto: { confianza: 10, tension: -8 } },
            { icono: '📋', t: 'Mostrarle una encuesta de motivaciones de visitantes', p: 2, fb: 'Los datos ayudan a entender por qué viajan los turistas.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙄', t: 'Responderle que no es su asunto', p: 0, fb: 'Desestimar al residente deteriora la convivencia.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Explica motivaciones variadas', claves: ['motiv', 'descanso', 'aventura', 'naturaleza', 'cultura', 'conocer'] },
            { n: 'Menciona los beneficios del ocio', claves: ['salud', 'ocio', 'bienestar', 'les hace bien', 'relajar', 'esparcimiento'] },
            { n: 'Señala beneficios para el barrio', claves: ['ingreso', 'barrio', 'empleo', 'negocios', 'vecinos', 'economia'] }
          ],
          evitar: [ { claves: ['no es su asunto', 'no le importa'], fb: 'Escucha al residente.' } ],
          modelo: 'Doña Carmen, vienen por distintos motivos: descanso en la naturaleza, aventura y conocer nuestra cultura. El ocio les hace bien a su salud y además trae ingresos al barrio.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Anotar su queja con hora y lugar', p: 2, fb: 'Registrar la queja muestra seriedad y permite actuar.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📣', t: 'Proponer una reunión de vecinos y operadoras', p: 2, fb: 'El diálogo entre actores es la vía para acordar normas.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🤷', t: 'Decirle que se acostumbre', p: 0, fb: 'Ignorar los efectos negativos genera rechazo al turismo.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Reconoce el problema', claves: ['tiene razon', 'entiendo', 'reconozco', 'es un problema', 'comprendo', 'lamento'] },
            { n: 'Propone normas de convivencia', claves: ['normas', 'horario', 'silencio', 'convivencia', 'reglas', 'basura'] },
            { n: 'Propone diálogo con los actores', claves: ['reunion', 'vecinos', 'operadoras', 'dialogo', 'acuerdo', 'juntos'] }
          ],
          evitar: [ { claves: ['acostumbrese', 'asi es el turismo'], fb: 'Hay que gestionar los efectos negativos.' } ],
          modelo: 'Tiene razón y lo entiendo. Propongo normas de convivencia con horarios de silencio y manejo de basura para los grupos, y una reunión de vecinos y operadoras para llegar a un acuerdo.'
        },
        {
          acciones: [
            { icono: '🗣️', t: 'Saludarla en kichwa: "Alli puncha"', p: 2, fb: 'Valorar la lengua local muestra respeto por la identidad.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🧑🏽‍🏫', t: 'Contarle del programa de guías jóvenes bilingües', p: 2, fb: 'El turismo puede revitalizar la lengua y las tradiciones.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🚫', t: 'Decirle que el kichwa ya no sirve', p: 0, fb: 'Desvalorizar la lengua contribuye a la aculturación.', efecto: { confianza: -16, tension: 12 } }
          ],
          conceptos: [
            { n: 'Reconoce el riesgo de pérdida de identidad', claves: ['identidad', 'perdida', 'aculturacion', 'contacto entre culturas', 'influencia', 'olvidar'] },
            { n: 'Valora la lengua y las tradiciones', claves: ['kichwa', 'idioma', 'lengua', 'tradicion', 'orgullo', 'cultura'] },
            { n: 'Propone el turismo como oportunidad cultural', claves: ['guias', 'bilingue', 'oportunidad', 'valorar', 'turismo bien gestionado', 'jovenes'] }
          ],
          evitar: [ { claves: ['ya no sirve', 'es cosa del pasado'], fb: 'La lengua es patrimonio vivo.' } ],
          modelo: 'El contacto entre culturas puede causar pérdida de identidad, pero el turismo bien gestionado también valora la lengua kichwa y las tradiciones: hay guías jóvenes bilingües que se sienten orgullosos.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-108', cod: 'GOT-P-108',
    titulo: 'Recibir a una delegación oficial en la hostería',
    asignaturas: ['GOT-P-108'],
    persona: { nombre: 'Sra. Mónica', rol: 'Coordinadora de eventos de la hostería', avatar: '👩🏻‍💼', pitch: 1.1 },
    contexto: 'Una delegación de autoridades provinciales y empresarios de Japón llegará a una cena de negocios en la hostería. Te encargan el protocolo y la atención.',
    objetivo: 'Aplicar normas de protocolo, etiqueta, comunicación no verbal, sensibilidad cultural y servicio al cliente.',
    pasos: [
      { dice: 'Llega el prefecto con los empresarios. ¿Cómo los recibes?', opciones: [
        { t: 'Con vestimenta formal, saludo cordial, presento primero a la persona de menor rango ante la de mayor rango y los acompaño a sus puestos según la precedencia.', p: 2, r: 'Muy bien organizado.', fb: 'La precedencia y las presentaciones correctas son la base del protocolo.' },
        { t: 'Saludo a todos con un "hola, ¿qué tal?".', p: 1, r: '…', fb: 'Es cordial, pero informal para un acto oficial.' },
        { t: 'Los dejo que se sienten donde quieran.', p: 0, r: '(Se genera confusión.)', fb: 'Sin orden de precedencia se generan incomodidades.' }
      ]},
      { dice: 'Los empresarios japoneses me entregan sus tarjetas. ¿Qué hago?', opciones: [
        { t: 'Recibo la tarjeta con ambas manos, la leo con atención, hago una leve inclinación y la guardo con cuidado, nunca en el bolsillo trasero.', p: 2, r: '(Los visitantes sonríen satisfechos.)', fb: 'La sensibilidad cultural en el protocolo internacional genera confianza.' },
        { t: 'La recibo con una mano y la guardo rápido.', p: 1, r: '…', fb: 'Puede interpretarse como poco interés.' },
        { t: 'Escribo encima un número de teléfono.', p: 0, r: '(Incomodidad.)', fb: 'Escribir sobre la tarjeta es descortés en esa cultura.' }
      ]},
      { dice: 'Durante la cena, un invitado reclama que su plato llegó frío.', opciones: [
        { t: 'Me acerco discretamente, me disculpo, retiro el plato y lo reemplazo de inmediato, verificando después su satisfacción.', p: 2, r: 'Muy amable, gracias.', fb: 'El servicio al cliente resuelve con discreción, rapidez y seguimiento.' },
        { t: 'Le digo que así se sirve aquí.', p: 0, r: '¿Perdón?', fb: 'Justificarse ante el cliente empeora la experiencia.' },
        { t: 'Le aviso al mesero sin decir nada al invitado.', p: 1, r: '…', fb: 'Se resuelve, pero falta la atención directa al cliente.' }
      ]}
    ],
    vivo: {
      lugar: 'Salón de eventos de una hostería en Puyo', fondo: 'oficina',
      inicio: { confianza: 55, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '👔', t: 'Revisar tu vestimenta formal antes de salir', p: 2, fb: 'La apariencia personal es parte del protocolo.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🪧', t: 'Ubicar las tarjetas de mesa según la precedencia', p: 2, fb: 'El orden de precedencia evita incomodidades.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🍽️', t: 'Dejar que cada uno se siente donde quiera', p: 0, fb: 'Sin precedencia se genera confusión en actos oficiales.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Saluda con cortesía formal', claves: ['bienvenid', 'buenas noches', 'es un honor', 'senor prefecto', 'distinguidos', 'buenas tardes'] },
            { n: 'Aplica el orden de presentación y precedencia', claves: ['presento', 'precedencia', 'rango', 'orden', 'autoridad', 'jerarquia'] },
            { n: 'Acompaña y ubica a los invitados', claves: ['acompano', 'puesto', 'mesa', 'ubic', 'por aqui', 'asiento'] }
          ],
          evitar: [ { claves: ['hola que tal', 'sientense donde quieran'], fb: 'Un acto oficial requiere protocolo formal.' } ],
          modelo: 'Buenas noches, señor prefecto, bienvenidos. Le presento al señor Tanaka, presidente de la delegación. Por favor, los acompaño a sus puestos según el orden de precedencia.'
        },
        {
          acciones: [
            { icono: '🙇', t: 'Recibir la tarjeta con ambas manos e inclinarse', p: 2, fb: 'Es un gesto de respeto en la cultura japonesa.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📇', t: 'Guardar la tarjeta en un tarjetero', p: 2, fb: 'Cuidar la tarjeta muestra respeto por la persona.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🖊️', t: 'Escribir un número encima de la tarjeta', p: 0, fb: 'Es descortés en esa cultura.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Recibe con ambas manos', claves: ['ambas manos', 'dos manos', 'con respeto', 'recibo', 'con las dos'] },
            { n: 'Lee la tarjeta con atención', claves: ['leo', 'leer', 'atencion', 'nombre', 'cargo'] },
            { n: 'Aplica sensibilidad cultural', claves: ['inclinacion', 'reverencia', 'cultura', 'costumbre', 'japon', 'arigato'] }
          ],
          evitar: [ { claves: ['bolsillo trasero', 'escribo encima'], fb: 'Trata la tarjeta como a la persona.' } ],
          modelo: 'Recibo la tarjeta con ambas manos, leo con atención su nombre y cargo, hago una leve inclinación como marca su cultura, digo arigato y la guardo en el tarjetero.'
        },
        {
          acciones: [
            { icono: '🤫', t: 'Acercarse discretamente al invitado', p: 2, fb: 'La discreción evita incomodar al resto de la mesa.', efecto: { confianza: 6, tension: -6 } },
            { icono: '🔁', t: 'Retirar el plato y pedir uno nuevo a cocina', p: 2, fb: 'La solución rápida recupera la experiencia.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🙅‍♂️', t: 'Decirle que así se sirve aquí', p: 0, fb: 'Justificarse empeora la experiencia del cliente.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Se disculpa', claves: ['disculp', 'lo siento', 'lamento', 'perdone', 'mil disculpas'] },
            { n: 'Reemplaza el plato de inmediato', claves: ['reemplaz', 'nuevo', 'cambio', 'de inmediato', 'enseguida', 'retiro'] },
            { n: 'Verifica la satisfacción', claves: ['esta todo bien', 'satisfech', 'le gusto', 'verific', 'algo mas'] }
          ],
          evitar: [ { claves: ['asi se sirve', 'no es mi culpa'], fb: 'No te justifiques ante el cliente.' } ],
          modelo: 'Mil disculpas, señor. Retiro el plato y le traigo uno nuevo de inmediato. Luego regreso a verificar si está todo bien.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-B-202', cod: 'GOT-B-202',
    titulo: 'Impacto ambiental de un nuevo sendero',
    asignaturas: ['GOT-B-202'],
    persona: { nombre: 'Ing. Pamela', rol: 'Técnica ambiental del GAD cantonal', avatar: '👩🏽‍🔬', pitch: 1.1 },
    contexto: 'La operadora quiere abrir un sendero hacia una cascada. La técnica ambiental te pide sustentar el estudio de impacto ambiental del proyecto.',
    objetivo: 'Aplicar las etapas del estudio de impacto ambiental: área de influencia, caracterización, impactos, medidas y seguimiento.',
    pasos: [
      { dice: '¿Cómo caracterizan el área del proyecto?', opciones: [
        { t: 'Definimos el área de influencia y describimos el medio físico (suelo, agua), el biológico (flora y fauna) y el socioeconómico (comunidades y usos).', p: 2, r: 'Así se hace.', fb: 'La caracterización ambiental abarca los medios físico, biológico y socioeconómico del área de influencia.' },
        { t: 'Tomamos fotos bonitas de la cascada.', p: 0, r: 'Eso no es un estudio.', fb: 'Las fotos no reemplazan la caracterización técnica.' },
        { t: 'Solo describimos la vegetación.', p: 1, r: '¿Y el agua y la gente?', fb: 'Es incompleto: faltan medios físico y socioeconómico.' }
      ]},
      { dice: '¿Qué impactos identifican?', opciones: [
        { t: 'Erosión del suelo, perturbación de la fauna, residuos en el río y presión sobre la comunidad; los evaluamos por magnitud e importancia en una matriz.', p: 2, r: 'Bien sustentado.', fb: 'Identificar y evaluar impactos en una matriz permite priorizar medidas.' },
        { t: 'Ninguno, es un sendero pequeño.', p: 0, r: 'Todo proyecto tiene impactos.', fb: 'Subestimar los impactos invalida el estudio.' },
        { t: 'Solo la basura.', p: 1, r: 'Hay más.', fb: 'Es un impacto real, pero la lista es incompleta.' }
      ]},
      { dice: '¿Qué medidas proponen y cómo darán seguimiento?', opciones: [
        { t: 'Prevención (trazado lejos de nidos, capacidad de carga), mitigación (drenajes, puentes de madera), corrección (reforestación) y un plan de seguimiento con indicadores.', p: 2, r: 'Aprobado para revisión.', fb: 'Las medidas se clasifican en prevención, mitigación y corrección, con un plan de seguimiento.' },
        { t: 'Poner un letrero de "no botar basura".', p: 1, r: 'Insuficiente.', fb: 'Es una medida aislada sin plan de seguimiento.' },
        { t: 'Lo resolvemos cuando haya problemas.', p: 0, r: 'Eso no es gestión.', fb: 'La gestión ambiental es preventiva.' }
      ]}
    ],
    vivo: {
      lugar: 'Oficina de gestión ambiental del GAD cantonal de Pastaza', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Marcar en el mapa el área de influencia del sendero', p: 2, fb: 'Delimitar el área de influencia define el alcance del estudio.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💧', t: 'Mostrar los análisis de agua del río', p: 2, fb: 'Los datos del medio físico sustentan la línea base.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📸', t: 'Presentar solo fotos bonitas de la cascada', p: 0, fb: 'Las fotos no reemplazan la caracterización técnica.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Define el área de influencia', claves: ['area de influencia', 'area de estudio', 'delimit', 'alcance', 'zona'] },
            { n: 'Caracteriza medio físico y biológico', claves: ['medio fisico', 'medio biologico', 'suelo', 'agua', 'flora', 'fauna'] },
            { n: 'Incluye el medio socioeconómico', claves: ['socioeconomico', 'comunidad', 'poblacion', 'usos', 'social'] }
          ],
          evitar: [ { claves: ['solo fotos', 'no hace falta estudio'], fb: 'El estudio requiere caracterización técnica.' } ],
          modelo: 'Definimos el área de influencia y caracterizamos el medio físico con suelo y agua, el medio biológico con flora y fauna, y el medio socioeconómico de la comunidad cercana.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Llenar la matriz de evaluación de impactos', p: 2, fb: 'La matriz valora magnitud e importancia de cada impacto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🦜', t: 'Señalar las zonas de anidación de aves', p: 2, fb: 'Identificar áreas sensibles es clave para evaluar impactos.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🙈', t: 'Afirmar que un sendero pequeño no causa impactos', p: 0, fb: 'Todo proyecto genera impactos.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Identifica impactos sobre el suelo y la fauna', claves: ['erosion', 'suelo', 'fauna', 'perturb', 'ruido', 'nidos'] },
            { n: 'Incluye impactos en agua y comunidad', claves: ['residuos', 'rio', 'agua', 'comunidad', 'basura', 'social'] },
            { n: 'Evalúa en una matriz', claves: ['matriz', 'magnitud', 'importancia', 'evalu', 'valor'] }
          ],
          evitar: [ { claves: ['ningun impacto', 'no pasa nada'], fb: 'Subestimar los impactos invalida el estudio.' } ],
          modelo: 'Identificamos erosión del suelo, perturbación de la fauna y de los nidos, residuos en el río y presión sobre la comunidad, y los evaluamos por magnitud e importancia en una matriz.'
        },
        {
          acciones: [
            { icono: '🌱', t: 'Presentar el plan de reforestación con especies nativas', p: 2, fb: 'La reforestación es una medida de corrección.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🪵', t: 'Mostrar el diseño de puentes y drenajes del sendero', p: 2, fb: 'Las obras de drenaje mitigan la erosión.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🪧', t: 'Proponer solo un letrero de "no botar basura"', p: 1, fb: 'Es una medida aislada sin seguimiento.', efecto: { confianza: -2, tension: 2 } },
            { icono: '⏳', t: 'Decir que lo resolverán cuando haya problemas', p: 0, fb: 'La gestión ambiental es preventiva.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Propone medidas de prevención', claves: ['prevencion', 'prevenir', 'capacidad de carga', 'trazado', 'evitar'] },
            { n: 'Propone mitigación y corrección', claves: ['mitigacion', 'mitigar', 'correccion', 'reforest', 'drenaje', 'puentes'] },
            { n: 'Incluye un plan de seguimiento', claves: ['seguimiento', 'monitoreo', 'indicadores', 'supervision', 'control'] }
          ],
          evitar: [ { claves: ['cuando haya problemas', 'despues vemos'], fb: 'Planifica las medidas antes del proyecto.' } ],
          modelo: 'Proponemos prevención con capacidad de carga y un trazado lejos de los nidos, mitigación con drenajes y puentes de madera, corrección con reforestación, y un plan de seguimiento con indicadores.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-B-203', cod: 'GOT-B-203',
    titulo: 'Falla un proveedor el día del tour',
    asignaturas: ['GOT-B-203'],
    persona: { nombre: 'Sr. Wilson', rol: 'Gerente de la operadora', avatar: '👨🏽‍💼', pitch: 0.9 },
    contexto: 'El restaurante proveedor avisa que no podrá servir el almuerzo de un grupo de 15 pax. El gerente te pide resolver y mejorar la gestión de proveedores y del equipo.',
    objetivo: 'Aplicar el ciclo de gestión de operaciones, la cadena de suministro, el control de calidad y la gestión del talento.',
    pasos: [
      { dice: '¡El restaurante nos falló! ¿Qué hacemos hoy?', opciones: [
        { t: 'Activo el plan de contingencia: llamo al proveedor alterno ya evaluado, confirmo menú y alergias, informo al guía y ajusto el horario.', p: 2, r: 'Bien, tenías un plan B.', fb: 'La cadena de suministro necesita proveedores alternos y planes de contingencia.' },
        { t: 'Compro sánduches en una tienda.', p: 1, r: 'Al menos comerán…', fb: 'Resuelve la urgencia, pero baja la calidad prometida.' },
        { t: 'Que el grupo se quede sin almuerzo.', p: 0, r: '¡Eso no!', fb: 'Incumplir un servicio incluido daña al cliente y a la operadora.' }
      ]},
      { dice: '¿Cómo evitamos que vuelva a pasar?', opciones: [
        { t: 'Evaluamos a los proveedores con criterios de calidad, cumplimiento y precio, firmamos acuerdos con penalidades y aplicamos el ciclo planificar, hacer, verificar y actuar.', p: 2, r: 'Me gusta ese enfoque.', fb: 'La evaluación de proveedores y la mejora continua son parte de la gestión de calidad.' },
        { t: 'Cambiamos de restaurante sin evaluar.', p: 1, r: '¿Y si el nuevo es peor?', fb: 'Cambiar sin criterios no garantiza mejoras.' },
        { t: 'Rezar para que no pase.', p: 0, r: '…', fb: 'La gestión requiere control, no azar.' }
      ]},
      { dice: 'El guía no supo qué hacer ante el problema.', opciones: [
        { t: 'Organizo una capacitación sobre protocolos de contingencia, defino responsabilidades y evalúo su desempeño con retroalimentación.', p: 2, r: 'Así crecemos como equipo.', fb: 'Capacitación, roles claros y evaluación del desempeño fortalecen el talento humano.' },
        { t: 'Le descuento del sueldo.', p: 0, r: '…', fb: 'Sancionar sin capacitar no resuelve la causa.' },
        { t: 'Le mando un correo con el protocolo.', p: 1, r: '¿Lo leerá?', fb: 'Ayuda, pero sin práctica ni seguimiento es insuficiente.' }
      ]}
    ],
    vivo: {
      lugar: 'Oficina de operaciones de la operadora, Puyo', fondo: 'oficina',
      inicio: { confianza: 40, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '📞', t: 'Llamar al proveedor alterno de la lista evaluada', p: 2, fb: 'Tener proveedores alternos es parte de la cadena de suministro.', efecto: { confianza: 10, tension: -10 } },
            { icono: '📋', t: 'Revisar las fichas de alergias del grupo', p: 2, fb: 'El cambio de proveedor no debe descuidar la seguridad alimentaria.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🥪', t: 'Comprar sánduches en la tienda de la esquina', p: 1, fb: 'Resuelve la urgencia con menor calidad.', efecto: { confianza: 2, tension: -2 } },
            { icono: '🚫', t: 'Cancelar el almuerzo sin avisar', p: 0, fb: 'Incumplir un servicio incluido daña al cliente.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Activa el plan de contingencia', claves: ['plan de contingencia', 'contingencia', 'plan b', 'alterno', 'alternativa'] },
            { n: 'Confirma menú y alergias', claves: ['menu', 'alergia', 'confirm', 'quince', '15', 'pax'] },
            { n: 'Comunica al guía y ajusta el horario', claves: ['guia', 'horario', 'informo', 'ajust', 'aviso', 'itinerario'] }
          ],
          evitar: [ { claves: ['sin almuerzo', 'que se aguanten'], fb: 'Cumple lo vendido al cliente.' } ],
          modelo: 'Activo el plan de contingencia: llamo al proveedor alterno, confirmo el menú para 15 pax y las alergias, informo al guía y ajusto el horario del itinerario.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Diseñar una matriz de evaluación de proveedores', p: 2, fb: 'Evaluar con criterios objetivos mejora la cadena de suministro.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✍️', t: 'Redactar un acuerdo con cláusulas de cumplimiento', p: 2, fb: 'Los acuerdos formales aseguran responsabilidades.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎲', t: 'Elegir otro restaurante al azar', p: 0, fb: 'Cambiar sin criterios no garantiza mejoras.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Evalúa a los proveedores con criterios', claves: ['evalu', 'criterios', 'calidad', 'cumplimiento', 'precio', 'proveedor'] },
            { n: 'Formaliza acuerdos', claves: ['acuerdo', 'contrato', 'penalidad', 'clausula', 'convenio'] },
            { n: 'Aplica la mejora continua', claves: ['mejora continua', 'planificar', 'verificar', 'phva', 'ciclo', 'actuar'] }
          ],
          evitar: [ { claves: ['al azar', 'suerte'], fb: 'Gestiona con criterios.' } ],
          modelo: 'Evaluaremos a cada proveedor con criterios de calidad, cumplimiento y precio, firmaremos acuerdos con penalidades y aplicaremos el ciclo de mejora continua: planificar, hacer, verificar y actuar.'
        },
        {
          acciones: [
            { icono: '🎓', t: 'Programar un simulacro de contingencias con los guías', p: 2, fb: 'La práctica fija los protocolos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📌', t: 'Publicar un cuadro de responsabilidades por cargo', p: 2, fb: 'Roles claros agilizan las respuestas.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💸', t: 'Descontarle el día al guía', p: 0, fb: 'Sancionar sin capacitar no resuelve la causa.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Capacita al personal', claves: ['capacit', 'simulacro', 'entrenamiento', 'taller', 'formacion'] },
            { n: 'Define responsabilidades', claves: ['responsabilidad', 'roles', 'funciones', 'protocolo', 'quien hace'] },
            { n: 'Evalúa el desempeño con retroalimentación', claves: ['desempeno', 'evalu', 'retroaliment', 'seguimiento', 'motiv'] }
          ],
          evitar: [ { claves: ['descuento del sueldo', 'despedirlo'], fb: 'Primero capacita y acompaña.' } ],
          modelo: 'Organizo una capacitación con un simulacro de contingencias, defino las responsabilidades de cada rol y evalúo el desempeño del guía con retroalimentación.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-205', cod: 'GOT-P-205',
    titulo: 'Diagnóstico del espacio turístico de una parroquia',
    asignaturas: ['GOT-P-205'],
    persona: { nombre: 'Sr. Ramiro', rol: 'Presidente de una junta parroquial rural de Pastaza', avatar: '👨🏽', pitch: 0.9 },
    contexto: 'La junta parroquial quiere desarrollar el turismo y te pide un diagnóstico del espacio turístico y una propuesta de acciones.',
    objetivo: 'Aplicar la caracterización del espacio turístico: atractivos, planta turística, variables del diagnóstico y propuesta de productos.',
    pasos: [
      { dice: '¿Por dónde empieza el diagnóstico?', opciones: [
        { t: 'Inventariamos y jerarquizamos los atractivos (cascadas, ríos, cultura) y levantamos la planta turística: alojamiento, alimentación y guianza disponibles.', p: 2, r: 'Tiene lógica.', fb: 'El espacio turístico se compone de atractivos y planta turística.' },
        { t: 'Construyendo un hotel grande primero.', p: 0, r: '¿Sin saber si vendrán?', fb: 'Invertir sin diagnóstico es un riesgo.' },
        { t: 'Haciendo una página de Facebook.', p: 1, r: '¿Y qué publicamos?', fb: 'La promoción viene después del diagnóstico.' }
      ]},
      { dice: '¿Qué más hay que analizar?', opciones: [
        { t: 'Las variables: superestructura (instituciones y normas), medio físico y natural, medio socioeconómico, infraestructura de vías, agua, energía y telecomunicaciones.', p: 2, r: 'Es más completo de lo que pensaba.', fb: 'El diagnóstico integra todas las variables que condicionan el desarrollo turístico.' },
        { t: 'Solo el clima.', p: 1, r: '¿Nada más?', fb: 'El clima es una variable entre muchas.' },
        { t: 'Nada más, ya sabemos que es bonito.', p: 0, r: '…', fb: 'Sin diagnóstico no hay planificación.' }
      ]},
      { dice: '¿Qué proponemos entonces?', opciones: [
        { t: 'Un plano síntesis con zonas de uso, un producto inicial (ruta de cascadas con guías locales) y acciones priorizadas: señalética, capacitación y mejora de la vía.', p: 2, r: '¡Manos a la obra!', fb: 'La propuesta traduce el diagnóstico en acciones y productos concretos.' },
        { t: 'Hacer todo a la vez.', p: 1, r: '¿Con qué presupuesto?', fb: 'Sin priorizar, los recursos no alcanzan.' },
        { t: 'Esperar a que llegue un inversionista.', p: 0, r: '…', fb: 'La planificación es responsabilidad de los actores locales.' }
      ]}
    ],
    vivo: {
      lugar: 'Casa de la junta parroquial rural', fondo: 'comunidad',
      inicio: { confianza: 50, tension: 35 },
      pasos: [
        {
          acciones: [
            { icono: '📋', t: 'Llenar fichas de inventario de atractivos', p: 2, fb: 'Las fichas sistematizan y jerarquizan los atractivos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏨', t: 'Visitar los alojamientos y comedores existentes', p: 2, fb: 'Levantar la planta turística muestra la capacidad real.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🏗️', t: 'Proponer construir un hotel grande de inmediato', p: 0, fb: 'Invertir sin diagnóstico es un riesgo.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Inventaría los atractivos', claves: ['inventario', 'atractivos', 'jerarquiz', 'cascada', 'rio', 'cultura'] },
            { n: 'Levanta la planta turística', claves: ['planta turistica', 'alojamiento', 'alimentacion', 'restaurante', 'guianza', 'servicios'] },
            { n: 'Analiza la situación actual', claves: ['situacion actual', 'estado', 'diagnostico', 'analiz', 'evaluar'] }
          ],
          evitar: [ { claves: ['hotel grande primero', 'sin estudio'], fb: 'El diagnóstico va primero.' } ],
          modelo: 'Empezamos el diagnóstico con el inventario y la jerarquización de los atractivos, como cascadas, ríos y cultura, y levantamos la planta turística: alojamiento, alimentación y guianza.'
        },
        {
          acciones: [
            { icono: '🏛️', t: 'Listar instituciones y ordenanzas que regulan el turismo', p: 2, fb: 'La superestructura condiciona el desarrollo turístico.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🛣️', t: 'Recorrer la vía y revisar agua, luz y señal celular', p: 2, fb: 'La infraestructura es una variable clave del diagnóstico.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☀️', t: 'Analizar solo el clima', p: 1, fb: 'El clima es una variable entre muchas.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🙅', t: 'Saltar el análisis: "ya sabemos que es bonito"', p: 0, fb: 'Sin diagnóstico integral no hay planificación.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Analiza la superestructura', claves: ['superestructura', 'instituciones', 'normas', 'ordenanza', 'gad'] },
            { n: 'Analiza medio físico y socioeconómico', claves: ['medio fisico', 'natural', 'socioeconomico', 'poblacion', 'empleo'] },
            { n: 'Analiza infraestructura y servicios', claves: ['infraestructura', 'vias', 'agua', 'energia', 'telecomunicaciones', 'internet'] }
          ],
          evitar: [ { claves: ['ya sabemos que es bonito', 'no hace falta'], fb: 'El diagnóstico debe ser integral.' } ],
          modelo: 'Analizaremos la superestructura con las instituciones y normas, el medio físico natural y el socioeconómico, y la infraestructura de vías, agua, energía y telecomunicaciones.'
        },
        {
          acciones: [
            { icono: '🗺️', t: 'Dibujar el plano síntesis con zonas de uso', p: 2, fb: 'El plano síntesis integra el diagnóstico en el territorio.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔢', t: 'Priorizar acciones en una tabla con plazos', p: 2, fb: 'Priorizar ajusta las acciones a los recursos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💼', t: 'Esperar a que llegue un inversionista', p: 0, fb: 'La planificación es responsabilidad local.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Elabora el plano síntesis', claves: ['plano', 'sintesis', 'zonas', 'mapa', 'zonificacion'] },
            { n: 'Propone un producto turístico', claves: ['producto', 'ruta', 'circuito', 'guias locales', 'experiencia'] },
            { n: 'Prioriza acciones', claves: ['priori', 'senaletica', 'capacitacion', 'via', 'acciones', 'plazo'] }
          ],
          evitar: [ { claves: ['todo a la vez', 'esperar inversionista'], fb: 'Prioriza según el diagnóstico.' } ],
          modelo: 'Propongo un plano síntesis con las zonas de uso, un producto inicial con la ruta de cascadas y guías locales, y acciones priorizadas: señalética, capacitación y mejora de la vía.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-206', cod: 'GOT-P-206',
    titulo: 'Investigar el mercado para un nuevo tour',
    asignaturas: ['GOT-P-206'],
    persona: { nombre: 'Ing. Daniela', rol: 'Dueña de una operadora de aventura', avatar: '👩🏻', pitch: 1.1 },
    contexto: 'La operadora quiere lanzar un tour de observación de aves. La dueña te pide investigar el mercado, segmentarlo y definir el posicionamiento.',
    objetivo: 'Aplicar las etapas de la investigación de mercados, los criterios de segmentación y el posicionamiento.',
    pasos: [
      { dice: '¿Cómo sabremos si hay clientes para este tour?', opciones: [
        { t: 'Con una investigación de mercados: definimos el problema, diseñamos la encuesta, recolectamos datos primarios y secundarios, analizamos y presentamos resultados.', p: 2, r: 'Ordenado y claro.', fb: 'La investigación de mercados sigue etapas sistemáticas.' },
        { t: 'Preguntando a mis amigos si les gusta.', p: 1, r: 'No es representativo.', fb: 'La opinión de conocidos no es una muestra válida.' },
        { t: 'Lanzando el tour y viendo qué pasa.', p: 0, r: 'Es arriesgado.', fb: 'Decidir sin información aumenta el riesgo.' }
      ]},
      { dice: '¿A quién vendemos?', opciones: [
        { t: 'Segmentamos: geográfico (extranjeros de Norteamérica y Europa), demográfico (35–65 años), psicográfico (amantes de la naturaleza) y conductual (viajan con equipo fotográfico).', p: 2, r: 'Ya veo a mi cliente.', fb: 'Los cuatro criterios de segmentación definen el público objetivo.' },
        { t: 'A todo el mundo.', p: 0, r: 'Imposible.', fb: 'Un producto para todos no llega a nadie.' },
        { t: 'A los extranjeros.', p: 1, r: '¿Cuáles?', fb: 'Es un solo criterio y demasiado amplio.' }
      ]},
      { dice: '¿Cómo nos diferenciamos de la competencia?', opciones: [
        { t: 'Nos posicionamos como el tour de aves con guías locales expertos y conservación comunitaria en Pastaza, y lo comunicamos en todos los canales.', p: 2, r: '¡Me encanta!', fb: 'El posicionamiento define el lugar distintivo del producto en la mente del cliente.' },
        { t: 'Siendo los más baratos.', p: 1, r: '¿Y la rentabilidad?', fb: 'Competir solo por precio es frágil.' },
        { t: 'Copiando el tour de otro.', p: 0, r: '…', fb: 'Copiar no genera diferenciación.' }
      ]}
    ],
    vivo: {
      lugar: 'Oficina de una operadora de aventura en Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📝', t: 'Redactar el problema de investigación', p: 2, fb: 'Definir el problema orienta toda la investigación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📋', t: 'Diseñar una encuesta para visitantes del aeropuerto de Shell', p: 2, fb: 'Las fuentes primarias aportan datos actuales del mercado.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎲', t: 'Lanzar el tour sin investigar', p: 0, fb: 'Decidir sin información aumenta el riesgo.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Menciona la investigación de mercados', claves: ['investigacion de mercados', 'investigacion', 'estudio de mercado', 'problema', 'etapas'] },
            { n: 'Recolecta datos primarios y secundarios', claves: ['encuesta', 'datos primarios', 'secundari', 'entrevista', 'recolect', 'estadisticas'] },
            { n: 'Analiza y presenta resultados', claves: ['analiz', 'resultados', 'presentar', 'informe', 'decision'] }
          ],
          evitar: [ { claves: ['ver que pasa', 'a mis amigos'], fb: 'Investiga de forma sistemática.' } ],
          modelo: 'Haremos una investigación de mercados: definimos el problema, aplicamos una encuesta como dato primario, revisamos estadísticas secundarias, analizamos y presentamos los resultados para decidir.'
        },
        {
          acciones: [
            { icono: '🌎', t: 'Filtrar los datos por país de origen', p: 2, fb: 'El criterio geográfico ubica dónde está el mercado.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🎯', t: 'Dibujar el perfil del cliente ideal', p: 2, fb: 'Integrar criterios define el segmento objetivo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🌐', t: 'Dirigir el tour a "todo el mundo"', p: 0, fb: 'Un producto para todos no llega a nadie.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa criterio geográfico', claves: ['geografic', 'norteamerica', 'europa', 'pais', 'origen'] },
            { n: 'Usa criterio demográfico', claves: ['demografic', 'edad', 'anos', 'ingresos', 'genero'] },
            { n: 'Usa criterios psicográfico o conductual', claves: ['psicografic', 'conductual', 'estilo de vida', 'naturaleza', 'comportamiento', 'fotograf'] }
          ],
          evitar: [ { claves: ['todo el mundo', 'para todos'], fb: 'Segmenta el mercado.' } ],
          modelo: 'Segmentamos con criterio geográfico, turistas de Norteamérica y Europa; demográfico, de 35 a 65 años; psicográfico, amantes de la naturaleza; y conductual, viajan con equipo fotográfico.'
        },
        {
          acciones: [
            { icono: '🦅', t: 'Escribir la frase de posicionamiento', p: 2, fb: 'Una frase clara expresa el diferencial del producto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔍', t: 'Comparar con tres competidores', p: 2, fb: 'Conocer a la competencia permite diferenciarse.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📑', t: 'Copiar el folleto de otra operadora', p: 0, fb: 'Copiar no genera diferenciación.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Define el posicionamiento', claves: ['posicion', 'diferenci', 'lugar en la mente', 'unico', 'distint'] },
            { n: 'Destaca el valor diferencial', claves: ['guias locales', 'expertos', 'conservacion', 'comunitari', 'aves'] },
            { n: 'Lo comunica de forma coherente', claves: ['comunic', 'canales', 'mensaje', 'promocion', 'marca'] }
          ],
          evitar: [ { claves: ['copiamos', 'el mas barato y ya'], fb: 'Diferénciate por valor.' } ],
          modelo: 'Nos posicionamos como el tour de aves con guías locales expertos y conservación comunitaria en Pastaza, una experiencia única, y lo comunicamos con el mismo mensaje en todos los canales.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-207', cod: 'GOT-P-207',
    titulo: 'Ocupación baja y reservas en la hostería',
    asignaturas: ['GOT-P-207'],
    persona: { nombre: 'Doña Gloria', rol: 'Propietaria de una hostería de 20 habitaciones', avatar: '👩🏽‍🦱', pitch: 1.05 },
    contexto: 'La hostería tiene baja ocupación entre semana, problemas con reservas duplicadas y quejas de mantenimiento. La propietaria te pide un plan de gestión.',
    objetivo: 'Aplicar la gestión de ingresos y tarifas, canales de distribución y reservas, mantenimiento, seguridad y sostenibilidad.',
    pasos: [
      { dice: 'Entre semana solo ocupo 8 de 20 habitaciones. ¿Qué hago?', opciones: [
        { t: 'La ocupación es del 40 %; propongo tarifas diferenciadas entre semana, paquetes con operadoras y convenios con empresas.', p: 2, r: 'Calculado y con ideas.', fb: 'La gestión de ingresos usa la ocupación para ajustar tarifas y segmentos.' },
        { t: 'Bajar el precio a la mitad todos los días.', p: 1, r: '¿Y los fines de semana?', fb: 'Un descuento general sacrifica ingresos en días de alta demanda.' },
        { t: 'Cerrar entre semana.', p: 0, r: '…', fb: 'Perder ingresos sin analizar alternativas no es gestión.' }
      ]},
      { dice: 'Ayer vendimos la misma habitación dos veces.', opciones: [
        { t: 'Centralizar la disponibilidad en un sistema de reservas conectado a todos los canales (directo y agencias en línea) y actualizarlo en tiempo real.', p: 2, r: 'Así no se repite.', fb: 'Gestionar los canales de distribución con un inventario único evita duplicados.' },
        { t: 'Llevar las reservas en un cuaderno.', p: 0, r: 'Así empezó el problema.', fb: 'El registro manual con varios canales provoca errores.' },
        { t: 'Dejar de vender por internet.', p: 1, r: 'Perdería clientes.', fb: 'Evita el error, pero reduce la comercialización.' }
      ]},
      { dice: 'Los huéspedes se quejan de duchas dañadas y no hay señalética de evacuación.', opciones: [
        { t: 'Un plan de mantenimiento preventivo, señalética y extintores revisados, ruta de evacuación y medidas sostenibles como calentadores solares y ahorro de agua.', p: 2, r: 'Muy completo.', fb: 'El mantenimiento preventivo, la seguridad y la sostenibilidad son parte de la gestión del alojamiento.' },
        { t: 'Reparar solo cuando alguien se queje.', p: 1, r: 'Siempre llegamos tarde.', fb: 'El mantenimiento correctivo genera quejas y costos mayores.' },
        { t: 'No hace falta señalética, nunca ha pasado nada.', p: 0, r: '…', fb: 'La seguridad de los huéspedes es obligatoria.' }
      ]}
    ],
    vivo: {
      lugar: 'Recepción de una hostería en Puyo', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🧮', t: 'Calcular la ocupación con la calculadora', p: 2, fb: 'La ocupación es el indicador base para decidir tarifas.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📅', t: 'Revisar la ocupación por día de la semana', p: 2, fb: 'Identificar patrones permite tarifas diferenciadas.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🔒', t: 'Proponer cerrar la hostería entre semana', p: 0, fb: 'Perder ingresos sin analizar no es gestión.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Calcula la ocupación', claves: ['40', 'cuarenta', 'por ciento', 'ocupacion', 'ocho de veinte'] },
            { n: 'Propone tarifas diferenciadas', claves: ['tarifa', 'diferenciad', 'entre semana', 'precio', 'temporada'] },
            { n: 'Busca nuevos segmentos o paquetes', claves: ['paquete', 'operadora', 'empresas', 'convenio', 'segmento', 'grupos'] }
          ],
          evitar: [ { claves: ['cerrar', 'mitad de precio siempre'], fb: 'Gestiona los ingresos con análisis.' } ],
          modelo: 'La ocupación es de 8 de 20, el 40 por ciento. Propongo tarifas diferenciadas entre semana, paquetes con operadoras y convenios con empresas de la zona.'
        },
        {
          acciones: [
            { icono: '🖥️', t: 'Configurar un sistema de reservas único', p: 2, fb: 'Un inventario único evita la doble venta.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔗', t: 'Conectar las agencias en línea al sistema', p: 2, fb: 'La gestión de canales mantiene la disponibilidad actualizada.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📓', t: 'Seguir anotando reservas en un cuaderno', p: 0, fb: 'El registro manual con varios canales provoca errores.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Centraliza la disponibilidad', claves: ['sistema de reservas', 'centraliz', 'inventario', 'disponibilidad', 'unico'] },
            { n: 'Gestiona los canales de distribución', claves: ['canales', 'agencias en linea', 'booking', 'directo', 'distribucion', 'ota'] },
            { n: 'Actualiza en tiempo real', claves: ['tiempo real', 'actualiz', 'automatic', 'sincroniz', 'al instante'] }
          ],
          evitar: [ { claves: ['cuaderno', 'de memoria'], fb: 'Usa un sistema centralizado.' } ],
          modelo: 'Centralizamos la disponibilidad en un sistema de reservas conectado a todos los canales, el directo y las agencias en línea, y lo actualizamos en tiempo real.'
        },
        {
          acciones: [
            { icono: '🔧', t: 'Elaborar un calendario de mantenimiento preventivo', p: 2, fb: 'El mantenimiento preventivo reduce quejas y costos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🧯', t: 'Revisar extintores y colocar la ruta de evacuación', p: 2, fb: 'La seguridad de los huéspedes es obligatoria.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☀️', t: 'Cotizar calentadores solares para las duchas', p: 2, fb: 'La sostenibilidad reduce costos de energía.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🙈', t: 'Ignorar la señalética: "nunca ha pasado nada"', p: 0, fb: 'La prevención de riesgos no es opcional.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Propone mantenimiento preventivo', claves: ['mantenimiento preventivo', 'preventivo', 'calendario', 'revision', 'duchas'] },
            { n: 'Atiende la seguridad', claves: ['senaletica', 'extintor', 'evacuacion', 'seguridad', 'emergencia'] },
            { n: 'Incluye medidas sostenibles', claves: ['solar', 'ahorro de agua', 'sostenib', 'energia', 'reciclaje'] }
          ],
          evitar: [ { claves: ['nunca ha pasado nada', 'no hace falta'], fb: 'La seguridad y el mantenimiento son obligatorios.' } ],
          modelo: 'Propongo un plan de mantenimiento preventivo para las duchas, señalética de evacuación y extintores revisados, y medidas sostenibles como calentadores solares y ahorro de agua.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-208', cod: 'GOT-P-208',
    titulo: 'Guiar a un grupo escolar en el parque etnobotánico',
    asignaturas: ['GOT-P-208'],
    persona: { nombre: 'Miss Paola', rol: 'Docente de un grupo de 25 niños de 9 años', avatar: '👩🏽‍🏫', pitch: 1.15 },
    contexto: 'Guías a 25 niños en un parque etnobotánico de Puyo. Debes adaptar tu comunicación, interpretar el patrimonio y manejar el grupo con seguridad.',
    objetivo: 'Aplicar la comunicación efectiva, la interpretación del patrimonio y la gestión segura de grupos en la guianza.',
    pasos: [
      { dice: 'Los niños están inquietos. ¿Cómo empiezas?', opciones: [
        { t: 'Me presento con entusiasmo, uso palabras sencillas y una pregunta que despierte curiosidad, y explico las reglas: caminar en parejas y no tocar plantas sin permiso.', p: 2, r: '¡Los tienes atentos!', fb: 'Adaptar el lenguaje al público y fijar normas desde el inicio facilita la guianza.' },
        { t: 'Doy una explicación científica con nombres en latín.', p: 1, r: '(Los niños bostezan.)', fb: 'El contenido es correcto, pero no está adaptado al público.' },
        { t: 'Les grito que se callen.', p: 0, r: '(Los niños se asustan.)', fb: 'La comunicación agresiva rompe el vínculo con el grupo.' }
      ]},
      { dice: '¿Cómo les explicas la planta de sangre de drago?', opciones: [
        { t: 'Hago una interpretación: les muestro la savia roja, la relaciono con sus raspones y cuento cómo las abuelas la usan para curar; así valoran el saber ancestral.', p: 2, r: '¡Wow, como sangre!', fb: 'Interpretar es revelar significados relacionando el patrimonio con la vida del visitante.' },
        { t: 'Digo su nombre y paso a la siguiente.', p: 1, r: '…', fb: 'Informar no es interpretar.' },
        { t: 'Les dejo arrancar hojas para que se las lleven.', p: 0, r: '(Dañan las plantas.)', fb: 'La guianza sostenible protege el recurso.' }
      ]},
      { dice: 'Un niño se aleja hacia el río.', opciones: [
        { t: 'Detengo al grupo, lo llamo con calma y lo traigo de vuelta, cuento a todos los niños y refuerzo la regla de parejas con la docente al final de la fila.', p: 2, r: 'Gracias, qué susto.', fb: 'La seguridad y la prevención de riesgos son responsabilidad del guía.' },
        { t: 'Sigo explicando; la docente lo verá.', p: 0, r: '¡Está cerca del agua!', fb: 'El guía es responsable de la seguridad del grupo.' },
        { t: 'Le grito desde lejos.', p: 1, r: '(El niño se asusta.)', fb: 'Hay que actuar con calma y acercarse.' }
      ]}
    ],
    vivo: {
      lugar: 'Parque etnobotánico en Puyo', fondo: 'exterior',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '👋', t: 'Agacharse a la altura de los niños para saludar', p: 2, fb: 'La comunicación no verbal cercana genera confianza.', efecto: { confianza: 8, tension: -6 } },
            { icono: '❓', t: 'Lanzar una pregunta curiosa sobre la selva', p: 2, fb: 'Las preguntas captan la atención del público infantil.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📢', t: 'Gritar para que se callen', p: 0, fb: 'La comunicación agresiva rompe el vínculo.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Se presenta con entusiasmo', claves: ['hola', 'me llamo', 'soy', 'bienvenid', 'amigos'] },
            { n: 'Despierta la curiosidad', claves: ['sabian', 'adivinen', 'quien sabe', 'pregunta', 'imaginen', 'saben que'] },
            { n: 'Explica las reglas del recorrido', claves: ['parejas', 'reglas', 'no tocar', 'sendero', 'juntos', 'escuchar'] }
          ],
          evitar: [ { claves: ['callense', 'silencio ya'], fb: 'Capta la atención sin agresividad.' } ],
          modelo: 'Hola, amigos, me llamo Kevin y seré su guía. ¿Sabían que aquí hay plantas que curan? Las reglas son caminar en parejas, no tocar plantas sin permiso y quedarnos en el sendero.'
        },
        {
          acciones: [
            { icono: '🩸', t: 'Mostrar una gota de savia roja de sangre de drago', p: 2, fb: 'Un recurso sensorial hace memorable la interpretación.', efecto: { confianza: 10, tension: -6 } },
            { icono: '👵', t: 'Contar la historia de una abuela sanadora', p: 2, fb: 'Las historias revelan el significado cultural del recurso.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🍃', t: 'Dejar que arranquen hojas de recuerdo', p: 0, fb: 'La guianza sostenible protege el recurso.', efecto: { confianza: 4, tension: 4 } }
          ],
          conceptos: [
            { n: 'Relaciona con la vida de los niños', claves: ['raspon', 'herida', 'cuando se caen', 'como ustedes', 'en su casa', 'curar'] },
            { n: 'Revela el saber ancestral', claves: ['abuel', 'ancestral', 'saber', 'medicina', 'kichwa', 'tradicion'] },
            { n: 'Promueve el cuidado de la planta', claves: ['cuidar', 'proteger', 'no arrancar', 'respetar', 'conservar'] }
          ],
          evitar: [ { claves: ['arranquen', 'llevense hojas'], fb: 'No permitas dañar las plantas.' } ],
          modelo: 'Miren esta savia roja: las abuelas kichwa la usan como medicina ancestral para curar heridas, como cuando ustedes se caen y se hacen un raspón. Por eso debemos cuidar y proteger la planta.'
        },
        {
          acciones: [
            { icono: '✋', t: 'Detener al grupo con una señal clara', p: 2, fb: 'Detener al grupo evita que otros niños se dispersen.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🚶', t: 'Acercarse con calma y traer al niño', p: 2, fb: 'Actuar con calma protege al niño sin asustarlo.', efecto: { confianza: 8, tension: -8 } },
            { icono: '🗣️', t: 'Seguir explicando y que la docente se ocupe', p: 0, fb: 'El guía es responsable de la seguridad del grupo.', efecto: { confianza: -12, tension: 14 } }
          ],
          conceptos: [
            { n: 'Actúa con calma y lo trae de vuelta', claves: ['calma', 'ven', 'regresa', 'acompano', 'traigo', 'tranquilo'] },
            { n: 'Cuenta a los niños', claves: ['cuento', 'contar', 'lista', 'veinticinco', '25', 'todos'] },
            { n: 'Refuerza las normas de seguridad', claves: ['parejas', 'regla', 'seguridad', 'docente', 'al final de la fila', 'no acercarse al rio'] }
          ],
          evitar: [ { claves: ['que lo vea la docente', 'no es mi problema'], fb: 'La seguridad es tu responsabilidad.' } ],
          modelo: 'Detengo al grupo, voy con calma y le digo: ven, regresa conmigo. Luego cuento a los 25 niños y recuerdo la regla de parejas, con la docente al final de la fila.'
        }
      ]
    }
  }
]);
