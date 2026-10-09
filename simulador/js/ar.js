/* =========================================================
   Aula en 3D y Realidad Aumentada
   - Vista 3D interactiva (computadora y celular)
   - WebXR immersive-ar: gafas de RA (Meta Quest 3, Android XR,
     Magic Leap, HoloLens…) y celulares Android con ARCore.
     · Detección de superficies (hit-test) para colocar el aula.
     · Panel flotante 3D con las opciones del docente (para gafas).
     · Superposición HTML (dom-overlay) en celulares.
   - Alternativa sin WebXR (p. ej. iPhone): cámara + giroscopio.
   ========================================================= */
import * as THREE from '../vendor/three.module.min.js';
import { createVrBox } from './vrbox.js';

const App = window.AulaApp;
const $ = s => document.querySelector(s);

const SCALE_TABLE = 0.16;   // aula en miniatura sobre una mesa
const SCALE_REAL = 1;       // tamaño real (gafas)
const SHIRTS = [0xef4444, 0x3b82f6, 0x22c55e, 0xf59e0b, 0xa855f7, 0x14b8a6, 0xec4899, 0x64748b, 0xf97316, 0x0ea5e9];

let renderer, scene, camera, root, classroom, boardMesh, boardCtx, boardTex;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '';
let studentObjs = new Map();
let mode = null;            // null | 'inline' | 'xr' | 'cam'
let xrSession = null, hitSource = null, reticle, placed = false, domOverlayOn = false;
let scaleMode = 'table';
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();
const clock = new THREE.Clock();

/* ================== utilidades de canvas ================== */
function canvasTex(w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return { c, ctx, tex };
}
function wrap(ctx, text, maxW) {
  const words = String(text).split(/\s+/); const lines = []; let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
function emojiSprite(emoji, size = 256, scale = 0.32) {
  const { ctx, tex } = canvasTex(size, size);
  ctx.font = `${size * 0.8}px ${EMOJI_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2 + size * 0.05);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sp.scale.set(scale, scale, 1);
  sp.userData.draw = e => { ctx.clearRect(0, 0, size, size); ctx.fillText(e, size / 2, size / 2 + size * 0.05); tex.needsUpdate = true; };
  return sp;
}
function labelSprite(text, w = 256, h = 64, scale = 0.6) {
  const { ctx, tex } = canvasTex(w, h);
  ctx.fillStyle = 'rgba(255,255,255,.92)'; roundRect(ctx, 4, 4, w - 8, h - 8, 18); ctx.fill();
  ctx.fillStyle = '#1c2738'; ctx.font = `bold ${h * 0.5}px Nunito, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2 + 2);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sp.scale.set(scale, scale * h / w, 1);
  return sp;
}
function bubbleSprite() {
  const W = 512, H = 200;
  const { ctx, tex } = canvasTex(W, H);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false }));
  sp.scale.set(0.9, 0.9 * H / W, 1); sp.renderOrder = 10; sp.visible = false;
  sp.userData.draw = text => {
    ctx.clearRect(0, 0, W, H);
    ctx.font = 'bold 30px Nunito, sans-serif';
    const lines = wrap(ctx, text, W - 50).slice(0, 4);
    const bh = 30 + lines.length * 36;
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#111'; ctx.lineWidth = 4;
    roundRect(ctx, 6, H - bh - 26, W - 12, bh, 22); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W / 2 - 16, H - 28); ctx.lineTo(W / 2, H - 4); ctx.lineTo(W / 2 + 16, H - 28); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#111'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    lines.forEach((l, i) => ctx.fillText(l, W / 2, H - bh - 26 + 16 + i * 36));
    tex.needsUpdate = true;
  };
  return sp;
}

