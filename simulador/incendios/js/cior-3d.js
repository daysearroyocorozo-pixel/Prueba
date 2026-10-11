/* =========================================================
   Escena 3D y Realidad Aumentada del Simulador de Emergencias
   - Vista 3D interactiva (computadora y celular) a escala real:
     bomberos y víctimas en 3D, fuego y humo animados
   - Modo «Recorrer» en primera persona (kit isty-3d)
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las órdenes)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';
import { glyphSprite, makeHuman, updateHumans, createWalker } from '../../js/isty-3d.js';

const App = window.CiorApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null, walker = null;
const sprites = { fire: [], crew: [], vic: [], rings: [], stretchers: [], zones: null, smoke: [], amb: null, truck: null, post: null, ground: null, hose: null, glow: [], light: null };
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();

/* escala: la escena 2D (600×330) se convierte en un terreno de 24 × 13 m */
const S = 4;
const P = (x, y) => [(x - 330) / 100 * S, (y - 150) / 100 * S];

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
function box(w, h, d, m, x = 0, y = 0, z = 0, parent) { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof m === 'number' || typeof m === 'string' ? mat(m) : m); o.position.set(x, y, z); if (parent) parent.add(o); return o; }
function cyl(rt, rb, h, m, x = 0, y = 0, z = 0, parent, seg = 16) { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), typeof m === 'number' || typeof m === 'string' ? mat(m) : m); o.position.set(x, y, z); if (parent) parent.add(o); return o; }

