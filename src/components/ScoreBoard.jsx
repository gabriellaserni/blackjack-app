function ScoreBoard({ playerScore, dealerScore }) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1 bg-[var(--color-primary)] text-[var(--color-text)] rounded-[var(--radius)] p-3 px-4 flex flex-col items-center border border-[var(--color-accent)] transition-colors duration-200">
        <span className="text-[0.7rem] font-bold tracking-[0.05em] text-[var(--color-text)] mb-[0.2rem]">
          JOGADOR
        </span>

        <span className="text-[1.3rem] sm:text-[1.6rem] font-extrabold text-[var(--color-text)]">
          {playerScore}
        </span>
      </div>

      <div className="flex-1 bg-[var(--color-primary)] text-[var(--color-text)] rounded-[var(--radius)] p-3 px-4 flex flex-col items-center border border-[var(--color-accent)] transition-colors duration-200">
        <span className="text-[0.7rem] font-bold tracking-[0.05em] text-[var(--color-text)] mb-[0.2rem]">
          DEALER
        </span>

        <span className="text-[1.3rem] sm:text-[1.6rem] font-extrabold text-[var(--color-text)]">
          {dealerScore === null ? "?" : dealerScore}
        </span>
      </div>
    </div>
  );
}

export default ScoreBoard;