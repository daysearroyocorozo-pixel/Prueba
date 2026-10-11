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
import { glyphSprite, makeHuman, updateHumans, createWalker } from '../../js/isty-3d.js';

const App = window.IaApp;
const $ = s => document.querySelector(s);
const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

let renderer, scene, camera, root, world, mode = null, xrSession = null, hitSource = null, reticle, placed = false, domOverlay = false;
let hud, hudCtx, hudTex, hudRects = [], hudKey = '', scaleMode = 'table', builtFor = null;
const parts = {}; const sprites = { equipo: [], humanos: [], lider: null, contacto: null, nube: null, alerta: null }; const leds = [];
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const tmpM = new THREE.Matrix4();

function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const ctx = c.getContext('2d'); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return { c, ctx, tex }; }
function emoji(e, scale = 0.4, size = 128) { const sp = glyphSprite(e, scale, Math.max(128, size)); const d = sp.userData.draw; sp.userData.draw = x => { sp.userData.cur = x; d(x); }; sp.userData.cur = e; return sp; }
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
  walker = createWalker({
    getCamera: () => camera, canvas, container: $('#view3d'), getWorld: () => parts.floor || world, eye: 1.6, speed: 1.7,
    targets: () => {
      const st = App.st, t = [];
      if (!st) return t;
      sprites.equipo.forEach((h, i) => { const c = st.equipo[i]; if (c) t.push({ obj: h, label: 'Hablar con ' + c.nombre.split(' ').slice(0, /\.$/.test(c.nombre.split(' ')[0]) ? 2 : 1).join(' '), kind: 'equipo', i }); });
      if (sprites.contacto) t.push({ obj: sprites.contacto, label: 'Reunión con ' + App.proj.contacto.nombre, kind: 'contacto' });
      if (parts.rack) t.push({ obj: parts.rack, label: 'Apagar recursos sin uso', kind: 'fa', fa: 'apagar' });
      return t;
    },
    interact: t => {
      const st = App.st; if (!st) return;
      if (t.kind === 'equipo') {
        const c = st.equipo[t.i], h = sprites.equipo[t.i]; h.userData.talk(2.5);
        const lider = parts.lider === t.i;
        App.toast(`${c.avatar} ${c.nombre} · ${c.rol}: ${lider ? 'lidera esta fase. Revisa las opciones del diálogo.' : 'apoya al equipo en esta fase.'}`, 3200);
        return;
      }
      const fa = t.kind === 'contacto' ? 'reunion' : t.fa, b = document.querySelector(`[data-fa="${fa}"]`);
      if (t.kind === 'contacto') sprites.contacto.userData.talk(2.5);
      if (b && !b.disabled) b.click(); else App.toast('Esta acción no está disponible ahora.');
    }
  });
}
let walker = null;