/* ---------- texturas de efectos ---------- */
let flameTex = null, smokeTex = null;
function getFlameTex() {
  if (flameTex) return flameTex;
  const { c, ctx, tex } = canvasTex(128, 256);
  ctx.save();
  ctx.beginPath(); ctx.moveTo(64, 6); ctx.bezierCurveTo(98, 70, 124, 130, 118, 182); ctx.bezierCurveTo(112, 236, 16, 236, 10, 182); ctx.bezierCurveTo(4, 130, 30, 70, 64, 6); ctx.closePath(); ctx.clip();
  const g = ctx.createRadialGradient(64, 190, 4, 64, 170, 150);
  g.addColorStop(0, 'rgba(255,255,230,1)'); g.addColorStop(0.18, 'rgba(255,230,120,1)'); g.addColorStop(0.42, 'rgba(255,140,30,.95)'); g.addColorStop(0.7, 'rgba(220,60,10,.55)'); g.addColorStop(1, 'rgba(120,20,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 256); ctx.restore();
  // borde suave
  const e = ctx.createLinearGradient(0, 0, 0, 256); e.addColorStop(0, 'rgba(0,0,0,1)'); e.addColorStop(0.25, 'rgba(0,0,0,0)');
  ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = e; ctx.fillRect(0, 0, 128, 256); ctx.globalCompositeOperation = 'source-over';
  tex.needsUpdate = true; return (flameTex = tex);
}
function getSmokeTex() {
  if (smokeTex) return smokeTex;
  const { ctx, tex } = canvasTex(128, 128);
  for (let i = 0; i < 6; i++) {
    const x = 64 + Math.cos(i * 1.7) * 18, y = 64 + Math.sin(i * 2.3) * 16, r = 34 + (i % 3) * 8;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  }
  tex.needsUpdate = true; return (smokeTex = tex);
}
function makeFlame() {
  const g = new THREE.Group();
  const outer = new THREE.Sprite(new THREE.SpriteMaterial({ map: getFlameTex(), transparent: true, depthWrite: false, color: 0xffa040 }));
  const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: getFlameTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xfff1b0 }));
  outer.scale.set(1, 2, 1); outer.position.y = 0.85; core.scale.set(0.55, 1.1, 1); core.position.y = 0.5;
  const tongue = outer.clone(); tongue.material = outer.material.clone(); tongue.scale.set(0.6, 1.4, 1); tongue.position.set(0.25, 1.0, 0);
  g.add(outer, tongue, core); g.userData.parts = [outer, tongue, core]; g.userData.ph = Math.random() * 6;
  return g;
}

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
function wheels(g, xs, half, r = 0.5) {
  const wg = new THREE.CylinderGeometry(r, r, 0.35, 18).rotateX(Math.PI / 2);
  xs.forEach(x => [-1, 1].forEach(s => { const w = new THREE.Mesh(wg, mat(0x111827, 0.6)); w.position.set(x, r, s * half); g.add(w); const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.45, r * 0.45, 0.37, 12).rotateX(Math.PI / 2), mat(0xcbd5e1, 0.3)); hub.position.copy(w.position); g.add(hub); }));
}
function sideText(text, w, h, bg, fg, font = 'bold 64px Nunito, sans-serif') {
  const { ctx, tex } = canvasTex(512, Math.round(512 * h / w));
  const H = ctx.canvas.height;
  if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, 512, H); }
  ctx.fillStyle = fg; ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 256, H / 2 + 4); tex.needsUpdate = true;
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: !bg }));
}
/* autobomba: mira hacia +X */
function fireTruck() {
  const g = new THREE.Group(), red = mat(0xc81e1e, 0.45), dark = mat(0x1f2937, 0.4);
  box(7.4, 0.35, 2.2, 0x374151, 0, 0.75, 0, g);
  const body = box(4.9, 2.1, 2.4, red, -1.15, 1.95, 0, g);
  const cab = box(2.2, 2.3, 2.4, red, 2.55, 2.0, 0); g.add(cab);
  box(0.05, 1.0, 2.1, mat(0x0f172a, 0.1, { metalness: 0.5 }), 3.66, 2.55, 0, g); // parabrisas
  [-1, 1].forEach(s => { box(1.0, 0.8, 0.05, dark, 2.75, 2.55, s * 1.21, g); box(4.9, 0.14, 0.03, mat(0xffffff, 0.3), -1.15, 1.35, s * 1.215, g); box(4.9, 0.1, 0.03, mat(0xF2E21B, 0.3), -1.15, 1.18, s * 1.215, g);
    for (let i = 0; i < 3; i++) box(1.3, 1.1, 0.03, mat(0x9f1717, 0.4), -3.0 + i * 1.55, 2.3, s * 1.215, g);
    const t = sideText('BOMBEROS', 2.2, 0.36, null, '#ffffff'); t.position.set(2.5, 1.45, s * 1.22); if (s < 0) t.rotation.y = Math.PI; g.add(t); });
  box(0.2, 0.15, 1.6, mat(0xef4444, 0.3, { emissive: 0xef4444, emissiveIntensity: 0.6 }), 2.7, 3.22, 0, g);
  // escalera sobre el techo
  [-0.45, 0.45].forEach(z => box(5.2, 0.08, 0.08, mat(0xd1d5db, 0.3, { metalness: 0.6 }), -1.2, 3.15, z, g));
  for (let i = 0; i < 11; i++) box(0.05, 0.05, 0.9, mat(0xd1d5db, 0.3, { metalness: 0.6 }), -3.6 + i * 0.48, 3.15, 0, g);
  wheels(g, [-2.6, -1.4, 2.5], 1.05);
  [-1, 1].forEach(s => box(0.1, 0.18, 0.4, mat(0xfff7cc, 0.2, { emissive: 0xfff2a8, emissiveIntensity: 0.6 }), 3.66, 1.25, s * 0.85, g));
  void body; return g;
}
/* ambulancia: mira hacia +X */
function ambulance() {
  const g = new THREE.Group(), white = mat(0xf8fafc, 0.4);
  box(5.2, 0.3, 2.0, 0x374151, 0, 0.62, 0, g);
  box(3.6, 2.2, 2.2, white, -0.7, 1.85, 0, g);
  box(1.5, 1.6, 2.1, white, 1.85, 1.55, 0, g);
  box(0.05, 0.75, 1.8, mat(0x0f172a, 0.1), 2.6, 1.95, 0, g);
  [-1, 1].forEach(s => { box(5.0, 0.22, 0.03, mat(0xdc2626, 0.4), -0.05, 1.25, s * 1.115, g);
    const t = sideText('AMBULANCIA', 2.4, 0.4, null, '#dc2626'); t.position.set(-0.7, 2.3, s * 1.12); if (s < 0) t.rotation.y = Math.PI; g.add(t);
    const cr = sideText('✚', 0.6, 0.6, null, '#dc2626', 'bold 440px Nunito, sans-serif'); cr.position.set(-1.9, 1.75, s * 1.12); if (s < 0) cr.rotation.y = Math.PI; g.add(cr); });
  const back = sideText('✚', 0.8, 0.8, null, '#dc2626', 'bold 440px Nunito, sans-serif'); back.position.set(-2.51, 1.9, 0); back.rotation.y = -Math.PI / 2; g.add(back);
  box(0.25, 0.14, 1.3, mat(0x3b82f6, 0.3, { emissive: 0x3b82f6, emissiveIntensity: 0.7 }), 1.6, 2.42, 0, g);
  wheels(g, [-1.6, 1.7], 0.95, 0.42);
  return g;
}
function stretcher() {
  const g = new THREE.Group();
  box(0.65, 0.1, 2.0, mat(0xf97316, 0.5), 0, 0.5, 0, g);
  box(0.6, 0.06, 0.35, mat(0xffffff, 0.6), 0, 0.58, -0.75, g);
  [[-0.28, -0.85], [0.28, -0.85], [-0.28, 0.85], [0.28, 0.85]].forEach(([x, z]) => { cyl(0.02, 0.02, 0.45, 0x9ca3af, x, 0.25, z, g, 6); cyl(0.06, 0.06, 0.04, 0x111827, x, 0.04, z, g, 10).rotation.z = Math.PI / 2; });
  return g;
}
/* puesto de comando: carpa, mesa con radio y letrero institucional */
function commandPost() {
  const g = new THREE.Group();
  [[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]].forEach(([x, z]) => cyl(0.04, 0.04, 2.3, 0x9ca3af, x, 1.15, z, g, 8));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.1, 0.9, 4, 1), mat(0x2E8B2E, 0.7)); roof.rotation.y = Math.PI / 4; roof.position.y = 2.75; g.add(roof);
  box(2.9, 0.3, 0.02, mat(0x1B4D22, 0.7), 0, 2.2, 1.45, g); box(2.9, 0.3, 0.02, mat(0x1B4D22, 0.7), 0, 2.2, -1.45, g);
  box(1.6, 0.05, 0.8, 0xe5e7eb, 0, 0.78, -0.4, g); [[-0.7, -0.75], [0.7, -0.75], [-0.7, -0.05], [0.7, -0.05]].forEach(([x, z]) => cyl(0.025, 0.025, 0.76, 0x6b7280, x, 0.38, z, g, 6));
  box(0.25, 0.18, 0.15, 0x111827, -0.4, 0.9, -0.5, g); cyl(0.008, 0.008, 0.3, 0x111827, -0.33, 1.1, -0.5, g, 4);
  box(0.6, 0.02, 0.45, 0xfef3c7, 0.3, 0.82, -0.4, g); // plano del incidente
  // letrero
  const { ctx, tex } = canvasTex(512, 160);
  ctx.fillStyle = '#1B4D22'; ctx.fillRect(0, 0, 512, 160); ctx.fillStyle = '#F2E21B'; ctx.fillRect(0, 128, 512, 32);
  ctx.fillStyle = '#ffffff'; ctx.font = 'bold 52px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('PUESTO DE', 256, 40); ctx.fillText('COMANDO', 256, 94);
  ctx.fillStyle = '#1B4D22'; ctx.font = 'bold 22px Nunito, sans-serif'; ctx.fillText('SISTEMA DE COMANDO DE INCIDENTES', 256, 145); tex.needsUpdate = true;
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.5), new THREE.MeshBasicMaterial({ map: tex })); sign.position.set(0, 1.55, 1.5); g.add(sign);
  const signB = sign.clone(); signB.rotation.y = Math.PI; signB.position.z = 1.49; g.add(signB);
  cyl(0.03, 0.03, 1.6, 0x6b7280, 0.85, 0.8, 1.5, g, 6); cyl(0.03, 0.03, 1.6, 0x6b7280, -0.85, 0.8, 1.5, g, 6);
  return g;
}
/* vivienda de dos pisos con balcón (frente hacia +Z) */
function house(parent) {
  const g = new THREE.Group(); parent.add(g);
  const W = 6.4, D = 4.4, F = 2.8, wall = mat(0xe7c9a0, 0.9), trim = mat(0xffffff, 0.6);
  box(W, F * 2, D, wall, 0, F, 0, g);
  box(W + 0.1, 0.18, D + 0.1, trim, 0, F, 0, g);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(W * 0.62, 1.8, 4), mat(0x9a3412, 0.8)); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, D / W); roof.position.y = F * 2 + 0.9; g.add(roof);
  const door = box(1.0, 2.1, 0.06, 0x5b3a1e, -1.2, 1.05, D / 2 + 0.03, g);
  // ventanas (brillan con el fuego)
  const winMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2, emissive: 0xff5a14, emissiveIntensity: 0 }); sprites.glow.push(winMat);
  const winPos = [[1.6, 1.4, 1], [-2.4, 4.2, 1], [-0.6, 4.2, 1], [1.6, 4.2, 1], [-1.4, 1.4, 0, 'side'], [1.4, 4.2, 0, 'side']];
  winPos.forEach(([x, y, front, side]) => {
    if (side) { [-1, 1].forEach(s => { box(0.06, 1.0, 1.0, winMat, s * (W / 2 + 0.03), y, x * 0.6, g); box(0.08, 0.1, 1.15, trim, s * (W / 2 + 0.04), y - 0.55, x * 0.6, g); }); return; }
    box(1.0, 1.1, 0.06, winMat, x, y, D / 2 + 0.03, g); box(1.15, 0.1, 0.1, trim, x, y - 0.6, D / 2 + 0.05, g);
  });
  // balcón del segundo piso
  box(3.2, 0.15, 1.1, 0xd6d3d1, 1.8, F + 0.05, D / 2 + 0.55, g);
  box(3.2, 0.05, 0.05, 0x374151, 1.8, F + 1.05, D / 2 + 1.08, g);
  for (let i = 0; i <= 12; i++) cyl(0.015, 0.015, 0.95, 0x374151, 0.2 + i * 0.267, F + 0.6, D / 2 + 1.08, g, 4);
  box(0.05, 0.05, 1.1, 0x374151, 0.2, F + 1.05, D / 2 + 0.55, g); box(0.05, 0.05, 1.1, 0x374151, 3.4, F + 1.05, D / 2 + 0.55, g);
  box(1.0, 2.0, 0.06, 0x1e293b, 1.8, F + 1.1, D / 2 + 0.03, g); // puerta del balcón
  void door; return g;
}

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.05, 220);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 2.2));
  const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(12, 20, 8); scene.add(dl);
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
    getCamera: () => camera, canvas, container: $('#view3d'), getWorld: () => sprites.ground || world, eye: 1.62, speed: 2.6,
    targets: walkTargets, interact: walkInteract
  });
}

