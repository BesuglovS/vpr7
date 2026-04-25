/**
 * VPR 8 Class - Task 2 Generator
 * Задание 2: Сравнение чисел в разных системах счисления
 */

let currentAnswer = "";
let correctCount = 0;
let totalCount = 0;
let wrongCount = 0;

function initTask2() {
  generateNewTask();

  document.getElementById("checkBtn").addEventListener("click", checkAnswer);
  document.getElementById("clearBtn").addEventListener("click", clearAnswer);
  document.getElementById("hintBtn").addEventListener("click", showHint);
  document
    .getElementById("newTaskBtn")
    .addEventListener("click", generateNewTask);

  // Обработчики для вариантов ответа
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".option-btn")
        .forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      document.getElementById("selectedAnswer").value = this.dataset.value;
    });
  });
}

function generateNewTask() {
  // Сброс состояния
  document.getElementById("feedback").className = "feedback";
  document.getElementById("feedback").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("selectedAnswer").value = "";
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("selected", "correct", "incorrect");
    btn.disabled = false;
  });
  document.getElementById("checkBtn").disabled = false;

  // Генерируем границы в десятичной системе.
  // minValue от 40 до 140, maxValue от minValue+20 до 230.
  // Это гарантирует, что все числа 0..255 помещаются в 8 бит,
  // и есть запас для генерации неправильных ответов за пределами диапазона.
  const minValue = Math.floor(Math.random() * 100) + 40;
  const maxValue =
    minValue + Math.floor(Math.random() * (230 - minValue - 20)) + 20;

  // Выбираем случайные системы для границ
  const systems = [2, 8, 16];
  const leftSystem = systems[Math.floor(Math.random() * systems.length)];
  const rightSystem = systems[Math.floor(Math.random() * systems.length)];

  // Преобразуем границы в выбранные системы
  const leftBoundary = minValue.toString(leftSystem).toUpperCase();
  const rightBoundary = maxValue.toString(rightSystem).toUpperCase();

  // Получаем названия систем
  const systemNames = { 2: "₂", 8: "₈", 10: "₁₀", 16: "₁₆" };

  // Правильный ответ — строго внутри диапазона (minValue < a < maxValue)
  const correctValue =
    minValue + Math.floor(Math.random() * (maxValue - minValue - 1)) + 1;

  // Генерируем ровно 3 неправильных ответа, которые точно НЕ попадают в диапазон
  const wrongValues = new Set();

  // Один ответ ниже minValue (в диапазоне 0..minValue-1)
  wrongValues.add(Math.floor(Math.random() * minValue));

  // Один ответ выше maxValue (в диапазоне maxValue+1..255)
  wrongValues.add(maxValue + Math.floor(Math.random() * (255 - maxValue)) + 1);

  // Третий неправильный ответ — тоже строго вне диапазона
  while (wrongValues.size < 3) {
    if (Math.random() > 0.5) {
      const val = Math.floor(Math.random() * minValue);
      wrongValues.add(val);
    } else {
      const val = maxValue + Math.floor(Math.random() * (255 - maxValue)) + 1;
      wrongValues.add(val);
    }
  }

  const wrongValuesArray = Array.from(wrongValues);

  // Собираем все варианты
  const options = [
    { value: correctValue, correct: true },
    ...wrongValuesArray.map((v) => ({ value: v, correct: false })),
  ];

  // Перемешиваем варианты
  options.sort(() => Math.random() - 0.5);

  // Сохраняем правильный ответ
  currentAnswer = options.findIndex((o) => o.correct) + 1;

  // Обновляем текст задания
  document.getElementById("taskText").innerHTML = `
    Какое из чисел, записанных в двоичной системе счисления, удовлетворяет условию<br>
    <span class="highlight">${leftBoundary}</span>${systemNames[leftSystem]} <strong><</strong> <em>а</em> <strong><</strong> <span class="highlight">${rightBoundary}</span>${systemNames[rightSystem]}?
  `;

  // Обновляем варианты ответа — все числа с одинаковой длиной (8 бит)
  const optionBtns = document.querySelectorAll(".option-btn");
  options.forEach((opt, i) => {
    const binary = opt.value.toString(2).padStart(8, "0");
    optionBtns[i].textContent = `${i + 1}) ${binary}`;
    optionBtns[i].dataset.value = i + 1;
    optionBtns[i].dataset.correct = opt.correct;
  });
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("selectedAnswer").value);
  const feedback = document.getElementById("feedback");

  totalCount++;

  // Показываем правильные и неправильные варианты
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (parseInt(btn.dataset.value) === userAnswer) {
      btn.classList.add("incorrect");
    }
  });

  if (userAnswer === currentAnswer) {
    correctCount++;
    feedback.className = "feedback correct";
    feedback.innerHTML = "✅ Правильно! Отличная работа!";
  } else {
    wrongCount++;
    feedback.className = "feedback incorrect";
    feedback.innerHTML = `❌ Неверно.<br><div class="correct-answer">Правильный ответ: <strong>вариант ${currentAnswer}</strong></div>`;
  }

  feedback.style.display = "block";

  // Отправляем результат в родительское окно (режим экзамена)
  VPR7_ExamUtils.sendExamResult(userAnswer === currentAnswer);

  // Блокируем проверку
  document.getElementById("checkBtn").disabled = true;
}

function showHint() {
  const hintBox = document.getElementById("hintBox");
  hintBox.innerHTML = `<strong>💡 Подсказка:</strong><br>Переведите все числа в десятичную систему счисления и сравните. Чтобы быстро перевести между системами, можно использовать двоичную систему как промежуточную.`;
  hintBox.style.display = "block";
}

function clearAnswer() {
  document.getElementById("selectedAnswer").value = "";
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("selected", "correct", "incorrect");
    btn.disabled = false;
  });
  document.getElementById("feedback").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
}
