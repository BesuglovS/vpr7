// Модуль генератора заданий для vpr7-8
// Задание 8: Объём текстовой информации

(function() {
    'use strict';

    // Формулы
    const BYTE_TO_BIT = 8;
    const KB_TO_MB = 1024;

    // Задачи
    const TASKS = [
        {
            alphabetSize: 32,
            chars: 20,
            volumeBits: 60,
            question: "Алфавит содержит 32 символа. Сообщение состоит из 20 символов. Каков информационный объём в битах?",
            answers: ["40 бит", "20 бит", "80 бит", "10 бит"],
            correctIndex: 3
        },
        {
            alphabetSize: 64,
            question: "Алфавит содержит 64 символа. Сколько бит нужно для кодирования одного символа?",
            answers: ["4 бита", "6 бит", "8 бит", "16 бит"],
            correctIndex: 1
        },
        {
            alphabetSize: 128,
            question: "Алфавит содержит 128 символов. Сколько бит на символ?",
            answers: ["7 бит", "8 бит", "128 бит", "1 бит"],
            correctIndex: 0
        },
        {
            alphabetSize: 256,
            question: "Алфавит содержит 256 символов. Сколько бит на символ?",
            answers: ["8 бит", "16 бит", "256 бит", "4 бита"],
            correctIndex: 0
        },
        {
            chars: 100,
            alphabetSize: 256,
            volumeBits: 800,
            question: "Сообщение содержит 100 символов. Алфавит — 256 символов. Информационный объём?",
            answers: ["800 бит", "100 бит", "125 байт", "8000 бит"],
            correctIndex: 0
        },
        {
            text: "Информатика",
            chars: 12,
            alphabetSize: 32,
            volumeBits: 48,
            question: "Сообщение: \"Информатика\". Алфавит — 32 символа. Информационный объём?",
            answers: ["40 бит", "80 бит", "10 бит", "20 бит"],
            correctIndex: 1
        },
        {
            chars: 1024,
            alphabetSize: 16,
            volumeBits: 8192,
            question: "Файл содержит 1024 символа. Алфавит — 16 символов. Объём в битах?",
            answers: ["8192 бит", "1024 бит", "4096 бит", "2048 бит"],
            correctIndex: 0
        },
        {
            text: "Привет, мир!",
            chars: 12,
            alphabetSize: 64,
            volumeBits: 72,
            question: "Сообщение: \"Привет, мир!\" (12 символов). Алфавит — 64 символа. Объём в битах?",
            answers: ["72 бита", "64 бита", "80 бит", "96 бит"],
            correctIndex: 0
        },
        {
            alphabetSize: 4,
            question: "Алфавит содержит 4 символа. Сколько бит на символ?",
            answers: ["1 бит", "2 бита", "4 бита", "8 бит"],
            correctIndex: 1
        },
        {
            chars: 50,
            alphabetSize: 8,
            volumeBits: 400,
            question: "Сообщение содержит 50 символов. Алфавит — 8 символов. Объём в битах?",
            answers: ["150 бит", "100 бит", "200 бит", "75 бит"],
            correctIndex: 1
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
            calculateVolume: function(chars, alphabetSize) {
                const bits = chars * Math.log2(alphabetSize || 256);
                return Math.ceil(bits / BYTE_TO_BIT);
            }
        };
    }

    window.VPR7_Task8_Generator = generateTask;
})();