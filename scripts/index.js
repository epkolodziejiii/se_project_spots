//Name and Photo Link Array
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

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
const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileFormEl = editProfileModal.querySelector(".modal__form");

//Add New Post Variables
const newPostButton = document.querySelector(".profile__plus-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");

const addCardFormEl = newPostModal.querySelector(".modal__form");
const nameInput = document.querySelector("#post-description-input");
const linkInput = document.querySelector("#card-image-input");

//function (stage 7)

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

//Functions (Sprint 4:Opening and Closing Modals)
editProfileButton.addEventListener("click", function () {
  //editProfileModal.classList.add("modal_is-opened"); Was redundnat - see line 63
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  //editProfileModal.classList.remove("modal_is-opened"); Was redundnat - see line 67
  closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
  //newPostModal.classList.add("modal_is-opened"); Was redundnat - see line 63
  openModal(editProfileModal);
});

newPostCloseButton.addEventListener("click", function () {
  //newPostModal.classList.remove("modal_is-opened"); Was redundnat - see line 67
  closeModal(editProfileModal);
});

// Edit Profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);

// Add New Post
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(linkInput.value);

  newPostModal.classList.remove("modal_is-opened");
}

addCardFormEl.addEventListener("submit", handleAddCardSubmit);

//Log
initialCards.forEach(function (card) {
  console.log(card.name);
  console.log(card.link);
});
