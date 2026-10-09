/* =========================================================
   Datos del simulador de la carrera de Control de Incendios
   y Operaciones de Rescate (ISTCY).
   Fuente curricular: malla con contenidos mínimos e Informe de
   valoración del proyecto de carrera (Anexo 2).
   IMPORTANTE: los procedimientos son de referencia formativa y
   deben ser validados por instructores del Cuerpo de Bomberos.
   ========================================================= */

const NIVELES = [
  { id: 'basico', nombre: 'Básico', emoji: '🟢', desc: 'El fuego crece lento y hay pocos imprevistos.', crec: 0.7, ev: 0.2, agua: 1.25 },
  { id: 'intermedio', nombre: 'Intermedio', emoji: '🟡', desc: 'Ritmo realista y algunos imprevistos.', crec: 1, ev: 0.32, agua: 1 },
  { id: 'avanzado', nombre: 'Avanzado', emoji: '🔴', desc: 'Propagación rápida, recursos limitados y muchos imprevistos.', crec: 1.4, ev: 0.45, agua: 0.8 }
];

const MODS = {
  inc: { nombre: 'Incidente', emoji: '🚒' },
  tri: { nombre: 'Triage', emoji: '🩺' },
  lab: { nombre: 'Laboratorio', emoji: '🧪' },
  casos: { nombre: 'Casos', emoji: '🤝' }
};

const MALLA_CIOR = [
  { cod: 'CIOR-101', n: 'Educación Ciudadana y Orden Público', pao: 1, u: 'Básica', mod: ['casos', 'inc'], rel: 'directa', sim: 'Coordinación interinstitucional, gestión de crisis y mediación de conflictos.' },
  { cod: 'CIOR-102', n: 'Matemáticas', pao: 1, u: 'Básica', mod: ['lab'], rel: 'directa', sim: 'Cálculos aplicados: áreas afectadas, autonomía del ERA, tiempo de agua disponible.' },
  { cod: 'CIOR-103', n: 'Morfofisiología', pao: 1, u: 'Básica', mod: ['tri'], rel: 'directa', sim: 'Signos vitales y respuesta del cuerpo al trauma para clasificar víctimas.' },
  { cod: 'CIOR-104', n: 'Herramientas Informáticas', pao: 1, u: 'Básica', mod: ['casos'], rel: 'parcial', sim: 'Elaboración de informes técnicos; resultados exportables.' },
  { cod: 'CIOR-105', n: 'Ciencias del Fuego I', pao: 1, u: 'Profesional', mod: ['lab', 'inc'], rel: 'directa', sim: 'Fases del incendio, transferencia de calor, humo y técnicas básicas de extinción.' },
  { cod: 'CIOR-106', n: 'Química', pao: 1, u: 'Profesional', mod: ['lab'], rel: 'directa', sim: 'Combustibles, productos de la combustión y sustancias peligrosas.' },
  { cod: 'CIOR-109', n: 'Primeros Auxilios', pao: 1, u: 'Profesional', mod: ['tri', 'inc'], rel: 'directa', sim: 'Evaluación de la escena, hemorragias, quemaduras y soporte vital básico.' },
  { cod: 'CIOR-201', n: 'Ética Profesional y Liderazgo', pao: 2, u: 'Básica', mod: ['casos', 'inc'], rel: 'directa', sim: 'Dilemas éticos y liderazgo del equipo bajo presión.' },
  { cod: 'CIOR-203', n: 'Psicología Aplicada', pao: 2, u: 'Básica', mod: ['casos'], rel: 'directa', sim: 'Estrés, intervención en crisis y autocuidado del personal.' },
  { cod: 'CIOR-204', n: 'Informática Aplicada', pao: 2, u: 'Básica', mod: ['inc'], rel: 'parcial', sim: 'Registro cronológico del incidente y de los recursos.' },
  { cod: 'CIOR-205', n: 'Ciencias del Fuego II', pao: 2, u: 'Profesional', mod: ['inc', 'lab'], rel: 'directa', sim: 'Viento y topografía en la propagación; estrategias de control.' },
  { cod: 'CIOR-206', n: 'Química del Fuego', pao: 2, u: 'Profesional', mod: ['lab'], rel: 'directa', sim: 'Agentes extintores y métodos para interrumpir la combustión.' },
  { cod: 'CIOR-209', n: 'Atención Prehospitalaria', pao: 2, u: 'Profesional', mod: ['tri', 'inc'], rel: 'directa', sim: 'Triage, evaluación primaria, inmovilización y traslado.' },
  { cod: 'CIOR-305', n: 'Preparación Física e Instrucción Formal', pao: 3, u: 'Profesional', mod: ['inc'], rel: 'parcial', sim: 'Fatiga, relevos y rehabilitación del personal durante la operación.' },
  { cod: 'CIOR-306', n: 'Física del Fuego', pao: 3, u: 'Profesional', mod: ['lab', 'inc'], rel: 'directa', sim: 'Conducción, convección y radiación; signos de flashover y backdraft.' },
  { cod: 'CIOR-307', n: 'Técnicas de Intervención', pao: 3, u: 'Profesional', mod: ['inc'], rel: 'directa', sim: 'Ataque directo e indirecto, ventilación, rescate y evaluación de riesgos.' },
  { cod: 'CIOR-308', n: 'Legislación de las Operaciones de Rescate', pao: 3, u: 'Profesional', mod: ['casos'], rel: 'directa', sim: 'Seguridad laboral, EPP, derechos de las víctimas e informes.' },
  { cod: 'CIOR-309', n: 'Materiales Peligrosos', pao: 3, u: 'Profesional', mod: ['inc', 'lab'], rel: 'directa', sim: 'Identificación, zonas de trabajo, EPP, contención y descontaminación.' },
  { cod: 'CIOR-405', n: 'Gestión de Procesos', pao: 4, u: 'Profesional', mod: ['inc', 'casos'], rel: 'directa', sim: 'Planificación de la operación, recursos y mejora continua.' },
  { cod: 'CIOR-407', n: 'Técnicas de Control de Incendios', pao: 4, u: 'Profesional', mod: ['inc', 'lab'], rel: 'directa', sim: 'Agentes según la clase de fuego, ataque, ventilación y control de humo.' },
  { cod: 'CIOR-408', n: 'Operaciones de Rescate', pao: 4, u: 'Profesional', mod: ['inc'], rel: 'directa', sim: 'Accidentes vehiculares: seguridad, estabilización y extracción.' },
  { cod: 'CIOR-409', n: 'Educación Ambiental y Control de Incendios', pao: 4, u: 'Profesional', mod: ['inc', 'casos'], rel: 'directa', sim: 'Incendios forestales con menor impacto ambiental y rehabilitación.' },
  { cod: 'CIOR-410', n: 'Trabajo de Integración Curricular', pao: 4, u: 'Integración', mod: ['inc', 'tri', 'lab', 'casos'], rel: 'parcial', sim: 'Integra todos los módulos; los reportes sirven como evidencia.' }
];

/* Tripulación virtual */
const CREW = [
  { id: 'c1', nombre: 'Sgto. Andrade', rol: 'Líder de ataque', avatar: '👨🏽‍🚒', pitch: 0.9 },
  { id: 'c2', nombre: 'Bombera Grefa', rol: 'Pitonera', avatar: '👩🏽‍🚒', pitch: 1.3 },
  { id: 'c3', nombre: 'Bombero Tanguila', rol: 'Rescatista', avatar: '🧑🏽‍🚒', pitch: 1.05 },
  { id: 'c4', nombre: 'Bombero Vargas', rol: 'Maquinista', avatar: '👨🏻‍🚒', pitch: 0.95 }
];

/* ---------------- ESCENARIOS ----------------
   Cada opción: t (orden), p (0-2 puntos), fb (fundamento),
   ef: efectos { min, fuego, riesgo, ataque (0-1: eficacia sostenida), agua,
                 sci, com, epp, dentro (n bomberos que ingresan | 'salen'),
                 vic: {id, a: 'rescatar'|'estabilizar'|'empeorar'} }  */
