const display = document.getElementById("display");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const backspaceButton = document.getElementById("backspace");
const numberButtons = document.querySelectorAll("[data-value]");
const toggleSignButton = document.getElementById("toggle-sign");
const operatorButtons = document.querySelectorAll("[data-operator]");

let firstOperand = null;
let secondOperand = null;
let operatorValue = null;
let displayValue = 0;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Nice Try";
  }
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

function updateDisplay() {
  document.getElementById("display").value = displayValue;
  console.log("firstoperand:", firstOperand);
  console.log("secondoperand:", secondOperand);
}
updateDisplay();

function appendNumber(number) {
  if (number === ".") {
    if (operatorValue === null) {
      if (!displayValue.toString().includes(".")) {
        firstOperand =
          firstOperand === null
            ? displayValue.toString() + number
            : firstOperand + number;
        displayValue = firstOperand;
        updateDisplay();
      }
    } else {
      if (!secondOperand?.toString().includes(".")) {
        secondOperand =
          secondOperand === null ? "0" + number : secondOperand + number;
        displayValue = secondOperand;
        updateDisplay();
      }
    }
  } else {
    if (operatorValue === null) {
      if (firstOperand === null) {
        firstOperand = number;
      } else {
        firstOperand = parseFloat(firstOperand.toString() + number.toString());
      }
      displayValue = firstOperand;
    } else {
      if (secondOperand === null) {
        secondOperand = number;
      } else {
        secondOperand = parseFloat(
          secondOperand.toString() + number.toString()
        );
      }
      displayValue = secondOperand;
    }

    updateDisplay();
  }
}

function setOperator(selectedOperator) {
  if (operatorValue && secondOperand !== null) {
    calculate();
  }

  if (firstOperand !== null) {
    operatorValue = selectedOperator;
    updateDisplay();
  }

  if (firstOperand === null || displayValue === 0) {
    firstOperand = displayValue;
    operatorValue = selectedOperator;
  }
}

function calculate() {
  let result;
  if (
    firstOperand !== null &&
    secondOperand !== null &&
    operatorValue !== null
  ) {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    if (operatorValue === "/" && num2 === 0) {
      result = operate(operatorValue, num1, num2);
      firstOperand = null;
    } else {
      result = operate(operatorValue, num1, num2);
      result = Math.round(result * 100) / 100;
      firstOperand = result;
    }
    secondOperand = null;
    operatorValue = null;
    displayValue = result;

    updateDisplay();
  }
}

function toggleSign() {
  if (operatorValue === null) {
    if (firstOperand !== null) {
      firstOperand = -firstOperand;
      display.value = firstOperand;
    }
  } else {
    if (secondOperand !== null) {
      secondOperand = -secondOperand;
      display.value = secondOperand;
    }
  }
}

function backspace() {
  if (operatorValue === null) {
    if (firstOperand !== null) {
      firstOperand = firstOperand.toString().slice(0, -1);
      displayValue = firstOperand || 0;
    }
  } else {
    if (secondOperand !== null) {
      secondOperand = secondOperand.toString().slice(0, -1);
      displayValue = secondOperand || 0;
    }
  }
  updateDisplay();
}

function clearDisplay() {
  displayValue = 0;
  firstOperand = null;
  secondOperand = null;
  operatorValue = null;
  updateDisplay();
}

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOperator(button.dataset.operator);
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.dataset.value);
  });
});
equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearDisplay);
toggleSignButton.addEventListener("click", function () {
  toggleSign();
});
backspaceButton.addEventListener("click", function () {
  backspace();
});

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    setOperator(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  }
});
