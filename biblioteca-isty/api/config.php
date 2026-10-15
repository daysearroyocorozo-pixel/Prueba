<?php
/* =====================================================================
   Biblioteca ISTY · Conexión con la base de datos MySQL / MariaDB
   Complete estos datos con los de la base creada en su hosting (cPanel →
   «Bases de datos MySQL»). En cPanel el nombre de la base y del usuario
   suelen llevar un prefijo, por ejemplo «cuenta_biblioteca».
   ===================================================================== */
return [
  'db_host'     => 'localhost',
  'db_puerto'   => 3306,
  'db_nombre'   => 'isty_biblioteca',
  'db_usuario'  => 'usuario_mysql',
  'db_clave'    => 'contraseña_mysql',

  // Días de préstamo (debe coincidir con la biblioteca).
  'dias_prestamo' => 7,

  // Duración de la sesión en minutos sin actividad.
  'sesion_minutos' => 240,
];
