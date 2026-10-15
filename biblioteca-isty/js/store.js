/* Biblioteca ISTY · Almacenamiento.
   Guarda carreras, libros, usuarios y préstamos en el localStorage del navegador.
   Las contraseñas nunca se guardan en texto plano: PBKDF2-SHA256 con sal.

   Dos modos:
   - "servidor": si la página encuentra la API PHP (api/index.php) conectada a MySQL, todo se
     guarda en la base de datos del servidor y el inicio de sesión lo valida el servidor.
   - "local": sin servidor (GitHub Pages, archivo abierto con doble clic), los datos quedan en
     el navegador (localStorage), como en la primera versión. */

const Store = (function () {
  "use strict";

  const KEY = "isty_biblioteca_v1";
  const SESSION_KEY = "isty_biblioteca_sesion";
  let data = null;

  // ----- Modo servidor -----
  const API = (window.BIBLIOTECA_CONFIG && window.BIBLIOTECA_CONFIG.api) || "api/index.php";
  let modo = "local";
  let hayUsuariosServidor = true;
  let yo = null;              // usuario con sesión (modo servidor)
  let foto = null;            // último estado guardado en el servidor, por colección e id
  let syncEnCurso = false, syncPendiente = false;
  let alFallar = () => {};
  const COLECCIONES = ["carreras", "usuarios", "libros", "prestamos", "accesos", "consultas"];
  const SOLO_AGREGAR = ["accesos", "consultas"];

  class ErrorApi extends Error { constructor(m, codigo) { super(m); this.codigo = codigo; } }
  async function llamar(accion, cuerpo) {
    let r;
    try {
      r = await fetch(`${API}?accion=${accion}`, cuerpo === undefined
        ? { credentials: "same-origin", cache: "no-store" }
        : { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "X-Biblioteca": "1" }, body: JSON.stringify(cuerpo) });
    } catch (e) { throw new ErrorApi("No hay conexión con el servidor.", 0); }
    let j = null;
    try { j = await r.json(); } catch (e) { throw new ErrorApi("El servidor no respondió como se esperaba.", r.status || -1); }
    if (!r.ok || !j.ok) throw new ErrorApi(j.error || "Error del servidor.", r.status);
    return j;
  }

  const vacio = () => ({ version: SEED_VERSION, carreras: [], libros: [], usuarios: {}, prestamos: [], accesos: [], consultas: [] });
  const claveDe = (col, x) => (col === "usuarios" ? x.usuario : x.id);
  const listaDe = (col) => (col === "usuarios" ? Object.values(data.usuarios) : data[col]);

  function tomarFoto() {
    foto = {};
    COLECCIONES.forEach((col) => { foto[col] = new Map(listaDe(col).map((x) => [claveDe(col, x), JSON.stringify(x)])); });
  }

  async function cargarServidor() {
    const d = await llamar("datos");
    yo = d.yo.usuario;
    data = vacio();
    data.carreras = d.carreras;
    data.libros = d.libros;
    d.usuarios.forEach((u) => { data.usuarios[u.usuario] = u; });
    data.prestamos = d.prestamos;
    data.accesos = d.accesos;
    data.consultas = d.consultas;
    tomarFoto();
    normalizar();
  }

  // Envía al servidor solo lo que cambió desde la última vez (altas, cambios y eliminaciones).
  function diferencias() {
    const cambios = {};
    let hay = false;
    COLECCIONES.forEach((col) => {
      const antes = foto[col];
      const ahora = new Map();
      const upsert = [];
      listaDe(col).forEach((x) => {
        const k = claveDe(col, x);
        const js = JSON.stringify(x);
        ahora.set(k, js);
        if (antes.get(k) !== js) upsert.push(x);
      });
      const del = SOLO_AGREGAR.includes(col) ? [] : [...antes.keys()].filter((k) => !ahora.has(k));
      if (upsert.length || del.length) { cambios[col] = { upsert, delete: del }; hay = true; }
    });
    return hay ? cambios : null;
  }

  async function sincronizar() {
    if (syncEnCurso) { syncPendiente = true; return; }
    syncEnCurso = true;
    try {
      do {
        syncPendiente = false;
        const dif = diferencias();
        if (!dif) continue;
        const cambios = JSON.parse(JSON.stringify(dif)); // copia: lo que viaja no cambia aunque se siga editando
        // Las contraseñas nuevas viajan una sola vez y no quedan guardadas en la página.
        Object.values(data.usuarios).forEach((u) => { delete u.contrasena; });
        tomarFoto();
        try { await llamar("sync", cambios); } catch (e) {
          alFallar(e.message, e.codigo);
          if (e.codigo !== 401) { try { await cargarServidor(); } catch (e2) { /* sin conexión */ } }
          syncPendiente = false;
        }
      } while (syncPendiente);
    } finally { syncEnCurso = false; }
  }

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  const seedCarreras = () => SEED.carreras.map((c) => ({ ...c }));
  const seedLibros = () => SEED.libros.map((l) => ({ id: uid(), descripcion: "", enlace: "", ...l }));

  function empty() {
    return {
      version: SEED_VERSION,
      carreras: seedCarreras(),
      libros: seedLibros(),
      usuarios: {},
      prestamos: [],
      accesos: [],
      consultas: []
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      data = raw ? JSON.parse(raw) : empty();
    } catch (e) {
      data = empty();
    }
    for (const k of ["carreras", "libros", "prestamos", "accesos", "consultas"]) if (!Array.isArray(data[k])) data[k] = [];
    if (!data.usuarios || typeof data.usuarios !== "object") data.usuarios = {};
    // Versión 2: catálogo con las carreras vigentes del instituto. Reemplaza el catálogo de
    // ejemplo anterior y conserva usuarios, préstamos y registros de actividad.
    if ((data.version || 1) < SEED_VERSION) {
      data.carreras = seedCarreras();
      data.libros = seedLibros();
      Object.values(data.usuarios).forEach((u) => { if (!data.carreras.some((c) => c.id === u.carreraId)) u.carreraId = ""; });
      data.version = SEED_VERSION;
      save();
    }
    normalizar();
    return data;
  }

  // Completa campos agregados en versiones nuevas: prefijo de carrera, formato y código de cada libro.
  function normalizar() {
    let cambio = false;
    data.carreras.forEach((c) => {
      if (!c.prefijo) { c.prefijo = prefijoDe(c.nombre, data.carreras); cambio = true; }
    });
    data.libros.forEach((l) => {
      if (!FORMATOS[l.formato]) { l.formato = "fisico"; cambio = true; }
    });
    data.libros.forEach((l) => {
      if (!l.codigo) { l.codigo = siguienteCodigo(l.carreraId); cambio = true; }
    });
    if (cambio) save();
  }

  // Iniciales de las palabras importantes: "Gestión de Operaciones Turísticas" → "GOT".
  function prefijoDe(nombre, carreras) {
    const sin = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const palabras = sin(nombre || "").split(/[^A-Z0-9]+/).filter((w) => w && !["DE", "DEL", "LA", "LAS", "LOS", "Y", "EN", "E"].includes(w));
    let base = palabras.length > 1 ? palabras.map((w) => w[0]).join("").slice(0, 4) : (palabras[0] || "LIB").slice(0, 3);
    let pref = base, i = 2;
    while (carreras.some((c) => c.prefijo === pref)) pref = base + i++;
    return pref;
  }

  function siguienteCodigo(carreraId) {
    const c = data.carreras.find((x) => x.id === carreraId);
    const pref = c ? c.prefijo : "LIB";
    const re = new RegExp("^" + pref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "-(\\d+)$");
    const max = data.libros.reduce((m, l) => { const k = re.exec(l.codigo || ""); return k ? Math.max(m, Number(k[1])) : m; }, 0);
    return `${pref}-${String(max + 1).padStart(3, "0")}`;
  }

  // Devuelve false si el navegador no pudo guardar (por ejemplo, espacio lleno por imágenes).
  function save() {
    if (modo === "servidor") { if (data && foto) sincronizar(); return true; }
    if (!data) load();
    try { localStorage.setItem(KEY, JSON.stringify(data)); return true; } catch (e) { return false; }
  }

  const FORMATOS = { fisico: "Físico", virtual: "Virtual", ambos: "Físico y virtual" };

  const api = {
    uid,
    FORMATOS,
    prefijoDe: (nombre) => prefijoDe(nombre, api.data.carreras),
    siguienteCodigo: (carreraId) => { api.data; return siguienteCodigo(carreraId); },
    tieneFisico: (l) => l.formato !== "virtual",
    tieneVirtual: (l) => l.formato === "virtual" || l.formato === "ambos",
    get data() { return data || (modo === "servidor" ? (data = vacio()) : load()); },
    save,
    get modo() { return modo; },
    set alFallar(fn) { alFallar = fn; },

    // Detecta si hay servidor. Si la API responde, se usa la base de datos; si no existe
    // (404 o no es PHP), se trabaja en modo local. Un error de base de datos se informa.
    async iniciar() {
      let r;
      try { r = await fetch(`${API}?accion=estado`, { credentials: "same-origin", cache: "no-store" }); } catch (e) { r = null; }
      let j = null;
      if (r) { try { j = await r.json(); } catch (e) { j = null; } }
      if (!j) { modo = "local"; load(); return { modo }; }
      modo = "servidor";
      data = vacio();
      if (!j.ok) return { modo, error: j.error || "No se pudo conectar con la base de datos." };
      hayUsuariosServidor = j.hayUsuarios;
      if (j.usuario) await cargarServidor();
      return { modo };
    },
    // Vuelve a leer todo desde el servidor (por ejemplo, para ver solicitudes nuevas).
    async recargar() { if (modo === "servidor" && yo && !syncEnCurso) await cargarServidor(); },
    necesitaSetup() { return modo === "servidor" ? !hayUsuariosServidor : Object.keys(api.data.usuarios).length === 0; },

    async login(usuario, clave) {
      if (modo === "servidor") {
        await llamar("login", { usuario, contrasena: clave });
        await cargarServidor();
        return api.sessionUser;
      }
      const u = api.data.usuarios[usuario];
      if (!u || !(await api.checkPassword(u, clave))) throw new Error("Usuario o contraseña incorrectos.");
      if (!u.activo) throw new Error("Tu cuenta está desactivada. Consulta con la biblioteca.");
      api.setSession(u.usuario);
      api.registrar("accesos", u, { tipo: "Ingreso" });
      return u;
    },
    async setup({ nombre, usuario, clave, demo }) {
      if (modo === "servidor") {
        await llamar("setup", { nombre, usuario, contrasena: clave, demo });
        hayUsuariosServidor = true;
        await cargarServidor();
        return api.sessionUser;
      }
      const now = new Date().toISOString();
      const nuevo = async (u, n, rol, carreraId, pw) => ({ usuario: u, nombre: n, rol, carreraId, activo: true, creado: now, ...(await api.hashPassword(pw)) });
      api.data.usuarios[usuario] = await nuevo(usuario, nombre, "admin", "", clave);
      if (demo) {
        const pruebas = [["estudiante", "Estudiante de Prueba", "estudiante", "inteligencia-artificial"], ["docente", "Docente de Prueba", "docente", "sistemas-salud"],
          ["administrativo", "Administrativo de Prueba", "administrativo", ""]];
        for (const [u, n, rol, c] of pruebas) if (u !== usuario) api.data.usuarios[u] = await nuevo(u, n, rol, c, "isty2026");
      }
      save();
      api.setSession(usuario);
      api.registrar("accesos", api.data.usuarios[usuario], { tipo: "Ingreso" });
      return api.data.usuarios[usuario];
    },
    async logout(user) {
      if (modo === "servidor") {
        try { await llamar("logout", {}); } catch (e) { /* la sesión ya no existía */ }
        yo = null; foto = null; data = vacio();
        return;
      }
      if (user) api.registrar("accesos", user, { tipo: "Salida" });
      api.setSession(null);
    },
    // Asigna la contraseña a un usuario: en modo local se cifra aquí; en modo servidor se envía
    // una sola vez por la conexión segura y la cifra el servidor.
    async aplicarClave(obj, clave) {
      if (modo === "servidor") obj.contrasena = clave;
      else Object.assign(obj, await api.hashPassword(clave));
    },

    // ----- Sesión -----
    get sessionUser() {
      if (modo === "servidor") { const u = yo && api.data.usuarios[yo]; return u && u.activo ? u : null; }
      let u = null;
      try { u = sessionStorage.getItem(SESSION_KEY); } catch (e) { /* sin almacenamiento */ }
      const user = u && api.data.usuarios[u];
      return user && user.activo ? user : null;
    },
    setSession(usuario) {
      try {
        if (usuario) sessionStorage.setItem(SESSION_KEY, usuario);
        else sessionStorage.removeItem(SESSION_KEY);
      } catch (e) { /* sin almacenamiento */ }
    },

    // ----- Consultas -----
    carrera(id) { return api.data.carreras.find((c) => c.id === id); },
    libro(id) { return api.data.libros.find((l) => l.id === id); },
    // Ejemplares ocupados = préstamos activos o solicitudes pendientes.
    disponibles(libro) {
      if (libro.formato === "virtual") return 0;
      const ocupados = api.data.prestamos.filter((p) => p.libroId === libro.id && (p.estado === "prestado" || p.estado === "solicitado")).length;
      return Math.max(0, (Number(libro.ejemplares) || 0) - ocupados);
    },

    // ----- Registro de actividad (para reportes) -----
    // Guarda nombre y carrera del momento, para que el reporte no cambie si luego se edita o elimina la cuenta.
    registrar(lista, user, extra) {
      if (modo === "servidor" && lista === "accesos") return; // el servidor registra ingresos y salidas
      api.data[lista].push({ id: uid(), fecha: new Date().toISOString(), usuario: user.usuario, nombre: user.nombre, rol: user.rol, carreraId: user.carreraId || "", ...extra });
      save();
    },

    // ----- Respaldo -----
    exportAll() {
      return JSON.stringify({ app: "biblioteca-isty", version: 1, exportado: new Date().toISOString(), ...api.data }, null, 2);
    },
    importAll(text) {
      const d = JSON.parse(text);
      if (d.app !== "biblioteca-isty" || !Array.isArray(d.libros) || !Array.isArray(d.carreras)) throw new Error("El archivo no es una copia de la Biblioteca ISTY.");
      const yoAntes = modo === "servidor" && yo ? data.usuarios[yo] : null;
      data = { version: SEED_VERSION, carreras: d.carreras, libros: d.libros, usuarios: d.usuarios || {}, prestamos: d.prestamos || [], accesos: d.accesos || [], consultas: d.consultas || [] };
      // En el servidor se conserva la cuenta con la que se está trabajando.
      if (yoAntes) data.usuarios[yo] = yoAntes;
      normalizar();
      save();
    },

    // Espacio aproximado que ocupan los datos guardados (en KB).
    tamanoKB() { if (modo === "servidor") return 0; try { return Math.round((localStorage.getItem(KEY) || "").length / 1024); } catch (e) { return 0; } },

    // ----- Contraseñas -----
    validUsername(u) { return /^[a-z0-9._-]{3,40}$/.test(u || ""); },
    async hashPassword(password, saltB64) {
      if (!window.crypto || !crypto.subtle) throw new Error("Este navegador no permite cifrar contraseñas. Abre la biblioteca desde una dirección https o desde localhost.");
      const salt = saltB64 ? Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0)) : crypto.getRandomValues(new Uint8Array(16));
      const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
      const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, key, 256);
      const hash = [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
      return { salt: btoa(String.fromCharCode(...salt)), hash };
    },
    async checkPassword(user, password) {
      const { hash } = await api.hashPassword(password, user.salt);
      return hash === user.hash;
    },
    generatePassword() {
      const chars = "abcdefghjkmnpqrstuvwxyz23456789";
      const r = crypto.getRandomValues(new Uint8Array(8));
      return [...r].map((b) => chars[b % chars.length]).join("");
    }
  };
  return api;
})();
