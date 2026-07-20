// Модуль генератора заданий для vpr7-9
// Задание 9: Передача информации

(function() {
    'use strict';

    // Формулы
    const BYTE_TO_BIT = 8;
    const KB_TO_MB = 1024;

    // Задачи
    const TASKS = [
        {
            volumeMB: 1,
            speedMbps: 1,
            timeSeconds: 8,
            question: "Сколько времени займёт передача файла объёмом 1 МБ при скорости канала 1 Мбит/с?",
            answers: ["8 секунд", "1 секунда", "0.125 секунды", "128 секунд"],
            correctIndex: 0
        },
        {
            speedKbps: 1024,
            timeSeconds: 5,
            volumeKB: 625,
            question: "Скорость канала 1024 Кбит/с. За 5 секунд передан файл. Каков его объём в КБ?",
            answers: ["500 КБ", "625 КБ", "1000 КБ", "1250 КБ"],
            correctIndex: 1
        },
        {
            volumeMB: 2,
            speedMbps: 2,
            timeSeconds: 16,
            question: "Файл объёмом 2 МБ передаётся со скоростью 2 Мбит/с. Сколько времени?",
            answers: ["2 секунды", "16 секунд", "256 секунд", "1 секунда"],
            correctIndex: 1
        },
        {
            timeSeconds: 10,
            volumeMbit: 10,
            speedMbps: 1,
            question: "За 10 секунд передан файл объёмом 10 Мбит. Какова скорость канала?",
            answers: ["1 Мбит/с", "1000 Кбит/с", "100 Кбит/с", "1000 Мбит/с"],
            correctIndex: 0
        },
        {
            speedKbps: 512,
            volumeMB: 4,
            timeSeconds: 64,
            question: "Скорость канала 512 Кбит/с. За сколько секунд передастся файл 4 МБ?",
            answers: ["64 секунды", "32 секунды", "128 секунд", "512 секунды"],
            correctIndex: 0
        },
        {
            volumeKB: 512,
            speedKbps: 128,
            timeSeconds: 32,
            question: "Файл 512 КБ передаётся со скоростью 128 Кбит/с. Сколько времени?",
            answers: ["4 секунды", "32 секунды", "4 секунды", "64 секунды"],
            correctIndex: 1
        },
        {
            speedKbps: 2048,
            timeSeconds: 8,
            volumeMB: 4,
            question: "Канал со скоростью 2048 Кбит/с. За 8 секунд передан файл. Объём в МБ?",
            answers: ["1 МБ", "2 МБ", "4 МБ", "8 МБ"],
            correctIndex: 2
        },
        {
            volumeKB: 256,
            speedKbps: 512,
            timeSeconds: 4,
            question: "Файл 256 КБ. Скорость 512 Кбит/с. Время передачи?",
            answers: ["4 секунды", "2 секунды", "1 секунда", "8 секунд"],
            correctIndex: 0
        },
        {
            speedMbps: 4,
            volumeMB: 8,
            timeSeconds: 4,
            question: "Скорость 4 Мбит/с. Файл 8 МБ. Время?",
            answers: ["4 секунды", "8 секунд", "16 секунд", "2 секунды"],
            correctIndex: 0
        },
        {
            volumeMB: 10,
            timeSeconds: 20,
            speedMbps: 2,
            question: "За 20 секунд передан файл 10 МБ. Скорость канала?",
            answers: ["1 Мбит/с", "2 Мбит/с", "16 Мбит/с", "8 Мбит/с"],
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
            id: 9,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            calculateTime: function(volumeMB, speedMbps) {
                const volumeMbit = volumeMB * 8;
                return volumeMbit / speedMbps;
            }
        };
    }

    window.VPR7_Task9_Generator = generateTask;
})();