/* Interfaz de chat del tutor virtual.
   La conversación se guarda solo en esta pestaña (sessionStorage). */

(function () {
  "use strict";

  // Parámetros que envía el muñequito de Moodle: ?curso=25&cm=310&embed=1
  const params = new URLSearchParams(location.search);
  const CURSO = params.get("curso") || "";
  const CM = params.get("cm") || "";
  const EMBEBIDO = params.get("embed") === "1";
  const CLAVE = "tutor_conversacion_v1_" + (CURSO || "local");
  const chat = document.getElementById("chat");
  const formulario = document.getElementById("formulario");
  const pregunta = document.getElementById("pregunta");
  const enviar = document.getElementById("enviar");
  const sugerencias = document.getElementById("sugerencias");

  let config = { bienvenida: "¡Hola! ¿Qué duda tienes sobre el curso?", sugerencias: [] };
  let historial = cargar();
  let ocupado = false;

  function cargar() {
    try { return JSON.parse(sessionStorage.getItem(CLAVE)) || []; } catch (e) { return []; }
  }
  function guardar() {
    try { sessionStorage.setItem(CLAVE, JSON.stringify(historial)); } catch (e) { /* sin almacenamiento */ }
  }

  // ===== Markdown sencillo y seguro (se escapa todo el HTML primero) =====
  function escapar(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function enLinea(t) {
    return t
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, "$1<em>$2</em>")
      .replace(/(^|[^\w])_([^_\n]+)_(?!\w)/g, "$1<em>$2</em>");
  }
  function markdown(texto) {
    const bloques = escapar(texto).split(/```/);
    let html = "";
    bloques.forEach(function (bloque, i) {
      if (i % 2 === 1) {
        html += "<pre><code>" + bloque.replace(/^[^\n]*\n/, "") + "</code></pre>";
        return;
      }
      let lista = null;
      let parrafo = [];
      function cerrarParrafo() {
        if (parrafo.length) { html += "<p>" + enLinea(parrafo.join("<br>")) + "</p>"; parrafo = []; }
      }
      function cerrarLista() { if (lista) { html += "</" + lista + ">"; lista = null; } }
      bloque.split("\n").forEach(function (linea) {
        let m;
        if ((m = linea.match(/^\s*[-*]\s+(.*)/))) {
          cerrarParrafo();
          if (lista !== "ul") { cerrarLista(); html += "<ul>"; lista = "ul"; }
          html += "<li>" + enLinea(m[1]) + "</li>";
        } else if ((m = linea.match(/^\s*\d+[.)]\s+(.*)/))) {
          cerrarParrafo();
          if (lista !== "ol") { cerrarLista(); html += "<ol>"; lista = "ol"; }
          html += "<li>" + enLinea(m[1]) + "</li>";
        } else if ((m = linea.match(/^#{1,6}\s+(.*)/))) {
          cerrarParrafo(); cerrarLista();
          html += "<h4>" + enLinea(m[1]) + "</h4>";
        } else if (!linea.trim()) {
          cerrarParrafo(); cerrarLista();
        } else {
          cerrarLista();
          parrafo.push(linea);
        }
      });
      cerrarParrafo(); cerrarLista();
    });
    return html;
  }

  // ===== Mensajes en pantalla =====
  function agregarBurbuja(rol, texto) {
    const div = document.createElement("div");
    div.className = "mensaje " + (rol === "user" ? "usuario" : "tutor");
    if (rol === "user") div.textContent = texto; else div.innerHTML = markdown(texto);
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div;
  }

  function pintarTodo() {
    chat.innerHTML = "";
    agregarBurbuja("assistant", config.bienvenida);
    historial.forEach(function (m) { agregarBurbuja(m.role, m.content); });
    sugerencias.hidden = historial.length > 0;
  }

  function pintarSugerencias() {
    sugerencias.innerHTML = "";
    (config.sugerencias || []).forEach(function (s) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = s;
      b.addEventListener("click", function () { preguntar(s); });
      sugerencias.appendChild(b);
    });
    sugerencias.hidden = historial.length > 0;
  }

  function setOcupado(valor) {
    ocupado = valor;
    enviar.disabled = valor;
    pregunta.disabled = valor;
    if (!valor) pregunta.focus();
  }

  // ===== Envío de preguntas con respuesta en streaming =====
  async function preguntar(texto) {
    texto = texto.trim();
    if (!texto || ocupado) return;
    setOcupado(true);
    sugerencias.hidden = true;

    historial.push({ role: "user", content: texto });
    guardar();
    agregarBurbuja("user", texto);

    const burbuja = agregarBurbuja("assistant", "");
    burbuja.innerHTML = '<span class="escribiendo" aria-label="El tutor está escribiendo"><span></span><span></span><span></span></span>';
    let respuesta = "";
    let error = "";

    try {
      const res = await fetch("api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historial, curso: CURSO, cm: CM })
      });
      if (!res.ok) {
        const datos = await res.json().catch(function () { return {}; });
        throw new Error(datos.error || "No se pudo conectar con el tutor.");
      }
      const lector = res.body.getReader();
      const decodificador = new TextDecoder();
      let pendiente = "";
      for (;;) {
        const { value, done } = await lector.read();
        if (done) break;
        pendiente += decodificador.decode(value, { stream: true });
        const eventos = pendiente.split("\n\n");
        pendiente = eventos.pop();
        eventos.forEach(function (ev) {
          if (!ev.startsWith("data: ")) return;
          const datos = JSON.parse(ev.slice(6));
          if (datos.type === "text") respuesta += datos.text;
          else if (datos.type === "replace") respuesta = datos.text;
          else if (datos.type === "error") error = datos.text;
        });
        if (respuesta) {
          burbuja.innerHTML = markdown(respuesta);
          chat.scrollTop = chat.scrollHeight;
        }
      }
    } catch (e) {
      error = e.message || "No se pudo conectar con el tutor.";
    }

    if (respuesta) {
      historial.push({ role: "assistant", content: respuesta });
    } else {
      // Sin respuesta: se quita la pregunta del historial para poder reintentar.
      historial.pop();
      burbuja.classList.add("error");
      burbuja.textContent = error || "No recibí respuesta. Inténtalo de nuevo.";
    }
    guardar();
    setOcupado(false);
  }

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const texto = pregunta.value;
    pregunta.value = "";
    pregunta.style.height = "";
    preguntar(texto);
  });

  pregunta.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formulario.requestSubmit();
    }
  });

  pregunta.addEventListener("input", function () {
    pregunta.style.height = "auto";
    pregunta.style.height = Math.min(pregunta.scrollHeight, 160) + "px";
  });

  document.getElementById("nueva").addEventListener("click", function () {
    if (ocupado) return;
    historial = [];
    guardar();
    pintarTodo();
    pintarSugerencias();
    pregunta.focus();
  });

  if (EMBEBIDO) {
    document.body.classList.add("embebido");
    const cerrar = document.getElementById("cerrar");
    cerrar.hidden = false;
    cerrar.addEventListener("click", function () {
      window.parent.postMessage({ tipo: "tutor-cerrar" }, "*");
    });
  }

  // Mientras el tutor termina de leer el curso por primera vez, se consulta
  // de nuevo cada pocos segundos para mostrar el nombre del curso.
  function cargarConfig(primeraVez) {
    const url = "api/config" + (CURSO ? "?curso=" + encodeURIComponent(CURSO) : "");
    return fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (c) {
        if (c.error) throw new Error(c.error);
        config = c;
        document.getElementById("nombre-tutor").textContent = c.tutor;
        document.getElementById("nombre-curso").textContent =
          c.estado === "leyendo" ? "Leyendo el contenido del curso…" : c.curso;
        document.title = c.tutor + (c.curso ? " · " + c.curso : "");
        if (c.estado === "leyendo") setTimeout(function () { cargarConfig(false); }, 4000);
      })
      .catch(function (e) {
        if (e.message) document.getElementById("nombre-curso").textContent = e.message;
      })
      .finally(function () {
        if (primeraVez) { pintarTodo(); pintarSugerencias(); }
      });
  }
  cargarConfig(true);
})();
