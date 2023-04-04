import View from './View.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    // Страница 1, и есть следующие стр.
    // Страница 1, и НЕТ других страниц
    // ПОСЛЕДНЯЯ страница
    // Остальные страницы
  }
}

export default new PaginationView();
