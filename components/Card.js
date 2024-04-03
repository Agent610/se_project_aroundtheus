class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    const likeButton = this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    //".card__delete-button"
    const deleteButton = this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    //"previewModal, Open"
    const previewModal = document.querySelector(".modal_preview");

    //previewModal, Close
    const closeModal = document
      .querySelector(".modal_preview")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleDeleteButton() {
    //this._cardElement.remove();
  }

  _handleImageClick() {
    this._cardElement.querySelector(".modal_preview");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._element = this._getTemplate();
    this._link = this._element.querySelector(".card__image");
    this._name = this._element.querySelector(".card__title").textContent;

    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    const cardElement = cardTemplate.cloneNode(true);
    this._cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    //cardImage.addEventListener("click", () => {
    //document.querySelector("#preview-modal-image").src = data.link;
    //document.querySelector("#preview-modal-image").alt = data.name;
    //document.querySelector("#preview-modal-title").textContent = data.name;
    //openModal(document.querySelector("#preview-modal"));
    //});

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    deleteButton.addEventListener("click", () => {
      cardElement.remove("card__delete-button_toggle");
    });

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();

    return cardElement;
  }
}

export default Card;
