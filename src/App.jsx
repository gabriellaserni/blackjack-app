
import Header from './components/Header'
import GameTable from './components/GameTable'
import ScoreBoard from './components/ScoreBoard'
import Button from './components/Button'
import ProtectedRoute from './components/ProtectedRoute'

import { GameProvider, useGame } from './contexts/GameContext'
import { ThemeProvider } from './contexts/ThemeContext'

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function BlackjackGame() {
  const {
    playerScore,
    dealerScore,
    phase,
    error,
    handleHit,
    handleStand,
    handleNewRound,
    TARGET_SCORE,
  } = useGame()

  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('isAuthenticated')
    navigate('/login', { replace: true })
  }

  function getStatus() {
    if (phase === 'loading') {
      return 'Carregando baralho...'
    }

    if (phase === 'drawing-player') {
      return 'Comprando carta...'
    }

    if (phase === 'error') {
      return error || 'Ocorreu um erro ao conectar com a API.'
    }

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

  const gameBusy = [
    'loading',
    'drawing-player',
    'dealer-turn',
    'error',
  ].includes(phase)

  return (
    <div className="min-h-screen flex justify-center px-4 py-6 bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      <div className="w-full max-w-[480px]">

        <Header
          playerName="Gabriella Serni"
          target={TARGET_SCORE}
          onLogout={handleLogout}
        />

        <ScoreBoard />

        <GameTable />

        <div className="text-center my-4" role="status">
          {getStatus()}
        </div>

        <div className="flex gap-3 justify-center mt-2">
          <Button
            variant="primary"
            onClick={handleHit}
            disabled={gameBusy || phase !== 'player-turn'}
          >
            Hit
          </Button>

          <Button
            variant="secondary"
            onClick={handleStand}
            disabled={gameBusy || phase !== 'player-turn'}
          >
            Stand
          </Button>

          <Button
            variant="accent"
            onClick={handleNewRound}
            disabled={gameBusy}
          >
            Nova rodada
          </Button>
        </div>

        {phase === 'error' && (
          <div className="text-center mt-3">
            <button
              type="button"
              onClick={handleNewRound}
              className="underline"
            >
              Tentar nova rodada
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GameProvider>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <BlackjackGame />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </GameProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
