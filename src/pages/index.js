import "./index.css";
import {
  enableValidation,
  validationSettings,
  toggleButtonState,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5af14bf4-35ec-4ac2-a1b5-74276a3c6001",
    "Content-Type": "application/json",
  },
});

let selectedCard;
let selectedCardId;

//CARD TEMPLATE
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

//EDIT PROFILE
const editProfileModal = document.querySelector("#edit-profile-modal");
/* buttons */
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
/* input */
const profileColumn = document.querySelector(".profile__column");
const profileName = profileColumn.querySelector(".profile__name");
const profileDescription = profileColumn.querySelector(".profile__description");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-dscrptn-input");
const profileSubmitForm = document.forms["edit-profile-form"];

//NEW POST
const addPostModal = document.querySelector("#new-post-modal");
/* buttons */
const addPostBtn = document.querySelector(".profile__add-btn");
const addPostCloseBtn = addPostModal.querySelector(".modal__close-btn");
/* input */
const cardImageInput = document.querySelector("#card-image-input");
const cardCaptionInput = document.querySelector("#card-caption-input");
const addPostSubmitForm = document.forms["new-post-form"];

//PREVIEW MODAL
const previewModal = document.querySelector("#preview-modal");
const previewContent = previewModal.querySelector(".modal__preview-content");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");

//DELETE POST MODAL
const deletePostModal = document.querySelector("#delete-modal");
const confirmDelCloseBtn = deletePostModal.querySelector(".modal__close-btn");
const deleteConfirmBtn = deletePostModal.querySelector(".modal__delete-btn");
const deleteCancelBtn = deletePostModal.querySelector(
  ".modal__cancel-delete-btn"
);

confirmDelCloseBtn.addEventListener("click", function () {
  closeModal(deletePostModal);
});

deleteCancelBtn?.addEventListener("click", (evt) => {
  evt.preventDefault();
  selectedCard = null;
  selectedCardId = null;
  closeModal(deletePostModal);
});

deleteConfirmBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  deleteConfirmBtn.textContent = "Deleting...";
  if (!selectedCardId) return;
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard?.remove();
      closeModal(deletePostModal);
    })
    .catch(console.error)
    .finally(() => {
      selectedCard = null;
      selectedCardId = null;
      deleteConfirmBtn.textContent = "Delete";
    });
});

//  AVATAR IMAGE/LOAD CARDS
const avatarImage = document.querySelector(".profile__avatar");
api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardList.append(cardEl);
    });
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    avatarImage.src = user.avatar;
    avatarImage.alt = `${user.name}'s avatar`;
  })
  .catch((err) => {
    console.error(err);
  });

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

//EDIT AVATAR IMAGE
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const closeAvatarFormBtn = editAvatarModal.querySelector(".modal__close-btn");
const submitAvatarBtn = document.forms["edit-avatar-form"];
const avatarInput = editAvatarModal.querySelector("#avatar-image-input");

editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});

closeAvatarFormBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

submitAvatarBtn.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateSavingText(evt);
  api
    .editAvatarImage({ avatar: avatarInput.value })
    .then((data) => {
      avatarImage.src = data.avatar;
      avatarImage.alt = `${data.name}'s avatar`;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(revertSubmitText(evt));
  //

  closeModal(editAvatarModal);
});

//EDIT PROFILE OPEN/CLOSE
editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  resetValidation(profileSubmitForm, validationSettings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

profileSubmitForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateSavingText(evt);
  api
    .editUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(revertSubmitText(evt));

  closeModal(editProfileModal);
});

//NEW POST OPEN/CLOSE
addPostBtn.addEventListener("click", function () {
  openModal(addPostModal);
});

addPostCloseBtn.addEventListener("click", function () {
  closeModal(addPostModal);
});

addPostSubmitForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateSavingText(evt);
  const card = { name: cardCaptionInput.value, link: cardImageInput.value };
  //ADD NEW CARD
  api
    .addNewCard(card)
    .then((data) => {
      const newCard = getCardElement(data);
      cardList.prepend(newCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(revertSubmitText(evt));
  //clear input fields
  evt.target.reset();
  const inputList = Array.from(
    addPostSubmitForm.querySelectorAll(validationSettings.inputSelector)
  );
  const btnElement = addPostSubmitForm.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputList, btnElement, validationSettings);

  closeModal(addPostModal);
});

function updateSavingText(evt) {
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";
}

function revertSubmitText(evt) {
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Save";
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", escapeCloseModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapeCloseModal);
}

//CARD FUNCTION
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  //add data
  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  //like button functionality
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-btn_active");
    api
      .addOrRemoveLike(
        data._id,
        cardLikeBtn.classList.contains("card__like-btn_active")
      )
      .catch(console.error);
  });
  //delete button functionality
  cardDeleteBtn.addEventListener("click", function () {
    handleDeletePost(cardElement, data);
  });
  //preview modal
  cardImageEl.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleDeletePost(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deletePostModal);
}

api
  .removeCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deletePostModal);
  })
  .catch(console.error)
  .finally(() => {
    selectedCard = null;
    selectedCardId = null;
  });

//CLOSE MODAL ON ESCAPE OR CLICK BG
function escapeCloseModal(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

enableValidation(validationSettings);
