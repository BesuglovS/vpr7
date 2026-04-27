/**
 * VPR 8 Class - Task Generator for print variants
 * Supports tasks 1-10 for 8th grade
 */

// ============================================
// Helper functions
// ============================================

function randomInt8(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice8(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray8(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================
// Task 1: Number Systems (Системы счисления)
// ============================================
function generateTask1() {
  const bases = [2, 3, 4, 5, 6, 7, 8, 9];
  const base = randomChoice8(bases);
  const decimal = randomInt8(20, 200);
  const result = decimal.toString(base).toUpperCase();
  return {
    text: `Переведите число <b>${decimal}</b> из десятичной системы счисления в систему с основанием <b>${base}</b>.<br>В ответе запишите полученное число.`,
    answer: result,
    type: "строка",
  };
}

// ============================================
// Task 2: Number Comparison (Сравнение чисел)
// ============================================
function generateTask2() {
  const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16];
  const base1 = randomChoice8(bases);
  let base2 = randomChoice8(bases);
  while (base2 === base1) {
    base2 = randomChoice8(bases);
  }

  const num1 = randomInt8(20, 200);
  const num2 = randomInt8(20, 200);

  const str1 = num1.toString(base1).toUpperCase();
  const str2 = num2.toString(base2).toUpperCase();

  const decimal1 = parseInt(str1, base1);
  const decimal2 = parseInt(str2, base2);

  let comparison;
  if (decimal1 > decimal2) comparison = ">";
  else if (decimal1 < decimal2) comparison = "<";
  else comparison = "=";

  return {
    text: `Сравните числа <b>${str1}_${base1}</b> и <b>${str2}_${base2}</b>.<br>В ответе запишите знак сравнения (> , < или =).`,
    answer: comparison,
    type: "строка",
  };
}

// ============================================
// Task 3: Addition in Number Systems (Сложение)
// ============================================
function generateTask3(usedBases = []) {
  let base;
  const possibleBases = [2, 3, 4, 5, 6, 7, 8, 9];
  // Ensure variety: prefer unused bases, fallback to random
  const unused = possibleBases.filter((b) => !usedBases.includes(b));
  if (unused.length > 0) {
    base = randomChoice8(unused);
  } else {
    base = randomChoice8(possibleBases);
  }

  const maxDec = base * base * 2;
  const num1 = randomInt8(10, Math.min(maxDec, 200));
  const num2 = randomInt8(10, Math.min(maxDec, 200));

  const s1 = num1.toString(base).toUpperCase();
  const s2 = num2.toString(base).toUpperCase();
  const sum = num1 + num2;
  const sResult = sum.toString(base).toUpperCase();

  return {
    text: `Выполните сложение: <b>${s1}_${base} + ${s2}_${base}</b>.<br>Ответ запишите в системе счисления с основанием ${base}.`,
    answer: sResult,
    type: "строка",
    base: base,
  };
}

// ============================================
// Task 4: Subtraction in Number Systems (Вычитание)
// ============================================
function generateTask4(usedBases = []) {
  let base;
  const possibleBases = [2, 3, 4, 5, 6, 7, 8, 9];
  const unused = possibleBases.filter((b) => !usedBases.includes(b));
  if (unused.length > 0) {
    base = randomChoice8(unused);
  } else {
    base = randomChoice8(possibleBases);
  }

  const maxDec = base * base * 2;
  const num1 = randomInt8(20, Math.min(maxDec, 200));
  const num2 = randomInt8(10, num1 - 1);

  const s1 = num1.toString(base).toUpperCase();
  const s2 = num2.toString(base).toUpperCase();
  const diff = num1 - num2;
  const sResult = diff.toString(base).toUpperCase();

  return {
    text: `Выполните вычитание: <b>${s1}_${base} - ${s2}_${base}</b>.<br>Ответ запишите в системе счисления с основанием ${base}.`,
    answer: sResult,
    type: "строка",
    base: base,
  };
}

// ============================================
// Task 5: Logical Statements (Логические высказывания)
// ============================================
function generateTask5() {
  // Define variables for logical expressions
  const variables = [
    { letter: "A", text: "первая буква гласная" },
    { letter: "B", text: "вторая буква гласная" },
    { letter: "C", text: "третья буква гласная" },
    { letter: "D", text: "первая буква согласная" },
    { letter: "E", text: "последняя буква гласная" },
    { letter: "F", text: "последняя буква согласная" },
    { letter: "G", text: "в слове есть буква 'а'" },
    { letter: "H", text: "в слове есть буква 'о'" },
    { letter: "I", text: "длина слова чётная" },
    { letter: "J", text: "длина слова нечётная" },
  ];

  // Fixed word list for consistency
  const words = [
    "арбуз",
    "банан",
    "виноград",
    "груша",
    "дыня",
    "ежевика",
    "земляника",
    "ирис",
    "капуста",
    "лимон",
    "малина",
    "морковь",
    "огурец",
    "помидор",
    "редис",
    "свекла",
    "тыква",
    "финик",
    "хурма",
    "чеснок",
    "щавель",
    "яблоко",
  ];

  const word = randomChoice8(words);

  // Determine truth values for all variables
  function getTruthValues(w) {
    const isFirstVowel = /^[аеёиоуыэюя]/i.test(w[0]);
    const isSecondVowel = w.length > 1 ? /^[аеёиоуыэюя]/i.test(w[1]) : false;
    const isThirdVowel = w.length > 2 ? /^[аеёиоуыэюя]/i.test(w[2]) : false;
    const lastChar = w[w.length - 1];
    const isLastVowel = /[аеёиоуыэюя]/i.test(lastChar);
    const hasA = w.includes("а");
    const hasO = w.includes("о");
    const evenLen = w.length % 2 === 0;

    return {
      A: isFirstVowel,
      B: isSecondVowel,
      C: isThirdVowel,
      D: !isFirstVowel,
      E: isLastVowel,
      F: !isLastVowel,
      G: hasA,
      H: hasO,
      I: evenLen,
      J: !evenLen,
    };
  }

  const tv = getTruthValues(word);

  // Generate random expression
  // Use 2-3 variables with AND, OR, NOT
  const exprTypes = [
    // Format: { text: string, evaluate: function }
    () => {
      // Single variable
      const v = randomChoice8(variables);
      return {
        text: v.text,
        eval: tv[v.letter],
      };
    },
    () => {
      // NOT variable
      const v = randomChoice8(variables);
      return {
        text: `НЕ (${v.text})`,
        eval: !tv[v.letter],
      };
    },
    () => {
      // var AND var
      const v1 = randomChoice8(variables);
      let v2 = randomChoice8(variables);
      while (v2.letter === v1.letter) {
        v2 = randomChoice8(variables);
      }
      return {
        text: `(${v1.text}) И (${v2.text})`,
        eval: tv[v1.letter] && tv[v2.letter],
      };
    },
    () => {
      // var OR var
      const v1 = randomChoice8(variables);
      let v2 = randomChoice8(variables);
      while (v2.letter === v1.letter) {
        v2 = randomChoice8(variables);
      }
      return {
        text: `(${v1.text}) ИЛИ (${v2.text})`,
        eval: tv[v1.letter] || tv[v2.letter],
      };
    },
    () => {
      // NOT (var AND var)
      const v1 = randomChoice8(variables);
      let v2 = randomChoice8(variables);
      while (v2.letter === v1.letter) {
        v2 = randomChoice8(variables);
      }
      return {
        text: `НЕ ((${v1.text}) И (${v2.text}))`,
        eval: !(tv[v1.letter] && tv[v2.letter]),
      };
    },
    () => {
      // NOT (var OR var)
      const v1 = randomChoice8(variables);
      let v2 = randomChoice8(variables);
      while (v2.letter === v1.letter) {
        v2 = randomChoice8(variables);
      }
      return {
        text: `НЕ ((${v1.text}) ИЛИ (${v2.text}))`,
        eval: !(tv[v1.letter] || tv[v2.letter]),
      };
    },
    () => {
      // (NOT var) AND var
      const v1 = randomChoice8(variables);
      let v2 = randomChoice8(variables);
      while (v2.letter === v1.letter) {
        v2 = randomChoice8(variables);
      }
      return {
        text: `(НЕ (${v1.text})) И (${v2.text})`,
        eval: !tv[v1.letter] && tv[v2.letter],
      };
    },
    () => {
      // (var AND NOT var) - always false (contradiction)
      const v = randomChoice8(variables);
      return {
        text: `(${v.text}) И (НЕ (${v.text}))`,
        eval: false,
      };
    },
    () => {
      // (var OR NOT var) - always true (tautology)
      const v = randomChoice8(variables);
      return {
        text: `(${v.text}) ИЛИ (НЕ (${v.text}))`,
        eval: true,
      };
    },
    () => {
      // Three variables: (A AND B) OR C
      const v1 = randomChoice8(variables);
      let v2 = randomChoice8(variables);
      while (v2.letter === v1.letter) v2 = randomChoice8(variables);
      let v3 = randomChoice8(variables);
      while (v3.letter === v1.letter || v3.letter === v2.letter)
        v3 = randomChoice8(variables);
      if (Math.random() < 0.5) {
        return {
          text: `((${v1.text}) И (${v2.text})) ИЛИ (${v3.text})`,
          eval: (tv[v1.letter] && tv[v2.letter]) || tv[v3.letter],
        };
      } else {
        return {
          text: `((${v1.text}) ИЛИ (${v2.text})) И (${v3.text})`,
          eval: (tv[v1.letter] || tv[v2.letter]) && tv[v3.letter],
        };
      }
    },
  ];

  const expr = randomChoice8(exprTypes)();
  const isTrue = expr.eval;

  return {
    text: `Для слова «<b>${word}</b>» определите значение высказывания:<br><b>${expr.text}</b><br>В ответе запишите <b>1</b> (если истина) или <b>0</b> (если ложь).`,
    answer: isTrue ? "1" : "0",
    type: "строка",
  };
}

// ============================================
// Task 6: Truth Tables (Таблицы истинности)
// ============================================
function generateTask6() {
  // Generate a logical expression with 3 variables (A, B, C)
  // and compute the truth table, ask for specific row

  const expressions = [
    {
      text: "(A ∧ B) ∨ C",
      eval: (a, b, c) => (a && b) || c,
    },
    {
      text: "A ∧ (B ∨ C)",
      eval: (a, b, c) => a && (b || c),
    },
    {
      text: "(A ∨ B) ∧ C",
      eval: (a, b, c) => (a || b) && c,
    },
    {
      text: "A ∨ (B ∧ C)",
      eval: (a, b, c) => a || (b && c),
    },
    {
      text: "¬(A ∧ B) ∨ C",
      eval: (a, b, c) => !(a && b) || c,
    },
    {
      text: "¬(A ∨ B) ∧ C",
      eval: (a, b, c) => !(a || b) && c,
    },
    {
      text: "A ∧ ¬(B ∨ C)",
      eval: (a, b, c) => a && !(b || c),
    },
    {
      text: "A ∨ ¬(B ∧ C)",
      eval: (a, b, c) => a || !(b && c),
    },
    {
      text: "(¬A ∨ B) ∧ C",
      eval: (a, b, c) => (!a || b) && c,
    },
    {
      text: "¬(A ∧ B ∧ C)",
      eval: (a, b, c) => !(a && b && c),
    },
  ];

  const expr = randomChoice8(expressions);

  // Pick a random row (0-7)
  const rowNum = randomInt8(0, 7);
  const a = !!(rowNum & 4);
  const b = !!(rowNum & 2);
  const c = !!(rowNum & 1);
  const result = expr.eval(a, b, c) ? 1 : 0;

  // Build truth table row header
  const aVal = a ? 1 : 0;
  const bVal = b ? 1 : 0;
  const cVal = c ? 1 : 0;

  // Add naming for the table
  return {
    text: `Постройте таблицу истинности для выражения <b>${expr.text}</b>.<br>Укажите значение выражения для набора переменных: <b>A=${aVal}, B=${bVal}, C=${cVal}</b>.<br>(Запишите <b>1</b> — истина, <b>0</b> — ложь)`,
    answer: String(result),
    type: "строка",
  };
}

// ============================================
// Task 7: Algorithm Executor (Исполнитель)
// ============================================
function generateTask7() {
  // Command definitions
  const commands = [
    {
      id: "add",
      name: "прибавь",
      symbol: "+",
      hasParam: true,
      paramRange: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      apply: (val, p) => val + p,
    },
    {
      id: "sub",
      name: "вычти",
      symbol: "\u2212",
      hasParam: true,
      paramRange: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      apply: (val, p) => val - p,
    },
    {
      id: "mul",
      name: "умножь на",
      symbol: "\u00d7",
      hasParam: true,
      paramRange: [2, 3, 4, 5, 6, 7, 8, 9],
      apply: (val, p) => val * p,
    },
    {
      id: "div",
      name: "раздели на",
      symbol: "\u00f7",
      hasParam: true,
      paramRange: [2, 3, 4, 5, 10],
      apply: (val, p) => (val % p === 0 ? val / p : null),
    },
    {
      id: "sqr",
      name: "возведи в квадрат",
      symbol: "\u00b2",
      hasParam: false,
      apply: (val) => val * val,
    },
    {
      id: "appendR",
      name: "припиши справа",
      symbol: "\u2192",
      hasParam: true,
      paramRange: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      apply: (val, p) => val * 10 + p,
    },
  ];

  // Try to generate a valid task
  for (let attempt = 0; attempt < 200; attempt++) {
    // Pick 2 different commands
    const selectedCmds = shuffleArray8([...commands]).slice(0, 2);

    // Determine number of steps: 4 or 5
    const maxSteps = randomChoice8([4, 5]);

    // Generate start number in a reasonable range
    const start = randomInt8(2, 50);

    // BFS to find a valid path
    const queue = [{ val: start, path: [], steps: 0 }];
    const visited = new Set();
    let solutions = [];

    while (queue.length > 0) {
      const { val, path, steps } = queue.shift();
      const key = `${val}_${steps}`;

      if (visited.has(key)) continue;
      visited.add(key);

      if (steps >= maxSteps) continue;

      for (let ci = 0; ci < selectedCmds.length; ci++) {
        const cmd = selectedCmds[ci];
        const cmdNum = ci + 1;

        if (cmd.hasParam) {
          const paramValues = cmd.paramRange;
          for (let pi = 0; pi < paramValues.length; pi++) {
            const param = paramValues[pi];
            const newVal = cmd.apply(val, param);
            if (newVal === null || newVal < 0 || newVal > 200) continue;
            if (!Number.isInteger(newVal)) continue;

            const newPath = [...path, { cmd: cmd, param: param, num: cmdNum }];
            const newSteps = steps + 1;

            if (newSteps === maxSteps) {
              if (newVal !== start && newVal >= 0 && newVal <= 200) {
                solutions.push({ val: newVal, path: newPath });
              }
            } else {
              queue.push({ val: newVal, path: newPath, steps: newSteps });
            }
          }
        } else {
          // No-param command (sqr)
          const newVal = cmd.apply(val);
          if (newVal === null || newVal < 0 || newVal > 200) continue;
          if (!Number.isInteger(newVal)) continue;

          const newPath = [...path, { cmd: cmd, param: null, num: cmdNum }];
          const newSteps = steps + 1;

          if (newSteps === maxSteps) {
            if (newVal !== start && newVal >= 0 && newVal <= 200) {
              solutions.push({ val: newVal, path: newPath });
            }
          } else {
            queue.push({ val: newVal, path: newPath, steps: newSteps });
          }
        }
      }
    }

    // Filter solutions: must use both command types AND have consistent params
    // (each command number must use the SAME parameter value throughout)
    if (solutions.length > 0) {
      // Filter out solutions with only one command type
      let mixedSolutions = solutions.filter((s) => {
        const nums = s.path.map((p) => p.num);
        const uniqueNums = new Set(nums);
        return uniqueNums.size > 1;
      });
      if (mixedSolutions.length === 0) continue;

      // Further filter: each command must use the SAME parameter value for all its occurrences
      let consistentSolutions = mixedSolutions.filter((s) => {
        const paramByNum = {};
        for (const p of s.path) {
          if (p.param === null) continue; // no-param commands (sqr) are ok
          if (paramByNum[p.num] === undefined) {
            paramByNum[p.num] = p.param;
          } else if (paramByNum[p.num] !== p.param) {
            return false; // same cmd number used with different params!
          }
        }
        return true;
      });

      if (consistentSolutions.length === 0) continue;
      const solution = randomChoice8(consistentSolutions);
      const targetVal = solution.val;
      const solutionPath = solution.path;

      // Build command descriptions with actual parameters (now consistent since we filtered)
      const paramMap = {};
      solutionPath.forEach((p) => {
        paramMap[p.num] = p.param;
      });

      const actualCmdTexts = selectedCmds.map((cmd, idx) => {
        const num = idx + 1;
        if (cmd.hasParam) {
          const param = paramMap[num];
          if (param !== undefined) {
            return `${num}. ${cmd.name} ${param}`;
          }
        }
        return `${num}. ${cmd.name}`;
      });

      const answerStr = solutionPath.map((p) => p.num).join("");

      // Generate example matching the actual answer length
      const exampleStr = answerStr.length === 5 ? "12121" : "1212";

      let taskText = `У исполнителя есть две команды:<br>`;
      actualCmdTexts.forEach((t) => {
        taskText += `${t}<br>`;
      });
      taskText += `Составьте программу, содержащую не более <b>${answerStr.length} команд</b>, которая преобразует число <b>${start}</b> в число <b>${targetVal}</b>.<br>`;
      taskText += `В ответе укажите последовательность номеров команд (например: ${exampleStr}).`;

      return { text: taskText, answer: answerStr, type: "строка" };
    }
  }

  // Fallback with a well-known example (fixed: start=3, target=26, answer "2212")
  // 3 * 2 = 6, 6 * 2 = 12, 12 + 1 = 13, 13 * 2 = 26
  return {
    text: "У исполнителя есть две команды:<br>1. прибавь 1<br>2. умножь на 2<br><br>Составьте программу, содержащую не более 4 команд, которая преобразует число <b>3</b> в число <b>26</b>.<br>В ответе укажите последовательность номеров команд (например: 1212).",
    answer: "2212",
    type: "строка",
  };
}

// ============================================
// Task 8: Draftsman Executor (Чертёжник)
// ============================================
function generateTask8() {
  // Generate algorithm with loop and shifts
  function randomShift() {
    const val = Math.floor(Math.random() * 9) + 1;
    return Math.random() < 0.5 ? -val : val;
  }

  function formatShift(dx, dy) {
    const sx = dx >= 0 ? "+" : "";
    const sy = dy >= 0 ? "+" : "";
    return `(${sx}${dx}, ${sy}${dy})`;
  }

  function generateAlgo() {
    const loopCount = Math.floor(Math.random() * 3) + 2; // 2-4
    const cmd1_dx = randomShift();
    const cmd1_dy = randomShift();
    const cmd2_dx = randomShift();
    const cmd2_dy = randomShift();

    const loopDx = cmd1_dx + cmd2_dx;
    const loopDy = cmd1_dy + cmd2_dy;
    let totalDx = loopDx * loopCount;
    let totalDy = loopDy * loopCount;

    // Optionally add an extra shift before or after the loop
    const extraShift = Math.random() < 0.7;
    let extraDx = 0,
      extraDy = 0;
    let shiftBefore = true;

    if (extraShift) {
      extraDx = randomShift();
      extraDy = randomShift();
      shiftBefore = Math.random() < 0.5;
      // Cap total so it's within -20 to 20
      if (
        Math.abs(totalDx + extraDx) > 20 ||
        Math.abs(totalDy + extraDy) > 20
      ) {
        extraDx = 0;
        extraDy = 0;
      } else {
        totalDx += extraDx;
        totalDy += extraDy;
      }
    }

    return {
      loopCount,
      cmds: [
        { dx: cmd1_dx, dy: cmd1_dy },
        { dx: cmd2_dx, dy: cmd2_dy },
      ],
      extraDx,
      extraDy,
      shiftBefore,
      extraShift,
      totalDx,
      totalDy,
    };
  }

  // Generate 4 options: 1 correct + 3 wrong (all single commands)
  function generateOptions(correctDx, correctDy) {
    const options = new Set();
    options.add(`Сместиться на ${formatShift(correctDx, correctDy)}`);

    // Generate 3 wrong options
    const wrongAttempts = 0;
    while (options.size < 4) {
      // Wrong options: single-command responses
      const algo = generateAlgo();
      const opt = `Сместиться на ${formatShift(algo.totalDx, algo.totalDy)}`;
      if (opt !== options.values().next().value) {
        options.add(opt);
      }
    }

    return shuffleArray8([...options]);
  }

  // Generate the task
  for (let attempt = 0; attempt < 50; attempt++) {
    const algo = generateAlgo();
    const correctAnswer = `Сместиться на ${formatShift(algo.totalDx, algo.totalDy)}`;
    const options = generateOptions(algo.totalDx, algo.totalDy);
    const answerIndex = options.indexOf(correctAnswer);

    if (answerIndex !== -1) {
      let algoText = `Повтори ${algo.loopCount} раз<br>`;
      algoText += `&nbsp;&nbsp;Сместиться на ${formatShift(algo.cmds[0].dx, algo.cmds[0].dy)}<br>`;
      algoText += `&nbsp;&nbsp;Сместиться на ${formatShift(algo.cmds[1].dx, algo.cmds[1].dy)}<br>`;

      if (algo.extraShift && algo.shiftBefore) {
        algoText =
          `Сместиться на ${formatShift(algo.extraDx, algo.extraDy)}<br>` +
          algoText;
      }

      if (algo.extraShift && !algo.shiftBefore) {
        algoText =
          algoText +
          `Сместиться на ${formatShift(algo.extraDx, algo.extraDy)}<br>`;
      }

      const optionLetters = ["А", "Б", "В", "Г"];
      let taskText = `Исполнитель Чертёжник перемещается на координатной плоскости. У Чертёжника есть команда «Сместиться на (x, y)».<br><br>`;
      taskText += `Чертёжнику был дан для исполнения алгоритм:<br><br>`;
      taskText += algoText + `<br>`;
      taskText += `Какую команду надо выполнить Чертёжнику вместо данной алгоритмической конструкции, чтобы Чертёжник оказался в той же точке, что и после выполнения алгоритма?<br><br>`;
      options.forEach((opt, i) => {
        taskText += `<b>${optionLetters[i]}</b>) ${opt}<br>`;
      });

      return {
        text: taskText,
        answer: optionLetters[answerIndex],
        type: "строка",
      };
    }
  }

  // Fallback
  return {
    text: "Исполнитель Чертёжник перемещается на координатной плоскости. У Чертёжника есть команда «Сместиться на (x, y)».<br><br>Чертёжнику был дан для исполнения алгоритм:<br><br>Повтори 3 раз<br>&nbsp;&nbsp;Сместиться на (-1, 2)<br>&nbsp;&nbsp;Сместиться на (3, -1)<br><br>Какую команду надо выполнить Чертёжнику вместо данной алгоритмической конструкции, чтобы Чертёжник оказался в той же точке, что и после выполнения алгоритма?<br><br><b>А</b>) Сместиться на (6, 3)<br><b>Б</b>) Сместиться на (7, 4)<br><b>В</b>) Сместиться на (10, 5)<br><b>Г</b>) Сместиться на (12, 2)",
    answer: "А",
    type: "строка",
  };
}

// ============================================
// Task 9: Program Analysis (Анализ программ)
// ============================================
function generateTask9() {
  // Generate a simple algorithm with conditional
  const varName = randomChoice8(["a", "b", "c", "x", "y", "z"]);
  const varName2 = randomChoice8(["a", "b", "c", "x", "y", "z"]);
  const varName3 = randomChoice8(["m", "n", "k", "p", "q", "r"]);

  const inputVal = randomInt8(1, 15);

  // Algorithm types
  const algTypes = [
    // Type 1: read n, compute factorial-like
    () => {
      const n = randomInt8(3, 8);
      let result = 0;
      for (let i = 1; i <= n; i++) {
        result += i;
      }
      return {
        desc: `Объявили переменную ${varName} = 0.`,
        code: `${varName} = 0<br>нц для i от 1 до ${n}<br>&nbsp;&nbsp;${varName} = ${varName} + i<br>кц`,
        answer: String(result),
      };
    },
    // Type 2: read number, apply condition
    () => {
      const threshold = randomInt8(3, 10);
      const addVal = randomInt8(2, 9);
      const subVal = randomInt8(2, 9);
      const input = randomInt8(1, 20);
      let result;
      if (input > threshold) {
        result = input + addVal;
      } else {
        result = input - subVal;
      }
      return {
        desc: `Дано число <b>${input}</b>.`,
        code: `если ${varName} > ${threshold}<br>&nbsp;&nbsp;то ${varName} = ${varName} + ${addVal}<br>&nbsp;&nbsp;иначе ${varName} = ${varName} - ${subVal}<br>все`,
        answer: String(result),
      };
    },
    // Type 2b: compound condition (and/or)
    () => {
      const t1 = randomInt8(2, 7);
      const t2 = randomInt8(8, 15);
      const addVal = randomInt8(3, 9);
      const input = randomInt8(1, 20);
      let result = input;
      if (input > t1 && input < t2) {
        result = input + addVal;
      }
      return {
        desc: `Дано число <b>${input}</b>.`,
        code: `${varName} = ${input}<br>если ${varName} > ${t1} и ${varName} < ${t2}<br>&nbsp;&nbsp;то ${varName} = ${varName} + ${addVal}<br>все`,
        answer: String(result),
      };
    },
    // Type 3: loop with multiplication
    () => {
      const n = randomInt8(2, 5);
      const factor = randomInt8(2, 4);
      let result = 1;
      for (let i = 1; i <= n; i++) {
        result *= factor;
      }
      return {
        desc: `Объявили переменную ${varName} = 1.`,
        code: `${varName} = 1<br>нц для i от 1 до ${n}<br>&nbsp;&nbsp;${varName} = ${varName} * ${factor}<br>кц`,
        answer: String(result),
      };
    },
    // Type 4: conditional in loop
    () => {
      const limit = randomInt8(5, 15);
      const step = randomInt8(2, 5);
      let result = 0;
      for (let i = 1; i <= limit; i++) {
        if (i % step === 0) {
          result++;
        }
      }
      return {
        desc: `Объявили переменную ${varName} = 0.`,
        code: `${varName} = 0<br>нц для i от 1 до ${limit}<br>&nbsp;&nbsp;если mod(i, ${step}) = 0<br>&nbsp;&nbsp;&nbsp;&nbsp;то ${varName} = ${varName} + 1<br>&nbsp;&nbsp;все<br>кц`,
        answer: String(result),
      };
    },
    // Type 5: while loop
    () => {
      const start = randomInt8(20, 50);
      const sub = randomInt8(2, 5);
      let val = start;
      let count = 0;
      while (val > 0) {
        val -= sub;
        count++;
      }
      return {
        desc: `Объявили переменную ${varName} = ${start}.`,
        code: `${varName} = ${start}<br>${varName3} = 0<br>нц пока ${varName} > 0<br>&nbsp;&nbsp;${varName} = ${varName} - ${sub}<br>&nbsp;&nbsp;${varName3} = ${varName3} + 1<br>кц`,
        answer: String(count),
      };
    },
  ];

  const alg = randomChoice8(algTypes)();

  let taskText = `Определите значение переменной после выполнения алгоритма.<br><br>`;
  if (alg.desc) {
    taskText += alg.desc + `<br>`;
  }
  taskText += alg.code;

  return {
    text: taskText,
    answer: alg.answer,
    type: "строка",
  };
}

// ============================================
// Task 10: Complex Truth Tables (Сложные таблицы истинности)
// ============================================
function generateTask10() {
  // Generate a logical expression with 4 variables (A, B, C, D)
  const expressions = [
    {
      text: "(A ∧ B) ∨ (C ∧ D)",
      eval: (a, b, c, d) => (a && b) || (c && d),
    },
    {
      text: "(A ∨ B) ∧ (C ∨ D)",
      eval: (a, b, c, d) => (a || b) && (c || d),
    },
    {
      text: "¬(A ∧ B) ∨ (C ∨ D)",
      eval: (a, b, c, d) => !(a && b) || c || d,
    },
    {
      text: "(A ∨ B) ∧ ¬(C ∧ D)",
      eval: (a, b, c, d) => (a || b) && !(c && d),
    },
    {
      text: "A ∧ (B ∨ C) ∧ D",
      eval: (a, b, c, d) => a && (b || c) && d,
    },
    {
      text: "¬A ∨ (B ∧ ¬C) ∨ D",
      eval: (a, b, c, d) => !a || (b && !c) || d,
    },
    {
      text: "(A ∨ ¬B) ∧ (C ∨ ¬D)",
      eval: (a, b, c, d) => (a || !b) && (c || !d),
    },
    {
      text: "¬(A ∨ B) ∨ ¬(C ∨ D)",
      eval: (a, b, c, d) => !(a || b) || !(c || d),
    },
  ];

  const expr = randomChoice8(expressions);

  // Pick a random row (0-15), but ensure it's not the first row (0,0,0,0) always
  const rowNum = randomInt8(0, 15);
  const a = !!(rowNum & 8);
  const b = !!(rowNum & 4);
  const c = !!(rowNum & 2);
  const d = !!(rowNum & 1);
  const result = expr.eval(a, b, c, d) ? 1 : 0;

  const aVal = a ? 1 : 0;
  const bVal = b ? 1 : 0;
  const cVal = c ? 1 : 0;
  const dVal = d ? 1 : 0;

  return {
    text: `Постройте таблицу истинности для выражения <b>${expr.text}</b>.<br>Укажите значение выражения для набора переменных: <b>A=${aVal}, B=${bVal}, C=${cVal}, D=${dVal}</b>.<br>(Запишите <b>1</b> — истина, <b>0</b> — ложь)`,
    answer: String(result),
    type: "строка",
  };
}
