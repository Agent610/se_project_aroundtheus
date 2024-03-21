class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._errorClass = settings._errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl, errorMessageElement) {
    //const errorMessageElement = this._form.querySelector(
    `#${inputEl.id}-error`;
    //);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputEl.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _toggleButtonState(inputEls, submitButton, { _inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity() {}
  _setEventListeners() {
    this._inputEls = [this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, options);
        toggleButtonState(inputEl, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  }
}

//const editFormValidator = new FormValidator(settings, editForm);
//const addFormValidator = new FormValidator(settings, addForm);

export default FormValidator;
