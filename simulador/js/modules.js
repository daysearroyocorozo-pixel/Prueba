/* =========================================================
   Módulos complementarios del simulador:
   - Menú principal (hub)
   - Planificación microcurricular (antes de la clase)
   - Evaluación y análisis de resultados (Estadística + Evaluación)
   - Casos de práctica profesional (diversidad, convivencia, normativa, familias)
   - Mapa curricular de la carrera
   ========================================================= */
(function () {
  'use strict';
  const App = window.AulaApp;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const r2 = n => Math.round(n * 100) / 100;
  const fmt = n => r2(n).toFixed(2).replace('.', ',');
  const parseNum = v => parseFloat(String(v).replace(',', '.'));
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const subj = cod => MALLA.find(m => m.cod === cod);

  function saveHistory(modulo, titulo, total) {
    const h = App.store.get('aula-history', []);
    h.unshift({ fecha: new Date().toISOString(), docente: App.cfg.name, inst: App.cfg.inst, area: 'Módulo', nivel: modulo, tema: titulo, total, nivelDesemp: '' });
    App.store.set('aula-history', h.slice(0, 50));
    window.ISTY?.registrar('resultado', { modulo, titulo, total });
  }
  function nivelTexto(t) { return t >= 85 ? 'Excelente' : t >= 70 ? 'Muy bueno' : t >= 55 ? 'Bueno' : t >= 40 ? 'En proceso' : 'Inicial'; }
  function scoreHead(titulo, sub, total) {
    return `<div class="report-head card"><div><h1>${esc(titulo)}</h1><p class="muted">${esc(sub)}</p></div>
      <div class="score"><div class="score-ring" style="--p:${total}"><div>${total}</div></div><div><b style="font-size:1.3rem">${nivelTexto(total)}</b><br><span class="muted">sobre 100 puntos</span></div></div></div>`;
  }

  /* ================== MENÚ PRINCIPAL ================== */
  function renderHub() {
    $('#hub-name').textContent = App.cfg.name ? ', ' + App.cfg.name : '';
    $$('[data-hub]').forEach(b => b.onclick = () => {
      const k = b.dataset.hub;
      if (k === 'aula') { $('#f-plan').checked = false; App.renderSetup(); App.show('setup'); }
      if (k === 'plan') { $('#f-plan').checked = true; App.renderSetup(); App.show('setup'); }
      if (k === 'eval') openEval(null);
      if (k === 'casos') openCases();
      if (k === 'asig') openAsig();
      if (k === 'mapa') openMapa();
    });
  }

  /* ================== PLANIFICACIÓN ================== */
  function rosterNee() {
    return ROSTER.slice(0, App.cfg.num).filter(r => PROFILES[r.perfil].nee);
  }
  function defaultTimes(d) { const a = Math.round(d * 0.2), c = Math.round(d * 0.15); return [a, d - a - c, c]; }

  function openPlan() {
    const t = App.tema, area = App.area, lvl = App.level;
    const otro = CONTENT[area.id][lvl.id].find(x => x.id !== t.id);
    const objetivos = shuffle([
      { id: 'ok', t: t.objetivo },
      { id: 'vago', t: 'Que los estudiantes aprendan el tema de hoy.' },
      { id: 'otro', t: otro ? otro.objetivo : 'Repasar los contenidos del trimestre anterior.' }
    ]);
    const [ta, tc, tk] = defaultTimes(App.cfg.dur);
    const fases = { anticipacion: 'Anticipación', construccion: 'Construcción', consolidacion: 'Consolidación' };
    $('#plan-form').innerHTML = `
      <div class="card span2"><h2>Datos informativos</h2>
        <p><b>${esc(area.emoji + ' ' + area.nombre)}</b> · ${esc(lvl.nombre)} (${esc(lvl.grados)}) · Tema: <b>${esc(t.titulo)}</b> · Duración: ${App.cfg.dur} min</p></div>
      <div class="card"><h2>1. Objetivo de la clase</h2>
        ${objetivos.map(o => `<label class="opt"><input type="radio" name="obj" value="${o.id}" required> ${esc(o.t)}</label>`).join('')}</div>
      <div class="card"><h2>2. Modelo o metodología</h2>
        ${PLAN_OPTS.modelos.map(m => `<label class="opt"><input type="radio" name="modelo" value="${m.id}" required> ${esc(m.t)}</label>`).join('')}</div>
      <div class="card span2"><h2>3. Actividades por fase</h2><div class="plan-fases">
        ${Object.entries(fases).map(([f, n]) => `<div><h3>${n}</h3>${PLAN_OPTS.actividades.filter(a => a.fase === f).map(a => `<label class="opt"><input type="checkbox" name="act" value="${a.id}"> ${esc(a.t)}</label>`).join('')}
          <label class="opt-min">Minutos <input type="number" min="0" max="${App.cfg.dur}" name="t-${f}" value="${{ anticipacion: ta, construccion: tc, consolidacion: tk }[f]}" required></label></div>`).join('')}
      </div></div>
      <div class="card"><h2>4. Recursos didácticos</h2>
        ${PLAN_OPTS.recursos.map(r => `<label class="opt"><input type="checkbox" name="rec" value="${r.id}"> ${esc(r.t)}</label>`).join('')}</div>
      <div class="card"><h2>5. Evaluación</h2>
        <p class="small muted">Tipo de evaluación</p>
        ${PLAN_OPTS.tipoEval.map(e => `<label class="opt"><input type="radio" name="tipo" value="${e.id}" required> ${esc(e.t)}</label>`).join('')}
        <p class="small muted">Técnica e instrumento</p>
        <select name="instr" required><option value="">Selecciona…</option>${PLAN_OPTS.instrumentos.map(i => `<option value="${i.id}">${esc(i.t)}</option>`).join('')}</select></div>
      <div class="card span2"><h2>6. Adaptaciones curriculares</h2>
        ${rosterNee().length ? rosterNee().map(r => `<label class="opt-row"><span>${r.avatar} <b>${esc(r.nombre)}</b> · ${esc(PROFILES[r.perfil].etiqueta)}</span>
          <select name="ad-${r.perfil}" required><option value="">Selecciona…</option>${PLAN_OPTS.adaptaciones.map(a => `<option value="${a.id}">${esc(a.t)}</option>`).join('')}</select></label>`).join('')
        : '<p class="muted">Este grupo no tiene estudiantes con NEE.</p>'}</div>`;
    $('#plan-result').hidden = true; $('#plan-form').hidden = false; $('#plan-submit').hidden = false;
    App.show('plan');
  }

  function readPlan() {
    const f = $('#plan-form');
    const val = n => (f.querySelector(`[name="${n}"]:checked`) || {}).value;
    const multi = n => $$(`[name="${n}"]:checked`, f).map(i => i.value);
    const adapt = {};
    rosterNee().forEach(r => { adapt[r.perfil] = f.querySelector(`[name="ad-${r.perfil}"]`).value; });
    return {
      obj: val('obj'), modelo: val('modelo'), act: multi('act'), recursos: multi('rec'), tipo: val('tipo'),
      instr: f.querySelector('[name="instr"]').value, adapt,
      tiempos: { anticipacion: +f.querySelector('[name="t-anticipacion"]').value, construccion: +f.querySelector('[name="t-construccion"]').value, consolidacion: +f.querySelector('[name="t-consolidacion"]').value }
    };
  }

  function evaluatePlan(p) {
    const lvl = App.level.id, items = [];
    const add = (crit, pts, max, msg) => items.push({ crit, pts: Math.max(0, Math.round(pts)), max, msg });
    // 1. Objetivo
    add('Objetivo coherente con el tema', p.obj === 'ok' ? 20 : p.obj === 'vago' ? 5 : 0, 20,
      p.obj === 'ok' ? 'El objetivo describe un aprendizaje concreto y observable del tema.' : p.obj === 'vago' ? 'El objetivo es demasiado general: no indica qué aprendizaje se espera ni cómo observarlo.' : 'El objetivo corresponde a otro tema: no es coherente con la clase.');
    // 2. Modelo
    add('Modelo pedagógico', p.modelo === 'trad' ? 2 : 5, 5, p.modelo === 'trad' ? 'El modelo expositivo limita la participación; el currículo promueve metodologías activas.' : 'Modelo coherente con el enfoque constructivista del currículo.');
    // 3. Actividades
    const has = id => p.act.includes(id);
    const porFase = f => PLAN_OPTS.actividades.some(a => a.fase === f && has(a.id));
    let a = ['anticipacion', 'construccion', 'consolidacion'].filter(porFase).length * 5;
    const ma = [];
    if (!porFase('anticipacion')) ma.push('falta la anticipación');
    if (!porFase('consolidacion')) ma.push('falta la consolidación');
    if (has('previo')) a += 4; else ma.push('conviene activar conocimientos previos');
    if (has('preguntas') || has('quiz')) a += 3; else ma.push('no hay actividades para comprobar la comprensión');
    if (has('quiz') || has('resumen')) a += 3;
    if (p.modelo === 'coop' && !has('grupal')) { a -= 4; ma.push('elegiste aprendizaje cooperativo pero no planificaste trabajo colaborativo'); }
    if (p.modelo === 'abp' && !has('ejercicio') && !has('grupal')) { a -= 3; ma.push('el ABP requiere resolver un problema en clase'); }
    add('Actividades del ciclo de aprendizaje', a, 25, ma.length ? 'Observaciones: ' + ma.join('; ') + '.' : 'Las tres fases están planificadas con actividades pertinentes.');
    // 4. Recursos
    let r = 0; const mr = [];
    if (p.recursos.length >= 2) r += 5; else mr.push('usa al menos dos tipos de recursos');
    if (['preparatoria', 'elemental'].includes(lvl)) { if (p.recursos.includes('concreto')) r += 5; else mr.push('en este subnivel el material concreto es clave'); }
    else r += p.recursos.includes('texto') || p.recursos.includes('concreto') ? 5 : 3;
    if (p.recursos.includes('visual') || p.recursos.includes('digital')) r += 5; else mr.push('los apoyos visuales o digitales favorecen a estudiantes con NEE');
    add('Recursos didácticos', r, 15, mr.length ? 'Sugerencias: ' + mr.join('; ') + '.' : 'Recursos variados y adecuados al subnivel.');
    // 5. Evaluación
    let e = p.tipo === 'formativa' ? 8 : p.tipo === 'diagnostica' ? 4 : 2;
    const lee = !['preparatoria'].includes(lvl);
    e += ['cotejo', 'oral', 'rubrica'].includes(p.instr) ? 7 : (lee ? 5 : 2);
    add('Evaluación', e, 15, p.tipo !== 'formativa' ? 'Para una clase, la evaluación formativa informa a tiempo si se logra el objetivo.' : (p.instr === 'cuestionario' && !lee ? 'En Preparatoria los estudiantes aún no leen: prefiere observación o preguntas orales.' : 'Tipo e instrumento coherentes con el objetivo de la clase.'));
    // 6. Adaptaciones
    const nees = Object.keys(p.adapt);
    if (nees.length) {
      let ad = 0; const md = [];
      nees.forEach(k => {
        const v = p.adapt[k], share = 15 / nees.length;
        if (k === 'tdah') {
          if (v === 'g1' || v === 'g2') ad += share; else if (v === 'g3') { ad += share / 3; md.push('TDAH: no requiere modificar destrezas (grado 3); bastan apoyos de acceso o metodología'); } else md.push('TDAH: faltan apoyos como ubicación cercana, consignas cortas y pausas');
        }
        if (k === 'dislexia') {
          if (v === 'g2') ad += share; else if (v === 'g1') { ad += share * 2 / 3; md.push('dislexia: además del acceso, ajusta la metodología y la evaluación (grado 2)'); } else if (v === 'g3') { ad += share / 3; md.push('dislexia: sus destrezas están conservadas; no corresponde una adaptación significativa'); } else md.push('dislexia: falta adaptar la lectura y la evaluación');
        }
      });
      add('Adaptaciones curriculares (NEE)', ad, 15, md.length ? md.join('; ') + '.' : 'Adaptaciones pertinentes para cada estudiante con NEE.');
    } else add('Adaptaciones curriculares (NEE)', 15, 15, 'No hay estudiantes con NEE en este grupo.');
    // 7. Tiempos
    const tt = p.tiempos, suma = tt.anticipacion + tt.construccion + tt.consolidacion;
    let ti = (suma === App.cfg.dur ? 2 : 0) + (tt.construccion >= tt.anticipacion && tt.construccion >= tt.consolidacion ? 3 : 0);
    add('Distribución del tiempo', ti, 5, suma !== App.cfg.dur ? `Los tiempos suman ${suma} min y la clase dura ${App.cfg.dur} min.` : (ti < 5 ? 'La construcción debería ocupar la mayor parte del tiempo.' : 'Tiempo bien distribuido.'));
    const total = Math.min(100, items.reduce((s, i) => s + i.pts, 0));
    return { total, items };
  }

  function submitPlan(e) {
    e.preventDefault();
    const p = readPlan();
    const ev = evaluatePlan(p);
    p.eval = ev;
    p.temaId = App.tema.id;
    App.plan = p;
    $('#plan-result').innerHTML = scoreHead('Revisión de la planificación', `${App.area.nombre} · ${App.level.nombre} · ${App.tema.titulo}`, ev.total) + `
      <div class="card"><h2>Retroalimentación por criterio</h2>
      ${ev.items.map(i => `<div class="crit"><div class="crit-top"><span>${esc(i.crit)}</span><span>${i.pts}/${i.max}</span></div><div class="crit-bar"><i style="width:${i.pts / i.max * 100}%"></i></div><p class="small muted">${esc(i.msg)}</p></div>`).join('')}
      <p class="small">Tu planificación influye en la clase: los recursos y las adaptaciones elegidas cambian cómo aprenden los estudiantes. Al final verás la <b>coherencia entre lo planificado y lo ejecutado</b>.</p></div>
      <div class="report-actions"><button class="btn btn-primary" id="plan-go">🔔 Dictar la clase con esta planificación</button><button class="btn" id="plan-edit">✏️ Corregir la planificación</button></div>`;
    $('#plan-form').hidden = true; $('#plan-submit').hidden = true; $('#plan-result').hidden = false;
    window.scrollTo(0, 0);
    $('#plan-go').onclick = () => App.startClass();
    $('#plan-edit').onclick = () => { $('#plan-form').hidden = false; $('#plan-submit').hidden = false; $('#plan-result').hidden = true; };
    saveHistory('Planificación', App.tema.titulo, ev.total);
  }

  /* coherencia entre lo planificado y lo ejecutado en la clase */
  function planCoherence(p, sim) {
    const u = sim.usadas;
    const done = { saludo: u.saludo, objetivo: u.objetivo, previo: u.previo, explicacion: sim.explicados > 0, preguntas: sim.preguntasHechas > 0, ejercicio: u.ejercicio, grupal: u.grupal, quiz: u.quiz, resumen: u.resumen, tarea: u.tarea };
    const plan = p.act;
    const hechas = plan.filter(a => done[a]);
    const noPlan = Object.keys(done).filter(a => done[a] && !plan.includes(a));
    const adapts = Object.entries(p.adapt).filter(([, v]) => v && v !== 'ninguna');
    const aplicadas = adapts.filter(([k]) => { const s = sim.students.find(x => x.perfil === k); return s && (s.stats.apoyos > 0 || (k === 'tdah' && u.pausa)); });
    const real = sim.tiemposFase();
    const diff = ['anticipacion', 'construccion', 'consolidacion'].reduce((s, f) => s + Math.abs(real[f] - p.tiempos[f]), 0);
    const tMatch = Math.max(0, 1 - diff / sim.duracion);
    const pct = Math.round((plan.length ? hechas.length / plan.length : 0) * 70 + (adapts.length ? aplicadas.length / adapts.length : 1) * 20 + tMatch * 10);
    const nom = id => PLAN_OPTS.actividades.find(a => a.id === id).t;
    const fn = { anticipacion: 'Anticipación', construccion: 'Construcción', consolidacion: 'Consolidación' };
    const html = `<div class="card" style="grid-column:1/-1"><h2>📋 Coherencia entre la planificación y la clase: ${pct}%</h2>
      <p class="small muted">Planificación: ${p.eval.total}/100 puntos.</p>
      <div class="table-wrap"><table class="st"><thead><tr><th>Actividad planificada</th><th>¿Se realizó?</th></tr></thead><tbody>
      ${plan.map(a => `<tr><td>${esc(nom(a))}</td><td>${done[a] ? '✔ Sí' : '✘ No'}</td></tr>`).join('') || '<tr><td colspan="2">No se planificaron actividades.</td></tr>'}
      </tbody></table></div>
      ${noPlan.length ? `<p class="small">Realizadas sin planificar: ${esc(noPlan.map(nom).join(', '))}.</p>` : ''}
      <div class="table-wrap"><table class="st"><thead><tr><th>Fase</th><th>Planificado</th><th>Real</th></tr></thead><tbody>
      ${Object.keys(fn).map(f => `<tr><td>${fn[f]}</td><td>${p.tiempos[f]} min</td><td>${real[f]} min</td></tr>`).join('')}</tbody></table></div>
      ${adapts.length ? `<p class="small">Adaptaciones aplicadas en clase (apoyo individual o pausas): ${aplicadas.length} de ${adapts.length}.</p>` : ''}</div>`;
    return { pct, html };
  }

  /* ================== EVALUACIÓN Y ANÁLISIS ================== */
  let evalData = null;
  function openEval(students) {
    let list;
    if (students) {
      list = students.map(s => ({ nombre: s.nombre, avatar: s.avatar, nota: r2(Math.min(10, Math.max(1, 1.8 + s.comprension * 7 + ((s.base || 0.6) - 0.6) * 5 + (Math.random() - 0.5) * 2))) }));
    } else {
      const n = App.cfg.num || 8;
      list = ROSTER.slice(0, n).map(r => {
        const base = { aplicado: 8.8, timido: 8, curioso: 8, promedio: 7, conversador: 6.5, distraido: 6, tdah: 6, dislexia: 5.8, apoyo: 4.8 }[r.perfil] || 7;
        return { nombre: r.nombre, avatar: r.avatar, nota: r2(Math.min(10, Math.max(1, base + (Math.random() - 0.5) * 3))) };
      });
    }
    const notas = list.map(x => x.nota), n = notas.length;
    const sorted = notas.slice().sort((a, b) => a - b);
    const media = r2(notas.reduce((a, b) => a + b, 0) / n);
    const mediana = r2(n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2);
    const rango = r2(sorted[n - 1] - sorted[0]);
    const desv = r2(Math.sqrt(notas.reduce((s, x) => s + (x - media) ** 2, 0) / n));
    const bajo7 = list.filter(x => x.nota < 7);
    const muchos = bajo7.length / n >= 0.3;
    const decision = shuffle([
      { ok: true, t: muchos ? 'Retroalimentar a todo el curso los aprendizajes con más errores y aplicar un plan de refuerzo académico.' : 'Aplicar refuerzo académico focalizado a quienes están bajo 7 y continuar con el resto del curso.' },
      { ok: false, t: muchos ? 'Aplicar refuerzo solo a quienes están bajo 7 y continuar normalmente con el resto.' : 'Repetir toda la unidad con todo el curso.' },
      { ok: false, t: 'Tomar la misma prueba otra vez, sin cambios, a quienes reprobaron.' },
      { ok: false, t: 'Subir un punto a todos para mejorar el promedio.' }
    ]);
    evalData = { list, media, mediana, rango, desv, bajo7, decision, fromClass: !!students };
    $('#eval-body').innerHTML = `
      <div class="card"><h2>Calificaciones de la evaluación de fin de unidad</h2>
        <p class="small muted">${students ? 'Notas derivadas de la comprensión final de tus estudiantes en la clase.' : 'Curso simulado.'} Escala de 0 a 10; nota mínima para aprobar: 7.</p>
        <div class="table-wrap"><table class="st"><thead><tr><th>Estudiante</th><th>Nota</th><th>Escala cualitativa</th><th>Refuerzo</th></tr></thead><tbody>
        ${list.map((x, i) => `<tr><td>${x.avatar} ${esc(x.nombre)}</td><td><b>${fmt(x.nota)}</b></td>
          <td><select data-esc="${i}"><option value="">—</option>${ESCALA.map(e => `<option value="${e.id}">${e.id}</option>`).join('')}</select></td>
          <td><input type="checkbox" data-ref="${i}" aria-label="Refuerzo para ${esc(x.nombre)}"></td></tr>`).join('')}
        </tbody></table></div>
        <details class="small"><summary>Ver escala de calificaciones</summary><ul>${ESCALA.map(e => `<li><b>${e.id}</b>: ${esc(e.t)} (${fmt(e.min)} a ${fmt(e.max)})</li>`).join('')}</ul></details>
      </div>
      <div class="card"><h2>Medidas estadísticas</h2>
        <div class="row3">
          <label>Promedio (media)<input data-st="media" inputmode="decimal" placeholder="0,00"></label>
          <label>Mediana<input data-st="mediana" inputmode="decimal" placeholder="0,00"></label>
          <label>Rango<input data-st="rango" inputmode="decimal" placeholder="0,00"></label>
        </div>
        <p class="small muted">Redondea a dos decimales. Puedes usar calculadora.</p>
      </div>
      <div class="card"><h2>Decisiones pedagógicas</h2>
        <p><b>¿Qué tipo de evaluación es una prueba de fin de unidad?</b></p>
        ${PLAN_OPTS.tipoEval.map(t => `<label class="opt"><input type="radio" name="ev-tipo" value="${t.id}"> ${esc(t.t)}</label>`).join('')}
        <p><b>Según los resultados, ¿qué decisión es más adecuada?</b></p>
        ${decision.map((d, i) => `<label class="opt"><input type="radio" name="ev-dec" value="${i}"> ${esc(d.t)}</label>`).join('')}
      </div>
      <div class="report-actions"><button class="btn btn-primary" id="eval-check">✔ Revisar mi análisis</button></div>`;
    $('#eval-result').hidden = true;
    $('#eval-check').onclick = checkEval;
    App.show('eval');
  }

  function checkEval() {
    const d = evalData; const tol = 0.051;
    const st = k => parseNum($(`[data-st="${k}"]`).value);
    const okSt = { media: Math.abs(st('media') - d.media) <= tol, mediana: Math.abs(st('mediana') - d.mediana) <= tol, rango: Math.abs(st('rango') - d.rango) <= tol };
    const ptsSt = Object.values(okSt).filter(Boolean).length * 10;
    let escOk = 0, refOk = 0;
    d.list.forEach((x, i) => {
      const sel = $(`[data-esc="${i}"]`); const right = escalaDe(x.nota);
      if (sel.value === right) escOk++;
      sel.closest('td').insertAdjacentHTML('beforeend', ` <span class="small ${sel.value === right ? 'ok' : 'bad'}">${sel.value === right ? '✔' : '→ ' + right}</span>`);
      const cb = $(`[data-ref="${i}"]`); const need = x.nota < 7;
      if (cb.checked === need) refOk++;
      cb.closest('td').insertAdjacentHTML('beforeend', ` <span class="small ${cb.checked === need ? 'ok' : 'bad'}">${cb.checked === need ? '✔' : (need ? '→ sí' : '→ no')}</span>`);
    });
    const ptsEsc = Math.round(escOk / d.list.length * 30), ptsRef = Math.round(refOk / d.list.length * 20);
    const tipo = ($('[name="ev-tipo"]:checked') || {}).value;
    const dec = ($('[name="ev-dec"]:checked') || {}).value;
    const ptsTipo = tipo === 'sumativa' ? 10 : 0;
    const ptsDec = dec !== undefined && d.decision[+dec].ok ? 10 : 0;
    const total = ptsSt + ptsEsc + ptsRef + ptsTipo + ptsDec;
    const counts = ESCALA.map(e => d.list.filter(x => escalaDe(x.nota) === e.id).length);
    const max = Math.max(1, ...counts);
    $('#eval-result').innerHTML = scoreHead('Análisis de resultados', 'Estadística Descriptiva · Evaluación de Aprendizajes', total) + `
      <div class="report-grid">
        <div class="card"><h2>Respuestas correctas</h2>
          <ul>
            <li>Promedio: <b>${fmt(d.media)}</b> ${okSt.media ? '✔' : '✘'}</li>
            <li>Mediana: <b>${fmt(d.mediana)}</b> ${okSt.mediana ? '✔' : '✘'} <span class="small muted">(se ordenan las notas y se toma el valor central o el promedio de los dos centrales)</span></li>
            <li>Rango: <b>${fmt(d.rango)}</b> ${okSt.rango ? '✔' : '✘'} <span class="small muted">(nota mayor − nota menor)</span></li>
            <li>Desviación estándar (referencia): <b>${fmt(d.desv)}</b></li>
            <li>Escala cualitativa: ${escOk}/${d.list.length} correctas</li>
            <li>Refuerzo académico: ${refOk}/${d.list.length} correctas (todo estudiante con nota menor a 7)</li>
            <li>Tipo de evaluación: <b>sumativa</b> ${ptsTipo ? '✔' : '✘'}</li>
            <li>Decisión: <b>${esc(d.decision.find(x => x.ok).t)}</b> ${ptsDec ? '✔' : '✘'}</li>
          </ul></div>
        <div class="card"><h2>Distribución por escala</h2>
          <div class="hbars">${ESCALA.map((e, i) => `<div class="hbar"><span>${e.id}</span><div><i style="width:${counts[i] / max * 100}%"></i></div><b>${counts[i]}</b></div>`).join('')}</div>
          <p class="small muted">${d.bajo7.length} de ${d.list.length} estudiantes (${Math.round(d.bajo7.length / d.list.length * 100)} %) están bajo 7 y requieren refuerzo académico.</p></div>
      </div>
      <div class="report-actions"><button class="btn btn-primary" id="eval-new">🔁 Otro curso</button><button class="btn" data-go="hub">🏠 Menú principal</button></div>`;
    $('#eval-result').hidden = false;
    $('#eval-check').disabled = true;
    $('#eval-new').onclick = () => openEval(null);
    $$('#eval-result [data-go]').forEach(b => b.onclick = () => App.show(b.dataset.go));
    $('#eval-result').scrollIntoView({ behavior: 'smooth' });
    saveHistory('Evaluación', d.fromClass ? 'Análisis de calificaciones de la clase' : 'Análisis de calificaciones', total);
  }

  /* ================== CASOS ================== */

  /* ================== PRÁCTICAS POR ASIGNATURA ================== */
  function openAsig(cod) {
    const lista = window.CASOS_ASIG || [];
    $('#screen-cases h1').textContent = 'Prácticas por asignatura';
    $('#cases-list').innerHTML = '<p class="muted">Una situación simulada para cada asignatura de la malla: actúa en la escena y responde con tu voz o por escrito.</p>' +
      [1, 2, 3, 4].map(pao => {
        const ms = MALLA.filter(m => m.pao === pao && lista.some(x => x.cod === m.cod));
        return ms.length ? `<h3 class="asig-pao">PAO ${pao}</h3><div class="topic-list">${ms.map(m => { const c = lista.find(x => x.cod === m.cod); return `<button class="choice" data-asig="${m.cod}"><span class="em">${c.persona.avatar}</span><span><b>${esc(m.n)}</b><small>${esc(c.titulo)}</small><small class="tags">${esc(c.objetivo || c.persona.rol)}</small></span></button>`; }).join('')}</div>` : '';
      }).join('');
    $$('[data-asig]').forEach(b => b.onclick = () => playCase(lista.find(x => x.cod === b.dataset.asig)));
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    App.show('cases');
    const b = cod && document.querySelector(`[data-asig="${cod}"]`); if (b) b.click();
  }

  function openCases(filterCod) {
    $('#screen-cases h1').textContent = 'Casos profesionales';
    const list = filterCod ? CASES.filter(c => c.asignaturas.includes(filterCod)) : CASES;
    $('#cases-list').innerHTML = (filterCod ? `<p class="muted">Casos relacionados con <b>${esc(subj(filterCod).n)}</b>. <button class="btn btn-sm" id="cases-all">Ver todos</button></p>` : '') +
      `<div class="topic-list">${list.map(c => `<button class="choice" data-case="${c.id}"><span class="em">${c.persona.avatar}</span><span><b>${esc(c.titulo)}</b><small>${esc(c.persona.rol)}</small><small class="tags">${c.asignaturas.map(a => esc(subj(a).n)).join(' · ')}</small></span></button>`).join('')}</div>`;
    $$('[data-case]').forEach(b => b.onclick = () => playCase(CASES.find(c => c.id === b.dataset.case)));
    if (filterCod) $('#cases-all').onclick = () => openCases();
    $('#case-player').hidden = true; $('#cases-list').hidden = false;
    App.show('cases');
  }

  /* las acotaciones entre paréntesis se muestran como narración */
  function sayLine(c, t) {
    return /^\(.*\)$/.test(t) ? `<div class="case-say"><i>${esc(t.slice(1, -1))}</i></div>` : `<div class="case-say"><b>${esc(c.persona.nombre)}:</b> “${esc(t)}”</div>`;
  }
  function playCase(c) {
    // situación simulada: actuar en la escena y responder hablando o escribiendo
    if (window.CasoVivo) {
      $('#cases-list').hidden = true; $('#case-player').hidden = false;
      const ok = CasoVivo.play(c, { P: $('#case-player'), btn: 'btn-primary', speak: App.speak, toast: App.toast, scoreHead,
        sub: (c.cod ? 'Práctica de la asignatura · ' : 'Caso profesional · ') + c.asignaturas.map(a => (subj(a) || {}).n).join(', '),
        onEnd: total => saveHistory(c.cod ? 'Asignatura' : 'Casos', c.titulo, total), onList: () => c.cod ? openAsig() : openCases(), onMenu: () => App.show('hub') });
      if (ok) return;
    }
    const st = { i: 0, pts: 0, log: [] };
    $('#cases-list').hidden = true; $('#case-player').hidden = false;
    const P = $('#case-player');
    const step = async () => {
      const paso = c.pasos[st.i];
      P.innerHTML = `
        <div class="case-head card"><span class="case-av">${c.persona.avatar}</span><div><h2>${esc(c.titulo)}</h2><p class="muted">${esc(c.persona.nombre)} · ${esc(c.persona.rol)}</p><p class="small">${esc(c.contexto)}</p></div><span class="pill pill-soft">Paso ${st.i + 1}/${c.pasos.length}</span></div>
        <div class="card">${sayLine(c, paso.dice)}
        <p class="small muted">¿Qué haces o dices?</p>
        <div class="dialog-choices" id="case-opts">${shuffle(paso.opciones).map(o => `<button class="btn" data-p="${paso.opciones.indexOf(o)}">${esc(o.t)}</button>`).join('')}</div>
        <div id="case-fb"></div></div>`;
      $$('#case-opts .btn').forEach(b => b.onclick = async () => {
        const o = paso.opciones[+b.dataset.p];
        $$('#case-opts .btn').forEach(x => { x.disabled = true; if (x !== b) x.style.opacity = .5; });
        if (o.p !== 1) b.classList.add(o.p === 2 ? 'good' : 'bad');
        st.pts += o.p; st.log.push({ dice: paso.dice, t: o.t, p: o.p, fb: o.fb });
        const color = o.p === 2 ? 'var(--ok)' : o.p === 1 ? 'var(--warn)' : 'var(--bad)';
        $('#case-fb').innerHTML = `${sayLine(c, o.r)}
          <div class="case-fb" style="border-color:${color}"><b style="color:${color}">${o.p === 2 ? 'Respuesta adecuada' : o.p === 1 ? 'Respuesta parcialmente adecuada' : 'Respuesta inadecuada'}</b><br>${esc(o.fb)}</div>
          <button class="btn btn-primary" id="case-next">${st.i + 1 < c.pasos.length ? 'Continuar ▶' : 'Ver resultado'}</button>`;
        $('#case-next').onclick = () => { st.i++; if (st.i < c.pasos.length) step(); else finish(); };
        App.speak(o.r.replace(/^\(.*\)$/, ''), c.persona.pitch);
      });
      if (!/^\(/.test(paso.dice)) App.speak(paso.dice, c.persona.pitch);
    };
    const finish = () => {
      const total = Math.round(st.pts / (c.pasos.length * 2) * 100);
      P.innerHTML = scoreHead(c.titulo, 'Caso de práctica profesional · ' + c.asignaturas.map(a => subj(a).n).join(', '), total) + `
        <div class="card"><h2>Tus decisiones</h2><ol>${st.log.map(l => `<li><p><b>${l.p === 2 ? '✔' : l.p === 1 ? '◐' : '✘'}</b> ${esc(l.t)}</p><p class="small muted">${esc(l.fb)}</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn btn-primary" id="case-again">🔁 Repetir el caso</button><button class="btn" id="case-list">🤝 Otros casos</button><button class="btn" data-go="hub">🏠 Menú principal</button></div>`;
      $('#case-again').onclick = () => playCase(c);
      $('#case-list').onclick = () => openCases();
      $$('#case-player [data-go]').forEach(b => b.onclick = () => App.show(b.dataset.go));
      saveHistory('Casos', c.titulo, total);
      window.scrollTo(0, 0);
    };
    step();
    window.scrollTo(0, 0);
  }

  /* ================== MAPA CURRICULAR ================== */
  function openMapa() {
    $('#mapa-grid').innerHTML = [1, 2, 3, 4].map(pao => `<div class="mapa-col"><h3>PAO ${pao}</h3>
      ${MALLA.filter(m => m.pao === pao).map(m => `<button class="mapa-chip ${m.rel}" data-cod="${m.cod}"><b>${esc(m.n)}</b><small>${m.mod.map(k => MODULES[k].emoji).join(' ')} · ${m.u}</small></button>`).join('')}</div>`).join('');
    $$('[data-cod]').forEach(b => b.onclick = () => showSubject(b.dataset.cod));
    $('#mapa-detail').innerHTML = '<p class="muted">Selecciona una asignatura para ver qué contenidos se practican y en qué módulo.</p>';
    App.show('mapa');
  }
  function showSubject(cod) {
    const m = subj(cod);
    $$('[data-cod]').forEach(b => b.classList.toggle('sel', b.dataset.cod === cod));
    const casos = CASES.filter(c => c.asignaturas.includes(cod));
    $('#mapa-detail').innerHTML = `<h2>${esc(m.n)}</h2>
      <p class="small muted">${m.cod} · PAO ${m.pao} · Unidad ${m.u} · Relación ${m.rel}</p>
      <p>${esc(m.sim)}</p>
      <div class="report-actions">${m.mod.map(k => `<button class="btn" data-mod="${k}">${MODULES[k].emoji} ${MODULES[k].nombre}</button>`).join('')}${(window.CASOS_ASIG || []).some(x => x.cod === m.cod) ? '<button class="btn" data-mod="asig">🎯 Práctica de la asignatura</button>' : ''}</div>
      ${casos.length ? `<p class="small"><b>Casos relacionados:</b> ${casos.map(c => esc(c.titulo)).join(' · ')}</p>` : ''}`;
    $$('#mapa-detail [data-mod]').forEach(b => b.onclick = () => {
      const k = b.dataset.mod;
      if (k === 'aula') { $('#f-plan').checked = false; App.renderSetup(); App.show('setup'); }
      if (k === 'plan') { $('#f-plan').checked = true; App.renderSetup(); App.show('setup'); }
      if (k === 'eval') openEval(null);
      if (k === 'casos') openCases(casos.length ? cod : undefined);
      if (k === 'asig') openAsig(cod);
    });
    if (window.innerWidth < 900) $('#mapa-detail').scrollIntoView({ behavior: 'smooth' });
  }

  $('#plan-form-wrap').onsubmit = submitPlan;
  window.Modules = { renderHub, openPlan, planCoherence, openEval, openCases, openMapa };
})();
