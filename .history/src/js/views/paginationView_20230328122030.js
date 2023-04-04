import View from './View.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // узнаём количество страниц(массив/кол-во рецептов на странице)
    console.log(numPages);
    // Страница 1, и есть следующие стр.
    if (this._data.page === 1 && numPages > 1) {
      return 'page 1, others';
    }
    // ПОСЛЕДНЯЯ страница
    if (this._data.page === numPages && numPages > 1) {
      return ' last page';
    }
    // Остальные страницы
    if (this._data.page < numPages) {
      return 'other pages';
    }
    // Страница 1, и НЕТ других страниц
    return 'page 1 , and NO others';
  }
}

export default new PaginationView();
