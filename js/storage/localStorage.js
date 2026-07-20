/**
 * Модуль localStorage для сохранения прогресса пользователей
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'vpr-progress';

    /**
     * Сохраняет результат выполнения задания
     * @param {string} className - 'vpr7' или 'vpr8'
     * @param {number} taskId - Номер задания
     * @param {number} score - Оценка (0-100)
     * @param {object} attempts - Объект с информацией об попытках
     */
    function saveResult(className, taskId, score, attempts) {
        const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const key = `${className}-${taskId}`;
        progress[key] = {
            score,
            attempts: (progress[key]?.attempts || 0) + 1,
            lastAttempt: new Date().toISOString(),
            correct: attempts && attempts.correct !== undefined ? attempts.correct : undefined
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        console.log(`Результат сохранён: ${className}-task${taskId} = ${score}`);
    }

    /**
     * Получает прогресс пользователя
     * @returns {object} Объект с прогрессом
     */
    function getProgress() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    }

    /**
     * Получает прогресс для конкретного класса и задания
     * @param {string} className - 'vpr7' или 'vpr8'
     * @param {number} taskId - Номер задания
     * @returns {object|null} Объект с прогрессом или null
     */
    function getTaskProgress(className, taskId) {
        const progress = getProgress();
        const key = `${className}-${taskId}`;
        return progress[key] || null;
    }

    /**
     * Сбрасывает прогресс для конкретного задания
     * @param {string} className - 'vpr7' или 'vpr8'
     * @param {number} taskId - Номер задания
     */
    function resetTaskProgress(className, taskId) {
        const progress = getProgress();
        const key = `${className}-${taskId}`;
        if (progress[key]) {
            delete progress[key];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            console.log(`Прогресс сброшен: ${className}-task${taskId}`);
        }
    }

    /**
     * Сбрасывает весь прогресс
     */
    function resetAllProgress() {
        localStorage.removeItem(STORAGE_KEY);
        console.log('Весь прогресс сброшен');
    }

    /**
     * Получает статистику для всех заданий
     * @returns {object} Статистика
     */
    function getStats() {
        const progress = getProgress();
        const stats = {
            totalTasks: 0,
            completedTasks: 0,
            averageScore: 0
        };

        for (const key in progress) {
            if (progress.hasOwnProperty(key)) {
                stats.totalTasks++;
                if (progress[key].correct) {
                    stats.completedTasks++;
                }
                stats.averageScore += progress[key].score;
            }
        }

        if (stats.totalTasks > 0) {
            stats.averageScore = Math.round((stats.averageScore / stats.totalTasks) * 100) / 100;
        }

        return stats;
    }

    /**
     * Получает список всех доступных заданий
     * @returns {array} Список задач
     */
    function getAllTasks() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(id => ({
            id,
            completed: !!getTaskProgress('vpr7', id),
            lastAttempt: getTaskProgress('vpr7', id)?.lastAttempt
        }));
    }

    window.VPR_Storage = {
        saveResult,
        getProgress,
        getTaskProgress,
        resetTaskProgress,
        resetAllProgress,
        getStats,
        getAllTasks
    };

})();