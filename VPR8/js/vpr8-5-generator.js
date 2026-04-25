let currentAnswer = 4;
let currentCorrectName = "";
let currentMode = "false"; // "false" — ищем единственное ЛОЖНОЕ, "true" — ищем единственное ИСТИННОЕ

function initTask5() {
  generateNewTask();

  document.getElementById("checkBtn").addEventListener("click", checkAnswer);
  document.getElementById("clearBtn").addEventListener("click", clearAnswer);
  document.getElementById("hintBtn").addEventListener("click", showHint);
  document
    .getElementById("newTaskBtn")
    .addEventListener("click", generateNewTask);

  document
    .getElementById("answerInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkAnswer();
      }
    });
}

function generateNewTask() {
  clearAnswer();
  hideFeedback();
  hideHint();

  const allNames = [
    "Анна",
    "Максим",
    "Татьяна",
    "Олег",
    "Иван",
    "Мария",
    "Алексей",
    "Елена",
    "Дмитрий",
    "София",
    "Артем",
    "Наталья",
    "Сергей",
    "Юлия",
    "Роман",
    "Ольга",
    "Егор",
    "Алёна",
    "Никита",
    "Ксения",
    "Павел",
    "Вера",
    "Михаил",
    "Дарья",
  ];
  const vowels = ["А", "О", "У", "Ы", "Э", "Я", "Ё", "Е", "Ю", "И"];

  // Разные варианты логических выражений
  const logicExpressions = [
    {
      text: "НЕ (Первая буква гласная) ИЛИ (Последняя буква гласная)",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const lastV = vowels.includes(name[name.length - 1].toUpperCase());
        return !firstV || lastV;
      },
      hintFalse:
        "Выражение A ИЛИ B ложно только когда и A и B ложны одновременно. Отрицание НЕ (A) ложно когда A истинно.",
      hintTrue: "Выражение A ИЛИ B истинно когда хотя бы одна часть истинна.",
    },
    {
      text: "(Первая буква гласная) И НЕ (Последняя буква гласная)",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const lastV = vowels.includes(name[name.length - 1].toUpperCase());
        return firstV && !lastV;
      },
      hintFalse:
        "Выражение A И B ложно когда хотя бы одно из них ложно. Отрицание НЕ (B) истинно когда B ложно.",
      hintTrue:
        "Выражение A И B истинно только когда оба выражения истинны одновременно.",
    },
    {
      text: "(Первая буква согласная) ИЛИ (Последняя буква согласная)",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const lastV = vowels.includes(name[name.length - 1].toUpperCase());
        return !firstV || !lastV;
      },
      hintFalse:
        "Выражение A ИЛИ B ложно только когда и A и B ложны одновременно.",
      hintTrue: "Выражение A ИЛИ B истинно когда хотя бы одна часть истинна.",
    },
    {
      text: "(Вторая буква гласная) И (Третья буква согласная)",
      check: (name, vowels) => {
        const secondV = vowels.includes(name[1].toUpperCase());
        const thirdV = vowels.includes(name[2].toUpperCase());
        return secondV && !thirdV;
      },
      hintFalse:
        "Выражение A И B ложно когда хотя бы одно из них ложно. Обратите внимание что нумерация букв начинается с 1.",
      hintTrue:
        "Выражение A И B истинно только когда оба выражения истинны одновременно.",
    },
    {
      text: "НЕ ((Первая буква гласная) И (Вторая буква гласная))",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const secondV = vowels.includes(name[1].toUpperCase());
        return !(firstV && secondV);
      },
      hintFalse:
        "По закону Де Моргана: НЕ (A И B) = НЕ A ИЛИ НЕ B. Выражение ложно только когда и A и B истинны.",
      hintTrue:
        "По закону Де Моргана: НЕ (A И B) = НЕ A ИЛИ НЕ B. Выражение истинно когда хотя бы одна часть ложна.",
    },
    {
      text: "(Третья буква гласная) ИЛИ (Предпоследняя буква гласная)",
      check: (name, vowels) => {
        const thirdV = vowels.includes(name[2].toUpperCase());
        const prelastV = vowels.includes(name[name.length - 2].toUpperCase());
        return thirdV || prelastV;
      },
      hintFalse:
        "Выражение A ИЛИ B ложно только когда и A и B ложны одновременно.",
      hintTrue: "Выражение A ИЛИ B истинно когда хотя бы одна часть истинна.",
    },
    {
      text: "(Вторая буква согласная) И НЕ (Третья буква согласная)",
      check: (name, vowels) => {
        const secondV = vowels.includes(name[1].toUpperCase());
        const thirdV = vowels.includes(name[2].toUpperCase());
        return !secondV && thirdV;
      },
      hintFalse:
        "Выражение A И B ложно когда хотя бы одно из них ложно. Отрицание НЕ (B) истинно когда B ложно.",
      hintTrue:
        "Выражение A И B истинно только когда оба выражения истинны одновременно.",
    },
    {
      text: "(Первая буква гласная) И (Третья буква гласная)",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const thirdV = vowels.includes(name[2].toUpperCase());
        return firstV && thirdV;
      },
      hintFalse: "Выражение A И B ложно когда хотя бы одно из них ложно.",
      hintTrue:
        "Выражение A И B истинно только когда оба выражения истинны одновременно.",
    },
    {
      text: "НЕ (Вторая буква гласная) И НЕ (Предпоследняя буква гласная)",
      check: (name, vowels) => {
        const secondV = vowels.includes(name[1].toUpperCase());
        const prelastV = vowels.includes(name[name.length - 2].toUpperCase());
        return !secondV && !prelastV;
      },
      hintFalse: "Выражение A И B ложно когда хотя бы одно из них ложно.",
      hintTrue:
        "Выражение A И B истинно только когда оба выражения истинны одновременно.",
    },
  ];

  // Выбираем случайное логическое выражение
  const selectedLogic =
    logicExpressions[Math.floor(Math.random() * logicExpressions.length)];

  // Разделяем имена на те для которых выражение ЛОЖНО и ИСТИННО
  const falseNames = allNames.filter(
    (name) => !selectedLogic.check(name, vowels),
  );
  const trueNames = allNames.filter((name) =>
    selectedLogic.check(name, vowels),
  );

  // Случайно выбираем режим задания: ищем единственное ЛОЖНОЕ или единственное ИСТИННОЕ имя
  let mode = Math.random() < 0.5 ? "false" : "true";

  // Проверяем, хватает ли имён для выбранного режима. Если нет — переключаем режим.
  if (mode === "false" && (falseNames.length < 1 || trueNames.length < 3)) {
    mode = "true";
  }
  if (mode === "true" && (trueNames.length < 1 || falseNames.length < 3)) {
    mode = "false";
  }

  currentMode = mode;

  // Обновляем подсказку под текущее выражение и режим
  document.getElementById("hintBtn").onclick = function () {
    const hintText =
      mode === "false" ? selectedLogic.hintFalse : selectedLogic.hintTrue;
    showHintBox(`💡 Подсказка: ${hintText}`);
  };

  let selectedTarget;
  let shuffledOthers;
  let names;

  if (mode === "false") {
    // Берём РОВНО 1 имя, для которого выражение ЛОЖНО, и 3 для которых ИСТИННО
    selectedTarget = falseNames[Math.floor(Math.random() * falseNames.length)];
    shuffledOthers = [...trueNames].sort(() => Math.random() - 0.5).slice(0, 3);
    names = [...shuffledOthers, selectedTarget].sort(() => Math.random() - 0.5);
    currentAnswer = names.indexOf(selectedTarget) + 1;
  } else {
    // Берём РОВНО 1 имя, для которого выражение ИСТИННО, и 3 для которых ЛОЖНО
    selectedTarget = trueNames[Math.floor(Math.random() * trueNames.length)];
    shuffledOthers = [...falseNames]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    names = [...shuffledOthers, selectedTarget].sort(() => Math.random() - 0.5);
    currentAnswer = names.indexOf(selectedTarget) + 1;
  }

  // Сохраняем правильное имя для вывода в ответе
  currentCorrectName = names[currentAnswer - 1];

  const conditionWord = mode === "false" ? "ЛОЖНО" : "ИСТИННО";

  document.getElementById("taskText").innerHTML = `
        В поле ответа запишите <strong>номер</strong> имени, для которого ${conditionWord} высказывание:<br />
        <span class="highlight logic-expression">${selectedLogic.text}</span>
        <ol class="task-options">
            <li>${names[0]}</li>
            <li>${names[1]}</li>
            <li>${names[2]}</li>
            <li>${names[3]}</li>
        </ol>
    `;
}

