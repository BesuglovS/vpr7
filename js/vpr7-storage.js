/**
 * vpr7-storage.js
 * Модуль для работы с localStorage
 */

const VPR7_Storage = {
  /**
   * Сохраняет прогресс пользователя
   * @param {string} key - Ключ в localStorage
   * @param {any} value - Значение для сохранения
   */
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Ошибка сохранения в localStorage:', e);
      return false;
    }
  },

  /**
   * Загружает данные из localStorage
   * @param {string} key - Ключ для загрузки
   * @returns {any|null} Значение или null если не найдено
   */
  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Ошибка загрузки из localStorage:', e);
      return null;
    }
  },

  /**
   * Удаляет данные из localStorage
   * @param {string} key - Ключ для удаления
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Ошибка удаления из localStorage:', e);
      return false;
    }
  },

  /**
   * Получает прогресс пользователя (пройдённые задания)
   * @returns {Object} Объект с прогрессом
   */
  getProgress() {
    return this.load('vpr7-progress') || {
      completed: [],
      attempted: [],
      scores: {}
    };
  },

  /**
   * Обновляет прогресс пользователя
   * @param {Array} completed - Пройдённые задания
   * @param {Array} attempted - Попытки
   * @param {Object} scores - Оценки
   */
  setProgress(completed = [], attempted = [], scores = {}) {
    const progress = this.getProgress();
    progress.completed = completed;
    progress.attempted = attempted;
    progress.scores = scores;
    this.save('vpr7-progress', progress);
    return progress;
  },

  /**
   * Сохраняет тему оформления
   * @param {string} theme - 'light' или 'dark'
   */
  setTheme(theme) {
    this.save('vpr7-theme', theme);
  },

  /**
   * Получает текущую тему оформления
   * @returns {string} Текущая тема
   */
  getTheme() {
    return this.load('vpr7-theme') || 'light';
  },

  /**
   * Очистяет весь прогресс
   */
  clearProgress() {
    this.remove('vpr7-progress');
    this.remove('vpr7-theme');
  }
};

// Экспорт для браузерной среды
if (typeof window !== 'undefined') {
  window.VPR7_Storage = VPR7_Storage;
}

// Экпорт для ES modules
export default VPR7_Storage;