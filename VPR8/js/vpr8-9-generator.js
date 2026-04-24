/**
 * VPR 8 Class - Task 9 Generator
 * Задание 9: Анализ алгоритмов на языке программирования
 *
 * Задача: дана программа на Pascal с условным оператором,
 * содержащим 2 условия-сравнения и логические операции.
 * Нужно выбрать все пары чисел, для которых программа напечатает "NO".
 */

let currentTask9 = null;

// ============================================================
// Random helpers
// ============================================================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
// Comparison operators and their evaluation
// ============================================================
const COMPARISONS = [
  { op: "<", eval: (a, b) => a < b },
  { op: ">", eval: (a, b) => a > b },
  { op: "<=", eval: (a, b) => a <= b },
  { op: ">=", eval: (a, b) => a >= b },
  { op: "=", eval: (a, b) => a === b },
  { op: "<>", eval: (a, b) => a !== b },
];

// ============================================================
// Build a random condition expression with 2 comparisons
// Uses 1-3 logical ops: and, or, not with parentheses
// ============================================================
function generateCondition() {
  // Variable names
  const var1 = "s";
  const var2 = "t";

  // Two comparison thresholds (nice round numbers or small ints)
  const thresholds = [0, 5, 10, 15, 20, -5, -10, 100];
  const c1 = randChoice(thresholds);
  let c2 = randChoice(thresholds);
  while (c2 === c1) c2 = randChoice(thresholds);

  // Comparison operators
  const cmp1 = randChoice(COMPARISONS);
  const cmp2 = randChoice(COMPARISONS);

  // Build comparison strings like "(s < 10)" and "(t > 5)"
  const leftStr = `(${var1} ${cmp1.op} ${c1})`;
  const rightStr = `(${var2} ${cmp2.op} ${c2})`;

  // Logical structure variant
  // 0: A and B
  // 1: A or B
  // 2: not A and B
  // 3: A and not B
  // 4: not (A and B)
  // 5: not (A or B)
  // 6: not A or B
  // 7: A or not B
  // 8: (not A) or (not B)
  // 9: (not A) and (not B)
  const variant = randInt(0, 9);

  let conditionStr;
  let evalFn;

  switch (variant) {
    case 0: // A and B
      conditionStr = `${leftStr} and ${rightStr}`;
      evalFn = (s, t) => cmp1.eval(s, c1) && cmp2.eval(t, c2);
      break;
    case 1: // A or B
      conditionStr = `${leftStr} or ${rightStr}`;
      evalFn = (s, t) => cmp1.eval(s, c1) || cmp2.eval(t, c2);
      break;
    case 2: // not A and B
      conditionStr = `(not ${leftStr}) and ${rightStr}`;
      evalFn = (s, t) => !cmp1.eval(s, c1) && cmp2.eval(t, c2);
      break;
    case 3: // A and not B
      conditionStr = `${leftStr} and (not ${rightStr})`;
      evalFn = (s, t) => cmp1.eval(s, c1) && !cmp2.eval(t, c2);
      break;
    case 4: // not (A and B)
      conditionStr = `not (${leftStr} and ${rightStr})`;
      evalFn = (s, t) => !(cmp1.eval(s, c1) && cmp2.eval(t, c2));
      break;
    case 5: // not (A or B)
      conditionStr = `not (${leftStr} or ${rightStr})`;
      evalFn = (s, t) => !(cmp1.eval(s, c1) || cmp2.eval(t, c2));
      break;
    case 6: // not A or B
      conditionStr = `(not ${leftStr}) or ${rightStr}`;
      evalFn = (s, t) => !cmp1.eval(s, c1) || cmp2.eval(t, c2);
      break;
    case 7: // A or not B
      conditionStr = `${leftStr} or (not ${rightStr})`;
      evalFn = (s, t) => cmp1.eval(s, c1) || !cmp2.eval(t, c2);
      break;
    case 8: // (not A) or (not B)
      conditionStr = `(not ${leftStr}) or (not ${rightStr})`;
      evalFn = (s, t) => !cmp1.eval(s, c1) || !cmp2.eval(t, c2);
      break;
    case 9: // (not A) and (not B)
      conditionStr = `(not ${leftStr}) and (not ${rightStr})`;
      evalFn = (s, t) => !cmp1.eval(s, c1) && !cmp2.eval(t, c2);
      break;
  }

  return {
    conditionStr,
    evalFn,
    c1,
    c2,
    cmp1Op: cmp1.op,
    cmp2Op: cmp2.op,
    variant,
  };
}

