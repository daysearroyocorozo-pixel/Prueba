/* Prácticas por asignatura – Educación Básica (PAO 1–2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([

  /* ---------------- SPRL-101 Comunicación Oral y Escrita ---------------- */
  {
    id: 'asig-SPRL-101', cod: 'SPRL-101',
    titulo: 'Reunión de padres y comunicado escrito',
    asignaturas: ['SPRL-101'],
    persona: { nombre: 'Don Luis Santi', rol: 'Padre de familia y presidente del comité de 5.º EGB', avatar: '👨🏽', pitch: 0.9 },
    contexto: 'Eres docente tutor de 5.º EGB en una escuela fiscal del Puyo y debes conducir la primera reunión de padres del quimestre y luego enviar un comunicado escrito sobre la salida pedagógica al Parque Omaere.',
    objetivo: 'Aplicar técnicas de oratoria, comprensión auditiva, interacción oral y producción/edición de textos escritos funcionales.',
    pasos: [
      { dice: 'Buenas tardes, profe. Ya estamos casi todos, pero varios papás vienen del trabajo y tienen poco tiempo. ¿Cómo va a empezar?', opciones: [
          { t: 'Saludar, presentar el propósito y la agenda en tres puntos con lenguaje sencillo y tiempo estimado.', p: 2, r: 'Así da gusto, profe; sabemos a qué venimos y cuánto dura.', fb: 'La oratoria eficaz inicia con un saludo cordial, el propósito claro y una estructura anticipada (introducción, desarrollo, cierre).' },
          { t: 'Empezar directamente con los temas sin explicar la agenda.', p: 1, r: 'Bueno... vamos viendo entonces.', fb: 'Sin anticipar la estructura, la audiencia se desorienta y la comunicación pierde eficacia.' },
          { t: 'Leer textualmente el reglamento interno durante veinte minutos.', p: 0, r: 'Profe, con todo respeto, la gente se está durmiendo.', fb: 'Leer sin interacción ni adecuación al público contradice los principios de la expresión oral eficaz.' } ] },
      { dice: '(Una madre habla rápido y molesta) “Es que a mi hijo nunca le dicen nada y luego aparecen las tareas y uno no sabe…”. Don Luis lo mira esperando su respuesta.', opciones: [
          { t: 'Escuchar sin interrumpir, parafrasear su preocupación y acordar un canal claro para avisar las tareas.', p: 2, r: 'Eso mismo, profe, que nos avisen a tiempo. Gracias por entender.', fb: 'La comprensión auditiva y la escucha activa (parafrasear, verificar) son base de la interacción oral respetuosa.' },
          { t: 'Decirle que lo conversen al final de la reunión.', p: 1, r: 'La señora se queda inconforme, pero se calma un poco.', fb: 'Postergar puede ser válido, pero sin validar la emoción ni parafrasear, la madre no se siente escuchada.' },
          { t: 'Responder que los padres deben revisar los cuadernos y seguir con el tema.', p: 0, r: 'Varios padres se miran incómodos y murmuran.', fb: 'Una respuesta defensiva rompe la interacción comunicativa y deteriora la relación escuela-familia.' } ] },
      { dice: 'Profe, ¿nos puede mandar por escrito lo de la salida al Omaere? Así no hay confusiones.', opciones: [
          { t: 'Redactar un comunicado con fecha, destinatarios, asunto, detalles (hora, lugar, materiales), autorización y firma; revisarlo antes de enviar.', p: 2, r: 'Perfecto, así cualquiera lo entiende y firmamos la autorización.', fb: 'La producción de textos funcionales exige estructura, precisión y un proceso de redacción y edición (borrador, revisión, versión final).' },
          { t: 'Enviar un mensaje corto por WhatsApp sin detalles de horario.', p: 1, r: 'Ya, pero ¿a qué hora es y qué deben llevar los guaguas?', fb: 'Un texto incompleto genera ambigüedad; el escrito debe responder qué, cuándo, dónde y qué se necesita.' },
          { t: 'Decir que no hace falta escribir porque ya lo explicó oralmente.', p: 0, r: 'Así después nadie se acuerda, profe.', fb: 'La comunicación escrita deja constancia y respaldo; omitirla en salidas pedagógicas es una mala práctica.' } ] }
    ],
    vivo: {
      lugar: 'Aula de 5.º EGB, escuela fiscal del barrio México, Puyo', fondo: 'aula',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🗒️', t: 'Escribir la agenda de la reunión en la pizarra', p: 2, fb: 'Anticipar la estructura orienta a la audiencia.', efecto: { confianza: 8, tension: -6 } },
            { icono: '👀', t: 'Mantener contacto visual con todo el grupo', p: 2, fb: 'El lenguaje no verbal refuerza la oratoria.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📱', t: 'Revisar el celular mientras llegan los padres', p: 0, fb: 'Transmite desinterés y resta credibilidad.', efecto: { confianza: -10, tension: 8 } },
            { icono: '📖', t: 'Leer el reglamento completo en voz alta', p: 1, fb: 'La información es útil, pero sin síntesis cansa al público.', efecto: { confianza: -2, tension: 4 } }
          ],
          conceptos: [
            { n: 'Saludo y propósito claro', claves: ['bienvenid', 'buenas tardes', 'gracias por venir', 'proposito', 'objetivo de la reunion', 'vamos a tratar'] },
            { n: 'Agenda estructurada', claves: ['agenda', 'tres puntos', '3 puntos', 'primero', 'segundo', 'finalmente', 'orden del dia'] },
            { n: 'Respeto del tiempo', claves: ['minutos', 'tiempo', 'breve', 'puntual', 'media hora', 'no les quitare'] }
          ],
          evitar: [ { claves: ['callense', 'no me interrumpan'], fb: 'Un tono autoritario bloquea la interacción oral con las familias.' } ],
          modelo: 'Buenas tardes, gracias por venir. El propósito de hoy es tratar tres puntos: rendimiento, salida pedagógica y acuerdos; no les quitaré más de cuarenta minutos.'
        },
        {
          acciones: [
            { icono: '👂', t: 'Escuchar a la madre sin interrumpirla', p: 2, fb: 'La escucha activa es la base de la comprensión auditiva.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🔁', t: 'Parafrasear lo que la madre expresó', p: 2, fb: 'Parafrasear verifica la comprensión y valida al interlocutor.', efecto: { confianza: 8, tension: -6 } },
            { icono: '⏭️', t: 'Pasar al siguiente punto de la agenda', p: 0, fb: 'Ignorar la intervención aumenta el conflicto.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Escucha activa y parafraseo', claves: ['si entiendo bien', 'lo que usted dice', 'entiendo', 'le escucho', 'escuch', 'comprendo'] },
            { n: 'Validar la preocupación', claves: ['preocupacion', 'tiene razon', 'es valido', 'es importante', 'justo', 'gracias por decirlo'] },
            { n: 'Acuerdo de comunicación', claves: ['canal', 'agenda escolar', 'cuaderno', 'aviso', 'cada viernes', 'grupo oficial', 'comunicar'] }
          ],
          evitar: [ { claves: ['es su culpa', 'usted no revisa'], fb: 'Culpabilizar a la familia rompe la comunicación asertiva.' } ],
          modelo: 'Si entiendo bien, a usted le preocupa enterarse tarde de las tareas, y es muy válido. Acordemos que cada viernes enviaré las tareas por la agenda escolar.'
        },
        {
          acciones: [
            { icono: '✍️', t: 'Redactar un borrador con estructura de comunicado', p: 2, fb: 'Planificar el texto asegura que tenga todas sus partes.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔍', t: 'Revisar ortografía, datos y claridad antes de enviar', p: 2, fb: 'La edición es parte del proceso de escritura.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💬', t: 'Enviar un audio rápido sin datos concretos', p: 1, fb: 'Es útil, pero no deja constancia escrita completa.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🙅', t: 'Negarse a enviar algo por escrito', p: 0, fb: 'Se pierde respaldo y claridad de la información.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Estructura del comunicado', claves: ['fecha', 'asunto', 'destinatario', 'estimados padres', 'firma', 'atentamente'] },
            { n: 'Información precisa', claves: ['hora', 'lugar', 'omaere', 'materiales', 'lunch', 'autorizacion', 'salida'] },
            { n: 'Revisión y edición', claves: ['revis', 'borrador', 'ortografia', 'corregir', 'claro', 'edit'] }
          ],
          evitar: [ { claves: ['no hace falta escribir', 'ya lo dije'], fb: 'La comunicación escrita es necesaria para respaldar decisiones.' } ],
          modelo: 'Redactaré un comunicado con fecha, asunto, hora y lugar de la salida al Omaere, materiales y la autorización para firmar; lo revisaré antes de enviarlo.'
        }
      ]
    }
  },

  /* ---------------- SPRL-102 Cosmovivencia Andina e Interculturalidad ---------------- */
  {
    id: 'asig-SPRL-102', cod: 'SPRL-102',
    titulo: 'Burla por hablar kichwa',
    asignaturas: ['SPRL-102'],
    persona: { nombre: 'Don Segundo Guamán', rol: 'Padre kichwa de Chimborazo residente en Puyo', avatar: '👨🏽‍🌾', pitch: 0.85 },
    contexto: 'En 3.º EGB, unos compañeros se burlaron de Nina por saludar en kichwa. Su padre llega dolido a hablar contigo; debes responder desde la interculturalidad y proponer cómo integrar saberes ancestrales en el aula.',
    objetivo: 'Aplicar los principios de la interculturalidad, el respeto a la diversidad cultural y lingüística y la integración de saberes ancestrales andinos en el currículo.',
    pasos: [
      { dice: 'Profesor, mi Nina ya no quiere hablar kichwa. Dice que se ríen de ella. Nosotros somos runas, ¿por qué tiene que avergonzarse?', opciones: [
          { t: 'Agradecer que haya venido, reconocer el daño y afirmar que el kichwa es un idioma oficial de relación intercultural que la escuela debe valorar.', p: 2, r: 'Gracias, profesor. Eso necesitaba escuchar.', fb: 'La Constitución reconoce el kichwa y el shuar como idiomas oficiales de relación intercultural; la escuela debe proteger la identidad cultural.' },
          { t: 'Decir que son cosas de niños y que ya pasará.', p: 1, r: 'No es tan sencillo, profesor; a mi hija le duele.', fb: 'Minimizar la burla invisibiliza la discriminación aunque no haya mala intención.' },
          { t: 'Sugerir que en la escuela mejor hable solo español para evitar problemas.', p: 0, r: '(Don Segundo baja la mirada) Eso mismo nos decían a nosotros de niños.', fb: 'Pedir que abandone su lengua vulnera el derecho a la identidad y reproduce la discriminación.' } ] },
      { dice: '¿Y qué va a hacer con los niños que se burlaron? No quiero que solo los castiguen.', opciones: [
          { t: 'Trabajar con todo el grupo actividades de diálogo intercultural: saludos en kichwa, shuar y español, historias familiares y acuerdos de respeto.', p: 2, r: 'Así sí, que aprendan a conocernos.', fb: 'Las estrategias didácticas interculturales transforman la convivencia mediante el diálogo, la reciprocidad y el reconocimiento mutuo.' },
          { t: 'Hablar solo con los niños que se burlaron para que pidan disculpas.', p: 1, r: 'Está bien, pero el resto también debería aprender.', fb: 'La reparación es útil, pero la interculturalidad se construye con todo el grupo.' },
          { t: 'Poner una sanción y no tocar más el tema.', p: 0, r: 'Eso no cambia cómo piensan, profesor.', fb: 'El castigo aislado no desarrolla el respeto a la diversidad ni previene nuevas burlas.' } ] },
      { dice: 'Yo sé de la chakra, del calendario de siembra, de la minga… pero eso no está en los libros, ¿verdad?', opciones: [
          { t: 'Invitarle como sabio comunitario a compartir la minga, el ayni y el calendario agrícola andino, vinculándolo con Ciencias y Sociales.', p: 2, r: '(Sonríe) Sería un honor, profesor. Nina va a estar orgullosa.', fb: 'Integrar saberes ancestrales en el currículo fortalece la identidad cultural y contextualiza el aprendizaje.' },
          { t: 'Decir que sería interesante, pero que el programa no deja tiempo.', p: 1, r: 'Ya veo... cuando tenga tiempo me avisa.', fb: 'La flexibilidad curricular permite contextualizar contenidos con saberes locales.' },
          { t: 'Explicar que solo se enseña conocimiento científico de los textos.', p: 0, r: 'Entonces lo nuestro no vale, ¿no?', fb: 'Jerarquizar saberes contradice la interculturalidad y el diálogo de saberes.' } ] }
    ],
    vivo: {
      lugar: 'Sala de atención a padres, escuela fiscal de Shell, Pastaza', fondo: 'oficina',
      inicio: { confianza: 35, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '🤝', t: 'Recibirle con un saludo cordial, incluso en kichwa', p: 2, fb: 'El saludo en su lengua expresa reconocimiento.', efecto: { confianza: 12, tension: -8 } },
            { icono: '🪑', t: 'Ofrecerle asiento y escucharle con calma', p: 2, fb: 'La escucha respetuosa abre el diálogo intercultural.', efecto: { confianza: 8, tension: -6 } },
            { icono: '⌚', t: 'Atenderle de pie porque tiene clase', p: 0, fb: 'Comunica poca importancia al reclamo.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Reconocer el daño', claves: ['lamento', 'siento mucho', 'no esta bien', 'discrimin', 'burla', 'no debio pasar'] },
            { n: 'Valorar la lengua kichwa', claves: ['kichwa', 'idioma', 'lengua', 'orgullo', 'identidad', 'valios'] },
            { n: 'Compromiso de la escuela', claves: ['me comprometo', 'vamos a trabajar', 'respeto', 'proteger', 'acompan', 'no se repita'] }
          ],
          evitar: [ { claves: ['solo espanol', 'cosas de ninos'], fb: 'Minimizar o pedir abandonar la lengua refuerza la discriminación.' } ],
          modelo: 'Lamento mucho lo que pasó; burlarse de una niña por hablar kichwa es discriminación. Su lengua es parte de su identidad y me comprometo a que en el aula se respete y valore.'
        },
        {
          acciones: [
            { icono: '🗣️', t: 'Planificar una ronda de saludos en kichwa, shuar y español', p: 2, fb: 'Visibiliza la diversidad lingüística del aula.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📜', t: 'Construir acuerdos de respeto con el grupo', p: 2, fb: 'Los acuerdos participativos sostienen la convivencia.', efecto: { confianza: 6, tension: -5 } },
            { icono: '🚫', t: 'Sancionar sin conversar con el grupo', p: 0, fb: 'No transforma actitudes ni promueve la interculturalidad.', efecto: { confianza: -8, tension: 6 } },
            { icono: '🗨️', t: 'Pedir disculpas solo a los implicados', p: 1, fb: 'Repara parcialmente, pero no involucra a todos.', efecto: { confianza: 2, tension: -1 } }
          ],
          conceptos: [
            { n: 'Diálogo intercultural', claves: ['dialogo', 'intercultural', 'conocer', 'compartir', 'otras culturas', 'convivencia'] },
            { n: 'Estrategias con todo el grupo', claves: ['saludos', 'shuar', 'historias familiares', 'actividad', 'todo el grupo', 'todos los ninos'] },
            { n: 'Respeto a la diversidad', claves: ['respeto', 'diversidad', 'igualdad', 'diferencia', 'valorar', 'acuerdo'] }
          ],
          evitar: [ { claves: ['castigo ejemplar', 'que se aguanten'], fb: 'El castigo aislado no educa en interculturalidad.' } ],
          modelo: 'Haremos con todo el grupo una actividad de saludos en kichwa, shuar y español y compartiremos historias familiares, para construir acuerdos de respeto a la diversidad.'
        },
        {
          acciones: [
            { icono: '🌽', t: 'Invitar al padre a explicar la chakra y la minga en clase', p: 2, fb: 'Reconoce al padre como portador de saberes.', efecto: { confianza: 12, tension: -8 } },
            { icono: '🗓️', t: 'Vincular el calendario agrícola andino con Ciencias', p: 2, fb: 'Integra saberes ancestrales al currículo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📕', t: 'Limitarse al texto escolar', p: 0, fb: 'Excluye los saberes del contexto.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Saberes ancestrales', claves: ['saberes ancestrales', 'chakra', 'minga', 'ayni', 'pachamama', 'calendario agricola', 'reciprocidad'] },
            { n: 'Integración curricular', claves: ['curriculo', 'ciencias', 'sociales', 'vincular', 'integrar', 'clase'] },
            { n: 'Participación de la familia', claves: ['invitar', 'invito', 'sabio', 'comunidad', 'familia', 'participe'] }
          ],
          evitar: [ { claves: ['no es ciencia', 'eso no sirve'], fb: 'Desvalorizar saberes ancestrales contradice el diálogo de saberes.' } ],
          modelo: 'Le invito a venir como sabio de la comunidad a explicar la chakra, la minga y el ayni; lo vincularé con Ciencias Naturales y el calendario agrícola andino.'
        }
      ]
    }
  },

  /* ---------------- SPRL-103 Metodología de la Investigación ---------------- */
  {
    id: 'asig-SPRL-103', cod: 'SPRL-103',
    titulo: 'Ausentismo de los lunes',
    asignaturas: ['SPRL-103'],
    persona: { nombre: 'Mgs. Rosa Villacrés', rol: 'Directora de la escuela', avatar: '👩🏽‍💼', pitch: 1.05 },
    contexto: 'La directora de una escuela de Tarqui (Pastaza) nota que los lunes faltan muchos estudiantes de 6.º y 7.º EGB y te pide diseñar una pequeña investigación educativa para entender el problema.',
    objetivo: 'Formular un problema y objetivos de investigación, elegir enfoque y técnicas de recolección, e interpretar resultados con rigor ético.',
    pasos: [
      { dice: 'Quiero saber qué pasa con la asistencia de los lunes. ¿Cómo plantearía el problema?', opciones: [
          { t: 'Formular una pregunta delimitada: ¿qué factores se asocian al ausentismo de los lunes en 6.º y 7.º EGB este quimestre?, con un objetivo general medible.', p: 2, r: 'Muy claro. Así sabemos qué buscamos y en quiénes.', fb: 'Un problema de investigación bien formulado es delimitado en población, tiempo y variables, y orienta los objetivos.' },
          { t: 'Investigar por qué los niños no quieren venir a la escuela.', p: 1, r: 'Es demasiado amplio, ¿no cree?', fb: 'El problema es pertinente pero no está delimitado.' },
          { t: 'Asumir que es culpa de los padres y enviar una circular.', p: 0, r: 'Eso no es investigar, es suponer.', fb: 'Partir de conclusiones previas sin datos contradice el método científico.' } ] },
      { dice: '¿Y cómo recogemos la información? Tenemos poco tiempo.', opciones: [
          { t: 'Usar un enfoque mixto: revisar registros de asistencia, aplicar una encuesta breve a familias y entrevistar a algunos estudiantes, con consentimiento informado.', p: 2, r: 'Bien pensado; datos numéricos y también las razones.', fb: 'El enfoque mixto combina datos cuantitativos y cualitativos; el consentimiento informado es un requisito ético con menores.' },
          { t: 'Solo contar las faltas en el registro.', p: 1, r: 'Sabremos cuántos, pero no por qué.', fb: 'Los datos cuantitativos describen la magnitud, pero no explican causas.' },
          { t: 'Preguntar en el recreo a los niños sin avisar a las familias.', p: 0, r: 'Eso puede traernos problemas con los padres.', fb: 'Recolectar datos de menores sin consentimiento ni instrumento es antiético y poco válido.' } ] },
      { dice: 'Ya tenemos los datos: 40 % de las familias trabaja en ferias de fin de semana fuera del Puyo y regresa el lunes. ¿Qué concluimos?', opciones: [
          { t: 'Interpretar con prudencia: es un factor asociado en esta muestra, no la única causa; presentar tablas y gráficos y proponer acciones con las familias.', p: 2, r: 'Excelente, eso lo puedo presentar a la junta.', fb: 'Interpretar resultados exige no generalizar más allá de la muestra y vincular hallazgos con propuestas de mejora.' },
          { t: 'Concluir que el problema son las ferias.', p: 1, r: '¿Y el otro 60 %?', fb: 'Se identifica un hallazgo, pero se ignora el resto de los datos.' },
          { t: 'Decir que los datos no sirven y dejar el estudio.', p: 0, r: 'Entonces perdimos el tiempo.', fb: 'Abandonar sin análisis desperdicia evidencia útil para mejorar.' } ] }
    ],
    vivo: {
      lugar: 'Dirección de una escuela fiscal en Tarqui, Pastaza', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '📋', t: 'Revisar el registro de asistencia del quimestre', p: 2, fb: 'Partir de datos reales delimita el problema.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🎯', t: 'Escribir un objetivo general medible', p: 2, fb: 'El objetivo guía todo el diseño.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📨', t: 'Enviar una circular culpando a las familias', p: 0, fb: 'Es suponer, no investigar.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Pregunta de investigación', claves: ['pregunta', 'problema', 'que factores', 'por que', 'ausentismo', 'inasistencia'] },
            { n: 'Delimitación', claves: ['sexto', 'septimo', '6', '7', 'quimestre', 'lunes', 'delimit'] },
            { n: 'Objetivo medible', claves: ['objetivo', 'identificar', 'determinar', 'analizar', 'describir', 'hipotesis'] }
          ],
          evitar: [ { claves: ['culpa de los padres', 'ya se la causa'], fb: 'Las conclusiones previas sesgan la investigación.' } ],
          modelo: 'La pregunta sería: ¿qué factores se asocian al ausentismo de los lunes en sexto y séptimo este quimestre? El objetivo es identificar y analizar esos factores.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Diseñar una encuesta breve para las familias', p: 2, fb: 'Instrumento cuantitativo adecuado.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎙️', t: 'Preparar una guía de entrevista para estudiantes', p: 2, fb: 'Aporta datos cualitativos sobre las razones.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✅', t: 'Enviar el consentimiento informado a las familias', p: 2, fb: 'Requisito ético con menores de edad.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏃', t: 'Interrogar a los niños en el recreo', p: 0, fb: 'Sin consentimiento ni instrumento válido.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Enfoque mixto', claves: ['mixto', 'cuantitativ', 'cualitativ', 'numeros', 'razones', 'enfoque'] },
            { n: 'Técnicas e instrumentos', claves: ['encuesta', 'entrevista', 'cuestionario', 'registro', 'observacion', 'instrumento'] },
            { n: 'Ética de la investigación', claves: ['consentimiento', 'confidencial', 'anonim', 'autorizacion', 'voluntari', 'etica'] }
          ],
          evitar: [ { claves: ['sin avisar', 'no hace falta permiso'], fb: 'Investigar con menores exige consentimiento informado.' } ],
          modelo: 'Usaré un enfoque mixto: revisaré el registro, aplicaré una encuesta a las familias y entrevistas a algunos estudiantes, siempre con consentimiento informado y confidencialidad.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Organizar los resultados en tablas y gráficos', p: 2, fb: 'Facilita la presentación e interpretación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '💡', t: 'Proponer acciones de mejora con las familias', p: 2, fb: 'La investigación educativa busca mejorar la práctica.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🗑️', t: 'Descartar los datos que no coinciden', p: 0, fb: 'Manipular datos invalida el estudio.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Interpretación prudente', claves: ['factor', 'asociado', 'no es la unica', 'esta muestra', 'no generalizar', 'cuarenta', '40'] },
            { n: 'Presentación de resultados', claves: ['tabla', 'grafico', 'porcentaje', 'resultados', 'informe', 'presentar'] },
            { n: 'Propuesta de mejora', claves: ['propuesta', 'mejora', 'acciones', 'familias', 'plan', 'recuperacion'] }
          ],
          evitar: [ { claves: ['la unica causa', 'todos faltan por'], fb: 'Generalizar más allá de los datos es un error de interpretación.' } ],
          modelo: 'El 40 % de las familias trabaja en ferias de fin de semana: es un factor asociado en esta muestra, no la única causa. Lo presentaré en tablas y gráficos con una propuesta de mejora.'
        }
      ]
    }
  },

  /* ---------------- SPRL-104 Psicología General ---------------- */
  {
    id: 'asig-SPRL-104', cod: 'SPRL-104',
    titulo: 'Arrebato de ira en el aula',
    asignaturas: ['SPRL-104'],
    persona: { nombre: 'Mateo', rol: 'Estudiante de 7.º EGB, 11 años', avatar: '👦🏽', pitch: 1.2 },
    contexto: 'Mateo golpea la mesa y grita a un compañero que le quitó su cuaderno. Debes contener la situación, mediar el conflicto y coordinar con el DECE una intervención psicoeducativa.',
    objetivo: 'Aplicar inteligencia emocional, resolución de conflictos, observación como técnica de evaluación e intervención psicoeducativa con apoyo del DECE.',
    pasos: [
      { dice: '¡Déjenme en paz! ¡Siempre me molestan y nadie hace nada! (golpea la mesa)', opciones: [
          { t: 'Acercarse con voz calmada, nombrar la emoción y ofrecerle un espacio para respirar antes de hablar.', p: 2, r: '(Respira agitado) …Está bien, profe.', fb: 'Regular primero la emoción (validarla y dar espacio) es base de la inteligencia emocional y previene la escalada.' },
          { t: 'Pedirle firmemente que se siente y siga trabajando.', p: 1, r: '(Se sienta, pero sigue llorando de rabia)', fb: 'Se controla la conducta, pero no se atiende la emoción de fondo.' },
          { t: 'Gritarle delante de todos y mandarlo a inspección.', p: 0, r: '¡Ve! ¡Siempre es mi culpa!', fb: 'La respuesta punitiva en caliente intensifica la emoción y daña el vínculo.' } ] },
      { dice: '(Ya más tranquilo) Es que Andrés siempre me quita mis cosas y se ríe.', opciones: [
          { t: 'Mediar entre ambos: que cada uno exprese lo que pasó y cómo se sintió, y construir juntos un acuerdo concreto.', p: 2, r: 'Andrés: “Perdón, era broma”. Mateo: “Ya, pero no lo hagas más”.', fb: 'La mediación con turnos de palabra, expresión de sentimientos y acuerdos desarrolla habilidades de resolución de conflictos.' },
          { t: 'Hacer que Andrés pida disculpas rápidamente.', p: 1, r: 'Andrés dice “perdón” sin mirarlo.', fb: 'La disculpa forzada no garantiza comprensión ni acuerdos.' },
          { t: 'Decirle que no exagere y que aprenda a aguantar bromas.', p: 0, r: '(Mateo se cierra y no habla más)', fb: 'Invalidar la emoción afecta la autoestima y la confianza.' } ] },
      { dice: '(La psicóloga del DECE se acerca) “Profe, ¿qué ha observado de Mateo estas semanas?”', opciones: [
          { t: 'Compartir registros anecdóticos objetivos (fechas, situaciones, frecuencia) y acordar un plan de intervención psicoeducativa con la familia, sin diagnosticar.', p: 2, r: 'Psicóloga: “Perfecto, con esto podemos planificar el acompañamiento”.', fb: 'La observación sistemática es una técnica de evaluación psicológica; el diagnóstico corresponde al profesional del DECE.' },
          { t: 'Contar de memoria que “siempre se porta mal”.', p: 1, r: 'Psicóloga: “Necesitaría datos más concretos”.', fb: 'Las impresiones generales sin registro son poco útiles para intervenir.' },
          { t: 'Decir que seguro tiene un trastorno y que lo cambien de paralelo.', p: 0, r: 'Psicóloga: “No podemos etiquetarlo sin evaluación”.', fb: 'El docente no diagnostica; etiquetar afecta el bienestar y la salud mental del niño.' } ] }
    ],
    vivo: {
      lugar: 'Aula de 7.º EGB, unidad educativa en Puyo', fondo: 'aula',
      inicio: { confianza: 40, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🧘', t: 'Invitarle a respirar profundo junto a usted', p: 2, fb: 'La respiración regula la activación emocional.', efecto: { confianza: 10, tension: -12 } },
            { icono: '🚪', t: 'Ofrecer un rincón tranquilo para calmarse', p: 2, fb: 'El espacio seguro evita la exposición ante el grupo.', efecto: { confianza: 8, tension: -8 } },
            { icono: '📢', t: 'Gritarle frente a la clase', p: 0, fb: 'Escala el conflicto.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Nombrar la emoción', claves: ['enojado', 'molesto', 'rabia', 'te sientes', 'emocion', 'frustr'] },
            { n: 'Calma y regulación', claves: ['respira', 'calma', 'tranquil', 'despacio', 'un momento', 'rincon'] },
            { n: 'Disponibilidad para escuchar', claves: ['te escucho', 'conversemos', 'cuentame', 'estoy aqui', 'quiero entender', 'hablar'] }
          ],
          evitar: [ { claves: ['callate', 'castigado'], fb: 'Las respuestas punitivas en crisis intensifican la emoción.' } ],
          modelo: 'Mateo, veo que estás muy enojado. Respiremos juntos un momento en el rincón tranquilo y luego te escucho.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Dar turnos de palabra a Mateo y Andrés', p: 2, fb: 'Garantiza una mediación justa.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🤲', t: 'Construir con ellos un acuerdo concreto', p: 2, fb: 'Los acuerdos propios se cumplen mejor.', efecto: { confianza: 6, tension: -6 } },
            { icono: '🙄', t: 'Decirle que aguante las bromas', p: 0, fb: 'Invalida y desprotege al estudiante.', efecto: { confianza: -12, tension: 8 } },
            { icono: '🗯️', t: 'Exigir una disculpa inmediata a Andrés', p: 1, fb: 'Disculpa sin reflexión.', efecto: { confianza: 1, tension: -2 } }
          ],
          conceptos: [
            { n: 'Escucha de ambas partes', claves: ['cada uno', 'turno', 'ambos', 'escuchar a los dos', 'que paso', 'version'] },
            { n: 'Expresión de sentimientos', claves: ['como te sentiste', 'sentimiento', 'senti', 'empatia', 'ponerse en', 'lugar del otro'] },
            { n: 'Acuerdo de resolución', claves: ['acuerdo', 'compromiso', 'solucion', 'reparar', 'devolver', 'la proxima vez'] }
          ],
          evitar: [ { claves: ['no exageres', 'aguanta'], fb: 'Minimizar el malestar daña la autoestima.' } ],
          modelo: 'Vamos a escuchar a cada uno: qué pasó y cómo se sintieron. Luego construimos juntos un acuerdo para que no se repita.'
        },
        {
          acciones: [
            { icono: '📓', t: 'Entregar el registro anecdótico con fechas', p: 2, fb: 'La observación sistemática aporta evidencia.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👪', t: 'Proponer reunión conjunta con la familia', p: 2, fb: 'La intervención psicoeducativa involucra a la familia.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🏷️', t: 'Etiquetar a Mateo con un trastorno', p: 0, fb: 'El docente no diagnostica.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Observación objetiva', claves: ['registro', 'anecdotic', 'observ', 'fechas', 'frecuencia', 'situaciones'] },
            { n: 'Intervención psicoeducativa', claves: ['plan', 'intervencion', 'acompanamiento', 'habilidades socioemocionales', 'seguimiento', 'estrategias'] },
            { n: 'Trabajo con DECE y familia', claves: ['dece', 'psicolog', 'familia', 'representante', 'coordinar', 'reunion'] }
          ],
          evitar: [ { claves: ['tiene un trastorno', 'esta enfermo'], fb: 'Etiquetar sin evaluación profesional es inadecuado y estigmatiza.' } ],
          modelo: 'He llevado un registro anecdótico con fechas y situaciones de enojo. Propongo coordinar con el DECE y la familia un plan de intervención psicoeducativa sin etiquetarlo.'
        }
      ]
    }
  },

  /* ---------------- SPRL-105 Pedagogía General ---------------- */
  {
    id: 'asig-SPRL-105', cod: 'SPRL-105',
    titulo: 'Acompañamiento pedagógico al aula',
    asignaturas: ['SPRL-105'],
    persona: { nombre: 'Lic. Jorge Tanguila', rol: 'Subdirector, acompañamiento pedagógico', avatar: '👨🏽‍🏫', pitch: 0.95 },
    contexto: 'El subdirector observará tu clase de 4.º EGB, un grupo numeroso y ruidoso. Antes, durante y después de la clase te pide sustentar tu planificación, cómo gestionas el clima del aula y cómo evalúas.',
    objetivo: 'Aplicar fundamentos de planificación de clases, gestión del aula y del clima escolar, y evaluación con retroalimentación para la mejora.',
    pasos: [
      { dice: 'Antes de entrar, cuénteme: ¿cómo está organizada su clase de hoy?', opciones: [
          { t: 'Explicar el objetivo de aprendizaje y los momentos de anticipación, construcción y consolidación con sus actividades y recursos.', p: 2, r: 'Muy bien estructurada; se nota la intención pedagógica.', fb: 'Una planificación de clase coherente articula objetivo, momentos didácticos, actividades, recursos y evaluación.' },
          { t: 'Decir que seguirá las páginas del texto escolar.', p: 1, r: '¿Y cuál es el objetivo para estos niños?', fb: 'El texto es un recurso, no reemplaza la planificación.' },
          { t: 'Responder que improvisará según cómo estén los chicos.', p: 0, r: 'Eso me preocupa, profe.', fb: 'La improvisación sin planificación compromete el logro de aprendizajes.' } ] },
      { dice: '(En plena clase, varios niños conversan y se levantan.) El subdirector toma nota.', opciones: [
          { t: 'Recordar los acuerdos de convivencia construidos con el grupo, usar una señal de atención y reconocer a quienes los cumplen.', p: 2, r: '(El grupo se ordena) El subdirector asiente.', fb: 'La gestión del aula se basa en normas co-construidas, rutinas y refuerzo positivo, que generan un clima escolar seguro.' },
          { t: 'Subir la voz hasta que se callen.', p: 1, r: 'Se calman unos minutos, luego vuelve el ruido.', fb: 'Funciona momentáneamente, pero no construye autorregulación.' },
          { t: 'Amenazar con bajar la nota a todos.', p: 0, r: 'Los niños se asustan y el clima se tensa.', fb: 'Usar la calificación como castigo distorsiona la evaluación y daña el clima escolar.' } ] },
      { dice: 'Al terminar: ¿cómo sabe usted si los niños aprendieron hoy?', opciones: [
          { t: 'Mostrar el ticket de salida con una lista de cotejo, describir qué lograron y qué reforzará, y dar retroalimentación individual.', p: 2, r: 'Excelente; evaluación al servicio del aprendizaje.', fb: 'La evaluación formativa con instrumentos y retroalimentación orienta la mejora de la enseñanza.' },
          { t: 'Decir que vio que la mayoría participó.', p: 1, r: 'La participación ayuda, pero ¿qué evidencia tiene?', fb: 'La percepción general no sustituye la evidencia de aprendizaje.' },
          { t: 'Indicar que lo sabrá en el examen del quimestre.', p: 0, r: 'Entonces será tarde para ayudarles.', fb: 'Evaluar solo al final impide retroalimentar a tiempo.' } ] }
    ],
    vivo: {
      lugar: 'Aula de 4.º EGB, escuela fiscal mixta del Puyo', fondo: 'aula',
      inicio: { confianza: 50, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📑', t: 'Mostrar la planificación de la clase', p: 2, fb: 'Evidencia la intención pedagógica.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🎯', t: 'Escribir el objetivo de la clase en la pizarra', p: 2, fb: 'Comunica la meta a los estudiantes.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🤷', t: 'Decir que improvisará', p: 0, fb: 'Falta de planificación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Objetivo de aprendizaje', claves: ['objetivo', 'destreza', 'que los ninos', 'aprendan', 'meta', 'proposito'] },
            { n: 'Momentos de la clase', claves: ['anticipacion', 'construccion', 'consolidacion', 'inicio', 'desarrollo', 'cierre'] },
            { n: 'Actividades y recursos', claves: ['actividad', 'recurso', 'material', 'trabajo en grupo', 'ejercicio', 'lamina'] }
          ],
          evitar: [ { claves: ['improvisar', 'a ver que sale'], fb: 'La improvisación compromete los aprendizajes.' } ],
          modelo: 'El objetivo es que los niños identifiquen las partes de la planta. Inicio con una anticipación, luego construcción en grupos con material concreto y cierro con una consolidación.'
        },
        {
          acciones: [
            { icono: '✋', t: 'Usar la señal de atención acordada', p: 2, fb: 'Las rutinas gestionan el aula sin gritar.', efecto: { confianza: 8, tension: -8 } },
            { icono: '⭐', t: 'Reconocer en voz alta a quienes cumplen los acuerdos', p: 2, fb: 'El refuerzo positivo mejora el clima.', efecto: { confianza: 6, tension: -6 } },
            { icono: '📉', t: 'Amenazar con bajar la nota', p: 0, fb: 'La nota no es herramienta disciplinaria.', efecto: { confianza: -10, tension: 12 } },
            { icono: '🔊', t: 'Elevar la voz para imponerse', p: 1, fb: 'Efecto breve, sin autorregulación.', efecto: { confianza: -2, tension: 4 } }
          ],
          conceptos: [
            { n: 'Acuerdos de convivencia', claves: ['acuerdo', 'normas', 'convivencia', 'lo que acordamos', 'reglas del aula', 'recordemos'] },
            { n: 'Refuerzo positivo', claves: ['felicito', 'muy bien', 'reconozco', 'gracias a', 'refuerzo', 'excelente'] },
            { n: 'Clima escolar', claves: ['clima', 'respeto', 'escucharnos', 'ambiente', 'seguro', 'atencion'] }
          ],
          evitar: [ { claves: ['les bajo la nota', 'cero para todos'], fb: 'Usar la nota como castigo es inadecuado.' } ],
          modelo: 'Recordemos nuestros acuerdos de convivencia: mano arriba para hablar. Felicito a la mesa azul porque nos está escuchando con respeto.'
        },
        {
          acciones: [
            { icono: '🎟️', t: 'Aplicar un ticket de salida', p: 2, fb: 'Recoge evidencia inmediata del aprendizaje.', efecto: { confianza: 8, tension: -5 } },
            { icono: '✅', t: 'Registrar logros en una lista de cotejo', p: 2, fb: 'Sistematiza la evaluación formativa.', efecto: { confianza: 6, tension: -4 } },
            { icono: '⏳', t: 'Esperar al examen quimestral', p: 0, fb: 'Impide retroalimentar a tiempo.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Evidencia de aprendizaje', claves: ['ticket de salida', 'lista de cotejo', 'evidencia', 'instrumento', 'rubrica', 'registro'] },
            { n: 'Retroalimentación', claves: ['retroaliment', 'devolucion', 'comentario', 'que lograron', 'como mejorar', 'individual'] },
            { n: 'Mejora de la enseñanza', claves: ['reforzar', 'refuerzo', 'ajustar', 'mejora', 'proxima clase', 'replanificar'] }
          ],
          evitar: [ { claves: ['en el examen veremos', 'solo la nota'], fb: 'La evaluación debe ser continua y formativa.' } ],
          modelo: 'Apliqué un ticket de salida y registré los logros en una lista de cotejo; daré retroalimentación individual y reforzaré la próxima clase lo que no se logró.'
        }
      ]
    }
  },

  /* ---------------- SPRL-109 Teorías del Aprendizaje ---------------- */
  {
    id: 'asig-SPRL-109', cod: 'SPRL-109',
    titulo: 'Debate en la sala de profesores',
    asignaturas: ['SPRL-109'],
    persona: { nombre: 'Lic. Hernán Cárdenas', rol: 'Docente con 30 años de experiencia', avatar: '👴🏽', pitch: 0.8 },
    contexto: 'Un colega veterano sostiene que “a los niños solo se les enseña con premios, castigos y repetición”. Debes argumentar con teorías del aprendizaje cómo mejorar las clases de 6.º EGB.',
    objetivo: 'Explicar y aplicar conductismo, constructivismo, aprendizaje social, procesos metacognitivos y motivación en la práctica docente.',
    pasos: [
      { dice: 'Mire, joven: les pongo una carita feliz si responden bien y les quito el recreo si no. Así aprenden. Eso es lo que funciona.', opciones: [
          { t: 'Reconocer que el refuerzo (Skinner) tiene utilidad, pero explicar que el constructivismo de Piaget plantea que el niño construye el conocimiento activamente a partir de lo que ya sabe.', p: 2, r: 'Hmm… o sea que no todo es premio y castigo.', fb: 'El conductismo explica conductas por refuerzo; el constructivismo enfatiza la construcción activa a partir de esquemas previos.' },
          { t: 'Decir que el conductismo está totalmente obsoleto.', p: 1, r: '¡Pues a mí me ha funcionado treinta años!', fb: 'Descalificar una teoría sin matices cierra el diálogo; el refuerzo positivo aún tiene aplicaciones.' },
          { t: 'Darle la razón: quitar el recreo es lo mejor.', p: 0, r: 'Ve, ya nos entendemos.', fb: 'Retirar el recreo como castigo afecta el desarrollo integral y no genera aprendizaje significativo.' } ] },
      { dice: '¿Y qué hago con los que no entienden fracciones aunque les explique diez veces?', opciones: [
          { t: 'Aplicar la zona de desarrollo próximo de Vygotsky: andamiaje con material concreto, trabajo en parejas con un compañero más hábil y modelado (Bandura).', p: 2, r: 'Interesante, lo de las parejas no lo había pensado.', fb: 'Vygotsky destaca la mediación social y el andamiaje; Bandura, el aprendizaje por observación de modelos.' },
          { t: 'Explicar más despacio en la pizarra.', p: 1, r: 'Ya lo hago y no resulta.', fb: 'Repetir el mismo método no atiende las diferencias individuales.' },
          { t: 'Mandar cien ejercicios iguales de tarea.', p: 0, r: 'Eso es lo que hago…', fb: 'La repetición mecánica sin comprensión no favorece el aprendizaje significativo.' } ] },
      { dice: 'Bueno, ¿y cómo hago para que estudien solos y quieran aprender?', opciones: [
          { t: 'Desarrollar metacognición con preguntas como “¿qué aprendí?, ¿qué me costó?”, autoevaluación, y fomentar motivación intrínseca conectando con su contexto amazónico.', p: 2, r: 'Lo probaré con mi grupo la próxima semana.', fb: 'La metacognición (planificar, monitorear y evaluar el propio aprendizaje) y la motivación intrínseca favorecen la autorregulación.' },
          { t: 'Darles más premios para motivarlos.', p: 1, r: 'Eso ya lo hago.', fb: 'La motivación extrínseca ayuda a corto plazo, pero no desarrolla autonomía.' },
          { t: 'Decir que unos nacen para estudiar y otros no.', p: 0, r: 'Eso siempre he pensado.', fb: 'Es una creencia determinista que ignora el papel de la mediación docente y el contexto.' } ] }
    ],
    vivo: {
      lugar: 'Sala de profesores de una unidad educativa en Puyo', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '☕', t: 'Escuchar con respeto la experiencia del colega', p: 2, fb: 'El diálogo profesional parte del respeto.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📚', t: 'Compartir un ejemplo de clase constructivista', p: 2, fb: 'Concreta la teoría en la práctica.', efecto: { confianza: 6, tension: -4 } },
            { icono: '😤', t: 'Burlarse de sus métodos', p: 0, fb: 'Rompe el diálogo entre colegas.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Conductismo y refuerzo', claves: ['conductismo', 'skinner', 'pavlov', 'refuerzo', 'estimulo', 'premio'] },
            { n: 'Constructivismo', claves: ['constructivismo', 'piaget', 'construye', 'conocimiento previo', 'esquema', 'activo'] },
            { n: 'Matiz entre teorías', claves: ['tiene utilidad', 'complementa', 'no todo', 'pero', 'ademas', 'combinar'] }
          ],
          evitar: [ { claves: ['quitarles el recreo', 'castigo funciona'], fb: 'El castigo no produce aprendizaje significativo.' } ],
          modelo: 'El refuerzo de Skinner tiene utilidad, pero según Piaget el niño construye activamente el conocimiento a partir de lo que ya sabe; podemos combinar ambos.'
        },
        {
          acciones: [
            { icono: '🧩', t: 'Proponer material concreto para fracciones', p: 2, fb: 'El andamiaje con material concreto facilita la comprensión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👫', t: 'Sugerir parejas de tutoría entre pares', p: 2, fb: 'Aplica la mediación social de Vygotsky.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📄', t: 'Recomendar planas de ejercicios repetidos', p: 0, fb: 'Repetición mecánica sin comprensión.', efecto: { confianza: -8, tension: 6 } },
            { icono: '🐢', t: 'Recomendar explicar más despacio', p: 1, fb: 'Ayuda poco si no cambia el método.', efecto: { confianza: 0, tension: 2 } }
          ],
          conceptos: [
            { n: 'Zona de desarrollo próximo', claves: ['vygotsky', 'zona de desarrollo proximo', 'zdp', 'andamiaje', 'mediacion', 'con ayuda'] },
            { n: 'Aprendizaje social', claves: ['bandura', 'modelado', 'observacion', 'imitar', 'companero', 'parejas'] },
            { n: 'Material concreto y diferencias', claves: ['material concreto', 'manipular', 'diferencias individuales', 'ritmo', 'regletas', 'fracciones'] }
          ],
          evitar: [ { claves: ['cien ejercicios', 'que repitan'], fb: 'La repetición sin sentido no atiende la comprensión.' } ],
          modelo: 'Desde Vygotsky, trabajaría en su zona de desarrollo próximo con andamiaje: material concreto para fracciones y parejas con un compañero que modele el proceso, como plantea Bandura.'
        },
        {
          acciones: [
            { icono: '🪞', t: 'Proponer una autoevaluación al cierre de clase', p: 2, fb: 'Desarrolla monitoreo del propio aprendizaje.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🌿', t: 'Conectar los problemas con la vida en Pastaza', p: 2, fb: 'El contexto favorece la motivación intrínseca.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎁', t: 'Aumentar los premios materiales', p: 1, fb: 'Motivación extrínseca de corto plazo.', efecto: { confianza: 0, tension: 1 } },
            { icono: '🚷', t: 'Rendirse con los que “no nacieron para estudiar”', p: 0, fb: 'Creencia determinista y excluyente.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Metacognición', claves: ['metacognicion', 'que aprendi', 'autoevalu', 'reflexion', 'monitore', 'autorregul'] },
            { n: 'Motivación intrínseca', claves: ['motivacion', 'intrinseca', 'interes', 'curiosidad', 'sentido', 'les guste'] },
            { n: 'Contexto social y cultural', claves: ['contexto', 'amazon', 'pastaza', 'vida diaria', 'comunidad', 'cultura'] }
          ],
          evitar: [ { claves: ['nacen para estudiar', 'no les da'], fb: 'Las creencias deterministas limitan las expectativas sobre los estudiantes.' } ],
          modelo: 'Desarrollaría metacognición con preguntas como qué aprendí y qué me costó, y despertaría la motivación intrínseca conectando los problemas con su contexto amazónico.'
        }
      ]
    }
  },

  /* ---------------- SPRL-203 Estadística Descriptiva ---------------- */
  {
    id: 'asig-SPRL-203', cod: 'SPRL-203',
    titulo: 'Informe de calificaciones de 5.º EGB',
    asignaturas: ['SPRL-203'],
    persona: { nombre: 'Lic. Mariana Vargas', rol: 'Coordinadora académica', avatar: '👩🏽‍💻', pitch: 1.1 },
    contexto: 'La coordinadora necesita un análisis rápido de las notas de Matemática de 10 estudiantes de 5.º EGB (6, 7, 8, 8, 9, 5, 10, 7, 8, 2) y de la asistencia del curso para la junta de curso.',
    objetivo: 'Calcular e interpretar medidas de tendencia central y dispersión, y presentar datos educativos en tablas, gráficos y porcentajes.',
    pasos: [
      { dice: 'Necesito la media, la mediana y la moda de estas diez notas. ¿Cuánto da?', opciones: [
          { t: 'Media 7 (70 ÷ 10); ordenando, mediana 7,5 (promedio de 7 y 8); moda 8.', p: 2, r: 'Perfecto, cuadra con mis cálculos.', fb: 'Media = suma/n; la mediana en n par es el promedio de los dos valores centrales; la moda es el valor más frecuente.' },
          { t: 'Media 7 y moda 8, pero la mediana es 9 porque es el dato del centro sin ordenar.', p: 1, r: 'La mediana se calcula con los datos ordenados.', fb: 'Para la mediana los datos deben ordenarse primero.' },
          { t: 'Media 8 porque es la nota que más se repite.', p: 0, r: 'Eso es la moda, no la media.', fb: 'Confundir media y moda es un error conceptual básico.' } ] },
      { dice: 'Hay un estudiante con 2. ¿Eso afecta el análisis? ¿Qué tan dispersas están las notas?', opciones: [
          { t: 'El 2 es un valor atípico que baja la media; la mediana (7,5) representa mejor al grupo; el rango es 8 (10 − 2), lo que indica dispersión alta.', p: 2, r: 'Muy bien argumentado; lo incluyo en el informe.', fb: 'La media es sensible a valores extremos; la mediana es más robusta; el rango mide la dispersión.' },
          { t: 'No afecta porque es solo un estudiante.', p: 1, r: 'Un dato extremo sí mueve la media.', fb: 'Un valor atípico influye en la media aunque sea un solo dato.' },
          { t: 'Eliminar ese dato para que el promedio salga mejor.', p: 0, r: 'No podemos manipular los datos.', fb: 'Eliminar datos sin justificación es manipulación; además, ese estudiante requiere refuerzo.' } ] },
      { dice: 'Último punto: de 35 estudiantes, el lunes asistieron 28. ¿Qué porcentaje es y cómo lo presento?', opciones: [
          { t: 'Es 80 % (28 ÷ 35 × 100); presento una tabla de frecuencias de asistencia semanal y un gráfico de barras por día.', p: 2, r: 'Excelente, claro y visual para la junta.', fb: 'El porcentaje relativiza la frecuencia; el gráfico de barras es adecuado para comparar categorías como días.' },
          { t: 'Es 80 %, y lo pongo en un párrafo.', p: 1, r: 'Correcto, pero un gráfico ayudaría.', fb: 'El cálculo es correcto, pero la representación gráfica facilita la interpretación.' },
          { t: 'Es 28 %.', p: 0, r: 'Eso no tiene sentido; asistió la mayoría.', fb: 'Confundir frecuencia absoluta con porcentaje lleva a conclusiones erróneas.' } ] }
    ],
    vivo: {
      lugar: 'Coordinación académica, escuela fiscal del Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🔢', t: 'Ordenar las notas de menor a mayor', p: 2, fb: 'Paso necesario para hallar la mediana.', efecto: { confianza: 8, tension: -5 } },
            { icono: '➕', t: 'Sumar las diez notas y dividir para diez', p: 2, fb: 'Cálculo de la media aritmética.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎲', t: 'Estimar los valores a ojo', p: 0, fb: 'Sin procedimiento no hay rigor.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Media aritmética', claves: ['media', 'promedio', 'siete', '7', 'setenta', '70', 'dividido'] },
            { n: 'Mediana', claves: ['mediana', 'siete punto cinco', 'siete coma cinco', '7,5', '7.5', 'ordenad', 'centrales'] },
            { n: 'Moda', claves: ['moda', 'ocho', '8', 'mas se repite', 'frecuente', 'tres veces'] }
          ],
          evitar: [ { claves: ['la media es ocho', 'no hace falta ordenar'], fb: 'Errores conceptuales en las medidas de tendencia central.' } ],
          modelo: 'La suma es 70, así que la media es 7. Ordenando los datos, la mediana es 7,5, el promedio de 7 y 8, y la moda es 8 porque se repite tres veces.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Calcular el rango entre la nota mayor y la menor', p: 2, fb: 'Medida básica de dispersión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔎', t: 'Señalar el 2 como valor atípico', p: 2, fb: 'Identificar atípicos evita interpretaciones erradas.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✂️', t: 'Borrar la nota de 2 del cálculo', p: 0, fb: 'Manipulación de datos.', efecto: { confianza: -14, tension: 10 } }
          ],
          conceptos: [
            { n: 'Valor atípico', claves: ['atipico', 'extremo', 'baja la media', 'afecta', 'outlier', 'dato aislado'] },
            { n: 'Robustez de la mediana', claves: ['mediana', 'representa mejor', 'robusta', 'no se afecta', 'menos sensible', 'grupo'] },
            { n: 'Dispersión', claves: ['rango', 'ocho', '8', 'dispersion', 'diez menos dos', 'desviacion'] }
          ],
          evitar: [ { claves: ['eliminar el dato', 'borrar esa nota'], fb: 'Eliminar datos sin justificación es manipulación.' } ],
          modelo: 'El 2 es un valor atípico que baja la media, por eso la mediana de 7,5 representa mejor al grupo. El rango es 8, diez menos dos, y muestra una dispersión alta.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Calcular 28 entre 35 por 100', p: 2, fb: 'Procedimiento correcto del porcentaje.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📊', t: 'Elaborar un gráfico de barras por día', p: 2, fb: 'Adecuado para comparar categorías.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🥧', t: 'Hacer un gráfico circular con las notas individuales', p: 1, fb: 'No es el gráfico más adecuado para notas individuales.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🙈', t: 'Presentar solo el número 28', p: 0, fb: 'Sin relativizar no se interpreta.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Porcentaje de asistencia', claves: ['ochenta', '80', 'por ciento', 'porcentaje', 'veintiocho', 'treinta y cinco'] },
            { n: 'Tabla de frecuencias', claves: ['tabla', 'frecuencia', 'absoluta', 'relativa', 'semana', 'organizar'] },
            { n: 'Gráfico adecuado', claves: ['grafico de barras', 'barras', 'grafico', 'por dia', 'comparar', 'visual'] }
          ],
          evitar: [ { claves: ['veintiocho por ciento', '28 por ciento'], fb: 'Confunde frecuencia absoluta con porcentaje.' } ],
          modelo: 'Veintiocho entre treinta y cinco por cien da 80 por ciento. Lo presentaré en una tabla de frecuencias semanal y un gráfico de barras por día.'
        }
      ]
    }
  },

  /* ---------------- SPRL-204 Psicología Evolutiva del Niño ---------------- */
  {
    id: 'asig-SPRL-204', cod: 'SPRL-204',
    titulo: 'Madre preocupada por el desarrollo de Sofía',
    asignaturas: ['SPRL-204'],
    persona: { nombre: 'Sra. Gloria Cerda', rol: 'Madre de Sofía, 7 años, 2.º EGB', avatar: '👩🏽', pitch: 1.15 },
    contexto: 'La madre de Sofía pide una cita: le preocupa que su hija diga que “hay más agua en el vaso alto”, que llore cuando pierde un juego y que hable poco en casa. Debes orientarla desde el desarrollo infantil.',
    objetivo: 'Aplicar etapas y teorías del desarrollo infantil (Piaget, Erikson, Vygotsky) en lo cognitivo, emocional, social y del lenguaje, y orientar su estimulación.',
    pasos: [
      { dice: 'Profe, le eché agua en dos vasos y dice que el alto tiene más. ¿Mi hija estará atrasada?', opciones: [
          { t: 'Explicar que a los 7 años es esperable: está en transición de la etapa preoperacional a las operaciones concretas (Piaget) y aún construye la conservación; sugerir juegos con material concreto.', p: 2, r: '¡Ay, qué alivio! Entonces es normal para su edad.', fb: 'Según Piaget, la conservación de cantidad se consolida en las operaciones concretas (aprox. 7–11 años) mediante la manipulación.' },
          { t: 'Decir que no se preocupe sin explicar por qué.', p: 1, r: 'Ya, pero quisiera entender.', fb: 'Tranquilizar sin fundamento no orienta a la familia.' },
          { t: 'Decir que sí parece tener un retraso y que la lleve al psicólogo urgente.', p: 0, r: '(Se angustia) ¡Dios mío!', fb: 'Alarmar sin evidencia ignora las características normales de la etapa.' } ] },
      { dice: 'Y cuando pierde un juego llora y dice que ella es tonta.', opciones: [
          { t: 'Explicar que está en la etapa de laboriosidad vs. inferioridad (Erikson); sugerir nombrar emociones, valorar el esfuerzo y no solo el resultado para fortalecer autoestima y resiliencia.', p: 2, r: 'Le voy a decir que me importa que lo intente.', fb: 'Erikson señala que en la edad escolar el niño necesita sentirse competente; reconocer el esfuerzo protege la autoestima.' },
          { t: 'Recomendar que la dejen ganar siempre.', p: 1, r: '¿Y si se acostumbra?', fb: 'Evitar toda frustración no desarrolla resiliencia.' },
          { t: 'Decir que debe aprender a no llorar.', p: 0, r: 'Eso le decía su papá… y llora más.', fb: 'Reprimir emociones afecta el desarrollo emocional.' } ] },
      { dice: 'Lo último: en casa casi no habla, solo ve videos en el celular.', opciones: [
          { t: 'Sugerir conversar a diario, leer cuentos juntos y pedirle que los narre, limitar pantallas, y acordar observar su lenguaje en el aula para dar seguimiento.', p: 2, r: 'Esta semana empiezo con un cuento cada noche.', fb: 'La estimulación del lenguaje se da en la interacción (Vygotsky); el seguimiento docente permite evaluar y apoyar el desarrollo.' },
          { t: 'Recomendar videos educativos en lugar de los otros.', p: 1, r: 'Bueno, cambiaré los videos.', fb: 'Mejora el contenido, pero no sustituye la interacción verbal.' },
          { t: 'Decir que es cosa de la casa y no de la escuela.', p: 0, r: 'Pensé que podíamos trabajar juntos.', fb: 'El desarrollo integral requiere corresponsabilidad escuela-familia.' } ] }
    ],
    vivo: {
      lugar: 'Sala de atención a representantes, escuela del barrio Obrero, Puyo', fondo: 'oficina',
      inicio: { confianza: 45, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '🥤', t: 'Demostrar la prueba de conservación con dos vasos', p: 2, fb: 'Ejemplifica la teoría de Piaget.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🧱', t: 'Sugerir juegos de trasvasar y medir en casa', p: 2, fb: 'La manipulación concreta estimula lo cognitivo.', efecto: { confianza: 6, tension: -5 } },
            { icono: '🚨', t: 'Afirmar que tiene un retraso', p: 0, fb: 'Alarma sin evidencia.', efecto: { confianza: -12, tension: 14 } }
          ],
          conceptos: [
            { n: 'Etapa del desarrollo', claves: ['piaget', 'preoperacional', 'operaciones concretas', 'etapa', 'siete anos', '7 anos'] },
            { n: 'Conservación', claves: ['conservacion', 'cantidad', 'misma agua', 'forma del vaso', 'transicion', 'construyendo'] },
            { n: 'Estimulación cognitiva', claves: ['material concreto', 'juego', 'manipular', 'trasvasar', 'medir', 'estimul'] }
          ],
          evitar: [ { claves: ['esta atrasada', 'tiene retraso'], fb: 'Etiquetar sin evaluación genera angustia innecesaria.' } ],
          modelo: 'Es esperable a los 7 años: según Piaget está pasando de la etapa preoperacional a las operaciones concretas y aún construye la conservación. Jueguen a trasvasar y medir con material concreto.'
        },
        {
          acciones: [
            { icono: '❤️', t: 'Validar la preocupación de la madre', p: 2, fb: 'La empatía fortalece la alianza con la familia.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏅', t: 'Proponer elogiar el esfuerzo de Sofía', p: 2, fb: 'Protege la autoestima.', efecto: { confianza: 6, tension: -5 } },
            { icono: '🤐', t: 'Aconsejar que no la dejen llorar', p: 0, fb: 'Reprime la expresión emocional.', efecto: { confianza: -10, tension: 8 } },
            { icono: '🏆', t: 'Sugerir dejarla ganar siempre', p: 1, fb: 'Evita la frustración, pero no construye resiliencia.', efecto: { confianza: 0, tension: 1 } }
          ],
          conceptos: [
            { n: 'Teoría de Erikson', claves: ['erikson', 'laboriosidad', 'inferioridad', 'sentirse capaz', 'competente', 'etapa'] },
            { n: 'Manejo de emociones', claves: ['nombrar', 'emocion', 'triste', 'frustracion', 'validar', 'sentimiento'] },
            { n: 'Autoestima y resiliencia', claves: ['autoestima', 'resiliencia', 'esfuerzo', 'intentar', 'valorar', 'confianza'] }
          ],
          evitar: [ { claves: ['no llores', 'los ninos no lloran'], fb: 'Reprimir emociones afecta el desarrollo emocional.' } ],
          modelo: 'Según Erikson está en la etapa de laboriosidad frente a inferioridad. Ayúdela a nombrar su frustración y valore su esfuerzo para fortalecer su autoestima y resiliencia.'
        },
        {
          acciones: [
            { icono: '📖', t: 'Recomendar leer un cuento cada noche', p: 2, fb: 'Estimula vocabulario y comprensión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👁️', t: 'Acordar observar su lenguaje en el aula', p: 2, fb: 'El seguimiento permite evaluar el desarrollo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📵', t: 'Sugerir horarios sin pantallas', p: 2, fb: 'Favorece la interacción verbal.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🏠', t: 'Decir que es problema de la casa', p: 0, fb: 'Rompe la corresponsabilidad.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Estimulación del lenguaje', claves: ['leer', 'cuento', 'conversar', 'narrar', 'vocabulario', 'preguntas'] },
            { n: 'Interacción y pantallas', claves: ['pantalla', 'celular', 'limitar', 'interaccion', 'juntos', 'vygotsky'] },
            { n: 'Seguimiento conjunto', claves: ['seguimiento', 'observar', 'evaluar', 'nos reunimos', 'juntos', 'en un mes'] }
          ],
          evitar: [ { claves: ['no es mi problema', 'eso es de la casa'], fb: 'El desarrollo integral es corresponsabilidad.' } ],
          modelo: 'Converse con ella a diario, lean un cuento cada noche y pídale que se lo narre; limiten el celular. Yo observaré su lenguaje en el aula y nos reunimos en un mes para dar seguimiento.'
        }
      ]
    }
  },

  /* ---------------- SPRL-205 Didáctica General ---------------- */
  {
    id: 'asig-SPRL-205', cod: 'SPRL-205',
    titulo: 'Clase en escuela pluridocente',
    asignaturas: ['SPRL-205'],
    persona: { nombre: 'Mgs. Patricia Ushiña', rol: 'Asesora educativa del distrito', avatar: '👩🏽‍🏫', pitch: 1.05 },
    contexto: 'Trabajas en una escuela pluridocente de una comunidad de Arajuno con 2.º, 3.º y 4.º EGB en la misma aula. La asesora educativa revisa cómo planificas, qué métodos usas y cómo evalúas el tema “los animales de nuestra selva”.',
    objetivo: 'Planificar una clase con objetivos, actividades, recursos y evaluación adaptados al contexto, seleccionando métodos de enseñanza pertinentes.',
    pasos: [
      { dice: 'Tiene tres grados juntos. ¿Cómo planifica una sola clase para todos?', opciones: [
          { t: 'Plantear un tema común con objetivos diferenciados por grado, actividades graduadas en complejidad, recursos del entorno y criterios de evaluación para cada nivel.', p: 2, r: 'Eso es exactamente lo que necesita un aula multigrado.', fb: 'La planificación de clase debe adaptarse al contexto y a las características de los estudiantes: objetivos, contenidos, actividades, recursos y evaluación.' },
          { t: 'Dar la misma actividad a todos para simplificar.', p: 1, r: 'Los de 4.º se aburrirán y los de 2.º no podrán.', fb: 'La actividad única no atiende los distintos niveles.' },
          { t: 'Atender un grado por día mientras los otros copian del libro.', p: 0, r: 'Eso deja a dos grupos sin aprender.', fb: 'Dejar grupos sin mediación pedagógica afecta el derecho a aprender.' } ] },
      { dice: '¿Qué método de enseñanza usará?', opciones: [
          { t: 'Combinar enseñanza por descubrimiento (salida a observar animales del entorno) con aprendizaje cooperativo en grupos mixtos y breves momentos de instrucción directa.', p: 2, r: 'Muy pertinente y aprovecha el entorno.', fb: 'La selección de métodos depende del objetivo; combinar descubrimiento, cooperación e instrucción directa atiende la diversidad.' },
          { t: 'Usar solo instrucción directa con láminas.', p: 1, r: 'Funciona para algo, pero desperdicia el entorno.', fb: 'La instrucción directa es útil, pero limitada si es el único método.' },
          { t: 'Dictar el contenido para que lo copien.', p: 0, r: 'Eso no promueve el aprendizaje activo.', fb: 'El dictado mecánico no desarrolla comprensión.' } ] },
      { dice: '¿Y cómo evaluará a lo largo de la unidad?', opciones: [
          { t: 'Evaluación diagnóstica al inicio con preguntas sobre animales que conocen, formativa durante las actividades con lista de cotejo y sumativa al final con un álbum por grado.', p: 2, r: 'Excelente, coherente con sus objetivos.', fb: 'La evaluación diagnóstica, formativa y sumativa cumplen propósitos distintos y complementarios.' },
          { t: 'Solo una prueba escrita al final.', p: 1, r: '¿Y si los de 2.º aún no leen bien?', fb: 'La evaluación sumativa sola no permite ajustar la enseñanza.' },
          { t: 'Poner la misma nota a todos por participar.', p: 0, r: 'Eso no refleja el aprendizaje real.', fb: 'Calificar sin criterios no evalúa aprendizajes.' } ] }
    ],
    vivo: {
      lugar: 'Escuela pluridocente de una comunidad kichwa de Arajuno', fondo: 'comunidad',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Redactar objetivos diferenciados por grado', p: 2, fb: 'Atiende los niveles del aula multigrado.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🍃', t: 'Seleccionar recursos del entorno', p: 2, fb: 'Contextualiza el aprendizaje.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📘', t: 'Poner a copiar del libro a dos grados', p: 0, fb: 'Deja grupos sin mediación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Objetivos diferenciados', claves: ['objetivo', 'por grado', 'diferenciad', 'segundo', 'tercero', 'cuarto', 'nivel'] },
            { n: 'Actividades graduadas', claves: ['actividad', 'complejidad', 'graduad', 'tema comun', 'mismo tema', 'adapt'] },
            { n: 'Recursos y evaluación', claves: ['recurso', 'entorno', 'material', 'criterio', 'evaluacion', 'indicador'] }
          ],
          evitar: [ { claves: ['que copien', 'un grado por dia'], fb: 'Deja estudiantes sin acompañamiento.' } ],
          modelo: 'Trabajaré un tema común, los animales de la selva, con objetivos diferenciados por grado, actividades de distinta complejidad, recursos del entorno y criterios de evaluación por nivel.'
        },
        {
          acciones: [
            { icono: '🔭', t: 'Organizar una salida corta para observar animales', p: 2, fb: 'Aplica la enseñanza por descubrimiento.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👥', t: 'Formar grupos mixtos de los tres grados', p: 2, fb: 'El aprendizaje cooperativo aprovecha la tutoría entre pares.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🖼️', t: 'Explicar solo con láminas', p: 1, fb: 'Útil, pero limitado.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🗣️', t: 'Dictar el tema completo', p: 0, fb: 'Aprendizaje pasivo.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Enseñanza por descubrimiento', claves: ['descubrimiento', 'observar', 'salida', 'explorar', 'indagar', 'entorno'] },
            { n: 'Aprendizaje cooperativo', claves: ['cooperativo', 'grupos', 'mixtos', 'tutoria', 'entre pares', 'roles'] },
            { n: 'Instrucción directa breve', claves: ['instruccion directa', 'explicacion', 'breve', 'modelar', 'combinar', 'metodo'] }
          ],
          evitar: [ { claves: ['dictado', 'copien todo'], fb: 'El dictado no promueve el aprendizaje activo.' } ],
          modelo: 'Combinaré la enseñanza por descubrimiento con una salida a observar animales, aprendizaje cooperativo en grupos mixtos y una breve explicación directa.'
        },
        {
          acciones: [
            { icono: '❓', t: 'Aplicar preguntas diagnósticas al inicio', p: 2, fb: 'Identifica conocimientos previos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✔️', t: 'Llevar una lista de cotejo durante las actividades', p: 2, fb: 'Evaluación formativa continua.', efecto: { confianza: 8, tension: -5 } },
            { icono: '💯', t: 'Dar la misma nota a todos', p: 0, fb: 'No evalúa aprendizajes.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Evaluación diagnóstica', claves: ['diagnostica', 'al inicio', 'conocimientos previos', 'que saben', 'preguntas', 'punto de partida'] },
            { n: 'Evaluación formativa', claves: ['formativa', 'durante', 'lista de cotejo', 'observacion', 'retroaliment', 'proceso'] },
            { n: 'Evaluación sumativa', claves: ['sumativa', 'al final', 'album', 'producto', 'rubrica', 'cierre'] }
          ],
          evitar: [ { claves: ['misma nota', 'solo el examen'], fb: 'La evaluación debe ser variada y con criterios.' } ],
          modelo: 'Haré una evaluación diagnóstica al inicio, formativa durante las actividades con lista de cotejo y sumativa al final con un álbum adaptado a cada grado.'
        }
      ]
    }
  },

  /* ---------------- SPRL-206 Modelos Pedagógicos ---------------- */
  {
    id: 'asig-SPRL-206', cod: 'SPRL-206',
    titulo: 'Sustentar un proyecto de huerto escolar',
    asignaturas: ['SPRL-206'],
    persona: { nombre: 'Lic. Fausto Aguinda', rol: 'Presidente de la Junta Académica', avatar: '🧔🏽', pitch: 0.9 },
    contexto: 'Propones trabajar en 7.º EGB con aprendizaje basado en proyectos un “huerto escolar amazónico”. La Junta Académica duda y te pide sustentar el modelo pedagógico, su diseño y cómo lo evaluarás.',
    objetivo: 'Diferenciar modelos pedagógicos (tradicional, constructivista, socioconstructivista, ABP, cooperativo), aplicarlos en una estrategia y evaluarlos.',
    pasos: [
      { dice: 'Aquí siempre hemos trabajado con el modelo tradicional y los resultados no son malos. ¿Por qué cambiar?', opciones: [
          { t: 'Contrastar: el tradicional centra la enseñanza en el docente y la transmisión; el socioconstructivista sitúa al estudiante como protagonista que construye en interacción social, y el ABP lo concreta.', p: 2, r: 'Entiendo la diferencia de fondo.', fb: 'Cada modelo se fundamenta en teorías distintas: el tradicional en la transmisión; el socioconstructivista en Vygotsky y la interacción social.' },
          { t: 'Decir que el ABP está de moda.', p: 1, r: 'La moda no es un argumento pedagógico.', fb: 'La elección de un modelo debe fundamentarse en teorías y objetivos.' },
          { t: 'Afirmar que el modelo tradicional es dañino y no sirve.', p: 0, r: 'Con eso ofende a varios colegas.', fb: 'Descalificar sin fundamento impide el diálogo pedagógico; todo modelo tiene usos y límites.' } ] },
      { dice: 'Bien, ¿y cómo sería el proyecto en la práctica?', opciones: [
          { t: 'Partir de una pregunta guía (¿cómo producir alimentos sanos en la escuela?), organizar fases de investigación, diseño y siembra, roles cooperativos, y un producto final presentado a las familias.', p: 2, r: 'Muy bien estructurado y articulado con el currículo.', fb: 'El ABP se organiza con pregunta guía, fases, trabajo cooperativo con roles y un producto final público.' },
          { t: 'Sembrar plantas y ver qué aprenden.', p: 1, r: 'Falta intención pedagógica.', fb: 'Sin planificación ni objetivos, la actividad pierde valor formativo.' },
          { t: 'Explicar el huerto en clase y tomar una prueba.', p: 0, r: 'Eso es el modelo tradicional otra vez.', fb: 'Se contradice el modelo propuesto.' } ] },
      { dice: '¿Cómo sabremos si el modelo funcionó?', opciones: [
          { t: 'Evaluar con observación sistemática, rúbrica del producto, retroalimentación de los estudiantes y comparación de resultados de aprendizaje, para ajustar el modelo.', p: 2, r: 'Así podremos decidir con evidencia.', fb: 'Los modelos pedagógicos se evalúan mediante observación, retroalimentación de estudiantes y resultados de aprendizaje.' },
          { t: 'Preguntar a los niños si les gustó.', p: 1, r: 'Es un dato, pero insuficiente.', fb: 'La satisfacción es una fuente, no la única evidencia.' },
          { t: 'No hace falta evaluar; si se ven contentos, funciona.', p: 0, r: 'Eso no convence a la Junta.', fb: 'Sin evaluación no hay mejora ni rendición de cuentas.' } ] }
    ],
    vivo: {
      lugar: 'Sala de reuniones, unidad educativa en Santa Clara, Pastaza', fondo: 'oficina',
      inicio: { confianza: 40, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '📊', t: 'Presentar un cuadro comparativo de modelos', p: 2, fb: 'Organiza la sustentación con fundamento.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🙏', t: 'Reconocer los aportes del modelo tradicional', p: 2, fb: 'Favorece el diálogo con colegas.', efecto: { confianza: 6, tension: -6 } },
            { icono: '👎', t: 'Descalificar a los colegas tradicionales', p: 0, fb: 'Genera resistencia.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Modelo tradicional', claves: ['tradicional', 'transmision', 'docente centro', 'memoriz', 'expositivo', 'centrado en el docente'] },
            { n: 'Socioconstructivismo', claves: ['socioconstructiv', 'constructiv', 'vygotsky', 'interaccion', 'construye', 'protagonista'] },
            { n: 'Aprendizaje basado en proyectos', claves: ['proyecto', 'abp', 'aprendizaje basado', 'problema real', 'contexto', 'huerto'] }
          ],
          evitar: [ { claves: ['esta de moda', 'no sirve para nada'], fb: 'Se necesita fundamento, no opiniones.' } ],
          modelo: 'El modelo tradicional se centra en la transmisión del docente; el socioconstructivista hace al estudiante protagonista que construye en interacción, y el aprendizaje basado en proyectos lo concreta en el huerto.'
        },
        {
          acciones: [
            { icono: '❔', t: 'Plantear la pregunta guía del proyecto', p: 2, fb: 'Orienta la indagación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗂️', t: 'Distribuir roles cooperativos en los grupos', p: 2, fb: 'Asegura interdependencia positiva.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🌱', t: 'Sembrar sin planificar las fases', p: 1, fb: 'Falta estructura pedagógica.', efecto: { confianza: -2, tension: 3 } },
            { icono: '📝', t: 'Reducir todo a una prueba escrita', p: 0, fb: 'Contradice el modelo.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Pregunta guía', claves: ['pregunta guia', 'pregunta', 'como producir', 'alimentos', 'reto', 'problema'] },
            { n: 'Fases y roles', claves: ['fases', 'investigacion', 'diseno', 'siembra', 'roles', 'cronograma'] },
            { n: 'Producto final', claves: ['producto final', 'presentar', 'familias', 'feria', 'exposicion', 'cosecha'] }
          ],
          evitar: [ { claves: ['solo una prueba', 'explico y tomo prueba'], fb: 'No corresponde al ABP.' } ],
          modelo: 'Partiremos de la pregunta guía: ¿cómo producir alimentos sanos en la escuela? Habrá fases de investigación, diseño y siembra, con roles cooperativos, y un producto final para las familias.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Diseñar una rúbrica del producto final', p: 2, fb: 'Criterios claros de evaluación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗳️', t: 'Recoger retroalimentación de los estudiantes', p: 2, fb: 'Fuente para evaluar el modelo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '😊', t: 'Juzgar el éxito solo por las caras felices', p: 0, fb: 'Sin evidencia de aprendizaje.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Observación y rúbrica', claves: ['observacion', 'rubrica', 'criterios', 'registro', 'evidencia', 'instrumento'] },
            { n: 'Retroalimentación de estudiantes', claves: ['retroaliment', 'opinion de los estudiantes', 'encuesta', 'autoevaluacion', 'voz', 'reflexion'] },
            { n: 'Resultados y ajuste', claves: ['resultados de aprendizaje', 'comparar', 'ajustar', 'mejorar', 'decidir', 'logros'] }
          ],
          evitar: [ { claves: ['no hace falta evaluar', 'se ven contentos'], fb: 'Todo modelo debe evaluarse con evidencia.' } ],
          modelo: 'Evaluaré con observación sistemática, una rúbrica del producto, la retroalimentación de los estudiantes y la comparación de resultados de aprendizaje, para ajustar el modelo.'
        }
      ]
    }
  },

  /* ---------------- SPRL-207 TICs Aplicados a la Educación ---------------- */
  {
    id: 'asig-SPRL-207', cod: 'SPRL-207',
    titulo: 'Fotos, notas y enlaces en el grupo de padres',
    asignaturas: ['SPRL-207'],
    persona: { nombre: 'Sra. Carmen Tapuy', rol: 'Madre de familia, administra el grupo de WhatsApp de 6.º EGB', avatar: '👩🏽‍🦱', pitch: 1.1 },
    contexto: 'La madre que administra el chat del curso quiere publicar fotos de los niños y la lista de notas. Además su hijo recibió un enlace sospechoso. Debes orientar sobre protección de datos, herramientas digitales y ciberseguridad.',
    objetivo: 'Aplicar competencias digitales: uso seguro de internet, protección de datos de menores, herramientas de evaluación digital y gestión de recursos con conectividad limitada.',
    pasos: [
      { dice: 'Profe, ¿me pasa la lista de notas y las fotos del desfile? Las subo al grupo y a Facebook para que todos vean.', opciones: [
          { t: 'Explicar que las notas son información personal y se comunican individualmente; las fotos de menores solo se comparten con autorización y en canales institucionales.', p: 2, r: 'No había pensado en eso. Tiene razón.', fb: 'Los datos e imagen de niñas y niños son información protegida; se requiere consentimiento y uso responsable (Ley de Protección de Datos Personales, Código de la Niñez).' },
          { t: 'Enviar solo las fotos pero no las notas.', p: 1, r: 'Ya, ¿y los papás que no quieren fotos?', fb: 'Se protegen las notas, pero falta el consentimiento para las imágenes.' },
          { t: 'Enviar todo porque así se motivan los niños.', p: 0, r: '(Más tarde un padre reclama molesto)', fb: 'Publicar notas e imágenes sin consentimiento expone a los menores.' } ] },
      { dice: 'Bueno, ¿y entonces cómo hacemos para ver avances? Aquí en la parroquia el internet es malo.', opciones: [
          { t: 'Proponer un portafolio electrónico privado y cuestionarios en línea que funcionen desde el celular, con recursos descargables para trabajar sin conexión.', p: 2, r: 'Eso nos sirve, porque a veces no hay señal.', fb: 'Las herramientas de evaluación digital (cuestionarios, rúbricas, portafolios) deben adaptarse a la conectividad del contexto.' },
          { t: 'Usar una plataforma que exige conexión permanente.', p: 1, r: 'Muchos no van a poder entrar.', fb: 'La herramienta es útil, pero no considera la brecha digital.' },
          { t: 'Decir que la tecnología no es para el campo.', p: 0, r: 'Nuestros hijos también tienen derecho.', fb: 'Negar el acceso amplía la brecha digital.' } ] },
      { dice: 'Ah, y a mi hijo le llegó un mensaje: “Ganaste un celular, ingresa tu clave aquí”. ¿Lo abre?', opciones: [
          { t: 'Indicar que no lo abra: es phishing; borrar, bloquear, no compartir contraseñas, y aprovechar para enseñar en clase a evaluar fuentes y usar internet con seguridad.', p: 2, r: 'Menos mal pregunté. Le voy a explicar.', fb: 'Reconocer engaños digitales y proteger contraseñas son competencias digitales básicas de uso seguro.' },
          { t: 'Decir que lo abra solo para ver.', p: 1, r: '¿Y si le roban la cuenta?', fb: 'Abrir enlaces sospechosos puede instalar malware o robar datos.' },
          { t: 'Recomendar que ingrese la clave por si es verdad.', p: 0, r: '(Al día siguiente su cuenta estaba hackeada)', fb: 'Entregar credenciales es el objetivo del fraude.' } ] }
    ],
    vivo: {
      lugar: 'Laboratorio de computación de una escuela en Veracruz, Pastaza', fondo: 'aula',
      inicio: { confianza: 55, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🔒', t: 'Explicar la protección de datos de los niños', p: 2, fb: 'Las notas y la imagen son datos personales.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📝', t: 'Enviar formulario de autorización de imagen', p: 2, fb: 'El consentimiento es requisito.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📤', t: 'Reenviar la lista de notas al grupo', p: 0, fb: 'Expone información personal de menores.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Datos personales protegidos', claves: ['datos personales', 'privacidad', 'proteccion de datos', 'informacion personal', 'confidencial', 'notas'] },
            { n: 'Consentimiento', claves: ['autorizacion', 'consentimiento', 'permiso', 'firmar', 'representantes', 'acepten'] },
            { n: 'Canal institucional', claves: ['canal oficial', 'institucional', 'individual', 'cada familia', 'privado', 'no publicar'] }
          ],
          evitar: [ { claves: ['subalo a facebook', 'publique las notas'], fb: 'Publicar datos de menores sin consentimiento es grave.' } ],
          modelo: 'Las notas son datos personales y las comunicaré a cada familia de forma privada; las fotos solo se comparten con autorización firmada y en el canal institucional.'
        },
        {
          acciones: [
            { icono: '🗃️', t: 'Crear un portafolio electrónico privado', p: 2, fb: 'Evidencia del progreso sin exponer datos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📥', t: 'Preparar recursos descargables para usar sin conexión', p: 2, fb: 'Atiende la brecha de conectividad.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🌐', t: 'Exigir una plataforma siempre en línea', p: 1, fb: 'Excluye a quienes no tienen señal.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🚫', t: 'Descartar cualquier herramienta digital', p: 0, fb: 'Amplía la brecha digital.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Evaluación digital', claves: ['portafolio', 'cuestionario en linea', 'rubrica digital', 'formulario', 'electronic', 'avances'] },
            { n: 'Conectividad limitada', claves: ['sin conexion', 'descarg', 'offline', 'senal', 'celular', 'datos moviles'] },
            { n: 'Acceso equitativo', claves: ['brecha digital', 'todos', 'acceso', 'equidad', 'inclusion', 'derecho'] }
          ],
          evitar: [ { claves: ['la tecnologia no es para', 'no sirve aqui'], fb: 'Excluye a las familias rurales.' } ],
          modelo: 'Usaremos un portafolio electrónico privado y cuestionarios en línea desde el celular, con recursos descargables para trabajar sin conexión y que nadie quede fuera.'
        },
        {
          acciones: [
            { icono: '🎣', t: 'Explicar qué es el phishing con ese ejemplo', p: 2, fb: 'Aprendizaje situado en ciberseguridad.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🛡️', t: 'Bloquear y reportar el número sospechoso', p: 2, fb: 'Acción segura ante fraude.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔑', t: 'Sugerir ingresar la clave por si acaso', p: 0, fb: 'Entrega credenciales al estafador.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Reconocer el engaño', claves: ['phishing', 'engano', 'estafa', 'fraude', 'sospechoso', 'falso'] },
            { n: 'Proteger contraseñas', claves: ['contrasena', 'clave', 'no compartir', 'no ingresar', 'cuenta', 'segur'] },
            { n: 'Educar en uso seguro', claves: ['ensenar', 'evaluar fuentes', 'uso seguro', 'internet', 'en clase', 'bloquear'] }
          ],
          evitar: [ { claves: ['abralo', 'ponga la clave'], fb: 'Abrir el enlace o dar la clave facilita el robo de cuentas.' } ],
          modelo: 'Que no lo abra: es phishing, un engaño para robar la clave. Hay que borrarlo, bloquear el número y nunca compartir contraseñas; lo trabajaré en clase como uso seguro de internet.'
        }
      ]
    }
  },

  /* ---------------- SPRL-209 Enseñanza del Lenguaje y Comunicación ---------------- */
  {
    id: 'asig-SPRL-209', cod: 'SPRL-209',
    titulo: 'Daniela aprende a leer y escribir',
    asignaturas: ['SPRL-209'],
    persona: { nombre: 'Daniela', rol: 'Estudiante de 3.º EGB, 8 años', avatar: '👧🏽', pitch: 1.3 },
    contexto: 'Daniela lee silabeando la leyenda de la guayusa y luego no sabe qué pasó en el cuento. Debes trabajar con ella conciencia fonológica, comprensión lectora y escritura.',
    objetivo: 'Aplicar estrategias de enseñanza de la lectura (decodificación, fluidez, comprensión) y de la escritura (redacción, ortografía, cohesión) con evaluación formativa.',
    pasos: [
      { dice: '(Lee despacio) “La… gua… yu… sa…”. Profe, ¡es muy difícil!', opciones: [
          { t: 'Animarla y trabajar conciencia fonológica: separar sonidos y sílabas de palabras conocidas (gua-yu-sa, ca-no-a) con palmadas, y luego relecturas para ganar fluidez.', p: 2, r: '¡Gua-yu-sa! ¡Tres palmadas, profe!', fb: 'La conciencia fonológica y la lectura repetida mejoran la decodificación y la fluidez lectora.' },
          { t: 'Leerle usted el texto para que no se frustre.', p: 1, r: 'Ya, pero yo quiero aprender.', fb: 'Modelar la lectura ayuda, pero no sustituye la práctica guiada.' },
          { t: 'Decirle que debió practicar más en casa.', p: 0, r: '(Baja la cabeza y cierra el libro)', fb: 'Culpabilizar desmotiva y no enseña estrategias.' } ] },
      { dice: 'Ya lo leí, pero no sé de qué se trataba…', opciones: [
          { t: 'Aplicar estrategias antes, durante y después: predecir por el título, hacer pausas, y preguntas de nivel literal, inferencial y crítico.', p: 2, r: 'Ah… el árbol ayudaba a la gente porque…', fb: 'La comprensión lectora se desarrolla con estrategias en los tres momentos y preguntas de distintos niveles.' },
          { t: 'Hacerle preguntas solo de datos: ¿cómo se llamaba el personaje?', p: 1, r: 'Se llamaba… ¡no me acuerdo!', fb: 'El nivel literal es necesario, pero no suficiente.' },
          { t: 'Mandarla a leer el cuento cinco veces más sola.', p: 0, r: '(Lo relee sin entender)', fb: 'La repetición sin estrategias no mejora la comprensión.' } ] },
      { dice: 'Escribí mi cuento: “el mono salto al rio despues se fue a la casa despues comio”. ¿Está bien?', opciones: [
          { t: 'Valorar su idea y revisar juntas: mayúscula inicial, tildes (saltó, río, comió), conectores variados (luego, finalmente) y escribir una segunda versión.', p: 2, r: '¡Voy a ponerle “de repente”!', fb: 'La enseñanza de la escritura incluye revisión y reescritura atendiendo ortografía, gramática y cohesión textual.' },
          { t: 'Corregir con rojo todos los errores.', p: 1, r: '(Mira la hoja llena de rojo y suspira)', fb: 'Señalar errores sin acompañar la revisión desmotiva.' },
          { t: 'Decirle que está mal y que lo vuelva a hacer.', p: 0, r: 'No me gusta escribir…', fb: 'La retroalimentación sin orientación no enseña.' } ] }
    ],
    vivo: {
      lugar: 'Rincón de lectura del aula de 3.º EGB, escuela en Puyo', fondo: 'aula',
      inicio: { confianza: 40, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '👏', t: 'Separar sílabas con palmadas', p: 2, fb: 'Desarrolla la conciencia fonológica.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🔁', t: 'Proponer relecturas cortas del mismo párrafo', p: 2, fb: 'La lectura repetida mejora la fluidez.', efecto: { confianza: 6, tension: -5 } },
            { icono: '😠', t: 'Reprocharle que no practica', p: 0, fb: 'Desmotiva.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Conciencia fonológica', claves: ['sonido', 'silaba', 'palmada', 'fonema', 'conciencia fonologica', 'separar'] },
            { n: 'Fluidez lectora', claves: ['fluidez', 'releer', 'otra vez', 'ritmo', 'practica', 'en voz alta'] },
            { n: 'Motivación', claves: ['tu puedes', 'muy bien', 'vamos', 'juntas', 'animo', 'paso a paso'] }
          ],
          evitar: [ { claves: ['no practicas', 'que lenta'], fb: 'Los reproches afectan la autoestima lectora.' } ],
          modelo: 'Muy bien, Daniela, vamos juntas: separemos los sonidos con palmadas, gua-yu-sa. Luego volvemos a leer el párrafo para ganar fluidez.'
        },
        {
          acciones: [
            { icono: '🔮', t: 'Pedir que prediga la historia por el título', p: 2, fb: 'Estrategia de prelectura.', efecto: { confianza: 6, tension: -4 } },
            { icono: '⏸️', t: 'Hacer pausas para preguntar durante la lectura', p: 2, fb: 'Monitorea la comprensión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '❓', t: 'Preguntar solo nombres de personajes', p: 1, fb: 'Se queda en el nivel literal.', efecto: { confianza: 0, tension: 2 } },
            { icono: '📚', t: 'Mandarla a releer sola cinco veces', p: 0, fb: 'Sin estrategia no hay comprensión.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Momentos de la lectura', claves: ['antes', 'durante', 'despues', 'predecir', 'titulo', 'pausa'] },
            { n: 'Niveles de comprensión', claves: ['literal', 'inferencial', 'critico', 'por que crees', 'que opinas', 'que paso'] },
            { n: 'Diálogo sobre el texto', claves: ['pregunta', 'cuentame', 'personaje', 'idea principal', 'que aprendiste', 'resumir'] }
          ],
          evitar: [ { claves: ['lee otra vez sola', 'no entiendes nada'], fb: 'No ofrece estrategias de comprensión.' } ],
          modelo: 'Antes de leer, ¿de qué crees que trata por el título? Durante la lectura haremos pausas y al final te preguntaré qué pasó, por qué crees que pasó y qué opinas.'
        },
        {
          acciones: [
            { icono: '🌟', t: 'Destacar primero lo bueno de su cuento', p: 2, fb: 'La retroalimentación positiva motiva.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔗', t: 'Mostrar una lista de conectores para cambiar “después”', p: 2, fb: 'Mejora la cohesión textual.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🖍️', t: 'Llenar la hoja de correcciones en rojo', p: 1, fb: 'Corrige, pero desmotiva.', efecto: { confianza: -4, tension: 4 } },
            { icono: '❌', t: 'Decir que está mal y que repita', p: 0, fb: 'Retroalimentación sin orientación.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Ortografía', claves: ['mayuscula', 'tilde', 'salto', 'rio', 'comio', 'ortografia', 'punto'] },
            { n: 'Cohesión con conectores', claves: ['conector', 'luego', 'finalmente', 'de repente', 'en lugar de despues', 'cohesion'] },
            { n: 'Revisión y reescritura', claves: ['revisar', 'segunda version', 'reescrib', 'borrador', 'juntas', 'mejorar'] }
          ],
          evitar: [ { claves: ['esta todo mal', 'hazlo de nuevo'], fb: 'Desmotiva y no orienta la mejora.' } ],
          modelo: 'Me encanta tu idea del mono. Revisemos juntas: mayúscula al inicio, tildes en saltó, río y comió, y cambiemos “después” por conectores como luego o finalmente en una segunda versión.'
        }
      ]
    }
  }
]);
