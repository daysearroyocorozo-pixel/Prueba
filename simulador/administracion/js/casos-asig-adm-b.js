/* Prácticas por asignatura – Administración en Instituciones Públicas (PAO 3–4) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ───────────── AIP-13 Talento Humano ───────────── */
  {
    id: 'asig-AIP-13', cod: 'AIP-13',
    titulo: 'Concurso, evaluación y capacitación del personal',
    asignaturas: ['AIP-13'],
    persona: { nombre: 'Lcda. Rosa Tanguila', rol: 'Jefa de la Unidad de Talento Humano del GAD Municipal de San Isidro', avatar: '👩🏽‍💼', pitch: 1.05 },
    contexto: 'La Unidad de Talento Humano abre un concurso de méritos y oposición para un asistente de ventanilla, debe evaluar el desempeño de un compañero y armar el plan de capacitación. Tú apoyas a la jefa en las tres tareas.',
    objetivo: 'Aplicar los principios de gestión de talento humano: selección por méritos, evaluación del desempeño, motivación y capacitación.',
    pasos: [
      { dice: 'Llegaron 18 carpetas para el puesto de asistente de ventanilla. El concejal Paredes me pidió que “le demos una mano” a su sobrina. ¿Cómo hacemos la verificación?', opciones: [
          { t: 'Verificar todas las postulaciones con la misma matriz contra el perfil del puesto y registrar el puntaje de mérito de cada una.', p: 2, r: 'Exacto, matriz única y actas firmadas. Así nadie puede reclamar trato preferente.', fb: 'La LOSEP establece el ingreso al servicio público por concurso de méritos y oposición; la igualdad de trato y la trazabilidad del puntaje protegen el proceso.' },
          { t: 'Revisar primero la carpeta de la sobrina para ver si cumple y luego las demás.', p: 1, r: 'Mmm, aunque cumpla, revisarla aparte ya da mala imagen.', fb: 'El orden y el criterio deben ser iguales para todos; un trato diferenciado, aunque sea de forma, abre la puerta a impugnaciones.' },
          { t: 'Pasar directamente a la sobrina a la entrevista; es un pedido del concejal.', p: 0, r: '¡Eso es nepotismo y nos puede costar el cargo a las dos!', fb: 'Favorecer a familiares de autoridades vulnera los principios de mérito e igualdad y puede generar responsabilidad administrativa.' } ] },
      { dice: 'Ahora la evaluación del desempeño: Don Julio, de archivo, tiene 68 sobre 100. Se atrasa en la digitalización, pero nunca falta. ¿Qué le decimos?', opciones: [
          { t: 'Retroalimentarle con evidencias e indicadores, reconocer su puntualidad y acordar un plan de mejora con metas y fechas.', p: 2, r: 'Así sí. Don Julio sale sabiendo qué mejorar y con apoyo.', fb: 'La evaluación del desempeño sirve para mejorar: se basa en indicadores objetivos, reconoce fortalezas y define compromisos medibles.' },
          { t: 'Entregarle la hoja con la calificación y pedirle que se esfuerce más.', p: 1, r: 'Le damos el dato, pero no la ruta para mejorar.', fb: 'Comunicar solo el puntaje sin retroalimentación ni plan pierde el propósito formativo de la evaluación.' },
          { t: 'Decirle delante de todos que con esa nota lo van a sacar.', p: 0, r: 'Eso es humillarlo, y además no es cierto así de simple.', fb: 'La retroalimentación es privada y respetuosa; amenazar en público afecta el clima laboral y puede considerarse acoso.' } ] },
      { dice: 'Último tema: el personal está desmotivado y varios piden capacitación en atención ciudadana. ¿Qué propones para el plan?', opciones: [
          { t: 'Hacer un diagnóstico de necesidades, priorizar temas, programar talleres en horario laboral y medir su efecto; sumar reconocimientos no económicos.', p: 2, r: 'Muy completo: diagnóstico, plan y evaluación. Lo presento al alcalde.', fb: 'El plan de capacitación nace de la detección de necesidades y se evalúa; la motivación incluye reconocimiento, buen clima y desarrollo profesional.' },
          { t: 'Contratar una charla motivacional para todo el personal.', p: 1, r: 'Puede animar un día, pero no resuelve la brecha de competencias.', fb: 'Las acciones aisladas sin diagnóstico ni seguimiento tienen poco impacto sostenido.' },
          { t: 'No capacitar porque no hay presupuesto y ya saben su trabajo.', p: 0, r: 'Eso agrava la desmotivación y la mala atención.', fb: 'La capacitación es un derecho y una herramienta de mejora; existen opciones de bajo costo (capacitación interna, en línea, convenios).' } ] }
    ],
    vivo: {
      lugar: 'Oficina de Talento Humano, GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📊', t: 'Abrir la matriz única de verificación del perfil', p: 2, fb: 'Garantiza igualdad de criterios para las 18 postulaciones.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🗂️', t: 'Ordenar las carpetas por fecha de recepción', p: 1, fb: 'Ayuda al orden, pero aún falta el criterio de evaluación.', efecto: { confianza: 3, tension: -2 } },
            { icono: '⭐', t: 'Separar la carpeta recomendada por el concejal', p: 0, fb: 'Es trato preferente y rompe el principio de mérito.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Méritos y oposición', claves: ['merito', 'oposicion', 'concurso', 'puntaje', 'calificacion'] },
            { n: 'Igualdad de trato a postulantes', claves: ['igualdad', 'mismo criterio', 'misma matriz', 'todos', 'sin preferencia', 'imparcial'] },
            { n: 'Perfil del puesto y respaldo', claves: ['perfil', 'requisito', 'acta', 'registro', 'respaldo', 'evidencia'] }
          ],
          evitar: [ { claves: ['ayudarle a la sobrina', 'pasarla directo', 'favor al concejal'], fb: 'Favorecer a un familiar de una autoridad es nepotismo.' } ],
          modelo: 'Propongo revisar las 18 carpetas con la misma matriz del perfil del puesto y dejar en acta el puntaje de méritos de cada postulante; así garantizamos igualdad y el concurso no puede impugnarse.'
        },
        {
          acciones: [
            { icono: '📈', t: 'Mostrar a Don Julio sus indicadores de digitalización', p: 2, fb: 'La retroalimentación basada en datos es objetiva.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🤝', t: 'Reconocer su puntualidad y compromiso', p: 2, fb: 'Reconocer fortalezas abre la disposición al cambio.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📢', t: 'Comentar su nota en la reunión general', p: 0, fb: 'Expone al servidor y vulnera su dignidad.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Retroalimentación con evidencias', claves: ['indicador', 'evidencia', 'resultado', 'meta', 'dato', 'sesenta y ocho', '68'] },
            { n: 'Reconocer fortalezas', claves: ['reconoc', 'puntual', 'fortaleza', 'compromiso', 'valoro'] },
            { n: 'Plan de mejora con plazos', claves: ['plan de mejora', 'compromiso', 'plazo', 'fecha', 'seguimiento', 'acord'] }
          ],
          evitar: [ { claves: ['lo van a sacar', 'vago', 'inutil'], fb: 'Amenazas y descalificaciones no mejoran el desempeño y dañan el clima laboral.' } ],
          modelo: 'Don Julio, valoro su puntualidad; su puntaje es 68 porque la digitalización va atrasada según el indicador. Acordemos un plan de mejora con metas semanales y revisemos juntos en un mes.'
        },
        {
          acciones: [
            { icono: '📝', t: 'Aplicar una encuesta de necesidades de capacitación', p: 2, fb: 'El diagnóstico orienta un plan pertinente.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🏅', t: 'Proponer un reconocimiento mensual al buen servicio', p: 2, fb: 'La motivación no económica mejora el clima laboral.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎤', t: 'Contratar solo una charla motivacional', p: 1, fb: 'Efecto corto si no hay plan ni seguimiento.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🚫', t: 'Archivar las solicitudes de capacitación', p: 0, fb: 'Ignorar las necesidades aumenta la desmotivación.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Diagnóstico de necesidades', claves: ['diagnostic', 'necesidad', 'encuesta', 'detect', 'brecha'] },
            { n: 'Plan de capacitación evaluado', claves: ['plan de capacitacion', 'taller', 'cronograma', 'evaluar', 'medir', 'atencion ciudadana'] },
            { n: 'Motivación y reconocimiento', claves: ['motiva', 'reconocimiento', 'clima laboral', 'incentivo', 'valorar'] }
          ],
          evitar: [ { claves: ['no hay presupuesto para eso', 'ya saben su trabajo'], fb: 'Negar la capacitación sin analizar alternativas afecta el servicio.' } ],
          modelo: 'Primero aplicaría una encuesta de necesidades, luego un plan de talleres de atención ciudadana en horario laboral, medido con encuestas de satisfacción, y un reconocimiento mensual al buen servicio para mejorar la motivación.'
        }
      ]
    }
  },

  /* ───────────── AIP-14 Administración Pública II ───────────── */
  {
    id: 'asig-AIP-14', cod: 'AIP-14',
    titulo: 'Plan estratégico y evaluación del programa de adultos mayores',
    asignaturas: ['AIP-14'],
    persona: { nombre: 'Ing. Marco Vargas', rol: 'Director de Planificación del GAD Municipal de San Isidro', avatar: '👨🏽‍💼', pitch: 0.95 },
    contexto: 'El GAD actualiza su plan estratégico y debe evaluar el programa “Abuelitos Activos” que atiende a 120 adultos mayores en parroquias rurales. Debes apoyar con el análisis estratégico y la evaluación del programa.',
    objetivo: 'Practicar la planificación estratégica en el sector público y la evaluación de políticas y programas públicos.',
    pasos: [
      { dice: 'Para el plan estratégico necesito un diagnóstico antes de escribir objetivos. ¿Por dónde empezamos?', opciones: [
          { t: 'Con un análisis FODA participativo: fortalezas y debilidades internas, oportunidades y amenazas del entorno, con datos y aportes de la ciudadanía.', p: 2, r: 'Eso, con datos reales y voz de los barrios. Prepara la matriz.', fb: 'La planificación estratégica parte de un diagnóstico situacional (FODA) que vincula misión, visión y objetivos con la realidad.' },
          { t: 'Copiar los objetivos del plan anterior y actualizar las fechas.', p: 1, r: 'Sirve de referencia, pero el contexto cambió mucho.', fb: 'Reutilizar sin diagnóstico ignora nuevas necesidades y resultados de la gestión anterior.' },
          { t: 'Escribir los objetivos que el alcalde ofreció en campaña, sin más análisis.', p: 0, r: 'Eso no es planificar, es una lista de promesas.', fb: 'Los objetivos estratégicos deben sustentarse en diagnóstico y competencias del GAD, no solo en ofertas políticas.' } ] },
      { dice: 'Ahora el programa “Abuelitos Activos”. ¿Cómo sabremos si de verdad funciona?', opciones: [
          { t: 'Evaluar con indicadores de cobertura, asistencia y bienestar, comparando la línea base con los resultados actuales y escuchando a los beneficiarios.', p: 2, r: 'Perfecto: eficacia, eficiencia y la opinión de los abuelitos.', fb: 'La evaluación de programas compara resultados contra la línea base usando indicadores de eficacia, eficiencia e impacto.' },
          { t: 'Contar cuánto dinero se gastó en el año.', p: 1, r: 'Es un dato, pero no dice si mejoró la vida de nadie.', fb: 'La ejecución presupuestaria mide gasto, no resultados ni impacto.' },
          { t: 'Asumir que funciona porque nadie se ha quejado.', p: 0, r: 'Que no haya quejas no significa que haya resultados.', fb: 'La ausencia de reclamos no es evidencia; sin indicadores no se puede decidir con base en datos.' } ] },
      { dice: 'La evaluación muestra que en Tarqui la asistencia cayó a la mitad por falta de transporte. ¿Qué recomendamos?', opciones: [
          { t: 'Recomendar un ajuste: coordinar transporte con la junta parroquial, fijar una meta de asistencia y dar seguimiento trimestral.', p: 2, r: 'Bien, la evaluación sirve para corregir, no solo para informar.', fb: 'La evaluación retroalimenta la gestión: genera recomendaciones con responsables, metas y seguimiento.' },
          { t: 'Seguir igual y volver a revisar el próximo año.', p: 1, r: 'Perderíamos un año de atención.', fb: 'Postergar las decisiones reduce el valor de la evaluación.' },
          { t: 'Cerrar el programa en Tarqui por baja asistencia.', p: 0, r: 'Castigaríamos a los más alejados.', fb: 'Eliminar el servicio sin atender la causa vulnera el enfoque de equidad territorial.' } ] }
    ],
    vivo: {
      lugar: 'Sala de reuniones de la Dirección de Planificación', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🧭', t: 'Proyectar la matriz FODA en la pizarra', p: 2, fb: 'Organiza el diagnóstico estratégico.', efecto: { confianza: 9, tension: -5 } },
            { icono: '📚', t: 'Recopilar datos del censo y del plan anterior', p: 2, fb: 'El diagnóstico se basa en información verificable.', efecto: { confianza: 7, tension: -4 } },
            { icono: '📄', t: 'Copiar el plan anterior sin revisar', p: 0, fb: 'Omite el diagnóstico actual.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Diagnóstico FODA', claves: ['foda', 'fortaleza', 'debilidad', 'oportunidad', 'amenaza', 'diagnostic'] },
            { n: 'Misión, visión y objetivos', claves: ['mision', 'vision', 'objetivo estrategico', 'objetivo', 'estrategi'] },
            { n: 'Participación y datos', claves: ['participa', 'ciudadan', 'dato', 'censo', 'barrio', 'informacion'] }
          ],
          evitar: [ { claves: ['copiar el plan anterior', 'lo que ofrecio en campana'], fb: 'Planificar sin diagnóstico no responde a la realidad del cantón.' } ],
          modelo: 'Empecemos con un diagnóstico FODA participativo, con datos del censo y aportes de los barrios; de ahí formulamos misión, visión y objetivos estratégicos coherentes.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Revisar la línea base del programa', p: 2, fb: 'Sin línea base no hay comparación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗣️', t: 'Programar grupos focales con los beneficiarios', p: 2, fb: 'Aporta información cualitativa sobre el impacto.', efecto: { confianza: 7, tension: -4 } },
            { icono: '💵', t: 'Revisar solo la cédula de gasto', p: 1, fb: 'Mide ejecución, no resultados.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🙈', t: 'Dar por exitoso el programa sin medir', p: 0, fb: 'Decidir sin evidencia es mala gestión.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Indicadores de evaluación', claves: ['indicador', 'cobertura', 'asistencia', 'eficacia', 'eficiencia', 'impacto'] },
            { n: 'Línea base y comparación', claves: ['linea base', 'compar', 'antes', 'resultado', 'meta'] },
            { n: 'Voz de los beneficiarios', claves: ['beneficiari', 'adultos mayores', 'abuelit', 'encuesta', 'grupo focal', 'opinion'] }
          ],
          evitar: [ { claves: ['nadie se ha quejado', 'seguro funciona'], fb: 'La falta de quejas no prueba resultados.' } ],
          modelo: 'Lo evaluaría con indicadores de cobertura, asistencia y bienestar, comparando la línea base con los resultados actuales, y con grupos focales con los adultos mayores.'
        },
        {
          acciones: [
            { icono: '🚐', t: 'Contactar a la junta parroquial de Tarqui', p: 2, fb: 'La coordinación interinstitucional resuelve la causa.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🗓️', t: 'Agendar seguimiento trimestral', p: 2, fb: 'Permite verificar si la medida funciona.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✂️', t: 'Redactar el cierre del programa en Tarqui', p: 0, fb: 'Afecta a la población más vulnerable.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Atender la causa', claves: ['transporte', 'causa', 'movilidad', 'traslado', 'distancia'] },
            { n: 'Coordinación interinstitucional', claves: ['junta parroquial', 'coordin', 'articul', 'convenio', 'tarqui'] },
            { n: 'Meta y seguimiento', claves: ['meta', 'seguimiento', 'trimestr', 'monitore', 'recomend', 'ajust'] }
          ],
          evitar: [ { claves: ['cerrar el programa', 'que se arreglen'], fb: 'Cerrar sin atender la causa vulnera la equidad territorial.' } ],
          modelo: 'Recomiendo coordinar transporte con la junta parroquial de Tarqui, fijar una meta de asistencia del ochenta por ciento y hacer seguimiento trimestral.'
        }
      ]
    }
  },

  /* ───────────── AIP-15 Políticas Públicas ───────────── */
  {
    id: 'asig-AIP-15', cod: 'AIP-15',
    titulo: 'Política cantonal de reducción de plásticos',
    asignaturas: ['AIP-15'],
    persona: { nombre: 'Doña Carmen Gualinga', rol: 'Dirigente del barrio Los Ángeles y comerciante del mercado', avatar: '👩🏽', pitch: 1.15 },
    contexto: 'El GAD diseña una política para reducir los plásticos de un solo uso que tapan los esteros del río Puyo. Doña Carmen llega molesta porque teme perder ventas; debes explicarle la política, escucharla e incorporar su aporte.',
    objetivo: 'Comprender los tipos de políticas públicas, su diseño participativo, implementación y análisis de impacto social.',
    pasos: [
      { dice: '¿Y ahora nos van a prohibir las fundas así no más? ¿Quién decidió eso? ¡A nosotros nadie nos preguntó!', opciones: [
          { t: 'Explicarle que es una propuesta de política regulatoria en fase de diseño, que hay mesas participativas y que su opinión cuenta.', p: 2, r: 'Ah, ¿todavía se puede opinar? Entonces quiero estar en esa mesa.', fb: 'El ciclo de la política incluye identificación del problema, diseño con participación ciudadana, implementación y evaluación.' },
          { t: 'Decirle que es una ordenanza en trámite y que lea el borrador en la página web.', p: 1, r: 'Yo no tengo internet en el puesto, mijo.', fb: 'Informar es necesario, pero la participación requiere canales accesibles y diálogo directo.' },
          { t: 'Decirle que ya está decidido y que tendrá que adaptarse.', p: 0, r: '¡Así trata el municipio a la gente!', fb: 'Imponer sin participación genera rechazo y baja legitimidad de la política.' } ] },
      { dice: 'Bueno… pero ¿qué gano yo? Las fundas biodegradables cuestan el doble.', opciones: [
          { t: 'Proponer medidas de implementación gradual: plazo de transición, compra asociativa de alternativas y una campaña para que los clientes traigan su bolsa.', p: 2, r: 'Si es poco a poco y compramos juntos, ahí sí se puede.', fb: 'Una buena implementación combina instrumentos regulatorios, incentivos y educación, con gradualidad para reducir el impacto económico.' },
          { t: 'Decirle que el beneficio es ambiental para todos.', p: 1, r: 'Sí, pero eso no me paga el arriendo del puesto.', fb: 'Es cierto, pero no responde al costo concreto del actor afectado.' },
          { t: 'Decirle que si no puede, que cierre el puesto.', p: 0, r: '¡Qué falta de respeto!', fb: 'Desconocer el impacto social de la política sobre grupos vulnerables es contrario al interés público.' } ] },
      { dice: '¿Y cómo van a saber si esto sirvió o solo nos complicó la vida?', opciones: [
          { t: 'Explicar que se medirá el impacto con indicadores: toneladas de plástico recogidas en los esteros, ventas de los comerciantes y percepción ciudadana, con informe público.', p: 2, r: 'Así sí. Que nos muestren los resultados.', fb: 'El análisis de impacto social mide efectos ambientales, económicos y sociales, y rinde cuentas a la ciudadanía.' },
          { t: 'Decirle que se verá si los esteros se ven más limpios.', p: 1, r: 'Eso es a ojo, ¿no?', fb: 'La observación ayuda, pero la evaluación necesita indicadores y línea base.' },
          { t: 'Decirle que eso ya no le corresponde a ella.', p: 0, r: 'Claro, solo nos buscan para prohibir.', fb: 'La rendición de cuentas es parte del ciclo de la política pública.' } ] }
    ],
    vivo: {
      lugar: 'Mercado Mariscal de Puyo, puesto de Doña Carmen', fondo: 'comunidad',
      inicio: { confianza: 35, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '👂', t: 'Escuchar a Doña Carmen sin interrumpir', p: 2, fb: 'La escucha activa baja la tensión y legitima el diálogo.', efecto: { confianza: 10, tension: -10 } },
            { icono: '🗒️', t: 'Invitarla por escrito a la mesa participativa', p: 2, fb: 'Abre un canal formal de participación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🌐', t: 'Indicarle el enlace web del borrador', p: 1, fb: 'Informa, pero puede no ser accesible.', efecto: { confianza: 1, tension: 2 } },
            { icono: '☝️', t: 'Leerle la prohibición en tono firme', p: 0, fb: 'Imponer aumenta el rechazo.', efecto: { confianza: -12, tension: 15 } }
          ],
          conceptos: [
            { n: 'Tipo de política: regulatoria', claves: ['regulat', 'ordenanza', 'norma', 'reducir plastico', 'plastico'] },
            { n: 'Fase de diseño del ciclo', claves: ['diseno', 'propuesta', 'borrador', 'ciclo', 'todavia'] },
            { n: 'Participación ciudadana', claves: ['participa', 'mesa', 'opinion', 'escuch', 'aporte', 'consulta'] }
          ],
          evitar: [ { claves: ['ya esta decidido', 'tiene que adaptarse'], fb: 'Cerrar el diálogo resta legitimidad a la política.' } ],
          modelo: 'Doña Carmen, es una propuesta de ordenanza en fase de diseño; la invito a la mesa participativa del jueves para que su opinión como comerciante se incluya.'
        },
        {
          acciones: [
            { icono: '⏳', t: 'Explicar el plazo de transición gradual', p: 2, fb: 'La gradualidad reduce el impacto económico.', efecto: { confianza: 8, tension: -7 } },
            { icono: '🛍️', t: 'Mostrar opciones de compra asociativa', p: 2, fb: 'Baja costos a los comerciantes.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🌎', t: 'Hablar solo del beneficio ambiental', p: 1, fb: 'No responde a su preocupación económica.', efecto: { confianza: 1, tension: 1 } },
            { icono: '🚪', t: 'Sugerirle que cierre el puesto', p: 0, fb: 'Desconoce el impacto social.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Implementación gradual', claves: ['gradual', 'transicion', 'plazo', 'poco a poco', 'etapa'] },
            { n: 'Incentivos y apoyo', claves: ['incentivo', 'asociativ', 'compra conjunta', 'apoyo', 'precio', 'costo'] },
            { n: 'Educación ciudadana', claves: ['campana', 'educa', 'bolsa reutilizable', 'cliente', 'sensibiliz'] }
          ],
          evitar: [ { claves: ['cierre el puesto', 'no es mi problema'], fb: 'Ignorar a los afectados vulnera la equidad de la política.' } ],
          modelo: 'Habrá un plazo de transición, compra asociativa de bolsas alternativas para bajar el costo y una campaña para que los clientes traigan su bolsa reutilizable.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Mostrar la ficha de indicadores de impacto', p: 2, fb: 'Hace visible cómo se evaluará.', efecto: { confianza: 9, tension: -6 } },
            { icono: '📣', t: 'Comprometer un informe público semestral', p: 2, fb: 'Fortalece la rendición de cuentas.', efecto: { confianza: 7, tension: -5 } },
            { icono: '🤷', t: 'Responder que eso lo ven los técnicos', p: 0, fb: 'Excluye a la ciudadanía de la evaluación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Indicadores de impacto', claves: ['indicador', 'tonelada', 'medir', 'estero', 'linea base', 'resultado'] },
            { n: 'Impacto social y económico', claves: ['impacto social', 'venta', 'comerciante', 'economi', 'ingreso', 'empleo'] },
            { n: 'Rendición de cuentas', claves: ['rendicion de cuentas', 'informe', 'public', 'transparen', 'socializ'] }
          ],
          evitar: [ { claves: ['no le corresponde', 'eso es de tecnicos'], fb: 'La ciudadanía tiene derecho a conocer los resultados.' } ],
          modelo: 'Mediremos las toneladas de plástico recogidas en los esteros, las ventas de los comerciantes y la percepción ciudadana, y publicaremos un informe semestral de rendición de cuentas.'
        }
      ]
    }
  },

  /* ───────────── AIP-16 Finanzas Públicas ───────────── */
  {
    id: 'asig-AIP-16', cod: 'AIP-16',
    titulo: 'Análisis de ingresos y gastos para el informe financiero',
    asignaturas: ['AIP-16'],
    persona: { nombre: 'Econ. Patricia Cerda', rol: 'Directora Financiera del GAD Municipal de San Isidro', avatar: '👩🏻‍💼', pitch: 1.0 },
    contexto: 'La Directora Financiera prepara el informe semestral para el Concejo. Te pide calcular la dependencia de las transferencias, analizar el gasto y proponer cómo mejorar los ingresos propios.',
    objetivo: 'Aplicar principios de finanzas públicas: fuentes de financiamiento, análisis del gasto e informes financieros.',
    pasos: [
      { dice: 'El GAD tiene 8 millones de ingresos totales; 6,8 millones son transferencias del Gobierno Central y 1,2 millones son ingresos propios por predial, tasas y patentes. ¿Qué porcentaje es propio y qué significa?', opciones: [
          { t: 'Los ingresos propios son el 15 % (1,2 ÷ 8 × 100) y las transferencias el 85 %; hay alta dependencia del Gobierno Central.', p: 2, r: 'Correcto, 15 % propio. Eso nos hace vulnerables a los retrasos de transferencias.', fb: 'El grado de autonomía financiera se mide como ingresos propios sobre ingresos totales; una alta dependencia limita la planificación.' },
          { t: 'Son más o menos el 20 %, la mayor parte viene del Estado.', p: 1, r: 'La idea es correcta, pero el cálculo no: es 15 %.', fb: 'El informe financiero exige cifras exactas y verificables.' },
          { t: 'No importa el porcentaje mientras llegue el dinero.', p: 0, r: 'Sí importa: si se atrasan las transferencias, no pagamos sueldos.', fb: 'Analizar las fuentes de financiamiento es base de la gestión financiera pública.' } ] },
      { dice: 'Del gasto, el 62 % es corriente (sueldos, servicios básicos) y solo el 38 % es inversión. Un concejal propone contratar 15 personas más. ¿Qué le decimos?', opciones: [
          { t: 'Advertir que aumentaría el gasto corriente permanente y reduciría la inversión; sugerir priorizar la inversión y revisar la normativa de distribución del gasto.', p: 2, r: 'Bien argumentado; lo pongo en el informe.', fb: 'Las finanzas públicas distinguen gasto corriente y de inversión; las transferencias para inversión no deben financiar gasto permanente.' },
          { t: 'Decir que se puede si hay saldo en caja este mes.', p: 1, r: 'El saldo de un mes no garantiza los sueldos de todo el año.', fb: 'El gasto permanente requiere fuentes permanentes, no saldos temporales.' },
          { t: 'Aprobar porque más personal siempre es mejor servicio.', p: 0, r: 'Sin análisis eso podría desfinanciar obras.', fb: 'Toda decisión de gasto debe sustentarse en disponibilidad y sostenibilidad fiscal.' } ] },
      { dice: '¿Qué propones para mejorar los ingresos propios sin afectar a las familias más pobres?', opciones: [
          { t: 'Actualizar el catastro predial, mejorar la recaudación de cartera vencida con facilidades de pago y aplicar exoneraciones de ley a grupos vulnerables.', p: 2, r: 'Muy bien, eficiencia recaudatoria con equidad.', fb: 'La gestión financiera fortalece ingresos propios con eficiencia, equidad y progresividad.' },
          { t: 'Subir todas las tasas un 20 % parejo.', p: 1, r: 'Recauda más, pero afecta igual a todos.', fb: 'Un incremento lineal no considera la capacidad contributiva.' },
          { t: 'Pedir un préstamo grande para cubrir todo.', p: 0, r: 'El endeudamiento no se usa para gasto corriente.', fb: 'El endeudamiento público tiene límites y debe destinarse a inversión, no a cubrir déficit operativo.' } ] }
    ],
    vivo: {
      lugar: 'Dirección Financiera, GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🧮', t: 'Calcular 1,2 entre 8 en la hoja de cálculo', p: 2, fb: 'Obtiene el 15 % de ingresos propios.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📑', t: 'Revisar la cédula presupuestaria de ingresos', p: 2, fb: 'Confirma las fuentes de financiamiento.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎲', t: 'Estimar el porcentaje a ojo', p: 0, fb: 'El informe necesita cifras exactas.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Resultado del cálculo', claves: ['quince', '15', 'ochenta y cinco', '85', 'por ciento', 'porcentaje'] },
            { n: 'Fuentes de financiamiento', claves: ['transferencia', 'gobierno central', 'ingresos propios', 'predial', 'tasa', 'patente'] },
            { n: 'Dependencia financiera', claves: ['dependencia', 'autonomia', 'vulnerab', 'riesgo', 'atraso'] }
          ],
          evitar: [ { claves: ['no importa', 'mas o menos'], fb: 'La gestión financiera exige precisión y análisis.' } ],
          modelo: 'Los ingresos propios son 1,2 entre 8, es decir el 15 %, y las transferencias el 85 %; eso muestra una alta dependencia del Gobierno Central.'
        },
        {
          acciones: [
            { icono: '📉', t: 'Graficar gasto corriente frente a inversión', p: 2, fb: 'Visualiza la estructura del gasto.', efecto: { confianza: 8, tension: -5 } },
            { icono: '⚖️', t: 'Proyectar el costo anual de 15 contratos', p: 2, fb: 'Mide la sostenibilidad de la propuesta.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💰', t: 'Mirar solo el saldo de caja del mes', p: 1, fb: 'No refleja el compromiso anual.', efecto: { confianza: 1, tension: 2 } },
            { icono: '✅', t: 'Firmar la aprobación de contrataciones', p: 0, fb: 'Decisión sin respaldo financiero.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Gasto corriente vs inversión', claves: ['gasto corriente', 'inversion', 'sesenta y dos', '62', 'treinta y ocho', '38'] },
            { n: 'Gasto permanente con fuente permanente', claves: ['permanente', 'sostenib', 'fuente', 'todo el ano', 'sueldo'] },
            { n: 'Priorizar inversión', claves: ['prioriz', 'obra', 'proyecto', 'reducir inversion', 'afectar'] }
          ],
          evitar: [ { claves: ['mas personal siempre', 'si hay plata en caja'], fb: 'El gasto debe ser sostenible y planificado.' } ],
          modelo: 'Con 62 % de gasto corriente, contratar 15 personas aumentaría un gasto permanente sin fuente permanente y reduciría la inversión en obras; sugiero priorizar la inversión.'
        },
        {
          acciones: [
            { icono: '🗺️', t: 'Solicitar la actualización del catastro predial', p: 2, fb: 'Mejora la base de recaudación con justicia.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📆', t: 'Diseñar convenios de pago para cartera vencida', p: 2, fb: 'Recupera ingresos sin ahogar a las familias.', efecto: { confianza: 7, tension: -5 } },
            { icono: '🏦', t: 'Tramitar un préstamo para gasto corriente', p: 0, fb: 'Endeudarse para gasto corriente es insostenible.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Catastro y recaudación', claves: ['catastro', 'recaud', 'predial', 'cartera vencida', 'cobro'] },
            { n: 'Equidad tributaria', claves: ['exonera', 'vulnerab', 'equidad', 'capacidad', 'adultos mayores', 'discapacidad'] },
            { n: 'Facilidades de pago', claves: ['facilidad', 'convenio de pago', 'cuota', 'plazo', 'descuento'] }
          ],
          evitar: [ { claves: ['prestamo para sueldos', 'subir todo parejo'], fb: 'Medidas sin equidad o sostenibilidad dañan las finanzas.' } ],
          modelo: 'Propongo actualizar el catastro predial, recuperar la cartera vencida con convenios de pago y mantener las exoneraciones de ley para adultos mayores y personas con discapacidad.'
        }
      ]
    }
  },

  /* ───────────── AIP-17 Procesos Operativos Públicos ───────────── */
  {
    id: 'asig-AIP-17', cod: 'AIP-17',
    titulo: 'Simplificar el trámite de patente municipal',
    asignaturas: ['AIP-17'],
    persona: { nombre: 'Sr. Kevin Tapuy', rol: 'Emprendedor que tramita la patente de su cafetería', avatar: '👨🏽', pitch: 1.1 },
    contexto: 'Kevin lleva 15 días y 9 ventanillas para obtener su patente. Tu jefe te encargó levantar el proceso, proponer mejoras y medirlas; empiezas atendiendo a Kevin.',
    objetivo: 'Definir, mejorar, gestionar y controlar procesos operativos públicos con enfoque de simplificación de trámites.',
    pasos: [
      { dice: '¡Ya es la tercera vez que me piden la copia de cédula! Me mandan de un piso a otro. ¿Para qué tantos pasos?', opciones: [
          { t: 'Disculparme, revisar su caso y explicarle que estamos levantando el flujograma del trámite para eliminar requisitos duplicados.', p: 2, r: 'Bueno, si de verdad lo van a mejorar, le cuento todo lo que me pasó.', fb: 'Levantar el proceso (entradas, actividades, responsables, salidas) es el primer paso para mejorarlo; el usuario aporta información clave.' },
          { t: 'Pedirle la copia otra vez para avanzar rápido.', p: 1, r: 'Ya qué… pero esto no puede seguir así.', fb: 'Resuelve el caso puntual, pero no el problema del proceso.' },
          { t: 'Decirle que así es el procedimiento y que espere.', p: 0, r: '¡Por eso nadie quiere formalizarse!', fb: 'Normalizar la ineficiencia contradice el principio de simplificación de trámites.' } ] },
      { dice: '(En la oficina, con el flujograma de 9 pasos) Tu jefe pregunta: ¿qué pasos eliminamos o unimos?', opciones: [
          { t: 'Eliminar los pasos que no agregan valor, unir las copias de documentos en una sola ventanilla y consultar datos en línea en lugar de pedir copias.', p: 2, r: 'Con eso pasamos de 9 a 5 pasos. Excelente.', fb: 'Las técnicas de mejora identifican actividades sin valor, reprocesos y esperas; la interoperabilidad evita pedir documentos que el Estado ya tiene.' },
          { t: 'Contratar más personal para las ventanillas.', p: 1, r: 'Iría más rápido, pero seguirían los pasos inútiles.', fb: 'Añadir recursos sin rediseñar el proceso eleva costos y mantiene el desperdicio.' },
          { t: 'Dejarlo igual; si se cambia, alguien se puede molestar.', p: 0, r: 'Entonces seguimos con quejas todos los días.', fb: 'La mejora continua requiere cambio gestionado, no evitarlo.' } ] },
      { dice: '¿Cómo sabremos si la mejora funciona después de implementarla?', opciones: [
          { t: 'Medir indicadores como tiempo de ciclo, número de visitas del usuario y satisfacción, comparar con la línea base y ajustar con el ciclo PHVA.', p: 2, r: 'Eso es control de procesos de verdad.', fb: 'La evaluación y control usan indicadores y el ciclo planificar-hacer-verificar-actuar.' },
          { t: 'Preguntar a los compañeros si sienten que va mejor.', p: 1, r: 'Es una opinión, pero falta el dato.', fb: 'La percepción interna no sustituye la medición.' },
          { t: 'No medir; si nadie reclama, está bien.', p: 0, r: 'Así no sabríamos si mejoró.', fb: 'Sin control no hay mejora continua.' } ] }
    ],
    vivo: {
      lugar: 'Ventanilla única de Rentas, GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 35, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '🙏', t: 'Disculparse por la demora con Kevin', p: 2, fb: 'Reconocer la falla reduce la tensión.', efecto: { confianza: 8, tension: -10 } },
            { icono: '🔎', t: 'Revisar su expediente en el sistema', p: 2, fb: 'Permite ver qué ya entregó.', efecto: { confianza: 6, tension: -5 } },
            { icono: '📎', t: 'Pedirle otra copia de cédula', p: 1, fb: 'Avanza, pero repite el error.', efecto: { confianza: -2, tension: 3 } },
            { icono: '⏱️', t: 'Mandarlo a esperar en otra fila', p: 0, fb: 'Aumenta el reproceso y el malestar.', efecto: { confianza: -14, tension: 15 } }
          ],
          conceptos: [
            { n: 'Disculpa y atención', claves: ['disculp', 'lament', 'entiendo', 'revis', 'su caso'] },
            { n: 'Levantamiento del proceso', claves: ['flujograma', 'proceso', 'paso', 'levant', 'mapa', 'diagrama'] },
            { n: 'Eliminar duplicidad', claves: ['duplic', 'requisito', 'copia', 'repet', 'simplific'] }
          ],
          evitar: [ { claves: ['asi es el procedimiento', 'espere nomas'], fb: 'Justificar la ineficiencia daña la confianza ciudadana.' } ],
          modelo: 'Disculpe, Kevin; reviso su expediente ahora. Estamos levantando el flujograma del trámite para eliminar requisitos duplicados como la copia de cédula.'
        },
        {
          acciones: [
            { icono: '🧩', t: 'Marcar en el flujograma pasos sin valor', p: 2, fb: 'Identifica desperdicios y reprocesos.', efecto: { confianza: 9, tension: -6 } },
            { icono: '💻', t: 'Proponer validación de datos en línea', p: 2, fb: 'Evita pedir documentos que el Estado ya tiene.', efecto: { confianza: 8, tension: -5 } },
            { icono: '👥', t: 'Solicitar más personal de ventanilla', p: 1, fb: 'No elimina los pasos innecesarios.', efecto: { confianza: 1, tension: 1 } },
            { icono: '🔒', t: 'Guardar el flujograma sin cambios', p: 0, fb: 'Mantiene el problema.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Actividades sin valor', claves: ['valor agregado', 'sin valor', 'eliminar', 'desperdicio', 'reproceso', 'espera'] },
            { n: 'Unificar en una ventanilla', claves: ['ventanilla unica', 'unir', 'unific', 'integrar', 'un solo'] },
            { n: 'Pasar de 9 a 5 pasos', claves: ['nueve', '9', 'cinco', '5', 'reducir pasos', 'menos pasos'] }
          ],
          evitar: [ { claves: ['dejarlo igual', 'no cambiar nada'], fb: 'Evitar el cambio impide la mejora continua.' } ],
          modelo: 'Eliminaría los pasos sin valor agregado, uniría la recepción de documentos en una ventanilla única y validaría la cédula en línea; así pasamos de 9 a 5 pasos.'
        },
        {
          acciones: [
            { icono: '⏲️', t: 'Registrar el tiempo de ciclo actual como línea base', p: 2, fb: 'Permite comparar después de la mejora.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔁', t: 'Programar revisión mensual con el ciclo PHVA', p: 2, fb: 'Asegura la mejora continua.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🗑️', t: 'Eliminar el buzón de sugerencias', p: 0, fb: 'Se pierde la voz del usuario.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Indicadores del proceso', claves: ['indicador', 'tiempo de ciclo', 'dias', 'visitas', 'satisfaccion', 'quince'] },
            { n: 'Línea base y comparación', claves: ['linea base', 'compar', 'antes', 'despues', 'medir'] },
            { n: 'Ciclo de mejora continua', claves: ['phva', 'planificar', 'verificar', 'actuar', 'mejora continua', 'ajust'] }
          ],
          evitar: [ { claves: ['no hace falta medir', 'si nadie reclama'], fb: 'Sin medición no hay control del proceso.' } ],
          modelo: 'Mediremos el tiempo de ciclo, que hoy es de 15 días, las visitas por usuario y la satisfacción; compararemos con la línea base cada mes y ajustaremos con el ciclo PHVA.'
        }
      ]
    }
  },

  /* ───────────── AIP-18 Ética Profesional ───────────── */
  {
    id: 'asig-AIP-18', cod: 'AIP-18',
    titulo: 'El regalo del proveedor y el pedido del primo',
    asignaturas: ['AIP-18'],
    persona: { nombre: 'Sr. Héctor Mejía', rol: 'Proveedor de materiales de construcción', avatar: '🧔🏽', pitch: 0.9 },
    contexto: 'Trabajas en la Dirección Administrativa. Un proveedor que participa en un proceso del GAD te visita con un “detallito” y, además, te enteras de que tu primo también es oferente. Debes actuar con ética.',
    objetivo: 'Aplicar principios éticos, normas deontológicas y la gestión de conflictos de interés en la administración pública.',
    pasos: [
      { dice: 'Licenciado, aquí le traigo una canasta navideña y un sobrecito, por lo bien que nos atiende. Ya sabe, para que mi oferta salga pronto.', opciones: [
          { t: 'Rechazar con cortesía y firmeza, explicar que no acepto regalos por mi función y registrar el hecho ante mi jefe.', p: 2, r: 'Ah… bueno, disculpe, no era con mala intención.', fb: 'El servidor público no puede recibir dádivas por su función; aceptarlas puede configurar cohecho. Informar protege a la institución y al servidor.' },
          { t: 'Aceptar solo la canasta, pero devolver el sobre.', p: 1, r: 'Bueno, quédese con la canasta entonces.', fb: 'Aunque parezca menor, cualquier obsequio ligado a un proceso compromete la imparcialidad.' },
          { t: 'Recibir todo y prometerle que su oferta irá primero.', p: 0, r: 'Así me gusta, nos entendemos.', fb: 'Es un acto de corrupción con consecuencias administrativas y penales.' } ] },
      { dice: '(Revisando las ofertas) Ves que una es de la empresa de tu primo Andrés. Tu jefa te pide que integres la comisión de calificación.', opciones: [
          { t: 'Declarar por escrito mi conflicto de interés y excusarme de participar en la comisión.', p: 2, r: 'Gracias por avisar; designo a otra persona.', fb: 'Ante un conflicto de interés por parentesco, el deber es declararlo y abstenerse de intervenir.' },
          { t: 'Participar, pero calificar con mucho cuidado para no favorecerlo.', p: 1, r: 'Aun así, cualquier resultado sería cuestionado.', fb: 'La imparcialidad también debe ser aparente; participar con un conflicto compromete el proceso.' },
          { t: 'Participar sin decir nada y ayudar a mi primo con la puntuación.', p: 0, r: 'Eso sería nepotismo y fraude al proceso.', fb: 'Ocultar el parentesco y favorecerlo vulnera la ley y la ética pública.' } ] },
      { dice: 'Tu jefa te pide proponer algo para que esto no vuelva a pasar en la Dirección.', opciones: [
          { t: 'Proponer una política interna: declaración anual de conflictos de interés, capacitación en el código de ética y un canal confidencial de denuncias.', p: 2, r: 'Muy bien, lo llevamos al comité de ética.', fb: 'Implementar normas éticas requiere prevención, formación y mecanismos de denuncia protegidos.' },
          { t: 'Pegar un afiche que diga “No aceptamos regalos”.', p: 1, r: 'Ayuda, pero es muy poco.', fb: 'La comunicación visual sirve, pero sin procedimientos y formación su efecto es limitado.' },
          { t: 'No hacer nada para no generar mal ambiente con los proveedores.', p: 0, r: 'Eso deja la puerta abierta a la corrupción.', fb: 'La omisión también es una falta ética.' } ] }
    ],
    vivo: {
      lugar: 'Dirección Administrativa, GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '✋', t: 'Rechazar el sobre y la canasta con cortesía', p: 2, fb: 'Protege la imparcialidad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📝', t: 'Registrar el ofrecimiento en un memorando', p: 2, fb: 'Deja constancia y protege al servidor.', efecto: { confianza: 7, tension: -3 } },
            { icono: '🧺', t: 'Quedarse solo con la canasta', p: 1, fb: 'Aún compromete la independencia.', efecto: { confianza: -3, tension: 4 } },
            { icono: '✉️', t: 'Guardar el sobre en el cajón', p: 0, fb: 'Es aceptar una dádiva.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Rechazar dádivas', claves: ['no acepto', 'no puedo aceptar', 'regalo', 'dadiva', 'obsequio', 'rechaz'] },
            { n: 'Imparcialidad del proceso', claves: ['imparcial', 'igualdad', 'todos los oferentes', 'transparen', 'proceso'] },
            { n: 'Informar a la autoridad', claves: ['informar', 'reportar', 'jefe', 'memorando', 'registrar', 'comunicar'] }
          ],
          evitar: [ { claves: ['gracias por el sobre', 'su oferta va primero'], fb: 'Aceptar beneficios por la función es corrupción.' } ],
          modelo: 'Muchas gracias, señor Mejía, pero no puedo aceptar regalos por mi función; todos los oferentes reciben igual trato y debo informar este ofrecimiento a mi jefa.'
        },
        {
          acciones: [
            { icono: '🖊️', t: 'Redactar la declaración de conflicto de interés', p: 2, fb: 'Transparenta el parentesco.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🙅', t: 'Excusarse de la comisión de calificación', p: 2, fb: 'Evita intervenir con interés personal.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📲', t: 'Llamar al primo para darle consejos', p: 0, fb: 'Filtra información y favorece a un oferente.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Conflicto de interés', claves: ['conflicto de interes', 'parentesco', 'primo', 'familiar', 'interes personal'] },
            { n: 'Declarar por escrito', claves: ['declar', 'por escrito', 'informar', 'transparen', 'comunic'] },
            { n: 'Excusarse o abstenerse', claves: ['excus', 'abstener', 'no particip', 'apartarme', 'otra persona'] }
          ],
          evitar: [ { claves: ['nadie se va a enterar', 'ayudarle a mi primo'], fb: 'Ocultar el parentesco es una falta grave.' } ],
          modelo: 'Jefa, declaro por escrito que tengo un conflicto de interés porque mi primo es oferente; me excuso de la comisión para que designe a otra persona.'
        },
        {
          acciones: [
            { icono: '📘', t: 'Revisar el código de ética institucional', p: 2, fb: 'Base para proponer mejoras.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔐', t: 'Proponer un canal confidencial de denuncias', p: 2, fb: 'Protege a quien denuncia.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪧', t: 'Imprimir un afiche contra regalos', p: 1, fb: 'Útil pero insuficiente.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🤐', t: 'Pedir que no se hable más del tema', p: 0, fb: 'La omisión favorece la corrupción.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Código de ética y capacitación', claves: ['codigo de etica', 'capacita', 'taller', 'formacion', 'deontolog'] },
            { n: 'Declaración de conflictos', claves: ['declaracion', 'conflicto', 'anual', 'formulario', 'prevenc'] },
            { n: 'Canal de denuncias', claves: ['denuncia', 'confidencial', 'canal', 'buzon', 'proteccion'] }
          ],
          evitar: [ { claves: ['no hacer nada', 'mejor no decir'], fb: 'Callar ante faltas éticas también es responsabilidad.' } ],
          modelo: 'Propongo una declaración anual de conflictos de interés, capacitación en el código de ética y un canal confidencial de denuncias que proteja al denunciante.'
        }
      ]
    }
  },

  /* ───────────── AIP-19 Auditoría Pública ───────────── */
  {
    id: 'asig-AIP-19', cod: 'AIP-19',
    titulo: 'Examen especial al fondo de caja chica',
    asignaturas: ['AIP-19'],
    persona: { nombre: 'Dra. Liliana Ortega', rol: 'Auditora del equipo de control externo', avatar: '👩🏽‍⚖️', pitch: 1.0 },
    contexto: 'Un equipo de control externo realiza un examen especial al fondo de caja chica del GAD. Como asistente administrativo debes entregar documentación, explicar el control interno y apoyar la respuesta al borrador de informe.',
    objetivo: 'Aplicar procedimientos básicos de auditoría pública, control interno y respaldo documental, y comprender los informes de auditoría.',
    pasos: [
      { dice: 'Buenos días. Según la orden de trabajo, necesito los comprobantes de caja chica de enero a junio, con facturas y autorizaciones.', opciones: [
          { t: 'Entregar el archivo foliado y ordenado cronológicamente, con un acta de entrega de documentos firmada por ambas partes.', p: 2, r: 'Excelente orden; con el acta queda constancia de lo entregado.', fb: 'La colaboración con los organismos de control es obligatoria; el acta de entrega y el foliado garantizan integridad y trazabilidad.' },
          { t: 'Entregar las carpetas como están, sin inventario.', p: 1, r: 'Gracias, pero sin acta no sabremos qué se recibió.', fb: 'Sin registro de entrega pueden surgir discrepancias sobre la documentación.' },
          { t: 'Decirle que vuelva otro día porque estamos ocupados.', p: 0, r: 'Eso se registrará como limitación al alcance.', fb: 'Obstaculizar la auditoría genera responsabilidad administrativa.' } ] },
      { dice: 'Encontré tres gastos de $45, $38 y $52 sin factura, solo con notas a mano. ¿Cómo explica eso el control interno?', opciones: [
          { t: 'Reconocer la debilidad, explicar que sumaban $135 sin sustento válido, y proponer reponer el respaldo o el valor y reforzar el control previo.', p: 2, r: 'Bien, esa actitud y la propuesta constan como acción correctiva.', fb: 'Todo gasto público requiere documentación de soporte válida; el control interno previo debe verificarla antes del pago.' },
          { t: 'Decir que fueron compras urgentes de suministros.', p: 1, r: 'La urgencia no exime del respaldo.', fb: 'La justificación verbal no sustituye el comprobante de venta.' },
          { t: 'Ofrecerle conseguir facturas con fecha anterior.', p: 0, r: 'Eso sería falsificar documentos.', fb: 'Fabricar respaldos es falsificación y agrava la responsabilidad.' } ] },
      { dice: 'Le entrego el borrador del informe con la observación y la recomendación. Tiene plazo para presentar sus comentarios.', opciones: [
          { t: 'Leer el borrador, preparar comentarios con evidencias dentro del plazo y elaborar un plan de acción para cumplir la recomendación.', p: 2, r: 'Así se ejerce el derecho a la defensa y se mejora el control.', fb: 'El borrador se lee en conferencia; la entidad presenta descargos documentados y luego debe cumplir las recomendaciones.' },
          { t: 'Firmar el recibido y esperar el informe final.', p: 1, r: 'Pierde la oportunidad de aportar evidencias.', fb: 'No presentar comentarios deja la observación sin contraargumentos.' },
          { t: 'Ignorar el informe; las recomendaciones son opcionales.', p: 0, r: 'Las recomendaciones son de cumplimiento obligatorio.', fb: 'Incumplir recomendaciones de auditoría genera sanciones.' } ] }
    ],
    vivo: {
      lugar: 'Sala de auditoría, GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 45, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '📂', t: 'Entregar el archivo foliado por mes', p: 2, fb: 'Facilita la verificación.', efecto: { confianza: 9, tension: -6 } },
            { icono: '✍️', t: 'Firmar el acta de entrega de documentos', p: 2, fb: 'Deja constancia de lo entregado.', efecto: { confianza: 7, tension: -5 } },
            { icono: '📦', t: 'Entregar una caja sin inventario', p: 1, fb: 'Falta trazabilidad.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🚪', t: 'Cerrar el archivo con llave y salir', p: 0, fb: 'Obstaculiza el control.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Orden de trabajo y colaboración', claves: ['orden de trabajo', 'colabor', 'contraloria', 'control', 'auditor'] },
            { n: 'Documentación de soporte', claves: ['comprobante', 'factura', 'autoriz', 'respaldo', 'soporte', 'caja chica'] },
            { n: 'Acta y foliado', claves: ['acta', 'foliad', 'inventario', 'cronologic', 'constancia'] }
          ],
          evitar: [ { claves: ['vuelva otro dia', 'no tengo tiempo'], fb: 'Retrasar la entrega limita el alcance de la auditoría.' } ],
          modelo: 'Doctora, le entrego los comprobantes de caja chica de enero a junio, foliados y en orden cronológico, con facturas y autorizaciones; firmemos el acta de entrega.'
        },
        {
          acciones: [
            { icono: '🧾', t: 'Sumar los tres gastos sin factura', p: 2, fb: 'Cuantifica la observación: 135 dólares.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🛡️', t: 'Proponer un control previo al pago', p: 2, fb: 'Corrige la debilidad de control interno.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗯️', t: 'Justificar diciendo que era urgente', p: 1, fb: 'La urgencia no sustituye el respaldo.', efecto: { confianza: -2, tension: 3 } },
            { icono: '🖨️', t: 'Imprimir facturas con fecha anterior', p: 0, fb: 'Es falsificación.', efecto: { confianza: -20, tension: 20 } }
          ],
          conceptos: [
            { n: 'Cuantificar la observación', claves: ['ciento treinta y cinco', '135', 'suma', 'total', 'dolares'] },
            { n: 'Debilidad de control interno', claves: ['control interno', 'debilidad', 'reconoc', 'sin sustento', 'sin factura'] },
            { n: 'Acción correctiva', claves: ['control previo', 'reponer', 'corregir', 'restitu', 'verificar antes', 'correctiv'] }
          ],
          evitar: [ { claves: ['conseguir facturas', 'cambiar la fecha'], fb: 'Fabricar documentos es delito.' } ],
          modelo: 'Reconozco la debilidad: suman 135 dólares sin factura válida. Propongo reponer el respaldo o el valor y aplicar control previo para verificar la factura antes de cada pago.'
        },
        {
          acciones: [
            { icono: '📖', t: 'Leer el borrador del informe con el jefe', p: 2, fb: 'Permite preparar descargos.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🗃️', t: 'Adjuntar evidencias a los comentarios', p: 2, fb: 'Sustenta la posición de la entidad.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗑️', t: 'Archivar el borrador sin responder', p: 0, fb: 'Se pierde el derecho a la defensa.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Comentarios dentro del plazo', claves: ['comentario', 'plazo', 'descargo', 'respuesta', 'defensa'] },
            { n: 'Evidencias documentales', claves: ['evidencia', 'documento', 'respaldo', 'adjunt', 'sustent'] },
            { n: 'Plan de cumplimiento de recomendaciones', claves: ['recomendacion', 'plan de accion', 'cumplir', 'obligatori', 'seguimiento'] }
          ],
          evitar: [ { claves: ['son opcionales', 'no hace falta responder'], fb: 'Las recomendaciones de auditoría son obligatorias.' } ],
          modelo: 'Revisaré el borrador, presentaré comentarios con evidencias dentro del plazo y elaboraremos un plan de acción para cumplir la recomendación sobre caja chica.'
        }
      ]
    }
  },

  /* ───────────── AIP-20 Herramientas de Planificación del Sector Público ───────────── */
  {
    id: 'asig-AIP-20', cod: 'AIP-20',
    titulo: 'Del PDOT al POA: proyecto de agua para Shell',
    asignaturas: ['AIP-20'],
    persona: { nombre: 'Sr. Wilson Santi', rol: 'Presidente del comité pro mejoras del barrio Nuevo Amanecer', avatar: '👨🏽‍🦱', pitch: 0.95 },
    contexto: 'El dirigente pide que el proyecto de agua potable de su barrio entre en el plan del próximo año. Debes explicar la alineación con los instrumentos de planificación, armar la matriz del POA y mostrar el seguimiento.',
    objetivo: 'Utilizar instrumentos del Sistema Nacional de Planificación (PND, PDOT, POA), matrices, cronogramas e indicadores de seguimiento.',
    pasos: [
      { dice: 'Compañero, queremos que el agua para Nuevo Amanecer se haga el próximo año. ¿Qué tiene que pasar para que entre en el plan?', opciones: [
          { t: 'Explicar que el proyecto debe estar alineado al PDOT del cantón y este al PND, y luego incluirse en el POA con presupuesto.', p: 2, r: 'Ah, entonces primero hay que ver si el PDOT lo contempla.', fb: 'La planificación pública es articulada: el PND orienta, el PDOT territorializa y el POA programa anualmente con presupuesto.' },
          { t: 'Decirle que presente un oficio al alcalde.', p: 1, r: '¿Y con eso ya se hace?', fb: 'El oficio inicia la gestión, pero la inclusión depende de la planificación institucional.' },
          { t: 'Prometerle que sí entra porque el alcalde ofreció.', p: 0, r: '¡Ya le cuento al barrio!', fb: 'Prometer sin planificación genera falsas expectativas.' } ] },
      { dice: '(En la oficina) Tu jefe te pide armar la fila del POA para el proyecto.', opciones: [
          { t: 'Llenar la matriz con objetivo, meta (120 familias con agua), indicador, actividades, responsable, cronograma trimestral y presupuesto.', p: 2, r: 'Completa y medible. Así la aprobamos.', fb: 'La matriz POA vincula objetivos con metas, indicadores, actividades, responsables, plazos y recursos.' },
          { t: 'Poner solo el nombre del proyecto y el monto.', p: 1, r: 'Falta la meta y cómo la mediremos.', fb: 'Sin indicadores ni cronograma no se puede dar seguimiento.' },
          { t: 'Dejarlo sin meta para no comprometernos.', p: 0, r: 'Sin meta no hay gestión por resultados.', fb: 'Evitar metas impide la evaluación y la rendición de cuentas.' } ] },
      { dice: 'A septiembre, la obra lleva 40 % de avance físico, pero según el cronograma debería ir en 60 %. ¿Qué reportamos?', opciones: [
          { t: 'Reportar el semáforo en amarillo, con una brecha de 20 puntos, identificar la causa y proponer medidas correctivas con nuevas fechas.', p: 2, r: 'Bien: dato, causa y acción. Eso es seguimiento.', fb: 'El seguimiento compara lo programado con lo ejecutado, calcula la brecha y genera alertas y correctivos.' },
          { t: 'Reportar que la obra avanza normal.', p: 1, r: 'Pero no es normal: hay retraso.', fb: 'Un reporte impreciso oculta riesgos.' },
          { t: 'Cambiar el cronograma para que parezca al día.', p: 0, r: 'Eso es maquillar la información.', fb: 'Alterar la programación para ocultar retrasos vulnera la transparencia.' } ] }
    ],
    vivo: {
      lugar: 'Casa comunal del barrio Nuevo Amanecer, Shell', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Mostrar el mapa del PDOT con el barrio', p: 2, fb: 'Visualiza la alineación territorial.', efecto: { confianza: 9, tension: -6 } },
            { icono: '🔗', t: 'Explicar la cadena PND, PDOT y POA', p: 2, fb: 'Aclara cómo se articula la planificación.', efecto: { confianza: 7, tension: -5 } },
            { icono: '✉️', t: 'Recibir solo su oficio', p: 1, fb: 'Inicia la gestión pero no explica el proceso.', efecto: { confianza: 1, tension: 1 } },
            { icono: '🤞', t: 'Prometer que la obra va sí o sí', p: 0, fb: 'Genera falsas expectativas.', efecto: { confianza: -10, tension: 12 } }
          ],
          conceptos: [
            { n: 'Alineación al PDOT', claves: ['pdot', 'ordenamiento territorial', 'plan de desarrollo', 'alinea', 'canton'] },
            { n: 'Articulación con el PND', claves: ['pnd', 'plan nacional', 'sistema nacional de planificacion', 'articul', 'nacional'] },
            { n: 'Programación en el POA', claves: ['poa', 'plan operativo anual', 'presupuesto', 'program', 'proximo ano'] }
          ],
          evitar: [ { claves: ['seguro que entra', 'el alcalde ya ofrecio'], fb: 'Las promesas sin planificación generan desconfianza.' } ],
          modelo: 'Don Wilson, el proyecto debe estar alineado al PDOT del cantón, que se articula con el Plan Nacional de Desarrollo; si consta, se programa en el POA del próximo año con presupuesto.'
        },
        {
          acciones: [
            { icono: '🎯', t: 'Redactar la meta de 120 familias con agua', p: 2, fb: 'Una meta medible orienta la gestión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗓️', t: 'Armar el cronograma trimestral de actividades', p: 2, fb: 'Permite el seguimiento.', efecto: { confianza: 7, tension: -4 } },
            { icono: '❔', t: 'Dejar vacía la columna de indicadores', p: 0, fb: 'Sin indicador no hay seguimiento.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Meta e indicador', claves: ['meta', 'indicador', 'ciento veinte', '120', 'familias', 'cobertura'] },
            { n: 'Actividades y responsables', claves: ['actividad', 'responsable', 'tarea', 'direccion de obras', 'encargado'] },
            { n: 'Cronograma y presupuesto', claves: ['cronograma', 'trimestr', 'presupuesto', 'plazo', 'fecha', 'recurso'] }
          ],
          evitar: [ { claves: ['sin meta', 'no comprometernos'], fb: 'Planificar sin metas impide evaluar.' } ],
          modelo: 'En la matriz pongo el objetivo, la meta de 120 familias con agua, el indicador de cobertura, las actividades con responsables, el cronograma trimestral y el presupuesto.'
        },
        {
          acciones: [
            { icono: '🚦', t: 'Marcar el semáforo amarillo en la matriz', p: 2, fb: 'Alerta temprana del retraso.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧾', t: 'Calcular la brecha programado contra ejecutado', p: 2, fb: 'Cuantifica 20 puntos de retraso.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✏️', t: 'Modificar el cronograma para ocultar el retraso', p: 0, fb: 'Manipula la información.', efecto: { confianza: -18, tension: 16 } }
          ],
          conceptos: [
            { n: 'Brecha de avance', claves: ['veinte', '20', 'cuarenta', '40', 'sesenta', '60', 'brecha'] },
            { n: 'Alerta y causa', claves: ['semaforo', 'amarillo', 'alerta', 'causa', 'retraso'] },
            { n: 'Medidas correctivas', claves: ['correctiv', 'nueva fecha', 'reprogram', 'accion', 'ajust', 'seguimiento'] }
          ],
          evitar: [ { claves: ['todo normal', 'maquillar'], fb: 'Ocultar retrasos vulnera la transparencia.' } ],
          modelo: 'El avance es 40 % frente a 60 % programado, una brecha de 20 puntos; lo reporto en semáforo amarillo, con la causa y medidas correctivas con nuevas fechas.'
        }
      ]
    }
  },

  /* ───────────── AIP-21 Contratación Pública y Compras Públicas ───────────── */
  {
    id: 'asig-AIP-21', cod: 'AIP-21',
    titulo: 'Compra de equipos para la Unidad de Gestión de Riesgos',
    asignaturas: ['AIP-21'],
    persona: { nombre: 'Abg. Daniela Cevallos', rol: 'Jefa de Compras Públicas del GAD Municipal de San Isidro', avatar: '👩🏻‍⚖️', pitch: 1.1 },
    contexto: 'La Unidad de Gestión de Riesgos necesita radios y botas para la temporada de lluvias. La jefa de Compras te encarga preparar la fase previa, verificar el procedimiento y controlar la entrega.',
    objetivo: 'Apoyar procedimientos de contratación pública conforme a la LOSNCP: fase preparatoria, principios, documentos y control del contrato.',
    pasos: [
      { dice: 'Riesgos quiere comprar ya. Antes de publicar nada, ¿qué documentos debemos tener en la fase preparatoria?', opciones: [
          { t: 'Verificar que la compra conste en el PAC, obtener la certificación presupuestaria, el estudio de mercado y las especificaciones técnicas.', p: 2, r: 'Exacto, sin eso el proceso nace viciado.', fb: 'La LOSNCP exige planificación (PAC), disponibilidad presupuestaria y estudios previos antes de iniciar el procedimiento.' },
          { t: 'Pedir tres cotizaciones y escoger la más barata.', p: 1, r: 'El estudio de mercado ayuda, pero faltan PAC y certificación.', fb: 'Las cotizaciones son parte del estudio de mercado, no el único requisito.' },
          { t: 'Comprar directo al proveedor conocido y regularizar luego.', p: 0, r: 'Eso es contratar sin procedimiento.', fb: 'Comprar sin proceso vulnera la ley y genera responsabilidades.' } ] },
      { dice: 'Un proveedor llama y pide que las especificaciones digan “radios marca X modelo 500”, la que él vende. ¿Qué hacemos?', opciones: [
          { t: 'Redactar especificaciones por características técnicas y funcionales, sin marcas, para permitir la concurrencia.', p: 2, r: 'Bien: trato justo e igualdad para todos los oferentes.', fb: 'Los principios de concurrencia, igualdad y trato justo prohíben direccionar procesos con marcas específicas.' },
          { t: 'Poner la marca X pero añadir “o similar”.', p: 1, r: 'Mejor, pero sigue orientando hacia un proveedor.', fb: 'Lo adecuado es describir requisitos técnicos objetivos.' },
          { t: 'Aceptar la sugerencia porque esa marca es buena.', p: 0, r: 'Eso es direccionar el proceso.', fb: 'Direccionar especificaciones es una infracción grave.' } ] },
      { dice: 'Llegaron los equipos, pero faltan 5 de los 30 radios. El proveedor quiere que firmemos el acta completa y “luego completa”.', opciones: [
          { t: 'Informar al administrador del contrato, firmar solo un acta parcial con lo recibido y exigir la entrega del saldo dentro del plazo o aplicar multas según el contrato.', p: 2, r: 'Correcto, el acta refleja lo real y protege al GAD.', fb: 'El administrador del contrato controla la ejecución; el acta de entrega-recepción debe reflejar lo efectivamente recibido.' },
          { t: 'No firmar nada hasta que llegue todo.', p: 1, r: 'Protege, pero conviene dejar constancia de lo recibido.', fb: 'Un acta parcial documenta el avance real y el incumplimiento.' },
          { t: 'Firmar el acta completa por confianza.', p: 0, r: 'Si no entrega, el GAD pierde.', fb: 'Firmar recepción de bienes no entregados genera responsabilidad y posible perjuicio.' } ] }
    ],
    vivo: {
      lugar: 'Unidad de Compras Públicas, GAD Municipal de San Isidro', fondo: 'oficina',
      inicio: { confianza: 50, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '📋', t: 'Revisar que la compra conste en el PAC', p: 2, fb: 'Toda contratación debe estar planificada.', efecto: { confianza: 8, tension: -5 } },
            { icono: '💳', t: 'Solicitar la certificación presupuestaria', p: 2, fb: 'Garantiza que existen fondos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📞', t: 'Llamar a tres proveedores por precios', p: 1, fb: 'Aporta al estudio de mercado, pero no basta.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🛒', t: 'Comprar directo al proveedor de siempre', p: 0, fb: 'Contratar sin procedimiento es ilegal.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Plan Anual de Contratación', claves: ['pac', 'plan anual de contratacion', 'planific', 'conste', 'plan anual'] },
            { n: 'Certificación presupuestaria', claves: ['certificacion presupuestaria', 'presupuesto', 'disponibilidad', 'fondos', 'partida'] },
            { n: 'Estudios previos', claves: ['estudio de mercado', 'especificacion', 'termino', 'cotizacion', 'necesidad', 'estudio'] }
          ],
          evitar: [ { claves: ['regularizar luego', 'compra directa'], fb: 'No se contrata sin procedimiento previo.' } ],
          modelo: 'Antes de publicar, verifico que la compra conste en el PAC, obtengo la certificación presupuestaria y preparo el estudio de mercado y las especificaciones técnicas.'
        },
        {
          acciones: [
            { icono: '📡', t: 'Describir alcance, batería y resistencia al agua', p: 2, fb: 'Especificaciones técnicas objetivas.', efecto: { confianza: 9, tension: -5 } },
            { icono: '📵', t: 'Cortar la llamada indicando que no se reciben pedidos', p: 2, fb: 'Evita contacto indebido con oferentes.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🏷️', t: 'Escribir la marca X en las especificaciones', p: 0, fb: 'Direcciona el proceso.', efecto: { confianza: -16, tension: 15 } }
          ],
          conceptos: [
            { n: 'Especificaciones técnicas sin marcas', claves: ['especificacion', 'caracteristica', 'tecnic', 'sin marca', 'funcional'] },
            { n: 'Principios de contratación', claves: ['concurrencia', 'igualdad', 'trato justo', 'transparen', 'competencia'] },
            { n: 'No direccionar el proceso', claves: ['direccion', 'favorecer', 'un solo proveedor', 'todos los oferentes', 'imparcial'] }
          ],
          evitar: [ { claves: ['marca x', 'esa marca es buena'], fb: 'Pedir marcas restringe la concurrencia.' } ],
          modelo: 'Las especificaciones se redactan por características técnicas, como alcance, batería y resistencia al agua, sin marcas, para garantizar concurrencia, igualdad y trato justo.'
        },
        {
          acciones: [
            { icono: '🔢', t: 'Contar los radios recibidos uno por uno', p: 2, fb: 'Verifica cantidades contra el contrato.', efecto: { confianza: 7, tension: -3 } },
            { icono: '📨', t: 'Notificar al administrador del contrato', p: 2, fb: 'Es quien controla la ejecución.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⏸️', t: 'Devolver todo sin dejar constancia', p: 1, fb: 'Falta documentar lo recibido.', efecto: { confianza: 0, tension: 4 } },
            { icono: '🖋️', t: 'Firmar el acta completa por confianza', p: 0, fb: 'Registra bienes no entregados.', efecto: { confianza: -18, tension: 16 } }
          ],
          conceptos: [
            { n: 'Administrador del contrato', claves: ['administrador del contrato', 'administrador', 'notific', 'informar', 'contrato'] },
            { n: 'Acta parcial real', claves: ['acta parcial', 'acta de entrega', 'recepcion', 'veinticinco', '25', 'lo recibido'] },
            { n: 'Saldo, plazo y multas', claves: ['cinco', '5', 'faltan', 'saldo', 'plazo', 'multa'] }
          ],
          evitar: [ { claves: ['firmamos completo', 'luego completa'], fb: 'El acta debe reflejar lo efectivamente recibido.' } ],
          modelo: 'Recibimos 25 de 30 radios: informo al administrador del contrato, firmamos un acta parcial solo por lo recibido y exigimos los 5 faltantes en plazo, o se aplican las multas del contrato.'
        }
      ]
    }
  },

  /* ───────────── AIP-22 Trabajo de Integración Curricular ───────────── */
  {
    id: 'asig-AIP-22', cod: 'AIP-22',
    titulo: 'Defensa del proyecto ante el tribunal',
    asignaturas: ['AIP-22'],
    persona: { nombre: 'Mgs. Fernando Andi', rol: 'Presidente del tribunal de titulación', avatar: '👨🏽‍🏫', pitch: 0.9 },
    contexto: 'Presentas tu proyecto de titulación: “Propuesta de mejora del archivo de gestión del GAD Municipal de San Isidro”. El tribunal pregunta por la estructura, la metodología y los resultados.',
    objetivo: 'Aplicar requisitos y normativas de titulación, estructurar el proyecto y usar técnicas de defensa ante un tribunal.',
    pasos: [
      { dice: 'Buenos días. Tiene 15 minutos. Empiece explicando el problema y los objetivos de su proyecto.', opciones: [
          { t: 'Presentar el problema con datos (expedientes perdidos y 40 minutos promedio de búsqueda), el objetivo general y los objetivos específicos, respetando el tiempo.', p: 2, r: 'Claro y con datos. Continúe.', fb: 'Una defensa efectiva inicia con un problema delimitado y objetivos coherentes, según la estructura exigida por el reglamento de titulación.' },
          { t: 'Contar cómo llegó a elegir el tema y su experiencia en el GAD.', p: 1, r: 'Interesante, pero vaya al problema.', fb: 'El contexto personal no sustituye el planteamiento del problema.' },
          { t: 'Leer textualmente las diapositivas llenas de texto.', p: 0, r: 'El tribunal ya puede leer; queremos escucharle a usted.', fb: 'Leer diapositivas resta dominio del tema y comunicación.' } ] },
      { dice: '¿Qué metodología utilizó y cómo garantiza que sus datos son confiables?', opciones: [
          { t: 'Explicar el enfoque mixto: encuesta a 35 servidores, entrevistas a jefes y ficha de observación del archivo, con instrumentos validados por expertos.', p: 2, r: 'Bien fundamentado metodológicamente.', fb: 'La metodología debe describir enfoque, población, técnicas e instrumentos y su validación.' },
          { t: 'Decir que hizo encuestas.', p: 1, r: '¿A cuántos? ¿Con qué instrumento?', fb: 'Una respuesta general no demuestra rigor metodológico.' },
          { t: 'Decir que la información la sacó de internet.', p: 0, r: 'Eso no es investigación de campo.', fb: 'Sin fuentes primarias ni validación, los resultados carecen de confiabilidad.' } ] },
      { dice: 'Un miembro del tribunal observa que su propuesta no tiene presupuesto. ¿Qué responde?', opciones: [
          { t: 'Agradecer la observación, reconocer el límite, explicar el costo estimado de los recursos clave y comprometerme a incorporarlo en la versión final.', p: 2, r: 'Buena actitud y respuesta sustentada.', fb: 'Las técnicas de defensa incluyen escuchar, reconocer observaciones válidas y responder con argumentos.' },
          { t: 'Decir que el presupuesto lo hará el GAD.', p: 1, r: 'Pero usted debería estimarlo.', fb: 'Delegar sin análisis muestra un vacío en la propuesta.' },
          { t: 'Discutir que esa observación no es importante.', p: 0, r: 'El tribunal evalúa también su actitud.', fb: 'Una actitud defensiva afecta la evaluación final.' } ] }
    ],
    vivo: {
      lugar: 'Auditorio del instituto, Puyo', fondo: 'aula',
      inicio: { confianza: 50, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '🖥️', t: 'Mostrar la diapositiva del problema con datos', p: 2, fb: 'Evidencia el problema de forma concreta.', efecto: { confianza: 9, tension: -6 } },
            { icono: '⏲️', t: 'Activar el cronómetro de 15 minutos', p: 2, fb: 'Respeta el tiempo reglamentario.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📜', t: 'Leer las diapositivas de espaldas al tribunal', p: 0, fb: 'Muestra poco dominio.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Problema con datos', claves: ['problema', 'expediente', 'perdid', 'cuarenta minutos', '40', 'busqueda'] },
            { n: 'Objetivo general', claves: ['objetivo general', 'proponer', 'mejorar el archivo', 'mejora', 'archivo'] },
            { n: 'Objetivos específicos', claves: ['objetivos especificos', 'diagnosticar', 'disenar', 'validar', 'especifico'] }
          ],
          evitar: [ { claves: ['como dice la diapositiva', 'no me acuerdo'], fb: 'Dependencia del texto muestra poca preparación.' } ],
          modelo: 'El problema es la pérdida de expedientes y una búsqueda promedio de 40 minutos; mi objetivo general es proponer una mejora del archivo de gestión, y los específicos son diagnosticar, diseñar y validar la propuesta.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Mostrar la tabla de población y técnicas', p: 2, fb: 'Transparenta la metodología.', efecto: { confianza: 8, tension: -5 } },
            { icono: '✅', t: 'Presentar el informe de validación de expertos', p: 2, fb: 'Respalda la confiabilidad de los instrumentos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🌐', t: 'Citar páginas web sin autor', p: 0, fb: 'Fuentes poco confiables.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Enfoque metodológico', claves: ['enfoque', 'mixto', 'cualitativ', 'cuantitativ', 'metodolog'] },
            { n: 'Población y técnicas', claves: ['treinta y cinco', '35', 'encuesta', 'entrevista', 'observacion', 'servidores'] },
            { n: 'Validación de instrumentos', claves: ['validacion', 'validad', 'experto', 'confiab', 'instrumento'] }
          ],
          evitar: [ { claves: ['saque de internet', 'copie'], fb: 'Sin trabajo de campo no hay investigación válida.' } ],
          modelo: 'Usé un enfoque mixto: encuesta a 35 servidores, entrevistas a jefes y ficha de observación; los instrumentos fueron validados por tres expertos.'
        },
        {
          acciones: [
            { icono: '🙂', t: 'Agradecer la observación del tribunal', p: 2, fb: 'Actitud profesional y receptiva.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🗒️', t: 'Anotar la observación para la versión final', p: 2, fb: 'Muestra compromiso con la mejora.', efecto: { confianza: 6, tension: -4 } },
            { icono: '😤', t: 'Cruzarse de brazos y discutir', p: 0, fb: 'Actitud defensiva penalizada.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Agradecer y reconocer', claves: ['agradezco', 'gracias', 'reconozco', 'tiene razon', 'observacion'] },
            { n: 'Argumentar con costo estimado', claves: ['costo', 'presupuesto', 'estimad', 'recurso', 'dolares'] },
            { n: 'Compromiso de corrección', claves: ['incorporar', 'version final', 'corregir', 'compromet', 'ajustar'] }
          ],
          evitar: [ { claves: ['no es importante', 'eso no aplica'], fb: 'Descalificar observaciones afecta la evaluación.' } ],
          modelo: 'Agradezco la observación y reconozco el vacío; el costo estimado de estanterías y digitalización es de unos dos mil dólares, y lo incorporaré en la versión final.'
        }
      ]
    }
  }
]);