/* ================== escena ================== */
function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.xr.enabled = true;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, 1, 0.01, 50);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 2.2));
  const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(2, 4, 3); scene.add(dl);

  root = new THREE.Group(); scene.add(root);
  classroom = new THREE.Group(); root.add(classroom);

  // piso
  const floor = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.04, 5), new THREE.MeshStandardMaterial({ color: 0xd9c7a7, roughness: 0.9 }));
  floor.position.set(0, -0.02, 0.9); floor.name = 'floor'; classroom.add(floor);
  // pizarra
  // marco como plano de una sola cara: desde atrás no tapa la vista del aula
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(2.62, 1.34), new THREE.MeshStandardMaterial({ color: 0x8a5a2b }));
  frame.position.set(0, 1.45, -1.03); classroom.add(frame);
  const b = canvasTex(1024, 512); boardCtx = b.ctx; boardTex = b.tex;
  boardMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.45, 1.18), new THREE.MeshBasicMaterial({ map: boardTex }));
  boardMesh.position.set(0, 1.45, -1.015); classroom.add(boardMesh);
  // escritorio del docente
  const tdesk = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.75, 0.55), new THREE.MeshStandardMaterial({ color: 0x9a6b3f }));
  tdesk.position.set(-2.1, 0.375, -0.6); classroom.add(tdesk);
  const apple = emojiSprite('🍎', 128, 0.14); apple.position.set(-1.9, 0.83, -0.6); classroom.add(apple);

  // reticle para colocar el aula
  reticle = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x4f8bff }));
  reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);

  // panel 3D (para gafas)
  const h = canvasTex(1024, 1100); hudCtx = h.ctx; hudTex = h.tex;
  hud = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.46 * 1100 / 1024), new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, depthTest: false }));
  hud.renderOrder = 20; hud.visible = false; hud.name = 'hud'; scene.add(hud);

  // controles (gafas / toques en pantalla)
  for (let i = 0; i < 2; i++) {
    const ctrl = renderer.xr.getController(i);
    ctrl.addEventListener('select', () => onXRSelect(ctrl));
    ctrl.addEventListener('connected', e => {
      if (e.data.targetRayMode === 'tracked-pointer') {
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0x4f8bff }));
        line.scale.z = 3; line.name = 'ray'; ctrl.add(line);
      }
    });
    ctrl.addEventListener('disconnected', () => { const l = ctrl.getObjectByName('ray'); if (l) ctrl.remove(l); });
    scene.add(ctrl);
  }

  App.subscribe(() => { if (mode) sync(); });
  window.addEventListener('resize', resize);
  setupPointer(canvas);
}

function buildStudents() {
  studentObjs.forEach(o => classroom.remove(o.g)); studentObjs.clear();
  const sts = App.sim.students; const n = sts.length;
  const cols = n <= 6 ? 3 : n <= 8 ? 4 : 5;
  const rows = Math.ceil(n / cols);
  sts.forEach((s, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const inRow = Math.min(cols, n - r * cols);
    const x = (c - (inRow - 1) / 2) * 1.0, z = 0.6 + r * 1.1;
    const g = new THREE.Group(); g.position.set(x, 0, z); g.userData.sid = s.id;
    // pupitre
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.45), new THREE.MeshStandardMaterial({ color: 0xe9d3b0 }));
    top.position.set(0, 0.68, -0.28); g.add(top);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.66, 0.04), new THREE.MeshStandardMaterial({ color: 0x9aa4b2 }));
    leg.position.set(0, 0.33, -0.12); g.add(leg);
    // silla
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.4), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    seat.position.set(0, 0.42, 0.12); g.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.04), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    back.position.set(0, 0.64, 0.32); g.add(back);
    // cuerpo
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.28, 4, 12), new THREE.MeshStandardMaterial({ color: SHIRTS[i % SHIRTS.length] }));
    body.position.set(0, 0.76, 0.12); g.add(body);
    // cabeza (emoji)
    const head = emojiSprite(s.avatar, 256, 0.42); head.position.set(0, 1.18, 0.1); g.add(head);
    const status = emojiSprite('', 128, 0.26); status.position.set(0.22, 1.5, 0.1); g.add(status);
    const name = labelSprite(s.nombre); name.position.set(0, 0.92, -0.52); g.add(name);
    const bubble = bubbleSprite(); bubble.position.set(0, 1.75, 0.1); g.add(bubble);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.5, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.9 }));
    ring.position.set(0, 0.01, 0); ring.visible = false; g.add(ring);
    // zona de toque invisible
    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.6, 0.9), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(0, 0.8, -0.05); hit.userData.sid = s.id; g.add(hit);
    classroom.add(g);
    studentObjs.set(s.id, { g, head, status, bubble, ring, hit, lastStatus: null, lastBubble: null, phase: Math.random() * 6 });
  });
  classroom.userData.rows = rows;
}

