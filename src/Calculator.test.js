const Calculator = require('./Calculator.js');

test('Calculator displays 0 at start', () => {
    const calc = Calculator();
    const result = calc.display();
    expect(result).toEqual("0");
})

test('Expression is empty at start', () => {
    const calc = Calculator();
    const result = calc.expression();
    expect(result).toEqual('');
})

test('Can add digits to empty display', () => {
    const calc = Calculator();
    calc.pressDigit(4);
    const result = calc.display();
    expect(result).toEqual('4');
})

test('Can add digits to nonempty display', () => {
    const calc = Calculator();
    calc.pressDigit(4);
    calc.pressDigit(5);
    const result = calc.display();
    expect(result).toEqual('45');
})

test('Can use operator on empty expression', () => {
    const calc = Calculator();
    calc.pressOperator("+");
    expect(calc.expression()).toEqual("0+");
    expect(calc.display()).toEqual("0");
})

test('Can use multiple operators', () => {
    const calc = Calculator();
    doSteps(calc, "6-1+5*10");
    expect(calc.expression()).toEqual("6-1+5*");
    expect(calc.display()).toEqual("10");
})

test('Can inititialize with constructor', () => {
    const calc = Calculator("6-1+5*10");
    expect(calc.expression()).toEqual("6-1+5*");
    expect(calc.display()).toEqual("10");
})

test('Sending operator "=" equals displays the result', () => {
    const calc = Calculator("6-1+5*10=");
    expect(calc.display()).toEqual("55");
    expect(calc.expression()).toEqual("6-1+5*10");
})

test('Pressing operater "=" twice repeats prev operation', () => {
    const calc = Calculator("6-1+5*10==");
    expect(calc.display()).toEqual("505");
    expect(calc.expression()).toEqual("6-1+5*10*10");
})

test('Pressing a number after = resets calc', () => {
    const calc = Calculator("6-1+5*10=66");
    expect(calc.display()).toEqual("66");
    expect(calc.expression()).toEqual("");
})

test('Pressing an operator after = resets calc to prev Answer', () => {
    const calc = Calculator("6-1+5*10=+");
    expect(calc.display()).toEqual("0");
    expect(calc.expression()).toEqual("55+");
}) 

test('changing operators changes expression', () => {
    const calc = Calculator("6-1+5*10=+-");
    expect(calc.display()).toEqual("0");
    expect(calc.expression()).toEqual("55-");
}) 

test('Can use decimal', () => {
    const calc = Calculator("5.5*2.1=");
    expect(calc.display()).toEqual("11.55");
    expect(calc.expression()).toEqual("5.5*2.1");
})

function doSteps(c, steps='') {
    for(let val of steps) {
        if(val >= "0" && val <="9") {
            c.pressDigit(val);
        } else {
            c.pressOperator(val);
        }
    }
}
