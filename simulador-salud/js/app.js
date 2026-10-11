/* Martin´s Capacitaciones · Lógica de la aplicación.
   Navegación por hash (#/curso/<id>/<pestaña>) para que el botón "atrás" del
   celular funcione. Los ajustes visuales se guardan en el dispositivo; los
   usuarios y el progreso, en Store (base compartida o el dispositivo). */

(function () {
  "use strict";

  const STORAGE_KEY = "martins_salud_v1";
  const PASS = 70;
  const SESSION_KEY = "martins_sesion_v1";
  const defaultState = {
    tema: "auto",
    texto: "m",
    voz: 1,
    sfx: true,
    reduceMotion: false,
    progreso: {}
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(defaultState);
      const p = JSON.parse(raw);
      return { ...structuredClone(defaultState), ...p, progreso: {} };
    } catch (e) {
      return structuredClone(defaultState);
    }
  }
  // Sesión: usuario que ha iniciado sesión (cuenta creada por el administrador).
  let session = null;
  let saveTimer = 0;
  function saveState() {
    const { progreso, ...ajustes } = state;
    void progreso;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ajustes)); } catch (e) { /* sin almacenamiento */ }
    if (session) {
      clearTimeout(saveTimer);
      const u = session.usuario;
      const snapshot = JSON.parse(JSON.stringify(state.progreso));
      saveTimer = setTimeout(() => {
        Store.saveProgress(u, snapshot).catch((e) => {
          if (e && e.code === "invalid_argument") toast("Tu progreso no se pudo guardar en línea: pide al administrador acceso de colaborador a la página.");
        });
      }, 1200);
    }
  }
  const isAdmin = () => !!session && session.rol === "admin";
  function allowed(c) {
    if (!session) return false;
    if (isAdmin()) return true;
    return (session.areas || []).includes(c.cat) || (session.cursos || []).includes(c.id);
  }
  const myCourses = () => COURSES.filter(allowed);
  function prog(id) {
    if (!state.progreso[id]) state.progreso[id] = { lecc: [], prac: {}, quiz: 0, reto3d: 0, cine: false, cert: null };
    return state.progreso[id];
  }

  // ===== Utilidades =====
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byId = (id) => COURSES.find((c) => c.id === id);
  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
    return r;
  }
  let toastTimer = 0;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2800);
  }

  // ===== Voz =====
  function pickVoice() {
    const vs = "speechSynthesis" in window ? speechSynthesis.getVoices() : [];
    return vs.find((v) => /^es[-_](EC|419|MX|US|CO|PE)/i.test(v.lang)) || vs.find((v) => /^es/i.test(v.lang)) || null;
  }
  function speak(text, onEnd) {
    if (!("speechSynthesis" in window)) { if (onEnd) onEnd(); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = v ? v.lang : "es-ES";
    u.rate = state.voz;
    u.onend = () => onEnd && onEnd();
    u.onerror = () => onEnd && onEnd();
    speechSynthesis.speak(u);
  }
  function stopSpeak() { if ("speechSynthesis" in window) speechSynthesis.cancel(); }
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = () => {};

  // ===== Progreso =====
  function courseProgress(c, progreso = state.progreso) {
    const p = progreso[c.id];
    if (!p) return 0;
    const lec = p.lecc.length / c.lecciones.length;
    const prac = c.practicas.filter((_, i) => (p.prac[i] || 0) >= 60).length / c.practicas.length;
    const quiz = p.quiz >= PASS ? 1 : p.quiz / 100 * 0.5;
    const exp = (p.reto3d > 0 ? 0.5 : 0) + (p.cine ? 0.5 : 0);
    return Math.round(lec * 30 + prac * 30 + quiz * 30 + exp * 10);
  }
  function totalPoints() {
    let pts = 0;
    for (const c of myCourses()) {
      const p = state.progreso[c.id];
      if (!p) continue;
      pts += p.lecc.length * 10;
      pts += Object.values(p.prac).reduce((a, b) => a + b, 0) / 5;
      pts += p.quiz;
      pts += p.reto3d / 4 + (p.cine ? 15 : 0);
      if (p.cert) pts += 100;
    }
    return Math.round(pts);
  }
  function updatePoints() { $("#points").textContent = `⭐ ${totalPoints()}`; }

  // ===== Tema y ajustes =====
  function applySettings() {
    const root = document.documentElement;
    const dark = state.tema === "dark" || (state.tema === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.dataset.theme = dark ? "dark" : "light";
    root.dataset.size = state.texto;
    root.dataset.motion = state.reduceMotion ? "reduce" : "";
    document.querySelector('meta[name="theme-color"]').content = "#223146";
    Sims2D.sound = state.sfx;
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (state.tema === "auto") { applySettings(); rerender3D(); } });

  // ===================================================================
  // INICIO
  // ===================================================================
  let filtroCat = "Todos";
  let filtroTxt = "";

  function renderHome() {
    $("#hero-name").textContent = session.nombre.split(" ")[0];
    const mine = myCourses();
    $("#hero-access").textContent = isAdmin()
      ? "Eres administrador: tienes acceso a todos los cursos y al portal de usuarios."
      : `Tienes acceso a ${mine.length} curso(s)${(session.areas || []).length ? ` de: ${session.areas.join(", ")}` : ""}.`;

    const started = mine.filter((c) => courseProgress(c) > 0).length;
    const done = mine.filter((c) => courseProgress(c) >= 100).length;
    const certs = mine.filter((c) => state.progreso[c.id] && state.progreso[c.id].cert).length;
    $("#stats").innerHTML = [
      ["📚", mine.length, "Mis cursos"],
      ["🚀", started, "Iniciados"],
      ["🎓", certs, "Certificados"],
      ["⭐", totalPoints(), "Puntos"]
    ].map(([i, n, l]) => `<div class="stat"><span class="ico">${i}</span><div><b>${n}</b><small>${l}</small></div></div>`).join("");
    void done;

    const cats = ["Todos", ...CATEGORIAS.filter((c) => mine.some((x) => x.cat === c))];
    if (!cats.includes(filtroCat)) filtroCat = "Todos";
    $("#cat-chips").innerHTML = cats.map((c) => `<button class="cat-chip${c === filtroCat ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    renderGrid();
  }

  function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  function renderGrid() {
    const q = norm(filtroTxt.trim());
    const list = myCourses().filter((c) => {
      if (filtroCat !== "Todos" && c.cat !== filtroCat) return false;
      if (!q) return true;
      const hay = norm([c.nombre, c.cat, c.desc, ...c.lecciones.map((l) => l.t), ...c.practicas.map((p) => p.titulo)].join(" "));
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
    $("#empty").hidden = list.length > 0;
    $("#empty").textContent = myCourses().length ? "No se encontraron cursos con esa búsqueda." : "Todavía no tienes cursos asignados. Pide a tu administrador que te asigne un área.";
    $("#course-grid").innerHTML = list.map((c) => {
      const pr = courseProgress(c);
      const cert = state.progreso[c.id] && state.progreso[c.id].cert;
      return `<a class="course-card" href="#/curso/${c.id}/teoria">
        ${cert ? '<span class="done-badge">🎓 Certificado</span>' : pr >= 100 ? '<span class="done-badge">✔ Completo</span>' : ""}
        <div class="cc-top"><span class="cc-icon" aria-hidden="true">${c.icono}</span>
          <div><div class="cc-cat">${esc(c.cat)} · ${esc(c.nivel)}</div><h3>${esc(c.nombre)}</h3></div></div>
        <p>${esc(c.desc)}</p>
        <div class="cc-badges"><span>2D</span><span>3D</span><span>CINE</span><span>VR</span><span>AR</span></div>
        <div class="cc-meta"><span>⏱ ${c.horas} h · ${c.lecciones.length} lecciones · ${c.practicas.length} prácticas</span><span>${pr}%</span></div>
        <div class="bar"><i style="width:${pr}%"></i></div>
      </a>`;
    }).join("");
  }

  $("#cat-chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    filtroCat = b.dataset.cat;
    $("#cat-chips").querySelectorAll(".cat-chip").forEach((x) => x.classList.toggle("active", x === b));
    renderGrid();
  });
  $("#search").addEventListener("input", (e) => { filtroTxt = e.target.value; renderGrid(); });

  // ===================================================================
  // CURSO
  // ===================================================================
  let current = null;
  let currentTab = null;
  let cleanup = null;
  let viewer = null;

  function teardown() {
    stopSpeak();
    if (cleanup) { try { cleanup(); } catch (e) { /* nada */ } cleanup = null; }
    if (viewer) { try { viewer.destroy(); } catch (e) { /* nada */ } viewer = null; }
  }

  function renderCourseHead(c) {
    $("#course-icon").textContent = c.icono;
    $("#course-title").textContent = c.nombre;
    $("#course-meta").textContent = `${c.cat} · Nivel ${c.nivel} · ${c.horas} horas`;
    updateRing(c);
  }
  function updateRing(c) {
    const pr = courseProgress(c);
    $("#ring-fg").style.strokeDashoffset = 100 - pr;
    $("#ring-txt").textContent = `${pr}%`;
    updatePoints();
  }

  function openCourse(id, tab) {
    const c = byId(id);
    if (!c || !allowed(c)) {
      if (c) toast("Ese curso no está asignado a tu usuario.");
      location.hash = "#/";
      return;
    }
    const changed = current !== c;
    current = c;
    showView("course");
    if (changed) renderCourseHead(c);
    if (changed || tab !== currentTab) {
      teardown();
      currentTab = tab;
      $("#tabs").querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === tab ? "true" : "false"));
      const btn = $(`#tabs [data-tab="${tab}"]`);
      if (btn) btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      const panel = $("#panel");
      panel.replaceChildren();
      ({ teoria: tabTeoria, practica: tabPractica, "3d": tab3D, cine: tabCine, xr: tabXR, quiz: tabQuiz, cert: tabCert }[tab] || tabTeoria)(c, panel);
    }
  }

  $("#tabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (!b || !current) return;
    if (b.dataset.tab === currentTab) { currentTab = null; openCourse(current.id, b.dataset.tab); }
    else location.hash = `#/curso/${current.id}/${b.dataset.tab}`;
  });

  // ----- Teoría -----
  function tabTeoria(c, panel) {
    const p = prog(c.id);
    panel.innerHTML = `<div class="panel-intro"><p>${esc(c.desc)}</p><span class="chip chip-soft">${p.lecc.length}/${c.lecciones.length} estudiadas</span></div>`;
    c.lecciones.forEach((l, i) => {
      const d = document.createElement("details");
      d.className = `lesson${p.lecc.includes(i) ? " read" : ""}`;
      if (i === 0 && !p.lecc.length) d.open = true;
      d.innerHTML = `<summary><span class="lesson-num">${p.lecc.includes(i) ? "✓" : i + 1}</span><span>${esc(l.t)}</span><span class="chev" aria-hidden="true">▾</span></summary>
        <div class="lesson-body"><ul>${l.c.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <div class="lesson-actions"><button class="btn btn-secondary btn-sm" data-act="say">🔊 Escuchar</button>
        <button class="btn btn-primary btn-sm" data-act="read">${p.lecc.includes(i) ? "✓ Estudiada" : "Marcar como estudiada"}</button></div></div>`;
      d.querySelector('[data-act="say"]').onclick = () => speak(`${l.t}. ${l.c.join(" ")}`);
      d.querySelector('[data-act="read"]').onclick = (e) => {
        if (!p.lecc.includes(i)) {
          p.lecc.push(i);
          saveState();
          d.classList.add("read");
          d.querySelector(".lesson-num").textContent = "✓";
          e.target.textContent = "✓ Estudiada";
          panel.querySelector(".panel-intro .chip").textContent = `${p.lecc.length}/${c.lecciones.length} estudiadas`;
          updateRing(c);
          toast("+10 ⭐ Lección estudiada");
          const next = d.nextElementSibling;
          d.open = false;
          if (next && next.tagName === "DETAILS") { next.open = true; next.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
          else if (p.lecc.length === c.lecciones.length) toast("¡Teoría completa! Sigue con la Práctica 2D ✋");
        }
      };
      panel.append(d);
    });
    const next = document.createElement("div");
    next.className = "result-actions";
    next.innerHTML = `<a class="btn btn-primary" href="#/curso/${c.id}/practica">Ir a la práctica ✋</a>`;
    panel.append(next);
  }

  // ----- Práctica 2D -----
  function tabPractica(c, panel) {
    const p = prog(c.id);
    panel.innerHTML = `<div class="panel-intro"><p>Practica con simuladores interactivos. Necesitas 60% o más para aprobar cada práctica.</p></div><div class="prac-grid"></div>`;
    const grid = panel.querySelector(".prac-grid");
    c.practicas.forEach((pr, i) => {
      const t = Sims2D.TIPOS[pr.tipo];
      const best = p.prac[i];
      const b = document.createElement("button");
      b.className = "prac-card";
      b.innerHTML = `<span class="prac-type">${t.icono} ${t.nombre}</span><h3>${esc(pr.titulo)}</h3><p>${esc(pr.desc)}</p>
        ${best != null ? `<span class="best${best >= 60 ? " pass" : ""}">Mejor: ${best}%</span>` : '<span class="best">Sin intentar</span>'}`;
      b.onclick = () => runPractice(c, i, panel);
      grid.append(b);
    });
  }

  function runPractice(c, i, panel) {
    teardown();
    const pr = c.practicas[i];
    const t = Sims2D.TIPOS[pr.tipo];
    panel.innerHTML = `<div class="card"><div class="stage-head"><button class="btn btn-ghost btn-sm" data-back>⬅️ Prácticas</button><h2>${t.icono} ${esc(pr.titulo)}</h2></div><p class="stage-desc">${esc(pr.desc)}</p><div class="stage"></div></div>`;
    panel.querySelector("[data-back]").onclick = () => { teardown(); tabPractica(c, panel); };
    const stage = panel.querySelector(".stage");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    cleanup = Sims2D.run(pr, stage, {
      speak,
      finish(score, resumen) {
        teardown();
        const p = prog(c.id);
        const prev = p.prac[i];
        if (prev == null || score > prev) p.prac[i] = score;
        saveState();
        updateRing(c);
        const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 40 ? 1 : 0;
        const msg = score >= 90 ? "¡Excelente desempeño!" : score >= 60 ? "¡Práctica aprobada!" : "Sigue practicando, ¡tú puedes!";
        const nextIdx = i + 1 < c.practicas.length ? i + 1 : -1;
        stage.innerHTML = `<div class="result"><div class="result-stars" aria-label="${stars} de 3 estrellas">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
          <div class="result-score">${score}%</div><h3>${msg}</h3><p class="muted">${esc(resumen || "")}${prev != null && score > prev ? " · ¡Nuevo récord!" : ""}</p>
          <div class="result-actions"><button class="btn btn-secondary" data-r>🔁 Repetir</button>
          ${nextIdx >= 0 ? '<button class="btn btn-primary" data-n>Siguiente práctica ➡️</button>' : `<a class="btn btn-primary" href="#/curso/${c.id}/3d">Ir al modo 3D 🧊</a>`}</div></div>`;
        stage.querySelector("[data-r]").onclick = () => runPractice(c, i, panel);
        const n = stage.querySelector("[data-n]");
        if (n) n.onclick = () => runPractice(c, nextIdx, panel);
        speak(`${msg} Obtuviste ${score} por ciento.`);
      }
    });
  }

  // ----- 3D / Cine / VR -----
  let threeMod = null;
  function loadThree() {
    if (!threeMod) threeMod = import("./scene3d.js");
    return threeMod;
  }
  function webglOK() {
    try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; }
  }

  function mountViewer(c, panel, mode, tips) {
    const host = document.createElement("div");
    host.className = "viewer-host";
    host.innerHTML = `<div class="viewer-loading"><div><div class="spinner"></div>Cargando escena 3D…</div></div>`;
    panel.append(host);
    if (tips) {
      const t = document.createElement("div");
      t.className = "viewer-tips";
      t.innerHTML = tips.map(([a, b]) => `<div class="card"><strong>${a}</strong>${b}</div>`).join("");
      panel.append(t);
    }
    if (!webglOK()) {
      host.innerHTML = `<div class="viewer-loading"><div>⚠️ Tu navegador no admite gráficos 3D (WebGL).<br>Prueba con Chrome, Edge, Firefox o Safari actualizados.</div></div>`;
      return;
    }
    const tabAtMount = currentTab;
    loadThree().then((m) => {
      if (currentTab !== tabAtMount || !host.isConnected) return;
      viewer = m.mount(host, c, {
        mode, speak, stopSpeak,
        onReto(score) {
          const p = prog(c.id);
          if (score > p.reto3d) { p.reto3d = score; saveState(); updateRing(c); }
          toast(`Reto 3D: ${score}%`);
        },
        onCine() {
          const p = prog(c.id);
          if (!p.cine) { p.cine = true; saveState(); updateRing(c); toast("+15 ⭐ Recorrido de cine completado"); }
        }
      });
    }).catch((err) => {
      console.error(err);
      host.innerHTML = `<div class="viewer-loading"><div>⚠️ No se pudo cargar el visor 3D.<br><small>Abre el simulador desde un servidor web (por ejemplo GitHub Pages) en lugar de abrir el archivo directamente.</small></div></div>`;
    });
  }

  function rerender3D() {
    if (current && ["3d", "cine", "xr"].includes(currentTab)) {
      const t = currentTab;
      currentTab = null;
      openCourse(current.id, t);
    }
  }

  function tab3D(c, panel) {
    mountViewer(c, panel, "explore", [
      ["🔍 Explorar", "Gira el modelo, acércate y toca los puntos dorados para ver la explicación."],
      ["🎯 Reto 3D", "Encuentra cada estructura sin etiquetas. ¡Suma puntos a tu progreso!"],
      ["🔊 Narración", "En cada punto puedes escuchar la explicación en voz alta."]
    ]);
  }
  function tabCine(c, panel) {
    mountViewer(c, panel, "cine", [
      ["🎬 Modo cine", "Recorrido cinematográfico narrado por cada punto clave del curso."],
      ["⏯ Controles", "Pausa, avanza o retrocede. Activa o silencia la narración."],
      ["📺 Pantalla completa", "Gira el celular en horizontal para una mejor experiencia."]
    ]);
  }
  function tabXR(c, panel) {
    mountViewer(c, panel, "xr", [
      ["🥽 VR", "Con un visor (Meta Quest, Pico…) abre esta página en su navegador y pulsa «Entrar en VR». El modelo aparece a tamaño real."],
      ["📱 AR", "En Android con Chrome, pulsa «Ver en AR», apunta a una superficie y toca para colocar el modelo."],
      ["📦 Cardboard", "Pon el celular en unas gafas de cartón. Mira un punto durante 1,5 segundos para seleccionarlo."]
    ]);
  }

  // ----- Evaluación -----
  function tabQuiz(c, panel) {
    const p = prog(c.id);
    panel.innerHTML = `<div class="card"><h2>📝 Evaluación final</h2>
      <p class="muted">${c.quiz.length} preguntas de opción múltiple. Necesitas ${PASS}% para aprobar y obtener tu certificado.</p>
      <div class="quiz-summary"><div><b>${c.quiz.length}</b>Preguntas</div><div><b>${PASS}%</b>Para aprobar</div><div><b>${p.quiz || 0}%</b>Tu mejor nota</div></div>
      <div class="result-actions"><button class="btn btn-primary btn-large" data-start>Comenzar evaluación ▶</button></div></div>`;
    panel.querySelector("[data-start]").onclick = () => runQuiz(c, panel);
  }

  function runQuiz(c, panel) {
    const qs = shuffle(c.quiz).map((q) => {
      const ops = shuffle(q.ops.map((t, i) => ({ t, ok: i === q.ok })));
      return { ...q, ops };
    });
    let i = 0;
    let ok = 0;
    const answers = [];
    const card = document.createElement("div");
    card.className = "card";
    panel.replaceChildren(card);

    function show() {
      const q = qs[i];
      card.innerHTML = `<div class="sim-head"><span class="chip">Pregunta ${i + 1} de ${qs.length}</span><button class="btn btn-ghost btn-sm" data-say>🔊</button></div>
        <div class="sim-progress"><div class="sim-progress-bar" style="width:${(i / qs.length) * 100}%"></div></div>
        <p class="quiz-q">${esc(q.q)}</p><div class="opt-list">${q.ops.map((o, k) => `<button class="opt" data-k="${k}">${String.fromCharCode(65 + k)}. ${esc(o.t)}</button>`).join("")}</div>
        <div class="sim-feedback" role="status" aria-live="polite"></div><button class="btn btn-primary" data-next hidden>Siguiente ➡️</button>`;
      card.querySelector("[data-say]").onclick = () => speak(`${q.q}. ${q.ops.map((o, k) => `${String.fromCharCode(65 + k)}: ${o.t}`).join(". ")}`);
      const fb = card.querySelector(".sim-feedback");
      const next = card.querySelector("[data-next]");
      card.querySelectorAll(".opt").forEach((b) => {
        b.onclick = () => {
          if (!next.hidden) return;
          const o = q.ops[+b.dataset.k];
          if (o.ok) ok++;
          answers.push({ q, chosen: o.t, ok: o.ok });
          card.querySelectorAll(".opt").forEach((x) => { x.disabled = true; if (q.ops[+x.dataset.k].ok) x.classList.add("ok"); });
          if (!o.ok) b.classList.add("bad");
          fb.className = `sim-feedback ${o.ok ? "ok" : "bad"}`;
          fb.innerHTML = `${o.ok ? "✅ ¡Correcto!" : "❌ Incorrecto."} <span class="exp">${esc(q.exp)}</span>`;
          next.hidden = false;
          next.textContent = i + 1 < qs.length ? "Siguiente ➡️" : "Ver resultado";
          next.focus({ preventScroll: true });
        };
      });
      next.onclick = () => { i++; i < qs.length ? show() : finish(); };
    }

    function finish() {
      const score = Math.round((ok / qs.length) * 100);
      const p = prog(c.id);
      const first = !p.cert && score >= PASS;
      if (score > p.quiz) p.quiz = score;
      if (score >= PASS && !p.cert) p.cert = { fecha: new Date().toISOString(), codigo: certCode(c), nota: score };
      if (p.cert && score > p.cert.nota) p.cert.nota = score;
      saveState();
      updateRing(c);
      const pass = score >= PASS;
      card.innerHTML = `<div class="result"><div class="result-stars">${pass ? "🎉" : "📚"}</div><div class="result-score">${score}%</div>
        <h3>${pass ? "¡Aprobaste la evaluación!" : "Aún no alcanzas el puntaje mínimo"}</h3>
        <p class="muted">${ok} de ${qs.length} respuestas correctas · mínimo ${PASS}%</p>
        <div class="result-actions">${pass ? `<a class="btn btn-primary" href="#/curso/${c.id}/cert">🎓 Ver mi certificado</a>` : ""}
        <button class="btn btn-secondary" data-retry>🔁 Intentar de nuevo</button>
        ${pass ? "" : `<a class="btn btn-primary" href="#/curso/${c.id}/teoria">📘 Repasar teoría</a>`}</div>
        <details class="review"><summary><strong>Revisar respuestas</strong></summary><ol>${answers.map((a) => `<li>${a.ok ? "✅" : "❌"} ${esc(a.q.q)}<span class="exp">Tu respuesta: ${esc(a.chosen)} · ${esc(a.q.exp)}</span></li>`).join("")}</ol></details></div>`;
      card.querySelector("[data-retry]").onclick = () => runQuiz(c, panel);
      speak(pass ? `¡Felicitaciones! Aprobaste con ${score} por ciento.` : `Obtuviste ${score} por ciento. Repasa y vuelve a intentarlo.`);
      if (first) toast("🎓 ¡Certificado desbloqueado! +100 ⭐");
    }
    show();
  }

  function certCode(c) {
    const base = `${session.usuario}|${c.id}|${Date.now()}`;
    let h = 2166136261;
    for (let k = 0; k < base.length; k++) { h ^= base.charCodeAt(k); h = Math.imul(h, 16777619); }
    return `MC-${c.id.slice(0, 3).toUpperCase()}-${(h >>> 0).toString(36).toUpperCase().padStart(7, "0")}`;
  }

  // ----- Certificado -----
  function tabCert(c, panel) {
    const p = prog(c.id);
    if (!p.cert) {
      const lec = p.lecc.length === c.lecciones.length;
      const prac = c.practicas.every((_, i) => (p.prac[i] || 0) >= 60);
      panel.innerHTML = `<div class="card locked"><div class="big">🔒</div><h2>Certificado bloqueado</h2>
        <p class="muted">Aprueba la evaluación final con ${PASS}% o más para obtener tu certificado. Recomendado:</p>
        <ul class="req"><li class="${lec ? "ok" : ""}">${lec ? "✅" : "⬜"} Estudiar todas las lecciones (${p.lecc.length}/${c.lecciones.length})</li>
        <li class="${prac ? "ok" : ""}">${prac ? "✅" : "⬜"} Aprobar las prácticas 2D</li>
        <li class="${p.reto3d || p.cine ? "ok" : ""}">${p.reto3d || p.cine ? "✅" : "⬜"} Explorar el 3D o el modo cine</li>
        <li>⬜ Evaluación final: mejor nota ${p.quiz}% (mínimo ${PASS}%)</li></ul>
        <a class="btn btn-primary" href="#/curso/${c.id}/quiz">📝 Ir a la evaluación</a></div>`;
      return;
    }
    const f = new Date(p.cert.fecha).toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" });
    panel.innerHTML = `<div class="panel-intro"><p>Descárgalo como PDF eligiendo «Guardar como PDF» en la ventana de impresión.</p>
      <div class="result-actions" style="margin:0"><button class="btn btn-primary" data-print>🖨️ Imprimir / PDF</button>${navigator.share ? '<button class="btn btn-secondary" data-share>📤 Compartir</button>' : ""}</div></div>
      <div class="cert" id="cert">
        <img src="assets/logo.jpg" alt="Martin´s Capacitaciones" class="cert-logo" />
        <p class="cert-sub">Otorga el presente</p>
        <h2>CERTIFICADO DE APROBACIÓN</h2>
        <p>a:</p>
        <div class="cert-name">${esc(session.nombre)}</div>
        ${session.documento ? `<p>C.I. ${esc(session.documento)}</p>` : ""}
        <p>por haber aprobado el curso de capacitación con simulación interactiva</p>
        <p><strong style="font-size:1.15em;color:#223146">${esc(c.nombre)}</strong></p>
        <p>con una duración de <strong>${c.horas} horas</strong> y una calificación de <strong>${p.cert.nota}%</strong>.</p>
        <div class="cert-foot"><div>Dirección Académica<br><strong>Martin´s Capacitaciones</strong></div><div>Fecha de emisión<br><strong>${f}</strong></div></div>
        <p class="cert-code">Código de verificación: ${p.cert.codigo}</p>
      </div>`;
    const embedded = window.self !== window.top;
    panel.querySelector("[data-print]").onclick = () => {
      if (embedded) toast("Para imprimir o guardar en PDF, abre el simulador en su versión web (GitHub Pages).");
      else window.print();
    };
    const sh = panel.querySelector("[data-share]");
    if (sh) sh.onclick = () => navigator.share({ title: "Mi certificado · Martin´s Capacitaciones", text: `¡Aprobé el curso «${c.nombre}» en Martin´s Capacitaciones con ${p.cert.nota}%!` }).catch(() => {});
  }

  // ===================================================================
  // Router
  // ===================================================================
  function showView(v) {
    $("#view-home").hidden = v !== "home";
    $("#view-course").hidden = v !== "course";
    $("#view-login").hidden = v !== "login";
    $("#view-admin").hidden = v !== "admin";
    $("#view-loading").hidden = v !== "loading";
    document.body.classList.toggle("logged-out", v === "login" || v === "loading");
  }

  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (!session) {
      teardown();
      current = null;
      currentTab = null;
      showView("login");
      renderLogin();
      return;
    }
    if (parts[0] === "admin") {
      teardown();
      current = null;
      currentTab = null;
      if (!isAdmin()) { location.hash = "#/"; return; }
      showView("admin");
      window.scrollTo(0, 0);
      AdminPortal.render($("#view-admin"), {
        toast,
        courseProgress,
        currentUser: () => session,
        appLink: () => (window.self !== window.top ? "(el enlace que te compartió tu administrador)" : location.href.split("#")[0]),
        onUsersChanged(u) { if (u && u.usuario === session.usuario) { session = { ...session, ...u }; updateHeader(); } }
      });
      updatePoints();
      return;
    }
    if (parts[0] === "curso" && parts[1]) {
      const prevCourse = current;
      openCourse(parts[1], parts[2] || "teoria");
      if (prevCourse !== current) window.scrollTo(0, 0);
    } else {
      teardown();
      current = null;
      currentTab = null;
      showView("home");
      renderHome();
    }
    updatePoints();
  }
  window.addEventListener("hashchange", route);

  // ===================================================================
  // Ajustes
  // ===================================================================
  const settings = $("#settings");
  const overlay = $("#overlay");
  function openSettings() {
    document.querySelector(".acct").hidden = !session;
    $("#reset").hidden = !session;
    $("#acct-info").innerHTML = session ? `<strong>${esc(session.nombre)}</strong><small>@${esc(session.usuario)} · ${isAdmin() ? "Administrador" : "Estudiante"}</small>` : "";
    $("#set-rate").value = state.voz;
    $("#set-sfx").checked = state.sfx;
    $("#set-motion").checked = state.reduceMotion;
    markSeg("#set-theme", state.tema);
    markSeg("#set-size", state.texto);
    settings.hidden = false;
    overlay.hidden = false;
    $("#settings-close").focus();
  }
  function closeSettings() {
    saveState();
    settings.hidden = true;
    overlay.hidden = true;
    if (!session) return;
    if (!current && $("#view-admin").hidden) renderHome();
    else if (current && currentTab === "cert") { const t = currentTab; currentTab = null; openCourse(current.id, t); }
  }
  function markSeg(sel, v) { document.querySelectorAll(`${sel} button`).forEach((b) => b.classList.toggle("active", b.dataset.v === v)); }
  $("#settings-btn").onclick = openSettings;
  $("#settings-close").onclick = closeSettings;
  overlay.onclick = closeSettings;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !settings.hidden) closeSettings(); });
  $("#set-theme").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; state.tema = b.dataset.v; markSeg("#set-theme", state.tema); saveState(); applySettings(); rerender3D(); };
  $("#set-size").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; state.texto = b.dataset.v; markSeg("#set-size", state.texto); saveState(); applySettings(); };
  $("#set-rate").oninput = (e) => { state.voz = parseFloat(e.target.value); saveState(); };
  $("#set-sfx").onchange = (e) => { state.sfx = e.target.checked; saveState(); applySettings(); };
  $("#set-motion").onchange = (e) => { state.reduceMotion = e.target.checked; saveState(); applySettings(); };
  $("#test-voice").onclick = () => speak("Bienvenido a Martin's Capacitaciones, tu simulador de salud.");
  let resetArmed = 0;
  $("#reset").onclick = () => {
    if (Date.now() - resetArmed > 4000) {
      resetArmed = Date.now();
      $("#reset").textContent = "⚠️ Toca otra vez para confirmar el borrado";
      setTimeout(() => { $("#reset").textContent = "🗑️ Borrar todo mi progreso"; }, 4000);
      return;
    }
    resetArmed = 0;
    $("#reset").textContent = "🗑️ Borrar todo mi progreso";
    state.progreso = {};
    saveState();
    closeSettings();
    location.hash = "#/";
    toast("Progreso borrado");
  };
  $("#theme-btn").onclick = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    state.tema = dark ? "light" : "dark";
    saveState();
    applySettings();
    rerender3D();
  };

  // ===== Instalación como app (PWA) =====
  let installEvt = null;
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; $("#install-btn").hidden = false; });
  $("#install-btn").onclick = async () => {
    if (!installEvt) return;
    installEvt.prompt();
    await installEvt.userChoice.catch(() => {});
    installEvt = null;
    $("#install-btn").hidden = true;
  };
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }

  // ===================================================================
  // Inicio de sesión
  // ===================================================================
  function updateHeader() {
    const on = !!session;
    $("#user-btn").hidden = !on;
    $("#admin-btn").hidden = !isAdmin();
    $("#points").hidden = !on;
    if (on) $("#user-name").textContent = session.nombre.split(" ")[0];
  }

  async function startSession(user) {
    session = user;
    try { localStorage.setItem(SESSION_KEY, JSON.stringify({ usuario: user.usuario })); } catch (e) { /* nada */ }
    let remote = null;
    try { remote = await Store.getProgress(user.usuario); } catch (e) { /* sin progreso remoto */ }
    state.progreso = (remote && remote.progreso) || {};
    updateHeader();
  }

  function logout() {
    teardown();
    clearTimeout(saveTimer);
    if (session) Store.saveProgress(session.usuario, state.progreso).catch(() => {});
    session = null;
    state.progreso = {};
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* nada */ }
    settings.hidden = true;
    overlay.hidden = true;
    updateHeader();
    if (location.hash && location.hash !== "#/") location.hash = "#/";
    else route();
  }

  let setupMode = false;
  async function renderLogin() {
    const box = $("#login-box");
    const fb = $("#login-fb");
    fb.textContent = "";
    fb.className = "sim-feedback";
    let count = 0;
    try { count = (await Store.listUsers()).length; } catch (e) { fb.className = "sim-feedback bad"; fb.textContent = "No se pudo conectar con la base de usuarios. Recarga la página."; }
    setupMode = count === 0;
    box.classList.toggle("setup", setupMode);
    $("#login-title").textContent = setupMode ? "Configura el administrador" : "Iniciar sesión";
    $("#login-sub").textContent = setupMode
      ? "Es la primera vez que se abre el simulador. Crea la cuenta del administrador, que podrá crear los usuarios de cada área."
      : "Ingresa con el usuario y la contraseña que te entregó tu administrador.";
    $("#setup-fields").hidden = !setupMode;
    $("#login-submit").textContent = setupMode ? "Crear administrador e ingresar" : "Ingresar";
    if (setupMode && !(await Store.canManage())) {
      $("#login-form").hidden = true;
      fb.className = "sim-feedback bad";
      fb.textContent = "El administrador todavía no ha configurado el simulador. Vuelve a intentarlo más tarde.";
      return;
    }
    $("#login-form").hidden = false;
    $("#login-mode").textContent = Store.mode === "db"
      ? "🌐 Cuentas en línea: entra desde cualquier dispositivo."
      : "📱 Cuentas guardadas en este dispositivo.";
  }

  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fb = $("#login-fb");
    const usuario = $("#login-user").value.trim().toLowerCase();
    const pass = $("#login-pass").value;
    const bad = (m) => { fb.className = "sim-feedback bad"; fb.textContent = m; };
    const btn = $("#login-submit");
    btn.disabled = true;
    try {
      if (setupMode) {
        const nombre = $("#setup-name").value.trim();
        if (nombre.length < 3) return bad("Escribe tu nombre completo.");
        if (!Store.validUsername(usuario)) return bad("El usuario debe tener entre 3 y 40 caracteres: minúsculas, números, punto, guion o guion bajo.");
        if (pass.length < 6) return bad("La contraseña debe tener al menos 6 caracteres.");
        const now = new Date().toISOString();
        const admin = { usuario, nombre, documento: $("#setup-doc").value.trim(), rol: "admin", areas: [], cursos: [], activo: true, creado: now, actualizado: now, ...(await Store.hashPassword(pass)) };
        await Store.saveUser(admin);
        await startSession(admin);
        toast(`Administrador creado. ¡Bienvenido/a, ${nombre.split(" ")[0]}!`);
        location.hash = "#/admin";
        if (location.hash === "#/admin") route();
        return;
      }
      if (!usuario || !pass) return bad("Escribe tu usuario y contraseña.");
      const user = Store.validUsername(usuario) ? await Store.getUser(usuario) : null;
      if (!user || !(await Store.checkPassword(user, pass))) return bad("Usuario o contraseña incorrectos.");
      if (user.activo === false) return bad("Tu cuenta está desactivada. Comunícate con tu administrador.");
      await startSession(user);
      $("#login-pass").value = "";
      toast(`¡Hola, ${user.nombre.split(" ")[0]}!`);
      route();
    } catch (err) {
      bad(err && err.code === "invalid_argument" ? "No tienes permiso para crear el administrador en esta página." : `No se pudo iniciar sesión: ${(err && err.message) || err}`);
    } finally {
      btn.disabled = false;
    }
  });
  $("#login-toggle-pass").onclick = () => {
    const i = $("#login-pass");
    i.type = i.type === "password" ? "text" : "password";
  };
  $("#logout-btn").onclick = logout;
  $("#user-btn").onclick = openSettings;
  $("#admin-btn").onclick = () => { location.hash = "#/admin"; };

  // ===== Inicio =====
  $("#year").textContent = new Date().getFullYear();
  applySettings();
  showView("loading");
  updateHeader();
  (async () => {
    await Store.init();
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) { /* nada */ }
    if (saved && saved.usuario) {
      try {
        const u = await Store.getUser(saved.usuario);
        if (u && u.activo !== false) await startSession(u);
      } catch (e) { /* inicia sin sesión */ }
    }
    route();
  })();
})();
