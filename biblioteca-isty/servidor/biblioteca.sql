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

-- ---------------------------------------------------------------------
-- Carreras vigentes del instituto
-- ---------------------------------------------------------------------
INSERT INTO carreras (id, nombre, prefijo, icono, vigente, orden) VALUES
  ('educacion-basica', 'Educación Básica', 'EB', 'escuela', 1, 1),
  ('inteligencia-artificial', 'Inteligencia Artificial', 'IA', 'chip', 1, 2),
  ('incendios-rescate', 'Control de Incendios y Operaciones de Rescate', 'CI', 'llama', 1, 3),
  ('construccion', 'Construcción', 'CO', 'casco', 1, 4),
  ('instituciones-publicas', 'Administración de Instituciones Públicas', 'AP', 'institucion', 1, 5),
  ('sistemas-salud', 'Administración de Sistemas de Salud', 'SS', 'salud', 1, 6),
  ('operaciones-turisticas', 'Gestión de Operaciones Turísticas', 'OT', 'brujula', 1, 7),
  ('seguridad-ciudadana', 'Vigilancia y Seguridad Ciudadana', 'VS', 'escudo', 1, 8);

-- ---------------------------------------------------------------------
-- Catálogo inicial (de ejemplo; se edita desde la biblioteca)
-- ---------------------------------------------------------------------
INSERT INTO libros (id, codigo, carrera_id, titulo, autor, editorial, anio, isbn, categoria, formato, ejemplares, ubicacion, enlace, descripcion, portada) VALUES
  ('lib-eb-001', 'EB-001', 'educacion-basica', 'Pedagogía de la autonomía', 'Paulo Freire', 'Siglo XXI Editores', 1997, '', 'Pedagogía', 'fisico', 3, 'Estante EB-01', '', NULL, NULL),
  ('lib-eb-002', 'EB-002', 'educacion-basica', 'Didáctica general', 'Antonio Medina Rivilla, Francisco Salvador Mata', 'Pearson', 2009, '', 'Didáctica', 'fisico', 2, 'Estante EB-01', '', NULL, NULL),
  ('lib-eb-003', 'EB-003', 'educacion-basica', 'Currículo de los niveles de educación obligatoria', 'Ministerio de Educación del Ecuador', 'MinEduc', 2016, '', 'Normativa', 'ambos', 4, 'Estante EB-02', '', NULL, NULL),
  ('lib-eb-004', 'EB-004', 'educacion-basica', 'Metodología de la investigación', 'Roberto Hernández Sampieri', 'McGraw-Hill', 2014, '', 'Investigación', 'fisico', 5, 'Estante EB-02', '', NULL, NULL),
  ('lib-ia-001', 'IA-001', 'inteligencia-artificial', 'Inteligencia artificial: un enfoque moderno', 'Stuart Russell, Peter Norvig', 'Pearson', 2004, '', 'Fundamentos de IA', 'fisico', 3, 'Estante IA-01', '', NULL, NULL),
  ('lib-ia-002', 'IA-002', 'inteligencia-artificial', 'Aprende Machine Learning con Scikit-Learn, Keras y TensorFlow', 'Aurélien Géron', 'Anaya Multimedia', 2023, '', 'Aprendizaje automático', 'fisico', 2, 'Estante IA-01', '', NULL, NULL),
  ('lib-ia-003', 'IA-003', 'inteligencia-artificial', 'Deep Learning', 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', 'MIT Press', 2016, '', 'Aprendizaje profundo', 'fisico', 1, 'Estante IA-02', '', NULL, NULL),
  ('lib-ia-004', 'IA-004', 'inteligencia-artificial', 'Código limpio', 'Robert C. Martin', 'Anaya Multimedia', 2012, '', 'Programación', 'fisico', 2, 'Estante IA-02', '', NULL, NULL),
  ('lib-ci-001', 'CI-001', 'incendios-rescate', 'Manual de protección contra incendios', 'National Fire Protection Association (NFPA)', 'Editorial MAPFRE', 2009, '', 'Prevención de incendios', 'fisico', 2, 'Estante CI-01', '', NULL, NULL),
  ('lib-ci-002', 'CI-002', 'incendios-rescate', 'Fundamentos de la lucha contra incendios', 'IFSTA', 'Fire Protection Publications', 2013, '', 'Combate de incendios', 'fisico', 2, 'Estante CI-01', '', NULL, NULL),
  ('lib-ci-003', 'CI-003', 'incendios-rescate', 'Sistema de Comando de Incidentes: manual de referencia', 'USAID / OFDA', 'USAID', 2012, '', 'Gestión de emergencias', 'ambos', 3, 'Estante CI-02', '', NULL, NULL),
  ('lib-ci-004', 'CI-004', 'incendios-rescate', 'Primeros auxilios y soporte vital básico', 'Cruz Roja Ecuatoriana', 'Cruz Roja Ecuatoriana', 2018, '', 'Atención prehospitalaria', 'fisico', 3, 'Estante CI-02', '', NULL, NULL),
  ('lib-co-001', 'CO-001', 'construccion', 'Diseño de estructuras de concreto', 'Arthur H. Nilson', 'McGraw-Hill', 2001, '', 'Estructuras', 'fisico', 2, 'Estante CO-01', '', NULL, NULL),
  ('lib-co-002', 'CO-002', 'construccion', 'Mecánica de suelos', 'Eulalio Juárez Badillo, Alfonso Rico Rodríguez', 'Limusa', 2005, '', 'Geotecnia', 'fisico', 2, 'Estante CO-01', '', NULL, NULL),
  ('lib-co-003', 'CO-003', 'construccion', 'Norma Ecuatoriana de la Construcción (NEC)', 'Ministerio de Desarrollo Urbano y Vivienda', 'MIDUVI', 2015, '', 'Normativa', 'ambos', 4, 'Estante CO-02', '', NULL, NULL),
  ('lib-co-004', 'CO-004', 'construccion', 'Costo y tiempo en edificación', 'Carlos Suárez Salazar', 'Limusa', 2002, '', 'Presupuestos', 'fisico', 2, 'Estante CO-02', '', NULL, NULL),
  ('lib-ap-001', 'AP-001', 'instituciones-publicas', 'Administración', 'Stephen P. Robbins, Mary Coulter', 'Pearson', 2014, '', 'Gestión', 'fisico', 3, 'Estante AP-01', '', NULL, NULL),
  ('lib-ap-002', 'AP-002', 'instituciones-publicas', 'Introducción a la teoría general de la administración', 'Idalberto Chiavenato', 'McGraw-Hill', 2006, '', 'Teoría administrativa', 'fisico', 2, 'Estante AP-01', '', NULL, NULL),
  ('lib-ap-003', 'AP-003', 'instituciones-publicas', 'Constitución de la República del Ecuador', 'Asamblea Constituyente', 'Registro Oficial', 2008, '', 'Normativa', 'ambos', 4, 'Estante AP-02', '', NULL, NULL),
  ('lib-ap-004', 'AP-004', 'instituciones-publicas', 'Código Orgánico Administrativo (COA)', 'Asamblea Nacional del Ecuador', 'Registro Oficial', 2017, '', 'Normativa', 'ambos', 3, 'Estante AP-02', '', NULL, NULL),
  ('lib-ss-001', 'SS-001', 'sistemas-salud', 'Medicina preventiva y salud pública', 'Gil Piédrola', 'Elsevier', 2015, '', 'Salud pública', 'fisico', 2, 'Estante SS-01', '', NULL, NULL),
  ('lib-ss-002', 'SS-002', 'sistemas-salud', 'Gestión hospitalaria', 'José Luis Temes, Manuel Mengíbar', 'McGraw-Hill', 2007, '', 'Gestión de servicios de salud', 'fisico', 2, 'Estante SS-01', '', NULL, NULL),
  ('lib-ss-003', 'SS-003', 'sistemas-salud', 'Manual del Modelo de Atención Integral de Salud (MAIS)', 'Ministerio de Salud Pública del Ecuador', 'MSP', 2012, '', 'Normativa', 'ambos', 3, 'Estante SS-02', '', NULL, NULL),
  ('lib-ss-004', 'SS-004', 'sistemas-salud', 'Epidemiología', 'Leon Gordis', 'Elsevier', 2014, '', 'Epidemiología', 'fisico', 2, 'Estante SS-02', '', NULL, NULL),
  ('lib-ot-001', 'OT-001', 'operaciones-turisticas', 'Introducción al turismo', 'Organización Mundial del Turismo', 'OMT', 1998, '', 'Fundamentos', 'fisico', 2, 'Estante OT-01', '', NULL, NULL),
  ('lib-ot-002', 'OT-002', 'operaciones-turisticas', 'Marketing turístico', 'Philip Kotler, John Bowen, James Makens', 'Pearson', 2011, '', 'Marketing', 'fisico', 2, 'Estante OT-01', '', NULL, NULL),
  ('lib-ot-003', 'OT-003', 'operaciones-turisticas', 'Ecoturismo: nuevas formas de turismo en el espacio rural', 'Arturo Crosby (coord.)', 'Bosch', 2009, '', 'Turismo sostenible', 'fisico', 1, 'Estante OT-02', '', NULL, NULL),
  ('lib-ot-004', 'OT-004', 'operaciones-turisticas', 'Ley de Turismo del Ecuador', 'Congreso Nacional del Ecuador', 'Registro Oficial', 2002, '', 'Normativa', 'ambos', 3, 'Estante OT-02', '', NULL, NULL),
  ('lib-vs-001', 'VS-001', 'seguridad-ciudadana', 'Tratado de criminología', 'Antonio García-Pablos de Molina', 'Tirant lo Blanch', 2014, '', 'Criminología', 'fisico', 2, 'Estante VS-01', '', NULL, NULL),
  ('lib-vs-002', 'VS-002', 'seguridad-ciudadana', 'Código Orgánico Integral Penal (COIP)', 'Asamblea Nacional del Ecuador', 'Registro Oficial', 2014, '', 'Normativa', 'ambos', 4, 'Estante VS-01', '', NULL, NULL),
  ('lib-vs-003', 'VS-003', 'seguridad-ciudadana', 'Ley de Seguridad Pública y del Estado', 'Asamblea Nacional del Ecuador', 'Registro Oficial', 2009, '', 'Normativa', 'ambos', 3, 'Estante VS-02', '', NULL, NULL),
  ('lib-vs-004', 'VS-004', 'seguridad-ciudadana', 'Seguridad ciudadana y derechos humanos', 'Comisión Interamericana de Derechos Humanos', 'OEA / CIDH', 2009, '', 'Derechos humanos', 'ambos', 2, 'Estante VS-02', '', NULL, NULL);

-- No se crean usuarios aquí: al abrir la biblioteca por primera vez se crea
-- la cuenta del administrador (con su contraseña cifrada por el servidor).
