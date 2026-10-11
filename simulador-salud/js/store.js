/* Martin´s Capacitaciones · Almacenamiento de usuarios y progreso.
   Dos modos con la misma interfaz:
   - "db":    base de datos compartida de la página publicada en claude.ai
              (los usuarios pueden iniciar sesión desde cualquier dispositivo).
   - "local": localStorage del navegador (GitHub Pages / servidor local);
              los datos quedan en ese dispositivo y se pueden exportar/importar.
   Las contraseñas nunca se guardan en texto plano: PBKDF2-SHA256 con sal. */

const Store = (function () {
  "use strict";

  const LOCAL_KEY = "martins_salud_db_v1";
  let mode = "local";
  let db = null;
  let userCap = null;

  // ----- Modo local -----
  function readLocal() {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      const d = raw ? JSON.parse(raw) : {};
      return { usuarios: d.usuarios || {}, progreso: d.progreso || {} };
    } catch (e) {
      return { usuarios: {}, progreso: {} };
    }
  }
  function writeLocal(d) {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(d)); } catch (e) { /* sin almacenamiento */ }
  }

  // ----- Modo db (con un reintento ante "unavailable") -----
  async function retry(fn) {
    try { return await fn(); } catch (e) {
      if (e && e.code === "unavailable") {
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
        return fn();
      }
      throw e;
    }
  }

  async function init() {
    if (window.claude && typeof window.claude.use === "function") {
      try {
        const d = await window.claude.use("db");
        if (d) {
          db = d;
          mode = "db";
          userCap = await window.claude.use("user");
        }
      } catch (e) { /* se queda en modo local */ }
    }
    return mode;
  }

  // Escritura secuencial por documento para no solapar escrituras.
  const queues = {};
  function enqueue(key, fn) {
    const prev = queues[key] || Promise.resolve();
    const next = prev.catch(() => {}).then(fn);
    queues[key] = next;
    return next;
  }

  const api = {
    init,
    get mode() { return mode; },

    validUsername(u) { return /^[a-z0-9][a-z0-9._-]{2,39}$/.test(u); },

    async canManage() {
      if (mode === "local") return true;
      if (!userCap) return true; // la plataforma no dijo nada: la escritura decidirá
      return userCap.canEdit();
    },

    async listUsers() {
      if (mode === "local") return Object.values(readLocal().usuarios);
      const snap = await retry(() => db.collection("usuarios").limit(1000).get());
      return snap.docs.map((d) => d.data());
    },

    async getUser(u) {
      if (mode === "local") return readLocal().usuarios[u] || null;
      const s = await retry(() => db.doc(`usuarios/${u}`).get());
      return s.exists ? s.data() : null;
    },

    async saveUser(obj) {
      if (mode === "local") {
        const d = readLocal();
        d.usuarios[obj.usuario] = obj;
        writeLocal(d);
        return;
      }
      await enqueue(`u:${obj.usuario}`, () => retry(() => db.doc(`usuarios/${obj.usuario}`).set(JSON.parse(JSON.stringify(obj)))));
    },

    async deleteUser(u) {
      if (mode === "local") {
        const d = readLocal();
        delete d.usuarios[u];
        delete d.progreso[u];
        writeLocal(d);
        return;
      }
      await enqueue(`u:${u}`, () => retry(() => db.doc(`usuarios/${u}`).delete()));
      await enqueue(`p:${u}`, () => retry(() => db.doc(`progreso/${u}`).delete()));
    },

    async getProgress(u) {
      if (mode === "local") return readLocal().progreso[u] || null;
      const s = await retry(() => db.doc(`progreso/${u}`).get());
      return s.exists ? s.data() : null;
    },

    async saveProgress(u, progreso) {
      const body = { usuario: u, progreso: JSON.parse(JSON.stringify(progreso)), actualizado: new Date().toISOString() };
      if (mode === "local") {
        const d = readLocal();
        d.progreso[u] = body;
        writeLocal(d);
        return;
      }
      await enqueue(`p:${u}`, () => retry(() => db.doc(`progreso/${u}`).set(body)));
    },

    async listProgress() {
      if (mode === "local") return Object.values(readLocal().progreso);
      const snap = await retry(() => db.collection("progreso").limit(1000).get());
      return snap.docs.map((d) => d.data());
    },

    // Exportar / importar (útil en modo local para pasar usuarios a otro equipo)
    async exportAll() {
      const usuarios = await api.listUsers();
      const progreso = await api.listProgress();
      return JSON.stringify({ app: "martins-salud", version: 1, usuarios, progreso });
    },
    async importAll(text) {
      const d = JSON.parse(text);
      if (d.app !== "martins-salud" || !Array.isArray(d.usuarios)) throw new Error("El archivo no es una copia de Martin´s Capacitaciones.");
      let n = 0;
      for (const u of d.usuarios) {
        if (!u || !api.validUsername(u.usuario) || !u.hash || !u.salt) continue;
        await api.saveUser(u);
        n++;
      }
      for (const p of d.progreso || []) {
        if (p && api.validUsername(p.usuario) && p.progreso) await api.saveProgress(p.usuario, p.progreso);
      }
      return n;
    },

    // ----- Contraseñas -----
    async hashPassword(password, saltB64) {
      if (!window.crypto || !crypto.subtle) throw new Error("Este navegador no permite cifrar contraseñas. Abre el simulador desde una dirección https.");
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
