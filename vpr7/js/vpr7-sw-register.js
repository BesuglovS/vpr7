/**
 * VPR 7-8 - Service Worker Registration
 * Регистрация service worker для PWA (офлайн-режим).
 * Размещается в корне vpr7/ и подключается на всех страницах.
 * Путь к SW определяется автоматически относительно текущей страницы.
 */

(function () {
  // Только в браузере с поддержкой SW и по http/https (не file://)
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    // На file:// SW не работает; на корпоративных IP можно разрешить через hostname
    if (location.protocol === "file:") return;
  }

  /**
   * Вычисление пути к sw.js относительно корня vpr7/.
   * На страницах vpr7/vpr7/*.html путь будет "../sw.js".
   * На vpr.html — "./sw.js" (если vpr.html в корне vpr7/).
   * На vpr7/vpr7.html — "../sw.js".
   */
  function detectSwPath() {
    const path = location.pathname.replace(/\\/g, "/");
    // Если URL заканчивается на /vpr7/ или содержит /vpr7/vpr7/, /VPR8/
    if (path.indexOf("/vpr7/vpr7/") !== -1 || path.indexOf("/VPR8/") !== -1) {
      return "../../sw.js";
    }
    if (path.indexOf("/vpr7/") !== -1) {
      return "../sw.js";
    }
    return "sw.js";
  }

  const swPath = detectSwPath();
  // Scope должен быть корнем vpr7/, поэтому всегда берём scope "../" или "/"
  // Но безопаснее регистрировать со scope относительно sw.js
  const swScope = swPath.replace(/sw\.js$/, "");

  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register(swPath, { scope: swScope })
      .then(function (reg) {
        // Проверка обновлений
        if (reg.waiting) {
          // Есть новая версия, но она ждёт активации
          console.info("[SW] Новая версия готовится к активации.");
        }
        reg.addEventListener("updatefound", function () {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", function () {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // Новая версия загружена и ожидает
              console.info("[SW] Доступно обновление. Перезагрузите страницу.");
            }
          });
        });
      })
      .catch(function (err) {
        // SW регистрация не критична — просто логируем
        console.warn("[SW] Регистрация не удалась:", err.message);
      });
  });
})();