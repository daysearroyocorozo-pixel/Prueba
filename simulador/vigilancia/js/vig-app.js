/* =========================================================
   Simulador de Vigilancia y Seguridad Ciudadana – Carrera de
   Vigilancia y Seguridad Ciudadana (ISTCY). Controlador de la
   interfaz: turno de vigilancia con incidentes, protocolos y
   legislación, análisis del delito, casos y mapa curricular.
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
  const subj = cod => MALLA_VIG.find(m => m.cod === cod);
  const TURNO = 480; // 14:00 a 22:00
  const hora = t => { const m = 840 + Math.round(t); return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };

  const App = { cfg: store.get('vig-cfg', { name: '', inst: '', voice: true }), niv: NIVELES[0], sec: SECTORES[0], st: null, busy: false, listeners: [] };
  window.VigApp = App;

  /* ================== utilidades ================== */
  function show(s) { $$('.screen').forEach(x => x.hidden = x.id !== 'screen-' + s); window.scrollTo(0, 0); }
  let tt; function toast(m, ms = 2800) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, ms); }
  App.toast = toast;
  function applyTheme(th) { if (th) document.documentElement.setAttribute('data-theme', th); else document.documentElement.removeAttribute('data-theme'); }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => { const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const n = cur === 'dark' ? 'light' : 'dark'; applyTheme(n); store.set('aula-theme', n); };
  const syncSound = () => { $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇'; };
  $('#btn-sound').onclick = () => { App.cfg.voice = !App.cfg.voice; store.set('vig-cfg', App.cfg); syncSound(); if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel(); };
  syncSound();
  $$('[data-go]').forEach(b => b.onclick = () => { window.Vig3D?.stopAll?.(); show(b.dataset.go); });

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
      <div class="score"><div class="score-ring vig-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }
  function saveHistory(modulo, titulo, total) {
    const h = store.get('vig-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, modulo, titulo, total });
    store.set('vig-history', h.slice(0, 50));
    window.ISTY?.registrar('resultado', { modulo, titulo, total });
  }

  /* ================== INICIO Y MENÚ ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst; $('#f-voice').checked = App.cfg.voice;
  const syncBrand = () => { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Vigilancia y Seguridad Ciudadana'; };
  syncBrand();
  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, { name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(), voice: $('#f-voice').checked });
    store.set('vig-cfg', App.cfg); syncSound(); syncBrand();
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
    if (k === 'turno') { renderSetup(); show('setup'); }
    if (k === 'pro') openQuiz('pro');
    if (k === 'ana') openQuiz('ana');
    if (k === 'casos') openCases(cod);
    if (k === 'asig') openAsig(cod);
    if (k === 'mapa') openMapa();
  }
  $('#btn-history').onclick = () => {
    const h = store.get('vig-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.titulo)}</b><br><span class="muted small">${esc(e.modulo)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no hay prácticas registradas.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('vig-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== PREPARAR TURNO ================== */
  function renderSetup() {
    $('#sec-list').innerHTML = SECTORES.map(s => `<button class="choice" data-sec="${s.id}" aria-pressed="${App.sec.id === s.id}"><span class="em">${s.emoji}</span><span><b>${esc(s.nombre)}</b><small>${esc(s.desc)}</small></span></button>`).join('');
    $('#niv-list').innerHTML = NIVELES.map(n => `<button class="choice" data-niv="${n.id}" aria-pressed="${App.niv.id === n.id}"><span class="em">${n.emoji}</span><span><b>${n.nombre}</b><small>${esc(n.desc)}</small><small>Un incidente cada ~${n.llegada} min · se agrava tras ${n.limite} min</small></span></button>`).join('');
    $('#inc-preview').innerHTML = INCIDENTES.map(c => `<div class="mini-student"><div class="av">${c.icono}</div><b>${esc(c.nombre)}</b><div class="tag">${c.prio ? '🔴 Prioridad alta' : '🟡 Prioridad media'}</div></div>`).join('');
    $$('[data-sec]').forEach(b => b.onclick = () => { App.sec = SECTORES.find(s => s.id === b.dataset.sec); renderSetup(); });
    $$('[data-niv]').forEach(b => b.onclick = () => { App.niv = NIVELES.find(n => n.id === b.dataset.niv); renderSetup(); });
  }
  $('#btn-start').onclick = () => startTurno();

  /* ================== MOTOR DEL TURNO ================== */
  function startTurno() {
    const n = App.niv;
    // siempre al menos tres incidentes de prioridad alta
    const prio = mezclar(INCIDENTES.filter(c => c.prio)).slice(0, 3), resto = mezclar(INCIDENTES.filter(c => !prio.includes(c)));
    const lista = mezclar(prio.concat(resto.slice(0, n.n - 3)));
    App.st = {
      t: 0, llegadas: lista.map((c, i) => ({ c, llega: Math.max(0, Math.round(10 + i * n.llegada + (i ? rndI(-5, 5) : 0))) })), cola: [], actual: null,
      atendidos: [], escalados: [], puntos: 0, max: 0, faltas: 0, fuerza: 0, prioFaltas: 0, doc: 0,
      seg: 70, conf: 60, riesgo: 10, apoyo: 0, radios: 0, comites: 0, rondas: 0, camaras: 0,
      decisiones: [], usados: new Set(), log: [], fin: false, abierta: false
    };
    $('#turno-niv').textContent = 'Nivel ' + n.nombre;
    $('#turno-sec').textContent = App.sec.emoji + ' ' + App.sec.corto;
    show('turno'); renderAll();
    setDialog(`<span class="who">📋 Tu puesto:</span> Eres <b>agente de vigilancia y seguridad</b> en el sector <b>${esc(App.sec.nombre)}</b> (Puyo). El turno va de 14:00 a 22:00. Hoy se presentarán <b>${n.n} incidentes</b> y el supervisor puede darte consignas. Actúa según el protocolo, con uso proporcional de la fuerza, respeto a los derechos humanos, coordinación con el ECU 911 y la Policía Nacional, y registra cada novedad.`,
      [{ label: '🛡️ Tomar el puesto y recibir la consigna', cls: 'good', fn: () => { App.st.abierta = true; log(`Inicio del turno en ${App.sec.nombre}. Recibe la consigna y el equipo (radio, linterna, botiquín).`); avanzar(0); turno(); } }]);
    speak('Buenas tardes. Inicia el turno de vigilancia. Revise su radio y su equipo.', 1.0);
  }
  function log(txt, tipo = 'docente') { App.st.log.push({ t: App.st.t, txt, tipo }); }
  const espera = q => App.st.t - q.llega;
  const limite = () => App.niv.limite;

  /* el reloj avanza: llegan incidentes; los pendientes bajan la seguridad y pueden agravarse */
  function avanzar(min) {
    const s = App.st;
    s.t = Math.min(TURNO, s.t + min);
    s.riesgo = clamp(s.riesgo + min * 0.03);
    while (s.llegadas.length && s.llegadas[0].llega <= s.t) { const q = s.llegadas.shift(); s.cola.push(q); log(`Reporte: ${q.c.nombre} (${q.c.quien}).`, 'evento'); }
    s.cola.forEach(q => { if (espera(q) > limite() * 0.5) s.seg = clamp(s.seg - min * (q.c.prio ? 0.08 : 0.04)); });
    s.cola = s.cola.filter(q => {
      if (espera(q) <= limite()) return true;
      s.escalados.push(q.c); s.seg = clamp(s.seg - (q.c.prio ? 12 : 8)); s.conf = clamp(s.conf - 6);
      log(`El incidente «${q.c.nombre}» se agravó tras ${Math.round(espera(q))} min sin atención; otras unidades tuvieron que intervenir.`, 'alerta'); toast(`⚠️ Se agravó: ${q.c.nombre}.`);
      return false;
    });
  }
  function factorTiempo() { const s = App.st; let f = 1; if (s.apoyo > 0) f *= 0.75; if (s.riesgo > 60) f *= 1.15; return f; }
  function aplicar(ef = {}) {
    const s = App.st;
    if (ef.seg) s.seg = clamp(s.seg + ef.seg);
    if (ef.conf) s.conf = clamp(s.conf + ef.conf);
    if (ef.riesgo) s.riesgo = clamp(s.riesgo + ef.riesgo * (s.apoyo > 0 && ef.riesgo > 0 ? 0.5 : 1));
    if (ef.doc) s.doc += ef.doc;
    if (ef.falta) s.faltas += ef.falta;
    if (ef.fuerza) s.fuerza += ef.fuerza;
  }

  /* ---------- render ---------- */
  const gc = (v, inv) => { const x = inv ? 100 - v : v; return x > 66 ? 'var(--bad)' : x > 33 ? 'var(--warn)' : 'var(--ok)'; };
  const legalidad = () => clamp(100 - App.st.faltas * 20 - App.st.fuerza * 10);
  function renderAll() {
    const s = App.st; if (!s) return;
    $('#turno-clock').textContent = hora(s.t);
    $('#turno-fase').textContent = s.fin ? 'Turno finalizado' : !s.abierta ? 'Antes de tomar el puesto' : `Atendidos ${s.atendidos.length} · Pendientes ${s.cola.length}`;
    const lg = legalidad(), docP = Math.min(100, s.doc * 10);
    const g = [
      { n: '🕑 Turno', v: s.t / TURNO * 100, c: 'var(--primary)', l: `${hora(s.t)} de 22:00` },
      { n: '🛡️ Seguridad del sector', v: s.seg, c: gc(s.seg, true), l: Math.round(s.seg) + '%' },
      { n: '🤝 Confianza ciudadana', v: s.conf, c: gc(s.conf, true), l: Math.round(s.conf) + '%' },
      { n: '⚖️ Legalidad y DD. HH.', v: lg, c: gc(lg, true), l: s.faltas || s.fuerza ? `${s.faltas} falta(s)${s.fuerza ? ' · ' + s.fuerza + ' fuerza excesiva' : ''}` : 'Sin faltas' },
      { n: '⚠️ Riesgo personal', v: s.riesgo, c: gc(s.riesgo), l: Math.round(s.riesgo) + '%' },
      { n: '📝 Registro documental', v: docP, c: 'var(--primary)', l: `${s.doc} registro(s)` }
    ];
    $('#gauges').innerHTML = g.map(x => `<div class="gauge"><div class="gauge-top"><span>${x.n}</span><b>${x.l}</b></div><div class="gauge-bar"><i style="width:${clamp(x.v)}%;background:${x.c}"></i></div></div>`).join('');
    $('#cola').innerHTML = s.cola.length ? s.cola.map(q => `<div class="unit ${q.c.prio ? 'prio' : 'media'}"><span class="u-av">${q.c.icono}</span><div><b>${esc(q.c.nombre)}</b><small>${q.c.prio ? '🔴 Prioridad alta · ' : '🟡 Prioridad media · '}${esc(q.c.quien)} · espera ${Math.round(espera(q))} min</small></div></div>`).join('') : `<p class="muted small">${s.llegadas.length ? 'No hay incidentes pendientes por ahora.' : 'No se esperan más reportes en este turno.'}</p>`;
    $('#log').innerHTML = s.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('');
    $$('[data-fa]').forEach(b => b.disabled = App.busy || !s.abierta || s.fin || !!s.actual);
    drawScene(); notify();
  }

  /* vista 2D del sector: plaza con caseta, cámaras, bancas y personas */
  const PROP = { parque: '⛲', mercado: '🧺', escuela: '🏫', comercial: '🏬' };
  const SPOTS = [[250, 300], [420, 300], [520, 250], [190, 225], [470, 200], [350, 200]];
  function drawScene() {
    const s = App.st, svg = $('#scene'), sec = App.sec;
    let h = `<rect width="600" height="330" fill="#cfe8f7"/><path d="M0 150 Q150 120 300 145 T600 135 V190 H0Z" fill="#7cbf5a"/>
      <rect y="185" width="600" height="145" fill="#d6d3d1"/><path d="M0 185 H600" stroke="#a8a29e" stroke-width="3"/>
      <rect x="160" y="18" width="280" height="56" rx="8" fill="#fff" stroke="#1B4D22" stroke-width="2"/>
      <text x="300" y="40" font-size="14" font-weight="800" text-anchor="middle" fill="#1B4D22">${esc(sec.nombre.toUpperCase())}</text>
      <text x="300" y="62" font-size="12" text-anchor="middle" fill="#334155">Puyo · Turno de vigilancia</text>
      <circle cx="545" cy="48" r="32" fill="#fff" stroke="#334155" stroke-width="3"/><text x="545" y="54" font-size="16" font-weight="800" text-anchor="middle" fill="#334155">${hora(s.t)}</text>
      <text x="300" y="175" font-size="46" text-anchor="middle">${PROP[sec.id] || '⛲'}</text>
      <text x="150" y="160" font-size="40">🌳</text><text x="400" y="160" font-size="40">🌴</text><text x="575" y="180" font-size="34" text-anchor="middle">🌳</text>
      <rect x="20" y="120" width="110" height="105" rx="6" fill="#1B4D22"/><path d="M12 124 L75 92 L138 124Z" fill="#2E8B2E"/>
      <rect x="34" y="140" width="82" height="34" rx="4" fill="#e0f2fe" stroke="#94a3b8"/><text x="75" y="198" font-size="11" font-weight="800" text-anchor="middle" fill="#fff">SEGURIDAD</text>
      <text x="75" y="167" font-size="20" text-anchor="middle">📻</text>
      <line x1="200" y1="190" x2="200" y2="100" stroke="#475569" stroke-width="4"/><text x="200" y="102" font-size="20" text-anchor="middle">📹</text>
      <line x1="500" y1="190" x2="500" y2="100" stroke="#475569" stroke-width="4"/><text x="500" y="102" font-size="20" text-anchor="middle">📹</text>
      <rect x="150" y="268" width="70" height="8" rx="3" fill="#92400e"/><rect x="156" y="276" width="5" height="12" fill="#78350f"/><rect x="209" y="276" width="5" height="12" fill="#78350f"/>
      <rect x="380" y="268" width="70" height="8" rx="3" fill="#92400e"/><rect x="386" y="276" width="5" height="12" fill="#78350f"/><rect x="439" y="276" width="5" height="12" fill="#78350f"/>
      <text x="565" y="300" font-size="26" text-anchor="middle">🚶🏽‍♀️</text><text x="140" y="315" font-size="24" text-anchor="middle">🧍🏻</text>`;
    if (s.seg < 40) h += `<rect x="0" y="0" width="600" height="330" fill="#7f1d1d" opacity=".12"/>`;
    s.cola.slice(0, SPOTS.length).forEach((q, i) => {
      const [x, y] = SPOTS[i];
      h += `<text x="${x}" y="${y}" font-size="30" text-anchor="middle">${q.c.icono}</text><text x="${x + 16}" y="${y - 26}" font-size="14">${q.c.prio ? '🔴' : '🟡'}</text>`;
      if (espera(q) > limite() * 0.6) h += `<text x="${x - 20}" y="${y - 26}" font-size="14">⚠️</text>`;
    });
    if (s.actual) h += `<text x="330" y="260" font-size="42" text-anchor="middle">${s.actual.c.icono}</text><text x="290" y="262" font-size="46" text-anchor="middle">👮🏽</text><text x="372" y="262" font-size="36" text-anchor="middle">${s.actual.c.avatar}</text>
      <path d="M300 196 h70 a8 8 0 0 1 8 8 v18 a8 8 0 0 1 -8 8 h-44 l-10 10 v-10 h-16 a8 8 0 0 1 -8 -8 v-18 a8 8 0 0 1 8 -8z" fill="#fff" stroke="#1B4D22"/><text x="335" y="219" font-size="15" text-anchor="middle">💬</text>`;
    else h += `<text x="155" y="240" font-size="42" text-anchor="middle">👮🏽</text>`;
    if (!s.abierta && !s.fin) h += `<rect x="20" y="200" width="110" height="26" fill="#b45309"/><text x="75" y="218" font-size="12" font-weight="800" text-anchor="middle" fill="#fff">SIN RELEVO</text>`;
    if (s.fin) h += `<rect x="20" y="200" width="110" height="26" fill="#334155"/><text x="75" y="218" font-size="12" font-weight="800" text-anchor="middle" fill="#fff">FIN DEL TURNO</text>`;
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
  const fbBox = (o, tit) => { const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)'; return `<div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? tit[0] : o.p === 1 ? tit[1] : tit[2]}</b><br>${esc(o.fb)}</div>`; };

  /* decide qué ocurre a continuación: atender un incidente, esperar o cerrar */
  function turno() {
    const s = App.st; s.actual = null; s.enCola = true;
    if (s.t >= TURNO) { log('Son las 22:00: fin del turno y entrega del puesto.'); return cerrar(); }
    if (!s.cola.length && !s.llegadas.length) return cerrar();
    renderAll();
    if (!s.cola.length) {
      const sig = s.llegadas[0];
      const tareas = TAREAS.filter(x => !s.usados.has(x.id));
      const ops = [{ label: `⏳ Mantener la vigilancia hasta el próximo reporte (≈ ${hora(sig.llega)})`, fn: () => { avanzar(Math.max(1, sig.llega - s.t)); turno(); } }];
      if (tareas.length) ops.unshift({ label: '📋 Cumplir una consigna del supervisor mientras tanto', cls: 'good', fn: () => mostrarNovedad(tareas[Math.floor(Math.random() * tareas.length)]) });
      return setDialog('<p><b>No hay incidentes pendientes.</b></p><p class="small muted">Puedes cumplir una consigna, usar las acciones generales (ronda, cámaras, radio, registro, comité) o mantener la vigilancia.</p>', ops);
    }
    const hayPrio = s.cola.some(q => q.c.prio);
    setDialog(`<p><b>Incidentes pendientes: ${s.cola.length}.</b> ¿Cuál atiendes primero?</p>${hayPrio ? '<p class="small">🔴 Hay incidentes que comprometen la vida o la integridad de personas.</p>' : ''}`,
      s.cola.map(q => ({ label: `${q.c.icono} Atender: ${esc(q.c.nombre)} <small>(${q.c.prio ? '🔴 prioridad alta' : '🟡 prioridad media'} · ${esc(q.c.quien)} · espera ${Math.round(espera(q))} min)</small>`, fn: () => llamar(q) })));
  }

  function llamar(q) {
    return busy(async () => {
      const s = App.st; s.enCola = false;
      if (!q.c.prio && s.cola.some(x => x.c.prio)) { s.prioFaltas++; log(`Atendió «${q.c.nombre}» antes que un incidente de prioridad alta.`, 'alerta'); toast('⚠️ Había un incidente de prioridad alta pendiente.'); }
      s.cola = s.cola.filter(x => x !== q); s.actual = q; q.llamado = s.t; q.pts = 0;
      log(`Acude a: ${q.c.nombre}.`);
      renderAll();
      setDialog(`<span class="who">${q.c.avatar} ${esc(q.c.quien)} <small class="muted">· ${q.c.icono} ${esc(q.c.perfil)}${q.c.prio ? ' · 🔴 prioridad alta' : ''}</small></span><p>“${esc(q.c.dice)}”</p>`);
      await speak(q.c.dice, q.c.pitch);
      setDialog($('#dialog-text').innerHTML + `<p class="small muted">${esc(q.c.pasos[0].txt)}</p>`, mezclar(q.c.pasos[0].o).map(o => ({ label: esc(o.t), fn: () => atender(q, o, 0) })));
    });
  }

  function atender(q, o, k) {
    return busy(async () => {
      const s = App.st, ef = o.ef || {};
      s.puntos += o.p; s.max += 2; q.pts += o.p;
      aplicar(ef);
      if (ef.falta) log('Falta a la legalidad o a los derechos humanos: ' + o.t, 'alerta');
      if (ef.fuerza) log('Uso desproporcionado de la fuerza.', 'alerta');
      s.decisiones.push({ fase: q.c.nombre + (k ? ' · cierre' : ' · actuación inicial'), t: o.t, p: o.p, fb: o.fb });
      log(`${q.c.nombre}: ${o.t}`, o.p === 0 ? 'alerta' : 'docente');
      avanzar(Math.round((ef.min || 0) * factorTiempo()));
      renderAll();
      const html = `<p><b>Tu actuación:</b> ${esc(o.t)}</p>${fbBox(o, ['Actuación conforme al protocolo', 'Actuación parcialmente adecuada', 'Actuación inadecuada'])}`;
      if (k === 0) {
        setDialog(html);
        await speak(o.p === 2 ? 'Gracias, agente.' : o.p === 1 ? 'Bueno…' : '¡Eso no está bien!', q.c.pitch);
        const p2 = q.c.pasos[1];
        setDialog(html, [{ label: 'Continuar ▶', cls: 'good', fn: () => segundoMomento(q, p2) }]);
        return;
      }
      // cierre del incidente
      const esperado = Math.max(0, q.llamado - q.llega);
      s.atendidos.push({ c: q.c, pts: q.pts, espera: esperado });
      if (s.apoyo > 0) s.apoyo--;
      setDialog(html + `<p class="small muted">Incidente cerrado: ${q.pts}/4 puntos · tiempo de respuesta ${Math.round(esperado)} min.</p>`);
      await speak(q.pts >= 3 ? 'Muchas gracias por su ayuda, agente.' : q.pts >= 2 ? 'Gracias.' : 'No me sentí bien atendido.', q.c.pitch);
      s.actual = null; renderAll();
      const ev = maybeEvent(); s.enCola = false;
      setDialog($('#dialog-text').innerHTML, [{ label: ev ? '⚠️ Atender la novedad' : 'Continuar ▶', cls: 'good', fn: () => ev ? mostrarNovedad(ev) : turno() }]);
    });
  }
  function segundoMomento(q, p2) {
    return busy(async () => {
      setDialog(`<span class="who">${q.c.avatar} ${esc(q.c.quien)} <small class="muted">· ${q.c.icono} ${esc(q.c.nombre)} · cierre</small></span><p>${/^\(.*\)$/.test(p2.dice) ? `<i>${esc(p2.dice.slice(1, -1))}</i>` : '“' + esc(p2.dice) + '”'}</p>`);
      await speak(p2.dice, q.c.pitch);
      setDialog($('#dialog-text').innerHTML + '<p class="small muted">¿Qué haces ahora?</p>', mezclar(p2.o).map(o => ({ label: esc(o.t), fn: () => atender(q, o, 1) })));
    });
  }

  function maybeEvent() {
    const s = App.st;
    if (s.t >= TURNO || Math.random() > App.niv.ev) return null;
    const pool = TAREAS.concat(EVENTOS).filter(e => !s.usados.has(e.id));
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }
  function mostrarNovedad(ev) {
    return busy(async () => {
      const s = App.st; s.usados.add(ev.id); s.enCola = false;
      const esTarea = !!ev.titulo;
      log((esTarea ? 'Consigna: ' : 'Imprevisto: ') + (ev.titulo || ev.txt), 'evento');
      setDialog(`<span class="pill vig-pill">${esTarea ? '📋 Consigna · ' + esc(ev.titulo) : '⚠️ Imprevisto'}</span>${esTarea ? `<p class="small muted">${esc(ev.quien)}</p>` : ''}<p><b>${esc(ev.txt)}</b></p>`);
      await speak(ev.voz, esTarea ? 0.95 : 1);
      setDialog($('#dialog-text').innerHTML + '<p class="small muted">¿Qué haces?</p>', mezclar(ev.o).map(o => ({ label: esc(o.t), fn: () => resolver(ev, o) })));
    });
  }
  function resolver(ev, o) {
    return busy(async () => {
      const s = App.st, ef = o.ef || {};
      s.puntos += o.p; s.max += 2;
      aplicar(ef);
      if (ef.falta) log('Falta: ' + o.t, 'alerta');
      s.decisiones.push({ fase: ev.titulo || 'Imprevisto', t: o.t, p: o.p, fb: o.fb });
      log(o.t, o.p === 0 ? 'alerta' : 'docente');
      avanzar(Math.round((ef.min || 0) * factorTiempo()));
      renderAll();
      setDialog(`<p><b>Tu decisión:</b> ${esc(o.t)}</p>${fbBox(o, ['Decisión adecuada', 'Decisión parcialmente adecuada', 'Decisión inadecuada'])}`,
        [{ label: 'Continuar ▶', cls: 'good', fn: () => turno() }]);
    });
  }

  /* ---------- acciones generales ---------- */
  const FREE = {
    patrullar: () => { const s = App.st; s.rondas++; s.seg = clamp(s.seg + (s.rondas <= 3 ? 6 : 2)); s.conf = clamp(s.conf + 2); avanzar(10); log('Realizó una ronda preventiva a pie por el sector.'); return { voz: 'Buenas tardes, agente.' }; },
    camaras: () => {
      const s = App.st; s.camaras++; avanzar(3);
      if (s.camaras <= 4 && s.llegadas.length && s.llegadas[0].llega - s.t <= 40) { const q = s.llegadas.shift(); q.llega = s.t; s.cola.push(q); s.seg = clamp(s.seg + 3); log(`Detectó por cámaras de forma temprana: ${q.c.nombre}.`, 'evento'); toast(`📹 Detección temprana: ${q.c.nombre}.`); }
      else { s.seg = clamp(s.seg + 1); log('Revisó las cámaras de videovigilancia: sin novedad.'); }
      return { voz: '' };
    },
    radio: () => { const s = App.st; if (s.radios >= 3) { toast('La central ya tiene tu reporte; no hay más unidades de apoyo disponibles.'); return null; } s.radios++; s.apoyo = 2; s.riesgo = clamp(s.riesgo - 10); avanzar(2); log('Informó por radio a la central y coordinó con el ECU 911: apoyo para las dos próximas actuaciones.'); return { voz: 'Copiado, agente. Unidad de apoyo en camino.' }; },
    registrar: () => { const s = App.st; s.doc++; avanzar(5); log('Registró la novedad en el parte con fecha, hora, lugar, hechos y acciones.'); return { voz: '' }; },
    comite: () => { const s = App.st; if (s.comites >= 2) { toast('El comité barrial ya está coordinado para este turno.'); return null; } s.comites++; s.conf = clamp(s.conf + 8); s.seg = clamp(s.seg + 3); avanzar(8); log('Coordinó con el comité barrial: alertas, puntos de riesgo y contactos de emergencia.'); return { voz: 'Gracias, agente, estaremos atentos.' }; }
  };
  $$('[data-fa]').forEach(b => b.onclick = () => busy(async () => {
    const r = FREE[b.dataset.fa](); if (!r) return; renderAll();
    if (r.voz) await speak(r.voz, 1.05);
    if (App.st.enCola) turno();
  }));

  /* ---------- cierre y evaluación ---------- */
  function cerrar() {
    const s = App.st;
    s.cola.forEach(q => { s.escalados.push(q.c); log(`«${q.c.nombre}» quedó pendiente al cierre y se entregó al relevo.`, 'alerta'); });
    s.cola = [];
    finish();
  }
  function finish() {
    window.Vig3D?.stopAll?.();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const s = App.st; s.fin = true; s.actual = null;
    const total0 = s.atendidos.length + s.escalados.length + s.llegadas.length;
    const proto = s.max ? s.puntos / s.max * 25 : 0;
    const legal = clamp(20 - s.faltas * 5 - s.fuerza * 5, 0, 20);
    const prio = clamp(15 - s.prioFaltas * 4 - s.escalados.filter(c => c.prio).length * 5 - s.escalados.filter(c => !c.prio).length * 2 - s.llegadas.length * 2, 0, 15);
    const seg = s.seg / 100 * 15;
    const conf = s.conf / 100 * 10;
    const doc = Math.min(10, s.doc * 1.25);
    const auto = 5 * (1 - s.riesgo / 100);
    const crit = [
      { n: 'Actuación según protocolo', p: Math.round(proto), m: 25 },
      { n: 'Legalidad, derechos humanos y uso proporcional de la fuerza', p: Math.round(legal), m: 20 },
      { n: 'Priorización y tiempo de respuesta', p: Math.round(prio), m: 15 },
      { n: 'Seguridad del sector', p: Math.round(seg), m: 15 },
      { n: 'Confianza ciudadana y trato', p: Math.round(conf), m: 10 },
      { n: 'Registro documental (parte de novedades)', p: Math.round(doc), m: 10 },
      { n: 'Autocuidado y coordinación', p: Math.round(auto), m: 5 }
    ];
    const total = clamp(crit.reduce((a, c) => a + c.p, 0));
    const tResp = s.atendidos.length ? Math.round(s.atendidos.reduce((a, x) => a + x.espera, 0) / s.atendidos.length) : null;
    const rec = [];
    if (s.fuerza) rec.push(`Se registró ${s.fuerza} uso(s) desproporcionado(s) de la fuerza. Recuerde el uso progresivo: presencia, verbalización y, solo si es necesario y proporcional, control físico.`);
    if (s.faltas) rec.push(`Se registraron ${s.faltas} falta(s) a la legalidad o a los derechos humanos. No exponga a las personas, no retenga bienes, no reciba dinero y entregue a la Policía a quien sea aprehendido en flagrancia.`);
    if (s.prioFaltas) rec.push(`Atendió ${s.prioFaltas} vez/veces un incidente menor antes que uno que comprometía la vida o la integridad de personas.`);
    if (s.escalados.length) rec.push(`${s.escalados.length} incidente(s) se agravaron o quedaron pendientes. Use la radio para pedir apoyo, priorice y gestione mejor el tiempo.`);
    if (s.doc < 5) rec.push('Registre cada novedad en el parte con fecha, hora, lugar, hechos, personas y acciones: es respaldo legal y fuente para el análisis del delito.');
    if (!s.radios) rec.push('No informó por radio a la central ni coordinó con el ECU 911: la comunicación reduce su riesgo personal y agiliza la respuesta.');
    if (!s.rondas && !s.comites) rec.push('Las rondas preventivas y la coordinación con el comité barrial fortalecen la prevención comunitaria.');
    if (s.riesgo > 60) rec.push('Su riesgo personal fue alto: actúe en pareja, mantenga distancia de seguridad y pida apoyo antes de intervenir.');
    s.decisiones.filter(d => d.p === 0).slice(0, 3).forEach(d => rec.push(`${d.fase}: ${d.fb}`));
    if (!rec.length) rec.push('¡Excelente turno! Actuó con profesionalismo, legalidad y respeto a los derechos humanos. Mantenga estas prácticas.');
    saveHistory('Turno · ' + App.niv.nombre, 'Turno de vigilancia · ' + App.sec.corto, total);
    $('#report').innerHTML = scoreHead('Evaluación del turno de vigilancia', `${App.sec.nombre} (Puyo) · Nivel ${App.niv.nombre} · ${App.cfg.name || 'Estudiante'}`, total) + `
      <div class="kpis">
        <div class="kpi"><b>${s.atendidos.length}/${total0}</b><span>Incidentes atendidos</span></div>
        <div class="kpi"><b>${tResp !== null ? tResp + ' min' : '—'}</b><span>Tiempo de respuesta promedio</span></div>
        <div class="kpi"><b>${Math.round(s.seg)}%</b><span>Seguridad del sector</span></div>
        <div class="kpi"><b>${s.faltas + s.fuerza}</b><span>Faltas (legalidad y fuerza)</span></div>
      </div>
      <div class="report-grid">
        <div class="card"><h2>Rúbrica</h2>${crit.map(c => `<div class="crit"><div class="crit-top"><span>${c.n}</span><span>${c.p}/${c.m}</span></div><div class="crit-bar"><i style="width:${c.p / c.m * 100}%"></i></div></div>`).join('')}</div>
        <div class="card"><h2>Recomendaciones</h2><ul class="rec">${rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        <div class="card" style="grid-column:1/-1"><h2>Tus actuaciones</h2><ol>${s.decisiones.map(d => `<li><p><b>${d.p === 2 ? '✔' : d.p === 1 ? '◐' : '✘'} ${esc(d.fase)}:</b> ${esc(d.t)}</p><p class="small muted">${esc(d.fb)}</p></li>`).join('')}</ol></div>
        <details class="card" style="grid-column:1/-1" open><summary><b>📜 Parte de novedades del turno (${s.log.length} registros)</b></summary><ol class="log" style="max-height:none">${s.log.map(l => `<li class="t-${l.tipo}"><b>${hora(l.t)}</b> ${esc(l.txt)}</li>`).join('')}</ol></details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary vig-btn" id="rp-again">🔁 Repetir el turno</button>
        <button class="btn" id="rp-new">🎚️ Cambiar sector o nivel</button>
        <button class="btn" id="rp-print">🖨️ Imprimir / guardar PDF</button>
        <button class="btn" id="rp-menu">🏠 Menú principal</button>
      </div>`;
    $('#rp-again').onclick = startTurno;
    $('#rp-new').onclick = () => { renderSetup(); show('setup'); };
    $('#rp-print').onclick = () => window.print();
    $('#rp-menu').onclick = () => show('hub');
    show('report');
  }
  $('#btn-end').onclick = () => { if (App.busy) return; if (confirm('¿Deseas cerrar el turno y ver tu evaluación?')) cerrar(); };

  /* ================== PROTOCOLOS Y ANÁLISIS DEL DELITO ================== */
  function openQuiz(tipo) {
    const banco = tipo === 'ana' ? ANA_BANCO : PRO_BANCO;
    const nCalc = tipo === 'ana' ? 5 : 0;
    const calc = nCalc ? mezclar(banco.slice(-nCalc)).slice(0, 4) : [];
    const mcs = mezclar(nCalc ? banco.slice(0, -nCalc) : banco).slice(0, 10 - calc.length);
    const qs = mcs.concat(calc).map(f => f());
    const st = { i: 0, ok: 0, res: [] }, body = $(`#${tipo}-body`), titulo = tipo === 'ana' ? 'Ciberseguridad y análisis del delito' : 'Protocolos y legislación';
    const render = () => {
      const q = qs[st.i];
      body.innerHTML = `<div class="card"><div class="lab-top"><span class="pill pill-soft">Pregunta ${st.i + 1}/${qs.length}</span><span class="small muted">${esc(subj(q.asig).n)}</span></div>
        <h2>${esc(q.q)}</h2>
        ${q.num !== undefined ? `<div class="lab-num"><input class="q-in" inputmode="decimal" placeholder="Tu respuesta"><button class="btn btn-primary vig-btn q-ok">Comprobar</button></div>` : `<div class="dialog-choices">${q.o.map((o, i) => `<button class="btn" data-o="${i}">${esc(o)}</button>`).join('')}</div>`}
        <div class="q-fb"></div></div>`;
      const answer = good => {
        if (good) st.ok++; st.res.push({ q: q.q, good, exp: q.exp });
        $('.q-fb', body).innerHTML = `<div class="case-fb" style="border-color:${good ? 'var(--ok)' : 'var(--bad)'}"><b class="${good ? 'ok' : 'bad'}">${good ? '✔ Correcto' : '✘ Incorrecto'}</b><br>${esc(q.exp)}</div>
          <button class="btn btn-primary vig-btn q-next">${st.i + 1 < qs.length ? 'Siguiente ▶' : 'Ver resultado'}</button>`;
        $('.q-next', body).onclick = () => { st.i++; if (st.i < qs.length) render(); else done(); };
      };
      if (q.num !== undefined) $('.q-ok', body).onclick = () => { const v = parseFloat($('.q-in', body).value.replace(/\$|\s|%/g, '').replace(/−/g, '-').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.')); if (isNaN(v)) return toast('Escribe un número.'); $('.q-ok', body).disabled = true; answer(Math.abs(v - q.num) <= q.tol); };
      else $$('[data-o]', body).forEach(b => b.onclick = () => { $$('[data-o]', body).forEach(x => { x.disabled = true; if (+x.dataset.o === q.c) x.classList.add('good'); }); if (+b.dataset.o !== q.c) b.classList.add('bad'); answer(+b.dataset.o === q.c); });
    };
    const done = () => {
      const total = Math.round(st.ok / qs.length * 100);
      body.innerHTML = scoreHead(titulo, `${st.ok} de ${qs.length} respuestas correctas`, total) + `
        <div class="card"><h2>Repaso</h2><ol>${st.res.map(r => `<li><p><b>${r.good ? '✔' : '✘'}</b> ${esc(r.q)}</p><p class="small muted">${esc(r.exp)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary vig-btn q-again">🔁 Nueva sesión</button><button class="btn q-menu">🏠 Menú principal</button></div>`;
      $('.q-again', body).onclick = () => openQuiz(tipo); $('.q-menu', body).onclick = () => show('hub');
      saveHistory(tipo === 'ana' ? 'Análisis del delito' : 'Protocolos', titulo, total);
    };
    render(); show(tipo);
  }

  /* ================== PRÁCTICAS POR ASIGNATURA ================== */
  function openAsig(cod) {
    const lista = window.CASOS_ASIG || [];
    $('#screen-cases h1').textContent = 'Prácticas por asignatura';
    $('#cases-list').innerHTML = '<p class="muted">Una situación simulada para cada asignatura de la malla: actúa en la escena y responde con tu voz o por escrito.</p>' +
      [1, 2].map(pao => {
        const ms = MALLA_VIG.filter(m => m.pao === pao && lista.some(x => x.cod === m.cod));
        return ms.length ? `<h3 class="asig-pao">PAO ${pao}</h3><div class="topic-list">${ms.map(m => { const c = lista.find(x => x.cod === m.cod); return `<button class="choice" data-asig="${m.cod}"><span class="em">${c.persona.avatar}</span><span><b>${esc(m.n)}</b><small>${esc(c.titulo)}</small><small class="tags">${esc(c.objetivo || c.persona.rol)}</small><small class="muted">PAO ${m.pao} · también en: ${m.mod.filter(k => MODS[k]).map(k => MODS[k].emoji + ' ' + MODS[k].nombre).join(' · ')}</small></span></button>`; }).join('')}</div>` : '';
      }).join('');
    $$('[data-asig]').forEach(b => b.onclick = () => playCase(lista.find(x => x.cod === b.dataset.asig)));
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
    const b = cod && document.querySelector(`[data-asig="${cod}"]`); if (b) b.click();
  }

  /* ================== CASOS ================== */
  function openCases(cod) {
    $('#screen-cases h1').textContent = 'Casos profesionales';
    const list = cod ? CASOS_VIG.filter(c => c.asignaturas.includes(cod)) : CASOS_VIG;
    $('#cases-list').innerHTML = (cod ? `<p class="muted">Casos relacionados con <b>${esc(subj(cod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASOS_VIG.find(c => c.id === b.dataset.case)));
    if (cod) $('#cases-all').onclick = () => openCases();
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    show('cases');
  }
  function sayLine(c, t) { return /^\(.*\)$/.test(t) ? `<div class="case-say"><i>${esc(t.slice(1, -1))}</i></div>` : `<div class="case-say"><b>${esc(c.persona.nombre)}:</b> “${esc(t)}”</div>`; }
  function playCase(c) {
    // situación simulada: actuar en la escena y responder hablando o escribiendo
    if (window.CasoVivo) {
      $('#cases-list').hidden = true; $('#case-player').hidden = false;
      const ok = CasoVivo.play(c, { P: $('#case-player'), btn: 'btn-primary vig-btn', speak: speak, toast: toast, scoreHead,
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
          <button class="btn btn-primary vig-btn" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else end(); };
        speak(o.r, c.persona.pitch);
      });
      speak(paso.dice, c.persona.pitch);
    };
    const end = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary vig-btn" id="case-again">🔁 Repetir</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" id="case-menu">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c); $('#case-list').onclick = () => openCases(); $('#case-menu').onclick = () => show('hub');
      saveHistory('Casos', c.titulo, total); window.scrollTo(0, 0);
    };
    step(); window.scrollTo(0, 0);
  }

  /* ================== MAPA ================== */
  function openMapa() {
    $('#mapa-grid').innerHTML = [1, 2].map(pao => `<div class="mapa-col"><h3 class="vig-h3">PAO ${pao}</h3>${MALLA_VIG.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${m.mod.map(k => MODS[k].emoji).join(' ')} · ${m.cod}</small></button>`).join('')}</div>`).join('');
    $$('[data-cod]').forEach(b => b.onclick = () => {
      const m = subj(b.dataset.cod), casos = CASOS_VIG.filter(c => c.asignaturas.includes(m.cod));
      const inc = INCIDENTES.filter(c => c.asig.includes(m.cod)).map(c => c.nombre).concat(TAREAS.filter(t => t.asig.includes(m.cod)).map(t => t.titulo));
      $$('[data-cod]').forEach(x => x.classList.toggle('sel', x === b));
      $('#mapa-detail').innerHTML = `<h2>${esc(m.n)}</h2><p class="small muted">${m.cod} · PAO ${m.pao} · Relación ${m.rel}</p><p>${esc(m.sim)}</p>
        <div class="report-actions">${m.mod.map(k => `<button class="btn" data-mod="${k}">${MODS[k].emoji} ${MODS[k].nombre}</button>`).join('')}${(window.CASOS_ASIG || []).some(x => x.cod === m.cod) ? '<button class="btn" data-mod="asig">🎯 Práctica de la asignatura</button>' : ''}</div>
        ${inc.length ? `<p class="small"><b>En el turno:</b> ${inc.map(esc).join(' · ')}</p>` : ''}
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
  App.escena = () => { const s = App.st; return s ? { cola: s.cola.map(q => ({ avatar: q.c.icono, prio: q.c.prio })), actual: s.actual ? s.actual.c.icono : null, quien: s.actual ? s.actual.c.avatar : null, abierta: s.abierta && !s.fin, hora: hora(s.t), sector: App.sec.nombre, prop: PROP[App.sec.id] || '⛲', seg: s.seg } : null; };
})();
