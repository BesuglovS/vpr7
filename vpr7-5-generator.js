/**
 * VPR 7 - Task 5: Logic Puzzle Generator Module
 * Generates interactive logic puzzles matching names with surnames
 */

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
 * @param {string} text - Raw text data with # section markers
 * @returns {Object} - Object with femaleNames, maleNames, femaleSurnames, maleSurnames arrays
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
      currentSection = ""; // Skip common surnames
    } else if (line && !line.startsWith("#")) {
      if (currentSection === "femaleNames") data.femaleNames.push(line);
      else if (currentSection === "maleNames") data.maleNames.push(line);
      else if (currentSection === "femaleSurnames")
        data.femaleSurnames.push(line);
      else if (currentSection === "maleSurnames") data.maleSurnames.push(line);
    }
  });

  return data;
}

/**
 * Load logic puzzle data from file or use fallback
 * @param {string} filePath - Path to the data file
 * @returns {Promise<Object>} - Promise resolving to data object
 */
async function loadData(filePath = "vpr7-5.txt") {
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
 * @param {string} name - Name to decline
 * @param {boolean} isFemale - Whether the name is female
 * @returns {string} - Declined name
 */
function declineNameGenitive(name, isFemale) {
  if (isFemale) {
    // Female names ending in -а -> -ы or -и
    if (name.endsWith("а")) {
      const beforeLast = name.slice(-2, -1).toLowerCase();
      if (/[гкхжшчщ]/.test(beforeLast)) {
        return name.slice(0, -1) + "и";
      }
      return name.slice(0, -1) + "ы";
    }
    // Female names ending in -я -> -и
    if (name.endsWith("я")) {
      return name.slice(0, -1) + "и";
    }
    // Female names ending in soft sign -> -и
    if (name.endsWith("ь")) {
      return name.slice(0, -1) + "и";
    }
    return name;
  } else {
    // Male names ending in -й -> -я
    if (name.endsWith("й")) {
      return name.slice(0, -1) + "я";
    }
    // Male names ending in consonant -> -а
    if (/[бвгджзклмнпрстфхцчшщ]$/.test(name)) {
      return name + "а";
    }
    // Male names ending in -а -> -ы
    if (name.endsWith("а")) {
      return name.slice(0, -1) + "ы";
    }
    // Male names ending in -я -> -и
    if (name.endsWith("я")) {
      return name.slice(0, -1) + "и";
    }
    return name;
  }
}

/**
 * Decline surnames to genitive case
 * @param {string} surname - Surname to decline
 * @param {boolean} isFemale - Whether the surname is female
 * @returns {string} - Declined surname
 */
function declineSurnameGenitive(surname, isFemale) {
  if (isFemale) {
    // Female surnames ending in -а -> -ой
    if (surname.endsWith("а")) {
      return surname.slice(0, -1) + "ой";
    }
    return surname;
  } else {
    // Male surnames ending in consonant -> -а
    if (/[бвгджзйклмнпрстфхцчшщ]$/.test(surname)) {
      return surname + "а";
    }
    // Surnames ending in -й -> -я
    if (surname.endsWith("й")) {
      return surname.slice(0, -1) + "я";
    }
    // Surnames ending in -о don't decline
    if (surname.endsWith("о")) {
      return surname;
    }
    return surname;
  }
}

/**
 * Get all permutations of an array
 * @param {Array} arr - Array to permute
 * @returns {Array} - Array of all permutations
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
 * @param {Array} names - Array of names
 * @param {Array} surnames - Array of surnames (in name order)
 * @param {Array} conditions - Array of condition objects
 * @returns {boolean} - True if puzzle has unambiguous solution
 */
function validatePuzzle(names, surnames, conditions) {
  // Build matrix of possible matches
  const possible = {};
  names.forEach((name) => {
    possible[name] = new Set(surnames);
  });

  // Apply conditions to narrow down options
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
      const otherSurname = names.find((n) => n !== person1 && n !== person2);
      if (otherSurname) {
        possible[otherSurname].delete(condSurnames[0]);
        possible[otherSurname].delete(condSurnames[1]);
      }
    } else if (condition.type === "sameFirstLetterOwn") {
      const { name, surname } = condition.relevantInfo;
      possible[name] = new Set([surname]);
      names.forEach((n) => {
        if (n !== name) possible[n].delete(surname);
      });
    } else if (condition.type === "sameFirstLetter") {
      const { name2, surname2 } = condition.relevantInfo;
      possible[name2] = new Set([surname2]);
      names.forEach((n) => {
        if (n !== name2) possible[n].delete(surname2);
      });
    }
  }

  // Check for unambiguous solution
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

  // Verify uniqueness
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
 * @param {Array} names - Array of names
 * @param {Array} surnames - Array of surnames
 * @param {Array} conditions - Array of condition objects
 * @param {string} personType - "девочки" or "мальчики"
 * @returns {string} - HTML task text
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
 * @param {Array} names - Array of names
 * @param {Array} surnames - Array of surnames (in name order)
 * @param {Array} conditions - Array of condition objects
 * @param {string} personType - "девочки" or "мальчики"
 * @returns {Array} - Array of reasoning step strings
 */
