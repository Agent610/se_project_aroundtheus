import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Styles from "./index.css";
//import {initialCards, selectors}
import Api from "../components/Api.js";
import Utils from "../utils/utils.js";
import { forEach, set } from "lodash";

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e8b97a08-d6fd-41c9-b787-2c46b2b6891e",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((error) => {
    console.error("Error getting user info:", error);
  });

api
  .getCardList()
  .then((res) => {
    console.log("Here is your card list res =>", res);
    if (Array.isArray(res)) {
      res.forEach((cardData) => {
        renderCard(cardData);
      });
    } else {
      console.error("Error received data is not an array:", res);
    }
  })
  .catch((error) => {
    console.error("Error fetching card list:", error);
  });

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector("card");

export const selectors = {
  cardSelector: ".cards__list",
  cardTemplate: "#card-template",
};

//Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const previewModal = document.querySelector("#preview-modal");

const deleteCardModal = document.querySelector("#delete-modal");
const deleteCardElement = deleteCardModal.querySelector(".modal__form");
const pictureModal = document.querySelector("#picture-modal");
const pictureFormElement = pictureModal.querySelector(".modal__form");

//Button Information
const profileEditButton = document.querySelector(".profile__edit-button");

//profile image

const profileImage = document.querySelector(".profile__image");

const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const previewImageModalCloseButton =
  previewModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardButton = document.querySelector("#profile-add-button");
const editProfileForm = document.querySelector("#profile-edit-form");
const addCardForm = document.querySelector("#add-card-form");

const deleteCardButton = document.querySelector(".card__delete-button");
const deleteCardModalCloseButton =
  deleteCardModal.querySelector(".modal__close");
const deleteCardForm = document.querySelector("#delete-modal-form");
const changeProfileButton = document.querySelector(".profile__change-button");
const changeProfileCloseButton = pictureModal.querySelector(".modal__close");
const changeProfileForm = document.querySelector("#change-picture-form");

//Form Information
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");

const pictureURLInput = pictureFormElement.querySelector(
  ".modal__input_type_url"
);

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
}

function handleImagePreview(cardData) {
  popupImage.open(cardData);
}

function handleSubmit(request, popupInstance, form, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  // setTimeout(() => {
  request()
    .then(() => {
      popupInstance.close();
      if (form) {
        form.reset();
      }
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
  // }, 1000);
}

function handleProfileFormSubmit(inputValues) {
  function makeRequest() {
    return api.setUserInfo(inputValues).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  }
  handleSubmit(makeRequest, editProfilePopup, editFormValidator);
}

function handleAddCardFormSubmit({ name, link }) {
  function makeRequest() {
    return api
      .addCard({ name, link })
      .then((res) => {
        renderCard(res, cardsWrap);
      })
      .catch((error) => {
        console.error("Error adding card:", error);
      });
  }

  handleSubmit(makeRequest, addCardPopup, addCardValidator);
}

function handleDeleteCardFormSubmit(card) {
  api
    .removeCard(card._id)
    .then((res) => {
      card._handleDeleteButton();
    })
    .catch((error) => {
      console.error("Error removing card:", error);
    })
    .finally(() => deleteCardPopup.close());
}

function handlePictureFormSubmit({ link }) {
  pictureFormPopup.close();
  changeProfileForm.reset();
  function makeRequest() {
    api.setUserAvatar(link).then((info) => {
      pictureFormPopup.close(info);
      profileImage.src = link;
    });
  }

  handleSubmit(makeRequest, pictureFormPopup, pictureFormValidator);
}

const cardSelect = "#card-template";

//Validation

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = editProfileModal.querySelector(".modal__form");
const addCardElement = addCardModal.querySelector(".modal__form");
const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
editFormValidator.enableValidation();
const addCardValidator = new FormValidator(validationSettings, addCardElement);
addCardValidator.enableValidation();

const deleteFormElement = deleteCardModal.querySelector(".modal__form");
const changePictureFormElement = pictureModal.querySelector(".modal__form");
const deleteFormValidator = new FormValidator(
  validationSettings,
  deleteFormElement
);
deleteFormValidator.enableValidation();

const changeProfilePictureFormElement =
  pictureModal.querySelector(".modal__form");
const pictureFormValidator = new FormValidator(
  validationSettings,
  changeProfilePictureFormElement
);
pictureFormValidator.enableValidation();

//EventListeners

const aboutEl = document.querySelector("#profile-description-input");
const nameEl = document.querySelector("#profile-name-input");

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameEl.value = userData.name;
  aboutEl.value = userData.about;
  editProfilePopup.open();
});

// Edit profile popup
const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

// Add Profile Popup
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Change Profile Picture
changeProfileButton.addEventListener("click", () => {
  pictureFormPopup.open();
});

function handleConfirmDelete(card) {
  deleteCardPopup.open(card);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    handleImagePreview,
    handleConfirmDelete,
    cardIsLiked,
    cardDisLike
  );

  return card.getView();
}

//Rendering Cards

//Section
const section = new Section(
  {
    items: [],
    renderer: (cardData) => {
      renderCard(cardData);
    },
  },
  selectors.cardSelector
);
section.renderItems();
//Popup
// Class Instances

//PopupWithImage
const popupImage = new PopupWithImage({ popupSelector: "#preview-modal" });
popupImage.setEventListeners();

const pictureFormPopup = new PopupWithForm(
  "#picture-modal",
  handlePictureFormSubmit
);

pictureFormPopup.setEventListeners();

//PopupWithConfirm
const deleteCardPopup = new PopupWithConfirm(
  "#delete-modal",
  handleDeleteCardFormSubmit
);
deleteCardPopup.setEventListeners();

// UserInfo
const nameSelector = ".profile__title";
const aboutMeSelector = ".profile__description";
const setUserAvatar = ".profile__image";
const userInfo = new UserInfo({ nameSelector, aboutMeSelector, setUserAvatar });

function cardIsLiked(card) {
  api
    .changeCardLikeStatus(card._id)
    .then((response) => {
      card.setIsLiked(response.isLiked);
      // card._updateLikesView();
      {
        // this._handleCardLike(this);
        //this._likeButton.classList.add("card__like-button_active");
      }
    })
    .catch((error) => {
      console.error("Error liking card:", error);
    })
    .finally();
}

function cardDisLike(card) {
  api
    .changeCardDeleteLikeStatus(card._id)
    .then((response) => {
      console.log(response);
      card.setIsLiked(response.isLiked);
      // card._updateLikesView();
      {
        //this._handleCardDisLike(this);
        //this._likeButton.classList.remove("card__like-button_active");
      }
    })
    .catch((error) => {
      console.error("Error disliking card:", error);
    })
    .finally();
}
