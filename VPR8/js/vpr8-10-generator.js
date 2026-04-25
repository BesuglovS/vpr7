/**
 * VPR8 Task 10 - Truth Table Generator (3 vars, 5 ops)
 * Задание 10: Заполнение таблицы истинности
 *
 * Логическое выражение с 3 переменными и 5 операциями:
 * НЕ, И, ИЛИ. Возможно использование скобок.
 */

// Current task state
let currentTask10 = null;

// ============================================================
// Generate rows for 3 variables
// ============================================================
function generateRows10(vars) {
  const n = vars.length;
  const count = Math.pow(2, n);
  const rows = [];
  for (let i = 0; i < count; i++) {
    const row = {};
    for (let j = 0; j < n; j++) {
      row[vars[j]] = (i >> (n - 1 - j)) & 1;
    }
    rows.push(row);
  }
  return rows;
}

// ============================================================
// Expression definitions: exactly 3 variables, exactly 5 operations
// Each col: { header, type: 'var'|'op', eval(row) }
// ============================================================
const expressions10 = [
  // Template 0: ¬(A ∨ C) ∨ B ∧ ¬C  (from example)
  {
    display: "¬(A ∨ C) ∨ B ∧ ¬C",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "A ∨ C", type: "op", eval: (r) => r.A | r.C },
      { header: "¬(A ∨ C)", type: "op", eval: (r) => 1 - (r.A | r.C) },
      { header: "¬C", type: "op", eval: (r) => 1 - r.C },
      { header: "B ∧ ¬C", type: "op", eval: (r) => r.B & (1 - r.C) },
      {
        header: "¬(A ∨ C) ∨ B ∧ ¬C",
        type: "op",
        eval: (r) => (1 - (r.A | r.C)) | (r.B & (1 - r.C)),
      },
    ],
    hint: "Порядок: скобки (A∨C), затем НЕ: ¬(A∨C) и ¬C, затем И: B∧¬C, затем ИЛИ: ¬(A∨C) ∨ (B∧¬C).",
  },

  // Template 1: (A ∨ ¬B) ∧ (¬C ∨ B)
  {
    display: "(A ∨ ¬B) ∧ (¬C ∨ B)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "A ∨ ¬B", type: "op", eval: (r) => r.A | (1 - r.B) },
      { header: "¬C", type: "op", eval: (r) => 1 - r.C },
      { header: "¬C ∨ B", type: "op", eval: (r) => (1 - r.C) | r.B },
      {
        header: "(A ∨ ¬B) ∧ (¬C ∨ B)",
        type: "op",
        eval: (r) => (r.A | (1 - r.B)) & ((1 - r.C) | r.B),
      },
    ],
    hint: "Порядок: НЕ (¬B, ¬C), затем ИЛИ в скобках, затем И между скобками.",
  },

  // Template 2: ¬(A ∨ B) ∧ (C ∨ ¬B)
  {
    display: "¬(A ∨ B) ∧ (C ∨ ¬B)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "A ∨ B", type: "op", eval: (r) => r.A | r.B },
      { header: "¬(A ∨ B)", type: "op", eval: (r) => 1 - (r.A | r.B) },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "C ∨ ¬B", type: "op", eval: (r) => r.C | (1 - r.B) },
      {
        header: "¬(A ∨ B) ∧ (C ∨ ¬B)",
        type: "op",
        eval: (r) => (1 - (r.A | r.B)) & (r.C | (1 - r.B)),
      },
    ],
    hint: "Порядок: скобки, НЕ, затем И между результатами скобок.",
  },

  // Template 3: (A ∨ B) ∧ ¬(C ∧ ¬B)
  {
    display: "(A ∨ B) ∧ ¬(C ∧ ¬B)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "A ∨ B", type: "op", eval: (r) => r.A | r.B },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "C ∧ ¬B", type: "op", eval: (r) => r.C & (1 - r.B) },
      { header: "¬(C ∧ ¬B)", type: "op", eval: (r) => 1 - (r.C & (1 - r.B)) },
      {
        header: "(A ∨ B) ∧ ¬(C ∧ ¬B)",
        type: "op",
        eval: (r) => (r.A | r.B) & (1 - (r.C & (1 - r.B))),
      },
    ],
    hint: "Порядок: скобки, НЕ, затем И. Сначала A∨B и ¬B, затем C∧¬B, затем ¬(C∧¬B), затем И.",
  },

  // Template 4: (¬A ∨ C) ∧ ¬(B ∧ ¬A)
  {
    display: "(¬A ∨ C) ∧ ¬(B ∧ ¬A)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "¬A ∨ C", type: "op", eval: (r) => (1 - r.A) | r.C },
      { header: "B ∧ ¬A", type: "op", eval: (r) => r.B & (1 - r.A) },
      { header: "¬(B ∧ ¬A)", type: "op", eval: (r) => 1 - (r.B & (1 - r.A)) },
      {
        header: "(¬A ∨ C) ∧ ¬(B ∧ ¬A)",
        type: "op",
        eval: (r) => ((1 - r.A) | r.C) & (1 - (r.B & (1 - r.A))),
      },
    ],
    hint: "Порядок: НЕ (¬A), ИЛИ в первых скобках, И во вторых скобках, НЕ, затем И.",
  },

  // Template 5: ¬A ∧ (B ∨ ¬C) ∨ A
  {
    display: "¬A ∧ (B ∨ ¬C) ∨ A",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "¬C", type: "op", eval: (r) => 1 - r.C },
      { header: "B ∨ ¬C", type: "op", eval: (r) => r.B | (1 - r.C) },
      {
        header: "¬A ∧ (B ∨ ¬C)",
        type: "op",
        eval: (r) => (1 - r.A) & (r.B | (1 - r.C)),
      },
      {
        header: "¬A ∧ (B ∨ ¬C) ∨ A",
        type: "op",
        eval: (r) => ((1 - r.A) & (r.B | (1 - r.C))) | r.A,
      },
    ],
    hint: "Порядок: НЕ (¬A, ¬C), ИЛИ в скобках, затем И, затем ИЛИ с A.",
  },

  // Template 6: ¬A ∨ (B ∧ ¬C) ∨ A
  {
    display: "¬A ∨ (B ∧ ¬C) ∨ A",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬A", type: "op", eval: (r) => 1 - r.A },
      { header: "¬C", type: "op", eval: (r) => 1 - r.C },
      { header: "B ∧ ¬C", type: "op", eval: (r) => r.B & (1 - r.C) },
      {
        header: "¬A ∨ (B ∧ ¬C)",
        type: "op",
        eval: (r) => (1 - r.A) | (r.B & (1 - r.C)),
      },
      {
        header: "¬A ∨ (B ∧ ¬C) ∨ A",
        type: "op",
        eval: (r) => (1 - r.A) | (r.B & (1 - r.C)) | r.A,
      },
    ],
    hint: "Порядок: НЕ (¬A, ¬C), И (B∧¬C), ИЛИ (¬A с B∧¬C), затем ИЛИ с A.",
  },

  // Template 7: ¬(A ∧ B) ∨ (¬C ∧ A)
  {
    display: "¬(A ∧ B) ∨ (¬C ∧ A)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "A ∧ B", type: "op", eval: (r) => r.A & r.B },
      { header: "¬(A ∧ B)", type: "op", eval: (r) => 1 - (r.A & r.B) },
      { header: "¬C", type: "op", eval: (r) => 1 - r.C },
      { header: "¬C ∧ A", type: "op", eval: (r) => (1 - r.C) & r.A },
      {
        header: "¬(A ∧ B) ∨ (¬C ∧ A)",
        type: "op",
        eval: (r) => (1 - (r.A & r.B)) | ((1 - r.C) & r.A),
      },
    ],
    hint: "Порядок: скобки (A∧B), НЕ, НЕ (¬C), И (¬C∧A), затем ИЛИ.",
  },

  // Template 8: (A ∧ ¬B) ∨ ¬(C ∨ B)
  {
    display: "(A ∧ ¬B) ∨ ¬(C ∨ B)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "A ∧ ¬B", type: "op", eval: (r) => r.A & (1 - r.B) },
      { header: "C ∨ B", type: "op", eval: (r) => r.C | r.B },
      { header: "¬(C ∨ B)", type: "op", eval: (r) => 1 - (r.C | r.B) },
      {
        header: "(A ∧ ¬B) ∨ ¬(C ∨ B)",
        type: "op",
        eval: (r) => (r.A & (1 - r.B)) | (1 - (r.C | r.B)),
      },
    ],
    hint: "Порядок: НЕ (¬B), И (A∧¬B), ИЛИ в скобках, НЕ, затем ИЛИ.",
  },

  // Template 9: ¬(A ∨ C) ∨ (¬B ∧ C)
  {
    display: "¬(A ∨ C) ∨ (¬B ∧ C)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "A ∨ C", type: "op", eval: (r) => r.A | r.C },
      { header: "¬(A ∨ C)", type: "op", eval: (r) => 1 - (r.A | r.C) },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "¬B ∧ C", type: "op", eval: (r) => (1 - r.B) & r.C },
      {
        header: "¬(A ∨ C) ∨ (¬B ∧ C)",
        type: "op",
        eval: (r) => (1 - (r.A | r.C)) | ((1 - r.B) & r.C),
      },
    ],
    hint: "Порядок: ИЛИ (A∨C), НЕ, НЕ (¬B), И (¬B∧C), затем ИЛИ.",
  },

  // Template 10: (A ∨ ¬C) ∧ ¬(B ∧ ¬C)
  {
    display: "(A ∨ ¬C) ∧ ¬(B ∧ ¬C)",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬C", type: "op", eval: (r) => 1 - r.C },
      { header: "A ∨ ¬C", type: "op", eval: (r) => r.A | (1 - r.C) },
      { header: "B ∧ ¬C", type: "op", eval: (r) => r.B & (1 - r.C) },
      { header: "¬(B ∧ ¬C)", type: "op", eval: (r) => 1 - (r.B & (1 - r.C)) },
      {
        header: "(A ∨ ¬C) ∧ ¬(B ∧ ¬C)",
        type: "op",
        eval: (r) => (r.A | (1 - r.C)) & (1 - (r.B & (1 - r.C))),
      },
    ],
    hint: "Порядок: НЕ (¬C), ИЛИ в первых скобках, И во вторых скобках, НЕ, затем И.",
  },

  // Template 11: (A ∨ ¬B) ∧ ¬C ∨ A
  {
    display: "(A ∨ ¬B) ∧ ¬C ∨ A",
    vars: ["A", "B", "C"],
    cols: [
      { header: "A", type: "var", eval: (r) => r.A },
      { header: "B", type: "var", eval: (r) => r.B },
      { header: "C", type: "var", eval: (r) => r.C },
      { header: "¬B", type: "op", eval: (r) => 1 - r.B },
      { header: "A ∨ ¬B", type: "op", eval: (r) => r.A | (1 - r.B) },
      { header: "¬C", type: "op", eval: (r) => 1 - r.C },
      {
        header: "(A ∨ ¬B) ∧ ¬C",
        type: "op",
        eval: (r) => (r.A | (1 - r.B)) & (1 - r.C),
      },
      {
        header: "(A ∨ ¬B) ∧ ¬C ∨ A",
        type: "op",
        eval: (r) => ((r.A | (1 - r.B)) & (1 - r.C)) | r.A,
      },
    ],
    hint: "Порядок: НЕ (¬B, ¬C), ИЛИ в скобках, И (с ¬C), затем ИЛИ с A.",
  },
];

