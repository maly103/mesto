import Card from "../js/components/Card.js";
import { data, renderLoading, renderError } from "../js/utils/config.js";
import FormValidator from "../js/components/FormValidator.js";
import Section from "../js/components/Section.js";
import Popup from "../js/components/Popup.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import PopupWithForm from "../js/components/PopupWithForm.js";
import "../pages/index.css";
import PopupWithSubmit from "../js/components/PopupWithSubmit.js";
import Api from "../js/components/Api.js";
import Userinfo from "../js/components/UserInfo";

//class popup
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

//class User

const user = new Userinfo(profileTitle, profileSubtitle, imgAvatar);

//data popup
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

function addElement(arr, direction) {
  api
    .getUserData("users/me")
    .then((dataUserProfile) => {
      const cardsList = new Section(
        {
          id: dataUserProfile._id,
          items: arr,
          renderer: renderCard,
        },
        ".elements"
      );
      cardsList.renderItems(direction);
    })
    .catch((error) => {
      renderError(error);
    });
}

api
  .getAllData()
  .then((data) => {
    const [dataAllCards, dataUserProfile] = data;
    user.setUserInfo(
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
  })
  .catch((error) => {
    renderError(error);
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
              popupSubmit.close();
            })
            .catch((error) => {
              renderError(error);
            });
        });
      },
      handleCardLike: (idCard, elementLike) => {
        api
          .likeCard(`cards/likes/${idCard}`)
          .then((likeCard) => {
            elementLike.classList.add("elements__heart_liked");
            card.getLikeCard(likeCard.likes.length);
          })
          .catch((error) => {
            renderError(error);
          });
      },
      handleCardDislike: (idCard, elementLike) => {
        api
          .dislikeCard(`cards/likes/${idCard}`)
          .then((likeCard) => {
            elementLike.classList.remove("elements__heart_liked");
            card.getLikeCard(likeCard.likes.length);
          })
          .catch((error) => {
            renderError(error);
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
  formSubmitHandler: (data) => {
    const buttonSend = formElementEdit.querySelector(".popup__send");
    renderLoading(true, buttonSend);

    api
      .setUserData("users/me", data["prof-title"], data["prof-subtitle"])
      .then((res) => {
        user.setUserInfo(res.name, res.about, res.avatar);
        popupFormEdit.close();
      })
      .catch((error) => {
        renderError(error);
      })
      .finally(() => {
        renderLoading(false, buttonSend);
      });
  },
});

const popupFormAvatar = new PopupWithForm(".popup_type_avatar", {
  formSubmitHandler: (data) => {
    const buttonSend = formElementAvatar.querySelector(".popup__send");
    renderLoading(true, buttonSend);

    api
      .setUserAvatar("users/me/avatar", data["avatar-url"])
      .then((res) => {
        imgAvatar.src = res.avatar;
        popupFormAvatar.close();
      })
      .catch((error) => {
        renderError(error);
      })
      .finally(() => {
        renderLoading(false, buttonSend);
      });
  },
});

const popupFormAdd = new PopupWithForm(".popup_type_new", {
  formSubmitHandler: (data) => {
    api
      .addCard("cards", data["mesto"], data["mesto-url"])
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
        popupFormAdd.close();
      })
      .catch((error) => {
        renderError(error);
      });
  },
});

// objects FormValidator

const addFormValidator = new FormValidator(data, formElementAdd);
const avatarFormValidator = new FormValidator(data, formElementAvatar);
const editFormValidator = new FormValidator(data, formElementEdit);

wrapperAvatar.addEventListener("click", () => {
  api
    .getUserData("users/me")
    .then((user) => {
      avatarInput.value = user.avatar;
      avatarFormValidator.hideErrorsValidation();
      avatarFormValidator.enableValidation();
      popupFormAvatar.open();
      popupFormAvatar.setEventListeners();
    })
    .catch((error) => {
      renderError(error);
    });
});

// buttons events
buttonEdit.addEventListener("click", () => {
  api
    .getUserData("users/me")
    .then((user) => {
      nameInput.value = user.name;
      jobInput.value = user.about;
      editFormValidator.hideErrorsValidation();
      editFormValidator.enableValidation();
      popupFormEdit.open();
      popupFormEdit.setEventListeners();
    })
    .catch((error) => {
      renderError(error);
    });
});

buttonAdd.addEventListener("click", () => {
  addFormValidator.hideErrorsValidation();
  addFormValidator.enableValidation();
  popupFormAdd.open();
  popupFormAdd.setEventListeners();
});
