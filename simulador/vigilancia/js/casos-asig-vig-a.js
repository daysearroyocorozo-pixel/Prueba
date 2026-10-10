/* Prácticas por asignatura – Vigilancia y Seguridad Ciudadana (PAO 1) */
window.CASOS_ASIG = (window.CASOS_ASIG || []).concat([
  /* ===================== VSC-01 Metodología de la Investigación ===================== */
  {
    id: 'asig-VSC-01', cod: 'VSC-01',
    titulo: 'Diagnóstico de inseguridad en el Terminal Terrestre',
    asignaturas: ['VSC-01'],
    persona: { nombre: 'Mgs. Lorena Cerda', rol: 'Coordinadora del proyecto de vinculación del ISTCY', avatar: '👩🏽‍🏫', pitch: 1.05 },
    contexto: 'Los comerciantes del Terminal Terrestre de Puyo reportan robos frecuentes. La coordinadora del proyecto de vinculación te pide apoyar un diagnóstico básico antes de proponer acciones preventivas.',
    objetivo: 'Practica: fases del método científico aplicadas a un problema de seguridad, técnicas de observación con fichas e informes institucionales, sistematización de la información con confidencialidad y estructura de un proyecto básico de investigación aplicada a la prevención del delito.',
    pasos: [
      { dice: 'Queremos ayudar a los comerciantes del terminal. ¿Cómo empezamos el diagnóstico?', opciones: [
          { t: 'Planteo el problema y un objetivo concreto, por ejemplo identificar lugares y horarios de los robos, y defino a quiénes vamos a consultar.', p: 2, r: 'Muy bien, así sabremos qué medir y a quién preguntar.', fb: 'La investigación aplicada parte de un problema delimitado, un objetivo claro y una población definida.' },
          { t: 'Pregunto a los conocidos que trabajan en el terminal y vemos qué sale.', p: 1, r: 'Es un inicio, pero la información puede quedar sesgada.', fb: 'Sin objetivo ni criterio de selección, los datos no son confiables.' },
          { t: 'Ya sabemos que la culpa es de los informales; escribo eso en el informe.', p: 0, r: '¿Y con qué evidencia sostenemos eso?', fb: 'Concluir sin datos es un prejuicio, no un diagnóstico.' } ] },
      { dice: '¿Con qué instrumentos recogerás la información?', opciones: [
          { t: 'Con una ficha de observación en recorridos a distintas horas y una encuesta breve a comerciantes y usuarios, con consentimiento y sin pedir nombres.', p: 2, r: 'Excelente: combinas observación y opinión, y cuidas a las personas.', fb: 'Usar varios instrumentos mejora la validez; el consentimiento y el anonimato son principios éticos.' },
          { t: 'Solo con lo que publiquen en Facebook sobre el terminal.', p: 1, r: 'Las redes muestran percepciones, pero no son un registro sistemático.', fb: 'Las redes sociales pueden complementar, pero no reemplazan los instrumentos propios.' },
          { t: 'Grabando a escondidas a los vendedores para identificar sospechosos.', p: 0, r: '¡Eso vulnera derechos!', fb: 'Grabar sin consentimiento y señalar sospechosos es ilegal y antiético.' } ] },
      { dice: 'Ya tenemos 80 encuestas y 12 fichas. ¿Cómo presentamos los resultados?', opciones: [
          { t: 'Sistematizo y tabulo los datos protegiendo la confidencialidad, calculo porcentajes por lugar y horario, hago gráficos y lo organizo como proyecto básico: problema, objetivo, método, resultados y propuesta preventiva.', p: 2, r: 'Perfecto, así los comerciantes y la Policía podrán usarlo.', fb: 'El análisis descriptivo y un informe ordenado convierten los datos en decisiones.' },
          { t: 'Cuento las historias más impactantes que nos dijeron.', p: 1, r: 'Ayudan a sensibilizar, pero faltan cifras.', fb: 'Los testimonios complementan, pero no reemplazan el análisis de datos.' },
          { t: 'Entrego las hojas sin procesar para que cada uno saque sus conclusiones.', p: 0, r: 'Nadie va a revisar 80 hojas.', fb: 'Los datos sin procesar no constituyen un informe.' } ] }
    ],
    vivo: {
      lugar: 'Terminal Terrestre de Puyo, sala de espera', fondo: 'comunidad',
      inicio: { confianza: 50, tension: 40 },
      pasos: [
        {
          acciones: [
            { icono: '🎯', t: 'Escribir el problema y el objetivo en la libreta', p: 2, fb: 'Delimitar el problema orienta toda la investigación.', efecto: { confianza: 10, tension: -6 } },
            { icono: '👥', t: 'Listar a quiénes consultar: comerciantes y usuarios', p: 2, fb: 'Definir la población permite elegir una muestra adecuada.', efecto: { confianza: 8, tension: -4 } },
            { icono: '☕', t: 'Preguntar solo a dos amigos del terminal', p: 1, fb: 'No representan a todos los afectados.', efecto: { confianza: 0, tension: 3 } },
            { icono: '✍️', t: 'Redactar las conclusiones antes de investigar', p: 0, fb: 'Es un sesgo de confirmación.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Plantea el problema y el objetivo (método científico)', claves: ['problema', 'objetivo', 'metodo cientifico', 'pregunta', 'delimit', 'proposito'] },
            { n: 'Define la población a consultar', claves: ['poblacion', 'muestra', 'comerciantes', 'usuarios', 'a quienes', 'participantes'] },
            { n: 'Se enfoca en lugares y horarios', claves: ['lugares', 'horarios', 'donde', 'a que hora', 'zonas', 'franja'] }
          ],
          evitar: [ { claves: ['ya sabemos', 'la culpa es de'], fb: 'Asumir la respuesta impide un diagnóstico objetivo.' } ],
          modelo: 'Siguiendo el método científico, primero planteo el problema y un objetivo concreto: identificar los lugares y horarios de los robos en el terminal. Luego defino la población: comerciantes y usuarios.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Preparar una ficha de observación por horarios', p: 2, fb: 'La observación sistemática registra hechos verificables.', efecto: { confianza: 9, tension: -5 } },
            { icono: '📝', t: 'Diseñar una encuesta breve y anónima', p: 2, fb: 'El anonimato favorece respuestas sinceras.', efecto: { confianza: 7, tension: -3 } },
            { icono: '📱', t: 'Copiar comentarios de Facebook como datos', p: 1, fb: 'Son percepciones sin control de origen.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🕵️', t: 'Grabar a escondidas a los vendedores', p: 0, fb: 'Vulnera derechos y la protección de datos personales.', efecto: { confianza: -15, tension: 14 } }
          ],
          conceptos: [
            { n: 'Elige instrumentos de recolección', claves: ['ficha de observacion', 'observacion', 'encuesta', 'entrevista', 'cuestionario', 'instrumento'] },
            { n: 'Recoge datos en distintos momentos', claves: ['recorridos', 'distintas horas', 'manana', 'tarde', 'noche', 'varios dias'] },
            { n: 'Aplica principios éticos', claves: ['consentimiento', 'anonim', 'sin nombres', 'confidencial', 'voluntari', 'respeto'] }
          ],
          evitar: [ { claves: ['a escondidas', 'sin que sepan'], fb: 'La recolección de datos requiere consentimiento.' } ],
          modelo: 'Usaré una ficha de observación en recorridos a distintas horas y una encuesta breve a comerciantes y usuarios, con consentimiento informado y de forma anónima, sin pedir nombres.'
        },
        {
          acciones: [
            { icono: '📊', t: 'Tabular en hoja de cálculo y graficar', p: 2, fb: 'El análisis descriptivo resume los hallazgos.', efecto: { confianza: 10, tension: -6 } },
            { icono: '📑', t: 'Ordenar el informe por secciones', p: 2, fb: 'Una estructura clara facilita la toma de decisiones.', efecto: { confianza: 8, tension: -4 } },
            { icono: '💬', t: 'Resumir solo las historias más impactantes', p: 1, fb: 'Faltan cifras que sustenten.', efecto: { confianza: 0, tension: 3 } },
            { icono: '🗃️', t: 'Entregar las encuestas sin procesar', p: 0, fb: 'Los datos brutos no son un informe.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Sistematiza y analiza con confidencialidad', claves: ['sistematiz', 'tabul', 'porcentaje', 'grafic', 'confidencial', 'anonim'] },
            { n: 'Estructura el proyecto o informe', claves: ['proyecto', 'informe', 'metodo', 'resultados', 'conclusiones', 'objetivo'] },
            { n: 'Formula recomendaciones útiles', claves: ['recomendacion', 'propuesta', 'acciones preventivas', 'sugerencias', 'mejorar', 'prevencion'] }
          ],
          evitar: [ { claves: ['inventar datos', 'cambiar los numeros'], fb: 'Manipular datos es una falta ética grave.' } ],
          modelo: 'Sistematizo y tabulo los datos protegiendo la confidencialidad, calculo porcentajes por lugar y horario y los grafico. Lo organizo como proyecto básico con problema, objetivo, método, resultados y recomendaciones de prevención.'
        }
      ]
    }
  },

  /* ===================== VSC-02 Psicología Social y Comportamiento Delictivo ===================== */
  {
    id: 'asig-VSC-02', cod: 'VSC-02',
    titulo: 'Los jóvenes de la esquina: observar sin prejuzgar',
    asignaturas: ['VSC-02'],
    persona: { nombre: 'Doña Gladys Tanguila', rol: 'Vecina del barrio La Merced', avatar: '👵🏽', pitch: 1.2 },
    contexto: 'Un grupo de adolescentes se reúne cada tarde en la esquina del parque del barrio. Una vecina te exige que los expulses porque «seguro son delincuentes». Debes aplicar la psicología social y la criminología básica, observar conductas y reportarlas sin emitir diagnósticos.',
    objetivo: 'Practica: dinámicas de grupo y factores de riesgo comunitario, teorías criminológicas (factores individuales, sociales, económicos y ambientales) y observación y reporte objetivo de indicadores conductuales.',
    pasos: [
      { dice: '¡Esos muchachos son delincuentes! Sáquelos de la esquina ya mismo.', opciones: [
          { t: 'Le explico que reunirse en grupo es una conducta social normal en la adolescencia y no un delito; le pregunto qué conductas concretas ha visto y actúo sobre hechos, no sobre apariencias.', p: 2, r: 'Bueno… la verdad solo hacen bulla y ponen música.', fb: 'La psicología social distingue la dinámica normal de un grupo de las conductas de riesgo; actuar sobre hechos evita la estigmatización.' },
          { t: 'Le digo que voy a pasar más seguido para vigilarlos.', p: 1, r: 'Al menos haga algo.', fb: 'La presencia preventiva es útil, pero sin aclarar el prejuicio se refuerza el estigma.' },
          { t: 'Voy y los saco del parque por su aspecto.', p: 0, r: '¡Eso, que se vayan!', fb: 'Expulsar por apariencia es discriminatorio y vulnera el derecho al espacio público.' } ] },
      { dice: '¿Y por qué algunos jóvenes terminan delinquiendo?', opciones: [
          { t: 'Le explico que las teorías criminológicas señalan varios factores: individuales (consumo de drogas), sociales (violencia familiar, deserción escolar), económicos (desempleo) y ambientales (espacios oscuros y abandonados).', p: 2, r: 'Ah, entonces no es solo que sean malos.', fb: 'El comportamiento delictivo es multicausal; relacionar estos factores con el entorno orienta la prevención.' },
          { t: 'Le digo que es porque hoy los jóvenes no respetan a nadie.', p: 1, r: 'Eso mismo digo yo.', fb: 'Es una generalización que no explica las causas.' },
          { t: 'Le digo que nacen así y no se puede hacer nada.', p: 0, r: 'Entonces hay que botarlos.', fb: 'Es una idea sin fundamento científico que justifica la exclusión.' } ] },
      { dice: 'Entonces, ¿qué va a hacer usted?', opciones: [
          { t: 'Observo y registro en la ficha solo conductas concretas (hora, lugar, lo que hacen), sin etiquetar ni diagnosticar a nadie, y lo reporto de forma objetiva y confidencial a mi supervisor para coordinar acciones preventivas.', p: 2, r: 'Bien, que quede todo registrado.', fb: 'El agente observa y reporta indicadores conductuales con formatos institucionales; no emite diagnósticos ni difunde la información.' },
          { t: 'Le cuento a usted y a los vecinos lo que vea de cada muchacho.', p: 1, r: 'Así todos sabremos.', fb: 'Observar está bien, pero la información se reporta de forma confidencial al superior, no a los vecinos.' },
          { t: 'Escribo en el parte que son «delincuentes con perfil psicopático».', p: 0, r: '(El parte llega a la empresa con etiquetas.)', fb: 'El agente no emite diagnósticos psicológicos; etiquetar es antiético y estigmatizante.' } ] }
    ],
    vivo: {
      lugar: 'Parque del barrio La Merced, Puyo', fondo: 'comunidad',
      inicio: { confianza: 40, tension: 65 },
      pasos: [
        {
          acciones: [
            { icono: '👀', t: 'Observar unos minutos qué hace realmente el grupo', p: 2, fb: 'La observación de conductas concretas evita juicios por apariencia.', efecto: { confianza: 6, tension: -6 } },
            { icono: '❓', t: 'Preguntar a la vecina qué conductas ha visto', p: 2, fb: 'Separar hechos de percepciones aclara la situación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🚶', t: 'Prometer rondas más frecuentes', p: 1, fb: 'Ayuda, pero no corrige el prejuicio.', efecto: { confianza: 4, tension: 0 } },
            { icono: '🚫', t: 'Ir a expulsarlos por su aspecto', p: 0, fb: 'Es discriminatorio y vulnera derechos.', efecto: { confianza: 6, tension: 15 } }
          ],
          conceptos: [
            { n: 'Reconoce la dinámica normal del grupo', claves: ['grupo', 'adolescen', 'normal', 'reunirse', 'conducta social', 'amigos'] },
            { n: 'Aclara que reunirse no es delito', claves: ['no es delito', 'espacio publico', 'derecho a estar', 'pueden reunirse', 'no estan prohibidos', 'derecho'] },
            { n: 'Actúa sobre hechos, no sobre apariencias', claves: ['hechos', 'que ha visto', 'conductas concretas', 'apariencia', 'prejuicio', 'por su aspecto'] }
          ],
          evitar: [ { claves: ['son delincuentes', 'los saco', 'tienen pinta'], fb: 'Juzgar por apariencia es discriminatorio.' } ],
          modelo: 'Doña Gladys, reunirse en grupo es algo normal en la adolescencia y no es delito en un espacio público. ¿Qué conductas concretas ha visto? Yo actúo sobre hechos, no por su aspecto.'
        },
        {
          acciones: [
            { icono: '🧩', t: 'Dibujar en la libreta los factores del delito', p: 2, fb: 'Visualizar los factores ayuda a comprender que el delito es multicausal.', efecto: { confianza: 8, tension: -6 } },
            { icono: '💡', t: 'Señalar la esquina oscura y abandonada', p: 2, fb: 'Los factores ambientales influyen en las oportunidades delictivas.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🙄', t: 'Darle la razón: «los jóvenes de hoy son así»', p: 1, fb: 'La generalización no explica nada.', efecto: { confianza: 4, tension: 2 } },
            { icono: '🧬', t: 'Afirmar que nacen delincuentes', p: 0, fb: 'Es una idea sin sustento que justifica la exclusión.', efecto: { confianza: -6, tension: 10 } }
          ],
          conceptos: [
            { n: 'Factores individuales y sociales', claves: ['individual', 'social', 'violencia familiar', 'desercion', 'consumo', 'drogas'] },
            { n: 'Factores económicos y ambientales', claves: ['economic', 'desempleo', 'pobreza', 'ambiental', 'oscur', 'abandonad'] },
            { n: 'Reconoce que el delito es multicausal', claves: ['varios factores', 'multicausal', 'teorias criminologicas', 'no es solo', 'influyen', 'causas'] }
          ],
          evitar: [ { claves: ['nacen asi', 'no tienen remedio'], fb: 'El determinismo no tiene sustento científico.' } ],
          modelo: 'Las teorías criminológicas señalan varios factores: individuales como el consumo de drogas, sociales como la violencia familiar o la deserción escolar, económicos como el desempleo y ambientales como los lugares oscuros y abandonados.'
        },
        {
          acciones: [
            { icono: '📋', t: 'Llenar la ficha de observación conductual', p: 2, fb: 'La ficha institucional registra hechos verificables.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📻', t: 'Reportar al supervisor por el canal interno', p: 2, fb: 'El reporte va al superior responsable, de forma confidencial.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🗣️', t: 'Contar a los vecinos lo que viste de cada joven', p: 1, fb: 'Rompe la confidencialidad.', efecto: { confianza: 2, tension: 4 } },
            { icono: '🏷️', t: 'Escribir «perfil psicopático» en el parte', p: 0, fb: 'El agente no diagnostica; etiquetar estigmatiza.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Registra conductas concretas', claves: ['ficha', 'registr', 'hora', 'lugar', 'conductas concretas', 'lo que hacen'] },
            { n: 'No etiqueta ni diagnostica', claves: ['sin diagnosticar', 'sin etiquetar', 'no diagnostico', 'no etiqueto', 'objetiv', 'sin juzgar'] },
            { n: 'Reporta de forma confidencial al supervisor', claves: ['supervisor', 'superior', 'confidencial', 'reporto', 'reserva', 'canal interno'] }
          ],
          evitar: [ { claves: ['psicopata', 'psicopatico', 'enfermo mental'], fb: 'El agente no emite diagnósticos.' } ],
          modelo: 'Voy a observar y registrar en la ficha solo conductas concretas, con hora y lugar, sin etiquetar ni diagnosticar a nadie, y lo reporto de forma objetiva y confidencial a mi supervisor.'
        }
      ]
    }
  },

  /* ===================== VSC-03 Estrategias Operativas y Herramientas Tecnológicas ===================== */
  {
    id: 'asig-VSC-03', cod: 'VSC-03',
    titulo: 'Una noche en el centro de monitoreo',
    asignaturas: ['VSC-03'],
    persona: { nombre: 'Ing. Patricio Villacís', rol: 'Jefe del centro de monitoreo de una empresa de seguridad en Puyo', avatar: '👷🏻‍♂️', pitch: 0.9 },
    contexto: 'Haces prácticas en el centro de monitoreo que vigila el centro de Puyo con cámaras, alarmas y una patrulla a pie. El jefe te evalúa en la planificación del patrullaje, la operación de las herramientas tecnológicas y la comunicación por radio.',
    objetivo: 'Practica: patrullaje por sectores y puntos de control, CCTV, cámaras PTZ, drones y alarmas, radios y códigos de comunicación, y registro en el software de monitoreo y el mapa de incidencias.',
    pasos: [
      { dice: 'Con este mapa de incidencias del último mes, ¿cómo organizas el patrullaje de esta noche?', opciones: [
          { t: 'Divido la zona en sectores, ubico puntos de control donde el mapa muestra más incidentes y planifico recorridos con horarios variables, reportando cada punto por radio.', p: 2, r: 'Correcto: planificación táctica basada en datos.', fb: 'El patrullaje por sectores y puntos de control, orientado por el mapa de incidencias y sin rutinas predecibles, es más eficaz.' },
          { t: 'Hago el mismo recorrido de siempre cada hora en punto.', p: 1, r: 'Eres muy predecible.', fb: 'Un patrón fijo facilita que alguien evada la vigilancia.' },
          { t: 'No hace falta patrullar: las cámaras lo ven todo.', p: 0, r: 'Las cámaras tienen puntos ciegos.', fb: 'La tecnología complementa, pero no reemplaza el patrullaje.' } ] },
      { dice: 'La video analítica lanza una alerta de merodeo junto a un cajero automático. ¿Qué haces?', opciones: [
          { t: 'Tomo el control de la cámara PTZ, hago zoom y seguimiento, grabo el evento y verifico si hay riesgo; el dron solo se usa si el protocolo lo autoriza y la normativa lo permite.', p: 2, r: 'Bien: operas las herramientas conforme al protocolo.', fb: 'La cámara PTZ permite girar, inclinar y acercar para verificar; cada herramienta se usa según el protocolo institucional.' },
          { t: 'Elevo el dron de inmediato sobre las casas para ver mejor.', p: 1, r: '¿Tienes autorización para eso?', fb: 'Los drones de monitoreo requieren autorización y respeto a la privacidad.' },
          { t: 'Ignoro la alerta; esas alarmas siempre fallan.', p: 0, r: '¡Podía ser un robo!', fb: 'Toda alerta se verifica y se registra.' } ] },
      { dice: '¿Cómo reportas la novedad a la patrulla y la registras?', opciones: [
          { t: 'Por la frecuencia asignada, con un mensaje breve: identificación, código de la novedad, ubicación deletreada con el alfabeto fonético y lo que se requiere; luego registro el incidente en el software y en el mapa de incidencias.', p: 2, r: 'Perfecto: comunicación clara y registro completo.', fb: 'Los códigos y el protocolo de radio evitan confusiones; el registro alimenta el mapa de incidencias y los reportes operativos.' },
          { t: 'Llamo al celular personal del patrullero y le cuento con detalle.', p: 1, r: 'Llega la información, pero sin registro.', fb: 'Los canales personales no dejan constancia ni siguen el protocolo.' },
          { t: 'Grito por la radio en otra frecuencia y no registro nada.', p: 0, r: '(Nadie entiende el mensaje.)', fb: 'Usar frecuencias no asignadas y no registrar es una falla grave.' } ] }
    ],
    vivo: {
      lugar: 'Centro de monitoreo de una empresa de seguridad, Puyo', fondo: 'oficina',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗺️', t: 'Marcar sectores sobre el mapa de incidencias', p: 2, fb: 'Sectorizar permite asignar responsabilidades.', efecto: { confianza: 8, tension: -5 } },
            { icono: '📍', t: 'Ubicar puntos de control en las zonas críticas', p: 2, fb: 'Los puntos de control se colocan donde los datos muestran más riesgo.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⏰', t: 'Fijar rondas cada hora en punto', p: 1, fb: 'Es un patrón predecible.', efecto: { confianza: 2, tension: 2 } },
            { icono: '🛋️', t: 'Cancelar el patrullaje y mirar solo cámaras', p: 0, fb: 'Las cámaras no sustituyen la presencia.', efecto: { confianza: -10, tension: 8 } }
          ],
          conceptos: [
            { n: 'Organiza por sectores y puntos de control', claves: ['sector', 'puntos de control', 'punto de control', 'zonas criticas', 'cuadrante'] },
            { n: 'Se basa en el mapa de incidencias', claves: ['mapa de incidencias', 'mapa', 'mas incidentes', 'datos', 'incidencia'] },
            { n: 'Recorridos variables reportados por radio', claves: ['variable', 'horarios variables', 'irregular', 'no predecible', 'radio', 'reportando'] }
          ],
          evitar: [ { claves: ['solo camaras', 'no hace falta patrullar'], fb: 'Las cámaras no sustituyen el patrullaje.' } ],
          modelo: 'Divido la zona en sectores y ubico puntos de control donde el mapa de incidencias muestra más incidentes. Planifico recorridos con horarios variables y reporto cada punto por radio.'
        },
        {
          acciones: [
            { icono: '🎥', t: 'Tomar el control de la cámara PTZ y hacer zoom', p: 2, fb: 'La PTZ gira, inclina y acerca para verificar a distancia.', efecto: { confianza: 8, tension: -4 } },
            { icono: '⏺️', t: 'Grabar y marcar el evento en el sistema', p: 2, fb: 'El registro del video es respaldo del incidente.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🚁', t: 'Elevar el dron sin autorización', p: 1, fb: 'Requiere autorización y respeto a la privacidad.', efecto: { confianza: 0, tension: 6 } },
            { icono: '🔕', t: 'Silenciar la alerta de video analítica', p: 0, fb: 'Toda alerta se verifica.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Opera la cámara PTZ', claves: ['ptz', 'zoom', 'seguimiento', 'girar', 'acercar', 'camara'] },
            { n: 'Graba y verifica la alerta', claves: ['grabo', 'grabar', 'verifico', 'verificar', 'alerta', 'video analitica'] },
            { n: 'Usa las herramientas según el protocolo', claves: ['protocolo', 'autoriz', 'dron', 'normativa', 'procedimiento', 'permite'] }
          ],
          evitar: [ { claves: ['siempre fallan', 'ignoro la alerta'], fb: 'Toda alerta debe verificarse.' } ],
          modelo: 'Tomo el control de la cámara PTZ, hago zoom y seguimiento, grabo el evento y verifico la alerta. El dron solo lo uso si el protocolo lo autoriza y la normativa lo permite.'
        },
        {
          acciones: [
            { icono: '📻', t: 'Transmitir por la frecuencia asignada', p: 2, fb: 'La frecuencia asignada evita interferencias.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🔤', t: 'Deletrear la ubicación con el alfabeto fonético', p: 2, fb: 'El alfabeto fonético evita confusiones.', efecto: { confianza: 6, tension: -4 } },
            { icono: '📲', t: 'Llamar al celular personal del patrullero', p: 1, fb: 'No deja constancia.', efecto: { confianza: 2, tension: 0 } },
            { icono: '📢', t: 'Gritar el mensaje en otra frecuencia', p: 0, fb: 'Falla de protocolo.', efecto: { confianza: -10, tension: 10 } }
          ],
          conceptos: [
            { n: 'Usa radio, frecuencia y código', claves: ['frecuencia', 'radio', 'codigo', 'identificacion', 'mensaje breve'] },
            { n: 'Comunica la ubicación con claridad', claves: ['ubicacion', 'alfabeto fonetico', 'deletre', 'direccion', 'alfa', 'bravo'] },
            { n: 'Registra en el software y el mapa', claves: ['registro', 'registr', 'software', 'sistema', 'mapa de incidencias', 'reporte'] }
          ],
          evitar: [ { claves: ['no registro', 'celular personal'], fb: 'Se usa el canal institucional y se registra.' } ],
          modelo: 'Por la frecuencia asignada envío un mensaje breve: identificación, código de la novedad y ubicación deletreada con el alfabeto fonético. Luego registro el incidente en el software y en el mapa de incidencias.'
        }
      ]
    }
  },

  /* ===================== VSC-04 Defensa Personal y Uso Progresivo de la Fuerza ===================== */
  {
    id: 'asig-VSC-04', cod: 'VSC-04',
    titulo: 'Niveles de resistencia en la agencia bancaria',
    asignaturas: ['VSC-04'],
    persona: { nombre: 'Sgto. (r) Wilson Tapuy', rol: 'Instructor de defensa personal y uso de la fuerza', avatar: '🧔🏽‍♂️', pitch: 0.85 },
    contexto: 'En una práctica controlada en una agencia bancaria simulada, el instructor interpreta a un cliente alterado. Debes reconocer su nivel de resistencia, responder con el nivel de fuerza correspondiente y sustentar tu actuación.',
    objetivo: 'Practica: niveles de resistencia del ciudadano y escala del uso progresivo de la fuerza, principios de legalidad, necesidad, proporcionalidad y gradualidad, técnicas básicas de autoprotección y responsabilidad legal del agente.',
    pasos: [
      { dice: '¡Quiero mi plata ahora mismo! ¡No me da la gana de salir! (Grita e insulta, pero no toca a nadie.)', opciones: [
          { t: 'Reconozco a un ciudadano no cooperador que solo resiste verbalmente: mantengo distancia de seguridad, manos visibles y uso presencia y verbalización firme y calmada.', p: 2, r: 'Está bien… pero que me atiendan.', fb: 'Ante resistencia verbal corresponden los niveles de presencia y verbalización, con autoprotección.' },
          { t: 'Le grito más fuerte que él para que se calle.', p: 1, r: '¡A mí nadie me grita!', fb: 'Elevar la voz sin control escala el conflicto.' },
          { t: 'Lo empujo hacia la salida antes de que haga algo.', p: 0, r: '¡Me agredió!', fb: 'Usar control físico frente a resistencia solo verbal es desproporcionado.' } ] },
      { dice: '(El cliente te empuja con fuerza y trata de agarrarte del chaleco.)', opciones: [
          { t: 'Es una agresión física no letal: aplico una técnica básica de autoprotección y liberación sin golpear, recupero la distancia, pido apoyo por radio y lo controlo solo lo necesario hasta que llegue la Policía.', p: 2, r: '(El cliente se detiene y retrocede.)', fb: 'Se escala gradualmente solo hasta el nivel necesario para neutralizar la agresión y se baja apenas cesa.' },
          { t: 'Me retiro corriendo y lo dejo solo con los clientes.', p: 1, r: '(Los clientes se asustan.)', fb: 'Te proteges, pero dejas a terceros en riesgo y sin aviso.' },
          { t: 'Lo golpeo varias veces hasta que caiga.', p: 0, r: '(Queda lesionado.)', fb: 'Es un uso excesivo de la fuerza que genera responsabilidad penal.' } ] },
      { dice: 'Bien. Ahora sustenta: ¿qué principios aplicaste y qué responsabilidad tienes?', opciones: [
          { t: 'Legalidad, necesidad, proporcionalidad y gradualidad: usé el nivel que exigía cada nivel de resistencia y bajé cuando cesó; registré el uso de la fuerza en el parte, porque un exceso me genera responsabilidad legal.', p: 2, r: 'Correcto. Eso te protege a ti y a él.', fb: 'Los principios del uso de la fuerza y la responsabilidad legal del agente sustentan y limitan la actuación.' },
          { t: 'En que tenía que mostrar autoridad.', p: 1, r: 'La autoridad no justifica la fuerza.', fb: 'La autoridad se ejerce con base en principios, no en imposición.' },
          { t: 'En que si me empuja, tengo derecho a devolverle el doble.', p: 0, r: 'Eso es venganza, no defensa.', fb: 'La defensa personal no es castigo.' } ] }
    ],
    vivo: {
      lugar: 'Agencia bancaria simulada, aula práctica del ISTCY', fondo: 'oficina',
      inicio: { confianza: 30, tension: 80 },
      pasos: [
        {
          acciones: [
            { icono: '↔️', t: 'Retroceder un paso y mantener distancia', p: 2, fb: 'La distancia de seguridad da tiempo de reacción.', efecto: { confianza: 4, tension: -6 } },
            { icono: '🖐️', t: 'Mostrar las manos abiertas y visibles', p: 2, fb: 'Las manos visibles transmiten calma y permiten protegerse.', efecto: { confianza: 6, tension: -8 } },
            { icono: '📢', t: 'Gritarle más fuerte que él', p: 1, fb: 'Escala el conflicto.', efecto: { confianza: -4, tension: 10 } },
            { icono: '💥', t: 'Empujarlo hacia la salida', p: 0, fb: 'Fuerza desproporcionada ante resistencia verbal.', efecto: { confianza: -15, tension: 18 } }
          ],
          conceptos: [
            { n: 'Identifica el nivel de resistencia', claves: ['no cooperador', 'resistencia verbal', 'solo verbal', 'nivel de resistencia', 'no toca a nadie', 'no hay agresion'] },
            { n: 'Responde con presencia y verbalización', claves: ['verbaliz', 'presencia', 'le pido', 'calm', 'baje la voz', 'por favor'] },
            { n: 'Mantiene distancia y autoprotección', claves: ['distancia', 'manos visibles', 'postura', 'espacio', 'un paso atras', 'autoprotec'] }
          ],
          evitar: [ { claves: ['callese', 'lo saco a empujones'], fb: 'La agresión verbal o física escala el conflicto.' } ],
          modelo: 'Es un ciudadano no cooperador con resistencia solo verbal. Mantengo la distancia y las manos visibles, y uso presencia y verbalización: señor, le pido que baje la voz, vamos a resolver esto.'
        },
        {
          acciones: [
            { icono: '🛡️', t: 'Cubrirse y liberarse del agarre sin golpear', p: 2, fb: 'La liberación protege sin causar daño innecesario.', efecto: { confianza: 4, tension: -6 } },
            { icono: '📻', t: 'Pedir apoyo por radio', p: 2, fb: 'El apoyo reduce el riesgo para todos.', efecto: { confianza: 4, tension: -4 } },
            { icono: '🏃', t: 'Huir y dejar solos a los clientes', p: 1, fb: 'Terceros quedan en riesgo.', efecto: { confianza: -6, tension: 8 } },
            { icono: '👊', t: 'Golpearlo varias veces', p: 0, fb: 'Uso excesivo de la fuerza.', efecto: { confianza: -18, tension: 18 } }
          ],
          conceptos: [
            { n: 'Reconoce la agresión física no letal', claves: ['agresion no letal', 'agresion fisica', 'me empuja', 'resistencia fisica', 'agrede'] },
            { n: 'Aplica autoprotección con la fuerza mínima', claves: ['autoprotec', 'liberarme', 'me libero', 'sin golpear', 'solo lo necesario', 'minima'] },
            { n: 'Pide apoyo y avisa a la Policía', claves: ['apoyo', 'radio', 'policia', 'ecu 911', 'refuerzo', 'companero'] }
          ],
          evitar: [ { claves: ['lo golpeo', 'le doy su merecido', 'le devuelvo'], fb: 'La defensa no es castigo.' } ],
          modelo: 'Es una agresión física no letal: aplico autoprotección y me libero sin golpear, uso solo lo necesario para controlarlo y pido apoyo por radio para que venga la Policía.'
        },
        {
          acciones: [
            { icono: '⚖️', t: 'Escribir los cuatro principios en la pizarra', p: 2, fb: 'Legalidad, necesidad, proporcionalidad y gradualidad sustentan la actuación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📝', t: 'Mostrar el parte de uso de la fuerza', p: 2, fb: 'Documentar el uso de la fuerza es obligación y respaldo.', efecto: { confianza: 6, tension: -4 } },
            { icono: '👮', t: 'Decir que actuaste para imponer autoridad', p: 1, fb: 'La autoridad no justifica la fuerza.', efecto: { confianza: -2, tension: 2 } },
            { icono: '🔁', t: 'Decir que devolviste el empujón al doble', p: 0, fb: 'Es venganza, no defensa.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Legalidad y necesidad', claves: ['legalidad', 'necesidad', 'la ley', 'coip', 'necesari'] },
            { n: 'Proporcionalidad y gradualidad', claves: ['proporcional', 'gradualidad', 'gradual', 'nivel de resistencia', 'escala'] },
            { n: 'Registra y asume la responsabilidad legal', claves: ['parte', 'registr', 'responsabilidad', 'exceso', 'informe', 'documento'] }
          ],
          evitar: [ { claves: ['el doble', 'se lo merecia'], fb: 'La fuerza no es un castigo.' } ],
          modelo: 'Apliqué legalidad, necesidad, proporcionalidad y gradualidad: usé el nivel que exigía cada nivel de resistencia y bajé cuando cesó. Lo registré en el parte, porque un exceso me genera responsabilidad legal.'
        }
      ]
    }
  },

  /* ===================== VSC-05 Protocolos y Procedimientos de Seguridad Ciudadana I ===================== */
  {
    id: 'asig-VSC-05', cod: 'VSC-05',
    titulo: 'Alteración del orden en el parque y una retención',
    asignaturas: ['VSC-05'],
    persona: { nombre: 'Cbo. Andrea Mayancha', rol: 'Policía Nacional a cargo del operativo', avatar: '👮🏽‍♀️', pitch: 1.1 },
    contexto: 'Durante una celebración deportiva en el Parque Central de Puyo se produce una alteración del orden: hinchas lanzan objetos y un joven rompe una luminaria. Apoyas como vigilante del sector bajo el mando de la Policía Nacional.',
    objetivo: 'Practica: protocolo de intervención en alteraciones del orden público con cadena de mando, procedimiento de retención y conducción con derechos del retenido, y registro en el parte e informe operativo.',
    pasos: [
      { dice: 'Agente, la situación se está saliendo de control. ¿Cómo nos apoya?', opciones: [
          { t: 'Me pongo a sus órdenes según la cadena de mando, informo a mi supervisor, aíslo el perímetro, alejo a niños y adultos mayores y le reporto por radio lo que observo.', p: 2, r: 'Perfecto, cubra la entrada norte.', fb: 'En alteraciones del orden público la vigilancia apoya bajo la cadena de mando policial y coordina con su supervisor.' },
          { t: 'Me meto entre los hinchas a calmarlos por mi cuenta.', p: 1, r: '¡No actúe solo!', fb: 'Actuar por iniciativa propia rompe la coordinación y te expone.' },
          { t: 'Me retiro a la caseta hasta que pase.', p: 0, r: 'Necesitamos apoyo.', fb: 'Abandonar el sector deja sin cobertura a la ciudadanía.' } ] },
      { dice: '(Un joven rompe una luminaria frente a ti y otros ciudadanos lo detienen.)', opciones: [
          { t: 'Lo retengo sin violencia por flagrancia, le informo el motivo, protejo su integridad, no lo incomunico ni lo expongo y lo entrego de inmediato a la Policía con un acta de entrega.', p: 2, r: 'Buen procedimiento, lo conducimos nosotros.', fb: 'La retención se limita a la entrega inmediata a la Policía, respetando los derechos del retenido y registrándolo.' },
          { t: 'Lo retengo, pero no le explico nada.', p: 1, r: '¿Por qué me agarran?', fb: 'Toda persona retenida tiene derecho a conocer el motivo.' },
          { t: 'Lo esposo a la banca y lo llevo yo mismo en mi moto a la UPC.', p: 0, r: '(El joven se lesiona.)', fb: 'Conducir por cuenta propia y sin condiciones seguras excede tus funciones y pone en riesgo a la persona.' } ] },
      { dice: 'Al final del operativo necesito su informe. ¿Qué incluye?', opciones: [
          { t: 'Fecha, hora y lugar, los hechos en orden cronológico, quién dirigía el operativo, la retención y entrega con datos del acta, daños, testigos y mi firma, en el formato institucional.', p: 2, r: 'Así queda respaldado el procedimiento.', fb: 'El parte y el informe operativo documentan la actuación con los formatos institucionales.' },
          { t: 'Que hubo desorden y se controló.', p: 1, r: 'Muy poco detalle.', fb: 'Un informe incompleto no respalda la actuación.' },
          { t: 'No hago informe porque la Policía ya lo hará.', p: 0, r: 'Su empresa también lo necesita.', fb: 'Cada institución registra su participación.' } ] }
    ],
    vivo: {
      lugar: 'Parque Central de Puyo durante una celebración deportiva', fondo: 'exterior',
      inicio: { confianza: 45, tension: 75 },
      pasos: [
        {
          acciones: [
            { icono: '🫡', t: 'Ponerte a órdenes de la cabo a cargo', p: 2, fb: 'Respetar la cadena de mando ordena la intervención.', efecto: { confianza: 8, tension: -4 } },
            { icono: '🚧', t: 'Aislar el perímetro y alejar a niños', p: 2, fb: 'Proteger a personas vulnerables es prioridad.', efecto: { confianza: 6, tension: -6 } },
            { icono: '🏃', t: 'Meterte solo entre los hinchas', p: 1, fb: 'Rompe la coordinación.', efecto: { confianza: -2, tension: 8 } },
            { icono: '🏠', t: 'Encerrarte en la caseta', p: 0, fb: 'Abandonas el sector.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Respeta la cadena de mando', claves: ['a sus ordenes', 'cadena de mando', 'usted dirige', 'mi supervisor', 'ordenes'] },
            { n: 'Apoya con perímetro y protección', claves: ['perimetro', 'aislo', 'alejo', 'ninos', 'adultos mayores', 'proteg'] },
            { n: 'Coordina y reporta por radio', claves: ['radio', 'reporto', 'informo', 'coordin', 'lo que observo', 'comunico'] }
          ],
          evitar: [ { claves: ['por mi cuenta', 'me voy a la caseta'], fb: 'Se actúa coordinado bajo la cadena de mando.' } ],
          modelo: 'Cabo, me pongo a sus órdenes según la cadena de mando e informo a mi supervisor. Aíslo el perímetro, alejo a niños y adultos mayores y le reporto por radio lo que observo.'
        },
        {
          acciones: [
            { icono: '🗣️', t: 'Informar al joven el motivo de la retención', p: 2, fb: 'Conocer el motivo es un derecho del retenido.', efecto: { confianza: 8, tension: -6 } },
            { icono: '📄', t: 'Llenar el acta de entrega a la Policía', p: 2, fb: 'El formato documenta la entrega.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🤐', t: 'Retenerlo sin explicarle nada', p: 1, fb: 'Vulnera su derecho a conocer el motivo.', efecto: { confianza: -4, tension: 6 } },
            { icono: '🏍️', t: 'Llevarlo tú mismo en moto a la UPC', p: 0, fb: 'Excede tus funciones y lo pone en riesgo.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Retiene por flagrancia sin violencia', claves: ['flagrancia', 'sin violencia', 'retengo', 'retenido', 'sin golpes'] },
            { n: 'Respeta los derechos del retenido', claves: ['motivo', 'integridad', 'no lo incomunico', 'derechos', 'no lo expongo', 'trato digno'] },
            { n: 'Entrega de inmediato con acta', claves: ['entrego', 'de inmediato', 'policia', 'acta', 'formato', 'registro'] }
          ],
          evitar: [ { claves: ['lo esposo', 'lo llevo yo', 'lo encierro'], fb: 'La conducción corresponde a la Policía.' } ],
          modelo: 'Lo retengo sin violencia por flagrancia y le informo el motivo; protejo su integridad, no lo incomunico ni lo expongo, y lo entrego de inmediato a la Policía con el acta de entrega.'
        },
        {
          acciones: [
            { icono: '🕘', t: 'Ordenar los hechos de forma cronológica', p: 2, fb: 'La cronología facilita la revisión del procedimiento.', efecto: { confianza: 6, tension: -4 } },
            { icono: '🧾', t: 'Adjuntar los datos del acta y los testigos', p: 2, fb: 'Los anexos respaldan el informe.', efecto: { confianza: 6, tension: -4 } },
            { icono: '✏️', t: 'Escribir solo «hubo desorden»', p: 1, fb: 'Muy incompleto.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🚫', t: 'No hacer informe', p: 0, fb: 'Cada institución registra su participación.', efecto: { confianza: -10, tension: 6 } }
          ],
          conceptos: [
            { n: 'Fecha, hora, lugar y cronología', claves: ['fecha', 'hora', 'lugar', 'cronologic', 'en orden'] },
            { n: 'Describe la intervención y la retención', claves: ['operativo', 'retencion', 'entrega', 'acta', 'danos', 'testigos'] },
            { n: 'Usa el formato institucional y firma', claves: ['formato institucional', 'formato', 'firma', 'parte', 'informe operativo'] }
          ],
          evitar: [ { claves: ['no hago informe', 'que lo haga la policia'], fb: 'Debes registrar tu actuación.' } ],
          modelo: 'Incluyo la fecha, la hora y el lugar, los hechos en orden cronológico, quién dirigía el operativo, la retención y entrega con los datos del acta, los daños, los testigos y mi firma, en el formato institucional.'
        }
      ]
    }
  },

  /* ===================== VSC-06 Procesos Comunitarios de Seguridad ===================== */
  {
    id: 'asig-VSC-06', cod: 'VSC-06',
    titulo: 'Programa de seguridad para el Mercado Mariscal',
    asignaturas: ['VSC-06'],
    persona: { nombre: 'Sra. Inés Grefa', rol: 'Presidenta de la asociación de comerciantes del mercado', avatar: '👩🏽‍🦰', pitch: 1.15 },
    contexto: 'La asociación de comerciantes del mercado pide apoyo al proyecto de vinculación del ISTCY para mejorar la seguridad. Debes aplicar el enfoque de seguridad comunitaria desde el diagnóstico hasta el diseño de un programa.',
    objetivo: 'Practica: seguridad comunitaria y policía comunitaria, diagnóstico participativo con mapeo de riesgos y actores, diseño de un programa con objetivos, actividades, indicadores y recursos, y coordinación con GAD, Policía Nacional, MIES y organizaciones barriales.',
    pasos: [
      { dice: 'Queremos que la Policía y ustedes nos solucionen la seguridad. ¿Por dónde empezamos?', opciones: [
          { t: 'Le explico que la seguridad comunitaria es corresponsable: con el modelo de policía comunitaria, la Policía, la vigilancia y los comerciantes trabajan juntos; empezamos con una reunión para identificar sus problemas.', p: 2, r: 'Entonces nosotros también tenemos que participar.', fb: 'La seguridad comunitaria se basa en la participación ciudadana y en la policía comunitaria.' },
          { t: 'Damos la charla general que usamos en otros lugares.', p: 1, r: 'Bueno, algo es algo.', fb: 'Una charla genérica no parte de la realidad del mercado.' },
          { t: 'Le digo que la seguridad es asunto solo de la Policía.', p: 0, r: 'Entonces no nos ayuda.', fb: 'La seguridad ciudadana es corresponsabilidad.' } ] },
      { dice: 'Nos dicen que roban en los pasillos del fondo. ¿Cómo hacemos el diagnóstico?', opciones: [
          { t: 'Un diagnóstico participativo: recorrido con comerciantes y ficha de observación, un mapa de riesgos del mercado (iluminación, puntos ciegos, accesos, horarios) y la lista de actores: asociación, GAD, UPC, MIES y barrio.', p: 2, r: 'Así vemos todos lo mismo y sabemos con quién contar.', fb: 'El mapeo de riesgos y de actores con la comunidad es la base del programa.' },
          { t: 'Ponemos cámaras en el fondo sin revisar nada más.', p: 1, r: '¿Y quién las mira?', fb: 'La tecnología sin diagnóstico puede no resolver el problema.' },
          { t: 'Señalamos a los cargadores del fondo como sospechosos.', p: 0, r: '(Los cargadores se molestan.)', fb: 'Señalar a un grupo sin pruebas es estigmatizante.' } ] },
      { dice: '¿Qué programa proponemos con esa información?', opciones: [
          { t: 'Un programa con objetivo, actividades (iluminación con el GAD, rondas con la Policía comunitaria, apoyo del MIES a niños que trabajan en el mercado, charlas), indicadores como robos por mes, recursos y responsables.', p: 2, r: '¡Con indicadores sabremos si funciona!', fb: 'Un programa comunitario define objetivos, actividades, indicadores, recursos y roles interinstitucionales.' },
          { t: 'Un número de teléfono anotado en una pizarra.', p: 1, r: 'Bueno, pero se borra.', fb: 'Es útil, pero no es un programa.' },
          { t: 'Un grupo de vecinos que patrulle con palos.', p: 0, r: '(Algunos se asustan.)', fb: 'La justicia por mano propia es ilegal y peligrosa.' } ] }
    ],
    vivo: {
      lugar: 'Mercado Mariscal de Puyo, pasillo de frutas', fondo: 'comunidad',
      inicio: { confianza: 45, tension: 50 },
      pasos: [
        {
          acciones: [
            { icono: '🗣️', t: 'Convocar una reunión con los comerciantes', p: 2, fb: 'La participación permite identificar necesidades reales.', efecto: { confianza: 10, tension: -6 } },
            { icono: '🤝', t: 'Invitar al policía comunitario de la UPC', p: 2, fb: 'La policía comunitaria trabaja con la comunidad.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📄', t: 'Sacar la charla genérica de otro lugar', p: 1, fb: 'Puede no responder a su realidad.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🚓', t: 'Decir que es tarea solo de la Policía', p: 0, fb: 'La seguridad es corresponsabilidad.', efecto: { confianza: -12, tension: 10 } }
          ],
          conceptos: [
            { n: 'Explica la corresponsabilidad', claves: ['corresponsab', 'seguridad comunitaria', 'juntos', 'entre todos', 'participacion'] },
            { n: 'Menciona la policía comunitaria', claves: ['policia comunitaria', 'upc', 'policia', 'modelo comunitario', 'policias del barrio'] },
            { n: 'Parte de identificar los problemas', claves: ['reunion', 'identificar', 'problemas', 'necesidades', 'escuchar'] }
          ],
          evitar: [ { claves: ['solo de la policia', 'no es asunto de ustedes'], fb: 'La seguridad es corresponsabilidad.' } ],
          modelo: 'La seguridad comunitaria es corresponsable: con la policía comunitaria, la vigilancia y los comerciantes trabajamos juntos. Empecemos con una reunión para identificar sus problemas.'
        },
        {
          acciones: [
            { icono: '🗺️', t: 'Dibujar el mapa de riesgos del mercado', p: 2, fb: 'El mapa de riesgos ubica los factores del entorno.', efecto: { confianza: 8, tension: -4 } },
            { icono: '👥', t: 'Listar los actores comunitarios e institucionales', p: 2, fb: 'Conocer a los actores facilita la coordinación.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📹', t: 'Pedir cámaras sin revisar nada más', p: 1, fb: 'Sin diagnóstico la medida puede fallar.', efecto: { confianza: 0, tension: 2 } },
            { icono: '☝️', t: 'Señalar a los cargadores como sospechosos', p: 0, fb: 'Estigmatiza a un grupo sin pruebas.', efecto: { confianza: -12, tension: 12 } }
          ],
          conceptos: [
            { n: 'Diagnóstico participativo con recorrido', claves: ['diagnostico participativo', 'recorrido', 'ficha', 'con los comerciantes', 'observacion'] },
            { n: 'Elabora el mapa de riesgos', claves: ['mapa de riesgos', 'iluminacion', 'puntos ciegos', 'accesos', 'horarios'] },
            { n: 'Identifica a los actores', claves: ['actores', 'asociacion', 'gad', 'upc', 'mies', 'barrio'] }
          ],
          evitar: [ { claves: ['son los cargadores', 'esos son los ladrones'], fb: 'No señales a grupos sin pruebas.' } ],
          modelo: 'Haremos un diagnóstico participativo: un recorrido con los comerciantes y una ficha de observación, un mapa de riesgos con iluminación, puntos ciegos, accesos y horarios, y la lista de actores: asociación, GAD, UPC, MIES y barrio.'
        },
        {
          acciones: [
            { icono: '🎯', t: 'Escribir el objetivo del programa', p: 2, fb: 'El objetivo orienta las actividades.', efecto: { confianza: 8, tension: -4 } },
            { icono: '📏', t: 'Definir indicadores y responsables por institución', p: 2, fb: 'Los indicadores permiten evaluar; los roles ordenan la coordinación.', efecto: { confianza: 8, tension: -6 } },
            { icono: '🧽', t: 'Anotar un número en la pizarra', p: 1, fb: 'No es un programa.', efecto: { confianza: 0, tension: 2 } },
            { icono: '🪵', t: 'Proponer vecinos que patrullen con palos', p: 0, fb: 'Es ilegal y peligroso.', efecto: { confianza: -10, tension: 15 } }
          ],
          conceptos: [
            { n: 'Objetivo y actividades', claves: ['objetivo', 'actividades', 'iluminacion', 'rondas', 'charlas'] },
            { n: 'Indicadores y recursos', claves: ['indicador', 'robos por mes', 'recursos', 'medir', 'meta'] },
            { n: 'Roles de GAD, Policía y MIES', claves: ['gad', 'policia comunitaria', 'mies', 'responsables', 'coordin'] }
          ],
          evitar: [ { claves: ['con palos', 'justicia por mano propia'], fb: 'La justicia por mano propia es ilegal.' } ],
          modelo: 'Propongo un programa con un objetivo claro y actividades: iluminación con el GAD, rondas con la Policía comunitaria, apoyo del MIES a los niños que trabajan en el mercado y charlas; con indicadores como robos por mes, recursos y responsables.'
        }
      ]
    }
  }
]);
