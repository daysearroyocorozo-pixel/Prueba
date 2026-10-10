/* =========================================================
   Datos del simulador de la carrera de Administración de
   Sistemas de Salud (ISTY), modalidad en línea, 4 períodos.
   Fuente curricular: informe de valoración del proyecto de carrera
   (Anexo 2): malla, perfil de egreso y líneas de investigación.
   El establecimiento del simulador (Centro de Salud Tipo C
   «Río Puyo») es ficticio. Las referencias normativas son generales
   y formativas; deben ser validadas por los docentes con la
   normativa sanitaria vigente.
   ========================================================= */

const NIVELES = [
  { id: 'basico', nombre: 'Básico', emoji: '🟢', desc: '6 usuarios y pocas tareas internas.', n: 6, ev: 0.25, llegada: 25 },
  { id: 'intermedio', nombre: 'Intermedio', emoji: '🟡', desc: '8 usuarios, tareas internas e imprevistos.', n: 8, ev: 0.4, llegada: 14 },
  { id: 'avanzado', nombre: 'Avanzado', emoji: '🔴', desc: '10 usuarios, sala de espera llena y muchos imprevistos.', n: 10, ev: 0.55, llegada: 8 }
];

const MODS = {
  jor: { nombre: 'Jornada', emoji: '🏥' },
  fin: { nombre: 'Finanzas', emoji: '💰' },
  snc: { nombre: 'Sistema de Salud y calidad', emoji: '⚕️' },
  casos: { nombre: 'Casos', emoji: '🤝' }
};

const MALLA_SAL = [
  { cod: 'ASS-01', n: 'Metodología de la Investigación', pao: 1, mod: ['casos'], rel: 'parcial', sim: 'Recolección y análisis de datos sobre la satisfacción de los usuarios del centro de salud.' },
  { cod: 'ASS-02', n: 'Expresión Oral y Escrita', pao: 1, mod: ['jor'], rel: 'directa', sim: 'Comunicación clara y empática con los usuarios y redacción de documentos administrativos.' },
  { cod: 'ASS-03', n: 'Matemática', pao: 1, mod: ['fin'], rel: 'directa', sim: 'Porcentajes, proporciones y ecuaciones aplicadas a indicadores de gestión en salud.' },
  { cod: 'ASS-04', n: 'Tecnologías de la Información y la Comunicación', pao: 1, mod: ['jor', 'casos'], rel: 'directa', sim: 'Sistemas de agendamiento, registro digital y seguridad de la información de los pacientes.' },
  { cod: 'ASS-05', n: 'Fundamentos de la Administración', pao: 1, mod: ['jor', 'snc'], rel: 'directa', sim: 'Planificación, organización, dirección y control aplicados a un establecimiento de salud.' },
  { cod: 'ASS-06', n: 'Contabilidad Básica', pao: 1, mod: ['fin'], rel: 'directa', sim: 'Registro de operaciones, débito y crédito, ecuación contable e informes básicos.' },
  { cod: 'ASS-07', n: 'Fundamentos de Economía', pao: 2, mod: ['fin'], rel: 'directa', sim: 'Oferta, demanda, costos y política económica en los servicios de salud.' },
  { cod: 'ASS-08', n: 'Técnicas de Gestión Documental', pao: 2, mod: ['jor', 'snc'], rel: 'directa', sim: 'Archivo de historias clínicas, préstamo controlado, conservación y confidencialidad.' },
  { cod: 'ASS-09', n: 'Administración de Sistemas de Salud I', pao: 2, mod: ['jor', 'snc'], rel: 'directa', sim: 'Admisión, agendamiento, estadística y organización de un establecimiento de primer nivel.' },
  { cod: 'ASS-10', n: 'Fundamentos de Marketing en Sistemas de Salud', pao: 2, mod: ['casos'], rel: 'directa', sim: 'Promoción de servicios y campañas de salud con enfoque intercultural.' },
  { cod: 'ASS-11', n: 'Presupuesto en Sistemas de Salud', pao: 2, mod: ['fin', 'jor'], rel: 'directa', sim: 'Ciclo presupuestario, certificación, compromiso, devengado y ejecución en salud.' },
  { cod: 'ASS-12', n: 'Derecho Administrativo en Salud', pao: 2, mod: ['snc', 'jor'], rel: 'directa', sim: 'Actos administrativos, derechos de los pacientes y responsabilidad del servidor.' },
  { cod: 'ASS-13', n: 'Talento Humano', pao: 3, mod: ['casos', 'jor'], rel: 'directa', sim: 'Cuadros de turnos, selección, evaluación del desempeño y clima laboral del personal de salud.' },
  { cod: 'ASS-14', n: 'Administración de Sistemas de Salud II', pao: 3, mod: ['snc', 'jor'], rel: 'directa', sim: 'Planificación, indicadores de producción y gestión de la red de servicios.' },
  { cod: 'ASS-15', n: 'Sistema Nacional de Salud', pao: 3, mod: ['snc', 'jor'], rel: 'directa', sim: 'Niveles de atención, red pública y complementaria, referencia y contrarreferencia.' },
  { cod: 'ASS-16', n: 'Tributación en Sistemas de Salud', pao: 3, mod: ['fin'], rel: 'directa', sim: 'Comprobantes de venta, retenciones e impuestos en las compras de un establecimiento.' },
  { cod: 'ASS-17', n: 'Operación y Logística en Sistemas de Salud', pao: 3, mod: ['jor', 'fin'], rel: 'directa', sim: 'Inventarios de farmacia y bodega, caducidad, punto de reorden y distribución.' },
  { cod: 'ASS-18', n: 'Ética Profesional', pao: 4, mod: ['jor', 'casos'], rel: 'directa', sim: 'Confidencialidad, conflictos de interés, trato digno y gratuidad del servicio público.' },
  { cod: 'ASS-19', n: 'Calidad en el Sistema de Salud', pao: 4, mod: ['snc', 'jor'], rel: 'directa', sim: 'Estándares de calidad, auditoría, satisfacción del usuario y mejora continua.' },
  { cod: 'ASS-20', n: 'Tecnología e Innovación en Sistemas de Salud', pao: 4, mod: ['casos', 'jor'], rel: 'directa', sim: 'Agendamiento digital, historia clínica electrónica e innovación inclusiva.' },
  { cod: 'ASS-21', n: 'Comunicación Organizacional en Sistemas de Salud', pao: 4, mod: ['casos', 'jor'], rel: 'directa', sim: 'Comunicación interna, manejo de crisis y comunicación con la comunidad.' },
  { cod: 'ASS-22', n: 'Trabajo de Integración Curricular', pao: 4, mod: ['jor', 'fin', 'snc', 'casos'], rel: 'parcial', sim: 'Integra todos los módulos; los reportes sirven como evidencia.' }
];

/* ---------------- USUARIOS VIRTUALES ----------------
   prio: grupo de atención prioritaria. Opciones: p (0-2), fb, ef { min, sat, conf (falta de confidencialidad),
   norma (incumplimiento normativo), doc (registro), abast (abastecimiento) }. */