// ============================================================
// Generate 5 pairs of numbers, ensure 1-4 "NO" answers
// ============================================================
function generatePairs(evalFn) {
  const pairs = [];
  const used = new Set();

  // Generate around 20 candidate pairs, pick 5 with good distribution
  const candidates = [];
  for (let i = 0; i < 40; i++) {
    const s = randInt(-20, 30);
    const t = randInt(-20, 30);
    const key = `${s},${t}`;
    if (used.has(key)) continue;
    used.add(key);

    const yes = evalFn(s, t);
    candidates.push({ s, t, yes });
  }

  // We want at least 1 YES and at least 1 NO among the 5
  // Prefer 2-3 NO answers
  const yesList = candidates.filter((c) => c.yes);
  const noList = candidates.filter((c) => !c.yes);

  if (yesList.length < 1 || noList.length < 1) {
    // Fallback - should be rare
    return null;
  }

  // Pick 2-3 NOs, rest YES
  const noCount = Math.min(noList.length, randInt(2, 3));
  const yesCount = 5 - noCount;

  const selected = [];
  for (let i = 0; i < noCount; i++) selected.push(noList[i]);
  for (let i = 0; i < yesCount; i++) selected.push(yesList[i]);

  // Shuffle
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  return selected;
}

// ============================================================
// Build program text in Pascal-like syntax
// ============================================================
function buildPascalProgramText(conditionStr) {
  return `var s, t: integer;
begin
  readln(s);
  readln(t);
  if ${conditionStr}
  then
    writeln("YES")
  else
    writeln("NO")
end.`;
}

// ============================================================
// Build program text in Python syntax
// ============================================================
function buildPythonProgramText(conditionStr) {
  // Convert Pascal operators to Python
  const pythonCondition = conditionStr
    .replace(/<>/g, "!=")
    .replace(/\bnot\b/g, "not")
    .replace(/\band\b/g, "and")
    .replace(/\bor\b/g, "or");

  return `s = int(input())
t = int(input())
if ${pythonCondition}:
    print("YES")
else:
    print("NO")`;
}

// ============================================================
// Generate a complete task
// ============================================================
function generateTask9() {
  let attempts = 0;
  let task = null;

  do {
    const cond = generateCondition();
    const pairs = generatePairs(cond.evalFn);
    if (!pairs) {
      attempts++;
      continue;
    }

    // Determine correct "NO" and "YES" answer indices (1-based)
    const noIndices = [];
    const yesIndices = [];
    pairs.forEach((p, idx) => {
      if (!p.yes) noIndices.push(idx + 1);
      else yesIndices.push(idx + 1);
    });

    // Need at least one of each
    if (noIndices.length === 0 || yesIndices.length === 0) {
      attempts++;
      continue;
    }

    // Randomly choose question type: "NO" or "YES"
    const questionType = Math.random() < 0.5 ? "NO" : "YES";
    const answerStr =
      questionType === "NO" ? noIndices.join("") : yesIndices.join("");

    task = {
      programTextPascal: buildPascalProgramText(cond.conditionStr),
      programTextPython: buildPythonProgramText(cond.conditionStr),
      conditionStr: cond.conditionStr,
      pairs: pairs,
      noIndices: noIndices,
      yesIndices: yesIndices,
      questionType: questionType,
      answerStr: answerStr,
      evalFn: cond.evalFn,
    };

    attempts++;
  } while (!task && attempts < 50);

  if (!task) {
    // Ultimate fallback - guaranteed working task
    const fallbackPairs = [
      { s: 15, t: 9, yes: false },
      { s: 5, t: 11, yes: true },
      { s: 18, t: 15, yes: true },
      { s: 10, t: 9, yes: false },
      { s: -4, t: 5, yes: true },
    ];
    const fallbackCond = "(s < 10) or (t > 10)";
    task = {
      programTextPascal: buildPascalProgramText(fallbackCond),
      programTextPython: buildPythonProgramText(fallbackCond),
      conditionStr: fallbackCond,
      pairs: fallbackPairs,
      noIndices: [1, 4],
      yesIndices: [2, 3, 5],
      questionType: "NO",
      answerStr: "14",
      evalFn: (s, t) => s < 10 || t > 10,
    };
  }

  currentTask9 = task;
  return task;
}

