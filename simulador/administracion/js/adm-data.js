/* =========================================================
   Datos del simulador de la carrera de Administración en
   Instituciones Públicas (ISTCY).
   Fuente curricular: tabla de contenidos mínimos y Anexo 2.
   La institución del simulador (GAD Municipal de San Isidro) es
   ficticia. Las referencias normativas son formativas y deben ser
   validadas por los docentes con la normativa vigente.
   ========================================================= */

const NIVELES = [
  { id: 'basico', nombre: 'Básico', emoji: '🟢', desc: '6 ciudadanos y pocas tareas internas.', n: 6, ev: 0.25, llegada: 25 },
  { id: 'intermedio', nombre: 'Intermedio', emoji: '🟡', desc: '8 ciudadanos, tareas internas e imprevistos.', n: 8, ev: 0.4, llegada: 14 },
  { id: 'avanzado', nombre: 'Avanzado', emoji: '🔴', desc: '10 ciudadanos, fila constante y muchos imprevistos.', n: 10, ev: 0.55, llegada: 8 }
];

const MODS = {
  jor: { nombre: 'Jornada', emoji: '🏛️' },
  fin: { nombre: 'Finanzas', emoji: '💰' },
  nor: { nombre: 'Normativa', emoji: '⚖️' },
  casos: { nombre: 'Casos', emoji: '🤝' }
};

const MALLA_ADM = [
  { cod: 'AIP-01', n: 'Metodología de la Investigación', pao: 1, mod: ['casos'], rel: 'parcial', sim: 'Recolección de datos para el diagnóstico de una política pública.' },
  { cod: 'AIP-02', n: 'Expresión Oral y Escrita', pao: 1, mod: ['jor'], rel: 'directa', sim: 'Comunicación clara y respetuosa con la ciudadanía y redacción de documentos.' },
  { cod: 'AIP-03', n: 'Matemática', pao: 1, mod: ['fin'], rel: 'directa', sim: 'Porcentajes y cálculos aplicados a la gestión pública.' },
  { cod: 'AIP-04', n: 'Tecnologías de la Información y la Comunicación', pao: 1, mod: ['jor', 'casos'], rel: 'directa', sim: 'Trámites en línea, gestión digital y seguridad de la información.' },
  { cod: 'AIP-05', n: 'Fundamentos de la Administración', pao: 1, mod: ['jor', 'nor'], rel: 'directa', sim: 'Funciones administrativas aplicadas al trabajo de una institución pública.' },
  { cod: 'AIP-06', n: 'Contabilidad Básica', pao: 1, mod: ['fin'], rel: 'directa', sim: 'Registro de operaciones, débito y crédito, ecuación contable.' },
  { cod: 'AIP-07', n: 'Fundamentos de Economía', pao: 2, mod: ['fin'], rel: 'directa', sim: 'Conceptos macro y microeconómicos y política económica.' },
  { cod: 'AIP-08', n: 'Técnicas de Gestión Documental', pao: 2, mod: ['jor', 'nor'], rel: 'directa', sim: 'Registro, clasificación y archivo de documentos.' },
  { cod: 'AIP-09', n: 'Administración Pública I', pao: 2, mod: ['jor', 'nor'], rel: 'directa', sim: 'Estructura de la institución y funciones del servidor público.' },
  { cod: 'AIP-10', n: 'Fundamentos de Marketing en Instituciones Públicas', pao: 2, mod: ['casos'], rel: 'directa', sim: 'Comunicación y difusión de servicios públicos.' },
  { cod: 'AIP-11', n: 'Presupuesto Público', pao: 2, mod: ['fin', 'jor'], rel: 'directa', sim: 'Ciclo presupuestario, certificación, compromiso, devengado y ejecución.' },
  { cod: 'AIP-12', n: 'Derecho Administrativo', pao: 2, mod: ['nor', 'jor'], rel: 'directa', sim: 'Actos y procedimientos administrativos, legalidad y plazos.' },
  { cod: 'AIP-13', n: 'Talento Humano', pao: 3, mod: ['casos', 'jor'], rel: 'directa', sim: 'Selección por concurso, evaluación del desempeño, motivación.' },
  { cod: 'AIP-14', n: 'Administración Pública II', pao: 3, mod: ['nor'], rel: 'directa', sim: 'Planificación estratégica y evaluación de programas.' },
  { cod: 'AIP-15', n: 'Políticas Públicas', pao: 3, mod: ['nor', 'casos'], rel: 'directa', sim: 'Ciclo de la política pública, participación e impacto social.' },
  { cod: 'AIP-16', n: 'Finanzas Públicas', pao: 3, mod: ['fin'], rel: 'directa', sim: 'Ingresos, gasto público y financiamiento.' },
  { cod: 'AIP-17', n: 'Procesos Operativos Públicos', pao: 3, mod: ['nor', 'jor'], rel: 'directa', sim: 'Simplificación de trámites y mejora continua.' },
  { cod: 'AIP-18', n: 'Ética Profesional', pao: 4, mod: ['jor', 'casos'], rel: 'directa', sim: 'Conflictos de interés, sobornos, nepotismo y transparencia.' },
  { cod: 'AIP-19', n: 'Auditoría Pública', pao: 4, mod: ['nor', 'jor'], rel: 'directa', sim: 'Control interno, Contraloría y respaldo documental.' },
  { cod: 'AIP-20', n: 'Herramientas de Planificación del Sector Público', pao: 4, mod: ['nor'], rel: 'directa', sim: 'PND, PDOT, POA, indicadores y matrices de seguimiento.' },
  { cod: 'AIP-21', n: 'Contratación Pública y Compras Públicas', pao: 4, mod: ['nor', 'jor'], rel: 'parcial', sim: 'Principios y procedimientos de contratación (sin reproducir el portal).' },
  { cod: 'AIP-22', n: 'Trabajo de Integración Curricular', pao: 4, mod: ['jor', 'fin', 'nor', 'casos'], rel: 'parcial', sim: 'Integra todos los módulos; los reportes sirven como evidencia.' }
];

/* ---------------- CIUDADANOS VIRTUALES ----------------
   prio: grupo de atención prioritaria. Opciones: p (0-2), fb, ef { min, sat, etica (falta ética), doc }. */
