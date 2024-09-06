import React, { useState } from 'react'; 
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null); 
  const [operator, setOperator] = useState(null); 
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false); 

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => { 
    setDisplay('0'); 
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false); 
  };
const backspace = () => {
  if (display.length === 1) {
    setDisplay('0'); 
  } else {
    setDisplay(display.slice(0, -1));
  }
};
const inputPercent = () => {
  const currentValue = parseFloat(display); 
  if (isNaN(currentValue)) return; 
  setDisplay(String(currentValue / 100)); 
};

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);
  
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }
  
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };


  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };
  const finalizeOperator = ()=>{
if (operator && firstOperand !==null &&! waitingForSecondOperand) {
  const inputValue = parseFloat(display);
  const result = calculate(firstOperand, inputValue, operator);
  setDisplay(String(result));
  setFirstOperand(null);
  setOperator(null);
  setWaitingForSecondOperand(true);
}
  }

  return (
    <div className="calculator">
    <div className="display">{display}</div>
    <div className="keypad">
    <button onClick={clearDisplay}>C</button>
    <button onClick={backspace}>x</button>
    <button onClick={inputPercent}>%</button>
    <button onClick={() => performOperation('/')}>/</button>
      <button onClick={() => inputDigit(7)}>7</button>
      <button onClick={() => inputDigit(8)}>8</button>
      <button onClick={() => inputDigit(9)}>9</button>
      <button onClick={() => performOperation('+')}>+</button>
      <button onClick={() => inputDigit(4)}>4</button>
      <button onClick={() => inputDigit(5)}>5</button>
      <button onClick={() => inputDigit(6)}>6</button>
      <button onClick={() => performOperation('-')}>-</button>
      <button onClick={() => inputDigit(1)}>1</button>
      <button onClick={() => inputDigit(2)}>2</button>
      <button onClick={() => inputDigit(3)}>3</button>
      <button onClick={() => performOperation('*')}>*</button>
      <button onClick={() => inputDigit(0)}>0</button>
      <button onClick={inputDecimal}>.</button>
      <button onClick={finalizeOperator}>=</button>
  
    
    </div>
  </div>
  );
}

export default App;