const ESCENARIOS = [
  {
    id: 'estructural', nombre: 'Incendio en vivienda de dos pisos', emoji: '🏠', tipo: 'estructural',
    asignaturas: ['CIOR-407', 'CIOR-307', 'CIOR-306', 'CIOR-105'],
    despacho: 'ECU 911 reporta incendio en una vivienda de dos pisos de construcción mixta en Puyo. Vecinos indican que una adulta mayor podría estar en el segundo piso.',
    claseFuego: 'A', crecimiento: 2.2, fuego0: 30, agua0: 3000,
    victimas: [{ id: 'v1', nombre: 'Sra. Carmen', avatar: '👵🏽', estado: 'atrapada', grav: 0.35, deterioro: 0.03, grito: '¡Auxilio! ¡No puedo bajar, hay mucho humo!' }],
    pasos: [
      { fase: 'Evaluación de la escena', q: 'Llegas al lugar. ¿Cuál es tu primera acción?', o: [
        { t: 'Realizar una evaluación 360° de la estructura: humo, llamas, riesgos (cables, cilindro de GLP) y confirmar víctimas con los vecinos.', p: 2, fb: 'La evaluación inicial (360°) define la estrategia y protege al personal.', ef: { min: 2 } },
        { t: 'Ingresar de inmediato con todo el personal a buscar a la víctima.', p: 0, fb: 'Ingresar sin evaluar expone a todo el equipo y deja la escena sin control.', ef: { min: 1, riesgo: 25, dentro: 4 } },
        { t: 'Esperar a que llegue una segunda unidad antes de actuar.', p: 0, fb: 'La demora permite que el incendio crezca y empeora a la víctima.', ef: { min: 6 } }
      ]},
      { fase: 'Comando del incidente', q: '¿Cómo organizas el mando?', o: [
        { t: 'Asumo el mando, establezco el Puesto de Comando en zona segura, defino zonas de trabajo e informo a ECU 911.', p: 2, fb: 'El Sistema de Comando de Incidentes (SCI) ordena roles, comunicación y seguridad.', ef: { min: 1, sci: 1, com: 1, riesgo: -8 } },
        { t: 'Doy órdenes desde donde esté, sin puesto de comando.', p: 1, fb: 'Sin puesto de comando la coordinación se dificulta cuando llegan más recursos.', ef: { min: 0 } },
        { t: 'Dejo que cada bombero decida qué hacer.', p: 0, fb: 'Sin mando unificado aumentan los riesgos y se duplican esfuerzos.', ef: { min: 0, riesgo: 15 } }
      ]},
      { fase: 'Seguridad y EPP', q: 'Antes de ingresar, ¿qué ordenas?', o: [
        { t: 'Corte de energía eléctrica y cierre del GLP; ingreso en pareja con EPP completo y equipo de respiración autónoma (ERA).', p: 2, fb: 'Controlar los servicios y trabajar en pareja con ERA es la base de la seguridad interior.', ef: { min: 2, epp: 1, riesgo: -12 } },
        { t: 'Que ingresen sin ERA porque todavía hay poco humo.', p: 0, fb: 'Los gases de la combustión (CO, HCN) son tóxicos aun sin humo visible abundante.', ef: { min: 0, riesgo: 30 } },
        { t: 'Corto la energía, pero envío a un solo bombero para ganar tiempo.', p: 1, fb: 'Nunca se ingresa solo a una atmósfera peligrosa: siempre en pareja.', ef: { min: 1, riesgo: 12, epp: 1 } }
      ]},
      { fase: 'Táctica de extinción', q: 'Es un fuego de muebles y madera. ¿Qué ataque ordenas?', o: [
        { t: 'Ataque ofensivo interior con línea de agua y chorro en niebla/pulsos, con una línea de respaldo.', p: 2, fb: 'Fuego clase A: el agua enfría eficazmente; la línea de respaldo protege al equipo.', ef: { min: 2, ataque: 0.85, agua: -900, dentro: 2 } },
        { t: 'Usar un extintor de CO₂ desde la puerta.', p: 0, fb: 'Un extintor de CO₂ no alcanza para un fuego estructural y no enfría los sólidos.', ef: { min: 2, ataque: 0.15 } },
        { t: 'Ataque defensivo desde afuera rompiendo todas las ventanas.', p: 1, fb: 'Romper ventanas sin coordinar aporta oxígeno y puede acelerar el incendio.', ef: { min: 2, ataque: 0.45, fuego: 10, agua: -700 } }
      ]},
      { fase: 'Búsqueda y rescate', q: '¿Cómo rescatas a la Sra. Carmen?', o: [
        { t: 'Búsqueda primaria en pareja, orientados por la pared y la línea de manguera; extraer a la víctima por la escalera interior protegida.', p: 2, fb: 'Una búsqueda sistemática y guiada reduce el riesgo de desorientación.', ef: { min: 3, vic: { id: 'v1', a: 'rescatar' } } },
        { t: 'Llamarla desde afuera para que salga sola.', p: 0, fb: 'Una persona expuesta al humo puede estar desorientada o inconsciente.', ef: { min: 3, vic: { id: 'v1', a: 'empeorar' } } },
        { t: 'Subir por una escalera portátil sin asegurarla.', p: 1, fb: 'La escalera debe asegurarse y tener un bombero en la base.', ef: { min: 3, riesgo: 12, vic: { id: 'v1', a: 'rescatar' } } }
      ]},
      { fase: 'Atención de la víctima', q: 'La Sra. Carmen está somnolienta, respira con dificultad y tiene hollín en la nariz. ¿Qué haces?', o: [
        { t: 'Llevarla a zona segura, evaluar ABC, administrar oxígeno y coordinar traslado con la ambulancia.', p: 2, fb: 'Signos de inhalación de humo: oxígeno y traslado prioritario.', ef: { min: 2, vic: { id: 'v1', a: 'estabilizar' }, com: 1 } },
        { t: 'Darle agua para que se recupere.', p: 0, fb: 'Con alteración de conciencia no se dan líquidos por boca (riesgo de aspiración).', ef: { min: 2, vic: { id: 'v1', a: 'empeorar' } } },
        { t: 'Dejarla con un vecino y volver al incendio.', p: 0, fb: 'La víctima requiere vigilancia y entrega formal al personal de salud.', ef: { min: 1, vic: { id: 'v1', a: 'empeorar' } } }
      ]},
      { fase: 'Ventilación', q: 'El agua ya está en la boquilla. ¿Cómo ventilas?', o: [
        { t: 'Ventilación coordinada con el ataque, abriendo una salida del lado opuesto al ingreso.', p: 2, fb: 'Ventilar en coordinación con el ataque retira calor y humo sin avivar el fuego.', ef: { min: 1, ataque: 0.95, riesgo: -6 } },
        { t: 'Abrir todas las puertas y ventanas al mismo tiempo.', p: 0, fb: 'El ingreso masivo de aire puede provocar un desarrollo rápido del fuego.', ef: { min: 1, fuego: 18, riesgo: 15 } },
        { t: 'No ventilar.', p: 1, fb: 'Sin ventilación se acumulan calor y humo; la visibilidad para el rescate es mínima.', ef: { min: 0 } }
      ]},
      { fase: 'Remoción y cierre', q: 'Ya no se ven llamas. ¿Qué haces?', o: [
        { t: 'Remoción de escombros, búsqueda de focos ocultos con cámara térmica, vigilancia y entrega de la escena a la autoridad.', p: 2, fb: 'La remoción evita la reignición; la entrega formal cierra la operación.', ef: { min: 4, fuego: -100, dentro: 'salen', com: 1 } },
        { t: 'Retirarse de inmediato.', p: 0, fb: 'Los focos ocultos en paredes y techos pueden reavivar el incendio.', ef: { min: 1, fuego: 15, dentro: 'salen' } },
        { t: 'Mojar todo con abundante agua y retirarse.', p: 1, fb: 'El exceso de agua causa daños; se requiere remoción e inspección.', ef: { min: 3, fuego: -60, agua: -800, dentro: 'salen' } }
      ]}
    ],
    eventos: [
      { id: 'flashover', txt: 'El humo se vuelve oscuro y denso, sale a presión y el calor obliga al equipo a agacharse. Se ven lenguas de fuego en la capa de humo.', voz: '¡Mi jefe, el calor está aumentando muy rápido!', o: [
        { t: 'Enfriar la capa de gases con pulsos cortos y preparar la salida del equipo.', p: 2, fb: 'Son signos de flashover inminente: enfriar los gases y asegurar la retirada.', ef: { min: 1, riesgo: -10, fuego: -5 } },
        { t: 'Abrir una ventana para que salga el humo.', p: 0, fb: 'Aportar oxígeno en ese momento puede desencadenar el flashover.', ef: { min: 1, riesgo: 25, fuego: 15, herido: true } },
        { t: 'Seguir avanzando hacia la víctima.', p: 0, fb: 'Ignorar los signos de flashover puede ser mortal para el equipo.', ef: { min: 1, riesgo: 20, herido: true } }
      ]},
      { id: 'glp', txt: 'Un vecino avisa que hay un cilindro de gas (GLP) en la cocina, junto al fuego.', voz: '¡Hay un tanque de gas en la cocina!', o: [
        { t: 'Enfriar el cilindro con agua desde una posición protegida y, si es seguro, retirarlo.', p: 2, fb: 'Enfriar el recipiente reduce el riesgo de que falle por presión.', ef: { min: 2, riesgo: -10, agua: -200 } },
        { t: 'Ignorarlo; el fuego está en otra parte.', p: 0, fb: 'Un cilindro expuesto al calor puede fallar violentamente.', ef: { min: 0, riesgo: 20 } }
      ]}
    ]
  },
  {
    id: 'vehicular', nombre: 'Accidente vehicular con persona atrapada', emoji: '🚗', tipo: 'vehicular',
    asignaturas: ['CIOR-408', 'CIOR-209', 'CIOR-307', 'CIOR-109'],
    despacho: 'ECU 911 reporta un choque frontal en la vía Puyo–Shell. Un conductor está atrapado y hay un pasajero herido.',
    claseFuego: 'B', crecimiento: 0, fuego0: 0, agua0: 2000,
    victimas: [
      { id: 'v1', nombre: 'Conductor (Luis)', avatar: '🧔🏽', estado: 'atrapado', grav: 0.4, deterioro: 0.025, grito: '¡Ayúdenme, no puedo mover las piernas!' },
      { id: 'v2', nombre: 'Pasajera (Diana)', avatar: '👩🏽', estado: 'herida leve', grav: 0.15, deterioro: 0.005, grito: 'Me duele el brazo…' }
    ],
    pasos: [
      { fase: 'Seguridad de la escena', q: 'Llegas al lugar del accidente. ¿Qué haces primero?', o: [
        { t: 'Posicionar la unidad como bloqueo, señalizar con conos, verificar derrames y riesgos eléctricos.', p: 2, fb: 'La seguridad de la escena protege al equipo y a las víctimas del tránsito.', ef: { min: 2, riesgo: -12 } },
        { t: 'Correr hacia el vehículo sin señalizar.', p: 0, fb: 'Sin señalización, el tránsito pone en riesgo al equipo.', ef: { min: 1, riesgo: 25 } },
        { t: 'Esperar a la Policía para que cierre la vía.', p: 1, fb: 'La coordinación con la Policía es necesaria, pero se puede asegurar la escena de inmediato.', ef: { min: 5 } }
      ]},
      { fase: 'Comando y comunicación', q: '¿Cómo organizas la operación?', o: [
        { t: 'Establezco el mando, asigno roles (estabilización, herramientas, atención de víctimas) e informo a ECU 911 solicitando ambulancia.', p: 2, fb: 'Roles claros y comunicación temprana aceleran la atención.', ef: { min: 1, sci: 1, com: 1 } },
        { t: 'Todos ayudan en lo que puedan.', p: 0, fb: 'Sin roles se pierde tiempo y aumentan los errores.', ef: { min: 0, riesgo: 10 } },
        { t: 'Llamo a ECU 911 pero no asigno roles.', p: 1, fb: 'Falta organizar al equipo en tareas concretas.', ef: { min: 1, com: 1 } }
      ]},
      { fase: 'Control de riesgos del vehículo', q: 'Sale vapor del motor y huele a combustible. ¿Qué ordenas?', o: [
        { t: 'Desconectar la batería, colocar un extintor PQS listo y una línea de protección.', p: 2, fb: 'Combustible (clase B) y sistema eléctrico: cortar energía y tener extinción preparada.', ef: { min: 1, riesgo: -12, epp: 1 } },
        { t: 'Mojar el motor con agua a chorro.', p: 0, fb: 'El chorro directo sobre combustible puede esparcirlo.', ef: { min: 1, riesgo: 10, agua: -200 } },
        { t: 'No hacer nada; no hay llamas.', p: 0, fb: 'El riesgo de ignición está presente aunque no haya llamas.', ef: { min: 0, riesgo: 15 } }
      ]},
      { fase: 'Estabilización', q: 'El vehículo quedó inclinado. Antes de acceder a la víctima:', o: [
        { t: 'Estabilizar con calzas y bloques en puntos firmes; luego ingresar.', p: 2, fb: 'Un vehículo inestable puede moverse y agravar las lesiones.', ef: { min: 3, riesgo: -10 } },
        { t: 'Ingresar por la ventana sin estabilizar.', p: 0, fb: 'Cualquier movimiento del vehículo puede lesionar a la víctima y al rescatista.', ef: { min: 1, riesgo: 18, vic: { id: 'v1', a: 'empeorar' } } },
        { t: 'Pedir a los curiosos que sostengan el vehículo.', p: 0, fb: 'Nunca se involucra a civiles en maniobras de riesgo.', ef: { min: 2, riesgo: 20 } }
      ]},
      { fase: 'Evaluación de la víctima', q: 'Llegas al conductor. ¿Qué haces?', o: [
        { t: 'Control manual de la columna cervical, evaluación primaria (XABCDE) y control de hemorragias.', p: 2, fb: 'En el trauma vehicular se protege la columna y se controlan primero las hemorragias graves.', ef: { min: 2, vic: { id: 'v1', a: 'estabilizar' } } },
        { t: 'Sacarlo rápidamente jalándolo de los brazos.', p: 0, fb: 'Una extracción no controlada puede causar lesión medular.', ef: { min: 1, vic: { id: 'v1', a: 'empeorar' } } },
        { t: 'Darle agua y tranquilizarlo.', p: 1, fb: 'Tranquilizar es correcto, pero no se dan líquidos a un paciente de trauma.', ef: { min: 1 } }
      ]},
      { fase: 'Extracción', q: 'Las piernas están atrapadas por el tablero. ¿Cómo lo liberas?', o: [
        { t: 'Proteger a la víctima (manta y protector rígido) y crear espacio con herramientas hidráulicas: retiro de puerta y desplazamiento del tablero.', p: 2, fb: 'Se crea espacio alrededor de la víctima, no se la mueve hacia el espacio.', ef: { min: 6, vic: { id: 'v1', a: 'rescatar' } } },
        { t: 'Cortar sin proteger a la víctima.', p: 0, fb: 'Los vidrios y fragmentos pueden lesionarla.', ef: { min: 5, vic: { id: 'v1', a: 'rescatar' }, riesgo: 10 } },
        { t: 'Esperar a una grúa para separar los vehículos.', p: 0, fb: 'La demora agrava a la víctima atrapada.', ef: { min: 12 } }
      ]},
      { fase: 'Inmovilización y traslado', q: 'La víctima está liberada. ¿Cómo la trasladas?', o: [
        { t: 'Collar cervical, tabla espinal y extracción coordinada; entrega a la ambulancia con informe verbal.', p: 2, fb: 'Inmovilización completa y transferencia formal al personal de salud.', ef: { min: 3, vic: { id: 'v1', a: 'estabilizar' }, com: 1 } },
        { t: 'Sentarla en la vereda hasta que llegue la ambulancia.', p: 0, fb: 'Una posible lesión de columna requiere inmovilización.', ef: { min: 1, vic: { id: 'v1', a: 'empeorar' } } },
        { t: 'Llevarla en la camioneta de un vecino al hospital.', p: 0, fb: 'El traslado debe ser en ambulancia, con personal y equipo adecuados.', ef: { min: 1, vic: { id: 'v1', a: 'empeorar' } } }
      ]}
    ],
    eventos: [
      { id: 'airbag', txt: 'El airbag del lado del conductor no se activó en el choque.', voz: 'Mi jefe, el airbag del volante no se disparó.', o: [
        { t: 'Mantenerse fuera de la zona de despliegue del airbag y desconectar la batería.', p: 2, fb: 'Un airbag no activado puede dispararse durante el rescate.', ef: { min: 1, riesgo: -8 } },
        { t: 'Trabajar normalmente frente al volante.', p: 0, fb: 'Riesgo de lesión si el airbag se dispara.', ef: { min: 0, riesgo: 15, herido: true } }
      ]},
      { id: 'pasajera', txt: 'La pasajera camina, pero se queja de dolor en el brazo y está muy nerviosa.', voz: 'Me duele mucho el brazo…', o: [
        { t: 'Asignar a un bombero para valorarla, inmovilizar el brazo y acompañarla a zona segura.', p: 2, fb: 'Toda víctima debe ser valorada; la contención emocional es parte de la atención.', ef: { min: 2, vic: { id: 'v2', a: 'estabilizar' } } },
        { t: 'Decirle que espere; no es grave.', p: 0, fb: 'Las lesiones pueden pasar desapercibidas en víctimas que caminan.', ef: { min: 0, vic: { id: 'v2', a: 'empeorar' } } }
      ]}
    ]
  },
  {
    id: 'forestal', nombre: 'Incendio de vegetación en ladera', emoji: '🌲', tipo: 'forestal',
    asignaturas: ['CIOR-409', 'CIOR-205', 'CIOR-407'],
    despacho: 'ECU 911 reporta un incendio de vegetación en una ladera cercana a una comunidad. Viento moderado en dirección a las viviendas.',
    claseFuego: 'A', crecimiento: 2.6, fuego0: 25, agua0: 2500,
    victimas: [{ id: 'v1', nombre: 'Agricultor (Don Pedro)', avatar: '👨🏽‍🌾', estado: 'herido', grav: 0.3, deterioro: 0.015, grito: '¡Me quemé el brazo tratando de apagarlo!' }],
    pasos: [
      { fase: 'Evaluación', q: 'Al llegar, ¿qué evalúas primero?', o: [
        { t: 'Viento, pendiente, tipo de vegetación, dirección de avance y viviendas amenazadas.', p: 2, fb: 'Viento, topografía y combustible determinan cómo se propagará el fuego.', ef: { min: 2 } },
        { t: 'Solo el tamaño de las llamas.', p: 1, fb: 'El tamaño no basta; el viento y la pendiente cambian el comportamiento.', ef: { min: 1 } },
        { t: 'Nada; ir directo a atacar el frente del fuego.', p: 0, fb: 'Atacar sin evaluar expone al personal a quedar atrapado.', ef: { min: 1, riesgo: 25 } }
      ]},
      { fase: 'Seguridad del personal', q: '¿Qué medidas de seguridad estableces?', o: [
        { t: 'Vigía, comunicaciones, rutas de escape y zonas seguras conocidas por todo el equipo.', p: 2, fb: 'Vigía, comunicación, rutas de escape y zonas seguras son la base de la seguridad en incendios forestales.', ef: { min: 2, sci: 1, riesgo: -15, epp: 1 } },
        { t: 'Solo verificar que todos tengan casco.', p: 1, fb: 'El EPP es necesario, pero no reemplaza las rutas de escape y zonas seguras.', ef: { min: 1, epp: 1 } },
        { t: 'Ninguna; el fuego es pequeño.', p: 0, fb: 'Los incendios de vegetación cambian rápidamente con el viento.', ef: { min: 0, riesgo: 20 } }
      ]},
      { fase: 'Comunicación', q: 'Las llamas avanzan hacia las viviendas.', o: [
        { t: 'Informar a ECU 911, solicitar apoyo y coordinar con la Policía la evacuación preventiva de las viviendas expuestas.', p: 2, fb: 'Proteger vidas es la prioridad; la evacuación preventiva se coordina con otras instituciones.', ef: { min: 1, com: 1, sci: 1 } },
        { t: 'No avisar para no alarmar a la comunidad.', p: 0, fb: 'Ocultar el riesgo pone en peligro a la población.', ef: { min: 0, riesgo: 15 } },
        { t: 'Pedir a los vecinos que ayuden a apagar con baldes.', p: 0, fb: 'Involucrar a civiles en el ataque los expone a lesiones.', ef: { min: 1, riesgo: 15, vic: { id: 'v1', a: 'empeorar' } } }
      ]},
      { fase: 'Táctica', q: '¿Qué estrategia de ataque usas?', o: [
        { t: 'Ataque por los flancos desde un punto de anclaje seguro y una línea de control raspada hasta suelo mineral para proteger las viviendas.', p: 2, fb: 'Atacar desde un ancla, por los flancos, evita quedar atrapado por la cabeza del incendio.', ef: { min: 4, ataque: 0.8, agua: -500 } },
        { t: 'Atacar de frente la cabeza del incendio, ladera arriba.', p: 0, fb: 'El fuego sube rápido en pendiente: atacar la cabeza ladera arriba es muy peligroso.', ef: { min: 3, ataque: 0.4, riesgo: 25, herido: true } },
        { t: 'Usar toda el agua del tanque sobre las llamas más grandes.', p: 1, fb: 'El agua es limitada: se usa para enfriar bordes y proteger la línea de control.', ef: { min: 2, ataque: 0.5, agua: -1800 } }
      ]},
      { fase: 'Atención del herido', q: 'Don Pedro tiene una quemadura en el antebrazo.', o: [
        { t: 'Enfriar con agua limpia a temperatura ambiente unos 20 minutos, retirar anillos y cubrir con apósito limpio.', p: 2, fb: 'El enfriamiento con agua limita la profundidad de la quemadura.', ef: { min: 2, vic: { id: 'v1', a: 'estabilizar' }, agua: -50 } },
        { t: 'Aplicar hielo y pasta dental.', p: 0, fb: 'El hielo y los remedios caseros dañan el tejido y aumentan el riesgo de infección.', ef: { min: 1, vic: { id: 'v1', a: 'empeorar' } } },
        { t: 'Reventar las ampollas para que sane rápido.', p: 0, fb: 'Las ampollas no se revientan: protegen de infecciones.', ef: { min: 1, vic: { id: 'v1', a: 'empeorar' } } }
      ]},
      { fase: 'Liquidación', q: 'El avance se detuvo. ¿Qué haces?', o: [
        { t: 'Liquidar: remover y enfriar los puntos calientes del perímetro y mantener vigilancia.', p: 2, fb: 'La liquidación evita reactivaciones.', ef: { min: 5, fuego: -100 } },
        { t: 'Retirarse porque ya no hay llamas.', p: 0, fb: 'Las brasas pueden reactivar el incendio con el viento.', ef: { min: 1, fuego: 20 } },
        { t: 'Aplicar retardante químico cerca del río.', p: 0, fb: 'Los químicos cerca de fuentes de agua causan daño ambiental.', ef: { min: 3, fuego: -80 } }
      ]},
      { fase: 'Recuperación ambiental', q: '¿Qué recomiendas tras el incendio?', o: [
        { t: 'Evaluar el área afectada, evitar el pastoreo, proteger el suelo de la erosión y coordinar reforestación con especies nativas.', p: 2, fb: 'La rehabilitación con especies nativas reduce la erosión y recupera el ecosistema.', ef: { min: 2, com: 1 } },
        { t: 'Sembrar especies de crecimiento rápido no nativas.', p: 1, fb: 'Las especies exóticas pueden desplazar a las nativas.', ef: { min: 1 } },
        { t: 'Nada; la vegetación se recupera sola.', p: 0, fb: 'Sin manejo, la erosión puede afectar suelos y fuentes de agua.', ef: { min: 0 } }
      ]}
    ],
    eventos: [
      { id: 'viento', txt: 'El viento cambia de dirección y empuja el fuego hacia la posición de la cuadrilla.', voz: '¡Mi jefe, el viento cambió, el fuego viene hacia nosotros!', o: [
        { t: 'Retirada inmediata por la ruta de escape hacia la zona segura y conteo del personal.', p: 2, fb: 'Ante un cambio de viento, la vida del equipo es la prioridad.', ef: { min: 2, riesgo: -15, dentro: 'salen' } },
        { t: 'Mantener la posición y seguir atacando.', p: 0, fb: 'Quedarse expone a la cuadrilla a quedar atrapada.', ef: { min: 1, riesgo: 30, herido: true } }
      ]},
      { id: 'humo', txt: 'El humo cubre la carretera de acceso a la comunidad.', voz: 'No se ve nada en la vía, hay mucho humo.', o: [
        { t: 'Coordinar con la Policía el cierre o la regulación del tránsito.', p: 2, fb: 'El humo en vías causa accidentes; se coordina con la Policía.', ef: { min: 1, com: 1 } },
        { t: 'No es asunto de bomberos.', p: 0, fb: 'La seguridad de la escena incluye las vías aledañas.', ef: { min: 0, riesgo: 10 } }
      ]}
    ]
  },
  {
    id: 'hazmat', nombre: 'Derrame de material peligroso', emoji: '🛢️', tipo: 'hazmat',
    asignaturas: ['CIOR-309', 'CIOR-106', 'CIOR-206'],
    despacho: 'ECU 911 reporta un camión cisterna volcado con derrame de líquido. Placa naranja con el número 1203 y rombo con un 3 en el cuadro rojo.',
    claseFuego: 'B', crecimiento: 0, fuego0: 0, agua0: 3000, riesgoDerrame: true,
    victimas: [{ id: 'v1', nombre: 'Conductor del camión', avatar: '👨🏾', estado: 'expuesto', grav: 0.3, deterioro: 0.02, grito: '¡Me cayó el combustible encima, me arde la piel!' }],
    pasos: [
      { fase: 'Aproximación', q: '¿Cómo te aproximas al lugar?', o: [
        { t: 'Con el viento a la espalda, desde una posición elevada y a distancia, observando con binoculares.', p: 2, fb: 'La aproximación a favor del viento y cuesta arriba evita la exposición a vapores.', ef: { min: 2, riesgo: -12 } },
        { t: 'Directamente hasta el camión para ver mejor.', p: 0, fb: 'Acercarse sin identificar el producto expone al equipo.', ef: { min: 1, riesgo: 30 } },
        { t: 'Por la parte baja, siguiendo el derrame.', p: 0, fb: 'Los vapores y líquidos se acumulan en las partes bajas.', ef: { min: 1, riesgo: 20 } }
      ]},
      { fase: 'Identificación', q: 'El número ONU 1203 y el rombo NFPA con 3 en inflamabilidad. ¿Qué haces?', o: [
        { t: 'Identificar el producto (UN 1203: gasolina) con la Guía de Respuesta en caso de Emergencia y aplicar sus recomendaciones de aislamiento.', p: 2, fb: 'La guía orienta sobre riesgos, distancias de aislamiento y EPP.', ef: { min: 2, epp: 1 } },
        { t: 'Suponer que es agua porque no huele.', p: 0, fb: 'Nunca se supone el producto: se identifica.', ef: { min: 0, riesgo: 25 } },
        { t: 'Preguntar a los curiosos qué transportaba.', p: 1, fb: 'La información de testigos ayuda, pero no reemplaza la identificación formal.', ef: { min: 2 } }
      ]},
      { fase: 'Aislamiento y comando', q: '¿Cómo organizas la escena?', o: [
        { t: 'Establecer zonas caliente, tibia y fría; aislar el área, evacuar a curiosos y ubicar el comando en la zona fría.', p: 2, fb: 'Las zonas controlan quién entra y dónde se descontamina.', ef: { min: 2, sci: 1, riesgo: -15, com: 1 } },
        { t: 'Dejar que los curiosos permanezcan para ayudar.', p: 0, fb: 'Toda persona sin protección debe salir del área.', ef: { min: 0, riesgo: 20 } },
        { t: 'Solo poner cinta alrededor del camión.', p: 1, fb: 'El aislamiento debe considerar la distancia recomendada y la dirección del viento.', ef: { min: 1, riesgo: -5 } }
      ]},
      { fase: 'Control de ignición', q: 'Es un líquido inflamable. ¿Qué ordenas?', o: [
        { t: 'Eliminar fuentes de ignición (motores, celulares, chispas) y tener una línea de espuma lista.', p: 2, fb: 'La espuma forma una capa que suprime los vapores inflamables.', ef: { min: 2, riesgo: -15 } },
        { t: 'Lavar el derrame con agua a chorro hacia la alcantarilla.', p: 0, fb: 'Esparcir el combustible al alcantarillado aumenta el riesgo y contamina.', ef: { min: 2, riesgo: 20, agua: -800 } },
        { t: 'Permitir que los vehículos sigan pasando.', p: 0, fb: 'Los motores son fuente de ignición.', ef: { min: 0, riesgo: 25 } }
      ]},
      { fase: 'Atención del expuesto', q: 'El conductor está empapado de combustible.', o: [
        { t: 'Rescatarlo con EPP adecuado, descontaminarlo en el corredor de la zona tibia y luego atenderlo y entregarlo a la ambulancia.', p: 2, fb: 'Descontaminar antes de atender evita la contaminación secundaria del personal de salud.', ef: { min: 4, vic: { id: 'v1', a: 'rescatar' } } },
        { t: 'Subirlo directo a la ambulancia.', p: 0, fb: 'Sin descontaminar se expone al personal de salud y al vehículo.', ef: { min: 2, vic: { id: 'v1', a: 'rescatar' }, riesgo: 15 } },
        { t: 'Esperar a que salga caminando.', p: 0, fb: 'La exposición continúa y la víctima empeora.', ef: { min: 4, vic: { id: 'v1', a: 'empeorar' } } }
      ]},
      { fase: 'Contención', q: '¿Cómo controlas el derrame?', o: [
        { t: 'Contener con diques y material absorbente, proteger alcantarillas y coordinar con la empresa y la autoridad ambiental el trasvase.', p: 2, fb: 'Contener evita que el producto llegue a ríos y alcantarillas.', ef: { min: 5, riesgo: -20, com: 1 } },
        { t: 'Prender fuego al derrame para eliminarlo.', p: 0, fb: 'Una ignición intencional sin control es extremadamente peligrosa.', ef: { min: 1, riesgo: 40, fuego: 60, herido: true } },
        { t: 'Cubrir con tierra y retirarse.', p: 1, fb: 'La tierra ayuda, pero se requiere disposición final y coordinación ambiental.', ef: { min: 3, riesgo: -8 } }
      ]},
      { fase: 'Descontaminación y cierre', q: 'El derrame está controlado.', o: [
        { t: 'Descontaminar al personal y los equipos en el corredor, registrar exposiciones y entregar la escena a la autoridad competente.', p: 2, fb: 'El personal también debe descontaminarse y quedar registrado.', ef: { min: 3, riesgo: -10, com: 1, dentro: 'salen' } },
        { t: 'Guardar los trajes en la unidad sin lavarlos.', p: 0, fb: 'Los equipos contaminados exponen al personal.', ef: { min: 1, riesgo: 15, dentro: 'salen' } }
      ]}
    ],
    eventos: [
      { id: 'vapores', txt: 'El viento cambia y los vapores se dirigen hacia el puesto de comando.', voz: '¡Mi jefe, huele fuerte a gasolina aquí!', o: [
        { t: 'Reubicar el puesto de comando y las zonas según la nueva dirección del viento.', p: 2, fb: 'Las zonas se ajustan al viento en todo momento.', ef: { min: 2, riesgo: -10 } },
        { t: 'Quedarse; ya está todo instalado.', p: 0, fb: 'El personal queda expuesto a vapores.', ef: { min: 0, riesgo: 25 } }
      ]},
      { id: 'curioso', txt: 'Un curioso se acerca a grabar con su celular dentro de la zona caliente.', voz: '¡Señor, aléjese, es peligroso!', o: [
        { t: 'Sacarlo de inmediato con apoyo de la Policía y reforzar el perímetro.', p: 2, fb: 'El celular puede ser fuente de ignición y la persona se expone a vapores.', ef: { min: 1, riesgo: -5, com: 1 } },
        { t: 'Dejarlo; no es tu responsabilidad.', p: 0, fb: 'El control del perímetro es parte de la seguridad de la escena.', ef: { min: 0, riesgo: 15 } }
      ]}
    ]
  }
];

