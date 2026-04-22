/**
 * VPR8 Task 6 - Truth Table Generator
 * Логические выражения: построение таблиц истинности
 */

// Current task state
let currentTask = null;

// ============================================================
// Expression definitions
// Each expression has:
//   vars   - array of variable names
//   cols   - columns in order: first vars, then operations
//            each col: { header, type: 'var'|'op', eval(row) }
//   hint   - hint text
// ============================================================

const expressions = [
  // 2 variables, 2 operations
  {
    display: "A ∨ ¬B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "A ∨ ¬B", type: "op", eval: (r) => r.A | (1 - r.B) },
    ],
    hint: "Сначала вычисли ¬B (меняй 0→1 и 1→0), затем A ∨ ¬B (ИЛИ: 0 только если оба 0).",
  },
  {
    display: "A ∧ ¬B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "A ∧ ¬B", type: "op", eval: (r) => r.A & (1 - r.B) },
    ],
    hint: "Сначала вычисли ¬B (меняй 0→1 и 1→0), затем A ∧ ¬B (И: 1 только если оба 1).",
  },
  {
    display: "¬A ∨ B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "¬A ∨ B", type: "op", eval: (r) => (1 - r.A) | r.B },
    ],
    hint: "Сначала вычисли ¬A, затем ¬A ∨ B (ИЛИ: 0 только если оба 0).",
  },
  {
    display: "¬A ∧ B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "¬A ∧ B", type: "op", eval: (r) => (1 - r.A) & r.B },
    ],
    hint: "Сначала вычисли ¬A, затем ¬A ∧ B (И: 1 только если оба 1).",
  },
  {
    display: "¬A ∨ ¬B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "¬A ∨ ¬B", type: "op", eval: (r) => (1 - r.A) | (1 - r.B) },
    ],
    hint: "Вычисли ¬A и ¬B отдельно, затем ¬A ∨ ¬B (ИЛИ: 0 только если оба 0).",
  },
  {
    display: "¬A ∧ ¬B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "¬A ∧ ¬B", type: "op", eval: (r) => (1 - r.A) & (1 - r.B) },
    ],
    hint: "Вычисли ¬A и ¬B отдельно, затем ¬A ∧ ¬B (И: 1 только если оба 1).",
  },
  {
    display: "A ∧ B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "A ∧ B", type: "op", eval: (r) => r.A & r.B },
    ],
    hint: "A ∧ B (И): результат 1 только если и A=1, и B=1.",
  },
  {
    display: "A ∨ B",
    vars: ["A", "B"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "A ∨ B", type: "op", eval: (r) => r.A | r.B },
    ],
    hint: "A ∨ B (ИЛИ): результат 0 только если и A=0, и B=0.",
  },
  // 3 variables
  {
    display: "A ∨ B ∧ C",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "B ∧ C", type: "op", eval: (r) => r.B & r.C },
      { header: "A ∨ B ∧ C", type: "op", eval: (r) => r.A | (r.B & r.C) },
    ],
    hint: "Сначала B ∧ C (И выполняется раньше ИЛИ), затем A ∨ (B ∧ C).",
  },
  {
    display: "A ∧ B ∨ C",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "A ∧ B", type: "op", eval: (r) => r.A & r.B },
      { header: "A ∧ B ∨ C", type: "op", eval: (r) => (r.A & r.B) | r.C },
    ],
    hint: "Сначала A ∧ B (И выполняется раньше ИЛИ), затем (A ∧ B) ∨ C.",
  },
  {
    display: "¬A ∨ B ∧ C",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "B ∧ C", type: "op", eval: (r) => r.B & r.C },
      {
        header: "¬A ∨ B ∧ C",
        type: "op",
        eval: (r) => (1 - r.A) | (r.B & r.C),
      },
    ],
    hint: "Порядок: НЕ → И → ИЛИ. Сначала ¬A, затем B ∧ C, затем ¬A ∨ (B ∧ C).",
  },
  {
    display: "A ∧ ¬B ∨ C",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "A ∧ ¬B", type: "op", eval: (r) => r.A & (1 - r.B) },
      {
        header: "A ∧ ¬B ∨ C",
        type: "op",
        eval: (r) => (r.A & (1 - r.B)) | r.C,
      },
    ],
    hint: "Порядок: НЕ → И → ИЛИ. Сначала ¬B, затем A ∧ ¬B, затем (A ∧ ¬B) ∨ C.",
  },
];

// ============================================================
// Generate all rows for a given set of variable names
// ============================================================
function generateRows(vars) {
  const n = vars.length;
  const count = Math.pow(2, n);
  const rows = [];
  for (let i = 0; i < count; i++) {
    const row = {};
    for (let j = 0; j < n; j++) {
      // Most significant bit first
      row[vars[j]] = (i >> (n - 1 - j)) & 1;
    }
    rows.push(row);
  }
  return rows;
}

