document.addEventListener("DOMContentLoaded", function () {
  class PivemoCalculator {
    constructor(displayNumbers, prevDisplayNumber) {
      this.displayNumbers = displayNumbers;
      this.prevDisplayNumber = prevDisplayNumber;
      this.clear();
    }

    clear() {
      // Clear display and calculation
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = undefined;
      this.prevDisplayNumber.innerText = "";
      this.displayNumbers.style.fontSize = "";
      this.showShadow(true);
    }

    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addNumber(number) {
      // Add number to calculate
      this.showShadow(false);
      if (number === "." && this.currentOperand.includes(".")) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseMethod(operation) {
      // Choose what method to calculate
      if (this.currentOperand === "") return;
      if (this.previousOperand !== "") {
        this.calculate();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }

    calculate() {
      // Make calculation
      let calculation;
      const previousNumber = parseFloat(this.previousOperand);
      const currentNumber = parseFloat(this.currentOperand);
      if (isNaN(previousNumber) && isNaN(currentNumber)) return;
      switch (this.operation) {
        case "+":
          calculation = previousNumber + currentNumber;
          break;
        case "-":
          calculation = previousNumber - currentNumber;
          break;
        case "*":
          calculation = previousNumber * currentNumber;
          break;
        case "÷":
          calculation = previousNumber / currentNumber;
          break;
        default:
          return;
      }
      this.currentOperand = calculation;
      this.operation = undefined;
      this.previousOperand = "";
      this.prevDisplayNumber.innerText = "";
    }

    display() {
      // Display valu on display
      this.displayNumbers.innerText = this.currentOperand;
      if (this.operation != null) {
        this.prevDisplayNumber.innerText = `${this.previousOperand} ${this.operation}`;
      }

      if (this.displayNumbers.offsetWidth > document.querySelector(".calculator-display").clientWidth) {
        let percentage = (this.displayNumbers.offsetWidth - document.querySelector(".calculator-display").clientWidth) / this.displayNumbers.offsetWidth;
        let currentFontSize = parseFloat(window.getComputedStyle(this.displayNumbers).fontSize);
        let newFontSize = Math.round(currentFontSize - currentFontSize * percentage) - 3;

        this.displayNumbers.style.fontSize = `${newFontSize}px`;
      }
    }

    showShadow(show) {
      if (show) {
        this.displayNumbers.classList.add("show-shadow-number");
      } else if (this.displayNumbers.classList.contains("show-shadow-number")) {
        this.displayNumbers.classList.remove("show-shadow-number");
      }
    }
  }

  const calculatorDisplay = document.querySelector("[data-display]");
  const prevDisplay = document.querySelector("[data-prev-op]");
  const numberButtons = document.querySelectorAll("[data-number]");
  const methodButtons = document.querySelectorAll("[data-method]");
  const clearButton = document.querySelector("[data-clear]");
  const deleteButton = document.querySelector("[data-del]");
  const equalsButton = document.querySelector("[data-equals]");

  if (calculatorDisplay != null) {
    const calculator = new PivemoCalculator(calculatorDisplay, prevDisplay);

    numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        calculator.addNumber(button.innerText);
        calculator.display();
      });
    });

    methodButtons.forEach((button) => {
      button.addEventListener("click", () => {
        calculator.chooseMethod(button.innerText);
        calculator.display();
      });
    });

    equalsButton.addEventListener("click", (button) => {
      calculator.calculate();
      calculator.display();
    });

    clearButton.addEventListener("click", (button) => {
      calculator.clear();
      calculator.display();
    });

    deleteButton.addEventListener("click", (button) => {
      calculator.delete();
      calculator.display();
    });
  }
});
