/* Prácticas por asignatura – Vigilancia y Seguridad Ciudadana (PAO 2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== VSC-07 Protocolos y Procedimientos de Seguridad Ciudadana II ===================== */
  {
    id: 'asig-VSC-07', cod: 'VSC-07',
    titulo: 'Robo en una ferretería: preservar la escena',
    asignaturas: ['VSC-07'],
    persona: { nombre: 'Sra. Mónica Andrade', rol: 'Dueña de una ferretería en la avenida Alberto Zambrano', avatar: '👩🏻', pitch: 1.15 },
    contexto: 'Al amanecer descubres que forzaron la puerta lateral de una ferretería de tu sector. La dueña llega alterada y quiere entrar a revisar. Debes actuar como primer respondiente y coordinar con la Policía Nacional.',
    objetivo: 'Aplicar el protocolo de primer respondiente: preservación de la escena, identificación de testigos, coordinación interinstitucional y cadena de custodia.',
    pasos: [
      { dice: '¡Déjeme entrar! Tengo que ver qué se llevaron y arreglar todo antes de abrir.', opciones: [
          { t: 'Le explico con empatía que no debemos entrar ni tocar nada hasta que llegue la Policía, acordono el acceso y llamo al ECU 911.', p: 2, r: 'Está bien… pero que vengan rápido.', fb: 'Preservar la escena evita contaminar los indicios que permitirán investigar.' },
          { t: 'La dejo entrar, pero le pido que no toque mucho.', p: 1, r: '(La dueña camina por todo el local.)', fb: 'Cada ingreso altera la escena, aunque se tenga cuidado.' },
          { t: 'Entramos juntos y ordenamos para que pueda abrir.', p: 0, r: '(Se pierden huellas y evidencias.)', fb: 'Alterar la escena destruye evidencias y perjudica la investigación.' } ] },
      { dice: 'El vecino de al lado dice que escuchó un carro a las tres de la mañana.', opciones: [
          { t: 'Anoto sus datos y lo que vio y escuchó, le pido que espere para declarar ante la Policía y reviso si hay cámaras de la zona que lo hayan grabado.', p: 2, r: 'Claro, me quedo para contarles.', fb: 'Identificar testigos y fuentes de video aporta información valiosa a la investigación.' },
          { t: 'Le agradezco y le digo que se vaya.', p: 1, r: 'Bueno, ya me voy.', fb: 'Se pierde un testigo importante.' },
          { t: 'Le digo que seguro fue el vecino de enfrente.', p: 0, r: '(Surge un rumor en el barrio.)', fb: 'Especular sobre culpables es irresponsable y puede afectar a inocentes.' } ] },
      { dice: '(Llega la patrulla.) Policía: «¿Qué tenemos aquí?»', opciones: [
          { t: 'Informo de forma ordenada: hora del hallazgo, lo que observé, que nadie ingresó, los datos del testigo y la ubicación de las cámaras; entrego la escena y lo dejo constar en el acta y en el parte.', p: 2, r: 'Excelente trabajo, la escena está intacta.', fb: 'Un informe ordenado y la entrega formal mantienen la cadena de custodia.' },
          { t: 'Les digo «roban todos los días por aquí» y me voy.', p: 1, r: 'Necesitamos detalles.', fb: 'Sin información precisa se pierde tiempo valioso.' },
          { t: 'Les entrego un destornillador que recogí del piso para ayudar.', p: 0, r: '¡Eso no debió tocarse!', fb: 'Manipular indicios rompe la cadena de custodia.' } ] }
    ],
    vivo: {
      lugar: 'Ferretería en la avenida Alberto Zambrano, Puyo', fondo: 'exterior',
      inicio: { confianza: 35, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🚧', t: 'Colocar cinta para acordonar la puerta', p: 2, fb: 'Acordonar impide el ingreso de personas no autorizadas.', efecto: { confianza: 4, tension: -6 } },
            { icono: '📞', t: 'Llamar al ECU 911 para reportar el robo', p: 2, fb: 'La Policía y criminalística deben intervenir.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚪', t: 'Dejarla entrar con cuidado', p: 1, fb: 'Cada ingreso altera la escena.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🧹', t: 'Ayudar a ordenar el local', p: 0, fb: 'Destruye evidencias.', efecto: { confianza: 8, tension: -6 } }
          ],
          conceptos: [
            { n: 'Pide no entrar ni tocar nada', claves: ['no entrar', 'no podemos entrar', 'no tocar', 'no toque', 'nadie entra', 'esperar afuera'] },
            { n: 'Preserva la escena', claves: ['escena', 'preserv', 'acordon', 'evidencia', 'indicios', 'huellas'] },
            { n: 'Coordina con la Policía y el ECU 911', claves: ['policia', '911', 'ecu', 'criminalistica', 'autoridad', 'patrulla'] }
          ],
          evitar: [ { claves: ['entremos', 'ordenemos', 'pase nomas'], fb: 'No se ingresa ni se altera la escena.' } ],
          modelo: 'Señora, entiendo su preocupación, pero no podemos entrar ni tocar nada para preservar la escena y las huellas. Acordono el acceso y llamo al ECU 911 para que venga la Policía.'
        },
        {
          acciones: [
            { icono: '🗒️', t: 'Anotar los datos y el relato del vecino', p: 2, fb: 'El testimonio temprano es más preciso.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📹', t: 'Ubicar cámaras cercanas que apunten a la calle', p: 2, fb: 'Las grabaciones pueden identificar el vehículo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👋', t: 'Agradecer al vecino y despedirlo', p: 1, fb: 'Se pierde un testigo.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🗯️', t: 'Especular sobre quién fue el ladrón', p: 0, fb: 'Puede afectar a inocentes.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Identifica al testigo', claves: ['sus datos', 'nombre', 'testigo', 'telefono', 'cedula', 'anoto'] },
            { n: 'Registra lo que vio y escuchó', claves: ['que vio', 'que escucho', 'hora', 'carro', 'relato', 'tres de la manana'] },
            { n: 'Busca fuentes de video', claves: ['camaras', 'video', 'grabacion', 'cctv', 'imagenes'] }
          ],
          evitar: [ { claves: ['seguro fue', 'ya se quien'], fb: 'No especules sobre culpables.' } ],
          modelo: 'Por favor, deme sus datos y cuénteme qué vio y escuchó y a qué hora pasó el carro. Le pido esperar para declarar como testigo, y reviso si hay cámaras que lo hayan grabado.'
        },
        {
          acciones: [
            { icono: '🧾', t: 'Entregar un informe verbal ordenado al policía', p: 2, fb: 'La información clara agiliza la investigación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✍️', t: 'Firmar el acta de entrega de la escena', p: 2, fb: 'El acta documenta la cadena de custodia.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🤷', t: 'Decir que roban siempre y retirarse', p: 1, fb: 'Faltan datos.', efecto: { confianza: -4, tension: 4 } },
            { icono: '🪛', t: 'Entregar un destornillador que recogiste', p: 0, fb: 'Rompe la cadena de custodia.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Informa hora y hallazgo', claves: ['hora', 'hallazgo', 'encontre', 'observe', 'puerta lateral', 'forzada'] },
            { n: 'Confirma que nadie alteró la escena', claves: ['nadie ingreso', 'nadie entro', 'intacta', 'no se toco', 'sin alterar', 'preservada'] },
            { n: 'Entrega formal y cadena de custodia', claves: ['acta', 'cadena de custodia', 'entrego', 'parte', 'testigo', 'camaras'] }
          ],
          evitar: [ { claves: ['recogi', 'lo guarde para ayudar'], fb: 'Los indicios no se manipulan.' } ],
          modelo: 'A las cinco y treinta encontré la puerta lateral forzada. Nadie ingresó, la escena está intacta. Aquí están los datos del testigo y la ubicación de las cámaras; le entrego la escena y lo dejo constar en el acta y en el parte.'
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
    objetivo: 'Interpretar un mapa de calor y la distribución horaria del delito, calcular porcentajes y aplicar medidas básicas de ciberseguridad ante el phishing.',
    pasos: [
      { dice: 'Mira el mapa: el punto más rojo está en el Paseo Turístico, entre las 18:00 y las 21:00. ¿Qué propones?', opciones: [
          { t: 'Reforzar la presencia preventiva en ese lugar y franja horaria, y proponer al municipio mejorar la iluminación y eliminar puntos ciegos.', p: 2, r: 'Bien: focalizas recursos donde y cuando ocurre el delito.', fb: 'La geodiferenciación orienta el patrullaje y la prevención situacional.' },
          { t: 'Patrullar todo el centro por igual, todo el día.', p: 1, r: 'No tenemos personal para todo.', fb: 'Sin focalización se desperdician recursos.' },
          { t: 'Prohibir que los jóvenes caminen por el paseo en la noche.', p: 0, r: 'Eso es discriminatorio.', fb: 'Restringir derechos de un grupo no es prevención.' } ] },
      { dice: 'Hubo 60 hurtos en el mes y 24 fueron en esa franja. ¿Qué porcentaje representa?', opciones: [
          { t: 'Es el 40 por ciento: 24 dividido para 60 por 100. Casi la mitad ocurre en solo tres horas.', p: 2, r: 'Exacto, ese dato justifica la propuesta.', fb: '24 ÷ 60 × 100 = 40 %. El dato cuantitativo sustenta la decisión.' },
          { t: 'Es más o menos la mitad.', p: 1, r: 'Aproximado, pero necesitamos la cifra.', fb: 'La estimación no es precisa: el valor es 40 %.' },
          { t: 'Es el 24 por ciento.', p: 0, r: 'No, 24 son casos, no porcentaje.', fb: 'Confundir frecuencia con porcentaje lleva a errores de análisis.' } ] },
      { dice: '(Llega un correo: «Actualice urgente su contraseña del sistema de cámaras en este enlace».) ¿Qué hacemos?', opciones: [
          { t: 'No abro el enlace ni descargo nada; verifico con el proveedor por su canal oficial, reporto el intento de phishing, cambio la contraseña por una robusta y activo el doble factor.', p: 2, r: 'Perfecto, eso protege las grabaciones.', fb: 'Ante el phishing: no hacer clic, verificar, reportar y reforzar la autenticación.' },
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
            { n: 'Da el resultado correcto', claves: ['40', 'cuarenta'] },
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
            { n: 'Verifica y reporta el phishing', claves: ['phishing', 'reporto', 'verifico', 'canal oficial', 'proveedor', 'soporte'] },
            { n: 'Refuerza la contraseña y la autenticación', claves: ['contrasena', 'clave robusta', 'doble factor', 'dos pasos', 'autenticacion', 'cambio la clave'] }
          ],
          evitar: [ { claves: ['pongo la clave', 'entro al link', 'ingreso mis datos'], fb: 'Nunca entregues credenciales por un enlace.' } ],
          modelo: 'No abro el enlace ni descargo nada. Es un intento de phishing: lo reporto, verifico con el proveedor por su canal oficial, cambio la contraseña por una robusta y activo el doble factor.'
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
    objetivo: 'Aplicar técnicas de mediación: reglas y principios, escucha activa, identificación de intereses y construcción de acuerdos.',
    pasos: [
      { dice: '¡Yo no me siento con esa señora! Ella es la del problema.', opciones: [
          { t: 'Les doy la bienvenida, explico que la mediación es voluntaria, confidencial e imparcial, y acordamos reglas: hablar por turnos, sin insultos y con respeto.', p: 2, r: 'Bueno… si es así, la escucho.', fb: 'Presentar el proceso y las reglas genera un espacio seguro para dialogar.' },
          { t: 'Les pido que se calmen y empiecen a hablar.', p: 1, r: '(Ambos hablan al mismo tiempo.)', fb: 'Sin reglas claras la conversación se desordena.' },
          { t: 'Le digo que si no colabora, llamo a la Policía para que lo saquen.', p: 0, r: '¡Encima me amenaza!', fb: 'Amenazar rompe la confianza y la voluntariedad.' } ] },
      { dice: 'Ella pone música hasta medianoche y yo me levanto a las cinco para trabajar.', opciones: [
          { t: 'Lo escucho sin interrumpir y parafraseo: «usted necesita descansar porque madruga». Luego escucho igual a la señora Paola.', p: 2, r: 'Exacto, eso es lo que necesito.', fb: 'La escucha activa y el parafraseo revelan los intereses detrás de las posiciones.' },
          { t: 'Le doy la razón: la música alta molesta a todos.', p: 1, r: '¡Ve, tengo razón!', fb: 'Tomar partido rompe la imparcialidad.' },
          { t: 'Le digo que exagera, que todos ponen música.', p: 0, r: '¡Usted está de su lado!', fb: 'Minimizar la queja invalida a una de las partes.' } ] },
      { dice: 'Bueno, ¿y ahora qué hacemos?', opciones: [
          { t: 'Les invito a proponer soluciones y llegamos a un acuerdo concreto y equilibrado: música hasta las 22:00, el carro fuera de la entrada, por escrito y con seguimiento en quince días.', p: 2, r: 'Me parece justo, firmo.', fb: 'Los acuerdos concretos, construidos por las partes y por escrito, son más sostenibles.' },
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
            { n: 'Lo formaliza y da seguimiento', claves: ['por escrito', 'acta', 'firma', 'seguimiento', 'quince dias', 'revisar'] }
          ],
          evitar: [ { claves: ['decido yo', 'se acabo la musica'], fb: 'El acuerdo lo construyen las partes.' } ],
          modelo: 'Les invito a proponer soluciones. Si están de acuerdo: música hasta las 22:00 y el carro fuera de la entrada. Lo dejamos por escrito en un acta y hacemos seguimiento en quince días.'
        }
      ]
    }
  },

  /* ===================== VSC-10 Protocolos en Emergencias y Primeros Auxilios ===================== */
  {
    id: 'asig-VSC-10', cod: 'VSC-10',
    titulo: 'Simulacro de sismo y una estudiante que convulsiona',
    asignaturas: ['VSC-10'],
    persona: { nombre: 'Lic. Nelly Santi', rol: 'Coordinadora de gestión de riesgos de una unidad educativa de Puyo', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'Apoyas un simulacro de evacuación por sismo en una unidad educativa. Durante la evacuación, una estudiante cae al suelo con una crisis convulsiva. Debes aplicar los protocolos de emergencia y primeros auxilios.',
    objetivo: 'Aplicar el protocolo de evacuación ante sismos, los primeros auxilios ante una convulsión y la evaluación del simulacro.',
    pasos: [
      { dice: '¡Inicia el simulacro! Suena la alarma de sismo. ¿Qué indicas a los estudiantes?', opciones: [
          { t: 'Que se agachen, se cubran y se sujeten mientras dura el movimiento; luego evacuar en orden por la ruta señalizada al punto de encuentro, sin correr y sin regresar por objetos.', p: 2, r: '¡Muy bien, así lo practicamos!', fb: 'Es el protocolo general de autoprotección y evacuación ante sismos.' },
          { t: 'Que salgan todos corriendo de inmediato.', p: 1, r: '(Hay empujones en la escalera.)', fb: 'Correr durante el movimiento provoca caídas y aglomeraciones.' },
          { t: 'Que se queden junto a las ventanas para ver qué pasa.', p: 0, r: '¡Peligro, los vidrios!', fb: 'Las ventanas son zonas de riesgo por la caída de vidrios.' } ] },
      { dice: '(Una estudiante cae al suelo y empieza a convulsionar. Sus compañeros gritan.)', opciones: [
          { t: 'Protejo su cabeza con algo blando, retiro objetos cercanos, no la sujeto ni le pongo nada en la boca, tomo el tiempo y, cuando termine, la coloco de lado; si dura más de cinco minutos, llamo al ECU 911.', p: 2, r: '(La crisis cede y la estudiante respira.)', fb: 'Ante una convulsión se protege a la persona, no se la sujeta ni se introduce nada en la boca, y se controla el tiempo.' },
          { t: 'La sujeto fuerte para que deje de moverse.', p: 1, r: '(Se golpea el brazo contra el piso.)', fb: 'Sujetar puede causar lesiones; hay que proteger, no inmovilizar.' },
          { t: 'Le meto un esfero en la boca para que no se muerda la lengua.', p: 0, r: '(Se rompe un diente.)', fb: 'Introducir objetos en la boca puede causar lesiones y asfixia.' } ] },
      { dice: 'Terminó el simulacro. ¿Qué incluimos en el informe?', opciones: [
          { t: 'El tiempo total de evacuación, el conteo en el punto de encuentro, la atención a la estudiante, las dificultades encontradas y las mejoras propuestas.', p: 2, r: 'Con eso mejoramos el plan de emergencia.', fb: 'La evaluación del simulacro permite actualizar el plan de gestión de riesgos.' },
          { t: 'Solo que el simulacro salió bien.', p: 1, r: 'Necesitamos más detalle.', fb: 'Sin datos no se puede mejorar.' },
          { t: 'No mencionar lo de la estudiante para no preocupar a los padres.', p: 0, r: 'Eso no sería transparente.', fb: 'Omitir incidentes impide mejorar y resta transparencia.' } ] }
    ],
    vivo: {
      lugar: 'Patio y pasillos de una unidad educativa de Puyo', fondo: 'aula',
      inicio: { confianza: 50, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '🔔', t: 'Indicar con el megáfono: agacharse, cubrirse, sujetarse', p: 2, fb: 'La autoprotección durante el movimiento reduce lesiones.', efecto: { confianza: 8, tension: -6 } },
            { icono: '➡️', t: 'Señalar la ruta de evacuación', p: 2, fb: 'Una ruta clara evita aglomeraciones.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🏃‍♀️', t: 'Gritar que todos salgan corriendo', p: 1, fb: 'Provoca caídas y empujones.', efecto: { confianza: -2, tension: 8 } },
            { icono: '🪟', t: 'Dejar que se acerquen a las ventanas', p: 0, fb: 'Riesgo por caída de vidrios.', efecto: { confianza: -10, tension: 12 } }
          ],
          conceptos: [
            { n: 'Agacharse, cubrirse y sujetarse', claves: ['agach', 'cubr', 'sujet', 'debajo de la mesa', 'proteger la cabeza'] },
            { n: 'Evacuar por la ruta al punto de encuentro', claves: ['ruta', 'evacu', 'punto de encuentro', 'senalizad', 'salida'] },
            { n: 'Orden y seguridad durante la evacuación', claves: ['sin correr', 'en orden', 'no regresar', 'calma', 'sin empujar', 'no usar'] }
          ],
          evitar: [ { claves: ['salgan corriendo', 'corran'], fb: 'Correr provoca accidentes.' } ],
          modelo: 'Agáchense, cúbranse y sujétense mientras dura el movimiento. Luego evacuamos en orden por la ruta señalizada hasta el punto de encuentro, sin correr y sin regresar por objetos.'
        },
        {
          acciones: [
            { icono: '🧥', t: 'Colocar una chompa doblada bajo su cabeza', p: 2, fb: 'Protege la cabeza de golpes.', efecto: { confianza: 8, tension: -6 } },
            { icono: '⏱️', t: 'Tomar el tiempo de la convulsión', p: 2, fb: 'Si supera cinco minutos se requiere atención urgente.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✊', t: 'Sujetarle los brazos con fuerza', p: 1, fb: 'Puede causar lesiones.', efecto: { confianza: -4, tension: 6 } },
            { icono: '🖊️', t: 'Ponerle un esfero en la boca', p: 0, fb: 'Puede causar lesiones y asfixia.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Protege la cabeza y retira objetos', claves: ['cabeza', 'algo blando', 'retiro objetos', 'espacio', 'proteger', 'chompa'] },
            { n: 'No sujeta ni introduce nada en la boca', claves: ['no la sujeto', 'nada en la boca', 'no sujetar', 'no meter', 'no introducir', 'dejar que pase'] },
            { n: 'Controla el tiempo, la coloca de lado y avisa', claves: ['tiempo', 'cinco minutos', 'de lado', 'posicion lateral', '911', 'ecu'] }
          ],
          evitar: [ { claves: ['le meto', 'sujetarla fuerte', 'en la boca para que no'], fb: 'Nunca se introduce nada en la boca ni se sujeta a la fuerza.' } ],
          modelo: 'Protejo su cabeza con algo blando y retiro los objetos cercanos; no la sujeto y no le pongo nada en la boca. Tomo el tiempo y, cuando termine, la coloco de lado; si pasa de cinco minutos, llamo al ECU 911.'
        },
        {
          acciones: [
            { icono: '⏲️', t: 'Anotar el tiempo total de evacuación', p: 2, fb: 'Es un indicador clave del simulacro.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✅', t: 'Revisar la lista del conteo en el punto de encuentro', p: 2, fb: 'El conteo confirma que nadie quedó atrás.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👌', t: 'Escribir solo «todo salió bien»', p: 1, fb: 'Sin datos no se mejora.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🙊', t: 'Omitir la crisis de la estudiante', p: 0, fb: 'Resta transparencia.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Registra el tiempo y el conteo', claves: ['tiempo', 'conteo', 'minutos', 'punto de encuentro', 'lista'] },
            { n: 'Incluye los incidentes atendidos', claves: ['estudiante', 'convulsion', 'atencion', 'incidente', 'primeros auxilios', 'novedades'] },
            { n: 'Propone mejoras al plan', claves: ['mejora', 'dificultades', 'plan de emergencia', 'recomendacion', 'corregir', 'actualizar'] }
          ],
          evitar: [ { claves: ['no mencionar', 'mejor ocultar'], fb: 'Los incidentes deben reportarse.' } ],
          modelo: 'Incluimos el tiempo total de evacuación en minutos, el conteo en el punto de encuentro, la atención a la estudiante con la convulsión, las dificultades y las mejoras al plan de emergencia.'
        }
      ]
    }
  },

  /* ===================== VSC-11 Legislación Aplicada a la Vigilancia y Seguridad Ciudadana ===================== */
  {
    id: 'asig-VSC-11', cod: 'VSC-11',
    titulo: 'El gerente quiere encerrar a un cliente',
    asignaturas: ['VSC-11'],
    persona: { nombre: 'Sr. Marco Andrade', rol: 'Gerente de un supermercado en Puyo', avatar: '🧑🏻‍💼', pitch: 0.95 },
    contexto: 'El gerente sospecha que un cliente escondió productos en su mochila y te ordena revisarla a la fuerza, encerrarlo en la bodega y publicar su foto. Debes actuar dentro de lo que la ley permite a la vigilancia privada.',
    objetivo: 'Aplicar en términos generales los límites legales de la vigilancia privada: flagrancia, derechos de la persona retenida, requisas y protección de datos personales.',
    pasos: [
      { dice: '¡Revísele la mochila a la fuerza y enciérrelo en la bodega hasta que confiese!', opciones: [
          { t: 'Le explico que no puedo revisar a la fuerza ni encerrar a nadie: puedo pedir al cliente que muestre voluntariamente su mochila y, si hay delito flagrante, retenerlo solo hasta entregarlo a la Policía.', p: 2, r: 'Bueno, haga lo que dice la ley.', fb: 'La vigilancia privada no hace requisas forzosas ni privaciones de libertad; en flagrancia entrega de inmediato a la Policía.' },
          { t: 'Le reviso la mochila, pero no lo encierro.', p: 1, r: '(El cliente protesta.)', fb: 'La revisión forzada también excede las funciones de la vigilancia privada.' },
          { t: 'Obedezco: lo encierro en la bodega.', p: 0, r: '(El cliente queda encerrado.)', fb: 'Encerrar a una persona puede constituir un delito contra su libertad.' } ] },
      { dice: 'Cliente: «¿Por qué me retienen? ¡Tengo derechos!»', opciones: [
          { t: 'Le informo con respeto el motivo, le garantizo un trato digno, que puede comunicarse con un familiar y que la Policía Nacional resolverá la situación.', p: 2, r: 'Está bien, esperaré a la Policía.', fb: 'Toda persona retenida tiene derecho a conocer el motivo, a un trato digno y a comunicarse.' },
          { t: 'Le digo que espere callado.', p: 1, r: '¡Esto es un abuso!', fb: 'No informar el motivo aumenta la tensión y vulnera derechos.' },
          { t: 'Le digo que los ladrones no tienen derechos.', p: 0, r: '¡Lo voy a denunciar!', fb: 'Los derechos humanos se respetan siempre; además rige la presunción de inocencia.' } ] },
      { dice: 'Gerente: «Voy a publicar su foto de las cámaras en Facebook con un letrero de ladrón».', opciones: [
          { t: 'Le explico que las imágenes son datos personales protegidos y que hay presunción de inocencia; la grabación se entrega solo a la Policía o a la Fiscalía con cadena de custodia.', p: 2, r: 'No sabía que podía meterme en problemas.', fb: 'La Ley Orgánica de Protección de Datos Personales y la presunción de inocencia impiden esa publicación.' },
          { t: 'Le digo que la publique con la cara tapada.', p: 1, r: 'Ya, así la subo.', fb: 'Aun así puede identificarse y vulnerar derechos.' },
          { t: 'Le ayudo a elegir la mejor foto.', p: 0, r: '(La foto se viraliza.)', fb: 'Exponer a una persona vulnera su honra y sus datos personales.' } ] }
    ],
    vivo: {
      lugar: 'Supermercado en el centro de Puyo, zona de cajas', fondo: 'oficina',
      inicio: { confianza: 40, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🙋', t: 'Pedir al cliente que muestre su mochila voluntariamente', p: 2, fb: 'La revisión solo procede con consentimiento.', efecto: { confianza: 6, tension: -6 } },
            { icono: '📞', t: 'Llamar al ECU 911 si hay delito flagrante', p: 2, fb: 'En flagrancia la persona se entrega a la Policía.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎒', t: 'Abrir tú mismo la mochila sin permiso', p: 1, fb: 'La requisa forzosa excede tus funciones.', efecto: { confianza: -4, tension: 8 } },
            { icono: '🔒', t: 'Encerrar al cliente en la bodega', p: 0, fb: 'Puede constituir delito contra la libertad.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Rechaza la requisa forzosa y el encierro', claves: ['no puedo revisar a la fuerza', 'no puedo encerrar', 'a la fuerza no', 'encerrar', 'privar de libertad', 'no esta permitido'] },
            { n: 'Pide revisión voluntaria', claves: ['voluntari', 'consentimiento', 'si usted acepta', 'le pido que muestre', 'con su permiso'] },
            { n: 'Aplica la flagrancia y entrega a la Policía', claves: ['flagrancia', 'flagrante', 'policia', 'entregar', 'ecu 911', 'de inmediato'] }
          ],
          evitar: [ { claves: ['lo encierro', 'hasta que confiese'], fb: 'Encerrar a una persona es ilegal.' } ],
          modelo: 'Señor gerente, no puedo revisar a la fuerza ni encerrar a nadie. Le pido al cliente que muestre su mochila de forma voluntaria y, si hay delito flagrante, lo retengo solo para entregarlo de inmediato a la Policía.'
        },
        {
          acciones: [
            { icono: 'ℹ️', t: 'Explicar al cliente el motivo de la retención', p: 2, fb: 'Conocer el motivo es un derecho.', efecto: { confianza: 8, tension: -8 } },
            { icono: '📱', t: 'Permitirle llamar a un familiar', p: 2, fb: 'La comunicación es un derecho de la persona retenida.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🤫', t: 'Ordenarle que espere callado', p: 1, fb: 'Aumenta la tensión.', efecto: { confianza: -4, tension: 6 } },
            { icono: '🗯️', t: 'Decirle que los ladrones no tienen derechos', p: 0, fb: 'Vulnera la presunción de inocencia.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Informa el motivo', claves: ['motivo', 'le explico', 'la razon', 'por que', 'se le retiene porque', 'sospecha'] },
            { n: 'Garantiza trato digno', claves: ['trato digno', 'respeto', 'sus derechos', 'nadie le va a', 'dignidad', 'tranquilo'] },
            { n: 'Permite comunicarse y espera a la Policía', claves: ['familiar', 'llamar', 'comunicarse', 'policia', 'abogado', 'esperar'] }
          ],
          evitar: [ { claves: ['no tiene derechos', 'callese'], fb: 'Los derechos se respetan siempre.' } ],
          modelo: 'Le explico el motivo: hay una sospecha que debe aclarar la Policía. Tiene derecho a un trato digno y a comunicarse con un familiar mientras esperamos a la Policía.'
        },
        {
          acciones: [
            { icono: '🛡️', t: 'Resguardar la grabación sin copiarla', p: 2, fb: 'Las imágenes son datos personales protegidos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📦', t: 'Preparar el acta para entregar el video a la Policía', p: 2, fb: 'La entrega formal mantiene la cadena de custodia.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙈', t: 'Sugerir publicarla con la cara tapada', p: 1, fb: 'Aún puede identificarse.', efecto: { confianza: 2, tension: 2 } },
            { icono: '📸', t: 'Ayudar a elegir la foto para Facebook', p: 0, fb: 'Vulnera la honra y los datos personales.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Las imágenes son datos personales', claves: ['datos personales', 'proteccion de datos', 'imagen', 'privacidad', 'lopdp'] },
            { n: 'Presunción de inocencia', claves: ['presuncion de inocencia', 'inocente', 'no esta probado', 'un juez', 'no es culpable'] },
            { n: 'Entrega solo a la autoridad con cadena de custodia', claves: ['policia', 'fiscalia', 'cadena de custodia', 'acta', 'autoridad', 'entregar'] }
          ],
          evitar: [ { claves: ['publiquela', 'subala', 'letrero de ladron'], fb: 'Publicar la imagen vulnera derechos.' } ],
          modelo: 'No puede publicarla: la imagen es un dato personal protegido y rige la presunción de inocencia. La grabación se entrega solo a la Policía o a la Fiscalía, con acta y cadena de custodia.'
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
    objetivo: 'Integrar los aprendizajes de la carrera: problema y objetivo, método con datos de campo, resultados, propuesta aplicable y principios éticos.',
    pasos: [
      { dice: 'Buenos días. Explíquenos qué problema abordó y cuál fue su objetivo.', opciones: [
          { t: 'Abordé los incidentes en la salida de estudiantes de la unidad educativa; mi objetivo fue diseñar un protocolo de seguridad basado en datos de mis prácticas.', p: 2, r: 'Claro y pertinente para el territorio.', fb: 'Un problema concreto del entorno y un objetivo aplicable son la base del trabajo de integración.' },
          { t: 'Hablé de la inseguridad en Ecuador en general.', p: 1, r: 'Muy amplio; ¿qué aportó usted concretamente?', fb: 'Un tema demasiado amplio diluye el aporte técnico.' },
          { t: 'Elegí el tema porque fue el más fácil de copiar.', p: 0, r: 'Eso es grave.', fb: 'El plagio vulnera la integridad académica.' } ] },
      { dice: '¿Qué método usó y qué encontró?', opciones: [
          { t: 'Apliqué fichas de observación durante tres meses y revisé el libro de novedades: de 18 incidentes, 12 ocurrieron en la salida de 12:30 a 13:30, es decir, dos de cada tres.', p: 2, r: 'Datos claros que sustentan la propuesta.', fb: 'Instrumentos de campo y análisis de datos sustentan las conclusiones.' },
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
          modelo: 'Apliqué fichas de observación durante tres meses y revisé el libro de novedades: de 18 incidentes, 12 ocurrieron en la salida, entre las 12:30 y las 13:30; es decir, dos de cada tres.'
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
