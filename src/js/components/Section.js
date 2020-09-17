export default class Section {
  constructor({ id, items, renderer }, containerSelector) {
    this._items = items;
    this._idOwner = id;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(direction) {
    this._items.forEach((item) => {
      const cardElement = this._renderer(this._idOwner, item);
      this.addItem(cardElement, direction);
    });
  }

  addItem(element, direction) {
    if (direction) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
