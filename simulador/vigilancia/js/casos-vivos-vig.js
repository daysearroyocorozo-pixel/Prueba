/* Casos vivos – Vigilancia y Seguridad Ciudadana: escena, acciones y conceptos para responder actuando. */
window.CASOS_VIVOS = Object.assign(window.CASOS_VIVOS || {}, {

  /* ---------- 1. Un compañero quiere «darle una lección» ---------- */
  'fuerza-excesiva': {
    lugar: 'Pasillo lateral del Mercado Municipal de Puyo',
    fondo: 'exterior',
    inicio: { confianza: 55, tension: 70 },
    pasos: [
      {
        acciones: [
          { icono: '✋', t: 'Interponerte con calma entre Byron y el joven', p: 2, fb: 'Proteges la integridad del retenido sin agredir a nadie: es tu deber frente a una persona reducida.', efecto: { confianza: 2, tension: -8 } },
          { icono: '📻', t: 'Llamar por radio a la central para pedir a la Policía', p: 2, fb: 'En flagrancia, la persona debe entregarse de inmediato a la Policía Nacional.', efecto: { confianza: 5, tension: -6 } },
          { icono: '🤜', t: 'Sujetar los brazos del joven como pide Byron', p: 0, fb: 'Participar en la agresión a una persona que no se resiste es una grave violación de derechos humanos.', efecto: { confianza: 10, tension: 15 } },
          { icono: '🙈', t: 'Mirar hacia otro lado y dejar que Byron actúe', p: 0, fb: 'Omitir la protección de una persona bajo tu custodia también genera responsabilidad.', efecto: { confianza: 5, tension: 12 } }
        ],
        conceptos: [
          { n: 'Se niega a agredir al retenido', claves: ['no lo voy a golpear', 'no vamos a golpear', 'no le vamos a pegar', 'me niego', 'no puedo hacer eso', 'nadie lo va a tocar', 'no lo golpeamos', 'ningun golpe'] },
          { n: 'Explica que la fuerza sería ilegal y desproporcionada', claves: ['ilegal', 'desproporcion', 'proporcional', 'no se resiste', 'ya esta reducido', 'uso progresivo', 'innecesari', 'derechos humanos'] },
          { n: 'Propone entregarlo a la Policía', claves: ['policia', 'ecu 911', 'entregar', 'entregamos', 'autoridad', 'flagrancia', 'retenido hasta', 'upc'] }
        ],
        evitar: [
          { claves: ['dale nomas', 'que aprenda', 'se lo merece', 'un par de golpes'], fb: 'Avalar la agresión a una persona reducida es ilegal.' },
          { claves: ['yo lo sujeto', 'agarralo', 'yo lo agarro'], fb: 'Sujetarlo para que otro lo golpee te hace partícipe de la agresión.' }
        ],
        modelo: 'Byron, me niego a hacer eso: el joven ya no se resiste y cualquier golpe sería ilegal y desproporcionado. Lo mantenemos retenido y lo entregamos a la Policía por flagrancia.'
      },
      {
        acciones: [
          { icono: '📘', t: 'Mostrarle el protocolo de uso progresivo de la fuerza', p: 2, fb: 'El protocolo respalda tu postura con una norma institucional, no con una opinión personal.', efecto: { confianza: 6, tension: -6 } },
          { icono: '🗣️', t: 'Hablarle en voz baja, lejos del público', p: 2, fb: 'Corregir en privado evita que se sienta humillado y baja la tensión.', efecto: { confianza: 8, tension: -8 } },
          { icono: '🤐', t: 'Quedarte callado para evitar el conflicto', p: 1, fb: 'El silencio no detiene la conducta; hay que expresar la objeción.', efecto: { confianza: 0, tension: 4 } },
          { icono: '👍', t: 'Darle la razón: «la experiencia manda»', p: 0, fb: 'Normalizar la violencia perpetúa prácticas ilegales.', efecto: { confianza: 8, tension: 10 } }
        ],
        conceptos: [
          { n: 'Responde con respeto al compañero', claves: ['con respeto', 'companero', 'entiendo', 'comprendo', 'te respeto', 'tu experiencia', 'byron'] },
          { n: 'Se apoya en el protocolo y los derechos humanos', claves: ['protocolo', 'derechos humanos', 'uso progresivo', 'la norma', 'la ley', 'reglamento', 'procedimiento'] },
          { n: 'Señala que la norma también protege a los agentes', claves: ['nos protege', 'protegernos', 'denuncia', 'sancion', 'responsabilidad', 'problemas legales', 'perder el trabajo', 'nos pueden juzgar'] }
        ],
        evitar: [
          { claves: ['la experiencia manda', 'tienes razon', 'asi se hace aqui'], fb: 'Avalar prácticas violentas por costumbre las perpetúa.' }
        ],
        modelo: 'Byron, con respeto por tu experiencia, el protocolo de uso progresivo de la fuerza y los derechos humanos son claros, y nos protegen también a nosotros de una denuncia o una sanción.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Redactar el parte con los hechos tal como ocurrieron', p: 2, fb: 'Un parte objetivo es un respaldo legal y una garantía de transparencia.', efecto: { confianza: -6, tension: 6 } },
          { icono: '📞', t: 'Informar al supervisor por el canal interno', p: 2, fb: 'Reportar por la vía formal permite corregir la conducta y prevenir futuras agresiones.', efecto: { confianza: -4, tension: 5 } },
          { icono: '✂️', t: 'Omitir del parte la intención de agresión', p: 1, fb: 'Proteges a un compañero, pero el registro queda incompleto.', efecto: { confianza: 6, tension: -4 } },
          { icono: '✍️', t: 'Escribir que el joven atacó a los vigilantes', p: 0, fb: 'Falsear un parte es una falta grave y puede constituir delito.', efecto: { confianza: 8, tension: 10 } }
        ],
        conceptos: [
          { n: 'Registra los hechos con objetividad', claves: ['parte', 'registr', 'objetiv', 'tal como', 'hechos', 'novedad', 'por escrito'] },
          { n: 'Informa al supervisor por canales formales', claves: ['supervisor', 'jefe de turno', 'canal', 'informe', 'reporte', 'reportar', 'via formal'] },
          { n: 'Rechaza ocultar o falsear información', claves: ['no voy a ocultar', 'no puedo omitir', 'no voy a mentir', 'transparen', 'verdad', 'honest', 'no puedo callar'] }
        ],
        evitar: [
          { claves: ['nos agredio', 'el joven nos ataco', 'pongo que se resistio'], fb: 'Falsear el parte es una falta grave.' },
          { claves: ['no pongo nada', 'quedara entre nosotros'], fb: 'Ocultar hechos resta transparencia y te compromete.' }
        ],
        modelo: 'No voy a ocultar lo que pasó: registro los hechos de forma objetiva en el parte y lo informo al supervisor por el canal formal. Es la verdad y nos protege a todos.'
      }
    ]
  },

  /* ---------- 2. Dinero para cuidar «solo mi local» ---------- */
  'dadiva-comerciante': {
    lugar: 'Pasillo del centro comercial, frente a una tienda de ropa',
    fondo: 'oficina',
    inicio: { confianza: 60, tension: 40 },
    pasos: [
      {
        acciones: [
          { icono: '🙅', t: 'Rechazar el billete con un gesto amable y firme', p: 2, fb: 'Rechazar dádivas protege tu imparcialidad y la del servicio.', efecto: { confianza: -4, tension: 6 } },
          { icono: '📋', t: 'Mostrarle la consigna que cubre todo el sector', p: 2, fb: 'La consigna demuestra que el servicio protege a todos por igual.', efecto: { confianza: 4, tension: -2 } },
          { icono: '💵', t: 'Guardar el billete en el bolsillo', p: 0, fb: 'Recibir pagos por un trato preferente es corrupción.', efecto: { confianza: 12, tension: -8 } },
          { icono: '🤔', t: 'Decirle que lo pensarás', p: 1, fb: 'Dejar abierta la posibilidad alimenta la expectativa de un trato irregular.', efecto: { confianza: 6, tension: -2 } }
        ],
        conceptos: [
          { n: 'Rechaza el dinero', claves: ['no puedo aceptar', 'no acepto', 'rechazo', 'no recibo', 'gracias pero no', 'no puedo recibir', 'sin dinero'] },
          { n: 'Explica la imparcialidad del servicio', claves: ['todo el sector', 'todos por igual', 'igual para todos', 'imparcial', 'sin preferencia', 'todos los locales', 'consigna'] },
          { n: 'Mantiene un trato respetuoso', claves: ['don ernesto', 'con respeto', 'le agradezco', 'entiendo', 'comprendo', 'senor', 'disculpe'] }
        ],
        evitar: [
          { claves: ['trato hecho', 'acepto', 'esta bien le cuido', 'deme'], fb: 'Aceptar una dádiva es corrupción.' }
        ],
        modelo: 'Don Ernesto, le agradezco, pero no puedo aceptar dinero. Mi consigna es cuidar todo el sector por igual, sin preferencia por ningún local.'
      },
      {
        acciones: [
          { icono: '🏛️', t: 'Llamar a los agentes de control municipal', p: 2, fb: 'El control del comercio en el espacio público es competencia del municipio.', efecto: { confianza: 6, tension: -6 } },
          { icono: '🗣️', t: 'Orientar con respeto a los vendedores sobre el paso libre', p: 2, fb: 'Orientar sin agredir mantiene la convivencia y el respeto a los derechos.', efecto: { confianza: 4, tension: -4 } },
          { icono: '👋', t: 'Pedir a los vendedores que se vayan sin explicar', p: 1, fb: 'Sin orientación ni coordinación, el conflicto se repite.', efecto: { confianza: 2, tension: 6 } },
          { icono: '💪', t: 'Empujar a los vendedores fuera de la entrada', p: 0, fb: 'Usar la fuerza sin necesidad es ilegal y discriminatorio.', efecto: { confianza: 8, tension: 18 } }
        ],
        conceptos: [
          { n: 'Reconoce la competencia municipal', claves: ['municip', 'control municipal', 'agentes municipales', 'gad', 'competencia', 'ordenanza', 'comisaria'] },
          { n: 'Ofrece coordinar y orientar', claves: ['coordin', 'orientar', 'oriento', 'hablar con ellos', 'converso', 'informo', 'reubic'] },
          { n: 'Rechaza el uso de la fuerza', claves: ['sin fuerza', 'no puedo usar la fuerza', 'no voy a empujar', 'pacific', 'respeto a los derechos', 'con respeto', 'dialogo'] }
        ],
        evitar: [
          { claves: ['los saco a empujones', 'a la fuerza', 'los boto'], fb: 'El uso de la fuerza contra vendedores pacíficos es ilegal.' }
        ],
        modelo: 'El control del espacio público es competencia de los agentes municipales. Puedo coordinar con ellos y orientar con respeto a los vendedores, pero no voy a empujar a nadie.'
      },
      {
        acciones: [
          { icono: '📝', t: 'Registrar los ofrecimientos en el parte', p: 2, fb: 'Documentar los intentos de soborno protege al agente y a la empresa.', efecto: { confianza: -4, tension: 4 } },
          { icono: '👔', t: 'Informar al supervisor de turno', p: 2, fb: 'El supervisor puede intervenir institucionalmente.', efecto: { confianza: -2, tension: 2 } },
          { icono: '🤝', t: 'Proponer una reunión de seguridad con los comerciantes', p: 2, fb: 'Llevar el tema a un espacio colectivo lo convierte en prevención comunitaria.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🏷️', t: 'Ofrecerle un «precio especial» para que no se queje', p: 0, fb: 'Negociar una dádiva sigue siendo corrupción.', efecto: { confianza: 10, tension: -4 } }
        ],
        conceptos: [
          { n: 'Documenta lo ocurrido', claves: ['parte', 'registr', 'documento', 'por escrito', 'novedad', 'constancia', 'anoto'] },
          { n: 'Informa al supervisor', claves: ['supervisor', 'jefe', 'empresa', 'superior', 'informo', 'reporto', 'reportar'] },
          { n: 'Propone coordinación comunitaria', claves: ['reunion', 'comerciantes', 'todos los locales', 'plan de seguridad', 'coordin', 'comunitari', 'asamblea'] }
        ],
        evitar: [
          { claves: ['precio especial', 'le cobro menos', 'arreglemos'], fb: 'Cualquier pago por trato preferente es corrupción.' }
        ],
        modelo: 'Voy a registrar los ofrecimientos en el parte e informar al supervisor. Además propongo una reunión con todos los comerciantes para coordinar un plan de seguridad del sector.'
      }
    ]
  },

  /* ---------- 3. Un adolescente sorprendido hurtando ---------- */
  'adolescente-hurto': {
    lugar: 'Tienda de víveres del centro comercial',
    fondo: 'oficina',
    inicio: { confianza: 25, tension: 75 },
    pasos: [
      {
        acciones: [
          { icono: '🚪', t: 'Llevarlo a un espacio reservado, lejos del público', p: 2, fb: 'Proteger la identidad y la dignidad del adolescente es una obligación legal.', efecto: { confianza: 10, tension: -10 } },
          { icono: '🧘', t: 'Bajar el tono de voz y hablarle con calma', p: 2, fb: 'La calma desescala el forcejeo y genera confianza.', efecto: { confianza: 8, tension: -8 } },
          { icono: '🚷', t: 'Retenerlo en la puerta a la vista de todos', p: 1, fb: 'Retenerlo en público lo expone innecesariamente.', efecto: { confianza: -4, tension: 6 } },
          { icono: '📢', t: 'Gritarle «ladrón» delante de los clientes', p: 0, fb: 'Exponer a un adolescente vulnera su dignidad y su derecho a la imagen.', efecto: { confianza: -18, tension: 18 } }
        ],
        conceptos: [
          { n: 'Le da calma y seguridad', claves: ['tranquilo', 'calma', 'nadie te va a lastimar', 'no te va a pasar nada', 'estas seguro', 'no te voy a hacer dano', 'respira'] },
          { n: 'Lo protege de la exposición pública', claves: ['lugar reservado', 'aparte', 'en privado', 'lejos de la gente', 'sin que nadie', 'no te van a ver', 'reservado'] },
          { n: 'Le explica qué sucede', claves: ['te explico', 'lo que pasa', 'vamos a llamar', 'tu mama', 'tus padres', 'representante', 'lo que va a pasar'] }
        ],
        evitar: [
          { claves: ['ladron', 'delincuente', 'rata'], fb: 'Etiquetar y humillar a un adolescente vulnera su dignidad.' }
        ],
        modelo: 'Tranquilo, Kevin, nadie te va a lastimar. Vamos a un lugar reservado, lejos de la gente, y te explico lo que va a pasar: tenemos que llamar a tu mamá.'
      },
      {
        acciones: [
          { icono: '👂', t: 'Escucharlo sin interrumpir ni juzgar', p: 2, fb: 'La escucha permite identificar una posible situación de vulnerabilidad.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📞', t: 'Llamar a la Policía especializada en niñez', p: 2, fb: 'Los adolescentes tienen un régimen especial y personal especializado.', efecto: { confianza: 2, tension: 2 } },
          { icono: '💲', t: 'Pedirle que pague y dejarlo ir', p: 1, fb: 'No se activa la protección ni se informa a sus representantes.', efecto: { confianza: 4, tension: -2 } },
          { icono: '⛓️', t: 'Amenazarlo con la cárcel de adultos', p: 0, fb: 'Amenazar a un adolescente es inadecuado y falso: tiene un régimen especial.', efecto: { confianza: -15, tension: 15 } }
        ],
        conceptos: [
          { n: 'Escucha sin juzgar', claves: ['te escucho', 'entiendo', 'comprendo', 'cuentame', 'gracias por contarme', 'no te juzgo'] },
          { n: 'Activa a la autoridad especializada', claves: ['policia especializada', 'dinapen', 'ninez', 'policia', 'ecu 911', 'autoridad', 'junta cantonal'] },
          { n: 'Contacta a sus representantes', claves: ['tu mama', 'tus padres', 'representante', 'familia', 'tu papa', 'algun familiar', 'llamar a tu casa'] }
        ],
        evitar: [
          { claves: ['vas preso', 'carcel', 'como un adulto'], fb: 'Amenazar a un adolescente es inadecuado.' }
        ],
        modelo: 'Te escucho y entiendo que la situación en tu casa es difícil. Por tu protección voy a avisar a la Policía especializada en niñez y llamar a tu mamá o a tu representante.'
      },
      {
        acciones: [
          { icono: '📵', t: 'Pedir al dueño que no publique la foto', p: 2, fb: 'La identidad de niñas, niños y adolescentes está protegida por ley.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📝', t: 'Registrar los hechos en el parte', p: 2, fb: 'El registro objetivo respalda la actuación y la entrega del caso.', efecto: { confianza: 2, tension: -2 } },
          { icono: '🌫️', t: 'Sugerir publicar la foto con la cara borrosa', p: 1, fb: 'Aun difuminada, la publicación puede identificarlo.', efecto: { confianza: 0, tension: 4 } },
          { icono: '📤', t: 'Enviarle al dueño la foto que tomaste', p: 0, fb: 'Difundir la imagen de un adolescente es una grave vulneración de derechos.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Prohíbe difundir la imagen', claves: ['no puede publicar', 'prohibido', 'no publique', 'no se puede difundir', 'su imagen', 'identidad', 'foto'] },
          { n: 'Fundamenta en la protección de la niñez', claves: ['codigo de la ninez', 'adolescente', 'menor de edad', 'derechos', 'proteccion', 'ninos ninas'] },
          { n: 'Registra y entrega a la autoridad', claves: ['parte', 'registr', 'autoridad', 'policia', 'entrego', 'fiscalia', 'informe'] }
        ],
        evitar: [
          { claves: ['publiquela', 'subala', 'le paso la foto'], fb: 'Difundir la imagen de un adolescente vulnera sus derechos.' }
        ],
        modelo: 'Señor, no puede publicar la foto: está prohibido difundir la imagen de un adolescente según el Código de la Niñez. Yo registro los hechos en el parte y el caso queda en manos de la autoridad.'
      }
    ]
  },

  /* ---------- 4. Una vecina denuncia violencia en casa ---------- */
  'violencia-intrafamiliar': {
    lugar: 'Calle del barrio Obrero de Puyo, durante la ronda nocturna',
    fondo: 'comunidad',
    inicio: { confianza: 50, tension: 70 },
    pasos: [
      {
        acciones: [
          { icono: '📞', t: 'Llamar de inmediato al ECU 911', p: 2, fb: 'La violencia intrafamiliar requiere la intervención inmediata de la Policía.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🗒️', t: 'Anotar la dirección y lo que escuchó la vecina', p: 2, fb: 'Datos precisos agilizan la respuesta del operador y de la Policía.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🚪', t: 'Ir solo a golpear la puerta de la casa', p: 1, fb: 'Ir solo te expone y puede agravar la situación sin la autoridad.', efecto: { confianza: 2, tension: 10 } },
          { icono: '🤷', t: 'Decirle que son problemas de pareja', p: 0, fb: 'La violencia doméstica no es un asunto privado: es un delito y vulnera derechos.', efecto: { confianza: -18, tension: 15 } }
        ],
        conceptos: [
          { n: 'Agradece y toma en serio el aviso', claves: ['gracias', 'hizo bien', 'es importante', 'tiene razon', 'lo tomo en serio', 'le agradezco'] },
          { n: 'Llama al ECU 911 o a la Policía', claves: ['911', 'ecu', 'policia', 'llamo', 'llamar', 'autoridad', 'patrullero'] },
          { n: 'Toma datos sin exponerse ni exponerla', claves: ['direccion', 'datos', 'que escucho', 'cuantas personas', 'ninos', 'me quedo cerca', 'sin riesgo', 'distancia'] }
        ],
        evitar: [
          { claves: ['problemas de pareja', 'no nos metamos', 'es su vida privada'], fb: 'La violencia intrafamiliar no es un asunto privado.' }
        ],
        modelo: 'Gracias, hizo bien en avisar. Llamo ahora mismo al ECU 911 para que venga la Policía; deme la dirección y dígame qué escuchó y si hay niños. Me quedo cerca, a distancia y sin riesgo.'
      },
      {
        acciones: [
          { icono: '🛡️', t: 'Llevar a la niña a un lugar seguro y visible', p: 2, fb: 'La protección inmediata del menor es la prioridad.', efecto: { confianza: 10, tension: -8 } },
          { icono: '📻', t: 'Informar al operador que hay niños en riesgo', p: 2, fb: 'Esa información cambia la prioridad y el tipo de apoyo que se envía.', efecto: { confianza: 4, tension: -4 } },
          { icono: '❓', t: 'Preguntarle con detalle qué le hace su papá', p: 1, fb: 'Interrogar a un menor puede revictimizarla; lo hacen profesionales.', efecto: { confianza: -4, tension: 8 } },
          { icono: '🏠', t: 'Decirle que vuelva a su casa', p: 0, fb: 'Devolverla a un entorno de violencia la pone en peligro.', efecto: { confianza: -15, tension: 15 } }
        ],
        conceptos: [
          { n: 'La tranquiliza y la protege', claves: ['estas a salvo', 'conmigo', 'tranquila', 'aqui estas segura', 'te cuido', 'no estas sola', 'nadie te va a hacer dano'] },
          { n: 'No la interroga', claves: ['no tienes que contarme', 'no hace falta que', 'no te voy a preguntar', 'cuando quieras', 'solo si quieres'] },
          { n: 'Espera a la Policía y activa la ayuda', claves: ['policia', 'ya vienen', 'ayuda', 'ecu', 'esperamos', 'van a llegar'] }
        ],
        evitar: [
          { claves: ['vuelve a tu casa', 'regresa con tu mama', 'que te hizo tu papa'], fb: 'No la devuelvas al riesgo ni la interrogues.' }
        ],
        modelo: 'Tranquila, aquí estás segura conmigo y no estás sola. No tienes que contarme nada; ya viene la Policía con ayuda y esperamos juntos.'
      },
      {
        acciones: [
          { icono: '📇', t: 'Darle a la vecina los contactos de las rutas de protección', p: 2, fb: 'Conocer las rutas de protección fortalece la respuesta comunitaria.', efecto: { confianza: 10, tension: -6 } },
          { icono: '🔒', t: 'Registrar la novedad con reserva', p: 2, fb: 'La confidencialidad protege a la víctima.', efecto: { confianza: 4, tension: -4 } },
          { icono: '👌', t: 'Decirle que la Policía se encarga y nada más', p: 1, fb: 'Es cierto, pero falta orientar sobre las rutas de protección.', efecto: { confianza: 0, tension: 0 } },
          { icono: '💬', t: 'Contar lo ocurrido en el grupo del barrio', p: 0, fb: 'Difundir la situación vulnera la intimidad y pone en riesgo a la víctima.', efecto: { confianza: -12, tension: 12 } }
        ],
        conceptos: [
          { n: 'Orienta sobre las rutas de protección', claves: ['junta cantonal', 'fiscalia', 'proteccion de derechos', 'ruta', 'denuncia', 'centro de atencion', 'medidas de proteccion'] },
          { n: 'Explica que puede ser testigo', claves: ['testigo', 'declarar', 'su testimonio', 'puede contar lo que', 'rendir version'] },
          { n: 'Garantiza la confidencialidad', claves: ['reserva', 'confidencial', 'discrecion', 'no comentar', 'privacidad', 'proteger a la familia'] }
        ],
        evitar: [
          { claves: ['lo cuento en el grupo', 'publicar', 'que todos sepan'], fb: 'Difundir el caso pone en riesgo a la víctima.' }
        ],
        modelo: 'Usted puede declarar como testigo. Existen la Junta Cantonal de Protección de Derechos, la Fiscalía y el 911 para pedir medidas de protección. Yo registro la novedad con reserva y le pido no comentar el caso.'
      }
    ]
  },

  /* ---------- 5. El video de un detenido en redes ---------- */
  'video-detenido': {
    lugar: 'Caseta de vigilancia del Parque Central de Puyo',
    fondo: 'exterior',
    inicio: { confianza: 65, tension: 35 },
    pasos: [
      {
        acciones: [
          { icono: '✋', t: 'Pedirle que no suba el video', p: 2, fb: 'Detener la publicación evita un daño difícil de revertir.', efecto: { confianza: -4, tension: 6 } },
          { icono: '⚖️', t: 'Explicarle la presunción de inocencia', p: 2, fb: 'Nadie es culpable hasta que un juez lo declare; exponerlo vulnera ese derecho.', efecto: { confianza: 4, tension: -2 } },
          { icono: '🏷️', t: 'Sugerir subirlo sin etiquetar a la empresa', p: 1, fb: 'Sin etiqueta, igual se vulneran los derechos de la persona grabada.', efecto: { confianza: 6, tension: -2 } },
          { icono: '🚀', t: 'Animarla a publicarlo con el nombre del detenido', p: 0, fb: 'Exponer nombre e imagen de un detenido vulnera derechos.', efecto: { confianza: 10, tension: -6 } }
        ],
        conceptos: [
          { n: 'Le pide no publicar', claves: ['no lo subas', 'no lo publiques', 'no publicar', 'mejor no', 'no se puede publicar', 'no lo compartas'] },
          { n: 'Menciona la presunción de inocencia y los derechos', claves: ['presuncion de inocencia', 'inocen', 'derechos', 'dignidad', 'honra', 'no es culpable'] },
          { n: 'Protege los datos personales y la investigación', claves: ['datos personales', 'proteccion de datos', 'su imagen', 'investigacion', 'proceso', 'privacidad'] }
        ],
        evitar: [
          { claves: ['subelo', 'publicalo', 'que se haga viral'], fb: 'Publicar el video vulnera derechos.' }
        ],
        modelo: 'Jessica, no lo publiques: esa persona tiene derecho a la presunción de inocencia y su imagen es un dato personal protegido. Además podría afectar la investigación.'
      },
      {
        acciones: [
          { icono: '💾', t: 'Guardar el archivo original sin editar', p: 2, fb: 'Un video íntegro conserva su valor como posible evidencia.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🗂️', t: 'Anotar fecha, hora y quién lo grabó', p: 2, fb: 'Los datos de origen son parte de la cadena de custodia.', efecto: { confianza: 4, tension: -2 } },
          { icono: '🎵', t: 'Editarlo con música para que se vea mejor', p: 1, fb: 'Editar el video altera la evidencia.', efecto: { confianza: 2, tension: 2 } },
          { icono: '🗑️', t: 'Borrarlo para no tener problemas', p: 0, fb: 'Destruir una posible evidencia perjudica la investigación.', efecto: { confianza: -6, tension: 6 } }
        ],
        conceptos: [
          { n: 'Conserva el video íntegro', claves: ['sin editar', 'original', 'integro', 'tal cual', 'no lo borres', 'guardarlo', 'guardamos'] },
          { n: 'Registra los datos de origen', claves: ['fecha', 'hora', 'quien lo grabo', 'registr', 'anotamos', 'acta'] },
          { n: 'Lo entrega a la autoridad con cadena de custodia', claves: ['cadena de custodia', 'policia', 'fiscalia', 'autoridad', 'entregar', 'entregamos'] }
        ],
        evitar: [
          { claves: ['lo editamos', 'le pongo musica', 'borralo'], fb: 'Editar o borrar altera o destruye la evidencia.' }
        ],
        modelo: 'Sí puede servir: lo guardamos original y sin editar, anotamos la fecha, la hora y quién lo grabó, y lo entregamos solo a la Policía o a la Fiscalía con cadena de custodia.'
      },
      {
        acciones: [
          { icono: '👔', t: 'Informar al supervisor de la filtración', p: 2, fb: 'La gestión institucional evita nuevas filtraciones.', efecto: { confianza: 2, tension: -4 } },
          { icono: '📜', t: 'Proponer un protocolo sobre celulares y grabaciones', p: 2, fb: 'Una regla clara previene que vuelva a ocurrir.', efecto: { confianza: 6, tension: -4 } },
          { icono: '✉️', t: 'Escribir al compañero que lo borre, sin avisar', p: 1, fb: 'Ayuda, pero no previene que vuelva a pasar.', efecto: { confianza: 2, tension: 0 } },
          { icono: '🔁', t: 'Reenviar el video a tus amigos', p: 0, fb: 'Cada reenvío amplía el daño.', efecto: { confianza: -10, tension: 10 } }
        ],
        conceptos: [
          { n: 'Informa al supervisor', claves: ['supervisor', 'jefe', 'empresa', 'informo', 'reporto', 'avisar'] },
          { n: 'Pide eliminarlo de los chats', claves: ['eliminar', 'borrar del grupo', 'que lo borren', 'eliminen', 'retirar', 'dejar de compartir'] },
          { n: 'Propone una regla o protocolo interno', claves: ['protocolo', 'regla', 'norma interna', 'disposicion', 'politica', 'capacitacion'] }
        ],
        evitar: [
          { claves: ['ya circula', 'lo reenvio', 'que mas da'], fb: 'Reenviar amplía el daño.' }
        ],
        modelo: 'Voy a informar al supervisor para que pida eliminar el video de todos los chats, y propongo un protocolo interno sobre el uso de celulares y grabaciones.'
      }
    ]
  },

  /* ---------- 6. Plan de seguridad en la asamblea barrial ---------- */
  'asamblea-barrial': {
    lugar: 'Casa comunal del barrio Obrero, Puyo',
    fondo: 'comunidad',
    inicio: { confianza: 50, tension: 60 },
    pasos: [
      {
        acciones: [
          { icono: '🗺️', t: 'Desplegar un mapa grande del barrio', p: 2, fb: 'El mapeo participativo permite ubicar lugares de riesgo.', efecto: { confianza: 10, tension: -6 } },
          { icono: '📊', t: 'Mostrar los datos de novedades del sector', p: 2, fb: 'Los datos de los partes complementan la percepción de los vecinos.', efecto: { confianza: 6, tension: -4 } },
          { icono: '📹', t: 'Proponer solo comprar más cámaras', p: 1, fb: 'La tecnología ayuda, pero sin diagnóstico es insuficiente.', efecto: { confianza: 2, tension: 2 } },
          { icono: '🚓', t: 'Decir que la seguridad es solo tarea de la Policía', p: 0, fb: 'La seguridad ciudadana es corresponsabilidad entre Estado y comunidad.', efecto: { confianza: -15, tension: 12 } }
        ],
        conceptos: [
          { n: 'Propone un diagnóstico participativo', claves: ['diagnostico', 'participativ', 'todos participen', 'entre todos', 'escuchar a los vecinos', 'identificar'] },
          { n: 'Mapea lugares y horarios de riesgo', claves: ['mapa', 'lugares', 'horarios', 'puntos de riesgo', 'zonas', 'donde y cuando'] },
          { n: 'Usa datos y registros', claves: ['datos', 'registros', 'novedades', 'partes', 'estadistic', 'informacion'] }
        ],
        evitar: [
          { claves: ['es trabajo de la policia', 'solo la policia', 'no es problema de ustedes'], fb: 'La seguridad es corresponsabilidad.' }
        ],
        modelo: 'Empecemos con un diagnóstico participativo: en este mapa del barrio cada vecino marca los lugares y horarios de riesgo, y lo comparamos con los datos de las novedades registradas.'
      },
      {
        acciones: [
          { icono: '🧘', t: 'Pedir la palabra y hablar con calma', p: 2, fb: 'La calma reorienta la indignación sin confrontar.', efecto: { confianza: 6, tension: -8 } },
          { icono: '📲', t: 'Proponer una red de alerta con el ECU 911', p: 2, fb: 'Una alternativa legal y eficaz responde a la preocupación de fondo.', efecto: { confianza: 8, tension: -6 } },
          { icono: '🔀', t: 'Cambiar de tema para evitar la discusión', p: 1, fb: 'La idea queda sin respuesta.', efecto: { confianza: -2, tension: 4 } },
          { icono: '👏', t: 'Aplaudir la propuesta del vecino', p: 0, fb: 'Avalar el linchamiento es ilegal y peligroso.', efecto: { confianza: 8, tension: 15 } }
        ],
        conceptos: [
          { n: 'Explica que la justicia por mano propia es delito', claves: ['mano propia', 'delito', 'ilegal', 'linchamiento', 'nadie puede castigar', 'no esta permitido'] },
          { n: 'Recuerda el respeto a los derechos', claves: ['derechos', 'derechos humanos', 'debido proceso', 'dignidad', 'justicia la imparten', 'jueces'] },
          { n: 'Propone una alternativa legal', claves: ['red de alerta', 'alarma comunitaria', 'ecu 911', 'policia', 'upc', 'denuncia', 'llamar'] }
        ],
        evitar: [
          { claves: ['tiene razon', 'a veces es necesario', 'denle su merecido'], fb: 'Avalar la violencia es ilegal.' }
        ],
        modelo: 'Entiendo la indignación, pero la justicia por mano propia es un delito y vulnera los derechos humanos. Propongo una red de alerta comunitaria conectada con el ECU 911 y la Policía.'
      },
      {
        acciones: [
          { icono: '📋', t: 'Escribir en un papelógrafo acciones, responsables y fechas', p: 2, fb: 'Un plan con responsables y cronograma permite el seguimiento.', efecto: { confianza: 10, tension: -8 } },
          { icono: '💡', t: 'Proponer gestionar mejor iluminación con el municipio', p: 2, fb: 'La prevención situacional reduce oportunidades de delito.', efecto: { confianza: 6, tension: -4 } },
          { icono: '🧍', t: 'Decir que cada vecino se cuide como pueda', p: 1, fb: 'Sin organización colectiva no hay plan.', efecto: { confianza: -4, tension: 4 } },
          { icono: '🔫', t: 'Sugerir formar grupos de vecinos armados', p: 0, fb: 'Las armas en manos de civiles sin control aumentan la violencia y es ilegal.', efecto: { confianza: -10, tension: 18 } }
        ],
        conceptos: [
          { n: 'Propone acciones preventivas concretas', claves: ['iluminacion', 'luminaria', 'alarma', 'rondas', 'recuperar el parque', 'charlas', 'limpieza'] },
          { n: 'Asigna responsables y fechas', claves: ['responsable', 'fecha', 'cronograma', 'quien hace', 'plazo', 'comision'] },
          { n: 'Prevé seguimiento y evaluación', claves: ['evaluacion', 'evaluar', 'seguimiento', 'cada mes', 'mensual', 'indicador', 'revisar'] }
        ],
        evitar: [
          { claves: ['armarse', 'armados', 'cada quien se cuide'], fb: 'Las armas o el individualismo no son un plan.' }
        ],
        modelo: 'Pongamos acciones con responsables y fechas: gestionar más iluminación, alarmas comunitarias, rondas coordinadas y charlas de prevención, con una evaluación cada mes.'
      }
    ]
  }
});
