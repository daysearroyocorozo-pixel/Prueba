/* Casos vivos – Administración de Sistemas de Salud: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {

  /* ---------- 1. Un familiar pide ver una historia clínica ---------- */
  'historia-clinica': {
    lugar: 'Ventanilla de admisión y estadística, Centro de Salud Tipo C «Río Puyo»',
    fondo: 'oficina',
    inicio: { confianza: 40, tension: 65 },
    pasos: [
      {
        acciones: [
          { icono: '🙋', t: 'Invitarlo a pasar a un lado para hablar con calma', p: 2, fb: 'Conversar en privado baja la tensión y evita exponer datos frente a la sala.', efecto: { confianza: 8, tension: -10 } },
          { icono: '📄', t: 'Mostrarle el formulario de autorización del paciente', p: 2, fb: 'Ofrecer la vía correcta convierte el "no" en una solución.', efecto: { confianza: 6, tension: -5 } },
          { icono: '🖨️', t: 'Imprimir la historia clínica y entregársela', p: 0, fb: 'Entregar información clínica sin autorización vulnera la confidencialidad y los derechos del paciente.', efecto: { confianza: 12, tension: -10 } },
          { icono: '🚫', t: 'Cerrar la ventanilla sin explicarle nada', p: 1, fb: 'Proteges el dato, pero la falta de explicación aumenta el conflicto.', efecto: { confianza: -10, tension: 12 } }
        ],
        conceptos: [
          { n: 'Explica que la historia clínica es confidencial', claves: ['confidencial', 'reservad', 'privad', 'secreto', 'proteccion de datos', 'datos personales', 'derecho del paciente'] },
          { n: 'Indica que se requiere la autorización de la paciente', claves: ['autorizacion', 'autoriza', 'firma', 'consentimiento', 'ella misma', 'la paciente', 'representante legal'] },
          { n: 'Mantiene un trato respetuoso y comprensivo', claves: ['entiendo', 'comprendo', 'con gusto', 'le ayudo', 'disculpe', 'senor', 'su preocupacion', 'tranquilo'] }
        ],
        evitar: [
          { claves: ['aqui tiene la copia', 'se la entrego', 'como es su hijo', 'le imprimo'], fb: 'Ser familiar no autoriza por sí solo el acceso a la historia clínica de una paciente adulta y consciente.' },
          { claves: ['no es mi problema', 'no moleste', 'vayase'], fb: 'El trato despectivo escala el conflicto.' }
        ],
        modelo: 'Entiendo su preocupación, señor. La historia clínica es confidencial y es un derecho de su mamá: para entregarle una copia necesito la autorización firmada de la paciente o de su representante legal. Le ayudo con el formulario.'
      },
      {
        acciones: [
          { icono: '🛏️', t: 'Coordinar con enfermería que ella firme en la habitación', p: 2, fb: 'Facilitar el trámite respeta la voluntad de la paciente sin exigirle desplazarse.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🩺', t: 'Pedir al médico tratante que le informe si ella consiente', p: 2, fb: 'La información clínica la da el profesional, con el consentimiento de la paciente.', efecto: { confianza: 8, tension: -6 } },
          { icono: '✍️', t: 'Dejar que el hijo firme en nombre de la madre', p: 0, fb: 'Firmar por otra persona sin representación legal es falsificar una autorización.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📅', t: 'Decirle que regrese cuando ella esté mejor', p: 1, fb: 'Posterga sin ofrecer alternativas.', efecto: { confianza: -6, tension: 6 } }
        ],
        conceptos: [
          { n: 'Propone que la paciente firme con apoyo del personal', claves: ['habitacion', 'enfermeria', 'personal', 'acompan', 'firme', 'firmar', 'apoyo'] },
          { n: 'Ofrece que el médico informe con su consentimiento', claves: ['medico', 'doctor', 'tratante', 'le informe', 'informacion', 'consiente', 'consentimiento'] },
          { n: 'Respeta la voluntad de la paciente', claves: ['voluntad', 'decision', 'respet', 'ella decide', 'su mama decide', 'si ella acepta', 'autonomia'] }
        ],
        evitar: [
          { claves: ['firme usted', 'firme por ella', 'firmo yo'], fb: 'Nadie puede firmar por la paciente sin representación legal.' }
        ],
        modelo: 'Podemos coordinar con enfermería para que su mamá firme la autorización en la habitación con apoyo del personal, o pedir que el médico tratante le informe a usted si ella da su consentimiento. Así respetamos su voluntad.'
      },
      {
        acciones: [
          { icono: '📒', t: 'Registrar solicitud y autorización en el libro de control', p: 2, fb: 'El registro deja trazabilidad del acceso a datos sensibles.', efecto: { confianza: 6, tension: -6 } },
          { icono: '🗄️', t: 'Devolver la historia al archivo de acceso restringido', p: 2, fb: 'Custodiar el documento evita accesos indebidos.', efecto: { confianza: 4, tension: -4 } },
          { icono: '💬', t: 'Comentar el caso con los compañeros en el pasillo', p: 0, fb: 'Comentar datos de pacientes en espacios comunes vulnera la confidencialidad.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Registra la solicitud y la entrega', claves: ['registr', 'libro', 'constancia', 'anoto', 'bitacora', 'control de entrega', 'fecha'] },
          { n: 'Archiva la historia con acceso restringido', claves: ['archivo', 'archivar', 'custodia', 'restringid', 'guardar', 'bajo llave', 'devuelvo'] },
          { n: 'Asegura la trazabilidad y protección del dato', claves: ['trazabilidad', 'respaldo', 'proteger', 'protege', 'seguridad', 'evidencia', 'confidencialidad'] }
        ],
        evitar: [
          { claves: ['no registro', 'no hace falta registrar', 'sin papeleo'], fb: 'Sin registro no hay trazabilidad del acceso.' }
        ],
        modelo: 'Registro en el libro de control la solicitud, la autorización y la fecha de entrega, y devuelvo la historia al archivo restringido. Así hay trazabilidad y se protege la confidencialidad.'
      }
    ]
  },

  /* ---------- 2. Adelantar una compra sin certificación ---------- */
  'compra-sin-certificacion': {
    lugar: 'Oficina de la jefatura administrativa del centro de salud',
    fondo: 'oficina',
    inicio: { confianza: 60, tension: 45 },
    pasos: [
      {
        acciones: [
          { icono: '📊', t: 'Revisar el saldo disponible de la partida en el sistema', p: 2, fb: 'Verificar la disponibilidad es el primer paso para solicitar la certificación.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📝', t: 'Preparar hoy mismo la solicitud de certificación', p: 2, fb: 'Proponer la vía legal y ágil responde a la urgencia sin incumplir.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📞', t: 'Llamar al proveedor de siempre para que entregue ya', p: 0, fb: 'Comprometer gasto sin certificación genera responsabilidad administrativa.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🙅', t: 'Negarse sin proponer ninguna alternativa', p: 1, fb: 'Cumples la norma, pero no ayudas a resolver.', efecto: { confianza: -8, tension: 8 } }
        ],
        conceptos: [
          { n: 'Señala que se requiere certificación presupuestaria previa', claves: ['certificacion', 'presupuestari', 'previa', 'antes de comprar', 'disponibilidad', 'partida'] },
          { n: 'Advierte que no se puede comprometer el gasto sin ella', claves: ['comprometer', 'compromiso', 'no se puede', 'responsabilidad', 'irregular', 'norma', 'obligacion'] },
          { n: 'Propone tramitarla de inmediato', claves: ['hoy mismo', 'tramit', 'prioridad', 'de inmediato', 'urgente', 'ahora mismo', 'solicitud'] }
        ],
        evitar: [
          { claves: ['compro ya', 'luego regularizamos', 'despues sacamos', 'como usted diga'], fb: 'Regularizar después no corrige un gasto comprometido sin certificación.' }
        ],
        modelo: 'Doctor, con respeto, sin certificación presupuestaria previa no podemos comprometer el gasto; sería irregular. Reviso la disponibilidad de la partida y tramito hoy mismo la solicitud con prioridad.'
      },
      {
        acciones: [
          { icono: '🏥', t: 'Llamar al distrito para pedir reactivos en préstamo', p: 2, fb: 'La red de establecimientos permite cubrir la urgencia sin saltarse la norma.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📋', t: 'Priorizar las muestras según criterio del laboratorio', p: 2, fb: 'Priorizar los casos con signos de alarma mientras llegan los reactivos protege a los pacientes.', efecto: { confianza: 6, tension: -4 } },
          { icono: '💵', t: 'Pedir a los pacientes que compren los reactivos', p: 0, fb: 'Trasladar el costo a los usuarios vulnera la gratuidad.', efecto: { confianza: -10, tension: 12 } }
        ],
        conceptos: [
          { n: 'Propone préstamo o redistribución en la red', claves: ['prestamo', 'redistribu', 'otro establecimiento', 'red', 'distrito', 'hospital', 'otra unidad'] },
          { n: 'Mantiene el procedimiento de compra', claves: ['procedimiento', 'contratacion', 'mientras', 'tramite', 'compra formal', 'sercop', 'proceso'] },
          { n: 'Protege la atención de los pacientes', claves: ['pacientes', 'priori', 'dengue', 'examenes', 'atencion', 'continuidad', 'gratuit'] }
        ],
        evitar: [
          { claves: ['que compren ellos', 'que paguen', 'que los pacientes compren'], fb: 'La atención pública es gratuita: no se traslada el costo a los usuarios.' }
        ],
        modelo: 'Propongo pedir al distrito un préstamo o redistribución de reactivos de otro establecimiento de la red, mientras tramitamos la compra por el procedimiento que corresponde. Así no se detienen los exámenes de dengue de los pacientes.'
      },
      {
        acciones: [
          { icono: '🗓️', t: 'Incluir los reactivos en la planificación anual de compras', p: 2, fb: 'Programar las compras evita urgencias.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📉', t: 'Calcular consumo, punto de reorden y stock de seguridad', p: 2, fb: 'El punto de reorden anticipa el pedido antes del agotamiento.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🔥', t: 'Dejar todo para compras de emergencia', p: 0, fb: 'La urgencia permanente es mala gestión y encarece las compras.', efecto: { confianza: -8, tension: 8 } }
        ],
        conceptos: [
          { n: 'Planifica las compras del año', claves: ['planific', 'plan anual', 'programar', 'cronograma', 'anticip', 'paac'] },
          { n: 'Usa punto de reorden y stock de seguridad', claves: ['punto de reorden', 'reorden', 'stock de seguridad', 'stock minimo', 'consumo', 'inventario'] },
          { n: 'Hace seguimiento del abastecimiento', claves: ['seguimiento', 'monitore', 'revisar', 'kardex', 'control', 'alerta'] }
        ],
        evitar: [
          { claves: ['siempre de urgencia', 'compras de emergencia siempre'], fb: 'Comprar siempre de urgencia evidencia falta de planificación.' }
        ],
        modelo: 'Propongo planificar las compras de reactivos en el plan anual, calcular el consumo, el punto de reorden y el stock de seguridad, y hacer seguimiento mensual del inventario en el kárdex.'
      }
    ]
  },

  /* ---------- 3. Reclamo por tiempos de espera ---------- */
  'reclamo-espera': {
    lugar: 'Sala de espera del centro de salud, junto al buzón de sugerencias',
    fondo: 'oficina',
    inicio: { confianza: 30, tension: 75 },
    pasos: [
      {
        acciones: [
          { icono: '👂', t: 'Escucharla sin interrumpir y mirarla a los ojos', p: 2, fb: 'La escucha activa reduce la tensión y muestra respeto.', efecto: { confianza: 10, tension: -10 } },
          { icono: '📝', t: 'Llenar con ella el formulario de reclamo con número', p: 2, fb: 'El registro formal garantiza seguimiento y respuesta.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🙄', t: 'Decirle que en todos lados es igual', p: 0, fb: 'Minimizar el reclamo deteriora la confianza.', efecto: { confianza: -15, tension: 15 } },
          { icono: '📮', t: 'Señalarle el buzón y volver a la ventanilla', p: 1, fb: 'El buzón sirve, pero falta escucha y seguimiento.', efecto: { confianza: -4, tension: 4 } }
        ],
        conceptos: [
          { n: 'Escucha y se disculpa', claves: ['disculp', 'lamento', 'siento mucho', 'tiene razon', 'escucho', 'entiendo', 'comprendo'] },
          { n: 'Registra el reclamo formalmente', claves: ['reclamo', 'registr', 'formulario', 'por escrito', 'numero', 'queja formal'] },
          { n: 'Informa el plazo de respuesta', claves: ['plazo', 'respuesta', 'dias', 'le responderemos', 'seguimiento', 'le informaremos'] }
        ],
        evitar: [
          { claves: ['asi es en todos lados', 'no es para tanto', 'no es mi culpa'], fb: 'Minimizar o evadir el reclamo aumenta el conflicto.' }
        ],
        modelo: 'Lamento mucho la espera, señora, tiene razón en reclamar. Registro ahora mismo su reclamo por escrito con un número y le informo que tendrá respuesta en el plazo establecido.'
      },
      {
        acciones: [
          { icono: '⏱️', t: 'Mostrar la hoja para medir tiempos por etapa', p: 2, fb: 'Medir los tiempos de admisión, preparación y consulta muestra dónde está el cuello de botella.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🗓️', t: 'Proponer citas escalonadas por horario', p: 2, fb: 'Escalonar las citas evita que todos lleguen a las 7 de la mañana.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🤞', t: 'Prometerle que mañana no habrá espera', p: 0, fb: 'Prometer lo imposible genera frustración.', efecto: { confianza: 6, tension: -2 } }
        ],
        conceptos: [
          { n: 'Medir los tiempos de espera', claves: ['medir', 'tiempos', 'por etapa', 'indicador', 'datos', 'cronometr'] },
          { n: 'Analizar las causas', claves: ['causa', 'analiz', 'cuello de botella', 'por que', 'diagnostico', 'identificar'] },
          { n: 'Proponer mejoras concretas', claves: ['mejora', 'escalonad', 'horario', 'agenda', 'turnos', 'reorganiz', 'propuesta'] }
        ],
        evitar: [
          { claves: ['manana ya no habra espera', 'le prometo que', 'nunca mas esperara'], fb: 'Las promesas imposibles destruyen la credibilidad.' }
        ],
        modelo: 'Vamos a medir los tiempos de espera por etapa, analizar las causas y proponer mejoras como citas escalonadas por horario para reorganizar la agenda.'
      },
      {
        acciones: [
          { icono: '🤝', t: 'Invitarla a la reunión del comité local de salud', p: 2, fb: 'La participación comunitaria fortalece la confianza y el control social.', efecto: { confianza: 10, tension: -8 } },
          { icono: '✉️', t: 'Comprometer una respuesta escrita a su reclamo', p: 2, fb: 'Responder por escrito cierra el ciclo del reclamo.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🗑️', t: 'Archivar el reclamo sin respuesta', p: 0, fb: 'Sin respuesta no hay confianza ni mejora.', efecto: { confianza: -15, tension: 12 } }
        ],
        conceptos: [
          { n: 'Devuelve los resultados a la comunidad', claves: ['comite', 'comunidad', 'reunion', 'asamblea', 'barrio', 'participacion'] },
          { n: 'Responde por escrito', claves: ['por escrito', 'respuesta escrita', 'oficio', 'carta', 'responder', 'documento'] },
          { n: 'Rinde cuentas con resultados', claves: ['resultado', 'rendicion de cuentas', 'informe', 'avance', 'transparen', 'datos'] }
        ],
        evitar: [
          { claves: ['no hace falta informar', 'no le vamos a responder'], fb: 'La falta de respuesta destruye la confianza.' }
        ],
        modelo: 'Le responderemos por escrito y presentaremos los resultados y avances en la reunión del comité local de salud, para rendir cuentas a la comunidad.'
      }
    ]
  },

  /* ---------- 4. Conflicto por los turnos del personal ---------- */
  'turnos-personal': {
    lugar: 'Oficina de Talento Humano del centro de salud',
    fondo: 'oficina',
    inicio: { confianza: 40, tension: 65 },
    pasos: [
      {
        acciones: [
          { icono: '🚪', t: 'Conversar con ella en privado', p: 2, fb: 'El espacio privado permite expresar el malestar sin exposición.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📈', t: 'Abrir el registro histórico de turnos del semestre', p: 2, fb: 'Los datos permiten verificar si la distribución es equitativa.', efecto: { confianza: 8, tension: -6 } },
          { icono: '👉', t: 'Decirle que si no le gusta, que renuncie', p: 0, fb: 'Desestimar el reclamo deteriora el clima laboral.', efecto: { confianza: -20, tension: 18 } },
          { icono: '🔀', t: 'Cambiarle el turno de inmediato sin revisar', p: 1, fb: 'Resuelve su caso, pero puede generar otra injusticia.', efecto: { confianza: 4, tension: -2 } }
        ],
        conceptos: [
          { n: 'Escucha el reclamo', claves: ['escucho', 'entiendo', 'cuenteme', 'comprendo', 'su malestar', 'gracias por decirme'] },
          { n: 'Verifica con el registro de turnos', claves: ['registro', 'historico', 'revisemos', 'verificar', 'datos', 'cuadro de turnos'] },
          { n: 'Se compromete con la equidad', claves: ['equidad', 'equitativ', 'justo', 'justicia', 'igual para todos', 'criterio'] }
        ],
        evitar: [
          { claves: ['renuncie', 'si no le gusta', 'aqui se hace lo que digo'], fb: 'Desestimar el reclamo deteriora el clima laboral.' }
        ],
        modelo: 'Licenciada, la escucho y entiendo su malestar. Revisemos juntas el registro histórico del cuadro de turnos para verificar si la distribución ha sido equitativa.'
      },
      {
        acciones: [
          { icono: '🔄', t: 'Diseñar un cuadro rotativo con criterios escritos', p: 2, fb: 'La rotación con reglas claras distribuye noches y feriados con equidad.', efecto: { confianza: 10, tension: -8 } },
          { icono: '👥', t: 'Socializar el cuadro con todo el equipo', p: 2, fb: 'Las reglas conocidas por todos reducen los conflictos.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🤐', t: 'Dejar el cuadro igual para no incomodar a nadie', p: 0, fb: 'Mantener la inequidad desmotiva y puede afectar la atención.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Propone un cuadro rotativo', claves: ['rotativ', 'rotacion', 'rotar', 'alternar', 'por turnos', 'cuadro'] },
          { n: 'Usa criterios transparentes', claves: ['criterio', 'transparen', 'reglas', 'claras', 'objetiv', 'equitativ'] },
          { n: 'Garantiza la cobertura y socializa', claves: ['cobertura', 'socializ', 'equipo', 'todos', 'publicar', 'atencion minima'] }
        ],
        evitar: [
          { claves: ['lo dejo igual', 'que se arreglen', 'asi funciona'], fb: 'La planificación de turnos es responsabilidad de la gestión.' }
        ],
        modelo: 'Propongo un cuadro rotativo con criterios transparentes y escritos, que garantice la cobertura mínima de atención, y socializarlo con todo el equipo.'
      },
      {
        acciones: [
          { icono: '📋', t: 'Aplicar una breve encuesta de clima laboral', p: 2, fb: 'Medir el clima muestra si la medida funcionó para todo el equipo.', efecto: { confianza: 6, tension: -4 } },
          { icono: '✅', t: 'Verificar cobertura de turnos e incidencias del mes', p: 2, fb: 'El seguimiento confirma que no quedaron turnos sin cubrir.', efecto: { confianza: 6, tension: -4 } },
          { icono: '😴', t: 'Dar el tema por cerrado sin revisar', p: 0, fb: 'Sin seguimiento vuelven los problemas.', efecto: { confianza: -8, tension: 8 } }
        ],
        conceptos: [
          { n: 'Evalúa la aplicación del cuadro', claves: ['evaluar', 'evaluo', 'revisar', 'seguimiento', 'verific', 'cumplimiento'] },
          { n: 'Considera el clima laboral', claves: ['clima laboral', 'clima', 'encuesta', 'satisfaccion', 'motivacion', 'equipo'] },
          { n: 'Ajusta lo necesario', claves: ['ajust', 'mejorar', 'corregir', 'cambios', 'actualizar', 'mejora continua'] }
        ],
        evitar: [
          { claves: ['ya no reviso', 'tema cerrado', 'no hace falta revisar'], fb: 'Sin seguimiento la medida se debilita.' }
        ],
        modelo: 'Al mes evalúo el cumplimiento del cuadro y la cobertura, aplico una encuesta de clima laboral al equipo y ajusto lo necesario.'
      }
    ]
  },

  /* ---------- 5. Campaña de vacunación en comunidades kichwa ---------- */
  'vacunacion-kichwa': {
    lugar: 'Casa comunal de una comunidad kichwa a orillas del río Bobonaza',
    fondo: 'comunidad',
    inicio: { confianza: 35, tension: 55 },
    pasos: [
      {
        acciones: [
          { icono: '🗣️', t: 'Saludar en kichwa y pedir la palabra en la asamblea', p: 2, fb: 'Respetar la organización comunitaria y el idioma genera confianza.', efecto: { confianza: 12, tension: -8 } },
          { icono: '📆', t: 'Acordar con la directiva la fecha y el lugar', p: 2, fb: 'La planificación conjunta mejora la participación.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📢', t: 'Anunciar que la vacuna es obligatoria y punto', p: 0, fb: 'La imposición genera rechazo.', efecto: { confianza: -15, tension: 15 } },
          { icono: '🧾', t: 'Pegar afiches en castellano en la escuela', p: 1, fb: 'Información útil, pero no llega a todos.', efecto: { confianza: 2, tension: 0 } }
        ],
        conceptos: [
          { n: 'Coordina con la asamblea y la directiva', claves: ['asamblea', 'directiva', 'presidente', 'coordinar', 'comunidad', 'dirigentes'] },
          { n: 'Comunica en kichwa', claves: ['kichwa', 'su idioma', 'idioma propio', 'traductor', 'interprete', 'lengua'] },
          { n: 'Acuerda la campaña con la comunidad', claves: ['acord', 'juntos', 'fecha', 'lugar', 'consulta', 'participacion'] }
        ],
        evitar: [
          { claves: ['es obligatoria y punto', 'tienen que vacunarse si o si'], fb: 'La imposición rompe la confianza comunitaria.' }
        ],
        modelo: 'Don Segundo, esta vez queremos coordinar primero con la asamblea y la directiva, explicar la campaña en kichwa y acordar juntos la fecha y el lugar de la vacunación.'
      },
      {
        acciones: [
          { icono: '🌿', t: 'Escuchar a los sabios sobre sus prácticas de cuidado', p: 2, fb: 'Valorar los saberes ancestrales abre el diálogo intercultural.', efecto: { confianza: 12, tension: -8 } },
          { icono: '🧑🏽‍⚕️', t: 'Invitar al promotor de salud comunitario a explicar', p: 2, fb: 'Un referente de la comunidad transmite mejor la información.', efecto: { confianza: 8, tension: -6 } },
          { icono: '❌', t: 'Decir que los remedios tradicionales no sirven', p: 0, fb: 'Descalificar saberes rompe la confianza.', efecto: { confianza: -18, tension: 15 } }
        ],
        conceptos: [
          { n: 'Respeta los saberes ancestrales', claves: ['respet', 'saberes', 'ancestral', 'tradicion', 'medicina tradicional', 'sabios'] },
          { n: 'Dialoga y responde dudas', claves: ['dialog', 'dudas', 'preguntas', 'conversar', 'explicar', 'escuchar'] },
          { n: 'Explica los beneficios de la vacuna', claves: ['beneficio', 'protege', 'prevenir', 'enfermedades', 'vacuna', 'salud de los ninos'] }
        ],
        evitar: [
          { claves: ['remedios no sirven', 'eso es brujeria', 'son ignorantes'], fb: 'Descalificar la cultura rompe el diálogo intercultural.' }
        ],
        modelo: 'Respetamos los saberes ancestrales de los sabios. Propongo un diálogo con ellos y el promotor de salud para explicar cómo la vacuna protege a los niños de enfermedades y responder todas sus dudas.'
      },
      {
        acciones: [
          { icono: '📊', t: 'Calcular la cobertura por comunidad frente a la meta', p: 2, fb: 'La cobertura es el indicador clave de una campaña de vacunación.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🗓️', t: 'Programar la devolución de resultados en asamblea', p: 2, fb: 'Devolver resultados es rendición de cuentas a la comunidad.', efecto: { confianza: 8, tension: -4 } },
          { icono: '📸', t: 'Medir el éxito solo con fotos para redes', p: 0, fb: 'Las fotos no miden la cobertura.', efecto: { confianza: -6, tension: 4 } }
        ],
        conceptos: [
          { n: 'Mide la cobertura de vacunación', claves: ['cobertura', 'porcentaje', 'vacunados', 'medir', 'indicador', 'cuantos'] },
          { n: 'Compara con la meta', claves: ['meta', 'compar', 'programado', 'objetivo', 'esperado', 'planificado'] },
          { n: 'Devuelve los resultados a la comunidad', claves: ['devolver', 'devolucion', 'asamblea', 'informar a la comunidad', 'resultados', 'rendicion de cuentas'] }
        ],
        evitar: [
          { claves: ['no hace falta medir', 'con las fotos basta'], fb: 'Sin medición no se puede evaluar ni mejorar.' }
        ],
        modelo: 'Mediremos la cobertura de vacunación de cada comunidad, la compararemos con la meta y devolveremos los resultados en la asamblea comunitaria.'
      }
    ]
  },

  /* ---------- 6. Agendamiento digital que excluye a adultos mayores ---------- */
  'agendamiento-digital': {
    lugar: 'Sala de reuniones del distrito de salud, videollamada con el centro',
    fondo: 'oficina',
    inicio: { confianza: 55, tension: 45 },
    pasos: [
      {
        acciones: [
          { icono: '📈', t: 'Mostrar cuántos mayores de 65 agendan en ventanilla', p: 2, fb: 'Los datos de admisión hacen visible quién quedaría excluido.', efecto: { confianza: 8, tension: -4 } },
          { icono: '📶', t: 'Señalar en el mapa las comunidades sin señal', p: 2, fb: 'La conectividad rural es una barrera real de acceso.', efecto: { confianza: 6, tension: -2 } },
          { icono: '👍', t: 'Aprobar la aplicación como único canal', p: 0, fb: 'Un solo canal digital excluye a grupos vulnerables.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🤷', t: 'No opinar y esperar la decisión del distrito', p: 1, fb: 'Falta aportar desde la experiencia de atención.', efecto: { confianza: -4, tension: 2 } }
        ],
        conceptos: [
          { n: 'Valora la innovación', claves: ['innovacion', 'buena idea', 'moderniz', 'valoro', 'aplicacion', 'digital'] },
          { n: 'Advierte la exclusión de grupos vulnerables', claves: ['adultos mayores', 'excluir', 'exclusion', 'brecha digital', 'sin senal', 'vulnerable', 'rural'] },
          { n: 'Propone mantener canales alternativos', claves: ['canales', 'telefono', 'ventanilla', 'presencial', 'alternativ', 'tambien'] }
        ],
        evitar: [
          { claves: ['que aprendan', 'solo por la aplicacion', 'el que no sepa que se quede'], fb: 'El servicio de salud debe ser accesible para todos.' }
        ],
        modelo: 'Valoro la innovación de la aplicación, pero como único canal excluiría a los adultos mayores y a las comunidades rurales sin señal. Propongo mantener canales alternativos: teléfono y ventanilla presencial.'
      },
      {
        acciones: [
          { icono: '🧑‍🏫', t: 'Organizar un punto de ayuda digital en la sala de espera', p: 2, fb: 'El acompañamiento reduce la brecha digital.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🔠', t: 'Proponer letras grandes y botones sencillos', p: 2, fb: 'El diseño accesible facilita el uso a personas mayores.', efecto: { confianza: 8, tension: -4 } },
          { icono: '💲', t: 'Cobrar un recargo a quien agende en ventanilla', p: 0, fb: 'Vulnera la gratuidad y castiga a quienes ya están excluidos.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Acompaña a los usuarios', claves: ['punto de ayuda', 'acompan', 'ayudar', 'capacit', 'orientar', 'ensenar'] },
          { n: 'Diseño accesible y sencillo', claves: ['letras grandes', 'sencill', 'facil', 'accesib', 'botones', 'interfaz'] },
          { n: 'Comunicación intercultural', claves: ['kichwa', 'castellano', 'idioma', 'mensajes', 'radio', 'intercultural'] }
        ],
        evitar: [
          { claves: ['cobrar', 'recargo', 'multa'], fb: 'La atención pública es gratuita.' }
        ],
        modelo: 'Propongo un punto de ayuda en la sala de espera para acompañar a los usuarios, una interfaz sencilla y accesible con letras grandes, y mensajes en kichwa y castellano por la radio local.'
      },
      {
        acciones: [
          { icono: '📊', t: 'Definir indicadores de citas por canal y edad', p: 2, fb: 'Desagregar por edad muestra si alguien queda excluido.', efecto: { confianza: 8, tension: -4 } },
          { icono: '⭐', t: 'Programar una encuesta de satisfacción trimestral', p: 2, fb: 'La percepción del usuario complementa los datos del sistema.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📥', t: 'Medir el éxito solo por las descargas', p: 0, fb: 'Las descargas no dicen si la gente consigue su cita.', efecto: { confianza: -6, tension: 4 } }
        ],
        conceptos: [
          { n: 'Mide citas por canal y grupo de edad', claves: ['canal', 'grupo de edad', 'por edad', 'citas', 'desagreg', 'adultos mayores'] },
          { n: 'Mide espera, inasistencias y satisfacción', claves: ['espera', 'inasistencia', 'satisfaccion', 'encuesta', 'ausentismo', 'tiempo'] },
          { n: 'Ajusta con mejora continua', claves: ['ajust', 'mejora continua', 'phva', 'corregir', 'evaluar', 'mejorar'] }
        ],
        evitar: [
          { claves: ['solo las descargas', 'no hace falta medir'], fb: 'Un dato parcial no evalúa la inclusión.' }
        ],
        modelo: 'Mediremos las citas por canal y por grupo de edad, el tiempo de espera, las inasistencias y la satisfacción con una encuesta, y ajustaremos con mejora continua.'
      }
    ]
  }
});
