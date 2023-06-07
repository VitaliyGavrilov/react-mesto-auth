import React from 'react';

import iconError from '../img/icon-error.svg';
import iconSuccess from '../img/icon-success.svg';

const InfoTooltip = ({ onClose, isOpen, isSuccessInfoTooltipStatus }) => {

  const title = `${isSuccessInfoTooltipStatus
    ? 'Вы успешно зарегистрировались!'
    : (`Что-то пошло не так!
      Попробуйте ещё раз.`)}`

  const img = `${isSuccessInfoTooltipStatus ? iconSuccess : iconError}`;

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__img popup__img_place_info-tooltip" src={img} alt={title} />
        <h2 className="popup__title popup__title_place_info-tooltip">{title}</h2>
        <button className="popup__close-button" type="button" aria-label="Кнопка закрытия popup" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
