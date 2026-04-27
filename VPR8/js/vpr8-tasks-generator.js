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
  // 12 типов преобразований между системами счисления 2, 8, 10, 16
  const conversionTypes = [
    { from: 10, to: 2, fromName: "десятичной", toName: "двоичную" },
    { from: 10, to: 8, fromName: "десятичной", toName: "восьмеричную" },
    { from: 10, to: 16, fromName: "десятичной", toName: "шестнадцатеричную" },
    { from: 2, to: 10, fromName: "двоичной", toName: "десятичную" },
    { from: 8, to: 10, fromName: "восьмеричной", toName: "десятичную" },
    { from: 16, to: 10, fromName: "шестнадцатеричной", toName: "десятичную" },
    { from: 2, to: 8, fromName: "двоичной", toName: "восьмеричную" },
    { from: 2, to: 16, fromName: "двоичной", toName: "шестнадцатеричную" },
    { from: 8, to: 2, fromName: "восьмеричной", toName: "двоичную" },
    { from: 8, to: 16, fromName: "восьмеричной", toName: "шестнадцатеричную" },
    { from: 16, to: 2, fromName: "шестнадцатеричной", toName: "двоичную" },
    { from: 16, to: 8, fromName: "шестнадцатеричной", toName: "восьмеричную" },
  ];

  const type = randomChoice8(conversionTypes);
  const decimal = randomInt8(20, 200);

  const sourceNumber = decimal.toString(type.from).toUpperCase();
  const answer = decimal.toString(type.to).toUpperCase();

  let text;
  if (type.from === 10) {
    text = `Переведите число <b>${sourceNumber}</b> из десятичной системы счисления в <b>${type.toName}</b> систему счисления.<br>В ответе запишите полученное число.`;
  } else if (type.to === 10) {
    text = `Переведите число <b>${sourceNumber}${toSubscript8(type.from)}</b> из ${type.fromName} системы счисления в десятичную.<br>В ответе запишите полученное число.`;
  } else {
    text = `Переведите число <b>${sourceNumber}${toSubscript8(type.from)}</b> из ${type.fromName} системы счисления в <b>${type.toName}</b> систему счисления.<br>В ответе запишите полученное число.`;
  }

  return {
    text: text,
    answer: answer,
    type: "строка",
  };
}

// ============================================
// Task 2: Number in Range (Число в диапазоне)
// ============================================
function generateTask2() {
  // Unicode subscript digits for base notation
  const subscripts = { 2: "₂", 8: "₈", 16: "₁₆" };

  // 1. Generate range boundaries (0..255 so binary fits 8 bits)
  const minValue = randomInt8(40, 140);
  const maxValueLimit = Math.min(
    230,
    minValue + Math.floor(Math.random() * 100) + 20,
  );
  const maxValue = randomInt8(
    minValue + 20,
    Math.max(minValue + 21, maxValueLimit),
  );

  // 2. Pick random bases for left and right boundary
  const systems = [2, 8, 16];
  const leftSystem = randomChoice8(systems);
  const rightSystem = randomChoice8(systems);

  // 3. Convert boundaries
  const leftBoundary = minValue.toString(leftSystem).toUpperCase();
  const rightBoundary = maxValue.toString(rightSystem).toUpperCase();

  // 4. Correct answer — strictly inside (minValue < a < maxValue)
  const correctValue = randomInt8(minValue + 1, maxValue - 1);

  // 5. Generate 3 wrong answers (all strictly outside the range)
  const wrongValues = new Set();

  // One value below minValue
  wrongValues.add(randomInt8(1, Math.max(1, minValue - 1)));

  // One value above maxValue
  wrongValues.add(randomInt8(maxValue + 1, Math.min(255, maxValue + 50)));

  // Third wrong value — any value outside range
  while (wrongValues.size < 3) {
    if (Math.random() < 0.5) {
      wrongValues.add(randomInt8(1, Math.max(1, minValue - 1)));
    } else {
      wrongValues.add(randomInt8(maxValue + 1, Math.min(255, maxValue + 50)));
    }
  }

  const wrongValuesArray = Array.from(wrongValues);

  // 6. Build all options
  const options = [
    { value: correctValue, correct: true },
    ...wrongValuesArray.map((v) => ({ value: v, correct: false })),
  ];

  // Shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = randomInt8(0, i);
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Find correct answer index (1-based)
  const correctIndex = options.findIndex((o) => o.correct) + 1;

  // 7. Build task text
  let taskText = `Какое из чисел, записанных в двоичной системе счисления, удовлетворяет условию<br>`;
  taskText += `<b>${leftBoundary}</b>${subscripts[leftSystem]} < <i>a</i> < <b>${rightBoundary}</b>${subscripts[rightSystem]}?<br><br>`;

  options.forEach((opt, i) => {
    const binary = opt.value.toString(2).padStart(8, "0");
    taskText += `${i + 1}) ${binary}<br>`;
  });

  return {
    text: taskText,
    answer: String(correctIndex),
    type: "строка",
  };
}

// Convert a base number (2-16) to Unicode subscript representation
function toSubscript8(n) {
  const subDigits = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
  return String(n)
    .split("")
    .map((d) => subDigits[parseInt(d, 10)] || d)
    .join("");
}

