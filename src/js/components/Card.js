class Card {
  constructor({
    item,
    handleCardClick
  }, cardsSelector, cardSelector) {
    this._cardsSelector = cardsSelector;
    this._cardSelector = cardSelector;
    this._title = item.name;
    this._image = item.link;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardsSelector)
      .content
      .querySelector(this._cardSelector);
    this._element = cardTemplate.cloneNode(true);
    this._cardImg = this._element.querySelector('.elements__img');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardLike = this._element.querySelector('.elements__heart');
    this._cardTrash = this._element.querySelector('.elements__trash');
  }

  _setEventListener() {
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._image, this._title);
    });
    this._cardLike.addEventListener('click', () => {
      this._handlerLikeIcon();
    });
    this._cardTrash.addEventListener('click', () => {
      this._cardDelete();
    })
  };

  _handlerLikeIcon() {
    this._cardLike.classList.toggle('elements__heart_liked');
  };

  _cardDelete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._getTemplate();
    this._setEventListener();

    this._cardImg.src = this._image;
    this._cardImg.alt = this._title;
    this._cardTitle.textContent = this._title;
    return this._element;
  }
}

export default Card;