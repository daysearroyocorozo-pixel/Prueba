/* =========================================================
   Datos curriculares de la carrera de Educación Básica (ISTCY)
   y contenidos de los módulos de Planificación, Evaluación y Casos.
   Fuente: malla curricular con contenidos mínimos e Informe de
   valoración del proyecto de carrera (Anexo 2).
   ========================================================= */

const MODULES = {
  aula:  { nombre: 'Aula simulada', emoji: '🏫', desc: 'Dictar una clase completa a estudiantes virtuales.' },
  plan:  { nombre: 'Planificación', emoji: '📋', desc: 'Planificación microcurricular antes de la clase.' },
  eval:  { nombre: 'Evaluación', emoji: '📊', desc: 'Calificar, analizar resultados y decidir el refuerzo.' },
  casos: { nombre: 'Casos profesionales', emoji: '🤝', desc: 'Diversidad, convivencia, normativa y familias.' }
};

/* Malla: 23 asignaturas. rel = directa | parcial */
const MALLA = [
  { cod: 'SPRL-101', n: 'Comunicación Oral y Escrita', pao: 1, u: 'Básica', mod: ['aula', 'casos'], rel: 'directa', sim: 'Expresión e interacción oral con estudiantes y familias; didáctica de la comunicación.' },
  { cod: 'SPRL-102', n: 'Cosmovivencia Andina e Interculturalidad', pao: 1, u: 'Básica', mod: ['casos', 'aula'], rel: 'directa', sim: 'Diversidad cultural, estrategias didácticas interculturales y saberes ancestrales.' },
  { cod: 'SPRL-103', n: 'Metodología de la Investigación', pao: 1, u: 'Básica', mod: ['eval'], rel: 'parcial', sim: 'Recolección y análisis de datos educativos (resultados exportables en JSON).' },
  { cod: 'SPRL-104', n: 'Psicología General', pao: 1, u: 'Básica', mod: ['aula', 'casos'], rel: 'directa', sim: 'Identificación de necesidades, habilidades socioemocionales e intervención psicoeducativa.' },
  { cod: 'SPRL-105', n: 'Pedagogía General', pao: 1, u: 'Profesional', mod: ['aula', 'plan'], rel: 'directa', sim: 'Planificación de clases, gestión del aula, clima escolar y retroalimentación.' },
  { cod: 'SPRL-109', n: 'Teorías del Aprendizaje', pao: 1, u: 'Profesional', mod: ['aula'], rel: 'directa', sim: 'Atención, memoria, motivación y diferencias individuales en el aprendizaje.' },
  { cod: 'SPRL-203', n: 'Estadística Descriptiva', pao: 2, u: 'Básica', mod: ['eval'], rel: 'directa', sim: 'Tablas de frecuencia, medidas de tendencia central y dispersión aplicadas a calificaciones.' },
  { cod: 'SPRL-204', n: 'Psicología Evolutiva del Niño', pao: 2, u: 'Básica', mod: ['aula', 'casos'], rel: 'directa', sim: 'Desarrollo cognitivo, emocional y social según el subnivel de EGB.' },
  { cod: 'SPRL-205', n: 'Didáctica General', pao: 2, u: 'Básica', mod: ['plan', 'aula'], rel: 'directa', sim: 'Planificación, métodos de enseñanza, recursos didácticos y evaluación.' },
  { cod: 'SPRL-206', n: 'Modelos Pedagógicos', pao: 2, u: 'Profesional', mod: ['plan', 'aula'], rel: 'directa', sim: 'Elegir y aplicar un modelo: constructivista, ABP, cooperativo, tradicional.' },
  { cod: 'SPRL-207', n: 'TICs Aplicados a la Educación', pao: 2, u: 'Profesional', mod: ['plan', 'aula'], rel: 'directa', sim: 'Integración de recursos digitales y realidad aumentada en la planificación y la clase.' },
  { cod: 'SPRL-209', n: 'Enseñanza del Lenguaje y Comunicación', pao: 2, u: 'Básica', mod: ['aula'], rel: 'directa', sim: 'Clases de Lengua y Comunicación por subnivel: lectura, escritura y oralidad.' },
  { cod: 'SPRL-304', n: 'Psicología del Aprendizaje', pao: 3, u: 'Básica', mod: ['aula', 'eval'], rel: 'directa', sim: 'Metacognición, feedback, ajuste de estrategias y gestión del comportamiento.' },
  { cod: 'SPRL-305', n: 'Didáctica Aplicada a la EGB', pao: 3, u: 'Profesional', mod: ['aula', 'plan'], rel: 'directa', sim: 'Estrategias para necesidades educativas y retroalimentación en EGB.' },
  { cod: 'SPRL-306', n: 'Planificación Curricular de la Educación Básica', pao: 3, u: 'Profesional', mod: ['plan'], rel: 'directa', sim: 'Planificación microcurricular, adaptaciones curriculares para NEE y evaluación.' },
  { cod: 'SPRL-307', n: 'Taller de Material Didáctico I', pao: 3, u: 'Profesional', mod: ['plan'], rel: 'parcial', sim: 'Selección de material didáctico según el nivel y las necesidades.' },
  { cod: 'SPRL-309', n: 'Enseñanza de las Matemáticas', pao: 3, u: 'Profesional', mod: ['aula'], rel: 'directa', sim: 'Clases de Matemática por subnivel: resolución de problemas y razonamiento.' },
  { cod: 'SPRL-405', n: 'Evaluación de Aprendizajes', pao: 4, u: 'Profesional', mod: ['eval', 'plan'], rel: 'directa', sim: 'Evaluación diagnóstica, formativa y sumativa; instrumentos; escala de calificaciones.' },
  { cod: 'SPRL-406', n: 'Legislación Educativa', pao: 4, u: 'Profesional', mod: ['casos'], rel: 'directa', sim: 'Derechos, inclusión, rutas de actuación y ética profesional.' },
  { cod: 'SPRL-407', n: 'Taller de Material Didáctico II', pao: 4, u: 'Profesional', mod: ['plan'], rel: 'parcial', sim: 'Materiales inclusivos e innovadores para la diversidad.' },
  { cod: 'SPRL-408', n: 'Proyectos Educativos', pao: 4, u: 'Profesional', mod: ['casos'], rel: 'parcial', sim: 'Diagnóstico de necesidades para un proyecto educativo.' },
  { cod: 'SPRL-409', n: 'Enseñanza de las Ciencias Sociales y Naturales', pao: 4, u: 'Profesional', mod: ['aula'], rel: 'directa', sim: 'Clases de CC. Naturales y CC. Sociales por subnivel.' },
  { cod: 'SPRL-410', n: 'Trabajo de Integración Curricular', pao: 4, u: 'Integración', mod: ['aula', 'plan', 'eval', 'casos'], rel: 'parcial', sim: 'Integra todos los módulos; los reportes sirven como evidencia.' }
];

