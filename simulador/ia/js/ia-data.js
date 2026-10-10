/* =========================================================
   Datos del simulador de la carrera de Inteligencia Artificial
   (Tecnología Superior, modalidad en línea, 4 períodos – ISTCY).
   Fuente curricular: malla, perfil de egreso y contenidos mínimos
   del proyecto de carrera.
   Los clientes del simulador (Cooperativa Sumak Tarpuy y GAD
   Municipal de Yanayaku) son ficticios. Las referencias a la Ley
   Orgánica de Protección de Datos Personales (LOPDP) son generales
   y formativas; deben validarse con la normativa vigente.
   ========================================================= */

const NIVELES = [
  { id: 'basico', nombre: 'Básico', emoji: '🟢', desc: 'Presupuesto de cómputo y plazo holgados; pocos imprevistos.', ev: 0.22, presupuesto: 4800, plazo: 64 },
  { id: 'intermedio', nombre: 'Intermedio', emoji: '🟡', desc: 'Condiciones realistas y algunos imprevistos.', ev: 0.38, presupuesto: 4300, plazo: 58 },
  { id: 'avanzado', nombre: 'Avanzado', emoji: '🔴', desc: 'Presupuesto ajustado, plazo corto y muchos imprevistos.', ev: 0.55, presupuesto: 3900, plazo: 53 }
];

const MODS = {
  proy: { nombre: 'Proyecto de IA', emoji: '🤖' },
  lab: { nombre: 'Laboratorio', emoji: '🧪' },
  resp: { nombre: 'IA responsable', emoji: '⚖️' },
  casos: { nombre: 'Casos', emoji: '🤝' }
};

const MALLA_IA = [
  { cod: 'IA-01', n: 'Fundamentos de Programación', pao: 1, u: 'Básica', mod: ['lab', 'proy'], rel: 'directa', sim: 'Algoritmos y lógica de programación, variables y tipos de datos, estructuras de control, funciones básicas e introducción a Python: lectura de la salida de programas.' },
  { cod: 'IA-02', n: 'Matemática Aplicada para Tecnología', pao: 1, u: 'Básica', mod: ['lab'], rel: 'directa', sim: 'Álgebra básica, funciones, matrices y vectores y nociones de cálculo aplicadas a datos: productos de matrices y cálculos con fórmulas.' },
  { cod: 'IA-03', n: 'Introducción a la Inteligencia Artificial', pao: 1, u: 'Básica', mod: ['proy', 'resp'], rel: 'directa', sim: 'Conceptos, historia y tipos de IA, aplicaciones por sector y herramientas básicas: comprender el problema del cliente y elegir si la IA es adecuada.' },
  { cod: 'IA-04', n: 'Bases de Datos', pao: 1, u: 'Básica', mod: ['lab', 'proy'], rel: 'directa', sim: 'Modelos de datos, tablas, SQL básico y consultas: obtener los datos del cliente y leer consultas SELECT, WHERE, GROUP BY y JOIN.' },
  { cod: 'IA-05', n: 'Comunicación y Cultura Digital', pao: 1, u: 'Básica', mod: ['resp', 'casos', 'proy'], rel: 'directa', sim: 'Comunicación digital, herramientas colaborativas, alfabetización y ciudadanía digital y seguridad básica en internet: coordinar al equipo y presentar al cliente.' },
  { cod: 'IA-06', n: 'Programación para Ciencia de Datos', pao: 2, u: 'Profesional', mod: ['lab', 'proy'], rel: 'directa', sim: 'Python para datos con NumPy y Pandas, lectura y escritura de archivos y manipulación de tablas: preparar el conjunto de datos del proyecto.' },
  { cod: 'IA-07', n: 'Estadística Aplicada', pao: 2, u: 'Profesional', mod: ['lab', 'proy'], rel: 'directa', sim: 'Estadística descriptiva, tendencia central, dispersión, gráficos y probabilidades: cálculo de media, mediana y desviación estándar.' },
  { cod: 'IA-08', n: 'Procesamiento de Datos', pao: 2, u: 'Profesional', mod: ['proy', 'lab'], rel: 'directa', sim: 'Tipos de datos, limpieza, transformación y almacenamiento: tratar faltantes, duplicados y valores atípicos sin introducir errores.' },
  { cod: 'IA-09', n: 'Visualización de Datos', pao: 2, u: 'Profesional', mod: ['proy'], rel: 'directa', sim: 'Principios de visualización, gráficos y dashboards e interpretación visual: explorar los datos y presentar resultados al cliente.' },
  { cod: 'IA-10', n: 'Ética y Uso Responsable de la Inteligencia Artificial', pao: 2, u: 'Profesional', mod: ['resp', 'casos', 'proy'], rel: 'directa', sim: 'Ética digital, privacidad, seguridad de la información, sesgos en IA y buenas prácticas: revisión de equidad y privacidad antes de desplegar.' },
  { cod: 'IA-11', n: 'Aprendizaje Automático Aplicado', pao: 3, u: 'Profesional', mod: ['proy', 'lab', 'casos'], rel: 'directa', sim: 'Conceptos y tipos de aprendizaje, preparación de datos y librerías de ML: entrenar, validar y evaluar con precisión, recall, F1 y exactitud; detectar sobreajuste.' },
  { cod: 'IA-12', n: 'Minería de Datos', pao: 3, u: 'Profesional', mod: ['proy', 'lab'], rel: 'directa', sim: 'Técnicas de exploración, clasificación básica y agrupamiento: descubrir patrones en los datos del cliente.' },
  { cod: 'IA-13', n: 'Procesamiento de Lenguaje Natural', pao: 3, u: 'Profesional', mod: ['resp', 'proy', 'casos'], rel: 'directa', sim: 'Procesamiento de texto, tokenización, análisis de palabras y aplicaciones de PLN: clasificación de solicitudes y chatbots comprensibles.' },
  { cod: 'IA-14', n: 'Automatización de Procesos con Inteligencia Artificial', pao: 3, u: 'Profesional', mod: ['proy'], rel: 'directa', sim: 'Scripts, herramientas de automatización e integración de procesos: automatizar la carga de datos y el reentrenamiento.' },
  { cod: 'IA-15', n: 'Computación en la Nube', pao: 3, u: 'Profesional', mod: ['proy', 'resp'], rel: 'directa', sim: 'Servicios, almacenamiento y plataformas cloud con seguridad básica: desplegar el modelo, controlar costos y responder a caídas del servicio.' },
  { cod: 'IA-16', n: 'Aplicaciones de Inteligencia Artificial', pao: 4, u: 'Profesional', mod: ['proy', 'casos', 'resp'], rel: 'directa', sim: 'Reconocimiento de patrones y aplicaciones en industria y servicios: elegir la aplicación adecuada para el cliente y valorar su impacto.' },
  { cod: 'IA-17', n: 'Big Data y Análisis de Información', pao: 4, u: 'Profesional', mod: ['resp', 'lab'], rel: 'directa', sim: 'Conceptos de Big Data, almacenamiento y procesamiento masivo y herramientas de análisis: las V del Big Data y el procesamiento distribuido.' },
  { cod: 'IA-18', n: 'Seguridad de la Información y Protección de Datos', pao: 4, u: 'Profesional', mod: ['resp', 'casos', 'proy'], rel: 'directa', sim: 'Seguridad informática, protección de datos personales, riesgos digitales y medidas de seguridad: responder a fugas de datos y credenciales expuestas.' },
  { cod: 'IA-19', n: 'Integración de Sistemas Inteligentes', pao: 4, u: 'Profesional', mod: ['proy', 'resp'], rel: 'directa', sim: 'APIs, conexión de aplicaciones y herramientas de integración: publicar el modelo como servicio e integrarlo con los sistemas del cliente.' },
  { cod: 'IA-20', n: 'Trabajo de Integración Curricular', pao: 4, u: 'Profesional', mod: ['proy'], rel: 'directa', sim: 'Identificación del problema, desarrollo práctico, documentación del proceso y presentación del proyecto: el proyecto completo para un cliente real.' }
];

