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

  /* fondos ilustrados de la escena */
  const FONDOS = {
    aula: `<rect width="600" height="300" fill="#fdf2d0"/><rect y="215" width="600" height="85" fill="#d9b98c"/><rect x="40" y="40" width="250" height="120" rx="6" fill="#2f5d45" stroke="#8a5a2b" stroke-width="8"/><text x="60" y="80" fill="#e8f5e9" font-size="18" font-family="Nunito">Bienvenidos 😊</text><rect x="330" y="55" width="70" height="90" fill="#bfe3f7" stroke="#8a5a2b" stroke-width="5"/><rect x="60" y="225" width="120" height="14" fill="#a0703f"/><rect x="230" y="232" width="120" height="14" fill="#a0703f"/>`,
    oficina: `<rect width="600" height="300" fill="#e3f0fa"/><rect y="215" width="600" height="85" fill="#c9ced6"/><rect x="40" y="45" width="140" height="95" fill="#bfe3f7" stroke="#64748b" stroke-width="6"/><line x1="110" y1="45" x2="110" y2="140" stroke="#64748b" stroke-width="4"/><rect x="210" y="60" width="110" height="130" fill="#e7d3b0" stroke="#8a6a3b" stroke-width="3"/><rect x="220" y="72" width="22" height="34" fill="#f59e0b"/><rect x="248" y="72" width="22" height="34" fill="#3b82f6"/><rect x="276" y="72" width="22" height="34" fill="#10b981"/><rect x="220" y="120" width="22" height="34" fill="#ef4444"/><rect x="40" y="200" width="300" height="20" fill="#8a6a3b"/><text x="350" y="120" font-size="34">🖥️</text>`,
    exterior: `<defs><linearGradient id="cvs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd3f5"/><stop offset="1" stop-color="#e6f6ff"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvs)"/><path d="M0 200 Q150 140 300 190 T600 180 V300 H0Z" fill="#7cbf5a"/><rect y="235" width="600" height="65" fill="#5f9e45"/><text x="40" y="215" font-size="52">🌳</text><text x="150" y="200" font-size="44">🏡</text><text x="330" y="205" font-size="40">🌴</text>`,
    comunidad: `<defs><linearGradient id="cvc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a7dcf5"/><stop offset="1" stop-color="#eef9ff"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvc)"/><path d="M0 190 Q200 130 400 185 T600 170 V300 H0Z" fill="#6fae4c"/><rect y="235" width="600" height="65" fill="#c9a26b"/><text x="30" y="210" font-size="48">🛖</text><text x="130" y="205" font-size="44">🌳</text><text x="230" y="215" font-size="46">🏠</text><text x="340" y="200" font-size="40">🌴</text>`,
    obra: `<defs><linearGradient id="cvo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bae6fd"/><stop offset="1" stop-color="#f0f9ff"/></linearGradient></defs><rect width="600" height="300" fill="url(#cvo)"/><rect y="225" width="600" height="75" fill="#a16207"/><rect y="225" width="600" height="7" fill="#65a30d"/><path d="M60 225 V70 M150 225 V70 M60 110 H150 M60 160 H150 M60 70 H150" stroke="#78716c" stroke-width="6"/><path d="M380 225 V40 H560 M380 60 L420 40" stroke="#eab308" stroke-width="7" fill="none"/><line x1="530" y1="40" x2="530" y2="120" stroke="#334155" stroke-width="2"/><text x="190" y="222" font-size="38">🧱</text><text x="260" y="222" font-size="38">🚧</text>`,
    emergencia: `<defs><linearGradient id="cve" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fcd9b6"/><stop offset="1" stop-color="#fff1e6"/></linearGradient></defs><rect width="600" height="300" fill="url(#cve)"/><rect y="225" width="600" height="75" fill="#6b7280"/><rect y="255" width="600" height="6" fill="#facc15"/><rect x="60" y="110" width="150" height="115" fill="#d6b48a"/><path d="M45 115 L135 55 L225 115Z" fill="#9a3412"/><text x="85" y="105" font-size="40">🔥</text><circle cx="120" cy="40" r="22" fill="#9ca3af" opacity=".6"/><circle cx="150" cy="25" r="18" fill="#9ca3af" opacity=".5"/><text x="250" y="222" font-size="56">🚒</text><text x="370" y="222" font-size="30">🚧</text>`
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
      const cara = P.querySelector('.cv-mood'); if (cara) cara.textContent = animo();
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
            <div class="cv-person" aria-label="${esc(c.persona.nombre)}"><span class="cv-av">${c.persona.avatar}</span><span class="cv-mood" aria-hidden="true">${animo()}</span><small>${esc(c.persona.nombre)}</small></div>
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
