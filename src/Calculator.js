"use strict"

const Expression = require('./expression');

class Calc{
    #expression;
    #num;
    #operator;
    #display;

    constructor(exp='') {
        this.#reset();

        for(const c of exp) {
            if((c >= "0" && c <= "9") || c === ".") {
                this.pressDigit(c);
            } else {
                this.pressOperator(c);
            }
        }
    }

    #reset() {
        this.#num = "";
        this.#expression = Expression();
        this.#operator = "";
        this.#display = this.#num;
    }

    allClear() {
        this.#reset();
    }

    clear() {
        if(this.#display !== this.#num) {
            this.#reset();
        } else {
            this.#display = "";
            this.#num = "";
        }
    }

    delete() {
        if(this.#display !== this.#num) {
            this.#reset();
        } else if(this.#display.length > 0) {
            this.#num = this.#num.slice(0, -1);
            this.#display = this.#num;
        } 
    }

    display() {
        if(this.#display == "") {
            return "0"
        }
        return this.#display;
    }

    expression() {
        if(this.#display === this.#num){
            return this.#expression.toString() + this.#operator;
        }
        return this.#expression.toString();
    }

    pressDigit(n) {
        if(this.#display !== this.#num) {
            this.#reset();
        }
        if(this.#num === "" && n === 0) {
            return;
        }
        this.#num += n;
        this.#display = this.#num;
    }

    pressOperator(op) {
        if(op !== "=" && (this.#display != this.#num)) {
            const answer = this.#expression.solve();
            this.#reset()
            this.#num = "" + answer;
        }
        if(this.#num === "") {
            if(this.#operator !== "") {
                if(op === "=") {
                    this.#display = "" + this.#expression.solve();
                } else {
                    this.#operator = op;
                }
                return;
            }
            this.#num = "0";
        }
        const num = Number(this.#num);
        if(this.#operator === "") {
            this.#expression = Expression(this.#num);
        } else if(this.#operator === "+") {
            this.#expression.add(num);
        } else if(this.#operator === "-") {
            this.#expression.subtract(num);
        } else if(this.#operator === "*") {
            this.#expression.multiply(num);
        } else if(this.#operator === "/") {
            this.#expression.divide(num);
        } else {
            throw Error("Invalid Operator");
        }

        if(op !== "=") {
            this.#operator = op;
            this.#num = "";
            this.#display = this.#num;
        } else {
            this.#display = "" + this.#expression.solve();
        }
    }
}

function Calculator(exp='') {
    return new Calc(exp);
}

module.exports = Calculator;