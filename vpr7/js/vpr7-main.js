// vpr7/vpr7/js/vpr7-main.js
// Инициализация заданий 7 класса

(function() {
  'use strict';

  // Инициализация элементов заданий
  function initTasks() {
    const taskElements = document.querySelectorAll('.task-card');
    taskElements.forEach(function(el, index) {
      el.dataset.taskId = (index + 1).toString();
      el.dataset.taskName = 'vpr7-' + (index + 1);
    });

    // Отрисовка заданий из данных
    renderTasks();
  }

  // Отрисовка карточек заданий
  function renderTasks() {
    const container = document.querySelector('.tasks-grid');
    if (!container) return;

    // Данные заданий из JSON
    const tasks = window.VPR7_Tasks || [];

    if (tasks.length === 0) {
      container.innerHTML = '<p>Задания будут загружены динамически...</p>';
      return;
    }

    tasks.forEach(function(task) {
      const card = document.createElement('a');
      card.href = 'vpr7-' + task.id + '.html';
      card.className = 'task-card';
      card.dataset.taskId = task.id;
      card.innerHTML = '<h3>' + task.title + '</h3>';
      
      container.appendChild(card);
    });
  }

  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', function() {
    initTasks();
  });

})();