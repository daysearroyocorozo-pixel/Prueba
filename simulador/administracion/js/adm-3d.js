/* =========================================================
   Oficina en 3D y Realidad Aumentada – Simulador de Gestión Pública
   - Ventanilla de atención con la fila de ciudadanos en tiempo real
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';
import { glyphSprite, makeHuman, updateHumans, createWalker } from '../../js/isty-3d.js';

const App = window.AdmApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const parts = {}; const sprites = { cola: [], actual: null, cerrado: null };
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();

function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return { c, ctx, tex }; }
// retrato / ícono ilustrado (kit compartido) con la misma API que el sprite de emoji anterior
function emoji(e, scale = 0.4, size = 128) { const sp = glyphSprite(e, scale, Math.max(160, size)); sp.userData.cur = e; return sp; }
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function wrap(ctx, t, w) { const out = []; let l = ''; for (const word of String(t).split(/\s+/)) { const n = l ? l + ' ' + word : word; if (ctx.measureText(n).width > w && l) { out.push(l); l = word; } else l = n; } if (l) out.push(l); return out; }
const matCache = new Map();
const mat = (c, r = 0.85) => { const k = c + '|' + r; if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial({ color: c, roughness: r })); return matCache.get(k); };
const P = (x, y) => [(x - 330) / 100, (y - 150) / 100]; // coordenadas de la escena 2D → 3D

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.01, 60);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8577, 2.4));
  const dl = new THREE.DirectionalLight(0xffffff, 1.4); dl.position.set(3, 6, 4); scene.add(dl);
  const dl2 = new THREE.DirectionalLight(0xfff7e6, 0.5); dl2.position.set(-4, 4, -2); scene.add(dl2);
  root = new THREE.Group(); scene.add(root);
  world = new THREE.Group(); root.add(world);
  reticle = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x14b8a6 }));
  reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);
  const h = canvasTex(1024, 1100); hudCtx = h.ctx; hudTex = h.tex;
  hud = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.46 * 1100 / 1024), new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, depthTest: false }));
  hud.renderOrder = 20; hud.visible = false; scene.add(hud);
  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    c.addEventListener('select', () => onSelect(c));
    c.addEventListener('connected', e => { if (e.data.targetRayMode === 'tracked-pointer') { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0x14b8a6 })); l.scale.z = 3; l.name = 'ray'; c.add(l); } });
    scene.add(c);
  }
  App.subscribe(() => { if (mode) sync(); });
  addEventListener('resize', resize);
  setupPointer(canvas);
  walker = createWalker({
    getCamera: () => camera, canvas, container: $('#view3d'), getWorld: () => parts.floor || world, eye: 1.6,
    targets: () => walkTargets, interact: walkInteract
  });
}

/* ================== oficina a escala real (metros) ================== */
const ROOM = { x0: -3.5, x1: 3.5, z0: -2.5, z1: 3.0, h: 2.8 };
const INST = { dark: '#1B4D22', green: '#2E8B2E', yellow: '#F2E21B' };
const DESK = { x: -1.6, z: -1.1 };                 // ventanilla
const SEAT_H = 0.47;                               // altura del asiento de las sillas
const COLA_POS = i => i < 5 ? [-1.6, 0.55 + i * 0.55] : [-0.75, 0.55 + (9 - i) * 0.55]; // fila en serpentín
let walker = null; const walkTargets = [];

