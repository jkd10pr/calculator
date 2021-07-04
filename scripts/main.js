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
    let openParent;
    let closeParent;
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

//function returning the value of expression
// function evaluateExpression(expression){
//     let arr=expression.split('');
//     let operatorsArr=[];
//     let valuesArr=[];

//     for(let i=0;i<arr.length;i++){

//         //character is an open parenthesis, push to operators array
//         if(arr[i]==='('){
//             operatorsArr.push(arr[i]);
//         }
//         //character is a number, push to numbers array
//         else if(isNaN(arr[i])){
//             let value=0;
//             //increase the main loop's index if number has more than 1 digit
//             while(i<arr.length && isNaN(arr[i])){
//                 value=(value*10)+Number(arr[i]);
//                 i++;
//             }
//             i--;
//         }
//         //character is a closing parenthesis, solve the inner expression
//         else if(arr[i]===')')
//         {

//         }


//     }
// }