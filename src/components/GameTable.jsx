import Card from "./Card";

function GameTable({ dealerCards, playerCards, hideDealerFirstCard }) {
  return (
    <div className="bg-[var(--color-table-bg)] p-4 rounded-[var(--radius)] mt-4">
      <section className="mb-6">
        <h3 className="text-center m-0 mb-3 text-sm font-bold tracking-wider">
          DEALER
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          {dealerCards.map((card, index) => (
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
          {playerCards.map((card, index) => (
            <Card key={card.code + index} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GameTable;