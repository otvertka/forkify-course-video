import View from './View.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _generateMarkup() {}
}

export default new addRecipeView();
