class section {
    constructor({renderer}, items, containerSelector) {
        this._renderer = renderer;
        this._items = items;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(items => {
            this._renderer(items);
        });
    }

    addItem(element) {
        this._element.document.querySelector(element);
    }

}

export default section