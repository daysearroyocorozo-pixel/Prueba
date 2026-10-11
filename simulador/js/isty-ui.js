/* =========================================================
   Capa visual profesional del Laboratorio Virtual ISTY
   (común a los simuladores y al portal):
   1. Personajes ilustrados: cada emoji de persona (👩🏽‍💼, 👴🏽,
      👷, 🤰🏽…) se reemplaza por un retrato vectorial con tono de
      piel, peinado, edad y vestimenta según su rol. Mueven la
      boca mientras hablan (clase .isty-talking en un ancestro).
   2. Íconos profesionales: los emojis de objetos y acciones de la
      interfaz se reemplazan por íconos Lucide (vendor/isty-icon-data.js).
   3. Sonido: efectos de interfaz y ambiente según la escena
      (Web Audio, sin archivos). Respeta el botón de sonido.
   El reemplazo es automático (MutationObserver), así que funciona
   con todo el contenido que generan los simuladores.
   ========================================================= */
(function () {
  'use strict';
  if (window.IstyUI) return;
  const ICONS = window.ISTY_ICON_DATA || { map: {}, icons: {} };

  /* ---------------- utilidades ---------------- */
  const hash = s => { let h = 2166136261; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('es', { granularity: 'grapheme' }) : null;
  const graphemes = s => seg ? [...seg.segment(s)].map(x => x.segment) : Array.from(s);
  const EMOJI_RE = /\p{Extended_Pictographic}/u;

  /* ---------------- personajes ---------------- */
  const SKIN = { '🏻': '#F6D5B8', '🏼': '#E9BC93', '🏽': '#C98E62', '🏾': '#9A6643', '🏿': '#6A432B' };
  const SKIN_LIST = ['#E9BC93', '#C98E62', '#C98E62', '#B07A52', '#9A6643'];
  const PERSON_BASE = new Set(['👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓', '👴', '👵', '👮', '🕵', '💂', '👷', '🤴', '👸', '👳', '👲', '🧕', '🤵', '👰', '🤰', '🙋', '🙅', '🙆', '💁', '🙇', '🤦', '🤷', '🙎', '🙍', '🧍', '🧎', '🚶', '🏃', '👤', '🕴', '🧏', '🫅', '🧑‍🤝‍🧑']);
  function parsePerson(g) {
    const cps = [...g];
    const base = cps[0];
    if (!PERSON_BASE.has(base)) return null;
    const p = { g, skin: null, gender: null, age: 'adult', role: null, hair: null, beard: false, pregnant: false, wheel: false };
    for (const c of cps) if (SKIN[c]) p.skin = SKIN[c];
    if ('👨👴👦🧔🤴🤵💂'.includes(base)) p.gender = 'm';
    if ('👩👵👧🤰👸👰🧕'.includes(base)) p.gender = 'f';
    if (g.includes('♂')) p.gender = 'm';
    if (g.includes('♀')) p.gender = 'f';
    if ('👴👵🧓'.includes(base)) p.age = 'old';
    if ('👦👧🧒'.includes(base)) p.age = 'child';
    if (base === '👶') p.age = 'baby';
    if (base === '🧔') p.beard = true;
    if (base === '🤰') p.pregnant = true;
    if (base === '👮') p.role = 'police';
    if (base === '👷') p.role = 'worker';
    if (base === '🕵' || base === '🕴' || base === '🤵') p.role = 'suit';
    if (base === '💂') p.role = 'guard';
    if (base === '🧕') p.role = 'hijab';
    if (base === '👤') p.role = 'silhouette';
    const z = g.split('‍').slice(1).join('');
    const R = [['⚕', 'doctor'], ['🏫', 'teacher'], ['🎓', 'student'], ['🌾', 'farmer'], ['🍳', 'chef'], ['🔧', 'mechanic'], ['🏭', 'worker'], ['💼', 'office'], ['🔬', 'scientist'], ['💻', 'tech'], ['🎤', 'singer'], ['🎨', 'artist'], ['✈', 'pilot'], ['🚀', 'pilot'], ['🚒', 'firefighter'], ['⚖', 'judge'], ['👨‍🍼', 'office']];
    for (const [k, r] of R) if (z.includes(k)) p.role = r;
    if (z.includes('🦽') || z.includes('🦼')) p.wheel = true;
    if (z.includes('🦱')) p.hair = 'curly';
    if (z.includes('🦰')) p.hair = 'red';
    if (z.includes('🦳')) p.hair = 'white';
    if (z.includes('🦲')) p.hair = 'bald';
    if (base === '👱') p.hair = 'blond';
    const h = hash(g);
    if (!p.skin) p.skin = SKIN_LIST[h % SKIN_LIST.length];
    if (!p.gender) p.gender = h % 2 ? 'f' : 'm';
    return p;
  }
  const shade = (hex, f) => { const n = parseInt(hex.slice(1), 16); const r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f); return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0')).join(''); };
  const ROLE_STYLE = {
    doctor: { top: '#F4F7FA', acc: '#2E8B9A', bg: '#DDF1F3' }, teacher: { top: '#7C5A3C', acc: '#F2E8D5', bg: '#F6EBD9' },
    student: { top: '#2E8B2E', acc: '#F2E21B', bg: '#E6F3DE' }, farmer: { top: '#8A6A3B', acc: '#D9B26A', bg: '#F1E7D2' },
    chef: { top: '#FFFFFF', acc: '#D1D5DB', bg: '#F3F4F6' }, mechanic: { top: '#2F4A6B', acc: '#F59E0B', bg: '#E2E8F0' },
    worker: { top: '#F97316', acc: '#FDE047', bg: '#FFEDD5' }, office: { top: '#1F3A5F', acc: '#FFFFFF', bg: '#E3EAF3' },
    suit: { top: '#1F2937', acc: '#FFFFFF', bg: '#E5E7EB' }, scientist: { top: '#F4F7FA', acc: '#6366F1', bg: '#E0E7FF' },
    tech: { top: '#334155', acc: '#22D3EE', bg: '#E0F2FE' }, singer: { top: '#9D174D', acc: '#FBCFE8', bg: '#FCE7F3' },
    artist: { top: '#7C3AED', acc: '#FDE68A', bg: '#EDE9FE' }, pilot: { top: '#1E3A8A', acc: '#FACC15', bg: '#DBEAFE' },
    firefighter: { top: '#B45309', acc: '#FDE047', bg: '#FEF3C7' }, judge: { top: '#111827', acc: '#FFFFFF', bg: '#E5E7EB' },
    police: { top: '#1E3A5F', acc: '#93C5FD', bg: '#DBEAFE' }, guard: { top: '#1F2937', acc: '#FACC15', bg: '#E5E7EB' },
    hijab: { top: '#0F766E', acc: '#99F6E4', bg: '#CCFBF1' }
  };
  const CASUAL = ['#2E8B2E', '#2563EB', '#DB2777', '#7C3AED', '#EA580C', '#0D9488', '#CA8A04', '#4B5563'];
  const HAIR = ['#1F1611', '#2B1D14', '#3B2A1E', '#24180F', '#4A3324'];

  function avatarSVG(g, extra = '') {
    const p = parsePerson(g); if (!p) return null;
    const h = hash(g);
    const st = ROLE_STYLE[p.role] || { top: CASUAL[h % CASUAL.length], acc: '#FFFFFF', bg: ['#E6F3DE', '#E0F2FE', '#FCE7F3', '#FEF3C7', '#EDE9FE'][h % 5] };
    const skin = p.skin, skinD = shade(skin, 0.86);
    let hair = p.hair === 'red' ? '#A5442A' : p.hair === 'blond' ? '#D9A441' : p.hair === 'white' || p.age === 'old' ? '#D9D9D9' : HAIR[h % HAIR.length];
    const id = 'a' + h.toString(36) + Math.floor(Math.random() * 1e6).toString(36);
    const child = p.age === 'child' || p.age === 'baby';
    const hy = child ? 47 : 44, hr = child ? 17 : 16, hry = child ? 18 : 19;
    let s = `<svg class="isty-avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`;
    s += `<defs><clipPath id="${id}c"><circle cx="50" cy="50" r="50"/></clipPath><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
    s += `<g clip-path="url(#${id}c)"><rect width="100" height="100" fill="${st.bg}"/><circle cx="50" cy="30" r="45" fill="url(#${id}g)"/>`;
    if (p.role === 'silhouette') { s += `<circle cx="50" cy="40" r="17" fill="#94A3B8"/><path d="M14 104 Q18 66 50 64 Q82 66 86 104Z" fill="#94A3B8"/></g></svg>`; return s; }
    // cabello largo detrás
    const longHair = p.gender === 'f' && p.hair !== 'bald' && p.role !== 'hijab' && p.age !== 'old' && (h % 4 !== 0);
    if (longHair) s += `<path d="M${50 - hr - 4} ${hy - 4} Q${50 - hr - 6} ${hy + 26} ${50 - hr + 2} ${hy + 30} L${50 + hr - 2} ${hy + 30} Q${50 + hr + 6} ${hy + 26} ${50 + hr + 4} ${hy - 4}Z" fill="${hair}"/>`;
    if (p.role === 'hijab') s += `<path d="M${50 - hr - 6} ${hy + 2} Q50 ${hy - hry - 12} ${50 + hr + 6} ${hy + 2} L${50 + hr + 8} ${hy + 34} L${50 - hr - 8} ${hy + 34}Z" fill="${st.top}"/>`;
    // cuerpo
    const belly = p.pregnant ? `<ellipse cx="52" cy="98" rx="22" ry="14" fill="${shade(st.top, 1.08)}"/>` : '';
    s += `<path d="M10 104 Q12 74 50 70 Q88 74 90 104Z" fill="${st.top}"/>${belly}`;
    if (p.role === 'office' || p.role === 'suit' || p.role === 'judge') s += `<path d="M40 71 L50 86 L60 71Z" fill="${st.acc}"/><path d="M48 76 L50 92 L52 76Z" fill="${p.role === 'office' ? '#B91C1C' : '#374151'}"/>`;
    if (p.role === 'doctor' || p.role === 'scientist') s += `<path d="M41 71 L50 84 L59 71Z" fill="${p.role === 'doctor' ? '#5FB3C0' : '#C7D2FE'}"/><path d="M36 78 Q36 92 44 92" stroke="#374151" stroke-width="1.6" fill="none"/>${p.role === 'doctor' ? '<circle cx="44" cy="93" r="2.4" fill="#9CA3AF"/>' : ''}`;
    if (p.role === 'worker' || p.role === 'firefighter') s += `<rect x="12" y="86" width="76" height="4" fill="${st.acc}"/><rect x="12" y="95" width="76" height="4" fill="${st.acc}"/>`;
    if (p.role === 'police' || p.role === 'guard') s += `<circle cx="38" cy="84" r="3" fill="${st.acc}"/><path d="M44 72 L50 80 L56 72" stroke="#E5E7EB" stroke-width="2" fill="none"/>`;
    if (p.role === 'teacher') s += `<path d="M42 71 L50 82 L58 71Z" fill="${st.acc}"/>`;
    if (p.role === 'chef') s += `<circle cx="46" cy="82" r="1.6" fill="#9CA3AF"/><circle cx="54" cy="82" r="1.6" fill="#9CA3AF"/><circle cx="46" cy="90" r="1.6" fill="#9CA3AF"/><circle cx="54" cy="90" r="1.6" fill="#9CA3AF"/>`;
    if (p.role === 'tech') s += `<rect x="58" y="80" width="14" height="10" rx="1.5" fill="${st.acc}" opacity=".85"/>`;
    // cuello y cabeza
    s += `<rect x="44" y="${hy + 12}" width="12" height="12" rx="4" fill="${skinD}"/>`;
    s += `<ellipse cx="${50 - hr}" cy="${hy + 2}" rx="3" ry="4.5" fill="${skinD}"/><ellipse cx="${50 + hr}" cy="${hy + 2}" rx="3" ry="4.5" fill="${skinD}"/>`;
    s += `<ellipse cx="50" cy="${hy}" rx="${hr}" ry="${hry}" fill="${skin}"/>`;
    // cabello
    if (p.role !== 'hijab' && p.hair !== 'bald') {
      if (p.hair === 'curly') { for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i * 0.11); s += `<circle cx="${50 + Math.cos(a) * (hr + 1)}" cy="${hy - 2 + Math.sin(a) * (hry + 1)}" r="6.5" fill="${hair}"/>`; } }
      else if (p.age === 'old' && p.gender === 'm') s += `<path d="M${50 - hr} ${hy - 2} Q${50 - hr} ${hy - hry + 2} ${50 - hr + 6} ${hy - hry + 6} M${50 + hr} ${hy - 2} Q${50 + hr} ${hy - hry + 2} ${50 + hr - 6} ${hy - hry + 6}" stroke="${hair}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      else if (p.gender === 'f') s += `<path d="M${50 - hr - 1} ${hy + 2} Q${50 - hr - 2} ${hy - hry - 6} 50 ${hy - hry - 4} Q${50 + hr + 2} ${hy - hry - 6} ${50 + hr + 1} ${hy + 2} Q${50 + hr - 2} ${hy - hry + 6} ${50 + 4} ${hy - hry + 7} Q${50 - 8} ${hy - hry + 4} ${50 - hr + 2} ${hy - 1}Z" fill="${hair}"/>${p.age === 'old' ? `<circle cx="50" cy="${hy - hry - 4}" r="6" fill="${hair}"/>` : ''}`;
      else s += `<path d="M${50 - hr - 1} ${hy} Q${50 - hr - 1} ${hy - hry - 5} 50 ${hy - hry - 3} Q${50 + hr + 1} ${hy - hry - 5} ${50 + hr + 1} ${hy} Q${50 + hr - 3} ${hy - hry + 5} 50 ${hy - hry + 6} Q${50 - hr + 3} ${hy - hry + 5} ${50 - hr - 1} ${hy}Z" fill="${hair}"/>`;
    }
    // cascos y gorras
    if (p.role === 'worker') s += `<path d="M${50 - hr - 4} ${hy - 7} Q50 ${hy - hry - 16} ${50 + hr + 4} ${hy - 7}Z" fill="#FACC15"/><rect x="${50 - hr - 7}" y="${hy - 8}" width="${2 * hr + 14}" height="4" rx="2" fill="#EAB308"/>`;
    if (p.role === 'firefighter') s += `<path d="M${50 - hr - 4} ${hy - 6} Q50 ${hy - hry - 17} ${50 + hr + 4} ${hy - 6}Z" fill="#B91C1C"/><rect x="${50 - hr - 8}" y="${hy - 7}" width="${2 * hr + 16}" height="4" rx="2" fill="#7F1D1D"/><rect x="47" y="${hy - hry - 8}" width="6" height="8" rx="1" fill="#FACC15"/>`;
    if (p.role === 'police' || p.role === 'guard' || p.role === 'pilot') s += `<path d="M${50 - hr - 2} ${hy - 8} Q50 ${hy - hry - 12} ${50 + hr + 2} ${hy - 8}Z" fill="${st.top}"/><rect x="${50 - hr - 4}" y="${hy - 9}" width="${2 * hr + 8}" height="4" rx="2" fill="#111827"/><circle cx="50" cy="${hy - 13}" r="2.4" fill="#FACC15"/>`;
    if (p.role === 'farmer') s += `<ellipse cx="50" cy="${hy - 9}" rx="${hr + 12}" ry="4.5" fill="#D9B26A"/><path d="M${50 - hr + 2} ${hy - 9} Q50 ${hy - hry - 12} ${50 + hr - 2} ${hy - 9}Z" fill="#C89B4C"/>`;
    if (p.role === 'chef') s += `<rect x="${50 - 12}" y="${hy - hry - 12}" width="24" height="14" rx="6" fill="#FFFFFF" stroke="#E5E7EB"/>`;
    // rostro
    const ey = hy + 1;
    s += `<path d="M${43 - 4} ${ey - 6} q4 -2 8 0 M${57 - 4} ${ey - 6} q4 -2 8 0" stroke="${shade(hair === '#D9D9D9' ? '#8B8B8B' : hair, 1)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
    s += `<ellipse cx="43" cy="${ey}" rx="1.9" ry="2.3" fill="#1F2937"/><ellipse cx="57" cy="${ey}" rx="1.9" ry="2.3" fill="#1F2937"/><circle cx="43.6" cy="${ey - 0.8}" r=".6" fill="#fff"/><circle cx="57.6" cy="${ey - 0.8}" r=".6" fill="#fff"/>`;
    if (p.age === 'old' || p.role === 'scientist' || p.role === 'tech' || (h % 7 === 0 && !child)) s += `<g stroke="#374151" stroke-width="1.2" fill="none"><circle cx="43" cy="${ey}" r="4.6"/><circle cx="57" cy="${ey}" r="4.6"/><path d="M47.6 ${ey} h4.8"/></g>`;
    s += `<path d="M50 ${ey + 2} q-1.6 4 0.6 5" stroke="${shade(skin, 0.75)}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
    s += `<circle cx="40" cy="${ey + 7}" r="2.6" fill="#F28B82" opacity=".25"/><circle cx="60" cy="${ey + 7}" r="2.6" fill="#F28B82" opacity=".25"/>`;
    if (p.beard) s += `<path d="M${50 - hr + 1} ${hy + 2} Q${50 - hr + 2} ${hy + hry + 4} 50 ${hy + hry + 5} Q${50 + hr - 2} ${hy + hry + 4} ${50 + hr - 1} ${hy + 2} Q${50 + hr - 4} ${hy + 10} 50 ${hy + 10} Q${50 - hr + 4} ${hy + 10} ${50 - hr + 1} ${hy + 2}Z" fill="${hair}"/>`;
    s += `<g class="isty-mouth" style="transform-origin:50px ${ey + 11}px"><path d="M45 ${ey + 10} Q50 ${ey + 14} 55 ${ey + 10}" stroke="#9F3A38" stroke-width="1.8" fill="${p.beard ? 'none' : '#B4544F'}" stroke-linecap="round"/></g>`;
    if (p.wheel) s += `<circle cx="80" cy="84" r="11" fill="none" stroke="#1F2937" stroke-width="3"/><circle cx="80" cy="84" r="2" fill="#1F2937"/>`;
    s += `</g>${extra}</svg>`;
    return s;
  }

  // personaje de cuerpo entero (para escenas): cabeza del retrato + cuerpo ilustrado
  function figureSVG(g) {
    const p = parsePerson(g); if (!p) return null;
    const h = hash(g);
    const st = ROLE_STYLE[p.role] || { top: CASUAL[h % CASUAL.length], acc: '#FFFFFF' };
    const bust = avatarSVG(g); if (!bust) return null;
    const head = bust.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/<rect width="100" height="100"[^>]*\/>/, '').replace(/<circle cx="50" cy="30" r="45"[^>]*\/>/, '').replace(/clip-path="url\([^)]*\)"/, '');
    const pants = ['#1F2937', '#374151', '#1E3A5F', '#3F3F46', '#44403C'][h % 5];
    const child = p.age === 'child' || p.age === 'baby';
    const skirt = p.gender === 'f' && h % 3 === 0 && !['worker', 'firefighter', 'police', 'mechanic'].includes(p.role);
    const skin = p.skin, top = st.top;
    let b = `<svg class="isty-figure-svg" viewBox="0 0 100 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="50" cy="224" rx="30" ry="5" fill="#000" opacity=".15"/>`;
    if (p.wheel) {
      b += `<circle cx="50" cy="196" r="26" fill="none" stroke="#1F2937" stroke-width="5"/><circle cx="50" cy="196" r="3" fill="#1F2937"/><rect x="28" y="150" width="46" height="8" rx="3" fill="#374151"/><rect x="66" y="112" width="6" height="44" rx="3" fill="#374151"/>`;
      b += `<path d="M30 150 L30 174 L44 176 L44 158Z" fill="${pants}"/><rect x="26" y="172" width="20" height="7" rx="3" fill="#111827"/>`;
    } else if (skirt) {
      b += `<rect x="38" y="${child ? 168 : 160}" width="9" height="56" rx="4" fill="${skin}"/><rect x="53" y="${child ? 168 : 160}" width="9" height="56" rx="4" fill="${skin}"/><path d="M30 128 L70 128 L76 174 L24 174Z" fill="${pants}"/>`;
      b += `<ellipse cx="42" cy="221" rx="9" ry="4.5" fill="#111827"/><ellipse cx="58" cy="221" rx="9" ry="4.5" fill="#111827"/>`;
    } else {
      b += `<path d="M33 128 L49 128 L48 218 L35 218Z" fill="${pants}"/><path d="M51 128 L67 128 L65 218 L52 218Z" fill="${shade(pants, 0.9)}"/>`;
      b += `<ellipse cx="40" cy="220" rx="10" ry="5" fill="#111827"/><ellipse cx="60" cy="220" rx="10" ry="5" fill="#111827"/>`;
    }
    // torso y brazos
    b += `<path d="M24 74 Q50 62 76 74 L74 134 Q50 140 26 134Z" fill="${top}"/>`;
    if (p.pregnant) b += `<ellipse cx="54" cy="112" rx="22" ry="20" fill="${shade(top, 1.08)}"/>`;
    b += `<path d="M24 76 Q14 100 18 132" stroke="${top}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M76 76 Q86 100 82 132" stroke="${shade(top, 0.92)}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
    b += `<circle cx="18" cy="136" r="6" fill="${skin}"/><circle cx="82" cy="136" r="6" fill="${skin}"/>`;
    if (p.role === 'worker' || p.role === 'firefighter') b += `<rect x="25" y="104" width="50" height="5" fill="${st.acc}"/><rect x="25" y="118" width="50" height="5" fill="${st.acc}"/>`;
    if (p.role === 'doctor' || p.role === 'scientist') b += `<path d="M44 74 L50 92 L56 74" fill="${p.role === 'doctor' ? '#5FB3C0' : '#C7D2FE'}"/><path d="M40 80 Q38 104 46 106" stroke="#374151" stroke-width="2" fill="none"/>`;
    if (p.role === 'office' || p.role === 'suit' || p.role === 'judge') b += `<path d="M42 72 L50 92 L58 72Z" fill="#fff"/><path d="M48.5 78 L50 104 L51.5 78Z" fill="${p.role === 'office' ? '#B91C1C' : '#374151'}"/>`;
    if (p.role === 'police' || p.role === 'guard') b += `<rect x="25" y="128" width="50" height="6" fill="#111827"/><circle cx="36" cy="92" r="3.5" fill="${st.acc}"/>`;
    // cabeza (retrato sin fondo), escalada y situada arriba
    b += `<g transform="translate(14 -4) scale(.72)">${head}</g></svg>`;
    return b;
  }

  // colores del personaje para la escena 3D
  function personStyle(g) {
    const p = parsePerson(g); if (!p) return null;
    const h = hash(g);
    const st = ROLE_STYLE[p.role] || { top: CASUAL[h % CASUAL.length], acc: '#FFFFFF' };
    const hair = p.hair === 'red' ? '#A5442A' : p.hair === 'blond' ? '#D9A441' : p.hair === 'white' || p.age === 'old' ? '#D9D9D9' : HAIR[h % HAIR.length];
    return { p, h, top: st.top, acc: st.acc, skin: p.skin, hair, pants: ['#1F2937', '#374151', '#1E3A5F', '#3F3F46', '#44403C'][h % 5],
      longHair: p.gender === 'f' && p.hair !== 'bald' && p.role !== 'hijab' && p.age !== 'old' && (h % 4 !== 0),
      skirt: p.gender === 'f' && h % 3 === 0 && !['worker', 'firefighter', 'police', 'mechanic'].includes(p.role),
      glasses: p.age === 'old' || p.role === 'scientist' || p.role === 'tech' || (h % 7 === 0 && p.age !== 'child' && p.age !== 'baby') };
  }

  function iconSVG(g) {
    const name = ICONS.map[g] || ICONS.map[g.replace(/️/g, '')] || ICONS.map[g + '️'];
    if (!name || !ICONS.icons[name]) return null;
    return `<svg class="isty-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.icons[name]}</svg>`;
  }

  /* ---------------- reemplazo automático ---------------- */
  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'OPTION', 'SELECT', 'TITLE', 'CODE', 'PRE', 'NOSCRIPT']);
  const SVGNS = 'http://www.w3.org/2000/svg';
  function skipEl(el) {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      if (SKIP.has(e.tagName) || (e.classList && (e.classList.contains('isty-keep-emoji') || e.classList.contains('isty-av') || e.classList.contains('isty-ic')))) return true;
    }
    return false;
  }
  function processText(node) {
    const t = node.nodeValue; if (!t || !EMOJI_RE.test(t)) return;
    const parent = node.parentNode; if (!parent || skipEl(parent)) return;
    if (parent.namespaceURI === SVGNS) return processSvgText(parent);
    const parts = graphemes(t);
    let changed = false; const frag = document.createDocumentFragment(); let buf = '';
    for (const g of parts) {
      if (!EMOJI_RE.test(g)) { buf += g; continue; }
      const av = avatarSVG(g), ic = av ? null : iconSVG(g);
      if (!av && !ic) { buf += g; continue; }
      if (buf) { frag.appendChild(document.createTextNode(buf)); buf = ''; }
      const span = document.createElement('span');
      span.className = av ? 'isty-av' : 'isty-ic';
      span.setAttribute('data-emoji', g);
      span.setAttribute('role', 'img');
      span.setAttribute('aria-label', av ? 'personaje' : (ICONS.map[g] || ICONS.map[g.replace(/️/g, '')] || '').replace(/-/g, ' '));
      span.innerHTML = av || ic;
      frag.appendChild(span); changed = true;
    }
    if (!changed) return;
    if (buf) frag.appendChild(document.createTextNode(buf));
    parent.replaceChild(frag, node);
  }
  // emojis de personas dentro de escenas SVG (<text>): se dibujan como retrato
  function processSvgText(textEl) {
    if (textEl.tagName.toLowerCase() !== 'text' || textEl.dataset.istyDone) return;
    const g = textEl.textContent.trim();
    if (!g || graphemes(g).length !== 1) return;
    let av = avatarSVG(g);
    if (!av) { const ic = iconSVG(g); if (!ic) return; av = ic.replace('<svg class="isty-icon-svg"', '<svg class="isty-icon-svg" color="' + (textEl.getAttribute('fill') && textEl.getAttribute('fill') !== '#fff' ? textEl.getAttribute('fill') : '#1B4D22') + '"'); }
    textEl.dataset.istyDone = '1';
    const fs = parseFloat(textEl.getAttribute('font-size') || '24');
    const x = parseFloat(textEl.getAttribute('x') || '0'), y = parseFloat(textEl.getAttribute('y') || '0');
    const anchor = textEl.getAttribute('text-anchor');
    const size = fs * 1.05;
    const nx = anchor === 'middle' ? x - size / 2 : anchor === 'end' ? x - size : x;
    const holder = document.createElementNS(SVGNS, 'g');
    holder.setAttribute('class', 'isty-av-svg');
    holder.innerHTML = av.replace('<svg ', `<svg x="${nx}" y="${y - size * 0.88}" width="${size}" height="${size}" `);
    if (textEl.getAttribute('opacity')) holder.setAttribute('opacity', textEl.getAttribute('opacity'));
    textEl.replaceWith(holder);
  }
  function walk(root) {
    if (root.nodeType === 3) return processText(root);
    if (root.nodeType !== 1 || SKIP.has(root.tagName)) return;
    if (root.namespaceURI === SVGNS) { root.querySelectorAll && root.querySelectorAll('text').forEach(processSvgText); if (root.tagName.toLowerCase() === 'text') processSvgText(root); return; }
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const list = []; let n; while ((n = tw.nextNode())) if (EMOJI_RE.test(n.nodeValue)) list.push(n);
    list.forEach(processText);
    root.querySelectorAll && root.querySelectorAll('svg text').forEach(processSvgText);
  }
  let pending = new Set(), scheduled = false;
  function flush() { scheduled = false; const items = [...pending]; pending.clear(); items.forEach(n => { if (n.isConnected) walk(n); }); }
  const obs = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === 'characterData') pending.add(m.target);
      m.addedNodes && m.addedNodes.forEach(n => pending.add(n));
    }
    if (!scheduled) { scheduled = true; requestAnimationFrame(flush); }
  });
  function start() { walk(document.body); obs.observe(document.body, { childList: true, subtree: true, characterData: true }); }

  /* ---------------- boca en movimiento al hablar ---------------- */
  if ('speechSynthesis' in window && !speechSynthesis.__isty) {
    const orig = speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.__isty = true;
    speechSynthesis.speak = function (u) {
      try {
        const on = () => document.body.classList.add('isty-talking');
        const off = () => document.body.classList.remove('isty-talking');
        u.addEventListener('start', on); u.addEventListener('end', off); u.addEventListener('error', off);
      } catch (e) { /* sin eventos */ }
      return orig(u);
    };
  }

  /* ---------------- sonido ---------------- */
  let ctx = null, master = null, amb = null, ambKind = null;
  const muted = () => { const b = document.getElementById('btn-sound'); if (!b) return false; const e = b.querySelector('[data-emoji]'); const t = (e ? e.dataset.emoji : b.textContent) || ''; return t.includes('🔇'); };
  function audio() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
    return ctx;
  }
  function tone(freq, dur, type = 'sine', vol = 0.12, when = 0, slide = 0) {
    const c = audio(); if (!c || muted()) return;
    const t = c.currentTime + when, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
  }
  const SFX = {
    click: () => tone(880, 0.06, 'triangle', 0.05),
    ok: () => { tone(660, 0.12, 'sine', 0.1); tone(990, 0.18, 'sine', 0.09, 0.09); },
    bad: () => { tone(220, 0.22, 'square', 0.05); tone(165, 0.25, 'square', 0.04, 0.08); },
    mid: () => tone(520, 0.16, 'triangle', 0.07),
    alert: () => { tone(740, 0.12, 'sawtooth', 0.04); tone(740, 0.12, 'sawtooth', 0.04, 0.18); },
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 'sine', 0.09, i * 0.1))
  };
  function noiseBuffer(c) { const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); let last = 0; for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } return b; }
  function stopAmbient() { if (amb) { try { amb.stop(); } catch (e) { /* ya detenido */ } amb = null; ambKind = null; } }
  function ambient(kind) {
    if (kind === ambKind) return;
    stopAmbient(); if (!kind || muted()) return;
    const c = audio(); if (!c) return;
    const g = c.createGain(); g.gain.value = 0; g.connect(master); g.gain.linearRampToValueAtTime(0.18, c.currentTime + 1.5);
    const nodes = []; let timer = null;
    const src = c.createBufferSource(); src.buffer = noiseBuffer(c); src.loop = true;
    const f = c.createBiquadFilter();
    const cfg = { aula: ['bandpass', 600, 0.5], oficina: ['lowpass', 380, 0.35], obra: ['lowpass', 260, 0.55], emergencia: ['bandpass', 900, 0.45], exterior: ['highpass', 2500, 0.18], comunidad: ['highpass', 2200, 0.2], selva: ['highpass', 2600, 0.22], ciudad: ['lowpass', 500, 0.5], salud: ['lowpass', 420, 0.3], datos: ['lowpass', 180, 0.5], lluvia: ['highpass', 1200, 0.6] }[kind] || ['lowpass', 400, 0.3];
    f.type = cfg[0]; f.frequency.value = cfg[1];
    const v = c.createGain(); v.gain.value = cfg[2];
    src.connect(f); f.connect(v); v.connect(g); src.start(); nodes.push(src);
    const extra = () => {
      if (muted()) return;
      if (['exterior', 'comunidad', 'selva'].includes(kind) && Math.random() < 0.55) { const b = 2200 + Math.random() * 1800; for (let i = 0; i < 3; i++) tone(b + Math.random() * 400, 0.07, 'sine', 0.025, i * 0.09, 1.2); }
      if (kind === 'salud' && Math.random() < 0.6) tone(1046, 0.09, 'sine', 0.025);
      if (kind === 'emergencia' && Math.random() < 0.25) { tone(700, 0.6, 'sine', 0.018, 0, 1.4); tone(980, 0.6, 'sine', 0.018, 0.6, 0.7); }
      if (kind === 'oficina' && Math.random() < 0.3) tone(1800 + Math.random() * 500, 0.03, 'square', 0.008);
      if (kind === 'datos' && Math.random() < 0.4) tone(60, 0.8, 'sine', 0.03);
    };
    timer = setInterval(extra, 1600);
    amb = { stop() { clearInterval(timer); const t = c.currentTime; g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(0, t + 0.6); setTimeout(() => nodes.forEach(n => { try { n.stop(); } catch (e) { /* listo */ } }), 700); } };
    ambKind = kind;
  }
  // ambiente según la pantalla visible
  const CARRERA_AMB = { incendios: 'emergencia', construccion: 'obra', administracion: 'oficina', ia: 'datos', vigilancia: 'ciudad', salud: 'salud', turismo: 'selva' };
  function carrera() { const m = location.pathname.match(/\/simulador\/([a-z]+)\//); return m ? m[1] : (/\/simulador\//.test(location.pathname) ? 'egb' : ''); }
  function sceneAmbient() {
    if (!ctx) return;
    const stage = document.querySelector('.cv-stage');
    if (stage && stage.offsetParent) { const m = stage.className.match(/cv-([a-z]+)/g); const k = m && m.map(x => x.slice(3)).find(x => x !== 'stage'); return ambient(k === 'aula' ? 'aula' : k || 'oficina'); }
    const main = [...document.querySelectorAll('.screen')].find(s => !s.hidden && s.querySelector('#scene, #room, .stage'));
    if (main) { const c = carrera(); return ambient(c === 'egb' ? 'aula' : CARRERA_AMB[c] || 'oficina'); }
    stopAmbient();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('button, .btn, a.chip, a.module, .cv-prop');
    audio(); if (ctx && ctx.state === 'suspended') ctx.resume();
    if (b && !b.disabled) SFX.click();
    if (e.target.closest('#btn-sound')) setTimeout(() => { if (muted()) stopAmbient(); else { ambKind = null; sceneAmbient(); } }, 50);
    setTimeout(sceneAmbient, 120);
  }, true);
  // retroalimentación: sonido según el resultado mostrado
  const fbObs = new MutationObserver(muts => {
    for (const m of muts) for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue;
      const fb = n.matches && (n.matches('.case-fb') ? n : n.querySelector && n.querySelector('.case-fb'));
      if (fb) { const c = (fb.getAttribute('style') || '') + ' ' + (fb.innerHTML.slice(0, 200)); if (/--ok|✔|Correcto|adecuad[ao](?! par)|Muy bien/.test(c) && !/inadecuad|parcial/i.test(c)) SFX.ok(); else if (/--bad|✘|Incorrecto|inadecuad/i.test(c)) SFX.bad(); else SFX.mid(); return; }
      if (n.matches && n.matches('.report-head, .score')) { SFX.win(); return; }
      if (n.classList && n.classList.contains('toast')) SFX.alert();
    }
  });

  /* ---------------- transiciones de pantalla ---------------- */
  const scrObs = new MutationObserver(muts => { for (const m of muts) if (m.attributeName === 'hidden' && !m.target.hidden && m.target.classList.contains('screen')) { m.target.classList.remove('isty-enter'); void m.target.offsetWidth; m.target.classList.add('isty-enter'); } });

  function init() {
    start();
    fbObs.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll('.screen').forEach(s => scrObs.observe(s, { attributes: true, attributeFilter: ['hidden'] }));
    document.body.classList.add('isty-ui');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.IstyUI = { avatarSVG, figureSVG, iconSVG, parsePerson, personStyle, sfx: SFX, ambient, stopAmbient };
})();
