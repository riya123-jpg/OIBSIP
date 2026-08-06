const display = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const controlButtons = document.querySelectorAll(".control-btn");
const equalButton = document.querySelector(".equal-btn");

let firstNumber = "";
let operator = "";
let secondNumber = "";
numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn.value);
    if (display.value === "0") {
      display.value = btn.value;
    } else {
      display.value += btn.value;
    }
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (display.value === "") {
      operator = btn.value;
    } else {
      firstNumber = display.value;
      operator = btn.value;
      display.value = "";
    }
    console.log(firstNumber);
    console.log(operator);
  });
});

let result = "";

function calculate() {
  const num1 = Number(firstNumber);
  const num2 = Number(secondNumber);

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;

    case "-":
      result = num1 - num2;
      break;

    case "*":
      result = num1 * num2;
      break;

    case "/":
      if (secondNumber === "0") {
        result = "Cannot divide by zero";
      } else {
        result = num1 / num2;
      }
      break;

    default:
      return;
  }
  return result;
}

function updateState(result) {
  display.value = result;

  firstNumber = result;
  operator = "";
  secondNumber = "";
}
equalButton.addEventListener("click", () => {
  if (!firstNumber || !operator || display.value === "") {
    return;
  }

  secondNumber = display.value;
  result = calculate();
  updateState(result);
});

function resetCalculator() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  result = "";
  display.value = 0;
}
function backspace() {
  if (display.value.length === 1) {
    display.value = 0;
  } else {
    display.value = display.value.slice(0, -1);
  }
}
controlButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.value === "C") {
      resetCalculator();
    } else if (btn.value === "back") {
      backspace();
    }
  });
});
function appendDecimal() {
  if (display.value === "") {
    display.value = "0.";
    return;
  }
  if (display.value.includes(".")) {
    return;
  }
  display.value += decimalBtn.value;
}
let decimalBtn = document.querySelector(".decimal-btn");
decimalBtn.addEventListener("click", () => {
  appendDecimal();
});
