import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'; // полифил async/await в старых браузерах

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('TEST');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // получаем хэш нужного рецепта, начиная с 1го символа (после #....)
    console.log(id);

    if (!id) return; // Предохранитель: если нет id
    recipeView.renderSpinner(); // Крутилка загрузки

    // 1) Loading recipe
    await model.loadRecipe(id); // Асинхронная функция, возвращает Промис. Поэтому должны подождать этот промис. Эта функция ничего не возвращает, поэтому не нужно записывать результат в переменную

    // Rendering recipe
    recipeView.render(model.state.recipe); // (model.state.recipe)- данные полученные из шага 1 и передаём в метод render(), который берёт эти данные и записывает их в this.#data в файле recipeView.js, и потом мы можем везде использовать эти данные внутри этого объекта
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError(`${err}💥💥💥💥`);
  }
};
// showRecipe();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
