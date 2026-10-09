/* =========================================================
   Motor de simulación de clase
   - Estudiantes virtuales con perfiles de aprendizaje
   - Estado dinámico: atención, comprensión, motivación
   - Acciones docentes organizadas según el ciclo de aprendizaje
     (Anticipación → Construcción → Consolidación)
   - Registro y evaluación del desempeño docente
   ========================================================= */

const PROFILES = {
  aplicado:    { etiqueta: 'Aplicado/a',          base: 0.85, part: 0.85, decay: 0.6, desc: 'Participa con frecuencia y suele acertar.' },
  timido:      { etiqueta: 'Tímido/a',            base: 0.70, part: 0.15, decay: 0.8, desc: 'Sabe, pero casi nunca levanta la mano.' },
  distraido:   { etiqueta: 'Se distrae',          base: 0.55, part: 0.45, decay: 1.8, desc: 'Pierde la atención con facilidad.' },
  conversador: { etiqueta: 'Conversador/a',       base: 0.55, part: 0.70, decay: 1.4, desc: 'Le gusta hablar con sus compañeros.' },
  curioso:     { etiqueta: 'Curioso/a',           base: 0.70, part: 0.75, decay: 0.9, desc: 'Hace muchas preguntas.' },
  apoyo:       { etiqueta: 'Requiere refuerzo',   base: 0.35, part: 0.35, decay: 1.1, desc: 'Necesita más explicación y paciencia.' },
  tdah:        { etiqueta: 'NEE · TDAH',          base: 0.55, part: 0.90, decay: 2.2, nee: true, desc: 'Responde de forma impulsiva; necesita pausas y consignas cortas.' },
  dislexia:    { etiqueta: 'NEE · Dislexia',      base: 0.50, part: 0.30, decay: 1.0, nee: true, desc: 'Le cuesta leer la pizarra; se beneficia de apoyo oral y visual.' },
  promedio:    { etiqueta: 'Promedio',            base: 0.60, part: 0.50, decay: 1.0, desc: 'Rendimiento regular.' }
};

const ROSTER = [
  { nombre: 'Sofía',   avatar: '👧🏽', perfil: 'aplicado',    pitch: 1.5 },
  { nombre: 'Mateo',   avatar: '👦🏻', perfil: 'distraido',   pitch: 1.2 },
  { nombre: 'Valeria', avatar: '👧🏻', perfil: 'timido',      pitch: 1.6 },
  { nombre: 'Kevin',   avatar: '👦🏾', perfil: 'tdah',        pitch: 1.3 },
  { nombre: 'Camila',  avatar: '👩🏽‍🦱', perfil: 'curioso',    pitch: 1.4 },
  { nombre: 'Joel',    avatar: '🧒🏽', perfil: 'conversador', pitch: 1.1 },
  { nombre: 'Anahí',   avatar: '👧🏾', perfil: 'apoyo',       pitch: 1.7 },
  { nombre: 'Nayeli',  avatar: '👩🏻‍🦰', perfil: 'dislexia',   pitch: 1.45 },
  { nombre: 'Yaku',    avatar: '👦🏽', perfil: 'promedio',    pitch: 1.0 },
  { nombre: 'Sisa',    avatar: '👧🏽', perfil: 'promedio',    pitch: 1.55 }
];

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const chance = p => Math.random() < p;

const PHRASES = {
  correcto: ['¡Es {a}!', 'Creo que es {a}.', 'Yo sé: {a}.', 'Mmm… {a}.', 'La respuesta es {a}.'],
  dudoso: ['¿{a}? No estoy seguro/a…', 'Eh… ¿{a}?', 'Creo que… ¿{a}?'],
  nose: ['No sé, profe…', 'Mmm… no me acuerdo.', '¿Me repite la pregunta?'],
  distraidoLlamado: ['¿Ah? ¿Qué preguntó, profe?', 'Perdón, no estaba escuchando…'],
  felicitado: ['¡Gracias, profe! 😊', '¡Sí! 🎉', '😄'],
  corregidoMal: ['Ok… 😔', '…', 'Ya no quiero participar.'],
  corregidoBien: ['¡Ah, ya entendí!', 'Ahora sí, gracias profe.', 'Ok, lo voy a recordar.'],
  apoyado: ['¡Gracias por ayudarme, profe!', 'Ahora entiendo mejor 😊', 'Ah, ¡así era!'],
  atencion: ['Sí, profe, perdón.', 'Ya, ya presto atención.', 'Ok 😅'],
  atencionInjusta: ['¡Pero yo estaba atendiendo! 😠', '¿Yo? Si no hice nada…'],
  pausa: ['¡Siii, pausa activa! 🙌', '¡Qué divertido!', '¡Ya me desperté!'],
  saludo: ['¡Buenos días, profe!', '¡Hola, profe! 👋', 'Buenos días…'],
  grupal: ['¡Yo quiero estar con Sofía!', '¡Trabajemos juntos!', 'Ya terminamos, profe.'],
  sabeErrorProfe: ['Profe… ¿no será que hay un error?', 'Profe, creo que eso no está bien…'],
  confundido: ['Ahora estoy más confundido/a…', '¿Entonces cuál es?'],
  entendio: ['¡Ahhh, ya entiendo!', 'Ok, tiene sentido.', '¡Qué interesante!']
};

