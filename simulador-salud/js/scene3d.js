/* Martin´s Capacitaciones · Visor 3D / Cine / VR / AR / Cardboard.
   Módulo ES cargado bajo demanda desde app.js:
     const m = await import("./scene3d.js");
     const viewer = m.mount(contenedor, curso, { mode: "explore" | "cine" | "xr", ... });
   Todos los modelos se construyen con primitivas de Three.js (sin archivos externos),
   para que funcionen rápido en el celular y sin conexión. */

import * as THREE from "../vendor/three.module.min.js";
import { OrbitControls } from "../vendor/OrbitControls.js";
import { StereoEffect } from "../vendor/StereoEffect.js";

const NAVY = "#223146";
const SAND = "#c6ae96";
const SKIN = "#e7c4a8";

// ===================================================================
// Utilidades de construcción
// ===================================================================
function std(color, o = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05, ...o });
}
const V = (x, y, z) => new THREE.Vector3(x, y, z);

function mesh(geo, mat, pos, parent) {
  const m = new THREE.Mesh(geo, mat);
  if (pos) m.position.copy(pos);
  if (parent) parent.add(m);
  return m;
}

function capsuleBetween(a, b, r, mat, parent) {
  const len = a.distanceTo(b);
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 14), mat);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize());
  parent.add(m);
  return m;
}

function box(w, h, d, mat, pos, parent) {
  return mesh(new THREE.BoxGeometry(w, h, d), mat, pos, parent);
}
function cyl(rt, rb, h, mat, pos, parent, seg = 24) {
  return mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat, pos, parent);
}
function sph(r, mat, pos, parent) {
  return mesh(new THREE.SphereGeometry(r, 20, 14), mat, pos, parent);
}

function textCanvas(lines, { w = 512, h = 128, bg = "rgba(34,49,70,.92)", fg = "#fff", size = 54, bold = true, border = SAND } = {}) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d");
  x.fillStyle = bg;
  const r = Math.min(28, h / 3);
  x.beginPath();
  x.roundRect ? x.roundRect(4, 4, w - 8, h - 8, r) : x.rect(4, 4, w - 8, h - 8);
  x.fill();
  x.lineWidth = 6;
  x.strokeStyle = border;
  x.stroke();
  x.fillStyle = fg;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.font = `${bold ? "700" : "500"} ${size}px Montserrat, Arial, sans-serif`;
  const arr = Array.isArray(lines) ? lines : [lines];
  arr.forEach((t, i) => x.fillText(t, w / 2, h / 2 + (i - (arr.length - 1) / 2) * size * 1.15));
  return c;
}

function makeLabel(text, height) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = "700 54px Montserrat, Arial, sans-serif";
  const w = Math.min(1024, Math.ceil(ctx.measureText(text).width + 70));
  const tex = new THREE.CanvasTexture(textCanvas(text, { w, h: 100, size: 50 }));
  tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  sp.scale.set((height * w) / 100, height, 1);
  sp.renderOrder = 20;
  return sp;
}

function wrapText(ctx, text, maxW) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

function infoPanelTexture(title, body) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 560;
  const x = c.getContext("2d");
  x.fillStyle = "rgba(255,255,255,.96)";
  x.beginPath();
  x.roundRect ? x.roundRect(6, 6, 1012, 548, 36) : x.rect(6, 6, 1012, 548);
  x.fill();
  x.lineWidth = 10;
  x.strokeStyle = SAND;
  x.stroke();
  x.fillStyle = NAVY;
  x.fillRect(6, 6, 1012, 110);
  x.fillStyle = "#fff";
  x.font = "700 58px Montserrat, Arial, sans-serif";
  x.textBaseline = "middle";
  x.fillText(title, 40, 62);
  x.fillStyle = "#1d2433";
  x.font = "500 40px Montserrat, Arial, sans-serif";
  wrapText(x, body, 940).slice(0, 8).forEach((l, i) => x.fillText(l, 40, 168 + i * 50));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function gradientTexture(top, bottom) {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 256;
  const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  x.fillStyle = g;
  x.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function shadowDisc(radius, parent, y = 0.002) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(0,0,0,.35)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  parent.add(m);
  return m;
}

// ===================================================================
// MODELOS
// ===================================================================

// Cuerpo humano (mirando a +z; el lado derecho del paciente está en -x).
function makeBody(o = {}) {
  const g = new THREE.Group();
  const skin = std(SKIN, { roughness: 0.7 });
  const torsoMat = o.transparentTorso ? std(SKIN, { transparent: true, opacity: 0.35, depthWrite: false }) : skin;
  const navy = std(NAVY, { roughness: 0.8 });
  const head = sph(0.11, skin, V(0, 1.62, 0), g);
  if (o.baby) head.scale.setScalar(1.45);
  const eye = std("#2b2b2b");
  sph(0.012, eye, V(-0.036, 1.645, 0.1), g);
  sph(0.012, eye, V(0.036, 1.645, 0.1), g);
  sph(0.016, skin, V(0, 1.615, 0.11), g);
  capsuleBetween(V(0, 1.44, 0), V(0, 1.54, 0), 0.05, skin, g);
  const torso = mesh(new THREE.CapsuleGeometry(0.15, 0.3, 8, 18), torsoMat, V(0, 1.18, 0), g);
  torso.scale.set(1.3, 1, 0.75);
  const pelvis = sph(0.16, navy, V(0, 0.92, 0), g);
  pelvis.scale.set(1.15, 0.7, 0.75);
  [-1, 1].forEach((sd) => {
    sph(0.055, skin, V(sd * 0.215, 1.4, 0), g);
    capsuleBetween(V(sd * 0.23, 1.4, 0), V(sd * 0.29, 1.13, 0), 0.045, skin, g);
    capsuleBetween(V(sd * 0.29, 1.13, 0), V(sd * 0.32, 0.88, 0), 0.038, skin, g);
    const hand = sph(0.045, skin, V(sd * 0.335, 0.8, 0), g);
    hand.scale.set(0.8, 1.4, 0.5);
    capsuleBetween(V(sd * 0.09, 0.9, 0), V(sd * 0.1, 0.78, 0), 0.075, navy, g);
    capsuleBetween(V(sd * 0.1, 0.86, 0), V(sd * 0.1, 0.49, 0), 0.068, skin, g);
    capsuleBetween(V(sd * 0.1, 0.49, 0), V(sd * 0.1, 0.08, 0), 0.052, skin, g);
    const foot = mesh(new THREE.CapsuleGeometry(0.04, 0.12, 4, 10), skin, V(sd * 0.1, 0.04, 0.05), g);
    foot.rotation.x = Math.PI / 2;
  });
  if (o.baby) g.scale.setScalar(0.45);

  const R = -1; // lado derecho del paciente
  const named = {
    temporal: V(R * 0.105, 1.65, 0.03),
    carotideo: V(R * 0.045, 1.49, 0.045),
    apical: V(0.075, 1.2, 0.115),
    braquial: V(R * 0.27, 1.14, 0.045),
    radial: V(R * 0.335, 0.9, 0.035),
    femoral: V(R * 0.08, 0.84, 0.1),
    popliteo: V(R * 0.1, 0.49, -0.065),
    pedio: V(R * 0.1, 0.07, 0.11),
    deltoides: V(R * 0.28, 1.35, 0.0),
    ventrogluteo: V(R * 0.18, 0.92, 0.0),
    vasto: V(R * 0.165, 0.68, 0.02),
    dorsogluteo: V(R * 0.09, 0.9, -0.115),
    abdomen: V(0.06, 1.03, 0.115),
    antebrazo: V(R * 0.31, 0.99, 0.045),
    rcp: V(0, 1.27, 0.12),
    via_aerea: V(0, 1.585, 0.105),
    dea1: V(R * 0.08, 1.4, 0.105),
    dea2: V(0.17, 1.16, 0.07),
    pectoral: V(R * 0.09, 1.36, 0.105),
    biceps: V(R * 0.27, 1.27, 0.045),
    cuadriceps: V(R * 0.1, 0.68, 0.07),
    isquios: V(R * 0.1, 0.66, -0.07),
    gemelos: V(R * 0.1, 0.3, -0.055),
    occipital: V(0, 1.62, -0.11),
    escapulas: V(R * 0.1, 1.36, -0.11),
    codos: V(R * 0.29, 1.13, -0.045),
    sacro: V(0, 0.93, -0.12),
    trocanter: V(R * 0.185, 0.86, 0),
    talones: V(R * 0.1, 0.03, -0.04)
  };

  if (o.ecg) {
    const heart = makeHeart();
    heart.position.set(0.03, 1.24, 0.0);
    heart.scale.setScalar(0.07);
    g.add(heart);
    g.userData.heart = heart;
    named.corazon = V(0.03, 1.24, 0.0);
    const ecgPts = { V1: [-0.03, 1.27, 0.118], V2: [0.03, 1.27, 0.118], V3: [0.06, 1.235, 0.118], V4: [0.09, 1.2, 0.112], V5: [0.145, 1.2, 0.09], V6: [0.185, 1.2, 0.035] };
    const elec = std("#f5f5f5");
    for (const [k, [x, y, z]] of Object.entries(ecgPts)) {
      named[k] = V(x, y, z);
      const d = mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.004, 16), elec, V(x, y, z), g);
      d.rotation.x = Math.PI / 2;
    }
  }
  return { group: g, named };
}