/* sincroniza la escena con el estado del simulador */
let boardKey = '';
function sync() {
  if (!App.sim) return;
  if (studentObjs.size !== App.sim.students.length || ![...studentObjs.keys()].every(k => App.sim.get(k))) buildStudents();
  App.sim.students.forEach(s => {
    const o = studentObjs.get(s.id); if (!o) return;
    const icon = App.statusIcon[s.estado] || '';
    if (icon !== o.lastStatus) { o.status.userData.draw(icon); o.lastStatus = icon; }
    o.status.visible = !!icon;
    o.ring.visible = App.selected === s.id;
    o.ring.material.color.set(App.mode === 'pick-answer' || App.mode === 'pick-previo' ? 0xf59e0b : 0x2563eb);
    o.distracted = s.distraido;
    const sp = App.speech && App.speech.sid === s.id ? App.speech.text : null;
    if (sp !== o.lastBubble) { if (sp) o.bubble.userData.draw(sp); o.lastBubble = sp; }
    o.bubble.visible = !!sp;
    o.speaking = !!sp;
  });
  const hudData = App.getHud();
  const bk = hudData.board.title + '|' + hudData.board.body;
  if (bk !== boardKey) { boardKey = bk; drawBoard(hudData.board); }
  drawHud(hudData);
}

function drawBoard({ title, body }) {
  const ctx = boardCtx, W = 1024, H = 512;
  ctx.fillStyle = '#1f4d3a'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f1f8f2'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  ctx.font = `bold 46px Nunito, ${EMOJI_FONT}`;
  ctx.fillText(title.slice(0, 40), 36, 26);
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.setLineDash([12, 10]); ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(36, 88); ctx.lineTo(W - 36, 88); ctx.stroke(); ctx.setLineDash([]);
  ctx.font = `32px Nunito, ${EMOJI_FONT}`;
  let y = 108;
  for (const para of body.split('\n').filter(Boolean)) {
    for (const l of wrap(ctx, para, W - 72)) { if (y > H - 44) break; ctx.fillText(l, 36, y); y += 40; }
    y += 6;
  }
  boardTex.needsUpdate = true;
}

/* panel flotante con las opciones del docente */
function drawHud(d) {
  const showHud = (mode === 'xr' && !domOverlayOn);
  hud.visible = showHud && placed;
  if (!showHud) return;
  const btns = d.buttons.slice(0, 8);
  const key = d.text + '|' + btns.map(b => b.label + b.disabled).join(',') + d.tab + d.busy + scaleMode + d.board.title;
  if (key === hudKey) return; hudKey = key;
  const ctx = hudCtx, W = 1024, H = 1100;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,30,48,.92)'; roundRect(ctx, 0, 0, W, H, 36); ctx.fill();
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  ctx.fillStyle = '#fde68a'; ctx.font = `bold 30px Nunito, ${EMOJI_FONT}`;
  ctx.fillText('Pizarra: ' + d.board.title.slice(0, 48), 32, 24);
  ctx.fillStyle = '#fff'; ctx.font = `34px Nunito, ${EMOJI_FONT}`;
  const lines = wrap(ctx, d.text, W - 64).slice(0, 5);
  lines.forEach((l, i) => ctx.fillText(l, 32, 72 + i * 42));
  hudRects = [];
  let y = 72 + lines.length * 42 + 20;
  ctx.font = `bold 32px Nunito, ${EMOJI_FONT}`;
  btns.forEach(b => {
    const r = { x: 28, y, w: W - 56, h: 76, el: b.el, disabled: b.disabled };
    ctx.fillStyle = b.disabled ? 'rgba(255,255,255,.12)' : '#ffffff'; roundRect(ctx, r.x, r.y, r.w, r.h, 18); ctx.fill();
    ctx.fillStyle = b.disabled ? '#8898aa' : '#1c2738'; ctx.textBaseline = 'middle';
    ctx.fillText(b.label.length > 52 ? b.label.slice(0, 50) + '…' : b.label, r.x + 22, r.y + r.h / 2 + 2);
    ctx.textBaseline = 'top';
    hudRects.push(r); y += 88;
  });
  // barra inferior
  const tabNames = { anticipacion: 'Inicio', construccion: 'Desarrollo', consolidacion: 'Cierre', gestion: 'Aula' };
  const bottom = [
    { label: '⇄ ' + (tabNames[d.tab] || 'Pestaña'), fn: () => App.cycleTab() },
    { label: scaleMode === 'table' ? '↕ Tamaño real' : '↕ Miniatura', fn: toggleScale },
    { label: '✕ Salir', fn: stopAll }
  ];
  const bw = (W - 56 - 20) / 3;
  bottom.forEach((b, i) => {
    const r = { x: 28 + i * (bw + 10), y: H - 100, w: bw, h: 76, fn: b.fn };
    ctx.fillStyle = i === 2 ? '#dc2626' : '#4f8bff'; roundRect(ctx, r.x, r.y, r.w, r.h, 18); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(b.label, r.x + r.w / 2, r.y + r.h / 2 + 2);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    hudRects.push(r);
  });
  hudTex.needsUpdate = true;
}

