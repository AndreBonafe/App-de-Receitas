import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';
import Cards from '../../Components/Cards';
import Footer from '../../Components/Footer';

export default function Drinks(props) {
  const MAX_CATEGORIES = 4;
  const { history } = props;

  const { fetchAPIDrinks, Recipes, setRecipes, fetchDrinksByCategory,
    fetchDrinks, Categories, fetchCategoriesDrinks, canRedirect, canRenderCategories,
    setcanRenderCategories, filterCategory, setFilterCategory } = useContext(Context);

  const [canRenderCards, setcanRenderCards] = useState(false);

  useEffect(
    () => {
      if (Categories.drinks === undefined) {
        fetchCategoriesDrinks();
      }
      if (Recipes.drinks === undefined) fetchDrinks();
      if (Object.keys(Categories).length > 0) setcanRenderCategories(true);
      if (Recipes.drinks !== undefined && Recipes.drinks !== null
        && Recipes.drinks.length === 1 && canRedirect) {
        setRecipes({});
        history.push(`/bebidas/${Recipes.drinks[0].idDrink}`);
      }
      if (Recipes.drinks !== undefined && Recipes.drinks !== null
        && Recipes.drinks.length > 1) {
        setcanRenderCards(true);
      }
      if (Recipes.drinks !== undefined && Recipes.drinks === null) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    },
    [Recipes, props, setRecipes, history,
      fetchDrinks, Categories, fetchCategoriesDrinks, canRedirect,
      setcanRenderCategories],
  );

  function ToggleFilter(category) {
    if (category === filterCategory) {
      fetchDrinks();
      setFilterCategory('');
    } else {
      fetchDrinksByCategory(category);
      setFilterCategory(category);
    }
  }

  return (
    <div>
      <Header pageName="Bebidas" showSerachIcon fetchFunction={ fetchAPIDrinks } />
      {canRenderCategories && Categories.drinks !== undefined && (
        <button
          onClick={ () => {
            setFilterCategory('');
            fetchDrinks();
          } }
          data-testid="All-category-filter"
          type="button"
        >
          All
        </button>
      )}
      {canRenderCategories && Categories.drinks !== undefined && (
        Categories.drinks.map((curr, index) => (
          index <= MAX_CATEGORIES && (
            <button
              type="button"
              key={ index }
              data-testid={ `${curr.strCategory}-category-filter` }
              onClick={ () => ToggleFilter(curr.strCategory) }
            >
              {curr.strCategory}
            </button>))))}
      {canRenderCards && Recipes.drinks !== null && (
        <Cards recipes={ Recipes.drinks } type="Drink" link="bebidas" />
      )}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
