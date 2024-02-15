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
    return "Cannot divide by zero";
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

// Test the operate function
console.log("Addition:", operate("+", 5, 3)); // Output: 8
console.log("Subtraction:", operate("-", 5, 3)); // Output: 2
console.log("Multiplication:", operate("*", 5, 3)); // Output: 15
console.log("Division:", operate("/", 6, 3)); // Output: 2
console.log("Invalid Operator:", operate("%", 6, 3)); // Output: "Invalid operator"

// function operate(operator, num1, num2) {}
console.log("Addition:", add(5, 3));
console.log("Subtraction:", subtract(5, 3));
console.log("Multiplication:", multiply(5, 3));
console.log("Division:", divide(6, 3));
console.log("Division by zero:", divide(6, 0));
