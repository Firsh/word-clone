import React from "react";
import { NUM_OF_GUESSES_ALLOWED as maxGuess } from '../../constants';
import { range } from '../../utils'
import Guess from "./Guess";

function GuessList({ guesses }) {
  return (
    <div className="guess-results">
      {range(maxGuess).map((item) =>
        // using random key here gets rerandomized everytime, avoid
        <Guess key={item} word={guesses[item] || Array(5)} />
      )}
    </div>
  );
}

export default GuessList;
