import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`form-${props.name}`} onSubmit={props.onSubmit} id={`form-${props.name}`} >
          <fieldset className="popup__fieldset">
            {props.children}
          </fieldset>
          <button className="popup__save-button" type="submit" aria-label="Кнопка сохранения данных">{props.submitBtnText}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Кнопка закрытия popup" onClick={props.onClose}></button>
      </div>
    </div>
  )
}
export default PopupWithForm;