const CIUDADANOS = [
  { id: 'c1', nombre: 'Doña Mercedes', avatar: '👵🏽', perfil: 'Adulta mayor', prio: true, pitch: 1.2, asig: ['AIP-04', 'AIP-02'],
    dice: 'Mijito, quiero pagar el impuesto predial, pero no entiendo eso de hacerlo por internet.', o: [
      { t: 'La atiendo con paciencia, le explico paso a paso y realizo el pago con ella; le entrego el comprobante y le explico cómo hacerlo la próxima vez.', p: 2, fb: 'Atención prioritaria, clara y con acompañamiento: reduce la brecha digital.', ef: { min: 12, sat: 95 } },
      { t: 'Le digo que el trámite es en línea y que pida ayuda a un familiar.', p: 0, fb: 'Las personas adultas mayores tienen derecho a atención prioritaria; no se las puede devolver sin atenderlas.', ef: { min: 3, sat: 15 } },
      { t: 'Le hago el pago rápidamente sin explicarle nada.', p: 1, fb: 'Se resolvió el trámite, pero no se fortaleció su autonomía ni se le informó.', ef: { min: 6, sat: 70 } }
    ]},
  { id: 'c2', nombre: 'Don Patricio', avatar: '🧔🏽', perfil: 'Emprendedor kichwahablante', prio: false, pitch: 0.95, asig: ['AIP-02', 'AIP-17'],
    dice: 'Buenos días. Quiero abrir mi tienda de artesanías. ¿Qué papeles necesito? Hablo un poco despacio el castellano.', o: [
      { t: 'Le explico con calma y palabras sencillas, le entrego por escrito la lista oficial de requisitos y le indico cada paso del permiso de funcionamiento.', p: 2, fb: 'Comunicación intercultural, clara y con información escrita oficial.', ef: { min: 10, sat: 92 } },
      { t: 'Le pido también una carta de recomendación y copias de documentos que la institución ya tiene.', p: 0, fb: 'La normativa de simplificación de trámites prohíbe exigir requisitos no establecidos o documentos que el Estado ya posee.', ef: { min: 6, sat: 25 } },
      { t: 'Le digo que revise la página web.', p: 1, fb: 'Es información válida, pero no considera sus necesidades de comunicación.', ef: { min: 2, sat: 45 } }
    ]},
  { id: 'c3', nombre: 'Sr. Vinicio', avatar: '😠', perfil: 'Ciudadano molesto', prio: false, pitch: 0.85, asig: ['AIP-02', 'AIP-12'],
    dice: '¡Hace tres semanas presenté mi solicitud y nadie me responde! ¡Esto es una vergüenza!', o: [
      { t: 'Lo escucho sin interrumpir, reviso el estado del trámite, le informo en qué etapa está y el plazo, y le ofrezco registrar un reclamo formal si lo desea.', p: 2, fb: 'Escucha activa e información verificable; la ciudadanía tiene derecho a una respuesta dentro de los plazos legales.', ef: { min: 10, sat: 80, doc: 1 } },
      { t: 'Le respondo en el mismo tono que no es mi culpa.', p: 0, fb: 'Responder con hostilidad escala el conflicto y daña la imagen institucional.', ef: { min: 3, sat: 5 } },
      { t: 'Le digo que regrese la próxima semana.', p: 1, fb: 'Posterga sin informar; no resuelve la incertidumbre del ciudadano.', ef: { min: 2, sat: 30 } }
    ]},
  { id: 'c4', nombre: 'Sra. Gabriela', avatar: '👩🏻‍💼', perfil: 'Periodista local', prio: false, pitch: 1.1, asig: ['AIP-12', 'AIP-18'],
    dice: 'Quiero conocer los contratos de obra que firmó el municipio este año.', o: [
      { t: 'Le indico que es información pública: puede revisar el portal de transparencia y, si no está, presentar una solicitud de acceso a la información pública que debe responderse en el plazo legal.', p: 2, fb: 'La Ley Orgánica de Transparencia y Acceso a la Información Pública garantiza ese derecho.', ef: { min: 7, sat: 88, doc: 1 } },
      { t: 'Le digo que esa información es reservada.', p: 0, fb: 'Los contratos públicos son información pública; negarlos vulnera el derecho de acceso.', ef: { min: 2, sat: 10, etica: 1 } },
      { t: 'Le doy copias de los contratos con los datos personales de los contratistas sin revisar.', p: 1, fb: 'La información es pública, pero los datos personales sensibles deben protegerse.', ef: { min: 8, sat: 70 } }
    ]},
  { id: 'c5', nombre: 'Ing. Roberto', avatar: '🕴🏻', perfil: 'Empresario', prio: false, pitch: 0.9, asig: ['AIP-18'],
    dice: 'Mire, tengo apuro con mi permiso. Aquí le dejo algo para el almuerzo y me lo saca hoy mismo, ¿sí?', o: [
      { t: 'Rechazo el dinero con firmeza y respeto, le explico el trámite y el plazo, y registro el intento según el procedimiento institucional.', p: 2, fb: 'Recibir dádivas es un delito; rechazarlas y registrarlas protege la integridad del servicio.', ef: { min: 6, sat: 60, doc: 1 } },
      { t: 'Acepto; es solo un almuerzo.', p: 0, fb: 'Aceptar un beneficio para agilizar un trámite es corrupción (cohecho).', ef: { min: 3, sat: 90, etica: 2 } },
      { t: 'Lo rechazo, pero le adelanto su trámite antes que los demás.', p: 0, fb: 'Dar trato preferente sin justificación vulnera la igualdad ante la ley.', ef: { min: 5, sat: 80, etica: 1 } }
    ]},
  { id: 'c6', nombre: 'Sr. Luis', avatar: '👨🏽‍🦽', perfil: 'Persona con discapacidad', prio: true, pitch: 1.0, asig: ['AIP-09', 'AIP-02'],
    dice: 'Necesito un certificado, pero la oficina que lo emite está en el segundo piso y no hay ascensor.', o: [
      { t: 'Bajo a atenderlo en la planta baja, gestiono el certificado y reporto la falta de accesibilidad a la dirección administrativa.', p: 2, fb: 'Se garantiza la atención prioritaria y se impulsa la mejora de accesibilidad.', ef: { min: 12, sat: 95, doc: 1 } },
      { t: 'Le pido que regrese con alguien que lo ayude a subir.', p: 0, fb: 'Traslada a la persona una barrera que la institución debe resolver.', ef: { min: 2, sat: 10 } },
      { t: 'Le doy el número de teléfono de la oficina.', p: 1, fb: 'Es una alternativa, pero no garantiza la atención en el momento.', ef: { min: 3, sat: 40 } }
    ]},
  { id: 'c7', nombre: 'Sra. Marcia', avatar: '👩🏽', perfil: 'Ciudadana con requisitos incompletos', prio: false, pitch: 1.15, asig: ['AIP-08', 'AIP-17'],
    dice: 'Vengo por mi certificado de no adeudar, pero creo que me falta un papel.', o: [
      { t: 'Reviso sus documentos, le explico qué requisito falta según el listado oficial, recibo lo que trae y le indico cómo completar el resto.', p: 2, fb: 'Orientar con base en requisitos oficiales evita viajes innecesarios.', ef: { min: 8, sat: 85 } },
      { t: 'Le devuelvo todo y le digo que regrese cuando tenga todo.', p: 1, fb: 'Es correcto no aceptar trámites incompletos, pero hay que orientar con claridad.', ef: { min: 2, sat: 40 } },
      { t: 'Le hago el certificado sin el requisito porque se ve buena persona.', p: 0, fb: 'Omitir requisitos legales vulnera el principio de legalidad.', ef: { min: 5, sat: 90, etica: 1 } }
    ]},
  { id: 'c8', nombre: 'Kevin', avatar: '🧑🏾', perfil: 'Joven que busca empleo', prio: false, pitch: 1.1, asig: ['AIP-13'],
    dice: '¿Cómo entro a trabajar en el municipio? Me dijeron que conociendo a alguien es más fácil.', o: [
      { t: 'Le explico que el ingreso al servicio público es por concurso de méritos y oposición, dónde se publican las convocatorias y cómo postular.', p: 2, fb: 'La Ley Orgánica del Servicio Público establece el concurso de méritos y oposición.', ef: { min: 6, sat: 85 } },
      { t: 'Le digo que me deje su hoja de vida y yo hablo con el jefe.', p: 0, fb: 'Promover ingresos por influencia vulnera la igualdad de oportunidades.', ef: { min: 3, sat: 75, etica: 1 } },
      { t: 'Le digo que no hay vacantes.', p: 1, fb: 'Puede ser cierto hoy, pero falta orientar sobre las convocatorias.', ef: { min: 1, sat: 35 } }
    ]},
  { id: 'c9', nombre: 'Sra. Rocío', avatar: '🤰🏽', perfil: 'Mujer embarazada', prio: true, pitch: 1.25, asig: ['AIP-09'],
    dice: 'Disculpe, estoy embarazada y llevo un buen rato de pie en la fila…', o: [
      { t: 'La atiendo de inmediato como atención prioritaria y le ofrezco un asiento mientras resuelvo su trámite.', p: 2, fb: 'Las mujeres embarazadas forman parte de los grupos de atención prioritaria.', ef: { min: 8, sat: 95 } },
      { t: 'Le pido que espere su turno como todos.', p: 0, fb: 'Desconoce el derecho a la atención prioritaria.', ef: { min: 1, sat: 10 } },
      { t: 'Le doy un asiento, pero la atiendo cuando llegue su turno.', p: 1, fb: 'Mejora su comodidad, pero no aplica la atención prioritaria.', ef: { min: 2, sat: 50 } }
    ]},
  { id: 'c10', nombre: 'Don Efraín', avatar: '👨🏽‍🌾', perfil: 'Dirigente barrial', prio: false, pitch: 0.9, asig: ['AIP-15', 'AIP-20'],
    dice: 'Mi barrio necesita alumbrado y el arreglo de la calle. ¿A quién hay que pedirle?', o: [
      { t: 'Le explico cómo participar en el presupuesto participativo y las asambleas, y cómo presentar la solicitud por escrito para que se analice en la planificación del GAD.', p: 2, fb: 'La participación ciudadana en la planificación y el presupuesto es un derecho y un mecanismo formal.', ef: { min: 9, sat: 85, doc: 1 } },
      { t: 'Le prometo que la obra se hará pronto.', p: 0, fb: 'Prometer lo que no depende de uno genera falsas expectativas.', ef: { min: 3, sat: 80, etica: 1 } },
      { t: 'Le digo que hable con el alcalde.', p: 1, fb: 'No orienta sobre los mecanismos formales de participación.', ef: { min: 1, sat: 40 } }
    ]}
];

