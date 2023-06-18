import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { range } from '../../utils'

function GuessList({ guesses }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((item) =>
        // using random key here gets rerandomized everytime, avoid
        <Guess key={item}
          word={guesses[item] ? guesses[item].word : Array(5)}
          result={guesses[item] ? guesses[item].result : Array(5)}
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