/* Equipo virtual */
const EQUIPO = [
  { id: 'analista', nombre: 'Luis Shiguango', rol: 'Analista de datos', avatar: '🧑🏽‍💻', pitch: 0.95 },
  { id: 'dev', nombre: 'Carla Vargas', rol: 'Desarrolladora', avatar: '👩🏻‍💻', pitch: 1.2 },
  { id: 'etica', nombre: 'Dra. Rosa Santi', rol: 'Especialista en ética y datos', avatar: '👩🏽‍⚖️', pitch: 1.05 }
];

/* Clientes posibles (ficticios). Las fases usan las marcas {cliente}, {problema}, {datos}, {modelo}, {metrica}, {grupo}, {sensible}. */
const PROYECTOS = [
  { id: 'coop', emoji: '🌱', nombre: 'Predecir la demanda de una cooperativa agrícola', cliente: 'Cooperativa Agroproductiva Sumak Tarpuy',
    contacto: { nombre: 'Sra. Mercedes Tanguila', rol: 'Gerenta de la cooperativa', avatar: '👩🏽‍🌾', pitch: 1.1 },
    problema: 'predecir la demanda semanal de cacao y naranjilla para planificar el acopio y el transporte desde las comunidades',
    datos: 'los registros de acopio y ventas de tres años, el clima y el calendario de ferias',
    modelo: 'un modelo de regresión (bosque aleatorio) con validación temporal y un modelo base de promedio móvil',
    metrica: 'el error absoluto medio (MAE) y el porcentaje de error frente al modelo base',
    grupo: 'los socios de comunidades alejadas que entregan pocos quintales',
    sensible: 'las cédulas, teléfonos y ubicación de las fincas de los socios',
    desc: 'Cooperativa de productores de cacao y naranjilla de Pastaza. Quiere saber cuánto producto llegará cada semana para contratar transporte y negociar con compradores.' },
  { id: 'gad', emoji: '🏛️', nombre: 'Clasificar solicitudes ciudadanas', cliente: 'GAD Municipal de Yanayaku',
    contacto: { nombre: 'Ing. Patricio Vargas', rol: 'Director de Atención Ciudadana', avatar: '👨🏽‍💼', pitch: 0.95 },
    problema: 'clasificar automáticamente las solicitudes ciudadanas (vías, agua, ambiente, catastro) y derivarlas al departamento correcto',
    datos: 'ocho mil solicitudes históricas escritas por la ciudadanía y el departamento que las atendió',
    modelo: 'un clasificador de texto (TF-IDF con regresión logística) comparado con un modelo base de palabras clave',
    metrica: 'la precisión, el recall y el F1 por categoría con la matriz de confusión',
    grupo: 'las solicitudes escritas en kichwa o con errores de ortografía',
    sensible: 'los nombres, cédulas y direcciones de los ciudadanos',
    desc: 'Municipio amazónico (ficticio) que recibe cientos de solicitudes por semana. Las mal derivadas se demoran días en llegar al departamento correcto.' }
];

/* ---------------- FASES DEL PROYECTO ----------------
   Efectos (ef): dias, costo (USD de cómputo y servicios), prec (precisión del modelo), equi (equidad),
   priv (privacidad y seguridad), sat (satisfacción del cliente), registro (documentación), etica (revisión ética), cond */
