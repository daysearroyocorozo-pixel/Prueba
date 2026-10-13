/* Biblioteca ISTY · Íconos vectoriales de línea (SVG, 24×24, trazo con el color del texto).
   Icon.svg("buscar") devuelve el SVG como texto; Icon.CARRERAS lista los íconos elegibles para una carrera. */

const Icon = (function () {
  "use strict";

  const P = {
    // Interfaz
    catalogo: '<path d="M4 4h4v16H4z"/><path d="M10 4h4v16h-4z"/><path d="m16.4 5.3 3.9-1 3.2 15.4-3.9 1z"/>',
    libro: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
    marcador: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    admin: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    ingresar: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    editar: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    eliminar: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>',
    descargar: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    subir: '<path d="M12 15V3"/><path d="m7 8 5-5 5 5"/><path d="M5 21h14"/>',
    ver: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    cerrar: '<path d="M18 6 6 18M6 6l12 12"/>',
    usuarios: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/><path d="M16 4.1a4 4 0 0 1 0 7.8"/><path d="M22 21v-1a6 6 0 0 0-4-5.6"/>',
    carreras: '<path d="M22 9 12 4 2 9l10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 9v6"/>',
    reporte: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 17v-3M12 17v-6M16 17v-2"/>',
    respaldo: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    enlace: '<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>',
    generar: '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
    pantalla: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    codigo: '<path d="M4 5v14M7 5v14M11 5v14M14 5v14M18 5v14M20 5v14"/>',
    excel: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="m9 12 6 6M15 12l-6 6"/>',

    // Carreras
    escuela: '<path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5"/><path d="M12 5V2h3"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M10 10h4v4h-4z"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    llama: '<path d="M12 22c4 0 7-2.8 7-7 0-4.2-3.2-6.6-4.6-9.8-.6 2-1.8 3.2-3.3 3.7C11.4 6.4 10.8 4.2 11.2 2 7.2 4.6 5 9.1 5 15c0 4.2 3 7 7 7z"/><path d="M12 22c-1.7 0-3-1.3-3-3.2 0-2 1.6-3.1 3-4.8 1.4 1.7 3 2.8 3 4.8 0 1.9-1.3 3.2-3 3.2z"/>',
    casco: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 4v5.3M6 9.3v5.4M12 9.3v5.4M18 9.3v5.4M9 14.7V20M15 14.7V20"/>',
    institucion: '<path d="M3 21h18"/><path d="M4 18h16"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="M12 3 3 8.5h18z"/>',
    salud: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M12 8.5v8M8 12.5h8"/>',
    brujula: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    escudo: '<path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    balanza: '<path d="M12 3v18M7 21h10"/><path d="M5 7h14"/><path d="m5 7-3 7a3 3 0 0 0 6 0z"/><path d="m19 7-3 7a3 3 0 0 0 6 0z"/>',
    hoja: '<path d="M5 21c0-9 5-15 15-16-1 10-7 15-15 16z"/><path d="M5 21 14 12"/>'
  };

  const CARRERAS = {
    escuela: "Escuela", chip: "Tecnología", llama: "Bomberos", casco: "Construcción", institucion: "Institución pública",
    salud: "Salud", brujula: "Turismo", escudo: "Seguridad", balanza: "Derecho", hoja: "Ambiente", libro: "Libro", carreras: "Birrete"
  };

  return {
    CARRERAS,
    svg(name, cls = "ico") {
      return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] || P.libro}</svg>`;
    }
  };
})();
