const add = (a, b) => {
    return parseFloat(a) + parseFloat(b);
}

const subtract = (a, b) => {
    return parseFloat(a) - parseFloat(b);
}

const multiply = (a, b) => {
    return parseFloat(a) * parseFloat(b);
}

const divide = (a, b) => {
    return parseFloat(a) / parseFloat(b);
}

const operate = (operator, a, b) => {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

console.log(operate("/", 1, 2));