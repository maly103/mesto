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

   nameInput = document.querySelector('.popup__text[name=prof-title]').value;
   jobInput = document.querySelector('.popup__text[name=prof-subtitle]').value;

  if(nameInput!=profileTitle.textContent && nameInput.value!=''){
    profileTitle.textContent=nameInput;
  }

  if(jobInput!=profileSubtitle.textContent && jobInput!=''){
    profileSubtitle.textContent=jobInput;
  }
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
