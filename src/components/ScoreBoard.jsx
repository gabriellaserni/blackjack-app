import "./ScoreBoard.css";

function ScoreBoard({ playerScore, dealerScore }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__item">
        <span className="scoreboard__label">JOGADOR</span>
        <span className="scoreboard__value">{playerScore}</span>
      </div>
      <div className="scoreboard__item">
        <span className="scoreboard__label">DEALER</span>
        <span className="scoreboard__value">
          {dealerScore === null ? "?" : dealerScore}
        </span>
      </div>
    </div>
  );
}

export default ScoreBoard;