function box(w, h, d, c, x, y, z, par = world) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c)); m.position.set(x, y, z); par.add(m); return m; }
function cyl(r, h, c, x, y, z, par = world, seg = 16) { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat(c, 0.5)); m.position.set(x, y, z); par.add(m); return m; }
function fitFont(ctx, t, maxW, size, weight = 'bold') { let s = size; do { ctx.font = `${weight} ${s}px Nunito, ${EMOJI_FONT}`; s -= 2; } while (ctx.measureText(t).width > maxW && s > 10); }
/* letrero plano con texto en lienzo */
function sign(w, h, paint, par = world) {
  const pw = 512, ph = Math.round(pw * h / w); const { ctx, tex } = canvasTex(pw, ph); paint(ctx, pw, ph); tex.needsUpdate = true;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); par.add(m); return m;
}
function textSign(w, h, lines, bg = INST.dark, fg = '#fff', bar = INST.yellow) {
  return sign(w, h, (ctx, W, H) => {
    ctx.fillStyle = bg; roundRect(ctx, 2, 2, W - 4, H - 4, Math.min(24, H * 0.18)); ctx.fill();
    if (bar) { ctx.fillStyle = bar; ctx.fillRect(W * 0.06, H - H * 0.14, W * 0.88, H * 0.05); }
    ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    lines.forEach((t, i) => { fitFont(ctx, t, W * 0.9, Math.round(H / (lines.length + 0.9) * (i ? 0.7 : 0.9))); ctx.fillText(t, W / 2, H * (i + 0.85) / (lines.length + 0.75)); });
  });
}

