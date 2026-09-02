import './Header.css'

/**
 * Header — cabeçalho do jogo.
 * Props:
 *  - playerName: nome exibido no topo
 *  - target: pontuação alvo do Blackjack (RM da Gabriella = 21)
 */
function Header({ playerName, target }) {
  return (
    <header className="header">
      <div className="header__player">Jogador: {playerName}</div>

      <div className="header__title-row">
        <span className="header__badge">{target}</span>
        <h1 className="header__title">BLACKJACK</h1>
      </div>

      <p className="header__subtitle">
        Por Gabriella Serni Ponzetta · Objetivo da rodada: fazer{' '}
        {target} pontos
      </p>
    </header>
  )
}

export default Header
