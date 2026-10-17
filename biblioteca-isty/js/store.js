/* Biblioteca ISTY · Almacenamiento.
   Guarda carreras, libros, usuarios y préstamos en Supabase (si está configurado en
   js/config.js) y una copia en el localStorage del navegador. Sin Supabase, solo localStorage.
   Las contraseñas nunca se guardan en texto plano: PBKDF2-SHA256 con sal. */

const Store = (function () {
  "use strict";

  const KEY = "isty_biblioteca_v1";
  const SESSION_KEY = "isty_biblioteca_sesion";
  const LISTAS = ["carreras", "libros", "prestamos", "accesos", "consultas"];
  const TABLAS = ["carreras", "libros", "usuarios", "prestamos", "accesos", "consultas"];
  // Tablas que cambian por el uso diario; los registros de actividad solo se recargan al ver reportes.
  const VIVAS = ["carreras", "libros", "usuarios", "prestamos"];
  let data = null;

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function empty() {
    return {
      carreras: SEED.carreras.map((c) => ({ ...c })),
      libros: SEED.libros.map((l) => ({ id: uid(), descripcion: "", enlace: "", ...l })),
      usuarios: {},
      prestamos: [],
      accesos: [],
      consultas: []
    };
  }

  function normalize(d) {
    for (const k of LISTAS) if (!Array.isArray(d[k])) d[k] = [];
    if (!d.usuarios || typeof d.usuarios !== "object") d.usuarios = {};
    return d;
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? normalize(JSON.parse(raw)) : null;
    } catch (e) {
      return null;
    }
  }

  function load() {
    data = loadLocal() || empty();
    return data;
  }

  function saveLocal() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* sin almacenamiento */ }
  }

  // ---------- Supabase (API REST de PostgREST, sin librerías) ----------
  const cfg = window.SUPABASE_CONFIG || {};
  const remoto = !!(cfg.url && cfg.anonKey);
  const base = remoto ? cfg.url.replace(/\/+$/, "") + "/rest/v1/" : "";
  const PAGINA = 1000;
  // Último estado conocido del servidor: tabla → (id → JSON). Sirve para enviar solo lo que cambió.
  const sincronizado = {};
  const maxPos = {};
  let cola = Promise.resolve();
  let avisoError = 0;

  function headers(extra) {
    const h = { apikey: cfg.anonKey, "Content-Type": "application/json", ...extra };
    // Las claves "anon" antiguas son JWT; las nuevas "publishable" van solo en apikey.
    if (/^eyJ/.test(cfg.anonKey)) h.Authorization = "Bearer " + cfg.anonKey;
    return h;
  }

  async function pedir(path, opts = {}) {
    const res = await fetch(base + path, { ...opts, headers: headers(opts.headers) });
    if (!res.ok) {
      let detalle = "";
      try { detalle = (await res.json()).message || ""; } catch (e) { /* sin detalle */ }
      throw new Error(`Supabase respondió ${res.status}${detalle ? ": " + detalle : ""}`);
    }
    return opts.method ? null : res.json();
  }

  async function bajarTabla(t) {
    const filas = [];
    for (let desde = 0; ; desde += PAGINA) {
      const lote = await pedir(`${t}?select=id,pos,data&order=pos.asc,id.asc`, { headers: { "Range-Unit": "items", Range: `${desde}-${desde + PAGINA - 1}` } });
      filas.push(...lote);
      if (lote.length < PAGINA) break;
    }
    return filas;
  }

  // Convierte una colección del modelo en un mapa id → registro.
  function registros(t, d) {
    const m = new Map();
    if (t === "usuarios") for (const [k, u] of Object.entries(d.usuarios)) m.set(k, u);
    else for (const r of d[t]) if (r && r.id) m.set(String(r.id), r);
    return m;
  }

  function aplicarFilas(t, filas) {
    data[t] = t === "usuarios" ? Object.fromEntries(filas.map((f) => [f.id, f.data])) : filas.map((f) => f.data);
    sincronizado[t] = new Map(filas.map((f) => [f.id, JSON.stringify(f.data)]));
    maxPos[t] = filas.reduce((m, f) => Math.max(m, Number(f.pos) || 0), 0);
  }

  function cambios(t) {
    const antes = sincronizado[t] || new Map();
    const ahora = registros(t, data);
    const upserts = [];
    const borrar = [];
    for (const [id, r] of ahora) {
      const json = JSON.stringify(r);
      if (antes.get(id) !== json) upserts.push({ id, json, nuevo: !antes.has(id), r });
    }
    for (const id of antes.keys()) if (!ahora.has(id)) borrar.push(id);
    return { upserts, borrar };
  }

  async function subir(t) {
    const { upserts, borrar } = cambios(t);
    const antes = sincronizado[t] || (sincronizado[t] = new Map());
    if (maxPos[t] == null) maxPos[t] = 0;
    // Los registros nuevos van al final; los existentes conservan su posición (no se reenvía pos).
    const nuevos = upserts.filter((u) => u.nuevo);
    const editados = upserts.filter((u) => !u.nuevo);
    const lotes = [
      ...trozos(nuevos).map((l) => [l, (u) => ({ id: u.id, pos: ++maxPos[t], data: u.r })]),
      ...trozos(editados).map((l) => [l, (u) => ({ id: u.id, data: u.r, updated_at: new Date().toISOString() })])
    ];
    for (const [lote, fila] of lotes) {
      await pedir(`${t}?on_conflict=id`, {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify(lote.map(fila))
      });
      for (const u of lote) antes.set(u.id, u.json);
    }
    for (const lote of trozos(borrar, 100)) {
      const lista = lote.map((id) => '"' + id.replace(/["\\]/g, "\\$&") + '"').join(",");
      await pedir(`${t}?id=in.(${encodeURIComponent(lista)})`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      for (const id of lote) antes.delete(id);
    }
  }

  function trozos(arr, n = 500) {
    const out = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  }

  function fallo(err) {
    // Evita repetir el aviso en cada guardado mientras no haya conexión.
    if (Date.now() - avisoError > 15000 && api.onError) api.onError("Sin conexión con la base de datos: los cambios se subirán al reconectar. (" + err.message + ")");
    avisoError = Date.now();
  }

  // Encola una tarea para que las escrituras y lecturas al servidor nunca se crucen.
  function enCola(tarea) {
    const p = cola.then(tarea);
    cola = p.catch(() => {});
    return p;
  }

  function sincronizar() {
    return enCola(async () => {
      for (const t of TABLAS) await subir(t);
    }).catch(fallo);
  }

  function save() {
    if (!data) load();
    saveLocal();
    if (remoto && api.conectado) return sincronizar();
    return Promise.resolve();
  }

  const api = {
    uid,
    get data() { return data || load(); },
    save,
    remoto,
    conectado: false,
    errorInicio: "",
    onError: null,

    // Carga inicial. Con Supabase descarga todo; si la base está vacía sube los datos que
    // ya existían en este navegador (o los iniciales), para no perder nada al conectarse.
    async init() {
      if (!remoto) { load(); return; }
      try {
        const filas = await Promise.all(TABLAS.map(bajarTabla));
        const vacia = filas.every((f) => f.length === 0);
        const local = vacia ? loadLocal() || empty() : null;
        data = normalize({});
        TABLAS.forEach((t, i) => aplicarFilas(t, filas[i]));
        api.conectado = true;
        if (vacia) {
          data = local;
          await save();
        } else saveLocal();
        window.addEventListener("online", sincronizar);
      } catch (err) {
        // Sin conexión al abrir: se trabaja con la copia de este navegador, que no se sube después.
        load();
        api.errorInicio = err.message;
      }
    },

    // Trae los cambios hechos desde otros dispositivos. Si hay cambios locales sin subir en una
    // tabla, esa tabla se deja como está (se actualizará en la siguiente recarga).
    refresh(conRegistros) {
      if (!remoto || !api.conectado) return Promise.resolve();
      const tablas = conRegistros ? TABLAS : VIVAS;
      return enCola(async () => {
        for (const t of TABLAS) await subir(t);
        const filas = await Promise.all(tablas.map(bajarTabla));
        tablas.forEach((t, i) => {
          const { upserts, borrar } = cambios(t);
          if (!upserts.length && !borrar.length) aplicarFilas(t, filas[i]);
        });
        saveLocal();
      }).catch(fallo);
    },

    // ----- Sesión -----
    get sessionUser() {
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
      const ocupados = api.data.prestamos.filter((p) => p.libroId === libro.id && (p.estado === "prestado" || p.estado === "solicitado")).length;
      return Math.max(0, (Number(libro.ejemplares) || 0) - ocupados);
    },

    // ----- Registro de actividad (para reportes) -----
    // Guarda nombre y carrera del momento, para que el reporte no cambie si luego se edita o elimina la cuenta.
    registrar(lista, user, extra) {
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
      data = { carreras: d.carreras, libros: d.libros, usuarios: d.usuarios || {}, prestamos: d.prestamos || [], accesos: d.accesos || [], consultas: d.consultas || [] };
      save();
    },

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
