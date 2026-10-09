/* =========================================================
   Modo «VR Box»: gafas sencillas tipo cardboard (el celular va
   dentro del visor y no hay cámara ni WebXR).
   - Pantalla dividida en dos (visión estereoscópica).
   - Seguimiento de la cabeza con el giroscopio del celular.
   - Panel flotante con el texto y las opciones del simulador.
   - Selección con la mirada (mantener 1,6 s sobre un botón) o
     con el control Bluetooth del visor: joystick/flechas para
     moverse entre opciones y gatillo/Enter para elegir.
   Lo usan los cuatro simuladores (EGB, incendios, construcción y
   administración) a través de createVrBox().
   ========================================================= */
import * as THREE from '../vendor/three.module.min.js';

const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const DWELL = 1.6;            // segundos mirando un botón para elegirlo
const HW = 1024, HH = 1024;   // lienzo del panel

function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function wrap(ctx, t, w) { const out = []; let l = ''; for (const word of String(t).split(/\s+/)) { const n = l ? l + ' ' + word : word; if (ctx.measureText(n).width > w && l) { out.push(l); l = word; } else l = n; } if (l) out.push(l); return out; }

/**
 * o.App      controlador del simulador (getHud, subscribe, toast)
 * o.prepare  deja la escena construida, en tamaño real y visible
 * o.getScene devuelve la THREE.Scene del simulador
 * o.sync     sincroniza la escena con el estado del simulador
 * o.view     { pos:[x,y,z], target:[x,y,z] } punto de vista inicial
 * o.extra    (opcional) () => [{ label, fn }] botones adicionales
 * o.pick     (opcional) raycaster => true si eligió un objeto de la escena
 * o.color    color del panel
 */
