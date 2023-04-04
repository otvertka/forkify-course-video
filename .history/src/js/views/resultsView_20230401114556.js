import View from './View.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'Не найдены рецепты по Вашему запросу. Пожалуйста, попробуйте ещё :)';
  _message = '';

  _generateMarkup() {
    console.log(this._data); // model.state.search.results
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
