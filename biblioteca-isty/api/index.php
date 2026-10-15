<?php
/* =====================================================================
   Biblioteca ISTY · API del servidor (PHP 7.4+ con PDO MySQL)
   Conecta la biblioteca con la base de datos MySQL / MariaDB.

   Acciones (api/index.php?accion=...):
     GET  estado   ¿hay usuarios? y sesión actual
     POST setup    crea el primer administrador (solo si no hay usuarios)
     POST login    inicia sesión (registra el ingreso)
     POST logout   cierra sesión (registra la salida)
     GET  datos    carreras, libros, usuarios, préstamos y registros
                   (cada rol recibe solo lo que le corresponde)
     POST sync     guarda los cambios hechos en la biblioteca

   Seguridad: sesión PHP con cookie HttpOnly/SameSite, contraseñas con
   password_hash (bcrypt) y permisos verificados aquí según el rol.
   ===================================================================== */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const ROLES = ['admin', 'docente', 'estudiante', 'administrativo'];
const ESTADOS = ['solicitado', 'prestado', 'devuelto', 'rechazado', 'cancelado'];
const FORMATOS = ['fisico', 'virtual', 'ambos'];

$CFG = require __DIR__ . '/config.php';

function salir(array $datos, int $codigo = 200): void {
  http_response_code($codigo);
  echo json_encode($datos, JSON_UNESCAPED_UNICODE);
  exit;
}
function error_api(string $mensaje, int $codigo = 400): void { salir(['ok' => false, 'error' => $mensaje], $codigo); }

set_exception_handler(function (Throwable $e) {
  error_log('Biblioteca ISTY: ' . $e->getMessage());
  error_api('Error del servidor. Revise la conexión con la base de datos (api/config.php).', 500);
});

function db(): PDO {
  static $pdo = null;
  global $CFG;
  if ($pdo) return $pdo;
  $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $CFG['db_host'], (int)$CFG['db_puerto'], $CFG['db_nombre']);
  $pdo = new PDO($dsn, $CFG['db_usuario'], $CFG['db_clave'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]);
  $pdo->exec("SET time_zone = '+00:00'");
  return $pdo;
}
function q(string $sql, array $p = []): PDOStatement { $st = db()->prepare($sql); $st->execute($p); return $st; }

// ---------- Utilidades de datos ----------
function txt($v, int $max): string { return mb_substr(trim((string)($v ?? '')), 0, $max); }
function nulo_si_vacio($v): ?string { $v = trim((string)($v ?? '')); return $v === '' ? null : $v; }
function ahora(): string { return (new DateTime('now', new DateTimeZone('UTC')))->format('Y-m-d H:i:s.v'); }
function fecha_bd($iso): ?string {
  if ($iso === null || $iso === '') return null;
  try { $d = new DateTime((string)$iso); } catch (Exception $e) { return null; }
  $d->setTimezone(new DateTimeZone('UTC'));
  return $d->format('Y-m-d H:i:s.v');
}
function fecha_iso(?string $bd): string {
  if (!$bd) return '';
  $d = new DateTime($bd, new DateTimeZone('UTC'));
  return $d->format('Y-m-d\TH:i:s.v\Z');
}
function nuevo_id(): string { return bin2hex(random_bytes(10)); }
function usuario_valido($u): bool { return is_string($u) && preg_match('/^[a-z0-9._-]{3,40}$/', $u) === 1; }
function ip(): string { return substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45); }

