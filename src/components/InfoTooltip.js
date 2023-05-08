import React from 'react';

// import iconError from '../images/icon-error.svg';
// import iconSuccess from '../images/icon-success.svg';

const InfoTooltip = ({onClose, isOpen, isSuccess}) => {

  const caption = `${isSuccess
    ? 'Вы успешно зарегистрировались!'
    : (`Что-то пошло не так!
      Попробуйте ещё раз.`)}`

  // const image = `${isSuccess ? iconSuccess : iconError}`;

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <h2 className="popup__title">{caption}</h2>
      
      <button className="popup__close-button" type="button" aria-label="Кнопка закрытия popup" onClick={onClose}></button>
    </div>
  </div>
  )
}

export default  InfoTooltip;
