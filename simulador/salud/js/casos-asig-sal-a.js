/* Prácticas por asignatura – Administración de Sistemas de Salud (Período 1–2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== ASS-01 Metodología de la Investigación ===================== */
  {
    id: 'asig-ASS-01', cod: 'ASS-01',
    titulo: 'Encuesta de satisfacción de los usuarios',
    asignaturas: ['ASS-01'],
    persona: { nombre: 'Dra. Mirian Vargas', rol: 'Directora del Centro de Salud «Río Puyo»', avatar: '👩🏽‍⚕️', pitch: 1.05 },
    contexto: 'La directora quiere saber por qué ha bajado la satisfacción de los usuarios del centro de salud y te pide apoyar un estudio breve con datos confiables.',
    objetivo: 'Aplicar conceptos de investigación aplicada, técnicas de recolección y análisis de datos, y normas de presentación de informes.',
    pasos: [
      { dice: 'Necesito saber qué está fallando en la atención. ¿Cómo empezamos el estudio?', opciones: [
          { t: 'Planteo el problema, un objetivo medible y defino la población de usuarios y una muestra por servicio y horario.', p: 2, r: 'Muy bien, así sabremos qué medir y a quién preguntar.', fb: 'La investigación aplicada parte de un problema delimitado, objetivos claros y una muestra representativa.' },
          { t: 'Pregunto a los usuarios que estén hoy en la sala y vemos qué sale.', p: 1, r: 'Es un inicio, pero podría quedar sesgado.', fb: 'Sin objetivo ni muestreo, los datos no son representativos.' },
          { t: 'Ya sabemos que es culpa de los médicos; redacto las conclusiones.', p: 0, r: '¿Y con qué evidencia?', fb: 'Concluir sin datos invierte el método científico.' } ] },
      { dice: '¿Qué instrumento usarás para recoger la información?', opciones: [
          { t: 'Un cuestionario breve validado con prueba piloto, aplicado a la salida de la consulta, anónimo y con consentimiento informado.', p: 2, r: 'Excelente, cuidas la calidad del dato y a los usuarios.', fb: 'El pilotaje mejora la validez; el anonimato y el consentimiento protegen a los participantes.' },
          { t: 'Un formulario en redes sociales para quien quiera llenarlo.', p: 1, r: 'Muchos usuarios rurales no tienen internet.', fb: 'La autoselección excluye a parte de la población.' },
          { t: 'Pido nombre y número de cédula para saber quién se queja.', p: 0, r: 'Así nadie dirá la verdad.', fb: 'Identificar a los encuestados sin necesidad vulnera la confidencialidad y sesga respuestas.' } ] },
      { dice: 'Tenemos 150 encuestas. ¿Cómo presentamos los resultados?', opciones: [
          { t: 'Tabulo los datos, calculo frecuencias y porcentajes, hago gráficos y redacto un informe con introducción, método, resultados, conclusiones y referencias en formato APA.', p: 2, r: 'Así podremos decidir con datos.', fb: 'El análisis descriptivo y una estructura normalizada facilitan la toma de decisiones.' },
          { t: 'Un resumen con las opiniones más llamativas.', p: 1, r: 'Útil, pero faltan cifras.', fb: 'Los testimonios complementan, pero no reemplazan el análisis.' },
          { t: 'Entrego las encuestas en una caja para que la directora las lea.', p: 0, r: 'No tengo tiempo de leer 150 hojas.', fb: 'Los datos sin procesar no son un informe.' } ] }
    ],
    vivo: {
      lugar: 'Dirección del Centro de Salud «Río Puyo», Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Redactar el problema y el objetivo del estudio', p: 2, fb: 'Delimitar el problema orienta toda la investigación.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📊', t: 'Revisar las atenciones por servicio para definir la muestra', p: 2, fb: 'Los registros de producción permiten calcular una muestra representativa.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☕', t: 'Preguntar solo a los compañeros de trabajo', p: 1, fb: 'No representan a los usuarios.', efecto: { confianza: 0, tension: 3 } },
            { icono: '✍️', t: 'Escribir las conclusiones antes de investigar', p: 0, fb: 'Es un sesgo de confirmación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Problema y objetivo', claves: ['problema', 'objetivo', 'pregunta de investigacion', 'delimit', 'medir', 'proposito'] },
            { n: 'Población y muestra', claves: ['poblacion', 'muestra', 'usuarios', 'muestreo', 'representativ', 'por servicio'] },
            { n: 'Investigación aplicada con datos', claves: ['aplicada', 'estudio', 'evidencia', 'datos', 'decision', 'diagnostico'] }
          ],
          evitar: [ { claves: ['ya sabemos', 'es culpa de los medicos'], fb: 'Asumir la respuesta impide un estudio objetivo.' } ],
          modelo: 'Como es investigación aplicada para tomar decisiones, primero planteo el problema y un objetivo medible: conocer el nivel de satisfacción por servicio. Luego defino la población de usuarios y una muestra representativa por servicio y horario.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Probar el cuestionario con diez usuarios (piloto)', p: 2, fb: 'El pilotaje corrige preguntas confusas.', efecto: { confianza: 9, tension: -5 } },
            { icono: '🤝', t: 'Leer el consentimiento informado a cada usuario', p: 2, fb: 'La participación debe ser voluntaria e informada.', efecto: { confianza: 7, tension: -3 } },
            { icono: '📱', t: 'Publicar un formulario abierto en redes', p: 1, fb: 'Excluye a quienes no tienen conectividad.', efecto: { confianza: 1, tension: 2 } },
            { icono: '🪪', t: 'Pedir cédula y teléfono a cada encuestado', p: 0, fb: 'Datos innecesarios vulneran la confidencialidad.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Técnica e instrumento de recolección', claves: ['cuestionario', 'encuesta', 'instrumento', 'entrevista', 'observacion', 'preguntas'] },
            { n: 'Validez del instrumento', claves: ['piloto', 'validar', 'validado', 'prueba', 'confiab', 'claridad'] },
            { n: 'Ética: anonimato y consentimiento', claves: ['consentimiento', 'anonim', 'confidencial', 'voluntari', 'sin nombres', 'proteccion de datos'] }
          ],
          evitar: [ { claves: ['pido la cedula', 'pongo los nombres'], fb: 'Los datos de los participantes deben ser anónimos y con consentimiento.' } ],
          modelo: 'Aplicaré un cuestionario breve validado con prueba piloto, a la salida de la consulta. Será anónimo y voluntario, con consentimiento informado de cada usuario.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Tabular las respuestas en una hoja de cálculo', p: 2, fb: 'Ordenar los datos permite el análisis descriptivo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📈', t: 'Elaborar gráficos de barras por servicio', p: 2, fb: 'Los gráficos facilitan la lectura de resultados.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📦', t: 'Entregar las encuestas en papel sin procesar', p: 0, fb: 'Los datos brutos no constituyen un informe.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Análisis de datos', claves: ['tabul', 'frecuencia', 'porcentaje', 'promedio', 'grafic', 'analisis'] },
            { n: 'Estructura del informe', claves: ['informe', 'introduccion', 'metodo', 'resultados', 'conclusiones', 'recomendaciones'] },
            { n: 'Normas de presentación', claves: ['apa', 'referencias', 'citas', 'normas', 'bibliografia', 'formato'] }
          ],
          evitar: [ { claves: ['solo las opiniones', 'sin cifras'], fb: 'Las opiniones sueltas no sustentan decisiones.' } ],
          modelo: 'Tabulo los datos, calculo frecuencias y porcentajes y elaboro gráficos. Presento un informe con introducción, método, resultados, conclusiones y recomendaciones, con referencias en formato APA.'
        }
      ]
    }
  },

  /* ===================== ASS-02 Expresión Oral y Escrita ===================== */
  {
    id: 'asig-ASS-02', cod: 'ASS-02',
    titulo: 'Explicar el nuevo horario de atención',
    asignaturas: ['ASS-02'],
    persona: { nombre: 'Don Aurelio Cerda', rol: 'Usuario adulto mayor del centro de salud', avatar: '👴🏽', pitch: 0.9 },
    contexto: 'El centro de salud cambió el horario de entrega de turnos. Don Aurelio no entendió el cartel y llega molesto; luego debes redactar un comunicado y presentarlo en la sala de espera.',
    objetivo: 'Aplicar principios de expresión oral y escrita, redacción clara, presentación oral y normas ortográficas.',
    pasos: [
      { dice: 'Ese cartel dice cosas raras. ¡Yo vine a las seis y me dicen que ya no dan turnos así!', opciones: [
          { t: 'Le saludo con respeto, le explico con palabras sencillas y frases cortas el nuevo horario y compruebo que me entendió.', p: 2, r: 'Ahora sí le entiendo, mijo.', fb: 'La comunicación oral efectiva usa lenguaje claro, tono respetuoso y verificación de la comprensión.' },
          { t: 'Le leo el cartel otra vez, más despacio.', p: 1, r: 'Sigo sin entender esas palabras.', fb: 'Repetir un texto confuso no mejora la comprensión.' },
          { t: 'Le digo que el cartel es claro y que lea bien.', p: 0, r: '¡Qué grosería!', fb: 'Culpar al usuario rompe la comunicación.' } ] },
      { dice: '(La Dirección te pide redactar un comunicado mejor para la cartelera.)', opciones: [
          { t: 'Redacto un comunicado breve con título, qué cambia, desde cuándo, horario, a quién preguntar, con buena ortografía y letra grande.', p: 2, r: '(El comunicado es claro y ordenado.)', fb: 'Un texto administrativo efectivo es breve, estructurado y correcto.' },
          { t: 'Copio la resolución completa del distrito.', p: 1, r: '(Es exacto, pero muy técnico.)', fb: 'El lenguaje técnico dificulta la lectura de los usuarios.' },
          { t: 'Escribo a mano en mayúsculas sin revisar.', p: 0, r: '(Tiene faltas de ortografía.)', fb: 'Los errores restan credibilidad institucional.' } ] },
      { dice: '(Debes explicarlo en voz alta a las personas de la sala de espera.)', opciones: [
          { t: 'Me presento, hablo despacio y con volumen adecuado, explico en tres ideas, invito a preguntas y repito lo clave.', p: 2, r: '(Varias personas asienten y preguntan.)', fb: 'Una presentación oral ordenada y participativa asegura la comprensión.' },
          { t: 'Leo el comunicado rápido sin mirar al público.', p: 1, r: '(Pocos prestan atención.)', fb: 'Sin contacto visual ni pausas se pierde el mensaje.' },
          { t: 'Solo lo pego en la pared.', p: 0, r: '(Nadie se entera.)', fb: 'No todos pueden leer el comunicado.' } ] }
    ],
    vivo: {
      lugar: 'Sala de espera del centro de salud', fondo: 'oficina',
      inicio: { confianza: 35, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '🙏', t: 'Saludarlo por su nombre y ofrecerle asiento', p: 2, fb: 'El trato cordial abre la comunicación.', efecto: { confianza: 10, tension: -8 } },
            { icono: '✋', t: 'Explicarle con una hoja con letra grande', p: 2, fb: 'El apoyo visual refuerza el mensaje oral.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📜', t: 'Volver a leerle el cartel tal cual', p: 1, fb: 'El texto sigue siendo confuso.', efecto: { confianza: -2, tension: 3 } },
            { icono: '😒', t: 'Decirle que lea bien el cartel', p: 0, fb: 'Culpar al usuario genera conflicto.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Saluda con respeto', claves: ['buenos dias', 'buenas tardes', 'don aurelio', 'disculpe', 'con gusto', 'senor'] },
            { n: 'Explica con lenguaje sencillo', claves: ['horario', 'desde', 'turnos', 'a partir', 'las siete', 'por la manana', 'ahora'] },
            { n: 'Verifica la comprensión', claves: ['me entendio', 'tiene alguna duda', 'alguna pregunta', 'quedo claro', 'le repito', 'esta claro'] }
          ],
          evitar: [ { claves: ['lea bien', 'es su problema', 'no entiende nada'], fb: 'El tono culpabilizador rompe la comunicación.' } ],
          modelo: 'Buenos días, don Aurelio, disculpe la confusión. Ahora los turnos se entregan desde las siete de la mañana en la ventanilla de admisión. ¿Me entendió o tiene alguna duda?'
        },
        {
          acciones: [
            { icono: '🖊️', t: 'Redactar un título claro y tres datos clave', p: 2, fb: 'La estructura breve facilita la lectura.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔍', t: 'Revisar ortografía y tildes antes de imprimir', p: 2, fb: 'La corrección ortográfica da credibilidad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📑', t: 'Pegar la resolución técnica completa', p: 0, fb: 'El lenguaje técnico no es comprensible para todos.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Estructura del comunicado', claves: ['titulo', 'comunicado', 'que cambia', 'desde cuando', 'fecha', 'estructura'] },
            { n: 'Brevedad y claridad', claves: ['breve', 'claro', 'sencill', 'corto', 'letra grande', 'frases cortas'] },
            { n: 'Corrección ortográfica', claves: ['ortografi', 'tildes', 'gramatica', 'revis', 'correc', 'puntuacion'] }
          ],
          evitar: [ { claves: ['sin revisar', 'asi nomas'], fb: 'Un comunicado sin revisión transmite descuido.' } ],
          modelo: 'Redacto un comunicado breve y claro: un título, qué cambia, desde qué fecha, el horario y a quién preguntar, con letra grande. Antes de imprimir reviso la ortografía y las tildes.'
        },
        {
          acciones: [
            { icono: '🎤', t: 'Presentarse y pedir atención a la sala', p: 2, fb: 'Presentarse da confianza al público.', efecto: { confianza: 8, tension: -5 } },
            { icono: '❓', t: 'Abrir un momento para preguntas', p: 2, fb: 'Las preguntas confirman la comprensión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🏃', t: 'Leer rápido mirando el papel', p: 0, fb: 'Sin pausas ni contacto visual se pierde el mensaje.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Se presenta y saluda', claves: ['buenos dias', 'mi nombre', 'soy', 'me presento', 'les saluda', 'buenas tardes'] },
            { n: 'Organiza el mensaje en ideas', claves: ['primero', 'segundo', 'tercero', 'tres ideas', 'en resumen', 'lo importante'] },
            { n: 'Invita a preguntas', claves: ['preguntas', 'dudas', 'consultas', 'pregunten', 'con gusto respondo', 'alguien'] }
          ],
          evitar: [ { claves: ['no hay preguntas', 'no tengo tiempo'], fb: 'Cerrar el diálogo impide verificar la comprensión.' } ],
          modelo: 'Buenos días, soy el asistente de admisión. Les explico tres ideas: primero, los turnos se entregan desde las siete; segundo, la atención prioritaria se mantiene; tercero, pueden preguntar en ventanilla. ¿Tienen dudas o preguntas?'
        }
      ]
    }
  },

  /* ===================== ASS-03 Matemática ===================== */
  {
    id: 'asig-ASS-03', cod: 'ASS-03',
    titulo: 'Cálculos para el informe de citas',
    asignaturas: ['ASS-03'],
    persona: { nombre: 'Ing. Byron Tapuy', rol: 'Responsable de Estadística del centro de salud', avatar: '👨🏽‍💻', pitch: 0.95 },
    contexto: 'Estadística necesita cálculos rápidos para el informe mensual: porcentaje de inasistencia, una proporción de vacunas y el costo de una brigada con una función lineal.',
    objetivo: 'Aplicar operaciones algebraicas, proporciones, funciones lineales y aplicaciones matemáticas básicas a datos de gestión en salud.',
    pasos: [
      { dice: 'Este mes se agendaron 240 citas y 36 personas no asistieron. ¿Cuál es el porcentaje de inasistencia?', opciones: [
          { t: 'Divido 36 para 240 y multiplico por 100: el 15 % de inasistencia.', p: 2, r: 'Exacto, 15 %.', fb: 'Porcentaje = parte ÷ total × 100 = 36 ÷ 240 × 100 = 15 %.' },
          { t: 'Resto 240 menos 36: son 204.', p: 1, r: 'Eso son los que asistieron, no el porcentaje.', fb: 'La diferencia es un número absoluto, no un porcentaje.' },
          { t: 'Divido 240 para 36: 6,6 %.', p: 0, r: 'Eso no tiene sentido.', fb: 'Se invirtió la división.' } ] },
      { dice: 'Si 4 frascos de vacuna alcanzan para 40 niños, ¿cuántos frascos necesitamos para 130 niños?', opciones: [
          { t: 'Con regla de tres: 4 × 130 ÷ 40 = 13 frascos.', p: 2, r: 'Correcto, 13 frascos.', fb: 'La proporcionalidad directa permite planificar insumos.' },
          { t: 'Unos 10 frascos, más o menos.', p: 1, r: 'Necesito el número exacto.', fb: 'La estimación sin cálculo puede dejar niños sin vacuna.' },
          { t: '130 ÷ 4 = 32 frascos.', p: 0, r: 'Demasiados.', fb: 'No se aplicó la proporción correctamente.' } ] },
      { dice: 'Una brigada cuesta 80 dólares fijos más 5 dólares por paciente. ¿Cuánto cuesta atender a 60 pacientes?', opciones: [
          { t: 'Uso la función C = 80 + 5n; con n = 60: 80 + 300 = 380 dólares.', p: 2, r: 'Perfecto, 380 dólares.', fb: 'Una función lineal modela costo fijo más costo variable.' },
          { t: '5 × 60 = 300 dólares.', p: 1, r: '¿Y el costo fijo?', fb: 'Faltó sumar el costo fijo.' },
          { t: '80 × 60 = 4 800 dólares.', p: 0, r: 'Imposible.', fb: 'Se multiplicó el costo fijo por los pacientes.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de Estadística del centro de salud', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🧮', t: 'Plantear la fórmula parte entre total por cien', p: 2, fb: 'Plantear la fórmula evita errores.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📋', t: 'Verificar en el registro los 36 ausentes', p: 2, fb: 'Comprobar los datos de origen asegura el resultado.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🎲', t: 'Poner un porcentaje aproximado', p: 0, fb: 'Un dato inventado distorsiona el informe.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Plantea la división parte entre total', claves: ['36 para 240', '36 entre 240', '36 dividido', 'divido', 'parte', 'total'] },
            { n: 'Multiplica por cien', claves: ['por 100', 'por cien', 'multiplico', 'cien', 'porcentaje'] },
            { n: 'Da el resultado correcto', claves: ['15', 'quince', '0,15', '15 por ciento', 'quince por ciento'] }
          ],
          evitar: [ { claves: ['mas o menos', 'aproximadamente nomas'], fb: 'El informe requiere un valor calculado.' } ],
          modelo: 'Divido 36 para 240, que da 0,15, y multiplico por 100: la inasistencia es del 15 por ciento.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Armar la regla de tres en la pizarra', p: 2, fb: 'La regla de tres resuelve la proporcionalidad directa.', efecto: { confianza: 8, tension: -5 } },
            { icono: '✅', t: 'Comprobar que 13 frascos dan para 130 niños', p: 2, fb: 'Comprobar el resultado da seguridad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🤔', t: 'Pedir frascos al ojo', p: 0, fb: 'Se puede desabastecer la campaña.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Usa la regla de tres o proporción', claves: ['regla de tres', 'proporcion', '4 por 130', '4 x 130', 'multiplico', 'directa'] },
            { n: 'Divide para la relación conocida', claves: ['para 40', 'entre 40', 'divido', '520', 'dividido'] },
            { n: 'Da el resultado correcto', claves: ['13', 'trece', '13 frascos', 'trece frascos', 'necesitamos 13'] }
          ],
          evitar: [ { claves: ['al ojo', 'mas o menos'], fb: 'La planificación de insumos requiere cálculo.' } ],
          modelo: 'Con regla de tres: multiplico 4 por 130, que da 520, y divido para 40. Necesitamos 13 frascos de vacuna.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Escribir la función C = 80 + 5n', p: 2, fb: 'Modelar con una función lineal ordena el cálculo.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📉', t: 'Graficar la recta del costo de la brigada', p: 2, fb: 'La gráfica muestra cómo crece el costo con los pacientes.', efecto: { confianza: 6, tension: -3 } },
            { icono: '❌', t: 'Olvidar el costo fijo de la brigada', p: 0, fb: 'Se subestima el presupuesto.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Plantea la función lineal', claves: ['funcion', 'c igual', '80 mas 5', '80 + 5', 'lineal', 'ecuacion'] },
            { n: 'Distingue costo fijo y variable', claves: ['fijo', 'variable', 'por paciente', 'costo fijo', 'cinco dolares'] },
            { n: 'Calcula el resultado', claves: ['380', 'trescientos ochenta', '380 dolares', 'total de 380', 'da 380'] }
          ],
          evitar: [ { claves: ['4800', '4 800'], fb: 'Multiplicar el costo fijo por los pacientes es un error.' } ],
          modelo: 'Uso la función lineal C igual a 80 más 5 por n: el costo fijo es 80 y el variable 5 dólares por paciente. Con 60 pacientes, 80 más 300 da 380 dólares.'
        }
      ]
    }
  },

  /* ===================== ASS-04 Tecnologías de la Información y la Comunicación ===================== */
  {
    id: 'asig-ASS-04', cod: 'ASS-04',
    titulo: 'Seguridad de la información en admisión',
    asignaturas: ['ASS-04'],
    persona: { nombre: 'Lcda. Johana Shiguango', rol: 'Compañera de admisión', avatar: '👩🏽‍💼', pitch: 1.15 },
    contexto: 'Una compañera de admisión deja su contraseña pegada en el monitor, quiere enviar la agenda con datos de pacientes por WhatsApp y recibe un correo sospechoso.',
    objetivo: 'Aplicar herramientas informáticas, gestión de información digital, colaboración y seguridad de la información en un servicio de salud.',
    pasos: [
      { dice: 'Pegué mi clave en el monitor para no olvidarla. ¿Qué tiene de malo?', opciones: [
          { t: 'Le explico que cualquiera podría entrar al sistema con su usuario; le sugiero una contraseña segura, personal y cerrar sesión al levantarse.', p: 2, r: 'Tienes razón, la cambio ya.', fb: 'Las credenciales personales y el cierre de sesión protegen los datos de los pacientes.' },
          { t: 'Le digo que la esconda debajo del teclado.', p: 1, r: 'Ok…', fb: 'Sigue siendo una práctica insegura.' },
          { t: 'Le pido que me la preste también para no usar la mía.', p: 0, r: 'Claro, toma.', fb: 'Compartir credenciales elimina la trazabilidad.' } ] },
      { dice: 'Voy a mandar por WhatsApp la agenda de mañana con nombres y diagnósticos al doctor.', opciones: [
          { t: 'Le propongo compartirla por el sistema institucional o la carpeta compartida con acceso restringido, sin diagnósticos innecesarios.', p: 2, r: 'No lo había pensado.', fb: 'Los datos de salud son sensibles: se comparten por canales institucionales y con el mínimo necesario.' },
          { t: 'Que la mande, pero solo con nombres.', p: 1, r: 'Ya.', fb: 'Reduce el riesgo, pero el canal sigue sin ser institucional.' },
          { t: 'Que la publique en el grupo del personal para que todos la vean.', p: 0, r: 'Listo.', fb: 'Expone datos sensibles a personas no autorizadas.' } ] },
      { dice: 'Me llegó un correo del "banco" pidiendo mi clave del sistema. ¿Lo respondo?', opciones: [
          { t: 'No abrir enlaces ni responder; reportarlo al área de TIC y borrar el correo: es un intento de suplantación (phishing).', p: 2, r: 'Gracias, ya lo reporto.', fb: 'Reconocer y reportar el phishing protege la red institucional.' },
          { t: 'Solo abrir el enlace para ver qué es.', p: 1, r: 'Hmm…', fb: 'Abrir el enlace ya puede instalar software malicioso.' },
          { t: 'Responder con la clave porque parece oficial.', p: 0, r: 'Ya lo envié.', fb: 'Entregar credenciales compromete el sistema.' } ] }
    ],
    vivo: {
      lugar: 'Ventanilla de admisión con computadoras del sistema de citas', fondo: 'oficina',
      inicio: { confianza: 55, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🔐', t: 'Ayudarle a crear una contraseña segura', p: 2, fb: 'Las contraseñas robustas reducen accesos indebidos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔒', t: 'Mostrarle cómo bloquear la pantalla al levantarse', p: 2, fb: 'Bloquear la sesión protege la información.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🗒️', t: 'Copiar su clave en tu libreta', p: 0, fb: 'Multiplica el riesgo de acceso indebido.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Contraseña segura y personal', claves: ['contrasena', 'clave segura', 'personal', 'no compartir', 'mayusculas', 'cambiar la clave'] },
            { n: 'Cerrar o bloquear la sesión', claves: ['cerrar sesion', 'bloquear', 'bloqueo', 'salir del sistema', 'pantalla'] },
            { n: 'Protege los datos de los pacientes', claves: ['datos', 'pacientes', 'proteger', 'seguridad', 'acceso', 'confidencial'] }
          ],
          evitar: [ { claves: ['prestame tu clave', 'usa mi usuario'], fb: 'Compartir credenciales elimina la trazabilidad.' } ],
          modelo: 'Johana, cualquiera podría entrar con tu usuario y ver los datos de los pacientes. Cambia la contraseña por una clave segura y personal, y bloquea la pantalla o cierra sesión al levantarte.'
        },
        {
          acciones: [
            { icono: '📁', t: 'Subir la agenda a la carpeta institucional restringida', p: 2, fb: 'El canal institucional controla quién accede.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✂️', t: 'Quitar los diagnósticos de la lista de citas', p: 2, fb: 'Compartir solo el mínimo necesario protege la intimidad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '💬', t: 'Reenviar la agenda al grupo de WhatsApp del personal', p: 0, fb: 'Expone datos sensibles.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Usa canales institucionales', claves: ['institucional', 'sistema', 'carpeta compartida', 'correo institucional', 'plataforma', 'nube institucional'] },
            { n: 'Comparte el mínimo necesario', claves: ['sin diagnosticos', 'minimo necesario', 'solo lo necesario', 'quitar', 'datos sensibles'] },
            { n: 'Restringe el acceso', claves: ['restring', 'permisos', 'solo el doctor', 'autorizad', 'acceso'] }
          ],
          evitar: [ { claves: ['por whatsapp', 'al grupo'], fb: 'Los datos de salud no se envían por canales personales.' } ],
          modelo: 'Mejor compartamos la agenda por la carpeta institucional con acceso restringido solo para el doctor, y sin diagnósticos: solo lo necesario para las citas.'
        },
        {
          acciones: [
            { icono: '🚩', t: 'Reportar el correo sospechoso al área de TIC', p: 2, fb: 'El reporte permite bloquear el ataque para todos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔎', t: 'Revisar la dirección real del remitente', p: 2, fb: 'Los remitentes falsos delatan el phishing.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🖱️', t: 'Hacer clic en el enlace para verificar', p: 0, fb: 'El clic puede infectar el equipo.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Reconoce el phishing', claves: ['phishing', 'suplantacion', 'fraude', 'falso', 'sospechoso', 'estafa'] },
            { n: 'No abre enlaces ni entrega datos', claves: ['no abrir', 'enlace', 'no responder', 'clave', 'borrar', 'eliminar'] },
            { n: 'Reporta a TIC', claves: ['tic', 'reportar', 'reporte', 'informatica', 'soporte', 'avisar'] }
          ],
          evitar: [ { claves: ['respondo con la clave', 'le mando mi clave'], fb: 'Entregar credenciales compromete el sistema.' } ],
          modelo: 'Ese correo es phishing, una suplantación. No abras el enlace ni respondas con tu clave; bórralo y vamos a reportarlo al área de TIC.'
        }
      ]
    }
  },

  /* ===================== ASS-05 Fundamentos de la Administración ===================== */
  {
    id: 'asig-ASS-05', cod: 'ASS-05',
    titulo: 'Organizar una jornada de desparasitación escolar',
    asignaturas: ['ASS-05'],
    persona: { nombre: 'Dr. Hernán Malaver', rol: 'Nuevo director del centro de salud', avatar: '👨🏻‍⚕️', pitch: 0.9 },
    contexto: 'El nuevo director quiere organizar en dos semanas una jornada de desparasitación en tres escuelas de la parroquia y te pide aplicar el proceso administrativo.',
    objetivo: 'Aplicar las funciones de la administración (planificar, organizar, dirigir y controlar) en un establecimiento de salud.',
    pasos: [
      { dice: '¿Qué hacemos primero para que la jornada salga bien?', opciones: [
          { t: 'Planificar: objetivo, meta de niños, cronograma, insumos y presupuesto, coordinado con las escuelas.', p: 2, r: 'Bien, con un plan claro.', fb: 'La planificación define objetivos, metas y recursos antes de actuar.' },
          { t: 'Ir a las escuelas y ver qué pasa.', p: 1, r: 'Muy improvisado.', fb: 'Sin plan se desperdician recursos.' },
          { t: 'Comprar medicamentos de una vez.', p: 0, r: '¿Cuántos y para quién?', fb: 'Comprar sin planificar genera pérdidas.' } ] },
      { dice: '¿Cómo distribuimos el trabajo?', opciones: [
          { t: 'Organizar: asignar responsables por escuela, funciones claras (registro, dispensación, educación) y un organigrama simple de la jornada.', p: 2, r: 'Así cada uno sabe qué hacer.', fb: 'Organizar es asignar tareas, responsables y coordinación.' },
          { t: 'Que vaya quien pueda.', p: 1, r: '…', fb: 'Sin responsables se duplican o se omiten tareas.' },
          { t: 'Lo hago todo yo solo.', p: 0, r: 'Imposible.', fb: 'Concentrar tareas sobrecarga y pone en riesgo el resultado.' } ] },
      { dice: 'El día de la jornada, ¿cómo te aseguras de que todo funcione?', opciones: [
          { t: 'Dirigir motivando al equipo y controlar con indicadores: niños desparasitados frente a la meta, insumos usados y novedades.', p: 2, r: 'Así medimos el resultado.', fb: 'Dirección y control cierran el proceso administrativo.' },
          { t: 'Confiar en que todos hagan su parte.', p: 1, r: '…', fb: 'Sin control no se detectan desvíos.' },
          { t: 'No llevar registros para ir más rápido.', p: 0, r: '¿Y cómo reportamos?', fb: 'Sin registros no hay control ni evidencia.' } ] }
    ],
    vivo: {
      lugar: 'Dirección del centro de salud con el calendario escolar', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Definir el objetivo y la meta de niños', p: 2, fb: 'Objetivo y meta orientan la planificación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗓️', t: 'Elaborar el cronograma con las escuelas', p: 2, fb: 'La coordinación evita choques con clases y exámenes.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🛒', t: 'Comprar medicamentos sin calcular', p: 0, fb: 'Comprar sin planificar genera pérdidas.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Planifica', claves: ['planific', 'plan', 'objetivo', 'meta', 'cronograma', 'actividades'] },
            { n: 'Prevé recursos', claves: ['insumos', 'recursos', 'presupuesto', 'medicamentos', 'personal', 'materiales'] },
            { n: 'Coordina con las escuelas', claves: ['escuelas', 'coordin', 'directores', 'docentes', 'padres', 'autorizacion'] }
          ],
          evitar: [ { claves: ['improvisamos', 'vemos que pasa'], fb: 'La improvisación desperdicia recursos.' } ],
          modelo: 'Primero planificamos: definimos el objetivo, la meta de niños y el cronograma, calculamos insumos, personal y presupuesto, y coordinamos con los directores de las escuelas.'
        },
        {
          acciones: [
            { icono: '👥', t: 'Asignar responsables por escuela', p: 2, fb: 'Cada responsable coordina su punto.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🧩', t: 'Dibujar un organigrama simple de la jornada', p: 2, fb: 'El organigrama aclara líneas de coordinación.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🙋', t: 'Dejar que cada quien escoja qué hacer', p: 0, fb: 'Sin asignación hay vacíos y duplicaciones.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Organiza el trabajo', claves: ['organiz', 'distribu', 'asignar', 'asigno', 'tareas', 'division del trabajo'] },
            { n: 'Define responsables y funciones', claves: ['responsable', 'funciones', 'registro', 'dispensacion', 'educacion', 'roles'] },
            { n: 'Establece la coordinación', claves: ['organigrama', 'coordinador', 'comunicacion', 'reporta', 'estructura', 'equipo'] }
          ],
          evitar: [ { claves: ['lo hago todo yo', 'que vaya quien pueda'], fb: 'Sin organización se pone en riesgo la jornada.' } ],
          modelo: 'Organizamos el trabajo: asigno un responsable por escuela y funciones claras de registro, dispensación y educación, con un organigrama simple para que el equipo sepa a quién reporta.'
        },
        {
          acciones: [
            { icono: '📣', t: 'Reunir al equipo y motivarlo antes de salir', p: 2, fb: 'La dirección motiva y alinea al equipo.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📋', t: 'Llevar la hoja de control de niños atendidos', p: 2, fb: 'El registro permite comparar con la meta.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🚫', t: 'Omitir los registros para ir más rápido', p: 0, fb: 'Sin registros no hay control ni evidencia.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Dirige y motiva', claves: ['dirig', 'motiv', 'liderazgo', 'reunion', 'equipo', 'animar'] },
            { n: 'Controla con indicadores', claves: ['control', 'indicador', 'meta', 'comparar', 'cumplimiento', 'porcentaje'] },
            { n: 'Registra resultados y novedades', claves: ['registro', 'hoja', 'novedades', 'informe', 'evidencia', 'reporte'] }
          ],
          evitar: [ { claves: ['sin registros', 'no anotamos'], fb: 'Sin registros no hay control.' } ],
          modelo: 'El día de la jornada dirijo y motivo al equipo en una reunión breve, y controlamos con indicadores: niños desparasitados frente a la meta, insumos usados y novedades en la hoja de registro.'
        }
      ]
    }
  },

  /* ===================== ASS-06 Contabilidad Básica ===================== */
  {
    id: 'asig-ASS-06', cod: 'ASS-06',
    titulo: 'Registrar la compra de insumos médicos',
    asignaturas: ['ASS-06'],
    persona: { nombre: 'CPA Silvia Andi', rol: 'Contadora de la unidad financiera', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'Llegó una factura por insumos de curación comprados a crédito al proveedor. La contadora te pide registrar la operación, comprobar la ecuación contable y preparar un informe sencillo.',
    objetivo: 'Aplicar principios de contabilidad, registro y clasificación de operaciones, análisis financiero básico e informes contables.',
    pasos: [
      { dice: 'Compramos 1 200 dólares en gasas y guantes a crédito. ¿Cómo lo registras?', opciones: [
          { t: 'Débito a Inventario de insumos médicos por 1 200 y crédito a Cuentas por pagar al proveedor por 1 200, con la factura como respaldo.', p: 2, r: 'Correcto, partida doble.', fb: 'Aumenta un activo (inventario) y aumenta un pasivo (cuentas por pagar).' },
          { t: 'Débito a Inventario y crédito a Bancos.', p: 1, r: 'Pero aún no hemos pagado.', fb: 'La compra fue a crédito; no salió dinero del banco.' },
          { t: 'Lo anoto en un cuaderno cuando pague.', p: 0, r: 'Así no se registra.', fb: 'El principio de devengo exige registrar al ocurrir la operación.' } ] },
      { dice: '¿Cómo compruebas que el registro está bien?', opciones: [
          { t: 'Verifico que débitos y créditos sumen igual y que se mantenga Activo = Pasivo + Patrimonio.', p: 2, r: 'Exacto, cuadra.', fb: 'La partida doble mantiene la igualdad de la ecuación contable.' },
          { t: 'Reviso solo que el valor coincida con la factura.', p: 1, r: 'Falta comprobar el balance.', fb: 'Es necesario, pero no suficiente.' },
          { t: 'Si no cuadra, ajusto Patrimonio para que cuadre.', p: 0, r: '¡Eso es maquillar!', fb: 'Forzar cuadres oculta errores.' } ] },
      { dice: 'La directora pide saber cuánto debemos a proveedores este mes.', opciones: [
          { t: 'Preparo un informe con el saldo de Cuentas por pagar, el detalle por proveedor y las fechas de vencimiento.', p: 2, r: 'Muy útil para planificar pagos.', fb: 'Los informes contables apoyan la toma de decisiones.' },
          { t: 'Le digo un valor aproximado.', p: 1, r: 'Necesito el dato exacto.', fb: 'Los informes deben basarse en registros.' },
          { t: 'Le digo que eso no es mi trabajo.', p: 0, r: '…', fb: 'Apoyar con informes es parte de la función contable.' } ] }
    ],
    vivo: {
      lugar: 'Unidad financiera del centro de salud', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🧾', t: 'Revisar la factura y la orden de compra', p: 2, fb: 'El documento fuente respalda el registro.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📒', t: 'Elaborar el asiento en el libro diario', p: 2, fb: 'El libro diario registra cronológicamente las operaciones.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🏦', t: 'Acreditar Bancos aunque no se ha pagado', p: 0, fb: 'Registra una salida de dinero inexistente.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Débito al inventario', claves: ['debito', 'debe', 'inventario', 'insumos', 'activo'] },
            { n: 'Crédito a cuentas por pagar', claves: ['credito', 'haber', 'cuentas por pagar', 'proveedor', 'pasivo'] },
            { n: 'Respaldo documental', claves: ['factura', 'respaldo', 'documento', 'comprobante', 'orden de compra', '1200', '1 200'] }
          ],
          evitar: [ { claves: ['credito a bancos', 'cuando pague'], fb: 'La compra a crédito no afecta Bancos hasta el pago.' } ],
          modelo: 'Registro un débito a Inventario de insumos médicos por 1200 dólares, porque aumenta el activo, y un crédito a Cuentas por pagar al proveedor, porque aumenta el pasivo. La factura es el respaldo.'
        },
        {
          acciones: [
            { icono: '➕', t: 'Sumar débitos y créditos del asiento', p: 2, fb: 'La igualdad de sumas verifica la partida doble.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⚖️', t: 'Comprobar la ecuación contable', p: 2, fb: 'Activo = Pasivo + Patrimonio debe mantenerse.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🩹', t: 'Ajustar el patrimonio para forzar el cuadre', p: 0, fb: 'Maquillar cifras oculta errores.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Partida doble', claves: ['partida doble', 'debitos', 'creditos', 'sumen igual', 'iguales', 'cuadre'] },
            { n: 'Ecuación contable', claves: ['activo', 'pasivo', 'patrimonio', 'ecuacion', 'igual a'] },
            { n: 'Verificación', claves: ['verific', 'comprob', 'revis', 'balance de comprobacion', 'control'] }
          ],
          evitar: [ { claves: ['forzar el cuadre', 'ajusto el patrimonio'], fb: 'Forzar cuadres es una mala práctica.' } ],
          modelo: 'Verifico que los débitos y créditos sumen igual por la partida doble, y compruebo que se mantenga la ecuación contable: el activo es igual al pasivo más el patrimonio.'
        },
        {
          acciones: [
            { icono: '📑', t: 'Listar los saldos por proveedor y vencimiento', p: 2, fb: 'El detalle permite planificar pagos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📊', t: 'Preparar un cuadro resumen para la directora', p: 2, fb: 'Un informe claro apoya la decisión.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🤷', t: 'Dar un valor aproximado de memoria', p: 0, fb: 'Sin registros el dato no es confiable.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Informe contable', claves: ['informe', 'reporte', 'cuadro', 'resumen', 'estado'] },
            { n: 'Saldo de cuentas por pagar', claves: ['saldo', 'cuentas por pagar', 'deuda', 'proveedores', 'obligaciones'] },
            { n: 'Detalle y vencimientos', claves: ['detalle', 'por proveedor', 'vencimiento', 'fechas', 'plazo'] }
          ],
          evitar: [ { claves: ['mas o menos', 'no es mi trabajo'], fb: 'El informe debe ser exacto y oportuno.' } ],
          modelo: 'Preparo un informe con el saldo de Cuentas por pagar, el detalle por proveedor y las fechas de vencimiento, para planificar los pagos.'
        }
      ]
    }
  },

  /* ===================== ASS-07 Fundamentos de Economía ===================== */
  {
    id: 'asig-ASS-07', cod: 'ASS-07',
    titulo: 'Demanda, oferta y costos en temporada de lluvias',
    asignaturas: ['ASS-07'],
    persona: { nombre: 'Sra. Elsa Gualinga', rol: 'Presidenta del comité local de salud', avatar: '👩🏽‍🦱', pitch: 1.1 },
    contexto: 'En temporada de lluvias aumentan las enfermedades respiratorias y diarreicas en Pastaza. La presidenta del comité pregunta por qué hay más espera, por qué no alcanzan los insumos y qué decide el centro.',
    objetivo: 'Aplicar principios básicos de economía: oferta y demanda, costos, costo de oportunidad, inflación y política económica en el sector salud.',
    pasos: [
      { dice: '¿Por qué en estas semanas hay tanta espera si hay los mismos doctores?', opciones: [
          { t: 'Le explico que aumentó la demanda de atenciones por la temporada, mientras la oferta (médicos y horas) se mantiene; por eso crece la espera.', p: 2, r: 'Ah, más gente con la misma capacidad.', fb: 'Cuando la demanda supera la oferta disponible, se forman colas.' },
          { t: 'Le digo que siempre es así.', p: 1, r: '…', fb: 'No explica la causa.' },
          { t: 'Le digo que los doctores trabajan lento.', p: 0, r: '¡Eso diré en la comunidad!', fb: 'Culpar sin análisis es incorrecto y daña la confianza.' } ] },
      { dice: 'Este año alcanzó para menos medicinas con el mismo presupuesto. ¿Por qué?', opciones: [
          { t: 'Por la inflación: suben los precios de los insumos y con el mismo dinero se compra menos; por eso hay que planificar y priorizar.', p: 2, r: 'Entiendo, el dinero rinde menos.', fb: 'La inflación reduce el poder adquisitivo del presupuesto.' },
          { t: 'No sé, eso es del ministerio.', p: 1, r: '…', fb: 'Falta explicar con conceptos básicos.' },
          { t: 'Porque alguien se llevó las medicinas.', p: 0, r: '¡Grave acusación!', fb: 'Acusar sin evidencia es irresponsable.' } ] },
      { dice: 'Si el centro abre la atención los sábados, ¿qué deja de hacer?', opciones: [
          { t: 'Hay un costo de oportunidad: las horas y el dinero del sábado se dejan de usar en otra cosa; se decide comparando beneficios y costos.', p: 2, r: 'Hay que pensar qué conviene más.', fb: 'El costo de oportunidad es el valor de la mejor alternativa sacrificada.' },
          { t: 'Que lo decida el director.', p: 1, r: '…', fb: 'Falta el análisis económico básico.' },
          { t: 'Nada, abrir es gratis.', p: 0, r: '¿De verdad?', fb: 'Toda decisión tiene costos.' } ] }
    ],
    vivo: {
      lugar: 'Reunión del comité local de salud en la casa barrial', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📈', t: 'Mostrar el gráfico de atenciones por semana', p: 2, fb: 'Los datos muestran el aumento de la demanda.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🩺', t: 'Explicar las horas médicas disponibles', p: 2, fb: 'La oferta tiene un límite de capacidad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '👉', t: 'Culpar a los médicos por la espera', p: 0, fb: 'Culpar sin análisis daña la confianza.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Aumento de la demanda', claves: ['demanda', 'mas pacientes', 'mas gente', 'aumento', 'temporada', 'lluvias'] },
            { n: 'Oferta limitada', claves: ['oferta', 'capacidad', 'mismos medicos', 'horas', 'limitad', 'consultorios'] },
            { n: 'Relación con la espera', claves: ['espera', 'cola', 'fila', 'tiempo', 'por eso'] }
          ],
          evitar: [ { claves: ['trabajan lento', 'son vagos'], fb: 'Culpar sin evidencia es injusto.' } ],
          modelo: 'En temporada de lluvias aumenta la demanda: llegan más pacientes. La oferta, es decir los médicos y las horas de atención, tiene la misma capacidad; por eso crece la espera.'
        },
        {
          acciones: [
            { icono: '🏷️', t: 'Comparar precios de insumos del año pasado y este', p: 2, fb: 'Comparar precios evidencia la inflación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📋', t: 'Explicar la lista de insumos priorizados', p: 2, fb: 'Priorizar es la respuesta a recursos escasos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🕵️', t: 'Insinuar que alguien robó las medicinas', p: 0, fb: 'Acusar sin evidencia es irresponsable.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Explica la inflación', claves: ['inflacion', 'suben los precios', 'precios', 'mas caro', 'encarec'] },
            { n: 'Poder adquisitivo del presupuesto', claves: ['mismo dinero', 'mismo presupuesto', 'rinde menos', 'se compra menos', 'poder adquisitivo'] },
            { n: 'Prioriza recursos escasos', claves: ['priori', 'planific', 'escas', 'esencial', 'cuadro basico'] }
          ],
          evitar: [ { claves: ['se robaron', 'alguien se llevo'], fb: 'No se acusa sin evidencia.' } ],
          modelo: 'Es por la inflación: suben los precios de los insumos y con el mismo presupuesto se compra menos. Por eso hay que planificar y priorizar los medicamentos esenciales.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Hacer una tabla de beneficios y costos del sábado', p: 2, fb: 'Comparar alternativas sustenta la decisión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗳️', t: 'Recoger la opinión del comité sobre la propuesta', p: 2, fb: 'La participación da legitimidad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🎁', t: 'Prometer que abrir sábados no cuesta nada', p: 0, fb: 'Toda decisión tiene un costo.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Costo de oportunidad', claves: ['costo de oportunidad', 'se deja de', 'alternativa', 'renunciar', 'sacrific'] },
            { n: 'Compara beneficios y costos', claves: ['beneficio', 'costo', 'compar', 'conviene', 'analisis'] },
            { n: 'Decisión con recursos limitados', claves: ['recursos', 'horas', 'dinero', 'presupuesto', 'personal', 'decidir'] }
          ],
          evitar: [ { claves: ['es gratis', 'no cuesta nada'], fb: 'Ignorar costos lleva a malas decisiones.' } ],
          modelo: 'Abrir el sábado tiene un costo de oportunidad: las horas del personal y el dinero se dejan de usar en otra alternativa. Hay que comparar beneficios y costos antes de decidir.'
        }
      ]
    }
  },

  /* ===================== ASS-08 Técnicas de Gestión Documental ===================== */
  {
    id: 'asig-ASS-08', cod: 'ASS-08',
    titulo: 'Ordenar el archivo de historias clínicas',
    asignaturas: ['ASS-08'],
    persona: { nombre: 'Sr. Galo Cerda', rol: 'Responsable del archivo de estadística', avatar: '👨🏽‍🦳', pitch: 0.9 },
    contexto: 'El archivo de historias clínicas está saturado: hay carpetas sin número, historias de pacientes inactivos mezcladas con las activas y cajas que alguien quiere quemar.',
    objetivo: 'Aplicar normas de gestión documental, sistemas de archivo, técnicas de organización y clasificación y la normativa sobre documentos.',
    pasos: [
      { dice: 'No encontramos nada. ¿Cómo organizamos las historias?', opciones: [
          { t: 'Asignar un número único de historia a cada paciente, ordenar por sistema numérico, rotular carpetas y llevar un índice o registro maestro.', p: 2, r: 'Así cualquiera ubica una historia.', fb: 'La numeración única y un índice permiten la recuperación rápida.' },
          { t: 'Ordenarlas alfabéticamente por nombre.', p: 1, r: '¿Y los homónimos?', fb: 'El orden alfabético genera confusión con apellidos repetidos.' },
          { t: 'Dejarlas como están y buscar cuando haga falta.', p: 0, r: 'Seguiremos perdiendo tiempo.', fb: 'El desorden retrasa la atención.' } ] },
      { dice: 'Hay historias de pacientes que no vienen hace años. ¿Qué hacemos con ellas?', opciones: [
          { t: 'Transferirlas del archivo activo al pasivo según los plazos establecidos, con inventario y acta de transferencia.', p: 2, r: 'Liberamos espacio sin perder nada.', fb: 'El ciclo vital del documento define su paso del archivo activo al pasivo.' },
          { t: 'Meterlas en cajas en la bodega sin inventario.', p: 1, r: 'Luego no las encontraremos.', fb: 'Sin inventario la transferencia no es controlada.' },
          { t: 'Llevarlas a reciclar.', p: 0, r: '¡Son documentos legales!', fb: 'La eliminación sin respetar plazos es una falta grave.' } ] },
      { dice: 'Alguien quiere quemar las cajas más viejas. ¿Se puede?', opciones: [
          { t: 'No sin cumplir los plazos de conservación y el procedimiento de baja autorizado, con acta y garantizando la confidencialidad de la destrucción.', p: 2, r: 'Entonces hagamos el trámite.', fb: 'La eliminación documental sigue normativa, autorización y registro.' },
          { t: 'Sí, pero solo las más antiguas.', p: 1, r: '…', fb: 'La antigüedad no basta: se requiere procedimiento.' },
          { t: 'Sí, en el patio para no hacer papeleo.', p: 0, r: '…', fb: 'Destruir sin procedimiento vulnera la normativa.' } ] }
    ],
    vivo: {
      lugar: 'Archivo de historias clínicas del centro de salud', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🔢', t: 'Asignar número único a cada historia', p: 2, fb: 'El número único evita duplicados.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🏷️', t: 'Rotular las carpetas y las estanterías', p: 2, fb: 'El rotulado facilita la ubicación.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌀', t: 'Apilar todo en una mesa grande', p: 0, fb: 'Aumenta el desorden y el riesgo de pérdida.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Numeración única', claves: ['numero unico', 'numeracion', 'numerico', 'codigo', 'numero de historia'] },
            { n: 'Clasificación y rotulado', claves: ['clasific', 'rotul', 'ordenar', 'orden', 'estanteria', 'carpetas'] },
            { n: 'Índice o registro maestro', claves: ['indice', 'registro maestro', 'inventario', 'base de datos', 'control', 'listado'] }
          ],
          evitar: [ { claves: ['dejarlas como estan', 'buscar cuando haga falta'], fb: 'El desorden retrasa la atención.' } ],
          modelo: 'Asignamos un número único a cada historia, las ordenamos con sistema numérico, rotulamos carpetas y estanterías, y llevamos un índice o registro maestro.'
        },
        {
          acciones: [
            { icono: '📆', t: 'Revisar la fecha de la última atención', p: 2, fb: 'La fecha define si la historia está activa.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📝', t: 'Elaborar el inventario y el acta de transferencia', p: 2, fb: 'El acta documenta la transferencia.', efecto: { confianza: 6, tension: -3 } },
            { icono: '♻️', t: 'Mandar las historias inactivas a reciclar', p: 0, fb: 'Son documentos médico-legales.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Archivo activo y pasivo', claves: ['activo', 'pasivo', 'archivo central', 'transfer', 'ciclo vital'] },
            { n: 'Plazos establecidos', claves: ['plazo', 'tiempo de conservacion', 'anos', 'tabla', 'normativa'] },
            { n: 'Inventario y acta', claves: ['inventario', 'acta', 'registro', 'listado', 'documentar'] }
          ],
          evitar: [ { claves: ['reciclar', 'botar'], fb: 'No se eliminan documentos sin procedimiento.' } ],
          modelo: 'Las historias inactivas se transfieren del archivo activo al pasivo según el ciclo vital y los plazos de la normativa, con inventario y acta de transferencia.'
        },
        {
          acciones: [
            { icono: '📜', t: 'Consultar los plazos de conservación vigentes', p: 2, fb: 'La normativa define cuándo se puede eliminar.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✍️', t: 'Solicitar la autorización de baja documental', p: 2, fb: 'La baja requiere autorización formal.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔥', t: 'Quemar las cajas en el patio', p: 0, fb: 'Viola la normativa y la confidencialidad.', efecto: { confianza: -16, tension: 14 } }
          ],
          conceptos: [
            { n: 'Respeta plazos de conservación', claves: ['plazo', 'conservacion', 'normativa', 'tabla', 'tiempo'] },
            { n: 'Procedimiento autorizado de baja', claves: ['autoriza', 'baja', 'procedimiento', 'acta', 'comite'] },
            { n: 'Destrucción confidencial', claves: ['confidencial', 'destruccion segura', 'triturar', 'proteger', 'datos'] }
          ],
          evitar: [ { claves: ['quemar en el patio', 'sin papeleo'], fb: 'La destrucción sin procedimiento es una falta grave.' } ],
          modelo: 'Solo se pueden eliminar cuando cumplen los plazos de conservación de la normativa, con el procedimiento de baja autorizado, un acta y una destrucción confidencial que proteja los datos.'
        }
      ]
    }
  },

  /* ===================== ASS-09 Administración de Sistemas de Salud I ===================== */
  {
    id: 'asig-ASS-09', cod: 'ASS-09',
    titulo: 'Rediseñar el flujo de admisión',
    asignaturas: ['ASS-09'],
    persona: { nombre: 'Lcda. Patricia Aguinda', rol: 'Coordinadora de admisión y estadística', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'Los usuarios no saben a dónde ir después de admisión y los registros diarios llegan incompletos a estadística. La coordinadora te pide proponer cómo organizar el servicio.',
    objetivo: 'Aplicar fundamentos de la organización de un establecimiento de salud de primer nivel: estructura, procesos de admisión, agendamiento y registro estadístico.',
    pasos: [
      { dice: 'Los usuarios se pierden entre ventanillas. ¿Cómo organizamos el recorrido?', opciones: [
          { t: 'Defino el flujo admisión → preparación (signos vitales) → consulta → farmacia, con señalética y un responsable por etapa.', p: 2, r: 'Así nadie se pierde.', fb: 'Un flujo definido y señalizado ordena la atención.' },
          { t: 'Que pregunten al guardia.', p: 1, r: '…', fb: 'Sirve, pero no resuelve la organización.' },
          { t: 'Que cada uno busque solo.', p: 0, r: '…', fb: 'La desorganización aumenta tiempos y molestias.' } ] },
      { dice: '¿Cómo organizamos las citas para evitar la fila de madrugada?', opciones: [
          { t: 'Agenda por bloques horarios, reserva de cupos para atención prioritaria y morbilidad del día, y confirmación de citas.', p: 2, r: 'Eso reduce la fila.', fb: 'El agendamiento por bloques distribuye la demanda.' },
          { t: 'Dar todos los turnos a las 7:00.', p: 1, r: '…', fb: 'Concentra a todos a la misma hora.' },
          { t: 'Atender solo a quien llega primero.', p: 0, r: '…', fb: 'Desconoce la prioridad y la urgencia.' } ] },
      { dice: 'Estadística recibe registros incompletos. ¿Qué propones?', opciones: [
          { t: 'Verificar al cierre del día que cada atención esté registrada con datos completos y consolidar el registro diario para el informe mensual.', p: 2, r: 'Así la producción será confiable.', fb: 'El registro completo y oportuno sustenta la planificación.' },
          { t: 'Completar los datos faltantes al final del mes.', p: 1, r: '…', fb: 'Completar tarde favorece errores.' },
          { t: 'Inventar los datos faltantes.', p: 0, r: '…', fb: 'Falsear registros es una falta grave.' } ] }
    ],
    vivo: {
      lugar: 'Área de admisión y estadística del centro de salud', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Dibujar el flujograma del recorrido del usuario', p: 2, fb: 'El flujograma visualiza el proceso.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪧', t: 'Colocar señalética con colores por servicio', p: 2, fb: 'La señalética orienta sin preguntar.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🤷', t: 'Dejar que cada usuario busque solo', p: 0, fb: 'Aumenta tiempos y molestias.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Define el flujo de atención', claves: ['flujo', 'admision', 'preparacion', 'consulta', 'farmacia', 'recorrido'] },
            { n: 'Señalética y orientación', claves: ['senaletica', 'senal', 'letreros', 'orienta', 'colores', 'flechas'] },
            { n: 'Responsables por etapa', claves: ['responsable', 'etapa', 'funciones', 'cada area', 'personal'] }
          ],
          evitar: [ { claves: ['que busquen solos', 'que pregunten nomas'], fb: 'La organización es responsabilidad del establecimiento.' } ],
          modelo: 'Defino el flujo: admisión, preparación con signos vitales, consulta y farmacia. Coloco señalética con colores y flechas, y un responsable en cada etapa.'
        },
        {
          acciones: [
            { icono: '🕘', t: 'Configurar la agenda por bloques horarios', p: 2, fb: 'Distribuye la llegada de usuarios.', efecto: { confianza: 8, tension: -5 } },
            { icono: '⭐', t: 'Reservar cupos para atención prioritaria', p: 2, fb: 'Garantiza el derecho de los grupos prioritarios.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌄', t: 'Entregar todos los turnos a las seis', p: 0, fb: 'Provoca filas de madrugada.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Agenda por bloques', claves: ['bloques', 'horario', 'agenda', 'escalonad', 'citas'] },
            { n: 'Cupos prioritarios y del día', claves: ['prioritari', 'cupos', 'morbilidad', 'del dia', 'reserva'] },
            { n: 'Confirmación de citas', claves: ['confirm', 'recordatorio', 'llamada', 'mensaje', 'inasistencia'] }
          ],
          evitar: [ { claves: ['todos a las seis', 'el que llega primero'], fb: 'Concentrar la demanda genera filas.' } ],
          modelo: 'Organizo la agenda por bloques horarios, reservo cupos para atención prioritaria y morbilidad del día, y confirmo las citas con un recordatorio.'
        },
        {
          acciones: [
            { icono: '✔️', t: 'Revisar al cierre que cada atención esté registrada', p: 2, fb: 'El control diario evita vacíos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📊', t: 'Consolidar el registro diario por servicio', p: 2, fb: 'La consolidación alimenta el informe mensual.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🎭', t: 'Inventar los datos que faltan', p: 0, fb: 'Falsear datos distorsiona la planificación.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Registro completo', claves: ['registr', 'completo', 'datos', 'cada atencion', 'formulario'] },
            { n: 'Control diario', claves: ['cierre', 'diario', 'cada dia', 'verific', 'revis'] },
            { n: 'Consolidación estadística', claves: ['consolid', 'estadistic', 'informe mensual', 'produccion', 'totales'] }
          ],
          evitar: [ { claves: ['inventar', 'copiar del mes pasado'], fb: 'Los datos deben ser veraces.' } ],
          modelo: 'Al cierre de cada día verifico que todas las atenciones estén registradas con datos completos y consolido el registro diario para la estadística de producción del informe mensual.'
        }
      ]
    }
  },

  /* ===================== ASS-10 Fundamentos de Marketing en Sistemas de Salud ===================== */
  {
    id: 'asig-ASS-10', cod: 'ASS-10',
    titulo: 'Promocionar la salud bucal en adolescentes',
    asignaturas: ['ASS-10'],
    persona: { nombre: 'Od. Carolina Hidalgo', rol: 'Odontóloga del centro de salud', avatar: '👩🏻‍⚕️', pitch: 1.1 },
    contexto: 'El servicio de odontología tiene cupos libres y pocos adolescentes acuden. La odontóloga quiere una estrategia de marketing en salud para los colegios de Puyo.',
    objetivo: 'Aplicar conceptos de marketing en servicios de salud: público objetivo, mensaje, canales, comunicación y evaluación.',
    pasos: [
      { dice: '¿Cómo logramos que los adolescentes vengan?', opciones: [
          { t: 'Primero conocer al público objetivo: qué piensan, qué redes usan y qué les impide venir (horarios, vergüenza, desconocimiento).', p: 2, r: 'Conozcamos a nuestro público.', fb: 'El marketing en salud parte de conocer las necesidades y barreras del público.' },
          { t: 'Pegar un afiche en la puerta del centro.', p: 1, r: 'Pocos lo verán.', fb: 'Un solo canal pasivo tiene poco alcance.' },
          { t: 'Regalar caramelos a quien venga.', p: 0, r: '¡En odontología!', fb: 'El incentivo contradice el mensaje de salud.' } ] },
      { dice: '¿Qué mensaje y canales usaríamos?', opciones: [
          { t: 'Un mensaje positivo y breve (sonrisa sana, atención gratuita), en redes que usan, charlas en colegios y radio local, en castellano y kichwa.', p: 2, r: 'Me gusta, cercano a ellos.', fb: 'Mensaje claro y canales adecuados al público aumentan el alcance.' },
          { t: 'Un texto largo con términos técnicos.', p: 1, r: 'No lo leerán.', fb: 'El lenguaje técnico aleja al público.' },
          { t: 'Mensajes de miedo con fotos impactantes.', p: 0, r: 'Podría ahuyentarlos.', fb: 'El miedo excesivo genera rechazo.' } ] },
      { dice: '¿Cómo sabremos si la campaña funcionó?', opciones: [
          { t: 'Medir atenciones de adolescentes antes y después, cupos ocupados y satisfacción, y ajustar la campaña.', p: 2, r: 'Con datos, perfecto.', fb: 'Los indicadores evalúan el impacto de la campaña.' },
          { t: 'Contar los "me gusta".', p: 1, r: 'Es un dato parcial.', fb: 'Importa el uso real del servicio.' },
          { t: 'No hace falta medir.', p: 0, r: '…', fb: 'Sin medición no se mejora.' } ] }
    ],
    vivo: {
      lugar: 'Consultorio de odontología y sala de reuniones', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📋', t: 'Aplicar una encuesta corta en un colegio', p: 2, fb: 'Conocer al público orienta la estrategia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧑‍🤝‍🧑', t: 'Conversar con un grupo de estudiantes', p: 2, fb: 'El grupo focal revela barreras reales.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🍬', t: 'Comprar caramelos para regalar', p: 0, fb: 'Contradice el mensaje de salud bucal.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Público objetivo', claves: ['publico objetivo', 'adolescentes', 'jovenes', 'estudiantes', 'segment'] },
            { n: 'Necesidades y barreras', claves: ['barreras', 'necesidades', 'que les impide', 'horarios', 'verguenza', 'desconoc'] },
            { n: 'Investigación del público', claves: ['encuesta', 'conocer', 'preguntar', 'grupo focal', 'diagnostico'] }
          ],
          evitar: [ { claves: ['caramelos', 'golosinas'], fb: 'El incentivo debe ser coherente con la salud.' } ],
          modelo: 'Primero debemos conocer a nuestro público objetivo, los adolescentes: con una encuesta y un grupo focal sabremos qué redes usan y qué barreras les impiden venir, como horarios o vergüenza.'
        },
        {
          acciones: [
            { icono: '😁', t: 'Diseñar un mensaje positivo y breve', p: 2, fb: 'Un mensaje positivo motiva.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📻', t: 'Agendar una cuña en la radio local en kichwa', p: 2, fb: 'La radio llega a zonas rurales.', efecto: { confianza: 6, tension: -3 } },
            { icono: '😱', t: 'Usar fotos de bocas enfermas para asustar', p: 0, fb: 'El miedo excesivo genera rechazo.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Mensaje claro y positivo', claves: ['mensaje', 'positivo', 'sonrisa', 'breve', 'gratuit'] },
            { n: 'Canales adecuados', claves: ['redes', 'radio', 'charlas', 'colegios', 'tiktok', 'canales'] },
            { n: 'Enfoque intercultural', claves: ['kichwa', 'castellano', 'intercultural', 'idioma', 'shuar'] }
          ],
          evitar: [ { claves: ['dar miedo', 'asustar'], fb: 'El miedo aleja al público.' } ],
          modelo: 'Usaremos un mensaje positivo y breve: una sonrisa sana con atención gratuita. Los canales serán las redes que usan, charlas en los colegios y radio local en castellano y kichwa.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Comparar atenciones de adolescentes antes y después', p: 2, fb: 'Mide el impacto real.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⭐', t: 'Aplicar una encuesta de satisfacción al salir', p: 2, fb: 'La satisfacción complementa los datos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '❤️', t: 'Medir solo los "me gusta"', p: 0, fb: 'Es un dato parcial.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Indicadores de uso del servicio', claves: ['atenciones', 'antes y despues', 'cupos', 'indicador', 'cuantos'] },
            { n: 'Satisfacción', claves: ['satisfaccion', 'encuesta', 'opinion', 'percepcion', 'satisfechos'] },
            { n: 'Ajuste de la campaña', claves: ['ajust', 'mejorar', 'corregir', 'evaluar', 'cambiar'] }
          ],
          evitar: [ { claves: ['no hace falta medir', 'solo los me gusta'], fb: 'Sin indicadores no se evalúa.' } ],
          modelo: 'Mediremos las atenciones de adolescentes antes y después, los cupos ocupados y la satisfacción con una encuesta, y ajustaremos la campaña según los resultados.'
        }
      ]
    }
  },

  /* ===================== ASS-11 Presupuesto en Sistemas de Salud ===================== */
  {
    id: 'asig-ASS-11', cod: 'ASS-11',
    titulo: 'Formular y evaluar el presupuesto del centro',
    asignaturas: ['ASS-11'],
    persona: { nombre: 'Econ. Ramiro Yumbo', rol: 'Analista financiero del distrito de salud', avatar: '👨🏽‍💼', pitch: 0.95 },
    contexto: 'El distrito solicita la proforma presupuestaria del próximo año del centro de salud y, a mitad de año, revisa la ejecución del presupuesto vigente.',
    objetivo: 'Aplicar la elaboración, el control de gastos e ingresos y la evaluación del presupuesto en un establecimiento de salud.',
    pasos: [
      { dice: '¿Cómo vas a armar la proforma del próximo año?', opciones: [
          { t: 'Parto de la planificación (POA): metas de atención, necesidades de medicamentos, insumos y mantenimiento, con costos y partidas presupuestarias.', p: 2, r: 'Bien, el presupuesto sigue al plan.', fb: 'El presupuesto se formula a partir de la planificación y sus metas.' },
          { t: 'Copio el presupuesto de este año y le subo un 10 %.', p: 1, r: '¿Y si cambiaron las necesidades?', fb: 'El incremento histórico no refleja necesidades reales.' },
          { t: 'Pido el doble para que sobre.', p: 0, r: 'Eso no se aprobará.', fb: 'Sobredimensionar el presupuesto no es técnico.' } ] },
      { dice: 'A junio llevamos solo 25 % de ejecución en medicinas. ¿Qué haces?', opciones: [
          { t: 'Analizo las causas (procesos de compra retrasados, certificaciones), comparo con lo programado y propongo acciones correctivas con fechas.', p: 2, r: 'Eso es control presupuestario.', fb: 'El seguimiento compara lo ejecutado con lo programado y corrige desvíos.' },
          { t: 'Espero a diciembre para gastar todo.', p: 1, r: 'Muy arriesgado.', fb: 'Postergar la ejecución pone en riesgo el abastecimiento.' },
          { t: 'Compro cualquier cosa para subir la ejecución.', p: 0, r: '¡Eso es malgastar!', fb: 'Gastar sin necesidad es mala gestión.' } ] },
      { dice: 'Necesitamos más dinero para insumos y sobra en mantenimiento. ¿Se puede mover?', opciones: [
          { t: 'Se puede solicitar una reforma o modificación presupuestaria justificada, según la normativa y con autorización.', p: 2, r: 'Correcto, hay un procedimiento.', fb: 'Las reformas presupuestarias siguen un procedimiento formal.' },
          { t: 'Pido al proveedor que espere el próximo año.', p: 1, r: '…', fb: 'Puede afectar el abastecimiento.' },
          { t: 'Lo pago de mantenimiento sin decir nada.', p: 0, r: '¡No!', fb: 'Usar una partida para otro fin sin reforma es irregular.' } ] }
    ],
    vivo: {
      lugar: 'Videoconferencia con el distrito de salud', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗂️', t: 'Abrir el POA con las metas de atención', p: 2, fb: 'El plan es la base del presupuesto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💊', t: 'Calcular necesidades de medicamentos e insumos', p: 2, fb: 'Las necesidades reales sustentan la proforma.', efecto: { confianza: 7, tension: -4 } },
            { icono: '✖️', t: 'Duplicar todas las partidas por si acaso', p: 0, fb: 'Sobredimensionar no es técnico.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Parte de la planificación', claves: ['planific', 'poa', 'plan operativo', 'metas', 'objetivos'] },
            { n: 'Estima necesidades y costos', claves: ['necesidades', 'costos', 'medicamentos', 'insumos', 'mantenimiento', 'calcular'] },
            { n: 'Asigna partidas presupuestarias', claves: ['partida', 'presupuestari', 'proforma', 'clasificador', 'gasto corriente'] }
          ],
          evitar: [ { claves: ['el doble', 'para que sobre'], fb: 'El presupuesto debe reflejar necesidades reales.' } ],
          modelo: 'Parto del POA y sus metas de atención: calculo las necesidades y costos de medicamentos, insumos y mantenimiento, y las asigno a las partidas presupuestarias de la proforma.'
        },
        {
          acciones: [
            { icono: '📉', t: 'Comparar lo ejecutado con lo programado', p: 2, fb: 'La comparación detecta desvíos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔍', t: 'Revisar los procesos de compra atrasados', p: 2, fb: 'Identificar causas permite corregir.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🛍️', t: 'Comprar cualquier cosa para subir el porcentaje', p: 0, fb: 'Gastar sin necesidad es mala gestión.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Control de la ejecución', claves: ['ejecucion', 'ejecutado', 'programado', 'compar', 'seguimiento', '25'] },
            { n: 'Análisis de causas', claves: ['causa', 'analiz', 'retras', 'atras', 'por que', 'certificacion'] },
            { n: 'Acciones correctivas', claves: ['correctiv', 'acciones', 'cronograma', 'fechas', 'reprogram', 'plan de accion'] }
          ],
          evitar: [ { claves: ['comprar cualquier cosa', 'gastar todo en diciembre'], fb: 'La ejecución debe responder a necesidades.' } ],
          modelo: 'Comparo la ejecución del 25 por ciento con lo programado, analizo las causas, como procesos de compra atrasados, y propongo acciones correctivas con fechas.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Redactar la justificación de la reforma', p: 2, fb: 'La justificación técnica sustenta la modificación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✅', t: 'Pedir la autorización a la instancia financiera', p: 2, fb: 'La reforma requiere autorización.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🤫', t: 'Pagar insumos con la partida de mantenimiento', p: 0, fb: 'Usar una partida para otro fin es irregular.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Reforma presupuestaria', claves: ['reforma', 'modificacion', 'traspaso', 'mover', 'reasign'] },
            { n: 'Justificación técnica', claves: ['justific', 'sustent', 'necesidad', 'informe tecnico', 'motiv'] },
            { n: 'Autorización y normativa', claves: ['autoriza', 'normativa', 'procedimiento', 'aprobacion', 'financiero'] }
          ],
          evitar: [ { claves: ['sin decir nada', 'de mantenimiento nomas'], fb: 'Cambiar el destino del gasto sin reforma es irregular.' } ],
          modelo: 'Se puede solicitar una reforma presupuestaria para mover recursos de mantenimiento a insumos, con una justificación técnica y la autorización que exige la normativa.'
        }
      ]
    }
  },

  /* ===================== ASS-12 Derecho Administrativo en Salud ===================== */
  {
    id: 'asig-ASS-12', cod: 'ASS-12',
    titulo: 'Una queja escrita por maltrato',
    asignaturas: ['ASS-12'],
    persona: { nombre: 'Sr. Fausto Tanguila', rol: 'Usuario que presenta una queja formal', avatar: '🧔🏽', pitch: 0.9 },
    contexto: 'Un usuario entrega una queja escrita: dice que un servidor del centro lo trató mal y exige que lo "boten hoy mismo". Debes tramitarla conforme al procedimiento administrativo.',
    objetivo: 'Aplicar normas del derecho administrativo en salud: derecho de petición, procedimiento, debido proceso, motivación y derechos de los usuarios.',
    pasos: [
      { dice: 'Aquí está mi queja. ¡Quiero que boten a ese señor hoy mismo!', opciones: [
          { t: 'Recibo la queja, le doy un número de trámite y fecha de recepción, y le explico que se tramitará y tendrá respuesta en el plazo establecido.', p: 2, r: 'Bueno, al menos queda registrada.', fb: 'El derecho de petición obliga a recibir, registrar y responder en plazo.' },
          { t: 'La recibo sin registrarla.', p: 1, r: '…', fb: 'Sin registro no hay control del plazo.' },
          { t: 'Le digo que no reciben quejas por escrito.', p: 0, r: '¡Eso es ilegal!', fb: 'Negarse a recibir una petición vulnera un derecho.' } ] },
      { dice: '¿Y por qué no lo botan de una vez?', opciones: [
          { t: 'Le explico que se investigará y el servidor tiene derecho a ser escuchado y defenderse (debido proceso) antes de cualquier sanción.', p: 2, r: 'Entiendo, que sea justo.', fb: 'El debido proceso y el derecho a la defensa rigen en lo administrativo.' },
          { t: 'Le digo que eso no depende de mí.', p: 1, r: '…', fb: 'Es cierto, pero falta explicar el procedimiento.' },
          { t: 'Le prometo que lo van a botar.', p: 0, r: '¡Así me gusta!', fb: 'Prometer sanciones sin proceso vulnera derechos.' } ] },
      { dice: '(Se debe emitir la respuesta formal al usuario.)', opciones: [
          { t: 'Proyecto una respuesta motivada: hechos, normas aplicables, decisión adoptada y medidas de mejora, firmada por la autoridad competente.', p: 2, r: '(La respuesta es clara y fundamentada.)', fb: 'La motivación es requisito de validez de los actos administrativos.' },
          { t: 'Le envío un mensaje diciendo "ya se arregló".', p: 1, r: '…', fb: 'No es una respuesta formal ni motivada.' },
          { t: 'Archivo la queja sin responder.', p: 0, r: '…', fb: 'El silencio vulnera el derecho de petición.' } ] }
    ],
    vivo: {
      lugar: 'Secretaría de la Dirección del centro de salud', fondo: 'oficina',
      inicio: { confianza: 35, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '📥', t: 'Sellar la queja con fecha y número de trámite', p: 2, fb: 'El registro inicia el procedimiento y el plazo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🧾', t: 'Entregarle la copia de recepción', p: 2, fb: 'La copia es su constancia.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙅', t: 'Negarse a recibir la queja escrita', p: 0, fb: 'Vulnera el derecho de petición.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Recibe y registra la queja', claves: ['recibo', 'registr', 'numero de tramite', 'fecha', 'sello', 'recepcion'] },
            { n: 'Derecho de petición', claves: ['derecho de peticion', 'derecho', 'tramitar', 'tramite', 'su queja'] },
            { n: 'Plazo de respuesta', claves: ['plazo', 'respuesta', 'dias', 'le responderan', 'tiempo establecido'] }
          ],
          evitar: [ { claves: ['no recibimos', 'no se aceptan quejas'], fb: 'Toda petición debe ser recibida.' } ],
          modelo: 'Recibo su queja y la registro con fecha y número de trámite; tiene derecho de petición. Se tramitará y recibirá respuesta en el plazo establecido.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Explicarle las etapas del procedimiento', p: 2, fb: 'Conocer el proceso genera confianza.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗣️', t: 'Anotar su versión de los hechos', p: 2, fb: 'Su testimonio es parte de la investigación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔥', t: 'Prometerle que despedirán al servidor', p: 0, fb: 'Prometer sanciones sin proceso vulnera derechos.', efecto: { confianza: 8, tension: -2 } }
          ],
          conceptos: [
            { n: 'Investigación de los hechos', claves: ['investig', 'hechos', 'verificar', 'analizar', 'su version'] },
            { n: 'Debido proceso y defensa', claves: ['debido proceso', 'defensa', 'ser escuchado', 'defenderse', 'descargo'] },
            { n: 'Sanción solo tras el proceso', claves: ['sancion', 'antes de', 'procedimiento', 'segun la ley', 'si corresponde'] }
          ],
          evitar: [ { claves: ['lo van a botar', 'le prometo que lo despiden'], fb: 'No se anticipan sanciones.' } ],
          modelo: 'Se investigarán los hechos y el servidor tiene derecho a ser escuchado y a su defensa, es el debido proceso; si corresponde, la sanción se aplica según el procedimiento.'
        },
        {
          acciones: [
            { icono: '📄', t: 'Redactar los antecedentes y hechos verificados', p: 2, fb: 'Los hechos son parte de la motivación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📚', t: 'Citar la normativa aplicable en la respuesta', p: 2, fb: 'La norma fundamenta la decisión.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🗄️', t: 'Archivar la queja sin respuesta', p: 0, fb: 'El silencio vulnera el derecho de petición.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Respuesta motivada', claves: ['motivad', 'fundament', 'hechos', 'normas', 'razones'] },
            { n: 'Decisión y medidas', claves: ['decision', 'medidas', 'mejora', 'resolvio', 'acciones'] },
            { n: 'Autoridad competente', claves: ['autoridad', 'competente', 'director', 'firma', 'oficio'] }
          ],
          evitar: [ { claves: ['ya se arreglo', 'sin responder'], fb: 'La respuesta debe ser formal y motivada.' } ],
          modelo: 'Proyecto una respuesta motivada con los hechos verificados, las normas aplicables, la decisión y las medidas de mejora, firmada por el director como autoridad competente.'
        }
      ]
    }
  }
]);
