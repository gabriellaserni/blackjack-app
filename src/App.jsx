import { useState } from "react";
import Header from "./components/Header";
import GameTable from "./components/GameTable";
import ScoreBoard from "./components/ScoreBoard";
import Button from "./components/Button";
import { shuffledDeck, handTotal } from "./data/deck";
import "./App.css";

const GOAL = 21; // meta do BlackJack (RM 566296)

function newRound() {
  const deck = shuffledDeck();
  return {
    deck,
    playerCards: [deck[0], deck[1]],
    dealerCards: [deck[2], deck[3]],
    nextCardIndex: 4,
    status: "playing", // "playing" | "playerBust" | "dealerBust" | "playerWin" | "dealerWin" | "push"
  };
}

function App() {
  const [round, setRound] = useState(newRound());
  const [isLightTheme, setIsLightTheme] = useState(false);

  const playerScore = handTotal(round.playerCards);
  const dealerScore = handTotal(round.dealerCards);
  const isRoundOver = round.status !== "playing";

  function drawCard(cards, deck, nextCardIndex) {
    const card = deck[nextCardIndex];
    return { cards: [...cards, card], nextCardIndex: nextCardIndex + 1 };
  }

  function handleHit() {
    if (isRoundOver) return;
    const { cards, nextCardIndex } = drawCard(round.playerCards, round.deck, round.nextCardIndex);
    const total = handTotal(cards);

    setRound({
      ...round,
      playerCards: cards,
      nextCardIndex,
      status: total > GOAL ? "playerBust" : "playing",
    });
  }

  function handleStand() {
    if (isRoundOver) return;

    let dealerCards = [...round.dealerCards];
    let deck = round.deck;
    let nextCardIndex = round.nextCardIndex;

    // dealer compra até 17 (regra clássica)
    while (handTotal(dealerCards) < 17) {
      dealerCards = [...dealerCards, deck[nextCardIndex]];
      nextCardIndex += 1;
    }

    const finalPlayer = handTotal(round.playerCards);
    const finalDealer = handTotal(dealerCards);

    let status;
    if (finalDealer > GOAL) status = "dealerBust";
    else if (finalPlayer > finalDealer) status = "playerWin";
    else if (finalPlayer < finalDealer) status = "dealerWin";
    else status = "push";

    setRound({ ...round, dealerCards, nextCardIndex, status });
  }

  function handleNewRound() {
    setRound(newRound());
  }

  const statusMessages = {
    playing: `Sua vez — Hit, Stand ou vire a rodada. Meta: ${GOAL} pontos.`,
    playerBust: "Você estourou! O dealer venceu.",
    dealerBust: "Dealer estourou! Você venceu.",
    playerWin: "Você venceu esta rodada!",
    dealerWin: "Dealer venceu esta rodada.",
    push: "Empate!",
  };

  return (
    <div className={`app ${isLightTheme ? "app--light" : ""}`}>
      <div className="app__container">
        <Header
          status={statusMessages[round.status]}
          onToggleTheme={() => setIsLightTheme((v) => !v)}
          isLightTheme={isLightTheme}
        />

        <ScoreBoard
          playerScore={playerScore}
          dealerScore={isRoundOver ? dealerScore : null}
        />

        <GameTable
          dealerCards={round.dealerCards}
          playerCards={round.playerCards}
          hideDealerFirstCard={!isRoundOver}
        />

        <div className="app__actions">
          <Button label="Hit" variant="primary" onClick={handleHit} disabled={isRoundOver} />
          <Button label="Stand" variant="secondary" onClick={handleStand} disabled={isRoundOver} />
          <Button label="Nova rodada" variant="accent" onClick={handleNewRound} />
        </div>
      </div>
    </div>
  );
}

export default App;