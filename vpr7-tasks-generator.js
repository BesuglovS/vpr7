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
  const processingDevices = [
    "процессор",
    "оперативная память",
    "материнская плата",
    "видеокарта",
  ];

  const categories = [
    { name: "устройства ввода", devices: inputDevices },
    { name: "устройства вывода", devices: outputDevices },
    { name: "устройства хранения", devices: storageDevices },
    { name: "устройства обработки", devices: processingDevices },
  ];

  const category = randomChoice(categories);
  const selectedDevices = shuffleArray(category.devices).slice(0, 3);
  const wrongDevices = shuffleArray(
    [
      ...inputDevices,
      ...outputDevices,
      ...storageDevices,
      ...processingDevices,
    ].filter((d) => !selectedDevices.includes(d)),
  ).slice(0, 2);

  const allDevices = shuffleArray([...selectedDevices, ...wrongDevices]);

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
  ];
  const disk = String.fromCharCode(67 + randomInt(0, 2)) + ":";

  const depth = randomInt(2, 4);
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
  taskText += `Он поднялся на ${upLevels} ${upLevels === 1 ? "уровень" : upLevels < 5 ? "уровня" : "уровней"} вверх`;

  if (downLevels === 1) {
    taskText += `, затем спустился в папку <b>${newFolders[0]}</b>. `;
  } else {
    taskText += `, затем спустился в папку <b>${newFolders[0]}</b>, а затем в папку <b>${newFolders[1]}</b>. `;
  }

  taskText += `Запишите полный путь к папке, в которой оказался пользователь.`;

  return { text: taskText, answer: finalPath };
}

