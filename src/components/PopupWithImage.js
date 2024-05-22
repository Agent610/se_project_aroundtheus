import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    open ({name, link}) {
        this._modalElement.querySelector('#preview-modal-title').textContent = name;
        const image = this._modalElement.querySelector('#preview-modal-image');
        image.src = link;
        image.alt = name;
        super.open();
    }

    close() {
        this._popupForm.reset()
        super.close();
    }
}

export default PopupWithImage;