function carrera_js(array $r): array {
  return ['id' => $r['id'], 'nombre' => $r['nombre'], 'prefijo' => $r['prefijo'], 'icono' => $r['icono'], 'vigente' => (bool)$r['vigente']];
}
function libro_js(array $r): array {
  return [
    'id' => $r['id'], 'codigo' => $r['codigo'], 'carreraId' => $r['carrera_id'] ?? '', 'titulo' => $r['titulo'], 'autor' => $r['autor'],
    'editorial' => $r['editorial'], 'anio' => $r['anio'] === null ? '' : (int)$r['anio'], 'isbn' => $r['isbn'], 'categoria' => $r['categoria'],
    'formato' => $r['formato'], 'ejemplares' => (int)$r['ejemplares'], 'ubicacion' => $r['ubicacion'], 'enlace' => $r['enlace'],
    'descripcion' => $r['descripcion'] ?? '', 'portada' => $r['portada'] ?? '',
  ];
}
function usuario_js(array $r): array {
  return ['usuario' => $r['usuario'], 'nombre' => $r['nombre'], 'rol' => $r['rol'], 'carreraId' => $r['carrera_id'] ?? '',
    'activo' => (bool)$r['activo'], 'creado' => fecha_iso($r['creado'])];
}
function prestamo_js(array $r): array {
  return ['id' => $r['id'], 'libroId' => $r['libro_id'] ?? '', 'titulo' => $r['titulo'], 'usuario' => $r['usuario'], 'nombre' => $r['nombre'],
    'rol' => $r['rol'], 'carreraId' => $r['carrera_id'] ?? '', 'estado' => $r['estado'], 'solicitado' => fecha_iso($r['solicitado']),
    'entregado' => fecha_iso($r['entregado']), 'limite' => fecha_iso($r['limite']), 'devuelto' => fecha_iso($r['devuelto'])];
}
function acceso_js(array $r): array {
  return ['id' => $r['id'], 'fecha' => fecha_iso($r['fecha']), 'usuario' => $r['usuario'], 'nombre' => $r['nombre'], 'rol' => $r['rol'],
    'carreraId' => $r['carrera_id'] ?? '', 'tipo' => $r['tipo']];
}
function consulta_js(array $r): array {
  return ['id' => $r['id'], 'fecha' => fecha_iso($r['fecha']), 'usuario' => $r['usuario'], 'nombre' => $r['nombre'], 'rol' => $r['rol'],
    'carreraId' => $r['carrera_id'] ?? '', 'libroId' => $r['libro_id'] ?? '', 'titulo' => $r['titulo'],
    'libroCarreraId' => $r['libro_carrera_id'] ?? '', 'accion' => $r['accion']];
}

// ---------- Contraseñas ----------
// Además de bcrypt acepta el formato de las copias de respaldo de la versión sin servidor
// (PBKDF2-SHA256, 120 000 iteraciones), y lo convierte a bcrypt en el primer ingreso.
function verificar_clave(string $clave, string $guardado): bool {
  if (strncmp($guardado, 'pbkdf2$', 7) === 0) {
    [, $sal, $hash] = array_pad(explode('$', $guardado, 3), 3, '');
    $calc = hash_pbkdf2('sha256', $clave, base64_decode($sal), 120000, 64);
    return hash_equals($hash, $calc);
  }
  return password_verify($clave, $guardado);
}

// ---------- Sesión ----------
function iniciar_sesion(): void {
  global $CFG;
  $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
  session_name('ISTYBIB');
  session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Lax']);
  session_start();
  $limite = 60 * (int)($CFG['sesion_minutos'] ?? 240);
  if (isset($_SESSION['ultimo']) && time() - $_SESSION['ultimo'] > $limite) { $_SESSION = []; session_regenerate_id(true); }
  $_SESSION['ultimo'] = time();
}
function usuario_actual(): ?array {
  if (empty($_SESSION['usuario'])) return null;
  $u = q('SELECT * FROM usuarios WHERE usuario = ?', [$_SESSION['usuario']])->fetch();
  if (!$u || !$u['activo']) { $_SESSION = []; return null; }
  return $u;
}
function exigir_sesion(): array {
  $u = usuario_actual();
  if (!$u) error_api('La sesión terminó. Vuelva a ingresar.', 401);
  return $u;
}
function registrar_acceso(array $u, string $tipo): void {
  q('INSERT INTO accesos (id, fecha, usuario, nombre, rol, carrera_id, tipo, ip) VALUES (?,?,?,?,?,?,?,?)',
    [nuevo_id(), ahora(), $u['usuario'], $u['nombre'], $u['rol'], $u['carrera_id'], $tipo, ip()]);
}