/* paredes: planos de una sola cara mirando hacia dentro (desde fuera la órbita ve la oficina) */
function wallTex(w, deco) {
  const W = 1024, k = W / w, H = Math.round(ROOM.h * k); const { ctx, tex } = canvasTex(W, H);
  const X = m => m * k, Y = m => H - m * k, R = (x, y, rw, rh, c) => { ctx.fillStyle = c; ctx.fillRect(X(x), Y(y + rh), rw * k, rh * k); };
  R(0, 0, w, ROOM.h, '#F5F2EA'); R(0, 0, w, 0.95, '#DCEBD8'); R(0, 0.95, w, 0.035, INST.green); R(0, 0, w, 0.1, INST.dark);
  deco && deco({ ctx, k, X, Y, R, w });
  tex.anisotropy = 4; return tex;
}
function windowDeco(g, x) {
  const { ctx, X, Y, R } = g; R(x - 0.06, 1.0, 1.32, 1.36, '#ffffff');
  const gr = ctx.createLinearGradient(0, Y(2.3), 0, Y(1.05)); gr.addColorStop(0, '#8fd0f4'); gr.addColorStop(1, '#e3f5ff'); ctx.fillStyle = gr; ctx.fillRect(X(x), Y(2.3), X(1.2), X(1.24));
  ctx.fillStyle = '#4f9d3a'; ctx.beginPath(); ctx.arc(X(x + 0.35), Y(1.05), X(0.3), Math.PI, 0); ctx.arc(X(x + 0.85), Y(1.05), X(0.25), Math.PI, 0); ctx.fill();
  R(x + 0.58, 1.05, 0.04, 1.24, '#ffffff'); R(x, 1.66, 1.2, 0.04, '#ffffff');
}
function posterDeco(g, x, y, w, h, title, color = INST.yellow) {
  const { ctx, X, Y, R } = g; R(x - 0.03, y - 0.03, w + 0.06, h + 0.06, INST.dark); R(x, y, w, h, color);
  ctx.fillStyle = INST.dark; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; fitFont(ctx, title, X(w) * 0.9, Math.round(X(h) * 0.16)); ctx.fillText(title, X(x + w / 2), Y(y + h * 0.82));
  ctx.fillStyle = 'rgba(27,77,34,.3)'; for (let i = 0; i < 4; i++) ctx.fillRect(X(x + w * 0.12), Y(y + h * (0.6 - i * 0.13)), X(w * (0.76 - i * 0.1)), Math.max(3, X(0.025)));
}
function buildWalls() {
  const W = ROOM.x1 - ROOM.x0, D = ROOM.z1 - ROOM.z0, cz = (ROOM.z0 + ROOM.z1) / 2;
  const mk = (w, deco, x, z, ry) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, ROOM.h), new THREE.MeshStandardMaterial({ map: wallTex(w, deco), roughness: 0.95 })); m.position.set(x, ROOM.h / 2, z); m.rotation.y = ry; m.name = 'wall'; world.add(m); };
  // fondo: detrás de la ventanilla (x de la pared = x mundial + 3,5)
  mk(W, g => { posterDeco(g, 4.9, 1.05, 0.9, 0.7, 'Requisitos de trámites', '#ffffff'); posterDeco(g, 6.0, 1.05, 0.7, 0.7, 'Tasas 2026', '#E8F5E4'); }, 0, ROOM.z0, 0);
  mk(D, g => { windowDeco(g, 0.9); windowDeco(g, 3.3); }, ROOM.x0, cz, Math.PI / 2);
  mk(D, g => { posterDeco(g, 1.2, 1.35, 0.8, 0.9, 'Carta de servicios'); posterDeco(g, 2.3, 1.35, 0.8, 0.9, 'Derechos ciudadanos', '#ffffff'); posterDeco(g, 3.4, 1.35, 0.8, 0.9, 'Rendición de cuentas', '#E8F5E4'); }, ROOM.x1, cz, -Math.PI / 2);
  mk(W, g => {
    const { ctx, X, Y, R } = g; R(4.6, 0.1, 1.1, 2.15, '#8a5a2b'); R(4.68, 0.1, 0.94, 2.05, '#a06b38'); ctx.fillStyle = INST.yellow; ctx.beginPath(); ctx.arc(X(5.5), Y(1.05), X(0.035), 0, 7); ctx.fill();
    R(4.6, 2.32, 1.1, 0.26, INST.green); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; fitFont(ctx, 'ENTRADA / SALIDA', X(1.0), 26); ctx.fillText('ENTRADA / SALIDA', X(5.15), Y(2.45));
    posterDeco(g, 1.4, 1.2, 1.3, 0.8, 'Horario: 08:00 – 16:30', '#ffffff');
  }, 0, ROOM.z1, Math.PI);
}
function floorTex(w, d) {
  const { ctx, tex } = canvasTex(256, 256); ctx.fillStyle = '#E6E1D5'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(120,110,90,${Math.random() * 0.08})`; ctx.fillRect(Math.random() * 256, Math.random() * 256, 3, 3); }
  ctx.strokeStyle = '#C9C1AF'; ctx.lineWidth = 4; ctx.strokeRect(0, 0, 256, 256);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(w / 0.6, d / 0.6); tex.anisotropy = 4; return tex;
}
function chair(x, z, ry, c = 0x2E8B2E) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry;
  box(0.46, 0.05, 0.44, c, 0, SEAT_H - 0.025, 0.02, g); box(0.46, 0.46, 0.05, c, 0, SEAT_H + 0.26, -0.21, g);
  [[-0.2, -0.17], [0.2, -0.17], [-0.2, 0.2], [0.2, 0.2]].forEach(([lx, lz]) => box(0.03, SEAT_H - 0.05, 0.03, 0x475569, lx, (SEAT_H - 0.05) / 2, lz, g));
  world.add(g); return g;
}
function plant(x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.4, 18), mat(0xb45309)); pot.position.y = 0.2; g.add(pot);
  [[0, 0.75, 0, 0.26], [0.14, 0.62, 0.06, 0.2], [-0.13, 0.66, -0.05, 0.2], [0.03, 0.95, -0.04, 0.18]].forEach(([px, py, pz, r]) => { const f = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), mat(0x2f7d32, 0.9)); f.position.set(px, py, pz); g.add(f); });
  world.add(g); return g;
}
function post(x, z) { cyl(0.025, 0.95, 0x9ca3af, x, 0.475, z); cyl(0.15, 0.03, 0x4b5563, x, 0.015, z, world, 20); }
function rope(x0, z0, x1, z1) { const l = Math.hypot(x1 - x0, z1 - z0); const r = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, l, 8), mat(0x1B4D22, 0.6)); r.position.set((x0 + x1) / 2, 0.88, (z0 + z1) / 2); r.rotation.set(Math.PI / 2, Math.atan2(x1 - x0, z1 - z0), 0, 'YXZ'); world.add(r); }
/* altura del asiento para una persona sentada (niños más bajos) */
function seatY(av) { const st = window.IstyUI?.personStyle?.(av); if (st && st.p.wheel) return 0; const child = st && (st.p.age === 'child' || st.p.age === 'baby'); return SEAT_H - 0.5 * (child ? 0.62 : 1); }
const faceDesk = (o, x, z) => { o.rotation.y = Math.atan2(DESK.x - x, (DESK.z + 0.5) - z); };

function build() {
  builtFor = 'adm';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.cola = []; walkTargets.length = 0;
  const W = ROOM.x1 - ROOM.x0, D = ROOM.z1 - ROOM.z0;
  const piso = new THREE.Mesh(new THREE.BoxGeometry(W, 0.04, D), new THREE.MeshStandardMaterial({ map: floorTex(W, D), roughness: 0.8 }));
  piso.position.set(0, -0.02, (ROOM.z0 + ROOM.z1) / 2); piso.name = 'floor'; world.add(piso); parts.floor = piso;
  buildWalls();
  // ventanilla: escritorio del servidor público + mostrador alto del lado ciudadano
  box(2.0, 0.04, 0.7, 0xf1f5f9, DESK.x, 0.76, DESK.z);
  box(0.05, 0.74, 0.66, 0x1B4D22, DESK.x - 0.98, 0.37, DESK.z); box(0.05, 0.74, 0.66, 0x1B4D22, DESK.x + 0.98, 0.37, DESK.z);
  box(2.1, 1.05, 0.06, 0x2E8B2E, DESK.x, 0.525, DESK.z + 0.38);
  box(2.1, 0.06, 0.03, 0xF2E21B, DESK.x, 0.62, DESK.z + 0.415);
  box(2.2, 0.04, 0.32, 0xf8fafc, DESK.x, 1.07, DESK.z + 0.38);
  const vidrio = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.55), new THREE.MeshStandardMaterial({ color: 0xd8f3ff, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }));
  vidrio.position.set(DESK.x, 1.38, DESK.z + 0.3); world.add(vidrio);
  box(2.1, 0.03, 0.03, 0x94a3b8, DESK.x, 1.66, DESK.z + 0.3); [-1.04, 1.04].forEach(dx => box(0.03, 0.58, 0.03, 0x94a3b8, DESK.x + dx, 1.38, DESK.z + 0.3));
  // computador y papeles (pantalla mirando al servidor)
  box(0.08, 0.16, 0.06, 0x334155, DESK.x - 0.35, 0.86, DESK.z - 0.05); box(0.52, 0.32, 0.03, 0x1f2937, DESK.x - 0.35, 1.08, DESK.z - 0.05);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.28), new THREE.MeshBasicMaterial({ color: 0x60a5fa })); scr.position.set(DESK.x - 0.35, 1.08, DESK.z - 0.067); scr.rotation.y = Math.PI; world.add(scr);
  box(0.42, 0.02, 0.14, 0x111827, DESK.x - 0.35, 0.79, DESK.z - 0.25); box(0.22, 0.03, 0.3, 0xffffff, DESK.x + 0.45, 0.795, DESK.z - 0.1);
  // servidor público sentado frente a la ventanilla
  const silla = chair(DESK.x, DESK.z - 0.65, 0, 0x1f2937);
  const yo = makeHuman('🧑🏽‍💼', { height: 1.7, sit: true }); yo.position.set(0, seatY('🧑🏽‍💼'), -0.08); silla.add(yo); parts.agente = yo;
  textSign(1.9, 0.36, ['VENTANILLA 1', 'Atención ciudadana']).position.set(DESK.x, 2.25, ROOM.z0 + 0.01);
  // archivo y mueble detrás del servidor
  box(0.5, 1.3, 0.45, 0x64748b, -3.1, 0.65, -2.2); [0.35, 0.75, 1.15].forEach(y => box(0.46, 0.02, 0.01, 0x334155, -3.1, y, -1.97));
  // fila con postes y cintas (serpentín)
  [[-2.0, 0.25], [-2.0, 2.95], [-1.18, 0.95], [-1.18, 2.95], [-0.35, 0.25], [-0.35, 2.95]].forEach(([x, z]) => post(x, z));
  rope(-2.0, 0.25, -2.0, 2.95); rope(-1.18, 0.95, -1.18, 2.95); rope(-0.35, 0.25, -0.35, 2.95);
  const linea = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.005, 0.08), mat(0xF2E21B)); linea.position.set(-1.6, 0.003, 0.25); world.add(linea);
  const espere = sign(0.8, 0.2, (ctx, w, h) => { ctx.fillStyle = INST.dark; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; fitFont(ctx, 'ESPERE AQUÍ SU TURNO', w * 0.95, h * 0.7); ctx.fillText('ESPERE AQUÍ SU TURNO', w / 2, h / 2); });
  espere.rotation.x = -Math.PI / 2; espere.position.set(-1.6, 0.006, 0.42);
  // sala de espera, dispensador de agua, plantas y cartel de prioridad
  for (let i = 0; i < 4; i++) chair(3.1, -0.8 + i * 0.55, -Math.PI / 2);
  box(0.32, 1.0, 0.32, 0xe2e8f0, 3.15, 0.5, -1.9); const bot = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.36, 16), new THREE.MeshStandardMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.7 })); bot.position.set(3.15, 1.18, -1.9); world.add(bot);
  plant(3.1, 1.7); plant(-3.1, 2.6, 0.9); plant(0.3, -2.15, 0.85);
  const prio = canvasTex(512, 160); prio.ctx.fillStyle = INST.yellow; roundRect(prio.ctx, 4, 4, 504, 152, 20); prio.ctx.fill(); prio.ctx.fillStyle = INST.dark; prio.ctx.font = `bold 44px Nunito, ${EMOJI_FONT}`; prio.ctx.textAlign = 'center'; prio.ctx.textBaseline = 'middle'; prio.ctx.fillText('⭐ ATENCIÓN', 256, 55); prio.ctx.fillText('PRIORITARIA', 256, 110); prio.tex.needsUpdate = true;
  const cartel = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.31), new THREE.MeshBasicMaterial({ map: prio.tex, transparent: true })); cartel.position.set(-0.3, 1.8, ROOM.z0 + 0.01); world.add(cartel);
  // ciudadano en la ventanilla y personas en la fila (personajes 3D de pie, mirando al mostrador)
  sprites.actual = makeHuman('🙂', { height: 1.68 }); sprites.actual.position.set(DESK.x, 0, DESK.z + 0.75); sprites.actual.rotation.y = Math.PI; sprites.actual.userData.cur = '🙂'; world.add(sprites.actual);
  walkTargets.push({ obj: sprites.actual, label: 'Hablar', kind: 'actual' });
  for (let i = 0; i < 10; i++) {
    const sp = makeHuman('🧍', { height: 1.66 + ((i * 37) % 9) / 100 }); sp.userData.cur = '🧍'; world.add(sp);
    const st = emoji('⭐', 0.18); world.add(st); sprites.cola.push({ sp, st });
    walkTargets.push({ obj: sp, label: 'Hablar', kind: 'cola', i });
  }
  sprites.cerrado = emoji('🔒', 0.4); sprites.cerrado.position.set(DESK.x, 1.42, DESK.z + 0.42); world.add(sprites.cerrado);
  // pantalla de turnos con la hora
  const lt = canvasTex(512, 128); parts.label = lt;
  box(1.5, 0.4, 0.05, 0x111827, 1.2, 2.1, ROOM.z0 + 0.03);
  const ls = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 0.36), new THREE.MeshBasicMaterial({ map: lt.tex, transparent: true })); ls.position.set(1.2, 2.1, ROOM.z0 + 0.06); world.add(ls);
  parts.labelKey = '';
}

function sync() {
  const e = App.escena(); if (!e) return;
  if (builtFor !== 'adm') build();
  const s = App.st || {};
  const a = sprites.actual; if (e.actual && a.userData.cur !== e.actual) { a.userData.draw(e.actual); a.userData.cur = e.actual; } a.visible = !!e.actual;
  walkTargets[0].label = s.actual ? 'Atender a ' + s.actual.c.nombre : 'Hablar';
  sprites.cola.forEach((q, i) => {
    const c = e.cola[i]; q.sp.visible = !!c; q.st.visible = !!(c && c.prio);
    if (!c) return;
    if (q.sp.userData.cur !== c.avatar) { q.sp.userData.draw(c.avatar); q.sp.userData.cur = c.avatar; }
    const [x, z] = COLA_POS(i); q.sp.position.set(x, 0, z); faceDesk(q.sp, x, z); q.st.position.set(x, 2.02, z);
    const nom = s.cola && s.cola[i] && s.cola[i].c.nombre;
    walkTargets[i + 1].label = nom ? (llamarBtn(nom) ? 'Llamar a ' + nom : 'Hablar con ' + nom) : 'Hablar';
    walkTargets[i + 1].nombre = nom;
  });
  sprites.cerrado.visible = !e.abierta;
  const key = e.hora + e.abierta;
  if (parts.labelKey !== key) {
    parts.labelKey = key; const { ctx, tex } = parts.label;
    ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = INST.dark; ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = INST.yellow; ctx.fillRect(0, 118, 512, 10);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 32px Nunito, sans-serif'; ctx.fillText('GAD Municipal de San Isidro', 256, 40);
    ctx.font = `bold 36px Nunito, ${EMOJI_FONT}`; ctx.fillText(`🕗 ${e.hora} · ${e.abierta ? 'Abierto' : 'Cerrado'}`, 256, 86); tex.needsUpdate = true;
  }
  drawHud();
}
/* botón «Llamar a …» del panel de diálogo (si existe) */
function llamarBtn(nombre) { return [...document.querySelectorAll('#dialog-choices .btn')].find(b => !b.disabled && b.textContent.includes('Llamar a ' + nombre)); }
/* E / «Interactuar» en el modo Recorrer */
function walkInteract(t) {
  const s = App.st; if (!s) return;
  if (t.kind === 'cola') {
    const b = t.nombre && llamarBtn(t.nombre);
    if (b) { b.click(); return; }
    const q = s.cola[t.i]; if (q) { t.obj.userData.talk(2); App.toast(`${q.c.avatar} ${q.c.nombre}: «Estoy esperando mi turno.»`); }
    return;
  }
  if (s.actual) {
    t.obj.userData.talk(3); App.toast(`${s.actual.c.avatar} ${s.actual.c.nombre}: «${s.actual.c.dice}»`, 4500);
    const b = document.querySelector('#dialog-choices .btn:not([disabled])'); if (b) { b.scrollIntoView({ block: 'nearest' }); }
  }
}

function drawHud() {
  const show = mode === 'xr' && !domOverlay && placed; hud.visible = show; if (!show) return;
  const d = App.getHud(); const btns = d.buttons.slice(0, 9);
  const key = d.text + btns.map(b => b.label + b.disabled).join('|') + d.busy + scaleMode; if (key === hudKey) return; hudKey = key;
  const ctx = hudCtx, W = 1024, H = 1100; ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(10,40,38,.92)'; roundRect(ctx, 0, 0, W, H, 36); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `30px Nunito, ${EMOJI_FONT}`; ctx.textBaseline = 'top';
  const lines = wrap(ctx, d.text, W - 64).slice(0, 6); lines.forEach((l, i) => ctx.fillText(l, 32, 28 + i * 38));
  hudRects = []; let y = 28 + lines.length * 38 + 16; ctx.font = `bold 28px Nunito, ${EMOJI_FONT}`;
  btns.forEach(b => { const r = { x: 28, y, w: W - 56, h: 70, el: b.el, disabled: b.disabled }; ctx.fillStyle = b.disabled ? 'rgba(255,255,255,.12)' : '#fff'; roundRect(ctx, r.x, r.y, r.w, r.h, 16); ctx.fill(); ctx.fillStyle = b.disabled ? '#999' : '#1c2738'; ctx.textBaseline = 'middle'; ctx.fillText(b.label.length > 58 ? b.label.slice(0, 56) + '…' : b.label, r.x + 18, r.y + r.h / 2); ctx.textBaseline = 'top'; hudRects.push(r); y += 80; });
  const bottom = [{ label: scaleMode === 'table' ? '↕ Tamaño real' : '↕ Miniatura', fn: toggleScale }, { label: '✕ Salir', fn: stopAll }];
  bottom.forEach((b, i) => { const r = { x: 28 + i * 490, y: H - 96, w: 478, h: 72, fn: b.fn }; ctx.fillStyle = i ? '#dc2626' : '#2563eb'; roundRect(ctx, r.x, r.y, r.w, r.h, 16); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(b.label, r.x + r.w / 2, r.y + 36); ctx.textAlign = 'left'; ctx.textBaseline = 'top'; hudRects.push(r); });
  hudTex.needsUpdate = true;
}

function onSelect(c) {
  if (!placed) return place();
  tmpM.identity().extractRotation(c.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(c.matrixWorld); raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tmpM);
  if (!hud.visible) return;
  const hit = raycaster.intersectObject(hud, false)[0]; if (!hit) return;
  const px = hit.uv.x * 1024, py = (1 - hit.uv.y) * 1100;
  const r = hudRects.find(r => px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h);
  if (r) { if (r.fn) r.fn(); else if (!r.disabled) r.el.click(); }
}

const _v = new THREE.Vector3(), _f = new THREE.Vector3(), _r = new THREE.Vector3(), _t = new THREE.Vector3();
function place() {
  const cam = renderer.xr.getCamera(); cam.getWorldPosition(_v); cam.getWorldDirection(_f); _f.y = 0; _f.normalize();
  if (reticle.visible) root.position.setFromMatrixPosition(reticle.matrix); else root.position.copy(_v).addScaledVector(_f, scaleMode === 'table' ? 0.7 : 3).setY(_v.y - (scaleMode === 'table' ? 0.45 : 1.6));
  root.rotation.set(0, Math.atan2(_v.x - root.position.x, _v.z - root.position.z), 0);
  world.scale.setScalar(scaleMode === 'table' ? 0.12 : 1);
  root.visible = true; placed = true; reticle.visible = false; hudKey = '';
  hud.position.copy(_v).addScaledVector(_f, 0.75);
  $('#xr-status').textContent = 'Oficina colocada. Usa el panel para atender a la ciudadanía.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; hud.visible = false; $('#xr-status').textContent = 'Toca para colocar de nuevo la escena.'; }
  App.toast(scaleMode === 'table' ? 'Oficina en miniatura' : 'Oficina a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

const orbit = { theta: 0.55, phi: 0.98, r: 8.6, target: new THREE.Vector3(-0.2, 0.7, 0.2) };
function updateOrbit() { const o = orbit; camera.position.set(o.target.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), o.target.y + o.r * Math.cos(o.phi), o.target.z + o.r * Math.sin(o.phi) * Math.cos(o.theta)); camera.lookAt(o.target); }
function setupPointer(cv) {
  const pts = new Map(); let pinch = null;
  cv.addEventListener('pointerdown', e => { try { cv.setPointerCapture(e.pointerId); } catch (_) { /* toque simulado */ } pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
  cv.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return; const p = pts.get(e.pointerId); const dx = e.clientX - p.x, dy = e.clientY - p.y; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { orbit.theta -= dx * 0.008; orbit.phi = Math.min(1.45, Math.max(0.2, orbit.phi - dy * 0.006)); }
    else if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) orbit.r = Math.min(14, Math.max(2, orbit.r * pinch / d)); pinch = d; }
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); orbit.r = Math.min(14, Math.max(2, orbit.r * (1 + e.deltaY * 0.001))); }, { passive: false });
}
function resize() { if (!renderer || mode !== 'inline') return; const c = renderer.domElement; const w = c.clientWidth || 1, h = c.clientHeight || 1; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }

function animate(t, frame) {
  const dt = clock.getDelta(), time = clock.elapsedTime;
  if (sprites.actual && sprites.actual.visible && document.body.classList.contains('isty-talking')) sprites.actual.userData.talk(0.3);
  if (sprites.cerrado) sprites.cerrado.position.y = 1.42 + Math.sin(time * 3) * 0.02;
  updateHumans(world, dt);
  if (mode === 'inline') { if (walker && walker.active) walker.update(dt); else updateOrbit(); }
  if (mode === 'xr' && frame) {
    if (!placed && hitSource) { const res = frame.getHitTestResults(hitSource); if (res.length) { reticle.visible = true; reticle.matrix.fromArray(res[0].getPose(renderer.xr.getReferenceSpace()).transform.matrix); } else reticle.visible = false; }
    if (hud.visible) { const cam = renderer.xr.getCamera(); cam.getWorldPosition(_v); cam.getWorldDirection(_f); _f.y = 0; _f.normalize(); _r.crossVectors(_f, new THREE.Vector3(0, 1, 0)).normalize(); _t.copy(_v).addScaledVector(_f, 0.75).addScaledVector(_r, 0.32); _t.y = _v.y - 0.22; hud.position.lerp(_t, Math.min(1, dt * 3)); hud.lookAt(_v.x, hud.position.y + 0.05, _v.z); }
  }
  renderer.render(scene, camera);
}

/* mover la interfaz al HUD en celulares */
const moved = [];
function toOverlay() { ['#dialog', '#free-actions'].forEach(s => { const el = $(s); moved.push({ el, parent: el.parentNode, next: el.nextSibling }); $('#xr-bottom').appendChild(el); }); $('#xr-overlay').hidden = false; }
function restoreUi() { while (moved.length) { const m = moved.pop(); m.parent.insertBefore(m.el, m.next); } $('#xr-overlay').hidden = true; }
$('#xr-overlay').addEventListener('beforexrselect', e => { if (e.target !== e.currentTarget) e.preventDefault(); });
$('#xr-exit').onclick = () => stopAll();

function startInline() {
  init(); build(); mode = 'inline';
  $('#view3d').hidden = false; $('#scene').style.display = 'none'; $('#btn-3d').textContent = '🧩 2D';
  root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true;
  scene.background = new THREE.Color(0xe0f2fe);
  resize(); sync(); renderer.setAnimationLoop(animate);
}
function stopInline() { if (walker) walker.disable(); renderer?.setAnimationLoop(null); $('#view3d').hidden = true; $('#scene').style.display = ''; $('#btn-3d').textContent = '🧊 3D'; mode = null; }

async function startXR(type) {
  init(); build(); if (mode === 'inline') stopInline();
  try { xrSession = await navigator.xr.requestSession(type, { optionalFeatures: ['local-floor', 'hit-test', 'dom-overlay'], domOverlay: { root: $('#xr-overlay') } }); }
  catch (e) { App.toast('No se pudo iniciar la realidad aumentada: ' + e.message, 4000); return; }
  let ref = 'local'; try { await xrSession.requestReferenceSpace('local-floor'); ref = 'local-floor'; } catch (e) { /* local */ }
  renderer.xr.setReferenceSpaceType(ref); await renderer.xr.setSession(xrSession);
  mode = 'xr'; placed = false; hudKey = ''; domOverlay = !!xrSession.domOverlayState; scaleMode = domOverlay ? 'table' : 'real';
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xe0f2fe) : null; root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { vr.exit(); if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

/* gafas sencillas tipo VR Box (cardboard) */
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(10,40,38,.94)', view: { pos: [1.4, 1.6, 2.4], target: [-1.6, 1.0, -1.0] },
  prepare: () => { if (mode === 'inline') stopInline(); init(); build(); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; scene.background = new THREE.Color(0xe0f2fe); }
});
$('#btn-vr').onclick = () => { if (mode !== 'xr') vr.enter(); };
$('#btn-3d').onclick = () => { if (mode === 'inline') stopInline(); else if (!mode) startInline(); };
$('#btn-ar').onclick = async () => {
  if (mode === 'xr') return stopAll();
  let ar = false, vr = false;
  if (navigator.xr && isSecureContext) { try { ar = await navigator.xr.isSessionSupported('immersive-ar'); } catch (e) { } if (!ar) try { vr = await navigator.xr.isSessionSupported('immersive-vr'); } catch (e) { } }
  if (ar) return startXR('immersive-ar');
  if (vr) return startXR('immersive-vr');
  App.toast(isSecureContext ? 'Este dispositivo no admite RA. Se abre la vista 3D.' : 'La RA requiere HTTPS. Se abre la vista 3D.', 3500);
  if (!mode) startInline();
};
window.Adm3D = { stopAll };
