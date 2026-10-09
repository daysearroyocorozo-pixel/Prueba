/* Casos vivos – Administración Pública: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {

  /* ---------- 1. La jefa quiere contratar a su sobrina ---------- */
  'nepotismo': {
    lugar: 'Oficina de la jefatura de la unidad, GAD Municipal',
    fondo: 'oficina',
    inicio: { confianza: 60, tension: 40 },
    pasos: [
      {
        acciones: [
          { icono: '📖', t: 'Mostrarle el artículo de la LOSEP sobre nepotismo', p: 2, fb: 'La LOSEP prohíbe designar o contratar a parientes de la autoridad nominadora; mostrar la norma fundamenta tu negativa.', efecto: { confianza: 2, tension: 8 } },
          { icono: '📋', t: 'Explicarle el concurso de méritos y oposición', p: 2, fb: 'Proponer la vía legal de selección convierte el "no" en una alternativa correcta.', efecto: { confianza: 5, tension: 3 } },
          { icono: '✍️', t: 'Empezar a llenar el contrato de la sobrina', p: 0, fb: 'Obedecer una orden ilegal también genera responsabilidad administrativa para ti.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🙈', t: 'Preparar el contrato pero dejarlo sin tu firma', p: 0, fb: 'Participar en la elaboración de un acto ilegal sigue siendo una falta, firmes o no.', efecto: { confianza: 5, tension: -5 } }
        ],
        conceptos: [
          { n: 'Señala que el nepotismo está prohibido', claves: ['nepotismo', 'prohib', 'no esta permitido', 'ilegal', 'losep', 'la ley no permite', 'parentesco', 'familiar'] },
          { n: 'Propone el procedimiento legal de selección', claves: ['concurso', 'meritos', 'oposicion', 'procedimiento legal', 'proceso de seleccion', 'talento humano', 'convocatoria'] },
          { n: 'Mantiene el respeto hacia la jefa', claves: ['con respeto', 'con todo respeto', 'licenciada', 'entiendo', 'comprendo', 'le sugiero', 'disculpe', 'permitame'] }
        ],
        evitar: [
          { claves: ['ya lo preparo', 'como usted diga', 'enseguida lo hago', 'usted manda'], fb: 'Obedecer una orden ilegal también genera responsabilidad.' },
          { claves: ['nadie se va a enterar', 'sin firmar', 'por debajo'], fb: 'Ocultar un acto irregular no lo vuelve legal; sigue siendo una falta.' }
        ],
        modelo: 'Licenciada, con todo respeto, no puedo preparar ese contrato: la LOSEP prohíbe el nepotismo. La vacante debe cubrirse mediante concurso de méritos y oposición con Talento Humano.'
      },
      {
        acciones: [
          { icono: '🌐', t: 'Mostrarle concursos abiertos en otras entidades', p: 2, fb: 'Se respeta el derecho de la sobrina a postular en igualdad de condiciones donde no exista parentesco prohibido.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📑', t: 'Redactar requisitos a la medida de la sobrina', p: 0, fb: 'Direccionar un concurso es una falta grave y vulnera la igualdad de oportunidades.', efecto: { confianza: 8, tension: -5 } },
          { icono: '🤷', t: 'Encoger los hombros y decirle que consulte ella', p: 1, fb: 'Evitas el problema, pero es mejor orientar con base en la norma.', efecto: { confianza: -5, tension: 5 } },
          { icono: '📄', t: 'Entregarle la guía de postulación del Ministerio del Trabajo', p: 2, fb: 'Orientar sobre las vías públicas de postulación es una salida legal y respetuosa.', efecto: { confianza: 6, tension: -5 } }
        ],
        conceptos: [
          { n: 'Reconoce la preparación de la sobrina', claves: ['preparada', 'capacidad', 'buen perfil', 'no dudo', 'reconozco', 'merito', 'talento'] },
          { n: 'Propone postular en otras entidades sin parentesco', claves: ['otra entidad', 'otras entidades', 'otra institucion', 'otros concursos', 'postular', 'donde no exista', 'sin parentesco', 'socio empleo'] },
          { n: 'Destaca la igualdad de condiciones', claves: ['igualdad', 'mismas condiciones', 'igual que', 'transparen', 'imparcial', 'sin privilegio', 'justo'] }
        ],
        evitar: [
          { claves: ['concurso a su medida', 'a la medida', 'ajustamos los requisitos', 'que gane ella'], fb: 'Direccionar un concurso es una falta grave.' },
          { claves: ['no se', 'consulte usted', 'no es mi problema'], fb: 'Desentenderse no ayuda: orienta con base en la norma.' }
        ],
        modelo: 'No dudo de su preparación, licenciada. Ella puede postular a concursos públicos en otras entidades donde no exista el parentesco prohibido, en igualdad de condiciones con los demás.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Redactar un memorando dejando constancia de la orden', p: 2, fb: 'Documentar por escrito protege al servidor y deja evidencia de lo ocurrido.', efecto: { confianza: -8, tension: 10 } },
          { icono: '⚖️', t: 'Enviar consulta formal a la asesoría jurídica', p: 2, fb: 'El criterio jurídico institucional respalda la decisión y orienta a la autoridad.', efecto: { confianza: -3, tension: 5 } },
          { icono: '📱', t: 'Publicar la situación en redes sociales', p: 0, fb: 'Las denuncias se canalizan por vías formales; exponerlo en redes genera conflicto y puede afectarte.', efecto: { confianza: -20, tension: 20 } },
          { icono: '🚪', t: 'Entregar tu renuncia de inmediato', p: 1, fb: 'Existen vías institucionales antes de una decisión extrema.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Deja la situación por escrito', claves: ['por escrito', 'memorando', 'memo', 'documento', 'constancia', 'oficio', 'registr', 'evidencia'] },
          { n: 'Consulta a Talento Humano o a jurídico', claves: ['talento humano', 'juridic', 'asesoria', 'consult', 'criterio legal', 'abogado', 'uath'] },
          { n: 'Usa las vías formales e institucionales', claves: ['via formal', 'vias formales', 'institucional', 'institucion', 'canal', 'procedimiento', 'contraloria', 'denuncia formal'] }
        ],
        evitar: [
          { claves: ['redes sociales', 'facebook', 'lo publico', 'lo hago viral'], fb: 'Las denuncias se canalizan por las vías formales, no en redes.' },
          { claves: ['renuncio', 'me voy', 'lo hago para no tener problemas'], fb: 'Antes de decisiones extremas o de ceder, usa las vías institucionales.' }
        ],
        modelo: 'Si insiste, dejaré constancia por escrito mediante un memorando y pediré el criterio de Talento Humano y de la asesoría jurídica. Así me protejo yo y protegemos a la institución.'
      }
    ]
  },

  /* ---------- 2. Un compañero con bajo desempeño ---------- */
  'desempeno': {
    lugar: 'Sala pequeña de reuniones de la unidad de trámites',
    fondo: 'oficina',
    inicio: { confianza: 45, tension: 55 },
    pasos: [
      {
        acciones: [
          { icono: '🚪', t: 'Invitarlo a conversar en privado y cerrar la puerta', p: 2, fb: 'La retroalimentación en privado evita exponerlo y abre la conversación.', efecto: { confianza: 12, tension: -10 } },
          { icono: '📊', t: 'Revisar juntos su lista de trámites asignados', p: 2, fb: 'Mirar la carga real de trabajo permite identificar causas y prioridades.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📢', t: 'Llamarle la atención frente a todo el equipo', p: 0, fb: 'La exposición pública humilla, desmotiva y genera conflicto.', efecto: { confianza: -20, tension: 20 } },
          { icono: '🗂️', t: 'Tomar sus expedientes y hacerlos tú', p: 1, fb: 'Resuelve a corto plazo, pero no corrige el problema de fondo.', efecto: { confianza: 3, tension: -3 } }
        ],
        conceptos: [
          { n: 'Conversa en privado', claves: ['en privado', 'a solas', 'conversar', 'hablemos', 'reunion', 'tranquilos', 'aparte'] },
          { n: 'Escucha sus razones', claves: ['escuch', 'cuentame', 'que te pasa', 'tus razones', 'entiendo', 'comprendo', 'como te sientes'] },
          { n: 'Revisa la carga de trabajo y prioridades', claves: ['carga', 'priorid', 'pendientes', 'organizar', 'revisemos', 'tramites', 'distribu'] }
        ],
        evitar: [
          { claves: ['frente a todos', 'delante de todos', 'eres un vago', 'irresponsable'], fb: 'La exposición pública o los insultos desmotivan y generan conflicto.' },
          { claves: ['yo lo hago por ti', 'lo hago yo', 'no te preocupes yo lo cubro'], fb: 'Cubrirlo no corrige el problema.' }
        ],
        modelo: 'Andrés, hablemos en privado. Cuéntame qué está pasando; revisemos juntos tu carga de trabajo y definamos prioridades.'
      },
      {
        acciones: [
          { icono: '🎯', t: 'Escribir con él metas semanales concretas', p: 2, fb: 'Metas claras y medibles orientan el trabajo y permiten evaluar avances.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🎓', t: 'Inscribirlo en la capacitación del sistema de trámites', p: 2, fb: 'La capacitación ataca una causa concreta del atraso.', efecto: { confianza: 8, tension: -5 } },
          { icono: '⚠️', t: 'Advertirle que si no mejora lo despedirán', p: 1, fb: 'La amenaza sin apoyo no motiva.', efecto: { confianza: -12, tension: 15 } },
          { icono: '😴', t: 'No hacer nada y esperar que mejore solo', p: 0, fb: 'Sin plan, el problema persiste.', efecto: { confianza: -5, tension: 5 } }
        ],
        conceptos: [
          { n: 'Acuerda metas concretas', claves: ['meta', 'objetivo', 'acord', 'compromiso', 'plan de mejora', 'concret', 'plazo'] },
          { n: 'Ofrece capacitación', claves: ['capacit', 'curso', 'taller', 'formacion', 'aprender el sistema', 'entrenamiento', 'induccion'] },
          { n: 'Da seguimiento periódico', claves: ['seguimiento', 'cada semana', 'semanal', 'revisaremos', 'acompan', 'monitore', 'reunion cada'] }
        ],
        evitar: [
          { claves: ['te van a despedir', 'te botan', 'te sacan', 'ultima oportunidad'], fb: 'La amenaza sin apoyo no motiva.' },
          { claves: ['nada', 'ya mejoraras', 'ya se arreglara'], fb: 'Sin plan, el problema persiste.' }
        ],
        modelo: 'Te propongo acordar metas concretas para cada semana, inscribirte en la capacitación del sistema de trámites y reunirnos cada viernes para dar seguimiento.'
      },
      {
        acciones: [
          { icono: '📈', t: 'Abrir el registro de metas cumplidas como evidencia', p: 2, fb: 'Evaluar con evidencias de las metas acordadas hace objetiva la evaluación.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🏅', t: 'Reconocer por escrito su mejora en el formulario', p: 2, fb: 'El reconocimiento de la mejora motiva y refuerza el cambio.', efecto: { confianza: 12, tension: -10 } },
          { icono: '👎', t: 'Bajarle la nota por los atrasos anteriores', p: 0, fb: 'Evaluar por prejuicios o hechos ya superados no es objetivo.', efecto: { confianza: -18, tension: 15 } },
          { icono: '💯', t: 'Marcar la nota máxima sin revisar nada', p: 1, fb: 'Una evaluación sin evidencias pierde valor.', efecto: { confianza: 6, tension: -4 } }
        ],
        conceptos: [
          { n: 'Evalúa con evidencias', claves: ['evidencia', 'datos', 'registro', 'resultados', 'objetiv', 'medible', 'cumplimiento'] },
          { n: 'Se basa en las metas acordadas', claves: ['metas acordadas', 'meta', 'lo que acordamos', 'compromisos', 'plan de mejora', 'objetivos'] },
          { n: 'Reconoce la mejora', claves: ['reconoc', 'felicit', 'mejora', 'mejoraste', 'buen trabajo', 'avance', 'progreso'] }
        ],
        evitar: [
          { claves: ['por lo que paso antes', 'por los atrasos anteriores', 'te lo merecias'], fb: 'Evaluar por prejuicios no es objetivo.' },
          { claves: ['nota maxima', 'el cien', 'para que no te desanimes'], fb: 'Una evaluación sin evidencias pierde valor.' }
        ],
        modelo: 'En la evaluación del desempeño me baso en las evidencias de las metas que acordamos. Cumpliste la mayoría y quiero reconocer tu mejora.'
      }
    ]
  },

  /* ---------- 3. Difundir el nuevo servicio en línea ---------- */
  'campana': {
    lugar: 'Dirección de Comunicación del GAD Municipal',
    fondo: 'oficina',
    inicio: { confianza: 55, tension: 35 },
    pasos: [
      {
        acciones: [
          { icono: '🧭', t: 'Dibujar en la pizarra el mapa de públicos objetivo', p: 2, fb: 'El marketing público parte de saber a quién queremos llegar.', efecto: { confianza: 10, tension: -5 } },
          { icono: '📋', t: 'Aplicar una encuesta corta en ventanilla de pagos', p: 2, fb: 'Preguntar a la ciudadanía revela las barreras reales para usar el servicio.', efecto: { confianza: 8, tension: -3 } },
          { icono: '🖼️', t: 'Publicar un afiche en Facebook y listo', p: 1, fb: 'Un solo canal no llega a todos los públicos.', efecto: { confianza: -3, tension: 3 } },
          { icono: '🤳', t: 'Llamar a un influencer famoso para contratarlo', p: 0, fb: 'Sin diagnóstico ni presupuesto planificado, la acción es improvisada.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Identifica el público objetivo', claves: ['publico', 'a quien', 'segment', 'adultos mayores', 'comerciantes', 'rural', 'ciudadania', 'usuarios'] },
          { n: 'Indaga las barreras de uso', claves: ['barrera', 'que les impide', 'dificultad', 'por que no usan', 'problema', 'obstaculo', 'limitacion'] },
          { n: 'Parte de un diagnóstico', claves: ['diagnost', 'encuesta', 'investig', 'conocer', 'datos', 'estudio', 'preguntar'] }
        ],
        evitar: [
          { claves: ['un afiche y listo', 'solo facebook', 'publicamos y ya'], fb: 'Un solo canal no llega a todos los públicos.' },
          { claves: ['influencer', 'famoso'], fb: 'Sin diagnóstico ni presupuesto planificado, la acción es improvisada.' }
        ],
        modelo: 'Primero identifiquemos a quiénes queremos llegar, como adultos mayores, comerciantes y zonas rurales, y hagamos un diagnóstico de qué les impide usar el pago en línea.'
      },
      {
        acciones: [
          { icono: '📻', t: 'Grabar una cuña para la radio local', p: 2, fb: 'La radio llega a quienes no usan internet, sobre todo en zonas rurales.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🗣️', t: 'Traducir los mensajes al kichwa y al castellano', p: 2, fb: 'La comunicación intercultural favorece la inclusión.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🧑‍💻', t: 'Instalar un punto de ayuda con personal capacitado', p: 2, fb: 'El acompañamiento presencial reduce la brecha digital.', efecto: { confianza: 10, tension: -5 } },
          { icono: '🚫', t: 'Descartar a los adultos mayores del plan de medios', p: 0, fb: 'El servicio público debe ser inclusivo; nadie puede quedar fuera por la brecha digital.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Usa canales tradicionales como la radio', claves: ['radio', 'perifoneo', 'altoparlante', 'cuna radial', 'medios locales', 'television local', 'volante'] },
          { n: 'Comunica de forma intercultural', claves: ['kichwa', 'quichua', 'idioma', 'lengua', 'intercultural', 'castellano', 'ancestral'] },
          { n: 'Ofrece ayuda presencial', claves: ['presencial', 'punto de ayuda', 'acompan', 'personal capacitado', 'asistencia', 'ventanilla', 'brecha digital'] }
        ],
        evitar: [
          { claves: ['que aprendan', 'ya es otra epoca', 'problema de ellos'], fb: 'El servicio público debe ser inclusivo.' },
          { claves: ['solo correo', 'solo correos'], fb: 'No llega a quienes no usan correo.' }
        ],
        modelo: 'Para los adultos mayores usaremos la radio local, mensajes en kichwa y castellano, y puntos de ayuda presencial con personal capacitado que les enseñe a pagar en línea.'
      },
      {
        acciones: [
          { icono: '📉', t: 'Comparar en una tabla los pagos en línea antes y después', p: 2, fb: 'El indicador de uso real del servicio muestra el efecto de la campaña.', efecto: { confianza: 10, tension: -6 } },
          { icono: '⭐', t: 'Diseñar una encuesta de satisfacción de usuarios', p: 2, fb: 'La satisfacción complementa los datos de uso.', efecto: { confianza: 6, tension: -4 } },
          { icono: '👍', t: 'Contar los "me gusta" de la publicación', p: 1, fb: 'Es un dato parcial; importa el uso real del servicio.', efecto: { confianza: -3, tension: 3 } },
          { icono: '🗑️', t: 'Cerrar la carpeta de la campaña sin medir', p: 0, fb: 'Sin medición no se puede mejorar.', efecto: { confianza: -10, tension: 8 } }
        ],
        conceptos: [
          { n: 'Define indicadores', claves: ['indicador', 'medir', 'medicion', 'metrica', 'datos', 'cifras', 'estadistica'] },
          { n: 'Compara el antes y el después', claves: ['antes y despues', 'linea base', 'compar', 'numero de pagos', 'pagos en linea', 'aumento', 'porcentaje'] },
          { n: 'Mide la satisfacción de usuarios', claves: ['satisfaccion', 'encuesta', 'opinion', 'percepcion', 'calificacion', 'quejas', 'retroaliment'] }
        ],
        evitar: [
          { claves: ['me gusta', 'likes', 'reacciones'], fb: 'Es un dato parcial; importa el uso real del servicio.' },
          { claves: ['no hace falta medir', 'no hay que medir', 'se nota solo'], fb: 'Sin medición no se puede mejorar.' }
        ],
        modelo: 'Mediremos indicadores: el número de pagos en línea antes y después de la campaña, y la satisfacción de los usuarios mediante una encuesta.'
      }
    ]
  },

  /* ---------- 4. Presión para favorecer a un proveedor ---------- */
  'proveedor': {
    lugar: 'Unidad de Compras Públicas, institución pública',
    fondo: 'oficina',
    inicio: { confianza: 50, tension: 65 },
    pasos: [
      {
        acciones: [
          { icono: '📘', t: 'Abrir la LOSNCP en el principio de concurrencia', p: 2, fb: 'La LOSNCP exige igualdad, trato justo y concurrencia; direccionar pliegos los vulnera.', efecto: { confianza: -5, tension: 8 } },
          { icono: '📐', t: 'Mostrar el estudio de mercado y requisitos técnicos', p: 2, fb: 'Los requisitos deben ser técnicos y proporcionales al objeto de la contratación.', efecto: { confianza: -3, tension: 5 } },
          { icono: '⌨️', t: 'Escribir en los pliegos "15 años de experiencia"', p: 0, fb: 'Direccionar un proceso es una falta grave y puede constituir delito.', efecto: { confianza: 12, tension: -10 } },
          { icono: '✏️', t: 'Escribir "10 años" para quedar bien con todos', p: 0, fb: 'Sigue siendo un requisito para favorecer a alguien.', efecto: { confianza: 6, tension: -5 } }
        ],
        conceptos: [
          { n: 'Exige requisitos técnicos y proporcionales', claves: ['tecnic', 'proporcional', 'objeto de la contratacion', 'estudio de mercado', 'justificad', 'razonable', 'necesidad'] },
          { n: 'Defiende la concurrencia e igualdad de oferentes', claves: ['concurrencia', 'igualdad', 'oferentes', 'participen', 'trato justo', 'competencia', 'mas empresas'] },
          { n: 'Rechaza direccionar los pliegos', claves: ['direccion', 'no puedo', 'favorecer', 'losncp', 'sercop', 'ilegal', 'no es correcto'] }
        ],
        evitar: [
          { claves: ['lo pongo', 'orden de arriba', 'como usted diga', 'listo senor'], fb: 'Direccionar un proceso es una falta grave y puede ser delito.' },
          { claves: ['10 anos', 'diez anos', 'un poco menos'], fb: 'Reducir la cifra sigue siendo un requisito hecho para favorecer a alguien.' }
        ],
        modelo: 'Señor Ortega, no puedo poner ese requisito: los pliegos deben tener requisitos técnicos y proporcionales, según la LOSNCP, para garantizar la concurrencia e igualdad de los oferentes.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Redactar un informe escrito de la presión recibida', p: 2, fb: 'Documentar la presión protege la integridad del proceso y al servidor.', efecto: { confianza: -10, tension: 10 } },
          { icono: '📨', t: 'Enviar el informe a la máxima autoridad', p: 2, fb: 'Reportar por la vía formal permite actuar y deja respaldo.', efecto: { confianza: -8, tension: 8 } },
          { icono: '😰', t: 'Ceder y modificar los pliegos por miedo', p: 0, fb: 'Ceder te hace partícipe de la irregularidad.', efecto: { confianza: 15, tension: -15 } },
          { icono: '🔇', t: 'Ignorarlo sin dejar ningún registro', p: 1, fb: 'Sin registro no hay respaldo si la presión continúa.', efecto: { confianza: -2, tension: 5 } }
        ],
        conceptos: [
          { n: 'Registra la presión por escrito', claves: ['por escrito', 'registr', 'documentar', 'informe', 'memorando', 'constancia', 'evidencia'] },
          { n: 'Reporta a la autoridad o a transparencia', claves: ['maxima autoridad', 'informar', 'reportar', 'transparencia', 'denunci', 'contraloria', 'superior'] },
          { n: 'Mantiene la integridad sin ceder', claves: ['no voy a ceder', 'integridad', 'no cedo', 'etica', 'cumplir la ley', 'me mantengo', 'no participo'] }
        ],
        evitar: [
          { claves: ['tiene razon', 'mejor colaboro', 'no quiero problemas', 'lo cambio'], fb: 'Ceder por miedo te hace partícipe de la irregularidad.' },
          { claves: ['hago como si nada', 'lo ignoro', 'no digo nada'], fb: 'Sin registro, no hay respaldo si la presión continúa.' }
        ],
        modelo: 'No voy a ceder. Registraré esta presión por escrito y la informaré a la máxima autoridad y a la unidad de transparencia, para que quede documentada.'
      },
      {
        acciones: [
          { icono: '🌐', t: 'Publicar el proceso en el portal de compras del SERCOP', p: 2, fb: 'La publicidad en el portal permite que participen todos los proveedores habilitados.', efecto: { confianza: 8, tension: -10 } },
          { icono: '👥', t: 'Conformar la comisión técnica de evaluación', p: 2, fb: 'La evaluación objetiva por una comisión evita decisiones unipersonales.', efecto: { confianza: 6, tension: -6 } },
          { icono: '📞', t: 'Invitar por teléfono solo a tres empresas conocidas', p: 0, fb: 'Limitar la participación sin justificación vulnera la concurrencia.', efecto: { confianza: -5, tension: 10 } },
          { icono: '🖊️', t: 'Firmar tú solo la adjudicación para ahorrar tiempo', p: 0, fb: 'La adjudicación sigue el procedimiento legal, no una decisión individual.', efecto: { confianza: -8, tension: 12 } }
        ],
        conceptos: [
          { n: 'Publica el proceso en el portal', claves: ['portal', 'sercop', 'compras publicas', 'publicar', 'publicidad', 'en linea', 'sistema oficial'] },
          { n: 'Usa pliegos técnicos', claves: ['pliego', 'tecnic', 'especificaciones', 'terminos de referencia', 'requisitos objetivos', 'parametros'] },
          { n: 'Evalúa objetivamente con una comisión', claves: ['comision', 'evaluacion objetiva', 'objetiv', 'puntaje', 'criterios', 'imparcial', 'calificacion'] }
        ],
        evitar: [
          { claves: ['solo tres', 'empresas conocidas', 'invito a mis'], fb: 'Limitar la participación sin justificación vulnera la concurrencia.' },
          { claves: ['decido yo', 'yo solo', 'adjudico directo'], fb: 'Las decisiones de adjudicación siguen el procedimiento legal.' }
        ],
        modelo: 'Publicaremos el proceso en el portal de compras públicas del SERCOP, con pliegos técnicos, y una comisión evaluará las ofertas con criterios objetivos.'
      }
    ]
  },

  /* ---------- 5. Una política para emprendedoras rurales ---------- */
  'politica': {
    lugar: 'Casa comunal de una parroquia rural',
    fondo: 'comunidad',
    inicio: { confianza: 55, tension: 30 },
    pasos: [
      {
        acciones: [
          { icono: '🪑', t: 'Convocar una reunión con las emprendedoras', p: 2, fb: 'El diagnóstico participativo escucha a la población antes de diseñar.', efecto: { confianza: 10, tension: -6 } },
          { icono: '📋', t: 'Repartir una encuesta de necesidades', p: 2, fb: 'La encuesta aporta datos sobre las necesidades reales.', efecto: { confianza: 6, tension: -3 } },
          { icono: '📂', t: 'Copiar el programa de otra ciudad sin cambios', p: 1, fb: 'Sirve de referencia, pero debe adaptarse al contexto local.', efecto: { confianza: -3, tension: 3 } },
          { icono: '💵', t: 'Repartir sobres con dinero de inmediato', p: 0, fb: 'Sin diagnóstico ni reglas claras, el programa no es sostenible.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Propone un diagnóstico', claves: ['diagnost', 'conocer la realidad', 'linea base', 'levantamiento', 'investig', 'analisis de la situacion'] },
          { n: 'Hace que sea participativo', claves: ['participat', 'reunion', 'asamblea', 'escuchar', 'con ellas', 'comunidad', 'participacion ciudadana'] },
          { n: 'Identifica necesidades reales', claves: ['necesidad', 'encuesta', 'problemas', 'lo que requieren', 'demandas', 'prioridades'] }
        ],
        evitar: [
          { claves: ['repartir dinero', 'regalar plata', 'bonos ya'], fb: 'Sin diagnóstico ni reglas claras, el programa no es sostenible.' },
          { claves: ['copiamos', 'copiar el programa', 'igual que otra ciudad'], fb: 'Otro programa sirve de referencia, pero hay que adaptarlo.' }
        ],
        modelo: 'Concejala, empecemos con un diagnóstico participativo: reuniones y encuestas con las emprendedoras para conocer sus necesidades reales.'
      },
      {
        acciones: [
          { icono: '🧩', t: 'Dibujar los componentes: capacitación y ferias', p: 2, fb: 'Los componentes responden a los problemas del diagnóstico.', efecto: { confianza: 8, tension: -5 } },
          { icono: '💰', t: 'Incluir el presupuesto del programa en el POA', p: 2, fb: 'Sin recursos en el POA la política no se ejecuta.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🗺️', t: 'Alinear los objetivos con el PDOT del cantón', p: 2, fb: 'La articulación con el PDOT da coherencia a la planificación.', efecto: { confianza: 6, tension: -3 } },
          { icono: '🚶', t: 'Dejar que cada una resuelva sola', p: 0, fb: 'Se abandona el objetivo de la política.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Diseña componentes de capacitación y mercado', claves: ['capacit', 'feria', 'componente', 'acceso a mercados', 'comercializ', 'talleres', 'vender'] },
          { n: 'Define objetivos, metas y presupuesto en el POA', claves: ['objetivo', 'meta', 'presupuesto', 'poa', 'plan operativo', 'recursos', 'financiamiento'] },
          { n: 'Articula con el PDOT', claves: ['pdot', 'plan de desarrollo', 'ordenamiento territorial', 'articul', 'alinear', 'planificacion'] }
        ],
        evitar: [
          { claves: ['una sola feria', 'una feria al ano'], fb: 'Una sola acción no responde a todas las necesidades.' },
          { claves: ['que se arreglen', 'cada una sola', 'no es nuestro problema'], fb: 'Se abandona el objetivo de la política.' }
        ],
        modelo: 'Propongo dos componentes, capacitación y ferias, con objetivos, metas y presupuesto incluidos en el POA y articulados con el PDOT.'
      },
      {
        acciones: [
          { icono: '📊', t: 'Crear una matriz de indicadores de seguimiento', p: 2, fb: 'Los indicadores permiten saber si el programa avanza.', efecto: { confianza: 8, tension: -5 } },
          { icono: '🗓️', t: 'Programar la evaluación de fin de año', p: 2, fb: 'La evaluación cierra el ciclo de la política y permite ajustarla.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📸', t: 'Tomar fotos de los eventos como único registro', p: 1, fb: 'Las fotos no miden resultados.', efecto: { confianza: -3, tension: 3 } },
          { icono: '🚫', t: 'Archivar el programa sin evaluarlo', p: 0, fb: 'Sin evaluación no hay rendición de cuentas ni mejora.', efecto: { confianza: -10, tension: 8 } }
        ],
        conceptos: [
          { n: 'Define indicadores de seguimiento', claves: ['indicador', 'seguimiento', 'participantes', 'ventas', 'ingresos', 'medir', 'monitore'] },
          { n: 'Realiza una evaluación', claves: ['evalua', 'fin de ano', 'final del ano', 'resultados', 'impacto', 'ajustar'] },
          { n: 'Rinde cuentas a la ciudadanía', claves: ['rendicion de cuentas', 'rendir cuentas', 'informar a la comunidad', 'transparen', 'socializar', 'participacion ciudadana'] }
        ],
        evitar: [
          { claves: ['con fotos', 'las fotos', 'albumes'], fb: 'Las fotos no miden resultados.' },
          { claves: ['no es necesario evaluar', 'no hace falta evaluar', 'no evaluar'], fb: 'Sin evaluación no hay rendición de cuentas ni mejora.' }
        ],
        modelo: 'Usaremos indicadores de seguimiento, como participantes, ventas e ingresos, y haremos una evaluación al final del año para rendir cuentas y ajustar el programa.'
      }
    ]
  },

  /* ---------- 6. Un trámite que tarda demasiado ---------- */
  'proceso': {
    lugar: 'Dirección de Procesos, sala con pizarra y expedientes',
    fondo: 'oficina',
    inicio: { confianza: 55, tension: 40 },
    pasos: [
      {
        acciones: [
          { icono: '🔀', t: 'Dibujar el flujograma actual del permiso', p: 2, fb: 'Levantar el proceso actual es la base de cualquier mejora.', efecto: { confianza: 10, tension: -5 } },
          { icono: '⏱️', t: 'Cronometrar el tiempo de cada etapa', p: 2, fb: 'Medir tiempos muestra dónde se pierde el tiempo.', efecto: { confianza: 8, tension: -4 } },
          { icono: '👷', t: 'Solicitar la contratación de más personal', p: 1, fb: 'Puede ayudar, pero primero hay que conocer el proceso.', efecto: { confianza: -2, tension: 4 } },
          { icono: '📣', t: 'Enviar un correo exigiendo trabajar más rápido', p: 0, fb: 'Sin cambiar el proceso, el problema persiste.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Levanta el flujograma actual', claves: ['flujograma', 'diagrama de flujo', 'mapear', 'levantar el proceso', 'proceso actual', 'pasos del tramite'] },
          { n: 'Mide los tiempos de cada paso', claves: ['medir', 'tiempo', 'cronometr', 'cuanto tarda', 'datos', 'duracion'] },
          { n: 'Identifica pasos que no agregan valor', claves: ['no agregan valor', 'sin valor', 'cuello de botella', 'duplic', 'innecesari', 'desperdicio', 'redundan'] }
        ],
        evitar: [
          { claves: ['mas rapido', 'que se apuren', 'presionar al personal'], fb: 'Sin cambiar el proceso, el problema persiste.' },
          { claves: ['mas personal', 'contratar gente'], fb: 'Antes de contratar, hay que conocer el proceso.' }
        ],
        modelo: 'Ingeniero, primero levantemos el flujograma actual, midamos el tiempo de cada paso e identifiquemos los que no agregan valor.'
      },
      {
        acciones: [
          { icono: '✂️', t: 'Tachar en el flujograma las firmas duplicadas', p: 2, fb: 'Eliminar revisiones duplicadas reduce tiempos sin perder control.', efecto: { confianza: 10, tension: -6 } },
          { icono: '💻', t: 'Proponer la recepción digital de solicitudes', p: 2, fb: 'Digitalizar reduce costos y traslados para la ciudadanía.', efecto: { confianza: 8, tension: -4 } },
          { icono: '⏳', t: 'Fijar un tiempo máximo por etapa', p: 2, fb: 'Los plazos por etapa hacen el proceso predecible.', efecto: { confianza: 6, tension: -3 } },
          { icono: '➕', t: 'Agregar una firma más para asegurar', p: 0, fb: 'Aumenta la burocracia.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Elimina revisiones duplicadas', claves: ['eliminar', 'duplic', 'quitar firmas', 'menos firmas', 'simplific', 'redundan', 'reducir pasos'] },
          { n: 'Digitaliza el trámite', claves: ['digital', 'en linea', 'sistema', 'electronic', 'virtual', 'firma electronica', 'plataforma'] },
          { n: 'Fija tiempos máximos por etapa', claves: ['tiempo maximo', 'plazo', 'dias', 'limite de tiempo', 'por etapa', 'tiempos de respuesta'] }
        ],
        evitar: [
          { claves: ['otra firma', 'una firma mas', 'mas controles'], fb: 'Agregar firmas aumenta la burocracia.' },
          { claves: ['dejarlo igual', 'asi esta bien', 'no cambiar'], fb: 'Dejarlo igual no mejora nada.' }
        ],
        modelo: 'Propongo eliminar las tres revisiones duplicadas, digitalizar la recepción de solicitudes y fijar un tiempo máximo por etapa.'
      },
      {
        acciones: [
          { icono: '📏', t: 'Volver a medir los tiempos del trámite', p: 2, fb: 'Verificar con datos dice si la mejora funcionó.', efecto: { confianza: 8, tension: -5 } },
          { icono: '⭐', t: 'Aplicar una encuesta de satisfacción a usuarios', p: 2, fb: 'La percepción ciudadana complementa la medición de tiempos.', efecto: { confianza: 6, tension: -3 } },
          { icono: '🔄', t: 'Dibujar el ciclo PHVA y marcar "Actuar"', p: 2, fb: 'Verificar y actuar cierran el ciclo de mejora continua.', efecto: { confianza: 6, tension: -3 } },
          { icono: '↩️', t: 'Restaurar el proceso anterior ante la primera queja', p: 0, fb: 'Las decisiones se toman con datos.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Vuelve a medir los tiempos', claves: ['medir de nuevo', 'volver a medir', 'tiempos', 'verificar', 'indicador', 'comparar'] },
          { n: 'Mide la satisfacción', claves: ['satisfaccion', 'encuesta', 'usuarios', 'opinion', 'percepcion', 'ciudadania'] },
          { n: 'Ajusta con mejora continua (PHVA)', claves: ['phva', 'mejora continua', 'ajustar', 'planificar hacer verificar actuar', 'ciclo de deming', 'corregir'] }
        ],
        evitar: [
          { claves: ['dar por terminado', 'ya termino', 'listo el proyecto'], fb: 'Sin verificación no se sabe si mejoró.' },
          { claves: ['volver al proceso anterior', 'si alguien se queja', 'regresar como antes'], fb: 'Las decisiones se toman con datos.' }
        ],
        modelo: 'Después de implementar, volveremos a medir los tiempos y la satisfacción de los usuarios, y ajustaremos lo necesario siguiendo el ciclo PHVA.'
      }
    ]
  }
});
