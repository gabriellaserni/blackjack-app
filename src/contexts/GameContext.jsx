
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

import { calculateHandScore } from '../data/deck'
import {
    createDeck,
    shuffleDeck,
    drawCards,
} from '../services/deckApi'

const GameContext = createContext()

const TARGET_SCORE = 21
const DEALER_STOP_SCORE = 17

function splitInitialCards(cards) {
    return {
        dealerHand: cards.slice(0, 2),
        playerHand: cards.slice(2, 4),
    }
}

export function GameProvider({ children }) {
    const [hands, setHands] = useState({
        dealerHand: [],
        playerHand: [],
    })

    const [deckId, setDeckId] = useState(null)
    const [phase, setPhase] = useState('loading')
    const [error, setError] = useState('')

    const { dealerHand, playerHand } = hands

    const playerScore = calculateHandScore(playerHand)
    const dealerScore = calculateHandScore(dealerHand)

    // Cria o baralho, embaralha e distribui as cartas iniciais.
    useEffect(() => {
        let active = true

        async function startGame() {
            try {
                setError('')

                const newDeckId = await createDeck()
                await shuffleDeck(newDeckId)

                const cards = await drawCards(newDeckId, 4)

                if (!active) return

                setDeckId(newDeckId)
                setHands(splitInitialCards(cards))
                setPhase('player-turn')
            } catch (err) {
                if (!active) return

                setError(err.message || 'Erro ao iniciar o jogo.')
                setPhase('error')
            }
        }

        startGame()

        return () => {
            active = false
        }
    }, [])

    // Compra uma carta para o jogador.
    const handleHit = useCallback(async () => {
        if (phase !== 'player-turn' || !deckId) return

        setPhase('drawing-player')
        setError('')

        try {
            const cards = await drawCards(deckId, 1)
            const nextPlayerHand = [...playerHand, ...cards]

            setHands((current) => ({
                ...current,
                playerHand: nextPlayerHand,
            }))

            if (calculateHandScore(nextPlayerHand) > TARGET_SCORE) {
                setPhase('round-over')
            } else {
                setPhase('player-turn')
            }
        } catch (err) {
            setError(err.message || 'Erro ao comprar uma carta.')
            setPhase('error')
        }
    }, [phase, deckId, playerHand])

    // O jogador encerra sua vez.
    const handleStand = useCallback(() => {
        if (phase !== 'player-turn') return

        setPhase('dealer-turn')
    }, [phase])

    // Inicia uma nova rodada com cartas novas do mesmo baralho.
    const handleNewRound = useCallback(async () => {
        if (!deckId) return

        setPhase('loading')
        setError('')

        try {
            // Reembaralha o baralho antes de distribuir a nova rodada.
            await shuffleDeck(deckId)

            const cards = await drawCards(deckId, 4)

            setHands(splitInitialCards(cards))
            setPhase('player-turn')
        } catch (err) {
            setError(err.message || 'Erro ao iniciar uma nova rodada.')
            setPhase('error')
        }
    }, [deckId])

    // O dealer compra até atingir pelo menos 17 pontos.
    useEffect(() => {
        if (phase !== 'dealer-turn' || !deckId) return

        let active = true

        async function playDealer() {
            try {
                let currentDealerHand = dealerHand

                while (
                    calculateHandScore(currentDealerHand) < DEALER_STOP_SCORE
                ) {
                    const cards = await drawCards(deckId, 1)

                    if (!active) return

                    currentDealerHand = [...currentDealerHand, ...cards]
                }

                if (!active) return

                setHands((current) => ({
                    ...current,
                    dealerHand: currentDealerHand,
                }))

                setPhase('round-over')
            } catch (err) {
                if (!active) return

                setError(err.message || 'Erro ao comprar cartas para o dealer.')
                setPhase('error')
            }
        }

        playDealer()

        return () => {
            active = false
        }
    }, [phase, deckId, dealerHand])

    return (
        <GameContext.Provider
            value={{
                dealerHand,
                playerHand,
                playerScore,
                dealerScore,
                phase,
                error,
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
