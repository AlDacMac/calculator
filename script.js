let display = document.querySelector("#display");
let displayValue = "0";
let periodIn = false;
let operatorIn = false;
let firstValue = null;
let secondValue = null;
let operator = null;
let displayingAnswer = false;

const add = (a, b) => {return a + b};
const subtract = (a, b) => {return a - b};
const multiply = (a, b) => {return a * b};
const divide = (a, b) => {return a / b};

const identifyOperator = symbol => {
    switch(symbol){
        case("+"): return add;
        case("-"): return subtract;
        case("*"): return multiply;
        case("/"): return divide;
    }
}

const operate = (a, b, operator) => {
    return operator(a, b);
}

const updateDisplay = () => {
    display.textContent = displayValue
}

let numButtons = document.querySelectorAll(".numButton");
numButtons.forEach((button) => {
    button.addEventListener('mouseup', () => {
        if(button.textContent === "."){ // This conditional prevents multiple periods from being entered.
            if(periodIn){
                return; 
            } else {
                periodIn = true;
            }
        }
        if((["0", "ERROR"].includes(displayValue) && button.textContent != ".") || displayingAnswer){
            displayValue = button.textContent;
            displayingAnswer = false;
        } else if((displayValue === "ERROR" && button.textContent === ".") || displayingAnswer) {
            displayValue = "0.";
            displayingAnswer = false;    
        } else if(operatorIn && displayValue.charAt(displayValue.length - 1) === " " && button.textContent === "."){
            displayValue += "0."
        } else {
            displayValue += "" + button.textContent;
        }
        updateDisplay();
    });
});

let operatorButtons = document.querySelectorAll(".operatorButton");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('mouseup', () => {
        if(operatorIn) return;
        firstValue = Number(displayValue);
        if(displayValue === "ERROR"){
            displayValue = `0 ${operatorButton.textContent} `
            displayingAnswer = false; 
            firstValue = 0;
        } else {
            displayValue += ` ${operatorButton.textContent} `
            displayingAnswer = false; 
        }
        updateDisplay();
        periodIn = false;
        operatorIn = true;
        operator = identifyOperator(operatorButton.textContent);
    });
});

let equals = document.querySelector("#equals");
equals.addEventListener('mouseup', () => {
    if(!operatorIn){
        return;
    } else if(displayValue.charAt(displayValue.length - 1) === " "){
        displayValue = "ERROR"
        periodIn = false;
        operatorIn = false;
        firstValue = null;
        secondValue = null;
        operator = null;
    } else {
        secondValue = Number(displayValue.match(/(?<=\s[\+\-\/\*]\s).*/)[0])
        displayValue = (secondValue === 0 && operator === divide) ? "ERROR" : operator(firstValue, secondValue)
        updateDisplay;
        periodIn = false;
        operatorIn = false;
        firstValue = null;
        secondValue = null;
        operator = null;
        displayingAnswer = true;
    }
    updateDisplay();
});

let clear = document.querySelector("#clear")
clear.addEventListener('mouseup', () => {
    displayValue = "0";
    periodIn = false;
    operatorIn = false;
    firstValue = null;
    secondValue = null;
    updateDisplay();
});

updateDisplay();
console.log(" - testasdfsadfazsdfas".match(/(?<=\s[\+\-\/\*]\s).*/)[0]);