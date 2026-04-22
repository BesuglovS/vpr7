/**
 * VPR 8 Class - Task 4 Generator
 * Задание 4: Вычитание в системах счисления столбиком
 */

let currentAnswer = "";
let correctCount = 0;
let totalCount = 0;
let wrongCount = 0;

function initTask4() {
  generateNewTask();

  document.getElementById("checkBtn").addEventListener("click", checkAnswer);
  document.getElementById("clearBtn").addEventListener("click", clearAnswer);
  document.getElementById("hintBtn").addEventListener("click", showHint);
  document.getElementById("newTaskBtn").addEventListener("click", generateNewTask);

  // Обработчик Enter в поле ввода
  document.getElementById("answerInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });
}

function generateNewTask() {
  // Сброс состояния
  document.getElementById("feedback").className = "feedback";
  document.getElementById("feedback").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("answerInput").value = "";
  document.getElementById("checkBtn").disabled = false;
  document.getElementById("answerInput").disabled = false;

  // Доступные системы счисления (кроме 10)
  const systems = [2, 8, 16];
  const base = systems[Math.floor(Math.random() * systems.length)];

  // Генерируем два числа, первое всегда больше второго
  const num1 = Math.floor(Math.random() * 800) + 200;
  const num2 = Math.floor(Math.random() * (num1 - 50)) + 10;

  // Преобразуем в выбранную систему счисления
  const num1Str = num1.toString(base).toUpperCase();
  const num2Str = num2.toString(base).toUpperCase();

  // Вычисляем правильный ответ
  const result = num1 - num2;
  currentAnswer = result.toString(base).toUpperCase();

  // Названия систем счисления
  const systemNames = { 
    2: "двоичной", 
    8: "восьмеричной", 
    16: "шестнадцатеричной" 
  };

  // Подстрочные индексы для отображения основания
  const subscripts = { 2: "₂", 8: "₈", 16: "₁₆" };

  // Обновляем текст задания
  document.getElementById("taskText").innerHTML = `
    Выполните вычитание: ${num1Str}${subscripts[base]} – ${num2Str}${subscripts[base]}.<br>
    Ответ запишите в ${systemNames[base]} системе счисления. Основание системы писать не нужно.
  `;

  // Фокус на поле ввода
  document.getElementById("answerInput").focus();
}

function checkAnswer() {
  const userAnswer = document.getElementById("answerInput").value.trim().toUpperCase();
  const feedback = document.getElementById("feedback");

  if (!userAnswer) {
    feedback.className = "feedback";
    feedback.innerHTML = "⚠️ Введите ответ сначала";
    feedback.style.display = "block";
    return;
  }

  totalCount++;
  document.getElementById("answerInput").disabled = true;

  if (userAnswer === currentAnswer) {
    correctCount++;
    feedback.className = "feedback correct";
    feedback.innerHTML = "✅ Правильно! Отличная работа!";
  } else {
    wrongCount++;
    feedback.className = "feedback incorrect";
    feedback.innerHTML = `❌ Неверно.<br><div class="correct-answer">Правильный ответ: <strong>${currentAnswer}</strong></div>`;
  }

  feedback.style.display = "block";
  updateStats();
  document.getElementById("checkBtn").disabled = true;
}

function showHint() {
  const hintBox = document.getElementById("hintBox");
  hintBox.innerHTML = `<strong>💡 Подсказка:</strong><br>Вычитайте числа столбиком справа налево. Если цифра уменьшаемого меньше цифры вычитаемого — займите единицу из соседнего старшего разряда. Одна единица старшего разряда равна основанию системы в младшем разряде. Переводить в десятичную систему не нужно!`;
  hintBox.style.display = "block";
}

function clearAnswer() {
  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").disabled = false;
  document.getElementById("feedback").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("checkBtn").disabled = false;
  document.getElementById("answerInput").focus();
}