/* ---------- personas 3D con desplazamiento ---------- */
function person(av) {
  const w = new THREE.Group(); const h = makeHuman(av, { height: 1.74 }); w.add(h);
  w.userData.human = h; w.userData.goal = null; return w;
}
function setShadow(h, on) { h.traverse(o => { if (o.isMesh && o.geometry.type === 'CircleGeometry' && o.material.transparent) o.material.opacity = on ? 0.16 : 0; }); }
/* goal: { x, z, y, face, pose: 'stand'|'sit'|'lie'|'wave' } */
function setGoal(w, goal, snap) {
  const h = w.userData.human, prev = w.userData.goal;
  const poseChanged = !prev || prev.pose !== goal.pose || Math.abs((prev.y || 0) - (goal.y || 0)) > 0.01;
  w.userData.goal = goal;
  if (snap || poseChanged || !(mode === 'inline' || mode === 'xr')) {
    w.position.set(goal.x, goal.y || 0, goal.z); w.rotation.y = goal.face || 0;
  }
  const lie = goal.pose === 'lie';
  h.rotation.x = lie ? -Math.PI / 2 : 0; h.position.set(0, lie ? 0.14 : 0, lie ? 0.85 : 0);
  setShadow(h, !lie && !(goal.y > 0.3));
  if (poseChanged || snap) h.userData.setState(goal.pose === 'sit' ? 'sit' : goal.pose === 'wave' ? 'wave' : 'idle');
}
const _d = new THREE.Vector3();
function stepPeople(dt) {
  sprites.crew.concat(sprites.vic).forEach(w => {
    const g = w.userData.goal; if (!g) return; const h = w.userData.human;
    _d.set(g.x - w.position.x, 0, g.z - w.position.z); const dist = _d.length();
    if (dist > 0.05 && g.pose !== 'lie' && g.pose !== 'sit') {
      const step = Math.min(dist, dt * 1.9); _d.multiplyScalar(step / dist); w.position.add(_d);
      const yaw = Math.atan2(g.x - w.position.x, g.z - w.position.z); w.rotation.y += angDiff(yaw, w.rotation.y) * Math.min(1, dt * 8);
      if (!w.userData.walking) { w.userData.walking = true; h.userData.setState('walk'); }
    } else {
      if (dist > 0) w.position.set(g.x, g.y || 0, g.z);
      if (w.userData.walking) { w.userData.walking = false; h.userData.setState(g.pose === 'wave' ? 'wave' : 'idle'); }
      w.rotation.y += angDiff(g.face || 0, w.rotation.y) * Math.min(1, dt * 4);
    }
  });
}
const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
const faceTo = (x, z, tx, tz) => Math.atan2(tx - x, tz - z);

