/**
 * VPR 8 Class - Tasks Generator Module
 * Delegates task generation to individual generator modules
 * for printable PDF variants
 */

// ============================================
// Utility functions
// ============================================
function randomInt8(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice8(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray8(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Unicode subscripts for number bases
const SUB8 = { 2: "\u2082", 8: "\u2088", 16: "\u2081\u2086" };
const BASE_NAMES8 = {
  2: "двоичной",
  8: "восьмеричной",
  16: "шестнадцатеричной",
};

// ============================================
// Task 1: Numeral System Conversion
// ============================================
function generateTask1() {
  const fromDecimal = Math.random() < 0.5;
  const number = randomInt8(1, 1024);
  const bases = [2, 8, 16];
  const targetBase = randomChoice8(bases);

  if (fromDecimal) {
    const result = number.toString(targetBase).toUpperCase();
    const baseNames = {
      2: "двоичную",
      8: "восьмеричную",
      16: "шестнадцатеричную",
    };
    const taskText = `Переведите десятичное число <b>${number}</b> в <b>${baseNames[targetBase]}</b> систему счисления.`;
    return { text: taskText, answer: result, type: "число" };
  } else {
    const sourceBase = randomChoice8(bases.filter((b) => b !== 10));
    const sourceStr = number.toString(sourceBase).toUpperCase();
    const baseNamesFrom = {
      2: "двоичное",
      8: "восьмеричное",
      16: "шестнадцатеричное",
    };
    const taskText = `Переведите ${baseNamesFrom[sourceBase]} число <b>${sourceStr}</b>${SUB8[sourceBase]} в <b>десятичную</b> систему счисления.`;
    return { text: taskText, answer: String(number), type: "число" };
  }
}

// ============================================
// Task 2: Number Comparison
// ============================================
function generateTask2() {
  const systems = [2, 8, 16];
  const leftSystem = randomChoice8(systems);
  const rightSystem = randomChoice8(systems.filter((s) => s !== leftSystem));

  const minValue = randomInt8(40, 139);
  const maxValue = randomInt8(minValue + 20, 230);

  const leftBoundary = minValue.toString(leftSystem).toUpperCase();
  const rightBoundary = maxValue.toString(rightSystem).toUpperCase();

  // Generate 4 candidate numbers in the range
  const candidates = [];
  const step = Math.max(1, Math.floor((maxValue - minValue - 1) / 5));
  for (let val = minValue + 1; val < maxValue; val += step) {
    if (candidates.length < 4) candidates.push(val);
  }
  // Ensure we have exactly 4 candidates
  while (candidates.length < 4) {
    const v = randomInt8(minValue + 1, maxValue - 1);
    if (!candidates.includes(v)) candidates.push(v);
  }

  // Pick the correct answer (first candiate)
  const correctValue = candidates[0];
  const shuffled = shuffleArray8(candidates);
  const correctIndex = shuffled.indexOf(correctValue) + 1;
  const wrongValue1 = randomInt8(0, minValue);
  const wrongValue2 = randomInt8(maxValue + 1, 255);

  // Replace one non-correct candidate with an out-of-range value
  for (let i = 0; i < shuffled.length; i++) {
    if (shuffled[i] !== correctValue) {
      shuffled[i] = i % 2 === 0 ? wrongValue1 : wrongValue2;
      break;
    }
  }

  const options = shuffled.map((v) => v.toString(2).padStart(8, "0"));

  const systemLabels = {
    2: "двоичной",
    8: "восьмеричной",
    16: "шестнадцатеричной",
  };
  const subMarks = { 2: "\u2082", 8: "\u2088", 16: "\u2081\u2086" };

  let taskText = `Какое из чисел, записанных в двоичной системе счисления, удовлетворяет условию<br>`;
  taskText += `<b>${leftBoundary}</b>${subMarks[leftSystem]} <strong><</strong> <em>а</em> <strong><</strong> <b>${rightBoundary}</b>${subMarks[rightSystem]}?<br><br>`;
  options.forEach((opt, i) => {
    taskText += `${i + 1}) ${opt}<br>`;
  });
  taskText += `<br>В ответе запишите номер выбранного варианта.`;

  return { text: taskText, answer: String(correctIndex), type: "номер" };
}

// ============================================
// Task 3: Addition in Number Systems
// ============================================
function generateTask3() {
  const bases = [2, 8, 16];
  const base = randomChoice8(bases);
  const num1 = randomInt8(100, 899);
  const num2 = randomInt8(100, 899);
  const num1Str = num1.toString(base).toUpperCase();
  const num2Str = num2.toString(base).toUpperCase();
  const result = (num1 + num2).toString(base).toUpperCase();

  const taskText = `Выполните сложение: <b>${num1Str}</b>${SUB8[base]} + <b>${num2Str}</b>${SUB8[base]}.<br>Ответ запишите в <b>${BASE_NAMES8[base]}</b> системе счисления. Основание системы писать не нужно.`;

  return { text: taskText, answer: result, type: "число" };
}

// ============================================
// Task 4: Subtraction in Number Systems
// ============================================
function generateTask4() {
  const bases = [2, 8, 16];
  const base = randomChoice8(bases);
  const num1 = randomInt8(200, 999);
  const num2 = randomInt8(10, num1 - 50);
  const num1Str = num1.toString(base).toUpperCase();
  const num2Str = num2.toString(base).toUpperCase();
  const result = (num1 - num2).toString(base).toUpperCase();

  const taskText = `Выполните вычитание: <b>${num1Str}</b>${SUB8[base]} \u2013 <b>${num2Str}</b>${SUB8[base]}.<br>Ответ запишите в <b>${BASE_NAMES8[base]}</b> системе счисления. Основание системы писать не нужно.`;

  return { text: taskText, answer: result, type: "число" };
}

// ============================================
// Task 5: Logical Statements (Names with logic)
// ============================================
function generateTask5() {
  const names = [
    "Анна",
    "Борис",
    "Вера",
    "Глеб",
    "Дарья",
    "Егор",
    "Жанна",
    "Захар",
    "Ирина",
    "Кирилл",
    "Лариса",
    "Максим",
    "Наталья",
    "Олег",
    "Полина",
    "Роман",
    "Светлана",
    "Тимур",
    "Ульяна",
    "Фёдор",
    "Харитон",
    "Цветана",
    "Чеслав",
    "Шамиль",
  ];
  const vowels = ["А", "Е", "Ё", "И", "О", "У", "Ы", "Э", "Ю", "Я"];

  function isVowel(ch) {
    return vowels.includes(ch.toUpperCase());
  }

  function checkName(name, rule) {
    const first = name[0];
    const last = name[name.length - 1];
    const firstVowel = isVowel(first);
    const lastVowel = isVowel(last);

    switch (rule.type) {
      case "OR":
        return firstVowel || lastVowel;
      case "AND":
        return firstVowel && lastVowel;
      case "NOT_FIRST_VOWEL":
        return !firstVowel;
      case "NOT_LAST_VOWEL":
        return !lastVowel;
      case "FIRST_VOWEL_AND_NOT_LAST_VOWEL":
        return firstVowel && !lastVowel;
      case "NOT_FIRST_VOWEL_AND_LAST_VOWEL":
        return !firstVowel && lastVowel;
      case "FIRST_VOWEL_OR_NOT_LAST_VOWEL":
        return firstVowel || !lastVowel;
      case "NOT_FIRST_VOWEL_OR_LAST_VOWEL":
        return !firstVowel || lastVowel;
      default:
        return false;
    }
  }

  const rules = [
    {
      text: "(Первая буква гласная) ИЛИ (Последняя буква гласная)",
      type: "OR",
    },
    { text: "(Первая буква гласная) И (Последняя буква гласная)", type: "AND" },
    { text: "НЕ (Первая буква гласная)", type: "NOT_FIRST_VOWEL" },
    { text: "НЕ (Последняя буква гласная)", type: "NOT_LAST_VOWEL" },
    {
      text: "(Первая буква гласная) И НЕ (Последняя буква гласная)",
      type: "FIRST_VOWEL_AND_NOT_LAST_VOWEL",
    },
    {
      text: "НЕ (Первая буква гласная) И (Последняя буква гласная)",
      type: "NOT_FIRST_VOWEL_AND_LAST_VOWEL",
    },
    {
      text: "(Первая буква гласная) ИЛИ НЕ (Последняя буква гласная)",
      type: "FIRST_VOWEL_OR_NOT_LAST_VOWEL",
    },
    {
      text: "НЕ (Первая буква гласная) ИЛИ (Последняя буква гласная)",
      type: "NOT_FIRST_VOWEL_OR_LAST_VOWEL",
    },
  ];

  const selectedRule = randomChoice8(rules);
  const wantTrue = Math.random() < 0.5;
  const conditionWord = wantTrue ? "ИСТИННО" : "ЛОЖНО";

  // Pick 4 names where exactly one satisfies the condition
  const selectedNames = [];
  let correctName = null;
  let attempts = 0;

  while (attempts < 200) {
    const testName = randomChoice8(names);
    if (selectedNames.includes(testName)) continue;
    const result = checkName(testName, selectedRule);
    if (wantTrue ? result : !result) {
      if (!correctName) {
        correctName = testName;
        selectedNames.push(testName);
      }
    }
    if (selectedNames.length === 4) break;
    if (!selectedNames.includes(testName) && selectedNames.length < 4) {
      // Fill remaining with wrong answers
      const wrongResult = wantTrue ? !result : result;
      if (wrongResult) {
        selectedNames.push(testName);
      }
    }
    attempts++;
  }

  // Ensure we have at least some names
  while (selectedNames.length < 4) {
    const n = randomChoice8(names);
    if (!selectedNames.includes(n)) selectedNames.push(n);
  }

  // Shuffle and find correct index
  const shuffledNames = shuffleArray8([...selectedNames]);
  const correctIndex = shuffledNames.indexOf(correctName) + 1;

  let taskText = `В поле ответа запишите <b>номер</b> имени, для которого <b>${conditionWord}</b> высказывание:<br>`;
  taskText += `<b>${selectedRule.text}</b><br><br>`;
  shuffledNames.forEach((n, i) => {
    taskText += `${i + 1}) ${n}<br>`;
  });

  return { text: taskText, answer: String(correctIndex), type: "номер" };
}

// ============================================
// Task 6: Truth Table (fill in operation columns)
// ============================================
function generateTask6() {
  // Expressions with 2 variables and 2-3 operations
  // Each expression has: display, intermediate ops (headers + eval)
  const expressions = [
    // 2 operations
    {
      display: "A \u2227 \u00acB",
      ops: [
        { header: "\u00acB", eval: (A, B) => 1 - B },
        { header: "A \u2227 \u00acB", eval: (A, B) => A & (1 - B) },
      ],
    },
    {
      display: "\u00acA \u2228 B",
      ops: [
        { header: "\u00acA", eval: (A, B) => 1 - A },
        { header: "\u00acA \u2228 B", eval: (A, B) => (1 - A) | B },
      ],
    },
    {
      display: "A \u2228 \u00acB",
      ops: [
        { header: "\u00acB", eval: (A, B) => 1 - B },
        { header: "A \u2228 \u00acB", eval: (A, B) => A | (1 - B) },
      ],
    },
    {
      display: "\u00acA \u2227 B",
      ops: [
        { header: "\u00acA", eval: (A, B) => 1 - A },
        { header: "\u00acA \u2227 B", eval: (A, B) => (1 - A) & B },
      ],
    },
    {
      display: "\u00ac(A \u2227 B)",
      ops: [
        { header: "A \u2227 B", eval: (A, B) => A & B },
        { header: "\u00ac(A \u2227 B)", eval: (A, B) => 1 - (A & B) },
      ],
    },
    {
      display: "\u00ac(A \u2228 B)",
      ops: [
        { header: "A \u2228 B", eval: (A, B) => A | B },
        { header: "\u00ac(A \u2228 B)", eval: (A, B) => 1 - (A | B) },
      ],
    },
    {
      display: "\u00acA \u2228 \u00acB",
      ops: [
        { header: "\u00acA", eval: (A, B) => 1 - A },
        { header: "\u00acB", eval: (A, B) => 1 - B },
        { header: "\u00acA \u2228 \u00acB", eval: (A, B) => (1 - A) | (1 - B) },
      ],
    },
    {
      display: "\u00acA \u2227 \u00acB",
      ops: [
        { header: "\u00acA", eval: (A, B) => 1 - A },
        { header: "\u00acB", eval: (A, B) => 1 - B },
        { header: "\u00acA \u2227 \u00acB", eval: (A, B) => (1 - A) & (1 - B) },
      ],
    },
    // 3 operations
    {
      display: "\u00ac(A \u2228 \u00acB)",
      ops: [
        { header: "\u00acB", eval: (A, B) => 1 - B },
        { header: "A \u2228 \u00acB", eval: (A, B) => A | (1 - B) },
        {
          header: "\u00ac(A \u2228 \u00acB)",
          eval: (A, B) => 1 - (A | (1 - B)),
        },
      ],
    },
    {
      display: "\u00ac(\u00acA \u2228 B)",
      ops: [
        { header: "\u00acA", eval: (A, B) => 1 - A },
        { header: "\u00acA \u2228 B", eval: (A, B) => (1 - A) | B },
        {
          header: "\u00ac(\u00acA \u2228 B)",
          eval: (A, B) => 1 - ((1 - A) | B),
        },
      ],
    },
    {
      display: "\u00acA \u2228 (A \u2227 B)",
      ops: [
        { header: "A \u2227 B", eval: (A, B) => A & B },
        { header: "\u00acA", eval: (A, B) => 1 - A },
        {
          header: "\u00acA \u2228 (A \u2227 B)",
          eval: (A, B) => (1 - A) | (A & B),
        },
      ],
    },
    {
      display: "\u00acB \u2227 (A \u2228 B)",
      ops: [
        { header: "A \u2228 B", eval: (A, B) => A | B },
        { header: "\u00acB", eval: (A, B) => 1 - B },
        {
          header: "\u00acB \u2227 (A \u2228 B)",
          eval: (A, B) => (1 - B) & (A | B),
        },
      ],
    },
  ];

  const expr = randomChoice8(expressions);
  const rowValues = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  // Compute all operation values
  const allOpValues = [];
  rowValues.forEach(([A, B]) => {
    const rowVals = [];
    expr.ops.forEach((op) => {
      rowVals.push(op.eval(A, B));
    });
    allOpValues.push(rowVals);
  });

  // Build task text: expression + truth table with empty operation columns
  let taskText = `Дано логическое выражение: <b>${expr.display}</b><br><br>`;
  taskText += `Заполните таблицу истинности. В столбцы для логических операций впишите 0 или 1.<br><br>`;

  // Build header row: A | B | (empty columns for operations - wide enough to write expression)
  let headerHtml = '<tr style="font-weight: bold; text-align: center;">';
  headerHtml +=
    '<td style="padding: 8px 12px; border: 1px solid #333; min-height: 40px;">A</td>';
  headerHtml +=
    '<td style="padding: 8px 12px; border: 1px solid #333; min-height: 40px;">B</td>';
  expr.ops.forEach(() => {
    headerHtml +=
      '<td style="padding: 8px 25px; border: 1px solid #333; min-height: 40px;">&nbsp;</td>';
  });
  headerHtml += "</tr>";

  let bodyHtml = "";
  const answerParts = [];

  rowValues.forEach(([A, B], rowIdx) => {
    bodyHtml += "<tr style='text-align: center;'>";
    bodyHtml += `<td style="padding: 8px 12px; border: 1px solid #333;">${A}</td>`;
    bodyHtml += `<td style="padding: 8px 12px; border: 1px solid #333;">${B}</td>`;
    expr.ops.forEach((op, opIdx) => {
      const val = allOpValues[rowIdx][opIdx];
      // Empty cell for student to fill
      bodyHtml += `<td style="padding: 8px 50px; border: 1px solid #333;">&nbsp;</td>`;
      answerParts.push(String(val));
    });
    bodyHtml += "</tr>";
  });

  taskText += '<table style="border-collapse: collapse; margin: 10px 0;">';
  taskText += headerHtml + bodyHtml + "</table>";

  return {
    text: taskText,
    answer: answerParts.join(","),
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
      paramRange: [1, 9],
      apply: (val, p) => val + p,
    },
    {
      id: "sub",
      name: "вычти",
      symbol: "\u2212",
      hasParam: true,
      paramRange: [1, 9],
      apply: (val, p) => val - p,
    },
    {
      id: "mul",
      name: "умножь на",
      symbol: "\u00d7",
      hasParam: true,
      paramRange: [2, 9],
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
      paramRange: [1, 9],
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

    // BFS to find a valid path: we need exact paths of length maxSteps
    // Strategy: instead of random params during BFS, we enumerate reasonable param values
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
          // Try all parameters in the range to find valid ones
          const paramValues = cmd.paramRange;
          for (let pi = 0; pi < paramValues.length; pi++) {
            const param = paramValues[pi];
            const newVal = cmd.apply(val, param);
            if (newVal === null || newVal < 0 || newVal > 200) continue;
            // Ensure integer values
            if (!Number.isInteger(newVal)) continue;

            const newPath = [...path, { cmd: cmd, param: param, num: cmdNum }];
            const newSteps = steps + 1;

            if (newSteps === maxSteps) {
              // Check that the final value differs from start
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

    // Filter solutions: must have unique target values and use both command types
    // Exclude solutions consisting of only one command type (e.g. all "1" or all "2")
    if (solutions.length > 0) {
      // Filter out solutions with only one command type
      const mixedSolutions = solutions.filter((s) => {
        const nums = s.path.map((p) => p.num);
        const uniqueNums = new Set(nums);
        return uniqueNums.size > 1;
      });
      if (mixedSolutions.length === 0) continue; // Retry if no mixed solution found
      // Pick a random solution
      const solution = randomChoice8(mixedSolutions);
      const targetVal = solution.val;
      const solutionPath = solution.path;

      // Build command descriptions with actual parameters
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

  // Fallback with a well-known example
  return {
    text: "У исполнителя есть две команды:<br>1. прибавь 1<br>2. умножь на 2<br><br>Составьте программу, содержащую не более 4 команд, которая преобразует число <b>3</b> в число <b>26</b>.<br>В ответе укажите последовательность номеров команд (например: 1212).",
    answer: "2121",
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
    const options = [{ dx: correctDx, dy: correctDy, correct: true }];
    const used = new Set();
    used.add(`${correctDx},${correctDy}`);

    while (options.length < 4) {
      const strategy = Math.floor(Math.random() * 4);
      let wdx = correctDx;
      let wdy = correctDy;

      switch (strategy) {
        case 0:
          // Change sign of one coordinate
          if (Math.random() < 0.5) wdx = -wdx;
          else wdy = -wdy;
          break;
        case 1:
          // Swap coordinates
          wdx = correctDy;
          wdy = correctDx;
          break;
        case 2:
          // Add/subtract from one coordinate
          if (Math.random() < 0.5) wdx += Math.random() < 0.5 ? 1 : -1;
          else wdy += Math.random() < 0.5 ? 1 : -1;
          break;
        case 3:
          // Change both signs
          wdx = -wdx;
          wdy = -wdy;
          break;
      }

      const key = `${wdx},${wdy}`;
      if (!used.has(key) && !(wdx === 0 && wdy === 0)) {
        used.add(key);
        options.push({ dx: wdx, dy: wdy, correct: false });
      }
    }

    const shuffled = shuffleArray8(options);
    const correctIndex = shuffled.findIndex((o) => o.correct) + 1;
    return { shuffled, correctIndex };
  }

  const algo = generateAlgo();

  // Randomly choose task type: "equivalent" or "return"
  const taskType = Math.random() < 0.5 ? "equivalent" : "return";
  const correctDx = taskType === "return" ? -algo.totalDx : algo.totalDx;
  const correctDy = taskType === "return" ? -algo.totalDy : algo.totalDy;

  const { shuffled, correctIndex } = generateOptions(correctDx, correctDy);

  // Build algorithm text
  let taskText = `Чертёжнику был дан для исполнения следующий алгоритм:<br><br>`;
  if (algo.extraShift && algo.shiftBefore) {
    taskText += `Сместиться на ${formatShift(algo.extraDx, algo.extraDy)}<br>`;
  }
  taskText += `Повтори ${algo.loopCount} раз<br>`;
  taskText += `Сместиться на ${formatShift(algo.cmds[0].dx, algo.cmds[0].dy)}<br>`;
  taskText += `Сместиться на ${formatShift(algo.cmds[1].dx, algo.cmds[1].dy)}<br>`;
  taskText += `Конец<br>`;
  if (algo.extraShift && !algo.shiftBefore) {
    taskText += `Сместиться на ${formatShift(algo.extraDx, algo.extraDy)}<br>`;
  }

  if (taskType === "equivalent") {
    taskText += `<br>Определите, на какую одну команду «Сместиться на (a, b)» можно заменить данный алгоритм, чтобы Чертёжник оказался в той же точке.<br><br>`;
  } else {
    taskText += `<br>Определите, какую одну команду «Сместиться на (a, b)» надо выполнить, чтобы Чертёжник вернулся в исходную точку.<br><br>`;
  }

  shuffled.forEach((o, i) => {
    taskText += `${i + 1}) Сместиться на ${formatShift(o.dx, o.dy)}<br>`;
  });
  taskText += `<br>В ответе запишите номер выбранного варианта.`;

  return { text: taskText, answer: String(correctIndex), type: "номер" };
}

// ============================================
// Task 9: Algorithm Analysis (Program with conditions)
// ============================================
function generateTask9() {
  const COMPARISONS = [
    { op: "<", eval: (a, b) => a < b },
    { op: ">", eval: (a, b) => a > b },
    { op: "<=", eval: (a, b) => a <= b },
    { op: ">=", eval: (a, b) => a >= b },
    { op: "=", eval: (a, b) => a === b },
    { op: "<>", eval: (a, b) => a !== b },
  ];

  const THRESHOLDS = [0, 5, 10, 15, 20, -5, -10, 100];

  const CONDITION_TEMPLATES = [
    {
      text: (a, b) => `${a} and ${b}`,
      eval: (ea, eb) => ea && eb,
      label: (s1, s2) => `${s1} and ${s2}`,
    },
    {
      text: (a, b) => `${a} or ${b}`,
      eval: (ea, eb) => ea || eb,
      label: (s1, s2) => `${s1} or ${s2}`,
    },
    {
      text: (a, b) => `not ${a} and ${b}`,
      eval: (ea, eb) => !ea && eb,
      label: (s1, s2) => `not ${s1} and ${s2}`,
    },
    {
      text: (a, b) => `${a} and not ${b}`,
      eval: (ea, eb) => ea && !eb,
      label: (s1, s2) => `${s1} and not ${s2}`,
    },
    {
      text: (a, b) => `not (${a} and ${b})`,
      eval: (ea, eb) => !(ea && eb),
      label: (s1, s2) => `not (${s1} and ${s2})`,
    },
    {
      text: (a, b) => `not (${a} or ${b})`,
      eval: (ea, eb) => !(ea || eb),
      label: (s1, s2) => `not (${s1} or ${s2})`,
    },
    {
      text: (a, b) => `not ${a} or ${b}`,
      eval: (ea, eb) => !ea || eb,
      label: (s1, s2) => `not ${s1} or ${s2}`,
    },
    {
      text: (a, b) => `${a} or not ${b}`,
      eval: (ea, eb) => ea || !eb,
      label: (s1, s2) => `${s1} or not ${s2}`,
    },
    {
      text: (a, b) => `(not ${a}) or (not ${b})`,
      eval: (ea, eb) => !ea || !eb,
      label: (s1, s2) => `(not ${s1}) or (not ${s2})`,
    },
    {
      text: (a, b) => `(not ${a}) and (not ${b})`,
      eval: (ea, eb) => !ea && !eb,
      label: (s1, s2) => `(not ${s1}) and (not ${s2})`,
    },
  ];

  const t1 = randomChoice8(THRESHOLDS);
  let t2;
  do {
    t2 = randomChoice8(THRESHOLDS);
  } while (t2 === t1);

  const comp1 = randomChoice8(COMPARISONS);
  const comp2 = randomChoice8(COMPARISONS);

  const template = randomChoice8(CONDITION_TEMPLATES);

  const sub1 = `(s ${comp1.op} ${t1})`;
  const sub2 = `(t ${comp2.op} ${t2})`;
  const conditionStr = template.label(sub1, sub2);

  const printNo = Math.random() < 0.5;
  const printResult = printNo ? "NO" : "YES";

  // Generate 5 pairs
  const pairs = [];
  const correctIndices = [];
  for (let i = 0; i < 5; i++) {
    const s = randomInt8(-20, 20);
    const t = randomInt8(-20, 20);
    const eval1 = comp1.eval(s, t1);
    const eval2 = comp2.eval(t, t2);
    const conditionResult = template.eval(eval1, eval2);
    const printsResult = conditionResult ? "NO" : "YES";
    if (printsResult === printResult) correctIndices.push(i + 1);
    pairs.push({ s, t, printsResult });
  }

  // Format pairs as (s,t)
  const pairTexts = pairs.map((p, i) => `${i + 1}) (${p.s}, ${p.t})`);

  // Build Pascal program text
  let pascalText = `var s, t: integer;\nbegin\n`;
  pascalText += `  readln(s);\n`;
  pascalText += `  readln(t);\n`;
  pascalText += `  if ${conditionStr} then\n`;
  pascalText += `    writeln('NO')\n`;
  pascalText += `  else\n`;
  pascalText += `    writeln('YES')\n`;
  pascalText += `end.`;

  // Build Python program text
  const pyCondition = conditionStr
    .replace(/ and /g, " and ")
    .replace(/ or /g, " or ")
    .replace(/not /g, "not ");
  let pythonText = `s = int(input())\n`;
  pythonText += `t = int(input())\n`;
  pythonText += `if ${pyCondition}:\n`;
  pythonText += `    print("NO")\n`;
  pythonText += `else:\n`;
  pythonText += `    print("YES")`;

  let taskText = `Была проведена программа на двух языках программирования:<br><br>`;
  taskText += `<div style="display: flex; gap: 20px; flex-wrap: wrap;">`;
  taskText += `<div style="flex: 1; min-width: 240px;">`;
  taskText += `<div style="font-weight: bold; margin-bottom: 3px;">Pascal:</div>`;
  taskText += `<pre style="font-family: 'Courier New', monospace; background: #f5f5f5; padding: 6px; border-radius: 4px; font-size: 9pt; margin: 0; white-space: pre-wrap; word-break: break-all;">${pascalText}</pre>`;
  taskText += `</div>`;
  taskText += `<div style="flex: 1; min-width: 240px;">`;
  taskText += `<div style="font-weight: bold; margin-bottom: 3px;">Python:</div>`;
  taskText += `<pre style="font-family: 'Courier New', monospace; background: #f5f5f5; padding: 6px; border-radius: 4px; font-size: 9pt; margin: 0; white-space: pre-wrap; word-break: break-all;">${pythonText}</pre>`;
  taskText += `</div>`;
  taskText += `</div><br>`;
  taskText += `Были введены следующие пары чисел (s, t):<br><br>`;
  taskText += pairTexts.join("<br>");
  taskText += `<br><br>Какие из них приведут к выводу "<b>${printResult}</b>"?<br>`;
  taskText += `В ответе запишите номера выбранных пар в порядке возрастания.`;

  return {
    text: taskText,
    answer: correctIndices.join(","),
    type: "строка",
  };
}

// ============================================
// Task 10: Truth Tables (3 variables, complex expressions)
// ============================================
function generateTask10() {
  const VAR_NAMES = ["A", "B", "C"];

  // Expression templates
  const expressionTemplates = [
    {
      display: "\u00ac(A \u2228 C) \u2228 B \u2227 \u00acC",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        {
          header: "A \u2228 C",
          type: "op",
          eval: (r) => (r[0] || r[2] ? 1 : 0),
        },
        {
          header: "\u00ac(A \u2228 C)",
          type: "op",
          eval: (r) => (!(r[0] || r[2]) ? 1 : 0),
        },
        { header: "\u00acC", type: "op", eval: (r) => (!r[2] ? 1 : 0) },
        {
          header: "B \u2227 \u00acC",
          type: "op",
          eval: (r) => (r[1] && !r[2] ? 1 : 0),
        },
        {
          header: "\u00ac(A \u2228 C) \u2228 B \u2227 \u00acC",
          type: "op",
          eval: (r) => (!(r[0] || r[2]) || (r[1] && !r[2]) ? 1 : 0),
        },
      ],
    },
    {
      display: "\u00ac(\u00acA \u2227 B) \u2228 \u00ac(C \u2228 B)",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        {
          header: "\u00acA \u2227 B",
          type: "op",
          eval: (r) => (!r[0] && r[1] ? 1 : 0),
        },
        {
          header: "\u00ac(\u00acA \u2227 B)",
          type: "op",
          eval: (r) => (!(!r[0] && r[1]) ? 1 : 0),
        },
        {
          header: "C \u2228 B",
          type: "op",
          eval: (r) => (r[2] || r[1] ? 1 : 0),
        },
        {
          header: "\u00ac(C \u2228 B)",
          type: "op",
          eval: (r) => (!(r[2] || r[1]) ? 1 : 0),
        },
        {
          header: "\u00ac(\u00acA \u2227 B) \u2228 \u00ac(C \u2228 B)",
          type: "op",
          eval: (r) => (!(!r[0] && r[1]) || !(r[2] || r[1]) ? 1 : 0),
        },
      ],
    },
    {
      display: "\u00acA \u2227 \u00acB \u2228 \u00acC",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        { header: "\u00acB", type: "op", eval: (r) => (!r[1] ? 1 : 0) },
        { header: "\u00acC", type: "op", eval: (r) => (!r[2] ? 1 : 0) },
        {
          header: "\u00acA \u2227 \u00acB",
          type: "op",
          eval: (r) => (!r[0] && !r[1] ? 1 : 0),
        },
        {
          header: "\u00acA \u2227 \u00acB \u2228 \u00acC",
          type: "op",
          eval: (r) => ((!r[0] && !r[1]) || !r[2] ? 1 : 0),
        },
      ],
    },
    {
      display: "\u00ac(A \u2228 \u00acC) \u2227 (B \u2228 C)",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acC", type: "op", eval: (r) => (!r[2] ? 1 : 0) },
        {
          header: "A \u2228 \u00acC",
          type: "op",
          eval: (r) => (r[0] || !r[2] ? 1 : 0),
        },
        {
          header: "\u00ac(A \u2228 \u00acC)",
          type: "op",
          eval: (r) => (!(r[0] || !r[2]) ? 1 : 0),
        },
        {
          header: "B \u2228 C",
          type: "op",
          eval: (r) => (r[1] || r[2] ? 1 : 0),
        },
        {
          header: "\u00ac(A \u2228 \u00acC) \u2227 (B \u2228 C)",
          type: "op",
          eval: (r) => (!(r[0] || !r[2]) && (r[1] || r[2]) ? 1 : 0),
        },
      ],
    },
    {
      display: "(\u00acA \u2228 B) \u2227 \u00ac(C \u2228 B)",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        {
          header: "\u00acA \u2228 B",
          type: "op",
          eval: (r) => (!r[0] || r[1] ? 1 : 0),
        },
        {
          header: "C \u2228 B",
          type: "op",
          eval: (r) => (r[2] || r[1] ? 1 : 0),
        },
        {
          header: "\u00ac(C \u2228 B)",
          type: "op",
          eval: (r) => (!(r[2] || r[1]) ? 1 : 0),
        },
        {
          header: "(\u00acA \u2228 B) \u2227 \u00ac(C \u2228 B)",
          type: "op",
          eval: (r) => ((!r[0] || r[1]) && !(r[2] || r[1]) ? 1 : 0),
        },
      ],
    },
    {
      display: "A \u2227 \u00acB \u2228 A \u2227 C",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acB", type: "op", eval: (r) => (!r[1] ? 1 : 0) },
        {
          header: "A \u2227 \u00acB",
          type: "op",
          eval: (r) => (r[0] && !r[1] ? 1 : 0),
        },
        {
          header: "A \u2227 C",
          type: "op",
          eval: (r) => (r[0] && r[2] ? 1 : 0),
        },
        {
          header: "A \u2227 \u00acB \u2228 A \u2227 C",
          type: "op",
          eval: (r) => ((r[0] && !r[1]) || (r[0] && r[2]) ? 1 : 0),
        },
      ],
    },
    {
      display: "(\u00acA \u2228 \u00acB) \u2227 \u00acC",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        { header: "\u00acB", type: "op", eval: (r) => (!r[1] ? 1 : 0) },
        {
          header: "\u00acA \u2228 \u00acB",
          type: "op",
          eval: (r) => (!r[0] || !r[1] ? 1 : 0),
        },
        { header: "\u00acC", type: "op", eval: (r) => (!r[2] ? 1 : 0) },
        {
          header: "(\u00acA \u2228 \u00acB) \u2227 \u00acC",
          type: "op",
          eval: (r) => ((!r[0] || !r[1]) && !r[2] ? 1 : 0),
        },
      ],
    },
    {
      display: "\u00acA \u2227 B \u2228 \u00ac(A \u2227 C)",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        {
          header: "\u00acA \u2227 B",
          type: "op",
          eval: (r) => (!r[0] && r[1] ? 1 : 0),
        },
        {
          header: "A \u2227 C",
          type: "op",
          eval: (r) => (r[0] && r[2] ? 1 : 0),
        },
        {
          header: "\u00ac(A \u2227 C)",
          type: "op",
          eval: (r) => (!(r[0] && r[2]) ? 1 : 0),
        },
        {
          header: "\u00acA \u2227 B \u2228 \u00ac(A \u2227 C)",
          type: "op",
          eval: (r) => ((!r[0] && r[1]) || !(r[0] && r[2]) ? 1 : 0),
        },
      ],
    },
    {
      display: "\u00acA \u2228 B \u2227 \u00acC",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        { header: "\u00acC", type: "op", eval: (r) => (!r[2] ? 1 : 0) },
        {
          header: "B \u2227 \u00acC",
          type: "op",
          eval: (r) => (r[1] && !r[2] ? 1 : 0),
        },
        {
          header: "\u00acA \u2228 B \u2227 \u00acC",
          type: "op",
          eval: (r) => (!r[0] || (r[1] && !r[2]) ? 1 : 0),
        },
      ],
    },
    {
      display: "(\u00acA \u2228 \u00acB) \u2227 (C \u2228 \u00acB)",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        { header: "\u00acB", type: "op", eval: (r) => (!r[1] ? 1 : 0) },
        {
          header: "\u00acA \u2228 \u00acB",
          type: "op",
          eval: (r) => (!r[0] || !r[1] ? 1 : 0),
        },
        {
          header: "C \u2228 \u00acB",
          type: "op",
          eval: (r) => (r[2] || !r[1] ? 1 : 0),
        },
        {
          header: "(\u00acA \u2228 \u00acB) \u2227 (C \u2228 \u00acB)",
          type: "op",
          eval: (r) => ((!r[0] || !r[1]) && (r[2] || !r[1]) ? 1 : 0),
        },
      ],
    },
    {
      display: "\u00ac(A \u2227 \u00acB) \u2228 C",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acB", type: "op", eval: (r) => (!r[1] ? 1 : 0) },
        {
          header: "A \u2227 \u00acB",
          type: "op",
          eval: (r) => (r[0] && !r[1] ? 1 : 0),
        },
        {
          header: "\u00ac(A \u2227 \u00acB)",
          type: "op",
          eval: (r) => (!(r[0] && !r[1]) ? 1 : 0),
        },
        {
          header: "\u00ac(A \u2227 \u00acB) \u2228 C",
          type: "op",
          eval: (r) => (!(r[0] && !r[1]) || r[2] ? 1 : 0),
        },
      ],
    },
    {
      display: "\u00ac(\u00acA \u2227 \u00acB) \u2228 \u00acC",
      cols: [
        { header: "A", type: "var", idx: 0 },
        { header: "B", type: "var", idx: 1 },
        { header: "C", type: "var", idx: 2 },
        { header: "\u00acA", type: "op", eval: (r) => (!r[0] ? 1 : 0) },
        { header: "\u00acB", type: "op", eval: (r) => (!r[1] ? 1 : 0) },
        {
          header: "\u00acA \u2227 \u00acB",
          type: "op",
          eval: (r) => (!r[0] && !r[1] ? 1 : 0),
        },
        {
          header: "\u00ac(\u00acA \u2227 \u00acB)",
          type: "op",
          eval: (r) => (!(!r[0] && !r[1]) ? 1 : 0),
        },
        {
          header: "\u00ac(\u00acA \u2227 \u00acB) \u2228 \u00acC",
          type: "op",
          eval: (r) => (!(!r[0] && !r[1]) || !r[2] ? 1 : 0),
        },
      ],
    },
  ];

  const expr = randomChoice8(expressionTemplates);
  const rows = [];
  for (let i = 0; i < 8; i++) {
    const r = [
      !!(i & 4), // A
      !!(i & 2), // B
      !!(i & 1), // C
    ];
    rows.push(r);
  }

  // Build HTML table
  let taskText = `Дано логическое выражение: <b>${expr.display}</b><br><br>`;
  taskText += `Заполните таблицу истинности. В столбцы для логических операций впишите 0 или 1.<br><br>`;

  taskText += `<table border="1" cellpadding="4" style="border-collapse: collapse; margin: 10px 0; font-size: 11pt;">`;

  // Header row - variable columns keep their headers, operation columns are blank
  taskText += `<tr>`;
  expr.cols.forEach((col) => {
    if (col.type === "op") {
      taskText += `<td style="font-weight: bold; padding: 5px 50px; text-align: center;">&nbsp;</td>`;
    } else {
      taskText += `<td style="font-weight: bold; padding: 5px 10px; text-align: center;">${col.header}</td>`;
    }
  });
  taskText += `</tr>`;

  // Data rows
  const answerParts = [];
  rows.forEach((r) => {
    taskText += `<tr>`;
    expr.cols.forEach((col) => {
      if (col.type === "var") {
        const val = r[col.idx] ? "1" : "0";
        taskText += `<td style="padding: 4px 10px; text-align: center;">${val}</td>`;
      } else {
        taskText += `<td style="padding: 4px 10px; text-align: center;">&nbsp;</td>`;
        answerParts.push(String(col.eval(r)));
      }
    });
    taskText += `</tr>`;
  });
  taskText += `</table>`;

  return {
    text: taskText,
    answer: answerParts.join(" "),
    type: "строка",
  };
}

// ============================================
// Export functions for use in generator
// ============================================
if (typeof window !== "undefined") {
  window.generateTask1 = generateTask1;
  window.generateTask2 = generateTask2;
  window.generateTask3 = generateTask3;
  window.generateTask4 = generateTask4;
  window.generateTask5 = generateTask5;
  window.generateTask6 = generateTask6;
  window.generateTask7 = generateTask7;
  window.generateTask8 = generateTask8;
  window.generateTask9 = generateTask9;
  window.generateTask10 = generateTask10;
}
