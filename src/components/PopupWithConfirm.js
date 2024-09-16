import Popup from "./Popup.js";
class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmDelete) {
    super({ popupSelector });
    this._popupButton = this._popupElement.querySelector(".modal__button");
    this._handleConfirmDelete = handleConfirmDelete;
  }

  setEventListeners() {
    this._popupButton.addEventListener("click", (evt) => {
      this._handleConfirmDelete(cardID);
    });
  }
  //}
  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
export default PopupWithConfirm;
