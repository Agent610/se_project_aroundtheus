import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Styles from "./index.css";
import Api from "../components/Api.js";
//import {initialCards, selectors}

const initialCards = [
  {
    name: "Yosemite-Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake-Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald-Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise-National-Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago-di-Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

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
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const previewModal = document.querySelector("#preview-modal");
const deleteModal = document.querySelector("#modal-delete");
const deleteFormElement = deleteModal.querySelector(".modal__form");
const changeProfilePictureModal = document.querySelector(
  "#modal-profile-picture"
);
const changePictureFormElement =
  changeProfilePictureModal.querySelector(".modal__form");

//Button Information
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const previewImageModalCloseButton =
  previewModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardButton = document.querySelector("#profile-add-button");
const editProfileForm = document.querySelector("#profile-edit-form");
const addCardForm = document.querySelector("#add-card-form");
const deleteCardModalButton = document.querySelector(".modal__button");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close");
const deleteCardForm = document.querySelector("#modal-delete-form");
const changePictureButton = document.querySelector(".modal__button");
const changePictureCloseButton =
  changeProfilePictureModal.querySelector(".modal__form");
const changePictureForm = document.querySelector("#modal-change-picture");

//Form Information
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");
const cardTitleURLInput = profileFormElement.querySelector(
  ".modal__input_type_title"
);

function closeWithEsc(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function closeModalOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

function openModal(modal) {
  // add class to modal
  document.addEventListener("keydown", closeWithEsc);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  //remove class from modal
  document.removeEventListener("keydown", closeWithEsc);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  modal.classList.remove("modal_opened");
}

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItem(card);
  //wrapper.prepend();
  //Section.renderItems(item);
}

function handleImagePreview(cardData) {
  popupImage.open(cardData);
}

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
  editProfileForm.reset();
}

function handleAddCardFormSubmit({ name, link }) {
  renderCard({ name, link }, cardsWrap);
  addProfilePopup.close();
  addCardForm.reset();
}

function handleDeleteCardFormSubmit() {
  deleteCardPopup.close();
}

function handleProfilePictureFormSubmit() {
  changePicturePopup.close();
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
const deleteCardElement = deleteModal.querySelector(".modal__form");
const profilePictureElement =
  changeProfilePictureModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);

editFormValidator.enableValidation();

const addCardValidator = new FormValidator(validationSettings, addCardElement);
addCardValidator.enableValidation();

//EventListeners

const aboutEl = document.querySelector("#profile-description-input");
const nameEl = document.querySelector("#profile-name-input");

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameEl.value = userData.name;
  aboutEl.value = userData.about;
  // editFormValidator.hideInputError(nameInput);
  // editFormValidator.hideInputError(jobInput);
  editProfilePopup.open(editProfileModal);
});

const editPopupWithForm = new PopupWithForm("#edit-modal");
editPopupWithForm.close(editProfileModal);

addCardButton.addEventListener("click", () => {
  //  addCardValidator.hideInputError(cardTitleInput);
  //  addCardValidator.hideInputError(cardURLInput);
  addProfilePopup.open(addCardModal);
});

const addPopupWithForm = new PopupWithForm("#add-card-modal");
addPopupWithForm.close(addCardModal);

deleteCardModalButton.addEventListener("click", () => {
  deleteCardPopup.open(deleteModal);
});

const deletePopupWithForm = new PopupWithForm("#modal-delete");
deletePopupWithForm.close(deleteModal);

changePictureButton.addEventListener("click", () => {
  changePicturePopup.open(changeProfilePictureModal);
});

const pictureWithForm = new PopupWithForm("#modal-profile-picture");
//changePictureForm.close(changeProfilePictureModal);

function createCard(cardData) {
  const card = new Card(cardData, selectors.cardTemplate, handleImagePreview);
  return card.getView();
}

//Rendering Cards

//Section
const section = new Section(
  {
    items: initialCards,
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

// PopupWithForm
const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

const addProfilePopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addProfilePopup.setEventListeners();

const deleteCardPopup = new PopupWithForm(
  "#modal-delete",
  handleDeleteCardFormSubmit
);
deleteCardPopup.setEventListeners();

const changePicturePopup = new PopupWithForm(
  "#modal-profile-picture",
  handleProfilePictureFormSubmit
);
changePicturePopup.setEventListeners();

// UserInfo
const nameSelector = ".profile__title";
const aboutMeSelector = ".profile__description";
const userInfo = new UserInfo({ nameSelector, aboutMeSelector });

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "eeb6862d-8337-45ca-b804-a54d677deb3a",
    "Content-Type": "application/json",
  },
});

const sectionRenderer = (/*something*/) => {
  /* does something */
};

api.getCardList().then((res) => {
  //const section = new Section(
  //{
  items: res, renderer;
  sectionRenderer;
  //},
  //".cards__list"
  //);
  const cardList = new Section(items, cardData, renderer, (cardData) => {
    if (Card.isLiked()) {
      api
        .dislikeCard(Card.getID())
        .then((response) => {
          Card.setIsLiked(response.isLiked);
        })
        .catch((error) => {
          console.error("Error disliking card:", error);
        });
    } else {
      api
        .likeCard(Card.getID())
        .then((response) => {
          card.setIsLiked(response.isLiked);
        })
        .catch((error) => {
          console.error("Error liking card:", error);
        });
    }

    // cardList.renderItems(card)
    //   .catch((error) => {
    //     console.error('Error getting card list:', error);
    //   });
  });

  const card = new Card(
    {
      Card,
      handleImageClick: () => {
        PopupWithImage.open({ popupSelector });
      },
      handleDeleteButton: () => {
        const id = card.getID();
        api
          .removeCard(id)
          .then((res) => {
            card._handleDeleteButton();
          })
          .catch((error) => {
            console.error("Error removing card:", error);
          });
      },
    },
    cardSelect
  );
});

//show loading
// api.loading.then(res => {res.ok ? res.json : Promise.reject(`Error: ${res.status}`)})
//   .catch((err) => {
//     api.finally()
//     //hide loading
//   });

//   api.getUserInfo().then(userData => {
//   userInfo.setUserInfo({
//   userName: userData.name,
//   userDescription: userData.about
//   }).catch((error) => {
//   console.error('Error getting user info:', error);
//   });
// });

api.getUserInfo();
