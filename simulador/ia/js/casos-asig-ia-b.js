/* Prácticas por asignatura – Inteligencia Artificial (PAO 3–4) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== IA-11 Aprendizaje Automático Aplicado ===================== */
  {
    id: 'asig-IA-11', cod: 'IA-11',
    titulo: 'Detectar a tiempo a quien podría abandonar',
    asignaturas: ['IA-11'],
    persona: { nombre: 'Mgs. Diana Andi', rol: 'Coordinadora académica de la modalidad en línea', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'La coordinadora quiere un modelo que alerte qué estudiantes podrían abandonar la carrera para ofrecerles tutorías a tiempo. Tiene datos de tres cohortes anteriores.',
    objetivo: 'Utilizar conceptos de machine learning, tipos de aprendizaje, preparación de datos y librerías de ML con evaluación adecuada.',
    pasos: [
      { dice: 'Tenemos el historial de quién abandonó y quién no. ¿Qué tipo de aprendizaje automático usamos?', opciones: [
          { t: 'Aprendizaje supervisado de clasificación: tenemos la etiqueta (abandonó o no) y el modelo aprende a predecirla a partir de variables como conexión al aula virtual y entregas.', p: 2, r: 'Entonces aprende de los casos anteriores.', fb: 'Con datos etiquetados y una variable objetivo categórica corresponde la clasificación supervisada.' },
          { t: 'Agrupamiento no supervisado para formar grupos de estudiantes.', p: 1, r: '¿Y eso me dice quién abandonará?', fb: 'El agrupamiento explora, pero no predice una etiqueta conocida.' },
          { t: 'Cualquier modelo sirve, da igual el tipo.', p: 0, r: 'Hmm, no me convence.', fb: 'El tipo de aprendizaje depende de los datos y del objetivo.' } ] },
      { dice: '¿Qué datos usamos y cómo los preparamos?', opciones: [
          { t: 'Variables de participación (ingresos al aula, entregas a tiempo, notas parciales), sin datos sensibles como etnia; tratamos faltantes, escalamos y separamos entrenamiento y prueba (80/20) de forma estratificada.', p: 2, r: 'Bien pensado, y respetuoso.', fb: 'La preparación incluye seleccionar variables pertinentes, evitar datos sensibles, limpiar y separar los conjuntos.' },
          { t: 'Usamos todo lo que haya, incluso la dirección y la etnia.', p: 0, r: '¿Eso no discrimina?', fb: 'Usar datos sensibles innecesarios aumenta el riesgo de sesgo y vulnera la privacidad.' },
          { t: 'Entrenamos con todos los datos, sin separar prueba.', p: 1, r: '¿Y cómo sabemos si funciona?', fb: 'Sin conjunto de prueba no se estima el desempeño real.' } ] },
      { dice: 'Con scikit-learn el modelo tiene 92 % de exactitud. ¿Ya está?', opciones: [
          { t: 'Como solo el 10 % abandona, la exactitud engaña; reviso la matriz de confusión y el recall de la clase "abandona", porque lo grave es no detectar a quien necesita tutoría.', p: 2, r: 'Claro: un modelo que dice "nadie abandona" tendría 90 %.', fb: 'Con clases desbalanceadas se evalúan recall, precisión y F1 de la clase minoritaria.' },
          { t: 'Sí, 92 % es excelente.', p: 0, r: 'Entonces lo usamos.', fb: 'La exactitud alta puede ocultar que no detecta a casi nadie.' },
          { t: 'Pruebo otro algoritmo a ver si llega a 95 %.', p: 1, r: '¿Y si sigue sin detectar?', fb: 'Cambiar de algoritmo sin la métrica correcta no resuelve el problema.' } ] }
    ],
    vivo: {
      lugar: 'Videollamada con la coordinación académica', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🏷️', t: 'Identificar la columna objetivo "abandonó"', p: 2, fb: 'La etiqueta define un problema supervisado.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗺️', t: 'Dibujar el mapa de tipos de aprendizaje', p: 2, fb: 'Ubicar el problema evita elegir mal la técnica.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎰', t: 'Elegir un algoritmo al azar', p: 0, fb: 'La técnica depende del objetivo y de los datos.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Elige aprendizaje supervisado', claves: ['supervisado', 'etiqueta', 'etiquetad', 'historial', 'casos anteriores'] },
            { n: 'Lo plantea como clasificación', claves: ['clasificacion', 'clasificar', 'abandona o no', 'dos clases', 'categoria'] },
            { n: 'Nombra variables predictoras', claves: ['variables', 'conexion', 'entregas', 'notas', 'participacion', 'caracteristicas'] }
          ],
          evitar: [ { claves: ['da igual', 'cualquier modelo'], fb: 'El tipo de aprendizaje depende del problema.' } ],
          modelo: 'Es aprendizaje supervisado de clasificación: tenemos la etiqueta de quién abandonó, y el modelo aprende a predecirla con variables como la conexión al aula virtual, las entregas y las notas.'
        },
        {
          acciones: [
            { icono: '🧹', t: 'Tratar faltantes y escalar las variables', p: 2, fb: 'Datos limpios y escalados mejoran el entrenamiento.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✂️', t: 'Separar entrenamiento y prueba estratificados', p: 2, fb: 'La estratificación mantiene la proporción de abandonos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🧬', t: 'Agregar la etnia como variable', p: 0, fb: 'Es un dato sensible que puede introducir discriminación.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Selecciona variables pertinentes sin datos sensibles', claves: ['sin datos sensibles', 'sin la etnia', 'pertinentes', 'participacion', 'no usamos', 'necesarias'] },
            { n: 'Limpia y escala los datos', claves: ['faltantes', 'limpi', 'escal', 'normaliz', 'preparar'] },
            { n: 'Separa entrenamiento y prueba', claves: ['entrenamiento', 'prueba', '80', 'ochenta', 'estratific', 'train test split'] }
          ],
          evitar: [ { claves: ['incluso la etnia', 'usamos todo lo que haya'], fb: 'Los datos sensibles innecesarios aumentan el riesgo de sesgo.' } ],
          modelo: 'Usamos solo variables pertinentes de participación, sin datos sensibles como la etnia; tratamos los faltantes, escalamos y separamos entrenamiento y prueba en 80 y 20 de forma estratificada.'
        },
        {
          acciones: [
            { icono: '🔲', t: 'Mostrar la matriz de confusión', p: 2, fb: 'Revela cuántos abandonos no se detectan.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎯', t: 'Calcular el recall de la clase "abandona"', p: 2, fb: 'Mide cuántos estudiantes en riesgo detecta el modelo.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🎉', t: 'Celebrar el 92 % y desplegar', p: 0, fb: 'La exactitud engaña con clases desbalanceadas.', efecto: { confianza: 6, tension: -4 } }
          ],
          conceptos: [
            { n: 'Advierte que la exactitud engaña', claves: ['exactitud', 'engana', 'desbalance', 'solo el 10', 'minoritaria'] },
            { n: 'Usa la matriz de confusión', claves: ['matriz de confusion', 'falsos negativos', 'falsos positivos', 'aciertos', 'errores'] },
            { n: 'Prioriza el recall', claves: ['recall', 'sensibilidad', 'detectar', 'f1', 'precision'] }
          ],
          evitar: [ { claves: ['ya esta listo', 'es excelente'], fb: 'Sin las métricas adecuadas no se sabe si detecta a quien lo necesita.' } ],
          modelo: 'Como solo el 10 % abandona, la exactitud engaña. Reviso la matriz de confusión y el recall de la clase abandona, porque lo grave son los falsos negativos que no reciben tutoría.'
        }
      ]
    }
  },

  /* ===================== IA-12 Minería de Datos ===================== */
  {
    id: 'asig-IA-12', cod: 'IA-12',
    titulo: 'Conocer a los clientes del minimarket',
    asignaturas: ['IA-12'],
    persona: { nombre: 'Sr. Jorge Villacrés', rol: 'Dueño de un minimarket en el centro de Puyo', avatar: '👨🏻', pitch: 0.95 },
    contexto: 'El dueño tiene dos años de ventas registradas en su sistema de caja y la lista de clientes frecuentes. Quiere entender a sus clientes para hacer mejores promociones.',
    objetivo: 'Aplicar técnicas de exploración, agrupamiento y clasificación básica de la minería de datos.',
    pasos: [
      { dice: 'Tengo miles de ventas guardadas. ¿Qué es eso de la minería de datos y por dónde empezamos?', opciones: [
          { t: 'Es descubrir patrones útiles en los datos; seguimos un proceso: entender el negocio, explorar los datos (resúmenes, faltantes, gráficos), prepararlos, modelar y evaluar.', p: 2, r: 'O sea que primero miramos bien los datos.', fb: 'Procesos como CRISP-DM o KDD guían la minería desde el negocio hasta la evaluación.' },
          { t: 'Es usar un programa que encuentra todo automáticamente.', p: 1, r: '¿Así de fácil?', fb: 'Las herramientas ayudan, pero se requiere un proceso y criterio.' },
          { t: 'Es vender los datos de los clientes.', p: 0, r: '¡No, eso no!', fb: 'Minar datos no es comercializarlos; además, vender datos personales vulnera la ley.' } ] },
      { dice: 'Quiero saber qué tipos de clientes tengo.', opciones: [
          { t: 'Aplicamos agrupamiento (k-means) con frecuencia de compra, monto y última visita; elegimos el número de grupos con el método del codo e interpretamos cada grupo.', p: 2, r: '¡Clientes fieles, ocasionales y los que se fueron!', fb: 'El agrupamiento es no supervisado: forma segmentos sin etiquetas previas.' },
          { t: 'Los clasifico yo según me parezca.', p: 1, r: 'Pero no conozco a todos.', fb: 'La intuición ayuda, pero los datos permiten segmentar a todos con criterio.' },
          { t: 'Hago un grupo por cada cliente.', p: 0, r: 'Serían 800 grupos.', fb: 'Un segmento por persona no resume nada.' } ] },
      { dice: 'Y si lanzo una promoción, ¿puedo saber quién la va a aprovechar?', opciones: [
          { t: 'Con los datos de una promoción anterior (respondió o no) entrenamos una clasificación básica, por ejemplo un árbol de decisión, y la evaluamos con datos de prueba.', p: 2, r: 'El árbol hasta se puede leer como reglas.', fb: 'La clasificación es supervisada: usa ejemplos etiquetados para predecir una categoría.' },
          { t: 'Uso los mismos grupos del k-means y ya.', p: 1, r: '¿Y eso predice la respuesta?', fb: 'Los grupos ayudan, pero predecir la respuesta requiere clasificación con etiquetas.' },
          { t: 'Mando la promoción a todos sin medir.', p: 0, r: 'Así no aprendo nada.', fb: 'Sin medir no se sabe qué funciona.' } ] }
    ],
    vivo: {
      lugar: 'Trastienda del minimarket con la computadora de caja', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Preguntarle qué decisión quiere tomar', p: 2, fb: 'Entender el negocio es la primera fase del proceso.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🔎', t: 'Explorar resúmenes y gráficos de las ventas', p: 2, fb: 'La exploración revela patrones y errores.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💸', t: 'Ofrecerle vender la base de clientes', p: 0, fb: 'Vender datos personales vulnera la ley y la confianza.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Define la minería como descubrir patrones', claves: ['patrones', 'descubrir', 'conocimiento', 'informacion util', 'tendencias'] },
            { n: 'Sigue un proceso por fases', claves: ['proceso', 'fases', 'crisp', 'kdd', 'entender el negocio', 'preparar', 'modelar'] },
            { n: 'Empieza explorando los datos', claves: ['explorar', 'exploracion', 'resumen', 'graficos', 'faltantes', 'estadisticas'] }
          ],
          evitar: [ { claves: ['vender los datos', 'vender la base'], fb: 'Los datos de clientes no se venden.' } ],
          modelo: 'La minería de datos es descubrir patrones útiles. Seguimos un proceso por fases: entender el negocio, explorar los datos con resúmenes y gráficos, prepararlos, modelar y evaluar.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Calcular frecuencia, monto y última visita', p: 2, fb: 'Son variables clásicas para segmentar clientes.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🦵', t: 'Aplicar el método del codo para elegir k', p: 2, fb: 'Ayuda a elegir un número razonable de grupos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '👤', t: 'Crear un grupo por cliente', p: 0, fb: 'No resume ni segmenta.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa agrupamiento no supervisado', claves: ['agrupamiento', 'k means', 'clustering', 'segment', 'no supervisado', 'grupos'] },
            { n: 'Elige variables de comportamiento', claves: ['frecuencia', 'monto', 'ultima visita', 'recencia', 'compras'] },
            { n: 'Elige y explica el número de grupos', claves: ['codo', 'numero de grupos', 'interpret', 'k', 'fieles', 'ocasionales'] }
          ],
          evitar: [ { claves: ['un grupo por cliente', 'segun me parezca'], fb: 'La segmentación debe basarse en datos.' } ],
          modelo: 'Aplicamos agrupamiento con k-means usando la frecuencia, el monto y la última visita; elegimos el número de grupos con el método del codo e interpretamos cada segmento, como clientes fieles y ocasionales.'
        },
        {
          acciones: [
            { icono: '🌳', t: 'Entrenar un árbol de decisión', p: 2, fb: 'El árbol es una clasificación interpretable.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧪', t: 'Evaluar con datos de prueba', p: 2, fb: 'Mide si el modelo generaliza.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📢', t: 'Mandar la promoción a todos sin medir', p: 0, fb: 'Sin medición no se aprende.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa clasificación supervisada', claves: ['clasificacion', 'supervisad', 'predecir', 'etiqueta', 'respondio o no'] },
            { n: 'Elige un algoritmo sencillo', claves: ['arbol de decision', 'arbol', 'reglas', 'vecinos', 'regresion logistica'] },
            { n: 'Evalúa el modelo', claves: ['evaluar', 'prueba', 'precision', 'datos nuevos', 'medir', 'validar'] }
          ],
          evitar: [ { claves: ['a todos sin medir'], fb: 'Sin evaluación no se sabe si el modelo sirve.' } ],
          modelo: 'Con los datos de la promoción anterior, donde sabemos quién respondió o no, entrenamos una clasificación con un árbol de decisión y la evaluamos con datos de prueba.'
        }
      ]
    }
  },

  /* ===================== IA-13 Procesamiento de Lenguaje Natural ===================== */
  {
    id: 'asig-IA-13', cod: 'IA-13',
    titulo: 'Los mensajes de la radio comunitaria',
    asignaturas: ['IA-13'],
    persona: { nombre: 'Lcda. Rocío Mamallacta', rol: 'Directora de una radio comunitaria de Puyo', avatar: '👩🏽‍🎤', pitch: 1.15 },
    contexto: 'La radio recibe cientos de mensajes de WhatsApp de oyentes cada semana, en español y kichwa. La directora quiere saber de qué hablan y si están contentos con la programación.',
    objetivo: 'Utilizar el procesamiento de texto, el análisis de palabras y librerías básicas en una aplicación de PLN.',
    pasos: [
      { dice: 'Los mensajes llegan con emojis, mayúsculas, faltas de ortografía y hasta números de teléfono. ¿Cómo se preparan?', opciones: [
          { t: 'Preprocesamos: quitamos números de teléfono y nombres, pasamos a minúsculas, tokenizamos, eliminamos palabras vacías (stopwords) y lematizamos; los emojis los convertimos en texto.', p: 2, r: 'Y además protegemos a los oyentes.', fb: 'El preprocesamiento normaliza el texto y la anonimización protege los datos personales.' },
          { t: 'Los analizamos tal cual llegan.', p: 1, r: '¿Y los "jajaja" y los emojis?', fb: 'Sin limpieza el análisis se llena de ruido.' },
          { t: 'Borramos los mensajes en kichwa porque complican.', p: 0, r: '¡Son de nuestra audiencia!', fb: 'Excluir una lengua sesga el análisis y discrimina a la audiencia.' } ] },
      { dice: '¿Cómo sabemos de qué temas hablan más?', opciones: [
          { t: 'Contamos la frecuencia de palabras y de pares de palabras (bigramas), usamos TF-IDF para resaltar términos importantes y lo mostramos en un gráfico de barras.', p: 2, r: '¡Música, vías y salud son lo más mencionado!', fb: 'El análisis de frecuencias, n-gramas y TF-IDF identifica los temas dominantes.' },
          { t: 'Hacemos una nube de palabras y ya.', p: 1, r: 'Bonita, pero difícil de comparar.', fb: 'La nube es ilustrativa, pero no permite comparar con precisión.' },
          { t: 'Leemos solo los primeros 10 mensajes.', p: 0, r: 'Eso no representa a todos.', fb: 'Una muestra mínima no representa a la audiencia.' } ] },
      { dice: '¿Y podemos saber si están contentos?', opciones: [
          { t: 'Con análisis de sentimiento usando una librería (por ejemplo, un modelo en español de spaCy o NLTK adaptado), validado con mensajes etiquetados por el equipo, incluidos ejemplos en kichwa.', p: 2, r: 'Así medimos y mejoramos la programación.', fb: 'El análisis de sentimiento debe validarse con datos locales, porque el lenguaje cambia según la región y la lengua.' },
          { t: 'Contamos las caritas felices.', p: 1, r: '¿Y los mensajes sin emojis?', fb: 'Es una señal parcial; se necesita analizar el texto.' },
          { t: 'Usamos una herramienta en inglés sin probarla.', p: 0, r: '¿Entenderá nuestros mensajes?', fb: 'Un modelo no validado para el idioma local da resultados erróneos.' } ] }
    ],
    vivo: {
      lugar: 'Cabina de la radio comunitaria', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🕶️', t: 'Quitar números de teléfono y nombres', p: 2, fb: 'Anonimizar protege a los oyentes.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✂️', t: 'Tokenizar y eliminar palabras vacías', p: 2, fb: 'Deja solo las palabras con contenido.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🚫', t: 'Borrar los mensajes en kichwa', p: 0, fb: 'Excluye a una parte de la audiencia.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Normaliza el texto', claves: ['minusculas', 'normaliz', 'emojis', 'ortografia', 'limpiar', 'preprocesa'] },
            { n: 'Tokeniza y quita palabras vacías', claves: ['tokeniz', 'tokens', 'stopwords', 'palabras vacias', 'lematiz'] },
            { n: 'Protege los datos personales', claves: ['telefono', 'nombres', 'anonim', 'datos personales', 'privacidad', 'proteger'] }
          ],
          evitar: [ { claves: ['borramos los mensajes en kichwa', 'quitamos el kichwa'], fb: 'Excluir una lengua sesga y discrimina.' } ],
          modelo: 'Primero preprocesamos: quitamos los números de teléfono y nombres para proteger los datos personales, pasamos a minúsculas, tokenizamos, quitamos las stopwords y lematizamos.'
        },
        {
          acciones: [
            { icono: '🔢', t: 'Contar la frecuencia de palabras', p: 2, fb: 'Las frecuencias muestran los temas recurrentes.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⚖️', t: 'Calcular TF-IDF de los términos', p: 2, fb: 'TF-IDF resalta palabras distintivas.', efecto: { confianza: 8, tension: -4 } },
            { icono: '👀', t: 'Leer solo los primeros diez mensajes', p: 0, fb: 'La muestra no representa a la audiencia.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Cuenta frecuencias', claves: ['frecuencia', 'contar', 'conteo', 'mas mencionad', 'veces'] },
            { n: 'Usa n-gramas o TF-IDF', claves: ['bigrama', 'n grama', 'tf idf', 'pares de palabras', 'terminos importantes'] },
            { n: 'Presenta los temas con un gráfico', claves: ['grafico', 'barras', 'nube de palabras', 'visualiz', 'temas'] }
          ],
          evitar: [ { claves: ['primeros 10', 'primeros diez'], fb: 'Hay que analizar todos los mensajes.' } ],
          modelo: 'Contamos la frecuencia de palabras y de bigramas, usamos TF-IDF para resaltar los términos importantes y mostramos los temas en un gráfico de barras.'
        },
        {
          acciones: [
            { icono: '😊', t: 'Aplicar un modelo de sentimiento en español', p: 2, fb: 'Una librería de PLN clasifica el tono del mensaje.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏷️', t: 'Etiquetar 200 mensajes para validar', p: 2, fb: 'La validación local mide si el modelo acierta.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🇺🇸', t: 'Usar una herramienta en inglés sin probar', p: 0, fb: 'No está preparada para el idioma local.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Aplica análisis de sentimiento', claves: ['sentimiento', 'positivo', 'negativo', 'contentos', 'opinion'] },
            { n: 'Usa una librería de PLN', claves: ['libreria', 'spacy', 'nltk', 'modelo en espanol', 'python'] },
            { n: 'Valida con datos locales', claves: ['validar', 'etiquetad', 'kichwa', 'ejemplos locales', 'probar', 'comparar'] }
          ],
          evitar: [ { claves: ['sin probarla', 'en ingles directamente'], fb: 'Un modelo no validado da resultados erróneos.' } ],
          modelo: 'Aplicamos análisis de sentimiento con una librería de Python como spaCy con un modelo en español, y lo validamos con mensajes etiquetados por el equipo, incluidos ejemplos en kichwa.'
        }
      ]
    }
  },

  /* ===================== IA-14 Automatización de Procesos con IA ===================== */
  {
    id: 'asig-IA-14', cod: 'IA-14',
    titulo: 'Dos días copiando reportes',
    asignaturas: ['IA-14'],
    persona: { nombre: 'CPA Hilda Vargas', rol: 'Contadora de una cooperativa de ahorro y crédito de Puyo', avatar: '👩🏽‍💼', pitch: 1.05 },
    contexto: 'Cada fin de mes, la contadora pasa dos días copiando datos de 12 reportes de agencias que llegan por correo en Excel y PDF, para armar un consolidado. Quiere automatizarlo.',
    objetivo: 'Aplicar automatización básica con scripts, herramientas de automatización e integración de procesos con IA.',
    pasos: [
      { dice: '¿Se puede automatizar esto? ¿Por dónde empezamos?', opciones: [
          { t: 'Primero mapeamos el proceso: entradas (reportes), pasos, reglas de validación y salida (consolidado); identificamos qué es repetitivo y qué requiere criterio humano.', p: 2, r: 'Nunca lo había visto dibujado así.', fb: 'Automatizar empieza por entender y documentar el proceso.' },
          { t: 'Compramos un robot de software caro y que lo haga.', p: 1, r: '¿Sin saber qué hará?', fb: 'Sin mapear el proceso, la herramienta automatiza el desorden.' },
          { t: 'No se puede, la contabilidad es manual.', p: 0, r: 'Qué pena…', fb: 'Muchas tareas repetitivas contables sí se pueden automatizar.' } ] },
      { dice: 'Ya tenemos el mapa. ¿Cómo sería la automatización?', opciones: [
          { t: 'Un script en Python que descargue los adjuntos, lea los Excel con Pandas, valide totales, consolide y genere el reporte, programado para ejecutarse el último día del mes.', p: 2, r: '¡Y yo solo reviso el resultado!', fb: 'Los scripts y la programación de tareas eliminan el trabajo repetitivo.' },
          { t: 'Una macro que solo copie y pegue una hoja.', p: 1, r: 'Ayuda un poco.', fb: 'Automatiza una parte, pero no el flujo completo.' },
          { t: 'Que la pasante lo haga más rápido.', p: 0, r: 'Eso no es automatizar.', fb: 'Trasladar el trabajo manual no lo automatiza.' } ] },
      { dice: 'Algunas agencias mandan el reporte escaneado en PDF. ¿Y si algo falla?', opciones: [
          { t: 'Usamos OCR con IA para extraer los datos del PDF; si la confianza es baja o los totales no cuadran, el sistema lo marca para revisión humana; guardamos registros (logs) y las credenciales en un lugar seguro.', p: 2, r: 'Así no se nos escapa ningún error.', fb: 'Integrar IA con controles, registros y revisión de excepciones hace confiable la automatización.' },
          { t: 'Confiamos en lo que lea el OCR sin revisar.', p: 0, r: '¿Y si lee un 8 como 3?', fb: 'Sin validación los errores pasan al consolidado.' },
          { t: 'Pedimos a esas agencias que digiten todo de nuevo.', p: 1, r: 'Se van a quejar.', fb: 'Resuelve el formato, pero traslada el trabajo manual.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de contabilidad de la cooperativa', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Dibujar el diagrama del proceso actual', p: 2, fb: 'El mapa del proceso muestra qué automatizar.', efecto: { confianza: 10, tension: -6 } },
            { icono: '⏱️', t: 'Medir cuánto tarda cada paso', p: 2, fb: 'Medir permite priorizar y luego comparar.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💳', t: 'Comprar una herramienta cara sin analizar', p: 0, fb: 'Automatizar sin entender el proceso es desperdicio.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Mapea el proceso', claves: ['mapear', 'mapa', 'diagrama', 'proceso', 'pasos', 'flujo'] },
            { n: 'Identifica entradas, reglas y salidas', claves: ['entradas', 'reglas', 'salida', 'validacion', 'consolidado'] },
            { n: 'Distingue lo repetitivo de lo que requiere criterio', claves: ['repetitiv', 'criterio humano', 'manual', 'decision', 'automatizable'] }
          ],
          evitar: [ { claves: ['no se puede', 'compramos un robot'], fb: 'Primero se analiza el proceso.' } ],
          modelo: 'Primero mapeamos el proceso en un diagrama: las entradas son los reportes, luego los pasos y reglas de validación, y la salida es el consolidado; así vemos qué es repetitivo y qué requiere criterio humano.'
        },
        {
          acciones: [
            { icono: '🐍', t: 'Escribir un script que lea y consolide los Excel', p: 2, fb: 'El script hace en minutos lo que tomaba días.', efecto: { confianza: 10, tension: -8 } },
            { icono: '⏰', t: 'Programar la ejecución a fin de mes', p: 2, fb: 'El programador de tareas lo ejecuta sin intervención.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧑‍🎓', t: 'Pasarle el trabajo a la pasante', p: 0, fb: 'No es automatización.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa un script', claves: ['script', 'python', 'pandas', 'codigo', 'programa'] },
            { n: 'Integra todo el flujo', claves: ['descargue', 'adjuntos', 'lea', 'consolide', 'genere el reporte', 'valide'] },
            { n: 'Programa la ejecución', claves: ['programad', 'cron', 'programador de tareas', 'fin de mes', 'automatic', 'ultimo dia'] }
          ],
          evitar: [ { claves: ['que la pasante', 'mas personas'], fb: 'Trasladar el trabajo no lo automatiza.' } ],
          modelo: 'Un script en Python que descargue los adjuntos, los lea con Pandas, valide los totales y genere el reporte consolidado, programado para ejecutarse automáticamente el último día del mes.'
        },
        {
          acciones: [
            { icono: '🔍', t: 'Aplicar OCR con IA a los PDF escaneados', p: 2, fb: 'El OCR extrae el texto de las imágenes.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🚩', t: 'Enviar a revisión humana lo que no cuadre', p: 2, fb: 'Las excepciones se revisan con criterio.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🙈', t: 'Aceptar todo lo que lea el OCR', p: 0, fb: 'Los errores pasan sin control.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Integra IA para leer los PDF', claves: ['ocr', 'reconocimiento de texto', 'extraer', 'inteligencia artificial', 'leer el pdf'] },
            { n: 'Revisión humana de excepciones', claves: ['revision humana', 'confianza es baja', 'no cuadran', 'excepcion', 'marca', 'alerta'] },
            { n: 'Registros y seguridad', claves: ['logs', 'registros', 'credenciales', 'seguro', 'bitacora', 'auditoria'] }
          ],
          evitar: [ { claves: ['sin revisar', 'confiamos en todo'], fb: 'La automatización necesita controles.' } ],
          modelo: 'Usamos OCR con inteligencia artificial para extraer los datos del PDF; si la confianza es baja o los totales no cuadran, se marca para revisión humana, y guardamos logs y las credenciales en un lugar seguro.'
        }
      ]
    }
  },

  /* ===================== IA-15 Computación en la Nube ===================== */
  {
    id: 'asig-IA-15', cod: 'IA-15',
    titulo: 'Las fotos de la agencia se suben a la nube',
    asignaturas: ['IA-15'],
    persona: { nombre: 'Sr. Byron Torres', rol: 'Dueño de una agencia de turismo de aventura en Puyo', avatar: '🧔🏽', pitch: 0.9 },
    contexto: 'La agencia guarda reservas y miles de fotos de rafting en un disco externo que ya falló una vez. El dueño quiere pasarse a la nube, pero no entiende las opciones.',
    objetivo: 'Utilizar el concepto de cloud computing, sus servicios, el almacenamiento y la seguridad básica en plataformas en la nube.',
    pasos: [
      { dice: 'Todos hablan de "la nube". ¿Qué es y qué me conviene?', opciones: [
          { t: 'Son servidores de un proveedor a los que accedes por internet y pagas por uso. Para reservas te conviene un software como servicio (SaaS) y para las fotos un almacenamiento de objetos; no necesitas administrar servidores (IaaS).', p: 2, r: 'Ah, no tengo que comprar equipos.', fb: 'Distinguir IaaS, PaaS y SaaS permite elegir según la necesidad y la capacidad técnica.' },
          { t: 'Es un lugar en el cielo donde se guardan los archivos.', p: 0, r: '¿En serio?', fb: 'La nube son centros de datos físicos de proveedores.' },
          { t: 'Es como un disco duro pero en internet.', p: 1, r: '¿Solo eso?', fb: 'Es una parte; la nube también ofrece aplicaciones y cómputo.' } ] },
      { dice: '¿Cómo organizo las fotos y cuánto me costará?', opciones: [
          { t: 'Un contenedor de almacenamiento por año, con carpetas por excursión, versiones activadas, una región cercana, respaldo automático y una alerta de presupuesto; las fotos antiguas pasan a una clase de almacenamiento más barata.', p: 2, r: 'Ordenado y sin sorpresas en la factura.', fb: 'Organizar, versionar, respaldar y controlar costos son buenas prácticas de almacenamiento en la nube.' },
          { t: 'Subo todo a una sola carpeta sin orden.', p: 1, r: 'Después no encontraré nada.', fb: 'Sin organización el almacenamiento pierde utilidad.' },
          { t: 'Uso el plan más caro por si acaso.', p: 0, r: '¡Es muy costoso!', fb: 'El pago por uso permite dimensionar según la necesidad.' } ] },
      { dice: 'Mi sobrino dice que deje el enlace público para que los clientes vean sus fotos.', opciones: [
          { t: 'Mejor no: el contenedor debe ser privado; compartimos enlaces temporales por cliente, activamos la autenticación multifactor, permisos mínimos y cifrado. La seguridad de la configuración es nuestra responsabilidad.', p: 2, r: 'No quiero que se filtren las fotos de mis clientes.', fb: 'En el modelo de responsabilidad compartida, el cliente protege accesos y configuraciones.' },
          { t: 'Sí, déjalo público, es más fácil.', p: 0, r: '¿Y la privacidad?', fb: 'Los contenedores públicos son una causa común de fugas de datos.' },
          { t: 'Pongo una contraseña fácil para todos.', p: 1, r: 'Todos la sabrán.', fb: 'Una clave compartida y débil no controla el acceso.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de la agencia de turismo, junto al río Pastaza', fondo: 'exterior',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🏢', t: 'Mostrar fotos de un centro de datos real', p: 2, fb: 'Desmitifica la nube: son servidores físicos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🍰', t: 'Dibujar las capas IaaS, PaaS y SaaS', p: 2, fb: 'Aclara qué administra cada parte.', efecto: { confianza: 8, tension: -6 } },
            { icono: '☁️', t: 'Decirle que es un lugar en el cielo', p: 0, fb: 'Es una explicación falsa.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Define la nube como servicios por internet', claves: ['servidores', 'proveedor', 'internet', 'centro de datos', 'remoto'] },
            { n: 'Menciona el pago por uso', claves: ['pago por uso', 'pagas por uso', 'lo que usas', 'suscripcion', 'sin comprar equipos'] },
            { n: 'Distingue los modelos de servicio', claves: ['saas', 'iaas', 'paas', 'software como servicio', 'almacenamiento'] }
          ],
          evitar: [ { claves: ['en el cielo', 'en el aire'], fb: 'La nube son centros de datos físicos.' } ],
          modelo: 'La nube son servidores de un proveedor a los que accedes por internet y pagas por uso. Para reservas le conviene un SaaS y para las fotos un servicio de almacenamiento, sin administrar servidores.'
        },
        {
          acciones: [
            { icono: '🗂️', t: 'Crear carpetas por año y excursión', p: 2, fb: 'La organización facilita encontrar y gestionar.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔔', t: 'Configurar una alerta de presupuesto', p: 2, fb: 'Evita sorpresas en la factura.', efecto: { confianza: 8, tension: -6 } },
            { icono: '💰', t: 'Contratar el plan más caro', p: 0, fb: 'Desperdicia dinero.', efecto: { confianza: -6, tension: 8 } }
          ],
          conceptos: [
            { n: 'Organiza el almacenamiento', claves: ['contenedor', 'carpetas', 'organiz', 'por ano', 'por excursion', 'bucket'] },
            { n: 'Versiona y respalda', claves: ['version', 'respaldo', 'backup', 'copia', 'replica'] },
            { n: 'Controla los costos', claves: ['alerta de presupuesto', 'costo', 'mas barata', 'clase de almacenamiento', 'region', 'factura'] }
          ],
          evitar: [ { claves: ['el plan mas caro', 'por si acaso'], fb: 'El pago por uso permite dimensionar.' } ],
          modelo: 'Creamos un contenedor con carpetas por año y excursión, activamos versiones y respaldo, y configuramos una alerta de presupuesto; las fotos antiguas pasan a una clase de almacenamiento más barata.'
        },
        {
          acciones: [
            { icono: '🔒', t: 'Dejar el contenedor en modo privado', p: 2, fb: 'Evita que cualquiera vea las fotos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '⏳', t: 'Generar enlaces temporales por cliente', p: 2, fb: 'Comparte solo lo necesario y por tiempo limitado.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🌍', t: 'Hacer público el contenedor', p: 0, fb: 'Expone las fotos de todos los clientes.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Mantiene el almacenamiento privado', claves: ['privado', 'no publico', 'enlaces temporales', 'por cliente', 'acceso limitado'] },
            { n: 'Aplica controles de seguridad', claves: ['multifactor', 'mfa', 'permisos minimos', 'cifrado', 'dos pasos', 'contrasena'] },
            { n: 'Reconoce la responsabilidad compartida', claves: ['responsabilidad compartida', 'nuestra responsabilidad', 'configuracion', 'proveedor protege', 'nos toca proteger'] }
          ],
          evitar: [ { claves: ['dejalo publico', 'contrasena facil'], fb: 'Un contenedor público o una clave débil provocan fugas.' } ],
          modelo: 'Mejor no: el contenedor debe ser privado y compartimos enlaces temporales por cliente, con autenticación multifactor, permisos mínimos y cifrado; la configuración segura es nuestra responsabilidad.'
        }
      ]
    }
  },

  /* ===================== IA-16 Aplicaciones de Inteligencia Artificial ===================== */
  {
    id: 'asig-IA-16', cod: 'IA-16',
    titulo: 'Una app que reconoce plagas en la naranjilla',
    asignaturas: ['IA-16'],
    persona: { nombre: 'Ing. Marcelo Tapuy', rol: 'Técnico de una asociación de naranjilleros de Mera', avatar: '👨🏽‍🌾', pitch: 0.95 },
    contexto: 'Los productores pierden cosechas por enfermedades que detectan tarde. El técnico quiere una aplicación que, con una foto de la hoja, sugiera qué enfermedad podría ser.',
    objetivo: 'Aplicar herramientas de IA de reconocimiento de patrones en ejemplos de la industria y los servicios, con prácticas en software.',
    pasos: [
      { dice: '¿Qué tipo de inteligencia artificial necesitamos para esto?', opciones: [
          { t: 'Reconocimiento de patrones en imágenes: un clasificador de visión por computadora que aprende de fotos etiquetadas; podemos partir de un modelo preentrenado y ajustarlo (transferencia de aprendizaje).', p: 2, r: 'No hay que empezar de cero, qué bien.', fb: 'La clasificación de imágenes con transferencia de aprendizaje es una aplicación accesible y eficaz.' },
          { t: 'Un chatbot que converse con el productor.', p: 1, r: '¿Y cómo ve la hoja?', fb: 'Un chatbot puede complementar, pero el núcleo es reconocer imágenes.' },
          { t: 'Un robot que fumigue todo el cultivo.', p: 0, r: 'Eso no responde lo que necesitamos.', fb: 'No es la aplicación pedida y fumigar sin diagnóstico es dañino.' } ] },
      { dice: '¿Qué fotos necesitamos y cómo la probamos?', opciones: [
          { t: 'Cientos de fotos por clase (sana y cada enfermedad), tomadas en distintas fincas, luces y celulares, etiquetadas por un agrónomo; probamos con una herramienta sencilla de entrenamiento y evaluamos con fotos nuevas de campo.', p: 2, r: 'Hay que ir a varias fincas a fotografiar.', fb: 'Datos variados y bien etiquetados, y la evaluación con datos de campo, hacen al modelo útil en la realidad.' },
          { t: 'Bajamos fotos de internet de cualquier planta.', p: 0, r: 'Esas no son de naranjilla.', fb: 'Datos ajenos al contexto producen un modelo inútil.' },
          { t: 'Unas 20 fotos de mi finca bastan.', p: 1, r: 'Pocas, ¿no?', fb: 'Pocos ejemplos y de un solo lugar no generalizan.' } ] },
      { dice: '¿La app le dirá al productor qué químico echar?', opciones: [
          { t: 'No: sugerirá una posible enfermedad con su nivel de confianza y recomendará confirmar con el técnico; debe funcionar sin internet en campo y explicar sus límites.', p: 2, r: 'Así apoya al productor sin reemplazar al técnico.', fb: 'Las aplicaciones de IA en servicios deben ser apoyos con supervisión experta y límites claros.' },
          { t: 'Sí, que recete directamente el producto.', p: 0, r: '¿Y si se equivoca?', fb: 'Un error podría dañar el cultivo y la salud.' },
          { t: 'Que diga solo "sana" o "enferma".', p: 1, r: 'Ayuda, pero poco.', fb: 'Es útil, pero se pierde información relevante.' } ] }
    ],
    vivo: {
      lugar: 'Finca de naranjilla en Mera', fondo: 'exterior',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📷', t: 'Fotografiar hojas sanas y enfermas', p: 2, fb: 'Las imágenes etiquetadas son la base del clasificador.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧠', t: 'Elegir un modelo preentrenado de visión', p: 2, fb: 'La transferencia de aprendizaje ahorra datos y tiempo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚁', t: 'Proponer un dron que fumigue todo', p: 0, fb: 'No resuelve el diagnóstico.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Reconocimiento de patrones en imágenes', claves: ['reconocimiento de patrones', 'imagenes', 'vision por computadora', 'fotos', 'reconocer'] },
            { n: 'Clasificador que aprende de ejemplos', claves: ['clasificador', 'clasificacion', 'etiquetad', 'aprende', 'entrenar'] },
            { n: 'Usa un modelo preentrenado', claves: ['preentrenado', 'transferencia', 'ajustar', 'no empezar de cero', 'reutilizar'] }
          ],
          evitar: [ { claves: ['fumigue todo', 'fumigar todo'], fb: 'Fumigar sin diagnóstico es dañino.' } ],
          modelo: 'Necesitamos reconocimiento de patrones en imágenes: un clasificador de visión por computadora que aprende de fotos etiquetadas, partiendo de un modelo preentrenado mediante transferencia de aprendizaje.'
        },
        {
          acciones: [
            { icono: '🧑‍🔬', t: 'Pedir al agrónomo que etiquete las fotos', p: 2, fb: 'Las etiquetas expertas dan calidad al modelo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🌦️', t: 'Fotografiar en varias fincas y con distinta luz', p: 2, fb: 'La variedad permite generalizar.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🌐', t: 'Descargar fotos de cualquier planta de internet', p: 0, fb: 'Datos fuera de contexto.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Muchas fotos por clase y variadas', claves: ['cientos', 'por clase', 'distintas fincas', 'variad', 'luz', 'celulares'] },
            { n: 'Etiquetado experto', claves: ['agronomo', 'etiquet', 'experto', 'tecnico', 'validad'] },
            { n: 'Prueba con software y evalúa en campo', claves: ['herramienta', 'software', 'probar', 'evaluar', 'fotos nuevas', 'campo'] }
          ],
          evitar: [ { claves: ['de internet', 'cualquier planta'], fb: 'Los datos deben ser del contexto real.' } ],
          modelo: 'Necesitamos cientos de fotos por clase, variadas, de distintas fincas, luces y celulares, etiquetadas por un agrónomo; probamos con una herramienta de software y evaluamos con fotos nuevas de campo.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Mostrar el porcentaje de confianza en la app', p: 2, fb: 'La confianza ayuda a interpretar la sugerencia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📞', t: 'Agregar un botón para contactar al técnico', p: 2, fb: 'La supervisión experta confirma el diagnóstico.', efecto: { confianza: 8, tension: -6 } },
            { icono: '💊', t: 'Hacer que la app recete el químico', p: 0, fb: 'Un error podría dañar cultivos y salud.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Sugiere con nivel de confianza', claves: ['sugiere', 'posible', 'confianza', 'probabilidad', 'porcentaje'] },
            { n: 'Confirma con el técnico', claves: ['confirmar', 'tecnico', 'experto', 'agronomo', 'supervision'] },
            { n: 'Funciona en campo y explica sus límites', claves: ['sin internet', 'campo', 'limites', 'limitaciones', 'puede equivocarse'] }
          ],
          evitar: [ { claves: ['recete', 'que diga el quimico'], fb: 'La app apoya, no reemplaza al técnico.' } ],
          modelo: 'No: la app sugiere una posible enfermedad con su nivel de confianza y recomienda confirmar con el técnico; además funciona sin internet en el campo y explica sus límites.'
        }
      ]
    }
  },

  /* ===================== IA-17 Big Data y Análisis de Información ===================== */
  {
    id: 'asig-IA-17', cod: 'IA-17',
    titulo: 'Millones de posiciones de los buses de Puyo',
    asignaturas: ['IA-17'],
    persona: { nombre: 'Ing. Gustavo Cevallos', rol: 'Jefe de movilidad de un municipio amazónico', avatar: '👨🏻‍💼', pitch: 0.9 },
    contexto: 'Los buses urbanos envían su posición GPS cada 5 segundos. En un año son cientos de millones de registros y la hoja de cálculo ya no abre. El jefe quiere saber las horas pico y los tiempos de recorrido.',
    objetivo: 'Utilizar conceptos de Big Data, almacenamiento y procesamiento de datos masivos y herramientas de análisis en un caso práctico.',
    pasos: [
      { dice: '¿Por qué ya no me sirve Excel? ¿Esto es Big Data?', opciones: [
          { t: 'Sí: por el volumen (cientos de millones de filas), la velocidad (llegan cada 5 segundos) y la variedad (GPS, horarios, incidencias); además hay que cuidar la veracidad y obtener valor.', p: 2, r: 'Las cinco V… ahora entiendo.', fb: 'Big Data se caracteriza por volumen, velocidad, variedad, veracidad y valor.' },
          { t: 'Es Big Data porque son datos importantes.', p: 1, r: '¿Solo por eso?', fb: 'No es la importancia, sino sus características (las V).' },
          { t: 'Compremos una computadora más grande y seguimos con Excel.', p: 0, r: '¿Y cuando sean más datos?', fb: 'Escalar una herramienta de escritorio tiene límites.' } ] },
      { dice: '¿Dónde guardamos tantos datos?', opciones: [
          { t: 'En un almacenamiento distribuido o data lake en la nube, en formato columnar comprimido (Parquet) y particionado por fecha, para consultar solo lo necesario.', p: 2, r: 'Así una consulta de un día no lee todo el año.', fb: 'El particionado y los formatos columnares reducen costos y tiempos de consulta.' },
          { t: 'En muchos archivos Excel, uno por día.', p: 1, r: 'Serían 365 archivos…', fb: 'Fragmenta, pero no permite consultas eficientes.' },
          { t: 'En el celular del jefe.', p: 0, r: '¡Imposible!', fb: 'No hay capacidad ni seguridad.' } ] },
      { dice: '¿Cómo obtengo las horas pico y los tiempos de recorrido?', opciones: [
          { t: 'Con procesamiento distribuido (por ejemplo, Spark): agrupamos por ruta y hora, calculamos tiempos promedio entre paradas y lo mostramos en un tablero; antes anonimizamos las placas y conductores.', p: 2, r: 'Con eso reorganizamos las frecuencias.', fb: 'El procesamiento distribuido divide el trabajo entre nodos; anonimizar protege a las personas.' },
          { t: 'Revisamos un día al azar a mano.', p: 1, r: 'Un día no representa el año.', fb: 'Una muestra mínima no captura los patrones.' },
          { t: 'Publicamos los datos con nombres de conductores para que la gente opine.', p: 0, r: 'Eso expone a los conductores.', fb: 'Publicar datos personales vulnera la privacidad.' } ] }
    ],
    vivo: {
      lugar: 'Centro de control de movilidad del municipio', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📏', t: 'Calcular cuántos registros se generan al año', p: 2, fb: 'Dimensionar el volumen muestra el reto real.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🖐️', t: 'Explicar las cinco V con los datos de los buses', p: 2, fb: 'Aplicar las V al caso concreta el concepto.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🖥️', t: 'Comprar una laptop más potente para Excel', p: 0, fb: 'No escala.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Volumen', claves: ['volumen', 'millones', 'cientos de millones', 'muchos registros', 'tamano'] },
            { n: 'Velocidad', claves: ['velocidad', 'cada 5 segundos', 'cada cinco segundos', 'tiempo real', 'continuo'] },
            { n: 'Variedad, veracidad y valor', claves: ['variedad', 'veracidad', 'valor', 'cinco v', 'distintos formatos'] }
          ],
          evitar: [ { claves: ['seguimos con excel', 'computadora mas grande'], fb: 'Las herramientas de escritorio no escalan al Big Data.' } ],
          modelo: 'Sí es Big Data: por el volumen de cientos de millones de filas, la velocidad porque llegan cada 5 segundos y la variedad de datos; además hay que cuidar la veracidad para obtener valor.'
        },
        {
          acciones: [
            { icono: '🏞️', t: 'Diseñar un data lake en la nube', p: 2, fb: 'Escala con el crecimiento de los datos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📅', t: 'Particionar los datos por fecha', p: 2, fb: 'Las consultas leen solo las particiones necesarias.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📱', t: 'Guardarlo en el celular del jefe', p: 0, fb: 'Sin capacidad ni seguridad.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Almacenamiento distribuido o data lake', claves: ['distribuid', 'data lake', 'lago de datos', 'nube', 'cluster'] },
            { n: 'Formato columnar comprimido', claves: ['parquet', 'columnar', 'comprimid', 'formato eficiente', 'por columnas'] },
            { n: 'Particionado para consultar lo necesario', claves: ['particion', 'por fecha', 'solo lo necesario', 'por dia', 'consultar'] }
          ],
          evitar: [ { claves: ['en el celular', 'un excel por dia'], fb: 'No permite manejar datos masivos.' } ],
          modelo: 'En un almacenamiento distribuido tipo data lake en la nube, con formato columnar comprimido como Parquet y particionado por fecha, para consultar solo lo necesario.'
        },
        {
          acciones: [
            { icono: '⚡', t: 'Procesar con Spark en un clúster', p: 2, fb: 'Reparte el cálculo entre varios nodos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🕶️', t: 'Anonimizar placas y conductores', p: 2, fb: 'Protege a las personas en el análisis.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📢', t: 'Publicar los datos con nombres de conductores', p: 0, fb: 'Expone datos personales.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Procesamiento distribuido', claves: ['spark', 'distribuid', 'hadoop', 'nodos', 'paralelo', 'cluster'] },
            { n: 'Análisis por ruta y hora', claves: ['por ruta', 'por hora', 'horas pico', 'tiempo promedio', 'agrupamos', 'paradas'] },
            { n: 'Anonimiza y presenta resultados', claves: ['anonim', 'placas', 'tablero', 'dashboard', 'privacidad'] }
          ],
          evitar: [ { claves: ['con nombres de conductores', 'publicamos todo'], fb: 'Publicar datos personales vulnera la privacidad.' } ],
          modelo: 'Usamos procesamiento distribuido con Spark: agrupamos por ruta y por hora, calculamos el tiempo promedio entre paradas y lo mostramos en un tablero, después de anonimizar las placas y los conductores.'
        }
      ]
    }
  },

  /* ===================== IA-18 Seguridad de la Información y Protección de Datos ===================== */
  {
    id: 'asig-IA-18', cod: 'IA-18',
    titulo: 'Los archivos de la caja de ahorro están secuestrados',
    asignaturas: ['IA-18'],
    persona: { nombre: 'Sra. Patricia Guevara', rol: 'Gerenta de una caja de ahorro comunitaria de Pastaza', avatar: '👩🏻‍💼', pitch: 1.05 },
    contexto: 'Una empleada abrió un adjunto de un correo falso y ahora los archivos de la computadora de créditos aparecen cifrados con un mensaje que pide rescate. La gerenta te llama desesperada.',
    objetivo: 'Aplicar normas de seguridad informática, protección de datos, gestión de riesgos digitales y buenas prácticas.',
    pasos: [
      { dice: '¡Los archivos no abren y piden 2 000 dólares para devolverlos! ¿Qué hacemos?', opciones: [
          { t: 'Desconecten ya esa computadora de la red y del wifi para que no se propague, no apaguen ni paguen, y avisen al responsable de sistemas; documentamos lo ocurrido.', p: 2, r: 'Ya la desconectamos.', fb: 'Contener el ransomware aislando el equipo evita que cifre otros equipos; pagar no garantiza recuperar los datos.' },
          { t: 'Paguemos rápido para recuperar los archivos.', p: 0, r: '¿Y si no los devuelven?', fb: 'Pagar financia a los delincuentes y no garantiza la recuperación.' },
          { t: 'Reiniciemos la computadora a ver si se arregla.', p: 1, r: 'Sigue igual…', fb: 'Reiniciar no detiene la infección y puede perder evidencia.' } ] },
      { dice: 'En esa computadora estaban los datos de los socios y sus créditos.', opciones: [
          { t: 'Evaluamos qué datos personales se afectaron y si hubo extracción; restauramos desde el respaldo limpio; informamos a los socios afectados y seguimos el protocolo de notificación de vulneraciones de la LOPDP.', p: 2, r: 'Es lo correcto con nuestros socios.', fb: 'La protección de datos exige evaluar el impacto, recuperar y notificar las vulneraciones.' },
          { t: 'No decimos nada para no asustar a los socios.', p: 0, r: '…', fb: 'Ocultar una vulneración de datos personales agrava el daño y el incumplimiento.' },
          { t: 'Restauramos el respaldo y seguimos como si nada.', p: 1, r: '¿Y los datos que pudieron salir?', fb: 'Recuperar es necesario, pero falta evaluar y notificar.' } ] },
      { dice: '¿Cómo evitamos que vuelva a pasar?', opciones: [
          { t: 'Respaldos 3-2-1 con una copia desconectada, actualizaciones al día, antivirus, autenticación multifactor, permisos mínimos y capacitación para reconocer correos falsos, sin culpar a la empleada.', p: 2, r: 'Haremos un plan con todo eso.', fb: 'La defensa en capas combina medidas técnicas y formación de las personas.' },
          { t: 'Despedir a la empleada.', p: 0, r: '¿Eso lo evita?', fb: 'Sancionar no corrige las causas; cualquiera puede caer en phishing.' },
          { t: 'Instalar un antivirus y listo.', p: 1, r: '¿Es suficiente?', fb: 'Ayuda, pero una sola medida no basta.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de créditos de la caja de ahorro comunitaria', fondo: 'oficina',
      inicio: { confianza: 35, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🔌', t: 'Desconectar el equipo de la red y el wifi', p: 2, fb: 'Aislar evita la propagación a otros equipos.', efecto: { confianza: 10, tension: -10 } },
            { icono: '📸', t: 'Fotografiar el mensaje de rescate como evidencia', p: 2, fb: 'La evidencia sirve para la investigación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💵', t: 'Pagar el rescate', p: 0, fb: 'No garantiza nada y financia el delito.', efecto: { confianza: 4, tension: 6 } }
          ],
          conceptos: [
            { n: 'Aísla el equipo infectado', claves: ['desconect', 'aislar', 'red', 'wifi', 'propague'] },
            { n: 'No paga el rescate', claves: ['no paguen', 'no pagar', 'no pagamos', 'rescate', 'no garantiza'] },
            { n: 'Avisa y documenta', claves: ['avisar', 'avisen', 'responsable de sistemas', 'document', 'evidencia', 'reportar'] }
          ],
          evitar: [ { claves: ['paguemos', 'pagar rapido'], fb: 'Pagar no garantiza recuperar los datos.' } ],
          modelo: 'Desconecten ya la computadora de la red y del wifi para que no se propague, no paguen el rescate porque no garantiza nada, y avisen al responsable de sistemas; documentamos la evidencia.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Inventariar qué datos de socios había', p: 2, fb: 'Permite evaluar el impacto de la vulneración.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💾', t: 'Restaurar desde un respaldo limpio', p: 2, fb: 'Recupera la operación sin pagar.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🤐', t: 'Ocultar el incidente a los socios', p: 0, fb: 'Vulnera sus derechos y la confianza.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Evalúa el impacto en los datos personales', claves: ['evaluar', 'datos personales', 'afectad', 'extraccion', 'impacto', 'socios'] },
            { n: 'Restaura desde el respaldo', claves: ['respaldo', 'restaur', 'backup', 'recuperar', 'copia'] },
            { n: 'Notifica según la normativa', claves: ['notific', 'informar', 'lopdp', 'protocolo', 'autoridad', 'avisar a los socios'] }
          ],
          evitar: [ { claves: ['no decimos nada', 'para no asustar'], fb: 'Ocultar una vulneración agrava el daño.' } ],
          modelo: 'Evaluamos qué datos personales de los socios se afectaron, restauramos desde el respaldo limpio, informamos a los socios afectados y seguimos el protocolo de notificación de la LOPDP.'
        },
        {
          acciones: [
            { icono: '🗄️', t: 'Configurar respaldos 3-2-1 con copia desconectada', p: 2, fb: 'Una copia fuera de línea no puede ser cifrada.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎓', t: 'Organizar una capacitación contra phishing', p: 2, fb: 'Las personas son la primera línea de defensa.', efecto: { confianza: 8, tension: -6 } },
            { icono: '👋', t: 'Despedir a la empleada', p: 0, fb: 'No corrige las causas y fomenta ocultar errores.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Respaldos y actualizaciones', claves: ['3 2 1', 'respaldo', 'copia desconectada', 'actualizacion', 'parches'] },
            { n: 'Controles técnicos de acceso', claves: ['multifactor', 'mfa', 'permisos minimos', 'antivirus', 'contrasena'] },
            { n: 'Capacitación sin culpas', claves: ['capacit', 'correos falsos', 'phishing', 'sin culpar', 'concienci'] }
          ],
          evitar: [ { claves: ['despedir', 'castigar'], fb: 'La sanción no corrige el proceso.' } ],
          modelo: 'Implementamos respaldos 3-2-1 con una copia desconectada, actualizaciones al día, antivirus, autenticación multifactor y permisos mínimos, y una capacitación para reconocer phishing sin culpar a nadie.'
        }
      ]
    }
  },

  /* ===================== IA-19 Integración de Sistemas Inteligentes ===================== */
  {
    id: 'asig-IA-19', cod: 'IA-19',
    titulo: 'Conectar el modelo al sistema de inventario',
    asignaturas: ['IA-19'],
    persona: { nombre: 'Ing. Esteban Paredes', rol: 'Desarrollador del sistema de inventario de una distribuidora de Puyo', avatar: '👨🏽‍💻', pitch: 1.0 },
    contexto: 'Tu equipo entrenó un modelo que predice la demanda de productos. El desarrollador del sistema de inventario necesita que su aplicación pida las predicciones automáticamente cada noche.',
    objetivo: 'Asistir en la integración de herramientas de IA mediante APIs, conexión de aplicaciones y herramientas de integración.',
    pasos: [
      { dice: '¿Cómo hago para que mi sistema obtenga las predicciones de su modelo?', opciones: [
          { t: 'Publicamos el modelo como una API REST: tu sistema envía una solicitud POST al endpoint /predecir con los datos en JSON y recibe la predicción en JSON; te entregamos la documentación de la API.', p: 2, r: 'Con un ejemplo de JSON lo conecto hoy.', fb: 'Una API documentada desacopla los sistemas y permite integrarlos con un contrato claro.' },
          { t: 'Te mando el archivo del modelo y lo copias en tu servidor.', p: 1, r: '¿Y cuando lo actualicen?', fb: 'Copiar el modelo acopla los sistemas y complica las actualizaciones.' },
          { t: 'Te envío las predicciones por WhatsApp cada mañana.', p: 0, r: 'Eso no es automático.', fb: 'La integración debe ser automática y confiable.' } ] },
      { dice: '¿Y la seguridad? ¿Qué pasa si la API falla?', opciones: [
          { t: 'Usamos HTTPS y una clave de API o token por sistema guardado como secreto; tu código maneja los códigos de respuesta (200, 400, 401, 500) con reintentos y tiempo de espera.', p: 2, r: 'Así no se cae mi sistema si el modelo tarda.', fb: 'La autenticación, el cifrado y el manejo de errores son esenciales en la integración.' },
          { t: 'La dejamos abierta sin clave para que sea fácil.', p: 0, r: '¿Cualquiera podría usarla?', fb: 'Una API sin autenticación expone el servicio y los datos.' },
          { t: 'Si falla, que el usuario vuelva a intentar a mano.', p: 1, r: 'De noche no hay nadie.', fb: 'El manejo de errores debe estar en el código.' } ] },
      { dice: '¿Cómo probamos antes de pasar a producción?', opciones: [
          { t: 'Probamos el endpoint con Postman en un entorno de pruebas, con casos normales y con errores; versionamos la API (v1) y monitoreamos tiempos de respuesta y fallas al publicarla.', p: 2, r: 'Así si cambiamos algo no rompemos lo anterior.', fb: 'Pruebas, versionado y monitoreo aseguran una integración estable.' },
          { t: 'Probamos directamente en producción.', p: 0, r: '¿Con los datos reales?', fb: 'Probar en producción arriesga la operación.' },
          { t: 'Hacemos una sola prueba con un caso.', p: 1, r: '¿Y los casos raros?', fb: 'Hay que probar también errores y casos límite.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de sistemas de la distribuidora', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🔌', t: 'Publicar el endpoint /predecir', p: 2, fb: 'El endpoint es el punto de conexión entre sistemas.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📘', t: 'Entregar la documentación con un ejemplo JSON', p: 2, fb: 'La documentación es el contrato de la integración.', efecto: { confianza: 10, tension: -6 } },
            { icono: '💬', t: 'Mandar las predicciones por WhatsApp', p: 0, fb: 'No es una integración automática.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Publica el modelo como API', claves: ['api', 'rest', 'endpoint', 'servicio', 'predecir'] },
            { n: 'Explica solicitud y respuesta en JSON', claves: ['json', 'solicitud', 'respuesta', 'post', 'envia', 'recibe'] },
            { n: 'Entrega la documentación', claves: ['documentacion', 'ejemplo', 'contrato', 'manual', 'especificacion'] }
          ],
          evitar: [ { claves: ['por whatsapp', 'a mano cada manana'], fb: 'La integración debe ser automática.' } ],
          modelo: 'Publicamos el modelo como una API REST: tu sistema envía una solicitud POST al endpoint predecir con los datos en JSON y recibe la respuesta en JSON; te entrego la documentación con un ejemplo.'
        },
        {
          acciones: [
            { icono: '🔑', t: 'Generar una clave de API para su sistema', p: 2, fb: 'Identifica y autoriza a cada sistema cliente.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔁', t: 'Programar reintentos con tiempo de espera', p: 2, fb: 'El sistema resiste fallas temporales.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚪', t: 'Dejar la API abierta sin autenticación', p: 0, fb: 'Expone el servicio y los datos.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Autenticación y cifrado', claves: ['https', 'clave de api', 'token', 'autentic', 'secreto'] },
            { n: 'Manejo de códigos de respuesta', claves: ['200', '400', '401', '500', 'codigos de respuesta', 'errores'] },
            { n: 'Reintentos y tiempo de espera', claves: ['reintent', 'tiempo de espera', 'timeout', 'si falla', 'tolerancia'] }
          ],
          evitar: [ { claves: ['abierta sin clave', 'sin autenticacion'], fb: 'Una API sin autenticación es insegura.' } ],
          modelo: 'Usamos HTTPS y una clave de API guardada como secreto; tu código maneja los códigos de respuesta como 200, 401 o 500, con reintentos y un tiempo de espera.'
        },
        {
          acciones: [
            { icono: '🧪', t: 'Probar el endpoint con Postman', p: 2, fb: 'Permite probar casos normales y de error.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📈', t: 'Configurar el monitoreo de la API', p: 2, fb: 'Detecta fallas y lentitud a tiempo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎲', t: 'Probar directamente en producción', p: 0, fb: 'Arriesga la operación real.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Prueba en un entorno de pruebas', claves: ['postman', 'entorno de pruebas', 'probar', 'pruebas', 'casos'] },
            { n: 'Versiona la API', claves: ['version', 'v1', 'versionar', 'compatib', 'no romper'] },
            { n: 'Monitorea en producción', claves: ['monitore', 'tiempos de respuesta', 'fallas', 'alertas', 'registros'] }
          ],
          evitar: [ { claves: ['directamente en produccion'], fb: 'Primero se prueba en un entorno controlado.' } ],
          modelo: 'Probamos el endpoint con Postman en un entorno de pruebas, con casos normales y con errores; versionamos la API como v1 y monitoreamos los tiempos de respuesta y las fallas.'
        }
      ]
    }
  },

  /* ===================== IA-20 Trabajo de Integración Curricular ===================== */
  {
    id: 'asig-IA-20', cod: 'IA-20',
    titulo: 'La revisión con el tutor del proyecto final',
    asignaturas: ['IA-20'],
    persona: { nombre: 'Ing. Fabián Chávez', rol: 'Tutor del trabajo de integración curricular', avatar: '👨🏻‍🏫', pitch: 0.95 },
    contexto: 'Presentas a tu tutor la idea de tu proyecto final: "una IA para el turismo de Pastaza". El tutor te ayuda a convertirla en un proyecto tecnológico guiado, documentado y presentable.',
    objetivo: 'Aplicar la identificación del problema, el uso de herramientas tecnológicas, el desarrollo práctico, la documentación y la presentación del proyecto.',
    pasos: [
      { dice: '"Una IA para el turismo" es muy amplio. ¿Qué problema concreto vas a resolver?', opciones: [
          { t: 'Delimito el problema con datos: los emprendimientos de turismo comunitario pierden reservas porque no responden mensajes fuera de horario; objetivo: un asistente que responda preguntas frecuentes en español y kichwa, medido por el tiempo de respuesta.', p: 2, r: 'Ahora sí es un proyecto alcanzable y medible.', fb: 'Un problema delimitado, con beneficiarios y un objetivo medible, orienta todo el trabajo de integración.' },
          { t: 'Haré una app con IA que haga de todo para los turistas.', p: 0, r: 'No terminarías nunca.', fb: 'Un alcance indefinido impide terminar y evaluar el proyecto.' },
          { t: 'Un chatbot para turismo, sin más detalle.', p: 1, r: '¿Para quién y para qué?', fb: 'Falta delimitar beneficiarios y criterio de éxito.' } ] },
      { dice: '¿Cómo lo vas a desarrollar y con qué herramientas?', opciones: [
          { t: 'Con un cronograma por fases (datos, prototipo, pruebas con usuarios, ajustes), Python y una herramienta de PLN, repositorio con control de versiones y reuniones de avance quincenales contigo.', p: 2, r: 'Buen plan, y con evidencias de cada fase.', fb: 'Planificar por fases con herramientas adecuadas y control de versiones permite un desarrollo ordenado.' },
          { t: 'Lo hago todo la última semana.', p: 0, r: 'Eso es arriesgado.', fb: 'Sin planificación no hay tiempo para probar ni corregir.' },
          { t: 'Uso la herramienta que esté de moda.', p: 1, r: '¿Y si no se ajusta al problema?', fb: 'Las herramientas se eligen según el problema y los recursos.' } ] },
      { dice: '¿Cómo documentarás y presentarás el proyecto ante el tribunal?', opciones: [
          { t: 'Un informe con problema, objetivos, metodología, resultados con métricas, limitaciones y conclusiones; manual de usuario y repositorio; y una presentación clara con demostración en vivo.', p: 2, r: 'Así el tribunal verá el proceso y el resultado.', fb: 'La documentación completa y una presentación con demostración evidencian las competencias del perfil de egreso.' },
          { t: 'Solo muestro la app funcionando.', p: 1, r: '¿Y el proceso?', fb: 'Falta documentar el proceso y los resultados.' },
          { t: 'Copio un informe de otro proyecto y cambio el título.', p: 0, r: 'Eso es plagio.', fb: 'El plagio es una falta académica grave.' } ] }
    ],
    vivo: {
      lugar: 'Sala de tutorías virtuales del instituto', fondo: 'aula',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🌳', t: 'Dibujar el árbol de problemas', p: 2, fb: 'Ayuda a identificar causas y efectos del problema.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎯', t: 'Redactar un objetivo medible', p: 2, fb: 'Un objetivo medible permite evaluar el resultado.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🌌', t: 'Prometer una app que haga de todo', p: 0, fb: 'Un alcance indefinido impide terminar.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Delimita un problema concreto', claves: ['problema', 'delimit', 'pierden reservas', 'concreto', 'causa'] },
            { n: 'Identifica a los beneficiarios', claves: ['emprendimientos', 'turismo comunitario', 'beneficiarios', 'usuarios', 'comunidad'] },
            { n: 'Plantea un objetivo medible', claves: ['objetivo', 'medible', 'medido', 'indicador', 'tiempo de respuesta'] }
          ],
          evitar: [ { claves: ['haga de todo', 'todo para todos'], fb: 'El alcance debe estar delimitado.' } ],
          modelo: 'Delimito el problema: los emprendimientos de turismo comunitario pierden reservas por no responder fuera de horario. Mi objetivo medible es un asistente que reduzca el tiempo de respuesta.'
        },
        {
          acciones: [
            { icono: '🗓️', t: 'Armar un cronograma por fases', p: 2, fb: 'Organiza el trabajo y los entregables.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🌿', t: 'Crear el repositorio con control de versiones', p: 2, fb: 'Guarda la evidencia y el historial del desarrollo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⏳', t: 'Dejar todo para la última semana', p: 0, fb: 'No queda tiempo para probar ni corregir.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Planifica por fases', claves: ['cronograma', 'fases', 'prototipo', 'pruebas con usuarios', 'etapas', 'plan'] },
            { n: 'Elige herramientas tecnológicas adecuadas', claves: ['python', 'herramienta', 'pln', 'libreria', 'plataforma'] },
            { n: 'Control de versiones y seguimiento', claves: ['repositorio', 'control de versiones', 'git', 'reuniones de avance', 'evidencias'] }
          ],
          evitar: [ { claves: ['ultima semana', 'lo que este de moda'], fb: 'El desarrollo requiere planificación y criterio.' } ],
          modelo: 'Haré un cronograma por fases: datos, prototipo, pruebas con usuarios y ajustes; usaré Python con una librería de PLN, un repositorio con control de versiones y reuniones de avance con usted.'
        },
        {
          acciones: [
            { icono: '📑', t: 'Estructurar el informe final', p: 2, fb: 'Una estructura clara comunica el proceso.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎤', t: 'Ensayar la presentación con demostración', p: 2, fb: 'La demostración prueba que la solución funciona.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📄', t: 'Copiar un informe ajeno', p: 0, fb: 'Es plagio.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Documenta el proceso completo', claves: ['informe', 'metodologia', 'resultados', 'conclusiones', 'document'] },
            { n: 'Reconoce métricas y limitaciones', claves: ['metricas', 'limitaciones', 'evaluacion', 'indicadores', 'alcance'] },
            { n: 'Presenta con demostración', claves: ['presentacion', 'demostracion', 'demo', 'tribunal', 'manual', 'en vivo'] }
          ],
          evitar: [ { claves: ['copio un informe', 'cambio el titulo'], fb: 'El plagio es una falta grave.' } ],
          modelo: 'Haré un informe con el problema, objetivos, metodología, resultados con métricas, limitaciones y conclusiones, más el manual de usuario, y una presentación con demostración en vivo ante el tribunal.'
        }
      ]
    }
  }
]);
