import React from "react";
import { NUM_OF_GUESSES_ALLOWED as maxGuess } from '../../constants';
import { range } from '../../utils'
import Guess from "./Guess";
import { checkGuess } from "../../game-helpers";

function GuessList({ guesses, answer }) {
  return (
    <div className="guess-results">
      {range(maxGuess).map((item) =>
        // using random key here gets rerandomized everytime, avoid
        <Guess key={item}
          word={guesses[item] || Array(5)}
          result={checkGuess(guesses[item], answer) || Array(5)}
        />
      )}
    </div>
  );
}

export default GuessList;
