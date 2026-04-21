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

  // Генерируем случайные границы в разных системах счисления
  const systems = [2, 8, 16];

  // Выбираем случайные системы для границ
  const leftSystem = systems[Math.floor(Math.random() * systems.length)];
  const rightSystem = systems[Math.floor(Math.random() * systems.length)];

  // Генерируем нижнюю и верхнюю границы в десятичной
  const minValue = Math.floor(Math.random() * 150) + 100;
  const maxValue = minValue + Math.floor(Math.random() * 120) + 30;

  // Преобразуем границы в выбранные системы
  const leftBoundary = minValue.toString(leftSystem).toUpperCase();
  const rightBoundary = maxValue.toString(rightSystem).toUpperCase();

  // Получаем названия систем
  const systemNames = { 2: "₂", 8: "₈", 10: "₁₀", 16: "₁₆" };

  // Генерируем 4 варианта ответа в двоичной системе
  const options = [];

  // Правильный ответ - случайное число между границами
  const correctValue =
    minValue + Math.floor(Math.random() * (maxValue - minValue - 2)) + 1;
  const correctBinary = correctValue.toString(2);

  // 3 неправильных ответа
  const wrongValues = [];

  // Ниже границы
  wrongValues.push(minValue - Math.floor(Math.random() * 50) - 1);
  // Выше границы
  wrongValues.push(maxValue + Math.floor(Math.random() * 50) + 1);
  // Случайное рядом
  const nearValue =
    correctValue +
    (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 2);
  wrongValues.push(nearValue);

  // Собираем все варианты
  options.push({ value: correctBinary, correct: true });
  wrongValues.forEach((v) => {
    options.push({ value: v.toString(2), correct: false });
  });

  // Перемешиваем варианты
  options.sort(() => Math.random() - 0.5);

  // Сохраняем правильный ответ
  currentAnswer = options.findIndex((o) => o.correct) + 1;

  // Обновляем текст задания
  document.getElementById("taskText").innerHTML = `
    Какое из чисел, записанных в двоичной системе счисления, удовлетворяет условию<br>
    <span class="highlight">${leftBoundary}</span>${systemNames[leftSystem]} <strong><</strong> <em>а</em> <strong><</strong> <span class="highlight">${rightBoundary}</span>${systemNames[rightSystem]}?
  `;

  // Обновляем варианты ответа
  const optionBtns = document.querySelectorAll(".option-btn");
  options.forEach((opt, i) => {
    optionBtns[i].textContent = `${i + 1}) ${opt.value}`;
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

  // Обновляем статистику
  updateStats();

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