export function createVrBox(o) {
  const App = o.App;
  let active = false, renderer = null, box, canvas, camera, stereo, panel, panelCtx, panelTex, cursor, ring, scene;
  let rects = [], focus = 0, gazeIdx = -1, dwell = 0, hudKey = '', lastHud = 0, wake = null;
  let baseYaw = 0, yawFix = 0, haveGyro = false, drag = { yaw: 0, pitch: 0 }, pad = { t: 0, prev: [] };
  const qDev = new THREE.Quaternion(), qYaw = new THREE.Quaternion(), eul = new THREE.Euler();
  const zee = new THREE.Vector3(0, 0, 1), q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)), q0 = new THREE.Quaternion();
  const Y = new THREE.Vector3(0, 1, 0), raycaster = new THREE.Raycaster(), clock = new THREE.Clock(), center = new THREE.Vector2(0, 0);

  App.subscribe(() => { if (active) { o.sync(); hudKey = ''; } });

  function build() {
    if (renderer) return;
    box = document.createElement('div');
    box.id = 'vrbox';
    box.setAttribute('style', 'position:fixed;inset:0;z-index:9999;background:#000;display:none;touch-action:none');
    box.innerHTML = '<canvas style="width:100%;height:100%;display:block"></canvas><div style="position:absolute;top:0;bottom:0;left:50%;width:2px;background:#111"></div><button type="button" aria-label="Salir del modo VR Box" style="position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:2;border:0;border-radius:999px;padding:6px 14px;background:rgba(220,38,38,.85);color:#fff;font:700 14px Nunito,sans-serif">✕ Salir</button>';
    document.body.appendChild(box);
    canvas = box.querySelector('canvas');
    box.querySelector('button').onclick = e => { e.stopPropagation(); exit(); };
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    renderer.setScissorTest(true);
    camera = new THREE.PerspectiveCamera(80, 1, 0.05, 80);
    stereo = new THREE.StereoCamera(); stereo.eyeSep = 0.064;
    const c = document.createElement('canvas'); c.width = HW; c.height = HH; panelCtx = c.getContext('2d');
    panelTex = new THREE.CanvasTexture(c); panelTex.colorSpace = THREE.SRGBColorSpace;
    panel = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.85), new THREE.MeshBasicMaterial({ map: panelTex, transparent: true, depthTest: false }));
    panel.renderOrder = 30;
    cursor = new THREE.Mesh(new THREE.RingGeometry(0.008, 0.013, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true }));
    cursor.position.z = -1.2; cursor.renderOrder = 40; camera.add(cursor);
    ring = new THREE.Mesh(new THREE.RingGeometry(0.015, 0.021, 32, 1, 0, 0.01), new THREE.MeshBasicMaterial({ color: 0xfacc15, depthTest: false, side: THREE.DoubleSide }));
    ring.position.z = -1.2; ring.renderOrder = 41; camera.add(ring);
    // control Bluetooth en modo ratón o pantalla táctil: un toque elige la opción enfocada
    let down = null;
    canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, yaw: drag.yaw, pitch: drag.pitch, moved: 0 }; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', e => {
      if (!down) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; down.moved = Math.max(down.moved, Math.hypot(dx, dy));
      if (!haveGyro) { drag.yaw = down.yaw + dx * 0.005; drag.pitch = Math.max(-1.3, Math.min(1.3, down.pitch + dy * 0.005)); }
    });
    canvas.addEventListener('pointerup', () => { if (down && down.moved < 10) activate(); down = null; });
  }

  /* ---------- giroscopio ---------- */
  function onOrient(e) {
    if (e.alpha == null) return;
    const d = Math.PI / 180, orient = (screen.orientation ? screen.orientation.angle : window.orientation || 0) * d;
    eul.set(e.beta * d, e.alpha * d, -e.gamma * d, 'YXZ');
    qDev.setFromEuler(eul); qDev.multiply(q1); qDev.multiply(q0.setFromAxisAngle(zee, -orient));
    if (!haveGyro) { haveGyro = true; recenter(); }
  }
  function recenter() {
    if (haveGyro) { eul.setFromQuaternion(qDev, 'YXZ'); yawFix = -eul.y; }
    else { drag.yaw = 0; drag.pitch = 0; }
    hudKey = '';
  }
  function updateHead() {
    if (haveGyro) { qYaw.setFromAxisAngle(Y, baseYaw + yawFix); camera.quaternion.copy(qYaw).multiply(qDev); }
    else camera.quaternion.setFromEuler(eul.set(-drag.pitch, baseYaw - drag.yaw, 0, 'YXZ'));
  }

  /* ---------- panel ---------- */
  function placePanel() {
    const f = new THREE.Vector3(-Math.sin(baseYaw), 0, -Math.cos(baseYaw));
    panel.position.copy(camera.position).addScaledVector(f, 1.2); panel.position.y -= 0.88;
    panel.lookAt(camera.position);
  }
  function drawPanel() {
    const d = App.getHud();
    const extra = (o.extra ? o.extra() : []).concat([{ label: '🎯 Centrar', fn: recenter }, { label: '✕ Salir', fn: exit, exit: true }]);
    const btns = d.buttons.slice(0, 7);
    const key = d.text + btns.map(b => b.label + b.disabled).join('|') + extra.map(b => b.label).join('|') + d.busy + focus;
    if (key === hudKey) return; hudKey = key;
    const ctx = panelCtx; ctx.clearRect(0, 0, HW, HH);
    ctx.fillStyle = o.color || 'rgba(15,30,45,.94)'; roundRect(ctx, 0, 0, HW, HH, 40); ctx.fill();
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillStyle = '#fde68a'; ctx.font = `bold 26px Nunito, ${EMOJI_FONT}`;
    ctx.fillText(d.busy ? '⏳ Escuchando…' : '👁️ Mira un botón 2 s o usa el control y el gatillo', 30, 22);
    ctx.fillStyle = '#fff'; ctx.font = `32px Nunito, ${EMOJI_FONT}`;
    const lines = wrap(ctx, d.text, HW - 60); const shown = lines.slice(0, 6);
    if (lines.length > 6) shown[5] = shown[5].replace(/\s*\S*$/, ' …');
    shown.forEach((l, i) => ctx.fillText(l, 30, 66 + i * 40));
    rects = [];
    let y = 66 + shown.length * 40 + 14;
    const bh = Math.max(56, Math.min(76, (HH - 110 - y) / Math.max(1, btns.length) - 10));
    ctx.font = `bold 29px Nunito, ${EMOJI_FONT}`;
    btns.forEach(b => { rects.push({ x: 24, y, w: HW - 48, h: bh, el: b.el, disabled: b.disabled, label: b.label }); y += bh + 10; });
    const ew = (HW - 48 - (extra.length - 1) * 10) / extra.length;
    extra.forEach((b, i) => rects.push({ x: 24 + i * (ew + 10), y: HH - 92, w: ew, h: 70, fn: b.fn, label: b.label, bottom: true, exit: b.exit }));
    if (focus >= rects.length) focus = rects.length - 1;
    if (focus < 0) focus = 0;
    rects.forEach((r, i) => {
      ctx.fillStyle = r.bottom ? (r.exit ? '#dc2626' : '#2563eb') : r.disabled ? 'rgba(255,255,255,.12)' : '#fff';
      roundRect(ctx, r.x, r.y, r.w, r.h, 16); ctx.fill();
      if (i === focus && !r.disabled) { ctx.strokeStyle = '#facc15'; ctx.lineWidth = 8; roundRect(ctx, r.x - 2, r.y - 2, r.w + 4, r.h + 4, 18); ctx.stroke(); }
      ctx.fillStyle = r.bottom ? '#fff' : r.disabled ? '#8898aa' : '#1c2738';
      ctx.textBaseline = 'middle'; ctx.textAlign = r.bottom ? 'center' : 'left';
      const max = r.bottom ? 22 : 54, t = r.label.length > max ? r.label.slice(0, max - 1) + '…' : r.label;
      ctx.fillText(t, r.bottom ? r.x + r.w / 2 : r.x + 20, r.y + r.h / 2 + 2);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    });
    panelTex.needsUpdate = true;
  }
  function moveFocus(step) {
    if (!rects.length) return;
    let i = focus;
    for (let k = 0; k < rects.length; k++) { i = (i + step + rects.length) % rects.length; if (!rects[i].disabled) break; }
    focus = i; dwell = 0; hudKey = '';
  }
  function press(r) {
    if (!r || r.disabled) return;
    dwell = -0.8; hudKey = '';
    if (navigator.vibrate) navigator.vibrate(30);
    if (r.fn) r.fn(); else r.el.click();
  }
  function activate() {
    if (!active) return;
    raycaster.setFromCamera(center, camera);
    if (gazeIdx < 0 && o.pick && o.pick(raycaster)) return;
    press(rects[focus]);
  }

  /* ---------- mirada ---------- */
  function gaze(dt) {
    raycaster.setFromCamera(center, camera);
    const hit = raycaster.intersectObject(panel, false)[0];
    let idx = -1;
    if (hit) { const px = hit.uv.x * HW, py = (1 - hit.uv.y) * HH; idx = rects.findIndex(r => px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h); }
    if (idx !== gazeIdx) { gazeIdx = idx; dwell = Math.min(dwell, 0); if (idx >= 0 && idx !== focus) { focus = idx; hudKey = ''; } }
    const r = rects[idx];
    if (idx >= 0 && r && !r.disabled && !App.busy) { dwell += dt; if (dwell >= DWELL) press(r); }
    else if (dwell > 0) dwell = 0;
    const p = Math.max(0, dwell) / DWELL;
    ring.visible = p > 0.02;
    if (ring.visible) { ring.geometry.dispose(); ring.geometry = new THREE.RingGeometry(0.015, 0.021, 32, 1, Math.PI / 2, -p * Math.PI * 2); }
    cursor.material.color.set(idx >= 0 ? 0xfacc15 : 0xffffff);
  }

  /* ---------- control Bluetooth ---------- */
  function onKey(e) {
    if (!active) return;
    const k = e.key;
    if (['ArrowUp', 'ArrowLeft', 'AudioVolumeUp', 'MediaTrackPrevious', 'PageUp'].includes(k)) moveFocus(-1);
    else if (['ArrowDown', 'ArrowRight', 'AudioVolumeDown', 'MediaTrackNext', 'PageDown', 'Tab'].includes(k)) moveFocus(1);
    else if (['Enter', ' ', 'MediaPlayPause', 'MediaPlay', 'MediaPause', 'Select', 'NumpadEnter'].includes(k)) activate();
    else if (k === 'Escape') exit();
    else return;
    e.preventDefault();
  }
  function pollPad(dt) {
    const pads = navigator.getGamepads ? [...navigator.getGamepads()].filter(Boolean) : [];
    pad.t -= dt;
    pads.forEach((g, gi) => {
      const prev = pad.prev[gi] || [];
      const pressed = g.buttons.map(b => b.pressed);
      const ax = g.axes[1] || 0, ax0 = g.axes[0] || 0;
      if (pad.t <= 0) {
        if (ax < -0.6 || ax0 < -0.6 || pressed[12] || pressed[14]) { moveFocus(-1); pad.t = 0.3; }
        else if (ax > 0.6 || ax0 > 0.6 || pressed[13] || pressed[15]) { moveFocus(1); pad.t = 0.3; }
      }
      [0, 1, 2, 3, 5, 7].forEach(i => { if (pressed[i] && !prev[i]) activate(); });
      pad.prev[gi] = pressed;
    });
  }

  /* ---------- bucle ---------- */
  function resize() {
    if (!active) return;
    const w = box.clientWidth || innerWidth, h = box.clientHeight || innerHeight;
    renderer.setSize(w, h, false); camera.aspect = (w / 2) / h; camera.updateProjectionMatrix();
  }
  function loop() {
    const dt = Math.min(0.1, clock.getDelta());
    updateHead(); pollPad(dt);
    const now = performance.now(); if (now - lastHud > 250) { lastHud = now; drawPanel(); }
    camera.updateMatrixWorld(); gaze(dt);
    stereo.aspect = 0.5; stereo.update(camera);
    const s = renderer.getSize(new THREE.Vector2()), w = s.x / 2, h = s.y;
    renderer.setScissor(0, 0, w, h); renderer.setViewport(0, 0, w, h); renderer.render(scene, stereo.cameraL);
    renderer.setScissor(w, 0, w, h); renderer.setViewport(w, 0, w, h); renderer.render(scene, stereo.cameraR);
  }

  /* ---------- entrar / salir ---------- */
  function enter() {
    if (active) return;
    build();
    // todo lo que requiere el gesto del usuario va primero
    const perm = typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission ? DeviceOrientationEvent.requestPermission().catch(() => 'denied') : Promise.resolve('granted');
    box.style.display = 'block';
    const fs = box.requestFullscreen || box.webkitRequestFullscreen;
    if (fs) Promise.resolve(fs.call(box)).then(() => screen.orientation?.lock?.('landscape')).catch(() => {});
    navigator.wakeLock?.request('screen').then(l => { wake = l; }).catch(() => {});
    o.prepare(); scene = o.getScene();
    const [px, py, pz] = o.view.pos, [tx, , tz] = o.view.target;
    camera.position.set(px, py, pz);
    baseYaw = Math.atan2(-(tx - px), -(tz - pz));
    scene.add(camera); scene.add(panel);
    haveGyro = false; drag = { yaw: 0, pitch: 0 }; focus = 0; gazeIdx = -1; dwell = 0; hudKey = '';
    perm.then(() => addEventListener('deviceorientation', onOrient));
    addEventListener('keydown', onKey, true); addEventListener('resize', resize);
    active = true; updateHead(); placePanel(); resize(); o.sync(); drawPanel();
    renderer.setAnimationLoop(loop);
    setTimeout(() => { if (active && !haveGyro) App.toast('Sin giroscopio: arrastra la pantalla para mirar alrededor.', 3500); }, 1500);
  }
  function exit() {
    if (!active) return;
    active = false;
    renderer.setAnimationLoop(null);
    removeEventListener('deviceorientation', onOrient); removeEventListener('keydown', onKey, true); removeEventListener('resize', resize);
    scene.remove(camera); scene.remove(panel);
    box.style.display = 'none';
    if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document)?.catch?.(() => {});
    try { screen.orientation?.unlock?.(); } catch (e) { /* sin bloqueo */ }
    wake?.release?.().catch?.(() => {}); wake = null;
    o.onExit?.();
  }
  return { enter, exit, isActive: () => active };
}
