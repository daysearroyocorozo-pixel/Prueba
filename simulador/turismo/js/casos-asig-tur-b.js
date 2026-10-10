/* Prácticas por asignatura – Gestión de Operaciones Turísticas (PAO 3–4) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  {
    id: 'asig-GOT-B-304', cod: 'GOT-B-304',
    titulo: 'Asesorar a un emprendedor que abrirá un hostal',
    asignaturas: ['GOT-B-304'],
    persona: { nombre: 'Kevin Gualinga', rol: 'Emprendedor que abrirá un hostal en Puyo', avatar: '🧑🏽', pitch: 1.0 },
    contexto: 'Un joven quiere abrir un hostal de 8 habitaciones y pregunta qué necesita para operar legalmente y qué obligaciones tendrá con los turistas.',
    objetivo: 'Aplicar en términos generales la normativa nacional que regula a los prestadores de servicios turísticos.',
    pasos: [
      { dice: '¿Qué papeles necesito para abrir mi hostal?', opciones: [
        { t: 'En términos generales: el RUC, el registro de turismo ante el Ministerio de Turismo como prestador de alojamiento, la licencia anual de funcionamiento del GAD municipal y los permisos de bomberos y uso de suelo.', p: 2, r: 'Ahora tengo la lista clara.', fb: 'Los prestadores de servicios turísticos deben registrarse ante la autoridad de turismo y contar con la licencia local; se recomienda verificar requisitos vigentes.' },
        { t: 'Con el RUC basta.', p: 1, r: '¿Seguro?', fb: 'El RUC es tributario; falta el registro turístico y la licencia local.' },
        { t: 'Ábrelo y si vienen a controlar, lo arreglas.', p: 0, r: '¿Y si me clausuran?', fb: 'Operar sin registro ni licencia expone a sanciones y clausura.' }
      ]},
      { dice: '¿Qué obligaciones tendré con los huéspedes?', opciones: [
        { t: 'Cumplir lo ofrecido, exhibir tarifas claras, entregar factura, garantizar seguridad e higiene y atender reclamos, respetando los derechos del consumidor.', p: 2, r: 'Entendido.', fb: 'La normativa de defensa del consumidor y la turística exigen información veraz y servicios seguros.' },
        { t: 'Solo dar la llave.', p: 0, r: '…', fb: 'El prestador tiene obligaciones de información, seguridad y calidad.' },
        { t: 'Cobrar por adelantado y ya.', p: 1, r: 'Hmm.', fb: 'Cobrar es legítimo, pero no cubre las demás obligaciones.' }
      ]},
      { dice: 'Un amigo me dice que puedo ofrecer también tours sin registrarme como operadora.', opciones: [
        { t: 'Le explico que cada actividad turística requiere su propio registro; puede aliarse con una operadora registrada o registrarse para esa actividad.', p: 2, r: 'Mejor hago una alianza.', fb: 'Cada tipo de prestador tiene requisitos propios; operar sin registro es ilegal.' },
        { t: 'Que lo haga, nadie se entera.', p: 0, r: '…', fb: 'Operar tours sin registro pone en riesgo a turistas y al negocio.' },
        { t: 'No lo sé, que pregunte.', p: 1, r: '…', fb: 'Se pierde la oportunidad de orientar con la normativa.' }
      ]}
    ],
    vivo: {
      lugar: 'Oficina de asesoría de la Cámara de Turismo de Pastaza', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📋', t: 'Entregarle una lista de requisitos para alojamiento', p: 2, fb: 'Un listado ordenado facilita el cumplimiento.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🌐', t: 'Mostrar el portal oficial del Ministerio de Turismo', p: 2, fb: 'Remitir a fuentes oficiales asegura información vigente.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🤫', t: 'Aconsejarle abrir y legalizar después', p: 0, fb: 'Operar sin registro expone a sanciones y clausura.', efecto: { confianza: 4, tension: 6 } }
          ],
          conceptos: [
            { n: 'Menciona el registro de turismo', claves: ['registro de turismo', 'registro', 'ministerio de turismo', 'prestador', 'catastro'] },
            { n: 'Menciona la licencia del GAD', claves: ['licencia', 'gad', 'municipio', 'funcionamiento', 'permiso municipal'] },
            { n: 'Incluye otros permisos', claves: ['ruc', 'bomberos', 'uso de suelo', 'permisos', 'sri'] }
          ],
          evitar: [ { claves: ['abrelo nomas', 'despues legalizas'], fb: 'Cumple la normativa antes de operar.' } ],
          modelo: 'En términos generales necesitas el RUC, el registro de turismo ante el Ministerio de Turismo como prestador de alojamiento, la licencia de funcionamiento del GAD municipal y los permisos de bomberos y uso de suelo.'
        },
        {
          acciones: [
            { icono: '🏷️', t: 'Mostrarle un modelo de tarifario visible', p: 2, fb: 'La información de precios clara es un derecho del consumidor.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🧾', t: 'Explicarle la emisión de facturas', p: 2, fb: 'La factura respalda la transacción y es obligatoria.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🔑', t: 'Decirle que solo debe entregar la llave', p: 0, fb: 'El prestador tiene obligaciones de información, seguridad y calidad.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Información veraz y tarifas claras', claves: ['tarifa', 'precio', 'informacion', 'veraz', 'exhibir', 'claro'] },
            { n: 'Seguridad e higiene', claves: ['seguridad', 'higiene', 'limpieza', 'extintor', 'salubridad'] },
            { n: 'Respeto a los derechos del consumidor', claves: ['consumidor', 'derechos', 'reclamo', 'factura', 'cumplir lo ofrecido'] }
          ],
          evitar: [ { claves: ['solo la llave', 'no tienes obligaciones'], fb: 'El prestador tiene obligaciones con el huésped.' } ],
          modelo: 'Debes cumplir lo ofrecido, exhibir tarifas claras con información veraz, entregar factura, garantizar seguridad e higiene y atender los reclamos, respetando los derechos del consumidor.'
        },
        {
          acciones: [
            { icono: '🤝', t: 'Presentarle una operadora registrada para aliarse', p: 2, fb: 'La alianza es una vía legal para ofrecer tours.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📑', t: 'Señalar los requisitos para operadoras', p: 2, fb: 'Cada tipo de prestador tiene requisitos propios.', efecto: { confianza: 6, tension: -2 } },
            { icono: '😉', t: 'Decirle que nadie se entera', p: 0, fb: 'Operar tours sin registro es ilegal y riesgoso.', efecto: { confianza: 2, tension: 8 } }
          ],
          conceptos: [
            { n: 'Explica que cada actividad requiere registro', claves: ['cada actividad', 'registro', 'operadora', 'propio', 'requisitos'] },
            { n: 'Propone una alternativa legal', claves: ['alianza', 'aliarte', 'aliarse', 'registrarte', 'convenio', 'legal'] },
            { n: 'Advierte el riesgo', claves: ['ilegal', 'sancion', 'riesgo', 'clausura', 'seguro', 'multa'] }
          ],
          evitar: [ { claves: ['nadie se entera', 'hazlo igual'], fb: 'Orienta siempre hacia la legalidad.' } ],
          modelo: 'Cada actividad turística requiere su propio registro: ofrecer tours sin ser operadora es ilegal y puede traer sanciones. Lo mejor es una alianza con una operadora registrada o registrarte para esa actividad.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-305', cod: 'GOT-P-305',
    titulo: 'Plan estratégico para una operadora',
    asignaturas: ['GOT-P-305'],
    persona: { nombre: 'Lic. Fernando', rol: 'Socio fundador de una operadora de Pastaza', avatar: '👨🏻', pitch: 0.9 },
    contexto: 'La operadora crece sin rumbo. El socio te pide liderar el plan estratégico: misión y visión, análisis DOFA, estrategias e indicadores.',
    objetivo: 'Aplicar la misión, visión, valores, el análisis estratégico DOFA, la formulación de estrategias y el control con indicadores.',
    pasos: [
      { dice: '¿Para qué necesitamos misión y visión?', opciones: [
        { t: 'La misión dice qué hacemos, para quién y cómo; la visión, a dónde queremos llegar; y los valores guían cómo actuamos. Las redactamos con el equipo.', p: 2, r: 'Tiene sentido.', fb: 'Misión, visión y valores son el punto de partida de la estrategia.' },
        { t: 'Para ponerlas en un cuadro bonito.', p: 0, r: '…', fb: 'Sin uso real no orientan las decisiones.' },
        { t: 'Las copiamos de otra empresa.', p: 1, r: '¿Nos representan?', fb: 'Deben reflejar la identidad propia.' }
      ]},
      { dice: '¿Cómo analizamos nuestra situación?', opciones: [
        { t: 'Con una matriz DOFA: fortalezas y debilidades internas, oportunidades y amenazas externas, como la demanda de turismo de naturaleza o la competencia informal.', p: 2, r: 'Claro.', fb: 'El análisis interno y externo sintetizado en la DOFA identifica puntos estratégicos.' },
        { t: 'Solo vemos lo que hacemos bien.', p: 1, r: '¿Y los riesgos?', fb: 'Un análisis incompleto sesga las decisiones.' },
        { t: 'No hace falta, ya conocemos el negocio.', p: 0, r: '…', fb: 'Sin análisis la estrategia es intuición.' }
      ]},
      { dice: '¿Y cómo sabremos si funciona?', opciones: [
        { t: 'Definimos estrategias e iniciativas con indicadores y metas: por ejemplo, subir la satisfacción al 90 % y las ventas en línea un 20 %, con seguimiento trimestral.', p: 2, r: '¡Medible!', fb: 'El control estratégico requiere indicadores, metas e iniciativas con seguimiento.' },
        { t: 'Si al final del año hay dinero, funcionó.', p: 1, r: 'Muy general.', fb: 'Un solo resultado final no permite corregir a tiempo.' },
        { t: 'Lo sabremos por intuición.', p: 0, r: '…', fb: 'La gestión estratégica se mide.' }
      ]}
    ],
    vivo: {
      lugar: 'Sala de la operadora con un papelógrafo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🗣️', t: 'Convocar al equipo a un taller de misión y visión', p: 2, fb: 'La participación genera compromiso con la estrategia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✍️', t: 'Escribir en el papelógrafo qué, para quién y cómo', p: 2, fb: 'Esas preguntas estructuran la misión.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📋', t: 'Copiar la misión de una empresa famosa', p: 0, fb: 'Debe reflejar la identidad propia.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Define la misión', claves: ['mision', 'que hacemos', 'para quien', 'razon de ser', 'proposito'] },
            { n: 'Define la visión', claves: ['vision', 'a donde', 'futuro', 'llegar', 'cinco anos'] },
            { n: 'Incluye valores y participación', claves: ['valores', 'equipo', 'juntos', 'participa', 'principios'] }
          ],
          evitar: [ { claves: ['copiamos', 'cuadro bonito'], fb: 'La estrategia debe ser propia y útil.' } ],
          modelo: 'La misión dice qué hacemos, para quién y cómo; la visión, a dónde queremos llegar en cinco años; y los valores guían cómo actuamos. Las redactaremos juntos con el equipo.'
        },
        {
          acciones: [
            { icono: '🔲', t: 'Dibujar la matriz DOFA en cuatro cuadrantes', p: 2, fb: 'La matriz sintetiza el análisis interno y externo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📰', t: 'Revisar datos de demanda y competencia', p: 2, fb: 'El análisis externo requiere información del entorno.', efecto: { confianza: 6, tension: -2 } },
            { icono: '😎', t: 'Anotar solo las fortalezas', p: 0, fb: 'Un análisis incompleto sesga las decisiones.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa la matriz DOFA', claves: ['dofa', 'foda', 'matriz', 'swot', 'cuadrantes'] },
            { n: 'Distingue lo interno: fortalezas y debilidades', claves: ['fortaleza', 'debilidad', 'interno', 'interna', 'recursos propios'] },
            { n: 'Distingue lo externo: oportunidades y amenazas', claves: ['oportunidad', 'amenaza', 'externo', 'externa', 'competencia', 'demanda'] }
          ],
          evitar: [ { claves: ['no hace falta analizar', 'ya sabemos todo'], fb: 'Analiza antes de decidir.' } ],
          modelo: 'Usaremos una matriz DOFA: fortalezas y debilidades internas, y oportunidades y amenazas externas, como la demanda de turismo de naturaleza o la competencia informal.'
        },
        {
          acciones: [
            { icono: '🎯', t: 'Escribir metas numéricas por objetivo', p: 2, fb: 'Las metas cuantificadas permiten evaluar.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🗓️', t: 'Agendar revisiones trimestrales', p: 2, fb: 'El seguimiento periódico permite corregir a tiempo.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🔮', t: 'Confiar en la intuición sin medir', p: 0, fb: 'La gestión estratégica se mide.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Formula estrategias e iniciativas', claves: ['estrategia', 'iniciativa', 'accion', 'mapa estrategico', 'plan'] },
            { n: 'Define indicadores y metas', claves: ['indicador', 'meta', 'noventa', '90', 'veinte', '20', 'por ciento'] },
            { n: 'Prevé el seguimiento', claves: ['seguimiento', 'trimestral', 'control', 'revision', 'monitoreo'] }
          ],
          evitar: [ { claves: ['por intuicion', 'sin medir'], fb: 'Mide los resultados.' } ],
          modelo: 'Definimos estrategias e iniciativas con indicadores y metas: subir la satisfacción al 90 por ciento y las ventas en línea un 20 por ciento, con seguimiento trimestral.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-306', cod: 'GOT-P-306',
    titulo: 'Plan de marketing digital para un ecolodge',
    asignaturas: ['GOT-P-306'],
    persona: { nombre: 'Sofía', rol: 'Administradora de un ecolodge amazónico', avatar: '👩🏻‍💻', pitch: 1.15 },
    contexto: 'Un ecolodge cerca de Puyo casi no recibe reservas en línea. Te piden un plan de marketing digital con la mezcla de marketing y su medición.',
    objetivo: 'Aplicar las fases del plan de marketing turístico, la mezcla producto-plaza-precio-promoción y la medición en canales digitales.',
    pasos: [
      { dice: 'Quiero publicar en redes ya. ¿Por dónde empezamos?', opciones: [
        { t: 'Por el plan: análisis de la situación, objetivos medibles (por ejemplo, 30 reservas en línea al mes) y definición del público objetivo antes de las tácticas.', p: 2, r: 'Primero el plan, entendido.', fb: 'El plan de marketing sigue fases: diagnóstico, objetivos, público, estrategia y control.' },
        { t: 'Publicando fotos todos los días.', p: 1, r: '¿Y si no llegan?', fb: 'Publicar sin objetivos ni público es improvisar.' },
        { t: 'Comprando seguidores.', p: 0, r: '…', fb: 'Los seguidores falsos no generan reservas y dañan la reputación.' }
      ]},
      { dice: '¿Qué comunicamos y por dónde?', opciones: [
        { t: 'Trabajamos la mezcla: producto (experiencia de selva y comunidad), precio por temporada, plaza (web propia y agencias en línea) y promoción en redes con contenido auténtico y fotos autorizadas.', p: 2, r: 'Muy completo.', fb: 'La mezcla de marketing integra producto, plaza, precio y promoción.' },
        { t: 'Solo promoción en redes.', p: 1, r: '¿Y lo demás?', fb: 'La promoción sola no corrige problemas de producto, precio o canal.' },
        { t: 'Usar fotos de otro lodge que se ven mejor.', p: 0, r: '¡Eso es engañoso!', fb: 'La publicidad engañosa vulnera derechos del consumidor y la ética.' }
      ]},
      { dice: '¿Cómo sabremos si funciona?', opciones: [
        { t: 'Con analítica: visitas a la web, tasa de conversión a reservas, costo por reserva y reseñas; revisamos mensualmente y ajustamos.', p: 2, r: 'Medible y claro.', fb: 'La analítica web y los indicadores permiten optimizar el plan.' },
        { t: 'Contando los "me gusta".', p: 1, r: '¿Y las reservas?', fb: 'Los "me gusta" no equivalen a ventas.' },
        { t: 'No medimos, confiamos.', p: 0, r: '…', fb: 'Sin medición no se puede mejorar.' }
      ]}
    ],
    vivo: {
      lugar: 'Oficina del ecolodge con la computadora', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🔎', t: 'Revisar la web y las reseñas actuales del lodge', p: 2, fb: 'El diagnóstico digital es la primera fase del plan.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎯', t: 'Escribir un objetivo numérico de reservas', p: 2, fb: 'Los objetivos medibles orientan la estrategia.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🤖', t: 'Comprar mil seguidores', p: 0, fb: 'Los seguidores falsos no generan reservas.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Parte de un plan de marketing', claves: ['plan de marketing', 'plan', 'fases', 'estrategia', 'primero'] },
            { n: 'Analiza la situación', claves: ['analisis', 'diagnostico', 'situacion', 'resenas', 'competencia'] },
            { n: 'Fija objetivos y público', claves: ['objetivo', 'treinta', '30', 'reservas', 'publico objetivo', 'segmento'] }
          ],
          evitar: [ { claves: ['comprar seguidores', 'seguidores falsos'], fb: 'Evita prácticas engañosas.' } ],
          modelo: 'Empezamos por el plan de marketing: análisis de la situación, un objetivo de 30 reservas en línea al mes y la definición del público objetivo, y después las tácticas.'
        },
        {
          acciones: [
            { icono: '📸', t: 'Programar una sesión de fotos reales con permiso', p: 2, fb: 'El contenido auténtico y autorizado genera confianza.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🛒', t: 'Activar el motor de reservas en la web propia', p: 2, fb: 'La plaza digital propia reduce comisiones.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🖼️', t: 'Descargar fotos de otro lodge para la publicidad', p: 0, fb: 'La publicidad engañosa vulnera derechos y la ética.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Define producto y precio', claves: ['producto', 'experiencia', 'precio', 'temporada', 'tarifa'] },
            { n: 'Define la plaza o canales', claves: ['plaza', 'web', 'agencias en linea', 'canal', 'motor de reservas'] },
            { n: 'Promoción auténtica y autorizada', claves: ['promocion', 'redes', 'autentic', 'autorizad', 'contenido', 'consentimiento'] }
          ],
          evitar: [ { claves: ['fotos de otro lodge', 'photoshop exagerado'], fb: 'No engañes al cliente.' } ],
          modelo: 'Trabajamos la mezcla: el producto es la experiencia de selva y comunidad, precio por temporada, plaza en la web propia y agencias en línea, y promoción en redes con contenido auténtico y fotos autorizadas.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Configurar la analítica web del sitio', p: 2, fb: 'La analítica permite medir visitas y conversiones.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🗓️', t: 'Agendar una revisión mensual de indicadores', p: 2, fb: 'Revisar y ajustar optimiza el plan.', efecto: { confianza: 6, tension: -2 } },
            { icono: '👍', t: 'Medir solo los "me gusta"', p: 1, fb: 'Los "me gusta" no equivalen a reservas.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🙈', t: 'Decidir no medir nada', p: 0, fb: 'Sin medición no se puede mejorar.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Usa analítica web', claves: ['analitica', 'visitas', 'trafico', 'web', 'google'] },
            { n: 'Mide conversión y costo', claves: ['conversion', 'reservas', 'costo por reserva', 'ventas', 'retorno'] },
            { n: 'Revisa y ajusta periódicamente', claves: ['mensual', 'revis', 'ajust', 'optimiz', 'mejorar'] }
          ],
          evitar: [ { claves: ['no medimos', 'solo likes'], fb: 'Mide resultados reales.' } ],
          modelo: 'Mediremos con analítica web las visitas, la tasa de conversión a reservas y el costo por reserva, además de las reseñas, y cada mes revisamos y ajustamos.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-307', cod: 'GOT-P-307',
    titulo: 'Menú, inocuidad y costo del plato en el restaurante',
    asignaturas: ['GOT-P-307'],
    persona: { nombre: 'Chef Byron', rol: 'Jefe de cocina del restaurante de una hostería', avatar: '👨🏽‍🍳', pitch: 0.9 },
    contexto: 'El restaurante de la hostería renueva su carta. El chef te pide apoyo con el diseño del menú, la recepción de mercadería y el costo de un plato.',
    objetivo: 'Aplicar el diseño de menús, el control de calidad en recepción y almacenamiento, y el control de costos en alimentos y bebidas.',
    pasos: [
      { dice: '¿Cómo armamos la nueva carta?', opciones: [
        { t: 'Según el público objetivo: platos amazónicos como maito y uchumanga con productos locales de temporada, opciones vegetarianas y la información de alérgenos.', p: 2, r: 'Identidad y seguridad, me gusta.', fb: 'El diseño de menús parte del público, la identidad gastronómica, la temporada y la información al cliente.' },
        { t: 'Copiamos la carta de un restaurante de Quito.', p: 1, r: '¿Y lo local?', fb: 'No aprovecha la identidad ni los productos de temporada.' },
        { t: 'Ponemos 80 platos para que haya de todo.', p: 0, r: 'Imposible de manejar.', fb: 'Una carta extensa eleva desperdicios y costos.' }
      ]},
      { dice: 'Llegó el pescado del proveedor. ¿Qué revisas?', opciones: [
        { t: 'Temperatura de llegada, olor, color y textura, fecha y empaque; lo registro y almaceno en frío aplicando primero en entrar, primero en salir.', p: 2, r: 'Así se recibe.', fb: 'El control en recepción y el almacenamiento PEPS aseguran la inocuidad.' },
        { t: 'Solo cuento las unidades.', p: 1, r: '¿Y si está dañado?', fb: 'La cantidad no garantiza calidad ni inocuidad.' },
        { t: 'Lo dejo en la mesa hasta usarlo.', p: 0, r: '¡Se va a dañar!', fb: 'Romper la cadena de frío pone en riesgo la salud.' }
      ]},
      { dice: 'El maito cuesta 3,20 dólares en ingredientes y lo vendemos a 10. ¿Está bien?', opciones: [
        { t: 'El costo de alimentos es 32 %, dentro de un rango razonable; controlamos porciones con receta estándar para mantenerlo.', p: 2, r: 'Números claros.', fb: 'Costo % = costo ÷ precio × 100 = 3,20 ÷ 10 × 100 = 32 %.' },
        { t: 'Está bien porque se vende.', p: 1, r: '¿Seguro?', fb: 'Sin calcular el porcentaje no se controla la rentabilidad.' },
        { t: 'Subimos a 20 dólares para ganar más.', p: 0, r: 'Nadie lo comprará.', fb: 'El precio debe considerar el costo y el mercado.' }
      ]}
    ],
    vivo: {
      lugar: 'Cocina del restaurante de una hostería en Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🐟', t: 'Proponer el maito de tilapia como plato estrella', p: 2, fb: 'Los platos locales dan identidad a la carta.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⚠️', t: 'Agregar íconos de alérgenos en la carta', p: 2, fb: 'Informar alérgenos protege la salud del cliente.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📜', t: 'Diseñar una carta de 80 platos', p: 0, fb: 'Una carta extensa eleva desperdicios y costos.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Diseña según el público objetivo', claves: ['publico', 'cliente', 'turistas', 'segmento', 'mercado'] },
            { n: 'Usa platos y productos locales de temporada', claves: ['maito', 'uchumanga', 'local', 'temporada', 'amazonic', 'yuca'] },
            { n: 'Informa alérgenos y opciones', claves: ['alergen', 'vegetarian', 'opciones', 'informacion', 'alergia'] }
          ],
          evitar: [ { claves: ['ochenta platos', 'de todo un poco'], fb: 'Una carta corta es más eficiente.' } ],
          modelo: 'Armamos la carta según el público de turistas: platos amazónicos como maito y uchumanga con productos locales de temporada, opciones vegetarianas e información de alérgenos.'
        },
        {
          acciones: [
            { icono: '🌡️', t: 'Medir la temperatura del pescado con termómetro', p: 2, fb: 'La temperatura verifica la cadena de frío.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏷️', t: 'Etiquetar con fecha y ubicar al fondo lo nuevo', p: 2, fb: 'El sistema PEPS reduce pérdidas.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🪑', t: 'Dejar la caja sobre la mesa hasta mediodía', p: 0, fb: 'Romper la cadena de frío pone en riesgo la salud.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Revisa la calidad en la recepción', claves: ['temperatura', 'olor', 'color', 'textura', 'fecha', 'empaque'] },
            { n: 'Registra la recepción', claves: ['registr', 'anoto', 'formato', 'control', 'factura'] },
            { n: 'Almacena en frío con PEPS', claves: ['frio', 'refriger', 'congel', 'peps', 'primero en entrar', 'cadena de frio'] }
          ],
          evitar: [ { claves: ['en la mesa', 'temperatura ambiente'], fb: 'Mantén la cadena de frío.' } ],
          modelo: 'Reviso la temperatura, el olor, el color, la textura, la fecha y el empaque; registro la recepción y lo almaceno en frío aplicando primero en entrar, primero en salir.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Calcular el porcentaje de costo del plato', p: 2, fb: 'El costo porcentual es el indicador base en A&B.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⚖️', t: 'Pesar la porción según la receta estándar', p: 2, fb: 'Controlar porciones mantiene el costo.', efecto: { confianza: 6, tension: -2 } },
            { icono: '💲', t: 'Subir el precio a 20 dólares sin analizar', p: 0, fb: 'El precio debe considerar costo y mercado.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Calcula el costo porcentual', claves: ['32', 'treinta y dos', 'por ciento', 'costo de alimentos', 'food cost'] },
            { n: 'Explica la fórmula', claves: ['dividido', 'entre', 'por cien', 'costo sobre precio', 'tres veinte'] },
            { n: 'Propone controlar porciones', claves: ['receta estandar', 'porcion', 'control', 'pesar', 'gramaje'] }
          ],
          evitar: [ { claves: ['subimos a veinte', 'da igual el costo'], fb: 'Fija precios con análisis de costos.' } ],
          modelo: 'El costo de alimentos es 3,20 dividido entre 10, por cien: 32 por ciento, un rango razonable. Lo mantenemos controlando la porción con receta estándar.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-308', cod: 'GOT-P-308',
    titulo: 'Registrar ventas y leer el estado de resultados',
    asignaturas: ['GOT-P-308'],
    persona: { nombre: 'Sra. Elena', rol: 'Propietaria de una pequeña agencia de viajes', avatar: '👩🏼‍🦳', pitch: 1.05 },
    contexto: 'La propietaria no sabe si su agencia gana o pierde dinero. Te pide registrar las operaciones y explicarle el estado de resultados del mes.',
    objetivo: 'Aplicar el proceso contable, el registro de operaciones y la formulación de estados financieros básicos.',
    pasos: [
      { dice: 'Vendí un paquete en 800 dólares y me pagaron por transferencia. ¿Cómo lo registro?', opciones: [
        { t: 'Con un asiento: débito a Bancos por 800 y crédito a Ingresos por ventas de servicios turísticos por 800, con la factura como respaldo.', p: 2, r: 'Ahora sí entiendo.', fb: 'Partida doble: aumenta un activo (Bancos) y se reconoce el ingreso, con su documento soporte.' },
        { t: 'Lo anoto en mi cuaderno como "entró plata".', p: 1, r: '¿Y eso sirve?', fb: 'El registro informal no permite elaborar estados financieros.' },
        { t: 'No lo registro porque ya está en el banco.', p: 0, r: '…', fb: 'Toda operación debe registrarse contablemente.' }
      ]},
      { dice: '¿Cuál es el proceso contable completo?', opciones: [
        { t: 'Documentos fuente, registro en el libro diario, mayorización, balance de comprobación, ajustes y elaboración de los estados financieros.', p: 2, r: 'Ordenado.', fb: 'Es el ciclo contable que asegura información confiable.' },
        { t: 'Solo guardar las facturas en una caja.', p: 1, r: '¿Y después?', fb: 'Guardar documentos es el inicio, no el proceso completo.' },
        { t: 'El contador ve eso, no me interesa.', p: 0, r: '…', fb: 'La gerencia debe comprender su información contable.' }
      ]},
      { dice: 'Este mes vendí 2.400, mis costos de servicios fueron 1.650 y los gastos administrativos 300. ¿Gané?', opciones: [
        { t: 'Sí: el estado de resultados muestra una utilidad bruta de 750 y una utilidad neta de 450 dólares antes de impuestos.', p: 2, r: '¡Qué alivio!', fb: '2.400 − 1.650 = 750 (utilidad bruta); 750 − 300 = 450 (utilidad antes de impuestos).' },
        { t: 'Ganó 2.400.', p: 0, r: '¿Y los costos?', fb: 'Las ventas no son utilidad: hay que restar costos y gastos.' },
        { t: 'Ganó 750.', p: 1, r: '¿Y los gastos?', fb: 'Es la utilidad bruta; faltan los gastos administrativos.' }
      ]}
    ],
    vivo: {
      lugar: 'Oficina de una agencia de viajes en Puyo', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🧾', t: 'Pedir la factura de la venta como respaldo', p: 2, fb: 'El documento fuente respalda el registro.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📗', t: 'Abrir el libro diario y escribir el asiento', p: 2, fb: 'El registro en el diario es la base del proceso contable.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤷', t: 'No registrar porque "ya está en el banco"', p: 0, fb: 'Toda operación debe registrarse.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Debita la cuenta Bancos', claves: ['debito', 'debe', 'bancos', 'banco', 'activo'] },
            { n: 'Acredita los ingresos', claves: ['credito', 'haber', 'ingreso', 'ventas', 'servicios turisticos'] },
            { n: 'Usa el respaldo y el monto', claves: ['factura', 'respaldo', '800', 'ochocientos', 'documento'] }
          ],
          evitar: [ { claves: ['no lo registro', 'entro plata'], fb: 'Registra formalmente cada operación.' } ],
          modelo: 'Registramos un asiento: débito a Bancos por 800 y crédito a Ingresos por ventas de servicios turísticos por 800, con la factura como respaldo.'
        },
        {
          acciones: [
            { icono: '🗂️', t: 'Ordenar los documentos fuente por fecha', p: 2, fb: 'Los documentos fuente inician el ciclo contable.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📚', t: 'Mostrar el libro mayor y el balance de comprobación', p: 2, fb: 'Mayorizar y comprobar asegura la cuadratura.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📦', t: 'Guardar las facturas en una caja y olvidarlas', p: 0, fb: 'Guardar documentos no es el proceso completo.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Parte de los documentos fuente', claves: ['documento', 'fuente', 'factura', 'comprobante', 'soporte'] },
            { n: 'Registra en diario y mayor', claves: ['diario', 'mayor', 'mayoriz', 'asiento', 'registro'] },
            { n: 'Llega a balances y estados financieros', claves: ['balance de comprobacion', 'ajustes', 'estados financieros', 'estado de resultados', 'balance general'] }
          ],
          evitar: [ { claves: ['no me interesa', 'eso ve el contador'], fb: 'La gerencia debe entender su contabilidad.' } ],
          modelo: 'El proceso es: documentos fuente, registro en el libro diario, mayorización, balance de comprobación, ajustes y elaboración de los estados financieros.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Calcular la utilidad bruta y la neta', p: 2, fb: 'El estado de resultados muestra si la empresa gana o pierde.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📄', t: 'Preparar el estado de resultados en una hoja', p: 2, fb: 'Presentar el informe ordenado facilita las decisiones.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💰', t: 'Decirle que ganó todo lo vendido', p: 0, fb: 'Las ventas no son utilidad.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Calcula la utilidad bruta', claves: ['750', 'setecientos cincuenta', 'utilidad bruta', 'ventas menos costos', 'margen bruto'] },
            { n: 'Calcula la utilidad neta', claves: ['450', 'cuatrocientos cincuenta', 'utilidad neta', 'antes de impuestos', 'restando los gastos'] },
            { n: 'Usa el estado de resultados', claves: ['estado de resultados', 'perdidas y ganancias', 'informe', 'resultado', 'gano'] }
          ],
          evitar: [ { claves: ['gano 2400', 'gano todo'], fb: 'Resta costos y gastos.' } ],
          modelo: 'Sí ganó: el estado de resultados muestra una utilidad bruta de 750 y, restando los gastos, una utilidad neta de 450 dólares antes de impuestos.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-309', cod: 'GOT-P-309',
    titulo: 'Phone call: a guest asks about the hotel',
    asignaturas: ['GOT-P-309'],
    persona: { nombre: 'Mr. Thomas Reed', rol: 'Turista canadiense que llama a la hostería', avatar: '👨🏼', pitch: 0.95 },
    contexto: 'Trabajas en la recepción de una hostería en Puyo. Un turista canadiense llama por teléfono en inglés para pedir información y reservar un paquete. Responde en inglés.',
    objetivo: 'Usar el inglés para el lenguaje telefónico, describir las instalaciones del hotel y explicar un paquete turístico.',
    pasos: [
      { dice: 'Hello? Is this the Amazon lodge in Puyo?', opciones: [
        { t: 'Good morning, Selva Lodge, this is Ana speaking. How may I help you?', p: 2, r: 'Hi Ana, I would like some information.', fb: 'Saludo telefónico profesional: saludo, nombre del establecimiento, tu nombre y oferta de ayuda.' },
        { t: 'Yes. What?', p: 0, r: 'Oh… okay.', fb: 'Una respuesta seca es descortés en atención telefónica.' },
        { t: 'Hello, yes.', p: 1, r: 'Hmm, hi.', fb: 'Es correcto, pero incompleto para un saludo profesional.' }
      ]},
      { dice: 'What facilities do you have?', opciones: [
        { t: 'We have twenty rooms with private bathrooms and hot water, a restaurant with local food, free Wi-Fi, a swimming pool and guided walks in the forest.', p: 2, r: 'Sounds great!', fb: 'Describir instalaciones con vocabulario de hotel (rooms, restaurant, Wi-Fi, pool) es un objetivo de la unidad.' },
        { t: 'Rooms. Food.', p: 1, r: 'Can you tell me more?', fb: 'Faltan oraciones completas y detalles.' },
        { t: 'I don\'t know, come and see.', p: 0, r: 'Hmm…', fb: 'El recepcionista debe informar sobre las instalaciones.' }
      ]},
      { dice: 'Do you have a package for three days?', opciones: [
        { t: 'Yes, our package holiday includes two nights, breakfast, a day tour to a Kichwa community and transport from Puyo. Can I have your name and email to book it?', p: 2, r: 'Perfect, my name is Thomas Reed.', fb: 'Explicar qué incluye el paquete y tomar los datos de reserva cierra la venta.' },
        { t: 'Yes, it is cheap.', p: 1, r: 'What does it include?', fb: 'El precio sin el contenido del paquete no informa.' },
        { t: 'Call later, please.', p: 0, r: 'Okay… bye.', fb: 'Se pierde una venta por no atender la consulta.' }
      ]}
    ],
    vivo: {
      lugar: 'Recepción de una hostería en Puyo (llamada telefónica)', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📞', t: 'Contestar el teléfono antes del tercer timbre', p: 2, fb: 'Responder rápido es parte de la etiqueta telefónica.', efecto: { confianza: 6, tension: -4 } },
            { icono: '😊', t: 'Sonreír al hablar para que se note en la voz', p: 2, fb: 'La sonrisa se percibe en el tono de voz.', efecto: { confianza: 6, tension: -2 } },
            { icono: '😑', t: 'Responder "Yes. What?" con tono seco', p: 0, fb: 'Un tono seco es descortés en atención telefónica.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Greets politely', claves: ['good morning', 'good afternoon', 'hello', 'welcome', 'good evening'] },
            { n: 'Identifies the lodge and self', claves: ['lodge', 'hotel', 'this is', 'speaking', 'my name is'] },
            { n: 'Offers help', claves: ['how may i help', 'how can i help', 'help you', 'can i help', 'what can i do'] }
          ],
          evitar: [ { claves: ['what do you want', 'yes what'], fb: 'Usa expresiones corteses al teléfono.' } ],
          modelo: 'Good morning, Selva Lodge, this is Ana speaking. How may I help you?'
        },
        {
          acciones: [
            { icono: '📋', t: 'Leer la ficha de instalaciones del hotel', p: 2, fb: 'Tener la información a mano permite responder con precisión.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🏊', t: 'Mencionar la piscina y las caminatas guiadas', p: 2, fb: 'Destacar atractivos del hotel motiva la reserva.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤷', t: 'Decir "come and see" sin explicar', p: 0, fb: 'El recepcionista debe informar.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Describes rooms', claves: ['room', 'private bathroom', 'hot water', 'double', 'single'] },
            { n: 'Describes facilities', claves: ['restaurant', 'wi fi', 'wifi', 'pool', 'parking', 'garden'] },
            { n: 'Mentions activities', claves: ['guided', 'walk', 'tour', 'forest', 'jungle', 'activities'] }
          ],
          evitar: [ { claves: ['i dont know', 'come and see'], fb: 'Describe las instalaciones.' } ],
          modelo: 'We have twenty rooms with private bathrooms and hot water, a restaurant with local food, free Wi-Fi, a swimming pool and guided walks in the forest.'
        },
        {
          acciones: [
            { icono: '📦', t: 'Explicar el contenido del paquete de tres días', p: 2, fb: 'Detallar qué incluye el paquete evita malentendidos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✉️', t: 'Anotar el nombre y el correo del cliente', p: 2, fb: 'Tomar los datos permite confirmar la reserva.', efecto: { confianza: 6, tension: -4 } },
            { icono: '☎️', t: 'Pedirle que llame más tarde', p: 0, fb: 'Se pierde una venta por no atender.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Explains the package holiday', claves: ['package', 'includes', 'two nights', 'breakfast', 'transport'] },
            { n: 'Mentions the tour', claves: ['tour', 'community', 'kichwa', 'day trip', 'excursion'] },
            { n: 'Asks for booking details', claves: ['your name', 'email', 'book', 'reservation', 'phone number'] }
          ],
          evitar: [ { claves: ['call later', 'not now'], fb: 'Atiende la consulta y cierra la reserva.' } ],
          modelo: 'Yes, our package holiday includes two nights, breakfast, a day tour to a Kichwa community and transport from Puyo. Can I have your name and email to book it?'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-405', cod: 'GOT-P-405',
    titulo: 'Indicadores de calidad y mejora continua',
    asignaturas: ['GOT-P-405'],
    persona: { nombre: 'Ing. Gabriela', rol: 'Gerente de una operadora que busca certificarse', avatar: '👩🏻‍💼', pitch: 1.1 },
    contexto: 'La operadora quiere mejorar su calidad y prepararse para una certificación. La gerente te pide analizar las encuestas y proponer un sistema de mejora continua.',
    objetivo: 'Aplicar indicadores de satisfacción, normas de calidad (ISO 9001, ISO 14001), mejora continua y gestión de quejas.',
    pasos: [
      { dice: 'De 60 encuestados, 45 están satisfechos. ¿Es bueno?', opciones: [
        { t: 'La satisfacción es del 75 %; es aceptable, pero analizamos las causas de insatisfacción (puntualidad, alimentación) y fijamos una meta del 90 %.', p: 2, r: 'Buen análisis.', fb: '45 ÷ 60 × 100 = 75 %. El indicador se analiza junto con sus causas y una meta.' },
        { t: 'Sí, la mayoría está contenta.', p: 1, r: '¿Cuánto exactamente?', fb: 'Sin calcular el indicador no hay base para mejorar.' },
        { t: 'Las encuestas no sirven.', p: 0, r: '…', fb: 'La voz del cliente es la base de la gestión de calidad.' }
      ]},
      { dice: '¿Qué norma nos sirve para ordenarnos?', opciones: [
        { t: 'ISO 9001 para el sistema de gestión de calidad, e ISO 14001 si queremos gestionar también el desempeño ambiental; ambas usan el ciclo planificar, hacer, verificar y actuar.', p: 2, r: 'Perfecto.', fb: 'Las normas ISO estructuran los sistemas de gestión con enfoque de mejora continua.' },
        { t: 'Cualquier certificado que se pueda comprar.', p: 0, r: '¡No!', fb: 'Una certificación seria requiere un sistema implementado y auditado.' },
        { t: 'No necesitamos normas.', p: 1, r: 'Hmm.', fb: 'Se puede mejorar sin certificar, pero las normas aportan método.' }
      ]},
      { dice: 'Siguen llegando quejas por retrasos del transporte.', opciones: [
        { t: 'Registramos cada queja, analizamos la causa raíz, aplicamos una acción correctiva con el proveedor y verificamos con el indicador de puntualidad.', p: 2, r: 'Así cerramos el ciclo.', fb: 'La gestión de quejas con análisis de causas y verificación es mejora continua.' },
        { t: 'Pedimos disculpas a cada cliente y ya.', p: 1, r: 'Se repetirá.', fb: 'La disculpa es necesaria, pero sin acción correctiva el problema persiste.' },
        { t: 'Borramos las malas reseñas.', p: 0, r: '…', fb: 'Ocultar quejas impide mejorar y es poco ético.' }
      ]}
    ],
    vivo: {
      lugar: 'Sala de reuniones de una operadora en Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📊', t: 'Tabular las 60 encuestas en una hoja de cálculo', p: 2, fb: 'Tabular permite calcular indicadores confiables.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔍', t: 'Agrupar los comentarios negativos por tema', p: 2, fb: 'Identificar causas orienta la mejora.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🗑️', t: 'Descartar las encuestas negativas', p: 0, fb: 'Ignorar la voz del cliente impide mejorar.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Calcula el indicador de satisfacción', claves: ['75', 'setenta y cinco', 'por ciento', 'satisfaccion', '45 de 60'] },
            { n: 'Analiza las causas', claves: ['causa', 'puntualidad', 'alimentacion', 'analiz', 'insatisf'] },
            { n: 'Fija una meta de mejora', claves: ['meta', '90', 'noventa', 'objetivo', 'mejorar'] }
          ],
          evitar: [ { claves: ['las encuestas no sirven', 'no importa'], fb: 'Escucha al cliente.' } ],
          modelo: 'La satisfacción es del 75 por ciento, 45 de 60. Analizaremos las causas de insatisfacción, como la puntualidad y la alimentación, y fijaremos una meta del 90 por ciento.'
        },
        {
          acciones: [
            { icono: '📘', t: 'Presentar los requisitos de ISO 9001', p: 2, fb: 'ISO 9001 estructura el sistema de gestión de calidad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔄', t: 'Dibujar el ciclo PHVA en la pizarra', p: 2, fb: 'El PHVA es el motor de la mejora continua.', efecto: { confianza: 6, tension: -2 } },
            { icono: '💳', t: 'Buscar un certificado que se pueda comprar', p: 0, fb: 'Una certificación seria requiere un sistema auditado.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Menciona ISO 9001', claves: ['iso 9001', '9001', 'gestion de calidad', 'sistema de calidad', 'norma de calidad'] },
            { n: 'Menciona ISO 14001 o lo ambiental', claves: ['iso 14001', '14001', 'ambiental', 'medio ambiente', 'gestion ambiental'] },
            { n: 'Explica el ciclo PHVA', claves: ['phva', 'planificar', 'hacer', 'verificar', 'actuar', 'mejora continua'] }
          ],
          evitar: [ { claves: ['comprar el certificado', 'certificado trucho'], fb: 'La calidad se implementa, no se compra.' } ],
          modelo: 'Nos sirve ISO 9001 para el sistema de gestión de calidad, e ISO 14001 para el desempeño ambiental; ambas aplican la mejora continua con el ciclo planificar, hacer, verificar y actuar.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Abrir un registro de quejas con fecha y causa', p: 2, fb: 'El registro permite analizar tendencias.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🐟', t: 'Hacer un diagrama de causa y efecto', p: 2, fb: 'El análisis de causa raíz evita soluciones superficiales.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧽', t: 'Borrar las malas reseñas en internet', p: 0, fb: 'Ocultar quejas impide mejorar y es poco ético.', efecto: { confianza: -14, tension: 10 } }
          ],
          conceptos: [
            { n: 'Registra las quejas', claves: ['registr', 'queja', 'reclamo', 'anot', 'base de datos'] },
            { n: 'Analiza la causa raíz', claves: ['causa raiz', 'causa', 'analiz', 'por que', 'diagrama'] },
            { n: 'Aplica acción correctiva y verifica', claves: ['accion correctiva', 'correctiva', 'proveedor', 'verific', 'indicador', 'puntualidad'] }
          ],
          evitar: [ { claves: ['borrar resenas', 'ocultar las quejas'], fb: 'Gestiona las quejas, no las ocultes.' } ],
          modelo: 'Registramos cada queja, analizamos la causa raíz, aplicamos una acción correctiva con el proveedor de transporte y verificamos con el indicador de puntualidad.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-406', cod: 'GOT-P-406',
    titulo: 'Organizar a la comunidad para el turismo',
    asignaturas: ['GOT-P-406'],
    persona: { nombre: 'Don Tito', rol: 'Síndico de una comunidad shuar que inicia en turismo', avatar: '👨🏽‍🦱', pitch: 0.85 },
    contexto: 'Una comunidad shuar de Pastaza quiere iniciar un emprendimiento de turismo comunitario y rural. Te piden apoyo para organizarse, capacitarse y comercializar.',
    objetivo: 'Aplicar la organización comunitaria, el desarrollo de capacidades y las oportunidades comerciales del turismo rural y comunitario.',
    pasos: [
      { dice: '¿Cómo nos organizamos para recibir turistas?', opciones: [
        { t: 'Que la asamblea elija un comité de turismo, defina reglamento interno, roles rotativos y cómo se distribuyen los beneficios, con un fondo comunitario.', p: 2, r: 'Así todos participamos.', fb: 'La organización comunitaria con reglas claras y reparto equitativo sostiene el emprendimiento.' },
        { t: 'Que una sola familia se encargue de todo.', p: 1, r: '¿Y los demás?', fb: 'Concentrar beneficios genera conflictos internos.' },
        { t: 'Que una empresa de afuera lo maneje y nos dé algo.', p: 0, r: '…', fb: 'Pierde la esencia del turismo comunitario.' }
      ]},
      { dice: 'No tenemos experiencia. ¿Qué necesitamos aprender?', opciones: [
        { t: 'Un plan de capacitación: guianza nativa, primeros auxilios, manipulación de alimentos, atención al cliente y administración básica del emprendimiento.', p: 2, r: '¡Empecemos!', fb: 'El desarrollo de capacidades locales es clave para gestionar el emprendimiento.' },
        { t: 'Solo aprender inglés.', p: 1, r: '¿Y lo demás?', fb: 'El idioma ayuda, pero no cubre seguridad, gestión ni servicio.' },
        { t: 'Nada, aprenderemos sobre la marcha.', p: 0, r: '…', fb: 'Operar sin preparación pone en riesgo a turistas y comunidad.' }
      ]},
      { dice: '¿Cómo vendemos nuestra experiencia?', opciones: [
        { t: 'Aprovechar el turismo rural y de naturaleza: alianzas con operadoras registradas, ferias de turismo, redes de turismo comunitario y venta directa con precio justo.', p: 2, r: 'Hay muchas opciones.', fb: 'Diversificar canales y alianzas abre oportunidades comerciales.' },
        { t: 'Esperar a que los turistas lleguen.', p: 1, r: '…', fb: 'Sin comercialización activa el emprendimiento difícilmente se sostiene.' },
        { t: 'Cobrar muy barato para competir.', p: 0, r: 'No alcanzará.', fb: 'El precio debe cubrir costos y generar beneficio justo.' }
      ]}
    ],
    vivo: {
      lugar: 'Asamblea en la casa comunal de una comunidad shuar', fondo: 'comunidad',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🗳️', t: 'Facilitar la elección del comité de turismo', p: 2, fb: 'Un comité electo da legitimidad a la gestión.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📜', t: 'Proponer un borrador de reglamento interno', p: 2, fb: 'Las reglas claras previenen conflictos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🏢', t: 'Sugerir que una empresa externa lo maneje todo', p: 0, fb: 'Pierde la esencia del turismo comunitario.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Decisión en asamblea y comité', claves: ['asamblea', 'comite', 'eleg', 'directiva', 'organiza'] },
            { n: 'Reglamento y roles', claves: ['reglamento', 'roles', 'rotativ', 'funciones', 'normas'] },
            { n: 'Distribución equitativa de beneficios', claves: ['beneficio', 'fondo comunitario', 'reparto', 'equitativ', 'distribu'] }
          ],
          evitar: [ { claves: ['una sola familia', 'empresa de afuera'], fb: 'La gestión debe ser comunitaria.' } ],
          modelo: 'Que la asamblea elija un comité de turismo, apruebe un reglamento con roles rotativos y defina cómo se distribuyen los beneficios, con un fondo comunitario.'
        },
        {
          acciones: [
            { icono: '🩹', t: 'Agendar un curso de primeros auxilios', p: 2, fb: 'La seguridad del visitante requiere personal capacitado.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🍲', t: 'Programar un taller de manipulación de alimentos', p: 2, fb: 'La inocuidad alimentaria protege a los turistas.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🤞', t: 'Decir que aprenderán sobre la marcha', p: 0, fb: 'Operar sin preparación pone en riesgo a todos.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Propone un plan de capacitación', claves: ['capacitacion', 'plan', 'taller', 'curso', 'formacion'] },
            { n: 'Incluye guianza y primeros auxilios', claves: ['guianza', 'guias nativos', 'primeros auxilios', 'seguridad', 'rescate'] },
            { n: 'Incluye servicio y gestión', claves: ['alimentos', 'atencion al cliente', 'administracion', 'contabilidad', 'gestion'] }
          ],
          evitar: [ { claves: ['sobre la marcha', 'no hace falta aprender'], fb: 'Prepárense antes de operar.' } ],
          modelo: 'Propongo un plan de capacitación en guianza nativa, primeros auxilios, manipulación de alimentos, atención al cliente y administración básica del emprendimiento.'
        },
        {
          acciones: [
            { icono: '🤝', t: 'Contactar a operadoras registradas de Puyo', p: 2, fb: 'Las alianzas comerciales abren mercado.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎪', t: 'Inscribir a la comunidad en una feria de turismo', p: 2, fb: 'Las ferias acercan el producto a compradores.', efecto: { confianza: 6, tension: -2 } },
            { icono: '📉', t: 'Fijar un precio muy bajo para competir', p: 0, fb: 'El precio debe cubrir costos y dejar beneficio.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Identifica la oportunidad del turismo rural', claves: ['turismo rural', 'naturaleza', 'oportunidad', 'mercado', 'demanda'] },
            { n: 'Propone canales y alianzas', claves: ['alianza', 'operadora', 'feria', 'red', 'venta directa'] },
            { n: 'Defiende un precio justo', claves: ['precio justo', 'justo', 'costos', 'beneficio', 'tarifa'] }
          ],
          evitar: [ { claves: ['muy barato', 'regalado'], fb: 'El precio debe ser justo.' } ],
          modelo: 'Aprovechemos la demanda de turismo rural y de naturaleza con alianzas con operadoras registradas, ferias, la red de turismo comunitario y venta directa con precio justo.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-407', cod: 'GOT-P-407',
    titulo: 'Logística multimodal hacia una comunidad remota',
    asignaturas: ['GOT-P-407'],
    persona: { nombre: 'Capitán Jaime', rol: 'Coordinador de transporte de la operadora', avatar: '👨🏻‍✈️', pitch: 0.85 },
    contexto: 'Un grupo de 6 pax viajará de Puyo a una comunidad remota: bus hasta Shell, avioneta y canoa a motor por el río. Debes organizar el transporte con seguridad.',
    objetivo: 'Aplicar la organización del transporte terrestre, aéreo y fluvial, su reglamentación y la gestión del transporte turístico.',
    pasos: [
      { dice: '¿Cómo organizas los tramos del viaje?', opciones: [
        { t: 'Un itinerario multimodal con horarios: transporte turístico autorizado a Shell, avioneta de una operadora aérea habilitada y canoa con motorista calificado, dejando márgenes de tiempo.', p: 2, r: 'Bien coordinado.', fb: 'La gestión del transporte integra los tramos con operadores habilitados y márgenes.' },
        { t: 'Que cada tramo se resuelva al llegar.', p: 1, r: 'Arriesgado.', fb: 'Improvisar los enlaces causa esperas y pérdidas de conexión.' },
        { t: 'Contratar al que cobre menos aunque no tenga permisos.', p: 0, r: '…', fb: 'El transporte no habilitado pone en riesgo la vida de los turistas.' }
      ]},
      { dice: 'La avioneta tiene límite de peso. ¿Qué indicas a los turistas?', opciones: [
        { t: 'Informo con anticipación el límite de equipaje por persona, pido el peso de cada pasajero de forma confidencial y recomiendo maletas blandas.', p: 2, r: 'Muy claro.', fb: 'En aviación ligera el peso total es un factor de seguridad.' },
        { t: 'Que lleven lo que quieran.', p: 0, r: '¡Peligroso!', fb: 'Exceder el peso compromete la seguridad del vuelo.' },
        { t: 'Lo resolvemos en el aeropuerto.', p: 1, r: '…', fb: 'Avisar tarde genera molestias y demoras.' }
      ]},
      { dice: 'Hay mal tiempo y el vuelo se cancela.', opciones: [
        { t: 'Informo al grupo, activo el plan alterno (noche en Puyo o ruta fluvial si es segura), aviso a la comunidad y reprogramo con la aerolínea.', p: 2, r: 'Buena gestión.', fb: 'La seguridad prima; el plan alterno y la comunicación reducen el impacto.' },
        { t: 'Presiono al piloto para que despegue.', p: 0, r: '¡Jamás!', fb: 'Nunca se presiona una decisión de seguridad aérea.' },
        { t: 'Espero sin decir nada al grupo.', p: 1, r: '…', fb: 'La falta de información genera ansiedad y quejas.' }
      ]}
    ],
    vivo: {
      lugar: 'Aeródromo de Shell, Pastaza', fondo: 'exterior',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗓️', t: 'Elaborar el cronograma de los tres tramos', p: 2, fb: 'El cronograma coordina los enlaces entre medios.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📄', t: 'Verificar permisos de operación de cada transportista', p: 2, fb: 'Solo se contratan operadores habilitados.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💸', t: 'Contratar al más barato sin permisos', p: 0, fb: 'El transporte no habilitado pone vidas en riesgo.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Integra los medios de transporte', claves: ['terrestre', 'aereo', 'avioneta', 'fluvial', 'canoa', 'multimodal'] },
            { n: 'Usa operadores habilitados', claves: ['autorizad', 'habilitad', 'permiso', 'calificado', 'registrad'] },
            { n: 'Planifica horarios con márgenes', claves: ['horario', 'cronograma', 'margen', 'tiempo', 'itinerario'] }
          ],
          evitar: [ { claves: ['el mas barato', 'sin permisos'], fb: 'Prioriza la seguridad.' } ],
          modelo: 'Organizo un itinerario multimodal con horarios y márgenes: transporte terrestre autorizado a Shell, avioneta de una operadora habilitada y canoa con motorista calificado.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Pesar el equipaje antes de ir al aeródromo', p: 2, fb: 'Controlar el peso evita problemas en el embarque.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✉️', t: 'Enviar un correo con el límite de equipaje', p: 2, fb: 'Informar con anticipación evita molestias.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🧳', t: 'Dejar que lleven todo lo que quieran', p: 0, fb: 'Exceder el peso compromete la seguridad del vuelo.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Informa el límite de equipaje', claves: ['limite', 'kilos', 'equipaje', 'peso', 'maximo'] },
            { n: 'Lo hace con anticipación', claves: ['anticipacion', 'antes', 'previamente', 'correo', 'aviso'] },
            { n: 'Relaciona con la seguridad del vuelo', claves: ['seguridad', 'vuelo', 'avioneta', 'confidencial', 'maletas blandas'] }
          ],
          evitar: [ { claves: ['lleven lo que quieran', 'no importa el peso'], fb: 'El peso es un factor de seguridad.' } ],
          modelo: 'Informo con anticipación por correo el límite de equipaje en kilos por persona, pido el peso de cada pasajero de forma confidencial y recomiendo maletas blandas por la seguridad del vuelo.'
        },
        {
          acciones: [
            { icono: '📣', t: 'Reunir al grupo y explicar la cancelación', p: 2, fb: 'La información oportuna reduce la ansiedad.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏨', t: 'Reservar una noche en Puyo como plan alterno', p: 2, fb: 'El plan alterno protege la experiencia.', efecto: { confianza: 6, tension: -4 } },
            { icono: '😤', t: 'Presionar al piloto para que despegue', p: 0, fb: 'Nunca se presiona una decisión de seguridad aérea.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Informa al grupo', claves: ['informo', 'explic', 'grupo', 'cancel', 'mal tiempo'] },
            { n: 'Activa un plan alterno', claves: ['plan alterno', 'alternativa', 'noche en puyo', 'ruta fluvial', 'plan b'] },
            { n: 'Coordina y reprograma', claves: ['reprogram', 'comunidad', 'aerolinea', 'aviso', 'coordin'] }
          ],
          evitar: [ { claves: ['que despegue igual', 'presionar al piloto'], fb: 'La seguridad prima sobre el itinerario.' } ],
          modelo: 'Informo al grupo que el vuelo se canceló por mal tiempo, activo el plan alterno con una noche en Puyo, aviso a la comunidad y reprogramo con la aerolínea.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-408', cod: 'GOT-P-408',
    titulo: 'Liquidez, precios y una inversión en canoas',
    asignaturas: ['GOT-P-408'],
    persona: { nombre: 'Sr. Patricio', rol: 'Gerente financiero de una operadora fluvial', avatar: '👨🏽‍💼', pitch: 0.9 },
    contexto: 'La operadora evalúa su situación financiera, su estrategia de precios y la compra de dos canoas nuevas. El gerente te pide analizar los datos.',
    objetivo: 'Aplicar ratios financieros, estrategias de precios y gestión de ingresos, y la evaluación de proyectos de inversión.',
    pasos: [
      { dice: 'Activo corriente 18.000, pasivo corriente 12.000. ¿Podemos pagar nuestras deudas de corto plazo?', opciones: [
        { t: 'La razón corriente es 1,5: por cada dólar de deuda de corto plazo hay 1,50 de activos corrientes; la liquidez es adecuada.', p: 2, r: 'Claro y con datos.', fb: 'Razón corriente = activo corriente ÷ pasivo corriente = 18.000 ÷ 12.000 = 1,5.' },
        { t: 'Sí, porque tenemos 18.000.', p: 1, r: '¿Comparado con qué?', fb: 'La liquidez se mide relacionando activos y pasivos.' },
        { t: 'No sé, que lo vea el banco.', p: 0, r: '…', fb: 'El gestor financiero debe interpretar los estados financieros.' }
      ]},
      { dice: 'En temporada baja vendemos poco. ¿Bajamos precios a todos?', opciones: [
        { t: 'Aplicamos gestión de ingresos: tarifas por temporada, descuentos por reserva anticipada y paquetes para grupos, cuidando cubrir los costos.', p: 2, r: 'Más inteligente.', fb: 'La fijación de precios dinámica optimiza ingresos según la demanda.' },
        { t: 'Bajamos 50 % todo el año.', p: 0, r: 'Perderíamos en alta.', fb: 'Un descuento general sacrifica ingresos en temporada alta.' },
        { t: 'Mantener todo igual.', p: 1, r: 'Hmm.', fb: 'No aprovecha herramientas de gestión de ingresos.' }
      ]},
      { dice: 'Las canoas cuestan 20.000 y darían 26.000 de beneficio en tres años. ¿Conviene?', opciones: [
        { t: 'El retorno de la inversión es 30 %: (26.000 − 20.000) ÷ 20.000; conviene, pero comparo fuentes de financiamiento y analizo el riesgo.', p: 2, r: 'Bien evaluado.', fb: 'ROI = (beneficio − inversión) ÷ inversión × 100 = 30 %. Se complementa con riesgo y financiamiento.' },
        { t: 'Sí, porque 26.000 es más que 20.000.', p: 1, r: '¿Cuánto rinde?', fb: 'La conclusión es correcta, pero falta cuantificar el retorno y el riesgo.' },
        { t: 'Compremos cuatro canoas con un préstamo sin analizar.', p: 0, r: '¡Arriesgado!', fb: 'Invertir sin evaluación expone a la empresa.' }
      ]}
    ],
    vivo: {
      lugar: 'Oficina financiera de una operadora fluvial en Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '📑', t: 'Abrir el balance general del último trimestre', p: 2, fb: 'Los estados financieros son la base del análisis.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🧮', t: 'Calcular la razón corriente', p: 2, fb: 'El ratio de liquidez mide la capacidad de pago de corto plazo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏦', t: 'Decir que eso lo vea el banco', p: 0, fb: 'El gestor financiero debe interpretar sus estados.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Calcula la razón corriente', claves: ['1 5', 'uno coma cinco', 'razon corriente', 'liquidez corriente', 'uno punto cinco'] },
            { n: 'Explica la relación activo y pasivo', claves: ['activo corriente', 'pasivo corriente', 'por cada dolar', 'deuda', 'corto plazo'] },
            { n: 'Interpreta la liquidez', claves: ['adecuada', 'liquidez', 'podemos pagar', 'capacidad de pago', 'solvente'] }
          ],
          evitar: [ { claves: ['que lo vea el banco', 'no se'], fb: 'Interpreta los ratios.' } ],
          modelo: 'La razón corriente es 1,5: por cada dólar de deuda de corto plazo tenemos 1,50 de activo corriente, así que la liquidez es adecuada y podemos pagar.'
        },
        {
          acciones: [
            { icono: '📅', t: 'Graficar la demanda por mes del año pasado', p: 2, fb: 'Conocer la estacionalidad orienta los precios.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🏷️', t: 'Diseñar tarifas de temporada alta y baja', p: 2, fb: 'La gestión de ingresos ajusta precios a la demanda.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✂️', t: 'Rebajar 50 % todos los precios del año', p: 0, fb: 'Sacrifica ingresos en temporada alta.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Aplica gestión de ingresos', claves: ['gestion de ingresos', 'revenue', 'temporada', 'demanda', 'dinamic'] },
            { n: 'Propone tácticas de precio', claves: ['reserva anticipada', 'descuento', 'paquete', 'grupos', 'tarifa'] },
            { n: 'Cuida cubrir los costos', claves: ['costos', 'cubrir', 'margen', 'rentabil', 'punto de equilibrio'] }
          ],
          evitar: [ { claves: ['cincuenta por ciento todo', 'regalar'], fb: 'Ajusta precios con criterio.' } ],
          modelo: 'Aplicamos gestión de ingresos: tarifas por temporada, descuentos por reserva anticipada y paquetes para grupos, cuidando siempre cubrir los costos y el margen.'
        },
        {
          acciones: [
            { icono: '📈', t: 'Calcular el retorno de la inversión', p: 2, fb: 'El ROI cuantifica la conveniencia del proyecto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏦', t: 'Comparar dos ofertas de crédito', p: 2, fb: 'Evaluar el financiamiento reduce el costo del proyecto.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🛶', t: 'Comprar cuatro canoas con un préstamo sin analizar', p: 0, fb: 'Invertir sin evaluación expone a la empresa.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Calcula el ROI', claves: ['30', 'treinta', 'por ciento', 'retorno', 'roi'] },
            { n: 'Muestra el procedimiento', claves: ['26000', '26 000', 'menos', 'dividido', 'inversion', '20000'] },
            { n: 'Considera financiamiento y riesgo', claves: ['financiamiento', 'credito', 'riesgo', 'prestamo', 'tasa'] }
          ],
          evitar: [ { claves: ['sin analizar', 'compremos de una'], fb: 'Evalúa antes de invertir.' } ],
          modelo: 'El retorno de la inversión es 26000 menos 20000, dividido para 20000: 30 por ciento. Conviene, pero comparo fuentes de financiamiento y analizo el riesgo.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-409', cod: 'GOT-P-409',
    titulo: 'Guiding in English: sights, food and traditions',
    asignaturas: ['GOT-P-409'],
    persona: { nombre: 'Ms. Hannah Brooks', rol: 'Turista británica en un city tour por Puyo', avatar: '👩🏼‍🦰', pitch: 1.15 },
    contexto: 'Guías a una turista británica por Puyo. Te pregunta por lugares de interés, cómo moverse, qué comer y las tradiciones locales. Responde en inglés.',
    objetivo: 'Usar el inglés para describir lugares de interés, transporte, gastronomía, tradiciones y festividades.',
    pasos: [
      { dice: 'What are the main places of interest in Puyo?', opciones: [
        { t: 'You can visit the Paseo Turístico along the Puyo River, the Omaere ethnobotanical park and the Indichuris viewpoint, where you can see the rainforest.', p: 2, r: 'Lovely, I want to see them all!', fb: 'Describir lugares de interés con vocabulario adecuado es objetivo de la unidad "Seeing the sights".' },
        { t: 'Park. River.', p: 1, r: 'Could you tell me more?', fb: 'Faltan oraciones completas y detalles.' },
        { t: 'Nothing interesting here.', p: 0, r: 'Oh, what a pity.', fb: 'Desvalorizar el destino es contrario a la labor del guía.' }
      ]},
      { dice: 'How can I get to the park? And what should I eat?', opciones: [
        { t: 'You can take a taxi or walk for fifteen minutes. For lunch, I recommend maito, fish cooked in leaves, with cassava; if you have any allergies, please tell me.', p: 2, r: 'That sounds delicious!', fb: 'Indicar cómo moverse y recomendar comida local con atención a alergias integra "Getting around" y "Eating out".' },
        { t: 'Taxi. Eat chicken.', p: 1, r: 'Okay…', fb: 'Comunicación mínima, sin detalles ni cortesía.' },
        { t: 'I don\'t know, ask somebody.', p: 0, r: 'Hmm.', fb: 'El guía debe orientar al visitante.' }
      ]},
      { dice: 'Are there any special festivals here?', opciones: [
        { t: 'Yes, in May Puyo celebrates its foundation with parades and music, and Carnival is a public holiday with water games; communities also share traditions such as the guayusa ceremony.', p: 2, r: 'I would love to come back for that!', fb: 'Describir festividades y tradiciones locales corresponde a "Traditions" y "Public holidays".' },
        { t: 'Yes, many parties.', p: 1, r: 'Which ones?', fb: 'Es vago; faltan ejemplos concretos.' },
        { t: 'No, there are no traditions.', p: 0, r: 'Really?', fb: 'Es falso y desvaloriza la cultura local.' }
      ]}
    ],
    vivo: {
      lugar: 'Paseo Turístico junto al río Puyo', fondo: 'exterior',
      inicio: { confianza: 55, tension: 30 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Mostrarle un mapa turístico de Puyo', p: 2, fb: 'El mapa apoya la explicación de los lugares de interés.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📸', t: 'Señalar el mirador para una foto panorámica', p: 2, fb: 'Sugerir experiencias concretas motiva al visitante.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🙅', t: 'Decir que no hay nada interesante', p: 0, fb: 'Desvalorizar el destino es contrario a la labor del guía.', efecto: { confianza: -12, tension: 6 } }
          ],
          conceptos: [
            { n: 'Names places of interest', claves: ['paseo turistico', 'omaere', 'indichuris', 'park', 'river', 'museum'] },
            { n: 'Uses suggestion language', claves: ['you can visit', 'you can see', 'i recommend', 'you should', 'dont miss'] },
            { n: 'Describes the attraction', claves: ['rainforest', 'viewpoint', 'ethnobotanical', 'beautiful', 'plants', 'view'] }
          ],
          evitar: [ { claves: ['nothing interesting', 'boring'], fb: 'Presenta el destino con entusiasmo.' } ],
          modelo: 'You can visit the Paseo Turistico along the Puyo River, the Omaere ethnobotanical park and the Indichuris viewpoint, where you can see the rainforest.'
        },
        {
          acciones: [
            { icono: '🚕', t: 'Indicarle la parada de taxis autorizados', p: 2, fb: 'Orientar sobre transporte seguro es parte del servicio.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🐟', t: 'Mostrar una foto del maito en hoja de bijao', p: 2, fb: 'La imagen ayuda a entender la comida local.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤷‍♀️', t: 'Decirle que pregunte a otra persona', p: 0, fb: 'El guía debe orientar al visitante.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Explains how to get around', claves: ['taxi', 'walk', 'bus', 'minutes', 'get there'] },
            { n: 'Recommends local food', claves: ['maito', 'fish', 'cassava', 'i recommend', 'local food', 'try'] },
            { n: 'Asks about allergies politely', claves: ['allerg', 'please tell me', 'vegetarian', 'dietary', 'do you eat'] }
          ],
          evitar: [ { claves: ['ask somebody', 'i dont know'], fb: 'Orienta al visitante.' } ],
          modelo: 'You can take a taxi or walk for fifteen minutes. For lunch I recommend maito, fish cooked in leaves, with cassava. If you have any allergies, please tell me.'
        },
        {
          acciones: [
            { icono: '🎉', t: 'Mostrarle fotos del desfile de fundación de Puyo', p: 2, fb: 'Las imágenes hacen tangible la festividad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🍵', t: 'Ofrecerle probar guayusa y explicar el ritual', p: 2, fb: 'Compartir una tradición viva enriquece la experiencia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🚫', t: 'Decir que aquí no hay tradiciones', p: 0, fb: 'Es falso y desvaloriza la cultura local.', efecto: { confianza: -12, tension: 6 } }
          ],
          conceptos: [
            { n: 'Mentions a festival or public holiday', claves: ['foundation', 'carnival', 'public holiday', 'festival', 'parade', 'celebrat'] },
            { n: 'Describes a tradition', claves: ['tradition', 'guayusa', 'ceremony', 'communities', 'music'] },
            { n: 'Gives time references', claves: ['in may', 'in february', 'every year', 'month', 'during'] }
          ],
          evitar: [ { claves: ['no traditions', 'nothing special'], fb: 'Valora la cultura local.' } ],
          modelo: 'Yes, in May Puyo celebrates its foundation with parades and music, and Carnival is a public holiday every year. Communities also share traditions such as the guayusa ceremony.'
        }
      ]
    }
  },
  {
    id: 'asig-GOT-P-410', cod: 'GOT-P-410',
    titulo: 'Presentar el plan de negocios de un emprendimiento turístico',
    asignaturas: ['GOT-P-410'],
    persona: { nombre: 'Ing. Mariela', rol: 'Evaluadora de un fondo de emprendimiento', avatar: '👩🏽‍⚖️', pitch: 1.05 },
    contexto: 'Presentas ante un fondo de emprendimiento tu idea: tours de kayak y avistamiento de aves en el río Pastaza. La evaluadora revisa tu plan de negocios.',
    objetivo: 'Integrar la propuesta de valor, el plan de mercadeo, la planificación financiera y la estructura legal en un plan de negocios sostenible.',
    pasos: [
      { dice: '¿Cuál es tu propuesta de valor?', opciones: [
        { t: 'Ofrecemos kayak guiado y aviturismo con guías locales certificados, equipos seguros y beneficio para comunidades ribereñas; resolvemos la falta de experiencias de río sostenibles en Pastaza.', p: 2, r: 'Clara y diferenciada.', fb: 'La propuesta de valor responde a un problema del cliente con un diferencial claro.' },
        { t: 'Hacemos tours de kayak.', p: 1, r: '¿Qué los hace distintos?', fb: 'Describe el servicio, pero no su valor diferencial.' },
        { t: 'Todavía no lo sé, quiero el dinero primero.', p: 0, r: '…', fb: 'Sin propuesta de valor no hay negocio que financiar.' }
      ]},
      { dice: '¿Cómo vas a vender y cuánto necesitas?', opciones: [
        { t: 'Plan de mercadeo con segmento de turistas de naturaleza, venta en línea y por operadoras; inversión de 15.000, punto de equilibrio de 40 pax al mes y proyección de flujos a tres años.', p: 2, r: 'Los números se sostienen.', fb: 'El plan integra mercadeo y planificación financiera (inversión, equilibrio, flujos).' },
        { t: 'Por redes; necesito unos 15.000.', p: 1, r: '¿Y cuándo recupero?', fb: 'Falta sustento financiero y de mercado.' },
        { t: 'El que quiera vendrá; pido 100.000.', p: 0, r: '…', fb: 'Una solicitud sin sustento no es viable.' }
      ]},
      { dice: '¿Cómo constituirás la empresa?', opciones: [
        { t: 'Como persona jurídica o emprendimiento formal con RUC, registro de turismo como operadora, seguros, y una organización con roles definidos y políticas de sostenibilidad.', p: 2, r: 'Aprobado para la siguiente fase.', fb: 'La estructura legal y organizacional formaliza y protege el negocio.' },
        { t: 'Informal al inicio y luego vemos.', p: 0, r: 'No financiamos informales.', fb: 'Operar informalmente impide financiamiento y es ilegal en turismo.' },
        { t: 'Solo con el RUC.', p: 1, r: '¿Y el registro turístico?', fb: 'El RUC no basta para operar tours.' }
      ]}
    ],
    vivo: {
      lugar: 'Sala de evaluación de un fondo de emprendimiento en Puyo', fondo: 'oficina',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🧩', t: 'Mostrar el lienzo del modelo de negocio', p: 2, fb: 'El lienzo resume la propuesta de valor y el modelo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🦅', t: 'Presentar el video de prueba del tour', p: 2, fb: 'Una evidencia del producto da credibilidad.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💵', t: 'Pedir el dinero sin explicar la idea', p: 0, fb: 'Sin propuesta de valor no hay negocio.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Describe la propuesta de valor', claves: ['propuesta de valor', 'ofrecemos', 'kayak', 'aviturismo', 'aves'] },
            { n: 'Señala el diferencial', claves: ['diferen', 'guias locales', 'certificad', 'seguro', 'unico'] },
            { n: 'Incluye el problema y la sostenibilidad', claves: ['problema', 'resolvemos', 'sostenib', 'comunidades', 'beneficio'] }
          ],
          evitar: [ { claves: ['quiero el dinero primero', 'no se todavia'], fb: 'Define tu propuesta antes de pedir financiamiento.' } ],
          modelo: 'Nuestra propuesta de valor: ofrecemos kayak guiado y aviturismo con guías locales certificados y equipos seguros, con beneficio para las comunidades; resolvemos la falta de experiencias de río sostenibles.'
        },
        {
          acciones: [
            { icono: '📈', t: 'Mostrar la proyección de flujos a tres años', p: 2, fb: 'La planificación financiera sustenta la viabilidad.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎯', t: 'Presentar el perfil del cliente y los canales', p: 2, fb: 'El plan de mercadeo explica cómo se venderá.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎰', t: 'Pedir 100.000 sin sustento', p: 0, fb: 'Una solicitud sin sustento no es viable.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Explica el plan de mercadeo', claves: ['mercadeo', 'segmento', 'turistas de naturaleza', 'venta en linea', 'operadoras', 'canales'] },
            { n: 'Indica la inversión', claves: ['inversion', '15000', '15 000', 'quince mil', 'capital'] },
            { n: 'Sustenta con indicadores financieros', claves: ['punto de equilibrio', 'flujo', 'proyeccion', 'recuper', '40 pax', 'rentab'] }
          ],
          evitar: [ { claves: ['el que quiera vendra', 'cien mil'], fb: 'Sustenta tu plan con datos.' } ],
          modelo: 'El plan de mercadeo apunta al segmento de turistas de naturaleza, con venta en línea y por operadoras. La inversión es de 15000, el punto de equilibrio es 40 pax al mes y presento la proyección de flujos a tres años.'
        },
        {
          acciones: [
            { icono: '📜', t: 'Presentar el cronograma de constitución legal', p: 2, fb: 'La formalización es requisito para operar y financiarse.', efecto: { confianza: 8, tension: -4 } },
            { icono: '👥', t: 'Mostrar el organigrama con roles definidos', p: 2, fb: 'La organización clara facilita la gestión.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🙈', t: 'Proponer operar informal "por ahora"', p: 0, fb: 'Operar informalmente es ilegal en turismo.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Define la estructura legal', claves: ['persona juridica', 'compania', 'sociedad', 'ruc', 'constitu', 'formal'] },
            { n: 'Incluye el registro turístico y seguros', claves: ['registro de turismo', 'operadora', 'seguro', 'licencia', 'permisos'] },
            { n: 'Organiza roles y políticas', claves: ['roles', 'organizacion', 'organigrama', 'politicas', 'sostenibilidad'] }
          ],
          evitar: [ { claves: ['informal', 'luego vemos'], fb: 'Formaliza el negocio desde el inicio.' } ],
          modelo: 'La constituiré como persona jurídica con RUC, registro de turismo como operadora, seguros y licencia, con un organigrama de roles definidos y políticas de sostenibilidad.'
        }
      ]
    }
  }
]);