function build() {
  const e = App.esc; builtFor = e.id;
  world.clear(); Object.keys(sprites).forEach(k => sprites[k] = Array.isArray(sprites[k]) ? [] : null);
  const groundCol = { estructural: 0x9fb98a, vehicular: 0x8fae74, forestal: 0x7fb870, hazmat: 0x9aab88 }[e.tipo];
  const ground = new THREE.Mesh(new THREE.BoxGeometry(30, 0.05, 20), mat(groundCol, 0.95)); ground.position.y = -0.025; world.add(ground); sprites.ground = ground;
  const [ox, oz] = P(330, 150);
  if (e.tipo === 'vehicular' || e.tipo === 'hazmat') {
    box(30, 0.02, 3.2, 0x3f4753, 0, 0.01, 0.2, world);
    for (let i = 0; i < 10; i++) box(1.6, 0.005, 0.12, 0xfacc15, -13.5 + i * 3, 0.025, 0.2, world);
    [-1, 1].forEach(s => box(30, 0.004, 0.08, 0xffffff, 0, 0.024, 0.2 + s * 1.45, world));
  } else {
    box(30, 0.02, 2.4, 0x6b7280, 0, 0.01, 9, world); // calle de acceso
    box(30, 0.03, 0.6, 0xd6d3d1, 0, 0.015, 7.5, world); // vereda
  }
  // objeto del incidente (geometría original ampliada a escala real)
  const inc = new THREE.Group(); world.add(inc);
  if (e.tipo === 'estructural') {
    house(world);
    box(1.4, 0.06, 4, 0xd6d3d1, -1.2, 0.03, 4.2, world); // camino a la puerta
  } else if (e.tipo === 'vehicular') {
    const mkCar = col => {
      const car = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.45), mat(col, 0.35)); body.position.y = 0.2; car.add(body);
      const cab = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.42), mat(0x93c5fd, 0.15)); cab.position.set(-0.05, 0.41, 0); car.add(cab);
      [-0.3, 0.3].forEach(x => [-0.23, 0.23].forEach(z => { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 14).rotateX(Math.PI / 2), mat(0x111827)); w.position.set(x, 0.1, z); car.add(w); }));
      return car;
    };
    const car = mkCar(0x2563eb); car.position.set(ox, 0, oz); car.rotation.set(0.04, 0.5, 0.06); inc.add(car);
    const car2 = mkCar(0xdc2626); car2.position.set(ox + 1, 0, oz + 0.05); car2.rotation.set(0, -0.3, 0); inc.add(car2);
    inc.scale.setScalar(S * 0.9);
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.9, 18).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xbfdbfe, transparent: true, opacity: 0.5 })); glass.position.set(2, 0.03, 0.6); world.add(glass);
  } else if (e.tipo === 'forestal') {
    for (let i = 0; i < 14; i++) tree((ox - 1 + (i % 5) * 0.45 + Math.sin(i) * 0.1) * S, (oz - 0.8 + Math.floor(i / 5) * 0.45) * S, 2.4 + (i % 3) * 0.5, world).userData.burn = true;
    const [hx, hz] = P(490, 70); const hs = new THREE.Group(); box(3, 2.4, 2.6, 0xfde68a, 0, 1.2, 0, hs); const r = new THREE.Mesh(new THREE.ConeGeometry(2.3, 1.2, 4), mat(0x9a3412)); r.rotation.y = Math.PI / 4; r.position.y = 3; hs.add(r); hs.position.set(hx, 0, hz); world.add(hs);
    const burnt = new THREE.Mesh(new THREE.CircleGeometry(3.4, 28).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x3f3a2e, roughness: 1 })); burnt.position.set(0, 0.012, -0.6); world.add(burnt);
  } else if (e.tipo === 'hazmat') {
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.3, 20), mat(0xe5e7eb, 0.35, { metalness: 0.4 })); tank.rotation.set(0, 0, Math.PI / 2 + 0.12); tank.position.set(ox, 0.3, oz); inc.add(tank);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.45), mat(0xf97316, 0.5)); cabin.position.set(ox + 0.85, 0.22, oz + 0.05); inc.add(cabin);
    const sign = sideText('1203', 0.2, 0.12, '#f97316', '#111', 'bold 200px Nunito, sans-serif'); sign.position.set(ox - 0.1, 0.38, oz + 0.255); inc.add(sign);
    const spill = new THREE.Mesh(new THREE.CircleGeometry(0.7, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.35 })); spill.position.set(ox, 0.03, oz + 0.4); inc.add(spill);
    inc.scale.setScalar(S);
  }
  // autobomba
  const truck = fireTruck(); const [tx, tz] = P(100, 190); truck.position.set(tx, 0, tz); world.add(truck); sprites.truck = truck;
  // manguera desde la autobomba hacia el frente de ataque
  const hosePts = [new THREE.Vector3(tx + 1.5, 0.06, tz + 1.25), new THREE.Vector3(tx + 3.5, 0.06, tz + 2.2), new THREE.Vector3(-3.5, 0.06, 3.4), new THREE.Vector3(-1.4, 0.06, 2.8)];
  const hose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hosePts), 40, 0.05, 6), mat(0xF2E21B, 0.6)); hose.visible = false; world.add(hose); sprites.hose = hose;
  // conos de señalización
  [[-5, 0.2], [-4.2, -0.9], [-13.8, 2.6], [-13.8, 0], [5.5, 3.5], [7, 3.5], [8.5, 3.5]].forEach(([x, z]) => cone(x, z));
  // árboles del entorno
  [[-14, -8.5], [-10, -9], [-4, -9.2], [4, -9], [9, -8.7], [13.8, -8], [14, -3], [14.2, 2.5], [13.5, 6.5], [-14.2, -4]].forEach(([x, z], i) => tree(x, z, 3.6 + (i % 3) * 0.7));
  // hidrante
  const hy = new THREE.Group(); cyl(0.14, 0.16, 0.7, 0xdc2626, 0, 0.35, 0, hy); cyl(0.16, 0.16, 0.08, 0xb91c1c, 0, 0.72, 0, hy); const hc = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xdc2626)); hc.position.y = 0.75; hy.add(hc); hy.position.set(3.8, 0, 7.0); world.add(hy);
  // zonas del SCI y puesto de comando
  const zg = new THREE.Group();
  [[1.75, 0x16a34a], [1.25, 0xd97706], [0.9, 0xdc2626]].forEach(([r, c]) => { const ring = new THREE.Mesh(new THREE.RingGeometry(r * S - 0.14, r * S, 96).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.8 })); ring.position.set(ox, 0.03, oz); zg.add(ring); });
  const post = commandPost(); post.position.set(-12.4, 0, 4.9); post.rotation.y = 0.9; zg.add(post); sprites.post = post;
  zg.visible = false; world.add(zg); sprites.zones = zg;
  // fuego, brillo y humo
  for (let i = 0; i < 8; i++) { const f = makeFlame(); f.visible = false; world.add(f); sprites.fire.push(f); }
  const light = new THREE.PointLight(0xff7a2a, 0, 28, 1.6); light.position.set(ox, e.tipo === 'estructural' ? 3 : 1.5, oz + 2); world.add(light); sprites.light = light;
  for (let i = 0; i < 16; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: getSmokeTex(), transparent: true, depthWrite: false, color: i % 2 ? 0x4b5563 : 0x6b7280, opacity: 0.5 }));
    sp.userData.ph = i / 16; sp.userData.dx = Math.sin(i * 2.1) * 0.8; sp.userData.dz = Math.cos(i * 1.3) * 0.6; sp.visible = false; world.add(sp); sprites.smoke.push(sp);
  }
  // ambulancia
  const amb = ambulance(); amb.position.set(-9.6, 0, 8.3); amb.rotation.y = Math.PI; world.add(amb); sprites.amb = amb;
  // tripulación y víctimas
  App.st.crew.forEach(c => { const w = person(c.avatar); w.userData.id = c.id; world.add(w); sprites.crew.push(w); });
  App.st.vic.forEach(v => {
    const w = person(v.avatar); w.userData.id = v.id; world.add(w); sprites.vic.push(w);
    const st = stretcher(); st.visible = false; world.add(st); sprites.stretchers.push(st);
    const r = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.7, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xeab308, transparent: true, opacity: 0.85 })); world.add(r); sprites.rings.push(r);
  });
  const label = canvasTex(512, 96); label.ctx.fillStyle = 'rgba(255,255,255,.92)'; roundRect(label.ctx, 4, 4, 504, 88, 20); label.ctx.fill(); label.ctx.fillStyle = '#7f1d1d'; label.ctx.font = 'bold 28px Nunito, sans-serif'; label.ctx.textAlign = 'center'; label.ctx.textBaseline = 'middle'; label.ctx.fillText(e.nombre.slice(0, 34), 256, 50); label.tex.needsUpdate = true;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: label.tex, transparent: true })); ls.scale.set(8.5, 1.6, 1); ls.position.set(0, 9.4, -4.8); world.add(ls);
  sprites.snap = true;
}

