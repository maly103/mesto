class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(errorElement, errorMessage, errorInput) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    errorInput.classList.add(this._inputErrorClass);
  }

  _hideInputError(errorElement, errorInput) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    errorInput.classList.remove(this._inputErrorClass);
  }

  _checkValidInput(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    if (!inputElement.validity.valid) {
      this._showInputError(
        errorElement,
        inputElement.validationMessage,
        inputElement
      );
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  _isFormInvalid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(buttonElement) {
    if (this._isFormInvalid()) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListener() {
    // this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidInput(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  hideErrorsValidation() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );
      this._hideInputError(errorElement, inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}

export default FormValidator;
