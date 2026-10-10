/* Prácticas por asignatura – Administración de Sistemas de Salud (Período 3–4) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== ASS-13 Talento Humano ===================== */
  {
    id: 'asig-ASS-13', cod: 'ASS-13',
    titulo: 'Seleccionar e integrar a un auxiliar de admisión',
    asignaturas: ['ASS-13'],
    persona: { nombre: 'Psic. Lorena Calapucha', rol: 'Analista de Talento Humano del distrito', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'El centro de salud necesita un auxiliar de admisión. La analista de Talento Humano te pide apoyar el perfil del puesto, la entrevista y la inducción del nuevo servidor.',
    objetivo: 'Aplicar procesos de talento humano: análisis del puesto, selección por méritos sin discriminación, inducción y evaluación del desempeño.',
    pasos: [
      { dice: '¿Qué debe tener el perfil del puesto?', opciones: [
          { t: 'Funciones, formación, experiencia y competencias del puesto (atención al usuario, manejo del sistema, kichwa deseable), sin requisitos discriminatorios.', p: 2, r: 'Muy completo y justo.', fb: 'El perfil se basa en las funciones y competencias del puesto, no en características personales.' },
          { t: 'Solo el título de bachiller.', p: 1, r: 'Falta detallar competencias.', fb: 'Un perfil incompleto dificulta la selección.' },
          { t: 'Que sea joven y de buena presencia.', p: 0, r: 'Eso es discriminatorio.', fb: 'Edad o apariencia no son requisitos válidos.' } ] },
      { dice: 'En la entrevista, ¿qué preguntas harías?', opciones: [
          { t: 'Preguntas por competencias, iguales para todos los candidatos, con una rúbrica de calificación y sin preguntar sobre embarazo, religión o vida privada.', p: 2, r: 'Así comparamos con equidad.', fb: 'La entrevista estructurada por competencias es objetiva y no discriminatoria.' },
          { t: 'Conversar libremente y decidir por intuición.', p: 1, r: 'Muy subjetivo.', fb: 'Sin criterios comunes no se compara con justicia.' },
          { t: 'Le pregunto si piensa tener hijos pronto.', p: 0, r: 'Esa pregunta no procede.', fb: 'Indagar sobre embarazo es discriminatorio.' } ] },
      { dice: 'Ya ingresó Mateo. ¿Cómo lo integramos?', opciones: [
          { t: 'Programa de inducción: presentación del equipo, normas de confidencialidad, manejo del sistema, acompañamiento de un tutor y metas para la evaluación del desempeño.', p: 2, r: 'Así se adaptará rápido.', fb: 'La inducción y las metas claras facilitan el desempeño.' },
          { t: 'Darle el manual para que lo lea.', p: 1, r: 'Ayuda, pero no basta.', fb: 'Falta acompañamiento práctico.' },
          { t: 'Ponerlo directo en la ventanilla para que aprenda solo.', p: 0, r: 'Va a cometer errores.', fb: 'Sin inducción se arriesga la calidad y la confidencialidad.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de Talento Humano del distrito de salud', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '📋', t: 'Listar las funciones reales del puesto', p: 2, fb: 'El análisis del puesto es la base del perfil.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎓', t: 'Definir formación y competencias requeridas', p: 2, fb: 'Las competencias orientan la selección.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📸', t: 'Pedir fotografía y edad máxima', p: 0, fb: 'Son requisitos discriminatorios.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Funciones del puesto', claves: ['funciones', 'puesto', 'tareas', 'admision', 'analisis del puesto'] },
            { n: 'Formación y competencias', claves: ['formacion', 'competencias', 'experiencia', 'atencion al usuario', 'kichwa', 'sistema'] },
            { n: 'Sin discriminación', claves: ['sin discrimin', 'igualdad', 'no discrimin', 'equidad', 'inclusion', 'meritos'] }
          ],
          evitar: [ { claves: ['buena presencia', 'que sea joven', 'edad maxima'], fb: 'Edad o apariencia son requisitos discriminatorios.' } ],
          modelo: 'El perfil debe incluir las funciones del puesto de admisión, la formación, la experiencia y las competencias de atención al usuario y manejo del sistema, con kichwa deseable, sin requisitos que discriminen: seleccionamos por méritos.'
        },
        {
          acciones: [
            { icono: '🧾', t: 'Preparar la rúbrica de calificación', p: 2, fb: 'La rúbrica da objetividad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '❓', t: 'Escribir las mismas preguntas para todos', p: 2, fb: 'Las preguntas comunes permiten comparar.', efecto: { confianza: 6, tension: -3 } },
            { icono: '👶', t: 'Preguntar si planea tener hijos', p: 0, fb: 'Es una pregunta discriminatoria.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Entrevista por competencias', claves: ['competencias', 'situaciones', 'ejemplo', 'como actuaria', 'estructurada'] },
            { n: 'Mismas preguntas y rúbrica', claves: ['mismas preguntas', 'iguales para todos', 'rubrica', 'puntaje', 'calific'] },
            { n: 'Respeto a la vida privada', claves: ['vida privada', 'embarazo', 'religion', 'no preguntar', 'discrimin', 'privacidad'] }
          ],
          evitar: [ { claves: ['tener hijos', 'esta casada', 'que religion'], fb: 'Estas preguntas son discriminatorias.' } ],
          modelo: 'Haré una entrevista estructurada por competencias, con las mismas preguntas para todos y una rúbrica de calificación. No preguntaré sobre embarazo, religión ni vida privada.'
        },
        {
          acciones: [
            { icono: '🤝', t: 'Presentarlo al equipo del centro', p: 2, fb: 'La integración social facilita la adaptación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧑‍🏫', t: 'Asignarle un tutor durante dos semanas', p: 2, fb: 'El acompañamiento práctico reduce errores.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🏊', t: 'Dejarlo solo en ventanilla el primer día', p: 0, fb: 'Arriesga la calidad y la confidencialidad.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Programa de inducción', claves: ['induccion', 'presentar', 'equipo', 'bienvenida', 'normas'] },
            { n: 'Acompañamiento y capacitación', claves: ['tutor', 'acompan', 'capacit', 'sistema', 'confidencialidad'] },
            { n: 'Metas para evaluar el desempeño', claves: ['metas', 'evaluacion del desempeno', 'desempeno', 'objetivos', 'seguimiento'] }
          ],
          evitar: [ { claves: ['que aprenda solo', 'sin induccion'], fb: 'Sin inducción se arriesga el servicio.' } ],
          modelo: 'Haremos un programa de inducción: lo presento al equipo, le explico las normas de confidencialidad y el sistema, con un tutor que lo acompañe, y fijamos metas para la evaluación del desempeño.'
        }
      ]
    }
  },

  /* ===================== ASS-14 Administración de Sistemas de Salud II ===================== */
  {
    id: 'asig-ASS-14', cod: 'ASS-14',
    titulo: 'Indicadores de producción y planificación anual',
    asignaturas: ['ASS-14'],
    persona: { nombre: 'Mgs. Wilson Santi', rol: 'Responsable de planificación del distrito de salud', avatar: '👨🏽‍💼', pitch: 0.95 },
    contexto: 'El distrito revisa el desempeño del centro de salud: hay médicos con agendas llenas y otros con muchas horas libres. Debes analizar la producción y proponer metas para el próximo año.',
    objetivo: 'Aplicar planificación, indicadores de gestión y producción, y organización de la capacidad de los servicios de salud.',
    pasos: [
      { dice: '¿Cómo medimos si los consultorios se usan bien?', opciones: [
          { t: 'Con indicadores: rendimiento (atenciones por hora médico), porcentaje de utilización de la agenda e inasistencias por servicio.', p: 2, r: 'Esos son los indicadores clave.', fb: 'El rendimiento y la utilización de la capacidad miden la productividad.' },
          { t: 'Contando cuántos médicos hay.', p: 1, r: 'Eso es oferta, no producción.', fb: 'El número de profesionales no mide su uso.' },
          { t: 'Preguntando quién trabaja más.', p: 0, r: 'Muy subjetivo.', fb: 'Sin indicadores no hay análisis objetivo.' } ] },
      { dice: 'Odontología tiene 40 % de agenda vacía y medicina general colapsa. ¿Qué propones?', opciones: [
          { t: 'Analizar la demanda por servicio y redistribuir horarios y cupos, con promoción del servicio subutilizado y agenda extendida donde hay más demanda.', p: 2, r: 'Redistribuir según la demanda.', fb: 'Ajustar la oferta a la demanda mejora la eficiencia.' },
          { t: 'Reducir el personal de odontología.', p: 1, r: 'Quizás, pero falta analizar.', fb: 'Decidir sin analizar la demanda potencial es riesgoso.' },
          { t: 'Dejarlo igual.', p: 0, r: '…', fb: 'Se desperdicia capacidad.' } ] },
      { dice: '¿Cómo planteamos las metas del próximo año?', opciones: [
          { t: 'Metas SMART en el POA basadas en la población asignada y la producción histórica, con indicadores y seguimiento trimestral.', p: 2, r: 'Bien planificado.', fb: 'Las metas específicas, medibles y con plazo permiten el seguimiento.' },
          { t: 'Atender más que este año.', p: 1, r: '¿Cuánto más?', fb: 'Una meta vaga no se puede medir.' },
          { t: 'Las mismas metas del año pasado.', p: 0, r: '…', fb: 'No considera cambios en la población ni en la demanda.' } ] }
    ],
    vivo: {
      lugar: 'Sala de planificación del distrito de salud', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '⏱️', t: 'Calcular atenciones por hora médico', p: 2, fb: 'El rendimiento mide la productividad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📅', t: 'Calcular el porcentaje de agenda utilizada', p: 2, fb: 'La utilización muestra capacidad ociosa.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🗣️', t: 'Preguntar en el pasillo quién trabaja más', p: 0, fb: 'Es subjetivo.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Rendimiento', claves: ['rendimiento', 'por hora', 'hora medico', 'productividad', 'atenciones'] },
            { n: 'Utilización de la agenda', claves: ['utilizacion', 'agenda', 'ocupacion', 'cupos', 'capacidad'] },
            { n: 'Indicadores por servicio', claves: ['indicador', 'por servicio', 'inasistencia', 'medir', 'porcentaje'] }
          ],
          evitar: [ { claves: ['quien trabaja mas', 'a ojo'], fb: 'Se necesitan indicadores objetivos.' } ],
          modelo: 'Mediremos con indicadores por servicio: el rendimiento en atenciones por hora médico, el porcentaje de utilización de la agenda y las inasistencias.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Comparar la demanda de cada servicio', p: 2, fb: 'La demanda orienta la redistribución.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔁', t: 'Proponer redistribuir horarios y cupos', p: 2, fb: 'Ajustar la oferta mejora la eficiencia.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🙈', t: 'Ignorar la agenda vacía de odontología', p: 0, fb: 'Se desperdicia capacidad pública.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Analiza la demanda', claves: ['demanda', 'analiz', 'necesidad', 'pacientes', 'por servicio'] },
            { n: 'Redistribuye la oferta', claves: ['redistribu', 'horarios', 'cupos', 'reorganiz', 'agenda extendida'] },
            { n: 'Promueve el servicio subutilizado', claves: ['promocion', 'promover', 'subutiliz', 'odontologia', 'difusion'] }
          ],
          evitar: [ { claves: ['dejarlo igual', 'no hacer nada'], fb: 'La capacidad ociosa es un desperdicio.' } ],
          modelo: 'Analizaremos la demanda por servicio para redistribuir horarios y cupos: agenda extendida en medicina general y promoción del servicio de odontología, que está subutilizado.'
        },
        {
          acciones: [
            { icono: '👪', t: 'Revisar la población asignada al centro', p: 2, fb: 'La población define la demanda esperada.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎯', t: 'Redactar metas con número y plazo', p: 2, fb: 'Metas medibles permiten seguimiento.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📎', t: 'Copiar las metas del año pasado', p: 0, fb: 'No considera cambios.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Metas SMART', claves: ['smart', 'especific', 'medible', 'plazo', 'alcanzable'] },
            { n: 'Base en población y producción', claves: ['poblacion asignada', 'poblacion', 'historic', 'produccion', 'datos'] },
            { n: 'Seguimiento en el POA', claves: ['poa', 'seguimiento', 'trimestral', 'indicadores', 'monitoreo'] }
          ],
          evitar: [ { claves: ['mismas metas', 'copiar las metas'], fb: 'Las metas deben actualizarse.' } ],
          modelo: 'Propongo metas SMART en el POA, específicas, medibles y con plazo, basadas en la población asignada y la producción histórica, con indicadores y seguimiento trimestral.'
        }
      ]
    }
  },

  /* ===================== ASS-15 Sistema Nacional de Salud ===================== */
  {
    id: 'asig-ASS-15', cod: 'ASS-15',
    titulo: 'Orientar a un comunero sobre la red de salud',
    asignaturas: ['ASS-15'],
    persona: { nombre: 'Don Cristóbal Vargas', rol: 'Comunero kichwa afiliado al seguro campesino', avatar: '👨🏽‍🌾', pitch: 0.9 },
    contexto: 'Don Cristóbal llega desde su comunidad: quiere operarse de una hernia, no sabe si ir al hospital, a una clínica o al seguro, y pregunta qué pasa después de la operación.',
    objetivo: 'Explicar niveles de atención, la red pública y complementaria y el proceso de referencia y contrarreferencia del Sistema Nacional de Salud.',
    pasos: [
      { dice: 'Me dijeron que vaya directo al hospital de Quito para operarme. ¿Es así?', opciones: [
          { t: 'Le explico que primero lo valora el médico del centro (primer nivel); si necesita cirugía, se lo refiere al hospital que corresponda con un formulario de referencia.', p: 2, r: 'Ah, primero aquí y luego me mandan.', fb: 'El primer nivel es la puerta de entrada y la referencia ordena el acceso a mayor complejidad.' },
          { t: 'Le doy una cita con el médico sin explicarle más.', p: 1, r: '…', fb: 'Es correcto, pero falta orientarlo sobre el proceso.' },
          { t: 'Le digo que sí, que vaya a Quito por su cuenta.', p: 0, r: '¿Y si no me atienden?', fb: 'Sin referencia se desordena la red y se generan gastos innecesarios.' } ] },
      { dice: 'Soy afiliado al seguro campesino. ¿Me toca allá o aquí?', opciones: [
          { t: 'Le explico que la red pública (MSP y seguridad social) está articulada: puede atenderse aquí y, si se requiere, ser derivado dentro de la red o a la red complementaria según convenios.', p: 2, r: 'Entonces no me quedo sin atención.', fb: 'La Red Pública Integral de Salud se articula con la red complementaria.' },
          { t: 'Le digo que pregunte en el seguro.', p: 1, r: '…', fb: 'Falta orientación básica.' },
          { t: 'Le digo que aquí no atienden a afiliados.', p: 0, r: '¿Cómo así?', fb: 'Es falso y le niega el acceso.' } ] },
      { dice: 'Y después de la operación, ¿quién me controla?', opciones: [
          { t: 'El hospital emite la contrarreferencia y usted vuelve aquí para los controles; nosotros agendamos y adjuntamos el documento a su historia clínica.', p: 2, r: 'Qué bueno, cerca de mi casa.', fb: 'La contrarreferencia garantiza la continuidad en el primer nivel.' },
          { t: 'Ya verá allá.', p: 1, r: '…', fb: 'No orienta sobre la continuidad.' },
          { t: 'Tendrá que volver a Quito para cada control.', p: 0, r: '¡Muy lejos!', fb: 'Desconoce la contrarreferencia.' } ] }
    ],
    vivo: {
      lugar: 'Ventanilla de admisión del centro de salud', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🏥', t: 'Mostrarle el gráfico de niveles de atención', p: 2, fb: 'El apoyo visual facilita la comprensión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📄', t: 'Enseñarle el formulario de referencia', p: 2, fb: 'Conocer el documento le da seguridad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🚌', t: 'Decirle que viaje a Quito por su cuenta', p: 0, fb: 'Sin referencia se desordena la red.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Primer nivel como puerta de entrada', claves: ['primer nivel', 'centro de salud', 'puerta de entrada', 'aqui primero', 'medico del centro'] },
            { n: 'Referencia a mayor complejidad', claves: ['referencia', 'refiere', 'derivar', 'deriva', 'hospital', 'formulario'] },
            { n: 'Niveles de atención', claves: ['niveles', 'segundo nivel', 'complejidad', 'especialista', 'tercer nivel'] }
          ],
          evitar: [ { claves: ['vaya directo', 'por su cuenta'], fb: 'El acceso a la red se ordena con la referencia.' } ],
          modelo: 'Don Cristóbal, primero lo valora el médico del centro, que es el primer nivel y la puerta de entrada. Si necesita cirugía, lo refiere al hospital de mayor complejidad con un formulario de referencia.'
        },
        {
          acciones: [
            { icono: '🔗', t: 'Explicar con un esquema la red pública', p: 2, fb: 'Visualizar la red aclara opciones.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪪', t: 'Verificar su afiliación en el sistema', p: 2, fb: 'La verificación orienta la derivación.', efecto: { confianza: 6, tension: -3 } },
            { icono: '⛔', t: 'Decirle que aquí no atienden afiliados', p: 0, fb: 'Es falso y le niega el acceso.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Red pública integral', claves: ['red publica', 'ministerio', 'msp', 'seguro', 'seguridad social', 'iess'] },
            { n: 'Articulación de la red', claves: ['articul', 'derivado', 'dentro de la red', 'convenio', 'coordin'] },
            { n: 'Red complementaria', claves: ['complementaria', 'privad', 'clinica', 'convenio', 'red privada'] }
          ],
          evitar: [ { claves: ['no atienden afiliados', 'aqui no le toca'], fb: 'La red pública está articulada.' } ],
          modelo: 'La red pública, el Ministerio de Salud y la seguridad social como el seguro campesino, está articulada: puede atenderse aquí y, si hace falta, ser derivado dentro de la red o a la red complementaria por convenio.'
        },
        {
          acciones: [
            { icono: '📬', t: 'Explicarle qué es la contrarreferencia', p: 2, fb: 'Saberlo asegura que regrese con el documento.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗓️', t: 'Anotar en su carné que regrese al control aquí', p: 2, fb: 'El recordatorio favorece la continuidad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧳', t: 'Decirle que cada control será en Quito', p: 0, fb: 'Desconoce la contrarreferencia.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Contrarreferencia', claves: ['contrarreferencia', 'regresa', 'vuelve', 'retorno', 'alta'] },
            { n: 'Controles en el primer nivel', claves: ['control', 'seguimiento', 'aqui', 'cerca', 'centro de salud'] },
            { n: 'Registro en la historia clínica', claves: ['historia clinica', 'adjunt', 'archiv', 'agend', 'registr'] }
          ],
          evitar: [ { claves: ['volver a quito', 'cada control alla'], fb: 'El seguimiento se hace en el primer nivel.' } ],
          modelo: 'Después de la operación el hospital emite la contrarreferencia y usted vuelve aquí para los controles de seguimiento; nosotros agendamos y adjuntamos el documento a su historia clínica.'
        }
      ]
    }
  },

  /* ===================== ASS-16 Tributación en Sistemas de Salud ===================== */
  {
    id: 'asig-ASS-16', cod: 'ASS-16',
    titulo: 'Facturas y retenciones de una compra',
    asignaturas: ['ASS-16'],
    persona: { nombre: 'Sr. Diego Ordóñez', rol: 'Proveedor de insumos médicos', avatar: '🧑🏻‍💼', pitch: 1.0 },
    contexto: 'Un proveedor entrega insumos de curación y presenta un comprobante; además pregunta por qué le retienen parte del pago. Debes aplicar las obligaciones tributarias básicas de la entidad.',
    objetivo: 'Aplicar conceptos de tributación en salud: comprobantes de venta autorizados, retenciones, impuestos y obligaciones del agente de retención.',
    pasos: [
      { dice: 'Aquí le dejo una nota de entrega; la factura se la mando después.', opciones: [
          { t: 'Le explico que para recibir y pagar necesito un comprobante de venta autorizado (factura electrónica válida) con los datos correctos de la entidad.', p: 2, r: 'Bueno, se la emito ahora.', fb: 'El comprobante autorizado respalda el gasto y el registro tributario.' },
          { t: 'Recibo los insumos y espero la factura sin registrarlos.', p: 1, r: '…', fb: 'La recepción debe registrarse y la factura exigirse a tiempo.' },
          { t: 'Recibo la nota y pago con eso.', p: 0, r: 'Perfecto.', fb: 'Pagar sin comprobante válido carece de respaldo.' } ] },
      { dice: '¿Por qué me descuentan una parte de mi pago?', opciones: [
          { t: 'Porque la entidad actúa como agente de retención: retiene el porcentaje que fija la normativa tributaria, le entrega el comprobante de retención y lo declara al SRI.', p: 2, r: 'Entonces lo puedo usar en mi declaración.', fb: 'La retención es un anticipo del impuesto que el proveedor puede compensar.' },
          { t: 'No sé, es cosa de financiero.', p: 1, r: '…', fb: 'Falta orientación básica.' },
          { t: 'Es una comisión del centro de salud.', p: 0, r: '¡Eso es ilegal!', fb: 'Es falso: la retención no es un cobro de la entidad.' } ] },
      { dice: 'La factura tiene mal escrito el RUC del centro. ¿Igual vale?', opciones: [
          { t: 'Le pido que anule y emita una nueva factura con los datos correctos, porque un comprobante con errores no respalda el gasto.', p: 2, r: 'Ya la corrijo.', fb: 'Los comprobantes deben contener datos exactos para ser válidos.' },
          { t: 'La acepto, es un error pequeño.', p: 1, r: '…', fb: 'Puede generar observaciones en la auditoría.' },
          { t: 'Corrijo el número a mano.', p: 0, r: '…', fb: 'Alterar un comprobante lo invalida.' } ] }
    ],
    vivo: {
      lugar: 'Bodega y unidad financiera del centro de salud', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🧾', t: 'Solicitar la factura electrónica autorizada', p: 2, fb: 'Sin comprobante válido no hay respaldo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📦', t: 'Registrar la recepción contra la orden de compra', p: 2, fb: 'La recepción documentada respalda el pago.', efecto: { confianza: 6, tension: -3 } },
            { icono: '💵', t: 'Pagar con la nota de entrega', p: 0, fb: 'Es un pago sin respaldo tributario.', efecto: { confianza: 6, tension: -2 } }
          ],
          conceptos: [
            { n: 'Comprobante de venta autorizado', claves: ['factura', 'comprobante', 'autorizad', 'electronica', 'valido'] },
            { n: 'Datos correctos de la entidad', claves: ['datos', 'ruc', 'razon social', 'correctos', 'entidad'] },
            { n: 'Respaldo del gasto', claves: ['respaldo', 'sustento', 'pago', 'registro', 'auditoria'] }
          ],
          evitar: [ { claves: ['pago con la nota', 'sin factura'], fb: 'Todo pago requiere comprobante válido.' } ],
          modelo: 'Para recibir y pagar necesito un comprobante de venta autorizado, una factura electrónica válida con los datos correctos de la entidad, porque es el respaldo del gasto.'
        },
        {
          acciones: [
            { icono: '📑', t: 'Emitir el comprobante de retención', p: 2, fb: 'El proveedor necesita el comprobante para compensar.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📚', t: 'Consultar los porcentajes vigentes del SRI', p: 2, fb: 'Los porcentajes cambian según la normativa.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🤑', t: 'Decirle que es una comisión del centro', p: 0, fb: 'Es falso y genera desconfianza.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Agente de retención', claves: ['agente de retencion', 'retencion', 'retiene', 'retenemos', 'retenido'] },
            { n: 'Comprobante de retención', claves: ['comprobante de retencion', 'comprobante', 'le entrego', 'documento', 'certificado de retencion'] },
            { n: 'Declaración al SRI', claves: ['sri', 'declara', 'normativa tributaria', 'impuesto', 'anticipo'] }
          ],
          evitar: [ { claves: ['comision', 'nos quedamos'], fb: 'La retención no es un cobro de la entidad.' } ],
          modelo: 'La entidad es agente de retención: retiene el porcentaje que fija la normativa tributaria, le entrego el comprobante de retención y lo declaramos al SRI; para usted es un anticipo del impuesto.'
        },
        {
          acciones: [
            { icono: '🔎', t: 'Comparar el RUC de la factura con el oficial', p: 2, fb: 'La verificación detecta errores.', efecto: { confianza: 6, tension: -3 } },
            { icono: '↩️', t: 'Solicitar la anulación y nueva emisión', p: 2, fb: 'Solo un comprobante correcto es válido.', efecto: { confianza: 6, tension: -3 } },
            { icono: '✏️', t: 'Corregir el RUC a mano sobre la factura', p: 0, fb: 'Alterar un comprobante lo invalida.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Detecta el error', claves: ['error', 'ruc', 'mal escrito', 'incorrect', 'verific'] },
            { n: 'Anular y emitir de nuevo', claves: ['anul', 'nueva factura', 'emita', 'reemplaz', 'volver a emitir'] },
            { n: 'Validez del comprobante', claves: ['valido', 'validez', 'respaldo', 'no respalda', 'auditoria'] }
          ],
          evitar: [ { claves: ['corrijo a mano', 'igual vale'], fb: 'Un comprobante con errores o alterado no es válido.' } ],
          modelo: 'Hay un error en el RUC: le pido que anule la factura y emita una nueva con los datos correctos, porque un comprobante con errores no es válido y no respalda el gasto.'
        }
      ]
    }
  },

  /* ===================== ASS-17 Operación y Logística en Sistemas de Salud ===================== */
  {
    id: 'asig-ASS-17', cod: 'ASS-17',
    titulo: 'Recepción y envío de vacunas por río',
    asignaturas: ['ASS-17'],
    persona: { nombre: 'Tlgo. Edison Mayancha', rol: 'Responsable de bodega y farmacia', avatar: '👨🏽‍🔧', pitch: 0.95 },
    contexto: 'Llega un lote de medicamentos y vacunas al centro de salud y hay que enviar parte a un puesto de salud rural al que solo se llega en canoa por el río Curaray.',
    objetivo: 'Aplicar recepción técnica, almacenamiento por fecha de caducidad, cadena de frío y distribución logística de medicamentos e insumos.',
    pasos: [
      { dice: 'Llegó el camión. ¿Qué revisamos antes de firmar la recepción?', opciones: [
          { t: 'Recepción técnica: cantidades contra la guía, lote, fecha de caducidad, estado de los empaques y temperatura de las vacunas; registro en el kárdex.', p: 2, r: 'Así recibimos bien.', fb: 'La recepción técnica verifica cantidad y calidad antes de aceptar.' },
          { t: 'Contar las cajas y firmar.', p: 1, r: '¿Y las fechas y la temperatura?', fb: 'Contar no basta: falta verificar calidad.' },
          { t: 'Firmar sin revisar porque el chofer tiene apuro.', p: 0, r: '…', fb: 'Se aceptan productos sin control.' } ] },
      { dice: '¿Cómo ordenamos lo recibido en bodega?', opciones: [
          { t: 'Por fecha de caducidad: lo que primero vence, primero sale; vacunas en refrigeración entre 2 y 8 °C con registro de temperatura.', p: 2, r: 'Perfecto, nada se vence.', fb: 'La rotación por caducidad y la cadena de frío evitan pérdidas.' },
          { t: 'Lo nuevo adelante, que se ve mejor.', p: 1, r: 'Así vence lo antiguo.', fb: 'Invierte la rotación.' },
          { t: 'Las vacunas en el estante con lo demás.', p: 0, r: '¡Se dañan!', fb: 'Romper la cadena de frío inutiliza las vacunas.' } ] },
      { dice: 'Hay que mandar vacunas al puesto del Curaray, son seis horas en canoa.', opciones: [
          { t: 'Preparar un termo con paquetes fríos acondicionados y registrador de temperatura, guía de remisión, y coordinar la recepción en el puesto.', p: 2, r: 'Llegarán en buen estado.', fb: 'La distribución en zonas remotas exige mantener la cadena de frío y documentar.' },
          { t: 'Mandarlas en una caja de cartón con hielo.', p: 1, r: 'Riesgoso.', fb: 'Sin termo ni control de temperatura hay riesgo.' },
          { t: 'Mandarlas en una funda.', p: 0, r: '…', fb: 'Se pierde la cadena de frío.' } ] }
    ],
    vivo: {
      lugar: 'Bodega de farmacia y muelle del río', fondo: 'exterior',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📋', t: 'Contrastar las cantidades con la guía de remisión', p: 2, fb: 'Verifica que llegue lo despachado.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌡️', t: 'Medir la temperatura del cooler de vacunas', p: 2, fb: 'Confirma que no se rompió la cadena de frío.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✍️', t: 'Firmar la recepción sin revisar', p: 0, fb: 'Se aceptan productos sin control.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Recepción técnica', claves: ['recepcion tecnica', 'guia', 'cantidades', 'verific', 'revisar', 'contar'] },
            { n: 'Lote, caducidad y empaque', claves: ['lote', 'caducidad', 'vencimiento', 'empaque', 'estado'] },
            { n: 'Temperatura y registro', claves: ['temperatura', 'cadena de frio', 'kardex', 'registr', 'termometro'] }
          ],
          evitar: [ { claves: ['firmo sin revisar', 'firmar nomas'], fb: 'La recepción sin control arriesga la calidad.' } ],
          modelo: 'Hacemos la recepción técnica: verificamos cantidades contra la guía, lote, fecha de caducidad y estado del empaque, y la temperatura de las vacunas; luego registramos en el kárdex.'
        },
        {
          acciones: [
            { icono: '📆', t: 'Ubicar adelante los lotes que caducan primero', p: 2, fb: 'Evita vencimientos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '❄️', t: 'Guardar las vacunas en la refrigeradora de 2 a 8 °C', p: 2, fb: 'Mantiene la cadena de frío.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🗃️', t: 'Dejar las vacunas en el estante común', p: 0, fb: 'Se dañan por temperatura.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Primero vence, primero sale', claves: ['primero vence', 'primero caduca', 'caducidad', 'fefo', 'rotacion'] },
            { n: 'Cadena de frío', claves: ['cadena de frio', 'refrigera', '2 y 8', 'dos y ocho', 'frio'] },
            { n: 'Registro de temperatura', claves: ['registro de temperatura', 'registro', 'control', 'temperatura', 'termometro'] }
          ],
          evitar: [ { claves: ['lo nuevo adelante', 'estante comun'], fb: 'Invierte la rotación o rompe la cadena de frío.' } ],
          modelo: 'Ordenamos por fecha de caducidad: lo que primero vence, primero sale. Las vacunas van a refrigeración entre 2 y 8 grados, con registro de temperatura dos veces al día.'
        },
        {
          acciones: [
            { icono: '🧊', t: 'Acondicionar el termo con paquetes fríos', p: 2, fb: 'El termo mantiene la temperatura en el viaje.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📻', t: 'Avisar por radio al puesto la hora de llegada', p: 2, fb: 'La coordinación asegura la recepción.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🛍️', t: 'Enviar las vacunas en una funda plástica', p: 0, fb: 'Se pierde la cadena de frío.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Termo y cadena de frío en el traslado', claves: ['termo', 'paquetes frios', 'cadena de frio', 'cooler', 'refriger'] },
            { n: 'Documentación del envío', claves: ['guia de remision', 'registrador', 'documento', 'registro', 'acta'] },
            { n: 'Coordinación con el puesto', claves: ['coordin', 'avisar', 'radio', 'puesto de salud', 'recepcion'] }
          ],
          evitar: [ { claves: ['en una funda', 'caja de carton'], fb: 'Sin termo se rompe la cadena de frío.' } ],
          modelo: 'Preparamos un termo con paquetes fríos acondicionados y registrador de temperatura, con guía de remisión, y coordinamos por radio la recepción en el puesto de salud.'
        }
      ]
    }
  },

  /* ===================== ASS-18 Ética Profesional ===================== */
  {
    id: 'asig-ASS-18', cod: 'ASS-18',
    titulo: 'Un certificado médico "para un amigo"',
    asignaturas: ['ASS-18'],
    persona: { nombre: 'Lic. Óscar Villacrés', rol: 'Compañero administrativo del centro', avatar: '🧑🏽‍💼', pitch: 1.0 },
    contexto: 'Un compañero te pide imprimir un certificado médico de reposo con la firma escaneada de un médico para un amigo que no fue atendido. Debes actuar con ética profesional.',
    objetivo: 'Aplicar principios de ética profesional: honestidad, legalidad, responsabilidad y canales de denuncia en el servicio de salud.',
    pasos: [
      { dice: 'Hazme un favor: imprime un certificado de reposo con la firma del doctor para mi amigo. Nadie se va a enterar.', opciones: [
          { t: 'Me niego con respeto: emitir un certificado sin atención y usar la firma de otro es falsificación y una falta ética grave.', p: 2, r: 'Bueno, no lo había visto así…', fb: 'La honestidad y la legalidad son principios básicos del servidor de salud.' },
          { t: 'Le digo que no sé usar el sistema.', p: 1, r: 'Te enseño.', fb: 'Evadir no resuelve el problema ético.' },
          { t: 'Lo hago solo esta vez.', p: 0, r: 'Gracias, amigo.', fb: 'Falsificar documentos es una falta grave y puede ser delito.' } ] },
      { dice: 'Pero tú también te beneficias, te invito a almorzar.', opciones: [
          { t: 'Le explico que no acepto beneficios por hacer algo indebido y le sugiero que su amigo acuda a consulta para una valoración real.', p: 2, r: 'Tienes razón.', fb: 'Rechazar beneficios indebidos evita conflictos de interés.' },
          { t: 'Acepto el almuerzo, pero no hago el certificado.', p: 1, r: '…', fb: 'Aceptar regalos ligados a un pedido indebido compromete tu imparcialidad.' },
          { t: 'Acepto y hago el certificado.', p: 0, r: '…', fb: 'Es corrupción.' } ] },
      { dice: '(Luego descubres que ya se emitieron otros certificados falsos.)', opciones: [
          { t: 'Informo por escrito a la Dirección o por el canal institucional de denuncias, con los datos que conozco.', p: 2, r: '(La Dirección inicia una investigación.)', fb: 'Denunciar por canales formales protege a la institución y a los usuarios.' },
          { t: 'Me quedo callado para no tener problemas.', p: 1, r: '…', fb: 'El silencio permite que la falta continúe.' },
          { t: 'Lo publico en redes sociales.', p: 0, r: '(Se genera un escándalo.)', fb: 'Las denuncias se canalizan formalmente.' } ] }
    ],
    vivo: {
      lugar: 'Oficina administrativa del centro de salud', fondo: 'oficina',
      inicio: { confianza: 60, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '✋', t: 'Negarse con firmeza y respeto', p: 2, fb: 'La negativa clara evita ambigüedades.', efecto: { confianza: -4, tension: 8 } },
            { icono: '📖', t: 'Mostrar el código de ética institucional', p: 2, fb: 'La norma respalda la decisión.', efecto: { confianza: 2, tension: 4 } },
            { icono: '🖨️', t: 'Imprimir el certificado "solo esta vez"', p: 0, fb: 'Es falsificación.', efecto: { confianza: 10, tension: -10 } }
          ],
          conceptos: [
            { n: 'Se niega con respeto', claves: ['no puedo', 'me niego', 'con respeto', 'lo siento', 'disculpa', 'no lo voy a hacer'] },
            { n: 'Identifica la falsificación', claves: ['falsific', 'falso', 'firma de otro', 'sin atencion', 'ilegal', 'delito'] },
            { n: 'Invoca la ética profesional', claves: ['etica', 'honest', 'codigo de etica', 'falta grave', 'responsabilidad', 'principios'] }
          ],
          evitar: [ { claves: ['solo esta vez', 'nadie se va a enterar', 'ya te lo hago'], fb: 'Una falta ética no deja de serlo por ser "una vez".' } ],
          modelo: 'Lo siento, no puedo: emitir un certificado sin atención y usar la firma de otro es falsificación, un delito y una falta grave al código de ética.'
        },
        {
          acciones: [
            { icono: '🍽️', t: 'Rechazar la invitación al almuerzo', p: 2, fb: 'Evita un beneficio ligado a un pedido indebido.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🩺', t: 'Sugerir que el amigo pida una cita médica', p: 2, fb: 'Ofrece la vía legítima.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🤝', t: 'Aceptar el almuerzo y el favor', p: 0, fb: 'Es corrupción.', efecto: { confianza: 10, tension: -8 } }
          ],
          conceptos: [
            { n: 'Rechaza beneficios indebidos', claves: ['no acepto', 'rechazo', 'beneficio', 'regalo', 'almuerzo', 'invitacion'] },
            { n: 'Evita el conflicto de interés', claves: ['conflicto de interes', 'imparcial', 'indebido', 'compromete', 'integridad'] },
            { n: 'Propone la vía legítima', claves: ['consulta', 'cita', 'valoracion', 'que lo atienda', 'medico'] }
          ],
          evitar: [ { claves: ['acepto el almuerzo', 'te lo hago por el almuerzo'], fb: 'Aceptar beneficios por un favor indebido es corrupción.' } ],
          modelo: 'Gracias, pero no acepto ningún beneficio por algo indebido; sería un conflicto de interés. Tu amigo puede pedir una cita para una valoración médica real.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Redactar un informe con los hechos conocidos', p: 2, fb: 'El informe escrito da respaldo.', efecto: { confianza: 4, tension: 4 } },
            { icono: '📨', t: 'Usar el canal institucional de denuncias', p: 2, fb: 'El canal formal protege al denunciante.', efecto: { confianza: 4, tension: 2 } },
            { icono: '📱', t: 'Publicarlo en redes sociales', p: 0, fb: 'Genera escándalo y puede afectar la investigación.', efecto: { confianza: -12, tension: 15 } }
          ],
          conceptos: [
            { n: 'Informa por escrito', claves: ['por escrito', 'informe', 'oficio', 'memorando', 'documento'] },
            { n: 'Usa canales formales', claves: ['direccion', 'canal institucional', 'denuncia', 'formal', 'autoridad'] },
            { n: 'Protege a los usuarios y la institución', claves: ['proteger', 'usuarios', 'institucion', 'investigacion', 'transparen'] }
          ],
          evitar: [ { claves: ['redes sociales', 'me quedo callado'], fb: 'Callar o exponer en redes no son vías adecuadas.' } ],
          modelo: 'Informo por escrito a la Dirección mediante el canal institucional de denuncias, con los hechos que conozco, para proteger a los usuarios y que se haga una investigación.'
        }
      ]
    }
  },

  /* ===================== ASS-19 Calidad en el Sistema de Salud ===================== */
  {
    id: 'asig-ASS-19', cod: 'ASS-19',
    titulo: 'Plan de mejora tras la auditoría',
    asignaturas: ['ASS-19'],
    persona: { nombre: 'Dra. Gabriela Noa', rol: 'Responsable de calidad del distrito de salud', avatar: '👩🏽‍⚕️', pitch: 1.05 },
    contexto: 'Una auditoría encontró que el 30 % de las historias clínicas de admisión están incompletas y que la satisfacción bajó. La responsable de calidad te pide un análisis y un plan de mejora.',
    objetivo: 'Aplicar gestión de calidad en salud: estándares, indicadores, análisis de causas y mejora continua (PHVA).',
    pasos: [
      { dice: '30 % de historias incompletas. ¿Cómo analizamos el problema?', opciones: [
          { t: 'Aplico un análisis de causa raíz (diagrama de Ishikawa) con el equipo: personas, métodos, sistema, materiales y entorno.', p: 2, r: 'Así encontramos las causas reales.', fb: 'El análisis de causas evita soluciones superficiales.' },
          { t: 'Recuerdo a todos que llenen bien.', p: 1, r: '…', fb: 'Un recordatorio sin análisis tiene poco efecto.' },
          { t: 'Busco al culpable y lo sanciono.', p: 0, r: 'Eso no resuelve el proceso.', fb: 'Culpar sin analizar no mejora el sistema.' } ] },
      { dice: 'Encontramos que el formulario es confuso y falta capacitación. ¿Qué proponemos?', opciones: [
          { t: 'Plan de mejora: simplificar el formulario, capacitar al personal, lista de verificación al cierre del día, con responsables, plazos e indicador meta (menos del 5 % incompletas).', p: 2, r: 'Concreto y medible.', fb: 'Un plan con acciones, responsables, plazos e indicadores es verificable.' },
          { t: 'Una capacitación general.', p: 1, r: 'Ayuda, pero no basta.', fb: 'Faltan acciones sobre el formulario y seguimiento.' },
          { t: 'Esperar la próxima auditoría.', p: 0, r: '…', fb: 'No hay mejora sin acción.' } ] },
      { dice: '¿Cómo sabremos si mejoró?', opciones: [
          { t: 'Verificar mensualmente el indicador con una muestra de historias y la encuesta de satisfacción, y ajustar: ciclo PHVA.', p: 2, r: 'Mejora continua de verdad.', fb: 'Verificar y actuar cierran el ciclo PHVA.' },
          { t: 'Preguntar al personal si cree que mejoró.', p: 1, r: 'Muy subjetivo.', fb: 'Se necesitan datos.' },
          { t: 'Dar por cerrado el tema.', p: 0, r: '…', fb: 'Sin verificación no hay mejora sostenida.' } ] }
    ],
    vivo: {
      lugar: 'Sala de reuniones del comité de calidad', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🐟', t: 'Dibujar el diagrama de Ishikawa con el equipo', p: 2, fb: 'Organiza las causas por categorías.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔍', t: 'Revisar una muestra de historias incompletas', p: 2, fb: 'Los datos orientan el análisis.', efecto: { confianza: 6, tension: -3 } },
            { icono: '👉', t: 'Señalar al responsable y sancionarlo', p: 0, fb: 'Culpar no mejora el proceso.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Análisis de causa raíz', claves: ['causa raiz', 'causas', 'ishikawa', 'espina de pescado', 'analisis'] },
            { n: 'Trabajo con el equipo', claves: ['equipo', 'personal', 'juntos', 'participa', 'comite'] },
            { n: 'Categorías de causas', claves: ['personas', 'metodos', 'sistema', 'materiales', 'entorno', 'proceso'] }
          ],
          evitar: [ { claves: ['buscar al culpable', 'sancionarlo'], fb: 'La calidad mejora los procesos, no busca culpables.' } ],
          modelo: 'Haremos un análisis de causa raíz con el diagrama de Ishikawa junto al equipo, revisando causas en personas, métodos, sistema, materiales y entorno.'
        },
        {
          acciones: [
            { icono: '✂️', t: 'Simplificar el formulario de admisión', p: 2, fb: 'Ataca una causa identificada.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☑️', t: 'Crear una lista de verificación de cierre diario', p: 2, fb: 'Detecta errores a tiempo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '⏳', t: 'Esperar la próxima auditoría', p: 0, fb: 'No hay mejora sin acción.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Acciones de mejora', claves: ['simplificar', 'capacit', 'lista de verificacion', 'formulario', 'acciones'] },
            { n: 'Responsables y plazos', claves: ['responsable', 'plazo', 'fecha', 'cronograma', 'quien'] },
            { n: 'Indicador meta', claves: ['indicador', 'meta', 'menos del 5', '5 por ciento', 'porcentaje'] }
          ],
          evitar: [ { claves: ['esperar la auditoria', 'no hacer nada'], fb: 'La mejora requiere acción.' } ],
          modelo: 'El plan de mejora: simplificar el formulario, capacitar al personal y usar una lista de verificación diaria, con responsables, plazos y un indicador meta de menos del 5 por ciento de historias incompletas.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Medir cada mes una muestra de historias', p: 2, fb: 'El indicador muestra el avance.', efecto: { confianza: 8, tension: -4 } },
            { icono: '😊', t: 'Repetir la encuesta de satisfacción', p: 2, fb: 'La percepción del usuario complementa.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📁', t: 'Cerrar el tema sin volver a medir', p: 0, fb: 'Sin verificación no hay mejora sostenida.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Verifica con el indicador', claves: ['verific', 'medir', 'mensual', 'indicador', 'muestra'] },
            { n: 'Mide la satisfacción', claves: ['satisfaccion', 'encuesta', 'usuarios', 'percepcion', 'satisfechos'] },
            { n: 'Ciclo PHVA y ajuste', claves: ['phva', 'mejora continua', 'ajust', 'actuar', 'corregir'] }
          ],
          evitar: [ { claves: ['dar por cerrado', 'ya esta'], fb: 'La mejora continua no se cierra sin verificar.' } ],
          modelo: 'Verificaremos cada mes el indicador con una muestra de historias y repetiremos la encuesta de satisfacción; luego ajustamos, siguiendo el ciclo PHVA de mejora continua.'
        }
      ]
    }
  },

  /* ===================== ASS-20 Tecnología e Innovación en Sistemas de Salud ===================== */
  {
    id: 'asig-ASS-20', cod: 'ASS-20',
    titulo: 'Recordatorios por mensaje para reducir inasistencias',
    asignaturas: ['ASS-20'],
    persona: { nombre: 'Ing. Andrea Chimbo', rol: 'Analista de innovación del distrito de salud', avatar: '👩🏽‍💻', pitch: 1.1 },
    contexto: 'El 18 % de las citas se pierden por inasistencia. La analista propone un piloto de recordatorios por mensaje de texto y te pide diseñarlo de forma segura e inclusiva.',
    objetivo: 'Aplicar tecnología e innovación en salud: diseño de soluciones digitales, protección de datos, pilotaje y evaluación con indicadores.',
    pasos: [
      { dice: '¿Cómo diseñamos la innovación?', opciones: [
          { t: 'Partir del problema y del usuario: quiénes faltan y por qué; diseñar un mensaje simple 48 horas antes, con opción de confirmar o cancelar.', p: 2, r: 'Centrado en el usuario.', fb: 'La innovación parte del problema real y de las necesidades del usuario.' },
          { t: 'Copiar lo que hace otro hospital.', p: 1, r: 'Hay que adaptarlo.', fb: 'Sirve de referencia, pero debe adecuarse al contexto.' },
          { t: 'Comprar el sistema más caro del mercado.', p: 0, r: '¿Y si no resuelve el problema?', fb: 'La tecnología sin análisis del problema es un gasto.' } ] },
      { dice: '¿Qué cuidamos con los números de teléfono de los pacientes?', opciones: [
          { t: 'Pedir consentimiento para usar el teléfono, enviar solo fecha y hora sin diagnósticos y proteger la base de datos con acceso restringido.', p: 2, r: 'Seguro y respetuoso.', fb: 'La protección de datos personales exige consentimiento, minimización y seguridad.' },
          { t: 'Incluir el diagnóstico para que recuerden.', p: 1, r: 'Expone datos sensibles.', fb: 'El diagnóstico no es necesario en un recordatorio.' },
          { t: 'Usar el WhatsApp personal del funcionario.', p: 0, r: 'No es seguro.', fb: 'Los canales personales no garantizan la protección de datos.' } ] },
      { dice: '¿Cómo sabremos si funciona antes de ampliarlo?', opciones: [
          { t: 'Hacer un piloto de tres meses en un servicio, medir inasistencias antes y después, incluir llamadas para quienes no tienen celular, y decidir con datos.', p: 2, r: 'Con evidencia, perfecto.', fb: 'El pilotaje con indicadores reduce riesgos antes de escalar.' },
          { t: 'Implementarlo en todo el distrito de una vez.', p: 1, r: 'Riesgoso.', fb: 'Escalar sin piloto multiplica los errores.' },
          { t: 'No medir, se nota si funciona.', p: 0, r: '…', fb: 'Sin datos no hay evaluación.' } ] }
    ],
    vivo: {
      lugar: 'Laboratorio de innovación del distrito de salud', fondo: 'oficina',
      inicio: { confianza: 55, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📊', t: 'Analizar quiénes faltan más a sus citas', p: 2, fb: 'El análisis del problema guía la solución.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✉️', t: 'Redactar un mensaje simple de recordatorio', p: 2, fb: 'La simplicidad facilita la comprensión.', efecto: { confianza: 6, tension: -3 } },
            { icono: '💸', t: 'Cotizar el sistema más caro del mercado', p: 0, fb: 'Tecnología sin análisis es un gasto.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Parte del problema y del usuario', claves: ['problema', 'usuario', 'quienes faltan', 'por que faltan', 'necesidades', 'inasistencia'] },
            { n: 'Diseño simple de la solución', claves: ['mensaje', 'simple', 'recordatorio', '48 horas', 'sencillo'] },
            { n: 'Opción de confirmar o cancelar', claves: ['confirmar', 'cancelar', 'responder', 'liberar el cupo', 'reprogramar'] }
          ],
          evitar: [ { claves: ['el mas caro', 'comprar cualquier sistema'], fb: 'La innovación no depende del precio.' } ],
          modelo: 'Partimos del problema y del usuario: analizamos quiénes faltan y por qué. Diseñamos un mensaje simple de recordatorio 48 horas antes, con opción de confirmar o cancelar para liberar el cupo.'
        },
        {
          acciones: [
            { icono: '✅', t: 'Añadir la casilla de consentimiento en admisión', p: 2, fb: 'El consentimiento legitima el uso del dato.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔐', t: 'Restringir el acceso a la base de teléfonos', p: 2, fb: 'La seguridad protege los datos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📲', t: 'Enviar desde el WhatsApp personal', p: 0, fb: 'Canal inseguro para datos de pacientes.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Consentimiento', claves: ['consentimiento', 'autoriza', 'permiso', 'acepta', 'voluntari'] },
            { n: 'Minimización de datos', claves: ['solo fecha', 'sin diagnostico', 'minimo', 'fecha y hora', 'lo necesario'] },
            { n: 'Seguridad de la base de datos', claves: ['seguridad', 'restring', 'proteger', 'base de datos', 'cifr', 'acceso'] }
          ],
          evitar: [ { claves: ['whatsapp personal', 'incluir el diagnostico'], fb: 'Canal inseguro o datos innecesarios vulneran la protección de datos.' } ],
          modelo: 'Pediremos consentimiento para usar el teléfono, enviaremos solo fecha y hora sin diagnóstico, y protegeremos la base de datos con acceso restringido.'
        },
        {
          acciones: [
            { icono: '🧪', t: 'Planificar un piloto de tres meses en un servicio', p: 2, fb: 'El piloto reduce riesgos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☎️', t: 'Incluir llamadas para quienes no tienen celular', p: 2, fb: 'Evita excluir a quienes no usan mensajes.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🚀', t: 'Lanzarlo en todo el distrito sin medir', p: 0, fb: 'Escalar sin evidencia multiplica errores.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Piloto', claves: ['piloto', 'prueba', 'tres meses', 'un servicio', 'pequena escala'] },
            { n: 'Indicadores antes y después', claves: ['inasistencia', 'antes y despues', 'medir', 'indicador', 'comparar'] },
            { n: 'Inclusión de quienes no tienen celular', claves: ['llamadas', 'sin celular', 'no tienen celular', 'inclus', 'adultos mayores'] }
          ],
          evitar: [ { claves: ['sin medir', 'todo el distrito de una vez'], fb: 'La innovación se evalúa antes de escalar.' } ],
          modelo: 'Haremos un piloto de tres meses en un servicio, mediremos la inasistencia antes y después, e incluiremos llamadas para quienes no tienen celular; con esos datos decidimos si ampliarlo.'
        }
      ]
    }
  },

  /* ===================== ASS-21 Comunicación Organizacional en Sistemas de Salud ===================== */
  {
    id: 'asig-ASS-21', cod: 'ASS-21',
    titulo: 'Un rumor en redes sobre falta de medicinas',
    asignaturas: ['ASS-21'],
    persona: { nombre: 'Lic. Mónica Tanguila', rol: 'Directora administrativa del centro de salud', avatar: '👩🏽‍💼', pitch: 1.05 },
    contexto: 'Circula en redes que el centro "no tiene medicinas y cierra". El personal está inquieto y la comunidad preocupada. La directora te pide apoyar la comunicación interna y externa.',
    objetivo: 'Aplicar comunicación organizacional en salud: comunicación interna, manejo de crisis, vocería y comunicación con la comunidad.',
    pasos: [
      { dice: 'El personal está preguntando si es verdad que cerramos. ¿Qué hacemos primero?', opciones: [
          { t: 'Reunir al personal, informar los hechos verificados (qué medicamentos faltan, qué se está haciendo) y acordar un mensaje común para responder a los usuarios.', p: 2, r: 'Así hablamos todos lo mismo.', fb: 'La comunicación interna primero evita mensajes contradictorios.' },
          { t: 'Enviar un audio por WhatsApp desmintiendo.', p: 1, r: 'Rápido, pero informal.', fb: 'Sin datos ni espacio de preguntas, quedan dudas.' },
          { t: 'Prohibir que hablen del tema.', p: 0, r: 'Aumentará el rumor.', fb: 'El silencio impuesto alimenta la desconfianza.' } ] },
      { dice: 'Una radio local quiere una entrevista. ¿Quién habla y qué dice?', opciones: [
          { t: 'Habla la vocería oficial con datos verificados: el centro sigue abierto, qué medicamentos faltan, cuándo llegan y qué alternativas hay.', p: 2, r: 'Mensaje claro y confiable.', fb: 'Un vocero oficial con información verificable controla la crisis.' },
          { t: 'Que hable cualquiera que esté libre.', p: 1, r: 'Riesgoso.', fb: 'Sin vocería se pueden dar datos errados.' },
          { t: 'No atender a la radio.', p: 0, r: 'Dirán que ocultamos algo.', fb: 'Evadir a los medios alimenta el rumor.' } ] },
      { dice: '¿Cómo llegamos a las comunidades que no usan redes?', opciones: [
          { t: 'Comunicar por radio comunitaria en kichwa y castellano, carteles en el centro y a través de los comités locales y promotores de salud.', p: 2, r: 'Así llegamos a todos.', fb: 'Usar canales comunitarios e interculturales asegura alcance.' },
          { t: 'Solo publicar en Facebook.', p: 1, r: 'No llega a todos.', fb: 'Un solo canal excluye a parte de la población.' },
          { t: 'Esperar que el rumor pase solo.', p: 0, r: '…', fb: 'La falta de información deja espacio al rumor.' } ] }
    ],
    vivo: {
      lugar: 'Sala de reuniones del centro de salud', fondo: 'oficina',
      inicio: { confianza: 40, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '👥', t: 'Convocar a una reunión breve con todo el personal', p: 2, fb: 'La comunicación interna va primero.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📋', t: 'Presentar el inventario real de farmacia', p: 2, fb: 'Los datos verificados desactivan el rumor.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🤐', t: 'Prohibir que el personal hable del tema', p: 0, fb: 'El silencio impuesto alimenta el rumor.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Comunicación interna primero', claves: ['personal', 'reunion', 'equipo', 'interna', 'informar al personal'] },
            { n: 'Hechos verificados', claves: ['hechos', 'verificad', 'datos', 'inventario', 'que medicamentos faltan', 'real'] },
            { n: 'Mensaje común', claves: ['mensaje comun', 'mismo mensaje', 'todos lo mismo', 'acordar', 'respuesta unica'] }
          ],
          evitar: [ { claves: ['prohibir', 'que nadie hable'], fb: 'Prohibir hablar alimenta la desconfianza.' } ],
          modelo: 'Primero reunimos al personal para informar los hechos verificados con el inventario real: qué medicamentos faltan y qué estamos haciendo. Acordamos un mensaje común para responder a los usuarios.'
        },
        {
          acciones: [
            { icono: '🎙️', t: 'Designar a la vocera oficial del centro', p: 2, fb: 'La vocería da coherencia.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗒️', t: 'Preparar tres mensajes clave con datos', p: 2, fb: 'Los mensajes clave ordenan la entrevista.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📵', t: 'Negarse a atender a la radio', p: 0, fb: 'Evadir alimenta el rumor.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Vocería oficial', claves: ['vocer', 'vocero', 'directora', 'oficial', 'autorizad'] },
            { n: 'Datos verificables', claves: ['datos', 'verific', 'cuando llegan', 'que falta', 'informacion'] },
            { n: 'Mensaje tranquilizador y veraz', claves: ['sigue abierto', 'no cierra', 'alternativas', 'atencion continua', 'veraz'] }
          ],
          evitar: [ { claves: ['que hable cualquiera', 'no atender'], fb: 'La crisis se maneja con vocería y datos.' } ],
          modelo: 'Hablará la vocera oficial, la directora, con datos verificados: el centro sigue abierto, informamos qué medicamentos faltan, cuándo llegan y qué alternativas hay.'
        },
        {
          acciones: [
            { icono: '📻', t: 'Grabar un mensaje en kichwa para la radio', p: 2, fb: 'El idioma propio llega a las comunidades.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🧑🏽‍🤝‍🧑🏽', t: 'Informar a los comités locales y promotores', p: 2, fb: 'Los líderes comunitarios replican el mensaje.', efecto: { confianza: 8, tension: -5 } },
            { icono: '😶', t: 'Esperar que el rumor pase solo', p: 0, fb: 'La falta de información deja espacio al rumor.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Radio comunitaria', claves: ['radio', 'comunitaria', 'cuna', 'emisora', 'mensaje'] },
            { n: 'Enfoque intercultural', claves: ['kichwa', 'castellano', 'shuar', 'idioma', 'intercultural'] },
            { n: 'Líderes y canales comunitarios', claves: ['comite', 'promotor', 'dirigentes', 'carteles', 'comunidad'] }
          ],
          evitar: [ { claves: ['solo facebook', 'que pase solo'], fb: 'Un solo canal o el silencio no llegan a todos.' } ],
          modelo: 'Comunicaremos por la radio comunitaria en kichwa y castellano, con carteles en el centro y a través de los comités locales y promotores de salud de cada comunidad.'
        }
      ]
    }
  },

  /* ===================== ASS-22 Trabajo de Integración Curricular ===================== */
  {
    id: 'asig-ASS-22', cod: 'ASS-22',
    titulo: 'Defender el proyecto integrador ante el tribunal',
    asignaturas: ['ASS-22'],
    persona: { nombre: 'Mgs. Verónica Huatatoca', rol: 'Presidenta del tribunal de titulación', avatar: '👩🏽‍🏫', pitch: 1.05 },
    contexto: 'Presentas tu trabajo de integración curricular: una propuesta para reducir el tiempo de espera en admisión del centro de salud. El tribunal te hace preguntas.',
    objetivo: 'Integrar los aprendizajes de la carrera (investigación, gestión, calidad, presupuesto y ética) en la defensa de una propuesta de mejora.',
    pasos: [
      { dice: '¿Cuál es el problema y el objetivo de su trabajo?', opciones: [
          { t: 'El problema es un tiempo de espera promedio de 95 minutos en admisión; el objetivo es proponer una mejora que lo reduzca a menos de 45 minutos en seis meses.', p: 2, r: 'Claro y medible.', fb: 'Un problema con datos y un objetivo medible orientan todo el trabajo.' },
          { t: 'Quiero mejorar la atención en general.', p: 1, r: 'Muy amplio.', fb: 'Un objetivo vago no se puede evaluar.' },
          { t: 'Elegí el tema porque era fácil.', p: 0, r: '…', fb: 'No justifica la pertinencia del trabajo.' } ] },
      { dice: '¿Qué metodología utilizó?', opciones: [
          { t: 'Investigación aplicada: medí tiempos por etapa, apliqué encuestas de satisfacción con consentimiento, analicé causas con Ishikawa y estimé el costo de la propuesta.', p: 2, r: 'Integra varias asignaturas.', fb: 'La metodología integra investigación, calidad y presupuesto.' },
          { t: 'Pregunté a algunos compañeros.', p: 1, r: 'Insuficiente.', fb: 'Sin instrumentos ni muestra la evidencia es débil.' },
          { t: 'Busqué en internet un trabajo parecido.', p: 0, r: 'Eso es plagio.', fb: 'Copiar trabajos vulnera la ética académica.' } ] },
      { dice: '¿Cuáles son sus resultados y su propuesta?', opciones: [
          { t: 'La principal causa es la entrega de turnos a una sola hora; propongo agenda por bloques, cupos prioritarios y un indicador mensual, con costo bajo y respetando la confidencialidad.', p: 2, r: 'Propuesta viable y sustentada.', fb: 'Resultados, propuesta viable e indicadores cierran un buen trabajo integrador.' },
          { t: 'Que contraten más personal.', p: 1, r: '¿Con qué presupuesto?', fb: 'Una propuesta sin análisis de viabilidad es débil.' },
          { t: 'No tengo resultados todavía.', p: 0, r: '…', fb: 'Sin resultados el trabajo está incompleto.' } ] }
    ],
    vivo: {
      lugar: 'Aula de titulación del Instituto Superior Tecnológico CIC-Yasuní', fondo: 'aula',
      inicio: { confianza: 45, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '📊', t: 'Proyectar la diapositiva con el dato de 95 minutos', p: 2, fb: 'El dato concreto da fuerza al problema.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🎯', t: 'Leer el objetivo medible del trabajo', p: 2, fb: 'El objetivo orienta la evaluación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '😅', t: 'Decir que eligió el tema por ser fácil', p: 0, fb: 'No justifica la pertinencia.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Problema con datos', claves: ['problema', 'tiempo de espera', '95', 'noventa y cinco', 'minutos'] },
            { n: 'Objetivo medible', claves: ['objetivo', 'reducir', 'menos de 45', '45 minutos', 'medible'] },
            { n: 'Plazo y pertinencia', claves: ['seis meses', 'plazo', 'centro de salud', 'admision', 'usuarios'] }
          ],
          evitar: [ { claves: ['era facil', 'por cumplir'], fb: 'Hay que justificar la pertinencia del tema.' } ],
          modelo: 'El problema es un tiempo de espera promedio de 95 minutos en la admisión del centro de salud. Mi objetivo es proponer una mejora que lo reduzca a menos de 45 minutos en seis meses.'
        },
        {
          acciones: [
            { icono: '⏱️', t: 'Mostrar la hoja de medición de tiempos', p: 2, fb: 'Evidencia la recolección de datos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🐟', t: 'Presentar el diagrama de Ishikawa', p: 2, fb: 'Muestra el análisis de causas.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📋', t: 'Admitir que copió un trabajo de internet', p: 0, fb: 'El plagio vulnera la ética académica.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Investigación aplicada', claves: ['investigacion aplicada', 'medi', 'medicion', 'tiempos por etapa', 'datos'] },
            { n: 'Instrumentos y ética', claves: ['encuesta', 'consentimiento', 'satisfaccion', 'instrumento', 'muestra'] },
            { n: 'Análisis de causas y costos', claves: ['ishikawa', 'causas', 'costo', 'presupuesto', 'analisis'] }
          ],
          evitar: [ { claves: ['copie', 'busque en internet'], fb: 'El plagio es una falta grave.' } ],
          modelo: 'Fue una investigación aplicada: medí los tiempos por etapa, apliqué encuestas de satisfacción con consentimiento, analicé las causas con el diagrama de Ishikawa y estimé el costo de la propuesta.'
        },
        {
          acciones: [
            { icono: '🗓️', t: 'Presentar el modelo de agenda por bloques', p: 2, fb: 'Es una propuesta concreta y viable.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📈', t: 'Mostrar el indicador de seguimiento propuesto', p: 2, fb: 'El indicador permite evaluar la mejora.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙊', t: 'Decir que aún no tiene resultados', p: 0, fb: 'Sin resultados el trabajo está incompleto.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Resultado principal', claves: ['causa', 'resultado', 'una sola hora', 'turnos', 'encontre'] },
            { n: 'Propuesta viable', claves: ['agenda por bloques', 'bloques', 'cupos prioritarios', 'propuesta', 'costo bajo'] },
            { n: 'Indicadores y ética', claves: ['indicador', 'mensual', 'seguimiento', 'confidencialidad', 'calidad'] }
          ],
          evitar: [ { claves: ['no tengo resultados', 'no se'], fb: 'La defensa debe presentar resultados.' } ],
          modelo: 'Encontré que la causa principal es la entrega de turnos a una sola hora. Propongo una agenda por bloques con cupos prioritarios, de costo bajo, con un indicador mensual de seguimiento y respetando la confidencialidad.'
        }
      ]
    }
  }
]);
