//EDIT PROFILE
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

//NEW POST
const addPostBtn = document.querySelector(".profile__add-btn");
const addPostModal = document.querySelector("#new-post-modal");
const addPostCloseBtn = addPostModal.querySelector(".modal__close-btn");

//EDIT PROFILE OPEN/CLOSE
editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

//NEW POST OPEN/CLOSE
addPostBtn.addEventListener("click", function () {
  addPostModal.classList.add("modal_is-opened");
});

addPostCloseBtn.addEventListener("click", function () {
  addPostModal.classList.remove("modal_is-opened");
});
