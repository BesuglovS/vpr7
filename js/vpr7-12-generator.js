// Модуль генератора заданий для vpr7-12
// Задание 12: Алгоритмы

(function() {
    'use strict';

    // Задачи
    const TASKS = [
        {
            A: 5,
            B: 3,
            operation: 'A + B',
            result: 8,
            question: "Алгоритм: A = A + B. A=5, B=3. Результат?",
            answers: ["8", "15", "3"],
            correctIndex: 0
        },
        {
            A: 3,
            B: 5,
            operation: 'A > B ? 1 : 0',
            result: 0,
            question: "Алгоритм: если A > B вернуть 1, иначе 0. A=3, B=5. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        },
        {
            start: 1,
            end: 5,
            iterations: 5,
            question: "Цикл: для i от 1 до 5 вывести i. Сколько итераций?",
            answers: ["4", "5", "6"],
            correctIndex: 1
        },
        {
            A: 5,
            condition: 'while A < 10',
            operation: 'A = A + 1',
            iterations: 5,
            question: "Цикл: пока A < 10, A = A + 1. A=5. Сколько итераций?",
            answers: ["4", "5", "6"],
            correctIndex: 1
        },
        {
            n: 5,
            operation: 'factorial(n)',
            result: 120,
            question: "Рекурсия: факториал 5. Результат?",
            answers: ["120", "24", "12"],
            correctIndex: 0
        },
        {
            array: [3, 5, 7, 9],
            target: 7,
            index: 2,
            question: "Поиск: массив [3, 5, 7, 9]. Найти 7. Индекс?",
            answers: ["0", "1", "2"],
            correctIndex: 2
        },
        {
            array: [3, 5, 7, 9],
            target: 10,
            found: false,
            question: "Поиск: массив [3, 5, 7, 9]. Найти 10. Результат?",
            answers: ["Найдено", "Не найдено", "Ошибка"],
            correctIndex: 1
        },
        {
            array: [3, 1, 4, 1, 5, 9, 2, 6],
            sorted: [1, 1, 2, 3, 4, 5, 6, 9],
            question: "Сортировка: отсортировать [3, 1, 4, 1, 5, 9, 2, 6]. Результат?",
            answers: ["[1, 1, 2, 3, 4, 5, 6, 9]", "[9, 6, 5, 4, 3, 2, 1, 1]", "[1, 1, 3, 4, 5, 6, 9, 2]"],
            correctIndex: 0
        },
        {
            A: 3,
            operation: 'A * 2',
            result: 6,
            question: "Алгоритм: A = A * 2. A=3. Результат?",
            answers: ["6", "9", "12"],
            correctIndex: 0
        },
        {
            A: 10,
            operation: 'A - 5',
            result: 5,
            question: "Алгоритм: A = A - 5. A=10. Результат?",
            answers: ["5", "15", "10"],
            correctIndex: 0
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function runAlgorithm(task) {
        const { A, B, operation, start, end, target, array, sorted, n } = task;
        
        if (operation === 'A + B') return A + B;
        if (operation === 'A > B ? 1 : 0') return A > B ? 1 : 0;
        if (operation === 'A * 2') return A * 2;
        if (operation === 'A - 5') return A - 5;
        if (operation === 'factorial(n)') {
            let result = 1;
            for (let i = 2; i <= n; i++) result *= i;
            return result;
        }
        return null;
    }

    function generateTask() {
        const task = getRandomTask();
        
        return {
            id: 12,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            runAlgorithm: function(algo, params) {
                return runAlgorithm({...algo, ...params});
            }
        };
    }

    window.VPR7_Task12_Generator = generateTask;
})();