// ============================================================
// Build the truth table HTML and attach click handlers
// ============================================================
function buildTable10(task, rows) {
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
        td.addEventListener("click", onCellClick10);
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
// ============================================================
function onCellClick10(e) {
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
  hideFeedback10();
  hideHint10();
}

// ============================================================
// Check answer
// ============================================================
function checkAnswer10() {
  const task = currentTask10;
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
    showFeedback10("⚠️ Заполните все ячейки таблицы.", "warning");
    return;
  }

  if (allCorrect) {
    showFeedback10(
      "✅ Правильно! Таблица истинности заполнена верно.",
      "success",
    );
  } else {
    showFeedback10(
      "❌ Есть ошибки. Неверные ячейки выделены красным.",
      "error",
    );
  }

  // Отправляем результат в родительское окно (режим экзамена)
  VPR7_ExamUtils.sendExamResult(allCorrect);
}

// ============================================================
// Clear all operation cells (reset to empty)
// ============================================================
function clearTable10() {
  const opCells = document.querySelectorAll(".truth-table td.op-cell");
  opCells.forEach((td) => {
    td.dataset.value = "";
    td.textContent = "";
    td.classList.remove("val-0", "val-1", "cell-correct", "cell-incorrect");
  });
  hideFeedback10();
  hideHint10();
}

