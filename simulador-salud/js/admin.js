/* Martin´s Capacitaciones · Portal del administrador.
   Crear, editar y desactivar usuarios, asignarles áreas y cursos,
   carga masiva por área, seguimiento del progreso y respaldo. */

const AdminPortal = (function () {
  "use strict";

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const PASS = 70;

  let ctx = null;
  let root = null;
  let tab = "usuarios";
  let users = [];
  let progress = {};
  let canManage = true;
  let filtroArea = "Todas";
  let filtroTxt = "";

  function areas() { return CATEGORIAS.filter((a) => COURSES.some((c) => c.cat === a)); }
  function coursesOf(u) {
    if (u.rol === "admin") return COURSES.slice();
    return COURSES.filter((c) => (u.areas || []).includes(c.cat) || (u.cursos || []).includes(c.id));
  }

  async function load() {
    const [us, ps] = await Promise.all([Store.listUsers(), Store.listProgress()]);
    users = us.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || "", "es"));
    progress = {};
    ps.forEach((p) => { progress[p.usuario] = p.progreso || {}; });
  }

  function writeError(e) {
    if (e && e.code === "invalid_argument") return "No tienes permiso para guardar usuarios. Solo el propietario o los editores de la página pueden hacerlo.";
    if (e && e.code === "quota_exceeded") return "Se alcanzó el límite de almacenamiento. Elimina usuarios que ya no uses.";
    return `No se pudo guardar: ${(e && e.message) || e}`;
  }

  async function copy(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      if (btn) { const t = btn.textContent; btn.textContent = "✓ Copiado"; setTimeout(() => { btn.textContent = t; }, 1500); }
    } catch (e) {
      ctx.toast("No se pudo copiar automáticamente. Selecciona el texto y cópialo.");
    }
  }

  function usernameFrom(nombre) {
    const parts = norm(nombre).replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
    if (!parts.length) return "";
    const base = (parts[0][0] + (parts[1] || parts[0])).slice(0, 18);
    let u = base.length >= 3 ? base : `${base}usr`;
    let k = 1;
    const taken = new Set(users.map((x) => x.usuario));
    while (taken.has(u)) u = `${base}${++k}`;
    taken.add(u);
    return u;
  }

  // ===================================================================
  async function render(container, context) {
    ctx = context;
    root = container;
    root.innerHTML = `<div class="viewer-loading" style="position:relative;min-height:200px"><div><div class="spinner"></div>Cargando portal…</div></div>`;
    canManage = await Store.canManage();
    try { await load(); } catch (e) { root.innerHTML = `<div class="card">⚠️ No se pudieron leer los usuarios: ${esc(e.message || e.code)}</div>`; return; }
    shell();
  }

  function shell() {
    const local = Store.mode === "local";
    root.innerHTML = `
      <div class="admin-head">
        <div>
          <p class="eyebrow">Portal del administrador</p>
          <h1>Usuarios y cursos</h1>
          <p class="muted">${local
            ? "Modo dispositivo: los usuarios se guardan en este navegador. Para usarlos en otro equipo, usa «Respaldo» para exportarlos e importarlos."
            : "Modo en línea: los usuarios que crees pueden iniciar sesión desde cualquier celular o computadora con el enlace del simulador."}</p>
          ${canManage ? "" : '<p class="admin-warn">Solo lectura: necesitas ser propietario o editor de la página para crear o modificar usuarios.</p>'}
        </div>
      </div>
      <nav class="tabs admin-tabs" role="tablist">
        ${[["usuarios", "👥 Usuarios"], ["nuevo", "➕ Crear usuario"], ["masivo", "📋 Carga por área"], ["progreso", "📊 Progreso"], ["respaldo", "💾 Respaldo"]]
          .map(([k, t]) => `<button role="tab" data-at="${k}" aria-selected="${tab === k}">${t}</button>`).join("")}
      </nav>
      <div class="admin-panel"></div>`;
    root.querySelector(".admin-tabs").onclick = (e) => {
      const b = e.target.closest("[data-at]");
      if (!b) return;
      tab = b.dataset.at;
      root.querySelectorAll("[data-at]").forEach((x) => x.setAttribute("aria-selected", x === b));
      panel();
    };
    panel();
  }

  function panel(editUser) {
    const p = root.querySelector(".admin-panel");
    p.replaceChildren();
    ({ usuarios: tabUsuarios, nuevo: tabForm, masivo: tabMasivo, progreso: tabProgreso, respaldo: tabRespaldo }[tab])(p, editUser);
  }

  function goTab(t, editUser) {
    tab = t;
    root.querySelectorAll("[data-at]").forEach((x) => x.setAttribute("aria-selected", x.dataset.at === t));
    panel(editUser);
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ----- Usuarios -----
  function avgProgress(u) {
    const cs = coursesOf(u);
    if (!cs.length) return 0;
    const p = progress[u.usuario] || {};
    return Math.round(cs.reduce((a, c) => a + ctx.courseProgress(c, p), 0) / cs.length);
  }

  function tabUsuarios(p) {
    const students = users.filter((u) => u.rol !== "admin");
    const perArea = areas().map((a) => [a, students.filter((u) => (u.areas || []).includes(a) || coursesOf(u).some((c) => c.cat === a)).length]);
    p.innerHTML = `
      <div class="admin-stats">
        <div class="stat"><span class="ico">👥</span><div><b>${students.length}</b><small>Estudiantes</small></div></div>
        <div class="stat"><span class="ico">✅</span><div><b>${students.filter((u) => u.activo !== false).length}</b><small>Activos</small></div></div>
        <div class="stat"><span class="ico">🛠️</span><div><b>${users.length - students.length}</b><small>Administradores</small></div></div>
        <div class="stat"><span class="ico">🎓</span><div><b>${students.reduce((a, u) => a + Object.values(progress[u.usuario] || {}).filter((x) => x && x.cert).length, 0)}</b><small>Certificados</small></div></div>
      </div>
      <div class="catalog-head">
        <h2>Usuarios registrados</h2>
        <div class="search"><span aria-hidden="true">🔎</span><input id="adm-search" type="search" placeholder="Buscar por nombre, usuario o cédula" value="${esc(filtroTxt)}" aria-label="Buscar usuarios" /></div>
      </div>
      <div class="cat-chips">${["Todas", ...areas()].map((a) => {
        const n = a === "Todas" ? users.length : (perArea.find((x) => x[0] === a) || [0, 0])[1];
        return `<button class="cat-chip${a === filtroArea ? " active" : ""}" data-area="${esc(a)}">${esc(a)} <small>(${n})</small></button>`;
      }).join("")}</div>
      <div class="user-list"></div>
      ${canManage ? '<div class="result-actions"><button class="btn btn-primary" data-new>➕ Crear usuario</button></div>' : ""}`;
    const list = p.querySelector(".user-list");
    const draw = () => {
      const q = norm(filtroTxt.trim());
      const rows = users.filter((u) => {
        if (filtroArea !== "Todas" && !(u.rol === "admin" || (u.areas || []).includes(filtroArea) || coursesOf(u).some((c) => c.cat === filtroArea))) return false;
        return !q || norm(`${u.nombre} ${u.usuario} ${u.documento || ""}`).includes(q);
      });
      list.innerHTML = rows.length ? "" : '<p class="empty">No hay usuarios con ese filtro.</p>';
      rows.forEach((u) => {
        const cs = coursesOf(u);
        const av = avgProgress(u);
        const card = document.createElement("div");
        card.className = `user-card${u.activo === false ? " inactive" : ""}`;
        card.innerHTML = `
          <div class="uc-main">
            <div class="uc-avatar" aria-hidden="true">${esc((u.nombre || u.usuario).trim()[0] || "?").toUpperCase()}</div>
            <div class="uc-id"><strong>${esc(u.nombre)}</strong><small>@${esc(u.usuario)}${u.documento ? ` · C.I. ${esc(u.documento)}` : ""}</small></div>
            <span class="pill ${u.rol === "admin" ? "pill-admin" : ""}">${u.rol === "admin" ? "Administrador" : "Estudiante"}</span>
            ${u.activo === false ? '<span class="pill pill-off">Inactivo</span>' : ""}
          </div>
          ${u.rol === "admin" ? '<p class="uc-areas muted">Acceso a todos los cursos y al portal.</p>' : `
          <div class="uc-areas">${(u.areas || []).map((a) => `<span class="chip chip-soft">${esc(a)}</span>`).join("") || '<span class="muted">Sin áreas</span>'}
            ${(u.cursos || []).length ? `<span class="muted">+ ${(u.cursos || []).length} curso(s) individual(es)</span>` : ""}</div>
          <div class="uc-prog"><span>${cs.length} curso(s) · progreso promedio ${av}%</span><div class="bar"><i style="width:${av}%"></i></div></div>`}
          ${canManage ? `<div class="uc-actions">
            <button class="btn btn-secondary btn-sm" data-act="edit">✏️ Editar</button>
            <button class="btn btn-secondary btn-sm" data-act="pass">🔑 Nueva contraseña</button>
            <button class="btn btn-secondary btn-sm" data-act="toggle">${u.activo === false ? "▶️ Activar" : "⏸ Desactivar"}</button>
            <button class="btn btn-danger btn-sm" data-act="del">🗑️ Eliminar</button>
          </div>` : ""}
          <div class="uc-cred" hidden></div>`;
        if (canManage) {
          card.querySelector('[data-act="edit"]').onclick = () => goTab("nuevo", u);
          card.querySelector('[data-act="pass"]').onclick = async () => {
            const pw = Store.generatePassword();
            try {
              const h = await Store.hashPassword(pw);
              const upd = { ...u, ...h, actualizado: new Date().toISOString() };
              await Store.saveUser(upd);
              Object.assign(u, upd);
              showCred(card.querySelector(".uc-cred"), u, pw);
            } catch (e) { ctx.toast(writeError(e)); }
          };
          card.querySelector('[data-act="toggle"]').onclick = async () => {
            if (u.usuario === ctx.currentUser().usuario) { ctx.toast("No puedes desactivar tu propia cuenta."); return; }
            try {
              const upd = { ...u, activo: u.activo === false };
              await Store.saveUser(upd);
              Object.assign(u, upd);
              draw();
            } catch (e) { ctx.toast(writeError(e)); }
          };
          let armed = 0;
          const del = card.querySelector('[data-act="del"]');
          del.onclick = async () => {
            if (u.usuario === ctx.currentUser().usuario) { ctx.toast("No puedes eliminar tu propia cuenta."); return; }
            if (Date.now() - armed > 4000) { armed = Date.now(); del.textContent = "⚠️ Toca otra vez"; setTimeout(() => { del.textContent = "🗑️ Eliminar"; }, 4000); return; }
            try {
              await Store.deleteUser(u.usuario);
              users = users.filter((x) => x !== u);
              delete progress[u.usuario];
              ctx.toast(`Usuario @${u.usuario} eliminado`);
              tabUsuarios(p);
            } catch (e) { ctx.toast(writeError(e)); }
          };
        }
        list.append(card);
      });
    };
    p.querySelector("#adm-search").oninput = (e) => { filtroTxt = e.target.value; draw(); };
    p.querySelector(".cat-chips").onclick = (e) => {
      const b = e.target.closest("[data-area]");
      if (!b) return;
      filtroArea = b.dataset.area;
      p.querySelectorAll("[data-area]").forEach((x) => x.classList.toggle("active", x === b));
      draw();
    };
    const nb = p.querySelector("[data-new]");
    if (nb) nb.onclick = () => goTab("nuevo");
    draw();
  }

  function credText(u, pw) {
    return `Martin´s Capacitaciones · Simulador de Salud\nNombre: ${u.nombre}\nUsuario: ${u.usuario}\nContraseña: ${pw}\nCursos: ${coursesOf(u).map((c) => c.nombre).join(", ") || "—"}\nEnlace: ${ctx.appLink()}`;
  }

  function showCred(box, u, pw) {
    box.hidden = false;
    box.innerHTML = `<p><strong>Datos de acceso de ${esc(u.nombre)}</strong></p>
      <div class="cred-grid"><span>Usuario</span><code>${esc(u.usuario)}</code><span>Contraseña</span><code>${esc(pw)}</code></div>
      <p class="muted small">Compártelos con el estudiante. Por seguridad, la contraseña no se vuelve a mostrar.</p>
      <button class="btn btn-primary btn-sm" data-copy>📋 Copiar datos de acceso</button>`;
    box.querySelector("[data-copy]").onclick = (e) => copy(credText(u, pw), e.currentTarget);
  }

  // ----- Formulario crear / editar -----
  function tabForm(p, editUser) {
    if (!canManage) { p.innerHTML = '<div class="card">Necesitas permisos de propietario o editor para crear usuarios.</div>'; return; }
    const u = editUser || { rol: "estudiante", areas: [], cursos: [], activo: true };
    const editing = !!editUser;
    p.innerHTML = `
      <form class="card admin-form" novalidate>
        <h2>${editing ? `Editar a ${esc(u.nombre)}` : "Crear usuario"}</h2>
        <div class="form-grid">
          <label class="field">Nombre completo *<input id="f-nombre" type="text" maxlength="80" required value="${esc(u.nombre || "")}" autocomplete="off" /></label>
          <label class="field">Cédula / documento<input id="f-doc" type="text" maxlength="20" value="${esc(u.documento || "")}" autocomplete="off" /></label>
          <label class="field">Usuario *<input id="f-user" type="text" maxlength="40" value="${esc(u.usuario || "")}" ${editing ? "disabled" : ""} autocapitalize="none" autocomplete="off" placeholder="ej. mperez" />
            <small class="muted">Minúsculas, números, punto o guion. Mínimo 3 caracteres.</small></label>
          <label class="field">Contraseña ${editing ? "(vacío = no cambiar)" : "*"}
            <span class="pw-row"><input id="f-pass" type="text" maxlength="60" autocomplete="new-password" ${editing ? "" : `value="${Store.generatePassword()}"`} /><button type="button" class="btn btn-secondary btn-sm" data-gen>🎲 Generar</button></span></label>
          <label class="field">Rol
            <select id="f-rol"><option value="estudiante"${u.rol !== "admin" ? " selected" : ""}>Estudiante</option><option value="admin"${u.rol === "admin" ? " selected" : ""}>Administrador</option></select></label>
          <label class="switch-row field-inline"><span>Cuenta activa</span><input id="f-activo" type="checkbox" ${u.activo !== false ? "checked" : ""} /></label>
        </div>
        <fieldset class="field assign" ${u.rol === "admin" ? "disabled" : ""}>
          <legend>Áreas asignadas <small class="muted">(da acceso a todos los cursos del área)</small></legend>
          <div class="area-grid">${areas().map((a) => {
            const n = COURSES.filter((c) => c.cat === a).length;
            return `<label class="area-opt"><input type="checkbox" name="area" value="${esc(a)}" ${(u.areas || []).includes(a) ? "checked" : ""} /><span>${esc(a)}<small>${n} curso${n > 1 ? "s" : ""}</small></span></label>`;
          }).join("")}</div>
        </fieldset>
        <details class="field assign-extra" ${(u.cursos || []).length ? "open" : ""}>
          <summary><strong>Cursos individuales</strong> <small class="muted">(opcional, de otras áreas)</small></summary>
          <div class="course-checks"></div>
        </details>
        <p class="sim-feedback" role="status" aria-live="polite"></p>
        <div class="result-actions" style="justify-content:flex-start">
          <button class="btn btn-primary" type="submit">${editing ? "💾 Guardar cambios" : "✅ Crear usuario"}</button>
          <button class="btn btn-ghost" type="button" data-cancel>Cancelar</button>
        </div>
        <div class="uc-cred" hidden></div>
      </form>`;
    const f = p.querySelector("form");
    const fb = f.querySelector(".sim-feedback");
    const checks = f.querySelector(".course-checks");
    const drawCourses = () => {
      const selAreas = [...f.querySelectorAll('[name="area"]:checked')].map((x) => x.value);
      const prev = new Set([...checks.querySelectorAll("input:checked")].map((x) => x.value).concat(checks.dataset.init ? [] : (u.cursos || [])));
      checks.dataset.init = "1";
      checks.innerHTML = areas().map((a) => `<div class="cc-group"><h4>${esc(a)}</h4>${COURSES.filter((c) => c.cat === a).map((c) => {
        const inc = selAreas.includes(a);
        return `<label class="course-opt${inc ? " included" : ""}"><input type="checkbox" value="${c.id}" ${inc || prev.has(c.id) ? "checked" : ""} ${inc ? "disabled" : ""} /> ${c.icono} ${esc(c.nombre)}${inc ? ' <small class="muted">(por área)</small>' : ""}</label>`;
      }).join("")}</div>`).join("");
    };
    drawCourses();
    f.querySelectorAll('[name="area"]').forEach((x) => { x.onchange = drawCourses; });
    f.querySelector("#f-rol").onchange = (e) => { f.querySelector(".assign").disabled = e.target.value === "admin"; };
    f.querySelector("[data-gen]").onclick = () => { f.querySelector("#f-pass").value = Store.generatePassword(); };
    f.querySelector("[data-cancel]").onclick = () => goTab("usuarios");
    const nameInput = f.querySelector("#f-nombre");
    const userInput = f.querySelector("#f-user");
    if (!editing) nameInput.addEventListener("blur", () => { if (!userInput.value.trim() && nameInput.value.trim()) userInput.value = usernameFrom(nameInput.value); });

    f.onsubmit = async (e) => {
      e.preventDefault();
      const bad = (m) => { fb.className = "sim-feedback bad"; fb.textContent = m; };
      const nombre = nameInput.value.trim();
      const usuario = (editing ? u.usuario : userInput.value.trim().toLowerCase());
      const pw = f.querySelector("#f-pass").value.trim();
      const rol = f.querySelector("#f-rol").value;
      if (nombre.length < 3) return bad("Escribe el nombre completo.");
      if (!Store.validUsername(usuario)) return bad("El usuario debe tener entre 3 y 40 caracteres: minúsculas, números, punto, guion o guion bajo.");
      if (!editing && users.some((x) => x.usuario === usuario)) return bad(`El usuario «${usuario}» ya existe. Elige otro.`);
      if (!editing && pw.length < 6) return bad("La contraseña debe tener al menos 6 caracteres.");
      if (editing && pw && pw.length < 6) return bad("La nueva contraseña debe tener al menos 6 caracteres.");
      if (editing && u.usuario === ctx.currentUser().usuario && rol !== "admin") return bad("No puedes quitarte el rol de administrador a ti mismo.");
      const selAreas = [...f.querySelectorAll('[name="area"]:checked')].map((x) => x.value);
      const cursos = [...checks.querySelectorAll("input:checked:not(:disabled)")].map((x) => x.value);
      if (rol !== "admin" && !selAreas.length && !cursos.length) return bad("Asigna al menos un área o un curso.");
      const btn = f.querySelector('[type="submit"]');
      btn.disabled = true;
      fb.className = "sim-feedback";
      fb.textContent = "Guardando…";
      try {
        const obj = {
          ...(editing ? u : {}),
          usuario, nombre,
          documento: f.querySelector("#f-doc").value.trim(),
          rol,
          areas: rol === "admin" ? [] : selAreas,
          cursos: rol === "admin" ? [] : cursos,
          activo: f.querySelector("#f-activo").checked,
          actualizado: new Date().toISOString()
        };
        if (!editing) obj.creado = obj.actualizado;
        if (pw) Object.assign(obj, await Store.hashPassword(pw));
        await Store.saveUser(obj);
        if (editing) Object.assign(u, obj); else users.push(obj);
        users.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || "", "es"));
        fb.className = "sim-feedback ok";
        fb.textContent = editing ? "Cambios guardados." : `Usuario @${usuario} creado con ${coursesOf(obj).length} curso(s).`;
        if (pw) showCred(f.querySelector(".uc-cred"), obj, pw);
        if (!editing) {
          f.querySelector('[type="submit"]').hidden = true;
          f.querySelector("[data-cancel]").textContent = "Volver a la lista";
          const again = document.createElement("button");
          again.type = "button";
          again.className = "btn btn-secondary";
          again.textContent = "➕ Crear otro";
          again.onclick = () => goTab("nuevo");
          f.querySelector("[data-cancel]").before(again);
        }
        ctx.onUsersChanged(obj);
      } catch (err) {
        bad(writeError(err));
      } finally {
        btn.disabled = false;
      }
    };
  }

  // ----- Carga masiva por área -----
  function tabMasivo(p) {
    if (!canManage) { p.innerHTML = '<div class="card">Necesitas permisos de propietario o editor para crear usuarios.</div>'; return; }
    p.innerHTML = `
      <div class="card">
        <h2>Carga de estudiantes por área</h2>
        <p class="muted">Elige el área (o áreas) y pega la lista de estudiantes, uno por línea, con el formato:<br>
        <code>Nombre completo; cédula; usuario; contraseña</code><br>Solo el nombre es obligatorio: el usuario y la contraseña se generan solos si los dejas vacíos.</p>
        <fieldset class="field"><legend>Áreas</legend><div class="area-grid">${areas().map((a) => `<label class="area-opt"><input type="checkbox" name="marea" value="${esc(a)}" /><span>${esc(a)}<small>${COURSES.filter((c) => c.cat === a).length} cursos</small></span></label>`).join("")}</div></fieldset>
        <label class="field">Lista de estudiantes
          <textarea id="m-list" rows="8" placeholder="María Pérez; 0102030405&#10;Juan Torres; 0912345678; jtorres; clave123"></textarea></label>
        <p class="sim-feedback" role="status" aria-live="polite"></p>
        <button class="btn btn-primary" data-go>✅ Crear usuarios</button>
        <div class="bulk-out"></div>
      </div>`;
    const fb = p.querySelector(".sim-feedback");
    p.querySelector("[data-go]").onclick = async (e) => {
      const btn = e.currentTarget;
      const selAreas = [...p.querySelectorAll('[name="marea"]:checked')].map((x) => x.value);
      const lines = p.querySelector("#m-list").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (!selAreas.length) { fb.className = "sim-feedback bad"; fb.textContent = "Elige al menos un área."; return; }
      if (!lines.length) { fb.className = "sim-feedback bad"; fb.textContent = "Pega al menos un estudiante."; return; }
      btn.disabled = true;
      const created = [];
      const errors = [];
      for (const [i, line] of lines.entries()) {
        const [nombre = "", documento = "", usr = "", pass = ""] = line.split(/[;\t]/).map((x) => x.trim());
        fb.className = "sim-feedback";
        fb.textContent = `Creando ${i + 1} de ${lines.length}…`;
        if (nombre.length < 3) { errors.push(`Línea ${i + 1}: falta el nombre.`); continue; }
        const usuario = (usr || usernameFrom(nombre)).toLowerCase();
        if (!Store.validUsername(usuario)) { errors.push(`Línea ${i + 1}: usuario «${usuario}» no válido.`); continue; }
        if (users.some((x) => x.usuario === usuario)) { errors.push(`Línea ${i + 1}: el usuario «${usuario}» ya existe.`); continue; }
        const pw = pass.length >= 6 ? pass : Store.generatePassword();
        const now = new Date().toISOString();
        const obj = { usuario, nombre, documento, rol: "estudiante", areas: selAreas, cursos: [], activo: true, creado: now, actualizado: now, ...(await Store.hashPassword(pw)) };
        try {
          await Store.saveUser(obj);
          users.push(obj);
          created.push({ obj, pw });
        } catch (err) {
          errors.push(`Línea ${i + 1}: ${writeError(err)}`);
          if (err && err.code === "invalid_argument") break;
        }
      }
      btn.disabled = false;
      users.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || "", "es"));
      fb.className = `sim-feedback ${created.length ? "ok" : "bad"}`;
      fb.textContent = `${created.length} usuario(s) creados${errors.length ? `, ${errors.length} con problemas` : ""}.`;
      const out = p.querySelector(".bulk-out");
      const csv = ["Nombre;Cédula;Usuario;Contraseña", ...created.map(({ obj, pw }) => `${obj.nombre};${obj.documento};${obj.usuario};${pw}`)].join("\n");
      out.innerHTML = `${errors.length ? `<ul class="bulk-errors">${errors.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${created.length ? `<div class="table-wrap"><table class="adm-table"><thead><tr><th>Nombre</th><th>Usuario</th><th>Contraseña</th></tr></thead><tbody>
          ${created.map(({ obj, pw }) => `<tr><td>${esc(obj.nombre)}</td><td><code>${esc(obj.usuario)}</code></td><td><code>${esc(pw)}</code></td></tr>`).join("")}</tbody></table></div>
          <p class="muted small">Copia esta lista ahora: por seguridad las contraseñas no se vuelven a mostrar.</p>
          <button class="btn btn-secondary btn-sm" data-copy>📋 Copiar lista (para Excel)</button>` : ""}`;
      const cb = out.querySelector("[data-copy]");
      if (cb) cb.onclick = (ev) => copy(csv, ev.currentTarget);
      if (created.length) ctx.onUsersChanged();
    };
  }

  // ----- Progreso -----
  function tabProgreso(p) {
    const students = users.filter((u) => u.rol !== "admin");
    p.innerHTML = `
      <div class="catalog-head"><h2>Progreso de los estudiantes</h2>
        <button class="btn btn-secondary btn-sm" data-refresh>🔄 Actualizar</button></div>
      <div class="cat-chips">${["Todas", ...areas()].map((a) => `<button class="cat-chip${a === filtroArea ? " active" : ""}" data-area="${esc(a)}">${esc(a)}</button>`).join("")}</div>
      <div class="table-wrap"><table class="adm-table"><thead><tr><th>Estudiante</th><th>Curso</th><th>Progreso</th><th>Evaluación</th><th>Certificado</th></tr></thead><tbody></tbody></table></div>
      <p class="empty" hidden>No hay estudiantes en esta área todavía.</p>
      <button class="btn btn-secondary btn-sm" data-csv>📋 Copiar tabla (para Excel)</button>`;
    const tb = p.querySelector("tbody");
    let rows = [];
    const draw = () => {
      rows = [];
      students.forEach((u) => {
        const pr = progress[u.usuario] || {};
        coursesOf(u).filter((c) => filtroArea === "Todas" || c.cat === filtroArea).forEach((c) => {
          const cp = pr[c.id] || {};
          rows.push({ u, c, pct: ctx.courseProgress(c, pr), quiz: cp.quiz || 0, cert: cp.cert });
        });
      });
      tb.innerHTML = rows.map((r) => `<tr class="${r.u.activo === false ? "inactive" : ""}">
        <td><strong>${esc(r.u.nombre)}</strong><br><small class="muted">@${esc(r.u.usuario)}</small></td>
        <td>${r.c.icono} ${esc(r.c.nombre)}</td>
        <td><div class="mini-bar"><div class="bar"><i style="width:${r.pct}%"></i></div><span>${r.pct}%</span></div></td>
        <td><span class="pill ${r.quiz >= PASS ? "pill-ok" : r.quiz ? "pill-warn" : ""}">${r.quiz ? `${r.quiz}%` : "—"}</span></td>
        <td>${r.cert ? `🎓 <small>${esc(r.cert.codigo)}</small>` : "—"}</td></tr>`).join("");
      p.querySelector(".empty").hidden = rows.length > 0;
    };
    p.querySelector(".cat-chips").onclick = (e) => {
      const b = e.target.closest("[data-area]");
      if (!b) return;
      filtroArea = b.dataset.area;
      p.querySelectorAll("[data-area]").forEach((x) => x.classList.toggle("active", x === b));
      draw();
    };
    p.querySelector("[data-refresh]").onclick = async (e) => {
      e.currentTarget.disabled = true;
      try { await load(); } catch (err) { ctx.toast("No se pudo actualizar."); }
      tabProgreso(p);
    };
    p.querySelector("[data-csv]").onclick = (e) => copy(["Estudiante\tUsuario\tÁrea\tCurso\tProgreso\tEvaluación\tCertificado",
      ...rows.map((r) => [r.u.nombre, r.u.usuario, r.c.cat, r.c.nombre, `${r.pct}%`, r.quiz ? `${r.quiz}%` : "", r.cert ? r.cert.codigo : ""].join("\t"))].join("\n"), e.currentTarget);
    draw();
  }

  // ----- Respaldo -----
  function tabRespaldo(p) {
    p.innerHTML = `
      <div class="card">
        <h2>Exportar usuarios y progreso</h2>
        <p class="muted">Genera una copia de seguridad con todos los usuarios (las contraseñas van cifradas) y su progreso. Sirve para pasar los usuarios a otro dispositivo o a la versión web.</p>
        <button class="btn btn-primary btn-sm" data-exp>📤 Generar copia</button>
        <textarea id="exp-out" rows="5" readonly hidden></textarea>
        <button class="btn btn-secondary btn-sm" data-copy hidden>📋 Copiar</button>
      </div>
      <div class="card">
        <h2>Importar copia</h2>
        <p class="muted">Pega aquí una copia generada en otro dispositivo. Los usuarios con el mismo nombre de usuario se reemplazan.</p>
        <textarea id="imp-in" rows="5" placeholder='{"app":"martins-salud", …}'></textarea>
        <p class="sim-feedback" role="status" aria-live="polite"></p>
        <button class="btn btn-primary btn-sm" data-imp ${canManage ? "" : "disabled"}>📥 Importar</button>
      </div>`;
    const out = p.querySelector("#exp-out");
    p.querySelector("[data-exp]").onclick = async () => {
      out.value = await Store.exportAll();
      out.hidden = false;
      p.querySelector("[data-copy]").hidden = false;
      out.select();
    };
    p.querySelector("[data-copy]").onclick = (e) => copy(out.value, e.currentTarget);
    p.querySelector("[data-imp]").onclick = async () => {
      const fb = p.querySelector(".sim-feedback");
      try {
        const n = await Store.importAll(p.querySelector("#imp-in").value);
        await load();
        fb.className = "sim-feedback ok";
        fb.textContent = `${n} usuario(s) importados.`;
        ctx.onUsersChanged();
      } catch (e) {
        fb.className = "sim-feedback bad";
        fb.textContent = e instanceof SyntaxError ? "El texto pegado no es una copia válida." : writeError(e);
      }
    };
  }

  return { render, coursesOf };
})();
