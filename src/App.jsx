import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import GameTable from './components/GameTable'
import ScoreBoard from './components/ScoreBoard'
import Button from './components/Button'
import { drawRandomCards, calculateHandScore } from './data/deck'
import './styles/App.css'

const TARGET_SCORE = 21 // meta de pontos (RM 566296 - Gabriella)
const DEALER_STOP_SCORE = 17 // dealer compra carta enquanto tiver menos que isso

// Fases da rodada:
// 'player-turn' -> jogador pode comprar carta (Hit) ou parar (Stand)
// 'dealer-turn' -> dealer compra cartas automaticamente até 17+
// 'round-over'  -> rodada encerrada, mostra o resultado
function dealInitialHands() {
  const dealerHand = drawRandomCards(2)
  const playerHand = drawRandomCards(2, dealerHand)
  return { dealerHand, playerHand }
}

function App() {
  const [{ dealerHand, playerHand }, setHands] = useState(dealInitialHands)
  const [phase, setPhase] = useState('player-turn')

  const playerScore = calculateHandScore(playerHand)
  const dealerScore = calculateHandScore(dealerHand)

  // Comprar carta (Hit)
  const handleHit = useCallback(() => {
    if (phase !== 'player-turn') return

    setHands((current) => {
      const [newCard] = drawRandomCards(
        1,
        [...current.dealerHand, ...current.playerHand]
      )

      return {
        ...current,
        playerHand: [...current.playerHand, newCard]
      }
    })
  }, [phase])

  // Parar (Stand)
  const handleStand = useCallback(() => {
    if (phase !== 'player-turn') return
    setPhase('dealer-turn')
  }, [phase])

  // Nova rodada
  const handleNewRound = useCallback(() => {
    setHands(dealInitialHands())
    setPhase('player-turn')
  }, [])

  // Se o jogador estourar 21
  useEffect(() => {
    if (phase === 'player-turn' && playerScore > TARGET_SCORE) {
      setPhase('round-over')
    }
  }, [phase, playerScore])

  // Vez do dealer
  useEffect(() => {
    if (phase !== 'dealer-turn') return

    let currentDealerHand = dealerHand

    while (calculateHandScore(currentDealerHand) < DEALER_STOP_SCORE) {
      const [newCard] = drawRandomCards(
        1,
        [...currentDealerHand, ...playerHand]
      )

      currentDealerHand = [...currentDealerHand, newCard]
    }

    setHands({
      dealerHand: currentDealerHand,
      playerHand
    })

    setPhase('round-over')
  }, [phase, dealerHand, playerHand])

  // Texto que aparece acima dos botões
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
    <div className="app theme-dark">
      <div className="app__container">

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

        {/* TEXTO ACIMA DOS BOTÕES */}
        <div className="game-status">
          {getStatus()}
        </div>

        {/* BOTÕES */}
        <div className="app__actions">

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

export default App