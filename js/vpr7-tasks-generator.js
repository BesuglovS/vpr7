/**
 * VPR 7 Class - Tasks Generator Module
 * Delegates task generation to individual generator modules
 * for printable PDF variants
 */

// ============================================
// Utility functions (used for fallback if modules not loaded)
// ============================================
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ============================================
// Task 1: Computer Devices
// Uses VPR7_Task1_Generator module
// ============================================
function generateTask1() {
  if (typeof window.VPR7_Task1_Generator !== "undefined") {
    // Parse fallback data and generate task
    const data = window.VPR7_Task1_Generator.parseData(
      window.VPR7_Task1_Generator.FALLBACK_DATA,
    );
    const taskData = window.VPR7_Task1_Generator.generateDevicesTask(data);

    // Build task text
    const devicesList = taskData.selectedDevices
      .map((d, i) => `${i + 1}) ${d}`)
      .join("   ");
    const categoriesList = taskData.categories
      .map((c, i) => `${String.fromCharCode(65 + i)}) ${c}`)
      .join("<br>");

    const taskText = `Установите соответствие между устройствами и их типом. К каждой позиции первого столбца подберите соответствующую позицию из второго столбца.<br><br>
    <b>Устройства:</b> ${devicesList}<br><br>
    <b>Типы устройств:</b><br>${categoriesList}<br><br>
    Запишите в ответе буквы в порядке нумерации устройств (без пробелов и запятых).`;

    // Build answer string
    const answer = taskData.selectedDevices
      .map((device) => {
        const category = taskData.deviceCategories[device];
        const catIndex = taskData.categories.indexOf(category);
        return String.fromCharCode(65 + catIndex);
      })
      .join("");

    return { text: taskText, answer: answer };
  }
  // Fallback implementation
  return generateTask1Fallback();
}

function generateTask1Fallback() {
  const inputDevices = [
    "клавиатура",
    "мышка",
    "сканер",
    "микрофон",
    "веб-камера",
    "джойстик",
  ];
  const outputDevices = [
    "монитор",
    "принтер",
    "колонки",
    "наушники",
    "проектор",
  ];
  const storageDevices = [
    "жёсткий диск",
    "SSD",
    "флешка",
    "CD-диск",
    "DVD-диск",
    "карта памяти",
  ];
  const processingDevices = ["процессор", "видеокарта"];

  const selectedInput = shuffleArray(inputDevices).slice(0, 3);
  const selectedOutput = shuffleArray(outputDevices).slice(0, 2);
  const selectedStorage = shuffleArray(storageDevices).slice(0, 2);
  const selectedProcessing = shuffleArray(processingDevices).slice(0, 2);

  const allDevices = shuffleArray([
    ...selectedInput,
    ...selectedOutput,
    ...selectedStorage,
    ...selectedProcessing,
  ]);

  const taskText = `Установите соответствие между устройствами и их типом. К каждой позиции первого столбца подберите соответствующую позицию из второго столбца.<br><br>
    <b>Устройства:</b> ${allDevices.map((d, i) => `${i + 1}) ${d}`).join("   ")}<br><br>
    <b>Типы устройств:</b><br>
    А) устройства ввода<br>
    Б) устройства вывода<br>
    В) устройства хранения<br>
    Г) устройства обработки<br><br>
    Запишите в ответе буквы в порядке нумерации устройств (без пробелов и запятых).`;

  const answerMap = {};
  allDevices.forEach((d, i) => {
    if (inputDevices.includes(d)) answerMap[i + 1] = "А";
    else if (outputDevices.includes(d)) answerMap[i + 1] = "Б";
    else if (storageDevices.includes(d)) answerMap[i + 1] = "В";
    else if (processingDevices.includes(d)) answerMap[i + 1] = "Г";
  });

  const answer = allDevices.map((_, i) => answerMap[i + 1]).join("");

  return { text: taskText, answer: answer };
}

