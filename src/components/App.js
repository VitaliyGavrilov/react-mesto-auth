// Импорты
//Библиотеки
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
//Компоненты
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupEditProfile from "./PopupEditProfile.js";
import PopupAddCard from './PopupAddCard.js';
import PopupEditAvatar from './PopupEditAvatar.js';
import PopupImage from './PopupImage.js';
import PopupDeleteCard from './PopupDeleteCard.js';
import ProtectRoute from './ProtectRoute.jsx';
import InfoTooltip from './InfoTooltip';
//Утилиты
import api from '../utils/api.js';
import * as auth from '../utils/auth';
//Контекст
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from './Login.js';
import Register from './Register.js';
// Основной компонент, который собирает приложение
function App() {
  // ---Cтейт-переменные:
  // --Попапы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // попап-Редактирование профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);       // попап-Добавление карточки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);   // попап-Редактирование аватара
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);             // попап-Увеличение изображения
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);   // попап-Удаление карточки
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);   // попап-Успешный/провальный логин/регистрация
  // --Данные
  const [selectedCard, setSelectedCard] = useState({});   // данные-Передача данных при увеличении изображения
  const [deleteCard, setDeleteCard] = useState({});       // данные-Передача данных при удалении карточки
  const [currentUser, setCurrentUser] = useState({});     // данные-Текущие данные пользователя
  const [cards, setCards] = useState([]);                 // данные-Карточки
  const [email, setEmail] = useState('');                 // данные-Адрес почты
  // --Состояния
  const [loggedIn, setLoggedIn] = useState(false);   // состояние-Вход в акаунт
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false); // состояние-Попытка регистрации/входа
  // --Навигация
  const navigate = useNavigate();
  // ---Запрос на получение данных пользователя и карточек, только при успешном входе в систему
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch((err) => { console.log(`Возникла ошибка при загрузке данных, ${err}`) })
    }
  }, [loggedIn]);
  // ---Если токен есть в локальном хранилише то переходим на базовую страницу
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);
  // ---Функции для работы попапов и мейн:
  // --Редактирование имени и проффесии
  // -Обработчик открытия попапа редактирования профиля
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
  // -Обработчик сабмита данных пользователя
  function handleUpdateUser(userItem) {
    api.patchUserInfo(userItem.name, userItem.about)
      .then((res) => { 
        setCurrentUser(res); 
        closeAllPopups();
      })
      .catch((err) => { console.log(`Возникла ошибка при редактировании профиля, ${err}`) })
  }
  // --Добавление карточек
  // -Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
  // -Обработчик сабмита добавления карточки
  function handleAddCard(cardItem) {
    api.postCard({ name: cardItem.name, link: cardItem.link })
      .then((card) => { 
        setCards([card, ...cards]);
        closeAllPopups(); 
      })
      .catch((err) => { console.log(`Возникла ошибка при добавлении новой карточки, ${err}`) })
  }
  // --Редактирование аватара
  // -Обработчик открытия попапа обновления аватара
  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
  // -Обработчик сабмита аватара
  function handleUpdateAvatar(link) {
    api.patchUserAvatar(link)
      .then((res) => { 
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => { console.log(`Возникла ошибка при зименении аватара, ${err}`) })
  }
  // --Удаление карточек
  // -Обработчик открытия попапа удаления карточки
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setDeleteCard({ card })
  }
  // -Обработчик удаления карточки
  function handleCardDelete({ card }) {
    api.deleteCard(card._id)
      .then(() => { 
        setCards((cardsArray) => cardsArray.filter((cardItem) => cardItem._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => { console.log(`Возникла ошибка при удалении карточки, ${err}`) })
  }
  // --Фото-попап
  // -Обработчик открытия попапа фото
  function handleCardClick(cardItem) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardItem.name,
      link: cardItem.link
    })
  } 
  // --Попап-подсказка
  // -Обработчки открытия попапа подсказки
  function openInfoTooltip() { setInfoTooltipPopupOpen(true) } 
  // --Лайки
  // -Обработчик лайка
  function handleCardLike(card) {
    // -Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // -Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { console.log(`Возникла ошибка при лайке, ${err}`) })
  }
  // ---Функция для закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltipPopupOpen(false);
  }
  // ---Функции для логина и регистрации:
  // --Функция для логина
  function handleLogin (email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        openInfoTooltip();
        setIsSuccessInfoTooltipStatus(false);
        console.log(err);
      });
  }
  // --Функция для регистрации
  function handleRegister (email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccessInfoTooltipStatus(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false);
        console.log(err);
      })
      .finally(() => {
        openInfoTooltip();
      });
  }
  // --Функция для выхода из аккаунта
  function signOut () {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setEmail("");
  }
  // ---Сборка страницы из компонентов
  return (
    < CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <Header
          onSignOut={signOut}
          mail={email}
        />
        <Routes>
          <Route path="/" element={ <ProtectRoute loggedIn={loggedIn}>
            < Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteCardClick}
              onCardLike={handleCardLike}
              cards={cards}/></ProtectRoute>}
          />
          <Route path="/sign-in" element={
            <Login
              onSubmit={handleLogin} />}
          />
          <Route path="/sign-up" element={
            <Register
              onSubmit={handleRegister} />}
          />
          <Route path="*" element={
            loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in"/>}
          />
        </Routes>
        < Footer />
        < PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        < PopupAddCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        < PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        < PopupImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        < PopupDeleteCard
          card={deleteCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onConfirmationCardDelete={handleCardDelete}
        />
        < InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
