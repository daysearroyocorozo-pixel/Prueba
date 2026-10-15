/* Genera biblioteca.sql = esquema.sql + carreras y libros iniciales de js/data.js.
   Uso: node servidor/generar-sql.js  (desde la carpeta biblioteca-isty) */
const fs = require("fs");
const path = require("path");
const raiz = path.join(__dirname, "..");
const SEED = new Function(fs.readFileSync(path.join(raiz, "js/data.js"), "utf8") + "; return SEED;")();
const q = (v) => (v === null || v === undefined || v === "" ? "NULL" : typeof v === "number" ? String(v) : "'" + String(v).replace(/\\/g, "\\\\").replace(/'/g, "''") + "'");
const s = (v) => "'" + String(v || "").replace(/\\/g, "\\\\").replace(/'/g, "''") + "'";

let out = fs.readFileSync(path.join(__dirname, "esquema.sql"), "utf8");
out += "\n-- ---------------------------------------------------------------------\n-- Carreras vigentes del instituto\n-- ---------------------------------------------------------------------\n";
out += "INSERT INTO carreras (id, nombre, prefijo, icono, vigente, orden) VALUES\n" +
  SEED.carreras.map((c, i) => `  (${s(c.id)}, ${s(c.nombre)}, ${s(c.prefijo)}, ${s(c.icono)}, ${c.vigente ? 1 : 0}, ${i + 1})`).join(",\n") + ";\n";

const contador = {};
const filas = SEED.libros.map((l) => {
  const pref = SEED.carreras.find((c) => c.id === l.carreraId).prefijo;
  contador[pref] = (contador[pref] || 0) + 1;
  const codigo = `${pref}-${String(contador[pref]).padStart(3, "0")}`;
  const id = "lib-" + codigo.toLowerCase();
  return `  (${s(id)}, ${s(codigo)}, ${s(l.carreraId)}, ${s(l.titulo)}, ${s(l.autor)}, ${s(l.editorial)}, ${q(l.anio)}, ${s(l.isbn)}, ${s(l.categoria)}, ${s(l.formato || "fisico")}, ${l.formato === "virtual" ? 0 : Number(l.ejemplares) || 0}, ${s(l.ubicacion)}, '', NULL, NULL)`;
});
out += "\n-- ---------------------------------------------------------------------\n-- Catálogo inicial (de ejemplo; se edita desde la biblioteca)\n-- ---------------------------------------------------------------------\n";
out += "INSERT INTO libros (id, codigo, carrera_id, titulo, autor, editorial, anio, isbn, categoria, formato, ejemplares, ubicacion, enlace, descripcion, portada) VALUES\n" + filas.join(",\n") + ";\n";
out += "\n-- No se crean usuarios aquí: al abrir la biblioteca por primera vez se crea\n-- la cuenta del administrador (con su contraseña cifrada por el servidor).\n";
fs.writeFileSync(path.join(__dirname, "biblioteca.sql"), out);
console.log("biblioteca.sql generado:", SEED.carreras.length, "carreras,", filas.length, "libros");
