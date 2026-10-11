/* =========================================================
   Obra en 3D y Realidad Aumentada – Simulador de Obra
   - La vivienda se construye por etapas según el avance de la obra
   - Escena a escala real con la cuadrilla en 3D, cerramiento,
     materiales, letreros y lluvia animada
   - Modo «Recorrer» en primera persona (kit isty-3d)
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';
import { glyphSprite, makeHuman, updateHumans, createWalker } from '../../js/isty-3d.js';

const App = window.ObraApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null, walker = null, hemi = null;
const parts = {}; const sprites = { crew: [], rain: null, ground: null, permisoDraw: null, permisoKey: '', aid: null, snap: false };
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();

/* escala: la maqueta original (columnas cada 1,2 u) se amplía a medidas reales (≈ 2,6 m entre ejes) */
const S = 2.2;

function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return { c, ctx, tex }; }
/* ícono ilustrado del kit (misma API que el antiguo sprite de emoji) */
function emoji(e, scale = 0.4, size = 160) {
  const sp = glyphSprite(e, scale, size); const d = sp.userData.draw;
  sp.userData.draw = x => { sp.userData.cur = x; d(x); }; sp.userData.cur = e;
  return sp;
}
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function wrap(ctx, t, w) { const out = []; let l = ''; for (const word of String(t).split(/\s+/)) { const n = l ? l + ' ' + word : word; if (ctx.measureText(n).width > w && l) { out.push(l); l = word; } else l = n; } if (l) out.push(l); return out; }
const matCache = new Map();
const mat = (c, rough = 0.85, extra) => { const k = c + '|' + rough + (extra ? JSON.stringify(extra) : ''); if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial({ color: c, roughness: rough, ...(extra || {}) })); return matCache.get(k); };
const M = m => (typeof m === 'number' || typeof m === 'string' ? mat(m) : m);
function box(w, h, d, m, x = 0, y = 0, z = 0, parent) { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M(m)); o.position.set(x, y, z); if (parent) parent.add(o); return o; }
function cyl(rt, rb, h, m, x = 0, y = 0, z = 0, parent, seg = 16) { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), M(m)); o.position.set(x, y, z); if (parent) parent.add(o); return o; }