// ============================================================
// Build the truth table HTML and attach click handlers
// ============================================================
function buildTable(task, rows) {
  const wrapper = document.getElementById("tableWrapper");
  wrapper.innerHTML = "";

  const table = document.createElement("table");
  table.className = "truth-table";

  // Header row
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  task.cols.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col.header;
    if (col.type === "var") th.classList.add("var-header");
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body rows
  const tbody = document.createElement("tbody");
  rows.forEach((row, rowIdx) => {
    const tr = document.createElement("tr");
    task.cols.forEach((col, colIdx) => {
      const td = document.createElement("td");
      if (col.type === "var") {
        td.className = "var-cell";
        td.textContent = col.eval(row);
      } else {
        td.className = "op-cell";
        td.dataset.rowIdx = rowIdx;
        td.dataset.colIdx = colIdx;
        td.dataset.value = ""; // initially empty
        td.textContent = "";
        td.addEventListener("click", onCellClick);
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrapper.appendChild(table);
}

// ============================================================
// Cell click handler: cycles through empty → 0 → 1 → 0 → 1 ...
// First click sets to 0, subsequent clicks toggle 0 ↔ 1
// ============================================================
function onCellClick(e) {
  const td = e.currentTarget;
  const current = td.dataset.value;
  let next;
  if (current === "") {
    next = "0";
  } else if (current === "0") {
    next = "1";
  } else {
    next = "0";
  }
  td.dataset.value = next;
  td.textContent = next;
  td.classList.remove("val-0", "val-1", "cell-correct", "cell-incorrect");
  if (next === "0") td.classList.add("val-0");
  if (next === "1") td.classList.add("val-1");
  // Hide feedback when user edits
  hideFeedback();
  hideHint();
}

// ============================================================
// Check answer
// ============================================================
function checkAnswer() {
  const task = currentTask;
  if (!task) return;

  const opCells = document.querySelectorAll(".truth-table td.op-cell");
  let allFilled = true;
  let allCorrect = true;

  opCells.forEach((td) => {
    const rowIdx = parseInt(td.dataset.rowIdx);
    const colIdx = parseInt(td.dataset.colIdx);
    const row = task.rows[rowIdx];
    const col = task.cols[colIdx];
    const expected = col.eval(row);
    const value = td.dataset.value;

    td.classList.remove("cell-correct", "cell-incorrect");

    if (value === "") {
      allFilled = false;
    } else {
      const userVal = parseInt(value);
      if (userVal === expected) {
        td.classList.add("cell-correct");
      } else {
        td.classList.add("cell-incorrect");
        allCorrect = false;
      }
    }
  });

  if (!allFilled) {
    showFeedback("⚠️ Заполните все ячейки таблицы.", "warning");
    return;
  }

  if (allCorrect) {
    showFeedback(
      "✅ Правильно! Таблица истинности заполнена верно.",
      "success",
    );
  } else {
    showFeedback("❌ Есть ошибки. Неверные ячейки выделены красным.", "error");
  }
}

// ============================================================
// Clear all operation cells (reset to empty)
// ============================================================
function clearTable() {
  const opCells = document.querySelectorAll(".truth-table td.op-cell");
  opCells.forEach((td) => {
    td.dataset.value = "";
    td.textContent = "";
    td.classList.remove("val-0", "val-1", "cell-correct", "cell-incorrect");
  });
  hideFeedback();
  hideHint();
}

// ============================================================
// Show hint (correct answer filled in)
// ============================================================
function showHintAction() {
  const task = currentTask;
  if (!task) return;

  const hintBox = document.getElementById("hintBox");
  hintBox.innerHTML =
    "<strong>💡 Подсказка:</strong> " +
    task.hint +
    "<br><br>" +
    "<strong>Порядок операций:</strong> НЕ (¬) → И (∧) → ИЛИ (∨)";
  hintBox.style.display = "block";
}

// ============================================================
// Generate a new task
// ============================================================
function generateNewTask() {
  clearFeedbackAndHint();

  const expr = expressions[Math.floor(Math.random() * expressions.length)];
  const rows = generateRows(expr.vars);

  currentTask = {
    ...expr,
    rows: rows,
  };

  // Update expression display
  document.getElementById("expressionDisplay").textContent = expr.display;

  // Build table
  buildTable(currentTask, rows);
}

// ============================================================
// Feedback helpers
// ============================================================
function showFeedback(message, type) {
  const fb = document.getElementById("feedback");
  fb.textContent = message;
  fb.className = "feedback " + type;
  fb.style.display = "block";
}

function hideFeedback() {
  const fb = document.getElementById("feedback");
  if (fb) fb.style.display = "none";
}

function hideHint() {
  const hb = document.getElementById("hintBox");
  if (hb) hb.style.display = "none";
}

function clearFeedbackAndHint() {
  hideFeedback();
  hideHint();
}

// ============================================================
// Init
// ============================================================
function initTask6() {
  generateNewTask();

  document.getElementById("checkBtn").addEventListener("click", checkAnswer);
  document.getElementById("clearBtn").addEventListener("click", clearTable);
  document.getElementById("hintBtn").addEventListener("click", showHintAction);
  document
    .getElementById("newTaskBtn")
    .addEventListener("click", generateNewTask);
}
