import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { drawRandomCards, calculateHandScore } from '../data/deck'

const GameContext = createContext()

const TARGET_SCORE = 21
const DEALER_STOP_SCORE = 17

function dealInitialHands() {
    const dealerHand = drawRandomCards(2)
    const playerHand = drawRandomCards(2, dealerHand)

    return { dealerHand, playerHand }
}

export function GameProvider({ children }) {
    const [{ dealerHand, playerHand }, setHands] = useState(dealInitialHands)
    const [phase, setPhase] = useState('player-turn')

    const playerScore = calculateHandScore(playerHand)
    const dealerScore = calculateHandScore(dealerHand)

    // Comprar carta
    const handleHit = useCallback(() => {
        if (phase !== 'player-turn') return

        setHands((current) => {
            const [newCard] = drawRandomCards(
                1,
                [...current.dealerHand, ...current.playerHand]
            )

            return {
                ...current,
                playerHand: [...current.playerHand, newCard],
            }
        })
    }, [phase])

    // Parar
    const handleStand = useCallback(() => {
        if (phase !== 'player-turn') return

        setPhase('dealer-turn')
    }, [phase])

    // Nova rodada
    const handleNewRound = useCallback(() => {
        setHands(dealInitialHands())
        setPhase('player-turn')
    }, [])

    // Jogador estourou 21
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
            playerHand,
        })

        setPhase('round-over')
    }, [phase, dealerHand, playerHand])

    return (
        <GameContext.Provider
            value={{
                dealerHand,
                playerHand,
                playerScore,
                dealerScore,
                phase,
                handleHit,
                handleStand,
                handleNewRound,
                TARGET_SCORE,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    return useContext(GameContext)
}