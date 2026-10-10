/* =========================================================
   Datos del simulador de la carrera de Gestión de Operaciones
   Turísticas (ISTCY) – Tecnología Superior, Puyo.
   Fuente: Anexo 2 de la carrera (perfil de egreso, resultados de
   aprendizaje y líneas de investigación). Malla curricular y contenidos
   mínimos: documento de la carrera (modalidad híbrida, 4 PAO).
   La operadora, los turistas y los valores monetarios son ficticios
   y referenciales, con fines formativos. Las referencias normativas
   son generales y deben ser validadas por los docentes.
   ========================================================= */

const NIVELES = [
  { id: 'basico', nombre: 'Básico', emoji: '🟢', desc: 'Grupo de 6 turistas y pocos imprevistos.', n: 6, ev: 0.25, precio: 55 },
  { id: 'intermedio', nombre: 'Intermedio', emoji: '🟡', desc: 'Grupo de 8 turistas e imprevistos frecuentes.', n: 8, ev: 0.45, precio: 50 },
  { id: 'avanzado', nombre: 'Avanzado', emoji: '🔴', desc: 'Grupo de 10 turistas, precio ajustado y muchos imprevistos.', n: 10, ev: 0.7, precio: 48 }
];

const MODS = {
  tour: { nombre: 'Tour amazónico', emoji: '🛶' },
  cos: { nombre: 'Costos y operación', emoji: '🧮' },
  pat: { nombre: 'Patrimonio y normativa', emoji: '🏞️' },
  casos: { nombre: 'Casos', emoji: '🤝' }
};

/* Malla curricular (4 PAO, 25 asignaturas, códigos oficiales). mod: módulos del
   simulador donde se practica; rel: relación directa o parcial; sim: qué se simula. */
const MALLA_TUR = [
  { cod: 'GOT-B-101', n: 'Expresión Oral y Escrita', pao: 1, mod: ['tour', 'casos'], rel: 'parcial', sim: 'Bienvenida oral efectiva al grupo y redacción del informe de la operación con lenguaje técnico-turístico.' },
  { cod: 'GOT-B-102', n: 'Geografía Turística del Ecuador', pao: 1, mod: ['tour', 'pat'], rel: 'directa', sim: 'Interpretación del paisaje amazónico, áreas protegidas y destinos del Ecuador.' },
  { cod: 'GOT-B-103', n: 'Culturas del Ecuador', pao: 1, mod: ['tour', 'pat', 'casos'], rel: 'directa', sim: 'Visita respetuosa a la comunidad kichwa, patrimonio y diversidad cultural.' },
  { cod: 'GOT-B-104', n: 'Introducción al Turismo', pao: 1, mod: ['cos', 'pat'], rel: 'directa', sim: 'Tipos de turismo, actores del sistema turístico (agencias, operadoras, alojamientos) e impactos.' },
  { cod: 'GOT-P-105', n: 'Software del Turismo', pao: 1, mod: ['casos', 'cos'], rel: 'parcial', sim: 'Reservas, inventario de cupos y control de ventas de la agencia.' },
  { cod: 'GOT-P-106', n: 'Psicología y Comportamiento del Consumidor Turístico', pao: 1, mod: ['tour', 'casos'], rel: 'directa', sim: 'Motivaciones de los turistas, relación residente-turista y contacto entre culturas.' },
  { cod: 'GOT-P-108', n: 'Protocolo, Etiqueta y Servicio al Cliente', pao: 1, mod: ['tour', 'casos', 'pat'], rel: 'directa', sim: 'Recepción y despedida del grupo, manejo de quejas y atención al cliente.' },
  { cod: 'GOT-B-202', n: 'Gestión Ambiental y Turismo Sostenible', pao: 2, mod: ['tour', 'pat', 'casos'], rel: 'directa', sim: 'Impactos ambientales del tour, buenas prácticas y medidas de mitigación.' },
  { cod: 'GOT-B-203', n: 'Gestión de Operaciones Turísticas', pao: 2, mod: ['tour', 'cos', 'casos'], rel: 'directa', sim: 'Planificación, ejecución y control de la operación del tour de un día.' },
  { cod: 'GOT-P-205', n: 'Planificación Turística', pao: 2, mod: ['casos'], rel: 'parcial', sim: 'Espacio turístico: atractivos, planta turística y diagnóstico del destino.' },
  { cod: 'GOT-P-206', n: 'Marketing Turístico', pao: 2, mod: ['casos', 'tour'], rel: 'parcial', sim: 'Encuesta de satisfacción, segmentación y posicionamiento del producto.' },
  { cod: 'GOT-P-207', n: 'Gestión de Alojamiento', pao: 2, mod: ['cos', 'casos'], rel: 'directa', sim: 'Ocupación hotelera, tarifa promedio y manejo de quejas de huéspedes.' },
  { cod: 'GOT-P-208', n: 'Técnicas de Guianza', pao: 2, mod: ['tour', 'casos', 'pat'], rel: 'directa', sim: 'Guianza e interpretación del patrimonio, gestión de grupos, seguridad en ruta e imprevistos.' },
  { cod: 'GOT-B-304', n: 'Legislación Turística', pao: 3, mod: ['pat', 'casos', 'tour'], rel: 'directa', sim: 'Registro de prestadores, permisos y responsabilidades legales de la operación.' },
  { cod: 'GOT-P-305', n: 'Planificación Estratégica del Turismo', pao: 3, mod: ['casos'], rel: 'parcial', sim: 'Misión, análisis DOFA, estrategias e indicadores de una operadora.' },
  { cod: 'GOT-P-306', n: 'Marketing Digital', pao: 3, mod: ['casos'], rel: 'parcial', sim: 'Promoción digital responsable del producto y uso de imágenes con consentimiento.' },
  { cod: 'GOT-P-307', n: 'Gestión de Alimentos y Bebidas', pao: 3, mod: ['tour'], rel: 'directa', sim: 'Almuerzo típico, alergias alimentarias, inocuidad y costos de A&B.' },
  { cod: 'GOT-P-308', n: 'Contabilidad Aplicada', pao: 3, mod: ['cos'], rel: 'directa', sim: 'Registro de ingresos y costos del tour y estados financieros básicos.' },
  { cod: 'GOT-P-309', n: 'Inglés Aplicado al Turismo I', pao: 3, mod: ['tour'], rel: 'parcial', sim: 'Bienvenida y atención a turistas extranjeros en inglés.' },
  { cod: 'GOT-P-405', n: 'Gestión de Calidad en Turismo', pao: 4, mod: ['tour', 'casos'], rel: 'directa', sim: 'Indicadores de satisfacción, quejas y mejora continua del servicio.' },
  { cod: 'GOT-P-406', n: 'Turismo Rural y Comunitario', pao: 4, mod: ['tour', 'casos', 'pat'], rel: 'directa', sim: 'Pago justo, consentimiento y diseño de productos de turismo comunitario.' },
  { cod: 'GOT-P-407', n: 'Gestión del Transporte Turístico', pao: 4, mod: ['tour'], rel: 'directa', sim: 'Traslado con transporte turístico autorizado y manejo de retrasos.' },
  { cod: 'GOT-P-408', n: 'Gestión Financiera en el Turismo', pao: 4, mod: ['cos', 'tour'], rel: 'directa', sim: 'Precio del paquete, punto de equilibrio y rentabilidad del tour.' },
  { cod: 'GOT-P-409', n: 'Inglés Aplicado al Turismo II', pao: 4, mod: ['tour'], rel: 'parcial', sim: 'Interpretación de sitios, tradiciones y comidas en inglés.' },
  { cod: 'GOT-P-410', n: 'Emprendimientos Turísticos y Plan de Negocios', pao: 4, mod: ['tour', 'cos', 'pat', 'casos'], rel: 'parcial', sim: 'Integra todos los módulos: propuesta de valor, costos y plan de negocios.' }
];

