/**
 * VPR 7 - Data Loader Module
 * Централизованный загрузчик данных с поддержкой JSON (основной источник)
 * и текстовых файлов (.txt) в качестве резерва.
 *
 * Глобально доступен как window.VPR7_DataLoader; в CommonJS — module.exports.
 *
 * Публичные методы:
 *   loadJSON(url)                       — загрузка JSON с обработкой ошибок
 *   loadText(url)                       — загрузка текстового файла
 *   loadTaskData(taskId, options)       — загрузка данных задачи по id
 *   parseTxtCategories(text)            — парсинг "@category\n item" формата
 */

(function () {
  "use strict";

  const JSON_URL = "data/vpr7-tasks.json";
  let cachedJSON = null;
  let jsonPromise = null;

  /**
   * Загрузка JSON-файла с обработкой ошибок
   * @param {string} url
   * @returns {Promise<Object|null>}
   */
  async function loadJSON(url) {
    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) {
        console.warn("[VPR7_DataLoader] JSON not loaded:", response.status, url);
        return null;
      }
      return await response.json();
    } catch (e) {
      console.warn("[VPR7_DataLoader] JSON fetch error:", e);
      return null;
    }
  }

  /**
   * Загрузка текстового файла
   * @param {string} url
   * @returns {Promise<string|null>}
   */
  async function loadText(url) {
    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) return null;
      return await response.text();
    } catch (e) {
      console.warn("[VPR7_DataLoader] Text fetch error:", url, e);
      return null;
    }
  }

  /**
   * Получить консолидированный JSON (один fetch, дальнейшие вызовы из кэша).
   * @returns {Promise<Object|null>}
   */
  function getConsolidatedJSON() {
    if (cachedJSON) return Promise.resolve(cachedJSON);
    if (jsonPromise) return jsonPromise;
    jsonPromise = loadJSON(JSON_URL).then((data) => {
      if (data) cachedJSON = data;
      return data;
    });
    return jsonPromise;
  }

  /**
   * Парсинг текстового формата с @category маркерами
   * @param {string} text
   * @returns {Object} — { category: [items] }
   */
  function parseTxtCategories(text) {
    const result = {};
    let current = null;
    (text || "").split(/\r?\n/).forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) return;
      if (line.charAt(0) === "@") {
        current = line.substring(1).trim();
        if (!(current in result)) result[current] = [];
      } else if (current) {
        result[current].push(line);
      }
    });
    return result;
  }

  /**
   * Загрузить данные конкретной задачи.
   * Сначала пытаемся взять из консолидированного JSON,
   * при отсутствии — загружаем соответствующий .txt (для задач 1-5).
   * @param {number|string} taskId — номер задачи (1..12)
   * @param {Object} [options]
   * @param {boolean} [options.allowTxtFallback=true]
   * @returns {Promise<Object|null>}
   */
  async function loadTaskData(taskId, options) {
    const opts = options || {};
    const allowTxt = opts.allowTxtFallback !== false;
    const key = "task" + taskId;

    const json = await getConsolidatedJSON();
    if (json && json.tasks && json.tasks[key]) {
      return json.tasks[key];
    }

    // Fallback на .txt для задач 1-5
    if (allowTxt && taskId >= 1 && taskId <= 5) {
      const txt = await loadText("data/vpr7-" + taskId + ".txt");
      if (txt) {
        return { _source: "txt", raw: txt, parsed: parseTxtCategories(txt) };
      }
    }

    return null;
  }

  const DataLoader = {
    loadJSON,
    loadText,
    loadTaskData,
    parseTxtCategories,
    getConsolidatedJSON,
  };

  if (typeof window !== "undefined") {
    window.VPR7_DataLoader = DataLoader;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = DataLoader;
  }
})();