// ============================================
// Task 2: File Paths
// Uses VPR7_Task2_Generator module
// ============================================
function generateTask2() {
  if (typeof window.VPR7_Task2_Generator !== "undefined") {
    // Parse fallback data and generate task
    const data = window.VPR7_Task2_Generator.parseData(
      window.VPR7_Task2_Generator.FALLBACK_DATA,
    );
    const task = window.VPR7_Task2_Generator.generatePathTask(data);
    // Convert HTML highlights to plain text for PDF
    const text = task.text.replace(
      /<span class="highlight">([^<]+)<\/span>/g,
      "<b>$1</b>",
    );
    return { text: text, answer: task.correctPath };
  }
  return generateTask2Fallback();
}

function generateTask2Fallback() {
  const folders = [
    "Документы",
    "Загрузки",
    "Избранное",
    "Видео",
    "Музыка",
    "Фото",
    "Работа",
    "Учёба",
    "Школа",
    "Проекты",
  ];

  const files = ["задача.txt", "отчёт.docx", "документ.pdf", "реферат.doc"];

  const disk = String.fromCharCode(67 + randomInt(0, 2)) + ":";
  const depth = randomInt(3, 5);
  const pathParts = [];
  const usedFolders = new Set();

  for (let i = 0; i < depth; i++) {
    let folder;
    do {
      folder = randomChoice(folders);
    } while (usedFolders.has(folder));
    usedFolders.add(folder);
    pathParts.push(folder);
  }

  const startPath = disk + "\\" + pathParts.join("\\");
  const upLevels = Math.min(randomInt(1, 2), depth);
  const downLevels = randomInt(1, 2);

  let finalPathParts = [...pathParts];
  for (let i = 0; i < upLevels; i++) {
    finalPathParts.pop();
  }

  for (let i = 0; i < downLevels; i++) {
    let folder;
    do {
      folder = randomChoice(folders);
    } while (usedFolders.has(folder));
    usedFolders.add(folder);
    finalPathParts.push(folder);
  }

  const finalPath = disk + "\\" + finalPathParts.join("\\");

  const getLevelWord = (n) => {
    if (n === 1) return "уровень";
    if (n >= 2 && n <= 4) return "уровня";
    return "уровней";
  };

  let taskText = `Пользователь работал с каталогом <b>${startPath}</b>. `;
  taskText += `Он поднялся на ${upLevels} ${getLevelWord(upLevels)} вверх`;
  if (downLevels === 1) {
    taskText += `, затем спустился в папку <b>${finalPathParts[finalPathParts.length - 1]}</b>. `;
  } else {
    taskText += `, затем спустился на ${downLevels} уровня вниз. `;
  }
  taskText += `Запишите полный путь к папке, в которой оказался пользователь.`;

  return { text: taskText, answer: finalPath };
}

// ============================================
// Task 3: File Types
// Uses VPR7_Task3_Generator module
// ============================================
function generateTask3() {
  if (typeof window.VPR7_Task3_Generator !== "undefined") {
    // Parse fallback data and generate task
    const data = window.VPR7_Task3_Generator.parseData(
      window.VPR7_Task3_Generator.FALLBACK_DATA,
    );
    const taskData = window.VPR7_Task3_Generator.generateExtensionsTask(
      data,
      8,
    );

    // Get all unique categories from selected extensions
    const usedCategories = [
      ...new Set(Object.values(taskData.extensionCategories)),
    ];

    // Build task text
    const extensionsList = taskData.selectedExtensions
      .map((e, i) => `${i + 1}) ${e.extension}`)
      .join("   ");

    // Build categories list in 2 columns
    let categoriesList =
      '<table style="border-collapse: collapse; margin: 10px 0;">';
    for (let i = 0; i < usedCategories.length; i += 2) {
      categoriesList += "<tr>";
      categoriesList += `<td style="padding: 4px 20px 4px 0; font-weight: normal;">${String.fromCharCode(65 + i)}) ${usedCategories[i]}</td>`;
      if (usedCategories[i + 1]) {
        categoriesList += `<td style="padding: 4px 20px 4px 0; font-weight: normal;">${String.fromCharCode(65 + i + 1)}) ${usedCategories[i + 1]}</td>`;
      } else {
        categoriesList += "<td></td>";
      }
      categoriesList += "</tr>";
    }
    categoriesList += "</table>";

    const taskText = `Установите соответствие между расширениями файлов и их типом. К каждой позиции первого столбца подберите соответствующую позицию из второго столбца.<br><br>
    <b>Расширения:</b> ${extensionsList}<br><br>
    <b>Типы файлов:</b><br>${categoriesList}<br>
    Запишите в ответе буквы в порядке нумерации расширений (без пробелов и запятых).`;

    // Build answer string
    const answer = taskData.selectedExtensions
      .map((item) => {
        const catIndex = usedCategories.indexOf(item.category);
        return String.fromCharCode(65 + catIndex);
      })
      .join("");

    return { text: taskText, answer: answer };
  }
  return generateTask3Fallback();
}

