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
    let equalsPressed;
    equalsPressed = false;

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
        result.textContent = "0";
        result.style.textAlign = "right";
        result.style.fontSize = "5.5vh";
        result.style.borderRadius = "2%"
        result.style.display = "flex-reverse";
        result.style.alignItems = "end";


        if (i == 0) {

            row.appendChild(result);
        }

        if (i == 1) {

            let button = document.createElement("button");
            button.textContent = "C";

            button.addEventListener("click", function () {
                firstOperand = undefined;
                secondOperand = undefined;
                operator = undefined;
                calculatorDisplayTotal.textContent = "0";
                console.clear();
            });

            let backSpaceButton = document.createElement("button");
            backSpaceButton.textContent = "<";

            backSpaceButton.addEventListener("click", function () {

                if (calculatorDisplayTotal.textContent.length > 1) {

                    let calculatorDisplayTotalArray = calculatorDisplayTotal.textContent.split('');
                    calculatorDisplayTotalArray.pop();
                    let modifiedArray = calculatorDisplayTotalArray.toString().replaceAll(',', "");
                    calculatorDisplayTotal.textContent = modifiedArray;

                } else {
                    calculatorDisplayTotal.textContent = "0";
                }
            });

            row.append(backSpaceButton);
            row.append(button);

            window.addEventListener("keydown", (event) => {

                if (event.key == "Backspace") {
                    backSpaceButton.click();
                }

                if (event.key == button.textContent.toLowerCase()) {
                    button.click();
                }
            });

        }

        if (i >= 2) {

            for (j = 0; j < 4; j++) {
                let button = document.createElement("button");

                window.addEventListener("keydown", (event) => {
                    if (event.key == button.textContent) {
                        button.click();
                    }
                });

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
                                }
                                else {

                                    calculatorDisplayTotal.textContent += button.textContent;
                                }

                            } else {



                                // Keep performing equals operation if there are already defined inputs

                                if (button.textContent == "=") {

                                    if (firstOperand == undefined && secondOperand == undefined && operator == undefined) {
                                        return;
                                    }

                                    if (firstOperand !== undefined && secondOperand !== undefined && operator !== undefined) {
                                        firstOperand = calculatorDisplayTotal.textContent;
                                    } else {
                                        secondOperand = calculatorDisplayTotal.textContent;

                                    }

                                    calculatorDisplayTotal.textContent = operate(operator, firstOperand, secondOperand);
                                    equalsPressed = true;
                                }


                                // Store Operator       

                                if (button.textContent !== "=" && Number.isInteger(parseInt(button.textContent)) == false && button.textContent !== ".") {


                                    if (firstOperand == undefined) {

                                        firstOperand = calculatorDisplayTotal.textContent;
                                        calculatorDisplayTotal.textContent = 0;
                                        console.log("first: " + firstOperand);

                                    } else {
                                        secondOperand = calculatorDisplayTotal.textContent;
                                        console.log("second: " + secondOperand);

                                    }

                                    if (firstOperand !== undefined && secondOperand !== undefined) {

                                        if (equalsPressed == true) {

                                            firstOperand = calculatorDisplayTotal.textContent;
                                            equalsPressed = false;

                                        } else {

                                            calculatorDisplayTotal.textContent = operate(operator, firstOperand, secondOperand);
                                            firstOperand = calculatorDisplayTotal.textContent;

                                        }

                                    }

                                    operator = button.textContent;
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

buildCalculator();