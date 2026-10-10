/* Casos vivos – Gestión de Operaciones Turísticas: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {

  /* ---------- 1. Artesanías con plumas de especies protegidas ---------- */
  'artesanias': {
    lugar: 'Feria artesanal del malecón de Puyo',
    fondo: 'comunidad',
    inicio: { confianza: 55, tension: 40 },
    pasos: [
      {
        acciones: [
          { icono: '🦜', t: 'Señalar las plumas y explicar que son de guacamayo', p: 2, fb: 'Identificar la especie ayuda al turista a entender por qué el producto es ilegal.', efecto: { confianza: 6, tension: 5 } },
          { icono: '📄', t: 'Mostrarle la guía de compras responsables de la operadora', p: 2, fb: 'Un material escrito respalda tu explicación y evita discusiones.', efecto: { confianza: 8, tension: -4 } },
          { icono: '💵', t: 'Ayudarle a regatear el precio del tocado', p: 0, fb: 'Facilitar la compra te hace partícipe del tráfico de fauna silvestre.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🤐', t: 'Mirar hacia otro lado mientras paga', p: 0, fb: 'Callar ante un delito ambiental es omitir tu responsabilidad como guía.', efecto: { confianza: 0, tension: -3 } }
        ],
        conceptos: [
          { n: 'Explica que son especies protegidas', claves: ['protegid', 'fauna silvestre', 'guacamayo', 'felino', 'especie', 'en peligro', 'vida silvestre'] },
          { n: 'Señala que su comercio es ilegal', claves: ['ilegal', 'delito', 'prohibid', 'trafico', 'no esta permitido', 'la ley', 'sancion'] },
          { n: 'Lo hace con amabilidad', claves: ['por favor', 'amig', 'entiendo', 'le recomiendo', 'disculpe', 'con gusto', 'sir', 'please'] }
        ],
        evitar: [
          { claves: ['comprelo', 'llevelo', 'escondalo', 'nadie se da cuenta'], fb: 'Promover la compra de fauna protegida es participar en un delito.' }
        ],
        modelo: 'Disculpe, le recomiendo no comprarlo: esas plumas son de guacamayo, una especie protegida, y su comercio es ilegal porque fomenta la caza y el tráfico de fauna silvestre.'
      },
      {
        acciones: [
          { icono: '🧺', t: 'Llevarlo al puesto de tejidos de fibra de chambira', p: 2, fb: 'Las artesanías con materiales legales generan ingresos sin dañar la fauna.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🏺', t: 'Presentarle a la ceramista de la comunidad', p: 2, fb: 'Comprar directamente al artesano maximiza el beneficio local.', efecto: { confianza: 8, tension: -6 } },
          { icono: '👕', t: 'Mandarlo a comprar una camiseta al hotel', p: 1, fb: 'Es legal, pero no apoya a los artesanos ni valora la cultura local.', efecto: { confianza: 2, tension: 0 } },
          { icono: '🤫', t: 'Indicarle otro puesto donde venden plumas "a escondidas"', p: 0, fb: 'Orientar hacia el comercio ilegal es una falta grave.', efecto: { confianza: 6, tension: 10 } }
        ],
        conceptos: [
          { n: 'Recomienda artesanías legales', claves: ['artesania', 'tejido', 'ceramica', 'semilla', 'chambira', 'madera certificada', 'balsa'] },
          { n: 'Propone comprar directo a los artesanos', claves: ['artesano', 'directamente', 'directo', 'comunidad', 'productores', 'a las artesanas'] },
          { n: 'Destaca el beneficio sostenible', claves: ['sostenible', 'beneficio', 'apoya', 'ingreso', 'sin danar', 'responsable', 'conserva'] }
        ],
        evitar: [
          { claves: ['a escondidas', 'en otro puesto venden plumas', 'nadie revisa'], fb: 'Nunca orientes hacia el comercio ilegal.' }
        ],
        modelo: 'Le recomiendo estas artesanías de tejido de chambira y cerámica: puede comprarlas directamente a los artesanos de la comunidad, así su recuerdo es sostenible y apoya el ingreso local.'
      },
      {
        acciones: [
          { icono: '🙏', t: 'Saludar con respeto al vendedor antes de hablar', p: 2, fb: 'Iniciar con respeto baja la tensión y abre el diálogo.', efecto: { confianza: 8, tension: -8 } },
          { icono: '📞', t: 'Informar a la operadora para canalizar el caso', p: 2, fb: 'Las situaciones de comercio de fauna se canalizan a la autoridad ambiental por la vía formal.', efecto: { confianza: 4, tension: 2 } },
          { icono: '📸', t: 'Tomarle fotos para subirlas a redes', p: 0, fb: 'Exponer públicamente genera confrontación y no es el canal adecuado.', efecto: { confianza: -15, tension: 18 } }
        ],
        conceptos: [
          { n: 'Habla con respeto al vendedor', claves: ['respeto', 'buenas tardes', 'buenos dias', 'disculpe', 'senor', 'comprendo', 'entiendo'] },
          { n: 'Explica el riesgo legal y ambiental', claves: ['ilegal', 'delito', 'sancion', 'ambiental', 'especie', 'fauna', 'riesgo'] },
          { n: 'Canaliza por la vía formal', claves: ['operadora', 'autoridad', 'ministerio del ambiente', 'reportar', 'denuncia', 'canal', 'informare'] }
        ],
        evitar: [
          { claves: ['redes sociales', 'lo voy a escrachar', 'facebook', 'ladron'], fb: 'Insultar o exponer en redes escala el conflicto.' }
        ],
        modelo: 'Buenas tardes, señor, con respeto: vender plumas de especies protegidas es un delito ambiental y puede traerle sanciones. Informaré a la operadora para que lo canalice con la autoridad ambiental.'
      }
    ]
  },

  /* ---------- 2. La agencia pide sobrevender cupos ---------- */
  'sobreventa': {
    lugar: 'Oficina de la agencia de viajes en Puyo',
    fondo: 'oficina',
    inicio: { confianza: 50, tension: 55 },
    pasos: [
      {
        acciones: [
          { icono: '🚐', t: 'Mostrar la capacidad del transporte: 12 asientos', p: 2, fb: 'La capacidad real del vehículo es un límite legal y de seguridad.', efecto: { confianza: 6, tension: 4 } },
          { icono: '📊', t: 'Mostrar la capacidad de carga acordada con la comunidad', p: 2, fb: 'Respetar la capacidad de carga protege el recurso y la relación con la comunidad.', efecto: { confianza: 6, tension: 2 } },
          { icono: '💻', t: 'Abrir 18 cupos en el sistema de reservas', p: 0, fb: 'Sobrevender genera turistas sin servicio, reclamos y riesgos.', efecto: { confianza: 10, tension: -10 } }
        ],
        conceptos: [
          { n: 'Indica la capacidad máxima', claves: ['capacidad', 'doce', '12', 'asientos', 'cupos', 'maximo', 'limite'] },
          { n: 'Explica el riesgo de la sobreventa', claves: ['sobreventa', 'sobrevender', 'overbooking', 'reclamo', 'riesgo', 'sin servicio', 'insegur'] },
          { n: 'Menciona la seguridad o la comunidad', claves: ['seguridad', 'seguro', 'comunidad', 'capacidad de carga', 'transporte', 'ley'] }
        ],
        evitar: [
          { claves: ['vendo los 18', 'que se acomoden', 'como usted diga'], fb: 'Aceptar la sobreventa pone en riesgo a los turistas.' }
        ],
        modelo: 'Señor Fabián, la capacidad es de 12 cupos por los asientos del transporte y la capacidad de carga de la comunidad. Sobrevender nos expone a reclamos y a riesgos de seguridad.'
      },
      {
        acciones: [
          { icono: '🗓️', t: 'Proponer una segunda salida el domingo', p: 2, fb: 'Una nueva salida planificada aprovecha la demanda sin bajar la calidad.', efecto: { confianza: 10, tension: -10 } },
          { icono: '📝', t: 'Crear una lista de espera con confirmación', p: 2, fb: 'La lista de espera permite cubrir cancelaciones de forma ordenada.', efecto: { confianza: 6, tension: -6 } },
          { icono: '🛻', t: 'Buscar una camioneta particular para los extras', p: 0, fb: 'El transporte no habilitado es ilegal e inseguro.', efecto: { confianza: 4, tension: 8 } }
        ],
        conceptos: [
          { n: 'Propone una nueva salida o lista de espera', claves: ['segunda salida', 'otra salida', 'otra fecha', 'lista de espera', 'domingo', 'nuevo grupo'] },
          { n: 'Usa recursos autorizados', claves: ['autorizad', 'otro guia', 'habilitad', 'registrad', 'transporte turistico', 'legal'] },
          { n: 'Aprovecha la demanda sin bajar la calidad', claves: ['demanda', 'mas ventas', 'calidad', 'aprovechar', 'ingresos', 'clientes satisfechos'] }
        ],
        evitar: [
          { claves: ['camioneta particular', 'en el balde', 'taxi informal'], fb: 'Nunca uses transporte no habilitado.' }
        ],
        modelo: 'Para aprovechar la demanda sin bajar la calidad, propongo abrir una segunda salida el domingo con otro guía y transporte autorizado, y una lista de espera.'
      },
      {
        acciones: [
          { icono: '📞', t: 'Llamar de inmediato al cliente número 13', p: 2, fb: 'Avisar a tiempo y con transparencia protege la confianza del cliente.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🛠️', t: 'Corregir el límite de cupos en el sistema web', p: 2, fb: 'Corregir la causa evita que el error se repita.', efecto: { confianza: 5, tension: -4 } },
          { icono: '🙈', t: 'No avisar y esperar a que alguien falte', p: 0, fb: 'Postergar puede dejar a un turista sin servicio.', efecto: { confianza: -8, tension: 10 } }
        ],
        conceptos: [
          { n: 'Informa con transparencia y pide disculpas', claves: ['disculp', 'transparen', 'le informo', 'error', 'lamentamos', 'sinceramente'] },
          { n: 'Ofrece otra fecha o el reembolso', claves: ['otra fecha', 'reembolso', 'devolucion', 'cambio de fecha', 'reprogramar', 'devolver'] },
          { n: 'Corrige el sistema de reservas', claves: ['sistema', 'reservas', 'corregir', 'corregimos', 'limite de cupos', 'web'] }
        ],
        evitar: [
          { claves: ['no le digo nada', 'que espere', 'ya vera'], fb: 'Ocultar el problema al cliente es una falta grave.' }
        ],
        modelo: 'Le pido disculpas: por un error se vendió un cupo de más. Le ofrezco otra fecha o el reembolso completo, y ya estamos corrigiendo el sistema de reservas.'
      }
    ]
  },

  /* ---------- 3. El líder comunitario reclama un pago injusto ---------- */
  'pago-justo': {
    lugar: 'Casa comunal de la comunidad kichwa anfitriona',
    fondo: 'comunidad',
    inicio: { confianza: 35, tension: 65 },
    pasos: [
      {
        acciones: [
          { icono: '🪑', t: 'Sentarse con Don Segundo en la casa comunal', p: 2, fb: 'Conversar sentados y sin prisa muestra respeto por la autoridad comunitaria.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📑', t: 'Pedir el acuerdo firmado y los registros de visitantes', p: 2, fb: 'Revisar las evidencias permite verificar el reclamo.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📱', t: 'Contestar el celular mientras él habla', p: 0, fb: 'Desatender a quien reclama aumenta la desconfianza.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Escucha y agradece la confianza', claves: ['gracias', 'agradezco', 'le escucho', 'entiendo', 'comprendo', 'confianza'] },
          { n: 'Reconoce el reclamo con respeto', claves: ['respeto', 'tiene razon', 'es justo', 'reclamo', 'preocupacion', 'don segundo'] },
          { n: 'Propone revisar el acuerdo y los registros', claves: ['acuerdo', 'contrato', 'registro', 'revisar', 'revisemos', 'documento', 'firmado'] }
        ],
        evitar: [
          { claves: ['no es mi problema', 'hable con la oficina', 'yo que se'], fb: 'El guía es el enlace con la comunidad; no puede desentenderse.' }
        ],
        modelo: 'Don Segundo, gracias por su confianza; entiendo su preocupación y la respeto. Revisemos juntos el acuerdo firmado y el registro de visitantes para verificar los pagos.'
      },
      {
        acciones: [
          { icono: '🧮', t: 'Calcular con él el costo real por visitante', p: 2, fb: 'El costeo transparente sustenta una tarifa justa.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📝', t: 'Redactar un informe para la operadora', p: 2, fb: 'Un informe con datos lleva el reclamo a quien decide.', efecto: { confianza: 6, tension: -5 } },
          { icono: '🪙', t: 'Sugerir que pidan propinas a los turistas', p: 1, fb: 'Las propinas no sustituyen un pago acordado y estable.', efecto: { confianza: -4, tension: 4 } },
          { icono: '😠', t: 'Advertir que la operadora buscará otra comunidad', p: 0, fb: 'Amenazar a la comunidad es abusivo y contrario al turismo sostenible.', efecto: { confianza: -20, tension: 20 } }
        ],
        conceptos: [
          { n: 'Calcula el costo real por visitante', claves: ['costo', 'calcul', 'por visitante', 'alimentos', 'gastos', 'cuanto cuesta'] },
          { n: 'Propone una tarifa justa', claves: ['tarifa justa', 'pago justo', 'precio justo', 'justo', 'equitativ', 'tarifa'] },
          { n: 'Pide pagos puntuales a la operadora', claves: ['puntual', 'a tiempo', 'plazo', 'informe', 'operadora', 'sin retraso'] }
        ],
        evitar: [
          { claves: ['buscaremos otra comunidad', 'si se quejan', 'propinas nomas'], fb: 'Amenazar o desviar el reclamo rompe la confianza.' }
        ],
        modelo: 'Calculemos el costo real por visitante: alimentos, guianza local y mantenimiento. Con eso preparo un informe a la operadora con una tarifa justa y pagos puntuales.'
      },
      {
        acciones: [
          { icono: '✍️', t: 'Presentar un borrador de acuerdo escrito', p: 2, fb: 'Un acuerdo formal protege a la comunidad y a la operadora.', efecto: { confianza: 10, tension: -10 } },
          { icono: '👥', t: 'Invitar a la asamblea comunitaria a validarlo', p: 2, fb: 'La decisión colectiva legitima el acuerdo.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🤝', t: 'Proponer que lo acuerden de palabra', p: 1, fb: 'Los acuerdos verbales originaron el conflicto.', efecto: { confianza: -4, tension: 4 } },
          { icono: '🚶', t: 'Retirarse de la reunión sin opinar', p: 0, fb: 'Tu rol de enlace es clave; ausentarte deja el conflicto sin mediación.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Propone un acuerdo escrito', claves: ['por escrito', 'acuerdo escrito', 'convenio', 'contrato', 'firmar', 'documento'] },
          { n: 'Incluye tarifa, plazos y capacidad', claves: ['tarifa', 'plazo', 'capacidad', 'normas de visita', 'fecha de pago', 'maximo de visitantes'] },
          { n: 'Prevé revisión periódica y participación', claves: ['revision', 'periodic', 'cada ano', 'cada seis meses', 'asamblea', 'evaluar'] }
        ],
        evitar: [
          { claves: ['de palabra', 'como siempre', 'no hace falta firmar'], fb: 'Sin acuerdo escrito, el conflicto puede repetirse.' }
        ],
        modelo: 'Propongo un acuerdo por escrito con la tarifa por visitante, el plazo de pago, la capacidad máxima y las normas de visita, validado en asamblea y con revisión periódica cada seis meses.'
      }
    ]
  },

  /* ---------- 4. Un turista se pierde en el sendero ---------- */
  'perdido': {
    lugar: 'Sendero de la cascada, a 40 minutos de la vía',
    fondo: 'exterior',
    inicio: { confianza: 40, tension: 80 },
    pasos: [
      {
        acciones: [
          { icono: '📻', t: 'Avisar por radio a la base de la operadora', p: 2, fb: 'Alertar a la base activa el apoyo desde el primer momento.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🧑‍🤝‍🧑', t: 'Reunir al grupo en un punto seguro con el guía de apoyo', p: 2, fb: 'Asegurar al resto evita que haya más personas perdidas.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🏃', t: 'Salir corriendo solo por la selva', p: 0, fb: 'Dejar al grupo sin guía y buscar sin plan multiplica el riesgo.', efecto: { confianza: -6, tension: 12 } }
        ],
        conceptos: [
          { n: 'Calma a la madre', claves: ['calma', 'tranquila', 'tranquilicese', 'lo vamos a encontrar', 'estoy aqui', 'confie'] },
          { n: 'Reúne y asegura al grupo', claves: ['grupo', 'reunid', 'juntos', 'punto seguro', 'nadie se mueva', 'guia de apoyo'] },
          { n: 'Pide información y alerta a la base', claves: ['donde lo vio', 'ultima vez', 'radio', 'base', 'aviso', 'ropa'] }
        ],
        evitar: [
          { claves: ['ya aparecera', 'sigamos el recorrido', 'no exagere'], fb: 'Una persona extraviada es una emergencia.' }
        ],
        modelo: 'Rosa, mantenga la calma, lo vamos a encontrar. El grupo se queda reunido en este punto seguro con el guía de apoyo. ¿Dónde lo vio por última vez? Ya aviso por radio a la base.'
      },
      {
        acciones: [
          { icono: '🗺️', t: 'Asignar sectores de búsqueda en el mapa del sendero', p: 2, fb: 'La búsqueda por sectores es más rápida y segura.', efecto: { confianza: 8, tension: -6 } },
          { icono: '📣', t: 'Llamar a Mateo por su nombre en el cruce de caminos', p: 2, fb: 'Revisar primero los puntos de decisión del sendero aumenta las probabilidades.', efecto: { confianza: 6, tension: -8 } },
          { icono: '👐', t: 'Pedir a los turistas que se dispersen a buscar', p: 0, fb: 'Dispersar al grupo multiplica las personas en riesgo.', efecto: { confianza: -10, tension: 14 } }
        ],
        conceptos: [
          { n: 'Organiza la búsqueda por sectores', claves: ['sector', 'busqueda', 'tramo', 'cruce', 'organiz', 'ultimo tramo'] },
          { n: 'Mantiene al grupo sin dispersarse', claves: ['no se dispersen', 'quedan aqui', 'grupo reunido', 'guia de apoyo', 'nadie sale'] },
          { n: 'Activa ayuda externa a tiempo', claves: ['ecu 911', '911', 'emergencia', 'rescate', 'bomberos', 'policia'] }
        ],
        evitar: [
          { claves: ['todos a buscar', 'separense', 'esperemos media hora'], fb: 'Dispersarse o esperar demasiado aumenta el riesgo.' }
        ],
        modelo: 'Organizo la búsqueda por sectores: el guía de apoyo revisa el último tramo y yo el cruce de caminos; el grupo queda reunido. Si no aparece en diez minutos activamos el ECU 911.'
      },
      {
        acciones: [
          { icono: '🩺', t: 'Revisar a Mateo: heridas, frío o deshidratación', p: 2, fb: 'Evaluar el estado del niño es la prioridad tras encontrarlo.', efecto: { confianza: 10, tension: -10 } },
          { icono: '📒', t: 'Registrar el incidente en el informe de la operación', p: 2, fb: 'El registro permite analizar causas y prevenir.', efecto: { confianza: 4, tension: -2 } },
          { icono: '😤', t: 'Regañarlo frente a todo el grupo', p: 0, fb: 'Regañar a un niño asustado no ayuda; hay que contener y prevenir.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Verifica su estado de salud', claves: ['estas bien', 'herid', 'revis', 'agua', 'frio', 'te duele', 'estado'] },
          { n: 'Refuerza las normas del sendero', claves: ['parejas', 'no salir del sendero', 'sendero', 'norma', 'juntos', 'siempre cerca'] },
          { n: 'Registra el incidente', claves: ['registr', 'informe', 'reporte', 'bitacora', 'anoto'] }
        ],
        evitar: [
          { claves: ['malcriado', 'por tu culpa', 'castigado'], fb: 'Culpar al niño no previene nuevos incidentes.' }
        ],
        modelo: 'Mateo, ¿estás bien? Voy a revisar que no tengas heridas y te doy agua. Desde ahora caminamos en parejas y nadie sale del sendero. Registraré el incidente en el informe.'
      }
    ]
  },

  /* ---------- 5. Queja por el servicio de alojamiento ---------- */
  'alojamiento': {
    lugar: 'Recepción de una hostería de Puyo',
    fondo: 'oficina',
    inicio: { confianza: 30, tension: 75 },
    pasos: [
      {
        acciones: [
          { icono: '👂', t: 'Escucharla sin interrumpir y asentir', p: 2, fb: 'La escucha activa es el primer paso del manejo de quejas.', efecto: { confianza: 10, tension: -10 } },
          { icono: '💻', t: 'Revisar la reserva en el sistema', p: 2, fb: 'Verificar lo contratado permite responder con datos.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🙄', t: 'Decirle que todas las habitaciones son iguales', p: 0, fb: 'Negar el problema aumenta la molestia.', efecto: { confianza: -15, tension: 15 } }
        ],
        conceptos: [
          { n: 'Se disculpa', claves: ['disculp', 'lamento', 'lo siento', 'perdone', 'tiene razon'] },
          { n: 'Escucha y comprende', claves: ['entiendo', 'comprendo', 'le escucho', 'su molestia', 'es valido'] },
          { n: 'Revisa la reserva', claves: ['reserva', 'revis', 'verific', 'sistema', 'paquete', 'confirmar'] }
        ],
        evitar: [
          { claves: ['todas son iguales', 'no es mi culpa', 'asi es aqui'], fb: 'Negar o justificarse escala la queja.' }
        ],
        modelo: 'Señora Patricia, lamento mucho lo ocurrido y entiendo su molestia. Permítame revisar su reserva en el sistema para confirmar lo que incluye su paquete.'
      },
      {
        acciones: [
          { icono: '🔑', t: 'Entregar la llave de una habitación con vista al río', p: 2, fb: 'Cumplir lo contratado es la solución principal.', efecto: { confianza: 12, tension: -12 } },
          { icono: '🔧', t: 'Reportar la falla del agua caliente a mantenimiento', p: 2, fb: 'El reporte interno corrige la causa del problema.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🍹', t: 'Ofrecerle un cóctel de cortesía', p: 1, fb: 'Es un gesto positivo, pero no reemplaza la solución.', efecto: { confianza: 4, tension: -3 } },
          { icono: '🚪', t: 'Decirle que puede irse a otro hotel', p: 0, fb: 'Una respuesta hostil convierte la queja en crisis.', efecto: { confianza: -18, tension: 18 } }
        ],
        conceptos: [
          { n: 'Ofrece el cambio de habitación', claves: ['cambio', 'cambiarla', 'vista al rio', 'otra habitacion', 'habitacion reservada', 'llave'] },
          { n: 'Reporta la falla a mantenimiento', claves: ['mantenimiento', 'agua caliente', 'reparar', 'reporto', 'tecnico', 'arreglar'] },
          { n: 'Ofrece una compensación', claves: ['cortesia', 'compensa', 'desayuno', 'descuento', 'obsequio', 'gentileza'] }
        ],
        evitar: [
          { claves: ['vayase', 'otro hotel', 'si no le gusta'], fb: 'Echar al cliente destruye la reputación del establecimiento.' }
        ],
        modelo: 'Le cambio ahora mismo a una habitación con vista al río, reporto la falla del agua caliente a mantenimiento y, como compensación, le ofrecemos el desayuno de cortesía.'
      },
      {
        acciones: [
          { icono: '📋', t: 'Pedirle que llene la encuesta de satisfacción', p: 2, fb: 'La encuesta mide si la solución fue efectiva.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🗂️', t: 'Registrar la queja y la solución en el sistema', p: 2, fb: 'El registro permite analizar quejas repetidas y mejorar.', efecto: { confianza: 4, tension: -2 } },
          { icono: '🧾', t: 'Cobrarle la cortesía en la factura', p: 0, fb: 'Cobrar lo ofrecido como compensación es una falta grave.', efecto: { confianza: -20, tension: 18 } }
        ],
        conceptos: [
          { n: 'Hace seguimiento de la satisfacción', claves: ['conforme', 'satisfech', 'como estuvo', 'encuesta', 'opinion', 'seguimiento'] },
          { n: 'Registra la queja', claves: ['registr', 'sistema', 'anot', 'reporte', 'historial'] },
          { n: 'Propone mejorar el proceso', claves: ['mejor', 'proceso', 'asignacion', 'evitar que se repita', 'revisar', 'capacita'] }
        ],
        evitar: [
          { claves: ['le cobro la cortesia', 'se le cobra todo'], fb: 'Cumple lo ofrecido al cliente.' }
        ],
        modelo: '¿Quedó conforme con la nueva habitación? Registré su queja y la solución en el sistema, y propondré revisar el proceso de asignación de habitaciones para evitar que se repita.'
      }
    ]
  },

  /* ---------- 6. Crear un producto de turismo comunitario ---------- */
  'producto': {
    lugar: 'Chakra y cocina de la asociación de mujeres kichwa',
    fondo: 'comunidad',
    inicio: { confianza: 50, tension: 35 },
    pasos: [
      {
        acciones: [
          { icono: '🗣️', t: 'Convocar un taller participativo con las socias', p: 2, fb: 'El producto comunitario nace de la decisión colectiva.', efecto: { confianza: 10, tension: -6 } },
          { icono: '📋', t: 'Elaborar con ellas el inventario de atractivos y saberes', p: 2, fb: 'El inventario es la base del diagnóstico turístico.', efecto: { confianza: 8, tension: -4 } },
          { icono: '📦', t: 'Entregar un paquete copiado de otra comunidad', p: 1, fb: 'Copiar no valora la identidad propia.', efecto: { confianza: -4, tension: 4 } },
          { icono: '☝️', t: 'Decidir tú qué se va a mostrar', p: 0, fb: 'Imponer el diseño vulnera la autonomía comunitaria.', efecto: { confianza: -14, tension: 12 } }
        ],
        conceptos: [
          { n: 'Propone un diagnóstico participativo', claves: ['diagnostico', 'participativ', 'taller', 'asamblea', 'todas opinen', 'juntas'] },
          { n: 'Inventaría atractivos y saberes', claves: ['inventario', 'atractivo', 'saberes', 'chakra', 'cocina', 'artesania'] },
          { n: 'Respeta lo que la comunidad decide mostrar', claves: ['decidan', 'quieren mostrar', 'no quieren', 'autonomia', 'respet', 'ustedes deciden'] }
        ],
        evitar: [
          { claves: ['yo decido', 'yo se lo que buscan', 'copiamos'], fb: 'La comunidad debe decidir su producto.' }
        ],
        modelo: 'Empecemos con un diagnóstico participativo: en un taller hacemos juntas el inventario de atractivos y saberes, como la chakra y la cocina, y ustedes deciden qué quieren mostrar y qué no.'
      },
      {
        acciones: [
          { icono: '🧭', t: 'Dibujar el itinerario de medio día en un papelógrafo', p: 2, fb: 'El itinerario ordena la experiencia y los tiempos.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🧮', t: 'Calcular los costos por visitante con la tesorera', p: 2, fb: 'El costeo sustenta un precio que cubra costos y deje margen.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🆓', t: 'Proponer que sea gratis para atraer turistas', p: 0, fb: 'Un producto sin ingresos no es sostenible.', efecto: { confianza: -8, tension: 8 } }
        ],
        conceptos: [
          { n: 'Diseña el itinerario de la experiencia', claves: ['itinerario', 'medio dia', 'recorrido', 'chakra', 'cocina', 'taller'] },
          { n: 'Calcula los costos', claves: ['costo', 'calcul', 'gastos', 'insumos', 'por visitante'] },
          { n: 'Fija un precio con margen justo', claves: ['precio', 'margen', 'ganancia', 'utilidad', 'justo', 'tarifa'] }
        ],
        evitar: [
          { claves: ['gratis', 'sin cobrar'], fb: 'Sin ingresos el producto no es sostenible para la comunidad.' }
        ],
        modelo: 'Diseñemos un itinerario de medio día con la chakra, la cocina y el taller de artesanía. Calculamos los costos por visitante y fijamos un precio que los cubra y deje un margen justo.'
      },
      {
        acciones: [
          { icono: '🤝', t: 'Contactar a una operadora registrada de Puyo', p: 2, fb: 'Las alianzas comerciales responsables abren mercado.', efecto: { confianza: 8, tension: -4 } },
          { icono: '📷', t: 'Tomar fotos solo de lo que la asamblea autorizó', p: 2, fb: 'La promoción respeta el consentimiento de la comunidad.', efecto: { confianza: 8, tension: -6 } },
          { icono: '👧', t: 'Publicar fotos de los niños en redes', p: 0, fb: 'Toda imagen requiere consentimiento, más aún la de menores.', efecto: { confianza: -18, tension: 16 } }
        ],
        conceptos: [
          { n: 'Propone alianzas comerciales', claves: ['alianza', 'operadora', 'agencia', 'comercializ', 'aliados'] },
          { n: 'Promoción digital con consentimiento', claves: ['promocion', 'redes', 'digital', 'autoriz', 'consentimiento', 'pagina'] },
          { n: 'Define normas y mejora continua', claves: ['normas', 'capacidad', 'encuesta', 'mejorar', 'evaluar', 'maximo'] }
        ],
        evitar: [
          { claves: ['fotos de los ninos', 'sin permiso'], fb: 'No se publican imágenes sin consentimiento.' }
        ],
        modelo: 'Busquemos alianzas con operadoras registradas y hagamos promoción digital solo con fotos autorizadas por la comunidad, con normas de visita, capacidad máxima y una encuesta para mejorar.'
      }
    ]
  }
});
