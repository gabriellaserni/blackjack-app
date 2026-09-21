function Card({ card, hidden = false }) {
  if (hidden) {
    return (
      <div
        className="w-20 h-28 rounded-lg bg-[var(--color-primary)] border-2 border-[var(--color-accent)] flex items-center justify-center"
        aria-label="Carta virada para baixo"
      >
        <span className="text-[var(--color-accent)] text-2xl font-bold">
          ?
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-20 h-28 rounded-lg overflow-hidden"
      aria-label={`${card.value} de ${card.suit}`}
    >
      <img
        className="w-full h-full object-cover"
        src={card.image}
        alt={`${card.value} de ${card.suit}`}
      />
    </div>
  );
}

export default Card;