import React from "react";

function GuessList({ guesses }) {
  return <div className="guess-results">
    {guesses.map((guess, index) =>
      // using random key here get rerandomized everytime, avoid
      <p className="guess" key={index}>{guess}</p>
    )}
  </div>;
}

export default GuessList;
