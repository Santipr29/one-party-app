function Buttons({ onChallengesClick, onDuelsClick, isSpinning }) {
    return (
      <div className="button-container">
        <button onClick={onChallengesClick} disabled={isSpinning}>
          Retos
        </button>
        <button onClick={onDuelsClick} disabled={isSpinning}>
          1 vs 1
        </button>
      </div>
    );
  }
  
  export default Buttons;
  