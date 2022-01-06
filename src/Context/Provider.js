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
