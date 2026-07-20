// Модуль генератора заданий для vpr8-4
// Задание 4: Вычитание в системах счисления

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Выполните вычитание: 10 - 1 (в двоичной системе).",
            answers: ["1", "0", "11"],
            correctIndex: 0,
            explanation: "10 - 1 = 1 в двоичной системе (2-1=1)."
        },
        {
            question: "Выполните вычитание: 100 - 1 (в двоичной системе).",
            answers: ["11", "10", "1"],
            correctIndex: 0,
            explanation: "100 - 1 = 11 в двоичной системе (4-1=3)."
        },
        {
            question: "Выполните вычитание: 101 - 1 (в двоичной системе).",
            answers: ["10", "11", "100"],
            correctIndex: 0,
            explanation: "101 - 1 = 10 в двоичной системе (5-1=4)."
        },
        {
            question: "Выполните вычитание: 110 - 1 (в двоичной системе).",
            answers: ["101", "11", "100"],
            correctIndex: 0,
            explanation: "110 - 1 = 101 в двоичной системе (6-1=5)."
        },
        {
            question: "Выполните вычитание: 111 - 1 (в двоичной системе).",
            answers: ["110", "101", "100"],
            correctIndex: 0,
            explanation: "111 - 1 = 110 в двоичной системе (7-1=6)."
        },
        {
            question: "Выполните вычитание: 1000 - 1 (в двоичной системе).",
            answers: ["111", "110", "101"],
            correctIndex: 0,
            explanation: "1000 - 1 = 111 в двоичной системе (8-1=7)."
        },
        {
            question: "Выполните вычитание: 1010 - 10 (в двоичной системе).",
            answers: ["100", "110", "101"],
            correctIndex: 0,
            explanation: "1010 - 10 = 100 в двоичной системе (10-2=8)."
        },
        {
            question: "Выполните вычитание: 1100 - 100 (в двоичной системе).",
            answers: ["1000", "1010", "1100"],
            correctIndex: 0,
            explanation: "1100 - 100 = 1000 в двоичной системе (12-4=8)."
        },
        {
            question: "Выполните вычитание: 1110 - 10 (в двоичной системе).",
            answers: ["1100", "1010", "1000"],
            correctIndex: 1,
            explanation: "1110 - 10 = 1100 в двоичной системе (14-2=12)."
        },
        {
            question: "Выполните вычитание: 10000 - 1 (в двоичной системе).",
            answers: ["1111", "1110", "1101"],
            correctIndex: 0,
            explanation: "10000 - 1 = 1111 в двоичной системе (16-1=15)."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 4,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task4_Generator = generateTask;
})();