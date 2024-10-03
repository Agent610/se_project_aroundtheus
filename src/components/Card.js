class Card {
  constructor(
    { _id, name, link, isLiked },
    cardSelector,
    handleImageClick,
    handleConfirmDelete,
    handleCardLike,
    handleCardDisLike
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleCardLike = handleCardLike;
    this._isLiked = isLiked;
    this._handleCardDisLike = handleCardDisLike;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (this._isLiked) {
        this._handleCardDisLike(this);
      } else {
        this._handleCardLike(this);
      }
    });

    //".card__delete-button"
    this._deleteButton.addEventListener("click", () => {
      this._handleConfirmDelete(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleConfirmDelete(this);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  handleDeleteButton() {
    this._element.remove();
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
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
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._isLiked = this._isLiked;
    cardTitle.textContent = this._name;
    this._renderLikes();
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
