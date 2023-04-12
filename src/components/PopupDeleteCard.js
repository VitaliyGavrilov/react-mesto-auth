import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function PopupDeleteCard(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirmationCardDelete(props.card);
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name='delete-card'
      title='Вы уверены?'
      submitBtnText='Да'
    >
    </PopupWithForm>
  )
}
export default PopupDeleteCard;