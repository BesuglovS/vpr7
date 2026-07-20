/**
 * vpr7-sw-register.js
 * Регистрация Service Worker для PWA-функциональности
 */

(function() {
  // Проверяем поддержку Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Загружаем sw.js из текущей директории
      const swUrl = './sw.js';
      
      // Если мы загружаем со страницы vpr7/, то путь должен быть ../sw.js
      const basePath = window.location.pathname.startsWith('/vpr7/') ? '' : '';
      
      // Определяем правильный путь к sw.js
      const scriptSrc = document.currentScript.src;
      const scriptPath = scriptSrc && scriptSrc.endsWith('.js') ? 
        scriptSrc.substring(0, scriptSrc.lastIndexOf('/js/')) : 
        './';
      
      // Путь к sw.js
      const swPath = scriptPath + 'sw.js';
      
      navigator.serviceWorker.register(swPath)
        .then(registration => {
          console.log('Service Worker registered. Scope:', registration.scope);
          
          // Регистрация завершена успешно
          if (registration.waiting) {
            console.log('Service Worker waiting for installation');
          }
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    });
  } else {
    console.log('Service Worker не поддерживается браузером');
  }
})();

// Экспорт для модульной системы
export default {};