/* ---------- utilería ---------- */
function tree(x, z, h = 4, parent = world) {
  const t = new THREE.Group();
  cyl(0.12 * h / 4, 0.18 * h / 4, h * 0.45, 0x6b4423, 0, h * 0.22, 0, t, 8);
  const leaf = new THREE.MeshStandardMaterial({ color: [0x2f7d32, 0x3f8f3a, 0x276b2b][Math.abs(Math.round(x * 3 + z)) % 3], roughness: 0.9, flatShading: true });
  [[0, 0.62, 0, 0.36], [0.18, 0.5, 0.1, 0.27], [-0.16, 0.52, -0.08, 0.26], [0, 0.82, 0, 0.24]].forEach(([dx, dy, dz, r]) => { const s = new THREE.Mesh(new THREE.IcosahedronGeometry(r * h, 0), leaf); s.position.set(dx * h, dy * h, dz * h); t.add(s); });
  t.position.set(x, 0, z); t.rotation.y = x * 1.3; parent.add(t); return t;
}
function cone(x, z, parent = world) {
  const g = new THREE.Group();
  box(0.42, 0.04, 0.42, 0x111827, 0, 0.02, 0, g);
  const c = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.7, 16), mat(0xf97316, 0.5)); c.position.y = 0.37; g.add(c);
  cyl(0.1, 0.12, 0.1, 0xffffff, 0, 0.42, 0, g);
  g.position.set(x, 0, z); parent.add(g); return g;
}
let stripeTex = null;
function barrier(x, z, rot = 0, parent = world) {
  if (!stripeTex) { const { ctx, tex } = canvasTex(256, 32); for (let i = -1; i < 9; i++) { ctx.fillStyle = i % 2 ? '#ffffff' : '#ea580c'; ctx.beginPath(); ctx.moveTo(i * 32, 32); ctx.lineTo(i * 32 + 32, 32); ctx.lineTo(i * 32 + 64, 0); ctx.lineTo(i * 32 + 32, 0); ctx.fill(); } tex.needsUpdate = true; stripeTex = tex; }
  const g = new THREE.Group(), sm = new THREE.MeshStandardMaterial({ map: stripeTex, roughness: 0.6 });
  [0.95, 0.55].forEach(y => box(1.6, 0.2, 0.04, sm, 0, y, 0, g));
  [-0.7, 0.7].forEach(px => { box(0.06, 1.1, 0.06, 0x374151, px, 0.55, 0, g); box(0.08, 0.04, 0.6, 0x374151, px, 0.02, 0, g); });
  g.position.set(x, 0, z); g.rotation.y = rot; parent.add(g); return g;
}
function plate(text, sub, w, h, colors = ['#1B4D22', '#F2E21B', '#ffffff']) {
  const { ctx, tex } = canvasTex(512, Math.round(512 * h / w)); const H = ctx.canvas.height;
  const draw = (t, st, col) => {
    ctx.clearRect(0, 0, 512, H);
    ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, 512, H); ctx.fillStyle = colors[1]; ctx.fillRect(0, H - 34, 512, 34);
    ctx.fillStyle = colors[2]; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lines = String(t).split('\n'); ctx.font = `bold ${Math.min(58, (H - 60) / lines.length * 0.8)}px Nunito, sans-serif`;
    lines.forEach((l, i) => ctx.fillText(l, 256, (H - 34) / (lines.length + 1) * (i + 1) + 4));
    ctx.fillStyle = col || colors[0]; ctx.font = 'bold 22px Nunito, sans-serif'; ctx.fillText(st || '', 256, H - 16); tex.needsUpdate = true;
  };
  draw(text, sub);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex })); m.userData.draw = draw; return m;
}
function signPost(plateMesh, x, z, rot = 0, y = 1.6, parent = world) {
  const g = new THREE.Group(); const w = plateMesh.geometry.parameters.width;
  plateMesh.position.set(0, y, 0.03); g.add(plateMesh);
  box(w + 0.08, plateMesh.geometry.parameters.height + 0.08, 0.04, 0x374151, 0, y, 0, g);
  [-1, 1].forEach(s => cyl(0.04, 0.04, y + plateMesh.geometry.parameters.height / 2, 0x6b7280, s * (w / 2 - 0.1), (y + plateMesh.geometry.parameters.height / 2) / 2, -0.04, g, 8));
  g.position.set(x, 0, z); g.rotation.y = rot; parent.add(g); return g;
}
/* cerramiento perimetral con malla verde institucional; hueco de acceso al frente */
function fence(w, d, gap) {
  const g = new THREE.Group(); world.add(g);
  const mesh = new THREE.MeshStandardMaterial({ color: 0x1B4D22, roughness: 0.9, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false });
  const run = (x1, z1, x2, z2) => {
    const L = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.round(L / 2.5));
    const p = new THREE.Mesh(new THREE.PlaneGeometry(L, 1.8), mesh); p.position.set((x1 + x2) / 2, 1.0, (z1 + z2) / 2); p.rotation.y = -Math.atan2(z2 - z1, x2 - x1); g.add(p);
    for (let i = 0; i <= n; i++) cyl(0.04, 0.04, 2.0, 0x9ca3af, x1 + (x2 - x1) * i / n, 1.0, z1 + (z2 - z1) * i / n, g, 6);
  };
  run(-w / 2, -d / 2, w / 2, -d / 2); run(-w / 2, -d / 2, -w / 2, d / 2); run(w / 2, -d / 2, w / 2, d / 2);
  run(-w / 2, d / 2, -gap / 2, d / 2); run(gap / 2, d / 2, w / 2, d / 2);
  return g;
}
function mixer(x, z, parent) {
  const g = new THREE.Group();
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.9, 16), mat(0xf97316, 0.5)); drum.rotation.z = 1.0; drum.position.set(0, 1.0, 0); g.add(drum);
  box(1.2, 0.08, 0.5, 0x374151, 0, 0.55, 0, g);
  [-0.45, 0.45].forEach(px => cyl(0.03, 0.03, 0.55, 0x374151, px, 0.27, 0.2, g, 6));
  const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 14).rotateX(Math.PI / 2), mat(0x111827)); wh.position.set(0, 0.22, -0.3); g.add(wh);
  g.position.set(x, 0, z); g.rotation.y = 0.6; parent.add(g); return g;
}
function pallet(x, z, parent) {
  const g = new THREE.Group(); box(1.2, 0.14, 1.0, 0x9a6b3a, 0, 0.07, 0, g);
  const b = mat(0xc2410c, 0.9);
  for (let l = 0; l < 4; l++) for (let i = 0; i < 4; i++) box(0.28, 0.18, 0.95, b, -0.45 + i * 0.3, 0.24 + l * 0.19, 0, g);
  g.position.set(x, 0, z); parent.add(g); return g;
}
function wheelbarrow(x, z, parent) {
  const g = new THREE.Group();
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.3, 0.3, 4, 1, true), new THREE.MeshStandardMaterial({ color: 0x2E8B2E, roughness: 0.5, side: THREE.DoubleSide })); tray.rotation.y = Math.PI / 4; tray.scale.set(1, 1, 0.7); tray.position.y = 0.55; g.add(tray);
  const wh = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.05, 8, 18), mat(0x111827)); wh.position.set(0, 0.2, 0.55); wh.rotation.y = Math.PI / 2; g.add(wh);
  [-0.22, 0.22].forEach(px => { const h = cyl(0.02, 0.02, 1.3, 0x6b7280, px, 0.45, -0.1, g, 6); h.rotation.x = 1.3; });
  g.position.set(x, 0, z); g.rotation.y = -0.8; parent.add(g); return g;
}
function aidKit() { const g = new THREE.Group(); box(0.45, 0.3, 0.2, 0xffffff, 0, 0.15, 0, g); box(0.25, 0.07, 0.21, 0xdc2626, 0, 0.17, 0, g); box(0.07, 0.25, 0.21, 0xdc2626, 0, 0.17, 0, g); return g; }

