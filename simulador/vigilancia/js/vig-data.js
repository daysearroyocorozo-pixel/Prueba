/* =========================================================
   Datos del simulador de la carrera de Vigilancia y Seguridad
   Ciudadana (ISTCY, técnico superior, modalidad en línea).
   Fuente curricular: Anexo 2 – Informe académico (malla, perfil
   de egreso, líneas de investigación y estudio de pertinencia).
   Las situaciones, personas y lugares son ficticios con fines
   formativos. Las referencias normativas son generales y deben
   ser validadas por los docentes con la normativa vigente.
   ========================================================= */

const NIVELES = [
  { id: 'basico', nombre: 'Básico', emoji: '🟢', desc: '6 incidentes, pocas consignas e imprevistos.', n: 6, ev: 0.25, llegada: 70, limite: 70 },
  { id: 'intermedio', nombre: 'Intermedio', emoji: '🟡', desc: '8 incidentes, consignas del supervisor e imprevistos.', n: 8, ev: 0.4, llegada: 48, limite: 55 },
  { id: 'avanzado', nombre: 'Avanzado', emoji: '🔴', desc: '10 incidentes seguidos y muchos imprevistos.', n: 10, ev: 0.55, llegada: 34, limite: 45 }
];

const SECTORES = [
  { id: 'parque', nombre: 'Parque Central de Puyo', emoji: '🌳', desc: 'Pileta, bancas, juegos infantiles y mucha gente al caer la tarde.', corto: 'Parque Central' },
  { id: 'mercado', nombre: 'Mercado Municipal', emoji: '🧺', desc: 'Puestos de frutas amazónicas, comerciantes y compradores apurados.', corto: 'Mercado' },
  { id: 'escuela', nombre: 'Entorno de una unidad educativa', emoji: '🏫', desc: 'Salida de estudiantes, padres de familia y transporte escolar.', corto: 'Unidad educativa' },
  { id: 'comercial', nombre: 'Centro comercial', emoji: '🏬', desc: 'Locales, patio de comidas, parqueadero y salidas de emergencia.', corto: 'Centro comercial' }
];

const MODS = {
  turno: { nombre: 'Turno', emoji: '🛡️' },
  pro: { nombre: 'Protocolos', emoji: '⚖️' },
  ana: { nombre: 'Análisis del delito', emoji: '🗺️' },
  casos: { nombre: 'Casos', emoji: '🤝' }
};

const MALLA_VIG = [
  { cod: 'VSC-01', n: 'Metodología de la Investigación', pao: 1, mod: ['ana', 'casos'], rel: 'parcial', sim: 'Levantamiento básico de información, fichas de observación y análisis sencillo de datos de seguridad.' },
  { cod: 'VSC-02', n: 'Psicología Social y Comportamiento Delictivo', pao: 1, mod: ['turno', 'casos'], rel: 'directa', sim: 'Factores de riesgo, conducta de grupos y multitudes, y manejo inicial de personas en crisis.' },
  { cod: 'VSC-03', n: 'Estrategias Operativas y Herramientas Tecnológicas de Vigilancia', pao: 1, mod: ['turno', 'ana'], rel: 'directa', sim: 'Rondas preventivas, puesto fijo, control de accesos, cámaras, radio y registros digitales.' },
  { cod: 'VSC-04', n: 'Defensa Personal y Uso Progresivo de la Fuerza', pao: 1, mod: ['turno', 'pro', 'casos'], rel: 'directa', sim: 'Niveles de uso de la fuerza, proporcionalidad, desescalada y autoprotección.' },
  { cod: 'VSC-05', n: 'Protocolos y Procedimientos de Seguridad Ciudadana I', pao: 1, mod: ['turno', 'pro'], rel: 'directa', sim: 'Consignas, protocolos básicos de actuación, parte de novedades y comunicación con el ECU 911.' },
  { cod: 'VSC-06', n: 'Procesos Comunitarios de Seguridad', pao: 1, mod: ['casos', 'turno'], rel: 'directa', sim: 'Comités barriales, prevención comunitaria y planes de seguridad participativos.' },
  { cod: 'VSC-07', n: 'Protocolos y Procedimientos de Seguridad Ciudadana II', pao: 2, mod: ['turno', 'pro'], rel: 'directa', sim: 'Actuación ante delitos flagrantes, preservación de la escena y coordinación interinstitucional.' },
  { cod: 'VSC-08', n: 'Ciberseguridad y Geodiferenciación del Delito', pao: 2, mod: ['ana', 'casos'], rel: 'directa', sim: 'Mapas de calor, análisis por lugar y horario, phishing, contraseñas y protección de datos.' },
  { cod: 'VSC-09', n: 'Mediación de Conflictos y Trato al Ciudadano', pao: 2, mod: ['turno', 'casos'], rel: 'directa', sim: 'Escucha activa, desescalada, mediación y atención con enfoque de derechos.' },
  { cod: 'VSC-10', n: 'Protocolos en Emergencias y Primeros Auxilios', pao: 2, mod: ['turno', 'pro'], rel: 'directa', sim: 'Proteger-Avisar-Socorrer, RCP, hemorragias, evacuación y gestión de riesgos.' },
  { cod: 'VSC-11', n: 'Legislación Aplicada a la Vigilancia y Seguridad Ciudadana', pao: 2, mod: ['pro', 'casos', 'turno'], rel: 'directa', sim: 'Derechos humanos, flagrancia, competencias de la vigilancia privada y protección de datos.' },
  { cod: 'VSC-12', n: 'Trabajo de Integración Curricular', pao: 2, mod: ['turno', 'pro', 'ana', 'casos'], rel: 'parcial', sim: 'Integra todos los módulos; los reportes del simulador sirven como evidencia.' }
];

/* ---------------- INCIDENTES DEL TURNO ----------------
   prio: incidente de prioridad alta (vida o integridad de personas).
   Cada incidente tiene 2 momentos (actuación inicial y cierre) con opciones p 0–2.
   ef { min, seg (seguridad del sector), conf (confianza ciudadana), falta (legalidad/DDHH),
        fuerza (uso de fuerza desproporcionado), riesgo (riesgo personal), doc (registro) }. */
