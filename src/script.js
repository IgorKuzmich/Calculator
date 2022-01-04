import './style.css';
const Calculator = require("./Calculator.js");

const expression = document.querySelector("#equation>div");
const display = document.querySelector("#operand>div");
const digitBtns = document.querySelectorAll(".digit");
const opBtns = document.querySelectorAll(".operator");

const calc = Calculator();

digitBtns.forEach(btn => btn.addEventListener('click', pressDigit));
opBtns.forEach(btn => btn.addEventListener('click', pressOperator));

function pressOperator(e) {
    const op = e.target.value;
    calc.pressOperator(op);
    updateDisplay();
}

function pressDigit(e) {
    const digit = e.target.value;
    calc.pressDigit(digit);
    updateDisplay();
}

function updateDisplay() {
    display.innerHTML = calc.display();
    expression.innerHTML = calc.expression();
}
