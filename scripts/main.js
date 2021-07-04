//core calculation functions
function add(a,b){
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b===0) {
        alert("Dividing by 0 is not allowed!");
        return "ERROR";
    } else {
        return a/b;
    }
}
function calculate(a,b,operator){
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return substract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default:
            return alert('wrong operator');
    }
}

//function to check if parenthises match
function checkParenthises(expressionArray){
    let openParent=0;
    let closeParent=0;
    let parenthisesCount=0;
    let arr=expressionArray.split('');

    for(let i=0;i<arr.length;i++){
        if(arr[i]==='(') {
            openParent++;
            parenthisesCount++;
        }
        if(arr[i]===')'){
            closeParent++;
            parenthisesCount--;
        } 
        if(parenthisesCount<0){
        alert(`ERROR - parenthises don't match`);
        return false;
        }
    }
    if(openParent!==closeParent){
        alert('ERROR - different numbers of opening and closing parenthises'); 
    return false;
    }
    else{
    return true;
    }
}

//define the order of operators
function operatorPriority(operator){
    if(operator === '+' || operator === '-') 
    return 1;
    if(operator === '*' || operator === '/')
    return 2;
    return 0;    
}

// function returning the value of expression
function evaluateExpression(expression) {
    let arr = expression.split('');
    let operatorsArr = [];
    let valuesArr = [];
    if(checkParenthises(expression)===false) return 'PARENTHESIS ERROR';
    for (let i = 0; i < arr.length; i++) {

        //character is an opening parenthesis, push to operators array
        if (arr[i] === '(') {
            operatorsArr.push(arr[i]);
        }
        //character is a number, push to numbers array
        else if (!isNaN(arr[i])) {
            let value = 0;
            //increase the main loop's index if number has more than 1 digit
            while (i < arr.length && !isNaN(arr[i])) {
                value = (value * 10) + Number(arr[i]);
                i++;
            }
            valuesArr.push(value);
            i--;
        }
        //character is a closing parenthesis, solve the inner expression
        else if (arr[i] === ')') {
            while (operatorsArr.length !== 0 && operatorsArr[operatorsArr.length - 1] !== '(') {
                let val2 = valuesArr.pop();
                let val1 = valuesArr.pop();
                let operator = operatorsArr.pop();
                valuesArr.push(calculate(val1, val2, operator));
            }
            if (operatorsArr.length > 0) operatorsArr.pop();
        }
        //if all are false, the current character is a operator
        else {
            //A few words of explanation (mainly for myself to collect thoughts)
            //Check in a loop if the current character (the operator) has a higher priority than the previous ones on the array. If it doesn't, do all the other operations that are left on the array.
            //For example, if we had an * operator in 2*3+4* , the '+' has a lower priority than *, so we can't evaluate 3 with 4, thus we don't enter the loop, we push the * on array of operators and wait for the next iteration which will provide us the second value for * operator.
            //On the contrary example, if we had 2+3*4+ , the current operator is + and the previous is *. Since the previous operator is higher in hierarchy we can evaluate 3*4 and push the result in the values array, giving us 2+7+. Now the operators are equal, so we cen evaluate again to 9+.
            while(operatorsArr.length>0 && operatorPriority(operatorsArr[operatorsArr.length])>=operatorPriority(arr[i])){
                let val2 = valuesArr.pop();
                let val1 = valuesArr.pop();
                let operator = operatorsArr.pop();
                valuesArr.push(calculate(val1, val2, operator));
            }
            operatorsArr.push(arr[i]);
        }
    }
    //at this point the main loop has ended, the expression has no unresolved parenthesises, and all the operators are of equal priority. We just need to evaluate everything right to left 
    while (operatorsArr.length !== 0) {
        let val2 = valuesArr.pop();
        let val1 = valuesArr.pop();
        let operator = operatorsArr.pop();
        valuesArr.push(calculate(val1, val2, operator));
    }
    return valuesArr[valuesArr.length-1];
}

/* 
    this code should be a function as it repeats itself 3 times
        let val2 = valuesArr.pop();
        let val1 = valuesArr.pop();
        let operator = operatorsArr.pop();
        valuesArr.push(calculate(val1, val2, operator));
*/