/**
 * VPR 7 - Task 7: Information Volume Calculation Generator Module
 * Generates tasks for calculating information volume with unit conversions
 */

// Units of measurement
const units = {
  KB: { name: "КБ", nameFull: "килобайт", factor: 1024 },
  MB: { name: "МБ", nameFull: "мегабайт", factor: 1024 * 1024 },
  GB: { name: "ГБ", nameFull: "гигабайт", factor: 1024 * 1024 * 1024 },
  TB: {
    name: "ТБ",
    nameFull: "терабайт",
    factor: 1024 * 1024 * 1024 * 1024,
  },
};

/**
 * Convert value between units
 * @param {number} value - Value to convert
 * @param {string} fromUnit - Source unit (KB, MB, GB, TB)
 * @param {string} toUnit - Target unit (KB, MB, GB, TB)
 * @returns {number} - Converted value
 */
function convert(value, fromUnit, toUnit) {
  const fromFactor = units[fromUnit].factor;
  const toFactor = units[toUnit].factor;
  return (value * fromFactor) / toFactor;
}

/**
 * Round value to reasonable number of decimal places
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
 * Generate random float in range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} decimals - Number of decimal places
 * @returns {number} - Random float
 */
function randomFloat(min, max, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
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
 * Task: How many files fit on a device (with unit conversion in answer)
 * @returns {Object} - Task object
 */
function generateFilesOnDevice() {
  const sets = [
    {
      fileSize: 350,
      fileUnit: "MB",
      deviceSize: 2,
      deviceUnit: "GB",
      deviceName: "Flash-карта",
      answerUnit: "MB",
    },
    {
      fileSize: 700,
      fileUnit: "MB",
      deviceSize: 4,
      deviceUnit: "GB",
      deviceName: "USB-накопитель",
      answerUnit: "MB",
    },
    {
      fileSize: 1.5,
      fileUnit: "GB",
      deviceSize: 8,
      deviceUnit: "GB",
      deviceName: "SD-карта",
      answerUnit: "MB",
    },
    {
      fileSize: 256,
      fileUnit: "MB",
      deviceSize: 4,
      deviceUnit: "GB",
      deviceName: "Flash-карта",
      answerUnit: "MB",
    },
    {
      fileSize: 512,
      fileUnit: "MB",
      deviceSize: 8,
      deviceUnit: "GB",
      deviceName: "внешний диск",
      answerUnit: "MB",
    },
  ];

  const set = randomChoice(sets);

  // Convert to MB for calculation
  const fileSizeMB = convert(set.fileSize, set.fileUnit, "MB");
  const deviceSizeMB = convert(set.deviceSize, set.deviceUnit, "MB");

  // How many files fit
  const filesCount = Math.floor(deviceSizeMB / fileSizeMB);

  // How much space these files take
  const usedSpaceMB = filesCount * fileSizeMB;

  // How much free space remains (in specified units)
  const remainMB = deviceSizeMB - usedSpaceMB;
  const answer = roundValue(convert(remainMB, "MB", set.answerUnit));

  const taskText = `На ${set.deviceName} объёмом <span class="highlight">${set.deviceSize} ${units[set.deviceUnit].name}</span> записывают видеофайлы размером <span class="highlight">${set.fileSize} ${units[set.fileUnit].name}</span> каждый. Сколько <span class="highlight">${units[set.answerUnit].name.toLowerCase()}</span> свободного места останется после записи максимально возможного количества файлов?`;

  const hintSteps = [
    `<div class="hint-step">1. Переведём все значения в одну единицу (МБ):</div>`,
    `<div class="hint-step">   Размер файла: ${set.fileSize} ${units[set.fileUnit].name} = ${roundValue(fileSizeMB)} МБ</div>`,
    `<div class="hint-step">   Размер ${set.deviceName}: ${set.deviceSize} ${units[set.deviceUnit].name} = ${roundValue(deviceSizeMB)} МБ</div>`,
    `<div class="hint-step">2. Найдём, сколько файлов поместится:</div>`,
    `<div class="hint-step">   <span class="formula">${roundValue(deviceSizeMB)} ÷ ${roundValue(fileSizeMB)} = ${roundValue(deviceSizeMB / fileSizeMB)} → ${filesCount} файлов</span></div>`,
    `<div class="hint-step">3. Найдём, сколько места займут ${filesCount} файлов:</div>`,
    `<div class="hint-step">   <span class="formula">${filesCount} × ${roundValue(fileSizeMB)} = ${roundValue(usedSpaceMB)} МБ</span></div>`,
    `<div class="hint-step">4. Найдём свободное место:</div>`,
    `<div class="hint-step">   <span class="formula">${roundValue(deviceSizeMB)} − ${roundValue(usedSpaceMB)} = ${roundValue(remainMB)} МБ</span></div>`,
    `<div class="hint-step">5. Переведём в ${units[set.answerUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${roundValue(remainMB)} МБ = ${answer} ${units[set.answerUnit].name}</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[set.answerUnit].name}</span></div>`,
  ];

  return {
    type: "📂 Файлы на устройстве",
    text: taskText,
    answer: answer,
    answerUnit: set.answerUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Addition of volumes
 * @returns {Object} - Task object
 */
function generateAddition() {
  const scenarios = [
    {
      text: (a, au, b, bu, sum) =>
        `Игра занимает <span class="highlight">${a} ${units[au].name}</span>, а её обновление увеличивает объём игры на <span class="highlight">${b} ${units[bu].name}</span>. Сколько ${units[sum].name.toLowerCase()} будет весить игра после обновления?`,
      context: "игра",
    },
    {
      text: (a, au, b, bu, sum) =>
        `Алексей скачал два фильма: первый весит <span class="highlight">${a} ${units[au].name}</span>, второй — <span class="highlight">${b} ${units[bu].name}</span>. Сколько всего ${units[sum].name.toLowerCase()} занимают оба фильма?`,
      context: "фильмы",
    },
    {
      text: (a, au, b, bu, sum) =>
        `На диске записано <span class="highlight">${a} ${units[au].name}</span> видео и <span class="highlight">${b} ${units[bu].name}</span> фотографий. Какой общий объём в ${units[sum].name.toLowerCase()}?`,
      context: "диск",
    },
  ];

  const scenario = randomChoice(scenarios);
  const unitPairs = [
    {
      a: { size: 25, unit: "GB" },
      b: { size: 5120, unit: "MB" },
      sum: "GB",
    },
    {
      a: { size: 2.5, unit: "GB" },
      b: { size: 2048, unit: "MB" },
      sum: "GB",
    },
    {
      a: { size: 1.5, unit: "GB" },
      b: { size: 512, unit: "MB" },
      sum: "MB",
    },
    {
      a: { size: 3, unit: "GB" },
      b: { size: 1024, unit: "MB" },
      sum: "GB",
    },
    {
      a: { size: 512, unit: "MB" },
      b: { size: 2560, unit: "MB" },
      sum: "MB",
    },
  ];

  const pair = randomChoice(unitPairs);
  const aMB = convert(pair.a.size, pair.a.unit, "MB");
  const bMB = convert(pair.b.size, pair.b.unit, "MB");
  const sumMB = aMB + bMB;
  const answer = roundValue(convert(sumMB, "MB", pair.sum));

  const taskText = scenario.text(
    pair.a.size,
    pair.a.unit,
    pair.b.size,
    pair.b.unit,
    pair.sum,
  );

  const hintSteps = [
    `<div class="hint-step">1. Переведём все значения в ${units[pair.sum].nameFull}:</div>`,
    `<div class="hint-step">   ${pair.a.size} ${units[pair.a.unit].name} = ${roundValue(convert(pair.a.size, pair.a.unit, pair.sum))} ${units[pair.sum].name}</div>`,
    `<div class="hint-step">   ${pair.b.size} ${units[pair.b.unit].name} = ${roundValue(convert(pair.b.size, pair.b.unit, pair.sum))} ${units[pair.sum].name}</div>`,
    `<div class="hint-step">2. Сложим полученные значения:</div>`,
    `<div class="hint-step">   <span class="formula">${roundValue(convert(pair.a.size, pair.a.unit, pair.sum))} + ${roundValue(convert(pair.b.size, pair.b.unit, pair.sum))} = ${answer}</span></div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[pair.sum].name}</span></div>`,
  ];

  return {
    type: "➕ Сложение объёмов",
    text: taskText,
    answer: answer,
    answerUnit: pair.sum,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Subtraction of volumes
 * @returns {Object} - Task object
 */
function generateSubtraction() {
  const scenarios = [
    {
      text: (free, fu, file, fiu, remain, ru) =>
        `На флешке <span class="highlight">${free} ${units[fu].name}</span> свободного места. Пользователь хочет записать файл размером <span class="highlight">${file} ${units[fiu].name}</span>. Сколько ${units[ru].name.toLowerCase()} останется после записи?`,
    },
  ];

  const scenario = randomChoice(scenarios);
  const unitSets = [
    {
      free: { size: 2, unit: "GB" },
      file: { size: 1000, unit: "MB" },
      remain: "MB",
    },
    {
      free: { size: 4, unit: "GB" },
      file: { size: 2560, unit: "MB" },
      remain: "MB",
    },
    {
      free: { size: 8, unit: "GB" },
      file: { size: 1536, unit: "MB" },
      remain: "GB",
    },
    {
      free: { size: 16, unit: "GB" },
      file: { size: 6144, unit: "MB" },
      remain: "GB",
    },
    {
      free: { size: 1, unit: "GB" },
      file: { size: 256, unit: "MB" },
      remain: "MB",
    },
  ];

  const set = randomChoice(unitSets);
  const freeMB = convert(set.free.size, set.free.unit, "MB");
  const fileMB = convert(set.file.size, set.file.unit, "MB");
  const remainMB = freeMB - fileMB;
  const answer = roundValue(convert(remainMB, "MB", set.remain));

  const taskText = scenario.text(
    set.free.size,
    set.free.unit,
    set.file.size,
    set.file.unit,
    set.remain,
    set.remain,
  );

  const hintSteps = [
    `<div class="hint-step">1. Переведём все значения в ${units[set.remain].nameFull}:</div>`,
    `<div class="hint-step">   Свободное место: ${set.free.size} ${units[set.free.unit].name} = ${roundValue(convert(set.free.size, set.free.unit, set.remain))} ${units[set.remain].name}</div>`,
    `<div class="hint-step">   Размер файла: ${set.file.size} ${units[set.file.unit].name} = ${roundValue(convert(set.file.size, set.file.unit, set.remain))} ${units[set.remain].name}</div>`,
    `<div class="hint-step">2. Вычтем размер файла из свободного места:</div>`,
    `<div class="hint-step">   <span class="formula">${roundValue(convert(set.free.size, set.free.unit, set.remain))} − ${roundValue(convert(set.file.size, set.file.unit, set.remain))} = ${answer}</span></div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[set.remain].name}</span></div>`,
  ];

  return {
    type: "➖ Вычитание объёмов",
    text: taskText,
    answer: answer,
    answerUnit: set.remain,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Multiple files of the same size
 * @returns {Object} - Task object
 */
function generateMultiFile() {
  const scenarios = [
    {
      text: (count, item, size, su, total, tu) =>
        `В папке <span class="highlight">${count} ${item}</span>, каждый размером <span class="highlight">${size} ${units[su].name}</span>. Какой общий объём в ${units[tu].name.toLowerCase()}?`,
      items: ["фотографий", "документов", "музыкальных файлов"],
    },
    {
      text: (count, item, size, su, total, tu) =>
        `Пользователь скачал <span class="highlight">${count} ${item}</span> по <span class="highlight">${size} ${units[su].name}</span> каждый. Сколько всего ${units[tu].name.toLowerCase()} занято?`,
      items: ["игр", "фильмов", "видеороликов"],
    },
  ];

  const scenario = randomChoice(scenarios);
  const item = randomChoice(scenario.items);

  const sets = [
    { count: 30, size: 4096, sizeUnit: "KB", totalUnit: "MB" },
    { count: 25, size: 512, sizeUnit: "KB", totalUnit: "MB" },
    { count: 50, size: 2, sizeUnit: "MB", totalUnit: "MB" },
    { count: 20, size: 256, sizeUnit: "MB", totalUnit: "GB" },
    { count: 40, size: 2048, sizeUnit: "KB", totalUnit: "MB" },
  ];

  const set = randomChoice(sets);
  const sizeInTotalUnit = convert(set.size, set.sizeUnit, set.totalUnit);
  const answer = roundValue(set.count * sizeInTotalUnit);

  const taskText = scenario.text(
    set.count,
    item,
    set.size,
    set.sizeUnit,
    answer,
    set.totalUnit,
  );

  const hintSteps = [
    `<div class="hint-step">1. Переведём размер одного файла в ${units[set.totalUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${set.size} ${units[set.sizeUnit].name} = ${roundValue(sizeInTotalUnit)} ${units[set.totalUnit].name}</div>`,
    `<div class="hint-step">2. Умножим на количество файлов:</div>`,
    `<div class="hint-step">   <span class="formula">${set.count} × ${roundValue(sizeInTotalUnit)} = ${answer}</span></div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[set.totalUnit].name}</span></div>`,
  ];

  return {
    type: "✖️ Умножение объёмов",
    text: taskText,
    answer: answer,
    answerUnit: set.totalUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Comparison of volumes
 * @returns {Object} - Task object
 */
function generateComparison() {
  const scenarios = [
    {
      text: (a, au, b, bu, diff, du) =>
        `Виктор скачал два файла: первый занимает <span class="highlight">${a} ${units[au].name}</span>, второй — <span class="highlight">${b} ${units[bu].name}</span>. На сколько ${units[du].name.toLowerCase()} второй файл больше первого?`,
    },
    {
      text: (a, au, b, bu, diff, du) =>
        `Диск C: занимает <span class="highlight">${a} ${units[au].name}</span>, а диск D: — <span class="highlight">${b} ${units[bu].name}</span>. На сколько ${units[du].name.toLowerCase()} диск D: больше диска C:?`,
    },
  ];

  const scenario = randomChoice(scenarios);
  const sets = [
    {
      a: { size: 750, unit: "MB" },
      b: { size: 2.5, unit: "GB" },
      diffUnit: "MB",
    },
    {
      a: { size: 1.5, unit: "GB" },
      b: { size: 3072, unit: "MB" },
      diffUnit: "MB",
    },
    {
      a: { size: 512, unit: "MB" },
      b: { size: 2, unit: "GB" },
      diffUnit: "MB",
    },
    {
      a: { size: 256, unit: "MB" },
      b: { size: 1, unit: "GB" },
      diffUnit: "MB",
    },
  ];

  const set = randomChoice(sets);
  const aInDiff = convert(set.a.size, set.a.unit, set.diffUnit);
  const bInDiff = convert(set.b.size, set.b.unit, set.diffUnit);
  const answer = roundValue(Math.abs(bInDiff - aInDiff));

  const taskText = scenario.text(
    set.a.size,
    set.a.unit,
    set.b.size,
    set.b.unit,
    answer,
    set.diffUnit,
  );

  const hintSteps = [
    `<div class="hint-step">1. Переведём все значения в ${units[set.diffUnit].nameFull}:</div>`,
    `<div class="hint-step">   Первый файл: ${set.a.size} ${units[set.a.unit].name} = ${roundValue(aInDiff)} ${units[set.diffUnit].name}</div>`,
    `<div class="hint-step">   Второй файл: ${set.b.size} ${units[set.b.unit].name} = ${roundValue(bInDiff)} ${units[set.diffUnit].name}</div>`,
    `<div class="hint-step">2. Найдём разницу:</div>`,
    `<div class="hint-step">   <span class="formula">${roundValue(bInDiff)} − ${roundValue(aInDiff)} = ${answer}</span></div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[set.diffUnit].name}</span></div>`,
  ];

  return {
    type: "⚖️ Сравнение объёмов",
    text: taskText,
    answer: answer,
    answerUnit: set.diffUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Time-based calculation
 * @returns {Object} - Task object
 */
function generateTimeBased() {
  const scenarios = [
    {
      text: (perDay, days, total, tu) =>
        `За сутки камера записывает <span class="highlight">${perDay} ${units.GB.name}</span> видео. Сколько ${units[tu].name.toLowerCase()} запишется за <span class="highlight">${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"}</span>?`,
    },
    {
      text: (perDay, days, total, tu) =>
        `Сервер создаёт резервную копию размером <span class="highlight">${perDay} ${units.GB.name}</span> каждый день. Сколько ${units[tu].name.toLowerCase()} займут копии за <span class="highlight">${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"}</span>?`,
    },
  ];

  const scenario = randomChoice(scenarios);
  const perDay = randomChoice([2, 3, 4, 5]);
  const days = randomChoice([2, 3, 4, 5, 7]);
  // Answer always in MB - requires conversion from GB
  const totalUnit = "MB";
  const answer = roundValue(convert(perDay * days, "GB", totalUnit));

  const taskText = scenario.text(perDay, days, answer, totalUnit);

  const hintSteps = [
    `<div class="hint-step">1. Найдём общий объём за ${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"}:</div>`,
    `<div class="hint-step">   <span class="formula">${perDay} ${units.GB.name} × ${days} = ${perDay * days} ${units.GB.name}</span></div>`,
    `<div class="hint-step">2. Переведём в ${units[totalUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${perDay * days} ${units.GB.name} = ${answer} ${units[totalUnit].name}</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[totalUnit].name}</span></div>`,
  ];

  return {
    type: "📅 Задача на время",
    text: taskText,
    answer: answer,
    answerUnit: totalUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Complex task with multiple operations
 * @returns {Object} - Task object
 */
function generateComplex() {
  const scenarios = [
    {
      text: (initial, iu, deleted, du, added, au, capacity, cu, remain, ru) =>
        `На диске записано <span class="highlight">${initial} ${units[iu].name}</span> данных. Пользователь удалил <span class="highlight">${deleted} ${units[du].name}</span>, а затем добавил новый файл размером <span class="highlight">${added} ${units[au].name}</span>. Сколько ${units[ru].name.toLowerCase()} свободного места осталось на диске, если его ёмкость <span class="highlight">${capacity} ${units[cu].name}</span>?`,
    },
  ];

  const scenario = scenarios[0];
  const sets = [
    {
      initial: { size: 12, unit: "GB" },
      deleted: { size: 2048, unit: "MB" },
      added: { size: 512, unit: "MB" },
      capacity: { size: 16, unit: "GB" },
      remainUnit: "GB",
    },
    {
      initial: { size: 8, unit: "GB" },
      deleted: { size: 1024, unit: "MB" },
      added: { size: 2, unit: "GB" },
      capacity: { size: 16, unit: "GB" },
      remainUnit: "GB",
    },
    {
      initial: { size: 20, unit: "GB" },
      deleted: { size: 5120, unit: "MB" },
      added: { size: 1.5, unit: "GB" },
      capacity: { size: 32, unit: "GB" },
      remainUnit: "GB",
    },
  ];

  const set = randomChoice(sets);
  const initialGB = convert(set.initial.size, set.initial.unit, "GB");
  const deletedGB = convert(set.deleted.size, set.deleted.unit, "GB");
  const addedGB = convert(set.added.size, set.added.unit, "GB");
  const capacityGB = convert(set.capacity.size, set.capacity.unit, "GB");

  const usedAfterDelete = initialGB - deletedGB;
  const usedFinal = usedAfterDelete + addedGB;
  const remainGB = capacityGB - usedFinal;
  const answer = roundValue(convert(remainGB, "GB", set.remainUnit));

  const taskText = scenario.text(
    set.initial.size,
    set.initial.unit,
    set.deleted.size,
    set.deleted.unit,
    set.added.size,
    set.added.unit,
    set.capacity.size,
    set.capacity.unit,
    answer,
    set.remainUnit,
  );

  const hintSteps = [
    `<div class="hint-step">1. Переведём все значения в гигабайты:</div>`,
    `<div class="hint-step">   Записано: ${set.initial.size} ${units[set.initial.unit].name} = ${initialGB} ГБ</div>`,
    `<div class="hint-step">   Удалено: ${set.deleted.size} ${units[set.deleted.unit].name} = ${deletedGB} ГБ</div>`,
    `<div class="hint-step">   Добавлено: ${set.added.size} ${units[set.added.unit].name} = ${addedGB} ГБ</div>`,
    `<div class="hint-step">   Ёмкость диска: ${set.capacity.size} ${units[set.capacity.unit].name} = ${capacityGB} ГБ</div>`,
    `<div class="hint-step">2. Найдём объём после удаления:</div>`,
    `<div class="hint-step">   <span class="formula">${initialGB} − ${deletedGB} = ${usedAfterDelete} ГБ</span></div>`,
    `<div class="hint-step">3. Найдём объём после добавления:</div>`,
    `<div class="hint-step">   <span class="formula">${usedAfterDelete} + ${addedGB} = ${usedFinal} ГБ</span></div>`,
    `<div class="hint-step">4. Найдём свободное место:</div>`,
    `<div class="hint-step">   <span class="formula">${capacityGB} − ${usedFinal} = ${remainGB} ГБ</span></div>`,
    `<div class="hint-step">5. Переведём в ${units[set.remainUnit].nameFull}:</div>`,
    `<div class="hint-step">   ${remainGB} ГБ = ${answer} ${units[set.remainUnit].name}</div>`,
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[set.remainUnit].name}</span></div>`,
  ];

  return {
    type: "🧮 Сложная задача",
    text: taskText,
    answer: answer,
    answerUnit: set.remainUnit,
    hintSteps: hintSteps,
  };
}

/**
 * Task: Cloud storage
 * @returns {Object} - Task object
 */
function generateCloudStorage() {
  const sets = [
    {
      items: [
        { count: 50, size: 6, unit: "MB" },
        { count: 30, size: 4096, unit: "KB" },
      ],
      totalUnit: "MB",
    },
    {
      items: [
        { count: 100, size: 2, unit: "MB" },
        { count: 25, size: 512, unit: "KB" },
      ],
      totalUnit: "MB",
    },
    {
      items: [
        { count: 512, size: 2, unit: "MB" },
        { count: 10, size: 1, unit: "GB" },
      ],
      totalUnit: "GB",
    },
  ];

  const set = randomChoice(sets);
  let totalMB = 0;

  const itemDescriptions = set.items.map((item) => {
    const itemMB = item.count * convert(item.size, item.unit, "MB");
    totalMB += itemMB;
    return `${item.count} треков по ${item.size} ${units[item.unit].name}`;
  });

  const answer = roundValue(convert(totalMB, "MB", set.totalUnit));

  const taskText = `В облачном хранилище лежат:<br>1) <span class="highlight">${itemDescriptions[0]}</span><br>2) <span class="highlight">${itemDescriptions[1]}</span><br><br>Какой общий объём в ${units[set.totalUnit].name.toLowerCase()}?`;

  const hintSteps = [
    `<div class="hint-step">1. Вычислим объём каждой группы файлов:</div>`,
  ];

  set.items.forEach((item, idx) => {
    const itemTotalMB = item.count * convert(item.size, item.unit, "MB");
    hintSteps.push(
      `<div class="hint-step">   Группа ${idx + 1}: ${item.count} × ${convert(item.size, item.unit, "MB")} МБ = ${roundValue(itemTotalMB)} МБ</div>`,
    );
  });

  hintSteps.push(`<div class="hint-step">2. Сложим объёмы всех групп:</div>`);
  hintSteps.push(
    `<div class="hint-step">   <span class="formula">${set.items.map((i) => roundValue(i.count * convert(i.size, i.unit, "MB"))).join(" + ")} = ${roundValue(totalMB)} МБ</span></div>`,
  );

  if (set.totalUnit !== "MB") {
    hintSteps.push(
      `<div class="hint-step">3. Переведём в ${units[set.totalUnit].nameFull}:</div>`,
      `<div class="hint-step">   ${roundValue(totalMB)} МБ = ${answer} ${units[set.totalUnit].name}</div>`,
    );
  }

  hintSteps.push(
    `<div class="hint-step">   <span class="result">Ответ: ${answer} ${units[set.totalUnit].name}</span></div>`,
  );

  return {
    type: "☁️ Облачное хранилище",
    text: taskText,
    answer: answer,
    answerUnit: set.totalUnit,
    hintSteps: hintSteps,
  };
}

// Task types array
const taskTypes = [
  generateFilesOnDevice,
  generateAddition,
  generateSubtraction,
  generateMultiFile,
  generateComparison,
  generateTimeBased,
  generateComplex,
  generateCloudStorage,
];

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
  window.VPR7_Task7_Generator = {
    units,
    convert,
    roundValue,
    randomInt,
    randomFloat,
    randomChoice,
    taskTypes,
    generateFilesOnDevice,
    generateAddition,
    generateSubtraction,
    generateMultiFile,
    generateComparison,
    generateTimeBased,
    generateComplex,
    generateCloudStorage,
    generateTask,
  };
}

// Export for ES6 modules if supported
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    units,
    convert,
    roundValue,
    randomInt,
    randomFloat,
    randomChoice,
    taskTypes,
    generateFilesOnDevice,
    generateAddition,
    generateSubtraction,
    generateMultiFile,
    generateComparison,
    generateTimeBased,
    generateComplex,
    generateCloudStorage,
    generateTask,
  };
}
