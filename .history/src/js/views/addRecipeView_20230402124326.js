import View from './View.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Рецепт удачно загружен :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // все поля со всеми значениями
      const data = Object.fromEntries(dataArr); //  преобразует список пар ключ-значение в объект.
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