/* ---------------- Planificación microcurricular ---------------- */
const PLAN_OPTS = {
  modelos: [
    { id: 'erca', t: 'Constructivista (ciclo ERCA)' },
    { id: 'abp', t: 'Aprendizaje basado en problemas' },
    { id: 'coop', t: 'Aprendizaje cooperativo' },
    { id: 'trad', t: 'Tradicional expositivo' }
  ],
  actividades: [
    { id: 'saludo', fase: 'anticipacion', t: 'Saludo y motivación' },
    { id: 'objetivo', fase: 'anticipacion', t: 'Presentar el objetivo' },
    { id: 'previo', fase: 'anticipacion', t: 'Activar conocimientos previos' },
    { id: 'explicacion', fase: 'construccion', t: 'Explicación del contenido' },
    { id: 'preguntas', fase: 'construccion', t: 'Preguntas a los estudiantes' },
    { id: 'ejercicio', fase: 'construccion', t: 'Ejercicio resuelto en la pizarra' },
    { id: 'grupal', fase: 'construccion', t: 'Trabajo colaborativo' },
    { id: 'quiz', fase: 'consolidacion', t: 'Evaluación rápida' },
    { id: 'resumen', fase: 'consolidacion', t: 'Resumen de lo aprendido' },
    { id: 'tarea', fase: 'consolidacion', t: 'Tarea' }
  ],
  recursos: [
    { id: 'pizarra', t: 'Pizarra' },
    { id: 'concreto', t: 'Material concreto o manipulativo' },
    { id: 'visual', t: 'Láminas, imágenes y organizadores gráficos' },
    { id: 'digital', t: 'Recursos digitales o realidad aumentada' },
    { id: 'juego', t: 'Juego didáctico' },
    { id: 'texto', t: 'Texto escolar y fichas de trabajo' }
  ],
  tipoEval: [
    { id: 'diagnostica', t: 'Diagnóstica' },
    { id: 'formativa', t: 'Formativa' },
    { id: 'sumativa', t: 'Sumativa' }
  ],
  instrumentos: [
    { id: 'cotejo', t: 'Observación con lista de cotejo' },
    { id: 'oral', t: 'Preguntas orales con registro' },
    { id: 'cuestionario', t: 'Cuestionario escrito' },
    { id: 'rubrica', t: 'Rúbrica' }
  ],
  adaptaciones: [
    { id: 'ninguna', t: 'Ninguna' },
    { id: 'g1', t: 'Grado 1 – de acceso (ubicación, materiales, apoyos)' },
    { id: 'g2', t: 'Grado 2 – no significativa (metodología y evaluación)' },
    { id: 'g3', t: 'Grado 3 – significativa (modifica destrezas y criterios)' }
  ]
};

