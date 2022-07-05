const numbers = document.querySelectorAll('.rows .number');
const operators = document.querySelectorAll('.operator');
const result = document.querySelector('.result');
const screen = document.querySelector('.display');
const symbols = document.querySelector('.symbols');
const exponential = document.querySelector('.exponential');

let screenNumber, exponentialNumber, previousOperator, currentOperator, currentValue, currentResult, isFloat, charLimit, operationNumber;
let numbersArray = [];

currentValue = '0';
currentResult = 0;
isFloat = false;
charLimit = 10;
operationNumber = 0;


function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator,a,b) {
    return operator(a,b);
}

function erase() {
    if (currentValue === '0' && this.outerText != '.') return;

    currentValue = currentValue.substring(0, currentValue.length - 1);

    if (currentValue.length === 0) {
        currentValue = '0';
    }
    screen.textContent = currentValue;

}

function reset() {
    currentValue = '0';
    currentResult = 0;
    operationNumber = 0;
    previousOperator = null;
    numbersArray = [];
    screen.textContent = currentValue;
}

function storeOperator() {

    operationNumber += 1;
    
    switch (this.outerText) {
        case '÷':
            operator = divide;
            break;
        case 'x':
            operator = multiply;
            break;
        case '-':
            operator = subtract;
            break;
        case '+':
            operator = add;
            break;
    }
    
    submit(false);
    previousOperator = operator;
    currentValue = '0';
}


function storeNumber() {

    if ((currentValue.toString().includes('.')) && (this.outerText === '.')) return;

    if (currentValue === '0' && this.outerText === '.') {
        currentValue = '0.'
        screen.textContent = currentValue;
        return;
    }

    else if (currentValue === '0') {
        currentValue = this.outerText;
        screen.textContent = currentValue;
        return;
    }
    currentValue += this.outerText;

    populateScreen(currentValue);

}

function submit(result) {

    operationNumber += 1;

    if (operationNumber <= 2) {
        currentResult = parseFloat(currentValue);
        populateScreen(currentResult.toString())
        currentValue = '0';
        return
    }

    currentResult = operate((previousOperator ?? operator),currentResult,parseFloat(currentValue));
    currentValue = '0';

    if ((currentResult > 10**9) && (result != false)){
        let decimal = currentResult.toString().substring(2,10);
        if (parseFloat(decimal) === 0) {
            populateScreen('1.0');
        }
        else {
            populateScreen(`
                ${currentResult.toString().substring(0,1)}.${decimal}`
            )
        }
    }
    else {
        populateScreen(currentResult.toString());
    }
}

function populateScreen(number) {

    charLimit = (
        (screen.textContent.includes('.') && screen.textContent.substring(0,1) != '.') ||
        (number.substring(number.length - 1, number.length) === '.')
        ) ? 11 : 10;

    if (number.length > charLimit) {
        screen.textContent = number.substring(
            number.length - charLimit, number.length
        )
    }

    else {
        screen.textContent = number;
    }

}

numbers.forEach(number => number.addEventListener("click",storeNumber));
operators.forEach(operator => operator.addEventListener("click", storeOperator));