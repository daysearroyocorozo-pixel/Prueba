/* =========================================================
   Controlador de la interfaz del simulador de aula
   ========================================================= */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };

  const STATUS_ICON = { mano: '✋', distraido: '💭', celular: '📱', conversa: '💬', cansado: '😴', duda: '🙋', noentiende: '😟', ok: '' };

  const App = {
    cfg: store.get('aula-cfg', { name: '', inst: '', dur: 40, num: 8, ind: true, voice: true }),
    level: null, area: null, tema: null,
    sim: null, selected: null, mode: 'idle', busy: false,
    ctx: {}, listeners: [], explained: []
  };
  window.AulaApp = App;

  /* ================== utilidades de UI ================== */
  function show(screen) {
    $$('.screen').forEach(s => s.hidden = s.id !== 'screen-' + screen);
    window.scrollTo(0, 0);
  }
  let toastT;
  function toast(msg, ms = 2600) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, ms);
  }
  App.toast = toast;

  function applyTheme(th) {
    if (th) document.documentElement.setAttribute('data-theme', th);
    else document.documentElement.removeAttribute('data-theme');
  }
  applyTheme(store.get('aula-theme', null));
  $('#btn-theme').onclick = () => {
    const cur = document.documentElement.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next); store.set('aula-theme', next);
  };
  function syncSoundBtn() {
    $('#btn-sound').textContent = App.cfg.voice ? '🔊' : '🔇';
    $('#btn-sound').setAttribute('aria-pressed', App.cfg.voice);
  }
  $('#btn-sound').onclick = () => {
    App.cfg.voice = !App.cfg.voice; store.set('aula-cfg', App.cfg); syncSoundBtn();
    if (!App.cfg.voice && 'speechSynthesis' in window) speechSynthesis.cancel();
    toast(App.cfg.voice ? 'Voz de estudiantes activada' : 'Voz de estudiantes desactivada');
  };
  syncSoundBtn();

  /* ================== voz ================== */
  let esVoice = null;
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices();
    esVoice = vs.find(v => /es[-_](EC|419|MX|US|CO)/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null;
  }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }

  function speak(text, pitch = 1.2) {
    const plain = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim();
    const fallback = Math.min(3800, 900 + plain.length * 40);
    if (!App.cfg.voice || !('speechSynthesis' in window) || !plain) return sleep(fallback);
    return new Promise(res => {
      const u = new SpeechSynthesisUtterance(plain);
      u.lang = esVoice ? esVoice.lang : 'es-ES';
      if (esVoice) u.voice = esVoice;
      u.pitch = Math.min(2, pitch); u.rate = 1.05;
      let done = false; const fin = () => { if (!done) { done = true; res(); } };
      u.onend = fin; u.onerror = fin;
      setTimeout(fin, Math.max(4000, plain.length * 110));
      speechSynthesis.speak(u);
    });
  }

  async function say(s, text) {
    const card = $(`.student[data-id="${s.id}"]`);
    if (card) {
      card.querySelector('.bubble')?.remove();
      const b = document.createElement('div'); b.className = 'bubble'; b.textContent = text;
      card.appendChild(b); card.classList.add('speaking');
    }
    App.speech = { sid: s.id, text }; notify();
    await speak(text, s.pitch);
    if (card) {
      card.classList.remove('speaking');
      const b = card.querySelector('.bubble');
      setTimeout(() => { if (b && b.isConnected) b.remove(); if (App.speech && App.speech.sid === s.id) { App.speech = null; notify(); } }, 2200);
    }
  }

  /* ================== INICIO ================== */
  $('#f-name').value = App.cfg.name; $('#f-inst').value = App.cfg.inst;
  $('#f-dur').value = App.cfg.dur; $('#f-num').value = App.cfg.num;
  $('#f-ind').checked = App.cfg.ind; $('#f-voice').checked = App.cfg.voice;
  function syncBrand() { $('#brand-sub').textContent = App.cfg.inst || 'Laboratorio Virtual · Carrera de Educación Básica'; }
  syncBrand();

  $('#home-form').onsubmit = e => {
    e.preventDefault();
    Object.assign(App.cfg, {
      name: $('#f-name').value.trim(), inst: $('#f-inst').value.trim(),
      dur: +$('#f-dur').value, num: +$('#f-num').value, ind: $('#f-ind').checked, voice: $('#f-voice').checked
    });
    store.set('aula-cfg', App.cfg); syncSoundBtn(); syncBrand();
    // desbloquea la síntesis de voz en iOS con un gesto del usuario
    if (App.cfg.voice && 'speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); }
    window.Modules.renderHub(); show('hub');
  };
  $$('[data-go]').forEach(b => b.onclick = () => show(b.dataset.go));

  /* ================== CONFIGURACIÓN ================== */
  function renderSetup() {
    $('#level-list').innerHTML = LEVELS.map(l => `
      <button class="choice" data-level="${l.id}" aria-pressed="${App.level?.id === l.id}">
        <span class="em">${l.emoji}</span><span><b>${l.nombre}</b><small>${l.grados} · ${l.edad}</small></span>
      </button>`).join('');
    $('#area-list').innerHTML = AREAS.map(a => `
      <button class="choice" data-area="${a.id}" aria-pressed="${App.area?.id === a.id}">
        <span class="em">${a.emoji}</span><span><b>${a.nombre}</b></span>
      </button>`).join('');
    $$('[data-level]').forEach(b => b.onclick = () => { App.level = LEVELS.find(l => l.id === b.dataset.level); App.tema = null; renderSetup(); });
    $$('[data-area]').forEach(b => b.onclick = () => { App.area = AREAS.find(a => a.id === b.dataset.area); App.tema = null; renderSetup(); });
    const tl = $('#topic-list');
    if (App.level && App.area) {
      const temas = CONTENT[App.area.id][App.level.id];
      tl.innerHTML = temas.map(t => `
        <button class="choice" data-topic="${t.id}" aria-pressed="${App.tema?.id === t.id}">
          <b>${esc(t.titulo)}</b><small>🎯 ${esc(t.objetivo)}</small>
        </button>`).join('');
      $$('[data-topic]').forEach(b => b.onclick = () => { App.tema = temas.find(t => t.id === b.dataset.topic); renderSetup(); });
    }
    $('#roster-preview').innerHTML = ROSTER.slice(0, App.cfg.num).map(r => {
      const p = PROFILES[r.perfil];
      return `<div class="mini-student"><div class="av">${r.avatar}</div><b>${r.nombre}</b><div class="tag ${p.nee ? 'nee' : ''}">${p.etiqueta}</div><div class="small muted">${p.desc}</div></div>`;
    }).join('');
    $('#btn-start').disabled = !(App.level && App.area && App.tema);
  }
  $('#btn-start').onclick = () => {
    if ($('#f-plan').checked) window.Modules.openPlan();
    else { App.plan = null; startClass(); }
  };

  /* ================== AULA ================== */
  function startClass() {
    const t = App.tema;
    const tema = { ...t, dudas: t.dudas.map(d => ({ ...d })) };
    App.sim = new Simulation({ area: App.area, level: App.level, tema, duracion: App.cfg.dur, numEstudiantes: App.cfg.num, docente: App.cfg.name });
    App.selected = null; App.mode = 'idle'; App.busy = false; App.explained = []; App.ctx = {};
    const plan = App.plan && App.plan.temaId === t.id ? App.plan : null;
    if (plan) App.sim.applyPlan(plan);
    $('#plan-card').hidden = !plan;
    if (plan) {
      const nom = id => (PLAN_OPTS.actividades.find(a => a.id === id) || {}).t;
      $('#plan-view').innerHTML = `<p><b>Modelo:</b> ${esc(PLAN_OPTS.modelos.find(m => m.id === plan.modelo).t)}</p>
        <p><b>Actividades:</b> ${esc(plan.act.map(nom).join(', ') || '—')}</p>
        <p><b>Tiempos:</b> ${plan.tiempos.anticipacion} / ${plan.tiempos.construccion} / ${plan.tiempos.consolidacion} min</p>
        <p><b>Recursos:</b> ${esc(plan.recursos.map(r => PLAN_OPTS.recursos.find(x => x.id === r).t).join(', ') || '—')}</p>`;
    }
    $('#cls-area').textContent = App.area.emoji + ' ' + App.area.nombre;
    $('#cls-area').style.background = App.area.color;
    $('#cls-level').textContent = App.level.nombre + ' · ' + App.level.grados;
    $('#cls-topic').textContent = t.titulo;
    $('#clock-max').textContent = App.cfg.dur;
    $('#room').classList.toggle('no-ind', !App.cfg.ind);
    setBoard('¡Bienvenidos a clase!', `<p>Tema: <b>${esc(t.titulo)}</b></p>`);
    renderRoom();
    setTab('anticipacion');
    setDialog(`Hola, <b>${esc(App.cfg.name || 'docente')}</b>. Tus estudiantes te esperan. Inicia con la fase de <b>anticipación</b>: saluda, presenta el objetivo y activa los conocimientos previos.`);
    show('class');
    updateAll();
  }

  function renderRoom() {
    $('#room').innerHTML = App.sim.students.map(s => `
      <button class="student" data-id="${s.id}" aria-label="${esc(s.nombre)}">
        <span class="status"></span>
        <span class="head">${s.avatar}</span>
        <span class="desk">
          <span class="name">${esc(s.nombre)}</span>
          <span class="profile ${s.nee ? 'nee' : ''}">${s.perfilInfo.etiqueta}</span>
          <span class="meters">
            <span class="meter att" title="Atención"><i></i></span>
            <span class="meter comp" title="Comprensión"><i></i></span>
            <span class="meter mot" title="Motivación"><i></i></span>
          </span>
        </span>
      </button>`).join('');
    $$('#room .student').forEach(el => {
      el.onclick = () => onStudentTap(el.dataset.id);
      el.oncontextmenu = e => { e.preventDefault(); showStudentInfo(el.dataset.id); };
    });
  }

  function updateRoom() {
    const sim = App.sim; if (!sim) return;
    const pickMode = App.mode === 'pick-answer' || App.mode === 'pick-previo';
    sim.students.forEach(s => {
      const el = $(`.student[data-id="${s.id}"]`); if (!el) return;
      el.querySelector('.status').textContent = STATUS_ICON[s.estado] || '';
      el.classList.toggle('hand', s.estado === 'mano' || s.estado === 'duda');
      el.classList.toggle('distracted', s.distraido);
      el.classList.toggle('sel', App.selected === s.id);
      el.classList.toggle('can-pick', pickMode);
      el.querySelector('.att i').style.width = Math.round(s.atencion * 100) + '%';
      el.querySelector('.comp i').style.width = Math.round(s.comprension * 100) + '%';
      el.querySelector('.mot i').style.width = Math.round(s.motivacion * 100) + '%';
      el.title = `${s.nombre} · Atención ${Math.round(s.atencion * 100)}% · Comprensión ${Math.round(s.comprension * 100)}% · Motivación ${Math.round(s.motivacion * 100)}%`;
    });
  }

  function updateAll() {
    const sim = App.sim; if (!sim) return;
    updateRoom();
    const m = Math.round(sim.minuto);
    $('#clock').textContent = m;
    $('.clock').classList.toggle('late', m >= sim.duracion);
    const order = ['anticipacion', 'construccion', 'consolidacion'];
    $$('#phases span').forEach(sp => {
      const i = order.indexOf(sp.dataset.f), cur = order.indexOf(sim.fase);
      sp.classList.toggle('on', i === cur); sp.classList.toggle('done', i < cur);
    });
    const u = sim.usadas;
    const map = { saludar: u.saludo, objetivo: u.objetivo, previo: u.previo, ejercicio: u.ejercicio, grupal: u.grupal, quiz: u.quiz, resumen: u.resumen, tarea: u.tarea, pausa: u.pausa };
    $$('.act').forEach(b => {
      b.classList.toggle('used', !!map[b.dataset.act]);
      b.disabled = App.busy || !['idle', 'event'].includes(App.mode);
    });
    $('#exp-count').textContent = `(${sim.explicados}/${sim.tema.explicacion.length})`;
    $$('#dialog-choices .btn').forEach(b => b.disabled = App.busy);
    $('#log').innerHTML = sim.log.slice().reverse().map(l => `<li class="t-${l.tipo}"><b>${l.min}′</b> ${esc(l.texto)}</li>`).join('');
    if (m >= sim.duracion && !App.ctx.timeWarned) { App.ctx.timeWarned = true; toast('⏰ Se terminó el tiempo planificado. Realiza el cierre y termina la clase.', 4000); }
    notify();
  }

  function setBoard(title, html) { $('#board-title').textContent = title; $('#board-body').innerHTML = html; App.boardText = title; notify(); }

  /* diálogo con opciones */
  function setDialog(html, choices = []) {
    $('#dialog-text').innerHTML = html;
    const box = $('#dialog-choices'); box.innerHTML = '';
    choices.forEach(c => {
      const b = document.createElement('button');
      b.className = 'btn ' + (c.cls || ''); b.innerHTML = c.label; b.disabled = App.busy;
      b.onclick = async () => { if (App.busy) return; await c.fn(); };
      box.appendChild(b);
    });
    // en pantallas pequeñas, lleva el diálogo a la vista cuando requiere una decisión
    if (choices.length && window.innerWidth < 1000 && !document.body.classList.contains('cam-mode')) {
      const r = $('#dialog').getBoundingClientRect();
      if (r.top < 60 || r.top > window.innerHeight * 0.6) $('#dialog').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    notify();
  }

  async function busy(fn) {
    if (App.busy) return;
    App.busy = true; updateAll();
    try { await fn(); } catch (e) { console.error(e); }
    App.busy = false; updateAll();
  }

  function setTab(name) {
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    $$('.tab-panel').forEach(p => p.hidden = p.dataset.panel !== name);
    App.tab = name; notify();
  }
  $$('.tab').forEach(t => t.onclick = () => setTab(t.dataset.tab));

  /* ================== selección de estudiantes ================== */
  function onStudentTap(id) {
    if (App.busy) return;
    if (App.mode === 'pick-answer') return busy(() => giveTurn(id));
    if (App.mode === 'pick-previo') return busy(() => previoTurn(id));
    if (App.selected === id && App.mode !== 'event') { showStudentInfo(id); return; }
    App.selected = id; updateRoom(); notify();
    const s = App.sim.get(id);
    if (App.mode === 'idle') toast(`Seleccionaste a ${s.nombre}. Usa la pestaña "Aula" para interactuar.`);
    if (App.tab !== 'gestion' && App.mode === 'idle') setTab('gestion');
  }
  App.onStudentTap = onStudentTap;

  function showStudentInfo(id) {
    const s = App.sim.get(id), p = s.perfilInfo, pc = v => Math.round(v * 100) + '%';
    $('#student-info').innerHTML = `
      <h2>${s.avatar} ${esc(s.nombre)}</h2>
      <p><b>Perfil:</b> ${p.etiqueta}${s.nee ? ' (necesidad educativa específica)' : ''}</p>
      <p class="muted">${p.desc}</p>
      ${App.cfg.ind ? `<p>Atención: <b>${pc(s.atencion)}</b> · Comprensión: <b>${pc(s.comprension)}</b> · Motivación: <b>${pc(s.motivacion)}</b></p>` : ''}
      <p>Turnos: ${s.stats.turnos} · Aciertos: ${s.stats.aciertos} · Apoyos recibidos: ${s.stats.apoyos}</p>`;
    $('#student-dlg').showModal();
  }
  $('#student-close').onclick = () => $('#student-dlg').close();

  /* ================== eventos del aula ================== */
  function pendingEventCheck() {
    if (App.mode === 'event' && App.sim.activeEvent) {
      App.sim.ignorarEvento();
      App.mode = 'idle';
    }
  }

  async function afterAction() {
    App.mode = 'idle';
    updateAll();
    const ev = App.sim.maybeEvent();
    if (ev) await showEvent(ev);
  }

  async function showEvent(ev) {
    const s = App.sim.get(ev.sid);
    App.mode = 'event'; App.selected = s.id; updateAll();
    if (ev.tipo === 'duda') {
      await say(s, ev.duda.q);
      const order = ev.duda.o.map((_, i) => i).sort(() => Math.random() - 0.5);
      setDialog(`🙋 <span class="who">${esc(s.nombre)}</span> pregunta: “${esc(ev.duda.q)}”<br><small class="muted">¿Qué le respondes?</small>`, [
        ...order.map(i => ({ label: '💬 ' + esc(ev.duda.o[i]), fn: () => busy(async () => {
          const r = App.sim.responderDuda(i); updateAll();
          await say(r.s, r.reply);
          setDialog(r.ok ? '✅ Respondiste bien la duda. La clase comprende mejor.' : '⚠️ Tu respuesta no fue precisa y generó confusión. Revisa el contenido.');
          App.mode = 'idle';
        }) })),
        { label: '⏳ Pedir que espere y continuar', cls: 'bad', fn: () => busy(async () => { App.sim.ignorarEvento(); App.mode = 'idle'; setDialog('Pospusiste la duda de ' + esc(s.nombre) + '.'); }) }
      ]);
      return;
    }
    const opts = [];
    if (['distraido', 'celular', 'conversa', 'cansado'].includes(ev.tipo)) opts.push({ label: `☝️ Llamar la atención a ${esc(s.nombre)}`, fn: () => doAtencion(s.id) });
    if (ev.tipo === 'conversa') opts.push({ label: '🤫 Pedir silencio a la clase', fn: () => doSilencio() });
    if (ev.tipo === 'cansado' || ev.tipo === 'distraido') opts.push({ label: '🤸 Hacer una pausa activa', fn: () => doPausa() });
    if (ev.tipo === 'noentiende') opts.push({ label: '🧑‍🏫 Volver a explicar con otras palabras', fn: () => busy(async () => { App.sim.reexplicar(); setDialog('Volviste a explicar. ' + esc(s.nombre) + ' parece entender mejor.'); App.mode = 'idle'; updateAll(); await say(s, '¡Ah, ahora sí!'); }) });
    opts.push({ label: `🤝 Acercarse y apoyar a ${esc(s.nombre)}`, fn: () => doApoyar(s.id) });
    opts.push({ label: '➡ Ignorar y continuar', cls: 'bad', fn: () => busy(async () => { App.sim.ignorarEvento(); App.mode = 'idle'; setDialog('Decidiste no intervenir.'); }) });
    setDialog(`${ev.icono} <b>Situación en el aula:</b> ${esc(ev.texto)}`, opts);
    if (ev.tipo === 'noentiende') await say(s, 'Profe, no entiendo nada…');
  }

  /* ================== ACCIONES ================== */
  const ACTIONS = {
    saludar: () => busy(async () => {
      setBoard(App.sim.tema.titulo, `<p class="big">¡Buenos días! 😊</p><p>Hoy aprenderemos: <b>${esc(App.sim.tema.titulo)}</b></p>`);
      setDialog('Tú: <i>“¡Buenos días, chicos y chicas! ¿Cómo están? Hoy vamos a aprender algo muy interesante.”</i>');
      const voces = App.sim.saludar(); updateAll();
      for (const v of voces) await say(v.s, v.t);
      await afterAction();
    }),
    objetivo: () => busy(async () => {
      App.sim.presentarObjetivo();
      setBoard('🎯 Objetivo de la clase', `<p class="big">${esc(App.sim.tema.objetivo)}</p>`);
      setDialog('Tú: <i>“Al finalizar la clase seremos capaces de: ' + esc(App.sim.tema.objetivo.toLowerCase()) + '”</i>');
      await afterAction();
    }),
    previo: () => busy(async () => {
      const q = App.sim.tema.previo.q;
      setBoard('💡 ¿Qué sabemos?', `<p class="big">${esc(q)}</p>`);
      const hands = App.sim.activarPrevios();
      App.mode = 'pick-previo'; updateAll();
      setDialog(`Tú: <i>“${esc(q)}”</i><br>${hands.length} estudiante(s) levantaron la mano. <b>Toca a un estudiante</b> para darle la palabra.`, [
        { label: '✅ Cerrar la ronda de participación', fn: () => busy(async () => { App.sim.students.forEach(s => { if (s.estado === 'mano') s.estado = 'ok'; }); setDialog('Cerraste la ronda de conocimientos previos. Continúa con el desarrollo de la clase.'); setTab('construccion'); await afterAction(); }) }
      ]);
    }),
    explicar: () => busy(async () => {
      const punto = App.sim.explicar();
      if (!punto) { toast('Ya explicaste todos los puntos del tema. Haz preguntas o resuelve un ejercicio.'); return; }
      App.explained.push(punto);
      setBoard('🧑‍🏫 ' + App.sim.tema.titulo, `<ol>${App.explained.map((p, i) => `<li${i === App.explained.length - 1 ? ' style="color:#fde68a"' : ''}>${esc(p)}</li>`).join('')}</ol>`);
      setDialog(`Explicaste el punto ${App.sim.explicados} de ${App.sim.tema.explicacion.length}.` + (App.sim.explicados === App.sim.tema.explicacion.length ? ' <b>¡Completaste la explicación!</b> Comprueba la comprensión con preguntas.' : ''));
      updateAll();
      const atentos = App.sim.students.filter(s => !s.distraido && s.comprension > 0.5);
      if (atentos.length && Math.random() < 0.5) { const s = atentos[Math.floor(Math.random() * atentos.length)]; await say(s, ['¡Ahhh, ya entiendo!', 'Ok, profe.', '¡Qué interesante!', 'Sí, tiene sentido.'][Math.floor(Math.random() * 4)]); }
      await afterAction();
    }),
    preguntar: () => busy(async () => { await openQuestion(App.sim.nextQuestion()); }),
    preguntarA: () => {
      if (!App.selected) return toast('Primero toca a un estudiante para seleccionarlo.');
      const id = App.selected;
      return busy(async () => { await openQuestion(App.sim.nextQuestion(), true); await giveTurn(id); });
    },
    ejercicio: () => busy(async () => {
      let e = App.sim.tema.ejercicio;
      if (App.sim.usadas.ejercicio) {
        if (!App.sim.tema.gen) { toast('Ya resolviste el ejercicio de este tema. Prueba una evaluación rápida.'); return; }
        const g = App.sim.tema.gen(); e = { enunciado: g.q, o: g.o, c: g.c, pasos: [g.porque] };
        App.sim.tema = { ...App.sim.tema, ejercicio: e };
      }
      setBoard('✏️ Ejercicio', `<p class="big">${esc(e.enunciado)}</p><div class="opt-list">${e.o.map(o => `<span>${esc(o)}</span>`).join('')}</div>`);
      App.mode = 'board-exercise'; updateAll();
      setDialog('Resuelve el ejercicio frente a la clase. <b>¿Cuál es la respuesta correcta?</b>', e.o.map((o, i) => ({ label: '✏️ ' + esc(o), fn: () => busy(() => solveExercise(e, i)) })));
    }),
    grupal: () => busy(async () => {
      setBoard('👥 Trabajo colaborativo', `<p>Formen grupos de 3 y resuelvan juntos:</p><p class="big">${esc(App.sim.tema.ejercicio.enunciado)}</p><p>Compartan sus ideas y ayuden a sus compañeros.</p>`);
      setDialog('Organizaste a la clase en grupos. Los estudiantes con más dificultades aprenden de sus pares.');
      const v = App.sim.trabajoGrupal(); updateAll();
      for (const x of v) await say(x.s, x.t);
      await afterAction();
    }),
    quiz: () => busy(async () => {
      const q = App.sim.nextQuestion();
      const { res, pct } = App.sim.evaluacionRapida(q);
      const counts = q.o.map((_, i) => res.filter(r => r.idx === i).length);
      const max = Math.max(1, ...counts);
      setBoard('📊 Evaluación rápida', `<p><b>${esc(q.q)}</b></p>
        <div class="bars">${counts.map((c, i) => `<div class="${i === q.c ? 'right' : ''}" style="height:${Math.max(4, c / max * 100)}%"><span>${c}</span></div>`).join('')}</div>
        <div class="opt-list">${q.o.map((o, i) => `<span class="${i === q.c ? 'right' : ''}">${String.fromCharCode(65 + i)}. ${esc(o)}</span>`).join('')}</div>`);
      updateAll();
      const fallaron = res.filter(r => !r.correct).map(r => r.s.nombre);
      setDialog(`Resultado: <b>${pct}%</b> de la clase respondió correctamente.` + (fallaron.length ? `<br><small class="muted">Respondieron mal: ${esc(fallaron.join(', '))}</small>` : ' ¡Todos acertaron! 🎉'), [
        { label: '🧠 Retroalimentar la respuesta a toda la clase', fn: () => busy(async () => { App.sim.retroGrupal(q); setBoard('📊 Retroalimentación', `<p class="big">Respuesta: ${esc(q.o[q.c])}</p><p>${esc(q.porque || '')}</p>`); setDialog('Explicaste la respuesta a toda la clase.'); await afterAction(); }) },
        { label: '➡ Continuar', fn: () => busy(afterAction) }
      ]);
      App.mode = 'feedback-quiz'; updateAll();
    }),
    resumen: () => busy(async () => {
      App.sim.resumir();
      const pts = App.sim.tema.explicacion;
      setBoard('📝 Lo que aprendimos hoy', `<ul>${pts.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`);
      setDialog('Tú: <i>“¿Quién me ayuda a recordar lo que aprendimos hoy?”</i>');
      updateAll();
      const v = App.sim.students.filter(s => !s.distraido).sort((a, b) => b.comprension - a.comprension)[0];
      if (v) await say(v, 'Hoy aprendimos que ' + pts[0].charAt(0).toLowerCase() + pts[0].slice(1));
      await afterAction();
    }),
    tarea: () => busy(async () => {
      App.sim.asignarTarea();
      setBoard('🏠 Tarea', `<p class="big">${esc(App.sim.tema.tarea)}</p>`);
      setDialog('Asignaste la tarea a la clase.');
      updateAll();
      const s = App.sim.students[Math.floor(Math.random() * App.sim.students.length)];
      await say(s, ['¿Para cuándo es, profe?', '¡Ok, profe!', '¿Se puede hacer en grupo?'][Math.floor(Math.random() * 3)]);
      await afterAction();
    }),
    atencion: () => { if (!App.selected) return toast('Primero toca a un estudiante para seleccionarlo.'); return doAtencion(App.selected); },
    apoyar: () => { if (!App.selected) return toast('Primero toca a un estudiante para seleccionarlo.'); return doApoyar(App.selected); },
    silencio: () => doSilencio(),
    pausa: () => doPausa()
  };

  function doAtencion(id) {
    return busy(async () => {
      const s = App.sim.get(id); const r = App.sim.llamarAtencion(id);
      setDialog(`Tú: <i>“${esc(s.nombre)}, por favor, presta atención.”</i>`); updateAll();
      await say(s, r); await afterAction();
    });
  }
  function doApoyar(id) {
    return busy(async () => {
      const s = App.sim.get(id); const r = App.sim.apoyar(id);
      setDialog(`Te acercaste al pupitre de <b>${esc(s.nombre)}</b> y le explicaste de forma personalizada${s.nee ? ' adaptando la consigna a su necesidad' : ''}.`); updateAll();
      await say(s, r); await afterAction();
    });
  }
  function doSilencio() {
    return busy(async () => {
      const n = App.sim.pedirSilencio();
      setDialog(`Tú: <i>“Silencio, por favor. Escuchemos.”</i> ${n ? `(${n} estudiante(s) dejaron de conversar)` : ''}`);
      await afterAction();
    });
  }
  function doPausa() {
    return busy(async () => {
      setBoard('🤸 Pausa activa', '<p class="big">¡Todos de pie! Estiramos los brazos, giramos la cabeza y respiramos profundo… 🙆</p>');
      setDialog('Realizaste una pausa activa. La atención de la clase se recupera.');
      const v = App.sim.pausaActiva(); updateAll();
      for (const x of v) await say(x.s, x.t);
      await afterAction();
    });
  }

  $$('.act').forEach(b => b.onclick = () => {
    if (App.busy) return;
    if (!['idle', 'event'].includes(App.mode)) return toast('Termina primero la interacción actual.');
    const a = b.dataset.act;
    const targeted = ['atencion', 'apoyar'].includes(a) && App.sim.activeEvent && App.selected === App.sim.activeEvent.sid;
    const resolves = ['silencio', 'pausa'].includes(a);
    if (!targeted && !resolves) pendingEventCheck();
    ACTIONS[a]();
  });

  /* ================== preguntas ================== */
  function boardQuestion(q, reveal = false, answered = -1) {
    setBoard('❓ Pregunta', `<p class="big">${esc(q.q)}</p><div class="opt-list">${q.o.map((o, i) =>
      `<span class="${reveal && i === q.c ? 'right' : ''}" ${answered === i && !reveal ? 'style="border-color:#fde68a"' : ''}>${String.fromCharCode(65 + i)}. ${esc(o)}</span>`).join('')}</div>`);
  }

  async function openQuestion(q, direct = false) {
    App.ctx.hinted = false;
    boardQuestion(q, App.cfg.ind);
    const hands = App.sim.abrirPregunta(q);
    App.mode = 'pick-answer'; updateAll();
    if (direct) return;
    const sayHands = hands.length ? `${hands.length} estudiante(s) levantaron la mano ✋.` : 'Nadie levantó la mano… 🤔';
    setDialog(`Tú: <i>“${esc(q.q)}”</i><br>${sayHands} <b>Toca a un estudiante</b> para darle la palabra (también puedes elegir a quien no levantó la mano).`, [
      ...(hands.length ? [{ label: '🎲 Dar la palabra a un voluntario', fn: () => busy(() => giveTurn(hands[Math.floor(Math.random() * hands.length)].id)) }] : []),
      retirarPregunta()
    ]);
  }

  async function giveTurn(id, boost = 0) {
    const q = App.sim.currentQ;
    App.sim.students.forEach(s => { if (s.estado === 'mano' && s.id !== id) s.estado = 'ok'; });
    App.selected = id;
    const r = App.sim.responder(id, boost);
    App.mode = 'feedback'; updateAll();
    setDialog(`Le diste la palabra a <b>${esc(r.s.nombre)}</b>…`);
    await say(r.s, r.texto);
    boardQuestion(q, false, r.idx ?? -1);
    const guide = App.cfg.ind ? (r.correct ? ' <span style="color:var(--ok)">(✔ correcta)</span>' : (r.idx !== undefined ? ' <span style="color:var(--bad)">(✘ incorrecta)</span>' : '')) : '';
    const head = `<span class="who">${esc(r.s.nombre)}</span>: “${esc(r.texto)}”${guide}<br><small class="muted">¿Cómo respondes?</small>`;
    const end = async (msg) => { App.sim.currentQ = null; boardQuestion(q, true); if (q.porque) $('#board-body').insertAdjacentHTML('beforeend', `<p>✔ ${esc(q.porque)}</p>`); setDialog(msg || 'Pregunta cerrada.'); await afterAction(); };
    const fb = (tipo, teacher, msg) => () => busy(async () => {
      const reply = App.sim.retroalimentar(id, tipo); updateAll();
      setDialog('Tú: <i>“' + teacher + '”</i>');
      if (reply) await say(r.s, reply);
      await end(msg);
    });
    const opts = [];
    if (r.distraido || r.nose) {
      opts.push({ label: `🔁 Repetir la pregunta a ${esc(r.s.nombre)}`, fn: () => busy(() => giveTurn(id, 0.05)) });
      if (!App.ctx.hinted) opts.push({ label: '💡 Dar una pista', fn: () => busy(() => hint(id, q)) });
      opts.push({ label: '🤝 Acercarse y apoyar', fn: () => busy(async () => { const rep = App.sim.apoyar(id); updateAll(); await say(r.s, rep); App.mode = 'pick-answer'; App.selected = id; await giveTurn(id, 0.2); }) });
      opts.push({ label: '🙋 Preguntar a otro estudiante', fn: () => busy(async () => { App.sim.retroalimentar(id, 'otro'); askAnother(); }) });
    } else {
      opts.push({ label: '🎉 Felicitar', cls: 'good', fn: fb('felicitar', `¡Muy bien, ${esc(r.s.nombre)}! Excelente respuesta.`) });
      opts.push({ label: '🧠 Pedir que explique su razonamiento', cls: 'good', fn: fb('razonar', `${esc(r.s.nombre)}, ¿por qué piensas eso? Explícanos.`) });
      if (!App.ctx.hinted) opts.push({ label: '💡 Dar una pista y que lo intente otra vez', fn: () => busy(() => hint(id, q)) });
      opts.push({ label: '🩹 Explicar el error con paciencia', fn: fb('explicarError', `Casi, ${esc(r.s.nombre)}. Veamos juntos dónde estuvo la confusión…`) });
      opts.push({ label: '🙋 Preguntar a otro estudiante', fn: () => busy(async () => { App.sim.retroalimentar(id, 'otro'); askAnother(); }) });
      opts.push({ label: '❌ Decir “Está mal” y seguir', cls: 'bad', fn: fb('negativo', 'No, eso está mal.') });
      opts.push({ label: '➡ Continuar sin comentar', fn: fb('continuar', 'Bien, sigamos.') });
    }
    setDialog(head, opts);
  }

  function retirarPregunta() {
    return { label: '✖ Retirar la pregunta', cls: 'bad', fn: () => busy(async () => { App.sim.students.forEach(s => { if (s.estado === 'mano') s.estado = 'ok'; }); App.sim.currentQ = null; setDialog('Retiraste la pregunta.'); await afterAction(); }) };
  }
  function askAnother() {
    App.mode = 'pick-answer'; updateAll();
    setDialog('¿Quién más quiere responder? <b>Toca a otro estudiante.</b>', [retirarPregunta()]);
  }

  async function hint(id, q) {
    App.ctx.hinted = true;
    App.sim.retroalimentar(id, 'pista');
    setDialog(`Tú: <i>“Te doy una pista: ${esc(q.pista || 'piensa en lo que explicamos.')}”</i>`);
    $('#board-body').insertAdjacentHTML('beforeend', `<p>💡 Pista: ${esc(q.pista || '')}</p>`);
    await sleep(600);
    App.mode = 'pick-answer';
    await giveTurn(id, 0.3);
  }

  async function solveExercise(e, idx) {
    const { ok, critico } = App.sim.resolverEjercicio(idx);
    updateAll();
    const showSteps = async () => {
      setBoard('✏️ Solución', `<p><b>${esc(e.enunciado)}</b></p><ol id="steps"></ol>`);
      for (const p of e.pasos) { $('#steps')?.insertAdjacentHTML('beforeend', `<li>${esc(p)}</li>`); notify(); await sleep(900); }
      $('#board-body').insertAdjacentHTML('beforeend', `<p class="big">✔ ${esc(e.o[e.c])}</p>`); notify();
    };
    if (ok) {
      setDialog('Resolviste el ejercicio paso a paso. ✔');
      await showSteps();
      const s = App.sim.students.find(x => !x.distraido);
      if (s) await say(s, '¡Ahhh, ya entiendo!');
      await afterAction();
    } else {
      setDialog('Escribiste tu respuesta en la pizarra…');
      if (critico) await say(critico, ['Profe… ¿no será que hay un error?', 'Profe, creo que eso no está bien…'][Math.floor(Math.random() * 2)]);
      setDialog(`<b>${esc(critico ? critico.nombre : 'Un estudiante')}</b> observó un posible error. ¿Qué haces?`, [
        { label: '🙏 Reconocer el error y corregir con la clase', cls: 'good', fn: () => busy(async () => { App.sim.corregirEjercicio(); setDialog('Reconociste el error: ¡equivocarse también es parte de aprender! Agradece la observación.'); await showSteps(); await afterAction(); }) },
        { label: '😤 Insistir en mi respuesta', cls: 'bad', fn: () => busy(async () => { App.sim.insistirError(); setDialog('Insististe en una respuesta incorrecta. Los estudiantes quedaron confundidos.'); updateAll(); if (critico) await say(critico, 'Ok… 😕'); await afterAction(); }) }
      ]);
    }
  }

  async function previoTurn(id) {
    const s = App.sim.get(id);
    const t = App.sim.opinionPrevia(id); updateAll();
    await say(s, t);
    setDialog(`<span class="who">${esc(s.nombre)}</span>: “${esc(t)}”`, [
      { label: '👍 Valorar su aporte', cls: 'good', fn: () => busy(async () => { App.sim.valorarAporte(id); updateAll(); setDialog(`Tú: <i>“¡Gracias, ${esc(s.nombre)}! Muy buen aporte.”</i><br>Toca a otro estudiante o cierra la ronda.`, closePrevio()); }) },
      ...closePrevio()
    ]);
  }
  function closePrevio() {
    return [{ label: '✅ Cerrar la ronda de participación', fn: () => busy(async () => { App.sim.students.forEach(s => { if (s.estado === 'mano') s.estado = 'ok'; }); setDialog('Cerraste la ronda de conocimientos previos. Continúa con el desarrollo.'); setTab('construccion'); await afterAction(); }) }];
  }

  /* ================== fin de clase y reporte ================== */
  $('#btn-end').onclick = () => {
    if (App.busy) return;
    if (!confirm('¿Deseas terminar la clase y ver tu evaluación?')) return;
    finishClass();
  };

  function finishClass() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    window.Aula3D?.stopAll?.();
    const r = App.sim.evaluar();
    const entry = {
      fecha: new Date().toISOString(), docente: App.cfg.name, inst: App.cfg.inst,
      area: App.area.nombre, nivel: App.level.nombre, tema: App.tema.titulo, total: r.total, nivelDesemp: r.nivel
    };
    const h = store.get('aula-history', []); h.unshift(entry); store.set('aula-history', h.slice(0, 50));
    renderReport(r, entry);
    show('report');
  }

  function renderReport(r, entry) {
    const d = new Date(entry.fecha);
    $('#report').innerHTML = `
      <div class="report-head card">
        <div>
          <h1>Evaluación del desempeño docente</h1>
          <p class="muted">${esc(entry.docente || 'Docente')} · ${esc(entry.inst || 'Laboratorio Virtual')} · ${d.toLocaleDateString('es-EC')} ${d.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}</p>
          <p><span class="pill" style="background:${App.area.color}">${App.area.emoji} ${esc(entry.area)}</span> <span class="pill pill-soft">${esc(entry.nivel)} · ${App.level.grados}</span> <b>${esc(entry.tema)}</b></p>
        </div>
        <div class="score"><div class="score-ring" style="--p:${r.total}"><div>${r.total}</div></div><div><b style="font-size:1.3rem">${r.nivel}</b><br><span class="muted">sobre 100 puntos</span></div></div>
      </div>
      <div class="kpis">
        <div class="kpi"><b>${r.comprensionProm}%</b><span>Comprensión promedio</span></div>
        <div class="kpi"><b>${r.participaron}/${r.n}</b><span>Estudiantes participaron</span></div>
        <div class="kpi"><b>${r.minutos}/${r.duracion}′</b><span>Tiempo utilizado</span></div>
        <div class="kpi"><b>${r.eventos.atendidos}/${r.eventos.ocurridos}</b><span>Situaciones atendidas</span></div>
      </div>
      <div class="report-grid">
        <div class="card">
          <h2>Rúbrica</h2>
          ${r.criterios.map(c => `<div class="crit"><div class="crit-top"><span>${c.nombre}</span><span>${c.pts}/${c.max}</span></div><div class="crit-bar"><i style="width:${c.pts / c.max * 100}%"></i></div></div>`).join('')}
          <p class="small muted">Retroalimentación: ${r.feedback.positivo} positiva · ${r.feedback.formativo} formativa · ${r.feedback.negativo} negativa · ${r.feedback.neutro} neutra.${r.quiz ? ' Evaluaciones rápidas: ' + r.quiz.map(q => q + '%').join(', ') + '.' : ''}</p>
        </div>
        <div class="card">
          <h2>Recomendaciones pedagógicas</h2>
          <ul class="rec">${r.rec.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        ${App.plan && App.plan.temaId === App.tema.id ? window.Modules.planCoherence(App.plan, App.sim).html : ''}
        <div class="card span2" style="grid-column:1/-1">
          <h2>Estado final de los estudiantes</h2>
          <div class="table-wrap"><table class="st">
            <thead><tr><th>Estudiante</th><th>Perfil</th><th>Comprensión</th><th>Motivación</th><th>Atención</th><th>Turnos</th><th>Aciertos</th><th>Apoyos</th></tr></thead>
            <tbody>${r.estudiantes.map(s => `<tr><td>${s.avatar} ${esc(s.nombre)}</td><td>${s.perfil}</td><td>${s.comprension}%</td><td>${s.motivacion}%</td><td>${s.atencion}%</td><td>${s.turnos}</td><td>${s.aciertos}</td><td>${s.apoyos}</td></tr>`).join('')}</tbody>
          </table></div>
        </div>
        <details class="card" style="grid-column:1/-1">
          <summary><b>📜 Registro completo de la clase (${r.log.length} acciones)</b></summary>
          <ol class="log" style="max-height:none">${r.log.map(l => `<li class="t-${l.tipo}"><b>${l.min}′</b> ${esc(l.texto)}</li>`).join('')}</ol>
        </details>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary" id="rp-again">🔁 Repetir esta clase</button>
        <button class="btn" id="rp-eval">📊 Analizar las calificaciones del curso</button>
        <button class="btn" id="rp-new">📚 Elegir otro tema</button>
        <button class="btn" id="rp-menu">🏠 Menú principal</button>
        <button class="btn" id="rp-print">🖨️ Imprimir / guardar PDF</button>
        <button class="btn" id="rp-json">⬇ Descargar resultados (JSON)</button>
      </div>`;
    $('#rp-again').onclick = startClass;
    $('#rp-new').onclick = () => { renderSetup(); show('setup'); };
    $('#rp-eval').onclick = () => window.Modules.openEval(App.sim.students);
    $('#rp-menu').onclick = () => show('hub');
    $('#rp-print').onclick = () => window.print();
    $('#rp-json').onclick = () => {
      const blob = new Blob([JSON.stringify({ ...entry, resultado: r }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = `clase-${entry.tema.replace(/\W+/g, '-')}-${d.toISOString().slice(0, 10)}.json`;
      a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
  }

  /* ================== historial ================== */
  $('#btn-history').onclick = () => {
    const h = store.get('aula-history', []);
    $('#history-list').innerHTML = h.length ? h.map(e => `<div class="hist-item"><span><b>${esc(e.tema)}</b><br><span class="muted small">${esc(e.area)} · ${esc(e.nivel)} · ${new Date(e.fecha).toLocaleString('es-EC')}${e.docente ? ' · ' + esc(e.docente) : ''}</span></span><b>${e.total}/100</b></div>`).join('') : '<p class="muted">Aún no has impartido clases.</p>';
    $('#history-dlg').showModal();
  };
  $('#history-close').onclick = () => $('#history-dlg').close();
  $('#history-clear').onclick = () => { store.set('aula-history', []); $('#history-list').innerHTML = '<p class="muted">Historial vacío.</p>'; };

  /* ================== órdenes por voz ================== */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    const mic = $('#btn-mic'); mic.hidden = false;
    let rec = null;
    mic.onclick = () => {
      if (rec) { rec.stop(); return; }
      rec = new SR(); rec.lang = 'es-EC'; rec.interimResults = false; rec.maxAlternatives = 1;
      mic.textContent = '🔴'; toast('Escuchando… di por ejemplo: "Sofía, responde" o "muy bien"');
      rec.onresult = e => handleVoice(e.results[0][0].transcript);
      rec.onerror = () => toast('No se pudo usar el micrófono.');
      rec.onend = () => { rec = null; mic.textContent = '🎤'; };
      rec.start();
    };
  }
  function clickChoice(re) {
    const b = $$('#dialog-choices .btn').find(x => re.test(norm(x.textContent)));
    if (b) { b.click(); return true; } return false;
  }
  function handleVoice(text) {
    toast('🗣️ “' + text + '”');
    const t = norm(text);
    const st = App.sim?.students.find(s => t.includes(norm(s.nombre)));
    if (App.mode === 'feedback') {
      if (/muy bien|excelente|felicit|bravo|correcto/.test(t)) return clickChoice(/felicitar/);
      if (/por que|razon|explica/.test(t)) return clickChoice(/razonamiento/);
      if (/pista/.test(t)) return clickChoice(/pista/);
      if (/otro|alguien mas/.test(t)) return clickChoice(/otro estudiante/);
      if (/error|paciencia/.test(t)) return clickChoice(/error/);
      if (/sigamos|continu/.test(t)) return clickChoice(/continuar/);
    }
    if (st) {
      if (App.mode === 'pick-answer' || App.mode === 'pick-previo') return onStudentTap(st.id);
      App.selected = st.id; updateRoom();
      if (/atencion|atiende/.test(t)) return ACTIONS.atencion();
      if (/ayud|apoy/.test(t)) return ACTIONS.apoyar();
      if (/pregunt|respond/.test(t)) return ACTIONS.preguntarA();
      return toast('Seleccionaste a ' + st.nombre);
    }
    if (!['idle', 'event'].includes(App.mode)) return;
    const cmds = [[/silencio/, 'silencio'], [/pausa/, 'pausa'], [/explic/, 'explicar'], [/pregunta/, 'preguntar'], [/buenos dias|buenas tardes|hola/, 'saludar'],
      [/objetivo/, 'objetivo'], [/tarea/, 'tarea'], [/resum/, 'resumen'], [/ejercicio/, 'ejercicio'], [/grupo/, 'grupal'], [/evaluacion|prueba/, 'quiz'], [/que saben|previo/, 'previo']];
    const c = cmds.find(([re]) => re.test(t));
    if (c) { pendingEventCheck(); return ACTIONS[c[1]](); }
    toast('No reconocí la orden: “' + text + '”');
  }

  /* ================== puente para la vista 3D / RA ================== */
  function notify() { App.listeners.forEach(fn => { try { fn(); } catch (e) { console.error(e); } }); }
  App.subscribe = fn => App.listeners.push(fn);
  App.notify = notify;
  App.statusIcon = STATUS_ICON;
  /* devuelve el texto del diálogo y los botones disponibles (para el panel 3D) */
  App.getHud = () => {
    const text = $('#dialog-text').textContent.trim();
    let buttons = $$('#dialog-choices .btn');
    if (['idle', 'event'].includes(App.mode)) {
      const panel = $(`.tab-panel[data-panel="${App.tab}"]`);
      buttons = buttons.concat($$('.act', panel));
    }
    return { text, board: { title: $('#board-title').textContent, body: $('#board-body').innerText }, buttons: buttons.map(b => ({ label: b.textContent.trim(), disabled: b.disabled, el: b })), tab: App.tab, busy: App.busy };
  };
  App.setTab = setTab;
  App.cycleTab = () => { const order = ['anticipacion', 'construccion', 'consolidacion', 'gestion']; setTab(order[(order.indexOf(App.tab) + 1) % order.length]); };
  App.finish = finishClass;
  Object.assign(App, { show, store, speak, esc, renderSetup, startClass });
})();
