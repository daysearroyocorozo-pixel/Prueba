/* Biblioteca ISTY · Datos iniciales.
   Se cargan solo la primera vez; después el administrador edita carreras y libros
   desde el portal de Administración. Ajusta esta lista a la oferta académica vigente. */

const SEED = {
  carreras: [
    { id: "software", nombre: "Desarrollo de Software", icono: "💻", vigente: true },
    { id: "contabilidad", nombre: "Contabilidad", icono: "📊", vigente: true },
    { id: "administracion", nombre: "Administración", icono: "🏢", vigente: true },
    { id: "enfermeria", nombre: "Enfermería", icono: "🩺", vigente: true },
    { id: "educacion-inicial", nombre: "Educación Inicial", icono: "🧸", vigente: true },
    { id: "turismo", nombre: "Turismo", icono: "🧭", vigente: true },
    { id: "ambiental", nombre: "Gestión Ambiental", icono: "🌿", vigente: true },
    { id: "agropecuaria", nombre: "Producción Agropecuaria", icono: "🌱", vigente: true },
    { id: "general", nombre: "Formación General", icono: "📖", vigente: true }
  ],
  libros: [
    // Desarrollo de Software
    { titulo: "Código limpio", autor: "Robert C. Martin", anio: 2012, editorial: "Anaya Multimedia", isbn: "9788441532106", carreraId: "software", categoria: "Programación", ejemplares: 3, ubicacion: "Estante S-01" },
    { titulo: "Fundamentos de bases de datos", autor: "A. Silberschatz, H. Korth, S. Sudarshan", anio: 2014, editorial: "McGraw-Hill", isbn: "9788448190330", carreraId: "software", categoria: "Bases de datos", ejemplares: 2, ubicacion: "Estante S-02" },
    { titulo: "Ingeniería del software: un enfoque práctico", autor: "Roger S. Pressman", anio: 2010, editorial: "McGraw-Hill", isbn: "9786071503145", carreraId: "software", categoria: "Ingeniería de software", ejemplares: 2, ubicacion: "Estante S-02" },
    { titulo: "Redes de computadoras", autor: "Andrew S. Tanenbaum", anio: 2012, editorial: "Pearson", isbn: "9786073208178", carreraId: "software", categoria: "Redes", ejemplares: 1, ubicacion: "Estante S-03" },
    // Contabilidad
    { titulo: "Contabilidad general", autor: "Pedro Zapata Sánchez", anio: 2017, editorial: "Alfaomega", isbn: "9789587784180", carreraId: "contabilidad", categoria: "Contabilidad financiera", ejemplares: 4, ubicacion: "Estante C-01" },
    { titulo: "Contabilidad de costos", autor: "Charles T. Horngren", anio: 2012, editorial: "Pearson", isbn: "9786073210249", carreraId: "contabilidad", categoria: "Costos", ejemplares: 2, ubicacion: "Estante C-01" },
    { titulo: "Auditoría: un enfoque integral", autor: "O. Ray Whittington, Kurt Pany", anio: 2005, editorial: "McGraw-Hill", isbn: "9789701049068", carreraId: "contabilidad", categoria: "Auditoría", ejemplares: 1, ubicacion: "Estante C-02" },
    // Administración
    { titulo: "Administración", autor: "Stephen P. Robbins, Mary Coulter", anio: 2014, editorial: "Pearson", isbn: "9786073224252", carreraId: "administracion", categoria: "Gestión", ejemplares: 3, ubicacion: "Estante A-01" },
    { titulo: "Fundamentos de marketing", autor: "Philip Kotler, Gary Armstrong", anio: 2013, editorial: "Pearson", isbn: "9786073217217", carreraId: "administracion", categoria: "Marketing", ejemplares: 2, ubicacion: "Estante A-02" },
    { titulo: "Introducción a la teoría general de la administración", autor: "Idalberto Chiavenato", anio: 2006, editorial: "McGraw-Hill", isbn: "9789701055006", carreraId: "administracion", categoria: "Teoría administrativa", ejemplares: 2, ubicacion: "Estante A-01" },
    // Enfermería
    { titulo: "Fundamentos de enfermería", autor: "Patricia A. Potter, Anne G. Perry", anio: 2019, editorial: "Elsevier", isbn: "9788491134770", carreraId: "enfermeria", categoria: "Fundamentos", ejemplares: 3, ubicacion: "Estante E-01" },
    { titulo: "Anatomía y fisiología", autor: "Kevin T. Patton, Gary A. Thibodeau", anio: 2019, editorial: "Elsevier", isbn: "9788491134282", carreraId: "enfermeria", categoria: "Ciencias básicas", ejemplares: 2, ubicacion: "Estante E-02" },
    { titulo: "Farmacología en enfermería", autor: "Mario Castells, Silvia Hernández", anio: 2012, editorial: "Elsevier", isbn: "9788480868501", carreraId: "enfermeria", categoria: "Farmacología", ejemplares: 2, ubicacion: "Estante E-02" },
    // Educación Inicial
    { titulo: "La educación de la primera infancia", autor: "María Montessori", anio: 2014, editorial: "Ediciones Octaedro", isbn: "9788499216003", carreraId: "educacion-inicial", categoria: "Pedagogía", ejemplares: 2, ubicacion: "Estante I-01" },
    { titulo: "Psicología del desarrollo: infancia y adolescencia", autor: "David R. Shaffer", anio: 2007, editorial: "Cengage", isbn: "9789706866424", carreraId: "educacion-inicial", categoria: "Desarrollo infantil", ejemplares: 2, ubicacion: "Estante I-01" },
    { titulo: "Currículo de Educación Inicial", autor: "Ministerio de Educación del Ecuador", anio: 2014, editorial: "MinEduc", isbn: "", carreraId: "educacion-inicial", categoria: "Normativa", ejemplares: 5, ubicacion: "Estante I-02" },
    // Turismo
    { titulo: "Introducción al turismo", autor: "Organización Mundial del Turismo", anio: 1998, editorial: "OMT", isbn: "9789284402540", carreraId: "turismo", categoria: "Fundamentos", ejemplares: 2, ubicacion: "Estante T-01" },
    { titulo: "Marketing turístico", autor: "Philip Kotler, John Bowen, James Makens", anio: 2011, editorial: "Pearson", isbn: "9788483227060", carreraId: "turismo", categoria: "Marketing", ejemplares: 2, ubicacion: "Estante T-01" },
    { titulo: "Ecoturismo: nuevas formas de turismo en el espacio rural", autor: "Arturo Crosby (coord.)", anio: 2009, editorial: "Bosch", isbn: "9788497905008", carreraId: "turismo", categoria: "Turismo sostenible", ejemplares: 1, ubicacion: "Estante T-02" },
    // Gestión Ambiental
    { titulo: "Ciencia ambiental: desarrollo sostenible", autor: "G. Tyler Miller", anio: 2007, editorial: "Cengage", isbn: "9789706866899", carreraId: "ambiental", categoria: "Ecología", ejemplares: 3, ubicacion: "Estante G-01" },
    { titulo: "Evaluación de impacto ambiental", autor: "Vicente Conesa Fernández-Vítora", anio: 2010, editorial: "Mundi-Prensa", isbn: "9788484763840", carreraId: "ambiental", categoria: "Impacto ambiental", ejemplares: 2, ubicacion: "Estante G-01" },
    { titulo: "Amazonía: biodiversidad y conservación", autor: "Varios autores", anio: 2015, editorial: "Abya-Yala", isbn: "", carreraId: "ambiental", categoria: "Biodiversidad", ejemplares: 2, ubicacion: "Estante G-02" },
    // Producción Agropecuaria
    { titulo: "Edafología para la agricultura y el medio ambiente", autor: "Jaime Porta, Marta López-Acevedo", anio: 2003, editorial: "Mundi-Prensa", isbn: "9788484761488", carreraId: "agropecuaria", categoria: "Suelos", ejemplares: 2, ubicacion: "Estante P-01" },
    { titulo: "Manual de agricultura orgánica sostenible", autor: "FAO", anio: 2013, editorial: "FAO", isbn: "", carreraId: "agropecuaria", categoria: "Agricultura", ejemplares: 3, ubicacion: "Estante P-01" },
    { titulo: "Producción animal e higiene veterinaria", autor: "Carlos Buxadé Carbó", anio: 1995, editorial: "Mundi-Prensa", isbn: "9788471145925", carreraId: "agropecuaria", categoria: "Producción animal", ejemplares: 1, ubicacion: "Estante P-02" },
    // Formación General
    { titulo: "Metodología de la investigación", autor: "Roberto Hernández Sampieri", anio: 2014, editorial: "McGraw-Hill", isbn: "9781456223960", carreraId: "general", categoria: "Investigación", ejemplares: 5, ubicacion: "Estante F-01" },
    { titulo: "Normas APA, 7.ª edición: guía de citación", autor: "American Psychological Association", anio: 2020, editorial: "APA", isbn: "", carreraId: "general", categoria: "Redacción académica", ejemplares: 3, ubicacion: "Estante F-01" },
    { titulo: "Constitución de la República del Ecuador", autor: "Asamblea Constituyente", anio: 2008, editorial: "Registro Oficial", isbn: "", carreraId: "general", categoria: "Normativa", ejemplares: 4, ubicacion: "Estante F-02" }
  ]
};