/* ---------- piezas de la oficina (metros) ---------- */
const RW = 6.4, RD = 4.6, RH = 2.8; // ancho, fondo y alto de la sala
const DESK_X = [-2.1, -0.8, 0.5], DESK_Z = -0.15, CHAIR_Z = 0.45;
function wallTex(kind) {
  const { ctx, tex } = canvasTex(1024, 448);
  ctx.fillStyle = '#eef3ec'; ctx.fillRect(0, 0, 1024, 448);
  ctx.fillStyle = '#cfd9cc'; ctx.fillRect(0, 410, 1024, 38);
  ctx.fillStyle = '#2E8B2E'; ctx.fillRect(0, 404, 1024, 6);
  ctx.fillStyle = '#1B4D22'; ctx.fillRect(0, 0, 1024, 10);
  if (kind === 'ventanas') for (let i = 0; i < 3; i++) {
    const x = 70 + i * 320; ctx.fillStyle = '#fff'; ctx.fillRect(x - 10, 70, 240, 250);
    const g = ctx.createLinearGradient(0, 80, 0, 310); g.addColorStop(0, '#7cc4ef'); g.addColorStop(1, '#d7efff'); ctx.fillStyle = g; ctx.fillRect(x, 80, 220, 230);
    ctx.fillStyle = '#3f8f3a'; ctx.beginPath(); ctx.arc(x + 50, 300, 55, Math.PI, 0); ctx.arc(x + 150, 310, 70, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(x + 107, 80, 6, 230); ctx.fillRect(x, 192, 220, 6);
  }
  if (kind === 'pizarra') {
    ctx.fillStyle = '#9aa4b2'; ctx.fillRect(132, 52, 760, 312); ctx.fillStyle = '#ffffff'; ctx.fillRect(140, 60, 744, 296);
    ctx.fillStyle = '#1B4D22'; ctx.font = 'bold 30px Nunito, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('Tablero del proyecto (Kanban)', 512, 88);
    ['Por hacer', 'En curso', 'Hecho'].forEach((t, i) => {
      const x = 170 + i * 240; ctx.fillStyle = '#1B4D22'; ctx.font = 'bold 24px Nunito, sans-serif'; ctx.fillText(t, x + 100, 128);
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.strokeRect(x, 110, 200, 232);
      for (let k = 0; k < 3 - (i === 1 ? 1 : 0); k++) { ctx.fillStyle = ['#fde68a', '#bbf7d0', '#bfdbfe'][(i + k) % 3]; ctx.fillRect(x + 18 + (k % 2) * 86, 152 + Math.floor(k / 2) * 92, 78, 74); ctx.fillStyle = 'rgba(31,41,55,.35)'; ctx.fillRect(x + 26 + (k % 2) * 86, 172 + Math.floor(k / 2) * 92, 56, 6); ctx.fillRect(x + 26 + (k % 2) * 86, 188 + Math.floor(k / 2) * 92, 40, 6); }
    });
  }
  if (kind === 'puerta') {
    ctx.fillStyle = '#8a5a2b'; ctx.fillRect(650, 110, 180, 296); ctx.fillStyle = '#a06a35'; ctx.fillRect(668, 128, 144, 120); ctx.fillRect(668, 262, 144, 128);
    ctx.fillStyle = '#FACC15'; ctx.beginPath(); ctx.arc(804, 270, 9, 0, 7); ctx.fill();
    ctx.fillStyle = '#1B4D22'; ctx.fillRect(110, 110, 380, 190); ctx.fillStyle = '#F2E21B'; ctx.fillRect(110, 280, 380, 20);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 40px Nunito, sans-serif'; ctx.fillText('Laboratorio de IA', 300, 170); ctx.font = '26px Nunito, sans-serif'; ctx.fillText('ISTY · Proyectos con datos', 300, 222);
  }
  return tex;
}
function plane(w, h, material, x, y, z, ry = 0) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material); m.position.set(x, y, z); m.rotation.y = ry; world.add(m); return m; }
function buildWalls() {
  const mk = (w, kind, x, z, ry) => { const m = plane(w, RH, new THREE.MeshStandardMaterial({ map: wallTex(kind), roughness: 0.95 }), x, RH / 2, z, ry); m.name = 'wall'; };
  mk(RW, 'liso', 0, -RD / 2, 0);
  mk(RD, 'ventanas', -RW / 2, 0, Math.PI / 2);
  mk(RD, 'puerta', RW / 2, 0, -Math.PI / 2);
  mk(RW, 'pizarra', 0, RD / 2, Math.PI);
}
function plant(x, z, s = 1) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); world.add(g);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.32, 16), mat(0xb45309)); pot.position.y = 0.16; g.add(pot);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 16), mat(0x3f2a14)); soil.position.y = 0.32; g.add(soil);
  const leaf = mat(0x2f8f3a), leaf2 = mat(0x3fa34d);
  for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; const l = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), i % 2 ? leaf : leaf2); l.scale.set(0.7, 1.6, 0.7); l.position.set(Math.cos(a) * 0.11, 0.55 + (i % 3) * 0.08, Math.sin(a) * 0.11); l.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); g.add(l); }
  return g;
}
function laptop(x, y, z, ry = 0) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; world.add(g);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.018, 0.24), mat(0x9ca3af)); base.position.y = 0.009; g.add(base);
  const kb = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.004, 0.11), mat(0x374151)); kb.position.set(0, 0.02, 0.03); g.add(kb);
  const lid = new THREE.Group(); lid.position.set(0, 0.018, -0.12); lid.rotation.x = -0.25; g.add(lid);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.23, 0.012), mat(0x6b7280)); back.position.y = 0.115; lid.add(back);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.19), new THREE.MeshBasicMaterial({ color: 0x93c5fd })); scr.position.set(0, 0.118, 0.007); lid.add(scr);
  g.userData.screen = scr;
  return g;
}
function chair(x, z, ry = 0) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; world.add(g);
  const dark = mat(0x1f2937), seatM = mat(0x2E8B2E);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.44), seatM); seat.position.y = 0.46; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.5, 0.06), seatM); back.position.set(0, 0.78, -0.22); back.rotation.x = -0.08; g.add(back);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.36, 8), dark); post.position.y = 0.25; g.add(post);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.28), dark); leg.position.set(Math.sin(a) * 0.13, 0.06, Math.cos(a) * 0.13); leg.rotation.y = a; g.add(leg); }
  return g;
}
function cloud() {
  const g = new THREE.Group(); const m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0xdbeafe, emissiveIntensity: 0.35 });
  [[0, 0, 0, 0.24], [0.22, -0.04, 0, 0.18], [-0.22, -0.05, 0.02, 0.17], [0.08, 0.12, 0, 0.17], [-0.1, 0.08, 0.05, 0.15]].forEach(([x, y, z, r]) => { const s = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), m); s.position.set(x, y, z); g.add(s); });
  return g;
}

