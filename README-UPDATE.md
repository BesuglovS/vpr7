# Обновления для VPR7 (Рефакторинг)

## Что было сделано

### 1. Модульная JS-структура
Созданы отдельные модули для каждого типа задания:
- `js/vpr7-6-generator.js` - генератор заданий №6 (декодирование)
- `js/vpr7-7-generator.js` - генератор заданий №7 (объём информации)
- `js/vpr7-8-generator.js` - генератор заданий №8 (объём текстовой информации)
- `js/vpr7-9-generator.js` - генератор заданий №9 (передача информации)
- `js/vpr7-10-generator.js` - генератор заданий №10 (объём в предложении)
- `js/vpr7-11-generator.js` - генератор заданий №11 (цветовая модель RGB)
- `js/vpr7-12-generator.js` - генератор заданий №12 (форматирование текста)

### 2. Консолидированные данные
Созданы JSON-файлы для заданий:
- `js/vpr7-tasks.json` - данные для заданий vpr7
- `js/vpr8-tasks.json` - данные для заданий vpr8
- `data/vpr7-{6-12}.txt` - данные для каждого задания
- `data/vpr8-{1-10}.txt` - данные для vpr8 заданий

### 3. Модуль локального хранилища
Создан `js/storage/localStorage.js` - модуль для работы с localStorage

### 4. Service Worker для PWA
- `sw.js` - Service Worker для офлайн-режима
- `js/vpr7-sw-register.js` - регистрация SW для vpr7
- `js/vpr8-sw-register.js` - регистрация SW для vpr8

### 5. Модуль хранения для vpr8
Создан `js/vpr8-storage.js` - аналог vpr7-storage.js для vpr8

### 6. Агрегирующий модуль для vpr8
Создан `js/vpr8-tasks-generator.js` - агрегирует все генераторы заданий для vpr8

### 7. Корневой роутер
Создан `index.php` - корневой файл для маршрутизации между vpr7 и vpr8

### 8. Обновление HTML файлов
Обновлен `vpr7/vpr7.html` с добавлением новых модулей в head section

## Структура файлов

```
vpr7/
├── index.php                    # Корневой роутер
├── sw.js                        # Service Worker
├── manifest.json                # PWA манифест
├── vpr7/
│   ├── vpr7.html               # Главная страница 7 класса (обновлено)
│   ├── css/
│   └── js/
│       ├── vpr7-sw-register.js # Регистрация SW для vpr7
│       ├── vpr7-storage.js     # Хранение для vpr7
│       ├── vpr7-tasks.json     # Данные заданий vpr7
│       ├── vpr8-storage.js     # Хранение для vpr8
│       ├── vpr8-sw-register.js # Регистрация SW для vpr8
│       ├── vpr8-tasks.json     # Данные заданий vpr8
│       ├── vpr8-tasks-generator.js
│       ├── vpr7-{1-12}.html    # Страницы заданий
│       └── vpr8-{1-10}.html    # Страницы заданий vpr8
├── js/
│   ├── storage/
│   │   └── localStorage.js     # Модуль localStorage
│   ├── vpr7-storage.js         # Устаревший (оставлен для совместимости)
│   ├── vpr8-storage.js         # Новый модуль для vpr8
│   ├── vpr7-{6-12}-generator.js # Генераторы заданий
│   └── vpr8-{1-10}-generator.js # Генераторы заданий vpr8
└── data/
    ├── vpr7-{6-12}.txt         # Данные заданий vpr7
    ├── vpr8-{1-10}.txt         # Данные заданий vpr8
    └── vpr8-tasks.json         # Консолидированные данные vpr8
```

## Использование

### Для vpr7:
1. Откройте `vpr7/vpr7.html`
2. Модули автоматически загружаются из `../js/`
3. Service Worker регистрируется автоматически

### Для vpr8:
1. Перейдите по ссылке `/VPR8/vpr8.html`
2. Используйте модули из `js/` аналогично vpr7

###LocalStorage:
```javascript
// VPR7_Storage
VPR7_Storage.save('key', value);
VPR7_Storage.load('key');
VPR7_Storage.getProgress();
VPR7_Storage.setProgress();
VPR7_Storage.setTheme('light');
VPR7_Storage.getTheme();
VPR7_Storage.clearProgress();

// VPR8_Storage
VPR8_Storage.save('key', value);
VPR8_Storage.load('key');
VPR8_Storage.getProgress();
VPR8_Storage.setProgress();
VPR8_Storage.saveScore(taskId, score, correct);
VPR8_Storage.setTheme('light');
VPR8_Storage.getTheme();
VPR8_Storage.clearProgress();
```

## Совместимость

- Новые модули добавлены, старые файлы остаются для совместимости
- Все изменения обратно совместимы с предыдущей версией
- Service Worker поддерживает офлайн-режим для обеих версий

## Примечание

После обновления убедитесь, что:
1. Все файлы в папке `js/` загружаются корректно
2. Service Worker регистрируется успешно
3. LocalStorage работает в браузере

## Обновления для других веб-приложений

Те же паттерны рефакторинга применяются к:
- `contest-web/`
- `inf-web/`
- `office-web/`
- `oge-web/`
- `python-web/`

Каждое приложение получает:
- Модульную JS-структуру
- Service Worker для PWA
- LocalStorage модули
- Консолидированные данные в JSON