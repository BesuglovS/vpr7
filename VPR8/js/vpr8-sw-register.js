/**
 * vpr8-sw-register.js
 * Регистрация Service Worker для VPR8
 */

(function() {
    'use strict';

    const CACHE_NAME = 'vpr8-cache-v1';
    const ASSETS_TO_CACHE = [
        '/VPR8/',
        '/VPR8/vpr8.html',
        '/VPR8/vpr8-exam.html',
        '/VPR8/vpr8-generator.html',
        '/VPR8/vpr8-{1-10}.html',
        '/VPR8/vpr8-{1-10}-t.html',
        '/js/vpr8/*.js',
        '/js/vpr8-storage.js',
        '/js/vpr8-tasks-generator.js',
        '/js/vpr8-tasks.json',
        '/css/vpr8/style.css',
        '/manifest.json',
        '/favicon.svg'
    ];

    /**
     * Регистрирует Service Worker для VPR8
     */
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                try {
                    // Регистрация SW
                    const registration = await navigator.serviceWorker.register('/sw.js');
                    console.log('VPR8: Service Worker зарегистрирован:', registration.scope);

                    // Кэширование ресурсов
                    await cacheAssets();
                    console.log('VPR8: Ресурсы кэшированы');

                    // Обновление кэша при активации
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed') {
                                console.log('VPR8: Новый Service Worker установлен');
                                // Опционально: перезагрузка страницы
                                // location.reload(true);
                            }
                        });
                    });
                } catch (error) {
                    console.error('VPR8: Ошибка регистрации Service Worker:', error);
                }
            });
        } else {
            console.log('VPR8: Service Worker не поддерживается браузером');
        }
    }

    /**
     * Кэширует необходимые ресурсы
     */
    async function cacheAssets() {
        if ('caches' in window) {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(ASSETS_TO_CACHE);
        }
    }

    /**
     * Инициализация
     */
    if (typeof window !== 'undefined') {
        window.addEventListener('load', async () => {
            // Проверяем, уже ли зарегистрирован SW
            const registrations = await navigator.serviceWorker.getRegistrations();
            if (registrations.length === 0) {
                registerServiceWorker();
            } else {
                console.log('VPR8: Service Worker уже зарегистрирован');
            }
        });
    }

})();