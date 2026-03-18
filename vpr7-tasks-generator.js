/**
 * VPR 7 Class - Tasks Generator Module
 * Generates tasks for printable variants
 */

// Utility functions
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
// ============================================
function generateTask1() {
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

  // Выбираем устройства из всех категорий: 3 + 2 + 2 + 2 = 9 устройств
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
    Г) устройства обработки`;

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
// ============================================
function generateTask2() {
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
    "Отчёты",
    "Материалы",
    "Задания",
    "Уроки",
    "Архив",
  ];

  const files = [
    "задача.txt",
    "отчёт.docx",
    "документ.pdf",
    "реферат.doc",
    "презентация.pptx",
    "таблица.xlsx",
    "readme.txt",
    "index.html",
    "lesson.htm",
    "data.csv",
  ];

  // Склонение слова "уровень"
  const getLevelWord = (n) => {
    if (n === 1) return "уровень";
    if (n >= 2 && n <= 4) return "уровня";
    return "уровней";
  };

  const taskTypes = [
    // Тип 1: Навигация вверх/вниз по каталогам
    () => {
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

      const newFolders = [];
      for (let i = 0; i < downLevels; i++) {
        let folder;
        do {
          folder = randomChoice(folders);
        } while (usedFolders.has(folder));
        usedFolders.add(folder);
        newFolders.push(folder);
        finalPathParts.push(folder);
      }

      const finalPath = disk + "\\" + finalPathParts.join("\\");

      let taskText = `Пользователь работал с каталогом <b>${startPath}</b>. `;
      taskText += `Он поднялся на ${upLevels} ${getLevelWord(upLevels)} вверх`;

      if (downLevels === 1) {
        taskText += `, затем спустился в папку <b>${newFolders[0]}</b>. `;
      } else {
        taskText += `, затем спустился в папку <b>${newFolders[0]}</b>, а затем в папку <b>${newFolders[1]}</b>. `;
      }

      taskText += `Запишите полный путь к папке, в которой оказался пользователь.`;

      return { text: taskText, answer: finalPath };
    },

    // Тип 2: Создание папок и перемещение файла
    () => {
      const disk = String.fromCharCode(67 + randomInt(0, 2)) + ":";
      const depth = randomInt(2, 3);
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

      const file = randomChoice(files);
      const startPath = disk + "\\" + pathParts.join("\\") + "\\" + file;

      // Поднимаемся на 1 уровень вверх
      const upPathParts = [...pathParts];
      upPathParts.pop();

      // Создаём новые папки
      let newFolder1, newFolder2;
      do {
        newFolder1 = randomChoice(folders);
      } while (usedFolders.has(newFolder1));
      usedFolders.add(newFolder1);

      do {
        newFolder2 = randomChoice(folders);
      } while (usedFolders.has(newFolder2));
      usedFolders.add(newFolder2);

      const finalPathParts = [...upPathParts, newFolder1, newFolder2];
      const finalPath = disk + "\\" + finalPathParts.join("\\") + "\\" + file;

      let taskText = `Пользователь работал с файлом <b>${startPath}</b>. `;
      taskText += `Затем он поднялся на один уровень вверх, создал там каталог <b>${newFolder1}</b>, `;
      taskText += `в нём создал ещё один каталог <b>${newFolder2}</b> и переместил в него файл <b>${file}</b>. `;
      taskText += `Каким стало полное имя этого файла после перемещения?`;

      return { text: taskText, answer: finalPath };
    },

    // Тип 3: Простая навигация с несколькими действиями
    () => {
      const disk = String.fromCharCode(67 + randomInt(0, 2)) + ":";
      const depth = randomInt(3, 4);
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

      // Последовательность навигации
      const actions = [];
      let currentParts = [...pathParts];

      const numActions = randomInt(2, 3);

      for (let i = 0; i < numActions; i++) {
        const goUp = currentParts.length > 1 && Math.random() > 0.4;

        if (goUp) {
          actions.push({
            type: "up",
            text: "поднялся на один уровень вверх",
          });
          currentParts.pop();
        } else {
          let folder;
          do {
            folder = randomChoice(folders);
          } while (usedFolders.has(folder));
          usedFolders.add(folder);
          actions.push({
            type: "down",
            folder: folder,
            text: `спустился в каталог <b>${folder}</b>`,
          });
          currentParts.push(folder);
        }
      }

      const finalPath = disk + "\\" + currentParts.join("\\");

      let taskText = `Пользователь работал с каталогом <b>${startPath}</b>. `;
      taskText += "Сначала он ";

      actions.forEach((action, index) => {
        if (index === actions.length - 1) {
          taskText += action.text + ". ";
        } else if (index === actions.length - 2) {
          taskText += action.text + ", затем ";
        } else {
          taskText += action.text + ", ";
        }
      });

      taskText += `Укажите полный путь каталога, в котором оказался пользователь.`;

      return { text: taskText, answer: finalPath };
    },
  ];

  return randomChoice(taskTypes)();
}

// ============================================
// Task 3: File Types
// ============================================
function generateTask3() {
  const fileTypes = {
    "текстовые документы": ["doc", "docx", "txt", "rtf", "odt", "pdf"],
    "графические изображения": ["jpg", "png", "gif", "bmp", "svg", "tiff"],
    аудиофайлы: ["mp3", "wav", "ogg", "flac", "wma", "aac"],
    видеофайлы: ["mp4", "avi", "mkv", "mov", "wmv", "webm"],
    презентации: ["ppt", "pptx", "odp"],
    "электронные таблицы": ["xls", "xlsx", "ods"],
    архивы: ["zip", "rar", "7z"],
    "веб-страницы": ["html", "htm"],
    программы: ["exe"],
  };

  const typeNames = Object.keys(fileTypes);

  // Выбираем расширения из разных категорий: по 2 из первых 4 категорий + 1 из пятой = 9 расширений
  // Категории для выбора (те, у которых достаточно расширений)
  const mainCategories = [
    "текстовые документы",
    "графические изображения",
    "аудиофайлы",
    "видеофайлы",
  ];
  const additionalCategories = [
    "презентации",
    "электронные таблицы",
    "архивы",
    "веб-страницы",
    "программы",
  ];

  // Выбираем 4 основные категории и берём по 2 расширения из каждой
  const selectedMainCategories = shuffleArray(mainCategories);
  const selectedExtensions = [];

  selectedMainCategories.forEach((cat) => {
    const exts = shuffleArray(fileTypes[cat]).slice(0, 2);
    selectedExtensions.push(...exts);
  });

  // Добавляем 1 расширение из дополнительной категории
  const additionalCat = randomChoice(additionalCategories);
  const additionalExt = randomChoice(fileTypes[additionalCat]);
  selectedExtensions.push(additionalExt);

  // Перемешиваем все расширения
  const allExtensions = shuffleArray(selectedExtensions);

  // Определяем категории для отображения (те, которые использовались)
  const usedCategories = new Set();
  allExtensions.forEach((ext) => {
    for (const [type, exts] of Object.entries(fileTypes)) {
      if (exts.includes(ext)) {
        usedCategories.add(type);
      }
    }
  });

  // Добавляем неиспользуемые категории до 6
  const categoriesToShow = [...usedCategories];
  const unusedCategories = shuffleArray(
    typeNames.filter((t) => !usedCategories.has(t)),
  );
  while (categoriesToShow.length < 6 && unusedCategories.length > 0) {
    categoriesToShow.push(unusedCategories.pop());
  }

  const taskText = `Установите соответствие между расширениями файлов и их типом.<br><br>
    <b>Расширения:</b> ${allExtensions.map((e, i) => `${i + 1}) .${e}`).join("   ")}<br><br>
    <b>Типы файлов:</b><br>
    ${categoriesToShow.map((cat, i) => `${String.fromCharCode(65 + i)}) ${cat}`).join("<br>")}`;

  const answerMap = {};
  allExtensions.forEach((ext, i) => {
    for (const [type, exts] of Object.entries(fileTypes)) {
      if (exts.includes(ext)) {
        const typeIndex = categoriesToShow.indexOf(type);
        if (typeIndex >= 0) {
          answerMap[i + 1] = String.fromCharCode(65 + typeIndex);
        }
      }
    }
  });

  const answer = allExtensions.map((_, i) => answerMap[i + 1]).join("");

  return { text: taskText, answer: answer };
}

// ============================================
// Task 4: URL Addresses
// ============================================
function generateTask4() {
  const protocols = ["http", "https", "ftp"];
  const domains = ["school", "edu", "gov", "info", "test", "python", "code"];
  const tlds = ["ru", "com", "org", "net", "edu", "info"];
  const paths = [
    "lessons",
    "courses",
    "materials",
    "tasks",
    "homework",
    "docs",
  ];
  const fileNames = [
    "index",
    "lesson",
    "task",
    "page",
    "about",
    "main",
    "start",
  ];
  const extensions = ["html", "htm", "php", "py", "txt", "pdf", "doc"];

  const protocol = randomChoice(protocols);
  const domain = randomChoice(domains);
  const tld = randomChoice(tlds);
  const path = randomChoice(paths);
  const fileName = randomChoice(fileNames);
  const extension = randomChoice(extensions);

  // URL: protocol://domain.tld/path/filename.extension
  // Разбиваем на 7 фрагментов:
  // Порядок в URL: протокол :// домен. зона /путь/ имя .расширение

  // Создаём фрагменты с случайными id от 1 до 7
  const ids = shuffleArray([1, 2, 3, 4, 5, 6, 7]);

  const fragments = [
    { id: ids[0], text: `.${extension}`, position: 7 }, // расширение
    { id: ids[1], text: "://", position: 2 }, // разделитель
    { id: ids[2], text: fileName, position: 6 }, // имя файла
    { id: ids[3], text: tld, position: 4 }, // зона (TLD)
    { id: ids[4], text: `/${path}/`, position: 5 }, // путь
    { id: ids[5], text: protocol, position: 1 }, // протокол
    { id: ids[6], text: `${domain}.`, position: 3 }, // домен.
  ];

  // Правильный ответ: id фрагментов в порядке позиций 1,2,3,4,5,6,7
  const correctOrder = fragments
    .sort((a, b) => a.position - b.position)
    .map((f) => f.id);

  // Перемешиваем фрагменты для отображения (по id по возрастанию для красивого списка)
  const sortedForDisplay = [...fragments].sort((a, b) => a.id - b.id);

  // Формируем список фрагментов для задания
  const fragmentsList = sortedForDisplay
    .map((f) => `${f.id}.&nbsp;&nbsp;&nbsp;&nbsp;${f.text}`)
    .join("<br>");

  const taskText = `Доступ к файлу <b>${fileName}.${extension}</b>, находящемуся на сервере <b>${domain}.${tld}</b> в папке <b>${path}</b>, осуществляется по протоколу <b>${protocol}</b>. Фрагменты адреса файла закодированы цифрами от 1 до 7.<br>
    Запишите в ответе последовательность этих цифр, кодирующую адрес указанного файла в сети Интернет.<br><br>
    ${fragmentsList}`;

  const answer = correctOrder.join("");

  return { text: taskText, answer: answer };
}

// ============================================
// Task 5: Logic Problems
// ============================================
function generateTask5() {
  const names = ["Алексей", "Борис", "Виктор", "Григорий", "Дмитрий"];
  const selectedNames = shuffleArray(names).slice(0, 3);

  const problems = [
    () => {
      const order = shuffleArray([1, 2, 3]);
      const taskText = `Три друга — ${selectedNames.join(", ")} — заняли первые три места в соревнованиях. 
        ${selectedNames[0]} занял не ${order[0]}-е и не ${order[1]}-е место. 
        ${selectedNames[1]} занял не ${order[1]}-е место. 
        Какое место занял каждый из друзей?`;

      const answer = `${selectedNames[0]} — ${order[2]}-е, ${selectedNames[1]} — ${order[0]}-е, ${selectedNames[2]} — ${order[1]}-е`;
      return { text: taskText, answer: answer };
    },
    () => {
      const professions = ["врач", "учитель", "инженер"];
      const shuffledProf = shuffleArray(professions);
      const taskText = `Три друга — ${selectedNames.join(", ")} — работают ${professions.join(", ")}. 
        ${selectedNames[0]} не врач и не учитель. 
        ${selectedNames[1]} не врач. 
        Кто кем работает?`;

      const answer = `${selectedNames[0]} — ${shuffledProf[0]}, ${selectedNames[1]} — ${shuffledProf[1]}, ${selectedNames[2]} — ${shuffledProf[2]}`;
      return { text: taskText, answer: answer };
    },
  ];

  return randomChoice(problems)();
}

// ============================================
// Task 6: Message Decoding
// ============================================
function generateTask6() {
  // Осмысленные слова из 3-5 букв
  const words = [
    "МИР",
    "КОТ",
    "СОН",
    "ДОМ",
    "ЛЕС",
    "МЕЛ",
    "СОРТ",
    "ПОРТ",
    "КЛАСС",
    "ПРИЗ",
    "РОСТ",
    "СЛОГ",
    "ТОРГ",
    "ФОРТ",
    "ШАРФ",
    "БРАТ",
    "ВРАГ",
    "ГРАД",
    "ЗНАК",
    "КРАН",
    "КРОВ",
    "ПЛАН",
    "ПЛУГ",
    "СРОК",
    "СТОЛ",
    "СТОП",
    "ТРАП",
    "УДАР",
    "ФЛАГ",
    "ЭКРАН",
  ];

  const allLetters = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ".split("");

  const word = randomChoice(words);
  const uniqueLetters = [...new Set(word.split(""))];

  // Добавляем неиспользуемые буквы (2-3 штуки)
  const unusedLetters = shuffleArray(
    allLetters.filter((l) => !uniqueLetters.includes(l)),
  ).slice(0, randomInt(2, 3));

  const allCodeLetters = [...uniqueLetters, ...unusedLetters];

  // Генерируем код для всех букв (используемые + неиспользуемые)
  // Используем неравномерный двоичный код с условием Фано
  const code = {};

  // Строим префиксный код (условие Фано) для всех букв
  // Генерируем достаточное количество кодов
  const generatePrefixCodes = (count) => {
    const codes = [];
    let current = "0";
    codes.push(current);
    for (let i = 1; i < count; i++) {
      if (current.endsWith("0")) {
        current = current.slice(0, -1) + "10";
      } else if (current.endsWith("10")) {
        current = current.slice(0, -2) + "11";
      } else if (current.endsWith("11")) {
        // Переходим к следующей длине
        current = current.slice(0, -2) + "00".padStart(current.length + 1, "1");
        if (current.startsWith("00")) {
          current = "1" + "0".repeat(current.length - 1);
        }
      }
      codes.push(current);
    }
    return shuffleArray(codes);
  };

  const codes = generatePrefixCodes(allCodeLetters.length);
  allCodeLetters.forEach((letter, i) => {
    code[letter] = codes[i];
  });

  // Кодируем слово
  const encoded = word
    .split("")
    .map((l) => code[l])
    .join("");

  // Формируем таблицу кодов - буквы перемешаны
  const shuffledCodeEntries = shuffleArray(Object.entries(code));

  // Создаём горизонтальную HTML-таблицу кодов (буквы в первой строке, коды во второй)
  const lettersRow = shuffledCodeEntries
    .map(
      ([letter]) =>
        `<td style="text-align: center; padding: 4px 12px; font-weight: bold;">${letter}</td>`,
    )
    .join("");

  const codesRow = shuffledCodeEntries
    .map(
      ([, c]) => `<td style="text-align: center; padding: 4px 12px;">${c}</td>`,
    )
    .join("");

  const codeTable = `<table border="1" cellpadding="4" style="border-collapse: collapse; margin: 10px 0;">
    <tr>${lettersRow}</tr>
    <tr>${codesRow}</tr>
  </table>`;

  // Добавляем пробелы между каждым символом 0 и 1 для лучшей читаемости
  const encodedWithSpaces = encoded.split("").join(" ");

  const taskText = `Для кодирования букв используется неравномерный двоичный код, удовлетворяющий условию Фано. 
    Кодовые слова:<br>${codeTable}<br>
    Декодируйте сообщение: <b>${encodedWithSpaces}</b>`;

  return { text: taskText, answer: word };
}

// ============================================
// Task 7: Information Volume
// ============================================
function generateTask7() {
  const units = {
    KB: { name: "КБ", factor: 1024 },
    MB: { name: "МБ", factor: 1024 * 1024 },
    GB: { name: "ГБ", factor: 1024 * 1024 * 1024 },
  };

  // Конвертация между единицами
  const convert = (value, fromUnit, toUnit) => {
    const fromFactor = units[fromUnit].factor;
    const toFactor = units[toUnit].factor;
    return (value * fromFactor) / toFactor;
  };

  // Округление
  const roundValue = (val) => {
    if (Number.isInteger(val)) return val;
    return Math.round(val * 1000) / 1000;
  };

  const scenarios = [
    // 1. Сколько файлов поместится на устройстве
    () => {
      const sets = [
        {
          fileSize: 350,
          fileUnit: "MB",
          deviceSize: 2,
          deviceUnit: "GB",
          deviceName: "Flash-карта",
        },
        {
          fileSize: 700,
          fileUnit: "MB",
          deviceSize: 4,
          deviceUnit: "GB",
          deviceName: "USB-накопитель",
        },
        {
          fileSize: 1.5,
          fileUnit: "GB",
          deviceSize: 8,
          deviceUnit: "GB",
          deviceName: "SD-карта",
        },
        {
          fileSize: 256,
          fileUnit: "MB",
          deviceSize: 4,
          deviceUnit: "GB",
          deviceName: "Flash-карта",
        },
        {
          fileSize: 512,
          fileUnit: "MB",
          deviceSize: 8,
          deviceUnit: "GB",
          deviceName: "внешний диск",
        },
      ];

      const set = randomChoice(sets);
      const fileSizeMB = convert(set.fileSize, set.fileUnit, "MB");
      const deviceSizeMB = convert(set.deviceSize, set.deviceUnit, "MB");
      const filesCount = Math.floor(deviceSizeMB / fileSizeMB);
      const usedSpaceMB = filesCount * fileSizeMB;
      const remainMB = deviceSizeMB - usedSpaceMB;
      const answer = roundValue(remainMB);

      const taskText = `На ${set.deviceName} объёмом <b>${set.deviceSize} ${units[set.deviceUnit].name}</b> записывают видеофайлы размером <b>${set.fileSize} ${units[set.fileUnit].name}</b> каждый. Сколько мегабайт свободного места останется после записи максимально возможного количества файлов?`;

      return { text: taskText, answer: answer };
    },

    // 2. Сложение объёмов
    () => {
      const scenarios = [
        {
          a: { size: 25, unit: "GB" },
          b: { size: 5120, unit: "MB" },
          sum: "GB",
          text: "Игра занимает {a} {au}, а её обновление увеличивает объём игры на {b} {bu}. Сколько {sum} будет весить игра после обновления?",
        },
        {
          a: { size: 2.5, unit: "GB" },
          b: { size: 2048, unit: "MB" },
          sum: "GB",
          text: "Алексей скачал два фильма: первый весит {a} {au}, второй — {b} {bu}. Сколько всего {sum} занимают оба фильма?",
        },
        {
          a: { size: 1.5, unit: "GB" },
          b: { size: 512, unit: "MB" },
          sum: "MB",
          text: "На диске записано {a} {au} видео и {b} {bu} фотографий. Какой общий объём в {sum}?",
        },
        {
          a: { size: 3, unit: "GB" },
          b: { size: 1024, unit: "MB" },
          sum: "GB",
          text: "Программа занимает {a} {au}, а её дополнение — {b} {bu}. Сколько {sum} займёт программа с дополнением?",
        },
        {
          a: { size: 512, unit: "MB" },
          b: { size: 2560, unit: "MB" },
          sum: "MB",
          text: "Два архива занимают {a} {au} и {b} {bu}. Сколько всего {sum} они занимают?",
        },
      ];

      const pair = randomChoice(scenarios);
      const aMB = convert(pair.a.size, pair.a.unit, "MB");
      const bMB = convert(pair.b.size, pair.b.unit, "MB");
      const sumMB = aMB + bMB;
      const answer = roundValue(convert(sumMB, "MB", pair.sum));

      const taskText = pair.text
        .replace("{a}", pair.a.size)
        .replace("{au}", units[pair.a.unit].name)
        .replace("{b}", pair.b.size)
        .replace("{bu}", units[pair.b.unit].name)
        .replace("{sum}", units[pair.sum].name.toLowerCase());

      return { text: taskText, answer: answer };
    },

    // 3. Вычитание объёмов
    () => {
      const sets = [
        {
          free: { size: 2, unit: "GB" },
          file: { size: 1000, unit: "MB" },
          remain: "MB",
        },
        {
          free: { size: 4, unit: "GB" },
          file: { size: 2560, unit: "MB" },
          remain: "MB",
        },
        {
          free: { size: 8, unit: "GB" },
          file: { size: 1536, unit: "MB" },
          remain: "GB",
        },
        {
          free: { size: 16, unit: "GB" },
          file: { size: 6144, unit: "MB" },
          remain: "GB",
        },
        {
          free: { size: 1, unit: "GB" },
          file: { size: 256, unit: "MB" },
          remain: "MB",
        },
      ];

      const set = randomChoice(sets);
      const freeMB = convert(set.free.size, set.free.unit, "MB");
      const fileMB = convert(set.file.size, set.file.unit, "MB");
      const remainMB = freeMB - fileMB;
      const answer = roundValue(convert(remainMB, "MB", set.remain));

      const taskText = `На флешке <b>${set.free.size} ${units[set.free.unit].name}</b> свободного места. Пользователь хочет записать файл размером <b>${set.file.size} ${units[set.file.unit].name}</b>. Сколько ${units[set.remain].name.toLowerCase()} останется после записи?`;

      return { text: taskText, answer: answer };
    },

    // 4. Несколько файлов одного размера
    () => {
      const items = [
        "фотографий",
        "документов",
        "музыкальных файлов",
        "игр",
        "фильмов",
        "видеороликов",
      ];
      const item = randomChoice(items);

      const sets = [
        { count: 30, size: 4096, sizeUnit: "KB", totalUnit: "MB" },
        { count: 25, size: 512, sizeUnit: "KB", totalUnit: "MB" },
        { count: 50, size: 2, sizeUnit: "MB", totalUnit: "MB" },
        { count: 20, size: 256, sizeUnit: "MB", totalUnit: "GB" },
        { count: 40, size: 2048, sizeUnit: "KB", totalUnit: "MB" },
      ];

      const set = randomChoice(sets);
      const sizeInTotalUnit = convert(set.size, set.sizeUnit, set.totalUnit);
      const answer = roundValue(set.count * sizeInTotalUnit);

      const taskText = `В папке <b>${set.count} ${item}</b>, каждый размером <b>${set.size} ${units[set.sizeUnit].name}</b>. Какой общий объём в ${units[set.totalUnit].name.toLowerCase()}?`;

      return { text: taskText, answer: answer };
    },

    // 5. Сравнение объёмов
    () => {
      const sets = [
        {
          a: { size: 750, unit: "MB" },
          b: { size: 2.5, unit: "GB" },
          diffUnit: "MB",
        },
        {
          a: { size: 1.5, unit: "GB" },
          b: { size: 3072, unit: "MB" },
          diffUnit: "MB",
        },
        {
          a: { size: 512, unit: "MB" },
          b: { size: 2, unit: "GB" },
          diffUnit: "MB",
        },
        {
          a: { size: 256, unit: "MB" },
          b: { size: 1, unit: "GB" },
          diffUnit: "MB",
        },
      ];

      const set = randomChoice(sets);
      const aInDiff = convert(set.a.size, set.a.unit, set.diffUnit);
      const bInDiff = convert(set.b.size, set.b.unit, set.diffUnit);
      const answer = roundValue(Math.abs(bInDiff - aInDiff));

      const taskText = `Виктор скачал два файла: первый занимает <b>${set.a.size} ${units[set.a.unit].name}</b>, второй — <b>${set.b.size} ${units[set.b.unit].name}</b>. На сколько ${units[set.diffUnit].name.toLowerCase()} второй файл больше первого?`;

      return { text: taskText, answer: answer };
    },

    // 6. За определённое время
    () => {
      const perDay = randomChoice([2, 3, 4, 5]);
      const days = randomChoice([2, 3, 4, 5, 7]);
      const daysWord = days === 1 ? "день" : days < 5 ? "дня" : "дней";
      const totalUnit = "MB";
      const answer = roundValue(convert(perDay * days, "GB", totalUnit));

      const scenarios = [
        `За сутки камера записывает <b>${perDay} ГБ</b> видео. Сколько ${units[totalUnit].name.toLowerCase()} запишется за <b>${days} ${daysWord}</b>?`,
        `Сервер создаёт резервную копию размером <b>${perDay} ГБ</b> каждый день. Сколько ${units[totalUnit].name.toLowerCase()} займут копии за <b>${days} ${daysWord}</b>?`,
      ];

      const taskText = randomChoice(scenarios);

      return { text: taskText, answer: answer };
    },

    // 7. Сложная задача с несколькими действиями
    () => {
      const sets = [
        {
          initial: { size: 12, unit: "GB" },
          deleted: { size: 2048, unit: "MB" },
          added: { size: 512, unit: "MB" },
          capacity: { size: 16, unit: "GB" },
          remainUnit: "GB",
        },
        {
          initial: { size: 8, unit: "GB" },
          deleted: { size: 1024, unit: "MB" },
          added: { size: 2, unit: "GB" },
          capacity: { size: 16, unit: "GB" },
          remainUnit: "GB",
        },
        {
          initial: { size: 20, unit: "GB" },
          deleted: { size: 5120, unit: "MB" },
          added: { size: 1.5, unit: "GB" },
          capacity: { size: 32, unit: "GB" },
          remainUnit: "GB",
        },
      ];

      const set = randomChoice(sets);
      const initialGB = convert(set.initial.size, set.initial.unit, "GB");
      const deletedGB = convert(set.deleted.size, set.deleted.unit, "GB");
      const addedGB = convert(set.added.size, set.added.unit, "GB");
      const capacityGB = convert(set.capacity.size, set.capacity.unit, "GB");

      const usedAfterDelete = initialGB - deletedGB;
      const usedFinal = usedAfterDelete + addedGB;
      const remainGB = capacityGB - usedFinal;
      const answer = roundValue(convert(remainGB, "GB", set.remainUnit));

      const taskText = `На диске записано <b>${set.initial.size} ${units[set.initial.unit].name}</b> данных. Пользователь удалил <b>${set.deleted.size} ${units[set.deleted.unit].name}</b>, а затем добавил новый файл размером <b>${set.added.size} ${units[set.added.unit].name}</b>. Сколько ${units[set.remainUnit].name.toLowerCase()} свободного места осталось на диске, если его ёмкость <b>${set.capacity.size} ${units[set.capacity.unit].name}</b>?`;

      return { text: taskText, answer: answer };
    },

    // 8. Облачное хранилище
    () => {
      const sets = [
        {
          items: [
            { count: 50, size: 6, unit: "MB" },
            { count: 30, size: 4096, unit: "KB" },
          ],
          totalUnit: "MB",
        },
        {
          items: [
            { count: 100, size: 2, unit: "MB" },
            { count: 25, size: 512, unit: "KB" },
          ],
          totalUnit: "MB",
        },
        {
          items: [
            { count: 512, size: 2, unit: "MB" },
            { count: 10, size: 1, unit: "GB" },
          ],
          totalUnit: "GB",
        },
      ];

      const set = randomChoice(sets);
      let totalMB = 0;

      const itemDescriptions = set.items.map((item) => {
        const itemMB = item.count * convert(item.size, item.unit, "MB");
        totalMB += itemMB;
        return `${item.count} треков по ${item.size} ${units[item.unit].name}`;
      });

      const answer = roundValue(convert(totalMB, "MB", set.totalUnit));

      const taskText = `В облачном хранилище лежат:<br>1) <b>${itemDescriptions[0]}</b><br>2) <b>${itemDescriptions[1]}</b><br><br>Какой общий объём в ${units[set.totalUnit].name.toLowerCase()}?`;

      return { text: taskText, answer: answer };
    },
  ];

  return randomChoice(scenarios)();
}

// ============================================
// Task 8: Text Information Volume
// ============================================
function generateTask8() {
  // Мощность алфавита - степени двойки
  const alphabetSize = randomChoice([16, 32, 64, 128, 256]);
  const bitsPerChar = Math.log2(alphabetSize);
  const charCount = randomChoice([100, 200, 256, 512, 1000, 1024]);
  const totalBits = charCount * bitsPerChar;
  const totalBytes = totalBits / 8;

  const taskText = `В кодировке используется алфавит мощностью <b>${alphabetSize}</b> символов. 
    Определите размер в байтах сообщения из ${charCount} символов в этой кодировке.`;

  return { text: taskText, answer: totalBytes };
}

// ============================================
// Task 9: Information Transmission
// ============================================
function generateTask9() {
  // Функция для правильного склонения слова "секунда"
  const getSecondsWord = (n) => {
    const lastTwo = n % 100;
    const lastOne = n % 10;
    if (lastTwo >= 11 && lastTwo <= 19) return "секунд";
    if (lastOne === 1) return "секунду";
    if (lastOne >= 2 && lastOne <= 4) return "секунды";
    return "секунд";
  };

  // Разные типы задач: найти время, объём или скорость
  const taskType = randomInt(1, 3);

  if (taskType === 1) {
    // Найти время передачи (с переводом единиц)
    // Размер в МБ, скорость в Кбит/с
    const fileSizeMB = randomChoice([2, 4, 5, 8, 10, 15, 20]);
    const speedKbps = randomChoice([128, 256, 512, 1024, 2048]);
    // Перевод: МБ → КБ → биты, затем делим на Кбит/с
    // fileSizeMB * 1024 * 8 / speedKbps = время в секундах
    const timeSeconds = Math.round((fileSizeMB * 1024 * 8) / speedKbps);

    const taskText = `Файл размером <b>${fileSizeMB} МБ</b> передаётся через соединение со скоростью <b>${speedKbps} Кбит/с</b>. 
      Определите время передачи файла в секундах.`;

    return { text: taskText, answer: timeSeconds };
  } else if (taskType === 2) {
    // Найти объём файла (с переводом единиц)
    // Время в секундах, скорость в Кбит/с, ответ в КБ
    const timeSeconds = randomChoice([32, 64, 128, 256, 512]);
    const speedKbps = randomChoice([64, 128, 256, 512]);
    // Объём в битах = время * скорость * 1024
    // Объём в КБ = время * скорость / 8
    const fileSizeKB = Math.round((timeSeconds * speedKbps) / 8);

    const taskText = `Файл передавался через соединение со скоростью <b>${speedKbps} Кбит/с</b> в течение <b>${timeSeconds}</b> ${getSecondsWord(timeSeconds)}. 
      Определите размер файла в килобайтах.`;

    return { text: taskText, answer: fileSizeKB };
  } else {
    // Найти скорость передачи (с переводом единиц)
    // Размер в МБ, время в секундах, ответ в Кбит/с
    const fileSizeMB = randomChoice([1, 2, 4, 8]);
    const timeSeconds = randomChoice([16, 32, 64, 128]);
    // Скорость в Кбит/с = (МБ * 1024 * 8) / секунды
    const speedKbps = Math.round((fileSizeMB * 1024 * 8) / timeSeconds);

    const taskText = `Файл размером <b>${fileSizeMB} МБ</b> был передан за <b>${timeSeconds}</b> ${getSecondsWord(timeSeconds)}. 
      Определите скорость передачи в Кбит/с.`;

    return { text: taskText, answer: speedKbps };
  }
}

// ============================================
// Task 10: Information in Sentence
// ============================================
function generateTask10() {
  const sentences = [
    { text: "Информатика — наука об информации", chars: 33 },
    { text: "Компьютер обрабатывает данные", chars: 27 },
    { text: "Программирование — важный навык", chars: 31 },
    { text: "Алгоритм — последовательность действий", chars: 37 },
    { text: "Интернет связывает весь мир", chars: 27 },
    { text: "Монитор отображает информацию", chars: 29 },
    { text: "Процессор выполняет команды", chars: 27 },
    { text: "Клавиатура — устройство ввода", chars: 29 },
    { text: "Файл хранится на диске", chars: 22 },
    { text: "Система управляет ресурсами", chars: 27 },
    { text: "Программы работают с данными", chars: 28 },
    { text: "Сеть объединяет компьютеры", chars: 26 },
    { text: "Память сохраняет информацию", chars: 28 },
    { text: "Операционная система управляет", chars: 29 },
    { text: "Браузер открывает страницы", chars: 26 },
    { text: "Вирус повреждает файлы", chars: 23 },
    { text: "Антивирус защищает систему", chars: 27 },
    { text: "Архиватор сжимает данные", chars: 25 },
    { text: "Текстовый редактор создаёт документы", chars: 37 },
    { text: "Графический редактор рисует", chars: 28 },
  ];

  const sentence = randomChoice(sentences);
  const bitsPerChar = randomChoice([8, 16, 24, 32]);
  const totalBits = sentence.chars * bitsPerChar;
  const totalBytes = totalBits / 8;

  const taskText = `В кодировке Unicode каждый символ кодируется ${bitsPerChar} битами. 
    Определите размер в байтах следующего предложения:<br><br>
    <b>"${sentence.text}"</b><br><br>
    Кавычки не учитывать.`;

  return { text: taskText, answer: totalBytes };
}

// ============================================
// Task 11: RGB Color Model
// ============================================
function generateTask11() {
  const colors = [
    { name: "красный", r: 255, g: 0, b: 0 },
    { name: "зелёный", r: 0, g: 255, b: 0 },
    { name: "синий", r: 0, g: 0, b: 255 },
    { name: "жёлтый", r: 255, g: 255, b: 0 },
    { name: "голубой", r: 0, g: 255, b: 255 },
    { name: "пурпурный", r: 255, g: 0, b: 255 },
    { name: "белый", r: 255, g: 255, b: 255 },
    { name: "чёрный", r: 0, g: 0, b: 0 },
  ];

  const color = randomChoice(colors);

  const taskText = `В цветовой модели RGB цвет кодируется тремя числами от 0 до 255, обозначающими интенсивность красной, зелёной и синей составляющих.<br><br>
    Определите, какой цвет получится при значениях R = ${color.r}, G = ${color.g}, B = ${color.b}.`;

  return { text: taskText, answer: color.name };
}

// ============================================
// Task 12: Text Formatting
// ============================================
function generateTask12() {
  // Тексты для заданий с правильными ответами (длинные тексты для наглядности выравнивания)
  const paragraphs = [
    {
      text: "Информатика — это наука о методах и процессах сбора, хранения, обработки, передачи, анализа и оценки информации с применением компьютерных технологий, которая изучает способы представления информации, алгоритмы её обработки и программные средства для работы с данными в различных сферах человеческой деятельности.",
      formatting: ["отступ первой строки", "выравнивание по ширине"],
    },
    {
      text: "АНАЛИТИЧЕСКАЯ СПРАВКА\nпо результатам проверки выполнения\nпрактических работ за 2025-2026 учебный год",
      formatting: ["выравнивание по центру"],
    },
    {
      text: "Директор школы: Петров А.Б.\nГлавный бухгалтер: Сидорова В.Г.\nОтветственный за выполнение: Иванов Д.Е.\nДата составления: 15 марта 2026 года",
      formatting: ["выравнивание по правому краю"],
    },
    {
      text: "Для подготовки к экзамену необходимо выполнить следующие действия: изучить теоретический материал по всем разделам курса, решить практические задания разных типов, повторить основные понятия и определения, пройти тестирование в режиме онлайн.",
      formatting: ["выравнивание по левому краю"],
    },
    {
      text: "В современном мире информационные технологии играют важную роль, проникая во все сферы человеческой деятельности и изменяя привычные способы работы с информацией, коммуникации и обучения людей разных возрастов и профессий.",
      formatting: [
        "отступ первой строки",
        "отступ слева",
        "выравнивание по ширине",
      ],
    },
    {
      text: "1. Первый пункт списка содержит важную информацию о структуре документа и его основных элементах, которые необходимо учитывать при оформлении официальных документов.\n2. Второй пункт описывает требования к форматированию текста и правила его размещения на странице.",
      formatting: ["выступ первой строки", "выравнивание по левому краю"],
    },
    {
      text: "Компьютер — это универсальное устройство для автоматической обработки информации, которое может выполнять миллиарды операций в секунду, что делает его незаменимым инструментом в науке, образовании, бизнесе и многих других областях современной жизни.",
      formatting: [
        "отступ первой строки",
        "отступ слева",
        "отступ справа",
        "выравнивание по ширине",
      ],
    },
    {
      text: "г. Москва\n15 марта 2026 года\nИсполнитель: специалист отдела Иванов И.И.\nТелефон: +7 (495) 123-45-67",
      formatting: ["выравнивание по правому краю", "отступ справа"],
    },
    {
      text: "ОТЧЁТ\nО ВЫПОЛНЕНИИ ПЛАНА РАБОТ\nза первый квартал 2026 года\nпо организации образовательного процесса",
      formatting: ["выравнивание по центру"],
    },
    {
      text: "Программирование — это процесс создания компьютерных программ с помощью языков программирования, когда программисты разрабатывают алгоритмы и реализуют их в виде кода, который компьютер может выполнять для решения различных задач пользователя.",
      formatting: [
        "отступ первой строки",
        "выравнивание по ширине",
        "отступ справа",
      ],
    },
    {
      text: "Глава 1. Введение в информатику. В данной главе рассматриваются основные понятия информатики как науки о методах и средствах работы с информацией, её место в системе естественных и технических наук, а также роль информационных технологий.",
      formatting: ["выступ первой строки", "выравнивание по ширине"],
    },
    {
      text: "Приложение А. Дополнительные материалы. В данном приложении представлены справочные таблицы, схемы и примеры решения типовых задач, которые помогут в освоении курса информатики и подготовке к проверочным работам разного уровня сложности.",
      formatting: ["выравнивание по левому краю", "отступ слева"],
    },
  ];

  const taskData = randomChoice(paragraphs);

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

  // Единая система координат: линейка от 0 до 15 см
  // Отступы в см (как в реальном текстовом редакторе)
  const leftIndentCm = taskData.formatting.includes("отступ слева") ? 2 : 0;
  const rightIndentCm = taskData.formatting.includes("отступ справа") ? 2 : 0;
  const firstLineIndentCm = taskData.formatting.includes("отступ первой строки")
    ? 1.25
    : 0;
  const hangingIndentCm = taskData.formatting.includes("выступ первой строки")
    ? 2
    : 0;

  // Переводим см в проценты от ширины (15 см = 100%)
  const leftIndentPct = (leftIndentCm / 15) * 100;
  const rightIndentPct = (rightIndentCm / 15) * 100;
  const firstLineIndentPct = (firstLineIndentCm / 15) * 100;
  const hangingIndentPct = (hangingIndentCm / 15) * 100;

  // Build CSS styles for paragraph - используем проценты напрямую
  let paragraphStyle = "white-space: pre-line; line-height: 1.6; ";

  // Text indent (first line or hanging)
  if (taskData.formatting.includes("отступ первой строки")) {
    // Отступ первой строки = 1.25см = 8.33%
    paragraphStyle += `text-indent: ${firstLineIndentPct}%; `;
  } else if (taskData.formatting.includes("выступ первой строки")) {
    paragraphStyle += `text-indent: -${hangingIndentPct}%; margin-left: ${hangingIndentPct}%; `;
  }

  // Left indent
  if (
    taskData.formatting.includes("отступ слева") &&
    !taskData.formatting.includes("выступ первой строки")
  ) {
    paragraphStyle += `margin-left: ${leftIndentPct}%; `;
  }

  // Right indent
  if (taskData.formatting.includes("отступ справа")) {
    paragraphStyle += `margin-right: ${rightIndentPct}%; `;
  }

  // Alignment
  if (taskData.formatting.includes("выравнивание по левому краю")) {
    paragraphStyle += "text-align: left; ";
  } else if (taskData.formatting.includes("выравнивание по правому краю")) {
    paragraphStyle += "text-align: right; ";
  } else if (taskData.formatting.includes("выравнивание по центру")) {
    paragraphStyle += "text-align: center; ";
  } else if (taskData.formatting.includes("выравнивание по ширине")) {
    paragraphStyle += "text-align: justify; ";
  }

  // Build ruler marks - используем абсолютное позиционирование для точного соответствия
  let rulerMarksHtml = "";
  for (let i = 0; i <= 15; i++) {
    const positionPct = (i / 15) * 100;
    const isMajor = i % 5 === 0;
    rulerMarksHtml += `<div style="position: absolute; left: ${positionPct}%; bottom: 0; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; font-size: 10px; color: #6b7280;"><div style="width: 1px; height: ${isMajor ? 12 : 8}px; background: ${isMajor ? "#4b5563" : "#9ca3af"};"></div>${isMajor ? `<span style="margin-top: 2px;">${i}</span>` : ""}</div>`;
  }

  // Build markers HTML - позиция в процентах
  let rulerMarkers = "";

  if (taskData.formatting.includes("отступ первой строки")) {
    // Маркер отступа первой строки: отступ слева + отступ первой строки
    const markerPos = leftIndentPct + firstLineIndentPct;
    rulerMarkers += `<div style="position: absolute; top: 0; left: ${markerPos}%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #3b82f6;"></div>`;
  }
  if (taskData.formatting.includes("выступ первой строки")) {
    // Маркер выступа: позиция = отступ слева + выступ (но выступ влево, поэтому позиция маркера на позиции выступа)
    const markerPos = leftIndentPct + hangingIndentPct;
    rulerMarkers += `<div style="position: absolute; top: 0; left: ${markerPos}%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #ef4444;"></div>`;
  }
  if (taskData.formatting.includes("отступ слева")) {
    rulerMarkers += `<div style="position: absolute; bottom: 0; left: ${leftIndentPct}%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 10px solid #4b5563;"></div>`;
  }
  if (taskData.formatting.includes("отступ справа")) {
    // Маркер справа: позиция = 100% - отступ справа
    const markerPos = 100 - rightIndentPct;
    rulerMarkers += `<div style="position: absolute; bottom: 0; left: ${markerPos}%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 10px solid #4b5563;"></div>`;
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
        <p style="${paragraphStyle}">${taskData.text}</p>
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

  // Find the numbers of correct formatting options
  const answerNumbers = taskData.formatting
    .map((f) => allFormattingOptions.indexOf(f) + 1)
    .sort((a, b) => a - b)
    .join("");

  return { text: taskText, answer: answerNumbers };
}

// Export functions for use in generator
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
