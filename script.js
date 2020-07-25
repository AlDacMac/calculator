let displayValue = "0";
let display = document.querySelector("#display");
let periodIn = false;
firstValue = null;
secondValue = null;

const add = (a, b) => {a + b};
const subtract = (a, b) => {a - b};
const multiply = (a, b) => {a * b};
const divide = (a, b) => {a / b};

const operate = (a, b, operator) => {
    return operator(a, b);
}

const updateDisplay = () => {
    display.textContent = displayValue
}

let numButtons = document.querySelectorAll(".numButton");
numButtons.forEach((button) => {
    button.addEventListener('mouseup', () => {
        if(button.textContent == "."){ // This conditional prevents multiple periods from being entered.
            if(periodIn){
                return; 
            } else {
                periodIn = true;
            }
        }
        if(displayValue == "0" && button.textContent != "."){
            displayValue = button.textContent;
        } else {
            displayValue += "" + button.textContent;
        }
        updateDisplay();
    });
});

let clear = document.querySelector("#clear")
clear.addEventListener('mouseup', () => {
    displayValue = "0"
    periodIn = false;
    updateDisplay();
});

updateDisplay();