/* ================== interacción ================== */
function pickFromRay() {
  const targets = [];
  if (hud.visible) targets.push(hud);
  studentObjs.forEach(o => targets.push(o.hit));
  const hit = raycaster.intersectObjects(targets, false)[0];
  if (!hit) return false;
  if (hit.object === hud) {
    const px = hit.uv.x * 1024, py = (1 - hit.uv.y) * 1100;
    const r = hudRects.find(r => px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h);
    if (r) { if (r.fn) r.fn(); else if (!r.disabled) r.el.click(); }
    return true;
  }
  if (hit.object.userData.sid) { App.onStudentTap(hit.object.userData.sid); return true; }
  return false;
}

function onXRSelect(ctrl) {
  if (!placed) { placeClassroom(); return; }
  tmpM.identity().extractRotation(ctrl.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(ctrl.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tmpM);
  pickFromRay();
}

/* órbita manual para la vista 3D */
const orbit = { theta: 0, phi: 0.8, r: 5.6, target: new THREE.Vector3(0, 0.7, 0.9), drag: null, pinch: null, moved: 0 };
function updateOrbitCamera() {
  const o = orbit;
  camera.position.set(o.target.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), o.target.y + o.r * Math.cos(o.phi), o.target.z - o.r * Math.sin(o.phi) * Math.cos(o.theta));
  camera.lookAt(o.target);
}
function setupPointer(canvas) {
  const pts = new Map();
  canvas.addEventListener('pointerdown', e => { canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); orbit.moved = 0; });
  canvas.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    const p = pts.get(e.pointerId); const dx = e.clientX - p.x, dy = e.clientY - p.y;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    orbit.moved += Math.abs(dx) + Math.abs(dy);
    if (pts.size === 1 && !gyro.active) {
      orbit.theta -= dx * 0.008; orbit.phi = Math.min(1.45, Math.max(0.25, orbit.phi - dy * 0.006));
    } else if (pts.size === 2) {
      const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (orbit.pinch) orbit.r = Math.min(14, Math.max(2, orbit.r * orbit.pinch / d));
      orbit.pinch = d;
    }
  });
  const up = e => {
    if (pts.size === 1 && orbit.moved < 8) {
      const rect = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera); pickFromRay();
    }
    pts.delete(e.pointerId); if (pts.size < 2) orbit.pinch = null;
  };
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', e => { pts.delete(e.pointerId); orbit.pinch = null; });
  canvas.addEventListener('wheel', e => { e.preventDefault(); orbit.r = Math.min(14, Math.max(2, orbit.r * (1 + e.deltaY * 0.001))); }, { passive: false });
}

function resize() {
  if (!renderer || mode === 'xr' || !mode) return;
  const c = renderer.domElement; const w = c.clientWidth || 1, h = c.clientHeight || 1;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}

