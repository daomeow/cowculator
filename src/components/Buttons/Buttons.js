import { useState } from 'react';
import './Buttons.css';

function Buttons() {
  const buttonInputs = [7, 8, 9, ' / ', 4, 5, 6, ' * ', 1, 2, 3, ' + ', 0, '(', ')', ' - '];
  const [data, setData] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');

  const handleClick = (event) => {
    setData(data.concat(event.target.name));
  };
  
  const handleKey = (event) => {
    if (event.key === 'Enter') {
      setResult();
    } else if(event.key === 'Backspace') {
      clearInput();
    } else {
      setData(data.concat(event.key));
    }
  };

  const clearInput = () => {
    setData('');
    setTotal('');
    setError('');
  };

  const backspaceInput = () => {
    setData(data.slice(0, data.length - 1));
    setTotal('');
    setError('');
  };

  // Check if the button is an operator 
  const confirmOperator = (value) => {
    return !isNaN(value) || value === '.' || value === '+/-' || value === '(' || value === ')';
  };

  // Generate buttons
  const buttonList = buttonInputs.map(button => {
    return (
      <button onClick={handleClick} onKeyDown={handleKey} name={button} key={button} className={`main-button ${confirmOperator(button) ? null : 'operator'}`}>{button}</button>
    )
  });

  // check position then arrange
  const checkParenthesesPosition = () => {
    const numbers = data.split(' ');

    if (numbers[2].includes('(')) {
      const firstNumber = numbers.splice(0, 1);
      const removedOperator = numbers.splice(0, 1);
      const combine = numbers.concat(removedOperator);
      const organized = combine.concat(firstNumber);
      const joinNumbers = organized.join(' ');
      return joinNumbers.split(/[()]+/).filter(item => item);
    } else {
      return data.split(/[()]+/).filter(item => item);
    }
  };

  // Method to split with parentheses
  const splitWithParentheses = () => {
    const organizedData = checkParenthesesPosition(); 
    // Two arrays of inputs as individual strings 
    const separateInputs = organizedData.map(item => item.split(''));
    const combine = separateInputs.flat();
    const removeSpaces = combine.filter(function(entry) { return entry.trim() !== ''; });
    const numbers = updateNumbersToIntegers(removeSpaces);
    
    if (numbers.length > 5) {
      setError('Syntax error');
      return error;
    } else {
      return numbers;
    };
  };

  const determineKeyOrClick = () => {
    if (!data.includes(' ')) {
      return data.split('').join(' ');
    } else {
      return data;
    }
  };

  // split the string by spaces >> 1 + 2 + 3 >> [1 '+' 2] ['+' 3] >> [3 '+' 3]
  const updateNumbersToIntegers = (numbers) => {
    return numbers.map(item => {
      if (item !== '+' && item !== '-' && item !== '*' && item !== '÷') {
        return parseFloat(item);
      } else {
        return item;
      }
    });
  };

  const splitString = () => {
    const inputs = determineKeyOrClick();
    const allNumbers = inputs.split(' ');
    const numbers = updateNumbersToIntegers(allNumbers);

    if (numbers.length > 5) {
      console .log('here')
      setError('Syntax error');
      return error;
    } else {
      return numbers;
    }
  };

  // method to check operator & rearrange (without parentheses)
  const cleanNumbers = () => {
    const numbers = splitString();
    const secondOperator = numbers[3];
    
    if (secondOperator === '÷' || secondOperator === '*') {
      const firstNumber = numbers.splice(0, 1);
      const removedOperator = numbers.splice(0, 1);
      const combine = numbers.concat(removedOperator);
      return combine.concat(firstNumber);
    } else {
      return numbers;
    };
  };

  const calculateNumbers = (a, operator, b) => {
    switch(operator) { 
      case '+': return a + b;
      case '-': return a - b; 
      case '*': return a * b; 
      case '/': return a / b;
      default: return error;
    };
  };

  const checkForParentheses = () => {
    if (data.includes('(')) {
      return splitWithParentheses();
    } else {
      return cleanNumbers();
    }
  };

  const setResult = () => {
    let a, operator, b, secondOperator, c;
    [a, operator, b, secondOperator, c] = checkForParentheses();

    if (checkForParentheses().length > 3) {
      let firstResult = calculateNumbers(a, operator, b);
      setTotal(calculateNumbers(firstResult, secondOperator, c));
    } else if (checkForParentheses().length === 3) {
      setTotal(calculateNumbers(a, operator, b));
    };
  };

  // Check if input can be set to +/-
  const checkInputInteger = () => {
    if (data.length === 0 || isNaN(data)) {
      setError('Syntax Error');
    } else {
      return parseFloat(data.slice(-1));
    }
  };

  // Toggle last integer to be positive or negative
  const toggleNegativePositive = () => {
    const number = checkInputInteger();
    const checkNumber = Math.sign(number);
    
    if (checkNumber === 1 && !error) {
      return -Math.abs(number);
    } else if (checkNumber === -1 && !error) {
      return Math.abs(number);
    } else {
      return error;
    }
  };
  
  const updateWithToggle = () => {
    const number = toggleNegativePositive().toString();
    const newData = data.substring(0, data.length -1);
    setData(newData + number);
  };

  return (
    <main>
      {error === ''
        ? <section className='display'>
            <div>{total}</div>
            <div>{data}</div>
          </section>
        : <span className='error'>{error}</span>
      }
      <section>
        <button onClick={clearInput} className='main-button clear'>Clear</button>
        <button onClick={backspaceInput} className='main-button operator'>c</button>
      </section>
      <section className='button-container'>
        {buttonList}
        <button onClick={handleClick} name='.' className='main-button'>.</button>
        <button onClick={updateWithToggle} className='main-button'>+/-</button>
        <button onClick={setResult} name='=' className='main-button operator equals'>=</button>
      </section>
    </main>
  )
};

export default Buttons;


