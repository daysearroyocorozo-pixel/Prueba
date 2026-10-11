/* =========================================================
   Sector vigilado en 3D y Realidad Aumentada – Simulador de Vigilancia
   y Seguridad Ciudadana
   - Plaza con caseta, cámaras, bancas, personas e incidentes en tiempo real
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';
import { glyphSprite, makeHuman, updateHumans, createWalker } from '../../js/isty-3d.js';

const App = window.VigApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const parts = {}; const sprites = { cola: [], paseo: [], actual: null, quien: null, agente: null, prop: null, cerrado: null };
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();

function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return { c, ctx, tex }; }
function emoji(e, scale = 0.4, size = 128) { const sp = glyphSprite(e, scale, Math.max(128, size)); const d = sp.userData.draw; sp.userData.draw = x => { sp.userData.cur = x; d(x); }; sp.userData.cur = e; return sp; }
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function wrap(ctx, t, w) { const out = []; let l = ''; for (const word of String(t).split(/\s+/)) { const n = l ? l + ' ' + word : word; if (ctx.measureText(n).width > w && l) { out.push(l); l = word; } else l = n; } if (l) out.push(l); return out; }
const mat = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 });
const P = (x, y) => [(x - 330) / 100, (y - 150) / 100]; // coordenadas de la escena 2D → 3D

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.01, 150);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 2.2));
  const dl = new THREE.DirectionalLight(0xffffff, 1.5); dl.position.set(3, 5, 2); scene.add(dl);
  root = new THREE.Group(); scene.add(root);
  world = new THREE.Group(); root.add(world);
  reticle = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x3BA34A }));
  reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);
  const h = canvasTex(1024, 1100); hudCtx = h.ctx; hudTex = h.tex;
  hud = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.46 * 1100 / 1024), new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, depthTest: false }));
  hud.renderOrder = 20; hud.visible = false; scene.add(hud);
  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    c.addEventListener('select', () => onSelect(c));
    c.addEventListener('connected', e => { if (e.data.targetRayMode === 'tracked-pointer') { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0x3BA34A })); l.scale.z = 3; l.name = 'ray'; c.add(l); } });
    scene.add(c);
  }
  App.subscribe(() => { if (mode) sync(); });
  addEventListener('resize', resize);
  setupPointer(canvas);
  walker = createWalker({
    getCamera: () => camera, canvas, container: $('#view3d'), getWorld: () => parts.floor || world, eye: 1.62, speed: 2.6,
    targets: () => {
      const s = App.st, t = []; if (!s) return t;
      sprites.cola.forEach((q, i) => { const c = s.cola[i]; if (c) t.push({ obj: q.ring, label: 'Atender incidente: ' + c.c.nombre, kind: 'inc', nombre: c.c.nombre }); });
      if (sprites.quien && s.actual) t.push({ obj: sprites.quien, label: 'Hablar con ' + s.actual.c.quien, kind: 'quien' });
      if (parts.radio) t.push({ obj: parts.radio, label: 'Usar radio', kind: 'fa', fa: 'radio' });
      return t;
    },
    interact: t => {
      const s = App.st; if (!s) return;
      if (t.kind === 'quien') { sprites.quien.userData.talk(3); App.toast(`${s.actual.c.avatar} “${s.actual.c.dice}”`, 4000); return; }
      if (t.kind === 'inc') {
        const b = [...document.querySelectorAll('#dialog-choices .btn')].find(x => x.textContent.includes('Atender: ' + t.nombre));
        if (b && !App.busy) b.click(); else App.toast(s.actual ? 'Termina primero el incidente que estás atendiendo.' : 'Este incidente aún no se puede atender.');
        return;
      }
      const b = document.querySelector(`[data-fa="${t.fa}"]`);
      if (b && !b.disabled) b.click(); else App.toast('La radio no está disponible ahora.');
    }
  });
}
let walker = null;

/* ---------- piezas de la plaza (metros) ---------- */
const GW = 20, GD = 14; // ancho y fondo del sector
const FUENTE = [1.2, -0.9];
const BOOTH = [-6.2, -3.6];
const AG_BASE = [-5.4, -1.7], AG_ATENDER = [-0.4, 1.6], QUIEN_POS = [2.6, 1.6], ACTUAL_POS = [1.1, 1.6];
function addTo(g, m, x, y, z) { m.position.set(x, y, z); g.add(m); return m; }
function tree(x, z, s = 1, palm = false) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); world.add(g);
  if (palm) {
    const trunkM = mat(0x8b6b45);
    for (let i = 0; i < 6; i++) { const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.15 - i * 0.012, 0.17 - i * 0.012, 0.6, 8), trunkM); seg.position.set(Math.sin(i * 0.3) * 0.12 * i / 3, 0.3 + i * 0.58, 0); seg.rotation.z = -0.04 * i; g.add(seg); }
    const top = new THREE.Vector3(0.3, 3.55, 0); const leafM = mat(0x2f8f3a);
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.9, 4), leafM); leaf.scale.z = 0.25; leaf.position.copy(top).add(new THREE.Vector3(Math.cos(a) * 0.8, -0.25, Math.sin(a) * 0.8)); leaf.rotation.set(0, -a, 0); leaf.rotateZ(Math.PI / 2 + 0.45); g.add(leaf); }
    addTo(g, new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), mat(0x6b4f2a)), top.x, top.y - 0.1, top.z);
  } else {
    addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.8, 10), mat(0x7a5532)), 0, 0.9, 0);
    const lm = [mat(0x3f8f3a), mat(0x4fa346), mat(0x2f7a33)];
    [[0, 2.5, 0, 1.15], [0.7, 2.2, 0.3, 0.8], [-0.65, 2.25, -0.2, 0.85], [0.1, 3.15, -0.1, 0.8], [-0.2, 2.2, 0.7, 0.7]].forEach(([a, b, c, r], i) => addTo(g, new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), lm[i % 3]), a, b, c));
  }
  return g;
}
function bench(x, z, ry = 0) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; world.add(g);
  const wood = mat(0x9a5b2b), iron = mat(0x1f2937);
  for (let i = 0; i < 3; i++) addTo(g, new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.12), wood), 0, 0.45, -0.16 + i * 0.15);
  for (let i = 0; i < 2; i++) { const b = addTo(g, new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 0.03), wood), 0, 0.62 + i * 0.16, -0.27); b.rotation.x = -0.12; }
  [-0.8, 0.8].forEach(dx => { addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.45), iron), dx, 0.225, 0); addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.45, 0.05), iron), dx, 0.67, -0.27); });
  return g;
}
function lamp(x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); world.add(g);
  const iron = mat(0x1f2937);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.3, 10), iron), 0, 0.15, 0);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 3.4, 8), iron), 0, 1.85, 0);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.12, 0.28, 8), iron), 0, 3.66, 0);
  addTo(g, new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshStandardMaterial({ color: 0xfff7d6, emissive: 0xfde68a, emissiveIntensity: 0.9 })), 0, 3.48, 0);
  return g;
}
function camPole(x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; world.add(g);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 4.2, 8), mat(0x475569)), 0, 2.1, 0);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.5), mat(0x475569)), 0, 4.0, 0.25);
  const body = addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.45), mat(0xf1f5f9)), 0, 3.85, 0.5); body.rotation.x = 0.35;
  const lens = addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 12), mat(0x111827)), 0, 3.77, 0.74); lens.rotation.x = Math.PI / 2 + 0.35;
  addTo(g, new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), new THREE.MeshBasicMaterial({ color: 0xef4444 })), 0.08, 3.95, 0.66);
  return g;
}
function fountain() {
  const g = new THREE.Group();
  const stone = mat(0xcbd5e1), stone2 = mat(0x94a3b8);
  const water = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75, roughness: 0.15, metalness: 0.1 });
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.8, 0.5, 32, 1, true), stone), 0, 0.25, 0).material.side = THREE.DoubleSide;
  addTo(g, new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.1, 8, 40).rotateX(Math.PI / 2), stone2), 0, 0.5, 0);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(1.68, 1.68, 0.05, 32), water), 0, 0.38, 0);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.2, 16), stone), 0, 0.9, 0);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.3, 0.22, 24), stone2), 0, 1.5, 0);
  addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.04, 24), water), 0, 1.6, 0);
  const jet = addTo(g, new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.8, 12, 1, true), new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.6 })), 0, 2.0, 0);
  jet.rotation.x = Math.PI; g.userData.jet = jet;
  return g;
}
/* elemento propio del sector: fuente (parque) o kiosco/edificio con su ícono */
function propOtro() {
  const g = new THREE.Group();
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 1.6), mat(0xa8a29e)), 0, 0.15, 0);
  [-1.05, 1.05].forEach(dx => [-0.65, 0.65].forEach(dz => addTo(g, new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.1, 8), mat(0x1B4D22)), dx, 1.35, dz)));
  const roof = addTo(g, new THREE.Mesh(new THREE.ConeGeometry(1.7, 0.7, 4), mat(0xF2E21B)), 0, 2.75, 0); roof.rotation.y = Math.PI / 4; roof.scale.z = 0.7;
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.9, 1.2), mat(0xe7e5e4)), 0, 0.75, 0);
  const ic = glyphSprite('🧺', 1.0); ic.position.set(0, 3.6, 0); g.add(ic); g.userData.icon = ic;
  return g;
}
function booth() {
  const g = new THREE.Group(); g.position.set(BOOTH[0], 0, BOOTH[1]); world.add(g);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.15, 2.8), mat(0x9ca3af)), 0, 0.075, 0);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.5, 2.4), mat(0x1B4D22)), 0, 1.4, 0);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.22, 2.44), mat(0xF2E21B)), 0, 2.2, 0);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.18, 2.9), mat(0x2E8B2E)), 0, 2.75, 0);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.25), mat(0x2563eb)), -0.5, 2.93, 0); // luz de patrullaje
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.25), mat(0xdc2626)), 0.5, 2.93, 0);
  const glass = new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.7, roughness: 0.1 });
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.75, 0.04), glass), -0.25, 1.55, 1.21);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.75, 1.4), glass), 1.21, 1.55, 0);
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.06, 0.35), mat(0xd6d3d1)), -0.25, 1.1, 1.36); // mostrador
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.9, 0.05), mat(0x14532d)), 0.75, 1.1, 1.22);
  const rot = canvasTex(512, 96); rot.ctx.fillStyle = '#F2E21B'; rot.ctx.fillRect(0, 0, 512, 96); rot.ctx.fillStyle = '#1B4D22'; rot.ctx.font = 'bold 50px Nunito, sans-serif'; rot.ctx.textAlign = 'center'; rot.ctx.textBaseline = 'middle'; rot.ctx.fillText('UPC · SEGURIDAD', 256, 50); rot.tex.needsUpdate = true;
  addTo(g, new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.22), new THREE.MeshBasicMaterial({ map: rot.tex })), 0, 2.2, 1.225);
  const r2 = addTo(g, new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.22), new THREE.MeshBasicMaterial({ map: rot.tex })), 1.225, 2.2, 0); r2.rotation.y = Math.PI / 2;
  // radio sobre el mostrador
  const radio = new THREE.Group(); radio.position.set(-0.7, 1.13, 1.38); g.add(radio);
  addTo(radio, new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.14), mat(0x111827)), 0, 0.1, 0);
  addTo(radio, new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), mat(0x6b7280)), -0.08, 0.1, 0.071);
  addTo(radio, new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.06), new THREE.MeshBasicMaterial({ color: 0x86efac })), 0.08, 0.13, 0.071);
  addTo(radio, new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.35, 6), mat(0x111827)), 0.13, 0.37, 0);
  const ic = glyphSprite('📻', 0.4); ic.position.set(0, 0.65, 0); radio.add(ic); parts.radioIcon = ic;
  parts.radio = radio;
  return g;
}
const PASEO = [ // personas que pasean por los senderos: [emoji, recorrido(t) → [x,z]], velocidad m/s
  ['🚶🏽‍♀️', t => { const R = 3.6, a = t / R; return [FUENTE[0] + Math.cos(a) * R, FUENTE[1] + Math.sin(a) * R]; }, 0.8],
  ['🧍🏻', t => { const L = 8, u = (t % (2 * L)); return [-4.2, u < L ? -4 + u : -4 + 2 * L - u]; }, 0.7],
  ['🧑🏽‍🦯', t => { const L = 13, u = (t % (2 * L)); const x = u < L ? -6.5 + u : -6.5 + 2 * L - u; return [x, 4.6]; }, 0.45]
];

