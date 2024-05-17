class section {
    constructor({renderer}, items, containerSelector) {
        this._renderer = renderer;
        this._items = items;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(item) {
        item.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

}

export default section