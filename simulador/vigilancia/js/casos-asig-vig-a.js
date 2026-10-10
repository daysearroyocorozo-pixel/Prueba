/* Prácticas por asignatura – Vigilancia y Seguridad Ciudadana (PAO 1) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== VSC-01 Metodología de la Investigación ===================== */
  {
    id: 'asig-VSC-01', cod: 'VSC-01',
    titulo: 'Diagnóstico de inseguridad en el Terminal Terrestre',
    asignaturas: ['VSC-01'],
    persona: { nombre: 'Mgs. Lorena Cerda', rol: 'Coordinadora del proyecto de vinculación del ISTCY', avatar: '👩🏽‍🏫', pitch: 1.05 },
    contexto: 'Los comerciantes del Terminal Terrestre de Puyo reportan robos frecuentes. La coordinadora del proyecto de vinculación te pide apoyar un diagnóstico básico antes de proponer acciones preventivas.',
    objetivo: 'Aplicar el levantamiento básico de información: problema, objetivo, instrumentos (fichas de observación y encuestas), ética y análisis de datos.',
    pasos: [
      { dice: 'Queremos ayudar a los comerciantes del terminal. ¿Cómo empezamos el diagnóstico?', opciones: [
          { t: 'Planteo el problema y un objetivo concreto, por ejemplo identificar lugares y horarios de los robos, y defino a quiénes vamos a consultar.', p: 2, r: 'Muy bien, así sabremos qué medir y a quién preguntar.', fb: 'La investigación aplicada parte de un problema delimitado, un objetivo claro y una población definida.' },
          { t: 'Pregunto a los conocidos que trabajan en el terminal y vemos qué sale.', p: 1, r: 'Es un inicio, pero la información puede quedar sesgada.', fb: 'Sin objetivo ni criterio de selección, los datos no son confiables.' },
          { t: 'Ya sabemos que la culpa es de los informales; escribo eso en el informe.', p: 0, r: '¿Y con qué evidencia sostenemos eso?', fb: 'Concluir sin datos es un prejuicio, no un diagnóstico.' } ] },
      { dice: '¿Con qué instrumentos recogerás la información?', opciones: [
          { t: 'Con una ficha de observación en recorridos a distintas horas y una encuesta breve a comerciantes y usuarios, con consentimiento y sin pedir nombres.', p: 2, r: 'Excelente: combinas observación y opinión, y cuidas a las personas.', fb: 'Usar varios instrumentos mejora la validez; el consentimiento y el anonimato son principios éticos.' },
          { t: 'Solo con lo que publiquen en Facebook sobre el terminal.', p: 1, r: 'Las redes muestran percepciones, pero no son un registro sistemático.', fb: 'Las redes sociales pueden complementar, pero no reemplazan los instrumentos propios.' },
          { t: 'Grabando a escondidas a los vendedores para identificar sospechosos.', p: 0, r: '¡Eso vulnera derechos!', fb: 'Grabar sin consentimiento y señalar sospechosos es ilegal y antiético.' } ] },
      { dice: 'Ya tenemos 80 encuestas y 12 fichas. ¿Cómo presentamos los resultados?', opciones: [
          { t: 'Tabulo los datos, calculo porcentajes por lugar y horario, hago gráficos y redacto un informe con método, resultados, conclusiones y recomendaciones.', p: 2, r: 'Perfecto, así los comerciantes y la Policía podrán usarlo.', fb: 'El análisis descriptivo y un informe ordenado convierten los datos en decisiones.' },
          { t: 'Cuento las historias más impactantes que nos dijeron.', p: 1, r: 'Ayudan a sensibilizar, pero faltan cifras.', fb: 'Los testimonios complementan, pero no reemplazan el análisis de datos.' },
          { t: 'Entrego las hojas sin procesar para que cada uno saque sus conclusiones.', p: 0, r: 'Nadie va a revisar 80 hojas.', fb: 'Los datos sin procesar no constituyen un informe.' } ] }
    ],
    vivo: {
      lugar: 'Terminal Terrestre de Puyo, sala de espera', fondo: 'comunidad',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Escribir el problema y el objetivo en la libreta', p: 2, fb: 'Delimitar el problema orienta toda la investigación.', efecto: { confianza: 10, tension: -6 } },
            { icono: '👥', t: 'Listar a quiénes consultar: comerciantes y usuarios', p: 2, fb: 'Definir la población permite elegir una muestra adecuada.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☕', t: 'Preguntar solo a dos amigos del terminal', p: 1, fb: 'No representan a todos los afectados.', efecto: { confianza: 0, tension: 3 } },
            { icono: '✍️', t: 'Redactar las conclusiones antes de investigar', p: 0, fb: 'Es un sesgo de confirmación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Plantea el problema y el objetivo', claves: ['problema', 'objetivo', 'pregunta', 'delimit', 'proposito', 'que queremos saber'] },
            { n: 'Define la población a consultar', claves: ['poblacion', 'muestra', 'comerciantes', 'usuarios', 'a quienes', 'participantes'] },
            { n: 'Se enfoca en lugares y horarios', claves: ['lugares', 'horarios', 'donde', 'a que hora', 'zonas', 'franja'] }
          ],
          evitar: [ { claves: ['ya sabemos', 'la culpa es de'], fb: 'Asumir la respuesta impide un diagnóstico objetivo.' } ],
          modelo: 'Primero planteo el problema y un objetivo concreto: identificar los lugares y horarios de los robos en el terminal. Luego defino la población: comerciantes y usuarios.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Preparar una ficha de observación por horarios', p: 2, fb: 'La observación sistemática registra hechos verificables.', efecto: { confianza: 9, tension: -5 } },
            { icono: '📝', t: 'Diseñar una encuesta breve y anónima', p: 2, fb: 'El anonimato favorece respuestas sinceras.', efecto: { confianza: 7, tension: -3 } },
            { icono: '📱', t: 'Copiar comentarios de Facebook como datos', p: 1, fb: 'Son percepciones sin control de origen.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🕵️', t: 'Grabar a escondidas a los vendedores', p: 0, fb: 'Vulnera derechos y la protección de datos personales.', efecto: { confianza: -15, tension: 14 } }
          ],
          conceptos: [
            { n: 'Elige instrumentos de recolección', claves: ['ficha de observacion', 'observacion', 'encuesta', 'entrevista', 'cuestionario', 'instrumento'] },
            { n: 'Recoge datos en distintos momentos', claves: ['recorridos', 'distintas horas', 'manana', 'tarde', 'noche', 'varios dias'] },
            { n: 'Aplica principios éticos', claves: ['consentimiento', 'anonim', 'sin nombres', 'confidencial', 'voluntari', 'respeto'] }
          ],
          evitar: [ { claves: ['a escondidas', 'sin que sepan'], fb: 'La recolección de datos requiere consentimiento.' } ],
          modelo: 'Usaré una ficha de observación en recorridos a distintas horas y una encuesta breve a comerciantes y usuarios, con consentimiento informado y de forma anónima, sin pedir nombres.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Tabular en hoja de cálculo y graficar', p: 2, fb: 'El análisis descriptivo resume los hallazgos.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📑', t: 'Ordenar el informe por secciones', p: 2, fb: 'Una estructura clara facilita la toma de decisiones.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💬', t: 'Resumir solo las historias más impactantes', p: 1, fb: 'Faltan cifras que sustenten.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🗃️', t: 'Entregar las encuestas sin procesar', p: 0, fb: 'Los datos brutos no son un informe.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Analiza los datos', claves: ['tabul', 'porcentaje', 'grafic', 'frecuencia', 'promedio', 'estadistic'] },
            { n: 'Estructura el informe', claves: ['informe', 'metodo', 'resultados', 'conclusiones', 'introduccion', 'secciones'] },
            { n: 'Formula recomendaciones útiles', claves: ['recomendacion', 'propuesta', 'acciones preventivas', 'sugerencias', 'mejorar', 'prevencion'] }
          ],
          evitar: [ { claves: ['inventar datos', 'cambiar los numeros'], fb: 'Manipular datos es una falta ética grave.' } ],
          modelo: 'Tabulo los datos, calculo porcentajes por lugar y horario y los grafico. Luego redacto el informe con método, resultados, conclusiones y recomendaciones de prevención.'
        }
      ]
    }
  },

  /* ===================== VSC-02 Psicología Social y Comportamiento Delictivo ===================== */
  {
    id: 'asig-VSC-02', cod: 'VSC-02',
    titulo: 'Los jóvenes de la esquina: ¿riesgo o prejuicio?',
    asignaturas: ['VSC-02'],
    persona: { nombre: 'Doña Gladys Tanguila', rol: 'Vecina del barrio La Merced', avatar: '👵🏽', pitch: 1.2 },
    contexto: 'Un grupo de adolescentes se reúne cada tarde en la esquina del parque del barrio. Una vecina te exige que los expulses porque «seguro son delincuentes». Debes aplicar lo que sabes del comportamiento social y delictivo.',
    objetivo: 'Diferenciar conducta observable de prejuicio, explicar factores de riesgo y de protección, y proponer prevención social.',
    pasos: [
      { dice: '¡Esos muchachos son delincuentes! Sáquelos de la esquina ya mismo.', opciones: [
          { t: 'Le pregunto qué conductas concretas ha visto y le explico que reunirse en un espacio público no es un delito; actúo sobre hechos, no sobre apariencias.', p: 2, r: 'Bueno… la verdad solo hacen bulla y ponen música.', fb: 'Distinguir hechos de prejuicios evita la estigmatización y la discriminación.' },
          { t: 'Le digo que voy a pasar más seguido para vigilarlos.', p: 1, r: 'Al menos haga algo.', fb: 'La presencia preventiva es útil, pero sin aclarar el prejuicio se refuerza el estigma.' },
          { t: 'Voy y los saco del parque por su aspecto.', p: 0, r: '¡Eso, que se vayan!', fb: 'Expulsar por apariencia es discriminatorio y vulnera el derecho al espacio público.' } ] },
      { dice: '¿Y por qué algunos jóvenes terminan delinquiendo?', opciones: [
          { t: 'Le explico que influyen factores de riesgo como la violencia familiar, la deserción escolar o el consumo de drogas, y que la familia, la escuela y el deporte son factores de protección.', p: 2, r: 'Ah, entonces no es solo que sean malos.', fb: 'El comportamiento delictivo es multicausal; reconocer factores de riesgo y protección orienta la prevención.' },
          { t: 'Le digo que es porque hoy los jóvenes no respetan a nadie.', p: 1, r: 'Eso mismo digo yo.', fb: 'Es una generalización que no explica las causas.' },
          { t: 'Le digo que nacen así y no se puede hacer nada.', p: 0, r: 'Entonces hay que botarlos.', fb: 'Es una idea sin fundamento científico que justifica la exclusión.' } ] },
      { dice: '¿Entonces qué hacemos con ellos?', opciones: [
          { t: 'Propongo acercarnos con respeto, invitarlos a actividades deportivas y culturales con el GAD y coordinar con la Policía comunitaria y el comité barrial.', p: 2, r: 'Mi nieto juega fútbol, podría invitarlos.', fb: 'La prevención social fortalece factores de protección y la convivencia.' },
          { t: 'Que la Policía los vigile todos los días.', p: 1, r: 'Por lo menos eso.', fb: 'El control por sí solo no aborda las causas.' },
          { t: 'Poner un letrero que prohíba la entrada a jóvenes.', p: 0, r: '(Los jóvenes se sienten rechazados.)', fb: 'Excluir a un grupo social es discriminatorio y aumenta el conflicto.' } ] }
    ],
    vivo: {
      lugar: 'Parque del barrio La Merced, Puyo', fondo: 'comunidad',
      inicio: { confianza: 40, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '👀', t: 'Observar unos minutos qué hacen realmente', p: 2, fb: 'La observación de conductas concretas evita juicios por apariencia.', efecto: { confianza: 6, tension: -6 } },
            { icono: '❓', t: 'Preguntar a la vecina qué conductas ha visto', p: 2, fb: 'Separar hechos de percepciones aclara la situación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚶', t: 'Prometer rondas más frecuentes', p: 1, fb: 'Ayuda, pero no corrige el prejuicio.', efecto: { confianza: 4, tension: 0 } },
            { icono: '🚫', t: 'Ir a expulsarlos por su aspecto', p: 0, fb: 'Es discriminatorio y vulnera derechos.', efecto: { confianza: 6, tension: 15 } }
          ],
          conceptos: [
            { n: 'Pregunta por hechos concretos', claves: ['que ha visto', 'que hacen', 'conducta', 'hechos', 'que paso', 'algun hecho'] },
            { n: 'Aclara que reunirse no es delito', claves: ['no es delito', 'espacio publico', 'derecho a estar', 'pueden reunirse', 'no estan prohibidos', 'derecho'] },
            { n: 'Evita el prejuicio por apariencia', claves: ['apariencia', 'prejuicio', 'por su aspecto', 'estigma', 'no podemos juzgar', 'discrimin'] }
          ],
          evitar: [ { claves: ['son delincuentes', 'los saco', 'tienen pinta'], fb: 'Juzgar por apariencia es discriminatorio.' } ],
          modelo: 'Doña Gladys, ¿qué hechos concretos ha visto? Reunirse en un espacio público no es delito; yo actúo sobre conductas, no por su apariencia ni por prejuicio.'
        },
        {
          acciones: [
            { icono: '🧩', t: 'Dibujar en la libreta factores de riesgo y protección', p: 2, fb: 'Visualizar las causas ayuda a comprender que el delito es multicausal.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📰', t: 'Mostrar una guía de prevención de la violencia juvenil', p: 2, fb: 'Un material confiable respalda la explicación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙄', t: 'Darle la razón: «los jóvenes de hoy son así»', p: 1, fb: 'La generalización no explica nada.', efecto: { confianza: 4, tension: 2 } },
            { icono: '🧬', t: 'Afirmar que nacen delincuentes', p: 0, fb: 'Es una idea sin sustento que justifica la exclusión.', efecto: { confianza: -6, tension: 10 } }
          ],
          conceptos: [
            { n: 'Explica factores de riesgo', claves: ['factores de riesgo', 'violencia familiar', 'desercion', 'consumo', 'drogas', 'abandono', 'pobreza'] },
            { n: 'Explica factores de protección', claves: ['factores de proteccion', 'familia', 'escuela', 'deporte', 'cultura', 'apoyo'] },
            { n: 'Reconoce que el delito tiene varias causas', claves: ['varias causas', 'multicausal', 'no es solo', 'influyen', 'entorno', 'contexto'] }
          ],
          evitar: [ { claves: ['nacen asi', 'no tienen remedio'], fb: 'El determinismo no tiene sustento científico.' } ],
          modelo: 'Influyen varias causas: hay factores de riesgo como la violencia familiar, la deserción escolar o el consumo de drogas, y factores de protección como la familia, la escuela y el deporte.'
        },
        {
          acciones: [
            { icono: '⚽', t: 'Invitar a los jóvenes a un campeonato barrial', p: 2, fb: 'Las actividades deportivas fortalecen factores de protección.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🤝', t: 'Coordinar con la Policía comunitaria y el GAD', p: 2, fb: 'La prevención social es interinstitucional.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔦', t: 'Pedir vigilancia policial diaria', p: 1, fb: 'El control solo no aborda las causas.', efecto: { confianza: 2, tension: 2 } },
            { icono: '🪧', t: 'Colocar un letrero que prohíba la entrada a jóvenes', p: 0, fb: 'Excluir a un grupo es discriminatorio.', efecto: { confianza: -8, tension: 12 } }
          ],
          conceptos: [
            { n: 'Propone actividades preventivas', claves: ['deport', 'cultural', 'campeonato', 'talleres', 'musica', 'actividades'] },
            { n: 'Coordina con instituciones y la comunidad', claves: ['gad', 'municipio', 'policia comunitaria', 'comite barrial', 'coordin', 'upc'] },
            { n: 'Se acerca con respeto a los jóvenes', claves: ['con respeto', 'acercarnos', 'conversar con ellos', 'invitarlos', 'escucharlos', 'dialogo'] }
          ],
          evitar: [ { claves: ['prohibir la entrada', 'que no vuelvan'], fb: 'La exclusión aumenta el conflicto.' } ],
          modelo: 'Propongo acercarnos con respeto e invitarlos a actividades deportivas y culturales del GAD, coordinando con la Policía comunitaria y el comité barrial.'
        }
      ]
    }
  },

  /* ===================== VSC-03 Estrategias Operativas y Herramientas Tecnológicas ===================== */
  {
    id: 'asig-VSC-03', cod: 'VSC-03',
    titulo: 'Primer día en el control de accesos de una empresa',
    asignaturas: ['VSC-03'],
    persona: { nombre: 'Ing. Patricio Villacís', rol: 'Supervisor de seguridad de una empresa de servicios petroleros en Puyo', avatar: '👷🏻‍♂️', pitch: 0.9 },
    contexto: 'Inicias tus prácticas en la garita de una empresa de servicios petroleros. El supervisor te evalúa en la planificación de rondas, el control de accesos y el uso de la radio y las cámaras.',
    objetivo: 'Aplicar estrategias operativas (puesto fijo, rondas, control de accesos) y herramientas tecnológicas (CCTV, radio, registro digital).',
    pasos: [
      { dice: '¿Cómo vas a organizar tus rondas en el patio de maquinaria durante la noche?', opciones: [
          { t: 'Hago rondas a intervalos y recorridos variables, priorizando los puntos críticos (bodega, cerramiento y combustible), y reporto cada control por radio.', p: 2, r: 'Correcto: si las rondas son predecibles, cualquiera las aprende.', fb: 'Las rondas irregulares y enfocadas en puntos críticos son más disuasivas.' },
          { t: 'Hago una ronda cada hora en punto por el mismo camino.', p: 1, r: 'Al menos haces rondas, pero eres muy predecible.', fb: 'Un patrón fijo facilita que alguien evada la vigilancia.' },
          { t: 'Me quedo en la garita viendo las cámaras toda la noche.', p: 0, r: 'Las cámaras no reemplazan la presencia.', fb: 'Sin rondas quedan puntos ciegos y no hay disuasión.' } ] },
      { dice: '(Llega un señor en camioneta sin credencial.) «Vengo a dejar un repuesto, déjeme pasar rápido.»', opciones: [
          { t: 'Lo saludo, le pido identificación, verifico con el área que lo espera, lo registro en la bitácora y le entrego una credencial de visitante.', p: 2, r: 'Está bien, entiendo el procedimiento.', fb: 'Identificar, verificar, registrar y acreditar: son los pasos del control de accesos.' },
          { t: 'Le dejo pasar porque dice que es rápido, pero anoto la placa.', p: 1, r: 'Gracias, ya regreso.', fb: 'Anotar la placa ayuda, pero sin verificar no hay control real.' },
          { t: 'Le niego el paso a gritos y le digo que se vaya.', p: 0, r: '¡Qué mala atención!', fb: 'El control de accesos se hace con cortesía y procedimiento, no con hostilidad.' } ] },
      { dice: 'En la cámara 3 se ve una persona junto al cerramiento. ¿Qué haces?', opciones: [
          { t: 'Hago zoom y grabo el evento, informo por radio a la central con un mensaje claro y breve, y envío a un compañero a verificar sin exponerse.', p: 2, r: 'Bien: la tecnología te da información y la radio coordina la respuesta.', fb: 'El CCTV permite detectar y documentar; la radio coordina una verificación segura.' },
          { t: 'Salgo corriendo solo hacia el cerramiento.', p: 1, r: 'Valiente, pero arriesgado.', fb: 'Actuar solo y sin aviso aumenta tu riesgo.' },
          { t: 'Apago el monitor; seguro es un animal.', p: 0, r: '¡Podía ser un intruso!', fb: 'Ignorar una alerta es una falla grave del servicio.' } ] }
    ],
    vivo: {
      lugar: 'Garita de control de una empresa de servicios petroleros, Puyo', fondo: 'obra',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Marcar los puntos críticos en el plano del patio', p: 2, fb: 'Conocer los puntos críticos orienta las rondas.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔀', t: 'Planificar recorridos con horarios variables', p: 2, fb: 'La imprevisibilidad aumenta la disuasión.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⏰', t: 'Fijar rondas cada hora en punto', p: 1, fb: 'Es un patrón predecible.', efecto: { confianza: 2, tension: 2 } },
            { icono: '🛋️', t: 'Quedarse en la garita toda la noche', p: 0, fb: 'Sin rondas no hay presencia preventiva.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Rondas variables', claves: ['variable', 'irregular', 'diferentes horas', 'no predecible', 'aleatori', 'cambiar el recorrido'] },
            { n: 'Prioriza puntos críticos', claves: ['puntos criticos', 'bodega', 'cerramiento', 'combustible', 'acceso', 'perimetro'] },
            { n: 'Reporta por radio', claves: ['radio', 'reporto', 'central', 'cada control', 'informo', 'comunic'] }
          ],
          evitar: [ { claves: ['solo camaras', 'no salgo de la garita'], fb: 'Las cámaras no sustituyen la presencia.' } ],
          modelo: 'Haré rondas en horarios y recorridos variables, priorizando los puntos críticos como la bodega, el combustible y el cerramiento, y reportaré cada control por radio a la central.'
        },
        {
          acciones: [
            { icono: '🪪', t: 'Solicitar la cédula o credencial del visitante', p: 2, fb: 'La identificación es el primer paso del control de accesos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '☎️', t: 'Llamar al área que espera el repuesto', p: 2, fb: 'Verificar con el anfitrión confirma el motivo de la visita.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🖊️', t: 'Anotar solo la placa y dejarlo pasar', p: 1, fb: 'Sin verificación no hay control real.', efecto: { confianza: 4, tension: 0 } },
            { icono: '😠', t: 'Gritarle que se retire', p: 0, fb: 'La hostilidad daña la atención y no es procedimiento.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Identifica al visitante', claves: ['identificacion', 'cedula', 'credencial', 'documento', 'nombre'] },
            { n: 'Verifica con el área anfitriona', claves: ['verific', 'confirmo', 'llamo al area', 'quien lo espera', 'autoriz', 'anfitrion'] },
            { n: 'Registra y acredita', claves: ['registro', 'bitacora', 'credencial de visitante', 'anoto', 'hora de ingreso', 'pase'] }
          ],
          evitar: [ { claves: ['pase nomas', 'vayase'], fb: 'Dejar pasar sin control o echar al visitante es inadecuado.' } ],
          modelo: 'Buenos días, por favor su identificación. Verifico con el área que lo espera, registro su ingreso en la bitácora y le entrego una credencial de visitante.'
        },
        {
          acciones: [
            { icono: '🔍', t: 'Hacer zoom y grabar el evento en la cámara 3', p: 2, fb: 'El CCTV documenta lo ocurrido como respaldo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📻', t: 'Informar por radio con mensaje breve y claro', p: 2, fb: 'La comunicación clara coordina la respuesta.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🏃', t: 'Salir corriendo solo al cerramiento', p: 1, fb: 'Aumenta tu riesgo personal.', efecto: { confianza: 2, tension: 8 } },
            { icono: '🖥️', t: 'Apagar el monitor', p: 0, fb: 'Ignorar una alerta es una falla grave.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Usa el CCTV para observar y grabar', claves: ['camara', 'zoom', 'grabo', 'grabar', 'monitoreo', 'imagen'] },
            { n: 'Comunica por radio a la central', claves: ['radio', 'central', 'informo', 'mensaje', 'reporto', 'aviso'] },
            { n: 'Verifica de forma segura', claves: ['companero', 'verificar', 'apoyo', 'sin exponerse', 'en pareja', 'distancia'] }
          ],
          evitar: [ { claves: ['seguro es un animal', 'no pasa nada'], fb: 'Descartar una alerta sin verificar es peligroso.' } ],
          modelo: 'Hago zoom y grabo la cámara 3, informo por radio a la central con un mensaje claro y pido que un compañero vaya a verificar conmigo, sin exponernos.'
        }
      ]
    }
  },

  /* ===================== VSC-04 Defensa Personal y Uso Progresivo de la Fuerza ===================== */
  {
    id: 'asig-VSC-04', cod: 'VSC-04',
    titulo: 'Un cliente agresivo en la agencia bancaria',
    asignaturas: ['VSC-04'],
    persona: { nombre: 'Sgto. (r) Wilson Tapuy', rol: 'Instructor de defensa personal y uso de la fuerza', avatar: '🧔🏽‍♂️', pitch: 0.85 },
    contexto: 'En una práctica simulada en una agencia bancaria, el instructor interpreta a un cliente muy alterado porque no le entregan su dinero. Debes aplicar el uso progresivo de la fuerza y la autoprotección.',
    objetivo: 'Aplicar los niveles de uso de la fuerza (presencia, verbalización, control físico), sus principios y la autoprotección.',
    pasos: [
      { dice: '¡Quiero mi plata ahora mismo! ¡Ustedes son unos ladrones! (Golpea el mostrador y se acerca a ti gritando.)', opciones: [
          { t: 'Mantengo una distancia de seguridad, postura estable con las manos visibles y abiertas, y le hablo con voz firme y calmada para que baje el tono.', p: 2, r: 'Está bien… pero que me atiendan.', fb: 'Presencia y verbalización: los primeros niveles del uso progresivo, con autoprotección.' },
          { t: 'Le grito más fuerte que él para que se calle.', p: 1, r: '¡A mí nadie me grita!', fb: 'Elevar la voz sin control escala el conflicto.' },
          { t: 'Lo empujo hacia la salida antes de que haga algo.', p: 0, r: '¡Me agredió!', fb: 'Usar la fuerza sin que exista agresión física es desproporcionado.' } ] },
      { dice: '(El cliente te empuja con fuerza y trata de agarrarte del chaleco.)', opciones: [
          { t: 'Me protejo, aplico una técnica básica de liberación sin golpear, recupero la distancia, pido apoyo por radio y lo controlo solo lo necesario hasta que llegue la Policía.', p: 2, r: '(El cliente se detiene y retrocede.)', fb: 'Ante una agresión física se usa la fuerza mínima necesaria para neutralizarla y protegerse.' },
          { t: 'Me retiro corriendo y lo dejo solo con los clientes.', p: 1, r: '(Los clientes se asustan.)', fb: 'Te proteges, pero dejas a terceros en riesgo y sin aviso.' },
          { t: 'Lo golpeo varias veces hasta que caiga.', p: 0, r: '(Queda lesionado.)', fb: 'Es un uso excesivo de la fuerza que genera responsabilidad penal.' } ] },
      { dice: 'Bien. Ahora explícame: ¿en qué principios basaste tu actuación?', opciones: [
          { t: 'En la legalidad, la necesidad y la proporcionalidad: usé solo el nivel de fuerza que la conducta exigía, bajé apenas cesó la agresión y lo registré en el parte.', p: 2, r: 'Correcto. Eso te protege a ti y a él.', fb: 'La fuerza se usa conforme a la ley, solo si es necesaria, en proporción a la amenaza y se documenta.' },
          { t: 'En que tenía que mostrar autoridad.', p: 1, r: 'La autoridad no justifica la fuerza.', fb: 'La autoridad se ejerce con base en principios, no en imposición.' },
          { t: 'En que si me empuja, tengo derecho a devolverle el doble.', p: 0, r: 'Eso es venganza, no defensa.', fb: 'La defensa personal no es castigo.' } ] }
    ],
    vivo: {
      lugar: 'Agencia bancaria simulada, aula práctica del ISTCY', fondo: 'oficina',
      inicio: { confianza: 30, tension: 80 },
      pasos: [
        {
          acciones: [
            { icono: '↔️', t: 'Retroceder un paso y mantener distancia', p: 2, fb: 'La distancia de seguridad da tiempo de reacción.', efecto: { confianza: 4, tension: -6 } },
            { icono: '🖐️', t: 'Mostrar las manos abiertas y visibles', p: 2, fb: 'Las manos visibles transmiten calma y permiten protegerse.', efecto: { confianza: 6, tension: -8 } },
            { icono: '📢', t: 'Gritarle más fuerte que él', p: 1, fb: 'Escala el conflicto.', efecto: { confianza: -4, tension: 10 } },
            { icono: '💥', t: 'Empujarlo hacia la salida', p: 0, fb: 'Fuerza desproporcionada sin agresión física.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Verbalización calmada y firme', claves: ['calm', 'tranquilo', 'baje la voz', 'le pido', 'por favor', 'vamos a resolver', 'le escucho'] },
            { n: 'Distancia y postura de seguridad', claves: ['distancia', 'espacio', 'postura', 'manos visibles', 'no se acerque', 'un paso atras'] },
            { n: 'Ofrece una salida al conflicto', claves: ['le van a atender', 'solucion', 'resolver', 'ayudarle', 'gerente', 'atencion'] }
          ],
          evitar: [ { claves: ['callese', 'lo saco a empujones'], fb: 'La agresión verbal o física escala el conflicto.' } ],
          modelo: 'Señor, le pido que mantenga la distancia y baje la voz; estoy tranquilo y le escucho. Vamos a resolver esto: el gerente le va a atender.'
        },
        {
          acciones: [
            { icono: '🛡️', t: 'Cubrirse y liberarse del agarre sin golpear', p: 2, fb: 'La liberación protege sin causar daño innecesario.', efecto: { confianza: 4, tension: -6 } },
            { icono: '📻', t: 'Pedir apoyo por radio', p: 2, fb: 'El apoyo reduce el riesgo para todos.', efecto: { confianza: 4, tension: -4 } },
            { icono: '🏃', t: 'Huir y dejar solos a los clientes', p: 1, fb: 'Terceros quedan en riesgo.', efecto: { confianza: -6, tension: 8 } },
            { icono: '👊', t: 'Golpearlo varias veces', p: 0, fb: 'Uso excesivo de la fuerza.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Se protege y se libera', claves: ['me protejo', 'protegerme', 'liberarme', 'me libero', 'suelte', 'cubrirme', 'defens'] },
            { n: 'Usa solo la fuerza necesaria', claves: ['minima', 'solo lo necesario', 'proporcional', 'sin golpear', 'controlar', 'sin lastimar'] },
            { n: 'Pide apoyo y avisa a la Policía', claves: ['apoyo', 'radio', 'policia', 'ecu 911', 'refuerzo', 'companero'] }
          ],
          evitar: [ { claves: ['lo golpeo', 'le doy su merecido', 'le devuelvo'], fb: 'La defensa no es castigo.' } ],
          modelo: 'Suelte, señor. Me protejo y me libero sin golpear, uso solo la fuerza necesaria para controlarlo y pido apoyo por radio para que venga la Policía.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Señalar los tres principios en la pizarra', p: 2, fb: 'Legalidad, necesidad y proporcionalidad sustentan la actuación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📝', t: 'Mostrar el parte de uso de la fuerza', p: 2, fb: 'Documentar el uso de la fuerza es obligación y respaldo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👮', t: 'Decir que actuaste para imponer autoridad', p: 1, fb: 'La autoridad no justifica la fuerza.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🔁', t: 'Decir que devolviste el empujón al doble', p: 0, fb: 'Es venganza, no defensa.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Legalidad', claves: ['legalidad', 'la ley', 'legal', 'normativa', 'conforme a la ley'] },
            { n: 'Necesidad y proporcionalidad', claves: ['necesidad', 'necesari', 'proporcional', 'nivel de fuerza', 'segun la amenaza', 'uso progresivo'] },
            { n: 'Desescala y documenta', claves: ['baje', 'ceso', 'deje de usar', 'registr', 'parte', 'documento', 'informe'] }
          ],
          evitar: [ { claves: ['el doble', 'se lo merecia'], fb: 'La fuerza no es un castigo.' } ],
          modelo: 'Me basé en la legalidad, la necesidad y la proporcionalidad: usé solo el nivel de fuerza que exigía su conducta, dejé de usarla cuando cesó la agresión y lo registré en el parte.'
        }
      ]
    }
  },

  /* ===================== VSC-05 Protocolos y Procedimientos de Seguridad Ciudadana I ===================== */
  {
    id: 'asig-VSC-05', cod: 'VSC-05',
    titulo: 'Relevo de turno y alarma en un local cerrado',
    asignaturas: ['VSC-05'],
    persona: { nombre: 'Luis Shiguango', rol: 'Vigilante del turno saliente', avatar: '👨🏽', pitch: 1.0 },
    contexto: 'Recibes el puesto de vigilancia de un centro comercial a las 22:00. Minutos después se activa la alarma de un local cerrado. Debes aplicar los protocolos básicos de relevo, verificación y registro.',
    objetivo: 'Aplicar protocolos básicos: relevo con consignas, verificación de alarmas, comunicación con el ECU 911 y redacción del parte de novedades.',
    pasos: [
      { dice: 'Ya me voy, todo tranquilo. Ahí tienes las llaves.', opciones: [
          { t: 'Antes de que se vaya, reviso con él el libro de novedades, las consignas vigentes, el estado del equipo (radio, linterna, botiquín) y firmamos el relevo.', p: 2, r: 'Tienes razón: hay una consigna nueva sobre el local 12.', fb: 'El relevo formal garantiza la continuidad del servicio y la responsabilidad de cada turno.' },
          { t: 'Recibo las llaves y le pregunto si pasó algo.', p: 1, r: 'Nada importante.', fb: 'Una pregunta verbal no reemplaza la revisión del libro y del equipo.' },
          { t: 'Le digo que se vaya y me pongo a ver videos en el celular.', p: 0, r: 'Chao.', fb: 'Un relevo sin verificación y la distracción ponen en riesgo el servicio.' } ] },
      { dice: '(Suena la alarma del local 12, que está cerrado y a oscuras.)', opciones: [
          { t: 'Informo a la central, reviso las cámaras, me acerco con precaución sin entrar solo y, si hay indicios de intrusión, llamo al ECU 911 y aíslo el área.', p: 2, r: '(La central confirma que envía apoyo.)', fb: 'Verificar con seguridad y coordinar es el protocolo ante una alarma.' },
          { t: 'Apago la alarma y sigo mi ronda.', p: 1, r: '(La alarma deja de sonar.)', fb: 'Apagarla sin verificar puede ocultar una intrusión real.' },
          { t: 'Abro el local y entro solo con la linterna.', p: 0, r: '(Escuchas un ruido adentro…)', fb: 'Entrar solo a un lugar posiblemente ocupado expone tu vida.' } ] },
      { dice: '(Era una falla del sensor.) Ahora te toca registrar la novedad. ¿Qué escribes?', opciones: [
          { t: 'Fecha, hora, lugar, lo que ocurrió, a quién informé, qué verifiqué, el resultado y mi firma, de forma objetiva y sin opiniones.', p: 2, r: 'Así el administrador sabrá exactamente qué pasó.', fb: 'El parte de novedades sigue una estructura objetiva y completa.' },
          { t: 'Escribo «sonó la alarma, todo bien».', p: 1, r: 'Muy poco detalle.', fb: 'Un registro incompleto no sirve de respaldo.' },
          { t: 'No registro nada porque fue una falsa alarma.', p: 0, r: '¿Y si mañana pasa algo?', fb: 'Toda novedad, incluso una falla, debe registrarse.' } ] }
    ],
    vivo: {
      lugar: 'Puesto de vigilancia de un centro comercial en Puyo', fondo: 'oficina',
      inicio: { confianza: 55, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📖', t: 'Revisar juntos el libro de novedades', p: 2, fb: 'El libro informa lo ocurrido y lo pendiente.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔦', t: 'Probar la radio y la linterna', p: 2, fb: 'El equipo debe funcionar antes de empezar.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔑', t: 'Recibir solo las llaves', p: 1, fb: 'El relevo queda incompleto.', efecto: { confianza: 2, tension: 2 } },
            { icono: '📱', t: 'Ponerse a ver videos en el celular', p: 0, fb: 'La distracción pone en riesgo el servicio.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Revisa el libro de novedades', claves: ['libro de novedades', 'novedades', 'bitacora', 'lo que paso', 'pendiente', 'registro'] },
            { n: 'Verifica consignas y equipo', claves: ['consigna', 'radio', 'linterna', 'botiquin', 'equipo', 'llaves'] },
            { n: 'Formaliza el relevo', claves: ['firm', 'relevo', 'entrega', 'recepcion', 'acta', 'constancia'] }
          ],
          evitar: [ { claves: ['ya vete', 'no hace falta revisar'], fb: 'El relevo debe ser formal.' } ],
          modelo: 'Luis, antes de que te vayas revisemos juntos el libro de novedades y las consignas, probemos la radio y la linterna, y firmemos el relevo.'
        },
        {
          acciones: [
            { icono: '📻', t: 'Informar a la central por radio', p: 2, fb: 'La central coordina el apoyo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📹', t: 'Revisar la cámara del pasillo del local 12', p: 2, fb: 'Las cámaras permiten verificar sin exponerse.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔕', t: 'Apagar la alarma sin verificar', p: 1, fb: 'Puede ocultar una intrusión.', efecto: { confianza: 0, tension: 4 } },
            { icono: '🚪', t: 'Abrir el local y entrar solo', p: 0, fb: 'Expone tu vida.', efecto: { confianza: -10, tension: 15 } }
          ],
          conceptos: [
            { n: 'Informa a la central', claves: ['central', 'radio', 'informo', 'reporto', 'aviso', 'supervisor'] },
            { n: 'Verifica con seguridad', claves: ['camaras', 'verific', 'precaucion', 'sin entrar solo', 'no entro solo', 'distancia', 'apoyo'] },
            { n: 'Activa el ECU 911 si hay indicios', claves: ['911', 'ecu', 'policia', 'indicios', 'intrusion', 'aislar'] }
          ],
          evitar: [ { claves: ['entro solo', 'apago y sigo'], fb: 'No entres solo ni ignores la alarma.' } ],
          modelo: 'Informo a la central por radio, reviso las cámaras y me acerco con precaución, sin entrar solo. Si hay indicios de intrusión, llamo al ECU 911 y aíslo el área.'
        },
        {
          acciones: [
            { icono: '🕙', t: 'Anotar fecha, hora y lugar exactos', p: 2, fb: 'Son datos esenciales del parte.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧾', t: 'Describir verificación, aviso y resultado', p: 2, fb: 'El parte debe reflejar las acciones tomadas.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✏️', t: 'Escribir solo «todo bien»', p: 1, fb: 'Muy incompleto.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🚫', t: 'No registrar la falsa alarma', p: 0, fb: 'Toda novedad se registra.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Datos de tiempo y lugar', claves: ['fecha', 'hora', 'lugar', 'local 12', 'ubicacion'] },
            { n: 'Hechos y acciones realizadas', claves: ['que ocurrio', 'hechos', 'verifique', 'informe a', 'acciones', 'resultado', 'falla del sensor'] },
            { n: 'Redacción objetiva y firmada', claves: ['objetiv', 'sin opiniones', 'firma', 'claro', 'preciso', 'ordenado'] }
          ],
          evitar: [ { claves: ['no registro', 'no vale la pena'], fb: 'Toda novedad debe constar en el parte.' } ],
          modelo: 'Registro la fecha, la hora y el lugar; qué ocurrió, a quién informé, qué verifiqué y el resultado, que fue una falla del sensor. Lo escribo de forma objetiva, sin opiniones, y firmo.'
        }
      ]
    }
  },

  /* ===================== VSC-06 Procesos Comunitarios de Seguridad ===================== */
  {
    id: 'asig-VSC-06', cod: 'VSC-06',
    titulo: 'Ruta de alerta para el Mercado Mariscal',
    asignaturas: ['VSC-06'],
    persona: { nombre: 'Sra. Inés Grefa', rol: 'Presidenta de la asociación de comerciantes del mercado', avatar: '👩🏽‍🦰', pitch: 1.15 },
    contexto: 'La asociación de comerciantes del mercado pide apoyo al proyecto de vinculación del ISTCY para mejorar la seguridad. Debes organizar la intervención comunitaria paso a paso.',
    objetivo: 'Aplicar las fases de un proceso comunitario de seguridad: identificación de necesidades, recorrido de reconocimiento y ruta de alerta con materiales informativos.',
    pasos: [
      { dice: 'Queremos que vengan a dar una charla de seguridad el sábado. ¿Qué tema les damos?', opciones: [
          { t: 'Propongo primero reunirnos con los comerciantes para identificar sus necesidades y problemas principales, y luego planificar la charla con objetivos y responsables.', p: 2, r: 'Buena idea, así hablamos de lo que de verdad nos pasa.', fb: 'La planificación comunitaria parte de identificar necesidades con los actores.' },
          { t: 'Damos la charla general que usamos en otros lugares.', p: 1, r: 'Bueno, algo es algo.', fb: 'Una charla genérica puede no responder a la realidad del mercado.' },
          { t: 'Les digo que la seguridad es asunto de la Policía, no de los comerciantes.', p: 0, r: 'Entonces no nos ayuda.', fb: 'La seguridad ciudadana es corresponsabilidad.' } ] },
      { dice: 'Nos dicen que roban en los pasillos del fondo. ¿Cómo lo confirmamos?', opciones: [
          { t: 'Hacemos un recorrido de reconocimiento con algunos comerciantes y una ficha de observación: iluminación, puntos ciegos, accesos, horarios de mayor afluencia.', p: 2, r: 'Así vemos todos lo mismo.', fb: 'El recorrido participativo con ficha identifica factores de riesgo concretos.' },
          { t: 'Ponemos cámaras en el fondo sin revisar nada más.', p: 1, r: '¿Y quién las mira?', fb: 'La tecnología sin diagnóstico puede no resolver el problema.' },
          { t: 'Señalamos a los cargadores del fondo como sospechosos.', p: 0, r: '(Los cargadores se molestan.)', fb: 'Señalar a un grupo sin pruebas es estigmatizante.' } ] },
      { dice: '¿Qué dejamos a los comerciantes al final?', opciones: [
          { t: 'Una ruta de alerta clara: a quién avisar primero, el 911, la UPC más cercana y un grupo de comunicación, impresa en un afiche y explicada en la charla; y evaluamos en un mes.', p: 2, r: '¡Eso lo pegamos en cada puesto!', fb: 'Los materiales informativos y las rutas de alerta fortalecen la prevención; la evaluación retroalimenta el proyecto.' },
          { t: 'Un número de teléfono anotado en una pizarra.', p: 1, r: 'Bueno, pero se borra.', fb: 'Es útil, pero insuficiente y sin seguimiento.' },
          { t: 'Un grupo de vecinos que patrulle con palos.', p: 0, r: '(Algunos se asustan.)', fb: 'La justicia por mano propia es ilegal y peligrosa.' } ] }
    ],
    vivo: {
      lugar: 'Mercado Mariscal de Puyo, pasillo de frutas', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗣️', t: 'Convocar una reunión breve con los comerciantes', p: 2, fb: 'La participación permite identificar necesidades reales.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🗒️', t: 'Anotar los problemas que mencionan', p: 2, fb: 'Registrar las necesidades es la base de la planificación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📄', t: 'Sacar la charla genérica de otro lugar', p: 1, fb: 'Puede no responder a su realidad.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🚓', t: 'Decir que es tarea solo de la Policía', p: 0, fb: 'La seguridad es corresponsabilidad.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Identifica necesidades con la comunidad', claves: ['necesidades', 'problemas', 'escuchar', 'reunion', 'identificar', 'diagnostico'] },
            { n: 'Planifica objetivos y responsables', claves: ['planific', 'objetivo', 'responsable', 'cronograma', 'actividades', 'fecha'] },
            { n: 'Promueve la participación', claves: ['comerciantes', 'participa', 'entre todos', 'juntos', 'comunidad', 'corresponsab'] }
          ],
          evitar: [ { claves: ['solo de la policia', 'no es asunto de ustedes'], fb: 'La seguridad es corresponsabilidad.' } ],
          modelo: 'Primero hagamos una reunión con los comerciantes para identificar sus necesidades y problemas. Con eso planificamos la charla con objetivos, responsables y fecha, entre todos.'
        },
        {
          acciones: [
            { icono: '🚶‍♀️', t: 'Recorrer los pasillos con tres comerciantes', p: 2, fb: 'El recorrido participativo suma miradas.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📋', t: 'Llenar la ficha de observación', p: 2, fb: 'La ficha registra factores de riesgo de forma ordenada.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📹', t: 'Pedir cámaras sin revisar nada más', p: 1, fb: 'Sin diagnóstico la medida puede fallar.', efecto: { confianza: 0, tension: 2 } },
            { icono: '☝️', t: 'Señalar a los cargadores como sospechosos', p: 0, fb: 'Estigmatiza a un grupo sin pruebas.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Recorrido de reconocimiento', claves: ['recorrido', 'reconocimiento', 'recorrer', 'caminar', 'visitar', 'inspeccion'] },
            { n: 'Usa una ficha de observación', claves: ['ficha', 'observacion', 'registrar', 'anotar', 'formato', 'lista'] },
            { n: 'Identifica factores de riesgo del entorno', claves: ['iluminacion', 'puntos ciegos', 'accesos', 'horarios', 'afluencia', 'riesgo'] }
          ],
          evitar: [ { claves: ['son los cargadores', 'esos son los ladrones'], fb: 'No señales a grupos sin pruebas.' } ],
          modelo: 'Hagamos un recorrido de reconocimiento con algunos comerciantes y una ficha de observación para registrar la iluminación, los puntos ciegos, los accesos y los horarios de mayor afluencia.'
        },
        {
          acciones: [
            { icono: '🖼️', t: 'Diseñar un afiche con la ruta de alerta', p: 2, fb: 'Los materiales informativos hacen visible la ruta.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📅', t: 'Fijar una evaluación en un mes', p: 2, fb: 'La evaluación permite mejorar el proyecto.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧽', t: 'Anotar un número en la pizarra', p: 1, fb: 'Insuficiente y sin seguimiento.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🪵', t: 'Proponer vecinos que patrullen con palos', p: 0, fb: 'Es ilegal y peligroso.', efecto: { confianza: -10, tension: 15 } }
          ],
          conceptos: [
            { n: 'Construye una ruta de alerta', claves: ['ruta de alerta', 'a quien avisar', '911', 'upc', 'grupo de comunicacion', 'arbol de llamadas'] },
            { n: 'Elabora material informativo', claves: ['afiche', 'material', 'folleto', 'cartel', 'impreso', 'charla'] },
            { n: 'Evalúa la intervención', claves: ['evaluar', 'evaluacion', 'en un mes', 'seguimiento', 'resultados', 'mejorar'] }
          ],
          evitar: [ { claves: ['con palos', 'justicia por mano propia'], fb: 'La justicia por mano propia es ilegal.' } ],
          modelo: 'Les dejamos una ruta de alerta: a quién avisar primero, el 911, la UPC más cercana y un grupo de comunicación, impresa en un afiche y explicada en la charla. En un mes hacemos la evaluación.'
        }
      ]
    }
  }
]);
