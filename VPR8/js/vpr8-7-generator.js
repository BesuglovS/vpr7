/**
 * VPR 8 Class - Task 7 Generator
 * Задание 7: Составление алгоритма для исполнителя
 *
 * Исполнитель выполняет арифметические операции:
 * - сложение, вычитание, умножение, деление
 * - возведение в квадрат
 * - добавление цифры справа или слева
 */

let currentTask = null;
let stats = { correct: 0, total: 0 };

// ============================================================
// Command definitions
// ============================================================

const COMMAND_TYPES = [
  {
    id: "add",
    name: "прибавь",
    symbol: "+",
    genParam: () => Math.floor(Math.random() * 9) + 1, // 1..9
    apply: (val, param) => val + param,
    format: (param) => `прибавь ${param}`,
  },
  {
    id: "sub",
    name: "вычти",
    symbol: "−",
    genParam: () => Math.floor(Math.random() * 9) + 1, // 1..9
    apply: (val, param) => val - param,
    format: (param) => `вычти ${param}`,
  },
  {
    id: "mul",
    name: "умножь на",
    symbol: "×",
    genParam: () => Math.floor(Math.random() * 8) + 2, // 2..9
    apply: (val, param) => val * param,
    format: (param) => `умножь на ${param}`,
  },
  {
    id: "div",
    name: "раздели на",
    symbol: "÷",
    genParam: () => [2, 3, 4, 5, 10][Math.floor(Math.random() * 5)],
    apply: (val, param) => (val % param === 0 ? val / param : null),
    format: (param) => `раздели на ${param}`,
  },
  {
    id: "sqr",
    name: "возведи в квадрат",
    symbol: "²",
    genParam: () => null,
    apply: (val, param) => val * val,
    format: (param) => `возведи в квадрат`,
  },
  {
    id: "appendR",
    name: "припиши справа",
    symbol: "→",
    genParam: () => Math.floor(Math.random() * 9) + 1, // 1..9
    apply: (val, param) => (val >= 0 ? val * 10 + param : null),
    format: (param) => `припиши справа ${param}`,
  },
  {
    id: "appendL",
    name: "припиши слева",
    symbol: "←",
    genParam: () => [1, 2, 3][Math.floor(Math.random() * 3)], // 1..3
    apply: (val, param) => {
      if (val < 0) return null;
      const digits = String(val).length;
      return param * Math.pow(10, digits) + val;
    },
    format: (param) => `припиши слева ${param}`,
  },
];

