import View from './View.js';
import icons from 'url:../../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2

class ResultView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data); // model.state.search.results
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    return `
    <li class="preview">
        <a class="preview__link " href="${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            
        </div>
        </a>
    </li>
    `;
  }
}

export default new ResultView();