function generateTask3Fallback() {
  const fileTypes = {
    "текстовый файл": [".doc", ".docx", ".txt", ".odt", ".pdf", ".rtf"],
    "графический файл": [".jpg", ".png", ".gif", ".bmp", ".tiff", ".svg"],
    аудиофайл: [".mp3", ".wav", ".ogg", ".flac", ".aac", ".wma"],
    видеофайл: [".mp4", ".avi", ".mkv", ".mov", ".webm", ".wmv"],
    презентация: [".ppt", ".pptx", ".odp"],
    "электронная таблица": [".xls", ".xlsx", ".ods"],
    архив: [".zip", ".rar", ".7z"],
    "веб-страница": [".html", ".htm"],
    "исполняемый файл": [".exe"],
  };

  const typeNames = Object.keys(fileTypes);
  const selectedTypes = shuffleArray(typeNames).slice(0, 4);

  const selectedExtensions = [];
  selectedTypes.forEach((type) => {
    const exts = shuffleArray(fileTypes[type]).slice(0, 2);
    exts.forEach((ext) => {
      selectedExtensions.push({ extension: ext, category: type });
    });
  });

  const allExtensions = shuffleArray(selectedExtensions);

  // Build categories list in 2 columns
  let categoriesList =
    '<table style="border-collapse: collapse; margin: 10px 0;">';
  for (let i = 0; i < selectedTypes.length; i += 2) {
    categoriesList += "<tr>";
    categoriesList += `<td style="padding: 4px 20px 4px 0; font-weight: normal;">${String.fromCharCode(65 + i)}) ${selectedTypes[i]}</td>`;
    if (selectedTypes[i + 1]) {
      categoriesList += `<td style="padding: 4px 20px 4px 0; font-weight: normal;">${String.fromCharCode(65 + i + 1)}) ${selectedTypes[i + 1]}</td>`;
    } else {
      categoriesList += "<td></td>";
    }
    categoriesList += "</tr>";
  }
  categoriesList += "</table>";

  const taskText = `Установите соответствие между расширениями файлов и их типом. К каждой позиции первого столбца подберите соответствующую позицию из второго столбца.<br><br>
    <b>Расширения:</b> ${allExtensions.map((e, i) => `${i + 1}) ${e.extension}`).join("   ")}<br><br>
    <b>Типы файлов:</b><br>${categoriesList}<br>
    Запишите в ответе буквы в порядке нумерации расширений (без пробелов и запятых).`;

  const answer = allExtensions
    .map((item) => {
      const typeIndex = selectedTypes.indexOf(item.category);
      return String.fromCharCode(65 + typeIndex);
    })
    .join("");

  return { text: taskText, answer: answer };
}

// ============================================
// Task 4: URL Addresses
// Uses VPR7_Task4_Generator module
// ============================================
function generateTask4() {
  if (typeof window.VPR7_Task4_Generator !== "undefined") {
    // Parse fallback data and generate task
    const data = window.VPR7_Task4_Generator.parseData(
      window.VPR7_Task4_Generator.FALLBACK_DATA,
    );
    const task = window.VPR7_Task4_Generator.generateTask(data);
    // Convert HTML highlights to bold for PDF
    const text = task.text.replace(
      /<span class="highlight">([^<]+)<\/span>/g,
      "<b>$1</b>",
    );
    return { text: text, answer: task.correctUrl };
  }
  return generateTask4Fallback();
}

