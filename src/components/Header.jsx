import "./Header.css";

function Header({ status, onToggleTheme, isLightTheme }) {
  return (
    <header className="header">
      <div className="header__top">
        <div className="header__title-group">
          <span className="header__badge">21</span>
          <h1 className="header__title">BLACKJACK</h1>
        </div>
        <button className="header__theme-btn" onClick={onToggleTheme} type="button">
          {isLightTheme ? "Tema escuro" : "Tema claro"}
        </button>
      </div>
      <p className="header__author">
        Gabriella Serni Ponzetta — RM 566296
      </p>
      <p className="header__status">{status}</p>
    </header>
  );
}

export default Header;