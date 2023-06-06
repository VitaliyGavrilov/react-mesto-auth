import headerLogo from '../img/logo.svg';
import React from 'react';
import {Routes, Route, Link} from "react-router-dom";

function Header ({onSignOut, mail}) {
  return (
    <header className="header">
      <img src={ headerLogo } className="header__logo" alt="Логотип проекта Mesto" />
      <Routes>
        <Route path="/sign-in" element={
          <Link className="header__auth-link" to="/sign-up">Регистрация</Link>}
        />
        <Route path="sign-up" element={
          <Link className="header__auth-link" to="/sign-in">Войти</Link>}
        />
        <Route path="/" element={
          <div className='header__auth-box'>
            <p className='header__mail'>{mail}</p>
            <button className='header__exit-button' onClick={onSignOut}>Выйти</button>
          </div>} 
        />
      </Routes>
    </header>
  )
}
export default Header;