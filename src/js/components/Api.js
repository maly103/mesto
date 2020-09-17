export default class Api {
  constructor(url, id) {
    this._url = url;
    this._id = id;
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  renderError(err) {
    alert(`Ошибка: ${err}`);
  }

  getAllCards(text) {
    return fetch(`${this._url}${text}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: this._id,
      },
    })
      .then((res) => {
        return this.renderResult(res);
      })
      .catch((err) => {
        this.renderError(err);
      });
  }

  getUserData(text) {
    return fetch(`${this._url}${text}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: this._id,
      },
    })
      .then((res) => {
        return this.renderResult(res);
      })
      .catch((err) => {
        this.renderError(err);
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
    })
    .then((res) => {
      return this.renderResult(res);
    })
    .catch((err) => {
      this.renderError(err);
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
    })
      .then((res) => {
        return this.renderResult(res);
      })
      .catch((err) => {
        this.renderError(err);
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
    })
      .then((res) => {
        return this.renderResult(res);
      })
      .catch((err) => {
        this.renderError(err);
      });
  }

  deleteCard(text) {
    return fetch(`${this._url}${text}`, {
      method: "DELETE",
      headers: {
        authorization: this._id,
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      return this.renderResult(res);
    })
    .catch((err) => {
      this.renderError(err);
    });
  }

  likeCard(text) {
    return fetch(`${this._url}${text}`, {
      method: "PUT",
      headers: {
        authorization: this._id,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return this.renderResult(res);
      })
      .catch((err) => {
        this.renderError(err);
      });
  }

  dislikeCard(text) {
    return fetch(`${this._url}${text}`, {
      method: "DELETE",
      headers: {
        authorization: this._id,
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return this.renderResult(res);
      })
      .catch((err) => {
        this.renderError(err);
      });
  }
}