/* Eventos comunes a todos los escenarios (dependen del estado) */
const EVENTOS_COMUNES = [
  { id: 'prensa', txt: 'Un periodista se acerca y pide declaraciones en vivo sobre las víctimas.', voz: 'Comandante, ¿cuántos muertos hay? ¿Quién es la víctima?', o: [
    { t: 'Derivarlo al punto de información; dar solo datos verificados, sin identificar a las víctimas.', p: 2, fb: 'Se protege la identidad de las víctimas y se evita difundir información no confirmada.', ef: { min: 1, com: 1 } },
    { t: 'Dar el nombre de la víctima y una estimación de daños.', p: 0, fb: 'Revelar datos personales vulnera los derechos de las víctimas.', ef: { min: 2 } },
    { t: 'Ignorarlo y seguir.', p: 1, fb: 'Es mejor derivarlo a un vocero que ignorarlo.', ef: { min: 0 } }
  ]},
  { id: 'familiar', txt: 'Un familiar desesperado intenta ingresar a la zona de peligro.', voz: '¡Déjenme pasar, es mi mamá!', o: [
    { t: 'Detenerlo con calma, explicarle lo que se está haciendo y asignar a alguien para acompañarlo en zona segura.', p: 2, fb: 'La contención emocional evita que se convierta en otra víctima.', ef: { min: 1, riesgo: -4 } },
    { t: 'Gritarle que se vaya.', p: 0, fb: 'La confrontación escala la crisis.', ef: { min: 0, riesgo: 6 } }
  ]}
];