/* ================== bucle de render ================== */
function animate(t, frame) {
  const dt = clock.getDelta(), time = clock.elapsedTime;
  studentObjs.forEach(o => {
    o.status.position.y = 1.5 + Math.sin(time * 4 + o.phase) * 0.04;
    o.head.material.rotation = o.distracted ? 0.35 + Math.sin(time * 1.5 + o.phase) * 0.08 : Math.sin(time * 1.2 + o.phase) * 0.03;
    const s = o.speaking ? 0.42 * (1 + Math.abs(Math.sin(time * 9)) * 0.08) : 0.42;
    o.head.scale.set(s, s, 1);
  });
  if (mode === 'inline' || mode === 'cam') {
    if (gyro.active && gyro.q) { camera.position.set(0, 0, 0); camera.quaternion.copy(gyro.q); }
    else updateOrbitCamera();
  }
  if (mode === 'xr' && frame) {
    if (!placed && hitSource) {
      const res = frame.getHitTestResults(hitSource);
      if (res.length) {
        const pose = res[0].getPose(renderer.xr.getReferenceSpace());
        reticle.visible = true; reticle.matrix.fromArray(pose.transform.matrix);
      } else reticle.visible = false;
    }
    if (hud.visible) followHud(dt);
  }
  renderer.render(scene, camera);
}

/* el panel sigue suavemente la mirada del docente (abajo a la derecha) */
const _v = new THREE.Vector3(), _f = new THREE.Vector3(), _r = new THREE.Vector3(), _target = new THREE.Vector3();
function followHud(dt) {
  const cam = renderer.xr.getCamera();
  cam.getWorldPosition(_v); cam.getWorldDirection(_f); _f.y = 0; _f.normalize();
  _r.crossVectors(_f, new THREE.Vector3(0, 1, 0)).normalize();
  _target.copy(_v).addScaledVector(_f, 0.75).addScaledVector(_r, 0.32); _target.y = _v.y - 0.22;
  hud.position.lerp(_target, Math.min(1, dt * 3));
  hud.lookAt(_v.x, hud.position.y + 0.05, _v.z);
}

