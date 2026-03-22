/**
 * VPR 7 - Task 12: Text Formatting Generator Module
 * Generates tasks for determining text formatting in a Word-like interface
 */

// Значения отступов в сантиметрах (должны соответствовать CSS)
const indentValuesCm = {
  firstLineIndent: 1.25,
  hangingIndent: 2, // при выступе margin-left определяет позицию
  leftIndent: 2,
  rightIndent: 1.5,
};

// Все возможные элементы форматирования
const formattingTypes = {
  firstLineIndent: {
    name: "Отступ первой строки",
    hint: "Первая строка абзаца сдвинута вправо относительно остальных строк. Видно по треугольнику на линейке сверху слева.",
  },
  hangingIndent: {
    name: "Выступ первой строки",
    hint: "Первая строка абзаца выступает влево относительно остальных строк. Остальные строки сдвинуты вправо.",
  },
  leftIndent: {
    name: "Отступ слева",
    hint: "Весь абзац сдвинут вправо от левого поля. На линейке видно, что левая граница текста не на нуле.",
  },
  rightIndent: {
    name: "Отступ справа",
    hint: "Весь абзац сдвинут влево от правого поля. На линейке видно, что правая граница текста не на краю.",
  },
  alignLeft: {
    name: "Выравнивание по левому краю",
    hint: "Текст выровнен по левому краю, правый край неровный. Строки заканчиваются на разных позициях.",
  },
  alignRight: {
    name: "Выравнивание по правому краю",
    hint: "Текст выровнен по правому краю, левый край неровный.",
  },
  alignCenter: {
    name: "Выравнивание по центру",
    hint: "Каждая строка центрирована относительно страницы.",
  },
  alignJustify: {
    name: "Выравнивание по ширине",
    hint: "Текст выровнен по обоим краям. Пробелы между словами растягиваются, чтобы заполнить строку.",
  },
};

// Тексты для заданий
const paragraphs = [
  {
    text: "Информатика — это наука о методах и процессах сбора, хранения, обработки, передачи, анализа и оценки информации с применением компьютерных технологий. Она изучает способы представления информации, алгоритмы её обработки и программные средства для работы с данными.",
    correctFormatting: ["firstLineIndent", "alignJustify"],
  },
  {
    text: "АНАЛИТИЧЕСКАЯ СПРАВКА\nпо результатам проверки выполнения\nпрактических работ за 2025-2026 учебный год",
    correctFormatting: ["alignCenter"],
  },
  {
    text: "Директор школы: Петров А.Б.\nГлавный бухгалтер: Сидорова В.Г.\nОтветственный за выполнение: Иванов Д.Е.",
    correctFormatting: ["alignRight"],
  },
  {
    text: "Для подготовки к экзамену необходимо выполнить следующие действия: изучить теоретический материал по всем разделам курса, решить практические задания разных типов, повторить основные понятия и определения, пройти тестирование в режиме онлайн, проанализировать допущенные ошибки.",
    correctFormatting: ["alignLeft"],
  },
  {
    text: "В современном мире информационные технологии играют важную роль. Они проникают во все сферы человеческой деятельности и изменяют привычные способы работы с информацией, коммуникации и обучения.",
    correctFormatting: ["firstLineIndent", "leftIndent", "alignJustify"],
  },
  {
    text: "1. Первый пункт списка содержит важную информацию о структуре документа и его основных элементах, которые необходимо учитывать при оформлении.\n2. Второй пункт описывает требования к форматированию текста.",
    correctFormatting: ["hangingIndent", "alignLeft"],
  },
  {
    text: "Компьютер — устройство для автоматической обработки информации. Современные компьютеры могут выполнять миллиарды операций в секунду, что делает их незаменимыми инструментами в науке, образовании и бизнесе.",
    correctFormatting: [
      "firstLineIndent",
      "leftIndent",
      "rightIndent",
      "alignJustify",
    ],
  },
  {
    text: "г. Москва\n15 марта 2026 года\nИсполнитель: специалист отдела Иванов И.И.",
    correctFormatting: ["alignRight", "rightIndent"],
  },
  {
    text: "ОТЧЁТ\nО ВЫПОЛНЕНИИ ПЛАНА РАБОТ\nза первый квартал 2026 года",
    correctFormatting: ["alignCenter"],
  },
  {
    text: "Программирование — процесс создания компьютерных программ с помощью языков программирования. Программисты разрабатывают алгоритмы и реализуют их в виде кода, который компьютер может выполнять для решения различных задач.",
    correctFormatting: ["firstLineIndent", "alignJustify", "rightIndent"],
  },
  {
    text: "Глава 1. Введение в информатику. В данной главе рассматриваются основные понятия информатики как науки, её место в системе естественных и технических наук, а также роль информационных технологий в современном обществе.",
    correctFormatting: ["hangingIndent", "alignJustify"],
  },
  {
    text: "Приложение А. Дополнительные материалы.\nВ данном приложении представлены справочные таблицы, схемы и примеры решения типовых задач, которые помогут в освоении курса информатики и подготовке к проверочным работам.",
    correctFormatting: ["alignLeft", "leftIndent"],
  },
];

/**
 * Select random element from array
 * @param {Array} arr - Array to select from
 * @returns {*} - Random element
 */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate a random task for text formatting determination
 * @returns {Object} - Task object with text, correctFormatting, formattingTypes, indentValuesCm
 */
