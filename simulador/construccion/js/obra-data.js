/* =========================================================
   Datos del simulador de la carrera de Construcción (ISTCY).
   Fuente curricular: distribución de asignaturas con contenidos
   mínimos y Anexo 2 del proyecto de carrera.
   Los procedimientos son de referencia formativa y deben ser
   validados por los docentes de la carrera y la normativa vigente.
   ========================================================= */

const NIVELES = [
  { id: 'basico', nombre: 'Básico', emoji: '🟢', desc: 'Presupuesto y plazo holgados; pocos imprevistos.', ev: 0.22, presupuesto: 54000, plazo: 115 },
  { id: 'intermedio', nombre: 'Intermedio', emoji: '🟡', desc: 'Condiciones realistas y algunos imprevistos.', ev: 0.35, presupuesto: 50000, plazo: 100 },
  { id: 'avanzado', nombre: 'Avanzado', emoji: '🔴', desc: 'Presupuesto ajustado, plazo corto y muchos imprevistos.', ev: 0.5, presupuesto: 47500, plazo: 92 }
];

const MODS = {
  obra: { nombre: 'Obra', emoji: '🏗️' },
  lab: { nombre: 'Laboratorio', emoji: '🧪' },
  ofi: { nombre: 'Oficina técnica', emoji: '📐' },
  casos: { nombre: 'Casos', emoji: '🤝' }
};

const MALLA_CONS = [
  { cod: 'C-B-101', n: 'Ética y Desarrollo Profesional', pao: 1, u: 'Básica', mod: ['casos', 'obra'], rel: 'directa', sim: 'Decisiones éticas ante proveedores, clientes y fiscalización; prevención de la corrupción.' },
  { cod: 'C-B-102', n: 'Materiales de la Construcción', pao: 1, u: 'Básica', mod: ['lab', 'obra', 'casos'], rel: 'directa', sim: 'Hormigón, acero, bloques, madera y bambú; selección según durabilidad y resistencia.' },
  { cod: 'C-B-103', n: 'Dibujo Técnico y Geometría Descriptiva', pao: 1, u: 'Básica', mod: ['obra'], rel: 'parcial', sim: 'Lectura de planos durante la obra (los planos no se dibujan en el simulador).' },
  { cod: 'C-P-104', n: 'Mecánica de Suelos', pao: 1, u: 'Profesional', mod: ['lab', 'obra', 'casos'], rel: 'directa', sim: 'Exploración del subsuelo, compactación y capacidad del suelo para fundaciones.' },
  { cod: 'C-P-105', n: 'Topografía', pao: 1, u: 'Profesional', mod: ['lab', 'obra'], rel: 'directa', sim: 'Nivelación, pendientes, replanteo y movimiento de tierras.' },
  { cod: 'C-P-106', n: 'Laboratorio de Construcción 1', pao: 1, u: 'Profesional', mod: ['lab'], rel: 'directa', sim: 'Ensayos de áridos, morteros, acero y bloques.' },
  { cod: 'C-B-201', n: 'Dibujo Arquitectónico', pao: 2, u: 'Básica', mod: ['obra'], rel: 'parcial', sim: 'Interpretación de planos de proyecto durante la ejecución.' },
  { cod: 'C-B-202', n: 'Emprendimiento e Innovación', pao: 2, u: 'Básica', mod: ['ofi', 'casos'], rel: 'parcial', sim: 'Evaluación económica de iniciativas y soluciones constructivas innovadoras.' },
  { cod: 'C-P-203', n: 'Resistencia de Materiales', pao: 2, u: 'Profesional', mod: ['lab'], rel: 'directa', sim: 'Esfuerzos de compresión y tensión; factores de seguridad.' },
  { cod: 'C-P-204', n: 'Análisis Estructural', pao: 2, u: 'Profesional', mod: ['lab', 'casos'], rel: 'directa', sim: 'Reacciones y momentos en vigas; importancia de los elementos estructurales.' },
  { cod: 'C-P-205', n: 'Construcciones', pao: 2, u: 'Profesional', mod: ['obra'], rel: 'directa', sim: 'Estudio geotécnico, replanteo, movimiento de tierras, cimentaciones, muros y cerramientos.' },
  { cod: 'C-P-206', n: 'Laboratorio de Construcción 2', pao: 2, u: 'Profesional', mod: ['lab', 'obra', 'casos'], rel: 'directa', sim: 'Ensayos de hormigón fresco (asentamiento) y endurecido (cilindros).' },
  { cod: 'C-B-301', n: 'Seguridad y Salud Ocupacional', pao: 3, u: 'Básica', mod: ['obra', 'casos'], rel: 'directa', sim: 'EPP, trabajo en altura, señalización, orden y limpieza, investigación de accidentes.' },
  { cod: 'C-B-302', n: 'Ecología y Gestión Ambiental', pao: 3, u: 'Básica', mod: ['obra', 'casos'], rel: 'directa', sim: 'Gestión de residuos y escombros, ruido y construcción sostenible.' },
  { cod: 'C-P-303', n: 'Fundiciones y Muros', pao: 3, u: 'Profesional', mod: ['obra', 'lab'], rel: 'directa', sim: 'Zapatas, replantillo, recubrimientos y muros.' },
  { cod: 'C-P-304', n: 'Instalaciones Hidrosanitarias en Edificios', pao: 3, u: 'Profesional', mod: ['obra', 'lab'], rel: 'directa', sim: 'Redes de agua y desagüe, pendientes y pruebas de presión.' },
  { cod: 'C-P-305', n: 'Instalaciones Eléctricas, Especiales y Climatización', pao: 3, u: 'Profesional', mod: ['obra', 'lab'], rel: 'directa', sim: 'Circuitos, protecciones, puesta a tierra y eficiencia energética.' },
  { cod: 'C-P-306', n: 'Proyectos 1', pao: 3, u: 'Integración', mod: ['ofi'], rel: 'directa', sim: 'Etapas de un proyecto y análisis de factibilidad.' },
  { cod: 'C-P-401', n: 'Contratación Pública', pao: 4, u: 'Profesional', mod: ['ofi', 'casos'], rel: 'directa', sim: 'Sistema Nacional de Contratación Pública y sus procedimientos.' },
  { cod: 'C-P-402', n: 'Urbanismo', pao: 4, u: 'Profesional', mod: ['casos', 'lab'], rel: 'directa', sim: 'Análisis de sitio, pendientes, áreas urbanizables, cortes y rellenos.' },
  { cod: 'C-P-403', n: 'Administración de Obras', pao: 4, u: 'Profesional', mod: ['obra', 'ofi'], rel: 'directa', sim: 'Control de calidad, diario de obra, precios unitarios, presupuesto y plazo.' },
  { cod: 'C-P-404', n: 'Gestión Inmobiliaria', pao: 4, u: 'Profesional', mod: ['ofi'], rel: 'parcial', sim: 'Análisis de mercado y factibilidad de un proyecto inmobiliario.' },
  { cod: 'C-P-405', n: 'Proyectos 2', pao: 4, u: 'Integración', mod: ['ofi'], rel: 'directa', sim: 'Viabilidad económica: flujo de caja, VAN y costo-beneficio.' }
];

