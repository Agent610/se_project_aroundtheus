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
  .content.querySelector(".card");

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

//Form Information
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");

function closeModal() {
  document.querySelector(".modal_opened").classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  //function closeModalByEscape(event) {
  //if (event.key === "Escape") {
  //}

  //document.addEventListener("keydown", closeModalByEscape);

  //document.removeEventListener("keydown", closeModalByEscape);

  modal.addEventListener("click", (event) => {
    if (Array.from(event.target.classList).includes("modal")) {
      closeModal();
    }
  });
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.append(cardElement);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.addEventListener("click", () => {
    document.querySelector("#preview-modal-image").src = data.link;
    document.querySelector("#preview-modal-image").alt = data.name;
    document.querySelector("#preview-modal-title").textContent = data.name;
    openModal(document.querySelector("#preview-modal"));
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button_toggle");
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

previewImageModalCloseButton.addEventListener("click", () => {
  closeModal();
});

//EventListeners
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

profileModalCloseButton.addEventListener("click", () => closeModal());

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => closeModal());

//Rendering Cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  renderCard(cardData, cardsWrap);
});
