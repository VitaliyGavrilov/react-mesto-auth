import React, { useContext } from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const userData = useContext(CurrentUserContext);// Подписка на контекст
  return (
    <main className="content">

      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-block">
            <img className="profile__avatar" src={userData.avatar} alt="Аватар" aria-label="Открыть попап редактирования аватара" />
            <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__card">
            <div className="profile__no-wrap">
              <h1 className="profile__name">{userData.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Кнопка редактирования профиля" onClick={props.onEditProfile} />
            </div>
            <p className="profile__profession">{userData.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" aria-label="Кнопка добавления фотографии" onClick={props.onAddPlace} />
      </section>

      <section className="element">
        {props.cards.map((cardItem) => (
          < Card
            key={cardItem._id}
            link={cardItem.link}
            name={cardItem.name}
            like={cardItem.likes.length}
            card={cardItem}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        ))
        }
      </section>

    </main>
  )
}
export default Main;