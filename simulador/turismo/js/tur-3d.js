/* =========================================================
   Sendero amazónico en 3D y Realidad Aumentada – Simulador de
   Operaciones Turísticas
   - Sendero a escala real (metros) con selva, río, comunidad kichwa
     (cocina comunitaria), cascada, la furgoneta de la operadora y el
     guía con el grupo de turistas (personajes 3D) que avanza según la
     fase del tour
   - Modo «Recorrer» en primera persona (kit isty-3d)
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';
import { glyphSprite, makeHuman, updateHumans, createWalker, isPerson } from '../../js/isty-3d.js';

const App = window.TurApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const C = { verde: '#1B4D22', verde2: '#2E8B2E', amarillo: '#F2E21B' };
const SKY = 0xcfe6ee, SKY_RAIN = 0x9aa6b2;

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null, walker = null, narrKey = '';
const parts = {}; const sprites = { grupo: [], guia: null, lluvia: null };
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();

function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return { c, ctx, tex }; }
/* ícono ilustrado (Lucide) o retrato en un sprite: misma API que el antiguo emoji() */
function emoji(e, scale = 0.4, size = 160) { const sp = glyphSprite(e, scale, size); sp.userData.cur = e; return sp; }
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function wrap(ctx, t, w) { const out = []; let l = ''; for (const word of String(t).split(/\s+/)) { const n = l ? l + ' ' + word : word; if (ctx.measureText(n).width > w && l) { out.push(l); l = word; } else l = n; } if (l) out.push(l); return out; }
const matCache = new Map();
const mat = (c, rough = 0.85, flat = false) => { const k = c + '|' + rough + '|' + flat; if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial({ color: c, roughness: rough, flatShading: flat })); return matCache.get(k); };
function mesh(geo, m, x = 0, y = 0, z = 0, parent = world) { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); parent.add(o); return o; }

/* números pseudoaleatorios estables (la selva es siempre la misma) */
let seed = 7;
const rnd = () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const rr = (a, b) => a + rnd() * (b - a);

/* puntos del sendero por fase (x, z) en metros */
const RUTA = [[-8.4, 3.4], [-8.4, 3.4], [-5.6, 1.8], [-2.8, -0.8], [0.8, -2], [0.8, -2], [6, -2.2], [6, -2.2], [-7.6, 3.4]];
const OFF = i => [1.3 + (i % 5) * 0.75, 0.75 + Math.floor(i / 5) * 0.85]; // posición de cada turista respecto al guía
const RIO_Z = 7.3, RIO_W = 3;

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.05, 220);
  scene.add(new THREE.HemisphereLight(0xe8f6ff, 0x3f5f2a, 1.9));
  const dl = new THREE.DirectionalLight(0xfff2d6, 1.9); dl.position.set(8, 16, 6); scene.add(dl);
  root = new THREE.Group(); scene.add(root);
  world = new THREE.Group(); root.add(world);
  reticle = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x2E8B2E }));
  reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);
  const h = canvasTex(1024, 1100); hudCtx = h.ctx; hudTex = h.tex;
  hud = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.46 * 1100 / 1024), new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, depthTest: false }));
  hud.renderOrder = 20; hud.visible = false; scene.add(hud);
  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    c.addEventListener('select', () => onSelect(c));
    c.addEventListener('connected', e => { if (e.data.targetRayMode === 'tracked-pointer') { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0x2E8B2E })); l.scale.z = 3; l.name = 'ray'; c.add(l); } });
    scene.add(c);
  }
  App.subscribe(() => { if (mode) sync(); });
  addEventListener('resize', resize);
  setupPointer(canvas);
  walker = createWalker({
    getCamera: () => camera, canvas, container: $('#view3d'), getWorld: () => parts.walk || world, eye: 1.6, speed: 2.4,
    targets: walkTargets, interact: t => t.fn && t.fn()
  });
}

/* ================== objetos con los que se interactúa al recorrer ================== */
function walkTargets() {
  if (!sprites.guia) return [];
  const e = App.escena() || { grupo: [] };
  const t = [{ obj: sprites.guia, label: 'Hablar con el guía', fn: hablarGuia }];
  if (sprites.grupo.some(h => h.visible)) t.push({ obj: parts.grupoCentro, label: 'Revisar al grupo', fn: () => revisarGrupo(e) });
  t.push({ obj: parts.salvavidas, label: 'Ver salvavidas', fn: () => info('🛟 Salvavidas y chalecos listos: el cruce del río y el tubing solo con equipo de seguridad y guía de río.') });
  t.push({ obj: parts.olla, label: 'Ver la cocina comunitaria', fn: () => info('🍲 Cocina comunitaria kichwa: confirma los ingredientes; Ana Lucía es alérgica al maní y frutos secos.') });
  t.push({ obj: parts.bus, label: 'Revisar el transporte', fn: () => info('🚐 Transporte turístico autorizado: cinturones, botiquín y lista de pasajeros antes de salir.') });
  t.push({ obj: parts.mono, label: 'Observar a los monos', fn: () => info('🐒 Fauna rescatada: mantén la distancia y no alimentes a los monos.') });
  t.push({ obj: parts.loro, label: 'Observar al loro', fn: () => info('🦜 Loro amazónico del centro de rescate: no se toca ni se le ofrece comida.') });
  t.push({ obj: parts.letrero, label: 'Leer el letrero', fn: () => info('🚩 Sendero amazónico de Puyo: no salgas del sendero, lleva tus residuos y sigue las indicaciones del guía.') });
  return t;
}
function info(m) { App.toast(m, 4200); }
function hablarGuia() {
  const d = App.getHud(), e = App.escena();
  sprites.guia.userData.talk(3); sprites.guia.userData.setState('wave'); setTimeout(() => sprites.guia && sprites.guia.userData.setState('idle'), 1600);
  const txt = (d.text || '').replace(/\s+/g, ' ');
  info(`🧑🏽‍🦱 Guía${e ? ' · ' + e.fase + ' (' + e.hora + ')' : ''}: ${txt.length > 160 ? txt.slice(0, 158) + '…' : txt || 'Sigamos por el sendero.'}${d.buttons.some(b => !b.disabled) ? ' · Elige qué hacer en el panel.' : ''}`);
}
function revisarGrupo(e) {
  const n = (e.grupo || []).length, her = (e.grupo || []).filter(c => !isPerson(c.avatar)).length;
  sprites.grupo.forEach((h, i) => { if (!h.visible || h.userData.walking || i % 2) return; h.userData.setState('wave'); setTimeout(() => !h.userData.walking && h.userData.setState('idle'), 1500); });
  info(`👥 Grupo: ${n} turistas${her ? `, ${her} atendido${her > 1 ? 's' : ''} por lesión` : ', todos bien'}. Recuerda el ritmo de Don Hernán y la alergia de Ana Lucía.`);
}