function generateTask() {
  // Выбираем случайный абзац
  const taskData = randomChoice(paragraphs);

  return {
    text: taskData.text,
    correctFormatting: new Set(taskData.correctFormatting),
    formattingTypes: formattingTypes,
    indentValuesCm: indentValuesCm,
  };
}

/**
 * Calculate ruler positions based on document area width
 * @param {number} documentWidth - Width of the document area
 * @returns {Object} - Object with position values in pixels
 */
function calculateRulerPositions(documentWidth) {
  // Область текста = ширина документа минус padding (50px слева + 50px справа = 100px)
  const textWidth = documentWidth - 100;
  const pxPerCm = textWidth / 15; // шкала от 0 до 15 см

  return {
    firstLineIndent: indentValuesCm.firstLineIndent * pxPerCm + "px",
    hangingIndent: indentValuesCm.hangingIndent * pxPerCm + "px",
    leftIndent: indentValuesCm.leftIndent * pxPerCm + "px",
    rightIndent: indentValuesCm.rightIndent * pxPerCm + "px",
    pxPerCm: pxPerCm,
  };
}

/**
 * Get CSS class name for formatting type
 * @param {string} formatType - Format type key
 * @returns {string} - CSS class name
 */
function getFormatClass(formatType) {
  const classMap = {
    firstLineIndent: "para-first-line-indent",
    hangingIndent: "para-hanging-indent",
    leftIndent: "para-indent-left",
    rightIndent: "para-indent-right",
    alignLeft: "para-align-left",
    alignRight: "para-align-right",
    alignCenter: "para-align-center",
    alignJustify: "para-align-justify",
  };
  return classMap[formatType] || "";
}

/**
 * Generate hint content for the task
 * @param {Object} currentTask - Current task object
 * @param {boolean} answered - Whether the task has been answered
 * @returns {string} - HTML content for hint box
 */
function generateHintContent(currentTask, answered) {
  let html = "";

  if (answered) {
    // После проверки показываем правильный ответ с объяснением
    html += '<div class="hint-item"><strong>✓ Правильный ответ:</strong></div>';

    currentTask.correctFormatting.forEach((key) => {
      const format = formattingTypes[key];
      html += `<div class="hint-item"><strong>${format.name}:</strong> ${format.hint}</div>`;
    });
  } else {
    // До проверки — подсказки с объяснением маркеров
    html +=
      '<div class="hint-item"><strong>📐 Маркеры на линейке в Word:</strong></div>';
    html +=
      '<div class="hint-item"><strong>▼ Треугольник вниз (сверху слева):</strong> — отступ первой строки. Первая строка сдвинута вправо.</div>';
    html +=
      '<div class="hint-item"><strong>▲ Треугольник вверх (сверху слева):</strong> — выступ первой строки. Первая строка выступает влево, остальные сдвинуты вправо.</div>';
    html +=
      '<div class="hint-item"><strong>▼ Треугольник вниз (снизу слева):</strong> — отступ слева. Весь абзац сдвинут вправо.</div>';
    html +=
      '<div class="hint-item"><strong>▼ Треугольник вниз (справа):</strong> — отступ справа. Весь абзац сдвинут влево.</div>';
    html +=
      '<div class="hint-item" style="margin-top: 12px;"><strong>🔍 Выравнивание:</strong> левый край ровный → выравнивание по левому краю; правый край ровный → по правому; оба края ровные → по ширине; строки по центру → по центру.</div>';
  }

  return html;
}

/**
 * Check user's answer against correct formatting
 * @param {Set} selectedOptions - Set of selected option keys
 * @param {Set} correctFormatting - Set of correct formatting keys
 * @returns {Object} - Object with correct, incorrect, missed counts and success flags
 */
function checkAnswer(selectedOptions, correctFormatting) {
  let correct = 0;
  let incorrect = 0;
  let missed = 0;

  // Check all formatting types
  Object.keys(formattingTypes).forEach((key) => {
    const isSelected = selectedOptions.has(key);
    const shouldBeSelected = correctFormatting.has(key);

    if (isSelected && shouldBeSelected) {
      correct++;
    } else if (isSelected && !shouldBeSelected) {
      incorrect++;
    } else if (!isSelected && shouldBeSelected) {
      missed++;
    }
  });

  const isPerfect = incorrect === 0 && missed === 0;
  const isAcceptable =
    incorrect <= 1 && missed <= 1 && correct >= correctFormatting.size - 1;

  return {
    correct,
    incorrect,
    missed,
    isPerfect,
    isAcceptable,
  };
}

/**
 * Get correct answer list as string
 * @param {Set} correctFormatting - Set of correct formatting keys
 * @returns {string} - Comma-separated list of correct formatting names
 */
function getCorrectAnswerList(correctFormatting) {
  return Array.from(correctFormatting)
    .map((key) => formattingTypes[key].name)
    .join(", ");
}

// Export for use in pages
if (typeof window !== "undefined") {
  window.VPR7_Task12_Generator = {
    indentValuesCm,
    formattingTypes,
    paragraphs,
    randomChoice,
    generateTask,
    calculateRulerPositions,
    getFormatClass,
    generateHintContent,
    checkAnswer,
    getCorrectAnswerList,
  };
}

// Export for ES6 modules if supported
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    indentValuesCm,
    formattingTypes,
    paragraphs,
    randomChoice,
    generateTask,
    calculateRulerPositions,
    getFormatClass,
    generateHintContent,
    checkAnswer,
    getCorrectAnswerList,
  };
}
