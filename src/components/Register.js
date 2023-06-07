import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth';

const Register = ({onSubmit}) => {
  return (
    <section className='auth'>
      <div className='auth__block'>
        <h2 className='auth__title'>Регистрация</h2>
        <Auth
          name='register'
          btnText='Зарегестрироваться' 
          onSubmit={onSubmit}
        />
        <Link className='auth__link' to="/sign-in">Уже зарегистрированы? Войти</Link>
      </div>
    </section>
  )
}
export default Register;