/* ================== vegetación low-poly ================== */
const GEO = {
  trunk: new THREE.CylinderGeometry(0.16, 0.28, 1, 7),
  crown: new THREE.IcosahedronGeometry(1, 0),
  crown1: new THREE.IcosahedronGeometry(1, 1),
  palmSeg: new THREE.CylinderGeometry(0.11, 0.14, 1, 6),
  frond: (() => { const g = new THREE.ConeGeometry(0.42, 2.6, 4, 1); g.rotateX(Math.PI / 2); g.translate(0, 0, 1.3); g.scale(1, 0.18, 1); return g; })(),
  shadow: new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2),
  stone: new THREE.DodecahedronGeometry(1, 0)
};
const SHADOW_MAT = new THREE.MeshBasicMaterial({ color: 0x0b1f0b, transparent: true, opacity: 0.22, depthWrite: false });
const GREENS = [0x1f6b2a, 0x2a7d32, 0x17592a, 0x3a8a2e, 0x245f1f, 0x4a9a35];
function sombra(x, z, r, p = world) { const s = mesh(GEO.shadow, SHADOW_MAT, x, 0.015, z, p); s.scale.setScalar(r); return s; }
function arbol(x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rnd() * 6.28; world.add(g);
  const h = rr(3.2, 5.2) * s;
  const tr = mesh(GEO.trunk, mat(0x6b4423, 0.95, true), 0, h / 2, 0, g); tr.scale.set(s, h, s);
  const n = 3 + Math.floor(rnd() * 2);
  for (let i = 0; i < n; i++) {
    const r = rr(1.1, 1.7) * s, a = i / n * 6.28 + rnd();
    const c = mesh(i % 2 ? GEO.crown : GEO.crown1, mat(GREENS[Math.floor(rnd() * GREENS.length)], 0.9, true), Math.cos(a) * 0.8 * s, h + rr(-0.3, 0.7) * s, Math.sin(a) * 0.8 * s, g);
    c.scale.set(r, r * 0.8, r);
  }
  sombra(0, 0, 2 * s, g);
  return g;
}
function emergente(x, z, s = 1) { // árbol alto de copa plana (tipo ceibo)
  const g = new THREE.Group(); g.position.set(x, 0, z); world.add(g);
  const h = rr(7, 9) * s;
  const tr = mesh(GEO.trunk, mat(0x8b6f4e, 0.95, true), 0, h / 2, 0, g); tr.scale.set(1.5 * s, h, 1.5 * s);
  for (let i = 0; i < 4; i++) { const a = i * 1.57 + rnd(); const c = mesh(GEO.crown, mat(GREENS[i % 3], 0.9, true), Math.cos(a) * 1.6 * s, h + rr(-0.2, 0.4), Math.sin(a) * 1.6 * s, g); c.scale.set(2.2 * s, 0.9 * s, 2.2 * s); }
  sombra(0, 0, 3.2 * s, g);
  return g;
}
function palmera(x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rnd() * 6.28; world.add(g);
  const segs = 6, h = rr(4, 6) * s, lean = rr(0.04, 0.12);
  let px = 0, py = 0;
  for (let i = 0; i < segs; i++) { const sg = mesh(GEO.palmSeg, mat(i % 2 ? 0x7a5a3a : 0x6a4c30, 0.95, true), px, py + h / segs / 2, 0, g); sg.scale.set(s, h / segs * 1.05, s); sg.rotation.z = -lean * i * 0.5; px += Math.sin(lean * i * 0.5) * h / segs; py += h / segs; }
  const top = new THREE.Group(); top.position.set(px, py, 0); g.add(top);
  for (let i = 0; i < 8; i++) { const f = mesh(GEO.frond, mat(i % 2 ? 0x2f8a2f : 0x237a28, 0.85, true), 0, 0, 0, top); f.rotation.set(rr(0.35, 0.75), i / 8 * 6.28, 0, 'YXZ'); f.scale.setScalar(s); }
  sombra(px, 0, 1.6 * s, g);
  return g;
}
function arbusto(x, z, s = 1) {
  for (let i = 0; i < 3; i++) { const c = mesh(GEO.crown, mat(GREENS[(i + 2) % GREENS.length], 0.9, true), x + rr(-0.5, 0.5) * s, 0.35 * s, z + rr(-0.5, 0.5) * s); c.scale.set(rr(0.5, 0.8) * s, rr(0.4, 0.6) * s, rr(0.5, 0.8) * s); }
}
function helecho(x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); world.add(g);
  for (let i = 0; i < 6; i++) { const f = mesh(GEO.frond, mat(0x3f9b3a, 0.85, true), 0, 0.05, 0, g); f.rotation.set(-0.5, i / 6 * 6.28 + rnd(), 0, 'YXZ'); f.scale.setScalar(0.45 * s); }
}

/* letrero de madera con texto en ambas caras */
function letrero(lines, x, z, ry = 0, w = 2.2, hgt = 0.9, postH = 1.3, big = false) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; world.add(g);
  const t = canvasTex(1024, Math.round(1024 * hgt / w)); const { ctx } = t, W = 1024, H = t.c.height;
  ctx.fillStyle = C.verde; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.amarillo; ctx.fillRect(0, H - H * 0.12, W, H * 0.12);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 10; ctx.strokeRect(20, 20, W - 40, H - H * 0.12 - 30);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const n = lines.length, area = H * 0.88;
  lines.forEach((l, i) => { let fs = i === 0 ? (big ? 120 : 100) : 64; const wt = i === 0 ? '900' : '700'; do { ctx.font = `${wt} ${fs}px Nunito, sans-serif`; fs -= 4; } while (ctx.measureText(l).width > W - 90 && fs > 20); ctx.fillText(l, W / 2, area * (i + 0.5) / n + (n > 1 && i === 0 ? 10 : 0)); });
  if (big) { ctx.fillStyle = C.verde; ctx.font = '900 44px Nunito, sans-serif'; ctx.fillText('ISTY · Operaciones Turísticas', W / 2, H - H * 0.06); }
  t.tex.needsUpdate = true;
  const wood = mat(0x7a5230, 0.95), face = new THREE.MeshStandardMaterial({ map: t.tex, roughness: 0.7 });
  const board = new THREE.Mesh(new THREE.BoxGeometry(w, hgt, 0.08), [wood, wood, wood, wood, face, face]);
  board.position.y = postH + hgt / 2; g.add(board);
  [-1, 1].forEach(sx => mesh(new THREE.BoxGeometry(0.12, postH + hgt + 0.1, 0.12), wood, sx * (w / 2 - 0.15), (postH + hgt + 0.1) / 2, -0.08, g));
  return g;
}

