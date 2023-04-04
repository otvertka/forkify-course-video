import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function () {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`); // проверяет, если ошибка, то выдать сообщение
  // console.log(res, data);
  // let recipe = data.data.recipe;
  let { recipe } = data.data;
  recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
  };
  console.log({ recipe });
};
