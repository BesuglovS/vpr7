// Service Worker для PWA
// Кэширует HTML, CSS, JS и статические ресурсы

const CACHE_NAME = 'vpr-cache-v2';

// Раздел: корень
const ROOT_ASSETS = [
    './',
    './index.php',
    './vpr.html',
    './manifest.json',
    './favicon.svg',
    './metrika.js',
];

// Раздел: vpr7
const VPR7_PAGES = [
    './vpr7/vpr7.html',
    './vpr7/vpr7-exam.html',
    './vpr7/vpr7-generator.html',
    ...Array.from({length: 12}, (_, i) => `./vpr7/vpr7-${i + 1}.html`),
    ...Array.from({length: 12}, (_, i) => `./vpr7/vpr7-${i + 1}-t.html`),
];

const VPR7_CSS = [
    './vpr7/css/vpr7-common.css',
    './vpr7/css/vpr7-main.css',
    './vpr7/css/vpr7-exam.css',
    './vpr7/css/vpr7-theory.css',
    ...Array.from({length: 12}, (_, i) => `./vpr7/css/vpr7-${i + 1}.css`),
];

const VPR7_JS = [
    './vpr7/js/vpr7-exam-utils.js',
    './vpr7/js/vpr7-1-generator.js',
    './vpr7/js/vpr7-2-generator.js',
    './vpr7/js/vpr7-3-generator.js',
    './vpr7/js/vpr7-4-generator.js',
    './vpr7/js/vpr7-5-generator.js',
    './vpr7/js/vpr7-6-generator.js',
    './vpr7/js/vpr7-7-generator.js',
    './vpr7/js/vpr7-8-generator.js',
    './vpr7/js/vpr7-9-generator.js',
    './vpr7/js/vpr7-10-generator.js',
    './vpr7/js/vpr7-11-generator.js',
    './vpr7/js/vpr7-12-generator.js',
    './vpr7/js/vpr7-tasks-generator.js',
];

// Раздел: VPR8
const VPR8_PAGES = [
    './VPR8/vpr8.html',
    './VPR8/vpr8-exam.html',
    './VPR8/vpr8-generator.html',
    ...Array.from({length: 10}, (_, i) => `./VPR8/vpr8-${i + 1}.html`),
    ...Array.from({length: 10}, (_, i) => `./VPR8/vpr8-${i + 1}-t.html`),
];

const VPR8_CSS = [
    './VPR8/css/vpr8-common.css',
    './VPR8/css/vpr8-main.css',
    './VPR8/css/vpr8-exam.css',
    './VPR8/css/vpr8-theory.css',
    ...Array.from({length: 10}, (_, i) => `./VPR8/css/vpr8-${i + 1}.css`),
];

const VPR8_JS = [
    './VPR8/js/vpr8-1-generator.js',
    './VPR8/js/vpr8-2-generator.js',
    './VPR8/js/vpr8-3-generator.js',
    './VPR8/js/vpr8-4-generator.js',
    './VPR8/js/vpr8-5-generator.js',
    './VPR8/js/vpr8-6-generator.js',
    './VPR8/js/vpr8-7-generator.js',
    './VPR8/js/vpr8-8-generator.js',
    './VPR8/js/vpr8-9-generator.js',
    './VPR8/js/vpr8-10-generator.js',
    './VPR8/js/vpr8-tasks-generator.js',
];

const ASSETS_TO_CACHE = [
    ...ROOT_ASSETS,
    ...VPR7_PAGES,
    ...VPR7_CSS,
    ...VPR7_JS,
    ...VPR8_PAGES,
    ...VPR8_CSS,
    ...VPR8_JS,
];

// Установка Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Кэширование ресурсов');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
            .catch((err) => {
                console.error('Service Worker: Ошибка кэширования:', err);
            })
    );
});

// Активация и очистка старого кэша
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) return response;
                return fetch(event.request).then((response) => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                });
            })
            .catch(() => {
                if (event.request.destination === 'document') {
                    return caches.match('./vpr.html');
                }
            })
        );
});