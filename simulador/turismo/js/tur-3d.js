/* =========================================================
   Sendero amazónico en 3D y Realidad Aumentada – Simulador de
   Operaciones Turísticas
   - Sendero con río, comunidad (cabaña), cascada y el grupo de
     turistas que avanza según la fase del tour
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';

const App = window.TurApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const parts = {}; const sprites = { grupo: [], guia: null, lluvia: null };
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();

function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return { c, ctx, tex }; }
function emoji(e, scale = 0.4, size = 128) {
  const { ctx, tex } = canvasTex(size, size);
  const draw = x => { ctx.clearRect(0, 0, size, size); ctx.font = `${size * 0.8}px ${EMOJI_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(x, size / 2, size / 2 + size * 0.05); tex.needsUpdate = true; };
  draw(e);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sp.scale.set(scale, scale, 1); sp.userData.draw = draw; sp.userData.cur = e;
  return sp;
}
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function wrap(ctx, t, w) { const out = []; let l = ''; for (const word of String(t).split(/\s+/)) { const n = l ? l + ' ' + word : word; if (ctx.measureText(n).width > w && l) { out.push(l); l = word; } else l = n; } if (l) out.push(l); return out; }
const mat = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 });
function label(text, w = 1.2) {
  const t = canvasTex(512, 96); t.ctx.fillStyle = 'rgba(255,255,255,.9)'; roundRect(t.ctx, 4, 4, 504, 88, 20); t.ctx.fill();
  t.ctx.fillStyle = '#1B4D22'; t.ctx.font = 'bold 40px Nunito, sans-serif'; t.ctx.textAlign = 'center'; t.ctx.textBaseline = 'middle'; t.ctx.fillText(text, 256, 50); t.tex.needsUpdate = true;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t.tex, transparent: true, depthWrite: false })); s.scale.set(w, w * 96 / 512, 1); return s;
}

/* puntos del sendero por fase (x, z) */
const RUTA = [[-2.1, 0.9], [-2.1, 0.9], [-1.4, 0.5], [-0.7, -0.2], [0.2, -0.5], [0.2, -0.5], [1.5, -0.6], [1.5, -0.6], [-1.9, 0.9]];

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.01, 60);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x556b2f, 2.2));
  const dl = new THREE.DirectionalLight(0xffffff, 1.5); dl.position.set(3, 5, 2); scene.add(dl);
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
}

function arbol(x, z, s = 1) {
  const g = new THREE.Group();
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * s, 0.06 * s, 0.6 * s, 8), mat(0x78350f)); tr.position.y = 0.3 * s; g.add(tr);
  const co = new THREE.Mesh(new THREE.SphereGeometry(0.28 * s, 10, 8), mat(0x166534)); co.position.y = 0.7 * s; g.add(co);
  const co2 = new THREE.Mesh(new THREE.SphereGeometry(0.2 * s, 10, 8), mat(0x15803d)); co2.position.set(0.12 * s, 0.85 * s, 0.05); g.add(co2);
  g.position.set(x, 0, z); world.add(g);
}