// ============================================================
// Show hint
// ============================================================
function showHintAction10() {
  const task = currentTask10;
  if (!task) return;

  const hintBox = document.getElementById("hintBox");
  hintBox.innerHTML =
    "<strong>💡 Подсказка:</strong> " +
    task.hint +
    "<br><br>" +
    "<strong>Порядок операций:</strong> НЕ (¬) → И (∧) → ИЛИ (∨). " +
    "<br>Скобки меняют порядок — сначала вычисляется выражение в скобках.";
  hintBox.style.display = "block";
}

// ============================================================
// Generate a new task
// ============================================================
function generateNewTask10() {
  clearFeedbackAndHint10();

  const expr = expressions10[Math.floor(Math.random() * expressions10.length)];
  const rows = generateRows10(expr.vars);

  currentTask10 = {
    ...expr,
    rows: rows,
  };

  // Update expression display
  document.getElementById("expressionDisplay").textContent = expr.display;

  // Build table
  buildTable10(currentTask10, rows);
}

// ============================================================
// Feedback helpers
// ============================================================
function showFeedback10(message, type) {
  const fb = document.getElementById("feedback");
  fb.textContent = message;
  fb.className = "feedback " + type;
  fb.style.display = "block";
}

function hideFeedback10() {
  const fb = document.getElementById("feedback");
  if (fb) fb.style.display = "none";
}

function hideHint10() {
  const hb = document.getElementById("hintBox");
  if (hb) hb.style.display = "none";
}

function clearFeedbackAndHint10() {
  hideFeedback10();
  hideHint10();
}

// ============================================================
// Init
// ============================================================
function initTask10() {
  generateNewTask10();

  document.getElementById("checkBtn").addEventListener("click", checkAnswer10);
  document.getElementById("clearBtn").addEventListener("click", clearTable10);
  document
    .getElementById("hintBtn")
    .addEventListener("click", showHintAction10);
  document
    .getElementById("newTaskBtn")
    .addEventListener("click", generateNewTask10);
}
