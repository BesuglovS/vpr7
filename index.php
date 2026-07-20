<?php
/**
 * Корневой роутер для проекта vpr7
 * Маршрутизирует запросы между vpr7 и vpr8
 */

header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// CSRF защита для форм
$csrfToken = bin2hex(random_bytes(32));
$_SESSION['csrf_token'] = $csrfToken;

/**
 * Основная функция маршрутизации
 */
function route($uri) {
    global $csrfToken;
    
    // Определяем класс (vpr7 или vpr8)
    if (strpos($uri, 'vpr8') !== false) {
        $className = 'vpr8';
    } else {
        $className = 'vpr7';
    }
    
    // Подключаем метрику
    if (file_exists(__DIR__ . '/metrika.js')) {
        include __DIR__ . '/metrika.js';
    }
    
    // Основной роутинг
    switch ($uri) {
        case '':
        case '/':
        case 'index.php':
            return include __DIR__ . '/vpr.html';
            
        case 'vpr7':
        case 'vpr7/':
            return include __DIR__ . '/vpr7/vpr7.html';
            
        case 'vpr8':
        case 'vpr8/':
            return include __DIR__ . '/VPR8/vpr8.html';
            
        default:
            // Проверка CSRF
            if (isset($_SERVER['REQUEST_METHOD']) && in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'DELETE'])) {
                if (!isset($_SESSION['csrf_token']) || $_SERVER['HTTP_X_CSRF_TOKEN'] !== $_SESSION['csrf_token']) {
                    http_response_code(403);
                    echo 'CSRF validation failed';
                    exit;
                }
            }
            
            return include __DIR__ . '/vpr7/vpr7.html';
    }
}

// Получаем URI
$uri = $_SERVER['REQUEST_URI'];
// Удаляем query string
$uri = preg_replace('/\?.*$', '', $uri);
// Удаляем каталог
$uri = parse_url($uri, PHP_URL_PATH);
$uri = basename($uri);

// Роутирование
$response = route($uri);
echo $response;
?>