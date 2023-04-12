import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function PopupEditAvatar(props) {
  // Реф для аватара
  const avatarRef = useRef();
  // Эффект для очистки формы
  useEffect(() => { avatarRef.current.value = '' }, [props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitBtnText='Сохранить'
      name='edit-avatar'
      title='Обновить аватар'>
      <input className="popup__input popup__input_link_avatar" ref={avatarRef}
        type="url" name="avatar" id="avatar" placeholder="Сылка на аватар" autoComplete="off" minLength="2" required />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  )
}
export default PopupEditAvatar;