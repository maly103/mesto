import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalImage = this._popup.querySelector(".popup__image");
    this._modalText = this._popup.querySelector(".popup__text-image");
  }
  open(link, name) {
    this._modalImage.src = link;
    this._modalImage.alt = name;
    this._modalText.textContent = name;
    super.open();
    super.setEventListeners();
  }
}
