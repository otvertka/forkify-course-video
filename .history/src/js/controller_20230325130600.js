import * as model from './model.js';
import recipeView from '../views/recipeView.js';

// import icons from '../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 1
import icons from 'url:../img/icons.svg'; // импортируем иконки из родит.каталога с пом Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // полифил async/await в старых браузерах
import recipeView from '../views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('TEST');

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); // получаем хэш нужного рецепта, начиная с 1го символа (после #....)
    console.log(id);

    if (!id) return; // Предохранитель: если нет id
    renderSpinner(recipeContainer); // Крутилка загрузки

    // 1) Loading recipe
    await model.loadRecipe(id); // Асинхронная функция, возвращает Промис. Поэтому должны подождать этот промис. Эта функция ничего не возвращает, поэтому не нужно записывать результат в переменную

    // Rendering recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
// showRecipe();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);  // загружаем хэш после загрузки страницы

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe)); // аналог сверху
