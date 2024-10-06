// NumerologyDetail.js
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

const ageBasedValues = {
  Jan: {
      "18-31": "GBGBGBBGBGBGBB",
      "32-45": "BGBGBBGBGBGBBG"
  },
  Feb: {
      "18-31": "BGBGBBGBGBGBGG",
      "32-45": "GBBGBGBGBGBBGG"
  },
  Mar: {
      "18-31": "GBGGBGBBBGBGGB",
      "32-45": "BGBBGBGBGBBBGG"
  },
  Apr: {
      "18-31": "BGBGGBBGGBGGGG",
      "32-45": "GGGGBGBBGBGBBG"
  },
  May: {
      "18-31": "BGBGBBGGGGGBGG",
      "32-45": "GGGGGBGGBGBGBG"
  },
  Jun: {
      "18-31": "BBBGGGBBBGGBGG",
      "32-45": "GGGGGGBGBBGBGB"
  },
  Jul: {
      "18-31": "BBBGGBBGGBBBGG",
      "32-45": "GBGBGBGBGBBGBG"
  },
  Aug: {
      "18-31": "BBBGBGGBBBBGGG",
      "32-45": "GGGGBGBGBGBBGB"
  },
  Sep: {
      "18-31": "BBBGGBGBGBBBGG",
      "32-45": "GGGGBBGBGBGBBG"
  },
  Oct: {
      "18-31": "BBGGGBGBGBBGGG",
      "32-45": "GGBBBGBGBGBBGB"
  },
  Nov: {
      "18-31": "BGBGGBGBGGGGBG",
      "32-45": "BBBBBBGGGBGBGB"
  },
  Dec: {
      "18-31": "BGBGGGGBGBGGBB",
      "32-45": "BBBBBBGGGBGBGB"
  }
};

const getBGValue = (month, age) => {
  const rangeKey = age >= 18 && age <= 31 ? "18-31" : age >= 32 && age <= 45 ? "32-45" : null;
  if (!rangeKey || !ageBasedValues[month] || !ageBasedValues[month][rangeKey]) {
      return null;
  }
  const index = age % 14; // Using mod 14 to cycle through the values
  return ageBasedValues[month][rangeKey][index];
};