function makeHeart() {
  const g = new THREE.Group();
  const red = std("#b3262e", { roughness: 0.45 });
  const dark = std("#7d1a20", { roughness: 0.5 });
  const lv = sph(0.85, red, V(0.35, 0, 0), g);
  lv.scale.set(0.95, 1.15, 0.9);
  const rv = sph(0.8, red, V(-0.4, 0.1, 0.1), g);
  rv.scale.set(0.95, 1.05, 0.85);
  const apex = mesh(new THREE.ConeGeometry(0.9, 1.6, 20), red, V(0.15, -0.9, 0), g);
  apex.rotation.z = Math.PI + 0.35;
  sph(0.5, dark, V(-0.55, 0.85, -0.1), g);
  sph(0.5, dark, V(0.5, 0.85, -0.2), g);
  const ao = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V(0, 0.8, 0), V(0, 1.6, 0), V(0.5, 2.0, 0), V(0.9, 1.4, -0.2)]), 20, 0.22, 10);
  mesh(ao, std("#c43a3a"), null, g);
  return g;
}

function sceneCuerpo(o) {
  const root = new THREE.Group();
  const b = makeBody(o);
  root.add(b.group);
  shadowDisc(0.5, root);
  const named = {};
  b.group.updateMatrixWorld(true);
  for (const [k, v] of Object.entries(b.named)) named[k] = b.group.localToWorld(v.clone());
  const baby = !!o.baby;
  return {
    root, named,
    focus: baby ? V(0, 0.45, 0) : V(0, 0.92, 0),
    size: baby ? { w: 0.5, h: 0.95, d: 0.3 } : { w: 0.9, h: 1.9, d: 0.4 },
    hs: baby ? 0.016 : 0.026, ls: baby ? 0.04 : 0.06,
    xr: { vr: { s: baby ? 2 : 1, p: [0, baby ? 0.6 : 0, -1.3] }, ar: { s: 0.3 } },
    animate(t) { if (b.group.userData.heart) b.group.userData.heart.scale.setScalar(0.07 * (1 + 0.08 * Math.max(0, Math.sin(t * 7.5)))); }
  };
}

function sceneBrazo() {
  const root = new THREE.Group();
  const skin = std(SKIN, { roughness: 0.7 });
  const r = (x) => THREE.MathUtils.lerp(0.11, 0.07, (x + 0.6) / 1.1);
  const surf = (x, th) => V(x, 0.9 + r(x) * Math.cos(th), r(x) * Math.sin(th));
  const arm = cyl(0.07, 0.11, 1.1, skin, V(-0.05, 0.9, 0), root, 32);
  arm.rotation.z = Math.PI / 2;
  const hand = sph(0.09, skin, V(0.62, 0.9, 0), root);
  hand.scale.set(1.3, 0.55, 1);
  const thumb = capsuleBetween(V(0.6, 0.9, 0.07), V(0.7, 0.9, 0.14), 0.025, skin, root);
  void thumb;
  const veinMat = std("#3f5fa8", { roughness: 0.5 });
  const tube = (pts) => mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.011, 8), veinMat, null, root);
  const xs = [0.5, 0.2, -0.1, -0.35, -0.58];
  tube(xs.map((x) => surf(x, 0.75)));
  tube(xs.map((x) => surf(x, -0.75)));
  tube([surf(-0.28, 0.75), surf(-0.35, 0.2), surf(-0.42, -0.4), surf(-0.46, -0.75)]);
  const tq = mesh(new THREE.TorusGeometry(0.112, 0.016, 10, 40), std("#4a7bd0"), V(-0.52, 0.9, 0), root);
  tq.rotation.y = Math.PI / 2;
  const cat = new THREE.Group();
  cyl(0.006, 0.006, 0.12, std("#dfe6ee", { metalness: 0.4 }), V(0, 0.06, 0), cat);
  cyl(0.018, 0.014, 0.05, std("#e8669a"), V(0, -0.02, 0), cat);
  cat.position.copy(surf(0.24, 0.75)).add(V(0, 0.03, 0.01));
  cat.rotation.z = Math.PI / 2 + 0.25;
  root.add(cat);
  box(1.7, 0.06, 0.7, std("#d9d2c8"), V(0, 0.8, 0), root);
  cyl(0.04, 0.04, 0.8, std("#9aa3ad", { metalness: 0.5 }), V(0, 0.4, 0), root);
  shadowDisc(0.6, root);
  return {
    root,
    named: {
      cefalica: surf(0.1, 0.75), basilica: surf(0.1, -0.75), mediana: surf(-0.35, 0.1),
      dorsal: V(0.66, 0.95, 0), torniquete: V(-0.52, 1.03, 0), cateter: surf(0.3, 0.75).add(V(0, 0.03, 0))
    },
    focus: V(0, 0.9, 0), size: { w: 1.6, h: 0.5, d: 0.8 }, hs: 0.022, ls: 0.05,
    xr: { vr: { s: 1, p: [0, 0.1, -0.9] }, ar: { s: 0.4 } }
  };
}

function toothLayout() {
  const sizes = [7, 6.2, 6.6, 6.8, 6.8, 9, 8.6, 8];
  const out = [];
  [[1, 1, -1], [2, 1, 1], [3, -1, 1], [4, -1, -1]].forEach(([q, up, side]) => {
    let acc = 0;
    for (let n = 1; n <= 8; n++) {
      acc += sizes[n - 1] * (n === 1 ? 0.5 : 1) + (n > 1 ? sizes[n - 2] * 0.5 : 0);
      const a = (acc / 112) * 1.75 * side;
      out.push({ num: `${q}${n}`, n, up, a, x: 0.42 * Math.sin(a), z: -0.1 + 0.42 * Math.cos(a), w: sizes[n - 1] * 0.0062 });
    }
  });
  return out;
}

function sceneDental() {
  const root = new THREE.Group();
  const enamel = std("#f6f2e8", { roughness: 0.35 });
  const gum = std("#d98c8c", { roughness: 0.6 });
  const named = {};
  toothLayout().forEach((t) => {
    let m;
    const h = t.n >= 6 ? 0.07 : t.n === 3 ? 0.11 : 0.09;
    if (t.n <= 2) m = new THREE.Mesh(new THREE.BoxGeometry(t.w, h, t.w * 0.45), enamel);
    else if (t.n === 3) m = new THREE.Mesh(new THREE.ConeGeometry(t.w * 0.5, h, 12), enamel);
    else if (t.n <= 5) m = new THREE.Mesh(new THREE.CylinderGeometry(t.w * 0.48, t.w * 0.4, h, 14), enamel);
    else m = new THREE.Mesh(new THREE.BoxGeometry(t.w * 0.95, h, t.w * 0.95), enamel);
    if (t.n === 3 && t.up > 0) m.rotation.x = Math.PI;
    const y = t.up > 0 ? 0.13 - h / 2 : -0.13 + h / 2;
    m.position.set(t.x, y, t.z);
    m.rotation.y = t.a;
    root.add(m);
    named[`tooth:${t.num}`] = V(t.x, t.up > 0 ? 0.13 - h : -0.13 + h, t.z).multiplyScalar(1);
  });
  [1, -1].forEach((up) => {
    const pts = [];
    for (let a = -1.85; a <= 1.85; a += 0.12) pts.push(V(0.42 * Math.sin(a), up * 0.15, -0.1 + 0.42 * Math.cos(a)));
    mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.05, 12), gum, null, root);
  });
  const tongue = sph(0.2, std("#c96a6a"), V(0, -0.17, -0.05), root);
  tongue.scale.set(1, 0.3, 1.3);
  shadowDisc(0.6, root, -0.25);
  return {
    root,
    named: {
      incisivos: named["tooth:11"], caninos: named["tooth:13"], premolares: named["tooth:24"],
      molares: named["tooth:36"], terceros: named["tooth:48"], encia: V(0, 0.17, 0.36)
    },
    focus: V(0, 0, 0.05), size: { w: 1.0, h: 0.5, d: 0.6 }, hs: 0.018, ls: 0.04,
    camDir: V(0, 0.55, 1),
    xr: { vr: { s: 2, p: [0, 1.3, -1.0] }, ar: { s: 0.5 } }
  };
}

function sceneDiente() {
  const root = new THREE.Group();
  const lathe = (pts, mat) => {
    const m = new THREE.Mesh(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 48, Math.PI / 2, Math.PI * 1.5), mat);
    root.add(m);
    return m;
  };
  const ds = { side: THREE.DoubleSide };
  lathe([[0.001, 0.8], [0.16, 0.78], [0.25, 0.68], [0.27, 0.5], [0.23, 0.3], [0.21, 0.24]], std("#fbfaf6", { roughness: 0.25, ...ds }));
  lathe([[0.001, 0.72], [0.14, 0.7], [0.22, 0.6], [0.235, 0.45], [0.2, 0.27], [0.19, 0.1], [0.15, -0.3], [0.07, -0.62], [0.001, -0.68]], std("#f0dca0", ds));
  lathe([[0.001, 0.55], [0.07, 0.55], [0.1, 0.45], [0.09, 0.25], [0.06, 0], [0.035, -0.4], [0.012, -0.62], [0.001, -0.64]], std("#d0384a", ds));
  lathe([[0.212, 0.24], [0.205, 0.1], [0.165, -0.3], [0.085, -0.64], [0.001, -0.715]], std("#d8c48a", { transparent: true, opacity: 0.7, ...ds }));
  box(1.1, 0.25, 0.8, std("#e48d97", { transparent: true, opacity: 0.35, depthWrite: false }), V(0, 0.13, 0), root);
  box(1.1, 0.75, 0.8, std("#efe2c4", { transparent: true, opacity: 0.25, depthWrite: false }), V(0, -0.37, 0), root);
  return {
    root,
    named: {
      esmalte: V(-0.2, 0.66, 0.12), dentina: V(0.13, 0.48, 0.06), pulpa: V(0.04, 0.38, 0.04),
      cemento: V(-0.16, -0.25, 0.1), encia: V(0.45, 0.2, 0.32), hueso: V(0.45, -0.35, 0.32)
    },
    focus: V(0, 0.05, 0), size: { w: 1.2, h: 1.6, d: 0.8 }, hs: 0.03, ls: 0.07,
    camDir: V(0.8, 0.35, 1.1),
    xr: { vr: { s: 1, p: [0, 1.3, -1.2] }, ar: { s: 0.25 } }
  };
}

