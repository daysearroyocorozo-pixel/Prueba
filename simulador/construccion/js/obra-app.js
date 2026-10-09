/* =========================================================
   Simulador de Obra – Carrera de Construcción.
   Controlador de la interfaz: dirección de obra, laboratorio,
   oficina técnica, casos y mapa curricular.
   ========================================================= */
(function () {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const usd = n => '$' + Math.round(n).toLocaleString('es-EC');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };
  const subj = cod => MALLA_CONS.find(m => m.cod === cod);

  const App = { cfg: store.get('obra-cfg', { name: '', inst: '', voice: true }), niv: NIVELES[1], st: null, busy: false, listeners: [] };
  window.ObraApp = App;

  /* ================== utilidades ================== */
  function show(s) { $$('.screen').forEach(x => x.hidden = x.id !== 'screen-' + s); window.scrollTo(0, 0); }
  let tt; function toast(m, ms = 2800) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, ms); }
  App.toast = toast;
  function applyTheme(th) { if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => { const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const n = cur === 'dark' ? 'light' : 'dark'; applyTheme(n); store.set('aula-theme', n); };
  const syncSound = () => { $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇'; };
  $('#btn-sound').onclick = () => { App.cfg.voice = !App.cfg.voice; store.set('obra-cfg', App.cfg); syncSound(); if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel(); };
  syncSound();
  $$('[data-go]').forEach(b => b.onclick = () => { window.Obra3D?.stopAll?.(); show(b.dataset.go); });

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
      <div class="score"><div class="score-ring obra-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }
  function saveHistory(modulo, titulo, total) {
    const h = store.get('obra-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, modulo, titulo, total });
    store.set('obra-history', h.slice(0, 50));
    window.ISTY?.registrar('resultado', { modulo, titulo, total });
  }

  /* ================== INICIO Y MENÚ ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst; $('#f-voice').checked = App.cfg.voice;
  const syncBrand = () => { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Carrera de Construcción'; };
  syncBrand();
  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, { name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(), voice: $('#f-voice').checked });
    store.set('obra-cfg', App.cfg); syncSound(); syncBrand();
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
    if (k === 'obra') { renderSetup(); show('setup'); }
    if (k === 'lab') openQuiz('lab');
    if (k === 'ofi') openQuiz('ofi');
    if (k === 'casos') openCases(cod);
    if (k === 'asig') openAsig(cod);
    if (k === 'mapa') openMapa();
  }
  $('#btn-history').onclick = () => {
    const h = store.get('obra-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.titulo)}</b><br><span class="muted small">${esc(e.modulo)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no hay prácticas registradas.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('obra-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== PREPARAR OBRA ================== */
  function renderSetup() {
    $('#niv-list').innerHTML = NIVELES.map(n => `<button class="choice" data-niv="${n.id}" aria-pressed="${App.niv.id === n.id}"><span class="em">${n.emoji}</span><span><b>${n.nombre}</b><small>${esc(n.desc)}</small><small>Presupuesto ${usd(n.presupuesto)} · Plazo ${n.plazo} días</small></span></button>`).join('');
    $('#crew-preview').innerHTML = CREW.map(c => `<div class="mini-student"><div class="av">${c.avatar}</div><b>${esc(c.nombre)}</b><div class="tag">${esc(c.rol)}</div></div>`).join('');
    $$('[data-niv]').forEach(b => b.onclick = () => { App.niv = NIVELES.find(n => n.id === b.dataset.niv); renderSetup(); });
  }
  $('#btn-start').onclick = () => startObra();

  /* ================== MOTOR DE LA OBRA ================== */
  function startObra() {
    const n = App.niv;
    App.st = {
      dia: 0, gastado: 0, presupuesto: n.presupuesto, plazo: n.plazo, calidad: 60, riesgo: 15, ambiente: 75,
      permiso: 0, ensayos: 0, epp: 0, registro: 0, charlas: 0, com: 0, accidentes: 0, acelerar: false, lluvia: false,
      paso: -1, puntos: 0, max: 0, decisiones: [], eventosUsados: new Set(), log: [], fin: false,
      crew: CREW.map(c => ({ ...c, lesionado: false }))
    };
    $('#obra-niv').textContent = 'Nivel ' + n.nombre;
    show('obra'); renderAll();
    setDialog(`<span class="who">📋 Encargo:</span> Eres residente de obra de una <b>vivienda unifamiliar de dos plantas (120 m²)</b> con estructura de hormigón armado en Puyo. Presupuesto: <b>${usd(n.presupuesto)}</b>. Plazo: <b>${n.plazo} días</b>. Tu cuadrilla espera tus indicaciones.`,
      [{ label: '🏗️ Iniciar la obra', cls: 'good', fn: () => { App.st.paso = 0; log('Inicio de la obra.'); showStep(); } }]);
    speak('Bienvenido a la obra, ingeniero. La cuadrilla espera sus indicaciones.', 0.85);
  }
  function log(txt, tipo = 'docente') { App.st.log.push({ d: App.st.dia, txt, tipo }); }

  function pasarDias(d) {
    const s = App.st;
    s.dia += d;
    s.riesgo = clamp(s.riesgo + d * 0.35 * (s.epp ? 0.5 : 1));
    s.ambiente = clamp(s.ambiente - d * 0.15);
  }
  function lesionar(motivo) {
    const s = App.st; const w = s.crew.find(c => !c.lesionado && c.id === 'w4') || s.crew.find(c => !c.lesionado);
    if (!w) return;
    w.lesionado = true; s.accidentes++; s.gastado += 400; pasarDias(2);
    log(`${w.nombre} sufrió un accidente ${motivo || 'en la obra'}.`, 'alerta'); toast(`🚑 ${w.nombre} sufrió un accidente.`);
  }
  function applyEffects(ef = {}) {
    const s = App.st; let dias = ef.dias || 0, costo = ef.costo || 0;
    if (s.acelerar && dias > 2) { dias = Math.round(dias * 0.7); costo += 1500; s.riesgo = clamp(s.riesgo + 5); s.acelerar = false; log('La cuadrilla adicional aceleró la fase.'); }
    s.gastado += costo; pasarDias(dias);
    if (ef.calidad) s.calidad = clamp(s.calidad + ef.calidad);
    if (ef.riesgo) s.riesgo = clamp(s.riesgo + ef.riesgo);
    if (ef.ambiente) s.ambiente = clamp(s.ambiente + ef.ambiente);
    ['permiso', 'ensayo', 'epp', 'registro'].forEach(k => { if (ef[k]) s[k === 'ensayo' ? 'ensayos' : k] += ef[k]; });
    if (ef.lesion ? (s.riesgo > 35 || Math.random() < 0.6) : (s.riesgo > 75 && Math.random() < 0.3)) lesionar(ef.lesion ? 'por un acto inseguro' : 'por las condiciones de riesgo');
  }

  /* ---------- render ---------- */
  const gc = (v, inv) => { const x = inv ? 100 - v : v; return x > 66 ? 'var(--bad)' : x > 33 ? 'var(--warn)' : 'var(--ok)'; };
  function renderAll() {
    const s = App.st; if (!s) return;
    $('#obra-clock').textContent = s.dia;
    $('#obra-fase').textContent = s.paso < 0 ? 'Encargo de la obra' : s.fin ? 'Obra finalizada' : `Fase ${Math.min(s.paso + 1, FASES.length)}/${FASES.length} · ${FASES[Math.min(s.paso, FASES.length - 1)].fase}`;
    const pp = s.gastado / s.presupuesto * 100, pl = s.dia / s.plazo * 100;
    const g = [
      { n: '💵 Presupuesto usado', v: pp, c: pp > 100 ? 'var(--bad)' : 'var(--primary)', l: `${usd(s.gastado)} de ${usd(s.presupuesto)}` },
      { n: '📅 Plazo usado', v: pl, c: pl > 100 ? 'var(--bad)' : 'var(--primary)', l: `día ${s.dia} de ${s.plazo}` },
      { n: '✅ Calidad', v: s.calidad, c: gc(s.calidad, true), l: Math.round(s.calidad) + '%' },
      { n: '⚠️ Riesgo laboral', v: s.riesgo, c: gc(s.riesgo), l: Math.round(s.riesgo) + '%' },
      { n: '🌿 Desempeño ambiental', v: s.ambiente, c: gc(s.ambiente, true), l: Math.round(s.ambiente) + '%' },
      { n: '📒 Documentación', v: Math.min(100, (s.permiso ? 35 : 0) + Math.min(3, s.registro) * 15 + Math.min(2, s.ensayos) * 10), c: 'var(--primary)', l: `${s.permiso ? 'Permiso ✔' : 'Sin permiso'} · ${s.registro} reg. · ${s.ensayos} ensayos` }
    ];
    $('#gauges').innerHTML = g.map(x => `<div class="gauge"><div class="gauge-top"><span>${x.n}</span><b>${x.l}</b></div><div class="gauge-bar"><i style="width:${clamp(x.v)}%;background:${x.c}"></i></div></div>`).join('');
    $('#crew').innerHTML = s.crew.map(c => `<div class="unit ${c.lesionado ? 'off' : ''}"><span class="u-av">${c.avatar}</span><div><b>${esc(c.nombre)}</b><small>${esc(c.rol)} · ${c.lesionado ? '🚑 Lesionado' : s.epp ? '🦺 Con EPP completo' : '⚠️ EPP incompleto'}</small></div></div>`).join('');
    $('#log').innerHTML = s.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>Día ${l.d}</b> ${esc(l.txt)}</li>`).join('');
    $$('[data-fa]').forEach(b => b.disabled = App.busy || s.paso < 0 || s.fin);
    drawScene(); notify();
  }

  /* alzado de la vivienda según el avance */
  function drawScene() {
    const s = App.st, k = s.fin ? FASES.length : Math.max(0, s.paso), svg = $('#scene');
    const G = 250, X0 = 170, W = 260, cols = [X0, X0 + W / 2, X0 + W];
    let h = `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.lluvia ? '#94a3b8' : '#bae6fd'}"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient></defs>
      <rect width="600" height="330" fill="url(#sky)"/><rect y="${G}" width="600" height="80" fill="#a16207"/><rect y="${G}" width="600" height="8" fill="#65a30d"/>`;
    if (s.lluvia) h += `<text x="60" y="60" font-size="40">🌧️</text><text x="480" y="50" font-size="36">🌧️</text>`;
    if (k <= 1) h += `<rect x="40" y="${G - 70}" width="70" height="44" fill="#fff" stroke="#334155"/><text x="75" y="${G - 52}" font-size="10" text-anchor="middle" font-weight="800">PERMISO</text><text x="75" y="${G - 38}" font-size="10" text-anchor="middle">${s.permiso ? '✔ Aprobado' : 'En trámite'}</text><rect x="72" y="${G - 26}" width="5" height="26" fill="#334155"/>`;
    if (k >= 2) cols.forEach(x => { h += `<rect x="${x - 3}" y="${G - 22}" width="6" height="22" fill="#78350f"/>`; });
    if (k >= 2) h += `<line x1="${X0}" y1="${G - 18}" x2="${X0 + W}" y2="${G - 18}" stroke="#f43f5e" stroke-dasharray="4 3"/>`;
    if (k >= 3) cols.forEach(x => { h += `<rect x="${x - 26}" y="${G + 18}" width="52" height="22" fill="#9ca3af" stroke="#4b5563"/><rect x="${x - 7}" y="${G}" width="14" height="18" fill="#9ca3af"/>`; });
    if (k >= 4) { cols.forEach(x => { h += `<rect x="${x - 7}" y="${G - 110}" width="14" height="110" fill="#a8a29e" stroke="#57534e"/>`; }); h += `<rect x="${X0 - 10}" y="${G - 122}" width="${W + 20}" height="14" fill="#a8a29e" stroke="#57534e"/>`; }
    if (k >= 5) { cols.forEach(x => { h += `<rect x="${x - 7}" y="${G - 220}" width="14" height="100" fill="#a8a29e" stroke="#57534e"/>`; }); h += `<rect x="${X0 - 14}" y="${G - 232}" width="${W + 28}" height="14" fill="#a8a29e" stroke="#57534e"/>`; }
    if (k >= 6) { [[X0 + 7, G - 108, W / 2 - 14, 108], [X0 + W / 2 + 7, G - 108, W / 2 - 14, 108], [X0 + 7, G - 218, W / 2 - 14, 96], [X0 + W / 2 + 7, G - 218, W / 2 - 14, 96]].forEach(([x, y, w, hh]) => { h += `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="#fca5a5" stroke="#b91c1c" stroke-width=".6"/>`; for (let yy = y + 12; yy < y + hh; yy += 12) h += `<line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}" stroke="#b91c1c" stroke-width=".4"/>`; }); }
    if (k >= 7) h += `<path d="M${X0 + 40} ${G - 10} V${G - 200} H${X0 + 120}" stroke="#2563eb" stroke-width="3" fill="none"/><path d="M${X0 + 200} ${G - 20} V${G - 190}" stroke="#eab308" stroke-width="3" stroke-dasharray="6 3"/><text x="${X0 + 205}" y="${G - 150}" font-size="16">⚡</text><text x="${X0 + 44}" y="${G - 150}" font-size="16">💧</text>`;
    if (k >= 8) h += `<path d="M${X0 - 40} ${G - 232} L${X0 + W / 2} ${G - 300} L${X0 + W + 40} ${G - 232} Z" fill="#b45309" stroke="#78350f"/>`;
    if (k >= 9) h += `<rect x="${X0 + 7}" y="${G - 108}" width="${W - 14}" height="108" fill="#fef3c7" stroke="#d97706"/><rect x="${X0 + 7}" y="${G - 218}" width="${W - 14}" height="96" fill="#fef3c7" stroke="#d97706"/><rect x="${X0 + W / 2 - 18}" y="${G - 60}" width="36" height="60" fill="#78350f"/><rect x="${X0 + 30}" y="${G - 85}" width="40" height="30" fill="#7dd3fc" stroke="#0369a1"/><rect x="${X0 + W - 70}" y="${G - 85}" width="40" height="30" fill="#7dd3fc" stroke="#0369a1"/><rect x="${X0 + 30}" y="${G - 190}" width="40" height="30" fill="#7dd3fc" stroke="#0369a1"/><rect x="${X0 + W - 70}" y="${G - 190}" width="40" height="30" fill="#7dd3fc" stroke="#0369a1"/><text x="510" y="${G}" font-size="44">🌳</text>`;
    if (!s.fin) { h += `<text x="490" y="${G - 4}" font-size="34">🚧</text>`; if (k >= 2) h += `<text x="40" y="${G - 4}" font-size="34">🧱</text>`; }
    s.crew.forEach((c, i) => { h += `<text x="${X0 - 70 + i * 34 + (i > 1 ? W + 40 : 0)}" y="${G - 2}" font-size="26" opacity="${c.lesionado ? .5 : 1}">${c.lesionado ? '🤕' : c.avatar}</text>`; });
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
    s.lluvia = false;
    const opts = p.o.slice().sort(() => Math.random() - 0.5);
    setDialog(`<span class="pill pill-soft">${esc(p.fase)}</span><p><b>${esc(p.q)}</b></p>`, opts.map(o => ({ label: esc(o.t), fn: () => choose(p, o, false) })));
    renderAll();
  }

  function choose(p, o, esEvento) {
    return busy(async () => {
      const s = App.st;
      let pts = o.p, fb = o.fb, ef = o.ef || {};
      if (ef.cond === 'permiso' && !s.permiso) { pts = 0; fb = 'No cuentas con permiso de construcción: el inspector suspende la obra hasta regularizarla.'; ef = { dias: 10, costo: 800 }; }
      s.puntos += pts; s.max += 2;
      s.decisiones.push({ fase: esEvento ? 'Imprevisto' : p.fase, t: o.t, p: pts, fb });
      if (!esEvento) s.paso++;
      log((esEvento ? 'Imprevisto: ' : '') + o.t, pts === 0 ? 'alerta' : 'docente');
      applyEffects(ef);
      renderAll();
      const color = pts === 2 ? 'var(--ok)' : pts === 1 ? 'var(--warn)' : 'var(--bad)';
      const maestro = s.crew.find(c => !c.lesionado) || s.crew[0];
      setDialog(`<p><b>Tu indicación:</b> ${esc(o.t)}</p><div class="case-fb" style="border-color:${color}"><b style="color:${color}">${pts === 2 ? 'Decisión adecuada' : pts === 1 ? 'Decisión parcialmente adecuada' : 'Decisión inadecuada'}</b><br>${esc(fb)}</div>`);
      await speak(pts === 0 && Math.random() < 0.5 ? '¿Seguro, inge? Bueno, como usted diga.' : '¡Listo, inge, así lo hacemos!', maestro.pitch);
      const ev = esEvento ? null : maybeEvent();
      setDialog($('#dialog-text').innerHTML, [{ label: ev ? '⚠️ Atender la novedad' : (s.paso < FASES.length ? 'Continuar ▶' : 'Cerrar la obra'), cls: 'good', fn: () => {
        if (ev) return showEvent(ev);
        if (s.paso >= FASES.length) return finish();
        showStep();
      } }]);
    });
  }

  function maybeEvent() {
    const s = App.st;
    if (Math.random() > App.niv.ev) return null;
    const pool = EVENTOS.filter(e => !s.eventosUsados.has(e.id) && !(e.id === 'freatico' && s.paso > 3) && !(e.id === 'arnes' && s.paso < 4) && !(e.id === 'cilindros' && s.paso < 4));
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }
  async function showEvent(ev) {
    const s = App.st; s.eventosUsados.add(ev.id); if (ev.id === 'lluvia') s.lluvia = true;
    log('Novedad: ' + ev.txt, 'evento');
    setDialog(`<span class="pill obra-pill">⚠️ Imprevisto</span><p><b>${esc(ev.txt)}</b></p><p class="small muted">¿Qué indicas?</p>`);
    App.busy = true; renderAll();
    await speak(ev.voz, (s.crew.find(c => !c.lesionado) || s.crew[0]).pitch);
    App.busy = false;
    setDialog($('#dialog-text').innerHTML, ev.o.slice().sort(() => Math.random() - 0.5).map(o => ({ label: esc(o.t), fn: () => choose(ev, o, true) })));
    renderAll();
  }

  /* ---------- indicaciones generales ---------- */
  const FREE = {
    charla: () => { const s = App.st; s.charlas++; s.riesgo = clamp(s.riesgo - 6); log('Dio una charla de seguridad a la cuadrilla.'); return { voz: 'Entendido, inge, a trabajar con cuidado.' }; },
    epp: () => { const s = App.st; if (s.epp) { toast('La cuadrilla ya tiene EPP completo.'); return null; } s.epp++; s.gastado += 300; s.riesgo = clamp(s.riesgo - 10); log('Entregó EPP completo: casco, botas, guantes, gafas y arneses.'); return { voz: 'Gracias por el equipo, inge.' }; },
    ensayo: () => { const s = App.st; s.ensayos++; s.gastado += 120; s.calidad = clamp(s.calidad + 4); log('Solicitó ensayos de laboratorio de materiales.'); return { voz: 'Ya mandamos las muestras al laboratorio.' }; },
    diario: () => { App.st.registro++; log('Registró las actividades y novedades en el diario de obra.'); return { voz: '' }; },
    residuos: () => { const s = App.st; s.gastado += 150; s.ambiente = clamp(s.ambiente + 8); log('Organizó la separación de residuos y el retiro de escombros a la escombrera autorizada.'); return { voz: 'Listo, inge, todo clasificado.' }; },
    coordinar: () => { App.st.com++; App.st.registro++; log('Coordinó avances y cambios con el propietario y la fiscalización.'); return { voz: '' }; },
    cuadrilla: () => { const s = App.st; if (s.acelerar) { toast('La cuadrilla adicional ya está contratada para la siguiente fase.'); return null; } s.acelerar = true; log('Contrató una cuadrilla adicional para la siguiente fase.'); return { voz: 'Con más gente avanzamos más rápido.' }; }
  };
  $$('[data-fa]').forEach(b => b.onclick = () => busy(async () => {
    const r = FREE[b.dataset.fa](); if (!r) return; renderAll();
    if (r.voz) await speak(r.voz, 0.9);
  }));

  /* ---------- evaluación ---------- */
  function finish() {
    window.Obra3D?.stopAll?.();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const s = App.st; s.fin = true;
    const calidad = (s.max ? s.puntos / s.max * 15 : 0) + s.calidad / 100 * 10;
    const seg = clamp(20 - s.riesgo * 0.12 - s.accidentes * 6 - (s.epp ? 0 : 4) + Math.min(2, s.charlas), 0, 20);
    const over = s.gastado / s.presupuesto - 1;
    const costo = over <= 0 ? 15 : clamp(15 - over * 60, 0, 15);
    const plazo = s.dia <= s.plazo ? 15 : clamp(15 - (s.dia - s.plazo) * 0.5, 0, 15);
    const amb = s.ambiente / 100 * 10;
    const gest = (s.permiso ? 5 : 0) + Math.min(3, s.registro) * 2 + Math.min(2, s.ensayos) * 2;
    const crit = [
      { n: 'Calidad técnica', p: Math.round(calidad), m: 25 },
      { n: 'Seguridad y salud ocupacional', p: Math.round(seg), m: 20 },
      { n: 'Control del presupuesto', p: Math.round(costo), m: 15 },
      { n: 'Cumplimiento del plazo', p: Math.round(plazo), m: 15 },
      { n: 'Gestión ambiental', p: Math.round(amb), m: 10 },
      { n: 'Gestión y documentación', p: Math.round(gest), m: 15 }
    ];
    const total = clamp(crit.reduce((a, c) => a + c.p, 0));
    const rec = [];
    if (!s.permiso) rec.push('Inicie la obra con el permiso de construcción y el estudio de suelos del terreno.');
    if (s.registro < 2) rec.push('Registre las actividades, órdenes y novedades en el diario de obra.');
    if (s.ensayos < 2) rec.push('Solicite ensayos de laboratorio para controlar la calidad de los materiales y del hormigón.');
    if (!s.epp) rec.push('Dote a la cuadrilla de EPP completo, incluyendo arnés para trabajos en altura.');
    if (s.accidentes) rec.push(`Hubo ${s.accidentes} accidente(s). Refuerce las charlas de seguridad y detenga los actos inseguros.`);
    if (over > 0) rec.push(`El costo superó el presupuesto en ${Math.round(over * 100)} %. Controle los rubros y los cambios.`);
    if (s.dia > s.plazo) rec.push(`La obra se atrasó ${s.dia - s.plazo} días. Planifique la ruta crítica y los recursos.`);
    if (s.ambiente < 60) rec.push('Mejore la gestión de residuos, escombros, polvo y ruido.');
    s.decisiones.filter(d => d.p === 0).slice(0, 3).forEach(d => rec.push(`${d.fase}: ${d.fb}`));
    if (!rec.length) rec.push('¡Excelente gestión de la obra! Mantenga estas prácticas.');
    saveHistory('Obra · ' + App.niv.nombre, 'Vivienda de dos plantas', total);
    $('#report').innerHTML = scoreHead('Evaluación de la dirección de obra', `Vivienda unifamiliar de dos plantas · Nivel ${App.niv.nombre} · ${App.cfg.name || 'Estudiante'}`, total) + `
      <div class="kpis">
        <div class="kpi"><b>${usd(s.gastado)}</b><span>Costo final (presupuesto ${usd(s.presupuesto)})</span></div>
        <div class="kpi"><b>${s.dia} días</b><span>Duración (plazo ${s.plazo})</span></div>
        <div class="kpi"><b>${Math.round(s.calidad)}%</b><span>Calidad de la obra</span></div>
        <div class="kpi"><b>${s.accidentes}</b><span>Accidentes</span></div>
      </div>
      <div class="report-grid">
        <div class="card"><h2>Rúbrica</h2>${crit.map(c => `<div class="crit"><div class="crit-top"><span>${c.n}</span><span>${c.p}/${c.m}</span></div><div class="crit-bar"><i style="width:${c.p / c.m * 100}%"></i></div></div>`).join('')}</div>
        <div class="card"><h2>Recomendaciones</h2><ul class="rec">${rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        <div class="card" style="grid-column:1/-1"><h2>Tus decisiones</h2><ol>${s.decisiones.map(d => `<li><p><b>${d.p === 2 ? '✔' : d.p === 1 ? '◐' : '✘'} ${esc(d.fase)}:</b> ${esc(d.t)}</p><p class="small muted">${esc(d.fb)}</p></li>`).join('')}</ol></div>
        <details class="card" style="grid-column:1/-1"><summary><b>📒 Diario de obra (${s.log.length} registros)</b></summary><ol class="log" style="max-height:none">${s.log.map(l => `<li class="t-${l.tipo}"><b>Día ${l.d}</b> ${esc(l.txt)}</li>`).join('')}</ol></details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary obra-btn" id="rp-again">🔁 Repetir la obra</button>
        <button class="btn" id="rp-new">🎚️ Cambiar nivel</button>
        <button class="btn" id="rp-print">🖨️ Imprimir / guardar PDF</button>
        <button class="btn" id="rp-menu">🏠 Menú principal</button>
      </div>`;
    $('#rp-again').onclick = startObra;
    $('#rp-new').onclick = () => { renderSetup(); show('setup'); };
    $('#rp-print').onclick = () => window.print();
    $('#rp-menu').onclick = () => show('hub');
    show('report');
  }
  $('#btn-end').onclick = () => { if (App.busy) return; if (confirm('¿Deseas terminar la obra y ver tu evaluación?')) finish(); };

  /* ================== LABORATORIO Y OFICINA TÉCNICA ================== */
  function openQuiz(tipo) {
    const banco = tipo === 'lab' ? LAB_BANCO : OFI_BANCO;
    const nCalc = tipo === 'lab' ? 5 : 4;
    const calc = banco.slice(-nCalc).sort(() => Math.random() - 0.5).slice(0, 3), mcs = banco.slice(0, -nCalc).sort(() => Math.random() - 0.5).slice(0, 7);
    const qs = mcs.concat(calc).map(f => f());
    const st = { i: 0, ok: 0, res: [] }, body = $(`#${tipo}-body`), titulo = tipo === 'lab' ? 'Laboratorio de materiales y estructuras' : 'Oficina técnica';
    const render = () => {
      const q = qs[st.i];
      body.innerHTML = `<div class="card"><div class="lab-top"><span class="pill pill-soft">Pregunta ${st.i + 1}/${qs.length}</span><span class="small muted">${esc(subj(q.asig).n)}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.num !== undefined ? `<div class="lab-num"><input class="q-in" inputmode="decimal" placeholder="Tu respuesta"><button class="btn btn-primary obra-btn q-ok">Comprobar</button></div>` : `<div class="dialog-choices">${q.o.map((o, i) => `<button class="btn" data-o="${i}">${esc(o)}</button>`).join('')}</div>`}
        <div class="q-fb"></div></div>`;
      const answer = good => {
        if (good) st.ok++; st.res.push({ q: q.q, good, exp: q.exp });
        $('.q-fb', body).innerHTML = `<div class="case-fb" style="border-color:${good ? 'var(--ok)' : 'var(--bad)'}"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Incorrecto'}</b><br>${esc(q.exp)}</div>
          <button class="btn btn-primary obra-btn q-next">${st.i + 1 < qs.length ? 'Siguiente ▶' : 'Ver resultado'}</button>`;
        $('.q-next', body).onclick = () => { st.i++; if (st.i < qs.length) render(); else done(); };
      };
      if (q.num !== undefined) $('.q-ok', body).onclick = () => { const v = parseFloat($('.q-in', body).value.replace(',', '.')); if (isNaN(v)) return toast('Escribe un número.'); $('.q-ok', body).disabled = true; answer(Math.abs(v - q.num) <= q.tol); };
      else $$('[data-o]', body).forEach(b => b.onclick = () => { $$('[data-o]', body).forEach(x => { x.disabled = true; if (+x.dataset.o === q.c) x.classList.add('good'); }); if (+b.dataset.o !== q.c) b.classList.add('bad'); answer(+b.dataset.o === q.c); });
    };
    const done = () => {
      const total = Math.round(st.ok / qs.length * 100);
      body.innerHTML = scoreHead(titulo, `${st.ok} de ${qs.length} respuestas correctas`, total) + `
        <div class="card"><h2>Repaso</h2><ol>${st.res.map(r => `<li><p><b>${r.good ? '✔' : '✘'}</b> ${esc(r.q)}</p><p class="small muted">${esc(r.exp)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary obra-btn q-again">🔁 Nueva sesión</button><button class="btn q-menu">🏠 Menú principal</button></div>`;
      $('.q-again', body).onclick = () => openQuiz(tipo); $('.q-menu', body).onclick = () => show('hub');
      saveHistory(tipo === 'lab' ? 'Laboratorio' : 'Oficina técnica', titulo, total);
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
        const ms = MALLA_CONS.filter(m => m.pao === pao && lista.some(x => x.cod === m.cod));
        return ms.length ? `<h3 class="asig-pao">PAO ${pao}</h3><div class="topic-list">${ms.map(m => { const c = lista.find(x => x.cod === m.cod); return `<button class="choice" data-asig="${m.cod}"><span class="em">${c.persona.avatar}</span><span><b>${esc(m.n)}</b><small>${esc(c.titulo)}</small><small class="tags">${esc(c.objetivo || c.persona.rol)}</small></span></button>`; }).join('')}</div>` : '';
      }).join('');
    $$('[data-asig]').forEach(b => b.onclick = () => playCase(lista.find(x => x.cod === b.dataset.asig)));
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
    const b = cod && document.querySelector(`[data-asig="${cod}"]`); if (b) b.click();
  }

  function openCases(cod) {
    $('#screen-cases h1').textContent = 'Casos profesionales';
    const list = cod ? CASOS_CONS.filter(c => c.asignaturas.includes(cod)) : CASOS_CONS;
    $('#cases-list').innerHTML = (cod ? `<p class="muted">Casos relacionados con <b>${esc(subj(cod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASOS_CONS.find(c => c.id === b.dataset.case)));
    if (cod) $('#cases-all').onclick = () => openCases();
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
  }
  function sayLine(c, t) { return /^\(.*\)$/.test(t) ? `<div class="case-say"><i>${esc(t.slice(1, -1))}</i></div>` : `<div class="case-say"><b>${esc(c.persona.nombre)}:</b> “${esc(t)}”</div>`; }
  function playCase(c) {
    // situación simulada: actuar en la escena y responder hablando o escribiendo
    if (window.CasoVivo) {
      $('#cases-list').hidden = true; $('#case-player').hidden = false;
      const ok = CasoVivo.play(c, { P: $('#case-player'), btn: 'btn-primary obra-btn', speak: speak, toast: toast, scoreHead,
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
        <div class="dialog-choices" id="case-opts">${paso.opciones.map((o, i) => ({ o, i })).sort(() => Math.random() - 0.5).map(({ o, i }) => `<button class="btn" data-p="${i}">${esc(o.t)}</button>`).join('')}</div><div id="case-fb"></div></div>`;
      $$('#case-opts .btn').forEach(b => b.onclick = () => {
        const o = paso.opciones[+b.dataset.p];
        $$('#case-opts .btn').forEach(x => { x.disabled = true; if (x !== b) x.style.opacity = .5; });
        if (o.p !== 1) b.classList.add(o.p === 2 ? 'good' : 'bad');
        st.pts += o.p; st.log.push({ t: o.t, p: o.p, fb: o.fb });
        const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
        $('#case-fb').innerHTML = `${sayLine(c, o.r)}<div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Respuesta adecuada' : o.p === 1 ? 'Respuesta parcialmente adecuada' : 'Respuesta inadecuada'}</b><br>${esc(o.fb)}</div>
          <button class="btn btn-primary obra-btn" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else end(); };
        speak(o.r, c.persona.pitch);
      });
      speak(paso.dice, c.persona.pitch);
    };
    const end = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary obra-btn" id="case-again">🔁 Repetir</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" id="case-menu">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c); $('#case-list').onclick = () => openCases(); $('#case-menu').onclick = () => show('hub');
      saveHistory('Casos', c.titulo, total); window.scrollTo(0, 0);
    };
    step(); window.scrollTo(0, 0);
  }

  /* ================== MAPA ================== */
  function openMapa() {
    $('#mapa-grid').innerHTML = [1, 2, 3, 4].map(pao => `<div class="mapa-col"><h3 class="obra-h3">PAO ${pao}</h3>${MALLA_CONS.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${m.mod.map(k => MODS[k].emoji).join(' ')} · ${m.u}</small></button>`).join('')}</div>`).join('');
    $$('[data-cod]').forEach(b => b.onclick = () => {
      const m = subj(b.dataset.cod), casos = CASOS_CONS.filter(c => c.asignaturas.includes(m.cod));
      $$('[data-cod]').forEach(x => x.classList.toggle('sel', x === b));
      $('#mapa-detail').innerHTML = `<h2>${esc(m.n)}</h2><p class="small muted">${m.cod} · PAO ${m.pao} · Unidad ${m.u} · Relación ${m.rel}</p><p>${esc(m.sim)}</p>
        <div class="report-actions">${m.mod.map(k => `<button class="btn" data-mod="${k}">${MODS[k].emoji} ${MODS[k].nombre}</button>`).join('')}${(window.CASOS_ASIG || []).some(x => x.cod === m.cod) ? '<button class="btn" data-mod="asig">🎯 Práctica de la asignatura</button>' : ''}</div>
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
  App.etapa = () => App.st ? (App.st.fin ? FASES.length : Math.max(0, App.st.paso)) : 0;
})();
