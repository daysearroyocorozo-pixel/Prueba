/* =========================================================
   Configuración del acceso al Laboratorio Virtual ISTY.
   ---------------------------------------------------------
   API_URL: dirección del servicio de usuarios del servidor del
   instituto (lo implementa el área de TI; ver portal/API.md).
     · Vacío ('')  → MODO DE DEMOSTRACIÓN: usuarios de prueba de
       js/isty-usuarios-demo.js y registro guardado solo en este
       navegador. No es seguro: solo para probar.
     · Con valor   → se usan el inicio de sesión y el registro del
       servidor, p. ej. 'https://laboratorio.ist-cicyasuni.edu.ec/api'
   ========================================================= */
window.ISTY_CONFIG = {
  API_URL: '',
  // nombre del laboratorio que se muestra en los simuladores
  INSTITUCION: 'Laboratorio Virtual ISTY'
};
