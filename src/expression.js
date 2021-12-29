"use strict";

function parseEquation(expression) {
    let tokens = [];
    if(expression.length === 0) {
        return tokens;
    }
    let {number, nextIndex} = nextNumber(expression, 0);
    if(isNaN(number)) {
        throw new Error("Invalid Expression");
    }
    tokens.push(number);

    let i = nextIndex;
    while(i < expression.length) {
        if(isOperator(expression[i])) {
            tokens.push(expression[i])
            i++;
        }
        else {
            throw new Error("Invalid Expression");
        }
        ({number, nextIndex} = nextNumber(expression, i));
        if(!isNaN(number)) {
            tokens.push(number);
            i = nextIndex;
        }
        else {
            throw new Error("Invalid Expression");
        }
    }

    return tokens;
}

function nextNumber(expression, start) {
    let end = start;
    if(expression[end] === "-") {
        end++;
    }
    while(end < expression.length && isDigit(expression[end])) {
        end++;
    }
    let number = Number.NaN;
    let nextIndex = end;
    if(end - start === 1 && expression[start] === "-") {
        nextIndex--;
    }
    else if(end - start > 0){
        number = Number(expression.slice(start, end));
        nextIndex = end;
    }

    return {number, nextIndex};
}

function isDigit(e) {
    return e >= '0' && e <= '9';
}

function isOperator(c) {
    if(c === "+" || c === "-" || c === "*" || c === "/") {
        return true;
    } 
    return false;
}

class SimpleExpression {
    #tokens = [];
    constructor(expression) {
        this.#tokens = parseEquation(expression);
    }
    toString() {
        return this.#tokens.join('');
    }
    solve() {
        if(this.#tokens.length === 0) {
            return 0;
        }
        let stack = [this.#tokens[0]]
        for(let i = 1; i < this.#tokens.length; i += 2) {
            const op = this.#tokens[i]
            const nextNum = this.#tokens[i+1];
            if(op === "+") {
                stack.push(nextNum);
            }
            else if(op === "-") {
                stack.push(-nextNum);
            }
            else if(op === "*") {
                let prevNum = stack.pop();
                stack.push(prevNum * nextNum);
            }
            else if(op === "/") {
                let prevNum = stack.pop();
                if(nextNum === 0) {
                    throw new Error("Division Zero");
                }
                stack.push(prevNum / nextNum);
            }
            else {
                throw new Error("Invalid Operator");
            }
        }
        let total = 0;
        for(let n of stack) {
            total += n;
        }
        return total;
    }
    simplify() {
        this.#tokens = [this.solve()];
    }
    #append(op, num) {
        if(this.#tokens.length === 0) {
            if(op === "+") {
                this.#tokens.push(num);
            }
            else if(op === "-") {
                this.#tokens.push(-num);
            }
            else {
                this.#tokens.push(0);
            }
        }
        else {
            this.#tokens.push(op);
            this.#tokens.push(num);
        }
    }
    add(num) {
        this.#append("+", num);
    }
    subtract(num) {
        this.#append("-", num);
    }
    multiply(num) {
        this.#append("*", num);
    }
    divide(num) {
        this.#append("/", num);
    }
}

const Expression = (expression='') => {
    expression = expression.replace(/\s/g,'');
    return new SimpleExpression(expression);
};

module.exports = Expression;