/* Prácticas por asignatura – Construcción (PAO 3–4) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ---------------- C-B-301 Seguridad y Salud Ocupacional ---------------- */
  {
    id: 'asig-C-B-301', cod: 'C-B-301',
    titulo: 'Caída desde el andamio: atender, investigar y prevenir',
    asignaturas: ['C-B-301'],
    persona: { nombre: 'Don Rosendo Tanguila', rol: 'Maestro de obra', avatar: '👷🏽‍♂️', pitch: 0.85 },
    contexto: 'En una vivienda de dos plantas en el barrio Obrero de Puyo, un ayudante cae desde un andamio de 2 m y se queja de dolor en el brazo. Como residente en formación debes atenderlo, investigar el accidente y proponer medidas preventivas.',
    objetivo: 'Aplicar primeros auxilios, investigación de accidentes de trabajo y prevención de riesgos con EPP, señalización, orden y limpieza.',
    pasos: [
      { dice: '¡Ingeniero, el Kevin se cayó del andamio! Dice que le duele el brazo. ¿Lo levantamos y lo llevamos en la camioneta?', opciones: [
          { t: 'No lo muevan; aseguro la zona, evalúo si está consciente y respira, inmovilizo el brazo y llamo al ECU 911.', p: 2, r: 'Bueno, nadie lo toca. Ya mismo marco al 911.', fb: 'En primeros auxilios primero se protege la escena, se evalúa al herido y se pide ayuda; mover a un lesionado puede agravar una posible lesión de columna.' },
          { t: 'Lo sentamos con cuidado y le damos agua mientras vemos si se le pasa.', p: 1, r: 'Ya, le traigo agua...', fb: 'La intención es buena, pero no se evaluó la gravedad ni se pidió ayuda profesional; no se debe dar líquidos a un herido sin valoración.' },
          { t: 'Que se aguante un rato, seguro no es nada; sigan trabajando.', p: 0, r: 'Pero está bien pálido, ingeniero...', fb: 'Minimizar un accidente pone en riesgo la vida del trabajador y vulnera la obligación del empleador de atender y reportar accidentes laborales.' } ] },
      { dice: 'Ya se lo llevó la ambulancia. Ahora el dueño quiere saber qué pasó. Yo digo que fue descuido del muchacho y ya.', opciones: [
          { t: 'Investigo el accidente: entrevisto testigos, reviso el andamio y el EPP, tomo fotos y analizo causas inmediatas y básicas sin buscar culpables.', p: 2, r: 'Ya veo, la plataforma estaba con una tabla suelta y sin baranda...', fb: 'La investigación de accidentes busca causas (actos y condiciones inseguras, factores de gestión) para prevenir que se repitan, no culpables.' },
          { t: 'Anoto en el diario de obra que se cayó y que estaba sin casco.', p: 1, r: 'Ya, pero ¿y el andamio?', fb: 'Registrar es necesario, pero sin análisis de causas no se identifican las condiciones inseguras.' },
          { t: 'Le digo al dueño que fue culpa del trabajador y que lo despedimos.', p: 0, r: 'Mmm, eso no arregla nada.', fb: 'Culpar sin investigar oculta las condiciones inseguras y deja el riesgo activo para los demás.' } ] },
      { dice: '¿Y qué hacemos para que no vuelva a pasar? Los muchachos dicen que el arnés estorba.', opciones: [
          { t: 'Andamios con barandas y plataformas completas, arnés con línea de vida sobre 1,8 m, señalización, orden y limpieza, materiales bien apilados y charla de seguridad diaria.', p: 2, r: 'Así sí, todos claritos. Hago la charla cada mañana.', fb: 'La prevención combina protección colectiva, EPP, señalización, orden y limpieza, almacenamiento seguro y capacitación.' },
          { t: 'Compro cascos nuevos para todos.', p: 1, r: 'Ya, pero el casco no evita la caída.', fb: 'El EPP es la última barrera; primero hay que corregir la condición insegura del andamio.' },
          { t: 'Que cada uno se cuide como pueda; no hay presupuesto.', p: 0, r: 'Así nos vamos a seguir cayendo, ingeniero.', fb: 'La seguridad es obligación del empleador; los costos de un accidente superan los de la prevención.' } ] }
    ],
    vivo: {
      lugar: 'Vivienda en construcción, barrio Obrero, Puyo', fondo: 'obra',
      inicio: { confianza: 45, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🚧', t: 'Señalizar y asegurar la zona del accidente', p: 2, fb: 'Proteger la escena evita nuevos accidentes y permite atender con seguridad.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🩹', t: 'Inmovilizar el brazo sin mover al herido', p: 2, fb: 'Inmovilizar reduce el dolor y evita agravar una fractura.', efecto: { confianza: 8, tension: -8 } },
            { icono: '📞', t: 'Llamar al ECU 911', p: 2, fb: 'La atención profesional es prioritaria ante una caída de altura.', efecto: { confianza: 6, tension: -6 } },
            { icono: '🛻', t: 'Subirlo a la camioneta sin evaluarlo', p: 0, fb: 'Trasladar sin evaluar puede agravar lesiones de columna.', efecto: { confianza: -10, tension: 12 } }
          ],
          conceptos: [
            { n: 'Proteger la escena', claves: ['asegur', 'senaliz', 'zona', 'escena', 'proteg', 'nadie se acerque'] },
            { n: 'Evaluar y no mover al herido', claves: ['no lo muevan', 'no mover', 'evalu', 'consciente', 'respira', 'inmoviliz'] },
            { n: 'Pedir ayuda profesional', claves: ['911', 'ecu', 'ambulancia', 'llamar', 'ayuda', 'paramedic'] }
          ],
          evitar: [ { claves: ['no es nada', 'sigan trabajando', 'que se aguante'], fb: 'Minimizar un accidente pone en riesgo la vida del trabajador.' } ],
          modelo: 'Nadie lo mueva; aseguro la zona y reviso si está consciente y respira. Inmovilizo el brazo y llamo ya al ECU 911.'
        },
        {
          acciones: [
            { icono: '🗣️', t: 'Entrevistar a los testigos por separado', p: 2, fb: 'Los testimonios independientes reconstruyen los hechos con objetividad.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📸', t: 'Fotografiar el andamio y el lugar', p: 2, fb: 'La evidencia permite identificar condiciones inseguras.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🔍', t: 'Revisar plataforma, barandas y anclajes', p: 1, fb: 'Revisar el equipo es parte del análisis de causas.', efecto: { confianza: 4, tension: -2 } },
            { icono: '👉', t: 'Culpar al trabajador ante el dueño', p: 0, fb: 'Buscar culpables impide encontrar las causas reales.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Recolectar evidencia', claves: ['testig', 'entrevist', 'foto', 'evidencia', 'revis', 'registr'] },
            { n: 'Causas inmediatas y básicas', claves: ['causa', 'condicion insegura', 'acto inseguro', 'tabla suelta', 'baranda', 'analiz'] },
            { n: 'No buscar culpables sino prevenir', claves: ['no culpables', 'evitar que se repita', 'no buscar culpable', 'sin culpar', 'preven', 'que no se repita', 'mejor', 'correctiv'] }
          ],
          evitar: [ { claves: ['culpa del trabajador', 'despedir', 'fue descuido'], fb: 'Culpar sin investigar deja activo el riesgo.' } ],
          modelo: 'Voy a investigar: entrevisto a los testigos, fotografío el andamio y reviso plataforma y barandas para hallar las causas, no culpables, y evitar que se repita.'
        },
        {
          acciones: [
            { icono: '🪜', t: 'Colocar barandas y plataformas completas', p: 2, fb: 'La protección colectiva es prioritaria frente al EPP.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🦺', t: 'Exigir arnés con línea de vida en altura', p: 2, fb: 'El arnés anclado detiene la caída en trabajos en altura.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧹', t: 'Ordenar y apilar materiales en zona segura', p: 1, fb: 'Orden, limpieza y almacenamiento reducen tropiezos y caídas.', efecto: { confianza: 4, tension: -3 } },
            { icono: '💸', t: 'Postergar la seguridad por falta de dinero', p: 0, fb: 'La prevención es obligatoria y más barata que un accidente.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Protección colectiva', claves: ['baranda', 'plataforma', 'andamio', 'linea de vida', 'protecci', 'red'] },
            { n: 'EPP y trabajo en altura', claves: ['arnes', 'casco', 'epp', 'equipo de proteccion', 'altura', 'anclaj'] },
            { n: 'Orden, señalización y capacitación', claves: ['orden', 'limpieza', 'senal', 'charla', 'capacit', 'apil'] }
          ],
          evitar: [ { claves: ['que cada uno se cuide', 'no hay presupuesto', 'el arnes estorba'], fb: 'La seguridad es responsabilidad del empleador y del residente.' } ],
          modelo: 'Pondremos barandas y plataformas completas, arnés con línea de vida en altura, señalización y orden en la obra, y daré una charla de seguridad cada mañana.'
        }
      ]
    }
  },

  /* ---------------- C-B-302 Ecología y Gestión Ambiental ---------------- */
  {
    id: 'asig-C-B-302', cod: 'C-B-302',
    titulo: 'Escombros junto al río Puyo',
    asignaturas: ['C-B-302'],
    persona: { nombre: 'Ing. Mayra Santi', rol: 'Técnica de Gestión Ambiental del GAD Municipal', avatar: '👩🏽‍💼', pitch: 1.15 },
    contexto: 'Una vecina denunció que la volqueta de tu obra deja escombros y restos de encofrado en la orilla del río Puyo. La técnica ambiental municipal llega a inspeccionar y espera que expliques cómo gestionarás los residuos, el ruido y los materiales peligrosos.',
    objetivo: 'Identificar impactos ambientales de la construcción y aplicar gestión de residuos, reciclaje, reutilización y manejo seguro de materiales.',
    pasos: [
      { dice: 'Ingeniero, encontré escombros de su obra en la orilla del río. ¿Qué explicación me da?', opciones: [
          { t: 'Reconozco el problema, detengo la descarga, retiro los escombros del río y los llevo a la escombrera autorizada.', p: 2, r: 'Bien, que lo asuma. Le daré un plazo para limpiar.', fb: 'Asumir la responsabilidad y remediar de inmediato reduce la contaminación del cauce y cumple la normativa ambiental municipal.' },
          { t: 'Digo que fue el volquetero y que hablaré con él.', p: 1, r: 'La obra es responsable de sus residuos.', fb: 'El generador del residuo responde por su disposición final aunque contrate el transporte.' },
          { t: 'Son solo piedras y tierra, no contaminan.', p: 0, r: 'Hay restos de cemento, plástico y madera tratada.', fb: 'Los escombros alteran el cauce, aumentan sedimentos y pueden arrastrar sustancias que afectan a la fauna acuática.' } ] },
      { dice: '¿Cómo va a manejar los residuos de aquí en adelante?', opciones: [
          { t: 'Clasifico en la obra: madera de encofrado y acero para reutilizar o reciclar, cartón y plástico para gestores, y escombro pétreo para relleno o escombrera.', p: 2, r: 'Eso es un plan de verdad.', fb: 'Separar en la fuente según su procedencia permite reutilizar, reciclar y reducir lo que llega a la escombrera.' },
          { t: 'Pongo un solo contenedor y todo va a la escombrera.', p: 1, r: 'Al menos no va al río, pero se desperdicia material.', fb: 'Disponer correctamente es básico, pero sin clasificación se pierde la oportunidad de reciclar.' },
          { t: 'Lo quemamos en el terreno para que no ocupe espacio.', p: 0, r: '¡Eso está prohibido!', fb: 'La quema genera humo tóxico y contaminación del aire.' } ] },
      { dice: 'También hay quejas por ruido y vi canecas de aceite y aditivo sobre la tierra.', opciones: [
          { t: 'Trabajo con maquinaria ruidosa solo en horario diurno, doy mantenimiento a equipos y almaceno aceites y aditivos sobre bandejas, bajo techo y rotulados.', p: 2, r: 'Perfecto, eso protege al vecindario y al suelo.', fb: 'Controlar horarios y almacenar sustancias con contención evita molestias y derrames.' },
          { t: 'Tapo las canecas con plástico.', p: 1, r: 'Ayuda, pero un derrame igual llega al suelo.', fb: 'Hace falta contención secundaria y un sitio adecuado.' },
          { t: 'El ruido es normal en una obra; que se aguanten.', p: 0, r: 'Así no vamos a llegar a un acuerdo.', fb: 'El ruido excesivo afecta la salud de los vecinos y puede motivar sanciones.' } ] }
    ],
    vivo: {
      lugar: 'Orilla del río Puyo junto al frente de obra', fondo: 'exterior',
      inicio: { confianza: 35, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '✋', t: 'Detener la descarga de la volqueta', p: 2, fb: 'Cortar la fuente del impacto es lo primero.', efecto: { confianza: 8, tension: -8 } },
            { icono: '🧺', t: 'Organizar la limpieza de la orilla', p: 2, fb: 'Remediar el daño demuestra responsabilidad.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗺️', t: 'Ubicar la escombrera autorizada', p: 1, fb: 'La disposición final debe hacerse en sitios autorizados.', efecto: { confianza: 4, tension: -3 } },
            { icono: '🙅', t: 'Negar que los escombros son de la obra', p: 0, fb: 'Negar la evidencia destruye la confianza con la autoridad.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Asumir responsabilidad', claves: ['reconozco', 'responsab', 'asumo', 'disculp', 'nuestra obra', 'generador'] },
            { n: 'Remediar el daño', claves: ['retir', 'limpi', 'remedi', 'recoger', 'deten', 'suspend'] },
            { n: 'Disposición autorizada', claves: ['escombrera', 'autorizad', 'disposicion', 'botadero', 'gad', 'municip'] }
          ],
          evitar: [ { claves: ['no contamina', 'solo piedras', 'fue el volquetero'], fb: 'El generador responde por sus residuos.' } ],
          modelo: 'Reconozco que son de nuestra obra; detengo la descarga, retiramos hoy los escombros de la orilla y los llevamos a la escombrera autorizada por el municipio.'
        },
        {
          acciones: [
            { icono: '♻️', t: 'Instalar puntos de clasificación de residuos', p: 2, fb: 'Separar en la fuente facilita reciclar y reutilizar.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪵', t: 'Reutilizar la madera de encofrado', p: 2, fb: 'Reutilizar reduce residuos y costos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🗑️', t: 'Juntar todo en un solo contenedor', p: 1, fb: 'Evita el vertido, pero desperdicia material reciclable.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🔥', t: 'Quemar los desechos en el terreno', p: 0, fb: 'La quema contamina el aire y está prohibida.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Clasificar en la fuente', claves: ['clasific', 'separ', 'fuente', 'tipo de residuo', 'contenedor', 'procedencia'] },
            { n: 'Reutilizar y reciclar', claves: ['reutiliz', 'recicl', 'madera', 'acero', 'chatarra', 'gestor'] },
            { n: 'Reducir lo que va a escombrera', claves: ['reduc', 'relleno', 'escombro', 'minimiz', 'desperdicio', 'menos'] }
          ],
          evitar: [ { claves: ['quemar', 'quemamos', 'al rio'], fb: 'Quemar o verter al río contamina y es sancionable.' } ],
          modelo: 'Clasificaré en la obra: la madera y el acero se reutilizan o van a reciclaje, el plástico y cartón a gestores, y el escombro pétreo a relleno o a la escombrera.'
        },
        {
          acciones: [
            { icono: '🕗', t: 'Fijar horario diurno para maquinaria ruidosa', p: 2, fb: 'Respetar horarios reduce el impacto acústico en los vecinos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🛢️', t: 'Mover aceites a bandeja bajo techo y rotulada', p: 2, fb: 'La contención secundaria evita que un derrame llegue al suelo o al río.', efecto: { confianza: 6, tension: -5 } },
            { icono: '🔧', t: 'Dar mantenimiento a la concretera y equipos', p: 1, fb: 'Equipos en buen estado hacen menos ruido y no gotean.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🔊', t: 'Trabajar con la mezcladora de noche', p: 0, fb: 'El ruido nocturno afecta el descanso y la salud de los vecinos.', efecto: { confianza: -10, tension: 12 } }
          ],
          conceptos: [
            { n: 'Control del ruido', claves: ['ruido', 'horario', 'diurno', 'mantenimiento', 'vecino', 'silenci'] },
            { n: 'Almacenamiento seguro de sustancias', claves: ['bandeja', 'bajo techo', 'rotul', 'contencion', 'derrame', 'almacen'] },
            { n: 'Proteger suelo y agua', claves: ['suelo', 'agua', 'rio', 'contamin', 'proteg', 'ambiente'] }
          ],
          evitar: [ { claves: ['que se aguanten', 'el ruido es normal'], fb: 'Desestimar las quejas agrava el conflicto con la comunidad.' } ],
          modelo: 'Usaré la maquinaria ruidosa solo en horario diurno, daré mantenimiento a los equipos y guardaré aceites y aditivos en bandejas bajo techo y rotulados para proteger el suelo y el río.'
        }
      ]
    }
  },

  /* ---------------- C-P-303 Fundiciones y Muros ---------------- */
  {
    id: 'asig-C-P-303', cod: 'C-P-303',
    titulo: 'Zapata y muro de contención en Shell',
    asignaturas: ['C-P-303'],
    persona: { nombre: 'Ing. Fausto Vargas', rol: 'Ingeniero estructural', avatar: '👨🏽‍💼', pitch: 0.9 },
    contexto: 'En un terreno inclinado de Shell se construirá una vivienda con un muro de contención de 2,5 m. El ingeniero estructural te pide verificar el tamaño de una zapata, decidir la cimentación ante un suelo blando y revisar la estabilidad del muro.',
    objetivo: 'Dimensionar fundaciones directas, elegir fundaciones combinadas o profundas y analizar empuje y estabilidad de muros según la NEC.',
    pasos: [
      { dice: 'La columna central baja 300 kN y el estudio de suelos da una capacidad admisible de 150 kPa. ¿Qué área de zapata necesitamos?', opciones: [
          { t: 'Área = carga / capacidad = 300 / 150 = 2 m²; una zapata cuadrada de aproximadamente 1,45 m de lado, verificando punzonamiento y flexión.', p: 2, r: 'Correcto. Redondeamos a 1,50 m y seguimos con el peralte.', fb: 'El área de una zapata aislada se obtiene dividiendo la carga de servicio para la capacidad admisible del suelo; luego se verifica corte, punzonamiento y flexión según la NEC.' },
          { t: 'Pongo 1 m por 1 m como en las otras casas.', p: 1, r: 'Eso da 1 m²; el suelo trabajaría al doble de lo admisible.', fb: 'Copiar dimensiones sin calcular puede sobrecargar el suelo y causar asentamientos.' },
          { t: 'No importa el tamaño si ponemos bastante hierro.', p: 0, r: 'El acero no aumenta la capacidad del suelo.', fb: 'El área de contacto controla la presión sobre el suelo; el acero resiste la flexión del hormigón.' } ] },
      { dice: 'En la parte baja el estudio encontró un estrato blando y las zapatas casi se tocan. ¿Qué propones?', opciones: [
          { t: 'Usar zapatas combinadas o una losa de cimentación, unidas con vigas de riostra; si el suelo firme está profundo, evaluar pilotes con cabezal.', p: 2, r: 'Bien razonado; lo verificamos con el geotécnico.', fb: 'Cuando las zapatas se traslapan o el suelo es débil se usan fundaciones combinadas, losas o fundaciones profundas.' },
          { t: 'Excavar más y hacer zapatas aisladas más grandes.', p: 1, r: 'Podría servir, pero se van a superponer.', fb: 'Si las zapatas se superponen conviene una fundación combinada o losa.' },
          { t: 'Rellenar con tierra del corte y cimentar encima.', p: 0, r: 'Eso es apoyar sobre un relleno sin compactar.', fb: 'Un relleno no controlado genera asentamientos diferenciales.' } ] },
      { dice: 'Para el muro de contención de 2,5 m, ¿qué debemos revisar?', opciones: [
          { t: 'Calcular el empuje del suelo y del agua, verificar volteo, deslizamiento y capacidad portante, y colocar drenaje con material filtrante y lloraderos.', p: 2, r: 'Exacto, en Puyo el agua es el enemigo número uno.', fb: 'La estabilidad de un muro se verifica ante volteo, deslizamiento y presión en la base; el drenaje evita la presión hidrostática.' },
          { t: 'Hacerlo bien grueso y con bastante hierro.', p: 1, r: 'Grueso no es sinónimo de estable sin cálculo.', fb: 'El sobredimensionamiento sin análisis encarece y no garantiza estabilidad.' },
          { t: 'Sin drenaje, para que el agua no salga por la pared.', p: 0, r: 'El agua acumulada empujará el muro.', fb: 'Sin drenaje se suma el empuje hidrostático y el muro puede fallar.' } ] }
    ],
    vivo: {
      lugar: 'Terreno inclinado en Shell, cantón Mera', fondo: 'obra',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📄', t: 'Revisar la capacidad admisible del estudio de suelos', p: 2, fb: 'La capacidad admisible es dato indispensable para dimensionar.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧮', t: 'Calcular el área dividiendo carga para capacidad', p: 2, fb: 'A = P / q admisible.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📏', t: 'Replantear la zapata de 1,50 m por lado', p: 1, fb: 'Llevar el resultado al terreno con medidas redondeadas.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🔁', t: 'Copiar la zapata de otra obra', p: 0, fb: 'Cada suelo y carga exige su propio cálculo.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Relación carga y capacidad', claves: ['carga', 'capacidad', 'admisible', 'dividi', '300', '150'] },
            { n: 'Resultado del área', claves: ['2 m', 'dos metros cuadrados', 'area', '1,45', '1,5', 'uno cincuenta'] },
            { n: 'Verificaciones estructurales', claves: ['punzonamiento', 'flexion', 'corte', 'peralte', 'nec', 'verific'] }
          ],
          evitar: [ { claves: ['bastante hierro', 'como en las otras'], fb: 'El área se calcula; el acero no reemplaza la capacidad del suelo.' } ],
          modelo: 'El área es 300 kN para 150 kPa, o sea 2 m²; haré una zapata cuadrada de 1,50 m y verificaré punzonamiento y flexión según la NEC.'
        },
        {
          acciones: [
            { icono: '🧱', t: 'Proponer losa de cimentación o zapata combinada', p: 2, fb: 'Reparte la carga en mayor área sobre suelo blando.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔗', t: 'Unir las zapatas con vigas de riostra', p: 2, fb: 'Las riostras reducen asentamientos diferenciales y mejoran el comportamiento sísmico.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📞', t: 'Consultar al geotécnico sobre pilotes', p: 1, fb: 'Si el estrato firme es profundo, los pilotes llevan la carga a él.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🚜', t: 'Cimentar sobre relleno sin compactar', p: 0, fb: 'Produce asentamientos y fisuras.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Fundación combinada o losa', claves: ['combinad', 'losa de cimentacion', 'losa de fundacion', 'platea', 'repart', 'mayor area'] },
            { n: 'Vigas de riostra', claves: ['riostra', 'cadena', 'unir', 'amarr', 'asentamiento diferencial', 'sism'] },
            { n: 'Fundaciones profundas', claves: ['pilote', 'cabezal', 'profund', 'estrato firme', 'geotecn', 'grupo de pilotes'] }
          ],
          evitar: [ { claves: ['relleno sin compactar', 'cimentar encima del relleno'], fb: 'Un relleno no controlado no es apoyo confiable.' } ],
          modelo: 'Como el suelo es blando y las zapatas se tocan, propongo una losa de cimentación o zapatas combinadas con vigas de riostra; si el estrato firme está profundo, evaluamos pilotes con cabezal.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Calcular el empuje del suelo sobre el muro', p: 2, fb: 'El empuje es la acción principal que debe resistir el muro.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💧', t: 'Colocar material filtrante y lloraderos', p: 2, fb: 'El drenaje elimina la presión del agua.', efecto: { confianza: 8, tension: -5 } },
            { icono: '⚖️', t: 'Verificar volteo y deslizamiento', p: 1, fb: 'Son las verificaciones básicas de estabilidad.', efecto: { confianza: 5, tension: -3 } },
            { icono: '🚫', t: 'Rellenar con arcilla sin drenaje', p: 0, fb: 'La arcilla saturada aumenta el empuje.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Empuje del suelo y del agua', claves: ['empuje', 'presion', 'suelo', 'hidrostatic', 'agua', 'lateral'] },
            { n: 'Estabilidad del muro', claves: ['volteo', 'deslizamiento', 'estabilidad', 'capacidad portante', 'factor de seguridad', 'base'] },
            { n: 'Drenaje', claves: ['drenaj', 'lloradero', 'mechinal', 'filtrante', 'grava', 'tuberia perforada'] }
          ],
          evitar: [ { claves: ['sin drenaje', 'bien grueso nomas'], fb: 'Sin drenaje ni cálculo el muro puede volcarse.' } ],
          modelo: 'Calculo el empuje del suelo y del agua, verifico volteo, deslizamiento y presión en la base, y coloco grava filtrante con lloraderos para drenar.'
        }
      ]
    }
  },

  /* ---------------- C-P-304 Instalaciones Hidrosanitarias ---------------- */
  {
    id: 'asig-C-P-304', cod: 'C-P-304',
    titulo: 'Agua, desagües y contra incendios en un edificio',
    asignaturas: ['C-P-304'],
    persona: { nombre: 'Doña Rosa Grefa', rol: 'Propietaria del edificio', avatar: '👩🏽', pitch: 1.2 },
    contexto: 'Doña Rosa construye en Puyo un edificio de 4 departamentos con 4 personas cada uno. Quiere saber qué cisterna necesita, cómo serán los desagües y qué le pedirán los bomberos.',
    objetivo: 'Estimar consumos, describir el suministro de agua fría y caliente, desagües, aparatos sanitarios, ventilación y sistemas contra incendios.',
    pasos: [
      { dice: 'Ingeniero, ¿de qué tamaño hago la cisterna? A veces se va el agua dos días.', opciones: [
          { t: 'Son 16 personas por unos 200 litros por persona al día: 3 200 litros diarios; para dos días de reserva, una cisterna de al menos 6,4 m³ con bomba y tanque elevado o hidroneumático.', p: 2, r: '¡Ah, ya entiendo de dónde sale el número!', fb: 'El volumen se estima con la dotación por persona, el número de ocupantes y los días de reserva.' },
          { t: 'Un tanque de 1 000 litros alcanza.', p: 1, r: '¿Para 16 personas?', fb: 'Sin calcular el consumo, la reserva resulta insuficiente.' },
          { t: 'No hace falta cisterna; que cada uno compre botellones.', p: 0, r: '¿Y para bañarse?', fb: 'El suministro continuo es básico para la salud e higiene de los usuarios.' } ] },
      { dice: 'El maestro quiere poner los desagües casi planos para no picar tanto la losa. ¿Está bien?', opciones: [
          { t: 'No; los desagües necesitan pendiente (alrededor de 2 % en ramales), sifón en cada aparato, ventilación y registros para limpieza.', p: 2, r: 'Le digo al maestro que corrija.', fb: 'La pendiente permite el flujo por gravedad; sifón y ventilación evitan malos olores.' },
          { t: 'Que le dé un poquito de pendiente, a ojo.', p: 1, r: '¿Y cuánto es un poquito?', fb: 'La pendiente debe verificarse con nivel y valores de diseño.' },
          { t: 'Sí, el agua igual corre.', p: 0, r: 'Mi vecino tiene atascos así...', fb: 'Sin pendiente se acumulan sólidos y se producen atascos.' } ] },
      { dice: 'El Cuerpo de Bomberos de Pastaza pide algo contra incendios. ¿Qué ponemos?', opciones: [
          { t: 'Planos del sistema contra incendios con extintores, gabinetes y reserva de agua según lo que pida el Cuerpo de Bomberos, más señalización y luces de emergencia.', p: 2, r: 'Así sacamos el permiso sin problema.', fb: 'Los edificios requieren un sistema contra incendios aprobado por el Cuerpo de Bomberos local.' },
          { t: 'Compramos un extintor y lo ponemos en la entrada.', p: 1, r: '¿Y en los pisos de arriba?', fb: 'Un solo extintor no cubre la edificación.' },
          { t: 'Eso es trámite; no hace falta.', p: 0, r: 'Sin eso no me dan el permiso.', fb: 'Omitir la protección contra incendios pone vidas en riesgo.' } ] }
    ],
    vivo: {
      lugar: 'Edificio de departamentos en construcción, Puyo', fondo: 'obra',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '👪', t: 'Contar los ocupantes del edificio', p: 2, fb: 'El número de personas es la base del consumo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧮', t: 'Calcular consumo diario y días de reserva', p: 2, fb: 'Volumen = personas × dotación × días.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔥', t: 'Prever calefón o termotanque para agua caliente', p: 1, fb: 'El agua caliente es otra red del suministro.', efecto: { confianza: 3, tension: -1 } },
            { icono: '🪣', t: 'Comprar un tanque pequeño sin calcular', p: 0, fb: 'La reserva resultará insuficiente.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Dotación por persona', claves: ['dotacion', '200 litros', 'doscientos', 'por persona', 'consumo', 'litros'] },
            { n: 'Resultado del volumen', claves: ['3200', '3 200', 'tres mil doscientos', '6,4', '6400', 'seis mil cuatrocientos'] },
            { n: 'Sistema de suministro', claves: ['cisterna', 'bomba', 'tanque elevado', 'hidroneumatic', 'reserva', 'presion'] }
          ],
          evitar: [ { claves: ['botellones', 'no hace falta cisterna'], fb: 'El edificio necesita un suministro continuo.' } ],
          modelo: 'Son 16 personas por 200 litros, 3 200 litros al día; para dos días, una cisterna de 6,4 m³ con bomba e hidroneumático.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Verificar la pendiente con nivel', p: 2, fb: 'La pendiente asegura el flujo por gravedad.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🌀', t: 'Instalar sifón en cada aparato sanitario', p: 2, fb: 'El sello de agua impide el paso de gases.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔲', t: 'Dejar registros de limpieza', p: 1, fb: 'Facilitan el mantenimiento.', efecto: { confianza: 4, tension: -2 } },
            { icono: '➖', t: 'Aceptar tubería horizontal sin pendiente', p: 0, fb: 'Provoca atascos y retornos.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Pendiente', claves: ['pendiente', '2 %', 'dos por ciento', 'gravedad', 'nivel', 'caida'] },
            { n: 'Sifón y ventilación', claves: ['sifon', 'ventilacion', 'olor', 'gases', 'sello', 'tubo de ventilacion'] },
            { n: 'Mantenimiento', claves: ['registro', 'limpieza', 'caja de revision', 'mantenimiento', 'atasco', 'inspeccion'] }
          ],
          evitar: [ { claves: ['casi plano', 'igual corre', 'a ojo'], fb: 'La pendiente se diseña y se verifica.' } ],
          modelo: 'Los desagües necesitan pendiente de alrededor de 2 %, sifón en cada aparato, tubería de ventilación y registros para limpieza.'
        },
        {
          acciones: [
            { icono: '🧯', t: 'Ubicar extintores en cada piso', p: 2, fb: 'Cada nivel necesita medios de extinción accesibles.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🚒', t: 'Presentar planos al Cuerpo de Bomberos', p: 2, fb: 'La aprobación del sistema contra incendios es requisito.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🚪', t: 'Señalizar salidas y colocar luces de emergencia', p: 1, fb: 'Facilita la evacuación.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🙈', t: 'Omitir el sistema contra incendios', p: 0, fb: 'Pone en riesgo vidas y el permiso.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Medios de extinción', claves: ['extintor', 'gabinete', 'manguera', 'reserva de agua', 'hidrante', 'contra incendio'] },
            { n: 'Aprobación de bomberos', claves: ['bomberos', 'plano', 'permiso', 'aprob', 'norma', 'requisit'] },
            { n: 'Evacuación', claves: ['senal', 'salida', 'luz de emergencia', 'luces de emergencia', 'evacu', 'ruta'] }
          ],
          evitar: [ { claves: ['es tramite', 'no hace falta'], fb: 'La protección contra incendios salva vidas.' } ],
          modelo: 'Haremos los planos contra incendios con extintores en cada piso, gabinete y reserva de agua, señalización y luces de emergencia, y los presentaremos al Cuerpo de Bomberos.'
        }
      ]
    }
  },

  /* ---------------- C-P-305 Instalaciones Eléctricas, Especiales y Climatización ---------------- */
  {
    id: 'asig-C-P-305', cod: 'C-P-305',
    titulo: 'Hostería eficiente en Tarqui',
    asignaturas: ['C-P-305'],
    persona: { nombre: 'Sr. Patricio Cerda', rol: 'Propietario de una hostería', avatar: '👨🏻', pitch: 1.0 },
    contexto: 'El dueño de una hostería en Tarqui quiere bajar la planilla de luz, mantener frescas las habitaciones y cumplir con la seguridad. Debes explicarle iluminación eficiente, domótica, instalaciones de seguridad y climatización.',
    objetivo: 'Aplicar luminotecnia, eficiencia energética, domótica, instalaciones eléctricas de seguridad y climatización eficiente.',
    pasos: [
      { dice: 'Pago muchísimo de luz. Tengo focos incandescentes en todo lado. ¿Qué hago?', opciones: [
          { t: 'Cambiar a luminarias LED con los lux adecuados para cada espacio, aprovechar luz natural y sectorizar los circuitos de iluminación.', p: 2, r: '¿O sea que no es solo poner más focos?', fb: 'La luminotecnia busca el nivel de iluminación requerido (lux) con el menor consumo; el LED da más lúmenes por vatio.' },
          { t: 'Cambiar solo los focos de la recepción.', p: 1, r: 'Algo ahorraré...', fb: 'Un cambio parcial ayuda, pero no aprovecha todo el potencial de ahorro.' },
          { t: 'Apagar las luces de los pasillos en la noche.', p: 0, r: '¿Y si un huésped se cae?', fb: 'Dejar sin iluminación circulaciones pone en riesgo a las personas.' } ] },
      { dice: 'Me hablaron de domótica. ¿Sirve para algo en una hostería?', opciones: [
          { t: 'Sí: sensores de presencia en pasillos y baños, tarjeta que corta la energía al salir de la habitación y temporizadores en exteriores.', p: 2, r: '¡Lo de la tarjeta me encanta!', fb: 'La domótica automatiza el uso de energía según la ocupación real.' },
          { t: 'Solo sirve para encender luces con el celular.', p: 1, r: '¿Y eso ahorra?', fb: 'La domótica va más allá: control por ocupación y horarios.' },
          { t: 'Es carísimo y no sirve.', p: 0, r: 'Ah, bueno...', fb: 'Hay soluciones sencillas y de bajo costo con retorno rápido.' } ] },
      { dice: 'Hace calor y humedad. ¿Pongo aire acondicionado en todas las habitaciones? ¿Y lo de seguridad?', opciones: [
          { t: 'Priorizar ventilación cruzada y ventiladores de techo; si se usa aire, equipos inverter en circuito independiente con breaker, puesta a tierra e iluminación de emergencia.', p: 2, r: 'Fresco, seguro y sin quebrarme.', fb: 'El diseño pasivo y los equipos eficientes reducen consumo; circuitos protegidos y puesta a tierra dan seguridad.' },
          { t: 'Aire acondicionado convencional en todas las habitaciones.', p: 1, r: '¿Y la planilla?', fb: 'Climatiza, pero con alto consumo.' },
          { t: 'Conectar los aires a los tomacorrientes existentes.', p: 0, r: '¿Se pueden quemar los cables?', fb: 'La sobrecarga puede provocar un incendio eléctrico.' } ] }
    ],
    vivo: {
      lugar: 'Hostería en la parroquia Tarqui, Pastaza', fondo: 'exterior',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '💡', t: 'Medir el nivel de iluminación con un luxómetro', p: 2, fb: 'Saber cuántos lux hay permite dimensionar bien.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔆', t: 'Reemplazar focos incandescentes por LED', p: 2, fb: 'El LED consume mucho menos para la misma luz.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪟', t: 'Aprovechar la luz natural en áreas comunes', p: 1, fb: 'La luz natural reduce el uso diurno de lámparas.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🌑', t: 'Apagar la iluminación de pasillos', p: 0, fb: 'Las circulaciones deben estar iluminadas.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Nivel de iluminación', claves: ['lux', 'luxometro', 'nivel de iluminacion', 'lumen', 'luminotecnia', 'cada espacio'] },
            { n: 'Tecnología eficiente', claves: ['led', 'eficien', 'menos vatios', 'consumo', 'ahorro', 'incandescente'] },
            { n: 'Luz natural y sectorización', claves: ['luz natural', 'sectoriz', 'circuito', 'ventana', 'zona', 'interruptor'] }
          ],
          evitar: [ { claves: ['apagar los pasillos', 'dejar a oscuras'], fb: 'Ahorrar no debe comprometer la seguridad.' } ],
          modelo: 'Mediremos los lux de cada espacio y cambiaremos a LED, aprovechando la luz natural y sectorizando los circuitos para encender solo lo necesario.'
        },
        {
          acciones: [
            { icono: '👣', t: 'Instalar sensores de presencia en pasillos', p: 2, fb: 'Encienden solo cuando hay personas.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💳', t: 'Colocar tarjeteros de corte en habitaciones', p: 2, fb: 'Al salir el huésped se corta la energía.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⏲️', t: 'Programar temporizadores en exteriores', p: 1, fb: 'Controlan horarios de encendido.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🤷', t: 'Descartar la domótica sin analizar', p: 0, fb: 'Se pierde una herramienta de ahorro.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Automatización', claves: ['domotic', 'automat', 'control', 'inteligente', 'programa', 'temporizador'] },
            { n: 'Control por ocupación', claves: ['sensor', 'presencia', 'tarjeta', 'ocupacion', 'movimiento', 'cuando sale'] },
            { n: 'Gestión eficiente de energía', claves: ['ahorr', 'energia', 'planilla', 'consumo', 'eficien', 'kilovatio'] }
          ],
          evitar: [ { claves: ['no sirve', 'es carisimo'], fb: 'Hay soluciones domóticas sencillas y rentables.' } ],
          modelo: 'Sí sirve: sensores de presencia en pasillos y baños, tarjeta que corta la energía al salir y temporizadores afuera; así se gasta solo cuando hay ocupación.'
        },
        {
          acciones: [
            { icono: '🌬️', t: 'Diseñar ventilación cruzada y ventiladores de techo', p: 2, fb: 'La climatización pasiva reduce el consumo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '⚡', t: 'Prever circuito independiente con breaker', p: 2, fb: 'Cada equipo de climatización necesita su protección.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🌍', t: 'Verificar la puesta a tierra', p: 2, fb: 'Protege a las personas contra descargas.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔌', t: 'Enchufar los aires en tomacorrientes comunes', p: 0, fb: 'Sobrecarga y riesgo de incendio.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Climatización eficiente', claves: ['ventilacion cruzada', 'ventilador', 'inverter', 'pasiv', 'climatiz', 'aire acondicionado'] },
            { n: 'Protecciones eléctricas', claves: ['breaker', 'circuito independiente', 'protecci', 'disyuntor', 'sobrecarga', 'tablero'] },
            { n: 'Instalaciones de seguridad', claves: ['puesta a tierra', 'tierra', 'luz de emergencia', 'iluminacion de emergencia', 'seguridad', 'descarga'] }
          ],
          evitar: [ { claves: ['tomacorrientes existentes', 'enchufar nomas'], fb: 'La sobrecarga puede causar un incendio.' } ],
          modelo: 'Primero ventilación cruzada y ventiladores de techo; donde haga falta aire, equipos inverter en circuito independiente con breaker, buena puesta a tierra e iluminación de emergencia.'
        }
      ]
    }
  },

  /* ---------------- C-P-306 Proyectos 1 ---------------- */
  {
    id: 'asig-C-P-306', cod: 'C-P-306',
    titulo: 'Centro de acopio de cacao para la asociación',
    asignaturas: ['C-P-306'],
    persona: { nombre: 'Don Hilario Vargas', rol: 'Presidente de una asociación de cacaoteros', avatar: '👨🏽‍🌾', pitch: 0.9 },
    contexto: 'Una asociación de productores de Arajuno quiere construir un centro de acopio y secado de cacao. Te piden orientar la formulación del proyecto: sus etapas, el diagnóstico y el estudio técnico y la estructura del informe de factibilidad.',
    objetivo: 'Aplicar el ciclo y las etapas de un proyecto, el diagnóstico, el análisis de factibilidad y el estudio técnico y financiero.',
    pasos: [
      { dice: 'Ya tenemos la idea. ¿Empezamos a construir el próximo mes con lo que juntamos?', opciones: [
          { t: 'Primero seguimos el ciclo del proyecto: idea, perfil, prefactibilidad, factibilidad y diseño; luego ejecución, operación y evaluación.', p: 2, r: 'Ya, paso a paso para no botar la plata.', fb: 'Recorrer las etapas reduce la incertidumbre antes de comprometer recursos.' },
          { t: 'Hacemos un dibujo y un presupuesto rápido y arrancamos.', p: 1, r: '¿Y si no alcanza?', fb: 'Saltarse etapas aumenta el riesgo de sobrecostos.' },
          { t: 'Sí, construyamos y luego vemos para qué sirve.', p: 0, r: 'Mmm, eso ya nos pasó con el galpón.', fb: 'Ejecutar sin estudios suele terminar en obras abandonadas.' } ] },
      { dice: '¿Qué tenemos que averiguar antes de diseñar?', opciones: [
          { t: 'Un diagnóstico: cuántos socios y quintales producen, problemas actuales del secado, acceso vial, agua y luz; con eso definimos ubicación y tamaño en el estudio técnico.', p: 2, r: 'Tenemos 60 socios; le traigo los datos de cosecha.', fb: 'El diagnóstico sustenta el tamaño, la localización y la tecnología del proyecto.' },
          { t: 'Solo el precio del terreno.', p: 1, r: '¿Nada más?', fb: 'El terreno es un dato, pero falta la demanda y las condiciones técnicas.' },
          { t: 'Nada, ya sabemos lo que queremos.', p: 0, r: 'Bueno...', fb: 'Sin diagnóstico el proyecto puede quedar sobredimensionado o inútil.' } ] },
      { dice: 'Para pedir apoyo al GAD nos piden un informe. ¿Qué debe llevar?', opciones: [
          { t: 'Antecedentes, diagnóstico, objetivos, metodología, estudio técnico, análisis de factibilidad técnica, legal, ambiental y financiera, presupuesto y cronograma.', p: 2, r: 'Con eso sí nos toman en serio.', fb: 'La estructura del informe permite juzgar ventajas y desventajas de asignar recursos.' },
          { t: 'Una carta pidiendo la plata con fotos.', p: 1, r: 'Así lo hicimos antes y no salió.', fb: 'Falta sustento técnico y financiero.' },
          { t: 'Un presupuesto inflado por si acaso.', p: 0, r: '¿Eso no es engañar?', fb: 'Inflar costos es antiético y resta credibilidad.' } ] }
    ],
    vivo: {
      lugar: 'Casa comunal de la asociación, Arajuno', fondo: 'comunidad',
      inicio: { confianza: 55, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🔄', t: 'Dibujar en un papelógrafo el ciclo del proyecto', p: 2, fb: 'Visualizar las etapas ayuda a la comunidad a entender el proceso.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🗓️', t: 'Acordar un plan para cada etapa', p: 1, fb: 'Organiza el trabajo de la asociación.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🏗️', t: 'Contratar la obra de inmediato', p: 0, fb: 'Se omiten estudios clave.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Ciclo del proyecto', claves: ['ciclo', 'etapa', 'fase', 'paso a paso', 'preinversion', 'inversion'] },
            { n: 'Estudios previos', claves: ['perfil', 'prefactibilidad', 'factibilidad', 'diseno', 'estudio', 'idea'] },
            { n: 'Ejecución y operación', claves: ['ejecucion', 'operacion', 'evaluacion', 'construir despues', 'funcionamiento', 'seguimiento'] }
          ],
          evitar: [ { claves: ['construyamos ya', 'luego vemos'], fb: 'Ejecutar sin estudios desperdicia recursos.' } ],
          modelo: 'Antes de construir seguimos el ciclo: idea, perfil, prefactibilidad, factibilidad y diseño; después viene la ejecución, la operación y la evaluación.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Levantar datos de socios y producción', p: 2, fb: 'La producción define la capacidad del centro.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🚙', t: 'Visitar posibles terrenos y su acceso vial', p: 2, fb: 'La localización depende de acceso y servicios.', efecto: { confianza: 6, tension: -3 } },
            { icono: '💲', t: 'Preguntar solo el precio del terreno', p: 1, fb: 'Es un dato, no todo el diagnóstico.', efecto: { confianza: 2, tension: 0 } },
            { icono: '⏭️', t: 'Saltarse el diagnóstico', p: 0, fb: 'El proyecto queda sin sustento.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Diagnóstico', claves: ['diagnostic', 'problema', 'situacion actual', 'socios', 'produccion', 'quintal'] },
            { n: 'Localización', claves: ['ubicacion', 'localizacion', 'acceso', 'via', 'agua', 'luz'] },
            { n: 'Tamaño y tecnología', claves: ['tamano', 'capacidad', 'secado', 'tecnolog', 'estudio tecnico', 'dimension'] }
          ],
          evitar: [ { claves: ['ya sabemos', 'no hace falta averiguar'], fb: 'El diagnóstico evita errores de diseño.' } ],
          modelo: 'Hagamos un diagnóstico: cuántos socios y quintales hay, qué problemas de secado tienen y qué terreno tiene acceso, agua y luz; con eso definimos ubicación y tamaño.'
        },
        {
          acciones: [
            { icono: '🗂️', t: 'Armar el índice del informe del proyecto', p: 2, fb: 'Ordena la información para la entidad que financia.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📊', t: 'Incluir el análisis de factibilidad financiera', p: 2, fb: 'Demuestra que el proyecto es sostenible.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌿', t: 'Revisar requisitos legales y ambientales', p: 1, fb: 'La factibilidad también es legal y ambiental.', efecto: { confianza: 4, tension: -2 } },
            { icono: '📈', t: 'Inflar el presupuesto por si acaso', p: 0, fb: 'Es antiético y resta credibilidad.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Estructura del informe', claves: ['antecedente', 'objetivo', 'metodolog', 'informe', 'indice', 'diagnostic'] },
            { n: 'Factibilidad integral', claves: ['factibilidad', 'tecnic', 'legal', 'ambiental', 'financier', 'viable'] },
            { n: 'Presupuesto y cronograma', claves: ['presupuesto', 'cronograma', 'costo', 'plazo', 'financiamiento', 'aporte'] }
          ],
          evitar: [ { claves: ['inflar', 'por si acaso'], fb: 'El presupuesto debe ser real y sustentado.' } ],
          modelo: 'El informe lleva antecedentes, diagnóstico, objetivos, metodología, estudio técnico, factibilidad técnica, legal, ambiental y financiera, presupuesto y cronograma.'
        }
      ]
    }
  },

  /* ---------------- C-P-401 Contratación Pública ---------------- */
  {
    id: 'asig-C-P-401', cod: 'C-P-401',
    titulo: 'Batería sanitaria del GAD parroquial',
    asignaturas: ['C-P-401'],
    persona: { nombre: 'Sr. Wilson Aguinda', rol: 'Vocal del GAD parroquial', avatar: '👨🏽‍💼', pitch: 1.0 },
    contexto: 'El GAD parroquial de Fátima necesita construir una batería sanitaria en la cancha. Un vocal quiere dársela directamente a un conocido y partir el monto en dos facturas. Como técnico de apoyo debes orientar el proceso conforme a la LOSNCP.',
    objetivo: 'Aplicar los fundamentos del Sistema Nacional de Contratación Pública, los documentos precontractuales y la elección del procedimiento.',
    pasos: [
      { dice: 'Tengo un primo maestro que la hace barato. Le pasamos la plata y listo, ¿no?', opciones: [
          { t: 'No se puede: es obra pública y debe contratarse por el Sistema Nacional de Contratación Pública, con publicidad, concurrencia y transparencia en el portal de compras públicas.', p: 2, r: 'Pero así se demora más...', fb: 'La LOSNCP rige las contrataciones de obras con recursos públicos bajo principios de transparencia, igualdad y concurrencia; además hay conflicto de interés.' },
          { t: 'Que el primo presente una proforma y le adjudicamos.', p: 1, r: '¿Con una proforma basta?', fb: 'Una proforma no reemplaza el procedimiento ni evita el conflicto de interés.' },
          { t: 'Sí, así ahorramos tiempo.', p: 0, r: 'Perfecto, le aviso.', fb: 'La contratación directa sin procedimiento y con un familiar puede acarrear responsabilidades administrativas, civiles y penales.' } ] },
      { dice: '¿Y qué papeles necesitamos antes de publicar?', opciones: [
          { t: 'Estudios y diseños completos, especificaciones técnicas, presupuesto referencial, certificación presupuestaria, que conste en el plan anual de contratación y los pliegos.', p: 2, r: 'Ah, es bastante, pero tiene sentido.', fb: 'La fase precontractual exige documentos que sustentan la necesidad, el costo y la disponibilidad de fondos.' },
          { t: 'Solo el presupuesto y unos planos.', p: 1, r: '¿Y lo de la plata?', fb: 'Falta la certificación presupuestaria y los pliegos.' },
          { t: 'Nada; lo vemos durante la obra.', p: 0, r: 'Así no se puede publicar.', fb: 'Sin documentos precontractuales el proceso no puede iniciar.' } ] },
      { dice: 'Si partimos en dos contratos más pequeños, ¿sale más rápido?', opciones: [
          { t: 'Eso es subdividir el contrato para evadir el procedimiento y está prohibido; elegimos el procedimiento que corresponde al monto total y al tipo de obra.', p: 2, r: 'Entendido, mejor hacerlo bien.', fb: 'La normativa prohíbe fraccionar contrataciones para eludir procedimientos; el procedimiento se define por el presupuesto referencial total.' },
          { t: 'Depende; si nadie se da cuenta, sí.', p: 1, r: '¿Y si nos auditan?', fb: 'La legalidad no depende de si se descubre o no.' },
          { t: 'Claro, así cada uno es de menor cuantía.', p: 0, r: 'Listo, hagamos así.', fb: 'Fraccionar es una infracción grave y será observada por los organismos de control.' } ] }
    ],
    vivo: {
      lugar: 'Oficina del GAD parroquial de Fátima', fondo: 'oficina',
      inicio: { confianza: 50, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '⚖️', t: 'Explicar los principios de la contratación pública', p: 2, fb: 'Transparencia, igualdad y concurrencia rigen el sistema.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💻', t: 'Mostrar el portal de compras públicas', p: 2, fb: 'Los procesos se publican en el portal del SERCOP.', efecto: { confianza: 6, tension: -3 } },
            { icono: '⚠️', t: 'Advertir sobre el conflicto de interés', p: 1, fb: 'Contratar a familiares de autoridades está restringido.', efecto: { confianza: 3, tension: 2 } },
            { icono: '🤝', t: 'Aceptar entregar la obra al primo', p: 0, fb: 'Viola la normativa y la ética pública.', efecto: { confianza: -15, tension: 10 } }
          ],
          conceptos: [
            { n: 'Sistema Nacional de Contratación Pública', claves: ['contratacion publica', 'sistema nacional', 'losncp', 'sercop', 'portal', 'compras publicas'] },
            { n: 'Principios', claves: ['transparen', 'concurrencia', 'igualdad', 'publicidad', 'competencia', 'legal'] },
            { n: 'Conflicto de interés', claves: ['conflicto de interes', 'familiar', 'primo', 'parentesco', 'inhabilid', 'etica'] }
          ],
          evitar: [ { claves: ['le pasamos la plata', 'a dedo', 'directo al primo'], fb: 'La adjudicación directa sin procedimiento es ilegal.' } ],
          modelo: 'No se puede, es obra pública: debe ir por el Sistema Nacional de Contratación Pública en el portal, con transparencia y concurrencia, y contratar a un familiar sería conflicto de interés.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Revisar estudios, planos y especificaciones', p: 2, fb: 'Son la base técnica de los pliegos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '💵', t: 'Solicitar la certificación presupuestaria', p: 2, fb: 'Garantiza que existen fondos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📑', t: 'Verificar que esté en el plan anual de contratación', p: 1, fb: 'La contratación debe estar planificada.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🏃', t: 'Iniciar la obra sin documentos', p: 0, fb: 'No hay base legal para pagar.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Estudios técnicos', claves: ['estudio', 'diseno', 'plano', 'especificacion', 'tecnic', 'cantidades'] },
            { n: 'Presupuesto y fondos', claves: ['presupuesto referencial', 'certificacion presupuestaria', 'fondos', 'partida', 'presupuesto', 'disponibilidad'] },
            { n: 'Planificación y pliegos', claves: ['plan anual', 'pac', 'pliego', 'precontractual', 'planific', 'documento'] }
          ],
          evitar: [ { claves: ['lo vemos durante la obra', 'sin papeles'], fb: 'La fase precontractual es obligatoria.' } ],
          modelo: 'Necesitamos estudios y diseños, especificaciones técnicas, presupuesto referencial, certificación presupuestaria, que conste en el plan anual de contratación y los pliegos.'
        },
        {
          acciones: [
            { icono: '🧾', t: 'Calcular el presupuesto referencial total', p: 2, fb: 'El monto total define el procedimiento.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📚', t: 'Consultar el procedimiento que corresponde al monto', p: 2, fb: 'Cada rango de monto tiene su procedimiento.', efecto: { confianza: 6, tension: -3 } },
            { icono: '✂️', t: 'Dividir la obra en dos contratos', p: 0, fb: 'Es subdivisión prohibida para evadir procedimientos.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Prohibición de fraccionar', claves: ['fraccion', 'subdivid', 'dividir', 'partir', 'prohibid', 'evadir'] },
            { n: 'Procedimiento según monto', claves: ['procedimiento', 'monto', 'menor cuantia', 'cotizacion', 'licitacion', 'presupuesto total'] },
            { n: 'Control y responsabilidad', claves: ['prohibido', 'contraloria', 'control', 'auditor', 'responsabilidad', 'sancion', 'legal'] }
          ],
          evitar: [ { claves: ['si nadie se da cuenta', 'partimos en dos'], fb: 'Fraccionar es una infracción grave.' } ],
          modelo: 'No podemos partir el contrato, eso es fraccionar para evadir el procedimiento y está prohibido; elegimos el procedimiento que corresponde al presupuesto total de la obra.'
        }
      ]
    }
  },

  /* ---------------- C-P-402 Urbanismo ---------------- */
  {
    id: 'asig-C-P-402', cod: 'C-P-402',
    titulo: 'Lotización junto al estero',
    asignaturas: ['C-P-402'],
    persona: { nombre: 'Arq. Daniela Ushiña', rol: 'Técnica de Planificación del GAD Municipal de Pastaza', avatar: '👩🏻‍💼', pitch: 1.15 },
    contexto: 'Un promotor quiere lotizar un terreno de 3 ha en las afueras de Puyo que baja hacia un estero. La técnica municipal te pide presentar el análisis de sitio: cuenca, clima, pendientes, áreas urbanizables y cortes y rellenos.',
    objetivo: 'Realizar análisis de sitio, clasificar pendientes, definir áreas urbanizables y no urbanizables y equilibrar cortes y rellenos.',
    pasos: [
      { dice: 'Antes de ver lotes, cuénteme qué analizó del entorno natural.', opciones: [
          { t: 'Identifiqué la cuenca y el estero que recibe la escorrentía, la alta pluviosidad y humedad de Puyo, el asoleamiento y los vientos, y las zonas inundables.', p: 2, r: 'Bien, empezó por donde se debe.', fb: 'El análisis de sitio parte de las condiciones naturales a escala territorial y de ciudad: cuenca, clima y riesgos.' },
          { t: 'Revisé que haya calle de acceso.', p: 1, r: 'Es importante, pero no es lo natural.', fb: 'El acceso es necesario, pero falta el análisis físico-geográfico.' },
          { t: 'Nada, el terreno se ve bonito.', p: 0, r: 'Así no puedo aprobar nada.', fb: 'Sin análisis de sitio se urbanizan zonas de riesgo.' } ] },
      { dice: 'El terreno baja 12 metros en 80 metros hacia el estero. ¿Qué pendiente es y qué implica?', opciones: [
          { t: 'Pendiente = 12 / 80 × 100 = 15 %; es urbanizable con restricciones, con vías siguiendo las curvas de nivel; las zonas sobre 30 % y la franja de protección del estero quedan como no urbanizables.', p: 2, r: 'Correcto, así se debe presentar el mapa de pendientes.', fb: 'La clasificación de pendientes define aptitud: suaves aptas, moderadas con restricciones y fuertes no urbanizables.' },
          { t: 'Es como 10 %, se puede lotizar todo.', p: 1, r: 'Revise el cálculo.', fb: '12/80 da 15 %; además hay que excluir zonas de protección.' },
          { t: 'La pendiente no importa, se aplana con maquinaria.', p: 0, r: '¿Y la erosión?', fb: 'Aplanar todo genera grandes movimientos de tierra, erosión e inestabilidad.' } ] },
      { dice: 'El promotor quiere rellenar la orilla del estero con la tierra que corte arriba.', opciones: [
          { t: 'No se rellena la franja de protección; buscamos equilibrar cortes y rellenos dentro del área urbanizable, con taludes estables, drenaje y cobertura vegetal.', p: 2, r: 'Eso protege el estero y abarata el movimiento de tierras.', fb: 'Compensar cortes y rellenos reduce costos y el respeto a márgenes de protección evita inundaciones.' },
          { t: 'Rellenar solo una parte de la orilla.', p: 1, r: 'Sigue afectando el cauce.', fb: 'Cualquier relleno en la franja de protección reduce la capacidad hidráulica.' },
          { t: 'Sí, así ganamos más lotes.', p: 0, r: 'Y en el primer aguacero se inundan.', fb: 'Rellenar márgenes de ríos y esteros provoca inundaciones y daño ambiental.' } ] }
    ],
    vivo: {
      lugar: 'Terreno a lotizar en las afueras de Puyo', fondo: 'exterior',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Ubicar la cuenca hidrográfica en el mapa', p: 2, fb: 'El desarrollo urbano se inserta en una cuenca.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌧️', t: 'Analizar lluvia, humedad y asoleamiento', p: 2, fb: 'El clima condiciona drenaje y diseño.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌊', t: 'Marcar las zonas inundables', p: 1, fb: 'Identifica limitaciones del sitio.', efecto: { confianza: 4, tension: -2 } },
            { icono: '😎', t: 'Saltar al trazado de lotes', p: 0, fb: 'Ignora restricciones naturales.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Cuenca hidrográfica', claves: ['cuenca', 'estero', 'escorrentia', 'drenaje natural', 'rio', 'hidrograf'] },
            { n: 'Condiciones climáticas', claves: ['clima', 'lluvia', 'pluviosidad', 'humedad', 'asoleamiento', 'viento'] },
            { n: 'Oportunidades y limitaciones', claves: ['inundable', 'riesgo', 'limitacion', 'oportunidad', 'restriccion', 'vegetacion'] }
          ],
          evitar: [ { claves: ['se ve bonito', 'no analice'], fb: 'El análisis de sitio es obligatorio.' } ],
          modelo: 'Identifiqué la cuenca y el estero que recibe la escorrentía, la lluvia y humedad de Puyo, el asoleamiento y vientos, y marqué las zonas inundables como limitaciones.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Calcular la pendiente con desnivel y distancia', p: 2, fb: 'Pendiente % = desnivel / distancia × 100.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🎨', t: 'Elaborar el mapa de pendientes por rangos', p: 2, fb: 'Permite clasificar la aptitud del suelo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🛣️', t: 'Trazar vías siguiendo curvas de nivel', p: 1, fb: 'Reduce cortes y pendientes de vía.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🚜', t: 'Proponer aplanar todo el terreno', p: 0, fb: 'Genera erosión y costos excesivos.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Cálculo de pendiente', claves: ['12', '80', 'desnivel', 'distancia', 'por cien', 'dividi'] },
            { n: 'Resultado', claves: ['15 %', '15 por ciento', 'quince por ciento', 'quince', '15'] },
            { n: 'Clasificación de aptitud', claves: ['urbanizable', 'restriccion', 'no urbanizable', '30 %', 'treinta', 'clasific'] }
          ],
          evitar: [ { claves: ['no importa la pendiente', 'se aplana'], fb: 'La pendiente define la aptitud urbana.' } ],
          modelo: 'La pendiente es 12 para 80 por cien, o sea 15 %; es urbanizable con restricciones y las zonas sobre 30 % y la franja del estero quedan no urbanizables.'
        },
        {
          acciones: [
            { icono: '🌳', t: 'Delimitar la franja de protección del estero', p: 2, fb: 'Las márgenes de protección no se urbanizan.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⚖️', t: 'Balancear volúmenes de corte y relleno', p: 2, fb: 'Compensar reduce transporte y costos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌱', t: 'Proteger taludes con vegetación y cunetas', p: 1, fb: 'Evita la erosión por lluvia.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🏞️', t: 'Rellenar la orilla para ganar lotes', p: 0, fb: 'Provoca inundaciones y daño ambiental.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Protección del estero', claves: ['franja de proteccion', 'margen', 'retiro', 'no rellen', 'estero', 'proteg'] },
            { n: 'Equilibrio de cortes y rellenos', claves: ['corte', 'relleno', 'equilibr', 'compens', 'balance', 'volumen'] },
            { n: 'Estabilidad y drenaje', claves: ['talud', 'drenaj', 'cuneta', 'vegeta', 'erosion', 'estab'] }
          ],
          evitar: [ { claves: ['ganar mas lotes', 'rellenar la orilla'], fb: 'Rellenar márgenes causa inundaciones.' } ],
          modelo: 'No rellenaremos la franja de protección del estero; equilibramos cortes y rellenos dentro del área urbanizable, con taludes estables, cunetas y vegetación.'
        }
      ]
    }
  },

  /* ---------------- C-P-403 Administración de Obras ---------------- */
  {
    id: 'asig-C-P-403', cod: 'C-P-403',
    titulo: 'Visita del fiscalizador: diario, precios y calidad',
    asignaturas: ['C-P-403'],
    persona: { nombre: 'Ing. Gonzalo Mejía', rol: 'Fiscalizador de la obra', avatar: '👨🏽‍🔧', pitch: 0.9 },
    contexto: 'En la construcción de una unidad educativa en Puyo, el fiscalizador revisa el diario de obra, el cómputo y precio de la losa del bloque B y el control de calidad del hormigón. Debes responder como residente.',
    objetivo: 'Aplicar el diario de obra, cómputos métricos, análisis de precios unitarios, control de calidad con laboratorio de campo e informes.',
    pasos: [
      { dice: 'Residente, el diario de obra tiene tres días en blanco. ¿Qué pasó?', opciones: [
          { t: 'Reconozco el retraso; desde hoy registro a diario personal, equipo, avance, clima, ensayos, órdenes e incidentes, firmado por residente y fiscalizador.', p: 2, r: 'Bien. El diario es el respaldo de todos.', fb: 'El diario de obra es un documento oficial que registra día a día lo que ocurre en la obra.' },
          { t: 'Lo lleno al final de la semana de memoria.', p: 1, r: 'De memoria se olvidan cosas.', fb: 'El registro debe ser diario para ser confiable.' },
          { t: 'Eso es papeleo; lo importante es avanzar.', p: 0, r: 'Sin diario no hay respaldo para pagos ni reclamos.', fb: 'Sin diario no se pueden sustentar planillas, ampliaciones de plazo ni reclamos.' } ] },
      { dice: 'La losa mide 10 por 8 metros y 20 cm de espesor. ¿Cuánto hormigón es y cómo armó el precio unitario?', opciones: [
          { t: '10 × 8 × 0,20 = 16 m³; el precio unitario suma equipo, mano de obra, materiales y transporte como costo directo más los indirectos y utilidad.', p: 2, r: 'Cómputo y análisis correctos.', fb: 'El cómputo métrico da la cantidad y el análisis de precios unitarios sustenta el costo por unidad de obra.' },
          { t: 'Unos 16 m³; el precio lo saqué de la proforma del proveedor.', p: 1, r: 'La proforma es solo el material.', fb: 'El precio unitario incluye además mano de obra, equipo, transporte e indirectos.' },
          { t: 'Pedí 25 m³ por si acaso.', p: 0, r: 'Eso es casi 60 % de desperdicio.', fb: 'Sin cómputo se encarece la obra y se generan residuos.' } ] },
      { dice: '¿Y cómo controla la calidad del hormigón?', opciones: [
          { t: 'En cada fundición hago asentamiento con cono de Abrams en el laboratorio de campo, tomo cilindros para ensayar a 7 y 28 días y reporto resultados en el informe periódico.', p: 2, r: 'Así me gusta, todo trazable.', fb: 'El control de calidad de materiales y procedimientos con ensayos e informes es parte de la inspección de obras.' },
          { t: 'Confío en el certificado de la hormigonera.', p: 1, r: 'El certificado no reemplaza los ensayos en obra.', fb: 'El residente debe verificar en obra lo que llega.' },
          { t: 'Si se ve bien, está bien.', p: 0, r: 'La resistencia no se ve.', fb: 'Sin ensayos no se puede garantizar la resistencia especificada.' } ] }
    ],
    vivo: {
      lugar: 'Unidad educativa en construcción, Puyo', fondo: 'obra',
      inicio: { confianza: 40, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '📓', t: 'Completar el diario con los datos del día', p: 2, fb: 'El registro diario es el respaldo de la obra.', efecto: { confianza: 8, tension: -5 } },
            { icono: '✍️', t: 'Firmar el diario junto con el fiscalizador', p: 2, fb: 'Las firmas dan validez al registro.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📅', t: 'Llenar la semana completa de memoria', p: 1, fb: 'Se pierden detalles importantes.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🙄', t: 'Decir que el diario es papeleo inútil', p: 0, fb: 'Desconoce un documento oficial de la obra.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Registro diario', claves: ['diario', 'registr', 'cada dia', 'a diario', 'libro de obra', 'anot'] },
            { n: 'Contenido del diario', claves: ['personal', 'equipo', 'avance', 'clima', 'ensayo', 'incidente'] },
            { n: 'Validez y respaldo', claves: ['firma', 'fiscaliz', 'respaldo', 'orden', 'planilla', 'reclamo'] }
          ],
          evitar: [ { claves: ['papeleo', 'de memoria'], fb: 'El diario debe llevarse cada día.' } ],
          modelo: 'Reconozco el retraso; desde hoy registro a diario personal, equipo, avance, clima, ensayos e incidentes, y lo firmamos residente y fiscalizador.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Medir la losa en planos y en obra', p: 2, fb: 'El cómputo parte de dimensiones verificadas.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧮', t: 'Calcular el volumen de hormigón', p: 2, fb: '10 × 8 × 0,20 = 16 m³.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📊', t: 'Mostrar el análisis de precio unitario', p: 1, fb: 'Sustenta el costo por metro cúbico.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🚛', t: 'Pedir hormigón de más por si acaso', p: 0, fb: 'Encarece y genera residuos.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Cómputo métrico', claves: ['10', '8', '0,20', 'veinte centimetros', 'multiplic', 'computo'] },
            { n: 'Resultado del volumen', claves: ['16', 'dieciseis', 'metros cubicos', 'm3', 'volumen'] },
            { n: 'Precio unitario', claves: ['precio unitario', 'mano de obra', 'material', 'equipo', 'transporte', 'indirecto'] }
          ],
          evitar: [ { claves: ['por si acaso', 'a ojo'], fb: 'Las cantidades se calculan.' } ],
          modelo: 'Son 10 por 8 por 0,20, o sea 16 m³; el precio unitario suma equipo, mano de obra, materiales y transporte, más indirectos y utilidad.'
        },
        {
          acciones: [
            { icono: '🔺', t: 'Hacer asentamiento con cono de Abrams', p: 2, fb: 'Controla la trabajabilidad del hormigón fresco.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧪', t: 'Tomar cilindros para ensayo a compresión', p: 2, fb: 'Verifican la resistencia especificada.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🗒️', t: 'Incluir resultados en el informe periódico', p: 1, fb: 'Los informes documentan el control de calidad.', efecto: { confianza: 4, tension: -2 } },
            { icono: '👀', t: 'Aprobar el hormigón por su apariencia', p: 0, fb: 'La resistencia no se aprecia a simple vista.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Ensayo de hormigón fresco', claves: ['asentamiento', 'cono', 'abrams', 'slump', 'trabajabil', 'fresco'] },
            { n: 'Ensayo de resistencia', claves: ['cilindro', 'compresion', '28 dias', 'veintiocho', 'laboratorio', 'resistencia'] },
            { n: 'Informes y trazabilidad', claves: ['informe', 'reporte', 'registr', 'periodic', 'trazab', 'resultado'] }
          ],
          evitar: [ { claves: ['si se ve bien', 'confio nomas'], fb: 'La calidad se verifica con ensayos.' } ],
          modelo: 'En cada fundición hago el asentamiento con cono de Abrams, tomo cilindros para ensayar a 7 y 28 días y reporto los resultados en el informe periódico.'
        }
      ]
    }
  },

  /* ---------------- C-P-404 Gestión Inmobiliaria ---------------- */
  {
    id: 'asig-C-P-404', cod: 'C-P-404',
    titulo: 'Departamentos para estudiantes en Puyo',
    asignaturas: ['C-P-404'],
    persona: { nombre: 'Sra. Carmen Villacís', rol: 'Inversionista inmobiliaria', avatar: '👩🏽‍💼', pitch: 1.1 },
    contexto: 'Una inversionista tiene un terreno cerca de la universidad en Puyo y quiere construir departamentos para la venta. Te pide un perfil del negocio: ubicación y mercado, factibilidad y cronograma, y aspectos legales y de venta.',
    objetivo: 'Aplicar fundamentos del desarrollo inmobiliario: ubicación, análisis de mercado, factibilidad, cronograma, contratos y marketing.',
    pasos: [
      { dice: '¿Construyo departamentos de lujo? Así gano más.', opciones: [
          { t: 'Primero hago un estudio de mercado: demanda de estudiantes y docentes, oferta existente, precios por m² y capacidad de pago; con eso definimos el producto.', p: 2, r: 'Tiene sentido, no quiero quedarme con departamentos vacíos.', fb: 'El análisis de mercado define el programa arquitectónico y el precio según la demanda real.' },
          { t: 'Pregunto a dos conocidos si comprarían.', p: 1, r: 'Es una muestra muy pequeña.', fb: 'Se necesita información sistemática de oferta y demanda.' },
          { t: 'Sí, el lujo siempre se vende.', p: 0, r: '¿En esta zona?', fb: 'Un producto que no se ajusta al mercado se vende lento o no se vende.' } ] },
      { dice: '¿Cómo sé si el negocio da plata y cuánto se demora?', opciones: [
          { t: 'Con un estudio de factibilidad: costo de terreno, construcción, permisos y comercialización frente a ingresos por ventas, más un cronograma de diseño, permisos, obra y ventas.', p: 2, r: 'Quiero ver ese cronograma con números.', fb: 'La factibilidad compara costos e ingresos en el tiempo; el cronograma alinea obra y ventas.' },
          { t: 'Sumo el costo de construcción y le pongo 30 % de ganancia.', p: 1, r: '¿Y el terreno y los trámites?', fb: 'Faltan costos de terreno, permisos, comercialización y financieros.' },
          { t: 'Empezamos y vemos sobre la marcha.', p: 0, r: 'Eso me da miedo.', fb: 'Sin factibilidad el riesgo financiero es alto.' } ] },
      { dice: 'Ya hay interesados. ¿Les recibo la plata y les doy un recibo?', opciones: [
          { t: 'Formalizamos con una promesa de compraventa ante notario, verificando permisos municipales y propiedad horizontal, y luego la escritura; además un plan de marketing con precios claros.', p: 2, r: 'Así los compradores confían más.', fb: 'Los aspectos legales y los contratos dan seguridad jurídica a vendedor y comprador.' },
          { t: 'Un contrato simple redactado por mí.', p: 1, r: '¿Tendrá validez?', fb: 'Conviene asesoría legal y formalización notarial.' },
          { t: 'Recibo en efectivo y luego vemos los papeles.', p: 0, r: 'Eso puede terminar en juicio.', fb: 'Recibir dinero sin contrato expone a conflictos legales.' } ] }
    ],
    vivo: {
      lugar: 'Terreno cercano a la universidad, Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '📍', t: 'Evaluar la ubicación y los servicios cercanos', p: 2, fb: 'La ubicación es determinante en el valor inmobiliario.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📊', t: 'Levantar oferta y precios por metro cuadrado', p: 2, fb: 'Permite fijar un precio competitivo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '❓', t: 'Encuestar a posibles compradores', p: 1, fb: 'Identifica la demanda y su capacidad de pago.', efecto: { confianza: 4, tension: -2 } },
            { icono: '💎', t: 'Definir lujo sin estudiar el mercado', p: 0, fb: 'El producto puede no venderse.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Estudio de mercado', claves: ['mercado', 'demanda', 'oferta', 'competencia', 'encuesta', 'comprador'] },
            { n: 'Ubicación', claves: ['ubicacion', 'universidad', 'servicio', 'acceso', 'zona', 'cercan'] },
            { n: 'Precio y producto', claves: ['precio', 'metro cuadrado', 'm2', 'capacidad de pago', 'programa', 'producto'] }
          ],
          evitar: [ { claves: ['siempre se vende', 'el lujo'], fb: 'El producto debe responder al mercado.' } ],
          modelo: 'Primero haré un estudio de mercado: demanda de estudiantes y docentes, oferta cercana y precios por metro cuadrado; con eso definimos el tipo de departamento y su precio.'
        },
        {
          acciones: [
            { icono: '💰', t: 'Estimar todos los costos del proyecto', p: 2, fb: 'Incluye terreno, obra, permisos y ventas.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📈', t: 'Proyectar los ingresos por ventas', p: 2, fb: 'Compara ingresos y costos para ver la utilidad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🗓️', t: 'Elaborar el cronograma de obra y ventas', p: 1, fb: 'Alinea los flujos en el tiempo.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🎲', t: 'Arrancar sin estudio de factibilidad', p: 0, fb: 'Riesgo financiero alto.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Costos', claves: ['costo', 'terreno', 'construccion', 'permiso', 'comercializ', 'financier'] },
            { n: 'Factibilidad', claves: ['factibilidad', 'ingreso', 'venta', 'utilidad', 'rentab', 'viable'] },
            { n: 'Cronograma', claves: ['cronograma', 'plazo', 'tiempo', 'etapa', 'mes', 'preventa'] }
          ],
          evitar: [ { claves: ['sobre la marcha', 'vemos despues'], fb: 'La factibilidad se estudia antes de invertir.' } ],
          modelo: 'Con un estudio de factibilidad: comparo costos de terreno, construcción, permisos y ventas con los ingresos esperados, y armo un cronograma de diseño, permisos, obra y ventas.'
        },
        {
          acciones: [
            { icono: '📜', t: 'Preparar la promesa de compraventa ante notario', p: 2, fb: 'Da seguridad jurídica a ambas partes.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🏛️', t: 'Verificar permisos y propiedad horizontal', p: 2, fb: 'Sin ellos no se puede escriturar cada departamento.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📣', t: 'Diseñar un plan de marketing digital', p: 1, fb: 'Llega a los compradores objetivo.', efecto: { confianza: 4, tension: -2 } },
            { icono: '💵', t: 'Recibir efectivo con un simple recibo', p: 0, fb: 'Expone a conflictos legales.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Contratos', claves: ['promesa de compraventa', 'contrato', 'notar', 'escritura', 'compraventa', 'legal'] },
            { n: 'Permisos y régimen legal', claves: ['permiso', 'propiedad horizontal', 'municip', 'aprob', 'registro', 'titulo'] },
            { n: 'Venta y marketing', claves: ['marketing', 'publicidad', 'venta', 'redes', 'precio claro', 'promocion'] }
          ],
          evitar: [ { claves: ['en efectivo', 'luego vemos los papeles'], fb: 'Toda venta debe formalizarse.' } ],
          modelo: 'Formalizamos con una promesa de compraventa ante notario, verificando permisos y propiedad horizontal antes de escriturar, y hacemos un plan de marketing con precios claros.'
        }
      ]
    }
  },

  /* ---------------- C-P-405 Proyectos 2 ---------------- */
  {
    id: 'asig-C-P-405', cod: 'C-P-405',
    titulo: 'Evaluar un puente peatonal comunitario',
    asignaturas: ['C-P-405'],
    persona: { nombre: 'Econ. Lorena Tapuy', rol: 'Técnica de planificación del GAD Provincial de Pastaza', avatar: '👩🏽‍💼', pitch: 1.15 },
    contexto: 'Una comunidad kichwa pide un puente peatonal sobre el río para que los niños lleguen a la escuela. La técnica de planificación te pide evaluar la viabilidad económica, armar el marco lógico y considerar la evaluación social y ambiental para el formato de inversión pública.',
    objetivo: 'Aplicar flujo de caja, VAN, relación costo-beneficio, marco lógico y evaluación social y ambiental de un proyecto de inversión pública.',
    pasos: [
      { dice: 'La inversión es de 10 000 dólares y los beneficios sociales estimados son 3 000 dólares al año durante 5 años, con tasa de descuento del 10 %. ¿Es viable?', opciones: [
          { t: 'Descontando los 3 000 anuales al 10 % obtengo unos 11 372 dólares; el VAN es aproximadamente 1 372 dólares, positivo, y la relación beneficio-costo es cerca de 1,14: es viable.', p: 2, r: 'Correcto, lo ponemos en el flujo de caja.', fb: 'El VAN descuenta los flujos al presente; si es mayor que cero y B/C mayor que uno, el proyecto es conveniente.' },
          { t: 'Sumo 5 × 3 000 = 15 000 y como supera 10 000 es viable.', p: 1, r: 'Olvidó el valor del dinero en el tiempo.', fb: 'Sin descontar los flujos se sobreestima el beneficio.' },
          { t: 'Es para niños; no hace falta evaluar.', p: 0, r: 'Los recursos públicos se justifican con números.', fb: 'Todo proyecto público requiere evaluación económica y social.' } ] },
      { dice: 'Necesito el marco lógico. ¿Cómo lo estructura?', opciones: [
          { t: 'Fin: mejorar el acceso a la educación; propósito: cruce seguro del río; componentes: puente y capacitación en mantenimiento; actividades con indicadores, medios de verificación y supuestos.', p: 2, r: 'Muy claro, así lo pide el formato.', fb: 'La matriz de marco lógico vincula fin, propósito, componentes y actividades con indicadores, verificadores y supuestos.' },
          { t: 'Pongo el objetivo y la lista de actividades.', p: 1, r: 'Faltan indicadores y supuestos.', fb: 'Sin indicadores no se puede medir el logro.' },
          { t: 'Eso es formalidad; basta con el presupuesto.', p: 0, r: 'Sin marco lógico no se acepta.', fb: 'El marco lógico es la base de la planificación y seguimiento.' } ] },
      { dice: '¿Y la evaluación social y ambiental?', opciones: [
          { t: 'Social: beneficiarios directos, ahorro de tiempo, seguridad de los niños y participación de la comunidad; ambiental: mínima intervención en el cauce, manejo de residuos y reforestación de las orillas.', p: 2, r: 'Perfecto para el formato de inversión pública de la Secretaría Nacional de Planificación.', fb: 'La evaluación social y ambiental complementa la financiera y es requisito para proyectos de inversión pública.' },
          { t: 'Contar cuántas familias hay.', p: 1, r: 'Es un dato, pero falta el impacto.', fb: 'Hay que analizar beneficios, impactos y medidas.' },
          { t: 'El ambiente no aplica para un puente pequeño.', p: 0, r: 'Se interviene un río.', fb: 'Toda intervención en cauces tiene impactos que deben gestionarse.' } ] }
    ],
    vivo: {
      lugar: 'Comunidad kichwa a orillas del río, Pastaza', fondo: 'comunidad',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📉', t: 'Armar el flujo de caja de cinco años', p: 2, fb: 'Organiza inversión y beneficios en el tiempo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧮', t: 'Descontar los beneficios al 10 %', p: 2, fb: 'Considera el valor del dinero en el tiempo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '➕', t: 'Sumar beneficios sin descontar', p: 1, fb: 'Sobreestima el beneficio.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🙅', t: 'Omitir la evaluación económica', p: 0, fb: 'Los recursos públicos deben justificarse.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Flujo de caja descontado', claves: ['flujo de caja', 'descont', 'tasa', '10 %', 'diez por ciento', 'valor presente'] },
            { n: 'Resultado del VAN', claves: ['van', 'valor actual neto', '1372', '1 372', 'mil trescientos', 'positivo'] },
            { n: 'Relación beneficio costo', claves: ['beneficio costo', 'costo beneficio', '1,14', 'mayor que uno', 'viable', 'conviene'] }
          ],
          evitar: [ { claves: ['no hace falta evaluar', 'sin numeros'], fb: 'Todo proyecto público requiere evaluación.' } ],
          modelo: 'Descontando los 3 000 anuales al 10 % obtengo unos 11 372 dólares; el VAN es de unos 1 372 dólares, positivo, y la relación beneficio-costo es 1,14, así que es viable.'
        },
        {
          acciones: [
            { icono: '🎯', t: 'Definir fin y propósito con la comunidad', p: 2, fb: 'La participación da pertinencia al proyecto.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📏', t: 'Formular indicadores y medios de verificación', p: 2, fb: 'Permiten medir el logro.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧩', t: 'Listar supuestos y riesgos', p: 1, fb: 'Identifica factores externos.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🗑️', t: 'Descartar el marco lógico', p: 0, fb: 'Sin él no hay planificación ni seguimiento.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Niveles de objetivos', claves: ['fin', 'proposito', 'componente', 'actividad', 'objetivo', 'resultado'] },
            { n: 'Indicadores y verificación', claves: ['indicador', 'medio de verificacion', 'medios de verificacion', 'meta', 'medir', 'linea base'] },
            { n: 'Supuestos', claves: ['supuesto', 'riesgo', 'externo', 'condicion', 'matriz', 'marco logico'] }
          ],
          evitar: [ { claves: ['es formalidad', 'basta con el presupuesto'], fb: 'El marco lógico es indispensable.' } ],
          modelo: 'El fin es mejorar el acceso a la educación, el propósito un cruce seguro del río, los componentes el puente y la capacitación en mantenimiento, cada uno con indicadores, medios de verificación y supuestos.'
        },
        {
          acciones: [
            { icono: '👧🏽', t: 'Contar beneficiarios y tiempo ahorrado', p: 2, fb: 'Cuantifica el beneficio social.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌿', t: 'Identificar impactos sobre el río y las orillas', p: 2, fb: 'Base de las medidas ambientales.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🌳', t: 'Proponer reforestación de las orillas', p: 1, fb: 'Mitiga la erosión y el impacto.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🚫', t: 'Declarar que no hay impacto ambiental', p: 0, fb: 'Toda intervención en un cauce tiene impactos.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Evaluación social', claves: ['beneficiario', 'social', 'nino', 'tiempo', 'seguridad', 'comunidad'] },
            { n: 'Evaluación ambiental', claves: ['ambiental', 'impacto', 'cauce', 'rio', 'residuo', 'reforest'] },
            { n: 'Formato de inversión pública', claves: ['senplades', 'secretaria nacional de planificacion', 'formato', 'inversion publica', 'requisito', 'gad'] }
          ],
          evitar: [ { claves: ['no aplica', 'no hay impacto'], fb: 'La evaluación ambiental es obligatoria al intervenir un río.' } ],
          modelo: 'En lo social cuento los niños beneficiados, el tiempo ahorrado y la seguridad; en lo ambiental minimizo la intervención en el cauce, manejo residuos y reforesto las orillas, como pide el formato de inversión pública.'
        }
      ]
    }
  }
]);
