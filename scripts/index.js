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

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
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
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
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
  const card = { name: cardCaptionInput.value, link: cardImageInput.value };
  const newCard = getCardElement(card);
  cardList.prepend(newCard);

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
  //add data
  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  //like button functionality
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });
  //delete button functionality
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", function () {
    cardDeleteBtn.closest(".card").remove();
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

//LOOP CARD INFO
initialCards.forEach(function (card) {
  const initialCard = getCardElement(card);
  cardList.prepend(initialCard);
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
