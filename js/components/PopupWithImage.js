import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(link, name) {
        const modalImage = this._popup.querySelector('.popup__image');
        const modalText = this._popup.querySelector('.popup__text-image');
        modalImage.src = link;
        modalImage.alt = name;
        modalText.textContent = name;
        super.open();
        super.setEventListeners();
    }

}