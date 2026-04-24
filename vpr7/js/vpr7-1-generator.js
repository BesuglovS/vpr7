/**
 * VPR 7 - Task 1: Device Classification Generator Module
 * Generates interactive tasks for classifying computer devices
 */

(function () {
  // Fallback data when file loading fails (minimum 3 devices per category)
  const FALLBACK_DATA = `@Устройства ввода
Клавиатура
Мышь
Сканер документов
Веб-камера
Микрофон

@Устройства вывода
Монитор
Принтер
Наушники
Колонки
Проектор

@Устройства хранения
SSD (твердотельный накопитель)
USB-флеш-накопитель (Флешка)
HDD (жёсткий диск)
CD-R (компакт-диск)

@Устройства обработки
Процессор (CPU)
Видеокарта (GPU)
NPU (нейронный процессор)
Суперкомпьютер`;

  /**
   * Parse text data into categories object
   * @param {string} text - Raw text data with @category markers
   * @returns {Object} - Object with category names as keys and device arrays as values
   */
  function parseData(text) {
    const categories = {};
    const lines = text.split("\n");
    let currentCategory = "";

    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith("@")) {
        currentCategory = line.substring(1).trim();
        categories[currentCategory] = [];
      } else if (line && currentCategory) {
        categories[currentCategory].push(line);
      }
    });

    return categories;
  }

  /**
   * Load device data from file or use fallback
   * @param {string} filePath - Path to the data file
   * @returns {Promise<Object>} - Promise resolving to categories object
   */
  async function loadDeviceData(filePath = "data/vpr7-1.txt") {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      return parseData(text);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      return parseData(FALLBACK_DATA);
    }
  }

  /**
   * Generate a task with random device selection
   * @param {Object} categories - Categories object with device arrays
   * @returns {Object} - Task data with selectedDevices, deviceCategories, totalDevices
   */
  function generateDevicesTask(categories) {
    const selectedDevices = [];
    const deviceCategories = {};

    const categoryNames = Object.keys(categories);

    // Fixed distribution: [3, 2, 2, 2] = 9 devices
    // Randomly shuffle which category gets how many
    let distribution = [3, 2, 2, 2];
    distribution.sort(() => Math.random() - 0.5);

    // Select devices from each category
    categoryNames.forEach((category, idx) => {
      const devices = [...categories[category]];
      let count = distribution[idx];

      // Limit count by available devices
      count = Math.min(count, devices.length);

      for (let i = 0; i < count && devices.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * devices.length);
        const device = devices.splice(randomIndex, 1)[0];
        selectedDevices.push(device);
        deviceCategories[device] = category;
      }
    });

    // Shuffle devices
    selectedDevices.sort(() => Math.random() - 0.5);

    return {
      selectedDevices,
      deviceCategories,
      totalDevices: selectedDevices.length,
      categories: categoryNames,
    };
  }

  /**
   * Get the correct category for a device
   * @param {string} device - Device name
   * @param {Object} deviceCategories - Mapping of devices to categories
   * @returns {string} - Category name
   */
  function getDeviceCategory(device, deviceCategories) {
    return deviceCategories[device];
  }

  /**
   * Check if device is in correct category
   * @param {string} device - Device name
   * @param {string} category - Category to check
   * @param {Object} deviceCategories - Mapping of devices to categories
   * @returns {boolean} - True if device belongs to category
   */
  function isCorrectCategory(device, category, deviceCategories) {
    return deviceCategories[device] === category;
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task1_Generator = {
      FALLBACK_DATA,
      parseData,
      loadDeviceData,
      generateDevicesTask,
      getDeviceCategory,
      isCorrectCategory,
    };
  }
})();