function fmt(s, a) { return s.replace('{a}', a); }

class Student {
  constructor(def, i) {
    const p = PROFILES[def.perfil];
    this.id = 's' + i;
    this.nombre = def.nombre;
    this.avatar = def.avatar;
    this.perfil = def.perfil;
    this.pitch = def.pitch;
    this.nee = !!p.nee;
    this.base = clamp(p.base + (Math.random() - 0.5) * 0.1);
    this.part = p.part;
    this.decay = p.decay;
    this.atencion = clamp(0.75 + Math.random() * 0.2);
    this.comprension = clamp(0.1 + this.base * 0.2);
    this.motivacion = clamp(0.65 + Math.random() * 0.2);
    this.estado = 'ok';          // ok | mano | distraido | celular | conversa | cansado | duda | noentiende
    this.stats = { turnos: 0, aciertos: 0, felicitado: 0, corregidoMal: 0, apoyos: 0, llamados: 0 };
  }
  get perfilInfo() { return PROFILES[this.perfil]; }
  get distraido() { return ['distraido', 'celular', 'conversa', 'cansado'].includes(this.estado); }
  probCorrect(dif) {
    const p = this.base * 0.35 + this.comprension * 0.45 + this.atencion * 0.2 - dif * 0.5 + 0.15;
    return clamp(this.distraido ? p * 0.5 : p, 0.05, 0.97);
  }
  wantsToAnswer(dif) {
    const know = this.probCorrect(dif);
    const p = this.part * (0.4 + this.motivacion * 0.6) * (0.4 + know * 0.6) * (this.distraido ? 0.2 : 1);
    return chance(clamp(p, 0.03, 0.95));
  }
}

class Simulation {
  constructor({ area, level, tema, duracion = 40, numEstudiantes = 8, docente = 'Docente' }) {
    this.area = area; this.level = level; this.tema = tema;
    this.duracion = duracion; this.minuto = 0;
    this.docente = docente;
    this.dif = level.dificultad;
    const roster = ROSTER.slice(0, numEstudiantes);
    this.students = roster.map((d, i) => new Student(d, i));
    this.fase = 'anticipacion';
    this.explicados = 0;
    this.preguntaIdx = 0;
    this.usadas = { saludo: false, previo: false, objetivo: false, explicacion: false, ejercicio: false, quiz: false, resumen: false, tarea: false, grupal: false, pausa: false };
    this.feedback = { positivo: 0, formativo: 0, negativo: 0, neutro: 0 };
    this.eventos = { ocurridos: 0, atendidos: 0, ignorados: 0 };
    this.errorDocente = 0;
    this.dudasRespondidas = { bien: 0, mal: 0 };
    this.log = [];
    this.quizResults = null;
    this.activeEvent = null;
    this.finalizada = false;
    this.inicio = Date.now();
    this.faseInicio = { anticipacion: 0 };
    this.preguntasHechas = 0;
    this.bonusExplicar = 1;
  }

