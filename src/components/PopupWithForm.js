import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._handleFormSubmit = handleFormSubmit;
        }

        _getInputValues() {
            this._inputList = this._modalElement.querySelector(".modal__form");
            this._formValues = {};
            this._inputList.forEach(
                (input) => (this._formValues(input.name) = input.value)
            );

            return this._formValues
        }

        setEventListeners() {
            evt.preventDefault();
            this._modalElement.addEventListener('submit', (evt) => {
                if (evt.target.classList.contains("modal") || evt.target.classList.contains('modal__form')) {
                }
            });
        }

    close() {
        this._popupForm.reset()
        super.close();
    }
}

export default PopupWithForm;