function generateTask4Fallback() {
  const protocols = ["http", "https", "ftp"];
  const domains = [
    "school.edu",
    "docs.info",
    "files.net",
    "portal.ru",
    "site.com",
  ];
  const paths = ["lessons", "courses", "materials", "tasks", "documents"];
  const files = [
    "index.html",
    "readme.txt",
    "document.pdf",
    "report.docx",
    "data.xml",
  ];

  const protocol = randomChoice(protocols);
  const domain = randomChoice(domains);
  const path = randomChoice(paths);
  const file = randomChoice(files);

  const correctUrl = `${protocol}://${domain}/${path}/${file}`;

  const taskText = `Доступ к файлу <b>${file}</b>, находящемуся на сервере <b>${domain}</b> в каталоге <b>${path}</b>, осуществляется по протоколу <b>${protocol}</b>. Запишите полный URL-адрес файла.`;

  return { text: taskText, answer: correctUrl };
}

// ============================================
// Task 5: Logic Problems
// Uses VPR7_Task5_Generator module (requires data loading)
// ============================================
function generateTask5() {
  if (typeof window.VPR7_Task5_Generator !== "undefined") {
    // Task 5 requires data loading, use fallback data
    const data = window.VPR7_Task5_Generator.parseData(
      window.VPR7_Task5_Generator.FALLBACK_DATA,
    );
    const task = window.VPR7_Task5_Generator.generateTask(data);
    if (task) {
      // Format answer for PDF
      const answerParts = task.correctMatches.map(
        (m) => `${m.name} – ${m.surname}`,
      );
      return { text: task.text, answer: answerParts.join(", ") };
    }
  }
  return generateTask5Fallback();
}

function generateTask5Fallback() {
  const names = ["Алексей", "Борис", "Виктор", "Григорий", "Дмитрий"];
  const selectedNames = shuffleArray(names).slice(0, 3);

  const order = shuffleArray([1, 2, 3]);
  const taskText = `Три друга — ${selectedNames.join(", ")} — заняли первые три места в соревнованиях. 
    ${selectedNames[0]} занял не ${order[0]}-е и не ${order[1]}-е место. 
    ${selectedNames[1]} занял не ${order[1]}-е место. 
    Какое место занял каждый из друзей?<br><br>
    Запишите ответ в формате: Имя — место (например: Иван — 1-е, Пётр — 2-е, Сергей — 3-е).`;

  const answer = `${selectedNames[0]} — ${order[2]}-е, ${selectedNames[1]} — ${order[0]}-е, ${selectedNames[2]} — ${order[1]}-е`;

  return { text: taskText, answer: answer };
}

// ============================================
// Task 6: Message Decoding
// Uses VPR7_Task6_Generator module
// ============================================
function generateTask6() {
  if (typeof window.VPR7_Task6_Generator !== "undefined") {
    const task = window.VPR7_Task6_Generator.generateTask();

    // Build code table HTML for PDF
    const codes = task.codes;
    const letters = Object.keys(codes).sort();

    // Create table with 2 rows: letters and codes
    const tableRows = [];
    const lettersPerRow = 8;
    for (let i = 0; i < letters.length; i += lettersPerRow) {
      const rowLetters = letters.slice(i, i + lettersPerRow);
      tableRows.push(rowLetters);
    }

    let codeTableHtml =
      '<table border="1" cellpadding="4" style="border-collapse: collapse; margin: 10px 0;">';
    tableRows.forEach((row) => {
      codeTableHtml += "<tr>";
      row.forEach((letter) => {
        codeTableHtml += `<td style="text-align: center; padding: 4px 12px; font-weight: bold;">${letter}</td>`;
      });
      codeTableHtml += "</tr><tr>";
      row.forEach((letter) => {
        codeTableHtml += `<td style="text-align: center; padding: 4px 12px;">${codes[letter]}</td>`;
      });
      codeTableHtml += "</tr>";
    });
    codeTableHtml += "</table>";

    // Format encoded message with wider spacing for PDF
    const encodedWithSpaces = task.encoded.split("").join("&nbsp;&nbsp;&nbsp;");

    // Build task text
    const fanoText =
      task.fanoType === "direct"
        ? "Код удовлетворяет прямому условию Фано (никакое кодовое слово не является началом другого)."
        : "Код удовлетворяет обратному условию Фано (никакое кодовое слово не является окончанием другого).";

    const taskText = `Для кодирования букв используется неравномерный двоичный код (${task.symbolName}). ${fanoText}<br><br>
      Кодовые слова:<br>${codeTableHtml}<br>
      Декодируйте сообщение: <b>${encodedWithSpaces}</b><br><br>
      Запишите полученное слово заглавными буквами.`;

    return { text: taskText, answer: task.word };
  }
  return generateTask6Fallback();
}

