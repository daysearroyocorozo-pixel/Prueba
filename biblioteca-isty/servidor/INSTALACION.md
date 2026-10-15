# Instalar la Biblioteca ISTY con base de datos MySQL

Con esta instalación todo se guarda en la base de datos del servidor: usuarios con sus
roles, carreras, libros (con portadas), préstamos, ingresos al sistema y libros consultados.
Así, cualquier persona puede entrar desde cualquier computadora o celular con su cuenta.

## Qué se necesita

Un hosting con **PHP 7.4 o superior** y **MySQL 5.7+ / MariaDB 10.3+**, por ejemplo uno
con cPanel. La conexión debe ser **https**.

## Pasos

### 1. Crear la base de datos
En cPanel → **Bases de datos MySQL**:
1. Cree una base de datos, por ejemplo `biblioteca`. cPanel le agrega un prefijo:
   `micuenta_biblioteca`.
2. Cree un usuario de MySQL con una contraseña segura, por ejemplo `micuenta_bib`.
3. Agregue el usuario a la base con **todos los privilegios**.

### 2. Importar `biblioteca.sql`
En cPanel → **phpMyAdmin** → seleccione la base creada → pestaña **Importar** → elija
`servidor/biblioteca.sql` → **Continuar**.

Se crean las tablas, los 4 roles (Administrador, Docente, Estudiante, Administrativo), las
8 carreras y el catálogo inicial. **No** se crean usuarios: el administrador se crea al abrir
la biblioteca por primera vez.

> Importar `biblioteca.sql` de nuevo **borra** los datos existentes. Úselo solo al instalar.

### 3. Subir la biblioteca
Suba la carpeta `biblioteca-isty` completa (por ejemplo a `public_html/biblioteca/`).
No hace falta subir la carpeta `servidor/`.

### 4. Escribir los datos de conexión
Edite en el servidor el archivo `api/config.php`, desde el Administrador de archivos de cPanel:

```php
'db_host'    => 'localhost',
'db_nombre'  => 'micuenta_biblioteca',
'db_usuario' => 'micuenta_bib',
'db_clave'   => 'la contraseña del usuario de MySQL',
```

> Escriba la contraseña real **solo en el servidor**. No la guarde en GitHub ni la envíe
> por correo.

### 5. Abrir la biblioteca
Entre a `https://su-dominio/biblioteca/`. La primera vez pide crear la cuenta del
**administrador**. Desde **Administración → Usuarios** se crean después las cuentas de
docentes, estudiantes y administrativos.

## Roles

| Rol | Puede |
|---|---|
| Administrador | Todo: libros, carreras, usuarios, préstamos, reportes y respaldo |
| Docente | Ver el catálogo, consultar libros, solicitar préstamos y ver los suyos |
| Estudiante | Lo mismo que el docente |
| Administrativo | Lo mismo que el docente (personal administrativo del instituto) |

Los permisos los verifica el servidor: una persona que no es administradora no puede
modificar libros, usuarios ni préstamos ajenos aunque lo intente desde el navegador.

## Tablas de la base de datos

| Tabla | Contenido |
|---|---|
| `roles` | Los 4 roles |
| `usuarios` | Usuario, nombre, rol, carrera, contraseña cifrada (bcrypt), activo, último ingreso |
| `carreras` | Carreras, prefijo de códigos, ícono, vigente |
| `libros` | Código, carrera, título, autor, formato (físico/virtual/ambos), ejemplares, ubicación, enlace, portada |
| `prestamos` | Quién pidió qué libro, con carrera y rol, estado y fechas |
| `accesos` | Ingresos y salidas del sistema (con IP) |
| `consultas` | Libros consultados por cada persona |
| `vista_usuarios`, `vista_titulos_por_carrera` | Vistas listas para consultar en phpMyAdmin |

## Pasar los datos de la versión anterior (sin servidor)

Si ya usó la biblioteca guardando en el navegador:
1. En esa versión, vaya a **Administración → Respaldo → Descargar respaldo**.
2. En la versión con servidor, cree el administrador y use **Restaurar respaldo** con ese
   archivo.

Se cargan libros, carreras, usuarios, préstamos y registros. Las cuentas conservan su
contraseña: el servidor la convierte a bcrypt en el primer ingreso.

## Si algo falla

- **«Error del servidor. Revise la conexión con la base de datos»**: los datos de
  `api/config.php` no coinciden con la base o el usuario de MySQL.
- **La biblioteca funciona pero no guarda en la base**: si la página no encuentra
  `api/index.php`, por ejemplo en GitHub Pages o sin PHP, trabaja en modo local y guarda
  en el navegador. Revise que la carpeta `api/` se haya subido y que el hosting tenga PHP.
