/* =========================================================
   Simulador de Emergencias – Control de Incendios y
   Operaciones de Rescate. Controlador de la interfaz.
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
  const subj = cod => MALLA_CIOR.find(m => m.cod === cod);

  const App = { cfg: store.get('cior-cfg', { name: '', inst: '', voice: true }), esc: null, niv: NIVELES[1], st: null, busy: false, listeners: [] };
  window.CiorApp = App;

  /* ================== utilidades ================== */
  function show(s) { $$('.screen').forEach(x => x.hidden = x.id !== 'screen-' + s); window.scrollTo(0, 0); }
  let tt; function toast(m, ms = 2800) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, ms); }
  App.toast = toast;
  function applyTheme(th) { if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => {
    const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const n = cur === 'dark' ? 'light' : 'dark'; applyTheme(n); store.set('aula-theme', n);
  };
  const syncSound = () => { $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇'; };
  $('#btn-sound').onclick = () => { App.cfg.voice = !App.cfg.voice; store.set('cior-cfg', App.cfg); syncSound(); if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel(); };
  syncSound();
  $$('[data-go]').forEach(b => b.onclick = () => { window.Cior3D?.stopAll?.(); show(b.dataset.go); });

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
  App.speak = speak;
  function nivelTexto(t) { return t >= 85 ? 'Excelente' : t >= 70 ? 'Muy bueno' : t >= 55 ? 'Bueno' : t >= 40 ? 'En proceso' : 'Inicial'; }
  function scoreHead(titulo, sub, total) {
    return `<div class="report-head card"><div><h1>${esc(titulo)}</h1><p class="muted">${esc(sub)}</p></div>
      <div class="score"><div class="score-ring cior-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }
  function saveHistory(modulo, titulo, total) {
    const h = store.get('cior-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, modulo, titulo, total });
    store.set('cior-history', h.slice(0, 50));
  }

  /* ================== INICIO Y MENÚ ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst; $('#f-voice').checked = App.cfg.voice;
  const syncBrand = () => { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Control de Incendios y Operaciones de Rescate'; };
  syncBrand();
  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, { name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(), voice: $('#f-voice').checked });
    store.set('cior-cfg', App.cfg); syncSound(); syncBrand();
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
    if (k === 'inc') { renderSetup(); show('setup'); }
    if (k === 'tri') openTriage();
    if (k === 'lab') openLab();
    if (k === 'casos') openCases(cod);
    if (k === 'mapa') openMapa();
  }
  $('#btn-history').onclick = () => {
    const h = store.get('cior-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.titulo)}</b><br><span class="muted small">${esc(e.modulo)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no hay prácticas registradas.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('cior-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== PREPARAR INCIDENTE ================== */
  function renderSetup() {
    $('#esc-list').innerHTML = ESCENARIOS.map(e => `<button class="choice" data-esc="${e.id}" aria-pressed="${App.esc?.id === e.id}"><span class="em">${e.emoji}</span><span><b>${esc(e.nombre)}</b><small>${esc(e.despacho)}</small><small class="tags">${e.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('');
    $('#niv-list').innerHTML = NIVELES.map(n => `<button class="choice" data-niv="${n.id}" aria-pressed="${App.niv.id === n.id}"><span class="em">${n.emoji}</span><span><b>${n.nombre}</b><small>${esc(n.desc)}</small></span></button>`).join('');
    $('#crew-preview').innerHTML = CREW.map(c => `<div class="mini-student"><div class="av">${c.avatar}</div><b>${esc(c.nombre)}</b><div class="tag">${esc(c.rol)}</div></div>`).join('');
    $$('[data-esc]').forEach(b => b.onclick = () => { App.esc = ESCENARIOS.find(e => e.id === b.dataset.esc); renderSetup(); });
    $$('[data-niv]').forEach(b => b.onclick = () => { App.niv = NIVELES.find(n => n.id === b.dataset.niv); renderSetup(); });
    $('#btn-start').disabled = !App.esc;
  }
  $('#btn-start').onclick = () => startIncident();

  /* ================== MOTOR DEL INCIDENTE ================== */
  function startIncident() {
    const e = App.esc, n = App.niv;
    App.st = {
      t: 0, paso: -1, fuego: e.fuego0, agua: Math.round(e.agua0 * n.agua), riesgo: 10, ataque: 0,
      sci: 0, com: 0, epp: 0, puntos: 0, max: 0, decisiones: [], heridos: 0, relevos: 0, sinAire: 0,
      apoyoEn: null, apoyoLlego: false, oficialSeg: false, eventosUsados: new Set(), log: [], fin: false, sinAguaAvisado: false,
      crew: CREW.map(c => ({ ...c, fatiga: 0.1, aire: 30, dentro: false, herido: false })),
      vic: e.victimas.map(v => ({ ...v, rescatada: false, estable: false, critico: false }))
    };
    $('#inc-esc').textContent = e.emoji + ' ' + e.nombre;
    $('#inc-niv').textContent = 'Nivel ' + n.nombre;
    show('inc');
    renderAll();
    dispatch();
  }

  function log(txt, tipo = 'docente') { App.st.log.push({ t: App.st.t, txt, tipo }); }

  function tick(min) {
    const s = App.st, e = App.esc, n = App.niv;
    for (let i = 0; i < min; i++) {
      s.t++;
      if (s.fuego > 0) {
        const tieneAgua = s.agua > 0;
        const supresion = tieneAgua ? s.ataque * 5 : 0;
        s.fuego = clamp(s.fuego + e.crecimiento * n.crec - supresion);
        if (s.ataque > 0 && tieneAgua) s.agua = Math.max(0, s.agua - Math.round(s.ataque * 110));
        if (s.ataque > 0 && s.agua <= 0 && !s.sinAguaAvisado) { s.sinAguaAvisado = true; toast('💧 ¡Sin agua en el tanque! Solicita apoyo o abastecimiento.'); log('Se agotó el agua del tanque.', 'alerta'); }
        if (s.fuego >= 90) s.riesgo = clamp(s.riesgo + 1.5);
      }
      if (s.fuego > 50) s.riesgo = clamp(s.riesgo + 0.4 * (s.oficialSeg ? 0.5 : 1));
      s.crew.forEach(c => {
        if (c.herido) return;
        if (c.dentro) {
          c.aire = Math.max(0, c.aire - 1); c.fatiga = Math.min(1, c.fatiga + 0.045);
          if (c.aire <= 0) { c.herido = true; c.dentro = false; s.heridos++; s.sinAire++; log(`${c.nombre} se quedó sin aire y sufrió una intoxicación.`, 'alerta'); }
        } else c.fatiga = Math.max(0, c.fatiga - 0.012);
      });
      s.vic.forEach(v => {
        if (v.estable) return;
        v.grav = Math.min(1, v.grav + v.deterioro * (v.rescatada ? 0.3 : 1 + s.fuego / 100));
        if (v.grav >= 1 && !v.critico) { v.critico = true; log(`${v.nombre} entró en estado crítico.`, 'alerta'); }
      });
      if (s.apoyoEn && !s.apoyoLlego && s.t >= s.apoyoEn) {
        s.apoyoLlego = true; s.agua += 3000; if (s.fuego > 0) s.ataque = Math.min(1, s.ataque + 0.3);
        log('Llegó la unidad de apoyo con agua y personal.', 'evento'); toast('🚒 Llegó la unidad de apoyo (+3000 L de agua).');
      }
    }
  }

  function applyEffects(ef = {}) {
    const s = App.st;
    if (ef.fuego) s.fuego = clamp(s.fuego + ef.fuego);
    if (ef.riesgo) s.riesgo = clamp(s.riesgo + ef.riesgo);
    if (ef.ataque !== undefined) s.ataque = ef.ataque;
    if (ef.agua) s.agua = Math.max(0, s.agua + ef.agua);
    if (ef.sci) s.sci += ef.sci;
    if (ef.com) s.com += ef.com;
    if (ef.epp) s.epp += ef.epp;
    if (ef.dentro === 'salen') s.crew.forEach(c => c.dentro = false);
    else if (ef.dentro) { let k = ef.dentro - s.crew.filter(c => c.dentro).length; s.crew.forEach(c => { if (k > 0 && !c.dentro && !c.herido) { c.dentro = true; k--; } }); }
    if (ef.vic) {
      const v = s.vic.find(x => x.id === ef.vic.id);
      if (v) {
        if (ef.vic.a === 'rescatar') { v.rescatada = true; v.grav = Math.max(0, v.grav - 0.05); }
        if (ef.vic.a === 'estabilizar') { v.rescatada = true; if (!v.critico) v.estable = true; v.grav = Math.max(0, v.grav - 0.15); }
        if (ef.vic.a === 'empeorar') v.grav = Math.min(1, v.grav + 0.2);
      }
    }
    const lesion = ef.herido ? (s.riesgo > 40 || Math.random() < 0.6) : (s.riesgo > 80 && Math.random() < 0.35);
    if (lesion) {
      const cands = s.crew.filter(c => !c.herido && c.dentro).concat(s.crew.filter(c => !c.herido));
      const c = cands[0];
      if (c) { c.herido = true; c.dentro = false; s.heridos++; log(`${c.nombre} resultó herido durante la operación.`, 'alerta'); toast(`🚑 ${c.nombre} resultó herido.`); }
    }
  }

  /* ---------- render ---------- */
  function gaugeColor(v, inv) { const x = inv ? 100 - v : v; return x > 66 ? 'var(--bad)' : x > 33 ? 'var(--warn)' : 'var(--ok)'; }
  function renderAll() {
    const s = App.st, e = App.esc; if (!s) return;
    $('#inc-clock').textContent = s.t;
    const total = e.pasos.length;
    $('#inc-fase').textContent = s.paso < 0 ? 'Despacho' : s.fin ? 'Operación finalizada' : `Paso ${Math.min(s.paso + 1, total)}/${total} · ${e.pasos[Math.min(s.paso, total - 1)].fase}`;
    const aguaMax = Math.max(e.agua0 * App.niv.agua, s.agua);
    const g = [
      { n: e.tipo === 'hazmat' || e.tipo === 'vehicular' ? '🔥 Fuego' : '🔥 Fuego', v: Math.round(s.fuego), c: gaugeColor(s.fuego), lbl: s.fuego <= 0 ? 'Controlado' : Math.round(s.fuego) + '%' },
      { n: '⚠️ Riesgo para el personal', v: Math.round(s.riesgo), c: gaugeColor(s.riesgo), lbl: Math.round(s.riesgo) + '%' },
      { n: '💧 Agua', v: Math.round(s.agua / aguaMax * 100), c: gaugeColor(s.agua / aguaMax * 100, true), lbl: s.agua + ' L' },
      { n: '🎯 Eficacia del ataque', v: Math.round(s.ataque * 100), c: 'var(--primary)', lbl: Math.round(s.ataque * 100) + '%' }
    ];
    $('#gauges').innerHTML = g.map(x => `<div class="gauge"><div class="gauge-top"><span>${x.n}</span><b>${x.lbl}</b></div><div class="gauge-bar"><i style="width:${clamp(x.v)}%;background:${x.c}"></i></div></div>`).join('');
    $('#crew').innerHTML = s.crew.map(c => `<div class="unit ${c.herido ? 'off' : ''}"><span class="u-av">${c.avatar}</span><div><b>${esc(c.nombre)}</b><small>${esc(c.rol)} · ${c.herido ? '🚑 Herido' : c.dentro ? '🏚️ En el interior' : '✅ Afuera'}</small>
      <div class="mini-bar" title="Aire del ERA"><span>Aire</span><i style="width:${c.aire / 30 * 100}%;background:${c.aire < 8 ? 'var(--bad)' : '#0ea5e9'}"></i></div>
      <div class="mini-bar" title="Fatiga"><span>Fatiga</span><i style="width:${c.fatiga * 100}%;background:${c.fatiga > 0.75 ? 'var(--bad)' : 'var(--warn)'}"></i></div></div></div>`).join('');
    $('#vics').innerHTML = s.vic.map(v => {
      const est = v.critico ? '🔴 Estado crítico' : v.estable ? '🟢 Estabilizada' : v.rescatada ? '🟡 Rescatada, requiere atención' : '🟠 ' + esc(v.estado);
      return `<div class="unit"><span class="u-av">${v.avatar}</span><div><b>${esc(v.nombre)}</b><small>${est}</small><div class="mini-bar" title="Gravedad"><span>Gravedad</span><i style="width:${v.grav * 100}%;background:${v.grav > 0.7 ? 'var(--bad)' : v.grav > 0.4 ? 'var(--warn)' : 'var(--ok)'}"></i></div></div></div>`;
    }).join('');
    $('#log').innerHTML = s.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>${l.t}′</b> ${esc(l.txt)}</li>`).join('');
    $$('[data-fa]').forEach(b => b.disabled = App.busy || s.paso < 0 || s.fin);
    drawScene();
    notify();
  }

  function drawScene() {
    const s = App.st, e = App.esc, svg = $('#scene');
    const bg = { estructural: '#cbd5e1', vehicular: '#94a3b8', forestal: '#86c27a', hazmat: '#a8b3c2' }[e.tipo];
    const cx = 330, cy = 150;
    const obj = { estructural: '🏠', vehicular: '🚗', forestal: '🌲', hazmat: '🛢️' }[e.tipo];
    let h = `<rect x="0" y="0" width="600" height="330" fill="${bg}"/>`;
    if (e.tipo === 'vehicular' || e.tipo === 'hazmat') h += `<rect x="0" y="120" width="600" height="70" fill="#475569"/><line x1="0" y1="155" x2="600" y2="155" stroke="#facc15" stroke-width="3" stroke-dasharray="18 14"/>`;
    if (e.tipo === 'forestal') h += `<path d="M0 330 L600 120 L600 330 Z" fill="#6aa65f" opacity=".6"/>`;
    if (s.sci) {
      h += `<circle cx="${cx}" cy="${cy}" r="140" fill="#22c55e" fill-opacity=".10" stroke="#16a34a" stroke-dasharray="6 6"/>`;
      h += `<circle cx="${cx}" cy="${cy}" r="95" fill="#f59e0b" fill-opacity=".14" stroke="#d97706" stroke-dasharray="6 6"/>`;
      h += `<circle cx="${cx}" cy="${cy}" r="55" fill="#ef4444" fill-opacity=".16" stroke="#dc2626" stroke-dasharray="6 6"/>`;
      h += `<text x="40" y="300" font-size="30">⛺</text><text x="30" y="322" font-size="12" font-weight="800" fill="#111">Puesto de comando</text>`;
    }
    if (e.tipo === 'forestal') h += `<text x="${cx - 70}" y="${cy + 10}" font-size="44">🌳</text><text x="${cx + 20}" y="${cy - 10}" font-size="44">🌲</text><text x="${cx + 50}" y="${cy + 40}" font-size="40">🌲</text><text x="470" y="80" font-size="40">🏘️</text>`;
    h += `<text x="${cx}" y="${cy + 22}" font-size="72" text-anchor="middle">${obj}</text>`;
    if (e.tipo === 'hazmat') h += `<text x="${cx + 60}" y="${cy + 40}" font-size="40">🚛</text><ellipse cx="${cx + 10}" cy="${cy + 52}" rx="70" ry="14" fill="#7c3aed" opacity=".35"/>`;
    const nf = Math.ceil(s.fuego / 14);
    for (let i = 0; i < nf; i++) { const a = i * 2.4, r = 22 + (i % 3) * 14; h += `<text class="flame" x="${cx + Math.cos(a) * r}" y="${cy - 10 + Math.sin(a) * r * 0.6}" font-size="${22 + s.fuego / 6}" text-anchor="middle" style="animation-delay:${i * 0.13}s">🔥</text>`; }
    if (s.fuego > 0) h += `<text x="${cx + 30}" y="${cy - 60}" font-size="34" opacity=".8">💨</text>`;
    h += `<text x="70" y="200" font-size="44">🚒</text>`;
    if (s.vic.some(v => v.rescatada)) h += `<text x="150" y="290" font-size="38">🚑</text>`;
    s.crew.forEach((c, i) => {
      const [x, y] = c.herido ? [190 + i * 26, 300] : c.dentro ? [cx - 30 + i * 22, cy + 52] : [110 + i * 26, 230];
      h += `<text x="${x}" y="${y}" font-size="24" opacity="${c.herido ? .5 : 1}">${c.herido ? '🤕' : '🧑‍🚒'}</text>`;
    });
    s.vic.forEach((v, i) => {
      const [x, y] = v.rescatada ? [200 + i * 34, 260] : [cx + 34 + i * 30, cy - 34];
      const col = v.critico ? '#dc2626' : v.estable ? '#16a34a' : v.grav > 0.5 ? '#f97316' : '#eab308';
      h += `<circle cx="${x + 13}" cy="${y - 9}" r="17" fill="none" stroke="${col}" stroke-width="4"/><text x="${x}" y="${y}" font-size="24">${v.avatar}</text>`;
    });
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

  function dispatch() {
    const e = App.esc;
    setDialog(`<span class="who">📻 ECU 911:</span> ${esc(e.despacho)}`, [{ label: '🚨 Recibido, unidad en camino', cls: 'good', fn: () => busy(async () => { log('Despacho recibido. Unidad en camino.'); tick(3); App.st.paso = 0; renderAll(); showStep(); }) }]);
    speak('ECU 911. ' + e.despacho, 1);
  }

  function showStep() {
    const s = App.st, e = App.esc, p = e.pasos[s.paso];
    if (!p) return finish();
    const opts = p.o.map((o, i) => ({ o, i })).sort(() => Math.random() - 0.5);
    setDialog(`<span class="pill pill-soft">${esc(p.fase)}</span><p><b>${esc(p.q)}</b></p>`, opts.map(({ o }) => ({ label: esc(o.t), fn: () => choose(p, o, false) })));
    renderAll();
  }

  function choose(p, o, esEvento) {
    return busy(async () => {
      const s = App.st;
      s.puntos += o.p; s.max += 2;
      s.decisiones.push({ fase: esEvento ? 'Imprevisto' : p.fase, q: esEvento ? p.txt : p.q, t: o.t, p: o.p, fb: o.fb });
      if (!esEvento) s.paso++;
      log((esEvento ? 'Imprevisto: ' : '') + o.t, o.p === 0 ? 'alerta' : 'docente');
      applyEffects(o.ef);
      tick(o.ef?.min || 0);
      renderAll();
      const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
      const lider = s.crew.find(c => !c.herido) || s.crew[0];
      setDialog(`<p><b>Tu orden:</b> ${esc(o.t)}</p><div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Decisión adecuada' : o.p === 1 ? 'Decisión parcialmente adecuada' : 'Decisión inadecuada'}</b><br>${esc(o.fb)}</div>`);
      await speak(o.p === 0 && Math.random() < 0.5 ? '¿Está seguro, mi jefe? … Recibido.' : '¡Recibido, mi jefe!', lider.pitch);
      const ev = esEvento ? null : maybeEvent();
      setDialog($('#dialog-text').innerHTML, [{ label: ev ? '⚠️ Atender la novedad' : (s.paso < App.esc.pasos.length ? 'Continuar ▶' : 'Finalizar la operación'), cls: 'good', fn: () => {
        if (ev) return showEvent(ev);
        if (s.paso >= App.esc.pasos.length) return finish();
        showStep();
      } }]);
    });
  }

  function maybeEvent() {
    const s = App.st;
    const sinAire = s.crew.find(c => c.dentro && !c.herido && c.aire <= 7);
    if (sinAire && !s.eventosUsados.has('aire-' + s.t)) {
      return { id: 'aire-' + s.t, quien: sinAire, txt: `Suena la alarma de baja presión del ERA de ${sinAire.nombre}, que está en el interior.`, voz: '¡Mi jefe, suena mi alarma de aire!', o: [
        { t: `Ordenar la salida inmediata de ${sinAire.nombre} junto con su pareja y reemplazarlos.`, p: 2, fb: 'La alarma de baja presión indica que debe salir de inmediato, siempre con su pareja.', ef: { min: 1, dentro: 'salen', riesgo: -5, salida: sinAire.id } },
        { t: 'Que termine la tarea antes de salir.', p: 0, fb: 'Quedarse con la reserva de aire puede dejarlo sin aire en el interior.', ef: { min: 1, riesgo: 15, herido: true } }
      ]};
    }
    const cansado = s.crew.find(c => !c.herido && c.fatiga > 0.8);
    if (cansado && !s.eventosUsados.has('fatiga-' + cansado.id)) {
      return { id: 'fatiga-' + cansado.id, txt: `${cansado.nombre} muestra signos de agotamiento: respiración agitada y movimientos lentos.`, voz: 'Mi jefe… ya no doy más.', o: [
        { t: 'Enviarlo a rehabilitación (hidratación y descanso) y reemplazarlo.', p: 2, fb: 'La fatiga extrema aumenta el riesgo de accidentes; la rehabilitación es obligatoria.', ef: { min: 1, fatigaReset: cansado.id } },
        { t: 'Que siga; no hay suficiente personal.', p: 0, fb: 'Un bombero agotado es un riesgo para sí mismo y para su pareja.', ef: { min: 0, riesgo: 12, herido: true } }
      ]};
    }
    if (Math.random() > App.niv.ev) return null;
    const pool = App.esc.eventos.concat(EVENTOS_COMUNES).filter(ev => !s.eventosUsados.has(ev.id));
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  async function showEvent(ev) {
    const s = App.st; s.eventosUsados.add(ev.id);
    log('Novedad: ' + ev.txt, 'evento');
    setDialog(`<span class="pill cior-pill">⚠️ Imprevisto</span><p><b>${esc(ev.txt)}</b></p><p class="small muted">¿Qué ordenas?</p>`);
    App.busy = true; renderAll();
    const quien = ev.quien || s.crew.find(c => !c.herido) || s.crew[0];
    await speak(ev.voz, quien.pitch);
    App.busy = false;
    const opts = ev.o.slice().sort(() => Math.random() - 0.5);
    setDialog($('#dialog-text').innerHTML, opts.map(o => ({ label: esc(o.t), fn: () => {
      if (o.ef?.fatigaReset) { const c = s.crew.find(x => x.id === o.ef.fatigaReset); if (c) { c.fatiga = 0.2; c.dentro = false; } }
      choose(ev, o, true);
    } })));
    renderAll();
  }

  /* ---------- órdenes generales ---------- */
  const FREE = {
    com: () => { App.st.com++; log('Informó la situación a ECU 911.'); return { min: 1, voz: 'ECU 911, recibido su informe.' }; },
    relevo: () => {
      const dentro = App.st.crew.filter(c => c.dentro && !c.herido);
      if (!dentro.length) { toast('No hay personal en el interior.'); return null; }
      dentro.forEach(c => { c.aire = 30; c.fatiga = Math.max(0.15, c.fatiga - 0.5); });
      App.st.relevos++; log('Realizó el relevo del equipo interior con cilindros de ERA llenos.');
      return { min: 2, voz: '¡Relevo realizado, mi jefe!' };
    },
    rehab: () => { App.st.crew.forEach(c => { if (!c.dentro) c.fatiga = Math.max(0, c.fatiga - 0.35); }); log('Organizó rehabilitación e hidratación del personal.'); return { min: 3, voz: 'Gracias, mi jefe, ya estamos mejor.' }; },
    apoyo: () => { if (App.st.apoyoEn) { toast('Ya solicitaste apoyo.'); return null; } App.st.apoyoEn = App.st.t + 8; App.st.com++; log('Solicitó una unidad de apoyo (llegada estimada: 8 min).'); return { min: 1, voz: 'ECU 911, unidad de apoyo en camino.' }; },
    seguridad: () => { if (App.st.oficialSeg) { toast('Ya hay un oficial de seguridad.'); return null; } App.st.oficialSeg = true; App.st.sci++; App.st.riesgo = clamp(App.st.riesgo - 8); log('Designó un oficial de seguridad.'); return { min: 1, voz: 'Asumo como oficial de seguridad.' }; },
    retirada: () => {
      if (!App.st.crew.some(c => c.dentro)) { toast('No hay personal en el interior.'); return null; }
      App.st.crew.forEach(c => c.dentro = false); App.st.riesgo = clamp(App.st.riesgo - 10); if (App.st.fuego > 0) App.st.ataque *= 0.5;
      log('Ordenó la retirada del personal del interior.'); return { min: 1, voz: '¡Personal afuera, mi jefe!' };
    }
  };
  $$('[data-fa]').forEach(b => b.onclick = () => busy(async () => {
    const r = FREE[b.dataset.fa]();
    if (!r) return;
    tick(r.min); renderAll();
    await speak(r.voz, 0.95);
  }));

  /* ---------- evaluación ---------- */
  function finish() {
    window.Cior3D?.stopAll?.();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const s = App.st, e = App.esc; s.fin = true;
    const esFuego = e.crecimiento > 0;
    const seg = clamp(25 - s.riesgo * 0.15 - s.heridos * 7 - (s.epp ? 0 : 5) - s.sinAire * 3, 0, 25);
    const proc = s.max ? s.puntos / s.max * 25 : 0;
    const ref = e.pasos.length * 3 + 6;
    const tiempo = s.t <= ref ? 1 : ref / s.t;
    const control = esFuego ? (100 - s.fuego) / 100 * 14 + tiempo * 6 : (100 - s.riesgo) / 100 * 14 + tiempo * 6;
    const vic = s.vic.reduce((a, v) => a + (v.estable ? 1 : v.rescatada ? 0.6 : 0.2) * (v.critico ? 0.3 : 1 - v.grav * 0.5), 0) / s.vic.length * 15;
    const mando = (s.sci ? 6 : 0) + Math.min(3, s.com) * 3;
    const crit = [
      { n: 'Seguridad del personal', p: Math.round(seg), m: 25 },
      { n: 'Procedimiento técnico', p: Math.round(proc), m: 25 },
      { n: esFuego ? 'Control del incendio y tiempo' : 'Control de la escena y tiempo', p: Math.round(control), m: 20 },
      { n: 'Atención de víctimas', p: Math.round(vic), m: 15 },
      { n: 'Comando y comunicación', p: Math.round(mando), m: 15 }
    ];
    const total = clamp(crit.reduce((a, c) => a + c.p, 0));
    const rec = [];
    if (!s.sci) rec.push('Establezca el Sistema de Comando de Incidentes al inicio: puesto de comando, roles y zonas.');
    if (s.com < 2) rec.push('Mantenga informado a ECU 911 durante toda la operación.');
    if (!s.epp) rec.push('Verifique el EPP y el trabajo en pareja antes de exponer al personal.');
    if (s.heridos) rec.push(`Hubo ${s.heridos} bombero(s) herido(s). Revise las decisiones de mayor riesgo y los signos de peligro.`);
    if (s.sinAire) rec.push('Controle la autonomía del ERA y realice relevos antes de que suene la alarma.');
    if (s.crew.some(c => c.fatiga > 0.7) && !s.relevos) rec.push('Planifique relevos y rehabilitación del personal.');
    if (esFuego && s.fuego > 0) rec.push('El incendio no quedó controlado: revise la táctica y el abastecimiento de agua.');
    if (s.vic.some(v => v.critico)) rec.push('Una o más víctimas llegaron a estado crítico: priorice su rescate y atención.');
    s.decisiones.filter(d => d.p === 0).slice(0, 3).forEach(d => rec.push(`${d.fase}: ${d.fb}`));
    if (!rec.length) rec.push('¡Excelente operación! Mantenga estos procedimientos.');
    saveHistory('Incidente · ' + App.niv.nombre, e.nombre, total);
    $('#report').innerHTML = scoreHead('Evaluación de la operación', `${e.emoji} ${e.nombre} · Nivel ${App.niv.nombre} · ${App.cfg.name || 'Estudiante'}`, total) + `
      <div class="kpis">
        <div class="kpi"><b>${s.t} min</b><span>Duración de la operación</span></div>
        <div class="kpi"><b>${esFuego ? (s.fuego <= 0 ? 'Controlado' : Math.round(s.fuego) + '%') : Math.round(s.riesgo) + '%'}</b><span>${esFuego ? 'Fuego al final' : 'Riesgo al final'}</span></div>
        <div class="kpi"><b>${s.vic.filter(v => v.estable).length}/${s.vic.length}</b><span>Víctimas estabilizadas</span></div>
        <div class="kpi"><b>${s.heridos}</b><span>Bomberos heridos</span></div>
      </div>
      <div class="report-grid">
        <div class="card"><h2>Rúbrica</h2>${crit.map(c => `<div class="crit"><div class="crit-top"><span>${c.n}</span><span>${c.p}/${c.m}</span></div><div class="crit-bar"><i style="width:${c.p / c.m * 100}%"></i></div></div>`).join('')}</div>
        <div class="card"><h2>Recomendaciones</h2><ul class="rec">${rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        <div class="card" style="grid-column:1/-1"><h2>Tus decisiones</h2><ol>${s.decisiones.map(d => `<li><p><b>${d.p === 2 ? '✔' : d.p === 1 ? '◐' : '✘'} ${esc(d.fase)}:</b> ${esc(d.t)}</p><p class="small muted">${esc(d.fb)}</p></li>`).join('')}</ol></div>
        <details class="card" style="grid-column:1/-1"><summary><b>📜 Registro cronológico (${s.log.length})</b></summary><ol class="log" style="max-height:none">${s.log.map(l => `<li class="t-${l.tipo}"><b>${l.t}′</b> ${esc(l.txt)}</li>`).join('')}</ol></details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary cior-btn" id="rp-again">🔁 Repetir el escenario</button>
        <button class="btn" id="rp-new">🚒 Otro escenario o nivel</button>
        <button class="btn" id="rp-print">🖨️ Imprimir / guardar PDF</button>
        <button class="btn" id="rp-menu">🏠 Menú principal</button>
      </div>`;
    $('#rp-again').onclick = startIncident;
    $('#rp-new').onclick = () => { renderSetup(); show('setup'); };
    $('#rp-print').onclick = () => window.print();
    $('#rp-menu').onclick = () => show('hub');
    show('report');
  }
  $('#btn-end').onclick = () => { if (App.busy) return; if (confirm('¿Deseas terminar la operación y ver tu evaluación?')) finish(); };

  /* ================== TRIAGE ================== */
  let triT0 = 0;
  function openTriage() {
    const lista = VICTIMAS_TRIAGE.slice().sort(() => Math.random() - 0.5);
    triT0 = Date.now();
    $('#tri-body').innerHTML = `
      <div class="card"><p>Un bus se volcó en la vía. Eres el primer rescatista en llegar. Clasifica a cada víctima con el método <b>START</b>: <span class="tag-c verde">Verde</span> leve, <span class="tag-c amarillo">Amarillo</span> diferido, <span class="tag-c rojo">Rojo</span> inmediato, <span class="tag-c negro">Negro</span> sin signos de vida. En la realidad dispones de unos 30 segundos por víctima.</p></div>
      <div class="tri-grid">${lista.map((v, i) => `<div class="card tri-card" data-i="${i}"><div class="tri-head"><span class="u-av">${v.av}</span><b>${esc(v.n)}</b></div><p class="small">${esc(v.d)}</p>
        <div class="tri-btns">${Object.keys(COLORES).map(c => `<button class="tri-b ${c}" data-c="${c}">${c[0].toUpperCase() + c.slice(1)}</button>`).join('')}</div><div class="tri-fb"></div></div>`).join('')}</div>
      <div class="report-actions"><button class="btn btn-primary cior-btn" id="tri-check">✔ Finalizar triage</button></div><div id="tri-res"></div>`;
    $$('.tri-card').forEach(card => $$('.tri-b', card).forEach(b => b.onclick = () => { $$('.tri-b', card).forEach(x => x.classList.toggle('sel', x === b)); card.dataset.sel = b.dataset.c; }));
    $('#tri-check').onclick = () => {
      let ok = 0; const seg = Math.round((Date.now() - triT0) / 1000);
      $$('.tri-card').forEach(card => {
        const v = lista[+card.dataset.i], r = startColor(v), good = card.dataset.sel === r.c; if (good) ok++;
        card.classList.add(good ? 'ok-card' : 'bad-card');
        $('.tri-fb', card).innerHTML = `<p class="small"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Correcto: ' + r.c.toUpperCase()}</b> · ${esc(r.r)}</p>`;
        $$('.tri-b', card).forEach(b => b.disabled = true);
      });
      const total = Math.round(ok / lista.length * 100);
      $('#tri-res').innerHTML = scoreHead('Resultado del triage', `${ok} de ${lista.length} víctimas bien clasificadas · ${seg} s en total (${Math.round(seg / lista.length)} s por víctima)`, total) + `
        <div class="card"><h2>Recuerda el algoritmo START</h2><ol>
          <li>¿Camina? → <b>Verde</b>.</li>
          <li>¿Respira? No → abrir la vía aérea: si respira → <b>Rojo</b>; si no → <b>Negro</b>.</li>
          <li>Frecuencia respiratoria mayor a 30 → <b>Rojo</b>.</li>
          <li>Sin pulso radial o llenado capilar mayor a 2 s → <b>Rojo</b>.</li>
          <li>No obedece órdenes simples → <b>Rojo</b>; si obedece → <b>Amarillo</b>.</li></ol></div>
        <div class="report-actions"><button class="btn btn-primary cior-btn" id="tri-again">🔁 Nuevo triage</button><button class="btn" id="tri-menu">🏠 Menú principal</button></div>`;
      $('#tri-check').disabled = true;
      $('#tri-again').onclick = openTriage; $('#tri-menu').onclick = () => show('hub');
      $('#tri-res').scrollIntoView({ behavior: 'smooth' });
      saveHistory('Triage', 'Triage START de 10 víctimas', total);
    };
    show('tri');
  }

  /* ================== LABORATORIO ================== */
  function openLab() {
    const calc = LAB_BANCO.slice(-3), mc = LAB_BANCO.slice(0, -3).sort(() => Math.random() - 0.5).slice(0, 7);
    const qs = mc.concat(calc).map(f => f());
    const st = { i: 0, ok: 0, res: [] };
    const render = () => {
      const q = qs[st.i];
      $('#lab-body').innerHTML = `<div class="card"><div class="lab-top"><span class="pill pill-soft">Pregunta ${st.i + 1}/${qs.length}</span><span class="small muted">${esc(subj(q.asig).n)}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.num !== undefined ? `<div class="lab-num"><input id="lab-in" inputmode="decimal" placeholder="Tu respuesta"><button class="btn btn-primary cior-btn" id="lab-ok">Comprobar</button></div>` : `<div class="dialog-choices">${q.o.map((o, i) => `<button class="btn" data-o="${i}">${esc(o)}</button>`).join('')}</div>`}
        <div id="lab-fb"></div></div>`;
      const answer = good => {
        if (good) st.ok++; st.res.push({ q: q.q, good, exp: q.exp });
        $('#lab-fb').innerHTML = `<div class="case-fb" style="border-color:${good ? 'var(--ok)' : 'var(--bad)'}"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Incorrecto'}</b><br>${esc(q.exp)}</div>
          <button class="btn btn-primary cior-btn" id="lab-next">${st.i + 1 < qs.length ? 'Siguiente ▶' : 'Ver resultado'}</button>`;
        $('#lab-next').onclick = () => { st.i++; if (st.i < qs.length) render(); else done(); };
      };
      if (q.num !== undefined) {
        $('#lab-ok').onclick = () => { const v = parseFloat($('#lab-in').value.replace(',', '.')); if (isNaN(v)) return toast('Escribe un número.'); $('#lab-ok').disabled = true; answer(Math.abs(v - q.num) <= q.tol); };
      } else $$('[data-o]').forEach(b => b.onclick = () => { $$('[data-o]').forEach(x => { x.disabled = true; if (+x.dataset.o === q.c) x.classList.add('good'); }); if (+b.dataset.o !== q.c) b.classList.add('bad'); answer(+b.dataset.o === q.c); });
    };
    const done = () => {
      const total = Math.round(st.ok / qs.length * 100);
      $('#lab-body').innerHTML = scoreHead('Laboratorio técnico', `${st.ok} de ${qs.length} respuestas correctas`, total) + `
        <div class="card"><h2>Repaso</h2><ol>${st.res.map(r => `<li><p><b>${r.good ? '✔' : '✘'}</b> ${esc(r.q)}</p><p class="small muted">${esc(r.exp)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary cior-btn" id="lab-again">🔁 Nuevo laboratorio</button><button class="btn" id="lab-menu">🏠 Menú principal</button></div>`;
      $('#lab-again').onclick = openLab; $('#lab-menu').onclick = () => show('hub');
      saveHistory('Laboratorio', 'Laboratorio técnico', total);
    };
    render(); show('lab');
  }

  /* ================== CASOS ================== */
  function openCases(cod) {
    const list = cod ? CASOS_CIOR.filter(c => c.asignaturas.includes(cod)) : CASOS_CIOR;
    $('#cases-list').innerHTML = (cod ? `<p class="muted">Casos relacionados con <b>${esc(subj(cod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASOS_CIOR.find(c => c.id === b.dataset.case)));
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
        <div class="dialog-choices" id="case-opts">${paso.opciones.map((o, i) => ({ o, i })).sort(() => Math.random() - 0.5).map(({ o, i }) => `<button class="btn" data-p="${i}">${esc(o.t)}</button>`).join('')}</div><div id="case-fb"></div></div>`;
      $$('#case-opts .btn').forEach(b => b.onclick = () => {
        const o = paso.opciones[+b.dataset.p];
        $$('#case-opts .btn').forEach(x => { x.disabled = true; if (x !== b) x.style.opacity = .5; });
        if (o.p !== 1) b.classList.add(o.p === 2 ? 'good' : 'bad');
        st.pts += o.p; st.log.push({ t: o.t, p: o.p, fb: o.fb });
        const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
        $('#case-fb').innerHTML = `${sayLine(c, o.r)}<div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Respuesta adecuada' : o.p === 1 ? 'Respuesta parcialmente adecuada' : 'Respuesta inadecuada'}</b><br>${esc(o.fb)}</div>
          <button class="btn btn-primary cior-btn" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else end(); };
        speak(o.r, c.persona.pitch);
      });
      speak(paso.dice, c.persona.pitch);
    };
    const end = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary cior-btn" id="case-again">🔁 Repetir</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" id="case-menu">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c); $('#case-list').onclick = () => openCases(); $('#case-menu').onclick = () => show('hub');
      saveHistory('Casos', c.titulo, total); window.scrollTo(0, 0);
    };
    step(); window.scrollTo(0, 0);
  }

  /* ================== MAPA ================== */
  function openMapa() {
    $('#mapa-grid').innerHTML = [1, 2, 3, 4].map(pao => `<div class="mapa-col"><h3 class="cior-h3">PAO ${pao}</h3>${MALLA_CIOR.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${m.mod.map(k => MODS[k].emoji).join(' ')} · ${m.u}</small></button>`).join('')}</div>`).join('');
    $$('[data-cod]').forEach(b => b.onclick = () => {
      const m = subj(b.dataset.cod), casos = CASOS_CIOR.filter(c => c.asignaturas.includes(m.cod)), escs = ESCENARIOS.filter(e => e.asignaturas.includes(m.cod));
      $$('[data-cod]').forEach(x => x.classList.toggle('sel', x === b));
      $('#mapa-detail').innerHTML = `<h2>${esc(m.n)}</h2><p class="small muted">${m.cod} · PAO ${m.pao} · Unidad ${m.u} · Relación ${m.rel}</p><p>${esc(m.sim)}</p>
        <div class="report-actions">${m.mod.map(k => `<button class="btn" data-mod="${k}">${MODS[k].emoji} ${MODS[k].nombre}</button>`).join('')}</div>
        ${escs.length ? `<p class="small"><b>Escenarios:</b> ${escs.map(e => esc(e.nombre)).join(' · ')}</p>` : ''}
        ${casos.length ? `<p class="small"><b>Casos:</b> ${casos.map(c => esc(c.titulo)).join(' · ')}</p>` : ''}`;
      $$('#mapa-detail [data-mod]').forEach(x => x.onclick = () => { if (x.dataset.mod === 'inc' && escs.length) App.esc = escs[0]; openModule(x.dataset.mod, casos.length ? m.cod : undefined); });
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
})();
