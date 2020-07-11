let blockPopup = document.querySelector('.popup');
let buttonEdit=document.querySelector('.profile__edit');
let buttonClose=document.querySelector('.popup__close');

let profileTitle=document.querySelector('.profile__title');
let profileSubtitle=document.querySelector('.profile__subtitle');

let nameInput=document.querySelector('.popup__text[name=prof-title]');
let jobInput=document.querySelector('.popup__text[name=prof-subtitle]');

let formElement = document.querySelector('.popup__container')

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent=nameInput.value;
  profileSubtitle.textContent=jobInput.value;
  showHidePopup();
}


function showHidePopup(){
    if(blockPopup.classList.contains('popup_opened')){
        blockPopup.classList.remove('popup_opened');
    }else{
        nameInput.value=profileTitle.textContent;
        jobInput.value=profileSubtitle.textContent;
        blockPopup.classList.add('popup_opened');
    }

}


buttonEdit.addEventListener('click',showHidePopup);
buttonClose.addEventListener('click',showHidePopup);
formElement.addEventListener('submit', formSubmitHandler);
