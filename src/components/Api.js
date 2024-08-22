class Api {
  constructor({ baseUrl, headers, authorization }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = authorization;
    //"eeb6862d-8337-45ca-b804-a54d677deb3a";
  }

  getInitialCards() {
    return fetch(
      `${this._baseUrl}/cards`,
      { headers: this._headers },
      { authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a" }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }

  //methods for working with the API

  //GET https://around-api.en.tripleten-services.com/v1/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
    })
      .then(this._handleServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  //GET https://around-api.en.tripleten-services.com/v1/cards
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
    })
      .then(this._handleServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  getAppInfo() {
    return Promise.all({ this: getCardList(), this: getUserInfo() });
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        headers: this._headers,
        authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error:${res.status}`)
    );
  }

  //POST https://around-api.en.tripleten-services.com/v1/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        headers: this._headers,
        authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${this._handleServerResponse}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        headers: this._headers,
        authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${this._handleServerResponse}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  changeCardLikeStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: like ? "PUT" : this._headers,
      authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
    }).then(this._handleServerResponse);
  }
  // changeCardLikeStatus(cardID, like) {
  //   return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
  //     method: "PUT",
  //     headers: this._headers,
  //     authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
  //     body: {

  //     }
  //   }).then(this._handleServerResponse);
  // }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  changeCardDeleteLikeStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: like ? "DELETE" : this._headers,
      authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
    }).then(this._handleServerResponse);
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
    }).then(this._handleServerResponse);
  }
}

export default Api;
