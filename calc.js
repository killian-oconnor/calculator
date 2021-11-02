const result = document.getElementById("resultBox");
const history = document.getElementById("historyBox");
const del = document.getElementById("delBtn");
const clear = document.getElementById("clearBtn");
const equals = document.getElementById("equalsBtn");
const numButtons = document.getElementsByClassName('btn-outline-secondary');
const operatorButtons = document.getElementsByClassName('btn-warning');
const periodBtn = document.getElementById('period');
let operator = "";
let lastnum = 0;
let newnum = 0;
let sumArr = [];
let sum = 0;
let lastBtn = "";

del.addEventListener("click", deleteBtnfunc);
clear.addEventListener("click", clearBtnfunc);
equals.addEventListener("click", equalsFunc);
periodBtn.addEventListener("click", () => periodBtn.disabled = true);


for (const button of operatorButtons) {
    button.addEventListener("click", operatorFunc);
}

for (const button of numButtons) {
    button.addEventListener("click", tapNo);
}

// buttons.forEach((button) => {
//     button.addEventListener("click", tapNo)
// });
//lastnum, newnum, operator
function equalsFunc(){
    if (lastBtn === "operator" || lastBtn === "=") {
        return;
    }
    periodBtn.disabled = false;
    lastnum = parseFloat(lastnum);
    //newnum = parseFloat(newnum);
    newnum = parseFloat(result.placeholder);
    switch (operator) {
        case '+':
            sum = newnum + lastnum;
            break;
        case '-':
            sum = lastnum - newnum;
            break;
        case '*':
            sum = newnum * lastnum;
            break;
        case '/':
            if (newnum === 0) {
                sum = null;
                break;
            }
            else sum = lastnum / newnum;
            break;
        default:
            sum = null;
    }
    result.placeholder = sum;
    history.placeholder = lastnum + " " + operator + " " + newnum;
    //history.placeholder = history.placeholder + " " + newnum;
    lastBtn = "=";
    return sum;
}

function operatorFunc(){
    if (lastBtn === "operator") {
        return;
    }
    periodBtn.disabled = false;
    operator = this.textContent;
    if (history.placeholder == ""){
        //operator = this.textContent;
        lastnum = parseFloat(result.placeholder);
        result.placeholder = "";
        history.placeholder = (lastnum + " " + operator);
    }
    else {
        equalsFunc();
        history.placeholder = sum + " " + operator;
        result.placeholder = ""
        lastnum = sum;
    }
    lastBtn = "operator";

    // operator = this.textContent;
    // lastnum = parseFloat(result.placeholder);
    // result.placeholder = "";
    // history.placeholder = (lastnum + " " + operator);
    // sumArr.push(result.placeholder);
    // sumArr.push(operator);
}

function deleteBtnfunc(){
    result.placeholder = result.placeholder.slice(0, -1); 
    if (!result.placeholder.includes(".")) {
        periodBtn.disabled = false;
    }
}

function clearBtnfunc(){
    periodBtn.disabled = false;
    result.placeholder = "";
    history.placeholder = "";
    lastBtn = "clear";
}

function tapNo(num) {
    num = this.textContent;
    //result.readOnly = false;

    result.placeholder += num;
    console.log(num);
    lastBtn = "num";
}
