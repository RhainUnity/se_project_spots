//EDIT PROFILE
const editProfileModal = document.querySelector("#edit-profile-modal");
/* buttons */
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn"); /////
/* input */
const profileColumn = document.querySelector(".profile__column");
const profileName = profileColumn.querySelector(".profile__name");
const profileDescription = profileColumn.querySelector(".profile__description");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-dscrptn-input");
const profileSubmitForm = document.querySelector("#edit-profile-form");

//NEW POST
const addPostModal = document.querySelector("#new-post-modal");
/* buttons */
const addPostBtn = document.querySelector(".profile__add-btn");
const addPostCloseBtn = addPostModal.querySelector(".modal__close-btn");
/* input */
const cardImageInput = document.querySelector("#card-image-input");
const cardCaptionInput = document.querySelector("#card-caption-input");
const addPostSubmitForm = document.querySelector("#new-post-form"); ////

//EDIT PROFILE OPEN/CLOSE
editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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
  console.log(cardImageInput.value);
  console.log(cardCaptionInput.value);
  closeModal(addPostModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
