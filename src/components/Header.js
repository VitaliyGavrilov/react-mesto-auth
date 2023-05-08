import headerLogo from '../img/logo.svg';

function Header ({loggedIn, onSignOut}) {
  return (
    <header className="header">
      <img src={ headerLogo } className="header__logo" alt="Логотип проекта Mesto" />
      {loggedIn && <button onClick={onSignOut}>Выйти</button>}
    </header>
  )
}
export default Header;