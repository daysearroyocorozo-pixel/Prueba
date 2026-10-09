/* Casos vivos – Control de Incendios: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {
  'orden-insegura': {
    lugar: 'Exterior de una bodega en llamas, junto al puesto de comando',
    fondo: 'emergencia',
    inicio: { confianza: 45, tension: 80 },
    pasos: [
      {
        acciones: [
          { icono: '🧯', t: 'Tender la línea de respaldo mientras se enfría la puerta', p: 2, fb: 'La línea de respaldo protege al binomio de ingreso; enfriar desde la puerta controla el fuego mientras se arma.', efecto: { confianza: 8, tension: -8 } },
          { icono: '📻', t: 'Informar por radio al oficial el riesgo sin respaldo', p: 2, fb: 'Comunicar la condición insegura por la cadena de mando es el canal correcto dentro del SCI.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🏃', t: 'Entrar de inmediato sin línea de respaldo', p: 0, fb: 'Ingresar sin línea de respaldo expone la vida del binomio; la obediencia no exime de advertir un riesgo grave.', efecto: { confianza: -5, tension: 18 } },
          { icono: '📢', t: 'Gritar la negativa frente a todo el equipo', p: 1, fb: 'La preocupación es válida, pero gritar rompe la cadena de mando y la coordinación de la escena.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Expresa el riesgo con respeto al superior', claves: ['mi teniente', 'riesgo', 'peligro', 'insegur', 'no es seguro', 'con respeto', 'arriesgad'] },
          { n: 'Señala la falta de línea de respaldo', claves: ['linea de respaldo', 'respaldo', 'segunda linea', 'linea de apoyo', 'proteccion del binomio', 'sin linea', 'manguera de respaldo'] },
          { n: 'Propone una alternativa rápida y viable', claves: ['propongo', 'sugiero', 'dos minutos', 'enfriar', 'enfriamos', 'desde la puerta', 'mientras armamos', 'alternativa', 'rapido'] }
        ],
        evitar: [
          { claves: ['no me da la gana', 'hagalo usted', 'entre usted', 'cobarde', 'me vale'], fb: 'El desafío o la insubordinación no resuelven el riesgo y rompen la cadena de mando.' },
          { claves: ['entro sin decir nada', 'las ordenes no se discuten', 'entramos igual', 'obedezco sin'], fb: 'Callar ante un riesgo grave para la vida no es disciplina: debes advertirlo.' }
        ],
        modelo: 'Mi teniente, con respeto: sin línea de respaldo el riesgo para el binomio es alto. Propongo armarla en dos minutos mientras enfriamos desde la puerta.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Anotar los hechos y horas para el análisis posterior', p: 2, fb: 'Registrar hechos objetivos permite llevar el caso al análisis posterior a la acción sin ataques personales.', efecto: { confianza: 6, tension: -6 } },
          { icono: '🗣️', t: 'Pedir turno en la reunión de análisis posterior', p: 2, fb: 'El análisis posterior a la acción es el espacio institucional para convertir lo ocurrido en lección aprendida.', efecto: { confianza: 8, tension: -5 } },
          { icono: '📱', t: 'Publicar lo ocurrido en redes sociales', p: 0, fb: 'Exponer públicamente a compañeros vulnera la ética profesional y genera un conflicto institucional.', efecto: { confianza: -18, tension: 18 } },
          { icono: '🤐', t: 'Guardar silencio y volver a la estación', p: 1, fb: 'Sin retroalimentación el mismo error puede repetirse en la próxima emergencia.', efecto: { confianza: 0, tension: 4 } }
        ],
        conceptos: [
          { n: 'Lleva el caso al análisis posterior a la acción', claves: ['analisis posterior', 'reunion de analisis', 'despues de la accion', 'debriefing', 'reunion posterior', 'revision posterior', 'evaluacion posterior'] },
          { n: 'Se basa en hechos, sin ataques personales', claves: ['hechos', 'objetiv', 'sin ataques', 'sin culpar', 'sin senalar', 'no es personal', 'respetuos'] },
          { n: 'Busca una lección aprendida y mejorar el procedimiento', claves: ['leccion aprendida', 'lecciones', 'mejorar', 'ajustar el procedimiento', 'procedimiento', 'que no se repita', 'aprender'] }
        ],
        evitar: [
          { claves: ['redes sociales', 'facebook', 'tiktok', 'publicar', 'subirlo'], fb: 'Exponer a compañeros en redes vulnera la ética profesional.' },
          { claves: ['no digo nada', 'me quedo callado', 'olvidarlo', 'dejarlo asi'], fb: 'Callar impide que el procedimiento mejore y el riesgo se repite.' }
        ],
        modelo: 'Lo voy a plantear en la reunión de análisis posterior a la acción, con los hechos y sin ataques personales, para que sea una lección aprendida y ajustemos el procedimiento.'
      },
      {
        acciones: [
          { icono: '📘', t: 'Consultar los procedimientos operativos del cuerpo de bomberos', p: 2, fb: 'Los procedimientos operativos normalizados priorizan la seguridad del personal en toda intervención.', efecto: { confianza: 6, tension: -5 } },
          { icono: '⚖️', t: 'Citar la normativa de seguridad y salud en el trabajo', p: 2, fb: 'La normativa de seguridad y salud ocupacional respalda advertir y evitar un riesgo grave para el trabajador.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🚦', t: 'Mostrar el código de tránsito', p: 0, fb: 'El código de tránsito no corresponde al ámbito de una intervención de incendio.', efecto: { confianza: -8, tension: 6 } },
          { icono: '🤷', t: 'Encogerse de hombros: es solo opinión personal', p: 0, fb: 'Existen normas y procedimientos que respaldan la seguridad; no es una opinión.', efecto: { confianza: -6, tension: 4 } }
        ],
        conceptos: [
          { n: 'Cita la normativa de seguridad y salud en el trabajo', claves: ['seguridad y salud', 'salud ocupacional', 'seguridad ocupacional', 'riesgos laborales', 'normativa de seguridad', 'reglamento de seguridad', 'sst'] },
          { n: 'Menciona los procedimientos operativos del cuerpo de bomberos', claves: ['procedimiento operativo', 'procedimientos operativos', 'protocolo', 'cuerpo de bomberos', 'reglamento interno', 'nfpa', 'procedimiento normalizado'] },
          { n: 'Afirma que la seguridad del personal es prioridad', claves: ['seguridad del personal', 'prioridad', 'primero la seguridad', 'nuestra seguridad', 'vida del bombero', 'integridad', 'principio'] }
        ],
        evitar: [
          { claves: ['codigo de transito', 'ninguna norma', 'es mi opinion', 'no hay norma'], fb: 'La seguridad del personal está respaldada por normas y procedimientos, no por opiniones.' }
        ],
        modelo: 'Me respaldan la normativa de seguridad y salud en el trabajo y los procedimientos operativos del cuerpo de bomberos, que ponen la seguridad del personal como prioridad.'
      }
    ]
  },

  'estres-companero': {
    lugar: 'Sala de descanso de la estación de bomberos, en la noche',
    fondo: 'oficina',
    inicio: { confianza: 35, tension: 70 },
    pasos: [
      {
        acciones: [
          { icono: '🪑', t: 'Sentarse a su lado en un lugar tranquilo', p: 2, fb: 'Crear un espacio privado y calmado facilita la escucha activa, base de los primeros auxilios psicológicos.', efecto: { confianza: 10, tension: -8 } },
          { icono: '☕', t: 'Ofrecerle agua o un café y escucharlo', p: 2, fb: 'Atender necesidades básicas y escuchar sin juzgar transmite apoyo.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🍺', t: 'Invitarlo a tomar unas cervezas', p: 0, fb: 'El alcohol empeora el estrés postraumático y el insomnio.', efecto: { confianza: -4, tension: 10 } },
          { icono: '👋', t: 'Darle una palmada y cambiar de tema', p: 0, fb: 'Minimizar lo que siente lo lleva a cerrarse y no pedir ayuda.', efecto: { confianza: -10, tension: 8 } }
        ],
        conceptos: [
          { n: 'Escucha activamente y abre el diálogo', claves: ['te escucho', 'escuchar', 'quieres contarme', 'cuentame', 'quieres hablar', 'aqui estoy', 'como te sientes'] },
          { n: 'Valida la reacción como normal', claves: ['es normal', 'reaccion normal', 'es entendible', 'es comprensible', 'cualquiera', 'logico que', 'natural'] },
          { n: 'No juzga ni minimiza', claves: ['sin juzgar', 'no te juzgo', 'muy fuerte', 'fue duro', 'fue dificil', 'lo que vivimos', 'tienes derecho'] }
        ],
        evitar: [
          { claves: ['ya pasara', 'somos fuertes', 'no llores', 'superalo', 'no es para tanto'], fb: 'Minimizar el malestar impide que tu compañero pida ayuda.' },
          { claves: ['cerveza', 'trago', 'tomate algo', 'emborrach'], fb: 'El alcohol agrava los síntomas de estrés postraumático.' }
        ],
        modelo: 'Te escucho, compañero. Lo que sientes es una reacción normal ante algo muy fuerte. ¿Quieres contarme cómo te has sentido?'
      },
      {
        acciones: [
          { icono: '📞', t: 'Contactar juntos al psicólogo institucional', p: 2, fb: 'Si los síntomas persisten, derivar a apoyo profesional es clave para prevenir el estrés postraumático.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🤝', t: 'Ofrecer acompañarlo a la primera cita', p: 2, fb: 'Acompañar reduce la barrera para buscar ayuda.', efecto: { confianza: 8, tension: -6 } },
          { icono: '👉', t: 'Señalar los errores que cometió en el rescate', p: 0, fb: 'Reforzar la culpa agrava el malestar.', efecto: { confianza: -15, tension: 15 } },
          { icono: '📺', t: 'Encender la televisión para distraerlo', p: 1, fb: 'Evitar no resuelve; necesita procesar la experiencia.', efecto: { confianza: -2, tension: 2 } }
        ],
        conceptos: [
          { n: 'Alivia la culpa: hizo todo lo posible', claves: ['todo lo posible', 'hiciste lo que', 'no fue tu culpa', 'no es tu culpa', 'diste todo', 'hicimos todo', 'no dependia de ti'] },
          { n: 'Deriva a apoyo psicológico profesional', claves: ['psicolog', 'profesional', 'apoyo psicologico', 'salud mental', 'especialista', 'terapia', 'consejer'] },
          { n: 'Ofrece acompañarlo', claves: ['acompanarte', 'te acompano', 'voy contigo', 'contigo', 'no estas solo', 'ir juntos', 'cuenta conmigo'] }
        ],
        evitar: [
          { claves: ['te equivocaste', 'fue tu culpa', 'pudiste hacer mas', 'la cagaste'], fb: 'Reforzar la culpa empeora su estado emocional.' },
          { claves: ['no pienses en eso', 'olvidalo', 'ya fue'], fb: 'Evitar el tema no permite procesar la experiencia.' }
        ],
        modelo: 'Hiciste todo lo posible, no fue tu culpa. Te propongo hablar con el psicólogo institucional, y si quieres te acompaño.'
      },
      {
        acciones: [
          { icono: '👥', t: 'Convocar al equipo a una sesión de defusing', p: 2, fb: 'Las sesiones posincidente crítico previenen el desgaste emocional del equipo.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📋', t: 'Pegar en la cartelera pautas de autocuidado', p: 1, fb: 'La información ayuda, pero debe acompañarse de espacios de conversación.', efecto: { confianza: 3, tension: -2 } },
          { icono: '🗓️', t: 'Conversar con él un ajuste temporal de funciones', p: 2, fb: 'Un ajuste de funciones puede ayudar si se acuerda con la persona y no se vive como castigo.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🚫', t: 'Retirarlo de la guardia sin explicarle', p: 0, fb: 'Sin diálogo, la medida se percibe como castigo y aumenta el aislamiento.', efecto: { confianza: -14, tension: 14 } }
        ],
        conceptos: [
          { n: 'Organiza una sesión grupal posincidente', claves: ['defusing', 'desactivacion', 'sesion grupal', 'debriefing', 'reunion del equipo', 'incidente critico', 'posincidente', 'espacio grupal'] },
          { n: 'Promueve el autocuidado', claves: ['autocuidado', 'descanso', 'dormir', 'alimentacion', 'ejercicio', 'cuidarnos', 'pausas'] },
          { n: 'Asume el bienestar del equipo como responsabilidad del líder', claves: ['bienestar', 'salud mental del equipo', 'responsabilidad', 'como lider', 'cuidar al equipo', 'apoyo mutuo', 'seguimiento'] }
        ],
        evitar: [
          { claves: ['cada quien', 'no es mi problema', 'que se aguante', 'que lo resuelva solo'], fb: 'El bienestar del equipo es responsabilidad del liderazgo.' },
          { claves: ['lo saco de la guardia', 'lo retiro', 'lo suspendo'], fb: 'Cualquier ajuste de funciones debe conversarse con él, no imponerse.' }
        ],
        modelo: 'Como líder de guardia voy a proponer una sesión grupal de desactivación después de los incidentes críticos y promover el autocuidado, porque el bienestar del equipo es mi responsabilidad.'
      }
    ]
  },

  'inspeccion': {
    lugar: 'Interior de una discoteca durante la inspección de seguridad',
    fondo: 'obra',
    inicio: { confianza: 55, tension: 45 },
    pasos: [
      {
        acciones: [
          { icono: '📸', t: 'Fotografiar los extintores vencidos y la salida bloqueada', p: 2, fb: 'La evidencia objetiva sustenta cada observación de la inspección.', efecto: { confianza: 4, tension: 4 } },
          { icono: '🚪', t: 'Mostrarle la salida de emergencia bloqueada', p: 2, fb: 'Explicar el hallazgo en sitio ayuda a que el propietario entienda el riesgo para las personas.', efecto: { confianza: 6, tension: 2 } },
          { icono: '✅', t: 'Firmar el acta sin observaciones', p: 0, fb: 'Omitir hallazgos pone en riesgo vidas y es una falta del inspector.', efecto: { confianza: 8, tension: -10 } },
          { icono: '🔒', t: 'Colocar sellos de clausura sin explicar', p: 1, fb: 'Toda medida debe sustentarse y seguir el procedimiento establecido.', efecto: { confianza: -15, tension: 18 } }
        ],
        conceptos: [
          { n: 'Enumera las tres observaciones encontradas', claves: ['extintor', 'vencid', 'salida de emergencia', 'bloquead', 'cajas', 'luces de emergencia', 'iluminacion de emergencia', 'tres observaciones'] },
          { n: 'Explica el riesgo para las personas', claves: ['riesgo', 'peligro', 'evacuar', 'evacuacion', 'atrapad', 'vidas', 'personas', 'tragedia'] },
          { n: 'Comunica de forma objetiva y respetuosa', claves: ['le explico', 'observaciones', 'hallazgos', 'objetiv', 'normativa', 'no esta todo bien', 'debo informarle'] }
        ],
        evitar: [
          { claves: ['si todo bien', 'todo en orden', 'no hay problema', 'esta perfecto'], fb: 'Ocultar hallazgos pone en riesgo vidas.' },
          { claves: ['lo clausuro ya', 'le cierro el local', 'se acabo su negocio'], fb: 'Una clausura debe sustentarse y seguir el procedimiento.' }
        ],
        modelo: 'Señor Ramírez, encontré tres observaciones: extintores vencidos, la salida de emergencia bloqueada con cajas y luces de emergencia que no funcionan. Si hay un incendio, la gente no podría evacuar a tiempo.'
      },
      {
        acciones: [
          { icono: '✋', t: 'Rechazar el dinero con un gesto firme y cortés', p: 2, fb: 'Rechazar cualquier dádiva protege la integridad de la inspección; aceptarla es corrupción.', efecto: { confianza: 2, tension: 6 } },
          { icono: '📄', t: 'Continuar llenando el acta de inspección', p: 2, fb: 'Seguir el procedimiento demuestra que la inspección no es negociable.', efecto: { confianza: 3, tension: 2 } },
          { icono: '💵', t: 'Aceptar el dinero y anotar igual las observaciones', p: 0, fb: 'Aceptar cualquier dádiva es una falta ética y legal, aunque se registren los hallazgos.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🙈', t: 'Guardar el dinero y romper el acta', p: 0, fb: 'Es un acto de corrupción que deja el riesgo intacto.', efecto: { confianza: 15, tension: -15 } }
        ],
        conceptos: [
          { n: 'Rechaza el ofrecimiento con respeto', claves: ['no puedo aceptar', 'no acepto', 'rechazo', 'muchas gracias pero', 'no es necesario', 'no recibo', 'le agradezco'] },
          { n: 'Reconoce que aceptar sería corrupción o falta ética', claves: ['corrupcion', 'soborno', 'etica', 'ilegal', 'delito', 'coima', 'dadiva', 'integridad'] },
          { n: 'Continúa con el procedimiento', claves: ['continuo', 'continuamos', 'procedimiento', 'seguimos con la inspeccion', 'el informe', 'acta', 'debo registrar'] }
        ],
        evitar: [
          { claves: ['si acepto', 'lo acepto', 'gracias por el almuerzo', 'esta bien lo dejamos', 'cuanto me da'], fb: 'Aceptar dádivas es corrupción y vulnera la ética profesional.' }
        ],
        modelo: 'Le agradezco, pero no puedo aceptar nada; eso sería un acto de corrupción. Continuamos con el procedimiento de inspección.'
      },
      {
        acciones: [
          { icono: '📑', t: 'Entregar el informe técnico con las observaciones', p: 2, fb: 'Un informe escrito con hallazgos y acciones correctivas permite el seguimiento.', efecto: { confianza: 6, tension: -6 } },
          { icono: '📅', t: 'Fijar en el calendario la fecha de reinspección', p: 2, fb: 'El plazo de reinspección asegura que las correcciones se cumplan según la normativa local.', efecto: { confianza: 5, tension: -4 } },
          { icono: '🧾', t: 'Darle la tarjeta de su propio negocio de extintores', p: 0, fb: 'Recomendar tu propio negocio es un conflicto de intereses.', efecto: { confianza: -8, tension: 6 } },
          { icono: '🚶', t: 'Irse diciendo que lo arregle cuando pueda', p: 0, fb: 'Sin plazos ni seguimiento, el riesgo continúa.', efecto: { confianza: 2, tension: -2 } }
        ],
        conceptos: [
          { n: 'Entrega un informe técnico escrito', claves: ['informe tecnico', 'informe', 'por escrito', 'acta', 'documento', 'notificacion', 'reporte'] },
          { n: 'Detalla las acciones correctivas', claves: ['correctiv', 'recargar', 'cambiar los extintores', 'despejar la salida', 'reparar las luces', 'corregir', 'mantenimiento'] },
          { n: 'Fija un plazo de reinspección según la normativa', claves: ['plazo', 'reinspeccion', 'nueva inspeccion', 'dias', 'fecha', 'seguimiento', 'normativa local', 'ordenanza'] }
        ],
        evitar: [
          { claves: ['cuando pueda', 'algun dia', 'no hay apuro'], fb: 'Sin plazos ni seguimiento, el riesgo continúa.' },
          { claves: ['compre en mi negocio', 'yo le vendo', 'mi empresa', 'le hago precio'], fb: 'Ofrecer tus propios productos o servicios es un conflicto de intereses.' }
        ],
        modelo: 'Le entrego el informe técnico con las observaciones y las acciones correctivas: recargar los extintores, despejar la salida y reparar las luces. Tiene un plazo según la ordenanza y luego haremos la reinspección.'
      }
    ]
  },

  'coordinacion': {
    lugar: 'Zona de un deslizamiento de tierra con dos viviendas afectadas',
    fondo: 'exterior',
    inicio: { confianza: 40, tension: 75 },
    pasos: [
      {
        acciones: [
          { icono: '⛺', t: 'Instalar un único puesto de comando visible', p: 2, fb: 'Un solo puesto de comando concentra la coordinación interinstitucional según el SCI.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🤝', t: 'Reunir a un representante de cada institución', p: 2, fb: 'El comando unificado integra a Bomberos, Policía, Cruz Roja y GAD con objetivos comunes.', efecto: { confianza: 10, tension: -8 } },
          { icono: '☝️', t: 'Ordenar a todos que obedezcan a los bomberos', p: 0, fb: 'La imposición rompe la coordinación interinstitucional.', efecto: { confianza: -15, tension: 15 } },
          { icono: '↔️', t: 'Separar la zona para que cada institución trabaje sola', p: 1, fb: 'Sin coordinación se duplican esfuerzos y aumentan los riesgos.', efecto: { confianza: -5, tension: 8 } }
        ],
        conceptos: [
          { n: 'Propone un comando unificado', claves: ['comando unificado', 'mando unificado', 'sistema de comando', 'sci', 'coordinemos', 'trabajar juntos', 'coordinacion'] },
          { n: 'Incluye un representante por institución', claves: ['representante', 'cada institucion', 'policia', 'cruz roja', 'gad', 'municipio', 'todas las instituciones'] },
          { n: 'Define objetivos comunes y un solo puesto de comando', claves: ['objetivos comunes', 'mismos objetivos', 'un solo puesto', 'puesto de comando', 'plan de accion', 'objetivo comun', 'centro de mando'] }
        ],
        evitar: [
          { claves: ['nosotros mandamos', 'obedecen', 'los bomberos mandamos', 'aqui mando yo'], fb: 'Imponer autoridad rompe la coordinación interinstitucional.' },
          { claves: ['cada uno por su lado', 'por separado', 'cada quien lo suyo'], fb: 'Trabajar por separado duplica esfuerzos y aumenta los riesgos.' }
        ],
        modelo: 'Capitán, propongo un comando unificado: un representante de cada institución, objetivos comunes y un solo puesto de comando aquí.'
      },
      {
        acciones: [
          { icono: '🚧', t: 'Señalar con cinta el perímetro de seguridad', p: 2, fb: 'El aislamiento del perímetro protege a la población y al personal, y es competencia policial.', efecto: { confianza: 8, tension: -5 } },
          { icono: '🚓', t: 'Asignar a la Policía el control del tránsito', p: 2, fb: 'Cada institución asume funciones según su competencia.', efecto: { confianza: 8, tension: -4 } },
          { icono: '⛏️', t: 'Entregar palas a los policías para excavar', p: 0, fb: 'El rescate en estructuras colapsadas requiere personal especializado y equipado.', efecto: { confianza: -10, tension: 12 } },
          { icono: '🙅', t: 'Pedir a la Policía que espere sin tareas', p: 0, fb: 'Se desaprovechan recursos disponibles.', efecto: { confianza: -8, tension: 6 } }
        ],
        conceptos: [
          { n: 'Asigna el aislamiento del perímetro', claves: ['perimetro', 'aislamiento', 'aislar', 'acordonar', 'cordon', 'cinta', 'zona de seguridad'] },
          { n: 'Asigna el control del tránsito y del acceso', claves: ['transito', 'trafico', 'vias', 'acceso', 'curiosos', 'paso de vehiculos', 'desvio'] },
          { n: 'Asigna apoyo a la evacuación según competencias', claves: ['evacuacion', 'evacuar', 'desalojar', 'competencia', 'su funcion', 'seguridad ciudadana', 'orden publico'] }
        ],
        evitar: [
          { claves: ['que excaven', 'que caven', 'busquen a las victimas', 'que rescaten'], fb: 'El rescate en estructuras colapsadas es tarea de personal especializado.' },
          { claves: ['ninguna tarea', 'que esperen', 'no los necesitamos'], fb: 'Desaprovechar recursos afecta la respuesta.' }
        ],
        modelo: 'A la Policía le asignamos el aislamiento del perímetro, el control del tránsito y el apoyo a la evacuación de las viviendas cercanas.'
      },
      {
        acciones: [
          { icono: '🔭', t: 'Ubicar un vigía observando el talud', p: 2, fb: 'Un nuevo deslizamiento puede afectar a los rescatistas: la vigilancia continua da alerta temprana.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📣', t: 'Acordar y probar la señal de evacuación (pito o sirena)', p: 2, fb: 'Una señal conocida por todos permite evacuar al personal en segundos.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🗺️', t: 'Marcar rutas de evacuación y zona segura', p: 1, fb: 'Las rutas son necesarias, pero deben complementarse con vigilancia y señal de alerta.', efecto: { confianza: 4, tension: -3 } },
          { icono: '🔁', t: 'Seguir trabajando sin cambios', p: 0, fb: 'Las condiciones cambiantes exigen ajustar el plan de acción.', efecto: { confianza: -10, tension: 15 } }
        ],
        conceptos: [
          { n: 'Designa un vigía para monitorear el talud', claves: ['vigia', 'observador', 'monitorear', 'vigilar', 'talud', 'ladera', 'vigilancia'] },
          { n: 'Define una señal de evacuación', claves: ['senal', 'alarma', 'pito', 'silbato', 'sirena', 'alerta', 'aviso'] },
          { n: 'Establece rutas de evacuación y zona segura', claves: ['ruta', 'rutas de evacuacion', 'zona segura', 'punto de encuentro', 'salida', 'retirada', 'escape'] }
        ],
        evitar: [
          { claves: ['seguimos igual', 'sin cambios', 'no pasa nada', 'no importa la lluvia'], fb: 'Ignorar el cambio de condiciones pone en riesgo a los rescatistas.' },
          { claves: ['nos vamos', 'suspendemos todo', 'abandonamos'], fb: 'Se puede continuar con medidas de seguridad; la suspensión se decide solo si el riesgo es inaceptable.' }
        ],
        modelo: 'Designo un vigía para monitorear el talud, acordamos un pito largo como señal de evacuación y marcamos las rutas hacia una zona segura para todo el personal.'
      }
    ]
  },

  'informe': {
    lugar: 'Oficina del jefe de estación, a la mañana siguiente del incendio',
    fondo: 'oficina',
    inicio: { confianza: 50, tension: 50 },
    pasos: [
      {
        acciones: [
          { icono: '⏱️', t: 'Revisar la bitácora de radio para armar la cronología', p: 2, fb: 'La cronología con horas exactas es la columna vertebral del informe técnico.', efecto: { confianza: 8, tension: -5 } },
          { icono: '🚒', t: 'Listar vehículos, equipos y personal que participaron', p: 2, fb: 'Registrar recursos y personal sustenta decisiones y procesos legales.', efecto: { confianza: 6, tension: -4 } },
          { icono: '✏️', t: 'Escribir una sola línea: "se apagó el fuego"', p: 0, fb: 'Falta la información técnica necesaria para analizar la intervención.', efecto: { confianza: -12, tension: 10 } },
          { icono: '🗯️', t: 'Agregar tu opinión sobre quién tuvo la culpa', p: 0, fb: 'Las causas las determina la investigación; el informe se basa en hechos observados.', efecto: { confianza: -10, tension: 8 } }
        ],
        conceptos: [
          { n: 'Incluye la cronología con horas', claves: ['cronologia', 'horas', 'hora de llegada', 'hora de salida', 'secuencia', 'linea de tiempo', 'tiempos'] },
          { n: 'Registra recursos, acciones y personal participante', claves: ['recursos', 'vehiculos', 'equipos', 'acciones realizadas', 'personal', 'maquinas', 'agua utilizada'] },
          { n: 'Documenta víctimas atendidas y daños observados', claves: ['victimas', 'heridos', 'atendid', 'danos', 'perdidas', 'afectados', 'lesionados'] }
        ],
        evitar: [
          { claves: ['se apago el fuego', 'un resumen corto', 'nada mas'], fb: 'Un informe sin datos técnicos no sirve para el análisis ni para procesos legales.' },
          { claves: ['la culpa', 'culpable', 'mi opinion'], fb: 'El informe se basa en hechos; las causas las determina la investigación.' }
        ],
        modelo: 'Mi informe tendrá la cronología con horas, los recursos utilizados, las acciones realizadas, las víctimas atendidas, los daños observados y el personal participante.'
      },
      {
        acciones: [
          { icono: '🔐', t: 'Guardar el informe en el sistema con acceso restringido', p: 2, fb: 'Los datos personales se registran en el informe oficial y se protegen según la Ley Orgánica de Protección de Datos Personales.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🗂️', t: 'Archivar las copias físicas en el archivador con llave', p: 1, fb: 'Proteger el soporte físico ayuda, pero el registro oficial debe tener acceso restringido.', efecto: { confianza: 4, tension: -2 } },
          { icono: '💬', t: 'Enviar los nombres al grupo de WhatsApp de la estación', p: 0, fb: 'Difundir datos personales vulnera derechos y la ley.', efecto: { confianza: -18, tension: 15 } },
          { icono: '🗑️', t: 'Borrar los datos de las víctimas del informe', p: 1, fb: 'Los datos se necesitan para el seguimiento; se registran, pero se protegen.', efecto: { confianza: -4, tension: 4 } }
        ],
        conceptos: [
          { n: 'Registra los datos solo en el informe oficial', claves: ['informe oficial', 'registro oficial', 'solo en el informe', 'documento oficial', 'sistema institucional', 'se registran', 'formulario oficial'] },
          { n: 'Restringe el acceso a la información', claves: ['acceso restringido', 'restringid', 'confidencial', 'reservad', 'solo personal autorizado', 'autorizad', 'no se difunde'] },
          { n: 'Aplica la normativa de protección de datos personales', claves: ['proteccion de datos', 'datos personales', 'ley organica', 'lopdp', 'privacidad', 'derechos', 'normativa'] }
        ],
        evitar: [
          { claves: ['whatsapp', 'chat de la estacion', 'redes sociales', 'publicar'], fb: 'Difundir datos personales de víctimas vulnera sus derechos.' },
          { claves: ['no los registro', 'no hace falta registrarlos', 'los borro'], fb: 'Los datos se necesitan para el seguimiento; deben registrarse y protegerse.' }
        ],
        modelo: 'Los datos personales de las víctimas se registran solo en el informe oficial, con acceso restringido, como manda la Ley Orgánica de Protección de Datos Personales.'
      },
      {
        acciones: [
          { icono: '👥', t: 'Convocar al equipo a un análisis posterior a la acción', p: 2, fb: 'El análisis posterior a la acción convierte el informe en mejora continua.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📊', t: 'Escribir en la pizarra: bien / falló / ajustar', p: 2, fb: 'Analizar qué salió bien, qué falló y qué ajustar orienta la mejora de procedimientos.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📦', t: 'Archivar el informe en una caja', p: 0, fb: 'Se pierde la oportunidad de aprender de la intervención.', efecto: { confianza: -8, tension: 4 } },
          { icono: '⚠️', t: 'Abrir sanciones por cada error encontrado', p: 1, fb: 'Un enfoque solo sancionador hace que nadie reporte errores; debe priorizarse el aprendizaje.', efecto: { confianza: -10, tension: 12 } }
        ],
        conceptos: [
          { n: 'Propone un análisis posterior a la acción', claves: ['analisis posterior', 'despues de la accion', 'debriefing', 'reunion de analisis', 'revision del caso', 'evaluacion posterior', 'aar'] },
          { n: 'Identifica qué salió bien y qué falló', claves: ['salio bien', 'que fallo', 'fortalezas', 'debilidades', 'errores', 'aciertos', 'lo que funciono'] },
          { n: 'Ajusta los procedimientos (mejora continua)', claves: ['ajustar', 'mejora continua', 'mejorar', 'procedimiento', 'protocolo', 'lecciones aprendidas', 'capacitacion'] }
        ],
        evitar: [
          { claves: ['archivarlo', 'lo archivamos', 'guardarlo y ya'], fb: 'Archivar sin analizar desperdicia el aprendizaje.' },
          { claves: ['sancionar', 'castigar', 'buscar culpables'], fb: 'Un enfoque solo punitivo desalienta reportar errores.' }
        ],
        modelo: 'Haremos un análisis posterior a la acción con el equipo: qué salió bien, qué falló y qué debemos ajustar en los procedimientos.'
      }
    ]
  },

  'comunidad': {
    lugar: 'Casa comunal de una comunidad rural rodeada de cultivos y monte',
    fondo: 'comunidad',
    inicio: { confianza: 40, tension: 45 },
    pasos: [
      {
        acciones: [
          { icono: '👂', t: 'Sentarse con la comunidad y preguntar cómo queman', p: 2, fb: 'Escuchar los saberes locales primero abre el diálogo y favorece el cambio.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🖼️', t: 'Mostrar fotos de incendios forestales por quemas', p: 1, fb: 'Mostrar el riesgo ayuda, pero debe acompañarse de alternativas viables.', efecto: { confianza: 3, tension: 2 } },
          { icono: '🌱', t: 'Dibujar en un papelógrafo un cortafuegos y el manejo sin quema', p: 2, fb: 'Proponer alternativas concretas (sin quema o quema controlada con autorización y cortafuegos) hace aplicable la prevención.', efecto: { confianza: 8, tension: -5 } },
          { icono: '⛔', t: 'Leer en voz alta la prohibición y cerrar el tema', p: 0, fb: 'Imponer sin escuchar genera rechazo y la comunidad se cierra.', efecto: { confianza: -15, tension: 15 } }
        ],
        conceptos: [
          { n: 'Escucha y respeta las prácticas locales', claves: ['entiendo', 'escuchar', 'cuenteme', 'respeto', 'su costumbre', 'saberes', 'tradicion', 'como lo hacen'] },
          { n: 'Explica los riesgos de la quema sin control', claves: ['riesgo', 'incendio forestal', 'se escapa', 'se sale de control', 'viento', 'suelo', 'peligro'] },
          { n: 'Propone alternativas: sin quema o quema controlada', claves: ['sin quema', 'quema controlada', 'cortafuego', 'autorizacion', 'permiso', 'alternativa', 'compost', 'abono'] }
        ],
        evitar: [
          { claves: ['esta prohibido y punto', 'y punto', 'les vamos a multar', 'son ignorantes'], fb: 'Imponer o descalificar cierra el diálogo con la comunidad.' },
          { claves: ['no tiene nada de malo', 'sigan quemando'], fb: 'Las quemas sin control son una causa frecuente de incendios forestales.' }
        ],
        modelo: 'Doña Rosa, entiendo que es su costumbre; cuénteme cómo lo hacen. El riesgo es que el fuego se escape con el viento, por eso les propongo manejar sin quema o hacer quemas controladas con autorización y cortafuegos.'
      },
      {
        acciones: [
          { icono: '☎️', t: 'Practicar con todos la llamada al ECU 911', p: 2, fb: 'La alerta temprana al ECU 911 activa a los bomberos a tiempo.', efecto: { confianza: 8, tension: -5 } },
          { icono: '🧭', t: 'Señalar en el mapa las zonas sin vegetación para alejarse', p: 2, fb: 'Alejarse por zonas sin combustible y nunca cuesta arriba evita quedar atrapado.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🌿', t: 'Repartir ramas para apagar el fuego entre todos', p: 0, fb: 'Expone a la población a quemaduras y a quedar atrapada.', efecto: { confianza: -10, tension: 12 } },
          { icono: '⏳', t: 'Indicar que esperen a que el fuego se apague solo', p: 0, fb: 'La demora permite que el fuego crezca.', efecto: { confianza: -8, tension: 10 } }
        ],
        conceptos: [
          { n: 'Llamar de inmediato al ECU 911', claves: ['ecu 911', 'ecu911', '911', 'llamar', 'avisar a los bomberos', 'alertar', 'de inmediato'] },
          { n: 'Alejarse por zonas sin vegetación', claves: ['alejarse', 'alejense', 'sin vegetacion', 'zona despejada', 'zona segura', 'evacuar', 'salir del lugar'] },
          { n: 'Nunca combatirlo cuesta arriba ni exponerse', claves: ['cuesta arriba', 'pendiente', 'ladera arriba', 'no intentar apagar', 'no apagarlo', 'no exponerse', 'humo'] }
        ],
        evitar: [
          { claves: ['con ramas', 'apagarlo entre todos', 'baldes', 'enfrentarlo'], fb: 'Intentar apagar un incendio forestal sin equipo expone a quemaduras y atrapamiento.' },
          { claves: ['esperar a que', 'se apaga solo', 'dejar que se queme'], fb: 'Esperar permite que el fuego crezca.' }
        ],
        modelo: 'Llamen de inmediato al ECU 911, aléjense del fuego por zonas sin vegetación y nunca intenten apagarlo cuesta arriba.'
      },
      {
        acciones: [
          { icono: '🦺', t: 'Inscribir voluntarios para la brigada comunitaria', p: 2, fb: 'La brigada comunitaria, con un mapa de riesgos participativo, fortalece la prevención y la primera respuesta.', efecto: { confianza: 10, tension: -6 } },
          { icono: '📆', t: 'Agendar la fecha del simulacro', p: 2, fb: 'El simulacro pone a prueba la organización y la alerta temprana.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🚙', t: 'Subir al vehículo sin acordar ninguna visita', p: 0, fb: 'Irse sin compromiso de regreso rompe la confianza; la vinculación requiere continuidad.', efecto: { confianza: -15, tension: 8 } },
          { icono: '📰', t: 'Dejar folletos sobre la mesa y despedirse', p: 1, fb: 'El material ayuda, pero la participación sostenida es más efectiva; la vinculación requiere continuidad.', efecto: { confianza: -6, tension: 3 } }
        ],
        conceptos: [
          { n: 'Forma una brigada comunitaria', claves: ['brigada', 'voluntarios', 'organizarnos', 'comite', 'grupo de respuesta', 'brigadistas', 'organizacion comunitaria'] },
          { n: 'Planifica un simulacro', claves: ['simulacro', 'practica', 'ensayo', 'ejercicio', 'entrenamiento', 'simulacion'] },
          { n: 'Elabora un mapa de riesgos y da continuidad', claves: ['mapa de riesgos', 'mapa comunitario', 'croquis', 'zonas de riesgo', 'regresaremos', 'volveremos', 'seguimiento', 'continuidad'] }
        ],
        evitar: [
          { claves: ['no regresamos', 'no volvemos', 'ya cumplimos', 'es su problema'], fb: 'La vinculación con la comunidad requiere continuidad.' },
          { claves: ['solo folletos', 'les dejo folletos', 'lean el folleto'], fb: 'El material solo no basta; se necesita participación sostenida.' }
        ],
        modelo: 'Formemos una brigada comunitaria, hagamos un simulacro el próximo mes y elaboremos juntos el mapa de riesgos de la comunidad; nosotros regresaremos a acompañarlos.'
      }
    ]
  }
});
