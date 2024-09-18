import { useState } from 'react';
import { challenges } from "./data/challenges";
import { duels } from './data/duels';
import './App.css'; 

function App() {
  const [displayedGames, setDisplayedGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(null);

  const selectRandomGames = (array, numberOfGames) => {
    const selectedGames = [];
    const availableIndices = new Set();

    while (selectedGames.length < numberOfGames) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (!availableIndices.has(randomIndex)) {
        selectedGames.push(array[randomIndex]);
        availableIndices.add(randomIndex);
      }
    }

    return selectedGames;
  };

  const handleButtonClick = (gameType) => {
    setIsSpinning(true);
    setSelectedGame(null); 

    const newGames = gameType === 'challenges' ? selectRandomGames(challenges, 6) : selectRandomGames(duels, 6);
    setDisplayedGames(newGames);

    let counter = 0;
    const interval = setInterval(() => {
      setCurrentHighlightIndex(counter % newGames.length);
      counter++;
    }, 100);

    const spinDuration = Math.random() * (4000 - 2500) + 2500;

    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
      const finalSelectedGame = newGames[counter % newGames.length];
      setSelectedGame(finalSelectedGame);
      setCurrentHighlightIndex(null); 
    }, spinDuration); 
  };

  const closePopup = () => {
    setSelectedGame(null);  
  };

  return (
    <div className="App">
      <img src="/public/assets/logo.png" className="logo" alt="Logo" />

      <div className="grid-container">
        {displayedGames.map((game, index) => (
          <div 
            key={game.id} 
            className={`grid-item 
            ${currentHighlightIndex === index ? 'highlight' : ''} 
            ${selectedGame?.id === game.id ? 'selected' : ''}`}
          >
            <span>{game.title}</span> 
          </div>
        ))}
      </div>

      <div className="button-container">
        <button onClick={() => handleButtonClick('challenges')} disabled={isSpinning}>
          Retos
        </button>
        <button onClick={() => handleButtonClick('duels')} disabled={isSpinning}>
          1 vs 1
        </button>
      </div>

      {selectedGame && !isSpinning && (
        <div className="overlay" onClick={closePopup}>
          <div className="popup-top">

          </div>
          <div className="popup-botton" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedGame.title}</h2> 
            <p>{selectedGame.description}</p> 
            <button className="close-button" onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;