function generateTask6Fallback() {
  const words = ["МИР", "КОТ", "СОН", "ДОМ", "ЛЕС", "МЕЛ"];
  const word = randomChoice(words);

  // Simple prefix code
  const code = {
    А: "0",
    Б: "10",
    В: "110",
    Г: "1110",
    Д: "11110",
    Е: "111110",
    Ж: "1111110",
    З: "11111110",
    И: "111111110",
    Й: "1111111110",
    К: "11111111110",
    Л: "111111111110",
    М: "1111111111110",
    Н: "11111111111110",
    О: "111111111111110",
    П: "1111111111111110",
    Р: "11111111111111110",
    С: "111111111111111110",
    Т: "1111111111111111110",
    У: "11111111111111111110",
    Ф: "111111111111111111110",
    Х: "1111111111111111111110",
    Ц: "11111111111111111111110",
    Ч: "111111111111111111111110",
    Ш: "1111111111111111111111110",
    Щ: "11111111111111111111111110",
    Ъ: "111111111111111111111111110",
    Ы: "1111111111111111111111111110",
    Ь: "11111111111111111111111111110",
    Э: "111111111111111111111111111110",
    Ю: "1111111111111111111111111111110",
    Я: "11111111111111111111111111111110",
  };

  const encoded = word
    .split("")
    .map((l) => code[l])
    .join("");

  const codeTable = `<table border="1" cellpadding="4" style="border-collapse: collapse; margin: 10px 0;">
    <tr><td style="text-align: center; padding: 4px 12px; font-weight: bold;">${word.split("").join("</td><td style='text-align: center; padding: 4px 12px; font-weight: bold;'>")}</td></tr>
    <tr><td style="text-align: center; padding: 4px 12px;">${word
      .split("")
      .map((l) => code[l])
      .join(
        "</td><td style='text-align: center; padding: 4px 12px;'>",
      )}</td></tr>
  </table>`;

  const encodedWithSpaces = encoded.split("").join(" ");

  const taskText = `Для кодирования букв используется неравномерный двоичный код, удовлетворяющий условию Фано. 
    Кодовые слова:<br>${codeTable}<br>
    Декодируйте сообщение: <b>${encodedWithSpaces}</b><br><br>
    Запишите полученное слово заглавными буквами.`;

  return { text: taskText, answer: word };
}

// ============================================
// Task 7: Information Volume
// Uses VPR7_Task7_Generator module
// ============================================
function generateTask7() {
  if (typeof window.VPR7_Task7_Generator !== "undefined") {
    const task = window.VPR7_Task7_Generator.generateTask();
    // Format answer with unit for PDF
    const units = window.VPR7_Task7_Generator.units;
    const answerText = `${task.answer} ${units[task.answerUnit].name}`;
    return { text: task.text, answer: answerText };
  }
  return generateTask7Fallback();
}

function generateTask7Fallback() {
  const units = {
    KB: { name: "КБ", factor: 1024 },
    MB: { name: "МБ", factor: 1024 * 1024 },
    GB: { name: "ГБ", factor: 1024 * 1024 * 1024 },
  };

  const fileSizeMB = randomChoice([350, 700, 512, 256]);
  const deviceSizeGB = randomChoice([2, 4, 8]);
  const fileSizeBytes = fileSizeMB * 1024 * 1024;
  const deviceSizeBytes = deviceSizeGB * 1024 * 1024 * 1024;
  const filesCount = Math.floor(deviceSizeBytes / fileSizeBytes);
  const usedSpace = filesCount * fileSizeBytes;
  const remainBytes = deviceSizeBytes - usedSpace;
  const remainMB = remainBytes / (1024 * 1024);

  const taskText = `На Flash-карте объёмом <b>${deviceSizeGB} ГБ</b> записывают видеофайлы размером <b>${fileSizeMB} МБ</b> каждый. Сколько мегабайт свободного места останется после записи максимально возможного количества файлов?`;

  return { text: taskText, answer: `${Math.round(remainMB)} МБ` };
}

