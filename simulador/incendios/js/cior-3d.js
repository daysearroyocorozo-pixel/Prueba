/* =========================================================
   Escena 3D y Realidad Aumentada del Simulador de Emergencias
   - Vista 3D interactiva (computadora y celular)
   - WebXR immersive-ar: celulares Android (superposición HTML) y
     gafas de RA/RM (panel flotante 3D con las órdenes)
   ========================================================= */
import * as THREE from '../../vendor/three.module.min.js';

const App = window.CiorApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const sprites = { fire: [], crew: [], vic: [], rings: [], zones: null, smoke: null, amb: null };
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
  const e = App.esc; builtFor = e.id;
  world.clear(); Object.keys(sprites).forEach(k => sprites[k] = Array.isArray(sprites[k]) ? [] : null);
  const groundCol = { estructural: 0xcbd5e1, vehicular: 0x94a3b8, forestal: 0x7fb870, hazmat: 0xa8b3c2 }[e.tipo];
  const ground = new THREE.Mesh(new THREE.BoxGeometry(6, 0.05, 3.4), mat(groundCol)); ground.position.y = -0.025; world.add(ground);
  if (e.tipo === 'vehicular' || e.tipo === 'hazmat') { const road = new THREE.Mesh(new THREE.BoxGeometry(6, 0.02, 0.7), mat(0x475569)); road.position.set(0, 0.01, 0.05); world.add(road); }
  const [ox, oz] = P(330, 150);
  if (e.tipo === 'estructural') {
    const house = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1), mat(0xe7c9a0)); house.position.set(ox, 0.55, oz); world.add(house);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.6, 4), mat(0x9a3412)); roof.position.set(ox, 1.4, oz); roof.rotation.y = Math.PI / 4; world.add(roof);
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.45, 0.02), mat(0x5b3a1e)); door.position.set(ox, 0.23, oz + 0.51); world.add(door);
  } else if (e.tipo === 'vehicular') {
    const car = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.45), mat(0x2563eb)); body.position.y = 0.25; car.add(body);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.42), mat(0x93c5fd)); cab.position.set(-0.05, 0.52, 0); car.add(cab);
    car.position.set(ox, 0, oz); car.rotation.set(0.12, 0.5, 0.18); world.add(car);
    const car2 = car.clone(); car2.children[0].material = mat(0xdc2626); car2.position.set(ox + 1, 0, oz + 0.05); car2.rotation.set(0, -0.3, 0); world.add(car2);
  } else if (e.tipo === 'forestal') {
    for (let i = 0; i < 14; i++) {
      const t = new THREE.Group(); const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.25), mat(0x6b4423)); trunk.position.y = 0.12; t.add(trunk);
      const top = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.45, 8), mat(0x166534)); top.position.y = 0.45; t.add(top);
      t.position.set(ox - 1 + (i % 5) * 0.45 + Math.sin(i) * 0.1, 0, oz - 0.7 + Math.floor(i / 5) * 0.5); world.add(t);
    }
    const houses = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.3), mat(0xfde68a)); const [hx, hz] = P(490, 70); houses.position.set(hx, 0.15, hz); world.add(houses);
  } else if (e.tipo === 'hazmat') {
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.3, 20), mat(0xe5e7eb)); tank.rotation.set(0, 0, Math.PI / 2 + 0.2); tank.position.set(ox, 0.3, oz); world.add(tank);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.45), mat(0xf97316)); cabin.position.set(ox + 0.85, 0.2, oz + 0.05); world.add(cabin);
    const spill = new THREE.Mesh(new THREE.CircleGeometry(0.7, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.35 })); spill.position.set(ox, 0.02, oz + 0.4); world.add(spill);
  }
  // autobomba
  const truck = new THREE.Group(); const tb = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.4), mat(0xdc2626)); tb.position.y = 0.25; truck.add(tb);
  const tc = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.38), mat(0xb91c1c)); tc.position.set(0.5, 0.3, 0); truck.add(tc);
  const [tx, tz] = P(100, 190); truck.position.set(tx, 0, tz); world.add(truck);
  // zonas
  const zg = new THREE.Group();
  [[1.4, 0x16a34a], [0.95, 0xd97706], [0.55, 0xdc2626]].forEach(([r, c]) => { const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.03, r, 64).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.8 })); ring.position.set(ox, 0.015, oz); zg.add(ring); });
  const pc = emoji('⛺', 0.35); const [px, pz] = P(55, 290); pc.position.set(px, 0.2, pz); zg.add(pc);
  zg.visible = false; world.add(zg); sprites.zones = zg;
  for (let i = 0; i < 8; i++) { const f = emoji('🔥', 0.35); f.visible = false; f.userData.ph = Math.random() * 6; world.add(f); sprites.fire.push(f); }
  sprites.smoke = emoji('💨', 0.6); sprites.smoke.position.set(ox + 0.3, 1.9, oz); world.add(sprites.smoke);
  sprites.amb = emoji('🚑', 0.45); const [ax, az] = P(165, 280); sprites.amb.position.set(ax, 0.22, az); world.add(sprites.amb);
  App.st.crew.forEach(() => { const s = emoji('🧑‍🚒', 0.3); world.add(s); sprites.crew.push(s); });
  App.st.vic.forEach(v => { const s = emoji(v.avatar, 0.32); world.add(s); sprites.vic.push(s); const r = new THREE.Mesh(new THREE.RingGeometry(0.13, 0.17, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xeab308 })); world.add(r); sprites.rings.push(r); });
  const label = canvasTex(512, 96); label.ctx.fillStyle = 'rgba(255,255,255,.9)'; roundRect(label.ctx, 4, 4, 504, 88, 20); label.ctx.fill(); label.ctx.fillStyle = '#7f1d1d'; label.ctx.font = 'bold 28px Nunito, sans-serif'; label.ctx.textAlign = 'center'; label.ctx.textBaseline = 'middle'; label.ctx.fillText(e.nombre.slice(0, 34), 256, 50); label.tex.needsUpdate = true;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: label.tex, transparent: true })); ls.scale.set(1.6, 0.3, 1); ls.position.set(0, 2.3, -1.2); world.add(ls);
}

