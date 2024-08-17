import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Styles from "./index.css";
import Api from "../components/Api.js";

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
  console.log(createCard(cardData));
  return createCard(cardData);
}

function handleImagePreview(cardData) {
  popupImage.open(cardData);
}

function handleDeleteButton(cardData) {
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

const modalProfilePicture = "#modal-profile-picture";
function handleProfilePictureFormSubmit() {
  modalProfilePicture.close();
}
//    renderLoading(modalProfilePicture, true);
//    api.setUserAvatar(link);
//    .then((info) => {
// userInfo.setUserInfo(info);
//    )})}
//modalProfilePicture
//example p.2 renderLoading(popupConfig.cardFormPopupSelector, true);
//example //.then((info) => {
//userInfo.setUserInfo(info);
//changeAvatarPopup.close();
//})
//.t

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

const deleteCardValidator = new FormValidator(
  validationSettings,
  deleteCardElement
);
deleteCardValidator.enableValidation();

const profilePictureValidator = new FormValidator(
  validationSettings,
  profilePictureElement
);
profilePictureValidator.enableValidation();

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
pictureWithForm.close(changeProfilePictureModal);

function createCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    handleImagePreview,
    handleDeleteButton
  );

  console.log(2);
  return card.getView();
}

//Rendering Cards

//Section
// const section = new Section(
//   {
//     items: [],
//     renderer: (cardData) => {
//       renderCard(cardData);
//     },
//   },
//   selectors.cardSelector
// );

// section.renderItems();

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

const fallbackItems = [];
let section;

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    section = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      selectors.cardSelector
    );

    section.renderItems();
  })
  .catch((err) => {
    //console.error(err);
  });

api
  .getUserInfo()
  .then((userData) => {
    api.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
    });
  })
  .catch((error) => {
    //console.error("Error getting user info:", error);
  });

// const card = new Card(
//   {
//     Card,
//     handleImageClick: () => {
//       PopupWithImage.open({ popupSelector });
//     },
//     handleDeleteButton: () => {
//       const id = card.getID();
//       api
//         .removeCard(id)
//         .then((res) => {
//           card._handleDeleteButton();
//         })
//         .catch((error) => {
//           console.error("Error removing card:", error);
//         });
//     },
//   },
//   cardSelect
// );

// api
//   .getCardList()
//   .then((res) => {
//     console.log(12313123);
//     console.log(res);
//     if (Array.isArray(res)) {
//       const sectionRenderer = new Section(
//         {
//           items: res,
//           renderer: (cardData) => {
//             renderCard(cardData);
//           },
//         },
//         selectors.cardsList
//       );

//       sectionRenderer.renderItems();
//     } else {
//       console.error("Error received data is not an array:", res);
//     }
//   })
//   .catch((error) => {
//     console.error("Error fetching card list:", error);
//   });

// api.setUserInfo({
//   userName: userData.name,
//   userDescription: userData.about,
// });

// api.addCard();

// api.removeCard();

// api.changeCardLikeStatus();
// if (Card.isLiked()) {
//   likeCard(Card.getID())
//     .then((response) => {
//       Card.setIsLiked(response.isLiked);
//     })
//     .catch((error) => {
//       console.error("Error liking card:", error);
//     });
// }

// api.changeCardDeleteLikeStatus();
// if (Card.dislikeCard()) {
//   dislikeCard(Card.getID())
//     .then((response) => {
//       Card.setIsLiked(response.isLiked);
//     })
//     .catch((error) => {
//       console.error("Error disliking card:", error);
//     });
// }

// api.setUserAvatar();

//} else {

//});

//show loading
// api.loading.then(res => {res.ok ? res.json : Promise.reject(`Error: ${res.status}`)})
//   .catch((err) => {
//     api.finally()
//     //hide loading
//   });
