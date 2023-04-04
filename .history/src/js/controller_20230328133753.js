import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'; // полифил async/await в старых браузерах
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept(); // из parcel
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // получаем хэш нужного рецепта, начиная с 1го символа (после #....)
    // console.log(id);

    if (!id) return; // Предохранитель: если нет id
    recipeView.renderSpinner(); // Крутилка загрузки

    // 1) Loading recipe
    await model.loadRecipe(id); // Асинхронная функция, возвращает Промис. Поэтому должны подождать этот промис. Эта функция ничего не возвращает, поэтому не нужно записывать результат в переменную

    // Rendering recipe
    recipeView.render(model.state.recipe); // (model.state.recipe)- данные полученные из шага 1 и передаём в метод render(), который берёт эти данные и записывает их в this.#data в файле recipeView.js, и потом мы можем везде использовать эти данные внутри этого объекта
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
// showRecipe();

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    // 1) Получаем Запрос на поиск
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Загружаем Результаты поиска
    await model.loadSearchResults(query);

    // 3) Отображаем Результаты поиска
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(4)); // результаты слева по 10 шт на стр.(по умолч с 1й страницы)

    // 4) Отобразить начальные кнопки страниц
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  console.log(goToPage);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes); // Publisher subscriber pattern – это шаблон, который позволяет нам создавать модули, которые могут взаимодействовать друг с другом без прямой зависимости друг от друга.
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
