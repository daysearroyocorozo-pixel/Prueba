/* Biblioteca ISTY · Datos iniciales.
   Carreras vigentes del Instituto Superior Tecnológico CIC-Yasuní y un catálogo de ejemplo.
   Se cargan la primera vez; después el administrador edita carreras y libros desde Administración.
   "icono" es el nombre de un ícono de js/icons.js; "prefijo" se usa para el código de cada libro (IA-001).
   "formato" del libro: "fisico", "virtual" o "ambos". Los códigos se asignan solos al cargar. */

const SEED_VERSION = 2;

const SEED = {
  carreras: [
    { id: "educacion-basica", prefijo: "EB", nombre: "Educación Básica", icono: "escuela", vigente: true },
    { id: "inteligencia-artificial", prefijo: "IA", nombre: "Inteligencia Artificial", icono: "chip", vigente: true },
    { id: "incendios-rescate", prefijo: "CI", nombre: "Control de Incendios y Operaciones de Rescate", icono: "llama", vigente: true },
    { id: "construccion", prefijo: "CO", nombre: "Construcción", icono: "casco", vigente: true },
    { id: "instituciones-publicas", prefijo: "AP", nombre: "Administración de Instituciones Públicas", icono: "institucion", vigente: true },
    { id: "sistemas-salud", prefijo: "SS", nombre: "Administración de Sistemas de Salud", icono: "salud", vigente: true },
    { id: "operaciones-turisticas", prefijo: "OT", nombre: "Gestión de Operaciones Turísticas", icono: "brujula", vigente: true },
    { id: "seguridad-ciudadana", prefijo: "VS", nombre: "Vigilancia y Seguridad Ciudadana", icono: "escudo", vigente: true }
  ],
  libros: [
    // Educación Básica
    { formato: "fisico", titulo: "Pedagogía de la autonomía", autor: "Paulo Freire", anio: 1997, editorial: "Siglo XXI Editores", isbn: "", carreraId: "educacion-basica", categoria: "Pedagogía", ejemplares: 3, ubicacion: "Estante EB-01" },
    { formato: "fisico", titulo: "Didáctica general", autor: "Antonio Medina Rivilla, Francisco Salvador Mata", anio: 2009, editorial: "Pearson", isbn: "", carreraId: "educacion-basica", categoria: "Didáctica", ejemplares: 2, ubicacion: "Estante EB-01" },
    { formato: "ambos", titulo: "Currículo de los niveles de educación obligatoria", autor: "Ministerio de Educación del Ecuador", anio: 2016, editorial: "MinEduc", isbn: "", carreraId: "educacion-basica", categoria: "Normativa", ejemplares: 4, ubicacion: "Estante EB-02" },
    { formato: "fisico", titulo: "Metodología de la investigación", autor: "Roberto Hernández Sampieri", anio: 2014, editorial: "McGraw-Hill", isbn: "", carreraId: "educacion-basica", categoria: "Investigación", ejemplares: 5, ubicacion: "Estante EB-02" },
    // Inteligencia Artificial
    { formato: "fisico", titulo: "Inteligencia artificial: un enfoque moderno", autor: "Stuart Russell, Peter Norvig", anio: 2004, editorial: "Pearson", isbn: "", carreraId: "inteligencia-artificial", categoria: "Fundamentos de IA", ejemplares: 3, ubicacion: "Estante IA-01" },
    { formato: "fisico", titulo: "Aprende Machine Learning con Scikit-Learn, Keras y TensorFlow", autor: "Aurélien Géron", anio: 2023, editorial: "Anaya Multimedia", isbn: "", carreraId: "inteligencia-artificial", categoria: "Aprendizaje automático", ejemplares: 2, ubicacion: "Estante IA-01" },
    { formato: "fisico", titulo: "Deep Learning", autor: "Ian Goodfellow, Yoshua Bengio, Aaron Courville", anio: 2016, editorial: "MIT Press", isbn: "", carreraId: "inteligencia-artificial", categoria: "Aprendizaje profundo", ejemplares: 1, ubicacion: "Estante IA-02" },
    { formato: "fisico", titulo: "Código limpio", autor: "Robert C. Martin", anio: 2012, editorial: "Anaya Multimedia", isbn: "", carreraId: "inteligencia-artificial", categoria: "Programación", ejemplares: 2, ubicacion: "Estante IA-02" },
    // Control de Incendios y Operaciones de Rescate
    { formato: "fisico", titulo: "Manual de protección contra incendios", autor: "National Fire Protection Association (NFPA)", anio: 2009, editorial: "Editorial MAPFRE", isbn: "", carreraId: "incendios-rescate", categoria: "Prevención de incendios", ejemplares: 2, ubicacion: "Estante CI-01" },
    { formato: "fisico", titulo: "Fundamentos de la lucha contra incendios", autor: "IFSTA", anio: 2013, editorial: "Fire Protection Publications", isbn: "", carreraId: "incendios-rescate", categoria: "Combate de incendios", ejemplares: 2, ubicacion: "Estante CI-01" },
    { formato: "ambos", titulo: "Sistema de Comando de Incidentes: manual de referencia", autor: "USAID / OFDA", anio: 2012, editorial: "USAID", isbn: "", carreraId: "incendios-rescate", categoria: "Gestión de emergencias", ejemplares: 3, ubicacion: "Estante CI-02" },
    { formato: "fisico", titulo: "Primeros auxilios y soporte vital básico", autor: "Cruz Roja Ecuatoriana", anio: 2018, editorial: "Cruz Roja Ecuatoriana", isbn: "", carreraId: "incendios-rescate", categoria: "Atención prehospitalaria", ejemplares: 3, ubicacion: "Estante CI-02" },
    // Construcción
    { formato: "fisico", titulo: "Diseño de estructuras de concreto", autor: "Arthur H. Nilson", anio: 2001, editorial: "McGraw-Hill", isbn: "", carreraId: "construccion", categoria: "Estructuras", ejemplares: 2, ubicacion: "Estante CO-01" },
    { formato: "fisico", titulo: "Mecánica de suelos", autor: "Eulalio Juárez Badillo, Alfonso Rico Rodríguez", anio: 2005, editorial: "Limusa", isbn: "", carreraId: "construccion", categoria: "Geotecnia", ejemplares: 2, ubicacion: "Estante CO-01" },
    { formato: "ambos", titulo: "Norma Ecuatoriana de la Construcción (NEC)", autor: "Ministerio de Desarrollo Urbano y Vivienda", anio: 2015, editorial: "MIDUVI", isbn: "", carreraId: "construccion", categoria: "Normativa", ejemplares: 4, ubicacion: "Estante CO-02" },
    { formato: "fisico", titulo: "Costo y tiempo en edificación", autor: "Carlos Suárez Salazar", anio: 2002, editorial: "Limusa", isbn: "", carreraId: "construccion", categoria: "Presupuestos", ejemplares: 2, ubicacion: "Estante CO-02" },
    // Administración de Instituciones Públicas
    { formato: "fisico", titulo: "Administración", autor: "Stephen P. Robbins, Mary Coulter", anio: 2014, editorial: "Pearson", isbn: "", carreraId: "instituciones-publicas", categoria: "Gestión", ejemplares: 3, ubicacion: "Estante AP-01" },
    { formato: "fisico", titulo: "Introducción a la teoría general de la administración", autor: "Idalberto Chiavenato", anio: 2006, editorial: "McGraw-Hill", isbn: "", carreraId: "instituciones-publicas", categoria: "Teoría administrativa", ejemplares: 2, ubicacion: "Estante AP-01" },
    { formato: "ambos", titulo: "Constitución de la República del Ecuador", autor: "Asamblea Constituyente", anio: 2008, editorial: "Registro Oficial", isbn: "", carreraId: "instituciones-publicas", categoria: "Normativa", ejemplares: 4, ubicacion: "Estante AP-02" },
    { formato: "ambos", titulo: "Código Orgánico Administrativo (COA)", autor: "Asamblea Nacional del Ecuador", anio: 2017, editorial: "Registro Oficial", isbn: "", carreraId: "instituciones-publicas", categoria: "Normativa", ejemplares: 3, ubicacion: "Estante AP-02" },
    // Administración de Sistemas de Salud
    { formato: "fisico", titulo: "Medicina preventiva y salud pública", autor: "Gil Piédrola", anio: 2015, editorial: "Elsevier", isbn: "", carreraId: "sistemas-salud", categoria: "Salud pública", ejemplares: 2, ubicacion: "Estante SS-01" },
    { formato: "fisico", titulo: "Gestión hospitalaria", autor: "José Luis Temes, Manuel Mengíbar", anio: 2007, editorial: "McGraw-Hill", isbn: "", carreraId: "sistemas-salud", categoria: "Gestión de servicios de salud", ejemplares: 2, ubicacion: "Estante SS-01" },
    { formato: "ambos", titulo: "Manual del Modelo de Atención Integral de Salud (MAIS)", autor: "Ministerio de Salud Pública del Ecuador", anio: 2012, editorial: "MSP", isbn: "", carreraId: "sistemas-salud", categoria: "Normativa", ejemplares: 3, ubicacion: "Estante SS-02" },
    { formato: "fisico", titulo: "Epidemiología", autor: "Leon Gordis", anio: 2014, editorial: "Elsevier", isbn: "", carreraId: "sistemas-salud", categoria: "Epidemiología", ejemplares: 2, ubicacion: "Estante SS-02" },
    // Gestión de Operaciones Turísticas
    { formato: "fisico", titulo: "Introducción al turismo", autor: "Organización Mundial del Turismo", anio: 1998, editorial: "OMT", isbn: "", carreraId: "operaciones-turisticas", categoria: "Fundamentos", ejemplares: 2, ubicacion: "Estante OT-01" },
    { formato: "fisico", titulo: "Marketing turístico", autor: "Philip Kotler, John Bowen, James Makens", anio: 2011, editorial: "Pearson", isbn: "", carreraId: "operaciones-turisticas", categoria: "Marketing", ejemplares: 2, ubicacion: "Estante OT-01" },
    { formato: "fisico", titulo: "Ecoturismo: nuevas formas de turismo en el espacio rural", autor: "Arturo Crosby (coord.)", anio: 2009, editorial: "Bosch", isbn: "", carreraId: "operaciones-turisticas", categoria: "Turismo sostenible", ejemplares: 1, ubicacion: "Estante OT-02" },
    { formato: "ambos", titulo: "Ley de Turismo del Ecuador", autor: "Congreso Nacional del Ecuador", anio: 2002, editorial: "Registro Oficial", isbn: "", carreraId: "operaciones-turisticas", categoria: "Normativa", ejemplares: 3, ubicacion: "Estante OT-02" },
    // Vigilancia y Seguridad Ciudadana
    { formato: "fisico", titulo: "Tratado de criminología", autor: "Antonio García-Pablos de Molina", anio: 2014, editorial: "Tirant lo Blanch", isbn: "", carreraId: "seguridad-ciudadana", categoria: "Criminología", ejemplares: 2, ubicacion: "Estante VS-01" },
    { formato: "ambos", titulo: "Código Orgánico Integral Penal (COIP)", autor: "Asamblea Nacional del Ecuador", anio: 2014, editorial: "Registro Oficial", isbn: "", carreraId: "seguridad-ciudadana", categoria: "Normativa", ejemplares: 4, ubicacion: "Estante VS-01" },
    { formato: "ambos", titulo: "Ley de Seguridad Pública y del Estado", autor: "Asamblea Nacional del Ecuador", anio: 2009, editorial: "Registro Oficial", isbn: "", carreraId: "seguridad-ciudadana", categoria: "Normativa", ejemplares: 3, ubicacion: "Estante VS-02" },
    { formato: "ambos", titulo: "Seguridad ciudadana y derechos humanos", autor: "Comisión Interamericana de Derechos Humanos", anio: 2009, editorial: "OEA / CIDH", isbn: "", carreraId: "seguridad-ciudadana", categoria: "Derechos humanos", ejemplares: 2, ubicacion: "Estante VS-02" }
  ]
};
