# Biblioteca ISTY · Instituto Superior Tecnológico CIC-Yasuní 📚

Sistema web de biblioteca con **inicio de sesión** y catálogo de libros
**organizado por carreras vigentes**, con el logo y los colores institucionales
(verde bosque `#1a4d22`, verde ISTY `#52b066`, lima `#99b928` y amarillo `#f2e21b`).
Funciona en celular, tablet y computadora. Es HTML/CSS/JS puro: no requiere instalación.

## Cómo usarla

```bash
# Desde la raíz del repositorio
python3 -m http.server 8080
# Abrir http://localhost:8080/biblioteca-isty/
```

1. La **primera vez** se crea la cuenta del **administrador** (opcionalmente también
   un estudiante de prueba: `estudiante` / `isty2026`).
2. Después, cada persona entra con su **usuario y contraseña**.

## Funciones

**Estudiantes**
- Catálogo por carreras (su carrera aparece primero, marcada como «Mi carrera»).
- Buscador general por título, autor, ISBN, editorial o tema, sin importar tildes.
- Dentro de cada carrera: filtro por categoría/materia y «solo disponibles».
- Ficha del libro con editorial, año, ISBN, ubicación en estante, ejemplares
  disponibles y enlace a la versión digital si existe.
- **Solicitar préstamo** y ver/cancelar sus préstamos en «Mis préstamos».

**Administrador** (menú 🛠️ Administración)
- **Libros**: agregar, editar y eliminar; asignarlos a una carrera.
- **Carreras**: crear, editar, eliminar y marcar como **vigente / no vigente**
  (las no vigentes se ocultan a los estudiantes y conservan sus libros).
- **Usuarios**: crear estudiantes y administradores, asignar carrera, generar
  contraseñas, activar/desactivar cuentas.
- **Préstamos**: entregar (plazo de 7 días), recibir devoluciones, rechazar
  solicitudes; los préstamos vencidos se marcan en rojo.
- **Respaldo**: descargar y restaurar todos los datos en un archivo JSON.

## Datos

- Las carreras y libros iniciales están en `js/data.js`. **Ajusta esa lista a la
  oferta académica vigente del instituto** (o edítala desde Administración).
- Los datos se guardan en el navegador (`localStorage`) del equipo donde se usa la
  biblioteca; usa «Respaldo» para copiarlos a otro equipo. Para compartir cuentas
  entre varios dispositivos haría falta un servidor (por ejemplo Firebase o Supabase).
- Las contraseñas se guardan cifradas (PBKDF2-SHA256 con sal), nunca en texto plano.
  El cifrado requiere abrir la página por `https://` o `localhost`.

## Estructura

```
index.html        Pantallas de acceso y estructura de la aplicación
css/styles.css    Estilos con los colores institucionales (modo claro y oscuro)
js/data.js        Carreras y libros iniciales
js/store.js       Almacenamiento, sesión y cifrado de contraseñas
js/app.js         Catálogo, préstamos y portal de administración
assets/           Logo institucional
```