/* Cuadrilla virtual */
const CREW = [
  { id: 'w1', nombre: 'Maestro Cando', rol: 'Maestro mayor', avatar: '👷🏽‍♂️', pitch: 0.85 },
  { id: 'w2', nombre: 'Doña Lucía', rol: 'Albañil', avatar: '👷🏽‍♀️', pitch: 1.25 },
  { id: 'w3', nombre: 'Don Segundo', rol: 'Fierrero', avatar: '👷🏻‍♂️', pitch: 0.95 },
  { id: 'w4', nombre: 'Kevin', rol: 'Ayudante', avatar: '👷🏾', pitch: 1.1 }
];

/* ---------------- FASES DE LA OBRA ----------------
   Vivienda unifamiliar de dos plantas (120 m²), estructura de hormigón armado, Puyo.
   Efectos (ef): dias, costo (USD), calidad, riesgo, ambiente, permiso, ensayo, epp, registro, lesion */
const FASES = [
  { fase: 'Estudios y permisos', q: 'Antes de iniciar la obra, ¿qué haces?', o: [
    { t: 'Verifico el estudio de suelos (capacidad portante), los planos estructurales y el permiso de construcción municipal.', p: 2, fb: 'El estudio de suelos define la cimentación; sin permiso la obra puede ser suspendida.', ef: { dias: 6, costo: 900, permiso: 1, calidad: 8 } },
    { t: 'Empiezo de inmediato; los permisos se tramitan después.', p: 0, fb: 'Construir sin permiso expone a sanciones y suspensión de la obra.', ef: { dias: 1, calidad: -10 } },
    { t: 'Uso el estudio de suelos del terreno vecino para ahorrar.', p: 1, fb: 'El suelo puede variar entre terrenos; el estudio debe ser del sitio.', ef: { dias: 3, costo: 300, permiso: 1, calidad: -4 } }
  ]},
  { fase: 'Replanteo', q: '¿Cómo trazas los ejes de la vivienda en el terreno?', o: [
    { t: 'Con nivel o estación total, ejes referenciados en caballetes y verificación de escuadra con diagonales (3-4-5).', p: 2, fb: 'Un replanteo con referencias y escuadra verificada evita errores que se arrastran a toda la obra.', ef: { dias: 3, costo: 400, calidad: 8 } },
    { t: 'A ojo, con piola, sin verificar diagonales.', p: 0, fb: 'Sin verificar escuadra y niveles, la estructura queda descuadrada.', ef: { dias: 1, costo: 80, calidad: -12 } },
    { t: 'Con flexómetro y piola, verificando solo las medidas de los lados.', p: 1, fb: 'Medir lados no garantiza ángulos rectos: hay que verificar diagonales.', ef: { dias: 2, costo: 150, calidad: -3 } }
  ]},
  { fase: 'Excavación y cimentación', q: 'Para las zapatas, ¿qué indicas a la cuadrilla?', o: [
    { t: 'Excavar hasta la profundidad del estudio, colocar replantillo de hormigón pobre y armar el acero con separadores para el recubrimiento.', p: 2, fb: 'El replantillo y los separadores protegen el acero de la humedad del suelo y aseguran el recubrimiento.', ef: { dias: 12, costo: 7200, calidad: 10, ambiente: -4 } },
    { t: 'Colocar el acero directamente sobre la tierra y hormigonar.', p: 0, fb: 'Sin recubrimiento el acero se corroe y la zapata pierde resistencia.', ef: { dias: 9, costo: 6200, calidad: -15 } },
    { t: 'Excavar menos profundo para ahorrar tiempo.', p: 0, fb: 'Apoyar en un estrato menos resistente puede causar asentamientos.', ef: { dias: 7, costo: 5600, calidad: -15 } }
  ]},
  { fase: 'Columnas y vigas', q: 'Llega el hormigón para columnas y vigas. ¿Qué controles haces?', o: [
    { t: 'Ensayo de asentamiento (cono de Abrams), vibrado al colocar, toma de cilindros para ensayo y curado húmedo por al menos 7 días.', p: 2, fb: 'Controlar la trabajabilidad, compactar y curar asegura la resistencia del hormigón.', ef: { dias: 15, costo: 9800, calidad: 10, ensayo: 1 } },
    { t: 'Agregar agua para que fluya mejor en los encofrados.', p: 0, fb: 'Más agua aumenta la relación agua/cemento y reduce la resistencia.', ef: { dias: 12, costo: 9200, calidad: -18 } },
    { t: 'Colocar sin vibrar porque el vibrador está dañado.', p: 1, fb: 'Sin vibrado quedan vacíos (hormigón "cangrejeado"); se debe reparar o conseguir otro vibrador.', ef: { dias: 13, costo: 9300, calidad: -8 } }
  ]},
  { fase: 'Losa y trabajo en altura', q: 'Se arma el encofrado de la losa del segundo piso.', o: [
    { t: 'Revisar encofrado y apuntalamiento, colocar barandas y línea de vida, y exigir arnés al trabajar en el borde.', p: 2, fb: 'Las caídas de altura son una de las principales causas de accidentes graves en construcción.', ef: { dias: 14, costo: 8800, riesgo: -12, epp: 1, calidad: 6 } },
    { t: 'Trabajar sin arnés porque "es solo un segundo piso".', p: 0, fb: 'Una caída desde un segundo piso puede ser mortal.', ef: { dias: 12, costo: 8300, riesgo: 25, lesion: true } },
    { t: 'Retirar los puntales a los pocos días para reutilizarlos.', p: 0, fb: 'Desencofrar antes de que el hormigón alcance la resistencia puede provocar fisuras o colapso.', ef: { dias: 10, costo: 8000, riesgo: 15, calidad: -15 } }
  ]},
  { fase: 'Mampostería', q: '¿Cómo se levantan las paredes de bloque?', o: [
    { t: 'Mortero dosificado, juntas trabadas, chicotes de anclaje a las columnas, control con plomada y nivel.', p: 2, fb: 'Trabar las juntas y anclar los muros a la estructura mejora su comportamiento ante sismos.', ef: { dias: 14, costo: 6400, calidad: 8 } },
    { t: 'Juntas verticales alineadas sin trabar para avanzar rápido.', p: 0, fb: 'Las juntas sin trabar debilitan el muro.', ef: { dias: 10, costo: 6000, calidad: -12 } },
    { t: 'Mortero muy seco para que fragüe rápido.', p: 1, fb: 'Un mortero seco no adhiere bien a los bloques.', ef: { dias: 12, costo: 6100, calidad: -5 } }
  ]},
  { fase: 'Instalaciones', q: 'Antes de enlucir, ¿qué haces con las instalaciones?', o: [
    { t: 'Prueba de presión en tuberías de agua, desagües con pendiente adecuada, circuitos eléctricos separados con protecciones y puesta a tierra.', p: 2, fb: 'Probar antes de cerrar evita romper paredes; circuitos separados y puesta a tierra dan seguridad.', ef: { dias: 10, costo: 5200, calidad: 8, riesgo: -4 } },
    { t: 'Enlucir y probar al final.', p: 0, fb: 'Una fuga detectada después obliga a romper el enlucido.', ef: { dias: 7, costo: 4600, calidad: -10 } },
    { t: 'Conectar todos los tomacorrientes a un solo circuito sin protección.', p: 0, fb: 'Sobrecarga y riesgo de incendio eléctrico.', ef: { dias: 8, costo: 4500, riesgo: 15, calidad: -10 } }
  ]},
  { fase: 'Cubierta y clima amazónico', q: 'En Puyo llueve mucho y hay humedad alta. ¿Qué cubierta propones?', o: [
    { t: 'Cubierta con buena pendiente, aleros amplios, canales y bajantes, ventilación cruzada e impermeabilización.', p: 2, fb: 'La pendiente, los aleros y la ventilación protegen la vivienda de la lluvia y la humedad.', ef: { dias: 9, costo: 5600, calidad: 8, ambiente: 3 } },
    { t: 'Losa plana sin impermeabilizar.', p: 0, fb: 'Con lluvias intensas habrá filtraciones y humedad.', ef: { dias: 7, costo: 4800, calidad: -12 } },
    { t: 'Cubierta de baja pendiente sin aleros.', p: 1, fb: 'Las paredes quedan expuestas a la lluvia.', ef: { dias: 7, costo: 5000, calidad: -4 } }
  ]},
  { fase: 'Entrega de la obra', q: 'La obra está terminada. ¿Cómo la entregas?', o: [
    { t: 'Inspección final con el propietario, planos de lo construido, limpieza, disposición de escombros en escombrera autorizada y acta de entrega-recepción.', p: 2, fb: 'La entrega formal documenta la obra y protege a ambas partes.', ef: { dias: 4, costo: 700, calidad: 5, ambiente: 6, registro: 1 } },
    { t: 'Entrego las llaves y me retiro.', p: 0, fb: 'Sin acta ni inspección pueden surgir reclamos sin respaldo.', ef: { dias: 1, costo: 0 } },
    { t: 'Dejo los escombros en el terreno baldío vecino.', p: 0, fb: 'Es una infracción ambiental y municipal.', ef: { dias: 1, costo: 0, ambiente: -20 } }
  ]}
];

