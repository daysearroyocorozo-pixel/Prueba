/* Prácticas por asignatura – Construcción (PAO 1–2) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ============ C-B-101 Ética y Desarrollo Profesional ============ */
  {
    id: 'asig-C-B-101', cod: 'C-B-101',
    titulo: 'Pago justo para un obrero migrante',
    asignaturas: ['C-B-101'],
    persona: { nombre: 'Maestro Cando', rol: 'Maestro mayor de la obra', avatar: '👷🏽‍♂️', pitch: 0.85 },
    contexto: 'En una vivienda en el barrio Obrero de Puyo, el maestro mayor propone pagarle menos y no afiliar a un ayudante venezolano "porque no tiene papeles". Como residente en formación debes actuar con ética y respeto a los derechos humanos.',
    objetivo: 'Aplicar principios éticos, valores y derechos humanos en el ejercicio profesional y rechazar prácticas abusivas o encubrimientos.',
    pasos: [
      { dice: 'Ingeniero, a este muchacho venezolano le pagamos la mitad del jornal y sin seguro. Igual no se va a quejar, ¿no ve que no tiene papeles?', opciones: [
          { t: 'Le digo que todos los trabajadores reciben el mismo jornal por el mismo trabajo y que se debe afiliar al IESS; su condición migratoria no le quita derechos.', p: 2, r: 'Bueno, si usted lo dice... pero eso sube el costo de la mano de obra.', fb: 'La igualdad y la no discriminación son principios de derechos humanos; la legislación laboral ecuatoriana protege a todo trabajador, nacional o extranjero.' },
          { t: 'Le pido que le pague un poco más, pero que lo de la afiliación lo vean después.', p: 1, r: 'Ya, le subo unos dólares y el seguro más adelante.', fb: 'Mejora el pago, pero postergar la afiliación deja al trabajador sin protección ante accidentes, algo frecuente en obra.' },
          { t: 'Acepto: si él está de acuerdo, no es asunto mío.', p: 0, r: 'Así me gusta, ingeniero, práctico.', fb: 'Aprovecharse de la vulnerabilidad de una persona es una falta ética grave y un abuso laboral; el residente también responde por lo que tolera.' } ] },
      { dice: '(Más tarde, Jhonny, el ayudante, se acerca nervioso.) Profe, no quiero problemas. Si reclamo me botan y no tengo cómo mandar plata a mi familia.', opciones: [
          { t: 'Lo escucho con calma, le explico que tiene derecho a un pago justo y a seguridad social, y le aseguro que yo hablaré con el propietario sin exponerlo.', p: 2, r: 'Gracias... nadie me había explicado eso.', fb: 'La ética profesional incluye proteger a la parte más vulnerable y actuar con discreción y respeto a su dignidad.' },
          { t: 'Le digo que no se preocupe, que mejor no diga nada por ahora.', p: 1, r: 'Ya, me quedo callado entonces.', fb: 'Evita el conflicto inmediato, pero perpetúa la injusticia; el silencio no resuelve el problema.' },
          { t: 'Le digo que si no le gusta, hay otros que quieren el trabajo.', p: 0, r: '(Baja la mirada y se retira.)', fb: 'Es una amenaza que vulnera la dignidad humana; contradice los valores básicos de la profesión.' } ] },
      { dice: '(Días después Jhonny se corta la mano con la amoladora.) Ingeniero, no pongamos nada en el libro de obra, que si se entera el propietario nos complica.', opciones: [
          { t: 'Me niego: lo llevamos a atención médica, registro el accidente con veracidad en el libro de obra e informo al propietario.', p: 2, r: 'Está bien... usted es el que firma el libro.', fb: 'La honestidad y la responsabilidad son principios éticos; ocultar un accidente perjudica al trabajador y expone a todos a sanciones.' },
          { t: 'Lo llevo al centro de salud, pero en el libro pongo solo "incidente menor".', p: 1, r: 'Así nadie se alarma.', fb: 'Atenderlo es correcto, pero minimizar el registro falsea la información y debilita la prevención.' },
          { t: 'Acepto no registrar nada y le doy una venda del botiquín.', p: 0, r: 'Listo, aquí no pasó nada.', fb: 'Encubrir un accidente es una conducta deshonesta que puede agravar la lesión y la responsabilidad legal.' } ] }
    ],
    vivo: {
      lugar: 'Vivienda en construcción en el barrio Obrero de Puyo, junto a la bodega de herramientas', fondo: 'obra',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '🗣️', t: 'Llamar al maestro aparte para hablar en privado', p: 2, fb: 'Tratar el tema en privado evita humillar a nadie y facilita el diálogo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📒', t: 'Revisar la planilla de jornales de la cuadrilla', p: 2, fb: 'Comprobar los pagos reales da sustento objetivo a tu posición.', efecto: { confianza: 4, tension: 2 } },
            { icono: '🤷', t: 'Encogerse de hombros y seguir con la obra', p: 0, fb: 'La indiferencia ante un abuso es complicidad.', efecto: { confianza: -6, tension: 8 } }
          ],
          conceptos: [
            { n: 'Igualdad de pago y no discriminación', claves: ['mismo jornal', 'mismo pago', 'igual', 'discrimin', 'por ser extranjero', 'nacionalidad', 'justo'] },
            { n: 'Derecho a la seguridad social', claves: ['iess', 'afili', 'seguro social', 'seguridad social', 'seguro'] },
            { n: 'Derechos humanos y dignidad', claves: ['derechos humanos', 'derecho', 'dignidad', 'respeto', 'persona', 'no le quita'] }
          ],
          evitar: [ { claves: ['no tiene papeles', 'no es mi problema', 'que se aguante'], fb: 'Justificar el abuso por la situación migratoria es discriminatorio.' } ],
          modelo: 'Maestro, a Jhonny le pagamos el mismo jornal que a los demás porque hace el mismo trabajo, y hay que afiliarlo al IESS. Ser extranjero no le quita sus derechos humanos ni su dignidad.'
        },
        {
          acciones: [
            { icono: '👂', t: 'Escuchar al ayudante sin interrumpirlo', p: 2, fb: 'La escucha activa muestra respeto y genera confianza.', efecto: { confianza: 10, tension: -8 } },
            { icono: '🤫', t: 'Prometer reserva sobre lo que te cuenta', p: 2, fb: 'La confidencialidad protege al trabajador de represalias.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🚪', t: 'Mandarlo de vuelta al trabajo sin escucharlo', p: 0, fb: 'Ignorarlo refuerza su vulnerabilidad.', efecto: { confianza: -10, tension: 8 } },
            { icono: '📱', t: 'Grabarlo con el celular sin pedirle permiso', p: 0, fb: 'Grabar sin consentimiento vulnera su privacidad.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Explicar sus derechos laborales', claves: ['derecho', 'pago justo', 'jornal', 'seguro', 'afili', 'iess'] },
            { n: 'Proteger al trabajador de represalias', claves: ['no te van a botar', 'sin exponerte', 'reserva', 'confidencial', 'protege', 'tranquilo', 'no te pasara nada'] },
            { n: 'Compromiso de actuar', claves: ['hablare', 'voy a hablar', 'propietario', 'me encargo', 'yo lo resuelvo', 'solucion'] }
          ],
          evitar: [ { claves: ['si no te gusta', 'hay otros', 'te botan'], fb: 'Amenazar a un trabajador vulnera su dignidad.' } ],
          modelo: 'Jhonny, tienes derecho a un pago justo y a estar afiliado al IESS. No te voy a exponer: yo hablaré con el propietario y me encargo de que se solucione.'
        },
        {
          acciones: [
            { icono: '🚑', t: 'Llevar al herido al centro de salud', p: 2, fb: 'La atención inmediata es la primera obligación ante un accidente.', efecto: { confianza: 8, tension: -6 } },
            { icono: '✍️', t: 'Registrar el accidente en el libro de obra', p: 2, fb: 'El registro veraz permite investigar y prevenir.', efecto: { confianza: 4, tension: 4 } },
            { icono: '🩹', t: 'Vendarlo y seguir como si nada', p: 0, fb: 'Una herida de amoladora puede comprometer tendones; ocultarla es irresponsable.', efecto: { confianza: -8, tension: 10 } }
          ],
          conceptos: [
            { n: 'Atención médica primero', claves: ['centro de salud', 'medic', 'hospital', 'atencion', 'curar', 'doctor'] },
            { n: 'Registrar con veracidad', claves: ['registr', 'libro de obra', 'anotar', 'verdad', 'honest', 'no voy a ocultar'] },
            { n: 'Informar al responsable', claves: ['propietario', 'inform', 'avisar', 'comunicar', 'reportar'] }
          ],
          evitar: [ { claves: ['aqui no paso nada', 'no anotamos', 'ocultemos'], fb: 'Encubrir un accidente es deshonesto y agrava la responsabilidad.' } ],
          modelo: 'No, maestro: primero llevamos a Jhonny al centro de salud, luego registro el accidente con la verdad en el libro de obra e informo al propietario.'
        }
      ]
    }
  },

  /* ============ C-B-102 Materiales de la Construcción ============ */
  {
    id: 'asig-C-B-102', cod: 'C-B-102',
    titulo: 'Guadúa, hormigón y acero para una terraza',
    asignaturas: ['C-B-102'],
    persona: { nombre: 'Doña Rosa Tanguila', rol: 'Propietaria de una vivienda en Shell', avatar: '👩🏽', pitch: 1.15 },
    contexto: 'Doña Rosa quiere una terraza cubierta con estructura de bambú (guadúa) sobre una losa de hormigón. Debes aconsejarla sobre la selección de materiales según durabilidad y resistencia en clima amazónico.',
    objetivo: 'Seleccionar materiales (bambú, hormigón, acero) según su clasificación, durabilidad y resistencia, considerando el clima húmedo.',
    pasos: [
      { dice: 'Joven, mi vecino cortó guadúa de su finca ayer. ¿La usamos así mismo para los pilares de la terraza, directo enterrados en el suelo?', opciones: [
          { t: 'Le explico que la guadúa debe ser madura, secada y preservada (inmunizada), y que debe apoyarse sobre un pedestal de hormigón, protegida de la lluvia directa.', p: 2, r: 'Ah, o sea que el bambú necesita "buenas botas y buen sombrero".', fb: 'El bambú sin preservar es atacado por insectos y hongos; el contacto con el suelo húmedo y la lluvia lo pudren rápido.' },
          { t: 'Le digo que sí se puede usar, pero que la pinte antes.', p: 1, r: 'Ya, con una manito de pintura.', fb: 'La pintura no reemplaza el secado ni la preservación interna del bambú.' },
          { t: 'Le digo que la entierre así mismo, que el bambú dura muchísimo.', p: 0, r: 'Perfecto, mañana mismo los paramos.', fb: 'La guadúa verde enterrada se pudre en pocos años en clima amazónico.' } ] },
      { dice: 'Para la losa de la terraza, el maestro dice que le pone bastante agua al hormigón para que sea más fácil de trabajar. ¿Está bien?', opciones: [
          { t: 'Le explico que el exceso de agua aumenta la relación agua/cemento y reduce la resistencia del hormigón endurecido; se debe respetar el diseño de mezcla.', p: 2, r: 'Entonces más agua es más débil... no sabía.', fb: 'La resistencia del concreto depende en gran parte de la relación agua/cemento; la trabajabilidad se controla con el diseño de mezcla o aditivos.' },
          { t: 'Le digo que un poquito más de agua no importa.', p: 1, r: 'Un poquito nomás entonces.', fb: 'Cualquier agua adicional no prevista en el diseño reduce la resistencia.' },
          { t: 'Le digo que mientras más aguado, mejor llena el encofrado.', p: 0, r: 'Eso mismo dice el maestro.', fb: 'El hormigón aguado se segrega, se fisura y pierde resistencia.' } ] },
      { dice: '(Doña Rosa señala las varillas.) Las varillas llegaron ayer y las dejaron en el patio, sobre el lodo y bajo la lluvia. ¿Pasa algo?', opciones: [
          { t: 'Le indico almacenarlas sobre tacos de madera, separadas del suelo y cubiertas con plástico para evitar la corrosión y el lodo adherido.', p: 2, r: 'Ahorita le digo a mi hijo que las levante.', fb: 'El óxido profundo y el lodo reducen la adherencia entre el acero y el hormigón.' },
          { t: 'Le digo que solo las limpie con agua antes de usarlas.', p: 1, r: 'Ya, con la manguera.', fb: 'Limpiar ayuda, pero el problema es el almacenamiento: deben estar sobre el suelo y protegidas.' },
          { t: 'Le digo que el óxido hace que el hormigón se pegue mejor.', p: 0, r: 'Ah, entonces que se oxiden.', fb: 'La corrosión avanzada reduce la sección del acero y su resistencia.' } ] }
    ],
    vivo: {
      lugar: 'Patio de una vivienda en Shell, junto al acopio de guadúa y varillas', fondo: 'obra',
      inicio: { confianza: 55, tension: 35 },
      pasos: [
        {
          acciones: [
            { icono: '🎋', t: 'Revisar el color y la madurez de las cañas', p: 2, fb: 'La guadúa madura (aprox. 4 a 6 años) tiene mejor resistencia.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧪', t: 'Proponer inmunizar las cañas con sales de boro', p: 2, fb: 'La preservación con sales bóricas protege contra insectos y hongos.', efecto: { confianza: 6, tension: -2 } },
            { icono: '⛏️', t: 'Cavar huecos para enterrar las cañas', p: 0, fb: 'El contacto directo con el suelo húmedo pudre el bambú.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Secado y preservación del bambú', claves: ['secad', 'preserv', 'inmuniz', 'boro', 'tratad', 'tratamiento'] },
            { n: 'Proteger del suelo con pedestal', claves: ['pedestal', 'base de hormigon', 'dado', 'no enterrar', 'separad', 'del suelo', 'botas'] },
            { n: 'Proteger de la lluvia y la humedad', claves: ['lluvia', 'humedad', 'alero', 'cubiert', 'sombrero', 'proteg'] }
          ],
          evitar: [ { claves: ['enterrar directo', 'asi mismo', 'verde nomas'], fb: 'La guadúa verde y enterrada se deteriora rápido.' } ],
          modelo: 'Doña Rosa, la guadúa debe secarse e inmunizarse con sales de boro, apoyarse sobre un pedestal de hormigón separada del suelo y protegerse de la lluvia con aleros.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Pedir el diseño de mezcla para la losa', p: 2, fb: 'El diseño de mezcla fija las proporciones y la relación agua/cemento.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🪣', t: 'Medir el agua con un balde graduado', p: 2, fb: 'Dosificar el agua evita alterar la resistencia.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🚿', t: 'Echar agua con la manguera a la mezcladora', p: 0, fb: 'Agua sin control aumenta la relación agua/cemento.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Relación agua/cemento', claves: ['agua cemento', 'relacion', 'agua/cemento', 'exceso de agua', 'mas agua'] },
            { n: 'Pérdida de resistencia del hormigón endurecido', claves: ['resistencia', 'debil', 'endurecido', 'fisur', 'menos resistente'] },
            { n: 'Respetar el diseño de mezcla', claves: ['diseno de mezcla', 'dosific', 'proporcion', 'medir', 'aditivo'] }
          ],
          evitar: [ { claves: ['mas aguado', 'no importa el agua'], fb: 'El agua extra debilita el hormigón.' } ],
          modelo: 'No conviene: más agua sube la relación agua/cemento y el hormigón endurecido pierde resistencia. Hay que respetar el diseño de mezcla y medir el agua.'
        },
        {
          acciones: [
            { icono: '🪵', t: 'Colocar tacos de madera bajo las varillas', p: 2, fb: 'Separar el acero del suelo evita humedad y lodo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🛡️', t: 'Cubrir el acero con plástico', p: 2, fb: 'Protege de la lluvia y reduce la corrosión.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🧽', t: 'Limpiar el lodo con un cepillo de alambre', p: 1, fb: 'Ayuda, pero sin buen almacenamiento el problema vuelve.', efecto: { confianza: 2, tension: 0 } },
            { icono: '🌧️', t: 'Dejar las varillas en el lodo', p: 0, fb: 'Favorece la corrosión y la pérdida de adherencia.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Almacenar separado del suelo', claves: ['tacos', 'separad', 'del suelo', 'levant', 'sobre madera', 'apoyar'] },
            { n: 'Proteger de la lluvia', claves: ['cubrir', 'plastico', 'lona', 'techo', 'lluvia', 'bajo techo'] },
            { n: 'Evitar corrosión y pérdida de adherencia', claves: ['oxid', 'corros', 'adherencia', 'lodo', 'seccion'] }
          ],
          evitar: [ { claves: ['el oxido ayuda', 'se pega mejor'], fb: 'La corrosión reduce la sección del acero.' } ],
          modelo: 'Hay que levantar las varillas sobre tacos de madera, separadas del suelo y cubiertas con plástico, para evitar la corrosión y que el lodo quite adherencia con el hormigón.'
        }
      ]
    }
  },

  /* ============ C-B-103 Dibujo Técnico y Geometría Descriptiva ============ */
  {
    id: 'asig-C-B-103', cod: 'C-B-103',
    titulo: 'Leer vistas y escalas con el albañil',
    asignaturas: ['C-B-103'],
    persona: { nombre: 'Don Segundo Guamán', rol: 'Albañil con experiencia', avatar: '👷🏻‍♂️', pitch: 0.95 },
    contexto: 'Don Segundo no entiende el plano de una zapata con planta y corte. Debes explicarle los sistemas de representación (vistas), la escala y luego hacer un croquis a mano alzada para un cambio que pide el propietario.',
    objetivo: 'Interpretar vistas, cortes y escalas, y comunicar ideas con croquis a mano alzada acotados.',
    pasos: [
      { dice: 'Ingeniero, aquí hay dos dibujos de la misma zapata, uno cuadrado y otro como una "T" al revés. ¿Cuál es el bueno?', opciones: [
          { t: 'Le explico que ambos son la misma zapata: la planta es la vista desde arriba y el corte muestra el interior visto de lado, con la altura y el acero.', p: 2, r: 'Ah, es como mirar la zapata desde arriba y después partirla por la mitad.', fb: 'En los sistemas de representación cada vista muestra dos dimensiones; se combinan para entender el objeto en tres dimensiones.' },
          { t: 'Le digo que use el de arriba, que es el principal.', p: 1, r: '¿Y la altura de dónde saco?', fb: 'La planta sola no da la altura ni la posición del acero.' },
          { t: 'Le digo que haga la zapata como le parezca, que los dibujos son referenciales.', p: 0, r: 'Bueno, como siempre la hago.', fb: 'Los planos son documentos técnicos obligatorios; ignorarlos causa errores estructurales.' } ] },
      { dice: 'Aquí dice escala 1:50. Con mi regla mido 3 centímetros de lado. ¿Cuánto tiene que medir en el terreno?', opciones: [
          { t: 'Le explico que 1:50 significa que 1 cm del plano son 50 cm reales; 3 cm por 50 da 150 cm, o sea 1,50 m. Y que siempre se priorizan las cotas escritas.', p: 2, r: '¡Un metro cincuenta! Ya cuadra con lo que pensaba.', fb: 'La escala es la relación entre la medida del dibujo y la real; las cotas escritas mandan sobre las medidas tomadas con regla.' },
          { t: 'Le digo que mida 3 metros más o menos.', p: 1, r: '¿Tres metros? Me parece mucho.', fb: 'Error de cálculo: 3 × 50 = 150 cm.' },
          { t: 'Le digo que 3 cm es lo que mide en la realidad.', p: 0, r: '¿Una zapata de tres centímetros?', fb: 'Confundir la medida del plano con la real es un error grave de interpretación.' } ] },
      { dice: '(El propietario llega.) Quiero aumentar una bodega de 2,5 por 3 metros atrás. ¿Me lo dibuja rapidito para que entienda el maestro?', opciones: [
          { t: 'Hago un croquis a mano alzada con la planta, la ubicación respecto a la casa, las cotas de 2,50 y 3,00 m, puerta y orientación, y aclaro que luego se pasa a plano formal y requiere aprobación.', p: 2, r: 'Así sí se entiende clarito.', fb: 'El croquis acotado comunica rápido la idea; el anteproyecto y el proyecto formal vienen después.' },
          { t: 'Hago un dibujo sin medidas para que se haga una idea.', p: 1, r: '¿Y de qué tamaño exactamente?', fb: 'Un croquis sin cotas no sirve para construir.' },
          { t: 'Le digo que el maestro lo puede hacer sin dibujo.', p: 0, r: 'Bueno, que improvise entonces.', fb: 'Construir sin representación gráfica genera errores y conflictos.' } ] }
    ],
    vivo: {
      lugar: 'Caseta de obra con los planos extendidos sobre una tabla', fondo: 'obra',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Señalar la planta y el corte en el plano', p: 2, fb: 'Relacionar vistas en el mismo plano facilita la comprensión.', efecto: { confianza: 8, tension: -5 } },
            { icono: '🧱', t: 'Hacer un modelo con bloques para mostrar las vistas', p: 2, fb: 'Un modelo físico ayuda a visualizar la proyección.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙄', t: 'Decirle que eso es fácil y alejarse', p: 0, fb: 'Desatender la duda genera errores en obra.', efecto: { confianza: -8, tension: 6 } }
          ],
          conceptos: [
            { n: 'Planta: vista desde arriba', claves: ['planta', 'desde arriba', 'vista superior', 'arriba', 'vista en planta', 'encima'] },
            { n: 'Corte: interior visto de lado', claves: ['corte', 'seccion', 'de lado', 'interior', 'partida', 'por la mitad'] },
            { n: 'Ambas vistas representan el mismo elemento', claves: ['misma zapata', 'mismo', 'las dos', 'ambas', 'combinan', 'tres dimensiones'] }
          ],
          evitar: [ { claves: ['como le parezca', 'son referenciales'], fb: 'Los planos deben cumplirse.' } ],
          modelo: 'Don Segundo, las dos son la misma zapata: la planta es la vista desde arriba y el corte la muestra partida por la mitad, vista de lado, con su altura y el acero.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Medir con el escalímetro en la escala 1:50', p: 2, fb: 'El escalímetro da medidas reales directamente.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔎', t: 'Buscar la cota escrita en el plano', p: 2, fb: 'La cota escrita prevalece sobre lo medido en el papel.', efecto: { confianza: 6, tension: -3 } },
            { icono: '✋', t: 'Medir con los dedos sobre el plano', p: 0, fb: 'Es impreciso y no considera la escala.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Significado de la escala 1:50', claves: ['1 cm', 'un centimetro', '50 cm', 'cincuenta', '1:50', 'escala'] },
            { n: 'Resultado: 1,50 m', claves: ['150', 'ciento cincuenta', '1,50', '1.50', 'metro cincuenta', 'uno cincuenta'] },
            { n: 'Prioridad de las cotas', claves: ['cota', 'medida escrita', 'acotad', 'dimension', 'numero escrito', 'revisar la cota'] }
          ],
          evitar: [ { claves: ['tres centimetros reales', 'mas o menos'], fb: 'La escala exige precisión.' } ],
          modelo: 'En escala 1:50, cada centímetro del plano son 50 centímetros reales: 3 por 50 da 150 cm, o sea 1,50 m. Igual revisemos la cota escrita.'
        },
        {
          acciones: [
            { icono: '✏️', t: 'Dibujar el croquis a mano alzada', p: 2, fb: 'Es la herramienta rápida para comunicar ideas en obra.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🧭', t: 'Marcar el norte y las cotas en el croquis', p: 2, fb: 'Orientación y dimensiones hacen útil el croquis.', efecto: { confianza: 4, tension: -2 } },
            { icono: '💬', t: 'Explicarlo solo de palabra al maestro', p: 0, fb: 'Las instrucciones verbales se olvidan o malinterpretan.', efecto: { confianza: -4, tension: 4 } }
          ],
          conceptos: [
            { n: 'Croquis a mano alzada', claves: ['croquis', 'mano alzada', 'boceto', 'dibujo', 'bosquejo'] },
            { n: 'Cotas y ubicación', claves: ['cota', '2,50', '2.50', 'dos cincuenta', '3 metros', 'tres metros', 'medida', 'ubicacion'] },
            { n: 'Pasar a plano formal y aprobación', claves: ['plano formal', 'proyecto', 'anteproyecto', 'aprob', 'permiso', 'municip'] }
          ],
          evitar: [ { claves: ['sin dibujo', 'que improvise'], fb: 'Improvisar sin planos genera errores.' } ],
          modelo: 'Le hago un croquis a mano alzada con la bodega de 2,50 por 3 metros, su ubicación y el norte; después lo pasamos a un plano formal para la aprobación municipal.'
        }
      ]
    }
  },

  /* ============ C-P-104 Mecánica de Suelos ============ */
  {
    id: 'asig-C-P-104', cod: 'C-P-104',
    titulo: 'Suelo arcilloso y relleno en Tarqui',
    asignaturas: ['C-P-104'],
    persona: { nombre: 'Ing. Patricia Vargas', rol: 'Laboratorista de suelos', avatar: '👩🏽‍🔬', pitch: 1.1 },
    contexto: 'En un lote de la parroquia Tarqui (Pastaza) el suelo es arcilloso y muy húmedo. Con la laboratorista debes decidir la exploración, calcular el contenido de humedad y definir cómo compactar un relleno y proteger un talud.',
    objetivo: 'Aplicar exploración del subsuelo, relaciones gravimétricas, compactación y estabilidad de taludes y estructuras de contención.',
    pasos: [
      { dice: 'El propietario quiere construir dos pisos y dice que "el suelo se ve firme". ¿Cómo exploramos el subsuelo?', opciones: [
          { t: 'Propongo calicatas y/o sondeos con ensayo de penetración estándar (SPT) hasta una profundidad adecuada, con muestras para clasificar el suelo y obtener su capacidad portante.', p: 2, r: 'Correcto, con eso definimos la cimentación con datos.', fb: 'La exploración del terreno permite clasificar el suelo y estimar su resistencia; la NEC exige estudios geotécnicos para diseñar cimentaciones.' },
          { t: 'Propongo hacer un solo hueco de 50 cm para ver el color.', p: 1, r: 'Eso es muy superficial para dos pisos.', fb: 'Una inspección superficial no representa el suelo bajo la cimentación.' },
          { t: 'Le creo al propietario: si se ve firme, está bien.', p: 0, r: 'Ojo, la arcilla engaña.', fb: 'Las arcillas saturadas pueden consolidarse y provocar asentamientos.' } ] },
      { dice: 'Pesé la muestra: 150 g húmeda y 120 g después del horno. ¿Cuál es el contenido de humedad?', opciones: [
          { t: 'El agua pesa 150 − 120 = 30 g; humedad = 30 / 120 × 100 = 25 %.', p: 2, r: 'Exacto, 25 %. Es una arcilla bastante húmeda.', fb: 'El contenido de humedad es el peso del agua sobre el peso del suelo seco, en porcentaje.' },
          { t: 'Humedad = 30 / 150 × 100 = 20 %.', p: 1, r: 'Dividiste para el peso húmedo, es sobre el seco.', fb: 'La relación gravimétrica se calcula sobre el peso de sólidos (suelo seco).' },
          { t: 'Humedad = 120 / 150 = 80 %.', p: 0, r: 'No, eso no es la humedad.', fb: 'Confunde la relación de pesos con el contenido de agua.' } ] },
      { dice: 'Hay que rellenar 1 metro en la parte baja y queda un corte de 2 m junto al vecino. ¿Qué indicas?', opciones: [
          { t: 'Relleno con material seleccionado en capas de unos 20 cm, compactadas con control de densidad respecto al Proctor; y el corte con talud estable o muro de contención con drenaje.', p: 2, r: 'Bien, la compactación por capas y el drenaje son clave aquí.', fb: 'La compactación por capas aumenta la densidad y la resistencia; el agua es la principal causa de falla de taludes y muros.' },
          { t: 'Relleno con la misma arcilla de la excavación, compactada al final.', p: 1, r: 'Compactar todo al final no funciona.', fb: 'Capas gruesas no se compactan en profundidad; la arcilla saturada es mal material de relleno.' },
          { t: 'Relleno con escombro y basura y el corte se deja vertical.', p: 0, r: '¡Eso se va a hundir y el corte se derrumba!', fb: 'Material orgánico o escombro suelto se asienta; un corte vertical en suelo húmedo puede colapsar.' } ] }
    ],
    vivo: {
      lugar: 'Lote en la parroquia Tarqui, junto a una calicata recién excavada', fondo: 'exterior',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '⛏️', t: 'Marcar los puntos de calicatas en el lote', p: 2, fb: 'Varios puntos representan mejor la variabilidad del suelo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔨', t: 'Solicitar sondeos con ensayo SPT', p: 2, fb: 'El SPT estima la resistencia del suelo en profundidad.', efecto: { confianza: 6, tension: -2 } },
            { icono: '👟', t: 'Pisar el suelo para ver si está firme', p: 0, fb: 'No es un método de exploración válido.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Métodos de exploración', claves: ['calicata', 'sondeo', 'spt', 'penetracion', 'perforacion', 'exploracion'] },
            { n: 'Muestras y clasificación', claves: ['muestra', 'clasific', 'laboratorio', 'tipo de suelo', 'sucs', 'granulometr'] },
            { n: 'Capacidad portante para la cimentación', claves: ['capacidad portante', 'capacidad', 'portante', 'cimentacion', 'resistencia', 'asentamiento'] }
          ],
          evitar: [ { claves: ['se ve firme', 'no hace falta estudio'], fb: 'La apariencia no reemplaza el estudio geotécnico.' } ],
          modelo: 'Hagamos calicatas y sondeos SPT, tomemos muestras para clasificar el suelo en laboratorio y así obtener la capacidad portante para diseñar la cimentación.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Pesar la muestra húmeda y luego la seca', p: 2, fb: 'Las dos masas son necesarias para la relación gravimétrica.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔥', t: 'Secar la muestra en horno a 110 °C', p: 2, fb: 'El secado estándar elimina el agua libre.', efecto: { confianza: 4, tension: -2 } },
            { icono: '☀️', t: 'Secar la muestra un rato al sol', p: 0, fb: 'En la Amazonía no se seca completamente; el dato sería erróneo.', efecto: { confianza: -4, tension: 4 } }
          ],
          conceptos: [
            { n: 'Peso del agua', claves: ['30', 'treinta', '150 menos 120', 'peso del agua', 'agua'] },
            { n: 'Dividir para el peso seco', claves: ['seco', 'solidos', '120', 'ciento veinte', 'dividir'] },
            { n: 'Resultado 25 %', claves: ['25', 'veinticinco', 'porciento', 'por ciento', 'humedad es', 'multiplic'] }
          ],
          evitar: [ { claves: ['80 por ciento', 'ochenta'], fb: 'Ese valor no es el contenido de humedad.' } ],
          modelo: 'El agua pesa 150 menos 120, es decir 30 g; divido para el peso seco de 120 g y multiplico por 100: la humedad es 25 por ciento.'
        },
        {
          acciones: [
            { icono: '🚜', t: 'Compactar el relleno en capas de 20 cm', p: 2, fb: 'Capas delgadas permiten compactación uniforme.', efecto: { confianza: 6, tension: -4 } },
            { icono: '💧', t: 'Diseñar drenaje detrás del muro', p: 2, fb: 'El drenaje elimina la presión de agua sobre el muro.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🗑️', t: 'Echar escombro y basura al relleno', p: 0, fb: 'Materiales orgánicos o sueltos provocan hundimientos.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Compactación por capas con control', claves: ['capa', 'compact', 'proctor', 'densidad', '20 cm', 'veinte'] },
            { n: 'Material de relleno seleccionado', claves: ['material seleccionado', 'lastre', 'granular', 'seleccion', 'sin materia organica'] },
            { n: 'Talud o muro con drenaje', claves: ['talud', 'muro', 'contencion', 'drenaje', 'dren', 'lloraderos', 'agua'] }
          ],
          evitar: [ { claves: ['escombro', 'basura', 'vertical nomas'], fb: 'Pone en riesgo la estabilidad.' } ],
          modelo: 'Rellenamos con material seleccionado en capas de 20 cm compactadas y controladas con el Proctor; el corte lo protegemos con un muro de contención con drenaje.'
        }
      ]
    }
  },

  /* ============ C-P-105 Topografía ============ */
  {
    id: 'asig-C-P-105', cod: 'C-P-105',
    titulo: 'Nivelación y movimiento de tierras',
    asignaturas: ['C-P-105'],
    persona: { nombre: 'Don Wilson Santi', rol: 'Topógrafo de campo', avatar: '👨🏽‍🔧', pitch: 0.95 },
    contexto: 'En un lote en ladera de la vía Puyo–Tena, el topógrafo te pide ayuda para orientar el levantamiento, calcular cotas por nivelación y estimar el volumen de corte para la plataforma.',
    objetivo: 'Aplicar instrumentos, orientación, altimetría (nivelación) y cálculo de movimiento de tierras.',
    pasos: [
      { dice: 'Vamos a empezar el levantamiento. ¿Con qué referencia arrancamos?', opciones: [
          { t: 'Nivelo y centro el instrumento, partimos de un punto de referencia (BM) con cota conocida y orientamos con el norte o con coordenadas de dos puntos conocidos.', p: 2, r: 'Así es, sin referencia todo queda en el aire.', fb: 'Los elementos de orientación y un punto de cota conocida permiten ligar el levantamiento a un sistema de referencia.' },
          { t: 'Pongo el nivel en cualquier lado y medimos desde ahí.', p: 1, r: '¿Y cómo lo amarramos después?', fb: 'Sin un punto de referencia las cotas son solo relativas y no se pueden replantear.' },
          { t: 'Que no hace falta instrumento, medimos a pasos.', p: 0, r: 'Así no sale ningún plano topográfico.', fb: 'La medición a pasos no da precisión para una obra.' } ] },
      { dice: 'El BM tiene cota 100,000 m. Lectura atrás en el BM: 1,520 m; lectura adelante en el punto B: 0,870 m. ¿Cuál es la cota de B?', opciones: [
          { t: 'Altura del instrumento = 100,000 + 1,520 = 101,520; cota B = 101,520 − 0,870 = 100,650 m.', p: 2, r: 'Exacto, B está 65 cm más alto que el BM.', fb: 'Nivelación geométrica: cota + lectura atrás = altura instrumental; menos lectura adelante = nueva cota.' },
          { t: 'Cota B = 100,000 + 0,870 = 100,870 m.', p: 1, r: 'Olvidaste la lectura atrás.', fb: 'Se deben usar ambas lecturas para obtener el desnivel (1,520 − 0,870 = 0,650).' },
          { t: 'Cota B = 100,000 − 1,520 − 0,870.', p: 0, r: 'No, eso no tiene sentido.', fb: 'Error de procedimiento en la nivelación.' } ] },
      { dice: 'La plataforma de la casa es de 10 por 12 metros y hay que cortar en promedio 0,50 m. ¿Cuánta tierra sacamos y cuántas volquetas de 8 m³?', opciones: [
          { t: 'Volumen en banco = 10 × 12 × 0,5 = 60 m³; con un esponjamiento de 25 % son unos 75 m³ sueltos, es decir unas 10 volquetas de 8 m³.', p: 2, r: 'Muy bien, no te olvidaste del esponjamiento.', fb: 'El suelo excavado aumenta de volumen (esponjamiento); el transporte se calcula con el volumen suelto.' },
          { t: 'Son 60 m³, o sea 7,5 volquetas: 8 viajes.', p: 1, r: 'Te faltó el esponjamiento, se quedan cortas.', fb: 'El volumen en banco subestima el número de viajes.' },
          { t: 'Son 10 + 12 + 0,5 = 22,5 m³.', p: 0, r: 'Eso no es un volumen.', fb: 'El volumen es el producto de las tres dimensiones.' } ] }
    ],
    vivo: {
      lugar: 'Lote en ladera junto a la vía Puyo–Tena, con el nivel montado en el trípode', fondo: 'exterior',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🔭', t: 'Nivelar la burbuja del instrumento', p: 2, fb: 'Un instrumento mal nivelado da lecturas erróneas.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📍', t: 'Ubicar el BM de cota conocida', p: 2, fb: 'El BM liga el levantamiento a una referencia.', efecto: { confianza: 6, tension: -3 } },
            { icono: '👣', t: 'Medir el lote a pasos', p: 0, fb: 'No tiene la precisión requerida.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Nivelar y centrar el instrumento', claves: ['nivel', 'burbuja', 'centr', 'tripode', 'estacion total', 'instrumento'] },
            { n: 'Punto de referencia con cota conocida', claves: ['bm', 'referencia', 'cota conocida', 'punto fijo', 'mojon', 'hito'] },
            { n: 'Orientación', claves: ['norte', 'orient', 'coordenada', 'azimut', 'gps'] }
          ],
          evitar: [ { claves: ['a pasos', 'en cualquier lado'], fb: 'Sin referencia ni instrumento no hay levantamiento válido.' } ],
          modelo: 'Primero nivelo y centro el instrumento, partimos del BM de cota conocida y orientamos el levantamiento con el norte o con coordenadas GPS.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Leer la mira en el BM (lectura atrás)', p: 2, fb: 'La lectura atrás da la altura instrumental.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📝', t: 'Anotar las lecturas en la libreta de campo', p: 2, fb: 'El registro ordenado permite verificar cálculos.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🧠', t: 'Confiar las lecturas a la memoria', p: 0, fb: 'Se pierden datos y aparecen errores.', efecto: { confianza: -4, tension: 4 } }
          ],
          conceptos: [
            { n: 'Altura instrumental', claves: ['altura instrumental', 'altura del instrumento', '101,520', '101.52', 'ciento uno'] },
            { n: 'Restar la lectura adelante', claves: ['adelante', 'restar', 'menos', '0,870', 'desnivel', '0,650', '65'] },
            { n: 'Cota de B = 100,650 m', claves: ['100,650', '100.65', '100,65', 'cien sesenta y cinco', 'cien con sesenta'] }
          ],
          evitar: [ { claves: ['100,870', 'sumar la adelante'], fb: 'La lectura adelante se resta de la altura instrumental.' } ],
          modelo: 'La altura instrumental es 100,000 más 1,520, o sea 101,520; menos la lectura adelante de 0,870, la cota de B es 100,650 m.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Calcular el volumen de corte en banco', p: 2, fb: 'Es el punto de partida del movimiento de tierras.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🚚', t: 'Aplicar esponjamiento para las volquetas', p: 2, fb: 'El material suelto ocupa más volumen.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🎲', t: 'Pedir volquetas al cálculo del chofer', p: 0, fb: 'Sin cálculo se pagan viajes de más o faltan.', efecto: { confianza: -4, tension: 4 } }
          ],
          conceptos: [
            { n: 'Volumen en banco 60 m³', claves: ['60', 'sesenta', '10 por 12', 'diez por doce', 'banco'] },
            { n: 'Esponjamiento', claves: ['esponj', '25', 'veinticinco', 'suelto', '75', 'setenta y cinco'] },
            { n: 'Número de volquetas', claves: ['10 volquetas', 'diez volquetas', 'volqueta', 'viajes', '8 metros', 'ocho'] }
          ],
          evitar: [ { claves: ['22,5', 'sumar las medidas'], fb: 'El volumen se obtiene multiplicando.' } ],
          modelo: 'El corte es 10 por 12 por 0,5, o sea 60 m³ en banco; con 25 % de esponjamiento son 75 m³ sueltos, unas 10 volquetas de 8 m³.'
        }
      ]
    }
  },

  /* ============ C-P-106 Laboratorio de Construcción 1 ============ */
  {
    id: 'asig-C-P-106', cod: 'C-P-106',
    titulo: 'Arena del río y bloques a compresión',
    asignaturas: ['C-P-106'],
    persona: { nombre: 'Tlgo. Marco Aguinda', rol: 'Laboratorista de materiales', avatar: '👨🏽‍🔬', pitch: 1.0 },
    contexto: 'Un proveedor ofrece arena del río Pastaza y bloques de una bloquera artesanal. En el laboratorio debes ensayar los áridos, preparar un mortero y evaluar la resistencia de los bloques y del acero.',
    objetivo: 'Aplicar ensayos de propiedades físicas de áridos, preparación de morteros y propiedades mecánicas de bloques y acero.',
    pasos: [
      { dice: 'Esta arena se ve oscura y con hojitas. ¿Qué ensayos le hacemos antes de aceptarla?', opciones: [
          { t: 'Granulometría con tamices, contenido de finos por lavado y ensayo de impurezas orgánicas (colorimétrico); si sale oscura, no sirve sin lavar.', p: 2, r: 'Bien, la materia orgánica retarda el fraguado y baja la resistencia.', fb: 'Las propiedades físicas de los áridos (gradación, limpieza) influyen en la resistencia y durabilidad de morteros y hormigones.' },
          { t: 'Solo la cernimos para sacar las hojas.', p: 1, r: 'Las hojas grandes sí, pero la materia orgánica fina queda.', fb: 'Cernir no elimina la materia orgánica disuelta ni el exceso de finos.' },
          { t: 'La aceptamos, toda arena de río es buena.', p: 0, r: 'No siempre, ojo.', fb: 'La arena de río puede contener limos y materia orgánica perjudiciales.' } ] },
      { dice: 'Ensayamos un bloque de 40 × 15 cm (área bruta 600 cm²) y rompió con 9 000 kg. ¿Cuál es su resistencia a compresión?', opciones: [
          { t: '9 000 kg / 600 cm² = 15 kg/cm²; comparo con el valor mínimo de la norma INEN para el tipo de bloque y ensayo varias unidades, no una sola.', p: 2, r: 'Correcto, y sí, necesitamos una muestra representativa.', fb: 'La resistencia es carga / área; se evalúa con varias muestras según la norma técnica aplicable.' },
          { t: '9 000 / 40 = 225 kg/cm².', p: 1, r: 'Dividiste para un lado, no para el área.', fb: 'El esfuerzo se calcula sobre el área, no sobre una longitud.' },
          { t: 'Si no se rompió con la mano, ya está bueno.', p: 0, r: 'Eso no es un ensayo.', fb: 'La evaluación debe ser cuantitativa y normalizada.' } ] },
      { dice: 'Ahora el ensayo de tracción de la varilla. ¿Qué datos del diagrama nos interesan para aceptarla?', opciones: [
          { t: 'El límite de fluencia (para varilla común unos 4 200 kg/cm²), la resistencia máxima y el alargamiento a la rotura, comparados con la norma.', p: 2, r: 'Exacto, la fluencia es lo que usa el diseño.', fb: 'Las propiedades mecánicas del acero se verifican en el ensayo de tracción: fluencia, resistencia última y ductilidad.' },
          { t: 'Solo la carga con la que se rompe.', p: 1, r: 'Falta la fluencia y la ductilidad.', fb: 'La carga de rotura sola no muestra la fluencia ni el alargamiento.' },
          { t: 'Basta con que la varilla sea gruesa.', p: 0, r: 'El grosor no garantiza la calidad.', fb: 'El acero debe ensayarse; existen varillas de baja calidad.' } ] }
    ],
    vivo: {
      lugar: 'Laboratorio de materiales del instituto, junto a la prensa y los tamices', fondo: 'aula',
      inicio: { confianza: 50, tension: 35 },
      pasos: [
        {
          acciones: [
            { icono: '🧺', t: 'Tamizar la muestra en la serie de tamices', p: 2, fb: 'La granulometría muestra la gradación del árido.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧪', t: 'Hacer el ensayo colorimétrico de impurezas', p: 2, fb: 'Detecta materia orgánica perjudicial.', efecto: { confianza: 6, tension: -3 } },
            { icono: '👍', t: 'Aprobar la arena solo por su aspecto', p: 0, fb: 'La aceptación debe basarse en ensayos.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Granulometría', claves: ['granulometr', 'tamiz', 'gradacion', 'tamano', 'curva'] },
            { n: 'Impurezas orgánicas', claves: ['organic', 'colorimetr', 'impureza', 'hojas', 'oscura'] },
            { n: 'Contenido de finos y lavado', claves: ['finos', 'limo', 'lavad', 'lavar', 'arcilla'] }
          ],
          evitar: [ { claves: ['toda arena sirve', 'se ve bien'], fb: 'La apariencia no garantiza la calidad.' } ],
          modelo: 'Le hacemos granulometría con tamices, el ensayo colorimétrico de impurezas orgánicas y medimos los finos por lavado; si sale oscura hay que lavarla o rechazarla.'
        },
        {
          acciones: [
            { icono: '📐', t: 'Medir las dimensiones del bloque', p: 2, fb: 'El área exacta es necesaria para el cálculo.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🗜️', t: 'Ensayar varias unidades en la prensa', p: 2, fb: 'Una muestra representativa da un resultado confiable.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔨', t: 'Golpear el bloque con el martillo', p: 0, fb: 'No es un ensayo normalizado.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Esfuerzo = carga / área', claves: ['carga', 'area', 'dividir', '9000', 'nueve mil', '600', 'seiscientos'] },
            { n: 'Resultado 15 kg/cm²', claves: ['15', 'quince', 'kg/cm2', 'kilos por centimetro', 'kilogramos por centimetro', 'resistencia de'] },
            { n: 'Comparar con la norma y varias muestras', claves: ['norma', 'inen', 'varias', 'muestras', 'minimo', 'comparar'] }
          ],
          evitar: [ { claves: ['con la mano', 'una sola basta'], fb: 'La evaluación debe ser normalizada.' } ],
          modelo: 'Divido 9 000 kg para 600 cm² y da 15 kg/cm²; ese valor lo comparo con el mínimo de la norma INEN y ensayo varias unidades.'
        },
        {
          acciones: [
            { icono: '📈', t: 'Leer el diagrama esfuerzo-deformación', p: 2, fb: 'Muestra fluencia, resistencia y ductilidad.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📏', t: 'Medir el alargamiento de la probeta rota', p: 2, fb: 'El alargamiento indica la ductilidad.', efecto: { confianza: 4, tension: -2 } },
            { icono: '👀', t: 'Aceptar la varilla por su grosor', p: 0, fb: 'El diámetro no indica calidad del acero.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Límite de fluencia', claves: ['fluencia', '4200', 'cuatro mil doscientos', 'limite elastico', 'fy'] },
            { n: 'Resistencia máxima', claves: ['resistencia maxima', 'ultima', 'rotura', 'maxima', 'carga maxima', 'se rompe'] },
            { n: 'Alargamiento y ductilidad', claves: ['alargamiento', 'ductil', 'deformacion', 'estira', 'elongacion', 'se alarga'] }
          ],
          evitar: [ { claves: ['basta que sea gruesa', 'solo el grosor'], fb: 'Hay que ensayar el acero.' } ],
          modelo: 'Me interesa el límite de fluencia, que para varilla común es unos 4 200 kg/cm², la resistencia máxima y el alargamiento a la rotura, que muestra la ductilidad.'
        }
      ]
    }
  },

  /* ============ C-B-201 Dibujo Arquitectónico ============ */
  {
    id: 'asig-C-B-201', cod: 'C-B-201',
    titulo: 'Una columna en medio de la puerta',
    asignaturas: ['C-B-201'],
    persona: { nombre: 'Arq. Daniela Freire', rol: 'Proyectista de la vivienda', avatar: '👩🏻‍💼', pitch: 1.15 },
    contexto: 'Al compatibilizar planos de una casa en el barrio México de Puyo, notas que en el plano estructural una columna cae donde el arquitectónico dibuja una puerta. Debes interpretar simbología, escalas y el plano topográfico con la proyectista.',
    objetivo: 'Interpretar planos de proyecto (arquitectónico, estructural, topográfico) con normas de representación y escala.',
    pasos: [
      { dice: '¿Qué encontraste en los planos? El maestro ya quiere armar las columnas mañana.', opciones: [
          { t: 'Le muestro que en el eje B-3 la columna del estructural coincide con la puerta del arquitectónico; propongo superponer los planos y que ella defina la solución por escrito antes de armar.', p: 2, r: 'Tienes razón, se me pasó. Muevo la puerta 40 cm y te envío el plano corregido.', fb: 'La compatibilización de planos detecta interferencias antes de construir; los cambios deben quedar documentados.' },
          { t: 'Le digo que el maestro moverá la columna un poco para que pase la puerta.', p: 1, r: 'No, las columnas no se mueven sin el calculista.', fb: 'Mover un elemento estructural sin autorización altera el diseño.' },
          { t: 'No digo nada; ya se arreglará en la mampostería.', p: 0, r: '¡Eso habría salido carísimo!', fb: 'Ignorar una interferencia genera demoliciones y reclamos.' } ] },
      { dice: 'El maestro pregunta qué es este arco dibujado junto a la pared y esas líneas cortadas.', opciones: [
          { t: 'Le explico que el arco indica el sentido de apertura de la puerta y las líneas entrecortadas son elementos ocultos o por encima del corte, como vigas o aleros, según la norma de representación.', p: 2, r: 'Ah, por eso la puerta abre hacia el dormitorio.', fb: 'La normalización de símbolos y tipos de línea permite que cualquiera lea el plano igual.' },
          { t: 'Le digo que el arco es decoración del dibujo.', p: 1, r: '¿Decoración? Entonces cualquier lado abre.', fb: 'Cada símbolo tiene un significado normalizado.' },
          { t: 'Le digo que las líneas cortadas son errores de impresión.', p: 0, r: 'Entonces no las tomo en cuenta.', fb: 'Desconocer los tipos de línea lleva a omitir elementos.' } ] },
      { dice: 'En el plano topográfico las curvas de nivel están cada 0,50 m y entre la calle y el fondo hay 4 curvas. ¿Qué desnivel hay y qué implica?', opciones: [
          { t: '4 intervalos × 0,50 = 2 m de desnivel; implica prever cortes o rellenos, gradas o plataformas y drenaje de aguas lluvias hacia la calle.', p: 2, r: 'Exacto, por eso planteé dos plataformas.', fb: 'Las curvas de nivel representan la altimetría; el intervalo por el número de espacios da el desnivel.' },
          { t: 'Hay 4 m de desnivel.', p: 1, r: 'Revisa: cada curva es 0,50 m.', fb: 'Error al aplicar la equidistancia entre curvas.' },
          { t: 'Las curvas son los linderos del terreno.', p: 0, r: 'No, son líneas de igual altura.', fb: 'Confundir curvas de nivel con linderos impide entender el terreno.' } ] }
    ],
    vivo: {
      lugar: 'Oficina de la proyectista en Puyo, con planos impresos sobre la mesa de luz', fondo: 'oficina',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗂️', t: 'Superponer el plano estructural y el arquitectónico', p: 2, fb: 'La superposición revela interferencias.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🖍️', t: 'Marcar la interferencia en el eje B-3', p: 2, fb: 'Señalar con precisión facilita la corrección.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🙈', t: 'Guardar los planos sin comentar nada', p: 0, fb: 'Callar el problema lo hace más caro.', efecto: { confianza: -6, tension: 8 } }
          ],
          conceptos: [
            { n: 'Interferencia entre planos', claves: ['columna', 'puerta', 'coincide', 'interferencia', 'choca', 'eje'] },
            { n: 'Compatibilizar o superponer', claves: ['superpon', 'compatibiliz', 'comparar', 'revisar los planos', 'estructural', 'arquitectonico'] },
            { n: 'Solución por escrito del proyectista', claves: ['por escrito', 'plano corregido', 'defina', 'consulta', 'autoriz', 'documentar'] }
          ],
          evitar: [ { claves: ['mover la columna', 'se arregla despues'], fb: 'Los elementos estructurales no se mueven sin el diseñador.' } ],
          modelo: 'Arquitecta, en el eje B-3 la columna coincide con la puerta; superpuse los planos estructural y arquitectónico. Le pido que defina la solución por escrito antes de armar.'
        },
        {
          acciones: [
            { icono: '🚪', t: 'Señalar el símbolo de puerta en la planta', p: 2, fb: 'Mostrar el símbolo en contexto aclara su significado.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📖', t: 'Mostrar la leyenda de simbología del plano', p: 2, fb: 'La leyenda resume los símbolos normalizados.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🤐', t: 'Responder que eso no importa', p: 0, fb: 'Cada símbolo tiene una función en obra.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Sentido de apertura de la puerta', claves: ['apertura', 'abre', 'sentido', 'arco', 'abatimiento'] },
            { n: 'Líneas ocultas o sobre el corte', claves: ['entrecortad', 'oculto', 'oculta', 'segmentad', 'por encima', 'viga', 'alero'] },
            { n: 'Normas de representación', claves: ['norma', 'simbolo', 'simbologia', 'leyenda', 'tipo de linea', 'normaliz'] }
          ],
          evitar: [ { claves: ['es decoracion', 'error de impresion'], fb: 'Los símbolos son información técnica.' } ],
          modelo: 'El arco indica hacia dónde abre la puerta y las líneas entrecortadas son elementos ocultos o por encima del corte, como vigas o aleros; así lo dice la norma de simbología.'
        },
        {
          acciones: [
            { icono: '〰️', t: 'Contar las curvas de nivel entre calle y fondo', p: 2, fb: 'Contar intervalos permite calcular el desnivel.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔢', t: 'Revisar la equidistancia en la leyenda', p: 2, fb: 'La equidistancia define cuánto sube cada curva.', efecto: { confianza: 4, tension: -2 } },
            { icono: '✂️', t: 'Tomar las curvas como linderos', p: 0, fb: 'Las curvas son altimetría, no límites.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Desnivel de 2 m', claves: ['2 metros', 'dos metros', '2 m', 'desnivel', 'cuatro por', '4 por'] },
            { n: 'Curvas de nivel y equidistancia', claves: ['curva', 'equidistancia', 'cada 0,50', 'medio metro', 'igual altura', 'intervalo'] },
            { n: 'Implicaciones: plataformas y drenaje', claves: ['plataforma', 'corte', 'relleno', 'grada', 'drenaje', 'aguas lluvias'] }
          ],
          evitar: [ { claves: ['son linderos', 'cuatro metros'], fb: 'Interpretación errónea de las curvas.' } ],
          modelo: 'Son 4 intervalos de 0,50 m, o sea 2 metros de desnivel; habrá que prever plataformas con corte y relleno, gradas y drenaje de aguas lluvias.'
        }
      ]
    }
  },

  /* ============ C-B-202 Emprendimiento e Innovación ============ */
  {
    id: 'asig-C-B-202', cod: 'C-B-202',
    titulo: 'Bloques con fibra para un emprendimiento',
    asignaturas: ['C-B-202'],
    persona: { nombre: 'Bryan Shiguango', rol: 'Compañero que quiere emprender', avatar: '🧑🏽', pitch: 1.15 },
    contexto: 'Bryan quiere fabricar bloques livianos con fibra de bambú residual en Pastaza. Te pide ayuda para pensar la innovación, el cliente y el modelo de negocio, incluyendo un cálculo de margen.',
    objetivo: 'Aplicar estrategias de innovación, enfoque en el cliente y modelos de negocio innovadores en construcción.',
    pasos: [
      { dice: 'Mi idea es genial: bloques con fibra de bambú. Ya quiero pedir un préstamo y comprar la máquina. ¿Qué opinas?', opciones: [
          { t: 'Le propongo primero validar: hacer un prototipo, ensayarlo en laboratorio y conversar con maestros y ferreterías para saber qué valoran antes de invertir.', p: 2, r: 'Tienes razón, no sé si los maestros los comprarían.', fb: 'La innovación centrada en el cliente valida supuestos con prototipos y entrevistas antes de escalar.' },
          { t: 'Le digo que compre una máquina pequeña para probar.', p: 1, r: 'Igual es plata... ¿y si no se venden?', fb: 'Reduce riesgo, pero aún invierte sin conocer al cliente ni la calidad del producto.' },
          { t: 'Le digo que pida el préstamo de una, que las buenas ideas se venden solas.', p: 0, r: '¡Eso pensaba!', fb: 'Sin validación técnica y de mercado el riesgo de fracaso es alto.' } ] },
      { dice: 'Hice cuentas: material 0,30 USD, mano de obra 0,10 y energía y otros 0,05 por bloque. Lo vendería a 0,55. ¿Cuánto gano por bloque y por 2 000 bloques al mes?', opciones: [
          { t: 'Costo unitario 0,45 USD; margen 0,10 por bloque; con 2 000 bloques son 200 USD al mes, y falta restar costos fijos como arriendo o depreciación de la máquina.', p: 2, r: 'Uy, 200 dólares es poco... tengo que ajustar.', fb: 'El modelo de negocio exige conocer costos variables y fijos para evaluar la viabilidad.' },
          { t: 'Ganas 0,25 por bloque, o sea 500 al mes.', p: 1, r: 'Ahí no sumaste todos los costos.', fb: 'Se omitieron la mano de obra y la energía (0,55 − 0,45 = 0,10).' },
          { t: 'Ganas 0,55 por bloque, todo lo que vendes.', p: 0, r: 'Entonces seré millonario...', fb: 'El precio de venta no es ganancia.' } ] },
      { dice: 'Los bloques comunes cuestan 0,45. ¿Cómo convenzo a la gente de pagar más por los míos?', opciones: [
          { t: 'Le sugiero una propuesta de valor clara: más livianos, menor costo de transporte, aislamiento térmico y aprovechamiento de residuos, con ensayos que lo respalden, y alianzas con ferreterías locales.', p: 2, r: 'Ya, voy a armar mi lienzo de modelo de negocio con eso.', fb: 'Un modelo de negocio innovador comunica beneficios verificables al segmento de clientes adecuado.' },
          { t: 'Le digo que baje el precio para competir.', p: 1, r: 'Pero ya casi no gano nada.', fb: 'Competir solo por precio sin diferenciación no es sostenible.' },
          { t: 'Le digo que diga que resisten el doble, aunque no lo haya probado.', p: 0, r: '¿Y si alguien lo ensaya?', fb: 'Publicidad engañosa: falta de ética y riesgo para la seguridad de las viviendas.' } ] }
    ],
    vivo: {
      lugar: 'Taller comunitario en Puyo con un prototipo de bloque sobre la mesa', fondo: 'comunidad',
      inicio: { confianza: 55, tension: 30 },
      pasos: [
        {
          acciones: [
            { icono: '🧱', t: 'Examinar el prototipo de bloque', p: 2, fb: 'El prototipo permite probar la idea a bajo costo.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🎤', t: 'Planear entrevistas con maestros y ferreteros', p: 2, fb: 'Conocer al cliente reduce el riesgo.', efecto: { confianza: 6, tension: -2 } },
            { icono: '💸', t: 'Llenar la solicitud de préstamo de inmediato', p: 0, fb: 'Endeudarse sin validar es riesgoso.', efecto: { confianza: -4, tension: 8 } }
          ],
          conceptos: [
            { n: 'Prototipo y validación', claves: ['prototipo', 'valid', 'probar', 'prueba', 'piloto'] },
            { n: 'Conocer al cliente', claves: ['cliente', 'maestros', 'ferreter', 'entrevist', 'preguntar', 'necesidad'] },
            { n: 'Respaldo técnico', claves: ['ensay', 'laboratorio', 'resistencia', 'calidad', 'norma'] }
          ],
          evitar: [ { claves: ['se vende solo', 'pide el prestamo ya'], fb: 'Invertir sin validar es un error frecuente.' } ],
          modelo: 'Antes de endeudarte haz un prototipo, ensáyalo en el laboratorio y entrevista a maestros y ferreterías para validar qué necesita el cliente.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Sumar todos los costos variables', p: 2, fb: 'Es la base para calcular el margen.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🏠', t: 'Listar los costos fijos del taller', p: 2, fb: 'Los costos fijos afectan la rentabilidad real.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🙃', t: 'Tomar el precio como ganancia', p: 0, fb: 'Confunde ingreso con utilidad.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Costo unitario 0,45', claves: ['0,45', '0.45', 'cuarenta y cinco', 'costo unitario', 'costo'] },
            { n: 'Margen 0,10 y 200 al mes', claves: ['0,10', '0.10', 'diez centavos', '200', 'doscientos', 'margen'] },
            { n: 'Costos fijos', claves: ['fijo', 'arriendo', 'deprecia', 'maquina', 'luz', 'local'] }
          ],
          evitar: [ { claves: ['ganas 0,55', 'todo es ganancia'], fb: 'El precio no es utilidad.' } ],
          modelo: 'El costo unitario es 0,45; ganas 0,10 por bloque, o sea 200 dólares al mes por 2 000 bloques, y todavía hay que restar costos fijos como arriendo y depreciación de la máquina.'
        },
        {
          acciones: [
            { icono: '🗒️', t: 'Dibujar el lienzo de modelo de negocio', p: 2, fb: 'Ordena segmentos, propuesta de valor y canales.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🤝', t: 'Proponer alianza con ferreterías locales', p: 2, fb: 'Los socios clave abren canales de venta.', efecto: { confianza: 4, tension: -2 } },
            { icono: '📢', t: 'Anunciar resistencias no ensayadas', p: 0, fb: 'Es engañoso y poco ético.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Propuesta de valor diferenciada', claves: ['propuesta de valor', 'livian', 'aislamiento', 'termic', 'diferenci', 'beneficio'] },
            { n: 'Sostenibilidad y residuos', claves: ['residuo', 'reciclad', 'ambient', 'sostenib', 'aprovech', 'bambu'] },
            { n: 'Canales y alianzas', claves: ['ferreter', 'alianza', 'canal', 'socio', 'distribu', 'lienzo', 'canvas'] }
          ],
          evitar: [ { claves: ['resisten el doble', 'aunque no sea cierto'], fb: 'La publicidad engañosa es antiética.' } ],
          modelo: 'Tu propuesta de valor es un bloque más liviano, con aislamiento térmico y que aprovecha residuos de bambú, respaldado con ensayos; y lo distribuyes con alianzas con ferreterías locales.'
        }
      ]
    }
  },

  /* ============ C-P-203 Resistencia de Materiales ============ */
  {
    id: 'asig-C-P-203', cod: 'C-P-203',
    titulo: 'Puntales y varillas bajo esfuerzo',
    asignaturas: ['C-P-203'],
    persona: { nombre: 'Ing. Fernando Haro', rol: 'Fiscalizador de la obra', avatar: '👨🏻‍💼', pitch: 0.9 },
    contexto: 'Antes de fundir una losa en un edificio del centro de Puyo, el fiscalizador te pregunta por los esfuerzos en los puntales de madera, el factor de seguridad y una sustitución de varillas que quiere hacer el fierrero.',
    objetivo: 'Aplicar esfuerzos unitarios de compresión y tensión, diagrama esfuerzo-deformación y factores de seguridad.',
    pasos: [
      { dice: 'Cada puntal de madera de 10 × 10 cm recibirá unos 2 000 kg. ¿Qué esfuerzo de compresión soporta?', opciones: [
          { t: 'Área = 10 × 10 = 100 cm²; esfuerzo = 2 000 / 100 = 20 kg/cm², que comparo con el esfuerzo admisible de la madera.', p: 2, r: 'Correcto, la madera de la zona aguanta más que eso si está sana y recta.', fb: 'El esfuerzo unitario axial es la fuerza dividida para el área de la sección.' },
          { t: 'Esfuerzo = 2 000 / 10 = 200 kg/cm².', p: 1, r: 'Dividiste para el lado, no para el área.', fb: 'El esfuerzo se calcula con el área (100 cm²).' },
          { t: 'Si el puntal es grueso, aguanta lo que sea.', p: 0, r: 'Eso no es ingeniería.', fb: 'Todo material tiene un esfuerzo límite; además puede pandearse.' } ] },
      { dice: 'Si la madera resiste unos 200 kg/cm² a la rotura y usamos un factor de seguridad de 4, ¿cuál es el esfuerzo de trabajo?', opciones: [
          { t: 'Esfuerzo de trabajo = 200 / 4 = 50 kg/cm²; nuestros 20 kg/cm² están por debajo, así que el puntal es aceptable si está sano y bien arriostrado.', p: 2, r: 'Bien, y no olvides revisar que no tengan nudos ni rajaduras.', fb: 'El esfuerzo de trabajo es el esfuerzo último dividido para el factor de seguridad.' },
          { t: 'Esfuerzo de trabajo = 200 × 4 = 800 kg/cm².', p: 1, r: 'Al revés: el factor reduce, no aumenta.', fb: 'Multiplicar elimina el margen de seguridad.' },
          { t: 'El factor de seguridad no hace falta en obras pequeñas.', p: 0, r: 'Siempre hace falta.', fb: 'El factor de seguridad cubre incertidumbres de cargas y materiales.' } ] },
      { dice: 'El fierrero quiere cambiar las varillas de 12 mm por 10 mm "porque son más fáciles de doblar". ¿Qué le dices?', opciones: [
          { t: 'Le explico que el área de una de 10 mm (0,79 cm²) es mucho menor que la de 12 mm (1,13 cm²), unos 30 % menos, por lo que resiste menos tensión; no se cambia sin autorización del calculista.', p: 2, r: 'Ah, no pensé que era tanta diferencia.', fb: 'La fuerza que resiste una barra en tensión es esfuerzo admisible por área; reducir el diámetro reduce la capacidad.' },
          { t: 'Le digo que ponga más varillas de 10 mm sin calcular.', p: 1, r: '¿Cuántas más?', fb: 'Puede compensarse, pero debe calcularse y aprobarse por el diseñador.' },
          { t: 'Le digo que da igual, 2 mm no es nada.', p: 0, r: 'Listo, cambio todas.', fb: 'Reducir el área de acero compromete la seguridad estructural.' } ] }
    ],
    vivo: {
      lugar: 'Losa del segundo piso en un edificio del centro de Puyo, entre los puntales', fondo: 'obra',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📏', t: 'Medir la sección del puntal', p: 2, fb: 'El área real es necesaria para el cálculo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔍', t: 'Revisar nudos y rajaduras en la madera', p: 2, fb: 'Los defectos reducen la resistencia.', efecto: { confianza: 4, tension: -3 } },
            { icono: '🦵', t: 'Patear el puntal para ver si aguanta', p: 0, fb: 'No es un método de verificación.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Área de la sección', claves: ['area', '100', 'cien', '10 por 10', 'diez por diez', 'seccion'] },
            { n: 'Esfuerzo = fuerza / área', claves: ['fuerza', 'carga', 'dividido', 'dividir', 'entre', 'esfuerzo'] },
            { n: 'Resultado 20 kg/cm²', claves: ['20', 'veinte', 'kg/cm2', 'kilos por centimetro', 'kilogramos por centimetro', 'el esfuerzo es'] }
          ],
          evitar: [ { claves: ['aguanta lo que sea', '200 kg/cm2 de esfuerzo'], fb: 'Hay que calcular con el área.' } ],
          modelo: 'El área es 10 por 10, o sea 100 cm²; divido la carga de 2 000 kg para el área y el esfuerzo es 20 kg/cm².'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Dividir el esfuerzo último para el factor', p: 2, fb: 'Así se obtiene el esfuerzo de trabajo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔗', t: 'Verificar el arriostramiento de los puntales', p: 2, fb: 'Evita el pandeo de elementos esbeltos.', efecto: { confianza: 4, tension: -3 } },
            { icono: '✖️', t: 'Multiplicar la resistencia por el factor', p: 0, fb: 'Elimina el margen de seguridad.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Esfuerzo de trabajo = último / FS', claves: ['dividir', 'entre 4', 'para 4', 'factor de seguridad', 'esfuerzo de trabajo', 'admisible'] },
            { n: 'Resultado 50 kg/cm²', claves: ['50', 'cincuenta', 'kg/cm2', 'kilos por centimetro', 'esfuerzo de trabajo es'] },
            { n: 'Comparación y aceptación', claves: ['menor', 'por debajo', 'acept', 'cumple', 'suficiente', 'seguro'] }
          ],
          evitar: [ { claves: ['800', 'no hace falta factor'], fb: 'El factor de seguridad reduce el esfuerzo admisible.' } ],
          modelo: 'El esfuerzo de trabajo es 200 dividido para 4, o sea 50 kg/cm²; los 20 kg/cm² del puntal están por debajo, así que cumple si está sano y arriostrado.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Revisar el plano estructural de armado', p: 2, fb: 'El plano define diámetros y cantidades.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📞', t: 'Consultar al calculista antes de cambiar', p: 2, fb: 'Solo el diseñador puede aprobar sustituciones.', efecto: { confianza: 4, tension: -2 } },
            { icono: '✅', t: 'Autorizar el cambio de diámetro', p: 0, fb: 'Reduce la capacidad a tensión sin cálculo.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Menor área de acero', claves: ['area', '0,79', '1,13', 'menor', 'seccion', '30'] },
            { n: 'Menor resistencia a la tensión', claves: ['tension', 'traccion', 'resiste menos', 'capacidad', 'fuerza'] },
            { n: 'Autorización del calculista', claves: ['calculista', 'disenador', 'autoriz', 'plano', 'aprob'] }
          ],
          evitar: [ { claves: ['da igual', 'no es nada'], fb: 'Cada milímetro cambia el área de acero.' } ],
          modelo: 'No, maestro: la varilla de 10 mm tiene 0,79 cm² de área contra 1,13 de la de 12 mm; resiste menos tensión y no se cambia sin autorización del calculista.'
        }
      ]
    }
  },

  /* ============ C-P-204 Análisis Estructural ============ */
  {
    id: 'asig-C-P-204', cod: 'C-P-204',
    titulo: 'La viga que el dueño quiere perforar',
    asignaturas: ['C-P-204'],
    persona: { nombre: 'Don Hernán Paredes', rol: 'Propietario de un local comercial', avatar: '👨🏽', pitch: 1.0 },
    contexto: 'En un local de la avenida Ceslao Marín, el propietario quiere colgar un tanque de una viga, colocarla "acostada" para ganar altura y perforarla para pasar tuberías. Debes analizar reacciones, momentos e inercia.',
    objetivo: 'Analizar reacciones, momento flector, cortante y momento de inercia en vigas estructurales.',
    pasos: [
      { dice: 'La viga mide 4 m entre columnas y quiero colgar en el centro un tanque que con agua pesa 2 000 kg. ¿Cuánto recibe cada columna y cuánto "trabaja" la viga?', opciones: [
          { t: 'Por simetría cada apoyo recibe 1 000 kg; el momento máximo al centro es P·L/4 = 2 000 × 4 / 4 = 2 000 kg·m, que debe verificarse contra la capacidad de la viga diseñada.', p: 2, r: 'Ya veo, el centro es donde más sufre.', fb: 'Equilibrio estático: suma de fuerzas y momentos igual a cero; en viga simplemente apoyada con carga puntual central M = PL/4.' },
          { t: 'Cada columna recibe 2 000 kg.', p: 1, r: '¿Entonces el tanque pesa el doble?', fb: 'La carga se reparte entre los dos apoyos.' },
          { t: 'La viga es de hormigón, aguanta cualquier tanque.', p: 0, r: 'Eso pensé yo.', fb: 'Toda viga tiene una capacidad de diseño que no debe excederse.' } ] },
      { dice: 'Quiero que la viga de 20 × 40 cm vaya acostada, con 40 de ancho y 20 de alto, para ganar altura. ¿Es lo mismo?', opciones: [
          { t: 'No: la inercia es b·h³/12; de canto es 20·40³/12 ≈ 106 667 cm⁴ y acostada 40·20³/12 ≈ 26 667 cm⁴, cuatro veces menos rigidez y resistencia a flexión.', p: 2, r: 'Cuatro veces menos... mejor la dejo como está.', fb: 'El momento de inercia depende del cubo de la altura; el peralte es clave en la flexión.' },
          { t: 'Le digo que acostada es un poco más débil.', p: 1, r: '¿Un poco cuánto?', fb: 'La diferencia es grande: la inercia baja a la cuarta parte.' },
          { t: 'Le digo que es igual porque tiene la misma área.', p: 0, r: 'Perfecto, la volteamos.', fb: 'La misma área no da la misma inercia ni resistencia a flexión.' } ] },
      { dice: 'Y para el desagüe, ¿puedo hacer un hueco de 10 cm en la viga junto a la columna?', opciones: [
          { t: 'Junto a los apoyos el cortante es máximo; un hueco ahí debilita la viga y corta estribos. Si es indispensable, lo define el calculista, preferentemente en el centro del peralte y lejos de los apoyos.', p: 2, r: 'Entonces busco otra ruta para la tubería.', fb: 'El diagrama de cortante muestra valores máximos en los apoyos; perforar sin análisis compromete la estructura.' },
          { t: 'Le digo que haga el hueco en el centro de la luz, abajo.', p: 1, r: 'Ahí dijiste que el momento es máximo...', fb: 'En la zona inferior central está el acero a tensión y el momento máximo.' },
          { t: 'Le digo que perfore donde le quede cómodo.', p: 0, r: 'Listo, traigo el taladro.', fb: 'Perforar sin criterio puede causar fisuras o falla.' } ] }
    ],
    vivo: {
      lugar: 'Local comercial en la avenida Ceslao Marín, bajo la viga de 4 m', fondo: 'obra',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '📏', t: 'Medir la luz de la viga entre columnas', p: 2, fb: 'La luz es dato necesario para el momento.', efecto: { confianza: 4, tension: -2 } },
            { icono: '✏️', t: 'Dibujar el diagrama de cuerpo libre', p: 2, fb: 'Ordena cargas y reacciones.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🪝', t: 'Colgar el tanque sin verificar', p: 0, fb: 'Puede sobrecargar la viga.', efecto: { confianza: -6, tension: 8 } }
          ],
          conceptos: [
            { n: 'Reacciones de 1 000 kg', claves: ['1000', 'mil', 'cada apoyo', 'cada columna', 'mitad', 'reaccion'] },
            { n: 'Momento máximo PL/4', claves: ['pl/4', 'p por l', 'momento', 'centro', 'entre cuatro', 'para cuatro'] },
            { n: 'Resultado 2 000 kg·m y verificación', claves: ['2000', 'dos mil', 'kg m', 'verificar', 'capacidad', 'calculista'] }
          ],
          evitar: [ { claves: ['aguanta cualquier', 'cualquier peso'], fb: 'Toda viga tiene un límite de diseño.' } ],
          modelo: 'Cada columna recibe 1 000 kg; el momento máximo al centro es P por L sobre 4, o sea 2 000 kg·m, y hay que verificar esa capacidad con el calculista.'
        },
        {
          acciones: [
            { icono: '🧮', t: 'Calcular la inercia en ambas posiciones', p: 2, fb: 'Muestra cuantitativamente la diferencia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📐', t: 'Mostrar con una regla flexible la diferencia', p: 2, fb: 'Una regla de canto se dobla menos que acostada.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔄', t: 'Aceptar girar la viga', p: 0, fb: 'Reduce la inercia a la cuarta parte.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Inercia b·h³/12', claves: ['inercia', 'bh3', 'b por h', 'al cubo', 'doce'] },
            { n: 'Importancia del peralte', claves: ['peralte', 'altura', 'de canto', 'canto', 'parada'] },
            { n: 'Cuatro veces menos', claves: ['cuatro veces', '4 veces', 'cuarta parte', 'menos rigid', 'mas debil'] }
          ],
          evitar: [ { claves: ['misma area', 'es igual'], fb: 'La inercia depende del cubo de la altura.' } ],
          modelo: 'No es lo mismo: la inercia es b por h al cubo sobre 12; acostada la viga pierde peralte y queda con cuatro veces menos inercia y resistencia a flexión.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Mostrar el diagrama de cortante', p: 2, fb: 'Evidencia dónde el cortante es máximo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🔀', t: 'Buscar otra ruta para la tubería', p: 2, fb: 'Evita debilitar la viga.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔩', t: 'Taladrar junto a la columna', p: 0, fb: 'Zona de cortante máximo y estribos.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Cortante máximo en apoyos', claves: ['cortante', 'apoyo', 'columna', 'maximo', 'estribo'] },
            { n: 'No debilitar la viga', claves: ['debilit', 'fisur', 'no perforar', 'no hacer hueco', 'peligro', 'falla'] },
            { n: 'Decisión del calculista u otra ruta', claves: ['calculista', 'otra ruta', 'desviar', 'centro del peralte', 'lejos de los apoyos', 'ingeniero'] }
          ],
          evitar: [ { claves: ['donde quiera', 'donde le quede'], fb: 'Perforar sin análisis compromete la estructura.' } ],
          modelo: 'Junto a la columna el cortante es máximo y hay estribos; un hueco ahí debilita la viga. Mejor buscamos otra ruta o que el calculista lo defina lejos de los apoyos.'
        }
      ]
    }
  },

  /* ============ C-P-205 Construcciones ============ */
  {
    id: 'asig-C-P-205', cod: 'C-P-205',
    titulo: 'Cerramiento perimetral en un lote en pendiente',
    asignaturas: ['C-P-205'],
    persona: { nombre: 'Sra. Mercedes Villacís', rol: 'Propietaria del lote', avatar: '👩🏽‍🦱', pitch: 1.2 },
    contexto: 'La propietaria de un lote de 8 × 20 m en la vía al Tena quiere levantar ya el cerramiento y la casa. Debes organizar la secuencia constructiva: terreno, estudio geotécnico, replanteo, movimiento de tierras, cimentación y muros de cerramiento.',
    objetivo: 'Aplicar la secuencia de construcción: terreno, estudio geotécnico, replanteo, movimiento de tierras, cimentaciones, muros y cerramientos.',
    pasos: [
      { dice: 'Quiero empezar mañana mismo el cerramiento. Ya tengo los bloques. ¿Qué hacemos primero?', opciones: [
          { t: 'Primero verificar linderos con la escritura y la línea de fábrica municipal, limpiar el terreno y contar con el estudio geotécnico y permisos; luego replanteamos.', p: 2, r: 'Ah, no sabía que el municipio da la línea de fábrica.', fb: 'Conocer el terreno y sus límites legales evita construir en propiedad ajena o fuera de la línea municipal.' },
          { t: 'Limpiamos el terreno y empezamos a excavar.', p: 1, r: '¿Y los linderos?', fb: 'Falta verificar linderos, permisos y estudio del suelo.' },
          { t: 'Levantamos bloques directamente sobre el suelo.', p: 0, r: '¡Así es más rápido!', fb: 'Un muro sin cimentación se fisura y puede volcarse.' } ] },
      { dice: 'Para el cuarto de 8 por 6 m que va atrás, ¿cómo sé que las esquinas quedan a escuadra?', opciones: [
          { t: 'Replanteo con caballetes y piolas, y verifico que las diagonales midan igual: √(8² + 6²) = 10 m cada una.', p: 2, r: '¡Diez metros exactos! Qué fácil.', fb: 'Si las dos diagonales de un rectángulo son iguales, los ángulos son rectos (Pitágoras).' },
          { t: 'Mido que los lados midan 8 y 6 m.', p: 1, r: '¿Y si queda como rombo?', fb: 'Lados correctos no garantizan ángulos rectos.' },
          { t: 'A ojo, el maestro tiene buen ojo.', p: 0, r: 'Confío en él...', fb: 'El replanteo a ojo arrastra errores a toda la obra.' } ] },
      { dice: 'Para el muro de cerramiento de 2,40 m de alto en el lindero que da a la quebrada, ¿cómo se hace?', opciones: [
          { t: 'Con cimiento corrido o plintos y cadena de amarre, columnetas cada 2,5 a 3 m, viga de coronamiento y drenaje para el agua lluvia; la tierra excavada se reutiliza o se lleva a sitio autorizado.', p: 2, r: 'Así no se me cae como el del vecino.', fb: 'Los muros de cerramiento necesitan cimentación, confinamiento con columnetas y vigas, y control del agua.' },
          { t: 'Con cimiento corrido pero sin columnetas.', p: 1, r: '¿Aguanta así?', fb: 'Un muro alto sin confinamiento es vulnerable a sismos y empujes.' },
          { t: 'Levantar el muro y botar la tierra a la quebrada.', p: 0, r: 'Así me ahorro la volqueta.', fb: 'Muro sin estructura y contaminación de la quebrada: falla técnica y ambiental.' } ] }
    ],
    vivo: {
      lugar: 'Lote de 8 × 20 m en la vía al Tena, con estacas y piolas listas', fondo: 'obra',
      inicio: { confianza: 50, tension: 45 },
      pasos: [
        {
          acciones: [
            { icono: '📜', t: 'Revisar la escritura y los linderos', p: 2, fb: 'Define los límites legales del terreno.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🏛️', t: 'Solicitar la línea de fábrica municipal', p: 2, fb: 'El municipio fija retiros y alineaciones.', efecto: { confianza: 6, tension: -2 } },
            { icono: '🧱', t: 'Apilar bloques en el lindero', p: 0, fb: 'Construir sin verificar límites causa conflictos.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Linderos y línea de fábrica', claves: ['lindero', 'linea de fabrica', 'escritura', 'limite', 'retiro'] },
            { n: 'Estudio geotécnico y permisos', claves: ['estudio geotecnico', 'estudio de suelo', 'suelo', 'permiso', 'municip'] },
            { n: 'Limpieza y luego replanteo', claves: ['limpi', 'desbroce', 'replante', 'trazar', 'secuencia'] }
          ],
          evitar: [ { claves: ['empezamos manana', 'directo sobre el suelo'], fb: 'Saltarse etapas genera problemas legales y técnicos.' } ],
          modelo: 'Primero verificamos los linderos con la escritura y la línea de fábrica municipal, limpiamos el terreno y contamos con el estudio geotécnico y el permiso; luego replanteamos.'
        },
        {
          acciones: [
            { icono: '🪵', t: 'Colocar caballetes fuera del área de excavación', p: 2, fb: 'Conservan los ejes durante la excavación.', efecto: { confianza: 6, tension: -3 } },
            { icono: '📏', t: 'Medir las dos diagonales con flexómetro', p: 2, fb: 'Diagonales iguales confirman escuadra.', efecto: { confianza: 6, tension: -3 } },
            { icono: '👁️', t: 'Trazar las esquinas a ojo', p: 0, fb: 'Produce descuadres.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Caballetes y piolas', claves: ['caballete', 'piola', 'eje', 'estaca', 'referencia'] },
            { n: 'Diagonales iguales', claves: ['diagonal', 'iguales', 'escuadra', 'pitagoras', '3 4 5'] },
            { n: 'Diagonal de 10 m', claves: ['10', 'diez', 'raiz', 'ocho al cuadrado', 'seis al cuadrado'] }
          ],
          evitar: [ { claves: ['a ojo', 'buen ojo'], fb: 'El replanteo debe verificarse con medidas.' } ],
          modelo: 'Replanteamos con caballetes y piolas, y verifico que las dos diagonales sean iguales: raíz de 8 al cuadrado más 6 al cuadrado da 10 metros.'
        },
        {
          acciones: [
            { icono: '⛏️', t: 'Excavar la zanja del cimiento corrido', p: 2, fb: 'La cimentación transmite la carga del muro al suelo.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🏗️', t: 'Armar columnetas y viga de coronamiento', p: 2, fb: 'Confinan el muro frente a sismos.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🏞️', t: 'Echar la tierra sobrante a la quebrada', p: 0, fb: 'Contamina y obstruye el cauce.', efecto: { confianza: -8, tension: 8 } }
          ],
          conceptos: [
            { n: 'Cimentación del muro', claves: ['cimiento', 'corrido', 'plinto', 'cadena', 'cimentacion', 'zanja'] },
            { n: 'Confinamiento', claves: ['columneta', 'viga de coronamiento', 'confin', 'amarre', 'chicote', 'riostra'] },
            { n: 'Drenaje y manejo de tierras', claves: ['drenaje', 'agua lluvia', 'escombrera', 'sitio autorizado', 'reutiliz', 'no a la quebrada'] }
          ],
          evitar: [ { claves: ['a la quebrada', 'sin columnas'], fb: 'Riesgo ambiental y estructural.' } ],
          modelo: 'Hacemos cimiento corrido con cadena, columnetas cada 2,5 a 3 m y viga de coronamiento, con drenaje para el agua lluvia; la tierra sobrante va a un sitio autorizado, nunca a la quebrada.'
        }
      ]
    }
  },

  /* ============ C-P-206 Laboratorio de Construcción 2 ============ */
  {
    id: 'asig-C-P-206', cod: 'C-P-206',
    titulo: 'El mixer llega con hormigón fluido',
    asignaturas: ['C-P-206'],
    persona: { nombre: 'Lcdo. Jorge Cerda', rol: 'Proveedor de hormigón premezclado', avatar: '👨🏽‍🦲', pitch: 0.9 },
    contexto: 'Llega un camión mixer a una obra pública en Puyo con hormigón f’c 210 kg/cm². Debes controlar el agua de mezclado, el asentamiento y la toma y rotura de cilindros.',
    objetivo: 'Aplicar ensayos de los componentes del hormigón (agua, áridos, cemento) y de hormigón fresco y endurecido.',
    pasos: [
      { dice: 'Ingeniero, para el hormigón que hacen ustedes en sitio, el maestro está sacando agua del estero de al lado. Total, agua es agua, ¿no?', opciones: [
          { t: 'Le explico que el agua de mezclado debe ser limpia, preferiblemente potable, sin materia orgánica, aceites ni sales; si hay duda se ensaya, porque altera el fraguado y la resistencia.', p: 2, r: 'Tiene razón, ese estero baja con lodo.', fb: 'El agua es un componente del hormigón y su calidad se controla; impurezas afectan fraguado, resistencia y corrosión del acero.' },
          { t: 'Le digo que la dejen reposar para que se asiente el lodo.', p: 1, r: 'Ya, la dejamos en tanques.', fb: 'Decantar quita sólidos pero no materia orgánica disuelta ni sales.' },
          { t: 'Le digo que sí, que cualquier agua sirve.', p: 0, r: 'Eso le digo yo al maestro.', fb: 'El agua contaminada perjudica la calidad del hormigón.' } ] },
      { dice: 'Hice el cono de Abrams y dio 16 cm. La especificación pide 8 a 10 cm. El chofer dice que así es mejor para colocar.', opciones: [
          { t: 'El asentamiento está fuera de especificación; registro el resultado en el libro de obra y la guía, no acepto la carga y se lo comunico al proveedor y al fiscalizador.', p: 2, r: 'Bueno... me toca reportar a planta.', fb: 'El ensayo de asentamiento controla la consistencia del hormigón fresco; un valor alto suele indicar exceso de agua.' },
          { t: 'Lo acepto pero tomo más cilindros para ver qué pasa.', p: 1, r: 'Ya, descargamos entonces.', fb: 'Tomar cilindros ayuda, pero aceptar un hormigón fuera de especificación puede obligar a demoler.' },
          { t: 'Lo acepto porque se coloca más rápido.', p: 0, r: 'Así me gusta, rápido.', fb: 'El exceso de agua reduce la resistencia del hormigón endurecido.' } ] },
      { dice: '(28 días después, en el laboratorio.) El cilindro de 15 cm de diámetro rompió con 38 000 kg. ¿Cumple los 210 kg/cm²?', opciones: [
          { t: 'Área = π × 7,5² ≈ 176,7 cm²; resistencia = 38 000 / 176,7 ≈ 215 kg/cm², cumple; pero se evalúa con el promedio de varios cilindros según la norma.', p: 2, r: 'Bien calculado, cumple.', fb: 'La resistencia a compresión del hormigón endurecido es carga / área del cilindro, evaluada estadísticamente.' },
          { t: 'Área = 15 × 15 = 225 cm²; resistencia ≈ 169 kg/cm², no cumple.', p: 1, r: 'El cilindro es circular, no cuadrado.', fb: 'El área de un círculo es π·r².' },
          { t: 'Cumple porque no se rompió fácil.', p: 0, r: 'Necesitamos un número.', fb: 'La aceptación del hormigón se basa en resultados cuantitativos.' } ] }
    ],
    vivo: {
      lugar: 'Ingreso de una obra pública en Puyo, junto al camión mixer y el cono de Abrams', fondo: 'obra',
      inicio: { confianza: 50, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🚰', t: 'Indicar usar agua potable de la red', p: 2, fb: 'El agua potable suele ser apta para el hormigón.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🧫', t: 'Tomar una muestra del agua para ensayo', p: 2, fb: 'Si hay dudas, el agua se ensaya.', efecto: { confianza: 4, tension: -2 } },
            { icono: '🪣', t: 'Llenar los baldes en el estero', p: 0, fb: 'Agua con lodo y materia orgánica.', efecto: { confianza: -6, tension: 6 } }
          ],
          conceptos: [
            { n: 'Agua limpia o potable', claves: ['potable', 'limpia', 'red', 'agua de la llave', 'agua apta', 'tuberia'] },
            { n: 'Sin impurezas', claves: ['organic', 'lodo', 'aceite', 'sales', 'impureza', 'contamin'] },
            { n: 'Efecto en fraguado y resistencia', claves: ['fraguado', 'resistencia', 'corros', 'ensay', 'calidad'] }
          ],
          evitar: [ { claves: ['agua es agua', 'cualquier agua'], fb: 'El agua es un componente controlado.' } ],
          modelo: 'No, el agua del estero tiene lodo y materia orgánica; usemos agua potable limpia, porque las impurezas alteran el fraguado y la resistencia del hormigón.'
        },
        {
          acciones: [
            { icono: '🍦', t: 'Repetir el ensayo con el cono de Abrams', p: 2, fb: 'Confirma el resultado antes de decidir.', efecto: { confianza: 4, tension: 2 } },
            { icono: '📝', t: 'Registrar el asentamiento en la guía de despacho', p: 2, fb: 'Deja constancia del incumplimiento.', efecto: { confianza: 4, tension: 4 } },
            { icono: '🚛', t: 'Ordenar descargar sin más', p: 0, fb: 'Acepta hormigón fuera de especificación.', efecto: { confianza: -6, tension: -4 } }
          ],
          conceptos: [
            { n: 'Fuera de especificación', claves: ['fuera de especificacion', 'no cumple', '16', 'dieciseis', 'excede', 'mayor'] },
            { n: 'Rechazar la carga', claves: ['rechaz', 'no acepto', 'devolver', 'no se descarga', 'no recibo'] },
            { n: 'Registrar y comunicar', claves: ['registr', 'libro de obra', 'guia', 'fiscaliz', 'informar', 'proveedor'] }
          ],
          evitar: [ { claves: ['asi es mejor', 'aceptamos igual', 'mas agua'], fb: 'Un asentamiento alto suele indicar exceso de agua.' } ],
          modelo: 'El asentamiento de 16 cm está fuera de especificación; no acepto la carga, lo registro en la guía y en el libro de obra e informo al fiscalizador.'
        },
        {
          acciones: [
            { icono: '📏', t: 'Medir el diámetro del cilindro', p: 2, fb: 'El diámetro define el área.', efecto: { confianza: 4, tension: -2 } },
            { icono: '📊', t: 'Promediar los resultados de varios cilindros', p: 2, fb: 'La aceptación es estadística.', efecto: { confianza: 6, tension: -3 } },
            { icono: '🎯', t: 'Aprobar sin calcular', p: 0, fb: 'Se necesita un valor cuantitativo.', efecto: { confianza: -6, tension: 4 } }
          ],
          conceptos: [
            { n: 'Área del círculo', claves: ['pi', 'radio', '7,5', '176', 'area', 'circulo'] },
            { n: 'Resistencia ≈ 215 kg/cm²', claves: ['215', 'doscientos quince', '38000', 'treinta y ocho mil', 'dividir'] },
            { n: 'Cumple y se promedian varios cilindros', claves: ['cumple', 'promedio', 'varios cilindros', 'norma', 'mayor a 210', 'supera'] }
          ],
          evitar: [ { claves: ['15 por 15', 'no se rompio facil'], fb: 'El área del cilindro es circular.' } ],
          modelo: 'El área es pi por 7,5 al cuadrado, unos 176,7 cm²; 38 000 kg entre esa área da unos 215 kg/cm², cumple, pero se evalúa con el promedio de varios cilindros.'
        }
      ]
    }
  }
]);
