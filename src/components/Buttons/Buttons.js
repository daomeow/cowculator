import { useState } from 'react';
import './Buttons.css';

function Buttons() {
  const buttonInputs = [7, 8, 9, ' ÷ ', 4, 5, 6, ' x ', 1, 2, 3, ' + ', 0, '.', '+/-', ' - ', '(', ')'];
  const [data, setData] = useState('');
  const [total, setTotal] = useState(0)
  const handleClick = (event) => {
    setData(data.concat(event.target.name));
  };

  const clearInput = () => {
    setData('');
    setTotal(0);
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


  // split the string by spaces >> 1 + 2 + 3 >> [1 '+' 2] ['+' 3] >> [3 '+' 3]
  const splitString = () => {
    let numbers = data.split(' ').map(item => {
      if (item !== '+' && item !== '-' && item !== 'x' && item !== '÷') {
        return parseInt(item);
      } else {
        return item;
      }
    });
    return numbers;
    // part 2. consider another operator
  }

  const calculateNumbers = () => {
    let a, operatorString, b;
    [a, operatorString, b] = splitString();

    switch(operatorString) { 
      case '+': setTotal(a + b); 
      case '-': setTotal(a - b); 
      case 'x': setTotal(a * b); 
      case '÷': setTotal (a / b); 
    } 
  }
  console.log(total)



  return (
    <main>
      <input type='text' value={data}/>
      <section>
        <button onClick={clearInput} className='main-button clear'>Clear</button>
        <button onClick={backspaceInput} className='main-button operator'>c</button>
      </section>
      <section className='button-container'>
        {buttonList}
        <button onClick={calculateNumbers} name='=' className='main-button operator equals'>=</button>
      </section>
    </main>
  )
}

export default Buttons;


// considerations: overflow for inputs 