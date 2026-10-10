/* Prácticas por asignatura – Vigilancia y Seguridad Ciudadana (PAO 2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== VSC-07 Protocolos y Procedimientos de Seguridad Ciudadana II ===================== */
  {
    id: 'asig-VSC-07', cod: 'VSC-07',
    titulo: 'Concierto de las fiestas de Puyo y una extorsión',
    asignaturas: ['VSC-07'],
    persona: { nombre: 'Lcdo. Fernando Vargas', rol: 'Coordinador de seguridad del concierto en el Coliseo de Puyo', avatar: '🧑🏽‍💼', pitch: 0.95 },
    contexto: 'Por las fiestas de fundación de Puyo se realiza un concierto masivo en el coliseo. Formas parte del dispositivo de seguridad privada. Durante el evento, un comerciante te cuenta que lo están extorsionando por teléfono.',
    objetivo: 'Practica: protocolos de control de multitudes y eventos masivos, control de accesos y perímetros, actuación ante amenazas como la extorsión con activación de la cadena de alerta, y evaluación con listas de verificación e indicadores.',
    pasos: [
      { dice: 'Faltan dos horas para abrir las puertas. ¿Qué revisas en tu sector del dispositivo?', opciones: [
          { t: 'Verifico con la lista de chequeo el aforo autorizado, los puntos de control de acceso, el perímetro, las rutas de evacuación despejadas, la ubicación de la ambulancia y la comunicación por radio con el puesto de mando.', p: 2, r: 'Excelente, así trabajamos con orden.', fb: 'La planificación del dispositivo para eventos masivos gestiona los riesgos colectivos antes de que ocurran.' },
          { t: 'Espero a que llegue la gente y veo qué pasa.', p: 1, r: 'Hay que anticiparse.', fb: 'Sin planificación previa los riesgos colectivos se multiplican.' },
          { t: 'Cierro una salida de emergencia para controlar mejor el ingreso.', p: 0, r: '¡Eso es peligrosísimo!', fb: 'Bloquear salidas de emergencia pone en riesgo vidas en caso de evacuación.' } ] },
      { dice: '(Un comerciante del patio de comidas, nervioso:) «Me llaman diciendo que si no pago una vacuna hoy, me queman el puesto».', opciones: [
          { t: 'Lo llevo a un lugar reservado, le recomiendo no pagar ni negociar, conservar las llamadas y mensajes, y activo la cadena de alerta: aviso al coordinador y llamamos al ECU 911 para que intervenga la unidad especializada de la Policía.', p: 2, r: 'Gracias, no sabía qué hacer.', fb: 'Ante una extorsión se activa la cadena institucional de alerta y se preservan los registros, sin exceder el ámbito de la vigilancia.' },
          { t: 'Le digo que pague para evitar problemas.', p: 1, r: '¿Y si vuelven a pedir?', fb: 'Pagar suele aumentar las exigencias y no se reporta el delito.' },
          { t: 'Le pido el número y llamo yo a amenazar al extorsionador.', p: 0, r: '(La situación se vuelve más peligrosa.)', fb: 'Investigar o confrontar al delincuente excede tus funciones y aumenta el riesgo.' } ] },
      { dice: 'El concierto terminó. ¿Cómo evaluamos el dispositivo?', opciones: [
          { t: 'Con la lista de verificación y los indicadores: tiempo de ingreso, incidentes atendidos, tiempo de evacuación y novedades; propongo mejoras para actualizar el protocolo.', p: 2, r: 'Con eso mejoramos para el próximo evento.', fb: 'La mejora continua de los protocolos se basa en indicadores y retroalimentación.' },
          { t: 'Decimos que todo salió bien y nos vamos.', p: 1, r: 'Sin datos no aprendemos.', fb: 'Sin evaluación no hay mejora.' },
          { t: 'Borramos los registros de incidentes para que la empresa quede bien.', p: 0, r: 'Eso es ocultar información.', fb: 'Ocultar novedades impide mejorar y es una falta.' } ] }
    ],
    vivo: {
      lugar: 'Coliseo de Puyo durante el concierto de las fiestas', fondo: 'exterior',
      inicio: { confianza: 50, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '✅', t: 'Recorrer el sector con la lista de chequeo', p: 2, fb: 'La lista de chequeo asegura que nada se olvide.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚪', t: 'Comprobar que las salidas de emergencia están libres', p: 2, fb: 'Las salidas libres son vitales en una evacuación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '⏳', t: 'Esperar a que llegue el público', p: 1, fb: 'No te anticipas a los riesgos.', efecto: { confianza: 0, tension: 4 } },
            { icono: '🔒', t: 'Encadenar una salida de emergencia', p: 0, fb: 'Pone en riesgo vidas.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Aforo y control de accesos', claves: ['aforo', 'acceso', 'puntos de control', 'ingreso', 'entrada'] },
            { n: 'Perímetro y rutas de evacuación', claves: ['perimetro', 'rutas de evacuacion', 'salidas', 'evacuacion', 'despejad'] },
            { n: 'Coordinación con el puesto de mando', claves: ['radio', 'puesto de mando', 'ambulancia', 'coordin', 'lista de chequeo'] }
          ],
          evitar: [ { claves: ['cierro la salida', 'encadeno'], fb: 'Las salidas de emergencia nunca se bloquean.' } ],
          modelo: 'Con la lista de chequeo verifico el aforo autorizado, los puntos de control de acceso, el perímetro, las rutas de evacuación despejadas, la ambulancia y la comunicación por radio con el puesto de mando.'
        },
        {
          acciones: [
            { icono: '🤫', t: 'Llevar al comerciante a un lugar reservado', p: 2, fb: 'La reserva protege a la víctima.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📞', t: 'Avisar al coordinador y llamar al ECU 911', p: 2, fb: 'Se activa la cadena institucional de alerta.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💸', t: 'Aconsejarle que pague la «vacuna»', p: 1, fb: 'Aumenta las exigencias y no se reporta.', efecto: { confianza: 2, tension: 4 } },
            { icono: '☎️', t: 'Llamar tú al extorsionador para amenazarlo', p: 0, fb: 'Excede tus funciones y aumenta el riesgo.', efecto: { confianza: -12, tension: 15 } }
          ],
          conceptos: [
            { n: 'No pagar ni negociar', claves: ['no pague', 'no pagar', 'no negocie', 'no negociar', 'no ceda'] },
            { n: 'Conservar los registros', claves: ['conserve', 'conservar', 'llamadas', 'mensajes', 'capturas', 'no borre'] },
            { n: 'Activar la cadena de alerta', claves: ['cadena de alerta', 'coordinador', 'ecu 911', 'policia', 'unidad especializada', 'denuncia'] }
          ],
          evitar: [ { claves: ['pague nomas', 'yo lo llamo', 'lo voy a buscar'], fb: 'No se paga ni se confronta al extorsionador.' } ],
          modelo: 'Le recomiendo no pagar ni negociar, y conservar las llamadas y los mensajes. Activo la cadena de alerta: aviso al coordinador y llamamos al ECU 911 para que intervenga la unidad especializada de la Policía.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Completar la lista de verificación final', p: 2, fb: 'Permite comparar lo planificado con lo ejecutado.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📊', t: 'Calcular los indicadores del evento', p: 2, fb: 'Los indicadores muestran qué mejorar.', efecto: { confianza: 8, tension: -4 } },
            { icono: '👌', t: 'Reportar solo «todo salió bien»', p: 1, fb: 'Sin datos no hay mejora.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🗑️', t: 'Borrar los registros de incidentes', p: 0, fb: 'Es ocultar información.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Usa la lista de verificación', claves: ['lista de verificacion', 'lista de chequeo', 'checklist', 'verificacion', 'lo planificado'] },
            { n: 'Mide indicadores', claves: ['indicador', 'tiempo de ingreso', 'incidentes', 'tiempo de evacuacion', 'novedades'] },
            { n: 'Propone mejoras al protocolo', claves: ['mejora', 'actualizar', 'protocolo', 'retroalimenta', 'proximo evento'] }
          ],
          evitar: [ { claves: ['borrar los registros', 'ocultar'], fb: 'Las novedades no se ocultan.' } ],
          modelo: 'Evaluamos con la lista de verificación y los indicadores: tiempo de ingreso, incidentes atendidos, tiempo de evacuación y novedades. Con eso propongo mejoras para actualizar el protocolo.'
        }
      ]
    }
  },

  /* ===================== VSC-08 Ciberseguridad y Geodiferenciación del Delito ===================== */
  {
    id: 'asig-VSC-08', cod: 'VSC-08',
    titulo: 'El mapa de calor del centro de Puyo',
    asignaturas: ['VSC-08'],
    persona: { nombre: 'Ing. Daniela Freire', rol: 'Jefa de monitoreo de una empresa de seguridad', avatar: '👩🏻‍💻', pitch: 1.1 },
    contexto: 'En la central de monitoreo, la jefa te muestra el mapa de calor de los hurtos del último mes en el centro de Puyo y te pide proponer acciones. Además, llega un correo sospechoso al sistema de cámaras.',
    objetivo: 'Practica: SIG y mapas de calor (QGIS, mapas de incidencia del ECU 911), distribución espacial y horaria de la criminalidad, y ciberdelitos como el phishing: conservar los registros y reportar a la instancia competente.',
    pasos: [
      { dice: 'Cargamos en QGIS las coordenadas de los partes y generamos el mapa de calor: el punto más rojo está en el Paseo Turístico, entre las 18:00 y las 21:00. ¿Qué propones?', opciones: [
          { t: 'Reforzar la presencia preventiva en ese lugar y franja horaria, y proponer al municipio mejorar la iluminación y eliminar puntos ciegos.', p: 2, r: 'Bien: focalizas recursos donde y cuando ocurre el delito.', fb: 'La geodiferenciación orienta el patrullaje y la prevención situacional.' },
          { t: 'Patrullar todo el centro por igual, todo el día.', p: 1, r: 'No tenemos personal para todo.', fb: 'Sin focalización se desperdician recursos.' },
          { t: 'Prohibir que los jóvenes caminen por el paseo en la noche.', p: 0, r: 'Eso es discriminatorio.', fb: 'Restringir derechos de un grupo no es prevención.' } ] },
      { dice: 'Hubo 60 hurtos en el mes y 24 fueron en esa franja. ¿Qué porcentaje representa?', opciones: [
          { t: 'Es el 40 por ciento: 24 dividido para 60 por 100. Casi la mitad ocurre en solo tres horas.', p: 2, r: 'Exacto, ese dato justifica la propuesta.', fb: '24 ÷ 60 × 100 = 40 %. El dato cuantitativo sustenta la decisión.' },
          { t: 'Es más o menos la mitad.', p: 1, r: 'Aproximado, pero necesitamos la cifra.', fb: 'La estimación no es precisa: el valor es 40 %.' },
          { t: 'Es el 24 por ciento.', p: 0, r: 'No, 24 son casos, no porcentaje.', fb: 'Confundir frecuencia con porcentaje lleva a errores de análisis.' } ] },
      { dice: '(Llega un correo: «Actualice urgente su contraseña del sistema de cámaras en este enlace».) ¿Qué hacemos?', opciones: [
          { t: 'No abro el enlace; conservo el correo como evidencia, verifico con el proveedor por su canal oficial, lo reporto al área de sistemas (y a la Fiscalía si hubo fraude), cambio la contraseña por una robusta y activo el doble factor.', p: 2, r: 'Perfecto, eso protege las grabaciones.', fb: 'Ante el phishing: no hacer clic, verificar, reportar y reforzar la autenticación.' },
          { t: 'Lo borro sin avisar a nadie.', p: 1, r: 'Bien que no lo abriste, pero hay que reportarlo.', fb: 'Borrarlo evita el riesgo personal, pero otros podrían caer.' },
          { t: 'Entro al enlace y pongo la clave para no perder el acceso.', p: 0, r: '¡Acabas de entregar la clave a un atacante!', fb: 'Entregar credenciales expone el sistema y los datos personales grabados.' } ] }
    ],
    vivo: {
      lugar: 'Central de monitoreo de una empresa de seguridad, Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Señalar el punto caliente en el mapa', p: 2, fb: 'Identificar el punto caliente orienta la acción.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💡', t: 'Redactar pedido de iluminación al municipio', p: 2, fb: 'La prevención situacional reduce oportunidades.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔁', t: 'Repartir el patrullaje igual en todo el centro', p: 1, fb: 'Sin focalizar se desperdician recursos.', efecto: { confianza: 0, tension: 2 } },
            { icono: '⛔', t: 'Proponer prohibir el paso a jóvenes de noche', p: 0, fb: 'Es discriminatorio.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Focaliza lugar y horario', claves: ['paseo turistico', 'lugar', 'horario', 'franja', 'entre las', 'punto caliente', '18'] },
            { n: 'Refuerza la presencia preventiva', claves: ['presencia', 'patrullaje', 'rondas', 'reforzar', 'vigilancia', 'focaliz'] },
            { n: 'Propone prevención situacional', claves: ['iluminacion', 'puntos ciegos', 'luminarias', 'diseno', 'entorno', 'municipio'] }
          ],
          evitar: [ { claves: ['prohibir a los jovenes', 'que no salgan'], fb: 'Restringir derechos no es prevención.' } ],
          modelo: 'Propongo reforzar la presencia preventiva y las rondas en el Paseo Turístico en la franja de 18:00 a 21:00, y pedir al municipio mejorar la iluminación y eliminar puntos ciegos.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Hacer la división en la calculadora', p: 2, fb: 'El cálculo preciso sustenta la decisión.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📈', t: 'Agregar el porcentaje al informe', p: 2, fb: 'Comunicar el dato convence con evidencia.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👁️', t: 'Calcular «a ojo»', p: 1, fb: 'La estimación no es precisa.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🔢', t: 'Escribir 24 % en el informe', p: 0, fb: 'Confunde frecuencia con porcentaje.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Da el resultado correcto', claves: ['40', 'cuarenta', '40 por ciento', 'cuarenta por ciento', 'es el 40', 'el 40'] },
            { n: 'Explica el procedimiento', claves: ['24', 'dividido', 'divido', '60', 'por 100', 'por cien', 'sobre 60'] },
            { n: 'Interpreta el dato', claves: ['casi la mitad', 'concentra', 'tres horas', 'franja', 'mayor parte', 'justifica'] }
          ],
          evitar: [ { claves: ['24 por ciento', 'veinticuatro por ciento'], fb: 'El resultado es 40 %, no 24 %.' } ],
          modelo: 'Es el 40 por ciento: 24 dividido para 60, por 100. Casi la mitad de los hurtos se concentra en solo tres horas.'
        },
        {
          acciones: [
            { icono: '🎣', t: 'Marcar el correo como phishing y reportarlo', p: 2, fb: 'Reportar protege a toda la organización.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔐', t: 'Cambiar la clave y activar el doble factor', p: 2, fb: 'La autenticación reforzada impide accesos no autorizados.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🗑️', t: 'Borrar el correo sin avisar', p: 1, fb: 'Otros podrían caer.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🖱️', t: 'Hacer clic en el enlace e ingresar la clave', p: 0, fb: 'Entrega las credenciales al atacante.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'No abre el enlace', claves: ['no abro', 'no hago clic', 'no entro al enlace', 'no descargo', 'no ingreso', 'sospechoso'] },
            { n: 'Conserva el registro y reporta el ciberdelito', claves: ['phishing', 'conservo', 'evidencia', 'reporto', 'fiscalia', 'canal oficial', 'sistemas'] },
            { n: 'Refuerza la contraseña y la autenticación', claves: ['contrasena', 'clave robusta', 'doble factor', 'dos pasos', 'autenticacion', 'cambio la clave'] }
          ],
          evitar: [ { claves: ['pongo la clave', 'entro al link', 'ingreso mis datos'], fb: 'Nunca entregues credenciales por un enlace.' } ],
          modelo: 'No abro el enlace ni descargo nada. Es un intento de phishing: conservo el correo como evidencia, lo reporto al área de sistemas y, si hubo fraude, a la Fiscalía; cambio la contraseña por una robusta y activo el doble factor.'
        }
      ]
    }
  },

  /* ===================== VSC-09 Mediación de Conflictos y Trato al Ciudadano ===================== */
  {
    id: 'asig-VSC-09', cod: 'VSC-09',
    titulo: 'Mediación entre vecinos por ruido y parqueo',
    asignaturas: ['VSC-09'],
    persona: { nombre: 'Don Hugo Cerda', rol: 'Vecino del conjunto habitacional Los Ceibos', avatar: '👨🏽‍🦳', pitch: 0.9 },
    contexto: 'Don Hugo y su vecina, la señora Paola, discuten desde hace semanas por la música alta y un carro que bloquea la entrada. La administración del conjunto te pide facilitar una mediación en la caseta.',
    objetivo: 'Practica: principios y marco legal de la mediación en el Ecuador, comunicación efectiva, escucha activa y desescalamiento, fases del protocolo de mediación vecinal con documentación básica y derivación a la instancia competente.',
    pasos: [
      { dice: '¡Yo no me siento con esa señora! Ella es la del problema.', opciones: [
          { t: 'Les doy la bienvenida, explico que la mediación es voluntaria, confidencial e imparcial, como la reconoce la normativa ecuatoriana, y acordamos reglas: hablar por turnos, sin insultos y con respeto.', p: 2, r: 'Bueno… si es así, la escucho.', fb: 'Presentar el proceso y las reglas genera un espacio seguro para dialogar.' },
          { t: 'Les pido que se calmen y empiecen a hablar.', p: 1, r: '(Ambos hablan al mismo tiempo.)', fb: 'Sin reglas claras la conversación se desordena.' },
          { t: 'Le digo que si no colabora, llamo a la Policía para que lo saquen.', p: 0, r: '¡Encima me amenaza!', fb: 'Amenazar rompe la confianza y la voluntariedad.' } ] },
      { dice: 'Ella pone música hasta medianoche y yo me levanto a las cinco para trabajar.', opciones: [
          { t: 'Lo escucho sin interrumpir y parafraseo: «usted necesita descansar porque madruga». Luego escucho igual a la señora Paola.', p: 2, r: 'Exacto, eso es lo que necesito.', fb: 'La escucha activa y el parafraseo revelan los intereses detrás de las posiciones.' },
          { t: 'Le doy la razón: la música alta molesta a todos.', p: 1, r: '¡Ve, tengo razón!', fb: 'Tomar partido rompe la imparcialidad.' },
          { t: 'Le digo que exagera, que todos ponen música.', p: 0, r: '¡Usted está de su lado!', fb: 'Minimizar la queja invalida a una de las partes.' } ] },
      { dice: 'Bueno, ¿y ahora qué hacemos?', opciones: [
          { t: 'Les invito a proponer soluciones y llegamos a un acuerdo concreto: música hasta las 22:00 y el carro fuera de la entrada, por escrito y con seguimiento; si no se cumple, registro los datos y derivo el caso a un centro de mediación.', p: 2, r: 'Me parece justo, firmo.', fb: 'Los acuerdos concretos, construidos por las partes y por escrito, son más sostenibles.' },
          { t: 'Les digo que se porten bien de aquí en adelante.', p: 1, r: '¿Y qué significa eso?', fb: 'Un acuerdo vago no se puede cumplir ni verificar.' },
          { t: 'Decido yo: la señora no pone más música nunca.', p: 0, r: '¡Eso no es justo!', fb: 'En la mediación las partes construyen el acuerdo; imponerlo no es mediar.' } ] }
    ],
    vivo: {
      lugar: 'Caseta de guardianía del conjunto habitacional Los Ceibos, Puyo', fondo: 'comunidad',
      inicio: { confianza: 35, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🪑', t: 'Ubicar dos sillas a igual distancia de ti', p: 2, fb: 'La disposición del espacio comunica imparcialidad.', efecto: { confianza: 6, tension: -6 } },
            { icono: '📜', t: 'Escribir las reglas en una hoja visible', p: 2, fb: 'Las reglas compartidas ordenan el diálogo.', efecto: { confianza: 6, tension: -6 } },
            { icono: '🙏', t: 'Pedir que se calmen y empiecen', p: 1, fb: 'Sin reglas se desordena.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🚔', t: 'Amenazar con llamar a la Policía', p: 0, fb: 'Rompe la voluntariedad.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Explica la voluntariedad y la confidencialidad', claves: ['voluntari', 'confidencial', 'queda entre', 'privado', 'libremente'] },
            { n: 'Se declara imparcial', claves: ['imparcial', 'no estoy de lado', 'neutral', 'ninguno de los dos', 'no tomo partido', 'ambos'] },
            { n: 'Acuerda reglas de diálogo', claves: ['reglas', 'por turnos', 'sin insultos', 'respeto', 'escucharnos', 'sin interrumpir'] }
          ],
          evitar: [ { claves: ['llamo a la policia', 'lo saco'], fb: 'La amenaza rompe la mediación.' } ],
          modelo: 'Bienvenidos. Esta mediación es voluntaria y confidencial, y yo soy imparcial: no tomo partido por ninguno de los dos. Les propongo reglas: hablar por turnos, sin insultos y con respeto.'
        },
        {
          acciones: [
            { icono: '👂', t: 'Asentir y mirar a Don Hugo mientras habla', p: 2, fb: 'La escucha activa valida a la persona.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔄', t: 'Parafrasear lo que dijo con tus palabras', p: 2, fb: 'El parafraseo confirma que entendiste su interés.', efecto: { confianza: 8, tension: -6 } },
            { icono: '👍', t: 'Darle la razón a Don Hugo', p: 1, fb: 'Rompe la imparcialidad.', efecto: { confianza: 4, tension: 4 } },
            { icono: '😒', t: 'Decirle que exagera', p: 0, fb: 'Invalida a una de las partes.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Parafrasea al vecino', claves: ['si entiendo bien', 'lo que usted dice', 'usted necesita', 'me dice que', 'entiendo que'] },
            { n: 'Identifica el interés de fondo', claves: ['descansar', 'dormir', 'madruga', 'trabajar', 'necesidad', 'interes'] },
            { n: 'Da el mismo espacio a la otra parte', claves: ['senora paola', 'ahora escuchemos', 'su turno', 'la otra parte', 'tambien escucho', 'escuchemos a'] }
          ],
          evitar: [ { claves: ['exagera', 'tiene razon usted'], fb: 'No tomes partido ni minimices.' } ],
          modelo: 'Si entiendo bien, usted necesita descansar porque madruga a las cinco para trabajar. Gracias, don Hugo. Ahora escuchemos a la señora Paola con la misma atención.'
        },
        {
          acciones: [
            { icono: '💡', t: 'Pedir a cada uno una propuesta de solución', p: 2, fb: 'Las partes construyen el acuerdo.', efecto: { confianza: 8, tension: -8 } },
            { icono: '✍️', t: 'Redactar el acta de acuerdo con fechas', p: 2, fb: 'El acuerdo escrito y verificable es más sostenible.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🙂', t: 'Pedirles que «se porten bien»', p: 1, fb: 'Es un acuerdo vago.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🔨', t: 'Imponer tu propia decisión', p: 0, fb: 'Imponer no es mediar.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Invita a proponer soluciones', claves: ['propuesta', 'proponer', 'que proponen', 'soluciones', 'ideas', 'opciones'] },
            { n: 'Construye un acuerdo concreto', claves: ['acuerdo', 'hasta las', '22', 'la entrada', 'horario', 'concreto', 'equilibrado'] },
            { n: 'Lo documenta, da seguimiento o deriva', claves: ['por escrito', 'acta', 'seguimiento', 'registro los datos', 'derivo', 'centro de mediacion'] }
          ],
          evitar: [ { claves: ['decido yo', 'se acabo la musica'], fb: 'El acuerdo lo construyen las partes.' } ],
          modelo: 'Les invito a proponer soluciones. Si están de acuerdo: música hasta las 22:00 y el carro fuera de la entrada. Lo dejamos por escrito en un acta con seguimiento en quince días; si no se cumple, registro los datos y derivo el caso a un centro de mediación.'
        }
      ]
    }
  },

  /* ===================== VSC-10 Protocolos en Emergencias y Primeros Auxilios ===================== */
  {
    id: 'asig-VSC-10', cod: 'VSC-10',
    titulo: 'Crecida del río Puyo: alerta, triaje y RCP',
    asignaturas: ['VSC-10'],
    persona: { nombre: 'Lic. Nelly Santi', rol: 'Coordinadora de gestión de riesgos de una unidad educativa junto al río Puyo', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'Tras lluvias intensas, las autoridades declaran alerta naranja por crecida del río Puyo. Apoyas la evacuación de una unidad educativa ribereña; en el camino hay varios heridos leves y un adulto que deja de respirar.',
    objetivo: 'Practica: niveles de alerta y roles del ECU 911 en el Sistema Nacional Descentralizado de Gestión de Riesgos, plan de emergencia y evacuación, triaje, cadena de supervivencia y RCP.',
    pasos: [
      { dice: 'Acaban de declarar alerta naranja por la crecida del río. ¿Qué significa y qué hacemos?', opciones: [
          { t: 'Que el evento es inminente y hay que alistar la respuesta: comunico la alerta por la cadena institucional, activo el plan de emergencia y preparamos la evacuación por la ruta segura al punto de encuentro, en coordinación con el ECU 911.', p: 2, r: 'Correcto, empecemos ya.', fb: 'Los niveles de alerta orientan la respuesta; la naranja implica preparar la evacuación según el plan y la cadena de mando.' },
          { t: 'Que es solo un aviso; seguimos con clases normales.', p: 1, r: '¿Y si sube el río?', fb: 'Subestimar la alerta retrasa la respuesta.' },
          { t: 'Que cada uno se vaya a su casa como pueda.', p: 0, r: '¡Así se pierden niños!', fb: 'Evacuar sin orden ni plan expone a las personas.' } ] },
      { dice: 'En el punto de encuentro hay cinco personas lesionadas y llega una sola ambulancia. ¿Cómo priorizas?', opciones: [
          { t: 'Aplico un triaje básico: rojo para quien tiene riesgo vital inmediato, amarillo para lesiones graves que pueden esperar, verde para quien camina, y lo informo al ECU 911 y a los paramédicos.', p: 2, r: 'Bien, así la ambulancia atiende primero a quien más lo necesita.', fb: 'El triaje clasifica a los lesionados por gravedad para usar mejor los recursos.' },
          { t: 'Atiendo primero a quien grita más.', p: 1, r: 'El que más grita no siempre es el más grave.', fb: 'Quien grita está consciente y respira; puede haber otros más graves en silencio.' },
          { t: 'Subo a todos a la ambulancia a la vez.', p: 0, r: '(La ambulancia no puede atender a nadie bien.)', fb: 'Sin clasificación se pierde la atención a quien tiene riesgo vital.' } ] },
      { dice: '(Un padre de familia cae al suelo, no responde y no respira con normalidad.)', opciones: [
          { t: 'Aplico la cadena de supervivencia: pido que llamen al ECU 911 y traigan un DEA, inicio RCP con compresiones fuertes y rápidas en el centro del pecho (100 a 120 por minuto) y sigo hasta que llegue el soporte avanzado.', p: 2, r: '(Los paramédicos llegan y continúan la reanimación.)', fb: 'Reconocer, llamar, RCP precoz, desfibrilación y soporte avanzado son los eslabones de la cadena de supervivencia.' },
          { t: 'Lo coloco de lado y espero a la ambulancia.', p: 1, r: '(No hay compresiones.)', fb: 'La posición lateral es para quien sí respira.' },
          { t: 'Le doy agua y lo sacudo para despertarlo.', p: 0, r: '(Se pierde tiempo vital.)', fb: 'Retrasa la RCP y puede causar daño.' } ] }
    ],
    vivo: {
      lugar: 'Unidad educativa junto al río Puyo, punto de encuentro', fondo: 'emergencia',
      inicio: { confianza: 50, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '📻', t: 'Comunicar la alerta naranja por la cadena institucional', p: 2, fb: 'La alerta debe llegar a todos por el canal oficial.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🗺️', t: 'Abrir el plan de emergencia en la ruta de evacuación', p: 2, fb: 'El plan define rutas, roles y punto de encuentro.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📚', t: 'Seguir con las clases normales', p: 1, fb: 'Subestima la alerta.', efecto: { confianza: -2, tension: 6 } },
            { icono: '🚶‍♂️', t: 'Mandar a todos a casa por su cuenta', p: 0, fb: 'Evacuación desordenada y peligrosa.', efecto: { confianza: -12, tension: 14 } }
          ],
          conceptos: [
            { n: 'Interpreta el nivel de alerta', claves: ['alerta naranja', 'inminente', 'nivel de alerta', 'alistar', 'preparar la respuesta'] },
            { n: 'Comunica por la cadena institucional', claves: ['cadena institucional', 'comunico', 'ecu 911', 'coordin', 'cadena de mando'] },
            { n: 'Activa el plan y la evacuación', claves: ['plan de emergencia', 'evacu', 'ruta segura', 'punto de encuentro', 'ruta'] }
          ],
          evitar: [ { claves: ['clases normales', 'cada uno se vaya'], fb: 'La alerta exige activar el plan.' } ],
          modelo: 'La alerta naranja indica que el evento es inminente: comunico la alerta por la cadena institucional, activo el plan de emergencia y preparamos la evacuación por la ruta segura al punto de encuentro, coordinando con el ECU 911.'
        },
        {
          acciones: [
            { icono: '🔴', t: 'Colocar tarjeta roja a quien tiene riesgo vital', p: 2, fb: 'El riesgo vital inmediato se atiende primero.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🟢', t: 'Pedir a quienes caminan que esperen en zona verde', p: 2, fb: 'Separar a los leves ordena la atención.', efecto: { confianza: 6, tension: -4 } },
            { icono: '😫', t: 'Atender primero a quien grita más', p: 1, fb: 'No siempre es el más grave.', efecto: { confianza: 0, tension: 4 } },
            { icono: '🚑', t: 'Subir a todos a la ambulancia', p: 0, fb: 'Sin clasificación se pierde atención vital.', efecto: { confianza: -10, tension: 12 } }
          ],
          conceptos: [
            { n: 'Aplica el triaje', claves: ['triaje', 'clasific', 'priorizo', 'por gravedad', 'prioridad'] },
            { n: 'Usa los colores de prioridad', claves: ['rojo', 'amarillo', 'verde', 'riesgo vital', 'camina'] },
            { n: 'Informa a los organismos de respuesta', claves: ['ecu 911', 'paramedicos', 'informo', 'ambulancia', 'aviso'] }
          ],
          evitar: [ { claves: ['el que grita', 'todos a la vez'], fb: 'Se prioriza por gravedad.' } ],
          modelo: 'Aplico un triaje básico: rojo para quien tiene riesgo vital inmediato, amarillo para lesiones graves que pueden esperar y verde para quien camina. Lo informo al ECU 911 y a los paramédicos.'
        },
        {
          acciones: [
            { icono: '📢', t: 'Pedir que llamen al ECU 911 y traigan un DEA', p: 2, fb: 'Activar la ayuda y el desfibrilador son eslabones clave.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🫀', t: 'Iniciar compresiones en el centro del pecho', p: 2, fb: 'La RCP precoz mantiene el flujo de sangre al cerebro.', efecto: { confianza: 10, tension: -6 } },
            { icono: '↪️', t: 'Ponerlo de lado y esperar', p: 1, fb: 'Si no respira, se necesitan compresiones.', efecto: { confianza: -2, tension: 6 } },
            { icono: '💧', t: 'Darle agua y sacudirlo', p: 0, fb: 'Retrasa la RCP.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Cadena de supervivencia: llamar y DEA', claves: ['cadena de supervivencia', 'ecu 911', 'llamen', 'dea', 'desfibrilador'] },
            { n: 'RCP de calidad', claves: ['rcp', 'compresiones', 'centro del pecho', '100', 'fuertes y rapidas'] },
            { n: 'Continúa hasta el soporte avanzado', claves: ['hasta que llegue', 'soporte avanzado', 'paramedicos', 'sigo', 'no me detengo'] }
          ],
          evitar: [ { claves: ['le doy agua', 'lo sacudo'], fb: 'Se debe iniciar RCP sin demora.' } ],
          modelo: 'Aplico la cadena de supervivencia: pido que llamen al ECU 911 y traigan un DEA, inicio RCP con compresiones fuertes y rápidas en el centro del pecho, de 100 a 120 por minuto, y sigo hasta que llegue el soporte avanzado.'
        }
      ]
    }
  },

  /* ===================== VSC-11 Legislación Aplicada a la Vigilancia y Seguridad Ciudadana ===================== */
  {
    id: 'asig-VSC-11', cod: 'VSC-11',
    titulo: 'Límites legales en el supermercado y la inspección',
    asignaturas: ['VSC-11'],
    persona: { nombre: 'Sr. Marco Andrade', rol: 'Gerente de un supermercado en Puyo', avatar: '🧑🏻‍💼', pitch: 0.95 },
    contexto: 'El gerente sospecha que un cliente escondió productos y te ordena encerrarlo en la bodega. Días después, el supervisor te pide preparar la documentación del puesto para una inspección de control.',
    objetivo: 'Practica: marco constitucional y legal de la seguridad ciudadana (Constitución, COIP, Ley de Seguridad Pública y del Estado), derechos y garantías frente a la detención y el debido proceso, responsabilidad civil, penal y administrativa del agente, y requisitos legales de las empresas de seguridad privada.',
    pasos: [
      { dice: '¡Enciérrelo en la bodega hasta que confiese, y revísele la mochila a la fuerza!', opciones: [
          { t: 'Le explico que la Constitución y el COIP lo prohíben: encerrarlo sería privación ilegal de la libertad; solo puedo pedir una revisión voluntaria y, si hay flagrancia, entregarlo de inmediato a la Policía, respetando el debido proceso.', p: 2, r: 'Bueno, haga lo que dice la ley.', fb: 'La vigilancia privada no priva de libertad ni hace requisas forzosas; las garantías del debido proceso protegen a toda persona.' },
          { t: 'Le reviso la mochila, pero no lo encierro.', p: 1, r: '(El cliente protesta.)', fb: 'La revisión forzada también excede tus funciones.' },
          { t: 'Obedezco: lo encierro en la bodega.', p: 0, r: '(El cliente queda encerrado.)', fb: 'Encerrar a una persona puede constituir un delito y genera responsabilidad penal.' } ] },
      { dice: 'Si algo sale mal, ¿qué responsabilidad tendría usted?', opciones: [
          { t: 'Penal si cometo un delito, como privar de libertad o lesionar; civil si causo un daño que debe repararse, como romper sus pertenencias; y administrativa ante la empresa y el ente de control por incumplir normas y procedimientos.', p: 2, r: 'No sabía que eran tres tipos distintos.', fb: 'Las responsabilidades penal, civil y administrativa son independientes y pueden concurrir.' },
          { t: 'Ninguna, porque cumplía órdenes del gerente.', p: 1, r: '¿Seguro?', fb: 'Cumplir una orden ilegal no exime de responsabilidad.' },
          { t: 'Solo me pueden descontar del sueldo.', p: 0, r: 'Es mucho más que eso.', fb: 'Desconocer la responsabilidad penal y civil lleva a actuar con imprudencia.' } ] },
      { dice: '(Supervisor:) Mañana hay una inspección de control. ¿Qué documentación verificas en el puesto?', opciones: [
          { t: 'Que la empresa esté legalmente constituida y autorizada, mi credencial y certificado de capacitación vigentes, el permiso de uso de frecuencias de radio de ARCOTEL, el contrato del servicio y el libro de novedades al día.', p: 2, r: 'Completo, así pasamos la inspección.', fb: 'Las empresas de seguridad privada deben cumplir requisitos legales de constitución, autorización, capacitación del personal y uso de frecuencias.' },
          { t: 'Solo que mi uniforme esté limpio.', p: 1, r: 'Eso no basta.', fb: 'La presentación importa, pero la inspección verifica requisitos legales.' },
          { t: 'Inventar los registros que falten la noche anterior.', p: 0, r: '¡Eso es falsificar!', fb: 'Falsear documentos genera responsabilidad penal y administrativa.' } ] }
    ],
    vivo: {
      lugar: 'Supermercado en el centro de Puyo, zona de cajas', fondo: 'oficina',
      inicio: { confianza: 40, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '📘', t: 'Citar la Constitución y el COIP al gerente', p: 2, fb: 'La norma sustenta tu negativa.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📞', t: 'Llamar al ECU 911 si hay delito flagrante', p: 2, fb: 'En flagrancia la persona se entrega a la Policía.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎒', t: 'Abrir tú mismo la mochila sin permiso', p: 1, fb: 'La requisa forzosa excede tus funciones.', efecto: { confianza: -4, tension: 8 } },
            { icono: '🔒', t: 'Encerrar al cliente en la bodega', p: 0, fb: 'Puede constituir delito.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Invoca el marco legal', claves: ['constitucion', 'coip', 'la ley', 'prohib', 'privacion ilegal'] },
            { n: 'Respeta la libertad y el debido proceso', claves: ['debido proceso', 'libertad', 'no puedo encerrar', 'garantias', 'derechos'] },
            { n: 'Flagrancia y entrega a la Policía', claves: ['flagrancia', 'policia', 'de inmediato', 'entregar', 'voluntari'] }
          ],
          evitar: [ { claves: ['lo encierro', 'hasta que confiese'], fb: 'Encerrar a una persona es ilegal.' } ],
          modelo: 'Señor gerente, la Constitución y el COIP lo prohíben: encerrarlo sería privación ilegal de la libertad. Solo puedo pedir una revisión voluntaria y, si hay flagrancia, entregarlo de inmediato a la Policía, respetando el debido proceso.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Dibujar los tres tipos de responsabilidad', p: 2, fb: 'Diferenciarlas ayuda a actuar con prudencia.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📑', t: 'Mostrar el reglamento interno de la empresa', p: 2, fb: 'Las faltas administrativas se definen en la normativa y el reglamento.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙋', t: 'Decir que solo cumplías órdenes', p: 1, fb: 'Una orden ilegal no exime.', efecto: { confianza: -2, tension: 4 } },
            { icono: '💲', t: 'Decir que solo te descuentan del sueldo', p: 0, fb: 'Desconoce la responsabilidad penal y civil.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Responsabilidad penal', claves: ['penal', 'delito', 'privar de libertad', 'lesion', 'carcel'] },
            { n: 'Responsabilidad civil', claves: ['civil', 'reparar', 'dano', 'indemniz', 'pertenencias'] },
            { n: 'Responsabilidad administrativa', claves: ['administrativ', 'empresa', 'ente de control', 'sancion', 'reglamento'] }
          ],
          evitar: [ { claves: ['ninguna responsabilidad', 'solo cumplia ordenes'], fb: 'Cumplir órdenes ilegales no exime.' } ],
          modelo: 'Tendría responsabilidad penal si cometo un delito, como privar de libertad; civil si causo un daño que debo reparar, como romper sus pertenencias; y administrativa ante la empresa y el ente de control por incumplir normas.'
        },
        {
          acciones: [
            { icono: '🏢', t: 'Revisar la autorización legal de la empresa', p: 2, fb: 'La empresa debe estar constituida y autorizada.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📡', t: 'Verificar el permiso de frecuencias de ARCOTEL', p: 2, fb: 'El uso de radios requiere autorización de frecuencias.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👔', t: 'Revisar solo que el uniforme esté limpio', p: 1, fb: 'No basta para la inspección.', efecto: { confianza: 0, tension: 2 } },
            { icono: '✍️', t: 'Inventar los registros que faltan', p: 0, fb: 'Es falsificar documentos.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Constitución y autorización de la empresa', claves: ['legalmente constituida', 'autorizada', 'autorizacion', 'superintendencia', 'empresa'] },
            { n: 'Credencial y capacitación del personal', claves: ['credencial', 'capacitacion', 'certificado', 'vigente', 'curso'] },
            { n: 'Frecuencias de radio y registros', claves: ['arcotel', 'frecuencias', 'contrato', 'libro de novedades', 'documentacion'] }
          ],
          evitar: [ { claves: ['inventar', 'llenar despues', 'falsificar'], fb: 'Falsear documentos es un delito.' } ],
          modelo: 'Verifico que la empresa esté legalmente constituida y autorizada, que mi credencial y mi certificado de capacitación estén vigentes, el permiso de frecuencias de ARCOTEL, el contrato del servicio y el libro de novedades al día.'
        }
      ]
    }
  },

  /* ===================== VSC-12 Trabajo de Integración Curricular ===================== */
  {
    id: 'asig-VSC-12', cod: 'VSC-12',
    titulo: 'Defensa del informe de integración curricular',
    asignaturas: ['VSC-12'],
    persona: { nombre: 'Mgs. Carlos Guevara', rol: 'Presidente del tribunal de integración curricular', avatar: '👨🏻‍🏫', pitch: 0.9 },
    contexto: 'Defiendes tu trabajo de integración curricular: un protocolo de seguridad para la salida de estudiantes de una unidad educativa de Puyo, construido con datos de tus prácticas preprofesionales.',
    objetivo: 'Practica: planteamiento del problema, objetivos y marco teórico, diseño metodológico (tipo de investigación, técnicas e instrumentos), descripción de resultados y defensa de la propuesta ante el tribunal.',
    pasos: [
      { dice: 'Buenos días. Explíquenos qué problema abordó y cuál fue su objetivo.', opciones: [
          { t: 'Abordé los incidentes en la salida de estudiantes de la unidad educativa; mi objetivo fue diseñar un protocolo de seguridad basado en datos de mis prácticas, con un marco teórico de prevención situacional.', p: 2, r: 'Claro y pertinente para el territorio.', fb: 'Un problema concreto del entorno y un objetivo aplicable son la base del trabajo de integración.' },
          { t: 'Hablé de la inseguridad en Ecuador en general.', p: 1, r: 'Muy amplio; ¿qué aportó usted concretamente?', fb: 'Un tema demasiado amplio diluye el aporte técnico.' },
          { t: 'Elegí el tema porque fue el más fácil de copiar.', p: 0, r: 'Eso es grave.', fb: 'El plagio vulnera la integridad académica.' } ] },
      { dice: '¿Qué método usó y qué encontró?', opciones: [
          { t: 'Fue una investigación aplicada descriptiva: apliqué fichas de observación durante tres meses y revisé el libro de novedades; de 18 incidentes, 12 ocurrieron en la salida de 12:30 a 13:30, es decir, dos de cada tres.', p: 2, r: 'Datos claros que sustentan la propuesta.', fb: 'Instrumentos de campo y análisis de datos sustentan las conclusiones.' },
          { t: 'Pregunté a algunos padres y todos dijeron que es peligroso.', p: 1, r: 'Es una percepción, faltan datos.', fb: 'Las opiniones deben contrastarse con registros.' },
          { t: 'No recogí datos; la propuesta es mi opinión.', p: 0, r: 'Sin datos no hay sustento.', fb: 'Un trabajo técnico requiere evidencia.' } ] },
      { dice: '¿Cuál es su propuesta y qué aporta a la comunidad?', opciones: [
          { t: 'Un protocolo con puntos de control en la salida, coordinación con la Policía y el comité de padres, ruta de alerta con el ECU 911, registro de novedades y respeto a los derechos de niñas, niños y adolescentes; se validará con indicadores.', p: 2, r: 'Aplicable y con enfoque de derechos. Felicitaciones.', fb: 'Integra protocolos, coordinación, registro, derechos y evaluación: el perfil de egreso de la carrera.' },
          { t: 'Que pongan más guardias en la puerta.', p: 1, r: '¿Y cómo actúan esos guardias?', fb: 'La medida es parcial y sin procedimiento.' },
          { t: 'Revisar las mochilas de todos los estudiantes cada día.', p: 0, r: 'Eso vulnera derechos.', fb: 'Las revisiones generalizadas a menores vulneran derechos.' } ] }
    ],
    vivo: {
      lugar: 'Sala de defensas del ISTCY, Sede Matriz Pastaza', fondo: 'aula',
      inicio: { confianza: 50, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '🖥️', t: 'Proyectar la diapositiva del problema', p: 2, fb: 'Una presentación clara orienta al tribunal.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎯', t: 'Leer el objetivo general en voz alta', p: 2, fb: 'El objetivo delimita el aporte.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🌎', t: 'Hablar de la inseguridad nacional en general', p: 1, fb: 'Diluye el aporte.', efecto: { confianza: -2, tension: 4 } },
            { icono: '📋', t: 'Mostrar un trabajo copiado de internet', p: 0, fb: 'El plagio vulnera la integridad académica.', efecto: { confianza: -18, tension: 15 } }
          ],
          conceptos: [
            { n: 'Delimita el problema', claves: ['problema', 'incidentes', 'salida de estudiantes', 'unidad educativa', 'inseguridad en la salida'] },
            { n: 'Plantea el objetivo', claves: ['objetivo', 'disenar', 'proponer', 'protocolo', 'proposito'] },
            { n: 'Se basa en sus prácticas', claves: ['practicas', 'datos', 'campo', 'preprofesionales', 'experiencia', 'evidencia'] }
          ],
          evitar: [ { claves: ['copie', 'lo baje de internet'], fb: 'El plagio es una falta grave.' } ],
          modelo: 'Abordé el problema de los incidentes en la salida de estudiantes de una unidad educativa de Puyo. Mi objetivo fue diseñar un protocolo de seguridad basado en datos de mis prácticas preprofesionales.'
        },
        {
          acciones: [
            { icono: '📑', t: 'Mostrar las fichas de observación aplicadas', p: 2, fb: 'Los instrumentos evidencian el trabajo de campo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📊', t: 'Presentar el gráfico de incidentes por horario', p: 2, fb: 'El gráfico resume los hallazgos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🗣️', t: 'Citar solo opiniones de algunos padres', p: 1, fb: 'Faltan registros.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🤔', t: 'Admitir que no recogiste datos', p: 0, fb: 'Sin evidencia no hay sustento.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Describe los instrumentos', claves: ['fichas de observacion', 'ficha', 'libro de novedades', 'registro', 'encuesta', 'tres meses'] },
            { n: 'Presenta resultados con cifras', claves: ['18', '12', 'dos de cada tres', 'porcentaje', 'incidentes', 'mayoria'] },
            { n: 'Ubica lugar y horario', claves: ['salida', '12 30', '13 30', 'horario', 'franja', 'mediodia'] }
          ],
          evitar: [ { claves: ['es mi opinion', 'no hacia falta datos'], fb: 'Un trabajo técnico requiere evidencia.' } ],
          modelo: 'Fue una investigación aplicada descriptiva: apliqué fichas de observación durante tres meses y revisé el libro de novedades. De 18 incidentes, 12 ocurrieron en la salida, entre las 12:30 y las 13:30; es decir, dos de cada tres.'
        },
        {
          acciones: [
            { icono: '🧭', t: 'Presentar el flujograma del protocolo propuesto', p: 2, fb: 'Un flujograma muestra cómo se aplica.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📏', t: 'Mostrar los indicadores de evaluación', p: 2, fb: 'Los indicadores permiten validar la propuesta.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👮‍♂️', t: 'Proponer solo más guardias', p: 1, fb: 'Medida parcial.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🎒', t: 'Proponer revisar a diario todas las mochilas', p: 0, fb: 'Vulnera derechos de los menores.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Describe el protocolo', claves: ['protocolo', 'puntos de control', 'ruta de alerta', 'registro de novedades', 'procedimiento'] },
            { n: 'Coordinación con actores', claves: ['policia', 'comite de padres', 'ecu 911', 'coordin', 'docentes', 'comunidad'] },
            { n: 'Enfoque de derechos y evaluación', claves: ['derechos', 'ninas', 'adolescentes', 'indicadores', 'validar', 'evaluar'] }
          ],
          evitar: [ { claves: ['revisar todas las mochilas', 'requisar a los estudiantes'], fb: 'Las revisiones generalizadas vulneran derechos.' } ],
          modelo: 'Propongo un protocolo con puntos de control en la salida, coordinación con la Policía y el comité de padres, una ruta de alerta con el ECU 911 y registro de novedades, respetando los derechos de niñas, niños y adolescentes; lo validaremos con indicadores.'
        }
      ]
    }
  }
]);
