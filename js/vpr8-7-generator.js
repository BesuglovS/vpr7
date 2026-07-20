// Модуль генератора заданий для vpr8-7
// Задание 7: Логические выражения (AND)

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Вычислите выражение: (x > 5) AND (x < 10) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) AND (x < 10) = ИСТИННО AND ИСТИННО = ИСТИННО при x = 7."
        },
        {
            question: "Вычислите выражение: (x > 5) AND (x < 5) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "(x > 5) AND (x < 5) = ИСТИННО AND ЛОЖНО = ЛОЖНО при x = 7."
        },
        {
            question: "Вычислите выражение: (x > 5) AND (x > 3) при x = 6.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) AND (x > 3) = ИСТИННО AND ИСТИННО = ИСТИННО при x = 6."
        },
        {
            question: "Вычислите выражение: (x < 10) AND (x > 20) при x = 15.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "(x < 10) AND (x > 20) = ЛОЖНО AND ЛОЖНО = ЛОЖНО при x = 15."
        },
        {
            question: "Вычислите выражение: (x >= 5) AND (x <= 5) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x >= 5) AND (x <= 5) = ИСТИННО AND ИСТИННО = ИСТИННО при x = 5."
        },
        {
            question: "Вычислите выражение: (x = 0) AND (x = 1) при x = 0.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "(x = 0) AND (x = 1) = ИСТИННО AND ЛОЖНО = ЛОЖНО при x = 0."
        },
        {
            question: "Вычислите выражение: (x mod 2 = 0) AND (x mod 2 = 1) при x = 4.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "(x mod 2 = 0) AND (x mod 2 = 1) = ИСТИННО AND ЛОЖНО = ЛОЖНО при x = 4."
        },
        {
            question: "Вычислите выражение: (x > 0) AND (x < 100) при x = 50.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 0) AND (x < 100) = ИСТИННО AND ИСТИННО = ИСТИННО при x = 50."
        },
        {
            question: "Вычислите выражение: (x = 5) AND (x = 5) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x = 5) AND (x = 5) = ИСТИННО AND ИСТИННО = ИСТИННО при x = 5."
        },
        {
            question: "Вычислите выражение: (x != 5) AND (x != 5) при x = 3.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x != 5) AND (x != 5) = ИСТИННО AND ИСТИННО = ИСТИННО при x = 3."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 7,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task7_Generator = generateTask;
})();