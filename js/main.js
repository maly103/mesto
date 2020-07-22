
//popup
const blockPopupEdit=document.querySelector('.popup_type_edit');
const blockPopupAdd=document.querySelector('.popup_type_new');
const blockPopupImage=document.querySelector('.popup_type_image');

//data profile
const buttonEdit=document.querySelector('.profile__edit');
const buttonAdd=document.querySelector('.profile__add');
let profileTitle=document.querySelector('.profile__title');
let profileSubtitle=document.querySelector('.profile__subtitle');


//data popup
const buttonPopupEditClose=blockPopupEdit.querySelector('.popup__close');
const buttonPopupAddClose=blockPopupAdd.querySelector('.popup__close');
const buttonPopupImageClose=blockPopupImage.querySelector('.popup__close');
let nameInput=blockPopupEdit.querySelector('.popup__text[name=prof-title]');
let jobInput=blockPopupEdit.querySelector('.popup__text[name=prof-subtitle]');
let modalImage=blockPopupImage.querySelector('.popup__image');
let modalText=blockPopupImage.querySelector('.popup__text-image');

//modal forms 
const formElementEdit = blockPopupEdit.querySelector('.popup__container');
const formElementAdd = blockPopupAdd.querySelector('.popup__container');


function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    let mestoInput=blockPopupAdd.querySelector('.popup__text[name=mesto]').value;
    let mestoSrcInput=blockPopupAdd.querySelector('.popup__text[name=mesto-url]').value;
    createCard({name:mestoInput,link:mestoSrcInput});
    showHidePopup(blockPopupAdd);
  }

  function formSubmitHandlerEdit (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    showHidePopup(blockPopupEdit);
  }


function showHidePopup(blockPopup){
    if(!blockPopup.classList.contains('popup_opened')){
         nameInput.value=profileTitle.textContent;
        jobInput.value=profileSubtitle.textContent;
    }
      blockPopup.classList.toggle('popup_opened');
}

// buttons
buttonEdit.addEventListener('click',()=>{
   showHidePopup(blockPopupEdit); 
});

buttonAdd.addEventListener('click',()=>{
    showHidePopup(blockPopupAdd); 
 });

buttonPopupEditClose.addEventListener('click',()=>{
    showHidePopup(blockPopupEdit); 
});

buttonPopupAddClose.addEventListener('click',()=>{
    showHidePopup(blockPopupAdd); 
});

buttonPopupImageClose.addEventListener('click',()=>{
  showHidePopup(blockPopupImage); 
});

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);