// ============================================================
// Build task HTML text with Pascal and Python tabs
// ============================================================
function buildTaskHtml(task) {
  const target = task.questionType;
  let html = `<p>Ниже приведена программа на двух языках программирования. Выберите любой удобный вариант:</p>`;
  html += `<div class="code-tabs">`;
  html += `<div class="tab-buttons">`;
  html += `<button class="tab-btn active" data-tab="pascal" onclick="switchCodeTab(this, 'pascal')">Pascal</button>`;
  html += `<button class="tab-btn" data-tab="python" onclick="switchCodeTab(this, 'python')">Python</button>`;
  html += `</div>`;
  html += `<div class="tab-content active" id="tab-pascal"><pre class="code-block">${task.programTextPascal}</pre></div>`;
  html += `<div class="tab-content" id="tab-python" style="display:none"><pre class="code-block">${task.programTextPython}</pre></div>`;
  html += `</div>`;
  html += `<p>Было проведено 5 запусков программы, при которых в качестве значений переменных <strong>s</strong> и <strong>t</strong> вводились следующие пары чисел (<strong>s</strong>, <strong>t</strong>).</p>`;
  html += `<p>Выберите <strong>ВСЕ</strong> пары чисел, для которых программа напечатает <strong>"${target}"</strong>, и запишите в поле ответа цифры, под которыми они указаны.</p>`;
  html += `<div class="pairs-list">`;
  task.pairs.forEach((p, idx) => {
    html += `<div class="pair-item" data-index="${idx}">
      <span class="pair-num">${idx + 1})</span>
      <span class="pair-values">(${p.s}, ${p.t})</span>
    </div>`;
  });
  html += `</div>`;
  html += `<p class="answer-note">В ответе запишите номера выбранных пар <strong>в порядке возрастания</strong>.</p>`;
  return html;
}

// ============================================================
// Build hint with step-by-step evaluation
// ============================================================
function buildHint9() {
  if (!currentTask9) return "";
  const task = currentTask9;

  let html = `<strong>💡 Подсказка — пошаговая проверка:</strong><br>`;
  html += `<div class="solution-path">`;
  html += `<p>Условие: <code>${task.conditionStr}</code></p>`;
  html += `<p>Программа печатает <strong>"YES"</strong>, если условие истинно, и <strong>"NO"</strong>, если условие ложно.</p>`;
  html += `<table class="hint-table">`;
  html += `<tr><th>№</th><th>Пара (s, t)</th><th>Проверка условия</th><th>Результат</th></tr>`;

  task.pairs.forEach((p, idx) => {
    const condResult = task.evalFn(p.s, p.t);
    const resultText = condResult ? "YES" : "NO";
    const resultClass = condResult ? "yes-result" : "no-result";

    // Build step-by-step explanation for this pair
    let checkText = explainCondition(task.conditionStr, p.s, p.t, task.evalFn);

    html += `<tr><td>${idx + 1}</td><td>(${p.s}, ${p.t})</td><td>${checkText}</td><td class="${resultClass}">${resultText}</td></tr>`;
  });

  html += `</table>`;
  html += `<p><strong>Правильный ответ: ${task.answerStr}</strong> (пары, для которых результат "${task.questionType}")</p>`;
  html += `</div>`;
  return html;
}