// ---------- Entrada ----------
$accion = $_GET['accion'] ?? '';
$metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$cuerpo = [];
if ($metodo === 'POST') {
  // Protección contra envíos desde otros sitios: exige JSON y el encabezado propio de la biblioteca.
  if (($_SERVER['HTTP_X_BIBLIOTECA'] ?? '') !== '1') error_api('Solicitud no permitida.', 403);
  $cuerpo = json_decode((string)file_get_contents('php://input'), true);
  if (!is_array($cuerpo)) error_api('Datos no válidos.');
}
iniciar_sesion();

switch ($accion) {
  case 'estado':
    $hay = (int)q('SELECT COUNT(*) FROM usuarios')->fetchColumn() > 0;
    $u = usuario_actual();
    salir(['ok' => true, 'hayUsuarios' => $hay, 'usuario' => $u ? usuario_js($u) : null]);

  case 'setup':
    if ($metodo !== 'POST') error_api('Use POST.', 405);
    db()->beginTransaction();
    if ((int)q('SELECT COUNT(*) FROM usuarios FOR UPDATE')->fetchColumn() > 0) { db()->rollBack(); error_api('El administrador ya fue creado.', 409); }
    $usuario = strtolower(trim((string)($cuerpo['usuario'] ?? '')));
    $nombre = txt($cuerpo['nombre'] ?? '', 120);
    $clave = (string)($cuerpo['contrasena'] ?? '');
    if (!usuario_valido($usuario) || $nombre === '' || mb_strlen($clave) < 6) { db()->rollBack(); error_api('Complete nombre, usuario válido y contraseña de al menos 6 caracteres.'); }
    $ins = 'INSERT INTO usuarios (usuario, nombre, rol, carrera_id, contrasena_hash, activo) VALUES (?,?,?,?,?,1)';
    q($ins, [$usuario, $nombre, 'admin', null, password_hash($clave, PASSWORD_DEFAULT)]);
    if (!empty($cuerpo['demo'])) {
      $demo = [['estudiante', 'Estudiante de Prueba', 'estudiante', 'inteligencia-artificial'], ['docente', 'Docente de Prueba', 'docente', 'sistemas-salud'],
        ['administrativo', 'Administrativo de Prueba', 'administrativo', null]];
      foreach ($demo as [$du, $dn, $dr, $dc]) {
        if ($du === $usuario) continue;
        if ($dc && !q('SELECT 1 FROM carreras WHERE id = ?', [$dc])->fetch()) $dc = null;
        q($ins, [$du, $dn, $dr, $dc, password_hash('isty2026', PASSWORD_DEFAULT)]);
      }
    }
    db()->commit();
    session_regenerate_id(true);
    $_SESSION['usuario'] = $usuario;
    $u = usuario_actual();
    registrar_acceso($u, 'Ingreso');
    salir(['ok' => true, 'usuario' => usuario_js($u)]);

  case 'login':
    if ($metodo !== 'POST') error_api('Use POST.', 405);
    $usuario = strtolower(trim((string)($cuerpo['usuario'] ?? '')));
    $clave = (string)($cuerpo['contrasena'] ?? '');
    $u = usuario_valido($usuario) ? q('SELECT * FROM usuarios WHERE usuario = ?', [$usuario])->fetch() : false;
    if (!$u || !verificar_clave($clave, $u['contrasena_hash'])) { sleep(1); error_api('Usuario o contraseña incorrectos.', 401); }
    if (!$u['activo']) error_api('Su cuenta está desactivada. Consulte con la biblioteca.', 403);
    if (strncmp($u['contrasena_hash'], 'pbkdf2$', 7) === 0 || password_needs_rehash($u['contrasena_hash'], PASSWORD_DEFAULT)) {
      q('UPDATE usuarios SET contrasena_hash = ? WHERE usuario = ?', [password_hash($clave, PASSWORD_DEFAULT), $u['usuario']]);
    }
    q('UPDATE usuarios SET ultimo_ingreso = ? WHERE usuario = ?', [ahora(), $u['usuario']]);
    session_regenerate_id(true);
    $_SESSION['usuario'] = $u['usuario'];
    registrar_acceso($u, 'Ingreso');
    salir(['ok' => true, 'usuario' => usuario_js($u)]);

  case 'logout':
    if ($metodo !== 'POST') error_api('Use POST.', 405);
    $u = usuario_actual();
    if ($u) registrar_acceso($u, 'Salida');
    $_SESSION = [];
    session_destroy();
    salir(['ok' => true]);

  case 'datos':
    $u = exigir_sesion();
    $admin = $u['rol'] === 'admin';
    $res = [
      'ok' => true,
      'yo' => usuario_js($u),
      'carreras' => array_map('carrera_js', q('SELECT * FROM carreras ORDER BY orden, nombre')->fetchAll()),
      'libros' => array_map('libro_js', q('SELECT * FROM libros ORDER BY codigo')->fetchAll()),
    ];
    if ($admin) {
      $res['usuarios'] = array_map('usuario_js', q('SELECT * FROM usuarios ORDER BY nombre')->fetchAll());
      $res['prestamos'] = array_map('prestamo_js', q('SELECT * FROM prestamos ORDER BY solicitado')->fetchAll());
      $res['accesos'] = array_map('acceso_js', q('SELECT * FROM accesos ORDER BY fecha')->fetchAll());
      $res['consultas'] = array_map('consulta_js', q('SELECT * FROM consultas ORDER BY fecha')->fetchAll());
    } else {
      // Lectores: su propia cuenta y sus préstamos; de los demás solo lo necesario para calcular la disponibilidad.
      $res['usuarios'] = [usuario_js($u)];
      $res['prestamos'] = array_map(function ($r) use ($u) {
        return $r['usuario'] === $u['usuario'] ? prestamo_js($r) : ['id' => $r['id'], 'libroId' => $r['libro_id'] ?? '', 'estado' => $r['estado'], 'usuario' => ''];
      }, q("SELECT * FROM prestamos WHERE usuario = ? OR estado IN ('solicitado','prestado') ORDER BY solicitado", [$u['usuario']])->fetchAll());
      $res['accesos'] = [];
      $res['consultas'] = [];
    }
    salir($res);

  case 'sync':
    if ($metodo !== 'POST') error_api('Use POST.', 405);
    $u = exigir_sesion();
    db()->beginTransaction();
    try {
      $u['rol'] === 'admin' ? sync_admin($cuerpo, $u) : sync_lector($cuerpo, $u);
      db()->commit();
    } catch (PDOException $e) {
      db()->rollBack();
      $msg = $e->getMessage();
      if (strpos($msg, 'uq_libros_codigo') !== false) error_api('Ese código de libro ya existe.', 409);
      if (strpos($msg, 'uq_carreras_prefijo') !== false) error_api('Ese prefijo ya lo usa otra carrera.', 409);
      if (strpos($msg, 'fk_libros_carrera') !== false) error_api('No se puede eliminar una carrera que tiene libros.', 409);
      throw $e;
    } catch (InvalidArgumentException $e) {
      db()->rollBack();
      error_api($e->getMessage(), 422);
    }
    salir(['ok' => true]);

  default:
    error_api('Acción no reconocida.', 404);
}

