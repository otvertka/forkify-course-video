import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id); // Асинхронная функция, возвращает Промис. Поэтому должны подождать этот промис. Эта функция ничего не возвращает, поэтому не нужно записывать результат в переменную

    //3) Rendering recipe
    recipeView.render(model.state.recipe); // (model.state.recipe)- данные полученные из шага 1 и передаём в метод render(), который берёт эти данные и записывает их в this.#data в файле recipeView.js, и потом мы можем везде использовать эти данные внутри этого объекта
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
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
    resultsView.render(model.getSearchResultsPage()); // render переписывает всё своё содержимое и помещает новый контент на это место

    // 4) Отобразить начальные кнопки страниц
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  // 1) Отображаем НОВЫЕ Результаты поиска
  resultsView.render(model.getSearchResultsPage(goToPage)); // результаты слева по 10 шт на стр.(по умолч с 1й страницы)

  // 4) Отобразить НОВЫЕ начальные кнопки страниц
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Обновить рецепт порций (in state)
  model.updateServings(newServings);
  // Обновить recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Добавить/ удалить закладку
  // если рецепт не добавлен в закладки, то добавляем его
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // если рецепт уже добавлен , то удаляем его
  else model.deleteBookmark(model.state.recipe.id);
  //  2) Обновить отображение рецептов
  recipeView.update(model.state.recipe);

  // 3) Отобразить рецепты
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes); // Publisher subscriber pattern – это шаблон, который позволяет нам создавать модули, которые могут взаимодействовать друг с другом без прямой зависимости друг от друга.
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
