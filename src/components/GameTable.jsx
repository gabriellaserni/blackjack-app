import Card from "./Card";
import "./GameTable.css";

function GameTable({ dealerCards, playerCards, hideDealerFirstCard }) {
  return (
    <div className="game-table">
      <section className="game-table__hand">
        <h3 className="game-table__title">DEALER</h3>
        <div className="game-table__cards">
          {dealerCards.map((card, index) => (
            <Card
              key={card.code + index}
              card={card}
              hidden={hideDealerFirstCard && index === 0}
            />
          ))}
        </div>
      </section>

      <section className="game-table__hand">
        <h3 className="game-table__title">JOGADOR</h3>
        <div className="game-table__cards">
          {playerCards.map((card, index) => (
            <Card key={card.code + index} card={card} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GameTable;