function build() {
  builtFor = 'ia';
  world.clear(); Object.keys(parts).forEach(k => delete parts[k]); sprites.equipo = []; sprites.humanos = []; leds.length = 0;
  // piso de vinilo con alfombra bajo los escritorios
  const ft = canvasTex(512, 512); ft.ctx.fillStyle = '#d9d2c3'; ft.ctx.fillRect(0, 0, 512, 512); ft.ctx.strokeStyle = 'rgba(120,100,70,.25)'; ft.ctx.lineWidth = 3;
  for (let i = 0; i <= 8; i++) { ft.ctx.beginPath(); ft.ctx.moveTo(0, i * 64); ft.ctx.lineTo(512, i * 64); ft.ctx.stroke(); for (let j = 0; j < 4; j++) { const x = (j * 128 + (i % 2) * 64); ft.ctx.beginPath(); ft.ctx.moveTo(x, i * 64); ft.ctx.lineTo(x, i * 64 + 64); ft.ctx.stroke(); } }
  ft.tex.wrapS = ft.tex.wrapT = THREE.RepeatWrapping; ft.tex.repeat.set(3, 2.2); ft.tex.needsUpdate = true;
  const floor = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.05, RD), new THREE.MeshStandardMaterial({ map: ft.tex, roughness: 0.9 })); floor.position.y = -0.025; floor.name = 'floor'; world.add(floor); parts.floor = floor;
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 1.9).rotateX(-Math.PI / 2), mat(0x35624a)); rug.position.set(-0.8, 0.003, 0.1); world.add(rug);
  buildWalls();
  // pantalla grande en la pared con la fase y los medidores
  const scr = canvasTex(1024, 512); parts.screen = scr; parts.screenKey = '';
  box(2.5, 1.32, 0.06, 0x1f2937, -0.8, 1.62, -RD / 2 + 0.04);
  const pan = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), new THREE.MeshBasicMaterial({ map: scr.tex })); pan.position.set(-0.8, 1.62, -RD / 2 + 0.075); world.add(pan); parts.pan = pan;
  // racks de servidores con luces
  for (let r = 0; r < 2; r++) {
    const x = 2.0 + r * 0.66;
    box(0.6, 2.0, 0.7, 0x334155, x, 1.0, -RD / 2 + 0.4);
    for (let i = 0; i < 8; i++) {
      box(0.52, 0.17, 0.02, 0x1e293b, x, 0.28 + i * 0.22, -RD / 2 + 0.76);
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
      led.position.set(x + 0.18, 0.28 + i * 0.22, -RD / 2 + 0.775); world.add(led); leds.push(led);
    }
  }
  parts.rack = new THREE.Object3D(); parts.rack.position.set(2.33, 1.0, -RD / 2 + 0.9); world.add(parts.rack);
  // escritorios con laptops para el equipo (sentados de cara a su pantalla)
  DESK_X.forEach((x, i) => {
    box(1.1, 0.04, 0.62, 0xb08a5a, x, 0.74, DESK_Z);
    [[-0.5, -0.26], [0.5, -0.26], [-0.5, 0.26], [0.5, 0.26]].forEach(([dx, dz]) => box(0.04, 0.72, 0.04, 0x4b5563, x + dx, 0.36, DESK_Z + dz));
    box(1.0, 0.3, 0.02, 0x8a6a3b, x, 0.56, DESK_Z - 0.28); // faldón trasero
    const lap = laptop(x, 0.76, DESK_Z + 0.05, 0); parts['mon' + i] = lap.userData.screen;
    box(0.09, 0.1, 0.09, 0xf8fafc, x + 0.36, 0.81, DESK_Z - 0.05); // taza
    chair(x, CHAIR_Z + 0.08, Math.PI);
    const h = makeHuman('🧑🏽‍💻', { sit: true, height: 1.7 }); h.position.set(x, 0.0, CHAIR_Z); h.rotation.y = Math.PI; world.add(h);
    sprites.equipo.push(h);
  });
  // mesa de reuniones con laptop para el cliente
  const mesa = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.04, 28), mat(0xe7e5e4)); mesa.position.set(1.9, 0.74, 1.0); world.add(mesa);
  box(0.07, 0.72, 0.07, 0x78716c, 1.9, 0.36, 1.0);
  const pie = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.03, 20), mat(0x78716c)); pie.position.set(1.9, 0.015, 1.0); world.add(pie);
  laptop(1.75, 0.76, 0.95, 0.5);
  chair(1.35, 1.25, 2.2); chair(2.45, 0.6, -0.9);
  sprites.contacto = makeHuman('👩🏽‍🌾', { height: 1.65 }); sprites.contacto.position.set(2.45, 0, 1.55); sprites.contacto.rotation.y = -2.3; world.add(sprites.contacto);
  sprites.lider = emoji('💬', 0.28); world.add(sprites.lider);
  sprites.nube = cloud(); sprites.nube.position.set(2.33, 2.4, -RD / 2 + 0.45); world.add(sprites.nube);
  sprites.alerta = emoji('⚠️', 0.45); sprites.alerta.position.set(2.33, 2.4, -RD / 2 + 0.75); world.add(sprites.alerta);
  plant(-2.85, -1.95, 1.2); plant(-2.85, 1.95, 1); plant(1.25, -1.95, 0.9); plant(2.8, -0.9, 1.1);
  // estantería
  box(0.35, 1.6, 1.2, 0x8a6a3b, -2.98 + 0.18, 0.8, 1.2);
  [0.4, 0.8, 1.2].forEach((y, k) => { for (let j = 0; j < 5; j++) box(0.22, 0.26, 0.07, [0x2E8B2E, 0xF2E21B, 0x2563eb, 0xb91c1c, 0x1B4D22][(j + k) % 5], -2.7, y + 0.15, 0.78 + j * 0.16); });
  // lámparas de techo
  [-2.1, 0.5].forEach(x => { const l = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xfffbeb })); l.position.set(x, RH - 0.02, 0); world.add(l); });
  const lt = canvasTex(512, 128); parts.label = lt;
  const ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt.tex, transparent: true })); ls.scale.set(2.0, 0.5, 1); ls.position.set(-0.8, RH + 0.4, -RD / 2); world.add(ls);
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
    sp.userData.draw(c.avatar);
    parts['mon' + i].material.color.set(c.lider ? 0x4ade80 : 0x93c5fd);
  });
  const li = e.equipo.findIndex(c => c.lider);
  parts.lider = li; sprites.lider.visible = li >= 0; if (li >= 0) sprites.lider.position.set(DESK_X[li] + 0.28, 1.7, CHAIR_Z + 0.1);
  if (e.contacto) sprites.contacto.userData.draw(e.contacto); sprites.contacto.visible = !!e.contacto;
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

const orbit = { theta: 0.5, phi: 1.02, r: 7.6, target: new THREE.Vector3(0, 1.0, 0) };
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
  if (sprites.lider) sprites.lider.position.y = 1.7 + Math.sin(time * 4) * 0.03;
  sprites.equipo.forEach((h, i) => { if (i === parts.lider) { h.userData.talk(0.3); h.userData.look(Math.sin(time * 0.7) * 0.5); } else h.userData.look(null); });
  if (sprites.contacto && sprites.contacto.visible && parts.lider < 0 && Math.sin(time * 0.9) > 0.6) sprites.contacto.userData.talk(0.3);
  if (world) updateHumans(world, dt);
  if (sprites.alerta && sprites.alerta.visible) sprites.alerta.material.opacity = 0.55 + Math.abs(Math.sin(time * 5)) * 0.45;
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
  scene.background = new THREE.Color(0xeef5ee);
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
  App, getScene: () => scene, sync: () => sync(), color: 'rgba(16,40,22,.94)', view: { pos: [0.9, 1.6, 1.9], target: [-0.8, 1.2, -1.6] },
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