/* ---------------- TOUR: COSTOS REFERENCIALES ---------------- */
const TOUR = {
  nombre: 'Tour de un día por la Amazonía de Pastaza',
  operadora: 'Operadora Sacha Ñambi Tours',  // ficticia
  ruta: 'Puyo – Paseo de los Monos y Parque Omaere – comunidad kichwa – cascada – almuerzo típico',
  inicio: 450, // 07:30
  costosFijos: [{ n: 'Transporte turístico autorizado', v: 100 }, { n: 'Guía local de apoyo', v: 40 }],
  costoPax: [{ n: 'Entradas a los sitios', v: 4 }, { n: 'Almuerzo típico', v: 7 }, { n: 'Pago a la comunidad', v: 6 }, { n: 'Equipo de aventura', v: 3 }]
};

/* ---------------- GRUPO DE TURISTAS VIRTUALES ----------------
   mov: movilidad reducida · alergia: alergia alimentaria · en: prefiere inglés */
const TURISTAS = [
  { id: 'hernan', nombre: 'Don Hernán', avatar: '👴🏽', origen: 'Quito', perfil: 'Movilidad reducida (usa bastón)', mov: true, pitch: 0.85 },
  { id: 'ana', nombre: 'Ana Lucía', avatar: '👩🏻', origen: 'Guayaquil', perfil: 'Alergia al maní y frutos secos', alergia: true, pitch: 1.15 },
  { id: 'emma', nombre: 'Emma', avatar: '👱🏼‍♀️', origen: 'Alemania', perfil: 'Habla inglés, poco español', en: true, pitch: 1.2 },
  { id: 'james', nombre: 'James', avatar: '🧔🏼', origen: 'Estados Unidos', perfil: 'Fotógrafo de naturaleza', en: true, pitch: 0.9 },
  { id: 'camila', nombre: 'Camila', avatar: '👩🏽‍🎓', origen: 'Ambato', perfil: 'Estudiante universitaria', pitch: 1.2 },
  { id: 'diego', nombre: 'Diego', avatar: '🧑🏽‍🦱', origen: 'Riobamba', perfil: 'Busca aventura', pitch: 1.0 },
  { id: 'rosa', nombre: 'Rosa', avatar: '👩🏽', origen: 'Cuenca', perfil: 'Viaja con su hijo', pitch: 1.1 },
  { id: 'mateo', nombre: 'Mateo', avatar: '👦🏽', origen: 'Cuenca', perfil: 'Niño de 10 años', pitch: 1.35 },
  { id: 'pierre', nombre: 'Pierre', avatar: '👨🏻', origen: 'Francia', perfil: 'Interesado en la cultura kichwa', en: true, pitch: 0.95 },
  { id: 'yuki', nombre: 'Yuki', avatar: '👩🏻‍🦰', origen: 'Japón', perfil: 'Habla inglés, primera vez en la selva', en: true, pitch: 1.25 }
];

/* ---------------- FASES DEL TOUR ----------------
   min: minutos planificados de la fase. Opciones: p (0-2), fb, ef {
   dmin (desvío de tiempo), sat, seg, amb, com, costo (USD), costoPax,
   flag (marca lograda), lesion (posible accidente), cond (requiere marca) }. */
