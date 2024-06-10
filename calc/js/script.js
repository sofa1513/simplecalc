console.log("Чтобы начать напиши комманду - calculator('');");
console.log("в кавычках пиши то,что хочешь посчитать.");
console.log('');
console.log("Например: calculator('9 - 2');");
console.log("Или: calculator('X + III');");


function calculator(str) {


// -to array-function  из строки в массив
function convertToArr(string) {
    let array = string.split(' ');
    return array 
}

//-convertation-function из римских в арабские 
let numbersObj = {
    'I': 1,
    'V': 5,
    'X': 10,
    'II': 2,
    'IV': 4,
    'VI': 6,
    'IX': 9,
    'III': 3,
    'VII': 7,
    'VIII': 8,
};

function convertToArabNum(stringTest) { 
    for(let key in numbersObj) {
      if (key.includes(stringTest)) {
        let num = numbersObj[key];
        return num;
      }
    }
    return +stringTest
}

//-calculator-function 
function calc(a, b, c) {
    switch (b) {
      case '+' : 
      res = a + c;
      break;
      case '-' : 
      res = a - c;
      break;
      case '*' : 
      res = a * c;
      break;
      case '/' : 
      res = parseInt(a / c);
      break;
      default : 
      res = 'incorrect';
      break;
    }
    return res
}

// convertation  конвертируем в римские 

let numbers = {
    'I': 1,
    'IV': 4,
    'V': 5,
    'IX': 9,
    'X': 10,
    'XL': 40,
    'L': 50,
    'XC': 90,
    'C': 100,
  };

//-convertation--function  конвертируем единицы
let keyArr = [];

function conwertToRomanUnit(a) {
  if (a < 1) {
    return ''
  }
  for(let key in numbers) {
  
    if (numbers[key] == a) {
      keyArr.unshift(key);
      let roman = keyArr.join('');
      keyArr = [];
      return roman;
    }

  }
  
  a = a - 1;
  keyArr.unshift('I');
  return conwertToRomanUnit(a);
}
//-
function separateToTen(tenNumb) {
    tenNumb = String(tenNumb);
    return tenNumb[0] * 10
  }
  
  function separateToUnit(tenNumb) {
    tenNumb = String(tenNumb);
    return +tenNumb[1]
  }

//-convertation-function  конвертируем десятки
let keyArrTen = [];

function conwertToRomanTen(a) {
  for(let key in numbers) {
  
    if (numbers[key] == a) {
      keyArrTen.unshift(key);
      let romanTen = keyArrTen.join('');
      keyArrTen = [];
      return romanTen;
    }

  }
  
  a = a - 10;
  keyArrTen.unshift('X');
  return conwertToRomanTen(a);
}

//-convertation-function-final  
function conwertToRoman(stringArabicNum) {
  if (stringArabicNum === 'incorrect') {
    throw 'выражение записано некорректно'
  }
  let arabicNum = Number(stringArabicNum);

  if(arabicNum == 100) {
    return 'C'
  } else if (arabicNum < 100 && (arabicNum >= 10)) {
    return conwertToRomanTen(separateToTen(stringArabicNum)) + conwertToRomanUnit(separateToUnit(stringArabicNum))
  } else if (arabicNum < 10 && (arabicNum > 0)) {
    return conwertToRomanUnit(arabicNum)
  }  
  return ''
}

//-work-function-
  if (isFinite(str)) { 
    throw 'ой, введен не строчный тип данных'
  }
  let array = convertToArr(str);

  if (array.length > 3) {
    throw 'грустно, но формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)'
  } else if (array.length < 3) {
    throw 'печально, что строка не является математической операцией'
  } else if (isNaN(+array[0]) && +array[2] >= 0 || +array[0] >= 0 && isNaN(+array[2])) {
    throw 'исправься, выражение записано некорректно'
  } else if (+array[0] > 10 || +array[0] <= 0 || +array[2] > 10 || +array[2] <= 0) {
    throw 'дружок, операнды должны лежать в диапазоне от 1 до 10 включительно, без ноля'
  }
  let a = convertToArabNum(array[0]);
  let b = array[1];
  let c = convertToArabNum(array[2]);

  if (Number.isInteger(+a) && Number.isInteger(+c)) {
    let result = calc(a, b, c);
    if (isNaN(+array[0])) {
      return conwertToRoman(result) 
    } else if (result === 'incorrect') {
        throw 'исправься, выражение записано некорректно'
    }
    return String(result)
  }
  throw 'Калькулятор еще маленький и умеет работать только с целыми числами'
}















