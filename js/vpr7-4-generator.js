/**
 * VPR 7 - Task 4: URL Construction Generator Module
 * Generates interactive tasks for constructing URL addresses
 */

(function () {
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
        else if (currentSection === "domainsCyr")
          data.domainsCyrillic.push(line);
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
   */
  function generateDeepPathTask(domains, paths, files, protocols) {
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];

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
   */
  function generateTask(data) {
    const useCyrillic = Math.random() > 0.7;
    const domains = useCyrillic ? data.domainsCyrillic : data.domainsLatin;
    const paths = useCyrillic ? data.pathsCyrillic : data.pathsLatin;
    const files = useCyrillic ? data.filesCyrillic : data.filesLatin;

    const taskTypeList = ["simple", "withPath", "withDeepPath", "withPath"];
    const taskType =
      taskTypeList[Math.floor(Math.random() * taskTypeList.length)];

    if (taskType === "simple") {
      return generateSimpleTask(domains, files, data.protocols);
    } else if (taskType === "withPath") {
      return generateWithPathTask(domains, paths, files, data.protocols);
    } else {
      return generateDeepPathTask(domains, paths, files, data.protocols);
    }
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate URL parts for the interactive task
   */
  function generateUrlParts(task, data) {
    const parts = [];

    // Protocol part
    parts.push({
      text: task.protocol + "://",
      type: "protocol",
    });

    // Domain part
    parts.push({
      text: task.domain + "/",
      type: "domain",
    });

    // Path parts
    task.pathParts.forEach((path) => {
      parts.push({
        text: path + "/",
        type: "path",
      });
    });

    // File part
    parts.push({
      text: task.file,
      type: "file",
    });

    // Add some decoy parts
    const useCyrillic = task.domain && /[а-яё]/i.test(task.domain);
    const decoyProtocols = data.protocols.filter((p) => p !== task.protocol);
    const decoyDomains = useCyrillic
      ? data.domainsCyrillic.filter((d) => d !== task.domain)
      : data.domainsLatin.filter((d) => d !== task.domain);
    const decoyPaths = useCyrillic
      ? data.pathsCyrillic.filter((p) => !task.pathParts.includes(p))
      : data.pathsLatin.filter((p) => !task.pathParts.includes(p));
    const decoyFiles = useCyrillic
      ? data.filesCyrillic.filter((f) => f !== task.file)
      : data.filesLatin.filter((f) => f !== task.file);

    // Add 1-2 decoy protocols
    const shuffledDecoyProtocols = shuffleArray(decoyProtocols);
    for (let i = 0; i < Math.min(2, shuffledDecoyProtocols.length); i++) {
      parts.push({
        text: shuffledDecoyProtocols[i] + "://",
        type: "protocol decoy",
      });
    }

    // Add 1-2 decoy domains
    const shuffledDecoyDomains = shuffleArray(decoyDomains);
    for (let i = 0; i < Math.min(2, shuffledDecoyDomains.length); i++) {
      parts.push({
        text: shuffledDecoyDomains[i] + "/",
        type: "domain decoy",
      });
    }

    // Add 1-2 decoy paths
    const shuffledDecoyPaths = shuffleArray(decoyPaths);
    for (let i = 0; i < Math.min(2, shuffledDecoyPaths.length); i++) {
      parts.push({
        text: shuffledDecoyPaths[i] + "/",
        type: "path decoy",
      });
    }

    // Add 1-2 decoy files
    const shuffledDecoyFiles = shuffleArray(decoyFiles);
    for (let i = 0; i < Math.min(2, shuffledDecoyFiles.length); i++) {
      parts.push({
        text: shuffledDecoyFiles[i],
        type: "file decoy",
      });
    }

    return parts;
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
      shuffleArray,
      generateUrlParts,
    };
  }
})();
