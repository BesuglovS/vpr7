/**
 * VPR 7 - Task 9: Information Transmission Generator Module
 * Generates tasks for calculating speed, time, and volume in data transmission
 */

// Speed units
const speedUnits = {
  bps: { name: "бит/с", nameFull: "бит в секунду", factor: 1 },
  Kbps: { name: "Кбит/с", nameFull: "килобит в секунду", factor: 1024 },
  Mbps: {
    name: "Мбит/с",
    nameFull: "мегабит в секунду",
    factor: 1024 * 1024,
  },
};

// Volume units
const volumeUnits = {
  bit: { name: "бит", nameFull: "бит", factor: 1 },
  byte: { name: "байт", nameFull: "байт", factor: 8 },
  KB: { name: "КБ", nameFull: "килобайт", factor: 8 * 1024 },
  MB: { name: "МБ", nameFull: "мегабайт", factor: 8 * 1024 * 1024 },
  GB: {
    name: "ГБ",
    nameFull: "гигабайт",
    factor: 8 * 1024 * 1024 * 1024,
  },
};

// Time units
const timeUnits = {
  s: { name: "с", nameFull: "секунд", factor: 1 },
  min: { name: "мин", nameFull: "минут", factor: 60 },
};

/**
 * Round value to reasonable precision
 * @param {number} val - Value to round
 * @returns {number} - Rounded value
 */
function roundValue(val) {
  if (Number.isInteger(val)) return val;
  return Math.round(val * 1000) / 1000;
}

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
 * Convert speed to bits per second
 * @param {number} value - Speed value
 * @param {string} unit - Unit key
 * @returns {number} - Speed in bits per second
 */
function speedToBps(value, unit) {
  return value * speedUnits[unit].factor;
}

/**
 * Convert volume to bits
 * @param {number} value - Volume value
 * @param {string} unit - Unit key
 * @returns {number} - Volume in bits
 */
function volumeToBits(value, unit) {
  return value * volumeUnits[unit].factor;
}

/**
 * Convert time to seconds
 * @param {number} value - Time value
 * @param {string} unit - Unit key
 * @returns {number} - Time in seconds
 */
function timeToSeconds(value, unit) {
  return value * timeUnits[unit].factor;
}

/**
 * Get unit display name
 * @param {string} unitKey - Unit key
 * @returns {string} - Display name
 */
function getUnitName(unitKey) {
  if (speedUnits[unitKey]) {
    return speedUnits[unitKey].name;
  } else if (volumeUnits[unitKey]) {
    return volumeUnits[unitKey].name;
  } else if (timeUnits[unitKey]) {
    return timeUnits[unitKey].name;
  }
  return unitKey;
}

// Task type generators
const taskTypes = [
  generateFindVolume,
  generateFindSpeed,
  generateFindTime,
  generateFindVolumeComplex,
  generateFindSpeedComplex,
  generateFindTimeComplex,
];

/**
 * Task: Find file volume (simple)
 * @returns {Object} - Task object
 */