/* lluvia con segmentos de línea */
function makeRain() {
  const N = 1400, pos = new Float32Array(N * 6);
  for (let i = 0; i < N; i++) { const x = (Math.random() - 0.5) * 22, y = Math.random() * 11, z = (Math.random() - 0.5) * 16; pos.set([x, y, z, x + 0.03, y - 0.45, z + 0.02], i * 6); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const l = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0x9fb6cc, transparent: true, opacity: 0.6, depthWrite: false }));
  l.frustumCulled = false; l.visible = false; return l;
}
function stepRain(dt) {
  const r = sprites.rain; if (!r || !r.visible) return;
  const a = r.geometry.attributes.position, p = a.array, v = 9 * dt;
  for (let i = 0; i < p.length; i += 6) { p[i + 1] -= v; p[i + 4] -= v; if (p[i + 4] < 0) { p[i + 1] += 11; p[i + 4] += 11; } }
  a.needsUpdate = true;
}

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.05, 200);
  hemi = new THREE.HemisphereLight(0xffffff, 0x667788, 2.2); scene.add(hemi);
  const dl = new THREE.DirectionalLight(0xffffff, 1.5); dl.position.set(8, 14, 6); scene.add(dl);
  root = new THREE.Group(); scene.add(root);
  world = new THREE.Group(); root.add(world);
  reticle = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);
  const h = canvasTex(1024, 1100); hudCtx = h.ctx; hudTex = h.tex;
  hud = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.46 * 1100 / 1024), new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, depthTest: false }));
  hud.renderOrder = 20; hud.visible = false; scene.add(hud);
  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    c.addEventListener('select', () => onSelect(c));
    c.addEventListener('connected', e => { if (e.data.targetRayMode === 'tracked-pointer') { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0xef4444 })); l.scale.z = 3; l.name = 'ray'; c.add(l); } });
    scene.add(c);
  }
  App.subscribe(() => { if (mode) sync(); });
  addEventListener('resize', resize);
  setupPointer(canvas);
  walker = createWalker({
    getCamera: () => camera, canvas, container: $('#view3d'), getWorld: () => sprites.ground || world, eye: 1.62, speed: 2.2,
    targets: walkTargets, interact: walkInteract
  });
}

