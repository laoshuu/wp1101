import './App.css';
import { useState } from 'react';
import { startGame, guess, restart } from './axios';


function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('Make a guess!');
  const [guessNum, setGuessNum] = useState(10);

  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal') {
      setHasWon(true)
      setHasFinished(true)
    }
    else if (response === 'Gameover') {
      setHasFinished(true)
    }
    else {
      setStatus(response)
      if (response === 'Bigger' || response === 'Smaller')
        setGuessNum(guessNum - 1)
    }
  }

  const startMenu =
    <div>
      <button onClick={async () => { await startGame(); setHasStarted(true); }}>start game</button>
    </div>

  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={number} onChange={(e) => { setNumber(e.target.value) }} />
      <button onClick={handleGuess}>Guess!</button>
      <p>{status}</p>
      <p>{guessNum} tries</p>
    </>

  const winningMode =
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={async () => {
        await restart(); setHasWon(false); setStatus('Make a guess!');
        setNumber(''); setHasFinished(false); setGuessNum(10)
      }}>restart</button>
    </>

  const loseMode =
    <>
      <p>you lose!</p>
      <p>Try again?</p>
      <button onClick={async () => {
        await restart(); setStatus('Make a guess!');
        setNumber(''); setHasFinished(false); setGuessNum(10);
      }}>restart</button>
    </>


  const game =
    <div>
      {hasWon ? winningMode : loseMode}
    </div>

  const finish =
    <div>
      {hasFinished ? game : gameMode}
    </div>

  return (
    <div className="App">
      {hasStarted ? finish : startMenu}
    </div>
  );
}

export default App;
