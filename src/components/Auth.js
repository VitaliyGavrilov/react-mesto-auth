import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFormWithValidation from '../hooks/useFormWithValidation';

const Auth = ({name, title, btnText, onSubmit}) => {
  const { pathname } = useLocation();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [pathname, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values.email, values.password);
  }

  return (
    <section className='auth'>

      <div className='auth__block'>
        <h2 className='auth__title'>{title}</h2>
        <form className='auth__form' name={`form-${name}`} noValidate onSubmit={handleSubmit}>
          <fieldset className='auth__fieldset'>
            <input className='auth__input' 
              onChange={handleChange} value={values.email || ''}
              id="email" name="email" type="email" placeholder="Email" pattern='[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}'required/>
            <span className='auth__input-error'>{errors.email || ''}</span>
            <input className='auth__input' 
              onChange={handleChange} value={values.password || ''}
              id="password" name="password" type="password" placeholder="Пароль" pattern='\d+[a-zA-Z]+|[a-zA-Z]+\d+' minLength="8" maxLength="20" required/>
            <span className='auth__input-error'>{errors.password || ''}</span>
          </fieldset>
          <button className='auth__btn-submit' type="submit" disabled={!isValid}>{btnText}</button>
          {name === 'register' && <Link className='auth__link' to="/sign-in">Уже зарегистрированы?Войти</Link>}
        </form>
      </div>

    </section>
  )
}

export default Auth;
