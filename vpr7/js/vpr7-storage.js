/**
 * VPR 7 - Storage Module
 * Безопасная обёртка над localStorage с защитой от ошибок и версионированием.
 * Глобально доступен как window.VPR7_Storage; в CommonJS — module.exports.
 *
 * Публичные методы:
 *   get(key, fallback?)          — чтение (JSON)
 *   set(key, value)              — запись (JSON, с версией схемы)
 *   remove(key)                  — удаление
 *   increment(key, by=1)         — атомарный счётчик
 *   clearAll()                   — очистка только ключей vpr7_*
 *   saveExamResult(classKey, data)        — история экзаменов (до 10)
 *   getExamHistory(classKey)              — получить историю экзаменов
 *   saveTaskResult(classKey, taskId, ok)  — статистика по заданию
 *   getProgress(classKey)                 — сводка по всем заданиям класса
 */

(function () {
  const STORAGE_PREFIX = "vpr7_";
  const SCHEMA_VERSION = 1;

  /**
   * Проверяет доступность localStorage
   * @returns {boolean}
   */
  function isAvailable() {
    try {
      const testKey = "__vpr7_test__";
      localStorage.setItem(testKey, "1");
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  const available = isAvailable();

  /**
   * Полное имя ключа с префиксом
   * @param {string} key
   * @returns {string}
   */
  function fullKey(key) {
    return STORAGE_PREFIX + key;
  }

  /**
   * Получить значение (с JSON-парсингом)
   * @param {string} key
   * @param {*} [fallback]
   * @returns {*}
   */
  function get(key, fallback) {
    if (!available) return fallback;
    try {
      const raw = localStorage.getItem(fullKey(key));
      if (raw === null) return fallback;
      const data = JSON.parse(raw);
      // Распаковываем обёртку версии
      if (data && typeof data === "object" && "__v" in data) {
        if (data.__v !== SCHEMA_VERSION) return fallback;
        return data.value;
      }
      return data;
    } catch (e) {
      console.warn("[VPR7_Storage] get error:", key, e);
      return fallback;
    }
  }

  /**
   * Установить значение (с JSON-сериализацией и версией)
   * @param {string} key
   * @param {*} value
   * @returns {boolean}
   */
  function set(key, value) {
    if (!available) return false;
    try {
      const payload = JSON.stringify({ __v: SCHEMA_VERSION, value: value });
      localStorage.setItem(fullKey(key), payload);
      return true;
    } catch (e) {
      // Скорее всего QuotaExceededError
      console.warn("[VPR7_Storage] set error:", key, e);
      return false;
    }
  }

  /**
   * Удалить значение
   * @param {string} key
   */
  function remove(key) {
    if (!available) return;
    try {
      localStorage.removeItem(fullKey(key));
    } catch (e) {
      console.warn("[VPR7_Storage] remove error:", key, e);
    }
  }

  /**
   * Увеличить числовой счётчик (атомарно в рамках синхронного вызова)
   * @param {string} key
   * @param {number} [by=1]
   * @returns {number} новое значение
   */
  function increment(key, by) {
    const step = typeof by === "number" ? by : 1;
    const current = Number(get(key, 0)) || 0;
    const next = current + step;
    set(key, next);
    return next;
  }

  /**
   * Очистка только ключей с префиксом vpr7_
   */
  function clearAll() {
    if (!available) return;
    try {
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf(STORAGE_PREFIX) === 0) toRemove.push(key);
      }
      for (let j = 0; j < toRemove.length; j++) {
        localStorage.removeItem(toRemove[j]);
      }
    } catch (e) {
      console.warn("[VPR7_Storage] clearAll error:", e);
    }
  }

  /**
   * Сохранить результат экзамена (сводная статистика, до 10 последних).
   * @param {string} classKey - "7" | "8"
   * @param {{correct:number,total:number,attempted:number,date:string}} data
   * @returns {boolean}
   */
  function saveExamResult(classKey, data) {
    if (!available) return false;
    try {
      const key = "exam_" + classKey;
      const history = get(key, []);
      const list = Array.isArray(history) ? history.slice() : [];
      list.unshift(data);
      if (list.length > 10) list.length = 10;
      return set(key, list);
    } catch (e) {
      console.warn("[VPR7_Storage] saveExamResult error:", e);
      return false;
    }
  }

  /**
   * Получить историю результатов экзамена для класса.
   * @param {string} classKey
   * @returns {Array}
   */
  function getExamHistory(classKey) {
    const history = get("exam_" + classKey, []);
    return Array.isArray(history) ? history : [];
  }

  /**
   * Сохранить результат отдельного задания (для статистики тренировки).
   * @param {string} classKey
   * @param {number} taskId
   * @param {boolean} correct
   */
  function saveTaskResult(classKey, taskId, correct) {
    if (!available) return false;
    try {
      const key = "tasks_" + classKey + "_" + taskId;
      const stat = get(key, {
        attempts: 0,
        correct: 0,
        lastResult: null,
        lastAttempt: null,
      });
      stat.attempts += 1;
      if (correct) stat.correct += 1;
      stat.lastResult = !!correct;
      stat.lastAttempt = new Date().toISOString();
      return set(key, stat);
    } catch (e) {
      console.warn("[VPR7_Storage] saveTaskResult error:", e);
      return false;
    }
  }

  /**
   * Получить прогресс по всем заданиям класса.
   * @param {string} classKey
   * @returns {Object} { taskId: {attempts, correct, lastResult, lastAttempt} }
   */
  function getProgress(classKey) {
    if (!available) return {};
    const result = {};
    const prefix = fullKey("tasks_" + classKey + "_");
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf(prefix) === 0) {
          const taskId = k.substring(prefix.length);
          let entry;
          try {
            entry = JSON.parse(localStorage.getItem(k));
          } catch (e) {
            entry = null;
          }
          // Распаковываем обёртку {__v, value}
          if (entry && typeof entry === "object" && "value" in entry) {
            entry = entry.value;
          }
          result[taskId] = entry;
        }
      }
    } catch (e) {
      console.warn("[VPR7_Storage] getProgress error:", e);
    }
    return result;
  }

  // Public API
  const Storage = {
    isAvailable: isAvailable,
    get: get,
    set: set,
    remove: remove,
    increment: increment,
    clearAll: clearAll,
    saveExamResult: saveExamResult,
    getExamHistory: getExamHistory,
    saveTaskResult: saveTaskResult,
    getProgress: getProgress,
    SCHEMA_VERSION: SCHEMA_VERSION,
  };

  if (typeof window !== "undefined") {
    window.VPR7_Storage = Storage;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Storage;
  }
})();