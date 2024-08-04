class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //methods for working with the API
  //GET https://around-api.en.tripleten-services.com/v1/cards
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      //}).then(this._handleServerResponse);
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        //Debugging check
        return result;
      });
    //.catch((err) => {
    //console.log(err); // log error to console
    //});
  }

  //GET https://around-api.en.tripleten-services.com/v1/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
    // .catch((err) => {
    //   console.log(err); //log error to console
    // });
  }

  getAppInfo() {
    return Promise.all({ this: getCardList(), this: getUserInfo() });
  }

  //POST https://around-api.en.tripleten-services.com/v1/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${this._handleServerResponse}`); //(Like in line 34)
    });
    // .catch((err) => {
    //   console.log(err); //log error to console
    // });
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId
  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.ok
        ? res.json()
        : Promise.reject(`Error: ${this._handleServerResponse}`);
    });
    // .catch((err) => {
    //   console.log(err); //log error to console
    // });
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me
  setUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Parth Sonanitwala",
        about: "State-Trooper",
      }),
    });
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
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

  //PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  changeCardLikeStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: like ? "PUT" : headers,
      this: _headers,
    }).then(this._handleServerResponse);
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
  changeCardDeleteLikeStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/like/${cardID}`, {
      method: like ? "DELETE" : headers,
      this: _headers,
    }).then(this._handleServerResponse);
  }

  Api = {
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
      "Content-Type": "application/json",
    },
  };
}

export default Api;
