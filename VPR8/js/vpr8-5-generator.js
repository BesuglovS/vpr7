let currentAnswer = 4;
let currentCorrectName = "";

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
      hint: "Выражение A ИЛИ B ложно только когда и A и B ложны одновременно. Отрицание НЕ (A) ложно когда A истинно.",
    },
    {
      text: "(Первая буква гласная) И НЕ (Последняя буква гласная)",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const lastV = vowels.includes(name[name.length - 1].toUpperCase());
        return firstV && !lastV;
      },
      hint: "Выражение A И B ложно когда хотя бы одно из них ложно. Отрицание НЕ (B) истинно когда B ложно.",
    },
    {
      text: "(Первая буква согласная) ИЛИ (Последняя буква согласная)",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const lastV = vowels.includes(name[name.length - 1].toUpperCase());
        return !firstV || !lastV;
      },
      hint: "Выражение A ИЛИ B ложно только когда и A и B ложны одновременно.",
    },
    {
      text: "(Вторая буква гласная) И (Третья буква согласная)",
      check: (name, vowels) => {
        const secondV = vowels.includes(name[1].toUpperCase());
        const thirdV = vowels.includes(name[2].toUpperCase());
        return secondV && !thirdV;
      },
      hint: "Выражение A И B ложно когда хотя бы одно из них ложно. Обратите внимание что нумерация букв начинается с 1.",
    },
    {
      text: "НЕ ((Первая буква гласная) И (Вторая буква гласная))",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const secondV = vowels.includes(name[1].toUpperCase());
        return !(firstV && secondV);
      },
      hint: "По закону Де Моргана: НЕ (A И B) = НЕ A ИЛИ НЕ B. Выражение ложно только когда и A и B истинны.",
    },
    {
      text: "(Третья буква гласная) ИЛИ (Предпоследняя буква гласная)",
      check: (name, vowels) => {
        const thirdV = vowels.includes(name[2].toUpperCase());
        const prelastV = vowels.includes(name[name.length - 2].toUpperCase());
        return thirdV || prelastV;
      },
      hint: "Выражение A ИЛИ B ложно только когда и A и B ложны одновременно.",
    },
    {
      text: "(Вторая буква согласная) И НЕ (Третья буква согласная)",
      check: (name, vowels) => {
        const secondV = vowels.includes(name[1].toUpperCase());
        const thirdV = vowels.includes(name[2].toUpperCase());
        return !secondV && thirdV;
      },
      hint: "Выражение A И B ложно когда хотя бы одно из них ложно. Отрицание НЕ (B) истинно когда B ложно.",
    },
    {
      text: "(Первая буква гласная) И (Третья буква гласная)",
      check: (name, vowels) => {
        const firstV = vowels.includes(name[0].toUpperCase());
        const thirdV = vowels.includes(name[2].toUpperCase());
        return firstV && thirdV;
      },
      hint: "Выражение A И B истинно только когда оба выражения истинны одновременно.",
    },
    {
      text: "НЕ (Вторая буква гласная) И НЕ (Предпоследняя буква гласная)",
      check: (name, vowels) => {
        const secondV = vowels.includes(name[1].toUpperCase());
        const prelastV = vowels.includes(name[name.length - 2].toUpperCase());
        return !secondV && !prelastV;
      },
      hint: "Выражение A И B ложно когда хотя бы одно из них ложно.",
    },
  ];

  // Выбираем случайное логическое выражение
  const selectedLogic =
    logicExpressions[Math.floor(Math.random() * logicExpressions.length)];

  // Обновляем подсказку под текущее выражение
  document.getElementById("hintBtn").onclick = function () {
    showHintBox(`💡 Подсказка: ${selectedLogic.hint}`);
  };

  // Разделяем имена на те для которых выражение ЛОЖНО и ИСТИННО
  const falseNames = allNames.filter(
    (name) => !selectedLogic.check(name, vowels),
  );
  const trueNames = allNames.filter((name) =>
    selectedLogic.check(name, vowels),
  );

  // Берем РОВНО 1 имя для которого выражение ЛОЖНО и 3 для которых ИСТИННО
  const selectedFalse =
    falseNames[Math.floor(Math.random() * falseNames.length)];

  // Перемешиваем истинные имена и берем 3 штуки
  const shuffledTrue = [...trueNames]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Собираем все 4 имени и перемешиваем их
  const names = [...shuffledTrue, selectedFalse].sort(
    () => Math.random() - 0.5,
  );

  // Находим индекс правильного ответа (нумерация с 1)
  currentAnswer = names.indexOf(selectedFalse) + 1;

  // Сохраняем правильное имя для вывода в ответе
  currentCorrectName = names[currentAnswer - 1];

  document.getElementById("taskText").innerHTML = `
        В поле ответа запишите <strong>номер</strong> имени, для которого ЛОЖНО высказывание:<br />
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

  if (parseInt(answer) === currentAnswer) {
    showFeedback(
      `✅ Правильно! Выражение ложно только для имени ${currentCorrectName}.`,
      "success",
    );
  } else {
    showFeedback(
      "❌ Неправильно. Попробуйте ещё раз или воспользуйтесь подсказкой.",
      "error",
    );
  }
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