// ---------- Guardado de cambios ----------
function lista(array $c, string $k, string $op): array { return isset($c[$k][$op]) && is_array($c[$k][$op]) ? $c[$k][$op] : []; }

function sync_admin(array $c, array $yo): void {
  global $CFG;
  // Carreras
  $orden = (int)q('SELECT COALESCE(MAX(orden), 0) FROM carreras')->fetchColumn();
  foreach (lista($c, 'carreras', 'upsert') as $x) {
    $id = txt($x['id'] ?? '', 60);
    if ($id === '' || txt($x['nombre'] ?? '', 120) === '') throw new InvalidArgumentException('Carrera sin nombre.');
    q('INSERT INTO carreras (id, nombre, prefijo, icono, vigente, orden) VALUES (?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), prefijo = VALUES(prefijo), icono = VALUES(icono), vigente = VALUES(vigente)',
      [$id, txt($x['nombre'], 120), strtoupper(txt($x['prefijo'] ?? '', 5)), txt($x['icono'] ?? 'carreras', 30), empty($x['vigente']) ? 0 : 1, ++$orden]);
  }
  // Usuarios
  foreach (lista($c, 'usuarios', 'upsert') as $x) {
    $usr = strtolower((string)($x['usuario'] ?? ''));
    if (!usuario_valido($usr)) throw new InvalidArgumentException("Usuario no válido: $usr");
    $rol = in_array($x['rol'] ?? '', ROLES, true) ? $x['rol'] : 'estudiante';
    $activo = empty($x['activo']) ? 0 : 1;
    if ($usr === $yo['usuario']) { $rol = 'admin'; $activo = 1; } // el administrador no puede quitarse su propio acceso
    $hash = null;
    if (isset($x['contrasena']) && $x['contrasena'] !== '') {
      if (mb_strlen((string)$x['contrasena']) < 6) throw new InvalidArgumentException('La contraseña debe tener al menos 6 caracteres.');
      $hash = password_hash((string)$x['contrasena'], PASSWORD_DEFAULT);
    } elseif (!empty($x['hash']) && !empty($x['salt']) && preg_match('/^[0-9a-f]{64}$/', (string)$x['hash'])) {
      $hash = 'pbkdf2$' . $x['salt'] . '$' . $x['hash']; // cuenta traída de una copia de respaldo
    }
    $existe = q('SELECT 1 FROM usuarios WHERE usuario = ?', [$usr])->fetch();
    $p = [txt($x['nombre'] ?? '', 120), $rol, nulo_si_vacio($x['carreraId'] ?? null), $activo];
    if ($existe) {
      q('UPDATE usuarios SET nombre = ?, rol = ?, carrera_id = ?, activo = ?' . ($hash ? ', contrasena_hash = ?' : '') . ' WHERE usuario = ?',
        array_merge($p, $hash ? [$hash] : [], [$usr]));
    } else {
      // Cuenta restaurada de una copia sin contraseña: queda creada sin acceso hasta que el administrador le asigne una.
      if (!$hash) $hash = password_hash(bin2hex(random_bytes(16)), PASSWORD_DEFAULT);
      q('INSERT INTO usuarios (nombre, rol, carrera_id, activo, contrasena_hash, usuario) VALUES (?,?,?,?,?,?)', array_merge($p, [$hash, $usr]));
    }
  }
  // Libros
  foreach (lista($c, 'libros', 'upsert') as $x) {
    $id = txt($x['id'] ?? '', 40);
    $codigo = strtoupper(txt($x['codigo'] ?? '', 20));
    if ($id === '' || $codigo === '' || txt($x['titulo'] ?? '', 255) === '') throw new InvalidArgumentException('Libro sin código o sin título.');
    $formato = in_array($x['formato'] ?? '', FORMATOS, true) ? $x['formato'] : 'fisico';
    $enlace = txt($x['enlace'] ?? '', 600);
    if ($enlace !== '' && !preg_match('#^https?://#i', $enlace)) $enlace = '';
    $portada = (string)($x['portada'] ?? '');
    if ($portada !== '' && !preg_match('#^(data:image/(jpeg|png|webp|gif);base64,|https?://)#i', $portada)) $portada = '';
    if (strlen($portada) > 2000000) throw new InvalidArgumentException('La imagen de portada es demasiado grande.');
    $anio = is_numeric($x['anio'] ?? null) ? max(0, min(2100, (int)$x['anio'])) : null;
    q('INSERT INTO libros (id, codigo, carrera_id, titulo, autor, editorial, anio, isbn, categoria, formato, ejemplares, ubicacion, enlace, descripcion, portada)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE codigo = VALUES(codigo), carrera_id = VALUES(carrera_id), titulo = VALUES(titulo), autor = VALUES(autor),
         editorial = VALUES(editorial), anio = VALUES(anio), isbn = VALUES(isbn), categoria = VALUES(categoria), formato = VALUES(formato),
         ejemplares = VALUES(ejemplares), ubicacion = VALUES(ubicacion), enlace = VALUES(enlace), descripcion = VALUES(descripcion), portada = VALUES(portada)',
      [$id, $codigo, nulo_si_vacio($x['carreraId'] ?? null), txt($x['titulo'], 255), txt($x['autor'] ?? '', 255), txt($x['editorial'] ?? '', 150), $anio,
        txt($x['isbn'] ?? '', 20), txt($x['categoria'] ?? '', 100), $formato, $formato === 'virtual' ? 0 : max(0, (int)($x['ejemplares'] ?? 0)),
        txt($x['ubicacion'] ?? '', 80), $enlace, txt($x['descripcion'] ?? '', 5000), $portada === '' ? null : $portada]);
  }
  // Préstamos
  foreach (lista($c, 'prestamos', 'upsert') as $x) guardar_prestamo($x);
  // Registros (solo se agregan)
  foreach (lista($c, 'accesos', 'upsert') as $x) {
    q('INSERT IGNORE INTO accesos (id, fecha, usuario, nombre, rol, carrera_id, tipo) VALUES (?,?,?,?,?,?,?)',
      [txt($x['id'] ?? nuevo_id(), 40), fecha_bd($x['fecha'] ?? '') ?? ahora(), txt($x['usuario'] ?? '', 40), txt($x['nombre'] ?? '', 120),
        txt($x['rol'] ?? '', 20), nulo_si_vacio($x['carreraId'] ?? null), txt($x['tipo'] ?? 'Ingreso', 20)]);
  }
  foreach (lista($c, 'consultas', 'upsert') as $x) guardar_consulta($x, null);
  // Eliminaciones (en orden inverso a las dependencias)
  foreach (lista($c, 'prestamos', 'delete') as $id) q('DELETE FROM prestamos WHERE id = ?', [(string)$id]);
  foreach (lista($c, 'libros', 'delete') as $id) {
    if (q("SELECT 1 FROM prestamos WHERE libro_id = ? AND estado = 'prestado'", [(string)$id])->fetch()) throw new InvalidArgumentException('Ese libro tiene préstamos activos.');
    q('DELETE FROM libros WHERE id = ?', [(string)$id]);
  }
  foreach (lista($c, 'usuarios', 'delete') as $usr) if ((string)$usr !== $yo['usuario']) q('DELETE FROM usuarios WHERE usuario = ?', [(string)$usr]);
  foreach (lista($c, 'carreras', 'delete') as $id) q('DELETE FROM carreras WHERE id = ?', [(string)$id]);
}

