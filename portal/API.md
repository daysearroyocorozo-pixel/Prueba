# Conexión del Laboratorio Virtual ISTY con el servidor del instituto

Guía para el área de TI. El portal (`portal/`) y los simuladores (`simulador/`) son archivos estáticos
(HTML, CSS y JavaScript). El inicio de sesión, las cuentas por carrera y el registro de ingresos se
conectan a un servicio web del instituto mediante la dirección configurada en
`simulador/js/isty-config.js`:

```js
window.ISTY_CONFIG = { API_URL: 'https://laboratorio.ist-cicyasuni.edu.ec/api', ... };
```

Mientras `API_URL` esté vacío, el sistema funciona en **modo de demostración**: usa las cuentas de
prueba de `simulador/js/isty-usuarios-demo.js` y guarda el registro solo en el navegador. No es seguro
y no debe usarse con estudiantes reales.

## Despliegue

- Copie las carpetas `portal/` y `simulador/` juntas en el mismo nivel del servidor web, con **HTTPS**
  (necesario para la cámara, la realidad aumentada y el giroscopio de las gafas VR Box).
- Entrada para los usuarios: `https://<dominio>/portal/acceso.html`.
- Si la API está en otro dominio, habilite CORS para el dominio del portal con los encabezados
  `Content-Type` y `Authorization`.

## Servicios que debe ofrecer la API (JSON)

Todas las respuestas son JSON. Después del inicio de sesión, el navegador envía
`Authorization: Bearer <token>` en cada petición.

| Método y ruta | Quién | Cuerpo | Respuesta |
|---|---|---|---|
| `POST /login` | Público | `{ "usuario", "contrasena" }` | `200 { "token", "usuario", "nombre", "carrera", "rol" }`; `401` si las credenciales son incorrectas |
| `POST /logout` | Usuario | — | `204` |
| `POST /registros` | Usuario | evento (ver abajo) | `201` o `204` |
| `GET /registros` | Administrador | — | `200 [ evento, … ]` (más recientes primero) |
| `GET /usuarios` | Administrador | — | `200 [ { "usuario", "nombre", "carrera", "rol" }, … ]` |
| `POST /usuarios` | Administrador | `{ "usuario", "nombre", "contrasena", "carrera", "rol" }` | `201`; `409` si ya existe |
| `DELETE /usuarios/{usuario}` | Administrador | — | `204` |

- `carrera`: `educacion-basica`, `incendios`, `construccion`, `administracion`, `ia`, `vigilancia`, `salud` o `turismo` (vacío para administradores).
- `rol`: `estudiante` o `admin`.
- Guarde las contraseñas **con hash** (bcrypt o argon2); nunca en texto plano.
- El token debe caducar (por ejemplo, 12 horas, igual que la sesión del navegador).
- **Control por carrera:** el navegador solo deja entrar al simulador de la carrera del usuario.
  El servidor debe verificarlo también: rechace (`403`) los registros de un estudiante cuyo
  `simulador` no coincida con su `carrera`.

### Evento de registro

```json
{
  "fecha": "2026-10-09T15:30:00.000Z",
  "tipo": "ingreso | salida | abrir_simulador | resultado",
  "usuario": "egb.demo",
  "nombre": "Nombre del estudiante",
  "carrera": "educacion-basica",
  "simulador": "educacion-basica",
  "modulo": "aula",
  "titulo": "Tema o caso practicado",
  "total": 85
}
```

`modulo`, `titulo` y `total` se envían solo cuando corresponden (`total` es la nota sobre 100 de los
eventos `resultado`). El servidor debe tomar `usuario` y `carrera` del token, no del cuerpo.

## Panel de administración

`portal/admin.html` (solo para el rol `admin`) muestra el registro de ingresos con filtros y descarga
en CSV (Excel), y permite crear y eliminar usuarios por carrera mediante los servicios anteriores.
