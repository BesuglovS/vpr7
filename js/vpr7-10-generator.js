/**
 * VPR 7 - Task 10: Information Volume in Sentence Generator Module
 * Generates tasks for calculating information volume of text sentences
 */

(function () {
  // Кодировки Unicode
  const encodings = [
    { bits: 8, name: "8 битами" },
    { bits: 16, name: "16 битами" },
    { bits: 24, name: "24 битами" },
    { bits: 32, name: "32 битами" },
  ];

  // Предложения для задач
  const sentences = [
    "Молчание — сила.",
    "Простота — вершина сложности.",
    "Знание — сила.",
    "Время — деньги.",
    "Практика — путь к успеху.",
    "Терпение — ключ к мудрости.",
    "Опыт — лучший учитель.",
    "Правда — в деле.",
    "Учение — свет.",
    "Дисциплина — основа успеха.",
    "Мудрость — в простоте.",
    "Действие — лучше слов.",
    "Жизнь — это движение.",
    "Успех — это труд.",
    "Вера — это сила.",
    "Надежда — вечна.",
    "Любовь — это жизнь.",
    "Дружба — это богатство.",
    "Честь — превыше всего.",
    "Правда — глаза колет.",
    "Добро — всегда возвращается.",
    "Счастье — в простоте.",
    "Мир — в душе.",
    "Семья — это опора.",
    "Радость — в мелочах.",
    "Солнце — светит всем.",
    "Мечта — это начало.",
    "Цель — это путь.",
    "Победа — за нами.",
    "Улыбка — это здоровье.",
  ];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function countCharacters(str) {
    return str.length;
  }

  function generateTask() {
    // Выбираем случайную кодировку
    const encoding = randomChoice(encodings);

    // Выбираем случайное предложение
    const sentence = randomChoice(sentences);

    // Подсчитываем количество символов
    const charCount = countCharacters(sentence);

    // Вычисляем информационный объём
    const bitsTotal = charCount * encoding.bits;
    const bytesTotal = bitsTotal / 8;

    // Формируем текст задачи
    const taskText = `В одной из кодировок Unicode каждый символ кодируется <span class="highlight">${encoding.name}</span>. Определите информационный объём следующего предложения в байтах.<br><br><span class="sentence">${sentence}</span>`;

    // Формируем подсказку
    const hintSteps = [
      `<div class="hint-step">1. Посчитаем количество символов в предложении:</div>`,
      `<div class="hint-step">   «${sentence}»</div>`,
      `<div class="hint-step">   Считаем все символы: буквы, пробелы, знаки препинания и тире.</div>`,
      `<div class="hint-step">   <span class="char-count">K = ${charCount} символов</span></div>`,
      `<div class="hint-step">2. Вычислим информационный объём в битах:</div>`,
      `<div class="hint-step">   <span class="formula">I = K × i = ${charCount} × ${encoding.bits} = ${bitsTotal} бит</span></div>`,
      `<div class="hint-step">3. Переведём биты в байты:</div>`,
      `<div class="hint-step">   <span class="formula">${bitsTotal} бит ÷ 8 = ${bytesTotal} байт</span></div>`,
      `<div class="hint-step">   <span class="result">Ответ: ${bytesTotal} байт</span></div>`,
    ];

    return {
      type: "📊 Объём информации в предложении",
      text: taskText,
      answer: bytesTotal,
      encoding: encoding,
      sentence: sentence,
      charCount: charCount,
      bitsTotal: bitsTotal,
      hintSteps: hintSteps,
    };
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task10_Generator = {
      encodings,
      sentences,
      randomInt,
      randomChoice,
      countCharacters,
      generateTask,
    };
  }
})();
