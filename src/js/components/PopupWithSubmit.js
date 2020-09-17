import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
    this.open();
  }

  open() {
    const formElement = this._popup.querySelector(".popup__container");
    formElement.addEventListener("submit", this._handleSubmitCallback);
    super.open();
    super.setEventListeners();
  }
}
