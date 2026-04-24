/**
 * VPR 8 Class - Task 8 Generator
 * Задание 8: Исполнитель Чертёжник
 *
 * Исполнитель перемещается на координатной плоскости.
 * Команды:
 * - Сместиться на (a, b)
 * - Повтори k раз ... Конец
 *
 * Задача: найти эквивалентную одну команду смещения.
 */

let currentTask8 = null;

// ============================================================
// Generate a random shift value (-9..-1 or 1..9, excluding 0)
// ============================================================
function randomShift() {
  const v = Math.floor(Math.random() * 9) + 1; // 1..9
  return Math.random() < 0.5 ? v : -v;
}

// ============================================================
// Generate a random algorithm for the Draftsman
// Returns: { blocks: [], totalDx, totalDy, answerIndex, options: [] }
// ============================================================
function generateAlgorithm() {
  // Algorithm structure: [loop] + [optional final shift]
  // We want a non-trivial result that's interesting

  const loopCount = Math.floor(Math.random() * 3) + 2; // 2..4 repetitions
  const commandsInLoop = 2; // always 2 commands inside loop

  const loopCommands = [];
  for (let i = 0; i < commandsInLoop; i++) {
    loopCommands.push({ dx: randomShift(), dy: randomShift() });
  }

  // Optional extra command before or after loop
  const hasExtra = Math.random() < 0.7;
  let extraCommand = null;
  let extraPosition = "after";
  if (hasExtra) {
    extraCommand = { dx: randomShift(), dy: randomShift() };
    extraPosition = Math.random() < 0.5 ? "before" : "after";
  }

  // Build algorithm blocks
  const blocks = [];
  if (extraCommand && extraPosition === "before") {
    blocks.push({
      type: "shift",
      position: "before",
      dx: extraCommand.dx,
      dy: extraCommand.dy,
    });
  }
  blocks.push({ type: "loop", count: loopCount, commands: loopCommands });
  if (extraCommand && extraPosition === "after") {
    blocks.push({
      type: "shift",
      position: "after",
      dx: extraCommand.dx,
      dy: extraCommand.dy,
    });
  }

  // Calculate total displacement
  let totalDx = 0;
  let totalDy = 0;

  for (const block of blocks) {
    if (block.type === "loop") {
      let loopDx = 0;
      let loopDy = 0;
      for (const cmd of block.commands) {
        loopDx += cmd.dx;
        loopDy += cmd.dy;
      }
      totalDx += loopDx * block.count;
      totalDy += loopDy * block.count;
    } else if (block.type === "shift") {
      totalDx += block.dx;
      totalDy += block.dy;
    }
  }

  // Make sure total is not (0,0) - too trivial
  if (totalDx === 0 && totalDy === 0) {
    // Add a final shift to make it non-zero
    const fallbackCommand = { dx: randomShift(), dy: randomShift() };
    blocks.push({
      type: "shift",
      position: "after",
      dx: fallbackCommand.dx,
      dy: fallbackCommand.dy,
    });
    totalDx += fallbackCommand.dx;
    totalDy += fallbackCommand.dy;
  }

  return { blocks, totalDx, totalDy };
}

// ============================================================
// Generate 4 answer options, one correct
// ============================================================
function generateOptions(totalDx, totalDy) {
  const options = [];
  options.push({ dx: totalDx, dy: totalDy, correct: true });

  // Generate 3 wrong options by perturbing the correct answer
  const used = new Set();
  used.add(`${totalDx},${totalDy}`);

  while (options.length < 4) {
    // Strategy: change sign, swap, or add/subtract small values
    const strategy = Math.floor(Math.random() * 4);
    let wrongDx = totalDx;
    let wrongDy = totalDy;

    switch (strategy) {
      case 0:
        // Change sign of one coordinate
        if (Math.random() < 0.5) wrongDx = -wrongDx;
        else wrongDy = -wrongDy;
        break;
      case 1:
        // Swap coordinates
        wrongDx = totalDy;
        wrongDy = totalDx;
        break;
      case 2:
        // Add/subtract from one coordinate
        if (Math.random() < 0.5) wrongDx += Math.random() < 0.5 ? 1 : -1;
        else wrongDy += Math.random() < 0.5 ? 1 : -1;
        break;
      case 3:
        // Change both signs
        wrongDx = -wrongDx;
        wrongDy = -wrongDy;
        break;
    }

    const key = `${wrongDx},${wrongDy}`;
    if (!used.has(key) && !(wrongDx === 0 && wrongDy === 0)) {
      used.add(key);
      options.push({ dx: wrongDx, dy: wrongDy, correct: false });
    }
  }

  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Find correct answer index
  const answerIndex = options.findIndex((o) => o.correct);

  return { options, answerIndex };
}

// ============================================================
// Format shift as string
// ============================================================
function formatShift(dx, dy) {
  const signX = dx >= 0 ? "+" : "";
  const signY = dy >= 0 ? "+" : "";
  return `(${signX}${dx}, ${signY}${dy})`;
}

