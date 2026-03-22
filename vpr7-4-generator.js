/**
 * VPR 7 - Task 4: URL Construction Generator Module
 * Generates interactive tasks for constructing URL addresses
 */

// Fallback data when file loading fails
const FALLBACK_DATA = `# Протоколы
http
https
ftp
ftps

# Домены (кириллица)
тест.рф
пример.рф
файлы.рф
документы.рф
образцы.рф
школа.рф
учеба.рф
работа.рф
новости.рф
почта.рф

# Домены (латиница)
test.org
example.com
school.edu
docs.info
files.net
data.ru
info.su
archive.org
download.com
site.ru
server.org
myhost.com
web.edu
portal.ru
cloud.net
storage.com
library.edu
media.org
content.net
resource.su

# Пути (кириллица)
документы
файлы
загрузки
архив
отчёты
материалы
папка
папка1
папка2
папкаA
папкаB
новая-папка

# Пути (латиница)
docs
files
download
uploads
archive
reports
materials
folder
folder1
folder2
folderA
folderB
new-folder
public
private
shared
images
documents
data
content

# Имена файлов (кириллица)
отчёт.docx
документ.pdf
задание.txt
презентация.pptx
таблица.xlsx
справка.doc
инструкция.pdf

# Имена файлов (латиница)
info.docx
document.pdf
readme.txt
presentation.pptx
table.xlsx
help.doc
guide.pdf
data.xml
config.json
index.html
style.css
script.js
image.png
photo.jpg
video.mp4
audio.mp3
archive.zip
file.txt
report.docx
notes.txt`;

/**
 * Parse text data into data object
 * @param {string} text - Raw text data with # section markers
 * @returns {Object} - Object with protocols, domainsCyrillic, domainsLatin, pathsCyrillic, pathsLatin, filesCyrillic, filesLatin arrays
 */
function parseData(text) {
  const data = {
    protocols: [],
    domainsCyrillic: [],
    domainsLatin: [],
    pathsCyrillic: [],
    pathsLatin: [],
    filesCyrillic: [],
    filesLatin: [],
  };

  const lines = text.split("\n");
  let currentSection = "";

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("# Протоколы")) {
      currentSection = "protocols";
    } else if (line.startsWith("# Домены (кириллица)")) {
      currentSection = "domainsCyr";
    } else if (line.startsWith("# Домены (латиница)")) {
      currentSection = "domainsLat";
    } else if (line.startsWith("# Пути (кириллица)")) {
      currentSection = "pathsCyr";
    } else if (line.startsWith("# Пути (латиница)")) {
      currentSection = "pathsLat";
    } else if (line.startsWith("# Имена файлов (кириллица)")) {
      currentSection = "filesCyr";
    } else if (line.startsWith("# Имена файлов (латиница)")) {
      currentSection = "filesLat";
    } else if (line && !line.startsWith("#")) {
      if (currentSection === "protocols") data.protocols.push(line);
      else if (currentSection === "domainsCyr") data.domainsCyrillic.push(line);
      else if (currentSection === "domainsLat") data.domainsLatin.push(line);
      else if (currentSection === "pathsCyr") data.pathsCyrillic.push(line);
      else if (currentSection === "pathsLat") data.pathsLatin.push(line);
      else if (currentSection === "filesCyr") data.filesCyrillic.push(line);
      else if (currentSection === "filesLat") data.filesLatin.push(line);
    }
  });

  return data;
}

/**
 * Load URL data from file or use fallback
 * @param {string} filePath - Path to the data file
 * @returns {Promise<Object>} - Promise resolving to data object
 */
