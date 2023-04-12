import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  // Подписка на контекст
  const CurrentUser = useContext(CurrentUserContext);
  // Определение владения карточкой
  const isOwn = props.card.owner._id === CurrentUser._id;
  // Определение наличие поставленного лайка и создаем переменную для именни класса лайка 
  const isLiked = props.card.likes.some(item => item._id === CurrentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  function handleCardClick() { props.onCardClick(props.card) }//клик на карточку
  function handleDeleteCardClick() { props.onCardDelete(props.card) }//клик на корзину карточки
  function handleLikeCardClick() { props.onCardLike(props.card) }//клик на лайк карточки

  return (
    <div className="element__container">
      {isOwn && <button className="element__delete-button" onClick={handleDeleteCardClick} ></button>}
      <img className="element__img" src={props.link} alt={props.name} onClick={handleCardClick} />
      <div className="element__block">
        <h2 className="element__name">{props.name}</h2>
        <div className="element__like-block">
          <button className={cardLikeButtonClassName} type="button" aria-label="Кнопка лайка" onClick={handleLikeCardClick}></button>
          <span className="element__likes-number">{props.like > 0 ? props.like : null}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;