function scenePiel() {
  const root = new THREE.Group();
  box(1.2, 0.08, 0.8, std("#e8b89a", { roughness: 0.8 }), V(0, 0, 0), root);
  box(1.22, 0.03, 0.82, std("#f3d1bb", { roughness: 0.85 }), V(0, 0.05, 0), root);
  box(0.8, 0.012, 0.03, std("#8e1f2a", { roughness: 0.4 }), V(0, 0.062, 0), root);
  const thread = std("#1f3a8a", { roughness: 0.4 });
  const stitches = [];
  for (let i = 0; i < 6; i++) {
    const s = mesh(new THREE.TorusGeometry(0.045, 0.005, 6, 24, Math.PI), thread, V(-0.3 + i * 0.12, 0.062, 0), root);
    s.rotation.y = Math.PI / 2;
    sph(0.01, thread, V(-0.3 + i * 0.12, 0.068, 0.05), root);
    stitches.push(s);
  }
  const steel = std("#c8ced6", { metalness: 0.7, roughness: 0.3 });
  const porta = new THREE.Group();
  [-1, 1].forEach((sd) => {
    const arm = box(0.32, 0.012, 0.016, steel, V(0, 0, sd * 0.012), porta);
    arm.rotation.y = sd * 0.06;
    const ring = mesh(new THREE.TorusGeometry(0.025, 0.006, 8, 20), steel, V(-0.18, 0, sd * 0.035), porta);
    ring.rotation.x = Math.PI / 2;
  });
  porta.position.set(0.25, 0.14, 0.28);
  porta.rotation.set(0, -0.6, -0.35);
  root.add(porta);
  const needle = mesh(new THREE.TorusGeometry(0.035, 0.0035, 6, 24, Math.PI * 1.1), steel, V(0.1, 0.17, 0.2), root);
  needle.rotation.set(0.3, -0.6, 0);
  shadowDisc(0.8, root, -0.041);
  return {
    root,
    named: {
      herida: V(0.36, 0.07, 0), punto: V(-0.06, 0.11, 0), espacio: V(0, 0.08, -0.08),
      aguja: V(0.1, 0.2, 0.2), porta: V(0.25, 0.16, 0.3), nudo: V(-0.3, 0.075, 0.05)
    },
    focus: V(0, 0.05, 0), size: { w: 1.25, h: 0.5, d: 0.9 }, hs: 0.022, ls: 0.05,
    camDir: V(0.2, 0.9, 1),
    xr: { vr: { s: 1.3, p: [0, 1.0, -0.9] }, ar: { s: 0.4 } },
    animate(t, m) { stitches.forEach((s, i) => { s.visible = m !== "cine" || ((t * 1.2) % 9) > i * 0.9; }); }
  };
}

function sceneFarmacia() {
  const root = new THREE.Group();
  const wood = std("#e9e1d6");
  const navy = std(NAVY);
  box(3.2, 0.02, 2.6, std("#d8cfc4"), V(0, 0, 0.3), root);
  box(1.8, 2.0, 0.05, wood, V(-0.3, 1.0, -0.5), root);
  const palette = ["#c6ae96", "#223146", "#6b8bb5", "#e8f0f7", "#d64545", "#4f8a7a", "#f2c14e", "#ffffff"];
  let k = 0;
  for (let s = 0; s < 4; s++) {
    const y = 0.35 + s * 0.45;
    box(1.8, 0.03, 0.35, wood, V(-0.3, y, -0.32), root);
    for (let i = 0; i < 9; i++) {
      const c = palette[(k++ * 5) % palette.length];
      const x = -1.1 + i * 0.18;
      if ((i + s) % 3 === 0) cyl(0.045, 0.045, 0.16, std(c), V(x, y + 0.095, -0.3), root, 14);
      else box(0.14, 0.18 + ((i * 7 + s) % 3) * 0.04, 0.12, std(c), V(x, y + 0.11, -0.3), root);
    }
  }
  // Nevera de cadena de frío
  box(0.6, 1.6, 0.6, std("#f4f6f8", { metalness: 0.2 }), V(1.0, 0.8, -0.3), root);
  box(0.5, 1.3, 0.02, std("#9cc8e8", { transparent: true, opacity: 0.45 }), V(1.0, 0.85, 0.005), root);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) cyl(0.03, 0.03, 0.1, std(["#ffffff", "#f2c14e", "#6b8bb5"][j]), V(0.85 + j * 0.15, 0.4 + i * 0.4, -0.2), root, 10);
  const lab = makeLabel("2–8 °C", 0.1);
  lab.position.set(1.0, 1.7, 0.02);
  root.add(lab);
  // Armario de controlados
  box(0.4, 0.6, 0.35, std("#7a5a43"), V(-1.45, 1.5, -0.32), root);
  box(0.05, 0.08, 0.02, std("#d4af37", { metalness: 0.8 }), V(-1.3, 1.5, -0.14), root);
  // Mostrador
  box(2.2, 0.95, 0.5, navy, V(-0.1, 0.475, 0.9), root);
  box(2.3, 0.04, 0.6, std(SAND), V(-0.1, 0.97, 0.9), root);
  box(0.12, 0.16, 0.08, std("#ffffff"), V(0.3, 1.07, 0.9), root);
  box(0.25, 0.01, 0.18, std("#ffffff"), V(-0.4, 1.0, 0.9), root);
  // Termohigrómetro
  box(0.14, 0.18, 0.03, std("#ffffff"), V(0.55, 1.5, -0.47), root);
  return {
    root,
    named: {
      nevera: V(1.0, 1.2, 0.05), controlados: V(-1.45, 1.5, -0.12), fefo: V(-0.3, 1.25, -0.15),
      venta_libre: V(-0.6, 0.6, -0.15), mostrador: V(-0.1, 1.05, 1.1), termometro: V(0.55, 1.5, -0.44)
    },
    focus: V(-0.1, 0.95, 0.2), size: { w: 3.1, h: 2.1, d: 1.6 }, hs: 0.05, ls: 0.1,
    camDir: V(0.15, 0.25, 1),
    xr: { vr: { s: 1, p: [0, 0, -2.0] }, ar: { s: 0.15 } }
  };
}

function sceneBandeja() {
  const root = new THREE.Group();
  const steel = std("#c8ced6", { metalness: 0.65, roughness: 0.3 });
  const dark = std("#9aa3ad", { metalness: 0.6, roughness: 0.35 });
  cyl(0.03, 0.03, 0.9, dark, V(-0.45, 0.45, 0), root);
  box(0.6, 0.04, 0.5, dark, V(-0.3, 0.02, 0), root);
  box(1.1, 0.03, 0.7, steel, V(0, 0.92, 0), root);
  const green = std("#3f7d6b", { roughness: 0.9 });
  box(1.08, 0.005, 0.68, green, V(0, 0.938, 0), root);
  const Y = 0.948;
  const named = {};
  function scissorLike(x, z, len, jaw, ringsColor, key) {
    const g = new THREE.Group();
    [-1, 1].forEach((sd) => {
      const a = box(len, 0.008, 0.012, steel, V(0, 0, 0), g);
      a.rotation.y = sd * 0.06;
      const ring = mesh(new THREE.TorusGeometry(0.022, 0.005, 8, 18), ringsColor || steel, V(-len / 2 - 0.02, 0, sd * 0.03), g);
      ring.rotation.x = Math.PI / 2;
      const j = box(jaw, 0.008, 0.01, steel, V(len / 2 + jaw / 2 - 0.01, 0, sd * 0.004), g);
      j.rotation.y = -sd * 0.04;
    });
    g.position.set(x, Y, z);
    root.add(g);
    named[key] = V(x + len / 2, Y + 0.02, z);
  }
  // Bisturí
  const bis = new THREE.Group();
  box(0.16, 0.008, 0.018, steel, V(0, 0, 0), bis);
  const blade = mesh(new THREE.ConeGeometry(0.012, 0.05, 3), std("#e8ecf0", { metalness: 0.9, roughness: 0.15 }), V(0.105, 0, 0), bis);
  blade.rotation.z = -Math.PI / 2;
  bis.position.set(-0.35, Y, -0.22);
  root.add(bis);
  named.bisturi = V(-0.3, Y + 0.02, -0.22);
  scissorLike(-0.05, -0.22, 0.13, 0.06, null, "tijera");
  scissorLike(0.28, -0.22, 0.11, 0.07, std("#d4af37", { metalness: 0.7 }), "kelly");
  // Pinza de disección
  const pd = new THREE.Group();
  [-1, 1].forEach((sd) => { const a = box(0.16, 0.006, 0.01, steel, V(0, 0, sd * 0.008), pd); a.rotation.y = sd * 0.08; });
  pd.position.set(-0.3, Y, 0.05);
  root.add(pd);
  named.diseccion = V(-0.24, Y + 0.02, 0.05);
  // Separador Farabeuf
  const fa = new THREE.Group();
  box(0.2, 0.006, 0.025, steel, V(0, 0, 0), fa);
  box(0.006, 0.05, 0.025, steel, V(0.1, -0.02, 0), fa).position.y = 0.02;
  box(0.006, 0.05, 0.025, steel, V(-0.1, 0.02, 0), fa);
  fa.position.set(0.05, Y + 0.02, 0.08);
  root.add(fa);
  named.separador = V(0.05, Y + 0.05, 0.08);
  scissorLike(0.32, 0.12, 0.12, 0.03, std("#d4af37", { metalness: 0.7 }), "portaagujas");
  box(0.12, 0.01, 0.08, std("#ffffff"), V(0.4, Y, -0.05), root);
  shadowDisc(0.7, root);
  return {
    root, named,
    focus: V(0, 0.93, 0), size: { w: 1.1, h: 0.35, d: 0.7 }, hs: 0.02, ls: 0.045,
    camDir: V(0, 1.1, 0.9),
    xr: { vr: { s: 1.2, p: [0, -0.15, -0.8] }, ar: { s: 0.4 } }
  };
}

