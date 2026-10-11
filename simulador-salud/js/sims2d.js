/* Martin´s Capacitaciones · Motores de práctica 2D.
   Sims2D.run(practica, contenedor, ctx) monta la práctica y devuelve una
   función de limpieza. ctx.finish(puntaje 0–100, resumen) se llama al terminar. */

const Sims2D = (function () {
  "use strict";

  // ===== Utilidades =====
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (k === "class") el.className = v;
        else if (k === "html") el.innerHTML = v;
        else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
        else if (v !== false && v != null) el.setAttribute(k, v);
      }
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c.nodeType ? c : document.createTextNode(c));
    }
    return el;
  }

  const SVGNS = "http://www.w3.org/2000/svg";
  function s(tag, attrs) {
    const el = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
    return el;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const rnd = (a, b) => a + Math.random() * (b - a);
  const rint = (a, b) => Math.floor(rnd(a, b + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const fmt = (n, d = 2) => Number(n.toFixed(d)).toLocaleString("es-EC", { maximumFractionDigits: d });

  function vibrate(ms) {
    try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* sin vibración */ }
  }

  // Sonidos cortos de acierto/error con WebAudio (sin archivos externos).
  let audioCtx = null;
  function tone(freq, dur = 0.12, type = "sine", vol = 0.15) {
    if (!api.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      o.connect(g).connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + dur);
    } catch (e) { /* audio no disponible */ }
  }
  const sfx = {
    ok() { tone(660, 0.1); setTimeout(() => tone(880, 0.14), 90); },
    bad() { tone(200, 0.22, "square", 0.08); vibrate(120); },
    click() { tone(1200, 0.03, "square", 0.06); }
  };

  function progressBar(cur, total) {
    const wrap = h("div", { class: "sim-progress", "aria-hidden": "true" });
    const bar = h("div", { class: "sim-progress-bar" });
    bar.style.width = `${(cur / total) * 100}%`;
    wrap.append(bar);
    return wrap;
  }

  // ===================================================================
  // SECUENCIA: tocar los pasos en el orden correcto
  // ===================================================================
  function secuencia(p, el, ctx) {
    const pasos = p.pasos;
    let next = 0;
    let errores = 0;

    const ordered = h("ol", { class: "seq-ordered" });
    const pool = h("div", { class: "seq-pool" });
    const msg = h("p", { class: "sim-feedback", role: "status", "aria-live": "polite" }, "Toca el primer paso del procedimiento.");
    const counter = h("span", { class: "chip" }, `Paso 1 de ${pasos.length}`);

    shuffle(pasos.map((t, i) => ({ t, i }))).forEach(({ t, i }) => {
      const b = h("button", { class: "seq-item", type: "button" }, t);
      b.addEventListener("click", () => {
        if (i === next) {
          sfx.ok();
          b.remove();
          ordered.append(h("li", { class: "seq-done" }, t));
          next++;
          counter.textContent = `Paso ${Math.min(next + 1, pasos.length)} de ${pasos.length}`;
          msg.textContent = next < pasos.length ? "¡Correcto! ¿Cuál sigue?" : "¡Secuencia completa!";
          msg.className = "sim-feedback ok";
          if (next === pasos.length) {
            const score = Math.round((100 * pasos.length) / (pasos.length + errores));
            setTimeout(() => ctx.finish(score, `${errores} error(es) en ${pasos.length} pasos.`), 700);
          }
        } else {
          sfx.bad();
          errores++;
          b.classList.remove("shake");
          void b.offsetWidth;
          b.classList.add("shake");
          msg.textContent = `Ese no es el paso ${next + 1}. Piensa qué debe hacerse antes.`;
          msg.className = "sim-feedback bad";
        }
      });
      pool.append(b);
    });

    el.append(
      h("div", { class: "sim-head" }, counter, h("span", { class: "chip chip-soft" }, "Toca en orden")),
      msg,
      h("div", { class: "seq-layout" },
        h("div", null, h("h4", null, "Pasos disponibles"), pool),
        h("div", null, h("h4", null, "Tu procedimiento"), ordered)
      )
    );
  }

  // ===================================================================
  // FIGURAS SVG para la práctica "objetivo"
  // ===================================================================
  const SKIN = "var(--skin)";
  const SKIN_STROKE = "var(--skin-stroke)";

  function limb(svg, x1, y1, x2, y2, w) {
    svg.append(s("line", { x1, y1, x2, y2, stroke: SKIN_STROKE, "stroke-width": w + 3, "stroke-linecap": "round" }));
    svg.append(s("line", { x1, y1, x2, y2, stroke: SKIN, "stroke-width": w, "stroke-linecap": "round" }));
  }

  function figCuerpo(back) {
    const svg = s("svg", { viewBox: "0 0 200 420", class: "fig-svg", role: "img", "aria-label": back ? "Figura humana, vista posterior" : "Figura humana, vista anterior" });
    [1, -1].forEach((side) => {
      const X = (x) => (side === 1 ? x : 200 - x);
      limb(svg, X(58), 86, X(48), 150, 22);
      limb(svg, X(48), 150, X(38), 226, 17);
      svg.append(s("ellipse", { cx: X(36), cy: 244, rx: 10, ry: 15, fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
      limb(svg, X(82), 222, X(82), 320, 34);
      limb(svg, X(82), 320, X(82), 400, 24);
      svg.append(s("ellipse", { cx: X(back ? 82 : 80), cy: 408, rx: 12, ry: 7, fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    });
    svg.append(s("rect", { x: 89, y: 58, width: 22, height: 18, fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    svg.append(s("path", { d: "M58,80 Q100,70 142,80 L148,140 Q142,190 140,218 Q100,236 60,218 Q58,190 52,140 Z", fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    svg.append(s("circle", { cx: 100, cy: 38, r: 24, fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    const det = { fill: "none", stroke: SKIN_STROKE, "stroke-width": 1.2, opacity: 0.6 };
    if (back) {
      svg.append(s("line", { x1: 100, y1: 78, x2: 100, y2: 210, ...det, "stroke-dasharray": "3 4" }));
      svg.append(s("path", { d: "M70,90 Q78,112 90,104 M130,90 Q122,112 110,104", ...det }));
      svg.append(s("path", { d: "M100,212 Q82,236 66,224 M100,212 Q118,236 134,224", ...det }));
    } else {
      svg.append(s("path", { d: "M80,104 Q90,112 98,106 M120,104 Q110,112 102,106", ...det }));
      svg.append(s("circle", { cx: 100, cy: 182, r: 2, fill: SKIN_STROKE, opacity: 0.6 }));
      svg.append(s("path", { d: "M90,30 Q92,32 94,30 M106,30 Q108,32 110,30 M94,48 Q100,52 106,48", ...det }));
    }
    const t1 = s("text", { x: 8, y: 14, class: "fig-label" });
    t1.textContent = back ? "Izq." : "Der.";
    const t2 = s("text", { x: 192, y: 14, class: "fig-label", "text-anchor": "end" });
    t2.textContent = back ? "Der." : "Izq.";
    const t3 = s("text", { x: 100, y: 418, class: "fig-label", "text-anchor": "middle" });
    t3.textContent = back ? "Vista posterior" : "Vista anterior";
    svg.append(t1, t2, t3);
    return svg;
  }

  function figBrazo() {
    const svg = s("svg", { viewBox: "0 0 200 420", class: "fig-svg", role: "img", "aria-label": "Brazo derecho, cara anterior" });
    svg.append(s("path", { d: "M58,0 L142,0 L140,140 Q138,165 134,175 L126,340 L74,340 L66,175 Q62,165 60,140 Z", fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    svg.append(s("path", { d: "M72,338 L128,338 Q140,360 136,400 Q130,420 100,420 Q70,420 66,400 Q60,375 72,338 Z", fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    svg.append(s("path", { d: "M70,350 Q46,360 44,388 Q50,394 58,388 Q62,372 72,366", fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    const vein = { fill: "none", stroke: "var(--vein)", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.75 };
    svg.append(s("path", { d: "M70,345 Q68,280 71,240 Q74,180 76,150 Q78,70 80,0", ...vein }));
    svg.append(s("path", { d: "M124,345 Q130,280 130,230 Q128,180 126,150 Q122,70 120,0", ...vein }));
    svg.append(s("path", { d: "M74,176 Q100,166 127,150", ...vein }));
    svg.append(s("path", { d: "M92,300 Q88,320 86,340", fill: "none", stroke: "#c0392b", "stroke-width": 2.5, "stroke-dasharray": "4 3", opacity: 0.7 }));
    const tl = s("text", { x: 30, y: 410, class: "fig-label" }); tl.textContent = "Pulgar";
    const tr = s("text", { x: 196, y: 14, class: "fig-label", "text-anchor": "end" }); tr.textContent = "Brazo derecho · cara anterior";
    const tc = s("text", { x: 150, y: 170, class: "fig-label" }); tc.textContent = "Codo";
    svg.append(tl, tr, tc);
    return svg;
  }

  function figTorax() {
    const svg = s("svg", { viewBox: "0 0 200 200", class: "fig-svg", role: "img", "aria-label": "Tórax anterior con costillas" });
    svg.append(s("path", { d: "M20,20 Q100,6 180,20 L186,150 Q180,190 170,200 L30,200 Q20,190 14,150 Z", fill: SKIN, stroke: SKIN_STROKE, "stroke-width": 1.5 }));
    for (let k = 1; k <= 8; k++) {
      const y0 = 26 + 14 * k;
      [1, -1].forEach((sd) => {
        svg.append(s("path", { d: `M${100 + sd * 6},${y0} Q${100 + sd * 40},${y0 - 2} ${100 + sd * 76},${y0 + 20}`, fill: "none", stroke: SKIN_STROKE, "stroke-width": 1.4, opacity: 0.55 }));
      });
    }
    svg.append(s("rect", { x: 94, y: 28, width: 12, height: 100, rx: 5, fill: "var(--bone)", stroke: SKIN_STROKE, "stroke-width": 1 }));
    svg.append(s("path", { d: "M100,28 Q70,18 36,24 M100,28 Q130,18 164,24", fill: "none", stroke: SKIN_STROKE, "stroke-width": 3, "stroke-linecap": "round", opacity: 0.7 }));
    const dash = { stroke: "var(--brand-sand)", "stroke-width": 1, "stroke-dasharray": "3 3" };
    [[132, "LMC"], [148, "LAA"], [164, "LAM"]].forEach(([x, t]) => {
      svg.append(s("line", { x1: x, y1: 24, x2: x, y2: 196, ...dash }));
      const tx = s("text", { x, y: 196, "text-anchor": "middle", class: "fig-label small" });
      tx.textContent = t;
      svg.append(tx);
    });
    svg.append(s("circle", { cx: 86, cy: 116, r: 3, fill: SKIN_STROKE, opacity: 0.5 }));
    svg.append(s("circle", { cx: 128, cy: 116, r: 3, fill: SKIN_STROKE, opacity: 0.5 }));
    const t1 = s("text", { x: 8, y: 14, class: "fig-label" }); t1.textContent = "Der.";
    const t2 = s("text", { x: 192, y: 14, class: "fig-label", "text-anchor": "end" }); t2.textContent = "Izq.";
    svg.append(t1, t2);
    return svg;
  }

  // Arcada dental en vista oclusal, numeración FDI.
  function dentalLayout() {
    const teeth = [];
    const quads = [
      { q: 1, upper: true, side: -1 },
      { q: 2, upper: true, side: 1 },
      { q: 3, upper: false, side: 1 },
      { q: 4, upper: false, side: -1 }
    ];
    const sizes = [7, 6.2, 6.6, 6.8, 6.8, 9, 8.6, 8];
    quads.forEach(({ q, upper, side }) => {
      let acc = 0;
      for (let n = 1; n <= 8; n++) {
        acc += sizes[n - 1] * (n === 1 ? 0.5 : 1) + (n > 1 ? sizes[n - 2] * 0.5 : 0);
        const a = (acc / 112) * 1.75 * side;
        const x = 100 + 74 * Math.sin(a);
        const y = upper ? 22 + 92 * (1 - Math.cos(a)) : 300 - 92 * (1 - Math.cos(a));
        teeth.push({ num: `${q}${n}`, x, y, r: sizes[n - 1], n });
      }
    });
    return teeth;
  }

  function nombreDiente(num) {
    const q = Number(num[0]);
    const n = Number(num[1]);
    const tipos = ["", "incisivo central", "incisivo lateral", "canino", "primer premolar", "segundo premolar", "primer molar", "segundo molar", "tercer molar"];
    const cuad = { 1: "superior derecho", 2: "superior izquierdo", 3: "inferior izquierdo", 4: "inferior derecho" }[q];
    return `${tipos[n]} ${cuad}`;
  }

  function figArcada(teeth) {
    const svg = s("svg", { viewBox: "0 0 200 330", class: "fig-svg", role: "img", "aria-label": "Odontograma: arcadas superior e inferior" });
    svg.append(s("path", { d: "M14,130 Q14,6 100,6 Q186,6 186,130 L160,130 Q160,36 100,36 Q40,36 40,130 Z", fill: "var(--gum)", opacity: 0.55 }));
    svg.append(s("path", { d: "M14,190 Q14,320 100,320 Q186,320 186,190 L160,190 Q160,290 100,290 Q40,290 40,190 Z", fill: "var(--gum)", opacity: 0.55 }));
    const g = s("g", {});
    teeth.forEach((t) => {
      const grp = s("g", { "data-num": t.num, class: "tooth" });
      const shape = t.n >= 6
        ? s("rect", { x: t.x - t.r, y: t.y - t.r * 0.85, width: t.r * 2, height: t.r * 1.7, rx: t.r * 0.45, class: "tooth-shape" })
        : s("ellipse", { cx: t.x, cy: t.y, rx: t.r * 0.95, ry: t.r * 0.8, class: "tooth-shape" });
      const label = s("text", { x: t.x, y: t.y + 2.4, "text-anchor": "middle", class: "tooth-num" });
      label.textContent = t.num;
      grp.append(shape, label);
      g.append(grp);
    });
    svg.append(g);
    svg.append(s("line", { x1: 100, y1: 4, x2: 100, y2: 326, stroke: "var(--brand-sand)", "stroke-dasharray": "2 4", "stroke-width": 0.8 }));
    const lbl = (x, y, t, a = "start") => { const e = s("text", { x, y, class: "fig-label small", "text-anchor": a }); e.textContent = t; svg.append(e); };
    lbl(4, 158, "Derecha del paciente");
    lbl(196, 158, "Izquierda", "end");
    lbl(100, 160, "Superior ↑ · Inferior ↓", "middle");
    return svg;
  }

  // ===================================================================
  // OBJETIVO: tocar la zona anatómica correcta
  // ===================================================================
  function objetivo(p, el, ctx) {
    let svg;
    let targets;
    const R = p.r || 16;
    if (p.figura === "arcada") {
      const teeth = dentalLayout();
      svg = figArcada(teeth);
      svg.classList.add("hide-nums");
      targets = shuffle(p.objetivosDientes).map((num) => {
        const t = teeth.find((x) => x.num === num);
        return { label: `Pieza ${num} · ${nombreDiente(num)}`, pts: [[t.x, t.y]], r: t.r + 2, num };
      });
    } else {
      svg = { cuerpo: () => figCuerpo(false), espalda: () => figCuerpo(true), brazo: figBrazo, torax: figTorax }[p.figura]();
      targets = shuffle(p.objetivos);
    }
    const markers = s("g", {});
    svg.append(markers);

    let idx = 0;
    let intentos = 0;
    let puntos = 0;
    const prompt = h("div", { class: "target-prompt", "aria-live": "polite" });
    const msg = h("p", { class: "sim-feedback", role: "status" });
    const prog = h("div");
    const tools = h("div", { class: "sim-head" });

    if (p.figura === "arcada") {
      const tg = h("label", { class: "switch-inline" }, h("input", { type: "checkbox" }), " Mostrar numeración");
      tg.querySelector("input").addEventListener("change", (e) => svg.classList.toggle("hide-nums", !e.target.checked));
      tools.append(tg);
    }

    function showPrompt() {
      prog.replaceChildren(progressBar(idx, targets.length));
      prompt.innerHTML = `<small>Objetivo ${idx + 1} de ${targets.length}</small><strong>Toca: ${targets[idx].label}</strong>`;
      intentos = 0;
    }

    function mark(x, y, ok, text) {
      const g = s("g", { class: ok ? "mk ok" : "mk bad" });
      g.append(s("circle", { cx: x, cy: y, r: ok ? 6 : 5 }));
      if (text) {
        const t = s("text", { x, y: y - 9, "text-anchor": "middle", class: "mk-text" });
        t.textContent = text;
        g.append(t);
      }
      markers.append(g);
      if (!ok) setTimeout(() => g.remove(), 900);
    }

    function advance() {
      idx++;
      if (idx >= targets.length) {
        const score = Math.round((puntos / targets.length) * 100);
        prog.replaceChildren(progressBar(1, 1));
        setTimeout(() => ctx.finish(score, `Ubicaste correctamente ${fmt(puntos, 1)} de ${targets.length} objetivos.`), 900);
      } else showPrompt();
    }

    svg.addEventListener("pointerdown", (e) => {
      if (idx >= targets.length) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
      const t = targets[idx];
      const r = t.r || R;
      const hit = t.pts.find(([x, y]) => Math.hypot(loc.x - x, loc.y - y) <= r);
      const short = t.num || t.label.split(" (")[0];
      if (hit) {
        sfx.ok();
        puntos += intentos === 0 ? 1 : 0.5;
        mark(hit[0], hit[1], true, short);
        msg.textContent = intentos === 0 ? "¡Exacto!" : "¡Bien, al segundo intento!";
        msg.className = "sim-feedback ok";
        advance();
      } else {
        sfx.bad();
        intentos++;
        mark(loc.x, loc.y, false);
        if (intentos >= 2) {
          const [x, y] = t.pts[0];
          mark(x, y, true, short);
          markers.lastChild.classList.add("reveal");
          msg.textContent = `Aquí se ubica: ${t.label}. Sigamos.`;
          msg.className = "sim-feedback bad";
          setTimeout(advance, 400);
        } else {
          msg.textContent = "No es ahí. Intenta otra vez.";
          msg.className = "sim-feedback bad";
        }
      }
    });

    el.append(tools, prog, prompt, msg, h("div", { class: "fig-wrap" }, svg));
    showPrompt();
  }

  // ===================================================================
  // CÁLCULO: problemas numéricos aleatorios
  // ===================================================================
  const GEN = {
    dosis() {
      const pres = pick([
        { f: "Ceftriaxona", H: 1000, V: 4 }, { f: "Gentamicina", H: 80, V: 2 }, { f: "Ketorolaco", H: 30, V: 1 },
        { f: "Dexametasona", H: 4, V: 1 }, { f: "Metoclopramida", H: 10, V: 2 }, { f: "Ampicilina", H: 500, V: 5 },
        { f: "Furosemida", H: 20, V: 2 }, { f: "Tramadol", H: 100, V: 2 }
      ]);
      const D = pres.H * pick([0.25, 0.5, 0.75, 1.5, 2]);
      const ans = (D / pres.H) * pres.V;
      return {
        q: `Prescripción: ${pres.f} ${fmt(D)} mg. Dispones de ampollas/frascos de ${pres.H} mg en ${pres.V} mL. ¿Cuántos mL administras?`,
        ans, unit: "mL", tol: 0.05,
        exp: `(${fmt(D)} ÷ ${pres.H}) × ${pres.V} = ${fmt(ans)} mL`
      };
    },
    goteo() {
      const V = pick([250, 500, 1000, 100]);
      const hr = pick([1, 2, 4, 6, 8, 12, 24]);
      const micro = Math.random() < 0.35;
      const f = micro ? 60 : 20;
      const ans = Math.round((V * f) / (hr * 60));
      return {
        q: `Pasar ${V} mL de solución en ${hr} hora(s) con ${micro ? "microgotero (60 microgotas/mL)" : "macrogotero (20 gotas/mL)"}. ¿Cuántas ${micro ? "microgotas" : "gotas"} por minuto?`,
        ans, unit: micro ? "microgotas/min" : "gotas/min", tol: 1,
        exp: `${V} × ${f} ÷ (${hr} × 60) = ${fmt((V * f) / (hr * 60), 1)} ≈ ${ans} ${micro ? "microgotas" : "gotas"}/min`
      };
    },
    pediatrica() {
      const w = rint(6, 30);
      const d = pick([
        { f: "Paracetamol", mgkg: 15, c: 160, v: 5 },
        { f: "Ibuprofeno", mgkg: 10, c: 100, v: 5 },
        { f: "Amoxicilina", mgkg: 15, c: 250, v: 5 }
      ]);
      const mg = w * d.mgkg;
      const ml = (mg * d.v) / d.c;
      return {
        q: `Niño de ${w} kg. Indicación: ${d.f} ${d.mgkg} mg/kg por dosis. Presentación: ${d.c} mg/${d.v} mL. ¿Cuántos mL por dosis?`,
        ans: ml, unit: "mL", tol: 0.15,
        exp: `${w} kg × ${d.mgkg} mg/kg = ${mg} mg → ${mg} × ${d.v} ÷ ${d.c} = ${fmt(ml, 1)} mL`
      };
    },
    jarabe() {
      if (Math.random() < 0.5) {
        const tab = pick([250, 500, 50, 100, 10, 20]);
        const D = tab * pick([0.5, 1.5, 2, 3]);
        return {
          q: `Se prescriben ${fmt(D)} mg y hay tabletas de ${tab} mg. ¿Cuántas tabletas se toman por dosis?`,
          ans: D / tab, unit: "tabletas", tol: 0.01,
          exp: `${fmt(D)} ÷ ${tab} = ${fmt(D / tab)} tabletas`
        };
      }
      const freq = pick([6, 8, 12, 24]);
      const days = pick([5, 7, 10, 14]);
      const ans = (24 / freq) * days;
      return {
        q: `Receta: 1 cápsula cada ${freq} horas durante ${days} días. ¿Cuántas cápsulas se dispensan en total?`,
        ans, unit: "cápsulas", tol: 0,
        exp: `${24 / freq} tomas al día × ${days} días = ${ans} cápsulas`
      };
    },
    conversion() {
      const c = pick([
        () => { const v = pick([0.5, 1, 1.5, 2, 0.25]); return { q: `${fmt(v)} g = ¿cuántos mg?`, ans: v * 1000, unit: "mg", exp: `${fmt(v)} × 1000 = ${v * 1000} mg` }; },
        () => { const v = pick([250, 500, 125, 750]); return { q: `${v} mg = ¿cuántos g?`, ans: v / 1000, unit: "g", exp: `${v} ÷ 1000 = ${fmt(v / 1000, 3)} g` }; },
        () => { const v = pick([0.1, 0.25, 0.5, 2]); return { q: `${fmt(v)} mg = ¿cuántos mcg?`, ans: v * 1000, unit: "mcg", exp: `${fmt(v)} × 1000 = ${v * 1000} mcg` }; },
        () => { const v = pick([1.5, 0.5, 2, 0.25]); return { q: `${fmt(v)} L = ¿cuántos mL?`, ans: v * 1000, unit: "mL", exp: `${fmt(v)} × 1000 = ${v * 1000} mL` }; },
        () => { const v = pick([5, 10, 0.9, 20]); return { q: `Una solución al ${fmt(v)} %, ¿cuántos gramos contiene en 500 mL?`, ans: v * 5, unit: "g", exp: `${fmt(v)} g/100 mL × 5 = ${fmt(v * 5)} g` }; },
        () => { const v = pick([66, 88, 110, 154]); return { q: `Un paciente pesa ${v} libras. ¿Cuántos kg son? (1 kg = 2,2 lb)`, ans: v / 2.2, unit: "kg", exp: `${v} ÷ 2,2 = ${fmt(v / 2.2, 1)} kg` }; }
      ])();
      c.tol = Math.max(Math.abs(c.ans) * 0.01, 0.001);
      return c;
    },
    dilucion() {
      const C1 = pick([10, 20, 50, 96, 70]);
      const C2 = pick([1, 2, 5]);
      const V2 = pick([100, 250, 500, 1000]);
      const ans = (C2 * V2) / C1;
      return {
        q: `Tienes una solución madre al ${C1} %. Necesitas ${V2} mL al ${C2} %. ¿Cuántos mL de solución madre usas?`,
        ans, unit: "mL", tol: Math.max(0.5, ans * 0.01),
        exp: `V₁ = C₂·V₂ ÷ C₁ = ${C2} × ${V2} ÷ ${C1} = ${fmt(ans, 1)} mL (y completas con diluyente hasta ${V2} mL)`
      };
    },
    fc_ecg() {
      const n = pick([1.5, 2, 2.5, 3, 4, 5, 6]);
      const ans = Math.round(300 / n);
      return {
        q: `En el trazado hay ${fmt(n, 1)} cuadros grandes entre dos ondas R consecutivas. ¿Cuál es la frecuencia cardíaca?`,
        ans, unit: "lpm", tol: 2, strip: n,
        exp: `300 ÷ ${fmt(n, 1)} = ${ans} lpm`
      };
    },
    imc() {
      const t = rint(150, 190) / 100;
      const w = rint(45, 115);
      const ans = w / (t * t);
      const cls = ans < 18.5 ? "bajo peso" : ans < 25 ? "normal" : ans < 30 ? "sobrepeso" : "obesidad";
      return {
        q: `Paciente de ${w} kg y ${fmt(t)} m de talla. Calcula su IMC (con un decimal).`,
        ans, unit: "kg/m²", tol: 0.2,
        exp: `${w} ÷ (${fmt(t)} × ${fmt(t)}) = ${fmt(ans, 1)} kg/m² → ${cls}`
      };
    }
  };

  function drawStrip(canvas, n) {
    const W = canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
    const H = canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
    const c = canvas.getContext("2d");
    const big = W / 15;
    c.fillStyle = "#fff6f2";
    c.fillRect(0, 0, W, H);
    for (let x = 0; x < W; x += big / 5) {
      c.strokeStyle = Math.round(x / (big / 5)) % 5 === 0 ? "rgba(220,90,90,.55)" : "rgba(220,90,90,.18)";
      c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke();
    }
    for (let y = 0; y < H; y += big / 5) {
      c.strokeStyle = Math.round(y / (big / 5)) % 5 === 0 ? "rgba(220,90,90,.55)" : "rgba(220,90,90,.18)";
      c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
    }
    c.strokeStyle = "#1a1a1a";
    c.lineWidth = Math.max(1.5, W / 400);
    c.beginPath();
    const base = H * 0.62;
    const per = n * big;
    for (let x = 0; x <= W; x++) {
      const tau = (((x - big * 0.6) % per) + per) % per / big * 0.2;
      const y = base - beatShape(tau, true) * H * 0.45;
      if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.stroke();
  }

  function calculo(p, el, ctx) {
    const gen = GEN[p.generador];
    const rondas = p.rondas || 5;
    let r = 0;
    let aciertos = 0;
    const body = h("div");
    el.append(body);

    function ronda() {
      const prob = gen();
      body.replaceChildren();
      const input = h("input", { type: "text", inputmode: "decimal", class: "calc-input", placeholder: "Tu respuesta", "aria-label": "Respuesta" });
      const fb = h("div", { class: "sim-feedback", role: "status", "aria-live": "polite" });
      const btn = h("button", { class: "btn btn-primary", type: "button" }, "Comprobar");
      let answered = false;
      function check() {
        if (answered) { r++; r < rondas ? ronda() : ctx.finish(Math.round((aciertos / rondas) * 100), `${aciertos} de ${rondas} cálculos correctos.`); return; }
        const v = parseFloat(input.value.replace(",", ".").replace(/[^\d.\-]/g, ""));
        if (Number.isNaN(v)) { fb.textContent = "Escribe un número."; fb.className = "sim-feedback bad"; return; }
        answered = true;
        const ok = Math.abs(v - prob.ans) <= prob.tol + 1e-9;
        if (ok) { aciertos++; sfx.ok(); } else sfx.bad();
        fb.className = `sim-feedback ${ok ? "ok" : "bad"}`;
        fb.innerHTML = `${ok ? "✅ ¡Correcto!" : `❌ La respuesta es <strong>${fmt(prob.ans, 2)} ${prob.unit}</strong>.`}<br><span class="exp">📐 ${prob.exp}</span>`;
        input.disabled = true;
        btn.textContent = r + 1 < rondas ? "Siguiente ➡️" : "Ver resultado";
      }
      btn.addEventListener("click", check);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
      body.append(
        h("div", { class: "sim-head" }, h("span", { class: "chip" }, `Ejercicio ${r + 1} de ${rondas}`), h("span", { class: "chip chip-soft" }, `✅ ${aciertos}`)),
        progressBar(r, rondas),
        h("p", { class: "calc-q" }, prob.q)
      );
      if (prob.strip) {
        const cv = h("canvas", { class: "ecg-strip", "aria-label": "Tira de electrocardiograma" });
        body.append(cv);
        requestAnimationFrame(() => drawStrip(cv, prob.strip));
      }
      body.append(h("div", { class: "calc-row" }, input, h("span", { class: "calc-unit" }, prob.unit), btn), fb);
      input.focus({ preventScroll: true });
    }
    ronda();
  }

  // ===================================================================
  // MONITOR (signos vitales y ritmos de ECG)
  // ===================================================================
  function gauss(t, mu, sd) { return Math.exp(-((t - mu) * (t - mu)) / (2 * sd * sd)); }
  function beatShape(tau, withP) {
    return (withP ? 0.12 * gauss(tau, 0.08, 0.022) : 0)
      - 0.1 * gauss(tau, 0.165, 0.008)
      + 1.0 * gauss(tau, 0.185, 0.009)
      - 0.25 * gauss(tau, 0.205, 0.01)
      + 0.28 * gauss(tau, 0.4, 0.045);
  }
  function plethShape(tau, rr) {
    const x = tau / rr;
    return 0.9 * gauss(x, 0.25, 0.09) + 0.35 * gauss(x, 0.55, 0.08);
  }

  const RITMOS = {
    sinusal: { nombre: "Ritmo sinusal normal", fc: () => rint(65, 95) },
    bradi: { nombre: "Bradicardia sinusal", fc: () => rint(38, 52) },
    taqui: { nombre: "Taquicardia sinusal", fc: () => rint(115, 145) },
    fa: { nombre: "Fibrilación auricular", fc: () => rint(90, 130) },
    fv: { nombre: "Fibrilación ventricular", fc: () => 0 },
    asistolia: { nombre: "Asistolia", fc: () => 0 }
  };

  function createMonitor(container) {
    const canvas = h("canvas", { class: "monitor-canvas", "aria-hidden": "true" });
    const nums = h("div", { class: "monitor-nums" });
    const wrap = h("div", { class: "monitor" }, canvas, nums);
    container.append(wrap);
    let cfg = { rhythm: "sinusal", fc: 75, spo2: 98, showPleth: true };
    let raf = 0;
    let last = performance.now();
    let simT = 0;
    let nextBeat = 0.2;
    let lastBeat = -10;
    let rr = 0.8;
    let col = 0;
    let buf1 = [];
    let buf2 = [];
    let W = 0, H = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = Math.max(200, canvas.clientWidth * dpr);
      H = canvas.height = Math.max(120, canvas.clientHeight * dpr);
      buf1 = new Array(Math.ceil(W)).fill(null);
      buf2 = new Array(Math.ceil(W)).fill(null);
      col = 0;
    }

    function ecgValue(t) {
      const r = cfg.rhythm;
      if (r === "asistolia") return 0.015 * Math.sin(t * 2.1) + 0.01 * (Math.random() - 0.5);
      if (r === "fv") return 0.45 * Math.sin(t * 2 * Math.PI * 4.6) * (0.6 + 0.4 * Math.sin(t * 1.3)) + 0.2 * Math.sin(t * 2 * Math.PI * 7.1 + 1) + 0.05 * (Math.random() - 0.5);
      if (t >= nextBeat) {
        lastBeat = nextBeat;
        if (r === "fa") rr = 60 / cfg.fc * rnd(0.6, 1.4);
        else rr = 60 / cfg.fc * rnd(0.98, 1.02);
        nextBeat = lastBeat + rr;
      }
      const tau = t - lastBeat;
      let v = beatShape(tau, r !== "fa");
      if (r === "fa") v += 0.04 * Math.sin(t * 2 * Math.PI * 6.3) + 0.03 * Math.sin(t * 2 * Math.PI * 8.7 + 2);
      return v + 0.008 * (Math.random() - 0.5);
    }

    function frame(now) {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const pps = W / 5; // 5 segundos visibles
      const steps = Math.round(dt * pps);
      for (let i = 0; i < steps; i++) {
        simT += 1 / pps;
        buf1[col] = ecgValue(simT);
        const perf = cfg.rhythm === "fv" || cfg.rhythm === "asistolia" ? 0 : 1;
        buf2[col] = perf * plethShape(simT - lastBeat, rr);
        col = (col + 1) % buf1.length;
      }
      draw();
      raf = requestAnimationFrame(frame);
    }

    function trace(buf, y0, amp, color) {
      const c = canvas.getContext("2d");
      c.strokeStyle = color;
      c.lineWidth = Math.max(1.5, W / 450);
      c.beginPath();
      let pen = false;
      for (let x = 0; x < buf.length; x++) {
        const gap = (x - col + buf.length) % buf.length;
        if (buf[x] == null || gap < 12) { pen = false; continue; }
        const y = y0 - buf[x] * amp;
        if (!pen) { c.moveTo(x, y); pen = true; } else c.lineTo(x, y);
      }
      c.stroke();
    }

    function draw() {
      const c = canvas.getContext("2d");
      c.fillStyle = "#07111f";
      c.fillRect(0, 0, W, H);
      c.strokeStyle = "rgba(80,160,140,.12)";
      c.lineWidth = 1;
      for (let x = 0; x < W; x += W / 25) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
      for (let y = 0; y < H; y += W / 25) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      const ecgY = cfg.showPleth ? H * 0.42 : H * 0.62;
      trace(buf1, ecgY, H * (cfg.showPleth ? 0.3 : 0.45), "#3dff8a");
      if (cfg.showPleth) trace(buf2, H * 0.92, H * 0.22, "#4fd2ff");
      c.fillStyle = "#3dff8a";
      c.font = `${Math.round(H * 0.07)}px Montserrat, sans-serif`;
      c.fillText("II", 8, H * 0.1);
      if (cfg.showPleth) { c.fillStyle = "#4fd2ff"; c.fillText("Pleth", 8, H * 0.66); }
    }

    function setNums(v) {
      const item = (lab, val, unit, cls, alt) => `<div class="mn ${cls}${alt ? " alarm" : ""}"><span>${lab}</span><strong>${val}</strong><small>${unit}</small></div>`;
      nums.innerHTML = [
        item("FC", v.FC, "lpm", "c-green"),
        v.PA ? item("PA", v.PA, "mmHg", "c-white") : "",
        v.SpO2 != null ? item("SpO₂", v.SpO2, "%", "c-cyan") : "",
        v.FR != null ? item("FR", v.FR, "rpm", "c-yellow") : "",
        v.T != null ? item("T°", v.T, "°C", "c-pink") : ""
      ].join("");
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(frame);

    return {
      set(c, v) { cfg = { ...cfg, ...c }; nextBeat = simT + 0.1; setNums(v); },
      destroy() { cancelAnimationFrame(raf); ro.disconnect(); }
    };
  }

  function signos(p, el, ctx) {
    const rondas = p.rondas || 6;
    let r = 0;
    let aciertos = 0;
    const head = h("div");
    const monHost = h("div");
    const q = h("p", { class: "calc-q" });
    const opts = h("div", { class: "opt-grid" });
    const fb = h("div", { class: "sim-feedback", role: "status", "aria-live": "polite" });
    const next = h("button", { class: "btn btn-primary", type: "button", hidden: true }, "Siguiente ➡️");
    el.append(head, monHost, q, opts, fb, next);
    const mon = createMonitor(monHost);

    function vitalesRonda() {
      const n = { FC: rint(64, 92), sys: rint(108, 126), dia: rint(68, 80), FR: rint(13, 18), T: rnd(36.2, 37.1), SpO2: rint(96, 99) };
      const alt = pick(["FC", "PA", "FR", "T", "SpO2"]);
      let exp = "";
      const hi = Math.random() < 0.6;
      if (alt === "FC") { n.FC = hi ? rint(112, 142) : rint(38, 50); exp = hi ? `Taquicardia: FC ${n.FC} lpm (> 100).` : `Bradicardia: FC ${n.FC} lpm (< 60).`; }
      if (alt === "PA") { if (hi) { n.sys = rint(155, 185); n.dia = rint(96, 112); exp = `Hipertensión: ${n.sys}/${n.dia} mmHg.`; } else { n.sys = rint(78, 88); n.dia = rint(42, 52); exp = `Hipotensión: ${n.sys}/${n.dia} mmHg.`; } }
      if (alt === "FR") { n.FR = hi ? rint(26, 34) : rint(7, 9); exp = hi ? `Taquipnea: FR ${n.FR} rpm (> 20).` : `Bradipnea: FR ${n.FR} rpm (< 12).`; }
      if (alt === "T") { n.T = hi ? rnd(38.3, 39.8) : rnd(34.2, 35.2); exp = hi ? `Fiebre: ${fmt(n.T, 1)} °C.` : `Hipotermia: ${fmt(n.T, 1)} °C.`; }
      if (alt === "SpO2") { n.SpO2 = rint(82, 90); exp = `Hipoxemia: SpO₂ ${n.SpO2} % (< 92 %).`; }
      mon.set({ rhythm: "sinusal", fc: n.FC, showPleth: true }, { FC: n.FC, PA: `${n.sys}/${n.dia}`, SpO2: n.SpO2, FR: n.FR, T: fmt(n.T, 1) });
      q.textContent = "¿Qué signo vital está fuera del rango normal?";
      const labels = { FC: "Frecuencia cardíaca", PA: "Presión arterial", FR: "Frecuencia respiratoria", T: "Temperatura", SpO2: "Saturación de O₂" };
      return { options: Object.keys(labels).map((k) => ({ k, t: labels[k] })), correct: alt, exp };
    }

    function ritmosRonda() {
      const key = pick(Object.keys(RITMOS));
      const fc = RITMOS[key].fc();
      mon.set({ rhythm: key, fc: fc || 60, showPleth: false }, { FC: fc ? (key === "fa" ? `${fc}*` : fc) : "---" });
      q.textContent = "¿Qué ritmo muestra el monitor?";
      const others = shuffle(Object.keys(RITMOS).filter((k) => k !== key)).slice(0, 3);
      const exps = {
        sinusal: "Onda P antes de cada QRS, regular, 60–100 lpm.",
        bradi: "Ritmo sinusal regular por debajo de 60 lpm.",
        taqui: "Ritmo sinusal regular por encima de 100 lpm.",
        fa: "Intervalos R-R irregulares y sin ondas P definidas.",
        fv: "Actividad caótica sin QRS identificables: paro cardíaco, desfibrilar.",
        asistolia: "Línea isoeléctrica: confirmar en dos derivaciones, RCP, no desfibrilable."
      };
      return { options: shuffle([key, ...others]).map((k) => ({ k, t: RITMOS[k].nombre })), correct: key, exp: exps[key] };
    }

    function ronda() {
      head.replaceChildren(
        h("div", { class: "sim-head" }, h("span", { class: "chip" }, `Paciente ${r + 1} de ${rondas}`), h("span", { class: "chip chip-soft" }, `✅ ${aciertos}`)),
        progressBar(r, rondas)
      );
      fb.textContent = "";
      fb.className = "sim-feedback";
      next.hidden = true;
      const R = p.modo === "ritmos" ? ritmosRonda() : vitalesRonda();
      opts.replaceChildren();
      R.options.forEach((o) => {
        const b = h("button", { class: "opt", type: "button" }, o.t);
        b.addEventListener("click", () => {
          if (!next.hidden) return;
          const ok = o.k === R.correct;
          if (ok) { aciertos++; sfx.ok(); } else sfx.bad();
          b.classList.add(ok ? "ok" : "bad");
          [...opts.children].forEach((c, i) => { if (R.options[i].k === R.correct) c.classList.add("ok"); c.disabled = true; });
          fb.className = `sim-feedback ${ok ? "ok" : "bad"}`;
          fb.innerHTML = `${ok ? "✅ ¡Correcto!" : "❌ No es correcto."} <span class="exp">${R.exp}</span>`;
          next.hidden = false;
          next.textContent = r + 1 < rondas ? "Siguiente paciente ➡️" : "Ver resultado";
        });
        opts.append(b);
      });
    }
    next.addEventListener("click", () => {
      r++;
      if (r < rondas) ronda();
      else ctx.finish(Math.round((aciertos / rondas) * 100), `${aciertos} de ${rondas} correctos.`);
    });
    ronda();
    return () => mon.destroy();
  }

  // ===================================================================
  // SUTURA: puntos simples sobre una herida
  // ===================================================================
  function sutura(p, el, ctx) {
    const N = p.puntos || 6;
    const canvas = h("canvas", { class: "suture-canvas", "aria-label": "Simulador de sutura: arrastra cruzando la herida" });
    const fb = h("div", { class: "sim-feedback", role: "status", "aria-live": "polite" }, "Arrastra desde un borde de la herida hasta el otro, perpendicular a ella.");
    const counter = h("span", { class: "chip" }, `Puntos: 0 / ${N}`);
    const guideTg = h("label", { class: "switch-inline" }, h("input", { type: "checkbox" }), " Guía");
    const undo = h("button", { class: "btn btn-secondary btn-sm", type: "button" }, "↶ Deshacer");
    const tips = h("ul", { class: "suture-tips" },
      h("li", null, "Entrada y salida a la misma distancia del borde (3–5 mm)."),
      h("li", null, "Perpendicular a la herida."),
      h("li", null, "Separación pareja entre puntos (5–10 mm)."));
    el.append(h("div", { class: "sim-head" }, counter, guideTg, undo), fb, h("div", { class: "suture-wrap" }, canvas), tips);

    const stitches = [];
    let W = 0, H = 0, dpr = 1, mm = 1;
    let drag = null;
    const woundY = (x) => H * 0.5 + Math.sin((x / W) * Math.PI * 1.6) * H * 0.05;
    const x0 = () => W * 0.12;
    const x1 = () => W * 0.88;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const old = W;
      W = canvas.width = canvas.clientWidth * dpr;
      H = canvas.height = canvas.clientHeight * dpr;
      mm = (x1() - x0()) / 70; // herida de 7 cm
      if (old && old !== W) {
        const k = W / old;
        stitches.forEach((st) => { st.a = [st.a[0] * k, st.a[1] * k]; st.b = [st.b[0] * k, st.b[1] * k]; });
      }
      draw();
    }

    function draw() {
      const c = canvas.getContext("2d");
      const g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#f2cdb3");
      g.addColorStop(1, "#e7b597");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
      c.fillStyle = "rgba(160,100,80,.08)";
      for (let i = 0; i < 160; i++) { c.beginPath(); c.arc((i * 97.3) % W, (i * 53.7) % H, 1.2 * dpr, 0, 6.28); c.fill(); }
      // herida
      c.lineCap = "round";
      c.strokeStyle = "rgba(190,90,90,.35)";
      c.lineWidth = 14 * dpr;
      c.beginPath();
      for (let x = x0(); x <= x1(); x += 2) { const y = woundY(x); x === x0() ? c.moveTo(x, y) : c.lineTo(x, y); }
      c.stroke();
      c.strokeStyle = "#8e1f2a";
      c.lineWidth = 4 * dpr;
      c.stroke();
      // guía
      if (guideTg.querySelector("input").checked) {
        c.fillStyle = "rgba(34,49,70,.45)";
        for (let i = 0; i < N; i++) {
          const x = x0() + ((i + 0.5) * (x1() - x0())) / N;
          const y = woundY(x);
          [-1, 1].forEach((sd) => { c.beginPath(); c.arc(x, y + sd * 4.5 * mm, 3 * dpr, 0, 6.28); c.fill(); });
        }
      }
      stitches.forEach((st) => drawStitch(c, st.a, st.b, st.score >= 70 ? "#1f3a8a" : "#b23b3b"));
      if (drag && drag.b) drawStitch(c, drag.a, drag.b, "rgba(31,58,138,.6)", true);
    }

    function drawStitch(c, a, b, color, live) {
      c.strokeStyle = color;
      c.lineWidth = 2.6 * dpr;
      c.setLineDash(live ? [6 * dpr, 5 * dpr] : []);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
      c.setLineDash([]);
      c.fillStyle = "#5a2a2a";
      [a, b].forEach((p) => { c.beginPath(); c.arc(p[0], p[1], 2.6 * dpr, 0, 6.28); c.fill(); });
      if (!live) {
        const kx = a[0] + 6 * dpr, ky = a[1];
        c.strokeStyle = color;
        c.beginPath(); c.arc(kx, ky, 3.5 * dpr, 0, 6.28); c.stroke();
        c.beginPath(); c.moveTo(kx + 3 * dpr, ky); c.lineTo(kx + 12 * dpr, ky - 6 * dpr); c.moveTo(kx + 3 * dpr, ky); c.lineTo(kx + 12 * dpr, ky + 5 * dpr); c.stroke();
      }
    }

    function evaluate(a, b) {
      const midX = (a[0] + b[0]) / 2;
      const wy = woundY(midX);
      const da = a[1] - woundY(a[0]);
      const db = b[1] - woundY(b[0]);
      if (midX < x0() - 2 * mm || midX > x1() + 2 * mm) return { score: 0, msg: "El punto debe hacerse sobre la herida." };
      if (Math.sign(da) === Math.sign(db)) return { score: 0, msg: "El punto debe cruzar la herida de un borde al otro." };
      const slope = Math.cos((midX / W) * Math.PI * 1.6) * H * 0.05 * (Math.PI * 1.6 / W);
      const woundAng = Math.atan(slope);
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      let dev = Math.abs(((ang - woundAng) * 180) / Math.PI) % 180;
      dev = Math.abs(90 - dev);
      const biteA = Math.abs(da) / mm, biteB = Math.abs(db) / mm;
      const ratio = Math.max(biteA, biteB) / Math.max(0.1, Math.min(biteA, biteB));
      let score = 100;
      const notes = [];
      if (dev > 15) { score -= Math.min(40, (dev - 15) * 1.5); notes.push("inclinado, hazlo más perpendicular"); }
      if (ratio > 1.5) { score -= Math.min(30, (ratio - 1.5) * 25); notes.push("bordes asimétricos"); }
      const bite = (biteA + biteB) / 2;
      if (bite < 2.5) { score -= 25; notes.push("muy cerca del borde"); }
      if (bite > 8) { score -= Math.min(30, (bite - 8) * 6); notes.push("muy lejos del borde"); }
      if (stitches.length) {
        const nearest = Math.min(...stitches.map((st) => Math.abs((st.a[0] + st.b[0]) / 2 - midX))) / mm;
        if (nearest < 4) { score -= 30; notes.push("demasiado junto al punto anterior"); }
        else if (nearest > 16) { score -= 15; notes.push("muy separado de otro punto"); }
      }
      score = Math.max(0, Math.round(score));
      void wy;
      return { score, msg: score >= 85 ? "¡Punto excelente!" : score >= 70 ? `Buen punto (${notes.join(", ")}).` : `Mejorable: ${notes.join(", ")}.` };
    }

    function pos(e) {
      const r = canvas.getBoundingClientRect();
      return [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr];
    }
    canvas.addEventListener("pointerdown", (e) => {
      if (stitches.length >= N) return;
      canvas.setPointerCapture(e.pointerId);
      drag = { a: pos(e), b: null };
    });
    canvas.addEventListener("pointermove", (e) => { if (drag) { drag.b = pos(e); draw(); } });
    canvas.addEventListener("pointerup", () => {
      if (!drag || !drag.b || Math.hypot(drag.b[0] - drag.a[0], drag.b[1] - drag.a[1]) < 4 * dpr) { drag = null; draw(); return; }
      const ev = evaluate(drag.a, drag.b);
      if (ev.score === 0) {
        sfx.bad();
        fb.textContent = ev.msg;
        fb.className = "sim-feedback bad";
      } else {
        stitches.push({ a: drag.a, b: drag.b, score: ev.score });
        ev.score >= 70 ? sfx.ok() : sfx.bad();
        fb.textContent = `Punto ${stitches.length}: ${ev.score}/100 · ${ev.msg}`;
        fb.className = `sim-feedback ${ev.score >= 70 ? "ok" : "bad"}`;
        counter.textContent = `Puntos: ${stitches.length} / ${N}`;
      }
      drag = null;
      draw();
      if (stitches.length >= N) {
        const xs = stitches.map((st) => (st.a[0] + st.b[0]) / 2).sort((a, b) => a - b);
        const cover = (xs[0] - x0()) / mm < 14 && (x1() - xs[xs.length - 1]) / mm < 14;
        let avg = stitches.reduce((a, st) => a + st.score, 0) / N;
        if (!cover) avg -= 10;
        setTimeout(() => ctx.finish(Math.max(0, Math.round(avg)), `Promedio por punto: ${Math.round(stitches.reduce((a, st) => a + st.score, 0) / N)}/100.${cover ? " Cubriste toda la herida." : " Quedaron extremos de la herida sin cerrar (−10)."}`), 900);
      }
    });
    undo.addEventListener("click", () => { stitches.pop(); counter.textContent = `Puntos: ${stitches.length} / ${N}`; draw(); });
    guideTg.querySelector("input").addEventListener("change", draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }

  // ===================================================================
  // RCP: entrenador de compresiones
  // ===================================================================
  function rcp(p, el, ctx) {
    const ciclos = p.ciclos || 2;
    let ciclo = 1;
    let comp = 0;
    let vent = 0;
    let fase = "comp";
    let times = [];
    let enRango = 0;
    let total = 0;
    let metro = null;

    const chest = h("button", { class: "cpr-chest", type: "button", "aria-label": "Pecho del maniquí: toca para comprimir" },
      h("span", { class: "cpr-hands", "aria-hidden": "true" }, "🫸"),
      h("span", { class: "cpr-count" }, "0"));
    const rateEl = h("div", { class: "cpr-rate" }, "— /min");
    const needle = h("div", { class: "cpr-needle" });
    const gauge = h("div", { class: "cpr-gauge", "aria-hidden": "true" },
      h("div", { class: "z slow" }, "Lento"), h("div", { class: "z good" }, "100–120"), h("div", { class: "z fast" }, "Rápido"), needle);
    const status = h("div", { class: "sim-feedback", role: "status", "aria-live": "polite" }, "Toca el pecho (o pulsa la barra espaciadora) para comprimir.");
    const ventBtn = h("button", { class: "btn btn-primary btn-large", type: "button", hidden: true }, "🌬️ Ventilar");
    const metroBtn = h("button", { class: "btn btn-secondary btn-sm", type: "button" }, "🎵 Metrónomo 110");
    const head = h("div", { class: "sim-head" });

    function renderHead() {
      head.replaceChildren(h("span", { class: "chip" }, `Ciclo ${ciclo} de ${ciclos}`), h("span", { class: "chip chip-soft" }, fase === "comp" ? `Compresiones ${comp}/30` : `Ventilaciones ${vent}/2`), metroBtn);
    }

    function setRate(rate) {
      rateEl.textContent = `${Math.round(rate)} /min`;
      const pct = Math.max(0, Math.min(1, (rate - 60) / 100));
      needle.style.left = `${pct * 100}%`;
      rateEl.className = `cpr-rate ${rate < 100 ? "slow" : rate > 120 ? "fast" : "good"}`;
    }

    function compress() {
      if (fase !== "comp") return;
      const now = performance.now();
      chest.classList.remove("press");
      void chest.offsetWidth;
      chest.classList.add("press");
      sfx.click();
      if (times.length) {
        const dt = now - times[times.length - 1];
        if (dt > 2000) { status.textContent = "⚠️ ¡Evita las pausas! Las interrupciones reducen la perfusión."; status.className = "sim-feedback bad"; }
        else {
          total++;
          if (dt >= 500 && dt <= 600) enRango++;
          const recent = times.slice(-4).concat(now);
          const avg = (recent[recent.length - 1] - recent[0]) / (recent.length - 1);
          const rate = 60000 / avg;
          setRate(rate);
          status.textContent = rate < 100 ? "Más rápido ⬆️" : rate > 120 ? "Más lento ⬇️" : "¡Ritmo perfecto! Sigue así 💪";
          status.className = `sim-feedback ${rate < 100 || rate > 120 ? "bad" : "ok"}`;
        }
      }
      times.push(now);
      comp++;
      chest.querySelector(".cpr-count").textContent = comp;
      if (comp >= 30) {
        fase = "vent";
        vent = 0;
        times = [];
        status.textContent = "Abre la vía aérea (frente-mentón) y da 2 ventilaciones.";
        status.className = "sim-feedback";
        ventBtn.hidden = false;
        chest.disabled = true;
      }
      renderHead();
    }

    ventBtn.addEventListener("click", () => {
      vent++;
      tone(300, 0.6, "sine", 0.06);
      ventBtn.disabled = true;
      setTimeout(() => { ventBtn.disabled = false; }, 900);
      if (vent >= 2) {
        if (ciclo >= ciclos) {
          stopMetro();
          const score = total ? Math.round((enRango / total) * 100) : 0;
          ctx.finish(score, `${enRango} de ${total} compresiones dentro de 100–120/min.`);
          return;
        }
        ciclo++;
        comp = 0;
        fase = "comp";
        ventBtn.hidden = true;
        chest.disabled = false;
        chest.querySelector(".cpr-count").textContent = "0";
        status.textContent = "Reanuda las compresiones de inmediato.";
      }
      renderHead();
    });

    function stopMetro() { if (metro) { clearInterval(metro); metro = null; metroBtn.classList.remove("active"); } }
    metroBtn.addEventListener("click", () => {
      if (metro) return stopMetro();
      metroBtn.classList.add("active");
      metro = setInterval(() => tone(880, 0.04, "square", 0.05), 60000 / 110);
    });

    chest.addEventListener("pointerdown", (e) => { e.preventDefault(); compress(); });
    const key = (e) => { if (e.code === "Space" && el.isConnected) { e.preventDefault(); compress(); } };
    document.addEventListener("keydown", key);

    el.append(head, h("div", { class: "cpr-layout" }, chest, h("div", { class: "cpr-side" }, rateEl, gauge, status, ventBtn)));
    renderHead();
    return () => { stopMetro(); document.removeEventListener("keydown", key); };
  }

  // ===================================================================
  // CASO CLÍNICO
  // ===================================================================
  function caso(p, el, ctx) {
    const v = p.paciente.vitales;
    const card = h("div", { class: "patient-card" },
      h("div", { class: "patient-avatar", "aria-hidden": "true" }, "🧑‍⚕️"),
      h("div", null, h("strong", null, p.paciente.nombre), h("p", null, p.paciente.motivo)),
      h("div", { class: "patient-vitals" },
        ...[["FC", v.FC, "lpm"], ["PA", v.PA, ""], ["FR", v.FR, "rpm"], ["T°", v.T, "°C"], ["SpO₂", v.SpO2, "%"]]
          .map(([l, val, u]) => h("span", null, h("small", null, l), ` ${val} `, val !== "—" ? h("small", null, u) : null))));
    const body = h("div");
    el.append(card, body);
    let i = 0;
    let ok = 0;

    function paso() {
      const st = p.pasos[i];
      const fb = h("div", { class: "sim-feedback", role: "status", "aria-live": "polite" });
      const next = h("button", { class: "btn btn-primary", type: "button", hidden: true }, i + 1 < p.pasos.length ? "Continuar ➡️" : "Ver resultado");
      const opts = h("div", { class: "opt-list" });
      st.ops.forEach((t, k) => {
        const b = h("button", { class: "opt", type: "button" }, t);
        b.addEventListener("click", () => {
          if (!next.hidden) return;
          const good = k === st.ok;
          if (good) { ok++; sfx.ok(); } else sfx.bad();
          [...opts.children].forEach((c, j) => { c.disabled = true; if (j === st.ok) c.classList.add("ok"); });
          if (!good) b.classList.add("bad");
          fb.className = `sim-feedback ${good ? "ok" : "bad"}`;
          fb.innerHTML = `${good ? "✅ Decisión correcta." : "❌ No es la mejor decisión."} <span class="exp">${st.fb}</span>`;
          next.hidden = false;
        });
        opts.append(b);
      });
      next.addEventListener("click", () => {
        i++;
        if (i < p.pasos.length) paso();
        else ctx.finish(Math.round((ok / p.pasos.length) * 100), `${ok} de ${p.pasos.length} decisiones correctas.`);
      });
      body.replaceChildren(
        h("div", { class: "sim-head" }, h("span", { class: "chip" }, `Decisión ${i + 1} de ${p.pasos.length}`)),
        progressBar(i, p.pasos.length),
        h("p", { class: "calc-q" }, st.q), opts, fb, next);
    }
    paso();
  }

  // ===================================================================
  // CLASIFICAR
  // ===================================================================
  function clasificar(p, el, ctx) {
    const items = shuffle(p.items);
    let i = 0;
    let ok = 0;
    const counter = h("span", { class: "chip" });
    const card = h("div", { class: "sort-card", "aria-live": "polite" });
    const fb = h("div", { class: "sim-feedback", role: "status" });
    const bins = h("div", { class: "sort-bins" });
    const prog = h("div");
    const score = h("span", { class: "chip chip-soft" });
    p.categorias.forEach((c) => {
      const b = h("button", { class: "sort-bin", type: "button" }, c.label);
      b.style.setProperty("--bin", c.color);
      b.addEventListener("click", () => {
        if (i >= items.length || card.classList.contains("leaving")) return;
        const it = items[i];
        const good = it.c === c.id;
        if (good) { ok++; sfx.ok(); } else sfx.bad();
        const correct = p.categorias.find((x) => x.id === it.c);
        fb.className = `sim-feedback ${good ? "ok" : "bad"}`;
        fb.textContent = good ? `✅ Correcto: ${it.t} → ${correct.label}` : `❌ ${it.t} va en: ${correct.label}`;
        b.classList.add(good ? "flash-ok" : "flash-bad");
        setTimeout(() => b.classList.remove("flash-ok", "flash-bad"), 500);
        card.classList.add("leaving");
        setTimeout(() => {
          card.classList.remove("leaving");
          i++;
          if (i >= items.length) ctx.finish(Math.round((ok / items.length) * 100), `${ok} de ${items.length} bien clasificados.`);
          else show();
        }, good ? 450 : 1100);
      });
      bins.append(b);
    });
    function show() {
      counter.textContent = `Elemento ${i + 1} de ${items.length}`;
      score.textContent = `✅ ${ok}`;
      prog.replaceChildren(progressBar(i, items.length));
      card.textContent = items[i].t;
    }
    el.append(h("div", { class: "sim-head" }, counter, score), prog, card, fb, bins);
    show();
  }

  const ENGINES = { secuencia, objetivo, calculo, signos, sutura, rcp, caso, clasificar };
  const TIPOS = {
    secuencia: { icono: "🔢", nombre: "Secuencia" },
    objetivo: { icono: "🎯", nombre: "Anatomía" },
    calculo: { icono: "🧮", nombre: "Cálculo" },
    signos: { icono: "📟", nombre: "Monitor" },
    sutura: { icono: "🪡", nombre: "Sutura" },
    rcp: { icono: "💓", nombre: "Simulador RCP" },
    caso: { icono: "🧑‍⚕️", nombre: "Caso clínico" },
    clasificar: { icono: "🗂️", nombre: "Clasificar" }
  };

  const api = {
    TIPOS,
    sound: true,
    run(practica, container, ctx) {
      container.replaceChildren();
      const cleanup = ENGINES[practica.tipo](practica, container, ctx);
      return typeof cleanup === "function" ? cleanup : () => {};
    }
  };
  return api;
})();