const FASES = [
  { fase: 'Entender el problema', lider: 'analista', q: 'Primera reunión virtual con {cliente}. ¿Cómo empiezas?', o: [
    { t: 'Entrevisto al cliente para definir el objetivo ({problema}), quién usará el resultado, la métrica de éxito y el alcance, y lo dejo por escrito.', p: 2, fb: 'Un problema bien definido, con métrica de éxito y alcance acordados, orienta todo el proyecto y evita construir algo que nadie usará.', ef: { dias: 4, costo: 0, sat: 10, prec: 4, registro: 1 } },
    { t: 'Pido que nos envíen todos los datos que tengan, por si acaso, y luego vemos qué se puede hacer.', p: 1, fb: 'Pedir datos sin un objetivo viola el principio de minimización: solo se recolectan los datos necesarios para una finalidad definida.', ef: { dias: 3, costo: 0, priv: -8, sat: 2 } },
    { t: 'Ya sé qué necesitan: empiezo a programar un modelo de inmediato para impresionarlos.', p: 0, fb: 'Sin entender el problema se resuelve la pregunta equivocada; la IA no es la respuesta a todo y primero hay que validar la necesidad.', ef: { dias: 1, costo: 50, sat: -10, prec: -6 } }
  ]},
  { fase: 'Obtener los datos', lider: 'etica', q: 'Para el proyecto se necesitan {datos}. ¿Cómo los obtienes?', o: [
    { t: 'Firmo un acuerdo de uso de datos con el cliente, verifico la base legal y el consentimiento, pido solo los campos necesarios y seudonimizo {sensible}.', p: 2, fb: 'La LOPDP exige una base legal (como el consentimiento) y una finalidad clara; minimizar y seudonimizar reduce el riesgo para las personas.', ef: { dias: 6, costo: 150, priv: 12, equi: 3, registro: 1 } },
    { t: 'Uso solo una hoja de cálculo de un mes que me envían por WhatsApp para avanzar rápido.', p: 1, fb: 'Un mes de datos no representa la variación real (temporadas, ferias) y el canal no es seguro para datos personales.', ef: { dias: 2, costo: 0, prec: -10, priv: -6 } },
    { t: 'Descargo información de las redes sociales de las personas para completar la base sin pedir permiso.', p: 0, fb: 'Tratar datos personales sin base legal ni consentimiento vulnera la LOPDP y la confianza del cliente y de la comunidad.', ef: { dias: 3, costo: 50, priv: -20, equi: -5, sat: -5 } }
  ]},
  { fase: 'Limpiar y preparar', lider: 'analista', q: 'Los datos llegaron con celdas vacías, duplicados, fechas en varios formatos y valores extraños. ¿Qué indicas?', o: [
    { t: 'Perfilamos los datos: tratamos faltantes con un criterio justificado, eliminamos duplicados, unificamos formatos, revisamos atípicos y documentamos cada transformación en un script reproducible.', p: 2, fb: 'La limpieza documentada y reproducible (Pandas, scripts versionados) mejora la calidad del modelo y permite repetir el proceso con datos nuevos.', ef: { dias: 7, costo: 100, prec: 14, registro: 1 } },
    { t: 'Borramos todas las filas que tengan algún vacío y seguimos.', p: 1, fb: 'Eliminar filas sin analizar puede descartar mucha información y sesgar los datos si los vacíos se concentran en un grupo.', ef: { dias: 2, costo: 20, prec: 2, equi: -8 } },
    { t: 'Rellenamos los vacíos con números inventados que parezcan razonables.', p: 0, fb: 'Inventar datos es una falta de integridad: el modelo aprende patrones falsos y los resultados pierden validez.', ef: { dias: 1, costo: 0, prec: -14, sat: -4 } }
  ]},
  { fase: 'Explorar y visualizar', lider: 'analista', q: 'Antes de modelar, ¿cómo exploras los datos?', o: [
    { t: 'Hago un análisis exploratorio: estadísticos descriptivos, distribuciones, correlaciones y gráficos adecuados, y reviso si {grupo} están bien representados.', p: 2, fb: 'El análisis exploratorio revela patrones, errores y desbalances antes de entrenar; revisar la representación de los grupos previene sesgos.', ef: { dias: 4, costo: 50, prec: 8, equi: 10, sat: 4 } },
    { t: 'Preparo un tablero muy colorido con gráficos de pastel en 3D para mostrarle al cliente.', p: 1, fb: 'Los gráficos decorativos distorsionan la lectura; una buena visualización prioriza la claridad (barras, líneas, dispersión).', ef: { dias: 3, costo: 40, sat: 3 } },
    { t: 'Me salto la exploración: el modelo encontrará solo los patrones.', p: 0, fb: 'Sin explorar no se detectan errores, fugas de información ni desbalances que luego arruinan el modelo.', ef: { dias: 0, costo: 0, prec: -8, equi: -8 } }
  ]},
  { fase: 'Elegir y entrenar el modelo', lider: 'dev', q: 'Es hora de entrenar. ¿Qué estrategia sigues?', o: [
    { t: 'Separo entrenamiento, validación y prueba; entreno primero un modelo base y luego {modelo}, ajustando con validación cruzada.', p: 2, fb: 'Comparar con un modelo base y validar con datos no vistos permite saber si el modelo realmente aporta y evita el sobreajuste.', ef: { dias: 8, costo: 900, prec: 16 } },
    { t: 'Entreno la red neuronal más grande posible en varias GPU en la nube, sin modelo base.', p: 1, fb: 'Un modelo enorme no siempre es mejor: eleva costos de cómputo y energía y, sin modelo base, no sabes si aporta.', ef: { dias: 6, costo: 1700, prec: 6 } },
    { t: 'Entreno y evalúo con los mismos datos para obtener la mejor cifra.', p: 0, fb: 'Evaluar con los datos de entrenamiento oculta el sobreajuste: el modelo memoriza y falla con datos nuevos.', ef: { dias: 4, costo: 500, prec: -14 } }
  ]},
  { fase: 'Evaluar con métricas', lider: 'analista', q: 'El modelo está entrenado. ¿Cómo lo evalúas?', o: [
    { t: 'Lo evalúo una sola vez con el conjunto de prueba, usando {metrica}, y lo comparo con el modelo base.', p: 2, fb: 'Las métricas deben elegirse según el problema; la exactitud sola engaña con clases desbalanceadas y el conjunto de prueba se usa al final.', ef: { dias: 3, costo: 150, prec: 10, registro: 1 } },
    { t: 'Reporto solo la exactitud global porque es fácil de explicar.', p: 1, fb: 'La exactitud puede ser alta aunque el modelo falle en las clases minoritarias; se necesitan métricas por clase o de error.', ef: { dias: 1, costo: 50, prec: 2, equi: -4 } },
    { t: 'Repito la prueba muchas veces y reporto solo la mejor corrida.', p: 0, fb: 'Seleccionar resultados a conveniencia es una práctica deshonesta que infla el desempeño real.', ef: { dias: 2, costo: 200, prec: -10, sat: -4 } }
  ]},
  { fase: 'Revisar sesgo, privacidad y ética', lider: 'etica', q: 'Antes de desplegar, la Dra. Santi pide una revisión de IA responsable. ¿Qué haces?', o: [
    { t: 'Comparamos las métricas por grupos (incluidos {grupo}), hacemos una evaluación de impacto en privacidad, documentamos una ficha del modelo y definimos revisión humana de los casos dudosos.', p: 2, fb: 'Medir la equidad por grupos, evaluar el impacto en la privacidad y mantener supervisión humana son pilares del uso responsable de la IA.', ef: { dias: 4, costo: 100, equi: 18, priv: 10, registro: 1, etica: 1 } },
    { t: 'Revisamos solo que los datos estén cifrados; el sesgo no aplica a este proyecto.', p: 1, fb: 'La seguridad es necesaria pero no suficiente: cualquier modelo entrenado con datos históricos puede reproducir sesgos.', ef: { dias: 2, costo: 50, priv: 8, equi: -4 } },
    { t: 'Si la precisión es buena, no hace falta ninguna revisión ética.', p: 0, fb: 'Un modelo preciso en promedio puede perjudicar a un grupo; omitir la revisión expone a las personas y al cliente.', ef: { dias: 0, costo: 0, equi: -15, priv: -8 } }
  ]},
  { fase: 'Desplegar en la nube y automatizar', lider: 'dev', q: 'El cliente quiere usar el modelo todos los días. ¿Cómo lo despliegas?', o: [
    { t: 'Publico el modelo como API en la nube, con credenciales en un gestor de secretos, cifrado, permisos mínimos, monitoreo y alertas, y un flujo automatizado de carga y reentrenamiento.', p: 2, fb: 'Una API segura y monitoreada, con automatización de datos y reentrenamiento, mantiene el servicio confiable y protege la información.', ef: { dias: 6, costo: 800, priv: 10, sat: 8, registro: 1 } },
    { t: 'Lo despliego manualmente en un servidor sin monitoreo; si falla, el cliente nos avisará.', p: 1, fb: 'Sin monitoreo ni automatización las fallas y la degradación del modelo se detectan tarde.', ef: { dias: 4, costo: 500, sat: -2 } },
    { t: 'Copio el cuaderno a un servidor público con la contraseña de la base de datos escrita en el código.', p: 0, fb: 'Las credenciales en el código se filtran con facilidad; es una de las causas más comunes de incidentes de seguridad.', ef: { dias: 2, costo: 300, priv: -20 } }
  ]},
  { fase: 'Presentar al cliente', lider: 'etica', q: 'Llega la presentación final ante {cliente}. ¿Cómo la haces?', o: [
    { t: 'Explico en lenguaje sencillo, con visualizaciones claras, qué hace el modelo, sus métricas, sus límites y riesgos, entrego la documentación y capacito al personal con un plan de mantenimiento.', p: 2, fb: 'Comunicar resultados y limitaciones con claridad, documentar y capacitar asegura que el cliente use la solución de forma correcta y responsable.', ef: { dias: 3, costo: 100, sat: 16, registro: 1 } },
    { t: 'Entrego el código y el enlace de la API por correo, sin reunión.', p: 1, fb: 'Sin explicación ni capacitación el cliente no sabrá interpretar ni mantener la solución.', ef: { dias: 1, costo: 0, sat: -4 } },
    { t: 'Les aseguro que el modelo acierta el 100 % de las veces y que ya no necesitan revisar nada.', p: 0, fb: 'Ningún modelo es infalible; prometer lo imposible es engañoso y elimina la supervisión humana necesaria.', ef: { dias: 1, costo: 0, sat: -14, equi: -6 } }
  ]}
];

