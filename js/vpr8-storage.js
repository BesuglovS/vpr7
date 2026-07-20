/**
 * vpr8-storage.js
 * Модуль для работы с localStorage для vpr8
 */

const VPR8_Storage = {
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
        return this.load('vpr8-progress') || {
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
        this.save('vpr8-progress', progress);
        return progress;
    },

    /**
     * Сохраняет оценку за задание
     * @param {number} taskId - Номер задания
     * @param {number} score - Оценка
     * @param {boolean} correct - Верно ли задание
     */
    saveScore(taskId, score, correct) {
        const progress = this.getProgress();
        progress.scores[taskId] = {
            score,
            correct,
            attempts: (progress.scores[taskId]?.attempts || 0) + 1,
            lastAttempt: new Date().toISOString()
        };
        this.save('vpr8-progress', progress);
        return progress.scores[taskId];
    },

    /**
     * Сохраняет тему оформления
     * @param {string} theme - 'light' или 'dark'
     */
    setTheme(theme) {
        this.save('vpr8-theme', theme);
    },

    /**
     * Получает текущую тему оформления
     * @returns {string} Текущая тема
     */
    getTheme() {
        return this.load('vpr8-theme') || 'light';
    },

    /**
     * Очистяет весь прогресс
     */
    clearProgress() {
        this.remove('vpr8-progress');
        this.remove('vpr8-theme');
    }
};

// Экспорт для браузерной среды
if (typeof window !== 'undefined') {
    window.VPR8_Storage = VPR8_Storage;
}

// Экспорт для ES modules
export default VPR8_Storage;