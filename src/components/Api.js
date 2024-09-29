//import { code } from "esutils";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //methods for working with the API

  //Loading user information from the server
  //GET https://around-api.en.tripleten-services.com/v1/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  //Loading cards from the server
  //GET https://around-api.en.tripleten-services.com/v1/cards
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  //Editing the profile
  //PATCH https://around-api.en.tripleten-services.com/v1/users/me
  setUserInfo({ name, about }) {
    // console.log({ name, about });
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleServerResponse);
  }

  //Adding a new card
  //POST https://around-api.en.tripleten-services.com/v1/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleServerResponse);
  }

  //Deleting a card
  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  //Adding likes
  //PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  changeCardLikeStatus(cardId) {
    if (!cardId) {
      //console.error("Invalid card Id");
      return;
      Promise.reject("Invalid card Id");
    }
    //console.log(cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  //Deleting likes
  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  changeCardDeleteLikeStatus(cardId) {
    // console.log(cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  //Updating Profile Picture
  //PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
  setUserAvatar(link) {
    // console.log(link);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleServerResponse);
  }
}

export default Api;
