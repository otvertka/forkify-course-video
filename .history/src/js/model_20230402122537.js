import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`); // - resolve значение этого промиса

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      // Если нажата кнопка добавл. в блокнот (Если совпадают id с добавленными в блокнот id)
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (err) {
    // Временный обработчик ошибок
    console.error(`${err}💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err;
  }
};

// вывод 10 результатов на страницу
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0 откуда начинать показ массива с рецептами
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = (oldQt * (newServings/oldServings) )      // 2 * 8/4  = 4
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // MArk current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks(); // сохраняем в localstorage
};

// удаляем галочку закладки
export const deleteBookmark = function (id) {
  //
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1); // удаляем из массива закладок текущий элемент

  // MArk current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks(); // сохраняем в local storage
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
// console.log(state.bookmarks);

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

// Заагружаем свой рецепт в API
export const uploadRecipe = async function (newRecipe) {
  //// Object.entries() метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value]
  // выводим только эл-ты с названием ingredient и не с пустым значением.

  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(','); // Удаляем пробелы
        if (ingArr.length !== 3)
          throw new Error(
            'Неверный формат ингредиентов! Пожалуйста используйте корректный формат:)'
          );

        const [quantity, unit, description] = ingArr; // Деструктурируем массив
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // создаём объект для загрузки в API
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
};