/* puntos de apoyo del fuego según el tipo de emergencia */
function fireSpot(i, tipo) {
  if (tipo === 'estructural') {
    const spots = [[1.6, 1.3, 2.35], [-0.6, 4.1, 2.35], [1.6, 4.1, 2.35], [-2.4, 4.1, 2.35], [3.25, 4.1, 0.8], [0.6, 6.0, 0.6], [-3.25, 1.3, -0.8], [-1.6, 6.3, -0.3]];
    return spots[i];
  }
  if (tipo === 'forestal') return [-3.4 + ((i * 3) % 8) * 0.95, 0.05, 0.9 + (i % 2) * 0.7 - (i % 3) * 0.9];
  const a = i * 2.4, r = (0.3 + (i % 3) * 0.14) * S;
  return [Math.cos(a) * r, tipo === 'forestal' ? 0.1 : 0.2, Math.sin(a) * r * 0.6 - (tipo === 'forestal' ? 0.6 : 0)];
}

function sync() {
  const s = App.st; if (!s || !App.esc) return;
  if (builtFor !== App.esc.id || sprites.crew.length !== s.crew.length) build();
  const snap = !!sprites.snap; sprites.snap = false;
  const tipo = App.esc.tipo, est = tipo === 'estructural';
  const [ox, oz] = P(330, 150);
  const nf = Math.ceil(s.fuego / 13);
  sprites.fire.forEach((f, i) => { f.visible = i < nf; const [x, y, z] = fireSpot(i, tipo); f.position.set(ox + x, y, oz + z); f.userData.base = (est ? 1.3 : tipo === 'forestal' ? 1.7 : 1.1) * (0.7 + s.fuego / 110); });
  sprites.glow.forEach(m => { m.userData.k = s.fuego / 100; });
  sprites.light.userData.k = s.fuego / 100;
  sprites.smoke.forEach(sp => { sp.visible = s.fuego > 0; sp.userData.k = Math.max(0.35, s.fuego / 100); });
  sprites.zones.visible = !!s.sci;
  sprites.amb.visible = s.vic.some(v => v.rescatada);
  sprites.hose.visible = s.crew.some(c => c.dentro && !c.herido);
  s.crew.forEach((c, i) => {
    const w = sprites.crew[i]; if (w.userData.human.userData.cur() !== c.avatar) w.userData.human.userData.draw(c.avatar);
    let g;
    if (c.herido) { const x = -3.0 + i * 0.95; g = { x, z: 6.3, face: Math.PI, pose: 'lie' }; }
    else if (c.dentro) { const x = -1.9 + i * 0.75, z = 2.75 + (i % 2) * 0.5; g = { x, z, face: faceTo(x, z, -1.2, 0), pose: 'stand' }; }
    else { const [x, z] = P(120 + i * 26, 230); g = { x, z: z + 0.6, face: faceTo(x, z, ox, oz), pose: 'stand' }; }
    setGoal(w, g, snap);
  });
  s.vic.forEach((v, i) => {
    const w = sprites.vic[i], st = sprites.stretchers[i], ring = sprites.rings[i];
    if (w.userData.human.userData.cur() !== v.avatar) w.userData.human.userData.draw(v.avatar);
    let g;
    if (v.rescatada) {
      const x = -6.2 + i * 1.3, z = 6.9;
      st.visible = true; st.position.set(x, 0, z);
      g = v.estable && !v.critico ? { x, z: z + 0.15, y: 0.1, face: Math.PI / 2, pose: 'sit' } : { x, z: z + 0.15, y: 0.47, face: Math.PI, pose: 'lie' };
      if (g.pose === 'sit') { g.x = x - 0.05; g.z = z; }
    } else {
      st.visible = false;
      if (est) { const x = 1.0 + i * 1.1, z = 3.05; g = { x, z, y: 2.93, face: 0, pose: 'wave' }; }
      else {
        const x = P(370 + i * 30, 112)[0], z = 2.5;
        const pose = v.critico ? 'lie' : (/atrap|herid[oa]$/.test(v.estado) || v.grav > 0.5) ? 'sit' : 'stand';
        g = { x, z, face: faceTo(x, z, -8, 3), pose };
      }
    }
    setGoal(w, g, snap);
    ring.position.set(g.x, 0.03 + (v.rescatada ? 0 : 0), g.z); ring.visible = v.rescatada || !est;
    ring.material.color.set(v.critico ? 0xdc2626 : v.estable ? 0x16a34a : v.grav > 0.5 ? 0xf97316 : 0xeab308);
  });
  drawHud();
}

