/* =========================================================
   Simulador de Gestión en Salud – Carrera de Administración de
   Sistemas de Salud. Controlador de la interfaz: jornada en la
   administración de un centro de salud, finanzas y presupuesto en
   salud, Sistema Nacional de Salud y calidad, casos, prácticas por
   asignatura y mapa curricular.
   ========================================================= */
(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };
  const subj = cod => MALLA_SAL.find(m => m.cod === cod);
  const JORNADA = 510; // 08:00 a 16:30
  const hora = t => { const m = 480 + Math.round(t); return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };

  const App = { cfg: store.get('sal-cfg', { name: '', inst: '', voice: true }), niv: NIVELES[1], st: null, busy: false, listeners: [] };
  window.SalApp = App;

  /* ================== utilidades ================== */
  function show(s) { $$('.screen').forEach(x => x.hidden = x.id !== 'screen-' + s); window.scrollTo(0, 0); }
  let tt; function toast(m, ms = 2800) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, ms); }
  App.toast = toast;
  function applyTheme(th) { if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => { const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const n = cur === 'dark' ? 'light' : 'dark'; applyTheme(n); store.set('aula-theme', n); };
  const syncSound = () => { $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇'; };
  $('#btn-sound').onclick = () => { App.cfg.voice = !App.cfg.voice; store.set('sal-cfg', App.cfg); syncSound(); if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel(); };
  syncSound();
  $$('[data-go]').forEach(b => b.onclick = () => { window.Sal3D?.stopAll?.(); show(b.dataset.go); });

  let esVoice = null;
  function loadVoices() { if (!('speechSynthesis' in window)) return; const vs = speechSynthesis.getVoices(); esVoice = vs.find(v => /es[-_](EC|419|MX|US|CO)/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null; }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function speak(text, pitch = 1) {
    const plain = String(text).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').replace(/^\(.*\)$/, '').trim();
    const fb = Math.min(3500, 800 + plain.length * 38);
    if (!App.cfg.voice || !('speechSynthesis' in window) || !plain) return sleep(plain ? fb : 0);
    return new Promise(res => {
      const u = new SpeechSynthesisUtterance(plain); u.lang = esVoice ? esVoice.lang : 'es-ES'; if (esVoice) u.voice = esVoice;
      u.pitch = Math.min(2, pitch); u.rate = 1.05;
      let d = false; const fin = () => { if (!d) { d = true; res(); } };
      u.onend = fin; u.onerror = fin; setTimeout(fin, Math.max(4000, plain.length * 110)); speechSynthesis.speak(u);
    });
  }
  function nivelTexto(t) { return t >= 85 ? 'Excelente' : t >= 70 ? 'Muy bueno' : t >= 55 ? 'Bueno' : t >= 40 ? 'En proceso' : 'Inicial'; }
  function scoreHead(titulo, sub, total) {
    return `<div class="report-head card"><div><h1>${esc(titulo)}</h1><p class="muted">${esc(sub)}</p></div>
      <div class="score"><div class="score-ring sal-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }
  function saveHistory(modulo, titulo, total) {
    const h = store.get('sal-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, modulo, titulo, total });
    store.set('sal-history', h.slice(0, 50));
    window.ISTY?.registrar('resultado', { modulo, titulo, total });
  }

  /* ================== INICIO Y MENÚ ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst; $('#f-voice').checked = App.cfg.voice;
  const syncBrand = () => { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Administración de Sistemas de Salud'; };
  syncBrand();
  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, { name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(), voice: $('#f-voice').checked });
    store.set('sal-cfg', App.cfg); syncSound(); syncBrand();
    if (App.cfg.voice && 'speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); }
    $('#hub-name').textContent = App.cfg.name ? ', ' + App.cfg.name : '';
    show('hub');
    // enlace directo a un módulo desde el portal (?m=clave)
    const mParam = new URLSearchParams(location.search).get('m');
    const mBtn = mParam && document.querySelector(`[data-hub="${CSS.escape(mParam)}"]`);
    if (mBtn) { history.replaceState(null, '', location.pathname); mBtn.click(); }
  };
  $$('[data-hub]').forEach(b => b.onclick = () => openModule(b.dataset.hub));
  function openModule(k, cod) {
    if (k === 'jor') { renderSetup(); show('setup'); }
    if (k === 'fin') openQuiz('fin');
    if (k === 'snc') openQuiz('snc');
    if (k === 'casos') openCases(cod);
    if (k === 'asig') openAsig(cod);
    if (k === 'mapa') openMapa();
  }
  $('#btn-history').onclick = () => {
    const h = store.get('sal-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.titulo)}</b><br><span class="muted small">${esc(e.modulo)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no hay prácticas registradas.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('sal-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== PREPARAR JORNADA ================== */
  function renderSetup() {
    $('#niv-list').innerHTML = NIVELES.map(n => `<button class="choice" data-niv="${n.id}" aria-pressed="${App.niv.id === n.id}"><span class="em">${n.emoji}</span><span><b>${n.nombre}</b><small>${esc(n.desc)}</small><small>Llega un usuario cada ~${n.llegada} min</small></span></button>`).join('');
    $('#cit-preview').innerHTML = USUARIOS.map(c => `<div class="mini-student"><div class="av">${c.avatar}</div><b>${esc(c.nombre)}</b><div class="tag">${esc(c.perfil)}</div></div>`).join('');
    $$('[data-niv]').forEach(b => b.onclick = () => { App.niv = NIVELES.find(n => n.id === b.dataset.niv); renderSetup(); });
  }
  $('#btn-start').onclick = () => startJornada();

  /* ================== MOTOR DE LA JORNADA ================== */
  const META_PRES = 60; // meta de ejecución presupuestaria del trimestre (%)
  function startJornada() {
    const n = App.niv;
    // siempre al menos dos usuarios de atención prioritaria
    const prio = mezclar(USUARIOS.filter(c => c.prio)).slice(0, 2), resto = mezclar(USUARIOS.filter(c => !prio.includes(c)));
    const lista = mezclar(prio.concat(resto.slice(0, n.n - 2)));
    App.st = {
      t: 0, llegadas: lista.map((c, i) => ({ c, llega: Math.round(i * n.llegada + (i ? rndI(-4, 4) : 0)) })), cola: [], actual: null,
      atendidos: [], abandonos: [], puntos: 0, max: 0, conf: 0, norma: 0, prioFaltas: 0, doc: 0, colaBonus: 0, ayuda: 0, ayudasUsadas: 0,
      abast: 72, pres: 42, stockRev: 0, informes: 0, decisiones: [], usados: new Set(), log: [], fin: false, abierta: false
    };
    $('#jor-niv').textContent = 'Nivel ' + n.nombre;
    show('jor'); renderAll();
    setDialog(`<span class="who">📋 Tu puesto:</span> Eres <b>asistente administrativo</b> del <b>Centro de Salud Tipo C «Río Puyo»</b> (Pastaza). La jornada va de 08:00 a 16:30. Hoy llegarán <b>${n.n} usuarios</b> a admisión y la Directora Administrativa puede encargarte tareas de farmacia, talento humano, presupuesto e historias clínicas. Atiende con calidad, respeto a los derechos de los pacientes, confidencialidad e interculturalidad.`,
      [{ label: '🏥 Abrir la admisión', cls: 'good', fn: () => { App.st.abierta = true; log('Apertura de la ventanilla de admisión.'); avanzar(0); turno(); } }]);
    speak('Buenos días. La admisión está por abrir y ya hay usuarios en la sala de espera.', 1.05);
  }
  function log(txt, tipo = 'docente') { App.st.log.push({ t: App.st.t, txt, tipo }); }
  const espera = q => App.st.t - q.llega;
  const limite = () => App.niv.id === 'avanzado' ? 55 : 65;

  /* el reloj avanza: llegan usuarios, la sala espera, algunos se van y el stock se consume */
  function avanzar(min) {
    const s = App.st;
    s.t = Math.min(JORNADA, s.t + min);
    s.abast = clamp(s.abast - min * 0.04);
    while (s.llegadas.length && s.llegadas[0].llega <= s.t) { const q = s.llegadas.shift(); s.cola.push(q); log(`Llega ${q.c.nombre} (${q.c.perfil}).`, 'evento'); }
    s.cola = s.cola.filter(q => {
      if (espera(q) <= limite() + s.colaBonus * 0.5) return true;
      s.abandonos.push(q.c); log(`${q.c.nombre} se retiró sin ser atendido tras ${Math.round(espera(q))} min de espera.`, 'alerta'); toast(`😞 ${q.c.nombre} se fue sin ser atendido.`);
      return false;
    });
  }
  function factorTiempo() { return App.st.ayuda > 0 ? 0.7 : 1; }
  function esperaProm() { const s = App.st; return s.cola.length ? s.cola.reduce((a, q) => a + espera(q), 0) / s.cola.length : 0; }
  function animoSala() { const s = App.st; return s.cola.length ? clamp(100 - esperaProm() * 1.3 + s.colaBonus) : clamp(80 + s.colaBonus); }
  const satProm = () => { const a = App.st.atendidos; return a.length ? a.reduce((x, y) => x + y.sat, 0) / a.length : 0; };
  const calidad = () => { const s = App.st; return clamp((s.max ? s.puntos / s.max * 100 : 100) - s.norma * 12); };
  const confid = () => clamp(100 - App.st.conf * 30);

  /* ---------- render ---------- */
  const gc = (v, inv) => { const x = inv ? 100 - v : v; return x > 66 ? 'var(--bad)' : x > 33 ? 'var(--warn)' : 'var(--ok)'; };
  function renderAll() {
    const s = App.st; if (!s) return;
    $('#jor-clock').textContent = hora(s.t);
    $('#jor-fase').textContent = s.fin ? 'Jornada finalizada' : !s.abierta ? 'Antes de abrir' : `Atendidos ${s.atendidos.length} · En sala ${s.cola.length}`;
    const sp = satProm(), ep = esperaProm(), cal = calidad(), cf = confid();
    const presC = s.pres >= META_PRES - 5 ? 'var(--ok)' : s.pres >= META_PRES - 20 ? 'var(--warn)' : 'var(--bad)';
    const g = [
      { n: '😊 Satisfacción de usuarios', v: sp, c: gc(sp, true), l: s.atendidos.length ? Math.round(sp) + '%' : '—' },
      { n: '⏱️ Tiempo de espera', v: clamp(ep / limite() * 100), c: gc(clamp(ep / limite() * 100)), l: `${s.cola.length} en sala · ${Math.round(ep)} min prom.` },
      { n: '💊 Abastecimiento', v: s.abast, c: gc(s.abast, true), l: Math.round(s.abast) + '%' },
      { n: '💰 Presupuesto ejecutado', v: s.pres, c: presC, l: `${Math.round(s.pres)}% (meta ${META_PRES}%)` },
      { n: '✅ Calidad y cumplimiento', v: cal, c: gc(cal, true), l: s.norma ? `${Math.round(cal)}% · ${s.norma} incumplimiento(s)` : Math.round(cal) + '%' },
      { n: '🔒 Confidencialidad', v: cf, c: gc(cf, true), l: s.conf ? `${s.conf} vulneración(es)` : 'Protegida' }
    ];
    $('#gauges').innerHTML = g.map(x => `<div class="gauge"><div class="gauge-top"><span>${x.n}</span><b>${x.l}</b></div><div class="gauge-bar"><i style="width:${clamp(x.v)}%;background:${x.c}"></i></div></div>`).join('');
    $('#cola').innerHTML = s.cola.length ? s.cola.map(q => `<div class="unit ${q.c.prio ? 'prio' : ''}"><span class="u-av">${q.c.avatar}</span><div><b>${esc(q.c.nombre)}</b><small>${esc(q.c.perfil)} · ${q.c.prio ? '⭐ Prioritaria · ' : ''}espera ${Math.round(espera(q))} min</small></div></div>`).join('') : `<p class="muted small">${s.llegadas.length ? 'No hay nadie en la sala de espera por ahora.' : 'Ya no llegarán más usuarios hoy.'}</p>`;
    $('#log').innerHTML = s.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('');
    $$('[data-fa]').forEach(b => b.disabled = App.busy || !s.abierta || s.fin || !!s.actual);
    drawScene(); notify();
  }

  /* vista 2D del centro de salud: admisión, sala de espera y farmacia */
  function drawScene() {
    const s = App.st, svg = $('#scene');
    const nCajas = Math.round(s.abast / 100 * 12);
    let cajas = '';
    for (let i = 0; i < 12; i++) { const x = 478 + (i % 4) * 26, y = 132 + Math.floor(i / 4) * 30; cajas += `<rect x="${x}" y="${y}" width="20" height="20" rx="3" fill="${i < nCajas ? ['#38bdf8', '#f472b6', '#facc15', '#4ade80'][i % 4] : '#e2e8f0'}" stroke="#94a3b8"/>`; }
    let h = `<rect width="600" height="330" fill="#ecfdf5"/><rect y="250" width="600" height="80" fill="#cbd5e1"/>
      <rect x="150" y="12" width="300" height="58" rx="8" fill="#fff" stroke="#15803d" stroke-width="2"/>
      <rect x="162" y="24" width="34" height="34" rx="4" fill="#16a34a"/><rect x="175" y="28" width="8" height="26" fill="#fff"/><rect x="166" y="37" width="26" height="8" fill="#fff"/>
      <text x="325" y="36" font-size="13" font-weight="800" text-anchor="middle" fill="#14532d">CENTRO DE SALUD TIPO C «RÍO PUYO»</text>
      <text x="325" y="56" font-size="11" text-anchor="middle" fill="#334155">Admisión · Estadística · Farmacia</text>
      <circle cx="545" cy="44" r="30" fill="#fff" stroke="#334155" stroke-width="3"/><text x="545" y="50" font-size="15" font-weight="800" text-anchor="middle" fill="#334155">${hora(s.t)}</text>
      <rect x="30" y="170" width="170" height="80" fill="#15803d"/><rect x="30" y="160" width="170" height="14" fill="#166534"/>
      <text x="115" y="215" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">ADMISIÓN</text>
      <rect x="55" y="110" width="110" height="50" fill="#f8fafc" stroke="#94a3b8"/><text x="110" y="140" font-size="22" text-anchor="middle">💻</text>
      <text x="80" y="105" font-size="40" text-anchor="middle">🧑🏽‍💼</text>
      <text x="172" y="152" font-size="20">${s.doc > 3 ? '🗂️' : '📋'}</text>
      <rect x="465" y="100" width="118" height="150" fill="#fff" stroke="#0369a1" stroke-width="2"/><rect x="465" y="100" width="118" height="24" fill="#0369a1"/>
      <text x="524" y="117" font-size="12" font-weight="800" text-anchor="middle" fill="#fff">💊 FARMACIA</text>${cajas}
      <text x="524" y="244" font-size="10" text-anchor="middle" fill="#0c4a6e">Stock ${Math.round(s.abast)}%</text>
      <rect x="240" y="236" width="210" height="6" rx="3" fill="#94a3b8"/><text x="345" y="268" font-size="11" text-anchor="middle" fill="#475569">Sala de espera</text>
      <rect x="240" y="84" width="150" height="34" rx="6" fill="#fef3c7" stroke="#d97706"/><text x="315" y="100" font-size="10" text-anchor="middle" font-weight="800" fill="#92400e">⭐ ATENCIÓN PRIORITARIA</text><text x="315" y="112" font-size="9" text-anchor="middle" fill="#92400e">Adultos mayores · embarazadas · niñez · discapacidad</text>
      <text x="8" y="245" font-size="26">🪴</text>`;
    if (s.actual) h += `<text x="230" y="230" font-size="48" text-anchor="middle">${s.actual.c.avatar}</text><path d="M205 128 h70 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-44 l-12 12 v-12 h-14 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8z" fill="#fff" stroke="#15803d"/><text x="240" y="153" font-size="17" text-anchor="middle">💬</text>`;
    s.cola.slice(0, 5).forEach((q, i) => { const x = 270 + i * 40; h += `<rect x="${x - 15}" y="214" width="30" height="20" rx="4" fill="#64748b"/><text x="${x}" y="222" font-size="30" text-anchor="middle">${q.c.avatar}</text>`; if (q.c.prio) h += `<text x="${x + 10}" y="190" font-size="13">⭐</text>`; if (espera(q) > limite() * 0.7) h += `<text x="${x - 16}" y="190" font-size="13">😤</text>`; });
    if (s.cola.length > 5) h += `<text x="455" y="225" font-size="13" text-anchor="end" font-weight="800" fill="#334155">+${s.cola.length - 5}</text>`;
    if (s.abast < 35) h += `<text x="524" y="95" font-size="11" font-weight="800" text-anchor="middle" fill="#b91c1c">⚠️ Stock crítico</text>`;
    if (!s.abierta && !s.fin) h += `<rect x="30" y="185" width="170" height="40" fill="#dc2626"/><text x="115" y="211" font-size="16" font-weight="800" text-anchor="middle" fill="#fff">CERRADO</text>`;
    if (s.fin) h += `<rect x="30" y="185" width="170" height="40" fill="#334155"/><text x="115" y="211" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">JORNADA CERRADA</text>`;
    svg.innerHTML = h;
  }

  /* ---------- diálogo ---------- */
  function setDialog(html, choices = []) {
    $('#dialog-text').innerHTML = html;
    const box = $('#dialog-choices'); box.innerHTML = '';
    choices.forEach(c => { const b = document.createElement('button'); b.className = 'btn ' + (c.cls || ''); b.innerHTML = c.label; b.onclick = () => { if (!App.busy) c.fn(); }; box.appendChild(b); });
    if (choices.length && window.innerWidth < 1000) { const r = $('#dialog').getBoundingClientRect(); if (r.top < 60 || r.top > innerHeight * 0.7) $('#dialog').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    notify();
  }
  async function busy(fn) { if (App.busy) return; App.busy = true; renderAll(); try { await fn(); } catch (e) { console.error(e); } App.busy = false; renderAll(); }

  /* decide qué ocurre a continuación: llamar a alguien, esperar o cerrar */
  function turno() {
    const s = App.st; s.actual = null; s.enCola = true;
    if (s.t >= JORNADA) { log('Son las 16:30: fin del horario de admisión.'); return cerrar(); }
    if (!s.cola.length && !s.llegadas.length) return cerrar();
    renderAll();
    if (!s.cola.length) {
      const sig = s.llegadas[0];
      const tareas = TAREAS.filter(x => !s.usados.has(x.id));
      const ops = [{ label: `⏳ Esperar al siguiente usuario (≈ ${hora(sig.llega)})`, fn: () => { avanzar(Math.max(1, sig.llega - s.t)); turno(); } }];
      if (tareas.length) ops.unshift({ label: '🗂️ Adelantar una tarea interna mientras tanto', cls: 'good', fn: () => mostrarNovedad(tareas[Math.floor(Math.random() * tareas.length)]) });
      return setDialog('<p><b>No hay usuarios en la sala de espera.</b></p><p class="small muted">Puedes adelantar trabajo interno o esperar.</p>', ops);
    }
    const hayPrio = s.cola.some(q => q.c.prio);
    setDialog(`<p><b>Usuarios en espera: ${s.cola.length}.</b> ¿A quién llamas a la ventanilla de admisión?</p>${hayPrio ? '<p class="small">⭐ Hay personas de atención prioritaria en la sala.</p>' : ''}`,
      s.cola.map(q => ({ label: `📣 Llamar a ${esc(q.c.nombre)} <small>(${q.c.prio ? '⭐ prioritaria · ' : ''}${esc(q.c.perfil)} · espera ${Math.round(espera(q))} min)</small>`, fn: () => llamar(q) })));
  }

  function llamar(q) {
    return busy(async () => {
      const s = App.st; s.enCola = false;
      if (!q.c.prio && s.cola.some(x => x.c.prio)) { s.prioFaltas++; log(`Llamó a ${q.c.nombre} antes que a una persona de atención prioritaria.`, 'alerta'); toast('⚠️ Había una persona de atención prioritaria esperando.'); }
      s.cola = s.cola.filter(x => x !== q); s.actual = q; q.llamado = s.t;
      log(`Atiende a ${q.c.nombre}.`);
      renderAll();
      setDialog(`<span class="who">${q.c.avatar} ${esc(q.c.nombre)} <small class="muted">· ${esc(q.c.perfil)}${q.c.prio ? ' · ⭐ prioritaria' : ''}</small></span><p>“${esc(q.c.dice)}”</p>`);
      await speak(q.c.dice, q.c.pitch);
      setDialog($('#dialog-text').innerHTML + '<p class="small muted">¿Qué haces?</p>', mezclar(q.c.o).map(o => ({ label: esc(o.t), fn: () => atender(q, o) })));
    });
  }

  /* aplica los efectos comunes de una decisión */
  function aplicar(o) {
    const s = App.st, ef = o.ef || {};
    s.puntos += o.p; s.max += 2;
    if (ef.conf) { s.conf += ef.conf; log('Vulneración de la confidencialidad: ' + o.t, 'alerta'); }
    if (ef.norma) { s.norma += ef.norma; log('Incumplimiento normativo o ético: ' + o.t, 'alerta'); }
    if (ef.doc) s.doc += ef.doc;
    if (ef.abast) s.abast = clamp(s.abast + ef.abast);
    if (ef.pres) s.pres = clamp(s.pres + ef.pres);
    if (ef.colaSat) s.colaBonus = clamp(s.colaBonus + ef.colaSat, -40, 40);
    if (ef.extra) {
      mezclar(USUARIOS_EXTRA).slice(0, ef.extra).forEach((c, i) => s.llegadas.push({ c, llega: s.t + 6 + i * 10 }));
      s.llegadas.sort((a, b) => a.llega - b.llega);
      log(`Por el brote llegarán ${ef.extra} usuarios más con fiebre.`, 'evento');
    }
  }

  function atender(q, o) {
    return busy(async () => {
      const s = App.st, ef = o.ef || {};
      const esperado = Math.max(0, q.llamado - q.llega);
      const sat = clamp(ef.sat - Math.max(0, esperado - 15) * 0.5);
      aplicar(o);
      s.atendidos.push({ c: q.c, sat, p: o.p, espera: esperado });
      s.decisiones.push({ fase: q.c.nombre, t: o.t, p: o.p, fb: o.fb });
      log(`${q.c.nombre}: ${o.t}`, o.p === 0 ? 'alerta' : 'docente');
      avanzar(Math.round(ef.min * factorTiempo())); if (s.ayuda > 0) s.ayuda--;
      renderAll();
      const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
      setDialog(`<p><b>Tu respuesta:</b> ${esc(o.t)}</p><div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Atención adecuada' : o.p === 1 ? 'Atención parcialmente adecuada' : 'Atención inadecuada'}</b><br>${esc(o.fb)}</div><p class="small muted">Satisfacción de ${esc(q.c.nombre)}: ${Math.round(sat)}%${esperado > 15 ? ` (esperó ${Math.round(esperado)} min)` : ''}</p>`);
      await speak(sat >= 70 ? 'Muchas gracias por la atención.' : sat >= 40 ? 'Bueno… gracias.' : '¡Qué mala atención!', q.c.pitch);
      s.actual = null; renderAll();
      const ev = maybeEvent(); s.enCola = false;
      setDialog($('#dialog-text').innerHTML, [{ label: ev ? '⚠️ Atender la novedad' : 'Continuar ▶', cls: 'good', fn: () => ev ? mostrarNovedad(ev) : turno() }]);
    });
  }

  function maybeEvent() {
    const s = App.st;
    if (s.t >= JORNADA || Math.random() > App.niv.ev) return null;
    const pool = TAREAS.concat(EVENTOS).filter(e => !s.usados.has(e.id));
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }
  function mostrarNovedad(ev) {
    return busy(async () => {
      const s = App.st; s.usados.add(ev.id); s.enCola = false;
      const esTarea = !!ev.titulo;
      if (ev.ef0 && ev.ef0.abast) s.abast = clamp(s.abast + ev.ef0.abast);
      log((esTarea ? 'Tarea interna: ' : 'Novedad: ') + (ev.titulo || ev.txt), 'evento');
      renderAll();
      setDialog(`<span class="pill sal-pill">${esTarea ? '🗂️ Tarea interna · ' + esc(ev.titulo) : '⚠️ Imprevisto'}</span>${esTarea ? `<p class="small muted">${esc(ev.quien)}</p>` : ''}<p><b>${esc(ev.txt)}</b></p>`);
      await speak(ev.voz, esTarea ? 1.1 : 1);
      setDialog($('#dialog-text').innerHTML + '<p class="small muted">¿Qué haces?</p>', mezclar(ev.o).map(o => ({ label: esc(o.t), fn: () => resolver(ev, o) })));
    });
  }
  function resolver(ev, o) {
    return busy(async () => {
      const s = App.st, ef = o.ef || {};
      aplicar(o);
      s.decisiones.push({ fase: ev.titulo || 'Imprevisto', t: o.t, p: o.p, fb: o.fb });
      log(o.t, o.p === 0 ? 'alerta' : 'docente');
      avanzar(Math.round((ef.min || 0) * factorTiempo()));
      renderAll();
      const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
      setDialog(`<p><b>Tu decisión:</b> ${esc(o.t)}</p><div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Decisión adecuada' : o.p === 1 ? 'Decisión parcialmente adecuada' : 'Decisión inadecuada'}</b><br>${esc(o.fb)}</div>`,
        [{ label: 'Continuar ▶', cls: 'good', fn: () => turno() }]);
    });
  }

  /* ---------- acciones generales ---------- */
  const FREE = {
    informar: () => { const s = App.st; if (!s.cola.length) { toast('No hay nadie en la sala de espera.'); return null; } s.informes++; s.colaBonus = clamp(s.colaBonus + (s.informes <= 3 ? 8 : 2), -40, 40); avanzar(2); log('Informó a la sala de espera el orden de atención, la prioridad y el tiempo estimado.'); return { voz: 'Gracias por avisarnos.' }; },
    ayuda: () => { const s = App.st; if (s.ayudasUsadas >= 2) { toast('Estadística ya no puede apoyarte hoy.'); return null; } s.ayudasUsadas++; s.ayuda = 2; avanzar(2); log('Coordinó con Estadística para abrir otra ventanilla en las dos próximas atenciones.'); return { voz: 'Listo, abro la otra ventanilla.' }; },
    archivar: () => { const s = App.st; s.doc++; avanzar(5); log('Registró las atenciones del día y archivó las historias clínicas en el archivo de acceso restringido.'); return { voz: '' }; },
    stock: () => { const s = App.st; s.stockRev++; s.abast = clamp(s.abast + (s.stockRev <= 2 ? 10 : 2)); avanzar(6); log('Revisó el kárdex de farmacia, las fechas de caducidad y solicitó la reposición de los productos bajo el punto de reorden.'); return { voz: '' }; }
  };
  $$('[data-fa]').forEach(b => b.onclick = () => busy(async () => {
    const r = FREE[b.dataset.fa](); if (!r) return; renderAll();
    if (r.voz) await speak(r.voz, 1.05);
    if (App.st.enCola) turno();
  }));

  /* ---------- cierre y evaluación ---------- */
  function cerrar() {
    const s = App.st;
    s.cola.forEach(q => { s.abandonos.push(q.c); log(`${q.c.nombre} quedó sin atender al cierre.`, 'alerta'); });
    s.cola = [];
    finish();
  }
  function finish() {
    window.Sal3D?.stopAll?.();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const s = App.st; s.fin = true; s.actual = null;
    const total0 = s.atendidos.length + s.abandonos.length + s.llegadas.length;
    const espProm = s.atendidos.length ? s.atendidos.reduce((a, x) => a + x.espera, 0) / s.atendidos.length : 0;
    const cAten = satProm() / 100 * 20;
    const cNorma = s.max ? clamp(s.puntos / s.max * 20 - s.norma * 3, 0, 20) : 0;
    const cConf = clamp(20 - s.conf * 10, 0, 20);
    const cPrio = clamp(15 - s.prioFaltas * 5 - s.abandonos.filter(c => c.prio).length * 5, 0, 15);
    const cTiempo = total0 ? clamp(s.atendidos.length / total0 * 11 + (espProm <= 20 ? 4 : espProm <= 35 ? 2 : 0), 0, 15) : 0;
    const cRec = clamp(s.abast / 100 * 4 + Math.min(1, s.pres / META_PRES) * 3 + Math.min(3, s.doc * 0.75), 0, 10);
    const crit = [
      { n: 'Calidad de la atención y satisfacción', p: Math.round(cAten), m: 20 },
      { n: 'Cumplimiento normativo y procedimental', p: Math.round(cNorma), m: 20 },
      { n: 'Confidencialidad y ética', p: Math.round(cConf), m: 20 },
      { n: 'Atención prioritaria, interculturalidad e inclusión', p: Math.round(cPrio), m: 15 },
      { n: 'Tiempo de espera y productividad', p: Math.round(cTiempo), m: 15 },
      { n: 'Gestión de recursos (abastecimiento, presupuesto, registros)', p: Math.round(cRec), m: 10 }
    ];
    const total = clamp(crit.reduce((a, c) => a + c.p, 0));
    const rec = [];
    if (s.conf) rec.push(`Se registraron ${s.conf} vulneración(es) de la confidencialidad. La historia clínica y los datos de salud solo se comparten con el paciente, su representante o con autorización.`);
    if (s.norma) rec.push(`Hubo ${s.norma} incumplimiento(s) normativo(s) o ético(s): gratuidad, certificación presupuestaria, registros veraces y trato sin discriminación.`);
    if (s.prioFaltas) rec.push(`Llamó ${s.prioFaltas} vez/veces a otra persona antes que a alguien de atención prioritaria (adultos mayores, embarazadas, niñez, personas con discapacidad).`);
    if (s.abandonos.length) rec.push(`${s.abandonos.length} usuario(s) no fueron atendidos. Informe a la sala de espera, pida apoyo a Estadística y gestione mejor el tiempo.`);
    if (s.abast < 50) rec.push('El abastecimiento quedó bajo: revise el kárdex, las fechas de caducidad y el punto de reorden, y registre los faltantes.');
    if (s.pres < META_PRES - 10) rec.push(`La ejecución presupuestaria (${Math.round(s.pres)}%) está lejos de la meta (${META_PRES}%): gestione las compras planificadas con certificación y procedimiento.`);
    if (s.doc < 3) rec.push('Registre las atenciones y archive las historias clínicas: son respaldo para la estadística, la auditoría de calidad y la continuidad de la atención.');
    if (s.atendidos.length && satProm() < 65) rec.push('Mejore la calidad de la atención: escucha activa, información clara, trato digno y orientación sobre la red de servicios.');
    if (!s.informes && s.atendidos.length > 3) rec.push('Informar a la sala de espera sobre el orden y el tiempo estimado reduce la molestia de los usuarios.');
    s.decisiones.filter(d => d.p === 0).slice(0, 3).forEach(d => rec.push(`${d.fase}: ${d.fb}`));
    if (!rec.length) rec.push('¡Excelente jornada de gestión en salud! Mantenga estas prácticas.');
    saveHistory('Jornada · ' + App.niv.nombre, 'Administración de un centro de salud', total);
    $('#report').innerHTML = scoreHead('Evaluación de la jornada en el centro de salud', `Centro de Salud Tipo C «Río Puyo» · Nivel ${App.niv.nombre} · ${App.cfg.name || 'Estudiante'}`, total) + `
      <div class="kpis">
        <div class="kpi"><b>${s.atendidos.length}/${total0}</b><span>Usuarios atendidos</span></div>
        <div class="kpi"><b>${s.atendidos.length ? Math.round(satProm()) + '%' : '—'}</b><span>Satisfacción promedio</span></div>
        <div class="kpi"><b>${s.atendidos.length ? Math.round(espProm) + ' min' : '—'}</b><span>Espera promedio</span></div>
        <div class="kpi"><b>${Math.round(s.abast)}%</b><span>Abastecimiento final</span></div>
        <div class="kpi"><b>${Math.round(s.pres)}%</b><span>Presupuesto ejecutado</span></div>
        <div class="kpi"><b>${s.conf}</b><span>Vulneraciones de confidencialidad</span></div>
      </div>
      <div class="report-grid">
        <div class="card"><h2>Rúbrica</h2>${crit.map(c => `<div class="crit"><div class="crit-top"><span>${c.n}</span><span>${c.p}/${c.m}</span></div><div class="crit-bar"><i style="width:${c.p / c.m * 100}%"></i></div></div>`).join('')}</div>
        <div class="card"><h2>Recomendaciones</h2><ul class="rec">${rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        <div class="card" style="grid-column:1/-1"><h2>Tus decisiones</h2><ol>${s.decisiones.map(d => `<li><p><b>${d.p === 2 ? '✔' : d.p === 1 ? '◐' : '✘'} ${esc(d.fase)}:</b> ${esc(d.t)}</p><p class="small muted">${esc(d.fb)}</p></li>`).join('')}</ol></div>
        <details class="card" style="grid-column:1/-1"><summary><b>📜 Bitácora de la jornada (${s.log.length} registros)</b></summary><ol class="log" style="max-height:none">${s.log.map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('')}</ol></details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary sal-btn" id="rp-again">🔁 Repetir la jornada</button>
        <button class="btn" id="rp-new">🎚️ Cambiar nivel</button>
        <button class="btn" id="rp-print">🖨️ Imprimir / guardar PDF</button>
        <button class="btn" id="rp-menu">🏠 Menú principal</button>
      </div>`;
    $('#rp-again').onclick = startJornada;
    $('#rp-new').onclick = () => { renderSetup(); show('setup'); };
    $('#rp-print').onclick = () => window.print();
    $('#rp-menu').onclick = () => show('hub');
    show('report');
  }
  $('#btn-end').onclick = () => { if (App.busy) return; if (confirm('¿Deseas cerrar la jornada y ver tu evaluación?')) cerrar(); };

  /* ================== FINANZAS Y SISTEMA NACIONAL DE SALUD ================== */
  function openQuiz(tipo) {
    const banco = tipo === 'fin' ? FIN_BANCO : SNC_BANCO;
    const nCalc = tipo === 'fin' ? N_CALC_FIN : 0;
    const calc = nCalc ? mezclar(banco.slice(-nCalc)).slice(0, 4) : [];
    const mcs = mezclar(nCalc ? banco.slice(0, -nCalc) : banco).slice(0, 10 - calc.length);
    const qs = mezclar(mcs.concat(calc)).map(f => f());
    const st = { i: 0, ok: 0, res: [] }, body = $(`#${tipo}-body`), titulo = tipo === 'fin' ? 'Finanzas y presupuesto en salud' : 'Sistema Nacional de Salud y calidad';
    const render = () => {
      const q = qs[st.i];
      body.innerHTML = `<div class="card"><div class="lab-top"><span class="pill pill-soft">Pregunta ${st.i + 1}/${qs.length}</span><span class="small muted">${esc(subj(q.asig).n)}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.num !== undefined ? `<div class="lab-num"><input class="q-in" inputmode="decimal" placeholder="Tu respuesta"><button class="btn btn-primary sal-btn q-ok">Comprobar</button></div>` : `<div class="dialog-choices">${q.o.map((o, i) => `<button class="btn" data-o="${i}">${esc(o)}</button>`).join('')}</div>`}
        <div class="q-fb"></div></div>`;
      const answer = good => {
        if (good) st.ok++; st.res.push({ q: q.q, good, exp: q.exp });
        $('.q-fb', body).innerHTML = `<div class="case-fb" style="border-color:${good ? 'var(--ok)' : 'var(--bad)'}"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Incorrecto'}</b><br>${esc(q.exp)}</div>
          <button class="btn btn-primary sal-btn q-next">${st.i + 1 < qs.length ? 'Siguiente ▶' : 'Ver resultado'}</button>`;
        $('.q-next', body).onclick = () => { st.i++; if (st.i < qs.length) render(); else done(); };
      };
      if (q.num !== undefined) $('.q-ok', body).onclick = () => { const v = parseFloat($('.q-in', body).value.replace(/\$|\s|%/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.')); if (isNaN(v)) return toast('Escribe un número.'); $('.q-ok', body).disabled = true; answer(Math.abs(v - q.num) <= q.tol); };
      else $$('[data-o]', body).forEach(b => b.onclick = () => { $$('[data-o]', body).forEach(x => { x.disabled = true; if (+x.dataset.o === q.c) x.classList.add('good'); }); if (+b.dataset.o !== q.c) b.classList.add('bad'); answer(+b.dataset.o === q.c); });
    };
    const done = () => {
      const total = Math.round(st.ok / qs.length * 100);
      body.innerHTML = scoreHead(titulo, `${st.ok} de ${qs.length} respuestas correctas`, total) + `
        <div class="card"><h2>Repaso</h2><ol>${st.res.map(r => `<li><p><b>${r.good ? '✔' : '✘'}</b> ${esc(r.q)}</p><p class="small muted">${esc(r.exp)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary sal-btn q-again">🔁 Nueva sesión</button><button class="btn q-menu">🏠 Menú principal</button></div>`;
      $('.q-again', body).onclick = () => openQuiz(tipo); $('.q-menu', body).onclick = () => show('hub');
      saveHistory(tipo === 'fin' ? 'Finanzas' : 'Sistema de Salud', titulo, total);
    };
    render(); show(tipo);
  }

  /* ================== CASOS ================== */

  /* ================== PRÁCTICAS POR ASIGNATURA ================== */
  function openAsig(cod) {
    const lista = window.CASOS_ASIG || [];
    $('#screen-cases h1').textContent = 'Prácticas por asignatura';
    $('#cases-list').innerHTML = '<p class="muted">Una situación simulada para cada asignatura de la malla: actúa en la escena y responde con tu voz o por escrito.</p>' +
      [1, 2, 3, 4].map(pao => {
        const ms = MALLA_SAL.filter(m => m.pao === pao && lista.some(x => x.cod === m.cod));
        return ms.length ? `<h3 class="asig-pao">Período ${pao}</h3><div class="topic-list">${ms.map(m => { const c = lista.find(x => x.cod === m.cod); return `<button class="choice" data-asig="${m.cod}"><span class="em">${c.persona.avatar}</span><span><b>${esc(m.n)}</b><small>${esc(c.titulo)}</small><small class="tags">${esc(c.objetivo || c.persona.rol)}</small><small class="muted">Período ${m.pao} · también en: ${m.mod.filter(k => MODS[k]).map(k => MODS[k].emoji + ' ' + MODS[k].nombre).join(' · ')}</small></span></button>`; }).join('')}</div>` : '';
      }).join('');
    $$('[data-asig]').forEach(b => b.onclick = () => playCase(lista.find(x => x.cod === b.dataset.asig)));
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
    const b = cod && document.querySelector(`[data-asig="${cod}"]`); if (b) b.click();
  }

  function openCases(cod) {
    $('#screen-cases h1').textContent = 'Casos profesionales';
    const list = cod ? CASOS_SAL.filter(c => c.asignaturas.includes(cod)) : CASOS_SAL;
    $('#cases-list').innerHTML = (cod ? `<p class="muted">Casos relacionados con <b>${esc(subj(cod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASOS_SAL.find(c => c.id === b.dataset.case)));
    if (cod) $('#cases-all').onclick = () => openCases();
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
  }
  function sayLine(c, t) { return /^\(.*\)$/.test(t) ? `<div class="case-say"><i>${esc(t.slice(1, -1))}</i></div>` : `<div class="case-say"><b>${esc(c.persona.nombre)}:</b> “${esc(t)}”</div>`; }
  function playCase(c) {
    // situación simulada: actuar en la escena y responder hablando o escribiendo
    if (window.CasoVivo) {
      $('#cases-list').hidden = true; $('#case-player').hidden = false;
      const ok = CasoVivo.play(c, { P: $('#case-player'), btn: 'btn-primary sal-btn', speak: speak, toast: toast, scoreHead,
        sub: (c.cod ? 'Práctica de la asignatura · ' : 'Caso profesional · ') + c.asignaturas.map(a => (subj(a) || {}).n).join(', '),
        onEnd: total => saveHistory(c.cod ? 'Asignatura' : 'Casos', c.titulo, total), onList: () => c.cod ? openAsig() : openCases(), onMenu: () => show('hub') });
      if (ok) return;
    }
    const st = { i: 0, pts: 0, log: [] }, P = $('#case-player');
    $('#cases-list').hidden = true; P.hidden = false;
    const step = () => {
      const paso = c.pasos[st.i];
      P.innerHTML = `<div class="case-head card"><span class="case-av">${c.persona.avatar}</span><div><h2>${esc(c.titulo)}</h2><p class="muted">${esc(c.persona.nombre)} · ${esc(c.persona.rol)}</p><p class="small">${esc(c.contexto)}</p></div><span class="pill pill-soft">Paso ${st.i + 1}/${c.pasos.length}</span></div>
        <div class="card">${sayLine(c, paso.dice)}<p class="small muted">¿Qué haces o dices?</p>
        <div class="dialog-choices" id="case-opts">${mezclar(paso.opciones.map((o, i) => ({ o, i }))).map(({ o, i }) => `<button class="btn" data-p="${i}">${esc(o.t)}</button>`).join('')}</div><div id="case-fb"></div></div>`;
      $$('#case-opts .btn').forEach(b => b.onclick = () => {
        const o = paso.opciones[+b.dataset.p];
        $$('#case-opts .btn').forEach(x => { x.disabled = true; if (x !== b) x.style.opacity = .5; });
        if (o.p !== 1) b.classList.add(o.p === 2 ? 'good' : 'bad');
        st.pts += o.p; st.log.push({ t: o.t, p: o.p, fb: o.fb });
        const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
        $('#case-fb').innerHTML = `${sayLine(c, o.r)}<div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Respuesta adecuada' : o.p === 1 ? 'Respuesta parcialmente adecuada' : 'Respuesta inadecuada'}</b><br>${esc(o.fb)}</div>
          <button class="btn btn-primary sal-btn" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else end(); };
        speak(o.r, c.persona.pitch);
      });
      speak(paso.dice, c.persona.pitch);
    };
    const end = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary sal-btn" id="case-again">🔁 Repetir</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" id="case-menu">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c); $('#case-list').onclick = () => openCases(); $('#case-menu').onclick = () => show('hub');
      saveHistory('Casos', c.titulo, total); window.scrollTo(0, 0);
    };
    step(); window.scrollTo(0, 0);
  }

  /* ================== MAPA ================== */
  function openMapa() {
    $('#mapa-grid').innerHTML = [1, 2, 3, 4].map(pao => `<div class="mapa-col"><h3 class="sal-h3">Período ${pao}</h3>${MALLA_SAL.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${m.mod.map(k => MODS[k].emoji).join(' ')} · ${m.cod}</small></button>`).join('')}</div>`).join('');
    $$('[data-cod]').forEach(b => b.onclick = () => {
      const m = subj(b.dataset.cod), casos = CASOS_SAL.filter(c => c.asignaturas.includes(m.cod));
      const ciud = USUARIOS.filter(c => c.asig.includes(m.cod)).concat(TAREAS.filter(t => t.asig.includes(m.cod)));
      $$('[data-cod]').forEach(x => x.classList.toggle('sel', x === b));
      $('#mapa-detail').innerHTML = `<h2>${esc(m.n)}</h2><p class="small muted">${m.cod} · Período ${m.pao} · Relación ${m.rel}</p><p>${esc(m.sim)}</p>
        <div class="report-actions">${m.mod.map(k => `<button class="btn" data-mod="${k}">${MODS[k].emoji} ${MODS[k].nombre}</button>`).join('')}${(window.CASOS_ASIG || []).some(x => x.cod === m.cod) ? '<button class="btn" data-mod="asig">🎯 Práctica de la asignatura</button>' : ''}</div>
        ${ciud.length ? `<p class="small"><b>En la jornada:</b> ${ciud.map(c => esc(c.nombre || c.titulo)).join(' · ')}</p>` : ''}
        ${casos.length ? `<p class="small"><b>Casos:</b> ${casos.map(c => esc(c.titulo)).join(' · ')}</p>` : ''}`;
      $$('#mapa-detail [data-mod]').forEach(x => x.onclick = () => openModule(x.dataset.mod, x.dataset.mod === 'asig' || casos.length ? m.cod : undefined));
      if (innerWidth < 900) $('#mapa-detail').scrollIntoView({ behavior: 'smooth' });
    });
    $('#mapa-detail').innerHTML = '<p class="muted">Selecciona una asignatura para ver con qué módulo se practica.</p>';
    show('mapa');
  }

  /* ================== puente con la vista 3D / RA ================== */
  function notify() { App.listeners.forEach(f => { try { f(); } catch (e) { console.error(e); } }); }
  App.subscribe = f => App.listeners.push(f);
  App.getHud = () => ({
    text: $('#dialog-text').textContent.trim(),
    buttons: $$('#dialog-choices .btn').concat(App.st && App.st.abierta && !App.st.fin && !App.st.actual ? $$('[data-fa]') : []).map(b => ({ label: b.textContent.trim(), disabled: b.disabled, el: b })),
    busy: App.busy
  });
  App.escena = () => { const s = App.st; return s ? { cola: s.cola.map(q => ({ avatar: q.c.avatar, prio: q.c.prio })), actual: s.actual ? s.actual.c.avatar : null, abierta: s.abierta && !s.fin, hora: hora(s.t), abast: s.abast } : null; };
})();
