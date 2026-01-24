import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";

import Api from "../../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5ce8c54d-16fe-4e42-b491-e5b9e13adf08", // Replace with your actual token
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    console.log(cards, userInfo);
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profileAvatarEl.src = userInfo.avatar;
  })

  .catch(console.error);

//Variables

//Edit Profile Variables
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileAvatarEl = document.querySelector(".profile__avatar");
const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileFormEl = editProfileModal.querySelector(".modal__form");

//Add New Post Variables
const newPostButton = document.querySelector(".profile__plus-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

const addCardFormEl = newPostModal.querySelector(".modal__form");
const nameInput = document.querySelector("#post-description-input");
const linkInput = document.querySelector("#card-image-input");

//Edit Avatar Modal and Submit Avatar Change (Variables and Functions)
const editAvatarButton = document.querySelector(".profile__avatar-button");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseButton = editAvatarModal.querySelector(
  ".modal__close-button"
);
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const avatarLinkInput = document.querySelector("#avatar-image-input");

editAvatarButton.addEventListener("click", function () {
  openModal(editAvatarModal);
});

editAvatarCloseButton.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

//Variables (Stage 8 Part II)

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button_preview"
);
const previewImageElement = previewModal.querySelector(".modal__image");
const previewCaptionElement = previewModal.querySelector(".modal__caption");
//Variables (Stage 8)

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const deleteModal = document.querySelector("#delete-modal");

const deleteModalCloseButton = deleteModal.querySelector(
  ".modal__close-button_preview"
);

const deleteModalCancelButton = document.querySelector(".modal__cancel-button");

let selectedCard, selectedCardId;

deleteModalCancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteModalCloseButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

const deleteModalForm = document.querySelector("#modal-delete-form");

deleteModalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  api.deleteCard(selectedCardId).then(() => {
    selectedCard.remove();
    closeModal(deleteModal);
  });
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  //Card like button
  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  if (data.isLiked) {
    cardLikeButtonElement.classList.add("card__like-button_active");
  }

  cardLikeButtonElement.addEventListener("click", (event) =>
    api
      .handleLike(
        data._id,
        cardLikeButtonElement.classList.contains("card__like-button_active")
      )
      .then(() =>
        cardLikeButtonElement.classList.toggle("card__like-button_active")
      )
  );

  const cardDeleteButtonElement = cardElement.querySelector(
    ".card__delete-button"
  );

  //Delete form elements

  cardDeleteButtonElement.addEventListener("click", () => {
    //cardDeleteButtonElement.closest(".card").remove();
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewCaptionElement.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscape);
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal")) closeModal(event.target);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileFormEl,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

previewModalCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});

// Edit Profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error);
  //fix data submission - instead of input values
}

//avatar submit function

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatar({
      avatar: avatarLinkInput.value,
    })
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error);
}

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Add New Post
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: nameInput.value,
    link: linkInput.value,
  };
  api.addCard(inputValues).then((data) => {
    const cardElement = getCardElement(data);
    cardsList.prepend(cardElement);
    addCardFormEl.reset();
    toggleButtonState([nameInput, linkInput], evt.submitter, settings);
    closeModal(newPostModal);
  });
}

addCardFormEl.addEventListener("submit", handleAddCardSubmit);

//Log

enableValidation(settings);
