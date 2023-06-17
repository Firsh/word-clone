import React from "react";

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

export default Guess;
