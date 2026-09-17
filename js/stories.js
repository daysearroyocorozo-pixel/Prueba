/* Banco de cuentos para comprensión lectora.
   Cada párrafo se muestra en su propia página para no saturar al niño o niña.
   Los niveles son orientativos: 1 = frases muy cortas, 3 = frases algo más largas. */

const STORIES = [
  {
    id: "mascota",
    titulo: "Toby quiere un amigo",
    nivel: 1,
    emoji: "🐶",
    parrafos: [
      { texto: "Toby es un perro pequeño y feliz.", emoji: "🐶" },
      { texto: "Toby vive en una casa azul con Ana.", emoji: "🏠" },
      { texto: "Toby quiere jugar en el parque.", emoji: "🌳" },
      { texto: "Ana lanza la pelota. Toby corre muy rápido.", emoji: "🎾" },
      { texto: "En el parque, Toby conoce a un gato llamado Kiko.", emoji: "🐱" },
      { texto: "Toby y Kiko juegan juntos toda la tarde.", emoji: "😊" }
    ],
    preguntas: [
      {
        texto: "¿Cómo se llama el perro del cuento?",
        opciones: ["Kiko", "Toby", "Ana", "Max"],
        correcta: 1
      },
      {
        texto: "¿De qué color es la casa de Toby?",
        opciones: ["Roja", "Verde", "Azul", "Amarilla"],
        correcta: 2
      },
      {
        texto: "¿A quién conoce Toby en el parque?",
        opciones: ["A un gato", "A un pájaro", "A otro perro", "A un conejo"],
        correcta: 0
      }
    ]
  },
  {
    id: "cumpleanos",
    titulo: "El cumpleaños de Sofía",
    nivel: 1,
    emoji: "🎂",
    parrafos: [
      { texto: "Hoy es el cumpleaños de Sofía.", emoji: "🎉" },
      { texto: "Sofía cumple siete años.", emoji: "7️⃣" },
      { texto: "Sus amigos llegan con globos de colores.", emoji: "🎈" },
      { texto: "Hay un pastel de chocolate en la mesa.", emoji: "🍫" },
      { texto: "Todos cantan 'Feliz cumpleaños' muy contentos.", emoji: "🎶" },
      { texto: "Sofía pide un deseo y sopla las velas.", emoji: "🕯️" }
    ],
    preguntas: [
      {
        texto: "¿Cuántos años cumple Sofía?",
        opciones: ["Cinco", "Seis", "Siete", "Ocho"],
        correcta: 2
      },
      {
        texto: "¿De qué sabor es el pastel?",
        opciones: ["Vainilla", "Chocolate", "Fresa", "Limón"],
        correcta: 1
      },
      {
        texto: "¿Qué hace Sofía antes de soplar las velas?",
        opciones: ["Abre regalos", "Pide un deseo", "Juega fútbol", "Se duerme"],
        correcta: 1
      }
    ]
  },
  {
    id: "granja",
    titulo: "Un día en la granja",
    nivel: 2,
    emoji: "🐄",
    parrafos: [
      { texto: "En la granja de don Pedro viven muchos animales.", emoji: "🚜" },
      { texto: "Por la mañana, la vaca Lola da leche fresca.", emoji: "🐄" },
      { texto: "El gallo canta muy fuerte y despierta a todos.", emoji: "🐓" },
      { texto: "Las gallinas ponen huevos en el gallinero.", emoji: "🥚" },
      { texto: "Don Pedro da de comer a los cerdos y a las ovejas.", emoji: "🐷" },
      { texto: "Al final del día, todos los animales duermen tranquilos.", emoji: "🌙" }
    ],
    preguntas: [
      {
        texto: "¿Quién es el dueño de la granja?",
        opciones: ["Don Pedro", "Doña Rosa", "Ana", "Toby"],
        correcta: 0
      },
      {
        texto: "¿Qué animal da leche?",
        opciones: ["El gallo", "La vaca Lola", "El cerdo", "La oveja"],
        correcta: 1
      },
      {
        texto: "¿Qué ponen las gallinas?",
        opciones: ["Leche", "Lana", "Huevos", "Flores"],
        correcta: 2
      }
    ]
  },
  {
    id: "mar",
    titulo: "Un paseo por el mar",
    nivel: 2,
    emoji: "🌊",
    parrafos: [
      { texto: "Marcos y su familia van a la playa el sábado.", emoji: "🏖️" },
      { texto: "El mar tiene olas suaves de color azul.", emoji: "🌊" },
      { texto: "Marcos construye un castillo de arena con su hermana.", emoji: "🏰" },
      { texto: "Un cangrejo pequeño camina cerca del castillo.", emoji: "🦀" },
      { texto: "Todos comen frutas frescas debajo de una sombrilla.", emoji: "🍉" },
      { texto: "Antes de irse, Marcos recoge conchas de recuerdo.", emoji: "🐚" }
    ],
    preguntas: [
      {
        texto: "¿A dónde va Marcos con su familia?",
        opciones: ["Al bosque", "A la playa", "Al parque", "A la granja"],
        correcta: 1
      },
      {
        texto: "¿Qué construye Marcos?",
        opciones: ["Un castillo de arena", "Una casa de madera", "Un barco", "Un puente"],
        correcta: 0
      },
      {
        texto: "¿Qué animal camina cerca del castillo?",
        opciones: ["Un pez", "Una tortuga", "Un cangrejo", "Un pulpo"],
        correcta: 2
      }
    ]
  },
  {
    id: "bosque",
    titulo: "El bosque encantado",
    nivel: 3,
    emoji: "🌲",
    parrafos: [
      { texto: "En un bosque muy verde vivía una pequeña zorra llamada Luna.", emoji: "🦊" },
      { texto: "Luna era curiosa y le gustaba explorar caminos nuevos cada día.", emoji: "🍂" },
      { texto: "Una mañana, Luna encontró un búho sabio sentado en un árbol grande.", emoji: "🦉" },
      { texto: "El búho le contó que, al final del camino, había un lago mágico.", emoji: "✨" },
      { texto: "Luna caminó con cuidado y por fin llegó al lago brillante.", emoji: "💧" },
      { texto: "El agua del lago le devolvió una sonrisa y Luna volvió feliz a casa.", emoji: "🏡" }
    ],
    preguntas: [
      {
        texto: "¿Cómo se llama la protagonista del cuento?",
        opciones: ["Ana", "Luna", "Lola", "Sofía"],
        correcta: 1
      },
      {
        texto: "¿Quién le habla del lago mágico a Luna?",
        opciones: ["Un búho", "Un gato", "Un cangrejo", "Una vaca"],
        correcta: 0
      },
      {
        texto: "¿Cómo se sintió Luna al volver a casa?",
        opciones: ["Triste", "Asustada", "Feliz", "Enojada"],
        correcta: 2
      }
    ]
  },
  {
    id: "emociones",
    titulo: "Cómo se siente Emma hoy",
    nivel: 2,
    emoji: "💛",
    parrafos: [
      { texto: "Emma se despierta y siente un poco de sueño todavía.", emoji: "😴" },
      { texto: "En el desayuno, Emma se ríe con un chiste de su papá.", emoji: "😄" },
      { texto: "En la escuela, Emma se pone nerviosa antes de un examen.", emoji: "😟" },
      { texto: "Su maestra la ayuda y Emma respira despacio para calmarse.", emoji: "🌬️" },
      { texto: "Emma termina el examen y se siente orgullosa de su esfuerzo.", emoji: "🏆" },
      { texto: "Por la noche, Emma se siente tranquila y agradecida.", emoji: "🌙" }
    ],
    preguntas: [
      {
        texto: "¿Cómo se siente Emma antes del examen?",
        opciones: ["Nerviosa", "Feliz", "Con sueño", "Enojada"],
        correcta: 0
      },
      {
        texto: "¿Qué hace Emma para calmarse?",
        opciones: ["Grita", "Respira despacio", "Llora", "Corre"],
        correcta: 1
      },
      {
        texto: "¿Cómo se siente Emma al terminar el examen?",
        opciones: ["Triste", "Asustada", "Orgullosa", "Aburrida"],
        correcta: 2
      }
    ]
  }
];
