/**
 * VPR 7 - Task 7: Information Volume Calculation Generator Module
 * Generates tasks for calculating information volume with unit conversions
 */

(function () {
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

  function convert(value, fromUnit, toUnit) {
    const fromFactor = units[fromUnit].factor;
    const toFactor = units[toUnit].factor;
    return (value * fromFactor) / toFactor;
  }

  function roundValue(val) {
    if (Number.isInteger(val)) return val;
    return Math.round(val * 1000) / 1000;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

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
    const fileSizeMB = convert(set.fileSize, set.fileUnit, "MB");
    const deviceSizeMB = convert(set.deviceSize, set.deviceUnit, "MB");
    const filesCount = Math.floor(deviceSizeMB / fileSizeMB);
    const usedSpaceMB = filesCount * fileSizeMB;
    const remainMB = deviceSizeMB - usedSpaceMB;
    const answer = roundValue(convert(remainMB, "MB", set.answerUnit));

    const taskText = `На ${set.deviceName} объёмом <span class="highlight">${set.deviceSize} ${units[set.deviceUnit].name}</span> записывают видеофайлы размером <span class="highlight">${set.fileSize} ${units[set.fileUnit].name}</span> каждый. Сколько <span class="highlight">${units[set.answerUnit].name.toLowerCase()}</span> свободного места останется после записи максимально возможного количества файлов?`;

    return {
      type: "📂 Файлы на устройстве",
      text: taskText,
      answer: answer,
      answerUnit: set.answerUnit,
    };
  }

  function generateAddition() {
    const unitPairs = [
      { a: { size: 25, unit: "GB" }, b: { size: 5120, unit: "MB" }, sum: "GB" },
      {
        a: { size: 2.5, unit: "GB" },
        b: { size: 2048, unit: "MB" },
        sum: "GB",
      },
      { a: { size: 1.5, unit: "GB" }, b: { size: 512, unit: "MB" }, sum: "MB" },
      { a: { size: 3, unit: "GB" }, b: { size: 1024, unit: "MB" }, sum: "GB" },
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

    const taskText = `Игра занимает <span class="highlight">${pair.a.size} ${units[pair.a.unit].name}</span>, а её обновление увеличивает объём игры на <span class="highlight">${pair.b.size} ${units[pair.b.unit].name}</span>. Сколько ${units[pair.sum].name.toLowerCase()} будет весить игра после обновления?`;

    return {
      type: "➕ Сложение объёмов",
      text: taskText,
      answer: answer,
      answerUnit: pair.sum,
    };
  }

  function generateSubtraction() {
    const sets = [
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
        free: { size: 1, unit: "GB" },
        file: { size: 256, unit: "MB" },
        remain: "MB",
      },
    ];

    const set = randomChoice(sets);
    const freeMB = convert(set.free.size, set.free.unit, "MB");
    const fileMB = convert(set.file.size, set.file.unit, "MB");
    const remainMB = freeMB - fileMB;
    const answer = roundValue(convert(remainMB, "MB", set.remain));

    const taskText = `На флешке <span class="highlight">${set.free.size} ${units[set.free.unit].name}</span> свободного места. Пользователь хочет записать файл размером <span class="highlight">${set.file.size} ${units[set.file.unit].name}</span>. Сколько ${units[set.remain].name.toLowerCase()} останется после записи?`;

    return {
      type: "➖ Вычитание объёмов",
      text: taskText,
      answer: answer,
      answerUnit: set.remain,
    };
  }

  function generateMultiFile() {
    const sets = [
      { count: 30, size: 4096, sizeUnit: "KB", totalUnit: "MB" },
      { count: 25, size: 512, sizeUnit: "KB", totalUnit: "MB" },
      { count: 50, size: 2, sizeUnit: "MB", totalUnit: "MB" },
      { count: 20, size: 256, sizeUnit: "MB", totalUnit: "GB" },
    ];

    const set = randomChoice(sets);
    const sizeInTotalUnit = convert(set.size, set.sizeUnit, set.totalUnit);
    const answer = roundValue(set.count * sizeInTotalUnit);

    const taskText = `В папке <span class="highlight">${set.count} фотографий</span>, каждая размером <span class="highlight">${set.size} ${units[set.sizeUnit].name}</span>. Какой общий объём в ${units[set.totalUnit].name.toLowerCase()}?`;

    return {
      type: "✖️ Умножение объёмов",
      text: taskText,
      answer: answer,
      answerUnit: set.totalUnit,
    };
  }

  function generateComparison() {
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
    ];

    const set = randomChoice(sets);
    const aInDiff = convert(set.a.size, set.a.unit, set.diffUnit);
    const bInDiff = convert(set.b.size, set.b.unit, set.diffUnit);
    const answer = roundValue(Math.abs(bInDiff - aInDiff));

    const taskText = `Виктор скачал два файла: первый занимает <span class="highlight">${set.a.size} ${units[set.a.unit].name}</span>, второй — <span class="highlight">${set.b.size} ${units[set.b.unit].name}</span>. На сколько ${units[set.diffUnit].name.toLowerCase()} второй файл больше первого?`;

    return {
      type: "⚖️ Сравнение объёмов",
      text: taskText,
      answer: answer,
      answerUnit: set.diffUnit,
    };
  }

  // Task types array (local)
  const taskGenerators = [
    generateFilesOnDevice,
    generateAddition,
    generateSubtraction,
    generateMultiFile,
    generateComparison,
  ];

  function generateTask() {
    const generator = randomChoice(taskGenerators);
    return generator();
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task7_Generator = {
      units,
      convert,
      roundValue,
      randomInt,
      randomChoice,
      generateFilesOnDevice,
      generateAddition,
      generateSubtraction,
      generateMultiFile,
      generateComparison,
      generateTask,
    };
  }
})();