const INCIDENTES = [
  { id: 'i1', nombre: 'Niño extraviado', avatar: '👩🏽', icono: '🧒🏽', perfil: 'Persona extraviada', prio: true, pitch: 1.2, asig: ['VSC-05', 'VSC-03'],
    quien: 'Sra. Rosa Vargas, madre angustiada',
    dice: '¡Ayúdeme, por favor! Mi hijo Mateo, de seis años, estaba conmigo hace diez minutos y ya no lo veo. Tiene camiseta roja.',
    pasos: [
      { txt: '¿Cuál es tu actuación inicial?', o: [
        { t: 'Tomo los datos clave (nombre, edad, ropa, último lugar), los difundo por radio a la central y a los compañeros, pido revisar las cámaras y alerto al ECU 911 sin perder tiempo.', p: 2, fb: 'En la búsqueda de un niño los primeros minutos son decisivos: datos precisos, difusión inmediata y uso de cámaras.', ef: { min: 8, seg: 6, conf: 10, doc: 1 } },
        { t: 'Le pido que espere en la caseta mientras doy una vuelta solo para buscarlo.', p: 1, fb: 'Buscar ayuda, pero sin difundir los datos por radio ni usar las cámaras se pierde tiempo valioso.', ef: { min: 12, conf: 2 } },
        { t: 'Le explico que hay que esperar 24 horas para reportar a una persona desaparecida.', p: 0, fb: 'Falso y peligroso: en Ecuador una desaparición se denuncia de inmediato, y más aún si es un niño.', ef: { min: 2, seg: -8, conf: -15, falta: 1 } }
      ]},
      { dice: '(Una compañera encuentra a Mateo junto a la pileta, asustado. Un señor que dice ser su tío quiere llevárselo.)', o: [
        { t: 'Mantengo al niño protegido en un lugar visible, lo entrego solo a su madre tras verificar su identidad, cierro la alerta con la central y registro la novedad.', p: 2, fb: 'El niño se entrega a su madre o representante legal verificado; se cierra la alerta y se deja constancia.', ef: { min: 8, seg: 5, conf: 10, doc: 1 } },
        { t: 'Se lo entrego al señor porque el niño parece conocerlo, pero anoto sus datos.', p: 1, fb: 'Anotar datos ayuda, pero sin verificar con la madre existe riesgo para el niño.', ef: { min: 4, conf: -2 } },
        { t: 'Se lo entrego al señor sin preguntar nada para terminar rápido.', p: 0, fb: 'Entregar a un menor sin verificar a su representante puede exponerlo a un grave peligro.', ef: { min: 2, seg: -10, conf: -10, falta: 1 } }
      ]}
    ]},
  { id: 'i2', nombre: 'Hurto en flagrancia', avatar: '🧑🏻', icono: '📱', perfil: 'Hurto de celular', prio: true, pitch: 1.1, asig: ['VSC-07', 'VSC-11', 'VSC-04'],
    quien: 'Joven estudiante, víctima del hurto',
    dice: '¡Me arrancó el celular y corrió! Es ese de gorra azul… ¡unos señores ya lo agarraron y le están pegando!',
    pasos: [
      { txt: '¿Cómo intervienes?', o: [
        { t: 'Me acerco con presencia y verbalización firme, pido a la gente que no lo agreda, aseguro la retención sin violencia y llamo al ECU 911 para que acuda la Policía Nacional.', p: 2, fb: 'Uso progresivo de la fuerza: presencia y verbalización bastan. Proteges la integridad de todos, incluido el sospechoso.', ef: { min: 8, seg: 8, conf: 8, riesgo: 5 } },
        { t: 'Llamo al ECU 911 desde la caseta y espero sin intervenir.', p: 1, fb: 'Avisar es correcto, pero la integridad del retenido está en riesgo; tu presencia podía detener la agresión.', ef: { min: 5, conf: -5 } },
        { t: 'Dejo que la gente le dé una lección; se lo merece.', p: 0, fb: 'Permitir un linchamiento vulnera los derechos humanos y puede constituir delito. Nadie puede hacer justicia por mano propia.', ef: { min: 3, seg: -6, conf: -6, falta: 1, fuerza: 1 } }
      ]},
      { dice: '(El sospechoso está quieto y tiene el celular en la mano. La víctima pide que lo encierres en la caseta y lo revises.)', o: [
        { t: 'Lo mantengo retenido solo hasta que llegue la Policía, sin golpes ni humillaciones; entrego a los agentes el celular, los datos de la víctima y de los testigos, y registro todo en el parte.', p: 2, fb: 'En flagrancia cualquier persona puede aprehender y debe entregar de inmediato a la Policía; el objeto es evidencia.', ef: { min: 10, seg: 6, conf: 6, doc: 2 } },
        { t: 'Recupero el celular, se lo devuelvo a la víctima y dejo ir al sospechoso.', p: 1, fb: 'Recuperar el bien es positivo, pero la persona debía ser entregada a la Policía y el objeto preservado como evidencia.', ef: { min: 4, seg: -4, conf: 2 } },
        { t: 'Lo encierro en la caseta, le reviso la mochila y le tomo fotos para subirlas al grupo del barrio.', p: 0, fb: 'Encerrar, requisar y exponer públicamente a una persona excede tus funciones y vulnera sus derechos.', ef: { min: 6, conf: -8, falta: 2 } }
      ]}
    ]},
  { id: 'i3', nombre: 'Riña entre jóvenes', avatar: '👨🏽', icono: '👊', perfil: 'Riña', prio: true, pitch: 0.95, asig: ['VSC-04', 'VSC-09', 'VSC-02'],
    quien: 'Don Lucho, vendedor de jugos',
    dice: '¡Agente, dos muchachos se están peleando junto a las bancas y ya se juntó un montón de gente grabando!',
    pasos: [
      { txt: '¿Qué haces?', o: [
        { t: 'Informo por radio, me acerco con un compañero manteniendo distancia de seguridad y uso verbalización firme para separarlos; solo si alguien agrede, aplico control físico proporcional.', p: 2, fb: 'Se actúa en pareja, con comunicación previa, y se escala la fuerza solo lo necesario.', ef: { min: 8, seg: 8, conf: 6, riesgo: 5 } },
        { t: 'Me meto solo entre los dos para separarlos con las manos.', p: 1, fb: 'La intención es buena, pero intervenir solo y sin aviso eleva mucho tu riesgo personal.', ef: { min: 6, seg: 4, riesgo: 20 } },
        { t: 'Saco el tolete y golpeo a ambos para que aprendan.', p: 0, fb: 'Uso desproporcionado de la fuerza: no hay necesidad ni proporcionalidad, y genera responsabilidad legal.', ef: { min: 4, seg: -4, conf: -12, falta: 1, fuerza: 1, riesgo: 10 } }
      ]},
      { dice: '(Ya están separados. Uno tiene un corte leve en la ceja y el otro sigue insultando.)', o: [
        { t: 'Atiendo la herida con guantes y presión con gasa, mantengo separadas a las partes, escucho a cada uno con calma, pido valoración al ECU 911 si hace falta y registro testigos y hechos.', p: 2, fb: 'Primeros auxilios con bioseguridad, desescalada y registro objetivo de la novedad.', ef: { min: 12, seg: 5, conf: 8, doc: 1 } },
        { t: 'Les digo que se vayan cada uno por su lado y no registro nada.', p: 1, fb: 'Se calma la situación, pero sin atención al herido ni registro no hay respaldo de la actuación.', ef: { min: 3, seg: -2 } },
        { t: 'Lo insulto también para que entienda quién manda.', p: 0, fb: 'Responder con agresión verbal escala el conflicto y vulnera el trato digno.', ef: { min: 2, conf: -10, falta: 1, riesgo: 8 } }
      ]}
    ]},
  { id: 'i4', nombre: 'Persona en crisis emocional', avatar: '🧑🏽', icono: '😢', perfil: 'Persona en crisis', prio: true, pitch: 1.0, asig: ['VSC-02', 'VSC-09', 'VSC-10'],
    quien: 'Joven sentado solo en una banca apartada',
    dice: 'Déjenme en paz… ya no aguanto más, nadie me entiende.',
    pasos: [
      { txt: '¿Cómo te acercas?', o: [
        { t: 'Me acerco despacio, me presento por mi nombre, le pregunto cómo se llama y lo escucho sin juzgar, con tono calmado y a una distancia respetuosa.', p: 2, fb: 'Presentarse, escuchar y no juzgar son la base de la primera ayuda psicológica.', ef: { min: 10, seg: 4, conf: 10 } },
        { t: 'Le digo que se calme, que hay gente con problemas peores.', p: 1, fb: 'Minimizar el sufrimiento no ayuda; aunque te acercaste, la persona se siente incomprendida.', ef: { min: 4, conf: -4 } },
        { t: 'Le ordeno que se retire del parque porque está molestando.', p: 0, fb: 'Expulsar a una persona en crisis la deja sola y en riesgo; es un trato contrario a los derechos humanos.', ef: { min: 2, seg: -6, conf: -12, falta: 1 } }
      ]},
      { dice: 'No quiero que llamen a nadie… solo quiero desaparecer.', o: [
        { t: 'No lo dejo solo, le digo que me importa su seguridad, pido apoyo al ECU 911 para atención de salud mental y lo acompaño hasta que llegue la ayuda; registro la novedad con reserva.', p: 2, fb: 'Ante una posible ideación suicida no se deja sola a la persona y se activa la ayuda especializada; la información se maneja con confidencialidad.', ef: { min: 15, seg: 6, conf: 10, doc: 1 } },
        { t: 'Respeto lo que dice y me retiro, pero más tarde aviso a la Policía.', p: 1, fb: 'Avisar es importante, pero dejarlo solo en ese momento aumenta el riesgo.', ef: { min: 3, seg: -6, conf: -4 } },
        { t: 'Le tomo una foto y la comparto en el chat de compañeros para pedir consejo.', p: 0, fb: 'Difundir la imagen de una persona en crisis vulnera su dignidad y su privacidad.', ef: { min: 3, conf: -10, falta: 1 } }
      ]}
    ]},
  { id: 'i5', nombre: 'Adulto mayor desvanecido', avatar: '👩🏻', icono: '👴🏽', perfil: 'Emergencia médica', prio: true, pitch: 1.15, asig: ['VSC-10'],
    quien: 'Comerciante que pide ayuda',
    dice: '¡Un señor mayor se cayó cerca de la pileta y no reacciona!',
    pasos: [
      { txt: '¿Qué haces primero?', o: [
        { t: 'Verifico que la zona sea segura, compruebo si responde y si respira, y llamo al ECU 911 dando ubicación exacta y estado: Proteger, Avisar, Socorrer.', p: 2, fb: 'La secuencia PAS protege al auxiliador y activa a tiempo el sistema de emergencias.', ef: { min: 6, seg: 6, conf: 10 } },
        { t: 'Lo sentamos y le damos agua para que se reanime.', p: 1, fb: 'Dar líquidos a alguien con la conciencia alterada puede causar atragantamiento; primero valora y avisa.', ef: { min: 5, conf: 2 } },
        { t: 'Lo subo a un taxi para que lo lleven al hospital sin avisar a nadie.', p: 0, fb: 'Trasladar sin valoración ni aviso puede agravar lesiones y deja a la persona sin atención profesional.', ef: { min: 4, seg: -4, conf: -6, falta: 1 } }
      ]},
      { dice: '(El operador del ECU 911 te indica que el señor no respira con normalidad.)', o: [
        { t: 'Inicio RCP con compresiones en el centro del pecho, fuertes y rápidas (100 a 120 por minuto), pido que traigan un DEA si hay uno cerca y sigo las instrucciones del operador hasta que llegue la ambulancia.', p: 2, fb: 'Si no respira con normalidad, las compresiones de calidad y el desfibrilador salvan vidas.', ef: { min: 12, seg: 6, conf: 12, doc: 1 } },
        { t: 'Lo coloco de lado y espero sin hacer nada más.', p: 1, fb: 'La posición lateral de seguridad es para quien sí respira; si no respira normal, se necesitan compresiones.', ef: { min: 6 } },
        { t: 'Le echo agua en la cara y lo sacudo fuerte para despertarlo.', p: 0, fb: 'Sacudir a una persona puede agravar lesiones y retrasa la RCP.', ef: { min: 3, conf: -8 } }
      ]}
    ]},
  { id: 'i6', nombre: 'Motociclista caído', avatar: '🧔🏽', icono: '🏍️', perfil: 'Accidente de tránsito', prio: true, pitch: 0.9, asig: ['VSC-10', 'VSC-07'],
    quien: 'Taxista que presenció el accidente',
    dice: '¡Un motociclista se cayó en la esquina! Está consciente, pero dice que le duele el cuello y quiere quitarse el casco.',
    pasos: [
      { txt: '¿Cuál es tu actuación inicial?', o: [
        { t: 'Señalizo y protejo la zona del tránsito, le pido que no se mueva ni se quite el casco, y llamo al ECU 911 informando una posible lesión de columna.', p: 2, fb: 'Ante sospecha de lesión de columna no se mueve a la víctima ni se retira el casco; se protege la escena y se avisa.', ef: { min: 8, seg: 8, conf: 8, riesgo: 3 } },
        { t: 'Llamo al ECU 911, pero dejo que se quite el casco para que respire mejor.', p: 1, fb: 'Avisar es correcto, pero retirar el casco puede agravar una lesión cervical.', ef: { min: 5, conf: 2 } },
        { t: 'Entre varios lo levantamos y lo llevamos a la vereda.', p: 0, fb: 'Mover a un lesionado con posible lesión de columna puede causar daño permanente.', ef: { min: 4, seg: -4, conf: -4 } }
      ]},
      { dice: '(Llegan los agentes de tránsito. Los conductores discuten y uno quiere irse.)', o: [
        { t: 'Mantengo la escena sin alterar, tomo datos de testigos y placas, los entrego a los agentes competentes y registro la hora y los hechos en el parte.', p: 2, fb: 'La preservación de la escena y los datos de testigos apoyan la investigación de las autoridades competentes.', ef: { min: 8, seg: 4, conf: 4, doc: 2 } },
        { t: 'Muevo los vehículos para despejar la vía antes de que lleguen los agentes.', p: 1, fb: 'Despejar puede ser necesario por seguridad, pero alterar la escena sin autorización afecta la investigación.', ef: { min: 4, seg: 2 } },
        { t: 'Retengo las llaves del conductor y le exijo pagar al motociclista.', p: 0, fb: 'Retener bienes y exigir pagos excede tus funciones; los acuerdos y responsabilidades los definen las autoridades.', ef: { min: 5, conf: -6, falta: 1 } }
      ]}
    ]},
  { id: 'i7', nombre: 'Objeto sospechoso', avatar: '👵🏽', icono: '🎒', perfil: 'Mochila abandonada', prio: true, pitch: 1.2, asig: ['VSC-05', 'VSC-07'],
    quien: 'Doña Carmen, vecina del sector',
    dice: 'Agente, hay una mochila negra abandonada debajo de una banca desde hace más de una hora. Nadie sabe de quién es.',
    pasos: [
      { txt: '¿Qué haces?', o: [
        { t: 'No la toco ni la muevo, observo a distancia, aíslo el área desplazando a las personas con calma y reporto a la central y al ECU 911 para que intervenga personal especializado.', p: 2, fb: 'Protocolo ante objeto sospechoso: no manipular, aislar, evacuar con calma y avisar a especialistas.', ef: { min: 8, seg: 10, conf: 6, riesgo: -5 } },
        { t: 'Pregunto en voz alta de quién es y espero junto a ella.', p: 1, fb: 'Preguntar puede aclarar la situación, pero quedarte junto al objeto aumenta tu riesgo.', ef: { min: 5, seg: 2, riesgo: 5 } },
        { t: 'La abro para ver qué tiene adentro.', p: 0, fb: 'Manipular un objeto sospechoso pone en peligro tu vida y la de los demás.', ef: { min: 3, seg: -6, riesgo: 20 } }
      ]},
      { dice: '(La Policía verifica que eran útiles escolares olvidados. La gente pregunta qué pasó.)', o: [
        { t: 'Informo con calma que el área es segura, gestiono la devolución del objeto con acta de entrega y registro la novedad con hora y actuaciones.', p: 2, fb: 'Comunicar con calma recupera la confianza; el acta y el registro respaldan la actuación.', ef: { min: 6, conf: 8, doc: 2 } },
        { t: 'No digo nada y vuelvo a la caseta.', p: 1, fb: 'La situación se resolvió, pero la gente queda con dudas y sin registro.', ef: { min: 1, conf: -3 } },
        { t: 'Me quedo con la mochila hasta ver si alguien la reclama, sin registrarla.', p: 0, fb: 'Los objetos hallados se registran y se entregan según el procedimiento; retenerlos sin registro es irregular.', ef: { min: 2, conf: -6, falta: 1 } }
      ]}
    ]},
  { id: 'i8', nombre: 'Vendedor informal', avatar: '🧑🏽‍💼', icono: '🧺', perfil: 'Uso del espacio público', prio: false, pitch: 0.95, asig: ['VSC-09', 'VSC-06'],
    quien: 'Comerciante del sector, molesto',
    dice: 'Ese vendedor ambulante se puso en la entrada y me quita clientes. ¡Sáquelo ya, para eso le pagan!',
    pasos: [
      { txt: '¿Cómo respondes?', o: [
        { t: 'Escucho al comerciante, me acerco al vendedor con respeto, le explico que no puede bloquear el paso, le oriento a reubicarse y aviso a los agentes de control municipal, que son los competentes.', p: 2, fb: 'El control del comercio en el espacio público corresponde al municipio; tu rol es orientar y coordinar con respeto.', ef: { min: 8, seg: 3, conf: 8 } },
        { t: 'Le digo al comerciante que eso no es mi problema.', p: 1, fb: 'Es cierto que no te compete sancionar, pero puedes orientar y coordinar con la autoridad competente.', ef: { min: 2, conf: -6 } },
        { t: 'Le quito la mercadería al vendedor y la llevo a la caseta.', p: 0, fb: 'Decomisar mercadería no es función de la vigilancia y vulnera derechos.', ef: { min: 4, conf: -10, falta: 1, fuerza: 1 } }
      ]},
      { dice: '(El vendedor, migrante, responde: «Solo quiero trabajar para darle de comer a mis hijos».)', o: [
        { t: 'Lo trato con dignidad y sin discriminación, le informo dónde gestionar un permiso o espacio autorizado en el municipio y registro la orientación brindada.', p: 2, fb: 'Trato humanizado y no discriminatorio, con orientación concreta hacia la vía legal.', ef: { min: 6, conf: 8, doc: 1 } },
        { t: 'Le dejo quedarse en la entrada para evitar problemas.', p: 1, fb: 'Evitas el conflicto, pero el paso sigue bloqueado y el problema continúa.', ef: { min: 2, seg: -2, conf: -2 } },
        { t: 'Le digo que regrese a su país.', p: 0, fb: 'Es un trato discriminatorio por origen nacional, prohibido por la Constitución.', ef: { min: 1, conf: -10, falta: 1 } }
      ]}
    ]},
  { id: 'i9', nombre: 'Alerta falsa en redes', avatar: '👩🏽‍🦱', icono: '📲', perfil: 'Reporte ciudadano por redes', prio: false, pitch: 1.1, asig: ['VSC-08', 'VSC-06'],
    quien: 'Presidenta del comité barrial',
    dice: 'Están compartiendo en el grupo de WhatsApp que hay una banda secuestrando niños en el sector. ¡La gente está asustada!',
    pasos: [
      { txt: '¿Qué haces con el reporte?', o: [
        { t: 'Verifico la información con la central, las cámaras y la Policía antes de responder; no reenvío el mensaje y pido a la presidenta esperar el dato oficial.', p: 2, fb: 'Verificar antes de difundir evita el pánico y la desinformación.', ef: { min: 8, seg: 4, conf: 6 } },
        { t: 'Le digo que seguro es falso, sin verificar.', p: 1, fb: 'Puede ser falso, pero descartar un reporte sin verificar es arriesgado.', ef: { min: 2, conf: -2 } },
        { t: 'Reenvío el mensaje a todos mis contactos para que estén alerta.', p: 0, fb: 'Difundir información no verificada multiplica el pánico.', ef: { min: 2, seg: -6, conf: -6 } }
      ]},
      { dice: '(La Policía confirma que es una cadena falsa que circula desde otra ciudad.)', o: [
        { t: 'Coordino con la presidenta un mensaje claro con la fuente oficial, recomiendo no compartir fotos ni datos de personas sin verificar y registro la novedad.', p: 2, fb: 'La comunicación comunitaria con fuente oficial desactiva el rumor y protege a personas inocentes.', ef: { min: 6, seg: 4, conf: 10, doc: 1 } },
        { t: 'Publico desde mi cuenta personal que todo es mentira.', p: 1, fb: 'Aclara, pero los mensajes oficiales deben salir de canales institucionales.', ef: { min: 3, conf: 2 } },
        { t: 'Publico la foto de un joven «sospechoso» que vi en el parque para que lo identifiquen.', p: 0, fb: 'Exponer a una persona sin pruebas vulnera su honra y sus datos personales.', ef: { min: 3, conf: -10, falta: 2 } }
      ]}
    ]},
  { id: 'i10', nombre: 'Persona en estado etílico', avatar: '👩🏾', icono: '🥴', perfil: 'Alteración del orden', prio: false, pitch: 1.15, asig: ['VSC-04', 'VSC-09'],
    quien: 'Madre de familia',
    dice: 'Un señor en estado etílico está molestando a las chicas que pasan y les grita groserías.',
    pasos: [
      { txt: '¿Cómo intervienes?', o: [
        { t: 'Me acerco con un compañero, uso presencia y verbalización respetuosa pero firme, le pido que se aleje y protejo a las jóvenes; si no obedece, informo a la Policía.', p: 2, fb: 'Presencia y verbalización suelen bastar; se protege a las víctimas y se escala solo si es necesario.', ef: { min: 8, seg: 8, conf: 8, riesgo: 4 } },
        { t: 'Le grito desde lejos que se vaya.', p: 1, fb: 'Puede funcionar, pero gritar sin acercarte ni proteger a las jóvenes es poco eficaz.', ef: { min: 2, seg: 2, conf: -2 } },
        { t: 'Lo empujo al suelo y lo saco a rastras.', p: 0, fb: 'Uso de fuerza desproporcionado frente a una persona que no agrede físicamente.', ef: { min: 4, conf: -10, falta: 1, fuerza: 1, riesgo: 8 } }
      ]},
      { dice: '(El señor se sienta en una banca y se queda dormido. Está solo y desorientado.)', o: [
        { t: 'Verifico que respire y esté seguro, lo coloco de lado si vomita, pido apoyo al ECU 911 o a un familiar y registro la novedad.', p: 2, fb: 'Una persona intoxicada puede broncoaspirar; vigilar y activar apoyo protege su vida.', ef: { min: 8, seg: 3, conf: 6, doc: 1 } },
        { t: 'Lo dejo dormir allí; ya no molesta.', p: 1, fb: 'Ya no altera el orden, pero puede necesitar ayuda o ser víctima de un delito.', ef: { min: 1, seg: -2 } },
        { t: 'Le reviso la billetera para ver quién es y me quedo con su celular por seguridad.', p: 0, fb: 'Revisar y retener pertenencias sin autorización vulnera sus derechos.', ef: { min: 2, conf: -8, falta: 2 } }
      ]}
    ]},
  { id: 'i11', nombre: 'Turista sin documentos', avatar: '👱🏼‍♀️', icono: '🧳', perfil: 'Orientación ciudadana', prio: false, pitch: 1.25, asig: ['VSC-09', 'VSC-05'],
    quien: 'Turista extranjera',
    dice: 'Hello… perdón, hablo poco español. Perdí mi pasaporte y no sé a dónde ir.',
    pasos: [
      { txt: '¿Cómo la atiendes?', o: [
        { t: 'La atiendo con paciencia, uso palabras sencillas o un traductor del celular, la ubico en un lugar seguro y le explico que debe denunciar la pérdida y contactar a su consulado.', p: 2, fb: 'Atención ciudadana inclusiva: comunicación clara y orientación concreta.', ef: { min: 8, conf: 10 } },
        { t: 'Le digo que vaya a la Policía, sin más indicación.', p: 1, fb: 'La orientación es correcta pero insuficiente para alguien que no conoce la ciudad.', ef: { min: 2 } },
        { t: 'Le digo que no la entiendo y sigo mi ronda.', p: 0, fb: 'Negar la atención por barreras de idioma es un trato excluyente.', ef: { min: 1, conf: -8 } }
      ]},
      { dice: 'Thank you… ¿me puede acompañar? Tengo miedo de que me roben otra vez.', o: [
        { t: 'Coordino con la central para que la UPC más cercana o la oficina de información turística la reciban, le doy la dirección escrita y el número 911, y registro la orientación brindada.', p: 2, fb: 'Coordinas sin abandonar tu sector y dejas constancia de la atención.', ef: { min: 8, conf: 8, doc: 1 } },
        { t: 'Abandono mi sector para llevarla personalmente al otro lado de la ciudad.', p: 1, fb: 'Ayudas a la turista, pero dejas el sector sin cobertura.', ef: { min: 25, seg: -6, conf: 6 } },
        { t: 'Le pido dinero por acompañarla.', p: 0, fb: 'Pedir dinero por un servicio de seguridad es una falta ética grave.', ef: { min: 2, conf: -10, falta: 2 } }
      ]}
    ]},
  { id: 'i12', nombre: 'Salida de emergencia bloqueada', avatar: '👩🏻‍💼', icono: '🚗', perfil: 'Riesgo en evacuación', prio: false, pitch: 1.05, asig: ['VSC-10', 'VSC-03'],
    quien: 'Administradora del establecimiento',
    dice: 'Un carro está parqueado justo en la salida de emergencia y el dueño no aparece. ¡Hoy tenemos simulacro de evacuación!',
    pasos: [
      { txt: '¿Qué haces?', o: [
        { t: 'Registro placa y hora, busco al propietario por altavoz y en los locales cercanos y, si no aparece, informo a los agentes de tránsito competentes.', p: 2, fb: 'Procedimiento ordenado: registro, búsqueda del responsable y coordinación con la autoridad competente.', ef: { min: 8, seg: 6, conf: 4, doc: 1 } },
        { t: 'Le dejo una nota en el parabrisas y me voy.', p: 1, fb: 'Es un intento, pero la salida sigue bloqueada antes del simulacro.', ef: { min: 3 } },
        { t: 'Le desinflo las llantas para que aprenda.', p: 0, fb: 'Dañar bienes ajenos es ilegal y no resuelve el riesgo.', ef: { min: 3, conf: -6, falta: 1 } }
      ]},
      { dice: '(Aparece el dueño, molesto: «¡Solo fueron cinco minutos, no exagere!».)', o: [
        { t: 'Le explico con calma que las salidas de emergencia deben estar libres por la seguridad de todos, le pido mover el vehículo y agradezco su colaboración.', p: 2, fb: 'Comunicación asertiva que explica el porqué de la norma de seguridad.', ef: { min: 4, seg: 6, conf: 6 } },
        { t: 'Discuto con él hasta que se va molesto, sin explicarle el motivo.', p: 1, fb: 'Se libera la salida, pero sin comunicación asertiva se daña la relación con el ciudadano.', ef: { min: 6, seg: 4, conf: -4 } },
        { t: 'Le cobro una «multa» en efectivo para no reportarlo.', p: 0, fb: 'Cobrar dinero es corrupción (concusión o cohecho) y no es función de la vigilancia.', ef: { min: 2, conf: -10, falta: 2 } }
      ]}
    ]}
];

