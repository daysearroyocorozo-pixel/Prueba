/* =========================================================
   Acceso y registro del Laboratorio Virtual ISTY.
   Lo cargan el portal y los cuatro simuladores (después de
   isty-config.js). Funciones en window.ISTY:
     sesion()            datos del usuario que inició sesión
     login(u, c)         inicia sesión (servidor o demostración)
     logout()            cierra la sesión
     registrar(t, d)     anota un evento: ingreso, abrir_simulador, resultado…
     registros()         lista de eventos (solo administrador)
   Si la página no tiene sesión, redirige a portal/acceso.html.
   ========================================================= */
(function () {
  'use strict';
  const CFG = window.ISTY_CONFIG || { API_URL: '' };
  const API = (CFG.API_URL || '').replace(/\/+$/, '');
  const DEMO = !API;
  const K_SES = 'isty-sesion', K_REG = 'isty-registros', DURACION = 12 * 3600 * 1000;
  const CARRERAS = { 'educacion-basica': 'Educación Básica', incendios: 'Control de Incendios y Operaciones de Rescate', construccion: 'Construcción', administracion: 'Administración en Instituciones Públicas' };

  // raíz del sitio (la carpeta que contiene portal/ y simulador/), deducida de este archivo
  const src = (document.currentScript && document.currentScript.src) || '';
  const RAIZ = src.replace(/simulador\/js\/isty-auth\.js.*$/, '');
  const ACCESO = RAIZ + 'portal/acceso.html';

  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* sin almacenamiento */ } }
  };

  function sesion() {
    const s = ls.get(K_SES, null);
    if (!s || Date.now() - s.inicio > DURACION) return null;
    return s;
  }
  // simulador en el que está la página (según la carpeta)
  function simuladorActual() {
    const p = location.pathname;
    if (!/\/simulador\//.test(p)) return '';
    for (const k of ['incendios', 'construccion', 'administracion']) if (p.includes('/simulador/' + k + '/')) return k;
    return 'educacion-basica';
  }

  async function api(ruta, opciones = {}) {
    const s = sesion();
    const r = await fetch(API + ruta, {
      ...opciones,
      headers: { 'Content-Type': 'application/json', ...(s && s.token ? { Authorization: 'Bearer ' + s.token } : {}), ...(opciones.headers || {}) }
    });
    if (!r.ok) { const e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
    return r.status === 204 ? null : r.json();
  }

  const K_USR = 'isty-usuarios-demo';
  const usuariosDemo = () => (window.ISTY_USUARIOS_DEMO || []).concat(ls.get(K_USR, []));

  async function login(usuario, contrasena) {
    usuario = String(usuario || '').trim().toLowerCase();
    let u;
    if (DEMO) {
      const lista = usuariosDemo();
      u = lista.find(x => x.usuario.toLowerCase() === usuario && x.contrasena === contrasena);
      if (!u) throw new Error('credenciales');
      u = { usuario: u.usuario, nombre: u.nombre, carrera: u.carrera, rol: u.rol, token: 'demo' };
    } else {
      try { u = await api('/login', { method: 'POST', body: JSON.stringify({ usuario, contrasena }) }); }
      catch (e) { throw new Error(e.status === 401 || e.status === 403 ? 'credenciales' : 'servidor'); }
    }
    ls.set(K_SES, { ...u, inicio: Date.now() });
    registrar('ingreso', {});
    return sesion();
  }

  function logout() {
    const s = sesion();
    if (s) registrar('salida', {});
    if (!DEMO && s) api('/logout', { method: 'POST', keepalive: true }).catch(() => {});
    ls.del(K_SES);
    location.href = ACCESO;
  }

  function registrar(tipo, datos) {
    const s = sesion(); if (!s) return;
    const ev = { fecha: new Date().toISOString(), tipo, usuario: s.usuario, nombre: s.nombre, carrera: s.carrera || '', simulador: simuladorActual(), ...datos };
    if (DEMO) { const r = ls.get(K_REG, []); r.unshift(ev); ls.set(K_REG, r.slice(0, 3000)); }
    else api('/registros', { method: 'POST', body: JSON.stringify(ev), keepalive: true }).catch(() => {});
  }

  async function registros() {
    if (DEMO) return ls.get(K_REG, []);
    return api('/registros');
  }
  function borrarRegistrosDemo() { if (DEMO) ls.set(K_REG, []); }

  /* ---------- usuarios (solo administrador) ---------- */
  async function usuarios() {
    if (DEMO) return usuariosDemo().map(({ contrasena, ...u }) => ({ ...u, fijo: (window.ISTY_USUARIOS_DEMO || []).some(x => x.usuario === u.usuario) }));
    return api('/usuarios');
  }
  async function crearUsuario(u) {
    u = { ...u, usuario: String(u.usuario || '').trim().toLowerCase() };
    if (!u.usuario || !u.contrasena || !u.nombre) throw new Error('Completa usuario, nombre y contraseña.');
    if (u.rol !== 'admin' && !CARRERAS[u.carrera]) throw new Error('Elige la carrera del estudiante.');
    if (DEMO) {
      if (usuariosDemo().some(x => x.usuario.toLowerCase() === u.usuario)) throw new Error('Ese usuario ya existe.');
      const extra = ls.get(K_USR, []); extra.push(u); ls.set(K_USR, extra); return;
    }
    await api('/usuarios', { method: 'POST', body: JSON.stringify(u) });
  }
  async function eliminarUsuario(usuario) {
    if (DEMO) { ls.set(K_USR, ls.get(K_USR, []).filter(x => x.usuario !== usuario)); return; }
    await api('/usuarios/' + encodeURIComponent(usuario), { method: 'DELETE' });
  }
  // ¿puede este usuario usar el simulador de esa carrera?
  const permitido = (s, carrera) => !!s && (s.rol === 'admin' || s.carrera === carrera);

  window.ISTY = { sesion, login, logout, registrar, registros, borrarRegistrosDemo, usuarios, crearUsuario, eliminarUsuario, permitido, DEMO, CARRERAS, ACCESO, RAIZ, nombreCarrera: id => CARRERAS[id] || 'Sin carrera' };

  /* ---------- protección de las páginas ---------- */
  const publica = document.documentElement.hasAttribute('data-isty-publica');
  if (!publica && !sesion()) { location.replace(ACCESO + '?volver=' + encodeURIComponent(location.href)); return; }

  /* ---------- en los simuladores: usar los datos del usuario ---------- */
  if (simuladorActual() && !permitido(sesion(), simuladorActual())) {
    location.replace(RAIZ + 'portal/index.html?sinpermiso=' + simuladorActual()); return;
  }
  if (simuladorActual()) {
    const m = new URLSearchParams(location.search).get('m');
    registrar('abrir_simulador', m ? { modulo: m } : {});
    document.addEventListener('DOMContentLoaded', () => {
      const s = sesion(); if (!s) return;
      const nombre = document.getElementById('f-name');
      if (nombre) { nombre.value = s.nombre; nombre.readOnly = true; nombre.title = 'Nombre de tu cuenta del laboratorio'; }
      const inst = document.getElementById('f-inst');
      if (inst && !inst.value) inst.value = CFG.INSTITUCION || '';
      const barra = document.querySelector('.topbar-actions');
      if (barra) {
        const chip = document.createElement('span');
        chip.className = 'isty-user';
        chip.innerHTML = '👤 <b></b> <button type="button" class="btn btn-sm">Salir</button>';
        chip.querySelector('b').textContent = s.nombre.split(' ')[0];
        chip.title = s.nombre + ' · ' + (CARRERAS[s.carrera] || '');
        chip.setAttribute('style', 'display:flex;align-items:center;gap:6px;color:#fff;font-size:.85rem');
        chip.querySelector('button').onclick = logout;
        barra.prepend(chip);
      }
    });
  }
})();