/* ================== construcción del sendero ================== */
function segDist(px, pz, [x1, z1], [x2, z2]) { const dx = x2 - x1, dz = z2 - z1, l = dx * dx + dz * dz || 1; const t = Math.max(0, Math.min(1, ((px - x1) * dx + (pz - z1) * dz) / l)); return Math.hypot(px - x1 - t * dx, pz - z1 - t * dz); }
const RUTA_LINEA = RUTA.slice(0, 8);
const libre = (x, z, r) => {
  for (let i = 0; i < RUTA_LINEA.length - 1; i++) if (segDist(x, z, RUTA_LINEA[i], RUTA_LINEA[i + 1]) < 2.4 + r) return false;
  const zonas = [[-9.6, 4.6, 3.6], [1.2, -5.2, 3.6], [3.6, -3.2, 2], [8.3, -4.6, 3], [8.5, -7.2, 3.2], [-4.4, -3.6, 1.5], [-1.8, -3.9, 1.4], [-11, 2.2, 2.4], [-0.8, 4.6, 1.6]];
  for (let i = 0; i < 10; i++) { const [ox, oz] = OFF(i); for (const k of [0, 3, 6]) if (Math.hypot(x - RUTA[k][0] - ox, z - RUTA[k][1] - oz) < 1 + r) return false; }
  return !zonas.some(([zx, zz, zr]) => Math.hypot(x - zx, z - zz) < zr + r) && Math.abs(z - RIO_Z) > RIO_W / 2 + 0.6 + r;
};

function texSuelo() {
  const t = canvasTex(512, 512), { ctx } = t;
  ctx.fillStyle = '#4f7f23'; ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) { ctx.fillStyle = ['#5d8f2a', '#447320', '#6b9a34', '#3d6a1d', '#7a6a2c'][i % 5]; ctx.globalAlpha = 0.35; const x = Math.random() * 512, y = Math.random() * 512, r = 2 + Math.random() * 7; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.6, Math.random() * 3, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1; t.tex.wrapS = t.tex.wrapT = THREE.RepeatWrapping; t.tex.repeat.set(7, 7); t.tex.needsUpdate = true; return t.tex;
}
function texTierra() {
  const t = canvasTex(256, 256), { ctx } = t;
  ctx.fillStyle = '#9a6a35'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i++) { ctx.fillStyle = ['#8a5c2c', '#a97a44', '#7d522a', '#b88a52'][i % 4]; ctx.globalAlpha = 0.5; ctx.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 5, 2 + Math.random() * 4); }
  ctx.globalAlpha = 1; t.tex.wrapS = t.tex.wrapT = THREE.RepeatWrapping; t.tex.needsUpdate = true; return t.tex;
}
function texAgua() {
  const t = canvasTex(256, 256), { ctx } = t;
  const g = ctx.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#e6f3fa'); ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(120,170,200,.55)'; ctx.lineWidth = 3;
  for (let i = 0; i < 40; i++) { const x = Math.random() * 256, y = Math.random() * 256, w = 20 + Math.random() * 40; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + w / 2, y - 5, x + w, y); ctx.stroke(); }
  t.tex.wrapS = t.tex.wrapT = THREE.RepeatWrapping; t.tex.needsUpdate = true; return t.tex;
}

function furgoneta() {
  const g = new THREE.Group(); g.position.set(-9.8, 0, 5.0); g.rotation.y = Math.PI / 2 + 0.1; world.add(g);
  const blanco = mat(0xf4f6f4, 0.4), vidrio = mat(0x1f3346, 0.15), negro = mat(0x1a1a1a, 0.8);
  mesh(new THREE.BoxGeometry(1.9, 1.5, 4.6), blanco, 0, 1.15, 0, g);
  const capo = mesh(new THREE.BoxGeometry(1.88, 0.7, 0.8), blanco, 0, 0.75, 2.6, g);
  mesh(new THREE.BoxGeometry(1.92, 0.32, 4.62), mat(C.verde2, 0.5), 0, 0.62, 0, g);
  mesh(new THREE.BoxGeometry(1.93, 0.08, 4.63), mat(C.amarillo, 0.5), 0, 0.82, 0, g);
  const ws = mesh(new THREE.BoxGeometry(1.7, 0.7, 0.05), vidrio, 0, 1.45, 2.3, g); ws.rotation.x = -0.35;
  [-1, 1].forEach(sx => { for (let i = 0; i < 3; i++) mesh(new THREE.BoxGeometry(0.03, 0.55, 0.95), vidrio, sx * 0.96, 1.5, 1.35 - i * 1.25, g); });
  mesh(new THREE.BoxGeometry(1.6, 0.55, 0.03), vidrio, 0, 1.5, -2.31, g);
  const rueda = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 16); rueda.rotateZ(Math.PI / 2);
  [[-0.88, 1.6], [0.88, 1.6], [-0.88, -1.5], [0.88, -1.5]].forEach(([wx, wz]) => { mesh(rueda, negro, wx, 0.38, wz, g); const c = mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.3, 10).rotateZ(Math.PI / 2), mat(0xb0b6bc, 0.3), wx, 0.38, wz, g); c.scale.x = 1.02; });
  [-0.6, 0.6].forEach(sx => mesh(new THREE.BoxGeometry(0.3, 0.14, 0.05), mat(0xfff7c2, 0.2), sx, 0.85, 3.01, g));
  // logotipo lateral de la operadora (ficticia)
  const op = typeof TOUR !== 'undefined' && TOUR.operadora ? TOUR.operadora : 'Operadora turística';
  const t = canvasTex(512, 128); t.ctx.fillStyle = C.verde; t.ctx.font = '900 54px Nunito, sans-serif'; t.ctx.textAlign = 'center'; t.ctx.textBaseline = 'middle'; t.ctx.fillText(op.length > 22 ? op.slice(0, 21) + '…' : op, 256, 64); t.tex.needsUpdate = true;
  [-1, 1].forEach(sx => { const p = mesh(new THREE.PlaneGeometry(2.6, 0.65), new THREE.MeshStandardMaterial({ map: t.tex, transparent: true }), sx * 0.962, 1.08, -0.3, g); p.rotation.y = sx * Math.PI / 2; });
  sombra(0, 0.3, 2.8, g).scale.set(1.4, 1, 2.8);
  return g;
}

