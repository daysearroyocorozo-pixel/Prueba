/* =========================================================
   Banco de contenidos curriculares del simulador
   Organizado por ÁREA → NIVEL (subniveles de EGB) → TEMAS.
   Cada tema contiene:
     objetivo     Objetivo de la clase
     previo       Pregunta para activar conocimientos previos (anticipación)
                  y respuestas posibles de los estudiantes.
     explicacion  Puntos que el docente expone en la pizarra (construcción)
     preguntas    Preguntas de opción múltiple que el docente plantea
                  { q, o:[opciones], c:índice correcto, pista, porque }
     ejercicio    Ejercicio que el docente resuelve en la pizarra
     dudas        Preguntas que los estudiantes hacen al docente
     tarea        Tarea sugerida para el cierre (consolidación)
     gen          (opcional) generador de preguntas aleatorias
   ========================================================= */

const LEVELS = [
  { id: 'preparatoria', nombre: 'Preparatoria', grados: '1.º EGB', edad: '5-6 años', dificultad: 0.10, emoji: '🧸' },
  { id: 'elemental',    nombre: 'Elemental',    grados: '2.º a 4.º EGB', edad: '6-9 años', dificultad: 0.20, emoji: '🎒' },
  { id: 'media',        nombre: 'Media',        grados: '5.º a 7.º EGB', edad: '9-12 años', dificultad: 0.30, emoji: '📐' },
  { id: 'superior',     nombre: 'Superior',     grados: '8.º a 10.º EGB', edad: '12-15 años', dificultad: 0.40, emoji: '🔬' }
];

const AREAS = [
  { id: 'matematica', nombre: 'Matemática', emoji: '🔢', color: '#3b82f6' },
  { id: 'naturales',  nombre: 'Ciencias Naturales', emoji: '🌱', color: '#16a34a' },
  { id: 'sociales',   nombre: 'Ciencias Sociales', emoji: '🌎', color: '#d97706' },
  { id: 'lengua',     nombre: 'Lengua y Comunicación', emoji: '📚', color: '#9333ea' }
];

/* ---------- utilidades para generadores ---------- */
function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function shuffleOpts(correct, distractors) {
  const uniq = [...new Set(distractors.map(String))].filter(d => d !== String(correct)).slice(0, 3);
  while (uniq.length < 3) {
    const n = Number(correct) + rnd(-5, 5);
    if (!isNaN(n) && String(n) !== String(correct) && !uniq.includes(String(n)) && n >= 0) uniq.push(String(n));
  }
  const all = [String(correct), ...uniq];
  for (let i = all.length - 1; i > 0; i--) { const j = rnd(0, i); [all[i], all[j]] = [all[j], all[i]]; }
  return { o: all, c: all.indexOf(String(correct)) };
}
function genQ(q, correct, distractors, pista, porque) {
  const { o, c } = shuffleOpts(correct, distractors);
  return { q, o, c, pista, porque };
}

/* =========================================================
   CONTENIDOS
   ========================================================= */
