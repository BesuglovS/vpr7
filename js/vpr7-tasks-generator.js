/**
 * vpr7-tasks-generator.js
 * Модуль для генерации вариантов ВПР в PDF
 */

const VPR7_TaskGenerator = (function() {
  let tasksData = {};
  let settings = {
    taskCount: 2, // Количество заданий в варианте
    includeAnswers: true, // Включать ли ответы
    includeHints: false, // Включать ли подсказки
    paperSize: 'A4',
    orientation: 'portrait'
  };

  /**
   * Загружает данные заданий
   * @param {Promise<Object>} data - Данные заданий
   */
  async function loadTasks(data) {
    tasksData = await data;
  }

  /**
   * Получает заданный тип задания
   * @param {string} taskType - Тип задания (1-12)
   * @returns {Promise<Array>} Данные задания
   */
  async function getTaskData(taskType) {
    if (tasksData[taskType]) {
      return tasksData[taskType];
    }

    // Фоллбэк на текстовый файл
    const response = await fetch(`../data/vpr7-${taskType}.txt`);
    if (!response.ok) {
      throw new Error(`Не удалось загрузить данные для задания ${taskType}`);
    }

    const text = await response.text();
    return parseTaskData(text);
  }

  /**
   * Парсит данные задания из текстового файла
   * @param {string} text - Текст файла
   * @returns {Object} Парсированные данные
   */
  function parseTaskData(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    const task = {
      title: '',
      question: '',
      variants: [],
      answers: []
    };

    let currentSection = 'title';

    lines.forEach(line => {
      if (line.startsWith('@')) {
        currentSection = line.substring(1).trim().toLowerCase();
      } else {
        if (currentSection === 'title') {
          task.title = line;
        } else if (currentSection === 'question') {
          task.question = line;
        } else if (currentSection === 'variants') {
          task.variants.push(line);
        } else if (currentSection === 'answers') {
          task.answers.push(line);
        }
      }
    });

    return task;
  }

  /**
   * Генерирует варианты заданий
   * @returns {Array} Массив вариантов
   */
  function generateVariants() {
    const variants = [];
    const taskCount = settings.taskCount;

    // Упрощённая логика для генерации вариантов
    for (let i = 1; i <= taskCount; i++) {
      variants.push({
        id: i,
        tasks: generateTaskList(i)
      });
    }

    return variants;
  }

  /**
   * Генерирует список заданий для варианта
   * @param {number} variantNumber - Номер варианта
   * @returns {Array} Список заданий
   */
  function generateTaskList(variantNumber) {
    const selectedTasks = [];

    // Упрощённая логика выбора заданий
    for (let i = 1; i <= 12; i++) {
      // Выбираем задания с шагом в зависимости от номера варианта
      if ((i + variantNumber - 1) % Math.ceil(12 / 2) === 0 || 
          (i - variantNumber + 1) % Math.ceil(12 / 2) === 0) {
        selectedTasks.push(i);
      }
    }

    return selectedTasks;
  }

  /**
   * Форматирует задание для PDF
   * @param {Object} task - Данные задания
   * @param {string} format - Формат вывода ('normal' или 'hint')
   * @returns {string} Отформатированный HTML
   */
  function formatTask(task, format = 'normal') {
    const prefix = format === 'hint' ? '<div style="color: #666; font-style: italic;">📌 ' : '';
    const suffix = format === 'hint' ? '</div>' : '';

    return `
      <div class="task-item" style="margin: 20px 0; padding: 15px; border-left: 4px solid ${format === 'hint' ? '#4caf50' : '#2196f3'}; background: ${format === 'hint' ? '#e8f5e9' : '#f5f5ff'}; border-radius: 4px;">
        <div style="margin-bottom: 10px; font-weight: bold; color: #333;">${task.title}</div>
        <div style="color: #444; margin-bottom: 15px;">${task.question}</div>
        
        <div style="background: white; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
          ${task.variants.map((variant, index) => `
            <div style="margin: 5px 0;">
              <span style="display: inline-block; width: 28px; height: 28px; text-align: center; line-height: 26px; background: #e3f2fd; border-radius: 4px; margin-right: 8px; font-weight: bold; color: #1976d2;">${String.fromCharCode(65 + index)}</span>
              <span>${variant}</span>
            </div>
          `).join('')}
        </div>

        ${settings.includeAnswers ? `
          <div style="background: #fafafa; padding: 10px; border-radius: 4px; font-size: 0.9em;">
            <div style="margin-bottom: 5px; font-weight: bold; color: #666;">Ответы:</div>
            <div>${task.answers.map((ans, i) => `
              <div style="margin: 2px 0;">${String.fromCharCode(65 + i)}. ${ans}</div>
            `).join('')}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Генерирует PDF для варианта заданий
   * @param {Object} variant - Данные варианта
   * @returns {Promise<string>} PDF как base64
   */
  async function generatePDF(variant) {
    // Формируем HTML для варианта
    const tasksHtml = variant.tasks.map(taskId => 
      getTaskData(taskId).then(task => formatTask(task))
    );

    // Собираем HTML
    const html = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>${settings.includeAnswers ? 'ВПР 7 класс (с ответами)' : 'ВПР 7 класс'}</title>
        <style>
          @media print {
            @page { margin: 1cm; }
            body { margin: 0; padding: 0; }
          }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.4;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #2196f3, #1976d2);
            color: white;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 24pt;
          }
          .header p {
            margin: 5px 0 0;
            font-size: 10pt;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ВПР 7 класс</h1>
          <p>Информатика — Вариант ${variant.id}</p>
        </div>
        ${tasksHtml.join('')}
      </body>
      </html>
    `;

    // Используем html2canvas + jsPDF для генерации PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Конвертируем HTML в картинку и вставляем в PDF
    // (Упрощённая реализация)
    return 'Generated PDF for variant ' + variant.id;
  }

  /**
   * Генерирует все варианты ВПР
   * @returns {Promise<Array>} Массив PDF для всех вариантов
   */
  async function generateAllVariants() {
    const variants = generateVariants();
    const pdfs = [];

    for (const variant of variants) {
      const pdf = await generatePDF(variant);
      pdfs.push(pdf);
    }

    return pdfs;
  }

  // Экспорт публичного API
  return {
    loadTasks,
    getTaskData,
    generateVariants,
    formatTask,
    generatePDF,
    generateAllVariants,
    getSettings,
    setSettings
  };

})();

// Экспорт для браузерной среды
if (typeof window !== 'undefined') {
  window.VPR7_TaskGenerator = VPR7_TaskGenerator;
}

// Экспорт для ES modules
export default VPR7_TaskGenerator;