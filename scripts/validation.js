const showInputError = (formElement, inputElement, errorMessage, config) => {
  ////////////////////////////////////////////////////////console.log(inputElement);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  /////////////////////////////////////////////////////////////console.log(errorElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  ////////////////////////////////////////////////////////////////console.log(inputElement);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, btnElement, config) => {
  if (hasInvalidInput(inputList)) {
    btnElement.classList.add(config.inactiveButtonClass);
    btnElement.disabled = true;
  } else {
    btnElement.classList.remove(config.inactiveButtonClass);
    btnElement.disabled = false;
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const btnElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, btnElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, btnElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const resetValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const btnElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, btnElement, config);
};

//CONFIGURATION OBJECT
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "button_inactive",
  errorClass: "form__input-error_active",
};

enableValidation(validationSettings);