// ============================================================
// Build algorithm HTML
// ============================================================
function buildAlgorithmHtml(blocks) {
  let html = "";
  for (const block of blocks) {
    if (block.type === "loop") {
      html += `<div class="loop-header">Повтори ${block.count} раз</div>`;
      for (const cmd of block.commands) {
        html += `<div class="command">Сместиться на ${formatShift(cmd.dx, cmd.dy)}</div>`;
      }
      html += `<div class="loop-end">Конец</div>`;
    } else if (block.type === "shift") {
      html += `<div class="final-command">Сместиться на ${formatShift(block.dx, block.dy)}</div>`;
    }
  }
  return html;
}

// ============================================================
// Build calculation trace
// ============================================================
function buildTrace(blocks) {
  const trace = [];
  let totalDx = 0;
  let totalDy = 0;

  for (const block of blocks) {
    if (block.type === "loop") {
      let loopDx = 0;
      let loopDy = 0;
      for (const cmd of block.commands) {
        loopDx += cmd.dx;
        loopDy += cmd.dy;
      }
      const loopTotalDx = loopDx * block.count;
      const loopTotalDy = loopDy * block.count;

      if (block.commands.length === 1) {
        trace.push(
          `Цикл: ${formatShift(block.commands[0].dx, block.commands[0].dy)} × ${block.count} = ${formatShift(loopTotalDx, loopTotalDy)}`,
        );
      } else {
        trace.push(`Внутри цикла: ${formatShift(loopDx, loopDy)} за 1 повтор`);
        trace.push(
          `Цикл × ${block.count}: ${formatShift(loopDx, loopDy)} × ${block.count} = ${formatShift(loopTotalDx, loopTotalDy)}`,
        );
      }
      totalDx += loopTotalDx;
      totalDy += loopTotalDy;
    } else if (block.type === "shift") {
      const label = block.position === "before" ? "До цикла" : "После цикла";
      trace.push(`${label}: ${formatShift(block.dx, block.dy)}`);
      totalDx += block.dx;
      totalDy += block.dy;
    }
  }

  trace.push(`Итого: ${formatShift(totalDx, totalDy)}`);
  return { trace, totalDx, totalDy };
}

// ============================================================
// Public: generate a task
// ============================================================
function generateTask8() {
  let algo;
  let attempts = 0;

  do {
    algo = generateAlgorithm();
    attempts++;
  } while (
    attempts < 50 &&
    (Math.abs(algo.totalDx) > 20 || Math.abs(algo.totalDy) > 20)
  );

  const { options, answerIndex } = generateOptions(algo.totalDx, algo.totalDy);

  const task = {
    blocks: algo.blocks,
    totalDx: algo.totalDx,
    totalDy: algo.totalDy,
    options: options,
    answerIndex: answerIndex,
  };

  currentTask8 = task;
  return task;
}

// ============================================================
// Check answer
// ============================================================
function checkTask8Answer(selectedIndex) {
  if (!currentTask8) return { correct: false, message: "Задание не загружено" };

  const isCorrect = selectedIndex === currentTask8.answerIndex;
  const correctOption = currentTask8.options[currentTask8.answerIndex];

  if (isCorrect) {
    return {
      correct: true,
      message: "✅ Правильно! Эта команда эквивалентна всему алгоритму.",
    };
  } else {
    return {
      correct: false,
      message: `❌ Неправильно. Правильный ответ: Сместиться на ${formatShift(correctOption.dx, correctOption.dy)}`,
    };
  }
}

// ============================================================
// Build hint
// ============================================================
function buildHint8() {
  if (!currentTask8) return "";
  const { trace } = buildTrace(currentTask8.blocks);
  let html = `<strong>💡 Подсказка — пошаговое вычисление:</strong><br>`;
  html += `<div class="solution-path">`;
  for (const line of trace) {
    html += `${line}<br>`;
  }
  html += `</div>`;
  return html;
}

// ============================================================
// Build trace HTML for display
// ============================================================
function buildTraceHtml8() {
  if (!currentTask8) return "";
  const { trace } = buildTrace(currentTask8.blocks);
  let html = "";
  for (const line of trace) {
    let cls = "trace-line";
    if (line.startsWith("Итого")) cls += " final";
    else if (line.startsWith("Цикл") || line.startsWith("Внутри"))
      cls += " loop";
    else cls += " step";
    html += `<div class="${cls}">${line}</div>`;
  }
  return html;
}

// ============================================================
// Export
// ============================================================
if (typeof window !== "undefined") {
  window.VPR8_Task8 = {
    generateTask: generateTask8,
    checkTaskAnswer: checkTask8Answer,
    buildHint: buildHint8,
    buildTraceHtml: buildTraceHtml8,
    buildAlgorithmHtml: buildAlgorithmHtml,
    formatShift: formatShift,
    getCurrentTask: () => currentTask8,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateTask: generateTask8,
    checkTaskAnswer: checkTask8Answer,
    buildHint: buildHint8,
    buildTraceHtml: buildTraceHtml8,
    buildAlgorithmHtml,
    formatShift,
  };
}