function mono() {
  const g = new THREE.Group(); const cafe = mat(0x6b4a2b, 0.9, true), cara = mat(0xd9b48a, 0.8, true);
  const body = mesh(new THREE.SphereGeometry(0.22, 10, 8), cafe, 0, 0.25, 0, g); body.scale.set(1, 1.25, 0.9);
  mesh(new THREE.SphereGeometry(0.16, 10, 8), cafe, 0, 0.62, 0.02, g);
  const f = mesh(new THREE.SphereGeometry(0.11, 10, 8), cara, 0, 0.6, 0.1, g); f.scale.set(1, 0.85, 0.6);
  [-1, 1].forEach(s => { mesh(new THREE.SphereGeometry(0.055, 8, 6), cara, s * 0.15, 0.66, 0, g); mesh(new THREE.SphereGeometry(0.02, 6, 4), mat(0x111111, 0.4), s * 0.045, 0.63, 0.17, g); });
  const arm = new THREE.CapsuleGeometry(0.05, 0.36, 3, 6);
  [-1, 1].forEach(s => { const a = mesh(arm, cafe, s * 0.2, 0.42, 0.05, g); a.rotation.z = s * 2.6; const l = mesh(arm, cafe, s * 0.13, 0.05, 0.12, g); l.rotation.x = 1.2; });
  const cola = mesh(new THREE.TorusGeometry(0.28, 0.035, 6, 14, Math.PI * 1.4), cafe, 0, -0.05, -0.2, g); cola.rotation.set(0, Math.PI / 2, 0.6);
  return g;
}
function loro() {
  const g = new THREE.Group(); const rojo = mat(0xd62828, 0.6, true);
  const b = mesh(new THREE.SphereGeometry(0.12, 10, 8), rojo, 0, 0.16, 0, g); b.scale.set(0.9, 1.4, 0.9); b.rotation.x = -0.25;
  mesh(new THREE.SphereGeometry(0.085, 10, 8), rojo, 0, 0.34, 0.03, g);
  mesh(new THREE.SphereGeometry(0.04, 8, 6), mat(0xffffff, 0.6), 0, 0.35, 0.09, g);
  const pico = mesh(new THREE.ConeGeometry(0.03, 0.08, 6), mat(0xf2e2b8, 0.5), 0, 0.32, 0.12, g); pico.rotation.x = 1.9;
  [-1, 1].forEach(s => { const w = mesh(new THREE.BoxGeometry(0.03, 0.2, 0.14), mat(s > 0 ? 0x1d4ed8 : 0x1d4ed8, 0.6, true), s * 0.1, 0.16, -0.02, g); w.rotation.x = -0.3; mesh(new THREE.BoxGeometry(0.032, 0.06, 0.12), mat(0xf2c21b, 0.6, true), s * 0.1, 0.26, 0, g); });
  const cola = mesh(new THREE.BoxGeometry(0.06, 0.3, 0.02), mat(0x1d4ed8, 0.6, true), 0, -0.05, -0.08, g); cola.rotation.x = 0.35;
  return g;
}
function salvavidas() {
  const g = new THREE.Group(); g.position.set(6.4, 0, -3.3); g.rotation.y = -0.6; world.add(g);
  mesh(new THREE.BoxGeometry(0.12, 1.7, 0.12), mat(0x7a5230), 0, 0.85, -0.1, g);
  mesh(new THREE.BoxGeometry(0.5, 0.12, 0.12), mat(0x7a5230), 0, 1.65, -0.1, g);
  const aro = mesh(new THREE.TorusGeometry(0.3, 0.085, 10, 28), mat(0xf97316, 0.5), 0, 1.25, 0, g);
  for (let i = 0; i < 4; i++) { const s = mesh(new THREE.TorusGeometry(0.3, 0.09, 10, 6, Math.PI / 8), mat(0xffffff, 0.5), 0, 1.25, 0, g); s.rotation.z = i * Math.PI / 2 - Math.PI / 16; }
  aro.userData.ring = true;
  // chalecos colgados
  [-0.32, 0.32].forEach(x => { const c = mesh(new THREE.BoxGeometry(0.28, 0.36, 0.08), mat(0xfacc15, 0.6), x, 0.75, 0.02, g); c.rotation.z = x * 0.2; });
  return g;
}
function cocina() {
  // fogón (siempre) y olla comunitaria (solo en su fase)
  const fg = new THREE.Group(); fg.position.set(3.6, 0, -3.3); world.add(fg);
  for (let i = 0; i < 7; i++) { const a = i / 7 * 6.28; const s = mesh(GEO.stone, mat(0x6b6b66, 0.9, true), Math.cos(a) * 0.5, 0.1, Math.sin(a) * 0.5, fg); s.scale.setScalar(0.16); }
  const leña = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6); leña.rotateZ(Math.PI / 2);
  [0, 1.1, 2.2].forEach(a => { const l = mesh(leña, mat(0x5a3a1e), 0, 0.07, 0, fg); l.rotation.y = a; });
  const olla = new THREE.Group(); fg.add(olla);
  const fuego = mesh(new THREE.ConeGeometry(0.22, 0.5, 7), new THREE.MeshBasicMaterial({ color: 0xff8a1f, transparent: true, opacity: 0.9 }), 0, 0.32, 0, olla); olla.userData.fuego = fuego;
  mesh(new THREE.ConeGeometry(0.12, 0.32, 6), new THREE.MeshBasicMaterial({ color: 0xffd34d }), 0, 0.26, 0, olla);
  mesh(new THREE.CylinderGeometry(0.36, 0.3, 0.42, 16, 1, true), new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.5, metalness: 0.4, side: THREE.DoubleSide }), 0, 0.72, 0, olla);
  mesh(new THREE.CircleGeometry(0.34, 16).rotateX(-Math.PI / 2), mat(0xb5651d, 0.6), 0, 0.88, 0, olla);
  mesh(new THREE.TorusGeometry(0.36, 0.025, 6, 20).rotateX(Math.PI / 2), mat(0x3a3a3a, 0.4), 0, 0.93, 0, olla);
  [-1, 1].forEach(s => { mesh(new THREE.BoxGeometry(0.04, 1.0, 0.04), mat(0x5a3a1e), s * 0.55, 0.5, 0, olla); });
  mesh(new THREE.BoxGeometry(1.2, 0.04, 0.04), mat(0x5a3a1e), 0, 1.0, 0, olla);
  return olla;
}
function cabana() {
  const g = new THREE.Group(); g.position.set(1.2, 0, -5.4); world.add(g);
  const madera = mat(0x8a5a30, 0.9), paja = mat(0xc9a35a, 1, true), bambu = mat(0xb89a5a, 0.9);
  mesh(new THREE.BoxGeometry(4.6, 0.35, 3.6), madera, 0, 0.175, 0, g);
  [[-2.1, -1.6], [2.1, -1.6], [-2.1, 1.6], [2.1, 1.6], [0, 1.6], [0, -1.6]].forEach(([x, z]) => mesh(new THREE.CylinderGeometry(0.1, 0.12, 2.6, 7), mat(0x6b4423, 0.95, true), x, 1.5, z, g));
  const techo = mesh(new THREE.ConeGeometry(3.7, 2.2, 4, 1), paja, 0, 3.85, 0, g); techo.rotation.y = Math.PI / 4; techo.scale.z = 0.82;
  // paredes bajas de caña al fondo y a los lados
  mesh(new THREE.BoxGeometry(4.4, 1.2, 0.08), bambu, 0, 0.95, -1.62, g);
  [-1, 1].forEach(s => mesh(new THREE.BoxGeometry(0.08, 1.2, 3.2), bambu, s * 2.12, 0.95, 0, g));
  for (let i = 0; i < 18; i++) mesh(new THREE.BoxGeometry(0.03, 1.2, 0.1), mat(0x9c7f45), -2.1 + i * 0.25, 0.95, -1.57, g);
  // mesa y bancas
  mesh(new THREE.BoxGeometry(2.2, 0.08, 0.9), madera, 0, 1.1, -0.2, g);
  [[-0.95, -0.55], [0.95, -0.55], [-0.95, 0.15], [0.95, 0.15]].forEach(([x, z]) => mesh(new THREE.BoxGeometry(0.08, 0.72, 0.08), madera, x, 0.7, z, g));
  [-0.85, 0.45].forEach(z => mesh(new THREE.BoxGeometry(2.2, 0.06, 0.3), madera, 0, 0.78, z, g));
  // cuencos y artesanías
  [[-0.6, -0.2], [0, -0.3], [0.6, -0.1]].forEach(([x, z]) => mesh(new THREE.SphereGeometry(0.12, 10, 6, 0, 6.28, Math.PI / 2, Math.PI / 2), mat(0x9a3412, 0.7), x, 1.26, z, g));
  // escalones
  mesh(new THREE.BoxGeometry(1.2, 0.18, 0.4), madera, 0, 0.09, 2.0, g);
  sombra(0, 0, 3.4, g).scale.set(3.2, 1, 2.6);
}
function cascada() {
  const g = new THREE.Group(); g.position.set(8.5, 0, -7.3); world.add(g);
  const roca = [0x6b6862, 0x57534e, 0x7a766f];
  [[0, 2.4, 0, 2.6, 2.6], [-2.2, 1.6, 0.3, 1.9, 1.8], [2.2, 1.8, 0.2, 2, 2], [-1.2, 4.2, -0.2, 1.7, 1.4], [1.3, 4.4, -0.3, 1.8, 1.4], [0, 5.4, -0.6, 1.8, 1.2], [-3.4, 0.8, 0.8, 1.2, 1], [3.4, 0.9, 0.9, 1.3, 1.1]]
    .forEach(([x, y, z, s, sy], i) => { const r = mesh(GEO.stone, mat(roca[i % 3], 0.95, true), x, y, z, g); r.scale.set(s, sy, s * 0.8); r.rotation.y = i; });
  // vegetación sobre la roca
  [[-1.6, 5.4], [1.8, 5.5], [-3, 3], [3.2, 3.2]].forEach(([x, y]) => { const c = mesh(GEO.crown, mat(GREENS[(x > 0) + 1], 0.9, true), x, y, -0.6, g); c.scale.set(1.1, 0.7, 1); });
  const at = texAgua(); parts.aguaTex = at; at.repeat.set(1, 2);
  parts.agua = mesh(new THREE.PlaneGeometry(1.3, 5.2), new THREE.MeshStandardMaterial({ map: at, color: 0xe0f2fe, transparent: true, opacity: 0.85, roughness: 0.2 }), 0, 2.75, 1.95, g);
  for (let i = 0; i < 5; i++) { const s = mesh(GEO.crown1, new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, roughness: 0.4 }), rr(-0.6, 0.6), 0.15, 2.2 + rr(-0.2, 0.3), g); s.scale.set(0.45, 0.2, 0.4); }
  const poza = mesh(new THREE.CircleGeometry(2, 28).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.15, transparent: true, opacity: 0.85 }), -0.2, 0.03, 2.7, g);
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; const s = mesh(GEO.stone, mat(roca[i % 3], 0.95, true), -0.2 + Math.cos(a) * 2.05, 0.08, 2.7 + Math.sin(a) * 2.05, g); s.scale.set(0.35, 0.22, 0.3); }
  parts.poza = poza;
}

