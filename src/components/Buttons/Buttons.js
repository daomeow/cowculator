import { useState } from 'react';
import './Buttons.css';

function Buttons() {
  const buttonInputs = [7, 8, 9, '÷', 4, 5, 6, 'x', 1, 2, 3, '+', 0, '.', '+/-', '-'];
  const [result, setResult] = useState('');

  const handleClick = (event) => {
    setResult(result.concat(event.target.name));
  };

  const clearInput = () => {
    setResult('');
  };

  const backspaceInput = () => {
    setResult(result.slice(0, result.length - 1));
  };

  // Check if the button is an operator 
  const confirmOperator = (value) => {
    return !isNaN(value) || value === '.' || value === '+/-';
  };

  // Generate buttons
  const buttonList = buttonInputs.map(button => {
    return (
      <button onClick={handleClick} name={button} key={button} className={`main-button ${confirmOperator(button) ? null : 'operator'}`}>{button}</button>
    )
  });

  return (
    <main>
      <input type='text' value={result}/>
      <section className='button-container'>
        {buttonList}
        <section>
          <button onClick={clearInput} className='main-button clear'>Clear</button>
          <button onClick={backspaceInput} className='main-button operator'>C</button>
          <button onClick={handleClick} name='=' className='main-button operator'>=</button>
        </section>
      </section>
    </main>
  )
}

export default Buttons;


// considerations: overflow for inputs 