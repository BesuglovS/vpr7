// Модуль генератора заданий для vpr7-10
// Задание 10: Объём информации в предложении

(function() {
    'use strict';

    // Формулы
    const BYTE_TO_BIT = 8;

    // Задачи
    const TASKS = [
        {
            chars: 20,
            encoding: 'UTF-16',
            volumeBytes: 40,
            question: "Предложение содержит 20 символов. Какой объём информации при кодировании UTF-16?",
            answers: ["125 байт", "100 байт", "200 байт", "250 байт"],
            correctIndex: 1
        },
        {
            text: "Привет, мир!",
            chars: 12,
            encoding: 'UTF-16',
            volumeBytes: 24,
            question: "Сообщение: \"Привет, мир!\" (12 символов). Сколько байт при кодировании UTF-16?",
            answers: ["16 байт", "24 байта", "10 байт", "12 байт"],
            correctIndex: 1
        },
        {
            text: "Это тестовое сообщение",
            chars: 18,
            encoding: 'UTF-16',
            volumeBytes: 36,
            question: "Предложение: \"Это тестовое сообщение\" (18 символов). Объём в байтах (UTF-16)?",
            answers: ["32 байта", "36 байт", "40 байт", "44 байта"],
            correctIndex: 1
        },
        {
            chars: 500,
            encoding: 'UTF-16',
            volumeBytes: 1000,
            question: "Текст содержит 500 символов. Какой объём в байтах (UTF-16)?",
            answers: ["500 байт", "1000 байт", "250 байт", "125 байт"],
            correctIndex: 1
        },
        {
            volumeBytes: 1024,
            encoding: 'UTF-16',
            chars: 2048,
            question: "Файл с текстом 1 КБ. Сколько символов при UTF-16 (8 бит на символ)?",
            answers: ["1024 символа", "2048 символов", "512 символов", "256 символов"],
            correctIndex: 1
        },
        {
            text: "Информатика для школьников",
            chars: 26,
            encoding: 'UTF-16',
            volumeBytes: 52,
            question: "Сообщение: \"Информатика для школьников\" (26 символов). Объём в байтах (UTF-16)?",
            answers: ["40 байт", "52 байта", "26 байт", "13 байт"],
            correctIndex: 1
        },
        {
            chars: 750,
            encoding: 'UTF-8',
            volumeBytes: 750,
            question: "Текст содержит 750 символов. Какой объём при кодировании UTF-8?",
            answers: ["750 байт", "1500 байт", "375 байт", "150 байт"],
            correctIndex: 0
        },
        {
            text: "АБВГДЕЖЗИЙКЛ",
            chars: 12,
            encoding: 'UTF-8',
            volumeBits: 96,
            question: "Сообщение: \"АБВГДЕЖЗИЙКЛ\" (12 символов). Объём в битах (UTF-8)?",
            answers: ["96 бит", "12 бит", "192 бит", "24 бита"],
            correctIndex: 0
        },
        {
            volumeBytes: 2048,
            encoding: 'UTF-8',
            chars: 2048,
            question: "Файл содержит 2 МБ текста. Сколько символов при кодировании UTF-8?",
            answers: ["2 Мб символа", "1 Мб символа", "4 Мб символа", "8 Мб символа"],
            correctIndex: 0
        },
        {
            text: "Россия — страна возможностей",
            chars: 27,
            encoding: 'UTF-16',
            volumeBytes: 54,
            question: "Предложение: \"Россия — страна возможностей\" (27 символов). Объём в байтах (UTF-16)?",
            answers: ["27 байт", "54 байта", "135 байт", "31 байт"],
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
            id: 10,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            calculateVolume: function(chars, encoding) {
                const bytesPerChar = encoding === 'UTF-16' ? 2 : 1;
                return chars * bytesPerChar;
            }
        };
    }

    window.VPR7_Task10_Generator = generateTask;
})();