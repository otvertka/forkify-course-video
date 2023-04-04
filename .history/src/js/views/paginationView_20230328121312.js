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
    if(this._data.page === 1 && numPages > 1)
    // Страница 1, и НЕТ других страниц
    // ПОСЛЕДНЯЯ страница
    // Остальные страницы
  }
}

export default new PaginationView();
