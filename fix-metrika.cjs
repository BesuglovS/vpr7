const fs = require('fs');
const path = require('path');

// Исходный путь
const basePath = path.resolve(__dirname, '..');

// Конфигурация исправлений
const fixes = {
  // Исправить дубликаты метрики Yandex
  'Yandex.Metrika counter duplicates': {
    search: /<!-- Yandex\.Metrika counter -->\s*<noscript[^>]*>\s*<div[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/div>\s*<\/noscript>[\s\S]*?<!-- \/Yandex\.Metrika counter -->\s*<!-- Yandex\.Metrika counter -->/gi,
    replace: '<!-- Yandex.Metrika counter -->\n    <noscript>\n      <div>\n        <img\n          src="https://mc.yandex.ru/watch/107146125"\n          style="position: absolute; left: -9999px"\n          alt=""\n        /></div\n    ></noscript>\n    <!-- /Yandex.Metrika counter -->',
  },

  // Исправить неправильные ссылки на скрипты vpr7-exam-utils в VPR8
  'VPR8 uses vpr7-exam-utils': {
    search: /<script src="\.\.\/js\/vpr7-exam-utils\.js"[^>]*>\s*<\/script>/g,
    replace: '', // Удаляем неправильный скрипт - он загружается из vpr7-exam-utils.js в корневом js
  },

  // Исправить задержку загрузки скрипта
  'Add defer to scripts': {
    search: /<script src=["']([^"']+)js\/vpr8-[-\d]+\.js["'][^>]*>\s*<\/script>/g,
    replace: (match, src) => `<script src="${src}" defer></script>`,
  },
};

// Находим все HTML файлы в VPR8
function findHtmlFiles(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results.push(...findHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

// Проверяем и исправляем файлы
console.log('Проверка и исправление ошибок в файлах VPR8...\n');

let totalFiles = 0;
let totalFixed = 0;

for (const filePath of findHtmlFiles(path.join(basePath, 'VPR8'))) {
  totalFiles++;
  let content;
  
  try {
    content = fs.readFileSync(filePath, 'utf8');
    
    let wasFixed = false;
    
    for (const [name, fix] of Object.entries(fixes)) {
      let newContent = content;
      
      if (fix.search) {
        if (typeof fix.search === 'function') {
          const regex = fix.search.bind(content);
          newContent = content.replace(regex, fix.replace.bind(content, match, src));
        } else {
          newContent = content.replace(fix.search, fix.replace);
        }
      } else {
        newContent = content;
      }
      
      if (newContent !== content) {
        // Сохраняем исправленный файл
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Исправлено: ${path.relative(basePath, filePath)} (${name})`);
        totalFixed++;
        wasFixed = true;
        break; // Один файл - одно исправление
      }
    }
    
  } catch (err) {
    console.error(`Ошибка при чтении ${filePath}:`, err.message);
  }
}

console.log(`\nПроверено файлов: ${totalFiles}`);
console.log(`Исправлено файлов: ${totalFixed}`);

if (totalFixed === 0) {
  console.log('\nНет ошибок для исправления.');
}