  /* ---------- utilidades ---------- */
  get(id) { return this.students.find(s => s.id === id); }
  addLog(tipo, texto, quien = 'docente') { this.log.push({ min: Math.round(this.minuto), tipo, texto, quien }); }
  setFase(f) {
    const order = ['anticipacion', 'construccion', 'consolidacion'];
    if (order.indexOf(f) > order.indexOf(this.fase)) { this.fase = f; this.faseInicio[f] = this.minuto; }
  }
  /* minutos usados en cada fase */
  tiemposFase() {
    const fi = this.faseInicio, fin = this.minuto;
    const c = fi.construccion ?? fin, k = fi.consolidacion ?? fin;
    return { anticipacion: Math.round(Math.min(c, k)), construccion: Math.round(Math.max(0, k - c)), consolidacion: Math.round(Math.max(0, fin - k)) };
  }
  /* la planificación previa modifica las condiciones de la clase */
  applyPlan(plan) {
    this.plan = plan;
    const bajo = ['preparatoria', 'elemental'].includes(this.level.id);
    if (plan.recursos.includes('concreto') && bajo) this.bonusExplicar = 1.12;
    if (plan.recursos.includes('visual')) this.bonusExplicar = (this.bonusExplicar || 1) * 1.05;
    if (plan.recursos.includes('digital') || plan.recursos.includes('juego')) this.students.forEach(s => { s.atencion = clamp(s.atencion + 0.05); s.motivacion = clamp(s.motivacion + 0.04); });
    this.students.forEach(s => {
      const a = plan.adapt[s.perfil];
      if (!a) return;
      if (s.perfil === 'tdah' && (a === 'g1' || a === 'g2')) s.decay *= 0.8;
      if (s.perfil === 'dislexia' && a === 'g2') s.adaptado = true;
      if (s.perfil === 'dislexia' && a === 'g1') s.adaptadoParcial = true;
    });
  }
  avg(key) { return this.students.reduce((a, s) => a + s[key], 0) / this.students.length; }

  /* avanza el reloj y degrada la atención */
  tick(min) {
    this.minuto += min;
    const fatiga = this.minuto / this.duracion;
    this.students.forEach(s => {
      s.atencion = clamp(s.atencion - min * 0.013 * s.decay * (0.6 + fatiga));
      if (!s.distraido && s.estado !== 'duda' && s.atencion < 0.35 && chance(0.5)) {
        s.estado = pick(s.perfil === 'conversador' ? ['conversa', 'conversa', 'distraido'] : ['distraido', 'celular', 'cansado']);
      }
      if (s.distraido) s.motivacion = clamp(s.motivacion - 0.01 * min);
    });
  }

  /* posible evento aleatorio después de cada acción */
  maybeEvent() {
    if (this.activeEvent || this.finalizada) return null;
    const p = 0.22 + (this.minuto / this.duracion) * 0.15;
    if (!chance(p)) return null;
    const ev = pick(CLASSROOM_EVENTS);
    let cand;
    if (ev.tipo === 'duda') cand = this.students.filter(s => ['curioso', 'aplicado', 'promedio', 'timido'].includes(s.perfil));
    else if (ev.tipo === 'noentiende') cand = this.students.filter(s => s.comprension < 0.5);
    else if (ev.tipo === 'conversa') cand = this.students.filter(s => s.perfil === 'conversador' || s.atencion < 0.6);
    else cand = this.students.filter(s => s.atencion < 0.7 || ['distraido', 'tdah'].includes(s.perfil));
    if (!cand.length) cand = this.students;
    const s = pick(cand);
    let duda = null;
    if (ev.tipo === 'duda') {
      const dudas = this.tema.dudas.filter(d => !d.usada);
      if (!dudas.length) return null;
      duda = dudas[0]; duda.usada = true;
    }
    s.estado = ev.tipo === 'duda' ? 'duda' : ev.tipo;
    this.activeEvent = { ...ev, sid: s.id, texto: ev.texto.replace('{n}', s.nombre), duda, min: this.minuto };
    this.eventos.ocurridos++;
    this.addLog('evento', this.activeEvent.texto, s.nombre);
    return this.activeEvent;
  }
  resolveEvent(atendido) {
    if (!this.activeEvent) return;
    if (atendido) this.eventos.atendidos++; else this.eventos.ignorados++;
    this.activeEvent = null;
  }