// ============================================
// Task 8: Text Information Volume
// Uses VPR7_Task8_Generator module
// ============================================
function generateTask8() {
  if (typeof window.VPR7_Task8_Generator !== "undefined") {
    const task = window.VPR7_Task8_Generator.generateTask();
    return { text: task.text, answer: `${task.answer} байт` };
  }
  return generateTask8Fallback();
}

function generateTask8Fallback() {
  const alphabetSize = randomChoice([16, 32, 64, 128, 256]);
  const bitsPerChar = Math.log2(alphabetSize);
  const charCount = randomChoice([100, 200, 256, 512, 1000]);
  const totalBits = charCount * bitsPerChar;
  const totalBytes = totalBits / 8;

  const taskText = `В кодировке используется алфавит мощностью <b>${alphabetSize}</b> символов. 
    Определите размер в байтах сообщения из ${charCount} символов в этой кодировке.`;

  return { text: taskText, answer: `${totalBytes} байт` };
}

// ============================================
// Task 9: Information Transmission
// Uses VPR7_Task9_Generator module
// ============================================
function generateTask9() {
  if (typeof window.VPR7_Task9_Generator !== "undefined") {
    const task = window.VPR7_Task9_Generator.generateTask();
    return { text: task.text, answer: task.answer };
  }
  return generateTask9Fallback();
}

function generateTask9Fallback() {
  const fileSizeMB = randomChoice([2, 4, 5, 8, 10]);
  const speedKbps = randomChoice([128, 256, 512, 1024]);
  const timeSeconds = Math.round((fileSizeMB * 1024 * 8) / speedKbps);

  const taskText = `Файл размером <b>${fileSizeMB} МБ</b> передаётся через соединение со скоростью <b>${speedKbps} Кбит/с</b>. 
    Определите время передачи файла в секундах.`;

  return { text: taskText, answer: timeSeconds };
}

// ============================================
// Task 10: Information in Sentence
// Uses VPR7_Task10_Generator module
// ============================================
function generateTask10() {
  if (typeof window.VPR7_Task10_Generator !== "undefined") {
    const task = window.VPR7_Task10_Generator.generateTask();
    return { text: task.text, answer: `${task.answer} байт` };
  }
  return generateTask10Fallback();
}

function generateTask10Fallback() {
  const sentences = [
    { text: "Информатика — наука об информации", chars: 33 },
    { text: "Компьютер обрабатывает данные", chars: 27 },
    { text: "Программирование — важный навык", chars: 31 },
  ];

  const sentence = randomChoice(sentences);
  const bitsPerChar = randomChoice([8, 16, 24, 32]);
  const totalBits = sentence.chars * bitsPerChar;
  const totalBytes = totalBits / 8;

  const taskText = `В кодировке Unicode каждый символ кодируется ${bitsPerChar} битами. 
    Определите размер в байтах следующего предложения:<br><br>
    <b>"${sentence.text}"</b><br><br>
    Кавычки не учитывать.`;

  return { text: taskText, answer: `${totalBytes} байт` };
}

// ============================================
// Task 11: RGB Color Model
// Uses VPR7_Task11_Generator module
// ============================================
function generateTask11() {
  if (typeof window.VPR7_Task11_Generator !== "undefined") {
    const task = window.VPR7_Task11_Generator.generateTask();
    return { text: task.text, answer: task.answer };
  }
  return generateTask11Fallback();
}

