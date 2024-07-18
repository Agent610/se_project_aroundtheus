class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    //setIsLiked(isLiked);
    //this._id = data.id;
    //this._handleDeleteButton = handleDeleteButton;
  }

  getID() {
  return this._id;
  }

  _setEventListeners() {
  //".card__like-button"
  this._element
  .querySelector(".card__like-button");
  //this._isLiked = isLiked;
  //this.renderLikes()
  addEventListener("click", () => {
  this._handleLikeButton();
  });

  //".card__delete-button"
  this._element
  .querySelector(".card__delete-button")
  .addEventListener("click", () => {
  this._handleDeleteButton();
  });

  this._cardImage.addEventListener("click", () => {
  this._handleImageClick({ name: this._name, link: this._link });
  });
  }

  _handleLikeButton() {
  this._element
  .querySelector(".card__like-button")
  .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
  this._element.remove();
  }

  _getTemplate() {
  return document
  .querySelector(this._cardSelector)
  .content.querySelector(".card")
  .cloneNode(true);
  }

  getView() {
  this._element = this._getTemplate();
  this._cardImage = this._element.querySelector(".card__image");
  const cardTitle = this._element.querySelector(".card__title");
  const likeButton = this._element.querySelector(".card__like-button");
  const deleteButton = this._element.querySelector(".card__delete-button");

  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  cardTitle.textContent = this._name;
  this._setEventListeners();

    return this._element;
  }

  //API 

  _updatedLikesView() {
  this._element.querySelector(".card__like-count").textContent = this._likes.length;

  setIsLiked(isLikedGetter); 
  {
  this._element.querySelector(".card__like-button")
  this._isLikedGetter = isLikedGetter;
  this._renderLikes();
  }

  isLiked(); {
  return this._isLikedGetter;
  }

  _renderLikes(); {
  if (this._isLikedGetter) {
  this._element.querySelector(".card__like-button").classList.add(".card__like-button_active");
  } else {
  this._element.querySelector(".card__like-button").classList.remove(".card__like-button_active");
  }
  }

  createCard(); {
  this._renderLikes();
  }
  }
}

export default Card;