function build() {
  builtFor = 'tur'; seed = 7;
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.grupo = [];
  // suelo y área caminable (límites del recorrido)
  const suelo = mesh(new THREE.PlaneGeometry(32, 28).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: texSuelo(), roughness: 1 }), 0, 0, 1);
  suelo.material.map.repeat.set(9, 8);
  suelo.name = 'suelo';
  parts.walk = mesh(new THREE.PlaneGeometry(20, 12.6).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ visible: false }), 0, 0, -1.0);
  // río a lo largo del frente, con orillas
  const rt = texAgua(); rt.repeat.set(6, 1); parts.rioTex = rt;
  parts.rio = mesh(new THREE.PlaneGeometry(26, RIO_W).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: rt, color: 0x2a8fc4, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.88 }), 0, 0.02, RIO_Z);
  for (let x = -12.5; x <= 12.5; x += 0.9) [-1, 1].forEach(s => { const st = mesh(GEO.stone, mat([0x6b6862, 0x7a766f, 0x8a6f4d][Math.floor(rnd() * 3)], 0.95, true), x + rr(-0.3, 0.3), 0.05, RIO_Z + s * (RIO_W / 2 + rr(-0.05, 0.2))); st.scale.set(rr(0.2, 0.45), rr(0.12, 0.25), rr(0.2, 0.4)); });
  // sendero de tierra
  const tierra = new THREE.MeshStandardMaterial({ map: texTierra(), roughness: 1, polygonOffset: true, polygonOffsetFactor: -1 });
  for (let i = 0; i < RUTA_LINEA.length - 1; i++) {
    const [x1, z1] = RUTA_LINEA[i], [x2, z2] = RUTA_LINEA[i + 1]; const len = Math.hypot(x2 - x1, z2 - z1); if (len < 0.01) continue;
    const seg = mesh(new THREE.PlaneGeometry(len, 1.5).rotateX(-Math.PI / 2), tierra, (x1 + x2) / 2, 0.02, (z1 + z2) / 2); seg.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    // piedras de borde
    const n = Math.floor(len / 0.8);
    for (let k = 0; k <= n; k++) [-1, 1].forEach(s => { if (rnd() < 0.45) return; const t = k / Math.max(1, n), nx = -(z2 - z1) / len, nz = (x2 - x1) / len; const st = mesh(GEO.stone, mat(0x8b8780, 0.95, true), x1 + (x2 - x1) * t + nx * s * 0.85, 0.04, z1 + (z2 - z1) * t + nz * s * 0.85); st.scale.set(0.14, 0.08, 0.12); });
  }
  RUTA_LINEA.forEach(([x, z]) => mesh(new THREE.CircleGeometry(0.75, 20).rotateX(-Math.PI / 2), tierra, x, 0.021, z));
  // plazoletas de parada
  [[-8.4 + 2.4, 3.4 + 1.1, 2.4], [0.8 + 2.4, -2 + 1, 2.2], [6 + 2.4, -2.2 + 1, 2.2], [-2.8 + 2.4, -0.8 + 1, 2.2]].forEach(([x, z, r]) => { const p = mesh(new THREE.CircleGeometry(r, 24).rotateX(-Math.PI / 2), tierra, x, 0.019, z); p.scale.set(1.25, 1, 0.8); });

  // punto de encuentro en Puyo: furgoneta y letrero principal
  parts.bus = furgoneta();
  parts.letrero = letrero(['Sendero Amazónico', 'Puyo · Pastaza'], -10.6, 2.0, 0.55, 3.0, 1.3, 1.2, true);
  // centro de rescate (Omaere): árbol con monos y percha del loro
  const at = arbol(-4.6, -3.8, 1.15);
  const rama = mesh(new THREE.CylinderGeometry(0.07, 0.09, 2.2, 6), mat(0x6b4423, 0.95, true), -3.9, 2.9, -3.5); rama.rotation.z = 1.2;
  parts.mono = mono(); parts.mono.position.set(-3.5, 2.95, -3.35); parts.mono.rotation.y = 0.4; world.add(parts.mono);
  parts.monoBase = 2.95;
  const m2 = mono(); m2.scale.setScalar(0.75); m2.position.set(-5.2, 0.05, -2.9); m2.rotation.y = 0.9; world.add(m2); parts.mono2 = m2;
  mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.8, 6), mat(0x6b4423), -1.8, 0.9, -3.9);
  mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 6).rotateZ(Math.PI / 2), mat(0x6b4423), -1.8, 1.8, -3.9);
  parts.loro = loro(); parts.loro.position.set(-1.6, 1.82, -3.9); parts.loro.rotation.y = 0.5; world.add(parts.loro);
  letrero(['Paseo de los Monos', 'Omaere · fauna rescatada'], -4.8, -1.4, 0.5, 2.4, 0.9, 1.0);
  // comunidad kichwa
  cabana();
  parts.olla = cocina();
  letrero(['Comunidad kichwa', 'Cocina comunitaria'], -1.5, -3.0, 0.3, 2.2, 0.85, 1.0);
  // cascada y salvavidas
  cascada();
  parts.salvavidas = salvavidas();
  letrero(['Cascada', 'Baño solo con salvavidas'], 4.4, -4.2, -0.2, 2.2, 0.85, 1.0);

  // selva densa en los bordes
  const plant = (fn, x, z, s, r) => { if (libre(x, z, r)) fn(x, z, s); };
  for (let x = -12.5; x <= 12.5; x += 1.5) {
    for (let z = -10.4; z <= -6.9; z += 1.7) { const k = rnd(); plant(k < 0.18 ? palmera : k < 0.28 ? emergente : arbol, x + rr(-0.6, 0.6), z + rr(-0.5, 0.5), rr(0.8, 1.2), 1.4); }
    { const k = rnd(), z = RIO_Z + RIO_W / 2 + rr(1.2, 2.6); if (k < 0.3) plant(palmera, x + rr(-0.5, 0.5), z, rr(0.6, 0.85), 0.8); else if (k < 0.6) plant(arbusto, x, z, rr(0.9, 1.4), 0.5); else plant(helecho, x, z, rr(1, 1.4), 0.4); }
  }
  for (let z = -6.9; z <= RIO_Z - 1.6; z += 1.5) [-1, 1].forEach(s => { for (let d = 10.3; d <= 12.8; d += 1.5) { const k = rnd(), x = s * d + rr(-0.4, 0.4), zz = z + rr(-0.5, 0.5); if (z < 0.5) plant(k < 0.3 ? palmera : arbol, x, zz, rr(0.8, 1.15), 1.2); else plant(k < 0.4 ? palmera : k < 0.7 ? arbusto : helecho, x, zz, rr(0.7, 1), 0.6); } });
  // algunos árboles y plantas dentro, lejos del sendero
  for (let i = 0; i < 70; i++) { const x = rr(-11, 11), z = rr(-7, 5.4); const k = rnd(); if (k < 0.15) plant(palmera, x, z, rr(0.7, 1), 1.4); else if (k < 0.3) plant(arbol, x, z, rr(0.6, 0.9), 1.4); else if (k < 0.65) plant(helecho, x, z, rr(0.8, 1.3), 0.4); else plant(arbusto, x, z, rr(0.7, 1.2), 0.5); }
  for (let i = 0; i < 40; i++) { const x = rr(-12, 12), z = RIO_Z + (rnd() < 0.5 ? -1 : 1) * (RIO_W / 2 + rr(0.3, 0.9)); if (Math.abs(x + 9.8) > 3) helecho(x, z, rr(0.7, 1.1)); }
  palmera(-11.4, 0.4, 1.1); palmera(-6.5, 5.3, 0.9); emergente(10.5, 2, 1.1); emergente(-11.5, -8.6, 1.2);

  // guía con banderín y grupo de turistas (personajes 3D)
  sprites.guia = makeHuman('🧑🏽‍🦱', { height: 1.74, shirt: C.verde2 }); world.add(sprites.guia);
  const flag = new THREE.Group(); flag.position.set(0.32, 0, 0.05); sprites.guia.add(flag); parts.flag = flag;
  mesh(new THREE.CylinderGeometry(0.018, 0.018, 2.3, 6), mat(0x3f3f46, 0.4), 0, 1.15, 0, flag);
  const tri = new THREE.Shape(); tri.moveTo(0, 0); tri.lineTo(0.55, -0.17); tri.lineTo(0, -0.34); tri.lineTo(0, 0);
  const bandera = mesh(new THREE.ShapeGeometry(tri), new THREE.MeshStandardMaterial({ color: 0xdc2626, side: THREE.DoubleSide, roughness: 0.6 }), 0.01, 2.28, 0, flag); parts.bandera = bandera;
  for (let i = 0; i < 10; i++) {
    const h = makeHuman('🧑🏽', { height: rr(1.58, 1.78) }); h.visible = false; world.add(h); sprites.grupo.push(h);
    const vend = emoji('🤕', 0.42); vend.position.set(0, 2.15, 0); vend.visible = false; h.add(vend); h.userData.vend = vend;
  }
  parts.grupoCentro = new THREE.Object3D(); world.add(parts.grupoCentro); // punto de interacción «Revisar al grupo»
  // lluvia (líneas que caen)
  const n = 1400, pos = new Float32Array(n * 6);
  for (let i = 0; i < n; i++) { const x = rr(-13, 13), y = rr(0, 12), z = rr(-10, 11); pos.set([x, y, z, x + 0.03, y + 0.35, z], i * 6); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  sprites.lluvia = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xc7d2dc, transparent: true, opacity: 0.6 })); sprites.lluvia.visible = false; world.add(sprites.lluvia);
  // rótulo con fase y hora
  const lt = canvasTex(512, 128); parts.label = lt;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt.tex, transparent: true, depthTest: false, fog: false })); ls.renderOrder = 10; ls.scale.set(6.4, 1.6, 1); ls.position.set(0, 9.5, -6); world.add(ls);
  parts.labelKey = '';
}

