/**
 * vpr7-data-loader.js
 * Модуль для загрузки данных заданий
 */

const VPR7_DataLoader = {
  /**
   * Загружает данные из текстового файла
   * @param {string} filePath - Путь к файлу данных
   * @returns {Promise<Object>} Данные из файла
   */
  async loadFromText(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      return this.parseData(text);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      throw error;
    }
  },

  /**
   * Загружает данные из JSON-файла
   * @param {string} filePath - Путь к JSON-файлу
   * @returns {Promise<Object>} Данные из JSON-файла
   */
  async loadJSON(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка загрузки JSON:', error);
      throw error;
    }
  },

  /**
   * Парсит данные из текстового файла
   * @param {string} text - Текст файла
   * @returns {Object} Парсированные данные
   */
  parseData(text) {
    const categories = {};
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    let currentCategory = null;

    lines.forEach(line => {
      // Проверка на заголовок категории (@Название категории)
      if (line.startsWith('@')) {
        currentCategory = line.substring(1).trim();
        categories[currentCategory] = [];
      } else if (currentCategory) {
        // Добавляем элемент в текущую категорию
        categories[currentCategory].push(line);
      }
    });

    return categories;
  },

  /**
   * Загружает данные задания из JSON-файла
   * @param {string} taskType - Тип задания (1-12)
   * @returns {Promise<Object>} Данные задания
   */
  async loadTaskData(taskType) {
    const filePaths = {
      '1': 'data/vpr7-1.txt',
      '2': 'data/vpr7-2.txt',
      '3': 'data/vpr7-3.txt',
      '4': 'data/vpr7-4.txt',
      '5': 'data/vpr7-5.txt',
      '6': 'data/vpr7-6.txt',
      '7': 'data/vpr7-7.txt',
      '8': 'data/vpr7-8.txt',
      '9': 'data/vpr7-9.txt',
      '10': 'data/vpr7-10.txt',
      '11': 'data/vpr7-11.txt',
      '12': 'data/vpr7-12.txt'
    };

    const filePath = filePaths[taskType];
    if (!filePath) {
      throw new Error(`Неизвестный тип задания: ${taskType}`);
    }

    return this.loadFromText(filePath);
  },

  /**
   * Получает все данные для генератора вариантов
   * @returns {Promise<Object>} Все данные
   */
  async loadAllData() {
    const tasksData = {};

    for (let i = 1; i <= 12; i++) {
      try {
        tasksData[i] = await this.loadTaskData(i.toString());
      } catch (error) {
        console.error(`Ошибка загрузки данных для задания ${i}:`, error);
      }
    }

    return tasksData;
  }
};

// Экспорт для браузерной среды
if (typeof window !== 'undefined') {
  window.VPR7_DataLoader = VPR7_DataLoader;
}

// Экспорт для ES modules
export default VPR7_DataLoader;