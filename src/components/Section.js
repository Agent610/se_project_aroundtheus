class section {
    constructor({renderer}, items) {
        this._renderer = renderer;
        this._items = document.querySelector(`${itemSelector}`);
    }

    renderItems(item) {
        item.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.appened(element);
    }
}

export default section