// ============================================
// Task 3: Addition in Number Systems (Сложение)
// ============================================
function generateTask3(usedBases = []) {
  let base;
  // Bases from 2 to 16, excluding 10
  const possibleBases = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16];
  // Ensure variety: prefer unused bases, fallback to random
  const unused = possibleBases.filter((b) => !usedBases.includes(b));
  if (unused.length > 0) {
    base = randomChoice8(unused);
  } else {
    base = randomChoice8(possibleBases);
  }

  const maxDec = Math.max(50, base * base * 2);
  const num1 = randomInt8(Math.min(10, maxDec - 1), maxDec);
  const num2 = randomInt8(Math.min(10, maxDec - 1), maxDec);

  const s1 = num1.toString(base).toUpperCase();
  const s2 = num2.toString(base).toUpperCase();
  const sum = num1 + num2;
  const sResult = sum.toString(base).toUpperCase();
  const sub = toSubscript8(base);

  return {
    text: `Выполните сложение: <b>${s1}${sub} + ${s2}${sub}</b>.<br>Ответ запишите в системе счисления с основанием ${base}.`,
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
  // Bases from 2 to 16, excluding 10
  const possibleBases = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16];
  const unused = possibleBases.filter((b) => !usedBases.includes(b));
  if (unused.length > 0) {
    base = randomChoice8(unused);
  } else {
    base = randomChoice8(possibleBases);
  }

  const maxDec = Math.max(50, base * base * 2);
  const num1 = randomInt8(Math.min(20, maxDec - 1), maxDec);
  const num2 = randomInt8(Math.min(10, num1 - 1), num1 - 1);

  const s1 = num1.toString(base).toUpperCase();
  const s2 = num2.toString(base).toUpperCase();
  const diff = num1 - num2;
  const sResult = diff.toString(base).toUpperCase();
  const sub = toSubscript8(base);

  return {
    text: `Выполните вычитание: <b>${s1}${sub} − ${s2}${sub}</b>.<br>Ответ запишите в системе счисления с основанием ${base}.`,
    answer: sResult,
    type: "строка",
    base: base,
  };
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

  let selectedRule;
  let wantTrue;
  let correctName = null;
  let wrongNames = [];

  // Keep trying different rule/truth combinations until we find one
  // where exactly 1 name matches and at least 3 names don't match (or vice versa)
  let attempts = 0;
  while (attempts < 100) {
    selectedRule = randomChoice8(rules);
    wantTrue = Math.random() < 0.5;

    // Precompute which names match the condition
    const matchingNames = [];
    const nonMatchingNames = [];
    for (const name of names) {
      const result = checkName(name, selectedRule);
      if (wantTrue ? result : !result) {
        matchingNames.push(name);
      } else {
        nonMatchingNames.push(name);
      }
    }

    // We need at least 1 matching name (correct answer)
    // and at least 3 non-matching names (wrong answers)
    if (matchingNames.length >= 1 && nonMatchingNames.length >= 3) {
      // Pick exactly 1 correct name from matches
      correctName = randomChoice8(matchingNames);
      // Pick exactly 3 wrong names from non-matches
      const shuffledWrong = shuffleArray8(nonMatchingNames);
      wrongNames = shuffledWrong.slice(0, 3);
      break;
    }

    attempts++;
  }

  // Fallback: if all attempts failed (extremely unlikely), force a safe combination
  if (!correctName) {
    selectedRule = rules[2]; // NOT_FIRST_VOWEL
    wantTrue = false;
    const matchingNames = names.filter((n) => !isVowel(n[0]));
    const nonMatchingNames = names.filter((n) => isVowel(n[0]));
    correctName = randomChoice8(nonMatchingNames);
    wrongNames = shuffleArray8(matchingNames).slice(0, 3);
  }

  const conditionWord = wantTrue ? "ИСТИННО" : "ЛОЖНО";

  // Combine and shuffle
  const allNames = shuffleArray8([correctName, ...wrongNames]);
  const correctIndex = allNames.indexOf(correctName) + 1;

  let taskText = `В поле ответа запишите <b>номер</b> имени, для которого <b>${conditionWord}</b> высказывание:<br>`;
  taskText += `<b>${selectedRule.text}</b><br><br>`;
  allNames.forEach((n, i) => {
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
// Task 9: Program Analysis (Анализ программ)
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

  // Generate 5 pairs, ensuring 1-4 correct answers (not 0 and not 5)
  let pairs = [];
  let correctIndices = [];
  let valid = false;
  for (let attempt = 0; attempt < 100 && !valid; attempt++) {
    pairs = [];
    correctIndices = [];
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
    if (correctIndices.length > 0 && correctIndices.length < 5) {
      valid = true;
    }
  }
  // Fallback if still not valid after max attempts - force a pair to be wrong
  if (!valid && correctIndices.length === 0) {
    // All 5 print the opposite of printResult - flip the last pair
    const lastIdx = 4;
    pairs[lastIdx].printsResult = printResult;
    correctIndices.push(lastIdx + 1);
  } else if (!valid && correctIndices.length === 5) {
    // All 5 print printResult - flip the last pair
    const lastIdx = 4;
    pairs[lastIdx].printsResult = printResult === "NO" ? "YES" : "NO";
    correctIndices.pop();
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
    .replace(/<>/g, "!=")
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
// Task 10: Complex Truth Tables (Сложные таблицы истинности)
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