/* 


const romaValues = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
}

const calcActions = {
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
}


function testValues(val, index) {
  if (index === 1) {
    return [calcActions[val] ?? false, 'O'];
  } else {
    const roma = romaValues[val];
    if (roma) return [roma, 'R'];
    const arab = Number(val);
    if (!isNaN(arab) && arab > 0 && arab <= 10) {
      return [arab, 'A'];
    }
    return [false, 'E'];
  }
}


function romanize(num) {
  if (num < 1) return '';
  const digits = num.toString().split('');
  const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
  ];
  let roman = '';
  let i = 3;
  while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return roman;
}

/
function transformAnswer(res, arab) {
  return `Результат: ${arab ? Math.floor(res).toString() : romanize(Math.floor(res))}`;
}


function calculator(calcString) {
  if (typeof calcString !== 'string') throw new Error('NOT String');
  
  let calcValues = calcString.trim().split(' ');
  // 
  if (calcValues.length !== 3) throw new Error('Неправильная строка');
  let noError = true;
  const arabRim = [];
  const errorIndex = [];
  calcValues = calcValues.map((item, index) => {
    const [res, v] = testValues(item, index);
    if (res) {
      if (v !== 'O') arabRim.push(v);
    } else {
      noError = false;
      errorIndex.push(`${item} ${v === 'E' ? 'Ошибка преобразования' : v === 'O' ? 'Неправильный оператор' : 'Ошибка диапазона'}`)
    }
    return res
  });
  if (!noError) {
    throw new Error(errorIndex.join('; '))
  }
  if (arabRim[0] !== arabRim[1]) {
    throw new Error('Разные системы счисления')
  }

  switch (calcValues[1]) {
    case '+':
      return transformAnswer(calcValues[0] + calcValues[2], arabRim[0] === 'A');
    case '-':
      return transformAnswer(calcValues[0] - calcValues[2], arabRim[0] === 'A');
    case '*':
      return transformAnswer(calcValues[0] * calcValues[2], arabRim[0] === 'A');
    case '/':
      return transformAnswer(calcValues[0] / calcValues[2], arabRim[0] === 'A');
    default:
      throw new Error('Неизвестный математический оператор')
  }
} 




const numRome = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
};

function calculator(string) {
  res = getResCalc(string);
  return res;
}

function getResCalc(string) {
  num = parsStr(string);

  sign = parsSign(num[1]);

  resNum = parsNum(num[0], num[2], sign);

  return resNum;
}

function parsStr(str) {
  items = str.split(' ');
  lenItems = items.length;
  if (lenItems == 3) {
    return items;
  }
  throw new Error(`expected len: 2; got: ${lenItems}`);
}

function parsSign(sign) {
  if (~op.indexOf(sign)) {
    return sign;
  }
  throw new Error(`expected: +, -, *, /; got: ${sign}`);
}

function parsNum(num, numLast, sign) {
  if (num < 11 && num > 0 && numLast > 0 && numLast < 11) {
    return mathOper(num, numLast, sign);
  } else if (num in numRome && numLast in numRome) {
    return mathOperRome(numRome[num], numRome[numLast], sign);
  }
  throw new Error(`unknown values: '${num}' and '${numLast}'`);
}

function mathOperRome(num, numLast, sign) {
  item = mathOper(num, numLast, sign);
  if (item < 0) {
    return ' ';
  }
  symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  result = '';
  for (i = 0; i < symbols.length; i++) {
    while (item >= values[i]) {
      result += symbols[i];
      item -= values[i];
    }
  }
  return result;
}

function mathOper(left, right, sign) {
  l = Number(left);
  r = Number(right);
  switch (sign) {
    case '+':
      return l + r;
    case '-':
      return l - r;
    case '/':
      return Math.floor(l / r);
    case '*':
      return l * r;
  } */ 











  function calculator(str) {
    // Функция для преобразования римских цифр в арабские
    function fromRoman(roman) {
      const romanNumerals = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
      };
  
      let result = 0;
      let previousValue = 0;
      for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanNumerals[roman[i]];
        if (currentValue >= previousValue) {
          result += currentValue;
        } else {
          result -= currentValue;
        }
        previousValue = currentValue;
      }
      return result;
    }
  
    // Функция для преобразования арабских цифр в римские
    function toRoman(num) {
      const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
      ];
  
      let result = "";
      for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i][1]) {
          result += romanNumerals[i][0];
          num -= romanNumerals[i][1];
        }
      }
      return result;
    }
  
    // Разбиваем строку на операнды и операцию
    const regex = /^(.*?)([+\-*\/])(.*?)$/;
    const match = str.match(regex);
    if (!match) {
      return "Некорректный формат строки.";
    }
  
    const operand1 = match[1].trim();
    const operator = match[2].trim();
    const operand2 = match[3].trim();
  
    let result;
  
    // Проверяем, являются ли операнды римскими цифрами
    const isRomanNumeral = /^[IVXLCDM]+$/;
  
    if (isRomanNumeral.test(operand1) && isRomanNumeral.test(operand2)) {
      // Если оба операнда являются римскими цифрами, выполняем операцию
      const arabic1 = fromRoman(operand1);
      const arabic2 = fromRoman(operand2);
  
      let arabicResult;
      switch (operator) {
        case "+":
          arabicResult = arabic1 + arabic2;
          break;
        case "-":
          arabicResult = arabic1 - arabic2;
          break;
        case "*":
          arabicResult = arabic1 * arabic2;
          break;
        case "/":
          arabicResult = arabic1 / arabic2;
          break;
        default:
          return "Некорректный оператор.";
      }
  
      result = toRoman(arabicResult);
    } else {
      // Если операнды не являются римскими цифрами, преобразуем их в числа и выполняем операцию
      const num1 = parseFloat(operand1);
      const num2 = parseFloat(operand2);
  
      if (isNaN(num1) || isNaN(num2)) {
        return "Некорректные операнды.";
      }
  
      switch (operator) {
        case "+":
          result = (num1 + num2).toString();
          break;
        case "-":
          result = (num1 - num2).toString();
          break;
        case "*":
          result = (num1 * num2).toString();
          break;
        case "/":
          result = Math.floor(num1 / num2).toString();
        break;
      default:
        return "Некорректный оператор.";
    }
  
 

  return result;
  
    
    }



























    function calculator(str) {
      // Функция для преобразования римских цифр в арабские
      function fromRoman(roman) {
        const romanNumerals = {
          I: 1,
          V: 5,
          X: 10,
          L: 50,
          C: 100,
          D: 500,
          M: 1000
        };
    
        let result = 0;
        let previousValue = 0;
        for (let i = roman.length - 1; i >= 0; i--) {
          const currentValue = romanNumerals[roman[i]];
          if (currentValue >= previousValue) {
            result += currentValue;
          } else {
            result -= currentValue;
          }
          previousValue = currentValue;
        }
        return result;
      }
    
      // Функция для преобразования арабских цифр в римские
      function toRoman(num) {
        const romanNumerals = [
          ["M", 1000],
          ["CM", 900],
          ["D", 500],
          ["CD", 400],
          ["C", 100],
          ["XC", 90],
          ["L", 50],
          ["XL", 40],
          ["X", 10],
          ["IX", 9],
          ["V", 5],
          ["IV", 4],
          ["I", 1]
        ];
    
        let result = "";
        for (let i = 0; i < romanNumerals.length; i++) {
          while (num >= romanNumerals[i][1]) {
            result += romanNumerals[i][0];
            num -= romanNumerals[i][1];
          }
        }
        return result;
      }
    
      // Разбиваем строку на операнды и операцию
      const regex = /^(.*?)([+\-*\/])(.*?)$/;
      const match = str.match(regex);
      if (!match) {
        throw new Error("Некорректный формат строки.");
      }
    
      const operand1 = match[1].trim();
      const operator = match[2].trim();
      const operand2 = match[3].trim();
    
      // Корректность формата строки
       if ((str.match(/[\+\-\*\/]/g) || []).length > 1) {
        throw new Error("Некорректный формат строки.");
      } 
      
      let result;
    
      // Проверяем, являются ли операнды римскими цифрами
      const isRomanNumeral = /^[IVXLCDM]+$/;
    
      if (isRomanNumeral.test(operand1) && isRomanNumeral.test(operand2)) {
        // Если оба операнда являются римскими цифрами, выполняем операцию
        const arabic1 = fromRoman(operand1);
        const arabic2 = fromRoman(operand2);
    
        let arabicResult;
        switch (operator) {
          case "+":
            arabicResult = arabic1 + arabic2;
            break;
          case "-":
            arabicResult = arabic1 - arabic2;
            break;
          case "*":
            arabicResult = arabic1 * arabic2;
            break;
          case "/":
            arabicResult = arabic1 / arabic2;
            break;
          default:
            throw new Error("Некорректный оператор.");
        }
      
          
        result = toRoman(arabicResult); 
        
      } else {
        // Если операнды не являются римскими цифрами, преобразуем их в числа и выполняем операцию
        const num1 = parseFloat(operand1);
        const num2 = parseFloat(operand2);
    
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error("Некорректные операнды.");
        }
    
        switch (operator) {
          case "+":
            result = (num1 + num2).toString();
            break;
          case "-":
            result = (num1 - num2).toString();
            break;
          case "*":
            result = (num1 * num2).toString();
            break;
          case "/":
            result = Math.floor(num1 / num2).toString();
            break;
          default:
          throw new Error("Некорректный оператор.");
        }
      }
    
    
      return result;
    
    }



  /* ЛУЧШИЙ РАБОЧИЙ ВАРИАНТ!ё */
  function calculator(str) {
    // Функция для преобразования римских цифр в арабские
    function fromRoman(roman) {
      const romanNumerals = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
      };
  
      let result = 0;
      let previousValue = 0;
      for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanNumerals[roman[i]];
        if (currentValue >= previousValue) {
          result += currentValue;
        } else {
          result -= currentValue;
        }
        previousValue = currentValue;
      }
      return result;
    }
  
    // Функция для преобразования арабских цифр в римские
    function toRoman(num) {
      const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
      ];
  
      let result = "";
      for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i][1]) {
          result += romanNumerals[i][0];
          num -= romanNumerals[i][1];
        }
      }
      return result;
    }
  
    // Разбиваем строку на операнды и операцию
    const regex = /^(.*?)([+\-*\/])(.*?)$/;
    const match = str.match(regex);
    if (!match) {
      throw new Error("Некорректный формат строки.");
    }
  
    const operand1 = match[1].trim();
    const operator = match[2].trim();
    const operand2 = match[3].trim();
  
    // Корректность формата строки
     if ((str.match(/[\+\-\*\/]/g) || []).length > 1) {
      throw new Error("Некорректный формат строки.");
    } 
    
    let result;
  
    // Проверяем, являются ли операнды римскими цифрами
    const isRomanNumeral = /^[IVXLCDM]+$/;
  
    if (isRomanNumeral.test(operand1) && isRomanNumeral.test(operand2)) {
      // Если оба операнда являются римскими цифрами, выполняем операцию
      const arabic1 = fromRoman(operand1);
      const arabic2 = fromRoman(operand2);
   // Проверка диапазона
      if (arabic1 < 1 || arabic1 > 10 || arabic2 <1 || arabic2 > 10) {
        throw new Error("Операнды должны быть в диапазоне от 1 до 10 включительно.");
      }
      
      let arabicResult;
      switch (operator) {
        case "+":
          arabicResult = arabic1 + arabic2;
          break;
        case "-":
          arabicResult = arabic1 - arabic2;
          break;
        case "*":
          arabicResult = arabic1 * arabic2;
          break;
        case "/":
          arabicResult = arabic1 / arabic2;
          break;
        default:
          throw new Error("Некорректный оператор.");
      }
      
  
        
      result = toRoman(arabicResult); 
      
    } else {
      // Если операнды не являются римскими цифрами, преобразуем их в числа и выполняем операцию
      const num1 = parseFloat(operand1);
      const num2 = parseFloat(operand2);
   //Проверка диапазотна
      if (num1 < 1 || num1 > 10 || num2 < 1 || num2 > 10) {
        throw new Error("Операнды должны быть в диапазоне от 1 до 10 включительно.");
      }
      
      if (isNaN(num1) || isNaN(num2)) {
          throw new Error("Некорректные операнды.");
      }
  
      
  
      switch (operator) {
        case "+":
          result = (num1 + num2).toString();
          break;
        case "-":
          result = (num1 - num2).toString();
          break;
        case "*":
          result = (num1 * num2).toString();
          break;
        case "/":
          result = Math.floor(num1 / num2).toString();
          break;
        default:
        throw new Error("Некорректный оператор.");
      }
    }
  
  
    return result;
  
  }
  
  module.exports = calculator; // Не трогайте эту строчку

 
