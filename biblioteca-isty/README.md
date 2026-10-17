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

**Administrador** (menú 🛠️ Administración)
- **Libros**: agregar, editar y eliminar; asignarlos a una carrera.
- **Carreras**: crear, editar, eliminar y marcar como **vigente / no vigente**
  (las no vigentes se ocultan a los estudiantes y conservan sus libros).
- **Usuarios**: crear estudiantes, docentes y administradores, asignar carrera, generar
  contraseñas, activar/desactivar cuentas.
- **Préstamos**: entregar (plazo de 7 días), recibir devoluciones, rechazar
  solicitudes; los préstamos vencidos se marcan en rojo.
- **Reportes** (descargables en Excel `.xlsx`): filtrables por fechas, tipo de lector
  (docentes y estudiantes, solo docentes, solo estudiantes o todos), carrera y búsqueda, con totales por carrera:
  - **Títulos de la biblioteca**: número de títulos, ejemplares y disponibles por
    carrera (con el total) y el listado numerado de cada libro con su carrera,
    autor, editorial, año, ISBN, categoría y ubicación. Se puede filtrar por carrera.
  - **Ingresos al sistema**: quién entró y salió, con rol, carrera, fecha y hora.
  - **Libros consultados**: quién abrió la ficha de qué libro o su versión digital,
    con el tipo de lector (docente o estudiante), su carrera, la carrera del libro,
    fecha y hora.
  - **Préstamos**: quién pidió qué libro, su carrera, fechas de solicitud,
    entrega, límite y devolución, y el estado (incluye «Vencido»).
  - Se puede bajar un reporte o todos juntos en un archivo (una hoja por reporte).
- **Respaldo**: descargar y restaurar todos los datos en un archivo JSON.

## Datos

- Las carreras y libros iniciales están en `js/data.js`. **Ajusta esa lista a la
  oferta académica vigente del instituto** (o edítala desde Administración).
- **Con Supabase** (recomendado): los datos se guardan en una base de datos en la nube y
  se comparten entre todos los equipos (ver «Conectar con Supabase»).
- **Sin Supabase**: los datos se guardan en el navegador (`localStorage`) del equipo donde
  se usa la biblioteca; usa «Respaldo» para copiarlos a otro equipo.
- Las contraseñas se guardan cifradas (PBKDF2-SHA256 con sal), nunca en texto plano.
  El cifrado requiere abrir la página por `https://` o `localhost`.

## Conectar con Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor → New query**, pega el contenido de `supabase/schema.sql` y pulsa **Run**.
   Se crean las tablas `carreras`, `libros`, `usuarios`, `prestamos`, `accesos` y `consultas`.
3. En **Project Settings → API** copia la **Project URL** y la clave pública **anon**
   (o **publishable**) y pégalas en `js/config.js`. **Nunca** uses la clave `service_role` / secret.
4. Abre la biblioteca. Si la base está vacía, se suben automáticamente los datos que ya
   había en ese navegador (o las carreras y libros iniciales).

Cómo funciona:
- Al abrir la página se descargan todos los datos; cada cambio sube solo los registros
  modificados. Al cambiar de sección o volver a la pestaña se traen los cambios hechos
  desde otros equipos; los registros de ingresos y consultas se recargan al abrir Reportes.
- Si no hay conexión al abrir, se trabaja con la copia guardada en ese navegador y se avisa.

**Seguridad:** la biblioteca maneja sus propios usuarios y contraseñas, así que cualquiera
que tenga la clave pública puede leer y modificar las tablas (incluidas las contraseñas
cifradas). Es suficiente para uso interno del instituto; para un sistema expuesto en
internet convendría migrar el inicio de sesión a **Supabase Auth** y restringir las
políticas RLS por rol.

## Estructura

```
index.html        Pantallas de acceso y estructura de la aplicación
css/styles.css    Estilos con los colores institucionales (modo claro y oscuro)
js/config.js      URL y clave pública de Supabase (vacío = solo en el navegador)
js/data.js        Carreras y libros iniciales
js/store.js       Almacenamiento (Supabase + localStorage), sesión, registro de actividad y cifrado de contraseñas
js/xlsx.js        Generador de archivos Excel para los reportes
js/app.js         Catálogo, préstamos y portal de administración
supabase/schema.sql  Script para crear las tablas en Supabase
assets/           Logo institucional
```
