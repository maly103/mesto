class Card {
  constructor(data, cardSelector, modalImage) {
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._image = data.link;
    this._modalImage = modalImage;

  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .children[0];
    this._element = cardTemplate.cloneNode(true);
    this._cardImg = this._element.querySelector('.elements__img');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardLike = this._element.querySelector('.elements__heart');
    this._cardTrash = this._element.querySelector('.elements__trash');
  }

  _setEventListener() {
    this._cardImg.addEventListener('click', () => {
      this._modalImage(this._image, this._title);
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
