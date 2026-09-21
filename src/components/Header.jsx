/**
 * Header — cabeçalho do jogo.
 * Props:
 *  - playerName: nome exibido no topo
 *  - target: pontuação alvo do Blackjack (RM da Gabriella = 21)
 */
function Header({ playerName, target }) {
  return (
    <header className="bg-[var(--color-primary)] text-[var(--color-text)] p-4 sm:px-6 rounded-[var(--radius)]">
      <div className="text-[0.85rem] opacity-85 mb-2">
        Jogador: {playerName}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
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