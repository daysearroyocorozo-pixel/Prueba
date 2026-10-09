/* Prácticas por asignatura – Control de Incendios y Operaciones de Rescate (PAO 3–4) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== CIOR-305 Preparación Física e Instrucción Formal ===================== */
  {
    id: 'asig-CIOR-305', cod: 'CIOR-305',
    titulo: 'Relevo y rehabilitación en un incendio prolongado',
    asignaturas: ['CIOR-305'],
    persona: { nombre: 'Sargento Wilson Tanguila', rol: 'Instructor de preparación física del Cuerpo de Bomberos de Pastaza', avatar: '👨🏽‍🚒', pitch: 0.9 },
    contexto: 'Tras 40 minutos combatiendo un incendio en un aserradero del Puyo, tu binomio sale exhausto. El sargento te pide organizar el relevo, la rehabilitación y luego dirigir la formación del pelotón de recambio.',
    objetivo: 'Aplicar manejo del estrés físico, técnicas de levantamiento seguro e instrucción formal para liderar al equipo en alta exigencia.',
    pasos: [
      { dice: 'Tu compañero Darío sale de la zona caliente rojo, sudando y tambaleándose. ¿Qué haces con él?', opciones: [
        { t: 'Lo llevo al área de rehabilitación: retiro EPP, hidratación, sombra y control de signos vitales antes de volver.', p: 2, r: 'Bien. En 20 minutos lo valoramos de nuevo.', fb: 'La rehabilitación (descanso, hidratación, enfriamiento y control de pulso/presión) previene golpe de calor y lesiones por fatiga.' },
        { t: 'Le doy agua y le digo que descanse cinco minutos y regrese.', p: 1, r: 'Cinco minutos no bastan, y no le tomaste signos.', fb: 'La hidratación sola no evalúa el estado fisiológico; el tiempo de recuperación debe basarse en signos vitales.' },
        { t: 'Le digo que aguante, que ya casi se controla el fuego.', p: 0, r: '¡Así perdemos a un bombero por golpe de calor!', fb: 'Forzar a un bombero fatigado aumenta el riesgo de colapso, errores y accidentes.' } ] },
      { dice: 'Hay que mover un rollo de manguera de 70 mm cargada y una motobomba portátil hasta la nueva línea. ¿Cómo lo hacen?', opciones: [
        { t: 'Entre dos, espalda recta, flexionando rodillas, carga pegada al cuerpo y voz de mando para levantar a la vez.', p: 2, r: 'Así se cuida la columna. Bien coordinado.', fb: 'La técnica de levantamiento seguro reduce lesiones lumbares; la voz de mando sincroniza el esfuerzo.' },
        { t: 'La levanto yo solo pero con cuidado.', p: 1, r: 'Pesa más de 40 kilos; solo te puedes lesionar.', fb: 'Cargas pesadas deben repartirse; el esfuerzo individual excesivo genera lesiones musculoesqueléticas.' },
        { t: 'La jalamos arrastrándola por el suelo, doblados, lo más rápido posible.', p: 0, r: 'Dañan el equipo y su espalda.', fb: 'Flexionar la columna con carga y arrastrar equipos provoca lesiones y deterioro del material.' } ] },
      { dice: 'Llegan seis aspirantes de recambio. Fórmalos e instrúyelos antes de entrar.', opciones: [
        { t: 'Los formo en columna, doy voces de mando claras, explico tarea, señales y tiempos de relevo, y verifico que entendieron.', p: 2, r: '¡Así se manda! Ordenado y seguro.', fb: 'La instrucción formal da disciplina y comunicación clara; verificar la comprensión es parte de la enseñanza efectiva.' },
        { t: 'Les digo rápidamente qué hacer mientras se visten.', p: 1, r: 'Falta orden; alguno no escuchó.', fb: 'Sin formación ni verificación, las instrucciones se pierden en el ruido de la escena.' },
        { t: 'Les grito e insulto para que se apuren.', p: 0, r: 'Eso no es liderazgo, es maltrato.', fb: 'El liderazgo en alta exigencia motiva con respeto; el maltrato genera miedo y errores.' } ] }
    ],
    vivo: {
      lugar: 'Área de rehabilitación junto a un aserradero en llamas, vía Puyo–Tena', fondo: 'emergencia',
      inicio: { confianza: 50, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '🩺', t: 'Tomar pulso y presión de Darío en rehabilitación', p: 2, fb: 'Los signos vitales definen si puede volver a la operación.', efecto: { confianza: 10, tension: -8 } },
            { icono: '💧', t: 'Darle agua con electrolitos a la sombra', p: 2, fb: 'Reponer líquidos y sales previene deshidratación y calambres.', efecto: { confianza: 6, tension: -5 } },
            { icono: '⏱️', t: 'Mandarlo a descansar solo dos minutos', p: 1, fb: 'Un descanso tan corto no permite recuperar la frecuencia cardiaca.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🔥', t: 'Enviarlo de vuelta a la línea de ataque', p: 0, fb: 'Riesgo alto de golpe de calor y accidente.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Rehabilitación', claves: ['rehabilitacion', 'descans', 'sombra', 'enfri', 'retirar el epp', 'quitar el casco'] },
            { n: 'Hidratación', claves: ['hidrat', 'agua', 'electrolit', 'suero', 'liquido'] },
            { n: 'Control de signos vitales', claves: ['pulso', 'presion', 'signos vitales', 'frecuencia cardiaca', 'temperatura', 'valor'] }
          ],
          evitar: [ { claves: ['aguanta', 'no seas debil', 'regresa ya'], fb: 'Presionar a un compañero fatigado pone en riesgo su vida.' } ],
          modelo: 'Darío, vamos a rehabilitación: te quitas el EPP, te hidratas con suero a la sombra y te tomo pulso y presión; vuelves solo cuando tus signos vitales se normalicen.'
        },
        {
          acciones: [
            { icono: '🏋️', t: 'Levantar entre dos con rodillas flexionadas', p: 2, fb: 'Reparte la carga y protege la columna.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗣️', t: 'Dar voz de mando para levantar al mismo tiempo', p: 2, fb: 'Sincroniza el esfuerzo y evita tirones.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧍', t: 'Cargar la motobomba uno solo', p: 1, fb: 'Posible pero con alto riesgo de lesión lumbar.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🪢', t: 'Arrastrar la manguera doblando la espalda', p: 0, fb: 'Daña el equipo y la espalda.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Postura segura', claves: ['espalda recta', 'rodilla', 'flexion', 'postura', 'piernas', 'columna'] },
            { n: 'Carga compartida', claves: ['entre dos', 'compan', 'repart', 'binomio', 'ayuda', 'juntos'] },
            { n: 'Coordinación verbal', claves: ['a la cuenta', 'tres', 'voz de mando', 'conteo', 'al mismo tiempo', 'senal'] }
          ],
          evitar: [ { claves: ['yo solo puedo', 'arrastr'], fb: 'Cargar solo o arrastrar aumenta lesiones y daña el material.' } ],
          modelo: 'Levantamos entre dos, espalda recta y rodillas flexionadas, la carga pegada al cuerpo; a la cuenta de tres: uno, dos, tres, arriba.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Formar al pelotón en columna de a dos', p: 2, fb: 'La formación permite control y conteo del personal.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✅', t: 'Pedir que repitan las señales de evacuación', p: 2, fb: 'Verificar comprensión es clave en la instrucción.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🏃', t: 'Explicar mientras se visten corriendo', p: 1, fb: 'La información se pierde.', efecto: { confianza: -2, tension: 4 } },
            { icono: '😡', t: 'Gritarles insultos para apurarlos', p: 0, fb: 'Maltrato que destruye la moral del equipo.', efecto: { confianza: -18, tension: 15 } }
          ],
          conceptos: [
            { n: 'Voz de mando y formación', claves: ['firmes', 'formen', 'formacion', 'columna', 'voz de mando', 'atencion', 'numerense'] },
            { n: 'Explicar la tarea y relevo', claves: ['tarea', 'relevo', 'minutos', 'turno', 'senal', 'evacu'] },
            { n: 'Verificar y motivar', claves: ['entendido', 'repit', 'pregunta', 'confio', 'equipo', 'motiv', 'vamos'] }
          ],
          evitar: [ { claves: ['inutil', 'bruto', 'tonto'], fb: 'El insulto no es instrucción formal; humilla y desmotiva.' } ],
          modelo: '¡Pelotón, firmes! Entramos en binomios a la línea dos, relevo cada veinte minutos y tres pitazos significa evacuar; repítanme la señal. Confío en ustedes, ¡vamos!'
        }
      ]
    }
  },

  /* ===================== CIOR-306 Física del Fuego ===================== */
  {
    id: 'asig-CIOR-306', cod: 'CIOR-306',
    titulo: 'Señales de flashover en una vivienda de madera',
    asignaturas: ['CIOR-306'],
    persona: { nombre: 'Teniente Mariela Santi', rol: 'Jefa de la unidad de ataque', avatar: '👩🏽‍🚒', pitch: 1.05 },
    contexto: 'Una casa mixta de madera y zinc arde en el barrio Obrero del Puyo. Antes de entrar, la teniente te pide leer el humo y explicar con física qué está pasando para decidir la táctica.',
    objetivo: 'Aplicar transferencia de calor, dinámica de gases y comportamiento de materiales para predecir el desarrollo del incendio.',
    pasos: [
      { dice: 'El humo sale denso, oscuro y rápido por la parte alta de la ventana y entra aire por abajo. ¿Qué significa?', opciones: [
        { t: 'Hay una capa de gases calientes acumulándose arriba por convección; el plano neutro baja y el incendio crece: riesgo de flashover.', p: 2, r: 'Exacto, el humo es combustible y está muy caliente.', fb: 'Humo denso, oscuro y turbulento con plano neutro bajo indica alta energía y posible flashover.' },
        { t: 'Que hay mucho humo, hay que apurarse.', p: 1, r: 'Cierto, pero ¿por qué es peligroso?', fb: 'Reconocer el humo no basta: hay que interpretar volumen, velocidad, densidad y color.' },
        { t: 'Que el fuego ya se está apagando solo.', p: 0, r: '¡Al contrario! Está a punto de generalizarse.', fb: 'Interpretar mal el humo lleva a decisiones fatales.' } ] },
      { dice: 'El vecino pregunta por qué se quemó también la casa de al lado si no se tocaban. Explícale.', opciones: [
        { t: 'Por radiación: el calor viaja en ondas y calienta la pared vecina hasta su ignición; también pasan chispas por convección.', p: 2, r: 'Ahora entiendo, por eso mojan mi pared.', fb: 'La radiación térmica no necesita contacto; proteger exposiciones con agua enfría las superficies.' },
        { t: 'Porque el calor pasa de una casa a otra.', p: 1, r: '¿Pero cómo pasa?', fb: 'Faltó nombrar el mecanismo (radiación/convección).' },
        { t: 'Porque seguramente alguien la prendió.', p: 0, r: '¿Me está diciendo que fue intencional?', fb: 'Especular sin evidencia genera conflictos y desinforma.' } ] },
      { dice: 'La viga de madera del techo y las correas metálicas están expuestas al calor. ¿Qué esperas de cada material?', opciones: [
        { t: 'El metal conduce calor, se dilata y pierde resistencia, puede colapsar sin aviso; la madera se carboniza y pierde sección. Evito trabajar bajo el techo.', p: 2, r: 'Correcto, marcamos zona de colapso.', fb: 'El acero pierde gran parte de su resistencia con altas temperaturas; la madera se debilita al carbonizarse.' },
        { t: 'La madera se quema más rápido, el metal aguanta.', p: 1, r: 'El metal también falla, y sin aviso.', fb: 'Subestimar al metal caliente es un error común.' },
        { t: 'Los materiales no importan, el techo aguanta.', p: 0, r: 'Así mueren bomberos por colapso.', fb: 'Ignorar el comportamiento estructural frente al fuego es peligroso.' } ] }
    ],
    vivo: {
      lugar: 'Exterior de una vivienda de madera incendiada, barrio Obrero, Puyo', fondo: 'emergencia',
      inicio: { confianza: 45, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '👀', t: 'Observar volumen, color y velocidad del humo', p: 2, fb: 'La lectura del humo predice el desarrollo del incendio.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🌡️', t: 'Usar la cámara térmica en la capa superior', p: 2, fb: 'Confirma la temperatura de los gases.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🚿', t: 'Lanzar agua sin evaluar a la ventana', p: 1, fb: 'Puede alterar el balance térmico sin control.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🚪', t: 'Abrir de golpe la puerta principal', p: 0, fb: 'Aporta oxígeno y puede provocar flashover.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Convección y capa de gases', claves: ['conveccion', 'gases calientes', 'capa', 'arriba', 'techo', 'suben'] },
            { n: 'Plano neutro e ingreso de aire', claves: ['plano neutro', 'aire', 'oxigeno', 'entra por abajo', 'flujo', 'ventilacion'] },
            { n: 'Riesgo de flashover', claves: ['flashover', 'combustion subita', 'generaliz', 'ignicion', 'inflam', 'temperatura'] }
          ],
          evitar: [ { claves: ['se esta apagando', 'no pasa nada'], fb: 'Subestimar la lectura del humo es mortal.' } ],
          modelo: 'Teniente, el humo oscuro y turbulento indica una capa de gases calientes por convección; el plano neutro está bajo y entra aire por abajo, hay riesgo de flashover.'
        },
        {
          acciones: [
            { icono: '🏠', t: 'Mojar la pared de la casa vecina', p: 2, fb: 'Enfriar exposiciones reduce la radiación absorbida.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗣️', t: 'Explicar al vecino cómo viaja el calor', p: 2, fb: 'La comunicación técnica calma a la comunidad.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🤷', t: 'Decirle que no hay tiempo para explicar', p: 1, fb: 'Prioriza la tarea pero aumenta la ansiedad del vecino.', efecto: { confianza: -4, tension: 4 } },
            { icono: '🕵️', t: 'Insinuar que el incendio fue provocado', p: 0, fb: 'Especulación irresponsable.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Radiación térmica', claves: ['radiacion', 'ondas', 'sin contacto', 'calor radiante', 'irradia'] },
            { n: 'Convección y pavesas', claves: ['conveccion', 'chispa', 'pavesa', 'brasa', 'aire caliente', 'viento'] },
            { n: 'Protección de exposiciones', claves: ['enfri', 'mojar', 'proteg', 'cortina de agua', 'pared vecina', 'exposicion'] }
          ],
          evitar: [ { claves: ['alguien la prendio', 'fue a proposito'], fb: 'No especules sobre causas sin investigación.' } ],
          modelo: 'Vecino, el calor viaja por radiación, como el sol, sin tocarse; además el viento lleva chispas. Por eso enfriamos su pared con agua para protegerla.'
        },
        {
          acciones: [
            { icono: '⚠️', t: 'Delimitar la zona de colapso del techo', p: 2, fb: 'Evita trabajar bajo estructuras debilitadas.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🔎', t: 'Revisar deformación de las correas metálicas', p: 2, fb: 'La deformación anticipa el colapso.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🪵', t: 'Vigilar solo la viga de madera', p: 1, fb: 'Ignora el riesgo del metal caliente.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🧗', t: 'Entrar bajo el techo a apagar desde dentro', p: 0, fb: 'Exposición a colapso sin necesidad.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Conducción y dilatación del metal', claves: ['conduc', 'dilat', 'metal', 'acero', 'deform', 'pierde resistencia'] },
            { n: 'Carbonización de la madera', claves: ['madera', 'carboniz', 'seccion', 'debilit', 'viga'] },
            { n: 'Zona de colapso', claves: ['colapso', 'zona', 'no entrar', 'alej', 'distancia', 'derrumb'] }
          ],
          evitar: [ { claves: ['el techo aguanta', 'el metal no se quema'], fb: 'El acero caliente falla sin aviso.' } ],
          modelo: 'El metal conduce el calor, se dilata y pierde resistencia; la viga se carboniza y pierde sección. Propongo delimitar zona de colapso y no trabajar bajo el techo.'
        }
      ]
    }
  },

  /* ===================== CIOR-307 Técnicas de Intervención ===================== */
  {
    id: 'asig-CIOR-307', cod: 'CIOR-307',
    titulo: 'Ataque y búsqueda en un local comercial con humo',
    asignaturas: ['CIOR-307'],
    persona: { nombre: 'Capitán Luis Grefa', rol: 'Comandante del incidente', avatar: '👨🏽‍🚒', pitch: 0.85 },
    contexto: 'Una ferretería del centro de Shell se incendia y el dueño dice que su empleado quedó en la bodega. El capitán te pide evaluar riesgos, elegir el ataque, ventilar y organizar la búsqueda.',
    objetivo: 'Aplicar evaluación de riesgos, ataque directo/indirecto, ventilación y procedimientos de rescate coordinados.',
    pasos: [
      { dice: 'Acabas de llegar. ¿Qué haces primero?', opciones: [
        { t: 'Hago la evaluación de 360 grados: riesgos (cilindros de gas, pinturas, cables), accesos, víctima probable y reporte al comandante.', p: 2, r: 'Bien, con esa información decidimos.', fb: 'La evaluación inicial de la escena identifica riesgos y define la estrategia.' },
        { t: 'Pregunto al dueño dónde está la bodega y entro.', p: 1, r: 'Te faltó evaluar los riesgos.', fb: 'Entrar sin reconocimiento expone al rescatista.' },
        { t: 'Entro corriendo sin equipo autónomo para ganar tiempo.', p: 0, r: '¡Alto! Ahora tendríamos dos víctimas.', fb: 'Sin ERA (equipo de respiración autónoma) el humo incapacita en segundos.' } ] },
      { dice: 'El fuego está en el salón principal y el humo llena la bodega. ¿Qué ataque y ventilación propones?', opciones: [
        { t: 'Ataque directo a la base con chorro adecuado desde la entrada no quemada y ventilación coordinada por el lado opuesto, después de tener agua.', p: 2, r: 'Correcto, ventilamos cuando la línea esté lista.', fb: 'La ventilación sin coordinación con el ataque alimenta el fuego; atacar desde lo no quemado protege a la víctima.' },
        { t: 'Ventilamos rompiendo todas las ventanas y luego atacamos.', p: 1, r: 'Eso puede avivar el fuego.', fb: 'Ventilar antes de tener línea de agua favorece la propagación.' },
        { t: 'Lanzamos agua al humo desde la calle hasta que se vaya.', p: 0, r: 'Así no llegamos a la víctima ni al foco.', fb: 'Agua al humo sin objetivo desperdicia recursos y altera el balance térmico.' } ] },
      { dice: 'Tu binomio va a buscar al empleado en la bodega. ¿Cómo lo hacen?', opciones: [
        { t: 'Búsqueda sistemática con cuerda guía, contacto con la pared, binomio, radio y control de aire; reporte cada hallazgo.', p: 2, r: 'Así salen todos. Adelante.', fb: 'La búsqueda sistemática con cuerda guía y control de aire evita desorientación.' },
        { t: 'Buscamos separados para cubrir más área.', p: 1, r: 'Nunca solos en el humo.', fb: 'Separarse rompe el principio del binomio.' },
        { t: 'Gritamos desde la puerta y si no responde nos vamos.', p: 0, r: 'Puede estar inconsciente.', fb: 'Una víctima inconsciente no responde; hay que buscar.' } ] }
    ],
    vivo: {
      lugar: 'Ferretería incendiada en el centro de Shell, Pastaza', fondo: 'emergencia',
      inicio: { confianza: 45, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🔄', t: 'Recorrer los 360 grados de la edificación', p: 2, fb: 'Permite ver riesgos y accesos ocultos.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🧯', t: 'Identificar cilindros de gas y pinturas', p: 2, fb: 'Son riesgos de explosión y gases tóxicos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '❓', t: 'Preguntar solo al dueño y entrar', p: 1, fb: 'Información útil pero incompleta.', efecto: { confianza: 0, tension: 4 } },
            { icono: '🏃', t: 'Entrar sin equipo autónomo', p: 0, fb: 'Riesgo de intoxicación inmediata.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Evaluación 360', claves: ['360', 'trescientos sesenta', 'recorr', 'evalu', 'reconoc', 'vuelta'] },
            { n: 'Identificación de riesgos', claves: ['riesgo', 'gas', 'cilindro', 'pintura', 'electric', 'cable', 'colapso'] },
            { n: 'Reporte al comandante', claves: ['report', 'informe', 'comandante', 'mando', 'radio', 'capitan'] }
          ],
          evitar: [ { claves: ['sin equipo', 'entro de una'], fb: 'Entrar sin evaluar ni ERA convierte al rescatista en víctima.' } ],
          modelo: 'Capitán, hice el recorrido de 360: hay cilindros de gas y pinturas al fondo, cables expuestos y acceso posterior a la bodega; posible víctima ahí.'
        },
        {
          acciones: [
            { icono: '🚒', t: 'Tender línea de ataque por la entrada no quemada', p: 2, fb: 'Protege la ruta hacia la víctima.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🌬️', t: 'Coordinar ventilación opuesta tras tener agua', p: 2, fb: 'Ventilación táctica coordinada con el ataque.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🪟', t: 'Romper todas las ventanas de inmediato', p: 1, fb: 'Puede avivar el fuego sin control.', efecto: { confianza: -4, tension: 6 } },
            { icono: '💦', t: 'Mojar el humo desde la vereda', p: 0, fb: 'No ataca el foco ni ayuda a la víctima.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Ataque directo a la base', claves: ['ataque directo', 'base', 'foco', 'chorro', 'linea', 'boquilla'] },
            { n: 'Ventilación coordinada', claves: ['ventil', 'coordin', 'lado opuesto', 'salida de humo', 'extract', 'presion positiva'] },
            { n: 'Proteger a la víctima', claves: ['no quemad', 'victima', 'proteg', 'ruta', 'acceso', 'empleado'] }
          ],
          evitar: [ { claves: ['rompemos todo', 'ventilar primero'], fb: 'Ventilar sin línea de agua alimenta el fuego.' } ],
          modelo: 'Propongo ataque directo a la base desde la entrada no quemada para proteger la ruta a la víctima, y ventilación coordinada por el lado opuesto cuando la línea tenga agua.'
        },
        {
          acciones: [
            { icono: '🪢', t: 'Colocar cuerda guía desde la entrada', p: 2, fb: 'Asegura la ruta de salida.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📻', t: 'Reportar por radio presión de aire y avance', p: 2, fb: 'El control de aire evita quedarse sin reserva.', efecto: { confianza: 8, tension: -5 } },
            { icono: '↔️', t: 'Separarse para cubrir más área', p: 0, fb: 'Rompe el binomio; riesgo de extravío.', efecto: { confianza: -15, tension: 15 } },
            { icono: '📢', t: 'Llamar a la víctima desde la puerta', p: 1, fb: 'Útil pero insuficiente si está inconsciente.', efecto: { confianza: -2, tension: 4 } }
          ],
          conceptos: [
            { n: 'Búsqueda sistemática', claves: ['sistemat', 'pared', 'derecha', 'izquierda', 'barrido', 'cuadrante'] },
            { n: 'Cuerda guía y binomio', claves: ['cuerda guia', 'cuerda', 'binomio', 'compan', 'juntos', 'contacto'] },
            { n: 'Control de aire y comunicación', claves: ['aire', 'presion', 'manometro', 'radio', 'report', 'bares'] }
          ],
          evitar: [ { claves: ['separamos', 'cada uno por su lado'], fb: 'En el humo nunca se trabaja solo.' } ],
          modelo: 'Entramos en binomio con cuerda guía, búsqueda sistemática por la pared derecha; reporto por radio presión de aire y cada hallazgo al capitán.'
        }
      ]
    }
  },

  /* ===================== CIOR-308 Legislación de las Operaciones de Rescate ===================== */
  {
    id: 'asig-CIOR-308', cod: 'CIOR-308',
    titulo: 'Periodista, datos de la víctima e informe oficial',
    asignaturas: ['CIOR-308'],
    persona: { nombre: 'Andrea Vargas', rol: 'Periodista de un medio digital local', avatar: '👩🏻‍💼', pitch: 1.15 },
    contexto: 'Tras rescatar a una adolescente de un vehículo caído al río Pindo, una periodista pide nombre, fotos y detalles médicos. Luego tu oficial te pide el informe y verificar el EPP del equipo.',
    objetivo: 'Aplicar normativa de protección de datos y derechos de las víctimas, seguridad laboral/EPP y elaboración de informes oficiales.',
    pasos: [
      { dice: '¿Cómo se llama la chica? ¿Me deja tomarle una foto en la ambulancia? ¿Qué lesiones tiene?', opciones: [
        { t: 'No puedo dar datos personales ni de salud de la víctima, menos de una menor; la información oficial la da la vocería institucional.', p: 2, r: 'Entiendo, ¿a quién debo llamar?', fb: 'La Constitución y la normativa ecuatoriana protegen los datos personales y el interés superior de niños y adolescentes.' },
        { t: 'Le digo solo el nombre pero no las lesiones.', p: 1, r: 'Gracias, lo publico ya.', fb: 'El nombre también es un dato personal protegido.' },
        { t: 'Le cuento todo y la dejo pasar a tomar fotos.', p: 0, r: 'Perfecto, esto se va a viralizar.', fb: 'Vulnera la intimidad y los derechos de la víctima y expone a la institución.' } ] },
      { dice: '(El oficial Montalvo) Antes de la siguiente salida, un compañero quiere ir sin chaleco salvavidas "porque estorba". ¿Qué haces?', opciones: [
        { t: 'Le recuerdo que el EPP es obligatorio por normativa de seguridad laboral, no sale sin chaleco y casco, y lo reporto al oficial si insiste.', p: 2, r: 'Correcto, aquí nadie trabaja sin EPP.', fb: 'La normativa de seguridad y salud en el trabajo obliga al uso de EPP; la institución y el trabajador comparten la responsabilidad.' },
        { t: 'Le digo que es su decisión.', p: 1, r: '¿Y si se ahoga, de quién es la culpa?', fb: 'El uso de EPP no es opcional en la operación.' },
        { t: 'Me quito el mío también para ir más cómodo.', p: 0, r: '¡Falta grave de seguridad!', fb: 'Incumplir el EPP pone en riesgo la vida y genera responsabilidad.' } ] },
      { dice: '(El oficial) Redacta el parte del rescate. ¿Qué incluyes?', opciones: [
        { t: 'Fecha, hora, ubicación, alerta del ECU 911, recursos, acciones cronológicas, estado y entrega de la víctima, novedades y firmas, con datos objetivos.', p: 2, r: 'Ese informe sirve legalmente.', fb: 'Un informe objetivo y cronológico es evidencia ante fiscalía, aseguradoras y auditorías.' },
        { t: 'Un resumen de lo que pasó, sin horas exactas.', p: 1, r: 'Sin tiempos no sirve como evidencia.', fb: 'La cronología precisa es esencial en documentos legales.' },
        { t: 'Escribo mi opinión sobre quién tuvo la culpa.', p: 0, r: 'Eso no te corresponde.', fb: 'El bombero no determina responsabilidades penales; describe hechos.' } ] }
    ],
    vivo: {
      lugar: 'Orilla del río Pindo, tras un rescate acuático', fondo: 'exterior',
      inicio: { confianza: 50, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🚫', t: 'Impedir fotos de la víctima en la ambulancia', p: 2, fb: 'Protege su intimidad e imagen.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📇', t: 'Derivar a la periodista a la vocería oficial', p: 2, fb: 'La información pública se canaliza institucionalmente.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗂️', t: 'Dar solo el nombre de la víctima', p: 1, fb: 'El nombre también es dato protegido.', efecto: { confianza: -4, tension: 4 } },
            { icono: '📸', t: 'Dejarla grabar la atención médica', p: 0, fb: 'Viola los derechos de la menor.', efecto: { confianza: -18, tension: 15 } }
          ],
          conceptos: [
            { n: 'Protección de datos personales', claves: ['datos personales', 'proteccion de datos', 'confidencial', 'privacidad', 'intimidad', 'nombre'] },
            { n: 'Derechos de la víctima menor', claves: ['menor', 'adolescente', 'derecho', 'interes superior', 'victima', 'imagen'] },
            { n: 'Vocería institucional', claves: ['vocer', 'oficial', 'comunicacion', 'institucion', 'boletin', 'autoriz'] }
          ],
          evitar: [ { claves: ['se llama', 'tiene fractura', 'tome la foto'], fb: 'Revelar identidad o salud de la víctima vulnera sus derechos.' } ],
          modelo: 'Lo siento, no puedo dar el nombre, fotos ni datos de salud de la víctima, es una menor y sus datos personales están protegidos; la información oficial la da la vocería del Cuerpo de Bomberos.'
        },
        {
          acciones: [
            { icono: '🦺', t: 'Verificar chaleco y casco de cada compañero', p: 2, fb: 'Chequeo de EPP antes de operar.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📣', t: 'Informar al oficial si alguien se niega', p: 2, fb: 'Escalar incumplimientos es parte del deber.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🤐', t: 'Callarse para evitar problemas', p: 1, fb: 'Tolera un riesgo evitable.', efecto: { confianza: -4, tension: 5 } },
            { icono: '🙅', t: 'Quitarse también el chaleco', p: 0, fb: 'Incumplimiento grave de seguridad laboral.', efecto: { confianza: -18, tension: 15 } }
          ],
          conceptos: [
            { n: 'EPP obligatorio', claves: ['epp', 'equipo de proteccion', 'chaleco', 'casco', 'obligatori', 'proteccion personal'] },
            { n: 'Seguridad laboral', claves: ['seguridad laboral', 'seguridad y salud', 'normativa', 'reglamento', 'riesgo laboral', 'ley'] },
            { n: 'Responsabilidad y reporte', claves: ['report', 'oficial', 'responsab', 'informar', 'superior', 'no sale'] }
          ],
          evitar: [ { claves: ['es tu decision', 'no pasa nada'], fb: 'El EPP no es opcional.' } ],
          modelo: 'Compañero, el EPP es obligatorio por la normativa de seguridad laboral; sin chaleco y casco no sales al río, y si insistes tengo que reportarlo al oficial.'
        },
        {
          acciones: [
            { icono: '🕒', t: 'Anotar la cronología con horas exactas', p: 2, fb: 'Base de un informe con valor legal.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📞', t: 'Registrar el código de alerta del ECU 911', p: 2, fb: 'Vincula el informe con la emergencia oficial.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📝', t: 'Escribir un resumen general sin horas', p: 1, fb: 'Pierde precisión probatoria.', efecto: { confianza: -3, tension: 3 } },
            { icono: '⚖️', t: 'Señalar culpables del accidente', p: 0, fb: 'Excede las competencias del bombero.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Datos de la emergencia', claves: ['fecha', 'hora', 'ubicacion', 'ecu 911', 'alerta', 'direccion'] },
            { n: 'Cronología y acciones', claves: ['cronolog', 'acciones', 'recursos', 'unidades', 'secuencia', 'procedimiento'] },
            { n: 'Objetividad y firmas', claves: ['objetiv', 'hechos', 'firma', 'entrega', 'novedades', 'veraz'] }
          ],
          evitar: [ { claves: ['el culpable', 'creo que estaba borracho'], fb: 'El informe describe hechos, no juicios.' } ],
          modelo: 'El informe incluirá fecha, hora y ubicación, la alerta del ECU 911, las unidades, la cronología de acciones, la entrega de la víctima a la ambulancia, novedades y firmas, solo con hechos objetivos.'
        }
      ]
    }
  },

  /* ===================== CIOR-309 Materiales Peligrosos ===================== */
  {
    id: 'asig-CIOR-309', cod: 'CIOR-309',
    titulo: 'Volcamiento de un tanquero en la vía Puyo–Macas',
    asignaturas: ['CIOR-309'],
    persona: { nombre: 'Ing. Fausto Cevallos', rol: 'Técnico de la empresa transportista', avatar: '👨🏻‍💼', pitch: 0.95 },
    contexto: 'Un tanquero con placa naranja y rombo rojo se volcó cerca de Veracruz y gotea un líquido. Debes identificar el material, establecer zonas, elegir EPP, contener y descontaminar.',
    objetivo: 'Aplicar identificación (rótulos, número ONU, hoja de seguridad), zonas de trabajo, EPP, contención y descontaminación de materiales peligrosos.',
    pasos: [
      { dice: 'Llegan primero. El conductor está afuera mareado y huele a combustible. ¿Qué haces?', opciones: [
        { t: 'Me aproximo con viento a favor y desde lo alto, a distancia; leo con binoculares el rombo y el número ONU y consulto la guía de respuesta y la hoja de seguridad.', p: 2, r: 'Es el 1203, gasolina. Bien identificado.', fb: 'La identificación a distancia con la Guía de Respuesta en Caso de Emergencia y la HDS define los riesgos.' },
        { t: 'Me acerco a leer la placa de cerca.', p: 1, r: 'Te expusiste a los vapores.', fb: 'Acercarse sin identificar expone al rescatista.' },
        { t: 'Prendo una linterna común y me acerco al charco.', p: 0, r: '¡Puede haber ignición!', fb: 'Fuentes de ignición cerca de inflamables pueden causar explosión.' } ] },
      { dice: 'Hay curiosos grabando y un comerciante de frutas a 20 metros. ¿Cómo organizas la escena?', opciones: [
        { t: 'Establezco zona caliente, tibia y fría, aislamiento inicial según la guía, evacuo curiosos, elimino fuentes de ignición y pido al ECU 911 apoyo de Policía y equipo especializado.', p: 2, r: 'Así se controla.', fb: 'La zonificación y el aislamiento protegen a la población y ordenan la respuesta.' },
        { t: 'Pido a la gente que se aleje un poco.', p: 1, r: '¿Cuánto es un poco?', fb: 'La distancia debe basarse en la guía y el material.' },
        { t: 'Los dejo, así hay testigos.', p: 0, r: 'Un vapor inflamable no respeta testigos.', fb: 'Exponer población a un derrame inflamable es negligente.' } ] },
      { dice: 'Hay que frenar el derrame antes de que llegue al estero y luego descontaminar al personal. ¿Cómo?', opciones: [
        { t: 'Con EPP adecuado, contengo con diques de tierra y material absorbente, tapo la fuga si es seguro, protejo el estero; después corredor de descontaminación en la zona tibia y residuos a gestor autorizado.', p: 2, r: 'Excelente, el ambiente también se protege.', fb: 'Contención, descontaminación y disposición segura de residuos son pasos obligatorios.' },
        { t: 'Echamos mucha agua para diluir.', p: 1, r: 'Eso lo esparce al estero.', fb: 'Diluir hidrocarburos con agua amplía la contaminación.' },
        { t: 'Nos vamos sin descontaminarnos, ya terminó.', p: 0, r: 'Llevarán el contaminante al cuartel.', fb: 'Omitir la descontaminación causa exposición secundaria.' } ] }
    ],
    vivo: {
      lugar: 'Vía Puyo–Macas, sector Veracruz, tanquero volcado', fondo: 'emergencia',
      inicio: { confianza: 45, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🌬️', t: 'Acercarse con viento a favor y desde lo alto', p: 2, fb: 'Reduce la exposición a vapores.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔭', t: 'Leer el número ONU con binoculares', p: 2, fb: 'Identificación segura a distancia.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📖', t: 'Consultar la guía de respuesta y la HDS', p: 2, fb: 'Define peligros, EPP y distancias.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔦', t: 'Acercarse al charco con linterna común', p: 0, fb: 'Posible fuente de ignición.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Aproximación segura', claves: ['viento a favor', 'viento', 'distancia', 'desde lo alto', 'alej', 'aproxim'] },
            { n: 'Identificación del material', claves: ['numero onu', 'onu', 'rombo', 'placa', 'rotulo', 'etiqueta', '1203'] },
            { n: 'Guía y hoja de seguridad', claves: ['guia de respuesta', 'hoja de seguridad', 'hds', 'msds', 'ficha', 'gre'] }
          ],
          evitar: [ { claves: ['me acerco al charco', 'enciendo'], fb: 'Nunca te acerques ni generes chispas sin identificar el material.' } ],
          modelo: 'Nos aproximamos con viento a favor y desde lo alto; leo el rombo y el número ONU con binoculares y consulto la guía de respuesta y la hoja de seguridad.'
        },
        {
          acciones: [
            { icono: '🟥', t: 'Delimitar zonas caliente, tibia y fría', p: 2, fb: 'Organiza el trabajo y protege a todos.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📞', t: 'Pedir al ECU 911 apoyo policial y especializado', p: 2, fb: 'Coordinación interinstitucional.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👋', t: 'Pedir que la gente se aleje un poco', p: 1, fb: 'Distancia insuficiente e indefinida.', efecto: { confianza: -2, tension: 4 } },
            { icono: '📱', t: 'Dejar que los curiosos sigan grabando', p: 0, fb: 'Población expuesta al riesgo.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Zonificación', claves: ['zona caliente', 'zona tibia', 'zona fria', 'zonas', 'perimetro', 'aislamiento'] },
            { n: 'Evacuación y fuentes de ignición', claves: ['evacu', 'alej', 'ignicion', 'no fumar', 'apagar motores', 'chispa'] },
            { n: 'Coordinación con ECU 911', claves: ['ecu 911', 'policia', 'especializ', 'apoyo', 'coordin', 'ambiente'] }
          ],
          evitar: [ { claves: ['que graben', 'no pasa nada'], fb: 'Los vapores inflamables ponen en riesgo a todos.' } ],
          modelo: 'Establezco zona caliente, tibia y fría con aislamiento según la guía, evacuamos a los curiosos, nadie fuma ni enciende motores, y pido al ECU 911 Policía y el equipo especializado.'
        },
        {
          acciones: [
            { icono: '🧤', t: 'Colocarse el EPP indicado por la guía', p: 2, fb: 'Protección específica para el material.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧱', t: 'Hacer un dique con tierra y absorbente', p: 2, fb: 'Evita que el derrame llegue al estero.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🚿', t: 'Diluir el derrame con mucha agua', p: 0, fb: 'Esparce el contaminante.', efecto: { confianza: -15, tension: 12 } },
            { icono: '🧼', t: 'Armar corredor de descontaminación', p: 2, fb: 'Evita contaminación secundaria.', efecto: { confianza: 8, tension: -5 } }
          ],
          conceptos: [
            { n: 'Contención del derrame', claves: ['conten', 'dique', 'absorbente', 'barrera', 'tapar la fuga', 'estero'] },
            { n: 'Descontaminación', claves: ['descontamin', 'corredor', 'zona tibia', 'lavado', 'retirar el traje'] },
            { n: 'Disposición de residuos', claves: ['residuo', 'gestor', 'disposicion', 'eliminacion', 'ambiental', 'autorizado'] }
          ],
          evitar: [ { claves: ['mucha agua', 'al rio', 'nos vamos asi'], fb: 'Diluir o no descontaminar amplía el daño.' } ],
          modelo: 'Con el EPP de la guía, hacemos un dique con tierra y absorbente para proteger el estero; luego corredor de descontaminación en la zona tibia y los residuos van a un gestor autorizado.'
        }
      ]
    }
  },

  /* ===================== CIOR-405 Gestión de Procesos ===================== */
  {
    id: 'asig-CIOR-405', cod: 'CIOR-405',
    titulo: 'Reducir el tiempo de salida de la estación',
    asignaturas: ['CIOR-405'],
    persona: { nombre: 'Mayor Patricia Andi', rol: 'Jefa de operaciones de la estación', avatar: '👩🏽‍💼', pitch: 1.0 },
    contexto: 'Una auditoría muestra que la estación del Puyo tarda en promedio 4 minutos en salir tras la alerta del ECU 911, cuando la meta es 1 minuto. La mayor te pide analizar el proceso, proponer mejoras de calidad y un plan de contingencia.',
    objetivo: 'Aplicar identificación y análisis de procesos, indicadores de desempeño, gestión de calidad y planes de contingencia.',
    pasos: [
      { dice: '¿Por dónde empezamos a mejorar el tiempo de salida?', opciones: [
        { t: 'Mapeo el proceso paso a paso desde la alerta hasta la salida, mido cuánto tarda cada etapa y busco cuellos de botella.', p: 2, r: 'Eso es gestión por procesos.', fb: 'Identificar y medir etapas permite actuar sobre causas reales.' },
        { t: 'Pido que todos corran más rápido.', p: 1, r: '¿Y si el problema no es la velocidad?', fb: 'Sin análisis se atacan síntomas, no causas.' },
        { t: 'Busco al culpable y lo sanciono.', p: 0, r: 'Eso no mejora el proceso.', fb: 'La gestión de calidad se enfoca en el sistema, no en culpables.' } ] },
      { dice: 'Descubres que se pierden 2 minutos buscando EPP y llaves de la autobomba. ¿Qué propones?', opciones: [
        { t: 'Estandarizar: EPP listo junto a cada unidad, tablero de llaves, lista de chequeo al cambio de guardia y un indicador semanal del tiempo de salida.', p: 2, r: 'Medible y aplicable desde mañana.', fb: 'Estandarización e indicadores son base de la mejora continua (ciclo PHVA).' },
        { t: 'Recordar en la formación que deben estar listos.', p: 1, r: 'Ya se ha dicho y no funciona.', fb: 'Sin estándar ni medición, el cambio no se sostiene.' },
        { t: 'Comprar otra autobomba.', p: 0, r: 'No resuelve la desorganización.', fb: 'Más recursos no corrigen un proceso mal diseñado.' } ] },
      { dice: '¿Y si la autobomba principal se daña en temporada de incendios forestales?', opciones: [
        { t: 'Plan de contingencia: unidad de reserva, convenio de apoyo mutuo con cantones vecinos vía ECU 911, responsables y simulacro para probarlo; luego revisar resultados.', p: 2, r: 'Así no nos quedamos sin respuesta.', fb: 'Un plan de contingencia define alternativas, responsables y se valida con simulacros.' },
        { t: 'Llamamos a quien esté disponible en el momento.', p: 1, r: 'Improvisar no es planificar.', fb: 'La contingencia debe prepararse antes del evento.' },
        { t: 'Esperamos que no pase.', p: 0, r: 'La esperanza no es una estrategia.', fb: 'Ignorar riesgos identificados es mala gestión.' } ] }
    ],
    vivo: {
      lugar: 'Sala de reuniones de la estación de bomberos del Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Dibujar el diagrama de flujo de la salida', p: 2, fb: 'Visualiza el proceso completo.', efecto: { confianza: 10, tension: -6 } },
            { icono: '⏱️', t: 'Cronometrar cada etapa en varias salidas', p: 2, fb: 'Datos reales para decidir.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📢', t: 'Exigir que todos corran más', p: 1, fb: 'No identifica la causa.', efecto: { confianza: -3, tension: 5 } },
            { icono: '👉', t: 'Señalar culpables en público', p: 0, fb: 'Genera conflicto y no mejora nada.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Mapeo del proceso', claves: ['proceso', 'flujo', 'mapeo', 'diagrama', 'etapa', 'paso a paso'] },
            { n: 'Medición', claves: ['medir', 'cronometr', 'tiempo', 'dato', 'indicador', 'minuto'] },
            { n: 'Cuello de botella y causas', claves: ['cuello de botella', 'causa', 'demora', 'retraso', 'analisis', 'problema'] }
          ],
          evitar: [ { claves: ['el culpable', 'sancion'], fb: 'Buscar culpables no corrige el proceso.' } ],
          modelo: 'Mayor, propongo mapear el proceso desde la alerta del ECU 911 hasta la salida, cronometrar cada etapa y analizar dónde está el cuello de botella.'
        },
        {
          acciones: [
            { icono: '🧥', t: 'Ubicar el EPP junto a cada unidad', p: 2, fb: 'Elimina desplazamientos innecesarios.', efecto: { confianza: 8, tension: -5 } },
            { icono: '✅', t: 'Crear lista de chequeo al cambio de guardia', p: 2, fb: 'Estandariza la preparación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗣️', t: 'Solo recordarlo en la formación', p: 1, fb: 'Sin estándar no se sostiene.', efecto: { confianza: -2, tension: 3 } },
            { icono: '💸', t: 'Pedir otra autobomba como solución', p: 0, fb: 'No ataca la causa.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Estandarización', claves: ['estandar', 'procedimiento', 'lista de chequeo', 'checklist', 'orden', 'ubicacion fija'] },
            { n: 'Indicador de desempeño', claves: ['indicador', 'meta', 'un minuto', '1 minuto', 'medicion', 'semanal'] },
            { n: 'Mejora continua', claves: ['mejora continua', 'phva', 'planificar', 'verificar', 'calidad', 'ajust'] }
          ],
          evitar: [ { claves: ['comprar mas', 'no se puede'], fb: 'Primero se optimiza el proceso con los recursos actuales.' } ],
          modelo: 'Propongo estandarizar: EPP junto a cada unidad, tablero de llaves y lista de chequeo en cada guardia, y medir semanalmente el indicador con meta de un minuto, aplicando mejora continua.'
        },
        {
          acciones: [
            { icono: '🚒', t: 'Designar una unidad de reserva operativa', p: 2, fb: 'Alternativa inmediata ante fallas.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🤝', t: 'Proponer apoyo mutuo con cantones vecinos', p: 2, fb: 'Amplía la capacidad de respuesta.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🎲', t: 'Improvisar cuando ocurra', p: 1, fb: 'Respuesta lenta e incierta.', efecto: { confianza: -4, tension: 5 } },
            { icono: '🙈', t: 'Ignorar el riesgo de avería', p: 0, fb: 'Mala gestión de riesgos.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Plan de contingencia', claves: ['contingencia', 'plan', 'alternativa', 'reserva', 'respaldo', 'plan b'] },
            { n: 'Coordinación y responsables', claves: ['apoyo mutuo', 'convenio', 'ecu 911', 'responsable', 'canton', 'coordin'] },
            { n: 'Validación y análisis de riesgo', claves: ['simulacro', 'prueba', 'riesgo', 'evalu', 'revis', 'mantenimiento'] }
          ],
          evitar: [ { claves: ['ojala no pase', 'ya veremos'], fb: 'La contingencia se prepara antes, no durante.' } ],
          modelo: 'Haría un plan de contingencia con unidad de reserva, convenio de apoyo mutuo con cantones vecinos coordinado por el ECU 911, responsables definidos y un simulacro para probarlo.'
        }
      ]
    }
  },

  /* ===================== CIOR-407 Técnicas de Control de Incendios ===================== */
  {
    id: 'asig-CIOR-407', cod: 'CIOR-407',
    titulo: 'Incendio en la cocina de un restaurante',
    asignaturas: ['CIOR-407'],
    persona: { nombre: 'Doña Rosa Shiguango', rol: 'Dueña de un restaurante de maitos en el Puyo', avatar: '👩🏽‍🍳', pitch: 1.2 },
    contexto: 'Se prendió la freidora de aceite del restaurante y el fuego alcanzó el tablero eléctrico. Doña Rosa quiere echar agua. Debes elegir agentes extintores según la clase de fuego, controlar el humo y asegurar el área.',
    objetivo: 'Seleccionar agentes extintores según clases A, B, C, D y K, aplicar ventilación/manejo de humo y enfriamiento y aseguramiento.',
    pasos: [
      { dice: '¡Ayúdeme, joven! ¡Traiga un balde de agua para la freidora!', opciones: [
        { t: '¡No, doña Rosa! Agua en aceite caliente provoca una explosión de vapor; es fuego clase K: uso extintor de acetato de potasio o cubro con tapa y corto el gas.', p: 2, r: '¡Ay, no sabía! Gracias.', fb: 'El fuego K se combate con agentes saponificantes o sofocación; el agua proyecta aceite en llamas.' },
        { t: 'Uso el extintor de polvo químico.', p: 1, r: 'Se apagó, pero ¿y si se reaviva?', fb: 'El PQS puede apagar, pero no enfría el aceite y hay riesgo de reignición; el agente K es el indicado.' },
        { t: 'Le lanzo el agua yo mismo.', p: 0, r: '¡Ahhh, la llama subió hasta el techo!', fb: 'Agua sobre aceite caliente causa bola de fuego.' } ] },
      { dice: 'Ahora arde el tablero eléctrico de la pared. ¿Qué haces?', opciones: [
        { t: 'Es clase C: pido cortar la energía desde el medidor y uso CO2 o polvo químico, nunca agua con tensión.', p: 2, r: 'Correcto, primero cortar la luz.', fb: 'Con energía, el agua conduce electricidad; el CO2 no conduce ni deja residuo.' },
        { t: 'Uso agua en neblina desde lejos.', p: 1, r: 'Arriesgado si no se cortó la luz.', fb: 'Sin corte de energía el riesgo de electrocución persiste.' },
        { t: 'Le echo agua con la manguera directa.', p: 0, r: '¡Peligro de electrocución!', fb: 'El chorro directo conduce la corriente al bombero.' } ] },
      { dice: 'El local está lleno de humo y el techo de caña guadúa sigue humeante. ¿Cómo terminas?', opciones: [
        { t: 'Ventilo con presión positiva, reviso con cámara térmica puntos calientes en el techo, enfrío y remuevo brasas; dejo guardia de cenizas antes de entregar.', p: 2, r: 'Así no se vuelve a prender en la noche.', fb: 'El enfriamiento y la remoción de escombros evitan la reignición.' },
        { t: 'Abro puertas y me retiro.', p: 1, r: '¿Y si queda una brasa?', fb: 'Sin revisión térmica pueden quedar focos ocultos.' },
        { t: 'Ya se apagó, nos vamos.', p: 0, r: 'A medianoche volvió a arder.', fb: 'Omitir el aseguramiento causa reigniciones.' } ] }
    ],
    vivo: {
      lugar: 'Cocina de un restaurante de maitos, centro del Puyo', fondo: 'emergencia',
      inicio: { confianza: 40, tension: 80 },
      pasos: [
        {
          acciones: [
            { icono: '🔥', t: 'Cortar la llave del gas de la cocina', p: 2, fb: 'Elimina el combustible adicional.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🧯', t: 'Usar extintor clase K sobre la freidora', p: 2, fb: 'Agente saponificante y enfriador del aceite.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🌫️', t: 'Disparar polvo químico a la freidora', p: 1, fb: 'Apaga pero puede reavivarse.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🪣', t: 'Lanzar un balde de agua al aceite', p: 0, fb: 'Explosión de vapor y aceite en llamas.', efecto: { confianza: -20, tension: 20 } }
          ],
          conceptos: [
            { n: 'Clase K', claves: ['clase k', 'aceite', 'grasa', 'cocina', 'freidora'] },
            { n: 'Agente adecuado o sofocación', claves: ['acetato', 'extintor k', 'saponific', 'tapa', 'sofoc', 'cortar el gas'] },
            { n: 'Peligro del agua', claves: ['no agua', 'sin agua', 'explosion', 'vapor', 'salpica', 'bola de fuego'] }
          ],
          evitar: [ { claves: ['traiga agua', 'echele agua'], fb: 'El agua en aceite caliente provoca una bola de fuego.' } ],
          modelo: '¡No eche agua, doña Rosa! Es fuego clase K de aceite: corto el gas y uso el extintor de acetato de potasio o tapo la freidora para sofocarla.'
        },
        {
          acciones: [
            { icono: '⚡', t: 'Pedir el corte de energía en el medidor', p: 2, fb: 'Elimina el riesgo eléctrico.', efecto: { confianza: 10, tension: -6 } },
            { icono: '❄️', t: 'Usar extintor de CO2 en el tablero', p: 2, fb: 'No conduce electricidad ni deja residuo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🌧️', t: 'Aplicar neblina de agua a distancia', p: 1, fb: 'Riesgo si no hay corte.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🚒', t: 'Chorro directo de manguera al tablero', p: 0, fb: 'Riesgo de electrocución.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Clase C', claves: ['clase c', 'electric', 'tablero', 'energizad', 'tension'] },
            { n: 'Corte de energía', claves: ['cortar la luz', 'cortar la energia', 'corte', 'medidor', 'breaker', 'desenerg'] },
            { n: 'Agente no conductor', claves: ['co2', 'dioxido de carbono', 'polvo quimico', 'pqs', 'no conduc'] }
          ],
          evitar: [ { claves: ['manguera directa', 'agua al tablero'], fb: 'El agua con tensión electrocuta.' } ],
          modelo: 'Es fuego clase C: primero cortamos la energía en el medidor y aplico dióxido de carbono, nunca agua mientras haya tensión.'
        },
        {
          acciones: [
            { icono: '🌀', t: 'Ventilar con presión positiva', p: 2, fb: 'Saca el humo de forma controlada.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📷', t: 'Revisar el techo con cámara térmica', p: 2, fb: 'Detecta focos ocultos.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🚪', t: 'Solo abrir las puertas', p: 1, fb: 'Ventilación parcial sin revisión.', efecto: { confianza: -2, tension: 3 } },
            { icono: '👋', t: 'Retirarse sin revisar brasas', p: 0, fb: 'Alto riesgo de reignición.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Ventilación y control de humo', claves: ['ventil', 'presion positiva', 'humo', 'extractor', 'ventilador'] },
            { n: 'Enfriamiento y remoción', claves: ['enfri', 'remov', 'brasa', 'escombro', 'remojar', 'punto caliente'] },
            { n: 'Aseguramiento del área', claves: ['camara termica', 'asegur', 'guardia de cenizas', 'revis', 'reignicion', 'entreg'] }
          ],
          evitar: [ { claves: ['ya se apago', 'nos vamos'], fb: 'Sin aseguramiento, el fuego puede reiniciar.' } ],
          modelo: 'Ventilamos con presión positiva, reviso el techo de guadúa con cámara térmica, enfrío y remuevo brasas, y dejo guardia de cenizas antes de entregar el local.'
        }
      ]
    }
  },

  /* ===================== CIOR-408 Operaciones de Rescate ===================== */
  {
    id: 'asig-CIOR-408', cod: 'CIOR-408',
    titulo: 'Extricación en un choque en la vía Puyo–Baños',
    asignaturas: ['CIOR-408'],
    persona: { nombre: 'Sr. Héctor Pérez', rol: 'Conductor atrapado en su camioneta', avatar: '👨🏻', pitch: 0.9 },
    contexto: 'Una camioneta chocó contra un bus en la vía Puyo–Baños, sector Mera. El conductor está atrapado por las piernas. Debes asegurar la escena, estabilizar el vehículo, comunicarte con la víctima y extraerla coordinando con la ambulancia.',
    objetivo: 'Aplicar evaluación de riesgos, estabilización, uso de equipos de corte y extracción, inmovilización y coordinación interinstitucional.',
    pasos: [
      { dice: '(Llegas en la unidad de rescate. Hay tráfico, gasolina en la vía y la camioneta está de lado.) ¿Qué haces primero?', opciones: [
        { t: 'Señalizo y protejo la escena con conos y la unidad en bloqueo, controlo el derrame, desconecto la batería y estabilizo con cuñas y puntales.', p: 2, r: 'Escena segura, podemos trabajar.', fb: 'La seguridad de la escena y la estabilización preceden a cualquier extracción.' },
        { t: 'Voy directo a sacar al conductor por la ventana.', p: 1, r: 'El vehículo se movió, cuidado.', fb: 'Sin estabilización el vehículo puede moverse y agravar lesiones.' },
        { t: 'Empiezo a cortar sin desconectar la batería.', p: 0, r: '¡Pueden activarse los airbags!', fb: 'Airbags no desplegados y chispas son riesgos graves.' } ] },
      { dice: '¡Me duele mucho la pierna, sáquenme ya! ¡No siento los dedos!', opciones: [
        { t: 'Señor, soy rescatista, me llamo... No mueva la cabeza; le colocamos collarín, lo cubrimos y le explicamos cada ruido. Lo sacaremos seguro.', p: 2, r: 'Está bien... confío en ustedes.', fb: 'La comunicación calma a la víctima; inmovilización cervical y protección durante el corte.' },
        { t: 'Tranquilo, ya mismo.', p: 1, r: '¿Pero qué van a hacer?', fb: 'Falta información e inmovilización.' },
        { t: 'Le jalo de las piernas para liberarlo.', p: 0, r: '¡Aaah!', fb: 'Mover sin inmovilizar puede causar lesión medular.' } ] },
      { dice: '(El paramédico del MSP y la Policía de tránsito llegan.) ¿Cómo coordinas la extracción?', opciones: [
        { t: 'Acordamos el plan: retiro de puerta y techo con herramienta hidráulica, extracción en tabla espinal en eje, el paramédico controla a la víctima y la Policía el tránsito; mando único.', p: 2, r: 'Perfecto, en eje y a la cuenta.', fb: 'La coordinación con roles claros optimiza la extracción segura.' },
        { t: 'Cortamos nosotros y luego llamamos al paramédico.', p: 1, r: 'El paramédico debe estar desde el inicio.', fb: 'El soporte médico durante la extracción es fundamental.' },
        { t: 'Cada institución hace lo suyo sin hablar.', p: 0, r: 'Caos en la escena.', fb: 'Sin coordinación se duplican esfuerzos y aumentan riesgos.' } ] }
    ],
    vivo: {
      lugar: 'Vía Puyo–Baños, sector Mera, choque camioneta–bus', fondo: 'emergencia',
      inicio: { confianza: 40, tension: 80 },
      pasos: [
        {
          acciones: [
            { icono: '🚧', t: 'Señalizar con conos y unidad en bloqueo', p: 2, fb: 'Protege a rescatistas del tráfico.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔋', t: 'Desconectar la batería del vehículo', p: 2, fb: 'Reduce riesgo de chispas y airbags.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪵', t: 'Estabilizar con cuñas y puntales', p: 2, fb: 'Evita movimientos del vehículo.', efecto: { confianza: 10, tension: -6 } },
            { icono: '✂️', t: 'Cortar el parante sin estabilizar', p: 0, fb: 'Movimiento del vehículo y activación de airbags.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Seguridad de la escena', claves: ['senaliz', 'conos', 'seguridad', 'trafico', 'bloqueo', 'escena'] },
            { n: 'Control de riesgos del vehículo', claves: ['bateria', 'desconect', 'derrame', 'gasolina', 'airbag', 'extintor'] },
            { n: 'Estabilización', claves: ['estabiliz', 'cuna', 'puntal', 'calzar', 'bloque'] }
          ],
          evitar: [ { claves: ['corto de una', 'lo saco ya'], fb: 'Primero seguridad y estabilización.' } ],
          modelo: 'Primero señalizo la escena con conos y la unidad en bloqueo, controlo el derrame de gasolina, desconecto la batería y estabilizo la camioneta con cuñas y puntales.'
        },
        {
          acciones: [
            { icono: '🗣️', t: 'Presentarse y explicar a la víctima el proceso', p: 2, fb: 'Reduce ansiedad y mejora colaboración.', efecto: { confianza: 12, tension: -8 } },
            { icono: '🦴', t: 'Colocar collarín cervical', p: 2, fb: 'Protege la columna.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🛡️', t: 'Cubrir a la víctima durante el corte', p: 2, fb: 'Protege de vidrios y fragmentos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💪', t: 'Jalar las piernas atrapadas', p: 0, fb: 'Riesgo de lesión grave.', efecto: { confianza: -20, tension: 18 } }
          ],
          conceptos: [
            { n: 'Comunicación con la víctima', claves: ['me llamo', 'soy rescatista', 'tranquil', 'explic', 'le vamos', 'confie'] },
            { n: 'Inmovilización cervical', claves: ['collarin', 'no mueva', 'cabeza', 'cuello', 'inmoviliz', 'columna'] },
            { n: 'Protección durante el corte', claves: ['cubr', 'proteg', 'manta', 'ruido', 'vidrio', 'escudo'] }
          ],
          evitar: [ { claves: ['deje de quejarse', 'jalar'], fb: 'Mover bruscamente o minimizar el dolor daña a la víctima.' } ],
          modelo: 'Señor Héctor, soy rescatista de bomberos; no mueva la cabeza, le pongo un collarín y lo cubro con una manta. Le avisaré antes de cada ruido; lo vamos a sacar seguro.'
        },
        {
          acciones: [
            { icono: '🔧', t: 'Retirar puerta y techo con herramienta hidráulica', p: 2, fb: 'Crea espacio para extracción en eje.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🛏️', t: 'Extraer en tabla espinal manteniendo el eje', p: 2, fb: 'Minimiza lesión medular.', efecto: { confianza: 10, tension: -6 } },
            { icono: '⏳', t: 'Llamar al paramédico al final', p: 1, fb: 'Falta control médico durante la maniobra.', efecto: { confianza: -4, tension: 5 } },
            { icono: '🙅', t: 'Ignorar a la Policía y al MSP', p: 0, fb: 'Descoordinación peligrosa.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Plan de extracción', claves: ['plan', 'puerta', 'techo', 'hidraulic', 'corte', 'separador'] },
            { n: 'Extracción en eje', claves: ['tabla espinal', 'eje', 'en bloque', 'a la cuenta', 'inmoviliz', 'camilla'] },
            { n: 'Coordinación interinstitucional', claves: ['paramedico', 'msp', 'policia', 'transito', 'coordin', 'mando'] }
          ],
          evitar: [ { claves: ['cada uno por su lado', 'no necesitamos'], fb: 'La extracción requiere coordinación y mando único.' } ],
          modelo: 'Plan: retiramos puerta y techo con la herramienta hidráulica, el paramédico controla a la víctima, la Policía el tránsito, y lo extraemos en tabla espinal en eje a la cuenta de tres.'
        }
      ]
    }
  },

  /* ===================== CIOR-409 Educación Ambiental y Control de Incendios ===================== */
  {
    id: 'asig-CIOR-409', cod: 'CIOR-409',
    titulo: 'Quema agrícola y bosque en Arajuno',
    asignaturas: ['CIOR-409'],
    persona: { nombre: 'Don Segundo Aguinda', rol: 'Agricultor kichwa de una comunidad de Arajuno', avatar: '👴🏽', pitch: 0.85 },
    contexto: 'Una quema para preparar la chacra se escapó hacia el bosque y un estero. Tras el control, debes elegir métodos de bajo impacto, explicar los efectos ambientales y acordar prevención con la comunidad.',
    objetivo: 'Aplicar técnicas de control de incendios con menor impacto ambiental, efectos sobre suelo, agua y fauna, rehabilitación y educación preventiva.',
    pasos: [
      { dice: 'El fuego avanza lento por el sotobosque hacia el estero. ¿Cómo lo controlamos sin dañar más?', opciones: [
        { t: 'Abro línea cortafuego manual con herramientas, uso agua del estero con moderación y sin químicos que contaminen; evito tumbar árboles sanos.', p: 2, r: 'Así se cuida la montaña.', fb: 'Las técnicas mínimamente invasivas reducen la erosión y la contaminación del agua.' },
        { t: 'Abro una franja grande con motosierra.', p: 1, r: 'Se pierden muchos árboles.', fb: 'Funciona pero genera mayor impacto del necesario.' },
        { t: 'Echo retardante químico directo al estero.', p: 0, r: '¡Los peces van a morir!', fb: 'Los químicos en cuerpos de agua dañan la fauna acuática.' } ] },
      { dice: '¿Y qué daño hizo el fuego? Igual la montaña vuelve a crecer.', opciones: [
        { t: 'Le explico: el suelo pierde nutrientes y se erosiona con la lluvia, la ceniza contamina el estero y mueren o huyen animales; la recuperación tarda años.', p: 2, r: 'No había pensado en el agua.', fb: 'Los efectos ambientales del fuego incluyen degradación del suelo, contaminación del agua y pérdida de biodiversidad.' },
        { t: 'Le digo que sí hace daño, sin explicar.', p: 1, r: '¿Pero qué daño?', fb: 'La educación ambiental requiere explicar con ejemplos cercanos.' },
        { t: 'Le digo que tiene razón, no pasa nada.', p: 0, r: 'Entonces vuelvo a quemar.', fb: 'Desinformar perpetúa prácticas de riesgo.' } ] },
      { dice: '¿Cómo preparo mi chacra sin quemar o sin que se escape?', opciones: [
        { t: 'Recomiendo alternativas sin fuego como el compostaje y la chacra tradicional; si quema, que avise, haga ronda cortafuego, en día sin viento y con vigilancia; y propongo un taller comunitario y reforestar con especies nativas.', p: 2, r: 'Hagamos el taller en la comunidad.', fb: 'La prevención y la rehabilitación con participación comunitaria son sostenibles.' },
        { t: 'Le digo que no queme nunca.', p: 1, r: '¿Y cómo limpio entonces?', fb: 'Prohibir sin alternativas genera resistencia.' },
        { t: 'Le digo que queme cuando quiera.', p: 0, r: 'Bueno...', fb: 'Promueve el riesgo de incendios forestales.' } ] }
    ],
    vivo: {
      lugar: 'Chacra y bosque junto a un estero, comunidad de Arajuno, Pastaza', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '⛏️', t: 'Abrir línea cortafuego manual con azadón', p: 2, fb: 'Detiene el avance con mínimo impacto.', efecto: { confianza: 10, tension: -6 } },
            { icono: '💧', t: 'Usar agua del estero con bomba de espalda', p: 2, fb: 'Uso moderado y sin químicos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪚', t: 'Tumbar una franja ancha con motosierra', p: 1, fb: 'Mayor daño del necesario.', efecto: { confianza: -4, tension: 2 } },
            { icono: '🧪', t: 'Verter retardante químico en el estero', p: 0, fb: 'Contamina el agua y mata la fauna.', efecto: { confianza: -18, tension: 15 } }
          ],
          conceptos: [
            { n: 'Línea cortafuego', claves: ['cortafuego', 'linea', 'ronda', 'franja', 'quitar combustible', 'herramienta manual'] },
            { n: 'Método menos invasivo', claves: ['menos invasiv', 'bajo impacto', 'minimo', 'cuidar', 'sin quimicos', 'arboles sanos'] },
            { n: 'Proteger el agua', claves: ['estero', 'agua', 'rio', 'contamin', 'peces', 'moderacion'] }
          ],
          evitar: [ { claves: ['quimico al estero', 'tumbamos todo'], fb: 'Aumenta el daño ambiental.' } ],
          modelo: 'Abrimos una línea cortafuego manual, usamos agua del estero con moderación y sin químicos, y no tumbamos árboles sanos para no dañar más la montaña.'
        },
        {
          acciones: [
            { icono: '🌱', t: 'Mostrar el suelo quemado y sin cobertura', p: 2, fb: 'Ejemplo visible de degradación.', efecto: { confianza: 10, tension: -5 } },
            { icono: '🐟', t: 'Señalar la ceniza que cae al estero', p: 2, fb: 'Conecta el fuego con la calidad del agua.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤏', t: 'Decir que sí hay daño sin detallar', p: 1, fb: 'Mensaje poco convincente.', efecto: { confianza: -2, tension: 2 } },
            { icono: '👍', t: 'Darle la razón de que no pasa nada', p: 0, fb: 'Desinformación.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Degradación del suelo', claves: ['suelo', 'nutrient', 'erosion', 'lluvia', 'fertil', 'tierra'] },
            { n: 'Contaminación del agua', claves: ['ceniza', 'agua', 'estero', 'contamin', 'peces', 'turbi'] },
            { n: 'Flora y fauna', claves: ['animal', 'fauna', 'flora', 'plantas', 'biodiversidad', 'anos', 'huyen'] }
          ],
          evitar: [ { claves: ['no pasa nada', 'vuelve a crecer igual'], fb: 'Minimizar el impacto ambiental desinforma.' } ],
          modelo: 'Don Segundo, el fuego deja el suelo sin nutrientes y la lluvia lo erosiona, la ceniza contamina el estero y los animales mueren o huyen; la montaña tarda años en recuperarse.'
        },
        {
          acciones: [
            { icono: '🌳', t: 'Proponer reforestar con especies nativas', p: 2, fb: 'Rehabilita el área afectada.', efecto: { confianza: 10, tension: -5 } },
            { icono: '👥', t: 'Organizar un taller de prevención comunitario', p: 2, fb: 'Promueve conciencia ambiental colectiva.', efecto: { confianza: 10, tension: -6 } },
            { icono: '⛔', t: 'Prohibir quemar sin dar alternativas', p: 1, fb: 'Genera rechazo.', efecto: { confianza: -5, tension: 6 } },
            { icono: '🔥', t: 'Autorizar quemas sin control', p: 0, fb: 'Alto riesgo de incendio forestal.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Alternativas sin fuego', claves: ['sin quemar', 'compost', 'abono', 'alternativa', 'chacra', 'desbroce'] },
            { n: 'Quema controlada y aviso', claves: ['avis', 'ronda', 'sin viento', 'vigil', 'controlad', 'bomberos'] },
            { n: 'Rehabilitación y educación', claves: ['reforest', 'nativ', 'taller', 'comunidad', 'educacion', 'prevencion'] }
          ],
          evitar: [ { claves: ['queme cuando quiera', 'no importa'], fb: 'Fomenta incendios forestales.' } ],
          modelo: 'Le recomiendo compostar en lugar de quemar; si quema, avise a bomberos, haga ronda cortafuego, en día sin viento y con vigilancia. Además propongo un taller comunitario y reforestar con especies nativas.'
        }
      ]
    }
  },

  /* ===================== CIOR-410 Trabajo de Integración Curricular ===================== */
  {
    id: 'asig-CIOR-410', cod: 'CIOR-410',
    titulo: 'Defensa del análisis post-incidente ante el tribunal',
    asignaturas: ['CIOR-410'],
    persona: { nombre: 'Mgs. Carlos Tapuy', rol: 'Presidente del tribunal de integración curricular', avatar: '👨🏽‍🏫', pitch: 0.95 },
    contexto: 'Presentas tu trabajo de integración curricular: un análisis del incendio estructural en el mercado de Puyo con propuesta de mejora. El tribunal evalúa cómo integras física del fuego, técnicas, rescate, normativa y gestión con evidencia.',
    objetivo: 'Integrar los conocimientos de la carrera en un análisis con problema, metodología, evidencias y propuesta aplicable, defendiéndolo con argumentos técnicos.',
    pasos: [
      { dice: 'Explíquenos en pocas palabras cuál es el problema y el objetivo de su trabajo.', opciones: [
        { t: 'El problema es la demora en el control del incendio del mercado por falta de hidrantes operativos y desorden en la escena; mi objetivo es proponer un plan de pre-incidente y mejora operativa.', p: 2, r: 'Claro y delimitado.', fb: 'Un problema concreto y un objetivo medible son la base de un trabajo de integración.' },
        { t: 'Quise estudiar los incendios en general.', p: 1, r: 'Demasiado amplio.', fb: 'Un tema sin delimitar dificulta la evidencia y la propuesta.' },
        { t: 'Hice esto porque me tocó.', p: 0, r: 'Eso no es un problema de investigación.', fb: 'Falta justificación y pertinencia profesional.' } ] },
      { dice: '¿Qué evidencias y métodos usó para sostener su análisis?', opciones: [
        { t: 'Revisé partes del ECU 911 y del cuerpo de bomberos, entrevisté a bomberos y comerciantes con consentimiento, analicé tiempos y la propagación por convección y radiación, y comparé con la normativa.', p: 2, r: 'Buena triangulación de fuentes.', fb: 'Integrar datos, entrevistas, teoría y normativa da validez al análisis.' },
        { t: 'Me basé en lo que vi ese día.', p: 1, r: 'Una sola fuente es débil.', fb: 'La experiencia personal debe complementarse con evidencias verificables.' },
        { t: 'Copié un trabajo de otra provincia.', p: 0, r: 'Eso es plagio.', fb: 'El plagio invalida el trabajo y es una falta académica grave.' } ] },
      { dice: '¿Qué propone y cómo sabremos si funciona?', opciones: [
        { t: 'Propongo un plan pre-incidente con mapa de hidrantes, rutas de acceso y zonas de riesgo, capacitación a comerciantes y simulacro anual; lo mediré con tiempo de llegada, tiempo de control e indicadores del simulacro.', p: 2, r: 'Propuesta aplicable y evaluable. Felicitaciones.', fb: 'Una propuesta con indicadores permite verificar su impacto (mejora continua).' },
        { t: 'Propongo que haya más bomberos.', p: 1, r: '¿Con qué recursos y cómo lo medirá?', fb: 'Las propuestas deben ser viables y medibles.' },
        { t: 'No tengo propuesta, solo describí el incendio.', p: 0, r: 'Falta el aporte central.', fb: 'Un trabajo de integración debe aportar soluciones.' } ] }
    ],
    vivo: {
      lugar: 'Sala de defensas del Instituto Superior Tecnológico, Puyo', fondo: 'aula',
      inicio: { confianza: 45, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '🖥️', t: 'Proyectar la diapositiva del problema', p: 2, fb: 'Apoya visualmente la exposición.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🎯', t: 'Enunciar un objetivo concreto y medible', p: 2, fb: 'Delimita el alcance del trabajo.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📚', t: 'Hablar de incendios en general', p: 1, fb: 'Tema sin delimitar.', efecto: { confianza: -3, tension: 4 } },
            { icono: '😶', t: 'Leer el documento sin mirar al tribunal', p: 0, fb: 'Comunicación deficiente.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Problema delimitado', claves: ['problema', 'mercado', 'demora', 'hidrante', 'desorden', 'puyo'] },
            { n: 'Objetivo', claves: ['objetivo', 'proponer', 'plan', 'mejor', 'pre incidente', 'preincidente'] },
            { n: 'Pertinencia profesional', claves: ['comunidad', 'seguridad', 'bomberos', 'riesgo', 'importan', 'justific'] }
          ],
          evitar: [ { claves: ['porque me toco', 'no se'], fb: 'Debes justificar la pertinencia del trabajo.' } ],
          modelo: 'El problema es la demora en el control del incendio del mercado del Puyo por hidrantes inoperativos y desorden en la escena; mi objetivo es proponer un plan pre-incidente que mejore la seguridad de la comunidad.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Mostrar la gráfica de tiempos de respuesta', p: 2, fb: 'Evidencia cuantitativa.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🎙️', t: 'Citar entrevistas con consentimiento', p: 2, fb: 'Evidencia cualitativa ética.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👁️', t: 'Basarse solo en su experiencia', p: 1, fb: 'Fuente única y subjetiva.', efecto: { confianza: -3, tension: 4 } },
            { icono: '📋', t: 'Presentar datos copiados de otro trabajo', p: 0, fb: 'Plagio.', efecto: { confianza: -20, tension: 15 } }
          ],
          conceptos: [
            { n: 'Fuentes documentales', claves: ['parte', 'informe', 'ecu 911', 'registro', 'dato', 'tiempo'] },
            { n: 'Entrevistas éticas', claves: ['entrevist', 'consentimiento', 'comerciante', 'bomberos', 'testimonio', 'encuesta'] },
            { n: 'Análisis técnico y normativo', claves: ['conveccion', 'radiacion', 'propagacion', 'normativa', 'analic', 'compar'] }
          ],
          evitar: [ { claves: ['lo copie', 'lo saque de internet'], fb: 'El plagio invalida el trabajo.' } ],
          modelo: 'Revisé los partes del ECU 911 y de bomberos, entrevisté con consentimiento a bomberos y comerciantes, analicé tiempos y la propagación por convección y radiación, y lo comparé con la normativa.'
        },
        {
          acciones: [
            { icono: '🗺️', t: 'Presentar el mapa de hidrantes y accesos', p: 2, fb: 'Producto concreto del plan.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📈', t: 'Definir indicadores de evaluación', p: 2, fb: 'Permite medir el impacto.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👨‍🚒', t: 'Pedir solo más personal', p: 1, fb: 'Propuesta poco viable.', efecto: { confianza: -3, tension: 4 } },
            { icono: '🤷', t: 'Admitir que no hay propuesta', p: 0, fb: 'Falta el aporte central.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Propuesta aplicable', claves: ['plan pre', 'mapa', 'hidrante', 'ruta', 'acceso', 'propuesta'] },
            { n: 'Capacitación y simulacro', claves: ['capacit', 'simulacro', 'comerciante', 'taller', 'entrenamiento'] },
            { n: 'Indicadores de evaluación', claves: ['indicador', 'medir', 'tiempo de llegada', 'tiempo de control', 'evalu', 'resultado'] }
          ],
          evitar: [ { claves: ['no tengo propuesta', 'solo describi'], fb: 'El trabajo debe aportar una solución.' } ],
          modelo: 'Propongo un plan pre-incidente con mapa de hidrantes, rutas de acceso y zonas de riesgo, capacitación a comerciantes y simulacro anual; lo mediré con el tiempo de llegada y el tiempo de control.'
        }
      ]
    }
  }
]);
