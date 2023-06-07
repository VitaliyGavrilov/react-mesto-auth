import React from 'react';
import Auth from './Auth';

const Login = ({onSubmit}) => {
  return (
    <section className='auth'>
      <div className='auth__block'>
        <h2 className='auth__title'>Вход</h2>
        <Auth
          name='login'
          btnText='Войти' 
          onSubmit={onSubmit}
        />
      </div>
    </section>
  )
}
export default Login;