function sceneCama() {
  const root = new THREE.Group();
  const frame = std("#9aa3ad", { metalness: 0.5, roughness: 0.4 });
  box(0.95, 0.18, 2.0, std("#eef2f6"), V(0, 0.53, 0), root);
  box(1.0, 0.06, 2.05, frame, V(0, 0.42, 0), root);
  box(1.0, 0.7, 0.05, std(NAVY), V(0, 0.7, -1.04), root);
  box(1.0, 0.45, 0.05, std(NAVY), V(0, 0.6, 1.04), root);
  [[-0.45, -0.95], [0.45, -0.95], [-0.45, 0.95], [0.45, 0.95]].forEach(([x, z]) => {
    cyl(0.025, 0.025, 0.4, frame, V(x, 0.2, z), root, 10);
    const w = cyl(0.05, 0.05, 0.03, std("#333"), V(x, 0.05, z), root, 14);
    w.rotation.z = Math.PI / 2;
  });
  [-1, 1].forEach((sd) => {
    box(0.03, 0.03, 0.9, frame, V(sd * 0.49, 0.85, -0.3), root);
    box(0.03, 0.03, 0.9, frame, V(sd * 0.49, 0.72, -0.3), root);
    [-0.7, 0.1].forEach((z) => box(0.02, 0.2, 0.02, frame, V(sd * 0.49, 0.75, z), root));
  });
  box(0.55, 0.09, 0.32, std("#ffffff"), V(0, 0.66, -0.82), root);
  box(0.92, 0.04, 0.95, std("#bcd3e6"), V(0, 0.64, 0.45), root);
  const b = makeBody();
  b.group.rotation.x = -Math.PI / 2;
  b.group.position.set(0, 0.72, 0.8);
  root.add(b.group);
  b.group.updateMatrixWorld(true);
  const named = { barandas: V(0.49, 0.9, -0.3) };
  for (const k of ["occipital", "escapulas", "codos", "sacro", "trocanter", "talones"]) named[k] = b.group.localToWorld(b.named[k].clone());
  shadowDisc(1.2, root);
  return {
    root, named,
    focus: V(0, 0.6, 0), size: { w: 1.2, h: 1.0, d: 2.1 }, hs: 0.03, ls: 0.07,
    camDir: V(1, 0.9, 0.9),
    xr: { vr: { s: 1, p: [0, 0, -1.8] }, ar: { s: 0.2 } }
  };
}

function sceneLaboratorio() {
  const root = new THREE.Group();
  box(1.6, 0.05, 0.8, std("#f2f2f2"), V(0, 0.9, 0), root);
  box(1.6, 0.85, 0.75, std(NAVY), V(0, 0.45, 0), root);
  box(0.42, 0.04, 0.12, std("#dfe6ee"), V(-0.45, 0.94, 0.15), root);
  box(0.42, 0.04, 0.12, std("#dfe6ee"), V(-0.45, 1.02, 0.15), root);
  const named = {};
  const tubes = [["#ffffff", "hemo"], ["#7cc6e8", "celeste"], ["#d64545", "rojo"], ["#3f9d5b", "verde"], ["#9a6bc4", "lila"], ["#8c8c8c", "gris"]];
  tubes.forEach(([c, k], i) => {
    const x = -0.62 + i * 0.065;
    cyl(0.014, 0.014, 0.13, std("#e8f1f7", { transparent: true, opacity: 0.6 }), V(x, 1.0, 0.15), root, 12);
    cyl(0.012, 0.012, 0.07, std("#8b1a1a"), V(x, 0.975, 0.15), root, 12);
    cyl(0.017, 0.017, 0.03, std(c), V(x, 1.08, 0.15), root, 12);
    named[k] = V(x, 1.12, 0.15);
  });
  // Microscopio
  const mic = new THREE.Group();
  const black = std("#2b2f36", { roughness: 0.4 });
  const white = std("#f4f4f4");
  box(0.2, 0.03, 0.26, white, V(0, 0, 0), mic);
  box(0.05, 0.3, 0.06, white, V(0, 0.15, -0.09), mic);
  box(0.16, 0.015, 0.14, black, V(0, 0.12, 0.02), mic);
  const head = cyl(0.03, 0.03, 0.16, white, V(0, 0.3, -0.01), mic, 14);
  head.rotation.x = -0.6;
  cyl(0.012, 0.012, 0.06, black, V(0, 0.2, 0.02), mic, 10);
  cyl(0.02, 0.02, 0.03, black, V(0.045, 0.12, -0.09), mic, 12).rotation.z = Math.PI / 2;
  mic.position.set(0.05, 0.94, 0);
  root.add(mic);
  named.microscopio = V(0.05, 1.3, 0.05);
  // Centrífuga
  cyl(0.16, 0.18, 0.2, std("#e6e9ee"), V(0.55, 1.02, 0), root, 28);
  cyl(0.14, 0.14, 0.02, std("#6b8bb5", { transparent: true, opacity: 0.7 }), V(0.55, 1.13, 0), root, 28);
  named.centrifuga = V(0.55, 1.18, 0);
  return {
    root, named,
    focus: V(0, 1.0, 0), size: { w: 1.6, h: 0.5, d: 0.8 }, hs: 0.02, ls: 0.045,
    camDir: V(0, 0.6, 1),
    xr: { vr: { s: 1, p: [0, 0, -1.1] }, ar: { s: 0.3 } }
  };
}

function sceneResiduos() {
  const root = new THREE.Group();
  box(3, 0.02, 1.6, std("#e0dbd3"), V(0, 0, 0), root);
  const bins = [["#d64545", "rojo", -1.05], ["#2b2b2b", "negro", -0.35], ["#2e9d5b", "reciclable", 0.35]];
  bins.forEach(([c, k, x]) => {
    cyl(0.22, 0.18, 0.7, std("#f0f0f0"), V(x, 0.35, 0), root, 24);
    cyl(0.235, 0.235, 0.06, std(c), V(x, 0.72, 0), root, 24);
    cyl(0.225, 0.225, 0.02, std(c), V(x, 0.69, 0), root, 24);
  });
  box(0.22, 0.3, 0.16, std("#f2c14e"), V(0.95, 0.17, 0.1), root);
  box(0.24, 0.05, 0.18, std("#d64545"), V(0.95, 0.34, 0.1), root);
  box(0.5, 0.85, 0.4, std("#ffffff"), V(1.15, 0.425, -0.55), root);
  box(0.46, 0.06, 0.36, std("#cfd8e3"), V(1.15, 0.86, -0.55), root);
  const tap = cyl(0.015, 0.015, 0.15, std("#c8ced6", { metalness: 0.7 }), V(1.15, 0.97, -0.68), root, 10);
  void tap;
  const lbl = (t, x, y, z) => { const l = makeLabel(t, 0.06); l.position.set(x, y, z); root.add(l); };
  lbl("🦠", -1.05, 0.95, 0);
  return {
    root,
    named: { rojo: V(-1.05, 0.8, 0), negro: V(-0.35, 0.8, 0), reciclable: V(0.35, 0.8, 0), guardian: V(0.95, 0.42, 0.1), lavamanos: V(1.15, 1.05, -0.55) },
    focus: V(0, 0.5, 0), size: { w: 2.8, h: 1.1, d: 1.2 }, hs: 0.04, ls: 0.08,
    camDir: V(0, 0.5, 1),
    xr: { vr: { s: 1, p: [0, 0, -1.8] }, ar: { s: 0.25 } }
  };
}