  /* =================== ANTICIPACIÓN =================== */
  saludar() {
    this.usadas.saludo = true; this.tick(1);
    this.students.forEach(s => { s.motivacion = clamp(s.motivacion + 0.08); s.atencion = clamp(s.atencion + 0.1); });
    this.addLog('anticipacion', 'Saludó y motivó a la clase.');
    const voces = this.students.filter(() => chance(0.4)).slice(0, 3);
    return voces.map(s => ({ s, t: pick(PHRASES.saludo) }));
  }
  presentarObjetivo() {
    this.usadas.objetivo = true; this.tick(1);
    this.students.forEach(s => { s.atencion = clamp(s.atencion + 0.06); });
    this.addLog('anticipacion', 'Presentó el objetivo: ' + this.tema.objetivo);
  }
  /* devuelve estudiantes que quieren opinar sobre la pregunta previa */
  activarPrevios() {
    this.usadas.previo = true; this.tick(2);
    this.addLog('anticipacion', 'Activó conocimientos previos: ' + this.tema.previo.q);
    this.students.forEach(s => { s.atencion = clamp(s.atencion + 0.08); s.comprension = clamp(s.comprension + 0.03); });
    const hands = this.students.filter(s => s.wantsToAnswer(0));
    hands.forEach(s => { if (!s.distraido) s.estado = 'mano'; });
    return hands;
  }
  opinionPrevia(id) {
    const s = this.get(id); this.tick(0.5);
    s.stats.turnos++;
    const t = (s.perfil === 'timido' && chance(0.5)) ? '…(en voz muy baja) ' + pick(this.tema.previo.r) : pick(this.tema.previo.r);
    s.estado = 'ok';
    s.motivacion = clamp(s.motivacion + 0.05);
    this.addLog('respuesta', `${s.nombre}: "${t}"`, s.nombre);
    return t;
  }

  /* =================== CONSTRUCCIÓN =================== */
  explicar() {
    const pts = this.tema.explicacion;
    if (this.explicados >= pts.length) return null;
    const punto = pts[this.explicados++];
    this.usadas.explicacion = true; this.setFase('construccion');
    this.tick(3);
    this.students.forEach(s => {
      const dis = s.perfil === 'dislexia' ? (s.adaptado ? 0.95 : s.adaptadoParcial ? 0.85 : 0.75) : 1;
      const gain = 0.085 * (0.3 + s.atencion * 0.9) * dis * this.bonusExplicar;
      s.comprension = clamp(s.comprension + gain);
      s.atencion = clamp(s.atencion - 0.02);
    });
    this.addLog('construccion', 'Explicó: ' + punto);
    return punto;
  }

  nextQuestion() {
    const t = this.tema;
    const fixed = t.preguntas;
    if (t.gen && (this.preguntaIdx >= fixed.length || chance(0.3))) { this.preguntaIdx++; return t.gen(); }
    const q = fixed[this.preguntaIdx % fixed.length]; this.preguntaIdx++;
    return q;
  }

  abrirPregunta(q) {
    this.setFase('construccion');
    this.currentQ = q; this.tick(1); this.preguntasHechas++;
    this.addLog('pregunta', 'Preguntó: ' + q.q);
    const hands = this.students.filter(s => s.wantsToAnswer(this.dif));
    // el estudiante con TDAH tiende a levantar la mano siempre
    hands.forEach(s => { if (!s.distraido) s.estado = 'mano'; });
    return hands.filter(s => s.estado === 'mano');
  }

  /* un estudiante responde la pregunta actual */
  responder(id, boost = 0) {
    const s = this.get(id), q = this.currentQ;
    this.tick(1);
    s.stats.turnos++;
    const levantó = s.estado === 'mano';
    if (s.distraido) {
      s.atencion = clamp(s.atencion + 0.25);
      const t = pick(PHRASES.distraidoLlamado);
      s.estado = 'ok';
      this.addLog('respuesta', `${s.nombre}: "${t}"`, s.nombre);
      return { s, texto: t, correct: false, distraido: true };
    }
    if (!levantó && s.perfil === 'timido' && chance(0.35)) {
      const t = pick(PHRASES.nose);
      this.addLog('respuesta', `${s.nombre}: "${t}"`, s.nombre);
      return { s, texto: t, correct: false, nose: true };
    }
    let p = s.probCorrect(this.dif) + boost;
    if (s.perfil === 'tdah' && !boost) p -= 0.12; // respuesta impulsiva
    const correct = chance(clamp(p));
    let idx = q.c;
    if (!correct) { const wrong = q.o.map((_, i) => i).filter(i => i !== q.c); idx = pick(wrong); }
    const ans = q.o[idx];
    const t = fmt(pick(correct && p > 0.6 ? PHRASES.correcto : PHRASES.dudoso), ans);
    if (correct) s.stats.aciertos++;
    s.estado = 'ok';
    this.lastAnswer = { sid: s.id, correct, idx };
    this.addLog('respuesta', `${s.nombre}: "${t}" ${correct ? '✔' : '✘'}`, s.nombre);
    return { s, texto: t, correct, idx };
  }

