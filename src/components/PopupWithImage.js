import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    open ({link,name}) {
        this._modalElement.querySelector('.modal__caption').textContent = name;
        const image = this._modalElement.querySelector('.modal__image');
        image.src = link;
        image.alt = name;
        super.open();
    }
}

export default PopupWithImage;