function scenePlato() {
  const root = new THREE.Group();
  box(1.4, 0.04, 0.9, std("#cdb79e"), V(0, -0.02, 0), root);
  cyl(0.32, 0.27, 0.04, std("#ffffff", { roughness: 0.3 }), V(0, 0.02, 0), root, 40);
  const green = [std("#2e9d5b"), std("#5cb85c"), std("#e85d4a")];
  for (let i = 0; i < 26; i++) {
    const a = Math.PI * (0.55 + Math.random() * 0.9);
    const r = 0.05 + Math.random() * 0.2;
    sph(0.025 + Math.random() * 0.02, green[i % 3], V(Math.cos(a) * r, 0.06, Math.sin(a) * r * -1), root);
  }
  const prot = box(0.16, 0.05, 0.11, std("#a0613c"), V(0.13, 0.065, 0.1), root);
  prot.rotation.y = 0.4;
  const beige = std("#efe3c7");
  for (let i = 0; i < 40; i++) sph(0.012, beige, V(0.12 + Math.random() * 0.12, 0.055 + Math.random() * 0.02, -0.06 - Math.random() * 0.14), root);
  sph(0.06, std("#c0392b"), V(-0.5, 0.06, 0.2), root);
  cyl(0.004, 0.004, 0.03, std("#6b4e2e"), V(-0.5, 0.125, 0.2), root);
  cyl(0.055, 0.045, 0.2, std("#d7ecf7", { transparent: true, opacity: 0.4 }), V(0.5, 0.1, -0.15), root, 20);
  cyl(0.05, 0.043, 0.14, std("#6bb8e6", { transparent: true, opacity: 0.6 }), V(0.5, 0.07, -0.15), root, 20);
  cyl(0.03, 0.035, 0.16, std("#c9b33b", { transparent: true, opacity: 0.8 }), V(0.5, 0.08, 0.2), root, 16);
  return {
    root,
    named: {
      verduras: V(-0.13, 0.1, 0), proteina: V(0.13, 0.11, 0.1), cereales: V(0.17, 0.1, -0.12),
      fruta: V(-0.5, 0.14, 0.2), agua: V(0.5, 0.23, -0.15), aceite: V(0.5, 0.19, 0.2)
    },
    focus: V(0, 0.05, 0), size: { w: 1.3, h: 0.3, d: 0.8 }, hs: 0.022, ls: 0.045,
    camDir: V(0, 1.0, 0.9),
    xr: { vr: { s: 1.5, p: [0, 0.8, -0.8] }, ar: { s: 0.5 } }
  };
}

const BUILDERS = {
  cuerpo: (c) => sceneCuerpo({ baby: c.escena.bebe }),
  ecg: () => Object.assign(sceneCuerpo({ transparentTorso: true, ecg: true }), { focus: V(0.05, 1.22, 0), size: { w: 0.6, h: 0.55, d: 0.3 }, hs: 0.012, ls: 0.03 }),
  brazo: sceneBrazo,
  dental: sceneDental,
  diente: sceneDiente,
  piel: scenePiel,
  farmacia: sceneFarmacia,
  bandeja: sceneBandeja,
  cama: sceneCama,
  laboratorio: sceneLaboratorio,
  residuos: sceneResiduos,
  plato: scenePlato
};

// ===================================================================
// Visor
// ===================================================================
export async function xrSupport() {
  const out = { vr: false, ar: false };
  if (!navigator.xr || !window.isSecureContext) return out;
  try { out.vr = await navigator.xr.isSessionSupported("immersive-vr"); } catch (e) { /* no */ }
  try { out.ar = await navigator.xr.isSessionSupported("immersive-ar"); } catch (e) { /* no */ }
  return out;
}

