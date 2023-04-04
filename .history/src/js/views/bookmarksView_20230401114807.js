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
  // 3) Однако, PreviewView.js самостоятельно попытается отобразить какой-то markup, но это не сработает, поэтому мы должны изменить метод render(добавить 2-й параметр render=true )
  // 4) Мы не используем здесь всю функцию previewView._generateMarkup() а только previewView.render,
  //  потому что нам нужно установить в View.js свойство this._data = data; Чтобы потом в PreviewView.js мы можем использовать this._data
  // 5) Поэтому здесь мы хотим render их и установить параметр render = false
  _generateMarkup() {
    console.log(this._data); // model.state.search.results
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
