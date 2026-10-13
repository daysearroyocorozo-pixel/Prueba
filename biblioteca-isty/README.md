# Biblioteca ISTY · Instituto Superior Tecnológico CIC-Yasuní

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
   cuentas de prueba `estudiante` y `docente`, contraseña `isty2026`).
2. Después, cada persona entra con su **usuario y contraseña**.

## Funciones

**Estudiantes y docentes**
- Catálogo por carreras (su carrera aparece primero, marcada como «Mi carrera»).
- Buscador general por título, autor, ISBN, editorial o tema, sin importar tildes.
- Dentro de cada carrera: filtro por categoría/materia y «solo disponibles».
- Ficha del libro con editorial, año, ISBN, ubicación en estante, ejemplares
  disponibles y enlace a la versión digital si existe.
- **Solicitar préstamo** y ver/cancelar sus préstamos en «Mis préstamos».

**Código y formato de cada libro**
- Cada libro tiene un **código** único formado por el prefijo de su carrera y un número
  (`IA-001`, `CI-002`…). Al crear un libro se propone el siguiente código de la carrera;
  se puede cambiar y el sistema no permite códigos repetidos. El prefijo de cada carrera
  se edita en Administración → Carreras.
- Cada libro se marca como **Físico**, **Virtual** o **Físico y virtual**:
  - físico: ejemplares, estante y préstamo;
  - virtual: enlace a la versión digital (PDF, repositorio o biblioteca digital), que
    se abre desde la ficha del libro sin préstamo.
- El catálogo y la administración se pueden filtrar por formato, y el buscador
  encuentra libros por su código.

**Administrador** (menú Administración)
- **Libros**: agregar, editar y eliminar; asignarlos a una carrera.
- **Carreras**: crear, editar, eliminar y marcar como **vigente / no vigente**
  (las no vigentes se ocultan a los estudiantes y conservan sus libros).
- **Usuarios**: crear estudiantes, docentes y administradores, asignar carrera, generar
  contraseñas, activar/desactivar cuentas.
- **Préstamos**: entregar (plazo de 7 días), recibir devoluciones, rechazar
  solicitudes; los préstamos vencidos se marcan en rojo.
- **Reportes** (descargables en Excel `.xlsx`): filtrables por fechas, tipo de lector
  (docentes y estudiantes, solo docentes, solo estudiantes o todos), carrera y búsqueda, con totales por carrera:
  - **Títulos de la biblioteca**: por carrera, número de títulos, cuántos están en
    físico y cuántos son virtuales, ejemplares y disponibles (con el total), y el
    listado de cada libro con su código, formato, carrera, autor, editorial, año, ISBN,
    categoría, ubicación y enlace virtual. Se puede filtrar por carrera.
  - **Ingresos al sistema**: quién entró y salió, con rol, carrera, fecha y hora.
  - **Libros consultados**: quién abrió la ficha de qué libro o su versión digital,
    con el tipo de lector (docente o estudiante), su carrera, la carrera del libro,
    fecha y hora.
  - **Préstamos**: quién pidió qué libro, su carrera, fechas de solicitud,
    entrega, límite y devolución, y el estado (incluye «Vencido»).
  - Se puede bajar un reporte o todos juntos en un archivo (una hoja por reporte).
- **Respaldo**: descargar y restaurar todos los datos en un archivo JSON.

## Datos

- Carreras vigentes cargadas (`js/data.js`): Educación Básica, Inteligencia Artificial,
  Control de Incendios y Operaciones de Rescate, Construcción, Administración de
  Instituciones Públicas, Administración de Sistemas de Salud, Gestión de Operaciones
  Turísticas y Vigilancia y Seguridad Ciudadana. Cada una trae libros de ejemplo que se
  editan o reemplazan desde Administración.
- La interfaz usa íconos vectoriales propios (`js/icons.js`), sin emojis.
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
js/store.js       Almacenamiento, sesión, registro de actividad y cifrado de contraseñas
js/xlsx.js        Generador de archivos Excel para los reportes
js/icons.js       Íconos de la interfaz y de las carreras
js/app.js         Catálogo, préstamos y portal de administración
assets/           Logo institucional
```
