export const data = {
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__send",
  inactiveButtonClass: "popup__send_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__text-error_active",
};

export function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

export function renderError(err) {
  console.log(err);
}

export default { data, renderLoading, renderError };
