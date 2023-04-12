import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function PopupEditProfile(props) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // Стейт-переменные
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({ name: name, about: description });
  }
  function handleName(event) { setName(event.target.value) }
  function handleDescription(event) { setDescription(event.target.value) }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitBtnText='Сохранить'
      name='edit-profile'
      title='Редактировать профиль'>
      <input className="popup__input popup__input_data_name"
        value={name || ''} onChange={handleName}
        type="text" name="name" id="name" placeholder="Имя" autoComplete="off" minLength="2" maxLength="40" required />
      <span className="popup__input-error" id="name-error"></span>
      <input className="popup__input popup__input_data_profession"
        value={description || ''} onChange={handleDescription}
        type="text" name="profession" id="profesion" placeholder="Вид деятельности" autoComplete="off" minLength="2" maxLength="200" required />
      <span className="popup__input-error" id="profesion-error"></span>
    </PopupWithForm>
  )
}
export default PopupEditProfile;