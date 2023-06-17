import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput';
import GuessList from '../GuessList';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  function newGuess(prelimGuess) {
    setGuesses([...guesses, prelimGuess]);
  }
  return (
    <>
      <GuessList guesses={guesses} answer={answer} />
      <GuessInput newGuess={newGuess} />
    </>
  );
}

export default Game;
