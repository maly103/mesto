import Card from "./components/Card.js";
import data from "./config.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//popup
const popupEdit = new Popup(".popup_type_edit");
const popupAdd = new Popup(".popup_type_new");
const popupImage = new PopupWithImage(".popup_type_image");

const blockPopupEdit = document.querySelector(".popup_type_edit");
const blockPopupAdd = document.querySelector(".popup_type_new");

//buttons
const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__add");

//data profile
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const dataProfile = new UserInfo({
  profileTitle,
  profileSubtitle,
});

//data popup
const mestoInput = blockPopupAdd.querySelector(".popup__text[name=mesto]");
const mestoSrcInput = blockPopupAdd.querySelector(
  ".popup__text[name=mesto-url]"
);
const nameInput = blockPopupEdit.querySelector(".popup__text[name=prof-title]");
const jobInput = blockPopupEdit.querySelector(
  ".popup__text[name=prof-subtitle]"
);

//modal forms
const formElementEdit = blockPopupEdit.querySelector(".popup__container");
const formElementAdd = blockPopupAdd.querySelector(".popup__container");

function renderCard(item, direction) {
  const card = new Card(
    {
      item,
      handleCardClick: (link, name) => {
        popupImage.open(link, name);
      },
    },
    ".elements__card",
    ".elements__item"
  );
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement, direction);
}

const popupFormEdit = new PopupWithForm(".popup_type_edit", {
  formSubmitHandler: (evt) => {
    evt.preventDefault();
    dataProfile.setUserInfo(nameInput, jobInput);
    popupEdit.close();
  },
});

const popupFormAdd = new PopupWithForm(".popup_type_new", {
  formSubmitHandler: (evt) => {
    evt.preventDefault();
    renderCard(
      {
        name: mestoInput.value,
        link: mestoSrcInput.value,
      },
      false
    );
    popupAdd.close();
    evt.target.reset();
  },
});

popupFormEdit.submitForm();
popupFormAdd.submitForm();

// objects FormValidator
const editFormValidator = new FormValidator(data, formElementEdit);
const addFormValidator = new FormValidator(data, formElementAdd);

// buttons events
buttonEdit.addEventListener("click", () => {
  const infoProfile = dataProfile.getUserInfo();
  nameInput.value = infoProfile.name;
  jobInput.value = infoProfile.job;
  editFormValidator.hideErrorsValidation();
  editFormValidator.enableValidation();
  popupFormEdit.open();
  popupFormEdit.setEventListeners();
});

buttonAdd.addEventListener("click", () => {
  formElementAdd.reset();
  addFormValidator.hideErrorsValidation();
  addFormValidator.enableValidation();
  popupFormAdd.open();
  popupFormAdd.setEventListeners();
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".elements"
);

cardsList.renderItems(true);
