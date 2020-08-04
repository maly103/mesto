const initialCards = [
  {
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
const cards=document.querySelector('.elements');
const cardTemplate=document.querySelector('.elements__card').content;

//popup
const blockPopupEdit=document.querySelector('.popup_type_edit');
const blockPopupAdd=document.querySelector('.popup_type_new');
const blockPopupImage=document.querySelector('.popup_type_image');

//data profile
const buttonEdit=document.querySelector('.profile__edit');
const buttonAdd=document.querySelector('.profile__add');
const profileTitle=document.querySelector('.profile__title');
const profileSubtitle=document.querySelector('.profile__subtitle');


//data popup
const buttonPopupEditClose=blockPopupEdit.querySelector('.popup__close');
const buttonPopupAddClose=blockPopupAdd.querySelector('.popup__close');
const buttonPopupImageClose=blockPopupImage.querySelector('.popup__close');
const nameInput=blockPopupEdit.querySelector('.popup__text[name=prof-title]');
const jobInput=blockPopupEdit.querySelector('.popup__text[name=prof-subtitle]');
const modalImage=blockPopupImage.querySelector('.popup__image');
const modalText=blockPopupImage.querySelector('.popup__text-image');

//modal forms
const formElementEdit = blockPopupEdit.querySelector('.popup__container');
const formElementAdd = blockPopupAdd.querySelector('.popup__container');



function showPopup(blockPopup) {
  blockPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function hidePopup(blockPopup) {
  blockPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
    if (evt.key==='Escape') {
     hidePopup(evt.currentTarget.querySelector('.popup_opened'));
    }
};

function openPopupImage(cardImg, cardTitle) {
  modalImage.src=cardImg.src;
  modalImage.alt=cardTitle.textContent;
  modalText.textContent=cardTitle.textContent;
  showPopup(blockPopupImage);
};

function handlerlikeIcon(el) {
  el.classList.toggle('elements__heart_liked');
};

function cardDelete(el) {
  el.closest('.elements__item').remove();
};

function createCard(data) {
  const cardElements=cardTemplate.cloneNode(true);
  const cardImg=cardElements.querySelector('.elements__img');
  const cardTitle=cardElements.querySelector('.elements__title');
  const cardLike=cardElements.querySelector('.elements__heart');
  const cardTrash=cardElements.querySelector('.elements__trash');

  cardImg.src=data.link;
  cardImg.alt=data.name;
  cardTitle.textContent=data.name;

  cardImg.addEventListener('click', () => {
        openPopupImage(cardImg, cardTitle);
  })

  cardLike.addEventListener('click', () => {
      handlerlikeIcon(cardLike);
  })

  cardTrash.addEventListener('click', () => {
        cardDelete(cardTrash);
  })

  return cardElements;
};

function addCard(item) {
  cards.prepend(item);
};

function renderCards(data) {
  data.forEach((item) => {
    addCard(createCard(item));
  })
};

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();

  const mestoInput=blockPopupAdd.querySelector('.popup__text[name=mesto]').value;
  const mestoSrcInput=blockPopupAdd.querySelector('.popup__text[name=mesto-url]').value;

  addCard(createCard({name:mestoInput,link:mestoSrcInput}));
  showPopup(blockPopupAdd);
  
};

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();

  profileTitle.textContent=nameInput.value;
  profileSubtitle.textContent=jobInput.value;

  showPopup(blockPopupEdit);
};

// buttons
buttonEdit.addEventListener('click', () => {
  nameInput.value=profileTitle.textContent;
  jobInput.value=profileSubtitle.textContent;
  showPopup(blockPopupEdit);
});

buttonAdd.addEventListener('click', () => {
  showPopup(blockPopupAdd);
});

const popupsClose = () => {
  const sectionsPopup=Array.from(document.querySelectorAll('.popup'));
  sectionsPopup.forEach((sectionElement) => {
    sectionElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
          hidePopup(sectionElement);  
      };
    });
  });
}

popupsClose();

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

renderCards(initialCards);

