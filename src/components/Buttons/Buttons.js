import { useState, useEffect } from 'react';
import './Buttons.css';

function Buttons() {
  const buttonInputs = [7, 8, 9, ' ÷ ', 4, 5, 6, ' x ', 1, 2, 3, ' + ', 0, '(', ')', ' - '];
  const [data, setData] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');

  const handleClick = (event) => {
    setData(data.concat(event.target.name));
  };

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
      <button onClick={handleClick} name={button} key={button} className={`main-button ${confirmOperator(button) ? null : 'operator'}`}>{button}</button>
    )
  });

  // split the string by spaces >> 1 + 2 + 3 >> [1 '+' 2] ['+' 3] >> [3 '+' 3]
  const splitString = () => {
    let numbers = data.split(' ').map(item => {
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
  };

  // method to check operator & rearrange 
  const cleanNumbers = () => {
    let a, operator, b, secondOperator, c;
    let numbers = splitString();

    if (error !== 'Syntax error') {
      [a, operator, b, secondOperator, c] = numbers;
    }
    
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

  const setResult = () => {
    let a, operator, b, secondOperator, c;
    [a, operator, b, secondOperator, c] = cleanNumbers();

    if (splitString().length > 3) {
      let firstResult = calculateNumbers(a, operator, b);
      setTotal(calculateNumbers(firstResult, secondOperator, c));
    } else if (splitString().length === 3) {
      setTotal(calculateNumbers(a, operator, b));
    };
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
        <button onClick={cleanNumbers} className='main-button'>+/-</button>
        <button onClick={setResult} name='=' className='main-button operator equals'>=</button>
      </section>
    </main>
  )
}

export default Buttons;