// ============================================================
// Explain condition evaluation for a specific pair
// ============================================================
function explainCondition(conditionStr, s, t, evalFn) {
  // Simple explanation based on the condition string
  // We replace the condition with a human-readable evaluation
  let text = conditionStr;

  // Evaluate simple patterns
  // Extract comparisons like (s < 10), (t >= 5), etc.
  const sMatch = text.match(/\(s\s*([<>!=]+)\s*(-?\d+)\)/);
  const tMatch = text.match(/\(t\s*([<>!=]+)\s*(-?\d+)\)/);

  let sPart = "";
  let tPart = "";

  if (sMatch) {
    const op = sMatch[1];
    const val = parseInt(sMatch[2]);
    let result;
    switch (op) {
      case "<":
        result = s < val;
        break;
      case ">":
        result = s > val;
        break;
      case "<=":
        result = s <= val;
        break;
      case ">=":
        result = s >= val;
        break;
      case "=":
        result = s === val;
        break;
      case "<>":
        result = s !== val;
        break;
      default:
        result = false;
    }
    sPart = `${s} ${op} ${val} → ${result ? "истина" : "ложь"}`;
  }

  if (tMatch) {
    const op = tMatch[1];
    const val = parseInt(tMatch[2]);
    let result;
    switch (op) {
      case "<":
        result = t < val;
        break;
      case ">":
        result = t > val;
        break;
      case "<=":
        result = t <= val;
        break;
      case ">=":
        result = t >= val;
        break;
      case "=":
        result = t === val;
        break;
      case "<>":
        result = t !== val;
        break;
      default:
        result = false;
    }
    tPart = `${t} ${op} ${val} → ${result ? "истина" : "ложь"}`;
  }

  const finalResult = evalFn(s, t);

  if (sPart && tPart) {
    return `${sPart}; ${tPart} → итого ${finalResult ? "истина" : "ложь"}`;
  } else if (sPart) {
    return `${sPart} → ${finalResult ? "истина" : "ложь"}`;
  } else if (tPart) {
    return `${tPart} → ${finalResult ? "истина" : "ложь"}`;
  }
  return conditionStr;
}

// ============================================================
// Check answer
// ============================================================
function checkTask9Answer(userAnswer) {
  if (!currentTask9) return { correct: false, message: "Задание не загружено" };

  const task = currentTask9;
  // Normalize user answer: remove spaces, sort digits
  const normalized = userAnswer.replace(/\s/g, "").split("").sort().join("");
  const correct = task.answerStr;

  const isCorrect = normalized === correct;

  if (isCorrect) {
    return {
      correct: true,
      message: `✅ Правильно! Ответ: ${correct}`,
    };
  } else {
    return {
      correct: false,
      message: `❌ Неправильно. Правильный ответ: <strong>${correct}</strong>`,
    };
  }
}

// ============================================================
// Get current task
// ============================================================
function getCurrentTask9() {
  return currentTask9;
}

// ============================================================
// Export
// ============================================================
if (typeof window !== "undefined") {
  window.VPR8_Task9 = {
    generateTask: generateTask9,
    buildTaskHtml: buildTaskHtml,
    buildHint: buildHint9,
    checkTaskAnswer: checkTask9Answer,
    getCurrentTask: getCurrentTask9,
    explainCondition: explainCondition,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateTask: generateTask9,
    buildTaskHtml: buildTaskHtml,
    buildHint: buildHint9,
    checkTaskAnswer: checkTask9Answer,
    getCurrentTask: getCurrentTask9,
    explainCondition: explainCondition,
  };
}
