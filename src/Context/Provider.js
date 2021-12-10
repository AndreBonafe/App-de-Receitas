import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const PRIMEIRA_LETRA = 'Primeira letra';

  const [SearchValues, setSearchValues] = useState({
    input: '',
    filter: '',
  });

  const fetchAPIMeals = async () => {
    const { input, filter } = SearchValues;

    let meals = '';

    if (input.length > 1 && filter === PRIMEIRA_LETRA) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    switch (filter) {
    case 'Ingrediente':
      meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        .then((response) => response.json());
      break;
    case 'Nome':
      meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        .then((response) => response.json());
      break;
    case PRIMEIRA_LETRA:
      meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
        .then((response) => response.json());
      break;
    default: meals = '';
    }

    console.log(meals);
  };

  const fetchAPIDrinks = async () => {
    const { input, filter } = SearchValues;

    let drinks = '';

    if (input.length > 1 && filter === PRIMEIRA_LETRA) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    switch (filter) {
    case 'Ingrediente':
      drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`)
        .then((response) => response.json());
      break;
    case 'Nome':
      drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
        .then((response) => response.json());
      break;
    case PRIMEIRA_LETRA:
      drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`)
        .then((response) => response.json());
      break;
    default: drinks = '';
    }

    console.log(drinks);
  };

  const store = {
    SearchValues,
    setSearchValues,
    fetchAPIMeals,
    fetchAPIDrinks,
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