const target = new THREE.Vector3();
function sync() {
  const e = App.escena(); if (!e) return;
  if (builtFor !== 'tur') build();
  const k = Math.min(e.etapa, RUTA.length - 1), [x, z] = RUTA[k];
  target.set(x, 0, z);
  sprites.grupo.forEach((h, i) => {
    const c = e.grupo[i]; h.visible = !!c; if (!c) return;
    // '🤕' (lesionado) no es un emoji de persona: se conserva el personaje y se muestra un vendaje
    const herido = !isPerson(c.avatar);
    if (!herido && h.userData.cur() !== c.avatar) h.userData.draw(c.avatar);
    h.userData.vend.visible = herido;
    h.userData.off = OFF(i);
  });
  if (!mode || !sprites.guia.userData.placed) { // VR Box (sin bucle propio) o primera vez: ubicar sin animación
    sprites.guia.userData.placed = true; sprites.guia.position.set(x, 0, z);
    sprites.grupo.forEach(h => { if (h.userData.off) { h.position.set(x + h.userData.off[0], 0, z + h.userData.off[1]); h.rotation.y = Math.atan2(x - h.position.x, z - h.position.z); } });
    sprites.guia.rotation.y = Math.atan2(2.8, 1.2);
  }
  parts.bus.visible = k <= 2 || k >= 8;
  parts.olla.visible = k === 5; parts.salvavidas.visible = k === 6;
  sprites.lluvia.visible = !!e.lluvia;
  parts.rio.position.y = e.lluvia ? 0.08 : 0.02; parts.rio.scale.z = e.lluvia ? 1.25 : 1;
  parts.rio.material.color.set(e.lluvia ? 0x7d6a3e : 0x2a8fc4);
  if (scene.background) setSky(e.lluvia);
  // el guía habla cuando cambia la narración
  const txt = App.getHud().text || '';
  if (txt && txt !== narrKey) { narrKey = txt; sprites.guia.userData.talk(Math.min(6, 1.5 + txt.length * 0.03)); }
  const key = e.hora + e.fase;
  if (parts.labelKey !== key) {
    parts.labelKey = key; const { ctx, tex } = parts.label;
    ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = 'rgba(27,77,34,.92)'; roundRect(ctx, 4, 4, 504, 120, 24); ctx.fill();
    ctx.fillStyle = C.amarillo; ctx.fillRect(28, 112, 456, 6);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 30px Nunito, sans-serif'; ctx.fillText(e.fase.length > 30 ? e.fase.slice(0, 29) + '…' : e.fase, 256, 42);
    ctx.font = `bold 36px Nunito, ${EMOJI_FONT}`; ctx.fillText(`🕗 ${e.hora}`, 256, 88); tex.needsUpdate = true;
  }
  drawHud();
}
function setSky(lluvia) {
  const c = lluvia ? SKY_RAIN : SKY;
  scene.background = new THREE.Color(c);
  scene.fog = new THREE.Fog(c, lluvia ? 14 : 26, lluvia ? 48 : 75);
}