function generateReasoningV2(names, surnames, conditions, personType) {
  const steps = [];
  const isFemale = personType === "девочки";
  const getSurname = (name) => surnames[names.indexOf(name)];

  const knownMatches = new Map();
  const excludedSurnames = new Map();

  for (const condition of conditions) {
    switch (condition.type) {
      case "notSurname": {
        const { name, notSurname } = condition.relevantInfo;
        if (!excludedSurnames.has(name)) {
          excludedSurnames.set(name, new Set());
        }
        excludedSurnames.get(name).add(notSurname);
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
        steps.push(
          `<span class="highlight">${person1}</span> и <span class="highlight">${person2}</span> имеют в фамилии букву «${upperLetter}». Значит, их фамилии – <span class="highlight">${condSurnames[0]}</span> и <span class="highlight">${condSurnames[1]}</span>.`,
        );

        if (knownMatches.has(person1)) {
          knownMatches.set(
            person2,
            condSurnames.find((s) => s !== knownMatches.get(person1)),
          );
        } else if (knownMatches.has(person2)) {
          knownMatches.set(
            person1,
            condSurnames.find((s) => s !== knownMatches.get(person2)),
          );
        }
        break;
      }

      case "sameFirstLetter": {
        const { name1, name2, surname2 } = condition.relevantInfo;
        steps.push(
          `У <span class="highlight">${name1}</span> имя начинается с «${name1[0].toUpperCase()}», значит фамилия <span class="highlight">${name2}</span> – <span class="highlight">${surname2}</span>.`,
        );
        knownMatches.set(name2, surname2);
        break;
      }

      case "differentFirstLetter": {
        const { name, surname } = condition.relevantInfo;
        steps.push(
          `У <span class="highlight">${name}</span> первая буква имени (${name[0].toUpperCase()}) отличается от первой буквы фамилии. Это условие помогает отсеять варианты.`,
        );
        break;
      }

      case "letterInName": {
        const { name1, name2, surname2, letter } = condition.relevantInfo;
        steps.push(
          `В фамилии <span class="highlight">${surname2}</span> есть буква из имени <span class="highlight">${name1}</span>. Фамилия <span class="highlight">${name2}</span> – <span class="highlight">${surname2}</span>.`,
        );
        knownMatches.set(name2, surname2);
        break;
      }

      case "differentFirstLetterSimple": {
        const { name1, name2, surname2 } = condition.relevantInfo;
        steps.push(
          `У <span class="highlight">${name1}</span> и фамилии <span class="highlight">${surname2}</span> первые буквы разные. Это исключает некоторые варианты.`,
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

  const foundMatches = [];
  for (const name of names) {
    const surname = getSurname(name);
    if (knownMatches.has(name)) {
      foundMatches.push(
        `<span class="highlight">${name}</span> – <span class="highlight">${surname}</span>`,
      );
    }
  }

  if (foundMatches.length > 0) {
    steps.push(`Ответ: ${foundMatches.join(", ")}.`);
  } else {
    const allMatches = names.map(
      (n) =>
        `<span class="highlight">${n}</span> – <span class="highlight">${getSurname(n)}</span>`,
    );
    steps.push(
      `Путём логических рассуждений определяем: ${allMatches.join(", ")}.`,
    );
  }

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

    // Find common letter in surnames of name2 and name3
    let commonLetter = null;
    for (const letter of surname2.toLowerCase()) {
      if (surname3.toLowerCase().includes(letter)) {
        commonLetter = letter;
        break;
      }
    }

    if (!commonLetter) {
      continue;
    }

    // Check that the third person (name1) does NOT have this letter in surname
    // This is required for the condition to be logically correct
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
    const reasoning = generateReasoningV2(names, perm, conditions, personType);

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
 * Template 2: With letters in surname
 */
function generateTemplate2(names, surnames, personType) {
  const isFemale = personType === "девочки";
  const permutations = getPermutations([...surnames]);

  for (const perm of permutations) {
    const getSurname = (name) => perm[names.indexOf(name)];

    for (let i = 0; i < names.length; i++) {
      for (let j = i + 1; j < names.length; j++) {
        const si = perm[i].toLowerCase();
        const sj = perm[j].toLowerCase();

        for (const letter of si) {
          if (sj.includes(letter)) {
            const thirdIdx = 3 - i - j;
            const thirdName = names[thirdIdx];
            const thirdSurname = perm[thirdIdx];

            // Check that the third person does NOT have this letter in surname
            // This is required for the condition to be logically correct
            if (!thirdSurname.toLowerCase().includes(letter)) {
              const conditions = [];

              const nameiGen = declineNameGenitive(names[i], isFemale);
              const namejGen = declineNameGenitive(names[j], isFemale);
              conditions.push({
                type: "sameLetterInSurname",
                text: `У <span class="highlight">${nameiGen}</span> и у <span class="highlight">${namejGen}</span> в фамилии есть буква «${letter.toUpperCase()}».`,
                relevantInfo: {
                  person1: names[i],
                  person2: names[j],
                  letter: letter,
                  surnames: [perm[i], perm[j]],
                },
              });

              conditions.push({
                type: "notSurname",
                text: `<span class="highlight">${thirdName}</span> не <span class="highlight">${perm[i]}</span>.`,
                relevantInfo: {
                  name: thirdName,
                  notSurname: perm[i],
                  actualSurname: thirdSurname,
                },
              });

              conditions.push({
                type: "notSurname",
                text: `<span class="highlight">${names[i]}</span> не <span class="highlight">${perm[j]}</span>.`,
                relevantInfo: {
                  name: names[i],
                  notSurname: perm[j],
                  actualSurname: perm[i],
                },
              });

              if (!validatePuzzle(names, perm, conditions)) {
                continue;
              }

              const matches = names.map((name, idx) => ({
                name: name,
                surname: perm[idx],
              }));

              const taskText = generateTaskTextV2(
                names,
                perm,
                conditions,
                personType,
              );
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
          }
        }
      }
    }
  }

  return null;
}

/**
 * Template 3: With first letters
 */
function generateTemplate3(names, surnames, personType) {
  const isFemale = personType === "девочки";
  const permutations = getPermutations([...surnames]);

  for (const perm of permutations) {
    const conditions = [];

    let foundMatch = false;
    for (let i = 0; i < names.length && !foundMatch; i++) {
      for (let j = 0; j < names.length && !foundMatch; j++) {
        if (i !== j && names[i][0].toLowerCase() === perm[j][0].toLowerCase()) {
          const letter = perm[j][0].toLowerCase();
          const surnamesWithSameLetter = perm.filter(
            (s) => s[0].toLowerCase() === letter,
          );
          if (surnamesWithSameLetter.length > 1) {
            continue;
          }

          foundMatch = true;

          const name1Gen = declineNameGenitive(names[i], isFemale);
          const name2Gen = declineNameGenitive(names[j], isFemale);

          conditions.push({
            type: "sameFirstLetter",
            text: `У <span class="highlight">${name1Gen}</span> первая буква имени такая же, как первая буква фамилии у <span class="highlight">${name2Gen}</span>.`,
            relevantInfo: {
              name1: names[i],
              name2: names[j],
              surname2: perm[j],
            },
          });

          const k = 3 - i - j;
          conditions.push({
            type: "notSurname",
            text: `<span class="highlight">${names[k]}</span> не <span class="highlight">${perm[i]}</span>.`,
            relevantInfo: {
              name: names[k],
              notSurname: perm[i],
              actualSurname: perm[k],
            },
          });

          conditions.push({
            type: "notSurname",
            text: `<span class="highlight">${names[j]}</span> не <span class="highlight">${perm[k]}</span>.`,
            relevantInfo: {
              name: names[j],
              notSurname: perm[k],
              actualSurname: perm[j],
            },
          });

          if (!validatePuzzle(names, perm, conditions)) {
            foundMatch = false;
            conditions.length = 0;
            continue;
          }

          const matches = names.map((name, idx) => ({
            name: name,
            surname: perm[idx],
          }));

          const taskText = generateTaskTextV2(
            names,
            perm,
            conditions,
            personType,
          );
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
      }
    }
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
    const reasoning = generateReasoningV2(names, perm, conditions, personType);

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
 * @param {Array} names - Array of 3 names
 * @param {Array} surnames - Array of 3 surnames
 * @param {string} personType - "девочки" or "мальчики"
 * @returns {Object|null} - Task object or null if cannot generate
 */
function generatePuzzle(names, surnames, personType) {
  const templates = [
    generateTemplate1,
    generateTemplate2,
    generateTemplate3,
    generateTemplate4,
  ];

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
 * @param {Object} data - Data object with femaleNames, maleNames, femaleSurnames, maleSurnames arrays
 * @returns {Object|null} - Task object or null if cannot generate
 */
function generateTask(data) {
  // Choose task type (male or female)
  const useFemale = Math.random() > 0.5;
  const names = useFemale ? data.femaleNames : data.maleNames;
  const surnames = useFemale ? data.femaleSurnames : data.maleSurnames;
  const personType = useFemale ? "девочки" : "мальчики";

  // Select 3 names and corresponding surnames
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
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} arr - Array to shuffle
 * @returns {Array} - Shuffled array (same reference)
 */
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Build correct answer matrix
 * @param {Object} task - Task object from generateTask
 * @returns {Array} - 2D array of "plus" or "minus" strings
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
    generateTemplate2,
    generateTemplate3,
    generateTemplate4,
    generatePuzzle,
    generateTask,
    shuffleArray,
    buildCorrectMatrix,
  };
}

// Export for ES6 modules if supported
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
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
    generateTemplate2,
    generateTemplate3,
    generateTemplate4,
    generatePuzzle,
    generateTask,
    shuffleArray,
    buildCorrectMatrix,
  };
}