function build() {
  builtFor = 'tur';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.grupo = [];
  const suelo = new THREE.Mesh(new THREE.BoxGeometry(5, 0.05, 3.6), mat(0x4d7c0f)); suelo.position.y = -0.025; world.add(suelo);
  // río a lo largo del frente
  parts.rio = new THREE.Mesh(new THREE.BoxGeometry(5, 0.04, 0.7), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, transparent: true, opacity: 0.85 }));
  parts.rio.position.set(0, 0.01, 1.45); world.add(parts.rio);
  // sendero de tierra
  for (let i = 0; i < RUTA.length - 2; i++) {
    const [x1, z1] = RUTA[i], [x2, z2] = RUTA[i + 1]; const len = Math.hypot(x2 - x1, z2 - z1); if (len < 0.01) continue;
    const seg = new THREE.Mesh(new THREE.BoxGeometry(len + 0.2, 0.012, 0.28), mat(0xa16207));
    seg.position.set((x1 + x2) / 2, 0.006, (z1 + z2) / 2); seg.rotation.y = -Math.atan2(z2 - z1, x2 - x1); world.add(seg);
  }
  // punto de encuentro en Puyo
  const poste = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 0.05), mat(0x334155)); poste.position.set(-2.3, 0.3, 0.5); world.add(poste);
  const cartel = label('PUYO', 0.6); cartel.position.set(-2.3, 0.7, 0.5); world.add(cartel);
  parts.bus = emoji('🚐', 0.55); parts.bus.position.set(-2.0, 0.28, 1.0); world.add(parts.bus);
  // centro de rescate y parque etnobotánico
  const l1 = label('Paseo de los Monos · Omaere', 1.3); l1.position.set(-0.8, 1.3, -0.9); world.add(l1);
  const mono = emoji('🐒', 0.35); mono.position.set(-0.9, 0.9, -0.7); world.add(mono); parts.mono = mono;
  const loro = emoji('🦜', 0.3); loro.position.set(-0.5, 1.0, -0.9); world.add(loro);
  // cabaña de la comunidad kichwa
  const cab = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.6), mat(0xd6a76a)); cab.position.set(0.3, 0.25, -1.1); world.add(cab);
  const techo = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.45, 4), mat(0xa16207)); techo.position.set(0.3, 0.72, -1.1); techo.rotation.y = Math.PI / 4; world.add(techo);
  const puerta = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.02), mat(0x78350f)); puerta.position.set(0.3, 0.15, -0.79); world.add(puerta);
  const l2 = label('Comunidad kichwa', 1.0); l2.position.set(0.3, 1.2, -1.1); world.add(l2);
  parts.olla = emoji('🍲', 0.3); parts.olla.position.set(0.75, 0.3, -0.7); world.add(parts.olla);
  // cascada
  const roca = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.4), mat(0x57534e)); roca.position.set(1.9, 0.7, -1.2); world.add(roca);
  parts.agua = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 1.35), new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.85 })); parts.agua.position.set(1.9, 0.68, -0.99); world.add(parts.agua);
  const poza = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.03, 20), new THREE.MeshStandardMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.85 })); poza.position.set(1.8, 0.015, -0.6); world.add(poza);
  const l3 = label('Cascada', 0.7); l3.position.set(1.9, 1.6, -1.2); world.add(l3);
  parts.salvavidas = emoji('🛟', 0.3); parts.salvavidas.position.set(1.4, 0.2, -0.3); world.add(parts.salvavidas);
  // vegetación
  [[-1.6, -1.3, 1.2], [-2.2, -0.4, 1], [-1.1, -1.4, 0.9], [0.9, -1.5, 1.1], [1.0, 0.4, 0.9], [2.2, 0.3, 1.2], [-0.2, 0.7, 0.8], [2.3, -0.4, 0.9], [-0.3, -1.5, 1]].forEach(([x, z, s]) => arbol(x, z, s));
  // guía y grupo
  sprites.guia = emoji('🧑🏽‍🦱', 0.42); world.add(sprites.guia);
  const flag = emoji('🚩', 0.18); world.add(flag); parts.flag = flag;
  for (let i = 0; i < 10; i++) { const sp = emoji('🙂', 0.32); sp.visible = false; world.add(sp); sprites.grupo.push(sp); }
  // lluvia
  const n = 300, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - 0.5) * 5; pos[i * 3 + 1] = Math.random() * 2.5; pos[i * 3 + 2] = (Math.random() - 0.5) * 3.6; }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  sprites.lluvia = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x64748b, size: 0.025 })); sprites.lluvia.visible = false; world.add(sprites.lluvia);
  // rótulo con fase y hora
  const lt = canvasTex(512, 128); parts.label = lt;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt.tex, transparent: true })); ls.scale.set(1.8, 0.45, 1); ls.position.set(0, 2.2, -1.6); world.add(ls);
  parts.labelKey = '';
}

