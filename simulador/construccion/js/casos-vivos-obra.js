/* Casos vivos – Construcción: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {
  'comision': {
    lugar: 'Bodega de la obra pública, junto al acopio de varillas de acero',
    fondo: 'obra',
    inicio: { confianza: 55, tension: 35 },
    pasos: [
      {
        acciones: [
          { icono: '✋', t: 'Rechazar la oferta con un gesto firme', p: 2, fb: 'Una negativa clara cierra la puerta a la corrupción; en obra pública es además un delito.', efecto: { confianza: -5, tension: 10 } },
          { icono: '🤝', t: 'Estrechar la mano del proveedor y cerrar el trato', p: 0, fb: 'Aceptar un porcentaje es cohecho: tiene consecuencias penales y profesionales.', efecto: { confianza: 15, tension: -15 } },
          { icono: '🤔', t: 'Guardar su tarjeta y decir que lo pensará', p: 1, fb: 'Dudar deja la puerta abierta; la respuesta debe ser inmediata y clara.', efecto: { confianza: 5, tension: -5 } },
          { icono: '📑', t: 'Mostrar las especificaciones técnicas del contrato', p: 2, fb: 'Los materiales se adquieren según el proceso de contratación y las especificaciones, no por recomendación personal.', efecto: { confianza: -5, tension: 5 } }
        ],
        conceptos: [
          { n: 'Rechaza la oferta con firmeza', claves: ['no acepto', 'no puedo aceptar', 'rechazo', 'no recibo', 'de ninguna manera', 'no es correcto', 'no me interesa', 'eso es corrupcion', 'eso es ilegal'] },
          { n: 'Se rige por el proceso de contratación', claves: ['proceso', 'contratacion', 'contrato', 'licitacion', 'sercop', 'entidad contratante', 'compras publicas', 'pliego'] },
          { n: 'Exige cumplir las especificaciones técnicas', claves: ['especificacion', 'requisito', 'norma', 'nec', 'inen', 'calidad', 'tecnic'] }
        ],
        evitar: [
          { claves: ['si acepto', 'acepto el', 'trato hecho', 'cuanto me toca', 'solo esta vez'], fb: 'Aceptar un beneficio personal es corrupción, aunque sea "solo una vez".' },
          { claves: ['lo pienso', 'lo voy a pensar', 'despues hablamos', 'luego vemos'], fb: 'Postergar la respuesta da a entender que la oferta es negociable.' }
        ],
        modelo: 'No, señor Paredes, no acepto ningún porcentaje. Los materiales de esta obra se adquieren según el proceso de contratación y las especificaciones técnicas, no por recomendación personal.'
      },
      {
        acciones: [
          { icono: '📄', t: 'Pedir el certificado de calidad del acero', p: 2, fb: 'Todo acero estructural debe acreditar su calidad según la norma INEN y la NEC.', efecto: { confianza: -5, tension: 10 } },
          { icono: '🧪', t: 'Enviar muestras al laboratorio para ensayo de tracción', p: 2, fb: 'El ensayo de tracción verifica fluencia y resistencia antes de aceptar el lote.', efecto: { confianza: 0, tension: 5 } },
          { icono: '🚚', t: 'Firmar la guía y descargar el acero en obra', p: 0, fb: 'Recibir acero de calidad desconocida pone en riesgo toda la estructura.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🏗️', t: 'Separar las varillas para usarlas solo en columnas', p: 0, fb: 'Las columnas son elementos críticos del sistema sismorresistente.', efecto: { confianza: 5, tension: -5 } }
        ],
        conceptos: [
          { n: 'Exige el certificado de calidad', claves: ['certificado', 'certificacion', 'calidad', 'inen', 'trazabilidad', 'documento del fabricante'] },
          { n: 'Pide ensayos de laboratorio', claves: ['ensayo', 'traccion', 'laboratorio', 'prueba', 'muestra', 'fluencia'] },
          { n: 'No acepta material sin cumplir la norma', claves: ['no acepto', 'no se usa', 'no ingresa', 'rechazo', 'no recibo', 'nec', 'norma', 'especificacion'] }
        ],
        evitar: [
          { claves: ['mas barato', 'da igual', 'no importa', 'solo en columnas'], fb: 'El precio no justifica usar acero sin certificar en elementos estructurales.' }
        ],
        modelo: 'Sin certificado de calidad no recibo ese acero. Necesito el certificado del fabricante y los ensayos de tracción en laboratorio que demuestren que cumple la norma.'
      },
      {
        acciones: [
          { icono: '📓', t: 'Anotar el hecho en el libro de obra', p: 2, fb: 'Dejar constancia escrita protege la obra y al profesional.', efecto: { confianza: 0, tension: 5 } },
          { icono: '✉️', t: 'Enviar un informe al fiscalizador y a la entidad', p: 2, fb: 'Las denuncias se canalizan por las vías formales: fiscalización y entidad contratante.', efecto: { confianza: -5, tension: 10 } },
          { icono: '📱', t: 'Publicar el nombre del proveedor en redes sociales', p: 0, fb: 'Exponerlo públicamente puede generar un conflicto legal; use los canales formales.', efecto: { confianza: -15, tension: 20 } },
          { icono: '🤐', t: 'Callar y seguir con el trabajo', p: 1, fb: 'Callar evita problemas hoy, pero permite que se repita con otros residentes.', efecto: { confianza: 5, tension: -5 } }
        ],
        conceptos: [
          { n: 'Registra el hecho por escrito', claves: ['registro', 'registrar', 'libro de obra', 'bitacora', 'por escrito', 'dejar constancia', 'documentar', 'acta'] },
          { n: 'Informa al fiscalizador', claves: ['fiscaliza', 'supervisor', 'informe', 'informar', 'reportar', 'comunicar'] },
          { n: 'Usa canales formales ante la entidad', claves: ['entidad contratante', 'entidad', 'contraloria', 'canal formal', 'via formal', 'denuncia formal', 'fiscalia'] }
        ],
        evitar: [
          { claves: ['redes sociales', 'facebook', 'tiktok', 'exponerlo'], fb: 'Las denuncias se hacen por vías formales, no en redes sociales.' },
          { claves: ['no digo nada', 'me quedo callado', 'olvidarlo'], fb: 'Callar permite que la corrupción se repita.' }
        ],
        modelo: 'Voy a registrar lo ocurrido en el libro de obra e informaré por escrito al fiscalizador y a la entidad contratante, para que se maneje por la vía formal.'
      }
    ]
  },

  'accidente': {
    lugar: 'Zona de mampostería, al pie de un andamio de 2 metros',
    fondo: 'emergencia',
    inicio: { confianza: 50, tension: 80 },
    pasos: [
      {
        acciones: [
          { icono: '🛑', t: 'Detener los trabajos en la zona del andamio', p: 2, fb: 'Primero se asegura la escena para que nadie más se lesione.', efecto: { confianza: 10, tension: -5 } },
          { icono: '📞', t: 'Llamar al ECU 911', p: 2, fb: 'Una caída de altura requiere atención profesional inmediata.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🩹', t: 'Inmovilizar el brazo sin mover al trabajador', p: 2, fb: 'Si hay sospecha de lesión grave no se debe mover al lesionado.', efecto: { confianza: 10, tension: -5 } },
          { icono: '🧍', t: 'Levantar a Kevin y pedirle que siga trabajando', p: 0, fb: 'Mover a un lesionado sin evaluarlo puede agravar sus lesiones.', efecto: { confianza: -20, tension: 20 } }
        ],
        conceptos: [
          { n: 'Detiene el trabajo y asegura la escena', claves: ['detener', 'detengo', 'paren', 'paralizar', 'parar el trabajo', 'escena segura', 'asegurar la zona', 'despejar', 'acordonar'] },
          { n: 'Primeros auxilios sin moverlo', claves: ['primeros auxilios', 'no moverlo', 'no lo muevan', 'inmovilizar', 'evaluar', 'botiquin', 'que no se mueva'] },
          { n: 'Pide ayuda de emergencia', claves: ['ecu 911', '911', 'ambulancia', 'emergencia', 'paramedico', 'hospital', 'centro de salud'] }
        ],
        evitar: [
          { claves: ['siga trabajando', 'levantalo', 'no es nada', 'mandalo a su casa', 'en bus'], fb: 'Un accidente laboral exige atención médica y registro, no minimizarlo.' }
        ],
        modelo: 'Paren todo en esa zona. No lo muevan: le doy primeros auxilios e inmovilizo el brazo mientras llamo al ECU 911.'
      },
      {
        acciones: [
          { icono: '🔍', t: 'Inspeccionar el andamio: barandas, rodapiés y anclajes', p: 2, fb: 'La investigación identifica las causas: andamio sin barandas y sin arnés.', efecto: { confianza: 5, tension: -5 } },
          { icono: '📝', t: 'Llenar el formulario de aviso de accidente de trabajo', p: 2, fb: 'El accidente se registra y se reporta al IESS (Riesgos del Trabajo) dentro del plazo legal.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🗑️', t: 'Borrar las fotos y no reportar nada', p: 0, fb: 'Ocultar accidentes es ilegal y deja sin protección al trabajador.', efecto: { confianza: -15, tension: 15 } },
          { icono: '👉', t: 'Señalar a Kevin como culpable ante la cuadrilla', p: 0, fb: 'La investigación busca causas, no culpables.', efecto: { confianza: -20, tension: 15 } }
        ],
        conceptos: [
          { n: 'Investiga las causas', claves: ['investig', 'causa', 'analizar', 'por que paso', 'barandas', 'arnes', 'rodapie', 'condicion insegura'] },
          { n: 'Corrige las condiciones inseguras', claves: ['corregir', 'corrig', 'arreglar', 'instalar barandas', 'poner barandas', 'medida correctiva', 'reparar el andamio', 'colocar'] },
          { n: 'Registra y reporta el accidente', claves: ['registr', 'reportar', 'reporte', 'iess', 'riesgos del trabajo', 'aviso de accidente', 'notificar', 'informe'] }
        ],
        evitar: [
          { claves: ['no reportar', 'no reportemos', 'que nadie sepa', 'ocultar'], fb: 'Ocultar un accidente laboral es ilegal.' },
          { claves: ['fue su culpa', 'culpa de kevin', 'por descuidado'], fb: 'Culpar al trabajador impide encontrar y corregir la causa real.' }
        ],
        modelo: 'Investiguemos la causa: el andamio no tenía barandas y él no usaba arnés. Hoy mismo se corrigen y yo registro y reporto el accidente al IESS como manda la normativa.'
      },
      {
        acciones: [
          { icono: '🗣️', t: 'Reunir a la cuadrilla para la charla de seguridad diaria', p: 2, fb: 'La charla diaria mantiene presentes los riesgos y las medidas.', efecto: { confianza: 10, tension: -10 } },
          { icono: '✅', t: 'Revisar el andamio con una lista de chequeo', p: 2, fb: 'Revisar andamios antes de cada uso previene caídas.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🦺', t: 'Repartir casco, arnés y línea de vida', p: 2, fb: 'El EPP es obligatorio en trabajos en altura.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🤷', t: 'Encogerse de hombros: fue mala suerte', p: 0, fb: 'Los accidentes tienen causas que se pueden controlar.', efecto: { confianza: -15, tension: 10 } }
        ],
        conceptos: [
          { n: 'Capacitación y charla diaria', claves: ['charla', 'capacitacion', 'capacitar', 'induccion', 'charla de cinco minutos', 'charla diaria', 'entrenamiento'] },
          { n: 'Inspección de andamios antes de usarlos', claves: ['revisar el andamio', 'revision', 'inspeccion', 'lista de chequeo', 'check list', 'checklist', 'antes de usar'] },
          { n: 'EPP obligatorio y señalización', claves: ['epp', 'equipo de proteccion', 'arnes', 'casco', 'linea de vida', 'senalizacion', 'senalizar'] }
        ],
        evitar: [
          { claves: ['mala suerte', 'no se puede evitar', 'es normal', 'cosas que pasan'], fb: 'Los accidentes se previenen; no son cuestión de suerte.' }
        ],
        modelo: 'Haremos una charla de seguridad cada mañana, revisaremos los andamios con lista de chequeo antes de usarlos, y el arnés, el casco y la señalización serán obligatorios.'
      }
    ]
  },

  'escombros': {
    lugar: 'Patio trasero de la obra, a pocos metros del estero',
    fondo: 'exterior',
    inicio: { confianza: 60, tension: 40 },
    pasos: [
      {
        acciones: [
          { icono: '🚧', t: 'Delimitar con cinta un área de acopio de escombros', p: 2, fb: 'El acopio temporal delimitado evita que los escombros lleguen al agua.', efecto: { confianza: 5, tension: -5 } },
          { icono: '📞', t: 'Llamar a la volqueta para confirmar la nueva hora', p: 2, fb: 'Los escombros deben ir a la escombrera autorizada por el municipio.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🌊', t: 'Empujar los escombros con la carretilla al estero', p: 0, fb: 'Arrojar escombros a cuerpos de agua contamina y es una infracción ambiental.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🔥', t: 'Juntar los escombros y prenderles fuego', p: 0, fb: 'La quema a cielo abierto contamina el aire y está prohibida.', efecto: { confianza: 0, tension: 10 } }
        ],
        conceptos: [
          { n: 'Se niega a botar en el estero', claves: ['no botamos', 'no podemos botar', 'en el estero no', 'no al estero', 'contamina', 'infraccion', 'sancion', 'prohibido'] },
          { n: 'Acopio temporal delimitado', claves: ['acopio', 'acopiar', 'amontonar', 'delimitar', 'area delimitada', 'almacenar', 'zona de escombros'] },
          { n: 'Disposición en escombrera autorizada', claves: ['escombrera', 'sitio autorizado', 'botadero autorizado', 'volqueta', 'gestor autorizado', 'municipio'] }
        ],
        evitar: [
          { claves: ['botemos', 'nadie se da cuenta', 'solo esta vez', 'quemar', 'quememos'], fb: 'Botar o quemar escombros es una infracción ambiental.' }
        ],
        modelo: 'No, al estero no se bota nada porque lo contaminamos y nos sancionan. Los acopiamos en un área delimitada de la obra hasta que la volqueta los lleve a la escombrera autorizada.'
      },
      {
        acciones: [
          { icono: '♻️', t: 'Colocar recipientes separados para madera y metal', p: 2, fb: 'Separar en la fuente permite reutilizar y reciclar.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🪵', t: 'Limpiar y apilar la madera de encofrado para reutilizarla', p: 2, fb: 'La madera de encofrado en buen estado sirve para otros vaciados u obras.', efecto: { confianza: 10, tension: -5 } },
          { icono: '🧱', t: 'Echar todo junto al montón de escombros', p: 1, fb: 'Mezclar todo hace perder la posibilidad de reciclar.', efecto: { confianza: 0, tension: 0 } },
          { icono: '⛏️', t: 'Cavar un hoyo y enterrar los restos', p: 0, fb: 'Enterrar residuos afecta el suelo y futuras cimentaciones.', efecto: { confianza: -5, tension: 5 } }
        ],
        conceptos: [
          { n: 'Separa los residuos en la fuente', claves: ['separ', 'separacion', 'clasificar', 'por tipo', 'en la fuente', 'recipientes'] },
          { n: 'Reutiliza la madera', claves: ['reutiliz', 'volver a usar', 'encofrado', 'otra obra', 'aprovechar la madera', 'reusar'] },
          { n: 'Recicla o vende el metal', claves: ['reciclar', 'reciclaje', 'vender', 'chatarra', 'recicladora', 'gestor'] }
        ],
        evitar: [
          { claves: ['enterrar', 'enterremos', 'mezclar todo', 'todo junto'], fb: 'Enterrar o mezclar los residuos impide reciclarlos y daña el suelo.' }
        ],
        modelo: 'Separemos los residuos: la madera de encofrado que esté buena la reutilizamos en otra obra y el metal lo llevamos a reciclar o lo vendemos como chatarra.'
      },
      {
        acciones: [
          { icono: '🕳️', t: 'Excavar una poza de sedimentación lejos del estero', p: 2, fb: 'La poza retiene los sólidos y evita que el agua alcalina llegue al estero.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🪣', t: 'Retirar el sólido seco de la poza y llevarlo al acopio', p: 2, fb: 'El residuo de cemento fraguado se dispone con los escombros.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🚿', t: 'Lavar la concretera con manguera en la orilla del estero', p: 0, fb: 'El agua con cemento es alcalina y daña la vida acuática.', efecto: { confianza: 5, tension: 10 } },
          { icono: '🚫', t: 'Dejar la concretera sin lavar', p: 1, fb: 'El equipo se daña; hay que lavarlo de forma controlada.', efecto: { confianza: -5, tension: 5 } }
        ],
        conceptos: [
          { n: 'Lava en una poza de sedimentación', claves: ['poza', 'sedimentacion', 'sedimentar', 'decantar', 'decantacion', 'piscina', 'tanque de lavado'] },
          { n: 'Lejos del estero', claves: ['lejos del estero', 'alejado', 'no en el estero', 'distancia', 'lejos del agua', 'alcalin', 'vida acuatica'] },
          { n: 'Dispone el residuo sólido con los escombros', claves: ['residuo solido', 'con los escombros', 'secar', 'retirar el solido', 'escombrera', 'disponer'] }
        ],
        evitar: [
          { claves: ['lavar en el estero', 'lavemos en el estero', 'botar al estero', 'no lavar'], fb: 'Lavar en el estero contamina el agua; no lavar daña el equipo.' }
        ],
        modelo: 'Hagamos una poza de sedimentación lejos del estero para lavar la concretera; cuando el residuo se seque, lo retiramos y lo llevamos con los escombros.'
      }
    ]
  },

  'columna': {
    lugar: 'Sala de la vivienda en construcción, frente a la columna',
    fondo: 'obra',
    inicio: { confianza: 65, tension: 35 },
    pasos: [
      {
        acciones: [
          { icono: '📐', t: 'Desplegar los planos estructurales y señalar la columna', p: 2, fb: 'Mostrar en planos cómo baja la carga hasta la cimentación ayuda a entender.', efecto: { confianza: 10, tension: -5 } },
          { icono: '👆', t: 'Indicar con la mano la viga y la zapata que sostiene', p: 2, fb: 'La columna transmite cargas y forma parte del sistema sismorresistente.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🔨', t: 'Tomar el combo y empezar a picar la columna', p: 0, fb: 'Eliminar una columna sin rediseño pone en riesgo la vivienda.', efecto: { confianza: 15, tension: -10 } },
          { icono: '🙅', t: 'Negar con la cabeza y seguir trabajando', p: 1, fb: 'Decir que no sin explicar genera desconfianza.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'La columna transmite cargas', claves: ['carga', 'transmite', 'sostiene', 'soporta', 'cimentacion', 'zapata', 'viga', 'peso'] },
          { n: 'Eliminarla pone en riesgo la vivienda', claves: ['riesgo', 'peligro', 'colapso', 'falla', 'inseguro', 'se puede caer', 'seguridad'] },
          { n: 'Comportamiento ante sismos', claves: ['sismo', 'terremoto', 'sismorresistente', 'temblor', 'nec', 'estructura'] }
        ],
        evitar: [
          { claves: ['yo la quito', 'claro la quitamos', 'la quitamos ya', 'como usted diga', 'el cliente manda'], fb: 'Comprometer la estructura es una falta técnica y ética grave.' }
        ],
        modelo: 'Señora Martínez, esa columna lleva las cargas de la casa hasta la cimentación. Si la quitamos sin un rediseño, la vivienda queda en riesgo, sobre todo en un sismo.'
      },
      {
        acciones: [
          { icono: '📞', t: 'Llamar al ingeniero estructural para una evaluación', p: 2, fb: 'Los cambios estructurales los diseña un profesional calificado.', efecto: { confianza: 10, tension: -5 } },
          { icono: '🧮', t: 'Anotar lo necesario: planos, permiso y presupuesto', p: 2, fb: 'El cambio debe formalizarse con planos, aprobación municipal y costo.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🪵', t: 'Traer un tablón de madera para reemplazar la columna', p: 0, fb: 'Una solución improvisada sin cálculo es peligrosa.', efecto: { confianza: 5, tension: 10 } },
          { icono: '📅', t: 'Prometer hacerlo después de la entrega', p: 0, fb: 'Postergar no elimina el riesgo y oculta el problema.', efecto: { confianza: 5, tension: 5 } }
        ],
        conceptos: [
          { n: 'Consultar al ingeniero estructural', claves: ['ingeniero estructural', 'calculista', 'estructurista', 'profesional', 'especialista', 'evaluar', 'calculo'] },
          { n: 'Alternativa técnica como viga de mayor luz', claves: ['viga', 'mayor luz', 'alternativa', 'rediseno', 'refuerzo', 'transferencia'] },
          { n: 'Formalizar con planos, permiso y presupuesto', claves: ['plano', 'permiso', 'municipio', 'aprobacion', 'presupuesto', 'costo', 'formalizar'] }
        ],
        evitar: [
          { claves: ['viga de madera', 'tablon', 'despues de la entrega', 'improvisar'], fb: 'Las soluciones sin cálculo o postergadas mantienen el riesgo.' }
        ],
        modelo: 'Podría haber una alternativa, como una viga de mayor luz, pero la tiene que evaluar un ingeniero estructural y hacerse con planos, permiso municipal y presupuesto.'
      },
      {
        acciones: [
          { icono: '🎨', t: 'Mostrar ideas para revestir o decorar la columna', p: 2, fb: 'Integrar la columna al diseño interior respeta la estructura.', efecto: { confianza: 10, tension: -10 } },
          { icono: '📓', t: 'Escribir la decisión en el diario de obra', p: 2, fb: 'Documentar las decisiones evita malentendidos.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🧾', t: 'Entregar una factura por el cambio no realizado', p: 0, fb: 'No es ético cobrar trabajos no realizados.', efecto: { confianza: -20, tension: 20 } },
          { icono: '🚶', t: 'Seguir con la obra sin anotar nada', p: 1, fb: 'Sin registro, la decisión puede discutirse después.', efecto: { confianza: 0, tension: 0 } }
        ],
        conceptos: [
          { n: 'Integra la columna al diseño interior', claves: ['integrar', 'diseno interior', 'decorar', 'revestir', 'repisa', 'aprovechar', 'estante', 'mueble'] },
          { n: 'Registra la decisión', claves: ['registr', 'diario de obra', 'libro de obra', 'bitacora', 'por escrito', 'anotar', 'documentar'] },
          { n: 'Respeta la estructura', claves: ['se mantiene', 'mantenemos', 'mantener la columna', 'respetar', 'queda la columna', 'sin tocar', 'segura'] }
        ],
        evitar: [
          { claves: ['le cobro', 'cobrar igual', 'cobrarle'], fb: 'Cobrar un trabajo que no se hizo no es ético.' }
        ],
        modelo: 'Mantenemos la columna y la integramos al diseño, por ejemplo con un revestimiento o una repisa, y dejo registrada la decisión en el diario de obra.'
      }
    ]
  },

  'ladera': {
    lugar: 'Terreno en ladera, al borde de un relleno sobre la quebrada',
    fondo: 'exterior',
    inicio: { confianza: 55, tension: 30 },
    pasos: [
      {
        acciones: [
          { icono: '📏', t: 'Armar el equipo topográfico para el levantamiento', p: 2, fb: 'El levantamiento topográfico permite analizar pendientes y zonas aptas.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🧭', t: 'Medir la pendiente del terreno con el inclinómetro', p: 2, fb: 'La pendiente define dónde y cómo se puede construir.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🏛️', t: 'Pedir el informe de regulación municipal del predio', p: 2, fb: 'El municipio indica si el área es urbanizable y los retiros a la quebrada.', efecto: { confianza: 5, tension: 5 } },
          { icono: '📌', t: 'Clavar estacas en el borde para replantear la casa', p: 0, fb: 'Los bordes de quebrada y los rellenos tienen riesgo de deslizamiento.', efecto: { confianza: 15, tension: -10 } }
        ],
        conceptos: [
          { n: 'Levantamiento topográfico y pendientes', claves: ['topograf', 'levantamiento', 'pendiente', 'curvas de nivel', 'medir el terreno', 'inclinacion'] },
          { n: 'Estudio de suelos', claves: ['estudio de suelo', 'geotecn', 'suelo', 'sondeo', 'perforacion', 'capacidad portante'] },
          { n: 'Revisión municipal y retiros a la quebrada', claves: ['municipio', 'municipal', 'urbanizable', 'retiro', 'irm', 'regulacion', 'uso de suelo', 'riesgo'] }
        ],
        evitar: [
          { claves: ['construyo al borde', 'como usted quiera', 'nunca se puede', 'imposible construir'], fb: 'Ni construir al borde sin estudios ni negar todo: primero se analiza el sitio.' }
        ],
        modelo: 'Antes de diseñar hagamos un levantamiento topográfico, analicemos las pendientes y un estudio de suelos, y revisemos en el municipio si el área es urbanizable y qué retiro exige a la quebrada.'
      },
      {
        acciones: [
          { icono: '🔬', t: 'Contratar un estudio geotécnico con sondeos', p: 2, fb: 'El estudio geotécnico define la cimentación adecuada.', efecto: { confianza: 5, tension: 5 } },
          { icono: '⛏️', t: 'Excavar calicatas hasta encontrar suelo natural firme', p: 2, fb: 'Cimentar en suelo natural evita los asentamientos del relleno.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🧱', t: 'Vaciar las zapatas directamente sobre el relleno', p: 0, fb: 'Un relleno sin compactación controlada puede asentarse.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🔩', t: 'Añadir más varillas a las zapatas', p: 1, fb: 'Más acero no resuelve un suelo inadecuado.', efecto: { confianza: 5, tension: -5 } }
        ],
        conceptos: [
          { n: 'No cimentar sobre el relleno no controlado', claves: ['no sobre el relleno', 'relleno no', 'sin compactacion', 'compactacion controlada', 'asentamiento', 'se puede hundir', 'no es confiable'] },
          { n: 'Cimentar en suelo natural firme', claves: ['suelo natural', 'suelo firme', 'terreno firme', 'llegar a suelo', 'profundizar', 'pilotes', 'estrato'] },
          { n: 'Seguir el estudio geotécnico', claves: ['geotecn', 'estudio de suelo', 'ensayo', 'recomendacion', 'capacidad portante', 'sondeo'] }
        ],
        evitar: [
          { claves: ['ya esta asentado', 'mas hierro', 'mas varilla', 'sobre el relleno'], fb: 'Sin control de compactación no se conoce la capacidad del relleno.' }
        ],
        modelo: 'No conviene cimentar sobre ese relleno sin compactación controlada. Hay que llegar a suelo natural firme o aplicar la solución que indique el estudio geotécnico.'
      },
      {
        acciones: [
          { icono: '💧', t: 'Trazar cunetas y canales para las aguas lluvias', p: 2, fb: 'El agua es la principal causa de deslizamientos en laderas.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🧱', t: 'Revisar los planos del muro de contención diseñado', p: 2, fb: 'Los muros de contención deben diseñarse con cálculo y drenaje.', efecto: { confianza: 5, tension: 0 } },
          { icono: '🚩', t: 'Marcar con banderines el retiro a la quebrada', p: 2, fb: 'Respetar el retiro protege la vivienda y el cauce.', efecto: { confianza: 0, tension: 5 } },
          { icono: '🙈', t: 'Dar el terreno por listo y empezar a construir', p: 0, fb: 'Faltan drenajes, contención y respetar el retiro.', efecto: { confianza: 10, tension: -10 } }
        ],
        conceptos: [
          { n: 'Drenaje de aguas lluvias', claves: ['drenaje', 'drenar', 'aguas lluvia', 'cuneta', 'canal', 'escorrentia', 'subdren'] },
          { n: 'Muros de contención diseñados', claves: ['muro de contencion', 'contencion', 'muro', 'estabiliz', 'talud', 'gavion'] },
          { n: 'Respetar el retiro a la quebrada', claves: ['retiro', 'quebrada', 'margen de proteccion', 'distancia', 'franja', 'borde'] }
        ],
        evitar: [
          { claves: ['nada mas', 'solo plantas', 'con plantas basta'], fb: 'Sin drenaje ni contención la ladera puede deslizarse.' }
        ],
        modelo: 'Hay que drenar bien las aguas lluvias, construir muros de contención diseñados por un ingeniero y respetar el retiro a la quebrada.'
      }
    ]
  },

  'amazonica': {
    lugar: 'Claro de la comunidad kichwa en Pastaza, donde irá la casa comunal',
    fondo: 'comunidad',
    inicio: { confianza: 50, tension: 30 },
    pasos: [
      {
        acciones: [
          { icono: '👂', t: 'Sentarse a escuchar a los mayores de la comunidad', p: 2, fb: 'Escuchar los saberes locales da pertinencia al proyecto.', efecto: { confianza: 15, tension: -10 } },
          { icono: '✏️', t: 'Dibujar un boceto con estructura elevada y techo ventilado', p: 2, fb: 'Combinar la tradición con técnica actual mejora la durabilidad y el confort.', efecto: { confianza: 10, tension: -5 } },
          { icono: '🧱', t: 'Mostrar un catálogo de bloques y hormigón', p: 1, fb: 'Es viable, pero no responde a lo que la comunidad propone ni al clima.', efecto: { confianza: -10, tension: 10 } },
          { icono: '🚫', t: 'Descartar la madera con un gesto', p: 0, fb: 'Bien tratada y protegida, la madera es un material estructural.', efecto: { confianza: -20, tension: 15 } }
        ],
        conceptos: [
          { n: 'Escucha y valora los saberes locales', claves: ['escuchar', 'saberes', 'conocimiento ancestral', 'tradicion', 'como antes', 'comunidad', 'ancestral'] },
          { n: 'Materiales locales tratados', claves: ['madera', 'guadua', 'cana', 'tratad', 'material local', 'materiales de la zona', 'chonta'] },
          { n: 'Diseño adaptado al clima amazónico', claves: ['elevad', 'ventilad', 'cubierta', 'clima', 'humedad', 'lluvia', 'pilotes', 'palafito'] }
        ],
        evitar: [
          { claves: ['la madera no sirve', 'mejor bloque', 'solo hormigon', 'eso ya no se usa'], fb: 'Desestimar los materiales y saberes locales rompe la confianza y la pertinencia.' }
        ],
        modelo: 'Me gustaría escuchar cómo construían antes. Podemos combinar esos saberes con técnicas actuales: madera o guadúa tratadas, estructura elevada y una cubierta ventilada.'
      },
      {
        acciones: [
          { icono: '🧴', t: 'Sumergir la guadúa en un tanque de preservante', p: 2, fb: 'El tratamiento preservante protege contra hongos e insectos.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🪨', t: 'Colocar bases de piedra bajo los postes y prever aleros', p: 2, fb: 'Elevar la estructura del suelo y proteger con aleros evita la pudrición.', efecto: { confianza: 5, tension: -5 } },
          { icono: '🕳️', t: 'Enterrar los postes directamente en el suelo', p: 0, fb: 'Los postes enterrados se pudren rápidamente.', efecto: { confianza: 0, tension: 10 } },
          { icono: '🖌️', t: 'Pintar la madera y darla por protegida', p: 1, fb: 'La pintura ayuda, pero no reemplaza el tratamiento preservante.', efecto: { confianza: 0, tension: 0 } }
        ],
        conceptos: [
          { n: 'Tratamiento preservante', claves: ['preservante', 'preservar', 'tratamiento', 'inmuniz', 'curado', 'sales de boro', 'borax', 'tratar la madera'] },
          { n: 'Elevar la estructura del suelo', claves: ['elevar', 'elevad', 'bases', 'dados', 'zocalo', 'separar del suelo', 'pedestal', 'sobre piedra'] },
          { n: 'Protección con aleros amplios', claves: ['alero', 'volado', 'proteger de la lluvia', 'cubierta amplia', 'techo amplio', 'ventilacion'] }
        ],
        evitar: [
          { claves: ['enterrar los postes', 'directo al suelo', 'solo pintar', 'con pintura basta'], fb: 'Enterrar postes o solo pintarlos no protege la madera.' }
        ],
        modelo: 'Trataremos la madera o la guadúa con preservante, levantaremos la estructura sobre bases para que no toque el suelo y pondremos aleros amplios contra la lluvia.'
      },
      {
        acciones: [
          { icono: '🙌', t: 'Convocar una asamblea para planificar la minga', p: 2, fb: 'Planificar con la comunidad y trabajar en minga asegura la apropiación del proyecto.', efecto: { confianza: 15, tension: -10 } },
          { icono: '🌳', t: 'Verificar la guía de movilización forestal de la madera', p: 2, fb: 'La madera debe provenir de manejo forestal legal (licencia y guía del MAATE).', efecto: { confianza: 5, tension: 5 } },
          { icono: '🪓', t: 'Marcar los árboles más grandes del bosque para talarlos', p: 0, fb: 'La tala sin manejo afecta el bosque y puede ser ilegal.', efecto: { confianza: -10, tension: 15 } },
          { icono: '💼', t: 'Firmar con una constructora de fuera para todo', p: 1, fb: 'Se pierde la participación y apropiación comunitaria.', efecto: { confianza: -10, tension: 5 } }
        ],
        conceptos: [
          { n: 'Planificación participativa', claves: ['planificar', 'asamblea', 'participa', 'junto a la comunidad', 'con la comunidad', 'consensuar', 'decidir juntos'] },
          { n: 'Minga para la mano de obra', claves: ['minga', 'trabajo comunitario', 'mano de obra', 'turnos', 'organizarnos'] },
          { n: 'Madera de manejo forestal legal', claves: ['manejo forestal', 'legal', 'guia de movilizacion', 'maate', 'licencia', 'plan de manejo', 'sostenible'] }
        ],
        evitar: [
          { claves: ['talar', 'tumbar los arboles', 'los mas grandes', 'contratar todo afuera'], fb: 'La tala sin manejo es ilegal y contratar todo afuera quita protagonismo a la comunidad.' }
        ],
        modelo: 'Planifiquemos juntos en asamblea, organicemos la mano de obra en minga y usemos madera que venga de un manejo forestal legal.'
      }
    ]
  }
});