function drawHud() {
  const show = mode === 'xr' && !domOverlay && placed; hud.visible = show; if (!show) return;
  const d = App.getHud(); const btns = d.buttons.slice(0, 9);
  const key = d.text + btns.map(b => b.label + b.disabled).join('|') + d.busy + scaleMode; if (key === hudKey) return; hudKey = key;
  const ctx = hudCtx, W = 1024, H = 1100; ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(16,45,22,.92)'; roundRect(ctx, 0, 0, W, H, 36); ctx.fill();
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
  if (reticle.visible) root.position.setFromMatrixPosition(reticle.matrix); else root.position.copy(_v).addScaledVector(_f, scaleMode === 'table' ? 0.7 : 2.5).setY(_v.y - (scaleMode === 'table' ? 0.45 : 1.6));
  root.rotation.set(0, Math.atan2(_v.x - root.position.x, _v.z - root.position.z), 0);
  world.scale.setScalar(scaleMode === 'table' ? 0.03 : 1); // el sendero mide ~26 m: maqueta de ~80 cm en la mesa
  root.visible = true; placed = true; reticle.visible = false; hudKey = '';
  hud.position.copy(_v).addScaledVector(_f, 0.75);
  $('#xr-status').textContent = 'Sendero colocado. Usa el panel para conducir el tour.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; hud.visible = false; $('#xr-status').textContent = 'Toca para colocar de nuevo la escena.'; }
  App.toast(scaleMode === 'table' ? 'Sendero en miniatura' : 'Sendero a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

const orbit = { theta: 0.35, phi: 1.0, r: 24, target: new THREE.Vector3(0, 1.2, -0.5) };
function updateOrbit() { const o = orbit; camera.position.set(o.target.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), o.target.y + o.r * Math.cos(o.phi), o.target.z + o.r * Math.sin(o.phi) * Math.cos(o.theta)); camera.lookAt(o.target); }
function setupPointer(cv) {
  const pts = new Map(); let pinch = null;
  cv.addEventListener('pointerdown', e => { try { cv.setPointerCapture(e.pointerId); } catch (err) { /* toque simulado */ } pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
  cv.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return; const p = pts.get(e.pointerId); const dx = e.clientX - p.x, dy = e.clientY - p.y; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (walker && walker.active) return;
    if (pts.size === 1) { orbit.theta -= dx * 0.008; orbit.phi = Math.min(1.45, Math.max(0.2, orbit.phi - dy * 0.006)); }
    else if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) orbit.r = Math.min(48, Math.max(5, orbit.r * pinch / d)); pinch = d; }
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); if (walker && walker.active) return; orbit.r = Math.min(48, Math.max(5, orbit.r * (1 + e.deltaY * 0.001))); }, { passive: false });
}
function resize() { if (!renderer || mode !== 'inline') return; const c = renderer.domElement; const w = c.clientWidth || 1, h = c.clientHeight || 1; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }

