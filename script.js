const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const toggleBall = document.querySelector(".toggle-ball");
const allCalcButton = document.querySelectorAll(".one_calc_button");
const calcButton = document.querySelector(".calc_buttons");
const special = document.querySelector(".special");
const reset = document.querySelector(".reset");
const equal = document.querySelector(".equal");
const topEl = document.querySelector(".top");
const compStyle = window.getComputedStyle(toggleBall);
const screen = document.querySelector(".screen");

let clickCount = 0;

let runningTotal = 0;
let buffer = "0";
let previousOperator;

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "RESET":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "DEL":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calc_buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();

toggle.addEventListener("click", function () {
  clickCount++;

  if (clickCount % 3 === 2) {
    toggleBall.style.left = "22px";
    toggle.classList.add("two");
    toggle.classList.remove("three");
    body.classList.add("two");
    body.classList.remove("three");
    toggleBall.classList.add("two");
    toggleBall.classList.remove("three");
    screen.classList.add("two");
    screen.classList.remove("three");
    allCalcButton.forEach((calcButton) => {
      calcButton.classList.add("two");
      calcButton.classList.remove("three");
    });
    calcButton.classList.add("two");
    calcButton.classList.remove("three");
    special.classList.add("two");
    special.classList.remove("three");
    reset.classList.add("two");
    reset.classList.remove("three");
    equal.classList.add("two");
    equal.classList.remove("three");
    topEl.classList.add("two");
    topEl.classList.remove("three");
  } else if (clickCount % 3 === 0) {
    toggleBall.style.left = "42px";
    toggle.classList.add("three");
    toggle.classList.remove("two");
    body.classList.add("three");
    body.classList.remove("two");
    toggleBall.classList.add("three");
    toggleBall.classList.remove("two");
    screen.classList.add("three");
    screen.classList.remove("two");
    allCalcButton.forEach((calcButton) => {
      calcButton.classList.add("three");
      calcButton.classList.remove("two");
    });
    calcButton.classList.add("three");
    calcButton.classList.remove("two");
    special.classList.add("three");
    special.classList.remove("two");
    reset.classList.add("three");
    reset.classList.remove("two");
    equal.classList.add("three");
    equal.classList.remove("two");
    topEl.classList.add("three");
    topEl.classList.remove("two");
  } else {
    toggleBall.style.left = "5px";
    toggle.classList.remove("two");
    toggle.classList.remove("three");
    body.classList.remove("two");
    body.classList.remove("three");
    toggleBall.classList.remove("two");
    toggleBall.classList.remove("three");
    screen.classList.remove("two");
    screen.classList.remove("three");
    allCalcButton.forEach((calcButton) => {
      calcButton.classList.remove("two");
      calcButton.classList.remove("three");
    });
    calcButton.classList.remove("two");
    calcButton.classList.remove("three");
    special.classList.remove("two");
    special.classList.remove("three");
    reset.classList.remove("two");
    reset.classList.remove("three");
    equal.classList.remove("two");
    equal.classList.remove("three");
    topEl.classList.remove("two");
    topEl.classList.remove("three");
  }
});
