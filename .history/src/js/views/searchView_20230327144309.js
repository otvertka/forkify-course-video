class SearchView {
  #parentEl = document.querySelector('.search'); // Этот класс ничего не отображает, только получает запрос и нажатие на кнопку поиска

  getQuery() {
    return this.#parentEl.querySelector('.search__field').value;
  }

  clearInput() {
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
