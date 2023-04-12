import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function PopupAddCard(props) {
  // Рефы названия и картинки карточки
  const cardName = useRef();
  const cardLink = useRef();
  // Эффект для очистки полей
  useEffect(() => {
    cardName.current.value = '';
    cardLink.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({ name: cardName.current.value, link: cardLink.current.value });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitBtnText='Создать'
      name='add-card'
      title='Новое место'>
      <input className="popup__input popup__input_card-name" ref={cardName}
        type="text" name="name" id="card-name" placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required />
      <span className="popup__input-error" id="card-name-error"></span>
      <input className="popup__input popup__input_img-link" ref={cardLink}
        type="url" name="link" id="link-img" placeholder="Сылка на картинку" autoComplete="off" minLength="2" required />
      <span className="popup__input-error" id="link-img-error"></span>
    </PopupWithForm>
  )
}

export default PopupAddCard;