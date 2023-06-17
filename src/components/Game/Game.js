import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput';
import GuessList from '../GuessList';
import { checkGuess } from "../../game-helpers";
import Banner from '../Banner';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  function newGuess(prelimGuess) {
    setGuesses([...guesses, prelimGuess]);
  }
  const lastGuessResult = checkGuess(guesses.slice(-1)[0], answer)
  let gameStatus = "playing";
  if (lastGuessResult && lastGuessResult.filter(slot => slot.status === "correct").length === 5) {
    gameStatus = "won";
  } else if (guesses.length === NUM_OF_GUESSES_ALLOWED) {
    gameStatus = "lost"
  }
  return (
    <>
      <GuessList guesses={guesses} answer={answer} />
      <GuessInput newGuess={newGuess} gameStatus={gameStatus} />
      <Banner gameStatus={gameStatus} answer={answer} guessCount={guesses.length} />
    </>
  );
}

export default Game;
