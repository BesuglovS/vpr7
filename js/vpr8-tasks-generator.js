// Модуль генератора заданий для vpr8 (агрегирующий)
// Агрегирует все генераторы заданий для vpr8

(function() {
    'use strict';

    const Generators = {
        Task1: window.VPR8_Task1_Generator,
        Task2: window.VPR8_Task2_Generator,
        Task3: window.VPR8_Task3_Generator,
        Task4: window.VPR8_Task4_Generator,
        Task5: window.VPR8_Task5_Generator,
        Task6: window.VPR8_Task6_Generator,
        Task7: window.VPR8_Task7_Generator,
        Task8: window.VPR8_Task8_Generator,
        Task9: window.VPR8_Task9_Generator,
        Task10: window.VPR8_Task10_Generator
    };

    // Функция для получения случайного задания по номеру задачи
    function getRandomTaskByTaskNumber(taskNumber) {
        if (Generators['Task' + taskNumber]) {
            return Generators['Task' + taskNumber]();
        }
        return null;
    }

    // Функция для получения случайного задания для всего vpr8
    function getRandomVPR8Task() {
        const taskNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const randomTaskNumber = taskNumbers[Math.floor(Math.random() * taskNumbers.length)];
        return getRandomTaskByTaskNumber(randomTaskNumber);
    }

    // Функция для получения всех доступных генераторов
    function getAllGenerators() {
        return Generators;
    }

    // Экспорт в глобальное пространство имен
    window.VPR8_Tasks_Generator = {
        getRandomTaskByTaskNumber: getRandomTaskByTaskNumber,
        getRandomVPR8Task: getRandomVPR8Task,
        getAllGenerators: getAllGenerators
    };

    console.log('VPR8 Tasks Generator initialized with 10 task generators');
})();