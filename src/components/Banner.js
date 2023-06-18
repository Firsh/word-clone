import React from "react";

function Banner({ gameStatus, answer, guessCount, agane }) {
  const aganeButton = React.useRef(null);
  React.useEffect(() => {
    if (aganeButton.current) {
      aganeButton.current.focus();
    }
  }, [gameStatus]);
  if (gameStatus === "playing") {
    return null;
  }
  let moodClass, bannerText;
  if (gameStatus === "won") {
    moodClass = "happy";
    bannerText = `<strong>Congratulations!</strong>
    Got it in <strong>${guessCount} guess${guessCount !== 1 ? 'es' : ''}</strong>`;
  } else {
    moodClass = "sad";
    bannerText = `Sorry, the correct answer is <strong>${answer}</strong>.`;
  }

  return (
    <div className={`${moodClass} banner`} >
      <p dangerouslySetInnerHTML={{ __html: bannerText }} />
      <button ref={aganeButton} className="agane" onClick={agane}>Wanna go agane?</button>
    </div>
  );
}

export default Banner;
