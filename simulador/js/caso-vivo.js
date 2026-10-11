/* =========================================================
   Casos vivos: situaciones simuladas para responder ACTUANDO.
   Común a las cuatro carreras. Para cada paso del caso:
     1. Actúa en la escena: toca hasta dos acciones (gestos,
        documentos, llamadas…). El personaje reacciona y cambian
        sus medidores de confianza y tensión.
     2. Habla: responde con tu voz (micrófono) o escribiendo lo
        que le dirías. Se evalúan las ideas clave presentes y las
        expresiones que deben evitarse.
   Las opciones clásicas quedan como ayuda (puntaje menor).
   Datos: window.CASOS_VIVOS[id] (archivos casos-vivos-*.js).
   ========================================================= */
(function () {
  'use strict';
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
  const norm = s => ' ' + String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9ñ]+/g, ' ').replace(/ñ/g, 'n').trim() + ' ';
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const contiene = (texto, clave) => new RegExp(' ' + escRe(norm(clave).trim())).test(texto);
  // para las expresiones a evitar: no cuenta si va negada («no fue tu culpa» no activa «fue tu culpa»)
  const contieneSinNegar = (texto, clave) => {
    const re = new RegExp(' ' + escRe(norm(clave).trim()), 'g'); let m;
    while ((m = re.exec(texto))) { if (!/ (no|nunca|jamas|sin|tampoco)$/.test(texto.slice(0, m.index))) return true; }
    return false;
  };
  const mezclar = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const MAX_ACC = 2;

  /* fondos ilustrados de la escena (vectoriales, sin emojis) */
  const ARBOL = (x, y, k = 1, c = '#3f8f3a') => `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-4" y="-6" width="8" height="40" rx="3" fill="#7a5230"/><circle cx="0" cy="-22" r="22" fill="${c}"/><circle cx="-16" cy="-8" r="15" fill="${c}"/><circle cx="16" cy="-10" r="16" fill="${c}"/><circle cx="-6" cy="-34" r="12" fill="#ffffff" opacity=".08"/></g>`;
  const PALMA = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 40 Q-4 0 2 -40" stroke="#7a5230" stroke-width="6" fill="none"/><g fill="#2f7d32"><path d="M2 -40 Q-30 -50 -48 -28 Q-24 -40 2 -38Z"/><path d="M2 -40 Q34 -52 50 -26 Q24 -40 2 -38Z"/><path d="M2 -40 Q-12 -70 -34 -66 Q-10 -56 2 -40Z"/><path d="M2 -40 Q18 -72 40 -64 Q14 -56 2 -40Z"/></g></g>`;
  const NUBE = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})" fill="#fff" opacity=".9"><ellipse cx="0" cy="0" rx="26" ry="12"/><ellipse cx="18" cy="-6" rx="18" ry="12"/><ellipse cx="-16" cy="-4" rx="14" ry="10"/></g>`;
  const PISO = (c1, c2, y = 220) => `<defs><linearGradient id="cvf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect y="${y}" width="600" height="${300 - y}" fill="url(#cvf)"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<line x1="${300 + (k - 4) * 40}" y1="${y}" x2="${300 + (k - 4) * 130}" y2="300" stroke="#000" stroke-opacity=".05"/>`).join('')}<line x1="0" y1="${y + 30}" x2="600" y2="${y + 30}" stroke="#000" stroke-opacity=".04"/>`;
  const FONDOS = {
    aula: `<defs><linearGradient id="cvw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf3dc"/><stop offset="1" stop-color="#f1e2bd"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvw)"/><rect y="182" width="600" height="38" fill="#d9c08f"/><rect y="180" width="600" height="4" fill="#b99a62"/>${PISO('#caa06a', '#a87d48')}
      <rect x="30" y="34" width="270" height="132" rx="6" fill="#8a5a2b"/><rect x="38" y="42" width="254" height="116" rx="3" fill="#2f5d45"/><text x="56" y="76" fill="#e8f5e9" font-size="17" font-family="Nunito" opacity=".9">Hoy aprendemos…</text><path d="M58 104 q20 -14 40 0 t40 0" stroke="#e8f5e9" stroke-width="2" fill="none" opacity=".7"/><rect x="60" y="158" width="210" height="6" fill="#6b4423"/><rect x="90" y="155" width="18" height="4" fill="#fff"/>
      <rect x="330" y="40" width="96" height="104" rx="4" fill="#fff"/><rect x="336" y="46" width="84" height="92" fill="#bfe3f7"/>${ARBOL(378, 128, .7)}<line x1="378" y1="46" x2="378" y2="138" stroke="#fff" stroke-width="4"/><line x1="336" y1="92" x2="420" y2="92" stroke="#fff" stroke-width="4"/>
      <rect x="452" y="70" width="110" height="112" fill="#8a5a2b"/>${[0, 1, 2].map(r => `<rect x="458" y="${78 + r * 34}" width="98" height="4" fill="#6b4423"/>` + [0, 1, 2, 3, 4, 5].map(k => `<rect x="${462 + k * 15}" y="${84 + r * 34}" width="11" height="26" fill="${['#e76f51', '#2a9d8f', '#e9c46a', '#264653', '#f4a261', '#8ab17d'][(k + r) % 6]}"/>`).join('')).join('')}
      <g fill="#a0703f"><rect x="60" y="238" width="120" height="12" rx="3"/><rect x="66" y="250" width="6" height="36"/><rect x="168" y="250" width="6" height="36"/><rect x="250" y="246" width="120" height="12" rx="3"/><rect x="256" y="258" width="6" height="36"/><rect x="358" y="258" width="6" height="36"/></g>`,
    oficina: `<defs><linearGradient id="cvw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef4f8"/><stop offset="1" stop-color="#dfe9f1"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvw)"/>${PISO('#c9ced6', '#aab2bd')}<rect y="216" width="600" height="6" fill="#9aa4b1"/>
      <rect x="34" y="36" width="160" height="120" rx="4" fill="#fff"/><rect x="40" y="42" width="148" height="108" fill="#cfe8f7"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<rect x="40" y="${44 + k * 13}" width="148" height="7" fill="#fff" opacity=".75"/>`).join('')}
      <circle cx="262" cy="64" r="22" fill="#fff" stroke="#475569" stroke-width="3"/><path d="M262 64 V50 M262 64 L272 70" stroke="#334155" stroke-width="3" stroke-linecap="round"/>
      <rect x="304" y="44" width="70" height="52" rx="3" fill="#fff" stroke="#c9a227" stroke-width="3"/><rect x="314" y="56" width="50" height="4" fill="#94a3b8"/><rect x="314" y="66" width="38" height="4" fill="#cbd5e1"/><circle cx="352" cy="82" r="6" fill="#c9a227"/>
      <rect x="420" y="96" width="70" height="124" rx="4" fill="#94a3b8"/>${[0, 1, 2].map(k => `<rect x="426" y="${104 + k * 38}" width="58" height="32" rx="3" fill="#a9b6c6"/><rect x="446" y="${116 + k * 38}" width="18" height="4" rx="2" fill="#64748b"/>`).join('')}
      <path d="M30 196 L250 196 L250 206 L30 206Z" fill="#8a6a3b"/><rect x="40" y="206" width="8" height="40" fill="#6b5130"/><rect x="232" y="206" width="8" height="40" fill="#6b5130"/><rect x="110" y="150" width="70" height="44" rx="4" fill="#1f2937"/><rect x="114" y="154" width="62" height="34" rx="2" fill="#38bdf8" opacity=".55"/><rect x="138" y="192" width="14" height="6" fill="#374151"/>
      <path d="M530 220 q-6 -40 10 -60 q16 20 10 60z" fill="#3f8f3a"/><path d="M540 220 q14 -46 34 -52 q-6 30 -24 52z" fill="#2f7d32"/><rect x="522" y="210" width="44" height="26" rx="4" fill="#c2703d"/>`,
    exterior: `<defs><linearGradient id="cvs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd0f4"/><stop offset="1" stop-color="#e7f6ff"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvs)"/><circle cx="520" cy="56" r="26" fill="#fde68a"/>${NUBE(120, 50)}${NUBE(330, 36, .8)}
      <path d="M0 190 Q120 130 250 175 T600 160 V300 H0Z" fill="#9ccf7a"/><path d="M0 214 Q160 176 320 206 T600 196 V300 H0Z" fill="#6fb04f"/><rect y="236" width="600" height="64" fill="#5d9e42"/><path d="M260 300 Q290 250 330 236 L360 236 Q330 260 330 300Z" fill="#d6b98a"/>
      ${ARBOL(60, 200, 1)}${ARBOL(170, 214, .8, '#4a9b44')}${PALMA(450, 214, .9)}${ARBOL(540, 208, 1.1, '#3a8433')}
      <g transform="translate(200 160)"><rect x="0" y="20" width="70" height="46" fill="#f3e3c3"/><path d="M-8 22 L35 -6 L78 22Z" fill="#b45309"/><rect x="28" y="38" width="16" height="28" fill="#7a5230"/><rect x="8" y="30" width="14" height="12" fill="#bfe3f7"/><rect x="50" y="30" width="14" height="12" fill="#bfe3f7"/></g>`,
    comunidad: `<defs><linearGradient id="cvc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd6f2"/><stop offset="1" stop-color="#eef9ff"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvc)"/>${NUBE(90, 46, .9)}${NUBE(420, 40)}
      <path d="M0 176 Q200 120 400 170 T600 156 V300 H0Z" fill="#7dbd5c"/><path d="M0 230 Q150 214 300 236 T600 226 V246 H0Z" fill="#4fa3c7" opacity=".85"/><rect y="244" width="600" height="56" fill="#c9a26b"/>
      ${PALMA(40, 214, 1)}${ARBOL(560, 214, 1.1, '#3a8433')}${PALMA(520, 220, .8)}
      ${[[120, 150], [300, 140]].map(([x, y]) => `<g transform="translate(${x} ${y})"><rect x="0" y="30" width="110" height="56" fill="#c8a06a"/>${[0, 1, 2, 3, 4, 5, 6].map(k => `<line x1="${8 + k * 15}" y1="30" x2="${8 + k * 15}" y2="86" stroke="#9b7445" stroke-width="2"/>`).join('')}<path d="M-16 34 L55 -18 L126 34Z" fill="#a67c3d"/>${[0, 1, 2, 3, 4].map(k => `<path d="M${-16 + k * 4} ${34 - k * 10} L${126 - k * 4} ${34 - k * 10}" stroke="#8a6331" stroke-width="2"/>`).join('')}<rect x="44" y="52" width="22" height="34" fill="#5b3d22"/></g>`).join('')}`,
    obra: `<defs><linearGradient id="cvo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9dcf7"/><stop offset="1" stop-color="#eef8ff"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvo)"/>${NUBE(160, 44, .8)}<rect y="222" width="600" height="78" fill="#a8743a"/><rect y="222" width="600" height="6" fill="#6f9e3a"/>
      <g stroke="#7b7f86" stroke-width="5"><path d="M50 222 V60 M140 222 V60 M50 100 H140 M50 150 H140 M50 196 H140 M50 60 H140"/><path d="M50 100 L140 150 M140 100 L50 150" stroke-width="2"/></g><rect x="46" y="96" width="98" height="6" fill="#a16207"/><rect x="46" y="146" width="98" height="6" fill="#a16207"/>
      <g transform="translate(180 90)"><rect x="0" y="40" width="150" height="92" fill="#b0b5bb"/>${[0, 1, 2].map(r => [0, 1, 2, 3].map(k => `<rect x="${12 + k * 36}" y="${50 + r * 28}" width="22" height="18" fill="#7f8790"/>`).join('')).join('')}<rect x="-6" y="34" width="162" height="8" fill="#8a9097"/><rect x="0" y="0" width="10" height="36" fill="#8a9097"/><rect x="140" y="0" width="10" height="36" fill="#8a9097"/></g>
      <path d="M400 222 V36 H578" stroke="#eab308" stroke-width="8" fill="none"/><path d="M400 60 L440 36 M400 100 L418 36" stroke="#ca8a04" stroke-width="3"/><line x1="548" y1="36" x2="548" y2="118" stroke="#334155" stroke-width="2"/><rect x="536" y="118" width="24" height="16" fill="#64748b"/>
      <path d="M440 222 Q470 186 500 222Z" fill="#d9b382"/><path d="M500 222 Q520 196 545 222Z" fill="#9ca3af"/>${[350, 372].map(x => `<path d="M${x} 222 L${x + 8} 196 L${x + 16} 222Z" fill="#f97316"/><rect x="${x + 4}" y="208" width="8" height="4" fill="#fff"/>`).join('')}`,
    emergencia: `<defs><linearGradient id="cve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8c79b"/><stop offset="1" stop-color="#fff0e2"/></linearGradient><radialGradient id="cvfl"><stop offset="0" stop-color="#fde047"/><stop offset=".6" stop-color="#f97316"/><stop offset="1" stop-color="#dc2626" stop-opacity="0"/></radialGradient></defs><rect width="600" height="300" fill="url(#cve)"/><rect y="224" width="600" height="76" fill="#6b7280"/><rect y="254" width="600" height="6" fill="#facc15"/>
      ${[[120, 40, 26], [150, 22, 20], [180, 36, 16]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#6b7280" opacity=".45"/>`).join('')}
      <rect x="60" y="112" width="160" height="112" fill="#d6b48a"/><path d="M44 116 L140 52 L236 116Z" fill="#7c2d12"/><rect x="84" y="140" width="34" height="30" fill="#1f2937"/><rect x="160" y="140" width="34" height="30" fill="#1f2937"/><ellipse cx="101" cy="146" rx="26" ry="30" fill="url(#cvfl)"/><ellipse cx="140" cy="104" rx="34" ry="34" fill="url(#cvfl)"/>
      <g transform="translate(270 168)"><rect x="0" y="10" width="170" height="46" rx="6" fill="#dc2626"/><rect x="118" y="-6" width="52" height="30" rx="4" fill="#b91c1c"/><rect x="126" y="0" width="34" height="16" rx="2" fill="#bfe3f7"/><rect x="6" y="18" width="104" height="5" fill="#fff"/><rect x="10" y="0" width="100" height="6" fill="#9ca3af"/><circle cx="34" cy="58" r="11" fill="#111827"/><circle cx="140" cy="58" r="11" fill="#111827"/><rect x="128" y="-12" width="14" height="6" rx="2" fill="#3b82f6"/></g>
      <path d="M460 230 L590 210" stroke="#facc15" stroke-width="6"/><path d="M470 228 l10 -2 M500 224 l10 -2 M530 220 l10 -2 M560 216 l10 -2" stroke="#111827" stroke-width="6"/>`
  };

  function play(c, o) {
    const V = c.vivo || (window.CASOS_VIVOS || {})[c.id];
    if (!V || !V.pasos || V.pasos.length !== c.pasos.length) return false;
    const P = o.P, btn = o.btn || 'btn-primary';
    const st = { i: 0, conf: V.inicio?.confianza ?? 50, ten: V.inicio?.tension ?? 50, log: [], curva: [] };
    let rec = null;
    const animo = () => st.conf >= 65 && st.ten <= 45 ? '😊' : st.ten >= 70 || st.conf <= 30 ? '😠' : '😐';
    const say = t => /^\(.*\)$/.test(t) ? `<i>${esc(t.slice(1, -1))}</i>` : `“${esc(t)}”`;

    function medidores() {
      return `<div class="cv-meters"><div><span>🤝 Confianza</span><b>${Math.round(st.conf)}%</b><i style="--v:${st.conf}%;--c:var(--ok)"></i></div><div><span>⚡ Tensión</span><b>${Math.round(st.ten)}%</b><i style="--v:${st.ten}%;--c:var(--bad)"></i></div></div>`;
    }
    function efecto(e = {}) { st.conf = clamp(st.conf + (e.confianza || 0)); st.ten = clamp(st.ten + (e.tension || 0)); }
    function refrescar() {
      const m = P.querySelector('.cv-meters'); if (m) m.outerHTML = medidores();
      const cara = P.querySelector('.cv-mood'); if (cara) { cara.textContent = animo(); cara.dataset.m = animo(); }
    }
    function burbuja(html) { const b = P.querySelector('.cv-bubble'); if (b) { b.innerHTML = html; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); } }

    function paso() {
      const caso = c.pasos[st.i], v = V.pasos[st.i];
      const s = { acciones: [], texto: '', sugerida: null };
      P.innerHTML = `
        <div class="case-head card"><span class="case-av">${c.persona.avatar}</span><div><h2>${esc(c.titulo)}</h2><p class="muted">${esc(c.persona.nombre)} · ${esc(c.persona.rol)}</p><p class="small">${esc(c.contexto)}</p></div><span class="pill pill-soft">Escena ${st.i + 1}/${c.pasos.length}</span></div>
        <div class="card cv-card">
          <div class="cv-stage cv-${esc(V.fondo || 'oficina')}">
            <svg class="cv-bg" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${FONDOS[V.fondo] || FONDOS.oficina}</svg>
            <span class="cv-place">📍 ${esc(V.lugar || '')}</span>
            <div class="cv-person" aria-label="${esc(c.persona.nombre)}">${(window.IstyUI && IstyUI.figureSVG(c.persona.avatar)) ? '<span class="cv-fig">' + IstyUI.figureSVG(c.persona.avatar) + '</span>' : '<span class="cv-av">' + c.persona.avatar + '</span>'}<span class="cv-mood" aria-hidden="true" data-m="${animo()}">${animo()}</span><small>${esc(c.persona.nombre)}</small></div>
            <div class="cv-bubble pop" aria-live="polite">${say(caso.dice)}</div>
            <div class="cv-props" role="group" aria-label="Acciones en la escena">${mezclar(v.acciones.map((a, k) => ({ a, k }))).map(({ a, k }) => `<button type="button" class="cv-prop" data-a="${k}"><span>${a.icono}</span><small>${esc(a.t)}</small></button>`).join('')}</div>
          </div>
          ${medidores()}
          <div class="cv-steps">
            <p class="cv-step on" id="cv-p1"><b>1. Actúa:</b> toca en la escena hasta ${MAX_ACC} acciones que harías ahora.</p>
            <div id="cv-acc-fb" class="cv-accfb"></div>
            <div class="cv-talk" id="cv-talk" hidden>
              <p class="cv-step on"><b>2. Habla:</b> dile a ${esc(c.persona.nombre)} lo que responderías${SR ? ' — usa el micrófono o escribe' : ' (escríbelo)'}.</p>
              <div class="cv-input"><textarea id="cv-txt" rows="3" placeholder="Escribe aquí lo que le dirías…" aria-label="Tu respuesta"></textarea>${SR ? '<button type="button" class="btn cv-mic" id="cv-mic" aria-label="Responder con tu voz">🎤 Hablar</button>' : ''}</div>
              <div class="report-actions"><button type="button" class="btn ${btn}" id="cv-send">💬 Responder</button><button type="button" class="btn btn-ghost" id="cv-help">💡 Ver respuestas sugeridas</button></div>
              <div id="cv-sug" class="dialog-choices" hidden></div>
            </div>
          </div>
          <div id="cv-result"></div>
        </div>`;
      if (!/^\(/.test(caso.dice)) o.speak(caso.dice, c.persona.pitch);

      P.querySelectorAll('.cv-prop').forEach(b => b.onclick = () => {
        if (s.acciones.length >= MAX_ACC || b.disabled) return;
        const a = v.acciones[+b.dataset.a];
        b.disabled = true; b.classList.add(a.p === 2 ? 'good' : a.p === 1 ? 'mid' : 'bad');
        s.acciones.push(a); efecto(a.efecto); refrescar();
        const color = a.p === 2 ? 'var(--ok)' : a.p === 1 ? 'var(--warn)' : 'var(--bad)';
        P.querySelector('#cv-acc-fb').insertAdjacentHTML('beforeend', `<div class="case-fb" style="border-color:${color}"><b>${a.icono} ${esc(a.t)}</b><br><span class="small">${esc(a.fb)}</span></div>`);
        P.querySelector('#cv-talk').hidden = false;
        if (s.acciones.length >= MAX_ACC) P.querySelectorAll('.cv-prop').forEach(x => { if (!x.disabled) x.disabled = true; });
        if (s.acciones.length === 1) setTimeout(() => P.querySelector('#cv-talk').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
      });

      // micrófono
      const mic = P.querySelector('#cv-mic');
      if (mic) mic.onclick = () => {
        if (rec) { rec.stop(); return; }
        try {
          rec = new SR(); rec.lang = 'es-EC'; rec.interimResults = true; rec.continuous = false;
          const base = P.querySelector('#cv-txt').value.trim();
          rec.onresult = e => { let t = ''; for (const r of e.results) t += r[0].transcript; P.querySelector('#cv-txt').value = (base ? base + ' ' : '') + t; };
          rec.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') o.toast?.('Permite el uso del micrófono o escribe tu respuesta.'); };
          rec.onend = () => { rec = null; mic.textContent = '🎤 Hablar'; mic.classList.remove('rec'); };
          if ('speechSynthesis' in window) speechSynthesis.cancel();
          rec.start(); mic.textContent = '⏹️ Detener'; mic.classList.add('rec');
        } catch (e) { rec = null; o.toast?.('No se pudo usar el micrófono. Escribe tu respuesta.'); }
      };

      // respuestas sugeridas (ayuda: puntaje menor)
      P.querySelector('#cv-help').onclick = () => {
        const box = P.querySelector('#cv-sug'); box.hidden = false; P.querySelector('#cv-help').disabled = true;
        box.innerHTML = '<p class="small muted">Ayuda: si eliges una sugerencia, la parte hablada vale como máximo el 60 %.</p>' + mezclar(caso.opciones.map((x, k) => ({ x, k }))).map(({ x, k }) => `<button type="button" class="btn" data-s="${k}">${esc(x.t)}</button>`).join('');
        box.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { s.sugerida = caso.opciones[+b.dataset.s]; responder(); });
      };
      P.querySelector('#cv-send').onclick = () => {
        s.texto = P.querySelector('#cv-txt').value.trim();
        if (s.texto.split(/\s+/).filter(Boolean).length < 4) { o.toast?.('Responde con al menos una frase completa (o usa el micrófono).'); P.querySelector('#cv-txt').focus(); return; }
        responder();
      };

      function responder() {
        if (rec) { try { rec.stop(); } catch (e) { /* ya detenido */ } }
        if (!s.acciones.length) { o.toast?.('Primero actúa: toca al menos una acción en la escena.'); return; }
        P.querySelectorAll('#cv-talk button, #cv-talk textarea').forEach(x => x.disabled = true);
        // evaluación de la parte hablada
        let habla, cubiertos = [], evitados = [];
        if (s.sugerida) { habla = s.sugerida.p / 2 * 0.6; s.texto = s.sugerida.t; }
        else {
          const t = norm(s.texto);
          cubiertos = v.conceptos.map(k => k.claves.some(cl => contiene(t, cl)));
          evitados = (v.evitar || []).filter(e => e.claves.some(cl => contieneSinNegar(t, cl)));
          habla = cubiertos.filter(Boolean).length / v.conceptos.length - evitados.length * 0.35;
          if (s.texto.split(/\s+/).length < 7) habla = Math.min(habla, 0.6);
          habla = Math.max(0, Math.min(1, habla));
        }
        const accion = s.acciones.reduce((a, x) => a + x.p / 2, 0) / s.acciones.length;
        const puntos = Math.round(accion * 40 + habla * 60);
        efecto({ confianza: (habla - 0.5) * 30, tension: -(habla - 0.5) * 30 }); refrescar();
        // reacción del personaje según la calidad de la respuesta
        const nivel = puntos >= 70 ? 2 : puntos >= 40 ? 1 : 0;
        const op = caso.opciones.find(x => x.p === nivel) || caso.opciones[0];
        burbuja(say(op.r));
        o.speak(op.r.replace(/^\(.*\)$/, ''), c.persona.pitch);
        st.curva.push(Math.round(st.conf));
        st.log.push({ dice: caso.dice, acciones: s.acciones, texto: s.texto, sugerida: !!s.sugerida, cubiertos, evitados, puntos, fb: (caso.opciones.find(x => x.p === 2) || {}).fb, modelo: v.modelo, conceptos: v.conceptos });
        const color = puntos >= 70 ? 'var(--ok)' : puntos >= 40 ? 'var(--warn)' : 'var(--bad)';
        P.querySelector('#cv-result').innerHTML = `
          <div class="case-fb cv-eval" style="border-color:${color}">
            <b style="color:${color}">${puntos >= 70 ? 'Muy bien manejado' : puntos >= 40 ? 'Manejo parcialmente adecuado' : 'Manejo inadecuado'} · ${puntos}/100</b>
            <p class="small"><b>Tu respuesta:</b> “${esc(s.texto)}”${s.sugerida ? ' <i>(respuesta sugerida)</i>' : ''}</p>
            ${s.sugerida ? '' : `<ul class="cv-checks">${v.conceptos.map((k, j) => `<li class="${cubiertos[j] ? 'ok' : 'no'}">${cubiertos[j] ? '✔' : '✘'} ${esc(k.n)}</li>`).join('')}${evitados.map(e => `<li class="no">⚠️ ${esc(e.fb)}</li>`).join('')}</ul>`}
            <p class="small"><b>Así podrías decirlo:</b> “${esc(v.modelo)}”</p>
            <p class="small muted">${esc((caso.opciones.find(x => x.p === 2) || {}).fb || '')}</p>
          </div>
          <button type="button" class="btn ${btn}" id="cv-next">${st.i + 1 < c.pasos.length ? 'Siguiente escena ▶' : 'Ver resultado'}</button>`;
        P.querySelector('#cv-next').onclick = () => { st.i++; if (st.i < c.pasos.length) paso(); else fin(); window.scrollTo(0, 0); };
        P.querySelector('#cv-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function fin() {
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      const total = Math.round(st.log.reduce((a, l) => a + l.puntos, 0) / st.log.length);
      P.innerHTML = o.scoreHead(c.titulo, o.sub, total) + `
        <div class="kpis"><div class="kpi"><b>${Math.round(st.conf)}%</b><span>Confianza final de ${esc(c.persona.nombre)}</span></div><div class="kpi"><b>${Math.round(st.ten)}%</b><span>Tensión final</span></div><div class="kpi"><b>${st.log.filter(l => !l.sugerida).length}/${st.log.length}</b><span>Respuestas propias (sin ayuda)</span></div></div>
        <div class="card"><h2>Tu actuación, escena por escena</h2><ol class="cv-log">${st.log.map((l, i) => `
          <li><p class="small muted">${l.dice.startsWith('(') ? esc(l.dice.slice(1, -1)) : esc(c.persona.nombre) + ': “' + esc(l.dice) + '”'}</p>
            <p><b>Acciones:</b> ${l.acciones.map(a => `${a.p === 2 ? '✔' : a.p === 1 ? '◐' : '✘'} ${a.icono} ${esc(a.t)}`).join(' · ')}</p>
            <p><b>Dijiste:</b> “${esc(l.texto)}”${l.sugerida ? ' <i>(sugerida)</i>' : ''} — <b>${l.puntos}/100</b></p>
            ${l.sugerida ? '' : `<p class="small">${l.conceptos.map((k, j) => `${l.cubiertos[j] ? '✔' : '✘'} ${esc(k.n)}`).join(' · ')}</p>`}
            <p class="small muted">Modelo: “${esc(l.modelo)}”</p></li>`).join('')}</ol></div>
        <div class="report-actions"><button class="btn ${btn}" id="cv-again">🔁 Repetir el caso</button><button class="btn" id="cv-list">🤝 Otros casos</button><button class="btn" id="cv-menu">🏠 Menú principal</button></div>`;
      P.querySelector('#cv-again').onclick = () => play(c, o);
      P.querySelector('#cv-list').onclick = o.onList;
      P.querySelector('#cv-menu').onclick = o.onMenu;
      o.onEnd(total);
      window.scrollTo(0, 0);
    }

    paso(); window.scrollTo(0, 0);
    return true;
  }

  window.CasoVivo = { play, _norm: norm, _contiene: contiene, _contieneSinNegar: contieneSinNegar };
})();
