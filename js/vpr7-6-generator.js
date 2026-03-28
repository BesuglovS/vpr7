/**
 * VPR 7 - Task 6: Message Decoding Generator Module
 * Generates tasks for decoding messages using Fano condition
 */

(function () {
  // Symbol pairs for encoding
  const symbolPairs = [
    { symbols: ["0", "1"], name: "0 и 1" },
    { symbols: ["+", "-"], name: "+ и −" },
    { symbols: ["#", "@"], name: "# и @" },
    { symbols: ["*", "^"], name: "* и ^" },
  ];

  // Extra letters to add to the table (not used in words)
  const extraLetters = [
    "Д",
    "З",
    "Ж",
    "Э",
    "Ю",
    "Я",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ф",
    "Х",
    "Ь",
    "Ъ",
  ];

  // Word sets for encoding (meaningful words from 4 to 7 letters)
  const wordSets = [
    {
      letters: ["К", "О", "Т", "А", "М", "Р"],
      words: [
        "КАТОК",
        "МОТОР",
        "ТРАКТ",
        "КОМАР",
        "МАРКА",
        "КАРТА",
        "ТРОТ",
        "ТОРТ",
        "ТАРОМ",
        "РОТАМ",
        "МОТКА",
        "КАТОМ",
      ],
    },
    {
      letters: ["М", "И", "Р", "А", "П", "Г", "Т"],
      words: [
        "ПИРАТ",
        "ПАРТА",
        "ГРАММ",
        "ПИРАМА",
        "ТРАПА",
        "РИМА",
        "ПАРИТ",
        "МИГРА",
      ],
    },
    {
      letters: ["Л", "Е", "Т", "О", "А", "С"],
      words: [
        "ЛЕТО",
        "ТЕЛО",
        "САЛО",
        "СЕЛО",
        "АТЛЕТ",
        "СОТЕ",
        "ЛЕСА",
        "САТЕТ",
        "ТЕСА",
      ],
    },
    {
      letters: ["С", "О", "Н", "А", "К", "Т"],
      words: [
        "КОСА",
        "СОТКА",
        "НАСОС",
        "КАСТА",
        "СТОК",
        "ТОСКА",
        "КАСТО",
        "СОТА",
        "ТОННА",
        "КАТОК",
      ],
    },
    {
      letters: ["В", "О", "Л", "А", "К", "С"],
      words: [
        "ВОЛК",
        "СЛОВО",
        "КЛАСС",
        "ЛАВКА",
        "ВОСК",
        "КЛАС",
        "СОВА",
        "ЛОСА",
      ],
    },
    {
      letters: ["Р", "О", "Т", "А", "К", "С"],
      words: [
        "РОСТ",
        "ТРОС",
        "КАСТА",
        "СТРОКА",
        "КОРА",
        "КАССА",
        "ТРАКТОР",
        "РОСТОК",
        "ТОСКА",
        "КРОТА",
      ],
    },
    {
      letters: ["П", "А", "Р", "Т", "О", "К"],
      words: [
        "ПОРТ",
        "ПАРТА",
        "КАРТА",
        "ТОПКА",
        "ТРОПА",
        "КАПОР",
        "ПАРК",
        "ТОРКА",
        "ПРОТА",
        "КАТКОП",
      ],
    },
    {
      letters: ["Б", "А", "К", "Р", "Т", "О"],
      words: [
        "БРАТ",
        "ТАБОР",
        "РАБОТА",
        "БАРОТ",
        "БОКАР",
        "ТРАБА",
        "КРАБА",
        "БАРКА",
      ],
    },
    {
      letters: ["З", "О", "Н", "А", "К", "В"],
      words: ["ЗВОН", "ЗНАК", "ВОЗ", "НАВЗОН", "КОВАН", "ЗОНКА", "ВОЗНА"],
    },
    {
      letters: ["Д", "О", "М", "А", "Р", "К"],
      words: [
        "ДОМА",
        "КОМАР",
        "МОРД",
        "ДРАМА",
        "КАДР",
        "МАРКА",
        "ДОКРАМ",
        "РОДМА",
        "КОДРА",
      ],
    },
    {
      letters: ["Г", "О", "Р", "А", "М", "Т"],
      words: [
        "ГОРА",
        "ГРОТ",
        "РОГА",
        "ТОРГ",
        "ГРАММ",
        "ГРОМА",
        "РОГАТ",
        "МАРГО",
      ],
    },
    {
      letters: ["Ш", "К", "О", "Л", "А", "Н"],
      words: ["ШКОЛА", "КАША", "КАЛАН", "ЛАКОШ", "ШАЛКА", "КОШЛА", "ЛАШКО"],
    },
  ];

  /**
   * Check direct Fano condition (no code word is a prefix of another)
   */
  function checkDirectFano(codes) {
    for (let i = 0; i < codes.length; i++) {
      for (let j = 0; j < codes.length; j++) {
        if (i !== j && codes[i].startsWith(codes[j])) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Check reverse Fano condition (no code word is a suffix of another)
   */
  function checkReverseFano(codes) {
    for (let i = 0; i < codes.length; i++) {
      for (let j = 0; j < codes.length; j++) {
        if (i !== j && codes[i].endsWith(codes[j])) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Generate all possible codes with given length range
   */
  function generateAllCodes(symbols, minLength, maxLength) {
    const result = [];
    function generate(current) {
      if (current.length <= maxLength) {
        if (current.length >= minLength) result.push(current);
        for (const s of symbols) {
          generate(current + s);
        }
      }
    }
    generate("");
    return result;
  }

  /**
   * Generate codes satisfying direct Fano condition
   */
  function generateFanoCodes(letters, symbols, existingCodes = []) {
    const codes = {};
    const usedCodes = [...existingCodes];

    const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
    const allCodes = generateAllCodes(symbols, 2, 5);
    allCodes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledLetters.length; i++) {
      for (const code of allCodes) {
        if (!usedCodes.includes(code)) {
          const testCodes = [...usedCodes, code];
          if (checkDirectFano(testCodes)) {
            codes[shuffledLetters[i]] = code;
            usedCodes.push(code);
            break;
          }
        }
      }
    }

    return codes;
  }

  /**
   * Generate codes satisfying reverse Fano condition
   */
  function generateReverseFanoCodes(letters, symbols, existingCodes = []) {
    const codes = {};
    const usedCodes = [...existingCodes];
    const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);

    const allCodes = generateAllCodes(symbols, 2, 5);
    allCodes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledLetters.length; i++) {
      for (const code of allCodes) {
        if (!usedCodes.includes(code)) {
          const testCodes = [...usedCodes, code];
          if (checkReverseFano(testCodes)) {
            codes[shuffledLetters[i]] = code;
            usedCodes.push(code);
            break;
          }
        }
      }
    }

    return codes;
  }

  /**
   * Select random element from array
   */
  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Generate a decoding task
   */
  let attemptCount = 0;
  const MAX_ATTEMPTS = 100;

  function generateTask() {
    // Use loop instead of recursion to prevent stack overflow
    while (attemptCount < MAX_ATTEMPTS) {
      attemptCount++;

      try {
        // Select word set and symbol pair
        const wordSet = randomChoice(wordSets);
        const symbolPair = randomChoice(symbolPairs);

        // Randomly choose Fano condition type
        const useDirectFano = Math.random() > 0.3;

        let codes;
        let fanoType;

        if (useDirectFano) {
          codes = generateFanoCodes(wordSet.letters, symbolPair.symbols);
          fanoType = "direct";
        } else {
          codes = generateReverseFanoCodes(wordSet.letters, symbolPair.symbols);
          fanoType = "reverse";
        }

        // Check that all letters have codes
        const missingLetters = wordSet.letters.filter((l) => !codes[l]);
        if (missingLetters.length > 0) {
          continue; // Try again with new random selection
        }

        // Add 1-2 extra letters not used in words
        const usedLetters = wordSet.letters;
        const availableExtraLetters = extraLetters.filter(
          (l) => !usedLetters.includes(l),
        );
        const numExtra = Math.random() < 0.5 ? 1 : 2;
        const shuffledExtra = [...availableExtraLetters].sort(
          () => Math.random() - 0.5,
        );
        const extraLettersToAdd = shuffledExtra.slice(0, numExtra);

        // Generate codes for extra letters considering existing codes
        if (extraLettersToAdd.length > 0) {
          const existingCodesArray = Object.values(codes);

          if (fanoType === "direct") {
            const extraCodes = generateFanoCodes(
              extraLettersToAdd,
              symbolPair.symbols,
              existingCodesArray,
            );
            Object.assign(codes, extraCodes);
          } else {
            const extraCodes = generateReverseFanoCodes(
              extraLettersToAdd,
              symbolPair.symbols,
              existingCodesArray,
            );
            Object.assign(codes, extraCodes);
          }
        }

        // Select word for encoding (only 4 to 7 letters)
        const validWords = wordSet.words.filter(
          (word) =>
            word.length >= 4 &&
            word.length <= 7 &&
            word.split("").every((letter) => codes[letter]),
        );

        if (validWords.length === 0) {
          continue; // Try again with new random selection
        }

        const selectedWord = randomChoice(validWords);

        // Reset attempt counter on success
        attemptCount = 0;

        // Encode the word
        const encodedMessage = selectedWord
          .split("")
          .map((letter) => codes[letter])
          .join("");

        return {
          word: selectedWord,
          encoded: encodedMessage,
          codes: codes,
          fanoType: fanoType,
          symbols: symbolPair.symbols,
          symbolName: symbolPair.name,
        };
      } catch (error) {
        console.error("Error generating task:", error);
        continue; // Try again on error
      }
    }

    // If we reach here, we failed to generate a task
    attemptCount = 0;
    console.error("Failed to generate task after", MAX_ATTEMPTS, "attempts");
    return null;
  }

  /**
   * Generate task text HTML
   */
  function generateTaskText(task) {
    const { fanoType, symbolName } = task;

    let taskText;
    if (fanoType === "direct") {
      taskText = `От разведчика была получена следующая шифрограмма, закодированная с использованием двоичного кода (${symbolName}):`;
    } else {
      taskText = `Получена шифрограмма, закодированная с использованием двоичного кода (${symbolName}):`;
    }

    taskText +=
      '<br><div class="message-container" id="messageContainer"></div>';
    taskText +=
      '<div class="divider-hint">💡 Кликните между символами, чтобы поставить разделитель</div>';

    if (fanoType === "direct") {
      taskText += `При передаче шифрограммы было потеряно разбиение на буквы.`;
    } else {
      taskText += `Разбиение на буквы неизвестно.`;
    }

    taskText += `<br><br>Расшифруйте сообщение, используя таблицу кодов. Запишите в ответе расшифрованное сообщение.`;

    return taskText;
  }

  /**
   * Get Fano condition explanation text
   */
  function getFanoText(fanoType) {
    return fanoType === "direct"
      ? "Код удовлетворяет прямому условию Фано: никакое кодовое слово не является началом другого кодового слова. Это позволяет однозначно декодировать сообщение с начала."
      : "Код удовлетворяет обратному условию Фано: никакое кодовое слово не является окончанием другого кодового слова. Это позволяет однозначно декодировать сообщение с конца.";
  }

  /**
   * Generate hint steps for decoding
   */
  function generateHintSteps(task) {
    const steps = [];

    if (task.fanoType === "direct") {
      steps.push(
        `<div class="hint-step"><strong>Декодируем с начала сообщения:</strong></div>`,
      );

      let remaining = task.encoded;
      let stepNum = 1;

      while (remaining.length > 0) {
        let found = false;
        for (const [letter, code] of Object.entries(task.codes)) {
          if (remaining.startsWith(code)) {
            const before = remaining;
            remaining = remaining.slice(code.length);
            steps.push(
              `<div class="hint-step">${stepNum}. <span class="code-part">${before}</span> → начинаемся с <span class="code-part">${code}</span> = <span class="letter-part">${letter}</span>, остаток: <span class="code-part">${remaining || "(пусто)"}</span></div>`,
            );
            stepNum++;
            found = true;
            break;
          }
        }
        if (!found) break;
      }

      steps.push(
        `<div class="hint-step"><span class="result">Ответ: ${task.word}</span></div>`,
      );
    } else {
      steps.push(
        `<div class="hint-step"><strong>Декодируем с конца сообщения (обратное условие Фано):</strong></div>`,
      );

      let remaining = task.encoded;
      let stepNum = 1;

      while (remaining.length > 0) {
        let found = false;
        for (const [letter, code] of Object.entries(task.codes)) {
          if (remaining.endsWith(code)) {
            const before = remaining;
            remaining = remaining.slice(0, -code.length);
            steps.push(
              `<div class="hint-step">${stepNum}. <span class="code-part">${before}</span> → заканчивается на <span class="code-part">${code}</span> = <span class="letter-part">${letter}</span>, остаток: <span class="code-part">${remaining || "(пусто)"}</span></div>`,
            );
            stepNum++;
            found = true;
            break;
          }
        }
        if (!found) break;
      }

      steps.push(
        `<div class="hint-step"><span class="result">Ответ: ${task.word}</span></div>`,
      );
    }

    return steps;
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task6_Generator = {
      symbolPairs,
      extraLetters,
      wordSets,
      checkDirectFano,
      checkReverseFano,
      generateAllCodes,
      generateFanoCodes,
      generateReverseFanoCodes,
      randomChoice,
      generateTask,
      generateTaskText,
      getFanoText,
      generateHintSteps,
    };
  }
})();