const target = new THREE.Vector3();
function sync() {
  const e = App.escena(); if (!e) return;
  if (builtFor !== 'tur') build();
  const k = Math.min(e.etapa, RUTA.length - 1), [x, z] = RUTA[k];
  target.set(x, 0, z);
  sprites.grupo.forEach((sp, i) => {
    const c = e.grupo[i]; sp.visible = !!c; if (!c) return;
    if (sp.userData.cur !== c.avatar) { sp.userData.draw(c.avatar); sp.userData.cur = c.avatar; }
    sp.userData.off = [0.35 + (i % 5) * 0.2, 0.18 + Math.floor(i / 5) * 0.22];
  });
  if (!mode || !sprites.guia.userData.placed) { // VR Box (sin bucle propio) o primera vez: ubicar sin animación
    sprites.guia.userData.placed = true; sprites.guia.position.set(x, 0.22, z); parts.flag.position.set(x + 0.12, 0.55, z);
    sprites.grupo.forEach(sp => { if (sp.userData.off) sp.position.set(x + sp.userData.off[0], 0.17, z + sp.userData.off[1]); });
  }
  parts.bus.visible = k <= 2 || k >= 8;
  parts.olla.visible = k === 5; parts.salvavidas.visible = k === 6;
  sprites.lluvia.visible = !!e.lluvia;
  parts.rio.position.y = e.lluvia ? 0.05 : 0.01; parts.rio.scale.z = e.lluvia ? 1.3 : 1;
  parts.rio.material.color.set(e.lluvia ? 0x92400e : 0x0284c7);
  if (mode === 'inline') scene.background = new THREE.Color(e.lluvia ? 0xcbd5e1 : 0xd9f99d);
  const key = e.hora + e.fase;
  if (parts.labelKey !== key) {
    parts.labelKey = key; const { ctx, tex } = parts.label;
    ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = 'rgba(255,255,255,.92)'; roundRect(ctx, 4, 4, 504, 120, 24); ctx.fill();
    ctx.fillStyle = '#1B4D22'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 30px Nunito, sans-serif'; ctx.fillText(e.fase.length > 30 ? e.fase.slice(0, 29) + '…' : e.fase, 256, 42);
    ctx.font = `bold 36px Nunito, ${EMOJI_FONT}`; ctx.fillText(`🕗 ${e.hora}`, 256, 90); tex.needsUpdate = true;
  }
  drawHud();
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
  if (reticle.visible) root.position.setFromMatrixPosition(reticle.matrix); else root.position.copy(_v).addScaledVector(_f, scaleMode === 'table' ? 0.7 : 3).setY(_v.y - (scaleMode === 'table' ? 0.45 : 1.6));
  root.rotation.set(0, Math.atan2(_v.x - root.position.x, _v.z - root.position.z), 0);
  world.scale.setScalar(scaleMode === 'table' ? 0.12 : 1);
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

const orbit = { theta: 0.35, phi: 1.0, r: 5.6, target: new THREE.Vector3(0, 0.5, 0) };
function updateOrbit() { const o = orbit; camera.position.set(o.target.x + o.r * Math.sin(o.phi) * Math.sin(o.theta), o.target.y + o.r * Math.cos(o.phi), o.target.z + o.r * Math.sin(o.phi) * Math.cos(o.theta)); camera.lookAt(o.target); }
function setupPointer(cv) {
  const pts = new Map(); let pinch = null;
  cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
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
  // el guía y el grupo caminan hacia el punto de la fase actual
  if (sprites.guia) {
    sprites.guia.position.x += (target.x - sprites.guia.position.x) * Math.min(1, dt * 2);
    sprites.guia.position.z += (target.z - sprites.guia.position.z) * Math.min(1, dt * 2);
    sprites.guia.position.y = 0.22 + Math.abs(Math.sin(time * 5)) * 0.02;
    parts.flag.position.set(sprites.guia.position.x + 0.12, 0.55, sprites.guia.position.z);
    sprites.grupo.forEach(sp => { if (!sp.visible || !sp.userData.off) return; const [ox, oz] = sp.userData.off; sp.position.x += (target.x + ox - sp.position.x) * Math.min(1, dt * 1.6); sp.position.z += (target.z + oz - sp.position.z) * Math.min(1, dt * 1.6); sp.position.y = 0.17; });
  }
  if (parts.mono) parts.mono.position.y = 0.9 + Math.sin(time * 3) * 0.05;
  if (parts.agua) parts.agua.material.opacity = 0.75 + Math.sin(time * 8) * 0.1;
  if (sprites.lluvia && sprites.lluvia.visible) { const a = sprites.lluvia.geometry.attributes.position; for (let i = 0; i < a.count; i++) { let y = a.getY(i) - dt * 2.5; if (y < 0) y = 2.5; a.setY(i, y); } a.needsUpdate = true; }
  if (mode === 'inline') updateOrbit();
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
  scene.background = new THREE.Color(0xd9f99d);
  resize(); sync(); renderer.setAnimationLoop(animate);
}
function stopInline() { renderer?.setAnimationLoop(null); $('#view3d').hidden = true; $('#scene').style.display = ''; $('#btn-3d').textContent = '🧊 3D'; mode = null; }

async function startXR(type) {
  init(); build(); if (mode === 'inline') stopInline();
  try { xrSession = await navigator.xr.requestSession(type, { optionalFeatures: ['local-floor', 'hit-test', 'dom-overlay'], domOverlay: { root: $('#xr-overlay') } }); }
  catch (e) { App.toast('No se pudo iniciar la realidad aumentada: ' + e.message, 4000); return; }
  let ref = 'local'; try { await xrSession.requestReferenceSpace('local-floor'); ref = 'local-floor'; } catch (e) { /* local */ }
  renderer.xr.setReferenceSpaceType(ref); await renderer.xr.setSession(xrSession);
  mode = 'xr'; placed = false; hudKey = ''; domOverlay = !!xrSession.domOverlayState; scaleMode = domOverlay ? 'table' : 'real';
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xd9f99d) : null; root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { vr.exit(); if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

/* gafas sencillas tipo VR Box (cardboard) */
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(16,45,22,.94)', view: { pos: [0.4, 1.6, 3.8], target: [0, 0.4, -0.6] },
  prepare: () => { if (mode === 'inline') stopInline(); init(); build(); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; scene.background = new THREE.Color(0xd9f99d); }
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
window.Tur3D = { stopAll };
