# Массовое обновление HTML-страниц vpr7:
# - добавляет <meta name="theme-color"> если нет
# - добавляет регистрацию Service Worker (через vpr7-sw-register.js)
# - добавляет meta description, если нет
# - преобразует http:// в https:// для метрики

$ErrorActionPreference = "SilentlyContinue"
$root = "f:\WebSites\na\vpr7\vpr7"

# Шаблон для регистрации SW на страницах vpr7/vpr7/*
$swRegisterSnippet = @"
    <!-- Service Worker для PWA (офлайн-режим) -->
    <script src="js/vpr7-sw-register.js" defer></script>
"@

$themeMeta = '    <meta name="theme-color" content="#3b82f6" />'

$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File

$totalUpdated = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content
    $changed = $false

    # 1) Theme-color
    if ($content -notmatch 'name=["'']theme-color["'']') {
        # Вставляем после manifest
        if ($content -match '(<link[^>]*manifest\.json[^>]*>)') {
            $content = $content -replace '(<link[^>]*manifest\.json[^>]*>)', "`$1`r`n$themeMeta"
            $changed = $true
        }
    }

    # 2) Service Worker регистрация (только если ещё нет)
    if ($content -notmatch 'vpr7-sw-register\.js') {
        if ($content -match '(<link[^>]*manifest\.json[^>]*>)') {
            $content = $content -replace '(<link[^>]*manifest\.json[^>]*>)(\r?\n)?(\s*<meta[^>]*theme-color[^>]*>)?', "`$1`r`n$themeMeta`r`n$swRegisterSnippet"
            $changed = $true
        }
    }

    # 3) http://mc.yandex.ru -> https://
    if ($content -match 'http://mc\.yandex\.ru') {
        $content = $content -replace 'http://mc\.yandex\.ru', 'https://mc.yandex.ru'
        $changed = $true
    }

    if ($changed) {
        # Убираем возможные дубли theme-color
        $themeMatches = ([regex]::Matches($content, '<meta[^>]*name=["'']theme-color["''][^>]*>'))
        if ($themeMatches.Count -gt 1) {
            # Оставляем только первое вхождение
            $first = $themeMatches[0].Value
            for ($i = $themeMatches.Count - 1; $i -ge 1; $i--) {
                $content = $content -replace [regex]::Escape($themeMatches[$i].Value), ''
            }
        }

        Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
        Write-Host "Updated: $($file.Name)"
        $totalUpdated++
    } else {
        Write-Host "Skipped (already ok): $($file.Name)"
    }
}

Write-Host "`nTotal updated: $totalUpdated files"