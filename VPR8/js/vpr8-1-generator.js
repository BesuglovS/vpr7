/**
 * VPR 8 Class - Task 1 Generator
 * Задание 1: Перевод чисел между системами счисления
 */

let currentAnswer = "";
let correctCount = 0;
let totalCount = 0;
let wrongCount = 0;

function initTask1() {
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
  // Сброс состояния
  document.getElementById("feedback").className = "feedback";
  document.getElementById("feedback").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").disabled = false;
  document.getElementById("checkBtn").disabled = false;
  document.getElementById("answerInput").focus();

  // Выбираем случайный тип перевода
  // Только 2 типа заданий: перевод из десятичной и перевод в десятичную
  const conversionTypes = [
    { from: 10, to: 2, fromName: "десятичное", toName: "двоичную" },
    { from: 10, to: 8, fromName: "десятичное", toName: "восьмеричную" },
    { from: 10, to: 16, fromName: "десятичное", toName: "шестнадцатеричную" },
    { from: 2, to: 10, fromName: "двоичное", toName: "десятичную" },
    { from: 8, to: 10, fromName: "восьмеричное", toName: "десятичную" },
    { from: 16, to: 10, fromName: "шестнадцатеричное", toName: "деся
    { from: 8, to: 2, fromName: "восьмеричное", toName: "двоичную" },
    { from: 2, to: 16, fromName: "двоичное", toName: "шестнадцатеричную" },
    { from: 16, to: 2, fromName: "шестнадцатеричное", toName: "двоичную" },
    { from: 8, to: 16, fromName: "восьмеричное", toName: "шестнадцатеричную" },
    { from: 16, to: 8, fromName: "шестнадцатеричное", toName: "восьмеричную" },
  ];

  const type =
    conversionTypes[Math.floor(Math.random() * conversionTypes.length)];

  // Генерируем число от 1 до 1024
  const decimalNumber = Math.floor(Math.random() * 1023) + 1;

  // Конвертируем в исходную систему
  let sourceNumber = decimalNumber.toString(type.from).toUpperCase();

  // Получаем правильный ответ
  currentAnswer = parseInt(sourceNumber, type.from)
    .toString(type.to)
    .toUpperCase();

  // Обновляем текст задания
  document.getElementById("numberValue").textContent = sourceNumber;
  document.getElementById("targetSystem").textContent = type.toName;

  // Обновляем формулировку в зависимости от типа
  const taskText = document.getElementById("taskText");
  if (type.from === 10) {
    taskText.innerHTML = `Переведите ${type.fromName} число <span class="highlight" id="numberValue">${sourceNumber}</span> в <span class="highlight" id="targetSystem">${type.toName}</span> систему счисления.`;
  } else {
    taskText.innerHTML = `Переведите ${type.fromName} число <span class="highlight" id="numberValue">${sourceNumber}</span><sub>${type.from}</sub> в <span class="highlight" id="targetSystem">${type.toName}</span> систему счисления.`;
  }
}

function checkAnswer() {
  const userAnswer = document
    .getElementById("answerInput")
    .value.trim()
    .toUpperCase();
  const feedback = document.getElementById("feedback");

  totalCount++;

  if (userAnswer === currentAnswer) {
    correctCount++;
    feedback.className = "feedback correct";
    feedback.innerHTML = "✅ Правильно! Отличная работа!";
  } else {
    wrongCount++;
    feedback.className = "feedback incorrect";
    feedback.innerHTML = `❌ Неверно.<br><div class="correct-answer">Правильный ответ: <strong>${currentAnswer}</strong></div>`;

    // Анимация тряски для неправильного ответа
    document.getElementById("answerInput").classList.add("shake");
    setTimeout(() => {
      document.getElementById("answerInput").classList.remove("shake");
    }, 500);
  }

  feedback.style.display = "block";

  // Обновляем статистику
  updateStats();

  // Блокируем проверку
  document.getElementById("checkBtn").disabled = true;
  document.getElementById("answerInput").disabled = true;
}

function showHint() {
  const hintBox = document.getElementById("hintBox");
  hintBox.innerHTML = `<strong>💡 Подсказка:</strong><br>Для перевода числа последовательно делите его на основание системы и записывайте остатки в обратном порядке.`;
  hintBox.style.display = "block";
}

function clearAnswer() {
  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").focus();
  document.getElementById("feedback").style.display = "none";
  document.getElementById("hintBox").style.display = "none";
}
