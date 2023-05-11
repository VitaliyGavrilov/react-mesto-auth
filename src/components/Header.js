import headerLogo from '../img/logo.svg';
import React, {useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";

function Header ({loggedIn, onSignOut}) {
  return (
    <header className="header">
      <img src={ headerLogo } className="header__logo" alt="Логотип проекта Mesto" />
      <Routes>
        <Route path="/sign-in" element={
          <Link className="header__link" to="/sign-up">Регистрация</Link>}
        />
        <Route path="sign-up" element={
          <Link className="header__link" to="/sign-in">Войти</Link>}
        />
        <Route path="/" element={
          <div>
            <button onClick={onSignOut}>Выйти</button>
            <p>майл</p>
          </div>} 
        />
      </Routes>
    </header>
  )
}
export default Header;