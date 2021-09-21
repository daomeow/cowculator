import { useState } from 'react';
import './Buttons.css';

function Buttons() {
  const buttonInputs = [7, 8, 9, ' ÷ ', 4, 5, 6, ' x ', 1, 2, 3, ' + ', 0, '(', ')', ' - '];
  const [data, setData] = useState('');

  const handleClick = (event) => {
    setData(data.concat(event.target.name));
  };

  const clearInput = () => {
    setData('');
  };

  const backspaceInput = () => {
    setData(data.slice(0, data.length - 1));
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

  // Toggle last integer to be positive or negative 
  // const toggleNegativePostivie = () => {
  //   let integer = Math.sign(splitString().pop())
  //   console.log(integer)
  //   if (integer === 1) {
  //     console.log('pos')
  //     setData(-Math.abs(integer));
  //   } else if (integer === -1) {
  //     console.log('neg')
  //     setData(Math.abs(integer));
  //   }
  // }

  // split the string by spaces >> 1 + 2 + 3 >> [1 '+' 2] ['+' 3] >> [3 '+' 3]
  const splitString = () => {
    let numbers = data.split(' ').map(item => {
      if (item !== '+' && item !== '-' && item !== 'x' && item !== '÷') {
        return parseFloat(item);
      } else {
        return item;
      }
    });
    return numbers;
  }

  const calculateNumbers = (a, operator, b) => {
    switch(operator) { 
      case '+': return a + b;
      case '-': return a - b; 
      case 'x': return a * b; 
      case '÷': return a / b;
    } 
  }

  // method to check operator & rearrange 


  const setResult = () => {
    let a, operator, b, secondOperator, c;
    [a, operator, b, secondOperator, c] = splitString();

    if (splitString().length > 3) {
      let firstResult = calculateNumbers(a, operator, b)
      setData(calculateNumbers(firstResult, secondOperator, c));
    } else if (splitString().length === 3) {
      setData(calculateNumbers(a, operator, b));
    }
  }

  return (
    <main>
      {data ?
        <input type='text' value={data}/>
      : <input type='text' value='0'/>
      }
      <section>
        <button onClick={clearInput} className='main-button clear'>Clear</button>
        <button onClick={backspaceInput} className='main-button operator'>c</button>
      </section>
      <section className='button-container'>
        {buttonList}
        <button onClick={handleClick} name='.' className='main-button'>.</button>
        <button onClick={handleClick} className='main-button'>+/-</button>
        <button onClick={setResult} name='=' className='main-button operator equals'>=</button>
      </section>
    </main>
  )
}

export default Buttons;


