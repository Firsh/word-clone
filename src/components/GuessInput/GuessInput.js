import React from "react";


function GuessInput({ newGuess }) {
  const [prelimGuess, setPrelimGuess] = React.useState('');
  return (
    <form className="guess-input-wrapper" onSubmit={e => {
      e.preventDefault();
      console.log({ prelimGuess });
      newGuess(prelimGuess);
      setPrelimGuess('');
    }}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input required id="guess-input" type="text" pattern={'[A-Z]{5}'} maxLength={5} value={prelimGuess} title="5-letter word" onChange={
        e => {
          setPrelimGuess(e.target.value.toUpperCase());
        }} />
    </form>
  );
}

export default GuessInput;
