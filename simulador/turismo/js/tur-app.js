/* =========================================================
   Simulador de Operaciones Turísticas – Carrera de Gestión de
   Operaciones Turísticas. Controlador de la interfaz: tour de un
   día en la Amazonía (motor por fases), costos, patrimonio y
   normativa, casos, prácticas por asignatura y mapa curricular.
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
  const MALLA = (typeof MALLA_TUR !== 'undefined' && Array.isArray(MALLA_TUR)) ? MALLA_TUR : [];
  const subj = cod => MALLA.find(m => m.cod === cod) || { cod, n: cod, pao: 0, mod: [], rel: 'parcial', sim: '' };
  const hora = t => { const m = TOUR.inicio + Math.round(t); return String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
  const AVISO_ASIG = 'Las prácticas por asignatura se agregarán cuando se cargue la malla curricular de la carrera.';

  const App = { cfg: store.get('tur-cfg', { name: '', inst: '', voice: true }), niv: NIVELES[1], st: null, busy: false, listeners: [] };
  window.TurApp = App;

  /* ================== utilidades ================== */
  function show(s) { $$('.screen').forEach(x => x.hidden = x.id !== 'screen-' + s); window.scrollTo(0, 0); }
  let tt; function toast(m, ms = 2800) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, ms); }
  App.toast = toast;
  function applyTheme(th) { if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => { const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const n = cur === 'dark' ? 'light' : 'dark'; applyTheme(n); store.set('aula-theme', n); };
  const syncSound = () => { $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇'; };
  $('#btn-sound').onclick = () => { App.cfg.voice = !App.cfg.voice; store.set('tur-cfg', App.cfg); syncSound(); if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel(); };
  syncSound();
  $$('[data-go]').forEach(b => b.onclick = () => { window.Tur3D?.stopAll?.(); show(b.dataset.go); });

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
      <div class="score"><div class="score-ring tur-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }
  function saveHistory(modulo, titulo, total) {
    const h = store.get('tur-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, modulo, titulo, total });
    store.set('tur-history', h.slice(0, 50));
    window.ISTY?.registrar('resultado', { modulo, titulo, total });
  }

  /* ================== INICIO Y MENÚ ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst; $('#f-voice').checked = App.cfg.voice;
  const syncBrand = () => { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Gestión de Operaciones Turísticas'; };
  syncBrand();
  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, { name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(), voice: $('#f-voice').checked });
    store.set('tur-cfg', App.cfg); syncSound(); syncBrand();
    if (App.cfg.voice && 'speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); }
    $('#hub-name').textContent = App.cfg.name ? ', ' + App.cfg.name : '';
    show('hub');
    // enlace directo a un módulo desde el portal (?m=clave)
    const mParam = new URLSearchParams(location.search).get('m');
    const mBtn = mParam && document.querySelector(`[data-hub="${CSS.escape(mParam)}"]`);
    if (mBtn) { history.replaceState(null, '', location.pathname); mBtn.click(); }
    else if (mParam === 'mapa') { history.replaceState(null, '', location.pathname); openMapa(); }
  };
  $$('[data-hub]').forEach(b => b.onclick = () => openModule(b.dataset.hub));
  function openModule(k, cod) {
    if (k === 'tour') { renderSetup(); show('setup'); }
    if (k === 'cos') openQuiz('cos');
    if (k === 'pat') openQuiz('pat');
    if (k === 'casos') openCases(cod);
    if (k === 'asig') openAsig(cod);
    if (k === 'mapa') openMapa();
  }
  $('#btn-history').onclick = () => {
    const h = store.get('tur-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.titulo)}</b><br><span class="muted small">${esc(e.modulo)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no hay prácticas registradas.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('tur-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== PREPARAR TOUR ================== */
  const grupoDe = n => TURISTAS.slice(0, n);
  function renderSetup() {
    $('#niv-list').innerHTML = NIVELES.map(n => `<button class="choice" data-niv="${n.id}" aria-pressed="${App.niv.id === n.id}"><span class="em">${n.emoji}</span><span><b>${n.nombre}</b><small>${esc(n.desc)}</small><small>${n.n} turistas · precio ${usd(n.precio)} por persona</small></span></button>`).join('');
    $('#tur-preview').innerHTML = grupoDe(App.niv.n).map(c => `<div class="mini-student"><div class="av">${c.avatar}</div><b>${esc(c.nombre)}</b><div class="tag">${esc(c.origen)} · ${esc(c.perfil)}</div></div>`).join('');
    $$('[data-niv]').forEach(b => b.onclick = () => { App.niv = NIVELES.find(n => n.id === b.dataset.niv); renderSetup(); });
  }
  $('#btn-start').onclick = () => startTour();

  /* ================== MOTOR DEL TOUR (por fases) ================== */
  const sumV = a => a.reduce((x, y) => x + y.v, 0);
  function startTour() {
    const n = App.niv;
    const grupo = grupoDe(n.n).map(c => ({ ...c, herido: false }));
    App.st = {
      t: 0, plan: 0, sat: 70, seg: 55, amb: 70, com: 50,
      ingreso: n.n * n.precio, gasto: sumV(TOUR.costosFijos) + n.n * sumV(TOUR.costoPax),
      flags: new Set(), usos: {}, registro: 0, lesiones: 0, lluvia: false,
      paso: -1, puntos: 0, max: 0, decisiones: [], eventosUsados: new Set(), log: [], fin: false, grupo
    };
    $('#tour-niv').textContent = 'Nivel ' + n.nombre;
    show('tour'); renderAll();
    setDialog(`<span class="who">📋 Encargo:</span> Eres guía y operador de <b>${esc(TOUR.operadora)}</b> (ficticia). Conducirás el tour <b>${esc(TOUR.ruta)}</b> con <b>${n.n} turistas</b> (precio ${usd(n.precio)} por persona). En el grupo están <b>Don Hernán</b>, con movilidad reducida, y <b>Ana Lucía</b>, con alergia al maní y frutos secos.`,
      [{ label: '🛶 Empezar la preparación', cls: 'good', fn: () => { App.st.paso = 0; log('Inicio de la operación del tour.'); showStep(); } }]);
    speak('Bienvenido, guía. Mañana sale el tour amazónico y el grupo confía en ti.', 1.0);
  }
  function log(txt, tipo = 'docente') { App.st.log.push({ t: App.st.t, txt, tipo }); }
  const margen = () => { const s = App.st; return s.ingreso ? (s.ingreso - s.gasto) / s.ingreso * 100 : 0; };
  const retraso = () => Math.max(0, App.st.t - App.st.plan);
  const itin = () => clamp(100 - retraso() * 1.2);
  const etapa = () => { const s = App.st; return s ? (s.fin ? FASES.length : Math.max(0, s.paso)) : 0; };

  function lesionar(tipo) {
    const s = App.st;
    let w = tipo === 'alergia' ? s.grupo.find(c => c.alergia && !c.herido) : s.grupo.find(c => c.id === 'diego' && !c.herido);
    if (!w) w = s.grupo.find(c => !c.herido && !c.mov);
    if (!w) return;
    w.herido = true; s.lesiones++; s.sat = clamp(s.sat - 10); s.t += 30;
    s.gasto += s.flags.has('seguro') ? 40 : 160;
    const txt = tipo === 'alergia' ? `${w.nombre} sufrió una reacción alérgica y tuvo que ser trasladada a un centro de salud.` : `${w.nombre} se lesionó ${tipo === 'crecida' ? 'al cruzar el río crecido' : 'durante la actividad'}.`;
    log(txt + (s.flags.has('seguro') ? ' El seguro cubrió la atención.' : ' Sin seguro, la operadora asumió todos los gastos.'), 'alerta');
    toast(`🚑 ${w.nombre}: ${tipo === 'alergia' ? 'reacción alérgica' : 'accidente'}.`);
  }
  function applyEffects(ef = {}) {
    const s = App.st;
    ['sat', 'seg', 'amb', 'com'].forEach(k => { if (ef[k]) s[k] = clamp(s[k] + ef[k]); });
    if (ef.costo) s.gasto += ef.costo;
    if (ef.costoPax) s.gasto += ef.costoPax * s.grupo.length;
    if (ef.min) s.t += ef.min;
    (ef.flag || []).forEach(f => s.flags.add(f));
    if (ef.lluvia) s.lluvia = true;
    if (ef.herido) { const d = s.grupo.find(c => c.id === 'diego') || s.grupo.find(c => !c.mov); if (d) d.herido = true; if (!s.flags.has('seguro')) { s.gasto += 80; log('Sin seguro de accidentes, la operadora pagó la atención médica.', 'alerta'); } }
    if (ef.lesion ? (s.seg < 50 || Math.random() < 0.5) : (s.seg < 25 && Math.random() < 0.25)) lesionar(ef.lesion || 'riesgo');
  }

  /* ---------- render ---------- */
  const gc = (v, inv) => { const x = inv ? 100 - v : v; return x > 66 ? 'var(--bad)' : x > 33 ? 'var(--warn)' : 'var(--ok)'; };
  function renderAll() {
    const s = App.st; if (!s) return;
    $('#tour-clock').textContent = hora(s.t);
    $('#tour-fase').textContent = s.paso < 0 ? 'Encargo del tour' : s.fin ? 'Tour finalizado' : `Fase ${Math.min(s.paso + 1, FASES.length)}/${FASES.length} · ${FASES[Math.min(s.paso, FASES.length - 1)].fase}`;
    const mg = margen(), util = s.ingreso - s.gasto, it = itin();
    const g = [
      { n: '😊 Satisfacción del grupo', v: s.sat, c: gc(s.sat, true), l: Math.round(s.sat) + '%' },
      { n: '🦺 Seguridad', v: s.seg, c: gc(s.seg, true), l: Math.round(s.seg) + '%' + (s.lesiones ? ` · ${s.lesiones} incidente(s)` : '') },
      { n: '🌿 Sostenibilidad ambiental', v: s.amb, c: gc(s.amb, true), l: Math.round(s.amb) + '%' },
      { n: '🤝 Beneficio para la comunidad', v: s.com, c: gc(s.com, true), l: Math.round(s.com) + '%' },
      { n: '💵 Rentabilidad', v: clamp(40 + mg * 2), c: mg < 0 ? 'var(--bad)' : mg < 12 ? 'var(--warn)' : 'var(--ok)', l: `${util < 0 ? '−' : ''}${usd(Math.abs(util))} · ${Math.round(mg)} %` },
      { n: '🕗 Cumplimiento del itinerario', v: it, c: gc(it, true), l: retraso() ? `${Math.round(retraso())} min de retraso` : 'A tiempo' }
    ];
    $('#gauges').innerHTML = g.map(x => `<div class="gauge"><div class="gauge-top"><span>${x.n}</span><b>${x.l}</b></div><div class="gauge-bar"><i style="width:${clamp(x.v)}%;background:${x.c}"></i></div></div>`).join('');
    $('#grupo').innerHTML = s.grupo.map(c => `<div class="unit ${c.mov || c.alergia ? 'prio' : ''} ${c.herido ? 'off' : ''}"><span class="u-av">${c.herido ? '🤕' : c.avatar}</span><div><b>${esc(c.nombre)}</b><small>${esc(c.origen)} · ${esc(c.perfil)}${c.herido ? ' · 🚑 Atendido' : ''}</small></div></div>`).join('');
    $('#log').innerHTML = s.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('');
    $$('[data-fa]').forEach(b => b.disabled = App.busy || s.paso < 0 || s.fin);
    drawScene(); notify();
  }

  /* escena 2D: sendero amazónico con río, comunidad, cascada y el grupo */
  const POS = [70, 70, 150, 225, 335, 335, 470, 470, 90];
  function drawScene() {
    const s = App.st, k = etapa(), svg = $('#scene'), rio = s.lluvia ? 262 : 280;
    let h = `<defs><linearGradient id="tsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.lluvia ? '#94a3b8' : '#bae6fd'}"/><stop offset="1" stop-color="${s.lluvia ? '#cbd5e1' : '#ecfccb'}"/></linearGradient></defs>
      <rect width="600" height="330" fill="url(#tsky)"/>
      <path d="M0 150 Q120 95 240 140 T480 120 T600 135 V330 H0Z" fill="#4d7c0f"/>
      <path d="M0 190 Q150 150 300 185 T600 175 V330 H0Z" fill="#65a30d"/>
      <rect x="500" y="70" width="80" height="160" fill="#57534e"/><rect x="525" y="78" width="26" height="${rio - 78}" fill="#e0f2fe" opacity=".9"/>
      <line x1="530" y1="80" x2="530" y2="${rio}" stroke="#fff" stroke-width="2"/><line x1="545" y1="80" x2="545" y2="${rio}" stroke="#fff" stroke-width="2"/>
      <path d="M0 ${rio} Q150 ${rio - 10} 300 ${rio} T600 ${rio} V330 H0Z" fill="${s.lluvia ? '#a16207' : '#0284c7'}" opacity=".85"/>
      <path d="M20 ${rio + 18} q15 -6 30 0 M200 ${rio + 26} q15 -6 30 0 M420 ${rio + 16} q15 -6 30 0" stroke="#e0f2fe" stroke-width="2" fill="none"/>
      <path d="M20 238 C120 228 200 250 300 236 S470 228 560 238" stroke="#a16207" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/>
      <rect x="18" y="150" width="96" height="34" rx="6" fill="#fff" stroke="#334155"/><text x="66" y="166" font-size="11" font-weight="800" text-anchor="middle" fill="#1B4D22">PUYO</text><text x="66" y="179" font-size="9" text-anchor="middle" fill="#334155">Punto de encuentro</text><rect x="63" y="184" width="5" height="40" fill="#334155"/>
      <polygon points="292,170 335,140 378,170" fill="#a16207" stroke="#78350f"/><rect x="300" y="170" width="70" height="44" fill="#d6a76a" stroke="#78350f"/><rect x="327" y="188" width="16" height="26" fill="#78350f"/>
      <text x="335" y="132" font-size="10" font-weight="800" text-anchor="middle" fill="#1f2937">Comunidad kichwa</text>
      <text x="240" y="110" font-size="10" font-weight="800" text-anchor="middle" fill="#1f2937">Paseo de los Monos · Omaere</text>
      <text x="540" y="62" font-size="10" font-weight="800" text-anchor="middle" fill="#1f2937">Cascada</text>
      <text x="180" y="200" font-size="30">🌴</text><text x="400" y="205" font-size="34">🌳</text><text x="455" y="190" font-size="26">🌴</text><text x="250" y="215" font-size="24">🌿</text>
      <text x="205" y="150" font-size="22">🐒</text><text x="262" y="132" font-size="18">🦜</text>
      <circle cx="560" cy="34" r="22" fill="#fff" stroke="#334155" stroke-width="2"/><text x="560" y="39" font-size="12" font-weight="800" text-anchor="middle" fill="#334155">${hora(s.t)}</text>`;
    if (s.lluvia) { h += `<text x="80" y="60" font-size="34">🌧️</text><text x="360" y="55" font-size="30">🌧️</text>`; for (let i = 0; i < 24; i++) { const x = (i * 53) % 600, y = 20 + (i * 37) % 200; h += `<line x1="${x}" y1="${y}" x2="${x - 5}" y2="${y + 14}" stroke="#475569" stroke-width="1.2" opacity=".6"/>`; } }
    if (k <= 2 || k >= 8) h += `<text x="${k >= 8 ? 110 : POS[k] + 30}" y="232" font-size="34">🚐</text>`;
    if (k === 5) h += `<text x="380" y="210" font-size="22">🍲</text>`;
    if (k === 6) h += `<text x="430" y="${rio + 14}" font-size="22">🛟</text>`;
    const x0 = POS[Math.min(k, POS.length - 1)];
    h += `<text x="${x0 - 30}" y="230" font-size="28">🧑🏽‍🦱</text><text x="${x0 - 14}" y="200" font-size="14">🚩</text>`;
    s.grupo.forEach((c, i) => { const col = i % 5, row = Math.floor(i / 5); h += `<text x="${x0 + col * 20}" y="${226 + row * 22}" font-size="20" opacity="${c.herido ? .7 : 1}">${c.herido ? '🤕' : c.avatar}</text>`; });
    if (s.fin) h += `<rect x="190" y="12" width="220" height="30" rx="8" fill="#1B4D22"/><text x="300" y="32" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">TOUR FINALIZADO</text>`;
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

  function showStep() {
    const s = App.st, p = FASES[s.paso];
    if (!p) return finish();
    setDialog(`<span class="pill pill-soft">${esc(p.fase)}</span> <span class="small muted">${esc(p.lugar)}</span><p><b>${esc(p.q)}</b></p>`, mezclar(p.o).map(o => ({ label: esc(o.t), fn: () => choose(p, o, false) })));
    renderAll();
  }

  const COND = {
    fichas: 'No recogiste fichas de salud en la preparación: te enteras de la alergia a última hora. Lograste ajustar el plato, pero con un riesgo innecesario.',
    seguro: 'El equipo y el personal son adecuados, pero operas la aventura sin seguro de accidentes contratado: un accidente no tendría cobertura.'
  };
  function choose(p, o, esEvento) {
    return busy(async () => {
      const s = App.st;
      let pts = o.p, fb = o.fb, ef = Object.assign({}, o.ef || {});
      if (ef.cond && !s.flags.has(ef.cond)) { pts = 1; fb = COND[ef.cond] || fb; ef = { sat: Math.round((ef.sat || 0) / 2), seg: Math.round((ef.seg || 0) / 3), costo: ef.costo }; }
      s.puntos += pts; s.max += 2;
      s.decisiones.push({ fase: esEvento ? 'Imprevisto' : p.fase, t: o.t, p: pts, fb });
      if (!esEvento) { s.plan += p.min; s.t += p.min + (ef.dmin || 0); s.paso++; }
      log((esEvento ? 'Imprevisto: ' : '') + o.t, pts === 0 ? 'alerta' : 'docente');
      applyEffects(ef);
      renderAll();
      const color = pts === 2 ? 'var(--ok)' : pts === 1 ? 'var(--warn)' : 'var(--bad)';
      setDialog(`<p><b>Tu decisión:</b> ${esc(o.t)}</p><div class="case-fb" style="border-color:${color}"><b style="color:${color}">${pts === 2 ? 'Decisión adecuada' : pts === 1 ? 'Decisión parcialmente adecuada' : 'Decisión inadecuada'}</b><br>${esc(fb)}</div>`);
      const voz = s.grupo.find(c => !c.herido && c.id !== 'hernan') || s.grupo[0];
      await speak(pts === 0 ? (Math.random() < 0.5 ? 'Mmm… ¿es seguro hacer eso, guía?' : 'No me parece bien…') : pts === 2 ? '¡Excelente, guía!' : 'Bueno, está bien.', voz.pitch);
      const ev = esEvento ? null : maybeEvent();
      setDialog($('#dialog-text').innerHTML, [{ label: ev ? '⚠️ Atender el imprevisto' : (s.paso < FASES.length ? 'Continuar ▶' : 'Cerrar el tour'), cls: 'good', fn: () => {
        if (ev) return showEvent(ev);
        if (s.paso >= FASES.length) return finish();
        showStep();
      } }]);
    });
  }

  function maybeEvent() {
    const s = App.st;
    if (Math.random() > App.niv.ev) return null;
    const pool = EVENTOS.filter(e => !s.eventosUsados.has(e.id) && s.paso >= e.desde && s.paso <= e.hasta && !(e.id === 'lesion' && !s.grupo.some(c => c.id === 'diego' && !c.herido)));
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }
  async function showEvent(ev) {
    const s = App.st; s.eventosUsados.add(ev.id);
    const quien = s.grupo.find(c => c.id === ev.quien);
    log('Imprevisto: ' + ev.txt, 'evento');
    setDialog(`<span class="pill tur-pill">⚠️ Imprevisto</span>${quien ? `<p class="small muted">${quien.avatar} ${esc(quien.nombre)}</p>` : ''}<p><b>${esc(ev.txt)}</b></p><p class="small muted">¿Qué haces?</p>`);
    App.busy = true; renderAll();
    await speak(ev.voz, quien ? quien.pitch : 1);
    App.busy = false;
    setDialog($('#dialog-text').innerHTML, mezclar(ev.o).map(o => ({ label: esc(o.t), fn: () => choose(ev, o, true) })));
    renderAll();
  }

  /* ---------- acciones generales ---------- */
  function usar(k, max) { const s = App.st; s.usos[k] = (s.usos[k] || 0) + 1; return s.usos[k] <= max; }
  const FREE = {
    botiquin: () => { const s = App.st; const ok = usar('botiquin', 3); s.t += 5; if (ok) s.seg = clamp(s.seg + 6); log('Revisó el botiquín y la radio, y contó a los integrantes del grupo.'); return { voz: '¡Todos presentes!' }; },
    hidratar: () => { const s = App.st; const ok = usar('hidratar', 3); s.t += 10; if (ok) s.sat = clamp(s.sat + (s.grupo.some(c => c.mov) ? 7 : 5)); log('Hizo una pausa de hidratación y descanso, cuidando el ritmo de Don Hernán.'); return { voz: 'Gracias, nos hacía falta.' }; },
    ingles: () => { const s = App.st; if (!s.grupo.some(c => c.en)) { toast('No hay turistas extranjeros en el grupo.'); return null; } const ok = usar('ingles', 3); s.t += 3; if (ok) s.sat = clamp(s.sat + 6); log('Interpretó en inglés la información para los turistas extranjeros.'); return { voz: 'Thank you, now I understand!' }; },
    residuos: () => { const s = App.st; const ok = usar('residuos', 3); s.t += 5; if (ok) s.amb = clamp(s.amb + 8); log('Recogió los residuos con el grupo y los guardó para su disposición adecuada.'); return { voz: '' }; },
    base: () => { const s = App.st; const ok = usar('base', 3); s.t += 2; s.registro++; if (ok) s.seg = clamp(s.seg + 3); log('Reportó por radio la ubicación del grupo y las novedades a la operadora.'); return { voz: '' }; },
    bitacora: () => { const s = App.st; s.t += 1; s.registro++; log('Registró horarios, novedades y observaciones en la hoja de ruta.'); return { voz: '' }; }
  };
  $$('[data-fa]').forEach(b => b.onclick = () => busy(async () => {
    const r = FREE[b.dataset.fa](); if (!r) return; renderAll();
    if (r.voz) await speak(r.voz, 1.1);
  }));

  /* ---------- evaluación ---------- */
  function finish() {
    window.Tur3D?.stopAll?.();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const s = App.st; s.fin = true;
    const mg = margen(), util = s.ingreso - s.gasto;
    const dec = s.max ? s.puntos / s.max * 20 : 0;
    const seg = clamp(s.seg / 100 * 20 - s.lesiones * 6, 0, 20);
    const sat = s.sat / 100 * 13 + (s.flags.has('encuesta') ? 2 : 0);
    const amb = s.amb / 100 * 10;
    const com = s.com / 100 * 15;
    const ren = mg >= 20 ? 10 : mg <= -10 ? 0 : (mg + 10) / 30 * 10;
    const iti = itin() / 100 * 7 + Math.min(3, s.registro);
    const crit = [
      { n: 'Decisiones técnicas de la operación', p: Math.round(dec), m: 20 },
      { n: 'Seguridad del grupo', p: Math.round(seg), m: 20 },
      { n: 'Satisfacción y servicio al cliente', p: Math.round(sat), m: 15 },
      { n: 'Beneficio comunitario y respeto intercultural', p: Math.round(com), m: 15 },
      { n: 'Sostenibilidad ambiental', p: Math.round(amb), m: 10 },
      { n: 'Rentabilidad y control de costos', p: Math.round(ren), m: 10 },
      { n: 'Cumplimiento del itinerario y registro', p: Math.round(iti), m: 10 }
    ];
    const total = clamp(crit.reduce((a, c) => a + c.p, 0));
    const rec = [];
    if (!s.flags.has('seguro')) rec.push('Contrate siempre el seguro de accidentes y verifique permisos y registro antes de operar.');
    if (!s.flags.has('briefing')) rec.push('Dé un briefing de seguridad y de normas comunitarias al inicio, en español y en inglés.');
    if (s.lesiones) rec.push(`Hubo ${s.lesiones} incidente(s) de salud o seguridad. Refuerce la prevención: equipo de protección, verificación del río y gestión de alergias.`);
    if (s.com < 55) rec.push('Fortalezca el beneficio comunitario: pago justo acordado, consentimiento para fotografiar y respeto a los protocolos.');
    if (s.amb < 60) rec.push('Aplique buenas prácticas ambientales: no alimentar fauna, mantenerse en el sendero y no dejar rastro.');
    if (mg < 10) rec.push(`La rentabilidad fue baja (${Math.round(mg)} %). Controle los costos fijos y variables y revise el punto de equilibrio del tour.`);
    if (retraso() > 20) rec.push(`El tour terminó con ${Math.round(retraso())} min de retraso. Planifique márgenes y comunique los cambios de itinerario.`);
    if (s.registro < 2) rec.push('Reporte a la operadora y registre las novedades en la hoja de ruta: es respaldo de la operación.');
    if (!s.flags.has('encuesta')) rec.push('Aplique una encuesta de satisfacción al cierre para mejorar el producto.');
    s.decisiones.filter(d => d.p === 0).slice(0, 3).forEach(d => rec.push(`${d.fase}: ${d.fb}`));
    if (!rec.length) rec.push('¡Excelente operación turística! Mantenga estas prácticas.');
    saveHistory('Tour · ' + App.niv.nombre, 'Operar un tour en la Amazonía', total);
    $('#report').innerHTML = scoreHead('Evaluación de la operación del tour', `${TOUR.nombre} · Nivel ${App.niv.nombre} · ${App.cfg.name || 'Estudiante'}`, total) + `
      <div class="kpis">
        <div class="kpi"><b>${Math.round(s.sat)}%</b><span>Satisfacción del grupo</span></div>
        <div class="kpi"><b>${util < 0 ? '−' : ''}${usd(Math.abs(util))}</b><span>Utilidad (${Math.round(mg)} % de ${usd(s.ingreso)})</span></div>
        <div class="kpi"><b>${hora(s.t)}</b><span>Hora de cierre (${retraso() ? Math.round(retraso()) + ' min de retraso' : 'a tiempo'})</span></div>
        <div class="kpi"><b>${s.lesiones}</b><span>Incidentes de seguridad</span></div>
      </div>
      <div class="report-grid">
        <div class="card"><h2>Rúbrica</h2>${crit.map(c => `<div class="crit"><div class="crit-top"><span>${c.n}</span><span>${c.p}/${c.m}</span></div><div class="crit-bar"><i style="width:${c.p / c.m * 100}%"></i></div></div>`).join('')}</div>
        <div class="card"><h2>Recomendaciones</h2><ul class="rec">${rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        <div class="card" style="grid-column:1/-1"><h2>Tus decisiones</h2><ol>${s.decisiones.map(d => `<li><p><b>${d.p === 2 ? '✔' : d.p === 1 ? '◐' : '✘'} ${esc(d.fase)}:</b> ${esc(d.t)}</p><p class="small muted">${esc(d.fb)}</p></li>`).join('')}</ol></div>
        <details class="card" style="grid-column:1/-1"><summary><b>📒 Hoja de ruta (${s.log.length} registros)</b></summary><ol class="log" style="max-height:none">${s.log.map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('')}</ol></details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary tur-btn" id="rp-again">🔁 Repetir el tour</button>
        <button class="btn" id="rp-new">🎚️ Cambiar nivel</button>
        <button class="btn" id="rp-print">🖨️ Imprimir / guardar PDF</button>
        <button class="btn" id="rp-menu">🏠 Menú principal</button>
      </div>`;
    $('#rp-again').onclick = startTour;
    $('#rp-new').onclick = () => { renderSetup(); show('setup'); };
    $('#rp-print').onclick = () => window.print();
    $('#rp-menu').onclick = () => show('hub');
    show('report');
  }
  $('#btn-end').onclick = () => { if (App.busy) return; if (confirm('¿Deseas terminar el tour y ver tu evaluación?')) finish(); };

  /* ================== COSTOS Y PATRIMONIO ================== */
  function openQuiz(tipo) {
    const banco = tipo === 'cos' ? COS_BANCO : PAT_BANCO;
    const nCalc = tipo === 'cos' ? 6 : 0;
    const calc = nCalc ? mezclar(banco.slice(-nCalc)).slice(0, 4) : [];
    const mcs = mezclar(nCalc ? banco.slice(0, -nCalc) : banco).slice(0, 10 - calc.length);
    const qs = mcs.concat(calc).map(f => f());
    const st = { i: 0, ok: 0, res: [] }, body = $(`#${tipo}-body`), titulo = tipo === 'cos' ? 'Costos y operación turística' : 'Patrimonio, sostenibilidad y normativa';
    const render = () => {
      const q = qs[st.i];
      body.innerHTML = `<div class="card"><div class="lab-top"><span class="pill pill-soft">Pregunta ${st.i + 1}/${qs.length}</span><span class="small muted">${esc(subj(q.asig).n)}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.num !== undefined ? `<div class="lab-num"><input class="q-in" inputmode="decimal" placeholder="Tu respuesta"><button class="btn btn-primary tur-btn q-ok">Comprobar</button></div>` : `<div class="dialog-choices">${q.o.map((o, i) => `<button class="btn" data-o="${i}">${esc(o)}</button>`).join('')}</div>`}
        <div class="q-fb"></div></div>`;
      const answer = good => {
        if (good) st.ok++; st.res.push({ q: q.q, good, exp: q.exp });
        $('.q-fb', body).innerHTML = `<div class="case-fb" style="border-color:${good ? 'var(--ok)' : 'var(--bad)'}"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Incorrecto'}</b><br>${esc(q.exp)}</div>
          <button class="btn btn-primary tur-btn q-next">${st.i + 1 < qs.length ? 'Siguiente ▶' : 'Ver resultado'}</button>`;
        $('.q-next', body).onclick = () => { st.i++; if (st.i < qs.length) render(); else done(); };
      };
      if (q.num !== undefined) $('.q-ok', body).onclick = () => { const v = parseFloat($('.q-in', body).value.replace(/[−–]/g, '-').replace(/\$|\s|%/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.')); if (isNaN(v)) return toast('Escribe un número.'); $('.q-ok', body).disabled = true; answer(Math.abs(v - q.num) <= q.tol); };
      else $$('[data-o]', body).forEach(b => b.onclick = () => { $$('[data-o]', body).forEach(x => { x.disabled = true; if (+x.dataset.o === q.c) x.classList.add('good'); }); if (+b.dataset.o !== q.c) b.classList.add('bad'); answer(+b.dataset.o === q.c); });
    };
    const done = () => {
      const total = Math.round(st.ok / qs.length * 100);
      body.innerHTML = scoreHead(titulo, `${st.ok} de ${qs.length} respuestas correctas`, total) + `
        <div class="card"><h2>Repaso</h2><ol>${st.res.map(r => `<li><p><b>${r.good ? '✔' : '✘'}</b> ${esc(r.q)}</p><p class="small muted">${esc(r.exp)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary tur-btn q-again">🔁 Nueva sesión</button><button class="btn q-menu">🏠 Menú principal</button></div>`;
      $('.q-again', body).onclick = () => openQuiz(tipo); $('.q-menu', body).onclick = () => show('hub');
      saveHistory(tipo === 'cos' ? 'Costos' : 'Patrimonio y normativa', titulo, total);
    };
    render(); show(tipo);
  }

  /* ================== CASOS ================== */

  /* ================== PRÁCTICAS POR ASIGNATURA ================== */
  function openAsig(cod) {
    const lista = window.CASOS_ASIG || [];
    $('#screen-cases h1').textContent = 'Prácticas por asignatura';
    const paos = [...new Set(MALLA.map(m => m.pao))].sort((a, b) => a - b);
    const html = paos.map(pao => {
      const ms = MALLA.filter(m => m.pao === pao && lista.some(x => x.cod === m.cod));
      return ms.length ? `<h3 class="asig-pao">PAO ${pao}</h3><div class="topic-list">${ms.map(m => { const c = lista.find(x => x.cod === m.cod); return `<button class="choice" data-asig="${m.cod}"><span class="em">${c.persona.avatar}</span><span><b>${esc(m.n)}</b><small>${esc(c.titulo)}</small><small class="tags">${esc(c.objetivo || c.persona.rol)}</small><small class="muted">PAO ${m.pao} · también en: ${(m.mod || []).filter(k => MODS[k]).map(k => MODS[k].emoji + ' ' + MODS[k].nombre).join(' · ')}</small></span></button>`; }).join('')}</div>` : '';
    }).join('');
    $('#cases-list').innerHTML = html
      ? '<p class="muted">Una situación simulada para cada asignatura de la malla: actúa en la escena y responde con tu voz o por escrito.</p>' + html
      : `<div class="card tur-aviso"><p>🌱 ${esc(AVISO_ASIG)}</p><p class="small muted">Mientras tanto, practica con el tour amazónico, los cuestionarios y los casos profesionales.</p><div class="report-actions"><button class="btn btn-primary tur-btn" id="asig-back">🏠 Menú principal</button></div></div>`;
    $$('[data-asig]').forEach(b => b.onclick = () => playCase(lista.find(x => x.cod === b.dataset.asig)));
    $('#asig-back')?.addEventListener('click', () => show('hub'));
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
    const b = cod && document.querySelector(`[data-asig="${CSS.escape(cod)}"]`); if (b) b.click();
  }

  function openCases(cod) {
    $('#screen-cases h1').textContent = 'Casos profesionales';
    const list = cod ? CASOS_TUR.filter(c => c.asignaturas.includes(cod)) : CASOS_TUR;
    $('#cases-list').innerHTML = (cod ? `<p class="muted">Casos relacionados con <b>${esc(subj(cod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASOS_TUR.find(c => c.id === b.dataset.case)));
    if (cod) $('#cases-all').onclick = () => openCases();
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
  }
  function sayLine(c, t) { return /^\(.*\)$/.test(t) ? `<div class="case-say"><i>${esc(t.slice(1, -1))}</i></div>` : `<div class="case-say"><b>${esc(c.persona.nombre)}:</b> “${esc(t)}”</div>`; }
  function playCase(c) {
    // situación simulada: actuar en la escena y responder hablando o escribiendo
    if (window.CasoVivo) {
      $('#cases-list').hidden = true; $('#case-player').hidden = false;
      const ok = CasoVivo.play(c, { P: $('#case-player'), btn: 'btn-primary tur-btn', speak: speak, toast: toast, scoreHead,
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
          <button class="btn btn-primary tur-btn" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else end(); };
        speak(o.r, c.persona.pitch);
      });
      speak(paso.dice, c.persona.pitch);
    };
    const end = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary tur-btn" id="case-again">🔁 Repetir</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" id="case-menu">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c); $('#case-list').onclick = () => c.cod ? openAsig() : openCases(); $('#case-menu').onclick = () => show('hub');
      saveHistory(c.cod ? 'Asignatura' : 'Casos', c.titulo, total); window.scrollTo(0, 0);
    };
    step(); window.scrollTo(0, 0);
  }

  /* ================== MAPA ================== */
  function openMapa() {
    const paos = [...new Set(MALLA.map(m => m.pao))].sort((a, b) => a - b);
    $('#mapa-grid').innerHTML = paos.length ? paos.map(pao => `<div class="mapa-col"><h3 class="tur-h3">PAO ${pao}</h3>${MALLA.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${(m.mod || []).filter(k => MODS[k]).map(k => MODS[k].emoji).join(' ')} · ${m.cod}</small></button>`).join('')}</div>`).join('')
      : `<p class="muted">${esc(AVISO_ASIG)}</p>`;
    $$('[data-cod]').forEach(b => b.onclick = () => {
      const m = subj(b.dataset.cod), casos = CASOS_TUR.filter(c => c.asignaturas.includes(m.cod));
      const fases = FASES.filter(f => (f.asig || []).includes(m.cod));
      $$('[data-cod]').forEach(x => x.classList.toggle('sel', x === b));
      $('#mapa-detail').innerHTML = `<h2>${esc(m.n)}</h2><p class="small muted">${m.cod} · PAO ${m.pao} · Relación ${m.rel}</p><p>${esc(m.sim)}</p>
        <div class="report-actions">${(m.mod || []).filter(k => MODS[k]).map(k => `<button class="btn" data-mod="${k}">${MODS[k].emoji} ${MODS[k].nombre}</button>`).join('')}${(window.CASOS_ASIG || []).some(x => x.cod === m.cod) ? '<button class="btn" data-mod="asig">🎯 Práctica de la asignatura</button>' : ''}</div>
        ${fases.length ? `<p class="small"><b>En el tour:</b> ${fases.map(f => esc(f.fase)).join(' · ')}</p>` : ''}
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
    buttons: $$('#dialog-choices .btn').concat(App.st && App.st.paso >= 0 && !App.st.fin ? $$('[data-fa]') : []).map(b => ({ label: b.textContent.trim(), disabled: b.disabled, el: b })),
    busy: App.busy
  });
  App.etapa = etapa;
  App.escena = () => { const s = App.st; return s ? { etapa: etapa(), total: FASES.length, lluvia: s.lluvia, hora: hora(s.t), fase: s.paso < 0 ? 'Encargo' : s.fin ? 'Tour finalizado' : FASES[Math.min(s.paso, FASES.length - 1)].fase, grupo: s.grupo.map(c => ({ avatar: c.herido ? '🤕' : c.avatar })), fin: s.fin } : null; };
})();