  /* retroalimentación del docente a la respuesta */
  retroalimentar(id, tipo) {
    const s = this.get(id); const ok = this.lastAnswer && this.lastAnswer.sid === id && this.lastAnswer.correct;
    this.tick(0.5);
    let reply = null;
    switch (tipo) {
      case 'felicitar':
        if (ok) { this.feedback.positivo++; s.motivacion = clamp(s.motivacion + 0.15); s.stats.felicitado++; reply = pick(PHRASES.felicitado); }
        else { this.feedback.negativo++; this.students.forEach(x => x.comprension = clamp(x.comprension - 0.04)); reply = pick(PHRASES.confundido); this.addLog('alerta', 'Felicitó una respuesta incorrecta: genera confusión.'); }
        break;
      case 'razonar':
        this.feedback.formativo++; this.tick(1);
        this.students.forEach(x => x.comprension = clamp(x.comprension + (ok ? 0.06 : 0.03) * (0.5 + x.atencion)));
        s.motivacion = clamp(s.motivacion + 0.08);
        reply = ok ? 'Porque ' + (this.currentQ.porque || 'así lo aprendimos.').replace(/\.$/, '') + '.' : 'Ah… creo que me equivoqué.';
        break;
      case 'pista':
        this.feedback.formativo++;
        reply = null; // el estudiante vuelve a intentar desde la UI
        break;
      case 'explicarError':
        this.feedback.formativo++; this.tick(1);
        s.comprension = clamp(s.comprension + 0.15); s.motivacion = clamp(s.motivacion + 0.04);
        this.students.forEach(x => x.comprension = clamp(x.comprension + 0.04 * x.atencion));
        reply = pick(PHRASES.corregidoBien);
        break;
      case 'otro':
        this.feedback.neutro++;
        s.motivacion = clamp(s.motivacion - 0.03);
        break;
      case 'negativo':
        this.feedback.negativo++; s.stats.corregidoMal++;
        s.motivacion = clamp(s.motivacion - 0.25); s.part = clamp(s.part - 0.15);
        this.students.forEach(x => x.motivacion = clamp(x.motivacion - 0.04));
        reply = pick(PHRASES.corregidoMal);
        break;
      case 'continuar':
        this.feedback.neutro++;
        if (ok) s.motivacion = clamp(s.motivacion - 0.02);
        break;
    }
    const labels = { felicitar: 'Felicitó', razonar: 'Pidió explicar el razonamiento a', pista: 'Dio una pista a', explicarError: 'Explicó el error con paciencia a', otro: 'Pasó la pregunta a otro estudiante después de', negativo: 'Corrigió de forma negativa a', continuar: 'Continuó sin retroalimentar a' };
    this.addLog('retro', `${labels[tipo]} ${s.nombre}.`);
    return reply;
  }

  /* ejercicio que resuelve el docente en la pizarra */
  resolverEjercicio(idx) {
    const e = this.tema.ejercicio; this.usadas.ejercicio = true; this.setFase('construccion');
    this.tick(4);
    const ok = idx === e.c;
    if (ok) {
      this.students.forEach(s => s.comprension = clamp(s.comprension + 0.08 * (0.4 + s.atencion)));
      this.addLog('construccion', 'Resolvió correctamente el ejercicio en la pizarra.');
    } else {
      this.errorDocente++;
      this.addLog('alerta', 'Cometió un error al resolver el ejercicio en la pizarra.');
    }
    const critico = this.students.filter(s => !s.distraido).sort((a, b) => b.comprension + b.base - a.comprension - a.base)[0];
    return { ok, critico };
  }
  corregirEjercicio() {
    this.tick(2);
    this.students.forEach(s => s.comprension = clamp(s.comprension + 0.06));
    this.addLog('construccion', 'Reconoció el error y corrigió el ejercicio con la ayuda de la clase.');
  }

  /* duda de un estudiante */
  responderDuda(idx) {
    const ev = this.activeEvent; if (!ev || !ev.duda) return null;
    const s = this.get(ev.sid); const ok = idx === ev.duda.c;
    this.tick(1.5);
    if (ok) {
      this.dudasRespondidas.bien++;
      s.motivacion = clamp(s.motivacion + 0.1);
      this.students.forEach(x => x.comprension = clamp(x.comprension + 0.04));
      this.addLog('duda', `Respondió correctamente la duda de ${s.nombre}.`);
    } else {
      this.dudasRespondidas.mal++;
      this.students.forEach(x => x.comprension = clamp(x.comprension - 0.03));
      this.addLog('alerta', `Respondió de forma incorrecta la duda de ${s.nombre}.`);
    }
    s.estado = 'ok';
    this.resolveEvent(true);
    return { s, ok, reply: ok ? pick(PHRASES.entendio) : pick(PHRASES.confundido) };
  }