/* ---------------- TRIAGE START ----------------
   camina, respira, respiraTrasAbrir, fr (resp/min), pulso (radial presente), llc (s), obedece */
const VICTIMAS_TRIAGE = [
  { n: 'Hombre de 30 años', av: '👨🏽', d: 'Camina hacia ti con un corte en la frente.', camina: true },
  { n: 'Mujer de 45 años', av: '👩🏻', d: 'No camina. Respira 24 por minuto, pulso radial presente, responde y obedece órdenes. Fractura en la pierna.', camina: false, respira: true, fr: 24, pulso: true, llc: 1.5, obedece: true },
  { n: 'Joven de 17 años', av: '🧑🏾', d: 'No camina. Respira 36 por minuto, ansioso.', camina: false, respira: true, fr: 36, pulso: true, llc: 1.5, obedece: true },
  { n: 'Hombre de 60 años', av: '👴🏽', d: 'No camina. No respira. Al abrir la vía aérea, comienza a respirar.', camina: false, respira: false, respiraTrasAbrir: true },
  { n: 'Mujer de 25 años', av: '👩🏽', d: 'No camina. Respira 20 por minuto, sin pulso radial, piel pálida y fría.', camina: false, respira: true, fr: 20, pulso: false, llc: 3, obedece: true },
  { n: 'Niño de 9 años', av: '👦🏽', d: 'Camina llorando, con raspones en los brazos.', camina: true },
  { n: 'Hombre de 50 años', av: '🧔🏻', d: 'No camina. No respira, ni siquiera al abrir la vía aérea.', camina: false, respira: false, respiraTrasAbrir: false },
  { n: 'Mujer de 70 años', av: '👵🏻', d: 'No camina. Respira 18 por minuto, pulso radial presente, pero no obedece órdenes simples.', camina: false, respira: true, fr: 18, pulso: true, llc: 1.8, obedece: false },
  { n: 'Hombre de 35 años', av: '👨🏻', d: 'No camina. Respira 22 por minuto, llenado capilar de 3 segundos.', camina: false, respira: true, fr: 22, pulso: true, llc: 3, obedece: true },
  { n: 'Mujer de 28 años', av: '👩🏾', d: 'No camina por dolor en la cadera. Respira 16 por minuto, pulso radial presente, obedece órdenes.', camina: false, respira: true, fr: 16, pulso: true, llc: 1.2, obedece: true }
];
function startColor(v) {
  if (v.camina) return { c: 'verde', r: 'Camina: se clasifica VERDE (leve) y se dirige al área de concentración.' };
  if (!v.respira) return v.respiraTrasAbrir ? { c: 'rojo', r: 'No respiraba, pero respira al abrir la vía aérea: ROJO (inmediato).' } : { c: 'negro', r: 'No respira aun después de abrir la vía aérea: NEGRO (sin signos de vida).' };
  if (v.fr > 30) return { c: 'rojo', r: 'Frecuencia respiratoria mayor a 30 por minuto: ROJO.' };
  if (!v.pulso || v.llc > 2) return { c: 'rojo', r: 'Perfusión inadecuada (sin pulso radial o llenado capilar mayor a 2 s): ROJO.' };
  if (!v.obedece) return { c: 'rojo', r: 'No obedece órdenes simples: ROJO.' };
  return { c: 'amarillo', r: 'Respira 30 o menos, buena perfusión y obedece órdenes, pero no camina: AMARILLO (diferido).' };
}
const COLORES = { verde: '#16a34a', amarillo: '#eab308', rojo: '#dc2626', negro: '#111827' };

