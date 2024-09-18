const Popup = ({ selectedGame, onClose }) => {
    return (
      <div className="overlay" onClick={onClose}>
        <div className="popup-top">
          <h2>{selectedGame.title}</h2>
        </div>
        <div className="popup-botton" onClick={(e) => e.stopPropagation()}>
          <p>{selectedGame.description}</p> 
          <button className="close-button" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }
  
  export default Popup;
  