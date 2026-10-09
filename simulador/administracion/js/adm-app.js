/* =========================================================
   Simulador de Gestión Pública – Carrera de Administración en
   Instituciones Públicas. Controlador de la interfaz: jornada de
   atención ciudadana, finanzas, normativa, casos y mapa curricular.
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
  const subj = cod => MALLA_ADM.find(m => m.cod === cod);
  const JORNADA = 510; // 08:00 a 16:30
  const hora = t => { const m = 480 + Math.round(t); return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };

  const App = { cfg: store.get('adm-cfg', { name: '', inst: '', voice: true }), niv: NIVELES[1], st: null, busy: false, listeners: [] };
  window.AdmApp = App;

  /* ================== utilidades ================== */
  function show(s) { $$('.screen').forEach(x => x.hidden = x.id !== 'screen-' + s); window.scrollTo(0, 0); }
  let tt; function toast(m, ms = 2800) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, ms); }
  App.toast = toast;
  function applyTheme(th) { if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => { const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const n = cur === 'dark' ? 'light' : 'dark'; applyTheme(n); store.set('aula-theme', n); };
  const syncSound = () => { $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇'; };
  $('#btn-sound').onclick = () => { App.cfg.voice = !App.cfg.voice; store.set('adm-cfg', App.cfg); syncSound(); if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel(); };
  syncSound();
  $$('[data-go]').forEach(b => b.onclick = () => { window.Adm3D?.stopAll?.(); show(b.dataset.go); });

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
      <div class="score"><div class="score-ring adm-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }
  function saveHistory(modulo, titulo, total) {
    const h = store.get('adm-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, modulo, titulo, total });
    store.set('adm-history', h.slice(0, 50));
  }

  /* ================== INICIO Y MENÚ ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst; $('#f-voice').checked = App.cfg.voice;
  const syncBrand = () => { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Administración en Instituciones Públicas'; };
  syncBrand();
  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, { name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(), voice: $('#f-voice').checked });
    store.set('adm-cfg', App.cfg); syncSound(); syncBrand();
    if (App.cfg.voice && 'speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); }
    $('#hub-name').textContent = App.cfg.name ? ', ' + App.cfg.name : '';
    show('hub');
  };
  $$('[data-hub]').forEach(b => b.onclick = () => openModule(b.dataset.hub));
  function openModule(k, cod) {
    if (k === 'jor') { renderSetup(); show('setup'); }
    if (k === 'fin') openQuiz('fin');
    if (k === 'nor') openQuiz('nor');
    if (k === 'casos') openCases(cod);
    if (k === 'mapa') openMapa();
  }
  $('#btn-history').onclick = () => {
    const h = store.get('adm-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.titulo)}</b><br><span class="muted small">${esc(e.modulo)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no hay prácticas registradas.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('adm-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== PREPARAR JORNADA ================== */
  function renderSetup() {
    $('#niv-list').innerHTML = NIVELES.map(n => `<button class="choice" data-niv="${n.id}" aria-pressed="${App.niv.id === n.id}"><span class="em">${n.emoji}</span><span><b>${n.nombre}</b><small>${esc(n.desc)}</small><small>Llega un ciudadano cada ~${n.llegada} min</small></span></button>`).join('');
    $('#cit-preview').innerHTML = CIUDADANOS.map(c => `<div class="mini-student"><div class="av">${c.avatar}</div><b>${esc(c.nombre)}</b><div class="tag">${esc(c.perfil)}</div></div>`).join('');
    $$('[data-niv]').forEach(b => b.onclick = () => { App.niv = NIVELES.find(n => n.id === b.dataset.niv); renderSetup(); });
  }
  $('#btn-start').onclick = () => startJornada();

  /* ================== MOTOR DE LA JORNADA ================== */
  function startJornada() {
    const n = App.niv;
    // siempre al menos dos ciudadanos de atención prioritaria
    const prio = mezclar(CIUDADANOS.filter(c => c.prio)).slice(0, 2), resto = mezclar(CIUDADANOS.filter(c => !prio.includes(c)));
    const lista = mezclar(prio.concat(resto.slice(0, n.n - 2)));
    App.st = {
      t: 0, llegadas: lista.map((c, i) => ({ c, llega: Math.round(i * n.llegada + (i ? rndI(-4, 4) : 0)) })), cola: [], actual: null,
      atendidos: [], abandonos: [], puntos: 0, max: 0, faltas: 0, prioFaltas: 0, doc: 0, colaBonus: 0, ayuda: 0, ayudasUsadas: 0,
      fatiga: 0, informes: 0, decisiones: [], usados: new Set(), log: [], fin: false, abierta: false
    };
    $('#jor-niv').textContent = 'Nivel ' + n.nombre;
    show('jor'); renderAll();
    setDialog(`<span class="who">📋 Tu puesto:</span> Eres <b>asistente de atención ciudadana</b> en la ventanilla única del <b>GAD Municipal de San Isidro</b>. La jornada va de 08:00 a 16:30. Hoy llegarán <b>${n.n} ciudadanos</b> y la Directora Administrativa puede encargarte tareas internas. Atiende con calidad, legalidad, ética y respetando la atención prioritaria.`,
      [{ label: '🏛️ Abrir la ventanilla', cls: 'good', fn: () => { App.st.abierta = true; log('Apertura de la ventanilla.'); avanzar(0); turno(); } }]);
    speak('Buenos días. La ventanilla está por abrir y ya hay ciudadanos esperando.', 1.05);
  }
  function log(txt, tipo = 'docente') { App.st.log.push({ t: App.st.t, txt, tipo }); }
  const espera = q => App.st.t - q.llega;
  const limite = () => App.niv.id === 'avanzado' ? 55 : 65;

  /* el reloj avanza: llegan ciudadanos, la fila espera y algunos se van */
  function avanzar(min) {
    const s = App.st;
    s.t = Math.min(JORNADA, s.t + min);
    s.fatiga = clamp(s.fatiga + min * 0.12);
    while (s.llegadas.length && s.llegadas[0].llega <= s.t) { const q = s.llegadas.shift(); s.cola.push(q); log(`Llega ${q.c.nombre} (${q.c.perfil}).`, 'evento'); }
    s.cola = s.cola.filter(q => {
      if (espera(q) <= limite() + s.colaBonus * 0.5) return true;
      s.abandonos.push(q.c); log(`${q.c.nombre} se retiró sin ser atendido tras ${Math.round(espera(q))} min de espera.`, 'alerta'); toast(`😞 ${q.c.nombre} se fue sin ser atendido.`);
      return false;
    });
  }
  function factorTiempo() { const s = App.st; let f = 1 + s.fatiga / 250; if (s.ayuda > 0) f *= 0.7; return f; }
  function animoFila() {
    const s = App.st; if (!s.cola.length) return clamp(80 + s.colaBonus);
    const prom = s.cola.reduce((a, q) => a + espera(q), 0) / s.cola.length;
    return clamp(100 - prom * 1.3 + s.colaBonus);
  }
  const satProm = () => { const a = App.st.atendidos; return a.length ? a.reduce((x, y) => x + y.sat, 0) / a.length : 0; };

  /* ---------- render ---------- */
  const gc = (v, inv) => { const x = inv ? 100 - v : v; return x > 66 ? 'var(--bad)' : x > 33 ? 'var(--warn)' : 'var(--ok)'; };
  function renderAll() {
    const s = App.st; if (!s) return;
    $('#jor-clock').textContent = hora(s.t);
    $('#jor-fase').textContent = s.fin ? 'Jornada finalizada' : !s.abierta ? 'Antes de abrir' : `Atendidos ${s.atendidos.length} · En fila ${s.cola.length}`;
    const sp = satProm(), af = animoFila(), docP = Math.min(100, s.doc * 14);
    const g = [
      { n: '🕗 Jornada', v: s.t / JORNADA * 100, c: 'var(--primary)', l: `${hora(s.t)} de 16:30` },
      { n: '😊 Satisfacción de atendidos', v: sp, c: gc(sp, true), l: s.atendidos.length ? Math.round(sp) + '%' : '—' },
      { n: '🧍 Ánimo de la fila', v: af, c: gc(af, true), l: `${s.cola.length} en espera · ${Math.round(af)}%` },
      { n: '⚖️ Integridad', v: clamp(100 - s.faltas * 25), c: gc(100 - s.faltas * 25, true), l: s.faltas ? `${s.faltas} falta(s) ética(s)` : 'Sin faltas' },
      { n: '🗂️ Gestión documental', v: docP, c: 'var(--primary)', l: `${s.doc} registro(s)` },
      { n: '😮‍💨 Fatiga', v: s.fatiga, c: gc(s.fatiga), l: Math.round(s.fatiga) + '%' }
    ];
    $('#gauges').innerHTML = g.map(x => `<div class="gauge"><div class="gauge-top"><span>${x.n}</span><b>${x.l}</b></div><div class="gauge-bar"><i style="width:${clamp(x.v)}%;background:${x.c}"></i></div></div>`).join('');
    $('#cola').innerHTML = s.cola.length ? s.cola.map(q => `<div class="unit ${q.c.prio ? 'prio' : ''}"><span class="u-av">${q.c.avatar}</span><div><b>${esc(q.c.nombre)}</b><small>${esc(q.c.perfil)} · ${q.c.prio ? '⭐ Prioritaria · ' : ''}espera ${Math.round(espera(q))} min</small></div></div>`).join('') : `<p class="muted small">${s.llegadas.length ? 'No hay nadie en la fila por ahora.' : 'Ya no llegarán más ciudadanos hoy.'}</p>`;
    $('#log').innerHTML = s.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('');
    $$('[data-fa]').forEach(b => b.disabled = App.busy || !s.abierta || s.fin || !!s.actual);
    drawScene(); notify();
  }

  /* vista 2D de la oficina */
  function drawScene() {
    const s = App.st, svg = $('#scene');
    let h = `<rect width="600" height="330" fill="#e0f2fe"/><rect y="250" width="600" height="80" fill="#cbd5e1"/>
      <rect x="190" y="14" width="270" height="62" rx="8" fill="#fff" stroke="#0f766e" stroke-width="2"/>
      <text x="325" y="38" font-size="14" font-weight="800" text-anchor="middle" fill="#0f766e">GAD MUNICIPAL DE SAN ISIDRO</text>
      <text x="325" y="60" font-size="12" text-anchor="middle" fill="#334155">Ventanilla única de atención</text>
      <circle cx="540" cy="55" r="32" fill="#fff" stroke="#334155" stroke-width="3"/><text x="540" y="61" font-size="16" font-weight="800" text-anchor="middle" fill="#334155">${hora(s.t)}</text>
      <rect x="40" y="170" width="180" height="80" fill="#0f766e"/><rect x="40" y="160" width="180" height="14" fill="#115e59"/>
      <rect x="70" y="110" width="120" height="50" fill="#f8fafc" stroke="#94a3b8"/><text x="130" y="140" font-size="22" text-anchor="middle">💻</text>
      <text x="100" y="105" font-size="44" text-anchor="middle">🧑🏽‍💼</text>
      <text x="200" y="152" font-size="22">${s.doc > 3 ? '🗂️' : '📄'}</text>
      <rect x="250" y="236" width="330" height="6" rx="3" fill="#94a3b8"/><text x="420" y="232" font-size="11" text-anchor="middle" fill="#475569">Fila de espera</text>
      <rect x="440" y="100" width="130" height="40" rx="6" fill="#fef3c7" stroke="#d97706"/><text x="505" y="118" font-size="11" text-anchor="middle" font-weight="800" fill="#92400e">⭐ ATENCIÓN</text><text x="505" y="132" font-size="11" text-anchor="middle" font-weight="800" fill="#92400e">PRIORITARIA</text>
      <text x="20" y="245" font-size="30">🪴</text>`;
    if (s.actual) h += `<text x="250" y="230" font-size="52" text-anchor="middle">${s.actual.c.avatar}</text><path d="M220 120 h90 a8 8 0 0 1 8 8 v24 a8 8 0 0 1 -8 8 h-60 l-12 12 v-12 h-18 a8 8 0 0 1 -8 -8 v-24 a8 8 0 0 1 8 -8z" fill="#fff" stroke="#0f766e"/><text x="265" y="146" font-size="18" text-anchor="middle">💬</text>`;
    s.cola.slice(0, 7).forEach((q, i) => { const x = 320 + i * 40; h += `<text x="${x}" y="228" font-size="32" text-anchor="middle">${q.c.avatar}</text>`; if (q.c.prio) h += `<text x="${x + 12}" y="196" font-size="14">⭐</text>`; if (espera(q) > limite() * 0.7) h += `<text x="${x - 14}" y="196" font-size="14">😤</text>`; });
    if (s.cola.length > 7) h += `<text x="590" y="225" font-size="14" text-anchor="end" font-weight="800" fill="#334155">+${s.cola.length - 7}</text>`;
    if (!s.abierta && !s.fin) h += `<rect x="40" y="185" width="180" height="40" fill="#dc2626"/><text x="130" y="211" font-size="16" font-weight="800" text-anchor="middle" fill="#fff">CERRADO</text>`;
    if (s.fin) h += `<rect x="40" y="185" width="180" height="40" fill="#334155"/><text x="130" y="211" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">JORNADA CERRADA</text>`;
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
    const s = App.st; s.actual = null;
    if (s.t >= JORNADA) { log('Son las 16:30: fin del horario de atención.'); return cerrar(); }
    if (!s.cola.length && !s.llegadas.length) return cerrar();
    renderAll();
    if (!s.cola.length) {
      const sig = s.llegadas[0];
      const tareas = TAREAS.filter(x => !s.usados.has(x.id));
      const ops = [{ label: `⏳ Esperar al siguiente ciudadano (≈ ${hora(sig.llega)})`, fn: () => { avanzar(Math.max(1, sig.llega - s.t)); turno(); } }];
      if (tareas.length) ops.unshift({ label: '🗂️ Adelantar una tarea interna mientras tanto', cls: 'good', fn: () => mostrarNovedad(tareas[Math.floor(Math.random() * tareas.length)]) });
      return setDialog('<p><b>No hay ciudadanos en la fila.</b></p><p class="small muted">Puedes adelantar trabajo interno o esperar.</p>', ops);
    }
    const hayPrio = s.cola.some(q => q.c.prio);
    setDialog(`<p><b>Ciudadanos en espera: ${s.cola.length}.</b> ¿A quién llamas a la ventanilla?</p>${hayPrio ? '<p class="small">⭐ Hay personas de atención prioritaria en la fila.</p>' : ''}`,
      s.cola.map(q => ({ label: `📣 Llamar a ${esc(q.c.nombre)} <small>(${q.c.prio ? '⭐ prioritaria · ' : ''}${esc(q.c.perfil)} · espera ${Math.round(espera(q))} min)</small>`, fn: () => llamar(q) })));
  }

  function llamar(q) {
    return busy(async () => {
      const s = App.st;
      if (!q.c.prio && s.cola.some(x => x.c.prio)) { s.prioFaltas++; log(`Llamó a ${q.c.nombre} antes que a una persona de atención prioritaria.`, 'alerta'); toast('⚠️ Había una persona de atención prioritaria esperando.'); }
      s.cola = s.cola.filter(x => x !== q); s.actual = q; q.llamado = s.t;
      log(`Atiende a ${q.c.nombre}.`);
      renderAll();
      setDialog(`<span class="who">${q.c.avatar} ${esc(q.c.nombre)} <small class="muted">· ${esc(q.c.perfil)}${q.c.prio ? ' · ⭐ prioritaria' : ''}</small></span><p>“${esc(q.c.dice)}”</p>`);
      await speak(q.c.dice, q.c.pitch);
      setDialog($('#dialog-text').innerHTML + '<p class="small muted">¿Qué haces?</p>', mezclar(q.c.o).map(o => ({ label: esc(o.t), fn: () => atender(q, o) })));
    });
  }

  function atender(q, o) {
    return busy(async () => {
      const s = App.st, ef = o.ef || {};
      const esperado = Math.max(0, q.llamado - q.llega);
      const sat = clamp(ef.sat - Math.max(0, esperado - 15) * 0.5);
      s.puntos += o.p; s.max += 2;
      if (ef.etica) { s.faltas += ef.etica; log('Falta ética: ' + o.t, 'alerta'); }
      if (ef.doc) s.doc += ef.doc;
      s.atendidos.push({ c: q.c, sat, p: o.p, espera: esperado });
      s.decisiones.push({ fase: q.c.nombre, t: o.t, p: o.p, fb: o.fb });
      log(`${q.c.nombre}: ${o.t}`, o.p === 0 ? 'alerta' : 'docente');
      avanzar(Math.round(ef.min * factorTiempo())); if (s.ayuda > 0) s.ayuda--;
      renderAll();
      const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
      setDialog(`<p><b>Tu respuesta:</b> ${esc(o.t)}</p><div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Atención adecuada' : o.p === 1 ? 'Atención parcialmente adecuada' : 'Atención inadecuada'}</b><br>${esc(o.fb)}</div><p class="small muted">Satisfacción de ${esc(q.c.nombre)}: ${Math.round(sat)}%${esperado > 15 ? ` (esperó ${Math.round(esperado)} min)` : ''}</p>`);
      await speak(sat >= 70 ? 'Muchas gracias por su atención.' : sat >= 40 ? 'Bueno… gracias.' : '¡Qué mala atención!', q.c.pitch);
      s.actual = null; renderAll();
      const ev = maybeEvent();
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
      const s = App.st; s.usados.add(ev.id);
      const esTarea = !!ev.titulo;
      log((esTarea ? 'Tarea interna: ' : 'Novedad: ') + (ev.titulo || ev.txt), 'evento');
      setDialog(`<span class="pill adm-pill">${esTarea ? '🗂️ Tarea interna · ' + esc(ev.titulo) : '⚠️ Imprevisto'}</span>${esTarea ? `<p class="small muted">${esc(ev.quien)}</p>` : ''}<p><b>${esc(ev.txt)}</b></p>`);
      await speak(ev.voz, esTarea ? 1.1 : 1);
      setDialog($('#dialog-text').innerHTML + '<p class="small muted">¿Qué haces?</p>', mezclar(ev.o).map(o => ({ label: esc(o.t), fn: () => resolver(ev, o) })));
    });
  }
  function resolver(ev, o) {
    return busy(async () => {
      const s = App.st, ef = o.ef || {};
      s.puntos += o.p; s.max += 2;
      if (ef.etica) { s.faltas += ef.etica; log('Falta ética: ' + o.t, 'alerta'); }
      if (ef.doc) s.doc += ef.doc;
      if (ef.colaSat) s.colaBonus = clamp(s.colaBonus + ef.colaSat, -40, 40);
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
    informar: () => { const s = App.st; if (!s.cola.length) { toast('No hay nadie en la fila.'); return null; } s.informes++; s.colaBonus = clamp(s.colaBonus + (s.informes <= 3 ? 8 : 2), -40, 40); avanzar(2); log('Informó a la fila el orden de atención y el tiempo estimado de espera.'); return { voz: 'Gracias por avisarnos.' }; },
    ayuda: () => { const s = App.st; if (s.ayudasUsadas >= 2) { toast('Las otras ventanillas ya no pueden apoyarte hoy.'); return null; } s.ayudasUsadas++; s.ayuda = 2; avanzar(2); log('Coordinó con otra ventanilla para agilizar las dos próximas atenciones.'); return { voz: 'Listo, te ayudo con los siguientes.' }; },
    archivar: () => { const s = App.st; s.doc++; avanzar(5); log('Registró y archivó la documentación de las atenciones en el sistema documental.'); return { voz: '' }; },
    pausa: () => { const s = App.st; s.fatiga = clamp(s.fatiga - 30); avanzar(5); log('Tomó una pausa activa de cinco minutos.'); return { voz: '' }; }
  };
  $$('[data-fa]').forEach(b => b.onclick = () => busy(async () => {
    const r = FREE[b.dataset.fa](); if (!r) return; renderAll();
    if (r.voz) await speak(r.voz, 1.05);
    if (!App.st.actual) turno();
  }));

  /* ---------- cierre y evaluación ---------- */
  function cerrar() {
    const s = App.st;
    s.cola.forEach(q => { s.abandonos.push(q.c); log(`${q.c.nombre} quedó sin atender al cierre.`, 'alerta'); });
    s.cola = [];
    finish();
  }
  function finish() {
    window.Adm3D?.stopAll?.();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const s = App.st; s.fin = true; s.actual = null;
    const total0 = s.atendidos.length + s.abandonos.length + s.llegadas.length;
    const calidad = satProm() / 100 * 20;
    const norma = s.max ? s.puntos / s.max * 20 : 0;
    const etica = clamp(20 - s.faltas * 10, 0, 20);
    const prio = clamp(15 - s.prioFaltas * 5 - s.abandonos.filter(c => c.prio).length * 5, 0, 15);
    const prod = total0 ? s.atendidos.length / total0 * 15 : 0;
    const gest = Math.min(10, s.doc * 2);
    const crit = [
      { n: 'Calidad de la atención', p: Math.round(calidad), m: 20 },
      { n: 'Cumplimiento normativo y procedimental', p: Math.round(norma), m: 20 },
      { n: 'Ética y transparencia', p: Math.round(etica), m: 20 },
      { n: 'Atención prioritaria e inclusión', p: Math.round(prio), m: 15 },
      { n: 'Productividad y manejo del tiempo', p: Math.round(prod), m: 15 },
      { n: 'Gestión interna y documental', p: Math.round(gest), m: 10 }
    ];
    const total = clamp(crit.reduce((a, c) => a + c.p, 0));
    const rec = [];
    if (s.faltas) rec.push(`Se registraron ${s.faltas} falta(s) ética(s). Recuerde: no aceptar dádivas, no dar trato preferente y proteger la información pública y los datos personales.`);
    if (s.prioFaltas) rec.push(`Llamó ${s.prioFaltas} vez/veces a otra persona antes que a alguien de atención prioritaria (adultos mayores, embarazadas, personas con discapacidad).`);
    if (s.abandonos.length) rec.push(`${s.abandonos.length} ciudadano(s) no fueron atendidos. Informe a la fila, coordine apoyo con otras ventanillas y gestione mejor el tiempo.`);
    if (s.doc < 3) rec.push('Registre y archive la documentación de las atenciones y las tareas: es respaldo para el control interno y la Contraloría.');
    if (s.atendidos.length && satProm() < 65) rec.push('Mejore la calidad de la atención: escucha activa, información clara y orientación basada en requisitos oficiales.');
    if (!s.informes && s.atendidos.length > 3) rec.push('Informar a la fila sobre el orden y el tiempo de espera reduce la molestia de la ciudadanía.');
    s.decisiones.filter(d => d.p === 0).slice(0, 3).forEach(d => rec.push(`${d.fase}: ${d.fb}`));
    if (!rec.length) rec.push('¡Excelente jornada de servicio público! Mantenga estas prácticas.');
    saveHistory('Jornada · ' + App.niv.nombre, 'Atención ciudadana en ventanilla', total);
    $('#report').innerHTML = scoreHead('Evaluación de la jornada de atención ciudadana', `GAD Municipal de San Isidro · Nivel ${App.niv.nombre} · ${App.cfg.name || 'Estudiante'}`, total) + `
      <div class="kpis">
        <div class="kpi"><b>${s.atendidos.length}/${total0}</b><span>Ciudadanos atendidos</span></div>
        <div class="kpi"><b>${s.atendidos.length ? Math.round(satProm()) + '%' : '—'}</b><span>Satisfacción promedio</span></div>
        <div class="kpi"><b>${s.atendidos.length ? Math.round(s.atendidos.reduce((a, x) => a + x.espera, 0) / s.atendidos.length) + ' min' : '—'}</b><span>Espera promedio</span></div>
        <div class="kpi"><b>${s.faltas}</b><span>Faltas éticas</span></div>
      </div>
      <div class="report-grid">
        <div class="card"><h2>Rúbrica</h2>${crit.map(c => `<div class="crit"><div class="crit-top"><span>${c.n}</span><span>${c.p}/${c.m}</span></div><div class="crit-bar"><i style="width:${c.p / c.m * 100}%"></i></div></div>`).join('')}</div>
        <div class="card"><h2>Recomendaciones</h2><ul class="rec">${rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        <div class="card" style="grid-column:1/-1"><h2>Tus decisiones</h2><ol>${s.decisiones.map(d => `<li><p><b>${d.p === 2 ? '✔' : d.p === 1 ? '◐' : '✘'} ${esc(d.fase)}:</b> ${esc(d.t)}</p><p class="small muted">${esc(d.fb)}</p></li>`).join('')}</ol></div>
        <details class="card" style="grid-column:1/-1"><summary><b>📜 Bitácora de la jornada (${s.log.length} registros)</b></summary><ol class="log" style="max-height:none">${s.log.map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('')}</ol></details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary adm-btn" id="rp-again">🔁 Repetir la jornada</button>
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

  /* ================== FINANZAS Y NORMATIVA ================== */
  function openQuiz(tipo) {
    const banco = tipo === 'fin' ? FIN_BANCO : NOR_BANCO;
    const nCalc = tipo === 'fin' ? 4 : 0;
    const calc = nCalc ? mezclar(banco.slice(-nCalc)).slice(0, 3) : [];
    const mcs = mezclar(nCalc ? banco.slice(0, -nCalc) : banco).slice(0, 10 - calc.length);
    const qs = mcs.concat(calc).map(f => f());
    const st = { i: 0, ok: 0, res: [] }, body = $(`#${tipo}-body`), titulo = tipo === 'fin' ? 'Finanzas, contabilidad y presupuesto' : 'Normativa, planificación y gestión pública';
    const render = () => {
      const q = qs[st.i];
      body.innerHTML = `<div class="card"><div class="lab-top"><span class="pill pill-soft">Pregunta ${st.i + 1}/${qs.length}</span><span class="small muted">${esc(subj(q.asig).n)}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.num !== undefined ? `<div class="lab-num"><input class="q-in" inputmode="decimal" placeholder="Tu respuesta"><button class="btn btn-primary adm-btn q-ok">Comprobar</button></div>` : `<div class="dialog-choices">${q.o.map((o, i) => `<button class="btn" data-o="${i}">${esc(o)}</button>`).join('')}</div>`}
        <div class="q-fb"></div></div>`;
      const answer = good => {
        if (good) st.ok++; st.res.push({ q: q.q, good, exp: q.exp });
        $('.q-fb', body).innerHTML = `<div class="case-fb" style="border-color:${good ? 'var(--ok)' : 'var(--bad)'}"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Incorrecto'}</b><br>${esc(q.exp)}</div>
          <button class="btn btn-primary adm-btn q-next">${st.i + 1 < qs.length ? 'Siguiente ▶' : 'Ver resultado'}</button>`;
        $('.q-next', body).onclick = () => { st.i++; if (st.i < qs.length) render(); else done(); };
      };
      if (q.num !== undefined) $('.q-ok', body).onclick = () => { const v = parseFloat($('.q-in', body).value.replace(/\$|\s/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.')); if (isNaN(v)) return toast('Escribe un número.'); $('.q-ok', body).disabled = true; answer(Math.abs(v - q.num) <= q.tol); };
      else $$('[data-o]', body).forEach(b => b.onclick = () => { $$('[data-o]', body).forEach(x => { x.disabled = true; if (+x.dataset.o === q.c) x.classList.add('good'); }); if (+b.dataset.o !== q.c) b.classList.add('bad'); answer(+b.dataset.o === q.c); });
    };
    const done = () => {
      const total = Math.round(st.ok / qs.length * 100);
      body.innerHTML = scoreHead(titulo, `${st.ok} de ${qs.length} respuestas correctas`, total) + `
        <div class="card"><h2>Repaso</h2><ol>${st.res.map(r => `<li><p><b>${r.good ? '✔' : '✘'}</b> ${esc(r.q)}</p><p class="small muted">${esc(r.exp)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary adm-btn q-again">🔁 Nueva sesión</button><button class="btn q-menu">🏠 Menú principal</button></div>`;
      $('.q-again', body).onclick = () => openQuiz(tipo); $('.q-menu', body).onclick = () => show('hub');
      saveHistory(tipo === 'fin' ? 'Finanzas' : 'Normativa', titulo, total);
    };
    render(); show(tipo);
  }

  /* ================== CASOS ================== */
  function openCases(cod) {
    const list = cod ? CASOS_ADM.filter(c => c.asignaturas.includes(cod)) : CASOS_ADM;
    $('#cases-list').innerHTML = (cod ? `<p class="muted">Casos relacionados con <b>${esc(subj(cod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASOS_ADM.find(c => c.id === b.dataset.case)));
    if (cod) $('#cases-all').onclick = () => openCases();
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
  }
  function sayLine(c, t) { return /^\(.*\)$/.test(t) ? `<div class="case-say"><i>${esc(t.slice(1, -1))}</i></div>` : `<div class="case-say"><b>${esc(c.persona.nombre)}:</b> “${esc(t)}”</div>`; }
  function playCase(c) {
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
          <button class="btn btn-primary adm-btn" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else end(); };
        speak(o.r, c.persona.pitch);
      });
      speak(paso.dice, c.persona.pitch);
    };
    const end = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary adm-btn" id="case-again">🔁 Repetir</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" id="case-menu">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c); $('#case-list').onclick = () => openCases(); $('#case-menu').onclick = () => show('hub');
      saveHistory('Casos', c.titulo, total); window.scrollTo(0, 0);
    };
    step(); window.scrollTo(0, 0);
  }

  /* ================== MAPA ================== */
  function openMapa() {
    $('#mapa-grid').innerHTML = [1, 2, 3, 4].map(pao => `<div class="mapa-col"><h3 class="adm-h3">PAO ${pao}</h3>${MALLA_ADM.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${m.mod.map(k => MODS[k].emoji).join(' ')} · ${m.cod}</small></button>`).join('')}</div>`).join('');
    $$('[data-cod]').forEach(b => b.onclick = () => {
      const m = subj(b.dataset.cod), casos = CASOS_ADM.filter(c => c.asignaturas.includes(m.cod));
      const ciud = CIUDADANOS.filter(c => c.asig.includes(m.cod)).concat(TAREAS.filter(t => t.asig.includes(m.cod)));
      $$('[data-cod]').forEach(x => x.classList.toggle('sel', x === b));
      $('#mapa-detail').innerHTML = `<h2>${esc(m.n)}</h2><p class="small muted">${m.cod} · PAO ${m.pao} · Relación ${m.rel}</p><p>${esc(m.sim)}</p>
        <div class="report-actions">${m.mod.map(k => `<button class="btn" data-mod="${k}">${MODS[k].emoji} ${MODS[k].nombre}</button>`).join('')}</div>
        ${ciud.length ? `<p class="small"><b>En la jornada:</b> ${ciud.map(c => esc(c.nombre || c.titulo)).join(' · ')}</p>` : ''}
        ${casos.length ? `<p class="small"><b>Casos:</b> ${casos.map(c => esc(c.titulo)).join(' · ')}</p>` : ''}`;
      $$('#mapa-detail [data-mod]').forEach(x => x.onclick = () => openModule(x.dataset.mod, casos.length ? m.cod : undefined));
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
  App.escena = () => { const s = App.st; return s ? { cola: s.cola.map(q => ({ avatar: q.c.avatar, prio: q.c.prio })), actual: s.actual ? s.actual.c.avatar : null, abierta: s.abierta && !s.fin, hora: hora(s.t) } : null; };
})();