const USUARIOS = [
  { id: 'u1', nombre: 'Doña Rosa', avatar: '👵🏽', perfil: 'Adulta mayor que necesita un especialista', prio: true, pitch: 1.2, asig: ['ASS-15', 'ASS-02'],
    dice: 'Mijita, el doctor me dijo que tengo que ver al cardiólogo. ¿Aquí mismo me atiende?', o: [
      { t: 'La atiendo con prioridad, le explico que el médico del centro elabora la referencia al hospital, gestiono el formulario y la cita y le entrego por escrito la fecha y lo que debe llevar.', p: 2, fb: 'El primer nivel deriva al nivel de mayor complejidad mediante el proceso de referencia; la información clara y escrita garantiza la continuidad de la atención.', ef: { min: 12, sat: 95, doc: 1 } },
      { t: 'Le digo que vaya directamente al hospital y haga fila allá.', p: 0, fb: 'Saltarse la referencia satura el segundo nivel y deja a la usuaria sin cita ni seguimiento; además es una persona de atención prioritaria.', ef: { min: 2, sat: 15, norma: 1 } },
      { t: 'Le agendo una cita con el médico general para que él vea qué hace.', p: 1, fb: 'Es un paso posible, pero la referencia ya fue indicada: corresponde tramitarla y orientarla.', ef: { min: 5, sat: 55 } }
    ]},
  { id: 'u2', nombre: 'Sra. Nantar', avatar: '👩🏽‍🍼', perfil: 'Madre shuar con su hijo con fiebre', prio: true, pitch: 1.15, asig: ['ASS-09', 'ASS-18'],
    dice: 'Mi guagua tiene fiebre desde anoche y no tengo cita. Venimos de lejos, de la comunidad.', o: [
      { t: 'La registro de inmediato en admisión como atención prioritaria, aviso a enfermería para el triaje y le explico con calma el paso siguiente.', p: 2, fb: 'Niñas, niños y personas con síntomas de alarma requieren atención prioritaria; el triaje define la urgencia, no la falta de cita.', ef: { min: 8, sat: 95, doc: 1 } },
      { t: 'Le digo que sin cita no se puede y que llame al número de agendamiento.', p: 0, fb: 'Negar atención a un niño con fiebre por no tener cita vulnera el derecho a la salud y la atención prioritaria.', ef: { min: 2, sat: 10, norma: 1 } },
      { t: 'Le pido que espere en la sala hasta que haya un espacio libre.', p: 1, fb: 'No se le niega la atención, pero sin triaje no se sabe si es una urgencia.', ef: { min: 3, sat: 45 } }
    ]},
  { id: 'u3', nombre: 'Sr. Jorge', avatar: '😠', perfil: 'Usuario molesto por la espera', prio: false, pitch: 0.85, asig: ['ASS-19', 'ASS-02'],
    dice: '¡Llevo dos horas esperando y nadie me dice nada! ¡Esto es un abuso!', o: [
      { t: 'Lo escucho sin interrumpir, me disculpo, reviso su turno, le informo el tiempo estimado y le ofrezco registrar su reclamo en el buzón o formulario de quejas.', p: 2, fb: 'Escucha activa, información veraz y registro del reclamo: los reclamos son insumo para la mejora de la calidad.', ef: { min: 9, sat: 80, doc: 1 } },
      { t: 'Le contesto que no es mi culpa y que se siente.', p: 0, fb: 'La respuesta hostil escala el conflicto y deteriora la imagen del servicio.', ef: { min: 2, sat: 5 } },
      { t: 'Le digo que ya mismo lo llaman, sin revisar su turno.', p: 1, fb: 'Calma por un momento, pero sin información verificable la molestia vuelve.', ef: { min: 2, sat: 35 } }
    ]},
  { id: 'u4', nombre: 'Sra. Patricia', avatar: '👩🏻', perfil: 'Familiar que pide una historia clínica', prio: false, pitch: 1.1, asig: ['ASS-18', 'ASS-08'],
    dice: 'Soy la hermana de Marco Cerda. Necesito ver su historia clínica para saber qué le diagnosticaron.', o: [
      { t: 'Le explico con respeto que la historia clínica es confidencial: solo el paciente, su representante legal o quien tenga su autorización escrita puede acceder, y le indico el procedimiento.', p: 2, fb: 'La historia clínica es un documento confidencial; los derechos del paciente y la protección de datos personales exigen su autorización.', ef: { min: 6, sat: 65, doc: 1 } },
      { t: 'Le muestro la historia en la pantalla porque es su familiar.', p: 0, fb: 'Revelar información clínica sin autorización vulnera la confidencialidad y los derechos del paciente.', ef: { min: 4, sat: 90, conf: 1 } },
      { t: 'Le digo que no puedo y no le doy más explicación.', p: 1, fb: 'Proteges la confidencialidad, pero faltó orientar sobre la vía correcta.', ef: { min: 2, sat: 30 } }
    ]},
  { id: 'u5', nombre: 'Don Luis', avatar: '👴🏽', perfil: 'Paciente con hoja de contrarreferencia', prio: true, pitch: 0.9, asig: ['ASS-15', 'ASS-08'],
    dice: 'Me dieron el alta en el hospital y me dijeron que traiga este papel aquí para seguir el control.', o: [
      { t: 'Recibo la contrarreferencia, la adjunto a su historia clínica, le agendo el control con el médico de familia y registro el seguimiento.', p: 2, fb: 'La contrarreferencia devuelve al paciente al primer nivel con indicaciones; archivarla y agendar el control asegura la continuidad.', ef: { min: 10, sat: 92, doc: 2 } },
      { t: 'Le digo que ese papel es del hospital y que lo guarde él.', p: 0, fb: 'Sin integrar la contrarreferencia se pierde la información clínica y el seguimiento.', ef: { min: 2, sat: 20, norma: 1 } },
      { t: 'Le agendo una cita, pero dejo el papel en una bandeja para archivarlo después.', p: 1, fb: 'Se agenda el control, pero el documento puede perderse o llegar tarde al médico.', ef: { min: 6, sat: 70 } }
    ]},
  { id: 'u6', nombre: 'Sra. Lucía', avatar: '🤰🏽', perfil: 'Mujer embarazada para control prenatal', prio: true, pitch: 1.25, asig: ['ASS-09', 'ASS-02'],
    dice: 'Disculpe, vengo a mi control del embarazo, pero perdí mi cita de la semana pasada.', o: [
      { t: 'La atiendo de inmediato como atención prioritaria, reprogramo su control prenatal en la agenda y le ofrezco asiento mientras confirmo el horario.', p: 2, fb: 'Las mujeres embarazadas son grupo de atención prioritaria y el control prenatal no debe interrumpirse.', ef: { min: 7, sat: 95, doc: 1 } },
      { t: 'Le digo que, como perdió la cita, debe volver a solicitarla por teléfono.', p: 0, fb: 'Devolverla sin atención pone en riesgo el control prenatal y desconoce la prioridad.', ef: { min: 2, sat: 10, norma: 1 } },
      { t: 'Le doy un asiento y la atiendo cuando llegue su turno.', p: 1, fb: 'Mejora su comodidad, pero no aplica la atención prioritaria.', ef: { min: 2, sat: 50 } }
    ]},
  { id: 'u7', nombre: 'Sr. Kevin', avatar: '👨🏽‍🦽', perfil: 'Persona con discapacidad', prio: true, pitch: 1.0, asig: ['ASS-12', 'ASS-19'],
    dice: 'Necesito una cita de terapia, pero el consultorio está en el segundo piso y la rampa está bloqueada con cajas.', o: [
      { t: 'Gestiono que lo atiendan en un consultorio de planta baja, le agendo la cita y reporto a la Dirección que despejen la rampa.', p: 2, fb: 'Se garantiza la atención prioritaria y la accesibilidad, y se corrige la causa.', ef: { min: 10, sat: 95, doc: 1 } },
      { t: 'Le pido que venga con alguien que lo ayude a subir.', p: 0, fb: 'Se traslada a la persona una barrera que el establecimiento debe eliminar.', ef: { min: 2, sat: 10, norma: 1 } },
      { t: 'Le agendo la cita y le digo que ya despejarán la rampa.', p: 1, fb: 'Agenda, pero no asegura la accesibilidad ni reporta el problema.', ef: { min: 4, sat: 45 } }
    ]},
  { id: 'u8', nombre: 'Joven Andrés', avatar: '🧑🏻', perfil: 'Usuario que ofrece dinero por una cita', prio: false, pitch: 1.1, asig: ['ASS-18'],
    dice: 'Mire, le doy diez dólares y me pone hoy con el odontólogo, ¿ya?', o: [
      { t: 'Rechazo el dinero con firmeza y respeto, le recuerdo que la atención en la red pública es gratuita, le doy el primer turno disponible y registro el hecho.', p: 2, fb: 'La atención en los establecimientos públicos es gratuita; aceptar dinero para alterar turnos es corrupción.', ef: { min: 5, sat: 60, doc: 1 } },
      { t: 'Acepto; total es poco y nadie se entera.', p: 0, fb: 'Cobrar por un servicio público gratuito o alterar turnos por dinero es una falta grave y puede ser delito.', ef: { min: 3, sat: 90, norma: 2 } },
      { t: 'Rechazo el dinero, pero igual lo pongo antes que los demás.', p: 0, fb: 'Dar trato preferente sin criterio clínico vulnera la equidad en el acceso.', ef: { min: 4, sat: 80, norma: 1 } }
    ]},
  { id: 'u9', nombre: 'Sr. Wilson', avatar: '🧔🏽', perfil: 'Persona en movilidad humana sin documentos', prio: false, pitch: 0.95, asig: ['ASS-15', 'ASS-12'],
    dice: 'Soy de Venezuela, trabajo en Puyo y no tengo la cédula a mano. Me duele mucho una muela. ¿Me pueden atender?', o: [
      { t: 'Le explico que tiene derecho a ser atendido, registro sus datos con el documento que tenga y lo derivo a la agenda de odontología o de morbilidad según el dolor.', p: 2, fb: 'El derecho a la salud no depende de la nacionalidad ni de un documento; la admisión registra los datos disponibles.', ef: { min: 8, sat: 90, doc: 1 } },
      { t: 'Le digo que sin cédula ecuatoriana no puede atenderse aquí.', p: 0, fb: 'Negar la atención por nacionalidad o documentación es discriminatorio.', ef: { min: 2, sat: 5, norma: 1 } },
      { t: 'Le digo que regrese cuando traiga algún documento.', p: 1, fb: 'No niega el derecho, pero retrasa la atención de un dolor agudo.', ef: { min: 2, sat: 35 } }
    ]},
  { id: 'u10', nombre: 'Sra. Carmen', avatar: '👩🏽‍🦳', perfil: 'Usuaria con receta de un medicamento agotado', prio: false, pitch: 1.1, asig: ['ASS-17', 'ASS-19'],
    dice: 'En farmacia me dicen que no hay el medicamento para la presión. ¿Y ahora qué hago?', o: [
      { t: 'Verifico en el sistema de inventario, consulto al médico si hay alternativa del cuadro básico disponible, registro el faltante y reporto a bodega para el pedido.', p: 2, fb: 'Registrar el faltante y buscar una alternativa terapéutica autorizada protege la continuidad del tratamiento.', ef: { min: 9, sat: 80, doc: 1, abast: 5 } },
      { t: 'Le digo que compre en una farmacia privada y ya.', p: 0, fb: 'Trasladar el gasto al usuario sin registrar el faltante oculta el problema de abastecimiento.', ef: { min: 2, sat: 20, abast: -5 } },
      { t: 'Le digo que vuelva la próxima semana a ver si llega.', p: 1, fb: 'No resuelve la continuidad del tratamiento ni deja registro del faltante.', ef: { min: 2, sat: 35 } }
    ]}
];

