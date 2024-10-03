import Popup from "./Popup.js";
class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmDelete) {
    super({ popupSelector });
    this._popupButton = this._popupElement.querySelector(".modal__button");
    this._handleConfirmDelete = handleConfirmDelete;
    this._card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", (evt) => {
      this._handleConfirmDelete(this._card);
    });
  }

  open(card) {
    super.open();
    this._card = card;
  }
}
export default PopupWithConfirm;