const EVENTOS = [
  { id: 'lluvia', txt: 'Se pronostican tres días de lluvia intensa justo cuando hay excavaciones abiertas.', voz: 'Ingeniero, se viene un aguacero fuerte.', o: [
    { t: 'Cubrir excavaciones y materiales, drenar el agua y reprogramar el hormigonado.', p: 2, fb: 'Proteger las excavaciones evita derrumbes y que el agua afecte el suelo de apoyo.', ef: { dias: 3, costo: 250, riesgo: -5 } },
    { t: 'Seguir trabajando normalmente bajo la lluvia.', p: 0, fb: 'Las excavaciones inundadas pueden derrumbarse y el hormigón se lava.', ef: { dias: 1, riesgo: 15, calidad: -8 } }
  ]},
  { id: 'cemento', txt: 'Llega un lote de cemento con sacos endurecidos y húmedos.', voz: 'Mire, inge, este cemento está apelmazado.', o: [
    { t: 'Rechazar el lote, registrarlo en el diario de obra y pedir reposición al proveedor.', p: 2, fb: 'El cemento hidratado pierde capacidad de fraguar; se rechaza y se documenta.', ef: { dias: 1, registro: 1 } },
    { t: 'Usarlo igual para no perder dinero.', p: 0, fb: 'Reduce la resistencia del hormigón.', ef: { calidad: -12 } }
  ]},
  { id: 'arnes', txt: 'Ves a Kevin trabajando en el borde de la losa sin arnés.', voz: 'Tranquilo, inge, ya mismo termino.', o: [
    { t: 'Detener la tarea de inmediato, dotarle de arnés, explicarle el riesgo y registrar la observación.', p: 2, fb: 'Detener un acto inseguro es responsabilidad del residente de obra.', ef: { riesgo: -10, epp: 1, registro: 1 } },
    { t: 'Dejar que termine; será rápido.', p: 0, fb: 'Un segundo basta para una caída.', ef: { riesgo: 20, lesion: true } }
  ]},
  { id: 'inspector', txt: 'Llega un inspector municipal a verificar el permiso y los planos aprobados.', voz: 'Buenos días, vengo a revisar los permisos de la obra.', o: [
    { t: 'Presentar el permiso, los planos aprobados y el diario de obra actualizado.', p: 2, fb: 'La documentación en obra demuestra el cumplimiento.', ef: { dias: 0, registro: 1, cond: 'permiso' } },
    { t: 'Pedirle que regrese otro día.', p: 0, fb: 'Evadir la inspección puede terminar en la suspensión de la obra.', ef: { dias: 5, costo: 500 } }
  ]},
  { id: 'vecino', txt: 'Un vecino reclama por el ruido temprano y el polvo de los escombros.', voz: '¡No se puede ni dormir con tanto ruido desde las seis de la mañana!', o: [
    { t: 'Escucharlo, ajustar el horario de trabajos ruidosos, humedecer y cubrir los escombros.', p: 2, fb: 'Una buena relación con el entorno reduce conflictos e impactos ambientales.', ef: { ambiente: 8, dias: 1 } },
    { t: 'Ignorarlo; es una obra legal.', p: 0, fb: 'El ruido y el polvo son impactos que deben controlarse.', ef: { ambiente: -10 } }
  ]},
  { id: 'cilindros', txt: 'El laboratorio informa que los cilindros a 7 días tienen una resistencia menor a la esperada.', voz: 'Inge, llegaron los resultados del laboratorio y no están bien.', o: [
    { t: 'Esperar el resultado a 28 días, revisar el registro de esa fundición y, si persiste, consultar al calculista (por ejemplo, extracción de núcleos).', p: 2, fb: 'La resistencia se evalúa a 28 días; si no cumple, se investiga con el diseñador antes de decidir.', ef: { dias: 2, costo: 300, ensayo: 1, calidad: 4 } },
    { t: 'Ocultar el resultado al propietario.', p: 0, fb: 'Ocultar información de calidad es una falta ética grave.', ef: { calidad: -15 } }
  ]},
  { id: 'freatico', txt: 'Al excavar aparece agua: el nivel freático está alto.', voz: '¡Inge, está saliendo agua en la excavación!', o: [
    { t: 'Bombear y drenar la excavación, proteger los taludes y consultar al especialista de suelos.', p: 2, fb: 'El agua reduce la capacidad del suelo y puede derrumbar los taludes.', ef: { dias: 3, costo: 600, riesgo: -6 } },
    { t: 'Hormigonar con el agua en la excavación.', p: 0, fb: 'El agua lava el cemento y debilita la cimentación.', ef: { calidad: -15 } }
  ]},
  { id: 'cambio', txt: 'El propietario pide agregar una habitación en el segundo piso que no estaba en los planos.', voz: 'Ingeniero, quiero un cuarto más arriba, ¿se puede?', o: [
    { t: 'Explicarle que se requiere revisión estructural, actualización de planos, permiso y un presupuesto adicional por escrito.', p: 2, fb: 'Los cambios se formalizan con diseño, permiso y orden de cambio.', ef: { dias: 2, registro: 1 } },
    { t: 'Construirla de inmediato sin revisar la estructura.', p: 0, fb: 'Una carga no prevista puede comprometer la estructura.', ef: { dias: 8, costo: 3000, calidad: -12, riesgo: 8 } }
  ]}
];

