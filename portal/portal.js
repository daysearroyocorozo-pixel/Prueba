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
        ['casos', '🤝', 'Casos profesionales', 'Situaciones con familias, estudiantes y directivos: inclusión, interculturalidad, convivencia y normativa.'],
        ['mapa', '🗺️', 'Mapa curricular', 'Las 23 asignaturas y el módulo con el que se relaciona cada una.']
      ] },
    { id: 'incendios', emoji: '🚒', color: '#B91C1C', nombre: 'Control de Incendios y Operaciones de Rescate', corto: 'Incendios y rescate', asig: 23, ruta: 'incendios/index.html',
      desc: 'Comanda emergencias con tripulación y víctimas virtuales. Practica la toma de decisiones y la coordinación de operaciones de rescate.',
      mods: [
        ['inc', '🚒', 'Comandar un incidente', 'Incendio estructural, accidente vehicular, incendio forestal y materiales peligrosos, con imprevistos. Vista 3D, RA y VR Box.'],
        ['tri', '🩺', 'Triage de múltiples víctimas', 'Clasifica a diez víctimas de un accidente de bus con el método START.'],
        ['lab', '🧪', 'Laboratorio técnico', 'Clases de fuego, agentes extintores, transferencia de calor, rombo NFPA y cálculos.'],
        ['casos', '🤝', 'Casos profesionales', 'Órdenes inseguras, estrés del personal, inspecciones, coordinación interinstitucional y comunidad.'],
        ['mapa', '🗺️', 'Mapa curricular', 'Las 23 asignaturas y su relación con los módulos del simulador.']
      ] },
    { id: 'construccion', emoji: '🏗️', color: '#B45309', nombre: 'Construcción', corto: 'Construcción', asig: 23, ruta: 'construccion/index.html',
      desc: 'Dirige la obra de una vivienda de dos plantas en Puyo con una cuadrilla virtual. Toma decisiones sobre calidad, seguridad, presupuesto y plazos.',
      mods: [
        ['obra', '🏗️', 'Dirigir una obra', 'Nueve fases con imprevistos, presupuesto y plazo. Vista 3D, RA y VR Box.'],
        ['lab', '🧪', 'Laboratorio de materiales y estructuras', 'Ensayos de hormigón y suelos, esfuerzos, momentos, volúmenes y nivelación.'],
        ['ofi', '📐', 'Oficina técnica', 'Precios unitarios, cómputos, ruta crítica, VAN, marco lógico y contratación pública.'],
        ['casos', '🤝', 'Casos profesionales', 'Proveedores, accidentes, escombros, cambios estructurales y construcción amazónica.'],
        ['mapa', '🗺️', 'Mapa curricular', 'Las 23 asignaturas y su relación con los módulos del simulador.']
      ] },
    { id: 'administracion', emoji: '🏛️', color: '#0F766E', nombre: 'Administración en Instituciones Públicas', corto: 'Administración pública', asig: 22, ruta: 'administracion/index.html',
      desc: 'Atiende a la ciudadanía como servidor público en la ventanilla de un GAD municipal. Resuelve trámites y situaciones de la gestión pública.',
      mods: [
        ['jor', '🏛️', 'Jornada de atención ciudadana', 'Ciudadanos virtuales de 08:00 a 16:30: atención prioritaria, trámites, información pública, quejas, sobornos e imprevistos. Vista 3D, RA y VR Box.'],
        ['fin', '💰', 'Finanzas y presupuesto público', 'Contabilidad, ciclo presupuestario, momentos del gasto y cálculos.'],
        ['nor', '⚖️', 'Normativa y planificación', 'Actos administrativos, PDOT, POA, políticas públicas, contratación y control interno.'],
        ['casos', '🤝', 'Casos profesionales', 'Nepotismo, desempeño, campañas, proveedores, políticas y mejora de trámites.'],
        ['mapa', '🗺️', 'Mapa curricular', 'Las 22 asignaturas y su relación con los módulos del simulador.']
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
        <div class="career-head"><span class="career-icon" aria-hidden="true">${c.emoji}</span><h3>${esc(c.nombre)}</h3><span class="pill">5 módulos</span></div>
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
            <div class="meta"><span>5 módulos</span><span>${c.asig} asignaturas relacionadas</span><span>3 niveles</span></div></div>
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