/* ================== colocación ================== */
function applyScale() {
  const s = scaleMode === 'table' ? SCALE_TABLE : SCALE_REAL;
  classroom.scale.setScalar(s);
}
function placeClassroom() {
  const cam = renderer.xr.getCamera();
  cam.getWorldPosition(_v); cam.getWorldDirection(_f); _f.y = 0; _f.normalize();
  if (scaleMode === 'table') {
    if (reticle.visible) root.position.setFromMatrixPosition(reticle.matrix);
    else root.position.copy(_v).addScaledVector(_f, 0.6).setY(_v.y - 0.45);
    // el docente observa desde el lado de la pizarra
    const dx = _v.x - root.position.x, dz = _v.z - root.position.z;
    root.rotation.set(0, Math.atan2(-dx, -dz), 0);
    // desplaza el aula para que su centro quede en el punto elegido
    classroom.position.set(0, 0, -0.9 * SCALE_TABLE);
  } else {
    // tamaño real: el docente queda frente a la pizarra mirando a sus estudiantes
    const floorY = reticle.visible ? new THREE.Vector3().setFromMatrixPosition(reticle.matrix).y : (refType === 'local-floor' ? 0 : _v.y - 1.6);
    root.rotation.set(0, Math.atan2(_f.x, _f.z), 0);
    root.position.set(_v.x, floorY, _v.z).addScaledVector(_f, 0.3);
    classroom.position.set(0, 0, 0);
  }
  applyScale();
  root.visible = true; placed = true; reticle.visible = false;
  hud.position.copy(_v).addScaledVector(_f, 0.75);
  hudKey = '';
  $('#xr-status').textContent = 'Toca a un estudiante para darle la palabra o seleccionarlo.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; $('#xr-status').textContent = scaleMode === 'table' ? 'Apunta a una superficie y toca para colocar el aula en miniatura.' : 'Toca para colocar el aula a tamaño real a tu alrededor.'; hudKey = ''; hud.visible = false; }
  if (mode === 'cam') { orbit.r = scaleMode === 'table' ? 7 : 3.2; }
  App.toast(scaleMode === 'table' ? 'Aula en miniatura' : 'Aula a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

/* ================== mover la UI al HUD ================== */
const moved = [];
function moveUiToOverlay() {
  const dest = $('#xr-bottom');
  ['#dialog', '.actions'].forEach(sel => {
    const el = document.querySelector(sel);
    moved.push({ el, parent: el.parentNode, next: el.nextSibling });
    dest.appendChild(el);
  });
  $('#xr-overlay').hidden = false;
}
function restoreUi() {
  while (moved.length) { const m = moved.pop(); m.parent.insertBefore(m.el, m.next); }
  $('#xr-overlay').hidden = true;
}
// evita que los toques sobre la interfaz HTML se interpreten como toques en la escena RA
$('#xr-overlay').addEventListener('beforexrselect', e => { if (e.target !== e.currentTarget) e.preventDefault(); });
$('#xr-exit').onclick = () => stopAll();

/* ================== modos ================== */
function startInline() {
  init(); buildStudents();
  mode = 'inline';
  $('#view3d').hidden = false; $('#room').hidden = true; $('#btn-3d').textContent = '🧩 2D';
  root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); classroom.position.set(0, 0, 0); classroom.scale.setScalar(1); root.visible = true;
  orbit.theta = 0; orbit.phi = 0.8; orbit.r = 5.6;
  scene.background = new THREE.Color(0xcfe3f5);
  resize(); sync();
  renderer.setAnimationLoop(animate);
}
function stopInline() {
  if (renderer) renderer.setAnimationLoop(null);
  $('#view3d').hidden = true; $('#room').hidden = false; $('#btn-3d').textContent = '🧊 3D';
  mode = null;
}

let refType = 'local';
async function startXR(type) {
  init(); buildStudents();
  if (mode === 'inline') stopInline();
  const overlay = $('#xr-overlay');
  const opts = { requiredFeatures: [], optionalFeatures: ['local-floor', 'hit-test', 'dom-overlay'], domOverlay: { root: overlay } };
  try {
    xrSession = await navigator.xr.requestSession(type, opts);
  } catch (e) {
    App.toast('No se pudo iniciar la realidad aumentada: ' + e.message, 4000); return;
  }
  try { await xrSession.requestReferenceSpace('local-floor'); refType = 'local-floor'; } catch (e) { refType = 'local'; }
  renderer.xr.setReferenceSpaceType(refType);
  await renderer.xr.setSession(xrSession);
  mode = 'xr'; placed = false; hudKey = '';
  domOverlayOn = !!xrSession.domOverlayState;
  scaleMode = domOverlayOn ? 'table' : 'real';
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xcfe3f5) : null;
  root.visible = false;
  if (domOverlayOn) moveUiToOverlay();
  $('#xr-status').textContent = 'Mueve el dispositivo para detectar una superficie y toca para colocar el aula.';
  hitSource = null;
  try {
    const viewer = await xrSession.requestReferenceSpace('viewer');
    hitSource = await xrSession.requestHitTestSource({ space: viewer });
  } catch (e) { /* sin hit-test: se coloca frente al usuario */ }
  if (!hitSource && !domOverlayOn) placeClassroom();
  xrSession.addEventListener('end', onXREnd);
  renderer.setAnimationLoop(animate);
  sync();
}
function onXREnd() {
  if (hitSource) { hitSource.cancel?.(); hitSource = null; }
  xrSession = null; mode = null; placed = false;
  hud.visible = false; reticle.visible = false; root.visible = true;
  renderer.setAnimationLoop(null);
  restoreUi();
  App.notify();
}