function generateTask11Fallback() {
  const colors = [
    { name: "красный", r: 255, g: 0, b: 0 },
    { name: "зелёный", r: 0, g: 255, b: 0 },
    { name: "синий", r: 0, g: 0, b: 255 },
    { name: "жёлтый", r: 255, g: 255, b: 0 },
    { name: "белый", r: 255, g: 255, b: 255 },
    { name: "чёрный", r: 0, g: 0, b: 0 },
  ];

  const color = randomChoice(colors);

  const taskText = `В цветовой модели RGB цвет кодируется тремя числами от 0 до 255, обозначающими интенсивность красной, зелёной и синей составляющих.<br><br>
    Определите, какой цвет получится при значениях R = ${color.r}, G = ${color.g}, B = ${color.b}.<br><br>
    Запишите название цвета.`;

  return { text: taskText, answer: color.name };
}

// ============================================
// Task 12: Text Formatting
// Uses VPR7_Task12_Generator module
// ============================================
function generateTask12() {
  if (typeof window.VPR7_Task12_Generator !== "undefined") {
    const task = window.VPR7_Task12_Generator.generateTask();
    const formattingTypes = window.VPR7_Task12_Generator.formattingTypes;

    // Format answer as numbers
    const allOptions = [
      "firstLineIndent",
      "hangingIndent",
      "leftIndent",
      "rightIndent",
      "alignLeft",
      "alignRight",
      "alignCenter",
      "alignJustify",
    ];

    const answerNumbers = [];
    task.correctFormatting.forEach((key) => {
      const idx = allOptions.indexOf(key) + 1;
      if (idx > 0) answerNumbers.push(idx);
    });
    answerNumbers.sort((a, b) => a - b);

    // Build task text with visual representation
    const taskText = formatTask12Text(task, formattingTypes);

    return { text: taskText, answer: answerNumbers.join("") };
  }
  return generateTask12Fallback();
}

function formatTask12Text(task, formattingTypes) {
  // Build CSS styles for paragraph
  let paragraphStyle = "white-space: pre-line; line-height: 1.6; ";

  if (task.correctFormatting.has("firstLineIndent")) {
    paragraphStyle += "text-indent: 8.33%; ";
  }
  if (task.correctFormatting.has("hangingIndent")) {
    paragraphStyle += "text-indent: -13.33%; margin-left: 13.33%; ";
  }
  if (
    task.correctFormatting.has("leftIndent") &&
    !task.correctFormatting.has("hangingIndent")
  ) {
    paragraphStyle += "margin-left: 13.33%; ";
  }
  if (task.correctFormatting.has("rightIndent")) {
    paragraphStyle += "margin-right: 10%; ";
  }
  if (task.correctFormatting.has("alignLeft")) {
    paragraphStyle += "text-align: left; ";
  } else if (task.correctFormatting.has("alignRight")) {
    paragraphStyle += "text-align: right; ";
  } else if (task.correctFormatting.has("alignCenter")) {
    paragraphStyle += "text-align: center; ";
  } else if (task.correctFormatting.has("alignJustify")) {
    paragraphStyle += "text-align: justify; ";
  }

  // Build ruler marks
  let rulerMarksHtml = "";
  for (let i = 0; i <= 15; i++) {
    const positionPct = (i / 15) * 100;
    const isMajor = i % 5 === 0;
    rulerMarksHtml += `<div style="position: absolute; left: ${positionPct}%; bottom: 0; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; font-size: 10px; color: #6b7280;"><div style="width: 1px; height: ${isMajor ? 12 : 8}px; background: ${isMajor ? "#4b5563" : "#9ca3af"};"></div>${isMajor ? `<span style="margin-top: 2px;">${i}</span>` : ""}</div>`;
  }

  // Build markers
  let rulerMarkers = "";
  if (task.correctFormatting.has("firstLineIndent")) {
    rulerMarkers += `<div style="position: absolute; top: 0; left: 21.66%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #3b82f6;"></div>`;
  }
  if (task.correctFormatting.has("hangingIndent")) {
    rulerMarkers += `<div style="position: absolute; top: 0; left: 26.66%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #ef4444;"></div>`;
  }
  if (task.correctFormatting.has("leftIndent")) {
    rulerMarkers += `<div style="position: absolute; bottom: 0; left: 13.33%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 10px solid #4b5563;"></div>`;
  }
  if (task.correctFormatting.has("rightIndent")) {
    rulerMarkers += `<div style="position: absolute; bottom: 0; left: 90%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 10px solid #4b5563;"></div>`;
  }

  const taskText = `В текстовом редакторе имеется следующий абзац:<br><br>
    <div style="border: 2px solid #d1d5db; border-radius: 8px; overflow: hidden; background: white; max-width: 550px;">
      <div style="background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%); padding: 8px 15px; border-bottom: 1px solid #d1d5db; display: flex; gap: 15px;">
        <span style="padding: 4px 8px; background: white; border: 1px solid #d1d5db; border-radius: 4px; font-size: 12px;">Файл</span>
        <span style="padding: 4px 8px; background: white; border: 1px solid #d1d5db; border-radius: 4px; font-size: 12px;">Главная</span>
        <span style="padding: 4px 8px; background: #dbeafe; border: 1px solid #3b82f6; border-radius: 4px; font-size: 12px; color: #1d4ed8;">Вид</span>
      </div>
      <div style="background: #f9fafb; height: 30px; border-bottom: 1px solid #d1d5db; position: relative;">
        ${rulerMarksHtml}
        ${rulerMarkers}
      </div>
      <div style="padding: 20px 0 30px 0; min-height: 150px; background: white;">
        <p style="${paragraphStyle}">${task.text}</p>
      </div>
    </div><br>
    Укажите элементы форматирования абзаца, которые были применены к данному тексту. В ответе укажите номера выбранных элементов форматирования без пробелов и запятых.<br><br>
    1) отступ первой строки<br>
    2) выступ первой строки<br>
    3) отступ слева<br>
    4) отступ справа<br>
    5) выравнивание по левому краю<br>
    6) выравнивание по правому краю<br>
    7) выравнивание по центру<br>
    8) выравнивание по ширине`;

  return taskText;
}