// ============================================================
// Select exactly 2 random distinct command types
// ============================================================
function selectCommandTypes() {
  const count = 2; // always 2 commands
  const pool = COMMAND_TYPES.slice();
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

// ============================================================
// Generate random parameters for selected command types
// ============================================================
function generateCommands(types) {
  return types.map((t, idx) => {
    const param = t.genParam();
    return {
      num: idx + 1,
      id: t.id,
      name: t.name,
      symbol: t.symbol,
      param: param,
      text: t.format(param),
      apply: (val) => t.apply(val, param),
    };
  });
}

// ============================================================
// BFS to find a solution from start to target using given
// commands with at most maxSteps steps.
// Returns { commands: string, steps: number[] } or null.
// ============================================================
function findSolution(start, target, commands, maxSteps) {
  // BFS: queue of { value, path, mask }
  // mask is a bitmask tracking which commands have been used (bit 0 = cmd0, bit 1 = cmd1)
  const queue = [{ value: start, path: [], mask: 0 }];
  const visited = new Set();
  visited.add(start + ":0");

  while (queue.length > 0) {
    const { value, path, mask } = queue.shift();
    if (value === target) {
      // Require that solution uses both commands (when there are 2)
      if (commands.length === 2) {
        const hasCmd0 = (mask & 1) !== 0;
        const hasCmd1 = (mask & 2) !== 0;
        if (!hasCmd0 || !hasCmd1) {
          // Continue searching for a solution that uses both
          continue;
        }
      }
      return {
        commands: path.map((i) => i + 1).join(""),
        steps: path,
      };
    }
    if (path.length >= maxSteps) continue;

    for (let i = 0; i < commands.length; i++) {
      const nextVal = commands[i].apply(value);
      const newMask = mask | (1 << i);
      const key = nextVal + ":" + newMask;
      if (
        nextVal !== null &&
        nextVal >= 0 &&
        nextVal <= 150 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push({ value: nextVal, path: [...path, i], mask: newMask });
      }
    }
  }
  return null;
}

// ============================================================
// Try to generate a solvable task
// ============================================================
function tryGenerateTask() {
  const types = selectCommandTypes();
  const commands = generateCommands(types);

  const start = Math.floor(Math.random() * 50) + 2; // 2..51
  const maxSteps = Math.floor(Math.random() * 2) + 4; // 4 or 5

  // BFS from start to collect reachable values with command usage mask
  const reachable = new Map(); // key: value:mask -> { depth, path }
  const queue = [{ value: start, depth: 0, path: [], mask: 0 }];
  reachable.set(start + ":0", { depth: 0, path: [] });

  let bestTarget = null;
  let bestPath = null;
  let bestHasBoth = false;

  while (queue.length > 0) {
    const { value, depth, path, mask } = queue.shift();
    const hasBoth = (mask & 3) === 3; // both commands used when mask has bits 0 and 1 set

    if (depth >= 4 && depth <= 5 && value !== start) {
      // Prefer targets reachable with both commands
      // Among same both-command status, prefer longer path (up to 5)
      // Among same length, prefer the one using both commands
      if (!bestTarget) {
        bestTarget = value;
        bestPath = path;
        bestHasBoth = hasBoth;
      } else if (hasBoth && !bestHasBoth) {
        bestTarget = value;
        bestPath = path;
        bestHasBoth = true;
      } else if (hasBoth === bestHasBoth && depth > bestPath.length) {
        bestTarget = value;
        bestPath = path;
      }
    }

    if (depth >= maxSteps) continue;

    for (let i = 0; i < commands.length; i++) {
      const nextVal = commands[i].apply(value);
      const newMask = mask | (1 << i);
      const key = nextVal + ":" + newMask;
      if (
        nextVal !== null &&
        nextVal >= 0 &&
        nextVal <= 150 &&
        !reachable.has(key)
      ) {
        reachable.set(key, { depth: depth + 1, path: [...path, i] });
        queue.push({
          value: nextVal,
          depth: depth + 1,
          path: [...path, i],
          mask: newMask,
        });
      }
    }
  }

  if (!bestTarget || bestPath.length < 4) return null;

  // Ensure solution exists (uses both commands by construction)
  const sol = findSolution(start, bestTarget, commands, maxSteps + 2);
  if (!sol) return null;

  return {
    start: start,
    target: bestTarget,
    commands: commands,
    maxSteps: maxSteps,
    answer: sol.commands,
    pathSteps: sol.steps,
  };
}

// ============================================================
// Public: generate a task
// ============================================================
function generateTask() {
  let task = null;
  for (let attempts = 0; attempts < 200; attempts++) {
    task = tryGenerateTask();
    if (task) break;
  }
  if (!task) {
    // Fallback guaranteed task
    const c1 = {
      num: 1,
      id: "add",
      name: "прибавь",
      symbol: "+",
      param: 1,
      text: "прибавь 1",
      apply: (v) => v + 1,
    };
    const c2 = {
      num: 2,
      id: "mul",
      name: "умножь на",
      symbol: "×",
      param: 2,
      text: "умножь на 2",
      apply: (v) => v * 2,
    };
    task = {
      start: 3,
      target: 20,
      commands: [c1, c2],
      maxSteps: 4,
      answer: "2121",
      pathSteps: [1, 0, 1, 0],
    };
  }
  currentTask = task;
  return task;
}

// ============================================================
// Check user answer by simulating the algorithm
// ============================================================
function checkTaskAnswer(userAnswer) {
  if (!currentTask) return { correct: false, message: "Задание не загружено" };

  const trimmed = userAnswer.trim();
  if (!trimmed) return { correct: false, message: "Введите ответ" };

  if (!/^\d+$/.test(trimmed)) {
    return {
      correct: false,
      message: "Ответ должен содержать только цифры — номера команд",
    };
  }

  if (trimmed.length > currentTask.maxSteps + 2) {
    return {
      correct: false,
      message: `Слишком много команд. Нужно не более ${currentTask.maxSteps + 2} команд.`,
    };
  }

  // Simulate
  let val = currentTask.start;
  const trace = [];
  trace.push(`Начальное значение: ${val}`);

  for (let i = 0; i < trimmed.length; i++) {
    const cmdIdx = parseInt(trimmed[i]) - 1;
    if (cmdIdx < 0 || cmdIdx >= currentTask.commands.length) {
      trace.push(`Команда ${trimmed[i]} не существует`);
      return {
        correct: false,
        message: `Команды с номером ${trimmed[i]} не существует. Доступны команды 1–${currentTask.commands.length}.`,
        trace: trace,
      };
    }
    const cmd = currentTask.commands[cmdIdx];
    const nextVal = cmd.apply(val);
    if (nextVal === null || nextVal < 0) {
      trace.push(`${i + 1}. ${cmd.text}: ${val} → ошибка`);
      return {
        correct: false,
        message: `На шаге ${i + 1} (${cmd.text}) операция невозможна для числа ${val}.`,
        trace: trace,
      };
    }
    trace.push(`${i + 1}. ${cmd.text}: ${val} → ${nextVal}`);
    val = nextVal;
  }

  trace.push(`Результат: ${val} (нужно: ${currentTask.target})`);

  if (val === currentTask.target) {
    return {
      correct: true,
      message: "✅ Правильно! Алгоритм работает верно.",
      trace: trace,
    };
  } else {
    return {
      correct: false,
      message: `❌ Алгоритм приводит к числу ${val}, а нужно получить ${currentTask.target}.`,
      trace: trace,
    };
  }
}

// ============================================================
// Build hint: show one correct path
// ============================================================
function buildHint() {
  if (!currentTask) return "";
  const sol = findSolution(
    currentTask.start,
    currentTask.target,
    currentTask.commands,
    currentTask.maxSteps + 2,
  );
  if (!sol) return "Решение не найдено.";

  let val = currentTask.start;
  let html = `<strong>💡 Подсказка — один из правильных алгоритмов:</strong><br>`;
  html += `<div class="solution-path">`;
  html += `Начальное число: <strong>${val}</strong><br>`;
  for (let i = 0; i < sol.steps.length; i++) {
    const cmd = currentTask.commands[sol.steps[i]];
    const nextVal = cmd.apply(val);
    html += `${i + 1}. Команда ${sol.steps[i] + 1} — ${cmd.text}: ${val} → ${nextVal}<br>`;
    val = nextVal;
  }
  html += `</div>`;
  html += `<br><strong>Ответ:</strong> ${sol.commands}`;
  return html;
}

// ============================================================
// Build simulation trace HTML
// ============================================================
function buildTraceHtml(trace, isCorrect) {
  if (!trace || trace.length === 0) return "";
  let html = "";
  for (const line of trace) {
    let cls = "trace-step";
    if (line.includes("ошибка")) cls += " error";
    else if (line.includes("Результат"))
      cls += isCorrect ? " success" : " error";
    html += `<div class="${cls}">${line}</div>`;
  }
  return html;
}

// ============================================================
// Export for use in pages
// ============================================================
if (typeof window !== "undefined") {
  window.VPR8_Task7 = {
    generateTask,
    checkTaskAnswer,
    buildHint,
    buildTraceHtml,
    getCurrentTask: () => currentTask,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateTask,
    checkTaskAnswer,
    buildHint,
    buildTraceHtml,
  };
}
