/* Prácticas por asignatura – Administración en Instituciones Públicas (PAO 1–2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== AIP-01 Metodología de la Investigación ===================== */
  {
    id: 'asig-AIP-01', cod: 'AIP-01',
    titulo: 'Diagnóstico del servicio de agua en los barrios',
    asignaturas: ['AIP-01'],
    persona: { nombre: 'Ing. Rosa Tanguila', rol: 'Jefa de Planificación del GAD Municipal de San Isidro', avatar: '👩🏽‍💼', pitch: 1.05 },
    contexto: 'Llegan muchas quejas sobre el agua potable en los barrios periféricos de San Isidro (Pastaza). La jefa de Planificación te pide apoyar un diagnóstico breve con datos reales antes de decidir inversiones.',
    objetivo: 'Aplicar conceptos de investigación aplicada, métodos de recolección, análisis de datos y normas de presentación de informes.',
    pasos: [
      { dice: 'Necesito saber qué está pasando con el agua en los barrios. ¿Por dónde empezamos el diagnóstico?', opciones: [
          { t: 'Planteo el problema, un objetivo medible y defino la población y una muestra de hogares por barrio.', p: 2, r: 'Perfecto, así sabremos exactamente qué medir y a quién preguntar.', fb: 'La investigación aplicada parte de un problema delimitado, objetivos claros y una muestra representativa de la población.' },
          { t: 'Empiezo a preguntar a los vecinos que conozco y luego vemos qué sale.', p: 1, r: 'Es un inicio, pero así los datos pueden quedar sesgados.', fb: 'Sin objetivo ni muestreo la información no es confiable ni generalizable.' },
          { t: 'Ya sabemos que el problema es la tubería; mejor redacto directamente las conclusiones.', p: 0, r: '¿Y con qué evidencia sostenemos eso ante el Concejo?', fb: 'Concluir sin datos invierte el método científico y puede llevar a malas decisiones de inversión.' } ] },
      { dice: '¿Qué técnica usarás para recoger la información en los barrios Las Palmas y Nueva Esperanza?', opciones: [
          { t: 'Una encuesta breve validada a los hogares, entrevistas a dirigentes y observación de horarios de corte, con consentimiento informado.', p: 2, r: 'Excelente: combinas datos cuantitativos y cualitativos.', fb: 'Triangular encuesta, entrevista y observación mejora la validez; el consentimiento protege a los participantes.' },
          { t: 'Solo un formulario en redes sociales para que lo llene quien quiera.', p: 1, r: 'Muchos hogares sin internet quedarían fuera.', fb: 'El muestreo por autoselección excluye a población sin conectividad y sesga los resultados.' },
          { t: 'Anoto lo que me cuenten en la tienda del barrio, sin registrar nombres ni fechas.', p: 0, r: 'Eso no es un registro sistemático.', fb: 'Sin instrumento ni registro ordenado no hay datos verificables.' } ] },
      { dice: 'Ya tenemos 120 encuestas. ¿Cómo las analizas y presentas al Alcalde?', opciones: [
          { t: 'Tabulo los datos, calculo frecuencias y porcentajes, hago gráficos y redacto un informe con introducción, método, resultados, conclusiones y referencias en APA.', p: 2, r: 'Así el informe será claro y defendible.', fb: 'El análisis descriptivo y una estructura normalizada de informe facilitan la toma de decisiones.' },
          { t: 'Hago un resumen con las opiniones más llamativas.', p: 1, r: 'Útil, pero faltan cifras.', fb: 'Los testimonios complementan, pero no reemplazan el análisis cuantitativo.' },
          { t: 'Entrego las hojas de encuesta tal cual para que el Alcalde las lea.', p: 0, r: 'Nadie tiene tiempo de leer 120 hojas.', fb: 'Los datos brutos sin procesar no constituyen un informe de investigación.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de Planificación del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Redactar el problema y el objetivo del diagnóstico', p: 2, fb: 'Delimitar el problema orienta toda la investigación.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🗺️', t: 'Revisar el catastro para definir población y muestra', p: 2, fb: 'El catastro permite calcular una muestra por barrio.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☕', t: 'Preguntar solo a compañeros de oficina', p: 1, fb: 'No representan a los usuarios del servicio.', efecto: { confianza: 0, tension: 3 } },
            { icono: '✍️', t: 'Escribir las conclusiones antes de investigar', p: 0, fb: 'Es un sesgo de confirmación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Problema y objetivo', claves: ['problema', 'objetivo', 'pregunta de investigacion', 'delimit', 'medir', 'proposito'] },
            { n: 'Población y muestra', claves: ['poblacion', 'muestra', 'hogares', 'muestreo', 'representativ', 'catastro'] },
            { n: 'Investigación aplicada', claves: ['aplicada', 'diagnostico', 'evidencia', 'datos', 'decision', 'solucion'] }
          ],
          evitar: [ { claves: ['ya sabemos', 'no hace falta investigar'], fb: 'Asumir la respuesta impide un diagnóstico objetivo.' } ],
          modelo: 'Como es investigación aplicada para tomar una decisión, primero planteo el problema y un objetivo medible: conocer la frecuencia de cortes de agua por barrio. Luego, con el catastro, defino la población y una muestra representativa de hogares.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Validar la encuesta con una prueba piloto', p: 2, fb: 'El pilotaje corrige preguntas confusas.', efecto: { confianza: 9, tension: -5 } },
            { icono: '🎙️', t: 'Entrevistar a los dirigentes barriales', p: 2, fb: 'Aporta información cualitativa de contexto.', efecto: { confianza: 7, tension: -3 } },
            { icono: '📱', t: 'Publicar un formulario abierto en redes', p: 1, fb: 'Excluye hogares sin conectividad.', efecto: { confianza: 1, tension: 2 } },
            { icono: '🙈', t: 'Recoger datos sin pedir consentimiento', p: 0, fb: 'Vulnera derechos y la protección de datos personales.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Técnicas de recolección', claves: ['encuesta', 'entrevista', 'observacion', 'cuestionario', 'ficha', 'instrumento'] },
            { n: 'Validez y triangulación', claves: ['piloto', 'validar', 'triangul', 'cuantitativ', 'cualitativ', 'confiab'] },
            { n: 'Ética en la recolección', claves: ['consentimiento', 'confidencial', 'anonim', 'voluntari', 'proteccion de datos', 'respeto'] }
          ],
          evitar: [ { claves: ['sin permiso', 'pongo los nombres'], fb: 'Los datos de los participantes deben ser confidenciales y con consentimiento.' } ],
          modelo: 'Aplicaré una encuesta validada con prueba piloto a los hogares, entrevistas a los dirigentes y observación de los horarios de corte, siempre con consentimiento informado y confidencialidad.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Tabular en hoja de cálculo y graficar porcentajes', p: 2, fb: 'El análisis descriptivo resume los hallazgos.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📑', t: 'Estructurar el informe con normas APA', p: 2, fb: 'Una estructura normalizada da credibilidad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💬', t: 'Resumir solo las opiniones más llamativas', p: 1, fb: 'Faltan cifras que sustenten.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🗃️', t: 'Entregar las encuestas sin procesar', p: 0, fb: 'Los datos brutos no son un informe.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Análisis de datos', claves: ['tabul', 'frecuencia', 'porcentaje', 'grafic', 'estadistic', 'promedio'] },
            { n: 'Estructura del informe', claves: ['introduccion', 'metodo', 'resultados', 'conclusiones', 'recomendaciones', 'informe'] },
            { n: 'Normas de presentación', claves: ['apa', 'referencias', 'citas', 'formato', 'norma', 'bibliograf'] }
          ],
          evitar: [ { claves: ['inventar datos', 'redondeo a conveniencia'], fb: 'Manipular datos es una falta ética grave.' } ],
          modelo: 'Tabulo las 120 encuestas, calculo frecuencias y porcentajes por barrio y los grafico. Luego redacto el informe con introducción, método, resultados, conclusiones y referencias en formato APA.'
        }
      ]
    }
  },

  /* ===================== AIP-02 Expresión Oral y Escrita ===================== */
  {
    id: 'asig-AIP-02', cod: 'AIP-02',
    titulo: 'Oficio y exposición ante la asamblea barrial',
    asignaturas: ['AIP-02'],
    persona: { nombre: 'Doña Mercedes Grefa', rol: 'Presidenta del barrio Los Ceibos', avatar: '👵🏽', pitch: 0.95 },
    contexto: 'La presidenta del barrio Los Ceibos envió una solicitud de lastrado de su calle. Debes redactar el oficio de respuesta del GAD y luego explicarlo de forma clara en la asamblea barrial.',
    objetivo: 'Aplicar principios de expresión escrita y oral, redacción formal, normas ortográficas y estrategias de presentación oral.',
    pasos: [
      { dice: 'Joven, ¿ya tiene la respuesta a nuestro pedido del lastrado? Necesitamos algo por escrito.', opciones: [
          { t: 'Redacto un oficio con encabezado, número, fecha, destinatario, asunto, cuerpo claro, despedida y firma de la autoridad.', p: 2, r: 'Así sí, con eso puedo informar a los vecinos.', fb: 'El oficio tiene una estructura formal que da validez y claridad a la comunicación institucional.' },
          { t: 'Le mando un mensaje de WhatsApp contándole cómo va el trámite.', p: 1, r: 'Gracias, pero necesito un documento oficial.', fb: 'Los canales informales sirven para avisos, no reemplazan la respuesta formal.' },
          { t: 'Le digo que el trámite está en proceso y que no moleste más.', p: 0, r: '¡Qué falta de respeto!', fb: 'La comunicación con la ciudadanía debe ser respetuosa y oportuna.' } ] },
      { dice: '(La jefa revisa tu borrador: "en base a su pedido le informamos que se hara el lastrado el Lunes".)', opciones: [
          { t: 'Corrijo: "Con base en su solicitud, le informamos que el lastrado se realizará el lunes", con tilde y minúscula en el día.', p: 2, r: 'Muy bien corregido.', fb: 'Se usa "con base en", "realizará" lleva tilde por ser aguda terminada en vocal y los días se escriben con minúscula.' },
          { t: 'Pongo la tilde en "hará" pero dejo lo demás igual.', p: 1, r: 'Mejoró, pero aún hay errores.', fb: 'La corrección debe atender ortografía, gramática y estilo.' },
          { t: 'Lo dejo así; lo importante es que se entienda.', p: 0, r: 'Un documento oficial con errores daña la imagen del GAD.', fb: 'La corrección ortográfica es parte de la calidad del servicio público.' } ] },
      { dice: 'Ahora explique a los vecinos en la asamblea qué va a pasar con la calle.', opciones: [
          { t: 'Saludo, presento el objetivo, explico fechas y pasos con lenguaje sencillo, mantengo contacto visual y abro un espacio de preguntas.', p: 2, r: 'Todos entendimos, gracias por explicarnos así.', fb: 'Una exposición estructurada (inicio, desarrollo, cierre) y lenguaje claro favorecen la comprensión.' },
          { t: 'Leo el oficio en voz alta sin levantar la vista.', p: 1, r: 'Algunos se perdieron con tanto término técnico.', fb: 'Leer textualmente reduce la conexión con la audiencia.' },
          { t: 'Hablo rápido con términos técnicos y me voy sin escuchar preguntas.', p: 0, r: 'Los vecinos quedaron molestos y confundidos.', fb: 'Omitir la retroalimentación rompe la comunicación bidireccional.' } ] }
    ],
    vivo: {
      lugar: 'Casa comunal del barrio Los Ceibos, San Isidro', fondo: 'comunidad',
      inicio: { confianza: 40, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📄', t: 'Usar la plantilla oficial de oficio del GAD', p: 2, fb: 'Garantiza la estructura formal.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔢', t: 'Asignar número de oficio y fecha', p: 2, fb: 'Permite trazabilidad del documento.', efecto: { confianza: 6, tension: -3 } },
            { icono: '💬', t: 'Responder solo por WhatsApp', p: 1, fb: 'No reemplaza la respuesta formal.', efecto: { confianza: 0, tension: 4 } },
            { icono: '🚪', t: 'Pedirle que deje de insistir', p: 0, fb: 'Es irrespetuoso con la ciudadanía.', efecto: { confianza: -15, tension: 14 } }
          ],
          conceptos: [
            { n: 'Estructura del oficio', claves: ['oficio', 'encabezado', 'asunto', 'destinatario', 'firma', 'numero', 'fecha'] },
            { n: 'Claridad y precisión', claves: ['claro', 'preciso', 'concreto', 'breve', 'sencill', 'entendible'] },
            { n: 'Trato respetuoso', claves: ['estimada', 'senora presidenta', 'atentamente', 'respeto', 'cordial', 'gracias'] }
          ],
          evitar: [ { claves: ['no moleste', 'ya le dije'], fb: 'Expresiones descorteses dañan la relación con la ciudadanía.' } ],
          modelo: 'Señora presidenta, le entregaré un oficio numerado y fechado, con el asunto claro, la respuesta a su solicitud y la firma de la autoridad. Atentamente quedamos a sus órdenes.'
        },
        {
          acciones: [
            { icono: '🔍', t: 'Revisar tildes, mayúsculas y conectores', p: 2, fb: 'La corrección integral mejora la calidad del texto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📚', t: 'Consultar el diccionario de la RAE', p: 2, fb: 'Fuente confiable para dudas normativas.', efecto: { confianza: 6, tension: -3 } },
            { icono: '✏️', t: 'Corregir solo una palabra', p: 1, fb: 'La revisión queda incompleta.', efecto: { confianza: 1, tension: 2 } },
            { icono: '📤', t: 'Enviar el borrador con errores', p: 0, fb: 'Afecta la imagen institucional.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Acentuación', claves: ['tilde', 'realizara', 'aguda', 'acento', 'hara'] },
            { n: 'Uso de mayúsculas', claves: ['minuscula', 'mayuscula', 'lunes', 'dias de la semana', 'nombre propio'] },
            { n: 'Gramática y conectores', claves: ['con base en', 'conector', 'gramatica', 'concordancia', 'redaccion', 'cohesion'] }
          ],
          evitar: [ { claves: ['en base a', 'da igual la ortografia'], fb: '"En base a" es una construcción desaconsejada; la ortografía sí importa.' } ],
          modelo: 'Corrijo a "con base en su solicitud", pongo tilde en "realizará" por ser aguda terminada en vocal y escribo "lunes" con minúscula porque los días de la semana no llevan mayúscula.'
        },
        {
          acciones: [
            { icono: '👋', t: 'Saludar y presentar el objetivo de la reunión', p: 2, fb: 'Un buen inicio capta la atención.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🖼️', t: 'Mostrar un croquis de la calle con fechas', p: 2, fb: 'El apoyo visual facilita la comprensión.', efecto: { confianza: 7, tension: -5 } },
            { icono: '📃', t: 'Leer el oficio textualmente', p: 1, fb: 'Pierde conexión con el público.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🏃', t: 'Retirarse sin responder preguntas', p: 0, fb: 'Rompe la comunicación bidireccional.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Estructura de la exposición', claves: ['saludo', 'objetivo', 'introduccion', 'desarrollo', 'cierre', 'resumen'] },
            { n: 'Lenguaje claro y no verbal', claves: ['sencill', 'claro', 'contacto visual', 'voz', 'postura', 'pausad'] },
            { n: 'Retroalimentación', claves: ['preguntas', 'dudas', 'escuch', 'opinion', 'participa', 'inquietud'] }
          ],
          evitar: [ { claves: ['no hay tiempo para preguntas', 'eso es tecnico'], fb: 'Negarse a escuchar genera desconfianza.' } ],
          modelo: 'Buenas tardes, vecinos. El objetivo es explicarles el lastrado de su calle: empezará el lunes y durará una semana. Les hablaré claro y sencillo, y al final abriré un espacio para sus preguntas y dudas.'
        }
      ]
    }
  },

  /* ===================== AIP-03 Matemática ===================== */
  {
    id: 'asig-AIP-03', cod: 'AIP-03',
    titulo: 'Cálculos en la ventanilla de recaudación',
    asignaturas: ['AIP-03'],
    persona: { nombre: 'Don Segundo Vargas', rol: 'Ciudadano adulto mayor y comerciante', avatar: '👴🏽', pitch: 0.85 },
    contexto: 'En la ventanilla de recaudación del GAD, un ciudadano duda de sus valores a pagar y luego tu jefe te pide resolver una compra. Debes plantear y resolver los cálculos en voz alta.',
    objetivo: 'Aplicar operaciones algebraicas, funciones lineales y sistemas de ecuaciones a situaciones prácticas de la gestión pública.',
    pasos: [
      { dice: 'Mi tasa de recolección de basura es 8,50 dólares y tengo descuento del 12 % por tercera edad. ¿Cuánto pago?', opciones: [
          { t: 'El 12 % de 8,50 es 1,02; entonces paga 8,50 − 1,02 = 7,48 dólares.', p: 2, r: '¡Clarito! Así sí entiendo.', fb: 'Descuento = 8,50 × 0,12 = 1,02; valor final = 8,50 × 0,88 = 7,48.' },
          { t: 'Paga unos 7,50, más o menos.', p: 1, r: '¿Más o menos? Necesito el valor exacto.', fb: 'En recaudación los valores deben ser exactos al centavo.' },
          { t: 'Le resto 12 dólares… no le alcanza, paga cero.', p: 0, r: '¡Eso no tiene sentido!', fb: 'Confundir porcentaje con valor absoluto es un error de concepto.' } ] },
      { dice: 'El agua se cobra con un cargo fijo de 3 dólares más 0,40 por metro cúbico. Consumí 25 metros cúbicos, ¿cuánto es?', opciones: [
          { t: 'La función es C(x) = 3 + 0,40x; con x = 25: 3 + 10 = 13 dólares.', p: 2, r: 'Ahora entiendo cómo se calcula mi planilla.', fb: 'Es una función lineal: término fijo (intercepto) más pendiente por consumo.' },
          { t: '0,40 por 25 son 10 dólares.', p: 1, r: '¿Y el cargo fijo?', fb: 'Olvidar el término independiente da un resultado incompleto.' },
          { t: 'Son 3 por 25, o sea 75 dólares.', p: 0, r: '¡Imposible!', fb: 'Se aplicó el cargo fijo como tarifa variable: error de planteamiento.' } ] },
      { dice: '(El jefe administrativo) Compramos 30 muebles entre sillas de 15 y mesas de 40 dólares, por 700 dólares. ¿Cuántos de cada uno?', opciones: [
          { t: 'Planteo s + m = 30 y 15s + 40m = 700; sustituyo y obtengo 10 mesas y 20 sillas.', p: 2, r: 'Exacto, coincide con la factura.', fb: '15(30 − m) + 40m = 700 → 450 + 25m = 700 → m = 10; s = 20. Verificación: 300 + 400 = 700.' },
          { t: 'Pruebo números hasta que cuadre: creo que 20 y 10.', p: 1, r: 'Acertaste, pero ¿cómo lo justificas?', fb: 'El tanteo puede funcionar, pero el sistema de ecuaciones es el método verificable.' },
          { t: 'La mitad y la mitad: 15 sillas y 15 mesas.', p: 0, r: 'Eso daría 825 dólares, no 700.', fb: '15×15 + 15×40 = 825; no cumple la segunda ecuación.' } ] }
    ],
    vivo: {
      lugar: 'Ventanilla de recaudación del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🧮', t: 'Calcular el 12 % con la calculadora frente al ciudadano', p: 2, fb: 'La transparencia genera confianza.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🧾', t: 'Mostrar el detalle del descuento en el comprobante', p: 2, fb: 'El ciudadano verifica el cálculo.', efecto: { confianza: 7, tension: -5 } },
            { icono: '🤷', t: 'Redondear el valor a ojo', p: 1, fb: 'Los cobros deben ser exactos.', efecto: { confianza: -2, tension: 4 } },
            { icono: '❌', t: 'Negar el descuento por tercera edad', p: 0, fb: 'Vulnera un derecho reconocido a las personas adultas mayores.', efecto: { confianza: -16, tension: 15 } }
          ],
          conceptos: [
            { n: 'Cálculo del porcentaje', claves: ['doce por ciento', '12', '0,12', 'porcentaje', 'multiplic', 'por ciento'] },
            { n: 'Valor del descuento', claves: ['1,02', 'un dolar con dos', 'descuento', 'rebaja', 'restar'] },
            { n: 'Valor final', claves: ['7,48', 'siete con cuarenta y ocho', 'total', 'paga', 'valor final', '0,88'] }
          ],
          evitar: [ { claves: ['mas o menos', 'aproximadamente'], fb: 'En cobros públicos el valor debe ser exacto.' } ],
          modelo: 'El 12 % de 8,50 es 8,50 por 0,12, que da 1,02 dólares de descuento. Entonces usted paga 8,50 menos 1,02, es decir, 7,48 dólares.'
        },
        {
          acciones: [
            { icono: '📈', t: 'Dibujar la recta de la tarifa en una hoja', p: 2, fb: 'La gráfica muestra el cargo fijo y la pendiente.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔎', t: 'Revisar la lectura del medidor en la planilla', p: 2, fb: 'Confirma que x = 25 m³.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✖️', t: 'Multiplicar solo el consumo por la tarifa', p: 1, fb: 'Falta el cargo fijo.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🙄', t: 'Decirle que así dice el sistema y punto', p: 0, fb: 'No explica ni genera confianza.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Función lineal', claves: ['funcion', 'lineal', 'c de x', 'y igual', 'ecuacion', 'recta'] },
            { n: 'Cargo fijo y pendiente', claves: ['cargo fijo', 'tres dolares', 'pendiente', '0,40', 'cuarenta centavos', 'por metro cubico'] },
            { n: 'Resultado', claves: ['13', 'trece', 'total', 'diez dolares', 'sumar', 'mas'] }
          ],
          evitar: [ { claves: ['asi dice el sistema', 'no se como sale'], fb: 'El servidor debe poder explicar el cálculo.' } ],
          modelo: 'La tarifa es una función lineal: C(x) igual a 3 más 0,40 por x. Con 25 metros cúbicos son 10 dólares de consumo más 3 de cargo fijo: en total 13 dólares.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Plantear el sistema de dos ecuaciones', p: 2, fb: 'Traduce el problema al lenguaje algebraico.', efecto: { confianza: 9, tension: -5 } },
            { icono: '✅', t: 'Verificar el resultado con la factura', p: 2, fb: 'Comprobar evita errores contables.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🎲', t: 'Probar números al tanteo', p: 1, fb: 'Poco sistemático.', efecto: { confianza: 1, tension: 2 } },
            { icono: '➗', t: 'Dividir 30 en partes iguales', p: 0, fb: 'No cumple la condición del monto.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Planteamiento del sistema', claves: ['sistema', 'ecuacion', 's mas m', 'treinta', '30', 'setecientos', '700'] },
            { n: 'Método de resolución', claves: ['sustitu', 'igualacion', 'reduccion', 'despej', 'reemplaz', 'eliminacion'] },
            { n: 'Solución y verificación', claves: ['diez mesas', '10 mesas', 'veinte sillas', '20 sillas', 'verific', 'comprob'] }
          ],
          evitar: [ { claves: ['mitad y mitad', 'quince y quince'], fb: 'Esa combinación suma 825 dólares, no 700.' } ],
          modelo: 'Planteo s más m igual a 30 y 15s más 40m igual a 700. Sustituyo s = 30 − m: 450 + 25m = 700, así m = 10 mesas y s = 20 sillas; verifico: 300 más 400 da 700.'
        }
      ]
    }
  },

  /* ===================== AIP-04 TIC ===================== */
  {
    id: 'asig-AIP-04', cod: 'AIP-04',
    titulo: 'Correo sospechoso y datos de contribuyentes',
    asignaturas: ['AIP-04'],
    persona: { nombre: 'Kevin Santi', rol: 'Compañero de la Unidad de Rentas', avatar: '👨🏽‍💻', pitch: 1.15 },
    contexto: 'Un compañero recibió un correo que pide "actualizar la clave del sistema de catastro" y además quiere compartir por USB la base de contribuyentes. Debes aplicar buenas prácticas digitales y de seguridad de la información.',
    objetivo: 'Aplicar herramientas informáticas, gestión de información digital, colaboración en línea y seguridad de la información.',
    pasos: [
      { dice: 'Oye, me llegó un correo del "soporte del sistema" pidiendo que ponga mi clave en un enlace. ¿Lo hago rápido?', opciones: [
          { t: 'No; revisamos el remitente y el enlace, no ingresamos la clave y lo reportamos a la Unidad de TIC como posible phishing.', p: 2, r: 'Uf, menos mal que pregunté.', fb: 'El phishing suplanta remitentes para robar credenciales; se verifica y se reporta sin interactuar.' },
          { t: 'Bórralo y ya.', p: 1, r: 'Listo, ¿pero y si otros lo recibieron?', fb: 'Borrar evita el riesgo propio, pero reportar protege a toda la institución.' },
          { t: 'Sí, pon la clave para que no te bloqueen.', p: 0, r: '(Minutos después, la cuenta envía correos extraños.)', fb: 'Entregar credenciales compromete los sistemas y datos institucionales.' } ] },
      { dice: 'Tengo que pasarle la base de contribuyentes a la técnica de Avalúos. ¿Se la copio en mi USB personal?', opciones: [
          { t: 'Mejor la compartimos en la carpeta institucional en la nube con permisos solo para ella y control de versiones.', p: 2, r: 'Así queda registro de quién accede.', fb: 'La colaboración en plataformas institucionales con permisos mínimos protege los datos personales.' },
          { t: 'Envíasela por correo institucional como adjunto.', p: 1, r: 'Funciona, pero se duplican copias.', fb: 'El correo institucional es aceptable, pero multiplica copias y versiones sin control.' },
          { t: 'Sí, y súbela también a mi drive personal por si acaso.', p: 0, r: 'Eso expone datos de miles de ciudadanos.', fb: 'Almacenar datos personales en medios privados vulnera la protección de datos personales.' } ] },
      { dice: 'Al final, ¿qué hacemos para que esto no vuelva a pasar en la oficina?', opciones: [
          { t: 'Propongo contraseñas robustas con doble factor, bloqueo de pantalla, respaldos periódicos y una charla breve de ciberseguridad.', p: 2, r: 'Buena idea, lo hablamos con el jefe.', fb: 'Las medidas técnicas y la capacitación del personal son la base de la seguridad de la información.' },
          { t: 'Cambiemos las claves cada vez que alguien se acuerde.', p: 1, r: 'Algo es algo.', fb: 'Sin política ni periodicidad la medida es débil.' },
          { t: 'Anotemos todas las claves en un papel pegado al monitor.', p: 0, r: '¡Cualquiera las vería!', fb: 'Exponer contraseñas anula cualquier control de acceso.' } ] }
    ],
    vivo: {
      lugar: 'Unidad de Rentas del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 55, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📧', t: 'Revisar el dominio real del remitente', p: 2, fb: 'Los atacantes usan dominios parecidos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚨', t: 'Reportar el correo a la Unidad de TIC', p: 2, fb: 'Permite bloquear el ataque para todos.', efecto: { confianza: 9, tension: -8 } },
            { icono: '🗑️', t: 'Eliminar el correo sin avisar', p: 1, fb: 'Otros podrían caer.', efecto: { confianza: 1, tension: 2 } },
            { icono: '🔑', t: 'Ingresar la clave en el enlace', p: 0, fb: 'Entrega las credenciales al atacante.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Identificar phishing', claves: ['phishing', 'suplant', 'fraude', 'sospechos', 'enlace falso', 'remitente'] },
            { n: 'No entregar credenciales', claves: ['no ingres', 'clave', 'contrasena', 'credencial', 'no hacer clic', 'no dar'] },
            { n: 'Reportar el incidente', claves: ['report', 'tic', 'soporte', 'informar', 'incidente', 'avisar'] }
          ],
          evitar: [ { claves: ['pon la clave', 'dale clic'], fb: 'Interactuar con el enlace compromete la cuenta.' } ],
          modelo: 'No ingreses tu clave: el remitente no es del dominio institucional y parece phishing. No hagas clic en el enlace y reportémoslo de inmediato a la Unidad de TIC.'
        },
        {
          acciones: [
            { icono: '☁️', t: 'Compartir en la nube institucional con permisos', p: 2, fb: 'Controla acceso y versiones.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🔒', t: 'Configurar acceso solo de lectura para Avalúos', p: 2, fb: 'Principio de mínimo privilegio.', efecto: { confianza: 7, tension: -4 } },
            { icono: '📎', t: 'Adjuntar el archivo al correo institucional', p: 1, fb: 'Duplica copias sin control.', efecto: { confianza: 1, tension: 2 } },
            { icono: '💾', t: 'Copiar la base en una USB personal', p: 0, fb: 'Riesgo de pérdida y fuga de datos personales.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Plataforma institucional', claves: ['nube institucional', 'carpeta compartida', 'plataforma', 'drive institucional', 'repositorio', 'servidor'] },
            { n: 'Permisos y acceso', claves: ['permiso', 'acceso', 'solo lectura', 'minimo privilegio', 'autoriz', 'restring'] },
            { n: 'Protección de datos personales', claves: ['datos personales', 'proteccion de datos', 'confidencial', 'privacidad', 'contribuyentes', 'resguard'] }
          ],
          evitar: [ { claves: ['usb personal', 'drive personal'], fb: 'Los medios personales no garantizan la protección de datos.' } ],
          modelo: 'No usemos memorias personales. Compartamos la base en la carpeta de la nube institucional con permiso de solo lectura para ella, porque son datos personales de los contribuyentes.'
        },
        {
          acciones: [
            { icono: '🛡️', t: 'Activar la verificación en dos pasos', p: 2, fb: 'Protege aunque roben la clave.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗂️', t: 'Programar respaldos semanales', p: 2, fb: 'Permite recuperar información.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🔁', t: 'Cambiar claves sin una política definida', p: 1, fb: 'Medida débil e inconstante.', efecto: { confianza: 1, tension: 1 } },
            { icono: '🗒️', t: 'Pegar las contraseñas en el monitor', p: 0, fb: 'Expone el acceso a cualquiera.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Contraseñas seguras', claves: ['contrasena', 'robusta', 'doble factor', 'dos pasos', 'segura', 'clave'] },
            { n: 'Respaldos y bloqueo', claves: ['respaldo', 'backup', 'copia de seguridad', 'bloqueo de pantalla', 'actualiz', 'antivirus'] },
            { n: 'Capacitación', claves: ['capacit', 'charla', 'concienti', 'ciberseguridad', 'buenas practicas', 'politica'] }
          ],
          evitar: [ { claves: ['misma clave para todo', 'anotar en un papel'], fb: 'Reutilizar o exponer claves facilita los ataques.' } ],
          modelo: 'Propongo contraseñas robustas con doble factor, bloqueo de pantalla al levantarnos y respaldos semanales, además de una charla corta de ciberseguridad para todo el equipo.'
        }
      ]
    }
  },

  /* ===================== AIP-05 Fundamentos de la Administración ===================== */
  {
    id: 'asig-AIP-05', cod: 'AIP-05',
    titulo: 'Organizar la Feria de Servicios Municipales',
    asignaturas: ['AIP-05'],
    persona: { nombre: 'Lcdo. Fernando Andi', rol: 'Director Administrativo del GAD', avatar: '👨🏽‍💼', pitch: 0.95 },
    contexto: 'El Director Administrativo te encarga apoyar la organización de una Feria de Servicios Municipales en la parroquia rural de Fátima dentro de tres semanas. Debes aplicar las funciones de la administración.',
    objetivo: 'Aplicar las funciones administrativas (planificación, organización, dirección y control) en una institución pública.',
    pasos: [
      { dice: 'Tenemos tres semanas para la feria. ¿Cómo arrancamos?', opciones: [
          { t: 'Planificamos: definimos objetivos, servicios a ofrecer, presupuesto disponible y un cronograma con responsables.', p: 2, r: 'Bien, primero el plan.', fb: 'La planificación fija objetivos y medios; es la primera función del proceso administrativo.' },
          { t: 'Reservamos ya la carpa y vemos lo demás después.', p: 1, r: 'Es una tarea, pero sin plan podemos fallar.', fb: 'Actuar sin planificación genera improvisación y desperdicio.' },
          { t: 'Que cada departamento haga lo que quiera ese día.', p: 0, r: 'Eso sería un caos.', fb: 'Sin coordinación no hay administración.' } ] },
      { dice: '¿Cómo repartimos el trabajo entre Rentas, Catastro, Comunicación y Servicios Generales?', opciones: [
          { t: 'Organizamos funciones: cada unidad con tareas claras, un coordinador general y una matriz de responsabilidades.', p: 2, r: 'Así nadie se cruza ni se olvida nada.', fb: 'La organización divide el trabajo, asigna autoridad y establece líneas de coordinación.' },
          { t: 'Lo que salga en la reunión, sin dejar por escrito.', p: 1, r: 'Luego nadie recordará qué le tocaba.', fb: 'Sin formalizar responsabilidades se diluye la rendición de cuentas.' },
          { t: 'Yo hago todo para que salga bien.', p: 0, r: 'No es posible ni conveniente.', fb: 'Centralizar todo en una persona contradice la división del trabajo.' } ] },
      { dice: 'Pasó la feria. ¿Cómo sabremos si funcionó?', opciones: [
          { t: 'Controlamos: comparamos metas con resultados (trámites atendidos, satisfacción, gasto) y proponemos mejoras.', p: 2, r: 'Así podremos repetirla mejor.', fb: 'El control compara lo planificado con lo ejecutado y retroalimenta la planificación.' },
          { t: 'Preguntamos al Alcalde si le gustó.', p: 1, r: 'Una opinión, pero no datos.', fb: 'La evaluación requiere indicadores, no solo percepciones.' },
          { t: 'Ya pasó, no hace falta evaluar.', p: 0, r: 'Perderíamos lo aprendido.', fb: 'Omitir el control impide la mejora continua.' } ] }
    ],
    vivo: {
      lugar: 'Dirección Administrativa del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Definir objetivos y metas de la feria', p: 2, fb: 'Orienta todas las acciones.', efecto: { confianza: 9, tension: -6 } },
            { icono: '📅', t: 'Elaborar un cronograma de tres semanas', p: 2, fb: 'Ordena las actividades en el tiempo.', efecto: { confianza: 7, tension: -5 } },
            { icono: '⛺', t: 'Reservar la carpa sin un plan', p: 1, fb: 'Acción aislada sin planificación.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🎲', t: 'Improvisar el día de la feria', p: 0, fb: 'Genera desorden y mala imagen.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Planificación', claves: ['planific', 'plan', 'objetivo', 'meta', 'estrategia', 'prever'] },
            { n: 'Recursos y presupuesto', claves: ['presupuesto', 'recursos', 'materiales', 'personal', 'costo', 'disponible'] },
            { n: 'Cronograma', claves: ['cronograma', 'fechas', 'plazo', 'tres semanas', 'actividades', 'calendario'] }
          ],
          evitar: [ { claves: ['improvisamos', 'ya veremos'], fb: 'La improvisación contradice la planificación.' } ],
          modelo: 'Primero planificamos: definimos el objetivo de acercar los servicios a Fátima, los trámites que se ofrecerán, el presupuesto y los recursos, y un cronograma de tres semanas con responsables.'
        },
        {
          acciones: [
            { icono: '🧩', t: 'Elaborar una matriz de responsabilidades', p: 2, fb: 'Clarifica quién hace qué.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🧑‍🤝‍🧑', t: 'Designar un coordinador por unidad', p: 2, fb: 'Facilita la coordinación.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🗣️', t: 'Acordar tareas solo de palabra', p: 1, fb: 'No queda registro.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🏋️', t: 'Asumir todas las tareas uno mismo', p: 0, fb: 'Sobrecarga y riesgo de fallar.', efecto: { confianza: -10, tension: 12 } }
          ],
          conceptos: [
            { n: 'Organización', claves: ['organiz', 'division del trabajo', 'funciones', 'tareas', 'estructura', 'asignar'] },
            { n: 'Responsables y coordinación', claves: ['responsable', 'coordinador', 'coordinacion', 'matriz', 'unidad', 'departamento'] },
            { n: 'Dirección del equipo', claves: ['direccion', 'dirig', 'liderazgo', 'comunica', 'motivar', 'reunion', 'guiar'] }
          ],
          evitar: [ { claves: ['yo hago todo', 'cada uno vera'], fb: 'Ni centralizar ni desentenderse es buena organización.' } ],
          modelo: 'Organizamos el trabajo con una matriz de responsabilidades: Rentas y Catastro atienden trámites, Comunicación difunde y Servicios Generales arma la logística, con un coordinador general que dirige el equipo y comunica los avances.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Comparar metas con trámites atendidos', p: 2, fb: 'Mide la eficacia.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🙋', t: 'Aplicar una encuesta de satisfacción', p: 2, fb: 'Mide la calidad percibida.', efecto: { confianza: 7, tension: -4 } },
            { icono: '👍', t: 'Preguntar solo la opinión del Alcalde', p: 1, fb: 'Percepción sin indicadores.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🚫', t: 'Cerrar el evento sin evaluar', p: 0, fb: 'Impide la mejora continua.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Control', claves: ['control', 'evaluar', 'comparar', 'seguimiento', 'verificar', 'medir'] },
            { n: 'Indicadores', claves: ['indicador', 'meta', 'tramites atendidos', 'satisfaccion', 'gasto', 'resultado'] },
            { n: 'Mejora continua', claves: ['mejora', 'correctiv', 'lecciones', 'retroaliment', 'ajust', 'recomend'] }
          ],
          evitar: [ { claves: ['no hace falta evaluar', 'ya paso'], fb: 'Sin control no se aprende de la experiencia.' } ],
          modelo: 'Aplicamos el control: comparamos la meta de trámites con los atendidos, revisamos la encuesta de satisfacción y el gasto, y proponemos mejoras para la próxima feria.'
        }
      ]
    }
  },

  /* ===================== AIP-06 Contabilidad Básica ===================== */
  {
    id: 'asig-AIP-06', cod: 'AIP-06',
    titulo: 'Registro contable de la compra de suministros',
    asignaturas: ['AIP-06'],
    persona: { nombre: 'CPA Gladys Cerda', rol: 'Contadora de la Dirección Financiera', avatar: '👩🏽‍🏫', pitch: 1.0 },
    contexto: 'En la Dirección Financiera llega la factura de compra de suministros de oficina por 1.200 dólares a crédito. La contadora te pide registrar, clasificar las cuentas y hacer un análisis básico.',
    objetivo: 'Aplicar principios contables, registro por partida doble, clasificación de cuentas y análisis financiero básico.',
    pasos: [
      { dice: 'Compramos suministros por 1.200 dólares a 30 días. ¿Cómo lo registras?', opciones: [
          { t: 'Por partida doble: debito Suministros 1.200 y acredito Cuentas por pagar 1.200, con la factura como respaldo.', p: 2, r: 'Correcto, el asiento cuadra.', fb: 'Toda operación afecta al menos dos cuentas; los débitos igualan a los créditos y se respalda con documento fuente.' },
          { t: 'Solo anoto el gasto de 1.200.', p: 1, r: '¿Y la obligación con el proveedor?', fb: 'Registrar una sola cuenta rompe la partida doble.' },
          { t: 'Lo registro cuando paguemos, no antes.', p: 0, r: 'Eso incumple el devengado.', fb: 'Por el principio del devengado, los hechos se registran cuando ocurren, no al pagar.' } ] },
      { dice: 'Clasifica: Bancos, Cuentas por pagar, Patrimonio, Suministros. ¿Dónde va cada una?', opciones: [
          { t: 'Bancos y Suministros son activos; Cuentas por pagar es pasivo; Patrimonio es patrimonio. Activo = Pasivo + Patrimonio.', p: 2, r: 'Exacto, aplicas la ecuación contable.', fb: 'La ecuación contable fundamental ordena la clasificación de cuentas.' },
          { t: 'Bancos es activo y lo demás pasivo.', p: 1, r: 'A medias.', fb: 'Suministros es activo y el patrimonio tiene naturaleza propia.' },
          { t: 'Todas son gastos porque salen dinero.', p: 0, r: 'No, cada cuenta tiene su naturaleza.', fb: 'Confundir activos, pasivos y gastos distorsiona los estados financieros.' } ] },
      { dice: 'Activo corriente 50.000 y pasivo corriente 25.000. ¿Qué le dices al Director en el informe?', opciones: [
          { t: 'La liquidez corriente es 50.000 ÷ 25.000 = 2: por cada dólar de deuda a corto plazo hay dos para cubrirla. Lo incluyo en el informe.', p: 2, r: 'Claro y útil para decidir.', fb: 'El índice de liquidez mide la capacidad de pago a corto plazo.' },
          { t: 'Tenemos 25.000 de diferencia, estamos bien.', p: 1, r: 'Es el capital de trabajo, pero falta el índice.', fb: 'El capital de trabajo (25.000) es útil, aunque el índice permite comparar.' },
          { t: 'Hay mucho dinero, podemos gastar todo.', p: 0, r: 'Eso es irresponsable.', fb: 'El análisis financiero no justifica gastar sin planificación.' } ] }
    ],
    vivo: {
      lugar: 'Dirección Financiera del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🧾', t: 'Verificar la factura como documento fuente', p: 2, fb: 'Todo registro necesita respaldo.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📒', t: 'Registrar el asiento en el libro diario', p: 2, fb: 'Aplica la partida doble.', efecto: { confianza: 9, tension: -5 } },
            { icono: '✏️', t: 'Anotar solo el gasto', p: 1, fb: 'Incompleto.', efecto: { confianza: 0, tension: 3 } },
            { icono: '⏳', t: 'Esperar al pago para registrar', p: 0, fb: 'Incumple el devengado.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Partida doble', claves: ['partida doble', 'debe', 'haber', 'debito', 'credito', 'asiento'] },
            { n: 'Cuentas afectadas', claves: ['suministros', 'cuentas por pagar', 'proveedor', '1200', 'mil doscientos', 'obligacion'] },
            { n: 'Principios contables', claves: ['devengado', 'documento fuente', 'factura', 'respaldo', 'principio', 'registro'] }
          ],
          evitar: [ { claves: ['cuando paguemos', 'sin factura'], fb: 'Se registra al devengar y con respaldo documental.' } ],
          modelo: 'Por partida doble, debito Suministros por 1.200 y acredito Cuentas por pagar al proveedor por 1.200, con la factura como documento fuente, aplicando el principio del devengado.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Ordenar las cuentas según la ecuación contable', p: 2, fb: 'Estructura el balance.', efecto: { confianza: 9, tension: -5 } },
            { icono: '📗', t: 'Consultar el catálogo de cuentas', p: 2, fb: 'Define la naturaleza de cada cuenta.', efecto: { confianza: 7, tension: -4 } },
            { icono: '❓', t: 'Clasificar por intuición', p: 1, fb: 'Puede llevar a errores.', efecto: { confianza: 0, tension: 3 } },
            { icono: '💸', t: 'Registrar todo como gasto', p: 0, fb: 'Distorsiona los estados financieros.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Activos', claves: ['activo', 'bancos', 'suministros', 'bienes', 'derechos', 'recursos'] },
            { n: 'Pasivo y patrimonio', claves: ['pasivo', 'cuentas por pagar', 'patrimonio', 'obligacion', 'deuda', 'capital'] },
            { n: 'Ecuación contable', claves: ['ecuacion contable', 'activo igual', 'pasivo mas patrimonio', 'equilibrio', 'cuadra', 'catalogo'] }
          ],
          evitar: [ { claves: ['todo es gasto'], fb: 'Cada cuenta tiene su naturaleza.' } ],
          modelo: 'Bancos y Suministros son activos, Cuentas por pagar es pasivo y Patrimonio es patrimonio. Se cumple la ecuación: activo igual a pasivo más patrimonio.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Calcular el índice de liquidez corriente', p: 2, fb: 'Mide la capacidad de pago.', efecto: { confianza: 9, tension: -5 } },
            { icono: '📄', t: 'Redactar el informe con interpretación', p: 2, fb: 'El dato sin interpretación no ayuda a decidir.', efecto: { confianza: 7, tension: -4 } },
            { icono: '➖', t: 'Restar activos y pasivos sin interpretar', p: 1, fb: 'Dato parcial.', efecto: { confianza: 1, tension: 1 } },
            { icono: '🛍️', t: 'Recomendar gastar todo el disponible', p: 0, fb: 'Irresponsable con fondos públicos.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Índice de liquidez', claves: ['liquidez', 'indice', 'razon corriente', 'dividir', 'activo corriente', 'pasivo corriente'] },
            { n: 'Resultado e interpretación', claves: ['dos', '2', 'por cada dolar', 'capacidad de pago', 'corto plazo', 'cubrir'] },
            { n: 'Informe contable', claves: ['informe', 'estados financieros', 'balance', 'reporte', 'director', 'analisis'] }
          ],
          evitar: [ { claves: ['gastar todo', 'sobra plata'], fb: 'La liquidez no autoriza gastos sin planificación.' } ],
          modelo: 'La liquidez corriente es 50.000 dividido para 25.000, igual a 2: por cada dólar de deuda a corto plazo tenemos dos para cubrirla. Lo explico así en el informe al Director.'
        }
      ]
    }
  },

  /* ===================== AIP-07 Fundamentos de Economía ===================== */
  {
    id: 'asig-AIP-07', cod: 'AIP-07',
    titulo: 'El precio del verde en el mercado municipal',
    asignaturas: ['AIP-07'],
    persona: { nombre: 'Sra. Luz Machoa', rol: 'Dirigente de comerciantes del mercado municipal', avatar: '👩🏽‍🌾', pitch: 1.1 },
    contexto: 'Tras una crecida del río que cortó la vía hacia las fincas, el precio del plátano verde se duplicó en el mercado. La dirigente de comerciantes pide al GAD explicaciones y medidas.',
    objetivo: 'Aplicar conceptos micro y macroeconómicos, sistemas económicos y política económica del sector público.',
    pasos: [
      { dice: '¡El racimo de verde pasó de 4 a 8 dólares! ¿Por qué pasa esto? ¿El Municipio lo subió?', opciones: [
          { t: 'No lo subió el Municipio: al cortarse la vía bajó la oferta y la demanda se mantuvo, por eso subió el precio de equilibrio.', p: 2, r: 'Ah, entonces es porque no llega el producto.', fb: 'Microeconomía: una reducción de la oferta con demanda constante eleva el precio de mercado.' },
          { t: 'Es por la inflación del país.', p: 1, r: '¿Pero tanto en una semana?', fb: 'La inflación es un alza general y sostenida; aquí se trata de un choque de oferta local.' },
          { t: 'Los comerciantes son abusivos, nada más.', p: 0, r: '¡Nos está ofendiendo!', fb: 'Acusar sin análisis genera conflicto y desconoce la ley de oferta y demanda.' } ] },
      { dice: '¿Y por qué dicen en la radio que la economía del país está lenta? ¿Eso nos afecta?', opciones: [
          { t: 'Eso es macroeconomía: producción nacional (PIB), empleo e inflación. En un país dolarizado sin política monetaria propia, pesan más el gasto público y el comercio exterior.', p: 2, r: 'Ahora entiendo la diferencia.', fb: 'La macroeconomía estudia agregados; la dolarización limita la política monetaria en Ecuador.' },
          { t: 'Es que hay menos plata circulando.', p: 1, r: 'Algo, pero no me queda claro.', fb: 'Es una idea intuitiva pero incompleta.' },
          { t: 'Que el Banco Central imprima más dólares y listo.', p: 0, r: '¿Se puede hacer eso?', fb: 'En dolarización el Ecuador no emite dólares; es un error conceptual.' } ] },
      { dice: '¿Qué puede hacer el GAD para ayudarnos?', opciones: [
          { t: 'Aplicar política local: priorizar la reparación de la vía con inversión pública, facilitar ferias productor-consumidor y evaluar su impacto en precios.', p: 2, r: 'Eso sí nos ayudaría a todos.', fb: 'La política fiscal local (inversión, tasas, servicios) incide en la economía del cantón dentro de las competencias del GAD.' },
          { t: 'Fijar un precio máximo del verde por ordenanza.', p: 1, r: 'Pero si no llega producto, ¿de dónde sacamos?', fb: 'Un precio tope sin resolver la oferta puede generar escasez.' },
          { t: 'Nada, eso no es asunto del Municipio.', p: 0, r: 'Entonces, ¿para qué está el Municipio?', fb: 'El GAD tiene competencias en vialidad y fomento productivo que impactan la economía local.' } ] }
    ],
    vivo: {
      lugar: 'Mercado municipal de San Isidro', fondo: 'comunidad',
      inicio: { confianza: 35, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '🍌', t: 'Comparar precios del verde antes y después', p: 2, fb: 'Cuantifica el choque.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🚧', t: 'Confirmar con Obras Públicas el corte de la vía', p: 2, fb: 'Identifica la causa de la menor oferta.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📻', t: 'Atribuirlo a la inflación nacional', p: 1, fb: 'Explicación imprecisa.', efecto: { confianza: 0, tension: 2 } },
            { icono: '👉', t: 'Culpar a los comerciantes', p: 0, fb: 'Genera conflicto sin fundamento.', efecto: { confianza: -16, tension: 16 } }
          ],
          conceptos: [
            { n: 'Oferta', claves: ['oferta', 'menos producto', 'escasez', 'no llega', 'abastec', 'productores'] },
            { n: 'Demanda', claves: ['demanda', 'compradores', 'consumo', 'se mantiene', 'necesidad', 'consumidores'] },
            { n: 'Precio de equilibrio', claves: ['precio', 'equilibrio', 'sube', 'mercado', 'microeconom', 'ley de oferta'] }
          ],
          evitar: [ { claves: ['son abusivos', 'el municipio subio'], fb: 'Hay que explicar la causa real sin acusar.' } ],
          modelo: 'El Municipio no fijó ese precio. Al cortarse la vía disminuyó la oferta de verde, la demanda se mantuvo y por eso subió el precio de equilibrio en el mercado.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Explicar con datos del PIB, empleo e inflación', p: 2, fb: 'Son los agregados macroeconómicos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '💵', t: 'Recordar que Ecuador está dolarizado', p: 2, fb: 'Explica límites de la política monetaria.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🤔', t: 'Decir que hay menos plata', p: 1, fb: 'Explicación vaga.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🖨️', t: 'Proponer imprimir dólares', p: 0, fb: 'Error conceptual en dolarización.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Macroeconomía', claves: ['macroeconom', 'pib', 'produccion nacional', 'empleo', 'desempleo', 'crecimiento'] },
            { n: 'Inflación', claves: ['inflacion', 'alza general', 'nivel de precios', 'costo de vida', 'poder adquisitivo'] },
            { n: 'Dolarización y sistema económico', claves: ['dolariz', 'politica monetaria', 'no emite', 'gasto publico', 'economia mixta', 'comercio exterior'] }
          ],
          evitar: [ { claves: ['imprimir dolares', 'imprimir mas'], fb: 'Ecuador no emite dólares.' } ],
          modelo: 'La radio habla de macroeconomía: producción nacional o PIB, empleo e inflación. Como estamos dolarizados no hay política monetaria propia, por eso pesan el gasto público y el comercio exterior.'
        },
        {
          acciones: [
            { icono: '🛣️', t: 'Proponer priorizar la reparación de la vía', p: 2, fb: 'Restablece la oferta.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🧺', t: 'Organizar una feria productor–consumidor', p: 2, fb: 'Reduce intermediación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏷️', t: 'Sugerir un precio máximo por ordenanza', p: 1, fb: 'Puede causar escasez.', efecto: { confianza: 1, tension: 2 } },
            { icono: '🙅', t: 'Decir que no es asunto del GAD', p: 0, fb: 'Desconoce sus competencias.', efecto: { confianza: -15, tension: 14 } }
          ],
          conceptos: [
            { n: 'Política económica local', claves: ['politica', 'fiscal', 'inversion publica', 'gasto publico', 'tasas', 'presupuesto'] },
            { n: 'Medidas concretas', claves: ['via', 'reparar', 'feria', 'productor', 'fomento productivo', 'abastec'] },
            { n: 'Impacto y evaluación', claves: ['impacto', 'precios', 'evaluar', 'bienestar', 'beneficio', 'efecto'] }
          ],
          evitar: [ { claves: ['no es asunto', 'no podemos hacer nada'], fb: 'El GAD sí tiene herramientas de política local.' } ],
          modelo: 'El GAD puede aplicar política fiscal local: priorizar la inversión pública para reparar la vía y organizar ferias productor–consumidor, y luego evaluar el impacto en los precios.'
        }
      ]
    }
  },

  /* ===================== AIP-08 Técnicas de Gestión Documental ===================== */
  {
    id: 'asig-AIP-08', cod: 'AIP-08',
    titulo: 'Ordenar el archivo de gestión de Secretaría',
    asignaturas: ['AIP-08'],
    persona: { nombre: 'Abg. Patricio Mayancha', rol: 'Secretario General del GAD', avatar: '🧑🏽‍⚖️', pitch: 0.9 },
    contexto: 'La Secretaría General tiene expedientes sin registro y cajas apiladas. Un ciudadano además pide copia de un trámite de hace cuatro años. Debes aplicar técnicas de gestión documental conforme a la normativa.',
    objetivo: 'Aplicar normas de gestión documental, sistemas de archivo, clasificación documental y normativa legal sobre documentos.',
    pasos: [
      { dice: 'Llegó una solicitud de un ciudadano. ¿Qué haces antes de pasarla al departamento?', opciones: [
          { t: 'La registro en el sistema de gestión documental con número de trámite, fecha, hora, remitente y asunto, y entrego la fe de recepción.', p: 2, r: 'Así tiene trazabilidad desde el ingreso.', fb: 'El registro de entrada asegura trazabilidad, control de plazos y transparencia.' },
          { t: 'La pongo en la bandeja del jefe con un post-it.', p: 1, r: 'Se puede perder fácilmente.', fb: 'Sin registro formal no hay control del trámite.' },
          { t: 'La dejo en el escritorio y luego veo.', p: 0, r: 'El ciudadano nunca sabrá qué pasó.', fb: 'Omitir el registro vulnera el derecho a una respuesta oportuna.' } ] },
      { dice: 'Hay cajas con oficios, contratos y planillas mezclados. ¿Cómo los organizas?', opciones: [
          { t: 'Aplico el cuadro de clasificación documental: separo por series (oficios, contratos, planillas), ordeno cronológicamente cada expediente, foliamos y rotulamos.', p: 2, r: 'Ordenado y fácil de encontrar.', fb: 'La clasificación por series y la ordenación cronológica o numérica facilitan la recuperación.' },
          { t: 'Ordeno todo alfabéticamente por el nombre de quien firma.', p: 1, r: 'Ayuda, pero mezcla tipos de documentos.', fb: 'El orden alfabético solo es útil dentro de series adecuadas.' },
          { t: 'Boto lo que parece viejo para ganar espacio.', p: 0, r: '¡Eso puede ser documentación legal!', fb: 'La eliminación solo procede según tablas de plazos de conservación aprobadas.' } ] },
      { dice: 'El ciudadano necesita copia de su trámite de 2022. ¿Dónde lo buscas y cómo respondes?', opciones: [
          { t: 'Reviso el inventario y la tabla de plazos para saber si está en el archivo de gestión o el central, localizo el expediente y entrego copia certificada, respetando la transparencia y los datos personales.', p: 2, r: 'Rápido y conforme a la norma.', fb: 'Los inventarios y la normativa de transparencia y acceso a la información garantizan una respuesta oportuna.' },
          { t: 'Busco caja por caja hasta encontrarlo.', p: 1, r: 'Se tardará días.', fb: 'Sin inventario la búsqueda es ineficiente.' },
          { t: 'Le digo que los documentos viejos ya no existen.', p: 0, r: 'Eso es negar información pública.', fb: 'Negar información sin fundamento vulnera el derecho de acceso a la información pública.' } ] }
    ],
    vivo: {
      lugar: 'Secretaría General y archivo del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🖥️', t: 'Registrar la solicitud en el sistema documental', p: 2, fb: 'Genera trazabilidad.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🧾', t: 'Entregar la fe de recepción al ciudadano', p: 2, fb: 'Respalda el ingreso del trámite.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🟨', t: 'Pegar un post-it y pasarla al jefe', p: 1, fb: 'Sin control formal.', efecto: { confianza: 0, tension: 3 } },
            { icono: '📥', t: 'Dejarla sin registrar en el escritorio', p: 0, fb: 'Se pierde el trámite.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Registro de entrada', claves: ['registr', 'ingreso', 'numero de tramite', 'sistema', 'recepcion', 'radicar'] },
            { n: 'Datos del documento', claves: ['fecha', 'hora', 'remitente', 'asunto', 'anexos', 'folios'] },
            { n: 'Trazabilidad', claves: ['trazabilidad', 'seguimiento', 'control', 'plazo', 'fe de recepcion', 'sello'] }
          ],
          evitar: [ { claves: ['luego veo', 'sin registrar'], fb: 'Todo documento recibido debe registrarse.' } ],
          modelo: 'Primero registro la solicitud en el sistema de gestión documental con número de trámite, fecha, hora, remitente y asunto, y le entrego al ciudadano la fe de recepción para el seguimiento.'
        },
        {
          acciones: [
            { icono: '🗂️', t: 'Separar los documentos por series documentales', p: 2, fb: 'Base de la clasificación.', efecto: { confianza: 9, tension: -5 } },
            { icono: '🏷️', t: 'Foliar y rotular cada expediente', p: 2, fb: 'Asegura integridad y ubicación.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🔤', t: 'Ordenar todo alfabéticamente', p: 1, fb: 'Mezcla series diferentes.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🔥', t: 'Eliminar documentos viejos sin autorización', p: 0, fb: 'Puede destruir documentos con valor legal.', efecto: { confianza: -18, tension: 16 } }
          ],
          conceptos: [
            { n: 'Clasificación documental', claves: ['clasific', 'cuadro de clasificacion', 'serie', 'subserie', 'fondo', 'seccion'] },
            { n: 'Ordenación', claves: ['orden', 'cronologic', 'numeric', 'expediente', 'fecha', 'secuencia'] },
            { n: 'Foliación y rotulación', claves: ['foli', 'rotul', 'caja', 'carpeta', 'etiqueta', 'inventario'] }
          ],
          evitar: [ { claves: ['botar', 'quemar', 'tirar a la basura'], fb: 'La eliminación requiere autorización y plazos de conservación.' } ],
          modelo: 'Aplico el cuadro de clasificación: separo las series de oficios, contratos y planillas, ordeno cronológicamente cada expediente, lo foliamos, rotulamos las cajas y actualizamos el inventario.'
        },
        {
          acciones: [
            { icono: '📖', t: 'Consultar el inventario documental', p: 2, fb: 'Localiza el expediente rápidamente.', efecto: { confianza: 9, tension: -6 } },
            { icono: '⏱️', t: 'Revisar la tabla de plazos de conservación', p: 2, fb: 'Indica si está en archivo de gestión o central.', efecto: { confianza: 7, tension: -4 } },
            { icono: '📦', t: 'Buscar caja por caja', p: 1, fb: 'Ineficiente.', efecto: { confianza: -1, tension: 4 } },
            { icono: '🤐', t: 'Negar que el documento exista', p: 0, fb: 'Vulnera el acceso a la información.', efecto: { confianza: -16, tension: 14 } }
          ],
          conceptos: [
            { n: 'Sistema de archivo', claves: ['archivo de gestion', 'archivo central', 'archivo historico', 'transferencia', 'inventario', 'ubicacion'] },
            { n: 'Plazos de conservación', claves: ['tabla de plazos', 'conservacion', 'retencion', 'cuatro anos', 'vigencia', 'valor'] },
            { n: 'Normativa y acceso', claves: ['transparencia', 'acceso a la informacion', 'copia certificada', 'normativa', 'datos personales', 'derecho'] }
          ],
          evitar: [ { claves: ['ya no existe', 'se perdio'], fb: 'Negar información pública sin verificar es una falta.' } ],
          modelo: 'Reviso el inventario y la tabla de plazos de conservación para ubicar si el expediente de 2022 está en el archivo de gestión o en el central, y le entrego una copia certificada conforme a la normativa de acceso a la información.'
        }
      ]
    }
  },

  /* ===================== AIP-09 Administración Pública I ===================== */
  {
    id: 'asig-AIP-09', cod: 'AIP-09',
    titulo: '¿A qué dirección le toca? Estructura del GAD',
    asignaturas: ['AIP-09'],
    persona: { nombre: 'Sr. Wilmer Chimbo', rol: 'Ciudadano que quiere construir su vivienda', avatar: '👨🏽‍🔧', pitch: 1.0 },
    contexto: 'Un ciudadano lleva tres días yendo de oficina en oficina para obtener el permiso de construcción. Debes orientarlo con base en la estructura organizacional del GAD y resolver una decisión en ausencia del jefe.',
    objetivo: 'Aplicar fundamentos de la administración pública, estructuras organizacionales y funciones del administrador público.',
    pasos: [
      { dice: '¡Ya me mandaron a tres oficinas! ¿Quién me da el permiso de construcción?', opciones: [
          { t: 'Le explico que el permiso corresponde a la Dirección de Planificación y Ordenamiento Territorial, según el orgánico funcional, y lo acompaño a la ventanilla correcta con los requisitos.', p: 2, r: '¡Por fin alguien que sabe!', fb: 'Conocer la estructura orgánica y las competencias municipales evita la "peloteo" y mejora el servicio.' },
          { t: 'Creo que es en el segundo piso, pregunte allá.', p: 1, r: 'Otra vez a preguntar…', fb: 'La orientación imprecisa prolonga el trámite.' },
          { t: 'No sé, no es de mi área.', p: 0, r: '¡Esto es una burla!', fb: 'Todo servidor debe orientar al ciudadano; la atención es responsabilidad institucional.' } ] },
      { dice: '¿Y por qué el Municipio tiene tantas direcciones? ¿No sería más fácil una sola?', opciones: [
          { t: 'La estructura se organiza por procesos: gobernantes (Alcaldía y Concejo), agregadores de valor (los que dan servicios como Planificación u Obras) y de apoyo y asesoría (Financiero, Jurídico, Talento Humano).', p: 2, r: 'Ahora entiendo cómo funciona.', fb: 'La estructura por procesos distribuye funciones y responsabilidades en las instituciones públicas.' },
          { t: 'Porque así se reparte el trabajo.', p: 1, r: 'Bueno, eso imaginaba.', fb: 'Es correcto pero muy general.' },
          { t: 'Para dar puestos a los amigos del Alcalde.', p: 0, r: '¿En serio?', fb: 'Afirmaciones infundadas dañan la imagen institucional y no explican la estructura.' } ] },
      { dice: '(Compañera) El director está de comisión y hay 15 permisos represados. ¿Qué hacemos?', opciones: [
          { t: 'Revisamos quién tiene delegación o subrogación, priorizamos por fecha de ingreso, preparamos los expedientes completos y informamos al director.', p: 2, r: 'Así avanzamos sin saltarnos la norma.', fb: 'El administrador público decide dentro de sus competencias, con base en la delegación y el orden de ingreso.' },
          { t: 'Esperamos a que vuelva el director.', p: 1, r: 'Los ciudadanos seguirán esperando.', fb: 'La inacción afecta la eficiencia del servicio.' },
          { t: 'Firmamos nosotros los permisos para avanzar.', p: 0, r: '¡No tenemos competencia para eso!', fb: 'Actuar sin competencia vicia el acto administrativo.' } ] }
    ],
    vivo: {
      lugar: 'Hall de atención ciudadana del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 30, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '🏛️', t: 'Consultar el orgánico funcional del GAD', p: 2, fb: 'Define qué dirección es competente.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚶', t: 'Acompañarlo a la ventanilla de Planificación', p: 2, fb: 'Evita más vueltas.', efecto: { confianza: 10, tension: -10 } },
            { icono: '☝️', t: 'Indicarle vagamente otro piso', p: 1, fb: 'Orientación imprecisa.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🤷‍♂️', t: 'Decirle que no es de su área', p: 0, fb: 'Abandona al ciudadano.', efecto: { confianza: -16, tension: 15 } }
          ],
          conceptos: [
            { n: 'Unidad competente', claves: ['planificacion', 'ordenamiento territorial', 'direccion', 'competen', 'ventanilla', 'permiso de construccion'] },
            { n: 'Orgánico funcional', claves: ['organico', 'funcional', 'estructura', 'organigrama', 'funciones', 'manual'] },
            { n: 'Atención al ciudadano', claves: ['acompan', 'orientar', 'requisitos', 'disculp', 'ayudar', 'servicio'] }
          ],
          evitar: [ { claves: ['no es mi area', 'no se'], fb: 'El servidor público debe orientar siempre.' } ],
          modelo: 'Disculpe las vueltas. Según el orgánico funcional, el permiso de construcción lo otorga la Dirección de Planificación y Ordenamiento Territorial; lo acompaño a la ventanilla y le indico los requisitos.'
        },
        {
          acciones: [
            { icono: '🗺️', t: 'Mostrar el organigrama institucional', p: 2, fb: 'Visualiza la estructura.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔗', t: 'Explicar los procesos gobernantes, agregadores y de apoyo', p: 2, fb: 'Es la lógica de la estructura por procesos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💭', t: 'Responder que así se reparte el trabajo', p: 1, fb: 'Muy general.', efecto: { confianza: 0, tension: 1 } },
            { icono: '😒', t: 'Criticar a la autoridad frente al ciudadano', p: 0, fb: 'Daña la imagen institucional.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Procesos gobernantes', claves: ['gobernante', 'alcaldia', 'concejo', 'direccionamiento', 'autoridad', 'alcalde'] },
            { n: 'Procesos agregadores de valor', claves: ['agregador', 'valor', 'servicios', 'obras', 'planificacion', 'ciudadania'] },
            { n: 'Procesos de apoyo y asesoría', claves: ['apoyo', 'asesoria', 'financier', 'juridic', 'talento humano', 'habilitante'] }
          ],
          evitar: [ { claves: ['puestos a los amigos', 'pura burocracia'], fb: 'Comentarios sin fundamento dañan la institución.' } ],
          modelo: 'El GAD se organiza por procesos: los gobernantes son la Alcaldía y el Concejo; los agregadores de valor, como Planificación y Obras, dan servicios; y los de apoyo y asesoría, como Financiero y Jurídico, sostienen la gestión.'
        },
        {
          acciones: [
            { icono: '📜', t: 'Verificar si existe delegación o subrogación', p: 2, fb: 'Respeta la competencia.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔢', t: 'Priorizar los expedientes por fecha de ingreso', p: 2, fb: 'Orden y equidad.', efecto: { confianza: 7, tension: -5 } },
            { icono: '⌛', t: 'Esperar sin hacer nada', p: 1, fb: 'Retrasa el servicio.', efecto: { confianza: -2, tension: 5 } },
            { icono: '🖊️', t: 'Firmar los permisos sin competencia', p: 0, fb: 'Acto nulo y responsabilidad administrativa.', efecto: { confianza: -18, tension: 16 } }
          ],
          conceptos: [
            { n: 'Delegación y competencia', claves: ['delegacion', 'subroga', 'competencia', 'autoriz', 'encargado', 'firma'] },
            { n: 'Priorización', claves: ['prioriz', 'fecha de ingreso', 'orden', 'expedientes completos', 'revisar', 'organizar'] },
            { n: 'Comunicación al superior', claves: ['informar', 'director', 'reportar', 'comunicar', 'coordinar', 'consultar'] }
          ],
          evitar: [ { claves: ['firmamos nosotros', 'nadie se va a dar cuenta'], fb: 'Actuar sin competencia vicia el acto.' } ],
          modelo: 'Verifiquemos si hay delegación o subrogación del director; mientras tanto priorizamos los expedientes por fecha de ingreso, dejamos listos los completos e informamos al director para su firma.'
        }
      ]
    }
  },

  /* ===================== AIP-10 Fundamentos de Marketing en Instituciones Públicas ===================== */
  {
    id: 'asig-AIP-10', cod: 'AIP-10',
    titulo: 'Campaña "San Isidro Recicla"',
    asignaturas: ['AIP-10'],
    persona: { nombre: 'Lcda. Nayely Tapuy', rol: 'Jefa de Comunicación Institucional', avatar: '👩🏽‍🎤', pitch: 1.2 },
    contexto: 'Solo el 20 % de los hogares separa sus residuos. La jefa de Comunicación te pide apoyar el diseño de una campaña de marketing social para el nuevo servicio de reciclaje.',
    objetivo: 'Aplicar conceptos y estrategias de marketing de servicios públicos, comunicación y branding institucional.',
    pasos: [
      { dice: 'Queremos que más gente separe la basura. ¿Por dónde empezamos la campaña?', opciones: [
          { t: 'Investigamos y segmentamos públicos (hogares, mercados, escuelas, comunidades kichwa y shuar) y definimos el beneficio para el ciudadano.', p: 2, r: 'Conocer al público es clave.', fb: 'El marketing público parte del ciudadano: segmentación y propuesta de valor del servicio.' },
          { t: 'Hacemos un afiche bonito y lo pegamos en el Municipio.', p: 1, r: 'Lo verán solo quienes vengan.', fb: 'Sin segmentación la pieza no llega a quien debe.' },
          { t: 'Ponemos multas y que se enteren solos.', p: 0, r: 'La gente se molestaría.', fb: 'La sanción sin comunicación no genera cambio de conducta sostenible.' } ] },
      { dice: '¿Qué estrategias y canales usaríamos?', opciones: [
          { t: 'Mezcla de canales: radio local, redes sociales, perifoneo y visitas casa por casa, mensajes también en kichwa y shuar, y la entrega de fundas diferenciadas.', p: 2, r: 'Así llegamos a todos.', fb: 'La estrategia multicanal e intercultural amplía cobertura y pertinencia.' },
          { t: 'Solo redes sociales, que es gratis.', p: 1, r: 'Muchos adultos mayores no usan redes.', fb: 'Un solo canal deja fuera a segmentos importantes.' },
          { t: 'Un comunicado técnico largo en la página web.', p: 0, r: 'Nadie lo leerá.', fb: 'Los mensajes deben ser breves, claros y en canales que use el público.' } ] },
      { dice: 'Ahora la identidad visual. El concejal quiere su foto grande en los afiches.', opciones: [
          { t: 'Usamos la marca institucional del GAD y el slogan de la campaña, sin promoción personal de autoridades, porque los recursos son públicos.', p: 2, r: 'Tienes razón, la campaña es del Municipio.', fb: 'El branding público comunica la institución y el servicio; usar recursos públicos para promoción personal no es adecuado.' },
          { t: 'Ponemos la foto pequeña en una esquina.', p: 1, r: 'Sigue siendo promoción personal.', fb: 'Reducir el tamaño no corrige el problema de fondo.' },
          { t: 'Hacemos lo que diga el concejal.', p: 0, r: 'Eso puede traer observaciones.', fb: 'Priorizar la imagen personal sobre la institucional afecta la confianza ciudadana.' } ] }
    ],
    vivo: {
      lugar: 'Unidad de Comunicación Institucional del GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '👥', t: 'Segmentar a los públicos objetivo', p: 2, fb: 'Permite mensajes pertinentes.', efecto: { confianza: 9, tension: -5 } },
            { icono: '🔍', t: 'Revisar datos de recolección por barrio', p: 2, fb: 'Diagnóstico basado en datos.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🖌️', t: 'Diseñar un afiche sin investigar', p: 1, fb: 'Pieza sin público definido.', efecto: { confianza: 0, tension: 2 } },
            { icono: '💰', t: 'Empezar solo con multas', p: 0, fb: 'Genera rechazo.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Marketing social público', claves: ['marketing social', 'marketing publico', 'cambio de conducta', 'servicio publico', 'ciudadano', 'campana'] },
            { n: 'Segmentación', claves: ['segment', 'publico objetivo', 'hogares', 'escuelas', 'mercados', 'comunidades'] },
            { n: 'Propuesta de valor', claves: ['beneficio', 'valor', 'ambiente', 'salud', 'ciudad limpia', 'necesidad'] }
          ],
          evitar: [ { claves: ['multas primero', 'que se enteren solos'], fb: 'La comunicación precede a la sanción.' } ],
          modelo: 'Empezamos investigando y segmentando a los públicos: hogares, mercados, escuelas y comunidades kichwa y shuar, y definimos el beneficio para el ciudadano: una ciudad más limpia y sana.'
        },
        {
          acciones: [
            { icono: '📻', t: 'Programar cuñas en la radio local', p: 2, fb: 'Alto alcance en la Amazonía.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏠', t: 'Planificar visitas casa por casa', p: 2, fb: 'Comunicación directa y educativa.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📲', t: 'Usar solo redes sociales', p: 1, fb: 'Excluye segmentos.', efecto: { confianza: 0, tension: 2 } },
            { icono: '📃', t: 'Publicar un comunicado técnico largo', p: 0, fb: 'Mensaje poco efectivo.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Estrategia multicanal', claves: ['radio', 'redes sociales', 'perifoneo', 'casa por casa', 'canales', 'medios'] },
            { n: 'Pertinencia intercultural', claves: ['kichwa', 'shuar', 'intercultural', 'idioma', 'lengua', 'pertinen'] },
            { n: 'Mensaje claro y acción', claves: ['mensaje', 'claro', 'breve', 'fundas', 'separar', 'llamado'] }
          ],
          evitar: [ { claves: ['solo redes', 'comunicado tecnico'], fb: 'Un solo canal o lenguaje técnico limita el alcance.' } ],
          modelo: 'Usaremos varios canales: radio local, redes sociales, perifoneo y visitas casa por casa, con mensajes breves también en kichwa y shuar, y entrega de fundas para separar los residuos.'
        },
        {
          acciones: [
            { icono: '🎨', t: 'Aplicar el manual de marca del GAD', p: 2, fb: 'Coherencia de identidad institucional.', efecto: { confianza: 8, tension: -4 } },
            { icono: '♻️', t: 'Crear un slogan y logo de campaña', p: 2, fb: 'Facilita recordación.', efecto: { confianza: 7, tension: -3 } },
            { icono: '🖼️', t: 'Poner la foto del concejal pequeña', p: 1, fb: 'Sigue siendo promoción personal.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🤳', t: 'Poner la foto grande del concejal', p: 0, fb: 'Usa recursos públicos para imagen personal.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Branding institucional', claves: ['marca', 'branding', 'identidad', 'logo', 'manual de marca', 'colores'] },
            { n: 'Campaña y slogan', claves: ['slogan', 'campana', 'san isidro recicla', 'recordacion', 'imagen', 'posicionamiento'] },
            { n: 'Uso ético de recursos públicos', claves: ['recursos publicos', 'promocion personal', 'institucional', 'sin fotos', 'no personal', 'transparencia'] }
          ],
          evitar: [ { claves: ['foto del concejal', 'lo que diga el concejal'], fb: 'La comunicación pública no es propaganda personal.' } ],
          modelo: 'Usaremos la marca institucional del GAD y el slogan "San Isidro Recicla", sin fotos de autoridades, porque los recursos públicos no deben usarse para promoción personal.'
        }
      ]
    }
  },

  /* ===================== AIP-11 Presupuesto Público ===================== */
  {
    id: 'asig-AIP-11', cod: 'AIP-11',
    titulo: 'Compra sin certificación presupuestaria',
    asignaturas: ['AIP-11'],
    persona: { nombre: 'Ing. Byron Cuji', rol: 'Jefe de la Unidad de Desarrollo Comunitario', avatar: '🧔🏽', pitch: 0.9 },
    contexto: 'El jefe de Desarrollo Comunitario quiere comprar ya diez computadoras para un infocentro, aunque no hay certificación presupuestaria. Debes aplicar el ciclo presupuestario, el control del gasto y la evaluación.',
    objetivo: 'Aplicar tipos y elaboración del presupuesto público, control de gastos e ingresos y evaluación presupuestaria.',
    pasos: [
      { dice: 'Necesito las computadoras esta semana. Llama al proveedor y luego vemos de dónde sale la plata.', opciones: [
          { t: 'Primero verificamos que exista partida en el presupuesto aprobado y solicitamos la certificación presupuestaria; sin ella no se puede comprometer el gasto.', p: 2, r: 'Bueno, hagámoslo bien.', fb: 'La certificación presupuestaria garantiza disponibilidad de fondos antes de comprometer recursos.' },
          { t: 'Pido proformas mientras tanto, sin comprometer nada.', p: 1, r: 'Al menos avanzamos.', fb: 'Las proformas ayudan a estimar, pero no sustituyen la certificación.' },
          { t: 'Llamo al proveedor y que entregue; luego regularizamos.', p: 0, r: '(Financiero) ¡Eso genera responsabilidad!', fb: 'Comprometer sin certificación vulnera las normas de finanzas públicas.' } ] },
      { dice: '(Financiero) Al tercer trimestre el codificado es 900.000 y el devengado 360.000. ¿Cómo vamos?', opciones: [
          { t: 'La ejecución es 360.000 ÷ 900.000 = 40 %; al tercer trimestre se esperaría cerca del 75 %, hay baja ejecución y debemos revisar causas.', p: 2, r: 'Exacto, hay que alertar.', fb: 'El porcentaje de ejecución (devengado/codificado) es el indicador clave del control del gasto.' },
          { t: 'Nos falta gastar 540.000.', p: 1, r: 'Es el saldo, pero ¿qué significa?', fb: 'El saldo es útil pero falta interpretar el nivel de ejecución.' },
          { t: 'Hay que gastar todo rápido en diciembre.', p: 0, r: 'Eso es mala gestión.', fb: 'Gastar apresuradamente al final del año afecta la calidad del gasto.' } ] },
      { dice: '¿Qué hacemos para el próximo año y con las partidas que no avanzan?', opciones: [
          { t: 'Evaluamos metas físicas y financieras, proponemos reformas o traspasos justificados y formulamos el próximo presupuesto ligado al plan operativo anual.', p: 2, r: 'Así el presupuesto responde a la planificación.', fb: 'La evaluación retroalimenta la programación y formulación del siguiente ciclo presupuestario.' },
          { t: 'Copiamos el presupuesto de este año.', p: 1, r: 'Repetiríamos los mismos errores.', fb: 'El presupuesto incremental sin evaluación perpetúa ineficiencias.' },
          { t: 'Pedimos el doble para tener colchón.', p: 0, r: 'No es técnico.', fb: 'Sobrestimar sin sustento distorsiona la asignación de recursos.' } ] }
    ],
    vivo: {
      lugar: 'Dirección Financiera – Unidad de Presupuesto del GAD', fondo: 'oficina',
      inicio: { confianza: 45, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '🔎', t: 'Verificar la partida en el presupuesto aprobado', p: 2, fb: 'Confirma disponibilidad.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📝', t: 'Solicitar la certificación presupuestaria', p: 2, fb: 'Requisito previo al compromiso.', efecto: { confianza: 9, tension: -6 } },
            { icono: '📨', t: 'Pedir proformas referenciales', p: 1, fb: 'Útil pero no suficiente.', efecto: { confianza: 1, tension: 1 } },
            { icono: '📞', t: 'Ordenar la entrega al proveedor sin fondos', p: 0, fb: 'Compromiso ilegal del gasto.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Certificación presupuestaria', claves: ['certificacion', 'disponibilidad', 'partida', 'fondos', 'asignacion', 'presupuestaria'] },
            { n: 'Ciclo presupuestario', claves: ['ciclo', 'programacion', 'formulacion', 'aprobacion', 'ejecucion', 'compromiso'] },
            { n: 'Legalidad del gasto', claves: ['norma', 'finanzas publicas', 'no se puede', 'responsabilidad', 'antes de', 'legal'] }
          ],
          evitar: [ { claves: ['luego regularizamos', 'despues vemos la plata'], fb: 'Nunca se compromete gasto sin certificación.' } ],
          modelo: 'Ingeniero, estamos en la fase de ejecución del ciclo presupuestario: primero verificamos que exista la partida en el presupuesto aprobado y pedimos la certificación presupuestaria; sin ella no podemos comprometer el gasto según las normas de finanzas públicas.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Calcular el porcentaje de ejecución', p: 2, fb: 'Indicador clave de control.', efecto: { confianza: 9, tension: -5 } },
            { icono: '📉', t: 'Comparar con la ejecución esperada al trimestre', p: 2, fb: 'Permite detectar desfases.', efecto: { confianza: 7, tension: -4 } },
            { icono: '➖', t: 'Calcular solo el saldo por ejecutar', p: 1, fb: 'Dato sin interpretación.', efecto: { confianza: 1, tension: 1 } },
            { icono: '🎄', t: 'Proponer gastar todo en diciembre', p: 0, fb: 'Afecta la calidad del gasto.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Codificado y devengado', claves: ['codificado', 'devengado', 'novecientos mil', '900', 'trescientos sesenta mil', '360'] },
            { n: 'Porcentaje de ejecución', claves: ['cuarenta por ciento', '40', 'ejecucion', 'porcentaje', 'dividir', 'indicador'] },
            { n: 'Control y alerta', claves: ['baja ejecucion', 'alerta', 'causas', 'control', 'esperado', 'setenta y cinco'] }
          ],
          evitar: [ { claves: ['gastar todo rapido', 'gastar en diciembre'], fb: 'El gasto debe responder a la planificación.' } ],
          modelo: 'La ejecución es 360.000 dividido para 900.000, igual al 40 %. Al tercer trimestre deberíamos estar cerca del 75 %, así que hay baja ejecución y debemos revisar sus causas.'
        },
        {
          acciones: [
            { icono: '🎯', t: 'Evaluar metas físicas y financieras', p: 2, fb: 'Mide eficacia y eficiencia.', efecto: { confianza: 9, tension: -5 } },
            { icono: '🔄', t: 'Proponer un traspaso de crédito justificado', p: 2, fb: 'Reasigna recursos legalmente.', efecto: { confianza: 7, tension: -4 } },
            { icono: '📋', t: 'Copiar el presupuesto anterior', p: 1, fb: 'Repite ineficiencias.', efecto: { confianza: 0, tension: 2 } },
            { icono: '📈', t: 'Inflar las partidas para tener colchón', p: 0, fb: 'Sin sustento técnico.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Evaluación presupuestaria', claves: ['evalua', 'metas', 'fisicas', 'financieras', 'cumplimiento', 'resultados'] },
            { n: 'Reformas y traspasos', claves: ['reforma', 'traspaso', 'reasign', 'modificacion', 'justific', 'suplemento'] },
            { n: 'Vínculo con la planificación', claves: ['plan operativo', 'poa', 'planificacion', 'proforma', 'formular', 'proximo ano'] }
          ],
          evitar: [ { claves: ['pedir el doble', 'inflar'], fb: 'La formulación debe ser técnica y sustentada.' } ],
          modelo: 'Evaluamos las metas físicas y financieras, proponemos un traspaso justificado para las partidas que no avanzan y formulamos el próximo presupuesto ligado al plan operativo anual.'
        }
      ]
    }
  },

  /* ===================== AIP-12 Derecho Administrativo ===================== */
  {
    id: 'asig-AIP-12', cod: 'AIP-12',
    titulo: 'Una multa sin motivar y un proveedor apurado',
    asignaturas: ['AIP-12'],
    persona: { nombre: 'Sra. Carmen Shiguango', rol: 'Comerciante sancionada por la Comisaría Municipal', avatar: '👩🏽', pitch: 1.1 },
    contexto: 'Una comerciante reclama una multa de la Comisaría Municipal que no explica la infracción; además, un proveedor busca un contrato "directo". Debes aplicar principios del derecho administrativo y de la contratación pública.',
    objetivo: 'Aplicar el derecho administrativo, las normas legales del sector público, la regulación del procedimiento administrativo y los contratos públicos.',
    pasos: [
      { dice: 'Me pusieron 200 dólares de multa y el papel no dice ni por qué. ¿Qué puedo hacer?', opciones: [
          { t: 'Le explico que todo acto administrativo debe estar motivado y que tiene derecho a la defensa: puede presentar un recurso dentro del plazo; le indico dónde y cómo.', p: 2, r: 'Gracias, voy a presentar mi reclamo.', fb: 'El debido proceso, la motivación y el derecho a recurrir son garantías del administrado (COA y Constitución).' },
          { t: 'Hable con el comisario a ver si se la baja.', p: 1, r: '¿Y si no me recibe?', fb: 'La gestión informal no sustituye el procedimiento de impugnación.' },
          { t: 'Pague nomás, igual no va a ganar.', p: 0, r: '¡Eso es injusto!', fb: 'Desalentar el ejercicio de derechos vulnera el debido proceso.' } ] },
      { dice: '(El comisario te pide revisar la resolución) ¿Qué le falta para ser válida?', opciones: [
          { t: 'Verifico los elementos del acto: competencia de quien firma, objeto lícito, procedimiento previo con audiencia, motivación con hechos y norma aplicada, y notificación.', p: 2, r: 'Tienes razón, faltó motivar y oír a la señora.', fb: 'Sin competencia, procedimiento o motivación el acto puede ser nulo o anulable.' },
          { t: 'Solo le falta un sello.', p: 1, r: 'El sello no subsana la falta de motivación.', fb: 'Las formalidades no reemplazan los requisitos sustanciales.' },
          { t: 'Está bien, el comisario manda.', p: 0, r: '(La resolución será impugnada con éxito.)', fb: 'El principio de legalidad limita la actuación de la autoridad.' } ] },
      { dice: '(Un proveedor) Le doy una "comisión" si me dan directo el contrato de uniformes de 40.000 dólares.', opciones: [
          { t: 'Rechazo la oferta, le explico que la compra se hace por el procedimiento que corresponda en el portal de compras públicas según la LOSNCP, y reporto el hecho a mi superior.', p: 2, r: 'Está bien… participaré en el proceso.', fb: 'La contratación pública se rige por legalidad, transparencia, igualdad y concurrencia; el soborno es un delito.' },
          { t: 'Le digo que no, pero no aviso a nadie.', p: 1, r: 'Lo intentará con otro funcionario.', fb: 'Rechazar es correcto, pero reportar previene riesgos de corrupción.' },
          { t: 'Acepto, nadie se va a enterar.', p: 0, r: '(Configura un acto de corrupción.)', fb: 'Recibir beneficios indebidos es delito y causa destitución.' } ] }
    ],
    vivo: {
      lugar: 'Comisaría Municipal del GAD de San Isidro', fondo: 'oficina',
      inicio: { confianza: 35, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '📄', t: 'Leer la resolución junto con la ciudadana', p: 2, fb: 'Identifica la falta de motivación.', efecto: { confianza: 9, tension: -6 } },
            { icono: '⚖️', t: 'Explicarle el recurso y su plazo', p: 2, fb: 'Garantiza su derecho a la defensa.', efecto: { confianza: 9, tension: -7 } },
            { icono: '🤝', t: 'Sugerirle hablar informalmente con el comisario', p: 1, fb: 'No es la vía formal.', efecto: { confianza: 0, tension: 2 } },
            { icono: '💲', t: 'Decirle que pague sin reclamar', p: 0, fb: 'Desalienta el ejercicio de derechos.', efecto: { confianza: -15, tension: 14 } }
          ],
          conceptos: [
            { n: 'Motivación', claves: ['motiva', 'fundament', 'hechos', 'norma', 'razones', 'por que'] },
            { n: 'Debido proceso y defensa', claves: ['debido proceso', 'defensa', 'derecho', 'audiencia', 'escuchar', 'garantia'] },
            { n: 'Recurso administrativo', claves: ['recurso', 'apelacion', 'impugn', 'reclamo', 'plazo', 'presentar'] }
          ],
          evitar: [ { claves: ['pague nomas', 'no va a ganar'], fb: 'Desalentar el reclamo vulnera derechos.' } ],
          modelo: 'Señora, todo acto administrativo debe estar motivado y usted tiene derecho a la defensa. Puede presentar un recurso de apelación dentro del plazo; le indico dónde y cómo hacerlo.'
        },
        {
          acciones: [
            { icono: '🔏', t: 'Verificar la competencia de quien firmó', p: 2, fb: 'Requisito de validez.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗒️', t: 'Revisar si hubo procedimiento previo y notificación', p: 2, fb: 'Garantiza el debido proceso.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🏷️', t: 'Agregar solo el sello faltante', p: 1, fb: 'No subsana la falta de motivación.', efecto: { confianza: 0, tension: 2 } },
            { icono: '👑', t: 'Validar porque lo dice el comisario', p: 0, fb: 'Viola el principio de legalidad.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Elementos del acto administrativo', claves: ['competencia', 'objeto', 'voluntad', 'procedimiento', 'motivacion', 'elementos'] },
            { n: 'Principio de legalidad', claves: ['legalidad', 'ley', 'norma', 'codigo organico administrativo', 'coa', 'facultad'] },
            { n: 'Notificación y validez', claves: ['notifica', 'validez', 'nulidad', 'nulo', 'eficacia', 'subsanar'] }
          ],
          evitar: [ { claves: ['el comisario manda', 'da igual'], fb: 'La autoridad actúa solo dentro de la ley.' } ],
          modelo: 'Reviso los elementos del acto: competencia de quien firma, objeto, procedimiento previo con audiencia, motivación con hechos y norma, y notificación. Por el principio de legalidad, sin motivación el acto puede ser nulo.'
        },
        {
          acciones: [
            { icono: '✋', t: 'Rechazar de inmediato la comisión', p: 2, fb: 'Actitud íntegra.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🌐', t: 'Indicar el procedimiento en el portal de compras públicas', p: 2, fb: 'Transparencia y concurrencia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤫', t: 'Rechazar sin informar al superior', p: 1, fb: 'El riesgo persiste.', efecto: { confianza: 1, tension: 3 } },
            { icono: '💼', t: 'Aceptar la comisión del proveedor', p: 0, fb: 'Es un acto de corrupción.', efecto: { confianza: -20, tension: 20 } }
          ],
          conceptos: [
            { n: 'Contratación pública', claves: ['losncp', 'contratacion publica', 'portal de compras', 'sercop', 'proceso', 'procedimiento'] },
            { n: 'Principios de la contratación', claves: ['transparencia', 'igualdad', 'concurrencia', 'legalidad', 'competencia', 'publicidad'] },
            { n: 'Integridad y denuncia', claves: ['rechaz', 'report', 'denunci', 'informar', 'superior', 'no acepto'] }
          ],
          evitar: [ { claves: ['acepto la comision', 'nadie se va a enterar'], fb: 'Aceptar beneficios indebidos es delito.' } ],
          modelo: 'No acepto ninguna comisión. Esta compra se realizará por el procedimiento que corresponda en el portal de compras públicas, según la LOSNCP, con transparencia y concurrencia; además, informaré este hecho a mi superior.'
        }
      ]
    }
  }
]);