const EVENTOS = [
  { id: 'faltantes', txt: 'Al revisar los datos, el 30 % de los registros de una columna clave está vacío.', voz: 'Oye, a la columna principal le falta casi un tercio de los datos.', quien: 'analista', o: [
    { t: 'Analizar por qué faltan, consultar al cliente si hay una fuente de respaldo y elegir una imputación justificada o excluir la variable, documentándolo.', p: 2, fb: 'Entender el patrón de los faltantes evita sesgos; la decisión se justifica y documenta.', ef: { dias: 2, costo: 50, prec: 6, registro: 1 } },
    { t: 'Rellenar todo con ceros sin decir nada.', p: 0, fb: 'Un cero no es un dato faltante: distorsiona las medias y el modelo aprende algo falso.', ef: { prec: -10 } }
  ]},
  { id: 'fuga', txt: 'Alguien dejó una copia del archivo con datos personales en una carpeta compartida con enlace público.', voz: '¡Atención! El archivo con datos personales quedó con enlace público.', quien: 'etica', o: [
    { t: 'Cerrar el acceso de inmediato, revisar quién lo descargó, cambiar credenciales, informar al cliente y seguir el protocolo de notificación de vulneraciones de la LOPDP.', p: 2, fb: 'Contener, evaluar, notificar y aprender: la LOPDP obliga a gestionar y notificar las vulneraciones de seguridad de datos personales.', ef: { dias: 2, costo: 100, priv: 6, sat: 2, registro: 1 } },
    { t: 'Borrar el archivo en silencio y no contarle a nadie.', p: 0, fb: 'Ocultar una vulneración impide proteger a los afectados y es una falta grave.', ef: { priv: -20, sat: -8 } }
  ]},
  { id: 'sobreajuste', txt: 'El modelo logra 99 % en entrenamiento pero solo 61 % en validación.', voz: 'Mira esto: en entrenamiento es perfecto, pero con datos nuevos se cae.', quien: 'dev', o: [
    { t: 'Reconocer el sobreajuste: simplificar el modelo, regularizar, revisar fugas de información entre variables y usar validación cruzada.', p: 2, fb: 'La brecha entre entrenamiento y validación es la señal típica del sobreajuste; se corrige reduciendo la complejidad y revisando los datos.', ef: { dias: 3, costo: 200, prec: 10 } },
    { t: 'Presentar el 99 % al cliente: es la cifra más alta.', p: 0, fb: 'Reportar el desempeño de entrenamiento es engañoso: con datos reales el modelo fallará.', ef: { prec: -12, sat: -6 } }
  ]},
  { id: 'requisitos', txt: 'El cliente cambia los requisitos: ahora quiere resultados por cantón y una categoría nueva.', voz: 'Disculpen, el directorio pidió agregar algo más al proyecto.', quien: 'cliente', o: [
    { t: 'Escuchar, analizar el impacto en datos, plazo y costo, y acordar por escrito el cambio de alcance y su prioridad.', p: 2, fb: 'La gestión del cambio de alcance evita retrasos sin control y mantiene la confianza del cliente.', ef: { dias: 3, costo: 150, sat: 8, registro: 1 } },
    { t: 'Decir que sí a todo sin revisar el plazo ni el presupuesto.', p: 0, fb: 'Aceptar cambios sin evaluarlos genera retrasos, sobrecostos y un producto de menor calidad.', ef: { dias: 8, costo: 500, prec: -4, sat: -4 } }
  ]},
  { id: 'caida', txt: 'El servicio en la nube se cayó y el cliente no puede usar el modelo.', voz: 'La API no responde y el cliente ya llamó dos veces.', quien: 'dev', o: [
    { t: 'Activar el plan de contingencia: revisar alertas y registros, restaurar desde el respaldo, informar al cliente con tiempos estimados y documentar la causa.', p: 2, fb: 'Monitoreo, respaldos y comunicación transparente reducen el tiempo de caída y el impacto en el cliente.', ef: { dias: 1, costo: 150, sat: 2, registro: 1, cond: 'respaldo' } },
    { t: 'Esperar a que se arregle solo y no responder al cliente.', p: 0, fb: 'Sin respuesta ni plan de contingencia el cliente pierde la confianza en la solución.', ef: { dias: 3, sat: -15 } }
  ]},
  { id: 'sesgo', txt: 'Las métricas por grupos muestran que el modelo se equivoca el doble con {grupo}.', voz: 'Revisé los resultados por grupos y hay una diferencia preocupante.', quien: 'etica', o: [
    { t: 'Investigar la causa (pocos datos o variables que actúan como sustitutos), recolectar o rebalancear datos, reentrenar y documentar la mejora.', p: 2, fb: 'Corregir la representación de los datos y medir de nuevo por grupos reduce el sesgo de forma verificable.', ef: { dias: 3, costo: 200, equi: 14, registro: 1 } },
    { t: 'Ignorarlo: son pocos casos y el promedio general es bueno.', p: 0, fb: 'Un buen promedio puede esconder daños a un grupo; ignorarlo es discriminación por omisión.', ef: { equi: -16, sat: -4 } }
  ]},
  { id: 'factura', txt: 'La factura de la nube se disparó: una instancia con GPU quedó encendida todo el fin de semana.', voz: 'Uy… dejé la GPU encendida desde el viernes.', quien: 'dev', o: [
    { t: 'Apagar los recursos sin uso, configurar alertas de presupuesto y apagado automático, y registrar la lección aprendida.', p: 2, fb: 'Las alertas de costo y el apagado automático son buenas prácticas de gestión de la nube.', ef: { dias: 0, costo: 250, registro: 1 } },
    { t: 'Dejarla encendida para no tener que configurarla de nuevo.', p: 0, fb: 'Los recursos ociosos consumen presupuesto y energía sin aportar valor.', ef: { costo: 900 } }
  ]}
];

