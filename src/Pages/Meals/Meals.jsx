import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';
import Cards from '../../Components/Cards';
import Footer from '../../Components/Footer';

export default function Meals(props) {
  const MAX_CATEGORIES = 4;
  const { history } = props;

  const { fetchAPIMeals, Recipes, fetchMealByCategory,
    setRecipes, fetchMeals, fetchCategoriesMeals, Categories,
    canRedirect, canRenderCategories, setcanRenderCategories,
    setFilterCategory, filterCategory } = useContext(Context);

  const [canRenderCards, setcanRenderCards] = useState(false);

  useEffect(
    () => {
      if (Categories.meals === undefined) {
        setcanRenderCategories(false);
        fetchCategoriesMeals();
      }
      if (Object.keys(Categories).length > 0) setcanRenderCategories(true);
      if (Recipes.meals === undefined) fetchMeals();
      if (Recipes.meals !== undefined
        && Recipes.meals !== null && Recipes.meals.length === 1 && canRedirect) {
        history.push(`/comidas/${Recipes.meals[0].idMeal}`);
      }
      if (Recipes.meals !== undefined
        && Recipes.meals !== null && Recipes.meals.length > 1) {
        setcanRenderCards(true);
      }
      if (Recipes.meals !== undefined && Recipes.meals === null) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    },
    [Recipes, props, setRecipes, setcanRenderCategories, history,
      fetchMeals, fetchCategoriesMeals, Categories, canRedirect],
  );

  function ToggleFilter(category) {
    if (category === filterCategory) {
      fetchMeals();
      setFilterCategory('');
    } else {
      fetchMealByCategory(category);
      setFilterCategory(category);
    }
  }

  return (
    <div>
      <Header pageName="Comidas" showSerachIcon fetchFunction={ fetchAPIMeals } />
      {canRenderCategories && Categories.meals !== undefined && (
        <button
          onClick={ () => {
            setFilterCategory('');
            fetchMeals();
          } }
          data-testid="All-category-filter"
          type="button"
        >
          All
        </button>
      )}
      {canRenderCategories && Categories.meals !== undefined && (
        Categories.meals.map((curr, index) => (
          index <= MAX_CATEGORIES && (
            <button
              type="button"
              key={ index }
              data-testid={ `${curr.strCategory}-category-filter` }
              onClick={ () => ToggleFilter(curr.strCategory) }
            >
              {curr.strCategory}
            </button>))))}
      {canRenderCards && Recipes.meals !== null && (
        <Cards recipes={ Recipes.meals } type="Meal" link="comidas" />
      )}
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