/* Consignas del supervisor de turno */
const TAREAS = [
  { id: 't1', titulo: 'Control de acceso a una feria', quien: 'Supervisor de turno', voz: 'Necesito que apoyes el control de acceso a la feria de emprendimientos.', txt: 'El supervisor te encarga el control de acceso a una feria de emprendimientos amazónicos en el sector.', asig: ['VSC-03', 'VSC-05'], o: [
    { t: 'Organizar el ingreso, hacer revisión visual de bolsos solo con consentimiento, señalizar las rutas de evacuación y llevar el registro del aforo.', p: 2, fb: 'El control de accesos se hace con respeto, consentimiento y atención a la capacidad del lugar.', ef: { min: 12, seg: 6, conf: 4, doc: 1 } },
    { t: 'Dejar entrar a todos sin control porque es un evento familiar.', p: 1, fb: 'Facilita el ingreso, pero sin control del aforo ni rutas de evacuación aumenta el riesgo.', ef: { min: 4, seg: -2 } },
    { t: 'Revisar a la fuerza a los jóvenes que «tienen pinta sospechosa».', p: 0, fb: 'Seleccionar por apariencia es discriminatorio y la revisión forzada excede tus funciones.', ef: { min: 8, conf: -10, falta: 1 } }
  ]},
  { id: 't2', titulo: 'Parte de novedades del medio turno', quien: 'Supervisor de turno', voz: 'Envíame el parte de novedades de lo que va del turno.', txt: 'El supervisor te pide enviar el parte de novedades de la primera mitad del turno.', asig: ['VSC-05', 'VSC-03'], o: [
    { t: 'Redactar el parte con fecha, hora, lugar, hechos objetivos, personas involucradas, acciones tomadas y novedades pendientes, sin opiniones personales.', p: 2, fb: 'Un parte objetivo y completo es respaldo legal y sirve para el análisis del delito.', ef: { min: 10, doc: 2 } },
    { t: 'Enviar un audio por WhatsApp contando lo que pasó.', p: 1, fb: 'Comunica, pero no deja un registro formal y ordenado.', ef: { min: 3, doc: 0 } },
    { t: 'Escribir «sin novedad» para no perder tiempo.', p: 0, fb: 'Falsear el parte oculta hechos y puede generar responsabilidad.', ef: { min: 1, falta: 1 } }
  ]},
  { id: 't3', titulo: 'Botiquín y extintor de la caseta', quien: 'Supervisor de turno', voz: 'Revisa el botiquín y el extintor de la caseta, por favor.', txt: 'El supervisor te pide verificar el botiquín y el extintor del puesto de vigilancia.', asig: ['VSC-10'], o: [
    { t: 'Verificar fechas de caducidad, presión del extintor y faltantes del botiquín, registrar lo encontrado y solicitar la reposición.', p: 2, fb: 'El equipo de emergencia revisado y registrado está listo cuando se necesita.', ef: { min: 8, riesgo: -5, doc: 1 } },
    { t: 'Mirar rápidamente que estén en su lugar.', p: 1, fb: 'Estar en su lugar no garantiza que funcionen.', ef: { min: 2 } },
    { t: 'Firmar la hoja de revisión sin revisar nada.', p: 0, fb: 'Firmar sin verificar es falsear un registro.', ef: { min: 1, falta: 1, riesgo: 5 } }
  ]},
  { id: 't4', titulo: 'Pedido de grabaciones', quien: 'Ciudadano particular', voz: 'Pásame el video de las cámaras, quiero ver quién rayó mi carro.', txt: 'Un ciudadano exige que le entregues por WhatsApp la grabación de las cámaras para identificar a quien rayó su carro.', asig: ['VSC-08', 'VSC-11'], o: [
    { t: 'Explicarle que las grabaciones contienen datos personales y solo se entregan a la autoridad competente por requerimiento formal; orientarle a denunciar y registrar el pedido.', p: 2, fb: 'La Ley Orgánica de Protección de Datos Personales exige resguardar las imágenes; se entregan con registro y cadena de custodia.', ef: { min: 6, conf: 4, doc: 1 } },
    { t: 'Mostrarle el video en la pantalla, sin entregárselo.', p: 1, fb: 'No se entrega copia, pero igual se exponen datos de terceros sin autorización.', ef: { min: 4, conf: 4 } },
    { t: 'Pasarle el video por WhatsApp.', p: 0, fb: 'Difundir grabaciones expone datos personales y rompe la cadena de custodia.', ef: { min: 2, falta: 1 } }
  ]}
];

