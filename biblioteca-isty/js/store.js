/* Biblioteca ISTY · Almacenamiento.
   Guarda carreras, libros, usuarios y préstamos en el localStorage del navegador.
   Las contraseñas nunca se guardan en texto plano: PBKDF2-SHA256 con sal. */

const Store = (function () {
  "use strict";

  const KEY = "isty_biblioteca_v1";
  const SESSION_KEY = "isty_biblioteca_sesion";
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

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      data = raw ? JSON.parse(raw) : empty();
    } catch (e) {
      data = empty();
    }
    for (const k of ["carreras", "libros", "prestamos", "accesos", "consultas"]) if (!Array.isArray(data[k])) data[k] = [];
    if (!data.usuarios || typeof data.usuarios !== "object") data.usuarios = {};
    return data;
  }

  function save() {
    if (!data) load();
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* sin almacenamiento */ }
  }

  const api = {
    uid,
    get data() { return data || load(); },
    save,

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
