# Fix mojibake in HTML files: replace broken Russian comment with ASCII-only
$ErrorActionPreference = "SilentlyContinue"
$root = "f:\WebSites\na\vpr7\vpr7"

# Читаем файлы как байты, ищем битый комментарий и заменяем
# Битая строка содержит: "Service Worker" + mojibake
# Заменим любую строку вида "<!-- Service Worker ... -->" перед vpr7-sw-register.js
# на чистый ASCII-вариант.

$cleanComment = "    <!-- Service Worker for PWA (offline mode) -->"

$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File
$totalFixed = 0

foreach ($file in $htmlFiles) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    # Декодируем как UTF-8 (как читает браузер)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    $changed = $false

    # Ищем битый комментарий: "<!-- Service Worker" до "-->" на той же строке
    # Используем регулярку, tolerant к любым символам между
    $pattern = '(?m)^    <!-- Service Worker [^\r\n]*?-->\r?\n    <script src="js/vpr7-sw-register\.js"'
    if ($content -match $pattern) {
        $matched = $matches[0]
        # Проверяем, есть ли в matched не-ASCII (мошибка)
        $hasNonAscii = $false
        foreach ($ch in $matched.ToCharArray()) {
            if ([int]$ch -gt 127) { $hasNonAscii = $true; break }
        }
        if ($hasNonAscii) {
            $replacement = $cleanComment + "`r`n    <script src=`"js/vpr7-sw-register.js`""
            $content = $content -replace [regex]::Escape($matched).Replace('\r','\r').Replace('\n','\n'), $replacement
            # Простой подход: замена через .Replace строкой
            $changed = $true
        }
    }

    if ($changed) {
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        Write-Host "Fixed: $($file.Name)"
        $totalFixed++
    }
}

Write-Host "`nTotal fixed: $totalFixed files"