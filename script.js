const add = function(x, y) {
	return x + y;
};

const subtract = function(x, y) {
	return x - y;
};

const multiply = function(x,y) {
  return x * y;
};

const divide = function(x,y){
    return x / y;
}

const operate = function(operator,a,b){
    switch(operator){
        case plus:
            add(a,b)
            break;
        case minus:
            subtract(a,b)
            break;
        case times:
            multiply(a,b)
            break;
        case divide:
            divide(a,b)
            break;
        default:
            alert("Invalid input!") 
    }
}