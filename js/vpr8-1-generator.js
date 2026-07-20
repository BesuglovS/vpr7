// Модуль генератора заданий для vpr8-1
// Задание 1: Перевод чисел в системы счисления

(function() {
    'use strict';

    const TASKS = [
        {
            dec: 5,
            base: 2,
            binary: '101',
            question: "Переведите число 5 в двоичную систему.",
            answers: ["101", "110", "100", "111"],
            correctIndex: 0
        },
        {
            dec: 10,
            base: 2,
            binary: '1010',
            question: "Переведите число 10 в двоичную систему.",
            answers: ["1001", "1010", "1011", "1100"],
            correctIndex: 1
        },
        {
            dec: 15,
            base: 2,
            binary: '1111',
            question: "Переведите число 15 в двоичную систему.",
            answers: ["1110", "1111", "1101", "1011"],
            correctIndex: 1
        },
        {
            dec: 8,
            base: 8,
            octal: '10',
            question: "Переведите число 8 в восьмеричную систему.",
            answers: ["11", "10", "9", "12"],
            correctIndex: 1
        },
        {
            dec: 10,
            base: 8,
            octal: '12',
            question: "Переведите число 10 в восьмеричную систему.",
            answers: ["11", "12", "13", "14"],
            correctIndex: 1
        },
        {
            dec: 15,
            base: 8,
            octal: '17',
            question: "Переведите число 15 в восьмеричную систему.",
            answers: ["16", "17", "18", "19"],
            correctIndex: 1
        },
        {
            dec: 16,
            base: 16,
            hex: '10',
            question: "Переведите число 16 в шестнадцатеричную систему.",
            answers: ["11", "10", "0F", "1A"],
            correctIndex: 1
        },
        {
            dec: 10,
            base: 16,
            hex: 'A',
            question: "Переведите число 10 в шестнадцатеричную систему.",
            answers: ["9", "A", "B", "C"],
            correctIndex: 1
        },
        {
            dec: 17,
            base: 16,
            hex: '11',
            question: "Переведите число 17 в шестнадцатеричную систему.",
            answers: ["10", "11", "12", "13"],
            correctIndex: 1
        },
        {
            dec: 255,
            base: 2,
            binary: '11111111',
            question: "Переведите число 255 в двоичную систему.",
            answers: ["11111111", "11111110", "11111100", "11111011"],
            correctIndex: 0
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function convertToBinary(dec) {
        return dec.toString(2);
    }

    function convertToOctal(dec) {
        return dec.toString(8);
    }

    function convertToHex(dec) {
        return dec.toString(16).toUpperCase();
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 1,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            convertToBinary: convertToBinary,
            convertToOctal: convertToOctal,
            convertToHex: convertToHex
        };
    }

    window.VPR8_Task1_Generator = generateTask;
})();