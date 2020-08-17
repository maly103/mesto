import Card from './Card.js';
import data from './config.js';
import FormValidator from './FormValidator.js';

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//data document
const cards = document.querySelector('.elements');

//popup
const blockPopupEdit = document.querySelector('.popup_type_edit');
const blockPopupAdd = document.querySelector('.popup_type_new');
const blockPopupImage = document.querySelector('.popup_type_image');

//data profile
const buttonEdit = document.querySelector('.profile__edit');
const buttonAdd = document.querySelector('.profile__add');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const mestoInput = blockPopupAdd.querySelector('.popup__text[name=mesto]');
const mestoSrcInput = blockPopupAdd.querySelector('.popup__text[name=mesto-url]');


//data popup
const nameInput = blockPopupEdit.querySelector('.popup__text[name=prof-title]');
const jobInput = blockPopupEdit.querySelector('.popup__text[name=prof-subtitle]');
const modalImage = blockPopupImage.querySelector('.popup__image');
const modalText = blockPopupImage.querySelector('.popup__text-image');

//modal forms
const formElementEdit = blockPopupEdit.querySelector('.popup__container');
const formElementAdd = blockPopupAdd.querySelector('.popup__container');


function showPopup(blockPopup) {
  (new FormValidator(data, blockPopup.querySelector('.popup__container'))).enableValidation();
  blockPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function hidePopup(blockPopup) {
  blockPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);

}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    hidePopup(evt.currentTarget.querySelector('.popup_opened'));
  }
}

const openPopupImage = (cardImg, cardTitle) => {

  modalImage.src = cardImg;
  modalImage.alt = cardTitle;
  modalText.textContent = cardTitle;
  showPopup(blockPopupImage);
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  renderCards([{
    name: mestoInput.value,
    link: mestoSrcInput.value
  }]);
  hidePopup(blockPopupAdd);
  evt.target.reset();
}

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  hidePopup(blockPopupEdit);
}

// buttons
buttonEdit.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  showPopup(blockPopupEdit);
});

buttonAdd.addEventListener('click', () => {
  showPopup(blockPopupAdd);
});

const popupsClose = () => {
  const sectionsPopup = Array.from(document.querySelectorAll('.popup'));
  sectionsPopup.forEach((sectionElement) => {
    sectionElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        hidePopup(sectionElement);
      }
    });
  });
}

function addCard(item) {
  cards.prepend(item);
}

function renderCards(data) {
  data.forEach((item) => {
    addCard(
      (new Card(item,
        '.elements__card',
        openPopupImage)).generateCard()
    );
  })
}


popupsClose();

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);



renderCards(initialCards);