function guardar_prestamo(array $x): void {
  $estado = in_array($x['estado'] ?? '', ESTADOS, true) ? $x['estado'] : 'solicitado';
  q('INSERT INTO prestamos (id, libro_id, titulo, usuario, nombre, rol, carrera_id, estado, solicitado, entregado, limite, devuelto)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE estado = VALUES(estado), entregado = VALUES(entregado), limite = VALUES(limite), devuelto = VALUES(devuelto)',
    [txt($x['id'] ?? '', 40), nulo_si_vacio($x['libroId'] ?? null), txt($x['titulo'] ?? '', 255), txt($x['usuario'] ?? '', 40), txt($x['nombre'] ?? '', 120),
      txt($x['rol'] ?? '', 20), nulo_si_vacio($x['carreraId'] ?? null), $estado, fecha_bd($x['solicitado'] ?? '') ?? ahora(),
      fecha_bd($x['entregado'] ?? ''), fecha_bd($x['limite'] ?? ''), fecha_bd($x['devuelto'] ?? '')]);
}

// $yo != null: la consulta se registra a nombre de quien tiene la sesión (lectores).
function guardar_consulta(array $x, ?array $yo): void {
  $libro = nulo_si_vacio($x['libroId'] ?? null);
  if ($libro && !q('SELECT 1 FROM libros WHERE id = ?', [$libro])->fetch()) $libro = null;
  q('INSERT IGNORE INTO consultas (id, fecha, usuario, nombre, rol, carrera_id, libro_id, titulo, libro_carrera_id, accion) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [txt($x['id'] ?? nuevo_id(), 40), $yo ? ahora() : (fecha_bd($x['fecha'] ?? '') ?? ahora()),
      $yo ? $yo['usuario'] : txt($x['usuario'] ?? '', 40), $yo ? $yo['nombre'] : txt($x['nombre'] ?? '', 120),
      $yo ? $yo['rol'] : txt($x['rol'] ?? '', 20), $yo ? $yo['carrera_id'] : nulo_si_vacio($x['carreraId'] ?? null),
      $libro, txt($x['titulo'] ?? '', 255), nulo_si_vacio($x['libroCarreraId'] ?? null), txt($x['accion'] ?? 'Consulta de ficha', 40)]);
}

