class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    //this._authorization = "eeb6862d-8337-45ca-b804-a54d677deb3a";
  }

  // getInitialCards() {
  //   return fetch(
  //     //"https://around-api.en.tripleten-services.com/v1/cards",
  //     `${this._baseUrl}/cards`,
  //     { headers: this._headers },
  //     { authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a" }
  //   ).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Error: ${res.status}`);
  //   });
  // }

  getInitialCards() {
    return fetch(
      `${this._baseUrl}/cards`,
      { headers: this._headers },
      { authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a" }
    ).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error:${res.status}`)
    );
  }

  // getInitialCards() {
  //   return fetch(
  //     `${this._baseUrl}/cards`, {headers: this._headers}, {authorization}
  //   )
  // }
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
        name: "Parth Sonanitwala",
        about: "State-Trooper",
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
          : Promise.reject(`Error: ${this._handleServerResponse}`); //(Like in line 34)
      })
      .catch((err) => {
        console.log(err); //log error to console
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
      method: like ? "PUT" : headers,
      this: _headers,
      authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
    }).then(this._handleServerResponse);
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  changeCardDeleteLikeStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: like ? "DELETE" : headers,
      this: _headers,
      authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
    }).then(this._handleServerResponse);
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        this: _headers,
        body: JSON.stringify({
          avatar,
        }),
      },
    }).then(this._handleServerResponse);
  }
}

export default Api;
