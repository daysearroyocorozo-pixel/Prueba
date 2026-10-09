/* Prácticas por asignatura – Control de Incendios y Operaciones de Rescate (PAO 1–2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([

  /* ================= CIOR-101 Educación Ciudadana y Orden Público ================= */
  {
    id: 'asig-CIOR-101', cod: 'CIOR-101',
    titulo: 'Comerciante que no quiere evacuar el mercado',
    asignaturas: ['CIOR-101'],
    persona: { nombre: 'Don Segundo Tanguila', rol: 'Comerciante del mercado de Puyo', avatar: '👨🏽‍🦳', pitch: 0.85 },
    contexto: 'Hay humo en un puesto de comida del mercado central de Puyo y se ordenó evacuar el pabellón. Don Segundo se niega a salir sin su mercadería, llega la Policía y un vecino empieza a grabar. Debes mediar, coordinar con las otras instituciones y actuar con apego a los derechos.',
    objetivo: 'Aplicar derechos y deberes ciudadanos, el marco jurídico de la respuesta, la coordinación interinstitucional y la mediación de conflictos en emergencia.',
    pasos: [
      { dice: '¡Yo de aquí no me muevo! Esta es mi mercadería, es todo lo que tengo. Ustedes no tienen derecho a sacarme.', opciones: [
          { t: 'Presentarme, escucharle con calma, explicarle el riesgo y que la evacuación protege su vida, y ofrecerle anotar su puesto para proteger sus bienes.', p: 2, r: 'Bueno... si usted me anota el puesto, salgo. Pero rápido.', fb: 'La mediación inicia con escucha activa y respeto: el derecho a la vida prima y el deber ciudadano de acatar disposiciones de seguridad se explica, no se impone a gritos.' },
          { t: 'Decirle que es orden del jefe y que debe salir ya.', p: 1, r: '¿Y quién es su jefe? A mí nadie me explica nada.', fb: 'La orden es legítima, pero sin explicación del riesgo genera resistencia. Falta la mediación.' },
          { t: 'Sacarlo a empujones para no perder tiempo.', p: 0, r: '¡Me está maltratando! ¡Abuso!', fb: 'El uso de la fuerza no corresponde al bombero; vulnera derechos y escala el conflicto. Si hay negativa persistente se coordina con la Policía.' } ] },
      { dice: '(Llega un policía.) Policía: —¿Quién está a cargo aquí? Nosotros vamos a cerrar todo el mercado.', opciones: [
          { t: 'Informarle que el comandante del incidente es mi oficial, ubicarle en el puesto de comando y pedirle apoyo en el perímetro y control de tránsito.', p: 2, r: 'Perfecto, ponemos el cordón en la calle Atahualpa y coordinamos por ECU 911.', fb: 'La coordinación interinstitucional define roles: bomberos atienden el fuego, Policía el orden público y perímetro, ECU 911 articula recursos. Un solo mando unificado.' },
          { t: 'Decirle que hable con cualquiera de los bomberos.', p: 1, r: 'Necesito un responsable, no cualquiera.', fb: 'Sin canal claro de mando la coordinación se pierde. Hay que derivar al comando del incidente.' },
          { t: 'Decirle que esto es asunto de bomberos y que no se meta.', p: 0, r: 'Entonces arréglense solos.', fb: 'Rechazar a otra institución rompe la colaboración y deja sin control el orden público.' } ] },
      { dice: '(Un vecino graba con el celular.) Vecino: —¡Miren, los bomberos están sacando las cosas de la gente! ¡Seguro se las roban!', opciones: [
          { t: 'Responderle con respeto, explicar que solo retiramos lo que pone en riesgo, que se levanta un registro de bienes con la Policía y pedirle que grabe desde fuera del perímetro.', p: 2, r: 'Ah, bueno, si hay un registro... me hago para atrás.', fb: 'La transparencia y el comportamiento ético del socorrista generan confianza. Grabar es un derecho, pero dentro del perímetro de seguridad no.' },
          { t: 'Ignorarlo y seguir trabajando.', p: 1, r: '¡Ven, ni contestan! Algo esconden.', fb: 'No confrontar está bien, pero perder la oportunidad de informar alimenta la desconfianza.' },
          { t: 'Quitarle el celular para que no grabe.', p: 0, r: '¡Me quitó el teléfono! ¡Esto se va a saber!', fb: 'Retener un bien ajeno vulnera derechos y expone al bombero a sanciones. Nunca se decomisan teléfonos.' } ] }
    ],
    vivo: {
      lugar: 'Pabellón de comidas del mercado central de Puyo', fondo: 'comunidad',
      inicio: { confianza: 30, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🙋', t: 'Presentarme con nombre y cargo', p: 2, fb: 'Identificarse da legitimidad y abre la conversación.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📝', t: 'Anotar el número de su puesto y bienes', p: 2, fb: 'Atiende su preocupación real y facilita la evacuación.', efecto: { confianza: 8, tension: -8 } },
            { icono: '📢', t: 'Repetir la orden sin explicar el riesgo', p: 1, fb: 'La orden es válida pero no persuade.', efecto: { confianza: -2, tension: 4 } },
            { icono: '💪', t: 'Jalarlo del brazo hacia la salida', p: 0, fb: 'Uso de la fuerza indebido; vulnera derechos.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Escucha y respeto', claves: ['entiendo', 'comprendo', 'escucho', 'respeto', 'tranquilo', 'calma', 'se lo que'] },
            { n: 'Derecho a la vida y riesgo', claves: ['vida', 'riesgo', 'peligro', 'humo', 'seguridad', 'proteger', 'integridad'] },
            { n: 'Protección de sus bienes', claves: ['anot', 'registr', 'puesto', 'mercaderia', 'bienes', 'cuidar', 'custodia'] }
          ],
          evitar: [ { claves: ['a la fuerza', 'le saco', 'no me importa'], fb: 'Amenazar o desestimar su preocupación escala el conflicto.' } ],
          modelo: 'Don Segundo, soy bombero y entiendo su preocupación. El humo pone en riesgo su vida; salgamos ahora y yo anoto su puesto y su mercadería para que quede registrada y cuidada.'
        },
        {
          acciones: [
            { icono: '🧭', t: 'Llevar al policía al puesto de comando', p: 2, fb: 'Integra a la Policía al mando unificado.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚧', t: 'Pedir apoyo en perímetro y tránsito', p: 2, fb: 'Asigna la función propia de la Policía.', efecto: { confianza: 6, tension: -5 } },
            { icono: '🤷', t: 'Decirle que pregunte a otro bombero', p: 1, fb: 'No da un canal claro de coordinación.', efecto: { confianza: -3, tension: 3 } },
            { icono: '🙅', t: 'Pedirle que se retire del lugar', p: 0, fb: 'Rechaza la colaboración interinstitucional.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Mando unificado', claves: ['comandante', 'comando', 'a cargo', 'oficial', 'puesto de comando', 'mando'] },
            { n: 'Rol de cada institución', claves: ['perimetro', 'cordon', 'transito', 'orden publico', 'acordonar', 'control'] },
            { n: 'Coordinación con ECU 911', claves: ['ecu', '911', 'coordin', 'radio', 'articul', 'comunic'] }
          ],
          evitar: [ { claves: ['no se meta', 'no es su asunto'], fb: 'Excluir a otra institución rompe la coordinación.' } ],
          modelo: 'Mi teniente es el comandante del incidente, le llevo al puesto de comando. Les pedimos apoyo con el perímetro y el tránsito, y coordinamos por ECU 911.'
        },
        {
          acciones: [
            { icono: '🗣️', t: 'Explicar al vecino qué estamos haciendo', p: 2, fb: 'La transparencia reduce rumores.', efecto: { confianza: 10, tension: -8 } },
            { icono: '📋', t: 'Mostrar el registro de bienes con la Policía', p: 2, fb: 'Evidencia de actuación ética.', efecto: { confianza: 8, tension: -6 } },
            { icono: '👀', t: 'Seguir trabajando sin responder', p: 1, fb: 'Evita el choque pero no informa.', efecto: { confianza: -2, tension: 2 } },
            { icono: '📵', t: 'Quitarle el celular al vecino', p: 0, fb: 'Vulnera derechos; prohibido.', efecto: { confianza: -20, tension: 18 } }
          ],
          conceptos: [
            { n: 'Transparencia y ética', claves: ['solo retiramos', 'explic', 'transparen', 'honest', 'nadie se lleva', 'etica'] },
            { n: 'Registro con la Policía', claves: ['registro', 'acta', 'inventario', 'policia', 'anotado', 'constancia'] },
            { n: 'Grabar fuera del perímetro', claves: ['puede grabar', 'fuera', 'perimetro', 'distancia', 'atras', 'zona segura'] }
          ],
          evitar: [ { claves: ['deje de grabar', 'borre el video'], fb: 'Grabar es un derecho; solo se le pide ubicarse en zona segura.' } ],
          modelo: 'Vecino, solo retiramos lo que pone en riesgo la estructura y todo queda en un registro junto con la Policía. Puede grabar, pero por favor desde fuera del perímetro, por su seguridad.'
        }
      ]
    }
  },

  /* ================= CIOR-102 Matemáticas ================= */
  {
    id: 'asig-CIOR-102', cod: 'CIOR-102',
    titulo: 'Cálculos rápidos en la autobomba',
    asignaturas: ['CIOR-102'],
    persona: { nombre: 'Tnte. Paúl Cerda', rol: 'Oficial de la autobomba', avatar: '👨🏽‍🚒', pitch: 0.95 },
    contexto: 'En un incendio de pastizal en la vía Puyo–Macas, tu oficial te pide cálculos en voz alta: tiempo de agua del tanque, área afectada y posición de la escalera. Debes decir el resultado y el procedimiento.',
    objetivo: 'Aplicar ecuaciones, geometría y trigonometría a decisiones operativas reales.',
    pasos: [
      { dice: 'El tanque tiene 3000 litros y la línea de ataque descarga 150 litros por minuto. ¿Cuánto tiempo de agua tenemos?', opciones: [
          { t: 'Divido 3000 entre 150: tenemos 20 minutos; aviso que hay que pedir abastecimiento antes de los 15.', p: 2, r: 'Correcto, 20 minutos. Pide el tanquero ya.', fb: 'Tiempo = volumen / caudal = 3000 L ÷ 150 L/min = 20 min. Anticipar el abastecimiento es parte de la decisión.' },
          { t: 'Unos 20 minutos, más o menos.', p: 1, r: 'Bien, pero dime cómo lo sacaste.', fb: 'El resultado es correcto pero sin procedimiento no se puede verificar ni ajustar.' },
          { t: 'Como 2 horas, el tanque es grande.', p: 0, r: '¡Nos vamos a quedar secos en medio ataque!', fb: 'Error de cálculo grave: 3000/150 = 20 min. Un mal cálculo pone en riesgo al equipo.' } ] },
      { dice: 'La zona quemada es casi un rectángulo de 40 metros por 25 metros. ¿Qué área reporto al ECU 911?', opciones: [
          { t: 'Multiplico 40 por 25: son 1000 metros cuadrados, es decir 0,1 hectáreas.', p: 2, r: 'Perfecto, reporto mil metros cuadrados.', fb: 'Área del rectángulo = base × altura = 1000 m²; 1 ha = 10 000 m², así que 0,1 ha.' },
          { t: 'Son 1000, creo.', p: 1, r: '¿Mil qué? Dame unidades.', fb: 'Faltan unidades y procedimiento: un reporte técnico siempre lleva unidades.' },
          { t: 'Sumo 40 más 25: 65 metros cuadrados.', p: 0, r: 'Eso es casi nada, no cuadra con lo que veo.', fb: 'Sumar lados no da el área; eso se acerca a medio perímetro.' } ] },
      { dice: 'Hay que alcanzar una ventana con la escalera de 8 metros a 75 grados. ¿A qué distancia de la pared pongo la base?', opciones: [
          { t: 'Distancia = 8 por coseno de 75, unos 2 metros; es la cuarta parte del largo, la regla de seguridad.', p: 2, r: 'Exacto, unos dos metros. Colócala.', fb: 'cos 75° ≈ 0,26 → 8 × 0,26 ≈ 2,07 m. La regla práctica de la cuarta parte coincide con 75°.' },
          { t: 'Más o menos a un metro, para que quede firme.', p: 1, r: 'Muy parada, se puede ir para atrás.', fb: 'Un ángulo demasiado vertical es inestable; falta aplicar la trigonometría.' },
          { t: 'A 6 metros, para que no se resbale.', p: 0, r: '¡Así no llega a la ventana y se dobla!', fb: 'Un ángulo muy bajo sobrecarga la escalera y reduce el alcance.' } ] }
    ],
    vivo: {
      lugar: 'Autobomba en la vía Puyo–Macas', fondo: 'emergencia',
      inicio: { confianza: 50, tension: 60 },
      pasos: [
        {
          acciones: [
            { icono: '🧮', t: 'Dividir el volumen del tanque para el caudal', p: 2, fb: 'Procedimiento correcto: V/Q.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📻', t: 'Pedir tanquero antes de agotar el agua', p: 2, fb: 'Decisión basada en el cálculo.', efecto: { confianza: 8, tension: -8 } },
            { icono: '👁️', t: 'Estimar a ojo mirando el nivel', p: 1, fb: 'Aproximación sin cálculo.', efecto: { confianza: -2, tension: 3 } },
            { icono: '🚿', t: 'Abrir al máximo sin calcular', p: 0, fb: 'Agota el agua sin control.', efecto: { confianza: -12, tension: 14 } }
          ],
          conceptos: [
            { n: 'Resultado', claves: ['20', 'veinte', 'minutos', '20 minutos', 'veinte minutos'] },
            { n: 'Procedimiento', claves: ['divid', 'entre', 'para', '3000', 'tres mil', '150', 'ciento cincuenta', 'caudal'] },
            { n: 'Decisión operativa', claves: ['abastec', 'tanquero', 'hidrante', 'pedir agua', 'reabastec', 'antes de'] }
          ],
          evitar: [ { claves: ['dos horas', 'no se'], fb: 'Un cálculo errado o la falta de respuesta pone en riesgo el ataque.' } ],
          modelo: 'Divido 3000 litros para 150 litros por minuto: tenemos 20 minutos de agua. Pido el tanquero ahora para no quedarnos sin abastecimiento.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Medir largo y ancho de la zona quemada', p: 2, fb: 'Datos base del cálculo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '✖️', t: 'Multiplicar base por altura', p: 2, fb: 'Fórmula del área del rectángulo.', efecto: { confianza: 8, tension: -5 } },
            { icono: '❓', t: 'Reportar el número sin unidades', p: 1, fb: 'Reporte incompleto.', efecto: { confianza: -3, tension: 3 } },
            { icono: '➕', t: 'Sumar los lados para obtener el área', p: 0, fb: 'Procedimiento incorrecto.', efecto: { confianza: -12, tension: 8 } }
          ],
          conceptos: [
            { n: 'Resultado del área', claves: ['1000', 'mil', 'metros cuadrados', 'm2', 'mil metros'] },
            { n: 'Fórmula', claves: ['multipl', 'por', 'base', 'altura', 'largo', 'ancho', '40', '25'] },
            { n: 'Conversión a hectáreas', claves: ['hectarea', '0,1', '0.1', 'cero coma uno', 'diez mil', '10000'] }
          ],
          evitar: [ { claves: ['65', 'sesenta y cinco'], fb: 'Sumar lados no es el área.' } ],
          modelo: 'Multiplico 40 por 25 metros: el área es de 1000 metros cuadrados, que equivale a 0,1 hectáreas.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Calcular la base con el coseno de 75°', p: 2, fb: 'Aplicación de trigonometría.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🪜', t: 'Colocar la base a la cuarta parte del largo', p: 2, fb: 'Regla práctica equivalente a 75°.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🤏', t: 'Pegar la base casi a la pared', p: 1, fb: 'Ángulo inestable.', efecto: { confianza: -4, tension: 6 } },
            { icono: '↔️', t: 'Alejar la base seis metros de la pared', p: 0, fb: 'Sobrecarga y pierde alcance.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Resultado de la distancia', claves: ['2 metros', 'dos metros', '2,07', 'dos punto', 'unos dos', '2 m'] },
            { n: 'Trigonometría', claves: ['coseno', 'cos', 'angulo', '75', 'setenta y cinco', 'triangulo'] },
            { n: 'Regla de seguridad', claves: ['cuarta parte', 'un cuarto', 'dividido para cuatro', 'estab', 'segur', 'firme'] }
          ],
          evitar: [ { claves: ['seis metros', 'un metro'], fb: 'Distancias que vuelven insegura la escalera.' } ],
          modelo: 'La distancia es 8 por el coseno de 75 grados, unos 2 metros; coincide con la regla de la cuarta parte del largo, así la escalera queda estable.'
        }
      ]
    }
  },

  /* ================= CIOR-103 Morfofisiología ================= */
  {
    id: 'asig-CIOR-103', cod: 'CIOR-103',
    titulo: 'Compañero agotado tras el combate forestal',
    asignaturas: ['CIOR-103'],
    persona: { nombre: 'Sgto. Wilma Santi', rol: 'Instructora de bomberos', avatar: '👩🏽‍🚒', pitch: 1.1 },
    contexto: 'Tras dos horas de combate en un incendio de vegetación en Mera, tu compañero Jonathan está mareado, sudoroso y con el pulso acelerado. La instructora te pide evaluarlo y explicar qué ocurre en su cuerpo.',
    objetivo: 'Identificar signos vitales y relacionar la homeostasis y la respuesta del cuerpo al estrés con la evaluación de un rescatista.',
    pasos: [
      { dice: 'Tómale los signos vitales y dime si están normales.', opciones: [
          { t: 'Le retiro el equipo, mido pulso, respiración, saturación y temperatura: pulso 128, respiración 26, ambos elevados frente a lo normal de un adulto (60–100 y 12–20).', p: 2, r: 'Bien. Está taquicárdico y taquipneico.', fb: 'Valores normales en adulto en reposo: FC 60–100 lpm, FR 12–20 rpm, SatO2 ≥ 94 %, T ~36,5–37,5 °C.' },
          { t: 'Le tomo el pulso: está rápido.', p: 1, r: '¿Y la respiración? ¿Los valores?', fb: 'Un solo signo es insuficiente y sin cifras no hay comparación.' },
          { t: 'No hace falta, es solo cansancio.', p: 0, r: 'Eso no lo sabes sin evaluarlo.', fb: 'Subestimar al compañero puede ocultar un golpe de calor.' } ] },
      { dice: '¿Por qué crees que suda tanto y tiene la piel roja?', opciones: [
          { t: 'Es la termorregulación: el cuerpo busca mantener la homeostasis, dilata los vasos de la piel y suda para perder calor; pero así pierde agua y sales.', p: 2, r: 'Exacto. Por eso hay que hidratarlo y enfriarlo.', fb: 'La homeostasis mantiene la temperatura interna; vasodilatación y sudor son mecanismos de pérdida de calor que deshidratan.' },
          { t: 'Porque tiene calor por el traje.', p: 1, r: 'Sí, pero ¿qué hace el cuerpo para compensar?', fb: 'Identifica la causa externa pero no el mecanismo fisiológico.' },
          { t: 'Porque tiene fiebre por una infección.', p: 0, r: 'No, esto es por el esfuerzo y el calor.', fb: 'Confunde hipertermia por esfuerzo con fiebre infecciosa.' } ] },
      { dice: '¿Qué sistemas se activan con el estrés del combate y qué hacemos ahora?', opciones: [
          { t: 'El sistema nervioso simpático libera adrenalina: sube la frecuencia cardíaca y respiratoria. Lo llevo a la sombra, lo hidrato, lo enfrío y reviso signos cada 5 minutos; si se altera la conciencia, activo el traslado.', p: 2, r: 'Muy bien, actúa así.', fb: 'Respuesta de estrés: eje simpático-adrenal con aumento de gasto cardíaco y ventilación. Rehabilitación y monitoreo previenen el golpe de calor.' },
          { t: 'Es la adrenalina; que descanse un rato.', p: 1, r: '¿Y lo controlas o lo dejas solo?', fb: 'Identifica la adrenalina, pero falta reevaluación y criterios de alarma.' },
          { t: 'Que tome una bebida energizante y vuelva a la línea.', p: 0, r: '¡Eso empeora su corazón!', fb: 'Estimulantes aumentan la carga cardiovascular; volver a la línea sin recuperación es peligroso.' } ] }
    ],
    vivo: {
      lugar: 'Área de rehabilitación junto a la línea de fuego en Mera', fondo: 'exterior',
      inicio: { confianza: 50, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🧥', t: 'Retirarle el casco y abrir el traje', p: 2, fb: 'Facilita evaluación y pérdida de calor.', efecto: { confianza: 6, tension: -5 } },
            { icono: '⌚', t: 'Medir pulso, respiración y saturación', p: 2, fb: 'Signos vitales completos.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🤚', t: 'Tocarle la frente solamente', p: 1, fb: 'Dato subjetivo e incompleto.', efecto: { confianza: -2, tension: 3 } },
            { icono: '👋', t: 'Decirle que se aguante y siga', p: 0, fb: 'Ignora signos de alarma.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Signos vitales medidos', claves: ['pulso', 'frecuencia cardiaca', 'respiracion', 'saturacion', 'temperatura', 'presion'] },
            { n: 'Valores normales', claves: ['60', '100', '12', '20', 'normal', 'sesenta', 'cien'] },
            { n: 'Interpretación', claves: ['elevad', 'alto', 'taquicard', 'taquipne', 'rapid', 'por encima'] }
          ],
          evitar: [ { claves: ['solo cansancio', 'no pasa nada'], fb: 'No se descarta sin evaluar.' } ],
          modelo: 'Le retiro el equipo y mido signos: pulso 128 y respiración 26, ambos elevados frente a lo normal de 60 a 100 y de 12 a 20 por minuto.'
        },
        {
          acciones: [
            { icono: '🌳', t: 'Llevarlo a la sombra', p: 2, fb: 'Reduce la carga térmica.', efecto: { confianza: 8, tension: -6 } },
            { icono: '💧', t: 'Darle agua con sales en sorbos', p: 2, fb: 'Repone líquidos y electrolitos.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🪭', t: 'Abanicarlo sin retirar el traje', p: 1, fb: 'Efecto limitado.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🧊', t: 'Meterlo de golpe en agua helada del río', p: 0, fb: 'Riesgo de choque y ahogamiento.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Homeostasis', claves: ['homeosta', 'equilibrio', 'temperatura interna', 'termorregul', 'regula'] },
            { n: 'Mecanismos de pérdida de calor', claves: ['sudor', 'suda', 'vasodilat', 'vasos', 'piel', 'perder calor'] },
            { n: 'Deshidratación', claves: ['deshidrat', 'agua', 'sales', 'electrolit', 'liquido', 'hidrat'] }
          ],
          evitar: [ { claves: ['infeccion', 'fiebre'], fb: 'No es fiebre infecciosa sino hipertermia por esfuerzo.' } ],
          modelo: 'Su cuerpo busca la homeostasis: dilata los vasos de la piel y suda para perder calor, pero así pierde agua y sales, por eso hay que hidratarlo.'
        },
        {
          acciones: [
            { icono: '⏱️', t: 'Reevaluar signos cada 5 minutos', p: 2, fb: 'Detecta deterioro a tiempo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📞', t: 'Avisar al oficial y alistar traslado si empeora', p: 2, fb: 'Escalamiento oportuno.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🛋️', t: 'Dejarlo descansar solo', p: 1, fb: 'Falta monitoreo.', efecto: { confianza: -3, tension: 4 } },
            { icono: '🥤', t: 'Darle bebida energizante', p: 0, fb: 'Aumenta la carga cardíaca.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Respuesta al estrés', claves: ['adrenalina', 'simpatico', 'sistema nervioso', 'estres', 'hormona', 'cortisol'] },
            { n: 'Efecto cardiorrespiratorio', claves: ['corazon', 'cardiovascular', 'respirator', 'frecuencia', 'sube', 'acelera'] },
            { n: 'Monitoreo y escalamiento', claves: ['reevalu', 'cada cinco', 'cada 5', 'control', 'traslado', 'conciencia', 'monitor'] }
          ],
          evitar: [ { claves: ['energizante', 'vuelva a la linea'], fb: 'Estimular o reincorporar sin recuperación es peligroso.' } ],
          modelo: 'El sistema nervioso simpático libera adrenalina y acelera corazón y respiración. Lo mantengo en reposo, hidratado, reevalúo cada 5 minutos y si altera la conciencia activamos el traslado.'
        }
      ]
    }
  },

  /* ================= CIOR-104 Herramientas Informáticas ================= */
  {
    id: 'asig-CIOR-104', cod: 'CIOR-104',
    titulo: 'Informe mensual de emergencias atendidas',
    asignaturas: ['CIOR-104'],
    persona: { nombre: 'Cap. Mayra Vargas', rol: 'Jefa de la estación de bomberos', avatar: '👩🏽‍💼', pitch: 1.05 },
    contexto: 'La capitana te encarga el informe mensual de la estación de Puyo: documento técnico, tabla con gráfico y una presentación para el GAD. Quieres usar inteligencia artificial y debes explicar cómo lo harás con criterio.',
    objetivo: 'Usar procesador de textos, hoja de cálculo, presentaciones e IA para elaborar informes técnicos de forma responsable.',
    pasos: [
      { dice: '¿Cómo vas a estructurar el informe en Word o en el procesador que uses?', opciones: [
          { t: 'Con encabezado institucional, antecedentes, desarrollo con datos, conclusiones y recomendaciones; uso estilos de título y numeración de páginas.', p: 2, r: 'Así queda profesional. Adelante.', fb: 'Un documento técnico requiere estructura lógica y formato uniforme con estilos.' },
          { t: 'Pongo un título y escribo todo seguido.', p: 1, r: 'Va a ser difícil de leer.', fb: 'Sin secciones el informe pierde claridad.' },
          { t: 'Le mando las fotos por WhatsApp y ya.', p: 0, r: 'Eso no es un informe.', fb: 'Un informe técnico es un documento formal, no un mensaje informal.' } ] },
      { dice: 'Tengo 46 incendios, 31 rescates y 58 atenciones prehospitalarias. ¿Cómo lo muestras?', opciones: [
          { t: 'Los pongo en una hoja de cálculo, sumo con =SUMA (son 135), calculo porcentajes y hago un gráfico de barras.', p: 2, r: 'Perfecto, el gráfico se entiende de una.', fb: 'La hoja de cálculo permite fórmulas verificables y gráficos para el análisis de datos.' },
          { t: 'Los escribo en una tabla de Word.', p: 1, r: 'Sirve, pero no calcula ni grafica fácil.', fb: 'Presenta datos, pero desaprovecha el análisis automatizado.' },
          { t: 'Sumo a mano y pongo el total.', p: 0, r: '¿Y si te equivocas? No se puede revisar.', fb: 'Sin fórmulas no hay trazabilidad del cálculo.' } ] },
      { dice: '¿Y si usas inteligencia artificial para redactar y hacer la presentación?', opciones: [
          { t: 'La uso para un borrador y para ordenar diapositivas, pero sin subir nombres ni cédulas de víctimas; reviso y verifico cada dato antes de entregar.', p: 2, r: 'Bien pensado, la responsabilidad es nuestra.', fb: 'La IA apoya, pero los datos personales se protegen y el autor verifica el contenido.' },
          { t: 'La uso y reviso por encima.', p: 1, r: 'Revisa bien, la IA se equivoca.', fb: 'La IA puede inventar datos; la verificación debe ser completa.' },
          { t: 'Le subo la base completa con nombres de los pacientes para que haga todo.', p: 0, r: '¡Eso expone datos personales!', fb: 'Subir datos sensibles a servicios externos vulnera la protección de datos personales.' } ] }
    ],
    vivo: {
      lugar: 'Oficina administrativa de la estación de bomberos de Puyo', fondo: 'oficina',
      inicio: { confianza: 55, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🗂️', t: 'Crear secciones con estilos de título', p: 2, fb: 'Estructura clara y navegable.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔢', t: 'Insertar numeración de páginas e índice', p: 2, fb: 'Formato profesional.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✍️', t: 'Escribir todo en un solo bloque', p: 1, fb: 'Poco legible.', efecto: { confianza: -2, tension: 3 } },
            { icono: '💬', t: 'Enviar solo fotos por mensajería', p: 0, fb: 'No es un documento técnico.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Estructura del informe', claves: ['antecedente', 'desarrollo', 'conclusion', 'recomendacion', 'introduccion', 'objetivo'] },
            { n: 'Formato', claves: ['estilo', 'titulo', 'numeracion', 'indice', 'encabezado', 'formato'] },
            { n: 'Procesador de textos', claves: ['word', 'procesador', 'documento', 'writer', 'docs', 'texto'] }
          ],
          evitar: [ { claves: ['por whatsapp', 'solo fotos'], fb: 'Un informe técnico es formal.' } ],
          modelo: 'Lo armo en el procesador de textos con encabezado, antecedentes, desarrollo, conclusiones y recomendaciones, usando estilos de título y numeración de páginas.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Ingresar los datos en una hoja de cálculo', p: 2, fb: 'Base para el análisis.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📈', t: 'Crear un gráfico de barras por tipo', p: 2, fb: 'Visualización clara.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📄', t: 'Hacer una tabla simple en el documento', p: 1, fb: 'Sin cálculo automático.', efecto: { confianza: 0, tension: 2 } },
            { icono: '✏️', t: 'Sumar a mano en un papel', p: 0, fb: 'Sin trazabilidad.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Hoja de cálculo y fórmulas', claves: ['excel', 'hoja de calculo', 'formula', 'suma', 'celda', 'calc'] },
            { n: 'Total y porcentajes', claves: ['135', 'ciento treinta y cinco', 'porcentaje', 'por ciento', 'total'] },
            { n: 'Gráfico', claves: ['grafic', 'barras', 'pastel', 'circular', 'visual'] }
          ],
          evitar: [ { claves: ['a mano', 'calculadora del celular'], fb: 'Sin fórmulas no se puede verificar.' } ],
          modelo: 'Ingreso los datos en la hoja de cálculo, sumo con la fórmula SUMA, que da 135, saco los porcentajes y hago un gráfico de barras por tipo de emergencia.'
        },
        {
          acciones: [
            { icono: '🤖', t: 'Pedir a la IA un borrador sin datos personales', p: 2, fb: 'Uso responsable.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔍', t: 'Verificar cada cifra antes de entregar', p: 2, fb: 'El autor responde por el contenido.', efecto: { confianza: 8, tension: -6 } },
            { icono: '👍', t: 'Aceptar el texto de la IA tal cual', p: 1, fb: 'Riesgo de errores.', efecto: { confianza: -4, tension: 5 } },
            { icono: '📤', t: 'Subir la base con nombres de pacientes', p: 0, fb: 'Vulnera datos personales.', efecto: { confianza: -18, tension: 15 } }
          ],
          conceptos: [
            { n: 'IA como apoyo', claves: ['borrador', 'inteligencia artificial', 'ia', 'apoyo', 'ayuda', 'chatgpt'] },
            { n: 'Protección de datos', claves: ['datos personales', 'sin nombres', 'cedula', 'anonim', 'confidencial', 'privacidad', 'no subo'] },
            { n: 'Verificación', claves: ['verific', 'revis', 'comprob', 'contrast', 'corrig'] }
          ],
          evitar: [ { claves: ['subo todo', 'con los nombres'], fb: 'Expone información sensible.' } ],
          modelo: 'Uso la inteligencia artificial solo para un borrador y la estructura de las diapositivas, sin subir nombres ni cédulas, y verifico cada dato antes de entregar.'
        }
      ]
    }
  },

  /* ================= CIOR-105 Ciencias del Fuego I ================= */
  {
    id: 'asig-CIOR-105', cod: 'CIOR-105',
    titulo: 'Incendio en cocina de casa de madera',
    asignaturas: ['CIOR-105'],
    persona: { nombre: 'Tnte. Hernán Vargas', rol: 'Oficial al mando de la cuadrilla', avatar: '👨🏽‍🚒', pitch: 0.9 },
    contexto: 'En el barrio Obrero de Puyo arde la cocina de una casa de madera de dos pisos, con humo oscuro acumulándose bajo el techo y una vivienda vecina a 3 metros. Tu oficial te pide leer el incendio antes de entrar.',
    objetivo: 'Identificar fases del incendio, métodos de transferencia de calor, comportamiento del humo y técnicas básicas de extinción.',
    pasos: [
      { dice: '¿En qué fase está el incendio y qué nos dice el humo?', opciones: [
          { t: 'Está en crecimiento: humo oscuro, denso y bajando por el techo indica gases calientes acumulados; hay riesgo de flashover.', p: 2, r: 'Bien leído. Entramos con cuidado.', fb: 'Fases: ignición, crecimiento, desarrollo pleno, decaimiento. Humo oscuro, rápido y que desciende anticipa el flashover.' },
          { t: 'Está fuerte, hay mucho humo.', p: 1, r: '¿Pero en qué fase? ¿Qué riesgo hay?', fb: 'Descripción general sin análisis de fase ni riesgo.' },
          { t: 'Ya se está apagando, entremos rápido.', p: 0, r: '¡Ese humo está a punto de inflamarse!', fb: 'Error de lectura que expone al equipo a un flashover.' } ] },
      { dice: 'La pared de la casa vecina ya está caliente. ¿Por qué pasa eso si no la toca el fuego?', opciones: [
          { t: 'Por radiación del calor de las llamas; además la convección lleva gases calientes y la conducción pasa por la estructura. Protejo la exposición con una línea en niebla.', p: 2, r: 'Correcto, pon una línea a la casa vecina.', fb: 'Tres mecanismos: conducción, convección y radiación. La radiación es la principal causa de propagación a exposiciones.' },
          { t: 'Por el calor del aire.', p: 1, r: 'Es convección, sí, ¿pero solo eso?', fb: 'Parcial: omite la radiación, principal mecanismo aquí.' },
          { t: 'Es normal por el sol, no importa.', p: 0, r: '¡Se nos va a quemar la otra casa!', fb: 'Ignorar la exposición permite la propagación.' } ] },
      { dice: '¿Cómo atacamos el fuego?', opciones: [
          { t: 'Enfriando los gases del techo con pulsos de niebla, luego ataque directo a la base con agua, y ventilación coordinada con el ataque.', p: 2, r: 'Eso es. Adelante con la línea.', fb: 'El agua extingue por enfriamiento; enfriar los gases reduce el riesgo de flashover; la ventilación debe coordinarse para no alimentar el fuego.' },
          { t: 'Echar agua a las llamas directo.', p: 1, r: 'Sí, pero ¿y el humo de arriba?', fb: 'Ataca la base pero ignora los gases calientes.' },
          { t: 'Romper todas las ventanas primero para que salga el humo.', p: 0, r: '¡Le vas a dar oxígeno al fuego!', fb: 'Ventilar sin coordinación aporta oxígeno y puede provocar un desarrollo explosivo.' } ] }
    ],
    vivo: {
      lugar: 'Vivienda de madera en el barrio Obrero, Puyo', fondo: 'emergencia',
      inicio: { confianza: 50, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '👁️', t: 'Observar color, velocidad y altura del humo', p: 2, fb: 'Lectura del humo.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🌡️', t: 'Revisar temperatura de la puerta con el dorso', p: 2, fb: 'Indicador de calor interior.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📸', t: 'Solo tomar fotos del incendio', p: 1, fb: 'Útil para informe, no para decisión.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🏃', t: 'Entrar de inmediato sin evaluar', p: 0, fb: 'Riesgo de flashover.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Fase del incendio', claves: ['crecimiento', 'fase', 'desarrollo', 'ignicion', 'etapa'] },
            { n: 'Lectura del humo', claves: ['humo oscuro', 'denso', 'negro', 'baja', 'gases calientes', 'techo'] },
            { n: 'Riesgo de flashover', claves: ['flashover', 'combustion subita', 'generalizada', 'inflam', 'explos'] }
          ],
          evitar: [ { claves: ['se esta apagando', 'entremos ya'], fb: 'Lectura errónea y peligrosa.' } ],
          modelo: 'Está en fase de crecimiento: el humo oscuro y denso que baja del techo son gases calientes acumulados y hay riesgo de flashover.'
        },
        {
          acciones: [
            { icono: '🛡️', t: 'Tender una línea para proteger la casa vecina', p: 2, fb: 'Protección de exposiciones.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🚪', t: 'Evacuar a la familia de la casa vecina', p: 2, fb: 'Vida antes que bienes.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🤚', t: 'Tocar la pared y seguir esperando', p: 1, fb: 'Detecta pero no actúa.', efecto: { confianza: -2, tension: 4 } },
            { icono: '🙈', t: 'Ignorar la casa vecina', p: 0, fb: 'Propagación segura.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Radiación', claves: ['radiacion', 'radia', 'ondas', 'calor radiante', 'infrarroj'] },
            { n: 'Convección y conducción', claves: ['conveccion', 'conduccion', 'aire caliente', 'gases', 'estructura'] },
            { n: 'Protección de exposiciones', claves: ['proteg', 'exposicion', 'casa vecina', 'cortina', 'niebla', 'enfriar la pared'] }
          ],
          evitar: [ { claves: ['es el sol', 'no importa'], fb: 'Ignora la transferencia de calor.' } ],
          modelo: 'Es radiación de las llamas, más convección de gases y conducción por la estructura. Pongo una línea en niebla para proteger la casa vecina.'
        },
        {
          acciones: [
            { icono: '🌫️', t: 'Aplicar pulsos de niebla a los gases del techo', p: 2, fb: 'Enfría gases y reduce riesgo.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🎯', t: 'Atacar la base del fuego con chorro', p: 2, fb: 'Extinción por enfriamiento.', efecto: { confianza: 8, tension: -6 } },
            { icono: '💦', t: 'Mojar las llamas visibles solamente', p: 1, fb: 'Ataque incompleto.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🪟', t: 'Romper todas las ventanas sin coordinar', p: 0, fb: 'Aporta oxígeno al fuego.', efecto: { confianza: -15, tension: 16 } }
          ],
          conceptos: [
            { n: 'Enfriamiento de gases', claves: ['pulso', 'niebla', 'enfri', 'gases', 'techo', 'capa de humo'] },
            { n: 'Ataque a la base', claves: ['base', 'ataque directo', 'chorro', 'agua', 'foco'] },
            { n: 'Ventilación coordinada', claves: ['ventilacion', 'ventilar', 'coordin', 'oxigeno', 'controlad'] }
          ],
          evitar: [ { claves: ['romper todas las ventanas', 'abrir todo'], fb: 'Ventilación descontrolada.' } ],
          modelo: 'Primero enfrío la capa de gases del techo con pulsos de niebla, luego ataco la base con agua y coordinamos la ventilación con el ataque.'
        }
      ]
    }
  },

  /* ================= CIOR-106 Química ================= */
  {
    id: 'asig-CIOR-106', cod: 'CIOR-106',
    titulo: 'Mezcla peligrosa en la bodega de una ferretería',
    asignaturas: ['CIOR-106'],
    persona: { nombre: 'Sra. Nancy Guevara', rol: 'Dueña de una ferretería en Shell', avatar: '👩🏽', pitch: 1.15 },
    contexto: 'En una ferretería de Shell se cayeron un galón de cloro y uno de ácido muriático; hay olor picante y dos empleados tosen. Debes explicar la reacción, medir la atmósfera y orientar el almacenamiento.',
    objetivo: 'Aplicar reacciones químicas, química de sustancias peligrosas y técnicas de detección y medición.',
    pasos: [
      { dice: '¡Qué olor tan fuerte! Solo se mezclaron dos productos de limpieza, ¿es grave?', opciones: [
          { t: 'Sí: el hipoclorito del cloro reacciona con el ácido clorhídrico y libera cloro gaseoso, tóxico. Evacuamos y ventilamos sin entrar sin protección respiratoria.', p: 2, r: '¡No sabía! Salgamos ya.', fb: 'NaOCl + 2HCl → Cl2 + NaCl + H2O. El Cl2 es un gas irritante y tóxico; requiere evacuación y ERA.' },
          { t: 'Es un gas que irrita, mejor salgan.', p: 1, r: '¿Pero qué gas? ¿Qué pasó?', fb: 'Acción correcta, pero sin explicar la reacción.' },
          { t: 'Es solo olor, limpien con agua y trapeador.', p: 0, r: 'Ya me está ardiendo la garganta...', fb: 'Exponer a personas sin protección a cloro gaseoso es peligroso.' } ] },
      { dice: '¿Cómo saben ustedes si ya se puede entrar?', opciones: [
          { t: 'Con el detector multigás: medimos oxígeno, que debe estar entre 19,5 y 23,5 %, cloro y otros tóxicos, y explosividad; entramos solo con valores seguros y ERA.', p: 2, r: 'Ah, con aparatos. Qué bueno.', fb: 'La detección y medición objetiva define la entrada segura: O2, LEL y tóxicos específicos.' },
          { t: 'Cuando ya no huela.', p: 1, r: '¿Y si el olfato se acostumbra?', fb: 'El olfato se satura; no es un método confiable.' },
          { t: 'Entro rápido conteniendo la respiración.', p: 0, r: '¡Eso es muy riesgoso!', fb: 'Nunca se entra a atmósferas peligrosas sin medición ni protección.' } ] },
      { dice: '¿Cómo debo guardar mis productos para que no vuelva a pasar?', opciones: [
          { t: 'Separar ácidos de bases y de oxidantes como el cloro, lejos de combustibles como diluyentes; leer la hoja de seguridad y la etiqueta con el rombo de riesgos.', p: 2, r: 'Voy a reorganizar la bodega hoy mismo.', fb: 'Almacenamiento por compatibilidad química y uso de hojas de datos de seguridad (SDS) previenen reacciones peligrosas.' },
          { t: 'Póngalos en estantes altos.', p: 1, r: '¿Juntos o separados?', fb: 'La altura no evita la incompatibilidad química.' },
          { t: 'Guárdelos todos juntos en una caja bien cerrada.', p: 0, r: 'Así lo tenía y pasó esto...', fb: 'Juntar incompatibles mantiene el riesgo.' } ] }
    ],
    vivo: {
      lugar: 'Bodega de ferretería en Shell, Mera', fondo: 'emergencia',
      inicio: { confianza: 40, tension: 70 },
      pasos: [
        {
          acciones: [
            { icono: '🚷', t: 'Evacuar a empleados y clientes', p: 2, fb: 'Aleja a las personas del gas.', efecto: { confianza: 10, tension: -8 } },
            { icono: '😷', t: 'Colocarme el equipo de respiración', p: 2, fb: 'Protección frente a tóxicos.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🚪', t: 'Abrir la puerta y esperar afuera', p: 1, fb: 'Ventila, pero falta control.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🧹', t: 'Trapear el derrame sin protección', p: 0, fb: 'Exposición directa a cloro gaseoso.', efecto: { confianza: -15, tension: 16 } }
          ],
          conceptos: [
            { n: 'Reactivos', claves: ['hipoclorito', 'cloro', 'acido', 'clorhidrico', 'muriatico', 'reaccion'] },
            { n: 'Producto tóxico', claves: ['cloro gaseoso', 'gas', 'toxico', 'irrita', 'libera', 'desprende'] },
            { n: 'Medidas inmediatas', claves: ['evacu', 'ventil', 'proteccion respiratoria', 'equipo', 'salir', 'alejar'] }
          ],
          evitar: [ { claves: ['solo olor', 'trapear'], fb: 'Minimiza un riesgo químico real.' } ],
          modelo: 'Es grave: el hipoclorito reacciona con el ácido clorhídrico y libera cloro gaseoso, que es tóxico. Evacuamos, ventilamos y solo entramos con protección respiratoria.'
        },
        {
          acciones: [
            { icono: '📟', t: 'Encender y calibrar el detector multigás', p: 2, fb: 'Medición confiable.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📍', t: 'Medir en varios puntos y alturas', p: 2, fb: 'Los gases se estratifican.', efecto: { confianza: 8, tension: -4 } },
            { icono: '👃', t: 'Oler desde la puerta', p: 1, fb: 'Método no confiable.', efecto: { confianza: -4, tension: 4 } },
            { icono: '🫁', t: 'Entrar conteniendo la respiración', p: 0, fb: 'Riesgo de intoxicación.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Detector multigás', claves: ['detector', 'multigas', 'medidor', 'medir', 'medicion', 'equipo de deteccion'] },
            { n: 'Oxígeno seguro', claves: ['oxigeno', '19,5', '23,5', 'diecinueve', 'veintitres', 'porcentaje'] },
            { n: 'Tóxicos y explosividad', claves: ['toxico', 'cloro', 'explosiv', 'lel', 'limite inferior', 'inflamab'] }
          ],
          evitar: [ { claves: ['cuando ya no huela', 'aguantar la respiracion'], fb: 'No son métodos seguros.' } ],
          modelo: 'Medimos con el detector multigás: el oxígeno debe estar entre 19,5 y 23,5 por ciento, sin cloro ni explosividad; solo así entramos y con equipo de respiración.'
        },
        {
          acciones: [
            { icono: '📑', t: 'Revisar la hoja de seguridad de cada producto', p: 2, fb: 'Información de incompatibilidades.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🗄️', t: 'Separar ácidos, bases y oxidantes', p: 2, fb: 'Compatibilidad química.', efecto: { confianza: 10, tension: -6 } },
            { icono: '⬆️', t: 'Subir todo a estantes altos', p: 1, fb: 'No resuelve incompatibilidad.', efecto: { confianza: 0, tension: 2 } },
            { icono: '📦', t: 'Juntar todo en una misma caja', p: 0, fb: 'Mantiene el riesgo.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Compatibilidad química', claves: ['separ', 'incompatib', 'compatib', 'acidos', 'bases', 'oxidante'] },
            { n: 'Combustibles aparte', claves: ['combustible', 'diluyente', 'thinner', 'inflamable', 'gasolina', 'lejos'] },
            { n: 'Información de seguridad', claves: ['hoja de seguridad', 'ficha', 'etiqueta', 'rombo', 'nfpa', 'msds', 'sds'] }
          ],
          evitar: [ { claves: ['todo junto', 'misma caja'], fb: 'Junta sustancias incompatibles.' } ],
          modelo: 'Separe los ácidos de las bases y de los oxidantes como el cloro, lejos de diluyentes y combustibles, y revise la hoja de seguridad y la etiqueta de cada producto.'
        }
      ]
    }
  },

  /* ================= CIOR-109 Primeros Auxilios ================= */
  {
    id: 'asig-CIOR-109', cod: 'CIOR-109',
    titulo: 'Corte con machete durante una minga',
    asignaturas: ['CIOR-109'],
    persona: { nombre: 'Rosa Grefa', rol: 'Vecina de la comunidad', avatar: '👩🏽‍🦱', pitch: 1.2 },
    contexto: 'En una minga de limpieza en Tarqui, un comunero se hizo un corte profundo en el muslo con machete; luego se desvanece y deja de respirar. Estás de franco y eres el primero en llegar.',
    objetivo: 'Aplicar evaluación de la escena, activación del sistema de emergencias, control de hemorragias y soporte vital básico.',
    pasos: [
      { dice: '¡Ayúdeme! ¡Don Luis se cortó y sangra muchísimo!', opciones: [
          { t: 'Verifico que la escena sea segura (machete lejos), me pongo guantes y le pido a usted que llame al ECU 911 con la ubicación exacta.', p: 2, r: 'Ya estoy llamando, estamos junto a la casa comunal.', fb: 'Primero seguridad de la escena y bioseguridad; activar el sistema de emergencias temprano.' },
          { t: 'Corro a ver la herida.', p: 1, r: '¡Cuidado con el machete!', fb: 'Actitud de ayuda, pero sin asegurar la escena ni activar ayuda.' },
          { t: 'Lo subo a una moto para llevarlo al hospital.', p: 0, r: '¡Se va a desangrar en el camino!', fb: 'Trasladar sin controlar la hemorragia ni activar el sistema aumenta el riesgo de muerte.' } ] },
      { dice: '¡La sangre sale a chorros!', opciones: [
          { t: 'Hago presión directa firme con una tela limpia; si no para, coloco un torniquete 5 a 7 cm por encima de la herida y anoto la hora.', p: 2, r: '¡Está bajando el sangrado!', fb: 'Presión directa es la primera medida; sangrado arterial masivo en extremidad: torniquete proximal y registro de hora.' },
          { t: 'Le pongo una venda floja.', p: 1, r: 'Sigue saliendo sangre...', fb: 'Sin presión suficiente no se controla la hemorragia.' },
          { t: 'Le echo café molido para que coagule.', p: 0, r: 'Mi abuela hacía eso...', fb: 'Remedios caseros contaminan y no detienen hemorragias graves.' } ] },
      { dice: '¡No responde! ¡Creo que no respira!', opciones: [
          { t: 'Compruebo respiración máximo 10 segundos; si no respira, inicio RCP: 30 compresiones fuertes al centro del pecho, a 100–120 por minuto, y 2 ventilaciones; pido un DEA.', p: 2, r: 'Le traigo el desfibrilador del centro de salud.', fb: 'Soporte vital básico: compresiones de 5–6 cm, 100–120/min, relación 30:2, DEA lo antes posible.' },
          { t: 'Le doy compresiones cuando pueda.', p: 1, r: '¿Cuántas? ¿Qué tan rápido?', fb: 'Falta la técnica: ritmo, profundidad y relación.' },
          { t: 'Le echo agua en la cara para que reaccione.', p: 0, r: 'No se mueve...', fb: 'Retrasa la RCP y reduce la supervivencia.' } ] }
    ],
    vivo: {
      lugar: 'Casa comunal de Tarqui durante una minga', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 80 },
      pasos: [
        {
          acciones: [
            { icono: '🔪', t: 'Alejar el machete de la víctima', p: 2, fb: 'Escena segura.', efecto: { confianza: 6, tension: -5 } },
            { icono: '🧤', t: 'Ponerme guantes antes de tocar', p: 2, fb: 'Bioseguridad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📞', t: 'Pedir que llamen al ECU 911', p: 2, fb: 'Activación temprana.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏍️', t: 'Subirlo a una moto sin atenderlo', p: 0, fb: 'Traslado peligroso.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Seguridad de la escena', claves: ['escena', 'segur', 'machete', 'alejar', 'peligro'] },
            { n: 'Bioseguridad', claves: ['guante', 'bioseguridad', 'proteccion', 'mascarilla', 'barrera'] },
            { n: 'Activar el sistema', claves: ['ecu', '911', 'llamar', 'ambulancia', 'ubicacion', 'ayuda'] }
          ],
          evitar: [ { claves: ['en la moto', 'lo llevo yo'], fb: 'Traslado sin control de hemorragia.' } ],
          modelo: 'Primero verifico que la escena sea segura y alejo el machete, me pongo guantes y le pido que llame al ECU 911 con la ubicación exacta.'
        },
        {
          acciones: [
            { icono: '✋', t: 'Hacer presión directa sobre la herida', p: 2, fb: 'Primera medida de control.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🩹', t: 'Colocar torniquete sobre la herida si no para', p: 2, fb: 'Hemorragia masiva de extremidad.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🎗️', t: 'Envolver con una venda floja', p: 1, fb: 'Insuficiente.', efecto: { confianza: -3, tension: 4 } },
            { icono: '☕', t: 'Echar café molido en la herida', p: 0, fb: 'Contamina y no controla.', efecto: { confianza: -14, tension: 12 } }
          ],
          conceptos: [
            { n: 'Presión directa', claves: ['presion directa', 'presionar', 'apretar', 'compresion', 'tela limpia', 'gasa'] },
            { n: 'Torniquete', claves: ['torniquete', 'encima de la herida', '5 a 7', 'cinco a siete', 'proximal'] },
            { n: 'Registro de la hora', claves: ['hora', 'anot', 'registr', 'tiempo', 'minuto', 'marcar'] }
          ],
          evitar: [ { claves: ['cafe', 'tierra', 'ceniza'], fb: 'Remedios caseros contaminan la herida.' } ],
          modelo: 'Presiono firme y directo con una tela limpia; si no para, pongo un torniquete de 5 a 7 centímetros por encima de la herida y anoto la hora.'
        },
        {
          acciones: [
            { icono: '👂', t: 'Comprobar respiración hasta 10 segundos', p: 2, fb: 'Valoración rápida.', efecto: { confianza: 6, tension: -3 } },
            { icono: '❤️', t: 'Iniciar compresiones torácicas 30:2', p: 2, fb: 'Soporte vital básico.', efecto: { confianza: 10, tension: -6 } },
            { icono: '⚡', t: 'Pedir que traigan un DEA', p: 2, fb: 'Desfibrilación temprana.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💧', t: 'Echarle agua en la cara', p: 0, fb: 'Retrasa la RCP.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Comprobar respiración', claves: ['respira', 'diez segundos', '10 segundos', 'ver oir', 'responde', 'conciencia'] },
            { n: 'Técnica de RCP', claves: ['rcp', 'compresion', '30', 'treinta', '100', '120', 'centro del pecho'] },
            { n: 'Desfibrilador', claves: ['dea', 'desfibrilador', 'ventilacion', '2 ventilaciones', 'dos ventilaciones'] }
          ],
          evitar: [ { claves: ['echar agua', 'sacudirlo'], fb: 'No reemplaza la RCP.' } ],
          modelo: 'Compruebo la respiración en 10 segundos; no respira, así que inicio RCP: 30 compresiones al centro del pecho a 100–120 por minuto y 2 ventilaciones, y pido un DEA.'
        }
      ]
    }
  },

  /* ================= CIOR-201 Ética Profesional y Liderazgo ================= */
  {
    id: 'asig-CIOR-201', cod: 'CIOR-201',
    titulo: 'El celular en la casa siniestrada',
    asignaturas: ['CIOR-201'],
    persona: { nombre: 'Bombero Kevin Andi', rol: 'Compañero de cuadrilla', avatar: '🧑🏽‍🚒', pitch: 1.0 },
    contexto: 'Durante la remoción de escombros en una vivienda incendiada en Puyo ves que tu compañero guarda un celular de la familia en su chaqueta. El equipo está agotado y empiezan discusiones. Debes actuar con integridad y liderar.',
    objetivo: 'Aplicar códigos de ética, toma de decisiones ante dilemas morales, liderazgo y resolución de conflictos bajo presión.',
    pasos: [
      { dice: 'Tranquilo, hermano. Total, ya está quemado, la familia ni se va a dar cuenta.', opciones: [
          { t: 'Le digo con firmeza y en privado que devuelva el celular: es un bien ajeno, nuestro código exige integridad y la confianza de la comunidad depende de eso.', p: 2, r: 'Ya... tienes razón, lo devuelvo.', fb: 'Ante un dilema ético se actúa según principios (honestidad, respeto a la propiedad) y se corrige de forma directa y respetuosa.' },
          { t: 'Le digo que mejor no lo haga, pero no insisto.', p: 1, r: 'Bueno, ya veré...', fb: 'Se identifica la falta pero no se asegura la corrección.' },
          { t: 'Me quedo callado, no quiero problemas con los compañeros.', p: 0, r: '(Guarda el celular.)', fb: 'El silencio convierte al testigo en cómplice y daña a la institución.' } ] },
      { dice: 'Además, ya estoy harto. Llevamos 14 horas y Darwin no hace nada, ¡yo no trabajo más con él!', opciones: [
          { t: 'Detengo la discusión, reconozco el cansancio, reúno a ambos, escucho a cada uno, reparto tareas claras y gestiono una rotación de descanso con el oficial.', p: 2, r: 'Bueno, si hay relevo, seguimos.', fb: 'Resolución de conflictos: escuchar, centrarse en el problema, roles claros. El liderazgo situacional atiende la fatiga del equipo.' },
          { t: 'Le digo que se calme, que todos estamos cansados.', p: 1, r: 'Igual él no hace nada.', fb: 'Calma la emoción pero no aborda la causa del conflicto.' },
          { t: 'Le digo que si no le gusta, que se vaya.', p: 0, r: '¡Pues me voy!', fb: 'El liderazgo autoritario sin escucha rompe el equipo en plena operación.' } ] },
      { dice: '¿Le vas a contar al teniente lo del celular?', opciones: [
          { t: 'Sí, informo al oficial con hechos, verificamos la devolución a la familia y dejamos constancia; no es para castigarte sino para proteger la confianza en todos.', p: 2, r: 'Entiendo... asumo lo que venga.', fb: 'La responsabilidad y la transparencia exigen reportar; hacerlo con respeto sostiene la relación y la responsabilidad social.' },
          { t: 'Si lo devolviste, quedamos así.', p: 1, r: 'Gracias, pana.', fb: 'Se corrige el hecho pero sin registro institucional.' },
          { t: 'Le cuento a todos en el grupo de WhatsApp.', p: 0, r: '¡Me estás quemando con todos!', fb: 'Exponer públicamente vulnera la dignidad y no sigue el canal debido.' } ] }
    ],
    vivo: {
      lugar: 'Vivienda siniestrada en el barrio Libertad, Puyo', fondo: 'exterior',
      inicio: { confianza: 45, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '🤝', t: 'Hablar con Kevin en privado', p: 2, fb: 'Corrección respetuosa.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📱', t: 'Pedirle que devuelva el celular a su lugar', p: 2, fb: 'Corrección efectiva.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🤐', t: 'Insinuarle que no está bien y seguir', p: 1, fb: 'Corrección débil.', efecto: { confianza: -2, tension: 3 } },
            { icono: '🙈', t: 'Hacer como que no vi nada', p: 0, fb: 'Complicidad.', efecto: { confianza: -18, tension: 10 } }
          ],
          conceptos: [
            { n: 'Devolver el bien', claves: ['devuelv', 'devolver', 'regres', 'no es nuestro', 'ajeno', 'familia'] },
            { n: 'Principios éticos', claves: ['etica', 'integridad', 'honest', 'codigo', 'principio', 'correcto'] },
            { n: 'Confianza de la comunidad', claves: ['confianza', 'comunidad', 'institucion', 'imagen', 'uniforme', 'reputacion'] }
          ],
          evitar: [ { claves: ['nadie se va a dar cuenta', 'no vi nada'], fb: 'Normaliza la falta ética.' } ],
          modelo: 'Kevin, devuelve el celular: es de la familia, no es nuestro. Nuestro código exige integridad y la comunidad confía en nosotros por eso.'
        },
        {
          acciones: [
            { icono: '✋', t: 'Detener la discusión con calma', p: 2, fb: 'Evita la escalada.', efecto: { confianza: 6, tension: -8 } },
            { icono: '👂', t: 'Escuchar a ambos por separado', p: 2, fb: 'Base de la mediación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔄', t: 'Proponer rotación de descanso al oficial', p: 2, fb: 'Atiende la fatiga, causa raíz.', efecto: { confianza: 8, tension: -8 } },
            { icono: '👉', t: 'Decirle que se vaya si no le gusta', p: 0, fb: 'Rompe el equipo.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Escucha y empatía', claves: ['escuch', 'entiendo', 'cansancio', 'cansados', 'reconozco', 'empatia'] },
            { n: 'Roles y tareas claras', claves: ['tarea', 'rol', 'funcion', 'repart', 'asign', 'organiz'] },
            { n: 'Descanso y motivación', claves: ['rotacion', 'descanso', 'relevo', 'hidrat', 'motiv', 'turno'] }
          ],
          evitar: [ { claves: ['que se vaya', 'callate'], fb: 'Autoritarismo que escala el conflicto.' } ],
          modelo: 'Paremos un momento; entiendo que estamos cansados. Escucho a los dos, reparto tareas claras y le pido al teniente una rotación de descanso.'
        },
        {
          acciones: [
            { icono: '🧑‍✈️', t: 'Informar los hechos al oficial', p: 2, fb: 'Canal debido.', efecto: { confianza: 8, tension: -2 } },
            { icono: '🏠', t: 'Verificar la entrega del celular a la familia', p: 2, fb: 'Reparación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🤫', t: 'Dejarlo entre nosotros', p: 1, fb: 'Sin constancia.', efecto: { confianza: -2, tension: 0 } },
            { icono: '📣', t: 'Contarlo en el grupo de WhatsApp', p: 0, fb: 'Exposición pública.', efecto: { confianza: -14, tension: 14 } }
          ],
          conceptos: [
            { n: 'Informar al oficial', claves: ['inform', 'teniente', 'oficial', 'reportar', 'comunicar', 'superior'] },
            { n: 'Constancia y reparación', claves: ['constancia', 'registro', 'devolucion', 'entrega', 'familia', 'acta'] },
            { n: 'Responsabilidad sin humillar', claves: ['responsab', 'no es para castigar', 'respeto', 'proteger', 'confianza', 'transparen'] }
          ],
          evitar: [ { claves: ['en el grupo', 'contar a todos'], fb: 'No es el canal y daña la dignidad.' } ],
          modelo: 'Sí, informaré al teniente con los hechos y verificaremos que el celular llegue a la familia. No es para castigarte, es nuestra responsabilidad y protege la confianza en todos.'
        }
      ]
    }
  },

  /* ================= CIOR-203 Psicología Aplicada ================= */
  {
    id: 'asig-CIOR-203', cod: 'CIOR-203',
    titulo: 'Madre en crisis tras perder su casa',
    asignaturas: ['CIOR-203'],
    persona: { nombre: 'Lucía Mayancha', rol: 'Madre damnificada por el incendio', avatar: '👩🏽', pitch: 1.25 },
    contexto: 'El fuego consumió la casa de Lucía en el barrio México de Puyo. Sus hijos están a salvo, pero ella hiperventila, llora y repite que lo perdió todo. Debes brindar primeros auxilios psicológicos.',
    objetivo: 'Aplicar técnicas de intervención psicológica de emergencia, comunicación en alta presión y reconocimiento de reacciones al trauma.',
    pasos: [
      { dice: '¡Lo perdí todo! ¡No puedo respirar, no puedo...!', opciones: [
          { t: 'Me presento, me pongo a su altura, la llevo a un lugar tranquilo y respiro con ella despacio: inhalar en cuatro, exhalar en seis.', p: 2, r: '(Respira más despacio.) Ya... ya un poco mejor.', fb: 'Primeros auxilios psicológicos: contacto, seguridad, regulación fisiológica con respiración guiada.' },
          { t: 'Le digo que se calme, que no es para tanto.', p: 1, r: '¿Que no es para tanto? ¡Es mi casa!', fb: 'Intención de calmar, pero minimizar invalida su emoción.' },
          { t: 'La dejo sola para que se desahogue y sigo trabajando.', p: 0, r: '(Sigue hiperventilando sola.)', fb: 'Abandonar a una persona en crisis aumenta el riesgo.' } ] },
      { dice: '¿Y ahora dónde voy a dormir con mis hijos? No tengo a nadie.', opciones: [
          { t: 'La escucho, le pregunto por familiares o vecinos de confianza y la conecto con el GAD, la Secretaría de Gestión de Riesgos y el MIES para albergue y ayuda.', p: 2, r: 'Mi hermana vive en Shell... la puedo llamar.', fb: 'Atender necesidades básicas y conectar con redes de apoyo es un principio central de la intervención en crisis.' },
          { t: 'Le digo que seguro alguien la ayudará.', p: 1, r: '¿Quién?', fb: 'Tranquiliza pero no concreta recursos.' },
          { t: 'Le digo que eso no es problema de bomberos.', p: 0, r: '(Llora más fuerte.)', fb: 'Desatiende a la víctima y rompe la confianza.' } ] },
      { dice: '¿Por qué no paro de temblar? ¿Me estoy volviendo loca?', opciones: [
          { t: 'Le explico que temblar, llorar o no dormir son reacciones normales ante algo anormal; si en semanas persisten pesadillas o angustia, debe buscar apoyo psicológico en el centro de salud.', p: 2, r: 'Gracias... pensé que algo malo me pasaba.', fb: 'Normalizar las reacciones y orientar sobre signos de alarma de estrés postraumático favorece la resiliencia y la derivación oportuna.' },
          { t: 'Le digo que ya se le pasará.', p: 1, r: '¿Y si no se pasa?', fb: 'Normaliza pero no orienta sobre cuándo buscar ayuda.' },
          { t: 'Le digo que sí parece un ataque de nervios grave.', p: 0, r: '¡Ay, Dios mío!', fb: 'Etiquetar o alarmar aumenta la angustia.' } ] }
    ],
    vivo: {
      lugar: 'Calle frente a la vivienda incendiada, barrio México, Puyo', fondo: 'comunidad',
      inicio: { confianza: 35, tension: 85 },
      pasos: [
        {
          acciones: [
            { icono: '🧎', t: 'Ponerme a su altura y presentarme', p: 2, fb: 'Contacto respetuoso.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🌬️', t: 'Guiarle a respirar despacio', p: 2, fb: 'Regula la hiperventilación.', efecto: { confianza: 8, tension: -12 } },
            { icono: '🗯️', t: 'Decirle que se calme', p: 1, fb: 'Orden poco efectiva.', efecto: { confianza: -4, tension: 2 } },
            { icono: '🚶', t: 'Dejarla sola y retirarme', p: 0, fb: 'Abandono en crisis.', efecto: { confianza: -18, tension: 15 } }
          ],
          conceptos: [
            { n: 'Contacto y presentación', claves: ['soy', 'me llamo', 'estoy aqui', 'acompan', 'presento', 'con usted'] },
            { n: 'Lugar seguro', claves: ['lugar tranquilo', 'sentar', 'segur', 'apartad', 'sombra', 'aqui conmigo'] },
            { n: 'Respiración guiada', claves: ['respir', 'despacio', 'inhal', 'exhal', 'cuatro', 'aire'] }
          ],
          evitar: [ { claves: ['no es para tanto', 'deje de llorar'], fb: 'Invalida la emoción.' } ],
          modelo: 'Lucía, soy bombero y estoy aquí con usted. Sentémonos en un lugar tranquilo y respiremos juntas despacio: inhale contando cuatro y exhale contando seis.'
        },
        {
          acciones: [
            { icono: '👂', t: 'Escuchar sin interrumpir', p: 2, fb: 'Escucha activa.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📇', t: 'Contactar al GAD y a Gestión de Riesgos', p: 2, fb: 'Conexión con recursos.', efecto: { confianza: 8, tension: -8 } },
            { icono: '🙂', t: 'Decirle que alguien le ayudará', p: 1, fb: 'Promesa vaga.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🚫', t: 'Decirle que no es tema de bomberos', p: 0, fb: 'Desatención.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Red de apoyo', claves: ['familia', 'familiar', 'vecino', 'hermana', 'confianza', 'red de apoyo'] },
            { n: 'Instituciones', claves: ['gad', 'mies', 'gestion de riesgos', 'albergue', 'municipio', 'institucion'] },
            { n: 'Necesidades básicas', claves: ['dormir', 'albergue', 'comida', 'abrigo', 'necesidad', 'agua'] }
          ],
          evitar: [ { claves: ['no es problema', 'no podemos hacer nada'], fb: 'Rompe la confianza.' } ],
          modelo: '¿Tiene algún familiar o vecino de confianza? Mientras tanto, la conecto con el GAD, Gestión de Riesgos y el MIES para un albergue y ayuda para usted y sus hijos.'
        },
        {
          acciones: [
            { icono: '💬', t: 'Explicar que sus reacciones son normales', p: 2, fb: 'Normalización.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🏥', t: 'Indicarle dónde buscar apoyo psicológico', p: 2, fb: 'Derivación oportuna.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⌛', t: 'Decirle que ya se le pasará', p: 1, fb: 'Sin orientación.', efecto: { confianza: 0, tension: 0 } },
            { icono: '⚠️', t: 'Decirle que es un ataque de nervios grave', p: 0, fb: 'Alarma innecesaria.', efecto: { confianza: -12, tension: 14 } }
          ],
          conceptos: [
            { n: 'Normalización', claves: ['normal', 'reaccion', 'esperable', 'comun', 'le pasa a muchos', 'situacion anormal'] },
            { n: 'Signos de alarma', claves: ['pesadilla', 'semanas', 'persist', 'no duerm', 'angustia', 'postraumat'] },
            { n: 'Derivación', claves: ['psicolog', 'centro de salud', 'profesional', 'apoyo', 'salud mental'] }
          ],
          evitar: [ { claves: ['volviendo loca', 'ataque de nervios'], fb: 'Etiquetar aumenta la angustia.' } ],
          modelo: 'Temblar y llorar son reacciones normales ante algo tan duro. Si en unas semanas siguen las pesadillas o la angustia, busque apoyo psicológico en el centro de salud.'
        }
      ]
    }
  },

  /* ================= CIOR-204 Informática Aplicada ================= */
  {
    id: 'asig-CIOR-204', cod: 'CIOR-204',
    titulo: 'Mapa y registro de un incendio forestal',
    asignaturas: ['CIOR-204'],
    persona: { nombre: 'Ing. Diego Tapia', rol: 'Analista de la sala de situación del GAD', avatar: '👨🏽‍💻', pitch: 1.0 },
    contexto: 'Hay un incendio de vegetación cerca de Fátima, en Pastaza. Desde la sala de situación te piden ubicarlo en un SIG, registrarlo en la base de datos de incidentes y organizar la comunicación digital del operativo.',
    objetivo: 'Usar SIG, bases de datos y herramientas de comunicación digital para la gestión de incidentes y recursos.',
    pasos: [
      { dice: 'Las cuadrillas reportan coordenadas por GPS. ¿Cómo lo representamos?', opciones: [
          { t: 'Cargo las coordenadas en el SIG, como QGIS, dibujo el polígono del área afectada, calculo la superficie y superpongo capas de viviendas, vías y fuentes de agua.', p: 2, r: 'Excelente, ya vemos qué casas están en riesgo.', fb: 'Un SIG integra capas geográficas para analizar áreas afectadas y planificar la respuesta.' },
          { t: 'Pongo un pin en Google Maps.', p: 1, r: 'Sirve para ubicar, pero no para analizar el área.', fb: 'Ubica el punto, pero no permite análisis espacial.' },
          { t: 'Lo describo en palabras: cerca de la loma.', p: 0, r: 'Así nadie llega.', fb: 'Sin georreferencia se pierde precisión y tiempo.' } ] },
      { dice: '¿Qué datos registras en la base de incidentes?', opciones: [
          { t: 'Código del incidente, fecha y hora, coordenadas, tipo, unidades y personal asignados, hora de llegada y estado; con campos estandarizados para hacer consultas.', p: 2, r: 'Así podemos filtrar y hacer estadística.', fb: 'Una base de datos con campos normalizados permite seguimiento de incidentes y recursos en tiempo real.' },
          { t: 'Anoto lo principal en un archivo de texto.', p: 1, r: 'Difícil de consultar después.', fb: 'Registra, pero sin estructura que permita consultas.' },
          { t: 'Lo apunto en un papel y lo paso después.', p: 0, r: 'Se puede perder y no está en línea.', fb: 'Sin registro digital oportuno no hay trazabilidad.' } ] },
      { dice: 'Todos mandan audios y fotos a un grupo de WhatsApp enorme. ¿Cómo ordenamos la comunicación?', opciones: [
          { t: 'Las órdenes operativas van por radio con el canal asignado; un grupo oficial solo para coordinación con administradores, y nada de fotos de víctimas ni datos personales.', p: 2, r: 'Perfecto, menos ruido y más seguro.', fb: 'Cada herramienta tiene su uso: radio para mando, plataformas colaborativas para coordinación, con protección de datos.' },
          { t: 'Pedimos que manden menos audios.', p: 1, r: 'Igual va a seguir el desorden.', fb: 'No establece protocolo ni roles.' },
          { t: 'Que sigan así y que suban todo a Facebook para informar.', p: 0, r: '¡Eso expone a las víctimas!', fb: 'Difundir información no verificada o sensible vulnera derechos y genera alarma.' } ] }
    ],
    vivo: {
      lugar: 'Sala de situación del GAD Provincial de Pastaza', fondo: 'oficina',
      inicio: { confianza: 50, tension: 55 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Cargar las coordenadas GPS en el SIG', p: 2, fb: 'Georreferencia precisa.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔶', t: 'Dibujar el polígono y superponer capas', p: 2, fb: 'Análisis espacial.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📌', t: 'Marcar solo un punto en el mapa', p: 1, fb: 'Análisis limitado.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🗣️', t: 'Describir la zona de memoria', p: 0, fb: 'Sin precisión.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'SIG y coordenadas', claves: ['sig', 'qgis', 'coordenada', 'gps', 'georrefer', 'mapa'] },
            { n: 'Área afectada', claves: ['poligono', 'area', 'superficie', 'hectarea', 'perimetro'] },
            { n: 'Capas de análisis', claves: ['capa', 'vivienda', 'vias', 'fuentes de agua', 'riesgo', 'superpon'] }
          ],
          evitar: [ { claves: ['cerca de la loma', 'por ahi'], fb: 'Ubicación imprecisa.' } ],
          modelo: 'Cargo las coordenadas GPS en QGIS, dibujo el polígono del área afectada, calculo la superficie y superpongo las capas de viviendas, vías y fuentes de agua.'
        },
        {
          acciones: [
            { icono: '🗃️', t: 'Crear el registro con campos estandarizados', p: 2, fb: 'Datos consultables.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🚒', t: 'Registrar unidades y personal asignados', p: 2, fb: 'Seguimiento de recursos.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📝', t: 'Escribir un archivo de texto libre', p: 1, fb: 'Difícil de consultar.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🧾', t: 'Anotar en papel para después', p: 0, fb: 'Sin trazabilidad.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Datos del incidente', claves: ['codigo', 'fecha', 'hora', 'tipo', 'coordenada', 'ubicacion'] },
            { n: 'Recursos', claves: ['unidad', 'personal', 'recurso', 'vehiculo', 'cuadrilla', 'asignad'] },
            { n: 'Base de datos', claves: ['base de datos', 'campo', 'tabla', 'consulta', 'filtr', 'registro'] }
          ],
          evitar: [ { claves: ['en un papel', 'despues lo paso'], fb: 'Pierde oportunidad y trazabilidad.' } ],
          modelo: 'Registro en la base de datos el código, fecha y hora, coordenadas, tipo de incidente, unidades y personal asignados y su estado, con campos estandarizados para consultas.'
        },
        {
          acciones: [
            { icono: '📻', t: 'Asignar canal de radio para órdenes', p: 2, fb: 'Mando claro.', efecto: { confianza: 8, tension: -6 } },
            { icono: '👥', t: 'Crear grupo oficial con administradores', p: 2, fb: 'Coordinación ordenada.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🔇', t: 'Pedir que manden menos audios', p: 1, fb: 'Sin protocolo.', efecto: { confianza: 0, tension: 1 } },
            { icono: '🌐', t: 'Publicar fotos de víctimas en redes', p: 0, fb: 'Vulnera derechos.', efecto: { confianza: -16, tension: 14 } }
          ],
          conceptos: [
            { n: 'Radio para el mando', claves: ['radio', 'canal', 'frecuencia', 'ordenes', 'operativ'] },
            { n: 'Plataforma colaborativa', claves: ['grupo oficial', 'administrador', 'plataforma', 'coordinacion', 'mensajeria', 'whatsapp'] },
            { n: 'Protección de información', claves: ['fotos de victimas', 'datos personales', 'no publicar', 'confidencial', 'verificad', 'privacidad'] }
          ],
          evitar: [ { claves: ['subir a facebook', 'publicar todo'], fb: 'Difunde información sensible.' } ],
          modelo: 'Las órdenes van por radio en el canal asignado; dejamos un grupo oficial con administradores solo para coordinación y no se comparten fotos de víctimas ni datos personales.'
        }
      ]
    }
  },

  /* ================= CIOR-205 Ciencias del Fuego II ================= */
  {
    id: 'asig-CIOR-205', cod: 'CIOR-205',
    titulo: 'Fuego subiendo la ladera con viento',
    asignaturas: ['CIOR-205'],
    persona: { nombre: 'Cap. Fausto Aguinda', rol: 'Jefe de operaciones del incendio', avatar: '👨🏽‍🚒', pitch: 0.85 },
    contexto: 'Un incendio de vegetación avanza ladera arriba hacia unas cabañas turísticas en el sector Río Anzu, con viento de la tarde a favor. El capitán te pide analizar la propagación y proponer la estrategia de control.',
    objetivo: 'Analizar el efecto del viento y la topografía, usar modelos de predicción y aplicar técnicas avanzadas de extinción.',
    pasos: [
      { dice: '¿Por qué el fuego avanza tan rápido hacia arriba?', opciones: [
          { t: 'La pendiente acerca las llamas al combustible de arriba y lo precalienta por convección y radiación; el viento a favor inclina las llamas y aporta oxígeno. Por eso no atacamos desde arriba de la cabeza.', p: 2, r: 'Exacto. Nadie se pone delante de la cabeza.', fb: 'En pendiente y con viento, la velocidad de propagación aumenta notablemente; atacar por delante de la cabeza en ladera es muy peligroso.' },
          { t: 'Porque hay viento.', p: 1, r: '¿Y la pendiente?', fb: 'Considera solo un factor del triángulo de comportamiento.' },
          { t: 'El fuego siempre va igual, da lo mismo.', p: 0, r: '¡Así se atrapa a una cuadrilla!', fb: 'Desconocer viento y topografía causa atrapamientos.' } ] },
      { dice: 'Necesito saber hacia dónde irá en la próxima hora.', opciones: [
          { t: 'Uso el triángulo combustible, clima y topografía y un simulador de propagación con datos de viento y humedad; estimo dirección y velocidad y lo reviso con vigías.', p: 2, r: 'Bien, actualiza cada 30 minutos.', fb: 'Los modelos y simulaciones predicen el comportamiento del fuego, pero se validan con observación de campo.' },
          { t: 'Creo que seguirá hacia arriba.', p: 1, r: '¿Con qué base?', fb: 'Intuición sin modelo ni datos.' },
          { t: 'No se puede predecir, esperemos a ver.', p: 0, r: 'Esperar no es estrategia.', fb: 'Renunciar a la predicción impide planificar.' } ] },
      { dice: '¿Qué estrategia proponemos para proteger las cabañas?', opciones: [
          { t: 'Ataque por flancos desde la cola con agua y espumante clase A, línea de control con cortafuego delante de las cabañas, y protocolo de vigías, comunicaciones, rutas de escape y zonas seguras.', p: 2, r: 'Aprobado. Prepara las cuadrillas.', fb: 'Ataque indirecto o por flancos, agentes humectantes y protocolos de seguridad (vigías, comunicación, rutas y zonas seguras) son la base del control.' },
          { t: 'Mojar todo lo que podamos con las mangueras.', p: 1, r: 'No alcanza el agua para todo.', fb: 'Sin estrategia ni línea de control se desperdician recursos.' },
          { t: 'Ponernos delante del fuego en la ladera para pararlo.', p: 0, r: '¡Es la posición más peligrosa!', fb: 'Ubicarse ladera arriba de la cabeza expone a atrapamiento.' } ] }
    ],
    vivo: {
      lugar: 'Ladera del sector Río Anzu, Mera', fondo: 'exterior',
      inicio: { confianza: 45, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🌬️', t: 'Medir dirección y velocidad del viento', p: 2, fb: 'Dato clave de propagación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⛰️', t: 'Evaluar la pendiente del terreno', p: 2, fb: 'Factor topográfico.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🔥', t: 'Mirar solo las llamas', p: 1, fb: 'Análisis incompleto.', efecto: { confianza: -2, tension: 3 } },
            { icono: '⬆️', t: 'Subir delante del frente para verlo mejor', p: 0, fb: 'Posición peligrosa.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Pendiente', claves: ['pendiente', 'ladera', 'cuesta', 'topograf', 'hacia arriba', 'inclinacion'] },
            { n: 'Precalentamiento', claves: ['precalient', 'conveccion', 'radiacion', 'calienta', 'acerca'] },
            { n: 'Viento', claves: ['viento', 'oxigeno', 'inclina', 'empuja', 'direccion', 'velocidad'] }
          ],
          evitar: [ { claves: ['da lo mismo', 'siempre va igual'], fb: 'Ignora factores de propagación.' } ],
          modelo: 'La pendiente acerca las llamas al combustible de arriba y lo precalienta por convección y radiación, y el viento las inclina y aporta oxígeno; por eso no atacamos por delante.'
        },
        {
          acciones: [
            { icono: '💻', t: 'Ingresar datos en el simulador de propagación', p: 2, fb: 'Predicción con modelo.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🔭', t: 'Ubicar vigías para validar la predicción', p: 2, fb: 'Verificación en campo.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🤔', t: 'Suponer la dirección por intuición', p: 1, fb: 'Sin base técnica.', efecto: { confianza: -3, tension: 3 } },
            { icono: '⏳', t: 'Esperar a ver qué hace el fuego', p: 0, fb: 'Pierde tiempo de planificación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Triángulo de comportamiento', claves: ['triangulo', 'combustible', 'clima', 'topograf', 'meteorolog', 'humedad'] },
            { n: 'Modelo o simulación', claves: ['modelo', 'simula', 'program', 'software', 'predic', 'proyecc'] },
            { n: 'Validación en campo', claves: ['vigia', 'observ', 'revis', 'actualiz', 'verific', 'campo'] }
          ],
          evitar: [ { claves: ['no se puede predecir', 'esperemos'], fb: 'Renuncia a planificar.' } ],
          modelo: 'Analizo combustible, clima y topografía y corro un simulador con el viento y la humedad; estimo dirección y velocidad y lo verifico con los vigías.'
        },
        {
          acciones: [
            { icono: '🪓', t: 'Abrir cortafuego delante de las cabañas', p: 2, fb: 'Línea de control.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🫧', t: 'Atacar flancos con agua y espumante clase A', p: 2, fb: 'Técnica avanzada eficaz.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚨', t: 'Definir rutas de escape y zonas seguras', p: 2, fb: 'Seguridad del personal.', efecto: { confianza: 8, tension: -8 } },
            { icono: '🧱', t: 'Formar línea delante de la cabeza', p: 0, fb: 'Riesgo de atrapamiento.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Ataque por flancos', claves: ['flanco', 'cola', 'anclaje', 'indirecto', 'lateral'] },
            { n: 'Agentes y línea de control', claves: ['espum', 'clase a', 'retardante', 'cortafuego', 'linea de control', 'humect'] },
            { n: 'Seguridad del personal', claves: ['vigia', 'comunicacion', 'ruta de escape', 'zona segura', 'escape', 'segur'] }
          ],
          evitar: [ { claves: ['delante del fuego', 'parar la cabeza'], fb: 'Posición de atrapamiento.' } ],
          modelo: 'Atacamos por los flancos desde la cola con agua y espumante clase A, abrimos una línea de control con cortafuego delante de las cabañas y aseguramos vigías, comunicaciones, rutas de escape y zonas seguras.'
        }
      ]
    }
  },

  /* ================= CIOR-206 Química del Fuego ================= */
  {
    id: 'asig-CIOR-206', cod: 'CIOR-206',
    titulo: 'Asesoría de extintores para un restaurante',
    asignaturas: ['CIOR-206'],
    persona: { nombre: 'Don Patricio Shiguango', rol: 'Dueño de un restaurante de maitos en Puyo', avatar: '👨🏽‍🍳', pitch: 0.95 },
    contexto: 'Don Patricio tiene freidoras, cocina a gas y un tablero eléctrico. Quiere comprar "cualquier extintor" para el permiso de funcionamiento. Debes explicarle cómo se produce el fuego y qué agente usar en cada caso.',
    objetivo: 'Explicar el tetraedro del fuego, la clasificación de agentes extintores y los métodos para interrumpir la reacción de combustión.',
    pasos: [
      { dice: 'A ver, ingeniero, ¿por qué se prende el fuego? Para mí es solo calor.', opciones: [
          { t: 'Le explico el tetraedro: se necesitan combustible, oxígeno, calor que alcance la temperatura de ignición y la reacción en cadena; si quitamos uno, el fuego se apaga.', p: 2, r: 'Ah, ¡cuatro cosas! Ahora entiendo.', fb: 'El tetraedro del fuego explica la combustión como reacción química exotérmica autosostenida.' },
          { t: 'Le digo que es el triángulo: combustible, oxígeno y calor.', p: 1, r: 'Ya, tres cosas.', fb: 'Correcto pero incompleto: omite la reacción en cadena, clave para agentes químicos.' },
          { t: 'Le digo que es por la mala suerte o descuido.', p: 0, r: 'Entonces no hay nada que hacer.', fb: 'No explica el fenómeno químico.' } ] },
      { dice: 'Si se prende la freidora, ¿le echo agua?', opciones: [
          { t: 'Nunca agua: provoca una explosión de vapor y aceite. Para aceites de cocina se usa un extintor clase K de acetato de potasio o tapar la freidora; PQS ABC para materiales sólidos y gas, y CO2 para el tablero eléctrico.', p: 2, r: '¡Uy, menos mal que pregunté!', fb: 'Clases: A sólidos, B líquidos y gases, C eléctricos, K aceites de cocina. El agente K saponifica el aceite y lo enfría.' },
          { t: 'Mejor use un extintor de polvo para todo.', p: 1, r: '¿Sirve en la freidora?', fb: 'El PQS es versátil, pero en aceites de cocina el clase K es el indicado por riesgo de reignición.' },
          { t: 'Sí, un balde de agua es lo más rápido.', p: 0, r: '¡Casi me quemo entonces!', fb: 'El agua sobre aceite caliente genera una bola de fuego.' } ] },
      { dice: '¿Y cómo es que el extintor apaga el fuego?', opciones: [
          { t: 'Cada agente actúa distinto: el agua enfría, el CO2 sofoca desplazando el oxígeno, el polvo químico inhibe la reacción en cadena, y cerrar la válvula del gas elimina el combustible.', p: 2, r: 'Clarísimo, compraré los que me dice.', fb: 'Métodos de extinción: enfriamiento, sofocación, eliminación del combustible e inhibición química.' },
          { t: 'Lo enfría, como el agua.', p: 1, r: '¿Todos igual?', fb: 'Solo describe el enfriamiento.' },
          { t: 'Lo apaga por la presión del chorro.', p: 0, r: 'Ah, ¿es por la fuerza?', fb: 'Concepto erróneo: la extinción es química y física, no por empuje.' } ] }
    ],
    vivo: {
      lugar: 'Cocina de un restaurante en el malecón de Puyo', fondo: 'comunidad',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🔺', t: 'Dibujar el tetraedro del fuego en una hoja', p: 2, fb: 'Apoyo visual didáctico.', efecto: { confianza: 10, tension: -4 } },
            { icono: '🔥', t: 'Señalar los combustibles de su cocina', p: 2, fb: 'Aplica al contexto real.', efecto: { confianza: 8, tension: -3 } },
            { icono: '📐', t: 'Mencionar solo el triángulo del fuego', p: 1, fb: 'Incompleto.', efecto: { confianza: 0, tension: 1 } },
            { icono: '🍀', t: 'Atribuirlo a la mala suerte', p: 0, fb: 'Sin base técnica.', efecto: { confianza: -12, tension: 6 } }
          ],
          conceptos: [
            { n: 'Combustible y oxígeno', claves: ['combustible', 'oxigeno', 'aire', 'aceite', 'gas'] },
            { n: 'Calor e ignición', claves: ['calor', 'temperatura', 'ignicion', 'energia de activacion', 'chispa'] },
            { n: 'Reacción en cadena', claves: ['reaccion en cadena', 'tetraedro', 'cuatro', 'radicales', 'reaccion quimica'] }
          ],
          evitar: [ { claves: ['mala suerte', 'solo calor'], fb: 'No explica la combustión.' } ],
          modelo: 'El fuego necesita cuatro elementos, el tetraedro: combustible, oxígeno, calor suficiente para la ignición y la reacción en cadena. Si quitamos uno, se apaga.'
        },
        {
          acciones: [
            { icono: '🧯', t: 'Recomendar extintor clase K para freidoras', p: 2, fb: 'Agente correcto para aceites.', efecto: { confianza: 10, tension: -5 } },
            { icono: '⚡', t: 'Ubicar extintor de CO2 junto al tablero', p: 2, fb: 'No conduce electricidad ni deja residuo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🌀', t: 'Recomendar un solo extintor de polvo', p: 1, fb: 'Versátil pero no óptimo en aceites.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🪣', t: 'Dejar un balde de agua junto a la freidora', p: 0, fb: 'Riesgo de explosión de vapor.', efecto: { confianza: -16, tension: 14 } }
          ],
          conceptos: [
            { n: 'Nunca agua en aceite', claves: ['nunca agua', 'no agua', 'explosion', 'vapor', 'bola de fuego', 'salpica'] },
            { n: 'Clase K', claves: ['clase k', 'acetato', 'potasio', 'tapar', 'aceite de cocina', 'freidora'] },
            { n: 'Otras clases y agentes', claves: ['pqs', 'polvo quimico', 'abc', 'co2', 'dioxido', 'electric'] }
          ],
          evitar: [ { claves: ['balde de agua', 'echele agua'], fb: 'Agua sobre aceite caliente es peligrosa.' } ],
          modelo: 'Nunca agua en la freidora, causa una explosión de vapor. Use extintor clase K de acetato de potasio o tápela; PQS ABC para sólidos y gas, y CO2 para el tablero eléctrico.'
        },
        {
          acciones: [
            { icono: '🧊', t: 'Explicar el enfriamiento con agua', p: 2, fb: 'Método de enfriamiento.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔒', t: 'Mostrar cómo cerrar la válvula del gas', p: 2, fb: 'Eliminación del combustible.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🧪', t: 'Explicar la inhibición del polvo químico', p: 2, fb: 'Rompe la reacción en cadena.', efecto: { confianza: 8, tension: -3 } },
            { icono: '💨', t: 'Decir que apaga por la fuerza del chorro', p: 0, fb: 'Concepto erróneo.', efecto: { confianza: -12, tension: 6 } }
          ],
          conceptos: [
            { n: 'Enfriamiento', claves: ['enfri', 'agua', 'baja la temperatura', 'absorbe calor', 'calor'] },
            { n: 'Sofocación', claves: ['sofoc', 'desplaza el oxigeno', 'co2', 'tapar', 'oxigeno', 'manta'] },
            { n: 'Inhibición y eliminación', claves: ['inhib', 'reaccion en cadena', 'eliminar', 'valvula', 'cortar el gas', 'combustible'] }
          ],
          evitar: [ { claves: ['por la presion', 'por la fuerza'], fb: 'No es el mecanismo de extinción.' } ],
          modelo: 'El agua enfría, el CO2 sofoca desplazando el oxígeno, el polvo químico inhibe la reacción en cadena y cerrar la válvula del gas elimina el combustible.'
        }
      ]
    }
  },

  /* ================= CIOR-209 Atención Prehospitalaria ================= */
  {
    id: 'asig-CIOR-209', cod: 'CIOR-209',
    titulo: 'Volcamiento de bus en la vía Puyo–Macas',
    asignaturas: ['CIOR-209'],
    persona: { nombre: 'Lcdo. Jorge Cerda', rol: 'Paramédico de la ambulancia', avatar: '🧑🏽‍⚕️', pitch: 1.0 },
    contexto: 'Un bus interprovincial se volcó cerca de Veracruz con 18 pasajeros. Llegas en la primera unidad junto al paramédico; debes hacer triage, evaluar e inmovilizar a una víctima crítica y entregarla en el hospital.',
    objetivo: 'Aplicar triage de víctimas, evaluación primaria, soporte vital básico, inmovilización, transporte y transferencia segura.',
    pasos: [
      { dice: 'Hay muchos heridos. ¿Cómo los clasificamos?', opciones: [
          { t: 'Triage START: los que caminan son verdes; a los demás evalúo respiración, frecuencia mayor a 30, llenado capilar mayor a 2 segundos o si no obedece órdenes son rojos; si no respira tras abrir la vía aérea, negro.', p: 2, r: 'Perfecto, empieza con las tarjetas.', fb: 'START clasifica en menos de 60 segundos por víctima usando respiración, perfusión y estado mental.' },
          { t: 'Atiendo primero al que más grita.', p: 1, r: 'El que grita respira; ¿y los callados?', fb: 'Sin método se pasa por alto a los más graves.' },
          { t: 'Empiezo RCP al primero que encuentre inconsciente.', p: 0, r: '¡Hay 17 más esperando!', fb: 'En víctimas múltiples, la RCP prolongada a un paciente sin signos consume recursos para otros recuperables.' } ] },
      { dice: 'Este señor salió despedido, está confuso y se queja del cuello. ¿Qué haces?', opciones: [
          { t: 'Control manual de columna cervical, evaluación XABCDE: hemorragias, vía aérea, respiración, circulación y neurológico; collarín, tabla rígida con bloques e inmovilización en bloque.', p: 2, r: 'Bien, giramos en bloque a la cuenta de tres.', fb: 'Ante mecanismo de alta energía se sospecha lesión medular: restricción de movimiento y evaluación primaria ordenada.' },
          { t: 'Le pongo un collarín y lo subo a la camilla.', p: 1, r: '¿Y la evaluación primaria?', fb: 'Inmoviliza, pero sin evaluación sistemática.' },
          { t: 'Lo siento para que respire mejor.', p: 0, r: '¡Puede tener lesión de columna!', fb: 'Movilizar sin restricción puede causar lesión medular.' } ] },
      { dice: 'Llegamos al Hospital General de Puyo. Haz la entrega.', opciones: [
          { t: 'Entrego al médico con un reporte ordenado: edad, mecanismo, lesiones encontradas, signos vitales y su evolución, tratamiento aplicado y hora; y firmo la hoja de atención.', p: 2, r: 'Gracias, con esto seguimos sin perder tiempo.', fb: 'La transferencia estructurada (por ejemplo, MIST o SBAR) evita pérdida de información crítica.' },
          { t: 'Le digo que es un accidente de bus y que está mal.', p: 1, r: '¿Qué signos tiene? ¿Qué le hicieron?', fb: 'Información incompleta para la continuidad de la atención.' },
          { t: 'Lo dejo en emergencia y regreso rápido a la escena.', p: 0, r: '¿Y quién es este paciente?', fb: 'Abandonar sin entrega formal rompe la cadena asistencial.' } ] }
    ],
    vivo: {
      lugar: 'Vía Puyo–Macas, sector Veracruz', fondo: 'emergencia',
      inicio: { confianza: 45, tension: 85 },
      pasos: [
        {
          acciones: [
            { icono: '🚶', t: 'Pedir que los que caminan vayan a un punto', p: 2, fb: 'Separa verdes rápidamente.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🏷️', t: 'Colocar tarjetas de colores según START', p: 2, fb: 'Clasificación visible.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📢', t: 'Atender al que más grita', p: 1, fb: 'Sin método.', efecto: { confianza: -3, tension: 4 } },
            { icono: '🫀', t: 'Hacer RCP prolongada al primer inconsciente', p: 0, fb: 'Consume recursos en víctimas múltiples.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Método START', claves: ['start', 'triage', 'clasific', 'tarjeta', 'colores'] },
            { n: 'Criterios', claves: ['caminan', 'respira', '30', 'treinta', 'llenado capilar', 'obedece', 'dos segundos'] },
            { n: 'Categorías', claves: ['verde', 'amarillo', 'rojo', 'negro', 'prioridad'] }
          ],
          evitar: [ { claves: ['el que mas grita', 'al primero que vea'], fb: 'Sin criterio de prioridad.' } ],
          modelo: 'Aplico START: los que caminan son verdes; si respiran más de 30, el llenado capilar pasa de 2 segundos o no obedecen, son rojos; si no respiran al abrir la vía aérea, negros.'
        },
        {
          acciones: [
            { icono: '🙌', t: 'Sujetar manualmente la cabeza y el cuello', p: 2, fb: 'Restricción cervical.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🩺', t: 'Realizar evaluación primaria XABCDE', p: 2, fb: 'Evaluación sistemática.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🦴', t: 'Poner collarín y subir a camilla', p: 1, fb: 'Falta evaluación.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🪑', t: 'Sentarlo para que respire mejor', p: 0, fb: 'Riesgo de lesión medular.', efecto: { confianza: -15, tension: 15 } }
          ],
          conceptos: [
            { n: 'Control cervical', claves: ['cervical', 'columna', 'cuello', 'cabeza', 'collarin', 'restriccion'] },
            { n: 'Evaluación primaria', claves: ['xabcde', 'abcde', 'via aerea', 'respiracion', 'circulacion', 'hemorragia', 'neurologic'] },
            { n: 'Inmovilización', claves: ['tabla', 'inmoviliz', 'en bloque', 'bloques', 'correa', 'camilla'] }
          ],
          evitar: [ { claves: ['sentarlo', 'que se levante'], fb: 'Movilización peligrosa.' } ],
          modelo: 'Mantengo control manual de la columna cervical, hago la evaluación XABCDE y luego lo inmovilizo con collarín y tabla rígida, girándolo en bloque.'
        },
        {
          acciones: [
            { icono: '🗒️', t: 'Entregar reporte verbal estructurado', p: 2, fb: 'Continuidad asistencial.', efecto: { confianza: 10, tension: -6 } },
            { icono: '✍️', t: 'Firmar la hoja de atención prehospitalaria', p: 2, fb: 'Respaldo documental.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🗨️', t: 'Decir solo que está grave', p: 1, fb: 'Información incompleta.', efecto: { confianza: -3, tension: 4 } },
            { icono: '🏃', t: 'Dejarlo sin entrega y salir', p: 0, fb: 'Rompe la cadena asistencial.', efecto: { confianza: -15, tension: 12 } }
          ],
          conceptos: [
            { n: 'Datos del paciente y mecanismo', claves: ['edad', 'mecanismo', 'despedido', 'volcamiento', 'paciente', 'accidente'] },
            { n: 'Lesiones y signos', claves: ['lesion', 'signos vitales', 'presion', 'pulso', 'glasgow', 'evolucion'] },
            { n: 'Tratamiento y registro', claves: ['tratamiento', 'aplicad', 'hora', 'hoja', 'firm', 'inmoviliz'] }
          ],
          evitar: [ { claves: ['ahi lo dejo', 'nos vamos'], fb: 'Abandono sin transferencia.' } ],
          modelo: 'Doctor, varón de unos 40 años, despedido en volcamiento de bus; confuso, dolor cervical, pulso 110 y presión estable; inmovilizado con collarín y tabla a las 15:20. Firmo la hoja de atención.'
        }
      ]
    }
  }
]);
