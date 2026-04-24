/**
 * VPR 7 - Task 11: RGB Color Model Generator Module
 * Generates tasks for determining color from RGB values
 */

(function () {
  // Цвета для задач
  const colors = [
    {
      r: 255,
      g: 255,
      b: 255,
      name: "Белый",
      description: "Все компоненты максимальны",
    },
    {
      r: 0,
      g: 0,
      b: 0,
      name: "Чёрный",
      description: "Все компоненты минимальны",
    },
    {
      r: 255,
      g: 0,
      b: 0,
      name: "Красный",
      description: "Только красный компонент",
    },
    {
      r: 0,
      g: 255,
      b: 0,
      name: "Зелёный",
      description: "Только зелёный компонент",
    },
    {
      r: 0,
      g: 0,
      b: 255,
      name: "Синий",
      description: "Только синий компонент",
    },
    {
      r: 255,
      g: 255,
      b: 0,
      name: "Жёлтый",
      description: "Красный + Зелёный",
    },
    {
      r: 0,
      g: 255,
      b: 255,
      name: "Голубой (Циан)",
      description: "Зелёный + Синий",
    },
    {
      r: 255,
      g: 0,
      b: 255,
      name: "Пурпурный (Маджента)",
      description: "Красный + Синий",
    },
    {
      r: 128,
      g: 128,
      b: 128,
      name: "Серый",
      description: "Все компоненты равны",
    },
    {
      r: 255,
      g: 128,
      b: 0,
      name: "Оранжевый",
      description: "Красный + половина Зелёного",
    },
    {
      r: 255,
      g: 192,
      b: 203,
      name: "Розовый",
      description: "Красный с добавлением других",
    },
    {
      r: 128,
      g: 0,
      b: 128,
      name: "Фиолетовый",
      description: "Половина Красного + Синий",
    },
    {
      r: 255,
      g: 255,
      b: 128,
      name: "Кремовый",
      description: "Жёлтый с половиной синего (кремовый оттенок)",
    },
    {
      r: 0,
      g: 128,
      b: 0,
      name: "Тёмно-зелёный",
      description: "Половина Зелёного",
    },
    {
      r: 0,
      g: 0,
      b: 128,
      name: "Тёмно-синий",
      description: "Половина Синего",
    },
    {
      r: 128,
      g: 0,
      b: 0,
      name: "Тёмно-красный",
      description: "Половина Красного",
    },
    {
      r: 192,
      g: 192,
      b: 192,
      name: "Светло-серый",
      description: "Серый с высоким значением",
    },
    {
      r: 64,
      g: 64,
      b: 64,
      name: "Тёмно-серый",
      description: "Серый с низким значением",
    },
    {
      r: 0,
      g: 128,
      b: 128,
      name: "Бирюзовый",
      description: "Половина Зелёного + Синий",
    },
    {
      r: 128,
      g: 128,
      b: 0,
      name: "Оливковый",
      description: "Половина Красного + Зелёный",
    },
  ];

  // Варианты ответов для каждого цвета
  const answerOptions = [
    "Белый",
    "Чёрный",
    "Красный",
    "Зелёный",
    "Синий",
    "Жёлтый",
    "Голубой (Циан)",
    "Пурпурный (Маджента)",
    "Серый",
    "Оранжевый",
    "Розовый",
    "Фиолетовый",
    "Тёмно-зелёный",
    "Тёмно-синий",
    "Тёмно-красный",
    "Светло-серый",
    "Тёмно-серый",
    "Бирюзовый",
    "Оливковый",
    "Кремовый",
  ];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function getColorName(r, g, b) {
    // Точное совпадение
    const exactMatch = colors.find((c) => c.r === r && c.g === g && c.b === b);
    if (exactMatch) return exactMatch.name;

    // Оттенки серого (все компоненты равны)
    if (r === g && g === b) {
      if (r === 0) return "Чёрный";
      if (r === 255) return "Белый";
      if (r < 85) return "Тёмно-серый";
      if (r > 170) return "Светло-серый";
      return "Серый";
    }

    // Почти белый/чёрный - возвращаем точные названия из answerOptions
    if (r > 230 && g > 230 && b > 230) return "Белый";
    if (r < 25 && g < 25 && b < 25) return "Чёрный";

    // Определяем доминирующие компоненты
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    // Вычисляем процентное соотношение компонентов
    const total = r + g + b;
    const rPercent = (r / total) * 100;
    const gPercent = (g / total) * 100;
    const bPercent = (b / total) * 100;

    // Один сильно доминирующий цвет (diff > 100)
    if (diff > 100) {
      // Красный доминирует
      if (r === max && g < r - 50 && b < r - 50) {
        if (r < 150) return "Тёмно-красный";
        if (g > 150 && b < 100) return "Оранжевый";
        if (g > 150 && b > 150) return "Розовый";
        if (b > 100) return "Розовый";
        return "Красный";
      }
      // Зелёный доминирует
      if (g === max && r < g - 50 && b < g - 50) {
        if (g < 150) return "Тёмно-зелёный";
        return "Зелёный";
      }
      // Синий доминирует
      if (b === max && r < b - 50 && g < b - 50) {
        if (b < 150) return "Тёмно-синий";
        return "Синий";
      }
    }

    // Два доминирующих компонента (промежуточные цвета)

    // Жёлтый / Кремовый / Оливковый (R + G доминируют)
    if (rPercent > 35 && gPercent > 35 && bPercent < 30) {
      if (r > 200 && g > 200 && b < 100) return "Жёлтый";
      if (r > 200 && g > 200 && b >= 100) return "Кремовый";
      if (r > 100 && g > 100 && r < 200 && g < 200) return "Оливковый";
      return "Жёлтый";
    }

    // Голубой / Бирюзовый (G + B доминируют)
    if (gPercent > 35 && bPercent > 35 && rPercent < 30) {
      if (g > 200 && b > 200) return "Голубой (Циан)";
      return "Бирюзовый";
    }

    // Пурпурный / Фиолетовый (R + B доминируют)
    if (rPercent > 35 && bPercent > 35 && gPercent < 30) {
      if (r > 200 && b > 200) return "Пурпурный (Маджента)";
      return "Фиолетовый";
    }

    // Светлые оттенки (высокие значения, низкая насыщенность)
    if (r > 180 && g > 180 && b > 180) {
      if (r > g && r > b) return "Розовый";
      if (b > r && b > g) return "Голубой (Циан)";
      return "Светло-серый";
    }

    // Тёмные оттенки (низкие значения)
    if (r < 100 && g < 100 && b < 100) {
      if (r > g && r > b) return "Тёмно-красный";
      if (g > r && g > b) return "Тёмно-зелёный";
      if (b > r && b > g) return "Тёмно-синий";
      return "Тёмно-серый";
    }

    // Определяем по наиболее выраженному компоненту
    if (r > g && r > b) {
      if (g > 150) return "Оранжевый";
      if (b > 150) return "Розовый";
      return "Красный";
    }
    if (g > r && g > b) {
      if (b > 150) return "Бирюзовый";
      return "Зелёный";
    }
    if (b > r && b > g) {
      if (r > 150) return "Фиолетовый";
      return "Синий";
    }

    return "Смешанный цвет";
  }

  function generateTask() {
    // Выбираем случайный цвет
    const color = randomChoice(colors);

    // Формируем текст задачи
    const taskText = `Какой цвет в цветовой модели RGB кодируется как <span class="highlight">(${color.r}, ${color.g}, ${color.b})</span>?`;

    // Формируем варианты ответов (правильный + 3 случайных неправильных)
    let options = [color.name];
    const otherColors = answerOptions.filter((c) => c !== color.name);
    const shuffledOthers = shuffleArray(otherColors);
    options.push(...shuffledOthers.slice(0, 3));
    options = shuffleArray(options);

    // Формируем подсказку
    const hintSteps = `
    <div class="hint-step">
      <strong>RGB(${color.r}, ${color.g}, ${color.b})</strong> означает:
    </div>
    <div class="hint-step">
      • R (Red/Красный) = ${color.r} ${color.r === 255 ? "(максимум)" : color.r === 0 ? "(минимум)" : color.r > 128 ? "(высокий)" : "(низкий)"}
    </div>
    <div class="hint-step">
      • G (Green/Зелёный) = ${color.g} ${color.g === 255 ? "(максимум)" : color.g === 0 ? "(минимум)" : color.g > 128 ? "(высокий)" : "(низкий)"}
    </div>
    <div class="hint-step">
      • B (Blue/Синий) = ${color.b} ${color.b === 255 ? "(максимум)" : color.b === 0 ? "(минимум)" : color.b > 128 ? "(высокий)" : "(низкий)"}
    </div>
    <div class="hint-step">
      ${color.description}
    </div>
    <div class="hint-step">
      <span class="result">Ответ: ${color.name}</span>
    </div>
  `;

    return {
      type: "🎨 Цветовая модель RGB",
      text: taskText,
      answer: color.name,
      color: color,
      options: options,
      hintSteps: hintSteps,
    };
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task11_Generator = {
      colors,
      answerOptions,
      randomInt,
      randomChoice,
      shuffleArray,
      getColorName,
      generateTask,
    };
  }
})();
