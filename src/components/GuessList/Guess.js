import React from "react";

function Guess({ word }) {
  return (<p className="guess">
    {[...word].map((letter, index) =>
      <span className="cell" key={index}>{letter}</span>
    )}
  </p>);
}

export default Guess;
