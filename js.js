// Function definitions for calculator operations (add, subtract, multiply, divide)

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

  if (b === 0) return 'ERROR';
  return a / b;

}

// Initialize variables
let primary   = document.querySelector('#enteredByUser');
let secondary = document.querySelector('#previousComputed');
let first     = '';
let second    = '';
let operator  = '';
let operators = ['+', '-', '/', 'x'];
let op        = false;

// Function to perform calculation based on operator selected
function operate() {
  let ans = 0;
  let a   = Number(first);
  let b   = Number(second);

  switch (operator) {

    case '+':
      ans = add(a, b);
      break;

    case '-':
      ans = subtract(a, b);
      break;

    case 'x':
      ans = multiply(a, b);
      break;

    case '/':
      ans = divide(a, b);
      break;

  }

  if (!isNaN(ans))
    ans = Math.round(ans * 10000) / 10000;

  return ans;

}

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {

  const key = event.key;

  if (key === 'Enter') keyPress('=');

  else if (key === 'Backspace') keyPress('DEL');

  else if (key === 'Escape') keyPress('AC');

  else if (operators.includes(key)) keyPress(key);

  else if (!isNaN(key) || key === '.') keyPress(key);

});

// Event listeners for button clicks

let buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {

  buttons[i].addEventListener('click', function() {
    keyPress(this.textContent);
  });

}

// Function to handle key presses and button clicks
function keyPress(value) {

  if (value === 'AC') {

    first = '';
    operator = '';
    second = '';
    op = false;
    primary.textContent = '0';
    secondary.textContent = '';

  }

  else if (value === 'DEL') {

    if (second.length !== 0) second = second.substring(0, second.length - 1);

    else if (!op) 
      first = first.substring(0, first.length - 1);

    if (second.length === 0 || first.length === 0)
      primary.textContent = '';
    }

    else if (value === '=') {

    if (op && second.length !== 0) {
      op = false;
      first = operate();
      secondary.textContent += ' =';
      second = '';
      operator = '';
    }

    else {
      first = first;
    }

  }

  else if (operators.includes(value)) {

    if (op && second.length !== 0) {
      first = operate();
      op = true;
      second = '';
      operator = value;
    }

    else {
      op = true;
      operator = value;
    }

    primary.textContent = '';
  }

  else if (op && value !== '=') {
    second += value;
  }
  else if (!op) {

    if ((isNaN(first) && !first.includes('.')) || value !== '.') {
      first += value;
    }

  }

  if (second.length !== 0) {
    primary.textContent = second;
  } else if (first.length !== 0 && !op) {
    primary.textContent = first;
  }

  if (op) {
    secondary.textContent = first + ' ' + operator + ' ' + second;
  }
}
