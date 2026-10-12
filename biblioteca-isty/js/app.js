/* Biblioteca ISTY · Lógica de la aplicación.
   Navegación por hash:
     #/                    catálogo por carreras (con buscador general)
     #/carrera/<id>        libros de una carrera
     #/prestamos           préstamos de la persona que inició sesión
     #/admin/<pestaña>     libros · carreras · usuarios · prestamos · respaldo (solo administrador) */

(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString("es-EC", { day: "2-digit", month: "short", year: "numeric" }) : "—");
  const DIAS_PRESTAMO = 7;

  const ESTADOS = {
    solicitado: { txt: "Solicitado", cls: "st-wait" },
    prestado: { txt: "Prestado", cls: "st-on" },
    devuelto: { txt: "Devuelto", cls: "st-done" },
    rechazado: { txt: "Rechazado", cls: "st-off" },
    cancelado: { txt: "Cancelado", cls: "st-off" }
  };

  let me = null;
  const ROLES = { estudiante: "Estudiante", docente: "Docente", admin: "Administrador" };
  const rolTxt = (r) => ROLES[r] || "Estudiante";
  const isAdmin = () => me && me.rol === "admin";
  const view = $("#view");

  // ---------- Utilidades de interfaz ----------
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  const modal = $("#modal");
  function openModal(html) {
    $("#modal-body").innerHTML = html;
    if (!modal.open) modal.showModal();
    const first = $("#modal-body input, #modal-body select, #modal-body textarea");
    if (first) first.focus();
  }
  function closeModal() { if (modal.open) modal.close(); }
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) closeModal();
  });

  function confirmModal(msg, okTxt = "Confirmar") {
    return new Promise((resolve) => {
      openModal(`
        <div class="modal-pad">
          <p class="confirm-msg">${esc(msg)}</p>
          <div class="modal-actions">
            <button class="btn btn-ghost" data-close>Cancelar</button>
            <button class="btn btn-danger" id="confirm-ok">${esc(okTxt)}</button>
          </div>
        </div>`);
      const done = (v) => { modal.removeEventListener("close", onClose); resolve(v); };
      const onClose = () => done(false);
      modal.addEventListener("close", onClose);
      $("#confirm-ok").onclick = () => { done(true); closeModal(); };
    });
  }

  // Portada generada: degradado con los colores institucionales según la carrera.
  const PORTADAS = [
    ["#1a4d22", "#3a8f3a"], ["#2e7d32", "#99b928"], ["#3a8f3a", "#c9d72a"], ["#1f5f2a", "#52b066"],
    ["#14401c", "#6fa83a"], ["#52b066", "#e7dd2b"], ["#245c2c", "#9bc53d"], ["#0f3516", "#3a8f3a"], ["#3f7f2f", "#f2e21b"]
  ];
  function portada(libro) {
    const idx = Math.max(0, Store.data.carreras.findIndex((c) => c.id === libro.carreraId)) % PORTADAS.length;
    const [a, b] = PORTADAS[idx];
    const c = Store.carrera(libro.carreraId);
    return `<div class="cover" style="--c1:${a};--c2:${b}" aria-hidden="true">
      <span class="cover-icon">${esc(c ? c.icono : "📘")}</span>
      <span class="cover-title">${esc(libro.titulo)}</span>
      <span class="cover-author">${esc(libro.autor)}</span>
    </div>`;
  }

  function libroCard(l) {
    const disp = Store.disponibles(l);
    return `<button class="book" data-book="${esc(l.id)}">
      ${portada(l)}
      <span class="book-info">
        <span class="book-title">${esc(l.titulo)}</span>
        <span class="book-author">${esc(l.autor)}${l.anio ? " · " + esc(l.anio) : ""}</span>
        <span class="chips">
          ${l.categoria ? `<span class="chip">${esc(l.categoria)}</span>` : ""}
          <span class="chip ${disp ? "chip-ok" : "chip-no"}">${disp ? `${disp} disponible${disp > 1 ? "s" : ""}` : "Sin ejemplares"}</span>
        </span>
      </span>
    </button>`;
  }

  function bindBookCards(root = view) {
    $$("[data-book]", root).forEach((b) => (b.onclick = () => showBook(b.dataset.book)));
  }

  function carrerasVisibles() {
    return Store.data.carreras.filter((c) => c.vigente || isAdmin());
  }

  function librosVisibles() {
    const vig = new Set(carrerasVisibles().map((c) => c.id));
    return Store.data.libros.filter((l) => vig.has(l.carreraId));
  }

  function buscar(libros, q) {
    const t = norm(q).trim();
    if (!t) return libros;
    const words = t.split(/\s+/);
    return libros.filter((l) => {
      const hay = norm([l.titulo, l.autor, l.editorial, l.isbn, l.categoria, l.anio].join(" "));
      return words.every((w) => hay.includes(w));
    });
  }

  // ---------- Vistas ----------
  function renderCatalogo(q = "") {
    const carreras = carrerasVisibles();
    const libros = librosVisibles();
    const mia = me.carreraId && Store.carrera(me.carreraId);
    view.innerHTML = `
      <section class="hero">
        <div>
          <h1>Hola, ${esc(me.nombre.split(" ")[0])} 👋</h1>
          <p>Explora el catálogo de la biblioteca organizado por las carreras vigentes del instituto.</p>
        </div>
        <div class="hero-stats">
          <div><strong>${libros.length}</strong><span>títulos</span></div>
          <div><strong>${libros.reduce((s, l) => s + (Number(l.ejemplares) || 0), 0)}</strong><span>ejemplares</span></div>
          <div><strong>${carreras.filter((c) => c.vigente).length}</strong><span>carreras</span></div>
        </div>
      </section>
      <div class="search big-search">
        <span aria-hidden="true">🔎</span>
        <input id="q" type="search" placeholder="Buscar por título, autor, ISBN o tema en todo el catálogo" value="${esc(q)}" aria-label="Buscar en el catálogo" />
      </div>
      <div id="cat-body"></div>`;

    const body = $("#cat-body");
    function paint() {
      const query = $("#q").value;
      if (query.trim()) {
        const res = buscar(libros, query);
        body.innerHTML = `<h2 class="section-title">Resultados (${res.length})</h2>
          ${res.length ? `<div class="books">${res.map(libroCard).join("")}</div>` : `<p class="empty">No se encontraron libros con «${esc(query)}».</p>`}`;
        bindBookCards(body);
        return;
      }
      const ordered = mia ? [mia, ...carreras.filter((c) => c.id !== mia.id)] : carreras;
      body.innerHTML = `<h2 class="section-title">Carreras</h2>
        <div class="careers">${ordered.map((c) => {
          const n = Store.data.libros.filter((l) => l.carreraId === c.id).length;
          return `<a class="career ${mia && c.id === mia.id ? "career-mine" : ""} ${c.vigente ? "" : "career-off"}" href="#/carrera/${encodeURIComponent(c.id)}">
            <span class="career-icon" aria-hidden="true">${esc(c.icono)}</span>
            <span class="career-name">${esc(c.nombre)}</span>
            <span class="career-count">${n} título${n === 1 ? "" : "s"}</span>
            ${mia && c.id === mia.id ? `<span class="badge">Mi carrera</span>` : ""}
            ${c.vigente ? "" : `<span class="badge badge-off">No vigente</span>`}
          </a>`;
        }).join("")}</div>`;
    }
    $("#q").addEventListener("input", paint);
    paint();
  }

  function renderCarrera(id) {
    const c = Store.carrera(id);
    if (!c || (!c.vigente && !isAdmin())) { location.hash = "#/"; return; }
    const libros = Store.data.libros.filter((l) => l.carreraId === id);
    const cats = [...new Set(libros.map((l) => l.categoria).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
    view.innerHTML = `
      <nav class="crumbs"><a href="#/">Catálogo</a> › <span>${esc(c.nombre)}</span></nav>
      <section class="career-head">
        <span class="career-icon big" aria-hidden="true">${esc(c.icono)}</span>
        <div>
          <h1>${esc(c.nombre)}</h1>
          <p>${libros.length} título${libros.length === 1 ? "" : "s"} · ${libros.reduce((s, l) => s + (Number(l.ejemplares) || 0), 0)} ejemplares ${c.vigente ? "" : "· <strong>Carrera no vigente</strong>"}</p>
        </div>
        ${isAdmin() ? `<button class="btn btn-primary" id="add-here">＋ Agregar libro</button>` : ""}
      </section>
      <div class="toolbar">
        <div class="search"><span aria-hidden="true">🔎</span><input id="q" type="search" placeholder="Buscar en ${esc(c.nombre)}" aria-label="Buscar en esta carrera" /></div>
        <select id="cat" aria-label="Filtrar por categoría"><option value="">Todas las categorías</option>${cats.map((k) => `<option>${esc(k)}</option>`).join("")}</select>
        <label class="check"><input type="checkbox" id="only-av" /> Solo disponibles</label>
      </div>
      <div id="list"></div>`;
    function paint() {
      let res = buscar(libros, $("#q").value);
      const cat = $("#cat").value;
      if (cat) res = res.filter((l) => l.categoria === cat);
      if ($("#only-av").checked) res = res.filter((l) => Store.disponibles(l) > 0);
      res.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
      $("#list").innerHTML = res.length ? `<div class="books">${res.map(libroCard).join("")}</div>` : `<p class="empty">No hay libros que coincidan.</p>`;
      bindBookCards($("#list"));
    }
    $("#q").addEventListener("input", paint);
    $("#cat").addEventListener("change", paint);
    $("#only-av").addEventListener("change", paint);
    if (isAdmin()) $("#add-here").onclick = () => editBook(null, id);
    paint();
  }

  function showBook(id) {
    const l = Store.libro(id);
    if (!l) return;
    const c = Store.carrera(l.carreraId);
    const disp = Store.disponibles(l);
    const activo = Store.data.prestamos.find((p) => p.libroId === l.id && p.usuario === me.usuario && (p.estado === "solicitado" || p.estado === "prestado"));
    let action = "";
    if (activo) action = `<p class="note">Ya tienes este libro: <strong>${ESTADOS[activo.estado].txt.toLowerCase()}</strong>.</p>`;
    else if (disp > 0) action = `<button class="btn btn-primary" id="req">🔖 Solicitar préstamo</button>`;
    else action = `<p class="note">No hay ejemplares disponibles por ahora.</p>`;
    openModal(`
      <div class="book-detail">
        ${portada(l)}
        <div class="modal-pad">
          <button class="close-x" data-close aria-label="Cerrar">✕</button>
          <p class="eyebrow">${esc(c ? c.icono + " " + c.nombre : "Sin carrera")}</p>
          <h2>${esc(l.titulo)}</h2>
          <p class="muted">${esc(l.autor)}</p>
          <dl class="meta">
            ${l.editorial ? `<dt>Editorial</dt><dd>${esc(l.editorial)}</dd>` : ""}
            ${l.anio ? `<dt>Año</dt><dd>${esc(l.anio)}</dd>` : ""}
            ${l.isbn ? `<dt>ISBN</dt><dd>${esc(l.isbn)}</dd>` : ""}
            ${l.categoria ? `<dt>Categoría</dt><dd>${esc(l.categoria)}</dd>` : ""}
            ${l.ubicacion ? `<dt>Ubicación</dt><dd>${esc(l.ubicacion)}</dd>` : ""}
            <dt>Disponibles</dt><dd>${disp} de ${esc(l.ejemplares)}</dd>
          </dl>
          ${l.descripcion ? `<p class="desc">${esc(l.descripcion)}</p>` : ""}
          ${l.enlace && /^https?:\/\//i.test(l.enlace) ? `<p><a class="btn btn-light" id="digital" href="${esc(l.enlace)}" target="_blank" rel="noopener">🌐 Abrir / descargar versión digital</a></p>` : ""}
          <div class="modal-actions">
            ${isAdmin() ? `<button class="btn btn-ghost" id="edit-book">✏️ Editar</button>` : ""}
            ${action}
          </div>
        </div>
      </div>`);
    Store.registrar("consultas", me, { libroId: l.id, titulo: l.titulo, libroCarreraId: l.carreraId, accion: "Consulta de ficha" });
    const dig = $("#digital");
    if (dig) dig.addEventListener("click", () => Store.registrar("consultas", me, { libroId: l.id, titulo: l.titulo, libroCarreraId: l.carreraId, accion: "Versión digital" }));
    const req = $("#req");
    if (req) req.onclick = () => {
      Store.data.prestamos.push({ id: Store.uid(), libroId: l.id, titulo: l.titulo, usuario: me.usuario, nombre: me.nombre, carreraId: me.carreraId || "", estado: "solicitado", solicitado: new Date().toISOString() });
      Store.save();
      closeModal();
      toast("Solicitud enviada. Retira el libro en la biblioteca.");
      route();
    };
    const ed = $("#edit-book");
    if (ed) ed.onclick = () => editBook(l.id);
  }

  function prestamoRow(p, admin) {
    const l = Store.libro(p.libroId);
    const u = Store.data.usuarios[p.usuario];
    const vencido = p.estado === "prestado" && p.limite && new Date(p.limite) < new Date();
    const est = ESTADOS[p.estado] || { txt: p.estado, cls: "" };
    let btns = "";
    if (admin) {
      if (p.estado === "solicitado") btns = `<button class="btn btn-primary btn-sm" data-act="entregar" data-id="${p.id}">Entregar</button><button class="btn btn-ghost btn-sm" data-act="rechazar" data-id="${p.id}">Rechazar</button>`;
      else if (p.estado === "prestado") btns = `<button class="btn btn-primary btn-sm" data-act="devolver" data-id="${p.id}">Recibir devolución</button>`;
    } else if (p.estado === "solicitado") {
      btns = `<button class="btn btn-ghost btn-sm" data-act="cancelar" data-id="${p.id}">Cancelar</button>`;
    }
    return `<tr>
      <td data-label="Libro"><strong>${esc(l ? l.titulo : "(libro eliminado)")}</strong>${l ? `<br><small class="muted">${esc(l.autor)}</small>` : ""}</td>
      ${admin ? `<td data-label="Lector">${esc(u ? u.nombre : p.usuario)}<br><small class="muted">${esc(p.usuario)}</small></td>` : ""}
      <td data-label="Solicitado">${fmtDate(p.solicitado)}</td>
      <td data-label="Devolver hasta">${p.limite ? fmtDate(p.limite) : "—"}</td>
      <td data-label="Estado"><span class="status ${vencido ? "st-late" : est.cls}">${vencido ? "Vencido" : est.txt}</span></td>
      <td class="row-actions">${btns}</td>
    </tr>`;
  }

  function bindLoanActions(root) {
    $$("[data-act]", root).forEach((b) => (b.onclick = () => {
      const p = Store.data.prestamos.find((x) => x.id === b.dataset.id);
      if (!p) return;
      const now = new Date();
      if (b.dataset.act === "entregar") {
        p.estado = "prestado";
        p.entregado = now.toISOString();
        p.limite = new Date(now.getTime() + DIAS_PRESTAMO * 864e5).toISOString();
      } else if (b.dataset.act === "devolver") {
        p.estado = "devuelto";
        p.devuelto = now.toISOString();
      } else if (b.dataset.act === "rechazar") p.estado = "rechazado";
      else if (b.dataset.act === "cancelar") p.estado = "cancelado";
      Store.save();
      toast("Préstamo actualizado.");
      route();
    }));
  }

  function renderMisPrestamos() {
    const mine = Store.data.prestamos.filter((p) => p.usuario === me.usuario).sort((a, b) => (b.solicitado || "").localeCompare(a.solicitado || ""));
    view.innerHTML = `
      <h1 class="page-title">🔖 Mis préstamos</h1>
      <p class="muted">Los préstamos duran ${DIAS_PRESTAMO} días desde que retiras el libro en la biblioteca.</p>
      ${mine.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Libro</th><th>Solicitado</th><th>Devolver hasta</th><th>Estado</th><th></th></tr></thead>
        <tbody>${mine.map((p) => prestamoRow(p, false)).join("")}</tbody></table></div>`
        : `<p class="empty">Aún no tienes préstamos. <a href="#/">Explora el catálogo</a>.</p>`}`;
    bindLoanActions(view);
  }

  // ---------- Administración ----------
  const ADMIN_TABS = [
    ["libros", "📚 Libros"], ["carreras", "🎓 Carreras"], ["usuarios", "👥 Usuarios"], ["prestamos", "🔖 Préstamos"], ["reportes", "📥 Reportes"], ["respaldo", "💾 Respaldo"]
  ];

  function renderAdmin(tab) {
    if (!ADMIN_TABS.some(([t]) => t === tab)) tab = "libros";
    const pend = Store.data.prestamos.filter((p) => p.estado === "solicitado").length;
    view.innerHTML = `
      <h1 class="page-title">🛠️ Administración</h1>
      <div class="tabs" role="tablist">${ADMIN_TABS.map(([t, n]) => `<a role="tab" href="#/admin/${t}" class="tab ${t === tab ? "active" : ""}" aria-selected="${t === tab}">${n}${t === "prestamos" && pend ? ` <span class="pill">${pend}</span>` : ""}</a>`).join("")}</div>
      <div id="admin-body"></div>`;
    const body = $("#admin-body");
    ({ libros: adminLibros, carreras: adminCarreras, usuarios: adminUsuarios, prestamos: adminPrestamos, reportes: adminReportes, respaldo: adminRespaldo })[tab](body);
  }

  function carreraOptions(sel, includeEmpty) {
    return (includeEmpty ? `<option value="">— Sin carrera —</option>` : "") +
      Store.data.carreras.map((c) => `<option value="${esc(c.id)}" ${c.id === sel ? "selected" : ""}>${esc(c.icono + " " + c.nombre)}${c.vigente ? "" : " (no vigente)"}</option>`).join("");
  }

  function adminLibros(body) {
    body.innerHTML = `
      <div class="toolbar">
        <div class="search"><span aria-hidden="true">🔎</span><input id="aq" type="search" placeholder="Buscar libros" aria-label="Buscar libros" /></div>
        <select id="ac" aria-label="Filtrar por carrera"><option value="">Todas las carreras</option>${carreraOptions("")}</select>
        <button class="btn btn-primary" id="new-book">＋ Nuevo libro</button>
      </div>
      <div id="alist"></div>`;
    function paint() {
      let res = buscar(Store.data.libros, $("#aq").value);
      if ($("#ac").value) res = res.filter((l) => l.carreraId === $("#ac").value);
      res = [...res].sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
      $("#alist").innerHTML = res.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Título</th><th>Carrera</th><th>Ejemplares</th><th>Ubicación</th><th></th></tr></thead>
        <tbody>${res.map((l) => {
          const c = Store.carrera(l.carreraId);
          return `<tr>
            <td data-label="Título"><strong>${esc(l.titulo)}</strong><br><small class="muted">${esc(l.autor)}</small></td>
            <td data-label="Carrera">${esc(c ? c.icono + " " + c.nombre : "—")}</td>
            <td data-label="Ejemplares">${Store.disponibles(l)} / ${esc(l.ejemplares)}</td>
            <td data-label="Ubicación">${esc(l.ubicacion || "—")}</td>
            <td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="${esc(l.id)}">✏️ Editar</button><button class="btn btn-ghost btn-sm" data-del="${esc(l.id)}">🗑️</button></td>
          </tr>`;
        }).join("")}</tbody></table></div>` : `<p class="empty">No hay libros.</p>`;
      $$("[data-edit]", body).forEach((b) => (b.onclick = () => editBook(b.dataset.edit)));
      $$("[data-del]", body).forEach((b) => (b.onclick = async () => {
        const l = Store.libro(b.dataset.del);
        if (!l) return;
        if (Store.data.prestamos.some((p) => p.libroId === l.id && p.estado === "prestado")) { toast("Ese libro tiene préstamos activos."); return; }
        if (!(await confirmModal(`¿Eliminar «${l.titulo}» del catálogo?`, "Eliminar"))) return;
        Store.data.libros = Store.data.libros.filter((x) => x.id !== l.id);
        Store.save();
        toast("Libro eliminado.");
        paint();
      }));
    }
    $("#aq").addEventListener("input", paint);
    $("#ac").addEventListener("change", paint);
    $("#new-book").onclick = () => editBook(null, $("#ac").value);
    paint();
  }

  function editBook(id, carreraId) {
    const l = id ? Store.libro(id) : { titulo: "", autor: "", anio: "", editorial: "", isbn: "", carreraId: carreraId || (Store.data.carreras[0] || {}).id, categoria: "", ejemplares: 1, ubicacion: "", descripcion: "", enlace: "" };
    if (!l) return;
    openModal(`
      <form class="modal-pad form" id="book-form">
        <button type="button" class="close-x" data-close aria-label="Cerrar">✕</button>
        <h2>${id ? "Editar libro" : "Nuevo libro"}</h2>
        <label>Título <input name="titulo" required maxlength="200" value="${esc(l.titulo)}" /></label>
        <label>Autor(es) <input name="autor" required maxlength="200" value="${esc(l.autor)}" /></label>
        <div class="grid2">
          <label>Carrera <select name="carreraId" required>${carreraOptions(l.carreraId)}</select></label>
          <label>Categoría / materia <input name="categoria" maxlength="80" value="${esc(l.categoria)}" /></label>
          <label>Editorial <input name="editorial" maxlength="120" value="${esc(l.editorial)}" /></label>
          <label>Año <input name="anio" type="number" min="1400" max="2100" value="${esc(l.anio)}" /></label>
          <label>ISBN <input name="isbn" maxlength="20" value="${esc(l.isbn)}" /></label>
          <label>Ejemplares <input name="ejemplares" type="number" min="0" max="999" required value="${esc(l.ejemplares)}" /></label>
        </div>
        <label>Ubicación (estante) <input name="ubicacion" maxlength="60" value="${esc(l.ubicacion)}" /></label>
        <label>Enlace a versión digital (opcional) <input name="enlace" type="url" maxlength="400" placeholder="https://" value="${esc(l.enlace)}" /></label>
        <label>Descripción <textarea name="descripcion" rows="3" maxlength="1000">${esc(l.descripcion)}</textarea></label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close>Cancelar</button>
          <button class="btn btn-primary">Guardar</button>
        </div>
      </form>`);
    $("#book-form").onsubmit = (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      const obj = { ...f, titulo: f.titulo.trim(), autor: f.autor.trim(), anio: f.anio ? Number(f.anio) : "", ejemplares: Math.max(0, Number(f.ejemplares) || 0) };
      if (id) Object.assign(l, obj);
      else Store.data.libros.push({ id: Store.uid(), ...obj });
      Store.save();
      closeModal();
      toast("Libro guardado.");
      route();
    };
  }

  function adminCarreras(body) {
    body.innerHTML = `
      <p class="muted">Solo las carreras <strong>vigentes</strong> se muestran a los estudiantes. Una carrera no vigente conserva sus libros.</p>
      <div class="toolbar"><button class="btn btn-primary" id="new-car">＋ Nueva carrera</button></div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>Carrera</th><th>Libros</th><th>Vigente</th><th></th></tr></thead>
        <tbody>${Store.data.carreras.map((c) => `<tr>
          <td data-label="Carrera"><span class="emoji">${esc(c.icono)}</span> <strong>${esc(c.nombre)}</strong></td>
          <td data-label="Libros">${Store.data.libros.filter((l) => l.carreraId === c.id).length}</td>
          <td data-label="Vigente"><label class="switch"><input type="checkbox" data-vig="${esc(c.id)}" ${c.vigente ? "checked" : ""} aria-label="Vigente: ${esc(c.nombre)}" /><span></span></label></td>
          <td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="${esc(c.id)}">✏️ Editar</button><button class="btn btn-ghost btn-sm" data-del="${esc(c.id)}">🗑️</button></td>
        </tr>`).join("")}</tbody></table></div>`;
    $$("[data-vig]", body).forEach((i) => (i.onchange = () => {
      Store.carrera(i.dataset.vig).vigente = i.checked;
      Store.save();
      toast(i.checked ? "Carrera marcada como vigente." : "Carrera oculta para estudiantes.");
    }));
    $$("[data-edit]", body).forEach((b) => (b.onclick = () => editCarrera(b.dataset.edit)));
    $$("[data-del]", body).forEach((b) => (b.onclick = async () => {
      const c = Store.carrera(b.dataset.del);
      if (Store.data.libros.some((l) => l.carreraId === c.id)) { toast("Mueve o elimina primero los libros de esta carrera, o márcala como no vigente."); return; }
      if (!(await confirmModal(`¿Eliminar la carrera «${c.nombre}»?`, "Eliminar"))) return;
      Store.data.carreras = Store.data.carreras.filter((x) => x.id !== c.id);
      Object.values(Store.data.usuarios).forEach((u) => { if (u.carreraId === c.id) u.carreraId = ""; });
      Store.save();
      route();
    }));
    $("#new-car").onclick = () => editCarrera(null);
  }

  function editCarrera(id) {
    const c = id ? Store.carrera(id) : { nombre: "", icono: "🎓", vigente: true };
    openModal(`
      <form class="modal-pad form" id="car-form">
        <button type="button" class="close-x" data-close aria-label="Cerrar">✕</button>
        <h2>${id ? "Editar carrera" : "Nueva carrera"}</h2>
        <div class="grid2 grid-icon">
          <label>Ícono <input name="icono" maxlength="4" value="${esc(c.icono)}" /></label>
          <label>Nombre <input name="nombre" required maxlength="100" value="${esc(c.nombre)}" /></label>
        </div>
        <label class="check"><input type="checkbox" name="vigente" ${c.vigente ? "checked" : ""} /> Carrera vigente</label>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close>Cancelar</button>
          <button class="btn btn-primary">Guardar</button>
        </div>
      </form>`);
    $("#car-form").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const obj = { nombre: f.get("nombre").trim(), icono: f.get("icono").trim() || "🎓", vigente: f.get("vigente") === "on" };
      if (id) Object.assign(c, obj);
      else {
        let base = norm(obj.nombre).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "carrera";
        let nid = base, i = 2;
        while (Store.carrera(nid)) nid = `${base}-${i++}`;
        Store.data.carreras.push({ id: nid, ...obj });
      }
      Store.save();
      closeModal();
      toast("Carrera guardada.");
      route();
    };
  }

  function adminUsuarios(body) {
    const users = Object.values(Store.data.usuarios).sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    body.innerHTML = `
      <div class="toolbar"><button class="btn btn-primary" id="new-user">＋ Nuevo usuario</button></div>
      <div class="table-wrap"><table class="table">
        <thead><tr><th>Nombre</th><th>Usuario</th><th>Rol</th><th>Carrera</th><th>Estado</th><th></th></tr></thead>
        <tbody>${users.map((u) => {
          const c = Store.carrera(u.carreraId);
          return `<tr>
            <td data-label="Nombre"><strong>${esc(u.nombre)}</strong></td>
            <td data-label="Usuario"><code>${esc(u.usuario)}</code></td>
            <td data-label="Rol">${rolTxt(u.rol)}</td>
            <td data-label="Carrera">${esc(c ? c.nombre : "—")}</td>
            <td data-label="Estado"><span class="status ${u.activo ? "st-on" : "st-off"}">${u.activo ? "Activo" : "Inactivo"}</span></td>
            <td class="row-actions"><button class="btn btn-ghost btn-sm" data-edit="${esc(u.usuario)}">✏️ Editar</button>${u.usuario !== me.usuario ? `<button class="btn btn-ghost btn-sm" data-del="${esc(u.usuario)}">🗑️</button>` : ""}</td>
          </tr>`;
        }).join("")}</tbody></table></div>`;
    $("#new-user").onclick = () => editUser(null);
    $$("[data-edit]", body).forEach((b) => (b.onclick = () => editUser(b.dataset.edit)));
    $$("[data-del]", body).forEach((b) => (b.onclick = async () => {
      const u = Store.data.usuarios[b.dataset.del];
      if (!(await confirmModal(`¿Eliminar la cuenta de ${u.nombre}?`, "Eliminar"))) return;
      delete Store.data.usuarios[u.usuario];
      Store.save();
      route();
    }));
  }

  function editUser(usuario) {
    const u = usuario ? Store.data.usuarios[usuario] : { usuario: "", nombre: "", rol: "estudiante", carreraId: "", activo: true };
    const self = usuario === me.usuario;
    openModal(`
      <form class="modal-pad form" id="user-form">
        <button type="button" class="close-x" data-close aria-label="Cerrar">✕</button>
        <h2>${usuario ? "Editar usuario" : "Nuevo usuario"}</h2>
        <label>Nombre completo <input name="nombre" required maxlength="80" value="${esc(u.nombre)}" /></label>
        <label>Usuario <input name="usuario" required maxlength="40" pattern="[a-z0-9._\\-]{3,40}" title="3 a 40 caracteres: minúsculas, números, punto, guion" autocapitalize="off" value="${esc(u.usuario)}" ${usuario ? "readonly" : ""} /></label>
        <div class="grid2">
          <label>Rol <select name="rol" ${self ? "disabled" : ""}>${Object.entries(ROLES).map(([k, v]) => `<option value="${k}" ${u.rol === k ? "selected" : ""}>${v}</option>`).join("")}</select></label>
          <label>Carrera <select name="carreraId">${carreraOptions(u.carreraId, true)}</select></label>
        </div>
        <label>${usuario ? "Nueva contraseña (déjala vacía para no cambiarla)" : "Contraseña"}
          <span class="pw-row"><input name="pass" type="text" minlength="6" maxlength="60" autocomplete="new-password" ${usuario ? "" : `required value="${Store.generatePassword()}"`} />
          <button type="button" class="btn btn-ghost btn-sm" id="gen-pw">🎲 Generar</button></span>
        </label>
        ${self ? "" : `<label class="check"><input type="checkbox" name="activo" ${u.activo ? "checked" : ""} /> Cuenta activa</label>`}
        <p class="form-msg" id="user-msg" role="alert"></p>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-close>Cancelar</button>
          <button class="btn btn-primary">Guardar</button>
        </div>
      </form>`);
    $("#gen-pw").onclick = () => { $("#user-form [name=pass]").value = Store.generatePassword(); };
    $("#user-form").onsubmit = async (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const msg = $("#user-msg");
      const name = f.get("usuario").trim().toLowerCase();
      if (!usuario) {
        if (!Store.validUsername(name)) { msg.textContent = "Usuario no válido."; return; }
        if (Store.data.usuarios[name]) { msg.textContent = "Ese usuario ya existe."; return; }
      }
      const obj = {
        usuario: usuario || name,
        nombre: f.get("nombre").trim(),
        rol: self ? u.rol : f.get("rol"),
        carreraId: f.get("carreraId"),
        activo: self ? true : f.get("activo") === "on"
      };
      const pw = f.get("pass");
      try {
        if (pw) Object.assign(obj, await Store.hashPassword(pw));
      } catch (err) { msg.textContent = err.message; return; }
      Store.data.usuarios[obj.usuario] = { ...(usuario ? u : { creado: new Date().toISOString() }), ...obj };
      Store.save();
      closeModal();
      if (pw) toast(`Datos de acceso: ${obj.usuario} / ${pw}`);
      else toast("Usuario guardado.");
      if (self) { me = Store.data.usuarios[me.usuario]; $("#user-name").textContent = me.nombre; }
      route();
    };
  }

  function adminPrestamos(body) {
    const order = { solicitado: 0, prestado: 1, devuelto: 2, rechazado: 3, cancelado: 4 };
    const all = [...Store.data.prestamos].sort((a, b) => (order[a.estado] - order[b.estado]) || (b.solicitado || "").localeCompare(a.solicitado || ""));
    body.innerHTML = `
      <div class="toolbar">
        <select id="pf" aria-label="Filtrar por estado">
          <option value="activos">Solicitados y prestados</option><option value="">Todos</option>
          ${Object.entries(ESTADOS).map(([k, v]) => `<option value="${k}">${v.txt}</option>`).join("")}
        </select>
      </div>
      <div id="plist"></div>`;
    function paint() {
      const fv = $("#pf").value;
      const res = all.filter((p) => !fv || (fv === "activos" ? p.estado === "solicitado" || p.estado === "prestado" : p.estado === fv));
      $("#plist").innerHTML = res.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Libro</th><th>Lector</th><th>Solicitado</th><th>Devolver hasta</th><th>Estado</th><th></th></tr></thead>
        <tbody>${res.map((p) => prestamoRow(p, true)).join("")}</tbody></table></div>` : `<p class="empty">No hay préstamos en esta lista.</p>`;
      bindLoanActions($("#plist"));
    }
    $("#pf").addEventListener("change", paint);
    paint();
  }

  // ---------- Reportes descargables ----------
  const fmtFecha = (iso) => (iso ? new Date(iso).toLocaleDateString("es-EC", { year: "numeric", month: "2-digit", day: "2-digit" }) : "");
  const fmtHora = (iso) => (iso ? new Date(iso).toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit", hour12: false }) : "");
  const nombreCarrera = (id) => { const c = Store.carrera(id); return c ? c.nombre : "Sin carrera"; };
  // Datos de la persona: los guardados en el registro y, si faltan (registros antiguos), los de su cuenta.
  function persona(reg) {
    const u = Store.data.usuarios[reg.usuario] || {};
    return { nombre: reg.nombre || u.nombre || reg.usuario, carreraId: reg.carreraId != null ? reg.carreraId : u.carreraId, rol: reg.rol || u.rol };
  }

  // Orden de las carreras tal como están en Administración → Carreras.
  const ordenCarrera = (id) => { const i = Store.data.carreras.findIndex((c) => c.id === id); return i < 0 ? 9999 : i; };

  const REPORTES = {
    libros: {
      titulo: "Títulos de la biblioteca",
      icono: "📚",
      sinFecha: true,
      columnas: ["N.º", "Carrera", "Título", "Autor", "Editorial", "Año", "ISBN", "Categoría", "Ejemplares", "Disponibles", "Ubicación"],
      registros: () => Store.data.libros,
      carrera: (r) => r.carreraId,
      orden: (a, b) => ordenCarrera(a.carreraId) - ordenCarrera(b.carreraId) || a.titulo.localeCompare(b.titulo, "es"),
      fila: (l) => [0, nombreCarrera(l.carreraId), l.titulo, l.autor, l.editorial || "", l.anio ? Number(l.anio) : "", l.isbn || "", l.categoria || "", Number(l.ejemplares) || 0, Store.disponibles(l), l.ubicacion || ""],
      // Hoja adicional con el número de títulos por carrera.
      resumen: (filas) => {
        const por = new Map();
        filas.forEach((f) => {
          const r = por.get(f[1]) || [0, 0, 0];
          r[0]++; r[1] += f[8]; r[2] += f[9];
          por.set(f[1], r);
        });
        const rows = Store.data.carreras.filter((c) => por.has(c.nombre)).map((c) => [c.nombre, c.vigente ? "Sí" : "No", ...por.get(c.nombre)]);
        if (por.has("Sin carrera")) rows.push(["Sin carrera", "—", ...por.get("Sin carrera")]);
        const tot = rows.reduce((t, r) => [t[0] + r[2], t[1] + r[3], t[2] + r[4]], [0, 0, 0]);
        return { nombre: "Títulos por carrera", columnas: ["Carrera", "Vigente", "N.º de títulos", "Ejemplares", "Disponibles"], filas: [...rows, ["TOTAL", "", ...tot]] };
      }
    },
    accesos: {
      titulo: "Ingresos al sistema",
      icono: "🔐",
      columnas: ["Fecha", "Hora", "Usuario", "Nombre", "Tipo de usuario", "Carrera", "Movimiento"],
      registros: () => Store.data.accesos,
      fecha: (r) => r.fecha,
      carrera: (r) => persona(r).carreraId,
      rol: (r) => persona(r).rol || "estudiante",
      fila: (r) => { const p = persona(r); return [fmtFecha(r.fecha), fmtHora(r.fecha), r.usuario, p.nombre, rolTxt(p.rol), nombreCarrera(p.carreraId), r.tipo]; }
    },
    consultas: {
      titulo: "Libros consultados",
      icono: "📖",
      columnas: ["Fecha", "Hora", "Usuario", "Nombre", "Tipo de lector", "Carrera del lector", "Libro", "Autor", "Carrera del libro", "Acción"],
      registros: () => Store.data.consultas,
      fecha: (r) => r.fecha,
      carrera: (r) => persona(r).carreraId,
      rol: (r) => persona(r).rol || "estudiante",
      fila: (r) => {
        const p = persona(r);
        const l = Store.libro(r.libroId);
        return [fmtFecha(r.fecha), fmtHora(r.fecha), r.usuario, p.nombre, rolTxt(p.rol), nombreCarrera(p.carreraId), l ? l.titulo : r.titulo || "(libro eliminado)", l ? l.autor : "", nombreCarrera(l ? l.carreraId : r.libroCarreraId), r.accion];
      }
    },
    prestamos: {
      titulo: "Préstamos",
      icono: "🔖",
      columnas: ["Fecha de solicitud", "Usuario", "Nombre", "Tipo de lector", "Carrera del lector", "Libro", "Autor", "Carrera del libro", "Fecha de entrega", "Devolver hasta", "Fecha de devolución", "Estado"],
      registros: () => Store.data.prestamos,
      fecha: (r) => r.solicitado,
      carrera: (r) => persona(r).carreraId,
      rol: (r) => persona(r).rol || "estudiante",
      fila: (r) => {
        const p = persona(r);
        const l = Store.libro(r.libroId);
        const vencido = r.estado === "prestado" && r.limite && new Date(r.limite) < new Date();
        return [fmtFecha(r.solicitado), r.usuario, p.nombre, rolTxt(p.rol), nombreCarrera(p.carreraId), l ? l.titulo : r.titulo || "(libro eliminado)", l ? l.autor : "", nombreCarrera(l ? l.carreraId : ""), fmtFecha(r.entregado), fmtFecha(r.limite), fmtFecha(r.devuelto), vencido ? "Vencido" : (ESTADOS[r.estado] || { txt: r.estado }).txt];
      }
    }
  };

  let repTipo = "libros";
  function adminReportes(body) {
    const hoy = new Date();
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const inicioMes = iso(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
    body.innerHTML = `
      <p class="muted">Descarga en Excel los títulos de la biblioteca por carrera, y los registros de ingresos, libros consultados y préstamos (con nombre, carrera y fecha).</p>
      <div class="rep-types" role="radiogroup" aria-label="Tipo de reporte">
        ${Object.entries(REPORTES).map(([k, r]) => `<button class="rep-type ${k === repTipo ? "active" : ""}" role="radio" aria-checked="${k === repTipo}" data-rep="${k}">
          <span aria-hidden="true">${r.icono}</span><strong>${r.titulo}</strong><small>${r.registros().length} ${r.sinFecha ? "títulos" : "registros"}</small></button>`).join("")}
      </div>
      <div class="toolbar rep-filters">
        <label data-fecha>Desde <input type="date" id="rd" value="${inicioMes}" /></label>
        <label data-fecha>Hasta <input type="date" id="rh" value="${iso(hoy)}" /></label>
        <label data-fecha>Tipo de lector <select id="rr">
          <option value="lectores">Docentes y estudiantes</option><option value="docente">Solo docentes</option>
          <option value="estudiante">Solo estudiantes</option><option value="">Todos (incluye administradores)</option></select></label>
        <label>Carrera <select id="rc"><option value="">Todas</option>${carreraOptions("")}<option value="__none">Sin carrera</option></select></label>
        <label>Buscar <input type="search" id="rq" placeholder="Nombre, título, autor…" /></label>
      </div>
      <div class="toolbar">
        <button class="btn btn-primary" id="dl-one">📥 Descargar este reporte (Excel)</button>
        <button class="btn btn-light" id="dl-all">📥 Descargar todos los reportes en un archivo</button>
      </div>
      <div id="rep-summary" class="rep-summary"></div>
      <div id="rep-resumen"></div>
      <div id="rep-list"></div>`;

    function filtrar(tipo) {
      const R = REPORTES[tipo];
      const d = $("#rd").value, h = $("#rh").value, c = $("#rc").value, rr = $("#rr").value, q = norm($("#rq").value).trim();
      const desde = d && !R.sinFecha ? new Date(d + "T00:00:00") : null;
      const hasta = h && !R.sinFecha ? new Date(h + "T23:59:59.999") : null;
      const filas = R.registros()
        .filter((r) => {
          const f = R.sinFecha ? null : new Date(R.fecha(r));
          if (desde && f < desde) return false;
          if (hasta && f > hasta) return false;
          const cid = R.carrera(r) || "";
          if (c === "__none" ? cid : c && cid !== c) return false;
          if (R.rol && rr) {
            const rol = R.rol(r);
            if (rr === "lectores" ? rol === "admin" : rol !== rr) return false;
          }
          return true;
        })
        .sort(R.orden || ((a, b) => String(R.fecha(b)).localeCompare(String(R.fecha(a)))))
        .map((r) => R.fila(r))
        .filter((fila) => !q || words(q).every((w) => norm(fila.join(" ")).includes(w)));
      if (R.sinFecha) filas.forEach((f, i) => { f[0] = i + 1; });
      return filas;
    }
    // Hojas del archivo de Excel para un reporte (el de títulos lleva además el resumen por carrera).
    function hojas(tipo) {
      const R = REPORTES[tipo];
      const filas = filtrar(tipo);
      const h = [{ nombre: R.titulo, columnas: R.columnas, filas }];
      if (R.resumen) h.unshift(R.resumen(filas));
      return h;
    }
    const tabla = (columnas, filas) => `<div class="table-wrap table-scroll"><table class="table">
        <thead><tr>${columnas.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
        <tbody>${filas.map((f) => `<tr>${f.map((v, i) => `<td data-label="${esc(columnas[i])}">${esc(v === "" || v == null ? "—" : v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    const words = (q) => q.split(/\s+/);

    function paint() {
      const R = REPORTES[repTipo];
      const filas = filtrar(repTipo);
      $$("[data-fecha]", body).forEach((l) => (l.hidden = !!R.sinFecha));
      if (R.sinFecha) {
        const res = R.resumen(filas);
        const tot = res.filas[res.filas.length - 1];
        $("#rep-summary").innerHTML = `
          <div class="sum-box"><strong>${tot[2]}</strong><span>títulos</span></div>
          <div class="sum-box"><strong>${tot[3]}</strong><span>ejemplares</span></div>
          <div class="sum-box"><strong>${tot[4]}</strong><span>disponibles</span></div>
          <div class="sum-box"><strong>${res.filas.length - 1}</strong><span>carreras</span></div>`;
        $("#rep-resumen").innerHTML = filas.length ? `<h3 class="rep-sub">Títulos por carrera</h3>${tabla(res.columnas, res.filas)}<h3 class="rep-sub">Listado de títulos</h3>` : "";
      } else {
        const ci = R.columnas.findIndex((c) => c.startsWith("Carrera"));
        const porCarrera = {};
        filas.forEach((f) => { porCarrera[f[ci]] = (porCarrera[f[ci]] || 0) + 1; });
        const personas = new Set(filas.map((f) => f[R.columnas.indexOf("Usuario")])).size;
        const ti = R.columnas.findIndex((c) => c.startsWith("Tipo de"));
        const deTipo = (t) => filas.filter((f) => f[ti] === t).length;
        $("#rep-summary").innerHTML = `
          <div class="sum-box"><strong>${filas.length}</strong><span>registros</span></div>
          <div class="sum-box"><strong>${personas}</strong><span>personas</span></div>
          <div class="sum-box"><strong>${deTipo("Docente")}</strong><span>de docentes</span></div>
          <div class="sum-box"><strong>${deTipo("Estudiante")}</strong><span>de estudiantes</span></div>
          ${Object.entries(porCarrera).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `<div class="sum-box"><strong>${v}</strong><span>${esc(k)}</span></div>`).join("")}`;
        $("#rep-resumen").innerHTML = "";
      }
      const MAX = 300;
      $("#rep-list").innerHTML = filas.length ? `${tabla(R.columnas, filas.slice(0, MAX))}
        ${filas.length > MAX ? `<p class="muted">Se muestran ${MAX} de ${filas.length}; el archivo de Excel incluye todos.</p>` : ""}`
        : `<p class="empty">No hay registros con estos filtros.</p>`;
    }

    const sufijo = () => (REPORTES[repTipo].sinFecha ? new Date().toISOString().slice(0, 10) : `${$("#rd").value || "inicio"}_a_${$("#rh").value || "hoy"}`);
    $("#dl-one").onclick = () => {
      if (!filtrar(repTipo).length) { toast("No hay registros para descargar."); return; }
      XLSX.download(`ISTY-biblioteca-${repTipo}-${sufijo()}.xlsx`, hojas(repTipo));
    };
    $("#dl-all").onclick = () => {
      XLSX.download(`ISTY-biblioteca-reportes-${$("#rd").value || "inicio"}_a_${$("#rh").value || "hoy"}.xlsx`, Object.keys(REPORTES).flatMap(hojas));
    };
    $$("[data-rep]", body).forEach((b) => (b.onclick = () => {
      repTipo = b.dataset.rep;
      $$("[data-rep]", body).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-checked", x === b); });
      paint();
    }));
    ["#rd", "#rh", "#rc", "#rr"].forEach((s) => $(s).addEventListener("change", paint));
    $("#rq").addEventListener("input", paint);
    paint();
  }

  function adminRespaldo(body) {
    body.innerHTML = `
      <div class="card">
        <h2>💾 Copia de respaldo</h2>
        <p class="muted">Los datos se guardan en este navegador. Descarga una copia para no perderlos o para pasarlos a otro equipo.</p>
        <div class="modal-actions left">
          <button class="btn btn-primary" id="exp">⬇️ Descargar respaldo</button>
          <label class="btn btn-light">⬆️ Restaurar respaldo<input type="file" id="imp" accept="application/json,.json" hidden /></label>
        </div>
      </div>`;
    $("#exp").onclick = () => {
      const blob = new Blob([Store.exportAll()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `biblioteca-isty-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    $("#imp").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!(await confirmModal("Restaurar reemplazará todos los datos actuales. ¿Continuar?", "Restaurar"))) return;
      try {
        Store.importAll(await file.text());
        me = Store.sessionUser;
        if (!me) { logout(); return; }
        toast("Respaldo restaurado.");
        route();
      } catch (err) { toast(err.message || "No se pudo leer el archivo."); }
    };
  }

  // ---------- Enrutador ----------
  function route() {
    me = Store.sessionUser;
    if (!me) { showAuth(); return; }
    const parts = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
    const section = parts[0] || "catalogo";
    $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === (section === "carrera" ? "catalogo" : section)));
    closeModal();
    if (section === "carrera") renderCarrera(parts[1]);
    else if (section === "prestamos") renderMisPrestamos();
    else if (section === "admin") {
      if (!isAdmin()) { location.hash = "#/"; return; }
      renderAdmin(parts[1]);
    } else renderCatalogo();
    window.scrollTo(0, 0);
  }

  // ---------- Acceso ----------
  function showAuth() {
    $("#screen-app").hidden = true;
    $("#screen-auth").hidden = false;
    const first = Object.keys(Store.data.usuarios).length === 0;
    $("#setup-form").hidden = !first;
    $("#login-form").hidden = first;
    (first ? $("#setup-name") : $("#login-user")).focus();
  }

  function enter(user, fromLogin) {
    Store.setSession(user.usuario);
    me = user;
    $("#screen-auth").hidden = true;
    $("#screen-app").hidden = false;
    $("#user-name").textContent = me.nombre;
    $("#nav-admin").hidden = !isAdmin();
    if (fromLogin) Store.registrar("accesos", me, { tipo: "Ingreso" });
    if (fromLogin && location.hash && location.hash !== "#/") location.hash = "#/";
    else route();
  }

  function logout() {
    if (me) Store.registrar("accesos", me, { tipo: "Salida" });
    Store.setSession(null);
    me = null;
    $("#login-form").reset();
    showAuth();
  }

  $("#login-form").onsubmit = async (e) => {
    e.preventDefault();
    const msg = $("#login-msg");
    msg.textContent = "";
    const u = Store.data.usuarios[$("#login-user").value.trim().toLowerCase()];
    try {
      if (!u || !(await Store.checkPassword(u, $("#login-pass").value))) { msg.textContent = "Usuario o contraseña incorrectos."; return; }
    } catch (err) { msg.textContent = err.message; return; }
    if (!u.activo) { msg.textContent = "Tu cuenta está desactivada. Consulta con la biblioteca."; return; }
    enter(u, true);
  };

  $("#setup-form").onsubmit = async (e) => {
    e.preventDefault();
    const msg = $("#setup-msg");
    const usuario = $("#setup-user").value.trim().toLowerCase();
    if (!Store.validUsername(usuario)) { msg.textContent = "Usuario no válido: usa minúsculas, números, punto o guion."; return; }
    const now = new Date().toISOString();
    try {
      const admin = { usuario, nombre: $("#setup-name").value.trim(), rol: "admin", carreraId: "", activo: true, creado: now, ...(await Store.hashPassword($("#setup-pass").value)) };
      Store.data.usuarios[usuario] = admin;
      if ($("#setup-demo").checked && usuario !== "estudiante") {
        Store.data.usuarios.estudiante = { usuario: "estudiante", nombre: "Estudiante de Prueba", rol: "estudiante", carreraId: "software", activo: true, creado: now, ...(await Store.hashPassword("isty2026")) };
      }
      if ($("#setup-demo").checked && usuario !== "docente") {
        Store.data.usuarios.docente = { usuario: "docente", nombre: "Docente de Prueba", rol: "docente", carreraId: "enfermeria", activo: true, creado: now, ...(await Store.hashPassword("isty2026")) };
      }
      Store.save();
      enter(admin, true);
    } catch (err) { msg.textContent = err.message; }
  };

  $$("[data-toggle-pw]").forEach((b) => (b.onclick = () => {
    const i = document.getElementById(b.dataset.togglePw);
    i.type = i.type === "password" ? "text" : "password";
  }));
  $("#logout-btn").onclick = logout;
  window.addEventListener("hashchange", route);

  // Inicio
  Store.save(); // guarda los datos iniciales la primera vez
  me = Store.sessionUser;
  if (me) enter(me);
  else showAuth();
})();
