/* =========================================================
   Kit 3D compartido del Laboratorio Virtual ISTY
   - glyphSprite(): retrato ilustrado o ícono (en lugar del emoji
     del sistema) en un sprite que siempre mira a la cámara.
   - makeHuman(): personaje 3D de cuerpo entero (rasgos tomados del
     emoji con IstyUI.personStyle) con animación de reposo, caminar,
     hablar, sentarse y saludar.
   - createWalker(): modo «Recorrer» en primera persona: teclado
     (WASD/flechas), arrastre para mirar, joystick táctil en el
     celular y mando Bluetooth (gamepad); acercarse a un personaje y
     pulsar E / «Interactuar» equivale a tocarlo.
   ========================================================= */
import * as THREE from '../vendor/three.module.min.js';

const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const UI = () => window.IstyUI || null;
const imgCache = new Map();

function svgImage(svg) {
  if (imgCache.has(svg)) return imgCache.get(svg);
  const img = new Image();
  const src = svg.includes('xmlns=') ? svg : svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src.replace(/class="[^"]*"/, '').replace(/currentColor/g, '#1B4D22'));
  imgCache.set(svg, img);
  return img;
}

/* dibuja un emoji como retrato/ícono ilustrado; onReady se llama cuando la imagen está lista */
export function drawGlyph(ctx, g, size, onReady) {
  ctx.clearRect(0, 0, size, size);
  if (!g) { onReady && onReady(); return; }
  const ui = UI();
  const av = ui && ui.avatarSVG(g);
  const icRaw = !av && ui && ui.iconSVG(g);
  const paint = img => {
    ctx.clearRect(0, 0, size, size);
    if (av) { ctx.drawImage(img, size * 0.06, size * 0.06, size * 0.88, size * 0.88); ctx.lineWidth = size * 0.035; ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2); ctx.stroke(); }
    else {
      ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.beginPath(); ctx.arc(size / 2, size / 2, size * 0.42, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = size * 0.03; ctx.strokeStyle = '#2E8B2E'; ctx.stroke();
      ctx.drawImage(img, size * 0.25, size * 0.25, size * 0.5, size * 0.5);
    }
    onReady && onReady();
  };
  if (av || icRaw) {
    const svg = av || icRaw.replace('<svg ', '<svg width="96" height="96" ');
    const img = svgImage(svg);
    if (img.complete && img.naturalWidth) paint(img);
    else {
      ctx.font = `${size * 0.8}px ${EMOJI_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(g, size / 2, size / 2 + size * 0.05);
      img.addEventListener('load', () => paint(img), { once: true });
    }
    return;
  }
  ctx.font = `${size * 0.8}px ${EMOJI_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(g, size / 2, size / 2 + size * 0.05);
  onReady && onReady();
}

/* sprite con retrato o ícono; userData.draw(e) cambia el contenido */
export function glyphSprite(g, scale = 0.4, size = 160) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const ctx = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sp.scale.set(scale, scale, 1);
  sp.userData.draw = e => drawGlyph(ctx, e, size, () => { tex.needsUpdate = true; });
  sp.userData.draw(g);
  return sp;
}

export const isPerson = g => !!(UI() && g && UI().parsePerson(g));
// emojis de cuerpo entero (de pie, caminando…): se convierten en personaje 3D
export const isFullBody = g => !!g && /^(\u{1F9CD}|\u{1F6B6}|\u{1F3C3}|\u{1F9CE}|\u{1F483}|\u{1F57A})/u.test(g) || /\u{1F9AF}|\u{1F9BD}|\u{1F9BC}/u.test(g || '');

/* ================== personaje 3D ================== */
const matCache = new Map();
function mat(color, rough = 0.75) {
  const k = color + '|' + rough;
  if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.02 }));
  return matCache.get(k);
}
const G = {
  head: new THREE.SphereGeometry(0.12, 24, 18),
  hair: new THREE.SphereGeometry(0.128, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.55),
  eye: new THREE.SphereGeometry(0.014, 10, 8),
  mouth: new THREE.BoxGeometry(0.05, 0.012, 0.01),
  nose: new THREE.SphereGeometry(0.016, 8, 6),
  torso: new THREE.CapsuleGeometry(0.15, 0.3, 6, 16),
  arm: new THREE.CapsuleGeometry(0.045, 0.42, 4, 10),
  hand: new THREE.SphereGeometry(0.045, 10, 8),
  thigh: new THREE.CapsuleGeometry(0.065, 0.3, 4, 10),
  shin: new THREE.CapsuleGeometry(0.055, 0.3, 4, 10),
  shoe: new THREE.BoxGeometry(0.1, 0.06, 0.2),
  neck: new THREE.CylinderGeometry(0.045, 0.05, 0.08, 12),
  ear: new THREE.SphereGeometry(0.025, 8, 6),
  brim: new THREE.CylinderGeometry(0.19, 0.19, 0.015, 24),
  helmet: new THREE.SphereGeometry(0.14, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
  skirt: new THREE.ConeGeometry(0.22, 0.42, 18, 1, true),
  wheel: new THREE.TorusGeometry(0.28, 0.025, 8, 28),
  stripe: new THREE.CylinderGeometry(0.155, 0.155, 0.03, 18, 1, true)
};

/**
 * Personaje 3D. Origen en los pies; altura ≈ 1,7 m (adulto) × opts.height/1.7.
 * opts: { height, shirt (color hex), sit, state }
 * userData: update(dt), setState('idle'|'walk'|'talk'|'wave'|'sit'), draw(emoji), talk(segundos)
 */
export function makeHuman(g, opts = {}) {
  const root = new THREE.Group();
  root.userData.isHuman = true;
  const rig = new THREE.Group(); root.add(rig);
  let lookY = null;
  let parts = {}, state = opts.sit ? 'sit' : (opts.state || 'idle'), talkT = 0, t = Math.random() * 6, cur = null;
  const target = opts.height || 1.7;

  function build(e) {
    while (rig.children.length) rig.remove(rig.children[0]);
    cur = e;
    const st = (UI() && UI().personStyle(e)) || { p: { age: 'adult', gender: 'm', role: null }, top: '#2E8B2E', acc: '#fff', skin: '#C98E62', hair: '#2B1D14', pants: '#1F2937', longHair: false, skirt: false, glasses: false };
    const p = st.p, top = opts.shirt != null ? opts.shirt : st.top;
    const child = p.age === 'child' || p.age === 'baby';
    const k = (child ? target * 0.62 : target) / 1.7;
    rig.scale.setScalar(k);
    const skin = mat(st.skin, 0.6), cloth = mat(top), pants = mat(st.pants), hair = mat(st.hair, 0.9), dark = mat('#111827', 0.5);
    // piernas (pivote en la cadera)
    const hipY = 0.86;
    const mkLeg = x => {
      const piv = new THREE.Group(); piv.position.set(x, hipY, 0);
      const th = new THREE.Mesh(G.thigh, st.skirt ? skin : pants); th.position.y = -0.2; piv.add(th);
      const knee = new THREE.Group(); knee.position.y = -0.42; piv.add(knee); piv.userData.knee = knee;
      const sh = new THREE.Mesh(G.shin, st.skirt ? skin : pants); sh.position.y = -0.18; knee.add(sh);
      const s = new THREE.Mesh(G.shoe, dark); s.position.set(0, -0.4, 0.04); knee.add(s);
      rig.add(piv); return piv;
    };
    parts.legL = mkLeg(-0.085); parts.legR = mkLeg(0.085);
    if (st.skirt) { const sk = new THREE.Mesh(G.skirt, cloth); sk.position.y = hipY - 0.08; rig.add(sk); }
    // torso
    const torso = new THREE.Mesh(G.torso, cloth); torso.position.y = 1.16; torso.scale.set(1.05, 1, 0.72); rig.add(torso); parts.torso = torso;
    if (p.pregnant) { const b = new THREE.Mesh(G.hand, cloth); b.scale.setScalar(3); b.position.set(0, 1.02, 0.1); rig.add(b); }
    if (p.role === 'worker' || p.role === 'firefighter') [1.06, 1.18].forEach(y => { const r = new THREE.Mesh(G.stripe, mat(st.acc, 0.4)); r.position.y = y; r.scale.set(1.04, 1, 0.74); rig.add(r); });
    if (p.role === 'office' || p.role === 'suit' || p.role === 'judge') { const tie = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.22, 0.01), mat(p.role === 'office' ? '#B91C1C' : '#374151')); tie.position.set(0, 1.26, 0.112); rig.add(tie); const sh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.01), mat('#ffffff')); sh.position.set(0, 1.36, 0.108); rig.add(sh); }
    if (p.role === 'police' || p.role === 'guard') { const belt = new THREE.Mesh(G.stripe, mat('#111827')); belt.position.y = 0.94; belt.scale.set(1.02, 1.4, 0.74); rig.add(belt); const badge = new THREE.Mesh(new THREE.CircleGeometry(0.022, 12), mat('#FACC15', 0.3)); badge.position.set(-0.07, 1.3, 0.112); rig.add(badge); }
    if (p.role === 'doctor' || p.role === 'scientist') { const coat = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.01), mat(p.role === 'doctor' ? '#5FB3C0' : '#C7D2FE')); coat.position.set(0, 1.2, 0.113); rig.add(coat); }
    // brazos (pivote en el hombro)
    const mkArm = x => { const piv = new THREE.Group(); piv.position.set(x, 1.42, 0); const a = new THREE.Mesh(G.arm, cloth); a.position.y = -0.24; piv.add(a); const h = new THREE.Mesh(G.hand, skin); h.position.y = -0.5; piv.add(h); piv.rotation.z = x < 0 ? -0.08 : 0.08; rig.add(piv); return piv; };
    parts.armL = mkArm(-0.21); parts.armR = mkArm(0.21);
    // cabeza
    const headG = new THREE.Group(); headG.position.y = 1.62; rig.add(headG); parts.head = headG;
    const neck = new THREE.Mesh(G.neck, skin); neck.position.y = -0.11; headG.add(neck);
    const head = new THREE.Mesh(G.head, skin); head.scale.set(0.95, 1.08, 1); headG.add(head);
    [-1, 1].forEach(s => { const ear = new THREE.Mesh(G.ear, skin); ear.position.set(s * 0.115, -0.005, 0); headG.add(ear); });
    const nose = new THREE.Mesh(G.nose, mat(st.skin, 0.5)); nose.position.set(0, -0.015, 0.118); headG.add(nose);
    [-1, 1].forEach(s => { const e = new THREE.Mesh(G.eye, dark); e.position.set(s * 0.042, 0.02, 0.108); headG.add(e); });
    const mouth = new THREE.Mesh(G.mouth, mat('#9F3A38', 0.5)); mouth.position.set(0, -0.055, 0.112); headG.add(mouth); parts.mouth = mouth;
    if (st.glasses) [-1, 1].forEach(s => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.004, 6, 16), dark); r.position.set(s * 0.042, 0.02, 0.122); headG.add(r); });
    if (p.role === 'hijab') { const hj = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.75), cloth); hj.rotation.x = -0.25; hj.position.z = -0.012; headG.add(hj); }
    else if (p.hair !== 'bald') {
      const cap = new THREE.Mesh(G.hair, hair); cap.position.y = 0.012; cap.rotation.x = -0.18; headG.add(cap);
      if (st.longHair && p.hair !== 'curly') { const lh = new THREE.Mesh(new THREE.SphereGeometry(0.125, 18, 12), hair); lh.scale.set(1, 1.25, 0.55); lh.position.set(0, -0.07, -0.07); headG.add(lh); }
      if (p.hair === 'curly') for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const c = new THREE.Mesh(G.ear, hair); c.scale.setScalar(1.8); c.position.set(Math.cos(a) * 0.1, 0.08, Math.sin(a) * 0.1); headG.add(c); }
    }
    if (p.beard) { const bd = new THREE.Mesh(new THREE.SphereGeometry(0.115, 18, 10, 0, Math.PI * 2, Math.PI * 0.55, Math.PI * 0.45), hair); bd.position.y = -0.005; headG.add(bd); }
    const hat = (color, helmet) => { const h = new THREE.Mesh(helmet ? G.helmet : new THREE.CylinderGeometry(0.125, 0.13, 0.07, 20), mat(color, 0.35)); h.position.y = helmet ? 0.03 : 0.1; headG.add(h); const b = new THREE.Mesh(G.brim, mat(color, 0.35)); b.position.set(0, helmet ? 0.035 : 0.07, helmet ? 0.02 : 0.05); b.scale.set(helmet ? 1 : 0.8, 1, helmet ? 1 : 0.6); headG.add(b); };
    if (p.role === 'worker') hat('#FACC15', true);
    if (p.role === 'firefighter') hat('#B91C1C', true);
    if (p.role === 'police' || p.role === 'guard' || p.role === 'pilot') hat(st.top, false);
    if (p.role === 'farmer') hat('#D9B26A', false);
    if (p.role === 'chef') { const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.14, 16), mat('#ffffff')); ch.position.y = 0.16; headG.add(ch); }
    if (p.wheel) {
      state = 'sit';
      [-1, 1].forEach(s => { const w = new THREE.Mesh(G.wheel, dark); w.rotation.y = Math.PI / 2; w.position.set(s * 0.26, 0.28, -0.05); rig.add(w); });
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.42), mat('#334155')); seat.position.set(0, 0.5, 0); rig.add(seat);
    }
    // sombra suave
    const sh = new THREE.Mesh(new THREE.CircleGeometry(0.28, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.16, depthWrite: false }));
    sh.position.y = 0.004; rig.add(sh); parts.shadow = sh;
    applyPose(0);
  }

  function applyPose(dt) {
    const P = parts; if (!P.legL) return;
    const sit = state === 'sit';
    if (sit) {
      P.legL.rotation.x = P.legR.rotation.x = -1.45;
      P.legL.userData.knee.rotation.x = P.legR.userData.knee.rotation.x = 1.45;
      rig.position.y = -0.36 * rig.scale.y; P.shadow.visible = false;
    } else { rig.position.y = 0; P.shadow.visible = true; }
    if (state === 'walk') {
      const s = Math.sin(t * 7);
      P.legL.rotation.x = s * 0.55; P.legR.rotation.x = -s * 0.55;
      P.legL.userData.knee.rotation.x = Math.max(0, -Math.cos(t * 7)) * 0.7; P.legR.userData.knee.rotation.x = Math.max(0, Math.cos(t * 7)) * 0.7;
      P.armL.rotation.x = -s * 0.5; P.armR.rotation.x = s * 0.5;
      rig.position.y = Math.abs(Math.cos(t * 7)) * 0.025;
    } else if (!sit) {
      P.legL.rotation.x += (0 - P.legL.rotation.x) * Math.min(1, dt * 8); P.legR.rotation.x += (0 - P.legR.rotation.x) * Math.min(1, dt * 8);
      P.legL.userData.knee.rotation.x *= 1 - Math.min(1, dt * 8); P.legR.userData.knee.rotation.x *= 1 - Math.min(1, dt * 8);
    }
    if (state !== 'walk') {
      const wave = state === 'wave';
      P.armL.rotation.x += ((sit ? -0.6 : 0) - P.armL.rotation.x) * Math.min(1, dt * 6);
      P.armR.rotation.x += ((wave ? -2.6 : sit ? -0.6 : (talkT > 0 ? -0.5 - Math.sin(t * 3) * 0.25 : 0)) - P.armR.rotation.x) * Math.min(1, dt * 6);
      P.armR.rotation.z = wave ? 0.25 + Math.sin(t * 9) * 0.35 : 0.08;
    }
    // respiración y cabeza
    P.torso.scale.y = 1 + Math.sin(t * 2.2) * 0.012;
    P.head.rotation.y = lookY != null ? lookY : Math.sin(t * 0.6) * 0.18; P.head.rotation.x = talkT > 0 ? Math.sin(t * 5) * 0.05 : 0;
    P.mouth.scale.y = talkT > 0 ? 1 + Math.abs(Math.sin(t * 16)) * 3.5 : 1;
  }

  root.userData.update = dt => { t += dt; if (talkT > 0) talkT -= dt; applyPose(dt); };
  root.userData.setState = s => { if (!parts.legL) return; state = s; };
  root.userData.talk = (sec = 2.5) => { talkT = sec; };
  root.userData.draw = e => { if (e && e !== cur) build(e); root.visible = !!e; };
  root.userData.cur = () => cur;
  root.userData.look = y => { lookY = y; };
  build(g);
  return root;
}

