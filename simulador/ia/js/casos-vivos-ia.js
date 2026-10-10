/* Casos vivos – Inteligencia Artificial: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {

  /* ---------- 1. El cliente quiere usar datos personales sin consentimiento ---------- */
  'datos-sin-consentimiento': {
    lugar: 'Oficina de gerencia de una cadena de farmacias, Puyo',
    fondo: 'oficina',
    inicio: { confianza: 55, tension: 45 },
    pasos: [
      {
        acciones: [
          { icono: '🛑', t: 'Cerrar el archivo sin procesar los datos', p: 2, fb: 'No tratar datos sensibles sin base legal es la primera medida de protección.', efecto: { confianza: -2, tension: 6 } },
          { icono: '📖', t: 'Mostrarle qué dice la LOPDP sobre datos de salud', p: 2, fb: 'Fundamentar con la norma convierte tu negativa en una orientación profesional.', efecto: { confianza: 6, tension: 2 } },
          { icono: '💾', t: 'Copiar la base a tu laptop para empezar', p: 0, fb: 'Copiar datos sensibles sin autorización multiplica el riesgo de fuga.', efecto: { confianza: 8, tension: -6 } },
          { icono: '✂️', t: 'Borrar solo la columna de nombres', p: 1, fb: 'La cédula y el diagnóstico siguen identificando a las personas.', efecto: { confianza: 3, tension: 0 } }
        ],
        conceptos: [
          { n: 'Reconoce que son datos sensibles de salud', claves: ['sensible', 'salud', 'diagnostic', 'medic', 'datos personales', 'informacion personal'] },
          { n: 'Exige base legal y consentimiento', claves: ['consentimiento', 'autoriz', 'permiso', 'base legal', 'lopdp', 'ley de proteccion', 'proteccion de datos'] },
          { n: 'Se niega con respeto y propone revisar el uso', claves: ['no puedo', 'no es posible', 'no podemos', 'propongo', 'le sugiero', 'alternativa', 'con respeto', 'entiendo'] }
        ],
        evitar: [
          { claves: ['nadie se va a enterar', 'nadie se entera', 'lo hago igual'], fb: 'Tratar datos sensibles a escondidas es una falta legal y ética.' },
          { claves: ['empiezo hoy', 'de una vez lo proceso', 'como usted diga'], fb: 'Aceptar sin base legal expone a las personas y al profesional.' }
        ],
        modelo: 'Entiendo que quiere vender más, pero no puedo usar esta base: son datos de salud, datos sensibles, y la LOPDP exige base legal y consentimiento específico para usarlos en promociones. Le propongo otra alternativa.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Diseñar un formulario de autorización voluntaria', p: 2, fb: 'El consentimiento libre, específico e informado permite el tratamiento legítimo.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📊', t: 'Proponer usar datos agregados sin diagnósticos', p: 2, fb: 'La minimización reduce el riesgo y mantiene el valor del análisis.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🛒', t: 'Buscar una base de datos para comprar', p: 0, fb: 'Las bases de origen dudoso agravan el problema legal.', efecto: { confianza: 4, tension: 8 } },
          { icono: '📣', t: 'Sugerir solo promociones generales', p: 1, fb: 'Es seguro, pero no aporta la innovación que el cliente busca.', efecto: { confianza: -4, tension: 2 } }
        ],
        conceptos: [
          { n: 'Propone un programa voluntario con consentimiento', claves: ['voluntari', 'consentimiento', 'autoricen', 'autorizacion', 'acepten', 'aceptan', 'por escrito', 'informado'] },
          { n: 'Aplica minimización de datos', claves: ['minimiz', 'solo los datos necesarios', 'agregad', 'sin diagnostic', 'anonim', 'seudonim', 'menos datos'] },
          { n: 'Destaca el beneficio para la confianza del negocio', claves: ['confianza', 'imagen', 'reputacion', 'clientes valoran', 'transparen', 'fideliz', 'seguridad'] }
        ],
        evitar: [ { claves: ['comprar una base', 'compremos datos', 'base de otra empresa'], fb: 'Comprar datos de origen dudoso agrava el riesgo legal.' } ],
        modelo: 'Propongo un programa voluntario: los clientes autorizan por escrito, con consentimiento informado, el uso de sus compras para ofertas. Usaremos datos agregados y sin diagnósticos, y eso además mejora la confianza en la farmacia.'
      },
      {
        acciones: [
          { icono: '📧', t: 'Responder el correo por escrito explicando los riesgos', p: 2, fb: 'Dejar constancia escrita protege al profesional y orienta al cliente.', efecto: { confianza: 4, tension: 4 } },
          { icono: '🗂️', t: 'Registrar la decisión en la bitácora del proyecto', p: 2, fb: 'La documentación permite rendir cuentas.', efecto: { confianza: 2, tension: 0 } },
          { icono: '🌙', t: 'Procesar la base original a escondidas', p: 0, fb: 'Es una falta ética y legal grave.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🙈', t: 'Ignorar el correo y esperar', p: 1, fb: 'Evitar el tema no elimina el riesgo.', efecto: { confianza: -6, tension: 8 } }
        ],
        conceptos: [
          { n: 'Responde por escrito y deja constancia', claves: ['por escrito', 'correo', 'constancia', 'documento', 'registr', 'respaldo'] },
          { n: 'Explica los riesgos legales y para las personas', claves: ['riesgo', 'sancion', 'multa', 'ley', 'lopdp', 'dano', 'perjuicio'] },
          { n: 'Mantiene la negativa y ofrece la vía correcta', claves: ['no procesare', 'no voy a procesar', 'me niego', 'no puedo', 'programa voluntario', 'con consentimiento', 'alternativa'] }
        ],
        evitar: [ { claves: ['a escondidas', 'en secreto', 'sin que sepan'], fb: 'Procesar datos a escondidas es una falta grave.' } ],
        modelo: 'Le respondo por escrito y dejo constancia: no puedo procesar la base original sin consentimiento porque implica riesgos de sanción según la LOPDP y daño a sus clientes. Sigamos con el programa voluntario.'
      }
    ]
  },

  /* ---------- 2. El modelo discrimina a un grupo ---------- */
  'modelo-discrimina': {
    lugar: 'Sala de reuniones de una cooperativa de ahorro y crédito, Pastaza',
    fondo: 'oficina',
    inicio: { confianza: 50, tension: 50 },
    pasos: [
      {
        acciones: [
          { icono: '📊', t: 'Proyectar las métricas desagregadas por grupo', p: 2, fb: 'Los datos por grupo muestran el sesgo que el promedio esconde.', efecto: { confianza: 8, tension: 4 } },
          { icono: '🧮', t: 'Calcular la tasa de rechazo de cada grupo', p: 2, fb: 'Comparar tasas de rechazo con historiales similares evidencia el trato desigual.', efecto: { confianza: 6, tension: 2 } },
          { icono: '✅', t: 'Aprobar el modelo por su 88 % de exactitud', p: 0, fb: 'La exactitud global no garantiza un trato justo.', efecto: { confianza: 6, tension: -6 } },
          { icono: '💭', t: 'Comentar una sospecha sin datos', p: 1, fb: 'Sin evidencia es difícil convencer.', efecto: { confianza: -2, tension: 4 } }
        ],
        conceptos: [
          { n: 'Advierte que la exactitud global oculta el problema', claves: ['promedio', 'exactitud', 'global', 'general', 'esconde', 'oculta', 'no basta'] },
          { n: 'Muestra las métricas por grupo', claves: ['por grupo', 'desagreg', 'cada grupo', 'tasa de rechazo', 'comunidades', 'kichwa', 'shuar'] },
          { n: 'Nombra el sesgo y la necesidad de corregirlo', claves: ['sesgo', 'discrimin', 'injust', 'equidad', 'corregir', 'desigual'] }
        ],
        evitar: [ { claves: ['asi lo dejamos', 'es suficiente', 'no hace falta revisar'], fb: 'Ignorar el sesgo convierte al modelo en una herramienta de discriminación.' } ],
        modelo: 'El 88 % de exactitud es un promedio global que oculta el problema: por grupo, la tasa de rechazo de los solicitantes de comunidades kichwa y shuar es el doble con historiales similares. Es un sesgo que debemos corregir.'
      },
      {
        acciones: [
          { icono: '🔍', t: 'Revisar qué variables actúan como sustitutos', p: 2, fb: 'La parroquia o el tipo de ingreso pueden reemplazar a la etnia de forma indirecta.', efecto: { confianza: 8, tension: -4 } },
          { icono: '⚖️', t: 'Rebalancear los datos y reentrenar', p: 2, fb: 'Más datos representativos reducen el sesgo.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🗣️', t: 'Decir que esos grupos pagan menos', p: 0, fb: 'Es un prejuicio sin evidencia.', efecto: { confianza: -12, tension: 12 } },
          { icono: '✂️', t: 'Eliminar la variable parroquia y nada más', p: 1, fb: 'Puede ayudar, pero hay que medir de nuevo.', efecto: { confianza: 2, tension: 0 } }
        ],
        conceptos: [
          { n: 'Explica las variables sustitutas', claves: ['sustitut', 'proxy', 'indirect', 'parroquia', 'tipo de ingreso', 'variable'] },
          { n: 'Señala la subrepresentación en los datos', claves: ['pocos datos', 'representa', 'subrepresent', 'desbalance', 'datos historicos', 'muestra'] },
          { n: 'Propone corregir y medir de nuevo', claves: ['rebalanc', 'reentren', 'medir de nuevo', 'volver a medir', 'ajustar', 'corregir', 'revisar'] }
        ],
        evitar: [ { claves: ['pagan menos', 'refleja la realidad', 'son malos pagadores'], fb: 'Es un prejuicio sin evidencia que perpetúa la discriminación.' } ],
        modelo: 'Aunque no use la etnia, variables como la parroquia actúan como sustitutos, y hay pocos datos de esos grupos, así que están subrepresentados. Vamos a rebalancear, reentrenar y medir de nuevo por grupo.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Documentar el hallazgo en la ficha del modelo', p: 2, fb: 'La documentación permite rendir cuentas y dar seguimiento.', efecto: { confianza: 6, tension: -2 } },
          { icono: '🧑‍⚖️', t: 'Proponer revisión humana de los rechazos', p: 2, fb: 'La supervisión humana protege a las personas afectadas.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🗑️', t: 'Borrar el informe de sesgo', p: 0, fb: 'Ocultar evidencia de discriminación es una falta grave.', efecto: { confianza: 4, tension: 10 } }
        ],
        conceptos: [
          { n: 'Documenta e informa a la gerencia', claves: ['document', 'informe', 'ficha del modelo', 'gerencia', 'comite', 'comunicar'] },
          { n: 'Propone revisión humana', claves: ['revision humana', 'supervision humana', 'persona revise', 'analista revise', 'humano'] },
          { n: 'Establece monitoreo periódico de equidad', claves: ['monitoreo', 'monitorear', 'periodic', 'seguimiento', 'cada mes', 'auditoria', 'equidad'] }
        ],
        evitar: [ { claves: ['borrar el informe', 'que nadie sepa', 'lo ocultamos'], fb: 'Ocultar el sesgo agrava el daño y la responsabilidad.' } ],
        modelo: 'Voy a documentar el hallazgo en la ficha del modelo e informar a la gerencia. Propongo revisión humana de todos los rechazos y un monitoreo periódico de equidad por grupo.'
      }
    ]
  },

  /* ---------- 3. El jefe quiere ocultar errores del modelo ---------- */
  'ocultar-errores': {
    lugar: 'Oficina de una empresa de tecnología, la noche antes de la presentación',
    fondo: 'oficina',
    inicio: { confianza: 50, tension: 60 },
    pasos: [
      {
        acciones: [
          { icono: '📈', t: 'Mostrarle la gráfica de errores por edad', p: 2, fb: 'La evidencia ayuda a dimensionar el riesgo para los pacientes.', efecto: { confianza: 4, tension: 4 } },
          { icono: '🛠️', t: 'Preparar una diapositiva con plan de mejora', p: 2, fb: 'Presentar el problema junto con la solución reduce el temor a perder el contrato.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🗑️', t: 'Eliminar la diapositiva de errores', p: 0, fb: 'Ocultar fallas en salud puede causar daños graves.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🔎', t: 'Reducir la diapositiva a letra pequeña', p: 1, fb: 'Minimizar la información sigue siendo poco transparente.', efecto: { confianza: 2, tension: 0 } }
        ],
        conceptos: [
          { n: 'Explica el riesgo para los adultos mayores', claves: ['adultos mayores', 'pacientes', 'dano', 'riesgo', 'salud', 'falla'] },
          { n: 'Defiende la transparencia con el cliente', claves: ['transparen', 'honest', 'enganar', 'ocultar', 'informar', 'verdad'] },
          { n: 'Propone presentar un plan de mejora', claves: ['plan de mejora', 'plan', 'mejorar', 'solucion', 'mitig', 'propongo'] }
        ],
        evitar: [ { claves: ['la quito', 'usted manda', 'mejor no decir'], fb: 'Ocultar fallas por presión es una falta profesional.' } ],
        modelo: 'Ingeniero, ocultar que el modelo falla con adultos mayores es engañar al hospital y pone en riesgo a los pacientes. Propongo presentar la falla con transparencia junto con un plan de mejora.'
      },
      {
        acciones: [
          { icono: '🧑‍⚕️', t: 'Proponer que un profesional revise esos casos', p: 2, fb: 'La revisión humana mitiga el riesgo mientras se mejora el modelo.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🗓️', t: 'Calendarizar la mejora con más datos', p: 2, fb: 'Un plazo concreto da confianza al cliente.', efecto: { confianza: 6, tension: -4 } },
          { icono: '💯', t: 'Escribir "modelo perfecto" en la portada', p: 0, fb: 'Es una afirmación falsa.', efecto: { confianza: 4, tension: 6 } }
        ],
        conceptos: [
          { n: 'Comunica que funciona bien en general pero falla en un grupo', claves: ['en general', 'funciona bien', 'falla', 'un grupo', 'adultos mayores', 'limitacion'] },
          { n: 'Propone revisión humana como mitigación', claves: ['revision humana', 'medico revise', 'profesional revise', 'supervision', 'humano'] },
          { n: 'Ofrece un plazo de mejora con más datos', claves: ['plazo', 'mas datos', 'reentren', 'semanas', 'mejora', 'calendario'] }
        ],
        evitar: [ { claves: ['es perfecto', 'no falla nunca', 'cien por ciento'], fb: 'Prometer perfección es engañoso.' } ],
        modelo: 'Le diremos al hospital que el modelo funciona bien en general, pero falla con un grupo, los adultos mayores; mientras tanto proponemos revisión humana de esos casos y un plazo de cuatro semanas para mejorarlo con más datos.'
      },
      {
        acciones: [
          { icono: '🗂️', t: 'Registrar el hallazgo en la documentación', p: 2, fb: 'La trazabilidad permite el seguimiento.', efecto: { confianza: 4, tension: -2 } },
          { icono: '📏', t: 'Definir métricas por grupo de edad', p: 2, fb: 'Medir por grupo permite verificar la mejora.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📱', t: 'Publicar el problema en redes sociales', p: 0, fb: 'Primero se usan los canales internos.', efecto: { confianza: -14, tension: 14 } }
        ],
        conceptos: [
          { n: 'Documenta el hallazgo y la decisión', claves: ['document', 'registr', 'bitacora', 'informe', 'repositorio'] },
          { n: 'Mide el desempeño por grupo de edad', claves: ['por grupo', 'por edad', 'metricas', 'recall', 'desagreg', 'medir'] },
          { n: 'Da seguimiento al plan de mejora', claves: ['seguimiento', 'plan de mejora', 'revisar', 'avance', 'monitore', 'reunion'] }
        ],
        evitar: [ { claves: ['redes sociales', 'lo publico', 'hacerlo viral'], fb: 'Exponer el caso en redes rompe la confidencialidad; usa los canales internos.' } ],
        modelo: 'Voy a documentar el hallazgo en el repositorio, definir métricas por grupo de edad y dar seguimiento semanal al plan de mejora con el equipo.'
      }
    ]
  },

  /* ---------- 4. Un usuario mayor no entiende el chatbot ---------- */
  'chatbot-adulto-mayor': {
    lugar: 'Ventanilla de atención del municipio, junto al quiosco del chatbot',
    fondo: 'oficina',
    inicio: { confianza: 30, tension: 70 },
    pasos: [
      {
        acciones: [
          { icono: '🪑', t: 'Ofrecerle una silla y escucharlo con calma', p: 2, fb: 'La escucha activa baja la tensión y muestra respeto.', efecto: { confianza: 12, tension: -12 } },
          { icono: '🧾', t: 'Ayudarle a pagar el predio en el sistema', p: 2, fb: 'Resolver su necesidad inmediata es lo primero.', efecto: { confianza: 10, tension: -8 } },
          { icono: '👉', t: 'Señalarle el quiosco para que lo intente otra vez', p: 0, fb: 'Devolverlo al sistema que no le funciona aumenta la frustración.', efecto: { confianza: -10, tension: 12 } }
        ],
        conceptos: [
          { n: 'Muestra empatía y respeto', claves: ['entiendo', 'disculpe', 'tiene razon', 'con gusto', 'tranquilo', 'don segundo', 'paciencia'] },
          { n: 'Resuelve el trámite de inmediato', claves: ['le ayudo', 'ayudarle', 'pagar el predio', 'tramite', 'ahora mismo', 'lo hacemos juntos', 'yo le ayudo'] },
          { n: 'Se compromete a mejorar el sistema', claves: ['mejorar', 'vamos a corregir', 'arreglar', 'el sistema debe', 'reportar', 'sistema'] }
        ],
        evitar: [ { claves: ['escriba bien', 'es facil', 'todos lo usan'], fb: 'Culpar o minimizar la dificultad del usuario excluye.' } ],
        modelo: 'Disculpe, don Segundo, tiene razón: el sistema debe entenderle a usted. Yo le ayudo ahora mismo a pagar el predio y voy a reportar el problema para mejorar el chatbot.'
      },
      {
        acciones: [
          { icono: '🗒️', t: 'Anotar su frase como ejemplo para entrenar', p: 2, fb: 'Los ejemplos reales con variantes mejoran el modelo de PLN.', efecto: { confianza: 6, tension: -4 } },
          { icono: '💬', t: 'Explicarle con una comparación sencilla', p: 2, fb: 'El lenguaje claro hace comprensible la tecnología.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🤖', t: 'Darle una explicación técnica sobre intenciones', p: 0, fb: 'La jerga técnica lo excluye aún más.', efecto: { confianza: -8, tension: 8 } }
        ],
        conceptos: [
          { n: 'Explica que el chatbot aprende de ejemplos', claves: ['aprende', 'ejemplos', 'entrena', 'ensenar', 'practica'] },
          { n: 'Reconoce que faltaban variantes reales', claves: ['ortografia', 'como habla', 'palabras locales', 'errores', 'variantes', 'kichwa', 'no tenia'] },
          { n: 'Propone agregar esos ejemplos', claves: ['agregar', 'anadir', 'incluir', 'sumar', 'mas ejemplos', 'su frase'] }
        ],
        evitar: [ { claves: ['usted escribe mal', 'no sabe escribir', 'es culpa suya'], fb: 'Culpar al usuario es discriminatorio.' } ],
        modelo: 'El chatbot aprende de ejemplos, como un estudiante, y no tenía ejemplos escritos como habla la gente, con errores de ortografía o palabras locales. Vamos a agregar su frase y muchas más.'
      },
      {
        acciones: [
          { icono: '🙋', t: 'Agregar el botón "hablar con una persona"', p: 2, fb: 'La opción humana garantiza la atención a todos.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🎤', t: 'Proponer entrada por voz', p: 2, fb: 'La voz facilita el uso a quien no escribe con soltura.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📚', t: 'Imprimir un manual de 20 páginas', p: 1, fb: 'Pocos lo leerán; mejor simplificar el sistema.', efecto: { confianza: 0, tension: 2 } },
          { icono: '🤷', t: 'Dejar el chatbot como está', p: 0, fb: 'Excluye a quienes más necesitan el servicio.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Lenguaje sencillo en los mensajes', claves: ['lenguaje sencillo', 'palabras sencillas', 'lenguaje claro', 'sin tecnicismos', 'mensajes claros', 'facil de entender'] },
          { n: 'Opción de atención humana y por voz', claves: ['persona', 'humano', 'voz', 'hablar', 'llamar', 'atencion presencial'] },
          { n: 'Pruebas con usuarios diversos', claves: ['pruebas', 'probar', 'adultos mayores', 'kichwa', 'usuarios reales', 'inclusi', 'accesib'] }
        ],
        evitar: [ { claves: ['ya se acostumbraran', 'que aprendan', 'no hay que cambiar'], fb: 'El sistema debe adaptarse a las personas.' } ],
        modelo: 'Propongo mensajes en lenguaje sencillo, la opción de hablar con una persona o usar la voz, y hacer pruebas del chatbot con adultos mayores y hablantes de kichwa para que sea inclusivo.'
      }
    ]
  },

  /* ---------- 5. Filtración de credenciales en un repositorio ---------- */
  'credenciales-repo': {
    lugar: 'Videollamada del equipo de desarrollo',
    fondo: 'oficina',
    inicio: { confianza: 45, tension: 70 },
    pasos: [
      {
        acciones: [
          { icono: '🔑', t: 'Revocar y rotar la clave expuesta', p: 2, fb: 'Invalidar la credencial contiene el incidente de inmediato.', efecto: { confianza: 8, tension: -10 } },
          { icono: '📜', t: 'Revisar los registros de acceso a la base', p: 2, fb: 'Permite saber si alguien usó la clave.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🧽', t: 'Solo borrar la clave del archivo', p: 1, fb: 'El historial del repositorio la conserva.', efecto: { confianza: 2, tension: 2 } },
          { icono: '😌', t: 'Decirle que no pasa nada', p: 0, fb: 'Hay robots que rastrean claves expuestas en minutos.', efecto: { confianza: 6, tension: -2 } }
        ],
        conceptos: [
          { n: 'Revocar y cambiar la clave de inmediato', claves: ['revoc', 'rotar', 'cambiar la clave', 'cambia la clave', 'nueva clave', 'invalidar', 'de inmediato'] },
          { n: 'Explica que el historial conserva la clave', claves: ['historial', 'commit', 'sigue ahi', 'queda guardad', 'repositorio'] },
          { n: 'Revisa los accesos para detectar uso indebido', claves: ['registros', 'logs', 'accesos', 'quien entro', 'uso indebido', 'revisar'] }
        ],
        evitar: [ { claves: ['no pasa nada', 'nadie revisa', 'solo borrala'], fb: 'Minimizar una credencial expuesta deja abierto el acceso.' } ],
        modelo: 'Lo primero es revocar y rotar la clave de inmediato, porque aunque la borres, el historial del repositorio la conserva. Luego revisamos los registros de accesos para ver si hubo uso indebido.'
      },
      {
        acciones: [
          { icono: '📣', t: 'Informar al responsable de seguridad', p: 2, fb: 'La gestión del incidente requiere a quien tiene esa responsabilidad.', efecto: { confianza: 6, tension: 2 } },
          { icono: '📋', t: 'Evaluar si se expusieron datos personales', p: 2, fb: 'De ello depende la obligación de notificar.', efecto: { confianza: 6, tension: -2 } },
          { icono: '🤐', t: 'Acordar no decir nada a nadie', p: 0, fb: 'Ocultar un incidente agrava el daño.', efecto: { confianza: 8, tension: -6 } }
        ],
        conceptos: [
          { n: 'Informa al responsable y al cliente', claves: ['informar', 'responsable de seguridad', 'jefe', 'cliente', 'avisar', 'comunicar'] },
          { n: 'Evalúa el impacto en los datos', claves: ['datos personales', 'impacto', 'expuest', 'evaluar', 'accesos indebidos', 'afectad'] },
          { n: 'Sigue el protocolo de notificación', claves: ['notific', 'protocolo', 'lopdp', 'autoridad', 'procedimiento', 'reporte'] }
        ],
        evitar: [ { claves: ['entre nosotros', 'nadie se entera', 'no contamos'], fb: 'Ocultar un incidente de seguridad es una falta grave.' } ],
        modelo: 'Sí, debemos informar al responsable de seguridad y al cliente. Evaluamos si hubo accesos indebidos o datos personales expuestos y, si fue así, seguimos el protocolo de notificación de la LOPDP.'
      },
      {
        acciones: [
          { icono: '🔐', t: 'Configurar un gestor de secretos', p: 2, fb: 'Las claves fuera del código evitan que vuelvan a filtrarse.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🤖', t: 'Activar escaneo automático de secretos', p: 2, fb: 'Detecta claves antes de que lleguen al repositorio.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🚫', t: 'Quitarle el acceso al repositorio a Kevin', p: 0, fb: 'Castigar no corrige el proceso y genera miedo a reportar.', efecto: { confianza: -12, tension: 10 } }
        ],
        conceptos: [
          { n: 'Usar gestor de secretos o variables de entorno', claves: ['gestor de secretos', 'variables de entorno', 'boveda', 'fuera del codigo', 'secretos'] },
          { n: 'Controles automáticos y permisos mínimos', claves: ['escaneo', 'automatic', 'antes de cada commit', 'permisos minimos', 'minimo privilegio', 'alerta'] },
          { n: 'Capacitación sin culpas', claves: ['capacit', 'aprender', 'sin culpa', 'sin culpar', 'cultura', 'todos podemos', 'taller'] }
        ],
        evitar: [ { claves: ['es tu culpa', 'te vamos a sancionar', 'castigo'], fb: 'Una cultura de culpa hace que los errores se oculten.' } ],
        modelo: 'Propongo usar un gestor de secretos y variables de entorno, activar escaneo automático antes de cada commit con permisos mínimos, y hacer una capacitación breve sin culpar a nadie.'
      }
    ]
  },

  /* ---------- 6. La comunidad desconfía de una cámara con reconocimiento facial ---------- */
  'reconocimiento-facial': {
    lugar: 'Casa comunal de una comunidad kichwa cercana a Puyo',
    fondo: 'comunidad',
    inicio: { confianza: 30, tension: 70 },
    pasos: [
      {
        acciones: [
          { icono: '👂', t: 'Escuchar a la dirigente sin interrumpir', p: 2, fb: 'Reconocer la preocupación es el primer paso para el diálogo.', efecto: { confianza: 12, tension: -10 } },
          { icono: '📷', t: 'Mostrar qué capta la cámara y qué guarda', p: 2, fb: 'La transparencia permite una decisión informada.', efecto: { confianza: 8, tension: -4 } },
          { icono: '📄', t: 'Leer la resolución que aprueba la cámara', p: 0, fb: 'Imponer la decisión rompe la confianza.', efecto: { confianza: -12, tension: 14 } }
        ],
        conceptos: [
          { n: 'Reconoce la preocupación de la comunidad', claves: ['entiendo', 'tiene razon', 'su preocupacion', 'es valida', 'comprendo', 'mama rosa'] },
          { n: 'Explica que el rostro es un dato biométrico sensible', claves: ['biometric', 'sensible', 'rostro', 'cara', 'datos personales', 'imagenes'] },
          { n: 'Afirma que se requiere consulta y consentimiento', claves: ['consulta', 'consentimiento', 'asamblea', 'decidir', 'preguntar', 'participacion'] }
        ],
        evitar: [ { claves: ['ya esta aprobada', 'no hay nada que discutir', 'no se preocupe'], fb: 'Imponer o minimizar la preocupación vulnera la participación.' } ],
        modelo: 'Entiendo su preocupación, mama Rosa, es válida: el rostro es un dato biométrico sensible. Nada debería instalarse sin consulta y consentimiento de la comunidad en asamblea.'
      },
      {
        acciones: [
          { icono: '📊', t: 'Mostrar estudios sobre errores por grupo', p: 2, fb: 'Reconocer sesgos documentados genera credibilidad.', efecto: { confianza: 8, tension: -4 } },
          { icono: '🔦', t: 'Presentar alternativas menos invasivas', p: 2, fb: 'Iluminación o vigilancia comunitaria pueden lograr el fin con menos riesgo.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🙄', t: 'Decir que la tecnología es neutral', p: 0, fb: 'La tecnología depende de los datos con que se entrena.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Reconoce los sesgos conocidos', claves: ['es cierto', 'sesgo', 'mas errores', 'se equivoca', 'poco representad', 'datos de entrenamiento'] },
          { n: 'Propone alternativas menos invasivas', claves: ['alternativa', 'menos invasiv', 'iluminacion', 'vigilancia comunitaria', 'sin reconocimiento', 'otra opcion'] },
          { n: 'Evaluar antes de decidir', claves: ['evaluar', 'revisar', 'antes de decidir', 'precision por grupo', 'pruebas', 'analizar'] }
        ],
        evitar: [ { claves: ['es neutral', 'es un mito', 'la maquina no se equivoca'], fb: 'Negar los sesgos conocidos es falso y rompe la confianza.' } ],
        modelo: 'Es cierto: muchos sistemas tienen más errores con grupos poco representados en sus datos de entrenamiento. Propongo evaluar alternativas menos invasivas, como mejor iluminación o vigilancia comunitaria, antes de decidir.'
      },
      {
        acciones: [
          { icono: '✍️', t: 'Redactar con la asamblea un acuerdo escrito', p: 2, fb: 'Un acuerdo explícito da legitimidad y límites claros.', efecto: { confianza: 10, tension: -8 } },
          { icono: '🗳️', t: 'Proponer que la asamblea vote', p: 2, fb: 'La decisión colectiva respeta la autonomía de la comunidad.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🌙', t: 'Instalar la cámara de noche', p: 0, fb: 'Es una imposición inaceptable.', efecto: { confianza: -18, tension: 18 } }
        ],
        conceptos: [
          { n: 'Finalidad limitada y opción sin reconocimiento', claves: ['finalidad', 'solo para', 'limitad', 'sin reconocimiento facial', 'proporcional', 'uso definido'] },
          { n: 'Define acceso y tiempo de conservación', claves: ['quien accede', 'acceso', 'conservacion', 'cuanto tiempo', 'dias', 'borrar', 'eliminar'] },
          { n: 'La comunidad decide', claves: ['asamblea', 'comunidad decida', 'votar', 'acuerdo', 'decidir juntos', 'consentimiento'] }
        ],
        evitar: [ { claves: ['de noche', 'sin avisar', 'a escondidas'], fb: 'Imponer la tecnología vulnera los derechos de la comunidad.' } ],
        modelo: 'Propongo un acuerdo escrito con finalidad limitada, la opción sin reconocimiento facial, quién accede a las imágenes y cuánto tiempo se conservan antes de borrarlas; y que la asamblea decida.'
      }
    ]
  }
});
