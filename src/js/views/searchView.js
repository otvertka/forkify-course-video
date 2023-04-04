class SearchView {
  _parentEl = document.querySelector('.search'); // Этот класс ничего не отображает, только получает запрос и нажатие на кнопку поиска

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value; // считываем из инпута поиска
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // controlSearchResults()
    });
  }
}

export default new SearchView();