/* Usuarios adicionales que llegan durante el brote de dengue */
const USUARIOS_EXTRA = [
  { id: 'x1', nombre: 'Sr. Tanguila', avatar: '🤒', perfil: 'Usuario con fiebre (posible dengue)', prio: false, pitch: 0.95, asig: ['ASS-15'],
    dice: 'Tengo fiebre alta, me duelen los huesos y detrás de los ojos. En mi barrio hay varios así.', o: [
      { t: 'Lo registro, aviso a triaje por sospecha de dengue y anoto su barrio para la notificación epidemiológica que hace el personal de salud.', p: 2, fb: 'El registro oportuno y la derivación a triaje permiten detectar signos de alarma y apoyar la vigilancia epidemiológica.', ef: { min: 7, sat: 90, doc: 1 } },
      { t: 'Le digo que tome paracetamol en casa y regrese si empeora.', p: 0, fb: 'El personal administrativo no indica tratamientos; además se pierde el registro del caso.', ef: { min: 2, sat: 30, norma: 1 } },
      { t: 'Le doy un turno normal de consulta para dentro de dos horas.', p: 1, fb: 'Se le atiende, pero sin triaje podría tener signos de alarma.', ef: { min: 3, sat: 50 } }
    ]},
  { id: 'x2', nombre: 'Niña Mayra con su papá', avatar: '👨🏽‍👧🏽', perfil: 'Niña con fiebre (posible dengue)', prio: true, pitch: 1.0, asig: ['ASS-15', 'ASS-09'],
    dice: 'Mi hija tiene fiebre y manchas en la piel desde ayer. Nos dijeron que hay dengue en el barrio.', o: [
      { t: 'La registro como atención prioritaria, la paso de inmediato a triaje y anoto los datos para la notificación del caso.', p: 2, fb: 'Niñez y sospecha de dengue con signos en la piel: prioridad y triaje inmediato.', ef: { min: 6, sat: 95, doc: 1 } },
      { t: 'Les pido que hagan la fila como todos.', p: 0, fb: 'Una niña con síntomas de alarma es prioridad.', ef: { min: 1, sat: 10, norma: 1 } },
      { t: 'Le doy un turno y le pido que espere sentada.', p: 1, fb: 'No se le niega la atención, pero falta priorizarla.', ef: { min: 2, sat: 50 } }
    ]}
];