/* ---------------- utilidades de los bancos ---------------- */
function rndI(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function mezclar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function mc(q, ok, malas, exp, asig) { const o = mezclar([ok, ...malas]); return { q, o, c: o.indexOf(ok), exp, asig }; }
const coma = n => String(n).replace('.', ',');
const r2 = n => Math.round(n * 100) / 100;

/* ---------------- 🧪 LABORATORIO DE PROGRAMACIÓN Y DATOS ---------------- */
const LAB_BANCO = [
  () => { const a = rndI(2, 6); return mc(`¿Qué imprime este código Python?\nx = [${Array.from({ length: a }, () => rndI(1, 9)).join(', ')}]\nprint(len(x))`, String(a), [String(a + 1), String(a - 1), 'Error'], `len() devuelve la cantidad de elementos de la lista: ${a}.`, 'IA-01'); },
  () => mc('¿Qué imprime print(type(3.5)) en Python?', "<class 'float'>", ["<class 'int'>", "<class 'str'>", "<class 'decimal'>"], '3.5 es un número de punto flotante (float).', 'IA-01'),
  () => mc('¿Qué imprime este código?\nfor i in range(3):\n    print(i)', '0, 1 y 2 (uno por línea)', ['1, 2 y 3', '0, 1, 2 y 3', 'Solo 3'], 'range(3) genera 0, 1 y 2: empieza en 0 y no incluye el 3.', 'IA-01'),
  () => mc('¿Qué imprime print(17 // 5, 17 % 5)?', '3 2', ['3.4 0', '2 3', '3 3'], '// es la división entera (3) y % es el residuo (2).', 'IA-01'),
  () => mc('Con def f(a, b=2): return a * b, ¿qué imprime print(f(4))?', '8', ['6', '4', 'Error porque falta b'], 'b toma su valor por defecto (2), así que 4 × 2 = 8.', 'IA-01'),
  () => mc('En Pandas, df.isnull().sum() sirve para…', 'Contar los valores faltantes de cada columna', ['Sumar todos los valores de la tabla', 'Borrar las filas vacías', 'Contar las filas duplicadas'], 'isnull() marca los vacíos y sum() los cuenta por columna: es el primer paso de la limpieza.', 'IA-06'),
  () => mc('En NumPy, ¿qué resulta de np.array([1, 2, 3]) * 2?', 'array([2, 4, 6])', ['array([1, 2, 3, 1, 2, 3])', 'array([3, 4, 5])', 'Error'], 'NumPy opera elemento por elemento (vectorización); una lista de Python se repetiría.', 'IA-06'),
  () => mc("¿Qué devuelve SELECT COUNT(*) FROM socios WHERE canton = 'Pastaza';?", 'La cantidad de socios cuyo cantón es Pastaza', ['Los nombres de todos los socios', 'La suma de los cantones', 'Las columnas de la tabla socios'], 'COUNT(*) cuenta las filas que cumplen la condición del WHERE.', 'IA-04'),
  () => mc('En SQL, ¿qué cláusula agrupa filas para calcular totales por categoría?', 'GROUP BY', ['ORDER BY', 'WHERE', 'DELETE'], 'GROUP BY agrupa y se combina con funciones como SUM, AVG o COUNT.', 'IA-04'),
  () => mc('En una base de datos relacional, la clave primaria…', 'Identifica de forma única cada fila de una tabla', ['Cifra la tabla', 'Ordena las columnas alfabéticamente', 'Permite valores repetidos'], 'La clave primaria no se repite y permite relacionar tablas con claves foráneas (JOIN).', 'IA-04'),
  () => mc('Si unos datos de ingresos tienen valores atípicos muy altos, ¿qué medida de tendencia central es más robusta?', 'La mediana', ['La media', 'El máximo', 'La suma'], 'La mediana no se deja arrastrar por los extremos como la media.', 'IA-07'),
  () => mc('Un modelo obtiene 99 % en entrenamiento y 60 % en prueba. Esto indica…', 'Sobreajuste: memorizó los datos de entrenamiento', ['Que el modelo es excelente', 'Subajuste por falta de complejidad', 'Que los datos de prueba están mal'], 'La gran brecha entre entrenamiento y prueba es la señal típica del sobreajuste.', 'IA-11'),
  () => mc('¿Para qué se separa un conjunto de prueba antes de entrenar?', 'Para estimar el desempeño con datos que el modelo nunca vio', ['Para entrenar más rápido', 'Para tener más datos de entrenamiento', 'Para borrar datos erróneos'], 'Evaluar con datos no vistos estima cómo funcionará el modelo en la realidad.', 'IA-11'),
  () => mc('Al multiplicar una matriz de 2×3 por una de 3×4, el resultado es una matriz de…', '2×4', ['3×3', '2×3', 'No se puede multiplicar'], 'Las columnas de la primera (3) deben coincidir con las filas de la segunda; el resultado toma filas de la primera y columnas de la segunda.', 'IA-02'),
  () => mc('Un coeficiente de correlación r = −0,9 entre lluvia y ventas indica…', 'Una relación lineal fuerte e inversa', ['Que la lluvia causa las ventas', 'Que no hay relación', 'Una relación débil y directa'], 'r cercano a −1 indica relación inversa fuerte; correlación no implica causalidad.', 'IA-07'),
  () => mc('En un detector de solicitudes urgentes, ¿cuándo conviene priorizar el recall?', 'Cuando es grave dejar pasar un caso positivo sin detectar', ['Cuando los falsos positivos son muy costosos', 'Nunca, solo importa la exactitud', 'Cuando hay pocos datos'], 'Recall = VP / (VP + FN): mide cuántos positivos reales detecta el modelo.', 'IA-11'),
  // cálculos con datos aleatorios
  () => { const v = Array.from({ length: 5 }, () => rndI(12, 60)); const m = r2(v.reduce((a, b) => a + b, 0) / v.length); return { q: `La cooperativa acopió estos quintales de cacao en 5 semanas: ${v.join(', ')}. ¿Cuál es la media? (dos decimales)`, num: m, tol: 0.01, exp: `Media = (${v.join(' + ')}) ÷ 5 = ${v.reduce((a, b) => a + b, 0)} ÷ 5 = ${coma(m)}.`, asig: 'IA-07' }; },
  () => { const v = Array.from({ length: 4 }, () => rndI(2, 12) * 2); const m = v.reduce((a, b) => a + b, 0) / v.length; const d = r2(Math.sqrt(v.reduce((a, x) => a + (x - m) ** 2, 0) / v.length)); return { q: `Datos: ${v.join(', ')}. ¿Cuál es la desviación estándar poblacional? (σ = raíz del promedio de (x − media)²; dos decimales)`, num: d, tol: 0.02, exp: `Media = ${coma(r2(m))}. Desviaciones al cuadrado: ${v.map(x => coma(r2((x - m) ** 2))).join(', ')}. Varianza = ${coma(r2(v.reduce((a, x) => a + (x - m) ** 2, 0) / v.length))}; σ = ${coma(d)}.`, asig: 'IA-07' }; },
  () => { const vp = rndI(30, 80), fp = rndI(5, 25), fn = rndI(5, 25), vn = rndI(60, 150); const p = r2(vp / (vp + fp) * 100); return { q: `Matriz de confusión de un clasificador de solicitudes urgentes: VP = ${vp}, FP = ${fp}, FN = ${fn}, VN = ${vn}. ¿Cuál es la precisión en %? (dos decimales)`, num: p, tol: 0.05, exp: `Precisión = VP ÷ (VP + FP) = ${vp} ÷ ${vp + fp} = ${coma(p)} %.`, asig: 'IA-11' }; },
  () => { const vp = rndI(30, 80), fp = rndI(5, 25), fn = rndI(5, 25), vn = rndI(60, 150); const r = r2(vp / (vp + fn) * 100); return { q: `Matriz de confusión: VP = ${vp}, FP = ${fp}, FN = ${fn}, VN = ${vn}. ¿Cuál es el recall (sensibilidad) en %? (dos decimales)`, num: r, tol: 0.05, exp: `Recall = VP ÷ (VP + FN) = ${vp} ÷ ${vp + fn} = ${coma(r)} %.`, asig: 'IA-11' }; },
  () => { const p = rndI(55, 95) / 100, r = rndI(50, 95) / 100; const f = r2(2 * p * r / (p + r)); return { q: `Un modelo tiene precisión ${coma(p)} y recall ${coma(r)}. ¿Cuál es su F1? (F1 = 2·P·R / (P + R); dos decimales)`, num: f, tol: 0.01, exp: `F1 = 2 × ${coma(p)} × ${coma(r)} ÷ (${coma(p)} + ${coma(r)}) = ${coma(f)}.`, asig: 'IA-11' }; },
  () => { const vp = rndI(30, 90), fp = rndI(3, 20), fn = rndI(3, 20), vn = rndI(50, 120); const t = vp + fp + fn + vn; const e = r2((vp + vn) / t * 100); return { q: `Matriz de confusión: VP = ${vp}, FP = ${fp}, FN = ${fn}, VN = ${vn}. ¿Cuál es la exactitud (accuracy) en %? (dos decimales)`, num: e, tol: 0.05, exp: `Exactitud = (VP + VN) ÷ total = (${vp} + ${vn}) ÷ ${t} = ${coma(e)} %.`, asig: 'IA-11' }; },
  () => { const d = Array.from({ length: 5 }, () => rndI(1, 12)), k = rndI(3, 7); const s = d.filter(x => x > k).reduce((a, x) => a + x * 2, 0); return { q: `¿Qué número imprime este código Python?\ndatos = [${d.join(', ')}]\nprint(sum(x * 2 for x in datos if x > ${k}))`, num: s, tol: 0, exp: `Se toman los valores mayores que ${k} (${d.filter(x => x > k).join(', ') || 'ninguno'}), se duplican y se suman: ${s}.`, asig: 'IA-01' }; },
  () => { const a = rndI(1, 6), b = rndI(1, 6), c = rndI(1, 6), d = rndI(1, 6), x = rndI(1, 5), y = rndI(1, 5); return { q: `Sea A = [[${a}, ${b}], [${c}, ${d}]] y el vector v = [${x}, ${y}]. ¿Cuál es el primer elemento del producto A·v?`, num: a * x + b * y, tol: 0, exp: `Primera fila por el vector: ${a}·${x} + ${b}·${y} = ${a * x + b * y}.`, asig: 'IA-02' }; }
];

/* ---------------- ⚖️ IA RESPONSABLE Y SEGURIDAD ---------------- */
const RESP_BANCO = [
  () => mc('Un modelo de crédito entrenado con decisiones históricas rechaza más a mujeres de zonas rurales. ¿Cuál es la causa más probable?', 'Sesgo en los datos históricos que el modelo aprendió y reprodujo', ['Un error de la computadora', 'Que las mujeres rurales pagan menos', 'Que el modelo tiene demasiados datos'], 'Los modelos aprenden de los datos: si las decisiones pasadas fueron injustas, el modelo las replica.', 'IA-10'),
  () => mc('Según la LOPDP de Ecuador, en términos generales, para tratar datos personales se necesita…', 'Una base legal, como el consentimiento libre, específico e informado del titular', ['Solo que los datos estén en internet', 'Permiso verbal de cualquier funcionario', 'Nada, si es para un proyecto de IA'], 'La LOPDP exige base legal y finalidad determinada para el tratamiento de datos personales.', 'IA-18'),
  () => mc('¿Cuál de estos es un dato personal sensible?', 'La información de salud o los datos biométricos de una persona', ['El número de quintales acopiados por la cooperativa', 'La temperatura promedio de Puyo', 'El nombre de un cantón'], 'Los datos de salud, biométricos, étnicos o de orientación sexual requieren protección reforzada.', 'IA-18'),
  () => mc('El principio de minimización de datos significa…', 'Recolectar solo los datos necesarios para la finalidad declarada', ['Guardar los datos en archivos pequeños', 'Borrar todos los datos al terminar el día', 'Usar la menor cantidad de modelos'], 'Menos datos innecesarios significa menos riesgo para las personas.', 'IA-10'),
  () => mc('Reemplazar las cédulas por códigos que solo pueden revertirse con una clave guardada aparte es…', 'Seudonimización', ['Anonimización irreversible', 'Cifrado de disco', 'Minería de datos'], 'La seudonimización reduce el riesgo, pero los datos siguen siendo personales porque pueden revertirse.', 'IA-18'),
  () => mc('Un ciudadano pide saber qué datos suyos tiene la institución y corregir uno erróneo. Ejerce sus derechos de…', 'Acceso y rectificación', ['Propiedad intelectual', 'Libre comercio', 'Petición de obra pública'], 'La LOPDP reconoce derechos del titular como acceso, rectificación, eliminación y oposición, entre otros.', 'IA-18'),
  () => mc('Encuentras la contraseña de la base de datos escrita en un repositorio público. Lo correcto es…', 'Revocar y cambiar la credencial de inmediato, retirarla del código y usar un gestor de secretos', ['Borrar solo el último commit', 'Dejarla porque nadie la verá', 'Cambiar el nombre del repositorio'], 'El historial del repositorio conserva la clave: hay que rotarla y mover los secretos fuera del código.', 'IA-18'),
  () => mc('La autenticación multifactor (MFA) protege porque…', 'Exige algo más que la contraseña, como un código en el celular', ['Hace la contraseña más larga', 'Cifra todos los archivos', 'Elimina los virus'], 'Aunque roben la contraseña, el atacante necesita el segundo factor.', 'IA-05'),
  () => mc('Un correo urgente te pide "verificar tu cuenta de la nube" en un enlace extraño. Probablemente es…', 'Phishing (suplantación para robar credenciales)', ['Una actualización oficial obligatoria', 'Un mensaje del equipo de datos', 'Publicidad inofensiva'], 'Desconfía de la urgencia, revisa el remitente y entra solo por los canales oficiales.', 'IA-05'),
  () => mc('En la nube, el modelo de responsabilidad compartida indica que…', 'El proveedor protege la infraestructura y el cliente protege sus datos, accesos y configuraciones', ['El proveedor responde por todo', 'El cliente no tiene ninguna responsabilidad', 'Nadie es responsable de la seguridad'], 'Muchas fugas ocurren por configuraciones del cliente, como almacenamiento público.', 'IA-15'),
  () => mc('Usar una plataforma de correo o de hojas de cálculo en línea sin administrar servidores es un ejemplo de…', 'Software como servicio (SaaS)', ['Infraestructura como servicio (IaaS)', 'Hardware local', 'Plataforma sin internet'], 'IaaS ofrece máquinas virtuales, PaaS plataformas para desplegar y SaaS aplicaciones listas.', 'IA-15'),
  () => mc('En PLN, dividir un texto en palabras o unidades menores se llama…', 'Tokenización', ['Normalización de bases de datos', 'Regresión', 'Compilación'], 'La tokenización es el primer paso para analizar texto.', 'IA-13'),
  () => mc('Un chatbot de IA generativa responde con un dato falso pero muy convincente. Este fenómeno se conoce como…', 'Alucinación del modelo', ['Sobreajuste de la base de datos', 'Cifrado', 'Tokenización'], 'Por eso las respuestas se verifican con fuentes confiables y se mantiene supervisión humana.', 'IA-16'),
  () => mc('Las "V" que caracterizan al Big Data incluyen…', 'Volumen, velocidad y variedad (y también veracidad y valor)', ['Validez, voto y vista', 'Virus, ventanas y versiones', 'Solo volumen'], 'Big Data no es solo mucho volumen: también rapidez y diversidad de formatos.', 'IA-17'),
  () => mc('Herramientas como Hadoop o Spark se usan para…', 'Procesar grandes volúmenes de datos de forma distribuida en varios equipos', ['Diseñar logotipos', 'Escribir documentos de texto', 'Proteger el correo contra spam'], 'El procesamiento distribuido divide el trabajo entre muchos nodos.', 'IA-17'),
  () => mc('Una API en la integración de sistemas inteligentes permite…', 'Que una aplicación envíe datos al modelo y reciba la predicción mediante solicitudes definidas', ['Ver el código fuente del modelo', 'Eliminar la necesidad de seguridad', 'Entrenar sin datos'], 'Las APIs conectan aplicaciones; deben protegerse con autenticación y límites de uso.', 'IA-19'),
  () => mc('La "explicabilidad" de un sistema de IA se refiere a…', 'Poder entender y comunicar por qué el sistema tomó una decisión', ['Que el modelo sea muy grande', 'Que funcione sin electricidad', 'Que no use datos'], 'Las personas afectadas tienen derecho a entender decisiones automatizadas que les impactan.', 'IA-10'),
  () => mc('Un deepfake es…', 'Un audio, imagen o video falso generado con IA que imita a una persona real', ['Una copia de seguridad', 'Una base de datos profunda', 'Un antivirus'], 'La alfabetización digital ayuda a verificar fuentes antes de compartir contenido.', 'IA-05')
];

/* ---------------- CASOS PROFESIONALES ---------------- */
const CASOS_IA = [
  {
    id: 'datos-sin-consentimiento', titulo: 'El cliente quiere usar datos personales sin consentimiento',
    asignaturas: ['IA-10', 'IA-18'],
    persona: { nombre: 'Sr. Rodrigo Cevallos', rol: 'Gerente de una cadena de farmacias de Puyo', avatar: '👨🏻‍💼', pitch: 0.9 },
    contexto: 'El gerente quiere un modelo que ofrezca promociones según las compras de medicamentos de sus clientes y te entrega una base con nombres, cédulas y diagnósticos, sin que nadie haya autorizado ese uso.',
    pasos: [
      { dice: 'Aquí tiene la base con todas las compras y diagnósticos. Úsela para mandar promociones personalizadas. Los clientes ni se van a enterar.', opciones: [
        { t: 'Le explico que son datos de salud, sensibles, y que la LOPDP exige base legal y consentimiento específico para ese fin; propongo no usarlos así.', p: 2, r: 'No sabía que eso era tan delicado…', fb: 'Los datos de salud son sensibles: usarlos para publicidad sin consentimiento vulnera la ley y la confianza.' },
        { t: 'Le digo que lo usaré, pero borrando solo los nombres.', p: 1, r: 'Bueno, como usted vea.', fb: 'Quitar nombres no basta: la cédula y el diagnóstico siguen identificando a las personas y el fin no está autorizado.' },
        { t: 'Acepto: el cliente siempre tiene la razón.', p: 0, r: '¡Perfecto, empiece hoy mismo!', fb: 'Tratar datos sensibles sin base legal expone a las personas y al profesional a sanciones.' } ] },
      { dice: 'Pero entonces, ¿cómo hacemos las promociones? Necesito vender más.', opciones: [
        { t: 'Propongo un programa voluntario: los clientes autorizan por escrito el uso de sus compras para ofertas, y el modelo usa datos agregados y sin diagnósticos.', p: 2, r: 'Eso suena serio y hasta mejora la imagen de la farmacia.', fb: 'El consentimiento informado y la minimización permiten innovar respetando los derechos.' },
        { t: 'Hagamos promociones generales para todos, sin modelo.', p: 1, r: 'Mmm, es lo que ya hacemos.', fb: 'Es seguro, pero se puede ofrecer una alternativa de valor con consentimiento.' },
        { t: 'Compremos una base de datos de otra empresa para completar la información.', p: 0, r: '¿Se puede?', fb: 'Comprar bases de origen dudoso agrava el problema legal y ético.' } ] },
      { dice: '(Días después, el gerente insiste por correo en usar la base original.)', opciones: [
        { t: 'Respondo por escrito, explico los riesgos legales, dejo constancia y me niego a procesar los datos sin consentimiento.', p: 2, r: 'Está bien, sigamos con el programa voluntario.', fb: 'Documentar la decisión protege al profesional y a la organización.' },
        { t: 'No respondo y espero a que se olvide.', p: 1, r: '(Sin respuesta.)', fb: 'Evitar el tema no resuelve el riesgo: hay que dejar constancia.' },
        { t: 'Proceso los datos a escondidas de noche.', p: 0, r: '…', fb: 'Es una falta ética y legal grave.' } ] }
    ]
  },
  {
    id: 'modelo-discrimina', titulo: 'El modelo discrimina a un grupo',
    asignaturas: ['IA-10', 'IA-11', 'IA-16'],
    persona: { nombre: 'Ing. Verónica Andi', rol: 'Jefa de crédito de una cooperativa de ahorro de Pastaza', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'El modelo de preaprobación de microcréditos que ayudaste a construir rechaza al doble de solicitantes de comunidades kichwa y shuar que al resto, con historiales de pago similares.',
    pasos: [
      { dice: 'El modelo tiene 88 % de exactitud. ¿Para qué revisar más? Así lo dejamos.', opciones: [
        { t: 'Le muestro las métricas por grupo: la tasa de rechazo y los errores son el doble para solicitantes de comunidades; eso es un sesgo que hay que corregir.', p: 2, r: 'No había visto los números por grupo…', fb: 'Un buen promedio puede ocultar un trato injusto; la equidad se mide por grupos.' },
        { t: 'Le digo que puede haber algún problema, sin datos concretos.', p: 1, r: 'Si no hay pruebas, lo dejamos.', fb: 'Hay que sustentar con métricas por grupo.' },
        { t: 'Estoy de acuerdo: 88 % es suficiente.', p: 0, r: 'Perfecto.', fb: 'Ignorar el sesgo convierte al modelo en una herramienta de discriminación.' } ] },
      { dice: '¿Y por qué pasa eso si el modelo no usa la etnia?', opciones: [
        { t: 'Porque variables como la parroquia o el tipo de ingreso actúan como sustitutos, y hay pocos datos de esos grupos; revisaremos variables, rebalancearemos y reentrenaremos.', p: 2, r: 'Tiene sentido, hagámoslo.', fb: 'Las variables sustitutas y la subrepresentación son causas comunes de sesgo algorítmico.' },
        { t: 'Quitemos la parroquia y listo.', p: 1, r: 'Eso es fácil.', fb: 'Puede ayudar, pero hay que medir de nuevo y revisar otras causas.' },
        { t: 'Seguramente ellos pagan menos; el modelo solo refleja la realidad.', p: 0, r: '…', fb: 'Es un prejuicio sin evidencia: los historiales eran similares.' } ] },
      { dice: '(¿Cómo cierras el caso?)', opciones: [
        { t: 'Documento el hallazgo, propongo revisión humana de los rechazos y monitoreo periódico de equidad, y comunico a la gerencia.', p: 2, r: 'Lo llevaré al comité.', fb: 'La supervisión humana y el monitoreo continuo sostienen la equidad.' },
        { t: 'Arreglo el modelo sin contarle a nadie.', p: 1, r: '…', fb: 'Corregir es bueno, pero la transparencia y la documentación son necesarias.' },
        { t: 'Borro el informe de sesgo para no causar problemas.', p: 0, r: '…', fb: 'Ocultar evidencia de discriminación es una falta grave.' } ] }
    ]
  },
  {
    id: 'ocultar-errores', titulo: 'El jefe quiere ocultar errores del modelo',
    asignaturas: ['IA-10', 'IA-11', 'IA-20'],
    persona: { nombre: 'Ing. Marco Paredes', rol: 'Jefe de proyectos de una empresa de tecnología', avatar: '👨🏽‍💻', pitch: 0.95 },
    contexto: 'Mañana se presenta a un hospital un modelo que prioriza turnos. Encontraste que falla con frecuencia en pacientes adultos mayores. Tu jefe quiere omitirlo de la presentación.',
    pasos: [
      { dice: 'No pongas esa diapositiva de errores. Si el cliente la ve, perdemos el contrato.', opciones: [
        { t: 'Le explico que ocultar una falla que afecta a adultos mayores es engañar al cliente y puede causar daño; propongo presentarla con un plan de mejora.', p: 2, r: 'Hmm… ¿y qué plan propones?', fb: 'La transparencia sobre las limitaciones es un deber profesional, más aún en salud.' },
        { t: 'La pongo en letra pequeña al final.', p: 1, r: 'Bueno, que no se note.', fb: 'Minimizar la información relevante sigue siendo poco transparente.' },
        { t: 'La quito: usted es el jefe.', p: 0, r: 'Así me gusta.', fb: 'Ocultar fallas puede causar daños y responsabilidades graves.' } ] },
      { dice: '¿Y qué le decimos al hospital entonces?', opciones: [
        { t: 'Que el modelo funciona bien en general, que falla en un grupo, que proponemos revisión humana para esos casos y un plazo para mejorarlo con más datos.', p: 2, r: 'Así quedamos como profesionales serios.', fb: 'Comunicar límites con un plan concreto genera confianza.' },
        { t: 'Que el modelo está en fase beta y nada más.', p: 1, r: 'Es poco claro.', fb: 'Hay que precisar qué falla y cómo se mitigará.' },
        { t: 'Que el modelo es perfecto.', p: 0, r: '…', fb: 'Es una afirmación falsa.' } ] },
      { dice: '(El jefe acepta a regañadientes. ¿Qué haces después?)', opciones: [
        { t: 'Registro el hallazgo y la decisión en la documentación del proyecto y preparo el plan de mejora con métricas por grupo.', p: 2, r: 'Bien, adelante.', fb: 'La documentación permite rendir cuentas y dar seguimiento.' },
        { t: 'Lo dejo así y no lo vuelvo a mencionar.', p: 1, r: '…', fb: 'Sin seguimiento, la falla puede persistir.' },
        { t: 'Publico el problema en redes sociales para presionar.', p: 0, r: '¿Qué hiciste?', fb: 'Primero se usan los canales internos y profesionales.' } ] }
    ]
  },
  {
    id: 'chatbot-adulto-mayor', titulo: 'Un usuario mayor no entiende el chatbot',
    asignaturas: ['IA-13', 'IA-05', 'IA-16'],
    persona: { nombre: 'Don Segundo Chimbo', rol: 'Usuario de 74 años del chatbot municipal', avatar: '👴🏽', pitch: 0.8 },
    contexto: 'El municipio implementó un chatbot para trámites. Don Segundo llega molesto a la oficina porque el chatbot no le entiende y le responde con palabras técnicas. Tú das soporte al sistema.',
    pasos: [
      { dice: 'Ese aparato no me entiende. Le escribo "kiero pagar el predio" y me dice "intención no reconocida". ¡Yo no sé de esas cosas!', opciones: [
        { t: 'Lo escucho con paciencia, le ayudo a completar su trámite ahora y le explico con palabras sencillas que mejoraremos el sistema.', p: 2, r: 'Bueno, gracias por la paciencia, mijo.', fb: 'Primero se resuelve la necesidad de la persona con trato respetuoso y lenguaje claro.' },
        { t: 'Le digo que escriba bien para que el chatbot le entienda.', p: 1, r: 'Ya pues, si no sé escribir bonito…', fb: 'El sistema debe adaptarse a las personas, no al revés.' },
        { t: 'Le digo que es fácil y que todos lo usan sin problema.', p: 0, r: '¡Entonces soy yo el tonto!', fb: 'Minimizar la dificultad excluye y ofende.' } ] },
      { dice: '¿Y por qué no entiende si yo escribo como hablo?', opciones: [
        { t: 'Le explico que el chatbot aprende de ejemplos y no tenía suficientes con errores de ortografía o palabras locales; agregaremos esos ejemplos.', p: 2, r: 'Ah, o sea que hay que enseñarle.', fb: 'En PLN, ampliar los datos con variantes reales mejora la comprensión del modelo.' },
        { t: 'Porque las computadoras no entienden a las personas.', p: 1, r: 'Entonces para qué lo ponen.', fb: 'Es una explicación pobre: el sistema sí puede mejorarse.' },
        { t: 'Porque usted escribe mal.', p: 0, r: '¡Qué falta de respeto!', fb: 'Culpar al usuario es discriminatorio.' } ] },
      { dice: '(¿Qué propones al equipo para que no vuelva a pasar?)', opciones: [
        { t: 'Mensajes en lenguaje sencillo, opción de hablar con una persona, entrada por voz y pruebas del chatbot con adultos mayores y hablantes de kichwa.', p: 2, r: 'El equipo lo incluirá en la próxima versión.', fb: 'El diseño inclusivo y la opción humana garantizan la accesibilidad.' },
        { t: 'Agregar un manual de 20 páginas.', p: 1, r: 'Nadie lo va a leer.', fb: 'Ayuda poco: la solución es simplificar la interacción.' },
        { t: 'Nada, ya se acostumbrarán.', p: 0, r: '…', fb: 'Excluye a quienes más necesitan el servicio.' } ] }
    ]
  },
  {
    id: 'credenciales-repo', titulo: 'Filtración de credenciales en un repositorio',
    asignaturas: ['IA-18', 'IA-15', 'IA-19'],
    persona: { nombre: 'Kevin Tapuy', rol: 'Desarrollador junior del equipo', avatar: '🧑🏽', pitch: 1.15 },
    contexto: 'Recibes una alerta: la clave de acceso a la base de datos en la nube aparece en un repositorio público del equipo. Kevin, nervioso, admite que la subió por error ayer.',
    pasos: [
      { dice: 'Perdón… subí la clave sin darme cuenta. ¿La borro del archivo y ya?', opciones: [
        { t: 'Le digo que lo primero es revocar y rotar la clave de inmediato, porque el historial del repositorio la conserva, y luego revisar los registros de acceso.', p: 2, r: 'Entendido, la revoco ahora mismo.', fb: 'Contener el incidente exige invalidar la credencial expuesta, no solo borrarla del archivo.' },
        { t: 'Le digo que borre el archivo y haga un commit nuevo.', p: 1, r: 'Listo, borrado.', fb: 'La clave sigue en el historial: hay que rotarla.' },
        { t: 'Le digo que no pasa nada, nadie revisa esos repositorios.', p: 0, r: 'Uf, menos mal.', fb: 'Existen robots que rastrean claves en repositorios públicos en minutos.' } ] },
      { dice: 'Ya cambié la clave. ¿Tenemos que contarle a alguien?', opciones: [
        { t: 'Sí: revisamos si hubo accesos indebidos, informamos al responsable de seguridad y al cliente, y si se expusieron datos personales seguimos el protocolo de notificación de la LOPDP.', p: 2, r: 'Entiendo, prefiero hacerlo bien.', fb: 'La transparencia y la notificación oportuna son obligaciones ante vulneraciones de datos.' },
        { t: 'Solo al jefe, si pregunta.', p: 1, r: 'Ok…', fb: 'Hay que informar proactivamente al responsable y evaluar el impacto.' },
        { t: 'No, mejor que quede entre nosotros.', p: 0, r: 'Gracias por cubrirme.', fb: 'Ocultar un incidente agrava el daño.' } ] },
      { dice: '(¿Qué medidas propones para el equipo?)', opciones: [
        { t: 'Usar un gestor de secretos y variables de entorno, escaneo automático de secretos antes de cada commit, permisos mínimos y una capacitación breve sin culpar a Kevin.', p: 2, r: 'Así nadie volverá a cometer el error.', fb: 'Las medidas técnicas preventivas y una cultura sin culpas reducen los incidentes.' },
        { t: 'Prohibir a Kevin que use el repositorio.', p: 1, r: '…', fb: 'Sancionar no corrige el proceso.' },
        { t: 'Seguir igual y tener más cuidado.', p: 0, r: '…', fb: 'Sin controles, el error se repetirá.' } ] }
    ]
  },
  {
    id: 'reconocimiento-facial', titulo: 'La comunidad desconfía de una cámara con reconocimiento facial',
    asignaturas: ['IA-10', 'IA-16', 'IA-18'],
    persona: { nombre: 'Mama Rosa Aranda', rol: 'Dirigente de una comunidad kichwa cercana a Puyo', avatar: '👵🏽', pitch: 1.0 },
    contexto: 'Un proyecto quiere instalar una cámara con reconocimiento facial en la entrada de la comunidad para "seguridad". La dirigente te pide explicaciones en una asamblea.',
    pasos: [
      { dice: '¿Esa cámara va a guardar la cara de nuestros hijos? Nadie nos preguntó nada.', opciones: [
        { t: 'Reconozco su preocupación: los rasgos faciales son datos biométricos sensibles; explico qué se captaría y que nada debe instalarse sin consulta y consentimiento de la comunidad.', p: 2, r: 'Por fin alguien nos explica.', fb: 'Los datos biométricos son sensibles y la participación de la comunidad es indispensable.' },
        { t: 'Le digo que es por su seguridad y que no se preocupe.', p: 1, r: 'Eso dicen todos.', fb: 'Tranquilizar sin informar no genera confianza.' },
        { t: 'Le digo que la cámara ya está aprobada y no hay nada que discutir.', p: 0, r: '¡Entonces no la vamos a permitir!', fb: 'Imponer tecnología vulnera derechos y rompe la confianza.' } ] },
      { dice: 'Dicen que esas cámaras se equivocan más con la gente como nosotros.', opciones: [
        { t: 'Es cierto que muchos sistemas tienen más errores con grupos poco representados en sus datos; propongo evaluar alternativas menos invasivas y revisar la precisión por grupos antes de decidir.', p: 2, r: 'Agradezco la sinceridad.', fb: 'Reconocer los sesgos conocidos y valorar alternativas proporcionales es parte del uso responsable.' },
        { t: 'Eso es un mito, la tecnología es neutral.', p: 0, r: 'No le creo.', fb: 'La tecnología no es neutral: depende de los datos con que se entrena.' },
        { t: 'Le digo que lo averiguaré.', p: 1, r: 'Espero que vuelva.', fb: 'Está bien, pero conviene informar lo que ya se conoce.' } ] },
      { dice: '(La asamblea debe decidir. ¿Qué propones?)', opciones: [
        { t: 'Un acuerdo escrito: finalidad limitada, opción sin reconocimiento facial, quién accede a las imágenes, tiempo de conservación, y que la comunidad decida en asamblea.', p: 2, r: 'Así sí podemos decidir juntos.', fb: 'Finalidad, proporcionalidad, transparencia y participación sostienen una decisión legítima.' },
        { t: 'Instalarla de prueba un mes y luego ver.', p: 1, r: 'Hmm, ¿y las caras de ese mes?', fb: 'Una prueba también trata datos sensibles y requiere consentimiento.' },
        { t: 'Instalarla de noche para evitar conflictos.', p: 0, r: '…', fb: 'Es una imposición inaceptable.' } ] }
    ]
  }
];
