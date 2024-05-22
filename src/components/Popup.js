class Popup {
    constructor ({popupSelector}) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose(this);
    }

    open() {
       this._modalElement.classList.add('modal_opened');
       document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._modalElement.classList.remove('modal_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handlEscClose(evt) {

        if (evt.which === ESCAPE_KEYCODE) {
            this._close();
        }
    }

    setEventListeners() {
        this._modalElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("modal") || evt.target.classList.contains('modal__close')) {
                this.close();
            }
        });
    }
}

export default Popup