/* Portal del Laboratorio Virtual ISTY */
(function () {
  'use strict';
  // Dirección donde están los simuladores. Para el dominio institucional basta
  // conservar la misma estructura de carpetas (portal/ y simulador/ juntas).
  const SIM_BASE = '../simulador/';

  const CARRERAS = [
    { id: 'educacion-basica', emoji: '🍎', color: '#2E8B2E', nombre: 'Educación Básica', corto: 'Educación Básica', asig: 23, ruta: 'index.html',
      desc: 'Asume el rol de docente y dicta clases a estudiantes virtuales que responden, por subnivel y área: Matemática, Ciencias Naturales, Ciencias Sociales, Lengua y Literatura.',
      mods: [
        ['aula', '🏫', 'Dictar una clase', 'Aula simulada con estudiantes virtuales, por subnivel y área. Incluye vista 3D, realidad aumentada y gafas VR Box.'],
        ['plan', '📋', 'Planificar y dictar', 'Elabora la planificación microcurricular, recibe retroalimentación y luego dicta la clase.'],
        ['eval', '📊', 'Evaluar resultados', 'Calcula medidas estadísticas, aplica la escala de calificaciones y decide el refuerzo académico.'],
        ['casos', '🤝', 'Casos profesionales', 'Situaciones simuladas con familias, estudiantes y directivos: actúas en la escena y respondes hablando.'],
        ['asig', '🎯', 'Prácticas por asignatura', 'Mapa curricular interactivo: una situación simulada propia para cada una de las 23 asignaturas, basada en sus contenidos mínimos.'],
      ] },
    { id: 'incendios', emoji: '🚒', color: '#B91C1C', nombre: 'Control de Incendios y Operaciones de Rescate', corto: 'Incendios y rescate', asig: 23, ruta: 'incendios/index.html',
      desc: 'Comanda emergencias con tripulación y víctimas virtuales. Practica la toma de decisiones y la coordinación de operaciones de rescate.',
      mods: [
        ['inc', '🚒', 'Comandar un incidente', 'Incendio estructural, accidente vehicular, incendio forestal y materiales peligrosos, con imprevistos. Vista 3D, RA y VR Box.'],
        ['tri', '🩺', 'Triage de múltiples víctimas', 'Clasifica a diez víctimas de un accidente de bus con el método START.'],
        ['lab', '🧪', 'Laboratorio técnico', 'Clases de fuego, agentes extintores, transferencia de calor, rombo NFPA y cálculos.'],
        ['casos', '🤝', 'Casos profesionales', 'Situaciones simuladas: órdenes inseguras, estrés del personal, inspecciones, coordinación interinstitucional y comunidad. Actúas en la escena y respondes hablando.'],
        ['asig', '🎯', 'Prácticas por asignatura', 'Mapa curricular interactivo: una situación simulada propia para cada una de las 23 asignaturas, basada en sus contenidos mínimos.'],
      ] },
    { id: 'construccion', emoji: '🏗️', color: '#B45309', nombre: 'Construcción', corto: 'Construcción', asig: 23, ruta: 'construccion/index.html',
      desc: 'Dirige la obra de una vivienda de dos plantas en Puyo con una cuadrilla virtual. Toma decisiones sobre calidad, seguridad, presupuesto y plazos.',
      mods: [
        ['obra', '🏗️', 'Dirigir una obra', 'Nueve fases con imprevistos, presupuesto y plazo. Vista 3D, RA y VR Box.'],
        ['lab', '🧪', 'Laboratorio de materiales y estructuras', 'Ensayos de hormigón y suelos, esfuerzos, momentos, volúmenes y nivelación.'],
        ['ofi', '📐', 'Oficina técnica', 'Precios unitarios, cómputos, ruta crítica, VAN, marco lógico y contratación pública.'],
        ['casos', '🤝', 'Casos profesionales', 'Situaciones simuladas: proveedores, accidentes, escombros, cambios estructurales y construcción amazónica. Actúas en la escena y respondes hablando.'],
        ['asig', '🎯', 'Prácticas por asignatura', 'Mapa curricular interactivo: una situación simulada propia para cada una de las 23 asignaturas, basada en sus contenidos mínimos.'],
      ] },
    { id: 'administracion', emoji: '🏛️', color: '#0F766E', nombre: 'Administración en Instituciones Públicas', corto: 'Administración pública', asig: 22, ruta: 'administracion/index.html',
      desc: 'Atiende a la ciudadanía como servidor público en la ventanilla de un GAD municipal. Resuelve trámites y situaciones de la gestión pública.',
      mods: [
        ['jor', '🏛️', 'Jornada de atención ciudadana', 'Ciudadanos virtuales de 08:00 a 16:30: atención prioritaria, trámites, información pública, quejas, sobornos e imprevistos. Vista 3D, RA y VR Box.'],
        ['fin', '💰', 'Finanzas y presupuesto público', 'Contabilidad, ciclo presupuestario, momentos del gasto y cálculos.'],
        ['nor', '⚖️', 'Normativa y planificación', 'Actos administrativos, PDOT, POA, políticas públicas, contratación y control interno.'],
        ['casos', '🤝', 'Casos profesionales', 'Situaciones simuladas: nepotismo, desempeño, campañas, proveedores, políticas y mejora de trámites. Actúas en la escena y respondes hablando.'],
        ['asig', '🎯', 'Prácticas por asignatura', 'Mapa curricular interactivo: una situación simulada propia para cada una de las 22 asignaturas, basada en sus contenidos mínimos.'],
      ] },
    { id: 'ia', emoji: '🤖', color: '#4338CA', nombre: 'Inteligencia Artificial', corto: 'Inteligencia Artificial', asig: 20, ruta: 'ia/index.html',
      desc: "Lidera un equipo virtual que desarrolla una solución de inteligencia artificial para un cliente de Pastaza: datos, modelos, ética, privacidad y despliegue en la nube.",
      mods: [
        ["proy", "🤖", "Proyecto de IA para un cliente real", "Lidera a tu equipo virtual en nueve fases: entender el problema, obtener y limpiar los datos, explorar, entrenar y evaluar el modelo, revisar el sesgo y la privacidad, desplegar en la nube y presentar al cliente. Imprevistos: datos faltantes, fugas de datos, sobreajuste, cambios de requisitos y caídas del servicio. Vista 3D, RA y VR Box."],
        ["lab", "🧪", "Laboratorio de programación y datos", "Salida de código Python, consultas SQL, estadística y métricas de modelos con cálculos de datos aleatorios: media, desviación estándar, precisión, recall, F1, exactitud y matrices."],
        ["resp", "⚖️", "IA responsable y seguridad", "Ética y sesgo, protección de datos personales (LOPDP de Ecuador), ciberseguridad, computación en la nube, procesamiento de lenguaje natural y big data."],
        ["casos", "🤝", "Casos profesionales", "Situaciones simuladas: datos personales sin consentimiento, un modelo que discrimina, presión para ocultar errores, un chatbot que no se entiende, credenciales filtradas y una cámara con reconocimiento facial en la comunidad. Actúas en la escena y respondes con tu voz o por escrito."],
        ["asig", "🎯", "Prácticas por asignatura", "Mapa curricular interactivo: 20 asignaturas de la malla, cada una con su propia situación simulada: actúa en la escena y responde con tu voz o por escrito."]
      ] },
    { id: 'vigilancia', emoji: '🛡️', color: '#1E40AF', nombre: 'Vigilancia y Seguridad Ciudadana', corto: 'Vigilancia y seguridad', asig: 12, ruta: 'vigilancia/index.html',
      desc: "Cuida un sector de Puyo durante un turno de vigilancia: incidentes, protocolos, uso progresivo de la fuerza, ECU 911, primeros auxilios y trato al ciudadano.",
      mods: [
        ["turno", "🛡️", "Turno de vigilancia", "Vigila un sector de Puyo de 14:00 a 22:00: personas extraviadas, hurtos, riñas, crisis, emergencias médicas, objetos sospechosos y reportes por redes. Protocolo, uso progresivo de la fuerza, ECU 911, primeros auxilios, mediación y parte de novedades. Vista 3D, RA y VR Box."],
        ["pro", "⚖️", "Protocolos y legislación", "Uso progresivo de la fuerza, derechos humanos, cadena de custodia, competencias de la vigilancia privada frente a la Policía Nacional, protocolos de emergencia y primeros auxilios."],
        ["ana", "🗺️", "Ciberseguridad y análisis del delito", "Mapas de calor, horarios de incidencia, tasas por 100 000 habitantes, porcentajes de variación, tiempos de respuesta, phishing y contraseñas seguras."],
        ["casos", "🤝", "Casos profesionales", "Situaciones simuladas: un compañero que quiere usar fuerza excesiva, un comerciante que ofrece dinero, un adolescente que hurta, una denuncia de violencia intrafamiliar, el video de un detenido en redes y una asamblea barrial de seguridad. Actúas en la escena y respondes con tu voz o por escrito."],
        ["asig", "🎯", "Prácticas por asignatura", "Mapa curricular interactivo: 12 asignaturas de la malla, cada una con su propia situación simulada: actúa en la escena y responde con tu voz o por escrito."]
      ] },
    { id: 'salud', emoji: '🏥', color: '#0E7490', nombre: 'Administración de Sistemas de Salud', corto: 'Sistemas de salud', asig: 22, ruta: 'salud/index.html',
      desc: "Administra un centro de salud durante una jornada: admisión, agendamiento, farmacia, presupuesto, calidad y confidencialidad de la historia clínica.",
      mods: [
        ["jor", "🏥", "Jornada en la administración de un centro de salud", "Atiende a usuarios virtuales en admisión de 08:00 a 16:30: agendamiento, referencia y contrarreferencia, reclamos, historia clínica y confidencialidad; tareas de farmacia, turnos y presupuesto, e imprevistos como desabastecimiento o un brote de dengue. Vista 3D, RA y VR Box."],
        ["fin", "💰", "Finanzas y presupuesto en salud", "Contabilidad básica, presupuesto, costos e indicadores con cálculos: ejecución presupuestaria, costo por atención, días de inventario, tasa de ocupación y punto de reorden."],
        ["snc", "🏥", "Sistema Nacional de Salud y calidad", "Niveles de atención, red pública y complementaria, referencia y contrarreferencia, calidad, derechos de los pacientes, confidencialidad, gestión documental y ética."],
        ["casos", "🤝", "Casos profesionales", "Situaciones simuladas: confidencialidad de la historia clínica, compras sin certificación, reclamos por tiempos de espera, conflictos de turnos, vacunación intercultural y agendamiento digital inclusivo. Actúas en la escena y respondes con tu voz o por escrito."],
        ["asig", "🎯", "Prácticas por asignatura", "Mapa curricular interactivo: 22 asignaturas de la malla, cada una con su propia situación simulada: actúa en la escena y responde con tu voz o por escrito."]
      ] },
    { id: 'turismo', emoji: '🛶', color: '#15803D', nombre: 'Gestión de Operaciones Turísticas', corto: 'Operaciones turísticas', asig: 25, ruta: 'turismo/index.html',
      desc: "Opera un tour en la Amazonía con turistas virtuales: seguridad, guianza, turismo comunitario y sostenible, costos e imprevistos.",
      mods: [
        ["tour", "🛶", "Operar un tour en la Amazonía", "Guía a un grupo de turistas virtuales por Puyo, el Paseo de los Monos y el Parque Omaere, una comunidad kichwa, la cascada y un almuerzo típico: seguridad, interpretación, pago justo, imprevistos y encuesta final. Vista 3D, RA y VR Box."],
        ["cos", "🧮", "Costos y operación turística", "Precio del paquete con costos fijos, variables y margen, punto de equilibrio de pasajeros, conversión de divisas, ocupación hotelera y tarifa promedio, con datos aleatorios."],
        ["pat", "🏞️", "Patrimonio, sostenibilidad y normativa", "Patrimonio natural y cultural, turismo comunitario, buenas prácticas ambientales, Ministerio de Turismo y registro de prestadores, primeros auxilios en ruta y atención al cliente."],
        ["casos", "🤝", "Casos profesionales", "Situaciones simuladas: artesanías de especies protegidas, sobreventa de cupos, pago injusto a la comunidad, turista perdido en el sendero, queja de alojamiento y diseño de un producto comunitario. Actúas en la escena y respondes con tu voz o por escrito."],
        ["asig", "🎯", "Prácticas por asignatura", "Mapa curricular interactivo: 25 asignaturas de la malla, cada una con su propia situación simulada: actúa en la escena y responde con tu voz o por escrito."]
      ] }
  ];

  const S = window.ISTY ? ISTY.sesion() : null;
  const ADMIN = !!S && S.rol === 'admin';
  // cada estudiante ve solo su carrera; el administrador ve todas
  const visibles = () => CARRERAS.filter(c => ADMIN || (S && c.id === S.carrera));
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const urlSim = c => SIM_BASE + c.ruta;
  const urlMod = (c, m) => SIM_BASE + c.ruta + '?m=' + m[0];
  const ext = 'target="_blank" rel="noopener noreferrer"';

  /* tema claro/oscuro */
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } } };
  const tema = store.get('isty-tema'); if (tema) document.documentElement.dataset.theme = tema;
  $('#theme').onclick = () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const n = cur === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = n; store.set('isty-tema', n);
  };
  /* menú en celular */
  $('#menu').onclick = () => { const o = $('#nav').classList.toggle('open'); $('#menu').setAttribute('aria-expanded', o); };
  $('#nav').addEventListener('click', e => { if (e.target.tagName === 'A') { $('#nav').classList.remove('open'); $('#menu').setAttribute('aria-expanded', 'false'); } });
  $('#anio').textContent = new Date().getFullYear();

  /* tarjetas de carreras con buscador */
  function renderCarreras(q = '') {
    const t = norm(q);
    const lista = visibles().filter(c => !t || norm([c.nombre, c.desc, ...c.mods.map(m => m[2] + ' ' + m[3])].join(' ')).includes(t));
    $('#lista-carreras').innerHTML = lista.map(c => `
      <article class="career reveal in" style="--c:${c.color}">
        <div class="career-head"><span class="career-icon" aria-hidden="true">${c.emoji}</span><h3>${esc(c.nombre)}</h3><span class="pill">${c.mods.length} módulos</span></div>
        <p>${esc(c.desc)}</p>
        <div class="chips">${c.mods.map(m => `<a class="chip" href="${urlMod(c, m)}" ${ext} aria-label="Abrir el módulo ${esc(m[2])} en una pestaña nueva">${m[1]} ${esc(m[2])}</a>`).join('')}</div>
        <div class="career-foot"><a class="btn btn-verde" href="#/carrera/${c.id}">Ver módulos →</a><a class="btn btn-line" href="${urlSim(c)}" ${ext}>Abrir simulador ↗</a></div>
      </article>`).join('');
    $('#sin-resultados').hidden = lista.length > 0;
  }
  $('#buscar').addEventListener('input', e => renderCarreras(e.target.value));

  /* página de detalle (#/carrera/id) */
  function renderDetalle(c) {
    $('#vista-carrera').innerHTML = `
      <div class="detail-top" style="--c:${c.color}"><div class="shell">
        <nav class="crumbs" aria-label="Ruta de navegación"><a href="#inicio">Inicio</a> › <a href="#carreras">Carreras</a> › <span>${esc(c.corto)}</span></nav>
        <div class="detail-row">
          <div><div class="detail-title"><span class="career-icon" aria-hidden="true">${c.emoji}</span><h1>${esc(c.nombre)}</h1></div>
            <p class="muted">${esc(c.desc)}</p>
            <div class="meta"><span>${c.mods.length} módulos</span><span>${c.asig} asignaturas relacionadas</span><span>3 niveles</span></div></div>
          <a class="btn btn-verde" href="${urlSim(c)}" ${ext}>Abrir simulador ↗</a>
        </div></div></div>
      <section class="section"><div class="shell">
        <p class="eyebrow">📖 Tu recorrido de aprendizaje</p><h2>Módulos de práctica</h2>
        <p class="hint">Al abrir un módulo verás tu nombre ya escrito; pulsa <b>Continuar</b> y entrarás directamente a ese módulo. Dentro elige tu nivel: Básico, Intermedio o Avanzado.</p>
        <div class="modules">${c.mods.map((m, i) => `
          <a class="module" style="--c:${c.color}" href="${urlMod(c, m)}" ${ext} aria-label="Abrir el módulo ${esc(m[2])} en una pestaña nueva">
            <small>Módulo ${i + 1}</small><span class="em" aria-hidden="true">${m[1]}</span><h3>${esc(m[2])}</h3><p>${esc(m[3])}</p><span class="go">Abrir módulo ↗</span>
          </a>`).join('')}</div>
        <p style="margin-top:28px"><a class="btn btn-line" href="#carreras">← Volver a las carreras</a></p>
      </div></section>`;
    document.title = c.nombre + ' | Laboratorio Virtual ISTY';
  }

  /* navegación por la dirección */
  function ruta() {
    const m = location.hash.match(/^#\/carrera\/([\w-]+)/);
    const c = m && visibles().find(x => x.id === m[1]);
    $('#vista-inicio').hidden = !!c; $('#vista-carrera').hidden = !c;
    if (c) { renderDetalle(c); window.scrollTo(0, 0); }
    else {
      document.title = 'Laboratorio Virtual ISTY';
      const destino = location.hash && document.getElementById(location.hash.slice(1));
      if (destino) destino.scrollIntoView();
    }
  }
  addEventListener('hashchange', ruta);

  /* animación al aparecer y menú activo */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));
  const secciones = ['inicio', 'carreras', 'como-usar', 'dispositivos', 'acerca'].map(id => document.getElementById(id));
  addEventListener('scroll', () => {
    let act = 'inicio'; secciones.forEach(s => { if (s.getBoundingClientRect().top < 120) act = s.id; });
    document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + act));
  }, { passive: true });

  /* usuario que inició sesión */
  if (S) {
    const car = CARRERAS.find(c => c.id === S.carrera);
    $('#usuario').innerHTML = `<span class="user-chip" title="${esc(S.nombre)}">👤 <b>${esc(S.nombre.split(' ')[0])}</b><small>${ADMIN ? 'Administrador' : esc(car ? car.corto : '')}</small></span>` +
      (ADMIN ? '<a class="btn btn-line btn-sm" href="admin.html">⚙️ Administración</a>' : '') + '<button class="btn btn-line btn-sm" id="salir" type="button">Salir</button>';
    $('#salir').onclick = () => ISTY.logout();
    if (!ADMIN && car) {
      document.querySelector('#carreras h2').textContent = 'Tu carrera: ' + car.nombre;
      document.querySelector('#carreras .muted').textContent = 'Tu cuenta tiene acceso a los simuladores de tu carrera.';
    }
  }
  const sp = new URLSearchParams(location.search).get('sinpermiso');
  if (sp) {
    const c = CARRERAS.find(x => x.id === sp);
    $('#aviso').hidden = false;
    $('#aviso').textContent = `⚠️ Tu cuenta no tiene acceso al simulador de ${c ? c.nombre : 'esa carrera'}. Solo puedes usar los de tu carrera.`;
    history.replaceState(null, '', location.pathname + location.hash);
    setTimeout(() => document.getElementById('carreras').scrollIntoView(), 50);
  }

  renderCarreras(); ruta();
})();
