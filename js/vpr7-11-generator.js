// Модуль генератора заданий для vpr7-11
// Задание 11: Логические схемы

(function() {
    'use strict';

    // Формулы логических операций
    const AND = (a, b) => a && b;
    const OR = (a, b) => a || b;
    const NOT = (a) => !a;
    const XOR = (a, b) => a !== b;
    const NAND = (a, b) => !(a && b);
    const NOR = (a, b) => !(a || b);

    // Задачи
    const TASKS = [
        {
            expression: 'A AND B',
            A: 1,
            B: 0,
            result: 0,
            question: "Логическое выражение: A AND B. A=1, B=0. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        },
        {
            expression: 'A OR B',
            A: 0,
            B: 0,
            result: 0,
            question: "Логическое выражение: A OR B. A=0, B=0. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        },
        {
            expression: 'NOT A',
            A: 1,
            result: 0,
            question: "Логическое выражение: NOT A. A=1. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        },
        {
            expression: 'A XOR B',
            A: 1,
            B: 1,
            result: 0,
            question: "Логическое выражение: A XOR B. A=1, B=1. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        },
        {
            expression: 'NAND(A, B)',
            A: 1,
            B: 1,
            result: 0,
            question: "Логическое выражение: NAND(A, B). A=1, B=1. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        },
        {
            expression: 'NOR(A, B)',
            A: 0,
            B: 0,
            result: 1,
            question: "Логическое выражение: NOR(A, B). A=0, B=0. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 1
        },
        {
            expression: '(A AND B) OR (NOT C)',
            A: 1,
            B: 1,
            C: 0,
            result: 1,
            question: "Логическое выражение: (A AND B) OR (NOT C). A=1, B=1, C=0. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 1
        },
        {
            expression: 'NOT (A OR B)',
            A: 0,
            B: 1,
            result: 0,
            question: "Логическое выражение: NOT (A OR B). A=0, B=1. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        },
        {
            expression: 'A AND (B OR C)',
            A: 1,
            B: 0,
            C: 1,
            result: 1,
            question: "Логическое выражение: A AND (B OR C). A=1, B=0, C=1. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 1
        },
        {
            expression: '(A OR B) AND (NOT C)',
            A: 1,
            B: 0,
            C: 1,
            result: 0,
            question: "Логическое выражение: (A OR B) AND (NOT C). A=1, B=0, C=1. Результат?",
            answers: ["0", "1", "Не определено"],
            correctIndex: 0
        }
    ];

    function getRandomTask() {
        const index = Math.floor(Math.random() * TASKS.length);
        return TASKS[index];
    }

    function evaluateExpression(expression, A, B, C) {
        const notA = NOT(A);
        const notB = NOT(B);
        const notC = NOT(C);
        const andAB = AND(A, B);
        const orAB = OR(A, B);
        const orBC = OR(B, C);
        const xorAB = XOR(A, B);
        const nandAB = NAND(A, B);
        const norAB = NOR(A, B);

        return {
            andAB, orAB, notA, notB, notC,
            xorAB, nandAB, norAB,
            expression, A, B, C
        };
    }

    function generateTask() {
        const task = getRandomTask();
        const evaluation = evaluateExpression(task.expression, task.A, task.B, task.C);
        
        return {
            id: 11,
            task: task.question,
            answers: task.answers,
            correctIndex: task.correctIndex,
            evaluateExpression: function(expr, a, b, c = 0) {
                return evaluateExpression(expr, a, b, c);
            }
        };
    }

    window.VPR7_Task11_Generator = generateTask;
})();