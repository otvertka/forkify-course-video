class SearchView {
  #parentEl = document.querySelector('.search'); // Этот класс ничего не отображает, только получает запрос и нажатие на кнопку поиска

  getQuery() {
    return this.#parentEl.querySelector('.search__field').value;
  }
}

export default new SearchView();