/* Escala de calificaciones (Reglamento General a la LOEI) */
const ESCALA = [
  { id: 'DAR', t: 'Domina los aprendizajes requeridos', min: 9, max: 10 },
  { id: 'AAR', t: 'Alcanza los aprendizajes requeridos', min: 7, max: 8.99 },
  { id: 'PAAR', t: 'Está próximo a alcanzar los aprendizajes requeridos', min: 4.01, max: 6.99 },
  { id: 'NAAR', t: 'No alcanza los aprendizajes requeridos', min: 0, max: 4 }
];
function escalaDe(n) { return n >= 9 ? 'DAR' : n >= 7 ? 'AAR' : n > 4 ? 'PAAR' : 'NAAR'; }

/* ---------------- Casos de práctica profesional ----------------
   Cada opción: t (lo que dice o hace el docente), p (0, 1 o 2 puntos),
   r (reacción del personaje), fb (fundamento pedagógico/normativo). */
const CASES = [
  {
    id: 'familia-kevin', titulo: 'Reunión con la madre de Kevin',
    asignaturas: ['SPRL-101', 'SPRL-104', 'SPRL-305'],
    persona: { nombre: 'Sra. Rosa', rol: 'Madre de Kevin (estudiante con TDAH)', avatar: '👩🏽', pitch: 1.1 },
    contexto: 'La madre de Kevin pidió una reunión. Llega molesta porque su hijo dice que en clase siempre lo regañan.',
    pasos: [
      { dice: 'Profe, mi hijo llega llorando. Dice que usted lo regaña todo el tiempo. ¿Qué está pasando?', opciones: [
        { t: 'Gracias por venir, señora. Cuénteme qué le ha dicho Kevin; quiero entender cómo se siente.', p: 2, r: 'Bueno… dice que no lo dejan moverse y que lo sacan al frente.', fb: 'La escucha activa baja la tensión y muestra que la prioridad es el niño.' },
        { t: 'Kevin no se porta bien, señora. Interrumpe la clase todos los días.', p: 0, r: '¿Entonces la culpa es de mi hijo? ¡Él tiene un diagnóstico!', fb: 'Empezar culpando al estudiante pone a la familia a la defensiva.' },
        { t: 'Le aseguro que lo trato igual que a todos.', p: 1, r: 'Pero él no es igual, profe. Necesita otro trato.', fb: 'Tratar igual no es tratar con equidad: el TDAH requiere apoyos diferenciados.' }
      ]},
      { dice: '¿Y qué ha notado usted en el aula?', opciones: [
        { t: 'Le comparto lo que he registrado: se concentra unos 10 minutos y luego se distrae; cuando le doy consignas cortas, participa con entusiasmo.', p: 2, r: 'Sí, en casa pasa lo mismo con los deberes.', fb: 'Describir conductas observadas y fortalezas, con evidencia, es comunicación profesional y objetiva.' },
        { t: 'Creo que deberían cambiarle la medicación.', p: 0, r: '¿Usted es médico? Eso lo decide su doctora.', fb: 'El docente no prescribe ni diagnostica; eso corresponde a profesionales de la salud.' },
        { t: 'Es un niño muy inquieto, eso es todo.', p: 1, r: 'Eso ya lo sé, profe.', fb: 'Una descripción vaga no aporta información para tomar decisiones.' }
      ]},
      { dice: '¿Qué podemos hacer entonces?', opciones: [
        { t: 'Propongo acuerdos: lo ubicaré cerca de mí, le daré consignas cortas y pausas activas, y coordinaremos con el DECE. En casa, una rutina de tareas por bloques. Nos reunimos en un mes.', p: 2, r: 'Me parece muy bien. Gracias por tomarse el tiempo.', fb: 'Acuerdos concretos casa-escuela, adaptaciones de acceso y articulación con el DECE, con seguimiento.' },
        { t: 'Lo mejor es que lo cambie de paralelo.', p: 0, r: 'O sea que no lo quieren aquí…', fb: 'Trasladar el problema vulnera el derecho a una educación inclusiva.' },
        { t: 'Vamos a ver cómo sigue y le aviso.', p: 1, r: 'Está bien… espero noticias.', fb: 'Sin acuerdos ni plazos, la reunión no cambia nada.' }
      ]}
    ]
  },
  {
    id: 'killa-kichwa', titulo: 'Una estudiante kichwahablante recién llegada',
    asignaturas: ['SPRL-102', 'SPRL-209', 'SPRL-104'],
    persona: { nombre: 'Killa', rol: 'Estudiante de una comunidad kichwa amazónica', avatar: '👧🏽', pitch: 1.6 },
    contexto: 'Killa llegó esta semana desde una comunidad kichwa. Habla poco castellano. Al presentarse, algunos compañeros se ríen de su pronunciación.',
    pasos: [
      { dice: '(Killa baja la mirada mientras algunos compañeros se ríen.)', opciones: [
        { t: 'Detengo la burla con calma: "En esta aula respetamos a todos. Killa habla kichwa y castellano: ¡sabe dos idiomas! Killa, ¿nos enseñas cómo se saluda en kichwa?"', p: 2, r: '…Alli puncha. (sonríe un poco)', fb: 'Se frena la discriminación y se valora la lengua materna como saber, no como déficit.' },
        { t: 'Ignoro las risas para no hacer más grande el problema.', p: 0, r: '(Killa no vuelve a hablar en toda la clase.)', fb: 'Ignorar la burla la normaliza y deja sola a la estudiante.' },
        { t: '"¡Silencio todos! El que se ría sale del aula."', p: 1, r: '(Las risas paran, pero Killa sigue incómoda.)', fb: 'Se detiene la conducta, pero no se trabaja el respeto ni la valoración de la diversidad.' }
      ]},
      { dice: '(Durante la clase, Killa no entiende una consigna escrita.)', opciones: [
        { t: 'Le explico con imágenes y material concreto y le asigno una compañera tutora; incorporo algunas palabras en kichwa al tema.', p: 2, r: 'Ari, ¡ya entendí!', fb: 'Apoyos visuales, tutoría entre pares y uso de la lengua materna favorecen el aprendizaje intercultural.' },
        { t: 'Le pido que se esfuerce más en hablar castellano.', p: 0, r: '(Killa asiente, pero no entiende la tarea.)', fb: 'Exigir abandonar la lengua materna contradice el enfoque intercultural del currículo.' },
        { t: 'Le doy una tarea más fácil que al resto.', p: 1, r: 'Ya terminé, profe.', fb: 'Bajar la exigencia sin un análisis de su nivel puede limitar sus aprendizajes; primero hay que dar acceso.' }
      ]},
      { dice: '(Debes comunicarte con su familia.)', opciones: [
        { t: 'Invito a la familia a una reunión, con apoyo de alguien de la comunidad que traduzca si hace falta, y les pregunto por los saberes y costumbres que podemos traer al aula.', p: 2, r: 'Su papá ofrece venir a contar cómo se cuida la chakra.', fb: 'Diálogo respetuoso y bidireccional; la familia y la comunidad se vuelven aliadas y fuente de saberes.' },
        { t: 'Envío una nota escrita pidiendo que en casa le hablen solo en castellano.', p: 0, r: '(La familia no responde la nota.)', fb: 'Desconoce la barrera lingüística y desvaloriza la lengua familiar.' },
        { t: 'Espero a la reunión general de padres.', p: 1, r: '(Pasan semanas sin contacto.)', fb: 'Una llegada reciente amerita contacto oportuno e individual.' }
      ]}
    ]
  },
  {
    id: 'senales-violencia', titulo: 'Señales de una posible situación de violencia',
    asignaturas: ['SPRL-406', 'SPRL-104', 'SPRL-204'],
    persona: { nombre: 'Anahí', rol: 'Estudiante de 4.º EGB', avatar: '👧🏾', pitch: 1.7 },
    contexto: 'Al finalizar la clase notas que Anahí tiene moretones en el brazo. Se queda en el aula y te dice algo en voz baja.',
    pasos: [
      { dice: 'Profe… no quiero ir a mi casa hoy. ¿Me promete que no le cuenta a nadie?', opciones: [
        { t: 'Me agacho a su altura y le digo con calma: "Gracias por confiar en mí. No puedo prometerte guardar el secreto, pero sí que voy a buscar ayuda para cuidarte."', p: 2, r: 'Bueno… ¿me va a ayudar?', fb: 'No se promete confidencialidad porque el docente está obligado a reportar; se contiene y se da seguridad.' },
        { t: '"Te lo prometo. Cuéntame todo: ¿quién te hizo eso? ¿cuándo?"', p: 0, r: '(Anahí se asusta con tantas preguntas.)', fb: 'Prometer secreto y hacer un interrogatorio puede revictimizar; investigar no es función docente.' },
        { t: '"Seguro te caíste jugando, ¿verdad? Ve tranquila a casa."', p: 0, r: '(Anahí se va en silencio.)', fb: 'Minimizar las señales deja a la niña desprotegida.' }
      ]},
      { dice: '(Anahí ya está con la inspectora. ¿Qué haces ahora?)', opciones: [
        { t: 'Informo de inmediato a la autoridad del plantel y al DECE para activar el protocolo y la ruta de actuación.', p: 2, r: 'El DECE activa la ruta de protección el mismo día.', fb: 'Los protocolos del Ministerio de Educación obligan a informar de inmediato a la autoridad y al DECE.' },
        { t: 'Llamo a sus padres para preguntarles qué pasó.', p: 0, r: '(Podría alertar a un posible agresor.)', fb: 'Confrontar a la familia puede poner en mayor riesgo a la niña; lo maneja la ruta institucional.' },
        { t: 'Espero unos días para ver si aparecen más señales.', p: 0, r: '(Pasan los días sin intervención.)', fb: 'La demora puede tener consecuencias graves; la obligación es actuar de inmediato.' }
      ]},
      { dice: '(Te piden registrar lo ocurrido.)', opciones: [
        { t: 'Escribo solo hechos observados y las palabras textuales de Anahí, con fecha y hora, sin opiniones ni suposiciones.', p: 2, r: 'El informe es claro y útil para el DECE.', fb: 'Un registro objetivo y confidencial protege a la estudiante y respalda la actuación.' },
        { t: 'Escribo quién creo que fue el agresor.', p: 0, r: '(El informe contiene suposiciones.)', fb: 'Las suposiciones no corresponden al registro docente y pueden afectar el proceso.' },
        { t: 'Lo comento con otros docentes en la sala de profesores.', p: 0, r: '(La información se difunde.)', fb: 'Vulnera la confidencialidad y el derecho a la intimidad de la niña.' }
      ]}
    ]
  },
  {
    id: 'acoso-grupo', titulo: 'Burlas en el grupo de WhatsApp del curso',
    asignaturas: ['SPRL-105', 'SPRL-406', 'SPRL-104'],
    persona: { nombre: 'Camila', rol: 'Estudiante que reporta la situación', avatar: '👩🏽‍🦱', pitch: 1.4 },
    contexto: 'Camila te muestra capturas: en el grupo de WhatsApp del curso, Joel publica memes burlándose de Nayeli desde hace dos semanas.',
    pasos: [
      { dice: 'Profe, Nayeli ya no quiere venir a la escuela por esos memes.', opciones: [
        { t: 'Le agradezco a Camila por avisar, guardo la evidencia y converso en privado con Nayeli para saber cómo está y protegerla.', p: 2, r: 'Gracias, profe. Nayeli se va a sentir mejor si sabe que usted la apoya.', fb: 'Primero se protege a la persona afectada y se resguarda la evidencia.' },
        { t: 'Lo que pasa en WhatsApp no es asunto de la escuela.', p: 0, r: 'Pero es entre compañeros del curso…', fb: 'El acoso entre estudiantes afecta la convivencia escolar aunque ocurra en redes.' },
        { t: 'Leo las capturas frente a todo el curso para que Joel se avergüence.', p: 0, r: '(Nayeli queda aún más expuesta.)', fb: 'La exposición pública revictimiza y no resuelve el conflicto.' }
      ]},
      { dice: '(Ahora debes hablar con Joel.)', opciones: [
        { t: 'Converso con Joel en privado, le muestro el daño causado y le pido que proponga cómo reparar; acordamos medidas según el Código de Convivencia.', p: 2, r: 'No pensé que le afectara tanto… le voy a pedir disculpas.', fb: 'Un enfoque restaurativo responsabiliza sin humillar y busca reparar el daño.' },
        { t: 'Lo suspendo yo mismo de inmediato.', p: 0, r: '¡Eso no es justo, no me dejó explicar!', fb: 'Las medidas disciplinarias siguen el debido proceso y no las impone un docente solo.' },
        { t: 'Le digo que no lo vuelva a hacer y ya.', p: 1, r: 'Ok…', fb: 'Sin reflexión ni seguimiento, la conducta suele repetirse.' }
      ]},
      { dice: '(¿Cómo das seguimiento?)', opciones: [
        { t: 'Informo al DECE y a las familias, trabajo en clase una sesión sobre convivencia digital y reviso la situación en dos semanas.', p: 2, r: 'El grupo del curso mejora y Nayeli regresa con confianza.', fb: 'Articulación con el DECE y las familias, prevención con todo el curso y seguimiento.' },
        { t: 'Elimino el grupo de WhatsApp.', p: 1, r: '(Crean otro grupo sin el docente.)', fb: 'Eliminar el canal no cambia las conductas.' },
        { t: 'Considero el caso cerrado tras la disculpa.', p: 0, r: '(Las burlas vuelven un mes después.)', fb: 'El acoso requiere seguimiento sostenido.' }
      ]}
    ]
  },
  {
    id: 'padre-nota', titulo: 'Un padre exige cambiar una calificación',
    asignaturas: ['SPRL-405', 'SPRL-406', 'SPRL-101'],
    persona: { nombre: 'Sr. Jorge', rol: 'Padre de Yaku', avatar: '👨🏻', pitch: 0.9 },
    contexto: 'Yaku obtuvo 5,50 en la evaluación de la unidad. Su padre llega a la escuela muy molesto.',
    pasos: [
      { dice: '¡Mi hijo no puede tener un 5,50! Súbale la nota, él sí estudió.', opciones: [
        { t: 'Entiendo su preocupación. Le muestro la evaluación de Yaku y la rúbrica con la que se calificó, para revisarla juntos.', p: 2, r: 'Bueno… veamos.', fb: 'La evaluación se sustenta en criterios e instrumentos conocidos; mostrarlos da transparencia.' },
        { t: 'Está bien, le pongo un 7 para que no se preocupe.', p: 0, r: 'Así me gusta.', fb: 'Modificar una nota sin sustento vulnera la ética profesional y el valor de la evaluación.' },
        { t: 'La nota ya está puesta y no se cambia. Retírese, por favor.', p: 0, r: '¡Voy a quejarme con el rector!', fb: 'Negarse al diálogo escala el conflicto y desconoce el derecho de la familia a ser informada.' }
      ]},
      { dice: 'Ya veo… pero entonces, ¿qué puede hacer mi hijo?', opciones: [
        { t: 'Le explico que 5,50 equivale a "Está próximo a alcanzar los aprendizajes requeridos" y que Yaku tendrá refuerzo académico con un plan y una nueva evaluación.', p: 2, r: 'Ah, entonces sí hay una oportunidad.', fb: 'La normativa prevé refuerzo académico para quien no alcanza el mínimo de 7.' },
        { t: 'Ya no puede hacer nada; perdió.', p: 0, r: '¿Cómo que nada?', fb: 'Es incorrecto: existen el refuerzo académico y la recuperación.' },
        { t: 'Que estudie más en casa.', p: 1, r: '¿Pero qué tiene que estudiar exactamente?', fb: 'Falta orientar qué aprendizajes reforzar y cómo.' }
      ]},
      { dice: '¿Cómo lo apoyo desde casa?', opciones: [
        { t: 'Le entrego por escrito los temas a reforzar y una rutina de 20 minutos diarios, y acordamos revisar el avance en dos semanas.', p: 2, r: 'Muchas gracias, profe. Disculpe cómo llegué.', fb: 'Acuerdos concretos y seguimiento convierten el conflicto en colaboración.' },
        { t: 'Contrate un profesor particular.', p: 1, r: 'No tengo para pagar eso.', fb: 'Una recomendación que no considera la situación de la familia no es viable.' },
        { t: 'No se preocupe, ya verá cómo sale.', p: 0, r: '…', fb: 'No ofrece orientación ni seguimiento.' }
      ]}
    ]
  },
  {
    id: 'directora-plan', titulo: 'La directora revisa tu planificación',
    asignaturas: ['SPRL-306', 'SPRL-205', 'SPRL-305'],
    persona: { nombre: 'Lic. Martha', rol: 'Directora de la escuela', avatar: '👩🏻‍💼', pitch: 1.0 },
    contexto: 'La directora revisó tu planificación de la semana antes de una observación de clase.',
    pasos: [
      { dice: 'Su planificación no incluye adaptaciones para Nayeli, que tiene dislexia. ¿Por qué?', opciones: [
        { t: 'Tiene razón, lo omití. Voy a incluir una adaptación de grado 2: consignas leídas en voz alta, apoyo visual y evaluación oral.', p: 2, r: 'Muy bien, así cumple con la inclusión.', fb: 'Reconocer la omisión y proponer una adaptación pertinente es actuar con profesionalismo.' },
        { t: 'Ella puede hacer lo mismo que los demás.', p: 0, r: 'La normativa exige atender sus necesidades.', fb: 'Desconoce el derecho a adaptaciones curriculares de estudiantes con NEE.' },
        { t: 'Le voy a reducir los contenidos a la mitad.', p: 1, r: '¿Eso no sería una adaptación significativa?', fb: 'Para dislexia suele bastar una adaptación no significativa; reducir contenidos sin evaluación previa no se justifica.' }
      ]},
      { dice: 'También veo que la clase es solo exposición. ¿Cómo participarán los estudiantes?', opciones: [
        { t: 'Agregaré preguntas para activar conocimientos previos, trabajo en parejas y una evaluación rápida al cierre, siguiendo el ciclo ERCA.', p: 2, r: 'Eso responde al modelo constructivista del currículo.', fb: 'El currículo nacional promueve metodologías activas con anticipación, construcción y consolidación.' },
        { t: 'Los estudiantes aprenden mejor si escuchan en silencio.', p: 0, r: 'No es lo que plantea el currículo.', fb: 'Una clase solo expositiva limita la construcción del aprendizaje.' },
        { t: 'Les dejaré más tareas para la casa.', p: 1, r: 'La participación debe darse en clase.', fb: 'Las tareas no reemplazan las estrategias activas en el aula.' }
      ]},
      { dice: '¿Cómo sabrá si lograron el objetivo?', opciones: [
        { t: 'Con una evaluación formativa: preguntas orales registradas en una lista de cotejo con indicadores del objetivo.', p: 2, r: 'Perfecto, coherente con el objetivo.', fb: 'Técnica e instrumento coherentes con el objetivo y el tipo de evaluación.' },
        { t: 'Porque se los veo en la cara.', p: 0, r: 'Eso no es evidencia.', fb: 'La evaluación requiere evidencias e instrumentos.' },
        { t: 'Con la prueba trimestral.', p: 1, r: 'Eso es muy lejano para esta clase.', fb: 'La evaluación sumativa no informa a tiempo sobre el logro de una clase.' }
      ]}
    ]
  },
  {
    id: 'nayeli-prueba', titulo: 'Nayeli y la evaluación escrita',
    asignaturas: ['SPRL-405', 'SPRL-306', 'SPRL-304'],
    persona: { nombre: 'Nayeli', rol: 'Estudiante con dislexia', avatar: '👩🏻‍🦰', pitch: 1.45 },
    contexto: 'En la prueba escrita de Lengua, Nayeli dejó la mitad de las preguntas en blanco. En clase, oralmente, suele responder bien.',
    pasos: [
      { dice: 'Profe, no alcancé a leer todo… las letras se me mezclan.', opciones: [
        { t: 'Le digo que lo hizo bien en intentarlo y le pregunto oralmente las preguntas que dejó en blanco.', p: 2, r: '¡Esas sí me las sé! La respuesta es…', fb: 'La evaluación oral permite valorar el aprendizaje sin que la lectura sea una barrera.' },
        { t: 'Le pongo cero en las que dejó en blanco.', p: 0, r: '(Nayeli se desanima.)', fb: 'Se mide la dificultad lectora, no el aprendizaje evaluado.' },
        { t: 'Le doy 10 minutos más para que siga leyendo sola.', p: 1, r: 'Gracias… pero igual me cuesta.', fb: 'Más tiempo ayuda, pero no elimina la barrera de lectura.' }
      ]},
      { dice: '(Planificas la siguiente evaluación.)', opciones: [
        { t: 'Preparo una versión con letra grande, menos texto por página, consignas leídas en voz alta y opción de responder oralmente.', p: 2, r: 'Así sí puedo demostrar lo que sé.', fb: 'Es una adaptación de grado 2: cambia la forma de evaluar, no los aprendizajes evaluados.' },
        { t: 'Le hago una prueba con contenidos de un grado inferior.', p: 0, r: '(Nayeli siente que la tratan diferente.)', fb: 'Sería una adaptación significativa sin justificación: sus destrezas están conservadas.' },
        { t: 'Mantengo la misma prueba para ser justo con todos.', p: 0, r: '(Vuelve a obtener una nota baja.)', fb: 'La equidad exige ajustar la evaluación a las necesidades.' }
      ]},
      { dice: '(¿A quién informas?)', opciones: [
        { t: 'Registro la adaptación en mi planificación, informo a la familia y coordino con el DECE.', p: 2, r: 'La familia agradece el apoyo.', fb: 'Las adaptaciones se documentan y se coordinan con la familia y el DECE.' },
        { t: 'A nadie; es un ajuste mío.', p: 1, r: '(Otros docentes no aplican la adaptación.)', fb: 'Sin registro ni coordinación, la adaptación no tiene continuidad.' },
        { t: 'Le cuento a todo el curso para que entiendan.', p: 0, r: '(Nayeli se siente expuesta.)', fb: 'La información de NEE es confidencial.' }
      ]}
    ]
  },
  {
    id: 'proyecto-residuos', titulo: 'Diagnóstico para un proyecto educativo',
    asignaturas: ['SPRL-408', 'SPRL-103', 'SPRL-203'],
    persona: { nombre: 'Lic. Martha', rol: 'Directora de la escuela', avatar: '👩🏻‍💼', pitch: 1.0 },
    contexto: 'La directora te pide liderar un proyecto educativo de vinculación sobre el manejo de residuos en la escuela (programa de Educación Ambiental y Sostenibilidad).',
    pasos: [
      { dice: '¿Por dónde empezaría el proyecto?', opciones: [
        { t: 'Por un diagnóstico: observación del patio durante una semana y una encuesta corta a estudiantes y familias.', p: 2, r: 'Bien, así sabremos cuál es el problema real.', fb: 'Todo proyecto educativo parte de identificar necesidades con datos.' },
        { t: 'Compramos tachos de reciclaje de inmediato.', p: 1, r: '¿Y si el problema no son los tachos?', fb: 'Actuar sin diagnóstico puede resolver el problema equivocado.' },
        { t: 'Hacemos lo mismo que otra escuela.', p: 0, r: 'Cada contexto es diferente.', fb: 'Copiar un proyecto ignora las necesidades locales.' }
      ]},
      { dice: 'El diagnóstico muestra que el 60 % de los residuos son botellas plásticas del bar. ¿Cuál sería el objetivo?', opciones: [
        { t: 'Reducir en un 30 % las botellas plásticas desechadas en el patio en tres meses, con estudiantes, familias y el bar.', p: 2, r: 'Es un objetivo claro y medible.', fb: 'Un objetivo específico, medible y con plazo permite evaluar el proyecto.' },
        { t: 'Cuidar el medio ambiente.', p: 0, r: 'Es muy general, ¿cómo lo mediríamos?', fb: 'Un objetivo vago no se puede evaluar.' },
        { t: 'Prohibir las botellas en la escuela.', p: 1, r: 'Es una medida, no un objetivo.', fb: 'Confunde la acción con el objetivo.' }
      ]},
      { dice: '¿Cómo involucramos a la comunidad?', opciones: [
        { t: 'Con talleres para familias, un huerto escolar con compost y acuerdos con el bar; los estudiantes registran datos cada semana.', p: 2, r: 'Así el proyecto se vuelve sostenible.', fb: 'Participación de la comunidad y seguimiento con datos: vinculación con la sociedad.' },
        { t: 'Lo hacen solo los docentes para que salga rápido.', p: 0, r: 'Perderíamos su valor formativo.', fb: 'Sin participación estudiantil se pierde el aprendizaje.' },
        { t: 'Enviamos una circular a las familias.', p: 1, r: 'Ayuda, pero es poco.', fb: 'Informar no es lo mismo que involucrar.' }
      ]}
    ]
  }
];
