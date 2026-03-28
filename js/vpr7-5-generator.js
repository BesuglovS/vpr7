/**
 * VPR 7 - Task 5: Logic Puzzle Generator Module
 * Generates interactive logic puzzles matching names with surnames
 */

(function () {
  // Fallback data when file loading fails
  const FALLBACK_DATA = `# Имена (женские)
Мария
Ирина
Светлана
Анна
Елена
Ольга
Наталья
Татьяна
Екатерина
Юлия
Александра
Виктория

# Имена (мужские)
Александр
Дмитрий
Максим
Сергей
Андрей
Алексей
Артём
Илья
Кирилл
Михаил
Никита
Владислав

# Фамилии (женские)
Миронова
Иванова
Сергеева
Петрова
Сидорова
Козлова
Новикова
Морозова
Волкова
Соколова
Попова
Лебедева
Кузнецова
Смирнова

# Фамилии (мужские)
Миронов
Иванов
Сергеев
Петров
Сидоров
Козлов
Новиков
Морозов
Волков
Соколов
Попов
Лебедев
Кузнецов
Смирнов`;

  /**
   * Parse text data into data object
   */
  function parseData(text) {
    const data = {
      femaleNames: [],
      maleNames: [],
      femaleSurnames: [],
      maleSurnames: [],
    };

    const lines = text.split("\n");
    let currentSection = "";

    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith("# Имена (женские)")) {
        currentSection = "femaleNames";
      } else if (line.startsWith("# Имена (мужские)")) {
        currentSection = "maleNames";
      } else if (line.startsWith("# Фамилии (женские)")) {
        currentSection = "femaleSurnames";
      } else if (line.startsWith("# Фамилии (мужские)")) {
        currentSection = "maleSurnames";
      } else if (line.startsWith("# Фамилии (общие)")) {
        currentSection = "";
      } else if (line && !line.startsWith("#")) {
        if (currentSection === "femaleNames") data.femaleNames.push(line);
        else if (currentSection === "maleNames") data.maleNames.push(line);
        else if (currentSection === "femaleSurnames")
          data.femaleSurnames.push(line);
        else if (currentSection === "maleSurnames")
          data.maleSurnames.push(line);
      }
    });

    return data;
  }

  /**
   * Load logic puzzle data from file or use fallback
   */
  async function loadData(filePath = "data/vpr7-5.txt") {
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
   * Decline names to genitive case (у кого?)
   */
  function declineNameGenitive(name, isFemale) {
    if (isFemale) {
      if (name.endsWith("а")) {
        const beforeLast = name.slice(-2, -1).toLowerCase();
        if (/[гкхжшчщ]/.test(beforeLast)) {
          return name.slice(0, -1) + "и";
        }
        return name.slice(0, -1) + "ы";
      }
      if (name.endsWith("я")) {
        return name.slice(0, -1) + "и";
      }
      if (name.endsWith("ь")) {
        return name.slice(0, -1) + "и";
      }
      return name;
    } else {
      if (name.endsWith("й")) {
        return name.slice(0, -1) + "я";
      }
      if (/[бвгджзклмнпрстфхцчшщ]$/.test(name)) {
        return name + "а";
      }
      if (name.endsWith("а")) {
        return name.slice(0, -1) + "ы";
      }
      if (name.endsWith("я")) {
        return name.slice(0, -1) + "и";
      }
      return name;
    }
  }

  /**
   * Decline surnames to genitive case
   */
  function declineSurnameGenitive(surname, isFemale) {
    if (isFemale) {
      if (surname.endsWith("а")) {
        return surname.slice(0, -1) + "ой";
      }
      return surname;
    } else {
      if (/[бвгджзйклмнпрстфхцчшщ]$/.test(surname)) {
        return surname + "а";
      }
      if (surname.endsWith("й")) {
        return surname.slice(0, -1) + "я";
      }
      if (surname.endsWith("о")) {
        return surname;
      }
      return surname;
    }
  }

  /**
   * Get all permutations of an array
   */
  function getPermutations(arr) {
    if (arr.length <= 2) {
      return arr.length === 2 ? [arr, [arr[1], arr[0]]] : [arr];
    }
    return arr.reduce(
      (acc, item, i) =>
        acc.concat(
          getPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(
            (val) => [item, ...val],
          ),
        ),
      [],
    );
  }

  /**
   * Validate that conditions give unambiguous solution
   */
  function validatePuzzle(names, surnames, conditions) {
    const possible = {};
    names.forEach((name) => {
      possible[name] = new Set(surnames);
    });

    for (const condition of conditions) {
      if (condition.type === "notSurname") {
        const { name, notSurname } = condition.relevantInfo;
        possible[name].delete(notSurname);
      } else if (condition.type === "sameLetterInSurname") {
        const {
          person1,
          person2,
          surnames: condSurnames,
        } = condition.relevantInfo;
        const otherName = names.find((n) => n !== person1 && n !== person2);
        if (otherName) {
          possible[otherName].delete(condSurnames[0]);
          possible[otherName].delete(condSurnames[1]);
        }
      } else if (condition.type === "sameFirstLetterOwn") {
        const { name, surname } = condition.relevantInfo;
        possible[name] = new Set([surname]);
        names.forEach((n) => {
          if (n !== name) possible[n].delete(surname);
        });
      }
    }

    let changed = true;
    while (changed) {
      changed = false;
      for (const name of names) {
        if (possible[name].size === 1) {
          const surname = [...possible[name]][0];
          for (const otherName of names) {
            if (otherName !== name && possible[otherName].has(surname)) {
              possible[otherName].delete(surname);
              changed = true;
            }
          }
        }
      }
    }

    for (const name of names) {
      if (possible[name].size !== 1) {
        return false;
      }
    }

    const assignedSurnames = new Set(names.map((n) => [...possible[n]][0]));
    if (assignedSurnames.size !== names.length) {
      return false;
    }

    return true;
  }

  /**
   * Generate task text (version 2)
   */
  function generateTaskTextV2(names, surnames, conditions, personType) {
    const namesList = names.join(", ");
    const surnamesList = surnames.join(", ");
    const isFemale = personType === "девочки";

    let taskText = `Трое ${isFemale ? "подруг" : "друзей"} празднуют день рождения: <span class="highlight">${namesList}</span>. `;
    taskText += `Их фамилии: <span class="highlight">${surnamesList}</span>. `;

    conditions.forEach((condition, idx) => {
      taskText += `<br><strong>${idx + 1})</strong> ${condition.text}`;
    });

    taskText += `<br>Заполните таблицу: поставьте <strong>+</strong> там, где имя и фамилия соответствуют друг другу, и <strong>−</strong> где не соответствуют.`;

    return taskText;
  }

  /**
   * Generate reasoning steps for solution (version 2)
   */
  function generateReasoningV2(names, surnames, conditions, personType) {
    const steps = [];
    const isFemale = personType === "девочки";
    const getSurname = (name) => surnames[names.indexOf(name)];

    const knownMatches = new Map();

    for (const condition of conditions) {
      switch (condition.type) {
        case "notSurname": {
          const { name, notSurname } = condition.relevantInfo;
          steps.push(
            `Из условия следует, что <span class="highlight">${name}</span> не <span class="highlight">${notSurname}</span>.`,
          );
          break;
        }

        case "sameLetterInSurname": {
          const {
            person1,
            person2,
            letter,
            surnames: condSurnames,
          } = condition.relevantInfo;
          const upperLetter = letter.toUpperCase();
          // Находим третье имя и фамилию
          const thirdName = names.find((n) => n !== person1 && n !== person2);
          const thirdSurname = surnames.find(
            (s) => s !== condSurnames[0] && s !== condSurnames[1],
          );
          steps.push(
            `Букву «${upperLetter}» содержат только фамилии <span class="highlight">${condSurnames[0]}</span> и <span class="highlight">${condSurnames[1]}</span> (в фамилии ${thirdSurname} этой буквы нет). Значит, <span class="highlight">${person1}</span> и <span class="highlight">${person2}</span> – это <span class="highlight">${condSurnames[0]}</span> и <span class="highlight">${condSurnames[1]}</span> (в каком-то порядке), а <span class="highlight">${thirdName}</span> – <span class="highlight">${thirdSurname}</span>.`,
          );
          break;
        }

        case "sameFirstLetterOwn": {
          const { name, surname } = condition.relevantInfo;
          steps.push(
            `У <span class="highlight">${name}</span> первая буква имени «${name[0].toUpperCase()}» совпадает с первой буквой фамилии «${surname[0].toUpperCase()}». Значит, <span class="highlight">${name}</span> – <span class="highlight">${surname}</span>.`,
          );
          knownMatches.set(name, surname);
          break;
        }
      }
    }

    const allMatches = names.map(
      (n) =>
        `<span class="highlight">${n}</span> – <span class="highlight">${getSurname(n)}</span>`,
    );
    steps.push(`Ответ: ${allMatches.join(", ")}.`);

    return steps;
  }

  /**
   * Template 1: Classic (common letter in surnames + negations)
   */
  function generateTemplate1(names, surnames, personType) {
    const isFemale = personType === "девочки";
    const permutations = getPermutations([...surnames]);

    for (const perm of permutations) {
      const matches = names.map((name, i) => ({
        name: name,
        surname: perm[i],
      }));

      const conditions = [];

      const name1 = names[0];
      const name2 = names[1];
      const name3 = names[2];
      const surname1 = perm[0];
      const surname2 = perm[1];
      const surname3 = perm[2];

      // Находим общую букву между surname2 и surname3
      let commonLetter = null;
      let commonLetterCount = 0;

      // Проверяем каждую букву surname2
      for (const letter of surname2.toLowerCase()) {
        if (surname3.toLowerCase().includes(letter)) {
          if (commonLetter === null) {
            commonLetter = letter;
          }
          commonLetterCount++;
        }
      }

      // Если нет общей буквы или общих букв больше одной - пропускаем
      if (!commonLetter || commonLetterCount > 1) {
        continue;
      }

      // Проверяем, что первая фамилия НЕ содержит общую букву
      if (surname1.toLowerCase().includes(commonLetter)) {
        continue;
      }

      const name2Gen = declineNameGenitive(name2, isFemale);
      const name3Gen = declineNameGenitive(name3, isFemale);
      conditions.push({
        type: "sameLetterInSurname",
        text: `У <span class="highlight">${name2Gen}</span> и у <span class="highlight">${name3Gen}</span> в фамилии есть буква «${commonLetter.toUpperCase()}».`,
        relevantInfo: {
          person1: name2,
          person2: name3,
          letter: commonLetter,
          surnames: [surname2, surname3],
        },
      });

      conditions.push({
        type: "notSurname",
        text: `<span class="highlight">${name2}</span> не <span class="highlight">${surname3}</span>.`,
        relevantInfo: {
          name: name2,
          notSurname: surname3,
          actualSurname: surname2,
        },
      });

      conditions.push({
        type: "notSurname",
        text: `<span class="highlight">${name1}</span> не <span class="highlight">${surname2}</span>.`,
        relevantInfo: {
          name: name1,
          notSurname: surname2,
          actualSurname: surname1,
        },
      });

      if (!validatePuzzle(names, perm, conditions)) {
        continue;
      }

      const taskText = generateTaskTextV2(names, perm, conditions, personType);
      const reasoning = generateReasoningV2(
        names,
        perm,
        conditions,
        personType,
      );

      return {
        text: taskText,
        names: names,
        surnames: perm,
        correctMatches: matches,
        reasoning: reasoning,
        conditions: conditions,
      };
    }

    return null;
  }

  /**
   * Template 4: Combined (with matching first letters)
   */
  function generateTemplate4(names, surnames, personType) {
    const isFemale = personType === "девочки";
    const permutations = getPermutations([...surnames]);

    for (const perm of permutations) {
      const conditions = [];

      let matchIdx = -1;
      for (let i = 0; i < names.length; i++) {
        if (names[i][0].toLowerCase() === perm[i][0].toLowerCase()) {
          const letter = perm[i][0].toLowerCase();
          const surnamesWithSameLetter = perm.filter(
            (s) => s[0].toLowerCase() === letter,
          );
          if (surnamesWithSameLetter.length === 1) {
            matchIdx = i;
            break;
          }
        }
      }

      if (matchIdx === -1) continue;

      const matchedNameGen = declineNameGenitive(names[matchIdx], isFemale);

      conditions.push({
        type: "sameFirstLetterOwn",
        text: `У <span class="highlight">${matchedNameGen}</span> первая буква имени и фамилии совпадают.`,
        relevantInfo: { name: names[matchIdx], surname: perm[matchIdx] },
      });

      const otherIdx1 = (matchIdx + 1) % 3;
      const otherIdx2 = (matchIdx + 2) % 3;
      conditions.push({
        type: "notSurname",
        text: `<span class="highlight">${names[otherIdx1]}</span> не <span class="highlight">${perm[matchIdx]}</span>.`,
        relevantInfo: {
          name: names[otherIdx1],
          notSurname: perm[matchIdx],
          actualSurname: perm[otherIdx1],
        },
      });

      conditions.push({
        type: "notSurname",
        text: `<span class="highlight">${names[otherIdx2]}</span> не <span class="highlight">${perm[otherIdx1]}</span>.`,
        relevantInfo: {
          name: names[otherIdx2],
          notSurname: perm[otherIdx1],
          actualSurname: perm[otherIdx2],
        },
      });

      if (!validatePuzzle(names, perm, conditions)) {
        continue;
      }

      const matches = names.map((name, idx) => ({
        name: name,
        surname: perm[idx],
      }));

      const taskText = generateTaskTextV2(names, perm, conditions, personType);
      const reasoning = generateReasoningV2(
        names,
        perm,
        conditions,
        personType,
      );

      return {
        text: taskText,
        names: names,
        surnames: perm,
        correctMatches: matches,
        reasoning: reasoning,
        conditions: conditions,
      };
    }

    return null;
  }

  /**
   * Generate a logic puzzle
   */
  function generatePuzzle(names, surnames, personType) {
    const templates = [generateTemplate1, generateTemplate4];

    const shuffledTemplates = [...templates].sort(() => Math.random() - 0.5);

    for (const template of shuffledTemplates) {
      const result = template(names, surnames, personType);
      if (result) {
        return result;
      }
    }

    return null;
  }

  /**
   * Generate a complete logic puzzle task
   */
  function generateTask(data) {
    const useFemale = Math.random() > 0.5;
    const names = useFemale ? data.femaleNames : data.maleNames;
    const surnames = useFemale ? data.femaleSurnames : data.maleSurnames;
    const personType = useFemale ? "девочки" : "мальчики";

    // Проверка на минимальное количество данных
    if (!names || !surnames || names.length < 3 || surnames.length < 3) {
      console.error("Недостаточно данных для генерации задачи");
      return null;
    }

    const selectedIndices = [];
    while (selectedIndices.length < 3) {
      const idx = Math.floor(Math.random() * names.length);
      if (!selectedIndices.includes(idx)) {
        selectedIndices.push(idx);
      }
    }

    const selectedNames = selectedIndices.map((i) => names[i]);
    const selectedSurnames = selectedIndices.map((i) => surnames[i]);

    return generatePuzzle(selectedNames, selectedSurnames, personType);
  }

  /**
   * Build correct answer matrix
   */
  function buildCorrectMatrix(task) {
    const matrix = [];
    task.names.forEach((name, rowIdx) => {
      const row = [];
      task.surnames.forEach((surname, colIdx) => {
        const match = task.correctMatches.find((m) => m.name === name);
        row.push(match.surname === surname ? "plus" : "minus");
      });
      matrix.push(row);
    });
    return matrix;
  }

  /**
   * Shuffle array randomly
   */
  function shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // Export for use in pages
  if (typeof window !== "undefined") {
    window.VPR7_Task5_Generator = {
      FALLBACK_DATA,
      parseData,
      loadData,
      declineNameGenitive,
      declineSurnameGenitive,
      getPermutations,
      validatePuzzle,
      generateTaskTextV2,
      generateReasoningV2,
      generateTemplate1,
      generateTemplate4,
      generatePuzzle,
      generateTask,
      buildCorrectMatrix,
      shuffleArray,
    };
  }
})();
