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

const buildCalculator = () => {

    let container = document.querySelector(".container");
    let numberOfButton = 9;

    let firstOperand;
    let secondOperand;
    let operator;

    for (i = 0; i < 6; i++) {
        let row = document.createElement("div");
        row.className = "row";
        row.style.display = "flex";
        row.style.flexFlow = "row-reverse";
        row.style.justifyContent = "space-evenly"; //Or space-around
        row.style.alignItems = "center";
        row.style.height = "100px";
        row.style.overflow = "hidden";

        let result = document.createElement("p");
        let calculatorDisplayTotal = document.querySelector(".result");
        result.className = "result";
        result.style.backgroundColor = "lightgreen";
        result.style.height = "90%";
        result.style.width = "85%";
        result.textContent = 0;
        result.style.textAlign = "right";
        result.style.fontSize = "7vh";

        if (i == 0) {

            row.appendChild(result);
        }

        if (i == 1) {

            let button = document.createElement("button");
            button.style.height = "15vh";
            button.style.width = "8vh";
            button.textContent = "C";

            button.addEventListener("click", function () {
                firstOperand = undefined;
                secondOperand = undefined;
                operator = undefined;
                calculatorDisplayTotal.textContent = 0;
            });

            row.append(button);



        }

        if (i >= 2) {

            for (j = 0; j < 4; j++) {
                let button = document.createElement("button");
                button.style.height = "9vh";
                button.style.width = "8vh";
                button.style.display = "flex";
                button.style.flexDirection = "column";
                button.style.justifyContent = "center";
                button.style.alignItems = "center";
                // Put Operator symbols on buttons

                if (j == 0) {

                    button.classList.add("operator");
                    switch (i) {
                        case 2:
                            button.textContent = "/";
                            break;
                        case 3:
                            button.textContent = "*";
                            break;
                        case 4:
                            button.textContent = "-";
                            break;
                        case 5:
                            button.textContent = "+";
                            break;
                    }

                } else {
                    button.textContent = numberOfButton;
                    numberOfButton--;

                    // Modify final row

                    if (i == 5) {

                        switch (j) {
                            case 3:
                                button.textContent = 0;
                                break;
                            case 2:
                                button.textContent = ".";
                                break;
                            case 1:
                                button.textContent = "=";
                                button.style.backgroundColor = "red";
                                break;
                        }


                    }

                }

                // Button behavior

                button.addEventListener("click", function () {


                    if (calculatorDisplayTotal.textContent == 0 && Number.isInteger(parseInt(button.textContent)) && !calculatorDisplayTotal.textContent.includes(".")) {

                        calculatorDisplayTotal.textContent = button.textContent;


                    } else {

                        if (calculatorDisplayTotal.textContent.length < 16) {

                            // Behave differently if not an operator

                            if (Number.isInteger(parseInt(button.textContent)) || button.textContent == ".") {

                                // Do nothing if decimal point is already included

                                if (calculatorDisplayTotal.textContent.includes(".") && button.textContent == ".") {
                                    return;
                                }

                                // Append integers to display 

                                if (firstOperand !== undefined && secondOperand !== undefined && operator !== undefined && Number.isInteger(parseInt(button.textContent))) {
                                    firstOperand = calculatorDisplayTotal.textContent;
                                    calculatorDisplayTotal.textContent = button.textContent;
                                    secondOperand = undefined;
                                    operater = undefined;
                                } else {

                                    calculatorDisplayTotal.textContent += button.textContent;
                                }

                            } else {

                                // Store first input if firstOperand is already empty

                                if (firstOperand == undefined) {

                                    // Store first input
                                    firstOperand = calculatorDisplayTotal.textContent;

                                    // Reset display to zero
                                    calculatorDisplayTotal.textContent = 0;

                                } else {


                                    // Keep performing operation if there are already defined inputs

                                    if (firstOperand !== undefined && secondOperand !== undefined && operator !== undefined && button.textContent == "=") {
                                        firstOperand = calculatorDisplayTotal.textContent;
                                    } else {
                                        secondOperand = calculatorDisplayTotal.textContent;

                                    }


                                }


                                if (button.textContent !== "=" && Number.isInteger(parseInt(button.textContent)) == false && button.textContent !== "." && firstOperand !== undefined && secondOperand !== undefined) {
                                    console.log("first: " + firstOperand);
                                    console.log("second: " + secondOperand);

                                    calculatorDisplayTotal.textContent = operate(button.textContent, firstOperand, secondOperand);


                                }


                                // Store Operator       
                                if (button.textContent !== "=" && Number.isInteger(parseInt(button.textContent)) == false && button.textContent !== ".") {
                                    if (firstOperand !== undefined && secondOperand !== undefined && operator !== undefined) {
                                        calculatorDisplayTotal.textContent = operate(operator, firstOperand, secondOperand);
                                    }
                                    operator = button.textContent;
                                    console.log("operator: " + operator);

                                }

                                // Perform initial operation
                                if (button.textContent == "=") {
                                    calculatorDisplayTotal.textContent = operate(operator, firstOperand, secondOperand);
                                }


                            }


                        }

                    }


                });
                row.appendChild(button);


            }

        }


        container.appendChild(row);
    }



}
