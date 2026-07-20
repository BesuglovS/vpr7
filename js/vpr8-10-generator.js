// Модуль генератора заданий для vpr8-10
// Задание 10: Таблицы истинности

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Определите значение NOT x при x = 0.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 0,
            explanation: "NOT 0 = 1."
        },
        {
            question: "Определите значение NOT x при x = 1.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 1,
            explanation: "NOT 1 = 0."
        },
        {
            question: "Определите значение x AND y при x = 0, y = 0.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 1,
            explanation: "0 AND 0 = 0."
        },
        {
            question: "Определите значение x AND y при x = 0, y = 1.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 1,
            explanation: "0 AND 1 = 0."
        },
        {
            question: "Определите значение x AND y при x = 1, y = 0.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 1,
            explanation: "1 AND 0 = 0."
        },
        {
            question: "Определите значение x AND y при x = 1, y = 1.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 0,
            explanation: "1 AND 1 = 1."
        },
        {
            question: "Определите значение x OR y при x = 0, y = 0.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 1,
            explanation: "0 OR 0 = 0."
        },
        {
            question: "Определите значение x OR y при x = 0, y = 1.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 0,
            explanation: "0 OR 1 = 1."
        },
        {
            question: "Определите значение x OR y при x = 1, y = 0.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 0,
            explanation: "1 OR 0 = 1."
        },
        {
            question: "Определите значение x OR y при x = 1, y = 1.",
            answers: ["1", "0", "Не определено"],
            correctIndex: 0,
            explanation: "1 OR 1 = 1."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 10,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task10_Generator = generateTask;
})();