const FASES = [
  { id: 'prep', fase: 'Preparación', lugar: 'Oficina de la operadora, Puyo', min: 0, asig: ['GOT-B-203', 'GOT-B-304', 'GOT-P-408'],
    q: 'Es la víspera del tour. ¿Cómo preparas la operación?', o: [
      { t: 'Verifico el registro de la operadora y los permisos de ingreso a los sitios, contrato el seguro de accidentes para todo el grupo, reviso el pronóstico y el nivel del río, el botiquín y la radio, y recojo fichas con condiciones de salud y alimentación.', p: 2, fb: 'Una operación segura empieza antes de salir: prestador registrado, permisos, seguro, plan de contingencia por clima y fichas de cada turista.', ef: { seg: 18, costoPax: 1.5, flag: ['seguro', 'fichas', 'clima', 'permisos'] } },
      { t: 'Reviso el pronóstico y el botiquín; el seguro y las fichas de salud no hacen falta para un tour de un día.', p: 1, fb: 'Revisar el clima ayuda, pero sin seguro ni fichas no conoces las necesidades del grupo ni cubres un accidente.', ef: { seg: 4, flag: ['clima'] } },
      { t: 'No preparo nada especial: siempre hacemos la misma ruta y nunca ha pasado nada.', p: 0, fb: 'La confianza no reemplaza la planificación: el clima amazónico cambia rápido y cada grupo tiene necesidades distintas.', ef: { seg: -15 } }
    ]},
  { id: 'recep', fase: 'Recepción y bienvenida', lugar: 'Parque central de Puyo, 07:30', min: 20, asig: ['GOT-P-208', 'GOT-P-108', 'GOT-P-309', 'GOT-B-101'],
    q: 'El grupo llega al punto de encuentro: turistas nacionales y extranjeros, Don Hernán con bastón y Ana Lucía con alergia alimentaria. ¿Cómo los recibes?', o: [
      { t: 'Me presento, doy la bienvenida en español e inglés, explico el itinerario, los tiempos y las normas de seguridad y de respeto en la comunidad (briefing), y confirmo en privado las necesidades de Don Hernán y Ana Lucía.', p: 2, fb: 'La bienvenida crea confianza; el briefing de seguridad y la interpretación bilingüe garantizan que todos entiendan las normas.', ef: { sat: 12, seg: 10, flag: ['briefing'] } },
      { t: 'Saludo con cordialidad solo en español y salgo rápido; las normas las explico en el camino.', p: 1, fb: 'Ganas tiempo, pero los turistas extranjeros no entienden y nadie recibió el briefing antes de las actividades.', ef: { sat: -2, dmin: -10 } },
      { t: 'Hago subir a todos al bus sin presentarme porque vamos tarde.', p: 0, fb: 'Sin bienvenida ni briefing el grupo no sabe qué esperar ni cómo actuar ante un riesgo.', ef: { sat: -12, seg: -10, dmin: -15 } }
    ]},
  { id: 'tras', fase: 'Traslado', lugar: 'Vía Puyo – Paseo de los Monos', min: 40, asig: ['GOT-P-407', 'GOT-B-203', 'GOT-P-208'],
    q: 'Es hora de trasladar al grupo. ¿Cómo organizas el traslado?', o: [
      { t: 'Uso el transporte turístico autorizado con conductor habilitado, cinturones puestos, cuento a los pasajeros con la lista y hago interpretación del paisaje: el río Pastaza, los cultivos y la historia de Puyo.', p: 2, fb: 'Transporte habilitado, control de pasajeros e interpretación convierten el traslado en parte de la experiencia.', ef: { sat: 8, seg: 8 } },
      { t: 'Uso el transporte autorizado, pero voy revisando el celular y no explico nada durante el viaje.', p: 1, fb: 'El traslado es seguro, pero pierdes la oportunidad de interpretar el territorio y atender al grupo.', ef: { sat: -3 } },
      { t: 'Contrato una camioneta particular sin permiso para ahorrar y algunos van en el balde.', p: 0, fb: 'Transportar turistas en vehículos no habilitados es ilegal y pone en riesgo su vida; ningún seguro cubre esa situación.', ef: { seg: -22, costo: -40, sat: -4 } }
    ]},
  { id: 'nat', fase: 'Guianza en sitio natural', lugar: 'Paseo de los Monos y Parque Etnobotánico Omaere', min: 75, asig: ['GOT-P-208', 'GOT-B-102', 'GOT-B-202', 'GOT-P-409'],
    q: 'Llegan al centro de rescate de fauna y al parque etnobotánico. ¿Cómo guías la visita?', o: [
      { t: 'Hago interpretación ambiental: explico las plantas medicinales y la fauna rescatada, pido mantener distancia de los monos y no alimentarlos, mantengo al grupo en el sendero y adapto el ritmo y la ruta accesible para Don Hernán.', p: 2, fb: 'La interpretación transmite el valor del patrimonio natural; las normas protegen a la fauna y la ruta accesible incluye a todos.', ef: { sat: 10, amb: 12, seg: 4 } },
      { t: 'Recito datos memorizados rápido y dejo que tomen fotos con flash muy cerca de los animales.', p: 1, fb: 'La información sin interpretación aburre, y el flash y la cercanía estresan a la fauna rescatada.', ef: { sat: 2, amb: -6, dmin: -10 } },
      { t: 'Dejo que alimenten y carguen a los monos para la foto; Don Hernán se queda atrás.', p: 0, fb: 'Alimentar o manipular fauna silvestre la enferma y la habitúa a las personas; dejar atrás a un turista es una falta grave de seguridad e inclusión.', ef: { sat: -6, amb: -22, seg: -10 } }
    ]},
  { id: 'com', fase: 'Visita a la comunidad kichwa', lugar: 'Comunidad kichwa de la ribera (anfitriona)', min: 80, asig: ['GOT-P-406', 'GOT-B-103', 'GOT-P-106'],
    q: 'Llegan a la comunidad kichwa que ofrece turismo comunitario. ¿Cómo manejas la visita?', o: [
      { t: 'Coordino con el líder comunitario, respetamos su protocolo de bienvenida, recuerdo las normas, pedimos consentimiento antes de fotografiar y entrego el pago acordado de forma justa, transparente y directa a la comunidad.', p: 2, fb: 'El turismo comunitario se basa en el respeto, el consentimiento y una distribución justa de los beneficios.', ef: { com: 22, sat: 10, costoPax: 1 } },
      { t: 'La visita es respetuosa, pero regateo para pagar menos de lo acordado.', p: 1, fb: 'Regatear el pago acordado debilita la confianza y el beneficio local, aunque la visita sea respetuosa.', ef: { com: -10, costoPax: -2 } },
      { t: 'Llego sin avisar, pido que se pongan trajes "para la foto" y solo dejo una propina.', p: 0, fb: 'Folclorizar la cultura y no pagar lo justo es explotación: rompe el principio del turismo comunitario.', ef: { com: -25, sat: -5, costoPax: -6 } }
    ]},
  { id: 'alm', fase: 'Almuerzo típico', lugar: 'Comedor comunitario', min: 60, asig: ['GOT-P-307', 'GOT-P-108', 'GOT-P-208'],
    q: 'Llega el almuerzo típico: maito de tilapia, yuca, verde y chicha. Ana Lucía tiene alergia al maní y frutos secos. ¿Qué haces?', o: [
      { t: 'Confirmo con la cocina los ingredientes, pido el plato de Ana Lucía sin el alérgeno y evitando la contaminación cruzada, ofrezco agua segura y explico el origen de los productos locales.', p: 2, fb: 'Gestionar alergias es parte de la seguridad alimentaria; la interpretación gastronómica valora la cocina amazónica.', ef: { sat: 10, seg: 8, cond: 'fichas' } },
      { t: 'Le digo a Ana Lucía que retire lo que no pueda comer.', p: 1, fb: 'Retirar el ingrediente no evita la contaminación cruzada; la responsabilidad es del operador.', ef: { sat: -3, seg: -6 } },
      { t: 'Sirvo el mismo menú a todos; un poquito no hace daño.', p: 0, fb: 'Una reacción alérgica puede ser grave. Nunca se minimiza una alergia alimentaria.', ef: { sat: -8, seg: -20, lesion: 'alergia' } }
    ]},
  { id: 'avent', fase: 'Actividad de aventura', lugar: 'Sendero a la cascada y tramo de tubing en el río', min: 90, asig: ['GOT-B-203', 'GOT-P-208'],
    q: 'Toca la caminata a la cascada y un tramo corto de tubing. ¿Cómo la conduces?', o: [
      { t: 'Reviso el nivel del río, entrego chalecos salvavidas y cascos, sumo un guía de rescate, repito las instrucciones de seguridad y ofrezco a Don Hernán una alternativa segura desde el mirador.', p: 2, fb: 'Equipo de protección, personal capacitado, verificación de condiciones e inclusión: así se opera la aventura con seguridad.', ef: { sat: 10, seg: 14, costo: 25, cond: 'seguro' } },
      { t: 'Entrego chalecos a todos, pero no reviso el río ni llevo apoyo de rescate.', p: 1, fb: 'El chaleco es necesario, pero no suficiente: hay que verificar el caudal y contar con apoyo de rescate.', ef: { seg: -6 } },
      { t: 'Vamos sin equipo: todos dicen que saben nadar.', p: 0, fb: 'Ninguna actividad acuática se realiza sin equipo de protección; saber nadar no protege de una corriente fuerte.', ef: { seg: -25, lesion: 'aventura' } }
    ]},
  { id: 'cierre', fase: 'Cierre y encuesta', lugar: 'Retorno a Puyo', min: 50, asig: ['GOT-P-108', 'GOT-P-405', 'GOT-P-206'],
    q: 'El tour termina. ¿Cómo cierras la operación?', o: [
      { t: 'Regreso al grupo a Puyo, resumo la experiencia, aplico la encuesta de satisfacción, agradezco, dispongo los residuos en el lugar adecuado y reporto novedades a la operadora.', p: 2, fb: 'El cierre y la encuesta permiten mejorar el producto; el reporte deja trazabilidad de la operación.', ef: { sat: 8, flag: ['encuesta'] } },
      { t: 'Me despido cordialmente sin aplicar la encuesta.', p: 1, fb: 'Una despedida amable ayuda, pero sin encuesta no hay información para mejorar.', ef: { sat: 2 } },
      { t: 'Pido propinas con insistencia y los dejo en cualquier esquina.', p: 0, fb: 'Presionar por propinas y no cumplir el punto de retorno daña la imagen del destino.', ef: { sat: -15 } }
    ]}
];

/* ---------------- IMPREVISTOS ----------------
   desde/hasta: fases (índice ya completado) en que pueden ocurrir. */
