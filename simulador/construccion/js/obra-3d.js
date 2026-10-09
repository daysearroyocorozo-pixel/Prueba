/* =========================================================
   Obra en 3D y Realidad Aumentada – Simulador de Obra
   - La vivienda se construye por etapas según el avance de la obra
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';

const App = window.ObraApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const parts = {}; const sprites = { crew: [], rain: null };
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
}

function build() {
  builtFor = 'obra';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.crew = [];
  const ground = new THREE.Mesh(new THREE.BoxGeometry(6, 0.05, 4), mat(0x8bbf6a)); ground.position.y = -0.025; world.add(ground);
  const lot = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.02, 2.6), mat(0xb08350)); lot.position.y = 0.01; world.add(lot);
  const xs = [-1.2, 0, 1.2], zs = [-0.8, 0.8];
  const grupo = k => { const g = new THREE.Group(); g.visible = false; world.add(g); parts[k] = g; return g; };
  // 1 replanteo: estacas y piola
  const rep = grupo('replanteo');
  xs.forEach(x => zs.forEach(z => { const e = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.25, 0.04), mat(0x78350f)); e.position.set(x, 0.12, z); rep.add(e); }));
  const lineMat = new THREE.LineBasicMaterial({ color: 0xf43f5e });
  rep.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([[-1.2, -0.8], [1.2, -0.8], [1.2, 0.8], [-1.2, 0.8], [-1.2, -0.8]].map(([x, z]) => new THREE.Vector3(x, 0.2, z))), lineMat));
  // 2 cimentación: zapatas
  const cim = grupo('cimentacion');
  xs.forEach(x => zs.forEach(z => { const zp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.5), mat(0x9ca3af)); zp.position.set(x, 0.08, z); cim.add(zp); }));
  // 3 columnas y vigas planta baja
  const est1 = grupo('estructura1');
  xs.forEach(x => zs.forEach(z => { const c = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.1, 0.16), mat(0xa8a29e)); c.position.set(x, 0.7, z); est1.add(c); }));
  const losa1 = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 1.9), mat(0xa8a29e)); losa1.position.set(0, 1.31, 0); est1.add(losa1);
  // 4 losa y planta alta
  const est2 = grupo('estructura2');
  xs.forEach(x => zs.forEach(z => { const c = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1, 0.16), mat(0xa8a29e)); c.position.set(x, 1.87, z); est2.add(c); }));
  const losa2 = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 1.9), mat(0xa8a29e)); losa2.position.set(0, 2.43, 0); est2.add(losa2);
  // 5 mampostería
  const mam = grupo('mamposteria'); const brick = mat(0xe8a17a);
  [[0, 0.7, -0.8, 2.4, 1.0, 0.1], [0, 0.7, 0.8, 2.4, 1.0, 0.1], [-1.2, 0.7, 0, 0.1, 1.0, 1.6], [1.2, 0.7, 0, 0.1, 1.0, 1.6],
   [0, 1.87, -0.8, 2.4, 0.9, 0.1], [0, 1.87, 0.8, 2.4, 0.9, 0.1], [-1.2, 1.87, 0, 0.1, 0.9, 1.6], [1.2, 1.87, 0, 0.1, 0.9, 1.6]].forEach(([x, y, z, w, h, d]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), brick); m.position.set(x, y, z); mam.add(m); });
  // 6 instalaciones: tuberías y cables
  const ins = grupo('instalaciones');
  const tubo = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.2), mat(0x2563eb)); tubo.position.set(-0.9, 1.2, 0.86); ins.add(tubo);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2), mat(0xeab308)); cable.position.set(0.9, 1.2, 0.86); ins.add(cable);
  // 7 cubierta
  const cub = grupo('cubierta');
  const techo = new THREE.Mesh(new THREE.ConeGeometry(2.1, 0.8, 4), mat(0xb45309)); techo.rotation.y = Math.PI / 4; techo.scale.set(1, 1, 0.75); techo.position.set(0, 2.9, 0); cub.add(techo);
  // 8 acabados
  const aca = grupo('acabados'); const pintura = mat(0xfef3c7);
  [[0, 0.7, 0.86, 2.4, 1.0, 0.02], [0, 1.87, 0.86, 2.4, 0.9, 0.02]].forEach(([x, y, z, w, h, d]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), pintura); m.position.set(x, y, z); aca.add(m); });
  const puerta = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 0.03), mat(0x78350f)); puerta.position.set(0, 0.52, 0.88); aca.add(puerta);
  [-0.75, 0.75].forEach(x => [0.85, 1.95].forEach(y => { const v = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.03), mat(0x7dd3fc)); v.position.set(x, y, 0.88); aca.add(v); }));
  const arbol = emoji('🌳', 0.8); arbol.position.set(2.3, 0.4, 1.2); aca.add(arbol);
  // obra: valla y materiales
  const obraG = grupo('obra'); const valla = emoji('🚧', 0.45); valla.position.set(2.2, 0.2, 1.4); obraG.add(valla); const bl = emoji('🧱', 0.4); bl.position.set(-2.2, 0.2, 1.3); obraG.add(bl);
  const permiso = emoji('📋', 0.45); permiso.position.set(-2.3, 0.35, -1.4); world.add(permiso); parts.permiso = permiso;
  sprites.rain = emoji('🌧️', 0.9); sprites.rain.position.set(0, 3.8, 0); world.add(sprites.rain);
  App.st.crew.forEach(() => { const s = emoji('👷', 0.32); world.add(s); sprites.crew.push(s); });
  const label = canvasTex(512, 96); label.ctx.fillStyle = 'rgba(255,255,255,.9)'; roundRect(label.ctx, 4, 4, 504, 88, 20); label.ctx.fill(); label.ctx.fillStyle = '#78350f'; label.ctx.font = 'bold 30px Nunito, sans-serif'; label.ctx.textAlign = 'center'; label.ctx.textBaseline = 'middle'; label.ctx.fillText('Vivienda de dos plantas', 256, 50); label.tex.needsUpdate = true;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: label.tex, transparent: true })); ls.scale.set(1.6, 0.3, 1); ls.position.set(0, 3.7, -1.6); world.add(ls);
}

const ORDEN = ['replanteo', 'cimentacion', 'estructura1', 'estructura2', 'mamposteria', 'instalaciones', 'cubierta', 'acabados'];
function sync() {
  const s = App.st; if (!s) return;
  if (builtFor !== 'obra' || sprites.crew.length !== s.crew.length) build();
  const k = App.etapa();
  ORDEN.forEach((n, i) => { parts[n].visible = k >= i + 2; });
  parts.permiso.visible = k <= 1;
  parts.obra.visible = !s.fin;
  sprites.rain.visible = !!s.lluvia;
  s.crew.forEach((c, i) => {
    const sp = sprites.crew[i]; const e = c.lesionado ? '🤕' : c.avatar; if (sp.userData.cur !== e) { sp.userData.draw(e); sp.userData.cur = e; }
    sp.position.set(-1.9 + i * 0.35 + (i > 1 ? 3 : 0), 0.18, 1.5);
  });
  drawHud();
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
  world.scale.setScalar(scaleMode === 'table' ? 0.12 : 1);
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

const orbit = { theta: 0.5, phi: 1.0, r: 7, target: new THREE.Vector3(0, 1.2, 0) };
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
  if (sprites.rain) sprites.rain.position.y = 3.8 + Math.sin(time * 3) * 0.08;
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
  scene.background = new THREE.Color(0xe0f2fe);
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
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(50,30,10,.94)', view: { pos: [0, 1.6, 5.4], target: [0, 1.2, 0] },
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
