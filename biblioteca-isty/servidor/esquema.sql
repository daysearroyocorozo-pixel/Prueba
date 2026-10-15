-- =====================================================================
--  Biblioteca ISTY · Instituto Superior Tecnológico CIC-Yasuní
--  Base de datos MySQL / MariaDB
--  Compatible con MySQL 5.7+, MySQL 8 y MariaDB 10.3+ (utf8mb4).
--
--  Cómo importarla (cPanel / phpMyAdmin):
--    1. Cree una base de datos vacía (por ejemplo «isty_biblioteca») y un
--       usuario de MySQL con todos los privilegios sobre ella.
--    2. En phpMyAdmin seleccione esa base y use «Importar» con este archivo.
--    3. Escriba esos datos de conexión en biblioteca-isty/api/config.php.
--    4. Abra la biblioteca: la primera vez pedirá crear el administrador.
--
--  Fechas y horas se guardan en UTC.
-- =====================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

DROP VIEW IF EXISTS vista_titulos_por_carrera;
DROP VIEW IF EXISTS vista_usuarios;
DROP TABLE IF EXISTS consultas;
DROP TABLE IF EXISTS accesos;
DROP TABLE IF EXISTS prestamos;
DROP TABLE IF EXISTS libros;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS carreras;
DROP TABLE IF EXISTS roles;

SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- Roles de usuario
--   admin           Administrador: gestiona libros, carreras, usuarios,
--                   préstamos y reportes.
--   docente         Consulta el catálogo y solicita préstamos.
--   estudiante      Consulta el catálogo y solicita préstamos.
--   administrativo  Personal administrativo del instituto: consulta el
--                   catálogo y solicita préstamos.
-- ---------------------------------------------------------------------
CREATE TABLE roles (
  id                VARCHAR(20)  NOT NULL,
  nombre            VARCHAR(60)  NOT NULL,
  descripcion       VARCHAR(255) NOT NULL DEFAULT '',
  puede_administrar TINYINT(1)   NOT NULL DEFAULT 0,
  orden             SMALLINT     NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO roles (id, nombre, descripcion, puede_administrar, orden) VALUES
  ('admin',          'Administrador',  'Gestiona libros, carreras, usuarios, préstamos y reportes.', 1, 1),
  ('docente',        'Docente',        'Consulta el catálogo y solicita préstamos.',                 0, 2),
  ('estudiante',     'Estudiante',     'Consulta el catálogo y solicita préstamos.',                 0, 3),
  ('administrativo', 'Administrativo', 'Personal administrativo: consulta el catálogo y solicita préstamos.', 0, 4);

-- ---------------------------------------------------------------------
-- Carreras (el prefijo se usa en el código de cada libro: IA-001)
-- ---------------------------------------------------------------------
CREATE TABLE carreras (
  id       VARCHAR(60)  NOT NULL,
  nombre   VARCHAR(120) NOT NULL,
  prefijo  VARCHAR(5)   NOT NULL,
  icono    VARCHAR(30)  NOT NULL DEFAULT 'carreras',
  vigente  TINYINT(1)   NOT NULL DEFAULT 1,
  orden    INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_carreras_prefijo (prefijo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Usuarios. La contraseña se guarda solo como hash (bcrypt, generado por
-- PHP con password_hash). Nunca en texto plano.
-- ---------------------------------------------------------------------
CREATE TABLE usuarios (
  usuario          VARCHAR(40)  NOT NULL,
  nombre           VARCHAR(120) NOT NULL,
  rol              VARCHAR(20)  NOT NULL DEFAULT 'estudiante',
  carrera_id       VARCHAR(60)  NULL,
  contrasena_hash  VARCHAR(255) NOT NULL,
  activo           TINYINT(1)   NOT NULL DEFAULT 1,
  creado           DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  actualizado      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  ultimo_ingreso   DATETIME(3)  NULL,
  PRIMARY KEY (usuario),
  KEY ix_usuarios_rol (rol),
  KEY ix_usuarios_carrera (carrera_id),
  CONSTRAINT fk_usuarios_rol     FOREIGN KEY (rol)        REFERENCES roles (id)    ON UPDATE CASCADE,
  CONSTRAINT fk_usuarios_carrera FOREIGN KEY (carrera_id) REFERENCES carreras (id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Libros
-- ---------------------------------------------------------------------
CREATE TABLE libros (
  id           VARCHAR(40)  NOT NULL,
  codigo       VARCHAR(20)  NOT NULL,
  carrera_id   VARCHAR(60)  NULL,
  titulo       VARCHAR(255) NOT NULL,
  autor        VARCHAR(255) NOT NULL DEFAULT '',
  editorial    VARCHAR(150) NOT NULL DEFAULT '',
  anio         SMALLINT     NULL,
  isbn         VARCHAR(20)  NOT NULL DEFAULT '',
  categoria    VARCHAR(100) NOT NULL DEFAULT '',
  formato      ENUM('fisico','virtual','ambos') NOT NULL DEFAULT 'fisico',
  ejemplares   INT          NOT NULL DEFAULT 0,
  ubicacion    VARCHAR(80)  NOT NULL DEFAULT '',
  enlace       VARCHAR(600) NOT NULL DEFAULT '',
  descripcion  TEXT         NULL,
  portada      MEDIUMTEXT   NULL COMMENT 'Imagen JPEG en base64 (data:) o enlace https',
  creado       DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  actualizado  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_libros_codigo (codigo),
  KEY ix_libros_carrera (carrera_id),
  KEY ix_libros_titulo (titulo),
  CONSTRAINT fk_libros_carrera FOREIGN KEY (carrera_id) REFERENCES carreras (id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Préstamos. Se guardan nombre, rol, carrera y título del momento para que
-- el historial no cambie si luego se edita o elimina el usuario o el libro.
-- ---------------------------------------------------------------------
CREATE TABLE prestamos (
  id          VARCHAR(40)  NOT NULL,
  libro_id    VARCHAR(40)  NULL,
  titulo      VARCHAR(255) NOT NULL DEFAULT '',
  usuario     VARCHAR(40)  NOT NULL,
  nombre      VARCHAR(120) NOT NULL DEFAULT '',
  rol         VARCHAR(20)  NOT NULL DEFAULT '',
  carrera_id  VARCHAR(60)  NULL,
  estado      ENUM('solicitado','prestado','devuelto','rechazado','cancelado') NOT NULL DEFAULT 'solicitado',
  solicitado  DATETIME(3)  NOT NULL,
  entregado   DATETIME(3)  NULL,
  limite      DATETIME(3)  NULL,
  devuelto    DATETIME(3)  NULL,
  PRIMARY KEY (id),
  KEY ix_prestamos_libro (libro_id),
  KEY ix_prestamos_usuario (usuario),
  KEY ix_prestamos_estado (estado),
  KEY ix_prestamos_solicitado (solicitado),
  CONSTRAINT fk_prestamos_libro FOREIGN KEY (libro_id) REFERENCES libros (id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Registro de ingresos y salidas del sistema
-- ---------------------------------------------------------------------
CREATE TABLE accesos (
  id          VARCHAR(40)  NOT NULL,
  fecha       DATETIME(3)  NOT NULL,
  usuario     VARCHAR(40)  NOT NULL,
  nombre      VARCHAR(120) NOT NULL DEFAULT '',
  rol         VARCHAR(20)  NOT NULL DEFAULT '',
  carrera_id  VARCHAR(60)  NULL,
  tipo        VARCHAR(20)  NOT NULL COMMENT 'Ingreso | Salida',
  ip          VARCHAR(45)  NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  KEY ix_accesos_fecha (fecha),
  KEY ix_accesos_usuario (usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Libros consultados (ficha o versión virtual)
-- ---------------------------------------------------------------------
CREATE TABLE consultas (
  id                VARCHAR(40)  NOT NULL,
  fecha             DATETIME(3)  NOT NULL,
  usuario           VARCHAR(40)  NOT NULL,
  nombre            VARCHAR(120) NOT NULL DEFAULT '',
  rol               VARCHAR(20)  NOT NULL DEFAULT '',
  carrera_id        VARCHAR(60)  NULL,
  libro_id          VARCHAR(40)  NULL,
  titulo            VARCHAR(255) NOT NULL DEFAULT '',
  libro_carrera_id  VARCHAR(60)  NULL,
  accion            VARCHAR(40)  NOT NULL DEFAULT 'Consulta de ficha',
  PRIMARY KEY (id),
  KEY ix_consultas_fecha (fecha),
  KEY ix_consultas_usuario (usuario),
  KEY ix_consultas_libro (libro_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Vistas para consultas directas desde phpMyAdmin
-- ---------------------------------------------------------------------
CREATE VIEW vista_usuarios AS
  SELECT u.usuario, u.nombre, r.nombre AS rol, c.nombre AS carrera, u.activo, u.creado, u.ultimo_ingreso
  FROM usuarios u
  JOIN roles r ON r.id = u.rol
  LEFT JOIN carreras c ON c.id = u.carrera_id;

CREATE VIEW vista_titulos_por_carrera AS
  SELECT c.nombre AS carrera,
         COUNT(l.id) AS titulos,
         COALESCE(SUM(l.formato IN ('fisico','ambos')), 0) AS en_fisico,
         COALESCE(SUM(l.formato IN ('virtual','ambos')), 0) AS virtuales,
         COALESCE(SUM(CASE WHEN l.formato <> 'virtual' THEN l.ejemplares ELSE 0 END), 0) AS ejemplares_fisicos
  FROM carreras c
  LEFT JOIN libros l ON l.carrera_id = c.id
  GROUP BY c.id, c.nombre, c.orden
  ORDER BY c.orden;