function generateTask12Fallback() {
  const paragraphs = [
    {
      text: "Информатика — это наука о методах и процессах сбора, хранения, обработки, передачи, анализа и оценки информации с применением компьютерных технологий.",
      formatting: ["отступ первой строки", "выравнивание по ширине"],
    },
    {
      text: "АНАЛИТИЧЕСКАЯ СПРАВКА\nпо результатам проверки выполнения\nпрактических работ",
      formatting: ["выравнивание по центру"],
    },
  ];

  const allFormattingOptions = [
    "отступ первой строки",
    "выступ первой строки",
    "отступ слева",
    "отступ справа",
    "выравнивание по левому краю",
    "выравнивание по правому краю",
    "выравнивание по центру",
    "выравнивание по ширине",
  ];

  const taskData = randomChoice(paragraphs);

  const answerNumbers = taskData.formatting
    .map((f) => allFormattingOptions.indexOf(f) + 1)
    .sort((a, b) => a - b)
    .join("");

  const taskText = `В текстовом редакторе имеется абзац:<br><br>
    <div style="border: 1px solid #ccc; padding: 15px; margin: 10px 0;">${taskData.text}</div><br>
    Укажите элементы форматирования абзаца. В ответе укажите номера выбранных элементов без пробелов и запятых.<br><br>
    1) отступ первой строки<br>
    2) выступ первой строки<br>
    3) отступ слева<br>
    4) отступ справа<br>
    5) выравнивание по левому краю<br>
    6) выравнивание по правому краю<br>
    7) выравнивание по центру<br>
    8) выравнивание по ширине`;

  return { text: taskText, answer: answerNumbers };
}

// ============================================
// Export functions for use in generator
// ============================================
if (typeof window !== "undefined") {
  window.generateTask1 = generateTask1;
  window.generateTask2 = generateTask2;
  window.generateTask3 = generateTask3;
  window.generateTask4 = generateTask4;
  window.generateTask5 = generateTask5;
  window.generateTask6 = generateTask6;
  window.generateTask7 = generateTask7;
  window.generateTask8 = generateTask8;
  window.generateTask9 = generateTask9;
  window.generateTask10 = generateTask10;
  window.generateTask11 = generateTask11;
  window.generateTask12 = generateTask12;
}
