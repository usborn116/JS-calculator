const nums = document.querySelectorAll('.num')
nums.forEach(num => num.addEventListener('click', shownum));

const display = document.querySelector('#display')
display.textContent = '';

const operators = document.querySelectorAll('.operate')
operators.forEach(operator => operator.addEventListener('click', saveNum));

const equals = document.querySelector('.result');
equals.addEventListener('click', result);

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', function(){
    display.textContent = display.textContent.slice(0, display.textContent.length -1)
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    display.textContent = '';
    inpNum = false;
    lastNum = false;
    tempNum = false;
    mathCurrent = false;
    mathLast = false;
});

let inpNum;
let lastNum;
let tempNum;
let mathCurrent = false;
let mathLast = false;
let isLastOperator = false;

function shownum(){
    if (isLastOperator){
        display.textContent = '';
    };
    if (display.textContent.includes('.') && this.getAttribute('id') == '.'){
        alert("No more than one decimal allowed.");
        return;
    }
    const n = this.getAttribute('id');
    display.textContent += (n);
    isLastOperator = false;
}

function saveNum(){
    isLastOperator = true;
    if (mathCurrent){
        mathLast = mathCurrent;
        mathCurrent = this.getAttribute('id');
    } else {
        mathCurrent = this.getAttribute('id');
    };
    if (!inpNum){
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
    } else if (inpNum && !lastNum && !tempNum) {
        lastNum = Number(inpNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        display.textContent = tempNum
    } else if (inpNum && lastNum && tempNum){
        lastNum = Number(tempNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        display.textContent = tempNum
    }
    console.log(inpNum, lastNum, tempNum, mathCurrent, mathLast);
}

function result(){
    mathLast = mathCurrent;
    if (!inpNum){
        alert("ERROR! No Numbers to Calculate");
        return;
    } else if (tempNum){
        lastNum = Number(tempNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = parseFloat(operate(mathLast, lastNum, inpNum)).toFixed(1);
        display.textContent = '';
        display.textContent = Number(tempNum);
    } else {
        lastNum = Number(inpNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        display.textContent = '';
        if (isNaN(tempNum)){
            display.textContent = '';
            return;
        } else {
            display.textContent = Number(tempNum);
        }
    } 
}

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x,y) => x * y;

function divide (x,y){
    if (y == 0){
        alert("Cannot divide by 0!")
        return;
    } else {
        return x / y;
    } 
};

function operate(operator,a,b){
    switch(operator){
        case 'plus':
            return add(a,b)
            break;
        case 'minus':
            return subtract(a,b)
            break;
        case 'times':
            return multiply(a,b)
            break;
        case 'divide':
            return divide(a,b)
            break;
        default:
            alert("Invalid input!") 
    }
}