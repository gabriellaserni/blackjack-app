import { useGame } from "../contexts/GameContext";
import Card from "./Card";

function GameTable() {
  const {
    dealerHand,
    playerHand,
    phase,
  } = useGame();

  const hideDealerFirstCard = phase === "player-turn";

  return (
    <div className="bg-[var(--color-table-bg)] border-2 border-[var(--color-game-border)] p-4 rounded-[var(--radius)] mt-4 transition-colors duration-200">
      <section className="mb-6">
        <h3 className="text-center m-0 mb-3 text-sm font-bold tracking-wider">
          DISTRIBUIDOR
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          {dealerHand.map((card, index) => (
            <Card
              key={card.code + index}
              card={card}
              hidden={hideDealerFirstCard && index === 0}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-center m-0 mb-3 text-sm font-bold tracking-wider">
          JOGADOR
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          {playerHand.map((card, index) => (
            <Card key={card.code + index} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GameTable;