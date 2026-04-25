/**
 * VPR 7 Class - Exam Utilities Module
 * Общие функции для всех страниц заданий в режиме экзамена
 */

/**
 * Отправка результата в родительское окно (режим экзамена)
 * @param {boolean} correct - Правильность ответа
 */
function sendExamResult(correct) {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "vpr7-task-result",
        correct: correct,
      },
      "*",
    );
  }
}

/**
 * Отправка высоты контента в режим экзамена
 */
function sendContentHeight() {
  if (window.parent !== window) {
    requestAnimationFrame(() => {
      const container = document.querySelector(".container");
      let height;
      if (container) {
        // Измеряем высоту контейнера + padding body (20px top + 20px bottom)
        height = container.scrollHeight + 40;
      } else {
        const doc = document.documentElement;
        const body = document.body;
        const originalHtmlHeight = doc.style.height;
        const originalBodyHeight = body.style.height;
        doc.style.height = "";
        body.style.height = "";
        height = Math.max(
          body.scrollHeight,
          doc.scrollHeight,
          body.offsetHeight,
          doc.offsetHeight,
        );
        doc.style.height = originalHtmlHeight;
        body.style.height = originalBodyHeight;
      }
      window.parent.postMessage(
        {
          type: "vpr7-content-height",
          height: height,
        },
        "*",
      );
    });
  }
}

/**
 * Скрытие навигации в режиме экзамена
 */
function hideExamNavigation() {
  if (window.parent !== window) {
    // Скрываем ссылку "На главную"
    const backLinks = document.querySelectorAll(".back-link");
    backLinks.forEach((link) => (link.style.display = "none"));

    // Скрываем кнопку "Теория"
    const theoryLinks = document.querySelectorAll('a[href*="-t.html"]');
    theoryLinks.forEach((link) => (link.style.display = "none"));

    // Скрываем кнопку "Подсказка"
    const hintButtons = document.querySelectorAll(".btn-hint");
    hintButtons.forEach((btn) => (btn.style.display = "none"));

    // Скрываем кнопку "Очистить"
    const clearButtons = document.querySelectorAll(".btn-clear");
    clearButtons.forEach((btn) => (btn.style.display = "none"));

    // Скрываем кнопку "Начать заново" / "Новое задание"
    const resetButtons = document.querySelectorAll(".btn-reset");
    resetButtons.forEach((btn) => (btn.style.display = "none"));

    // Скрываем счётчик очков / заданий
    const scoreBoards = document.querySelectorAll(".score-board");
    scoreBoards.forEach((board) => (board.style.display = "none"));
  }
}

/**
 * Показ сообщения о завершённом задании
 * @param {boolean} correct - Правильность ответа
 * @param {string} containerSelector - Селектор контейнера для сообщения
 * @param {string[]} elementsToHide - Селекторы элементов для скрытия
 */
function showCompletedMessage(
  correct,
  containerSelector = ".container",
  elementsToHide = null,
) {
  // Элементы для скрытия по умолчанию
  const defaultSelectors = [
    ".task-card",
    ".score-board",
    ".buttons",
    ".game-area",
  ];
  const selectorsToHide = elementsToHide || defaultSelectors;

  // Скрываем указанные элементы
  selectorsToHide.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) el.style.display = "none";
  });

  // Показываем сообщение
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = "completed-message";
  messageDiv.style.cssText = `
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    margin-top: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  `;

  if (correct) {
    messageDiv.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
      <h2 style="color: #11998e; margin-bottom: 15px; font-size: 1.5rem;">Задание уже выполнено!</h2>
      <p style="color: #333; font-size: 1.1rem;">Вы правильно выполнили это задание в режиме экзамена.</p>
    `;
  } else {
    messageDiv.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: 20px;">❌</div>
      <h2 style="color: #eb3349; margin-bottom: 15px; font-size: 1.5rem;">Задание уже выполнено!</h2>
      <p style="color: #333; font-size: 1.1rem;">Вы допустили ошибку в этом задании в режиме экзамена.</p>
    `;
  }

  container.appendChild(messageDiv);
  sendContentHeight();
}

/**
 * Настройка слушателя сообщений от родительского окна (режим экзамена)
 * @param {Function} onComplete - Callback при получении статуса задания
 */
function setupExamMessageListener(onComplete) {
  window.addEventListener("message", function (event) {
    if (event.data && event.data.type === "vpr7-task-status") {
      if (event.data.completed && onComplete) {
        onComplete(event.data.correct);
      }
    }
  });
}

