class FormValidator {
  constructor(data) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass
  }

  _showInputError(errorElement, errorMessage, errorInput) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    errorInput.classList.add(this._inputErrorClass);
  };

  _hideInputError(errorElement, errorInput) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    errorInput.classList.remove(this._inputErrorClass);
  };

  _checkValidInput(inputElement, formElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement.validationMessage, inputElement);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  };

  _isFormInvalid(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._isFormInvalid(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidInput(inputElement, formElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    });
  };


  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListener(formElement);
    });
  };
}

export default FormValidator;