const EVENTOS = [
  { id: 'lluvia', desde: 2, hasta: 6, txt: 'Empieza un aguacero fuerte y el río sube de nivel con rapidez.', voz: '¡Guía, está lloviendo durísimo y el río está creciendo!', quien: 'james', o: [
    { t: 'Suspender el cruce y el tubing, activar el plan B (ruta alterna y cascada desde el mirador), informar al grupo con calma y avisar a la operadora el cambio de itinerario.', p: 2, fb: 'Ante una crecida, la seguridad prima sobre el itinerario: plan de contingencia, comunicación clara y reporte.', ef: { seg: 12, sat: -2, min: 20, lluvia: true } },
    { t: 'Esperar bajo un árbol a ver si para, sin explicar nada al grupo.', p: 1, fb: 'Esperar puede ser prudente, pero sin informar al grupo crece la ansiedad; y un árbol aislado no es refugio seguro ante tormenta.', ef: { sat: -6, min: 35, lluvia: true } },
    { t: 'Cruzar el río de todas formas para no perder tiempo.', p: 0, fb: 'Cruzar un río crecido es una de las principales causas de accidentes graves en la Amazonía.', ef: { seg: -25, min: 5, lluvia: true, lesion: 'crecida' } }
  ]},
  { id: 'lesion', desde: 3, hasta: 7, txt: 'Diego resbala en el sendero húmedo y se tuerce el tobillo; no puede apoyar bien el pie.', voz: '¡Ay, mi tobillo! No puedo pisar.', quien: 'diego', o: [
    { t: 'Detener al grupo en un lugar seguro, evaluar la lesión, inmovilizar y aplicar frío, comunicar a la base, activar el seguro y organizar la evacuación mientras el guía de apoyo cuida al resto.', p: 2, fb: 'Primeros auxilios básicos: escena segura, evaluación, inmovilización, frío y traslado; si hay signos de gravedad se llama al ECU 911.', ef: { seg: 8, sat: 2, min: 30, herido: true, costo: 30 } },
    { t: 'Ayudarlo a caminar apoyado en ti y seguir con el recorrido sin evaluar.', p: 1, fb: 'Acompañarlo es solidario, pero sin evaluar ni inmovilizar la lesión puede agravarse.', ef: { seg: -6, min: 15, herido: true } },
    { t: 'Decirle que se aguante y que siga caminando solo.', p: 0, fb: 'Abandonar la atención de un lesionado es negligencia; además, retrasa al grupo y agrava la lesión.', ef: { seg: -18, sat: -12, min: 10, herido: true } }
  ]},
  { id: 'bus', desde: 0, hasta: 3, txt: 'El transporte llama: se retrasará 40 minutos por un derrumbe en la vía.', voz: 'Guía, hubo un derrumbe; llegamos en unos cuarenta minutos.', quien: null, o: [
    { t: 'Informar al grupo con transparencia, reorganizar el orden de las visitas, avisar a la comunidad y a la operadora, y ofrecer una actividad corta mientras tanto.', p: 2, fb: 'Comunicar y reorganizar reduce el impacto del retraso en la experiencia y en los socios locales.', ef: { sat: 2, min: 25 } },
    { t: 'Contratar de inmediato un taxi informal para parte del grupo.', p: 1, fb: 'Resuelve el tiempo, pero el transporte no habilitado no garantiza la seguridad ni la cobertura del seguro.', ef: { seg: -10, costo: 30, min: 10 } },
    { t: 'Esperar sin decir nada y culpar al conductor delante del grupo.', p: 0, fb: 'La falta de información y culpar a otros frente al cliente dañan la imagen de la operadora.', ef: { sat: -12, min: 40 } }
  ]},
  { id: 'irrespeto', desde: 5, hasta: 7, txt: 'James entra sin permiso a la casa ceremonial y fotografía a unos niños sin pedir consentimiento.', voz: 'Look at this! Amazing pictures!', quien: 'james', o: [
    { t: 'Pedirle con respeto, en inglés, que salga y borre las fotos, disculparme con la familia y recordar al grupo las normas acordadas con la comunidad.', p: 2, fb: 'El consentimiento y el respeto a los espacios sagrados son innegociables en el turismo comunitario.', ef: { com: 10, sat: -2, min: 10 } },
    { t: 'Decirle a la comunidad que es extranjero y no entiende, y seguir la visita.', p: 1, fb: 'Evita el conflicto inmediato, pero no repara la falta ni protege los derechos de los niños.', ef: { com: -10, min: 2 } },
    { t: 'Reírme y pedirle que me pase las fotos para las redes de la operadora.', p: 0, fb: 'Usar imágenes de menores sin consentimiento vulnera sus derechos y destruye la relación con la comunidad.', ef: { com: -25, min: 2 } }
  ]},
  { id: 'precio', desde: 3, hasta: 8, txt: 'Rosa reclama: dice que en internet vio el mismo tour mucho más barato.', voz: '¡Me cobraron de más! En internet está mucho más barato.', quien: 'rosa', o: [
    { t: 'Escucharla con calma, explicarle qué incluye el precio (guía acreditado, transporte autorizado, seguro, entradas y pago justo a la comunidad) y registrar su comentario para la operadora.', p: 2, fb: 'Manejo de quejas: escucha activa y explicación del valor del servicio; registrar el reclamo permite mejorar.', ef: { sat: 6, min: 5 } },
    { t: 'Ofrecerle un descuento de tu bolsillo para que no se queje.', p: 1, fb: 'Calma el momento, pero no explica el valor del producto y afecta tus ingresos.', ef: { sat: 3, costo: 15, min: 3 } },
    { t: 'Discutir con ella delante del grupo.', p: 0, fb: 'Discutir con un cliente en público escala el conflicto y afecta a todo el grupo.', ef: { sat: -15, min: 5 } }
  ]},
  { id: 'basura', desde: 3, hasta: 7, txt: 'Varios turistas dejan botellas plásticas y envolturas junto a la cascada.', voz: 'Ya no hay basureros aquí, déjalo nomás.', quien: 'camila', o: [
    { t: 'Recordar con amabilidad el principio de «no dejar rastro», recoger los residuos con el grupo y llevarlos de vuelta para su disposición adecuada.', p: 2, fb: 'Las buenas prácticas ambientales reducen el impacto del turismo en ecosistemas frágiles.', ef: { amb: 12, min: 5 } },
    { t: 'Recogerlos tú en silencio sin decir nada al grupo.', p: 1, fb: 'Evitas el impacto, pero pierdes la oportunidad de educar al visitante.', ef: { amb: 6, min: 5 } },
    { t: 'Dejarlos; la lluvia se los llevará.', p: 0, fb: 'Los residuos terminan en el río y afectan la fauna y a las comunidades río abajo.', ef: { amb: -20 } }
  ]}
];

