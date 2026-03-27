/**
 * VPR 7 - Task 3: File Types and Extensions Generator Module
 * Generates interactive tasks for classifying file extensions
 */

(function () {
  // Fallback data when file loading fails
  const FALLBACK_DATA = `@текстовый файл
.odt
.doc
.docx
.pdf
.txt
.rtf

@презентация
.odp
.ppt
.pptx

@электронная таблица
.ods
.xls
.xlsx

@графический файл
.bmp
.gif
.jpg
.png
.tiff
.svg

@аудиофайл
.aac
.flac
.mp3
.ogg
.wav
.wma

@видеофайл
.avi
.mkv
.mov
.mp4
.webm
.wmv

@архив
.7z
.rar
.zip

@веб-страница
.htm
.html

@исполняемый файл
.exe`;

  /**
   * Parse text data into categories object
   * @param {string} text - Raw text data with @category markers
   * @returns {Object} - Object with category names as keys and extension arrays as values
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
   * Load extension data from file or use fallback
   * @param {string} filePath - Path to the data file
   * @returns {Promise<Object>} - Promise resolving to categories object
   */
  async function loadExtensionData(filePath = "vpr7-3.txt") {
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
   * Shuffle array in place using Fisher-Yates algorithm
   * @param {Array} array - Array to shuffle
   * @returns {Array} - Shuffled array (same reference)
   */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Generate a task with random extension selection
   * @param {Object} categories - Categories object with extension arrays
   * @param {number} count - Number of extensions to select (default: 12)
   * @returns {Object} - Task data with selectedExtensions, extensionCategories, categories
   */
  function generateExtensionsTask(categories, count = 12) {
    // Collect all extensions with their categories
    const allExtensions = [];
    Object.keys(categories).forEach((cat) => {
      categories[cat].forEach((ext) => {
        allExtensions.push({ extension: ext, category: cat });
      });
    });

    // Shuffle and select required number of extensions
    shuffleArray(allExtensions);
    const selectedExtensions = allExtensions.slice(0, count);

    // Create shuffled copy for display
    const shuffledForDisplay = [...selectedExtensions];
    shuffleArray(shuffledForDisplay);

    // Build extension to category mapping
    const extensionCategories = {};
    selectedExtensions.forEach((item) => {
      extensionCategories[item.extension] = item.category;
    });

    return {
      selectedExtensions: shuffledForDisplay,
      extensionCategories,
      totalExtensions: selectedExtensions.length,
      categories: Object.keys(categories),
    };
  }

  /**
   * Get the correct category for an extension
   * @param {string} extension - Extension name (e.g., ".txt")
   * @param {Object} extensionCategories - Mapping of extensions to categories
   * @returns {string} - Category name
   */
  function getExtensionCategory(extension, extensionCategories) {
    return extensionCategories[extension];
  }

  /**
   * Check if extension is in correct category
   * @param {string} extension - Extension name
   * @param {string} category - Category to check
   * @param {Object} extensionCategories - Mapping of extensions to categories
   * @returns {boolean} - True if extension belongs to category
   */
  function isCorrectCategory(extension, category, extensionCategories) {
    return extensionCategories[extension] === category;
  }

  /**
   * Generate hints for current extensions
   * @param {Array} selectedExtensions - Array of extension objects {extension, category}
   * @returns {string} - Hint text with extension -> category mappings
   */
  function generateHints(selectedExtensions) {
    return selectedExtensions
      .map((ext) => `${ext.extension} → ${ext.category}`)
      .join("; ");
  }

  /**
   * Check answers and return results
   * @param {NodeList} placedExtensions - Elements with placed extensions
   * @param {Object} extensionCategories - Mapping of extensions to categories
   * @returns {Object} - Results with correctCount, totalChecked, results array
   */
  function checkAnswers(placedExtensions, extensionCategories) {
    let correctCount = 0;
    const results = [];

    placedExtensions.forEach((item) => {
      const extension = item.dataset.extension;
      const userCategory =
        item.dataset.placedCategory || item.parentElement?.dataset?.category;
      const correctCategory = extensionCategories[extension];
      const isCorrect = userCategory === correctCategory;

      if (isCorrect) correctCount++;

      results.push({
        extension,
        userCategory,
        correctCategory,
        isCorrect,
      });
    });

    return {
      correctCount,
      totalChecked: results.length,
      results,
      allCorrect: correctCount === results.length,
    };
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task3_Generator = {
      FALLBACK_DATA,
      parseData,
      loadExtensionData,
      shuffleArray,
      generateExtensionsTask,
      getExtensionCategory,
      isCorrectCategory,
      generateHints,
      checkAnswers,
    };
  }
})();
