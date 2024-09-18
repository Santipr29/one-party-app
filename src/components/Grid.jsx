function Grid({ games, highlightIndex, selectedGame }) {
    return (
      <div className="grid-container">
        {games.map((game, index) => (
          <div 
            key={game.id} 
            className={`grid-item 
            ${highlightIndex === index ? 'highlight' : ''} 
            ${selectedGame?.id === game.id ? 'selected' : ''}`}
          >
            <span>{game.title}</span>
          </div>
        ))}
      </div>
    );
  }
  
  export default Grid;
  