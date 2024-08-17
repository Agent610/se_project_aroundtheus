class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      console.log(this._renderer(item));
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    console.log(123);
    console.log(element);
    this._container.prepend(element);
  }
}

export default Section;
