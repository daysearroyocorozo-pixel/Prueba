/* Prácticas por asignatura – Inteligencia Artificial (PAO 1–2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== IA-01 Fundamentos de Programación ===================== */
  {
    id: 'asig-IA-01', cod: 'IA-01',
    titulo: 'El programa de notas que no funciona',
    asignaturas: ['IA-01'],
    persona: { nombre: 'Lic. Fanny Cerda', rol: 'Docente de una unidad educativa de Shell (Mera)', avatar: '👩🏽‍🏫', pitch: 1.1 },
    contexto: 'La docente escribió en Python un programa para promediar tres notas y decir si el estudiante aprueba (7 o más), pero da errores. Te pide ayuda por videollamada.',
    objetivo: 'Aplicar algoritmos, variables y tipos de datos, estructuras de control y funciones básicas en Python.',
    pasos: [
      { dice: 'No sé ni por dónde empezar. ¿Cómo debería pensar el programa antes de escribirlo?', opciones: [
          { t: 'Escribimos primero el algoritmo en pasos: entrada (leer tres notas), proceso (sumar y dividir para tres) y salida (mostrar el promedio y si aprueba).', p: 2, r: '¡Así se ve mucho más claro!', fb: 'Un algoritmo con entrada, proceso y salida (en pseudocódigo o diagrama de flujo) ordena la lógica antes de programar.' },
          { t: 'Copiamos un programa de internet y lo vamos cambiando hasta que funcione.', p: 1, r: 'Puede ser, pero no entendería lo que hace.', fb: 'Reutilizar código sirve, pero sin comprender la lógica no se aprende ni se corrigen errores.' },
          { t: 'Escribimos todo de corrido y vemos qué errores salen.', p: 0, r: 'Eso fue lo que hice y no funcionó…', fb: 'Programar sin plan produce errores lógicos difíciles de encontrar.' } ] },
      { dice: 'Mire: escribo nota = input("Nota: ") y luego sumo las tres, pero me sale "717680" en vez de un número.', opciones: [
          { t: 'input() devuelve texto (str) y el + une textos; hay que convertir cada nota con float() antes de sumar.', p: 2, r: '¡Ahora sí suma bien!', fb: 'Los tipos de datos importan: "7" + "8" concatena textos, mientras que 7.0 + 8.0 suma números.' },
          { t: 'Hay que escribir las notas sin comillas.', p: 1, r: 'Pero el usuario no escribe comillas…', fb: 'El problema no son las comillas del usuario, sino el tipo str que devuelve input().' },
          { t: 'Python suma mal; mejor usar una calculadora.', p: 0, r: 'Entonces no sirve programar…', fb: 'Python suma bien números; el error es de tipo de dato.' } ] },
      { dice: 'Ahora quiero hacerlo para los 30 estudiantes y que diga "Aprueba" o "Supletorio".', opciones: [
          { t: 'Creamos una función promedio(n1, n2, n3) que devuelva el resultado, la llamamos dentro de un bucle for para cada estudiante y usamos if para decidir si aprueba con 7 o más.', p: 2, r: 'Función, for e if… ¡ya entiendo cómo se combinan!', fb: 'Las funciones evitan repetir código; el for recorre la lista y el if/else toma la decisión.' },
          { t: 'Copiamos y pegamos el mismo código 30 veces.', p: 0, r: 'Sería larguísimo.', fb: 'Repetir código multiplica los errores; para eso existen los bucles y funciones.' },
          { t: 'Usamos un if para cada estudiante, uno por uno.', p: 1, r: 'Funciona, pero es mucho trabajo.', fb: 'Funciona, pero un bucle con una función es más corto y fácil de mantener.' } ] }
    ],
    vivo: {
      lugar: 'Videollamada con la docente, desde su aula en Shell', fondo: 'aula',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📝', t: 'Escribir el pseudocódigo en la pizarra compartida', p: 2, fb: 'El pseudocódigo ordena la lógica antes de programar.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🔀', t: 'Dibujar el diagrama de flujo con la decisión', p: 2, fb: 'El diagrama hace visible la estructura de control.', efecto: { confianza: 8, tension: -6 } },
            { icono: '⌨️', t: 'Ponerse a teclear sin planificar', p: 0, fb: 'Sin plan aparecen errores lógicos.', efecto: { confianza: -6, tension: 8 } }
          ],
          conceptos: [
            { n: 'Plantea el algoritmo antes del código', claves: ['algoritmo', 'pseudocodigo', 'diagrama de flujo', 'pasos', 'planificar', 'primero'] },
            { n: 'Identifica entrada, proceso y salida', claves: ['entrada', 'proceso', 'salida', 'leer', 'mostrar', 'imprimir'] },
            { n: 'Describe el cálculo del promedio', claves: ['sumar', 'suma', 'dividir', 'promedio', 'para tres', 'entre tres'] }
          ],
          evitar: [ { claves: ['copiamos de internet', 'a ver que sale'], fb: 'Sin comprender la lógica no se aprende a programar.' } ],
          modelo: 'Primero escribimos el algoritmo en pasos: la entrada es leer las tres notas, el proceso es sumarlas y dividir para tres, y la salida es mostrar el promedio y si aprueba.'
        },
        {
          acciones: [
            { icono: '🔍', t: 'Imprimir type(nota) para ver el tipo de dato', p: 2, fb: 'Comprobar el tipo revela que input() devuelve str.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔢', t: 'Envolver cada input() con float()', p: 2, fb: 'La conversión de tipo permite sumar números decimales.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🧮', t: 'Sugerir usar la calculadora del celular', p: 0, fb: 'Evita el problema en vez de resolverlo.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Explica que input() devuelve texto', claves: ['texto', 'str', 'cadena', 'string', 'devuelve', 'input'] },
            { n: 'Convierte el tipo de dato', claves: ['float', 'int', 'convertir', 'conversion', 'numero', 'tipo de dato'] },
            { n: 'Distingue unir textos de sumar números', claves: ['concaten', 'une', 'junta', 'pega', 'suma', 'sumar'] }
          ],
          evitar: [ { claves: ['python suma mal', 'no sirve programar'], fb: 'El error es de tipo de dato, no del lenguaje.' } ],
          modelo: 'El problema es que input devuelve texto, un str, y el más une los textos en vez de sumarlos. Hay que convertir cada nota con float para que sean números y se puedan sumar.'
        },
        {
          acciones: [
            { icono: '🧩', t: 'Definir la función promedio con def', p: 2, fb: 'Una función encapsula el cálculo y se reutiliza.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔁', t: 'Recorrer la lista de estudiantes con for', p: 2, fb: 'El bucle repite el proceso para los 30 estudiantes.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📋', t: 'Copiar y pegar el código 30 veces', p: 0, fb: 'Repetir código multiplica los errores.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Usa una función', claves: ['funcion', 'def', 'return', 'devuelva', 'reutiliz'] },
            { n: 'Usa un bucle para repetir', claves: ['for', 'bucle', 'ciclo', 'repetir', 'recorrer', 'cada estudiante', 'while'] },
            { n: 'Usa una condición para decidir', claves: ['if', 'condicion', 'else', 'si es mayor', 'siete', '7', 'mayor o igual'] }
          ],
          evitar: [ { claves: ['copiar y pegar', 'treinta veces', '30 veces'], fb: 'Repetir código es ineficiente y propenso a errores.' } ],
          modelo: 'Creamos una función promedio con def que devuelva el resultado; luego un bucle for recorre a cada estudiante y un if decide: si el promedio es mayor o igual a 7, aprueba; si no, supletorio.'
        }
      ]
    }
  },

  /* ===================== IA-02 Matemática Aplicada para Tecnología ===================== */
  {
    id: 'asig-IA-02', cod: 'IA-02',
    titulo: 'Las cuentas del criadero de tilapia',
    asignaturas: ['IA-02'],
    persona: { nombre: 'Don Ramiro Mashiant', rol: 'Piscicultor de tilapia en Fátima (Pastaza)', avatar: '👨🏽‍🌾', pitch: 0.9 },
    contexto: 'Don Ramiro quiere una hoja de cálculo que le ayude a decidir cuánto alimento comprar y cuánto vende. Te pide resolver con él tres cálculos reales.',
    objetivo: 'Aplicar funciones, matrices y vectores y nociones de cálculo (tasa de cambio) a datos de un emprendimiento.',
    pasos: [
      { dice: 'El costo del alimento es de 120 dólares fijos de transporte más 0,80 por cada kilo. Si compro 300 kilos, ¿cuánto pago?', opciones: [
          { t: 'Es una función lineal: C(x) = 120 + 0,80·x. Con 300 kilos: 120 + 240 = 360 dólares.', p: 2, r: '¡360! Justo lo que me cobraron la otra vez.', fb: 'Una función lineal tiene un valor fijo (intercepto) y una pendiente por unidad.' },
          { t: '0,80 por 300 da 240 dólares.', p: 1, r: '¿Y el transporte?', fb: 'Falta sumar el costo fijo de 120 dólares.' },
          { t: '120 más 300 da 420 dólares.', p: 0, r: 'Eso no cuadra.', fb: 'Se sumaron kilos con dólares; hay que multiplicar los kilos por el precio unitario.' } ] },
      { dice: 'En la semana 1 vendí 20 kilos de tilapia entera y 15 de filete; en la semana 2, 10 y 25. La entera cuesta 3 dólares y el filete 4. ¿Cuánto vendí cada semana?', opciones: [
          { t: 'Multiplico la matriz de ventas por el vector de precios: semana 1 = 20·3 + 15·4 = 120 dólares; semana 2 = 10·3 + 25·4 = 130 dólares.', p: 2, r: 'Con la tabla así, la hoja me lo calcula sola.', fb: 'El producto matriz-vector resume ventas por precios en un solo cálculo.' },
          { t: 'Sumo todos los kilos (70) y multiplico por 3,5 de precio promedio: 245 dólares.', p: 1, r: 'Pero no sé cuánto fue cada semana.', fb: 'Da el total aproximado, pero pierde el detalle por semana y por producto.' },
          { t: 'Sumo los precios (7) por las semanas (2): 14 dólares.', p: 0, r: '¡Eso es muy poco!', fb: 'Las operaciones no corresponden al problema.' } ] },
      { dice: 'Mis peces pesaban 50 gramos y a las 4 semanas pesan 170. ¿Qué tan rápido están creciendo?', opciones: [
          { t: 'La tasa de cambio es (170 − 50) ÷ 4 = 30 gramos por semana; es la pendiente de la recta del peso en el tiempo.', p: 2, r: '30 gramos por semana… ¡así puedo calcular cuándo cosechar!', fb: 'La tasa de cambio media (pendiente) es la noción básica de derivada aplicada a datos.' },
          { t: 'Crecieron 120 gramos.', p: 1, r: '¿Pero por semana?', fb: 'Es el cambio total; falta dividir para el tiempo.' },
          { t: '170 ÷ 4 = 42,5 gramos por semana.', p: 0, r: 'Hmm, ¿y el peso inicial?', fb: 'Hay que restar el peso inicial antes de dividir.' } ] }
    ],
    vivo: {
      lugar: 'Piscinas del criadero de tilapia en Fátima', fondo: 'exterior',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🧾', t: 'Revisar la factura anterior de alimento', p: 2, fb: 'Los datos reales permiten identificar el costo fijo y el variable.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📈', t: 'Escribir la función C(x) en la hoja de cálculo', p: 2, fb: 'La fórmula permite calcular cualquier cantidad.', efecto: { confianza: 10, tension: -6 } },
            { icono: '➕', t: 'Sumar los kilos con los dólares', p: 0, fb: 'No se suman unidades distintas.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Plantea la función lineal', claves: ['funcion', 'lineal', 'c de x', 'formula', 'ecuacion', 'pendiente'] },
            { n: 'Separa costo fijo y costo por kilo', claves: ['fijo', '120', 'ciento veinte', 'por kilo', 'por cada kilo', '0 80'] },
            { n: 'Da el resultado correcto', claves: ['360', 'trescientos sesenta'] }
          ],
          evitar: [ { claves: ['420', 'cuatrocientos veinte'], fb: 'Sumar kilos y dólares da un resultado sin sentido.' } ],
          modelo: 'Es una función lineal: el costo fijo es 120 y se suman 0,80 por cada kilo. Con 300 kilos son 120 más 240, o sea 360 dólares.'
        },
        {
          acciones: [
            { icono: '🔢', t: 'Ordenar las ventas en una tabla (matriz)', p: 2, fb: 'Filas = semanas y columnas = productos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✖️', t: 'Multiplicar la matriz por el vector de precios', p: 2, fb: 'El producto matriz-vector da el ingreso de cada semana.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🎲', t: 'Estimar a ojo los ingresos', p: 0, fb: 'Sin cálculo no hay información confiable.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa la matriz de ventas y el vector de precios', claves: ['matriz', 'vector', 'tabla', 'filas', 'columnas', 'producto'] },
            { n: 'Calcula la semana 1', claves: ['120', 'ciento veinte'] },
            { n: 'Calcula la semana 2', claves: ['130', 'ciento treinta'] }
          ],
          evitar: [ { claves: ['a ojo', 'mas o menos'], fb: 'Las decisiones del negocio requieren cálculos exactos.' } ],
          modelo: 'Multiplico la matriz de ventas por el vector de precios: la semana 1 son 20 por 3 más 15 por 4, igual a 120 dólares, y la semana 2 son 10 por 3 más 25 por 4, igual a 130 dólares.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Pesar una muestra de peces', p: 2, fb: 'Medir con una muestra da datos confiables del crecimiento.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📉', t: 'Graficar el peso contra las semanas', p: 2, fb: 'La pendiente de la gráfica es la tasa de crecimiento.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🐟', t: 'Dividir el peso final para las semanas', p: 0, fb: 'Olvida restar el peso inicial.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Resta el peso inicial', claves: ['restar', 'resta', 'menos 50', 'diferencia', '120 gramos', 'ciento veinte'] },
            { n: 'Calcula la tasa de cambio', claves: ['30', 'treinta', 'por semana', 'tasa de cambio', 'tasa'] },
            { n: 'Relaciona con la pendiente', claves: ['pendiente', 'recta', 'grafica', 'derivada', 'velocidad de crecimiento'] }
          ],
          evitar: [ { claves: ['42 5', 'cuarenta y dos'], fb: 'Hay que restar el peso inicial antes de dividir.' } ],
          modelo: 'Resto el peso inicial: 170 menos 50 da 120 gramos, y divido para 4 semanas: la tasa de cambio es 30 gramos por semana, que es la pendiente de la recta.'
        }
      ]
    }
  },

  /* ===================== IA-03 Introducción a la Inteligencia Artificial ===================== */
  {
    id: 'asig-IA-03', cod: 'IA-03',
    titulo: '¿La IA es un robot que piensa?',
    asignaturas: ['IA-03'],
    persona: { nombre: 'Sra. Carmen Vargas', rol: 'Coordinadora de un emprendimiento de turismo comunitario cerca de Puyo', avatar: '👩🏽', pitch: 1.15 },
    contexto: 'La coordinadora escuchó que la inteligencia artificial "piensa como una persona" y teme y a la vez quiere usarla para su emprendimiento. Te pide explicarle con ejemplos.',
    objetivo: 'Reconocer conceptos, historia, tipos y aplicaciones básicas de la inteligencia artificial por sectores.',
    pasos: [
      { dice: 'Dígame la verdad: ¿la inteligencia artificial es un robot que piensa y siente como nosotros?', opciones: [
          { t: 'No: es un conjunto de técnicas para que las computadoras hagan tareas que requieren inteligencia, como reconocer o predecir, aprendiendo patrones de los datos; no tiene conciencia ni sentimientos.', p: 2, r: 'Ah, entonces aprende de ejemplos, no piensa.', fb: 'La IA actual resuelve tareas específicas a partir de datos y reglas; no tiene conciencia.' },
          { t: 'Sí, ya piensa como las personas y pronto nos reemplazará.', p: 0, r: '¡Qué miedo!', fb: 'Es un mito; la IA general aún no existe.' },
          { t: 'Es un programa de computadora muy avanzado.', p: 1, r: '¿Y qué lo hace diferente?', fb: 'Es cierto, pero falta explicar que aprende patrones de los datos.' } ] },
      { dice: '¿Y desde cuándo existe? ¿Hay varios tipos?', opciones: [
          { t: 'Nace en los años 50 (Turing y la conferencia de Dartmouth de 1956); hay IA basada en reglas y basada en aprendizaje automático, y casi toda la actual es IA estrecha, para tareas específicas.', p: 2, r: 'No sabía que era tan antigua.', fb: 'Conocer la historia y los tipos de IA (reglas, aprendizaje, estrecha frente a general) evita expectativas falsas.' },
          { t: 'Es un invento de hace dos años, desde los chatbots.', p: 0, r: 'Ah, ¿es tan nueva?', fb: 'Los chatbots generativos son recientes, pero la IA tiene más de 70 años.' },
          { t: 'Hay IA buena e IA mala.', p: 1, r: '¿Y cómo las distingo?', fb: 'Los usos pueden ser buenos o malos, pero la clasificación técnica es otra.' } ] },
      { dice: '¿En qué me podría ayudar en el turismo comunitario?', opciones: [
          { t: 'Por ejemplo, un asistente que responda preguntas frecuentes de reservas, traducción para turistas extranjeros y análisis de comentarios; empezando con herramientas sencillas, revisando las respuestas y cuidando los datos de los clientes.', p: 2, r: 'Eso sí me sirve, empecemos con el asistente.', fb: 'Las aplicaciones deben responder a una necesidad real, con supervisión humana y protección de datos.' },
          { t: 'En todo: puede administrar el negocio sola.', p: 0, r: '¿Y yo qué hago?', fb: 'Exagerar las capacidades lleva a malas decisiones.' },
          { t: 'Puede hacer publicidad en redes.', p: 1, r: 'Ya, ¿algo más?', fb: 'Es una aplicación, pero conviene partir de las necesidades del emprendimiento.' } ] }
    ],
    vivo: {
      lugar: 'Cabaña de recepción del emprendimiento de turismo comunitario', fondo: 'comunidad',
      inicio: { confianza: 40, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📱', t: 'Mostrarle cómo el celular reconoce rostros en fotos', p: 2, fb: 'Un ejemplo cotidiano hace concreto el concepto de IA.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🍌', t: 'Comparar con aprender a reconocer frutas con ejemplos', p: 2, fb: 'La analogía explica el aprendizaje a partir de datos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎬', t: 'Ponerle un video de robots asesinos', p: 0, fb: 'Refuerza mitos y temores infundados.', efecto: { confianza: -8, tension: 12 } }
          ],
          conceptos: [
            { n: 'Define la IA como técnicas para tareas inteligentes', claves: ['tareas', 'tecnicas', 'reconocer', 'predecir', 'programas', 'sistemas'] },
            { n: 'Explica que aprende patrones de los datos', claves: ['aprende', 'datos', 'patrones', 'ejemplos', 'entrena'] },
            { n: 'Aclara que no tiene conciencia', claves: ['no piensa', 'no siente', 'conciencia', 'sentimientos', 'no es un robot', 'no es una persona'] }
          ],
          evitar: [ { claves: ['nos va a reemplazar', 'piensa como nosotros', 'tiene sentimientos'], fb: 'Son mitos que generan miedo y expectativas falsas.' } ],
          modelo: 'No es un robot que siente: la IA son técnicas para que los sistemas hagan tareas como reconocer o predecir, porque aprenden patrones de los datos. No tiene conciencia ni sentimientos.'
        },
        {
          acciones: [
            { icono: '🕰️', t: 'Mostrar una línea de tiempo de la IA', p: 2, fb: 'La historia ayuda a entender su evolución.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🗂️', t: 'Dibujar un cuadro con los tipos de IA', p: 2, fb: 'Clasificar aclara qué puede y qué no puede hacer.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤷', t: 'Decirle que es un invento reciente', p: 0, fb: 'Es una información falsa.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Menciona su historia', claves: ['1956', 'anos 50', 'cincuenta', 'turing', 'dartmouth', 'historia', 'decadas'] },
            { n: 'Distingue reglas y aprendizaje automático', claves: ['reglas', 'aprendizaje automatico', 'machine learning', 'aprendizaje profundo', 'redes neuronales'] },
            { n: 'Explica la IA estrecha frente a la general', claves: ['estrecha', 'debil', 'especific', 'general', 'una sola tarea'] }
          ],
          evitar: [ { claves: ['es de hace dos anos', 'acaba de inventarse'], fb: 'La IA tiene más de setenta años de historia.' } ],
          modelo: 'La IA nace en los años 50, con Turing y la conferencia de Dartmouth en 1956. Hay IA basada en reglas y en aprendizaje automático, y casi toda la actual es IA estrecha, hecha para tareas específicas.'
        },
        {
          acciones: [
            { icono: '💬', t: 'Probar con ella un asistente de preguntas frecuentes', p: 2, fb: 'Una prueba sencilla muestra el valor práctico.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🌐', t: 'Mostrar un traductor para turistas extranjeros', p: 2, fb: 'Es una herramienta básica de IA útil para el turismo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤖', t: 'Prometer que la IA manejará todo el negocio', p: 0, fb: 'Exagerar las capacidades lleva a malas decisiones.', efecto: { confianza: -6, tension: 8 } }
          ],
          conceptos: [
            { n: 'Propone aplicaciones concretas para el sector', claves: ['reservas', 'preguntas frecuentes', 'traduc', 'asistente', 'chatbot', 'comentarios', 'turistas'] },
            { n: 'Sugiere herramientas básicas para empezar', claves: ['herramienta', 'sencilla', 'empezar', 'gratuita', 'probar', 'paso a paso'] },
            { n: 'Recuerda la supervisión y los datos', claves: ['revisar', 'supervis', 'cuidar los datos', 'proteger', 'privacidad', 'verificar'] }
          ],
          evitar: [ { claves: ['lo hace todo sola', 'ya no necesita personal'], fb: 'La IA apoya, pero no reemplaza la gestión humana.' } ],
          modelo: 'Podríamos empezar con una herramienta sencilla: un asistente que responda preguntas frecuentes de reservas y un traductor para turistas, revisando siempre las respuestas y cuidando los datos de los clientes.'
        }
      ]
    }
  },

  /* ===================== IA-04 Bases de Datos ===================== */
  {
    id: 'asig-IA-04', cod: 'IA-04',
    titulo: 'Del cuaderno a la base de datos de guayusa',
    asignaturas: ['IA-04'],
    persona: { nombre: 'Sr. Wilmer Santi', rol: 'Presidente de una asociación de productores de guayusa', avatar: '👨🏽', pitch: 0.95 },
    contexto: 'La asociación registra las entregas de hojas de guayusa en cuadernos y en un Excel lleno de nombres repetidos. Quieren una base de datos para saber cuánto entregó cada socio.',
    objetivo: 'Aplicar el concepto de base de datos, el modelo relacional, tablas, SQL básico y manejo seguro de los datos.',
    pasos: [
      { dice: 'En el Excel tenemos a "Juan Grefa", "J. Grefa" y "Juan Grefa A." y no sabemos si es el mismo. ¿Cómo lo ordenamos?', opciones: [
          { t: 'Creamos una tabla socios con una clave primaria (código único) y otra tabla entregas que use ese código como clave foránea, con fecha y kilos.', p: 2, r: 'Así cada socio aparece una sola vez.', fb: 'El modelo relacional separa entidades en tablas y las relaciona con claves, evitando duplicados.' },
          { t: 'Hacemos una sola hoja grande con todo.', p: 1, r: 'Seguiría el problema de los nombres.', fb: 'Una tabla única repite datos y genera inconsistencias.' },
          { t: 'Borramos los nombres que se parecen.', p: 0, r: '¿Y si eran personas distintas?', fb: 'Borrar sin criterio pierde información y puede perjudicar a socios.' } ] },
      { dice: 'Quiero saber cuántos kilos entregó cada socio en marzo, para pagarles.', opciones: [
          { t: 'SELECT s.nombre, SUM(e.kilos) FROM entregas e JOIN socios s ON e.socio_id = s.id WHERE e.fecha BETWEEN \'2026-03-01\' AND \'2026-03-31\' GROUP BY s.nombre;', p: 2, r: '¡Eso me da la lista de pago completa!', fb: 'JOIN une las tablas, WHERE filtra el mes, SUM totaliza y GROUP BY agrupa por socio.' },
          { t: 'SELECT * FROM entregas;', p: 1, r: 'Me salen todas las filas, sin total.', fb: 'Muestra los datos, pero no filtra ni agrupa.' },
          { t: 'Sumar a mano en el cuaderno.', p: 0, r: 'Eso es lo que queremos dejar de hacer.', fb: 'La consulta SQL es más rápida y confiable.' } ] },
      { dice: 'Mi sobrino quiere borrar las entregas de un socio que se retiró.', opciones: [
          { t: 'Antes hacemos un respaldo; usamos DELETE siempre con WHERE probado primero con un SELECT, y solo un usuario con permisos puede hacerlo.', p: 2, r: 'Mejor así, con cuidado.', fb: 'El manejo básico de una base incluye respaldos, permisos y precaución con DELETE.' },
          { t: 'Que lo haga desde su celular, rápido.', p: 1, r: 'Ojalá no se equivoque.', fb: 'Sin respaldo ni control de permisos el riesgo es alto.' },
          { t: 'Que ejecute DELETE FROM entregas; y listo.', p: 0, r: '¿Eso no borraría todo?', fb: 'Sin WHERE se borran todas las filas de la tabla.' } ] }
    ],
    vivo: {
      lugar: 'Centro de acopio de guayusa de la asociación', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🆔', t: 'Asignar un código único a cada socio', p: 2, fb: 'La clave primaria identifica a cada socio sin ambigüedad.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🗺️', t: 'Dibujar el diagrama entidad-relación', p: 2, fb: 'El diagrama muestra las tablas y su relación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '❌', t: 'Borrar los nombres parecidos', p: 0, fb: 'Se pierde información de socios reales.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Separa la información en tablas', claves: ['tabla', 'tablas', 'socios', 'entregas', 'relacional', 'modelo de datos'] },
            { n: 'Usa clave primaria', claves: ['clave primaria', 'codigo unico', 'identificador', 'id', 'unico'] },
            { n: 'Relaciona con clave foránea', claves: ['clave foranea', 'relacion', 'relaciona', 'se conecta', 'entidad relacion'] }
          ],
          evitar: [ { claves: ['borramos los nombres', 'una sola hoja'], fb: 'Borrar o amontonar datos no resuelve la inconsistencia.' } ],
          modelo: 'Creamos dos tablas: socios, con una clave primaria que es un código único, y entregas, que se relaciona con socios mediante una clave foránea, con la fecha y los kilos.'
        },
        {
          acciones: [
            { icono: '🔗', t: 'Unir las tablas con JOIN', p: 2, fb: 'JOIN combina las entregas con los nombres de los socios.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📅', t: 'Filtrar las fechas de marzo con WHERE', p: 2, fb: 'WHERE limita los registros al período de pago.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✍️', t: 'Sumar a mano en el cuaderno', p: 0, fb: 'Es lento y propenso a errores.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa SELECT con SUM', claves: ['select', 'sum', 'suma', 'total', 'kilos'] },
            { n: 'Filtra el mes con WHERE', claves: ['where', 'marzo', 'fecha', 'between', 'filtr'] },
            { n: 'Agrupa por socio y une tablas', claves: ['group by', 'agrup', 'join', 'por socio', 'cada socio'] }
          ],
          evitar: [ { claves: ['a mano', 'en el cuaderno'], fb: 'La consulta evita errores de suma manual.' } ],
          modelo: 'Hago un SELECT con el nombre y SUM de los kilos, uno las tablas con JOIN, filtro con WHERE las fechas de marzo y agrupo con GROUP BY por socio.'
        },
        {
          acciones: [
            { icono: '💾', t: 'Respaldar la base antes de cambiarla', p: 2, fb: 'El respaldo permite recuperar errores.', efecto: { confianza: 8, tension: -6 } },
            { icono: '👀', t: 'Probar el filtro primero con un SELECT', p: 2, fb: 'Así se ve qué filas se borrarán.', efecto: { confianza: 8, tension: -6 } },
            { icono: '💥', t: 'Ejecutar DELETE sin WHERE', p: 0, fb: 'Borra todas las entregas.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Hace un respaldo', claves: ['respaldo', 'backup', 'copia de seguridad', 'copia'] },
            { n: 'Usa DELETE con WHERE probado', claves: ['where', 'delete', 'probar', 'select primero', 'condicion'] },
            { n: 'Controla los permisos de usuario', claves: ['permiso', 'usuario', 'autoriz', 'acceso', 'responsable'] }
          ],
          evitar: [ { claves: ['delete from entregas y listo', 'borra todo'], fb: 'Un DELETE sin WHERE elimina toda la tabla.' } ],
          modelo: 'Primero hacemos un respaldo de la base. Luego probamos la condición con un SELECT y usamos DELETE siempre con WHERE, y solo un usuario con permiso puede hacerlo.'
        }
      ]
    }
  },

  /* ===================== IA-05 Comunicación y Cultura Digital ===================== */
  {
    id: 'asig-IA-05', cod: 'IA-05',
    titulo: 'Mi primer trabajo en grupo en línea',
    asignaturas: ['IA-05'],
    persona: { nombre: 'Jessica Tanguila', rol: 'Compañera de la carrera en línea, desde Mera', avatar: '👩🏽‍💻', pitch: 1.2 },
    contexto: 'Jessica es nueva en la modalidad en línea. Su grupo no se organiza, le llegó un mensaje sospechoso y quiere compartir una noticia que vio en redes. Te pide orientación.',
    objetivo: 'Aplicar comunicación digital, herramientas colaborativas, seguridad básica en internet y ciudadanía digital.',
    pasos: [
      { dice: 'Somos cinco en el grupo y nadie sabe qué hacer. Todo es un caos en el chat.', opciones: [
          { t: 'Propongo una videollamada corta, un documento compartido con roles y fechas, y un calendario; con mensajes claros y respetuosos (netiqueta).', p: 2, r: '¡Con roles y un documento compartido ya podemos avanzar!', fb: 'Las herramientas colaborativas y la netiqueta organizan el trabajo en línea.' },
          { t: 'Que cada uno haga una parte y la mande por correo al final.', p: 1, r: 'Pero nadie revisaría el conjunto.', fb: 'Dividir sin coordinación produce trabajos inconexos.' },
          { t: 'Hazlo tú sola, es más rápido.', p: 0, r: 'No es justo…', fb: 'El trabajo colaborativo requiere participación de todos.' } ] },
      { dice: 'Me llegó un correo: "Ganaste una beca, ingresa tu usuario y contraseña del aula virtual aquí". ¿Lo lleno?', opciones: [
          { t: 'No: es phishing. Revisa el remitente, no hagas clic, repórtalo y activa la verificación en dos pasos; usa contraseñas largas y distintas.', p: 2, r: 'Uy, casi caigo. Gracias.', fb: 'Desconfiar de la urgencia y verificar el remitente previene el robo de credenciales.' },
          { t: 'Llénalo, pero cambia la contraseña después.', p: 1, r: '¿Y si entran antes?', fb: 'Entregar la contraseña ya es el riesgo.' },
          { t: 'Sí, las becas llegan así.', p: 0, r: '¡Qué bien!', fb: 'Las instituciones nunca piden contraseñas por correo.' } ] },
      { dice: 'Vi un video que dice que la IA del instituto vigila a los estudiantes. ¡Lo voy a compartir en todos los grupos!', opciones: [
          { t: 'Antes de compartir, verifica la fuente, busca si medios confiables o el instituto lo confirman; podría ser falso o un deepfake. Compartir sin verificar desinforma.', p: 2, r: 'Tienes razón, mejor verifico primero.', fb: 'La ciudadanía digital implica verificar antes de compartir y comunicar con responsabilidad.' },
          { t: 'Compártelo solo con tu familia.', p: 1, r: 'Igual se va a regar.', fb: 'Reduce el alcance, pero sigue difundiendo algo sin verificar.' },
          { t: 'Compártelo ya, la gente tiene que saber.', p: 0, r: '¡Listo, enviado!', fb: 'Difundir información falsa causa daño y desconfianza.' } ] }
    ],
    vivo: {
      lugar: 'Sala de videollamada del grupo de estudio', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📄', t: 'Crear un documento compartido con roles y fechas', p: 2, fb: 'Un espacio común permite coordinar y ver el avance.', efecto: { confianza: 10, tension: -8 } },
            { icono: '📅', t: 'Agendar una videollamada de 20 minutos', p: 2, fb: 'Una reunión breve alinea al grupo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '😤', t: 'Enviar audios largos regañando al grupo', p: 0, fb: 'La comunicación agresiva rompe la colaboración.', efecto: { confianza: -10, tension: 12 } }
          ],
          conceptos: [
            { n: 'Usa herramientas colaborativas', claves: ['documento compartido', 'videollamada', 'calendario', 'herramienta colaborativa', 'en la nube', 'plataforma'] },
            { n: 'Organiza roles y fechas', claves: ['roles', 'responsable', 'fechas', 'tareas', 'cronograma', 'quien hace'] },
            { n: 'Comunica con respeto (netiqueta)', claves: ['respeto', 'netiqueta', 'mensajes claros', 'cordial', 'amable', 'claro'] }
          ],
          evitar: [ { claves: ['hazlo tu sola', 'que los demas no hagan nada'], fb: 'El trabajo en grupo requiere la participación de todos.' } ],
          modelo: 'Propongo una videollamada corta y un documento compartido con roles, tareas y fechas para cada uno; y en el chat escribimos mensajes claros y con respeto.'
        },
        {
          acciones: [
            { icono: '🕵️', t: 'Revisar la dirección real del remitente', p: 2, fb: 'Los remitentes falsos imitan nombres oficiales.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔐', t: 'Activar la verificación en dos pasos', p: 2, fb: 'Un segundo factor protege la cuenta.', efecto: { confianza: 8, tension: -6 } },
            { icono: '⌨️', t: 'Escribir la contraseña en el enlace', p: 0, fb: 'Entrega la cuenta a los atacantes.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Reconoce el phishing', claves: ['phishing', 'suplantacion', 'estafa', 'fraude', 'falso', 'enganio', 'engano'] },
            { n: 'No entrega datos y reporta', claves: ['no hagas clic', 'no ingreses', 'no entregues', 'reporta', 'reportar', 'borra'] },
            { n: 'Refuerza la seguridad de la cuenta', claves: ['dos pasos', 'doble factor', 'contrasena', 'verificacion', 'mfa', 'segura'] }
          ],
          evitar: [ { claves: ['llenalo', 'ingresa tu contrasena', 'las becas llegan asi'], fb: 'Nunca se entregan contraseñas por correo.' } ],
          modelo: 'No lo llenes: es phishing, una estafa. No hagas clic, repórtalo al instituto y activa la verificación en dos pasos con una contraseña segura.'
        },
        {
          acciones: [
            { icono: '🔎', t: 'Buscar la noticia en medios confiables', p: 2, fb: 'Contrastar fuentes es la base de la alfabetización digital.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏫', t: 'Consultar el canal oficial del instituto', p: 2, fb: 'La fuente oficial confirma o desmiente.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📤', t: 'Reenviar el video a todos los grupos', p: 0, fb: 'Difundir sin verificar desinforma.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Verifica la fuente antes de compartir', claves: ['verific', 'fuente', 'confirmar', 'contrastar', 'medios confiables', 'oficial'] },
            { n: 'Advierte que puede ser falso o manipulado', claves: ['falso', 'deepfake', 'manipulad', 'desinform', 'noticia falsa', 'bulo'] },
            { n: 'Actúa con responsabilidad digital', claves: ['responsab', 'ciudadania digital', 'no compartir', 'antes de compartir', 'respeto', 'dano'] }
          ],
          evitar: [ { claves: ['compartelo ya', 'reenvialo'], fb: 'Compartir sin verificar difunde desinformación.' } ],
          modelo: 'Antes de compartir, verifica la fuente en medios confiables y en el canal oficial del instituto; podría ser falso o un deepfake. Como ciudadanía digital, compartir sin verificar causa daño.'
        }
      ]
    }
  },

  /* ===================== IA-06 Programación para Ciencia de Datos ===================== */
  {
    id: 'asig-IA-06', cod: 'IA-06',
    titulo: 'Turistas por cantón con Pandas',
    asignaturas: ['IA-06'],
    persona: { nombre: 'Ing. Diego Cerda', rol: 'Técnico de la dirección de turismo de un GAD de Pastaza', avatar: '🧑🏻‍💼', pitch: 1.0 },
    contexto: 'El técnico tiene un archivo CSV con 40 000 registros de visitantes por fecha y cantón, y en Excel todo se cuelga. Te pide procesarlo con Python.',
    objetivo: 'Aplicar Python para datos con Pandas y NumPy: lectura, manipulación y escritura de datos.',
    pasos: [
      { dice: 'Aquí está el archivo visitantes.csv. ¿Cómo lo abrimos y revisamos?', opciones: [
          { t: 'Con pd.read_csv("visitantes.csv") en un DataFrame, y revisamos head(), info() y shape para ver columnas, tipos y cantidad de filas.', p: 2, r: 'Abrió en un segundo y ya veo las columnas.', fb: 'Leer con Pandas y revisar la estructura es el primer paso de cualquier análisis.' },
          { t: 'Lo abrimos con el bloc de notas y lo leemos.', p: 1, r: 'Son 40 000 líneas…', fb: 'Sirve para mirar, no para procesar datos.' },
          { t: 'Lo copiamos a mano en una lista de Python.', p: 0, r: 'Nos tomaría semanas.', fb: 'Para eso existen las funciones de lectura de Pandas.' } ] },
      { dice: 'Necesito el total de visitantes por cantón, solo del feriado de carnaval.', opciones: [
          { t: 'Filtro las fechas del feriado con una condición sobre la columna fecha y luego uso groupby("canton")["visitantes"].sum().', p: 2, r: '¡Justo la tabla que necesitaba!', fb: 'El filtrado booleano y groupby permiten resumir datos en pocas líneas.' },
          { t: 'Recorro las 40 000 filas con un for y voy sumando en variables.', p: 1, r: 'Funciona, pero tarda y es largo.', fb: 'Funciona, pero Pandas lo hace vectorizado y más claro.' },
          { t: 'Uso solo el promedio de todo el año.', p: 0, r: 'Eso no responde mi pregunta.', fb: 'No filtra el feriado ni separa por cantón.' } ] },
      { dice: 'Ahora quiero guardar el resultado y saber el promedio diario.', opciones: [
          { t: 'Guardo con to_csv("resumen_carnaval.csv", index=False) y calculo el promedio diario con mean() o np.mean; documento el script para repetirlo el próximo feriado.', p: 2, r: 'Y el próximo año solo ejecuto el script.', fb: 'Escribir resultados y dejar un script reproducible ahorra trabajo y evita errores.' },
          { t: 'Hago una captura de pantalla del resultado.', p: 1, r: 'No podré usar esos datos.', fb: 'Una imagen no se puede reutilizar como dato.' },
          { t: 'Sobrescribo el archivo original con el resumen.', p: 0, r: '¡Perdí los datos completos!', fb: 'Nunca se sobrescriben los datos originales.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de la dirección de turismo, con el cuaderno Jupyter abierto', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🐼', t: 'Ejecutar pd.read_csv en un cuaderno Jupyter', p: 2, fb: 'Pandas carga miles de filas en segundos.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🔍', t: 'Revisar head(), info() y shape', p: 2, fb: 'Conocer la estructura evita errores posteriores.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✍️', t: 'Transcribir los datos a mano', p: 0, fb: 'Es lento e introduce errores.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Lee el archivo con Pandas', claves: ['read csv', 'pandas', 'pd', 'leer', 'cargar'] },
            { n: 'Usa un DataFrame', claves: ['dataframe', 'tabla', 'df'] },
            { n: 'Revisa la estructura de los datos', claves: ['head', 'info', 'shape', 'columnas', 'tipos', 'filas'] }
          ],
          evitar: [ { claves: ['a mano', 'copiarlo uno por uno'], fb: 'El procesamiento manual no escala.' } ],
          modelo: 'Lo leemos con pandas usando read_csv, que lo carga en un DataFrame, y revisamos head, info y shape para ver las columnas, los tipos y el número de filas.'
        },
        {
          acciones: [
            { icono: '📅', t: 'Convertir la columna fecha con to_datetime', p: 2, fb: 'Las fechas bien tipadas permiten filtrar rangos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧮', t: 'Agrupar por cantón con groupby y sum', p: 2, fb: 'groupby resume los datos por categoría.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📆', t: 'Usar el promedio de todo el año', p: 0, fb: 'No responde a la pregunta del feriado.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Filtra las fechas del feriado', claves: ['filtr', 'condicion', 'fecha', 'feriado', 'carnaval', 'to datetime'] },
            { n: 'Agrupa por cantón', claves: ['groupby', 'agrup', 'por canton', 'canton'] },
            { n: 'Suma los visitantes', claves: ['sum', 'suma', 'total', 'visitantes'] }
          ],
          evitar: [ { claves: ['promedio de todo el ano'], fb: 'Hay que filtrar el período pedido.' } ],
          modelo: 'Filtro las filas con una condición sobre la fecha del feriado de carnaval y luego uso groupby por cantón con sum de la columna visitantes para obtener el total.'
        },
        {
          acciones: [
            { icono: '💾', t: 'Guardar el resumen con to_csv en un archivo nuevo', p: 2, fb: 'El archivo nuevo conserva los datos originales intactos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📐', t: 'Calcular el promedio diario con NumPy', p: 2, fb: 'np.mean o mean() resumen la serie diaria.', efecto: { confianza: 6, tension: -4 } },
            { icono: '♻️', t: 'Sobrescribir visitantes.csv con el resumen', p: 0, fb: 'Se pierden los datos originales.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Escribe el resultado en un archivo nuevo', claves: ['to csv', 'guardar', 'exportar', 'archivo nuevo', 'escribir'] },
            { n: 'Calcula el promedio diario', claves: ['mean', 'promedio', 'numpy', 'np', 'media'] },
            { n: 'Deja el proceso reproducible', claves: ['script', 'document', 'reproduc', 'repetir', 'cuaderno', 'jupyter'] }
          ],
          evitar: [ { claves: ['sobrescribo el original', 'reemplazo el archivo original'], fb: 'Los datos originales no se sobrescriben.' } ],
          modelo: 'Guardo el resumen con to_csv en un archivo nuevo, calculo el promedio diario con mean de numpy y dejo el script documentado en el cuaderno para repetirlo el próximo feriado.'
        }
      ]
    }
  },

  /* ===================== IA-07 Estadística Aplicada ===================== */
  {
    id: 'asig-IA-07', cod: 'IA-07',
    titulo: 'El rendimiento de cacao que engaña',
    asignaturas: ['IA-07'],
    persona: { nombre: 'Ing. Lorena Aguinda', rol: 'Técnica agrícola de una asociación cacaotera de Arajuno', avatar: '👩🏽‍🔬', pitch: 1.1 },
    contexto: 'La técnica debe informar el rendimiento típico de cinco fincas socias (quintales por hectárea): 8, 10, 12, 10 y 30. Te pide calcular e interpretar.',
    objetivo: 'Aplicar estadística descriptiva, medidas de tendencia central, gráficos y probabilidad básica para interpretar datos.',
    pasos: [
      { dice: 'Los rendimientos son 8, 10, 12, 10 y 30 quintales por hectárea. ¿Qué valor reporto como típico?', opciones: [
          { t: 'La media es 70 ÷ 5 = 14, pero la mediana es 10; como 30 es un valor atípico, la mediana representa mejor lo típico.', p: 2, r: 'Claro, la finca de 30 jala el promedio hacia arriba.', fb: 'La mediana es robusta frente a valores atípicos; la media se deja arrastrar por los extremos.' },
          { t: 'La media es 14 y esa reporto.', p: 1, r: 'Pero cuatro fincas producen menos que eso…', fb: 'El cálculo es correcto, pero con un atípico la media no representa lo típico.' },
          { t: 'Reporto 30, que es el mejor.', p: 0, r: 'Eso sería engañoso.', fb: 'El máximo no describe el comportamiento general.' } ] },
      { dice: 'Quiero mostrar estos datos en la asamblea. ¿Qué gráfico uso?', opciones: [
          { t: 'Un diagrama de caja o un gráfico de barras por finca, que deja ver la dispersión y el valor atípico; con título y ejes claros.', p: 2, r: 'Se entenderá de una sola mirada.', fb: 'El gráfico debe responder a la pregunta: comparar fincas y mostrar dispersión.' },
          { t: 'Un gráfico de pastel con los cinco valores.', p: 1, r: 'Hmm, ¿se ve lo atípico?', fb: 'El pastel muestra partes de un todo, no la dispersión.' },
          { t: 'Ningún gráfico, solo leo los números.', p: 0, r: 'La gente se perderá.', fb: 'Los gráficos facilitan la interpretación.' } ] },
      { dice: 'De 40 lotes revisados, 6 tienen moniliasis. Si elijo un lote al azar, ¿qué probabilidad hay de que esté enfermo?', opciones: [
          { t: 'P = 6 ÷ 40 = 0,15, es decir 15 %; conviene revisar más lotes para confirmar.', p: 2, r: 'Un 15 %… hay que actuar a tiempo.', fb: 'La probabilidad clásica es casos favorables sobre casos posibles.' },
          { t: 'Es 6 %.', p: 0, r: '¿Seis de cuarenta es 6 %?', fb: 'Hay que dividir para el total de lotes.' },
          { t: 'Es baja, menos de la mitad.', p: 1, r: '¿Pero cuánto exactamente?', fb: 'Es cierto, pero falta cuantificarla.' } ] }
    ],
    vivo: {
      lugar: 'Centro de acopio de la asociación cacaotera', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🔢', t: 'Ordenar los datos de menor a mayor', p: 2, fb: 'Ordenar permite encontrar la mediana.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🧮', t: 'Calcular la media y la mediana', p: 2, fb: 'Comparar ambas revela el efecto del atípico.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🏆', t: 'Destacar solo la finca de 30 quintales', p: 0, fb: 'Presentar el máximo como típico engaña.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Calcula la media', claves: ['media', 'promedio', '14', 'catorce'] },
            { n: 'Calcula la mediana', claves: ['mediana', '10', 'diez', 'valor central'] },
            { n: 'Identifica el valor atípico', claves: ['atipico', 'extremo', '30', 'treinta', 'jala', 'distorsiona'] }
          ],
          evitar: [ { claves: ['reporto 30', 'el mejor valor'], fb: 'El máximo no representa a todas las fincas.' } ],
          modelo: 'La media es 70 dividido para 5, o sea 14, pero la mediana es 10. Como 30 es un valor atípico que jala el promedio, la mediana representa mejor el rendimiento típico.'
        },
        {
          acciones: [
            { icono: '📦', t: 'Dibujar un diagrama de caja', p: 2, fb: 'Muestra la dispersión y marca el atípico.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📊', t: 'Hacer barras por finca con título y ejes', p: 2, fb: 'Las barras comparan valores con claridad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🥧', t: 'Hacer un pastel en 3D muy colorido', p: 0, fb: 'Distorsiona la lectura y no muestra dispersión.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Elige un gráfico adecuado', claves: ['caja', 'barras', 'boxplot', 'histograma', 'diagrama'] },
            { n: 'Muestra la dispersión y el atípico', claves: ['dispersion', 'variacion', 'atipico', 'diferencia', 'rango'] },
            { n: 'Cuida la claridad del gráfico', claves: ['titulo', 'ejes', 'claro', 'etiquetas', 'sencillo', 'unidades'] }
          ],
          evitar: [ { claves: ['pastel en 3d', 'tres dimensiones'], fb: 'Los efectos 3D distorsionan la percepción.' } ],
          modelo: 'Usaría un diagrama de caja o barras por finca, porque muestran la dispersión y el valor atípico, con un título claro, los ejes y las unidades.'
        },
        {
          acciones: [
            { icono: '🍫', t: 'Contar los lotes con moniliasis', p: 2, fb: 'Los casos favorables son la base del cálculo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '➗', t: 'Dividir los casos para el total de lotes', p: 2, fb: 'Probabilidad = favorables ÷ posibles.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🎯', t: 'Adivinar un porcentaje', p: 0, fb: 'Sin cálculo la decisión no tiene sustento.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Plantea casos favorables sobre posibles', claves: ['6 de 40', 'seis de cuarenta', 'dividir', 'casos', 'favorables', 'total'] },
            { n: 'Da el resultado', claves: ['15', 'quince', '0 15'] },
            { n: 'Interpreta para la acción', claves: ['revisar', 'muestra', 'actuar', 'prevenir', 'control', 'confirmar'] }
          ],
          evitar: [ { claves: ['seis por ciento', '6 por ciento'], fb: 'Se debe dividir para el total de lotes.' } ],
          modelo: 'La probabilidad es 6 de 40 lotes: 6 dividido para 40 da 0,15, o sea 15 %. Conviene revisar más lotes para confirmar y actuar a tiempo.'
        }
      ]
    }
  },

  /* ===================== IA-08 Procesamiento de Datos ===================== */
  {
    id: 'asig-IA-08', cod: 'IA-08',
    titulo: 'Los sensores del río no se ponen de acuerdo',
    asignaturas: ['IA-08'],
    persona: { nombre: 'Blgo. Andrés Grefa', rol: 'Técnico de una ONG de monitoreo ambiental del río Puyo', avatar: '🧑🏽‍🔬', pitch: 0.95 },
    contexto: 'Tres estaciones comunitarias miden la temperatura y la turbidez del río, pero cada una envía datos en formatos distintos, con vacíos, duplicados y valores de error. Hay que unirlos.',
    objetivo: 'Ejecutar la identificación de tipos de datos, limpieza, transformación y almacenamiento de información.',
    pasos: [
      { dice: 'En una estación la temperatura viene como "24,5", en otra como "76.1 F" y la fecha unas veces es 03/04 y otras 2026-04-03. ¿Por dónde empezamos?', opciones: [
          { t: 'Identificamos el tipo de cada columna (numérica, fecha, categórica, texto), convertimos los números con coma decimal y las fechas a un solo formato.', p: 2, r: 'Así todas las columnas hablarán el mismo idioma.', fb: 'Conocer y corregir los tipos de datos es la base de la limpieza.' },
          { t: 'Copiamos todo a una sola hoja tal como está.', p: 1, r: 'Seguirán mezclados los formatos.', fb: 'Unir sin tipificar arrastra los errores.' },
          { t: 'Borramos la estación que tiene formatos raros.', p: 0, r: '¡Es la estación de la comunidad de abajo!', fb: 'Descartar una fuente completa pierde información valiosa.' } ] },
      { dice: 'Hay filas repetidas, horas sin dato y valores de −999.', opciones: [
          { t: 'Eliminamos duplicados, tratamos −999 como faltante (es un código de error del sensor) y completamos huecos cortos por interpolación, marcando lo imputado.', p: 2, r: 'Y queda registro de qué se corrigió.', fb: 'La limpieza documentada trata duplicados, códigos de error y faltantes con criterio.' },
          { t: 'Borramos todas las filas con algún problema.', p: 1, r: 'Perderíamos días enteros.', fb: 'Eliminar sin análisis puede sesgar los datos.' },
          { t: 'Dejamos el −999; es un número más.', p: 0, r: '¡El promedio saldría bajo cero!', fb: 'Un código de error tratado como dato distorsiona todo el análisis.' } ] },
      { dice: 'Ya limpio todo, ¿cómo lo guardamos para el análisis mensual?', opciones: [
          { t: 'Transformamos °F a °C con (F − 32) × 5/9, guardamos en una base de datos o archivo versionado con un diccionario de datos y respaldos.', p: 2, r: 'Así cualquiera del equipo lo entiende.', fb: 'Unificar unidades y almacenar con diccionario y respaldo asegura calidad y continuidad.' },
          { t: 'Lo guardamos en mi computadora personal.', p: 1, r: '¿Y si se daña?', fb: 'Sin respaldo ni documentación los datos se pierden.' },
          { t: 'Dejamos los °F mezclados, se entiende.', p: 0, r: 'Mezclar unidades es un error grave.', fb: 'Unidades mezcladas invalidan las comparaciones.' } ] }
    ],
    vivo: {
      lugar: 'Laboratorio de campo de la ONG junto al río Puyo', fondo: 'exterior',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🏷️', t: 'Listar el tipo de dato de cada columna', p: 2, fb: 'Un inventario de tipos orienta la limpieza.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📆', t: 'Unificar las fechas al formato AAAA-MM-DD', p: 2, fb: 'El formato ISO evita confusiones de día y mes.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗑️', t: 'Descartar la estación con formatos distintos', p: 0, fb: 'Se pierde información de una comunidad.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Identifica los tipos de datos', claves: ['tipo de dato', 'tipos', 'numeric', 'categoric', 'texto', 'fecha'] },
            { n: 'Corrige el separador decimal', claves: ['coma', 'punto decimal', 'decimal', 'convertir', 'numero'] },
            { n: 'Unifica el formato de fechas', claves: ['formato', 'unificar', 'estandar', 'iso', 'mismo formato'] }
          ],
          evitar: [ { claves: ['borramos la estacion', 'eliminamos esa fuente'], fb: 'Descartar una fuente completa pierde datos valiosos.' } ],
          modelo: 'Primero identificamos el tipo de dato de cada columna: numérica, fecha o texto. Convertimos la coma decimal a número y unificamos todas las fechas en un mismo formato estándar.'
        },
        {
          acciones: [
            { icono: '👯', t: 'Eliminar filas duplicadas', p: 2, fb: 'Los duplicados inflan los conteos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🚩', t: 'Marcar −999 como dato faltante', p: 2, fb: 'Es un código de error, no una medición.', efecto: { confianza: 10, tension: -6 } },
            { icono: '✂️', t: 'Borrar todas las filas con algún vacío', p: 1, fb: 'Puede eliminar días completos y sesgar.', efecto: { confianza: 0, tension: 4 } },
            { icono: '🎲', t: 'Inventar valores para los huecos', p: 0, fb: 'Inventar datos destruye la confiabilidad.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Elimina duplicados', claves: ['duplicad', 'repetid', 'drop duplicates'] },
            { n: 'Trata el código de error como faltante', claves: ['999', 'codigo de error', 'faltante', 'nulo', 'valor perdido', 'error del sensor'] },
            { n: 'Completa con criterio y lo documenta', claves: ['interpol', 'imput', 'marcar', 'document', 'registro', 'criterio'] }
          ],
          evitar: [ { claves: ['inventamos', 'ponemos cualquier valor'], fb: 'Inventar datos es una falta de integridad.' } ],
          modelo: 'Eliminamos las filas duplicadas, tratamos el menos 999 como faltante porque es un código de error del sensor, e interpolamos los huecos cortos marcando y documentando lo imputado.'
        },
        {
          acciones: [
            { icono: '🌡️', t: 'Convertir Fahrenheit a Celsius', p: 2, fb: 'Una sola unidad permite comparar estaciones.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📚', t: 'Redactar el diccionario de datos', p: 2, fb: 'Describe cada variable, unidad y fuente.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💻', t: 'Guardar todo solo en el escritorio personal', p: 0, fb: 'Sin respaldo, los datos pueden perderse.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Transforma las unidades', claves: ['celsius', 'fahrenheit', 'menos 32', 'cinco novenos', 'unidad', 'transform'] },
            { n: 'Almacena en una base o archivo versionado', claves: ['base de datos', 'almacen', 'versionad', 'repositorio', 'guardar'] },
            { n: 'Documenta y respalda', claves: ['diccionario', 'respaldo', 'backup', 'document', 'metadatos'] }
          ],
          evitar: [ { claves: ['dejamos mezclado', 'se entiende igual'], fb: 'Mezclar unidades invalida el análisis.' } ],
          modelo: 'Transformamos los Fahrenheit a Celsius restando 32 y multiplicando por cinco novenos, y guardamos los datos en una base de datos versionada, con diccionario de datos y respaldo.'
        }
      ]
    }
  },

  /* ===================== IA-09 Visualización de Datos ===================== */
  {
    id: 'asig-IA-09', cod: 'IA-09',
    titulo: 'Un tablero de dengue para la comunidad',
    asignaturas: ['IA-09'],
    persona: { nombre: 'Lic. Gloria Shiguango', rol: 'Técnica de promoción de la salud de un distrito de Pastaza', avatar: '👩🏽‍⚕️', pitch: 1.1 },
    contexto: 'La técnica necesita mostrar a una asamblea barrial de Puyo los casos de dengue por semana y por barrio (datos agregados) para motivar la eliminación de criaderos.',
    objetivo: 'Utilizar principios de visualización, gráficos y dashboards e interpretación visual para presentar información.',
    pasos: [
      { dice: 'Tengo los casos por semana y por barrio. ¿Qué gráficos uso?', opciones: [
          { t: 'Un gráfico de líneas para la tendencia semanal y barras ordenadas para comparar barrios; un mapa simple si tenemos la ubicación agregada.', p: 2, r: 'Así se ve cuándo subió y dónde.', fb: 'Cada gráfico responde a una pregunta: líneas para tiempo, barras para comparar categorías.' },
          { t: 'Una tabla con todos los números.', p: 1, r: 'Muy difícil de leer en una asamblea.', fb: 'Las tablas sirven para consultar, no para ver patrones rápidamente.' },
          { t: 'Un pastel en 3D por semana.', p: 0, r: 'Se ve bonito, pero no entiendo nada.', fb: 'El pastel 3D distorsiona las proporciones y no muestra tendencias.' } ] },
      { dice: '¿Cómo hago para que el gráfico no confunda a la gente?', opciones: [
          { t: 'Título que diga la conclusión, ejes rotulados que empiecen en cero en las barras, pocos colores accesibles, la fuente de los datos y nada de adornos.', p: 2, r: 'Simple y honesto, me gusta.', fb: 'La claridad, la honestidad de las escalas y la accesibilidad del color son principios de visualización.' },
          { t: 'Muchos colores llamativos para que se fijen.', p: 1, r: 'Llama la atención, pero cansa.', fb: 'El exceso de color resta claridad.' },
          { t: 'Cortar el eje para que el aumento se vea más dramático.', p: 0, r: '¿Eso no sería exagerar?', fb: 'Manipular la escala engaña a la audiencia.' } ] },
      { dice: 'El director quiere un tablero que se actualice cada semana.', opciones: [
          { t: 'Armo un dashboard con indicadores clave (casos de la semana, variación), filtros por barrio y gráficos conectados a la fuente; solo datos agregados, sin nombres de pacientes.', p: 2, r: 'Perfecto, y cuidando la privacidad.', fb: 'Un dashboard útil combina indicadores clave, filtros y actualización, protegiendo los datos personales.' },
          { t: 'Envío cada semana un Excel nuevo por correo.', p: 1, r: 'Funciona, pero no es un tablero.', fb: 'Es manual y propenso a errores.' },
          { t: 'Pongo la lista de pacientes con su dirección para que los vecinos sepan.', p: 0, r: '¡Eso expone a las personas!', fb: 'Publicar datos de salud identificables vulnera la privacidad.' } ] }
    ],
    vivo: {
      lugar: 'Casa barrial de Puyo, frente al proyector', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📈', t: 'Graficar la tendencia semanal con líneas', p: 2, fb: 'Las líneas muestran la evolución en el tiempo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📊', t: 'Comparar barrios con barras ordenadas', p: 2, fb: 'Ordenar las barras facilita la comparación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🥧', t: 'Hacer un pastel en 3D por semana', p: 0, fb: 'Distorsiona y no muestra la tendencia.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa líneas para la tendencia en el tiempo', claves: ['lineas', 'linea', 'tendencia', 'semana', 'tiempo', 'evolucion'] },
            { n: 'Usa barras para comparar barrios', claves: ['barras', 'comparar', 'barrio', 'ordenad', 'categorias'] },
            { n: 'Elige según la pregunta', claves: ['pregunta', 'mensaje', 'objetivo', 'segun', 'mapa', 'donde'] }
          ],
          evitar: [ { claves: ['pastel en 3d', 'tres d'], fb: 'El 3D distorsiona las proporciones.' } ],
          modelo: 'Según la pregunta: un gráfico de líneas para ver la tendencia por semana y barras ordenadas para comparar los barrios, y un mapa simple para ver dónde.'
        },
        {
          acciones: [
            { icono: '🏷️', t: 'Escribir un título con la conclusión', p: 2, fb: 'El título guía la lectura del gráfico.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎨', t: 'Usar una paleta accesible de pocos colores', p: 2, fb: 'Pocos colores accesibles mejoran la lectura.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✂️', t: 'Cortar el eje para exagerar el aumento', p: 0, fb: 'Manipula la percepción.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Título y ejes claros', claves: ['titulo', 'ejes', 'rotul', 'etiquet', 'unidades', 'leyenda'] },
            { n: 'Escalas honestas', claves: ['desde cero', 'empiece en cero', 'escala', 'honest', 'no exagerar'] },
            { n: 'Simplicidad y accesibilidad', claves: ['pocos colores', 'accesible', 'sencill', 'simple', 'sin adornos', 'fuente'] }
          ],
          evitar: [ { claves: ['cortar el eje', 'mas dramatico'], fb: 'Manipular la escala engaña a la audiencia.' } ],
          modelo: 'Pondré un título con la conclusión, los ejes rotulados y las barras desde cero para una escala honesta, pocos colores accesibles, la fuente y un diseño sencillo.'
        },
        {
          acciones: [
            { icono: '🎛️', t: 'Agregar filtros por barrio al tablero', p: 2, fb: 'Los filtros permiten explorar a cada barrio.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔢', t: 'Mostrar indicadores clave arriba del tablero', p: 2, fb: 'Los KPI resumen la situación de un vistazo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📋', t: 'Publicar la lista de pacientes con dirección', p: 0, fb: 'Expone datos de salud identificables.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Incluye indicadores clave', claves: ['indicador', 'kpi', 'casos de la semana', 'variacion', 'resumen'] },
            { n: 'Filtros y actualización automática', claves: ['filtro', 'actualiz', 'conectado', 'automatic', 'cada semana', 'dashboard'] },
            { n: 'Protege la privacidad con datos agregados', claves: ['agregad', 'sin nombres', 'privacidad', 'anonim', 'proteger'] }
          ],
          evitar: [ { claves: ['lista de pacientes', 'con su direccion'], fb: 'Los datos de salud identificables no se publican.' } ],
          modelo: 'Armo un dashboard con indicadores clave como los casos de la semana y su variación, filtros por barrio, actualización automática y solo datos agregados, sin nombres, para proteger la privacidad.'
        }
      ]
    }
  },

  /* ===================== IA-10 Ética y Uso Responsable de la IA ===================== */
  {
    id: 'asig-IA-10', cod: 'IA-10',
    titulo: 'Calificar ensayos con una IA gratuita',
    asignaturas: ['IA-10'],
    persona: { nombre: 'Mgs. Paúl Cerda', rol: 'Rector de una unidad educativa de Puyo', avatar: '👨🏽‍🏫', pitch: 0.95 },
    contexto: 'El rector quiere subir los ensayos de 300 estudiantes, con nombres y cédulas, a una herramienta de IA gratuita para que los califique sola. Te pide opinión antes de hacerlo.',
    objetivo: 'Aplicar principios de ética digital, privacidad, seguridad, sesgos en IA y buenas prácticas tecnológicas.',
    pasos: [
      { dice: 'Subimos todos los ensayos con nombres y cédulas y en una tarde está todo calificado. ¿Qué opina?', opciones: [
          { t: 'Son datos de menores de edad; no deberían subirse con datos identificables a una herramienta gratuita sin revisar sus términos. Primero hay que anonimizar y verificar dónde se guardan.', p: 2, r: 'No había pensado en dónde quedan esos datos.', fb: 'Los datos de niñas, niños y adolescentes requieren protección reforzada; las herramientas gratuitas pueden reutilizar los datos.' },
          { t: 'Súbalos, pero sin las cédulas.', p: 1, r: 'Bueno, quitamos las cédulas.', fb: 'Los nombres también identifican; hay que revisar los términos de la herramienta.' },
          { t: 'Excelente idea, así ahorra tiempo.', p: 0, r: '¡Empecemos ya!', fb: 'Expone datos personales de menores sin garantías.' } ] },
      { dice: '¿Y la calificación de la IA será justa?', opciones: [
          { t: 'Puede tener sesgos: penalizar variantes del español amazónico o textos de estudiantes bilingües kichwa-español. Hay que probarla con una muestra y comparar con la calificación docente.', p: 2, r: 'Tiene razón, hay que probar antes.', fb: 'Los modelos reflejan los datos con que fueron entrenados; se deben evaluar los sesgos antes de usarlos.' },
          { t: 'Sí, una máquina siempre es objetiva.', p: 0, r: 'Entonces no hay problema.', fb: 'La IA no es neutral: hereda sesgos de sus datos.' },
          { t: 'Más o menos, depende.', p: 1, r: '¿Depende de qué?', fb: 'Hay que explicar el riesgo de sesgo y cómo verificarlo.' } ] },
      { dice: 'Entonces, ¿cómo la usamos de forma responsable?', opciones: [
          { t: 'Como apoyo: retroalimentación con una rúbrica clara, la nota final la decide el docente, se informa a los estudiantes y familias que se usa IA y se documentan las reglas.', p: 2, r: 'Así la IA ayuda sin reemplazar al docente.', fb: 'Supervisión humana, transparencia y reglas claras son buenas prácticas en el uso de IA.' },
          { t: 'Que califique sola, pero sin decirle a nadie.', p: 0, r: '…', fb: 'Ocultar el uso de IA en decisiones que afectan a estudiantes no es transparente.' },
          { t: 'Usarla solo para la mitad de los cursos.', p: 1, r: '¿Y con qué criterio?', fb: 'No resuelve los problemas de privacidad, sesgo y supervisión.' } ] }
    ],
    vivo: {
      lugar: 'Rectorado de la unidad educativa', fondo: 'aula',
      inicio: { confianza: 55, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '📜', t: 'Leer los términos de uso de la herramienta', p: 2, fb: 'Los términos indican si reutilizan los datos subidos.', efecto: { confianza: 6, tension: 2 } },
            { icono: '🕶️', t: 'Anonimizar los ensayos antes de cualquier prueba', p: 2, fb: 'Quitar nombres y cédulas reduce el riesgo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⬆️', t: 'Subir los 300 ensayos con nombres', p: 0, fb: 'Expone datos de menores sin garantías.', efecto: { confianza: 6, tension: -4 } }
          ],
          conceptos: [
            { n: 'Reconoce que son datos de menores', claves: ['menores', 'estudiantes', 'ninos', 'adolescentes', 'datos personales', 'identific'] },
            { n: 'Protege la privacidad anonimizando', claves: ['anonim', 'sin nombres', 'quitar', 'seudonim', 'privacidad'] },
            { n: 'Revisa términos y dónde se guardan los datos', claves: ['terminos', 'condiciones', 'donde se guardan', 'servidor', 'reutiliz', 'gratuita'] }
          ],
          evitar: [ { claves: ['subamos todo', 'excelente idea'], fb: 'Subir datos de menores sin garantías es irresponsable.' } ],
          modelo: 'Son datos personales de menores de edad: antes de usar una herramienta gratuita hay que revisar sus términos y dónde se guardan los datos, y anonimizar los ensayos quitando nombres y cédulas.'
        },
        {
          acciones: [
            { icono: '🧪', t: 'Probar con una muestra de 20 ensayos', p: 2, fb: 'La prueba piloto revela errores y sesgos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⚖️', t: 'Comparar notas de la IA con las del docente', p: 2, fb: 'La comparación mide la concordancia y los sesgos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤖', t: 'Confiar en que la IA es objetiva', p: 0, fb: 'La IA hereda sesgos de sus datos.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Advierte sobre el sesgo', claves: ['sesgo', 'injust', 'penaliz', 'no es neutral', 'discrimin'] },
            { n: 'Identifica grupos afectados', claves: ['kichwa', 'bilingue', 'variantes', 'espanol amazonico', 'forma de escribir'] },
            { n: 'Propone probar y comparar', claves: ['probar', 'muestra', 'comparar', 'piloto', 'evaluar', 'verificar'] }
          ],
          evitar: [ { claves: ['siempre es objetiva', 'la maquina no se equivoca'], fb: 'La IA no es neutral.' } ],
          modelo: 'Puede tener sesgo y penalizar a estudiantes bilingües kichwa-español o variantes del español amazónico. Hay que probarla con una muestra y comparar con la calificación docente.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Elaborar una rúbrica clara para la IA y el docente', p: 2, fb: 'Criterios explícitos mejoran la coherencia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📢', t: 'Redactar un aviso para estudiantes y familias', p: 2, fb: 'La transparencia genera confianza.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤫', t: 'Usarla sin informar a nadie', p: 0, fb: 'Falta de transparencia en decisiones que afectan a estudiantes.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'La IA como apoyo con decisión humana', claves: ['apoyo', 'docente decide', 'nota final', 'supervision', 'revision humana', 'el docente'] },
            { n: 'Transparencia con la comunidad educativa', claves: ['informar', 'transparen', 'familias', 'estudiantes sepan', 'aviso', 'comunicar'] },
            { n: 'Reglas claras y documentadas', claves: ['rubrica', 'reglas', 'document', 'criterios', 'politica', 'buenas practicas'] }
          ],
          evitar: [ { claves: ['sin decirle a nadie', 'que califique sola'], fb: 'Sin supervisión ni transparencia el uso de IA es irresponsable.' } ],
          modelo: 'La usaremos como apoyo con una rúbrica clara, pero la nota final la decide el docente; informaremos a estudiantes y familias y documentaremos las reglas de uso.'
        }
      ]
    }
  }
]);