/* Tareas internas (las pide la Directora Administrativa) */
const TAREAS = [
  { id: 't1', titulo: 'Medicamentos por caducar', quien: 'Directora Administrativa', voz: 'Revisa la bodega de farmacia: creo que hay medicamentos por caducar.', txt: 'La directora te pide revisar el stock de farmacia y bodega: hay lotes próximos a caducar.', asig: ['ASS-17'], o: [
    { t: 'Revisar el kárdex y las fechas, aplicar el criterio de que primero sale lo que primero caduca, reportar los lotes próximos a vencer para redistribuirlos en la red y actualizar el inventario.', p: 2, fb: 'El control de caducidad y la rotación por fecha de vencimiento evitan pérdidas y desabastecimiento.', ef: { min: 12, doc: 1, abast: 20 } },
    { t: 'Botar todo lo que esté cerca de caducar para evitar problemas.', p: 0, fb: 'Desechar medicamentos vigentes sin procedimiento es pérdida de recursos públicos; la baja sigue un proceso.', ef: { min: 5, abast: -15, norma: 1 } },
    { t: 'Poner adelante los lotes más nuevos porque se ven mejor.', p: 1, fb: 'Ordena la bodega, pero al revés: así caducan los lotes antiguos.', ef: { min: 8, abast: -5 } }
  ]},
  { id: 't2', titulo: 'Cuadro de turnos de enfermería', quien: 'Directora Administrativa', voz: 'Necesito el cuadro de turnos de enfermería del fin de semana; dos licenciadas pidieron el mismo día libre.', txt: 'Debes elaborar el cuadro de turnos del fin de semana; hay un conflicto por el mismo día libre.', asig: ['ASS-13'], o: [
    { t: 'Elaborar el cuadro con la cobertura mínima requerida, aplicar criterios transparentes (rotación equitativa y registro de turnos anteriores), conversar con ambas y publicar el cuadro.', p: 2, fb: 'La planificación de turnos con criterios objetivos garantiza la cobertura y la equidad.', ef: { min: 12, doc: 1 } },
    { t: 'Darle el día libre a la que mejor me cae.', p: 0, fb: 'La decisión arbitraria genera conflicto y vulnera la equidad.', ef: { min: 4, norma: 1 } },
    { t: 'Dejar sin cubrir ese turno para no tener conflictos.', p: 0, fb: 'Dejar el servicio sin cobertura pone en riesgo a los usuarios.', ef: { min: 3, norma: 1 } }
  ]},
  { id: 't3', titulo: 'Compra de insumos de curación', quien: 'Directora Administrativa', voz: 'Se están acabando las gasas y los guantes. Hay que comprar.', txt: 'La directora te pide gestionar la compra de insumos médicos de curación.', asig: ['ASS-11', 'ASS-17'], o: [
    { t: 'Verificar que la compra conste en la planificación anual, solicitar la certificación presupuestaria y seguir el procedimiento de contratación pública que corresponda.', p: 2, fb: 'Toda obligación de gasto requiere certificación presupuestaria previa y un procedimiento de contratación.', ef: { min: 10, doc: 1, pres: 10, abast: 10 } },
    { t: 'Comprar con dinero propio en una farmacia y pedir el reembolso después.', p: 0, fb: 'El gasto público sigue procedimientos y respaldos; no se compra por fuera del sistema.', ef: { min: 5, norma: 1, abast: 5 } },
    { t: 'Pedir cotizaciones por teléfono a dos proveedores conocidos.', p: 1, fb: 'Cotizar ayuda, pero falta la certificación y el procedimiento formal.', ef: { min: 6, pres: 2 } }
  ]},
  { id: 't4', titulo: 'Préstamo de historias clínicas', quien: 'Directora Administrativa', voz: 'En el archivo faltan historias clínicas y nadie sabe quién las tiene.', txt: 'Faltan historias clínicas en el archivo y no hay control de préstamos.', asig: ['ASS-08', 'ASS-18'], o: [
    { t: 'Implementar un registro de préstamo (fecha, responsable, consultorio y devolución), ubicar las historias faltantes y guardarlas en el archivo con acceso restringido.', p: 2, fb: 'El control de préstamo y el acceso restringido protegen la integridad y la confidencialidad de la historia clínica.', ef: { min: 12, doc: 2 } },
    { t: 'Dejar las historias en una mesa del pasillo para que cada médico tome la suya.', p: 0, fb: 'Cualquier persona podría leerlas: es una falta grave de confidencialidad.', ef: { min: 3, conf: 1 } },
    { t: 'Ordenar las historias por número, sin registro de préstamo.', p: 1, fb: 'Ordena el archivo, pero no evita nuevas pérdidas.', ef: { min: 8, doc: 1 } }
  ]},
  { id: 't5', titulo: 'Informe de producción del mes', quien: 'Directora Administrativa', voz: 'El distrito pide el informe de producción del mes con las atenciones por servicio.', txt: 'Debes consolidar el informe mensual de atenciones (producción) para el distrito de salud.', asig: ['ASS-14', 'ASS-03'], o: [
    { t: 'Consolidar los registros diarios de atenciones por servicio, verificar duplicados con estadística, calcular totales y porcentajes y enviarlo en el formato oficial y a tiempo.', p: 2, fb: 'La información estadística confiable y oportuna sustenta la planificación de la red.', ef: { min: 12, doc: 2 } },
    { t: 'Copiar las cifras del mes pasado para cumplir el plazo.', p: 0, fb: 'Reportar datos falsos distorsiona la planificación y es una falta grave.', ef: { min: 3, norma: 1 } },
    { t: 'Enviar los datos sin revisar duplicados.', p: 1, fb: 'Cumple el plazo, pero la información puede estar inflada.', ef: { min: 6, doc: 1 } }
  ]}
];

/* Imprevistos */
const EVENTOS = [
  { id: 'desabasto', txt: 'Farmacia avisa que se agotó la amoxicilina en suspensión y hay recetas pendientes para niños.', voz: '¡Se terminó la amoxicilina para niños!', o: [
    { t: 'Informar a la Dirección y a los médicos, solicitar préstamo o redistribución a otro establecimiento de la red, registrar el faltante y tramitar el pedido urgente.', p: 2, fb: 'La redistribución en la red y el registro del faltante aseguran la continuidad de los tratamientos.', ef: { min: 10, doc: 1, abast: 10 } },
    { t: 'Decir a los padres que compren en farmacias privadas, sin registrar nada.', p: 0, fb: 'Sin registro, el desabastecimiento no se corrige y el gasto recae en las familias.', ef: { min: 3, abast: -15, colaSat: -10 } }
  ], ef0: { abast: -25 } },
  { id: 'sistema', txt: 'Se cayó el sistema de agendamiento y la sala de espera se llena.', voz: '¡Se cayó el sistema de citas!', o: [
    { t: 'Reportar a TIC, informar con respeto a la sala el tiempo estimado y registrar manualmente los turnos para ingresarlos después.', p: 2, fb: 'Plan de contingencia, información oportuna y registro manual para no perder citas.', ef: { min: 10, doc: 1, colaSat: 10 } },
    { t: 'Cerrar la admisión hasta que vuelva el sistema.', p: 0, fb: 'Suspender la atención sin alternativas afecta a los usuarios y puede dejar sin atender casos urgentes.', ef: { min: 25, colaSat: -20 } }
  ]},
  { id: 'dengue', txt: 'Brote de dengue en barrios de Puyo: llegan más usuarios con fiebre de lo previsto.', voz: 'Ya van varios pacientes con fiebre esta mañana.', o: [
    { t: 'Coordinar con la Dirección la ampliación de turnos de morbilidad, priorizar con triaje, reforzar el registro de casos y verificar el stock de suero oral y paracetamol.', p: 2, fb: 'La respuesta organizada a un aumento de demanda combina priorización, registro para vigilancia y abastecimiento.', ef: { min: 8, doc: 1, abast: 5, extra: 2 } },
    { t: 'Seguir con la agenda normal y que los nuevos esperen al final.', p: 0, fb: 'Ignorar el aumento de demanda retrasa la detección de casos graves.', ef: { min: 2, colaSat: -15, extra: 2 } }
  ]},
  { id: 'auditoria', txt: 'Llega sin aviso un equipo de auditoría de calidad para revisar registros de admisión e historias clínicas.', voz: 'Buenos días, venimos a revisar el cumplimiento de estándares.', o: [
    { t: 'Recibir al equipo con cortesía, facilitar los registros solicitados de forma ordenada, acompañar la revisión y anotar las observaciones para el plan de mejora.', p: 2, fb: 'La auditoría es una oportunidad de mejora; la transparencia y el orden documental facilitan el proceso.', ef: { min: 12, doc: 1 } },
    { t: 'Esconder las historias clínicas incompletas antes de que las vean.', p: 0, fb: 'Ocultar información a una auditoría es una falta grave e impide mejorar.', ef: { min: 5, norma: 2 } }
  ]},
  { id: 'interprete', txt: 'Llega una abuela kichwa con dolor abdominal; habla poco castellano y viene sola.', voz: 'Alli puncha… (la abuela señala su abdomen y se preocupa)', o: [
    { t: 'Saludarla con respeto, buscar a un intérprete o personal que hable kichwa, registrarla y pasarla a triaje, respetando su cultura y su consentimiento.', p: 2, fb: 'La atención intercultural garantiza que la usuaria entienda y decida; la comunicación en su idioma es parte de la calidad.', ef: { min: 10, doc: 1, colaSat: 5 } },
    { t: 'Hablarle más fuerte en castellano hasta que entienda.', p: 0, fb: 'Elevar la voz no supera la barrera de idioma y es irrespetuoso.', ef: { min: 5, colaSat: -5, norma: 1 } }
  ]},
  { id: 'visitador', txt: 'Un representante de un laboratorio farmacéutico pide la lista de pacientes con diabetes "para ofrecerles un producto".', voz: '¿Me pasa la lista de diabéticos? Es para ayudarles.', o: [
    { t: 'Negarse con cortesía: los datos de los pacientes son confidenciales y solo se usan para la atención y los fines autorizados.', p: 2, fb: 'La protección de datos personales y la confidencialidad prohíben entregar datos de salud con fines comerciales.', ef: { min: 2 } },
    { t: 'Entregarle la lista impresa; parece un buen producto.', p: 0, fb: 'Entregar datos de salud a terceros es una infracción grave.', ef: { min: 2, conf: 1 } }
  ]}
];

