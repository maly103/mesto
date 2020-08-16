class FormValidator {
  constructor(data, formElement) {
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement
  }

  _showInputError(errorElement, errorMessage) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    this._formElement.classList.add(this._inputErrorClass);
  };

  _hideInputError(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    this._formElement.classList.remove(this._inputErrorClass);
  };

  _checkValidInput(formItem) {
    const errorElement = formItem.querySelector(`#${this._formElement.name}-error`);
    if (!this._formElement.validity.valid) {
      this._showInputError(errorElement, this._formElement.validationMessage);
    } else {
      this._hideInputError(errorElement);
    }
  };


  _toggleButtonState(buttonElement) {
    if (!this._formElement.validity.valid) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListener(formItem) {
    const buttonElement = formItem.querySelector(this._submitButtonSelector);
    this._toggleButtonState(buttonElement);
    this._formElement.addEventListener('input', () => {
      this._checkValidInput(formItem);
      this._toggleButtonState(buttonElement);
    });
  };


  enableValidation() {
    const formItem = this._formElement.parentElement;
    formItem.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListener(formItem);
  }
}

export default FormValidator;
