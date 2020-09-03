import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {
        formSubmitHandler
    }) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
    }

    submitForm() {
        const formElement = this._popup.querySelector('.popup__container');
        formElement.addEventListener('submit', this._formSubmitHandler);
    }
}