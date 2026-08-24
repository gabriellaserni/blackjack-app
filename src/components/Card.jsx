import "./Card.css";

function Card({ card, hidden = false }) {
  if (hidden) {
    return (
      <div className="card card--hidden" aria-label="Carta virada para baixo">
        <span className="card__hidden-icon">?</span>
      </div>
    );
  }

  return (
    <div className="card" aria-label={`${card.value} de ${card.suit}`}>
      <img className="card__image" src={card.image} alt={`${card.value} de ${card.suit}`} />
    </div>
  );
}

export default Card;