/* ---------------- BANCOS DE PREGUNTAS ---------------- */
function rndI(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function mezclar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function mc(q, ok, malas, exp, asig) { const o = mezclar([ok, ...malas]); return { q, o, c: o.indexOf(ok), exp, asig }; }
const coma = n => String(n).replace('.', ',');
const usd = n => '$' + Math.round(n).toLocaleString('es-EC');
const usd2 = n => '$' + coma((Math.round(n * 100) / 100).toFixed(2));
const r2 = n => Math.round(n * 100) / 100;

/* 1) Costos y operación turística: los últimos 6 son cálculos con datos aleatorios */
const COS_BANCO = [
  () => mc('Un costo fijo de un tour es aquel que…', 'No cambia con el número de pasajeros (por ejemplo, el transporte contratado)', ['Aumenta con cada pasajero (por ejemplo, el almuerzo)', 'Solo se paga si llueve', 'Lo paga siempre el turista aparte'], 'El transporte o el guía cuestan lo mismo con 6 o con 10 pasajeros; las entradas y los almuerzos son variables.', 'GOT-P-408'),
  () => mc('¿Cuál de estos es un costo variable de un paquete turístico?', 'La entrada a un sitio que se paga por persona', ['El alquiler del bus por el día', 'El sueldo mensual del administrador', 'El arriendo de la oficina'], 'Los costos variables dependen de la cantidad de pasajeros.', 'GOT-B-203'),
  () => mc('El punto de equilibrio de un tour indica…', 'El número mínimo de pasajeros para que los ingresos cubran todos los costos', ['El número máximo de pasajeros del bus', 'El precio de la competencia', 'La utilidad máxima posible'], 'Por debajo del punto de equilibrio la operación pierde dinero.', 'GOT-P-408'),
  () => mc('Una agencia de viajes que vende al público paquetes armados por otras empresas actúa principalmente como…', 'Intermediaria (agencia de viajes minorista)', ['Operadora de turismo receptivo', 'Establecimiento de alojamiento', 'Ente rector del turismo'], 'La operadora diseña y ejecuta el servicio; la agencia minorista lo comercializa al cliente final.', 'GOT-B-104'),
  () => mc('Un itinerario turístico bien elaborado debe incluir…', 'Horarios, sitios, actividades, servicios incluidos, tiempos de traslado y recomendaciones', ['Solo el precio', 'Únicamente el nombre del guía', 'Fotos sin información'], 'El itinerario es el contrato operativo con el turista: dice qué, cuándo y cómo.', 'GOT-B-203'),
  () => mc('La ocupación hotelera se calcula como…', 'Habitaciones ocupadas ÷ habitaciones disponibles × 100', ['Huéspedes ÷ empleados × 100', 'Ingresos ÷ gastos', 'Habitaciones disponibles − ocupadas'], 'Es el principal indicador de desempeño de un alojamiento.', 'GOT-P-207'),
  () => mc('La tarifa promedio por habitación vendida (ADR) se obtiene dividiendo…', 'Los ingresos por habitaciones entre el número de habitaciones vendidas', ['El número de huéspedes entre las camas', 'Los gastos entre los ingresos', 'Las habitaciones libres entre las ocupadas'], 'El ADR muestra cuánto se cobra en promedio por cada habitación vendida.', 'GOT-P-207'),
  () => mc('El "overbooking" o sobreventa en turismo consiste en…', 'Vender más cupos de los que realmente se pueden atender', ['Reservar con mucha anticipación', 'Ofrecer descuentos a grupos', 'Vender seguros de viaje'], 'La sobreventa genera turistas sin servicio, reclamos y riesgos de seguridad.', 'GOT-P-105'),
  () => mc('En Ecuador, la moneda oficial con la que se cobran los servicios turísticos es…', 'El dólar estadounidense (USD)', ['El euro', 'El sucre', 'El sol peruano'], 'Desde el año 2000 Ecuador usa el dólar; a los turistas extranjeros se les convierte desde su moneda.', 'GOT-P-408'),
  () => mc('¿Qué es un paquete turístico?', 'La combinación de al menos dos servicios (transporte, alojamiento, guianza, alimentación) vendidos por un precio global', ['Un solo boleto de bus', 'Un folleto informativo', 'La maleta del turista'], 'El paquete integra servicios y se vende con un precio único.', 'GOT-B-203'),
  // ---- cálculos (datos aleatorios) ----
  () => { const cf = rndI(12, 24) * 10, n = rndI(6, 12), cv = rndI(14, 26), m = [20, 25, 30][rndI(0, 2)]; const costo = cf / n + cv, p = r2(costo * (1 + m / 100)); return { q: `Un tour tiene costos fijos de ${usd(cf)} (transporte y guía) y costos variables de ${usd(cv)} por persona. Para un grupo de ${n} pasajeros y un margen del ${m} % sobre el costo, ¿cuál es el precio por persona en USD? (dos decimales)`, num: p, tol: 0.06, exp: `Costo por persona = ${usd(cf)} ÷ ${n} + ${usd(cv)} = ${usd2(costo)}. Precio = ${usd2(costo)} × ${coma(1 + m / 100)} = ${usd2(p)}.`, asig: 'GOT-P-408' }; },
  () => { const cf = rndI(15, 30) * 10, cv = rndI(15, 25), p = cv + rndI(15, 30); const pe = Math.ceil(cf / (p - cv)); return { q: `Los costos fijos de un tour son ${usd(cf)}, el costo variable es ${usd(cv)} por pasajero y el precio de venta es ${usd(p)}. ¿Cuántos pasajeros se necesitan como mínimo para no perder dinero (punto de equilibrio)?`, num: pe, tol: 0, exp: `Punto de equilibrio = costos fijos ÷ (precio − costo variable) = ${usd(cf)} ÷ (${usd(p)} − ${usd(cv)}) = ${coma(r2(cf / (p - cv)))} → se redondea hacia arriba: ${pe} pasajeros.`, asig: 'GOT-P-408' }; },
  () => { const eur = rndI(4, 30) * 10, t = [1.05, 1.08, 1.1, 1.12][rndI(0, 3)]; const v = r2(eur * t); return { q: `Una turista alemana trae ${eur} euros. Si el tipo de cambio de referencia es 1 EUR = ${coma(t)} USD, ¿cuántos dólares recibe? (dos decimales)`, num: v, tol: 0.06, exp: `${eur} × ${coma(t)} = ${usd2(v)}. (Tipo de cambio ficticio con fines de práctica.)`, asig: 'GOT-P-408' }; },
  () => { const hab = rndI(12, 40), noches = [7, 15, 30][rndI(0, 2)], disp = hab * noches, oc = Math.round(disp * rndI(35, 90) / 100); const r = r2(oc / disp * 100); return { q: `Una hostería de Puyo tiene ${hab} habitaciones. En ${noches} noches vendió ${oc} habitaciones-noche. ¿Cuál fue su porcentaje de ocupación? (dos decimales)`, num: r, tol: 0.06, exp: `Disponibles = ${hab} × ${noches} = ${disp}. Ocupación = ${oc} ÷ ${disp} × 100 = ${coma(r)} %.`, asig: 'GOT-P-207' }; },
  () => { const n = rndI(6, 14), p = rndI(40, 70), cf = rndI(10, 20) * 10, cv = rndI(15, 25); const u = n * p - (cf + n * cv); return { q: `Un tour vendió ${n} cupos a ${usd(p)} cada uno. Los costos fijos fueron ${usd(cf)} y los variables ${usd(cv)} por pasajero. ¿Cuál fue la utilidad (o pérdida, con signo negativo) en USD?`, num: u, tol: 1, exp: `Ingresos = ${n} × ${usd(p)} = ${usd(n * p)}. Costos = ${usd(cf)} + ${n} × ${usd(cv)} = ${usd(cf + n * cv)}. Utilidad = ${u < 0 ? '−' + usd(-u) : usd(u)}.`, asig: 'GOT-P-408' }; },
  () => { const v = rndI(15, 60), adr = rndI(25, 60); const ing = v * adr; return { q: `Un hotel obtuvo ${usd(ing)} por la venta de ${v} habitaciones en una noche de feriado. ¿Cuál fue la tarifa promedio por habitación vendida (ADR) en USD?`, num: adr, tol: 0.5, exp: `ADR = ingresos ÷ habitaciones vendidas = ${usd(ing)} ÷ ${v} = ${usd(adr)}.`, asig: 'GOT-P-207' }; }
];

/* 2) Patrimonio, sostenibilidad y normativa */
const PAT_BANCO = [
  () => mc('¿Cuál de estos es un ejemplo de patrimonio natural de la Amazonía ecuatoriana?', 'El Parque Nacional Yasuní', ['La lengua kichwa', 'La fiesta de fundación de Puyo', 'Una receta de maito'], 'El patrimonio natural comprende áreas y ecosistemas de valor excepcional; la lengua y las fiestas son patrimonio cultural inmaterial.', 'GOT-B-102'),
  () => mc('Los saberes medicinales, la lengua y la música de un pueblo son patrimonio…', 'Cultural inmaterial', ['Natural', 'Cultural mueble', 'Arqueológico'], 'El patrimonio inmaterial está en los conocimientos, prácticas y expresiones vivas de los pueblos.', 'GOT-B-103'),
  () => mc('El turismo comunitario se caracteriza porque…', 'La comunidad organizada gestiona la actividad y recibe de forma directa y equitativa sus beneficios', ['Una empresa externa decide todo y la comunidad solo observa', 'Se basa en grandes hoteles de cadena', 'No permite visitantes extranjeros'], 'La participación y el beneficio comunitario son su esencia, junto con el respeto cultural y ambiental.', 'GOT-P-406'),
  () => mc('La capacidad de carga turística de un sendero se refiere a…', 'El número máximo de visitantes que puede recibir sin deteriorar el recurso ni la experiencia', ['El peso que soporta un puente', 'La cantidad de equipaje permitido', 'El número de buses de la operadora'], 'Respetarla evita la erosión, el estrés de la fauna y la saturación del sitio.', 'GOT-B-202'),
  () => mc('¿Cuál es una buena práctica ambiental durante un recorrido por la selva?', 'No dejar rastro: llevar de vuelta los residuos y mantenerse en el sendero', ['Alimentar a los animales para que se acerquen', 'Llevarse plantas como recuerdo', 'Usar parlantes con música alta'], 'Los principios de «no dejar rastro» reducen el impacto del visitante.', 'GOT-B-202'),
  () => mc('¿Qué institución es el ente rector de la actividad turística en Ecuador?', 'El Ministerio de Turismo', ['El Ministerio de Educación', 'El Servicio de Rentas Internas', 'La Agencia de Regulación y Control de las Telecomunicaciones'], 'El Ministerio de Turismo regula, planifica y promociona la actividad turística nacional.', 'GOT-B-304'),
  () => mc('En términos generales, para operar legalmente, un prestador de servicios turísticos (agencia, operadora, alojamiento) debe…', 'Estar registrado ante la autoridad de turismo y contar con la licencia de funcionamiento local vigente', ['Solo tener una página en redes sociales', 'Pagar una cuota a la competencia', 'Ser recomendado por un turista'], 'El registro y la licencia permiten el control de calidad y seguridad de los servicios.', 'GOT-B-304'),
  () => mc('Un turista quiere comprar un collar hecho con plumas de guacamayo. ¿Qué le recomiendas?', 'No comprarlo: comerciar con partes de fauna silvestre protegida es ilegal y fomenta su caza', ['Comprarlo y esconderlo en la maleta', 'Regatear el precio', 'Comprar dos para regalar'], 'El tráfico de vida silvestre es un delito; se promueven artesanías elaboradas con materiales legales y sostenibles.', 'GOT-B-102'),
  () => mc('Ante un esguince de tobillo en el sendero, los primeros auxilios básicos incluyen…', 'Reposo, frío local, inmovilización y elevación del miembro, y traslado para valoración', ['Masajear fuerte y seguir caminando', 'Aplicar calor intenso inmediatamente', 'Ignorarlo hasta el final del tour'], 'Inmovilizar y aplicar frío reduce la inflamación y evita agravar la lesión.', 'GOT-P-208'),
  () => mc('Si un turista sufre la mordedura de una serpiente, lo correcto es…', 'Mantenerlo en calma y en reposo, inmovilizar la extremidad y trasladarlo de inmediato a un centro de salud, alertando al ECU 911', ['Succionar el veneno con la boca', 'Hacer un torniquete muy apretado', 'Cortar la herida con un cuchillo'], 'Succionar, cortar o hacer torniquetes empeora el daño; lo prioritario es el traslado rápido.', 'GOT-P-208'),
  () => mc('Un turista presenta escalofríos y temblor tras mojarse con la lluvia durante horas. ¿Qué haces primero?', 'Llevarlo a un lugar protegido, retirarle la ropa mojada, abrigarlo y darle bebidas tibias', ['Darle bebidas alcohólicas para calentarlo', 'Hacerlo nadar para que entre en calor', 'Dejarlo dormir a la intemperie'], 'Son medidas iniciales ante el enfriamiento (hipotermia leve).', 'GOT-P-208'),
  () => mc('Ante la queja de un cliente, el primer paso recomendado es…', 'Escuchar con atención y sin interrumpir para comprender el problema', ['Justificarse de inmediato', 'Culpar a otro proveedor', 'Ignorar el reclamo'], 'La escucha activa es la base del manejo de quejas: luego se ofrece solución y seguimiento.', 'GOT-P-108'),
  () => mc('¿Por qué se pide consentimiento antes de fotografiar a miembros de una comunidad?', 'Porque es un derecho a la propia imagen y una muestra de respeto intercultural', ['Porque las fotos salen mejor', 'Porque lo exige la cámara', 'No es necesario pedirlo'], 'Fotografiar sin permiso, sobre todo a niños o espacios sagrados, vulnera derechos y la confianza.', 'GOT-P-406'),
  () => mc('La interpretación ambiental que realiza un guía busca…', 'Revelar significados y generar conexión emocional del visitante con el patrimonio', ['Recitar datos técnicos sin pausa', 'Que el grupo camine rápido', 'Vender productos durante el recorrido'], 'Interpretar es comunicar de forma amena y relevante para que el visitante valore y proteja el recurso.', 'GOT-P-208'),
  () => mc('Un impacto ambiental negativo frecuente del turismo en senderos amazónicos es…', 'La erosión del suelo y la perturbación de la fauna por exceso de visitantes', ['El aumento de la biodiversidad', 'La reforestación automática', 'La purificación del agua'], 'Identificar impactos permite proponer medidas de prevención y mitigación.', 'GOT-B-202'),
  () => mc('Para atender a un turista con movilidad reducida, el operador debe…', 'Prever rutas y servicios accesibles, adaptar el ritmo y ofrecer alternativas seguras sin excluirlo', ['Recomendarle no viajar', 'Cobrarle un recargo', 'Dejarlo esperando en el bus todo el día'], 'El turismo accesible e inclusivo es un derecho y una oportunidad de mercado.', 'GOT-P-108')
];

/* ---------------- CASOS PROFESIONALES ---------------- */
const CASOS_TUR = [
  {
    id: 'artesanias', titulo: 'Artesanías con plumas de especies protegidas',
    asignaturas: ['GOT-B-202', 'GOT-B-304', 'GOT-P-208'],
    persona: { nombre: 'Mr. Steven', rol: 'Turista estadounidense', avatar: '🧑🏼‍🦳', pitch: 0.9 },
    contexto: 'En una feria de Puyo, un turista de tu grupo quiere comprar un tocado con plumas de guacamayo y un collar con colmillos de felino.',
    pasos: [
      { dice: 'Look, these feathers are beautiful! Voy a comprar este tocado y el collar de colmillos.', opciones: [
        { t: 'Le explico con amabilidad que son partes de fauna silvestre protegida, que su comercio es ilegal y fomenta la caza, y que no debe comprarlos.', p: 2, r: 'Oh, I did not know that. Thank you.', fb: 'El tráfico de vida silvestre es un delito y una amenaza para la biodiversidad amazónica.' },
        { t: 'Le digo que mejor no, sin explicarle por qué.', p: 1, r: 'Why not? They are so nice…', fb: 'Sin explicación, el turista puede comprarlo cuando no lo veas.' },
        { t: 'Le ayudo a regatear el precio.', p: 0, r: 'Great, cheaper!', fb: 'Facilitar la compra te hace partícipe de una actividad ilegal.' }
      ]},
      { dice: 'But I want a souvenir from the Amazon. ¿Qué puedo llevar?', opciones: [
        { t: 'Le recomiendo artesanías legales de la comunidad: tejidos de fibra, cerámica, semillas no protegidas o tallados en madera certificada, compradas directamente a los artesanos.', p: 2, r: 'That sounds perfect.', fb: 'Promover artesanía sostenible genera ingresos locales sin dañar la fauna.' },
        { t: 'Le digo que compre una camiseta en la tienda del hotel.', p: 1, r: 'Hmm, ok.', fb: 'Es legal, pero no apoya a los artesanos locales ni valora la cultura.' },
        { t: 'Le sugiero que compre las plumas a escondidas en otro puesto.', p: 0, r: 'Ok, I will do that.', fb: 'Promover el tráfico es una falta grave y un delito.' }
      ]},
      { dice: '(El vendedor de la feria se molesta porque espantaste la venta.)', opciones: [
        { t: 'Le hablo con respeto, le explico el riesgo legal y ambiental, e informo a la operadora para orientar o reportar por los canales correspondientes.', p: 2, r: '(El vendedor guarda las piezas.)', fb: 'Se actúa con respeto y se canaliza la situación a las autoridades ambientales cuando corresponde.' },
        { t: 'Me alejo sin decir nada.', p: 1, r: '…', fb: 'Evitas el conflicto, pero no contribuyes a frenar el comercio ilegal.' },
        { t: 'Le grito y le tomo fotos para subirlas a redes.', p: 0, r: '(Se genera una discusión.)', fb: 'La confrontación y la exposición pública no son el canal adecuado.' }
      ]}
    ]
  },
  {
    id: 'sobreventa', titulo: 'La agencia pide sobrevender cupos',
    asignaturas: ['GOT-P-105', 'GOT-B-203', 'GOT-P-108'],
    persona: { nombre: 'Sr. Fabián', rol: 'Gerente de la agencia de viajes', avatar: '👨🏻‍💼', pitch: 0.95 },
    contexto: 'El tour del sábado tiene 12 cupos (capacidad del transporte y de la comunidad). El gerente quiere vender 18 porque es feriado.',
    pasos: [
      { dice: 'Vende 18 cupos; siempre alguien no llega. ¡Es feriado, hay que aprovechar!', opciones: [
        { t: 'Le explico que la capacidad es de 12 por transporte, seguridad y capacidad de carga de la comunidad, y que sobrevender nos expone a reclamos y riesgos.', p: 2, r: 'Mmm… no lo había visto así.', fb: 'La sobreventa genera turistas sin servicio, incumplimiento y riesgos de seguridad.' },
        { t: 'Vendo 14 para no contradecirlo tanto.', p: 1, r: 'Bueno, algo es algo.', fb: 'Sigue superando la capacidad real: el riesgo persiste.' },
        { t: 'Vendo 18 y que se acomoden como puedan.', p: 0, r: '¡Así me gusta!', fb: 'Incumplir la capacidad pone en riesgo a los turistas y la reputación de la agencia.' }
      ]},
      { dice: 'Entonces, ¿cómo aprovechamos la demanda?', opciones: [
        { t: 'Propongo abrir una segunda salida con otro guía y transporte autorizado, o una lista de espera con confirmación.', p: 2, r: '¡Buena idea, más ventas sin problemas!', fb: 'Gestionar la demanda con más oferta planificada mantiene la calidad.' },
        { t: 'Subir el precio sin cambiar nada más.', p: 1, r: 'Podría ser…', fb: 'Puede ser válido, pero no atiende a quienes se quedan sin cupo.' },
        { t: 'Meter a los extras en una camioneta particular.', p: 0, r: 'Ahorramos…', fb: 'El transporte no habilitado es ilegal e inseguro.' }
      ]},
      { dice: '(Ya se vendieron 13 cupos por error en la web.)', opciones: [
        { t: 'Contacto de inmediato al último cliente, le explico con transparencia y le ofrezco otra fecha o el reembolso completo, y corrijo el sistema de reservas.', p: 2, r: '(El cliente acepta cambiar de fecha.)', fb: 'Transparencia y alternativas protegen la confianza del cliente.' },
        { t: 'Esperar el sábado y ver si alguien falta.', p: 1, r: '…', fb: 'Postergar el problema puede dejar a un turista sin servicio.' },
        { t: 'No decir nada y dejarlo en el punto de encuentro.', p: 0, r: '(El turista publica una queja.)', fb: 'Incumplir lo vendido sin aviso es una falta grave al cliente.' }
      ]}
    ]
  },
  {
    id: 'pago-justo', titulo: 'El líder comunitario reclama un pago injusto',
    asignaturas: ['GOT-P-406', 'GOT-P-408', 'GOT-P-108'],
    persona: { nombre: 'Don Segundo', rol: 'Líder de la comunidad kichwa anfitriona', avatar: '👨🏽‍🦳', pitch: 0.85 },
    contexto: 'Don Segundo te dice que la operadora paga a la comunidad mucho menos de lo acordado por cada visitante y que los pagos llegan tarde.',
    pasos: [
      { dice: 'Compañero guía, nos están pagando la mitad de lo que acordamos y con meses de retraso. Así no podemos seguir.', opciones: [
        { t: 'Lo escucho con respeto, le agradezco la confianza y le pido revisar juntos el acuerdo firmado y los registros de visitantes.', p: 2, r: 'Gracias por escucharnos.', fb: 'La escucha y la revisión de evidencias son el primer paso para resolver un conflicto comunitario.' },
        { t: 'Le digo que eso no es mi problema, que hable con la oficina.', p: 0, r: 'Siempre lo mismo…', fb: 'El guía es el vínculo directo con la comunidad; desentenderse daña la relación.' },
        { t: 'Le prometo que se arreglará sin saber si es posible.', p: 1, r: 'Ojalá sea cierto.', fb: 'Prometer sin sustento genera nuevas frustraciones.' }
      ]},
      { dice: 'Cada grupo viene a nuestra casa, comemos menos para atenderlos y casi no queda nada.', opciones: [
        { t: 'Calculamos juntos el costo real por visitante (alimentos, guianza local, mantenimiento) y preparo un informe para la operadora con una propuesta de tarifa justa y pagos puntuales.', p: 2, r: 'Eso es lo que necesitamos.', fb: 'El costeo transparente sustenta una tarifa justa y un beneficio equitativo.' },
        { t: 'Le sugiero que cobre propinas a los turistas.', p: 1, r: 'No es lo mismo…', fb: 'Las propinas no sustituyen un pago acordado y estable.' },
        { t: 'Le digo que si se quejan, la operadora buscará otra comunidad.', p: 0, r: '(Se rompe la confianza.)', fb: 'Amenazar a la comunidad es una práctica abusiva contraria al turismo sostenible.' }
      ]},
      { dice: '(Reunión con la operadora y la comunidad.)', opciones: [
        { t: 'Propongo un acuerdo escrito con tarifa por visitante, plazos de pago, capacidad máxima y normas de visita, con revisión periódica.', p: 2, r: '(Firman un nuevo acuerdo.)', fb: 'Un acuerdo formal y revisable protege a ambas partes.' },
        { t: 'Que lo acuerden de palabra, como siempre.', p: 1, r: '…', fb: 'Los acuerdos verbales son los que originaron el conflicto.' },
        { t: 'No asisto; prefiero no meterme.', p: 0, r: '…', fb: 'Tu rol de enlace es clave para la sostenibilidad del producto.' }
      ]}
    ]
  },
  {
    id: 'perdido', titulo: 'Un turista se pierde en el sendero',
    asignaturas: ['GOT-P-208', 'GOT-B-203', 'GOT-P-405'],
    persona: { nombre: 'Rosa', rol: 'Turista, madre de Mateo', avatar: '👩🏽', pitch: 1.1 },
    contexto: 'Al contar al grupo en la cascada falta Mateo, de 10 años. Su madre está desesperada.',
    pasos: [
      { dice: '¡Mi hijo no está! ¡Estaba aquí hace un rato!', opciones: [
        { t: 'La calmo, mantengo al grupo reunido en un punto seguro con el guía de apoyo, pregunto dónde lo vio por última vez y aviso por radio a la base.', p: 2, r: 'Por favor, encuéntrelo…', fb: 'Primero se asegura al resto del grupo y se reúne información; luego se busca de forma organizada.' },
        { t: 'Salgo corriendo solo a buscarlo por la selva.', p: 1, r: '¡Espere, no nos deje!', fb: 'Buscar sin organizar puede dejar al grupo sin guía y crear otra persona perdida.' },
        { t: 'Le digo que seguro aparece y seguimos el recorrido.', p: 0, r: '¡¿Cómo puede decir eso?!', fb: 'Una persona extraviada en la selva es una emergencia.' }
      ]},
      { dice: '¿Qué hacemos ahora?', opciones: [
        { t: 'Organizo la búsqueda: el guía de apoyo recorre el último tramo del sendero llamándolo, yo reviso el cruce donde se separan los caminos y activamos el ECU 911 si no aparece en minutos.', p: 2, r: '(Se escucha la voz de Mateo cerca del cruce.)', fb: 'La búsqueda por sectores y la activación oportuna de ayuda aumentan las probabilidades de encontrarlo.' },
        { t: 'Pido a los turistas que se dispersen a buscarlo.', p: 0, r: '(Dos turistas también se desorientan.)', fb: 'Dispersar al grupo multiplica las personas en riesgo.' },
        { t: 'Esperamos media hora a ver si regresa solo.', p: 1, r: '…', fb: 'Esperar demasiado reduce la luz y aumenta el riesgo.' }
      ]},
      { dice: '(Mateo aparece asustado. ¿Qué haces después?)', opciones: [
        { t: 'Verifico su estado, lo reúno con su madre, refuerzo con el grupo la regla de caminar en parejas y no salir del sendero, y registro el incidente en el informe.', p: 2, r: 'Gracias, de verdad.', fb: 'Evaluar, reforzar normas y registrar el incidente permite prevenir que vuelva a ocurrir.' },
        { t: 'Lo regaño delante de todos.', p: 0, r: '(Mateo llora.)', fb: 'Regañar en público a un niño asustado no ayuda; hay que contener y prevenir.' },
        { t: 'Seguimos el tour sin comentar lo sucedido.', p: 1, r: '…', fb: 'No reforzar las normas ni registrar el incidente deja abierta la posibilidad de repetirlo.' }
      ]}
    ]
  },
  {
    id: 'alojamiento', titulo: 'Queja por el servicio de alojamiento',
    asignaturas: ['GOT-P-207', 'GOT-P-108', 'GOT-P-405'],
    persona: { nombre: 'Sra. Patricia', rol: 'Turista de un paquete de 2 noches', avatar: '👩🏼‍💼', pitch: 1.05 },
    contexto: 'Una turista del paquete llega molesta a la recepción de la hostería en Puyo: le dieron una habitación distinta a la reservada y no hay agua caliente.',
    pasos: [
      { dice: '¡Pagué por una habitación con vista al río y me dieron una junto a la cocina, sin agua caliente!', opciones: [
        { t: 'La escucho sin interrumpir, me disculpo, reviso su reserva y le confirmo lo que incluye su paquete.', p: 2, r: 'Al menos alguien me escucha.', fb: 'Escucha activa, disculpa y verificación de la reserva son el inicio del manejo de quejas.' },
        { t: 'Le digo que todas las habitaciones son iguales.', p: 0, r: '¡No es cierto!', fb: 'Negar el problema aumenta la molestia y la desconfianza.' },
        { t: 'Le pido que regrese cuando llegue el gerente.', p: 1, r: '¿Y mientras tanto?', fb: 'Postergar sin dar una solución inmediata deja al cliente insatisfecho.' }
      ]},
      { dice: '¿Y qué van a hacer al respecto?', opciones: [
        { t: 'Le ofrezco el cambio a una habitación con vista al río disponible, reporto la falla del agua caliente a mantenimiento y le doy una cortesía como compensación.', p: 2, r: 'Eso ya es otra cosa.', fb: 'Solución concreta, compensación proporcional y reporte interno recuperan al cliente.' },
        { t: 'Le doy un descuento sin cambiarla de habitación.', p: 1, r: 'No es lo que pagué…', fb: 'La compensación ayuda, pero no resuelve el incumplimiento.' },
        { t: 'Le digo que si no le gusta, puede irse a otro hotel.', p: 0, r: '¡Voy a escribir en todas las redes!', fb: 'Una respuesta hostil convierte una queja en una crisis de reputación.' }
      ]},
      { dice: '(Al día siguiente, antes de su salida.)', opciones: [
        { t: 'Le pregunto si quedó conforme, registro la queja y la solución en el sistema y propongo revisar el proceso de asignación de habitaciones y mantenimiento.', p: 2, r: 'Gracias por el seguimiento.', fb: 'El seguimiento y la mejora del proceso evitan que la falla se repita.' },
        { t: 'No vuelvo a mencionar el tema.', p: 1, r: '…', fb: 'Sin seguimiento ni registro se pierde la oportunidad de mejorar.' },
        { t: 'Le cobro la cortesía en la factura final.', p: 0, r: '¡Increíble!', fb: 'Cobrar lo ofrecido como compensación es una falta grave al cliente.' }
      ]}
    ]
  },
  {
    id: 'producto', titulo: 'Crear un producto de turismo comunitario',
    asignaturas: ['GOT-P-406', 'GOT-P-206', 'GOT-P-410'],
    persona: { nombre: 'Mama Rosario', rol: 'Presidenta de la asociación de mujeres de una comunidad kichwa', avatar: '👩🏽‍🦳', pitch: 1.0 },
    contexto: 'La asociación quiere ofrecer una experiencia turística con su huerta (chakra), su cocina y sus artesanías. Te piden apoyo técnico para diseñarla.',
    pasos: [
      { dice: 'Queremos recibir turistas, pero no sabemos por dónde empezar.', opciones: [
        { t: 'Propongo empezar con un diagnóstico participativo: inventario de atractivos y saberes, qué quiere y qué no quiere mostrar la comunidad, y sus capacidades.', p: 2, r: 'Así todos podemos opinar.', fb: 'El producto comunitario nace de la decisión y la participación de la comunidad.' },
        { t: 'Les traigo un paquete copiado de otra comunidad.', p: 1, r: 'Pero nosotros somos distintos…', fb: 'Copiar no valora la identidad propia ni sus límites.' },
        { t: 'Decido yo qué se muestra porque conozco lo que buscan los turistas.', p: 0, r: '(Las socias se miran incómodas.)', fb: 'Imponer el diseño vulnera la autonomía comunitaria.' }
      ]},
      { dice: '¿Cómo armamos la experiencia y cuánto cobramos?', opciones: [
        { t: 'Diseñamos un itinerario de medio día (chakra, cocina tradicional y taller de artesanía), calculamos costos y fijamos un precio que cubra los costos y deje un margen justo para la asociación.', p: 2, r: 'Ahora sí vemos los números claros.', fb: 'Itinerario, costeo y precio justo hacen viable y sostenible el producto.' },
        { t: 'Cobramos lo mismo que el hotel de Puyo.', p: 1, r: '¿Y si no alcanza?', fb: 'El precio debe basarse en los costos propios y en el valor de la experiencia.' },
        { t: 'Mejor que sea gratis para atraer turistas.', p: 0, r: '¿Y quién paga la comida?', fb: 'Un producto sin ingresos no es sostenible para la comunidad.' }
      ]},
      { dice: '¿Y cómo hacemos que lleguen los turistas?', opciones: [
        { t: 'Proponemos alianzas con operadoras registradas, promoción digital con fotos autorizadas por la comunidad, normas de visita y capacidad máxima, y una encuesta para mejorar.', p: 2, r: '¡Empecemos!', fb: 'La comercialización responsable y la mejora continua consolidan el producto.' },
        { t: 'Publicar fotos de los niños de la comunidad en redes.', p: 0, r: 'Eso no lo autorizamos.', fb: 'Toda imagen requiere consentimiento, más aún la de menores.' },
        { t: 'Esperar a que los turistas lleguen solos.', p: 1, r: '…', fb: 'Sin comercialización el producto difícilmente se sostiene.' }
      ]}
    ]
  }
];
