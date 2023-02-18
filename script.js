const nums = document.querySelectorAll('.num')
nums.forEach(num => num.addEventListener('click', shownum));

const display = document.querySelector('#display')
display.textContent = '';

const opdisplay = document.querySelector('#opdisplay')
opdisplay.textContent = '';

const operators = document.querySelectorAll('.operate')
operators.forEach(operator => operator.addEventListener('click', saveNum));

const equals = document.querySelector('.result');
equals.addEventListener('click', result);

let inpNum;
let lastNum;
let tempNum;
let mathCurrent = false;
let mathLast = false;
let isLastOperator = false;
let hitequals = false;

function shownum(){
    if (isLastOperator){
        display.textContent = '';
    };
    if (display.textContent.includes('.') && this.getAttribute('id') == '.'){
        alert("No more than one decimal allowed.");
        return;
    }
    const n = (this.getAttribute('id'));
    display.textContent += (n);
    isLastOperator = false;
    console.log(`inp: ${inpNum}, last: ${lastNum}, temp: ${tempNum}. mathCurrent: ${mathCurrent}, mathLast: ${mathLast}`)
}

function shownumkey(e){
    document.getElementById('display').focus();
    switch (e.key){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            if (isLastOperator){
                display.textContent = '';
            };
            if (display.textContent.includes('.') && e.key == '.'){
                alert("No more than one decimal allowed.");
                return;
            }
            const k =(e.key);
            display.textContent += (k);
            isLastOperator = false;
            document.querySelector('body').focus();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            saveNumKey(e);
            document.querySelector('body').focus();
            break;
        case '=':
        case 'Enter':
            e.preventDefault();
            result();
            document.querySelector('body').focus();
            break;
        case 'Backspace':
            deletenum();
            document.querySelector('body').focus();
            break;
        default:
            return;
    } ;
}


function saveNum(){
    isLastOperator = true;
    if (mathCurrent){
        mathLast = mathCurrent;
        mathCurrent = (this.getAttribute('id'));
    } else {
        mathCurrent = (this.getAttribute('id'));
    };
    if (!inpNum){
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        opdisplay.textContent = this.getAttribute('id')
    } else if (hitequals){
        opdisplay.textContent = this.getAttribute('id')
        hitequals = false;
    } else if (inpNum && !lastNum && !tempNum) {
        lastNum = Number(inpNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        display.textContent = tempNum
        opdisplay.textContent = this.getAttribute('id')
    } else if (inpNum && lastNum && tempNum){
        lastNum = Number(tempNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        display.textContent = tempNum
        opdisplay.textContent = this.getAttribute('id')
    }
}

function saveNumKey(e){
    isLastOperator = true;
    if (mathCurrent){
        mathLast = mathCurrent;
        mathCurrent = (e.key);
    } else {
        mathCurrent = (e.key);
    };
    if (!inpNum){
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        opdisplay.textContent = e.key
    } else if (hitequals){
        opdisplay.textContent = e.key
        hitequals = false;
    } else if (inpNum && !lastNum && !tempNum) {
        lastNum = Number(inpNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        display.textContent = tempNum
        opdisplay.textContent = e.key
    } else if (inpNum && lastNum && tempNum){
        lastNum = Number(tempNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        display.textContent = tempNum
        opdisplay.textContent = e.key
    }
}

function result(){
    console.log(`inp: ${inpNum}, last: ${lastNum}, temp: ${tempNum}. mathCurrent: ${mathCurrent}, mathLast: ${mathLast}`)
    mathLast = mathCurrent;
    hitequals = true;
    if (!inpNum){
        alert("ERROR! No Numbers to Calculate");
        return;
    } else if (tempNum){
        lastNum = Number(tempNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = parseFloat(operate(mathLast, lastNum, inpNum)).toFixed(1);
        opdisplay.textContent = '='
        display.textContent = '';
        display.textContent = Number(tempNum);
    } else {
        lastNum = Number(inpNum);
        inpNum = Number(parseFloat(display.textContent).toFixed(1));
        tempNum = (operate(mathLast, lastNum, inpNum))
        tempNum = Number(parseFloat(tempNum).toFixed(1));
        opdisplay.textContent = '='
        display.textContent = '';
        if (isNaN(tempNum)){
            display.textContent = '';
            return;
        } else {
            console.log(tempNum);
            display.textContent = tempNum;
        }
    } 
}

const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', deletenum);

function deletenum(){
    display.textContent = display.textContent.slice(0, display.textContent.length -1)
};

window.addEventListener('keydown', shownumkey);

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    inpNum = null;
    lastNum = null;
    tempNum = null;
    mathCurrent = false;
    mathLast = false;
    isLastOperator = false;
    display.textContent = '';
    opdisplay.textContent = '';
});


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
        case '+': 
            opdisplay.textContent='+'         
            return add(a,b)
            break;
        case '-':
            opdisplay.textContent='-'
            return subtract(a,b)
            break;
        case 'x':
        case '*':
            opdisplay.textContent='x'
            return multiply(a,b)
            break;
        case '÷':
        case '/':
            opdisplay.textContent='÷'
            return divide(a,b)
            break;
        default:
            alert("Invalid input!") 
    }
}