/* ---------------- BANCOS DE PREGUNTAS ---------------- */
function rndI(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function mezclar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function mc(q, ok, malas, exp, asig) { const o = mezclar([ok, ...malas]); return { q, o, c: o.indexOf(ok), exp, asig }; }
const coma = n => String(n).replace('.', ',');
const usd = n => '$' + Math.round(n).toLocaleString('es-EC');
const usd2 = n => '$' + coma((Math.round(n * 100) / 100).toFixed(2));

/* Finanzas y presupuesto en salud: las preguntas de cálculo van AL FINAL (N_CALC_FIN) */
const N_CALC_FIN = 6;
const FIN_BANCO = [
  () => mc('La ecuación contable fundamental es…', 'Activo = Pasivo + Patrimonio', ['Activo = Ingresos − Gastos', 'Pasivo = Activo + Patrimonio', 'Patrimonio = Activo + Pasivo'], 'Todo lo que la entidad tiene se financia con obligaciones o con patrimonio.', 'ASS-06'),
  () => mc('Al comprar guantes de examinación pagando desde la cuenta bancaria, se registra…', 'Débito a Inventario de insumos médicos y crédito a Bancos', ['Débito a Bancos y crédito a Inventario', 'Débito a Patrimonio y crédito a Ingresos', 'Solo un crédito a Gastos'], 'Aumenta un activo (insumos) y disminuye otro (bancos).', 'ASS-06'),
  () => mc('Antes de contraer una obligación de gasto en un establecimiento público de salud se requiere…', 'La certificación presupuestaria', ['Solo una factura proforma', 'La firma de un testigo', 'Una carta del proveedor'], 'La certificación garantiza que existen recursos disponibles en la partida.', 'ASS-11'),
  () => mc('¿Cuál es el orden de los momentos del gasto?', 'Compromiso, devengado y pago', ['Pago, compromiso y devengado', 'Devengado, pago y compromiso', 'Pago y luego certificación'], 'Primero se compromete, luego se reconoce la obligación (devengado) y finalmente se paga.', 'ASS-11'),
  () => mc('El pago de sueldos del personal de enfermería es un gasto…', 'Corriente (de personal)', ['De inversión', 'De capital', 'De financiamiento'], 'Los gastos corrientes sostienen la operación permanente del servicio.', 'ASS-11'),
  () => mc('La compra de un ecógrafo para el centro de salud se clasifica como…', 'Gasto de capital (bien de larga duración)', ['Gasto corriente de personal', 'Ingreso corriente', 'Gasto en suministros de oficina'], 'Los equipos de larga duración son bienes de capital y se registran como activos fijos.', 'ASS-11'),
  () => mc('Un costo fijo de un centro de salud es, por ejemplo…', 'El arriendo o los sueldos del personal de planta', ['Los reactivos usados por cada examen', 'Las gasas de cada curación', 'Los medicamentos dispensados'], 'Los costos fijos no varían con el número de atenciones en el corto plazo; los variables sí.', 'ASS-07'),
  () => mc('Si aumenta la demanda de atenciones por un brote y la oferta (médicos, horas) se mantiene, lo esperable es…', 'Que aumenten los tiempos de espera', ['Que bajen los tiempos de espera', 'Que no cambie nada', 'Que desaparezca la demanda'], 'Cuando la demanda supera la capacidad instalada, la "cola" aumenta; por eso se planifica la oferta.', 'ASS-07'),
  () => mc('La inflación afecta al presupuesto de salud porque…', 'Con el mismo dinero se compran menos medicamentos e insumos', ['Aumenta automáticamente el presupuesto', 'Reduce los precios de los insumos', 'No tiene ningún efecto'], 'La inflación reduce el poder adquisitivo del presupuesto asignado.', 'ASS-07'),
  () => mc('En las compras que realiza una entidad pública, esta actúa generalmente como…', 'Agente de retención de impuestos', ['Contribuyente exento de todo registro', 'Proveedor del SRI', 'Recaudador de multas de tránsito'], 'Las entidades públicas retienen y declaran los impuestos que corresponden según la normativa tributaria.', 'ASS-16'),
  () => mc('¿Qué documento debe exigirse al proveedor al recibir los insumos comprados?', 'Un comprobante de venta autorizado (factura)', ['Una nota a mano', 'Un mensaje de WhatsApp', 'Ninguno si es conocido'], 'Sin comprobante autorizado no hay respaldo del gasto ni del registro tributario.', 'ASS-16'),
  () => mc('El indicador "ejecución presupuestaria" compara…', 'Lo devengado con lo codificado (asignado vigente)', ['Los ingresos con la población', 'Las camas con los médicos', 'El inventario con las recetas'], 'Mide cuánto del presupuesto vigente se ha utilizado efectivamente.', 'ASS-11'),
  () => mc('El "stock de seguridad" de un medicamento sirve para…', 'Cubrir variaciones de consumo o retrasos en la entrega', ['Venderlo a otros establecimientos', 'Aumentar la caducidad', 'Reemplazar el kárdex'], 'Es una reserva que evita quiebres de stock mientras llega el pedido.', 'ASS-17'),
  // cálculos (siempre al final)
  () => { const cod = rndI(40, 120) * 10000, dev = Math.round(cod * rndI(35, 95) / 100); const r = Math.round(dev / cod * 10000) / 100; return { q: `El presupuesto codificado del centro de salud es ${usd(cod)} y lo devengado a la fecha es ${usd(dev)}. ¿Cuál es el porcentaje de ejecución presupuestaria? (dos decimales)`, num: r, tol: 0.05, exp: `Ejecución = ${usd(dev)} ÷ ${usd(cod)} × 100 = ${coma(r)} %.`, asig: 'ASS-11' }; },
  () => { const at = rndI(18, 60) * 100, c = rndI(30, 90) * 1000; const r = Math.round(c / at * 100) / 100; return { q: `En el mes, el servicio de consulta externa tuvo costos totales de ${usd(c)} y realizó ${at.toLocaleString('es-EC')} atenciones. ¿Cuál es el costo promedio por atención en USD? (dos decimales)`, num: r, tol: 0.05, exp: `Costo por atención = ${usd(c)} ÷ ${at.toLocaleString('es-EC')} = ${usd2(r)}.`, asig: 'ASS-03' }; },
  () => { const cd = rndI(8, 40), st = cd * rndI(10, 60) + rndI(0, cd - 1); const r = Math.round(st / cd * 10) / 10; return { q: `En bodega hay ${st} frascos de paracetamol en jarabe y el consumo diario promedio es de ${cd} frascos. ¿Para cuántos días alcanza el inventario? (un decimal)`, num: r, tol: 0.1, exp: `Días de inventario = ${st} ÷ ${cd} = ${coma(r)} días.`, asig: 'ASS-17' }; },
  () => { const camas = rndI(6, 15), dias = 30, oc = Math.round(camas * dias * rndI(40, 95) / 100); const r = Math.round(oc / (camas * dias) * 1000) / 10; return { q: `La sala de maternidad de corta estancia tiene ${camas} camas. En un mes de ${dias} días registró ${oc} días-cama ocupados. ¿Cuál es la tasa de ocupación en %? (un decimal)`, num: r, tol: 0.1, exp: `Ocupación = ${oc} ÷ (${camas} × ${dias}) × 100 = ${coma(r)} %.`, asig: 'ASS-14' }; },
  () => { const cd = rndI(10, 50), te = rndI(3, 12), ss = rndI(2, 6) * 10; const r = cd * te + ss; return { q: `El consumo diario de sobres de suero oral es ${cd}, el proveedor tarda ${te} días en entregar y el stock de seguridad es ${ss} sobres. ¿Cuál es el punto de reorden (en sobres)?`, num: r, tol: 0.5, exp: `Punto de reorden = consumo diario × tiempo de entrega + stock de seguridad = ${cd} × ${te} + ${ss} = ${r} sobres.`, asig: 'ASS-17' }; },
  () => { const cod = rndI(20, 80) * 1000, com = Math.round(cod * rndI(30, 90) / 100); return { q: `La partida de medicinas y productos farmacéuticos tiene ${usd(cod)} codificados y ${usd(com)} comprometidos. ¿Cuál es el saldo disponible en USD?`, num: cod - com, tol: 1, exp: `Saldo disponible = codificado − comprometido = ${usd(cod)} − ${usd(com)} = ${usd(cod - com)}.`, asig: 'ASS-11' }; }
];

/* Sistema Nacional de Salud y calidad */
const SNC_BANCO = [
  () => mc('Un centro de salud tipo C pertenece al…', 'Primer nivel de atención', ['Tercer nivel de atención', 'Cuarto nivel (investigación)', 'Nivel de especialidades hospitalarias'], 'Los centros de salud son establecimientos del primer nivel, puerta de entrada al sistema.', 'ASS-15'),
  () => mc('La puerta de entrada preferente al sistema de salud es…', 'El primer nivel de atención', ['El hospital de especialidades', 'La farmacia privada', 'La emergencia de un hospital de tercer nivel'], 'El primer nivel resuelve la mayoría de necesidades y deriva lo que requiere mayor complejidad.', 'ASS-15'),
  () => mc('La "referencia" es…', 'El envío de un paciente a un establecimiento de mayor complejidad con la información clínica', ['El regreso del paciente al primer nivel', 'Una carta de recomendación laboral', 'El cobro de una consulta'], 'La contrarreferencia es el retorno del paciente al nivel de origen con indicaciones de seguimiento.', 'ASS-15'),
  () => mc('La Red Pública Integral de Salud está conformada por…', 'El Ministerio de Salud Pública y la seguridad social pública (IESS, ISSFA, ISSPOL)', ['Solo clínicas privadas', 'Solo los GAD municipales', 'Las farmacias de cadena'], 'Los prestadores privados forman la red complementaria, que se articula mediante convenios.', 'ASS-15'),
  () => mc('La autoridad sanitaria nacional en Ecuador es…', 'El Ministerio de Salud Pública', ['El Servicio de Rentas Internas', 'El Ministerio de Turismo', 'Cada hospital por separado'], 'El MSP ejerce la rectoría del Sistema Nacional de Salud.', 'ASS-15'),
  () => mc('La historia clínica es…', 'Un documento confidencial que registra la atención del paciente', ['Un documento público que cualquiera puede leer', 'Propiedad del médico que atendió', 'Un formulario opcional'], 'Su acceso está limitado al paciente, su representante y al personal autorizado para la atención.', 'ASS-08'),
  () => mc('Un familiar adulto pide copia de la historia clínica de un paciente adulto y consciente. Lo correcto es…', 'Pedir la autorización escrita del paciente o el documento legal que corresponda', ['Entregarla porque es familiar', 'Negarse sin explicar', 'Enviarla por WhatsApp'], 'La confidencialidad es un derecho del paciente; la autorización es la vía correcta.', 'ASS-12'),
  () => mc('¿Cuál de estos es un derecho del paciente?', 'Recibir información clara sobre su diagnóstico y decidir con consentimiento informado', ['Escoger el sueldo del médico', 'Saltarse el triaje siempre', 'Revisar historias clínicas de otros pacientes'], 'Información, trato digno, confidencialidad y consentimiento informado son derechos del paciente.', 'ASS-12'),
  () => mc('En los establecimientos de salud públicos, la atención es…', 'Gratuita', ['Pagada según la hora', 'Gratuita solo para afiliados al IESS', 'Gratuita solo los fines de semana'], 'La Constitución garantiza la gratuidad de los servicios públicos de salud.', 'ASS-18'),
  () => mc('Un indicador de calidad centrado en el usuario es…', 'El porcentaje de usuarios satisfechos con la atención', ['El número de sillas en la sala', 'El color de las paredes', 'La marca de las computadoras'], 'La satisfacción, el tiempo de espera y los reclamos resueltos son indicadores de calidad percibida.', 'ASS-19'),
  () => mc('El ciclo de mejora continua PHVA significa…', 'Planificar, Hacer, Verificar y Actuar', ['Pagar, Hacer, Votar y Aprobar', 'Programar, Hablar, Ver y Archivar', 'Presupuestar, Hacer, Vender y Ahorrar'], 'Se usa para mejorar procesos como el agendamiento o la dispensación.', 'ASS-19'),
  () => mc('Una auditoría de calidad en un centro de salud busca…', 'Verificar el cumplimiento de estándares y proponer mejoras', ['Sancionar siempre al personal', 'Reemplazar a la Dirección', 'Cerrar el establecimiento'], 'La auditoría identifica brechas y alimenta el plan de mejora.', 'ASS-19'),
  () => mc('El orden del ciclo vital de los documentos es…', 'Archivo de gestión (activo), archivo central (pasivo) e histórico', ['Archivo histórico, central y de gestión', 'Papelera, gestión y central', 'Solo archivo digital'], 'Los documentos pasan del archivo activo al pasivo y luego al histórico según los plazos de conservación.', 'ASS-08'),
  () => mc('Para atender con calidad a una usuaria que solo habla kichwa, lo adecuado es…', 'Buscar un intérprete o personal que hable su idioma', ['Hablarle más fuerte', 'Atenderla al final', 'Pedirle que vuelva con un traductor pagado'], 'La interculturalidad es un principio del sistema de salud y parte de la atención de calidad.', 'ASS-15'),
  () => mc('Un representante comercial pide datos de pacientes crónicos. El asistente administrativo debe…', 'Negarse, porque los datos de salud son confidenciales', ['Entregarlos si son pocos', 'Venderlos', 'Pedir permiso al guardia'], 'Los datos de salud son datos sensibles protegidos por la normativa de protección de datos personales.', 'ASS-18'),
  () => mc('¿Qué principio se vulnera si se adelanta la cita de un conocido sin criterio clínico?', 'La equidad e imparcialidad en el acceso', ['La eficiencia energética', 'La libertad de prensa', 'La autonomía universitaria'], 'El orden de atención se basa en la prioridad legal y clínica, no en relaciones personales.', 'ASS-18'),
  () => mc('Un acto administrativo (por ejemplo, una resolución de la Dirección) debe estar…', 'Motivado: explicar los hechos y las normas en que se fundamenta', ['Firmado por todos los pacientes', 'Escrito en inglés', 'Publicado en redes personales'], 'La motivación es un requisito de validez de los actos administrativos.', 'ASS-12'),
  () => mc('El triaje en un establecimiento de salud sirve para…', 'Clasificar a los pacientes según la urgencia de su condición', ['Cobrar la consulta', 'Ordenar por apellido', 'Asignar turnos por orden de llegada únicamente'], 'Prioriza la atención según la gravedad y no solo según la llegada.', 'ASS-09')
];

/* ---------------- CASOS PROFESIONALES ---------------- */
const CASOS_SAL = [
  {
    id: 'historia-clinica', titulo: 'Un familiar pide ver una historia clínica',
    asignaturas: ['ASS-18', 'ASS-08', 'ASS-12'],
    persona: { nombre: 'Sr. Ramiro Vargas', rol: 'Hijo de una paciente hospitalizada', avatar: '🧔🏻', pitch: 0.9 },
    contexto: 'Un hombre insiste en ventanilla en llevarse copia de la historia clínica de su madre, paciente adulta y consciente, porque "quiere saber todo".',
    pasos: [
      { dice: 'Soy su hijo, tengo derecho. Deme la copia de la historia clínica de mi mamá ahora mismo.', opciones: [
        { t: 'Le explico con calma que la historia clínica es confidencial y que se entrega a la paciente o con su autorización escrita; le ofrezco el formulario.', p: 2, r: 'Ah… no sabía que hacía falta su firma.', fb: 'La confidencialidad de la historia clínica es un derecho del paciente.' },
        { t: 'Le entrego la copia porque es su hijo.', p: 0, r: 'Gracias, así sí.', fb: 'Entregar información clínica sin autorización vulnera la confidencialidad.' },
        { t: 'Le digo que no se puede y paso al siguiente.', p: 1, r: '¡Ni siquiera me explica!', fb: 'Se protege la información, pero falta orientar con respeto.' }
      ]},
      { dice: 'Mi mamá está cansada para firmar papeles. ¿No hay otra forma?', opciones: [
        { t: 'Le propongo que la paciente firme la autorización en su habitación con apoyo del personal, o que el médico tratante le informe a él si ella lo consiente.', p: 2, r: 'Eso sí podemos hacer.', fb: 'Se respeta la voluntad de la paciente facilitando el procedimiento.' },
        { t: 'Firme usted por ella y listo.', p: 0, r: 'Bueno, firmo.', fb: 'Falsificar una autorización es una falta grave.' },
        { t: 'Que regrese cuando ella esté mejor.', p: 1, r: '…', fb: 'Posterga sin ofrecer alternativas.' }
      ]},
      { dice: '(Al final, ¿cómo dejas constancia?)', opciones: [
        { t: 'Registro la solicitud, la autorización y la entrega en el libro de control de la historia clínica.', p: 2, r: '(Queda constancia.)', fb: 'El registro protege al paciente, al establecimiento y al servidor.' },
        { t: 'No registro nada para no hacer papeleo.', p: 0, r: '…', fb: 'Sin registro no hay trazabilidad del acceso a datos sensibles.' },
        { t: 'Lo comento a un compañero.', p: 1, r: '…', fb: 'Un comentario no es un registro formal.' }
      ]}
    ]
  },
  {
    id: 'compra-sin-certificacion', titulo: 'Adelantar una compra sin certificación',
    asignaturas: ['ASS-11', 'ASS-18', 'ASS-17'],
    persona: { nombre: 'Dr. Fabián Lema', rol: 'Jefe administrativo del centro de salud', avatar: '👨🏻‍💼', pitch: 0.9 },
    contexto: 'El jefe te pide comprar hoy mismo reactivos de laboratorio "y la certificación la sacamos después".',
    pasos: [
      { dice: 'Compra los reactivos hoy. La certificación presupuestaria la sacamos la otra semana.', opciones: [
        { t: 'Le explico con respeto que sin certificación presupuestaria previa no se puede comprometer el gasto, y le propongo tramitarla hoy con prioridad.', p: 2, r: 'Mmm… ¿y cuánto se demora?', fb: 'La certificación previa es requisito para contraer obligaciones.' },
        { t: 'Compro con el proveedor de siempre y luego regularizamos.', p: 0, r: 'Así me gusta.', fb: 'Comprometer gasto sin certificación genera responsabilidad.' },
        { t: 'Le digo que no y no propongo nada.', p: 1, r: '¿Entonces nos quedamos sin reactivos?', fb: 'Hay que proponer la vía legal y ágil.' }
      ]},
      { dice: 'Es urgente: sin reactivos no hay exámenes de dengue.', opciones: [
        { t: 'Propongo pedir préstamo o redistribución a otro establecimiento de la red mientras se tramita la compra por el procedimiento que corresponda.', p: 2, r: 'Buena idea, llamo al distrito.', fb: 'La red permite cubrir la urgencia sin saltarse la norma.' },
        { t: 'Pido a los pacientes que compren los reactivos.', p: 0, r: '…', fb: 'Trasladar el costo a los usuarios vulnera la gratuidad.' },
        { t: 'Esperamos sin hacer nada.', p: 1, r: '…', fb: 'No resuelve la urgencia.' }
      ]},
      { dice: '(¿Cómo evitas que vuelva a pasar?)', opciones: [
        { t: 'Propongo programar las compras en la planificación anual con stock de seguridad y punto de reorden.', p: 2, r: 'Hagámoslo para el próximo año.', fb: 'La planificación de compras evita urgencias.' },
        { t: 'Comprar siempre de urgencia.', p: 0, r: '…', fb: 'La urgencia permanente es mala gestión.' },
        { t: 'Dejar que bodega avise cuando se acabe.', p: 1, r: '…', fb: 'Reaccionar al agotamiento llega tarde.' }
      ]}
    ]
  },
  {
    id: 'reclamo-espera', titulo: 'Reclamo por tiempos de espera',
    asignaturas: ['ASS-19', 'ASS-02', 'ASS-21'],
    persona: { nombre: 'Sra. Gloria Santi', rol: 'Usuaria y dirigente barrial', avatar: '👩🏽‍🦱', pitch: 1.1 },
    contexto: 'Una dirigente presenta un reclamo: los usuarios esperan hasta tres horas para una consulta.',
    pasos: [
      { dice: '¡En este centro nos hacen esperar tres horas! Vengo a poner un reclamo formal.', opciones: [
        { t: 'La escucho con atención, me disculpo, registro el reclamo por escrito con número y le informo el plazo de respuesta.', p: 2, r: 'Al menos me escucha.', fb: 'El registro formal del reclamo es el primer paso de la mejora.' },
        { t: 'Le digo que así es en todos lados.', p: 0, r: '¡Qué falta de respeto!', fb: 'Minimizar el reclamo deteriora la confianza.' },
        { t: 'Le doy el buzón y que escriba ella.', p: 1, r: '…', fb: 'El buzón sirve, pero falta escucha y seguimiento.' }
      ]},
      { dice: '¿Y qué van a hacer para que esto cambie?', opciones: [
        { t: 'Le explico que mediremos los tiempos de espera por etapa, analizaremos las causas y propondremos mejoras como turnos escalonados.', p: 2, r: 'Eso suena serio.', fb: 'Medir y analizar causas orienta la mejora.' },
        { t: 'Le prometo que mañana ya no habrá espera.', p: 0, r: '¿De verdad?', fb: 'Prometer lo imposible genera frustración.' },
        { t: 'Le digo que hablaré con el director.', p: 1, r: '…', fb: 'Es un paso, pero sin plan concreto.' }
      ]},
      { dice: '¿Cómo nos vamos a enterar?', opciones: [
        { t: 'Le propongo presentar los resultados en una reunión con el comité local de salud y responder su reclamo por escrito.', p: 2, r: 'Así sí, con la comunidad.', fb: 'La rendición de cuentas y la participación cierran el ciclo.' },
        { t: 'No hace falta informar.', p: 0, r: '…', fb: 'Sin respuesta no hay confianza.' },
        { t: 'Publicar algo en redes del centro.', p: 1, r: '…', fb: 'Ayuda, pero no llega a todos.' }
      ]}
    ]
  },
  {
    id: 'turnos-personal', titulo: 'Conflicto por los turnos del personal',
    asignaturas: ['ASS-13', 'ASS-21'],
    persona: { nombre: 'Lcda. Diana Cerda', rol: 'Enfermera del centro de salud', avatar: '👩🏽‍⚕️', pitch: 1.1 },
    contexto: 'Una enfermera reclama que siempre le asignan las noches y los feriados, mientras otros colegas no los hacen.',
    pasos: [
      { dice: 'Siempre me toca la noche y los feriados. ¡Eso es injusto!', opciones: [
        { t: 'La escucho en privado y revisamos juntas el registro histórico de turnos para verificar la distribución.', p: 2, r: 'Gracias por revisarlo.', fb: 'Escuchar y verificar con datos evita decisiones subjetivas.' },
        { t: 'Le digo que si no le gusta, renuncie.', p: 0, r: '¡Qué falta de respeto!', fb: 'Desestimar el reclamo deteriora el clima laboral.' },
        { t: 'Le cambio el turno a ella sin revisar nada.', p: 1, r: 'Bueno…', fb: 'Resuelve su caso, pero puede generar otra injusticia.' }
      ]},
      { dice: 'Revisamos: tiene razón, hizo el doble de noches.', opciones: [
        { t: 'Propongo un cuadro rotativo con criterios transparentes, cubriendo la atención mínima, y lo socializo con todo el equipo.', p: 2, r: 'Así todos sabemos las reglas.', fb: 'Criterios claros y conocidos generan equidad.' },
        { t: 'Lo dejo igual porque así funciona.', p: 0, r: '…', fb: 'Mantener la inequidad desmotiva.' },
        { t: 'Que lo arreglen entre ellas.', p: 1, r: '…', fb: 'La planificación de turnos es responsabilidad de la gestión.' }
      ]},
      { dice: '(Un mes después)', opciones: [
        { t: 'Evalúo la aplicación del cuadro, el clima laboral y la cobertura, y ajusto lo necesario.', p: 2, r: '(El equipo está más tranquilo.)', fb: 'El seguimiento consolida la mejora.' },
        { t: 'Ya no reviso nada.', p: 0, r: '…', fb: 'Sin seguimiento vuelven los problemas.' },
        { t: 'Pregunto solo a la enfermera que reclamó.', p: 1, r: '…', fb: 'Hay que considerar a todo el equipo.' }
      ]}
    ]
  },
  {
    id: 'vacunacion-kichwa', titulo: 'Campaña de vacunación en comunidades kichwa',
    asignaturas: ['ASS-10', 'ASS-21', 'ASS-15'],
    persona: { nombre: 'Don Segundo Grefa', rol: 'Presidente de una comunidad kichwa de Pastaza', avatar: '👨🏽‍🌾', pitch: 0.9 },
    contexto: 'El centro de salud organiza una campaña de vacunación en comunidades kichwa del río Bobonaza, pero en la última visita pocas familias acudieron.',
    pasos: [
      { dice: 'La otra vez vinieron sin avisar y la gente desconfió. ¿Por qué ahora sería distinto?', opciones: [
        { t: 'Le propongo coordinar primero con la asamblea comunitaria, explicar la campaña en kichwa y acordar juntos la fecha y el lugar.', p: 2, r: 'Así sí, con la comunidad.', fb: 'La participación comunitaria y el idioma propio generan confianza.' },
        { t: 'Le digo que la vacunación es obligatoria y punto.', p: 0, r: 'Así no vamos a colaborar.', fb: 'La imposición genera rechazo.' },
        { t: 'Le dejo unos afiches en castellano.', p: 1, r: '…', fb: 'La información escrita en castellano no llega a todos.' }
      ]},
      { dice: 'Algunos mayores prefieren sus remedios tradicionales.', opciones: [
        { t: 'Respeto sus saberes, propongo un diálogo con los sabios y promotores de salud para explicar los beneficios de la vacuna y responder dudas.', p: 2, r: 'Eso es respeto.', fb: 'El enfoque intercultural valora los saberes y dialoga.' },
        { t: 'Les digo que sus remedios no sirven.', p: 0, r: '…', fb: 'Descalificar saberes ancestrales rompe la confianza.' },
        { t: 'Vacuno solo a quienes vengan.', p: 1, r: '…', fb: 'Se avanza, pero sin trabajar las dudas.' }
      ]},
      { dice: '¿Cómo sabrán si funcionó?', opciones: [
        { t: 'Mediremos la cobertura de vacunación por comunidad, la compararemos con la meta y devolveremos los resultados a la asamblea.', p: 2, r: 'Bien, que nos informen.', fb: 'Medir y devolver resultados es rendición de cuentas.' },
        { t: 'Por el número de fotos.', p: 1, r: '…', fb: 'Las fotos no miden cobertura.' },
        { t: 'No hace falta medir.', p: 0, r: '…', fb: 'Sin medición no se puede mejorar.' }
      ]}
    ]
  },
  {
    id: 'agendamiento-digital', titulo: 'Agendamiento digital que excluye a adultos mayores',
    asignaturas: ['ASS-20', 'ASS-04', 'ASS-19'],
    persona: { nombre: 'Ing. Paúl Ortiz', rol: 'Responsable de TIC del distrito de salud', avatar: '👨🏽‍💻', pitch: 1.0 },
    contexto: 'El distrito propone que todas las citas se agenden solo por una aplicación móvil. Muchos adultos mayores de la zona no usan teléfonos inteligentes.',
    pasos: [
      { dice: 'Desde el lunes, las citas serán solo por la aplicación. Es más moderno y ahorramos personal.', opciones: [
        { t: 'Valoro la innovación, pero advierto que excluiría a adultos mayores y zonas sin señal; propongo mantener canales alternativos (teléfono y ventanilla).', p: 2, r: 'No lo había visto así.', fb: 'La innovación en salud debe ser inclusiva y accesible.' },
        { t: 'Perfecto, que aprendan a usarla.', p: 0, r: '…', fb: 'Imponer un solo canal excluye a grupos vulnerables.' },
        { t: 'No opino, que lo decida el distrito.', p: 1, r: '…', fb: 'Falta aportar desde la experiencia de atención.' }
      ]},
      { dice: '¿Y cómo hacemos para que más gente use la aplicación?', opciones: [
        { t: 'Propongo un punto de ayuda en la sala de espera, una interfaz sencilla con letras grandes y mensajes en kichwa y castellano.', p: 2, r: 'Buena propuesta.', fb: 'Acompañamiento y diseño accesible reducen la brecha digital.' },
        { t: 'Mandar un tutorial por correo.', p: 1, r: '…', fb: 'No llega a quien no usa correo.' },
        { t: 'Cobrar a quien agende en ventanilla.', p: 0, r: '…', fb: 'Vulnera la gratuidad y castiga a los excluidos.' }
      ]},
      { dice: '¿Cómo sabremos si funciona?', opciones: [
        { t: 'Mediremos citas por canal y por grupo de edad, tiempos de espera, inasistencias y satisfacción, y ajustaremos.', p: 2, r: 'Con datos, perfecto.', fb: 'Los indicadores permiten evaluar la innovación.' },
        { t: 'Por las descargas de la aplicación.', p: 1, r: '…', fb: 'Es un dato parcial.' },
        { t: 'No hace falta medir.', p: 0, r: '…', fb: 'Sin medición no hay mejora.' }
      ]}
    ]
  }
];
