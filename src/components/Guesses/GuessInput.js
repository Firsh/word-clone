import React from "react";
import Keyboard from './Keyboard';

function GuessInput({ newGuess, gameStatus, guesses }) {
  console.log("GuessInput render");
  const [prelimGuess, setPrelimGuess] = React.useState('');
  const [clickedKey, setClickedKey] = React.useState({});
  function keyClick(e) {
    // ✅ Lesson Learned: including a bit of random data to force a state update allows repeated characters
    setClickedKey({ letter: e.target.dataset.letter, allowRepeats: crypto.randomUUID() });
    console.log("Changing state because of clickedKey " + e.target.dataset.letter);
  }
  // ✅ Lesson Learned: I can put the reference to the DOM node with useRef
  const guessForm = React.useRef(null);
  const handleSubmit = e => {
    e.preventDefault();
    if (guessForm.current && guessForm.current.checkValidity()) {
      newGuess(prelimGuess);
      setPrelimGuess('');
    }
  }
  const handleInputChange = e => {
    console.log("handleInputChange " + e.target.value);
    setPrelimGuess(e.target.value.toUpperCase());
  }
  React.useEffect(() => {
    console.log("Reacting to state change by clickedKey and maybe changing it again for setPrelimGuess in GuessInput");
    if (clickedKey.letter) {
      switch (clickedKey.letter) {
        case 'SEND':
          if (guessForm.current) {
            // ✅ Lesson Learned: bubbles is needed because the listener is at the root by React
            guessForm.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
          break;
        case '<-':
          setPrelimGuess(prevGuess => prevGuess.slice(0, -1));
          break;
        default:
          // ✅ Lesson Learned: useState's second element can take a "function that calculates it from the previous state"
          // This is called an updater function
          // Helpful to avoid accessing state inside useEffect when I don't want it as a depencency (avoid inf. loop)
          setPrelimGuess(prevGuess => {
            // ✅ Lesson Learned: when value "comes from" state, the input's constraints won't apply
            const updatedValue = prevGuess + clickedKey.letter;
            const isValidLength = updatedValue.length <= 5;
            const matchesPattern = /^[A-Z]{0,5}$/.test(updatedValue);
            return isValidLength && matchesPattern ? updatedValue : prevGuess
          });
      }
    }
  }, [clickedKey]);
  return (
    <form ref={guessForm} className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={gameStatus !== "playing"}
        required
        id="guess-input"
        type="text"
        pattern={'[A-Z]{5}'}
        maxLength={5}
        value={prelimGuess}
        title="5-letter word"
        onChange={handleInputChange}
      />
      <Keyboard guesses={guesses} keyClick={keyClick} />
    </form>
  );
}

export default GuessInput;