const CONTENT = {
  /* ===================== MATEMÁTICA ===================== */
  matematica: {
    preparatoria: [
      {
        id: 'mat-p-1', titulo: 'Contar del 1 al 10',
        objetivo: 'Contar colecciones de objetos y asociarlas con su número.',
        previo: { q: '¿En qué momentos del día contamos cosas?', r: ['¡Cuando cuento mis juguetes!', 'Cuando mi mamá cuenta las monedas.', 'Yo cuento mis dedos 🖐️', 'Cuando jugamos a las escondidas.', 'Mmm… no sé.'] },
        explicacion: [
          'Contar es decir un número por cada objeto, sin saltarnos ninguno.',
          'Los números del 1 al 10 son: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
          'El último número que decimos nos dice cuántos objetos hay. 🍎🍎🍎 = 3'
        ],
        preguntas: [
          { q: '¿Cuántas manzanas hay? 🍎🍎🍎🍎', o: ['3', '4', '5', '6'], c: 1, pista: 'Toca cada manzana mientras cuentas.', porque: 'Contamos 1, 2, 3, 4: hay 4 manzanas.' },
          { q: '¿Qué número va después del 6?', o: ['5', '8', '7', '9'], c: 2, pista: 'Cuenta: 4, 5, 6…', porque: 'Después del 6 viene el 7.' },
          { q: '¿Cuántos dedos hay en una mano? 🖐️', o: ['4', '5', '10', '3'], c: 1, pista: 'Mira tu mano y cuenta.', porque: 'Una mano tiene 5 dedos.' },
          { q: '¿Cuántas estrellas hay? ⭐⭐', o: ['1', '2', '3', '4'], c: 1, pista: 'Señala cada estrella.', porque: 'Hay 2 estrellas.' }
        ],
        ejercicio: { enunciado: 'Cuenta los globos: 🎈🎈🎈🎈🎈🎈. ¿Cuántos hay?', o: ['5', '6', '7', '8'], c: 1, pasos: ['Señalamos el primer globo y decimos 1.', 'Seguimos: 2, 3, 4, 5, 6.', 'El último número es 6: hay 6 globos.'] },
        dudas: [
          { q: 'Profe, ¿el cero es un número?', o: ['Sí, el cero significa que no hay nada.', 'No, el cero no existe.', 'El cero es igual al diez.'], c: 0 },
          { q: 'Profe, ¿qué número es más grande, el 3 o el 8?', o: ['El 3', 'El 8', 'Son iguales'], c: 1 }
        ],
        tarea: 'Contar los cubiertos de la mesa de su casa y dibujarlos.',
        gen: () => { const n = rnd(1, 10); const e = ['🍎', '⭐', '🐟', '🎈', '🐞'][rnd(0, 4)]; return genQ(`¿Cuántos hay? ${e.repeat(n)}`, n, [n - 1, n + 1, n + 2], 'Cuenta uno por uno.', `Hay ${n}.`); }
      },
      {
        id: 'mat-p-2', titulo: 'Figuras geométricas',
        objetivo: 'Reconocer el círculo, el cuadrado, el triángulo y el rectángulo en el entorno.',
        previo: { q: '¿Qué formas ven en nuestra aula?', r: ['¡La ventana es un cuadrado!', 'El reloj es redondo.', 'La puerta es larga.', 'La pizarra es grandota.', 'Mi lonchera tiene forma de caja.'] },
        explicacion: [
          'El círculo ⚪ es redondo y no tiene esquinas.',
          'El cuadrado 🟥 tiene 4 lados iguales; el rectángulo tiene 4 lados, dos largos y dos cortos.',
          'El triángulo 🔺 tiene 3 lados y 3 esquinas.'
        ],
        preguntas: [
          { q: '¿Qué figura tiene 3 lados?', o: ['Círculo', 'Triángulo', 'Cuadrado', 'Rectángulo'], c: 1, pista: 'Piensa en un pedazo de pizza 🍕.', porque: 'El triángulo tiene 3 lados.' },
          { q: '¿Qué forma tiene una rueda?', o: ['Cuadrado', 'Triángulo', 'Círculo', 'Rectángulo'], c: 2, pista: 'Es redonda.', porque: 'La rueda tiene forma de círculo.' },
          { q: '¿Cuántos lados tiene un cuadrado?', o: ['3', '4', '5', '2'], c: 1, pista: 'Cuenta los lados de una ventana.', porque: 'El cuadrado tiene 4 lados iguales.' },
          { q: '¿Qué figura no tiene esquinas?', o: ['Círculo', 'Triángulo', 'Cuadrado', 'Rectángulo'], c: 0, pista: 'Es redonda como una moneda.', porque: 'El círculo no tiene esquinas.' }
        ],
        ejercicio: { enunciado: 'Una puerta tiene 2 lados largos y 2 lados cortos. ¿Qué figura es?', o: ['Cuadrado', 'Rectángulo', 'Triángulo', 'Círculo'], c: 1, pasos: ['Contamos los lados: tiene 4.', 'No todos son iguales: 2 largos y 2 cortos.', 'Entonces es un rectángulo.'] },
        dudas: [
          { q: 'Profe, ¿un cuadrado también es un rectángulo?', o: ['Sí, es un rectángulo con todos sus lados iguales.', 'No, no tienen nada que ver.', 'Solo si es de color rojo.'], c: 0 },
          { q: 'Profe, ¿la pelota es un círculo?', o: ['La pelota es una esfera, su contorno se ve como un círculo.', 'No, es un triángulo.', 'Es un cuadrado.'], c: 0 }
        ],
        tarea: 'Buscar en casa 3 objetos con forma de círculo y 3 con forma de rectángulo.'
      }
    ],
    elemental: [
      {
        id: 'mat-e-1', titulo: 'Suma y resta con llevadas',
        objetivo: 'Resolver sumas y restas de dos cifras aplicando el reagrupamiento.',
        previo: { q: '¿Dónde usamos sumas y restas en la vida diaria?', r: ['Cuando compro en la tienda.', 'Para saber cuántos caramelos me quedan.', 'Para contar los goles del partido ⚽.', 'Cuando mi papá paga el bus.', 'No me acuerdo, profe.'] },
        explicacion: [
          'Colocamos los números en columnas: unidades debajo de unidades y decenas debajo de decenas.',
          'Si al sumar las unidades pasamos de 9, formamos una decena y la "llevamos" a la columna de las decenas.',
          'Al restar, si arriba hay menos unidades, pedimos prestada una decena (10 unidades).'
        ],
        preguntas: [
          { q: '¿Cuánto es 27 + 15?', o: ['32', '42', '312', '41'], c: 1, pista: '7 + 5 = 12: escribo 2 y llevo 1.', porque: '7+5=12, llevo 1; 2+1+1=4 → 42.' },
          { q: '¿Cuánto es 50 − 23?', o: ['33', '27', '37', '23'], c: 1, pista: 'Al 0 le prestan una decena: 10 − 3.', porque: '10−3=7 y 4−2=2 → 27.' },
          { q: 'Tengo 38 canicas y gano 24. ¿Cuántas tengo?', o: ['52', '62', '512', '14'], c: 1, pista: 'Es una suma: 38 + 24.', porque: '8+4=12, llevo 1; 3+2+1=6 → 62.' },
          { q: '¿Cuánto es 45 − 18?', o: ['33', '27', '23', '37'], c: 1, pista: '5 no alcanza para quitar 8; pide prestado.', porque: '15−8=7 y 3−1=2 → 27.' }
        ],
        ejercicio: { enunciado: 'Resuelve en la pizarra: 46 + 37', o: ['73', '83', '713', '93'], c: 1, pasos: ['Unidades: 6 + 7 = 13. Escribo 3 y llevo 1.', 'Decenas: 4 + 3 + 1 (que llevaba) = 8.', 'Resultado: 83.'] },
        dudas: [
          { q: 'Profe, ¿por qué se "lleva" uno?', o: ['Porque 10 unidades forman una decena y va a la columna de las decenas.', 'Porque así lo dice el libro.', 'Para que el número sea más grande.'], c: 0 },
          { q: 'Profe, ¿puedo sumar empezando por las decenas?', o: ['Se puede mentalmente, pero en columnas se empieza por las unidades para reagrupar.', 'No, está prohibido.', 'Sí, y nunca hay que llevar.'], c: 0 }
        ],
        tarea: 'Resolver 5 problemas de compras en la tienda usando sumas y restas.',
        gen: () => { if (Math.random() < .5) { const a = rnd(15, 69), b = rnd(12, 29); const r = a + b; return genQ(`¿Cuánto es ${a} + ${b}?`, r, [r - 10, r + 10, r - 1], 'Empieza por las unidades.', `${a} + ${b} = ${r}.`); } const a = rnd(40, 95), b = rnd(12, 38); const r = a - b; return genQ(`¿Cuánto es ${a} − ${b}?`, r, [r + 10, r - 10, r + 2], 'Si no alcanza, pide prestada una decena.', `${a} − ${b} = ${r}.`); }
      },
      {
        id: 'mat-e-2', titulo: 'Las tablas de multiplicar',
        objetivo: 'Comprender la multiplicación como suma repetida y memorizar tablas del 2 al 5.',
        previo: { q: 'Si tengo 3 bolsas con 2 caramelos cada una, ¿cómo sé cuántos caramelos hay?', r: ['¡Los cuento todos!', 'Sumo 2 + 2 + 2.', 'Son 6, profe.', 'Multiplicando, creo.', 'Me los como y ya 😅.'] },
        explicacion: [
          'Multiplicar es sumar el mismo número varias veces: 3 × 2 = 2 + 2 + 2 = 6.',
          'El orden no cambia el resultado: 3 × 4 = 4 × 3 = 12 (propiedad conmutativa).',
          'Cualquier número multiplicado por 1 da el mismo número; por 0 da 0.'
        ],
        preguntas: [
          { q: '¿Cuánto es 4 × 3?', o: ['7', '12', '43', '10'], c: 1, pista: 'Suma 4 tres veces.', porque: '4 + 4 + 4 = 12.' },
          { q: '¿Qué suma representa 5 × 2?', o: ['5 + 2', '2 + 2 + 2 + 2 + 2', '5 + 5 + 5', '2 × 2'], c: 1, pista: 'El 2 se repite 5 veces.', porque: '5 × 2 es sumar 2 cinco veces = 10.' },
          { q: '¿Cuánto es 7 × 0?', o: ['7', '0', '70', '1'], c: 1, pista: 'Si tengo 7 cajas vacías…', porque: 'Todo número por 0 es 0.' },
          { q: 'Una mesa tiene 4 patas. ¿Cuántas patas tienen 5 mesas?', o: ['9', '20', '16', '25'], c: 1, pista: '5 × 4', porque: '5 × 4 = 20 patas.' }
        ],
        ejercicio: { enunciado: 'Hay 6 filas con 3 sillas cada una. ¿Cuántas sillas hay?', o: ['9', '18', '16', '63'], c: 1, pasos: ['Identifico la multiplicación: 6 filas × 3 sillas.', 'Sumo 3 seis veces: 3+3+3+3+3+3.', 'Resultado: 18 sillas.'] },
        dudas: [
          { q: 'Profe, ¿es lo mismo 2 × 5 que 5 × 2?', o: ['Sí, el orden de los factores no altera el producto.', 'No, 2 × 5 es más grande.', 'Solo los lunes.'], c: 0 },
          { q: 'Profe, ¿para qué sirve multiplicar si puedo sumar?', o: ['Es una forma más rápida de sumar cantidades iguales.', 'No sirve para nada.', 'Solo sirve en la escuela.'], c: 0 }
        ],
        tarea: 'Elaborar la tabla del 3 con dibujos de grupos de objetos.',
        gen: () => { const a = rnd(2, 9), b = rnd(2, 9); const r = a * b; return genQ(`¿Cuánto es ${a} × ${b}?`, r, [a + b, r + a, r - b], `Suma ${a} ${b} veces.`, `${a} × ${b} = ${r}.`); }
      }
    ],
    media: [
      {
        id: 'mat-m-1', titulo: 'Fracciones',
        objetivo: 'Representar, comparar y sumar fracciones con igual denominador.',
        previo: { q: 'Si partimos una pizza en 8 pedazos y me como 3, ¿qué parte me comí?', r: ['¡3 de 8 pedazos!', 'Tres octavos.', 'La mitad, más o menos.', 'Casi toda 🍕.', 'No entiendo lo de "parte".'] },
        explicacion: [
          'Una fracción representa partes de un todo: el numerador (arriba) dice cuántas partes tomamos y el denominador (abajo) en cuántas partes iguales se dividió.',
          'Con igual denominador, es mayor la fracción con mayor numerador: 5/8 > 3/8.',
          'Para sumar fracciones con igual denominador, sumamos los numeradores y dejamos el denominador: 2/7 + 3/7 = 5/7.'
        ],
        preguntas: [
          { q: '¿Cuánto es 2/5 + 1/5?', o: ['3/10', '3/5', '2/5', '1/5'], c: 1, pista: 'El denominador se mantiene.', porque: '2 + 1 = 3 → 3/5.' },
          { q: '¿Qué fracción es mayor?', o: ['3/9', '7/9', '5/9', '1/9'], c: 1, pista: 'Mismo denominador: mira el numerador.', porque: '7 es el mayor numerador.' },
          { q: 'En 3/4, ¿qué indica el 4?', o: ['Las partes que tomo', 'Las partes iguales en que se dividió el todo', 'El resultado', 'Nada'], c: 1, pista: 'Es el número de abajo.', porque: 'El denominador indica en cuántas partes iguales se divide el todo.' },
          { q: '¿Qué fracción equivale a la mitad?', o: ['1/3', '2/4', '3/4', '1/5'], c: 1, pista: 'La mitad de 4 es 2.', porque: '2/4 = 1/2.' }
        ],
        ejercicio: { enunciado: 'Ana pintó 3/8 de una pared y Luis 4/8. ¿Qué fracción pintaron juntos?', o: ['7/16', '7/8', '1/8', '12/8'], c: 1, pasos: ['Ambas fracciones tienen denominador 8.', 'Sumamos numeradores: 3 + 4 = 7.', 'Mantenemos el denominador: 7/8.'] },
        dudas: [
          { q: 'Profe, ¿por qué no se suman también los denominadores?', o: ['Porque el denominador indica el tamaño de las partes, y ese tamaño no cambia.', 'Sí se suman siempre.', 'Porque es muy difícil.'], c: 0 },
          { q: 'Profe, ¿8/8 es lo mismo que 1?', o: ['Sí, tomar todas las partes es el entero completo.', 'No, 8/8 es 8.', 'Es igual a 0.'], c: 0 }
        ],
        tarea: 'Dibujar 4 fracciones diferentes usando rectángulos y ordenarlas de menor a mayor.',
        gen: () => { const d = rnd(4, 12), a = rnd(1, d - 3), b = rnd(1, d - a - 1); const ok = `${a + b}/${d}`; return { ...shuffleStr(ok, [`${a + b}/${d * 2}`, `${a * b}/${d}`, `${Math.abs(a - b) || 1}/${d}`]), q: `¿Cuánto es ${a}/${d} + ${b}/${d}?`, pista: 'Suma solo los numeradores.', porque: `${a} + ${b} = ${a + b}, el denominador ${d} se mantiene.` }; }
      },
      {
        id: 'mat-m-2', titulo: 'Perímetro y área',
        objetivo: 'Calcular el perímetro y el área de rectángulos y cuadrados.',
        previo: { q: 'Si queremos poner una cerca alrededor de la cancha, ¿qué necesitamos medir?', r: ['Lo largo y lo ancho.', 'Todo el borde de la cancha.', 'Cuánto pasto tiene.', 'Con pasos, profe.', 'El área, creo.'] },
        explicacion: [
          'El perímetro es la medida del contorno: se suman todos los lados.',
          'El área es la superficie que ocupa una figura y se mide en unidades cuadradas (cm², m²).',
          'Rectángulo: Área = base × altura. Perímetro = 2 × (base + altura).'
        ],
        preguntas: [
          { q: 'Perímetro de un cuadrado de lado 5 cm:', o: ['25 cm', '20 cm', '10 cm', '15 cm'], c: 1, pista: 'Tiene 4 lados iguales.', porque: '4 × 5 = 20 cm.' },
          { q: 'Área de un rectángulo de 6 m × 3 m:', o: ['9 m²', '18 m²', '18 m', '12 m²'], c: 1, pista: 'Base × altura.', porque: '6 × 3 = 18 m².' },
          { q: '¿En qué unidad se mide el área?', o: ['cm', 'cm²', 'kg', 'litros'], c: 1, pista: 'Es una superficie.', porque: 'El área se mide en unidades cuadradas.' },
          { q: 'Perímetro de un rectángulo de 8 cm × 2 cm:', o: ['16 cm', '20 cm', '10 cm', '18 cm'], c: 1, pista: '2 × (8 + 2)', porque: '2 × 10 = 20 cm.' }
        ],
        ejercicio: { enunciado: 'El aula mide 7 m de largo y 5 m de ancho. ¿Cuál es su área?', o: ['12 m²', '35 m²', '24 m', '35 m'], c: 1, pasos: ['Identifico base = 7 m y altura = 5 m.', 'Área = 7 × 5 = 35.', 'La unidad es cuadrada: 35 m².'] },
        dudas: [
          { q: 'Profe, ¿cuál es la diferencia entre perímetro y área?', o: ['El perímetro es el borde; el área es la superficie de adentro.', 'Son lo mismo.', 'El área es el borde.'], c: 0 },
          { q: 'Profe, ¿por qué el área lleva el 2 chiquito (m²)?', o: ['Porque multiplicamos metros por metros.', 'Porque es dos veces más grande.', 'Es un adorno.'], c: 0 }
        ],
        tarea: 'Medir el área de su dormitorio usando una cinta métrica.',
        gen: () => { const b = rnd(3, 12), h = rnd(2, 9); if (Math.random() < .5) return genQ(`Área de un rectángulo de ${b} cm × ${h} cm (en cm²):`, b * h, [2 * (b + h), b + h, b * h + b], 'Base × altura.', `${b} × ${h} = ${b * h} cm².`); return genQ(`Perímetro de un rectángulo de ${b} cm × ${h} cm (en cm):`, 2 * (b + h), [b * h, b + h, 2 * b + h], 'Suma los 4 lados.', `2 × (${b} + ${h}) = ${2 * (b + h)} cm.`); }
      }
    ],
    superior: [
      {
        id: 'mat-s-1', titulo: 'Ecuaciones de primer grado',
        objetivo: 'Resolver ecuaciones lineales con una incógnita aplicando transposición de términos.',
        previo: { q: 'Si pienso un número, le sumo 5 y obtengo 12, ¿qué número pensé?', r: ['¡El 7!', 'Restando 12 menos 5.', 'Con una ecuación, ¿no?', 'Probando números.', 'No sé despejar.'] },
        explicacion: [
          'Una ecuación es una igualdad con un valor desconocido (incógnita), por ejemplo x + 5 = 12.',
          'Para despejar, hacemos la operación inversa en ambos lados: lo que suma pasa restando, lo que multiplica pasa dividiendo.',
          'Siempre comprobamos: reemplazamos el valor en la ecuación original.'
        ],
        preguntas: [
          { q: 'Resuelve: x + 8 = 15', o: ['x = 23', 'x = 7', 'x = 8', 'x = −7'], c: 1, pista: 'El 8 pasa restando.', porque: 'x = 15 − 8 = 7.' },
          { q: 'Resuelve: 3x = 21', o: ['x = 18', 'x = 7', 'x = 63', 'x = 24'], c: 1, pista: 'El 3 multiplica: pasa dividiendo.', porque: 'x = 21 ÷ 3 = 7.' },
          { q: 'Resuelve: 2x − 4 = 10', o: ['x = 3', 'x = 7', 'x = 14', 'x = 12'], c: 1, pista: 'Primero suma 4 en ambos lados.', porque: '2x = 14 → x = 7.' },
          { q: '¿Cuál es la incógnita en 5y + 2 = 17?', o: ['5', 'y', '17', '2'], c: 1, pista: 'Es la letra.', porque: 'La incógnita es el valor desconocido: y.' }
        ],
        ejercicio: { enunciado: 'Resuelve en la pizarra: 4x + 6 = 30', o: ['x = 9', 'x = 6', 'x = 24', 'x = 4'], c: 1, pasos: ['Restamos 6 en ambos lados: 4x = 24.', 'Dividimos entre 4: x = 6.', 'Comprobamos: 4(6) + 6 = 30 ✔.'] },
        dudas: [
          { q: 'Profe, ¿por qué se dice que "pasa restando"?', o: ['Porque restamos el mismo número en ambos lados para mantener la igualdad.', 'Porque los números se mueven solos.', 'Es una regla sin explicación.'], c: 0 },
          { q: 'Profe, ¿la x siempre vale lo mismo?', o: ['No, su valor depende de cada ecuación.', 'Sí, siempre vale 1.', 'La x vale 10.'], c: 0 }
        ],
        tarea: 'Plantear y resolver 3 problemas de la vida real con ecuaciones de primer grado.',
        gen: () => { const x = rnd(2, 12), a = rnd(2, 6), b = rnd(1, 15); const r = a * x + b; return { ...shuffleStr(`x = ${x}`, [`x = ${r - b}`, `x = ${x + 1}`, `x = ${Math.round(r / a)}` === `x = ${x}` ? `x = ${x + 2}` : `x = ${Math.round(r / a)}`]), q: `Resuelve: ${a}x + ${b} = ${r}`, pista: `Resta ${b} y luego divide entre ${a}.`, porque: `${a}x = ${r - b} → x = ${x}.` }; }
      },
      {
        id: 'mat-s-2', titulo: 'Teorema de Pitágoras',
        objetivo: 'Aplicar el teorema de Pitágoras para calcular lados de triángulos rectángulos.',
        previo: { q: '¿Qué tiene de especial un triángulo rectángulo?', r: ['Tiene un ángulo de 90°.', 'Una esquina cuadrada, como una escuadra.', 'Que es recto, ¿no?', 'Tiene un lado más largo.', 'Ni idea, profe.'] },
        explicacion: [
          'En un triángulo rectángulo, el lado opuesto al ángulo recto se llama hipotenusa; los otros dos son catetos.',
          'Teorema: la hipotenusa al cuadrado es igual a la suma de los cuadrados de los catetos: c² = a² + b².',
          'Ejemplo: catetos 3 y 4 → c² = 9 + 16 = 25 → c = 5.'
        ],
        preguntas: [
          { q: 'Catetos 6 y 8. ¿Hipotenusa?', o: ['14', '10', '48', '100'], c: 1, pista: '36 + 64 = ?', porque: '√100 = 10.' },
          { q: '¿Cómo se llama el lado más largo de un triángulo rectángulo?', o: ['Cateto', 'Hipotenusa', 'Base', 'Altura'], c: 1, pista: 'Está frente al ángulo recto.', porque: 'Es la hipotenusa.' },
          { q: 'Hipotenusa 13 y un cateto 5. ¿El otro cateto?', o: ['8', '12', '18', '144'], c: 1, pista: '169 − 25 = ?', porque: '√144 = 12.' },
          { q: '¿El teorema de Pitágoras sirve para cualquier triángulo?', o: ['Sí', 'Solo para triángulos rectángulos', 'Solo para equiláteros', 'Solo para isósceles'], c: 1, pista: 'Necesita un ángulo de 90°.', porque: 'Solo aplica a triángulos rectángulos.' }
        ],
        ejercicio: { enunciado: 'Una escalera de 10 m se apoya en una pared a 6 m de la base. ¿A qué altura llega?', o: ['4 m', '8 m', '16 m', '64 m'], c: 1, pasos: ['La escalera es la hipotenusa: 10 m; la base es un cateto: 6 m.', 'h² = 10² − 6² = 100 − 36 = 64.', 'h = √64 = 8 m.'] },
        dudas: [
          { q: 'Profe, ¿por qué se elevan al cuadrado los lados?', o: ['Porque el teorema relaciona las áreas de los cuadrados construidos sobre cada lado.', 'Para que dé un número más grande.', 'Por costumbre.'], c: 0 },
          { q: 'Profe, ¿esto se usa en la vida real?', o: ['Sí, en construcción, navegación, diseño y mapas.', 'No, solo en exámenes.', 'Solo lo usan los griegos.'], c: 0 }
        ],
        tarea: 'Investigar 2 aplicaciones del teorema de Pitágoras en la construcción.'
      }
    ]
  },

  /* ===================== CIENCIAS NATURALES ===================== */
  naturales: {
    preparatoria: [
      {
        id: 'cn-p-1', titulo: 'Los sentidos',
        objetivo: 'Identificar los cinco sentidos y los órganos asociados.',
        previo: { q: '¿Cómo sabemos que una fruta está dulce?', r: ['¡Probándola con la lengua!', 'Oliéndola.', 'Porque mi mamá me dice.', 'Si es amarilla es dulce.', 'Mmm… no sé.'] },
        explicacion: [
          'Tenemos cinco sentidos: vista 👀, oído 👂, olfato 👃, gusto 👅 y tacto ✋.',
          'Cada sentido tiene un órgano: ojos, oídos, nariz, lengua y piel.',
          'Los sentidos nos ayudan a conocer el mundo y a cuidarnos de peligros.'
        ],
        preguntas: [
          { q: '¿Con qué órgano escuchamos la música?', o: ['Ojos', 'Oídos', 'Nariz', 'Lengua'], c: 1, pista: '👂', porque: 'Escuchamos con los oídos.' },
          { q: '¿Qué sentido usamos para oler una flor?', o: ['Gusto', 'Tacto', 'Olfato', 'Vista'], c: 2, pista: 'Usamos la nariz 👃.', porque: 'El olfato está en la nariz.' },
          { q: '¿Con qué sentimos si algo está caliente?', o: ['Con la piel (tacto)', 'Con los ojos', 'Con el oído', 'Con la nariz'], c: 0, pista: 'Lo sentimos al tocar.', porque: 'El tacto está en la piel.' },
          { q: '¿Cuántos sentidos tenemos?', o: ['3', '5', '4', '10'], c: 1, pista: 'Cuenta: vista, oído…', porque: 'Tenemos 5 sentidos.' }
        ],
        ejercicio: { enunciado: '¿Qué sentido usamos para ver los colores del arcoíris? 🌈', o: ['Oído', 'Vista', 'Gusto', 'Olfato'], c: 1, pasos: ['Los colores se perciben con los ojos.', 'Los ojos son el órgano de la vista.', 'Respuesta: la vista.'] },
        dudas: [
          { q: 'Profe, ¿las personas que no ven usan otros sentidos?', o: ['Sí, desarrollan mucho el tacto y el oído, por ejemplo para leer en braille.', 'No, no pueden hacer nada.', 'Solo usan el gusto.'], c: 0 },
          { q: 'Profe, ¿por qué no sentimos sabor cuando tenemos gripe?', o: ['Porque el olfato y el gusto trabajan juntos y la nariz está tapada.', 'Porque la lengua se duerme.', 'Porque la comida no tiene sabor.'], c: 0 }
        ],
        tarea: 'Con ayuda de un familiar, probar 3 alimentos con los ojos cerrados y adivinar cuáles son.'
      },
      {
        id: 'cn-p-2', titulo: 'Seres vivos y no vivos',
        objetivo: 'Diferenciar seres vivos de elementos no vivos por sus características.',
        previo: { q: '¿Una piedra está viva? ¿Por qué?', r: ['¡No, porque no se mueve!', 'No come ni crece.', 'Sí, porque está en la tierra.', 'Las plantas tampoco se mueven y están vivas.', 'No sé, profe.'] },
        explicacion: [
          'Los seres vivos nacen, crecen, se alimentan, se reproducen y mueren.',
          'Las plantas 🌱, los animales 🐶 y las personas 👧 son seres vivos.',
          'Los elementos no vivos, como una piedra 🪨 o el agua 💧, no cumplen esas funciones.'
        ],
        preguntas: [
          { q: '¿Cuál es un ser vivo?', o: ['Piedra', 'Árbol', 'Silla', 'Pelota'], c: 1, pista: 'Crece y necesita agua.', porque: 'El árbol nace, crece y se alimenta.' },
          { q: '¿Cuál NO es un ser vivo?', o: ['Perro', 'Flor', 'Carro', 'Pájaro'], c: 2, pista: '¿Cuál no come ni crece?', porque: 'El carro es un objeto, no tiene vida.' },
          { q: '¿Qué hacen todos los seres vivos?', o: ['Vuelan', 'Crecen', 'Nadan', 'Hablan'], c: 1, pista: 'Las plantas y los niños también lo hacen.', porque: 'Todos los seres vivos crecen.' },
          { q: 'Las plantas, ¿están vivas?', o: ['Sí', 'No', 'Solo si tienen flores', 'Solo de noche'], c: 0, pista: 'Necesitan agua y sol para crecer.', porque: 'Las plantas son seres vivos.' }
        ],
        ejercicio: { enunciado: '¿El sol es un ser vivo? ☀️', o: ['Sí', 'No'], c: 1, pasos: ['Revisamos: ¿nace de una madre? ¿se alimenta? ¿se reproduce?', 'El sol no cumple las funciones vitales.', 'El sol no es un ser vivo, aunque es necesario para la vida.'] },
        dudas: [
          { q: 'Profe, ¿el fuego está vivo porque se mueve y crece?', o: ['No, el fuego no se alimenta ni se reproduce como un ser vivo.', 'Sí, está vivo.', 'Solo en las noches.'], c: 0 },
          { q: 'Profe, ¿los hongos son plantas?', o: ['No, los hongos son otro grupo de seres vivos.', 'Sí, son flores.', 'No están vivos.'], c: 0 }
        ],
        tarea: 'Recortar 3 imágenes de seres vivos y 3 de no vivos y pegarlas en dos columnas.'
      }
    ],
    elemental: [
      {
        id: 'cn-e-1', titulo: 'Partes de la planta',
        objetivo: 'Reconocer las partes de la planta y la función de cada una.',
        previo: { q: '¿Qué necesita una planta para vivir?', r: ['¡Agua!', 'Sol y tierra.', 'Que le hablen bonito 🌻.', 'Aire, creo.', 'Abono.'] },
        explicacion: [
          'La raíz absorbe agua y minerales del suelo y sujeta la planta.',
          'El tallo sostiene la planta y transporta el agua; las hojas fabrican el alimento con la luz del sol.',
          'La flor produce frutos y semillas, que darán origen a nuevas plantas.'
        ],
        preguntas: [
          { q: '¿Qué parte de la planta absorbe el agua?', o: ['Hoja', 'Raíz', 'Flor', 'Fruto'], c: 1, pista: 'Está bajo tierra.', porque: 'La raíz absorbe agua y minerales.' },
          { q: '¿Dónde fabrica la planta su alimento?', o: ['En la raíz', 'En las hojas', 'En la semilla', 'En la flor'], c: 1, pista: 'Son verdes y reciben el sol.', porque: 'Las hojas realizan la fotosíntesis.' },
          { q: '¿Qué parte se convierte en fruto?', o: ['Tallo', 'Hoja', 'Flor', 'Raíz'], c: 2, pista: 'Es la parte más colorida.', porque: 'La flor, al ser polinizada, forma el fruto.' },
          { q: 'La zanahoria que comemos es…', o: ['Un tallo', 'Una raíz', 'Una hoja', 'Una flor'], c: 1, pista: 'Crece bajo tierra.', porque: 'La zanahoria es una raíz.' }
        ],
        ejercicio: { enunciado: '¿Qué función cumple el tallo?', o: ['Fabricar alimento', 'Sostener la planta y transportar agua', 'Producir semillas', 'Absorber minerales'], c: 1, pasos: ['El tallo une la raíz con las hojas.', 'Por dentro tiene conductos que llevan agua y nutrientes.', 'Su función: sostener y transportar.'] },
        dudas: [
          { q: 'Profe, ¿por qué las hojas son verdes?', o: ['Por la clorofila, que capta la luz del sol.', 'Porque las pintan.', 'Porque comen pasto.'], c: 0 },
          { q: 'Profe, ¿todas las plantas tienen flores?', o: ['No, por ejemplo los helechos y musgos no tienen flores.', 'Sí, todas.', 'Solo las de jardín no.'], c: 0 }
        ],
        tarea: 'Sembrar un fréjol en algodón húmedo y registrar su crecimiento durante una semana.'
      },
      {
        id: 'cn-e-2', titulo: 'Estados del agua',
        objetivo: 'Describir los estados del agua y los cambios entre ellos.',
        previo: { q: '¿Qué pasa con un hielo si lo dejamos al sol?', r: ['¡Se derrite!', 'Se vuelve agua.', 'Desaparece.', 'Se hace más frío.', 'Se lo come el sol 😅.'] },
        explicacion: [
          'El agua se presenta en tres estados: sólido (hielo 🧊), líquido (agua 💧) y gaseoso (vapor ♨️).',
          'Con calor: el hielo se funde (fusión) y el agua se evapora (evaporación).',
          'Con frío: el vapor se condensa (condensación) y el agua se congela (solidificación).'
        ],
        preguntas: [
          { q: '¿En qué estado está el hielo?', o: ['Líquido', 'Sólido', 'Gaseoso', 'Ninguno'], c: 1, pista: 'Es duro y tiene forma.', porque: 'El hielo es agua en estado sólido.' },
          { q: '¿Cómo se llama el paso de líquido a gas?', o: ['Fusión', 'Evaporación', 'Congelación', 'Condensación'], c: 1, pista: 'Pasa cuando hierve el agua.', porque: 'Es la evaporación.' },
          { q: 'Las gotitas en un vaso frío se forman por…', o: ['Evaporación', 'Condensación', 'Fusión', 'Magia'], c: 1, pista: 'El vapor del aire se enfría.', porque: 'El vapor se condensa al tocar el vaso frío.' },
          { q: '¿Qué necesitamos para congelar agua?', o: ['Calor', 'Frío', 'Sal', 'Luz'], c: 1, pista: 'Piensa en la refrigeradora.', porque: 'Al enfriar, el agua se solidifica.' }
        ],
        ejercicio: { enunciado: 'Ordena: el agua del mar se calienta, sube como vapor y forma nubes. ¿Qué proceso forma las nubes?', o: ['Fusión', 'Condensación', 'Solidificación', 'Filtración'], c: 1, pasos: ['El sol calienta el agua: se evapora.', 'El vapor sube y se enfría en lo alto.', 'Al enfriarse se condensa en gotitas: se forman las nubes.'] },
        dudas: [
          { q: 'Profe, ¿el agua que se evapora se pierde para siempre?', o: ['No, vuelve a caer como lluvia: es el ciclo del agua.', 'Sí, se acaba.', 'Se va al espacio.'], c: 0 },
          { q: 'Profe, ¿por qué el hielo flota?', o: ['Porque es menos denso que el agua líquida.', 'Porque tiene aire adentro siempre.', 'Porque es pequeño.'], c: 0 }
        ],
        tarea: 'Dibujar el ciclo del agua indicando evaporación, condensación y precipitación.'
      }
    ],
    media: [
      {
        id: 'cn-m-1', titulo: 'Sistema digestivo',
        objetivo: 'Explicar el recorrido de los alimentos por el sistema digestivo.',
        previo: { q: '¿A dónde va la comida después de tragarla?', r: ['Al estómago.', 'A la barriga.', 'Se convierte en energía.', 'Baja por un tubo.', 'A los pies 😂.'] },
        explicacion: [
          'La digestión empieza en la boca: los dientes trituran y la saliva ablanda los alimentos.',
          'El alimento pasa por el esófago al estómago, donde los jugos gástricos lo descomponen.',
          'En el intestino delgado se absorben los nutrientes; en el intestino grueso se absorbe agua y se forman los desechos.'
        ],
        preguntas: [
          { q: '¿Dónde comienza la digestión?', o: ['Estómago', 'Boca', 'Intestino', 'Esófago'], c: 1, pista: 'Es donde masticamos.', porque: 'Comienza en la boca con la masticación y la saliva.' },
          { q: '¿Qué órgano conecta la boca con el estómago?', o: ['Tráquea', 'Esófago', 'Hígado', 'Intestino'], c: 1, pista: 'Es un tubo muscular.', porque: 'El esófago lleva el bolo al estómago.' },
          { q: '¿Dónde se absorben la mayoría de nutrientes?', o: ['Intestino grueso', 'Intestino delgado', 'Estómago', 'Boca'], c: 1, pista: 'Es el tubo más largo.', porque: 'En el intestino delgado.' },
          { q: '¿Qué produce el hígado para ayudar a la digestión?', o: ['Saliva', 'Bilis', 'Sangre', 'Insulina'], c: 1, pista: 'Ayuda a digerir las grasas.', porque: 'El hígado produce bilis.' }
        ],
        ejercicio: { enunciado: 'Ordena el recorrido: ¿cuál es la secuencia correcta?', o: ['Boca → estómago → esófago → intestinos', 'Boca → esófago → estómago → intestino delgado → intestino grueso', 'Esófago → boca → intestinos', 'Estómago → boca → intestinos'], c: 1, pasos: ['Todo empieza en la boca.', 'Luego el esófago lleva el alimento al estómago.', 'Después intestino delgado y finalmente intestino grueso.'] },
        dudas: [
          { q: 'Profe, ¿por qué hay que masticar bien?', o: ['Para que los alimentos se digieran mejor y se absorban los nutrientes.', 'Para comer más lento nomás.', 'No importa masticar.'], c: 0 },
          { q: 'Profe, ¿cuánto mide el intestino delgado?', o: ['Alrededor de 6 a 7 metros en un adulto.', '10 centímetros.', '100 metros.'], c: 0 }
        ],
        tarea: 'Elaborar una maqueta del sistema digestivo con material reciclado.'
      },
      {
        id: 'cn-m-2', titulo: 'Ecosistemas del Ecuador',
        objetivo: 'Identificar ecosistemas del Ecuador y sus relaciones alimenticias.',
        previo: { q: '¿Qué animales viven en la Amazonía?', r: ['¡El jaguar!', 'Monos y loros.', 'Anacondas 🐍.', 'Pingüinos.', 'Delfines rosados.'] },
        explicacion: [
          'Un ecosistema es el conjunto de seres vivos que se relacionan entre sí y con su medio físico.',
          'En Ecuador hay páramos, bosques nublados, bosque tropical amazónico, manglares y las islas Galápagos.',
          'Las cadenas alimenticias muestran quién se alimenta de quién: productores → consumidores → descomponedores.'
        ],
        preguntas: [
          { q: '¿Quiénes son los productores en una cadena alimenticia?', o: ['Los carnívoros', 'Las plantas', 'Los hongos', 'Los herbívoros'], c: 1, pista: 'Fabrican su propio alimento.', porque: 'Las plantas producen su alimento con la fotosíntesis.' },
          { q: '¿En qué ecosistema crece la paja y el frailejón?', o: ['Manglar', 'Páramo', 'Amazonía', 'Playa'], c: 1, pista: 'Está en las alturas de los Andes.', porque: 'Son plantas típicas del páramo.' },
          { q: 'Los manglares se encuentran en…', o: ['La Sierra', 'La Costa', 'La Amazonía', 'Los nevados'], c: 1, pista: 'Donde el río se junta con el mar.', porque: 'Los manglares están en la región Costa.' },
          { q: '¿Qué función cumplen los hongos y bacterias?', o: ['Productores', 'Descomponedores', 'Depredadores', 'Herbívoros'], c: 1, pista: 'Transforman restos en nutrientes.', porque: 'Son descomponedores.' }
        ],
        ejercicio: { enunciado: 'En la cadena pasto → conejo → zorro, ¿qué es el conejo?', o: ['Productor', 'Consumidor primario', 'Consumidor secundario', 'Descomponedor'], c: 1, pasos: ['El pasto es productor.', 'El conejo come pasto: es herbívoro.', 'Por eso es consumidor primario.'] },
        dudas: [
          { q: 'Profe, ¿por qué es importante cuidar el páramo?', o: ['Porque almacena y regula el agua que consumen las ciudades.', 'Porque es bonito nomás.', 'No es importante.'], c: 0 },
          { q: 'Profe, ¿qué pasa si desaparece un animal de la cadena?', o: ['Se altera todo el ecosistema.', 'No pasa nada.', 'Aparece otro igual.'], c: 0 }
        ],
        tarea: 'Elaborar una red alimenticia de un ecosistema ecuatoriano.'
      }
    ],
    superior: [
      {
        id: 'cn-s-1', titulo: 'La célula',
        objetivo: 'Diferenciar la célula animal de la vegetal y la función de sus organelos.',
        previo: { q: '¿De qué estamos hechos los seres vivos?', r: ['De células.', 'De carne y huesos.', 'De átomos.', 'De agua, en su mayoría.', 'De órganos.'] },
        explicacion: [
          'La célula es la unidad básica estructural y funcional de todos los seres vivos.',
          'Partes comunes: membrana celular, citoplasma y núcleo (que contiene el ADN). Las mitocondrias producen energía.',
          'La célula vegetal además tiene pared celular, cloroplastos y una vacuola grande.'
        ],
        preguntas: [
          { q: '¿Qué organelo produce energía para la célula?', o: ['Núcleo', 'Mitocondria', 'Vacuola', 'Pared celular'], c: 1, pista: 'Es la "central eléctrica".', porque: 'La mitocondria realiza la respiración celular.' },
          { q: '¿Qué estructura solo tiene la célula vegetal?', o: ['Núcleo', 'Membrana', 'Cloroplasto', 'Citoplasma'], c: 2, pista: 'Le da el color verde.', porque: 'Los cloroplastos realizan la fotosíntesis.' },
          { q: '¿Dónde se encuentra el ADN en una célula eucariota?', o: ['En la membrana', 'En el núcleo', 'En la vacuola', 'En la pared'], c: 1, pista: 'Es el centro de control.', porque: 'El ADN está en el núcleo.' },
          { q: 'Las bacterias son células…', o: ['Eucariotas', 'Procariotas', 'Vegetales', 'Animales'], c: 1, pista: 'No tienen núcleo definido.', porque: 'Son procariotas.' }
        ],
        ejercicio: { enunciado: 'Una célula tiene pared celular, cloroplastos y núcleo. ¿Qué tipo de célula es?', o: ['Animal', 'Vegetal', 'Bacteria', 'Virus'], c: 1, pasos: ['Tiene núcleo: es eucariota.', 'Tiene pared celular y cloroplastos.', 'Por lo tanto es una célula vegetal.'] },
        dudas: [
          { q: 'Profe, ¿los virus son células?', o: ['No, los virus no tienen estructura celular y necesitan una célula para reproducirse.', 'Sí, son células pequeñas.', 'Son células vegetales.'], c: 0 },
          { q: 'Profe, ¿cuántas células tiene el cuerpo humano?', o: ['Se estima que alrededor de 30 billones (30 millones de millones).', 'Unas 100.', 'Exactamente un millón.'], c: 0 }
        ],
        tarea: 'Construir un modelo 3D de célula vegetal o animal con materiales caseros.'
      },
      {
        id: 'cn-s-2', titulo: 'Fuerza y movimiento',
        objetivo: 'Aplicar las leyes de Newton a situaciones cotidianas.',
        previo: { q: '¿Por qué nos vamos hacia adelante cuando el bus frena de golpe?', r: ['Por la inercia.', 'Porque el chofer frena feo.', 'Por la gravedad.', 'Porque el cuerpo sigue moviéndose.', 'No sé, siempre pasa.'] },
        explicacion: [
          '1.ª ley (inercia): un cuerpo mantiene su estado de reposo o movimiento si no actúa una fuerza sobre él.',
          '2.ª ley: la fuerza es igual a la masa por la aceleración (F = m · a), medida en newtons (N).',
          '3.ª ley (acción y reacción): a toda acción corresponde una reacción de igual magnitud y sentido contrario.'
        ],
        preguntas: [
          { q: '¿Qué fuerza se necesita para acelerar 2 kg a 3 m/s²?', o: ['5 N', '6 N', '1,5 N', '9 N'], c: 1, pista: 'F = m · a', porque: 'F = 2 × 3 = 6 N.' },
          { q: 'Al remar, el bote avanza porque…', o: ['Hay inercia', 'Acción y reacción', 'No hay fricción', 'Hay gravedad'], c: 1, pista: 'El remo empuja el agua hacia atrás.', porque: 'El agua empuja el bote hacia adelante (3.ª ley).' },
          { q: '¿En qué unidad se mide la fuerza?', o: ['Kilogramos', 'Newtons', 'Metros', 'Julios'], c: 1, pista: 'Lleva el nombre de un científico.', porque: 'La fuerza se mide en newtons.' },
          { q: 'Un balón en reposo seguirá en reposo si…', o: ['Lo patean', 'No actúa ninguna fuerza neta', 'Llueve', 'Está inflado'], c: 1, pista: 'Primera ley.', porque: 'Por inercia, sin fuerza neta no cambia su estado.' }
        ],
        ejercicio: { enunciado: 'Un carro de 1000 kg acelera a 2 m/s². ¿Qué fuerza neta actúa?', o: ['500 N', '2000 N', '1002 N', '200 N'], c: 1, pasos: ['Datos: m = 1000 kg, a = 2 m/s².', 'F = m · a = 1000 × 2.', 'F = 2000 N.'] },
        dudas: [
          { q: 'Profe, ¿por qué los objetos se detienen solos si la inercia los mantiene en movimiento?', o: ['Porque actúa la fricción, que es una fuerza que se opone al movimiento.', 'Porque se cansan.', 'Porque la inercia se acaba.'], c: 0 },
          { q: 'Profe, ¿masa y peso son lo mismo?', o: ['No, la masa es cantidad de materia (kg) y el peso es una fuerza (N).', 'Sí, son iguales.', 'El peso no existe en la Tierra.'], c: 0 }
        ],
        tarea: 'Identificar las tres leyes de Newton en un video deportivo y explicarlas.'
      }
    ]
  },

  /* ===================== CIENCIAS SOCIALES ===================== */
  sociales: {
    preparatoria: [
      {
        id: 'cs-p-1', titulo: 'Mi familia',
        objetivo: 'Reconocer los miembros de la familia y la importancia de convivir con respeto.',
        previo: { q: '¿Con quién viven en su casa?', r: ['Con mi mamá y mi abuelita.', '¡Con mis papás y mi hermano!', 'Con mi tía y mis primos.', 'Con mi perrito también 🐶.', 'Con mi papá.'] },
        explicacion: [
          'La familia es el grupo de personas que nos cuida, nos quiere y vive con nosotros.',
          'Hay familias de muchos tipos: grandes, pequeñas, con abuelitos, tíos o un solo papá o mamá. ¡Todas son valiosas!',
          'En la familia nos ayudamos: cada miembro tiene responsabilidades.'
        ],
        preguntas: [
          { q: '¿Qué hacemos para ayudar en casa?', o: ['Desordenar', 'Recoger mis juguetes', 'Gritar', 'Nada'], c: 1, pista: '¿Qué hace feliz a la familia?', porque: 'Recoger los juguetes ayuda en casa.' },
          { q: 'La mamá de mi mamá es mi…', o: ['Tía', 'Abuela', 'Prima', 'Hermana'], c: 1, pista: 'Es mayor y nos consiente.', porque: 'Es la abuela.' },
          { q: '¿Todas las familias son iguales?', o: ['Sí', 'No, hay muchos tipos de familia', 'Solo hay un tipo', 'No existen familias'], c: 1, pista: 'Piensa en tus compañeros.', porque: 'Hay muchos tipos de familia y todas merecen respeto.' },
          { q: '¿Cómo tratamos a nuestra familia?', o: ['Con respeto y cariño', 'Con gritos', 'Con burlas', 'Sin hablar'], c: 0, pista: 'Como nos gusta que nos traten.', porque: 'Con respeto y cariño.' }
        ],
        ejercicio: { enunciado: 'El hermano de mi papá es mi…', o: ['Abuelo', 'Tío', 'Primo', 'Hermano'], c: 1, pasos: ['Mi papá tiene un hermano.', 'Los hermanos de nuestros papás son nuestros tíos.', 'Respuesta: es mi tío.'] },
        dudas: [
          { q: 'Profe, mi familia es solo mi abuelita y yo, ¿es una familia?', o: ['¡Claro que sí! Una familia es quien te cuida y te quiere.', 'No, faltan personas.', 'Solo si tienes perro.'], c: 0 },
          { q: 'Profe, ¿los hijos de mis tíos qué son?', o: ['Son tus primos.', 'Son tus hermanos.', 'Son tus abuelos.'], c: 0 }
        ],
        tarea: 'Dibujar a su familia y contar una actividad que realizan juntos.'
      },
      {
        id: 'cs-p-2', titulo: 'Normas de convivencia',
        objetivo: 'Practicar normas de convivencia en el aula y la escuela.',
        previo: { q: '¿Qué pasa si todos hablamos al mismo tiempo?', r: ['¡No se entiende nada!', 'Hay mucha bulla.', 'La profe se enoja.', 'Nadie escucha.', 'Es divertido 😄.'] },
        explicacion: [
          'Las normas de convivencia son acuerdos para vivir en armonía.',
          'Algunas normas: levantar la mano para hablar ✋, saludar, pedir por favor y dar gracias, compartir.',
          'Respetar las normas nos ayuda a aprender y a sentirnos bien todos juntos.'
        ],
        preguntas: [
          { q: '¿Qué hacemos para pedir la palabra?', o: ['Gritar', 'Levantar la mano', 'Pararse en la silla', 'Llorar'], c: 1, pista: '✋', porque: 'Levantamos la mano y esperamos nuestro turno.' },
          { q: 'Si alguien me presta su lápiz, digo…', o: ['Nada', 'Gracias', 'Dame más', 'Es mío'], c: 1, pista: 'Es una palabra mágica.', porque: 'Decimos "gracias".' },
          { q: 'Si un compañero se cae, ¿qué hago?', o: ['Me río', 'Lo ayudo', 'Me voy', 'Lo empujo'], c: 1, pista: '¿Qué te gustaría que hagan por ti?', porque: 'Ayudamos a los demás.' },
          { q: '¿Dónde va la basura?', o: ['Al piso', 'Al tacho de basura', 'Debajo del pupitre', 'A la ventana'], c: 1, pista: '🗑️', porque: 'La basura va al tacho.' }
        ],
        ejercicio: { enunciado: 'Dos niños quieren el mismo juguete. ¿Qué es lo mejor?', o: ['Pelear', 'Turnarse para jugar', 'Romperlo', 'Esconderlo'], c: 1, pasos: ['Identificamos el problema: ambos quieren jugar.', 'Pensamos en una solución justa para los dos.', 'Turnarse permite que ambos jueguen.'] },
        dudas: [
          { q: 'Profe, ¿por qué hay que esperar el turno?', o: ['Para que todos podamos hablar y ser escuchados.', 'Porque sí.', 'Para aburrirnos.'], c: 0 },
          { q: 'Profe, ¿las normas también son para los grandes?', o: ['Sí, todas las personas seguimos normas para convivir.', 'No, solo para niños.', 'Solo para profesores.'], c: 0 }
        ],
        tarea: 'Elaborar con la familia 3 normas de convivencia para la casa.'
      }
    ],
    elemental: [
      {
        id: 'cs-e-1', titulo: 'Regiones del Ecuador',
        objetivo: 'Identificar las cuatro regiones naturales del Ecuador y sus características.',
        previo: { q: '¿Han visitado la playa, la montaña o la selva?', r: ['¡Yo fui a la playa en Salinas!', 'Yo vivo cerca de un volcán.', 'Mi abuelo vive en el Oriente.', 'Nunca he viajado.', 'Fui a Baños.'] },
        explicacion: [
          'El Ecuador tiene cuatro regiones naturales: Costa, Sierra, Amazonía e Insular (Galápagos).',
          'La Sierra está atravesada por la cordillera de los Andes; la Costa tiene playas y clima cálido.',
          'La Amazonía tiene bosques húmedos tropicales y Galápagos tiene especies únicas en el mundo.'
        ],
        preguntas: [
          { q: '¿Cuántas regiones naturales tiene el Ecuador?', o: ['3', '4', '5', '2'], c: 1, pista: 'Costa, Sierra…', porque: 'Costa, Sierra, Amazonía e Insular.' },
          { q: '¿En qué región están las islas Galápagos?', o: ['Costa', 'Insular', 'Sierra', 'Amazonía'], c: 1, pista: 'Son islas.', porque: 'Galápagos forma la región Insular.' },
          { q: '¿Qué cordillera atraviesa la Sierra?', o: ['Los Alpes', 'Los Andes', 'El Himalaya', 'Los Pirineos'], c: 1, pista: 'Es la más larga de América.', porque: 'La cordillera de los Andes.' },
          { q: 'La capital del Ecuador, Quito, está en la…', o: ['Costa', 'Sierra', 'Amazonía', 'Región Insular'], c: 1, pista: 'Está rodeada de montañas.', porque: 'Quito está en la Sierra.' }
        ],
        ejercicio: { enunciado: 'Una región tiene selva, ríos caudalosos y mucha lluvia. ¿Cuál es?', o: ['Sierra', 'Amazonía', 'Insular', 'Costa'], c: 1, pasos: ['Pensamos en dónde hay selva tropical.', 'Ríos como el Napo y el Pastaza están allí.', 'Es la región Amazónica.'] },
        dudas: [
          { q: 'Profe, ¿por qué en la Sierra hace más frío si está en la línea ecuatorial?', o: ['Por la altura: mientras más alto, más frío.', 'Porque no hay sol.', 'Porque llueve hielo.'], c: 0 },
          { q: 'Profe, ¿qué animales solo viven en Galápagos?', o: ['Las tortugas gigantes y las iguanas marinas, entre otros.', 'Los leones.', 'Los osos polares.'], c: 0 }
        ],
        tarea: 'Elaborar un mapa del Ecuador coloreando sus cuatro regiones.'
      },
      {
        id: 'cs-e-2', titulo: 'Símbolos patrios',
        objetivo: 'Reconocer y valorar los símbolos patrios del Ecuador.',
        previo: { q: '¿Qué hacemos los lunes en el minuto cívico?', r: ['Cantamos el himno.', 'Izamos la bandera.', 'Formamos en el patio.', 'Escuchamos al rector.', 'Nos da sueño 😴.'] },
        explicacion: [
          'Los símbolos patrios son la Bandera, el Escudo y el Himno Nacional.',
          'La bandera tiene tres franjas: amarillo (riquezas), azul (cielo y mar) y rojo (sangre de los héroes).',
          'El Himno Nacional fue escrito por Juan León Mera y la música es de Antonio Neumane.'
        ],
        preguntas: [
          { q: '¿Cuáles son los símbolos patrios?', o: ['Bandera, Escudo e Himno', 'Bandera y moneda', 'Escudo y mapa', 'Himno y volcanes'], c: 0, pista: 'Son tres.', porque: 'Bandera, Escudo e Himno Nacional.' },
          { q: '¿Qué color ocupa la franja más ancha de la bandera?', o: ['Azul', 'Amarillo', 'Rojo', 'Verde'], c: 1, pista: 'Está arriba.', porque: 'El amarillo ocupa la mitad de la bandera.' },
          { q: '¿Quién escribió la letra del Himno Nacional?', o: ['Eloy Alfaro', 'Juan León Mera', 'Simón Bolívar', 'Eugenio Espejo'], c: 1, pista: 'Escritor ambateño.', porque: 'Juan León Mera escribió la letra.' },
          { q: '¿Qué ave aparece en el escudo?', o: ['Colibrí', 'Cóndor', 'Loro', 'Águila calva'], c: 1, pista: 'Vive en los Andes.', porque: 'El cóndor andino.' }
        ],
        ejercicio: { enunciado: '¿Qué representa el color azul de la bandera?', o: ['Las riquezas', 'El cielo y el mar', 'La sangre de los héroes', 'La selva'], c: 1, pasos: ['Recordamos los tres colores.', 'El amarillo: riquezas; el rojo: sangre de los héroes.', 'El azul representa el cielo y el mar.'] },
        dudas: [
          { q: 'Profe, ¿cuándo es el día de la bandera?', o: ['El 26 de septiembre.', 'El 25 de diciembre.', 'El 1 de enero.'], c: 0 },
          { q: 'Profe, ¿qué es el volcán que sale en el escudo?', o: ['Es el Chimborazo.', 'Es el Everest.', 'Es un volcán inventado.'], c: 0 }
        ],
        tarea: 'Dibujar el escudo del Ecuador e investigar el significado de 3 de sus elementos.'
      }
    ],
    media: [
      {
        id: 'cs-m-1', titulo: 'Independencia del Ecuador',
        objetivo: 'Explicar los hechos principales del proceso de independencia.',
        previo: { q: '¿Por qué celebramos el 10 de agosto?', r: ['Por el Primer Grito de Independencia.', 'Porque no hay clases.', 'Por algo de los próceres.', 'Por la Batalla de Pichincha.', 'No sé, profe.'] },
        explicacion: [
          'El 10 de agosto de 1809, en Quito, se dio el Primer Grito de Independencia contra el dominio español.',
          'El 9 de octubre de 1820 se independizó Guayaquil.',
          'El 24 de mayo de 1822, la Batalla de Pichincha, liderada por Antonio José de Sucre, consolidó la independencia.'
        ],
        preguntas: [
          { q: '¿Cuándo fue el Primer Grito de Independencia?', o: ['24 de mayo de 1822', '10 de agosto de 1809', '9 de octubre de 1820', '12 de octubre de 1492'], c: 1, pista: 'Es feriado en agosto.', porque: '10 de agosto de 1809.' },
          { q: '¿Quién dirigió la Batalla de Pichincha?', o: ['Eloy Alfaro', 'Antonio José de Sucre', 'García Moreno', 'Manuela Sáenz'], c: 1, pista: 'Fue llamado el Gran Mariscal de Ayacucho.', porque: 'Antonio José de Sucre.' },
          { q: '¿Qué ciudad se independizó el 9 de octubre de 1820?', o: ['Cuenca', 'Guayaquil', 'Quito', 'Loja'], c: 1, pista: 'Es el puerto principal.', porque: 'Guayaquil.' },
          { q: '¿De qué país se independizó la Real Audiencia de Quito?', o: ['Portugal', 'España', 'Francia', 'Inglaterra'], c: 1, pista: 'Llegaron en 1492 a América.', porque: 'De España.' }
        ],
        ejercicio: { enunciado: 'Ordena cronológicamente: Batalla de Pichincha, Primer Grito, Independencia de Guayaquil.', o: ['Pichincha, Guayaquil, Primer Grito', 'Primer Grito, Guayaquil, Pichincha', 'Guayaquil, Primer Grito, Pichincha', 'Primer Grito, Pichincha, Guayaquil'], c: 1, pasos: ['Primer Grito: 1809.', 'Independencia de Guayaquil: 1820.', 'Batalla de Pichincha: 1822.'] },
        dudas: [
          { q: 'Profe, ¿qué papel cumplió Manuela Sáenz?', o: ['Fue una heroína quiteña que apoyó la independencia y fue llamada "Libertadora del Libertador".', 'No participó.', 'Era una reina española.'], c: 0 },
          { q: 'Profe, ¿por qué querían independizarse?', o: ['Por los abusos, impuestos y la falta de derechos de los criollos y pueblos originarios.', 'Porque se aburrieron.', 'Por un partido de fútbol.'], c: 0 }
        ],
        tarea: 'Elaborar una línea de tiempo ilustrada del proceso de independencia.'
      },
      {
        id: 'cs-m-2', titulo: 'Derechos de los niños',
        objetivo: 'Reconocer los derechos y responsabilidades de niños, niñas y adolescentes.',
        previo: { q: '¿Qué necesita un niño para crecer feliz?', r: ['Amor y una familia.', 'Ir a la escuela.', 'Jugar mucho.', 'Comida y salud.', 'Un celular 📱.'] },
        explicacion: [
          'Los derechos son garantías que tienen todas las personas; los de la niñez están en el Código de la Niñez y Adolescencia y en la Convención sobre los Derechos del Niño.',
          'Algunos derechos: a la vida, a la educación, a la salud, al juego, a un nombre y nacionalidad, y a ser protegidos del maltrato.',
          'Los derechos van de la mano con responsabilidades: estudiar, respetar a los demás, cuidar el ambiente.'
        ],
        preguntas: [
          { q: '¿Cuál es un derecho de los niños?', o: ['Trabajar en la calle', 'Recibir educación', 'No comer', 'Ser maltratado'], c: 1, pista: 'Lo ejercemos en la escuela.', porque: 'La educación es un derecho.' },
          { q: '¿Cuál es una responsabilidad?', o: ['Jugar', 'Cumplir las tareas', 'Tener un nombre', 'Recibir cariño'], c: 1, pista: 'Es algo que nos toca hacer.', porque: 'Cumplir las tareas es una responsabilidad.' },
          { q: 'Si un niño sufre maltrato, debe…', o: ['Callar', 'Contarlo a un adulto de confianza', 'Esconderse', 'Culparse'], c: 1, pista: 'Buscar ayuda.', porque: 'Debe contarlo a un adulto de confianza o llamar al 911.' },
          { q: '¿Los derechos son para todos los niños?', o: ['Solo para algunos', 'Sí, sin discriminación', 'Solo para los que estudian', 'Solo en la ciudad'], c: 1, pista: 'Sin importar origen o condición.', porque: 'Son universales.' }
        ],
        ejercicio: { enunciado: 'Un niño de 10 años trabaja vendiendo en la calle y no va a la escuela. ¿Qué derecho se vulnera?', o: ['Derecho al nombre', 'Derecho a la educación', 'Derecho a la nacionalidad', 'Ninguno'], c: 1, pasos: ['Analizamos la situación.', 'No asiste a la escuela y trabaja.', 'Se vulnera el derecho a la educación (y a la protección contra el trabajo infantil).'] },
        dudas: [
          { q: 'Profe, ¿jugar también es un derecho?', o: ['Sí, el juego y la recreación son derechos de la niñez.', 'No, es pérdida de tiempo.', 'Solo los fines de semana.'], c: 0 },
          { q: 'Profe, ¿a quién puedo pedir ayuda si se vulneran mis derechos?', o: ['A un docente, al DECE, a la familia o a la Junta de Protección de Derechos.', 'A nadie.', 'Solo a mis amigos.'], c: 0 }
        ],
        tarea: 'Crear un afiche sobre un derecho de la niñez y una responsabilidad relacionada.'
      }
    ],
    superior: [
      {
        id: 'cs-s-1', titulo: 'Culturas precolombinas',
        objetivo: 'Analizar los aportes de las culturas precolombinas del territorio ecuatoriano.',
        previo: { q: '¿Quiénes vivían en nuestro territorio antes de la llegada de los españoles?', r: ['Los incas.', 'Los pueblos indígenas.', 'Los cañaris y los quitus.', 'La cultura Valdivia.', 'Los dinosaurios 🦖.'] },
        explicacion: [
          'La cultura Valdivia (Costa, c. 3500 a.C.) es una de las más antiguas de América y elaboró cerámica y las famosas "Venus de Valdivia".',
          'Culturas como La Tolita trabajaron el oro y el platino con gran maestría; los Cañaris y Puruháes se desarrollaron en la Sierra.',
          'El Imperio Inca llegó al territorio en el siglo XV; construyeron caminos (Qhapaq Ñan) y el complejo de Ingapirca.'
        ],
        preguntas: [
          { q: '¿Qué cultura elaboró las Venus de Valdivia?', o: ['Inca', 'Valdivia', 'Cañari', 'Azteca'], c: 1, pista: 'Lleva el mismo nombre.', porque: 'La cultura Valdivia.' },
          { q: '¿Dónde se encuentra el complejo arqueológico de Ingapirca?', o: ['Manabí', 'Cañar', 'Napo', 'Galápagos'], c: 1, pista: 'Territorio cañari.', porque: 'Está en la provincia de Cañar.' },
          { q: '¿Qué cultura destacó en orfebrería de oro y platino?', o: ['La Tolita', 'Valdivia', 'Machalilla', 'Chorrera'], c: 0, pista: 'Está en Esmeraldas.', porque: 'La Tolita trabajó oro y platino.' },
          { q: '¿Cómo se llamaba la red de caminos inca?', o: ['Panamericana', 'Qhapaq Ñan', 'Ruta del Sol', 'Spondylus'], c: 1, pista: 'Es Patrimonio de la Humanidad.', porque: 'Qhapaq Ñan.' }
        ],
        ejercicio: { enunciado: '¿Cuál es el orden cronológico aproximado?', o: ['Inca → Valdivia → Cañari', 'Valdivia → Cañari → Inca', 'Cañari → Inca → Valdivia', 'Inca → Cañari → Valdivia'], c: 1, pasos: ['Valdivia: alrededor de 3500 a.C.', 'Cañaris: período de integración (antes del siglo XV).', 'Incas: llegada en el siglo XV.'] },
        dudas: [
          { q: 'Profe, ¿los pueblos indígenas desaparecieron?', o: ['No, hoy existen 14 nacionalidades y varios pueblos indígenas en Ecuador.', 'Sí, todos.', 'Solo quedan en museos.'], c: 0 },
          { q: 'Profe, ¿qué es el Spondylus?', o: ['Una concha marina muy valorada, usada como moneda y en rituales.', 'Un dinosaurio.', 'Un tipo de maíz.'], c: 0 }
        ],
        tarea: 'Investigar una cultura precolombina y presentar sus aportes en un organizador gráfico.'
      },
      {
        id: 'cs-s-2', titulo: 'Democracia y ciudadanía',
        objetivo: 'Comprender la organización del Estado ecuatoriano y la participación ciudadana.',
        previo: { q: '¿Qué significa votar?', r: ['Elegir a las autoridades.', 'Escoger al presidente.', 'Dar tu opinión.', 'Ir a una mesa con papeletas.', 'Algo de los adultos.'] },
        explicacion: [
          'La democracia es una forma de gobierno en la que el poder reside en el pueblo, que elige a sus representantes.',
          'El Estado ecuatoriano tiene cinco funciones: Ejecutiva, Legislativa, Judicial, Electoral y de Transparencia y Control Social.',
          'En Ecuador el voto es obligatorio desde los 18 años y facultativo desde los 16.'
        ],
        preguntas: [
          { q: '¿Cuántas funciones del Estado tiene el Ecuador?', o: ['3', '5', '4', '2'], c: 1, pista: 'Además de las tres clásicas, hay dos más.', porque: 'Ejecutiva, Legislativa, Judicial, Electoral y Transparencia y Control Social.' },
          { q: '¿Desde qué edad es facultativo el voto?', o: ['14', '16', '18', '21'], c: 1, pista: 'Dos años antes de la mayoría de edad.', porque: 'Desde los 16 años.' },
          { q: '¿Qué función elabora las leyes?', o: ['Ejecutiva', 'Legislativa', 'Judicial', 'Electoral'], c: 1, pista: 'La Asamblea Nacional.', porque: 'La función Legislativa.' },
          { q: 'En democracia, el poder reside en…', o: ['El presidente', 'El pueblo', 'El ejército', 'Las empresas'], c: 1, pista: '"Demos" significa pueblo.', porque: 'En el pueblo.' }
        ],
        ejercicio: { enunciado: 'El gobierno escolar se elige mediante votación de los estudiantes. ¿Qué valor democrático se practica?', o: ['Autoritarismo', 'Participación', 'Exclusión', 'Monarquía'], c: 1, pasos: ['Los estudiantes eligen a sus representantes.', 'Cada voto cuenta por igual.', 'Se practica la participación democrática.'] },
        dudas: [
          { q: 'Profe, ¿qué es la Constitución?', o: ['Es la norma suprema que establece derechos y la organización del Estado.', 'Es un libro de historia.', 'Es una ley para niños.'], c: 0 },
          { q: 'Profe, ¿los estudiantes podemos participar en política?', o: ['Sí, en el gobierno escolar, consejos estudiantiles y desde los 16 votando.', 'No, nunca.', 'Solo si somos famosos.'], c: 0 }
        ],
        tarea: 'Elaborar una propuesta de campaña para el gobierno estudiantil.'
      }
    ]
  },

  /* ===================== LENGUA Y COMUNICACIÓN ===================== */
  lengua: {
    preparatoria: [
      {
        id: 'll-p-1', titulo: 'Las vocales',
        objetivo: 'Reconocer las vocales y asociarlas con palabras del entorno.',
        previo: { q: '¿Qué palabras empiezan con el sonido "a"?', r: ['¡Avión! ✈️', 'Árbol.', 'Abuela.', 'Mamá… no, esa empieza con m.', 'Arcoíris 🌈.'] },
        explicacion: [
          'Las vocales son cinco: a, e, i, o, u.',
          'Se pronuncian con la boca abierta, sin que la lengua o los labios cierren el paso del aire.',
          'Todas las palabras tienen al menos una vocal: a-vión, e-le-fan-te, i-glú, o-so, u-va.'
        ],
        preguntas: [
          { q: '¿Con qué vocal empieza "oso" 🐻?', o: ['a', 'o', 'u', 'e'], c: 1, pista: 'Escucha: ooooso.', porque: 'Oso empieza con o.' },
          { q: '¿Con qué vocal empieza "uva" 🍇?', o: ['u', 'a', 'i', 'o'], c: 0, pista: 'Escucha: uuuuva.', porque: 'Uva empieza con u.' },
          { q: '¿Cuántas vocales hay?', o: ['3', '5', '7', '10'], c: 1, pista: 'a, e, i…', porque: 'Son 5: a, e, i, o, u.' },
          { q: '¿Qué palabra empieza con "e"?', o: ['Iglú', 'Elefante', 'Avión', 'Uña'], c: 1, pista: '🐘', porque: 'Elefante empieza con e.' }
        ],
        ejercicio: { enunciado: '¿Con qué vocal empieza "iguana" 🦎?', o: ['a', 'i', 'e', 'u'], c: 1, pasos: ['Decimos la palabra despacio: i-gua-na.', 'El primer sonido es "i".', 'Respuesta: i.'] },
        dudas: [
          { q: 'Profe, ¿la "y" es vocal?', o: ['Cuando va sola o al final, como en "rey", suena como "i", pero es una consonante.', 'Sí, siempre.', 'No existe esa letra.'], c: 0 },
          { q: 'Profe, ¿"hormiga" empieza con vocal?', o: ['Empieza con la letra h, que no suena; el primer sonido es "o".', 'Empieza con "a".', 'No tiene vocales.'], c: 0 }
        ],
        tarea: 'Recortar de revistas una imagen por cada vocal.'
      },
      {
        id: 'll-p-2', titulo: 'Escuchar y narrar cuentos',
        objetivo: 'Desarrollar la escucha y narrar la secuencia de un cuento.',
        previo: { q: '¿Cuál es su cuento favorito?', r: ['¡Caperucita Roja!', 'Los tres chanchitos.', 'El que me cuenta mi abuelito.', 'Uno de dinosaurios.', 'No me gustan los cuentos.'] },
        explicacion: [
          'Los cuentos tienen un inicio (presentan a los personajes), un nudo (el problema) y un final (cómo se soluciona).',
          'Los personajes son quienes viven la historia.',
          'Para escuchar bien: miramos a quien habla, guardamos silencio y pensamos en lo que pasa.'
        ],
        preguntas: [
          { q: 'En "Los tres chanchitos", ¿quién sopla las casas?', o: ['El oso', 'El lobo', 'El gato', 'La abuela'], c: 1, pista: '¡Auuuu!', porque: 'El lobo sopla las casas.' },
          { q: '¿Qué parte del cuento nos presenta a los personajes?', o: ['El final', 'El inicio', 'El nudo', 'El título'], c: 1, pista: '"Había una vez…"', porque: 'El inicio presenta los personajes.' },
          { q: '¿Qué hacemos cuando alguien cuenta un cuento?', o: ['Hablar fuerte', 'Escuchar en silencio', 'Salir corriendo', 'Dormir'], c: 1, pista: 'Para entender la historia.', porque: 'Escuchamos con atención.' },
          { q: '¿Cómo suelen empezar los cuentos?', o: ['Y colorín colorado…', 'Había una vez…', 'Fin.', 'Hola.'], c: 1, pista: 'Es la frase del principio.', porque: '"Había una vez…"' }
        ],
        ejercicio: { enunciado: '¿Cuál es el problema (nudo) en "Caperucita Roja"?', o: ['Caperucita lleva una canasta', 'El lobo engaña a Caperucita y se come a la abuela', 'Todos son felices', 'La mamá hornea pasteles'], c: 1, pasos: ['El inicio: Caperucita va a visitar a su abuela.', 'El problema aparece cuando el lobo la engaña.', 'Ese es el nudo del cuento.'] },
        dudas: [
          { q: 'Profe, ¿los cuentos son de verdad?', o: ['Son historias imaginarias, creadas para entretener y enseñar.', 'Sí, todo pasó.', 'Solo los de lobos.'], c: 0 },
          { q: 'Profe, ¿yo puedo inventar un cuento?', o: ['¡Claro! Solo necesitas personajes, un problema y un final.', 'No, solo los adultos.', 'Solo si sabes escribir.'], c: 0 }
        ],
        tarea: 'Pedir a un familiar que le cuente un cuento y dibujar su parte favorita.'
      }
    ],
    elemental: [
      {
        id: 'll-e-1', titulo: 'El sustantivo y el adjetivo',
        objetivo: 'Identificar sustantivos y adjetivos en oraciones.',
        previo: { q: '¿Cómo describirían a su mascota?', r: ['Mi perro es grande y peludo.', 'Mi gato es negro y travieso.', 'No tengo mascota.', 'Mi pez es naranja 🐟.', 'Mi tortuga es lenta.'] },
        explicacion: [
          'El sustantivo es la palabra que nombra personas, animales, cosas o lugares: niña, perro, mesa, Quito.',
          'El adjetivo dice cómo es el sustantivo: grande, azul, alegre.',
          'El adjetivo concuerda en género y número con el sustantivo: "gato negro", "gatas negras".'
        ],
        preguntas: [
          { q: 'En "El perro feliz corre", ¿cuál es el adjetivo?', o: ['perro', 'feliz', 'corre', 'el'], c: 1, pista: 'Dice cómo es el perro.', porque: '"Feliz" describe al perro.' },
          { q: '¿Cuál es un sustantivo?', o: ['Bonito', 'Mesa', 'Correr', 'Rápido'], c: 1, pista: 'Nombra una cosa.', porque: '"Mesa" nombra un objeto.' },
          { q: '¿Qué adjetivo concuerda con "flores"?', o: ['roja', 'rojas', 'rojo', 'rojos'], c: 1, pista: 'Flores es femenino y plural.', porque: '"Flores rojas".' },
          { q: '"Guayaquil" es un sustantivo…', o: ['Común', 'Propio', 'Adjetivo', 'Verbo'], c: 1, pista: 'Lleva mayúscula.', porque: 'Es el nombre propio de una ciudad.' }
        ],
        ejercicio: { enunciado: 'Identifica el sustantivo en: "La casa amarilla es antigua".', o: ['amarilla', 'casa', 'antigua', 'es'], c: 1, pasos: ['Buscamos la palabra que nombra algo.', '"Amarilla" y "antigua" dicen cómo es.', 'El sustantivo es "casa".'] },
        dudas: [
          { q: 'Profe, ¿por qué los nombres de personas van con mayúscula?', o: ['Porque son sustantivos propios.', 'Porque son importantes.', 'No van con mayúscula.'], c: 0 },
          { q: 'Profe, ¿"alegría" es adjetivo?', o: ['No, es un sustantivo abstracto; "alegre" es el adjetivo.', 'Sí, siempre.', 'Es un verbo.'], c: 0 }
        ],
        tarea: 'Escribir 5 oraciones describiendo su barrio, subrayar sustantivos y adjetivos.'
      },
      {
        id: 'll-e-2', titulo: 'Comprensión lectora: la fábula',
        objetivo: 'Identificar personajes, secuencia y moraleja en una fábula.',
        previo: { q: '¿Conocen la fábula de la liebre y la tortuga?', r: ['¡Sí! Gana la tortuga.', 'La liebre se queda dormida.', 'No la conozco.', 'La tortuga es lenta pero constante.', 'La liebre era muy creída.'] },
        explicacion: [
          'La fábula es un relato breve cuyos personajes suelen ser animales que actúan como personas.',
          'Al final deja una enseñanza llamada moraleja.',
          'Para comprender un texto, nos preguntamos: ¿quién?, ¿qué pasó?, ¿dónde?, ¿por qué?'
        ],
        preguntas: [
          { q: '¿Qué es la moraleja?', o: ['El título', 'La enseñanza de la fábula', 'Un personaje', 'El lugar'], c: 1, pista: 'Aparece al final.', porque: 'Es la enseñanza.' },
          { q: 'En "La liebre y la tortuga", ¿quién gana?', o: ['La liebre', 'La tortuga', 'Empatan', 'Nadie'], c: 1, pista: 'La liebre se durmió.', porque: 'Gana la tortuga por ser constante.' },
          { q: '¿Qué moraleja deja "La liebre y la tortuga"?', o: ['Correr es malo', 'La constancia vence a la arrogancia', 'Dormir es bueno', 'Las tortugas son rápidas'], c: 1, pista: 'Piensa en por qué ganó la tortuga.', porque: 'La constancia y la humildad vencen.' },
          { q: 'Los personajes de las fábulas suelen ser…', o: ['Robots', 'Animales que actúan como personas', 'Solo reyes', 'Plantas'], c: 1, pista: 'Hablan y piensan.', porque: 'Son animales personificados.' }
        ],
        ejercicio: { enunciado: 'En "La cigarra y la hormiga", la hormiga trabaja en verano y la cigarra canta. En invierno, la cigarra no tiene comida. ¿Moraleja?', o: ['Cantar es malo', 'Hay que ser previsivos y trabajar', 'Las hormigas son egoístas', 'El invierno es largo'], c: 1, pasos: ['Personajes: la cigarra y la hormiga.', 'Problema: la cigarra no se preparó para el invierno.', 'Moraleja: hay que ser previsivos y responsables.'] },
        dudas: [
          { q: 'Profe, ¿quién escribió fábulas famosas?', o: ['Esopo, en la antigua Grecia, y luego La Fontaine y Samaniego.', 'Shakespeare.', 'Nadie, son anónimas siempre.'], c: 0 },
          { q: 'Profe, ¿un cuento y una fábula son lo mismo?', o: ['No, la fábula siempre deja una moraleja y suele tener animales.', 'Sí, iguales.', 'La fábula es un poema.'], c: 0 }
        ],
        tarea: 'Escribir una fábula corta con animales del Ecuador y su moraleja.'
      }
    ],
    media: [
      {
        id: 'll-m-1', titulo: 'Reglas de acentuación',
        objetivo: 'Clasificar palabras en agudas, graves y esdrújulas y aplicar la tilde.',
        previo: { q: '¿Por qué algunas palabras llevan tilde?', r: ['Para saber dónde suena más fuerte.', 'Porque así se escriben.', 'Para que no se confundan.', 'Por la sílaba tónica.', 'Yo nunca pongo tildes 😬.'] },
        explicacion: [
          'La sílaba tónica es la que se pronuncia con más fuerza.',
          'Agudas: tónica en la última sílaba; llevan tilde si terminan en n, s o vocal (canción, café).',
          'Graves: penúltima sílaba; tilde si NO terminan en n, s o vocal (árbol, lápiz). Esdrújulas: antepenúltima; siempre llevan tilde (música, pájaro).'
        ],
        preguntas: [
          { q: '"Canción" es una palabra…', o: ['Grave', 'Aguda', 'Esdrújula', 'Sobresdrújula'], c: 1, pista: 'can-CIÓN', porque: 'La tónica es la última sílaba.' },
          { q: '¿Qué palabra esdrújula está bien escrita?', o: ['murcielago', 'murciélago', 'murcielagó', 'múrcielago'], c: 1, pista: 'mur-cié-la-go', porque: 'Las esdrújulas siempre llevan tilde en la antepenúltima.' },
          { q: '¿Por qué "árbol" lleva tilde?', o: ['Es aguda terminada en vocal', 'Es grave y no termina en n, s o vocal', 'Es esdrújula', 'Por capricho'], c: 1, pista: 'ÁR-bol termina en l.', porque: 'Es grave terminada en consonante distinta de n o s.' },
          { q: '¿Cuál es una palabra grave?', o: ['Reloj', 'Mesa', 'Teléfono', 'Sofá'], c: 1, pista: 'ME-sa', porque: '"Mesa" tiene la tónica en la penúltima.' }
        ],
        ejercicio: { enunciado: '¿Lleva tilde la palabra "lapiz"?', o: ['No, porque es aguda', 'Sí: "lápiz", es grave terminada en z', 'Sí: "lapíz"', 'No, porque es esdrújula'], c: 1, pasos: ['Separamos en sílabas: la-piz.', 'La tónica es "la": es grave.', 'Termina en z (no n, s ni vocal): lleva tilde → lápiz.'] },
        dudas: [
          { q: 'Profe, ¿todas las palabras tienen sílaba tónica?', o: ['Sí, aunque no todas llevan tilde escrita.', 'No, solo las que tienen tilde.', 'Solo las largas.'], c: 0 },
          { q: 'Profe, ¿por qué "examen" no lleva tilde pero "exámenes" sí?', o: ['"Examen" es grave terminada en n; "exámenes" es esdrújula.', 'Es un error del diccionario.', 'Las dos llevan tilde.'], c: 0 }
        ],
        tarea: 'Buscar en un periódico 5 palabras agudas, 5 graves y 5 esdrújulas.'
      },
      {
        id: 'll-m-2', titulo: 'El texto instructivo',
        objetivo: 'Reconocer la estructura del texto instructivo y redactar uno.',
        previo: { q: '¿Han seguido una receta o armado un juguete con instrucciones?', r: ['Sí, armé un Lego.', 'Mi mamá sigue recetas.', 'Yo hice gelatina.', 'Nunca leo las instrucciones 😅.', 'Las de un juego de mesa.'] },
        explicacion: [
          'El texto instructivo indica los pasos para realizar una actividad: recetas, manuales, reglas de juego.',
          'Estructura: título, materiales o ingredientes, y procedimiento (pasos numerados).',
          'Usa verbos en imperativo o infinitivo (mezcla / mezclar) y conectores de orden: primero, luego, finalmente.'
        ],
        preguntas: [
          { q: '¿Cuál es un texto instructivo?', o: ['Un cuento', 'Una receta de cocina', 'Un poema', 'Una noticia'], c: 1, pista: 'Indica pasos.', porque: 'La receta indica cómo preparar algo.' },
          { q: '¿Qué palabra es un conector de orden?', o: ['Pero', 'Primero', 'Porque', 'Aunque'], c: 1, pista: 'Indica secuencia.', porque: '"Primero" indica el orden.' },
          { q: '¿Qué parte enumera lo que necesitamos?', o: ['Procedimiento', 'Materiales', 'Título', 'Final'], c: 1, pista: 'Antes de empezar…', porque: 'La lista de materiales o ingredientes.' },
          { q: '¿Qué verbo está en imperativo?', o: ['Mezclaba', 'Mezcla', 'Mezclaremos', 'Mezclado'], c: 1, pista: 'Es una orden.', porque: '"Mezcla" es imperativo.' }
        ],
        ejercicio: { enunciado: 'Ordena los pasos para lavarse las manos:', o: ['Secarse, enjabonarse, mojarse', 'Mojarse, enjabonarse, enjuagarse, secarse', 'Enjuagarse, secarse, mojarse', 'Secarse, mojarse, enjabonarse'], c: 1, pasos: ['Primero: mojarse las manos.', 'Luego: enjabonarse y frotar 20 segundos; después enjuagarse.', 'Finalmente: secarse con una toalla limpia.'] },
        dudas: [
          { q: 'Profe, ¿las reglas de un juego son texto instructivo?', o: ['Sí, explican cómo jugar paso a paso.', 'No, son un cuento.', 'Son una poesía.'], c: 0 },
          { q: 'Profe, ¿por qué se numeran los pasos?', o: ['Para seguir el orden correcto sin confundirse.', 'Para que se vea bonito.', 'No es necesario nunca.'], c: 0 }
        ],
        tarea: 'Redactar un instructivo para preparar un plato típico ecuatoriano.'
      }
    ],
    superior: [
      {
        id: 'll-s-1', titulo: 'El texto argumentativo',
        objetivo: 'Identificar tesis, argumentos y conclusión en textos argumentativos.',
        previo: { q: '¿Cómo convencerían a sus padres de tener una mascota?', r: ['Diciendo que la voy a cuidar.', 'Que me enseña responsabilidad.', 'Rogando mucho 🙏.', 'Con datos de que mejora el ánimo.', 'Haciendo una presentación.'] },
        explicacion: [
          'El texto argumentativo busca convencer al lector sobre una postura.',
          'Estructura: tesis (idea que se defiende), argumentos (razones que la sostienen) y conclusión.',
          'Tipos de argumentos: de autoridad (cita a expertos), de datos o estadísticas, de ejemplo y de causa-consecuencia.'
        ],
        preguntas: [
          { q: '¿Qué es la tesis?', o: ['Un ejemplo', 'La idea principal que se defiende', 'La conclusión final', 'Un dato numérico'], c: 1, pista: 'Es la postura del autor.', porque: 'La tesis es la idea que se defiende.' },
          { q: '"Según la OMS, el ejercicio reduce el estrés" es un argumento…', o: ['De ejemplo', 'De autoridad', 'Emocional', 'De causa'], c: 1, pista: 'Cita a una institución experta.', porque: 'Es argumento de autoridad.' },
          { q: '¿Cuál es el propósito del texto argumentativo?', o: ['Entretener', 'Convencer', 'Describir un lugar', 'Dar instrucciones'], c: 1, pista: 'Busca que pienses igual.', porque: 'Su propósito es persuadir.' },
          { q: '¿Qué conector introduce una conclusión?', o: ['Sin embargo', 'En conclusión', 'Por ejemplo', 'Además'], c: 1, pista: 'Cierra el texto.', porque: '"En conclusión" cierra el texto.' }
        ],
        ejercicio: { enunciado: '"Los celulares deberían limitarse en clase porque distraen; un estudio mostró que bajan el rendimiento". ¿Cuál es la tesis?', o: ['Un estudio mostró que bajan el rendimiento', 'Los celulares deberían limitarse en clase', 'Los celulares distraen', 'Los estudios son importantes'], c: 1, pasos: ['Buscamos la postura que se defiende.', '"Porque distraen" y "un estudio mostró" son razones (argumentos).', 'La tesis: los celulares deberían limitarse en clase.'] },
        dudas: [
          { q: 'Profe, ¿una opinión es lo mismo que un argumento?', o: ['No, el argumento es una razón que sustenta la opinión con evidencias.', 'Sí, es igual.', 'Los argumentos son mentiras.'], c: 0 },
          { q: 'Profe, ¿qué es un contraargumento?', o: ['Una razón que se opone a la tesis y que el autor puede refutar.', 'Un argumento repetido.', 'El título del texto.'], c: 0 }
        ],
        tarea: 'Escribir un texto argumentativo de 3 párrafos sobre el uso de plásticos.'
      },
      {
        id: 'll-s-2', titulo: 'Figuras literarias',
        objetivo: 'Reconocer y producir figuras literarias en textos poéticos.',
        previo: { q: 'Si digo "tus ojos son dos luceros", ¿qué quiero decir?', r: ['Que brillan mucho.', 'Que son bonitos.', 'Que son estrellas, literal.', 'Es una metáfora.', 'Que tiene linterna 😂.'] },
        explicacion: [
          'Las figuras literarias son recursos que embellecen el lenguaje y le dan expresividad.',
          'Símil o comparación: usa "como" (blanco como la nieve). Metáfora: identifica sin nexo (tus dientes son perlas).',
          'Personificación: da cualidades humanas a seres inanimados (el viento canta). Hipérbole: exageración (te lo dije mil veces).'
        ],
        preguntas: [
          { q: '"El sol nos sonríe" es una…', o: ['Hipérbole', 'Personificación', 'Símil', 'Rima'], c: 1, pista: 'El sol no puede sonreír.', porque: 'Se atribuye una acción humana al sol.' },
          { q: '"Rápido como el rayo" es un…', o: ['Símil', 'Metáfora', 'Hipérbole', 'Onomatopeya'], c: 0, pista: 'Usa "como".', porque: 'Es una comparación o símil.' },
          { q: '"Me muero de hambre" es una…', o: ['Metáfora', 'Hipérbole', 'Personificación', 'Aliteración'], c: 1, pista: 'Es una exageración.', porque: 'Es una hipérbole.' },
          { q: '"Tus cabellos son oro" es una…', o: ['Símil', 'Metáfora', 'Hipérbole', 'Personificación'], c: 1, pista: 'Identifica sin usar "como".', porque: 'Es una metáfora.' }
        ],
        ejercicio: { enunciado: 'Identifica la figura: "La luna, como un farol, ilumina el camino".', o: ['Metáfora', 'Símil', 'Hipérbole', 'Antítesis'], c: 1, pasos: ['Buscamos el nexo comparativo.', 'Aparece "como": luna comparada con un farol.', 'Es un símil o comparación.'] },
        dudas: [
          { q: 'Profe, ¿las figuras literarias solo están en poemas?', o: ['No, también en canciones, publicidad y el habla cotidiana.', 'Sí, solo en poemas.', 'Solo en libros antiguos.'], c: 0 },
          { q: 'Profe, ¿cuál es la diferencia entre símil y metáfora?', o: ['El símil usa un nexo como "como"; la metáfora identifica directamente.', 'Son iguales.', 'La metáfora siempre rima.'], c: 0 }
        ],
        tarea: 'Analizar las figuras literarias en una canción de su preferencia.'
      }
    ]
  }
};

function shuffleStr(correct, distractors) {
  const all = [correct, ...[...new Set(distractors)].filter(d => d !== correct).slice(0, 3)];
  for (let i = all.length - 1; i > 0; i--) { const j = rnd(0, i); [all[i], all[j]] = [all[j], all[i]]; }
  return { o: all, c: all.indexOf(correct) };
}

/* Actividades de gestión del aula (situaciones disruptivas) */
const CLASSROOM_EVENTS = [
  { tipo: 'distraido', texto: '{n} está mirando por la ventana y no presta atención.', icono: '💭' },
  { tipo: 'celular', texto: '{n} está jugando con algo debajo del pupitre.', icono: '📱' },
  { tipo: 'conversa', texto: '{n} está conversando con su compañero/a.', icono: '💬' },
  { tipo: 'noentiende', texto: '{n} dice: "Profe, no entiendo nada…"', icono: '😟' },
  { tipo: 'duda', texto: '{n} levanta la mano para hacer una pregunta.', icono: '🙋' },
  { tipo: 'cansado', texto: '{n} bosteza y apoya la cabeza en el pupitre.', icono: '😴' }
];
