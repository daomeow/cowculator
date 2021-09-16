import { useState } from 'react';
import './Buttons.css';

function Buttons() {
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

  return (
    <main>
      <form>
        <input type='text' value={result}/>
      </form>
      <section className='button-container'>
        <section>
          <button onClick={handleClick} name='7' className='main-button'>7</button>
          <button onClick={handleClick} name='8' className='main-button'>8</button>
          <button onClick={handleClick} name='9' className='main-button'>9</button>
          <button onClick={handleClick} name='/' className='main-button operator'>&divide;</button>
        </section>
        <section>
          <button onClick={handleClick} name='4' className='main-button'>4</button>
          <button onClick={handleClick} name='5' className='main-button'>5</button>
          <button onClick={handleClick} name='6' className='main-button'>6</button>
          <button onClick={handleClick} name='*' className='main-button operator'>&times;</button>
        </section>
        <section>
          <button onClick={handleClick} name='1' className='main-button'>1</button>
          <button onClick={handleClick} name='2' className='main-button'>2</button>
          <button onClick={handleClick} name='3' className='main-button'>3</button>
          <button onClick={handleClick} name='+' className='main-button operator'>+</button>
        </section>
        <section>
          <button onClick={handleClick} name='0' className='main-button'>0</button>
          <button onClick={handleClick} name='.' className='main-button'>.</button>
          <button onClick={handleClick} name='-' className='main-button'>+/-</button>
          <button onClick={handleClick} name='-' className='main-button operator'>&ndash;</button>
        </section>
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