import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // from public API
    const markup = this._generateMarkup();

    if (!render) return markup; // вернуть markup, который был только что сгенерирован

    this._clear(); // перед тем, как любой HTML элемент будет вставлен на страницу, родительский элемент будет очищен этим методом
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // обновляем данные без перерисовки всей страницы
  update(data) {
    this._data = data; // from public API
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(
      Array.from(this._parentElement.querySelectorAll('*'))
    );

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl)); // Node.isEqualNode() проверяет, равны ли два узла.

      // Updates changed TEXT
      // сравниваем текущее количество персон с новым. И если значение текущ. узла не пустое.
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🍄', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      // берём новое значение атрибута и присваиваем текущему атрибута
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    // console.log(this._parentElement);
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Error Message
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Success Message
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
