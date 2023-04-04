import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  // 1)Когда вызывается ф-я render(data) (View.js) она устанавливается аргументом в BookmarksView и затем вызывается _generateMarkup() и получает доступ к this._data
  // 2) Затем проходим с помощью map по всем bookmark и render(отображаем) previewView. НАм нужно веруть строку из _generateMarkup,
  // чтобы потом в View.js эту строку можно было вставить этот markup в DOM в этой строке: this._parentElement.insertAdjacentHTML('afterbegin', markup)
  _generateMarkup() {
    console.log(this._data); // model.state.search.results
    return this._data.map(bookmark => previewView.render(bookmark)).join('');
  }
}
export default new BookmarksView();
