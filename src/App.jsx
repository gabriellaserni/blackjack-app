import Header from "./components/Header";
import GameTable from "./components/GameTable";
import ScoreBoard from "./components/ScoreBoard";
import Button from "./components/Button";
import "./App.css";

const mockDealerCards = [
  {
    code: "AS",
    image: "https://deckofcardsapi.com/static/img/AS.png",
    value: "ACE",
    suit: "SPADES",
  },
  {
    code: "0H",
    image: "https://deckofcardsapi.com/static/img/0H.png",
    value: "10",
    suit: "HEARTS",
  },
];

const mockPlayerCards = [
  {
    code: "KH",
    image: "https://deckofcardsapi.com/static/img/KH.png",
    value: "KING",
    suit: "HEARTS",
  },
  {
    code: "7C",
    image: "https://deckofcardsapi.com/static/img/7C.png",
    value: "7",
    suit: "CLUBS",
  },
];

function App() {
  return (
    <div className="app">
      <div className="app__container">

        <Header
          status="Sua vez: escolha uma ação"
        />

        <ScoreBoard
          playerScore={17}
          dealerScore={null}
        />

        <GameTable
          dealerCards={mockDealerCards}
          playerCards={mockPlayerCards}
          hideDealerFirstCard={true}
        />

        <div className="app__actions">
          <Button
            label="Hit"
            variant="primary"
          />

          <Button
            label="Stand"
            variant="secondary"
          />

          <Button
            label="Nova rodada"
            variant="accent"
          />
        </div>

      </div>
    </div>
  );
}

export default App;