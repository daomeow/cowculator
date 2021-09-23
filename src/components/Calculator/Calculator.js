import { useState } from 'react';
import './Calculator.css';

function Calculator() {
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
      <button onClick={handleClick} name={button} key={button} className={`main-button ${confirmOperator(button) ? null : 'operator'}`}>{button}</button>
    )
  });

   // Addresses data to follow  parentheses order of operations 
  const checkParenthesesPosition = () => {
    const numbers = data.split(' ');

    if (numbers[2].includes('(')) {
      const organized = sortInputsOrder(numbers);
      const joinNumbers = organized.join(' ');
      return joinNumbers.split(/[()]+/).filter(item => item);
    } else {
      return data.split(/[()]+/).filter(item => item);
    };
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
      return addSpaceToOperator();
    } else if (data.indexOf('  ') >= 0) {
      const removeExtraSpaces = data.split(' ').join('').concat();
      return removeExtraSpaces.split('').join(' ');
    } else {
      return data;
    };
  };

  const splitString = () => {
    const inputs = determineKeyOrClick();
    const allNumbers = inputs.split(' ');
    const numbers = updateNumbersToIntegers(allNumbers);
    
    if (numbers.length > 5) {
      setError('Syntax error');
      return error;
    } else {
      return numbers;
    };
  };

  // Addresses data to follow order of operations  
  const cleanNumbers = () => {
    const numbers = splitString();
    const secondOperator = numbers[3];
    if (secondOperator === '/' || secondOperator === '*') {
      return sortInputsOrder(numbers);
    } else {
      return numbers;
    };
  };

  const checkForParentheses = () => {
    if (data.includes('(')) {
      return splitWithParentheses();
    } else {
      return cleanNumbers();
    }
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

  const runCalculation = () => {
    let a, operator, b, secondOperator, c;
    [a, operator, b, secondOperator, c] = checkForParentheses();

    if (checkForParentheses().length > 3) {
      let firstResult = calculateNumbers(a, operator, b);
      return (calculateNumbers(firstResult, secondOperator, c));
    } else if (checkForParentheses().length === 3) {
      return (calculateNumbers(a, operator, b));
    };
  };

  const setResult = () => {
    const result = runCalculation();

    if (!result === NaN) {
      setTotal(result);
    } else {
      setError('Syntax error');
    }
  };

  // Updates numbers to integers and leaves operators as strings 
  const updateNumbersToIntegers = (numbers) => {
    return numbers.map(item => {
      if (item !== '+' && item !== '-' && item !== '*' && item !== '/') {
        return parseFloat(item);
      } else {
        return item;
      }
    });
  };

  // Moves first number and operator to the back
  const sortInputsOrder = (numbers) => {
    const firstNumber = numbers.splice(0, 1);
    const removedOperator = numbers.splice(0, 1);
    const combine = numbers.concat(removedOperator);
    return combine.concat(firstNumber);
  };

  const addSpaceToOperator = () => {
    const operators = ['+', '-',  '*', '/'];
    const currentOperator = operators.find(number => data.includes(number));
    return data.replace(currentOperator, ' ' + currentOperator + ' ');   
  };

  // Check if input can be set to +/-
  const checkInputInteger = () => {
    if (data.length === 0 || isNaN(data.slice(-1))) {
      setError('Syntax error');
    } else {
      return parseFloat(data.slice(-1));
    }
  };

  // Toggle integer to be positive or negative
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
            <div className='total'>{total}</div>
            <input type='text' value={data} readOnly onKeyDown={handleKey}/>
          </section>
        : <span className='error'>{error}</span>
      }
      <section>
        <button onClick={clearInput} className='main-button clear'>Clear</button>
        <button onClick={backspaceInput} name='back' className='main-button operator'>c</button>
      </section>
      <section className='button-container'>
        {buttonList}
        <button onClick={handleClick} name='.' className='main-button'>.</button>
        <button onClick={updateWithToggle} name ='+/-'className='main-button'>+/-</button>
        <button onClick={setResult} name='=' className='main-button operator equals'>=</button>
      </section>
    </main>
  )
};

export default Calculator;


