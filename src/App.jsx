import Header from './components/Header'
import GameTable from './components/GameTable'
import ScoreBoard from './components/ScoreBoard'
import Button from './components/Button'
import { GameProvider, useGame } from './contexts/GameContext'
import { ThemeProvider } from './contexts/ThemeContext'

function BlackjackGame() {
  const {
    dealerHand,
    playerHand,
    playerScore,
    dealerScore,
    phase,
    handleHit,
    handleStand,
    handleNewRound,
    TARGET_SCORE,
  } = useGame()

  function getStatus() {
    if (phase === 'player-turn') {
      return 'Sua vez: escolha Hit, Stand ou reinicie a rodada'
    }

    if (phase === 'dealer-turn') {
      return 'Dealer jogando...'
    }

    if (playerScore > TARGET_SCORE) {
      return 'Você estourou! O dealer venceu.'
    }

    if (dealerScore > TARGET_SCORE) {
      return 'Dealer estourou! Você venceu.'
    }

    if (playerScore === dealerScore) {
      return 'Empate!'
    }

    return playerScore > dealerScore
      ? 'Você venceu a rodada!'
      : 'Dealer venceu a rodada.'
  }

  return (
    <div className="min-h-screen flex justify-center px-4 py-6 bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <div className="w-full max-w-[480px]">

        <Header
          playerName="Gabriella Serni"
          target={TARGET_SCORE}
        />

        <ScoreBoard
          playerScore={playerScore}
          dealerScore={dealerScore}
        />

        <GameTable
          dealerCards={dealerHand}
          playerCards={playerHand}
          hideDealerFirstCard={phase === 'player-turn'}
        />

        <div className="text-center my-4">
          {getStatus()}
        </div>

        <div className="flex gap-3 justify-center mt-2">

          <Button
            variant="primary"
            onClick={handleHit}
            disabled={phase !== 'player-turn'}
          >
            Hit
          </Button>

          <Button
            variant="secondary"
            onClick={handleStand}
            disabled={phase !== 'player-turn'}
          >
            Stand
          </Button>

          <Button
            variant="accent"
            onClick={handleNewRound}
          >
            Nova rodada
          </Button>

        </div>

      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <BlackjackGame />
      </GameProvider>
    </ThemeProvider>
  )
}

export default App