/**
 * Модуль генератора заданий vpr7-6
 * @module vpr7-6-generator
 */

/**
 * Данные для задания vpr7-6
 * @typedef {Object} Task6Data
 * @property {string} categories - Категории для задания
 * @property {string} devices - Устройства для задания
 * @property {Object} correctMapping - Правильная сопоставка
 */

/**
 * Загружает данные устройства из файла
 * @param {string} filePath - Путь к файлу данных
 * @returns {Promise<Task6Data>} Данные задания
 */
export async function loadDeviceData(filePath) {
  const data = await fetch(filePath)
    .then(response => response.text())
    .catch(err => {
      console.error('Ошибка загрузки данных:', err);
      return {};
    });

  return this.parseData(data);
}

/**
 * Парсит данные из текста
 * @param {string} data - Сырые данные
 * @returns {Task6Data} Структурированные данные
 */
function parseData(data) {
  const categories = extractData(data, /categories:\s*({[^}]+})/);
  const devices = extractData(data, /devices:\s*({[^}]+})/);
  const correctMapping = extractData(data, /correctMapping:\s*({[^}]+})/);

  return {
    categories,
    devices,
    correctMapping
  };
}

/**
 * Извлекает данные из текста
 * @param {string} text - Текст
 * @param {RegExp} regex - Регулярное выражение
 * @returns {any} Извлечённые данные
 */
function extractData(text, regex) {
  const match = text.match(regex);
  return match ? JSON.parse(match[1]) : {};
}

/**
 * Генерирует задание
 * @returns {Task6Data} Сгенерированное задание
 */
export function generateTask() {
  return this.loadDeviceData('../data/vpr7-6.txt')
    .then(data => {
      // Логика генерации
      return data;
    });
}

/**
 * Инициализирует генератор
 */
export function init() {
  console.log('vpr7-6-generator инициализирован');
}