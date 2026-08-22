# AGENTS.md — Инструкции для ИИ-ассистентов

Интерактивный сайт подготовки к **ВПР по информатике для 7 и 8 классов**.
Полностью статический, **без зависимостей и сборки** (vanilla JS, mix ES5/ES6+, inline-скрипты).
Русский язык, тёмный «Nayanova»-дизайн. Прод: `https://vpr.nayanovaacademy.ru`.

## ⚠️ Критические правила

1. **Два поколения кода и данных живут рядом.** Страницы грузят **вложенные** копии (`vpr7/js/`,
   `VPR8/js/`, `vpr7/data/`, `VPR8/data/`), а корневые `js/*` — мёртвые для сайта и расходятся по
   содержимому (проверено хэшами). Исключения: корневые `js/vpr7-tasks.json`/`vpr8-tasks.json`/`js/storage/localStorage.js`
   используются тестами. **Всегда прослеживайте фактический `src`/`href`/`fetch`-путь из HTML перед правкой.**
2. **Регистр важен**: `vpr7/` (нижний) vs `VPR8/` (верхний) — Linux-файловая система case-sensitive.
   Не переименовывать `VPR8`; `VPR8/vpr8-N.html` грузят `../vpr7/js/vpr7-exam-utils.js` — не ломать.
3. **Данные задач**: живые — `.txt` с `@Category`-разметкой в `vpr7/data/` и `VPR8/data/` (грузится
   `fetch()` + `parseData()`); консолидированный JSON — `vpr7/data/vpr7-tasks.json` (грузит `vpr7-data-loader.js`).
   Корневые `data/` — устаревшие/расходящиеся, не использовать как источник.
   Каждый генератор содержит `FALLBACK_DATA` для офлайна.
4. **Service Worker не зарегистрирован ни на одной странице** — PWA-офлайн сейчас инертен. `sw.js`
   (`CACHE_NAME='vpr-cache-v2'`) и `*sw-register.js` существуют, но не подключены. Если подключать —
   **поднять `CACHE_NAME` при любом изменении кэшируемых ассетов**.
5. **`index.php` сломан и мёртв в проде**: `$_SESSION` без `session_start()`, `return include ...` печатает
   лишнюю «1». Nginx отдаёт `vpr.html` напрямую (`index vpr.html`). Не полагаться; не «чинить» в приоритете.
6. **`manifest.json` `start_url` = `/vpr7.html`** — такого файла в корне нет (есть `vpr.html`). PWA-install 404.
7. **Mojibake**: `vpr7/js/vpr7-sw-register.js` — битая кириллица. Все файлы писать в UTF-8 (без BOM
   предпочтительно). `fix-mojibake.*`/`update-html-pages.ps1` содержат устаревший путь `f:\WebSites\na\vpr7\vpr7`
   — не запускать без правки пути.