/* Tareas internas (las pide la Directora Administrativa) */
const TAREAS = [
  { id: 't1', titulo: 'Compra de suministros', quien: 'Directora Administrativa', voz: 'Necesito que se compren suministros de oficina hoy mismo.', txt: 'La directora te pide gestionar la compra de suministros de oficina.', asig: ['AIP-11', 'AIP-21'], o: [
    { t: 'Verificar que exista certificación presupuestaria y que la compra conste en la planificación, y seguir el procedimiento de contratación correspondiente.', p: 2, fb: 'Toda obligación requiere certificación presupuestaria previa y un procedimiento de contratación.', ef: { min: 10, doc: 1 } },
    { t: 'Comprar con dinero propio en la tienda de la esquina y pedir el reembolso.', p: 0, fb: 'Los gastos públicos siguen procedimientos y respaldos; no se compran por fuera del sistema.', ef: { min: 5, etica: 1 } },
    { t: 'Pedir cotizaciones informales por teléfono.', p: 1, fb: 'Cotizar ayuda, pero falta la certificación y el procedimiento formal.', ef: { min: 6 } }
  ]},
  { id: 't2', titulo: 'Archivo de expedientes', quien: 'Directora Administrativa', voz: 'Los expedientes del año pasado están acumulados en cajas sin orden.', txt: 'Hay cajas de expedientes del año anterior sin clasificar.', asig: ['AIP-08'], o: [
    { t: 'Clasificar por serie documental, foliar, registrar en el inventario y transferir al archivo central según los plazos de conservación.', p: 2, fb: 'La gestión documental ordena el ciclo vital: archivo de gestión, central e histórico.', ef: { min: 15, doc: 2 } },
    { t: 'Botar lo que parezca viejo para liberar espacio.', p: 0, fb: 'Eliminar documentos sin respetar los plazos de conservación es una falta grave.', ef: { min: 5, etica: 1 } },
    { t: 'Ordenarlas alfabéticamente sin inventario.', p: 1, fb: 'Ayuda, pero sin inventario no se puede ubicar ni controlar la documentación.', ef: { min: 10, doc: 1 } }
  ]},
  { id: 't3', titulo: 'Pedido de la Contraloría', quien: 'Directora Administrativa', voz: 'La Contraloría solicita los respaldos de los pagos del último trimestre.', txt: 'La Contraloría General del Estado solicita respaldos de pagos.', asig: ['AIP-19'], o: [
    { t: 'Reunir los respaldos completos (facturas, órdenes, actas, comprobantes), con índice y en el plazo solicitado.', p: 2, fb: 'El control externo requiere documentación completa y oportuna.', ef: { min: 15, doc: 2 } },
    { t: 'Enviar solo lo que se encuentre y no mencionar lo que falta.', p: 0, fb: 'Ocultar faltantes agrava la responsabilidad.', ef: { min: 8, etica: 1 } },
    { t: 'Pedir más plazo sin empezar a buscar.', p: 1, fb: 'Se puede solicitar prórroga justificada, pero hay que avanzar en la recopilación.', ef: { min: 3 } }
  ]},
  { id: 't4', titulo: 'Memorando de respuesta', quien: 'Directora Administrativa', voz: 'Redacta un memorando respondiendo al departamento financiero.', txt: 'Debes redactar un memorando de respuesta al departamento financiero.', asig: ['AIP-02', 'AIP-08'], o: [
    { t: 'Usar el formato institucional: número, fecha, destinatario, asunto claro, texto breve y formal, firma y registro en el sistema documental.', p: 2, fb: 'La comunicación oficial sigue un formato y queda registrada.', ef: { min: 8, doc: 1 } },
    { t: 'Responder por WhatsApp para que sea más rápido.', p: 0, fb: 'Las comunicaciones oficiales deben quedar registradas formalmente.', ef: { min: 2 } },
    { t: 'Escribir un correo informal sin número ni registro.', p: 1, fb: 'Es más formal que un chat, pero no cumple el procedimiento documental.', ef: { min: 4 } }
  ]},
  { id: 't5', titulo: 'Evaluación del desempeño', quien: 'Directora Administrativa', voz: 'Ayúdame con la evaluación del desempeño del personal de la unidad.', txt: 'Debes apoyar la evaluación del desempeño del personal.', asig: ['AIP-13'], o: [
    { t: 'Aplicar el instrumento oficial con evidencias de cumplimiento de metas y preparar la retroalimentación a cada servidor.', p: 2, fb: 'La evaluación se basa en evidencias y sirve para mejorar.', ef: { min: 12, doc: 1 } },
    { t: 'Poner la nota máxima a todos para evitar conflictos.', p: 0, fb: 'Evaluar sin evidencias impide mejorar y no es transparente.', ef: { min: 4, etica: 1 } },
    { t: 'Evaluar según la simpatía con cada compañero.', p: 0, fb: 'Es subjetivo y arbitrario.', ef: { min: 4, etica: 1 } }
  ]}
];

