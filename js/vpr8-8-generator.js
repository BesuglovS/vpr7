// Модуль генератора заданий для vpr8-8
// Задание 8: Логические выражения (OR)

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Вычислите выражение: (x > 5) OR (x < 5) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) OR (x < 5) = ИСТИННО OR ЛОЖНО = ИСТИННО при x = 7."
        },
        {
            question: "Вычислите выражение: (x > 5) OR (x < 10) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) OR (x < 10) = ИСТИННО OR ИСТИННО = ИСТИННО при x = 7."
        },
        {
            question: "Вычислите выражение: (x > 5) OR (x > 20) при x = 15.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) OR (x > 20) = ИСТИННО OR ЛОЖНО = ИСТИННО при x = 15."
        },
        {
            question: "Вычислите выражение: (x = 5) OR (x = 10) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x = 5) OR (x = 10) = ИСТИННО OR ЛОЖНО = ИСТИННО при x = 5."
        },
        {
            question: "Вычислите выражение: (x > 100) OR (x < 0) при x = 50.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "(x > 100) OR (x < 0) = ЛОЖНО OR ЛОЖНО = ЛОЖНО при x = 50."
        },
        {
            question: "Вычислите выражение: (x > 0) OR (x < 100) при x = 50.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 0) OR (x < 100) = ИСТИННО OR ИСТИННО = ИСТИННО при x = 50."
        },
        {
            question: "Вычислите выражение: (x > 5) OR (x = 5) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) OR (x = 5) = ЛОЖНО OR ИСТИННО = ИСТИННО при x = 5."
        },
        {
            question: "Вычислите выражение: (x < 10) OR (x > 20) при x = 15.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x < 10) OR (x > 20) = ЛОЖНО OR ЛОЖНО = ЛОЖНО при x = 15."
        },
        {
            question: "Вычислите выражение: (x != 5) OR (x != 10) при x = 5.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x != 5) OR (x != 10) = ЛОЖНО OR ИСТИННО = ИСТИННО при x = 5."
        },
        {
            question: "Вычислите выражение: (x mod 2 = 0) OR (x mod 2 = 1) при x = 4.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x mod 2 = 0) OR (x mod 2 = 1) = ИСТИННО OR ЛОЖНО = ИСТИННО при x = 4."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 8,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task8_Generator = generateTask;
})();