// Модуль генератора заданий для vpr8-3
// Задание 3: Сложение в системах счисления

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Выполните сложение: 1 + 1 (в двоичной системе).",
            answers: ["10", "11", "100"],
            correctIndex: 0,
            explanation: "1 + 1 = 10 в двоичной системе (аналогично 1+1=10 в десятичной)."
        },
        {
            question: "Выполните сложение: 10 + 1 (в двоичной системе).",
            answers: ["11", "101", "1001"],
            correctIndex: 0,
            explanation: "10 + 1 = 11 в двоичной системе (аналогично 2+1=3)."
        },
        {
            question: "Выполните сложение: 11 + 1 (в двоичной системе).",
            answers: ["100", "101", "110"],
            correctIndex: 0,
            explanation: "11 + 1 = 100 в двоичной системе (3+1=4)."
        },
        {
            question: "Выполните сложение: 101 + 1 (в двоичной системе).",
            answers: ["110", "111", "1000"],
            correctIndex: 1,
            explanation: "101 + 1 = 110 в двоичной системе (5+1=6)."
        },
        {
            question: "Выполните сложение: 10 + 10 (в двоичной системе).",
            answers: ["100", "110", "1010"],
            correctIndex: 0,
            explanation: "10 + 10 = 100 в двоичной системе (2+2=4)."
        },
        {
            question: "Выполните сложение: 110 + 1 (в двоичной системе).",
            answers: ["111", "1000", "1011"],
            correctIndex: 0,
            explanation: "110 + 1 = 111 в двоичной системе (6+1=7)."
        },
        {
            question: "Выполните сложение: 111 + 1 (в двоичной системе).",
            answers: ["1000", "1010", "1011"],
            correctIndex: 0,
            explanation: "111 + 1 = 1000 в двоичной системе (7+1=8)."
        },
        {
            question: "Выполните сложение: 100 + 10 (в двоичной системе).",
            answers: ["110", "1010", "1110"],
            correctIndex: 1,
            explanation: "100 + 10 = 1010 в двоичной системе (4+2=6)."
        },
        {
            question: "Выполните сложение: 1011 + 1 (в двоичной системе).",
            answers: ["1100", "1101", "1110"],
            correctIndex: 0,
            explanation: "1011 + 1 = 1100 в двоичной системе (11+1=12)."
        },
        {
            question: "Выполните сложение: 1111 + 1 (в двоичной системе).",
            answers: ["10000", "10001", "10010"],
            correctIndex: 0,
            explanation: "1111 + 1 = 10000 в двоичной системе (15+1=16)."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 3,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task3_Generator = generateTask;
})();