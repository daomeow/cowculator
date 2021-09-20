import { useState } from 'react';
import './Buttons.css';

function Buttons() {
  const buttonInputs = [7, 8, 9, ' ÷ ', 4, 5, 6, ' x ', 1, 2, 3, ' + ', 0, '.', '+/-', ' - ', '(', ')'];
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


  // split the string by spaces >> 1 + 2 + 3 >> [1 '+' 2] ['+' 3] >> [3 '+' 3]

  const splitString = () => {
    let numbers = data.split(' ').map(item => {
      if (item !== '+') {
        return parseInt(item);
      } else {
        return item;
      }
    });
    console.log(numbers)
  }


  // Equals helper method 

  return (
    <main>
      <input type='text' value={data}/>
      <section>
        <button onClick={clearInput} className='main-button clear'>Clear</button>
        <button onClick={backspaceInput} className='main-button operator'>c</button>
      </section>
      <section className='button-container'>
        {buttonList}
        <button onClick={splitString} name='=' className='main-button operator equals'>=</button>
      </section>
    </main>
  )
}

export default Buttons;


// considerations: overflow for inputs 