import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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

//const cardData = {
//name: "Yosemite-Valley",
//link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//};

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector("card");

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

function handleImagePreview(cardData) {
  previewModal.querySelector("#preview-modal-image").src = cardData.link;
  previewModal.querySelector("#preview-modal-title").alt = cardData.name;
  previewModal.querySelector("#preview-modal-title").textContent =
    cardData.name;
  openModal(previewModal);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  this._nameElement.textContent = nameInput.value;
  this._aboutMeElement.textContent = jobInput.value;
  closeModal(editProfileModal);
  editProfileForm.reset();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  addCardForm.reset();
}

const cardSelector = "#card-template";

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

previewImageModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

//EventListeners
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  editFormValidator._hideInputError(nameInput);
  editFormValidator._hideInputError(jobInput);
  openModal(editProfileModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

addCardButton.addEventListener("click", () => {
  addCardValidator._hideInputError(cardTitleInput);
  addCardValidator._hideInputError(cardURLInput);
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

//Rendering Cards
initialCards.forEach((cardData) => {
  renderCard(cardData, cardsWrap);
});


//  create the class instances and use them in index.js.

// Class Instances 

 // PopupWithImage 
import {
  open ({link,name}) {
    image.src = link;
    image.alt = name;
    super.open();
  }
}


 // PopupWithForm 
import {
  _getInputValues, 
  setEventListeners, 

  new Card= "modal__input_type_description", "modal__input_type_error", "modal__input_type_name", "modal__input_type_title", "modal__input_type_url";
}

// UserInfo
import {
  getUserInfo, 
  setUserInfo, 
}