import Card from "./components/Card.js";
import data from "./config.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import "../pages/index.css";
import PopupWithSubmit from "./components/PopupWithSubmit.js";
import Api from "./components/Api.js";

//class popup
const popupEdit = new Popup(".popup_type_edit");
const popupAdd = new Popup(".popup_type_new");
const popupImage = new PopupWithImage(".popup_type_image");
const popupSubmit = new PopupWithSubmit(".popup_type_submit");

//api
const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-15/",
  "4067a4e9-5097-4e1c-8918-5df0a6c984ef"
);
//block popup
const blockPopupEdit = document.querySelector(".popup_type_edit");
const blockPopupAdd = document.querySelector(".popup_type_new");
const blockPopupAvatar = document.querySelector(".popup_type_avatar");

//buttons
const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__add");

//data profile
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const imgAvatar = document.querySelector(".profile__avatar");
const wrapperAvatar = document.querySelector(".profile__wrapper-avatar");

//data popup
const mestoInput = blockPopupAdd.querySelector(".popup__text[name=mesto]");
const mestoSrcInput = blockPopupAdd.querySelector(
  ".popup__text[name=mesto-url]"
);
const nameInput = blockPopupEdit.querySelector(".popup__text[name=prof-title]");
const jobInput = blockPopupEdit.querySelector(
  ".popup__text[name=prof-subtitle]"
);
const avatarInput = blockPopupAvatar.querySelector(
  ".popup__text[name=avatar-url]"
);

//modal forms
const formElementEdit = blockPopupEdit.querySelector(".popup__container");
const formElementAdd = blockPopupAdd.querySelector(".popup__container");
const formElementAvatar = blockPopupAvatar.querySelector(".popup__container");

function setProfile(name, job, avatar) {
  profileTitle.textContent = name;
  profileSubtitle.textContent = job;
  imgAvatar.src = avatar;
}

function setAvatar(link) {
  imgAvatar.src = link;
}

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

function addElement(arr, direction) {
  api.getUserData("users/me").then((dataUserProfile) => {
    const cardsList = new Section(
      {
        id: dataUserProfile._id,
        items: arr,
        renderer: renderCard,
      },
      ".elements"
    );
    cardsList.renderItems(direction);
  });
}

api.getAllData().then((data) => {
  const [dataAllCards, dataUserProfile] = data;
  setProfile(
    dataUserProfile.name,
    dataUserProfile.about,
    dataUserProfile.avatar
  );
  addElement(
    dataAllCards.map((item) => ({
      idCard: item._id,
      name: item.name,
      link: item.link,
      like: item.likes.length,
      idUser: item.owner._id,
    })),
    true
  );
});

function renderCard(idOwner, item) {
  const card = new Card(
    {
      item,
      handleCardClick: (link, name) => {
        popupImage.open(link, name);
      },
      handleCardDelete: (card, idCard) => {
        popupSubmit.setSubmitAction(() => {
          api
            .deleteCard(`cards/${idCard}`)
            .then(() => {
              card.remove();
            })
            .finally(popupSubmit.close());
        });
      },
      handleCardLike: (idCard, elementLike, colLike) => {
        api.likeCard(`cards/likes/${idCard}`).then((likeCard) => {
          elementLike.classList.add("elements__heart_liked");
          colLike.textContent = likeCard.likes.length;
        });
      },
      handleCardDislike: (idCard, elementLike, colLike) => {
        api.dislikeCard(`cards/likes/${idCard}`).then((likeCard) => {
          elementLike.classList.remove("elements__heart_liked");
          colLike.textContent = likeCard.likes.length;
        });
      },
    },
    ".elements__card",
    ".elements__item",
    idOwner
  );
  return card.generateCard();
}

const popupFormEdit = new PopupWithForm(".popup_type_edit", {
  formSubmitHandler: (evt) => {
    evt.preventDefault();
    const buttonSend = formElementEdit.querySelector(".popup__send");
    renderLoading(true, buttonSend);
    api
      .setUserData("users/me", nameInput.value, jobInput.value)
      .then((res) => {
        setProfile(res.name, res.about, res.avatar);
      })
      .finally(() => {
        renderLoading(false, buttonSend);
        popupFormEdit.close();
      });
  },
});

const popupFormAvatar = new PopupWithForm(".popup_type_avatar", {
  formSubmitHandler: (evt) => {
    evt.preventDefault();
    const buttonSend = formElementAvatar.querySelector(".popup__send");
    renderLoading(true, buttonSend);

    api
      .setUserAvatar("users/me/avatar", avatarInput.value)
      .then((res) => {
        imgAvatar.src = res.avatar;
      })
      .finally(() => {
        renderLoading(false, buttonSend);
        popupFormAvatar.close();
      });
  },
});

const popupFormAdd = new PopupWithForm(".popup_type_new", {
  formSubmitHandler: (evt) => {
    evt.preventDefault();
    api
      .addCard("cards", mestoInput.value, mestoSrcInput.value)
      .then((dataCard) => {
        addElement(
          [
            {
              idCard: dataCard._id,
              name: dataCard.name,
              link: dataCard.link,
              like: dataCard.likes.length,
              idUser: dataCard.owner._id,
            },
          ],
          false
        );
      })
      .finally(() => {
        popupAdd.close();
        evt.target.reset();
      });
  },
});

popupFormEdit.submitForm();
popupFormAdd.submitForm();
popupFormAvatar.submitForm();

// objects FormValidator
const editFormValidator = new FormValidator(data, formElementEdit);
const addFormValidator = new FormValidator(data, formElementAdd);
const avatarFormValidator = new FormValidator(data, formElementAvatar);

wrapperAvatar.addEventListener("click", () => {
  api.getUserData("users/me").then((user) => {
    avatarInput.value = user.avatar;
    avatarFormValidator.hideErrorsValidation();
    avatarFormValidator.enableValidation();
    popupFormAvatar.open();
    popupFormAvatar.setEventListeners();
  });
});

// buttons events
buttonEdit.addEventListener("click", () => {
  api.getUserData("users/me").then((user) => {
    nameInput.value = user.name;
    jobInput.value = user.about;
    editFormValidator.hideErrorsValidation();
    editFormValidator.enableValidation();
    popupFormEdit.open();
    popupFormEdit.setEventListeners();
  });
});

buttonAdd.addEventListener("click", () => {
  formElementAdd.reset();
  addFormValidator.hideErrorsValidation();
  addFormValidator.enableValidation();
  popupFormAdd.open();
  popupFormAdd.setEventListeners();
});
