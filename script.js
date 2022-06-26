const numbers = document.querySelectorAll('.rows .number');
const operators = document.querySelectorAll('.operator');
const result = document.querySelector('.result');
const screen = document.querySelector('.display');

let currentValue = 0;
let numbersArray = [];
let firstNumber = true;

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

function displayNumber() {
    
    if ((currentValue === 0 || currentValue === '0') && this.outerText === '.') {
        currentValue = '0.'
        screen.textContent = currentValue;
        return
    }

    else if (currentValue === 0 || currentValue === '0') {
        currentValue = this.outerText;
        screen.textContent = currentValue;
        return
    }

    currentValue += this.outerText;
    screen.textContent = currentValue;
}

function storeOperator() {

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

    screen.style.cssText = 'color: rgba(0, 0, 0, 0);'
    
    if (parseFloat(currentValue) === 0) {
        setTimeout(() => {screen.style.cssText = 'color: rgba(0, 0, 0, 1);'},75);
        return operator;
    }
    
    numbersArray.push(parseFloat(currentValue));
    

    if (numbersArray.length == 2) {
        const partialResult = operate(operator, numbersArray[0], numbersArray[1]);        
        screen.textContent = partialResult;
        numbersArray.shift();
        numbersArray[0] = partialResult;
        
        currentValue = 0;
    }

    else {
        currentValue = 0;
    }

    setTimeout(() => {screen.style.cssText = 'color: rgba(0, 0, 0, 1);'},75);

    console.log(numbersArray);
    return operator;
    
}

function erase() {
    if (currentValue === 0 || (currentValue === '0' && this.outerText != '.')) return;
    currentValue = currentValue.substring(0, currentValue.length - 1);
    if (currentValue.length === 0) {
        currentValue = 0;
    }
    screen.textContent = currentValue;

}


function reset() {
    currentValue = 0;
    numbersArray = [];
    screen.textContent = currentValue;
}

function submit() {
    numbersArray.push(parseFloat(currentValue));
    const partialResult = operate(operator, numbersArray[0], numbersArray[1]);        
    screen.textContent = partialResult;
    numbersArray.shift();
    numbersArray[0] = partialResult;
    
    currentValue = 0;
}


numbers.forEach(number => number.addEventListener("click", displayNumber));
operators.forEach(operator => operator.addEventListener("click", storeOperator));