  /* =================== GESTIÓN DEL AULA =================== */
  llamarAtencion(id) {
    const s = this.get(id); this.tick(0.5);
    s.stats.llamados++;
    const justo = s.distraido || ['conversa', 'celular'].includes(s.estado);
    if (justo) {
      s.atencion = clamp(s.atencion + 0.35); s.estado = 'ok';
      s.motivacion = clamp(s.motivacion - (s.stats.llamados > 2 ? 0.08 : 0.02));
      if (this.activeEvent && this.activeEvent.sid === id) this.resolveEvent(true);
      this.addLog('gestion', `Llamó la atención a ${s.nombre} de manera oportuna.`);
      return pick(PHRASES.atencion);
    }
    s.motivacion = clamp(s.motivacion - 0.12);
    this.addLog('alerta', `Llamó la atención a ${s.nombre} sin motivo aparente.`);
    return pick(PHRASES.atencionInjusta);
  }
  apoyar(id) {
    const s = this.get(id); this.tick(2);
    s.stats.apoyos++;
    const k = s.nee || s.perfil === 'apoyo' ? 1.6 : 1;
    s.comprension = clamp(s.comprension + 0.13 * k);
    s.motivacion = clamp(s.motivacion + 0.12);
    s.atencion = clamp(s.atencion + 0.3);
    if (s.estado !== 'mano') s.estado = 'ok';
    if (this.activeEvent && this.activeEvent.sid === id && this.activeEvent.tipo !== 'duda') this.resolveEvent(true);
    // mientras apoya a uno, el resto pierde algo de atención
    this.students.forEach(x => { if (x !== s) x.atencion = clamp(x.atencion - 0.03); });
    this.addLog('inclusion', `Se acercó a apoyar individualmente a ${s.nombre}${s.nee ? ' (estudiante con NEE)' : ''}.`);
    return pick(PHRASES.apoyado);
  }
  pausaActiva() {
    this.usadas.pausa = true; this.tick(3);
    this.students.forEach(s => {
      s.atencion = clamp(s.atencion + (s.perfil === 'tdah' ? 0.5 : 0.35));
      s.motivacion = clamp(s.motivacion + 0.06);
      if (s.distraido) s.estado = 'ok';
    });
    if (this.activeEvent && this.activeEvent.tipo !== 'duda') this.resolveEvent(true);
    this.addLog('gestion', 'Realizó una pausa activa.');
    return this.students.filter(() => chance(0.3)).slice(0, 2).map(s => ({ s, t: pick(PHRASES.pausa) }));
  }
  pedirSilencio() {
    this.tick(0.5);
    let n = 0;
    this.students.forEach(s => {
      if (s.estado === 'conversa') { s.estado = 'ok'; s.atencion = clamp(s.atencion + 0.2); n++; }
      else s.atencion = clamp(s.atencion + 0.05);
    });
    if (this.activeEvent && this.activeEvent.tipo === 'conversa') this.resolveEvent(true);
    this.addLog('gestion', 'Pidió silencio a la clase.');
    return n;
  }
  trabajoGrupal() {
    this.usadas.grupal = true; this.setFase('construccion'); this.tick(6);
    const avgC = this.avg('comprension');
    this.students.forEach(s => {
      s.comprension = clamp(s.comprension + (avgC > s.comprension ? 0.12 : 0.05));
      s.motivacion = clamp(s.motivacion + 0.08);
      s.atencion = clamp(s.atencion + 0.1);
      if (s.distraido && chance(0.6)) s.estado = 'ok';
    });
    this.addLog('construccion', 'Organizó trabajo colaborativo en grupos.');
    return this.students.filter(() => chance(0.3)).slice(0, 2).map(s => ({ s, t: pick(PHRASES.grupal) }));
  }

