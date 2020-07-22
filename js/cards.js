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

const cardTemplate=document.querySelector('.elements__card').content;
const cards=document.querySelector('.elements');

function OpenPopupImage(cardImg, cardTitle){
    modalImage.src=cardImg.src;
    modalImage.alt=cardTitle.textContent;
    modalText.textContent=cardTitle.textContent;
    showHidePopup(blockPopupImage);
}



function cardLikeNoLike(el){
    el.classList.toggle('elements__heart_liked');
    }

function cardDelete(el){
    el.closest('.elements__item').remove();
    
};

function createCard(data){
    let cardElements=cardTemplate.cloneNode(true); 
    let cardImg=cardElements.querySelector('.elements__img');
    let cardTitle=cardElements.querySelector('.elements__title');
    const cardLike=cardElements.querySelector('.elements__heart');
    const cardTrash=cardElements.querySelector('.elements__trash');
    
    cardImg.src=data.link;
    cardImg.alt=data.name;
    cardTitle.textContent=data.name;

    cardImg.addEventListener('click',()=>{
        OpenPopupImage(cardImg, cardTitle);
    })

    cardLike.addEventListener('click',()=>{
        cardLikeNoLike(cardLike);
    })

    cardTrash.addEventListener('click',()=>{
        cardDelete(cardTrash);
    })
    cards.prepend(cardElements);
}

initialCards.forEach(elem=>{
    createCard(elem);
 })



