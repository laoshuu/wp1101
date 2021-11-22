import './App.css';
import { useState } from 'react';
import { startGame, guess, restart } from './axios';


function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal')
      setHasWon(true)
    else
      setStatus(response)
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
    </>

  const winningMode =
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={async () => { await restart(); setHasWon(false); setStatus(''); setNumber('') }}>restart</button>
    </>

  const game =
    <div>
      {hasWon ? winningMode : gameMode}
    </div>



  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