/**
 * Инициализация режима экзамена
 * @param {Object} options - Параметры инициализации
 * @param {Function} [options.onComplete] - Callback при завершении задания
 * @param {string} [options.containerSelector] - Селектор контейнера
 * @param {string[]} [options.elementsToHide] - Элементы для скрытия при завершении
 */
function initExamMode(options = {}) {
  const { onComplete, containerSelector, elementsToHide } = options;

  hideExamNavigation();
  setupExamMessageListener((correct) => {
    showCompletedMessage(
      correct,
      containerSelector || ".container",
      elementsToHide,
    );
    if (onComplete) onComplete(correct);
  });

  // Отправляем высоту после загрузки страницы
  window.addEventListener("load", sendContentHeight);
  window.addEventListener("resize", sendContentHeight);
}

// ============================================
// Drag & Drop Touch Handlers
// ============================================

/**
 * Создание touch handlers для drag-and-drop
 * @param {Object} options - Параметры
 * @param {Function} options.onMove - Callback при перемещении (touch, element)
 * @param {Function} options.onEnd - Callback при завершении (touch, element)
 * @param {Function} options.getDropTarget - Функция для определения целевого элемента (touch) => element
 * @returns {Object} - Объект с обработчиками
 */
function createTouchHandlers(options = {}) {
  let touchElement = null;
  let touchClone = null;

  function handleTouchStart(e) {
    e.preventDefault();
    touchElement = e.target;
    const touch = e.touches[0];

    // Создаем клон для перетаскивания
    touchClone = touchElement.cloneNode(true);
    touchClone.style.position = "fixed";
    touchClone.style.zIndex = "1000";
    touchClone.style.pointerEvents = "none";
    touchClone.style.opacity = "0.8";
    touchClone.style.transform = "scale(1.1)";
    document.body.appendChild(touchClone);

    updateClonePosition(touch);
    touchElement.classList.add("dragging");
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone) return;

    const touch = e.touches[0];
    updateClonePosition(touch);

    if (options.onMove) {
      options.onMove(touch, touchElement);
    }
  }

  function handleTouchEnd(e) {
    if (!touchElement || !touchClone) return;

    const touch = e.changedTouches[0];

    if (options.onEnd) {
      options.onEnd(touch, touchElement);
    }

    touchElement.classList.remove("dragging");
    touchClone.remove();
    touchClone = null;
    touchElement = null;
  }

  function updateClonePosition(touch) {
    if (touchClone) {
      touchClone.style.left = touch.clientX - touchClone.offsetWidth / 2 + "px";
      touchClone.style.top = touch.clientY - touchClone.offsetHeight / 2 + "px";
    }
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    updateClonePosition,
  };
}

/**
 * Подсветка drop zones при touch перетаскивании
 * @param {Touch} touch - Touch object
 * @param {NodeList} dropZones - Список drop zone элементов
 * @param {string} highlightClass - CSS класс для подсветки
 */
function highlightDropZones(touch, dropZones, highlightClass = "drag-over") {
  dropZones.forEach((zone) => {
    const rect = zone.getBoundingClientRect();
    if (
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom
    ) {
      zone.classList.add(highlightClass);
    } else {
      zone.classList.remove(highlightClass);
    }
  });
}

/**
 * Определение целевой drop zone
 * @param {Touch} touch - Touch object
 * @param {NodeList} dropZones - Список drop zone элементов
 * @returns {Element|null} - Целевой элемент или null
 */
function getTouchDropTarget(touch, dropZones) {
  for (const zone of dropZones) {
    const rect = zone.getBoundingClientRect();
    if (
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom
    ) {
      return zone;
    }
  }
  return null;
}

// Export for use in pages
if (typeof window !== "undefined") {
  window.VPR7_ExamUtils = {
    sendExamResult,
    sendContentHeight,
    hideExamNavigation,
    showCompletedMessage,
    setupExamMessageListener,
    initExamMode,
    createTouchHandlers,
    highlightDropZones,
    getTouchDropTarget,
  };
}

// Export for ES6 modules if supported
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    sendExamResult,
    sendContentHeight,
    hideExamNavigation,
    showCompletedMessage,
    setupExamMessageListener,
    initExamMode,
    createTouchHandlers,
    highlightDropZones,
    getTouchDropTarget,
  };
}
