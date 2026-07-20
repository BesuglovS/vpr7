// Модуль генератора заданий для vpr8-6
// Задание 6: Логические выражения (NOT)

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Вычислите выражение: NOT (x > 5) при x = 3.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x > 5) = NOT (ложно) = истинно при x = 3."
        },
        {
            question: "Вычислите выражение: NOT (x < 10) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "NOT (x < 10) = NOT (истинно) = ложно при x = 7."
        },
        {
            question: "Вычислите выражение: NOT (x = 5) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "NOT (x = 5) = NOT (истинно) = ложно при x = 5."
        },
        {
            question: "Вычислите выражение: NOT (x != 5) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x != 5) = NOT (ложно) = истинно при x = 5."
        },
        {
            question: "Вычислите выражение: NOT (x > 0) при x = -1.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x > 0) = NOT (ложно) = истинно при x = -1."
        },
        {
            question: "Вычислите выражение: NOT (x < 0) при x = -5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x < 0) = NOT (истинно) = ложно при x = -5."
        },
        {
            question: "Вычислите выражение: NOT (x > 10) при x = 15.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "NOT (x > 10) = NOT (истинно) = ложно при x = 15."
        },
        {
            question: "Вычислите выражение: NOT (x <= 5) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "NOT (x <= 5) = NOT (истинно) = ложно при x = 5."
        },
        {
            question: "Вычислите выражение: NOT (x >= 10) при x = 8.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x >= 10) = NOT (ложно) = истинно при x = 8."
        },
        {
            question: "Вычислите выражение: NOT (x = 0) при x = 0.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "NOT (x = 0) = NOT (истинно) = ложно при x = 0."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 6,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task6_Generator = generateTask;
})();