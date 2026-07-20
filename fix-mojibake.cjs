// Fix mojibake in HTML files: replace broken Russian comment with clean text.
// Run: node fix-mojibake.cjs
const fs = require('fs');
const path = require('path');

const ROOT = 'f:\\WebSites\\na\\vpr7\\vpr7';
const CLEAN_COMMENT = '    <!-- Service Worker для PWA (офлайн-режим) -->';
const SW_TAG = '    <script src="js/vpr7-sw-register.js" defer></script>';

let totalFixed = 0;
let totalSkipped = 0;

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

for (const fname of files) {
  const fpath = path.join(ROOT, fname);
  let content;
  try {
    content = fs.readFileSync(fpath, 'utf8');
  } catch (e) {
    totalSkipped++;
    continue;
  }

  const original = content;

  // Ищем ВСЕ вхождения битого комментария + SW-тега за один проход
  // Используем replace с функцией, без глобального флага на том же regex
  const pattern = /(^    <!-- Service Worker [^\r\n]*?-->\r?\n)(    <script src="js\/vpr7-sw-register\.js"[^\r\n]*>)/gm;

  const newContent = content.replace(pattern, (full, commentPart, scriptPart) => {
    const hasNonAscii = [...commentPart].some(c => c.codePointAt(0) > 127);
    if (hasNonAscii) {
      return CLEAN_COMMENT + '\r\n' + SW_TAG;
    }
    return full;
  });

  if (newContent !== original) {
    fs.writeFileSync(fpath, newContent, 'utf8');
    console.log('Fixed: ' + fname);
    totalFixed++;
  } else {
    totalSkipped++;
  }
}

console.log('\nTotal fixed: ' + totalFixed);
console.log('Skipped/ok: ' + totalSkipped);