function sync() {
  const s = App.st; if (!s || !App.esc) return;
  if (builtFor !== App.esc.id || sprites.crew.length !== s.crew.length) build();
  const [ox, oz] = P(330, 150);
  const nf = Math.ceil(s.fuego / 13);
  sprites.fire.forEach((f, i) => { f.visible = i < nf; const a = i * 2.4, est = App.esc.tipo === 'estructural', r = (est ? 0.68 : 0.3) + (i % 3) * 0.14; f.position.set(ox + Math.cos(a) * r, (est ? 0.7 + (i % 3) * 0.3 : 0.3 + (i % 2) * 0.2), oz + Math.sin(a) * r * (est ? 0.75 : 0.6)); const sc = 0.25 + s.fuego / 250; f.scale.set(sc, sc, 1); });
  sprites.smoke.visible = s.fuego > 0;
  sprites.zones.visible = !!s.sci;
  sprites.amb.visible = s.vic.some(v => v.rescatada);
  s.crew.forEach((c, i) => {
    const sp = sprites.crew[i]; const e = c.herido ? '🤕' : '🧑‍🚒'; if (sp.userData.cur !== e) { sp.userData.draw(e); sp.userData.cur = e; }
    const [x, z] = c.herido ? P(190 + i * 26, 300) : c.dentro ? P(300 + i * 22, 202) : P(120 + i * 26, 230);
    sp.position.set(x, 0.16, z);
  });
  s.vic.forEach((v, i) => {
    const [x, z] = v.rescatada ? P(210 + i * 34, 255) : P(370 + i * 30, 112);
    sprites.vic[i].position.set(x, v.rescatada ? 0.17 : (App.esc.tipo === 'estructural' ? 0.9 : 0.2), z);
    sprites.rings[i].position.set(x, 0.02, z); sprites.rings[i].visible = v.rescatada || App.esc.tipo !== 'estructural';
    sprites.rings[i].material.color.set(v.critico ? 0xdc2626 : v.estable ? 0x16a34a : v.grav > 0.5 ? 0xf97316 : 0xeab308);
  });
  drawHud();
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
  world.scale.setScalar(scaleMode === 'table' ? 0.12 : 1);
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

const orbit = { theta: 0.5, phi: 0.95, r: 6, target: new THREE.Vector3(0, 0.4, 0) };
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
  sprites.fire.forEach(f => { f.material.opacity = 0.75 + Math.sin(time * 9 + f.userData.ph) * 0.25; });
  if (sprites.smoke) sprites.smoke.position.y = 1.9 + Math.sin(time) * 0.1;
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
  scene.background = new THREE.Color(0xdbeafe);
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
  scene.background = type === 'immersive-vr' ? new THREE.Color(0xdbeafe) : null; root.visible = false;
  if (domOverlay) toOverlay();
  hitSource = null; try { hitSource = await xrSession.requestHitTestSource({ space: await xrSession.requestReferenceSpace('viewer') }); } catch (e) { /* sin hit-test */ }
  if (!hitSource && !domOverlay) place();
  xrSession.addEventListener('end', () => { hitSource = null; xrSession = null; mode = null; placed = false; hud.visible = false; reticle.visible = false; root.visible = true; renderer.setAnimationLoop(null); restoreUi(); });
  renderer.setAnimationLoop(animate); sync();
}
function stopAll() { if (mode === 'xr' && xrSession) return xrSession.end(); if (mode === 'inline') stopInline(); }

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
