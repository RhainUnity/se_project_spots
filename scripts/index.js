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
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

profileSubmitForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  editProfileModal.classList.remove("modal_is-opened");
});

//NEW POST OPEN/CLOSE
addPostBtn.addEventListener("click", function () {
  addPostModal.classList.add("modal_is-opened");
});

addPostCloseBtn.addEventListener("click", function () {
  addPostModal.classList.remove("modal_is-opened");
});

addPostSubmitForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(cardImageInput.value);
  console.log(cardCaptionInput.value);
  addPostModal.classList.remove("modal_is-opened");
});
