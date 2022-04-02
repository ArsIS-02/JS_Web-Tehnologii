const pwEl = document.getElementById("pw"); //константа для готового пароля
const copyEl = document.getElementById("copy"); //константа для функции копирования
const lenEl = document.getElementById("len"); //константа для допустимой длины
const upperEl = document.getElementById("upper"); //константа для обработки прописных букв
const lowerEl = document.getElementById("lower"); //константа для обработки строчных букс
const numberEl = document.getElementById("number"); //константа для обработки цифр
const symbolEl = document.getElementById("symbol"); //константа для обработки символов
const generateEl = document.getElementById("generate"); //константа для функции генерации пароля

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //словарь прописных букв
const lowerLetters = "abcdefghijklmnopqrstuvwxyz"; //словарь строчных букв
const numbers = "0123456789"; //словарь цифр
const symbols = "!@#$%^&*()_+="; //словарь символов
//Генерация прописного символа
function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
//генерация строчного символа
function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
//генерация цифры
function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}
//генерация символа из алфавита
function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}
//основная функция генрации готового пароля указанной длины
function generatePassword() {
    const len = lenEl.value;

    let password = "";
    //если установлен чекбокс-вставить прописной символ
    if (upperEl.checked) {
        password += getUppercase();
    }
    //если установлен чекбокс-вставить строчный символ
    if (lowerEl.checked) {
        password += getLowercase();
    }
    //если установлен чекбокс-вставить цифру
    if (numberEl.checked) {
        password += getNumber();
    }
    //если установлен чекбокс-вставить символ
    if (symbolEl.checked) {
        password += getSymbol();
    }
    //наполнять символами строку пароля, пока не превысит указанное пользователем число
    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password; //наполненное символами поле и составляет пароль, который можно копировать, если он нравится
}

function generateX() {
    const xs = [];
    if (upperEl.checked) { //если установлен чекбокс- добавить прописной символ алфавита
        xs.push(getUppercase());
    }

    if (lowerEl.checked) { //если установлен чекбокс- добавить строчный символ алфавита
        xs.push(getLowercase());
    }

    if (numberEl.checked) { //если установлен чекбокс-добавить цифру
        xs.push(getNumber());
    }

    if (symbolEl.checked) { //если установлен чекбокс-добавить символ
        xs.push(getSymbol());
    }

    if (xs.length === 0) return ""; //если никакой чекбокс не включён пользователем-ничего не передавать

    return xs[Math.floor(Math.random() * xs.length)]; //заполнить поле значением указанной длины
}

generateEl.addEventListener("click", generatePassword); //генерация пароля из алфавитов по клику на кнопку

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password; //переменная в поле вывода
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Созданный пароль скопирован в буфер"); //уведомление в окне браузера
});