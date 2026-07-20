// Модуль генератора заданий для vpr7-7
// Задание 7: Объём информации

(function() {
    'use strict';

    // Формулы
    const BYTE_TO_BIT = 8;
    const KB_TO_MB = 1024;
    const BITS_PER_CHAR = Math.log2(alphabetSize);

    // Задачи
    const TASKS = [
        {
            volume: 256 * KB_TO_MB,
            bitsPerChar: BYTE_TO_BIT,
            symbols: 16384,
            question: "В файле размером 256 КБ хранится текст. Кодировка использует 8 бит на символ. Сколько символов в файле?",
            answers: ["32 768 символов", "65 536 символов", "16 384 символа", "8 192 символа"],
            correctIndex: 2
        },
        {
            volume: 512,
            unit: 'bit',
            question: "Файл размером 512 бит. Каков его объём?",
            answers: ["64 бита", "512 бит", "64 Кбита", "512 Кбита"],
            correctIndex: 1
        },
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
            volumeMB: 1,
            volumeBits: 8 * 1024 * 1024,
            question: "Файл размером 1 МБ. Каков его объём в битах?",
            answers: ["8 бит", "8000 бит", "8 Мбит", "1 Мбит"],
            correctIndex: 2
        },
        {
            speedMbps: 1,
            volumeMB: 1,
            timeSeconds: 8,
            question: "Скорость канала 1 Мбит/с. За сколько секунд передастся файл объёмом 1 МБ?",
            answers: ["1 секунда", "8 секунд", "0.125 секунды", "128 секунд"],
            correctIndex: 1
        },
        {
            text: "Привет, мир!",
            chars: 12,
            encoding: 'UTF-16',
            bitsPerChar: 16,
            volumeBytes: 24,
            question: "Сообщение: \"Привет, мир!\" — сколько байт при кодировании UTF-16 (16 бит на символ)?",
            answers: ["125 байт", "100 байт", "200 байт", "250 байт"],
            correctIndex: 1
        },
        {
            volumeKB: 1024,
            volumeMB: 1,
            question: "Файл размером 1024 КБ. Сколько это в МБ?",
            answers: ["1 МБ", "0.976 МБ", "1024 МБ", "1000 МБ"],
            correctIndex: 0
        },
        {
            alphabetSize: 128,
            bitsPerChar: 7,
            question: "Алфавит содержит 128 символов. Сколько бит на символ?",
            answers: ["7 бит", "8 бит", "128 бит", "1 бит"],
            correctIndex: 0
        },
        {
            alphabetSize: 256,
            bitsPerChar: 8,
            question: "Алфавит содержит 256 символов. Сколько бит на символ?",
            answers: ["8 бит", "16 бит", "256 бит", "4 бита"],
            correctIndex: 0
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
            task: `${task.question}`,
            answers: task.answers,
            correctIndex: task.correctIndex,
            calculateVolume: function(chars, alphabetSize) {
                const bits = chars * Math.log2(alphabetSize || 256);
                return Math.ceil(bits / BYTE_TO_BIT);
            }
        };
    }

    window.VPR7_Task7_Generator = generateTask;
})();