/* Imprevistos */
const EVENTOS = [
  { id: 'lluvia', txt: 'Cae un aguacero torrencial típico de Puyo: una alcantarilla se desborda y la gente corre a refugiarse.', voz: '¡Qué aguacero, se está inundando la esquina!', o: [
    { t: 'Señalizar la zona inundada, alejar a las personas del agua y del cableado, y reportar a la central y al ECU 911 para la gestión de riesgos.', p: 2, fb: 'Prevención de riesgos y reporte oportuno ante eventos naturales frecuentes en la Amazonía.', ef: { min: 10, seg: 6, doc: 1 } },
    { t: 'Refugiarse en la caseta hasta que pase la lluvia.', p: 0, fb: 'El sector queda sin atención justo cuando aumenta el riesgo.', ef: { min: 20, seg: -10 } }
  ]},
  { id: 'radio', txt: 'Tu radio se queda sin batería en medio del turno.', voz: 'Central, central… ¿me copia? Se cortó.', o: [
    { t: 'Usar el teléfono de respaldo para informar a la central, pedir una batería y registrar la novedad.', p: 2, fb: 'Mantener la comunicación es parte de la seguridad del agente.', ef: { min: 5, riesgo: -5, doc: 1 } },
    { t: 'Seguir el turno sin comunicación.', p: 0, fb: 'Sin comunicación aumentan tu riesgo y el tiempo de respuesta.', ef: { min: 0, riesgo: 15 } }
  ]},
  { id: 'apagon', txt: 'Un corte de energía apaga las cámaras y parte del alumbrado del sector.', voz: 'Se fue la luz y no hay imagen en las cámaras.', o: [
    { t: 'Intensificar las rondas a pie en los puntos críticos, usar linterna, reportar a la central y a la empresa eléctrica, y registrar la hora del corte.', p: 2, fb: 'Plan de contingencia: la vigilancia presencial compensa la falta de cámaras.', ef: { min: 12, seg: 6, doc: 1 } },
    { t: 'Cerrar la caseta y esperar a que vuelva la luz.', p: 0, fb: 'La oscuridad aumenta las oportunidades delictivas; el sector queda desprotegido.', ef: { min: 15, seg: -10 } }
  ]},
  { id: 'partido', txt: 'Un compañero te propone dejar el puesto media hora para ver el partido en un local cercano.', voz: 'Vamos, nadie se va a dar cuenta, es la final.', o: [
    { t: 'Rehusar con cortesía y mantener la cobertura del sector según la consigna.', p: 2, fb: 'Abandonar el puesto es una falta disciplinaria y deja a la comunidad sin protección.', ef: { min: 1 } },
    { t: 'Aceptar e ir con él.', p: 0, fb: 'Abandonar el puesto es una falta disciplinaria grave.', ef: { min: 30, seg: -12, falta: 1 } }
  ]},
  { id: 'prensa', txt: 'Un periodista local pide el nombre y la foto de la persona retenida esta tarde.', voz: 'Solo necesito el nombre y una foto para la nota.', o: [
    { t: 'Derivarlo a la vocería oficial de la empresa o de la Policía, sin entregar datos personales.', p: 2, fb: 'La información de personas retenidas es reservada; la presunción de inocencia y la protección de datos lo exigen.', ef: { min: 3, conf: 2 } },
    { t: 'Darle el nombre y enviarle la foto.', p: 0, fb: 'Difundir datos e imágenes vulnera la presunción de inocencia y la protección de datos personales.', ef: { min: 2, falta: 1 } }
  ]}
];

