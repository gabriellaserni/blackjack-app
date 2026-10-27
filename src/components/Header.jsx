import { useTheme } from '../contexts/ThemeContext'

/**
 * Header — cabeçalho do jogo.
 * Props:
 *  - playerName: nome exibido no topo
 *  - target: pontuação alvo do Blackjack
 */
function Header({ playerName, target, onLogout }) {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <header className="bg-[var(--color-primary)] text-[var(--color-text)] p-4 sm:px-6 rounded-[var(--radius)]">

      <div className="flex items-center justify-between gap-3">
        <div className="text-[0.85rem] opacity-85">
          Jogador: {playerName}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLogout}
            className="bg-[var(--color-accent)] text-[var(--color-table-bg)] font-bold px-3 py-2 rounded-full text-sm cursor-pointer transition-transform hover:scale-105"
          >
            Sair
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="bg-[var(--color-accent)] text-[var(--color-table-bg)] font-bold rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
            aria-label={darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={darkMode ? 'Tema claro' : 'Tema escuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap mt-2">
        <span className="bg-[var(--color-accent)] text-[var(--color-table-bg)] font-bold w-8 h-8 rounded-full flex items-center justify-center text-[0.9rem] shrink-0">
          {target}
        </span>

        <h1 className="m-0 text-[1.2rem] sm:text-[1.5rem] tracking-[0.05em] grow">
          BLACKJACK
        </h1>
      </div>

      <p className="m-0 mt-2 text-[0.8rem] opacity-85">
        Por Gabriella Serni Ponzetta · Objetivo da rodada: fazer{' '}
        {target} pontos
      </p>
    </header>
  )
}

export default Header