const useNumerology = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [anotherDate, setAnotherDate] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [parighatnaAnk, setParighatnaAnk] = useState([]);
  const [summedNumber, setSummedNumber] = useState(null);
  const [luShuGrid, setLuShuGrid] = useState(Array(9).fill(''));
  const [PaschimluShuGrid, setPaschimLuShuGrid] = useState(Array(9).fill(''));
  const [mulank, setMulank] = useState('');
  const [bhagyank, setBhagyank] = useState('');
  const [chunotiNumbers, setChunotiNumbers] = useState([]);
  const [kalashNumbers, setKalashNumbers] = useState([]);
  const [personalYear, setPersonalYear] = useState('');
  const [personalMonth, setPersonalMonth] = useState('');
  const [janamBalKaalNumbers, setJanamBalKaalNumbers] = useState([]);
  const [animal, setAnimal] = useState('');
  const [month, setMonth] = useState('');
  const [age, setAge] = useState('');
  const [value, setValue] = useState('');
  const [tdateOfBirth, settDateOfBirth] = useState(new Date().toISOString().slice(0, 10));
  const [tluShuGrid, settLuShuGrid] = useState(Array(9).fill(''));
  const [tmulank, settMulank] = useState('');
  const [tbhagyank, settBhagyank] = useState('');
  const [pythagorean, setPythagorean] = useState('');
  const [chaldean, setChaldean] = useState('');
  const [pythagoreanGrid, setPythagoreanGrid] = useState([]);
  const [paschimPythagoreanGrid, setPaschimPythagoreanGrid] = useState([]);
  const [chinesePythagoreanGrid, setChinesePythagoreanGrid] = useState([]);
  const [chaldeanGrid, setChaldeanGrid] = useState([]);
  const [paschimChaldeanGrid, setPaschimChaldeanGrid] = useState([]);
  const [chineseChaldeanGrid, setChineseChaldeanGrid] = useState([]);
  const [heartDesire, setHeartDesire] = useState('');
  const [personality, setPersonality] = useState('');
  const [namank, setNamank] = useState('');
  const [habitNumber, setHabitNumber] = useState('');
  const [firstCharacter, setFirstCharacter] = useState('');
  const [firstVowel, setFirstVowel] = useState('');
  const animals = ['RAT', 'OX', 'TIGER', 'RABBIT', 'DRAGON', 'SNAKE', 'HORSE', 'SHEEP', 'MONKEY', 'ROOSTER', 'DOG', 'PIG'];
  const navigation = useNavigation(); // For navigation

  const calculateSingleDigit = (number) => {
    while (number > 9 && number !== 11 && number !== 22) {
      number = number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return number;
  };

  const calculateChunotiNumbers = (dob) => {
    const [year, month, day] = dob.split('-').map(Number);
    const daySingle = calculateSingleDigit(day);
    const monthSingle = calculateSingleDigit(month);
    const yearSingle = calculateSingleDigit(year);

    const firstChunoti = Math.abs(daySingle - monthSingle);
    const secondChunoti = Math.abs(daySingle - yearSingle);
    const thirdChunoti = Math.abs(firstChunoti - secondChunoti);
    const fourthChunoti = Math.abs(monthSingle - yearSingle);

    return [firstChunoti, secondChunoti, thirdChunoti, fourthChunoti];
  };

  const calculateKalashNumbers = (dob) => {
    const [year, month, day] = dob.split('-').map(Number);
    const daySingle = calculateSingleDigit(day);
    const monthSingle = calculateSingleDigit(month);
    const yearSingle = calculateSingleDigit(year);

    const firstKalash = daySingle + monthSingle;
    const secondKalash = daySingle + yearSingle;
    const thirdKalash = firstKalash + secondKalash;
    const fourthKalash = monthSingle + yearSingle;

    if (year) {
      const animalIndex = (parseInt(year, 10) - 4) % 12;
      const chineseZodiacAnimal = animals[animalIndex];
      setAnimal(chineseZodiacAnimal);
    } else {
      alert('Please enter a valid year.');
    }

    return [firstKalash, secondKalash, thirdKalash, fourthKalash].map(calculateSingleDigit);
  };

  const calculatePersonalYearAndMonth = (dob, anotherDate) => {
    const [dobYear, dobMonth, dobDay] = dob.split('-').map(Number);
    const [anotherYear, anotherMonth] = anotherDate.split('-').map(Number);
    const dobDaySingle = calculateSingleDigit(dobDay);
    const dobMonthSingle = calculateSingleDigit(dobMonth);
    const anotherYearSingle = calculateSingleDigit(anotherYear);

    const personalYearValue = calculateSingleDigit(dobDaySingle + dobMonthSingle + anotherYearSingle);
    const anotherMonthSingle = calculateSingleDigit(anotherMonth);
    const personalMonthValue = calculateSingleDigit(personalYearValue + anotherMonthSingle);

    return [personalYearValue, personalMonthValue];
  };

  const calculateMulank = (dob) => {
    let day = dob.split('-')[2];
    let sum = day.split('').reduce((total, num) => total + parseInt(num), 0);
    return sum > 9 ? calculateMulank(sum.toString()) : sum;
  };

  const calculateBhagyank = (dob) => {
    let sum = dob.split('-').join('').split('').reduce((total, num) => total + parseInt(num), 0);
    return sum > 9 ? calculateBhagyank(sum.toString()) : sum;
  };

  const calculateJanamBalKaal = (dob) => {
    const [year, month, day] = dob.split('-').map(Number);
    const monthSingle = calculateSingleDigit(month);
    const daySingle = calculateSingleDigit(day);
    const yearSingle = calculateSingleDigit(year);
    return [monthSingle, daySingle, yearSingle];
  };

  const populateLuShuGrid = () => {
    let numbers = dateOfBirth.split('-').join('').split('').map(Number);
    let pattern = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    let occurrences = {};
    for (let number of numbers) {
      occurrences[number] = occurrences[number] ? occurrences[number] + 1 : 1;
    }
    let grid = pattern.map((num) => occurrences[num] || '');
    return grid;
  };

const handleGenerate = () => {
  setLuShuGrid(populateLuShuGrid());
  setPaschimLuShuGrid(populateLuShuGrid());
  setMulank(calculateMulank(dateOfBirth));
  setBhagyank(calculateBhagyank(dateOfBirth));
  setChunotiNumbers(calculateChunotiNumbers(dateOfBirth));
  setKalashNumbers(calculateKalashNumbers(dateOfBirth));
  setJanamBalKaalNumbers(calculateJanamBalKaal(dateOfBirth));
  const [personalYearValue, personalMonthValue] = calculatePersonalYearAndMonth(dateOfBirth, anotherDate);
  setPersonalYear(personalYearValue);
  setPersonalMonth(personalMonthValue);
  const bgValue = getBGValue(month, parseInt(age, 10));
  setValue(bgValue);
  const parsedNumber = parseInt(inputNumber, 10);
  if (!isNaN(parsedNumber)) {
      const singleDigitSum = calculateSingleDigitSum(parsedNumber);
      setSummedNumber(singleDigitSum);
  } else {
      alert('Please enter a valid number.');
  }
  if (inputValue.trim() === '') {
    alert("Name must be filled out");
  } else {
    const nameParts = inputValue.split(' ');
    const allData = nameParts.map(part => generateTableData(part));
    setTableData(allData);
    const parighatnaAnkArray = calculateParighatnaAnkValues(nameParts);
    setParighatnaAnk(parighatnaAnkArray);
  }
  if (inputValue.trim() === '') {
    alert("Name or City must be filled out");
} else {
    const firstSpaceIndex = inputValue.indexOf(' ');
    const firstPart = firstSpaceIndex !== -1 ? inputValue.substring(0, firstSpaceIndex) : inputValue;

    let sumPyt = 0;
    let sumChal = 0;
    let heartDesireSum = 0;
    let personalitySum = 0;

    let firstCharacter = '';
    let firstVowel = '';
    let foundVowel = false;

    for (let i = 0; i < inputValue.length; i++) {
        const char = inputValue[i];
        const pytValue = casePyt(char);
        const chalValue = caseChal(char);
        sumPyt += pytValue;
        sumChal += chalValue;

        if (!firstCharacter && /[a-zA-Z]/.test(char)) {
            firstCharacter = char;
        }

        if (!foundVowel && 'aeiou'.includes(char.toLowerCase())) {
            firstVowel = char;
            foundVowel = true;
        }

        if ('aeiou'.includes(char.toLowerCase())) {
            heartDesireSum += pytValue;
        } else if (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z') {
            personalitySum += pytValue;
        }
    }

    const heartDesire = calculateSum(heartDesireSum.toString());
    const personality = calculateSum(personalitySum.toString());

    let resultPyt = sumPyt.toString();
    let resultChal = sumChal.toString();

    resultPyt = calculateSum(resultPyt);
    resultChal = calculateSum(resultChal);

    const pythagoreanGrid = generateGrid(inputValue, casePyt);
    const chaldeanGrid = generateGrid(inputValue, caseChal);

    const paschimPythagoreanGrid = generatePaschimGrid(pythagoreanGrid);
    const chinesePythagoreanGrid = generateChineseGrid(pythagoreanGrid);
    const paschimChaldeanGrid = generatePaschimGrid(chaldeanGrid);
    const chineseChaldeanGrid = generateChineseGrid(chaldeanGrid);

    const finalPyt = `${resultPyt}`;
    const finalChal = `${resultChal}`;

    let habitNumber = 0;
    const parts = inputValue.split(' ');
    parts.forEach(part => {
        let partSum = part.length;
        if (partSum > 9 && partSum !== 11 && partSum !== 22) {
            partSum = calculateSum(partSum.toString());
        }
        habitNumber += partSum;
    });
    if (habitNumber > 9 && habitNumber !== 11 && habitNumber !== 22) {
        habitNumber = calculateSum(habitNumber.toString());
    }

    let namank = 0;
    for (let i = 0; i < firstPart.length; i++) {
        namank += casePyt(firstPart[i]);
    }
    namank = calculateSum(namank.toString());

    setPythagorean(finalPyt);
    setChaldean(finalChal);
    setPythagoreanGrid(pythagoreanGrid);
    setPaschimPythagoreanGrid(paschimPythagoreanGrid);
    setChinesePythagoreanGrid(chinesePythagoreanGrid);
    setChaldeanGrid(chaldeanGrid);
    setPaschimChaldeanGrid(paschimChaldeanGrid);
    setChineseChaldeanGrid(chineseChaldeanGrid);
    setHeartDesire(`${heartDesire}`);
    setPersonality(`${personality}`);
    setNamank(`${namank}`);
    setHabitNumber(`${habitNumber}`);
    setFirstCharacter(`${firstCharacter}`);
    setFirstVowel(`${firstVowel}`);
}
Alert.alert('Submitted Data Check the Numerology Tab')
};


  const calculatetMulank = (dob) => {
    if (!dob) return '';
    let day = dob.split('-')[2] || '';
    if (!day) return '';
    let sum = day.split('').reduce((total, num) => total + parseInt(num), 0);
    return sum > 9 ? calculatetMulank(sum.toString()) : sum;
  };

  const calculatetBhagyank = (dob) => {
    if (!dob) return '';
    let sum = dob.split('-').join('').split('').reduce((total, num) => total + parseInt(num), 0);
    return sum > 9 ? calculatetBhagyank(sum.toString()) : sum;
  };

  const populatetLuShuGrid = () => {
    if (!tdateOfBirth) return;
    let numbers = dateOfBirth.split('-').join('').split('').map(Number);
    let pattern = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    let occurrences = {};
    numbers.forEach(num => {
      if (num !== 0) {
        occurrences[num] = (occurrences[num] || 0) + 1;
      }
    });
    let grid = Array(9).fill('').map((_, i) => {
      return occurrences[pattern[i]] > 0 ? pattern[i].toString().repeat(occurrences[pattern[i]]) : '';
    });
    settLuShuGrid(grid);

    let mulankValue = calculatetMulank(dateOfBirth);
    let bhagyankValue = calculatetBhagyank(dateOfBirth);
    settMulank(`${mulankValue}`);
    settBhagyank(`${bhagyankValue}`);
  };

  useEffect(() => {
    populatetLuShuGrid(); // Automatically populate Lu Shu Grid on component mount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const calculateSingleDigitSum = (number) => {
    let sum = 0;
    number.toString().split('').forEach((digit) => {
        sum += parseInt(digit, 10);
    });
    while (sum > 9) {
        sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }
    return sum;
};

const handleInputChange = (e) => {
    setInputNumber(e.target.value);
};

const pythagoreanValues = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const generateTableData = (namePart) => {
  if (!namePart) return [];
  const chars = namePart.toLowerCase().split('');
  const values = chars.map(char => pythagoreanValues[char] || 0);
  const data = [];

  values.forEach((value, index) => {
      for (let i = 0; i < value; i++) {
          data.push({
              character: chars[index],
              value,
          });
      }
  });

  return data;
};

const calculateParighatnaAnkValues = (nameParts) => {
  const parighatnaAnkArray = [];
  nameParts.forEach(part => {
      const chars = part.toLowerCase().split('');
      let sum = 0;

      chars.forEach(char => {
          sum += pythagoreanValues[char] || 0;
      });

      sum = reduceToSingleDigit(sum);
      parighatnaAnkArray.push(sum);
  });

  return parighatnaAnkArray;
};

const reduceToSingleDigit = (num) => {
  while (num > 9) {
      num = num.toString().split('').reduce((total, digit) => total + parseInt(digit), 0);
  }
  return num;
};

const casePyt = (val) => {
  switch (val.toLowerCase()) {
      case 'a':
      case 'j':
      case 's':
          return 1;
      case 'b':
      case 'k':
      case 't':
          return 2;
      case 'c':
      case 'l':
      case 'u':
          return 3;
      case 'd':
      case 'm':
      case 'v':
          return 4;
      case 'e':
      case 'n':
      case 'w':
          return 5;
      case 'f':
      case 'o':
      case 'x':
          return 6;
      case 'g':
      case 'p':
      case 'y':
          return 7;
      case 'h':
      case 'q':
      case 'z':
          return 8;
      case 'i':
      case 'r':
          return 9;
      default:
          return 0;
  }
};

const caseChal = (val) => {
  switch (val.toLowerCase()) {
      case 'a':
      case 'i':
      case 'j':
      case 'q':
      case 'y':
          return 1;
      case 'b':
      case 'k':
      case 'r':
          return 2;
      case 'c':
      case 'g':
      case 'l':
      case 's':
          return 3;
      case 'd':
      case 'm':
      case 't':
          return 4;
      case 'e':
      case 'h':
      case 'n':
      case 'x':
          return 5;
      case 'u':
      case 'v':
      case 'w':
          return 6;
      case 'o':
      case 'z':
          return 7;
      case 'f':
      case 'p':
          return 8;
      default:
          return 0;
  }
};

const generateGrid = (name, numerologyFunc) => {
  const grid = Array(9).fill(0);
  for (let char of name) {
      const value = numerologyFunc(char);
      if (value > 0) {
          grid[value - 1]++;
      }
  }
  return grid;
};

const generateChineseGrid = (grid) => {
  const pattern = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  return Array(9).fill('').map((_, i) => {
      const count = grid[pattern[i] - 1];
      return count > 0 ? pattern[i].toString().repeat(count) : '';
  });
};

const generatePaschimGrid = (grid) => {
  const pattern = [3, 6, 9, 2, 5, 8, 1, 4, 7];
  return Array(9).fill('').map((_, i) => {
      const count = grid[pattern[i] - 1];
      return count > 0 ? pattern[i].toString().repeat(count) : '';
  });
};

const calculateSum = (str) => {
  let sum = str.split('').reduce((acc, char) => acc + parseInt(char), 0);
  while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum.toString().split('').reduce((acc, char) => acc + parseInt(char), 0);
  }
  return sum;
};


  return {
    dateOfBirth,
    month,
    age,
    setAge,
    setMonth,
    setDateOfBirth,
    anotherDate,
    setAnotherDate,
    luShuGrid,
    PaschimluShuGrid,
    mulank,
    bhagyank,
    chunotiNumbers,
    kalashNumbers,
    personalYear,
    personalMonth,
    janamBalKaalNumbers,
    animal,
    value,
    tbhagyank,
    tluShuGrid,
    tmulank,
    inputNumber,
    tableData,
    inputValue,
    setInputValue,
   handleInputChange,
   summedNumber,
   pythagorean,
   chaldean,
   heartDesire,
   personality,
   namank,
   habitNumber,
   firstCharacter,
   firstVowel,
   paschimPythagoreanGrid,
   chinesePythagoreanGrid,
   paschimChaldeanGrid,
   chineseChaldeanGrid,
    handleGenerate,
  };
};

export default useNumerology;
