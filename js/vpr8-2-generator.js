// Модуль генератора заданий для vpr8-2
// Задание 2: Сравнение чисел

(function() {
    'use strict';

    const TASKS = [
        {
            question: "Сравните числа: 101 и 1010 (в десятичной системе).",
            answers: ["101 > 1010", "101 < 1010", "101 = 1010"],
            correctIndex: 1,
            explanation: "101 < 1010, так как 101 меньше 1010 в десятичной системе."
        },
        {
            question: "Сравните числа: 110 и 1100 (в двоичной системе).",
            answers: ["110 > 1100", "110 < 1100", "110 = 1100"],
            correctIndex: 1,
            explanation: "110 < 1100, так как 6 < 8 в двоичной системе."
        },
        {
            question: "Сравните числа: 1000 и 1001 (в восьмеричной системе).",
            answers: ["1000 > 1001", "1000 < 1001", "1000 = 1001"],
            correctIndex: 1,
            explanation: "1000 < 1001, так как 512 < 513 в восьмеричной системе."
        },
        {
            question: "Сравните числа: 10 и 15 (в десятичной системе).",
            answers: ["10 > 15", "10 < 15", "10 = 15"],
            correctIndex: 1,
            explanation: "10 < 15, так как 10 меньше 15 в десятичной системе."
        },
        {
            question: "Сравните числа: 100 и 110 (в двоичной системе).",
            answers: ["100 > 110", "100 < 110", "100 = 110"],
            correctIndex: 1,
            explanation: "100 < 110, так как 4 < 6 в двоичной системе."
        },
        {
            question: "Найдите число в диапазоне от 10 до 20 (в десятичной системе).",
            answers: ["5", "15", "25"],
            correctIndex: 1,
            explanation: "15 находится в диапазоне от 10 до 20."
        },
        {
            question: "Найдите число в диапазоне от 100 до 200 (в двоичной системе).",
            answers: ["5", "15", "25"],
            correctIndex: 1,
            explanation: "15 (в двоичной 1111) находится в диапазоне от 100 до 200 (в двоичной). В десятичной это от 4 до 8."
        },
        {
            question: "Сравните числа: 10010 и 10000 (в двоичной системе).",
            answers: ["10010 > 10000", "10010 < 10000", "10010 = 10000"],
            correctIndex: 0,
            explanation: "10010 > 10000, так как 18 > 16 в двоичной системе."
        },
        {
            question: "Сравните числа: 111 и 1111 (в двоичной системе).",
            answers: ["111 > 1111", "111 < 1111", "111 = 1111"],
            correctIndex: 1,
            explanation: "111 < 1111, так как 7 < 15 в двоичной системе."
        },
        {
            question: "Найдите число в диапазоне от 1000 до 2000 (в двоичной системе).",
            answers: ["500", "1000", "2000"],
            correctIndex: 1,
            explanation: "1000 (в двоичной) находится в диапазоне от 1000 до 2000."
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 2,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            explanation: task.explanation
        };
    }

    window.VPR8_Task2_Generator = generateTask;
})();