function checkAnswer() {
  const answer = document.getElementById("answerInput").value.trim();

  if (answer === "") {
    showFeedback("Введите ответ сначала", "warning");
    return;
  }

  const isCorrect = parseInt(answer) === currentAnswer;
  if (isCorrect) {
    const conditionWord = currentMode === "false" ? "ложно" : "истинно";
    showFeedback(
      `✅ Правильно! Выражение ${conditionWord} только для имени ${currentCorrectName}.`,
      "success",
    );
  } else {
    showFeedback(
      "❌ Неправильно. Попробуйте ещё раз или воспользуйтесь подсказкой.",
      "error",
    );
  }

  // Отправляем результат в родительское окно (режим экзамена)
  VPR7_ExamUtils.sendExamResult(isCorrect);
}

function clearAnswer() {
  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").focus();
  hideFeedback();
  hideHint();
}

function showHint() {
  // Эта функция теперь переопределяется динамически при каждой генерации задачи
  // в соответствии с выбранным логическим выражением
}

function showFeedback(message, type) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.className = "feedback " + type;
  feedback.style.display = "block";
}

function hideFeedback() {
  document.getElementById("feedback").style.display = "none";
}

function showHintBox(message) {
  const hintBox = document.getElementById("hintBox");
  hintBox.textContent = message;
  hintBox.style.display = "block";
}

function hideHint() {
  document.getElementById("hintBox").style.display = "none";
}