/* ---------------- BANCOS DE PREGUNTAS ---------------- */
function rndI(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function mezclar(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function mc(q, ok, malas, exp, asig) { const o = mezclar([ok, ...malas]); return { q, o, c: o.indexOf(ok), exp, asig }; }
const coma = n => String(n).replace('.', ',');
const miles = n => Math.round(n).toLocaleString('es-EC');
const r1 = n => Math.round(n * 10) / 10;

/* ⚖️ Protocolos y legislación */
const PRO_BANCO = [
  () => mc('En el uso progresivo de la fuerza, ¿cuál es el primer nivel?', 'La presencia del agente identificado y uniformado', ['El control físico', 'El uso del tolete', 'La aprehensión inmediata'], 'La sola presencia del agente disuade; luego vienen la verbalización y, solo si es necesario, niveles superiores.', 'VSC-04'),
  () => mc('Los principios que rigen el uso de la fuerza son…', 'Legalidad, necesidad y proporcionalidad', ['Rapidez, sorpresa y castigo', 'Autoridad, obediencia y disciplina', 'Experiencia, intuición y valor'], 'La fuerza solo se usa si la ley lo permite, si es necesaria y en la medida proporcional a la amenaza.', 'VSC-04'),
  () => mc('Una persona alterada acata tus indicaciones verbales y se retira. ¿Qué corresponde?', 'No pasar a ningún nivel superior de fuerza', ['Inmovilizarla para asegurarse', 'Esposarla por precaución', 'Retenerla hasta que llegue la Policía'], 'Si la verbalización logra el objetivo, cualquier fuerza adicional sería innecesaria y desproporcionada.', 'VSC-04'),
  () => mc('En vigilancia, la defensa personal tiene como objetivo…', 'Proteger la integridad propia y de terceros con el mínimo daño, y retirarse a un lugar seguro cuando sea posible', ['Ganar la pelea a toda costa', 'Castigar al agresor', 'Demostrar autoridad ante el público'], 'La defensa personal es protectora y proporcional, no punitiva.', 'VSC-04'),
  () => mc('Un vigilante presencia un delito flagrante. En términos generales, puede…', 'Aprehender a la persona y entregarla de inmediato a la Policía Nacional', ['Retenerla en la caseta hasta el día siguiente', 'Interrogarla y requisar su domicilio', 'Dejarla ir si devuelve lo robado y pide disculpas'], 'En flagrancia cualquier persona puede aprehender, pero debe entregar inmediatamente a la Policía; no puede retener ni investigar.', 'VSC-11'),
  () => mc('¿Cuál afirmación describe mejor la diferencia entre vigilancia privada y Policía Nacional?', 'El orden público y la investigación del delito son funciones de la Policía y la Fiscalía; la vigilancia privada es complementaria y actúa en su área asignada', ['El vigilante privado puede realizar allanamientos', 'El vigilante privado puede detener por sospechas durante días', 'No existe ninguna diferencia de funciones'], 'La seguridad privada colabora y previene, pero no reemplaza las competencias exclusivas del Estado.', 'VSC-11'),
  () => mc('La cadena de custodia sirve para…', 'Garantizar que los indicios se preserven, registren y entreguen sin alteraciones, dejando constancia de quién los manipula', ['Guardar los objetos encontrados para uno mismo', 'Publicar las pruebas en redes', 'Que el vigilante decida quién es culpable'], 'Sin cadena de custodia una evidencia puede perder valor en un proceso judicial.', 'VSC-11'),
  () => mc('Al llegar primero a la escena de un delito, el vigilante debe…', 'Preservar el lugar, no tocar ni mover indicios y aislar el área hasta que llegue la autoridad', ['Limpiar el lugar para que no se asuste la gente', 'Recoger los objetos y guardarlos en la caseta', 'Tomar fotos y subirlas a redes'], 'Preservar la escena es la principal contribución del primer respondiente a la investigación.', 'VSC-07'),
  () => mc('Una persona retenida en flagrancia tiene derecho a…', 'Un trato digno, sin tortura ni tratos crueles, y a no ser expuesta públicamente', ['Ser exhibida para escarmiento', 'Ser golpeada si se resiste verbalmente', 'Perder sus derechos por haber delinquido'], 'Los derechos humanos se respetan siempre, incluida la presunción de inocencia.', 'VSC-11'),
  () => mc('La secuencia básica de actuación en primeros auxilios es…', 'Proteger, Avisar, Socorrer (PAS)', ['Socorrer, Avisar, Proteger', 'Avisar y esperar sin hacer nada', 'Trasladar, Socorrer, Avisar'], 'Primero te proteges y proteges la escena, luego avisas al ECU 911 y después socorres.', 'VSC-10'),
  () => mc('En la RCP de un adulto, las compresiones torácicas deben hacerse a un ritmo de…', '100 a 120 por minuto', ['20 a 30 por minuto', '50 a 60 por minuto', '200 por minuto'], 'Compresiones fuertes y rápidas en el centro del pecho, permitiendo que el tórax se expanda.', 'VSC-10'),
  () => mc('Ante una hemorragia externa abundante en un brazo, lo primero es…', 'Aplicar presión directa sobre la herida con gasa o tela limpia', ['Lavar la herida con alcohol', 'Dar agua a la persona', 'Esperar a que deje de sangrar sola'], 'La presión directa controla la mayoría de hemorragias externas; usa guantes si es posible.', 'VSC-10'),
  () => mc('Un motociclista accidentado se queja de dolor en el cuello. ¿Qué haces?', 'No moverlo ni retirar el casco, salvo peligro inminente, y esperar a los servicios de emergencia', ['Quitarle el casco para que respire', 'Sentarlo en la vereda', 'Llevarlo en un taxi al hospital'], 'Mover a una persona con posible lesión de columna puede causar daño permanente.', 'VSC-10'),
  () => mc('Una persona inconsciente que respira con normalidad debe colocarse en…', 'Posición lateral de seguridad, vigilando su respiración', ['Posición sentada', 'Boca abajo con los brazos extendidos', 'De pie con apoyo'], 'La posición lateral mantiene la vía aérea despejada y evita la aspiración de vómito.', 'VSC-10'),
  () => mc('El número único para emergencias en Ecuador es…', '911 (Servicio Integrado de Seguridad ECU 911)', ['101', '102', '131'], 'El ECU 911 articula a Policía, bomberos, salud, tránsito y gestión de riesgos.', 'VSC-05'),
  () => mc('Un buen parte de novedades debe ser…', 'Objetivo y claro: fecha, hora, lugar, hechos, personas y acciones, sin opiniones personales', ['Breve: «sin novedad» basta siempre', 'Un relato con suposiciones sobre los culpables', 'Un audio informal por mensajería'], 'El parte es un documento de respaldo legal y fuente para el análisis del delito.', 'VSC-05'),
  () => mc('Durante un sismo en un centro comercial, la indicación correcta es…', 'Agacharse, cubrirse y sujetarse; luego evacuar por rutas señalizadas al punto de encuentro sin usar ascensores', ['Correr de inmediato hacia los ascensores', 'Quedarse junto a los ventanales', 'Volver a buscar pertenencias'], 'Es el protocolo general de autoprotección y evacuación ante sismos.', 'VSC-10'),
  () => mc('Según la Constitución, ¿quiénes forman parte de los grupos de atención prioritaria?', 'Niñas, niños y adolescentes, adultos mayores, personas con discapacidad y mujeres embarazadas, entre otros', ['Solo los turistas extranjeros', 'Las personas con más recursos', 'Únicamente los servidores públicos'], 'El vigilante debe brindarles atención preferente y especializada.', 'VSC-11'),
  () => mc('Un principio básico de la mediación de conflictos es…', 'La imparcialidad: el mediador no toma partido', ['Decidir quién tiene la razón', 'Imponer una multa al responsable', 'Grabar a las partes para publicar el caso'], 'La mediación es voluntaria, confidencial e imparcial; las partes construyen el acuerdo.', 'VSC-09'),
  () => mc('Sorprendes a un adolescente cometiendo una infracción. Lo correcto es…', 'Proteger su integridad, avisar a la Policía especializada en niñez y a sus representantes, y no exponerlo públicamente', ['Exhibirlo frente a los vecinos para que aprenda', 'Encerrarlo en la caseta sin avisar', 'Tratarlo como a un adulto y castigarlo'], 'El Código de la Niñez y Adolescencia protege la identidad y los derechos de los adolescentes.', 'VSC-11')
];

/* 🗺️ Ciberseguridad y análisis del delito (los 5 últimos son cálculos con datos aleatorios) */
const ANA_BANCO = [
  () => mc('En un mapa de calor del delito, las zonas de color más intenso indican…', 'Mayor concentración de incidentes registrados', ['Mayor temperatura ambiental', 'Zonas con más cámaras', 'Barrios con más habitantes'], 'El mapa de calor muestra la densidad de incidentes en el territorio.', 'VSC-08'),
  () => mc('Un «punto caliente» (hot spot) es…', 'Un área pequeña donde se concentra una proporción alta de delitos', ['Una zona sin alumbrado público', 'Una antena de internet', 'El lugar donde vive el delincuente'], 'Focalizar la prevención en puntos calientes mejora la eficiencia del patrullaje.', 'VSC-08'),
  () => mc('La geodiferenciación del delito consiste en…', 'Analizar cómo varía el delito según el lugar y el horario para focalizar la prevención', ['Dividir la ciudad según el nivel económico', 'Instalar cámaras en todas las calles', 'Perseguir a grupos sociales específicos'], 'El análisis espacio-temporal orienta rondas, iluminación y presencia preventiva.', 'VSC-08'),
  () => mc('¿Qué medida corresponde a la prevención situacional (diseño ambiental)?', 'Mejorar la iluminación y eliminar puntos ciegos para favorecer la vigilancia natural', ['Prohibir la entrada de jóvenes al parque', 'Aumentar las multas', 'Cerrar los espacios públicos'], 'Un entorno bien diseñado reduce las oportunidades de delito sin discriminar.', 'VSC-06'),
  () => mc('El phishing es…', 'Un engaño por correo o mensaje que suplanta a una entidad para robar contraseñas o datos', ['Un virus que daña la pantalla', 'Una técnica de patrullaje', 'Un tipo de cámara de seguridad'], 'Desconfía de mensajes urgentes con enlaces; verifica por el canal oficial.', 'VSC-08'),
  () => mc('¿Cuál es la contraseña más segura?', 'Una frase larga con mayúsculas, números y símbolos, distinta para cada cuenta', ['123456', 'Tu fecha de nacimiento', 'La misma clave corta para todo'], 'La longitud y la unicidad son las mejores defensas; usa un gestor de contraseñas.', 'VSC-08'),
  () => mc('La verificación en dos pasos (doble factor)…', 'Añade un segundo control, como un código en el celular, además de la contraseña', ['Reemplaza la necesidad de contraseña', 'Hace más lenta la computadora', 'Solo sirve para redes sociales'], 'Aunque roben tu contraseña, el atacante necesita el segundo factor.', 'VSC-08'),
  () => mc('Recibes un SMS: «Su cuenta será bloqueada, ingrese aquí sus datos». ¿Qué haces?', 'No abrir el enlace, verificar con la entidad por su canal oficial y reportar el mensaje', ['Ingresar rápido para no perder la cuenta', 'Reenviarlo a tus contactos', 'Responder con tu número de cédula'], 'Las entidades no piden claves por mensajes; es un intento de fraude.', 'VSC-08'),
  () => mc('Las grabaciones de las cámaras de videovigilancia…', 'Contienen datos personales: su acceso es restringido y se entregan solo a la autoridad competente', ['Pueden compartirse en redes si son graciosas', 'Pertenecen a cualquier vecino que las pida', 'Se borran apenas termina el turno sin registro'], 'La Ley Orgánica de Protección de Datos Personales obliga a resguardarlas.', 'VSC-03'),
  () => mc('Los registros muestran que la mayoría de hurtos ocurre entre las 18:00 y las 20:00 cerca de la parada de buses. ¿Qué haces?', 'Reforzar la presencia y las rondas en ese lugar y franja horaria', ['Patrullar solo por la mañana', 'Ignorar los datos y patrullar al azar', 'Retirar la vigilancia de esa zona'], 'El análisis por lugar y horario orienta la planificación operativa.', 'VSC-03'),
  () => mc('¿Cuál es la fuente más confiable para analizar la incidencia delictiva de un sector?', 'Los registros oficiales y los partes de novedades sistematizados', ['Los rumores del grupo de WhatsApp', 'La opinión de un solo vecino', 'Los comentarios en redes sociales'], 'Los datos verificables permiten conclusiones válidas.', 'VSC-01'),
  () => mc('¿Para qué sirve expresar los delitos como tasa por cada 100 000 habitantes?', 'Para comparar territorios con poblaciones de distinto tamaño', ['Para aumentar el número de delitos', 'Para ocultar los datos', 'Solo para ciudades de más de un millón de habitantes'], 'La tasa normaliza los casos por la población.', 'VSC-01'),
  // cálculos
  () => { const pob = 90751, c = rndI(110, 260); const t = r1(c / pob * 100000); return { q: `El cantón Pastaza tiene ${miles(pob)} habitantes (proyección 2026). Si en un año se registran ${c} robos, ¿cuál es la tasa por cada 100 000 habitantes? (un decimal)`, num: t, tol: 0.2, exp: `Tasa = ${c} ÷ ${miles(pob)} × 100 000 = ${coma(t)} robos por cada 100 000 habitantes.`, asig: 'VSC-08' }; },
  () => { const a = rndI(100, 160), b = a + rndI(-30, 70); const v = r1((b - a) / a * 100); return { q: `En un año se registraron ${a} robos en la provincia y al año siguiente ${b}. ¿Cuál es el porcentaje de variación? (un decimal; negativo si disminuyó)`, num: v, tol: 0.2, exp: `Variación = (${b} − ${a}) ÷ ${a} × 100 = ${coma(v)} %.`, asig: 'VSC-08' }; },
  () => { const t = Array.from({ length: 5 }, () => rndI(4, 18)); const p = r1(t.reduce((x, y) => x + y, 0) / t.length); return { q: `Los tiempos de llegada del apoyo a cinco incidentes fueron ${t.join(', ')} minutos. ¿Cuál es el tiempo de respuesta promedio? (un decimal)`, num: p, tol: 0.1, exp: `Promedio = (${t.join(' + ')}) ÷ 5 = ${coma(p)} min.`, asig: 'VSC-07' }; },
  () => { const f = [rndI(3, 10), rndI(5, 14), rndI(8, 20), rndI(12, 30)]; const tot = f.reduce((x, y) => x + y, 0); const p = r1(f[3] / tot * 100); return { q: `Incidentes del mes por franja horaria: 06:00–10:00 = ${f[0]}, 10:00–14:00 = ${f[1]}, 14:00–18:00 = ${f[2]} y 18:00–22:00 = ${f[3]}. ¿Qué porcentaje ocurrió entre las 18:00 y las 22:00? (un decimal)`, num: p, tol: 0.2, exp: `${f[3]} ÷ ${tot} × 100 = ${coma(p)} %. Esa franja requiere más presencia preventiva.`, asig: 'VSC-08' }; },
  () => { const n = rndI(4, 6); const r = Math.pow(10, n); return { q: `Un PIN de ${n} dígitos (0 al 9) protege el sistema de cámaras. ¿Cuántas combinaciones posibles existen?`, num: r, tol: 0, exp: `10 elevado a ${n} = ${miles(r)} combinaciones. Por eso una contraseña larga con letras y símbolos es mucho más segura que un PIN corto.`, asig: 'VSC-08' }; }
];

/* ---------------- CASOS PROFESIONALES ---------------- */
const CASOS_VIG = [
  {
    id: 'fuerza-excesiva', titulo: 'Un compañero quiere «darle una lección»',
    asignaturas: ['VSC-04', 'VSC-11'],
    persona: { nombre: 'Byron', rol: 'Compañero de turno con más antigüedad', avatar: '👮🏻‍♂️', pitch: 0.9 },
    contexto: 'Retuvieron en flagrancia a un joven que intentó robar una cartera en el mercado. Ya está quieto y no opone resistencia, pero tu compañero quiere golpearlo «para que no vuelva».',
    pasos: [
      { dice: 'Agárralo de los brazos, que le voy a dar unos golpes para que aprenda.', opciones: [
        { t: 'Me niego con firmeza: el joven ya no se resiste, cualquier golpe sería fuerza ilegal y desproporcionada; lo mantenemos retenido hasta entregarlo a la Policía.', p: 2, r: 'Bueno, bueno… tampoco es para tanto.', fb: 'Sin resistencia no hay necesidad ni proporcionalidad: el uso de la fuerza sería ilegal.' },
        { t: 'Le digo que mejor no, que nos pueden grabar.', p: 1, r: 'Ya, ya, entonces lo dejamos así.', fb: 'Evita la agresión, pero el motivo debe ser el respeto a los derechos, no el temor a ser grabado.' },
        { t: 'Lo sujeto; un par de golpes no le harán daño.', p: 0, r: 'Así me gusta.', fb: 'Participar en una agresión a una persona reducida es una grave violación de derechos humanos.' }
      ]},
      { dice: 'Tú eres nuevo. Así se hace aquí desde siempre.', opciones: [
        { t: 'Le respondo con respeto que el protocolo de uso progresivo de la fuerza y los derechos humanos nos protegen a todos, también a nosotros frente a denuncias.', p: 2, r: 'Mmm… la verdad no quiero problemas con la empresa.', fb: 'Argumentar con la norma y el protocolo es más eficaz que confrontar.' },
        { t: 'Me quedo callado para no tener problemas con él.', p: 1, r: '(Byron sigue molesto con el joven.)', fb: 'El silencio no detiene la conducta; hay que expresar la objeción.' },
        { t: 'Le digo que tiene razón, que la experiencia manda.', p: 0, r: 'Claro que sí.', fb: 'Normalizar la violencia perpetúa prácticas ilegales.' }
      ]},
      { dice: '(Llega la Policía. Después, Byron te pide que no menciones nada en el parte.)', opciones: [
        { t: 'Registro los hechos de manera objetiva en el parte e informo al supervisor de la intención de agresión, por los canales internos.', p: 2, r: '(El supervisor agradece el reporte y programa una capacitación.)', fb: 'Registrar con objetividad y reportar por canales formales previene futuras agresiones.' },
        { t: 'No lo registro, pero le advierto que la próxima vez lo reporto.', p: 1, r: 'Ya, gracias por cubrirme.', fb: 'Omitir hechos en el parte resta transparencia.' },
        { t: 'Escribo que el joven nos agredió para justificar cualquier cosa.', p: 0, r: '(Más tarde, una cámara contradice el parte.)', fb: 'Falsear un parte es una falta grave y puede constituir delito.' }
      ]}
    ]
  },
  {
    id: 'dadiva-comerciante', titulo: 'Dinero para cuidar «solo mi local»',
    asignaturas: ['VSC-11', 'VSC-06'],
    persona: { nombre: 'Don Ernesto', rol: 'Comerciante del centro comercial', avatar: '🧔🏻', pitch: 0.95 },
    contexto: 'Un comerciante te ofrece dinero cada semana para que vigiles solo su local y «ahuyentes» a los vendedores informales que se ponen cerca.',
    pasos: [
      { dice: 'Mire, le doy veinte dólares a la semana y usted se para solo frente a mi local. ¿Trato hecho?', opciones: [
        { t: 'Rechazo el dinero con respeto y le explico que mi servicio protege a todo el sector por igual según la consigna; no puedo recibir pagos de terceros.', p: 2, r: 'Bueno, solo era una ayudita…', fb: 'Aceptar dádivas compromete la imparcialidad y es una falta ética y legal.' },
        { t: 'Le digo que lo pensaré.', p: 1, r: 'Piénselo, la oferta sigue en pie.', fb: 'Dejar abierta la posibilidad alimenta la expectativa de un trato irregular.' },
        { t: 'Acepto; igual paso por ahí.', p: 0, r: 'Perfecto, cada lunes le doy.', fb: 'Recibir pagos por un trato preferente es corrupción.' }
      ]},
      { dice: 'Es que los ambulantes me espantan a los clientes. ¡Bótelos a la fuerza!', opciones: [
        { t: 'Le explico que el control del espacio público lo hacen los agentes municipales; puedo coordinar con ellos y orientar con respeto a los vendedores.', p: 2, r: 'Ya, entonces hable con el municipio.', fb: 'Cada institución tiene sus competencias; la vigilancia orienta y coordina.' },
        { t: 'Les pido a los vendedores que se vayan, sin explicar nada.', p: 1, r: '(Los vendedores se molestan.)', fb: 'Sin orientación ni coordinación, el conflicto se repite.' },
        { t: 'Los saco empujando para quedar bien con él.', p: 0, r: '(Se arma un altercado.)', fb: 'El uso de la fuerza sin necesidad es ilegal y discriminatorio.' }
      ]},
      { dice: '(Don Ernesto insiste cada semana y se queja de ti con otros comerciantes.)', opciones: [
        { t: 'Registro los ofrecimientos en el parte, informo al supervisor y propongo una reunión con los comerciantes para coordinar la seguridad del sector.', p: 2, r: '(El supervisor organiza la reunión.)', fb: 'Documentar y llevar el tema a un espacio colectivo transforma el problema en prevención comunitaria.' },
        { t: 'Evito pasar por su local.', p: 1, r: '(Su local queda menos vigilado.)', fb: 'Evitar el conflicto deja un punto sin cobertura.' },
        { t: 'Le cobro menos para que deje de quejarse.', p: 0, r: 'Así nos entendemos.', fb: 'Negociar una dádiva sigue siendo corrupción.' }
      ]}
    ]
  },
  {
    id: 'adolescente-hurto', titulo: 'Un adolescente sorprendido hurtando',
    asignaturas: ['VSC-11', 'VSC-02', 'VSC-07'],
    persona: { nombre: 'Kevin', rol: 'Adolescente de 15 años', avatar: '🧑🏽', pitch: 1.2 },
    contexto: 'En una tienda del centro comercial retienes a Kevin, de 15 años, con dos chocolates sin pagar. El dueño exige llamarlo ladrón frente a todos.',
    pasos: [
      { dice: '¡Suélteme! ¡No hice nada! ¡No llame a mi mamá!', opciones: [
        { t: 'Le hablo con calma, lo llevo a un lugar reservado sin exponerlo, le explico lo que sucede y le aseguro que nadie lo va a lastimar.', p: 2, r: '(Kevin baja la voz y deja de forcejear.)', fb: 'Protección de la identidad y trato adecuado a la edad: así lo exige el Código de la Niñez y Adolescencia.' },
        { t: 'Lo retengo en la puerta de la tienda mientras llega alguien.', p: 1, r: '(La gente se queda mirando.)', fb: 'Retenerlo en un lugar público lo expone innecesariamente.' },
        { t: 'Le grito «ladrón» y lo dejo a la vista para que sirva de ejemplo.', p: 0, r: '(Kevin llora; alguien empieza a grabar.)', fb: 'Exponer a un adolescente vulnera su dignidad y su derecho a la imagen.' }
      ]},
      { dice: 'Es que en mi casa no hay nada que comer…', opciones: [
        { t: 'Lo escucho sin juzgar, aviso a la Policía especializada en niñez y adolescencia y pido que se contacte a sus representantes; anoto la situación de vulnerabilidad.', p: 2, r: 'Bueno… mi mamá trabaja en el mercado.', fb: 'Se respeta el debido proceso y se identifica una posible situación de riesgo social.' },
        { t: 'Le digo que pague y lo dejo ir.', p: 1, r: 'No tengo plata…', fb: 'No se activa la protección ni se informa a sus representantes.' },
        { t: 'Le digo que eso no es excusa y que se va preso como un adulto.', p: 0, r: '(Kevin se asusta más.)', fb: 'Los adolescentes tienen un régimen especial; amenazarlo es inadecuado.' }
      ]},
      { dice: '(Llegan su madre y la Policía. El dueño quiere publicar la foto de Kevin en la página de la tienda.)', opciones: [
        { t: 'Explico al dueño que está prohibido difundir la imagen de un adolescente, registro los hechos en el parte y entrego el caso a la autoridad.', p: 2, r: 'No sabía que era prohibido…', fb: 'La identidad de niñas, niños y adolescentes está protegida por ley.' },
        { t: 'Le digo que publique la foto pero con la cara borrosa.', p: 1, r: 'Ya, la pongo así.', fb: 'Aun difuminada, la publicación puede identificarlo; lo correcto es no difundir.' },
        { t: 'Le paso la foto que tomé con mi celular.', p: 0, r: '(La foto se viraliza.)', fb: 'Difundir la imagen de un adolescente es una grave vulneración de derechos.' }
      ]}
    ]
  },
  {
    id: 'violencia-intrafamiliar', titulo: 'Una vecina denuncia violencia en casa',
    asignaturas: ['VSC-11', 'VSC-09', 'VSC-06'],
    persona: { nombre: 'Sra. Maritza', rol: 'Vecina del barrio', avatar: '👩🏽‍🦱', pitch: 1.1 },
    contexto: 'Durante la ronda nocturna, una vecina se acerca nerviosa: escucha gritos y golpes en la casa de al lado, donde vive una mujer con sus dos hijos.',
    pasos: [
      { dice: 'Agente, otra vez están gritando en la casa de al lado y se escuchan golpes. Tengo miedo por la señora y los niños.', opciones: [
        { t: 'Le agradezco, tomo la dirección y los detalles, y llamo de inmediato al ECU 911 para que acuda la Policía; me quedo cerca observando sin poner a nadie en riesgo.', p: 2, r: 'Gracias, por favor que vengan rápido.', fb: 'La violencia intrafamiliar requiere la intervención inmediata de la Policía a través del ECU 911.' },
        { t: 'Voy solo a tocar la puerta para calmar la situación.', p: 1, r: 'Tenga cuidado, el señor es agresivo.', fb: 'La intención es buena, pero ir solo te expone y puede agravar la situación sin la autoridad.' },
        { t: 'Le digo que esos son problemas de pareja y que no nos metamos.', p: 0, r: '¿Y si le pasa algo?', fb: 'La violencia doméstica no es un asunto privado: es un delito y vulnera derechos.' }
      ]},
      { dice: '(Una niña sale corriendo de la casa y se refugia junto a ti, llorando.)', opciones: [
        { t: 'La protejo en un lugar seguro, le hablo con calma sin interrogarla y espero a la Policía; informo al operador del ECU 911 que hay niños en riesgo.', p: 2, r: '(La niña se tranquiliza un poco.)', fb: 'Protección inmediata del menor y aviso a las autoridades especializadas.' },
        { t: 'Le pregunto con detalle qué le hace su papá.', p: 1, r: '(La niña llora más.)', fb: 'Interrogar a un menor puede revictimizarla; eso lo hacen profesionales especializados.' },
        { t: 'Le digo que regrese a su casa con su mamá.', p: 0, r: '(La niña tiembla.)', fb: 'Devolverla a un entorno de violencia la pone en peligro.' }
      ]},
      { dice: '(La Policía interviene. La vecina pregunta qué más pueden hacer.)', opciones: [
        { t: 'Le informo que puede declarar como testigo y que existen la Junta Cantonal de Protección de Derechos, la Fiscalía y el 911; registro la novedad con reserva.', p: 2, r: 'Gracias, así sabremos a dónde acudir.', fb: 'Orientar sobre las rutas de protección y registrar con confidencialidad fortalece la respuesta comunitaria.' },
        { t: 'Le digo que ya está, que la Policía se encarga.', p: 1, r: 'Ah, bueno…', fb: 'Es cierto, pero falta orientar sobre las rutas de protección.' },
        { t: 'Comento lo sucedido en el grupo del barrio con nombres.', p: 0, r: '(La familia queda expuesta.)', fb: 'Difundir la situación vulnera la intimidad y puede poner en riesgo a la víctima.' }
      ]}
    ]
  },
  {
    id: 'video-detenido', titulo: 'El video de un detenido en redes',
    asignaturas: ['VSC-08', 'VSC-11'],
    persona: { nombre: 'Jessica', rol: 'Compañera vigilante', avatar: '👩🏻', pitch: 1.15 },
    contexto: 'Tu compañera grabó con su celular la aprehensión de un presunto ladrón en el parque y quiere subir el video a TikTok «para que la gente vea que trabajamos».',
    pasos: [
      { dice: '¡Mira el video! Lo subo ya, seguro se hace viral.', opciones: [
        { t: 'Le pido que no lo publique: expone la imagen de una persona que se presume inocente, sus datos personales y puede afectar la investigación.', p: 2, r: 'Mmm… no lo había pensado así.', fb: 'La presunción de inocencia y la protección de datos personales prohíben exponer a la persona.' },
        { t: 'Le digo que lo suba, pero sin etiquetar a la empresa.', p: 1, r: 'Ya, lo subo sin nombre.', fb: 'Sin etiqueta, igual se vulneran los derechos de la persona grabada.' },
        { t: 'Le digo que lo suba y que también ponga su nombre.', p: 0, r: '¡Listo!', fb: 'Exponer nombre e imagen de un detenido vulnera derechos y puede constituir infracción.' }
      ]},
      { dice: 'Pero el video puede servir como prueba, ¿no?', opciones: [
        { t: 'Sí: lo guardamos sin editar, registramos fecha, hora y quién lo grabó, y lo entregamos solo a la Policía o a la Fiscalía con cadena de custodia.', p: 2, r: 'Perfecto, lo entrego así.', fb: 'Un video puede ser evidencia si se preserva íntegro y se entrega formalmente.' },
        { t: 'Lo editamos para que se vea mejor y lo entregamos.', p: 1, r: 'Le pongo música…', fb: 'Editar el video altera la evidencia y le resta valor.' },
        { t: 'Mejor lo borramos para no tener problemas.', p: 0, r: 'Ya lo borré.', fb: 'Destruir una posible evidencia perjudica la investigación.' }
      ]},
      { dice: '(Otro compañero ya compartió el video en un grupo de chat de la empresa.)', opciones: [
        { t: 'Informo al supervisor, pido que se elimine de los chats y propongo un protocolo interno sobre uso de celulares y grabaciones.', p: 2, r: '(El supervisor emite una disposición interna.)', fb: 'La gestión institucional evita nuevas filtraciones y protege a la empresa y a las personas.' },
        { t: 'Le escribo al compañero que lo borre, sin avisar a nadie más.', p: 1, r: 'Ya, lo borro.', fb: 'Ayuda, pero no previene que vuelva a ocurrir.' },
        { t: 'Lo reenvío a mis amigos; total, ya circula.', p: 0, r: '(El video llega a medios locales.)', fb: 'Cada reenvío amplía el daño.' }
      ]}
    ]
  },
  {
    id: 'asamblea-barrial', titulo: 'Plan de seguridad en la asamblea barrial',
    asignaturas: ['VSC-06', 'VSC-01', 'VSC-08'],
    persona: { nombre: 'Don Segundo Gualinga', rol: 'Presidente del barrio', avatar: '👨🏽‍🦳', pitch: 0.9 },
    contexto: 'El barrio Obrero de Puyo te invita a su asamblea para construir un plan de seguridad comunitaria. Algunos vecinos proponen «hacer justicia por mano propia».',
    pasos: [
      { dice: 'Agente, la gente está cansada de los robos. ¿Por dónde empezamos el plan?', opciones: [
        { t: 'Propongo empezar con un diagnóstico participativo: un mapa del barrio donde los vecinos marquen lugares y horarios de riesgo, y revisar los datos de novedades.', p: 2, r: 'Buena idea, así todos participan.', fb: 'El diagnóstico participativo y el mapeo de riesgos son la base de un plan comunitario.' },
        { t: 'Les digo que pongan más cámaras y listo.', p: 1, r: '¿Y quién las paga y las mira?', fb: 'La tecnología ayuda, pero sin diagnóstico ni organización es insuficiente.' },
        { t: 'Les digo que la seguridad es solo trabajo de la Policía.', p: 0, r: 'Entonces, ¿para qué vino?', fb: 'La seguridad ciudadana es corresponsabilidad entre Estado y comunidad.' }
      ]},
      { dice: 'Un vecino grita: «¡Si agarramos a un ladrón, lo amarramos y le damos su merecido!».', opciones: [
        { t: 'Explico con calma que la justicia por mano propia es un delito y vulnera derechos; propongo una red de alerta con el ECU 911 y la Policía.', p: 2, r: '(Varios vecinos asienten.)', fb: 'Se reorienta la indignación hacia mecanismos legales y eficaces.' },
        { t: 'Cambio de tema para evitar la discusión.', p: 1, r: '(El vecino sigue insistiendo.)', fb: 'Evitar el tema deja la idea sin respuesta.' },
        { t: 'Le digo que lo entiendo y que a veces es necesario.', p: 0, r: '(La asamblea aplaude.)', fb: 'Avalar el linchamiento es ilegal y peligroso.' }
      ]},
      { dice: 'Bien, ¿qué acciones concretas ponemos en el plan?', opciones: [
        { t: 'Propongo acciones con responsables y fechas: mejorar la iluminación, recuperar el parque, alarmas comunitarias, rondas coordinadas, charlas de prevención y una evaluación mensual.', p: 2, r: '¡Eso, con responsables y fechas!', fb: 'Un plan con acciones, responsables, cronograma e indicadores permite el seguimiento.' },
        { t: 'Que cada vecino se cuide como pueda.', p: 1, r: 'Así estamos ahora…', fb: 'Sin organización colectiva no hay plan.' },
        { t: 'Que armen grupos de vecinos armados.', p: 0, r: '(Algunos se asustan.)', fb: 'Las armas en manos de civiles sin control aumentan la violencia y es ilegal.' }
      ]}
    ]
  }
];