export function mount(container, course, opts = {}) {
  let alive = false;
  const dark = document.documentElement.dataset.theme === "dark";
  const speak = opts.speak || (() => {});
  const stopSpeak = opts.stopSpeak || (() => {});

  // ----- DOM -----
  container.replaceChildren();
  container.classList.add("v3d");
  const canvasHost = document.createElement("div");
  canvasHost.className = "v3d-canvas";
  const ui = document.createElement("div");
  ui.className = "v3d-ui";
  container.append(canvasHost, ui);

  // ----- Three -----
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.xr.enabled = true;
  canvasHost.append(renderer.domElement);

  const scene = new THREE.Scene();
  const bgTex = dark ? gradientTexture("#1d2a40", "#0e1522") : gradientTexture("#faf7f2", "#ddd0c1");
  scene.background = bgTex;
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  scene.add(camera);
  scene.add(new THREE.HemisphereLight(0xffffff, dark ? 0x334055 : 0xcbb8a4, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(2, 4, 3);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xfff1e0, 0.6);
  fill.position.set(-3, 2, -2);
  scene.add(fill);

  const S = BUILDERS[course.escena.tipo](course);
  const world = new THREE.Group();
  world.add(S.root);
  scene.add(world);

  // ----- Puntos interactivos -----
  const hotspots = [];
  const hsGroup = new THREE.Group();
  S.root.add(hsGroup);
  course.escena.hotspots.forEach((d) => {
    const pos = S.named[d.n];
    if (!pos) return;
    const g = new THREE.Group();
    g.position.copy(pos);
    const mat = new THREE.MeshBasicMaterial({ color: SAND, depthTest: false, transparent: true, opacity: 0.95 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(S.hs, 18, 12), mat);
    core.renderOrder = 10;
    const ringMat = new THREE.MeshBasicMaterial({ color: NAVY, depthTest: false, transparent: true, opacity: 0.9 });
    const ring = new THREE.Mesh(new THREE.SphereGeometry(S.hs * 1.45, 18, 12), ringMat);
    ring.renderOrder = 9;
    const hit = new THREE.Mesh(new THREE.SphereGeometry(S.hs * 2.4, 8, 6), new THREE.MeshBasicMaterial({ visible: false }));
    const label = makeLabel(d.label, S.ls);
    label.position.y = S.hs * 2.2 + S.ls * 0.6;
    g.add(ring, core, hit, label);
    hsGroup.add(g);
    const h = { d, g, core, ring, hit, label, mat, ringMat };
    hit.userData.h = h;
    core.userData.h = h;
    hotspots.push(h);
  });
  const hitMeshes = hotspots.map((h) => h.hit);

  // ----- Cámara inicial -----
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.copy(S.focus);
  const camDir = (S.camDir || V(0.35, 0.22, 1)).clone().normalize();
  let homeDist = 2;
  function frameHome(animated) {
    const w = container.clientWidth || 1;
    const hgt = container.clientHeight || 1;
    camera.aspect = w / hgt;
    camera.updateProjectionMatrix();
    const vf = THREE.MathUtils.degToRad(camera.fov) / 2;
    const hf = Math.atan(Math.tan(vf) * camera.aspect);
    homeDist = Math.max((S.size.h / 2) / Math.tan(vf), (S.size.w / 2) / Math.tan(hf)) * 1.12 + S.size.d / 2;
    const pos = S.focus.clone().add(camDir.clone().multiplyScalar(homeDist));
    controls.minDistance = homeDist * 0.15;
    controls.maxDistance = homeDist * 3;
    if (animated) tweenTo(pos, S.focus.clone(), 1.2);
    else { camera.position.copy(pos); controls.target.copy(S.focus); controls.update(); }
  }

  function resize() {
    const w = container.clientWidth || 1;
    const hgt = container.clientHeight || 1;
    if (renderer.xr.isPresenting) return;
    renderer.setSize(w, hgt, false);
    camera.aspect = w / hgt;
    camera.updateProjectionMatrix();
    if (stereo) stereo.setSize(w, hgt);
  }
  const ro = new ResizeObserver(() => resize());
  ro.observe(container);

  // ----- Tweens de cámara -----
  let tween = null;
  function tweenTo(pos, target, dur = 2) {
    tween = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos, t1: target, start: performance.now(), dur: dur * 1000 };
  }
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  // ----- Interacción: tocar puntos -----
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let down = null;
  let onHotspot = null;
  function pickAt(clientX, clientY) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(hitMeshes, false);
    return hits.length ? hits[0].object.userData.h : null;
  }
  renderer.domElement.addEventListener("pointerdown", (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!down || cardboard) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved > 8) return;
    const h = pickAt(e.clientX, e.clientY);
    if (h && onHotspot) onHotspot(h);
  });
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || cardboard) return;
    renderer.domElement.style.cursor = pickAt(e.clientX, e.clientY) ? "pointer" : "grab";
  });

  // ----- Estados de los puntos -----
  let labelsOn = true;
  function setLabels(on) { labelsOn = on; hotspots.forEach((h) => { h.label.visible = on || h.revealed; }); }
  function colorHs(h, c) { h.mat.color.set(c); }
  let selected = null;
  function select(h) {
    if (selected) colorHs(selected, SAND);
    selected = h;
    if (h) colorHs(h, "#ffffff");
  }

  // ----- Panel informativo HTML -----
  const info = el("div", "v3d-info", "");
  info.hidden = true;
  ui.append(info);
  function showInfo(h, extra = "") {
    info.hidden = false;
    info.innerHTML = `<div class="v3d-info-head"><strong>${h.d.label}</strong><button class="v3d-x" aria-label="Cerrar">✕</button></div><p>${h.d.info}</p>${extra}<button class="btn btn-secondary btn-sm v3d-say">🔊 Escuchar</button>`;
    info.querySelector(".v3d-x").onclick = () => { info.hidden = true; select(null); stopSpeak(); };
    info.querySelector(".v3d-say").onclick = () => speak(`${h.d.label}. ${h.d.info}`);
  }

  // ----- Panel 3D (VR / Cardboard) -----
  let panel3d = null;
  function showPanel3D(h) {
    hidePanel3D();
    const tex = infoPanelTexture(h.d.label, h.d.info);
    const wp = new THREE.Vector3();
    h.g.getWorldPosition(wp);
    const camPos = new THREE.Vector3();
    (renderer.xr.isPresenting ? renderer.xr.getCamera() : camera).getWorldPosition(camPos);
    const dist = wp.distanceTo(camPos);
    const width = Math.max(0.25, dist * 0.55);
    panel3d = new THREE.Mesh(new THREE.PlaneGeometry(width, (width * 560) / 1024), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false }));
    panel3d.renderOrder = 30;
    panel3d.position.copy(wp).lerp(camPos, 0.35);
    panel3d.position.y += width * 0.25;
    panel3d.lookAt(camPos);
    scene.add(panel3d);
  }
  function hidePanel3D() {
    if (!panel3d) return;
    scene.remove(panel3d);
    panel3d.geometry.dispose();
    panel3d.material.map.dispose();
    panel3d.material.dispose();
    panel3d = null;
  }

  // ===================================================================
  // MODOS
  // ===================================================================
  let mode = null;
  let autoRotate = false;
  let cine = null;
  let reto = null;

  function clearUI() {
    ui.querySelectorAll(".v3d-mode").forEach((n) => n.remove());
    info.hidden = true;
    container.classList.remove("cine-on");
    hotspots.forEach((h) => { h.revealed = false; colorHs(h, SAND); h.g.visible = true; });
    setLabels(labelsOn);
    stopSpeak();
    cine = null;
    reto = null;
    onHotspot = null;
    controls.enabled = true;
  }

  function toolbar(buttons) {
    const bar = el("div", "v3d-toolbar v3d-mode", "");
    buttons.forEach((b) => {
      const btn = el("button", `v3d-btn${b.active ? " active" : ""}`, b.html);
      btn.type = "button";
      btn.title = b.title || "";
      btn.onclick = () => b.onClick(btn);
      bar.append(btn);
    });
    ui.append(bar);
    return bar;
  }

  // ----- Explorar -----
  function modeExplore() {
    clearUI();
    mode = "explore";
    toolbar([
      { html: "🔍 Explorar", active: true, onClick: () => modeExplore() },
      { html: "🎯 Reto 3D", onClick: () => modeReto() },
      { html: "🏷️ Etiquetas", active: labelsOn, onClick: (b) => { setLabels(!labelsOn); b.classList.toggle("active", labelsOn); } },
      { html: "🔄 Girar", active: autoRotate, onClick: (b) => { autoRotate = !autoRotate; b.classList.toggle("active", autoRotate); } },
      { html: "⟲ Vista", onClick: () => frameHome(true) }
    ]);
    ui.append(el("div", "v3d-hint v3d-mode", "☝️ Arrastra para girar · 🤏 pellizca o rueda para zoom · toca los puntos dorados"));
    onHotspot = (h) => {
      select(h);
      showInfo(h);
      const wp = new THREE.Vector3();
      h.g.getWorldPosition(wp);
      const dir = camera.position.clone().sub(controls.target).normalize();
      tweenTo(wp.clone().add(dir.multiplyScalar(homeDist * 0.55)), wp, 1.1);
    };
  }

  // ----- Reto -----
  function modeReto() {
    clearUI();
    mode = "reto";
    setLabels(false);
    const order = hotspots.slice().sort(() => Math.random() - 0.5);
    reto = { order, i: 0, pts: 0, tries: 0 };
    toolbar([
      { html: "🔍 Explorar", onClick: () => modeExplore() },
      { html: "🎯 Reto 3D", active: true, onClick: () => modeReto() },
      { html: "⟲ Vista", onClick: () => frameHome(true) }
    ]);
    const prompt = el("div", "v3d-prompt v3d-mode", "");
    ui.append(prompt);
    const next = () => {
      if (reto.i >= order.length) {
        const score = Math.round((reto.pts / order.length) * 100);
        prompt.innerHTML = `<strong>🏁 Reto completado: ${score}%</strong><small>${reto.pts} de ${order.length} encontrados</small><button class="btn btn-primary btn-sm">Repetir</button>`;
        prompt.querySelector("button").onclick = () => modeReto();
        if (opts.onReto) opts.onReto(score);
        onHotspot = null;
        return;
      }
      reto.tries = 0;
      prompt.innerHTML = `<small>Punto ${reto.i + 1} de ${order.length}</small><strong>Encuentra: ${order[reto.i].d.label}</strong>`;
    };
    onHotspot = (h) => {
      const target = order[reto.i];
      if (h === target) {
        reto.pts += reto.tries === 0 ? 1 : 0.5;
        h.revealed = true;
        h.label.visible = true;
        colorHs(h, "#2e9d5b");
        beep(true);
        reto.i++;
        next();
      } else if (!h.revealed) {
        reto.tries++;
        beep(false);
        colorHs(h, "#d64545");
        setTimeout(() => { if (!h.revealed) colorHs(h, SAND); }, 600);
        if (reto.tries >= 2) {
          target.revealed = true;
          target.label.visible = true;
          colorHs(target, "#e0b020");
          reto.i++;
          setTimeout(next, 700);
        }
      }
    };
    next();
  }

  // ----- Cine -----
  function modeCine() {
    clearUI();
    mode = "cine";
    container.classList.add("cine-on");
    setLabels(false);
    const bars = el("div", "v3d-letterbox v3d-mode", "<i></i><i></i>");
    const sub = el("div", "v3d-sub v3d-mode", "");
    const title = el("div", "v3d-cine-title v3d-mode", `<small>Martin´s Capacitaciones presenta</small><strong>${course.nombre}</strong>`);
    ui.append(bars, title, sub);
    cine = { i: -1, playing: true, narr: true, timer: 0, waitUntil: 0, speaking: false, done: false };
    const bar = toolbar([
      { html: "⏸", title: "Pausa", onClick: (b) => { cine.playing = !cine.playing; b.textContent = cine.playing ? "⏸" : "▶"; if (!cine.playing) stopSpeak(); else cineStep(0); } },
      { html: "⏮", title: "Anterior", onClick: () => cineStep(-1) },
      { html: "⏭", title: "Siguiente", onClick: () => cineStep(1) },
      { html: "🔊", title: "Narración", active: true, onClick: (b) => { cine.narr = !cine.narr; b.classList.toggle("active", cine.narr); if (!cine.narr) stopSpeak(); } },
      { html: "⟲", title: "Reiniciar", onClick: () => modeCine() }
    ]);
    bar.classList.add("cine-bar");
    controls.enabled = false;
    // plano general de apertura
    const startDir = camDir.clone().applyAxisAngle(V(0, 1, 0), -0.9);
    camera.position.copy(S.focus.clone().add(startDir.multiplyScalar(homeDist * 1.25)));
    controls.target.copy(S.focus);
    tweenTo(S.focus.clone().add(camDir.clone().multiplyScalar(homeDist)), S.focus.clone(), 3.5);
    if (cine.narr) speak(`${course.nombre}. Recorrido cinematográfico.`);
    cine.waitUntil = performance.now() + 4200;
    cine.sub = sub;
    cine.title = title;
  }

  function cineStep(delta) {
    if (!cine) return;
    stopSpeak();
    if (delta !== 0) cine.i += delta;
    if (cine.i < 0) cine.i = 0;
    cine.title.hidden = true;
    if (cine.i >= hotspots.length) {
      cine.done = true;
      cine.sub.innerHTML = `<strong>Fin del recorrido</strong><span>Prueba ahora el modo 3D o la evaluación del curso.</span>`;
      hotspots.forEach((h) => { h.label.visible = false; colorHs(h, SAND); });
      tweenTo(S.focus.clone().add(camDir.clone().multiplyScalar(homeDist)), S.focus.clone(), 2.5);
      if (opts.onCine) opts.onCine();
      return;
    }
    cine.done = false;
    const h = hotspots[cine.i];
    hotspots.forEach((x) => { x.label.visible = x === h; colorHs(x, x === h ? "#ffffff" : SAND); });
    const wp = new THREE.Vector3();
    h.g.getWorldPosition(wp);
    const out = wp.clone().sub(V(S.focus.x, wp.y, S.focus.z));
    out.y = 0;
    let dir = camDir.clone();
    if (out.length() > 1e-3) dir = out.normalize().multiplyScalar(0.75).add(camDir.clone().multiplyScalar(0.55)).normalize();
    dir.y = Math.max(dir.y, 0.15);
    dir.normalize();
    tweenTo(wp.clone().add(dir.multiplyScalar(homeDist * 0.5)), wp, 2.2);
    cine.sub.innerHTML = `<strong>${h.d.label}</strong><span>${h.d.info}</span>`;
    cine.speaking = true;
    const words = h.d.info.split(" ").length;
    cine.waitUntil = performance.now() + Math.max(5500, words * 420 + 2500);
    if (cine.narr) {
      setTimeout(() => {
        if (!cine || hotspots[cine.i] !== h) return;
        speak(`${h.d.label}. ${h.d.info}`, () => { if (cine && hotspots[cine.i] === h) cine.waitUntil = Math.min(cine.waitUntil, performance.now() + 1200); });
      }, 900);
    }
  }

  function updateCine(now) {
    if (!cine || !cine.playing || cine.done) return;
    if (now > cine.waitUntil) cineStep(1);
  }

  // ----- Sonido simple -----
  let actx = null;
  function beep(ok) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.frequency.value = ok ? 880 : 220;
      o.type = ok ? "sine" : "square";
      g.gain.setValueAtTime(0.12, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.18);
      o.connect(g).connect(actx.destination);
      o.start();
      o.stop(actx.currentTime + 0.2);
    } catch (e) { /* sin audio */ }
  }

  // ===================================================================
  // XR: VR / AR / Cardboard
  // ===================================================================
  let room = null;
  function ensureRoom() {
    if (room) return room;
    room = new THREE.Group();
    const floor = new THREE.Mesh(new THREE.CircleGeometry(6, 48), std("#d8cfc4", { roughness: 0.9 }));
    floor.rotation.x = -Math.PI / 2;
    room.add(floor);
    const grid = new THREE.GridHelper(12, 24, 0xc6ae96, 0xe2d8cc);
    grid.position.y = 0.002;
    room.add(grid);
    const wallMat = std("#f4efe9", { side: THREE.BackSide });
    const walls = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 4, 48, 1, true), wallMat);
    walls.position.y = 2;
    room.add(walls);
    const logoTex = new THREE.CanvasTexture(textCanvas(["MARTIN´S", "CAPACITACIONES"], { w: 1024, h: 300, size: 100, bg: NAVY, border: SAND }));
    logoTex.colorSpace = THREE.SRGBColorSpace;
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.6), new THREE.MeshBasicMaterial({ map: logoTex }));
    logo.position.set(0, 2.6, -5.9);
    room.add(logo);
    room.visible = false;
    scene.add(room);
    return room;
  }

  const saved = { pos: new THREE.Vector3(), scale: 1 };
  function placeWorld(cfg) {
    saved.pos.copy(world.position);
    saved.scale = world.scale.x;
    world.scale.setScalar(cfg.s);
    world.position.set(cfg.p[0], cfg.p[1], cfg.p[2]);
  }
  function restoreWorld() {
    world.position.copy(saved.pos);
    world.scale.setScalar(saved.scale);
    world.visible = true;
  }

  // Controladores VR / toques AR
  const controllers = [];
  const xrRay = new THREE.Raycaster();
  const tmpM = new THREE.Matrix4();
  function setupControllers() {
    for (let i = 0; i < 2; i++) {
      const c = renderer.xr.getController(i);
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([V(0, 0, 0), V(0, 0, -1)]), new THREE.LineBasicMaterial({ color: SAND }));
      line.scale.z = 4;
      line.name = "ray";
      c.add(line);
      c.addEventListener("select", () => onXRSelect(c));
      c.addEventListener("connected", (e) => { line.visible = e.data && e.data.targetRayMode === "tracked-pointer"; });
      scene.add(c);
      controllers.push(c);
    }
  }
  function onXRSelect(c) {
    if (arState && !arState.placed) {
      if (arState.reticle.visible) {
        world.position.setFromMatrixPosition(arState.reticle.matrix);
        world.position.y -= 0;
        world.visible = true;
        arState.placed = true;
        arMsg("Toca los puntos dorados para ver la información. Usa «Recolocar» para moverlo.");
      }
      return;
    }
    tmpM.identity().extractRotation(c.matrixWorld);
    xrRay.ray.origin.setFromMatrixPosition(c.matrixWorld);
    xrRay.ray.direction.set(0, 0, -1).applyMatrix4(tmpM);
    const hits = xrRay.intersectObjects(hitMeshes, false);
    if (hits.length) {
      const h = hits[0].object.userData.h;
      select(h);
      h.label.visible = true;
      if (arState) arMsg(`<strong>${h.d.label}</strong><br>${h.d.info}`);
      else showPanel3D(h);
      speak(`${h.d.label}. ${h.d.info}`);
    } else {
      hidePanel3D();
    }
  }

  let arState = null;
  let xrOverlay = null;
  function arMsg(html) { if (xrOverlay) xrOverlay.querySelector(".xr-msg").innerHTML = html; }

  async function enterVR() {
    if (!navigator.xr) throw new Error("WebXR no disponible");
    const session = await navigator.xr.requestSession("immersive-vr", { optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"] });
    const floor = !session.enabledFeatures || session.enabledFeatures.includes("local-floor");
    renderer.xr.setReferenceSpaceType(floor ? "local-floor" : "local");
    if (!controllers.length) setupControllers();
    ensureRoom().visible = true;
    scene.background = new THREE.Color("#efe8df");
    const cfg = { ...S.xr.vr, p: S.xr.vr.p.slice() };
    if (!floor) cfg.p[1] -= 1.5;
    placeWorld(cfg);
    setLabels(true);
    await renderer.xr.setSession(session);
    session.addEventListener("end", onXREnd);
  }

  async function enterAR() {
    if (!navigator.xr) throw new Error("WebXR no disponible");
    xrOverlay = document.createElement("div");
    xrOverlay.className = "xr-overlay";
    xrOverlay.innerHTML = `<div class="xr-top"><button class="btn btn-secondary btn-sm xr-replace">📍 Recolocar</button><button class="btn btn-primary btn-sm xr-exit">✕ Salir de AR</button></div><div class="xr-msg">Mueve el celular lentamente apuntando a una mesa o al piso y toca la pantalla cuando aparezca el anillo.</div>`;
    document.body.append(xrOverlay);
    let session;
    try {
      session = await navigator.xr.requestSession("immersive-ar", { optionalFeatures: ["hit-test", "dom-overlay", "local-floor"], domOverlay: { root: xrOverlay } });
    } catch (e) {
      xrOverlay.remove();
      xrOverlay = null;
      throw e;
    }
    renderer.xr.setReferenceSpaceType("local");
    if (!controllers.length) setupControllers();
    controllers.forEach((c) => { const r = c.getObjectByName("ray"); if (r) r.visible = false; });
    scene.background = null;
    const reticle = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.08, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: SAND }));
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
    arState = { reticle, placed: false, source: null };
    placeWorld({ s: S.xr.ar.s, p: [0, -0.5, -1] });
    // Ajustar para que la base del modelo quede sobre la superficie
    world.position.y = -0.5;
    setLabels(true);
    await renderer.xr.setSession(session);
    session.addEventListener("end", onXREnd);
    xrOverlay.querySelector(".xr-exit").onclick = () => session.end();
    xrOverlay.querySelector(".xr-replace").onclick = (e) => { e.stopPropagation(); arState.placed = false; world.visible = false; arMsg("Apunta a una superficie y toca para colocar el modelo."); };
    xrOverlay.addEventListener("beforexrselect", (e) => { if (e.target.closest("button")) e.preventDefault(); });
    const enabled = session.enabledFeatures;
    if (!enabled || enabled.includes("hit-test")) {
      try {
        const viewer = await session.requestReferenceSpace("viewer");
        arState.source = await session.requestHitTestSource({ space: viewer });
        world.visible = false;
      } catch (e) { arState.placed = true; }
    } else arState.placed = true;
    if (arState.placed) arMsg("Modelo colocado frente a ti. Toca los puntos dorados.");
  }

  function onXREnd() {
    hidePanel3D();
    if (room) room.visible = false;
    scene.background = bgTex;
    if (arState) {
      if (arState.source) arState.source.cancel();
      scene.remove(arState.reticle);
      arState = null;
    }
    if (xrOverlay) { xrOverlay.remove(); xrOverlay = null; }
    restoreWorld();
    setLabels(labelsOn);
    resize();
    frameHome(false);
  }

  // ----- Cardboard (estereoscópico + giroscopio) -----
  let stereo = null;
  let cardboard = null;
  function quatFromDevice(alpha, beta, gamma, orient, out) {
    const euler = new THREE.Euler(beta, alpha, -gamma, "YXZ");
    out.setFromEuler(euler);
    out.multiply(new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)));
    out.multiply(new THREE.Quaternion().setFromAxisAngle(V(0, 0, 1), -orient));
  }

  async function enterCardboard() {
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      try { await DeviceOrientationEvent.requestPermission(); } catch (e) { /* denegado: se usa arrastre */ }
    }
    stereo = stereo || new StereoEffect(renderer);
    stereo.setEyeSeparation(0.064 * Math.max(0.3, homeDist / 2.5));
    cardboard = { dev: null, alpha0: null, yaw: 0, pitch: 0, gazeH: null, gazeT: 0, drag: null };
    container.classList.add("cardboard-on");
    clearUI();
    setLabels(true);
    controls.enabled = false;
    const flat = V(camDir.x, 0, camDir.z);
    if (flat.lengthSq() < 1e-4) flat.set(0, 0, 1);
    flat.normalize();
    const lift = camDir.y / Math.hypot(camDir.x, camDir.z, camDir.y) * homeDist * 0.6;
    camera.position.copy(S.focus).addScaledVector(flat, homeDist).add(V(0, lift, 0));
    cardboard.baseYaw = Math.atan2(flat.x, flat.z);
    cardboard.yaw = cardboard.baseYaw;
    cardboard.pitch = -Math.atan2(lift, homeDist);
    camera.rotation.set(cardboard.pitch, cardboard.yaw, 0, "YXZ");
    const ret = new THREE.Group();
    const ringBg = new THREE.Mesh(new THREE.RingGeometry(0.008, 0.012, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true, opacity: 0.85 }));
    const ringFg = new THREE.Mesh(new THREE.RingGeometry(0.012, 0.017, 32, 1, 0, 0.001), new THREE.MeshBasicMaterial({ color: SAND, depthTest: false }));
    ringBg.renderOrder = ringFg.renderOrder = 50;
    ret.add(ringBg, ringFg);
    ret.position.z = -0.5;
    camera.add(ret);
    cardboard.ret = ret;
    cardboard.ringFg = ringFg;
    const exit = el("button", "v3d-cb-exit", "✕ Salir de Cardboard");
    exit.onclick = exitCardboard;
    ui.append(exit);
    cardboard.exit = exit;
    cardboard.onOrient = (e) => {
      if (e.alpha == null) return;
      if (cardboard.alpha0 == null) cardboard.alpha0 = e.alpha;
      cardboard.dev = e;
    };
    window.addEventListener("deviceorientation", cardboard.onOrient);
    cardboard.pd = (e) => { cardboard.drag = { x: e.clientX, y: e.clientY, yaw: cardboard.yaw, pitch: cardboard.pitch }; };
    cardboard.pm = (e) => {
      if (!cardboard.drag) return;
      cardboard.yaw = cardboard.drag.yaw - (e.clientX - cardboard.drag.x) * 0.005;
      cardboard.pitch = THREE.MathUtils.clamp(cardboard.drag.pitch - (e.clientY - cardboard.drag.y) * 0.005, -1.4, 1.4);
    };
    cardboard.pu = () => { cardboard.drag = null; };
    renderer.domElement.addEventListener("pointerdown", cardboard.pd);
    window.addEventListener("pointermove", cardboard.pm);
    window.addEventListener("pointerup", cardboard.pu);
    try { await container.requestFullscreen?.(); } catch (e) { /* sin pantalla completa */ }
    try { await screen.orientation?.lock?.("landscape"); } catch (e) { /* sin bloqueo */ }
    resize();
  }

  function exitCardboard() {
    if (!cardboard) return;
    window.removeEventListener("deviceorientation", cardboard.onOrient);
    renderer.domElement.removeEventListener("pointerdown", cardboard.pd);
    window.removeEventListener("pointermove", cardboard.pm);
    window.removeEventListener("pointerup", cardboard.pu);
    camera.remove(cardboard.ret);
    cardboard.exit.remove();
    cardboard = null;
    container.classList.remove("cardboard-on");
    hidePanel3D();
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { /* nada */ }
    try { screen.orientation?.unlock?.(); } catch (e) { /* nada */ }
    controls.enabled = true;
    resize();
    frameHome(false);
    setMode(mode === "xr" ? "xr" : "explore");
  }

  const qTmp = new THREE.Quaternion();
  function updateCardboard(now) {
    if (cardboard.dev) {
      const d = THREE.MathUtils.degToRad;
      const orient = d((screen.orientation && screen.orientation.angle) || window.orientation || 0);
      quatFromDevice(d(cardboard.dev.alpha - cardboard.alpha0), d(cardboard.dev.beta), d(cardboard.dev.gamma), orient, qTmp);
      camera.quaternion.copy(qTmp).premultiply(new THREE.Quaternion().setFromAxisAngle(V(0, 1, 0), cardboard.baseYaw));
    } else {
      camera.rotation.set(cardboard.pitch, cardboard.yaw, 0, "YXZ");
    }
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const hits = raycaster.intersectObjects(hitMeshes, false);
    const h = hits.length ? hits[0].object.userData.h : null;
    if (h !== cardboard.gazeH) { cardboard.gazeH = h; cardboard.gazeT = now; }
    const prog = h ? Math.min(1, (now - cardboard.gazeT) / 1500) : 0;
    const fg = cardboard.ringFg;
    fg.geometry.dispose();
    fg.geometry = new THREE.RingGeometry(0.012, 0.017, 32, 1, Math.PI / 2, Math.max(0.001, prog * Math.PI * 2));
    if (h && prog >= 1 && cardboard.shown !== h) {
      cardboard.shown = h;
      select(h);
      showPanel3D(h);
      speak(`${h.d.label}. ${h.d.info}`);
    }
    if (!h && prog === 0 && cardboard.shown && now - cardboard.gazeT > 2500) { cardboard.shown = null; }
  }

  // ----- Panel de opciones XR (pestaña VR/XR) -----
  function modeXR() {
    clearUI();
    mode = "xr";
    autoRotate = true;
    const pnl = el("div", "v3d-xr v3d-mode", `
      <h3>🥽 Realidad virtual y aumentada</h3>
      <p class="muted">Elige cómo quieres vivir este curso:</p>
      <button class="xr-opt" data-k="vr"><span>🥽</span><div><strong>Entrar en VR</strong><small>Visores Meta Quest, Pico, Vision Pro o celular compatible con WebXR. Usa los mandos para señalar los puntos.</small></div></button>
      <button class="xr-opt" data-k="ar"><span>📱</span><div><strong>Ver en AR</strong><small>Coloca el modelo sobre tu mesa o el piso con la cámara del celular (Android con Chrome).</small></div></button>
      <button class="xr-opt" data-k="cb"><span>📦</span><div><strong>Modo Cardboard</strong><small>Pantalla dividida para gafas VR de cartón. Gira la cabeza y mira un punto 1,5 s para seleccionarlo. Funciona en cualquier celular.</small></div></button>
      <p class="xr-status muted">Comprobando compatibilidad del dispositivo…</p>`);
    ui.append(pnl);
    const status = pnl.querySelector(".xr-status");
    const btn = (k) => pnl.querySelector(`[data-k="${k}"]`);
    xrSupport().then((sup) => {
      if (!alive) return;
      btn("vr").disabled = !sup.vr;
      btn("ar").disabled = !sup.ar;
      const notes = [];
      if (!window.isSecureContext) notes.push("VR/AR requieren abrir el simulador desde una dirección https.");
      if (!sup.vr) notes.push("Este dispositivo no admite VR inmersiva (WebXR).");
      if (!sup.ar) notes.push("AR no disponible aquí: usa Chrome en un Android compatible con ARCore.");
      notes.push("El modo Cardboard está disponible en todos los dispositivos.");
      status.textContent = notes.join(" ");
    });
    const fail = (e) => { status.textContent = `No se pudo iniciar: ${e && e.message ? e.message : e}`; };
    btn("vr").onclick = () => enterVR().catch(fail);
    btn("ar").onclick = () => enterAR().catch(fail);
    btn("cb").onclick = () => enterCardboard().catch(fail);
    const tg = el("button", "v3d-xr-toggle v3d-mode", "▾ Ocultar panel");
    tg.onclick = () => { pnl.classList.toggle("collapsed"); tg.textContent = pnl.classList.contains("collapsed") ? "▴ Opciones VR/AR" : "▾ Ocultar panel"; };
    ui.append(tg);
    onHotspot = (h) => { select(h); showInfo(h); };
  }

  function setMode(m) {
    autoRotate = false;
    if (m === "cine") modeCine();
    else if (m === "xr") modeXR();
    else modeExplore();
  }

  // ===================================================================
  // Bucle de render
  // ===================================================================
  const clock = new THREE.Clock();
  let rot = 0;
  function loop() {
    const now = performance.now();
    const t = clock.getElapsedTime();
    if (S.animate) S.animate(t, mode);
    const pulse = 1 + 0.18 * Math.sin(t * 4);
    hotspots.forEach((h) => h.ring.scale.setScalar(pulse));

    if (renderer.xr.isPresenting) {
      if (arState && arState.source && !arState.placed) {
        const frame = renderer.xr.getFrame();
        const ref = renderer.xr.getReferenceSpace();
        const res = frame && ref ? frame.getHitTestResults(arState.source) : [];
        if (res.length) {
          const pose = res[0].getPose(ref);
          arState.reticle.visible = true;
          arState.reticle.matrix.fromArray(pose.transform.matrix);
        } else arState.reticle.visible = false;
      }
      if (panel3d) panel3d.lookAt(renderer.xr.getCamera().getWorldPosition(new THREE.Vector3()));
      renderer.render(scene, camera);
      return;
    }

    if (cardboard) {
      updateCardboard(now);
      stereo.render(scene, camera);
      return;
    }

    if (tween) {
      const k = Math.min(1, (now - tween.start) / tween.dur);
      const e = ease(k);
      camera.position.lerpVectors(tween.p0, tween.p1, e);
      controls.target.lerpVectors(tween.t0, tween.t1, e);
      if (k >= 1) tween = null;
    } else if (autoRotate && mode !== "cine") {
      rot = 0.004;
      const off = camera.position.clone().sub(controls.target).applyAxisAngle(V(0, 1, 0), rot);
      camera.position.copy(controls.target).add(off);
    }
    if (mode === "cine") updateCine(now);
    if (controls.enabled) controls.update();
    else camera.lookAt(controls.target);
    renderer.render(scene, camera);
  }

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    n.className = cls;
    n.innerHTML = html;
    return n;
  }

  alive = true;
  resize();
  frameHome(false);
  setMode(opts.mode || "explore");
  renderer.setAnimationLoop(loop);

  return {
    setMode,
    destroy() {
      alive = false;
      stopSpeak();
      if (cardboard) exitCardboard();
      const s = renderer.xr.getSession && renderer.xr.getSession();
      if (s) s.end().catch(() => {});
      renderer.setAnimationLoop(null);
      ro.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
      bgTex.dispose();
      controls.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      container.replaceChildren();
      container.classList.remove("v3d", "cine-on", "cardboard-on");
    }
  };
}