/* actualiza todas las personas 3D dentro de un objeto (llamar en cada cuadro) */
export function updateHumans(obj, dt) {
  obj.traverse(o => { if (o.userData && o.userData.isHuman && o.visible) o.userData.update(dt); });
}

/**
 * Personaje 3D que sustituye un sprite de emoji conservando su API:
 * se coloca con .position en el CENTRO (como el sprite) y mide ≈ scale·0.95 de alto.
 */
export function humanLikeSprite(g, scale) {
  const H = scale * 0.95;
  const outer = new THREE.Group();
  const h = makeHuman(g, { height: H }); h.position.y = -H / 2; outer.add(h);
  outer.userData.isHumanWrap = true;
  outer.userData.human = h;
  outer.userData.draw = e => h.userData.draw(e);
  return outer;
}

/* ================== modo Recorrer (primera persona) ================== */
const STYLE_ID = 'isty-walk-style';
function injectStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style'); s.id = STYLE_ID;
  s.textContent = `
  .isty-walk-btn{position:absolute;top:10px;left:10px;z-index:5;border:0;border-radius:999px;padding:8px 14px;font:800 14px Nunito,sans-serif;background:#1B4D22;color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer}
  .isty-walk-btn.isty-walk-inline{position:static;box-shadow:none;padding:6px 12px;font-size:13px}
  .isty-walk-btn[aria-pressed="true"]{background:#F2E21B;color:#1B4D22}
  .isty-walk-hud{position:absolute;inset:0;pointer-events:none;z-index:4}
  .isty-walk-hud .cross{position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px 0 0 -9px;border:2px solid rgba(255,255,255,.9);border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
  .isty-walk-hud .tip{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);background:rgba(27,77,34,.88);color:#fff;font:700 13px Nunito,sans-serif;padding:6px 12px;border-radius:999px;white-space:nowrap;max-width:92%;overflow:hidden;text-overflow:ellipsis}
  .isty-walk-hud .act{position:absolute;right:16px;bottom:56px;pointer-events:auto;border:0;border-radius:999px;padding:12px 18px;font:800 15px Nunito,sans-serif;background:#F2E21B;color:#1B4D22;box-shadow:0 6px 18px rgba(0,0,0,.3);display:none}
  .isty-walk-hud .act.on{display:block;animation:istyPulse 1s infinite}
  @keyframes istyPulse{50%{transform:scale(1.06)}}
  .isty-joy{position:absolute;left:18px;bottom:56px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.22);border:2px solid rgba(255,255,255,.6);pointer-events:auto;touch-action:none;display:none}
  .isty-joy i{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:rgba(27,77,34,.85);border:2px solid #fff}
  .isty-walk-on .isty-joy{display:block}
  @media (hover:hover) and (pointer:fine){.isty-walk-on .isty-joy{display:none}}
  .isty-walk-on .view3d-hint{display:none}`;
  document.head.appendChild(s);
}

