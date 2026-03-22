/**
 * VPR 7 - Task 8: Text Information Volume Generator Module
 * Generates tasks for calculating information volume of text messages
 */

// Alphabets with their power and information weight per symbol
// N = 2^i, where N is alphabet power, i is information weight in bits
const alphabets = [
  { N: 4, i: 2, name: "4-символьного" },
  { N: 8, i: 3, name: "8-символьного" },
  { N: 16, i: 4, name: "16-символьного" },
  { N: 32, i: 5, name: "32-символьного" },
  { N: 64, i: 6, name: "64-символьного" },
  { N: 128, i: 7, name: "128-символьного" },
  { N: 256, i: 8, name: "256-символьного" },
  { N: 512, i: 9, name: "512-символьного" },
  { N: 1024, i: 10, name: "1024-символьного" },
];

/**
 * Generate random integer in range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random integer
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Select random element from array
 * @param {Array} arr - Array to select from
 * @returns {*} - Random element
 */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a task for calculating text information volume
 * @returns {Object} - Task object with type, text, answer, alphabet, K, bitsTotal, hintSteps
 */
function generateTask() {
  // Select random alphabet
  const alphabet = randomChoice(alphabets);

  // Generate number of symbols in message
  // Adjust so that answer in bytes is a whole number
  // I = K * i bits = K * i / 8 bytes
  // For whole answer K * i must be divisible by 8

  let K;
  if (alphabet.i === 8) {
    // With i=8 any K gives whole answer
    K = randomInt(10, 100);
  } else if (alphabet.i === 4) {
    // i=4: K must be even for whole answer
    K = randomInt(5, 50) * 2;
  } else if (alphabet.i === 6) {
    // i=6: K must be divisible by 4 for whole answer
    K = randomInt(3, 25) * 4;
  } else if (alphabet.i === 5) {
    // i=5: K must be divisible by 8 for whole answer
    K = randomInt(1, 12) * 8;
  } else if (alphabet.i === 7) {
    // i=7: K must be divisible by 8 for whole answer
    K = randomInt(1, 12) * 8;
  } else if (alphabet.i === 9) {
    // i=9: K must be divisible by 8 for whole answer
    K = randomInt(1, 10) * 8;
  } else if (alphabet.i === 10) {
    // i=10: K must be divisible by 4 for whole answer
    K = randomInt(2, 20) * 4;
  } else if (alphabet.i === 3) {
    // i=3: K must be divisible by 8 for whole answer
    K = randomInt(1, 12) * 8;
  } else if (alphabet.i === 2) {
    // i=2: K must be divisible by 4 for whole answer
    K = randomInt(2, 25) * 4;
  } else {
    K = randomInt(10, 80);
  }

  // Calculate information volume
  const bitsTotal = K * alphabet.i;
  const bytesTotal = bitsTotal / 8;

  // Form task text
  const taskText = `Сообщение, записанное буквами <span class="highlight">${alphabet.N}-символьного алфавита</span>, содержит <span class="highlight">${K} символов</span>. Чему равен информационный объём этого сообщения в байтах?`;

  // Form hint steps
  const hintSteps = [
    `<div class="hint-step">1. Определим информационный вес одного символа (i):</div>`,
    `<div class="hint-step">   По формуле N = 2<sup>i</sup>:</div>`,
    `<div class="hint-step">   ${alphabet.N} = 2<sup>${alphabet.i}</sup>, значит <span class="formula">i = ${alphabet.i} бит</span></div>`,
    `<div class="hint-step">2. Вычислим информационный объём сообщения в битах:</div>`,
    `<div class="hint-step">   <span class="formula">I = K × i = ${K} × ${alphabet.i} = ${bitsTotal} бит</span></div>`,
    `<div class="hint-step">3. Переведём биты в байты:</div>`,
    `<div class="hint-step">   <span class="formula">${bitsTotal} бит ÷ 8 = ${bytesTotal} байт</span></div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${bytesTotal} байт</span></div>`,
  ];

  return {
    type: "📝 Кодирование символов",
    text: taskText,
    answer: bytesTotal,
    alphabet: alphabet,
    K: K,
    bitsTotal: bitsTotal,
    hintSteps: hintSteps,
  };
}

// Export for use in pages
if (typeof window !== "undefined") {
  window.VPR7_Task8_Generator = {
    alphabets,
    randomInt,
    randomChoice,
    generateTask,
  };
}

// Export for ES6 modules if supported
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    alphabets,
    randomInt,
    randomChoice,
    generateTask,
  };
}
