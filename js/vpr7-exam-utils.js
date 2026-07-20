/**
 * vpr7-exam-utils.js
 * Утилиты для режима экзамена
 */

const VPR7_ExamUtils = (function() {
  let timerInterval = null;
  let startTime = null;
  let taskOrder = null; // [1, 2, 3, ..., 12] - порядок выполнения заданий
  let taskResults = {
    completed: [],
    attempted: [],
    scores: {}
  };
  let taskCompleteCallbacks = [];

  /**
   * Инициализация режима экзамена
   */
  function initExamMode() {
    // Очищаем timer
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = null;
    taskResults = { completed: [], attempted: [], scores: {} };
    taskOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    // Отправляем сообщение в родительское окно
    window.opener && window.opener.postMessage({
      type: 'VPR7_EXAM_READY',
      taskOrder: taskOrder
    }, '*');
  }

  /**
   * Запуск таймера
   * @param {number} duration - Длительность экзамена в секундах (0 для бесконечного)
   */
  function startTimer(duration) {
    if (duration > 0) {
      const remaining = duration;
      timerInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          finishExam(true); // Автозавершение при истечении времени
        }
        updateTimerDisplay(remaining);
      }, 1000);
    }
  }

  /**
   * Остановка таймера
   */
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  /**
   * Обновление отображения таймера
   * @param {number} seconds - Оставшееся время в секундах
   */
  function updateTimerDisplay(seconds) {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerElement.textContent = 
        (minutes > 0 ? minutes + ':' : '') + 
        (secs < 10 ? '0' : '') + secs + ' ';
    }
  }

  /**
   * Завершение экзамена
   * @param {boolean} auto - Автозавершение
   */
  async function finishExam(auto = false) {
    stopTimer();
    
    // Ждём пока все задания будут обработаны
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Собираем результаты
    const results = collectResults();
    
    // Показываем результаты
    showResultsScreen(results);
    
    // Отправляем результаты в родительское окно
    window.opener && window.opener.postMessage({
      type: 'VPR7_EXAM_COMPLETE',
      results: results
    }, '*');
    
    // Очищаем storage
    window.VPR7_Storage && window.VPR7_Storage.clearProgress();
  }

  /**
   * Сбор результатов всех заданий
   * @returns {Object} Объект с результатами
   */
  function collectResults() {
    const frame = document.getElementById('taskFrame');
    const results = {
      correct: 0,
      incorrect: 0,
      total: 12,
      tasks: {}
    };

    if (!frame) return results;

    // Получаем данные через postMessage от iframe
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'TASK_RESULT') {
        const { taskId, correct } = event.data;
        
        if (correct) {
          results.correct++;
        } else {
          results.incorrect++;
        }
        
        results.tasks[taskId] = correct;
        
        // Удаляем обработчик
        frame.removeEventListener('message', handleMessage);
      }
    };

    frame.addEventListener('message', handleMessage);

    // Запрашиваем результаты от каждого задания
    taskOrder.forEach(taskId => {
      frame.postMessage({
        type: 'REQUEST_RESULT',
        taskId: taskId
      }, '*');
    });

    return results;
  }

  /**
   * Показываеc экран результатов
   * @param {Object} results - Результаты
   */
  function showResultsScreen(results) {
    const resultsScreen = document.getElementById('resultsScreen');
    const taskContainer = document.getElementById('taskContainer');
    
    if (resultsScreen && taskContainer) {
      taskContainer.style.display = 'none';
      resultsScreen.style.display = 'block';
      
      // Итоговая оценка
      let grade;
      const percent = (results.correct / results.total) * 100;
      
      if (percent >= 90) grade = '5';
      else if (percent >= 75) grade = '4';
      else if (percent >= 50) grade = '3';
      else grade = '2';
      
      resultsScreen.querySelector('.results-score').textContent = `${grade} (${results.correct}/${results.total})`;
      resultsScreen.querySelector('.results-message').textContent = 
        `Вы набрали ${grade} баллов (${percent.toFixed(0)}%)`;
      
      // Детализация по заданиям
      const breakdown = resultsScreen.querySelector('.results-breakdown');
      if (breakdown) {
        breakdown.innerHTML = '<h3>📋 Детализация по заданиям</h3>';
        
        taskOrder.forEach(taskId => {
          const status = results.tasks[taskId] === true ? '✅' : '❌';
          const percentTask = (taskId === 1 ? 0 : taskId); // Упрощённая логика
          breakdown.innerHTML += `
            <div class="task-result-item" style="display: flex; justify-content: space-between; margin: 5px 0; padding: 10px; background: ${results.tasks[taskId] ? '#e8f5e9' : '#ffebee'}; border-radius: 8px;">
              <span>Задание ${taskId}</span>
              <span>${status}</span>
            </div>
          `;
        });
      }
      
      // Кнопка завершения
      const finishBtn = resultsScreen.querySelector('.btn-finish');
      if (finishBtn) {
        finishBtn.addEventListener('click', () => {
          resultsScreen.style.display = 'none';
          window.close(); // Закрыть окно
        });
      }
    }
  }

  /**
   * Установка обработчика завершения задания
   * @param {Function} callback - Функция обратного вызова
   */
  function setupTaskCompleteCallback(callback) {
    taskCompleteCallbacks.push(callback);
  }

  /**
   * Уведомление о завершении задания
   * @param {number} taskId - ID задания
   * @param {boolean} correct - Правильный ли ответ
   */
  function notifyTaskComplete(taskId, correct) {
    const result = {
      taskId: taskId,
      correct: correct,
      type: 'TASK_COMPLETE'
    };
    
    // Обновляем taskResults
    if (correct) {
      taskResults.completed.push(taskId);
      taskResults.scores[taskId] = true;
    } else {
      taskResults.attempted.push(taskId);
      taskResults.scores[taskId] = false;
    }
    
    // Обновляем progress в storage
    if (window.VPR7_Storage) {
      const progress = window.VPR7_Storage.getProgress();
      progress.completed = taskResults.completed;
      progress.attempted = taskResults.attempted;
      progress.scores = taskResults.scores;
      window.VPR7_Storage.save('vpr7-progress', progress);
    }
    
    // Обновляем прогресс-бар
    const progressValue = (taskResults.completed.length / 12) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = progressValue + '%';
    }
    
    // Обновляем счётчик заданий
    const currentTaskNum = document.getElementById('currentTaskNum');
    if (currentTaskNum) {
      currentTaskNum.textContent = taskResults.attempted.length + 1;
    }
    
    // Вызываем callback'ы
    taskCompleteCallbacks.forEach(cb => cb(taskId, correct));
  }

  /**
   * Отправка результата экзамена
   * @param {boolean} correct - Правильный ли ответ
   */
  function sendExamResult(correct) {
    notifyTaskComplete(null, correct);
  }

  /**
   * Показываеc сообщение о завершении задания
   * @param {boolean} correct - Правильный ли ответ
   * @param {string} container - Контейнер для сообщения
   * @param {Array} elements - Элементы для скрытия
   */
  function showCompletedMessage(correct, container, elements) {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;
    
    const message = correct ? '✅' : '❌';
    const summary = document.createElement('div');
    summary.className = 'task-completed-message';
    summary.style.cssText = 'position: fixed; top: 20px; right: 20px; padding: 15px 25px; background: ' + 
      (correct ? '#4caf50' : '#f44336') + '; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000;';
    summary.textContent = `${message} Задание выполнено!`;
    
    containerEl.appendChild(summary);
    
    // Скрыть элементы
    elements.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) el.style.display = 'none';
    });
    
    // Удалить сообщение через 3 секунды
    setTimeout(() => summary.remove(), 3000);
  }

  // Экспорт публичного API
  return {
    initExamMode,
    startTimer,
    stopTimer,
    finishExam,
    setupTaskCompleteCallback,
    notifyTaskComplete,
    sendExamResult,
    showCompletedMessage
  };

})();

// Экспорт для браузерной среды
if (typeof window !== 'undefined') {
  window.VPR7_ExamUtils = VPR7_ExamUtils;
}

// Экспорт для ES modules
export default VPR7_ExamUtils;