/* ---------- personas 3D con desplazamiento ---------- */
function person(av) {
  const w = new THREE.Group(); const h = makeHuman(av, { height: 1.72 }); w.add(h);
  w.userData.human = h; w.userData.goal = null; return w;
}
function setShadow(h, on) { h.traverse(o => { if (o.isMesh && o.geometry.type === 'CircleGeometry' && o.material.transparent) o.material.opacity = on ? 0.16 : 0; }); }
function setGoal(w, goal, snap) {
  const h = w.userData.human, prev = w.userData.goal;
  const poseChanged = !prev || prev.pose !== goal.pose;
  w.userData.goal = goal;
  if (snap || poseChanged || !(mode === 'inline' || mode === 'xr')) { w.position.set(goal.x, 0, goal.z); w.rotation.y = goal.face || 0; }
  const lie = goal.pose === 'lie';
  h.rotation.x = lie ? -Math.PI / 2 : 0; h.position.set(0, lie ? 0.14 : 0, lie ? 0.85 : 0);
  setShadow(h, !lie);
  if (poseChanged || snap) h.userData.setState('idle');
}
const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
const faceTo = (x, z, tx, tz) => Math.atan2(tx - x, tz - z);
const _d = new THREE.Vector3();
function stepPeople(dt) {
  sprites.crew.forEach(w => {
    const g = w.userData.goal; if (!g) return; const h = w.userData.human;
    _d.set(g.x - w.position.x, 0, g.z - w.position.z); const dist = _d.length();
    if (dist > 0.05 && g.pose !== 'lie') {
      const step = Math.min(dist, dt * 1.6); _d.multiplyScalar(step / dist); w.position.add(_d);
      w.rotation.y += angDiff(Math.atan2(g.x - w.position.x, g.z - w.position.z), w.rotation.y) * Math.min(1, dt * 8);
      if (!w.userData.walking) { w.userData.walking = true; h.userData.setState('walk'); }
    } else {
      if (dist > 0) w.position.set(g.x, 0, g.z);
      if (w.userData.walking) { w.userData.walking = false; h.userData.setState('idle'); }
      w.rotation.y += angDiff(g.face || 0, w.rotation.y) * Math.min(1, dt * 4);
    }
  });
}