/* el guía y el grupo caminan (a paso humano) hacia el punto de la fase actual */
const _d = new THREE.Vector3();
function andar(h, tx, tz, vel, dt, faceX, faceZ) {
  _d.set(tx - h.position.x, 0, tz - h.position.z); const dist = _d.length();
  if (dist > 0.06) {
    const step = Math.min(dist, vel * dt * (dist > 3 ? 1.25 : 1));
    h.position.addScaledVector(_d.normalize(), step);
    girar(h, Math.atan2(_d.x, _d.z), dt);
    if (!h.userData.walking) { h.userData.walking = true; h.userData.setState('walk'); }
  } else {
    if (h.userData.walking) { h.userData.walking = false; h.userData.setState('idle'); }
    if (faceX != null) girar(h, Math.atan2(faceX - h.position.x, faceZ - h.position.z), dt * 0.6);
  }
  h.position.y = 0;
}
function girar(h, yaw, dt) { let d = yaw - h.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); h.rotation.y += d * Math.min(1, dt * 6); }
function moverGrupo(dt) {
  const g = sprites.guia;
  let cx = 0, cz = 0, n = 0;
  sprites.grupo.forEach(h => { if (h.visible && h.userData.off) { cx += target.x + h.userData.off[0]; cz += target.z + h.userData.off[1]; n++; } });
  andar(g, target.x, target.z, 1.5, dt, n ? cx / n : target.x + 1, n ? cz / n : target.z + 1);
  if (n) { let px = 0, pz = 0; sprites.grupo.forEach(h => { if (h.visible && h.userData.off) { px += h.position.x; pz += h.position.z; } }); parts.grupoCentro.position.set(px / n, 1, pz / n); }
  sprites.grupo.forEach((h, i) => { if (!h.visible || !h.userData.off) return; const [ox, oz] = h.userData.off; andar(h, target.x + ox, target.z + oz, 1.3 + (i % 3) * 0.08, dt, g.position.x, g.position.z); });
}

function animate(t, frame) {
  const dt = clock.getDelta(), time = clock.elapsedTime;
  if (sprites.guia) moverGrupo(dt);
  if (parts.mono) { parts.mono.position.y = parts.monoBase + Math.sin(time * 3) * 0.06; parts.mono.rotation.z = Math.sin(time * 1.7) * 0.12; }
  if (parts.mono2) parts.mono2.rotation.y = 0.9 + Math.sin(time * 0.8) * 0.6;
  if (parts.loro) { parts.loro.rotation.y = 0.5 + Math.sin(time * 1.3) * 0.5; parts.loro.position.y = 1.82 + Math.abs(Math.sin(time * 4)) * 0.02; }
  if (parts.bandera) parts.bandera.rotation.y = Math.sin(time * 4) * 0.35;
  if (parts.olla && parts.olla.visible) { const f = parts.olla.userData.fuego; f.scale.set(1, 0.85 + Math.sin(time * 17) * 0.15 + Math.sin(time * 7) * 0.08, 1); }
  if (parts.aguaTex) parts.aguaTex.offset.y = (parts.aguaTex.offset.y + dt * 1.2) % 1;
  if (parts.rioTex) parts.rioTex.offset.x = (parts.rioTex.offset.x - dt * (sprites.lluvia && sprites.lluvia.visible ? 0.25 : 0.08)) % 1;
  if (sprites.lluvia && sprites.lluvia.visible) { const a = sprites.lluvia.geometry.attributes.position; for (let i = 0; i < a.count; i += 2) { let y = a.getY(i) - dt * 9; if (y < 0) y += 12; a.setY(i, y); a.setY(i + 1, y + 0.35); } a.needsUpdate = true; }
  if (world) updateHumans(world, dt);
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
  setSky(!!(App.escena() || {}).lluvia);
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
  if (type === 'immersive-vr') setSky(!!(App.escena() || {}).lluvia); else { scene.background = null; scene.fog = null; } root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { vr.exit(); if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

/* gafas sencillas tipo VR Box (cardboard) */
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(16,45,22,.94)', view: { pos: [-0.8, 1.6, 4.6], target: [1.5, 1.2, -3] },
  prepare: () => { if (mode === 'inline') stopInline(); init(); build(); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; setSky(!!(App.escena() || {}).lluvia); }
});
$('#btn-vr').onclick = () => { if (mode !== 'xr') vr.enter(); };
$('#btn-3d').onclick = () => { if (mode === 'inline') stopInline(); else if (!mode) startInline(); };
$('#btn-ar').onclick = async () => {
  if (mode === 'xr') return stopAll();
  let ar = false, vrOk = false;
  if (navigator.xr && isSecureContext) { try { ar = await navigator.xr.isSessionSupported('immersive-ar'); } catch (e) { } if (!ar) try { vrOk = await navigator.xr.isSessionSupported('immersive-vr'); } catch (e) { } }
  if (ar) return startXR('immersive-ar');
  if (vrOk) return startXR('immersive-vr');
  App.toast(isSecureContext ? 'Este dispositivo no admite RA. Se abre la vista 3D.' : 'La RA requiere HTTPS. Se abre la vista 3D.', 3500);
  if (!mode) startInline();
};
window.Tur3D = { stopAll, guia: () => sprites.guia && sprites.guia.position.clone() };
