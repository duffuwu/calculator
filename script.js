const numbers = document.querySelectorAll('.rows .number');
const operators = document.querySelectorAll('.operator');
const result = document.querySelector('.result');
const screen = document.querySelector('.display');

let currentValue = 0;
let numbersArray = [];
let previousOperator;

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
  
    let scroll = 0;

    if ((currentValue.toString().includes('.')) && 
        (this.outerText === '.')) return;


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

    console.log(screen.textContent.includes('.'));
    if (screen.textContent.includes('.')) {
        console.log(currentValue.length);
        if (screen.textContent.substring(0,1) === '.') {
            scroll = currentValue.length - 10;
            screen.textContent = currentValue.substring(scroll, 10 + scroll);
            return
        }

        if (currentValue.length > 10) {
            scroll = currentValue.length - 11;
            console.log(scroll);
        }
        console.log(currentValue.substring(scroll, 11 + scroll));
        screen.textContent = currentValue.substring(scroll, 11 + scroll);
        return;
    }
    if ((currentValue.length > 10) && (!screen.textContent.includes('.'))) {
        scroll = currentValue.length - 10;
        screen.textContent = currentValue.substring(scroll, 10 + scroll);
        return
    }

    screen.textContent = currentValue.substring(scroll, 10 + scroll);
    
}

function storeOperator() {

    console.log(previousOperator);
    
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
    
    numbersArray.push(parseFloat(currentValue)); 

    console.log(numbersArray);

    screen.style.cssText = 'color: rgba(0, 0, 0, 0);'
    
    if (numbersArray.length === 1) {
        previousOperator = operator;
        currentValue = 0;
        setTimeout(() => {screen.style.cssText = 'color: rgba(0, 0, 0, 1);'},75);
        return operator;
    }

    const partialResult = operate(previousOperator, numbersArray[0], numbersArray[1]);  

    if (partialResult.length > 9) {
        const exceeding = partialResult.length - 8;

    }

    screen.textContent = partialResult;8

    numbersArray.shift();
    numbersArray[0] = partialResult;
    currentValue = 0;

    setTimeout(() => {screen.style.cssText = 'color: rgba(0, 0, 0, 1);'},75);

    previousOperator = operator;
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