async function loadData(filePath = "vpr7-4.txt") {
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
 * Generate a simple task (only domain and file)
 * @param {Array} domains - Array of domain names
 * @param {Array} files - Array of file names
 * @param {Array} protocols - Array of protocol names
 * @returns {Object} - Task object with text, correctUrl, and components
 */
function generateSimpleTask(domains, files, protocols) {
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const file = files[Math.floor(Math.random() * files.length)];

  const correctUrl = `${protocol}://${domain}/${file}`;

  const taskText = `Доступ к файлу <span class="highlight">${file}</span>, находящемуся на сервере <span class="highlight">${domain}</span>, осуществляется по протоколу <span class="highlight">${protocol}</span>. Запишите полный URL-адрес файла.`;

  return {
    text: taskText,
    correctUrl: correctUrl,
    protocol: protocol,
    domain: domain,
    pathParts: [],
    file: file,
    hint: `URL-адрес состоит из: протокол://домен/имя_файла`,
  };
}

/**
 * Generate a task with one path directory
 * @param {Array} domains - Array of domain names
 * @param {Array} paths - Array of path names
 * @param {Array} files - Array of file names
 * @param {Array} protocols - Array of protocol names
 * @returns {Object} - Task object with text, correctUrl, and components
 */
function generateWithPathTask(domains, paths, files, protocols) {
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const path = paths[Math.floor(Math.random() * paths.length)];
  const file = files[Math.floor(Math.random() * files.length)];

  const correctUrl = `${protocol}://${domain}/${path}/${file}`;

  const taskText = `Доступ к файлу <span class="highlight">${file}</span>, находящемуся на сервере <span class="highlight">${domain}</span> в каталоге <span class="highlight">${path}</span>, осуществляется по протоколу <span class="highlight">${protocol}</span>. Запишите полный URL-адрес файла.`;

  return {
    text: taskText,
    correctUrl: correctUrl,
    protocol: protocol,
    domain: domain,
    pathParts: [path],
    file: file,
    hint: `URL-адрес состоит из: протокол://домен/путь/имя_файла`,
  };
}

/**
 * Generate a task with deep path (two directories)
 * @param {Array} domains - Array of domain names
 * @param {Array} paths - Array of path names
 * @param {Array} files - Array of file names
 * @param {Array} protocols - Array of protocol names
 * @returns {Object} - Task object with text, correctUrl, and components
 */
function generateDeepPathTask(domains, paths, files, protocols) {
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];

  // Select two different paths
  const usedPaths = new Set();
  const path1 = paths[Math.floor(Math.random() * paths.length)];
  usedPaths.add(path1);

  let path2;
  do {
    path2 = paths[Math.floor(Math.random() * paths.length)];
  } while (usedPaths.has(path2));

  const file = files[Math.floor(Math.random() * files.length)];

  const correctUrl = `${protocol}://${domain}/${path1}/${path2}/${file}`;

  const taskText = `Доступ к файлу <span class="highlight">${file}</span>, находящемуся на сервере <span class="highlight">${domain}</span> в каталоге <span class="highlight">${path2}</span> внутри каталога <span class="highlight">${path1}</span>, осуществляется по протоколу <span class="highlight">${protocol}</span>. Запишите полный URL-адрес файла.`;

  return {
    text: taskText,
    correctUrl: correctUrl,
    protocol: protocol,
    domain: domain,
    pathParts: [path1, path2],
    file: file,
    hint: `URL-адрес состоит из: протокол://домен/путь1/путь2/имя_файла`,
  };
}

/**
 * Generate a random task based on data
 * @param {Object} data - Data object with protocols, domains, paths, files arrays
 * @returns {Object} - Task object
 */
function generateTask(data) {
  // Choose between Cyrillic or Latin (Latin more often)
  const useCyrillic = Math.random() > 0.7;
  const domains = useCyrillic ? data.domainsCyrillic : data.domainsLatin;
  const paths = useCyrillic ? data.pathsCyrillic : data.pathsLatin;
  const files = useCyrillic ? data.filesCyrillic : data.filesLatin;

  // Select task type
  const taskTypes = ["simple", "withPath", "withDeepPath", "withPath"];
  const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];

  if (taskType === "simple") {
    return generateSimpleTask(domains, files, data.protocols);
  } else if (taskType === "withPath") {
    return generateWithPathTask(domains, paths, files, data.protocols);
  } else {
    return generateDeepPathTask(domains, paths, files, data.protocols);
  }
}

/**
 * Generate a similar domain by changing case
 * @param {string} domain - Original domain
 * @returns {string|null} - Similar domain or null if cannot generate
 */
function generateSimilarDomain(domain) {
  if (domain && domain.length > 0) {
    const parts = domain.split(".");
    if (parts.length > 0) {
      const firstPart = parts[0];
      const newFirstChar =
        firstPart[0] === firstPart[0].toUpperCase()
          ? firstPart[0].toLowerCase()
          : firstPart[0].toUpperCase();
      parts[0] = newFirstChar + firstPart.substring(1);
      return parts.join(".");
    }
  }
  return null;
}

/**
 * Generate a similar path by changing case
 * @param {string} path - Original path
 * @returns {string|null} - Similar path or null if cannot generate
 */
function generateSimilarPath(path) {
  if (path && path.length > 0) {
    const firstChar = path[0];
    const newFirstChar =
      firstChar === firstChar.toUpperCase()
        ? firstChar.toLowerCase()
        : firstChar.toUpperCase();
    return newFirstChar + path.substring(1);
  }
  return null;
}

/**
 * Generate a similar file by changing case
 * @param {string} file - Original file
 * @returns {string|null} - Similar file or null if cannot generate
 */
function generateSimilarFile(file) {
  if (file && file.length > 0) {
    const firstChar = file[0];
    const newFirstChar =
      firstChar === firstChar.toUpperCase()
        ? firstChar.toLowerCase()
        : firstChar.toUpperCase();
    return newFirstChar + file.substring(1);
  }
  return null;
}

/**
 * Generate URL parts for the task
 * @param {Object} task - Task object from generateTask
 * @param {Object} data - Data object with all available options
 * @returns {Array} - Array of part objects {text, type}
 */
