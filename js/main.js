let blockPopup = document.querySelector('.popup');
let buttonEdit=document.querySelector('.profile__edit');
let buttonClose=document.querySelector('.popup__close');


let profileTitle=document.querySelector('.profile__title');
let profileSubtitle=document.querySelector('.profile__subtitle');

let popupText = document.querySelectorAll('.popup__text');

popupText[0].value=profileTitle.textContent;
popupText[1].value=profileSubtitle.textContent;

let formElement = document.querySelector('.popup__container')

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelectorAll('.popup__text')[0].value;
  let jobInput = document.querySelectorAll('.popup__text')[1].value;

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
        blockPopup.classList.add('popup_opened');
    }

}


buttonEdit.addEventListener('click',showHidePopup);
buttonClose.addEventListener('click',showHidePopup);
formElement.addEventListener('submit', formSubmitHandler);