/* ---------------- LABORATORIO TÉCNICO ---------------- */
function rndI(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function mezclar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function preguntaMC(q, ok, malas, exp, asig) { const o = mezclar([ok, ...malas]); return { q, o, c: o.indexOf(ok), exp, asig }; }

const LAB_BANCO = [
  () => preguntaMC('Un incendio en un tablero eléctrico energizado es un fuego clase…', 'C', ['A', 'B', 'K'], 'Clase C: equipos eléctricos energizados. Se usa un agente no conductor (CO₂ o polvo químico seco).', 'CIOR-407'),
  () => preguntaMC('¿Qué agente es adecuado para un fuego de aceite de cocina (clase K)?', 'Agente húmedo (acetato de potasio)', ['Agua a chorro', 'Arena mojada', 'CO₂ únicamente'], 'Clase K: aceites de cocina. El agente húmedo saponifica y enfría; el agua puede provocar una proyección violenta.', 'CIOR-407'),
  () => preguntaMC('Un fuego de virutas de magnesio es clase…', 'D', ['A', 'B', 'C'], 'Clase D: metales combustibles. Requiere polvos especiales; el agua puede reaccionar violentamente.', 'CIOR-206'),
  () => preguntaMC('La gasolina en combustión es un fuego clase…', 'B', ['A', 'C', 'D'], 'Clase B: líquidos y gases inflamables. Espuma, polvo químico seco o CO₂.', 'CIOR-407'),
  () => preguntaMC('El polvo químico seco (PQS) actúa principalmente sobre…', 'La reacción en cadena (inhibición)', ['El combustible (eliminación)', 'Solo el calor (enfriamiento)', 'El color de la llama'], 'El PQS interrumpe químicamente la reacción en cadena del tetraedro del fuego.', 'CIOR-206'),
  () => preguntaMC('El agua extingue un fuego clase A principalmente por…', 'Enfriamiento', ['Inhibición', 'Eliminación del combustible', 'Dilución del oxígeno únicamente'], 'El agua absorbe calor al calentarse y evaporarse.', 'CIOR-105'),
  () => preguntaMC('¿Cuáles son los cuatro elementos del tetraedro del fuego?', 'Combustible, comburente (oxígeno), calor y reacción en cadena', ['Combustible, agua, aire y chispa', 'Oxígeno, humo, calor y luz', 'Calor, presión, gas y madera'], 'Si se elimina cualquiera de los cuatro, el fuego se extingue.', 'CIOR-105'),
  () => preguntaMC('El calor que sientes frente a una fogata sin tocarla se transmite por…', 'Radiación', ['Conducción', 'Convección', 'Sublimación'], 'La radiación viaja en ondas electromagnéticas y no necesita contacto.', 'CIOR-306'),
  () => preguntaMC('El humo caliente que sube y se acumula en el techo transmite calor por…', 'Convección', ['Conducción', 'Radiación', 'Inhibición'], 'La convección mueve el calor con los gases y fluidos calientes.', 'CIOR-306'),
  () => preguntaMC('Una viga de acero transmite el calor a otra habitación por…', 'Conducción', ['Convección', 'Radiación', 'Oxidación'], 'La conducción transmite el calor a través de un material sólido.', 'CIOR-306'),
  () => preguntaMC('El flashover ocurre en la transición entre las fases de…', 'Crecimiento y desarrollo completo', ['Ignición y crecimiento', 'Desarrollo completo y decaimiento', 'Decaimiento y extinción'], 'En el flashover todos los materiales del recinto se inflaman casi a la vez.', 'CIOR-105'),
  () => preguntaMC('Humo que entra y sale por las rendijas, ventanas ennegrecidas y poca llama visible indican riesgo de…', 'Backdraft', ['Flashover inmediato', 'Fuego clase D', 'Combustión completa'], 'Recinto con poco oxígeno y gases calientes: la entrada súbita de aire puede causar una explosión de humo (backdraft).', 'CIOR-306'),
  () => preguntaMC('En el rombo NFPA 704, el cuadro rojo indica…', 'Inflamabilidad', ['Riesgo para la salud', 'Reactividad', 'Riesgos especiales'], 'Azul: salud; rojo: inflamabilidad; amarillo: reactividad; blanco: riesgos especiales. Escala de 0 a 4.', 'CIOR-309'),
  () => preguntaMC('En el rombo NFPA 704, un 4 en el cuadro azul significa…', 'Riesgo extremo para la salud', ['Sin riesgo para la salud', 'Muy inflamable', 'Reacciona con el agua'], 'La escala va de 0 (mínimo) a 4 (extremo).', 'CIOR-309'),
  () => preguntaMC('¿Desde dónde se aproxima a un incidente con materiales peligrosos?', 'Con el viento a la espalda y desde un lugar alto', ['Con el viento de frente', 'Desde la parte más baja', 'Por el camino más corto'], 'Así se evita la exposición a vapores y líquidos que fluyen hacia abajo.', 'CIOR-309'),
  () => preguntaMC('El monóxido de carbono (CO) es peligroso porque…', 'Se une a la hemoglobina e impide el transporte de oxígeno', ['Huele muy fuerte y avisa', 'Es más pesado que el plomo', 'Solo afecta a la piel'], 'Es incoloro e inodoro; por eso se usa ERA en atmósferas de incendio.', 'CIOR-106'),
  () => preguntaMC('En una combustión incompleta se produce principalmente…', 'Monóxido de carbono (CO)', ['Solo vapor de agua', 'Oxígeno puro', 'Nitrógeno líquido'], 'Con poco oxígeno, la combustión genera CO y hollín.', 'CIOR-106'),
  () => preguntaMC('En un incendio forestal, en una pendiente el fuego tiende a…', 'Avanzar más rápido ladera arriba', ['Avanzar más rápido ladera abajo', 'Detenerse', 'No cambiar'], 'Las llamas precalientan la vegetación que está arriba.', 'CIOR-205'),
  () => preguntaMC('En el triage START, una víctima que no respira tras abrir la vía aérea se clasifica…', 'Negro', ['Rojo', 'Amarillo', 'Verde'], 'START: sin respiración tras abrir la vía aérea = negro.', 'CIOR-209'),
  () => preguntaMC('Para una quemadura térmica reciente se recomienda…', 'Enfriar con agua limpia a temperatura ambiente durante unos 20 minutos', ['Aplicar hielo directamente', 'Untar mantequilla', 'Reventar las ampollas'], 'El agua limita el daño; hielo y remedios caseros empeoran la lesión.', 'CIOR-109'),
  // Cálculos (Matemáticas)
  () => { const v = [6, 6.8, 9][rndI(0, 2)], p = [200, 300][rndI(0, 1)], c = [40, 50, 60][rndI(0, 2)]; const r = Math.floor(v * p / c); return { q: `Un cilindro de ERA de ${String(v).replace('.', ',')} L cargado a ${p} bar. Si el bombero consume ${c} L/min de aire, ¿cuántos minutos de autonomía teórica tiene? (redondea hacia abajo)`, num: r, tol: 1, exp: `Aire disponible = ${String(v).replace('.', ',')} L × ${p} bar = ${Math.round(v * p)} L. Autonomía = ${Math.round(v * p)} ÷ ${c} ≈ ${r} min (sin descontar la reserva).`, asig: 'CIOR-102' }; },
  () => { const t = [2000, 3000, 4000][rndI(0, 2)], q = [250, 400, 500][rndI(0, 2)]; const r = Math.round(t / q * 10) / 10; return { q: `La autobomba tiene ${t} L de agua y la línea descarga ${q} L/min. ¿Cuántos minutos de agua hay? (un decimal)`, num: r, tol: 0.15, exp: `Tiempo = ${t} ÷ ${q} = ${String(r).replace('.', ',')} min. Por eso se planifica el abastecimiento antes de agotar el tanque.`, asig: 'CIOR-102' }; },
  () => { const r = [50, 80, 100, 120][rndI(0, 3)]; const a = Math.round(Math.PI * r * r / 10000 * 100) / 100; return { q: `Un incendio forestal quemó un área aproximadamente circular de ${r} m de radio. ¿Cuántas hectáreas son? (dos decimales; 1 ha = 10 000 m²)`, num: a, tol: 0.03, exp: `Área = π × ${r}² ≈ ${Math.round(Math.PI * r * r)} m² = ${String(a).replace('.', ',')} ha.`, asig: 'CIOR-102' }; }
];

/* ---------------- CASOS PROFESIONALES ---------------- */
const CASOS_CIOR = [
  {
    id: 'orden-insegura', titulo: 'Una orden insegura de un superior',
    asignaturas: ['CIOR-201', 'CIOR-308'],
    persona: { nombre: 'Tnte. Morales', rol: 'Oficial a cargo', avatar: '👨🏻‍✈️', pitch: 0.85 },
    contexto: 'En un incendio de bodega, el oficial ordena que tu pareja y tú entren sin línea de respaldo porque "no hay tiempo".',
    pasos: [
      { dice: '¡Entren ya! No hay tiempo para la línea de respaldo.', opciones: [
        { t: 'Mi teniente, sin línea de respaldo el riesgo es alto. Propongo armarla en dos minutos mientras enfriamos desde la puerta.', p: 2, r: 'Está bien… háganlo rápido.', fb: 'Se expresa la preocupación de seguridad por la cadena de mando y se propone una alternativa viable.' },
        { t: 'Entro sin decir nada; las órdenes no se discuten.', p: 0, r: '(Ingresan con alto riesgo.)', fb: 'La obediencia no exime de advertir un riesgo grave para la vida.' },
        { t: 'Me niego a gritos frente a todo el equipo.', p: 1, r: '¡Respete la jerarquía!', fb: 'La preocupación es válida, pero la forma rompe la cadena de mando y la coordinación.' }
      ]},
      { dice: '(Terminada la operación.) ¿Qué haces con lo ocurrido?', opciones: [
        { t: 'Lo planteo en la reunión de análisis posterior como lección aprendida, con hechos y sin ataques personales.', p: 2, r: 'El análisis permite ajustar el procedimiento.', fb: 'El análisis posterior a la acción mejora los procedimientos.' },
        { t: 'Lo comento en redes sociales.', p: 0, r: '(Se genera un conflicto institucional.)', fb: 'Exponer a compañeros públicamente vulnera la ética profesional.' },
        { t: 'No digo nada.', p: 1, r: '(El riesgo podría repetirse.)', fb: 'Sin retroalimentación, el error se repite.' }
      ]},
      { dice: '¿Qué norma respalda tu actuación?', opciones: [
        { t: 'La normativa de seguridad y salud en el trabajo y los procedimientos operativos del cuerpo de bomberos, que priorizan la seguridad del personal.', p: 2, r: 'Correcto.', fb: 'La seguridad del personal es un principio de toda intervención.' },
        { t: 'Ninguna; es mi opinión personal.', p: 0, r: '…', fb: 'Existen normas y procedimientos que respaldan la seguridad.' },
        { t: 'El código de tránsito.', p: 0, r: '¿El código de tránsito?', fb: 'No corresponde al ámbito de la intervención.' }
      ]}
    ]
  },
  {
    id: 'estres-companero', titulo: 'Un compañero afectado tras un rescate',
    asignaturas: ['CIOR-203', 'CIOR-201'],
    persona: { nombre: 'Bombero Tanguila', rol: 'Compañero de guardia', avatar: '🧑🏽‍🚒', pitch: 1.05 },
    contexto: 'Hace tres días participaron en un accidente donde falleció un niño. Tu compañero no duerme, está irritable y evita hablar.',
    pasos: [
      { dice: 'Estoy bien… solo no puedo dormir. Sigo viendo el carro.', opciones: [
        { t: 'Te escucho. Es una reacción normal ante algo muy fuerte. ¿Quieres contarme cómo te sientes?', p: 2, r: 'La verdad… me siento culpable.', fb: 'Validar la reacción y escuchar sin juzgar es la primera ayuda psicológica.' },
        { t: 'Ya pasará, los bomberos somos fuertes.', p: 0, r: '(Se cierra y no vuelve a hablar.)', fb: 'Minimizar impide que pida ayuda.' },
        { t: 'Tómate unas cervezas para relajarte.', p: 0, r: 'Eso hice anoche…', fb: 'El alcohol empeora el estrés postraumático.' }
      ]},
      { dice: 'Siento que pude hacer algo más…', opciones: [
        { t: 'Hiciste todo lo posible. Te propongo hablar con el psicólogo institucional; también puedo acompañarte.', p: 2, r: 'Está bien, voy a ir.', fb: 'Derivar a apoyo profesional es clave si los síntomas persisten.' },
        { t: 'Sí, quizá te equivocaste.', p: 0, r: '(Se siente peor.)', fb: 'Reforzar la culpa agrava el malestar.' },
        { t: 'No pienses en eso.', p: 1, r: 'No puedo evitarlo.', fb: 'Evitar no resuelve; necesita procesar la experiencia.' }
      ]},
      { dice: '(Como líder de guardia, ¿qué más haces?)', opciones: [
        { t: 'Propongo una sesión grupal de desactivación (defusing) tras los incidentes críticos y promover el autocuidado.', p: 2, r: 'El equipo agradece el espacio.', fb: 'Las sesiones posincidente previenen el desgaste emocional del equipo.' },
        { t: 'Nada; cada quien maneja sus problemas.', p: 0, r: '…', fb: 'El bienestar del equipo es responsabilidad del liderazgo.' },
        { t: 'Lo retiro de la guardia sin explicarle.', p: 1, r: '¿Me están castigando?', fb: 'Un ajuste de funciones puede ser útil, pero debe conversarse con él.' }
      ]}
    ]
  },
  {
    id: 'inspeccion', titulo: 'Inspección de seguridad en un local comercial',
    asignaturas: ['CIOR-407', 'CIOR-308', 'CIOR-405'],
    persona: { nombre: 'Sr. Ramírez', rol: 'Dueño de una discoteca', avatar: '🧑🏻‍💼', pitch: 0.95 },
    contexto: 'Durante la inspección encuentras extintores vencidos, una salida de emergencia bloqueada con cajas y luces de emergencia que no funcionan.',
    pasos: [
      { dice: 'Bueno, inspector, ya vio que todo está bien, ¿no?', opciones: [
        { t: 'Le explico las tres observaciones encontradas y por qué ponen en riesgo a las personas.', p: 2, r: 'No sabía que era tan grave…', fb: 'La inspección comunica hallazgos objetivos y su riesgo.' },
        { t: 'Sí, todo bien; es un local pequeño.', p: 0, r: '¡Perfecto!', fb: 'Omitir hallazgos pone en riesgo vidas.' },
        { t: 'Le digo que lo voy a clausurar de inmediato sin explicar.', p: 1, r: '¿Por qué? ¡No me dijo nada!', fb: 'La medida debe sustentarse y seguir el procedimiento establecido.' }
      ]},
      { dice: 'Mire, le doy algo para el almuerzo y lo dejamos así…', opciones: [
        { t: 'Rechazo el ofrecimiento con respeto y continúo el procedimiento.', p: 2, r: 'Disculpe…', fb: 'Aceptar dádivas es corrupción y vulnera la ética profesional.' },
        { t: 'Acepto, pero igual le pongo las observaciones.', p: 0, r: '…', fb: 'Aceptar cualquier dádiva es una falta ética y legal.' },
        { t: 'Acepto y no reporto nada.', p: 0, r: '¡Gracias!', fb: 'Es un acto de corrupción.' }
      ]},
      { dice: '¿Y ahora qué tengo que hacer?', opciones: [
        { t: 'Le entrego el informe técnico con las observaciones, las acciones correctivas y un plazo de reinspección, según la normativa local.', p: 2, r: 'Lo voy a corregir esta semana.', fb: 'Un informe claro con plazos permite el seguimiento.' },
        { t: 'Arréglelo cuando pueda.', p: 0, r: 'Ok, algún día.', fb: 'Sin plazos ni seguimiento, el riesgo continúa.' },
        { t: 'Le digo que compre extintores en mi negocio.', p: 0, r: '¿Usted vende extintores?', fb: 'Es un conflicto de intereses.' }
      ]}
    ]
  },
  {
    id: 'coordinacion', titulo: 'Coordinación en un deslizamiento de tierra',
    asignaturas: ['CIOR-101', 'CIOR-405'],
    persona: { nombre: 'Cap. Salazar', rol: 'Policía Nacional', avatar: '👮🏽', pitch: 0.9 },
    contexto: 'Un deslizamiento sepultó parcialmente dos viviendas. Llegan bomberos, Policía, Cruz Roja y el GAD municipal.',
    pasos: [
      { dice: '¿Quién está a cargo aquí? Cada uno está haciendo lo suyo.', opciones: [
        { t: 'Propongo un comando unificado con un representante de cada institución, objetivos comunes y un solo puesto de comando.', p: 2, r: 'De acuerdo, coordinemos.', fb: 'El comando unificado del SCI permite que varias instituciones trabajen con objetivos comunes.' },
        { t: 'Los bomberos mandamos; ustedes obedecen.', p: 0, r: 'Así no vamos a trabajar.', fb: 'La imposición rompe la coordinación interinstitucional.' },
        { t: 'Que cada institución trabaje por separado.', p: 1, r: 'Vamos a chocar en el terreno.', fb: 'Sin coordinación se duplican esfuerzos y aumentan los riesgos.' }
      ]},
      { dice: '¿Qué tarea le asignan a la Policía?', opciones: [
        { t: 'Aislamiento del perímetro, control del tránsito y apoyo a la evacuación.', p: 2, r: 'Perfecto, nos encargamos.', fb: 'Cada institución asume funciones según su competencia.' },
        { t: 'Que excaven para buscar a las víctimas.', p: 0, r: 'No tenemos el equipo ni la formación.', fb: 'El rescate en estructuras colapsadas requiere personal especializado.' },
        { t: 'Ninguna.', p: 0, r: '…', fb: 'Se desaprovechan recursos.' }
      ]},
      { dice: 'Se reporta lluvia fuerte en las próximas horas.', opciones: [
        { t: 'Designo un vigía para monitorear el talud, defino una señal de evacuación y rutas para todo el personal.', p: 2, r: 'Bien pensado.', fb: 'Un nuevo deslizamiento puede afectar a los rescatistas: vigilancia y rutas de evacuación.' },
        { t: 'Seguimos sin cambios.', p: 0, r: '(El riesgo aumenta.)', fb: 'Las condiciones cambiantes exigen ajustar el plan.' },
        { t: 'Suspendemos todo de inmediato y nos vamos.', p: 1, r: '¿Y las víctimas?', fb: 'Se puede continuar con medidas de seguridad; la suspensión se decide si el riesgo es inaceptable.' }
      ]}
    ]
  },
  {
    id: 'informe', titulo: 'El informe posterior al incendio',
    asignaturas: ['CIOR-104', 'CIOR-204', 'CIOR-308'],
    persona: { nombre: 'Mayor Castillo', rol: 'Jefe de la estación', avatar: '👩🏻‍✈️', pitch: 1.0 },
    contexto: 'Debes entregar el informe del incendio estructural de anoche.',
    pasos: [
      { dice: '¿Qué debe contener su informe?', opciones: [
        { t: 'Cronología con horas, recursos utilizados, acciones realizadas, víctimas atendidas, daños observados y personal participante.', p: 2, r: 'Correcto, así podremos analizarlo.', fb: 'Un informe técnico completo sustenta decisiones y procesos legales.' },
        { t: 'Un resumen corto: "se apagó el fuego".', p: 0, r: 'Eso no sirve para nada.', fb: 'Falta información técnica necesaria.' },
        { t: 'Mi opinión sobre quién tuvo la culpa.', p: 0, r: 'Las causas las determina la investigación.', fb: 'El informe se basa en hechos observados.' }
      ]},
      { dice: '¿Y los datos personales de las víctimas?', opciones: [
        { t: 'Se registran solo en el informe oficial, con acceso restringido, según la normativa de protección de datos personales.', p: 2, r: 'Bien.', fb: 'Los datos personales se protegen.' },
        { t: 'Los publico en el grupo de WhatsApp de la estación.', p: 0, r: '¡Eso es grave!', fb: 'Difundir datos personales vulnera derechos.' },
        { t: 'No los registro.', p: 1, r: 'Se necesitan para el seguimiento.', fb: 'Se registran, pero se protegen.' }
      ]},
      { dice: '¿Cómo usamos este informe para mejorar?', opciones: [
        { t: 'Con un análisis posterior a la acción: qué salió bien, qué falló y qué ajustar en los procedimientos.', p: 2, r: 'Excelente.', fb: 'La mejora continua es parte de la gestión de procesos.' },
        { t: 'Lo archivamos.', p: 0, r: '…', fb: 'Se pierde la oportunidad de aprender.' },
        { t: 'Lo usamos para sancionar errores.', p: 1, r: 'Así nadie reportará los errores.', fb: 'El enfoque debe ser de aprendizaje, no solo sancionador.' }
      ]}
    ]
  },
  {
    id: 'comunidad', titulo: 'Capacitación en prevención para una comunidad',
    asignaturas: ['CIOR-409', 'CIOR-101'],
    persona: { nombre: 'Doña Rosa', rol: 'Dirigente comunitaria', avatar: '👩🏽‍🦳', pitch: 1.15 },
    contexto: 'Como parte del programa de vinculación, capacitas a una comunidad rural en prevención de incendios.',
    pasos: [
      { dice: 'Aquí siempre quemamos el monte para sembrar. ¿Qué tiene de malo?', opciones: [
        { t: 'Escucho sus prácticas y explico los riesgos; propongo alternativas como el manejo sin quema o quemas controladas con autorización y cortafuegos.', p: 2, r: 'No sabíamos que había otras formas.', fb: 'El diálogo respetuoso con los saberes locales favorece el cambio.' },
        { t: 'Eso está prohibido y punto.', p: 0, r: '(La comunidad se cierra al diálogo.)', fb: 'Imponer sin escuchar genera rechazo.' },
        { t: 'No tiene nada de malo.', p: 0, r: '…', fb: 'Las quemas sin control son una causa frecuente de incendios forestales.' }
      ]},
      { dice: '¿Qué hacemos si se escapa el fuego?', opciones: [
        { t: 'Llamar de inmediato al ECU 911, alejarse del fuego por zonas sin vegetación y nunca intentar apagarlo cuesta arriba.', p: 2, r: 'Lo vamos a enseñar a todos.', fb: 'Alerta temprana y autoprotección salvan vidas.' },
        { t: 'Apagarlo con ramas entre todos.', p: 0, r: '¿Aunque sea grande?', fb: 'Expone a la población a quemaduras y a quedar atrapada.' },
        { t: 'Esperar a que se apague solo.', p: 0, r: '…', fb: 'La demora permite que el fuego crezca.' }
      ]},
      { dice: '¿Cómo seguimos trabajando juntos?', opciones: [
        { t: 'Formamos una brigada comunitaria, hacemos un simulacro y elaboramos un mapa de riesgos de la comunidad.', p: 2, r: '¡Contamos con ustedes!', fb: 'La organización comunitaria fortalece la prevención.' },
        { t: 'Les dejo folletos y me voy.', p: 1, r: 'Gracias…', fb: 'El material ayuda, pero la participación sostenida es más efectiva.' },
        { t: 'No regresamos.', p: 0, r: '…', fb: 'La vinculación requiere continuidad.' }
      ]}
    ]
  }
];
