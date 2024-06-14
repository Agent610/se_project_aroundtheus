import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';
import {initialCards, selectors}

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
cardSelector: '.cards__list',
cardTemplate: 'card-template',
}  

//Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const previewModal = document.querySelector("#preview-modal");

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

//Form Information
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");

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

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImagePreview);
  wrapper.prepend(card.getView());
  
}

function handleImagePreview (cardData) 
  {
    Popup.open() 
  }


function handleProfileFormSubmit(inputValues) {
 userInfo.setUserInfo(inputValues);
  editProfilePopup.close();
  editProfileForm.reset();
}

function handleAddCardFormSubmit(inputValues) {
  renderCard({ name, link }, cardsWrap);
  addProfilePopup.close();
  addCardForm.reset();
}

const CardSelector = "#card-template";

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

close(previewModal);

//EventListeners

profileEditButton.addEventListener("click", () => {
  return
const userData = userInfo.getUserInfo();
  editFormValidator.hideInputError(nameInput);
  editFormValidator.hideInputError(jobInput);
  const PopupWithForm = new Popup();
  PopupWithForm.open(editProfileModal);  
});

profileModalCloseButton.addEventListener("click", () => {
  const PopupWithForm = new Popup();
  PopupWithForm.close(editProfileModal);
});

addCardButton.addEventListener("click", () => {
  addCardValidator.hideInputError(cardTitleInput);
  addCardValidator.hideInputError(cardURLInput);
  const PopupWithForm = new Popup();
  PopupWithForm.open(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  const PopupWithForm = new Popup();
  PopupWithForm.close(addCardModal);
});


//Rendering Cards
initialCards = new Section((cardData) => {
  renderCard(cardData, cardsWrap);
});

//Section 
const cardSelector = new Section({
  renderer (item) => {
    const cardElement = new Card(item, selectors.cardTemplate);
  },
  selector: selectors.cardSelector,
)};
cardSelector.renderItems(initialCards);

//Popup
 const addCardPopup = new Popup(popUpAdd);
 const addEditPopup = new Popup(popUpEdit);
 const addImagePreviewPopup = new Popup(popupImage);

// Class Instances 

//PopupWithImage 
const popupImage = new PopupWithImage({popupSelector: "#preview-modal"});
popupImage.setEventListeners();


// PopupWithForm 
 const editProfilePopup = new PopupWithForm("#edit-modal", handleProfileFormSubmit);
//editProfilePopup.setEventListeners();
 
 const addProfilePopup = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
//addProfilePopup.setEventListeners();

// UserInfo
const nameSelector = ('.profile__title');
const aboutMeSelector = ('.profile__description');
const userInfo = new UserInfo(nameSelector, aboutMeSelector);

