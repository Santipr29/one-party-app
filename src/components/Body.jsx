import { useState } from 'react';
import { challenges } from '../data/challenges';
import { duels } from '../data/duels';
import Grid from './Grid';
import Buttons from './Buttons';
import Popup from './Popup';

function Body() {
  const [displayedGames, setDisplayedGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

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
    setShowButtons(false);
    setShowGrid(true);

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
    setShowGrid(false);
    setShowButtons(true);
  };

  return (
    <div>
      {showGrid && (
        <Grid 
          games={displayedGames}
          highlightIndex={currentHighlightIndex}
          selectedGame={selectedGame}
        />
      )}

      {showButtons && (
        <Buttons 
          onChallengesClick={() => handleButtonClick('challenges')}
          onDuelsClick={() => handleButtonClick('duels')}
          isSpinning={isSpinning}
        />
      )}

      {selectedGame && !isSpinning && (
        <Popup 
          selectedGame={selectedGame}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default Body;