function build() {
  builtFor = 'obra';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.crew = []; sprites.permisoKey = '';
  const ground = new THREE.Mesh(new THREE.BoxGeometry(22, 0.05, 16), mat(0x8bbf6a, 0.95)); ground.position.y = -0.025; world.add(ground); sprites.ground = ground;
  box(22, 0.02, 2.2, 0x6b7280, 0, 0.01, 6.9, world); // calle
  box(22, 0.03, 0.5, 0xd6d3d1, 0, 0.015, 5.6, world); // vereda
  const lot = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.02, 10.2), mat(0xb08350, 1)); lot.position.set(0, 0.01, -0.3); world.add(lot);
  box(2.4, 0.025, 1.4, 0xa1a1aa, 0, 0.015, 5.0, world); // acceso
  fence(15, 10.6, 3.2).position.z = -0.3;
  const sitio = plate('OBRA EN\nCONSTRUCCIÓN', 'ISTY · LABORATORIO VIRTUAL', 2.2, 1.1); signPost(sitio, 4.2, 5.12, 0, 1.3);
  const epp = plate('USO OBLIGATORIO\nDE EPP', 'CASCO · CHALECO · BOTAS', 1.5, 0.9, ['#F2E21B', '#1B4D22', '#1B4D22']); epp.userData.draw('USO OBLIGATORIO\nDE EPP', 'CASCO · CHALECO · BOTAS', '#F2E21B'); signPost(epp, -3.6, 5.12, 0, 1.2);
  [[-8.5, -6.5], [-4, -7.2], [3, -7.3], [8.5, -6.8], [9.8, -2], [9.8, 3.2], [-9.8, 2.5], [-9.8, -2.5]].forEach(([x, z], i) => tree(x, z, 3.4 + (i % 3) * 0.7));
  [[-1.6, 5.4], [1.6, 5.4]].forEach(([x, z]) => cone(x, z));

  // la vivienda se modela en las unidades de la maqueta y se amplía a escala real
  const bld = new THREE.Group(); bld.scale.setScalar(S); world.add(bld);
  const xs = [-1.2, 0, 1.2], zs = [-0.8, 0.8];
  const grupo = (k, parent = bld) => { const g = new THREE.Group(); g.visible = false; parent.add(g); parts[k] = g; return g; };
  // 1 replanteo: estacas y piola
  const rep = grupo('replanteo');
  xs.forEach(x => zs.forEach(z => { const e = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.25, 0.03), mat(0x78350f)); e.position.set(x, 0.12, z); rep.add(e); }));
  const lineMat = new THREE.LineBasicMaterial({ color: 0xf43f5e });
  rep.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([[-1.2, -0.8], [1.2, -0.8], [1.2, 0.8], [-1.2, 0.8], [-1.2, -0.8]].map(([x, z]) => new THREE.Vector3(x, 0.2, z))), lineMat));
  // 2 cimentación: zapatas
  const cim = grupo('cimentacion');
  xs.forEach(x => zs.forEach(z => { const zp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.5), mat(0x9ca3af)); zp.position.set(x, 0.08, z); cim.add(zp); }));
  // 3 columnas y vigas planta baja
  const conc = mat(0xa8a29e, 0.9);
  const est1 = grupo('estructura1');
  xs.forEach(x => zs.forEach(z => { const c = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.1, 0.16), conc); c.position.set(x, 0.7, z); est1.add(c); }));
  const losa1 = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 1.9), conc); losa1.position.set(0, 1.31, 0); est1.add(losa1);
  // 4 losa y planta alta
  const est2 = grupo('estructura2');
  xs.forEach(x => zs.forEach(z => { const c = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1, 0.16), conc); c.position.set(x, 1.87, z); est2.add(c); }));
  const losa2 = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 1.9), conc); losa2.position.set(0, 2.43, 0); est2.add(losa2);
  // 5 mampostería (con vanos de puerta y ventanas en la fachada)
  const mam = grupo('mamposteria'); const brick = mat(0xe8a17a, 0.95);
  [[0, 0.7, -0.8, 2.4, 1.0, 0.1], [-1.2, 0.7, 0, 0.1, 1.0, 1.6], [1.2, 0.7, 0, 0.1, 1.0, 1.6],
   [0, 1.87, -0.8, 2.4, 0.9, 0.1], [-1.2, 1.87, 0, 0.1, 0.9, 1.6], [1.2, 1.87, 0, 0.1, 0.9, 1.6],
   // fachada planta baja: macizos alrededor de la puerta y las ventanas
   [-1.04, 0.7, 0.8, 0.12, 1.0, 0.1], [-0.4, 0.7, 0.8, 0.3, 1.0, 0.1], [0.4, 0.7, 0.8, 0.3, 1.0, 0.1], [1.04, 0.7, 0.8, 0.12, 1.0, 0.1],
   [-0.75, 0.32, 0.8, 0.45, 0.24, 0.1], [0.75, 0.32, 0.8, 0.45, 0.24, 0.1], [-0.75, 1.1, 0.8, 0.45, 0.2, 0.1], [0.75, 1.1, 0.8, 0.45, 0.2, 0.1], [0, 1.15, 0.8, 0.5, 0.1, 0.1],
   [-1.04, 1.87, 0.8, 0.12, 0.9, 0.1], [0, 1.87, 0.8, 1.1, 0.9, 0.1], [1.04, 1.87, 0.8, 0.12, 0.9, 0.1],
   [-0.75, 1.56, 0.8, 0.45, 0.28, 0.1], [0.75, 1.56, 0.8, 0.45, 0.28, 0.1], [-0.75, 2.22, 0.8, 0.45, 0.22, 0.1], [0.75, 2.22, 0.8, 0.45, 0.22, 0.1]
  ].forEach(([x, y, z, w, h, d]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), brick); m.position.set(x, y, z); mam.add(m); });
  // 6 instalaciones: tuberías y cables
  const ins = grupo('instalaciones');
  const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.2), mat(0x2563eb)); tubo.position.set(-1.12, 1.2, 0.86); ins.add(tubo);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2), mat(0xeab308)); cable.position.set(1.12, 1.2, 0.86); ins.add(cable);
  // 7 cubierta
  const cub = grupo('cubierta');
  const techo = new THREE.Mesh(new THREE.ConeGeometry(2.1, 0.8, 4), mat(0xb45309)); techo.rotation.y = Math.PI / 4; techo.scale.set(1, 1, 0.75); techo.position.set(0, 2.9, 0); cub.add(techo);
  // 8 acabados
  const aca = grupo('acabados'); const pintura = mat(0xfef3c7, 0.8);
  [[0, 0.7, -0.86, 2.42, 1.0, 0.02], [0, 1.87, -0.86, 2.42, 0.9, 0.02], [-1.26, 1.28, 0, 0.02, 2.17, 1.72], [1.26, 1.28, 0, 0.02, 2.17, 1.72]].forEach(([x, y, z, w, h, d]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), pintura); m.position.set(x, y, z); aca.add(m); });
  [[-1.04, 0.7, 0.12, 1.0], [-0.4, 0.7, 0.3, 1.0], [0.4, 0.7, 0.3, 1.0], [1.04, 0.7, 0.12, 1.0], [-1.04, 1.87, 0.12, 0.9], [0, 1.87, 1.1, 0.9], [1.04, 1.87, 0.12, 0.9]].forEach(([x, y, w, h]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.02), pintura); m.position.set(x, y, 0.86); aca.add(m); });
  const puerta = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.88, 0.03), mat(0x78350f)); puerta.position.set(0, 0.65, 0.84); aca.add(puerta);
  [-0.75, 0.75].forEach(x => [0.71, 1.89].forEach(y => { const v = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.5, 0.03), mat(0x7dd3fc, 0.15)); v.position.set(x, y, 0.82); aca.add(v); }));
  tree(2.9, -1.9, 4 / S, aca);
  // andamio durante la obra gris
  const anda = grupo('andamio');
  [-1.3, 0, 1.3].forEach(x => [1.05, 1.35].forEach(z => cyl(0.012, 0.012, 2.5, 0x2563eb, x, 1.25, z, anda, 6)));
  [0.95, 1.95].forEach(y => box(2.7, 0.03, 0.32, 0xb45309, 0, y, 1.2, anda));
  [0.95, 1.95].forEach(y => box(2.7, 0.012, 0.012, 0xF2E21B, 0, y + 0.35, 1.36, anda));
  // obra: barreras y materiales (en metros, fuera de la vivienda)
  const obraG = grupo('obra', world);
  barrier(-2.6, 4.4, 0, obraG); barrier(2.6, 4.4, 0, obraG);
  pallet(-5.6, 1.2, obraG); pallet(-5.6, -0.2, obraG);
  mixer(-5.2, -2.6, obraG); wheelbarrow(-4.2, -1.3, obraG);
  const sand = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.8, 18), mat(0xd6b46b, 1)); sand.position.set(5.2, 0.4, -2.6); obraG.add(sand);
  const grav = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.6, 14), mat(0x9ca3af, 1)); grav.position.set(5.4, 0.3, -0.6); obraG.add(grav);
  for (let i = 0; i < 6; i++) box(3.0, 0.05, 0.05, mat(0x6b7280, 0.4, { metalness: 0.6 }), 4.9, 0.05 + (i % 3) * 0.06, 1.2 + Math.floor(i / 3) * 0.1 + (i % 3) * 0.05, obraG); // varillas
  // letrero del permiso de construcción
  const per = plate('PERMISO DE\nCONSTRUCCIÓN', 'EN TRÁMITE', 1.5, 1.0, ['#ffffff', '#F2E21B', '#1B4D22']);
  const permiso = signPost(per, -6.0, 3.9, 0.35, 1.2); parts.permiso = permiso; sprites.permisoDraw = per.userData.draw;
  // botiquín (aparece junto a un trabajador lesionado)
  sprites.aid = aidKit(); sprites.aid.visible = false; world.add(sprites.aid);
  sprites.rain = makeRain(); world.add(sprites.rain);
  App.st.crew.forEach(c => { const w = person(c.avatar); world.add(w); sprites.crew.push(w); });
  const label = canvasTex(512, 96); label.ctx.fillStyle = 'rgba(255,255,255,.92)'; roundRect(label.ctx, 4, 4, 504, 88, 20); label.ctx.fill(); label.ctx.fillStyle = '#1B4D22'; label.ctx.font = 'bold 30px Nunito, sans-serif'; label.ctx.textAlign = 'center'; label.ctx.textBaseline = 'middle'; label.ctx.fillText('Vivienda de dos plantas', 256, 50); label.tex.needsUpdate = true;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: label.tex, transparent: true })); ls.scale.set(5, 0.94, 1); ls.position.set(0, 8.6, -3.2); world.add(ls);
  sprites.snap = true;
}