/* alternativa para celulares sin WebXR (iOS): cámara + giroscopio */
const gyro = { active: false, q: null, alpha0: null };
const zee = new THREE.Vector3(0, 0, 1), q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)), q0 = new THREE.Quaternion(), eul = new THREE.Euler();
function onOrient(e) {
  if (e.alpha == null) return;
  if (gyro.alpha0 == null) gyro.alpha0 = e.alpha;
  const d = Math.PI / 180;
  const orient = (screen.orientation ? screen.orientation.angle : window.orientation || 0) * d;
  eul.set(e.beta * d, (e.alpha - gyro.alpha0) * d, -e.gamma * d, 'YXZ');
  const q = gyro.q || new THREE.Quaternion();
  q.setFromEuler(eul); q.multiply(q1); q.multiply(q0.setFromAxisAngle(zee, -orient));
  gyro.q = q; gyro.active = true;
}
let camStream = null;
async function startCam() {
  init(); buildStudents();
  if (mode === 'inline') stopInline();
  try {
    camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
  } catch (e) {
    App.toast('No se pudo acceder a la cámara. Se abrirá la vista 3D.', 3500); startInline(); return;
  }
  const v = $('#cam-video'); v.srcObject = camStream; v.hidden = false; await v.play().catch(() => {});
  try {
    if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) await DeviceOrientationEvent.requestPermission();
    window.addEventListener('deviceorientation', onOrient);
  } catch (e) { /* sin giroscopio: se usa arrastre */ }
  mode = 'cam'; scaleMode = 'table';
  document.body.classList.add('cam-mode');
  $('#view3d').hidden = false; $('#room').hidden = true;
  scene.background = null;
  root.visible = true; classroom.scale.setScalar(1);
  // el docente queda de pie frente a la pizarra mirando a sus estudiantes;
  // con giroscopio el aula queda anclada en el espacio
  root.rotation.set(0, Math.PI, 0); root.position.set(0, -1.6, -0.5); classroom.position.set(0, 0, 0);
  orbit.theta = 0; orbit.phi = 1.05; orbit.r = 7;
  camera.position.set(0, 0, 0); gyro.alpha0 = null; gyro.q = null; gyro.active = false;
  moveUiToOverlay();
  $('#xr-status').textContent = 'Modo cámara: mueve tu celular para mirar el aula. Toca a un estudiante para interactuar.';
  resize(); sync();
  renderer.setAnimationLoop(animate);
  // si no llegan datos del giroscopio, se usa órbita con el aula frente a la cámara
  setTimeout(() => { if (mode === 'cam' && !gyro.active) { root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); classroom.position.set(0, 0, 0); App.toast('Sin giroscopio: arrastra para girar el aula.'); } }, 1500);
}
function stopCam() {
  window.removeEventListener('deviceorientation', onOrient);
  gyro.active = false; gyro.q = null;
  if (camStream) camStream.getTracks().forEach(t => t.stop()); camStream = null;
  $('#cam-video').hidden = true; document.body.classList.remove('cam-mode');
  root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); classroom.position.set(0, 0, 0);
  restoreUi();
  renderer.setAnimationLoop(null);
  $('#view3d').hidden = true; $('#room').hidden = false;
  mode = null;
}

function stopAll() {
  vr.exit();
  if (mode === 'xr' && xrSession) { xrSession.end(); return; }
  if (mode === 'cam') stopCam();
  if (mode === 'inline') stopInline();
}

/* ================== gafas sencillas tipo VR Box (cardboard) ================== */
const TAB_NAMES = { anticipacion: 'Inicio', construccion: 'Desarrollo', consolidacion: 'Cierre', gestion: 'Aula' };
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(20,30,48,.94)',
  // el docente de pie junto a la pizarra, mirando a sus estudiantes
  view: { pos: [0, 1.6, -0.9], target: [0, 0.8, 2.2] },
  prepare: () => {
    if (mode === 'inline') stopInline(); if (mode === 'cam') stopCam();
    init(); buildStudents();
    root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); classroom.position.set(0, 0, 0); classroom.scale.setScalar(1); root.visible = true;
    scene.background = new THREE.Color(0xcfe3f5);
  },
  extra: () => [{ label: '⇄ ' + (TAB_NAMES[App.tab] || 'Pestaña'), fn: () => App.cycleTab() }],
  pick: ray => {
    const hit = ray.intersectObjects([...studentObjs.values()].map(o => o.hit), false)[0];
    if (hit && hit.object.userData.sid) { App.onStudentTap(hit.object.userData.sid); return true; }
    return false;
  }
});

/* ================== botones ================== */
$('#btn-vr').onclick = () => { if (mode !== 'xr') vr.enter(); };
$('#btn-3d').onclick = () => { if (mode === 'inline') stopInline(); else if (!mode) startInline(); };
$('#btn-ar').onclick = async () => {
  if (mode === 'xr' || mode === 'cam') { stopAll(); return; }
  if (!window.isSecureContext) App.toast('La RA requiere HTTPS. Se usará el modo alternativo.', 3500);
  let ar = false, vr = false;
  if (navigator.xr && window.isSecureContext) {
    try { ar = await navigator.xr.isSessionSupported('immersive-ar'); } catch (e) { }
    if (!ar) try { vr = await navigator.xr.isSessionSupported('immersive-vr'); } catch (e) { }
  }
  if (ar) return startXR('immersive-ar');
  if (vr) return startXR('immersive-vr');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) return startCam();
  App.toast('Este dispositivo no admite RA. Abriendo la vista 3D.', 3500);
  startInline();
};

window.Aula3D = { stopAll, startInline };