/* ---------- modo Recorrer ---------- */
function walkTargets() {
  const s = App.st; if (!s || !sprites.crew.length) return [];
  const t = [];
  s.crew.forEach((c, i) => t.push({ obj: sprites.crew[i], label: (c.herido ? 'Atender a ' : 'Hablar con ') + c.nombre, kind: 'crew', i }));
  s.vic.forEach((v, i) => t.push({ obj: sprites.vic[i], label: (v.rescatada ? 'Atender a ' : 'Rescatar a ') + v.nombre, kind: 'vic', i }));
  if (sprites.truck) t.push({ obj: sprites.truck, label: 'Revisar la autobomba', kind: 'truck' });
  if (sprites.zones && sprites.zones.visible) t.push({ obj: sprites.post, label: 'Puesto de comando', kind: 'post' });
  return t;
}
function walkInteract(t) {
  const s = App.st; if (!s) return;
  const cam = camera.position;
  const look = w => { const h = w.userData.human; w.updateMatrixWorld(); const p = w.getWorldPosition(new THREE.Vector3()); h.userData.look(THREE.MathUtils.clamp(angDiff(Math.atan2(cam.x - p.x, cam.z - p.z), w.rotation.y), -1, 1)); h.userData.talk(2.5); setTimeout(() => h.userData.look(null), 3000); };
  if (t.kind === 'crew') {
    const c = s.crew[t.i]; look(t.obj);
    const where = c.herido ? 'herido, esperando atención' : c.dentro ? 'en el interior' : 'afuera, listo';
    App.toast(`${c.avatar} ${c.nombre} (${c.rol}): ${where} · aire ${Math.round(c.aire)} min · fatiga ${Math.round(c.fatiga * 100)} %`, 4000);
    if (App.speak) App.speak(c.herido ? 'Necesito atención, mi jefe.' : c.dentro ? 'Seguimos en el interior, mi jefe.' : 'Listo para recibir órdenes, mi jefe.', c.pitch || 1);
  } else if (t.kind === 'vic') {
    const v = s.vic[t.i]; look(t.obj);
    const est = v.critico ? 'estado crítico' : v.estable ? 'estabilizada' : v.rescatada ? 'rescatada, requiere atención' : v.estado;
    App.toast(`${v.avatar} ${v.nombre}: ${est} · gravedad ${Math.round(v.grav * 100)} %. Usa las órdenes del panel para actuar.`, 4500);
    if (!v.rescatada && v.grito && App.speak) App.speak(v.grito, 1.1);
  } else if (t.kind === 'truck') App.toast(`🚒 Autobomba: ${s.agua} L de agua disponibles.`, 3500);
  else if (t.kind === 'post') App.toast('📻 Puesto de comando activo: el SCI organiza zonas, recursos y comunicaciones.', 3500);
}