  valorarAporte(id) {
    const s = this.get(id);
    this.feedback.positivo++;
    s.motivacion = clamp(s.motivacion + 0.06);
    this.addLog('retro', `Valoró el aporte de ${s.nombre}.`);
  }
  insistirError() {
    this.tick(1);
    this.errorDocente++;
    this.students.forEach(s => { s.comprension = clamp(s.comprension - 0.08); s.motivacion = clamp(s.motivacion - 0.03); });
    this.addLog('alerta', 'Insistió en una respuesta incorrecta a pesar de la observación de un estudiante.');
  }
  reexplicar() {
    this.tick(2);
    this.students.forEach(s => { if (s.comprension < 0.6) s.comprension = clamp(s.comprension + 0.08); });
    const ev = this.activeEvent;
    if (ev) { const s = this.get(ev.sid); if (s) s.estado = 'ok'; this.resolveEvent(true); }
    this.addLog('construccion', 'Volvió a explicar con otras palabras para quienes no comprendieron.');
  }
  ignorarEvento() {
    const ev = this.activeEvent; if (!ev) return;
    const s = this.get(ev.sid);
    if (ev.tipo === 'duda' || ev.tipo === 'noentiende') { s.estado = 'ok'; s.motivacion = clamp(s.motivacion - 0.1); s.part = clamp(s.part - 0.05); }
    this.addLog('alerta', `No atendió la situación: ${ev.texto}`);
    this.resolveEvent(false);
  }

  /* =================== CONSOLIDACIÓN =================== */
  retroGrupal(q) {
    this.feedback.formativo++; this.tick(2);
    this.students.forEach(s => s.comprension = clamp(s.comprension + 0.05 * (0.5 + s.atencion)));
    this.addLog('retro', 'Retroalimentó a toda la clase la respuesta de la evaluación: ' + (q.porque || ''));
  }
  evaluacionRapida(q) {
    this.usadas.quiz = true; this.setFase('consolidacion'); this.tick(3);
    const res = this.students.map(s => {
      const correct = chance(s.probCorrect(this.dif) + 0.05);
      let idx = q.c;
      if (!correct) idx = pick(q.o.map((_, i) => i).filter(i => i !== q.c));
      if (correct) s.stats.aciertos++;
      return { s, correct, idx };
    });
    const pct = Math.round(res.filter(r => r.correct).length / res.length * 100);
    this.quizResults = this.quizResults || [];
    this.quizResults.push(pct);
    this.addLog('consolidacion', `Evaluación rápida: ${pct}% de aciertos en "${q.q}".`);
    return { res, pct };
  }
  resumir() {
    this.usadas.resumen = true; this.setFase('consolidacion'); this.tick(2);
    this.students.forEach(s => s.comprension = clamp(s.comprension + 0.05 * (0.5 + s.atencion)));
    this.addLog('consolidacion', 'Realizó un resumen de lo aprendido con la participación de la clase.');
  }
  asignarTarea() {
    this.usadas.tarea = true; this.setFase('consolidacion'); this.tick(1);
    this.addLog('consolidacion', 'Asignó la tarea: ' + this.tema.tarea);
  }

