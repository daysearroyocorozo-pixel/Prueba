/* Muñequito del Tutor Virtual para Moodle.

   Se agrega al aula virtual con una sola línea (Administración del sitio →
   Apariencia → HTML adicional → "Antes de cerrar BODY"):

     <script src="https://TU-SERVIDOR-DEL-TUTOR/widget.js" defer></script>

   Aparece en todas las páginas de los cursos (no en la portada ni en el
   inicio de sesión), detecta el curso y la actividad abierta, y al hacer clic
   abre el chat del tutor para ese curso.

   Opciones (atributos del <script>):
     data-posicion="izquierda"   muestra el muñequito a la izquierda
     data-abajo="90"             distancia al borde inferior, en píxeles
     data-curso="25"             fuerza un curso (para páginas fuera de Moodle)
     data-saludo="texto"         globo de saludo ("" para no mostrarlo)
*/
(function () {
  "use strict";
  if (window.__tutorVirtual) return;
  window.__tutorVirtual = true;

  var script = document.currentScript;
  if (!script) return;
  var BASE = script.src.replace(/widget\.js(\?.*)?$/, "");
  var ORIGEN_TUTOR = new URL(BASE).origin;

  function iniciar() {
    var body = document.body;
    var clases = body.className || "";

    // Curso: el que indique el atributo, el de Moodle (M.cfg.courseId) o la clase "course-N" del <body>.
    var curso = script.getAttribute("data-curso");
    if (!curso) {
      var cfg = window.M && window.M.cfg;
      if (cfg && cfg.courseId) curso = String(cfg.courseId);
      if (!curso) {
        var m = clases.match(/(?:^|\s)course-(\d+)(?:\s|$)/);
        if (m) curso = m[1];
      }
      // El curso 1 es la portada del sitio; tampoco se muestra sin iniciar sesión.
      if (!curso || curso === "1" || /(?:^|\s)notloggedin(?:\s|$)/.test(clases)) return;
    }
    var cmMatch = clases.match(/(?:^|\s)cmid-(\d+)(?:\s|$)/);
    var cm = cmMatch ? cmMatch[1] : "";

    var izquierda = script.getAttribute("data-posicion") === "izquierda";
    var abajo = parseInt(script.getAttribute("data-abajo") || "88", 10);
    var saludo = script.hasAttribute("data-saludo")
      ? script.getAttribute("data-saludo")
      : "¡Hola! ¿Tienes alguna duda del curso? Pregúntame.";

    // Avisa al servidor para que vaya leyendo el curso antes de la primera pregunta.
    try { new Image().src = BASE + "api/preparar?curso=" + encodeURIComponent(curso); } catch (e) { /* sin importancia */ }

    var host = document.createElement("div");
    host.id = "tutor-virtual";
    body.appendChild(host);
    var raiz = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;

    var lado = izquierda ? "left" : "right";
    raiz.innerHTML =
      "<style>" +
      ":host{all:initial}" +
      "*{box-sizing:border-box}" +
      ".boton{position:fixed;" + lado + ":20px;bottom:" + abajo + "px;z-index:2147483000;" +
      "width:68px;height:68px;padding:4px;border:none;border-radius:50%;cursor:pointer;" +
      "background:#fff;box-shadow:0 6px 20px rgba(20,30,70,.28);transition:transform .2s}" +
      ".boton:hover{transform:scale(1.07)}" +
      ".boton:focus-visible{outline:3px solid #2f5fd0;outline-offset:3px}" +
      ".boton img{width:100%;height:100%;display:block;animation:flotar 3s ease-in-out infinite}" +
      ".boton.abierto img{animation:none}" +
      "@keyframes flotar{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}" +
      ".globo{position:fixed;" + lado + ":96px;bottom:" + (abajo + 14) + "px;z-index:2147483000;" +
      "max-width:230px;padding:10px 30px 10px 14px;border-radius:14px;cursor:pointer;" +
      "font:14px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#1d2233;" +
      "background:#fff;box-shadow:0 6px 20px rgba(20,30,70,.22)}" +
      ".globo .x{position:absolute;top:4px;right:6px;border:none;background:none;cursor:pointer;" +
      "font-size:16px;line-height:1;color:#5a6178;padding:4px}" +
      ".panel{position:fixed;" + lado + ":20px;bottom:" + (abajo + 80) + "px;z-index:2147483001;" +
      "width:400px;height:min(620px,calc(100vh - " + (abajo + 100) + "px));min-height:360px;" +
      "border-radius:18px;overflow:hidden;background:#fff;" +
      "box-shadow:0 12px 40px rgba(20,30,70,.32);border:1px solid rgba(20,30,70,.12)}" +
      ".panel iframe{width:100%;height:100%;border:0;display:block}" +
      "[hidden]{display:none!important}" +
      "@media (max-width:600px){" +
      ".panel{left:0;right:0;top:0;bottom:0;width:auto;height:auto;min-height:0;border-radius:0;border:none}" +
      ".globo{max-width:calc(100vw - 120px)}}" +
      "@media (prefers-reduced-motion:reduce){.boton img{animation:none}.boton{transition:none}}" +
      "</style>" +
      '<div class="globo" hidden><span class="texto"></span>' +
      '<button class="x" type="button" aria-label="Ocultar mensaje">✕</button></div>' +
      '<div class="panel" role="dialog" aria-label="Tutor virtual del curso" hidden></div>' +
      '<button class="boton" type="button" aria-expanded="false" aria-label="Abrir el tutor virtual del curso" title="Tutor virtual">' +
      '<img alt="" src="' + BASE + 'static/buho.svg"></button>';

    var boton = raiz.querySelector(".boton");
    var panel = raiz.querySelector(".panel");
    var globo = raiz.querySelector(".globo");
    var abierto = false;

    function abrir() {
      if (!panel.firstChild) {
        var marco = document.createElement("iframe");
        marco.title = "Tutor virtual del curso";
        marco.src = BASE + "?curso=" + encodeURIComponent(curso) +
          (cm ? "&cm=" + encodeURIComponent(cm) : "") + "&embed=1";
        panel.appendChild(marco);
      }
      abierto = true;
      panel.hidden = false;
      globo.hidden = true;
      boton.classList.add("abierto");
      boton.setAttribute("aria-expanded", "true");
      boton.setAttribute("aria-label", "Cerrar el tutor virtual");
      // En el celular el panel ocupa toda la pantalla y el botón queda debajo.
      boton.hidden = window.matchMedia("(max-width:600px)").matches;
      try { sessionStorage.setItem("tutor_saludo_visto", "1"); } catch (e) { /* sin almacenamiento */ }
    }

    function cerrar() {
      abierto = false;
      panel.hidden = true;
      boton.hidden = false;
      boton.classList.remove("abierto");
      boton.setAttribute("aria-expanded", "false");
      boton.setAttribute("aria-label", "Abrir el tutor virtual del curso");
      boton.focus();
    }

    boton.addEventListener("click", function () { if (abierto) cerrar(); else abrir(); });
    globo.addEventListener("click", function (e) {
      if (e.target.classList.contains("x")) {
        globo.hidden = true;
        try { sessionStorage.setItem("tutor_saludo_visto", "1"); } catch (err) { /* sin almacenamiento */ }
      } else {
        abrir();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && abierto) cerrar();
    });
    window.addEventListener("message", function (e) {
      if (e.origin === ORIGEN_TUTOR && e.data && e.data.tipo === "tutor-cerrar") cerrar();
    });

    // Saludo una vez por sesión del navegador.
    var visto = false;
    try { visto = sessionStorage.getItem("tutor_saludo_visto") === "1"; } catch (e) { /* sin almacenamiento */ }
    if (saludo && !visto) {
      globo.querySelector(".texto").textContent = saludo;
      setTimeout(function () { if (!abierto) globo.hidden = false; }, 1500);
    }
  }

  if (document.body) iniciar();
  else document.addEventListener("DOMContentLoaded", iniciar);
})();
