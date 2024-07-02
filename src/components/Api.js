class Api {
    constructor({baseUrl, authToken, headers}) {
        this._baseUrl = baseUrl;
        this._authToken = authToken;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch("https://around-api.en.tripleten-services.com/v1/cards",)
    }

        //methods for working with the API 
        
        //GET https://around.nomoreparties.co/v1/groupID/cards
             getCardList(){
                return fetch(`${this._baseUrl}/cards`, {
                    headers: {
                      authorization: this._authToken
                    }
                  })
                    .then(res => {res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)})
                    .catch((err) => {
                    console.log(err); // log error to console
                });
            }

        // GET https://around.nomoreparties.co/v1/groupID/users/me
          getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authToken
            }
        })
        .then(res => {res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)})
        .catch((err) => {
            console.log(err); //log error to console
        });
        }

        getAppInfo() {
          return Promise.all({this:getCardList(), this:getUserInfo()});
        }

        //POST https://around.nomoreparties.co/v1/groupID/cards
        addCard({name, link}) {
           return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: {
                  authorization: this._authToken,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name,
                  link
                })
              })
              .then(res => {res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)})
              .catch((err) => {
                  console.log(err); //log error to console
              });
        }

        //DELETE https://around.nomoreparties.co/v1/groupID/cards/cardID
        removeCard(cardID) {
          return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: {
              authorization: this._authToken,
              "Content-Type": "application/json"
            }
          })
          .then(res => {res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)})
          .catch((err) => {
              console.log(err); //log error to console
          });
        }

        // PUT https://around.nomoreparties.co/v1/groupID/cards/likes/cardID

        //DELETE https://around.nomoreparties.co/v1/groupID/cards/likes/cardID
        //changeLikeCardStatus(cardID, like)

        //PATCH https://around.nomoreparties/co/v1/groupID/users/me
        //setUserInfo() {}

        //PATCH https://around.nomoreparties/co/v1/groupID/users/me/avatar
        //setUserInfo() {}

        _handleServerResponse(res) {
          return res.ok ? res.json() :Promise.reject(`Error: ${res.status}`)
        }

        setUserAvatar({avatar}) {
          return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
              this:_headers,
            body: JSON.stringify({
              avatar,
            })
        }}),
          then (this._handleServerResponse);
        }

        changeCardLikeStatus(cardID, like) {
          return fetch (`${this._baseUrl}/cards/like/${cardID}`, {
            method: like ? "PUT": "DELETE",
            headers: this._headers,
        }). then(this._handleServerResponse);
        }

     Api = new Api({
        baseUrl: "https://around-api.en.tripleten-services.com/v1",
        headers: {
        authToken: "eeb6862d-8337-45ca-b804-a54d677deb3a",
        "Content-Type": "application/json"
        }
    });
    

}

export default Api 