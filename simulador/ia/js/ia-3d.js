/* =========================================================
   Laboratorio de IA en 3D y Realidad Aumentada – Simulador de
   Proyectos de IA (carrera de Inteligencia Artificial)
   - Oficina/laboratorio con servidores, pantallas y el equipo
     virtual; la pantalla grande muestra la fase y los medidores
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las indicaciones)
   - Gafas sencillas tipo VR Box con control Bluetooth
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';
import { createVrBox } from '../../js/vrbox.js';

const App = window.IaApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const parts = {}; const sprites = { equipo: [], lider: null, contacto: null, nube: null, alerta: null }; const leds = [];
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
const box = (w, h, d, c, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c)); m.position.set(x, y, z); world.add(m); return m; };

function init() {
  if (renderer) return;
  const canvas = $('#canvas3d');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.xr.enabled = true;
  scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(55, 1, 0.01, 60);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x667766, 2.2));
  const dl = new THREE.DirectionalLight(0xffffff, 1.5); dl.position.set(3, 5, 2); scene.add(dl);
  root = new THREE.Group(); scene.add(root);
  world = new THREE.Group(); root.add(world);
  reticle = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.09, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x2e8b2e }));
  reticle.matrixAutoUpdate = false; reticle.visible = false; scene.add(reticle);
  const h = canvasTex(1024, 1100); hudCtx = h.ctx; hudTex = h.tex;
  hud = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.46 * 1100 / 1024), new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, depthTest: false }));
  hud.renderOrder = 20; hud.visible = false; scene.add(hud);
  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    c.addEventListener('select', () => onSelect(c));
    c.addEventListener('connected', e => { if (e.data.targetRayMode === 'tracked-pointer') { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0x2e8b2e })); l.scale.z = 3; l.name = 'ray'; c.add(l); } });
    scene.add(c);
  }
  App.subscribe(() => { if (mode) sync(); });
  addEventListener('resize', resize);
  setupPointer(canvas);
}

function build() {
  builtFor = 'ia';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.equipo = []; leds.length = 0;
  box(5, 0.05, 3.6, 0xcfd8cc, 0, -0.025, 0); // piso
  box(5, 2.3, 0.08, 0xeef5ee, 0, 1.15, -1.8); // pared del fondo
  box(0.08, 2.3, 3.6, 0xe3ece3, -2.5, 1.15, 0); // pared lateral
  // pantalla grande en la pared con la fase y los medidores
  const scr = canvasTex(1024, 512); parts.screen = scr; parts.screenKey = '';
  box(2.3, 1.2, 0.06, 0x334155, -0.3, 1.55, -1.74);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), new THREE.MeshBasicMaterial({ map: scr.tex })); pan.position.set(-0.3, 1.55, -1.7); world.add(pan);
  // racks de servidores con luces
  for (let r = 0; r < 2; r++) {
    const x = 1.6 + r * 0.6;
    box(0.5, 1.9, 0.6, 0x334155, x, 0.95, -1.35);
    for (let i = 0; i < 7; i++) {
      box(0.44, 0.18, 0.02, 0x1e293b, x, 0.3 + i * 0.23, -1.04);
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
      led.position.set(x + 0.15, 0.3 + i * 0.23, -1.025); world.add(led); leds.push(led);
    }
  }
  // escritorios con monitores para el equipo
  for (let i = 0; i < 3; i++) {
    const x = -1.7 + i * 1.05;
    box(0.9, 0.05, 0.55, 0x8a6a3b, x, 0.74, 0.35);
    [-0.4, 0.4].forEach(dx => box(0.05, 0.72, 0.5, 0x6b4f2a, x + dx, 0.36, 0.35));
    box(0.46, 0.3, 0.03, 0x1f2937, x, 0.98, 0.18);
    const mon = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.26), new THREE.MeshBasicMaterial({ color: 0x93c5fd })); mon.position.set(x, 0.98, 0.197); world.add(mon); parts['mon' + i] = mon;
    box(0.06, 0.12, 0.06, 0x1f2937, x, 0.8, 0.18);
    const sp = emoji('🧑🏽‍💻', 0.55); sp.position.set(x, 1.0, 0.8); world.add(sp); sprites.equipo.push(sp);
  }
  // mesa de reuniones para el cliente
  box(0.8, 0.05, 0.8, 0xd6d3d1, 1.5, 0.74, 0.9); box(0.08, 0.72, 0.08, 0x78716c, 1.5, 0.36, 0.9);
  const lap = emoji('💻', 0.3); lap.position.set(1.4, 0.92, 0.9); world.add(lap);
  sprites.contacto = emoji('👩🏽‍🌾', 0.6); sprites.contacto.position.set(1.95, 1.0, 1.1); world.add(sprites.contacto);
  sprites.lider = emoji('💬', 0.25); world.add(sprites.lider);
  sprites.nube = emoji('☁️', 0.6); sprites.nube.position.set(1.9, 2.25, -1.3); world.add(sprites.nube);
  sprites.alerta = emoji('⚠️', 0.45); sprites.alerta.position.set(1.9, 2.25, -1.0); world.add(sprites.alerta);
  const planta = emoji('🪴', 0.5); planta.position.set(-2.2, 0.3, -1.4); world.add(planta);
  const lt = canvasTex(512, 128); parts.label = lt;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt.tex, transparent: true })); ls.scale.set(1.8, 0.45, 1); ls.position.set(-0.3, 2.55, -1.6); world.add(ls);
  parts.labelKey = '';
}

function drawScreen(e) {
  const key = [e.etapa, Math.round(e.prec), Math.round(e.equi), Math.round(e.priv), Math.round(e.sat), e.caida, e.fin].join('|');
  if (parts.screenKey === key) return; parts.screenKey = key;
  const { ctx, tex } = parts.screen, W = 1024, H = 512;
  ctx.fillStyle = '#14261a'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c8f7c5'; ctx.font = `bold 44px Nunito, ${EMOJI_FONT}`; ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  ctx.fillText(e.fin ? '✔ Proyecto entregado' : `Fase ${e.etapa + 1}/${e.total} · ${e.fase}`, 36, 28);
  // línea de fases
  for (let i = 0; i < e.total; i++) { const x = 70 + i * 108; ctx.fillStyle = i < e.etapa ? '#22c55e' : i === e.etapa && !e.fin ? '#fbbf24' : '#475569'; ctx.beginPath(); ctx.arc(x, 130, 22, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#0f172a'; ctx.font = 'bold 24px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(i + 1), x, 131); }
  // medidores
  [['🎯 Precisión', e.prec], ['⚖️ Equidad', e.equi], ['🔒 Privacidad', e.priv], ['😊 Cliente', e.sat]].forEach(([n, v], i) => {
    const y = 200 + i * 72; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#e2e8f0'; ctx.font = `30px Nunito, ${EMOJI_FONT}`; ctx.fillText(n, 36, y + 20);
    ctx.fillStyle = '#334155'; roundRect(ctx, 300, y + 4, 600, 32, 16); ctx.fill();
    ctx.fillStyle = v >= 66 ? '#22c55e' : v >= 34 ? '#fbbf24' : '#ef4444'; roundRect(ctx, 300, y + 4, Math.max(32, 6 * v), 32, 16); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 26px Nunito, sans-serif'; ctx.fillText(Math.round(v) + '%', 915, y + 21);
  });
  if (e.caida) { ctx.fillStyle = 'rgba(220,38,38,.9)'; roundRect(ctx, 620, 18, 380, 70, 18); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = `bold 34px Nunito, ${EMOJI_FONT}`; ctx.textAlign = 'center'; ctx.fillText('⚠️ Servicio caído', 810, 54); }
  tex.needsUpdate = true;
}

function sync() {
  const e = App.escena(); if (!e) return;
  if (builtFor !== 'ia') build();
  drawScreen(e);
  e.equipo.forEach((c, i) => {
    const sp = sprites.equipo[i]; if (!sp) return;
    if (sp.userData.cur !== c.avatar) { sp.userData.draw(c.avatar); sp.userData.cur = c.avatar; }
    parts['mon' + i].material.color.set(c.lider ? 0x4ade80 : 0x93c5fd);
  });
  const li = e.equipo.findIndex(c => c.lider);
  sprites.lider.visible = li >= 0; if (li >= 0) sprites.lider.position.set(-1.7 + li * 1.05 + 0.3, 1.45, 0.8);
  sprites.contacto.visible = !!e.contacto; if (e.contacto && sprites.contacto.userData.cur !== e.contacto) { sprites.contacto.userData.draw(e.contacto); sprites.contacto.userData.cur = e.contacto; }
  sprites.nube.visible = e.nube && !e.caida; sprites.alerta.visible = !!e.caida;
  leds.forEach((l, i) => l.material.color.set(e.caida ? (i % 2 ? 0xef4444 : 0x7f1d1d) : (i % 3 ? 0x22c55e : 0x38bdf8)));
  const key = e.dia + e.cliente;
  if (parts.labelKey !== key) {
    parts.labelKey = key; const { ctx, tex } = parts.label;
    ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = 'rgba(255,255,255,.92)'; roundRect(ctx, 4, 4, 504, 120, 24); ctx.fill();
    ctx.fillStyle = '#1B4D22'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 28px Nunito, sans-serif'; ctx.fillText(e.cliente.length > 34 ? e.cliente.slice(0, 33) + '…' : e.cliente, 256, 42);
    ctx.font = 'bold 36px Nunito, sans-serif'; ctx.fillText(`📅 Día ${e.dia}`, 256, 90); tex.needsUpdate = true;
  }
  drawHud();
}

function drawHud() {
  const show = mode === 'xr' && !domOverlay && placed; hud.visible = show; if (!show) return;
  const d = App.getHud(); const btns = d.buttons.slice(0, 9);
  const key = d.text + btns.map(b => b.label + b.disabled).join('|') + d.busy + scaleMode; if (key === hudKey) return; hudKey = key;
  const ctx = hudCtx, W = 1024, H = 1100; ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(16,40,22,.92)'; roundRect(ctx, 0, 0, W, H, 36); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = `30px Nunito, ${EMOJI_FONT}`; ctx.textBaseline = 'top';
  const lines = wrap(ctx, d.text, W - 64).slice(0, 6); lines.forEach((l, i) => ctx.fillText(l, 32, 28 + i * 38));
  hudRects = []; let y = 28 + lines.length * 38 + 16; ctx.font = `bold 28px Nunito, ${EMOJI_FONT}`;
  btns.forEach(b => { const r = { x: 28, y, w: W - 56, h: 70, el: b.el, disabled: b.disabled }; ctx.fillStyle = b.disabled ? 'rgba(255,255,255,.12)' : '#fff'; roundRect(ctx, r.x, r.y, r.w, r.h, 16); ctx.fill(); ctx.fillStyle = b.disabled ? '#999' : '#1c2738'; ctx.textBaseline = 'middle'; ctx.fillText(b.label.length > 58 ? b.label.slice(0, 56) + '…' : b.label, r.x + 18, r.y + r.h / 2); ctx.textBaseline = 'top'; hudRects.push(r); y += 80; });
  const bottom = [{ label: scaleMode === 'table' ? '↕ Tamaño real' : '↕ Miniatura', fn: toggleScale }, { label: '✕ Salir', fn: stopAll }];
  bottom.forEach((b, i) => { const r = { x: 28 + i * 490, y: H - 96, w: 478, h: 72, fn: b.fn }; ctx.fillStyle = i ? '#dc2626' : '#2E8B2E'; roundRect(ctx, r.x, r.y, r.w, r.h, 16); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(b.label, r.x + r.w / 2, r.y + 36); ctx.textAlign = 'left'; ctx.textBaseline = 'top'; hudRects.push(r); });
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
  $('#xr-status').textContent = 'Laboratorio colocado. Usa el panel para dirigir el proyecto.';
  sync();
}
function toggleScale() {
  scaleMode = scaleMode === 'table' ? 'real' : 'table';
  if (mode === 'xr') { placed = false; root.visible = false; hud.visible = false; $('#xr-status').textContent = 'Toca para colocar de nuevo la escena.'; }
  App.toast(scaleMode === 'table' ? 'Laboratorio en miniatura' : 'Laboratorio a tamaño real');
}
$('#xr-scale').onclick = toggleScale;

const orbit = { theta: 0.45, phi: 1.1, r: 5.6, target: new THREE.Vector3(0, 0.9, -0.2) };
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
  if (sprites.lider) sprites.lider.position.y = 1.45 + Math.sin(time * 4) * 0.03;
  if (sprites.alerta && sprites.alerta.visible) sprites.alerta.material.opacity = 0.55 + Math.abs(Math.sin(time * 5)) * 0.45;
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
  scene.background = new THREE.Color(0xeef5ee);
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
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xeef5ee) : null; root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { vr.exit(); if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

/* gafas sencillas tipo VR Box (cardboard) */
const vr = createVrBox({
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(16,40,22,.94)', view: { pos: [0.6, 1.6, 3.4], target: [-0.3, 1.1, -1.2] },
  prepare: () => { if (mode === 'inline') stopInline(); init(); build(); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0); world.scale.setScalar(1); root.visible = true; scene.background = new THREE.Color(0xeef5ee); }
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
window.Ia3D = { stopAll };
