class Card {
  constructor(
    {
      item,
      handleCardClick,
      handleCardDelete,
      handleCardLike,
      handleCardDislike,
    },
    cardsSelector,
    cardSelector,
    id
  ) {
    this._cardsSelector = cardsSelector;
    this._cardSelector = cardSelector;
    this._title = item.name;
    this._image = item.link;
    this._like = item.like;
    this._idCard = item.idCard;
    this._owner = id;
    this._userId = item.idUser;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardDislike = handleCardDislike;
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._cardsSelector)
      .content.querySelector(this._cardSelector);
    this._element = this._cardTemplate.cloneNode(true);
    this._cardImg = this._element.querySelector(".elements__img");
    this._cardTitle = this._element.querySelector(".elements__title");
    this._cardLike = this._element.querySelector(".elements__heart");
    this._cardLikeCol = this._element.querySelector(".elements__col");
    this._cardTrash = this._element.querySelector(".elements__trash");
    this._cardTrash.hidden = true;
  }

  _getTemplateOwner() {
    this._cardTrash.hidden = false;
  }

  _setEventListener() {
    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });
    this._cardLike.addEventListener("click", () => {
      if (this._cardLike.classList.contains("elements__heart_liked")) {
        this._handleCardDislike(this._idCard, this._cardLike);
      } else {
        this._handleCardLike(this._idCard, this._cardLike);
      }
    });
  }

  _setEventListenerOwner() {
    this._cardTrash.addEventListener("click", () => {
      this._handleCardDelete(this._element, this._idCard);
    });
  }

  getLikeCard(likes) {
    this._cardLikeCol.textContent = likes;
  }

  generateCard() {
    this._getTemplate();
    this._setEventListener();
    if (this._owner == this._userId) {
      this._getTemplateOwner();
      this._setEventListenerOwner();
    }
    this._cardImg.src = this._image;
    this._cardImg.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._cardLikeCol.textContent = this._like;
    return this._element;
  }
}

export default Card;
