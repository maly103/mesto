export default class Api {
  constructor(url, id) {
    this._url = url;
    this._id = id;
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  }

  getAllCards(text) {
    return fetch(`${this._url}${text}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: this._id,
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  getUserData(text) {
    return fetch(`${this._url}${text}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: this._id,
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  getAllData() {
    return Promise.all([
      this.getAllCards("cards"),
      this.getUserData("users/me"),
    ]);
  }

  setUserData(text, nameUser, aboutUser) {
    return fetch(`${this._url}${text}`, {
      method: "PATCH",
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameUser,
        about: aboutUser,
      }),
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  setUserAvatar(text, link) {
    return fetch(`${this._url}${text}`, {
      method: "PATCH",
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  addCard(text, nameCard, linkCard) {
    return fetch(`${this._url}${text}`, {
      method: "POST",
      headers: {
        authorization: this._id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameCard,
        link: linkCard,
      }),
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  deleteCard(text) {
    return fetch(`${this._url}${text}`, {
      method: "DELETE",
      headers: {
        authorization: this._id,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  likeCard(text) {
    return fetch(`${this._url}${text}`, {
      method: "PUT",
      headers: {
        authorization: this._id,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  dislikeCard(text) {
    return fetch(`${this._url}${text}`, {
      method: "DELETE",
      headers: {
        authorization: this._id,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }
}
