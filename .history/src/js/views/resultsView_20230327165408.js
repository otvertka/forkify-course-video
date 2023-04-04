import View from './View.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data); // model.state.search.results
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    return `
    <li class="preview">
        <a class="preview__link preview__link--active" href="${result.id}">
        <figure class="preview__fig">
            <img src="src/img/test-1.jpg" alt="Test" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
            <p class="preview__publisher">The Pioneer Woman</p>
            <div class="preview__user-generated">
            <svg>
                <use href="src/img/icons.svg#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
    </li>
    `;
  }
}

export default new ResultView();