  /* =================== EVALUACIÓN DEL DESEMPEÑO =================== */
  evaluar() {
    this.finalizada = true;
    const u = this.usadas, n = this.students.length;
    const pct = v => Math.round(v * 100);
    // 1. Estructura de la clase (ciclo de aprendizaje)
    const antic = (u.saludo ? 2 : 0) + (u.previo ? 3 : 0) + (u.objetivo ? 2 : 0);
    const constr = Math.min(7, Math.round(this.explicados / this.tema.explicacion.length * 4) + (u.ejercicio ? 2 : 0) + (u.grupal ? 1 : 0));
    const conso = (u.quiz ? 3 : 0) + (u.resumen ? 2 : 0) + (u.tarea ? 1 : 0);
    const estructura = antic + constr + conso; // /20
    // 2. Comprensión
    const comp = this.avg('comprension');
    const comprension = Math.round(comp * 25);
    // 3. Clima
    const clima = Math.round((this.avg('motivacion') * 0.6 + this.avg('atencion') * 0.4) * 15);
    // 4. Equidad
    const participaron = this.students.filter(s => s.stats.turnos > 0).length;
    const turnos = this.students.map(s => s.stats.turnos);
    const maxT = Math.max(...turnos), totalT = turnos.reduce((a, b) => a + b, 0);
    const concentracion = totalT ? maxT / totalT : 1;
    const equidad = Math.round((participaron / n) * 12 + (1 - Math.min(1, Math.max(0, concentracion - 1 / n) * 2)) * 3);
    // 5. Retroalimentación
    const f = this.feedback, totalF = f.positivo + f.formativo + f.negativo + f.neutro;
    const retro = totalF ? Math.round(((f.positivo + f.formativo * 1.2) / totalF) * 15 - f.negativo * 2) : 0;
    // 6. Inclusión y gestión
    const nees = this.students.filter(s => s.nee);
    const apoyadosNee = nees.filter(s => s.stats.apoyos > 0).length;
    const gestionEv = this.eventos.ocurridos ? (this.eventos.atendidos / this.eventos.ocurridos) : 1;
    const inclusion = Math.round((nees.length ? apoyadosNee / nees.length : 1) * 6 + gestionEv * 4);
    let total = estructura + comprension + clima + Math.max(0, equidad) + clamp(retro, 0, 15) + inclusion;
    const exceso = Math.max(0, this.minuto - this.duracion);
    total -= Math.round(exceso * 0.8) + this.errorDocente * 3 + this.dudasRespondidas.mal * 2;
    total = Math.max(0, Math.min(100, Math.round(total)));

    const criterios = [
      { id: 'estructura', nombre: 'Estructura de la clase (ciclo ERCA)', pts: estructura, max: 20 },
      { id: 'comprension', nombre: 'Comprensión lograda en estudiantes', pts: comprension, max: 25 },
      { id: 'clima', nombre: 'Clima de aula y motivación', pts: clima, max: 15 },
      { id: 'equidad', nombre: 'Equidad en la participación', pts: Math.max(0, equidad), max: 15 },
      { id: 'retro', nombre: 'Retroalimentación formativa', pts: clamp(retro, 0, 15), max: 15 },
      { id: 'inclusion', nombre: 'Inclusión (NEE) y gestión de situaciones', pts: inclusion, max: 10 }
    ];

    const rec = [];
    if (!u.previo) rec.push('Inicie la clase activando conocimientos previos: conecta el tema con la experiencia de los estudiantes.');
    if (!u.objetivo) rec.push('Comunique el objetivo de la clase al inicio para orientar el aprendizaje.');
    if (this.explicados < this.tema.explicacion.length) rec.push('Complete la explicación de todos los contenidos antes de evaluar.');
    if (!u.quiz && !u.resumen) rec.push('Incluya una fase de consolidación (evaluación rápida o síntesis) antes de terminar.');
    if (participaron < n * 0.7) rec.push(`Solo participaron ${participaron} de ${n} estudiantes. Dé la palabra también a quienes no levantan la mano (p. ej. estudiantes tímidos).`);
    if (concentracion > 0.35 && totalT > 3) rec.push('La participación se concentró en pocos estudiantes. Distribuya los turnos.');
    if (f.negativo > 0) rec.push('Evite correcciones negativas: reducen la motivación y la participación. Prefiera explicar el error o dar pistas.');
    if (f.formativo < 2) rec.push('Use más retroalimentación formativa: pida que expliquen su razonamiento o dé pistas.');
    if (nees.length && apoyadosNee < nees.length) rec.push('Brinde apoyo individualizado a los estudiantes con necesidades educativas específicas (NEE).');
    if (this.eventos.ignorados > 0) rec.push('Atienda las situaciones del aula (distracciones, dudas) en el momento en que ocurren.');
    if (this.avg('atencion') < 0.5 && !u.pausa) rec.push('La atención de la clase bajó: incorpore pausas activas o trabajo colaborativo.');
    if (exceso > 0) rec.push(`Se excedió ${Math.round(exceso)} minutos del tiempo planificado. Gestione mejor el tiempo.`);
    if (this.errorDocente) rec.push('Revise el dominio del contenido antes de la clase: se cometieron errores en la pizarra.');
    if (!rec.length) rec.push('¡Excelente clase! Mantenga estas buenas prácticas pedagógicas.');

    const nivel = total >= 85 ? 'Excelente' : total >= 70 ? 'Muy bueno' : total >= 55 ? 'Bueno' : total >= 40 ? 'En proceso' : 'Inicial';
    return {
      total, nivel, criterios, rec,
      minutos: Math.round(this.minuto), duracion: this.duracion,
      comprensionProm: pct(comp), motivacionProm: pct(this.avg('motivacion')), atencionProm: pct(this.avg('atencion')),
      participaron, n, feedback: { ...f }, eventos: { ...this.eventos }, quiz: this.quizResults,
      estudiantes: this.students.map(s => ({ nombre: s.nombre, avatar: s.avatar, perfil: s.perfilInfo.etiqueta, nee: s.nee, comprension: pct(s.comprension), motivacion: pct(s.motivacion), atencion: pct(s.atencion), ...s.stats })),
      log: this.log
    };
  }
}