function build() {
  builtFor = 'vig';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.cola = []; sprites.paseo = [];
  // césped con borde, plaza adoquinada y senderos
  const cesped = new THREE.Mesh(new THREE.BoxGeometry(GW, 0.1, GD), mat(0x6fae4c)); cesped.position.y = -0.05; cesped.name = 'floor'; world.add(cesped); parts.floor = cesped;
  const at = canvasTex(256, 256); at.ctx.fillStyle = '#d6d3d1'; at.ctx.fillRect(0, 0, 256, 256); at.ctx.strokeStyle = 'rgba(100,90,80,.28)'; at.ctx.lineWidth = 2;
  for (let i = 0; i <= 8; i++) { at.ctx.beginPath(); at.ctx.moveTo(0, i * 32); at.ctx.lineTo(256, i * 32); at.ctx.stroke(); for (let j = 0; j < 8; j++) { at.ctx.beginPath(); at.ctx.moveTo(j * 32 + (i % 2) * 16, i * 32); at.ctx.lineTo(j * 32 + (i % 2) * 16, i * 32 + 32); at.ctx.stroke(); } }
  at.tex.wrapS = at.tex.wrapT = THREE.RepeatWrapping; at.tex.repeat.set(8, 6); at.tex.needsUpdate = true;
  const plaza = new THREE.Mesh(new THREE.BoxGeometry(13, 0.04, 9), new THREE.MeshStandardMaterial({ map: at.tex, roughness: 0.95 })); plaza.position.set(0, 0.02, 0); world.add(plaza);
  const sm = mat(0xc4b5a0);
  [[2, GD, FUENTE[0], 0], [GW, 1.6, 0, 4.6]].forEach(([w, d, x, z]) => { const s = new THREE.Mesh(new THREE.BoxGeometry(w, 0.05, d), sm); s.position.set(x, 0.021, z); world.add(s); });
  // seto perimetral
  const seto = mat(0x2f7a33);
  [[10.2, -4.9], [7.8, 6.1]].forEach(([w, x]) => [-GD / 2 + 0.25, GD / 2 - 0.25].forEach(z => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.7, 0.5), seto); m.position.set(x, 0.35, z); world.add(m); }));
  [[10.8, -1.6], [1.6, 6.2]].forEach(([d, z]) => [-GW / 2 + 0.25, GW / 2 - 0.25].forEach(x => { const m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, d), seto); m.position.set(x, 0.35, z); world.add(m); }));
  // calles y edificios alrededor del parque (se ocultan en la miniatura de RA)
  const entorno = new THREE.Group(); entorno.name = 'entorno'; world.add(entorno); parts.entorno = entorno;
  const calle = new THREE.Mesh(new THREE.PlaneGeometry(44, 38).rotateX(-Math.PI / 2), mat(0x4b5563)); calle.position.y = -0.11; entorno.add(calle);
  const vereda = new THREE.Mesh(new THREE.BoxGeometry(GW + 3, 0.12, GD + 3), mat(0xd1d5db)); vereda.position.y = -0.1; entorno.add(vereda);
  const fach = [0xf5e6c8, 0xdbeafe, 0xfde68a, 0xe2e8f0, 0xfecaca].map(c => { const t = canvasTex(256, 256); t.ctx.fillStyle = '#' + c.toString(16).padStart(6, '0'); t.ctx.fillRect(0, 0, 256, 256); for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { t.ctx.fillStyle = '#475569'; t.ctx.fillRect(22 + k * 58, 20 + r * 60, 36, 40); t.ctx.fillStyle = '#93c5fd'; t.ctx.fillRect(25 + k * 58, 23 + r * 60, 30, 34); } t.tex.wrapS = t.tex.wrapT = THREE.RepeatWrapping; return new THREE.MeshStandardMaterial({ map: t.tex, roughness: 0.9 }); });
  [[-14, -15, 6, 9], [-6, -15, 7, 6], [2.5, -15, 6, 12], [10.5, -15, 7, 7], [18, -15, 6, 10], [-18, -6, 6, 8], [-18, 2, 6, 6], [-18, 10, 6, 11]].forEach(([x, z, w, h], i) => {
    const m = fach[i % fach.length].clone(); m.map = m.map.clone(); m.map.repeat.set(w / 4, h / 4); m.map.needsUpdate = true;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 6), m); b.position.set(x, h / 2 - 0.1, z); entorno.add(b);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.25, 6.2), mat(0x64748b)); roof.position.set(x, h - 0.1, z); entorno.add(roof);
  });
  // UPC / caseta de vigilancia con radio
  booth();
  // postes con cámaras de videovigilancia
  [[-1.8, -4.5, 0.4], [5.7, -3.6, -0.8], [5.7, 3.6, -2.4]].forEach(([x, z, r]) => camPole(x, z, r));
  // luminarias
  [[-0.2, -5.5], [-0.2, 3.4], [2.6, -5.5], [2.6, 3.4], [-6.5, 3.4], [7.5, 3.4], [-3.6, 5.9], [5.5, 5.9]].forEach(([x, z]) => lamp(x, z));
  // bancas
  [[-1.8, 2.7, 0], [4.2, 2.7, 0], [-2.9, -1.8, Math.PI / 2], [5.4, -1.5, -Math.PI / 2], [-5, 3.2, 0]].forEach(([x, z, r]) => bench(x, z, r));
  // árboles y palmeras
  [[-8.2, 5.2, 1.1, 0], [8.2, -5.4, 1.2, 0], [8.2, 5.4, 1, 1], [-8.2, -0.6, 1, 1], [-8.3, -5.4, 1.2, 0], [4.2, -5.6, 1, 1], [8.3, 0.2, 1.1, 0], [-3.4, -5.6, 0.9, 0]].forEach(([x, z, s, p]) => tree(x, z, s, !!p));
  // macizos de flores alrededor de la fuente
  const flor = [mat(0xF2E21B), mat(0xef4444), mat(0xf472b6)];
  const hoja = mat(0x3f8f3a), bushG = new THREE.SphereGeometry(0.26, 12, 8), florG = new THREE.SphereGeometry(0.06, 8, 6);
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2, x = FUENTE[0] + Math.cos(a) * 2.3, z = FUENTE[1] + Math.sin(a) * 2.3;
    const b = new THREE.Mesh(bushG, hoja); b.scale.y = 0.75; b.position.set(x, 0.2, z); world.add(b);
    for (let k = 0; k < 4; k++) { const f = new THREE.Mesh(florG, flor[(i + k) % 3]); const u = k / 4 * Math.PI * 2 + i; f.position.set(x + Math.cos(u) * 0.16, 0.36, z + Math.sin(u) * 0.16); world.add(f); }
  }
  // elemento propio del sector
  sprites.prop = new THREE.Group(); sprites.prop.position.set(FUENTE[0], 0, FUENTE[1]); world.add(sprites.prop);
  parts.fuente = fountain(); sprites.prop.add(parts.fuente);
  parts.kiosco = propOtro(); sprites.prop.add(parts.kiosco);
  sprites.prop.userData.draw = e => { sprites.prop.userData.cur = e; parts.fuente.visible = e === '⛲'; parts.kiosco.visible = e !== '⛲'; if (e !== '⛲') parts.kiosco.userData.icon.userData.draw(e); };
  sprites.prop.userData.draw('⛲');
  // personas que pasean
  PASEO.forEach(([e, fn, v], i) => { const h = makeHuman(e, { state: 'walk' }); h.userData.setState('walk'); h.userData.paseo = { fn, v, t: i * 7 }; world.add(h); sprites.paseo.push(h); });
  // agente, incidente actual y reportante
  sprites.agente = makeHuman('👮🏽', { height: 1.75 }); sprites.agente.position.set(AG_BASE[0], 0, AG_BASE[1]); sprites.agente.userData.target = new THREE.Vector3(AG_BASE[0], 0, AG_BASE[1]); world.add(sprites.agente);
  sprites.actual = emoji('🙂', 1.0); sprites.actual.position.set(ACTUAL_POS[0], 2.3, ACTUAL_POS[1]); world.add(sprites.actual);
  sprites.quien = makeHuman('🙂', { height: 1.68 }); sprites.quien.position.set(QUIEN_POS[0], 0, QUIEN_POS[1]); sprites.quien.rotation.y = -Math.PI / 2; world.add(sprites.quien);
  const ringG = new THREE.RingGeometry(0.45, 0.62, 32).rotateX(-Math.PI / 2);
  for (let i = 0; i < 10; i++) {
    const sp = emoji('⚠️', 1.1); world.add(sp); const st = emoji('🔴', 0.32); world.add(st);
    const ring = new THREE.Mesh(ringG, new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.85 })); world.add(ring);
    const pin = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 8), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 })); pin.rotation.x = Math.PI; world.add(pin);
    sprites.cola.push({ sp, st, ring, pin });
  }
  sprites.cerrado = emoji('🔒', 0.7); sprites.cerrado.position.set(BOOTH[0], 3.7, BOOTH[1]); world.add(sprites.cerrado);
  const lt = canvasTex(512, 128); parts.label = lt;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt.tex, transparent: true })); ls.scale.set(5.2, 1.3, 1); ls.position.set(0, 5.6, -GD / 2 + 0.5); world.add(ls);
  parts.labelKey = '';
}

