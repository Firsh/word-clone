import React from 'react';
const board = [
	['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '<-'],
	['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'SEND']
];
const freshKeyInfo = [...board[0], ...board[1], ...board[2]].reduce((result, key) => {
	result[key] = false;
	return result;
}, {});
function Keyboard({ guesses, keyClick }) {
	let keyInfo = { ...freshKeyInfo };
	if (guesses.length) {
		guesses.forEach(guess => {
			if (!guess.result) {
				return;
			}
			guess.result.forEach(key => {
				if (key.status === "correct") {
					// correct always overrules any previous status
					keyInfo[key.letter] = key.status;
				} else if (keyInfo[key.letter] === false) {
					// sets the last known status to key without a status
					keyInfo[key.letter] = key.status
				}
			});
		});
	}
	console.log("Keyboard render");

	return (
		<div className="keyboard">
			{board.map((row, index) =>
				<div key={index}>{
					row.map(key =>
						// ✅ Lesson Learned: click handler needs to be on an HTML tag (below), not as an onClick prop on a component
						<Key key={key} letter={key} status={keyInfo[key]} keyClick={keyClick} />
					)}
				</div>
			)}
		</div>
	);
}
function Key({ letter, status, keyClick }) {
	const classList = [];
	if (status) {
		classList.push(status);
	}
	if (letter.length > 1) {
		classList.push('big-key');
	}
	return <kbd
		data-letter={letter}
		className={classList.join(" ")}
		onClick={keyClick}
	>{letter}</kbd>
}

export default Keyboard;
