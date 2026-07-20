#!/usr/bin/env python3
"""
Скрипт для исправления ошибок в HTML файлах vpr7
"""
import os
import re

def fix_html_files():
    base_dir = os.path.join(os.path.dirname(__file__), 'VPR8')
    
    # Ищем все HTML файлы
    html_files = []
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))
    
    print(f'Найдено HTML файлов: {len(html_files)}\n')
    
    fixed_count = 0
    
    for filepath in sorted(html_files):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # 1. Удаляем дубликаты метрики Yandex
        pattern = r'<!-- Yandex\.Metrika counter -->\s*<noscript[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?</div>[\s\S]*?</noscript>\s*<!-- /Yandex\.Metrika counter -->\s*<!-- Yandex\.Metrika counter -->'
        replacement = '<!-- Yandex.Metrika counter -->\n    <noscript>\n      <div>\n        <img\n          src="https://mc.yandex.ru/watch/107146125"\n          style="position: absolute; left: -9999px"\n          alt=""\n        /></div>\n    </noscript>\n    <!-- /Yandex.Metrika counter -->'
        
        new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Исправлено: {os.path.relpath(filepath, os.path.dirname(__file__))}')
            fixed_count += 1
        
        content = new_content
        
        # 2. Удаляем vpr7-exam-utils из VPR8 (уже не нужен, загружается из корня через defer)
        if re.search(r'<script src="\.\./js/vpr7-exam\.js"[^>]*>\s*</script>', content):
            content = re.sub(r'<script src="\.\./js/vpr7-exam\.js"[^>]*>\s*</script>', '', content)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Удалён vpr7-exam: {os.path.relpath(filepath, os.path.dirname(__file__))}')
            fixed_count += 1
        
        content = re.sub(r'<script src="\.\./js/vpr7-exam\.js"[^>]*>\s*</script>', '', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
    
    print(f'\nВсего исправлено: {fixed_count} файлов')
    return fixed_count

if __name__ == '__main__':
    fix_html_files()