const SPOTS3 = [[-3.0, 0.8], [4.4, 0.4], [-5.6, -1.0], [4.0, -3.4], [-1.2, -4.4], [6.4, 1.8], [-6.6, 1.6], [-0.6, 3.6], [7.0, -2.4], [-1.0, -3.0]];
function sync() {
  const e = App.escena(); if (!e) return;
  if (builtFor !== 'vig') build();
  if (sprites.prop.userData.cur !== e.prop) sprites.prop.userData.draw(e.prop);
  const a = sprites.actual, w = sprites.quien;
  if (e.actual && a.userData.cur !== e.actual) a.userData.draw(e.actual);
  if (e.quien) w.userData.draw(e.quien);
  a.visible = !!e.actual; w.visible = !!e.quien;
  const [tx, tz] = e.actual ? AG_ATENDER : AG_BASE; sprites.agente.userData.target.set(tx, 0, tz);
  sprites.cola.forEach((q, i) => {
    const c = e.cola[i]; q.sp.visible = q.st.visible = q.ring.visible = q.pin.visible = !!c;
    if (!c) return;
    if (q.sp.userData.cur !== c.avatar) q.sp.userData.draw(c.avatar);
    const st = c.prio ? '🔴' : '🟡'; if (q.st.userData.cur !== st) q.st.userData.draw(st);
    const col = c.prio ? 0xef4444 : 0xf59e0b; q.ring.material.color.set(col); q.pin.material.color.set(col);
    const [x, z] = SPOTS3[i]; q.sp.position.set(x, 2.4, z); q.st.position.set(x + 0.55, 3.05, z); q.ring.position.set(x, 0.05, z); q.pin.position.set(x, 1.55, z);
  });
  sprites.cerrado.visible = !e.abierta;
  const key = e.hora + e.abierta + e.sector;
  if (parts.labelKey !== key) {
    parts.labelKey = key; const { ctx, tex } = parts.label;
    ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = 'rgba(255,255,255,.92)'; roundRect(ctx, 4, 4, 504, 120, 24); ctx.fill();
    ctx.fillStyle = '#1B4D22'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 30px Nunito, sans-serif'; ctx.fillText(e.sector, 256, 42);
    ctx.font = `bold 36px Nunito, ${EMOJI_FONT}`; ctx.fillText(`🕑 ${e.hora}`, 256, 90); tex.needsUpdate = true;
  }
  drawHud();
}

