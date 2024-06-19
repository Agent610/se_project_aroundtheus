import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._form = this._popupElement.querySelector('.modal__form');
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._handleFormSubmit = handleFormSubmit;
        }

        _getInputValues() {
            this._inputList = this._modalElement.querySelector(".modal__input");
            this._formValues = {};
            this._inputList.forEach(
                (input) => (this._formValues[input.name] = input.value)
            );
            return this._formValues
        }

        setEventListeners() {
            this._popupElement.addEventListener("submit", (evt) => {
                this._handleFormSubmit(this._getInputValues());
                evt.preventDefault();
            });
        }

    open(){
        super.open();
    }    

    close() {
        this._popupForm.reset()
        super.close();        
    }
}

export default PopupWithForm;
