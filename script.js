let displayValue = "";

function updateDisplay() {
  document.getElementById("display").value = displayValue;
}

function appendNumber(number) {
  displayValue += number;
  updateDisplay();
}

function setOperator(operator) {
  displayValue += operator;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}

function calculate() {
  let result = eval(displayValue);
  if (result === Infinity || isNaN(result)) {
    result = "Error";
  }
  displayValue = result;
  updateDisplay();
}

function appendDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
    updateDisplay();
  }
}

function toggleSign() {
  if (displayValue.startsWith("-")) {
    displayValue = displayValue.substring(1);
  } else {
    displayValue = "-" + displayValue;
  }
  updateDisplay();
}

function backspace() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}


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
