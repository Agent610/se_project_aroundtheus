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
    //);
    this._inputEls.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = this._inputEl.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _toggleButtonState(
    this_inputEl,
    this_submitButton,
    { _inactiveButtonClass }
  ) {
    if (hasInvalidInput(this._inputEl)) {
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

  _checkInputValidity() {
    if (!inputEl.validity.valid) {
      return showInputError(formEl, inputEl, options);
    }
    hideInputError(formEl, inputEl, options);
  }
  _setEventListeners() {
    this._inputEls = [this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, inputEl, options);
        this._toggleButtonState(inputEl, submitButton, options);
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
