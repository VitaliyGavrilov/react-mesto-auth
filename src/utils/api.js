class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора, принимает:
    this._baseUrl = baseUrl;//ссылка на сервер
    this._headers = headers;//уникальный токен
  }
  //--публичные методы:
  //-информация пльзователя:
  //для загрузки информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //для изменения информации о пользователе
  patchUserInfo( name, profession ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: profession
      }),
    }).then(this._checkResponse);
  }
  //-карточки:
  //для загрузки карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //для загрузки карточек на сервер
  postCard( {name, link} ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }
  //удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //-аватар:
  //изменение аватара
  patchUserAvatar( {avatar} ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }
  //-лайки
  changeLikeCardStatus(id, isLiked) {
    if (isLiked){
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
    }
  }
  //--приватные методы:
  //для проверки ответа с сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '1f82c894-9b03-4276-846a-bcfe76a68647',
    'Content-Type': 'application/json'
  }
})

export default api;