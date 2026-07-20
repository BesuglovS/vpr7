// Модуль генератора заданий для vpr8-5
// Задание 5: Логические высказывания

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Определите истинность высказывания: x > 5 при x = 3.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "Высказывание x > 5 ложно при x = 3, так как 3 не больше 5."
        },
        {
            question: "Определите истинность высказывания: x < 10 при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "Высказывание x < 10 истинно при x = 7, так как 7 меньше 10."
        },
        {
            question: "Определите истинность высказывания: x = 5 при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "Высказывание x = 5 истинно при x = 5, так как 5 равно 5."
        },
        {
            question: "Определите истинность высказывания: x != 5 при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "Высказывание x != 5 ложно при x = 5, так как 5 равно 5."
        },
        {
            question: "Определите истинность высказывания: x > 0 при x = -1.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "Высказывание x > 0 ложно при x = -1, так как -1 не больше 0."
        },
        {
            question: "Определите истинность высказывания: x < 0 при x = -5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "Высказывание x < 0 истинно при x = -5, так как -5 меньше 0."
        },
        {
            question: "Определите истинность высказывания: x > 10 при x = 15.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "Высказывание x > 10 истинно при x = 15, так как 15 больше 10."
        },
        {
            question: "Определите истинность высказывания: x <= 5 при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "Высказывание x <= 5 истинно при x = 5, так как 5 меньше или равно 5."
        },
        {
            question: "Определите истинность высказывания: x >= 10 при x = 8.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "Высказывание x >= 10 ложно при x = 8, так как 8 не больше или равно 10."
        },
        {
            question: "Определите истинность высказывания: x = 0 при x = 0.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "Высказывание x = 0 истинно при x = 0, так как 0 равно 0."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 5,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task5_Generator = generateTask;
})();