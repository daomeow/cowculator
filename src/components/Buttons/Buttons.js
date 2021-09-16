import './Buttons.css';

function Buttons() {
  return (
    <section className='button-container'>
      <section className='row'>
        <button className='main-button'>7</button>
        <button className='main-button'>8</button>
        <button className='main-button'>9</button>
        <button className='main-button'>/</button>
      </section>
      <section className='row'>
        <button className='main-button'>4</button>
        <button className='main-button'>5</button>
        <button className='main-button'>6</button>
        <button className='main-button'>X</button>
      </section>
      <section className='row'>
        <button className='main-button'>1</button>
        <button className='main-button'>2</button>
        <button className='main-button'>3</button>
        <button className='main-button'>+</button>
      </section>
      <section className='row'>
        <button className='main-button'>.</button>
        <button className='main-button'>0</button>
        <button className='main-button'>=</button>
        <button className='main-button'>-</button>
      </section>
    </section>
  )
}

export default Buttons;