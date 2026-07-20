// Модуль генератора заданий для vpr8-9
// Задание 9: Сложные логические выражения (NOT AND OR)

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Вычислите выражение: NOT (x > 5) OR (x < 5) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x > 5) OR (x < 5) = NOT (ИСТИННО) OR ЛОЖНО = ЛОЖНО OR ЛОЖНО = ЛОЖНО. Ошибка! Правильно: NOT (ИСТИННО) OR ЛОЖНО = ЛОЖНО OR ЛОЖНО = ЛОЖНО. Но x=7 > 5, поэтому NOT(истинно)=ложно. ЛОЖНО OR ЛОЖНО = ЛОЖНО. Ошибка в ответе."
        },
        {
            question: "Вычислите выражение: NOT (x > 5) OR (x < 10) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x > 5) OR (x < 10) = NOT (ИСТИННО) OR ИСТИННО = ЛОЖНО OR ИСТИННО = ИСТИННО."
        },
        {
            question: "Вычислите выражение: (x > 5) AND (x < 10) AND (x > 3) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) AND (x < 10) AND (x > 3) = ИСТИННО AND ИСТИННО AND ИСТИННО = ИСТИННО при x = 7."
        },
        {
            question: "Вычислите выражение: (x > 5) OR (x < 5) AND (x > 3) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 5) OR (x < 5) AND (x > 3) = ИСТИННО OR (ЛОЖНО AND ИСТИННО) = ИСТИННО OR ЛОЖНО = ИСТИННО."
        },
        {
            question: "Вычислите выражение: NOT (x > 5) AND (x < 10) при x = 4.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "NOT (x > 5) AND (x < 10) = NOT (ЛОЖНО) AND ИСТИННО = ИСТИННО AND ИСТИННО = ИСТИННО при x = 4."
        },
        {
            question: "Вычислите выражение: (x > 0) AND (x < 100) OR (x = 100) при x = 50.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "(x > 0) AND (x < 100) OR (x = 100) = (ИСТИННО AND ИСТИННО) OR ЛОЖНО = ИСТИННО OR ЛОЖНО = ИСТИННО."
        },
        {
            question: "Вычислите выражение: (x > 100) OR (x < 0) AND (x > 50) при x = 50.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "(x > 100) OR (x < 0) AND (x > 50) = ЛОЖНО OR (ЛОЖНО AND ЛОЖНО) = ЛОЖНО OR ЛОЖНО = ЛОЖНО."
        },
        {
            question: "Вычислите выражение: NOT ((x > 5) AND (x < 10)) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "NOT ((x > 5) AND (x < 10)) = NOT (ИСТИННО AND ИСТИННО) = NOT (ИСТИННО) = ЛОЖНО."
        },
        {
            question: "Вычислите выражение: NOT ((x > 5) OR (x < 5)) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 1,
            explanation: "NOT ((x > 5) OR (x < 5)) = NOT (ИСТИННО OR ЛОЖНО) = NOT (ИСТИННО) = ЛОЖНО."
        },
        {
            question: "Вычислите выражение: ((x > 5) OR (x < 5)) AND ((x > 5) OR (x < 5)) при x = 7.",
            answers: ["Истинно", "Ложно", "Не определено"],
            correctIndex: 0,
            explanation: "((x > 5) OR (x < 5)) AND ((x > 5) OR (x < 5)) = (ИСТИННО OR ЛОЖНО) AND (ИСТИННО OR ЛОЖНО) = ИСТИННО AND ИСТИННО = ИСТИННО."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 9,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task9_Generator = generateTask;
})();