function drawHud() {
  const show = mode === 'xr' && !domOverlay && placed; hud.visible = show; if (!show) return;
  const d = App.getHud(); const btns = d.buttons.slice(0, 9);
  const key = d.text + btns.map(b => b.label + b.disabled).join('|') + d.busy + scaleMode; if (key === hudKey) return; hudKey = key;
  const ctx = hudCtx, W = 1024, H = 1100; ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(40,10,10,.92)'; roundRect(ctx, 0, 0, W, H, 36); ctx.fill();
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
  $('#xr-status').textContent = 'Escena colocada. Usa el panel de órdenes para comandar la emergencia.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; hud.visible = false; $('#xr-status').textContent = 'Toca para colocar de nuevo la escena.'; }
  App.toast(scaleMode === 'table' ? 'Escena en miniatura' : 'Escena a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

const orbit = { theta: 0.55, phi: 1.1, r: 21, target: new THREE.Vector3(-2.5, 1.4, 2) };
function updateOrbit() { const o = orbit; camera.position.set(o.target.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), o.target.y + o.r * Math.cos(o.phi), o.target.z + o.r * Math.sin(o.phi) * Math.cos(o.theta)); camera.lookAt(o.target); }
function setupPointer(cv) {
  const pts = new Map(); let pinch = null;
  cv.addEventListener('pointerdown', e => { try { cv.setPointerCapture(e.pointerId); } catch (_) { /* puntero sintético */ } pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
  cv.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return; const p = pts.get(e.pointerId); const dx = e.clientX - p.x, dy = e.clientY - p.y; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { orbit.theta -= dx * 0.008; orbit.phi = Math.min(1.45, Math.max(0.2, orbit.phi - dy * 0.006)); }
    else if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) orbit.r = Math.min(55, Math.max(5, orbit.r * pinch / d)); pinch = d; }
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); orbit.r = Math.min(55, Math.max(5, orbit.r * (1 + e.deltaY * 0.001))); }, { passive: false });
}
function resize() { if (!renderer || mode !== 'inline') return; const c = renderer.domElement; const w = c.clientWidth || 1, h = c.clientHeight || 1; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }

function animateEffects(time) {
  sprites.fire.forEach(f => {
    if (!f.visible) return; const b = f.userData.base || 1, ph = f.userData.ph, [o, tg, c] = f.userData.parts;
    const fl = 1 + Math.sin(time * 11 + ph) * 0.14 + Math.sin(time * 23 + ph * 2) * 0.07;
    o.scale.set(b * (1 + Math.sin(time * 7 + ph) * 0.08), b * 2 * fl, 1); o.position.y = b * 0.95 * fl;
    tg.scale.set(b * 0.6, b * 1.4 * (2 - fl), 1); tg.position.set(Math.sin(time * 5 + ph) * 0.25 * b, b * 1.15, 0);
    c.scale.set(b * 0.5, b * 1.0 * fl, 1); c.position.y = b * 0.5;
    o.material.opacity = 0.8 + Math.sin(time * 13 + ph) * 0.2; tg.material.opacity = 0.55 + Math.sin(time * 9 + ph * 3) * 0.35;
  });
  sprites.glow.forEach(m => { m.emissiveIntensity = (m.userData.k || 0) * (1.3 + Math.sin(time * 13) * 0.4); });
  if (sprites.light) { const k = sprites.light.userData.k || 0; sprites.light.intensity = k * 70 * (0.85 + Math.sin(time * 17) * 0.1 + Math.sin(time * 7.3) * 0.08); }
  const est = App.esc && App.esc.tipo === 'estructural';
  const bx = est ? 0.4 : 0, by = est ? 6.2 : 1.6, bz = est ? 0 : -0.4;
  sprites.smoke.forEach(sp => {
    if (!sp.visible) return; const k = sp.userData.k || 0.5;
    const u = (time * 0.11 + sp.userData.ph) % 1;
    sp.position.set(bx + sp.userData.dx * (0.4 + u * 2.5) + u * u * 4, by + u * 10, bz + sp.userData.dz * (0.4 + u * 2));
    const sc = (1.4 + u * 6) * (0.6 + k * 0.6); sp.scale.set(sc, sc, 1);
    sp.material.opacity = Math.sin(u * Math.PI) * 0.6 * k; sp.material.rotation = sp.userData.ph * 6 + u * 1.5;
  });
}

function animate(t, frame) {
  const dt = clock.getDelta(), time = clock.elapsedTime;
  animateEffects(time);
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
  scene.background = new THREE.Color(0xdbeafe);
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
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xdbeafe) : null; root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { vr.exit(); if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

/* gafas sencillas tipo VR Box (cardboard) */
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(60,15,15,.94)', view: { pos: [-3, 1.7, 13], target: [0, 2, 0] },
  prepare: () => { if (mode === 'inline') stopInline(); init(); build(); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; scene.background = new THREE.Color(0xdbeafe); }
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
window.Cior3D = { stopAll };
