

  const showInputError = (errorElement, errorMessage, errorInput, {inputErrorClass, errorClass}) => {
    errorElement.textContent=errorMessage;
    errorElement.classList.add(errorClass);
    errorInput.classList.add(inputErrorClass);
  };

  const hideInputError = (errorElement, errorInput, {inputErrorClass, errorClass}) => {
    errorElement.textContent="";
    errorElement.classList.remove(errorClass);
    errorInput.classList.remove(inputErrorClass);
  };

  const checkValidInput = (inputElement, formElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
      showInputError(errorElement, inputElement.validationMessage, inputElement, {inputErrorClass, errorClass});
    } else {
      hideInputError(errorElement, inputElement, {inputErrorClass, errorClass});
    }
  };

  const isFormInvalid = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    if (isFormInvalid(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };

  const setEventListener = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const inputList=Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement=formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkValidInput(inputElement, formElement, {inputErrorClass, errorClass});
        toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
      })
    });
  };

  const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList=Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListener(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
    });
  };

  enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__send',
    inactiveButtonClass: 'popup__send_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
  });