8. **Нет `.gitignore`, `sitemap.xml`, `robots.txt`** (проверено рекурсивно). `.env` и `ssh-private.key`
   (в `G:\WebSites\na\`) — реальные секреты: никогда не печатать/коммитить.
9. **Тесты настроены, но не запускаются**: нет `package.json`/`node_modules`; конфиг `environment: 'node'`,
   а тесты используют браузерные `window`/`localStorage` (нужен jsdom). `.github/CONTRIBUTING.md` описывает
   npm-скрипты, которых нет. Не добавлять tooling без явного запроса.
10. **Агрессивный static-cache (30д, `public, immutable`)** в nginx: после правки CSS/JS поднимать
    `CACHE_NAME`/переименовывать файлы, иначе прод покажет старое. nginx шлёт `no-cache` для `/sw.js` и `/js/tracking-client.js`.
11. **Легаси-загрузка данных требует HTTP-сервера**: `fetch()` `.txt` не работает через `file://` — тестировать через `python -m http.server`.

## 🔧 Команды

```bash
python -m http.server 8000   # локальный dev-сервер (обязательно)
.\deploy.ps1 -DryRun         # сухой прогон
.\deploy.ps1                 # деплой
# одноразовые скрипты (править устаревшие пути f:\ → G:\ перед запуском):
node fix-metrika.cjs
node fix-mojibake.cjs
python fix-html.py
.\fix-mojibake.ps1 / .\update-html-pages.ps1
```

## 🏗 Структура

```
vpr.html               # лендинг-выбор класса (7/8); грузит progress/tracking скрипты
index.php              # сломанный PHP-роутер (мёртв в проде)
sw.js, manifest.json, metrika.js (107146125), 404.html, offline.html, favicon.svg
vpr7/                   # КЛАСС 7 (нижний регистр)
  vpr7.html, vpr7-exam.html, vpr7-generator.html
  vpr7-{1-12}.html, vpr7-{1-12}-t.html       # задания и теория
  css/vpr7-*.css, js/vpr7-{n}-generator.js   # ЖИВЫЕ копии (страницы грузят их)
  js/vpr7-tasks-generator.js, vpr7-exam-utils.js, vpr7-storage.js, vpr7-data-loader.js, vpr7-main.js
  data/vpr7-{1-12}.txt, data/vpr7-tasks.json # ЖИВЫЕ данные
VPR8/                   # КЛАСС 8 (ВЕРХНИЙ регистр)
  vpr8.html, vpr8-exam.html, vpr8-generator.html
  vpr8-{1-10}.html, vpr8-{1-10}-t.html
  css/, js/vpr8-{1-10}-generator.js, data/vpr8-{1-10}.txt
js/                     # КОРНЕВЫЕ копии (для сайта мёртвые; json/storage — для тестов)
  vpr7-{6-12}-generator.js (OLD), vpr8-{1-10}-generator.js (OLD)
  vpr7-tasks.json, vpr8-tasks.json, storage/localStorage.js  # используют тесты
  progress-client.js, progress-sync.js, tracking-client.js   # экосистемные копии
  html2canvas.min.js, jspdf.umd.min.js
data/                   # УСТАРЕВШАЯ расходящаяся копия (кроме data/vpr8-tasks.json)
tests/                  # vitest.config.mjs + generators.test.js + storage.test.js (не запускаются as-is)
assets/design-tokens.css  # токены --na-* (тёмный градиент #0f0c29→#302b63→#24243e, accent #667eea/#764ba2)
docs/API.md             # документация window.VPR_Storage
deploy.ps1, vpr.nayanovaacademy.ru (nginx, untracked)
```

## 📝 Именование и структура страниц

- `vpr{N}.html` — индекс класса; `vpr{N}-exam.html` — экзамен; `vpr{N}-generator.html` — генератор
  печатных вариантов (jsPDF + html2canvas); `vpr{N}-{n}.html` — задание; `vpr{N}-{n}-t.html` — теория.
- Head-шаблон: `<!doctype html>`, `lang="ru"`, UTF-8, meta description, favicon, manifest, per-task CSS,
  Metrika-блок (`<script src="../metrika.js">` + `<noscript>`).
- Страницы заданий: head грузит `js/vpr7-exam-utils.js`, `js/vpr7-storage.js`; конец body — per-task
  генератор + большой inline-скрипт (loadData → initGame, drag/touch, checkAnswer, `VPR7_ExamUtils.sendExamResult`, `VPR7_Storage.saveTaskResult`).
- Лендинги (`vpr.html`, `vpr7/vpr7.html`, `VPR8/vpr8.html`) грузят `progress-client.js`, `progress-sync.js`, `tracking-client.js`.
- Формат `.txt`: строки, категории через `@Название категории`.

## 💻 Конвенции кода

- **JS** (`.eslintrc.json`): 2-space indent, двойные кавычки, точки с запятой, `es2021`. Реально —
  смесь эпох: ES5-IIFE `var` (канонические shared-копии), ES6+ `const`/`let`/стрелки/`async`/`await`,
  `export default` в новых модулях. Экспорт глобалов: `window.VPR7_*`, `window.VPR_Storage`.
  JSDoc в русском на генераторах.
- **localStorage**: `vpr7-progress`/`vpr8-progress` (`{completed[], attempted[], scores{}}`),
  `vpr7-theme`, `vpr7-exam-results`, `vpr-progress` (`VPR_Storage`, ключи `vpr7-N`/`vpr8-N`),
  `nayanova-progress` (единый прогресс), `nayanova_tab_key` (sessionStorage).
- **HTML**: 2-space indent, self-closing `<meta ... />`, OG-теги, inline `<style>` на лендингах.
- **CSS**: токены `--na-*` из `assets/design-tokens.css`, per-task CSS-файлы, классы `.container`,
  `.task-card`, `.btn`, `.score-board`, `.category`, `.device`.
- Комментарии и UI — **русский**.

## 🧪 Тестирование

Vitest (config `tests/vitest.config.mjs`), тесты: `generators.test.js` (валидирует корневые
`js/vpr7-tasks.json`/`vpr8-tasks.json`), `storage.test.js` (js/storage/localStorage.js).
⚠️ Для запуска нужны: `npm init -y`, `npm i -D vitest jsdom`, `environment: 'jsdom'` — иначе тесты
падают на браузерных глобалах. Эти тесты валидируют **корневые JSON-данные, не реальные**.

## 🚀 Деплой (`deploy.ps1`)

1. `.env` → SSH-переменные; `icacls` ключа.
2. `tar czf - --exclude=...` (`.git`, `.env`, `deploy.ps1`, nginx-конфиг, IDE/лог-файлы) → SSH.
3. Удалённо: `rm -rf {remote}/*` → распаковка.
4. Деплой nginx-конфига `vpr.nayanovaacademy.ru` → `/etc/nginx/sites-available/` → `nginx -t && systemctl reload nginx`.

Требования сервера: nginx, SSL `/etc/ssl/certs/nayanovaacademy.ru/`, HSTS preload, root
`/var/www/vpr.nayanovaacademy.ru/public`, `index vpr.html`, static `immutable 30d`, dotfiles deny.

## 🔒 Безопасность

- `.env` и `ssh-private.key` — никогда не печатать/коммитить.
- Деплой стирает удалённую директорию — только после фиксации чистого состояния.
- Не добавлять npm/package.json-tooling без явного запроса (проект осознанно zero-dependency).
- Не реформатировать все файлы массово (смесь эпох намеренная; риск mojibake и шумных диффов).
- Не создавать молча `sitemap.xml`/`robots.txt`/`.gitignore` (никогда не существовали — меняют SEO/деплой-поведение).
- `vpr.nayanovaacademy.ru` — прод-конфиг nginx; битый синтаксис уронит `nginx -t` и блокирует reload.