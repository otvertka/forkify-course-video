import View from './View.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // узнаём количество страниц(массив/кол-во рецептов на странице)
    console.log(numPages);
    // Страница 1, и есть следующие стр.
    if (curPage === 1 && numPages > 1) {
      return 'page 1, others';
    }
    // ПОСЛЕДНЯЯ страница
    if (curPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    }
    // Остальные страницы
    if (curPage < numPages) {
      return 'other pages';
    }
    // Страница 1, и НЕТ других страниц
    return 'page 1 , and NO others';
  }
}

export default new PaginationView();
