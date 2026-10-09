/* Prácticas por asignatura – Educación Básica (PAO 3–4) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-304', cod: 'SPRL-304',
    titulo: 'Mateo se rinde ante los problemas',
    asignaturas: ['SPRL-304'],
    persona: { nombre: 'Mateo', rol: 'Estudiante de 6.º EGB, 11 años', avatar: '👦🏽', pitch: 1.25 },
    contexto: 'En una escuela de Puyo, Mateo arruga su hoja de problemas, golpea la mesa y dice que es "burro para esto". Debes manejar su comportamiento y ayudarle a aprender a aprender.',
    objetivo: 'Aplicar gestión del comportamiento, metacognición y feedback con ajuste de estrategias.',
    pasos: [
      { dice: '(Mateo golpea la mesa) ¡Ya no quiero hacer nada! ¡Soy burro para esto, profe!', opciones: [
          { t: 'Acercarme con calma, validar su frustración y proponerle una pausa breve antes de seguir.', p: 2, r: 'Mateo respira hondo y suelta la hoja arrugada.', fb: 'La gestión del comportamiento empieza regulando la emoción: validar y dar una salida evita la escalada y protege la autoestima.' },
          { t: 'Pedirle en voz alta que se calme porque está molestando a los demás.', p: 1, r: 'Mateo se calla, pero agacha la cabeza avergonzado.', fb: 'Detiene la conducta, pero la exposición pública aumenta la vergüenza y no atiende la causa.' },
          { t: 'Anotarlo en el leccionario y enviarlo a inspección.', p: 0, r: 'Mateo sale llorando y no vuelve a intentar.', fb: 'La sanción inmediata sin mediación refuerza la idea de fracaso y no enseña autorregulación.' } ] },
      { dice: 'Es que leo el problema y no sé ni por dónde empezar.', opciones: [
          { t: 'Preguntarle qué entendió, qué le piden y qué podría probar primero, para que piense en su propio proceso.', p: 2, r: 'Mateo relee y dice: "Ah, me piden cuántos sobran".', fb: 'Las preguntas metacognitivas (¿qué sé?, ¿qué me piden?, ¿qué estrategia uso?) desarrollan la autorregulación del aprendizaje.' },
          { t: 'Leerle yo el problema despacio y subrayar los datos.', p: 1, r: 'Mateo identifica los datos, pero espera que yo siga.', fb: 'Es un andamiaje útil, pero si el docente hace todo, el estudiante no reflexiona sobre su estrategia.' },
          { t: 'Resolverle el problema para que vea cómo se hace.', p: 0, r: 'Mateo copia la respuesta sin entender.', fb: 'Dar la solución elimina el esfuerzo cognitivo y no desarrolla la resolución de problemas.' } ] },
      { dice: '¡Ya me salió uno! Pero el otro está mal, ¿no?', opciones: [
          { t: 'Darle feedback concreto: lo que hizo bien, dónde está el error y una estrategia para revisarlo, y pedirle que se autoevalúe.', p: 2, r: 'Mateo encuentra su error y sonríe: "Me faltó restar".', fb: 'El feedback descriptivo y oportuno, junto con la autoevaluación, permite ajustar estrategias y mejora el rendimiento.' },
          { t: 'Decirle "muy bien, sigue así" y marcar el error con rojo.', p: 1, r: 'Mateo se alegra, pero no sabe qué corregir.', fb: 'El elogio general motiva, pero sin información concreta no orienta la mejora.' },
          { t: 'Decirle "está mal, otra vez no prestaste atención".', p: 0, r: 'Mateo vuelve a cerrar el cuaderno.', fb: 'El feedback centrado en la persona y no en la tarea daña la motivación y la autoeficacia.' } ] }
    ],
    vivo: {
      lugar: 'Aula de 6.º EGB en una escuela fiscal de Puyo', fondo: 'aula',
      inicio: { confianza: 35, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '🧎', t: 'Agacharte a su altura y hablarle en voz baja', p: 2, fb: 'La cercanía tranquila regula la emoción y no expone al estudiante.', efecto: { confianza: 10, tension: -12 } },
            { icono: '🌬️', t: 'Proponerle respirar juntos tres veces', p: 2, fb: 'Una estrategia breve de autorregulación baja la activación antes de volver a la tarea.', efecto: { confianza: 6, tension: -10 } },
            { icono: '📢', t: 'Llamarle la atención frente a toda la clase', p: 0, fb: 'La exposición pública aumenta la vergüenza y la conducta desafiante.', efecto: { confianza: -12, tension: 15 } },
            { icono: '🚪', t: 'Enviarlo a inspección de inmediato', p: 0, fb: 'Excluir sin mediar no enseña a manejar la frustración.', efecto: { confianza: -15, tension: 10 } }
          ],
          conceptos: [
            { n: 'Valida la emoción', claves: ['entiendo', 'frustra', 'molest', 'es normal', 'te sientes', 'enojad', 'cansad'] },
            { n: 'Cuida su autoestima', claves: ['no eres burro', 'eres capaz', 'puedes', 'inteligente', 'confio en ti', 'aprendiendo'] },
            { n: 'Ofrece una pausa o estrategia de calma', claves: ['respir', 'pausa', 'calm', 'un momento', 'tranquil', 'descans'] }
          ],
          evitar: [ { claves: ['eres burro', 'siempre lo mismo', 'castigado'], fb: 'Etiquetar o amenazar refuerza la creencia de incapacidad.' } ],
          modelo: 'Mateo, entiendo que te frustra; es normal cuando algo cuesta. No eres burro, estás aprendiendo. Respiremos un momento y luego lo intentamos juntos.'
        },
        {
          acciones: [
            { icono: '❓', t: 'Hacerle preguntas sobre qué sabe y qué le piden', p: 2, fb: 'Las preguntas metacognitivas activan la planificación de su propio proceso.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🖍️', t: 'Pedirle que subraye datos y pregunta con colores', p: 1, fb: 'Organizar la información ayuda, aunque debe acompañarse de reflexión.', efecto: { confianza: 4, tension: -3 } },
            { icono: '✍️', t: 'Resolverle el problema en su cuaderno', p: 0, fb: 'Sustituir al estudiante impide que construya la estrategia.', efecto: { confianza: -5, tension: 5 } }
          ],
          conceptos: [
            { n: 'Pregunta qué entendió', claves: ['que entendiste', 'que te piden', 'que pide', 'con tus palabras', 'que sabes', 'datos'] },
            { n: 'Invita a planificar una estrategia', claves: ['estrategia', 'como podrias', 'que harias', 'primer paso', 'plan', 'probar', 'dibuj'] },
            { n: 'Promueve la reflexión sobre su proceso', claves: ['piensa', 'reflexion', 'como lo hiciste', 'por que', 'revisa', 'darte cuenta'] }
          ],
          evitar: [ { claves: ['te lo resuelvo', 'copia', 'es facilisimo'], fb: 'Resolver por él o minimizar la dificultad bloquea la metacognición.' } ],
          modelo: 'Cuéntame con tus palabras qué te piden y qué datos tienes. ¿Cuál sería tu primer paso? Piensa cómo podrías probarlo, por ejemplo dibujando.'
        },
        {
          acciones: [
            { icono: '✅', t: 'Señalar primero el procedimiento que hizo bien', p: 2, fb: 'Reconocer logros concretos fortalece la autoeficacia.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔎', t: 'Pedirle que compare sus dos ejercicios y halle el error', p: 2, fb: 'La autoevaluación guiada desarrolla la autorregulación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '❌', t: 'Tachar el ejercicio con rojo sin explicar', p: 0, fb: 'Marcar sin explicar no orienta el ajuste de la estrategia.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Reconoce lo logrado', claves: ['hiciste bien', 'muy bien', 'lograste', 'correcto', 'acertaste', 'bien hecho'] },
            { n: 'Describe el error y cómo corregirlo', claves: ['error', 'falto', 'revisa', 'corrige', 'paso', 'comprueba', 'ajust'] },
            { n: 'Pide autoevaluación', claves: ['como te fue', 'que aprendiste', 'autoevalu', 'que cambiarias', 'que harias diferente', 'compara'] }
          ],
          evitar: [ { claves: ['no prestaste atencion', 'otra vez mal'], fb: 'El feedback debe centrarse en la tarea, no en culpar a la persona.' } ],
          modelo: 'Muy bien, el primero lo lograste porque ordenaste los datos. En el segundo te faltó un paso: revisa la resta y compara con el primero. ¿Qué harías diferente la próxima vez?'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-305', cod: 'SPRL-305',
    titulo: 'Observación de clase en 4.º EGB',
    asignaturas: ['SPRL-305'],
    persona: { nombre: 'Lcda. Rosa Tanguila', rol: 'Coordinadora pedagógica', avatar: '👩🏽‍🏫', pitch: 1.05 },
    contexto: 'La coordinadora observará tu clase de Ciencias sobre los seres vivos en una escuela de Shell, Pastaza, y conversa contigo sobre tu diseño didáctico. Debes justificar métodos, trabajo colaborativo y retroalimentación.',
    objetivo: 'Aplicar métodos y estrategias didácticas inclusivas, competencias transversales y retroalimentación en EGB.',
    pasos: [
      { dice: '¿Cómo vas a iniciar la clase y qué método didáctico vas a seguir?', opciones: [
          { t: 'Con una experiencia concreta: observar plantas del patio, luego reflexionar, conceptualizar y aplicar (ciclo ERCA).', p: 2, r: 'Me parece coherente; parte de la experiencia de los niños.', fb: 'Un método activo con fases claras (experiencia, reflexión, conceptualización, aplicación) conecta con saberes previos y el entorno.' },
          { t: 'Con una pregunta motivadora y luego explicación con láminas.', p: 1, r: 'Bien la motivación, pero ¿cuándo participan ellos?', fb: 'Motivar es útil, pero falta una secuencia didáctica que haga protagonistas a los estudiantes.' },
          { t: 'Dictando el concepto de ser vivo para que lo copien.', p: 0, r: 'Eso no es aprendizaje activo...', fb: 'El dictado es transmisivo y no desarrolla comprensión ni pensamiento crítico.' } ] },
      { dice: 'Tienes 32 estudiantes, dos con ritmo más lento. ¿Cómo organizas el trabajo?', opciones: [
          { t: 'Grupos heterogéneos de cuatro con roles rotativos y una tarea graduada, apoyando más a quienes lo necesitan.', p: 2, r: 'Así trabajan colaboración y nadie queda fuera.', fb: 'El aprendizaje cooperativo con roles y tareas diferenciadas desarrolla competencias transversales y atiende la diversidad.' },
          { t: 'Grupos libres para que se junten con sus amigos.', p: 1, r: 'Puede funcionar, pero algunos quedarán solos.', fb: 'Sin criterios ni roles, el trabajo grupal suele excluir a algunos estudiantes.' },
          { t: 'Que trabajen solos; los lentos terminarán en casa.', p: 0, r: 'Eso no es inclusivo.', fb: 'Trasladar la diferencia al hogar ignora las necesidades educativas y genera inequidad.' } ] },
      { dice: '¿Cómo cerrarás y retroalimentarás la clase?', opciones: [
          { t: 'Con una puesta en común, preguntas de reflexión, retroalimentación a cada grupo y un breve compromiso de convivencia sobre el trabajo en equipo.', p: 2, r: 'Excelente: cierras lo cognitivo y lo socioemocional.', fb: 'La retroalimentación formativa y la reflexión sobre la colaboración integran habilidades sociales y emocionales.' },
          { t: 'Con una prueba corta escrita.', p: 1, r: 'Te da datos, pero no retroalimenta en el momento.', fb: 'Evaluar es necesario, pero la retroalimentación inmediata es la que mejora el aprendizaje.' },
          { t: 'Enviando un deber largo y terminando cuando suena el timbre.', p: 0, r: 'Te faltó cierre.', fb: 'Sin cierre no se consolida el aprendizaje ni se retroalimenta.' } ] }
    ],
    vivo: {
      lugar: 'Sala de docentes de una escuela de Shell, Pastaza', fondo: 'oficina',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🌱', t: 'Mostrar las plantas que traerán del patio', p: 2, fb: 'Partir del entorno inmediato hace significativa la experiencia.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📄', t: 'Entregar tu plan de clase con fases ERCA', p: 2, fb: 'Una secuencia explícita evidencia diseño didáctico.', efecto: { confianza: 7, tension: -4 } },
            { icono: '📖', t: 'Mostrar el texto que vas a dictar', p: 0, fb: 'El dictado como eje de la clase es un método transmisivo.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Experiencia concreta inicial', claves: ['experiencia', 'observar', 'plantas', 'patio', 'entorno', 'explorar', 'saberes previos'] },
            { n: 'Secuencia del método', claves: ['erca', 'reflexion', 'conceptualiz', 'aplicacion', 'fases', 'momentos', 'secuencia'] },
            { n: 'Estudiante protagonista', claves: ['participa', 'activo', 'protagonista', 'descubr', 'pregunt', 'construy'] }
          ],
          evitar: [ { claves: ['dictar', 'copien', 'memoricen'], fb: 'La memorización y la copia no responden a una didáctica activa.' } ],
          modelo: 'Iniciaré con una experiencia: observarán plantas del patio. Luego reflexionamos con preguntas, conceptualizamos qué es un ser vivo y lo aplican clasificando ejemplos del entorno.'
        },
        {
          acciones: [
            { icono: '🔄', t: 'Explicar los roles rotativos de cada grupo', p: 2, fb: 'Los roles garantizan la participación de todos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🪜', t: 'Mostrar fichas con tres niveles de dificultad', p: 2, fb: 'La tarea graduada responde a distintos ritmos.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🏠', t: 'Proponer que los lentos terminen en casa', p: 0, fb: 'Desplaza la responsabilidad pedagógica al hogar.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Grupos heterogéneos con roles', claves: ['grupo', 'equipo', 'roles', 'heterogene', 'secretario', 'coordinador', 'rotativ'] },
            { n: 'Atención a ritmos y necesidades', claves: ['ritmo', 'necesidad', 'gradu', 'nivel', 'apoyo', 'diferenci', 'inclus'] },
            { n: 'Competencias transversales', claves: ['colabor', 'colabora', 'pensamiento critico', 'resolver problemas', 'resolucion de problemas', 'cooper', 'ayuda mutua'] }
          ],
          evitar: [ { claves: ['los lentos', 'que se queden atras'], fb: 'Etiquetar a los estudiantes vulnera el enfoque inclusivo.' } ],
          modelo: 'Formaré grupos heterogéneos de cuatro con roles rotativos. Cada grupo tendrá una tarea graduada y yo acompañaré más a quienes necesitan apoyo, para que colaboren y resuelvan problemas juntos.'
        },
        {
          acciones: [
            { icono: '🗣️', t: 'Organizar una puesta en común por grupos', p: 2, fb: 'Socializar consolida el aprendizaje.', efecto: { confianza: 7, tension: -5 } },
            { icono: '💬', t: 'Anotar retroalimentación específica para cada grupo', p: 2, fb: 'La retroalimentación descriptiva orienta la mejora.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📝', t: 'Aplicar solo una prueba escrita final', p: 1, fb: 'Aporta datos, pero no retroalimenta en el momento.', efecto: { confianza: 1, tension: 0 } },
            { icono: '🔔', t: 'Terminar cuando suene el timbre', p: 0, fb: 'Sin cierre no se consolida lo aprendido.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Cierre y socialización', claves: ['cierre', 'puesta en comun', 'socializ', 'conclusion', 'resumen', 'compartir'] },
            { n: 'Retroalimentación formativa', claves: ['retroaliment', 'feedback', 'que hicieron bien', 'mejorar', 'sugerencia', 'formativ'] },
            { n: 'Dimensión socioemocional', claves: ['emocion', 'como se sintieron', 'convivencia', 'respeto', 'trabajo en equipo', 'escuchar'] }
          ],
          evitar: [ { claves: ['no hay tiempo para cerrar', 'deber largo'], fb: 'El cierre es parte esencial de la clase.' } ],
          modelo: 'Cerraré con una puesta en común: cada grupo comparte su clasificación, les doy retroalimentación sobre qué hicieron bien y qué mejorar, y reflexionamos cómo se sintieron trabajando en equipo.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-306', cod: 'SPRL-306',
    titulo: 'Unidad didáctica con adaptación para Samanta',
    asignaturas: ['SPRL-306'],
    persona: { nombre: 'Psic. Andrea Vargas', rol: 'Profesional del DECE', avatar: '👩🏻‍💼', pitch: 1.1 },
    contexto: 'Planificas una unidad didáctica de Lengua para 5.º EGB en Puyo. Samanta tiene un informe de dislexia y el DECE te pide integrar la adaptación curricular en tu planificación.',
    objetivo: 'Diseñar una unidad didáctica alineada al currículo nacional con adaptación curricular y evaluación formativa y sumativa.',
    pasos: [
      { dice: '¿De dónde partes para planificar tu unidad?', opciones: [
          { t: 'De las destrezas con criterio de desempeño y los criterios de evaluación del currículo nacional, más el diagnóstico del grupo.', p: 2, r: 'Correcto, así la unidad está alineada.', fb: 'La planificación microcurricular se deriva del currículo nacional, el PCI y el diagnóstico de los estudiantes.' },
          { t: 'Del índice del texto escolar.', p: 1, r: 'El texto es un recurso, no el punto de partida.', fb: 'El texto apoya, pero las destrezas y criterios del currículo orientan la planificación.' },
          { t: 'De las actividades que me gustan.', p: 0, r: 'Eso no garantiza aprendizajes.', fb: 'Sin referentes curriculares, la planificación pierde coherencia.' } ] },
      { dice: 'Samanta lee despacio y confunde letras. ¿Qué adaptación harías?', opciones: [
          { t: 'Una adaptación no significativa: mismas destrezas, pero con más tiempo, textos ampliados, apoyo visual y evaluación oral.', p: 2, r: 'Exacto, se ajusta la metodología y la evaluación sin bajar objetivos.', fb: 'En dificultades específicas de aprendizaje se ajustan metodología, recursos y evaluación manteniendo las destrezas.' },
          { t: 'Sentarla adelante y ayudarla cuando lo pida.', p: 1, r: 'Es un apoyo de acceso, pero insuficiente.', fb: 'La ubicación ayuda, pero debe planificarse un ajuste metodológico y evaluativo documentado.' },
          { t: 'Eliminarle las destrezas de lectura.', p: 0, r: 'Eso la excluiría del aprendizaje.', fb: 'Reducir objetivos sin fundamento vulnera su derecho a aprender.' } ] },
      { dice: '¿Cómo evaluarás la unidad y cómo la conectas con otras áreas?', opciones: [
          { t: 'Con evaluación formativa continua (listas de cotejo, rúbricas) y un producto final interdisciplinario: un cuento ilustrado sobre la chakra amazónica con apoyo digital.', p: 2, r: 'Muy bien, integras áreas y habilidades digitales.', fb: 'La evaluación formativa y sumativa con proyectos integradores articula contenidos, habilidades socioemocionales y digitales.' },
          { t: 'Con una prueba sumativa al final de la unidad.', p: 1, r: 'Te falta seguimiento durante el proceso.', fb: 'La sumativa certifica, pero sin evaluación formativa no se ajusta la enseñanza a tiempo.' },
          { t: 'Con una prueba igual para todos, sin adaptaciones.', p: 0, r: 'Eso contradice la adaptación planificada.', fb: 'La evaluación debe ser coherente con las adaptaciones curriculares.' } ] }
    ],
    vivo: {
      lugar: 'Oficina del DECE de una unidad educativa de Puyo', fondo: 'oficina',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '📘', t: 'Abrir el currículo nacional del subnivel medio', p: 2, fb: 'Es el referente obligatorio de la planificación.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📊', t: 'Revisar el diagnóstico del grupo', p: 2, fb: 'Las necesidades reales del grupo orientan la planificación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📚', t: 'Copiar el índice del texto escolar', p: 0, fb: 'El texto no reemplaza los referentes curriculares.', efecto: { confianza: -8, tension: 5 } }
          ],
          conceptos: [
            { n: 'Currículo nacional', claves: ['curriculo', 'nacional', 'estandar', 'pci', 'ministerio'] },
            { n: 'Destrezas y criterios', claves: ['destreza', 'criterio de desempeno', 'criterios de evaluacion', 'indicador', 'objetivo'] },
            { n: 'Diagnóstico del grupo', claves: ['diagnostic', 'necesidad', 'contexto', 'grupo', 'conocimientos previos', 'caracteristicas'] }
          ],
          evitar: [ { claves: ['lo que me guste', 'siguiendo el libro nada mas'], fb: 'La planificación debe tener sustento curricular.' } ],
          modelo: 'Parto de las destrezas con criterio de desempeño y los criterios de evaluación del currículo nacional, y del diagnóstico del grupo para saber sus necesidades.'
        },
        {
          acciones: [
            { icono: '⏱️', t: 'Registrar tiempo adicional en las actividades', p: 2, fb: 'Es un ajuste metodológico pertinente para dislexia.', efecto: { confianza: 7, tension: -5 } },
            { icono: '🔠', t: 'Preparar textos con letra ampliada y pictogramas', p: 2, fb: 'Los apoyos visuales facilitan la decodificación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🪑', t: 'Ubicarla solo en el primer asiento', p: 1, fb: 'Ayuda al acceso, pero no basta.', efecto: { confianza: 2, tension: 0 } },
            { icono: '✂️', t: 'Borrar las destrezas de lectura de su plan', p: 0, fb: 'Reducir objetivos sin justificación la excluye.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Tipo de adaptación', claves: ['adaptacion', 'no significativa', 'grado', 'curricular', 'ajuste'] },
            { n: 'Ajustes metodológicos concretos', claves: ['tiempo', 'ampliad', 'visual', 'pictogram', 'lectura guiada', 'audio', 'tutor'] },
            { n: 'Evaluación adaptada', claves: ['evaluacion oral', 'oral', 'adaptar la evaluacion', 'instrumento', 'menos items', 'apoyo en la evaluacion'] }
          ],
          evitar: [ { claves: ['no puede aprender', 'que la exoneren'], fb: 'Las expectativas bajas vulneran el derecho a una educación inclusiva.' } ],
          modelo: 'Haré una adaptación curricular no significativa: mantengo las destrezas, le doy más tiempo, textos ampliados con apoyo visual y la evalúo de forma oral.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Diseñar una lista de cotejo para el proceso', p: 2, fb: 'Permite evaluación formativa continua.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🌿', t: 'Proponer el cuento ilustrado sobre la chakra', p: 2, fb: 'Es un proyecto integrador con identidad local.', efecto: { confianza: 8, tension: -5 } },
            { icono: '💻', t: 'Incluir grabación de audio del cuento en tablet', p: 1, fb: 'Integra habilidades digitales si se planifica con propósito.', efecto: { confianza: 3, tension: 0 } },
            { icono: '🧾', t: 'Usar solo una prueba igual para todos', p: 0, fb: 'Contradice la adaptación planificada.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Evaluación formativa', claves: ['formativ', 'proceso', 'lista de cotejo', 'rubrica', 'seguimiento', 'retroaliment'] },
            { n: 'Evaluación sumativa', claves: ['sumativ', 'producto final', 'cierre de unidad', 'calificacion', 'final'] },
            { n: 'Integración interdisciplinaria', claves: ['interdisciplin', 'proyecto integrador', 'ciencias', 'chakra', 'digital', 'otras areas', 'integrar'] }
          ],
          evitar: [ { claves: ['misma prueba para todos'], fb: 'La evaluación debe respetar las adaptaciones.' } ],
          modelo: 'Evaluaré de forma formativa con listas de cotejo y una rúbrica, y como producto sumativo harán un cuento ilustrado sobre la chakra que integra Ciencias, Lengua y herramientas digitales.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-307', cod: 'SPRL-307',
    titulo: 'Material de valor posicional con balsa',
    asignaturas: ['SPRL-307'],
    persona: { nombre: 'Don Segundo Aguinda', rol: 'Padre de familia y artesano de balsa', avatar: '👨🏽‍🔧', pitch: 0.9 },
    contexto: 'Don Segundo ofrece retazos de madera de balsa para que hagas material didáctico para 2.º EGB. Debes explicarle qué material harás, cómo lo diseñarás y cómo sabrás si funciona.',
    objetivo: 'Seleccionar, diseñar y evaluar material didáctico manipulativo adecuado al nivel.',
    pasos: [
      { dice: 'Profe, tengo bastante balsa. ¿Para qué le sirve eso a los guaguas?', opciones: [
          { t: 'Para hacer material manipulativo de unidades, decenas y centenas: tocar y agrupar les ayuda a entender el valor posicional.', p: 2, r: '¡Ah, como armar atados de diez!', fb: 'El material manipulativo concreta conceptos abstractos y es clave en los primeros años de EGB.' },
          { t: 'Para decorar el aula y que se vea bonita.', p: 1, r: 'Bueno, pero yo pensé que era para aprender.', fb: 'Lo estético ambienta, pero el material didáctico debe tener intención pedagógica.' },
          { t: 'La verdad, para nada; ahora todo es con videos.', p: 0, r: 'Ah... entonces me la llevo.', fb: 'Desestimar lo concreto ignora la importancia de los distintos tipos de material.' } ] },
      { dice: '¿Y cómo quiere que se las corte?', opciones: [
          { t: 'Cubitos de 2 cm para unidades, barras de 10 cubos para decenas y placas de 10 barras para centenas, lijados y sin puntas.', p: 2, r: 'Fácil, y bien lijados para que no se astillen.', fb: 'El diseño debe ser proporcional al concepto, seguro, durable y del tamaño adecuado para manos pequeñas.' },
          { t: 'De cualquier tamaño, igual sirven.', p: 1, r: 'Mmm, ¿y cómo van a contar?', fb: 'Sin proporción, el material no representa la relación de base diez.' },
          { t: 'Palitos finos con punta para que se vean como lápices.', p: 0, r: 'Eso puede lastimar a los niños.', fb: 'La seguridad es criterio básico del diseño de material infantil.' } ] },
      { dice: '¿Y cómo va a saber si de verdad les sirvió?', opciones: [
          { t: 'Observaré si representan números correctamente, anotaré dificultades y ajustaré el material o las consignas.', p: 2, r: 'Así me cuenta si hago más.', fb: 'La evaluación y mejora del material se basa en la observación de su uso y en evidencias de aprendizaje.' },
          { t: 'Si los niños se divierten, ya sirvió.', p: 1, r: 'Divertirse es bueno, ¿y aprenden?', fb: 'La motivación es un indicador, pero no basta para valorar su eficacia pedagógica.' },
          { t: 'Lo guardo en el armario para que no se dañe.', p: 0, r: 'Entonces no se usa...', fb: 'Un material que no se implementa no cumple su función.' } ] }
    ],
    vivo: {
      lugar: 'Patio de una escuela de la parroquia Tarqui, Pastaza', fondo: 'exterior',
      inicio: { confianza: 55, tension: 30 },
      pasos: [
        {
          acciones: [
            { icono: '🪵', t: 'Recibir los retazos y agradecer el aporte', p: 2, fb: 'Valorar el aporte de la familia fortalece la alianza escuela-comunidad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧮', t: 'Mostrarle un ábaco para explicar la idea', p: 2, fb: 'Un ejemplo concreto facilita la comprensión del propósito.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🙄', t: 'Decirle que mejor done una tablet', p: 0, fb: 'Desvaloriza el aporte y el material concreto.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Tipo de material', claves: ['manipulativ', 'concreto', 'tocar', 'material didactico', 'manipular'] },
            { n: 'Propósito pedagógico', claves: ['valor posicional', 'unidades', 'decenas', 'centenas', 'agrupar', 'contar'] },
            { n: 'Importancia en el aprendizaje', claves: ['compren', 'entender', 'comprender', 'aprend', 'abstracto', 'ayuda'] }
          ],
          evitar: [ { claves: ['no sirve', 'solo para decorar'], fb: 'El material debe tener intención pedagógica.' } ],
          modelo: 'Gracias, don Segundo. Con la balsa haré material manipulativo de unidades, decenas y centenas; al tocar y agrupar, los niños comprenden el valor posicional.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Medir y marcar un cubito de 2 cm', p: 2, fb: 'La medida uniforme da proporcionalidad.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧽', t: 'Pedir que lije bordes y esquinas', p: 2, fb: 'La seguridad es prioritaria en material infantil.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎨', t: 'Proponer pintar cada tipo de pieza de un color', p: 1, fb: 'El color ayuda a diferenciar, aunque no debe sustituir la proporción.', efecto: { confianza: 3, tension: 0 } },
            { icono: '🔪', t: 'Pedir palitos con punta afilada', p: 0, fb: 'Representa riesgo para los niños.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Proporción base diez', claves: ['diez', '10', 'barra', 'placa', 'cubo', 'proporcion'] },
            { n: 'Seguridad del material', claves: ['lij', 'sin puntas', 'seguro', 'astill', 'sin filos', 'no lastime'] },
            { n: 'Adecuado a la edad', claves: ['tamano', 'manos', 'edad', 'pequen', 'facil de manipular', 'resistente'] }
          ],
          evitar: [ { claves: ['cualquier tamano', 'con punta'], fb: 'El diseño debe ser preciso y seguro.' } ],
          modelo: 'Necesito cubitos de 2 centímetros, barras de 10 cubos y placas de 10 barras, bien lijados y sin puntas, de un tamaño fácil de manipular para niños de siete años.'
        },
        {
          acciones: [
            { icono: '👀', t: 'Planificar una observación del uso en clase', p: 2, fb: 'La observación aporta evidencia sobre la eficacia del material.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🗒️', t: 'Preparar una lista de cotejo de representación', p: 2, fb: 'Permite registrar si el material logra el aprendizaje.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🗄️', t: 'Guardar el material bajo llave', p: 0, fb: 'El material debe usarse para cumplir su función.', efecto: { confianza: -8, tension: 5 } }
          ],
          conceptos: [
            { n: 'Observar el uso', claves: ['observ', 'mirar como', 'usar', 'en clase', 'registr'] },
            { n: 'Evidencia de aprendizaje', claves: ['representan', 'aprend', 'lista de cotejo', 'evidencia', 'logran', 'numeros'] },
            { n: 'Mejora del material', claves: ['ajust', 'mejor', 'cambiar', 'corregir', 'redisen', 'modific'] }
          ],
          evitar: [ { claves: ['si se divierten ya esta'], fb: 'La diversión no basta como criterio de evaluación.' } ],
          modelo: 'Observaré en clase si los niños representan bien los números, lo registraré en una lista de cotejo y, si hay dificultades, ajustaremos el material o las consignas.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-309', cod: 'SPRL-309',
    titulo: 'Plátanos en fundas y fracciones de chicha',
    asignaturas: ['SPRL-309'],
    persona: { nombre: 'Ana', rol: 'Estudiante de 5.º EGB', avatar: '👧🏽', pitch: 1.3 },
    contexto: 'Ana ayuda a su mamá en el mercado de Puyo y te trae dos problemas reales. Debes guiar la resolución con estrategia, dar el resultado y corregir un error con fracciones.',
    objetivo: 'Enseñar resolución de problemas y razonamiento matemático con estrategias y recursos didácticos.',
    pasos: [
      { dice: 'Profe, no entiendo este problema: "Mi mamá tiene 3 racimos de 24 plátanos y los pone en fundas de 8. ¿Cuántas fundas llena?"', opciones: [
          { t: 'Le pido que me cuente con sus palabras qué datos tiene y qué le preguntan, y que haga un dibujo.', p: 2, r: 'Tengo 3 racimos de 24... y me piden fundas.', fb: 'La primera fase de resolución de problemas (Pólya) es comprender: identificar datos, pregunta y representar.' },
          { t: 'Le digo que es un problema de división.', p: 1, r: '¿Divido 24 para 8?', fb: 'Nombrar la operación sin comprender el problema lleva a errores.' },
          { t: 'Le doy la respuesta para que avance.', p: 0, r: 'Ya, ¿y el siguiente?', fb: 'Dar la respuesta impide desarrollar el razonamiento.' } ] },
      { dice: '¿Entonces cuántas fundas son?', opciones: [
          { t: 'Primero 3 × 24 = 72 plátanos; luego 72 ÷ 8 = 9. Llena 9 fundas; comprobamos: 9 × 8 = 72.', p: 2, r: '¡Nueve fundas! Y sí da 72.', fb: 'Un plan en dos pasos con comprobación desarrolla el pensamiento matemático y la verificación.' },
          { t: 'Son 9 fundas.', p: 1, r: '¿Y cómo sale eso?', fb: 'El resultado es correcto, pero sin procedimiento no se aprende la estrategia.' },
          { t: '24 ÷ 8 = 3 fundas.', p: 0, r: 'Pero eran tres racimos...', fb: 'Omite un dato del problema; el resultado es incorrecto.' } ] },
      { dice: 'Y otra: mi mamá vendió 1/2 jarra de chicha y luego 1/4. Yo sumé y me salió 2/6.', opciones: [
          { t: 'Uso tiras de fracciones: 1/2 equivale a 2/4; 2/4 + 1/4 = 3/4. Para sumar, los denominadores deben ser iguales.', p: 2, r: '¡Ah, tres cuartos de jarra!', fb: 'Los recursos concretos y la equivalencia corrigen el error frecuente de sumar numeradores y denominadores.' },
          { t: 'Le digo que está mal, que es 3/4.', p: 1, r: '¿Pero por qué?', fb: 'Corregir sin explicar no modifica la concepción errónea.' },
          { t: 'Le digo que las fracciones son difíciles y que lo veremos en séptimo.', p: 0, r: 'Ah, entonces no soy buena para eso.', fb: 'Postergar y transmitir dificultad genera actitudes negativas hacia la matemática.' } ] }
    ],
    vivo: {
      lugar: 'Aula de 5.º EGB con rincón de matemática, Puyo', fondo: 'aula',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🍌', t: 'Dibujar los tres racimos en la pizarra', p: 2, fb: 'Representar gráficamente ayuda a comprender el problema.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🖊️', t: 'Pedirle que subraye datos y pregunta', p: 2, fb: 'Identificar datos es parte de comprender el problema.', efecto: { confianza: 6, tension: -4 } },
            { icono: '➗', t: 'Escribir directamente la división', p: 1, fb: 'Anticipa la operación sin que ella razone.', efecto: { confianza: 1, tension: 0 } },
            { icono: '🤐', t: 'Decirle que lo resuelva sola sin ayuda', p: 0, fb: 'Abandonarla aumenta la frustración.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Comprender el problema', claves: ['que te piden', 'pregunta', 'comprender', 'con tus palabras', 'entender', 'leer'] },
            { n: 'Identificar datos', claves: ['datos', 'tres racimos', '3 racimos', 'veinticuatro', '24', 'ocho', '8'] },
            { n: 'Representar', claves: ['dibuj', 'grafic', 'represent', 'esquema', 'material'] }
          ],
          evitar: [ { claves: ['es facil', 'la respuesta es'], fb: 'Minimizar o dar la respuesta impide razonar.' } ],
          modelo: 'Ana, dime con tus palabras qué te piden. Tus datos son 3 racimos de 24 plátanos y fundas de 8. Dibujemos los racimos para entenderlo mejor.'
        },
        {
          acciones: [
            { icono: '✖️', t: 'Calcular primero el total de plátanos', p: 2, fb: 'Planificar en pasos organiza el razonamiento.', efecto: { confianza: 7, tension: -5 } },
            { icono: '🔁', t: 'Comprobar multiplicando el resultado', p: 2, fb: 'La verificación es la última fase de Pólya.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎲', t: 'Adivinar un número de fundas', p: 0, fb: 'Adivinar no es una estrategia matemática.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Total de plátanos', claves: ['setenta y dos', '72', 'tres por veinticuatro', 'multiplic', 'total'] },
            { n: 'Resultado: 9 fundas', claves: ['nueve', '9', 'nueve fundas', '9 fundas', 'divid'] },
            { n: 'Comprobación', claves: ['comprob', 'verific', 'nueve por ocho', 'revis', 'da setenta y dos'] }
          ],
          evitar: [ { claves: ['tres fundas'], fb: 'Omite que eran tres racimos.' } ],
          modelo: 'Primero multiplicamos 3 por 24 y son 72 plátanos. Luego dividimos 72 para 8 y salen 9 fundas. Comprobamos: 9 por 8 da 72.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Sacar las tiras de fracciones del rincón', p: 2, fb: 'El material concreto evidencia la equivalencia.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🍶', t: 'Dibujar una jarra dividida en cuartos', p: 2, fb: 'Un modelo de área contextualizado facilita la comprensión.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🚫', t: 'Tachar su respuesta sin explicar', p: 0, fb: 'No corrige la concepción errónea.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Fracciones equivalentes', claves: ['equivalent', 'dos cuartos', 'un medio', 'mitad', 'igual a'] },
            { n: 'Mismo denominador', claves: ['denominador', 'mismo', 'iguales', 'partes iguales', 'cuartos'] },
            { n: 'Resultado: tres cuartos', claves: ['tres cuartos', '3/4', '3 cuartos', 'tres de cuatro', 'cuartos de jarra'] }
          ],
          evitar: [ { claves: ['dos sextos', 'no eres buena'], fb: 'Validar el error o desmotivar perjudica el aprendizaje.' } ],
          modelo: 'Mira con las tiras: un medio es igual a dos cuartos. Para sumar necesitamos el mismo denominador: dos cuartos más un cuarto son tres cuartos de jarra.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-405', cod: 'SPRL-405',
    titulo: 'Reclamo por una nota de 6',
    asignaturas: ['SPRL-405'],
    persona: { nombre: 'Sra. Marlene Shiguango', rol: 'Madre de familia de 7.º EGB', avatar: '👩🏽', pitch: 1.0 },
    contexto: 'La madre de Jefferson llega molesta porque su hijo sacó 6/10 en Ciencias Naturales. Debes explicar con evidencias cómo evaluaste y qué harán para mejorar.',
    objetivo: 'Explicar criterios, instrumentos, tipos de evaluación y uso de resultados para la mejora.',
    pasos: [
      { dice: '¡Mi hijo estudió y le pusieron 6! ¿Cómo califica usted?', opciones: [
          { t: 'Le muestro la rúbrica con los criterios y el trabajo de Jefferson, explicando en qué indicadores logró y en cuáles no.', p: 2, r: 'Ah... no sabía que había una rúbrica.', fb: 'La transparencia de criterios e instrumentos de evaluación sustenta la calificación y genera confianza.' },
          { t: 'Le digo que la nota está bien puesta y que confíe en mí.', p: 1, r: 'Pero yo quiero entender.', fb: 'La familia tiene derecho a conocer cómo se evalúa a su hijo.' },
          { t: 'Le digo que su hijo no estudia lo suficiente.', p: 0, r: '¡Usted no lo conoce!', fb: 'Juzgar sin evidencias escala el conflicto.' } ] },
      { dice: '¿Y esa sola prueba define todo?', opciones: [
          { t: 'No: hice una evaluación diagnóstica al inicio, formativas durante el proceso (incluida autoevaluación y coevaluación) y esta sumativa; la nota se integra con todas.', p: 2, r: 'Entonces hay más oportunidades.', fb: 'La evaluación es continua y combina diagnóstica, formativa y sumativa con distintos agentes evaluadores.' },
          { t: 'Sí, pero puede mejorar en la próxima prueba.', p: 1, r: '¿Y si vuelve a salir mal?', fb: 'Reduce la evaluación a pruebas y no muestra su carácter continuo.' },
          { t: 'Sí, así es el sistema.', p: 0, r: 'Eso no es justo.', fb: 'Desconoce los propósitos formativos de la evaluación.' } ] },
      { dice: '¿Y qué va a hacer para que mi hijo mejore?', opciones: [
          { t: 'Según la escala, 6 indica que está próximo a alcanzar los aprendizajes; planifico refuerzo académico en los indicadores débiles y acordamos apoyo en casa.', p: 2, r: 'Bueno, así sí puedo ayudarle.', fb: 'Los resultados de evaluación sirven para tomar decisiones pedagógicas como el refuerzo académico.' },
          { t: 'Le daré más deberes.', p: 1, r: '¿Más de lo mismo?', fb: 'La cantidad de tareas no reemplaza un refuerzo focalizado.' },
          { t: 'Eso depende de él.', p: 0, r: 'Usted es la docente.', fb: 'El docente es responsable de usar la evaluación para mejorar el aprendizaje.' } ] }
    ],
    vivo: {
      lugar: 'Aula de 7.º EGB en horario de atención a familias, Puyo', fondo: 'aula',
      inicio: { confianza: 30, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '🪑', t: 'Invitarla a sentarse y escucharla', p: 2, fb: 'Escuchar primero baja la tensión.', efecto: { confianza: 8, tension: -8 } },
            { icono: '📑', t: 'Mostrar la rúbrica y el trabajo de Jefferson', p: 2, fb: 'La evidencia explica la calificación de forma objetiva.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🙅‍♀️', t: 'Negarse a mostrar el instrumento', p: 0, fb: 'Ocultar criterios genera desconfianza.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Criterios de evaluación', claves: ['criterio', 'indicador', 'estandar', 'desempeno', 'lo que se esperaba'] },
            { n: 'Instrumento', claves: ['rubrica', 'lista de cotejo', 'instrumento', 'prueba', 'escala'] },
            { n: 'Evidencia del estudiante', claves: ['trabajo', 'evidencia', 'logro', 'respuestas', 'aqui puede ver', 'mire'] }
          ],
          evitar: [ { claves: ['no estudia', 'es vago'], fb: 'Etiquetar al estudiante no explica la nota.' } ],
          modelo: 'Gracias por venir, señora Marlene. Aquí tiene la rúbrica con los criterios y el trabajo de Jefferson: logró los indicadores de clasificación, pero no los de explicación del proceso.'
        },
        {
          acciones: [
            { icono: '📈', t: 'Mostrar el registro de evaluaciones formativas', p: 2, fb: 'Evidencia que la evaluación es continua.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🪞', t: 'Enseñar la autoevaluación que hizo Jefferson', p: 2, fb: 'Muestra la participación del estudiante en su evaluación.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🤷', t: 'Decir que solo cuenta la prueba final', p: 0, fb: 'Desconoce la evaluación formativa.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Evaluación diagnóstica', claves: ['diagnostic', 'al inicio', 'conocimientos previos', 'punto de partida', 'inicial'] },
            { n: 'Evaluación formativa', claves: ['formativ', 'durante', 'proceso', 'continua', 'retroaliment'] },
            { n: 'Agentes de evaluación', claves: ['autoevalu', 'coevalu', 'heteroevalu', 'companeros', 'el mismo'] }
          ],
          evitar: [ { claves: ['solo vale la prueba'], fb: 'La evaluación no se reduce a una prueba.' } ],
          modelo: 'No es una sola prueba: hubo una evaluación diagnóstica al inicio, evaluaciones formativas durante el proceso con autoevaluación y coevaluación, y esta sumativa.'
        },
        {
          acciones: [
            { icono: '🗓️', t: 'Agendar sesiones de refuerzo académico', p: 2, fb: 'El refuerzo focalizado usa los resultados para mejorar.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🤝', t: 'Acordar con la madre un apoyo en casa', p: 2, fb: 'La corresponsabilidad familia-escuela potencia la mejora.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📚', t: 'Enviar el doble de deberes', p: 1, fb: 'Más tareas no garantizan mejora focalizada.', efecto: { confianza: 0, tension: 3 } },
            { icono: '👋', t: 'Despedirla diciendo que depende de su hijo', p: 0, fb: 'Evade la responsabilidad docente.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Interpretación de la escala', claves: ['proximo a alcanzar', 'escala', 'alcanza', 'aprendizajes requeridos', 'seis'] },
            { n: 'Refuerzo académico', claves: ['refuerzo', 'tutoria', 'plan de mejora', 'recuperacion', 'reforzar'] },
            { n: 'Compromiso con la familia', claves: ['en casa', 'acuerdo', 'compromiso', 'juntos', 'seguimiento', 'apoyo'] }
          ],
          evitar: [ { claves: ['depende de el', 'no es mi problema'], fb: 'La mejora del aprendizaje es corresponsabilidad docente.' } ],
          modelo: 'Un 6 en la escala indica que está próximo a alcanzar los aprendizajes. Le daré refuerzo académico en esos indicadores y acordemos cómo apoyarlo en casa para hacer seguimiento juntos.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-406', cod: 'SPRL-406',
    titulo: 'Un padre exige sacar a un niño con autismo',
    asignaturas: ['SPRL-406'],
    persona: { nombre: 'Sr. Fausto Villacís', rol: 'Padre de familia de 3.º EGB', avatar: '👨🏻', pitch: 0.85 },
    contexto: 'Un padre exige que retires del aula a Josué, un compañero con trastorno del espectro autista, y te pide ver sus informes. Debes actuar conforme a la normativa, con ética y siguiendo la ruta institucional.',
    objetivo: 'Aplicar derechos, inclusión y equidad, confidencialidad y responsabilidad legal en la práctica docente.',
    pasos: [
      { dice: 'Ese niño distrae a mi hija. Sáquelo del grado o me quejo al distrito.', opciones: [
          { t: 'Le explico con respeto que Josué tiene derecho a una educación inclusiva según la Constitución y la LOEI, y que trabajamos con apoyos para todo el grupo.', p: 2, r: 'Bueno... no sabía que era un derecho.', fb: 'La normativa ecuatoriana garantiza la educación inclusiva; ningún estudiante puede ser excluido por su condición.' },
          { t: 'Le digo que lo voy a pensar con la directora.', p: 1, r: 'Espero que lo saquen.', fb: 'Derivar es válido, pero sin aclarar el derecho se generan falsas expectativas.' },
          { t: 'Le digo que tiene razón y que pediré cambiarlo de paralelo.', p: 0, r: 'Así me gusta.', fb: 'Ceder a la exclusión es discriminatorio y contrario a la ley.' } ] },
      { dice: 'Muéstreme el informe médico del niño. Tengo derecho a saber.', opciones: [
          { t: 'Le explico que la información de cada estudiante es confidencial y que solo puedo hablarle del proceso de su hija.', p: 2, r: 'Está bien, entiendo.', fb: 'La protección de datos personales de niñas, niños y adolescentes es obligación ética y legal del docente.' },
          { t: 'Le cuento en general lo que tiene Josué, sin mostrar el informe.', p: 1, r: 'Ah, ya veo.', fb: 'Aun verbalmente, divulgar el diagnóstico vulnera la confidencialidad.' },
          { t: 'Le muestro el expediente para que se tranquilice.', p: 0, r: 'Voy a contarles a los demás padres.', fb: 'Divulgar el expediente genera responsabilidad legal y expone al niño.' } ] },
      { dice: 'Igual voy a hacer algo. Mi hija no puede aprender así.', opciones: [
          { t: 'Le propongo una reunión con la directora y el DECE, registro lo conversado en un acta y le explico cómo apoyamos también a su hija.', p: 2, r: 'Está bien, asistiré a la reunión.', fb: 'Seguir la ruta institucional y documentar previene conflictos legales y garantiza los derechos de todos.' },
          { t: 'Le digo que haga la queja si quiere.', p: 1, r: 'Eso haré.', fb: 'Informa su derecho a reclamar, pero no gestiona el conflicto.' },
          { t: 'Le pido que no vuelva a la escuela.', p: 0, r: '¡Me está prohibiendo la entrada!', fb: 'Impedir la participación de la familia es contrario a la normativa y a la ética.' } ] }
    ],
    vivo: {
      lugar: 'Puerta del aula de 3.º EGB a la salida, Puyo', fondo: 'aula',
      inicio: { confianza: 25, tension: 80 },
      pasos: [
        {
          acciones: [
            { icono: '🖐️', t: 'Mantener la calma y escucharlo sin interrumpir', p: 2, fb: 'Escuchar reduce la tensión y permite dialogar.', efecto: { confianza: 8, tension: -10 } },
            { icono: '⚖️', t: 'Explicar el derecho a la educación inclusiva', p: 2, fb: 'Fundamenta la decisión en la normativa.', efecto: { confianza: 6, tension: -5 } },
            { icono: '🔀', t: 'Prometer cambiar de paralelo a Josué', p: 0, fb: 'Es una medida discriminatoria.', efecto: { confianza: 4, tension: 5 } },
            { icono: '😠', t: 'Responderle con el mismo tono', p: 0, fb: 'Escala el conflicto.', efecto: { confianza: -12, tension: 15 } }
          ],
          conceptos: [
            { n: 'Derecho a la educación', claves: ['derecho', 'educacion', 'todos los ninos', 'garantiza', 'no se puede excluir'] },
            { n: 'Marco legal', claves: ['constitucion', 'loei', 'ley', 'normativa', 'codigo de la ninez'] },
            { n: 'Inclusión y equidad', claves: ['inclus', 'equidad', 'diversidad', 'apoyos', 'no discrimin', 'igualdad'] }
          ],
          evitar: [ { claves: ['lo voy a sacar', 'tiene razon'], fb: 'Aceptar la exclusión vulnera derechos.' } ],
          modelo: 'Entiendo su preocupación, señor Villacís. Pero según la Constitución y la LOEI, todos los niños tienen derecho a una educación inclusiva y no se puede excluir a Josué; trabajamos con apoyos para todo el grupo.'
        },
        {
          acciones: [
            { icono: '🔒', t: 'Mantener cerrado el expediente de Josué', p: 2, fb: 'Protege los datos personales del estudiante.', efecto: { confianza: 4, tension: -3 } },
            { icono: '📓', t: 'Ofrecer información sobre el avance de su hija', p: 2, fb: 'Atiende su derecho legítimo a saber de su hija.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📂', t: 'Mostrarle el informe médico de Josué', p: 0, fb: 'Vulnera la confidencialidad y genera responsabilidad legal.', efecto: { confianza: 2, tension: 10 } }
          ],
          conceptos: [
            { n: 'Confidencialidad', claves: ['confidencial', 'privad', 'reservad', 'datos personales', 'no puedo compartir'] },
            { n: 'Protección del estudiante', claves: ['proteg', 'interes superior', 'dignidad', 'respeto', 'intimidad'] },
            { n: 'Información sobre su hija', claves: ['su hija', 'avance', 'proceso', 'puedo informarle', 'rendimiento'] }
          ],
          evitar: [ { claves: ['le cuento lo que tiene', 'mire el informe'], fb: 'Divulgar el diagnóstico de otro niño es ilegal y antiético.' } ],
          modelo: 'La información de cada estudiante es confidencial y debo protegerla. Con gusto puedo informarle sobre el avance y el proceso de su hija.'
        },
        {
          acciones: [
            { icono: '📅', t: 'Agendar reunión con directora y DECE', p: 2, fb: 'Sigue la ruta institucional.', efecto: { confianza: 8, tension: -8 } },
            { icono: '🖋️', t: 'Registrar lo conversado en un acta', p: 2, fb: 'La documentación respalda legalmente la actuación.', efecto: { confianza: 5, tension: -4 } },
            { icono: '⛔', t: 'Prohibirle volver a la escuela', p: 0, fb: 'Es arbitrario y contrario a la participación familiar.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Ruta institucional', claves: ['directora', 'dece', 'autoridad', 'reunion', 'ruta', 'rector'] },
            { n: 'Documentar', claves: ['acta', 'registr', 'por escrito', 'firmar', 'document'] },
            { n: 'Apoyo a todos los estudiantes', claves: ['su hija', 'estrategias', 'todos', 'aprendizaje', 'convivencia', 'acompan'] }
          ],
          evitar: [ { claves: ['no vuelva', 'haga lo que quiera'], fb: 'Evadir o prohibir no resuelve el conflicto.' } ],
          modelo: 'Le propongo una reunión con la directora y el DECE; dejaré registro en un acta. Allí también acordaremos estrategias para apoyar el aprendizaje de su hija y la convivencia de todos.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-407', cod: 'SPRL-407',
    titulo: 'Mapa táctil de Pastaza para Nayeli',
    asignaturas: ['SPRL-407'],
    persona: { nombre: 'Lic. Diego Santi', rol: 'Docente de apoyo a la inclusión (UDAI)', avatar: '👨🏽‍🦯', pitch: 0.95 },
    contexto: 'Nayeli, de 5.º EGB, tiene baja visión. El docente de apoyo revisa contigo un material para estudiar los ríos y cantones de Pastaza que sirva a toda la clase.',
    objetivo: 'Diseñar, implementar y evaluar material didáctico innovador, inclusivo y multidisciplinario.',
    pasos: [
      { dice: '¿Qué material piensas hacer para que Nayeli aprenda los ríos y cantones?', opciones: [
          { t: 'Un mapa táctil en relieve con texturas distintas por cantón, ríos de hilo grueso, alto contraste y etiquetas en letra ampliada y braille, útil para todo el grupo.', p: 2, r: 'Muy bien, eso es diseño universal.', fb: 'El material inclusivo con canales táctil y visual responde al Diseño Universal para el Aprendizaje y beneficia a todos.' },
          { t: 'Una fotocopia del mapa ampliada para ella.', p: 1, r: 'Ayuda, pero sigue siendo solo visual.', fb: 'La ampliación es un apoyo, pero un material multisensorial es más efectivo.' },
          { t: 'Que ella escuche mientras los demás miran el mapa.', p: 0, r: 'Eso la deja fuera.', fb: 'Limitar su participación contradice la inclusión.' } ] },
      { dice: '¿Cómo lo haces innovador y multidisciplinario?', opciones: [
          { t: 'Le agrego códigos QR con audios de leyendas kichwa y shuar de cada río, y los estudiantes escriben descripciones: integra Sociales, Lengua y TIC.', p: 2, r: 'Excelente integración.', fb: 'Combinar tecnología, identidad cultural y varias áreas potencia el impacto del material.' },
          { t: 'Lo pinto con colores llamativos.', p: 1, r: 'Bonito, pero ¿qué más aprenden?', fb: 'Lo estético no basta para la innovación pedagógica.' },
          { t: 'Lo compro hecho por internet.', p: 0, r: 'No responde al contexto.', fb: 'Un material genérico no se adapta a las necesidades ni al contexto local.' } ] },
      { dice: '¿Cómo sabrás el impacto del material?', opciones: [
          { t: 'Observo cómo lo usan, comparo los aprendizajes antes y después y recojo la opinión de Nayeli y sus compañeros para mejorarlo.', p: 2, r: 'Así se evalúa en serio.', fb: 'Evaluar el impacto con evidencias y la voz de los usuarios permite mejorar el material.' },
          { t: 'Pregunto si les gustó.', p: 1, r: 'Es un dato, pero limitado.', fb: 'La satisfacción no mide aprendizaje.' },
          { t: 'Lo doy por bueno porque me costó mucho.', p: 0, r: 'El esfuerzo no garantiza eficacia.', fb: 'Sin evaluación no hay mejora.' } ] }
    ],
    vivo: {
      lugar: 'Aula de recursos de una escuela de Puyo', fondo: 'aula',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Mostrar el boceto del mapa en relieve', p: 2, fb: 'Concreta la propuesta inclusiva.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🧵', t: 'Probar texturas de tela, lija y hilo grueso', p: 2, fb: 'Las texturas permiten la discriminación táctil.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🖨️', t: 'Imprimir solo una copia ampliada', p: 1, fb: 'Es un apoyo visual, insuficiente por sí solo.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🎧', t: 'Darle audífonos mientras otros ven el mapa', p: 0, fb: 'Separa a Nayeli de la actividad común.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Material táctil', claves: ['tactil', 'relieve', 'textura', 'tocar', 'braille'] },
            { n: 'Accesibilidad visual', claves: ['contraste', 'ampliad', 'letra grande', 'baja vision', 'colores fuertes'] },
            { n: 'Para todo el grupo', claves: ['todos', 'diseno universal', 'dua', 'toda la clase', 'inclus', 'companeros'] }
          ],
          evitar: [ { claves: ['solo para ella', 'que escuche nomas'], fb: 'El material inclusivo no segrega.' } ],
          modelo: 'Haré un mapa táctil en relieve con texturas por cantón, ríos de hilo grueso, alto contraste y etiquetas en braille y letra ampliada, para que lo use toda la clase con diseño universal.'
        },
        {
          acciones: [
            { icono: '📱', t: 'Pegar códigos QR con audios en cada río', p: 2, fb: 'Integra tecnología accesible.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🎙️', t: 'Grabar leyendas con abuelos de la comunidad', p: 2, fb: 'Incorpora saberes locales e interculturalidad.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🛒', t: 'Comprar un mapa genérico en línea', p: 0, fb: 'No responde al contexto ni a la necesidad.', efecto: { confianza: -8, tension: 5 } }
          ],
          conceptos: [
            { n: 'Tecnología', claves: ['qr', 'audio', 'tecnolog', 'digital', 'tablet', 'celular'] },
            { n: 'Multidisciplinariedad', claves: ['sociales', 'lengua', 'areas', 'multidisciplin', 'interdisciplin', 'escriben'] },
            { n: 'Innovación con identidad', claves: ['leyenda', 'kichwa', 'shuar', 'cultura', 'comunidad', 'innov', 'creativ'] }
          ],
          evitar: [ { claves: ['comprarlo hecho'], fb: 'El material debe adaptarse al contexto.' } ],
          modelo: 'Agregaré códigos QR con audios de leyendas kichwa y shuar de cada río, y los estudiantes escribirán descripciones; así integro Sociales, Lengua y tecnología de forma innovadora.'
        },
        {
          acciones: [
            { icono: '🔬', t: 'Planificar una observación del uso del mapa', p: 2, fb: 'Genera evidencia del impacto.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🗳️', t: 'Recoger la opinión de Nayeli y sus compañeros', p: 2, fb: 'La voz de los usuarios orienta la mejora.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🏆', t: 'Darlo por exitoso sin evaluar', p: 0, fb: 'Sin evidencias no hay mejora.', efecto: { confianza: -8, tension: 5 } }
          ],
          conceptos: [
            { n: 'Evidencias de aprendizaje', claves: ['antes y despues', 'aprend', 'evidencia', 'compar', 'logro'] },
            { n: 'Voz de los usuarios', claves: ['opinion', 'nayeli', 'companeros', 'preguntar', 'escuchar', 'sugerencia'] },
            { n: 'Mejora continua', claves: ['mejor', 'ajust', 'impacto', 'evalu', 'modific'] }
          ],
          evitar: [ { claves: ['ya esta perfecto'], fb: 'Todo material es mejorable.' } ],
          modelo: 'Observaré cómo lo usan, compararé los aprendizajes antes y después, y escucharé la opinión de Nayeli y sus compañeros para ajustar el material y evaluar su impacto.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-408', cod: 'SPRL-408',
    titulo: 'Proyecto de residuos con la comunidad',
    asignaturas: ['SPRL-408'],
    persona: { nombre: 'Sr. Alfonso Grefa', rol: 'Presidente de una comunidad kichwa de Pastaza', avatar: '👴🏽', pitch: 0.85 },
    contexto: 'En la escuela comunitaria hay basura plástica junto al estero. El presidente de la comunidad quiere que la escuela haga "algo". Debes proponer un proyecto educativo bien diagnosticado, estructurado y sostenible.',
    objetivo: 'Diagnosticar necesidades, estructurar, gestionar y evaluar un proyecto educativo comunitario con ABP.',
    pasos: [
      { dice: 'Profe, la basura llega al estero. ¿Qué puede hacer la escuela?', opciones: [
          { t: 'Primero hacer un diagnóstico participativo: recorrido con estudiantes, encuesta a familias y un árbol de problemas para identificar causas.', p: 2, r: 'Bien, que los guaguas también averigüen.', fb: 'Todo proyecto educativo inicia con la identificación de necesidades y un diagnóstico participativo.' },
          { t: 'Organizar una minga de limpieza el sábado.', p: 1, r: 'Ayuda, pero la basura vuelve.', fb: 'Una acción puntual sin diagnóstico no ataca las causas.' },
          { t: 'Eso le toca al municipio, no a la escuela.', p: 0, r: 'Pero los niños también aprenden de esto.', fb: 'Ignora el rol de la escuela en proyectos comunitarios.' } ] },
      { dice: '¿Cómo sería el proyecto?', opciones: [
          { t: 'Con estructura: justificación, objetivo general y específicos, metodología ABP por grados, recursos, responsables y cronograma de tres meses.', p: 2, r: 'Así se ve serio.', fb: 'La estructura del proyecto orienta la gestión y articula aprendizajes con el problema real.' },
          { t: 'Con actividades que vayamos viendo cada semana.', p: 1, r: 'Puede perderse en el camino.', fb: 'Sin planificación clara, el proyecto pierde rumbo.' },
          { t: 'Que cada docente haga lo que pueda.', p: 0, r: 'Así no hay proyecto.', fb: 'Sin coordinación no existe un proyecto educativo.' } ] },
      { dice: '¿Y cuando ustedes se vayan, quién sigue?', opciones: [
          { t: 'Definimos indicadores para evaluar, formamos un comité de estudiantes, familias y la directiva, y lo incluimos en el plan anual de la escuela.', p: 2, r: 'Así sí queda en la comunidad.', fb: 'La evaluación con indicadores y la apropiación comunitaria garantizan la sostenibilidad.' },
          { t: 'Dejamos un informe final.', p: 1, r: '¿Y quién lo lee?', fb: 'El informe documenta, pero no asegura la continuidad.' },
          { t: 'Termina cuando termine el año.', p: 0, r: 'Entonces vuelve la basura.', fb: 'Un proyecto sin sostenibilidad pierde su impacto.' } ] }
    ],
    vivo: {
      lugar: 'Casa comunal junto a la escuela comunitaria, Pastaza', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🚶', t: 'Proponer un recorrido por el estero con estudiantes', p: 2, fb: 'La observación directa es parte del diagnóstico.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🌳', t: 'Dibujar un árbol de problemas en papelógrafo', p: 2, fb: 'Organiza causas y efectos del problema.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧹', t: 'Convocar solo una minga de limpieza', p: 1, fb: 'Acción útil pero sin diagnóstico.', efecto: { confianza: 3, tension: 0 } },
            { icono: '🏛️', t: 'Remitirlo al municipio y retirarte', p: 0, fb: 'Evade el rol de la escuela.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Diagnóstico', claves: ['diagnostic', 'necesidad', 'identificar', 'investigar', 'averiguar'] },
            { n: 'Técnicas participativas', claves: ['encuesta', 'recorrido', 'entrevista', 'arbol de problemas', 'observ', 'familias'] },
            { n: 'Causas del problema', claves: ['causa', 'por que', 'origen', 'efecto', 'raiz'] }
          ],
          evitar: [ { claves: ['no es problema de la escuela'], fb: 'La escuela puede liderar proyectos comunitarios.' } ],
          modelo: 'Primero haremos un diagnóstico participativo: un recorrido por el estero con los estudiantes, una encuesta a las familias y un árbol de problemas para identificar las causas.'
        },
        {
          acciones: [
            { icono: '🎯', t: 'Escribir objetivo general y específicos', p: 2, fb: 'Los objetivos orientan el proyecto.', efecto: { confianza: 7, tension: -4 } },
            { icono: '📆', t: 'Elaborar un cronograma con responsables', p: 2, fb: 'Facilita la gestión y el seguimiento.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🤹', t: 'Dejar que cada docente improvise', p: 0, fb: 'Sin coordinación no hay proyecto.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Estructura del proyecto', claves: ['justificacion', 'objetivo', 'introduccion', 'estructura', 'titulo'] },
            { n: 'Metodología ABP', claves: ['abp', 'aprendizaje basado en proyectos', 'metodolog', 'por grados', 'producto'] },
            { n: 'Gestión de recursos y tiempo', claves: ['cronograma', 'recursos', 'responsable', 'presupuesto', 'meses', 'tiempo'] }
          ],
          evitar: [ { claves: ['vamos viendo', 'improvisar'], fb: 'La improvisación debilita el proyecto.' } ],
          modelo: 'El proyecto tendrá justificación, objetivos general y específicos, metodología de aprendizaje basado en proyectos por grados, recursos, responsables y un cronograma de tres meses.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Definir indicadores de evaluación', p: 2, fb: 'Permiten medir logros del proyecto.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👥', t: 'Conformar un comité escuela-comunidad', p: 2, fb: 'La apropiación local da sostenibilidad.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏁', t: 'Cerrar el proyecto al terminar el año', p: 0, fb: 'Sin continuidad se pierde el impacto.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Evaluación del proyecto', claves: ['evalu', 'indicador', 'resultado', 'medir', 'logro'] },
            { n: 'Sostenibilidad', claves: ['sostenib', 'continu', 'plan anual', 'permanente', 'seguir'] },
            { n: 'Participación comunitaria', claves: ['comite', 'comunidad', 'familias', 'directiva', 'estudiantes', 'minga'] }
          ],
          evitar: [ { claves: ['ahi termina', 'ya no nos toca'], fb: 'La sostenibilidad es parte del diseño.' } ],
          modelo: 'Definiremos indicadores para evaluar, formaremos un comité con estudiantes, familias y la directiva, y lo incluiremos en el plan anual para que el proyecto sea sostenible.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-409', cod: 'SPRL-409',
    titulo: 'Salida de campo al río Puyo',
    asignaturas: ['SPRL-409'],
    persona: { nombre: 'Josué', rol: 'Estudiante de 7.º EGB', avatar: '🧒🏽', pitch: 1.2 },
    contexto: 'Durante una salida al malecón del río Puyo, Josué pregunta por qué el agua está turbia y cómo era el río antes. Debes enseñar Ciencias Naturales y Sociales con método científico, fuentes y mapas.',
    objetivo: 'Aplicar la didáctica de las Ciencias Naturales y Sociales: método científico, fuentes, mapas y evaluación con rúbricas.',
    pasos: [
      { dice: 'Profe, ¿por qué el río está color café hoy?', opciones: [
          { t: 'Le pregunto qué cree que pasa, planteamos una hipótesis (llovió y arrastró tierra) y planificamos cómo comprobarla midiendo la turbidez varios días.', p: 2, r: '¡Vamos a ser científicos!', fb: 'Aplicar las etapas del método científico (observación, hipótesis, experimentación, conclusión) desarrolla el pensamiento científico.' },
          { t: 'Le explico que es por la lluvia.', p: 1, r: 'Ah, ok.', fb: 'La explicación es correcta, pero pierde la oportunidad de indagar.' },
          { t: 'Le digo que eso no está en el programa.', p: 0, r: 'Bueno...', fb: 'Desaprovechar la curiosidad limita el aprendizaje significativo.' } ] },
      { dice: '¿Y cómo era el río cuando mi abuelo era niño?', opciones: [
          { t: 'Propongo entrevistar a abuelos (fuente primaria), comparar con fotos antiguas y un mapa actual de la cuenca del Pastaza.', p: 2, r: '¡Le voy a preguntar a mi abuelito!', fb: 'El uso de fuentes primarias, secundarias y mapas desarrolla el pensamiento histórico y geográfico.' },
          { t: 'Le digo que lo busque en internet.', p: 1, r: '¿Qué pongo?', fb: 'Internet es una fuente secundaria; falta orientación y contraste de fuentes.' },
          { t: 'Le digo que el pasado no importa.', p: 0, r: 'Pero yo quería saber...', fb: 'Niega el valor de la historia local y el pensamiento crítico.' } ] },
      { dice: '¿Y cómo nos va a calificar esto?', opciones: [
          { t: 'Con una rúbrica que valora la bitácora de observación, la entrevista, el mapa y una propuesta ciudadana para cuidar el río.', p: 2, r: 'Así sé qué tengo que hacer.', fb: 'Las rúbricas y los proyectos de evaluación integran conocimientos, procedimientos y actitudes ciudadanas.' },
          { t: 'Con una prueba de opción múltiple.', p: 1, r: '¿Y lo que hicimos en el río?', fb: 'La prueba evalúa conceptos, pero no el proceso indagatorio.' },
          { t: 'No se califica, es solo un paseo.', p: 0, r: 'Entonces no lo hago.', fb: 'Sin evaluación la salida pierde intención pedagógica.' } ] }
    ],
    vivo: {
      lugar: 'Malecón del río Puyo durante una salida pedagógica', fondo: 'exterior',
      inicio: { confianza: 55, tension: 35 },
      pasos: [
        {
          acciones: [
            { icono: '🫙', t: 'Tomar una muestra de agua en un frasco', p: 2, fb: 'La observación directa inicia la indagación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📓', t: 'Pedir que anoten observaciones en la bitácora', p: 2, fb: 'El registro sistemático es parte del método científico.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🤫', t: 'Pedirle que se calle y siga caminando', p: 0, fb: 'Apaga la curiosidad científica.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Observación', claves: ['observ', 'mirar', 'color', 'turbi', 'muestra'] },
            { n: 'Hipótesis', claves: ['hipotesis', 'que crees', 'por que crees', 'suponer', 'llovio', 'lluvia'] },
            { n: 'Comprobación', claves: ['comprob', 'experiment', 'medir', 'varios dias', 'registr', 'conclusion'] }
          ],
          evitar: [ { claves: ['no esta en el programa'], fb: 'La curiosidad es punto de partida de la ciencia.' } ],
          modelo: '¿Qué crees que pasa, Josué? Observemos la muestra. Una hipótesis es que la lluvia arrastró tierra; la comprobaremos midiendo la turbidez varios días y registrando los datos.'
        },
        {
          acciones: [
            { icono: '🗺️', t: 'Desplegar el mapa de la cuenca del Pastaza', p: 2, fb: 'Ubica el río en su contexto geográfico.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🎤', t: 'Preparar preguntas para entrevistar a abuelos', p: 2, fb: 'La entrevista es una fuente primaria valiosa.', efecto: { confianza: 7, tension: -4 } },
            { icono: '🌐', t: 'Decirle que lo busque en internet', p: 1, fb: 'Fuente secundaria sin orientación.', efecto: { confianza: 1, tension: 0 } },
            { icono: '🙉', t: 'Cambiar de tema', p: 0, fb: 'Desaprovecha la historia local.', efecto: { confianza: -8, tension: 4 } }
          ],
          conceptos: [
            { n: 'Fuente primaria', claves: ['fuente primaria', 'entrevista', 'abuel', 'testimonio', 'foto antigua', 'fotos'] },
            { n: 'Uso de mapas', claves: ['mapa', 'cuenca', 'ubicar', 'geograf', 'pastaza'] },
            { n: 'Comparar pasado y presente', claves: ['antes', 'ahora', 'compar', 'cambio', 'historia', 'fuente secundaria'] }
          ],
          evitar: [ { claves: ['el pasado no importa'], fb: 'La historia local construye identidad y pensamiento crítico.' } ],
          modelo: 'Entrevistemos a tu abuelo, que es una fuente primaria, y comparemos con fotos antiguas. Luego ubicamos el río en el mapa de la cuenca del Pastaza para ver cómo ha cambiado.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Presentar la rúbrica antes de iniciar', p: 2, fb: 'Conocer los criterios orienta el trabajo.', efecto: { confianza: 8, tension: -5 } },
            { icono: '💡', t: 'Pedir una propuesta ciudadana para cuidar el río', p: 2, fb: 'Desarrolla pensamiento crítico y ciudadano.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🎒', t: 'Decir que es solo un paseo', p: 0, fb: 'Quita intención pedagógica a la salida.', efecto: { confianza: -8, tension: 5 } }
          ],
          conceptos: [
            { n: 'Rúbrica', claves: ['rubrica', 'criterio', 'niveles', 'instrumento', 'evalu'] },
            { n: 'Productos del proyecto', claves: ['bitacora', 'entrevista', 'mapa', 'informe', 'proyecto'] },
            { n: 'Pensamiento ciudadano', claves: ['propuesta', 'cuidar', 'ciudadan', 'ambiente', 'accion', 'comunidad'] }
          ],
          evitar: [ { claves: ['no se califica', 'solo paseo'], fb: 'Toda salida pedagógica requiere evaluación.' } ],
          modelo: 'Usaremos una rúbrica que valora tu bitácora, la entrevista, el mapa y una propuesta ciudadana para cuidar el río.'
        }
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'asig-SPRL-410', cod: 'SPRL-410',
    titulo: 'Defensa del trabajo de integración curricular',
    asignaturas: ['SPRL-410'],
    persona: { nombre: 'MSc. Patricia Ramos', rol: 'Presidenta del tribunal de titulación', avatar: '👩🏻‍⚖️', pitch: 1.0 },
    contexto: 'Defiendes tu trabajo de integración curricular sobre lectura comprensiva en 4.º EGB, desarrollado en tus prácticas en Puyo. El tribunal evalúa la integración de planificación, didáctica, evaluación y ética.',
    objetivo: 'Integrar los aprendizajes de la carrera en un trabajo coherente con el perfil de egreso y sustentarlo.',
    pasos: [
      { dice: '¿Qué problema abordó y por qué es pertinente?', opciones: [
          { t: 'Bajo nivel de comprensión lectora detectado con una evaluación diagnóstica en mis prácticas; es pertinente porque afecta a todas las áreas y responde al perfil de egreso.', p: 2, r: 'Bien sustentado con datos.', fb: 'Un problema sustentado en evidencia del contexto y articulado al perfil de egreso justifica el trabajo.' },
          { t: 'La lectura es importante para los niños.', p: 1, r: 'Muy general.', fb: 'Falta evidencia del contexto que justifique el problema.' },
          { t: 'Escogí un tema que ya estaba hecho en internet.', p: 0, r: 'Eso es preocupante.', fb: 'Reutilizar trabajos ajenos vulnera la ética académica.' } ] },
      { dice: '¿Cómo integró lo aprendido en la carrera?', opciones: [
          { t: 'Planifiqué una unidad con destrezas del currículo, apliqué estrategias activas con material concreto y evalué con rúbricas antes y después; los resultados mejoraron y lo evidencio con datos.', p: 2, r: 'Hay integración real.', fb: 'El trabajo integra planificación, didáctica, material y evaluación con evidencias de resultados.' },
          { t: 'Apliqué varias actividades de lectura.', p: 1, r: '¿Con qué sustento?', fb: 'Sin planificación ni evaluación, no se evidencia la integración.' },
          { t: 'Los resultados los estimé porque no alcancé a evaluar.', p: 0, r: 'Eso invalida el trabajo.', fb: 'Inventar resultados es una falta grave de ética.' } ] },
      { dice: '¿Qué consideraciones éticas tuvo con los niños?', opciones: [
          { t: 'Obtuve consentimiento informado de las familias y autorización de la institución, protegí la identidad de los niños y socialicé los resultados con la escuela.', p: 2, r: 'Muy bien, procedimiento correcto.', fb: 'Trabajar con menores exige consentimiento, confidencialidad y devolución de resultados.' },
          { t: 'Pedí permiso a la docente tutora.', p: 1, r: '¿Y a las familias?', fb: 'La autorización del tutor no reemplaza el consentimiento de las familias.' },
          { t: 'Publiqué fotos de los niños con sus nombres en redes.', p: 0, r: 'Eso vulnera sus derechos.', fb: 'Exponer la identidad de menores vulnera su privacidad y la normativa.' } ] }
    ],
    vivo: {
      lugar: 'Sala de sustentaciones del instituto, Puyo', fondo: 'oficina',
      inicio: { confianza: 45, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '📊', t: 'Proyectar los resultados de la evaluación diagnóstica', p: 2, fb: 'Los datos sustentan el problema.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎓', t: 'Mostrar la relación con el perfil de egreso', p: 2, fb: 'Evidencia pertinencia académica.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📜', t: 'Leer de corrido las diapositivas', p: 1, fb: 'Comunica, pero resta dominio del tema.', efecto: { confianza: 0, tension: 3 } },
            { icono: '😶', t: 'Quedarte en silencio sin responder', p: 0, fb: 'Evidencia falta de preparación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Problema delimitado', claves: ['comprension lectora', 'problema', 'cuarto', 'cuarto grado', 'lectura'] },
            { n: 'Evidencia diagnóstica', claves: ['diagnostic', 'datos', 'practicas', 'resultados', 'porcentaje', 'evidencia'] },
            { n: 'Pertinencia', claves: ['pertinen', 'perfil de egreso', 'importan', 'todas las areas', 'contexto', 'justific'] }
          ],
          evitar: [ { claves: ['copie', 'ya estaba hecho'], fb: 'El plagio es una falta ética grave.' } ],
          modelo: 'Abordé el bajo nivel de comprensión lectora en cuarto grado, detectado con una evaluación diagnóstica en mis prácticas. Es pertinente porque afecta a todas las áreas y responde al perfil de egreso.'
        },
        {
          acciones: [
            { icono: '🧩', t: 'Mostrar la unidad didáctica planificada', p: 2, fb: 'Evidencia la planificación curricular.', efecto: { confianza: 7, tension: -4 } },
            { icono: '📉', t: 'Comparar resultados antes y después', p: 2, fb: 'Demuestra el impacto con datos.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🎭', t: 'Presentar resultados estimados como reales', p: 0, fb: 'Falsear datos es una falta grave.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Planificación', claves: ['planifi', 'unidad', 'destreza', 'curriculo', 'objetivo'] },
            { n: 'Estrategias y material', claves: ['estrategia', 'material', 'activ', 'didactic', 'lectura compartida'] },
            { n: 'Evaluación de resultados', claves: ['rubrica', 'antes y despues', 'resultado', 'mejor', 'evalu', 'datos'] }
          ],
          evitar: [ { claves: ['me invente', 'estime los resultados'], fb: 'Los resultados deben ser reales y verificables.' } ],
          modelo: 'Planifiqué una unidad con destrezas del currículo, apliqué estrategias activas con material concreto y evalué con rúbricas antes y después; los resultados mejoraron según los datos.'
        },
        {
          acciones: [
            { icono: '✍️', t: 'Mostrar los consentimientos firmados', p: 2, fb: 'Evidencia el procedimiento ético.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🕶️', t: 'Explicar cómo anonimizaste los datos', p: 2, fb: 'Protege la identidad de los menores.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📸', t: 'Proyectar fotos con nombres de los niños', p: 0, fb: 'Vulnera la privacidad de los menores.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Consentimiento informado', claves: ['consentimiento', 'familias', 'padres', 'autoriz', 'permiso'] },
            { n: 'Confidencialidad', claves: ['confidencial', 'anonim', 'identidad', 'sin nombres', 'proteg', 'privacidad'] },
            { n: 'Devolución de resultados', claves: ['socializ', 'devol', 'compart', 'institucion', 'escuela', 'informe'] }
          ],
          evitar: [ { claves: ['publique las fotos', 'con sus nombres'], fb: 'Exponer a menores vulnera sus derechos.' } ],
          modelo: 'Obtuve el consentimiento informado de las familias y la autorización de la institución, protegí la identidad de los niños con códigos y socialicé los resultados con la escuela.'
        }
      ]
    }
  }
]);
