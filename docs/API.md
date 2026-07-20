# API Документация vpr7

## Введение

Эта документация описывает публичный API проекта vpr7. Все методы доступны через глобальный объект `window.VPR_Storage`.

---

## VPR_Storage API

### saveResult(className, taskId, score, attempts)

Сохраняет результат выполнения задания.

**Параметры:**
- `className` (string): `'vpr7'` или `'vpr8'`
- `taskId` (number): Номер задания
- `score` (number): Оценка (0-100)
- `attempts` (object): Объект с информацией об попытках (опционально)
  - `correct` (boolean): Было ли решение правильным

**Пример:**
```javascript
VPR_Storage.saveResult('vpr7', 1, 85, { correct: true });
```

**Возвращает:** `void`

---

### getProgress()

Получает прогресс пользователя для всех заданий.

**Возвращает:** Объект с прогрессом

**Пример:**
```javascript
const progress = VPR_Storage.getProgress();
console.log(progress['vpr7-1']);
```

---

### getTaskProgress(className, taskId)

Получает прогресс для конкретного задания.

**Параметры:**
- `className` (string): `'vpr7'` или `'vpr8'`
- `taskId` (number): Номер задания

**Возвращает:** Объект с прогрессом или `null`

---

### resetTaskProgress(className, taskId)

Сбрасывает прогресс для конкретного задания.

**Параметры:**
- `className` (string): `'vpr7'` или `'vpr8'`
- `taskId` (number): Номер задания

**Возвращает:** `void`

---

### resetAllProgress()

Сбрасывает весь прогресс.

**Возвращает:** `void`

---

### getStats()

Получает статистику для всех заданий.

**Возвращает:** Объект со статистикой
```javascript
{
  totalTasks: number,
  completedTasks: number,
  averageScore: number
}
```

---

### getAllTasks()

Получает список всех доступных заданий для vpr7.

**Возвращает:** Массив объектов
```javascript
[
  {
    id: number,
    completed: boolean,
    lastAttempt: string
  },
  ...
]
```

---

## Генераторы заданий

Каждый генератор (например, `vpr7-6-generator`) экспортирует следующие функции:

### loadDeviceData(filePath)

Загружает данные устройства из файла.

**Параметры:**
- `filePath` (string): Путь к файлу данных

**Возвращает:** `Promise<TaskData>`

---

### generateTask()

Генерирует задание.

**Возвращает:** `Promise<TaskData>`

---

### init()

Инициализирует генератор.

**Возвращает:** `void`

---

## Типы данных

### TaskData

```typescript
interface TaskData {
  categories: string[];
  devices: string[];
  correctMapping: Record<string, string>;
}
```

### ProgressData

```typescript
interface ProgressData {
  score: number;
  attempts: number;
  lastAttempt: string; // ISO timestamp
  correct?: boolean;
}
```

### StatsData

```typescript
interface StatsData {
  totalTasks: number;
  completedTasks: number;
  averageScore: number;
}
```

---

## Использование

```html
<script src="js/vpr7-6-generator.js"></script>
<script>
  // Инициализация
  window.VPR_Storage.saveResult('vpr7', 6, 90, { correct: true });
  
  // Получение прогресса
  const progress = window.VPR_Storage.getProgress();
  
  // Получение статистики
  const stats = window.VPR_Storage.getStats();
</script>
```

---

## Ошибки

Все методы могут выбрасывать ошибки:

- `NetworkError`: Ошибка сети при загрузке данных
- `StorageError`: Ошибка сохранения в localStorage
- `ValidationError`: Неправильный формат данных

**Обработка:**
```javascript
try {
  await VPR_Storage.saveResult('vpr7', 1, 85, { correct: true });
} catch (error) {
  console.error('Ошибка сохранения:', error);
}