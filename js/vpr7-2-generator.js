/**
 * VPR 7 - Task 2: Path Navigation Generator Module
 * Generates interactive tasks for determining file/folder paths
 */

(function () {
  // Fallback data when file loading fails
  const FALLBACK_DATA = `# Имена папок (кириллица)
Документы
Загрузки
Избранное
Видео
Музыка
Фото
Работа
Учёба

# Имена папок (латиница)
Documents
Downloads
Videos
Music
Photos
Work
Study
Projects

# Имена файлов (кириллица)
задача.txt
отчёт.docx
документ.pdf

# Имена файлов (латиница)
readme.txt
index.html
lesson.htm`;

  /**
   * Parse text data into folders and files arrays
   * @param {string} text - Raw text data with # section markers
   * @returns {Object} - Object with foldersCyrillic, foldersLatin, filesCyrillic, filesLatin arrays
   */
  function parseData(text) {
    const data = {
      foldersCyrillic: [],
      foldersLatin: [],
      filesCyrillic: [],
      filesLatin: [],
    };

    const lines = text.split("\n");
    let currentSection = "";

    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith("# Имена папок (кириллица)")) {
        currentSection = "foldersCyr";
      } else if (line.startsWith("# Имена папок (латиница)")) {
        currentSection = "foldersLat";
      } else if (line.startsWith("# Имена файлов (кириллица)")) {
        currentSection = "filesCyr";
      } else if (line.startsWith("# Имена файлов (латиница)")) {
        currentSection = "filesLat";
      } else if (line && !line.startsWith("#")) {
        if (currentSection === "foldersCyr") data.foldersCyrillic.push(line);
        else if (currentSection === "foldersLat") data.foldersLatin.push(line);
        else if (currentSection === "filesCyr") data.filesCyrillic.push(line);
        else if (currentSection === "filesLat") data.filesLatin.push(line);
      }
    });

    return data;
  }

  /**
   * Load path data from file or use fallback
   * @param {string} filePath - Path to the data file
   * @returns {Promise<Object>} - Promise resolving to data object with folders and files
   */
  async function loadPathData(filePath = "data/vpr7-2.txt") {
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
   * Get correct Russian word form for "уровень" (level)
   * @param {number} n - Number of levels
   * @returns {string} - Correct word form
   */
  function getLevelWord(n) {
    if (n === 1) return "уровень";
    if (n >= 2 && n <= 4) return "уровня";
    return "уровней";
  }

  /**
   * Generate task for navigating up and down the directory tree
   * @param {Array} folders - Array of folder names
   * @returns {Object} - Task data with text, correctPath, pathParts, disk, hints
   */
  function generateNavigateTask(folders) {
    const disk = String.fromCharCode(67 + Math.floor(Math.random() * 3)) + ":";

    // Create initial path (3-5 folders)
    const depth = 3 + Math.floor(Math.random() * 3);
    const pathParts = [];
    const usedFolders = new Set();

    for (let i = 0; i < depth; i++) {
      let folder;
      do {
        folder = folders[Math.floor(Math.random() * folders.length)];
      } while (usedFolders.has(folder));
      usedFolders.add(folder);
      pathParts.push(folder);
    }

    const startPath = disk + "\\" + pathParts.join("\\");

    // Determine navigation actions
    const upLevels = Math.min(Math.floor(Math.random() * 3) + 1, depth);
    const downLevels = Math.floor(Math.random() * 2) + 1;

    // Final path
    let finalPathParts = [...pathParts];

    // Go up
    for (let i = 0; i < upLevels; i++) {
      finalPathParts.pop();
    }

    // Go down - remember folder names for condition
    const newFolders = [];
    for (let i = 0; i < downLevels; i++) {
      let folder;
      do {
        folder = folders[Math.floor(Math.random() * folders.length)];
      } while (usedFolders.has(folder));
      usedFolders.add(folder);
      newFolders.push(folder);
      finalPathParts.push(folder);
    }

    const finalPath = disk + "\\" + finalPathParts.join("\\");

    // Build task text - explicitly specify folders to descend into
    let taskText = `Пользователь работал с каталогом <span class="highlight">${startPath}</span>. `;
    taskText += `Он поднялся на ${upLevels} ${getLevelWord(upLevels)} вверх`;

    // Explicitly specify each folder user descended into
    if (downLevels === 1) {
      taskText += `, затем спустился в папку <span class="highlight">${newFolders[0]}</span>. `;
    } else {
      taskText += `, затем спустился в папку <span class="highlight">${newFolders[0]}</span>`;
      for (let i = 1; i < downLevels; i++) {
        taskText += `, а затем в папку <span class="highlight">${newFolders[i]}</span>`;
      }
      taskText += `. `;
    }

    taskText += `Запишите полный путь к папке, в которой оказался пользователь.`;

    return {
      text: taskText,
      correctPath: finalPath,
      pathParts: finalPathParts,
      disk: disk,
      hint: `Начальный путь: ${startPath}. После подъёма на ${upLevels} уровня(ей) вверх и спуска в папки получается путь: ${finalPath}`,
      informativeHint: `Путь начинается с диска ${disk}. При подъёме на ${upLevels} ${getLevelWord(upLevels)} вверх из начального каталога удаляются последние ${upLevels} папки(-ок). Затем нужно добавить новые папки: ${newFolders.join(" → ")}. Не забудьте разделители "\\" между элементами пути.`,
    };
  }

  /**
   * Generate task for creating folders and moving a file
   * @param {Array} folders - Array of folder names
   * @param {Array} files - Array of file names
   * @returns {Object} - Task data with text, correctPath, pathParts, disk, hints
   */
  function generateCreateMoveTask(folders, files) {
    const disk = String.fromCharCode(67 + Math.floor(Math.random() * 3)) + ":";

    // Create initial path to file (2-3 folders + file)
    const depth = 2 + Math.floor(Math.random() * 2);
    const pathParts = [];
    const usedFolders = new Set();

    for (let i = 0; i < depth; i++) {
      let folder;
      do {
        folder = folders[Math.floor(Math.random() * folders.length)];
      } while (usedFolders.has(folder));
      usedFolders.add(folder);
      pathParts.push(folder);
    }

    const file = files[Math.floor(Math.random() * files.length)];
    const startPath = disk + "\\" + pathParts.join("\\") + "\\" + file;

    // Go up one level
    const upPathParts = [...pathParts];
    upPathParts.pop();

    // Create new folders
    let newFolder1, newFolder2;
    do {
      newFolder1 = folders[Math.floor(Math.random() * folders.length)];
    } while (usedFolders.has(newFolder1));
    usedFolders.add(newFolder1);

    do {
      newFolder2 = folders[Math.floor(Math.random() * folders.length)];
    } while (usedFolders.has(newFolder2));
    usedFolders.add(newFolder2);

    const finalPathParts = [...upPathParts, newFolder1, newFolder2];
    const finalPath = disk + "\\" + finalPathParts.join("\\") + "\\" + file;

    // Build task text
    let taskText = `Пользователь работал с файлом <span class="highlight">${startPath}</span>. `;
    taskText += `Затем он поднялся на один уровень вверх, создал там каталог <span class="highlight">${newFolder1}</span>, `;
    taskText += `в нём создал ещё один каталог <span class="highlight">${newFolder2}</span> и переместил в него файл <span class="highlight">${file}</span>. `;
    taskText += `Каким стало полное имя этого файла после перемещения?`;

    return {
      text: taskText,
      correctPath: finalPath,
      pathParts: [...finalPathParts, file],
      disk: disk,
      isFile: true,
      hint: `Файл перемещён в новую папку: ${finalPath}`,
      informativeHint: `Полное имя файла включает диск ${disk}, путь к папке и имя файла. После подъёма на один уровень вверх из начального пути удаляется последняя папка. Затем добавляются новые папки "${newFolder1}" и "${newFolder2}", и в конце — имя файла "${file}".`,
    };
  }

  /**
   * Generate simple navigation task
   * @param {Array} folders - Array of folder names
   * @returns {Object} - Task data with text, correctPath, pathParts, disk, hints
   */
  function generateSimpleNavigateTask(folders) {
    const disk = String.fromCharCode(67 + Math.floor(Math.random() * 3)) + ":";

    // Create initial path (3-4 folders)
    const depth = 3 + Math.floor(Math.random() * 2);
    const pathParts = [];
    const usedFolders = new Set();

    for (let i = 0; i < depth; i++) {
      let folder;
      do {
        folder = folders[Math.floor(Math.random() * folders.length)];
      } while (usedFolders.has(folder));
      usedFolders.add(folder);
      pathParts.push(folder);
    }

    const startPath = disk + "\\" + pathParts.join("\\");

    // Navigation sequence
    const actions = [];
    let currentParts = [...pathParts];

    // Add several actions
    const numActions = 2 + Math.floor(Math.random() * 2);

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
          folder = folders[Math.floor(Math.random() * folders.length)];
        } while (usedFolders.has(folder));
        usedFolders.add(folder);
        actions.push({
          type: "down",
          folder: folder,
          text: `спустился в каталог <span class="highlight">${folder}</span>`,
        });
        currentParts.push(folder);
      }
    }

    const finalPath = disk + "\\" + currentParts.join("\\");

    // Build task text
    let taskText = `Пользователь работал с каталогом <span class="highlight">${startPath}</span>. `;
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

    // Build informative hint
    let informativeHint = `Начальный путь: ${startPath}. `;
    let tempParts = [...pathParts];

    actions.forEach((action, index) => {
      if (action.type === "up") {
        const removedFolder = tempParts.pop();
        informativeHint += `При подъёме вверх удаляется папка "${removedFolder}". `;
      } else {
        tempParts.push(action.folder);
        informativeHint += `При спуске добавляется папка "${action.folder}". `;
      }
    });

    informativeHint += `Путь начинается с диска ${disk}, затем разделитель "\\", и папки через разделители.`;

    return {
      text: taskText,
      correctPath: finalPath,
      pathParts: currentParts,
      disk: disk,
      hint: `После всех навигаций путь: ${finalPath}`,
      informativeHint: informativeHint,
    };
  }

  /**
   * Generate a random path task
   * @param {Object} data - Data object with foldersCyrillic, foldersLatin, filesCyrillic, filesLatin
   * @returns {Object} - Task data
   */
  function generatePathTask(data) {
    // Select task type
    const taskTypes = [
      "navigateUpDown",
      "navigateUpDown",
      "createAndMove",
      "simpleNavigate",
    ];
    const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];

    // Choose Cyrillic or Latin
    const useCyrillic = Math.random() > 0.5;
    const folders = useCyrillic ? data.foldersCyrillic : data.foldersLatin;
    const files = useCyrillic ? data.filesCyrillic : data.filesLatin;

    if (taskType === "navigateUpDown") {
      return generateNavigateTask(folders);
    } else if (taskType === "createAndMove") {
      return generateCreateMoveTask(folders, files);
    } else {
      return generateSimpleNavigateTask(folders);
    }
  }

  /**
   * Generate similar but incorrect folder name (different first letter case)
   * @param {string} folder - Original folder name
   * @returns {string|null} - Similar folder name or null if cannot generate
   */
  function generateSimilarFolder(folder) {
    if (folder && folder.length > 0) {
      const firstChar = folder[0];
      let newFirstChar;

      if (firstChar === firstChar.toUpperCase()) {
        newFirstChar = firstChar.toLowerCase();
      } else {
        newFirstChar = firstChar.toUpperCase();
      }

      const variation = newFirstChar + folder.substring(1);
      if (variation !== folder) {
        return variation;
      }
    }
    return null;
  }

  /**
   * Generate similar but incorrect file name (different first letter case)
   * @param {string} file - Original file name
   * @returns {string|null} - Similar file name or null if cannot generate
   */
  function generateSimilarFile(file) {
    if (file && file.length > 0) {
      const firstChar = file[0];
      let newFirstChar;

      if (firstChar === firstChar.toUpperCase()) {
        newFirstChar = firstChar.toLowerCase();
      } else {
        newFirstChar = firstChar.toUpperCase();
      }

      const variation = newFirstChar + file.substring(1);
      if (variation !== file) {
        return variation;
      }
    }
    return null;
  }

  /**
   * Generate path parts for drag-and-drop interface
   * @param {Object} task - Task object from generatePathTask
   * @param {Object} data - Data object with folders and files
   * @returns {Array} - Array of path part objects {text, type}
   */
  function generatePathParts(task, data) {
    const parts = [];
    const usedTexts = new Set();

    // Correct disk
    parts.push({ text: task.disk, type: "disk" });
    usedTexts.add(task.disk);

    // Add 1-2 wrong disks
    const allDisks = ["C:", "D:", "E:"];
    const wrongDisks = allDisks.filter((d) => d !== task.disk);
    const numWrongDisks = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numWrongDisks && i < wrongDisks.length; i++) {
      parts.push({ text: wrongDisks[i], type: "disk" });
      usedTexts.add(wrongDisks[i]);
    }

    // Correct folders and files
    task.pathParts.forEach((part, index) => {
      parts.push({ text: "\\", type: "separator" });
      const isFile = task.isFile && index === task.pathParts.length - 1;
      parts.push({
        text: part,
        type: isFile ? "file" : "folder",
      });
      usedTexts.add(part);
    });

    // Add similar but incorrect folders and files
    const wrongParts = [];
    task.pathParts.forEach((part, index) => {
      const isFile = task.isFile && index === task.pathParts.length - 1;

      if (isFile) {
        const similarFile = generateSimilarFile(part);
        if (similarFile && !usedTexts.has(similarFile)) {
          wrongParts.push({ text: similarFile, type: "file" });
          usedTexts.add(similarFile);
        }
      } else {
        const similarFolder = generateSimilarFolder(part);
        if (similarFolder && !usedTexts.has(similarFolder)) {
          wrongParts.push({ text: similarFolder, type: "folder" });
          usedTexts.add(similarFolder);
        }
      }
    });

    // Determine if Cyrillic or Latin
    const useCyrillic = /[а-яё]/i.test(task.pathParts[0]);
    const folders = useCyrillic ? data.foldersCyrillic : data.foldersLatin;
    const files = useCyrillic ? data.filesCyrillic : data.filesLatin;

    // Add wrong folders not in correct path
    const wrongFolders = folders.filter((f) => !usedTexts.has(f));
    const numWrongFolders = Math.min(
      1 + Math.floor(Math.random() * 2),
      wrongFolders.length,
    );
    for (let i = 0; i < numWrongFolders; i++) {
      const idx = Math.floor(Math.random() * wrongFolders.length);
      if (!usedTexts.has(wrongFolders[idx])) {
        wrongParts.push({ text: wrongFolders[idx], type: "folder" });
        usedTexts.add(wrongFolders[idx]);
      }
    }

    // Add wrong files if task involves a file
    if (task.isFile) {
      const wrongFiles = files.filter((f) => !usedTexts.has(f));
      const numWrongFiles = Math.min(1, wrongFiles.length);
      for (let i = 0; i < numWrongFiles; i++) {
        const idx = Math.floor(Math.random() * wrongFiles.length);
        if (!usedTexts.has(wrongFiles[idx])) {
          wrongParts.push({ text: wrongFiles[idx], type: "file" });
          usedTexts.add(wrongFiles[idx]);
        }
      }
    }

    // Add separators for wrong elements
    wrongParts.forEach((part) => {
      parts.push({ text: "\\", type: "separator" });
      parts.push(part);
    });

    // Shuffle all parts
    for (let i = parts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [parts[i], parts[j]] = [parts[j], parts[i]];
    }

    return parts;
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task2_Generator = {
      FALLBACK_DATA,
      parseData,
      loadPathData,
      generatePathTask,
      generateNavigateTask,
      generateCreateMoveTask,
      generateSimpleNavigateTask,
      getLevelWord,
      generateSimilarFolder,
      generateSimilarFile,
      generatePathParts,
    };
  }
})();
