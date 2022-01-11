import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const PRIMEIRA_LETRA = 'Primeira letra';

  const [SearchValues, setSearchValues] = useState({
    input: '',
    filter: '',
  });

  const [Recipes, setRecipes] = useState({});

  const [Categories, setCategories] = useState({});

  const [canRedirect, setCanRedirect] = useState(false);

  const [filterCategory, setFilterCategory] = useState('');

  const [Detail, setDetail] = useState({});

  const [inProgress, setInProgress] = useState({
    cocktails: {},
    meals: {},
  });

  const [canSave, setCanSave] = useState(false);

  const [favoritesRecipes, setFavoritesRecipes] = useState([]);

  const [ingredientsList, setIngredientsList] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  const [checkboxes, setCheckboxes] = useState({});

  const [canRenderCategories, setcanRenderCategories] = useState(false);

  const [Areas, setAreas] = useState({});

  const fetchAPIMeals = async () => {
    const { input, filter } = SearchValues;

    if (input.length > 1 && filter === PRIMEIRA_LETRA) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    switch (filter) {
    case 'Ingrediente':
      setRecipes(await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        .then((response) => response.json()));
      break;
    case 'Nome':
      setRecipes(await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then((response) => response.json()));
      break;
    case PRIMEIRA_LETRA:
      setRecipes(await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
        .then((response) => response.json()));
      break;
    default: return '';
    }

    console.log(Recipes.meals);
  };

  const fetchAPIDrinks = async () => {
    const { input, filter } = SearchValues;

    if (input.length > 1 && filter === PRIMEIRA_LETRA) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    switch (filter) {
    case 'Ingrediente':
      setRecipes(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`)
        .then((response) => response.json()));
      break;
    case 'Nome':
      setRecipes(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
        .then((response) => response.json()));
      break;
    case PRIMEIRA_LETRA:
      setRecipes(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`)
        .then((response) => response.json()));
      break;
    default: return '';
    }
    console.log(Recipes.drinks);
  };

  const fetchMeals = async () => {
    setRecipes(await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json()));
  };

  const fetchDrinks = async () => {
    setRecipes(await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json()));
  };

  const fetchCategoriesMeals = async () => {
    setCategories(await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json()));
  };

  const fetchCategoriesDrinks = async () => {
    setCategories(await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json()));
  };

  const fetchMealByCategory = async (category) => {
    setRecipes(await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json()));
  };

  const fetchDrinksByCategory = async (category) => {
    setRecipes(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json()));
  };

  const fetchDetailsMeals = async (id) => {
    setDetail(await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json()));
  };

  const fetchDetailsDrinks = async (id) => {
    setDetail(await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json()));
  };

  const fetchSurpriseMeal = async () => {
    setDetail(await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json()));
  };

  const fetchSurpriseDrink = async () => {
    setDetail(await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json()));
  };

  const fetchMealIngredients = async () => {
    setIngredientsList(await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json()));
  };

  const fetchDrinksIngredients = async () => {
    setIngredientsList(await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json()));
  };

  const fetchAreas = async () => {
    setAreas(await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json()));
  };

  const fetchByArea = async (area) => {
    setRecipes(await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((response) => response.json()));
  };

  const store = {
    SearchValues,
    setSearchValues,
    fetchAPIMeals,
    fetchAPIDrinks,
    Recipes,
    setRecipes,
    fetchMeals,
    fetchDrinks,
    Categories,
    fetchCategoriesMeals,
    fetchCategoriesDrinks,
    fetchMealByCategory,
    fetchDrinksByCategory,
    canRedirect,
    setCanRedirect,
    filterCategory,
    setFilterCategory,
    fetchDetailsMeals,
    fetchDetailsDrinks,
    Detail,
    setInProgress,
    inProgress,
    favoritesRecipes,
    setFavoritesRecipes,
    canSave,
    setCanSave,
    fetchSurpriseMeal,
    fetchSurpriseDrink,
    fetchMealIngredients,
    ingredientsList,
    fetchDrinksIngredients,
    doneRecipes,
    setDoneRecipes,
    checkboxes,
    setCheckboxes,
    canRenderCategories,
    setcanRenderCategories,
    setCategories,
    fetchAreas,
    Areas,
    fetchByArea,
  };

  return (
    <Context.Provider value={ store }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
