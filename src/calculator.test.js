const Calculator = require('./calculator.js');

test('stores empty equation', () => {
    const result = Calculator().toString();
    expect(result).toEqual("");
})

test('stores equation', () => {
    const result = Calculator("1+1*2-3/3").toString();
    expect(result).toEqual("1+1*2-3/3");
});

test('removes whitesapce from equation', () => {
    const result = Calculator("1 + 1 * 2 - 3 /   3").toString();
    expect(result).toEqual("1+1*2-3/3");
});

test('solves equation "1 + 1 * 2 - 3 /   3"', () => {
    const result = Calculator("1 + 1 * 2 - 3 /   3").solve();
    expect(result).toEqual(2);
})

test('returns zero on empty equation', () => {
    const result = Calculator().solve();
    expect(result).toEqual(0);
}) 

test('throws error on division by zero', () => {
        const calc = Calculator('3/0');
        expect(() => {calc.solve()}).toThrowError("Division Zero");
})

test('accepts single number', () => {
    const calc = Calculator('5');
    const result = calc.toString();
    expect(result).toEqual('5');
})

test('accepts negative number', () => {
    const calc = Calculator('-5');
    const result = calc.toString();
    expect(result).toEqual('-5');
})

test('simplify equation', () => {
    const calc = Calculator("1+2+3");
    calc.simplify();
    const result = calc.toString()
    expect(result).toEqual("6");
})

test('accepts negative number after operator', () => {
    const result = Calculator('5+-4').solve();
    expect(result).toEqual(1);
})

test('can add to equation', () => {
    const calc = Calculator('10');
    calc.add(20);
    let result = calc.toString();
    expect(result).toEqual('10+20');
})

test('can add to empty equation', () => {
    const calc = Calculator();
    calc.add(20);
    const result = calc.toString();
    expect(result).toEqual('20');
})

test('can subtract from empty equation', () => {
    const calc = Calculator();
    calc.subtract(20);
    const result = calc.toString();
    expect(result).toEqual("-20");
})

test('can subtract from equation', () => {
    const calc = Calculator('10');
    calc.subtract(20);
    const result = calc.toString();
    expect(result).toEqual("10-20");
})

test('can multiply to empty equation', () => {
    const calc = Calculator();
    calc.multiply(20);
    const result = calc.toString();
    expect(result).toEqual("0");
})

test('can multiply to equation', () => {
    const calc = Calculator('10');
    calc.multiply(20);
    const result = calc.toString();
    expect(result).toEqual("10*20");
})


test('can divide empty equation', () => {
    const calc = Calculator();
    calc.divide(20);
    const result = calc.toString();
    expect(result).toEqual("0");
})

test('can divide', () => {
    const calc = Calculator('10');
    calc.divide(20);
    const result = calc.toString();
    expect(result).toEqual("10/20");
})