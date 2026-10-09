/* Casos vivos – Educación Básica: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {

  /* ------------------------------------------------------------------ */
  'familia-kevin': {
    lugar: 'Aula de 4.º EGB al final de la jornada',
    fondo: 'aula',
    inicio: { confianza: 35, tension: 70 },
    pasos: [
      {
        acciones: [
          { icono: '🪑', t: 'Ofrecerle un asiento y sentarte a su altura', p: 2, fb: 'Recibir a la familia en igualdad de condiciones transmite respeto y baja la tensión desde el primer momento.', efecto: { confianza: 10, tension: -10 } },
          { icono: '📱', t: 'Revisar tu celular mientras ella habla', p: 0, fb: 'Desatender a la madre comunica desinterés por su hijo y escala el conflicto.', efecto: { confianza: -15, tension: 15 } },
          { icono: '📒', t: 'Abrir el registro anecdótico de Kevin', p: 1, fb: 'Tener la evidencia a mano es útil, pero primero hay que escuchar a la familia.', efecto: { confianza: 3, tension: 0 } },
          { icono: '🙅', t: 'Cruzar los brazos y quedarte de pie frente a ella', p: 0, fb: 'Una postura defensiva comunica confrontación y aumenta la molestia.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Saluda y agradece con respeto', claves: ['gracias', 'agradezco', 'buenos dias', 'buenas tardes', 'bienvenid', 'gusto en', 'que bueno que vino', 'senora rosa'] },
          { n: 'Escucha activa: invita a contar', claves: ['cuenteme', 'digame', 'que le ha dicho', 'escuch', 'quiero entender', 'como se siente', 'que le cuenta', 'comprendo', 'entiendo'] },
          { n: 'Pone al estudiante en el centro', claves: ['kevin', 'su hijo', 'bienestar', 'que este bien', 'importa', 'preocup', 'el nino', 'sentirse bien'] }
        ],
        evitar: [
          { claves: ['culpa', 'mal portad', 'se porta mal', 'no es mi problema', 'malcriad', 'interrumpe todo'], fb: 'Empezar culpando al estudiante pone a la familia a la defensiva.' },
          { claves: ['lo trato igual', 'igual que a todos', 'no hago diferencias'], fb: 'Tratar igual no es tratar con equidad: el TDAH requiere apoyos diferenciados.' }
        ],
        modelo: 'Gracias por venir, señora Rosa. Cuénteme qué le ha dicho Kevin; quiero entender cómo se siente.'
      },
      {
        acciones: [
          { icono: '📒', t: 'Mostrarle el registro anecdótico con fechas y conductas', p: 2, fb: 'Compartir evidencia observada y fechada hace la comunicación objetiva y profesional.', efecto: { confianza: 12, tension: -10 } },
          { icono: '🎨', t: 'Enseñarle un trabajo en el que Kevin se destacó', p: 2, fb: 'Mostrar fortalezas equilibra la conversación y genera alianza con la familia.', efecto: { confianza: 10, tension: -8 } },
          { icono: '💊', t: 'Anotarle el nombre de otro medicamento', p: 0, fb: 'El docente no prescribe ni diagnostica; eso corresponde a profesionales de la salud.', efecto: { confianza: -18, tension: 18 } },
          { icono: '🤷', t: 'Encogerte de hombros sin mostrar nada', p: 1, fb: 'Sin evidencias concretas, la familia no recibe información útil para decidir.', efecto: { confianza: -4, tension: 4 } }
        ],
        conceptos: [
          { n: 'Describe conductas observadas con evidencia', claves: ['he registrado', 'registro', 'he observado', 'observ', 'he notado', 'anot', 'minutos', 'se distrae', 'se concentra'] },
          { n: 'Reconoce fortalezas del estudiante', claves: ['participa', 'entusiasmo', 'fortaleza', 'le gusta', 'es muy bueno', 'se destaca', 'creativ', 'cuando le doy', 'logra'] },
          { n: 'Identifica qué apoyos le funcionan', claves: ['consignas cortas', 'instrucciones cortas', 'le funciona', 'le ayuda', 'paso a paso', 'pausas', 'cerca de mi', 'apoyo'] }
        ],
        evitar: [
          { claves: ['medicacion', 'medicament', 'pastilla', 'cambiarle la dosis', 'doctor deberia'], fb: 'El docente no prescribe ni diagnostica; eso corresponde a profesionales de la salud.' },
          { claves: ['muy inquieto', 'insoportable', 'no se puede con el', 'es terrible'], fb: 'Las etiquetas vagas o negativas no aportan información para tomar decisiones.' }
        ],
        modelo: 'Le comparto lo que he registrado: Kevin se concentra unos diez minutos y luego se distrae, pero cuando le doy consignas cortas participa con mucho entusiasmo.'
      },
      {
        acciones: [
          { icono: '✍️', t: 'Escribir juntos un acta de acuerdos casa-escuela', p: 2, fb: 'Los acuerdos escritos y compartidos dan claridad y corresponsabilidad a la familia y al docente.', efecto: { confianza: 12, tension: -12 } },
          { icono: '📅', t: 'Agendar en el calendario la reunión de seguimiento', p: 2, fb: 'Fijar una fecha de seguimiento permite evaluar si las adaptaciones funcionan.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📄', t: 'Entregarle un formulario de cambio de paralelo', p: 0, fb: 'Trasladar el problema vulnera el derecho a una educación inclusiva (LOEI).', efecto: { confianza: -20, tension: 18 } },
          { icono: '🚪', t: 'Acompañarla a la puerta diciendo que luego le avisas', p: 1, fb: 'Sin acuerdos ni plazos, la reunión no cambia nada.', efecto: { confianza: -5, tension: 5 } }
        ],
        conceptos: [
          { n: 'Adaptaciones concretas en el aula', claves: ['cerca de mi', 'ubicar', 'consignas cortas', 'pausas activas', 'pausa', 'adaptacion', 'primera fila', 'moverse', 'instrucciones cortas'] },
          { n: 'Coordinación con el DECE y la familia', claves: ['dece', 'psicolog', 'en casa', 'rutina', 'juntos', 'acuerdo', 'trabajemos', 'familia', 'bloques'] },
          { n: 'Seguimiento con plazo', claves: ['nos reunimos', 'en un mes', 'seguimiento', 'revisamos', 'semanas', 'volvemos a', 'proxima reunion', 'evaluar como'] }
        ],
        evitar: [
          { claves: ['cambie de paralelo', 'cambiarlo de paralelo', 'otra escuela', 'otro paralelo', 'retirarlo'], fb: 'Trasladar el problema vulnera el derecho a una educación inclusiva.' },
          { claves: ['vamos a ver', 'ya veremos', 'le aviso'], fb: 'Sin acuerdos ni plazos, la reunión no cambia nada.' }
        ],
        modelo: 'Le propongo acuerdos: ubicaré a Kevin cerca de mí, le daré consignas cortas y pausas activas, y coordinaremos con el DECE. En casa, una rutina de tareas por bloques, y nos reunimos en un mes para ver cómo va.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'killa-kichwa': {
    lugar: 'Aula de EGB durante la presentación de estudiantes',
    fondo: 'aula',
    inicio: { confianza: 20, tension: 75 },
    pasos: [
      {
        acciones: [
          { icono: '✋', t: 'Levantar la mano y pedir silencio con calma', p: 2, fb: 'Frenar la burla de inmediato y sin gritos protege a la estudiante y modela respeto.', efecto: { confianza: 8, tension: -10 } },
          { icono: '🗺️', t: 'Señalar en el mapa la comunidad de Killa', p: 2, fb: 'Visibilizar su origen como riqueza cultural convierte la diferencia en saber compartido.', efecto: { confianza: 12, tension: -8 } },
          { icono: '🙈', t: 'Seguir con la lista como si nada', p: 0, fb: 'Ignorar la burla la normaliza y deja sola a la estudiante.', efecto: { confianza: -15, tension: 12 } },
          { icono: '👉', t: 'Señalar la puerta para sacar al que se ría', p: 1, fb: 'Detiene la conducta, pero no trabaja el respeto ni la valoración de la diversidad.', efecto: { confianza: -2, tension: 5 } }
        ],
        conceptos: [
          { n: 'Detiene la burla y pone una norma de respeto', claves: ['respet', 'aqui no nos reimos', 'no nos burlamos', 'burla', 'no esta bien reirse', 'todos merecemos', 'en esta aula', 'alto'] },
          { n: 'Valora la lengua kichwa como saber', claves: ['kichwa', 'dos idiomas', 'dos lenguas', 'bilingue', 'sabe hablar', 'su idioma', 'su lengua', 'riqueza', 'que bonito'] },
          { n: 'Invita a Killa a participar y enseñar', claves: ['nos ensenas', 'ensenanos', 'killa', 'como se dice', 'como se saluda', 'quieres compartir', 'nos puedes', 'bienvenida'] }
        ],
        evitar: [
          { claves: ['habla mal', 'no se le entiende', 'pronuncia mal', 'aprende a hablar'], fb: 'Señalar su pronunciación como error refuerza la discriminación lingüística.' },
          { claves: ['sale del aula', 'fuera del aula', 'castigad', 'silencio todos'], fb: 'El castigo sin reflexión detiene la risa, pero no construye respeto intercultural.' }
        ],
        modelo: 'En esta aula nos respetamos todos. Killa habla kichwa y castellano: ¡sabe dos idiomas! Killa, ¿nos enseñas cómo se saluda en kichwa?'
      },
      {
        acciones: [
          { icono: '🖼️', t: 'Mostrarle tarjetas con imágenes de la consigna', p: 2, fb: 'Los apoyos visuales dan acceso a la tarea sin depender solo del castellano escrito.', efecto: { confianza: 12, tension: -10 } },
          { icono: '🤝', t: 'Sentar a una compañera tutora junto a ella', p: 2, fb: 'La tutoría entre pares favorece la inclusión y el aprendizaje colaborativo.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📝', t: 'Darle una hoja con una tarea más fácil', p: 1, fb: 'Bajar la exigencia sin evaluar su nivel puede limitar sus aprendizajes; primero hay que dar acceso.', efecto: { confianza: 0, tension: -2 } },
          { icono: '☝️', t: 'Señalarle la consigna y repetirla más fuerte', p: 0, fb: 'Repetir más alto no elimina la barrera lingüística y la expone ante el grupo.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Usa apoyos visuales y material concreto', claves: ['imagen', 'dibujo', 'material concreto', 'grafico', 'tarjeta', 'mostrar', 'objeto', 'visual', 'senas'] },
          { n: 'Organiza tutoría entre pares', claves: ['companera', 'companero', 'acompan', 'tutora', 'tutor', 'en parejas', 'te ayude', 'junto a ti', 'grupo'] },
          { n: 'Incorpora su lengua materna', claves: ['kichwa', 'palabras en', 'tu idioma', 'tu lengua', 'como se dice', 'lengua materna', 'en tu lengua', 'bilingue'] }
        ],
        evitar: [
          { claves: ['esfuerzate mas', 'habla castellano', 'solo castellano', 'aqui se habla espanol', 'olvida el kichwa'], fb: 'Exigir abandonar la lengua materna contradice el enfoque intercultural del currículo.' }
        ],
        modelo: 'Killa, mira estas imágenes: aquí está lo que tenemos que hacer. Ana te va a acompañar, y aprendamos juntos cómo se dice en kichwa.'
      },
      {
        acciones: [
          { icono: '📞', t: 'Llamar a un líder de la comunidad para que traduzca', p: 2, fb: 'Contar con un intérprete comunitario garantiza una comunicación real con la familia.', efecto: { confianza: 12, tension: -8 } },
          { icono: '🏡', t: 'Invitar a la familia a una reunión individual', p: 2, fb: 'Una llegada reciente amerita contacto oportuno, cercano e individual.', efecto: { confianza: 10, tension: -8 } },
          { icono: '✉️', t: 'Enviar una nota: "En casa háblenle solo en castellano"', p: 0, fb: 'Desconoce la barrera lingüística y desvaloriza la lengua familiar.', efecto: { confianza: -18, tension: 15 } },
          { icono: '🗓️', t: 'Marcar la reunión general de padres y esperar', p: 1, fb: 'Esperar semanas deja sin acompañamiento a una estudiante recién llegada.', efecto: { confianza: -4, tension: 3 } }
        ],
        conceptos: [
          { n: 'Invita a la familia con trato cercano', claves: ['invit', 'reunion', 'conversar', 'reunirnos', 'visita', 'bienvenid', 'familia', 'papa', 'mama'] },
          { n: 'Garantiza la comunicación con traducción', claves: ['traduc', 'interprete', 'alguien de la comunidad', 'en kichwa', 'su idioma', 'su lengua', 'lider', 'apoyo de'] },
          { n: 'Valora y trae saberes de la comunidad al aula', claves: ['saberes', 'costumbres', 'cultura', 'chakra', 'tradicion', 'conocimiento', 'nos cuenten', 'compartir', 'aprender de ustedes'] }
        ],
        evitar: [
          { claves: ['solo castellano', 'solo en espanol', 'dejen el kichwa', 'no le hablen en kichwa'], fb: 'Pedir que abandonen la lengua familiar desvaloriza su identidad cultural.' }
        ],
        modelo: 'Quisiera invitarles a conversar; vendrá alguien de la comunidad para traducir. Me gustaría conocer los saberes y costumbres de su familia para traerlos al aula.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'senales-violencia': {
    lugar: 'Aula de 4.º EGB vacía, al terminar la clase',
    fondo: 'aula',
    inicio: { confianza: 30, tension: 80 },
    pasos: [
      {
        acciones: [
          { icono: '🧎', t: 'Agacharte a su altura y hablarle con voz suave', p: 2, fb: 'La contención calmada y cercana da seguridad sin presionar a la niña.', efecto: { confianza: 12, tension: -12 } },
          { icono: '🤞', t: 'Hacer el gesto de promesa de guardar el secreto', p: 0, fb: 'No se promete confidencialidad: el docente está obligado a reportar.', efecto: { confianza: 5, tension: 5 } },
          { icono: '🔍', t: 'Tomarle el brazo para revisar los moretones', p: 0, fb: 'Explorar el cuerpo o interrogar puede revictimizar; investigar no es función docente.', efecto: { confianza: -15, tension: 18 } },
          { icono: '🧃', t: 'Ofrecerle agua y un lugar tranquilo para sentarse', p: 2, fb: 'Brindar un espacio seguro y tranquilo es parte de la primera contención.', efecto: { confianza: 8, tension: -10 } }
        ],
        conceptos: [
          { n: 'Agradece la confianza y contiene', claves: ['gracias por confiar', 'gracias por contarme', 'confiar en mi', 'hiciste bien', 'valiente', 'estoy aqui', 'tranquila', 'no es tu culpa'] },
          { n: 'No promete guardar el secreto', claves: ['no puedo prometer', 'no puedo guardar', 'no te puedo prometer', 'tengo que contar', 'personas que pueden ayudar', 'no puedo mantenerlo'] },
          { n: 'Ofrece protección y busca ayuda', claves: ['ayuda', 'cuidarte', 'protegerte', 'estar segura', 'buscar ayuda', 'te voy a ayudar', 'no estas sola', 'segura'] }
        ],
        evitar: [
          { claves: ['te lo prometo', 'prometo no decir', 'sera nuestro secreto', 'no le digo a nadie'], fb: 'Prometer secreto contradice la obligación de reportar y luego rompe la confianza.' },
          { claves: ['quien te hizo', 'quien fue', 'cuentame todo', 'seguro te caiste', 'te caiste jugando'], fb: 'Interrogar o minimizar revictimiza y deja a la niña desprotegida.' }
        ],
        modelo: 'Gracias por confiar en mí. No puedo prometerte guardar el secreto, pero sí que voy a buscar ayuda para cuidarte.'
      },
      {
        acciones: [
          { icono: '🏃', t: 'Ir de inmediato a la oficina del DECE', p: 2, fb: 'Los protocolos del Ministerio de Educación obligan a informar de inmediato al DECE.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🏫', t: 'Avisar en persona a la autoridad del plantel', p: 2, fb: 'La autoridad debe conocer el caso para activar la ruta de actuación el mismo día.', efecto: { confianza: 8, tension: -8 } },
          { icono: '☎️', t: 'Llamar a los padres para preguntar qué pasó', p: 0, fb: 'Confrontar a la familia puede alertar a un posible agresor y aumentar el riesgo.', efecto: { confianza: -15, tension: 18 } },
          { icono: '⏳', t: 'Anotar en tu agenda "observar unos días"', p: 0, fb: 'La demora puede tener consecuencias graves; la obligación es actuar de inmediato.', efecto: { confianza: -12, tension: 15 } }
        ],
        conceptos: [
          { n: 'Informa de inmediato', claves: ['de inmediato', 'inmediatamente', 'ahora mismo', 'hoy mismo', 'urgente', 'enseguida', 'sin esperar', 'ya mismo'] },
          { n: 'Comunica al DECE y a la autoridad', claves: ['dece', 'autoridad', 'rector', 'director', 'inspector', 'consejeria', 'psicolog', 'informo'] },
          { n: 'Activa el protocolo y la ruta de protección', claves: ['protocolo', 'ruta', 'proteccion', 'activar', 'junta', 'fiscalia', 'denuncia', 'medidas'] }
        ],
        evitar: [
          { claves: ['llamo a sus padres', 'preguntar a los padres', 'hablar con la familia', 'confrontar'], fb: 'Contactar a la familia por cuenta propia puede alertar a un posible agresor.' },
          { claves: ['esperar unos dias', 'esperar', 'ver si aparecen', 'mas adelante'], fb: 'Ante una posible violencia la obligación es actuar de inmediato.' }
        ],
        modelo: 'Voy de inmediato a informar a la autoridad del plantel y al DECE para que se active el protocolo y la ruta de protección de Anahí.'
      },
      {
        acciones: [
          { icono: '🕒', t: 'Anotar fecha y hora exactas en el formulario', p: 2, fb: 'Datos precisos dan validez al registro y respaldan la actuación institucional.', efecto: { confianza: 8, tension: -6 } },
          { icono: '💬', t: 'Escribir entre comillas las palabras textuales de Anahí', p: 2, fb: 'Las palabras textuales evitan interpretaciones y protegen el proceso.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🗣️', t: 'Comentar el caso en la sala de profesores', p: 0, fb: 'Vulnera la confidencialidad y el derecho a la intimidad de la niña.', efecto: { confianza: -18, tension: 15 } },
          { icono: '🕵️', t: 'Escribir quién crees que es el agresor', p: 0, fb: 'Las suposiciones no corresponden al registro docente y pueden afectar el proceso.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Registra solo hechos observados', claves: ['hechos', 'lo que observe', 'observado', 'lo que vi', 'moretones', 'objetiv', 'describ', 'sin opiniones', 'sin suposiciones'] },
          { n: 'Usa las palabras textuales y fecha y hora', claves: ['textual', 'sus palabras', 'lo que dijo', 'entre comillas', 'fecha', 'hora', 'exactamente', 'literal'] },
          { n: 'Mantiene la confidencialidad', claves: ['confidencial', 'reservad', 'privad', 'solo al dece', 'intimidad', 'no lo comento', 'resguard', 'proteger su identidad'] }
        ],
        evitar: [
          { claves: ['creo que fue', 'seguro fue', 'el papa', 'el padrastro', 'sospecho de'], fb: 'Las suposiciones sobre el agresor no corresponden al registro docente.' },
          { claves: ['contarle a los profes', 'sala de profesores', 'comentarlo con', 'compartir con otros docentes'], fb: 'Difundir el caso vulnera la confidencialidad y la intimidad de la niña.' }
        ],
        modelo: 'Escribo solo los hechos que observé y las palabras textuales de Anahí, con fecha y hora, sin opiniones; el informe es confidencial y va solo al DECE.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'acoso-grupo': {
    lugar: 'Pasillo de la escuela durante el recreo',
    fondo: 'exterior',
    inicio: { confianza: 45, tension: 65 },
    pasos: [
      {
        acciones: [
          { icono: '📸', t: 'Guardar las capturas como evidencia', p: 2, fb: 'Resguardar la evidencia es necesario para actuar según el Código de Convivencia.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🫂', t: 'Buscar a Nayeli para hablar en privado', p: 2, fb: 'Primero se protege y se escucha a la persona afectada.', efecto: { confianza: 12, tension: -10 } },
          { icono: '📢', t: 'Proyectar las capturas frente a todo el curso', p: 0, fb: 'La exposición pública revictimiza y no resuelve el conflicto.', efecto: { confianza: -18, tension: 18 } },
          { icono: '👋', t: 'Devolverle el celular a Camila y seguir caminando', p: 0, fb: 'El acoso entre estudiantes afecta la convivencia escolar aunque ocurra en redes.', efecto: { confianza: -15, tension: 12 } }
        ],
        conceptos: [
          { n: 'Agradece el aviso', claves: ['gracias', 'hiciste bien', 'que bueno que', 'valiente', 'agradezco', 'bien hecho', 'por avisarme', 'por contarme'] },
          { n: 'Resguarda la evidencia', claves: ['captura', 'evidencia', 'guardar', 'pruebas', 'pantallazo', 'imagen', 'me las envias', 'registro'] },
          { n: 'Protege y escucha a la afectada en privado', claves: ['nayeli', 'en privado', 'hablar con ella', 'como esta', 'protegerla', 'apoyarla', 'cuidar', 'acompanar'] }
        ],
        evitar: [
          { claves: ['no es asunto', 'no es problema de la escuela', 'fuera de la escuela', 'cosas de whatsapp'], fb: 'El acoso en redes entre compañeros sí afecta la convivencia escolar.' },
          { claves: ['frente a todo', 'delante del curso', 'avergonzar', 'leer en voz alta'], fb: 'La exposición pública revictimiza a Nayeli.' }
        ],
        modelo: 'Gracias por avisarme, Camila. Voy a guardar estas capturas como evidencia y hoy mismo hablaré en privado con Nayeli para saber cómo está y protegerla.'
      },
      {
        acciones: [
          { icono: '🚪', t: 'Llevar a Joel a un espacio privado', p: 2, fb: 'Conversar en privado responsabiliza sin humillar.', efecto: { confianza: 8, tension: -8 } },
          { icono: '📱', t: 'Mostrarle a Joel el daño que causaron los memes', p: 2, fb: 'Hacer visible el impacto promueve la empatía, base del enfoque restaurativo.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📕', t: 'Abrir el Código de Convivencia en la falta', p: 1, fb: 'Las medidas deben enmarcarse en el Código, pero acompañadas de reflexión y reparación.', efecto: { confianza: 2, tension: 2 } },
          { icono: '🧾', t: 'Firmarle tú mismo una suspensión', p: 0, fb: 'Las medidas disciplinarias siguen el debido proceso y no las impone un docente solo.', efecto: { confianza: -15, tension: 18 } }
        ],
        conceptos: [
          { n: 'Muestra el daño causado', claves: ['dano', 'afecto', 'como se siente', 'ya no quiere venir', 'lastim', 'imaginate', 'ponte en su lugar', 'consecuencia'] },
          { n: 'Pide que proponga cómo reparar', claves: ['reparar', 'disculpa', 'que propones', 'como puedes', 'arreglar', 'perdon', 'compensar', 'solucion'] },
          { n: 'Acuerda medidas según el Código de Convivencia', claves: ['codigo de convivencia', 'acuerdo', 'medida', 'compromiso', 'normas', 'debido proceso', 'seguimiento', 'reglamento'] }
        ],
        evitar: [
          { claves: ['estas suspendido', 'te suspendo', 'te expulso', 'vas a ver'], fb: 'Un docente no impone sanciones por sí solo; se sigue el debido proceso.' },
          { claves: ['no lo vuelvas a hacer y ya', 'eres un abusivo', 'eres malo'], fb: 'Sin reflexión ni seguimiento, o con etiquetas, la conducta suele repetirse.' }
        ],
        modelo: 'Joel, quiero mostrarte el daño que estos memes le han causado a Nayeli: ya no quiere venir. ¿Qué propones para reparar? Acordaremos medidas según el Código de Convivencia.'
      },
      {
        acciones: [
          { icono: '🗂️', t: 'Entregar un informe escrito al DECE', p: 2, fb: 'La articulación con el DECE garantiza acompañamiento especializado.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🧑‍🏫', t: 'Dirigir una sesión de convivencia digital en clase', p: 2, fb: 'La prevención con todo el curso transforma la cultura del grupo.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🗑️', t: 'Eliminar el grupo de WhatsApp del curso', p: 1, fb: 'Eliminar el canal no cambia las conductas; suelen crear otro grupo.', efecto: { confianza: -2, tension: 2 } },
          { icono: '✅', t: 'Archivar las capturas y dar el caso por cerrado', p: 0, fb: 'El acoso requiere seguimiento sostenido.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Informa al DECE y a las familias', claves: ['dece', 'familias', 'padres', 'representantes', 'informo', 'comunico', 'psicolog', 'reunion con'] },
          { n: 'Trabaja prevención con todo el curso', claves: ['convivencia digital', 'taller', 'sesion', 'todo el curso', 'ciberacoso', 'respeto en redes', 'prevencion', 'charla'] },
          { n: 'Hace seguimiento con plazo', claves: ['seguimiento', 'dos semanas', 'reviso', 'volver a revisar', 'monitore', 'pendiente', 'semanas', 'acompan'] }
        ],
        evitar: [
          { claves: ['caso cerrado', 'ya se resolvio', 'ya paso', 'ya pidio disculpas'], fb: 'El acoso requiere seguimiento sostenido, no basta una disculpa.' }
        ],
        modelo: 'Informaré al DECE y a las familias, haremos una sesión de convivencia digital con todo el curso y revisaré la situación en dos semanas.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'padre-nota': {
    lugar: 'Sala de atención a representantes de la escuela',
    fondo: 'oficina',
    inicio: { confianza: 20, tension: 85 },
    pasos: [
      {
        acciones: [
          { icono: '📋', t: 'Poner sobre la mesa la evaluación de Yaku', p: 2, fb: 'Mostrar el instrumento da transparencia y sustenta la calificación.', efecto: { confianza: 10, tension: -10 } },
          { icono: '📐', t: 'Mostrarle la rúbrica con la que calificaste', p: 2, fb: 'La evaluación se sustenta en criterios conocidos; revisarlos juntos da confianza.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🖊️', t: 'Tachar el 5,50 y escribir un 7', p: 0, fb: 'Modificar una nota sin sustento vulnera la ética profesional y el valor de la evaluación.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🚪', t: 'Abrirle la puerta para que se retire', p: 0, fb: 'Negarse al diálogo escala el conflicto y desconoce el derecho de la familia a ser informada.', efecto: { confianza: -18, tension: 18 } }
        ],
        conceptos: [
          { n: 'Valida la preocupación', claves: ['entiendo', 'comprendo', 'su preocupacion', 'es normal', 'tiene razon en preocuparse', 'le preocupa', 'gracias por venir'] },
          { n: 'Muestra la evaluación y la rúbrica', claves: ['rubrica', 'evaluacion', 'prueba', 'examen', 'criterios', 'le muestro', 'mire', 'instrumento'] },
          { n: 'Propone revisar juntos', claves: ['juntos', 'revisemos', 'revisar', 'veamos', 'analicemos', 'pregunta por pregunta', 'con calma', 'conversemos'] }
        ],
        evitar: [
          { claves: ['le subo', 'le pongo un 7', 'le cambio la nota', 'no se preocupe le subo'], fb: 'Cambiar una nota sin sustento vulnera la ética profesional.' },
          { claves: ['retirese', 'no se cambia', 'no tengo nada que hablar', 'vayase'], fb: 'Negarse al diálogo escala el conflicto.' }
        ],
        modelo: 'Entiendo su preocupación, señor Jorge. Aquí tengo la evaluación de Yaku y la rúbrica con la que la califiqué; revisémosla juntos.'
      },
      {
        acciones: [
          { icono: '📊', t: 'Señalar en la escala de calificaciones el 5,50', p: 2, fb: 'Explicar la escala cualitativa ayuda a la familia a comprender el nivel de logro.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🗓️', t: 'Entregarle el cronograma de refuerzo académico', p: 2, fb: 'La normativa prevé refuerzo académico para quien no alcanza el mínimo de 7.', efecto: { confianza: 12, tension: -10 } },
          { icono: '❌', t: 'Cerrar la carpeta diciendo que ya perdió', p: 0, fb: 'Es incorrecto: existen el refuerzo académico y la recuperación.', efecto: { confianza: -15, tension: 15 } },
          { icono: '📚', t: 'Señalar el libro: "Que estudie más"', p: 1, fb: 'Falta orientar qué aprendizajes reforzar y cómo.', efecto: { confianza: -3, tension: 3 } }
        ],
        conceptos: [
          { n: 'Explica la escala: próximo a alcanzar', claves: ['proximo a alcanzar', 'esta proximo', 'escala', 'paar', 'equivale', 'significa', 'minimo de 7', 'aprendizajes requeridos'] },
          { n: 'Ofrece refuerzo académico', claves: ['refuerzo', 'refuerzo academico', 'recuperacion', 'tutoria', 'clases de apoyo', 'apoyo pedagogico', 'nivelacion'] },
          { n: 'Plan con nueva evaluación', claves: ['plan', 'nueva evaluacion', 'otra oportunidad', 'volver a rendir', 'nueva prueba', 'oportunidad', 'mejorar la nota'] }
        ],
        evitar: [
          { claves: ['ya perdio', 'no puede hacer nada', 'ya no hay nada', 'reprob'], fb: 'Es incorrecto: existen el refuerzo académico y la recuperación.' }
        ],
        modelo: 'El 5,50 significa que Yaku está próximo a alcanzar los aprendizajes requeridos. Tendrá refuerzo académico con un plan y luego una nueva evaluación.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Entregarle por escrito los temas a reforzar', p: 2, fb: 'Orientaciones concretas y escritas permiten que la familia apoye con claridad.', efecto: { confianza: 12, tension: -10 } },
          { icono: '⏱️', t: 'Dibujar una rutina diaria de 20 minutos', p: 2, fb: 'Una rutina breve y viable es sostenible para cualquier familia.', efecto: { confianza: 8, tension: -8 } },
          { icono: '💳', t: 'Darle la tarjeta de un profesor particular', p: 1, fb: 'Una recomendación que no considera la situación económica de la familia no es viable.', efecto: { confianza: -5, tension: 5 } },
          { icono: '👍', t: 'Darle una palmada: "Ya verá cómo sale"', p: 0, fb: 'No ofrece orientación ni seguimiento.', efecto: { confianza: -10, tension: 8 } }
        ],
        conceptos: [
          { n: 'Indica temas concretos por escrito', claves: ['temas', 'por escrito', 'lista', 'le entrego', 'destrezas', 'contenidos', 'ejercicios', 'hoja'] },
          { n: 'Propone una rutina breve en casa', claves: ['rutina', 'minutos', 'diario', 'cada dia', 'horario', 'en casa', 'acompanarlo', 'revisar sus tareas'] },
          { n: 'Acuerda seguimiento', claves: ['seguimiento', 'dos semanas', 'revisamos', 'nos reunimos', 'acordamos', 'avance', 'volvemos a vernos', 'le informo'] }
        ],
        evitar: [
          { claves: ['profesor particular', 'pague un', 'contrate', 'clases privadas'], fb: 'Recomendar gastos sin considerar la situación familiar no es viable.' },
          { claves: ['ya vera', 'no se preocupe', 'ya saldra'], fb: 'Tranquilizar sin orientar no ofrece apoyo real.' }
        ],
        modelo: 'Le entrego por escrito los temas a reforzar y le propongo una rutina de veinte minutos diarios; revisamos el avance en dos semanas.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'directora-plan': {
    lugar: 'Oficina de la Dirección de la escuela',
    fondo: 'oficina',
    inicio: { confianza: 50, tension: 55 },
    pasos: [
      {
        acciones: [
          { icono: '🙂', t: 'Asentir y reconocer la omisión', p: 2, fb: 'Reconocer un error con apertura es actuar con profesionalismo.', efecto: { confianza: 10, tension: -10 } },
          { icono: '✏️', t: 'Anotar en la planificación una adaptación de grado 2', p: 2, fb: 'Para dislexia corresponde una adaptación no significativa en acceso y evaluación.', efecto: { confianza: 12, tension: -8 } },
          { icono: '✂️', t: 'Tachar la mitad de los contenidos para Nayeli', p: 1, fb: 'Reducir contenidos sin evaluación previa sería una adaptación significativa injustificada.', efecto: { confianza: -4, tension: 4 } },
          { icono: '🙄', t: 'Cerrar la carpeta: "Puede hacer lo mismo que todos"', p: 0, fb: 'Desconoce el derecho a adaptaciones curriculares de estudiantes con NEE (LOEI).', efecto: { confianza: -15, tension: 15 } }
        ],
        conceptos: [
          { n: 'Reconoce la omisión', claves: ['tiene razon', 'lo omiti', 'me falto', 'lo olvide', 'reconozco', 'error', 'lo corrijo', 'gracias por'] },
          { n: 'Propone adaptación no significativa', claves: ['adaptacion', 'grado 2', 'no significativa', 'acceso', 'curricular', 'ajuste', 'ajustes razonables'] },
          { n: 'Apoyos concretos para la dislexia', claves: ['voz alta', 'leer en voz', 'apoyo visual', 'evaluacion oral', 'oral', 'letra grande', 'mas tiempo', 'pictogram'] }
        ],
        evitar: [
          { claves: ['lo mismo que los demas', 'igual que todos', 'no necesita', 'no hace falta'], fb: 'Desconoce el derecho a adaptaciones de estudiantes con NEE.' },
          { claves: ['reducir los contenidos', 'la mitad', 'contenidos de un grado inferior'], fb: 'Reducir contenidos sin evaluación previa no se justifica en un caso de dislexia.' }
        ],
        modelo: 'Tiene razón, lo omití. Voy a incluir una adaptación de grado 2 para Nayeli: consignas leídas en voz alta, apoyo visual y evaluación oral.'
      },
      {
        acciones: [
          { icono: '❓', t: 'Escribir preguntas de anticipación al inicio', p: 2, fb: 'Activar conocimientos previos es el primer momento del ciclo ERCA.', efecto: { confianza: 10, tension: -8 } },
          { icono: '👥', t: 'Dibujar en el plan un momento de trabajo en parejas', p: 2, fb: 'El trabajo colaborativo promueve la construcción activa del aprendizaje.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🏠', t: 'Añadir más deberes para la casa', p: 1, fb: 'Las tareas no reemplazan las estrategias activas en el aula.', efecto: { confianza: -3, tension: 3 } },
          { icono: '🤫', t: 'Subrayar "los estudiantes escuchan en silencio"', p: 0, fb: 'Una clase solo expositiva limita la construcción del aprendizaje.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Activa conocimientos previos', claves: ['conocimientos previos', 'preguntas', 'anticipacion', 'lluvia de ideas', 'experiencia', 'que saben', 'motivacion', 'saberes previos'] },
          { n: 'Metodología activa y colaborativa', claves: ['parejas', 'grupos', 'colaborativ', 'trabajo en equipo', 'participa', 'activ', 'manipul', 'construccion'] },
          { n: 'Estructura ERCA con cierre evaluativo', claves: ['erca', 'reflexion', 'conceptualizacion', 'aplicacion', 'consolidacion', 'cierre', 'evaluacion rapida', 'ticket de salida'] }
        ],
        evitar: [
          { claves: ['en silencio', 'solo escuchar', 'que copien', 'dictado'], fb: 'Una clase solo expositiva no responde al modelo constructivista del currículo.' }
        ],
        modelo: 'Agregaré preguntas para activar conocimientos previos, trabajo en parejas y una evaluación rápida al cierre, siguiendo el ciclo ERCA.'
      },
      {
        acciones: [
          { icono: '✅', t: 'Mostrar la lista de cotejo con indicadores', p: 2, fb: 'Un instrumento con indicadores del objetivo produce evidencia válida.', efecto: { confianza: 12, tension: -10 } },
          { icono: '🎯', t: 'Señalar el objetivo junto a cada indicador', p: 2, fb: 'La coherencia objetivo–indicador–instrumento es clave en la evaluación formativa.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📆', t: 'Señalar en el calendario la prueba trimestral', p: 1, fb: 'La evaluación sumativa no informa a tiempo sobre el logro de una clase.', efecto: { confianza: -3, tension: 3 } },
          { icono: '👀', t: 'Encogerte de hombros: "Se les ve en la cara"', p: 0, fb: 'La evaluación requiere evidencias e instrumentos.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Evaluación formativa durante la clase', claves: ['formativa', 'durante la clase', 'preguntas orales', 'al cierre', 'retroaliment', 'en el momento', 'proceso'] },
          { n: 'Instrumento: lista de cotejo', claves: ['lista de cotejo', 'rubrica', 'instrumento', 'registro', 'escala', 'cotejo', 'registrar'] },
          { n: 'Indicadores coherentes con el objetivo', claves: ['indicador', 'objetivo', 'criterio', 'coherente', 'evidencia', 'destreza', 'logro'] }
        ],
        evitar: [
          { claves: ['en la cara', 'se nota', 'intuicion', 'me doy cuenta'], fb: 'La percepción no es evidencia; se necesitan instrumentos.' },
          { claves: ['prueba trimestral', 'examen final', 'fin de trimestre'], fb: 'La evaluación sumativa llega tarde para valorar esta clase.' }
        ],
        modelo: 'Con una evaluación formativa: haré preguntas orales al cierre y las registraré en una lista de cotejo con indicadores del objetivo.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'nayeli-prueba': {
    lugar: 'Aula de Lengua, al entregar la prueba escrita',
    fondo: 'aula',
    inicio: { confianza: 35, tension: 65 },
    pasos: [
      {
        acciones: [
          { icono: '😊', t: 'Sonreírle y felicitarla por intentarlo', p: 2, fb: 'Reconocer el esfuerzo protege su autoestima ante la dificultad lectora.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🗣️', t: 'Leerle en voz alta las preguntas en blanco', p: 2, fb: 'La evaluación oral permite valorar el aprendizaje sin que la lectura sea una barrera.', efecto: { confianza: 12, tension: -10 } },
          { icono: '⏲️', t: 'Darle 10 minutos más para leer sola', p: 1, fb: 'Más tiempo ayuda, pero no elimina la barrera de lectura.', efecto: { confianza: 3, tension: -2 } },
          { icono: '🖍️', t: 'Marcar con cero las preguntas en blanco', p: 0, fb: 'Se mide la dificultad lectora, no el aprendizaje evaluado.', efecto: { confianza: -15, tension: 15 } }
        ],
        conceptos: [
          { n: 'Reconoce su esfuerzo', claves: ['bien hecho', 'lo intentaste', 'hiciste bien', 'esfuerzo', 'tranquila', 'no te preocupes', 'muy bien', 'valiente'] },
          { n: 'Ofrece responder oralmente', claves: ['oral', 'te leo', 'en voz alta', 'te pregunto', 'me respondes', 'dime la respuesta', 'leamos juntas', 'contestar hablando'] },
          { n: 'Separa la lectura de lo aprendido', claves: ['lo que sabes', 'lo que aprendiste', 'demostrar', 'las letras', 'no es tu culpa', 'barrera', 'tu sabes'] }
        ],
        evitar: [
          { claves: ['cero', 'sin nota', 'no contestaste', 'debiste leer'], fb: 'Calificar en blanco mide la dificultad lectora, no el aprendizaje.' },
          { claves: ['lee mas rapido', 'esfuerzate', 'pon atencion', 'eres lenta'], fb: 'Culpar a la estudiante desconoce la dislexia y la desmotiva.' }
        ],
        modelo: 'Hiciste muy bien en intentarlo, Nayeli. Te leo las preguntas que quedaron en blanco y me respondes oralmente; así demuestras lo que sabes.'
      },
      {
        acciones: [
          { icono: '🔠', t: 'Imprimir la prueba con letra grande', p: 2, fb: 'Ajustar el formato es una adaptación de acceso que no cambia los aprendizajes.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📄', t: 'Repartir menos texto por página', p: 2, fb: 'Reducir la carga visual facilita la lectura en estudiantes con dislexia.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📗', t: 'Sacar una prueba de un grado inferior', p: 0, fb: 'Sería una adaptación significativa sin justificación: sus destrezas están conservadas.', efecto: { confianza: -12, tension: 10 } },
          { icono: '📑', t: 'Fotocopiar la misma prueba para todos', p: 0, fb: 'La equidad exige ajustar la evaluación a las necesidades.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Ajusta el formato de la prueba', claves: ['letra grande', 'menos texto', 'formato', 'espaciad', 'tipografia', 'fuente', 'menos preguntas por pagina', 'imagenes'] },
          { n: 'Consignas leídas y respuesta oral', claves: ['voz alta', 'leidas', 'leer las consignas', 'oral', 'responder hablando', 'grabar', 'te las leo'] },
          { n: 'Mantiene los mismos aprendizajes (grado 2)', claves: ['mismos aprendizajes', 'aprendizajes evaluados', 'mismas destrezas', 'grado 2', 'no significativa', 'misma exigencia', 'mismo contenido', 'acceso'] }
        ],
        evitar: [
          { claves: ['grado inferior', 'mas facil', 'contenidos de otro grado', 'bajar el nivel'], fb: 'Bajar contenidos sería una adaptación significativa injustificada.' },
          { claves: ['la misma prueba', 'igual para todos', 'ser justo con todos'], fb: 'La equidad exige ajustar la evaluación, no uniformarla.' }
        ],
        modelo: 'Prepararé una versión con letra grande, menos texto por página y consignas leídas en voz alta, con opción de responder oralmente; los aprendizajes evaluados serán los mismos.'
      },
      {
        acciones: [
          { icono: '🗒️', t: 'Registrar la adaptación en tu planificación', p: 2, fb: 'Documentar la adaptación asegura su continuidad y respaldo institucional.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📞', t: 'Llamar a la familia para contarles el ajuste', p: 2, fb: 'La familia debe conocer y acompañar las adaptaciones.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🏢', t: 'Enviar un correo al DECE para coordinar', p: 2, fb: 'El DECE articula las adaptaciones con todo el equipo docente.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📣', t: 'Anunciar al curso la dificultad de Nayeli', p: 0, fb: 'La información de NEE es confidencial.', efecto: { confianza: -18, tension: 15 } }
        ],
        conceptos: [
          { n: 'Documenta la adaptación', claves: ['registro', 'planificacion', 'document', 'por escrito', 'anoto', 'expediente', 'dejo constancia'] },
          { n: 'Informa a la familia', claves: ['familia', 'padres', 'mama', 'papa', 'representante', 'informo', 'reunion'] },
          { n: 'Coordina con el DECE y docentes', claves: ['dece', 'coordino', 'otros docentes', 'equipo', 'psicolog', 'tutor', 'continuidad'] }
        ],
        evitar: [
          { claves: ['a todo el curso', 'contar a todos', 'anunciar', 'decirle a los companeros'], fb: 'La información sobre NEE es confidencial.' },
          { claves: ['a nadie', 'es un ajuste mio', 'no hace falta informar'], fb: 'Sin registro ni coordinación, la adaptación no tiene continuidad.' }
        ],
        modelo: 'Registraré la adaptación en mi planificación, informaré a la familia y coordinaré con el DECE para que todos los docentes la apliquen.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  'proyecto-residuos': {
    lugar: 'Patio de la escuela después del recreo',
    fondo: 'comunidad',
    inicio: { confianza: 55, tension: 40 },
    pasos: [
      {
        acciones: [
          { icono: '👁️', t: 'Recorrer el patio y anotar los residuos que ves', p: 2, fb: 'La observación sistemática aporta datos reales para el diagnóstico.', efecto: { confianza: 10, tension: -6 } },
          { icono: '📋', t: 'Diseñar una encuesta corta para estudiantes y familias', p: 2, fb: 'Consultar a la comunidad identifica necesidades y percepciones.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🛒', t: 'Pedir por teléfono tachos de reciclaje ya', p: 1, fb: 'Actuar sin diagnóstico puede resolver el problema equivocado.', efecto: { confianza: -3, tension: 4 } },
          { icono: '🖨️', t: 'Imprimir el proyecto de otra escuela', p: 0, fb: 'Copiar un proyecto ignora las necesidades del contexto local.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Empieza por un diagnóstico', claves: ['diagnostico', 'identificar el problema', 'necesidades', 'problema real', 'investigar', 'conocer la situacion', 'linea base'] },
          { n: 'Observación sistemática', claves: ['observ', 'recorrido', 'una semana', 'registrar', 'contar', 'patio', 'datos'] },
          { n: 'Consulta a la comunidad', claves: ['encuesta', 'entrevista', 'preguntar', 'estudiantes', 'familias', 'consulta', 'opinion'] }
        ],
        evitar: [
          { claves: ['lo mismo que otra', 'copiar', 'igual que en otra escuela'], fb: 'Copiar un proyecto ignora las necesidades locales.' },
          { claves: ['compramos tachos', 'comprar tachos', 'de inmediato compr'], fb: 'Actuar sin diagnóstico puede resolver el problema equivocado.' }
        ],
        modelo: 'Empezaría por un diagnóstico: observaríamos el patio durante una semana y haríamos una encuesta corta a estudiantes y familias.'
      },
      {
        acciones: [
          { icono: '🎯', t: 'Escribir en la pizarra un objetivo con meta y plazo', p: 2, fb: 'Un objetivo específico, medible y con plazo permite evaluar el proyecto.', efecto: { confianza: 12, tension: -8 } },
          { icono: '📈', t: 'Graficar el 60 % de botellas como línea base', p: 2, fb: 'Partir de la línea base hace medible el avance.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🚫', t: 'Pegar un cartel "Prohibido botellas"', p: 1, fb: 'Confunde la acción con el objetivo.', efecto: { confianza: -3, tension: 4 } },
          { icono: '🌍', t: 'Escribir solo "Cuidar el medio ambiente"', p: 0, fb: 'Un objetivo vago no se puede evaluar.', efecto: { confianza: -10, tension: 8 } }
        ],
        conceptos: [
          { n: 'Meta medible', claves: ['reducir', 'por ciento', 'porcentaje', '30', 'cantidad', 'medible', 'disminuir', 'meta'] },
          { n: 'Plazo definido', claves: ['meses', 'tres meses', 'plazo', 'hasta', 'trimestre', 'semanas', 'fecha'] },
          { n: 'Foco en botellas y actores', claves: ['botellas', 'plastic', 'bar', 'estudiantes', 'familias', 'patio', 'con la comunidad'] }
        ],
        evitar: [
          { claves: ['cuidar el medio ambiente', 'salvar el planeta', 'ser ecologicos'], fb: 'Un objetivo vago no se puede medir ni evaluar.' }
        ],
        modelo: 'El objetivo sería reducir en un 30 % las botellas plásticas desechadas en el patio en tres meses, junto con estudiantes, familias y el bar.'
      },
      {
        acciones: [
          { icono: '👨‍👩‍👧', t: 'Convocar a las familias a un taller', p: 2, fb: 'Involucrar a las familias hace el proyecto sostenible y formativo.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🌱', t: 'Marcar en el patio el espacio para huerto y compost', p: 2, fb: 'El huerto escolar vincula aprendizaje, ambiente y comunidad.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🧹', t: 'Asignar todas las tareas solo a los docentes', p: 0, fb: 'Sin participación estudiantil ni comunitaria se pierde el valor formativo del proyecto.', efecto: { confianza: -12, tension: 10 } },
          { icono: '📨', t: 'Imprimir solo una circular para las familias', p: 1, fb: 'Informar no es lo mismo que involucrar.', efecto: { confianza: -3, tension: 2 } }
        ],
        conceptos: [
          { n: 'Participación de familias y comunidad', claves: ['talleres', 'taller', 'familias', 'comunidad', 'padres', 'minga', 'vecinos', 'involucr'] },
          { n: 'Acciones concretas y sostenibles', claves: ['huerto', 'compost', 'acuerdo con el bar', 'bar', 'reutiliz', 'reciclaje', 'botellas reutilizables', 'tomatodo'] },
          { n: 'Protagonismo estudiantil con datos', claves: ['estudiantes registran', 'registr', 'datos', 'cada semana', 'monitore', 'seguimiento', 'brigada', 'medir'] }
        ],
        evitar: [
          { claves: ['solo los docentes', 'lo hacemos nosotros', 'para que salga rapido'], fb: 'Sin participación estudiantil se pierde el valor formativo.' },
          { claves: ['solo una circular', 'mandamos una circular', 'solo informar'], fb: 'Informar no es lo mismo que involucrar.' }
        ],
        modelo: 'Haremos talleres para familias, un huerto escolar con compost y acuerdos con el bar; los estudiantes registrarán los datos cada semana.'
      }
    ]
  }
});