/* puestos de trabajo alrededor de la vivienda según la etapa */
const STATIONS = [[-1.6, 3.5], [1.9, 3.5], [-3.9, 0.4], [3.9, -0.9]];
function crewGoal(c, i, k, fin) {
  if (c.lesionado) return { x: -6.7 + i * 0.05, z: 2.9, face: 0, pose: 'lie' };
  if (k <= 1 || fin) { const x = (-1.9 + i * 0.35 + (i > 1 ? 3 : 0)) * S, z = 1.5 * S + 0.6; return { x, z, face: fin ? faceTo(x, z, 0, 0) : 0.0, pose: 'stand' }; }
  const [bx, bz] = STATIONS[i % 4], off = (((k * 37 + i * 13) % 5) - 2) * 0.45;
  const x = Math.abs(bz) > 2 ? bx + off : bx, z = Math.abs(bz) > 2 ? bz : bz + off;
  return { x, z, face: Math.abs(bz) > 2 ? Math.PI : (bx < 0 ? Math.PI / 2 : -Math.PI / 2), pose: 'stand' };
}

const ORDEN = ['replanteo', 'cimentacion', 'estructura1', 'estructura2', 'mamposteria', 'instalaciones', 'cubierta', 'acabados'];
function sync() {
  const s = App.st; if (!s) return;
  if (builtFor !== 'obra' || sprites.crew.length !== s.crew.length) build();
  const snap = sprites.snap; sprites.snap = false;
  const k = App.etapa();
  ORDEN.forEach((n, i) => { parts[n].visible = k >= i + 2; });
  if (parts.acabados.visible) parts.instalaciones.visible = false;
  parts.andamio.visible = k >= 5 && k <= 8 && !s.fin;
  parts.permiso.visible = k <= 1;
  const pk = s.permiso ? 'ok' : 'tr';
  if (pk !== sprites.permisoKey) { sprites.permisoKey = pk; sprites.permisoDraw('PERMISO DE\nCONSTRUCCIÓN', s.permiso ? '✔ APROBADO' : 'EN TRÁMITE', s.permiso ? '#1B4D22' : '#7c2d12'); }
  parts.obra.visible = !s.fin;
  sprites.rain.visible = !!s.lluvia;
  if (hemi) hemi.intensity = s.lluvia ? 1.5 : 2.2;
  if (scene && mode === 'inline') scene.background = new THREE.Color(s.lluvia ? 0xa9b8c6 : 0xe0f2fe);
  let hurt = null;
  s.crew.forEach((c, i) => {
    const w = sprites.crew[i], h = w.userData.human;
    if (h.userData.cur() !== c.avatar) h.userData.draw(c.avatar);
    const g = crewGoal(c, i, k, s.fin); setGoal(w, g, snap);
    if (c.lesionado) hurt = g;
  });
  sprites.aid.visible = !!hurt; if (hurt) sprites.aid.position.set(hurt.x + 0.65, 0, hurt.z + 0.25);
  drawHud();
}