/* Imprevistos */
const EVENTOS = [
  { id: 'sistema', txt: 'El sistema informático de trámites se cayó y la fila crece.', voz: '¡Se cayó el sistema otra vez!', o: [
    { t: 'Reportar a TI, informar a la fila con respeto el tiempo estimado y registrar manualmente las solicitudes para ingresarlas después.', p: 2, fb: 'Plan de contingencia, información oportuna y registro para no perder trámites.', ef: { min: 10, doc: 1, colaSat: 10 } },
    { t: 'Cerrar la ventanilla hasta que vuelva el sistema.', p: 0, fb: 'Suspender la atención sin informar ni alternativas afecta a la ciudadanía.', ef: { min: 25, colaSat: -20 } }
  ]},
  { id: 'favor', txt: 'Un concejal llama y pide que atiendas primero a un conocido suyo que acaba de llegar.', voz: 'Atiéndale primero a mi amigo, por favor.', o: [
    { t: 'Explicar con respeto que la atención es por orden de llegada y prioridad legal, y atender a su conocido en su turno.', p: 2, fb: 'La igualdad de trato y la imparcialidad son principios del servicio público.', ef: { min: 2 } },
    { t: 'Atenderlo primero para evitar problemas.', p: 0, fb: 'El trato preferente por influencia es una falta ética.', ef: { min: 6, etica: 1, colaSat: -10 } }
  ]},
  { id: 'redes', txt: 'Una ciudadana publica en redes sociales que la atendieron mal en otra ventanilla.', voz: 'Mira lo que están diciendo del municipio en Facebook.', o: [
    { t: 'Informar a comunicación institucional para responder con datos, contactar a la ciudadana y revisar qué falló.', p: 2, fb: 'La gestión de la comunicación y la mejora del servicio van juntas.', ef: { min: 5, doc: 1 } },
    { t: 'Responder desde tu cuenta personal defendiendo al municipio.', p: 0, fb: 'Las respuestas institucionales se canalizan por los voceros oficiales.', ef: { min: 3 } }
  ]},
  { id: 'datos', txt: 'Un compañero te pide que le envíes por correo personal la base de datos de contribuyentes para "trabajar desde casa".', voz: 'Pásame la base de datos a mi Gmail, porfa.', o: [
    { t: 'No enviarla por canales personales; recordarle que solo se accede por los sistemas institucionales autorizados.', p: 2, fb: 'La Ley Orgánica de Protección de Datos Personales exige resguardar la información de la ciudadanía.', ef: { min: 2 } },
    { t: 'Enviársela; es un compañero de confianza.', p: 0, fb: 'Exponer datos personales es una infracción grave.', ef: { min: 1, etica: 1 } }
  ]}
];