// Docentes, estudiantes y administrativos: solo registran sus consultas, piden préstamos y cancelan sus solicitudes.
function sync_lector(array $c, array $yo): void {
  foreach (lista($c, 'consultas', 'upsert') as $x) guardar_consulta($x, $yo);
  foreach (lista($c, 'prestamos', 'upsert') as $x) {
    $id = txt($x['id'] ?? '', 40);
    if ($id === '') continue;
    $actual = q('SELECT * FROM prestamos WHERE id = ?', [$id])->fetch();
    if (!$actual) {
      $libro = q('SELECT * FROM libros WHERE id = ?', [(string)($x['libroId'] ?? '')])->fetch();
      if (!$libro || $libro['formato'] === 'virtual') throw new InvalidArgumentException('Ese libro no se puede prestar.');
      $ocupados = (int)q("SELECT COUNT(*) FROM prestamos WHERE libro_id = ? AND estado IN ('solicitado','prestado') FOR UPDATE", [$libro['id']])->fetchColumn();
      if ($ocupados >= (int)$libro['ejemplares']) throw new InvalidArgumentException('Ya no hay ejemplares disponibles de este libro.');
      if (q("SELECT 1 FROM prestamos WHERE libro_id = ? AND usuario = ? AND estado IN ('solicitado','prestado')", [$libro['id'], $yo['usuario']])->fetch()) continue;
      guardar_prestamo(['id' => $id, 'libroId' => $libro['id'], 'titulo' => $libro['titulo'], 'usuario' => $yo['usuario'], 'nombre' => $yo['nombre'],
        'rol' => $yo['rol'], 'carreraId' => $yo['carrera_id'], 'estado' => 'solicitado', 'solicitado' => '']);
    } elseif ($actual['usuario'] === $yo['usuario'] && $actual['estado'] === 'solicitado' && ($x['estado'] ?? '') === 'cancelado') {
      q("UPDATE prestamos SET estado = 'cancelado' WHERE id = ?", [$id]);
    }
  }
}