function drawHud() {
  const show = mode === 'xr' && !domOverlay && placed; hud.visible = show; if (!show) return;
  const d = App.getHud(); const btns = d.buttons.slice(0, 9);
  const key = d.text + btns.map(b => b.label + b.disabled).join('|') + d.busy + scaleMode; if (key === hudKey) return; hudKey = key;
  const ctx = hudCtx, W = 1024, H = 1100; ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(16,48,22,.92)'; roundRect(ctx, 0, 0, W, H, 36); ctx.fill();
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
  world.scale.setScalar(scaleMode === 'table' ? 0.04 : 1); if (parts.entorno) parts.entorno.visible = scaleMode !== 'table';
  root.visible = true; placed = true; reticle.visible = false; hudKey = '';
  hud.position.copy(_v).addScaledVector(_f, 0.75);
  $('#xr-status').textContent = 'Sector colocado. Usa el panel para atender los incidentes.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; hud.visible = false; $('#xr-status').textContent = 'Toca para colocar de nuevo la escena.'; }
  App.toast(scaleMode === 'table' ? 'Sector en miniatura' : 'Sector a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

const orbit = { theta: 0.5, phi: 0.98, r: 18, target: new THREE.Vector3(0, 0.5, 0) };
function updateOrbit() { const o = orbit; camera.position.set(o.target.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), o.target.y + o.r * Math.cos(o.phi), o.target.z + o.r * Math.sin(o.phi) * Math.cos(o.theta)); camera.lookAt(o.target); }
function setupPointer(cv) {
  const pts = new Map(); let pinch = null;
  cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
  cv.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return; const p = pts.get(e.pointerId); const dx = e.clientX - p.x, dy = e.clientY - p.y; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { orbit.theta -= dx * 0.008; orbit.phi = Math.min(1.45, Math.max(0.2, orbit.phi - dy * 0.006)); }
    else if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) orbit.r = Math.min(40, Math.max(4, orbit.r * pinch / d)); pinch = d; }
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); orbit.r = Math.min(40, Math.max(4, orbit.r * (1 + e.deltaY * 0.001))); }, { passive: false });
}
function resize() { if (!renderer || mode !== 'inline') return; const c = renderer.domElement; const w = c.clientWidth || 1, h = c.clientHeight || 1; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }

