import React from 'react';

import { sample } from '../utils';
import { WORDS } from '../data';
import GuessInput from './Guesses/GuessInput';
import GuessList from './Guesses/GuessList';
import { checkGuess } from "../game-helpers";
import Banner from './Banner';

import { NUM_OF_GUESSES_ALLOWED } from '../constants';

// Pick a random word on every pageload.
let answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  console.log("Game render");
  const [guesses, setGuesses] = React.useState([]);
  function newGuess(prelimGuess) {
    setGuesses([...guesses, { word: prelimGuess, result: checkGuess(prelimGuess, answer) }]);
  }

  const lastGuessResult = guesses.length && guesses.slice(-1)[0].result;
  let gameStatus = "playing";
  if (lastGuessResult && lastGuessResult.filter(slot => slot.status === "correct").length === 5) {
    gameStatus = "won";
  } else if (guesses.length >= NUM_OF_GUESSES_ALLOWED) {
    gameStatus = "lost"
  }
  function agane() {
    setGuesses([]);
    answer = sample(WORDS);
    console.info({ answer });
  }
  return (
    <>
      <GuessList guesses={guesses} />
      <GuessInput newGuess={newGuess} gameStatus={gameStatus} guesses={guesses} />
      <Banner gameStatus={gameStatus} answer={answer} guessCount={guesses.length} agane={agane} />
    </>
  );
}

export default Game;