/* ---------- modo Recorrer ---------- */
function walkTargets() {
  const s = App.st; if (!s || !sprites.crew.length) return [];
  const t = s.crew.map((c, i) => ({ obj: sprites.crew[i], label: (c.lesionado ? 'Atender a ' : 'Hablar con ') + c.nombre, kind: 'crew', i }));
  if (parts.permiso && parts.permiso.visible) t.push({ obj: parts.permiso, label: 'Revisar permiso', kind: 'permiso' });
  return t;
}
function walkInteract(t) {
  const s = App.st; if (!s) return;
  if (t.kind === 'crew') {
    const c = s.crew[t.i], w = t.obj, h = w.userData.human, cam = camera.position;
    h.userData.look(THREE.MathUtils.clamp(angDiff(Math.atan2(cam.x - w.position.x, cam.z - w.position.z), w.rotation.y), -1, 1)); h.userData.talk(2.5); setTimeout(() => h.userData.look(null), 3000);
    const est = c.lesionado ? 'lesionado, requiere atención' : s.epp ? 'con EPP completo' : 'EPP incompleto';
    App.toast(`${c.avatar} ${c.nombre} (${c.rol}): ${est}.`, 3800);
    if (App.speak) App.speak(c.lesionado ? 'Ingeniero, me lastimé; necesito atención.' : s.epp ? 'Listo, ingeniero. ¿Qué hacemos?' : 'Ingeniero, nos falta equipo de protección.', c.pitch || 1);
  } else if (t.kind === 'permiso') App.toast(s.permiso ? '📋 Permiso de construcción aprobado por el municipio.' : '📋 Permiso de construcción en trámite: no se debe iniciar la obra sin él.', 3800);
}

