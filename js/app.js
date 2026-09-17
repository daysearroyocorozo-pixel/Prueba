/* Leo y Comprendo: lógica de la aplicación.
   Todo el estado de accesibilidad y progreso se guarda en localStorage
   para que la experiencia sea consistente entre sesiones. */

(function () {
  "use strict";

  const STORAGE_KEY = "leoycomprendo_estado_v1";

  const defaultState = {
    nombre: "",
    fontSize: "medium",
    theme: "claro",
    fontLexend: false,
    wideSpacing: false,
    reduceMotion: false,
    speechRate: 0.85,
    progreso: {} // { storyId: estrellas (0-3) }
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed, progreso: parsed.progreso || {} };
    } catch (e) {
      return { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* almacenamiento no disponible: la app sigue funcionando sin persistencia */
    }
  }

  // ===== Referencias DOM =====
  const screens = {
    welcome: document.getElementById("screen-welcome"),
    menu: document.getElementById("screen-menu"),
    reading: document.getElementById("screen-reading"),
    quiz: document.getElementById("screen-quiz"),
    results: document.getElementById("screen-results")
  };

  const welcomeForm = document.getElementById("welcome-form");
  const childNameInput = document.getElementById("child-name");
  const menuName = document.getElementById("menu-name");
  const storyList = document.getElementById("story-list");
  const starTotal = document.getElementById("star-total");

  const backToMenuBtn = document.getElementById("back-to-menu");
  const quizBackBtn = document.getElementById("quiz-back");
  const readingTitle = document.getElementById("reading-title");
  const pageDots = document.getElementById("page-dots");
  const pageEmoji = document.getElementById("page-emoji");
  const paragraphText = document.getElementById("paragraph-text");
  const listenBtn = document.getElementById("listen-btn");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageIndicator = document.getElementById("page-indicator");

  const quizTitle = document.getElementById("quiz-title");
  const quizDots = document.getElementById("quiz-dots");
  const quizQuestion = document.getElementById("quiz-question");
  const quizListenBtn = document.getElementById("quiz-listen-btn");
  const quizOptions = document.getElementById("quiz-options");
  const quizFeedback = document.getElementById("quiz-feedback");
  const quizNextBtn = document.getElementById("quiz-next");

  const resultsTitle = document.getElementById("results-title");
  const resultsMessage = document.getElementById("results-message");
  const resultsStars = document.getElementById("results-stars");
  const replayStoryBtn = document.getElementById("replay-story");
  const resultsMenuBtn = document.getElementById("results-menu");

  const settingsBtn = document.getElementById("settings-btn");
  const settingsPanel = document.getElementById("settings-panel");
  const settingsOverlay = document.getElementById("settings-overlay");
  const settingsClose = document.getElementById("settings-close");
  const toggleFont = document.getElementById("toggle-font");
  const toggleSpacing = document.getElementById("toggle-spacing");
  const toggleMotion = document.getElementById("toggle-motion");
  const speechRateInput = document.getElementById("speech-rate");
  const testVoiceBtn = document.getElementById("test-voice");

  // ===== Navegación entre pantallas =====
  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      el.hidden = key !== name;
    });
    window.scrollTo({ top: 0, behavior: state.reduceMotion ? "auto" : "smooth" });
  }

  // ===== Texto a voz =====
  let currentUtterance = null;

  function pickSpanishVoice() {
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    return (
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("es")) || null
    );
  }

  function speak(text, { onWordBoundary, onEnd } = {}) {
    if (!("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickSpanishVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice ? voice.lang : "es-ES";
    utterance.rate = state.speechRate;
    utterance.pitch = 1;

    if (onWordBoundary) {
      utterance.onboundary = (event) => {
        if (event.name === "word" || event.charIndex !== undefined) {
          onWordBoundary(event.charIndex);
        }
      };
    }
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Asegura que las voces estén cargadas (algunos navegadores las cargan async).
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  // ===== Utilidades =====
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderWordSpans(text) {
    const regex = /\S+/g;
    let html = "";
    let lastEnd = 0;
    let match;
    while ((match = regex.exec(text))) {
      html += escapeHtml(text.slice(lastEnd, match.index));
      const start = match.index;
      const end = start + match[0].length;
      html += `<span class="word" data-start="${start}" data-end="${end}">${escapeHtml(match[0])}</span>`;
      lastEnd = end;
    }
    html += escapeHtml(text.slice(lastEnd));
    return html;
  }

  function highlightWordAt(container, charIndex) {
    const words = container.querySelectorAll(".word");
    words.forEach((w) => w.classList.remove("speaking"));
    if (charIndex === undefined) return;
    for (const w of words) {
      const start = Number(w.dataset.start);
      const end = Number(w.dataset.end);
      if (charIndex >= start && charIndex < end) {
        w.classList.add("speaking");
        break;
      }
    }
  }

  function clearHighlights(container) {
    container.querySelectorAll(".word.speaking").forEach((w) => w.classList.remove("speaking"));
  }

  function totalStars() {
    return Object.values(state.progreso).reduce((sum, n) => sum + n, 0);
  }

  function updateStarTotal() {
    starTotal.textContent = `⭐ ${totalStars()}`;
  }

  // ===== Pantalla de bienvenida =====
  welcomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = childNameInput.value.trim();
    state.nombre = name || "amigo/a";
    saveState();
    goToMenu();
  });

  function goToMenu() {
    menuName.textContent = state.nombre || "amigo/a";
    renderStoryList();
    updateStarTotal();
    showScreen("menu");
  }

  // ===== Menú de cuentos =====
  function renderStoryList() {
    storyList.innerHTML = "";
    STORIES.forEach((story) => {
      const stars = state.progreso[story.id] || 0;
      const card = document.createElement("button");
      card.type = "button";
      card.className = "story-card";
      card.setAttribute("role", "listitem");
      card.setAttribute("aria-label", `${story.titulo}, nivel ${story.nivel}, ${stars} de 3 estrellas`);
      card.innerHTML = `
        <span class="story-emoji">${story.emoji}</span>
        <span class="story-title">${escapeHtml(story.titulo)}</span>
        <span class="story-level">Nivel ${story.nivel}</span>
        <span class="story-stars">${stars > 0 ? "⭐".repeat(stars) : "☆ ☆ ☆"}</span>
      `;
      card.addEventListener("click", () => openStory(story.id));
      storyList.appendChild(card);
    });
  }

  backToMenuBtn.addEventListener("click", () => {
    stopSpeaking();
    goToMenu();
  });
  quizBackBtn.addEventListener("click", () => {
    stopSpeaking();
    goToMenu();
  });
  resultsMenuBtn.addEventListener("click", () => goToMenu());

  // ===== Lectura del cuento =====
  let activeStory = null;
  let currentPage = 0;

  function openStory(storyId) {
    activeStory = STORIES.find((s) => s.id === storyId);
    if (!activeStory) return;
    currentPage = 0;
    readingTitle.textContent = activeStory.titulo;
    renderPageDots();
    renderPage();
    showScreen("reading");
  }

  function renderPageDots() {
    pageDots.innerHTML = "";
    activeStory.parrafos.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i <= currentPage ? " filled" : "");
      pageDots.appendChild(dot);
    });
  }

  function renderPage() {
    stopSpeaking();
    const total = activeStory.parrafos.length;
    const page = activeStory.parrafos[currentPage];
    pageEmoji.textContent = page.emoji || activeStory.emoji;
    paragraphText.innerHTML = renderWordSpans(page.texto);
    pageIndicator.textContent = `Página ${currentPage + 1} de ${total}`;
    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.textContent = currentPage === total - 1 ? "Empezar preguntas ❓" : "Siguiente ➡️";
    renderPageDots();
  }

  listenBtn.addEventListener("click", () => {
    const page = activeStory.parrafos[currentPage];
    listenBtn.disabled = true;
    speak(page.texto, {
      onWordBoundary: (charIndex) => highlightWordAt(paragraphText, charIndex),
      onEnd: () => {
        clearHighlights(paragraphText);
        listenBtn.disabled = false;
      }
    });
  });

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage -= 1;
      renderPage();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    stopSpeaking();
    if (currentPage < activeStory.parrafos.length - 1) {
      currentPage += 1;
      renderPage();
    } else {
      startQuiz();
    }
  });

  // ===== Preguntas =====
  let quizIndex = 0;
  let quizCorrectCount = 0;
  let answeredCurrent = false;

  function startQuiz() {
    quizIndex = 0;
    quizCorrectCount = 0;
    quizTitle.textContent = `Preguntas: ${activeStory.titulo}`;
    renderQuizDots();
    renderQuestion();
    showScreen("quiz");
  }

  function renderQuizDots() {
    quizDots.innerHTML = "";
    activeStory.preguntas.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i <= quizIndex ? " filled" : "");
      quizDots.appendChild(dot);
    });
  }

  function renderQuestion() {
    stopSpeaking();
    answeredCurrent = false;
    const q = activeStory.preguntas[quizIndex];
    quizQuestion.innerHTML = renderWordSpans(q.texto);
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
    quizNextBtn.hidden = true;
    renderQuizDots();

    quizOptions.innerHTML = "";
    q.opciones.forEach((opcion, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.setAttribute("role", "listitem");
      btn.textContent = opcion;
      btn.addEventListener("click", () => handleAnswer(i, btn));
      quizOptions.appendChild(btn);
    });
  }

  quizListenBtn.addEventListener("click", () => {
    const q = activeStory.preguntas[quizIndex];
    quizListenBtn.disabled = true;
    speak(q.texto, {
      onWordBoundary: (charIndex) => highlightWordAt(quizQuestion, charIndex),
      onEnd: () => {
        clearHighlights(quizQuestion);
        quizListenBtn.disabled = false;
      }
    });
  });

  function handleAnswer(selectedIndex, btnEl) {
    if (answeredCurrent) return;
    const q = activeStory.preguntas[quizIndex];
    const isCorrect = selectedIndex === q.correcta;
    const allOptions = quizOptions.querySelectorAll(".quiz-option");

    if (isCorrect) {
      answeredCurrent = true;
      allOptions.forEach((b) => (b.disabled = true));
      btnEl.classList.add("correct");
      quizCorrectCount += 1;
      quizFeedback.textContent = "¡Muy bien! Respuesta correcta 🎉";
      quizFeedback.className = "quiz-feedback success";
      speak("¡Muy bien! Respuesta correcta.");
      quizNextBtn.hidden = false;
      quizNextBtn.textContent = quizIndex === activeStory.preguntas.length - 1 ? "Ver resultados 🏆" : "Siguiente ➡️";
    } else {
      btnEl.classList.add("incorrect");
      btnEl.disabled = true;
      quizFeedback.textContent = "Casi... ¡Inténtalo de nuevo! 💪";
      quizFeedback.className = "quiz-feedback error";
      speak("Casi. Inténtalo de nuevo.");
    }
  }

  quizNextBtn.addEventListener("click", () => {
    stopSpeaking();
    if (quizIndex < activeStory.preguntas.length - 1) {
      quizIndex += 1;
      renderQuestion();
    } else {
      finishQuiz();
    }
  });

  function finishQuiz() {
    const total = activeStory.preguntas.length;
    const stars = quizCorrectCount; // 1 estrella por respuesta correcta a la primera
    const prevStars = state.progreso[activeStory.id] || 0;
    state.progreso[activeStory.id] = Math.max(prevStars, stars);
    saveState();

    resultsStars.textContent = "⭐".repeat(stars) + "☆".repeat(Math.max(0, total - stars));
    resultsTitle.textContent = stars === total ? "¡Excelente trabajo! 🏆" : "¡Buen esfuerzo! 🌟";
    resultsMessage.textContent = `Respondiste bien ${quizCorrectCount} de ${total} preguntas sobre "${activeStory.titulo}".`;
    updateStarTotal();
    showScreen("results");
    speak(resultsTitle.textContent);
  }

  replayStoryBtn.addEventListener("click", () => {
    openStory(activeStory.id);
  });

  // ===== Ajustes de accesibilidad =====
  function openSettings() {
    settingsPanel.hidden = false;
    settingsOverlay.hidden = false;
    settingsPanel.querySelector("button, input")?.focus();
  }
  function closeSettings() {
    settingsPanel.hidden = true;
    settingsOverlay.hidden = true;
    settingsBtn.focus();
  }
  settingsBtn.addEventListener("click", openSettings);
  settingsClose.addEventListener("click", closeSettings);
  settingsOverlay.addEventListener("click", closeSettings);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !settingsPanel.hidden) closeSettings();
  });

  const fontScales = { small: 0.9, medium: 1, large: 1.2, xlarge: 1.45 };

  function applySettingsToDom() {
    document.documentElement.style.setProperty("--font-scale", fontScales[state.fontSize] || 1);

    document.body.classList.remove("theme-claro", "theme-oscuro", "theme-pastel", "theme-contraste");
    document.body.classList.add(`theme-${state.theme}`);

    document.body.classList.toggle("font-lexend", state.fontLexend);
    document.body.classList.toggle("wide-spacing", state.wideSpacing);
    document.body.classList.toggle("reduce-motion", state.reduceMotion);

    document.querySelectorAll("[data-font-size]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.fontSize === state.fontSize);
    });
    document.querySelectorAll("[data-theme]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.theme === state.theme);
    });

    toggleFont.checked = state.fontLexend;
    toggleSpacing.checked = state.wideSpacing;
    toggleMotion.checked = state.reduceMotion;
    speechRateInput.value = state.speechRate;
  }

  document.querySelectorAll("[data-font-size]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.fontSize = btn.dataset.fontSize;
      saveState();
      applySettingsToDom();
    });
  });

  document.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.theme = btn.dataset.theme;
      saveState();
      applySettingsToDom();
    });
  });

  toggleFont.addEventListener("change", () => {
    state.fontLexend = toggleFont.checked;
    saveState();
    applySettingsToDom();
  });
  toggleSpacing.addEventListener("change", () => {
    state.wideSpacing = toggleSpacing.checked;
    saveState();
    applySettingsToDom();
  });
  toggleMotion.addEventListener("change", () => {
    state.reduceMotion = toggleMotion.checked;
    saveState();
    applySettingsToDom();
  });
  speechRateInput.addEventListener("change", () => {
    state.speechRate = Number(speechRateInput.value);
    saveState();
  });
  testVoiceBtn.addEventListener("click", () => {
    speak("Hola, así sonará mi voz al leer los cuentos.");
  });

  // ===== Inicio =====
  function init() {
    applySettingsToDom();
    updateStarTotal();
    if (state.nombre) {
      childNameInput.value = state.nombre;
      goToMenu();
    } else {
      showScreen("welcome");
    }
  }

  init();
})();