/**
 * o.getCamera()   cámara de la vista 3D
 * o.canvas        lienzo de la vista 3D
 * o.container     contenedor (#view3d) donde se ponen botón, mira y joystick
 * o.getWorld()    objeto 3D para calcular los límites del recorrido
 * o.eye           altura de los ojos (m), por defecto 1.6
 * o.interact()    (opcional) se llama al pulsar E/«Interactuar» con el objeto más cercano;
 *                 si no se pasa, se simula un toque en el centro de la pantalla
 * o.targets()     (opcional) [{ obj, label }] objetos con los que se puede interactuar
 * o.onToggle(on)  (opcional)
 */
export function createWalker(o) {
  injectStyle();
  const box = o.container;
  if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'isty-walk-btn'; btn.setAttribute('aria-pressed', 'false');
  btn.textContent = '👣 Recorrer'; btn.title = 'Caminar por la escena en primera persona';
  if (o.buttonParent) { btn.classList.add('isty-walk-inline'); o.buttonParent.appendChild(btn); } else box.appendChild(btn);
  const hud = document.createElement('div'); hud.className = 'isty-walk-hud'; hud.hidden = true;
  hud.innerHTML = '<div class="cross"></div><div class="tip">WASD / flechas para caminar · arrastra para mirar · E para interactuar</div><button type="button" class="act">Interactuar</button><div class="isty-joy" aria-hidden="true"><i></i></div>';
  box.appendChild(hud);
  const tip = hud.querySelector('.tip'), actBtn = hud.querySelector('.act'), joy = hud.querySelector('.isty-joy'), knob = joy.querySelector('i');
  const keys = new Set();
  const st = { active: false, yaw: 0, pitch: 0, pos: new THREE.Vector3(), bounds: new THREE.Box3(), joy: { x: 0, y: 0 }, near: null, saved: null };
  const eye = o.eye || 1.6, speed = o.speed || 1.9;
  const _f = new THREE.Vector3(), _r = new THREE.Vector3(), _v = new THREE.Vector3(), _w = new THREE.Vector3();

  function enable() {
    const cam = o.getCamera();
    st.saved = { pos: cam.position.clone(), quat: cam.quaternion.clone() };
    const b = new THREE.Box3().setFromObject(o.getWorld());
    if (b.isEmpty()) b.set(new THREE.Vector3(-3, 0, -3), new THREE.Vector3(3, 2, 3));
    st.bounds.copy(b); st.bounds.min.x += 0.25; st.bounds.min.z += 0.25; st.bounds.max.x -= 0.25; st.bounds.max.z -= 0.25;
    const c = b.getCenter(_v);
    st.pos.set(cam.position.x, 0, cam.position.z);
    st.pos.x = THREE.MathUtils.clamp(st.pos.x, st.bounds.min.x, st.bounds.max.x);
    st.pos.z = THREE.MathUtils.clamp(st.pos.z, st.bounds.min.z, st.bounds.max.z);
    // si la cámara está casi encima del centro, retrocede para ver la escena de frente
    const dx = st.pos.x - c.x, dz = st.pos.z - c.z, dist = Math.hypot(dx, dz), minD = o.minStart || 1.8;
    if (dist < minD) { const k = dist > 0.01 ? minD / dist : 0; st.pos.x = c.x + (dist > 0.01 ? dx * k : 0); st.pos.z = c.z + (dist > 0.01 ? dz * k : minD); st.pos.x = THREE.MathUtils.clamp(st.pos.x, st.bounds.min.x, st.bounds.max.x); st.pos.z = THREE.MathUtils.clamp(st.pos.z, st.bounds.min.z, st.bounds.max.z); }
    st.yaw = Math.atan2(-(c.x - st.pos.x), -(c.z - st.pos.z)); st.pitch = -0.12;
    st.active = true; hud.hidden = false; box.classList.add('isty-walk-on');
    btn.setAttribute('aria-pressed', 'true'); btn.textContent = '🔄 Girar vista';
    o.onToggle && o.onToggle(true);
  }
  function disable() {
    if (!st.active) return;
    st.active = false; hud.hidden = true; box.classList.remove('isty-walk-on'); keys.clear();
    btn.setAttribute('aria-pressed', 'false'); btn.textContent = '👣 Recorrer';
    o.onToggle && o.onToggle(false);
  }
  btn.addEventListener('click', e => { e.stopPropagation(); st.active ? disable() : enable(); });

  // teclado
  const onKey = e => {
    if (!st.active || /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) return;
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'q', 'e', ' '].includes(k)) e.preventDefault();
    if (k === 'e' || k === 'enter' || k === ' ') { interact(); return; }
    keys.add(k);
  };
  const onKeyUp = e => keys.delete(e.key.toLowerCase()), onBlur = () => keys.clear();
  addEventListener('keydown', onKey); addEventListener('keyup', onKeyUp); addEventListener('blur', onBlur);

  // mirar arrastrando (en el lienzo)
  const cv = o.canvas; let look = null;
  cv.addEventListener('pointerdown', e => { if (st.active) look = { id: e.pointerId, x: e.clientX, y: e.clientY }; });
  cv.addEventListener('pointermove', e => {
    if (!st.active || !look || look.id !== e.pointerId) return;
    st.yaw -= (e.clientX - look.x) * 0.005; st.pitch = THREE.MathUtils.clamp(st.pitch - (e.clientY - look.y) * 0.004, -1.1, 0.9);
    look.x = e.clientX; look.y = e.clientY;
  });
  const endLook = e => { if (look && look.id === e.pointerId) look = null; };
  cv.addEventListener('pointerup', endLook); cv.addEventListener('pointercancel', endLook);

  // joystick táctil
  let jid = null, jc = null;
  joy.addEventListener('pointerdown', e => { e.stopPropagation(); jid = e.pointerId; joy.setPointerCapture(jid); const r = joy.getBoundingClientRect(); jc = { x: r.left + r.width / 2, y: r.top + r.height / 2, R: r.width / 2 }; moveJoy(e); });
  joy.addEventListener('pointermove', e => { if (e.pointerId === jid) moveJoy(e); });
  const endJoy = e => { if (e.pointerId !== jid) return; jid = null; st.joy.x = st.joy.y = 0; knob.style.transform = ''; };
  joy.addEventListener('pointerup', endJoy); joy.addEventListener('pointercancel', endJoy);
  function moveJoy(e) {
    let dx = (e.clientX - jc.x) / jc.R, dy = (e.clientY - jc.y) / jc.R; const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; }
    st.joy.x = dx; st.joy.y = dy; knob.style.transform = `translate(${dx * jc.R * 0.6}px,${dy * jc.R * 0.6}px)`;
  }
  actBtn.addEventListener('click', e => { e.stopPropagation(); interact(); });

  function nearest() {
    if (!o.targets) return null;
    let best = null, bd = 1.8;
    for (const t of o.targets()) {
      if (!t || !t.obj || !t.obj.visible) continue;
      t.obj.getWorldPosition(_w);
      const d = Math.hypot(_w.x - st.pos.x, _w.z - st.pos.z);
      if (d < bd) { _r.set(_w.x - st.pos.x, 0, _w.z - st.pos.z).normalize(); _f.set(-Math.sin(st.yaw), 0, -Math.cos(st.yaw)); if (_r.dot(_f) > 0.35) { bd = d; best = t; } }
    }
    return best;
  }
  function interact() {
    if (!st.active) return;
    if (st.near && o.interact) { o.interact(st.near); return; }
    const r = cv.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const opt = { bubbles: true, clientX: x, clientY: y, pointerId: 99, pointerType: 'mouse', isPrimary: true, button: 0 };
    cv.dispatchEvent(new PointerEvent('pointerdown', opt)); cv.dispatchEvent(new PointerEvent('pointerup', opt)); cv.dispatchEvent(new MouseEvent('click', opt));
  }

  let padPrev = false;
  function update(dt) {
    if (!st.active) return;
    let fx = 0, fz = 0, turn = 0;
    if (keys.has('w') || keys.has('arrowup')) fz += 1;
    if (keys.has('s') || keys.has('arrowdown')) fz -= 1;
    if (keys.has('a')) fx -= 1;
    if (keys.has('d')) fx += 1;
    if (keys.has('arrowleft') || keys.has('q')) turn += 1;
    if (keys.has('arrowright')) turn -= 1;
    fx += st.joy.x; fz -= st.joy.y;
    const pads = navigator.getGamepads ? [...navigator.getGamepads()].filter(Boolean) : [];
    for (const gp of pads) {
      const ax = gp.axes || [];
      if (Math.abs(ax[0] || 0) > 0.2) fx += ax[0];
      if (Math.abs(ax[1] || 0) > 0.2) fz -= ax[1];
      if (Math.abs(ax[2] || 0) > 0.2) turn -= ax[2] * 1.2;
      const pressed = gp.buttons && gp.buttons[0] && gp.buttons[0].pressed;
      if (pressed && !padPrev) interact();
      padPrev = !!pressed;
    }
    st.yaw += turn * dt * 1.8;
    const m = Math.hypot(fx, fz);
    if (m > 0.01) {
      const k = Math.min(1, m) / m * speed * dt;
      _f.set(-Math.sin(st.yaw), 0, -Math.cos(st.yaw)); _r.set(Math.cos(st.yaw), 0, -Math.sin(st.yaw));
      st.pos.addScaledVector(_f, fz * k).addScaledVector(_r, fx * k);
      st.pos.x = THREE.MathUtils.clamp(st.pos.x, st.bounds.min.x, st.bounds.max.x);
      st.pos.z = THREE.MathUtils.clamp(st.pos.z, st.bounds.min.z, st.bounds.max.z);
    }
    const bob = m > 0.01 ? Math.sin(performance.now() / 120) * 0.02 : 0;
    const cam = o.getCamera();
    cam.position.set(st.pos.x, st.bounds.min.y + eye + bob, st.pos.z);
    cam.rotation.set(st.pitch, st.yaw, 0, 'YXZ');
    const n = nearest();
    if (n !== st.near) {
      st.near = n;
      actBtn.classList.toggle('on', !!n);
      actBtn.textContent = n ? '💬 ' + (n.label || 'Interactuar') : 'Interactuar';
      tip.textContent = n ? `Pulsa E o «${n.label || 'Interactuar'}»` : 'WASD / flechas para caminar · arrastra para mirar · E para interactuar';
    }
  }
  const destroy = () => { disable(); removeEventListener('keydown', onKey); removeEventListener('keyup', onKeyUp); removeEventListener('blur', onBlur); btn.remove(); hud.remove(); };
  const api = { enable, disable, update, destroy, get active() { return st.active; }, button: btn, state: st };
  (window.__istyWalkers = window.__istyWalkers || []).push(api);
  return api;
}