function drawHud() {
  const show = mode === 'xr' && !domOverlay && placed; hud.visible = show; if (!show) return;
  const d = App.getHud(); const btns = d.buttons.slice(0, 9);
  const key = d.text + btns.map(b => b.label + b.disabled).join('|') + d.busy + scaleMode; if (key === hudKey) return; hudKey = key;
  const ctx = hudCtx, W = 1024, H = 1100; ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(50,30,10,.92)'; roundRect(ctx, 0, 0, W, H, 36); ctx.fill();
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
  world.scale.setScalar(scaleMode === 'table' ? 0.12 / S : 1);
  root.visible = true; placed = true; reticle.visible = false; hudKey = '';
  hud.position.copy(_v).addScaledVector(_f, 0.75);
  $('#xr-status').textContent = 'Obra colocada. Usa el panel de indicaciones para dirigir la obra.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; hud.visible = false; $('#xr-status').textContent = 'Toca para colocar de nuevo la escena.'; }
  App.toast(scaleMode === 'table' ? 'Obra en miniatura' : 'Obra a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

const orbit = { theta: 0.45, phi: 1.02, r: 19, target: new THREE.Vector3(0, 1.6, 0.8) };
function updateOrbit() { const o = orbit; camera.position.set(o.target.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), o.target.y + o.r * Math.cos(o.phi), o.target.z + o.r * Math.sin(o.phi) * Math.cos(o.theta)); camera.lookAt(o.target); }
function setupPointer(cv) {
  const pts = new Map(); let pinch = null;
  cv.addEventListener('pointerdown', e => { try { cv.setPointerCapture(e.pointerId); } catch (_) { /* puntero sintético */ } pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
  cv.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return; const p = pts.get(e.pointerId); const dx = e.clientX - p.x, dy = e.clientY - p.y; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { orbit.theta -= dx * 0.008; orbit.phi = Math.min(1.45, Math.max(0.2, orbit.phi - dy * 0.006)); }
    else if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) orbit.r = Math.min(45, Math.max(4, orbit.r * pinch / d)); pinch = d; }
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); orbit.r = Math.min(45, Math.max(4, orbit.r * (1 + e.deltaY * 0.001))); }, { passive: false });
}
function resize() { if (!renderer || mode !== 'inline') return; const c = renderer.domElement; const w = c.clientWidth || 1, h = c.clientHeight || 1; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }

function animate(t, frame) {
  const dt = clock.getDelta(), time = clock.elapsedTime;
  stepRain(dt); void time;
  if (mode === 'inline' || mode === 'xr') { stepPeople(dt); updateHumans(world, dt); }
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
  scene.background = new THREE.Color(App.st && App.st.lluvia ? 0xa9b8c6 : 0xe0f2fe);
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
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(50,30,10,.94)', view: { pos: [1, 1.7, 12.5], target: [0, 2.5, 0] },
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
window.Obra3D = { stopAll };