/* ---------------- BANCOS DE PREGUNTAS ---------------- */
function rndI(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function mezclar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function mc(q, ok, malas, exp, asig) { const o = mezclar([ok, ...malas]); return { q, o, c: o.indexOf(ok), exp, asig }; }
const coma = n => String(n).replace('.', ',');
const usd = n => '$' + Math.round(n).toLocaleString('es-EC');

const FIN_BANCO = [
  () => mc('La ecuación contable fundamental es…', 'Activo = Pasivo + Patrimonio', ['Activo = Ingresos − Gastos', 'Pasivo = Activo + Patrimonio', 'Patrimonio = Activo + Pasivo'], 'Todo lo que la entidad tiene se financia con obligaciones o con patrimonio.', 'AIP-06'),
  () => mc('Al comprar suministros de oficina pagando con la cuenta bancaria, se registra…', 'Débito a Suministros y crédito a Bancos', ['Débito a Bancos y crédito a Suministros', 'Débito a Patrimonio', 'Crédito a Ingresos'], 'Aumenta un activo (suministros) y disminuye otro (bancos).', 'AIP-06'),
  () => mc('¿Qué documento se requiere antes de contraer una obligación de gasto en el sector público?', 'La certificación presupuestaria', ['Una factura proforma únicamente', 'La firma de un testigo', 'Ninguno'], 'La certificación presupuestaria garantiza que existen recursos disponibles.', 'AIP-11'),
  () => mc('¿Cuál es el orden de los momentos del gasto público?', 'Compromiso, devengado y pago', ['Pago, compromiso y devengado', 'Devengado, pago y compromiso', 'Pago y luego certificación'], 'Primero se compromete, luego se reconoce la obligación (devengado) y finalmente se paga.', 'AIP-11'),
  () => mc('¿Qué fases comprende el ciclo presupuestario?', 'Programación, formulación, aprobación, ejecución, evaluación y seguimiento, y clausura y liquidación', ['Solo aprobación y pago', 'Cotización, compra y archivo', 'Planificación y auditoría únicamente'], 'Es el ciclo que establece la normativa de planificación y finanzas públicas.', 'AIP-11'),
  () => mc('Los impuestos que cobra un GAD municipal (por ejemplo, el predial) son ingresos…', 'Corrientes', ['De capital', 'De financiamiento', 'Extraordinarios por deuda'], 'Los ingresos corrientes provienen de impuestos, tasas y contribuciones.', 'AIP-16'),
  () => mc('Un préstamo que recibe una institución pública es una fuente de…', 'Financiamiento', ['Ingreso corriente', 'Gasto corriente', 'Activo intangible'], 'El endeudamiento es financiamiento y genera obligaciones futuras.', 'AIP-16'),
  () => mc('El pago de sueldos del personal es un gasto…', 'Corriente', ['De inversión', 'De capital', 'De financiamiento'], 'Los gastos corrientes se destinan a la operación permanente.', 'AIP-16'),
  () => mc('La inflación es…', 'El aumento sostenido del nivel general de precios', ['La disminución del desempleo', 'El aumento del PIB', 'El cobro de impuestos'], 'Reduce el poder adquisitivo del dinero.', 'AIP-07'),
  () => mc('El Producto Interno Bruto (PIB) mide…', 'El valor de los bienes y servicios finales producidos en un país en un período', ['Solo las exportaciones', 'El presupuesto del Estado', 'La deuda pública'], 'Es el principal indicador de la actividad económica.', 'AIP-07'),
  () => mc('La microeconomía estudia principalmente…', 'Las decisiones de hogares, empresas y mercados individuales', ['La inflación y el PIB del país', 'Solo el comercio exterior', 'La política fiscal'], 'La macroeconomía estudia los agregados de toda la economía.', 'AIP-07'),
  // cálculos
  () => { const a = rndI(80, 200) * 1000, p = rndI(20, 70) * 1000; return { q: `Una entidad tiene activos por ${usd(a)} y pasivos por ${usd(p)}. ¿Cuál es su patrimonio en USD?`, num: a - p, tol: 1, exp: `Patrimonio = Activo − Pasivo = ${usd(a)} − ${usd(p)} = ${usd(a - p)}.`, asig: 'AIP-06' }; },
  () => { const cod = rndI(40, 120) * 10000, dev = Math.round(cod * rndI(35, 95) / 100); const r = Math.round(dev / cod * 10000) / 100; return { q: `El presupuesto codificado es ${usd(cod)} y lo devengado a la fecha es ${usd(dev)}. ¿Cuál es el porcentaje de ejecución? (dos decimales)`, num: r, tol: 0.05, exp: `Ejecución = ${usd(dev)} ÷ ${usd(cod)} × 100 = ${coma(r)} %.`, asig: 'AIP-11' }; },
  () => { const cod = rndI(20, 80) * 1000, com = Math.round(cod * rndI(30, 90) / 100); return { q: `Una partida tiene ${usd(cod)} codificados y ${usd(com)} comprometidos. ¿Cuál es el saldo disponible en USD?`, num: cod - com, tol: 1, exp: `Saldo disponible = codificado − comprometido = ${usd(cod - com)}.`, asig: 'AIP-11' }; },
  () => { const a = rndI(100, 300) * 1000, pct = [5, 8, 10, 12][rndI(0, 3)]; const r = Math.round(a * (1 + pct / 100)); return { q: `La recaudación del año pasado fue ${usd(a)}. Si se proyecta un aumento del ${pct} %, ¿cuánto se espera recaudar en USD?`, num: r, tol: 1, exp: `${usd(a)} × ${coma(1 + pct / 100)} = ${usd(r)}.`, asig: 'AIP-03' }; }
];

const NOR_BANCO = [
  () => mc('¿Qué instrumento orienta la planificación de un GAD municipal sobre su territorio?', 'El Plan de Desarrollo y Ordenamiento Territorial (PDOT)', ['El rol de pagos', 'El catálogo electrónico', 'El reglamento interno de asistencia'], 'El PDOT debe articularse con el Plan Nacional de Desarrollo.', 'AIP-20'),
  () => mc('El Plan Operativo Anual (POA) sirve para…', 'Programar las actividades, metas y recursos de la institución en el año', ['Registrar la asistencia del personal', 'Archivar documentos', 'Calcular impuestos'], 'El POA traduce la planificación en acciones anuales con presupuesto.', 'AIP-20'),
  () => mc('Un buen indicador de gestión debe ser…', 'Específico, medible, alcanzable, relevante y con plazo', ['Lo más general posible', 'Imposible de medir', 'Solo cualitativo'], 'Los indicadores permiten dar seguimiento y evaluar.', 'AIP-20'),
  () => mc('¿Cuál es una secuencia típica del ciclo de la política pública?', 'Agenda, formulación, decisión, implementación y evaluación', ['Evaluación, agenda y archivo', 'Implementación sin diagnóstico', 'Decisión y luego agenda'], 'Cada etapa alimenta a la siguiente; la evaluación retroalimenta el ciclo.', 'AIP-15'),
  () => mc('¿Qué institución rige el Sistema Nacional de Contratación Pública?', 'El Servicio Nacional de Contratación Pública (SERCOP)', ['La Contraloría', 'El Ministerio de Turismo', 'El GAD provincial'], 'El SERCOP administra el sistema y el portal de compras públicas.', 'AIP-21'),
  () => mc('Para adquirir bienes normalizados que constan en el catálogo electrónico, la entidad debe…', 'Comprar por catálogo electrónico', ['Comprar en cualquier tienda', 'Hacer una rifa entre proveedores', 'Contratar sin procedimiento'], 'El catálogo electrónico es el procedimiento preferente para bienes y servicios normalizados.', 'AIP-21'),
  () => mc('¿Qué organismo realiza el control externo de los recursos públicos en Ecuador?', 'La Contraloría General del Estado', ['El SRI', 'El Banco Central', 'El propio departamento financiero'], 'La auditoría interna complementa ese control dentro de cada entidad.', 'AIP-19'),
  () => mc('El control interno tiene como propósito…', 'Proteger los recursos y asegurar que las operaciones cumplan la normativa y los objetivos', ['Sancionar a los servidores', 'Reemplazar a la Contraloría', 'Aumentar el presupuesto'], 'Es responsabilidad de todos los servidores de la entidad.', 'AIP-19'),
  () => mc('El principio de legalidad significa que el servidor público…', 'Solo puede hacer lo que la ley le permite', ['Puede hacer todo lo que la ley no prohíbe', 'Actúa según su criterio personal', 'Obedece cualquier orden verbal'], 'Es la base del derecho administrativo.', 'AIP-12'),
  () => mc('Un acto administrativo debe estar…', 'Motivado: explicar los hechos y las normas en que se fundamenta', ['Firmado por un notario siempre', 'Escrito en inglés', 'Aprobado por la ciudadanía'], 'La motivación es un requisito de validez de los actos administrativos.', 'AIP-12'),
  () => mc('El ciclo de mejora continua PHVA significa…', 'Planificar, Hacer, Verificar y Actuar', ['Pagar, Hacer, Votar y Aprobar', 'Programar, Hablar, Ver y Archivar', 'Presupuestar, Hacer, Vender y Ahorrar'], 'Se usa para mejorar los procesos de forma sistemática.', 'AIP-17'),
  () => mc('Simplificar un trámite implica, por ejemplo…', 'Eliminar requisitos innecesarios y no pedir documentos que el Estado ya tiene', ['Pedir más copias', 'Agregar firmas de aprobación', 'Atender solo en horario reducido'], 'Es un objetivo de la normativa de optimización de trámites administrativos.', 'AIP-17'),
  () => mc('El orden del ciclo vital de los documentos es…', 'Archivo de gestión, archivo central y archivo histórico', ['Archivo histórico, central y de gestión', 'Papelera, gestión y central', 'Solo archivo digital'], 'Los documentos pasan de las oficinas al archivo central y luego al histórico, según los plazos.', 'AIP-08'),
  () => mc('¿Cómo ingresa una persona a un puesto permanente del servicio público?', 'Mediante concurso de méritos y oposición', ['Por recomendación política', 'Por sorteo', 'Por antigüedad en la fila'], 'Así lo establece la Ley Orgánica del Servicio Público.', 'AIP-13'),
  () => mc('Contratar a un familiar cercano de la autoridad nominadora en la misma entidad es…', 'Nepotismo, prohibido por la ley', ['Una práctica permitida', 'Una forma de motivación', 'Obligatorio en los GAD'], 'La normativa del servicio público prohíbe el nepotismo.', 'AIP-18'),
  () => mc('Las personas adultas mayores, embarazadas y con discapacidad tienen derecho a…', 'Atención prioritaria', ['Pagar el doble', 'Esperar al final', 'Ser atendidas solo en línea'], 'La Constitución reconoce a los grupos de atención prioritaria.', 'AIP-09')
];

/* ---------------- CASOS PROFESIONALES ---------------- */
const CASOS_ADM = [
  {
    id: 'nepotismo', titulo: 'La jefa quiere contratar a su sobrina',
    asignaturas: ['AIP-18', 'AIP-13'],
    persona: { nombre: 'Lic. Beatriz', rol: 'Jefa de la unidad', avatar: '👩🏻‍💼', pitch: 1.0 },
    contexto: 'Hay una vacante en la unidad. La jefa te pide preparar los papeles para contratar a su sobrina.',
    pasos: [
      { dice: 'Prepara el contrato de mi sobrina, ya está decidido.', opciones: [
        { t: 'Le explico con respeto que la normativa prohíbe el nepotismo y que la vacante debe cubrirse por el procedimiento legal de selección.', p: 2, r: 'No lo había pensado así…', fb: 'El nepotismo está prohibido en el servicio público.' },
        { t: 'Lo preparo; ella es la jefa.', p: 0, r: 'Perfecto.', fb: 'Obedecer una orden ilegal también genera responsabilidad.' },
        { t: 'Lo preparo, pero sin mi firma.', p: 0, r: '…', fb: 'Participar en un acto ilegal sigue siendo una falta.' }
      ]},
      { dice: 'Pero ella está muy bien preparada.', opciones: [
        { t: 'Puede postular a otros concursos públicos en igualdad de condiciones, en entidades donde no exista el parentesco prohibido.', p: 2, r: 'Está bien, le diré.', fb: 'Se respeta el derecho de la persona sin vulnerar la ley.' },
        { t: 'Entonces hagamos un concurso a su medida.', p: 0, r: '…', fb: 'Direccionar un concurso es una falta grave.' },
        { t: 'No sé, consulte usted.', p: 1, r: '…', fb: 'Es mejor orientar con base en la norma.' }
      ]},
      { dice: '(Si insiste, ¿qué haces?)', opciones: [
        { t: 'Lo pongo por escrito y consulto a Talento Humano o a la asesoría jurídica institucional.', p: 2, r: '(La unidad jurídica emite un criterio.)', fb: 'Documentar y consultar protege al servidor y a la institución.' },
        { t: 'Lo publico en redes sociales.', p: 0, r: '(Se genera un conflicto.)', fb: 'Las denuncias se canalizan por las vías formales.' },
        { t: 'Renuncio de inmediato.', p: 1, r: '…', fb: 'Hay vías institucionales antes de una decisión extrema.' }
      ]}
    ]
  },
  {
    id: 'desempeno', titulo: 'Un compañero con bajo desempeño',
    asignaturas: ['AIP-13', 'AIP-02'],
    persona: { nombre: 'Andrés', rol: 'Compañero de unidad', avatar: '🧑🏻', pitch: 1.0 },
    contexto: 'Como coordinador de equipo, notas que Andrés se atrasa en sus trámites y está desmotivado.',
    pasos: [
      { dice: 'Ya sé que estoy atrasado… pero tengo demasiadas cosas.', opciones: [
        { t: 'Converso en privado, escucho sus razones y revisamos juntos su carga de trabajo y prioridades.', p: 2, r: 'Gracias por escucharme, la verdad estoy desbordado.', fb: 'La retroalimentación privada y la escucha permiten identificar causas.' },
        { t: 'Le llamo la atención frente a todos.', p: 0, r: '(Andrés se siente humillado.)', fb: 'La exposición pública desmotiva y genera conflicto.' },
        { t: 'Hago yo su trabajo para que no se note.', p: 1, r: '…', fb: 'Resuelve a corto plazo, pero no corrige el problema.' }
      ]},
      { dice: '¿Qué podemos hacer?', opciones: [
        { t: 'Acordamos metas concretas, una capacitación en el sistema de trámites y seguimiento cada semana.', p: 2, r: 'Me parece justo.', fb: 'Metas claras, capacitación y seguimiento mejoran el desempeño.' },
        { t: 'Le digo que si no mejora lo van a despedir.', p: 1, r: 'Ok…', fb: 'La amenaza sin apoyo no motiva.' },
        { t: 'Nada; ya mejorará.', p: 0, r: '…', fb: 'Sin plan, el problema persiste.' }
      ]},
      { dice: '(En la evaluación del desempeño.)', opciones: [
        { t: 'Evalúo con evidencias de las metas acordadas y reconozco su mejora.', p: 2, r: '¡Gracias!', fb: 'La evaluación objetiva y el reconocimiento motivan.' },
        { t: 'Le pongo una nota baja por lo que pasó antes.', p: 0, r: '…', fb: 'Evaluar por prejuicios no es objetivo.' },
        { t: 'Le pongo la nota máxima para que no se desanime.', p: 1, r: '…', fb: 'Una evaluación sin evidencias pierde valor.' }
      ]}
    ]
  },
  {
    id: 'campana', titulo: 'Difundir el nuevo servicio en línea',
    asignaturas: ['AIP-10', 'AIP-04'],
    persona: { nombre: 'Lic. Daniel', rol: 'Director de Comunicación', avatar: '👨🏽‍💼', pitch: 0.95 },
    contexto: 'El GAD habilitó el pago de impuestos en línea, pero casi nadie lo usa.',
    pasos: [
      { dice: '¿Por dónde empezamos la campaña?', opciones: [
        { t: 'Identificar a quiénes queremos llegar (adultos mayores, comerciantes, zonas rurales) y qué les impide usar el servicio.', p: 2, r: 'Buena idea, conozcamos a nuestro público.', fb: 'El marketing público parte de conocer a la ciudadanía y sus barreras.' },
        { t: 'Publicar un afiche en Facebook y listo.', p: 1, r: '…', fb: 'Un solo canal no llega a todos los públicos.' },
        { t: 'Contratar a un influencer famoso.', p: 0, r: '¿Con qué presupuesto?', fb: 'Sin diagnóstico ni presupuesto planificado, la acción es improvisada.' }
      ]},
      { dice: 'Muchos adultos mayores no usan internet.', opciones: [
        { t: 'Usar radio local, mensajes en kichwa y castellano, y puntos de ayuda presencial con personal capacitado.', p: 2, r: 'Así llegamos a todos.', fb: 'Canales adecuados e interculturales favorecen la inclusión.' },
        { t: 'Que aprendan; ya es otra época.', p: 0, r: '…', fb: 'El servicio público debe ser inclusivo.' },
        { t: 'Solo enviar correos electrónicos.', p: 1, r: '…', fb: 'No llega a quienes no usan correo.' }
      ]},
      { dice: '¿Cómo sabremos si funcionó?', opciones: [
        { t: 'Medir indicadores: número de pagos en línea antes y después, y la satisfacción de los usuarios.', p: 2, r: 'Perfecto, con datos.', fb: 'Los indicadores permiten evaluar la campaña.' },
        { t: 'Por los "me gusta" de la publicación.', p: 1, r: '…', fb: 'Es un dato parcial; importa el uso real del servicio.' },
        { t: 'No hace falta medir.', p: 0, r: '…', fb: 'Sin medición no se puede mejorar.' }
      ]}
    ]
  },
  {
    id: 'proveedor', titulo: 'Presión para favorecer a un proveedor',
    asignaturas: ['AIP-21', 'AIP-18'],
    persona: { nombre: 'Sr. Ortega', rol: 'Asesor de una autoridad', avatar: '🕴🏽', pitch: 0.9 },
    contexto: 'Apoyas un proceso de contratación de mobiliario. Un asesor te pide ajustar los requisitos para que gane una empresa específica.',
    pasos: [
      { dice: 'Pon en los pliegos que el proveedor debe tener 15 años de experiencia, así gana mi conocido.', opciones: [
        { t: 'Le explico que los requisitos deben ser técnicos y proporcionales para garantizar la concurrencia de oferentes.', p: 2, r: 'Bueno… como digas.', fb: 'Direccionar los pliegos vulnera los principios de igualdad y concurrencia.' },
        { t: 'Lo pongo; es una orden de arriba.', p: 0, r: 'Excelente.', fb: 'Direccionar un proceso es una falta grave y puede ser delito.' },
        { t: 'Lo pongo, pero con 10 años.', p: 0, r: '…', fb: 'Sigue siendo un requisito para favorecer a alguien.' }
      ]},
      { dice: 'Te puede ir mal si no colaboras.', opciones: [
        { t: 'Registro la presión por escrito y la informo a la máxima autoridad o a la unidad de transparencia.', p: 2, r: '(La situación queda documentada.)', fb: 'Documentar y reportar protege la integridad del proceso y del servidor.' },
        { t: 'Cedo por miedo.', p: 0, r: '…', fb: 'Ceder te hace partícipe de la irregularidad.' },
        { t: 'Lo ignoro sin documentar nada.', p: 1, r: '…', fb: 'Sin registro, no hay respaldo si la presión continúa.' }
      ]},
      { dice: '(¿Cómo aseguras la transparencia del proceso?)', opciones: [
        { t: 'Publicar el proceso en el portal de compras públicas, con pliegos técnicos y evaluación objetiva por comisión.', p: 2, r: 'Así participan más empresas.', fb: 'La publicidad y la evaluación objetiva son garantías de transparencia.' },
        { t: 'Invitar solo a tres empresas conocidas.', p: 0, r: '…', fb: 'Limitar la participación sin justificación vulnera la concurrencia.' },
        { t: 'Decidir yo solo para ahorrar tiempo.', p: 0, r: '…', fb: 'Las decisiones de adjudicación siguen el procedimiento legal.' }
      ]}
    ]
  },
  {
    id: 'politica', titulo: 'Una política para emprendedoras rurales',
    asignaturas: ['AIP-15', 'AIP-01', 'AIP-20'],
    persona: { nombre: 'Concejala Yolanda', rol: 'Concejala del GAD', avatar: '👩🏽‍🦱', pitch: 1.1 },
    contexto: 'El GAD quiere crear un programa de apoyo a mujeres emprendedoras de las comunidades rurales.',
    pasos: [
      { dice: '¿Por dónde empezamos el programa?', opciones: [
        { t: 'Con un diagnóstico participativo: encuestas y reuniones con las emprendedoras para conocer sus necesidades reales.', p: 2, r: 'Escuchémoslas primero.', fb: 'El diseño de políticas parte de un diagnóstico con la población.' },
        { t: 'Copiando el programa de otra ciudad.', p: 1, r: '…', fb: 'Sirve de referencia, pero debe adaptarse al contexto.' },
        { t: 'Repartiendo dinero de inmediato.', p: 0, r: '…', fb: 'Sin diagnóstico ni reglas claras, el programa no es sostenible.' }
      ]},
      { dice: 'El diagnóstico muestra falta de capacitación y de acceso a mercados.', opciones: [
        { t: 'Diseñar componentes de capacitación y ferias, con objetivos, metas, presupuesto en el POA y articulación con el PDOT.', p: 2, r: 'Muy bien estructurado.', fb: 'La política se traduce en planificación con recursos y metas.' },
        { t: 'Hacer una sola feria al año.', p: 1, r: '…', fb: 'Es una acción, pero no responde a todas las necesidades.' },
        { t: 'Dejar que cada una resuelva sola.', p: 0, r: '…', fb: 'Se abandona el objetivo de la política.' }
      ]},
      { dice: '¿Cómo sabremos si el programa funciona?', opciones: [
        { t: 'Con indicadores de seguimiento (participantes, ventas, ingresos) y una evaluación al final del año.', p: 2, r: 'Así rendimos cuentas.', fb: 'La evaluación cierra el ciclo y permite ajustar la política.' },
        { t: 'Con fotos de los eventos.', p: 1, r: '…', fb: 'Las fotos no miden resultados.' },
        { t: 'No es necesario evaluar.', p: 0, r: '…', fb: 'Sin evaluación no hay rendición de cuentas ni mejora.' }
      ]}
    ]
  },
  {
    id: 'proceso', titulo: 'Un trámite que tarda demasiado',
    asignaturas: ['AIP-17', 'AIP-05'],
    persona: { nombre: 'Ing. Fausto', rol: 'Director de Procesos', avatar: '👨🏻‍💼', pitch: 0.9 },
    contexto: 'El permiso de funcionamiento tarda 20 días y pasa por 7 firmas.',
    pasos: [
      { dice: '¿Cómo mejoramos este trámite?', opciones: [
        { t: 'Levantar el flujograma actual, medir tiempos de cada paso e identificar los que no agregan valor.', p: 2, r: 'Veamos dónde se pierde el tiempo.', fb: 'El análisis del proceso actual es la base de la mejora.' },
        { t: 'Contratar más personal.', p: 1, r: '…', fb: 'Puede ayudar, pero primero hay que conocer el proceso.' },
        { t: 'Pedir al personal que trabaje más rápido.', p: 0, r: '…', fb: 'Sin cambiar el proceso, el problema persiste.' }
      ]},
      { dice: 'Tres firmas solo revisan lo mismo.', opciones: [
        { t: 'Proponer eliminar las revisiones duplicadas, digitalizar la recepción y fijar un tiempo máximo por etapa.', p: 2, r: 'Bajaríamos a 7 días.', fb: 'Simplificar y digitalizar reduce tiempos y costos para la ciudadanía.' },
        { t: 'Agregar una firma más para asegurar.', p: 0, r: '…', fb: 'Aumenta la burocracia.' },
        { t: 'Dejarlo igual.', p: 0, r: '…', fb: 'No hay mejora.' }
      ]},
      { dice: '¿Y después de implementar el cambio?', opciones: [
        { t: 'Medir de nuevo los tiempos y la satisfacción, y ajustar (ciclo PHVA).', p: 2, r: 'Mejora continua.', fb: 'Verificar y actuar cierran el ciclo de mejora.' },
        { t: 'Dar por terminado el proyecto.', p: 1, r: '…', fb: 'Sin verificación no se sabe si mejoró.' },
        { t: 'Volver al proceso anterior si alguien se queja.', p: 0, r: '…', fb: 'Las decisiones se toman con datos.' }
      ]}
    ]
  }
];