function animate(t, frame) {
  const dt = clock.getDelta(), time = clock.elapsedTime;
  if (sprites.actual) sprites.actual.position.y = 2.3 + Math.sin(time * 4) * 0.06;
  sprites.cola.forEach((q, i) => { if (q.sp.visible) { q.sp.position.y = 2.4 + Math.sin(time * 3 + i) * 0.06; q.ring.scale.setScalar(1 + Math.sin(time * 4 + i) * 0.08); q.pin.position.y = 1.55 + Math.sin(time * 3 + i) * 0.06; } });
  if (parts.fuente && parts.fuente.visible) parts.fuente.userData.jet.scale.y = 1 + Math.sin(time * 6) * 0.12;
  sprites.paseo.forEach(h => { const pz = h.userData.paseo; pz.t += dt * pz.v; const [x, z] = pz.fn(pz.t); const dx = x - h.position.x, dz = z - h.position.z; if (dx * dx + dz * dz > 1e-6) h.rotation.y = Math.atan2(dx, dz); h.position.set(x, 0, z); });
  const ag = sprites.agente;
  if (ag) {
    const tg = ag.userData.target, dx = tg.x - ag.position.x, dz = tg.z - ag.position.z, d = Math.hypot(dx, dz);
    if (d > 0.05) { const k = Math.min(d, dt * 1.6); ag.position.x += dx / d * k; ag.position.z += dz / d * k; ag.rotation.y = Math.atan2(dx, dz); if (!ag.userData.walking) { ag.userData.walking = true; ag.userData.setState('walk'); } }
    else if (ag.userData.walking) { ag.userData.walking = false; ag.userData.setState('idle'); ag.rotation.y = sprites.quien.visible ? Math.PI / 2 : 0.4; }
    if (!ag.userData.walking && sprites.quien.visible) { const ph = Math.sin(time * 0.8); if (ph > 0.3) ag.userData.talk(0.3); else if (ph < -0.3) sprites.quien.userData.talk(0.3); }
  }
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
  root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; if (parts.entorno) parts.entorno.visible = true;
  scene.background = new THREE.Color(0xcfe8f7);
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
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xcfe8f7) : null; root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { vr.exit(); if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

/* gafas sencillas tipo VR Box (cardboard) */
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(16,48,22,.94)', view: { pos: [1.2, 1.65, 6.0], target: [0, 1.0, -1.0] },
  prepare: () => { if (mode === 'inline') stopInline(); init(); build(); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; if (parts.entorno) parts.entorno.visible = true; scene.background = new THREE.Color(0xcfe8f7); }
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
window.Vig3D = { stopAll };