function generateUrlParts(task, data) {
  const parts = [];
  const usedTexts = new Set();

  // Determine if task uses Cyrillic
  const useCyrillic = /[а-яё]/i.test(task.domain);
  const allDomains = useCyrillic ? data.domainsCyrillic : data.domainsLatin;
  const allPaths = useCyrillic ? data.pathsCyrillic : data.pathsLatin;
  const allFiles = useCyrillic ? data.filesCyrillic : data.filesLatin;

  // Correct protocol
  const protocolWithSuffix = task.protocol + "://";
  parts.push({ text: protocolWithSuffix, type: "protocol" });
  usedTexts.add(protocolWithSuffix);

  // Add 1-2 wrong protocols
  const wrongProtocols = data.protocols.filter((p) => p !== task.protocol);
  const numWrongProtocols = Math.min(
    1 + Math.floor(Math.random() * 2),
    wrongProtocols.length,
  );
  for (let i = 0; i < numWrongProtocols; i++) {
    const idx = Math.floor(Math.random() * wrongProtocols.length);
    const wrongProtocol = wrongProtocols[idx] + "://";
    if (!usedTexts.has(wrongProtocol)) {
      parts.push({ text: wrongProtocol, type: "protocol" });
      usedTexts.add(wrongProtocol);
    }
  }

  // Correct domain
  parts.push({ text: task.domain, type: "domain" });
  usedTexts.add(task.domain);

  // Add similar domain
  const similarDomain = generateSimilarDomain(task.domain);
  if (similarDomain && !usedTexts.has(similarDomain)) {
    parts.push({ text: similarDomain, type: "domain" });
    usedTexts.add(similarDomain);
  }

  // Add 1-2 wrong domains
  const wrongDomains = allDomains.filter((d) => !usedTexts.has(d));
  const numWrongDomains = Math.min(1, wrongDomains.length);
  for (let i = 0; i < numWrongDomains; i++) {
    const idx = Math.floor(Math.random() * wrongDomains.length);
    if (!usedTexts.has(wrongDomains[idx])) {
      parts.push({ text: wrongDomains[idx], type: "domain" });
      usedTexts.add(wrongDomains[idx]);
    }
  }

  // Correct paths
  task.pathParts.forEach((pathPart) => {
    parts.push({ text: "/", type: "separator" });
    parts.push({ text: pathPart, type: "path-segment" });
    usedTexts.add(pathPart);

    // Add similar path
    const similarPath = generateSimilarPath(pathPart);
    if (similarPath && !usedTexts.has(similarPath)) {
      parts.push({ text: similarPath, type: "path-segment" });
      usedTexts.add(similarPath);
    }
  });

  // Correct file
  parts.push({ text: "/", type: "separator" });
  parts.push({ text: task.file, type: "file" });
  usedTexts.add(task.file);

  // Add similar file
  const similarFile = generateSimilarFile(task.file);
  if (similarFile && !usedTexts.has(similarFile)) {
    parts.push({ text: similarFile, type: "file" });
    usedTexts.add(similarFile);
  }

  // Add wrong paths
  const wrongPaths = allPaths.filter((p) => !usedTexts.has(p));
  const numWrongPaths = Math.min(1 + task.pathParts.length, wrongPaths.length);
  for (let i = 0; i < numWrongPaths; i++) {
    const idx = Math.floor(Math.random() * wrongPaths.length);
    if (!usedTexts.has(wrongPaths[idx])) {
      parts.push({ text: "/", type: "separator" });
      parts.push({ text: wrongPaths[idx], type: "path-segment" });
      usedTexts.add(wrongPaths[idx]);
    }
  }

  // Add wrong files
  const wrongFiles = allFiles.filter((f) => !usedTexts.has(f));
  const numWrongFiles = Math.min(1, wrongFiles.length);
  for (let i = 0; i < numWrongFiles; i++) {
    const idx = Math.floor(Math.random() * wrongFiles.length);
    if (!usedTexts.has(wrongFiles[idx])) {
      parts.push({ text: wrongFiles[idx], type: "file" });
      usedTexts.add(wrongFiles[idx]);
    }
  }

  return parts;
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
 * Check if the assembled URL is correct
 * @param {string} assembledUrl - URL assembled by user
 * @param {string} correctUrl - Correct URL
 * @returns {boolean} - True if URLs match (case-insensitive)
 */
function checkAnswer(assembledUrl, correctUrl) {
  return assembledUrl.toLowerCase() === correctUrl.toLowerCase();
}

// Export for use in pages
if (typeof window !== "undefined") {
  window.VPR7_Task4_Generator = {
    FALLBACK_DATA,
    parseData,
    loadData,
    generateSimpleTask,
    generateWithPathTask,
    generateDeepPathTask,
    generateTask,
    generateSimilarDomain,
    generateSimilarPath,
    generateSimilarFile,
    generateUrlParts,
    shuffleArray,
    checkAnswer,
  };
}

// Export for ES6 modules if supported
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    FALLBACK_DATA,
    parseData,
    loadData,
    generateSimpleTask,
    generateWithPathTask,
    generateDeepPathTask,
    generateTask,
    generateSimilarDomain,
    generateSimilarPath,
    generateSimilarFile,
    generateUrlParts,
    shuffleArray,
    checkAnswer,
  };
}
