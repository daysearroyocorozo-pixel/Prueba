/* =========================================================
   Simulador de Proyectos de IA – Carrera de Inteligencia
   Artificial (en línea). Controlador de la interfaz: proyecto de
   IA para un cliente real, laboratorio de programación y datos,
   IA responsable y seguridad, casos y mapa curricular.
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
  const subj = cod => MALLA_IA.find(m => m.cod === cod);

  const App = { cfg: store.get('ia-cfg', { name: '', inst: '', voice: true }), niv: NIVELES[1], proj: PROYECTOS[0], st: null, busy: false, listeners: [] };
  window.IaApp = App;
  /* reemplaza las marcas {cliente}, {datos}, … según el cliente elegido */
  const fill = t => String(t).replace(/\{(\w+)\}/g, (m, k) => App.proj[k] !== undefined ? App.proj[k] : m);

  /* ================== utilidades ================== */
  function show(s) { $$('.screen').forEach(x => x.hidden = x.id !== 'screen-' + s); window.scrollTo(0, 0); }
  let tt; function toast(m, ms = 2800) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, ms); }
  App.toast = toast;
  function applyTheme(th) { if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => { const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const n = cur === 'dark' ? 'light' : 'dark'; applyTheme(n); store.set('aula-theme', n); };
  const syncSound = () => { $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇'; };
  $('#btn-sound').onclick = () => { App.cfg.voice = !App.cfg.voice; store.set('ia-cfg', App.cfg); syncSound(); if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel(); };
  syncSound();
  $$('[data-go]').forEach(b => b.onclick = () => { window.Ia3D?.stopAll?.(); show(b.dataset.go); });

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
      <div class="score"><div class="score-ring ia-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }
  function saveHistory(modulo, titulo, total) {
    const h = store.get('ia-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, modulo, titulo, total });
    store.set('ia-history', h.slice(0, 50));
    window.ISTY?.registrar('resultado', { modulo, titulo, total });
  }

  /* ================== INICIO Y MENÚ ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst; $('#f-voice').checked = App.cfg.voice;
  const syncBrand = () => { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Inteligencia Artificial'; };
  syncBrand();
  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, { name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(), voice: $('#f-voice').checked });
    store.set('ia-cfg', App.cfg); syncSound(); syncBrand();
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
    if (k === 'proy') { renderSetup(); show('setup'); }
    if (k === 'lab') openQuiz('lab');
    if (k === 'resp') openQuiz('resp');
    if (k === 'casos') openCases(cod);
    if (k === 'asig') openAsig(cod);
    if (k === 'mapa') openMapa();
  }
  $('#btn-history').onclick = () => {
    const h = store.get('ia-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.titulo)}</b><br><span class="muted small">${esc(e.modulo)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no hay prácticas registradas.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('ia-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== PREPARAR PROYECTO ================== */
  function renderSetup() {
    $('#proj-list').innerHTML = PROYECTOS.map(p => `<button class="choice" data-proj="${p.id}" aria-pressed="${App.proj.id === p.id}"><span class="em">${p.emoji}</span><span><b>${esc(p.nombre)}</b><small>${esc(p.cliente)} · ${esc(p.contacto.nombre)}, ${esc(p.contacto.rol)}</small><small>${esc(p.desc)}</small></span></button>`).join('');
    $('#niv-list').innerHTML = NIVELES.map(n => `<button class="choice" data-niv="${n.id}" aria-pressed="${App.niv.id === n.id}"><span class="em">${n.emoji}</span><span><b>${n.nombre}</b><small>${esc(n.desc)}</small><small>Presupuesto de cómputo ${usd(n.presupuesto)} · Plazo ${n.plazo} días</small></span></button>`).join('');
    $('#crew-preview').innerHTML = EQUIPO.concat([{ ...App.proj.contacto, rol: 'Cliente · ' + App.proj.contacto.rol }]).map(c => `<div class="mini-student"><div class="av">${c.avatar}</div><b>${esc(c.nombre)}</b><div class="tag">${esc(c.rol)}</div></div>`).join('');
    $$('[data-niv]').forEach(b => b.onclick = () => { App.niv = NIVELES.find(n => n.id === b.dataset.niv); renderSetup(); });
    $$('[data-proj]').forEach(b => b.onclick = () => { App.proj = PROYECTOS.find(p => p.id === b.dataset.proj); renderSetup(); });
  }
  $('#btn-start').onclick = () => startProyecto();

  /* ================== MOTOR DEL PROYECTO ================== */
  function startProyecto() {
    const n = App.niv, p = App.proj;
    App.st = {
      dia: 0, gastado: 0, presupuesto: n.presupuesto, plazo: n.plazo, prec: 35, equi: 60, priv: 60, sat: 60,
      registro: 0, respaldo: 0, reuniones: 0, accesos: 0, ahorro: false, acelerar: false, revEtica: 0, caida: false,
      paso: -1, puntos: 0, max: 0, decisiones: [], eventosUsados: new Set(), log: [], fin: false,
      equipo: EQUIPO.map(c => ({ ...c }))
    };
    $('#proy-niv').textContent = 'Nivel ' + n.nombre;
    $('#proy-cli').textContent = p.emoji + ' ' + p.cliente;
    show('proy'); renderAll();
    setDialog(`<span class="who">📋 Encargo:</span> <b>${esc(p.cliente)}</b> contrata a tu equipo para <b>${esc(p.problema)}</b>. Presupuesto de cómputo y servicios: <b>${usd(n.presupuesto)}</b>. Plazo: <b>${n.plazo} días</b>. Tu equipo virtual espera tus indicaciones.`,
      [{ label: '🤖 Iniciar el proyecto', cls: 'good', fn: () => { App.st.paso = 0; log('Inicio del proyecto para ' + p.cliente + '.'); showStep(); } }]);
    speak('Hola. El equipo está conectado y listo para empezar el proyecto.', EQUIPO[0].pitch);
  }
  function log(txt, tipo = 'docente') { App.st.log.push({ d: App.st.dia, txt, tipo }); }
  const quien = id => id === 'cliente' ? App.proj.contacto : (App.st.equipo.find(c => c.id === id) || App.st.equipo[0]);

  function pasarDias(d) {
    const s = App.st;
    const antes = s.dia; s.dia += d;
    s.gastado += d * (s.ahorro ? 12 : 20); // costo diario de la nube y las herramientas
    const tarde = Math.max(0, s.dia - Math.max(antes, s.plazo));
    if (tarde) s.sat = clamp(s.sat - tarde * 1.5);
  }
  function applyEffects(ef = {}) {
    const s = App.st; let dias = ef.dias || 0, costo = ef.costo || 0;
    if (s.acelerar && dias > 2) { dias = Math.round(dias * 0.6); costo += 400; s.acelerar = false; log('La GPU adicional aceleró la fase.'); }
    s.gastado += costo; pasarDias(dias);
    ['prec', 'equi', 'priv', 'sat'].forEach(k => { if (ef[k]) s[k] = clamp(s[k] + ef[k]); });
    if (ef.registro) s.registro += ef.registro;
    if (ef.etica) s.revEtica += ef.etica;
  }

  /* ---------- render ---------- */
  const gc = (v, inv) => { const x = inv ? 100 - v : v; return x > 66 ? 'var(--bad)' : x > 33 ? 'var(--warn)' : 'var(--ok)'; };
  const etapa = () => App.st ? (App.st.fin ? FASES.length : Math.max(0, App.st.paso)) : 0;
  function renderAll() {
    const s = App.st; if (!s) return;
    $('#proy-clock').textContent = s.dia;
    $('#proy-fase').textContent = s.paso < 0 ? 'Encargo del cliente' : s.fin ? 'Proyecto finalizado' : `Fase ${Math.min(s.paso + 1, FASES.length)}/${FASES.length} · ${FASES[Math.min(s.paso, FASES.length - 1)].fase}`;
    const pp = s.gastado / s.presupuesto * 100, pl = s.dia / s.plazo * 100;
    const g = [
      { n: '🎯 Precisión del modelo', v: s.prec, c: gc(s.prec, true), l: Math.round(s.prec) + '%' },
      { n: '⚖️ Equidad (sin sesgo)', v: s.equi, c: gc(s.equi, true), l: Math.round(s.equi) + '%' },
      { n: '🔒 Privacidad y seguridad', v: s.priv, c: gc(s.priv, true), l: Math.round(s.priv) + '%' },
      { n: '💻 Presupuesto de cómputo', v: pp, c: pp > 100 ? 'var(--bad)' : 'var(--primary)', l: `${usd(s.gastado)} de ${usd(s.presupuesto)}` },
      { n: '📅 Tiempo del proyecto', v: pl, c: pl > 100 ? 'var(--bad)' : 'var(--primary)', l: `día ${s.dia} de ${s.plazo}` },
      { n: '😊 Satisfacción del cliente', v: s.sat, c: gc(s.sat, true), l: Math.round(s.sat) + '%' }
    ];
    $('#gauges').innerHTML = g.map(x => `<div class="gauge"><div class="gauge-top"><span>${x.n}</span><b>${x.l}</b></div><div class="gauge-bar"><i style="width:${clamp(x.v)}%;background:${x.c}"></i></div></div>`).join('');
    const lider = s.paso >= 0 && !s.fin && FASES[s.paso] ? FASES[s.paso].lider : null;
    $('#crew').innerHTML = s.equipo.map(c => `<div class="unit ${c.id === lider ? 'lider' : ''}"><span class="u-av">${c.avatar}</span><div><b>${esc(c.nombre)}</b><small>${esc(c.rol)} · ${s.fin ? '✔ Proyecto entregado' : c.id === lider ? '🔨 Lidera esta fase' : '🤝 Apoya al equipo'}</small></div></div>`).join('')
      + `<div class="unit"><span class="u-av">${App.proj.contacto.avatar}</span><div><b>${esc(App.proj.contacto.nombre)}</b><small>Cliente · ${esc(App.proj.contacto.rol)}</small></div></div>`;
    $('#log').innerHTML = s.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>Día ${l.d}</b> ${esc(l.txt)}</li>`).join('');
    $$('[data-fa]').forEach(b => b.disabled = App.busy || s.paso < 0 || s.fin);
    drawScene(); notify();
  }

  /* laboratorio del equipo: pantalla grande según la fase, servidores y escritorios */
  function drawScene() {
    const s = App.st, k = etapa(), svg = $('#scene');
    let h = `<rect width="600" height="330" fill="#eef5ee"/><rect y="250" width="600" height="80" fill="#cfd8cc"/><rect y="248" width="600" height="4" fill="#9aa89a"/>
      <rect x="150" y="14" width="300" height="150" rx="8" fill="#14261a" stroke="#475569" stroke-width="5"/>
      <text x="300" y="34" font-size="12" font-weight="800" text-anchor="middle" fill="#c8f7c5">${esc(k < FASES.length ? FASES[k].fase.toUpperCase() : 'PROYECTO ENTREGADO')}</text>`;
    const X = 160, Y = 44; // área útil de la pantalla: 280 × 110
    if (k === 0) h += [['🎯 Objetivo', 0], ['📏 Métrica', 1], ['🧭 Alcance', 2]].map(([t, i]) => `<rect x="${X + 10 + i * 90}" y="${Y + 20}" width="80" height="56" rx="4" fill="${['#fde68a', '#bbf7d0', '#bfdbfe'][i]}"/><text x="${X + 50 + i * 90}" y="${Y + 52}" font-size="11" font-weight="700" text-anchor="middle" fill="#1f2937">${t}</text>`).join('');
    if (k === 1) h += [0, 1, 2].map(i => `<ellipse cx="${X + 60 + i * 80}" cy="${Y + 30}" rx="28" ry="9" fill="#93c5fd"/><rect x="${X + 32 + i * 80}" y="${Y + 30}" width="56" height="44" fill="#60a5fa"/><ellipse cx="${X + 60 + i * 80}" cy="${Y + 74}" rx="28" ry="9" fill="#3b82f6"/>`).join('') + `<text x="${X + 270}" y="${Y + 100}" font-size="20" text-anchor="end">${s.priv >= 60 ? '🔐' : '🔓'}</text>`;
    if (k === 2) { for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const bad = (r * 7 + c * 3) % 5 === 0 && s.prec < 55; h += `<rect x="${X + 20 + c * 40}" y="${Y + 8 + r * 19}" width="38" height="17" fill="${bad ? '#fca5a5' : '#e2e8f0'}"/>`; } h += `<text x="${X + 270}" y="${Y + 106}" font-size="18" text-anchor="end">🧹</text>`; }
    if (k === 3) [40, 70, 55, 90, 30, 65].forEach((v, i) => { h += `<rect x="${X + 25 + i * 40}" y="${Y + 100 - v}" width="26" height="${v}" fill="${['#34d399', '#60a5fa', '#fbbf24', '#34d399', '#f87171', '#60a5fa'][i]}"/>`; });
    if (k === 4) { const L = [[X + 40, [30, 60, 90]], [X + 140, [20, 50, 80, 105]], [X + 240, [45, 75]]]; for (let a = 0; a < 2; a++) L[a][1].forEach(y1 => L[a + 1][1].forEach(y2 => { h += `<line x1="${L[a][0]}" y1="${Y + y1}" x2="${L[a + 1][0]}" y2="${Y + y2}" stroke="#4ade80" stroke-width=".8" opacity=".7"/>`; })); L.forEach(([x, ys]) => ys.forEach(y => { h += `<circle cx="${x}" cy="${Y + y}" r="7" fill="#bbf7d0" stroke="#16a34a"/>`; })); }
    if (k === 5) { const vp = Math.round(40 + s.prec * 0.5), e = Math.round(30 - s.prec * 0.25); [[vp, '#86efac'], [Math.max(2, e), '#fca5a5'], [Math.max(2, e + 3), '#fca5a5'], [vp + 12, '#86efac']].forEach(([v, c], i) => { const x = X + 70 + (i % 2) * 70, y = Y + 6 + Math.floor(i / 2) * 50; h += `<rect x="${x}" y="${y}" width="66" height="46" fill="${c}"/><text x="${x + 33}" y="${y + 29}" font-size="16" font-weight="800" text-anchor="middle" fill="#14261a">${v}</text>`; }); h += `<text x="${X + 30}" y="${Y + 60}" font-size="10" fill="#c8f7c5" text-anchor="middle">Real</text><text x="${X + 140}" y="${Y + 108}" font-size="10" fill="#c8f7c5" text-anchor="middle">Predicho</text>`; }
    if (k === 6) h += `<text x="${X + 90}" y="${Y + 78}" font-size="58" text-anchor="middle">⚖️</text><text x="${X + 200}" y="${Y + 78}" font-size="54" text-anchor="middle">🛡️</text><text x="${X + 140}" y="${Y + 104}" font-size="11" fill="#c8f7c5" text-anchor="middle">Equidad ${Math.round(s.equi)} % · Privacidad ${Math.round(s.priv)} %</text>`;
    if (k === 7) h += `<text x="${X + 140}" y="${Y + 62}" font-size="60" text-anchor="middle">☁️</text><text x="${X + 40}" y="${Y + 92}" font-size="11" fill="#c8f7c5">API ▸ /predecir</text><text x="${X + 270}" y="${Y + 92}" font-size="20" text-anchor="end">${s.caida ? '⚠️' : '✅'}</text>`;
    if (k >= 8) { let d = ''; [70, 62, 66, 50, 44, 48, 34, 28].forEach((v, i) => { d += (i ? ' L' : 'M') + (X + 20 + i * 34) + ' ' + (Y + v); }); h += `<path d="${d}" stroke="#4ade80" stroke-width="3" fill="none"/><path d="M${X + 20} ${Y + 72} L${X + 258} ${Y + 32}" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5 4" fill="none"/><text x="${X + 270}" y="${Y + 106}" font-size="${s.fin ? 13 : 11}" fill="#c8f7c5" text-anchor="end">${s.fin ? '✔ Entregado al cliente' : 'Real vs. predicción'}</text>`; }
    // servidores
    h += `<rect x="478" y="70" width="86" height="178" rx="4" fill="#334155"/>`;
    for (let i = 0; i < 6; i++) h += `<rect x="486" y="${80 + i * 27}" width="70" height="20" rx="2" fill="#1e293b"/><circle cx="545" cy="${90 + i * 27}" r="3.5" fill="${s.caida ? '#ef4444' : i % 2 ? '#22c55e' : '#84cc16'}"/><circle cx="534" cy="${90 + i * 27}" r="3.5" fill="${s.caida && i % 2 ? '#ef4444' : '#38bdf8'}"/>`;
    if (k >= 7 && !s.caida) h += `<text x="521" y="62" font-size="30" text-anchor="middle">☁️</text>`;
    if (s.caida) h += `<text x="521" y="62" font-size="30" text-anchor="middle">⚠️</text>`;
    // escritorios del equipo
    h += `<rect x="20" y="214" width="420" height="12" fill="#8a6a3b"/><rect x="30" y="226" width="8" height="24" fill="#6b4f2a"/><rect x="422" y="226" width="8" height="24" fill="#6b4f2a"/>`;
    const lider = s.paso >= 0 && !s.fin && FASES[s.paso] ? FASES[s.paso].lider : null;
    s.equipo.forEach((c, i) => { const x = 70 + i * 130; h += `<rect x="${x - 30}" y="176" width="60" height="38" rx="3" fill="#1f2937"/><rect x="${x - 26}" y="180" width="52" height="30" fill="${c.id === lider ? '#4ade80' : '#93c5fd'}" opacity=".8"/><text x="${x + 40}" y="214" font-size="34" text-anchor="middle">${c.avatar}</text>`; if (c.id === lider) h += `<text x="${x + 40}" y="174" font-size="16" text-anchor="middle">💬</text>`; });
    if (k === 0 || k >= 8) h += `<text x="460" y="246" font-size="40" text-anchor="middle">${App.proj.contacto.avatar}</text>`;
    h += `<text x="20" y="246" font-size="26">🪴</text>`;
    // línea de avance de las fases
    for (let i = 0; i < FASES.length; i++) { const x = 60 + i * 60; h += (i ? `<line x1="${x - 60}" y1="296" x2="${x}" y2="296" stroke="${i <= k ? '#16a34a' : '#94a3b8'}" stroke-width="3"/>` : '') + `<circle cx="${x}" cy="296" r="9" fill="${i < k ? '#16a34a' : i === k && !s.fin ? '#fbbf24' : '#e2e8f0'}" stroke="#475569"/><text x="${x}" y="300" font-size="10" font-weight="800" text-anchor="middle" fill="#1f2937">${i + 1}</text>`; }
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
    const opts = mezclar(p.o);
    const l = quien(p.lider);
    setDialog(`<span class="pill pill-soft">${esc(p.fase)}</span><p class="small muted">${l.avatar} ${esc(l.nombre)} lidera esta fase.</p><p><b>${esc(fill(p.q))}</b></p>`, opts.map(o => ({ label: esc(fill(o.t)), fn: () => choose(p, o, false) })));
    renderAll();
  }

  function choose(p, o, esEvento) {
    return busy(async () => {
      const s = App.st;
      let pts = o.p, fb = fill(o.fb), ef = o.ef || {};
      if (ef.cond === 'respaldo' && !s.respaldo) { pts = 1; fb += ' Sin embargo, como no había respaldo de los datos y del código, la restauración tardó dos días más.'; ef = { ...ef, dias: (ef.dias || 0) + 2, sat: (ef.sat || 0) - 6 }; }
      s.puntos += pts; s.max += 2;
      s.decisiones.push({ fase: esEvento ? 'Imprevisto' : p.fase, t: fill(o.t), p: pts, fb });
      if (esEvento) s.caida = false; else s.paso++;
      log((esEvento ? 'Imprevisto: ' : '') + fill(o.t), pts === 0 ? 'alerta' : 'docente');
      applyEffects(ef);
      renderAll();
      const color = pts === 2 ? 'var(--ok)' : pts === 1 ? 'var(--warn)' : 'var(--bad)';
      const voz = quien(esEvento ? p.quien : p.lider);
      setDialog(`<p><b>Tu decisión:</b> ${esc(fill(o.t))}</p><div class="case-fb" style="border-color:${color}"><b style="color:${color}">${pts === 2 ? 'Decisión adecuada' : pts === 1 ? 'Decisión parcialmente adecuada' : 'Decisión inadecuada'}</b><br>${esc(fb)}</div>`);
      await speak(pts === 0 && Math.random() < 0.6 ? '¿Estás seguro? Bueno, lo intentamos así.' : pts === 2 ? '¡De acuerdo, lo hacemos así!' : 'Está bien, aunque podríamos hacerlo mejor.', voz.pitch);
      const ev = esEvento ? null : maybeEvent();
      setDialog($('#dialog-text').innerHTML, [{ label: ev ? '⚠️ Atender el imprevisto' : (s.paso < FASES.length ? 'Continuar ▶' : 'Cerrar el proyecto'), cls: 'good', fn: () => {
        if (ev) return showEvent(ev);
        if (s.paso >= FASES.length) return finish();
        showStep();
      } }]);
    });
  }

  /* imprevistos: su probabilidad depende del nivel y solo aparecen en fases coherentes */
  const VENTANA = { faltantes: [2, 4], fuga: [2, 9], sobreajuste: [5, 6], requisitos: [2, 7], caida: [8, 9], sesgo: [6, 8], factura: [5, 9] };
  function maybeEvent() {
    const s = App.st;
    if (Math.random() > App.niv.ev) return null;
    const pool = EVENTOS.filter(e => !s.eventosUsados.has(e.id) && s.paso >= VENTANA[e.id][0] && s.paso <= VENTANA[e.id][1]);
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }
  async function showEvent(ev) {
    const s = App.st; s.eventosUsados.add(ev.id); if (ev.id === 'caida') s.caida = true;
    const q = quien(ev.quien);
    log('Imprevisto: ' + fill(ev.txt), 'evento');
    setDialog(`<span class="pill ia-pill">⚠️ Imprevisto</span><p class="small muted">${q.avatar} ${esc(q.nombre)} avisa:</p><p><b>${esc(fill(ev.txt))}</b></p><p class="small muted">¿Qué indicas?</p>`);
    App.busy = true; renderAll();
    await speak(ev.voz, q.pitch);
    App.busy = false;
    setDialog($('#dialog-text').innerHTML, mezclar(ev.o).map(o => ({ label: esc(fill(o.t)), fn: () => choose(ev, o, true) })));
    renderAll();
  }

  /* ---------- acciones generales ---------- */
  const FREE = {
    documentar: () => { App.st.registro++; log('Documentó avances, decisiones y versiones en el repositorio del proyecto.'); return { voz: '' }; },
    reunion: () => { const s = App.st; if (s.reuniones >= 3) { toast('El cliente ya tuvo suficientes reuniones; avanza con el trabajo.'); return null; } s.reuniones++; s.sat = clamp(s.sat + 5); pasarDias(1); log('Reunión virtual de seguimiento con el cliente: avances y próximos pasos.'); return { voz: 'Gracias por mantenernos informados.', pitch: App.proj.contacto.pitch }; },
    accesos: () => { const s = App.st; if (s.accesos >= 2) { toast('Los accesos ya fueron revisados recientemente.'); return null; } s.accesos++; s.priv = clamp(s.priv + 6); log('Revisó permisos, activó la autenticación multifactor y retiró accesos innecesarios.'); return { voz: 'Accesos revisados, todo con permisos mínimos.', pitch: EQUIPO[2].pitch }; },
    respaldo: () => { const s = App.st; if (s.respaldo) { toast('Ya existe un respaldo automático y control de versiones.'); return null; } s.respaldo = 1; s.gastado += 60; s.registro++; log('Configuró respaldos automáticos de los datos y control de versiones del código.'); return { voz: 'Respaldo configurado.', pitch: EQUIPO[1].pitch }; },
    apagar: () => { const s = App.st; if (s.ahorro) { toast('Los recursos sin uso ya se apagan automáticamente.'); return null; } s.ahorro = true; log('Apagó los recursos de nube sin uso y activó alertas de presupuesto.'); return { voz: 'Buena idea, así ahorramos cómputo.', pitch: EQUIPO[1].pitch }; },
    gpu: () => { const s = App.st; if (s.acelerar) { toast('La GPU adicional ya está reservada para la próxima fase.'); return null; } s.acelerar = true; log('Reservó una GPU adicional para la próxima fase.'); return { voz: 'Con más cómputo avanzaremos más rápido.', pitch: EQUIPO[1].pitch }; }
  };
  $$('[data-fa]').forEach(b => b.onclick = () => busy(async () => {
    const r = FREE[b.dataset.fa](); if (!r) return; renderAll();
    if (r.voz) await speak(r.voz, r.pitch || 1);
  }));

  /* ---------- evaluación ---------- */
  function finish() {
    window.Ia3D?.stopAll?.();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const s = App.st; s.fin = true; s.caida = false;
    const tecnica = (s.max ? s.puntos / s.max * 15 : 0) + s.prec / 100 * 10;
    const over = s.gastado / s.presupuesto - 1;
    const costo = over <= 0 ? 10 : clamp(10 - over * 40, 0, 10);
    const plazo = s.dia <= s.plazo ? 10 : clamp(10 - (s.dia - s.plazo) * 0.5, 0, 10);
    const doc = Math.min(3, s.registro) * 2 + (s.respaldo ? 2 : 0) + (s.revEtica ? 2 : 0);
    const crit = [
      { n: 'Calidad técnica del modelo', p: Math.round(tecnica), m: 25 },
      { n: 'Equidad y uso responsable', p: Math.round(s.equi / 100 * 15), m: 15 },
      { n: 'Privacidad y seguridad de los datos', p: Math.round(s.priv / 100 * 15), m: 15 },
      { n: 'Satisfacción del cliente', p: Math.round(s.sat / 100 * 15), m: 15 },
      { n: 'Presupuesto de cómputo', p: Math.round(costo), m: 10 },
      { n: 'Cumplimiento del plazo', p: Math.round(plazo), m: 10 },
      { n: 'Documentación y gestión', p: Math.round(doc), m: 10 }
    ];
    const total = clamp(crit.reduce((a, c) => a + c.p, 0));
    const rec = [];
    if (s.paso < FASES.length) rec.push(`El proyecto se cerró en la fase ${Math.max(1, s.paso + 1)} de ${FASES.length}. Completa todas las fases, desde el problema hasta la presentación.`);
    if (s.prec < 60) rec.push('Mejora la calidad del modelo: limpieza documentada, análisis exploratorio, modelo base y validación con datos no vistos.');
    if (s.equi < 60) rec.push('Mide las métricas por grupos y corrige los sesgos antes de desplegar; mantén revisión humana de los casos dudosos.');
    if (s.priv < 60) rec.push('Protege los datos personales: base legal y consentimiento (LOPDP), minimización, seudonimización, gestor de secretos y permisos mínimos.');
    if (!s.revEtica) rec.push('Incluye una revisión formal de IA responsable (equidad, privacidad e impacto) y una ficha del modelo.');
    if (s.registro < 3) rec.push('Documenta decisiones, transformaciones y versiones en el repositorio del proyecto.');
    if (!s.respaldo) rec.push('Configura respaldos automáticos y control de versiones: te protegen ante caídas y errores.');
    if (over > 0) rec.push(`El costo superó el presupuesto en ${Math.round(over * 100)} %. Apaga recursos sin uso y elige modelos proporcionales al problema.`);
    if (s.dia > s.plazo) rec.push(`El proyecto se atrasó ${s.dia - s.plazo} días. Gestiona el alcance y prioriza con el cliente.`);
    if (s.sat < 60) rec.push('Comunica avances con regularidad y presenta resultados y limitaciones en lenguaje sencillo.');
    s.decisiones.filter(d => d.p === 0).slice(0, 3).forEach(d => rec.push(`${d.fase}: ${d.fb}`));
    if (!rec.length) rec.push('¡Excelente gestión del proyecto de IA! Mantén estas prácticas responsables.');
    saveHistory('Proyecto de IA · ' + App.niv.nombre, App.proj.nombre, total);
    $('#report').innerHTML = scoreHead('Evaluación del proyecto de IA', `${App.proj.cliente} · ${App.proj.nombre} · Nivel ${App.niv.nombre} · ${App.cfg.name || 'Estudiante'}`, total) + `
      <div class="kpis">
        <div class="kpi"><b>${Math.round(s.prec)}%</b><span>Precisión del modelo</span></div>
        <div class="kpi"><b>${usd(s.gastado)}</b><span>Costo de cómputo (presupuesto ${usd(s.presupuesto)})</span></div>
        <div class="kpi"><b>${s.dia} días</b><span>Duración (plazo ${s.plazo})</span></div>
        <div class="kpi"><b>${Math.round(s.sat)}%</b><span>Satisfacción del cliente</span></div>
      </div>
      <div class="report-grid">
        <div class="card"><h2>Rúbrica</h2>${crit.map(c => `<div class="crit"><div class="crit-top"><span>${c.n}</span><span>${c.p}/${c.m}</span></div><div class="crit-bar"><i style="width:${c.p / c.m * 100}%"></i></div></div>`).join('')}</div>
        <div class="card"><h2>Recomendaciones</h2><ul class="rec">${rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        <div class="card" style="grid-column:1/-1"><h2>Tus decisiones</h2><ol>${s.decisiones.map(d => `<li><p><b>${d.p === 2 ? '✔' : d.p === 1 ? '◐' : '✘'} ${esc(d.fase)}:</b> ${esc(d.t)}</p><p class="small muted">${esc(d.fb)}</p></li>`).join('')}</ol></div>
        <details class="card" style="grid-column:1/-1"><summary><b>📜 Bitácora del proyecto (${s.log.length} registros)</b></summary><ol class="log" style="max-height:none">${s.log.map(l => `<li class="t-${l.tipo}"><b>Día ${l.d}</b> ${esc(l.txt)}</li>`).join('')}</ol></details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary ia-btn" id="rp-again">🔁 Repetir el proyecto</button>
        <button class="btn" id="rp-new">🎚️ Cambiar cliente o nivel</button>
        <button class="btn" id="rp-print">🖨️ Imprimir / guardar PDF</button>
        <button class="btn" id="rp-menu">🏠 Menú principal</button>
      </div>`;
    $('#rp-again').onclick = startProyecto;
    $('#rp-new').onclick = () => { renderSetup(); show('setup'); };
    $('#rp-print').onclick = () => window.print();
    $('#rp-menu').onclick = () => show('hub');
    show('report');
  }
  $('#btn-end').onclick = () => { if (App.busy) return; if (confirm('¿Deseas terminar el proyecto y ver tu evaluación?')) finish(); };

  /* ================== LABORATORIO E IA RESPONSABLE ================== */
  function openQuiz(tipo) {
    const banco = tipo === 'lab' ? LAB_BANCO : RESP_BANCO;
    const nCalc = tipo === 'lab' ? 8 : 0;
    const calc = nCalc ? mezclar(banco.slice(-nCalc)).slice(0, 4) : [];
    const mcs = mezclar(nCalc ? banco.slice(0, -nCalc) : banco).slice(0, 10 - calc.length);
    const qs = mcs.concat(calc).map(f => f());
    const st = { i: 0, ok: 0, res: [] }, body = $(`#${tipo}-body`), titulo = tipo === 'lab' ? 'Laboratorio de programación y datos' : 'IA responsable y seguridad';
    const render = () => {
      const q = qs[st.i];
      body.innerHTML = `<div class="card"><div class="lab-top"><span class="pill pill-soft">Pregunta ${st.i + 1}/${qs.length}</span><span class="small muted">${esc(subj(q.asig).n)}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.num !== undefined ? `<div class="lab-num"><input class="q-in" inputmode="decimal" placeholder="Tu respuesta"><button class="btn btn-primary ia-btn q-ok">Comprobar</button></div>` : `<div class="dialog-choices">${q.o.map((o, i) => `<button class="btn" data-o="${i}">${esc(o)}</button>`).join('')}</div>`}
        <div class="q-fb"></div></div>`;
      const answer = good => {
        if (good) st.ok++; st.res.push({ q: q.q, good, exp: q.exp });
        $('.q-fb', body).innerHTML = `<div class="case-fb" style="border-color:${good ? 'var(--ok)' : 'var(--bad)'}"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Incorrecto'}</b><br>${esc(q.exp)}</div>
          <button class="btn btn-primary ia-btn q-next">${st.i + 1 < qs.length ? 'Siguiente ▶' : 'Ver resultado'}</button>`;
        $('.q-next', body).onclick = () => { st.i++; if (st.i < qs.length) render(); else done(); };
      };
      if (q.num !== undefined) $('.q-ok', body).onclick = () => { const v = parseFloat($('.q-in', body).value.replace(/[%$\s]/g, '').replace(',', '.')); if (isNaN(v)) return toast('Escribe un número.'); $('.q-ok', body).disabled = true; answer(Math.abs(v - q.num) <= q.tol + 1e-9); };
      else $$('[data-o]', body).forEach(b => b.onclick = () => { $$('[data-o]', body).forEach(x => { x.disabled = true; if (+x.dataset.o === q.c) x.classList.add('good'); }); if (+b.dataset.o !== q.c) b.classList.add('bad'); answer(+b.dataset.o === q.c); });
    };
    const done = () => {
      const total = Math.round(st.ok / qs.length * 100);
      body.innerHTML = scoreHead(titulo, `${st.ok} de ${qs.length} respuestas correctas`, total) + `
        <div class="card"><h2>Repaso</h2><ol>${st.res.map(r => `<li><p><b>${r.good ? '✔' : '✘'}</b> ${esc(r.q)}</p><p class="small muted">${esc(r.exp)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary ia-btn q-again">🔁 Nueva sesión</button><button class="btn q-menu">🏠 Menú principal</button></div>`;
      $('.q-again', body).onclick = () => openQuiz(tipo); $('.q-menu', body).onclick = () => show('hub');
      saveHistory(tipo === 'lab' ? 'Laboratorio' : 'IA responsable', titulo, total);
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
        const ms = MALLA_IA.filter(m => m.pao === pao && lista.some(x => x.cod === m.cod));
        return ms.length ? `<h3 class="asig-pao">PAO ${pao}</h3><div class="topic-list">${ms.map(m => { const c = lista.find(x => x.cod === m.cod); return `<button class="choice" data-asig="${m.cod}"><span class="em">${c.persona.avatar}</span><span><b>${esc(m.n)}</b><small>${esc(c.titulo)}</small><small class="tags">${esc(c.objetivo || c.persona.rol)}</small><small class="muted">PAO ${m.pao} · también en: ${m.mod.filter(k => MODS[k]).map(k => MODS[k].emoji + ' ' + MODS[k].nombre).join(' · ')}</small></span></button>`; }).join('')}</div>` : '';
      }).join('');
    $$('[data-asig]').forEach(b => b.onclick = () => playCase(lista.find(x => x.cod === b.dataset.asig)));
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
    const b = cod && document.querySelector(`[data-asig="${cod}"]`); if (b) b.click();
  }

  function openCases(cod) {
    $('#screen-cases h1').textContent = 'Casos profesionales';
    const list = cod ? CASOS_IA.filter(c => c.asignaturas.includes(cod)) : CASOS_IA;
    $('#cases-list').innerHTML = (cod ? `<p class="muted">Casos relacionados con <b>${esc(subj(cod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASOS_IA.find(c => c.id === b.dataset.case)));
    if (cod) $('#cases-all').onclick = () => openCases();
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
  }
  function sayLine(c, t) { return /^\(.*\)$/.test(t) ? `<div class="case-say"><i>${esc(t.slice(1, -1))}</i></div>` : `<div class="case-say"><b>${esc(c.persona.nombre)}:</b> “${esc(t)}”</div>`; }
  function playCase(c) {
    // situación simulada: actuar en la escena y responder hablando o escribiendo
    if (window.CasoVivo) {
      $('#cases-list').hidden = true; $('#case-player').hidden = false;
      const ok = CasoVivo.play(c, { P: $('#case-player'), btn: 'btn-primary ia-btn', speak: speak, toast: toast, scoreHead,
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
          <button class="btn btn-primary ia-btn" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else end(); };
        speak(o.r, c.persona.pitch);
      });
      speak(paso.dice, c.persona.pitch);
    };
    const end = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary ia-btn" id="case-again">🔁 Repetir</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" id="case-menu">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c); $('#case-list').onclick = () => openCases(); $('#case-menu').onclick = () => show('hub');
      saveHistory('Casos', c.titulo, total); window.scrollTo(0, 0);
    };
    step(); window.scrollTo(0, 0);
  }

  /* ================== MAPA ================== */
  function openMapa() {
    $('#mapa-grid').innerHTML = [1, 2, 3, 4].map(pao => `<div class="mapa-col"><h3 class="ia-h3">PAO ${pao}</h3>${MALLA_IA.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${m.mod.map(k => MODS[k].emoji).join(' ')} · ${m.cod}</small></button>`).join('')}</div>`).join('');
    $$('[data-cod]').forEach(b => b.onclick = () => {
      const m = subj(b.dataset.cod), casos = CASOS_IA.filter(c => c.asignaturas.includes(m.cod));
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
  App.etapa = etapa;
  App.escena = () => {
    const s = App.st; if (!s) return null;
    const k = etapa(), lider = s.paso >= 0 && !s.fin && FASES[s.paso] ? FASES[s.paso].lider : null;
    return { etapa: k, total: FASES.length, fase: k < FASES.length ? FASES[k].fase : 'Proyecto entregado', fin: s.fin, caida: s.caida, nube: k >= 7,
      prec: s.prec, equi: s.equi, priv: s.priv, sat: s.sat, dia: s.dia, cliente: App.proj.cliente,
      contacto: (k === 0 || k >= 8) ? App.proj.contacto.avatar : null,
      equipo: s.equipo.map(c => ({ avatar: c.avatar, lider: c.id === lider })) };
  };
})();