function generateFindVolume() {
  const sets = [
    {
      speed: 2048,
      speedUnit: "bps",
      time: 16,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 4096,
      speedUnit: "bps",
      time: 8,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 8192,
      speedUnit: "bps",
      time: 4,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 1024,
      speedUnit: "bps",
      time: 32,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 512,
      speedUnit: "bps",
      time: 64,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 256,
      speedUnit: "bps",
      time: 128,
      timeUnit: "s",
      answerUnit: "KB",
    },
  ];

  const set = randomChoice(sets);
  const speedBps = speedToBps(set.speed, set.speedUnit);
  const timeSec = timeToSeconds(set.time, set.timeUnit);
  const bitsTotal = speedBps * timeSec;
  const answer = roundValue(bitsTotal / volumeUnits[set.answerUnit].factor);

  const taskText = `Скорость передачи данных по сети составляет <span class="highlight">${set.speed} ${speedUnits[set.speedUnit].name}</span>. Передача заняла <span class="highlight">${set.time} ${timeUnits[set.timeUnit].name}</span>. Определите размер переданного файла в ${volumeUnits[set.answerUnit].nameFull}.`;

  const hintSteps = [
    `<div class="hint-step">1. Используем формулу: <span class="formula">I = v × t</span></div>`,
    `<div class="hint-step">2. Вычислим объём в битах:</div>`,
    `<div class="hint-step">   <span class="formula">${set.speed} ${speedUnits[set.speedUnit].name} × ${set.time} ${timeUnits[set.timeUnit].name} = ${bitsTotal} бит</span></div>`,
    `<div class="hint-step">3. Переведём в ${volumeUnits[set.answerUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${bitsTotal} бит ÷ ${volumeUnits[set.answerUnit].factor} = ${answer} ${volumeUnits[set.answerUnit].name}</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${volumeUnits[set.answerUnit].name}</span></div>`,
  ];

  return {
    type: "📦 Найти объём файла",
    text: taskText,
    answer: answer,
    answerUnit: set.answerUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Find file volume (complex)
 * @returns {Object} - Task object
 */
function generateFindVolumeComplex() {
  const sets = [
    {
      speed: 20,
      speedUnit: "Kbps",
      time: 32,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 64,
      speedUnit: "Kbps",
      time: 16,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 128,
      speedUnit: "Kbps",
      time: 8,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 2,
      speedUnit: "Mbps",
      time: 4,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 1,
      speedUnit: "Mbps",
      time: 8,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 256,
      speedUnit: "Kbps",
      time: 1,
      timeUnit: "min",
      answerUnit: "KB",
    },
    {
      speed: 512,
      speedUnit: "Kbps",
      time: 30,
      timeUnit: "s",
      answerUnit: "KB",
    },
    {
      speed: 8,
      speedUnit: "Mbps",
      time: 2,
      timeUnit: "min",
      answerUnit: "MB",
    },
    {
      speed: 4,
      speedUnit: "Mbps",
      time: 4,
      timeUnit: "min",
      answerUnit: "MB",
    },
    {
      speed: 2,
      speedUnit: "Mbps",
      time: 8,
      timeUnit: "min",
      answerUnit: "MB",
    },
  ];

  const set = randomChoice(sets);
  const speedBps = speedToBps(set.speed, set.speedUnit);
  const timeSec = timeToSeconds(set.time, set.timeUnit);
  const bitsTotal = speedBps * timeSec;
  const answer = roundValue(bitsTotal / volumeUnits[set.answerUnit].factor);

  const taskText = `Скорость передачи данных по сети составляет <span class="highlight">${set.speed} ${speedUnits[set.speedUnit].name}</span>. Передача заняла <span class="highlight">${set.time} ${timeUnits[set.timeUnit].name}</span>. Определите размер переданного файла в ${volumeUnits[set.answerUnit].nameFull}.`;

  const hintSteps = [
    `<div class="hint-step">1. Переведём скорость в бит/с:</div>`,
    `<div class="hint-step">   ${set.speed} ${speedUnits[set.speedUnit].name} = ${speedBps} бит/с</div>`,
    `<div class="hint-step">2. ${set.timeUnit === "min" ? "Переведём время в секунды:" : "Время уже в секундах:"}</div>`,
    `<div class="hint-step">   ${set.time} ${timeUnits[set.timeUnit].name} = ${timeSec} с</div>`,
    `<div class="hint-step">3. Вычислим объём по формуле <span class="formula">I = v × t</span>:</div>`,
    `<div class="hint-step">   <span class="formula">${speedBps} бит/с × ${timeSec} с = ${bitsTotal} бит</span></div>`,
    `<div class="hint-step">4. Переведём в ${volumeUnits[set.answerUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${bitsTotal} бит ÷ ${volumeUnits[set.answerUnit].factor} = ${answer} ${volumeUnits[set.answerUnit].name}</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${volumeUnits[set.answerUnit].name}</span></div>`,
  ];

  return {
    type: "📦 Найти объём файла",
    text: taskText,
    answer: answer,
    answerUnit: set.answerUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Find transmission speed (simple)
 * @returns {Object} - Task object
 */
function generateFindSpeed() {
  const sets = [
    {
      volume: 16,
      volumeUnit: "KB",
      time: 16,
      timeUnit: "s",
      answerUnit: "bps",
    },
    {
      volume: 8,
      volumeUnit: "KB",
      time: 8,
      timeUnit: "s",
      answerUnit: "bps",
    },
    {
      volume: 32,
      volumeUnit: "KB",
      time: 32,
      timeUnit: "s",
      answerUnit: "bps",
    },
    {
      volume: 4,
      volumeUnit: "KB",
      time: 4,
      timeUnit: "s",
      answerUnit: "bps",
    },
    {
      volume: 2,
      volumeUnit: "KB",
      time: 2,
      timeUnit: "s",
      answerUnit: "bps",
    },
  ];

  const set = randomChoice(sets);
  const bitsTotal = volumeToBits(set.volume, set.volumeUnit);
  const timeSec = timeToSeconds(set.time, set.timeUnit);
  const speedBps = bitsTotal / timeSec;
  const answer = roundValue(speedBps / speedUnits[set.answerUnit].factor);

  const taskText = `Файл размером <span class="highlight">${set.volume} ${volumeUnits[set.volumeUnit].name}</span> был передан за <span class="highlight">${set.time} ${timeUnits[set.timeUnit].name}</span>. Определите скорость передачи данных в ${speedUnits[set.answerUnit].nameFull}.`;

  const hintSteps = [
    `<div class="hint-step">1. Переведём объём файла в биты:</div>`,
    `<div class="hint-step">   ${set.volume} ${volumeUnits[set.volumeUnit].name} = ${set.volume} × 1024 × 8 = ${bitsTotal} бит</div>`,
    `<div class="hint-step">2. Используем формулу: <span class="formula">v = I / t</span></div>`,
    `<div class="hint-step">3. Вычислим скорость в бит/с:</div>`,
    `<div class="hint-step">   ${bitsTotal} бит ÷ ${timeSec} с = ${speedBps} бит/с</div>`,
    `<div class="hint-step">4. Переведём в ${speedUnits[set.answerUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${speedBps} бит/с = ${answer} ${speedUnits[set.answerUnit].name}</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${speedUnits[set.answerUnit].name}</span></div>`,
  ];

  return {
    type: "🚀 Найти скорость передачи",
    text: taskText,
    answer: answer,
    answerUnit: set.answerUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Find transmission speed (complex)
 * @returns {Object} - Task object
 */
function generateFindSpeedComplex() {
  const sets = [
    {
      volume: 64,
      volumeUnit: "KB",
      time: 8,
      timeUnit: "s",
      answerUnit: "Kbps",
    },
    {
      volume: 128,
      volumeUnit: "KB",
      time: 4,
      timeUnit: "s",
      answerUnit: "Kbps",
    },
    {
      volume: 256,
      volumeUnit: "KB",
      time: 2,
      timeUnit: "s",
      answerUnit: "Kbps",
    },
    {
      volume: 480,
      volumeUnit: "KB",
      time: 1,
      timeUnit: "min",
      answerUnit: "Kbps",
    },
    {
      volume: 1,
      volumeUnit: "MB",
      time: 8,
      timeUnit: "s",
      answerUnit: "Kbps",
    },
    {
      volume: 2,
      volumeUnit: "MB",
      time: 16,
      timeUnit: "s",
      answerUnit: "Kbps",
    },
  ];

  const set = randomChoice(sets);
  const bitsTotal = volumeToBits(set.volume, set.volumeUnit);
  const timeSec = timeToSeconds(set.time, set.timeUnit);
  const speedBps = bitsTotal / timeSec;
  const answer = roundValue(speedBps / speedUnits[set.answerUnit].factor);

  const taskText = `Файл размером <span class="highlight">${set.volume} ${volumeUnits[set.volumeUnit].name}</span> был передан за <span class="highlight">${set.time} ${timeUnits[set.timeUnit].name}</span>. Определите скорость передачи данных в ${speedUnits[set.answerUnit].nameFull}.`;

  const hintSteps = [
    `<div class="hint-step">1. Переведём объём файла в биты:</div>`,
    `<div class="hint-step">   ${set.volume} ${volumeUnits[set.volumeUnit].name} = ${bitsTotal} бит</div>`,
    `<div class="hint-step">2. ${set.timeUnit === "min" ? "Переведём время в секунды:" : "Время уже в секундах:"}</div>`,
    `<div class="hint-step">   ${set.time} ${timeUnits[set.timeUnit].name} = ${timeSec} с</div>`,
    `<div class="hint-step">3. Вычислим скорость по формуле <span class="formula">v = I / t</span>:</div>`,
    `<div class="hint-step">   <span class="formula">${bitsTotal} бит ÷ ${timeSec} с = ${speedBps} бит/с</span></div>`,
    `<div class="hint-step">4. Переведём в ${speedUnits[set.answerUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${speedBps} бит/с ÷ ${speedUnits[set.answerUnit].factor} = ${answer} ${speedUnits[set.answerUnit].name}</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${speedUnits[set.answerUnit].name}</span></div>`,
  ];

  return {
    type: "🚀 Найти скорость передачи",
    text: taskText,
    answer: answer,
    answerUnit: set.answerUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Find transmission time (simple)
 * @returns {Object} - Task object
 */
function generateFindTime() {
  const sets = [
    {
      volume: 16,
      volumeUnit: "KB",
      speed: 1024,
      speedUnit: "bps",
      answerUnit: "s",
    },
    {
      volume: 8,
      volumeUnit: "KB",
      speed: 512,
      speedUnit: "bps",
      answerUnit: "s",
    },
    {
      volume: 32,
      volumeUnit: "KB",
      speed: 2048,
      speedUnit: "bps",
      answerUnit: "s",
    },
    {
      volume: 4,
      volumeUnit: "KB",
      speed: 256,
      speedUnit: "bps",
      answerUnit: "s",
    },
    {
      volume: 64,
      volumeUnit: "KB",
      speed: 4096,
      speedUnit: "bps",
      answerUnit: "s",
    },
  ];

  const set = randomChoice(sets);
  const bitsTotal = volumeToBits(set.volume, set.volumeUnit);
  const speedBps = speedToBps(set.speed, set.speedUnit);
  const timeSec = bitsTotal / speedBps;
  const answer = roundValue(timeSec / timeUnits[set.answerUnit].factor);

  const taskText = `Файл размером <span class="highlight">${set.volume} ${volumeUnits[set.volumeUnit].name}</span> передаётся со скоростью <span class="highlight">${set.speed} ${speedUnits[set.speedUnit].name}</span>. Определите время передачи в ${timeUnits[set.answerUnit].nameFull}.`;

  const hintSteps = [
    `<div class="hint-step">1. Переведём объём файла в биты:</div>`,
    `<div class="hint-step">   ${set.volume} ${volumeUnits[set.volumeUnit].name} = ${set.volume} × 1024 × 8 = ${bitsTotal} бит</div>`,
    `<div class="hint-step">2. Используем формулу: <span class="formula">t = I / v</span></div>`,
    `<div class="hint-step">3. Вычислим время в секундах:</div>`,
    `<div class="hint-step">   ${bitsTotal} бит ÷ ${speedBps} бит/с = ${timeSec} с</div>`,
    `<div class="hint-step">4. Ответ в ${timeUnits[set.answerUnit].nameFull}:</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${timeUnits[set.answerUnit].name}</span></div>`,
  ];

  return {
    type: "⏱️ Найти время передачи",
    text: taskText,
    answer: answer,
    answerUnit: set.answerUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Find transmission time (complex)
 * @returns {Object} - Task object
 */
function generateFindTimeComplex() {
  const sets = [
    {
      volume: 128,
      volumeUnit: "KB",
      speed: 32,
      speedUnit: "Kbps",
      answerUnit: "s",
    },
    {
      volume: 256,
      volumeUnit: "KB",
      speed: 64,
      speedUnit: "Kbps",
      answerUnit: "s",
    },
    {
      volume: 512,
      volumeUnit: "KB",
      speed: 128,
      speedUnit: "Kbps",
      answerUnit: "s",
    },
    {
      volume: 1,
      volumeUnit: "MB",
      speed: 256,
      speedUnit: "Kbps",
      answerUnit: "s",
    },
    {
      volume: 2,
      volumeUnit: "MB",
      speed: 512,
      speedUnit: "Kbps",
      answerUnit: "s",
    },
    {
      volume: 5,
      volumeUnit: "MB",
      speed: 1,
      speedUnit: "Mbps",
      answerUnit: "s",
    },
    {
      volume: 10,
      volumeUnit: "MB",
      speed: 2,
      speedUnit: "Mbps",
      answerUnit: "s",
    },
    {
      volume: 60,
      volumeUnit: "MB",
      speed: 1,
      speedUnit: "Mbps",
      answerUnit: "min",
    },
    {
      volume: 120,
      volumeUnit: "MB",
      speed: 2,
      speedUnit: "Mbps",
      answerUnit: "min",
    },
    {
      volume: 30,
      volumeUnit: "MB",
      speed: 512,
      speedUnit: "Kbps",
      answerUnit: "min",
    },
  ];

  const set = randomChoice(sets);
  const bitsTotal = volumeToBits(set.volume, set.volumeUnit);
  const speedBps = speedToBps(set.speed, set.speedUnit);
  const timeSec = bitsTotal / speedBps;
  const answer = roundValue(timeSec / timeUnits[set.answerUnit].factor);

  const taskText = `Файл размером <span class="highlight">${set.volume} ${volumeUnits[set.volumeUnit].name}</span> передаётся со скоростью <span class="highlight">${set.speed} ${speedUnits[set.speedUnit].name}</span>. Определите время передачи в ${timeUnits[set.answerUnit].nameFull}.`;

  const hintSteps = [
    `<div class="hint-step">1. Переведём объём файла в биты:</div>`,
    `<div class="hint-step">   ${set.volume} ${volumeUnits[set.volumeUnit].name} = ${bitsTotal} бит</div>`,
    `<div class="hint-step">2. Переведём скорость в бит/с:</div>`,
    `<div class="hint-step">   ${set.speed} ${speedUnits[set.speedUnit].name} = ${speedBps} бит/с</div>`,
    `<div class="hint-step">3. Вычислим время по формуле <span class="formula">t = I / v</span>:</div>`,
    `<div class="hint-step">   <span class="formula">${bitsTotal} бит ÷ ${speedBps} бит/с = ${timeSec} с</span></div>`,
    `<div class="hint-step">4. ${set.answerUnit === "min" ? "Переведём секунды в минуты:" : "Ответ в " + timeUnits[set.answerUnit].nameFull + ":"}</div>`,
    `<div class="hint-step">   ${set.answerUnit === "min" ? timeSec + " с ÷ 60 = " + answer + " мин" : '<span class="result">Ответ: ' + answer + " " + timeUnits[set.answerUnit].name + "</span>"}</div>`,
    set.answerUnit === "min"
      ? `<div class="hint-step">   <span class="result">Ответ: ${answer} ${timeUnits[set.answerUnit].name}</span></div>`
      : "",
  ].filter(Boolean);

  return {
    type: "⏱️ Найти время передачи",
    text: taskText,
    answer: answer,
    answerUnit: set.answerUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Generate a random task
 * @returns {Object} - Task object with type, text, answer, answerUnit, hintSteps
 */
function generateTask() {
  const generator = randomChoice(taskTypes);
  return generator();
}

// Export for use in pages
if (typeof window !== "undefined") {
  window.VPR7_Task9_Generator = {
    speedUnits,
    volumeUnits,
    timeUnits,
    roundValue,
    randomInt,
    randomChoice,
    speedToBps,
    volumeToBits,
    timeToSeconds,
    getUnitName,
    taskTypes,
    generateFindVolume,
    generateFindVolumeComplex,
    generateFindSpeed,
    generateFindSpeedComplex,
    generateFindTime,
    generateFindTimeComplex,
    generateTask,
  };
}

// Export for ES6 modules if supported
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    speedUnits,
    volumeUnits,
    timeUnits,
    roundValue,
    randomInt,
    randomChoice,
    speedToBps,
    volumeToBits,
    timeToSeconds,
    getUnitName,
    taskTypes,
    generateFindVolume,
    generateFindVolumeComplex,
    generateFindSpeed,
    generateFindSpeedComplex,
    generateFindTime,
    generateFindTimeComplex,
    generateTask,
  };
}