// ============================================
// Task 3: File Types
// ============================================
function generateTask3() {
  const fileTypes = {
    "текстовые документы": ["doc", "docx", "txt", "rtf", "odt"],
    "графические изображения": ["jpg", "png", "gif", "bmp", "svg"],
    аудиофайлы: ["mp3", "wav", "ogg", "flac", "wma"],
    видеофайлы: ["mp4", "avi", "mkv", "mov", "wmv"],
    архивы: ["zip", "rar", "7z", "tar", "gz"],
    программы: ["exe", "com", "bat", "cmd"],
  };

  const typeNames = Object.keys(fileTypes);
  const selectedType = randomChoice(typeNames);
  const extensions = fileTypes[selectedType];

  const wrongExtensions = shuffleArray(
    Object.entries(fileTypes)
      .filter(([type]) => type !== selectedType)
      .flatMap(([_, exts]) => exts),
  ).slice(0, 3);

  const allExtensions = shuffleArray([
    ...extensions.slice(0, 2),
    ...wrongExtensions,
  ]);

  const taskText = `Установите соответствие между расширениями файлов и их типом.<br><br>
    <b>Расширения:</b> ${allExtensions.map((e, i) => `${i + 1}) .${e}`).join("   ")}<br><br>
    <b>Типы файлов:</b><br>
    А) текстовые документы<br>
    Б) графические изображения<br>
    В) аудиофайлы<br>
    Г) видеофайлы<br>
    Д) архивы<br>
    Е) программы`;

  const answerMap = {};
  allExtensions.forEach((ext, i) => {
    for (const [type, exts] of Object.entries(fileTypes)) {
      if (exts.includes(ext)) {
        const typeIndex = typeNames.indexOf(type);
        answerMap[i + 1] = String.fromCharCode(65 + typeIndex); // A, B, C, D, E, F
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
  const domains = ["school", "edu", "gov", "com", "org", "net"];
  const tlds = ["ru", "com", "org", "net", "edu"];
  const paths = ["lessons", "courses", "materials", "tasks", "homework"];
  const files = ["index.html", "lesson.html", "task.html", "page.html"];

  const protocol = randomChoice(protocols);
  const domain = randomChoice(domains);
  const tld = randomChoice(tlds);
  const path = randomChoice(paths);
  const file = randomChoice(files);

  const url = `${protocol}://${domain}.${tld}/${path}/${file}`;

  const taskText = `Дан URL-адрес: <b>${url}</b><br><br>
    Установите соответствие между частями URL-адреса и их назначением.<br><br>
    <b>Части:</b><br>
    1) ${protocol}<br>
    2) ${domain}.${tld}<br>
    3) ${path}<br>
    4) ${file}<br><br>
    <b>Назначения:</b><br>
    А) имя файла<br>
    Б) протокол<br>
    В) путь к файлу<br>
    Г) доменное имя сайта`;

  const answer = "БГВА";

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
  const letters = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ".split("");

  const generateCode = () => {
    const code = {};
    const selectedLetters = shuffleArray(letters).slice(0, 5);
    const codeLengths = [1, 2, 2, 3, 3];
    shuffleArray(codeLengths);

    let codeNum = 0;
    selectedLetters.forEach((letter, i) => {
      const len = codeLengths[i];
      code[letter] = String(codeNum).padStart(len, "0");
      codeNum += randomInt(1, 3);
    });

    return { code, selectedLetters };
  };

  const { code, selectedLetters } = generateCode();
  const message = shuffleArray(selectedLetters).slice(0, 3);
  const encoded = message.map((l) => code[l]).join("");

  const codeTable = Object.entries(code)
    .map(([letter, c]) => `${letter} — ${c}`)
    .join(", ");

  const taskText = `Для кодирования букв используется неравномерный двоичный код. 
    Кодовые слова: ${codeTable}.<br><br>
    Декодируйте сообщение: <b>${encoded}</b>`;

  const answer = message.join("");

  return { text: taskText, answer: answer };
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

  const scenarios = [
    () => {
      const fileSize = randomChoice([256, 512, 768, 1024]);
      const deviceSize = randomChoice([2, 4, 8]);
      const deviceUnit = "GB";

      const deviceMB = deviceSize * 1024;
      const filesCount = Math.floor(deviceMB / fileSize);
      const usedSpace = filesCount * fileSize;
      const remainMB = deviceMB - usedSpace;
      const answer = Math.round(remainMB);

      const taskText = `На флешке объёмом <b>${deviceSize} ${units[deviceUnit].name}</b> записывают видеофайлы размером <b>${fileSize} МБ</b> каждый. 
        Сколько мегабайт свободного места останется после записи максимально возможного количества файлов?`;

      return { text: taskText, answer: answer };
    },
    () => {
      const size1 = randomChoice([1.5, 2, 2.5, 3]);
      const size2 = randomChoice([512, 1024, 1536]);
      const answer = Math.round(size1 * 1024 + size2);

      const taskText = `Игра занимает <b>${size1} ГБ</b>, а её обновление увеличивает объём игры на <b>${size2} МБ</b>. 
        Сколько мегабайт будет весить игра после обновления?`;

      return { text: taskText, answer: answer };
    },
  ];

  return randomChoice(scenarios)();
}

// ============================================
// Task 8: Text Information Volume
// ============================================
function generateTask8() {
  const alphabetSize = randomChoice([16, 32, 64, 128, 256]);
  const bitsPerChar = Math.ceil(Math.log2(alphabetSize));
  const charCount = randomChoice([100, 200, 256, 512, 1000, 1024]);
  const totalBits = charCount * bitsPerChar;
  const totalBytes = Math.ceil(totalBits / 8);

  const taskText = `В кодировке каждый символ кодируется ${bitsPerChar} битами. 
    Определите размер в байтах сообщения из ${charCount} символов в этой кодировке.`;

  return { text: taskText, answer: totalBytes };
}

// ============================================
// Task 9: Information Transmission
// ============================================
function generateTask9() {
  const fileSize = randomChoice([128, 256, 512, 1024, 2048]);
  const speed = randomChoice([64, 128, 256, 512]);
  const timeSeconds = Math.round((fileSize * 1024) / speed);

  const taskText = `Файл размером <b>${fileSize} КБ</b> передаётся через соединение со скоростью <b>${speed} Кбит/с</b>. 
    Определите время передачи файла в секундах.`;

  return { text: taskText, answer: timeSeconds };
}

// ============================================
// Task 10: Information in Sentence
// ============================================
function generateTask10() {
  const sentences = [
    { text: "Информатика — наука об информации", chars: 32 },
    { text: "Компьютер обрабатывает данные", chars: 29 },
    { text: "Программирование — важный навык", chars: 31 },
    { text: "Алгоритм — последовательность действий", chars: 37 },
    { text: "Интернет связывает весь мир", chars: 26 },
  ];

  const sentence = randomChoice(sentences);
  const bitsPerChar = randomChoice([8, 16]);
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

  // Build CSS styles based on formatting
  let paragraphStyle = "white-space: pre-line; line-height: 1.6; ";

  // Text indent (first line or hanging)
  if (taskData.formatting.includes("отступ первой строки")) {
    paragraphStyle += "text-indent: 2em; ";
  } else if (taskData.formatting.includes("выступ первой строки")) {
    paragraphStyle += "text-indent: -2em; margin-left: 2em; ";
  }

  // Left indent
  if (
    taskData.formatting.includes("отступ слева") &&
    !taskData.formatting.includes("выступ первой строки")
  ) {
    paragraphStyle += "margin-left: 2em; ";
  }

  // Right indent
  if (taskData.formatting.includes("отступ справа")) {
    paragraphStyle += "margin-right: 2em; ";
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

  // Build ruler markers HTML
  let rulerMarkers = "";
  const rulerPadding = 50;
  const textWidth = 400; // примерная ширина текста в пикселях
  const pxPerCm = textWidth / 15;

  // Calculate marker positions
  const leftIndentPx = taskData.formatting.includes("отступ слева")
    ? 2 * pxPerCm
    : 0;
  const rightIndentPx = taskData.formatting.includes("отступ справа")
    ? 2 * pxPerCm
    : 0;
  const firstLineIndentPx = taskData.formatting.includes("отступ первой строки")
    ? 1.25 * pxPerCm
    : 0;
  const hangingIndentPx = taskData.formatting.includes("выступ первой строки")
    ? 2 * pxPerCm
    : 0;

  // Add markers
  if (taskData.formatting.includes("отступ первой строки")) {
    rulerMarkers += `<div style="position: absolute; top: 0; left: ${rulerPadding + leftIndentPx + firstLineIndentPx}px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #3b82f6;"></div>`;
  }
  if (taskData.formatting.includes("выступ первой строки")) {
    rulerMarkers += `<div style="position: absolute; top: 0; left: ${rulerPadding + hangingIndentPx}px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #ef4444;"></div>`;
  }
  if (taskData.formatting.includes("отступ слева")) {
    rulerMarkers += `<div style="position: absolute; top: 20px; left: ${rulerPadding + leftIndentPx}px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 10px solid #4b5563;"></div>`;
  }
  if (taskData.formatting.includes("отступ справа")) {
    rulerMarkers += `<div style="position: absolute; top: 20px; right: ${rulerPadding + rightIndentPx}px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 10px solid #4b5563;"></div>`;
  }

  // Build ruler marks
  let rulerMarksHtml = "";
  for (let i = 0; i <= 15; i++) {
    rulerMarksHtml += `<div style="display: flex; flex-direction: column; align-items: center; font-size: 10px; color: #6b7280;"><div style="width: 1px; height: ${i % 5 === 0 ? 12 : 8}px; background: ${i % 5 === 0 ? "#4b5563" : "#9ca3af"};"></div><span>${i}</span></div>`;
  }

  const taskText = `В текстовом редакторе имеется следующий абзац:<br><br>
    <div style="border: 2px solid #d1d5db; border-radius: 8px; overflow: hidden; background: white;">
      <div style="background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%); padding: 8px 15px; border-bottom: 1px solid #d1d5db; display: flex; gap: 15px;">
        <span style="padding: 4px 8px; background: white; border: 1px solid #d1d5db; border-radius: 4px; font-size: 12px;">Файл</span>
        <span style="padding: 4px 8px; background: white; border: 1px solid #d1d5db; border-radius: 4px; font-size: 12px;">Главная</span>
        <span style="padding: 4px 8px; background: #dbeafe; border: 1px solid #3b82f6; border-radius: 4px; font-size: 12px; color: #1d4ed8;">Вид</span>
      </div>
      <div style="background: #f9fafb; height: 30px; border-bottom: 1px solid #d1d5db; position: relative;">
        <div style="position: absolute; top: 0; left: ${rulerPadding}px; right: ${rulerPadding}px; height: 100%; display: flex; justify-content: space-between;">
          ${rulerMarksHtml}
        </div>
        ${rulerMarkers}
      </div>
      <div style="padding: 20px ${rulerPadding}px 30px ${rulerPadding}px; min-height: 150px; background: white;">
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