/* ---------------- LABORATORIO ---------------- */
function rndI(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function mezclar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function mc(q, ok, malas, exp, asig) { const o = mezclar([ok, ...malas]); return { q, o, c: o.indexOf(ok), exp, asig }; }
const coma = n => String(n).replace('.', ',');

const LAB_BANCO = [
  () => mc('El ensayo del cono de Abrams mide…', 'La consistencia o trabajabilidad del hormigón fresco (asentamiento)', ['La resistencia a 28 días', 'El contenido de aire del acero', 'La humedad del suelo'], 'El asentamiento indica la consistencia del hormigón fresco.', 'C-P-206'),
  () => mc('La resistencia de diseño del hormigón se verifica normalmente con cilindros ensayados a…', '28 días', ['1 día', '3 horas', '1 año'], 'La resistencia especificada (f\'c) se refiere a los 28 días.', 'C-P-206'),
  () => mc('Si se aumenta la relación agua/cemento de un hormigón, su resistencia…', 'Disminuye', ['Aumenta', 'No cambia', 'Se duplica'], 'Más agua deja más poros al evaporarse y reduce la resistencia.', 'C-B-102'),
  () => mc('¿Para qué sirve el curado del hormigón?', 'Mantener la humedad para que el cemento se hidrate y alcance su resistencia', ['Darle color', 'Acelerar el secado al sol', 'Evitar que pese mucho'], 'Sin curado aparecen fisuras y baja la resistencia.', 'C-B-102'),
  () => mc('La granulometría de un árido determina…', 'La distribución de los tamaños de sus partículas', ['Su color', 'Su resistencia a tracción', 'Su precio'], 'Se obtiene tamizando el árido por mallas normalizadas.', 'C-P-106'),
  () => mc('El ensayo Proctor se usa para…', 'Determinar la humedad óptima y la densidad máxima de compactación de un suelo', ['Medir la resistencia del acero', 'Calcular la pendiente', 'Medir el asentamiento del hormigón'], 'Permite controlar la compactación de rellenos.', 'C-P-104'),
  () => mc('Los límites de Atterberg (líquido y plástico) describen…', 'La plasticidad de los suelos finos', ['La resistencia del hormigón', 'La dureza del acero', 'La permeabilidad del vidrio'], 'Ayudan a clasificar arcillas y limos.', 'C-P-104'),
  () => mc('El ensayo de penetración estándar (SPT) sirve para…', 'Explorar el subsuelo y estimar su resistencia', ['Medir el voltaje', 'Probar tuberías', 'Pesar el cemento'], 'Es un método común de exploración geotécnica.', 'C-P-104'),
  () => mc('En una viga simplemente apoyada con carga uniforme, el momento flector máximo está…', 'En el centro del vano', ['En los apoyos', 'En un cuarto del vano siempre', 'No existe'], 'Para carga uniforme, M máx = wL²/8 en el centro.', 'C-P-204'),
  () => mc('El recubrimiento del acero en el hormigón sirve principalmente para…', 'Proteger el acero de la corrosión y del fuego', ['Hacerlo más pesado', 'Ahorrar acero', 'Que se vea mejor'], 'Por eso se usan separadores al armar.', 'C-P-303'),
  () => mc('Los desagües de una vivienda necesitan…', 'Una pendiente para que el agua circule por gravedad', ['Ser completamente horizontales', 'Subir hacia la salida', 'Tener el menor diámetro posible'], 'Sin pendiente se acumulan sólidos y hay obstrucciones.', 'C-P-304'),
  () => mc('La puesta a tierra de una instalación eléctrica sirve para…', 'Proteger a las personas descargando corrientes de falla', ['Aumentar el consumo', 'Iluminar mejor', 'Reemplazar los breakers'], 'Es un elemento básico de seguridad eléctrica.', 'C-P-305'),
  () => mc('En nivelación geométrica, la cota de un punto B se obtiene como…', 'Cota de A + lectura atrás − lectura adelante', ['Cota de A − lectura atrás + lectura adelante', 'Lectura atrás × lectura adelante', 'Cota de A ÷ 2'], 'La altura instrumental es cota A + lectura atrás.', 'C-P-105'),
  () => mc('El bambú (guadúa) en construcciones amazónicas se valora porque…', 'Es renovable, liviano y con buena resistencia a tracción', ['No requiere ningún tratamiento', 'Es más pesado que el acero', 'No se puede cortar'], 'Requiere tratamiento contra insectos y protección de la humedad.', 'C-B-102'),
  // cálculos
  () => { const P = [200, 300, 400, 500][rndI(0, 3)], b = [25, 30, 35][rndI(0, 2)]; const s = Math.round(P / (b * b / 10000) / 1000 * 100) / 100; return { q: `Una columna de ${b} × ${b} cm recibe una carga axial de ${P} kN. ¿Cuál es el esfuerzo de compresión en MPa? (dos decimales; 1 MPa = 1000 kN/m²)`, num: s, tol: 0.02, exp: `Área = ${b / 100} × ${b / 100} = ${coma(Math.round(b * b / 10000 * 10000) / 10000)} m². σ = ${P} ÷ ${coma(b * b / 10000)} = ${coma(Math.round(P / (b * b / 10000)))} kN/m² ≈ ${coma(s)} MPa.`, asig: 'C-P-203' }; },
  () => { const w = [10, 12, 15, 20][rndI(0, 3)], L = [4, 5, 6][rndI(0, 2)]; const M = Math.round(w * L * L / 8 * 100) / 100; return { q: `Viga simplemente apoyada de ${L} m con carga uniforme de ${w} kN/m. ¿Cuál es el momento flector máximo en kN·m? (M = wL²/8)`, num: M, tol: 0.05, exp: `M = ${w} × ${L}² ÷ 8 = ${coma(M)} kN·m.`, asig: 'C-P-204' }; },
  () => { const a = [1.2, 1.4, 1.5][rndI(0, 2)], h = [0.3, 0.35, 0.4][rndI(0, 2)], n = [6, 8, 9][rndI(0, 2)]; const v = Math.round(a * a * h * n * 100) / 100; return { q: `Hay ${n} zapatas cuadradas de ${coma(a)} × ${coma(a)} m y ${coma(h)} m de altura. ¿Cuántos m³ de hormigón se necesitan? (dos decimales)`, num: v, tol: 0.03, exp: `Volumen = ${coma(a)} × ${coma(a)} × ${coma(h)} × ${n} = ${coma(v)} m³.`, asig: 'C-P-303' }; },
  () => { const d = [1.2, 1.8, 2.5, 3][rndI(0, 3)], L = [40, 60, 80][rndI(0, 2)]; const p = Math.round(d / L * 100 * 100) / 100; return { q: `Entre dos puntos separados ${L} m horizontalmente hay un desnivel de ${coma(d)} m. ¿Cuál es la pendiente en %? (dos decimales)`, num: p, tol: 0.02, exp: `Pendiente = ${coma(d)} ÷ ${L} × 100 = ${coma(p)} %.`, asig: 'C-P-105' }; },
  () => { const ca = [100, 250.5, 312.4][rndI(0, 2)], la = [1.52, 1.85, 2.1][rndI(0, 2)], lb = [0.95, 1.2, 2.4][rndI(0, 2)]; const cb = Math.round((ca + la - lb) * 100) / 100; return { q: `Nivelación: la cota del punto A es ${coma(ca)} m. La lectura atrás en A es ${coma(la)} m y la lectura adelante en B es ${coma(lb)} m. ¿Cuál es la cota de B? (dos decimales)`, num: cb, tol: 0.01, exp: `Cota B = ${coma(ca)} + ${coma(la)} − ${coma(lb)} = ${coma(cb)} m.`, asig: 'C-P-105' }; }
];

/* ---------------- OFICINA TÉCNICA ---------------- */
const OFI_BANCO = [
  () => mc('¿Qué institución rige el Sistema Nacional de Contratación Pública en Ecuador?', 'El Servicio Nacional de Contratación Pública (SERCOP)', ['El Ministerio de Turismo', 'El GAD parroquial', 'La Contraloría únicamente'], 'El SERCOP administra el sistema y el portal de compras públicas.', 'C-P-401'),
  () => mc('¿Dónde se publican los procesos de contratación pública en Ecuador?', 'En el Portal de Compras Públicas', ['En redes sociales del contratista', 'En la prensa únicamente', 'No se publican'], 'La publicación garantiza transparencia y concurrencia.', 'C-P-401'),
  () => mc('¿Qué ley regula la contratación de obras con recursos públicos en Ecuador?', 'La Ley Orgánica del Sistema Nacional de Contratación Pública (LOSNCP)', ['El Código de Tránsito', 'La Ley de Educación Intercultural', 'Ninguna'], 'La LOSNCP y su reglamento regulan los procedimientos.', 'C-P-401'),
  () => mc('Un precio unitario (APU) se compone de…', 'Costos directos (materiales, mano de obra, equipo y transporte) más costos indirectos y utilidad', ['Solo el costo de los materiales', 'El sueldo del residente', 'El valor del terreno'], 'El análisis de precios unitarios desglosa cada componente del rubro.', 'C-P-403'),
  () => mc('La ruta crítica de un cronograma está formada por…', 'Las actividades sin holgura, cuyo retraso retrasa toda la obra', ['Las actividades más baratas', 'Las primeras actividades', 'Las actividades de oficina'], 'Controlar la ruta crítica permite cumplir el plazo.', 'C-P-403'),
  () => mc('El diario o libro de obra sirve para…', 'Registrar cronológicamente las actividades, órdenes, novedades y controles de la obra', ['Anotar gastos personales', 'Dibujar los planos', 'Calcular el impuesto predial'], 'Es un documento de respaldo técnico y legal.', 'C-P-403'),
  () => mc('Si el VAN de un proyecto es positivo con la tasa de descuento exigida, el proyecto…', 'Es económicamente viable', ['Debe rechazarse', 'No tiene flujo de caja', 'Pierde dinero siempre'], 'VAN > 0 significa que genera más valor que la rentabilidad exigida.', 'C-P-405'),
  () => mc('Una relación beneficio/costo mayor a 1 indica que…', 'Los beneficios superan a los costos', ['Los costos superan a los beneficios', 'El proyecto no tiene costos', 'Hay que duplicar la inversión'], 'B/C > 1 favorece la ejecución del proyecto.', 'C-P-405'),
  () => mc('El marco lógico de un proyecto organiza…', 'Fin, propósito, componentes y actividades con indicadores y supuestos', ['Solo el presupuesto', 'Los planos arquitectónicos', 'La lista de proveedores'], 'Es una herramienta de planificación y evaluación de proyectos.', 'C-P-306'),
  () => mc('En un proyecto inmobiliario, el estudio de mercado permite…', 'Conocer la demanda, los precios y el perfil de los compradores', ['Calcular el acero de las vigas', 'Diseñar las instalaciones eléctricas', 'Hacer el replanteo'], 'Define qué producto inmobiliario tiene salida.', 'C-P-404'),
  // cálculos
  () => {
    const sacos = 7, pc = [8, 8.5, 9][rndI(0, 2)], arena = 0.65, pa = [15, 18, 20][rndI(0, 2)], ripio = 0.95, pr = [18, 20, 22][rndI(0, 2)];
    const mo = [28, 32, 36][rndI(0, 2)], eq = [6, 8][rndI(0, 1)], ind = [18, 20, 22][rndI(0, 2)];
    const mat = sacos * pc + arena * pa + ripio * pr, cd = mat + mo + eq, pu = Math.round(cd * (1 + ind / 100) * 100) / 100;
    return { q: `APU de 1 m³ de hormigón: cemento ${sacos} sacos a $${coma(pc)}; arena ${coma(arena)} m³ a $${pa}; ripio ${coma(ripio)} m³ a $${pr}; mano de obra $${mo}; equipo (concretera) $${eq}. Con ${ind} % de indirectos y utilidad, ¿cuál es el precio unitario en USD? (dos decimales)`, num: pu, tol: Math.max(0.5, pu * 0.005),
      exp: `Materiales = ${coma(Math.round(mat * 100) / 100)}; costo directo = ${coma(Math.round(mat * 100) / 100)} + ${mo} + ${eq} = ${coma(Math.round(cd * 100) / 100)}; PU = ${coma(Math.round(cd * 100) / 100)} × ${coma(1 + ind / 100)} = $${coma(pu)}.`, asig: 'C-P-403' };
  },
  () => { const L = [8, 10, 12][rndI(0, 2)], A = [7, 8, 9][rndI(0, 2)], e = [0.2, 0.25][rndI(0, 1)]; const v = Math.round(L * A * e * 100) / 100; return { q: `Cómputo: una losa maciza de ${L} m × ${A} m y ${coma(e)} m de espesor. ¿Cuántos m³ de hormigón tiene? (dos decimales)`, num: v, tol: 0.02, exp: `Volumen = ${L} × ${A} × ${coma(e)} = ${coma(v)} m³.`, asig: 'C-P-403' }; },
  () => { const area = [24, 36, 48][rndI(0, 2)], r = 12.5; const n = Math.ceil(area * r); return { q: `Cómputo: un muro de ${area} m² con bloques de 40 × 20 cm. Si el rendimiento es de 12,5 bloques por m², ¿cuántos bloques se necesitan? (redondea hacia arriba)`, num: n, tol: 0.5, exp: `${area} × 12,5 = ${n} bloques (sin incluir desperdicio).`, asig: 'C-P-403' }; },
  () => { const I = [10000, 20000][rndI(0, 1)], F = [5000, 6000, 8000][rndI(0, 2)], r = [10, 12][rndI(0, 1)] / 100; const van = Math.round((-I + F / (1 + r) + F / (1 + r) ** 2 + F / (1 + r) ** 3) * 100) / 100; return { q: `Un proyecto requiere una inversión de $${I} y genera $${F} al año durante 3 años. Con una tasa de descuento del ${Math.round(r * 100)} %, ¿cuál es el VAN en USD? (dos decimales; puede ser negativo)`, num: van, tol: Math.max(1, Math.abs(van) * 0.005), exp: `VAN = −${I} + ${F}/${coma(1 + r)} + ${F}/${coma(1 + r)}² + ${F}/${coma(1 + r)}³ = $${coma(van)}. ${van > 0 ? 'Es viable.' : 'No es viable a esa tasa.'}`, asig: 'C-P-405' }; }
];

/* ---------------- CASOS PROFESIONALES ---------------- */
const CASOS_CONS = [
  {
    id: 'comision', titulo: 'Un proveedor ofrece una comisión',
    asignaturas: ['C-B-101', 'C-P-401'],
    persona: { nombre: 'Sr. Paredes', rol: 'Proveedor de materiales', avatar: '🧔🏻', pitch: 0.95 },
    contexto: 'Eres residente de una obra pública. Un proveedor te ofrece un porcentaje si recomiendas su acero, que no tiene certificado de calidad.',
    pasos: [
      { dice: 'Inge, si usted recomienda mi acero, le dejo un 5 % para usted. Nadie se va a enterar.', opciones: [
        { t: 'Rechazo la oferta con firmeza y le indico que los materiales se adquieren según el proceso y las especificaciones técnicas.', p: 2, r: 'Bueno… como usted diga.', fb: 'Aceptar o insinuar un beneficio personal es corrupción.' },
        { t: 'Acepto, pero solo esta vez.', p: 0, r: 'Trato hecho.', fb: 'Es un acto de corrupción con consecuencias penales y profesionales.' },
        { t: 'Le digo que lo pensaré.', p: 1, r: 'Lo espero, inge.', fb: 'Dudar deja abierta la puerta; la respuesta debe ser clara.' }
      ]},
      { dice: '(El acero no tiene certificado de calidad.)', opciones: [
        { t: 'Exijo el certificado de calidad y ensayos de tracción antes de aceptar cualquier acero.', p: 2, r: 'Lo voy a conseguir.', fb: 'Todo material estructural debe cumplir las especificaciones y la norma.' },
        { t: 'Lo acepto porque es más barato.', p: 0, r: '…', fb: 'Un acero de calidad desconocida pone en riesgo la estructura.' },
        { t: 'Lo uso solo en columnas.', p: 0, r: '…', fb: 'Las columnas son elementos críticos.' }
      ]},
      { dice: '(¿Qué haces con lo ocurrido?)', opciones: [
        { t: 'Registro el hecho y lo informo al fiscalizador y a la entidad contratante.', p: 2, r: 'La entidad agradece la transparencia.', fb: 'Informar protege la obra y al profesional.' },
        { t: 'No digo nada para evitar problemas.', p: 1, r: '…', fb: 'Callar puede permitir que se repita con otros.' },
        { t: 'Lo comento en redes sociales con su nombre.', p: 0, r: '(Se genera un conflicto legal.)', fb: 'Las denuncias se canalizan por las vías formales.' }
      ]}
    ]
  },
  {
    id: 'accidente', titulo: 'Un accidente en la obra',
    asignaturas: ['C-B-301', 'C-P-403'],
    persona: { nombre: 'Maestro Cando', rol: 'Maestro mayor', avatar: '👷🏽‍♂️', pitch: 0.85 },
    contexto: 'Un ayudante resbaló desde un andamio de 2 metros y se golpeó el brazo.',
    pasos: [
      { dice: '¡Inge, Kevin se cayó del andamio!', opciones: [
        { t: 'Detengo los trabajos en esa zona, verifico que la escena sea segura, brindo primeros auxilios sin moverlo si hay sospecha de lesión grave y llamo al ECU 911.', p: 2, r: 'Ya viene la ambulancia.', fb: 'Primero la seguridad y la atención del lesionado.' },
        { t: 'Lo levanto y le digo que siga trabajando si puede.', p: 0, r: 'Me duele mucho…', fb: 'Mover a un lesionado sin evaluarlo puede agravar las lesiones.' },
        { t: 'Lo envío a su casa en bus.', p: 0, r: '…', fb: 'Un accidente laboral requiere atención y registro.' }
      ]},
      { dice: '¿Y ahora qué hacemos?', opciones: [
        { t: 'Investigar las causas (andamio sin barandas, sin arnés), corregirlas y registrar y reportar el accidente según la normativa de seguridad laboral.', p: 2, r: 'Vamos a poner barandas y rodapiés hoy mismo.', fb: 'Investigar y reportar los accidentes permite prevenir los siguientes.' },
        { t: 'No reportarlo para no tener problemas.', p: 0, r: '…', fb: 'Ocultar accidentes es ilegal y deja sin protección al trabajador.' },
        { t: 'Culpar al trabajador.', p: 0, r: 'Pero no había barandas…', fb: 'La investigación busca causas, no culpables.' }
      ]},
      { dice: '¿Cómo evitamos que se repita?', opciones: [
        { t: 'Charla de seguridad diaria, revisión de andamios antes de usarlos, uso obligatorio de EPP y señalización.', p: 2, r: 'Así trabajamos todos más tranquilos.', fb: 'La prevención es diaria y compartida.' },
        { t: 'Poner un letrero de "cuidado".', p: 1, r: '…', fb: 'La señalización sola no elimina el riesgo.' },
        { t: 'Nada; fue mala suerte.', p: 0, r: '…', fb: 'Los accidentes tienen causas que se pueden controlar.' }
      ]}
    ]
  },
  {
    id: 'escombros', titulo: 'Escombros junto al estero',
    asignaturas: ['C-B-302', 'C-B-101'],
    persona: { nombre: 'Don Segundo', rol: 'Fierrero', avatar: '👷🏻‍♂️', pitch: 0.95 },
    contexto: 'La obra queda junto a un estero. La volqueta para llevar escombros se atrasó.',
    pasos: [
      { dice: 'Inge, botemos los escombros en el estero, nadie se va a dar cuenta.', opciones: [
        { t: 'No: los acopiamos en un sitio delimitado de la obra hasta llevarlos a la escombrera autorizada.', p: 2, r: 'Bueno, los amontono atrás.', fb: 'Arrojar escombros a cuerpos de agua contamina y es sancionado.' },
        { t: 'Está bien, solo esta vez.', p: 0, r: '(El estero se contamina.)', fb: 'Es una infracción ambiental.' },
        { t: 'Los quemamos.', p: 0, r: '…', fb: 'La quema genera contaminación del aire y es prohibida.' }
      ]},
      { dice: '¿Qué hacemos con los restos de madera y metal?', opciones: [
        { t: 'Separar los residuos: reutilizar la madera de encofrado y vender o reciclar el metal.', p: 2, r: 'La madera sirve para otra obra.', fb: 'Separar en la fuente permite reutilizar y reciclar.' },
        { t: 'Mezclarlo todo con los escombros.', p: 1, r: '…', fb: 'Se pierde la oportunidad de reciclar.' },
        { t: 'Enterrarlos en el terreno.', p: 0, r: '…', fb: 'Afecta el suelo y futuras construcciones.' }
      ]},
      { dice: '¿Y el cemento que sobra al lavar la concretera?', opciones: [
        { t: 'Lavar en una poza de sedimentación lejos del estero y disponer el residuo sólido con los escombros.', p: 2, r: 'Hago la poza ahora.', fb: 'El agua con cemento es alcalina y daña la vida acuática.' },
        { t: 'Lavar directamente en el estero.', p: 0, r: '…', fb: 'Contamina el agua.' },
        { t: 'No lavar la concretera.', p: 1, r: 'Se va a dañar…', fb: 'El equipo se deteriora; hay que lavarlo de forma controlada.' }
      ]}
    ]
  },
  {
    id: 'columna', titulo: 'El cliente quiere eliminar una columna',
    asignaturas: ['C-P-204', 'C-B-101'],
    persona: { nombre: 'Sra. Martínez', rol: 'Propietaria', avatar: '👩🏻', pitch: 1.15 },
    contexto: 'La propietaria quiere quitar una columna de la sala para tener un espacio más amplio.',
    pasos: [
      { dice: 'Esa columna estorba en mi sala. Quítela, ¿sí?', opciones: [
        { t: 'Le explico que la columna transmite cargas a la cimentación y que eliminarla sin un rediseño pone en riesgo la vivienda, sobre todo ante sismos.', p: 2, r: 'No sabía que era tan importante…', fb: 'Las columnas son parte del sistema estructural sismorresistente.' },
        { t: 'La quito; el cliente siempre tiene la razón.', p: 0, r: '¡Gracias!', fb: 'Comprometer la estructura es una falta técnica y ética grave.' },
        { t: 'Le digo que no se puede y no explico.', p: 1, r: '¿Por qué no?', fb: 'Explicar las razones técnicas ayuda a tomar decisiones.' }
      ]},
      { dice: '¿Y no hay ninguna forma?', opciones: [
        { t: 'Propongo consultar al ingeniero estructural para evaluar alternativas (viga de mayor luz) con planos, permiso y presupuesto.', p: 2, r: 'Hagámoslo bien entonces.', fb: 'Los cambios estructurales los diseña un profesional y se formalizan.' },
        { t: 'Ponemos una viga de madera en su lugar.', p: 0, r: '…', fb: 'Una solución improvisada sin cálculo es peligrosa.' },
        { t: 'Le digo que lo haremos después de la entrega.', p: 0, r: '…', fb: 'Postergar no elimina el riesgo.' }
      ]},
      { dice: '(Si decide no hacer el cambio.)', opciones: [
        { t: 'Le sugiero integrar la columna al diseño interior y registro la decisión en el diario de obra.', p: 2, r: '¡Me gusta la idea!', fb: 'Se respeta la estructura y se documenta la decisión.' },
        { t: 'No registro nada.', p: 1, r: '…', fb: 'Documentar las decisiones evita malentendidos.' },
        { t: 'Le cobro igual el cambio.', p: 0, r: '¿Por qué?', fb: 'No es ético cobrar trabajos no realizados.' }
      ]}
    ]
  },
  {
    id: 'ladera', titulo: 'Un terreno en ladera junto a una quebrada',
    asignaturas: ['C-P-402', 'C-P-104'],
    persona: { nombre: 'Sr. Tapuy', rol: 'Propietario del terreno', avatar: '👨🏽', pitch: 0.9 },
    contexto: 'El terreno tiene una pendiente fuerte, un relleno reciente y una quebrada al fondo.',
    pasos: [
      { dice: 'Quiero construir aquí mismo, al borde, para tener la vista.', opciones: [
        { t: 'Antes de diseñar, propongo un levantamiento topográfico, análisis de pendientes, estudio de suelos y revisar en el municipio si el área es urbanizable y sus retiros a la quebrada.', p: 2, r: 'Está bien, hagamos los estudios.', fb: 'El análisis de sitio define si y dónde se puede construir.' },
        { t: 'Construyo al borde como pide.', p: 0, r: '¡Perfecto!', fb: 'Los bordes de quebrada y los rellenos tienen riesgo de deslizamiento.' },
        { t: 'Le digo que en ladera nunca se puede construir.', p: 1, r: '¿Nunca?', fb: 'Sí se puede, con estudios y obras de estabilización adecuadas.' }
      ]},
      { dice: 'El suelo es un relleno de hace un año.', opciones: [
        { t: 'Recomiendo cimentar en suelo natural firme o con la solución que indique el estudio geotécnico, no sobre el relleno sin compactación controlada.', p: 2, r: 'Entiendo.', fb: 'Un relleno no controlado puede asentarse.' },
        { t: 'Cimentar sobre el relleno porque ya está "asentado".', p: 0, r: '…', fb: 'Sin control de compactación no se conoce su capacidad.' },
        { t: 'Poner más hierro en las zapatas.', p: 1, r: '…', fb: 'Más acero no resuelve un suelo inadecuado.' }
      ]},
      { dice: '¿Qué más hay que considerar?', opciones: [
        { t: 'Drenaje de aguas lluvias, muros de contención diseñados, y respetar el retiro a la quebrada.', p: 2, r: 'Así lo haremos.', fb: 'El agua es la principal causa de deslizamientos en laderas.' },
        { t: 'Nada más.', p: 0, r: '…', fb: 'Faltan drenajes y contención.' },
        { t: 'Solo sembrar plantas.', p: 1, r: '…', fb: 'La vegetación ayuda, pero no reemplaza el drenaje ni la contención.' }
      ]}
    ]
  },
  {
    id: 'amazonica', titulo: 'Una casa comunal amazónica',
    asignaturas: ['C-B-102', 'C-B-302', 'C-B-202'],
    persona: { nombre: 'Doña Rosa', rol: 'Dirigente comunitaria', avatar: '👩🏽‍🦳', pitch: 1.15 },
    contexto: 'Una comunidad kichwa de Pastaza quiere construir una casa comunal con materiales de la zona.',
    pasos: [
      { dice: 'Queremos una casa comunal con materiales de aquí, como antes se hacía.', opciones: [
        { t: 'Escucho los saberes de la comunidad y propongo combinarlos con técnicas actuales: madera o guadúa tratadas, estructura elevada y cubierta ventilada.', p: 2, r: '¡Eso es lo que queremos!', fb: 'Integrar saberes locales y técnica mejora la pertinencia y la durabilidad.' },
        { t: 'Mejor hagamos todo de bloque y hormigón.', p: 1, r: 'No es lo que imaginamos…', fb: 'Es viable, pero no responde a la propuesta de la comunidad ni al clima.' },
        { t: 'La madera no sirve para construir.', p: 0, r: '…', fb: 'Bien tratada y protegida, la madera es un material estructural.' }
      ]},
      { dice: '¿Cómo evitamos que la humedad y los insectos dañen la madera?', opciones: [
        { t: 'Tratamiento preservante de la madera o guadúa, elevar la estructura del suelo sobre bases y proteger con aleros amplios.', p: 2, r: 'Así durará muchos años.', fb: 'Proteger de la humedad del suelo y la lluvia es clave en la Amazonía.' },
        { t: 'Enterrar los postes directamente en el suelo.', p: 0, r: '…', fb: 'Los postes enterrados se pudren rápidamente.' },
        { t: 'Pintar la madera.', p: 1, r: '…', fb: 'La pintura ayuda, pero no reemplaza el tratamiento preservante.' }
      ]},
      { dice: '¿Cómo lo organizamos?', opciones: [
        { t: 'Planificar con la comunidad, usar minga para la mano de obra y obtener madera de manejo forestal legal.', p: 2, r: '¡Nos organizamos en minga!', fb: 'La participación comunitaria y la madera legal hacen el proyecto sostenible.' },
        { t: 'Talar los árboles más grandes del bosque cercano.', p: 0, r: '…', fb: 'La tala sin manejo afecta el bosque y puede ser ilegal.' },
        { t: 'Contratar todo afuera.', p: 1, r: '…', fb: 'Se pierde la apropiación comunitaria.' }
      ]}
    ]
  }
];
