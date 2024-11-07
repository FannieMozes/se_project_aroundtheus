const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ----------------------------------------------------------------------------- */
/*                               Elements                                        */
/* ----------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModal = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");

const addNewCardForm = addNewCardModal.querySelector(".modal__form");
const addNewCardCloseModal = addNewCardModal.querySelector(".modal__close");

/* ----------------------------------------------------------------------------- */
/*                               Functions                                       */
/* ----------------------------------------------------------------------------- */

function openPopup(modal) {
  modal.style.display = "flex";
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 500);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const imageModal = document.querySelector("#preview-image-modal");
  const modalImagePreview = imageModal.querySelector(".modal__image-preview");
  const modalImageCaption = imageModal.querySelector(".modal__image-caption");
  const closeButton = imageModal.querySelector("#modal-close-button");

  cardImageEl.addEventListener("click", () => {
    modalImagePreview.src = cardData.link;
    modalImagePreview.alt = cardData.name;
    modalImageCaption.textContent = cardData.name;
    imageModal.classList.add("modal_opened");
  });

  closeButton.addEventListener("click", () => {
    closePopup(imageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

/* ----------------------------------------------------------------------------- */
/*                                  Handlers                                     */
/* ----------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const cardTitleInput = document.querySelector("#card-title-input").value;
  const imageLinkInput = document.querySelector("#image-link-input").value;

  const newCardData = {
    name: cardTitleInput,
    link: imageLinkInput,
  };

  const newCardElement = getCardElement(newCardData);

  cardListEl.prepend(newCardElement);

  closePopup(addNewCardModal);
}

/* ----------------------------------------------------------------------------- */
/*                               Event Listeners                                 */
/* ----------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileCloseModal.addEventListener("click", () => closePopup(profileEditModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  document.querySelector("#card-title-input").value = "";
  document.querySelector("#image-link-input").value = "";
  addNewCardModal.classList.add("modal_opened");
});

addNewCardCloseModal.addEventListener("click", () =>
  closePopup(addNewCardModal)
);

addNewCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
