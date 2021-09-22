import { useState } from 'react';
import './Buttons.css';

function Buttons() {
  const buttonInputs = [7, 8, 9, ' ÷ ', 4, 5, 6, ' x ', 1, 2, 3, ' + ', 0, '(', ')', ' - '];
  const [data, setData] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');
  // const keyPressedNumbersAllowed = ['0','1','2','3','4','5','6','7','8','9'];
  // const keyPressedOperatorsAllowed = ['/', '*', '-', '+', 'Enter'];

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
  }

  console.log(data)
  // console.log(total)

  const clearInput = () => {
    setData('');
    setTotal('');
    setError('');
  };

  const backspaceInput = () => {
    setData(data.slice(0, data.length - 1));
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
    let numbers = data.split(' ');

    if (numbers[2].includes('(')) {
      let firstNumber = numbers.splice(0, 1);
      let removedOperator = numbers.splice(0, 1);
      let combine = numbers.concat(removedOperator);
      let organized = combine.concat(firstNumber);
      let joinNumbers = organized.join(' ');
      return joinNumbers.split(/[()]+/).filter(item => item);
    } else {
      return data.split(/[()]+/).filter(item => item);
    }
  };

  // Method to split with parentheses
  const splitWithParentheses = () => {
    let organizedData = checkParenthesesPosition(); 
    // Two arrays of inputs as individual strings 
    const separateInputs = organizedData.map(item => item.split(''));
    const combine = separateInputs.flat();
    const removeSpaces = combine.filter(function(entry) { return entry.trim() !== ''; });

    // Change numbers from string to integers & leave operators as strings 
    let numbers = removeSpaces.map(item => {
      if (item !== '+' && item !== '-' && item !== 'x' && item !== '÷') {
        return parseFloat(item);
      } else {
        return item;
      }
    });

    if (numbers.length > 5) {
      setError('Syntax error');
      return error;
    } else {
      return numbers;
    }
  }

  const determineKeyOrClick = () => {
    if (!data.includes(' ')) {
      console.log('yep')
      return data.split('').join(' ')
    } else {
      return data;
    }
  }

  // split the string by spaces >> 1 + 2 + 3 >> [1 '+' 2] ['+' 3] >> [3 '+' 3]
  const splitString = () => {
    let inputs = determineKeyOrClick();
    let allNumbers = inputs.split(' ');
    console.log(allNumbers)
    let numbers = allNumbers.map(item => {
      if (item !== '+' && item !== '-' && item !== 'x' && item !== '÷') {
        return parseFloat(item);
      } else {
        return item;
      }
    });

    if (numbers.length > 5) {
      setError('Syntax error');
      return error;
    } else {
      // console.log(numbers)
      return numbers;
    }
  };

  // method to check operator & rearrange (without parentheses)
  const cleanNumbers = () => {
    let a, operator, b, secondOperator, c;
    let numbers = splitString();
    [a, operator, b, secondOperator, c] = numbers;
    
    if (secondOperator === '÷' || secondOperator === 'x') {
      let firstNumber = numbers.splice(0, 1);
      let removedOperator = numbers.splice(0, 1);
      let combine = numbers.concat(removedOperator);
      return combine.concat(firstNumber);
    } else {
      return numbers;
    };
  };

  const calculateNumbers = (a, operator, b) => {
    switch(operator) { 
      case '+': return a + b;
      case '-': return a - b; 
      case 'x': return a * b; 
      case '÷': return a / b;
    };
  };

  const checkForParentheses = () => {
    if (data.includes('(')) {
      return splitWithParentheses();
    } else {
      return cleanNumbers();
    }
  }

  const setResult = () => {
    let a, operator, b, secondOperator, c;
    [a, operator, b, secondOperator, c] = checkForParentheses();

    if (splitString().length > 3) {
      let firstResult = calculateNumbers(a, operator, b);
      setTotal(calculateNumbers(firstResult, secondOperator, c));
    } else if (splitString().length === 3) {
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
  }

  // Toggle last integer to be positive or negative
  const toggleNegativePositive = () => {
    let number = checkInputInteger();
    let checkNumber = Math.sign(number);
    
    if (checkNumber === 1 && !error) {
      return -Math.abs(number);
    } else if (checkNumber === -1 && !error) {
      return Math.abs(number);
    } else {
      return error;
    }
  };
  
  const updateWithToggle = () => {
    let number = toggleNegativePositive().toString();
    let newData = data.substring(0, data.length -1);
    setData(newData + number);
  }

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
}

export default Buttons;


