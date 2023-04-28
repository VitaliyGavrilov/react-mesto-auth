export const BASE_URL = "https://auth.nomoreparties.co";

const _checkResponse= (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

export const checkToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(_checkResponse);
};
