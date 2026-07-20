# Вклад в проект vpr7

## Начало работы

### Требования

- Node.js 18+
- npm или yarn
- Git

### Установка

```bash
npm install
npm run dev
```

## Структура проекта

```
vpr7/
├── js/
│   ├── storage/           # Модули хранилища
│   ├── vpr7-{6-12}-generator.js  # Генераторы заданий
│   ├── vpr8-{1-10}-generator.js  # Генераторы заданий
│   └── vpr8-tasks-generator.js   # Агрегирующий модуль
├── data/
│   ├── vpr7-{6-12}.txt    # Данные заданий vpr7
│   └── vpr8-{1-10}.txt    # Данные заданий vpr8
├── tests/
│   ├── vitest.config.mjs  # Конфигурация Vitest
│   ├── storage.test.js    # Тесты хранилища
│   └── generators.test.js # Тесты генераторов
└── docs/
    └── API.md              # API документация
```

## Добавление нового задания

### 1. Создайте файл данных

```
data/vpr7-13.txt
data/vpr8-11.txt
```

### 2. Создайте модуль генератора

```
js/vpr7-13-generator.js
js/vpr8-11-generator.js
```

### 3. Добавьте экспорты в main.js

```javascript
import { vpr7Tasks } from '../js/vpr7-tasks.json';
import { vpr8Tasks } from '../js/vpr8-tasks.json';
```

## Правила коммитов

- Используйте формат `type(scope): subject`
- Пример: `feat(storage): add progress tracking`

## Code Style

- 2 пробела для отступов
- Двойные кавычки для строк
- Сemicolon после каждой строки

## Тестирование

```bash
npm test
npm run lint
npm run build
```

## Обзоры PR

Все PR проходят проверку:
- ESLint
- Unit-тесты
- E2E-тесты (Playwright)