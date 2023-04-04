class SearchView {
  #parentEl = document.querySelector('.search'); // Этот класс ничего не отображает, только получает запрос и нажатие на кнопку поиска

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value; // считываем из инпута поиска
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // controlSearchResults()
    });
  }
}

export default new SearchView();
