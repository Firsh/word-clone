import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { range } from '../../utils'
import { checkGuess } from "../../game-helpers";

function GuessList({ guesses, answer }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((item) =>
        // using random key here gets rerandomized everytime, avoid
        <Guess key={item}
          word={guesses[item] || Array(5)}
          result={checkGuess(guesses[item], answer) || Array(5)}
        />
      )}
    </div>
  );
}

function Guess({ word, result }) {
  return (<p className="guess">
    {[...word].map((letter, index) => {
      const classList = ['cell'];
      result[index] && classList.push(result[index].status);
      return (
        <span className={classList.join(" ")} key={index}>
          {letter}
        </span>
      )
    }
    )}
  </p>);
}

export default GuessList;
