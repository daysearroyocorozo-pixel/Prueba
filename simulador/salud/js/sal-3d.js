/* =========================================================
   Centro de salud en 3D y Realidad Aumentada – Simulador de Gestión
   en Salud
   - Ventanilla de admisión, sala de espera con los usuarios en tiempo
     real y farmacia cuyo stock refleja el abastecimiento
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';

const App = window.SalApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const parts = {}; const sprites = { cola: [], actual: null, cerrado: null }; const cajas = [];
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
const P = (x, y) => [(x - 330) / 100, (y - 150) / 100]; // coordenadas de la escena 2D → 3D

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.01, 60);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x667788, 2.2));
  const dl = new THREE.DirectionalLight(0xffffff, 1.5); dl.position.set(3, 5, 2); scene.add(dl);
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
}

function build() {
  builtFor = 'sal';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.cola = []; cajas.length = 0;
  const piso = new THREE.Mesh(new THREE.BoxGeometry(5, 0.05, 3.6), mat(0xe7e5e4)); piso.position.y = -0.025; world.add(piso);
  const pared = new THREE.Mesh(new THREE.BoxGeometry(5, 2.2, 0.08), mat(0xecfdf5)); pared.position.set(0, 1.1, -1.8); world.add(pared);
  const zocalo = new THREE.Mesh(new THREE.BoxGeometry(5, 0.25, 0.09), mat(0x16a34a)); zocalo.position.set(0, 0.125, -1.79); world.add(zocalo);
  // cruz verde del establecimiento de salud
  const cruzV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.45, 0.04), mat(0x16a34a)); cruzV.position.set(-2.1, 1.75, -1.74); world.add(cruzV);
  const cruzH = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.14, 0.04), mat(0x16a34a)); cruzH.position.set(-2.1, 1.75, -1.74); world.add(cruzH);
  // ventanilla de admisión
  const mostrador = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.5), mat(0x15803d)); mostrador.position.set(-1.3, 0.45, -0.9); world.add(mostrador);
  const tablero = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.05, 0.6), mat(0x166534)); tablero.position.set(-1.3, 0.92, -0.9); world.add(tablero);
  const vidrio = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.02), new THREE.MeshStandardMaterial({ color: 0xbbf7d0, transparent: true, opacity: 0.35 })); vidrio.position.set(-1.3, 1.25, -0.7); world.add(vidrio);
  const pc = emoji('💻', 0.35); pc.position.set(-1.6, 1.12, -1.0); world.add(pc);
  const hc = emoji('🗂️', 0.28); hc.position.set(-0.85, 1.1, -1.0); world.add(hc);
  const yo = emoji('🧑🏽‍💼', 0.6); yo.position.set(-1.3, 1.2, -1.35); world.add(yo);
  const planta = emoji('🪴', 0.5); planta.position.set(-2.25, 0.3, 0.9); world.add(planta);
  const adm = canvasTex(512, 128); adm.ctx.fillStyle = '#166534'; roundRect(adm.ctx, 4, 4, 504, 120, 20); adm.ctx.fill(); adm.ctx.fillStyle = '#fff'; adm.ctx.font = 'bold 56px Nunito, sans-serif'; adm.ctx.textAlign = 'center'; adm.ctx.textBaseline = 'middle'; adm.ctx.fillText('ADMISIÓN', 256, 66); adm.tex.needsUpdate = true;
  const admS = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.2), new THREE.MeshBasicMaterial({ map: adm.tex, transparent: true })); admS.position.set(-1.3, 1.75, -1.75); world.add(admS);
  // farmacia: estantería con cajas que reflejan el abastecimiento
  const est = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.5, 0.35), mat(0xf8fafc)); est.position.set(1.6, 0.75, -1.55); world.add(est);
  for (let r = 0; r < 3; r++) { const tabla = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.03, 0.36), mat(0x94a3b8)); tabla.position.set(1.6, 0.35 + r * 0.45, -1.5); world.add(tabla); }
  const colores = [0x38bdf8, 0xf472b6, 0xfacc15, 0x4ade80];
  for (let i = 0; i < 15; i++) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.2), mat(colores[i % 4])); c.position.set(1.15 + (i % 5) * 0.22, 0.47 + Math.floor(i / 5) * 0.45, -1.45); world.add(c); cajas.push(c); }
  const fa = canvasTex(512, 128); fa.ctx.fillStyle = '#0369a1'; roundRect(fa.ctx, 4, 4, 504, 120, 20); fa.ctx.fill(); fa.ctx.fillStyle = '#fff'; fa.ctx.font = `bold 52px Nunito, ${EMOJI_FONT}`; fa.ctx.textAlign = 'center'; fa.ctx.textBaseline = 'middle'; fa.ctx.fillText('💊 FARMACIA', 256, 66); fa.tex.needsUpdate = true;
  const faS = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.2), new THREE.MeshBasicMaterial({ map: fa.tex, transparent: true })); faS.position.set(1.6, 1.75, -1.75); world.add(faS);
  // cartel de atención prioritaria y sillas de la sala de espera
  const prio = canvasTex(512, 160); prio.ctx.fillStyle = '#fef3c7'; roundRect(prio.ctx, 4, 4, 504, 152, 20); prio.ctx.fill(); prio.ctx.fillStyle = '#92400e'; prio.ctx.font = `bold 44px Nunito, ${EMOJI_FONT}`; prio.ctx.textAlign = 'center'; prio.ctx.textBaseline = 'middle'; prio.ctx.fillText('⭐ ATENCIÓN', 256, 55); prio.ctx.fillText('PRIORITARIA', 256, 110); prio.tex.needsUpdate = true;
  const cartel = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.22), new THREE.MeshBasicMaterial({ map: prio.tex, transparent: true })); cartel.position.set(0.2, 1.7, -1.75); world.add(cartel);
  for (let i = 0; i < 10; i++) { const fila = Math.floor(i / 5), x = -0.2 + (i % 5) * 0.42, z = 0.25 + fila * 0.75; const silla = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.34), mat(0x0ea5e9)); silla.position.set(x, 0.38, z); world.add(silla); const resp = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.05), mat(0x0284c7)); resp.position.set(x, 0.58, z + 0.17); world.add(resp); const pata = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.05), mat(0x475569)); pata.position.set(x, 0.18, z); world.add(pata); }
  sprites.actual = emoji('🙂', 0.6); sprites.actual.position.set(-1.3, 0.55, -0.35); world.add(sprites.actual);
  for (let i = 0; i < 10; i++) { const sp = emoji('🧍', 0.5); world.add(sp); const st = emoji('⭐', 0.18); world.add(st); sprites.cola.push({ sp, st }); }
  sprites.cerrado = emoji('🔒', 0.5); sprites.cerrado.position.set(-1.3, 1.3, -0.6); world.add(sprites.cerrado);
  const lt = canvasTex(512, 128); parts.label = lt;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt.tex, transparent: true })); ls.scale.set(1.8, 0.45, 1); ls.position.set(0, 2.5, -1.7); world.add(ls);
  parts.labelKey = '';
}

function sync() {
  const e = App.escena(); if (!e) return;
  if (builtFor !== 'sal') build();
  const a = sprites.actual; a.visible = !!e.actual; if (e.actual && a.userData.cur !== e.actual) { a.userData.draw(e.actual); a.userData.cur = e.actual; }
  sprites.cola.forEach((q, i) => {
    const c = e.cola[i]; q.sp.visible = !!c; q.st.visible = !!(c && c.prio);
    if (!c) return;
    if (q.sp.userData.cur !== c.avatar) { q.sp.userData.draw(c.avatar); q.sp.userData.cur = c.avatar; }
    const x = -0.2 + (i % 5) * 0.42, z = 0.25 + Math.floor(i / 5) * 0.75; q.sp.position.set(x, 0.66, z); q.st.position.set(x + 0.18, 0.98, z);
  });
  const llenas = Math.round((e.abast ?? 100) / 100 * cajas.length); cajas.forEach((c, i) => { c.visible = i < llenas; });
  sprites.cerrado.visible = !e.abierta;
  const key = e.hora + e.abierta;
  if (parts.labelKey !== key) {
    parts.labelKey = key; const { ctx, tex } = parts.label;
    ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = 'rgba(255,255,255,.92)'; roundRect(ctx, 4, 4, 504, 120, 24); ctx.fill();
    ctx.fillStyle = '#14532d'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 30px Nunito, sans-serif'; ctx.fillText('Centro de Salud «Río Puyo»', 256, 42);
    ctx.font = 'bold 36px Nunito, sans-serif'; ctx.fillText(`🕗 ${e.hora}`, 256, 90); tex.needsUpdate = true;
  }
  drawHud();
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
  $('#xr-status').textContent = 'Centro de salud colocado. Usa el panel para atender a los usuarios.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; hud.visible = false; $('#xr-status').textContent = 'Toca para colocar de nuevo la escena.'; }
  App.toast(scaleMode === 'table' ? 'Centro de salud en miniatura' : 'Centro de salud a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

const orbit = { theta: 0.5, phi: 1.05, r: 5.5, target: new THREE.Vector3(0, 0.8, 0) };
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
  if (sprites.actual) sprites.actual.position.y = 0.55 + Math.sin(time * 4) * 0.02;
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
  scene.background = new THREE.Color(0xecfdf5);
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
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xecfdf5) : null; root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { vr.exit(); if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

/* gafas sencillas tipo VR Box (cardboard) */
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(10,40,38,.94)', view: { pos: [0.4, 1.6, 3.6], target: [-0.4, 0.8, -0.8] },
  prepare: () => { if (mode === 'inline') stopInline(); init(); build(); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; scene.background = new THREE.Color(0xecfdf5); }
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
window.Sal3D = { stopAll };
