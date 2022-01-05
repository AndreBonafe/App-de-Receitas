import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';
import Cards from '../../Components/Cards';
import Footer from '../../Components/Footer';
import CategoriesButtons from '../../Components/CategoriesButtons';

export default function Meals(props) {
  const { fetchAPIMeals, Recipes, fetchMealByCategory,
    setRecipes, fetchMeals, fetchCategoriesMeals, Categories,
    canRedirect } = useContext(Context);

  const [canRenderCards, setcanRenderCards] = useState(false);
  const [canRenderCategories, setcanRenderCategories] = useState(false);

  useEffect(
    () => {
      if (Categories.meals === undefined) {
        fetchCategoriesMeals();
      }
      if (Object.keys(Categories).length > 0) setcanRenderCategories(true);
      if (Object.keys(Recipes).length === 0) fetchMeals();
      if (Recipes.meals !== undefined
        && Recipes.meals !== null && Recipes.meals.length === 1 && canRedirect) {
        const { history } = props;
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
    [Recipes, props, setRecipes,
      fetchMeals, fetchCategoriesMeals, Categories, canRedirect],
  );

  return (
    <div>
      <Header pageName="Comidas" showSerachIcon fetchFunction={ fetchAPIMeals } />
      {canRenderCategories && <CategoriesButtons
        cat={ Categories.meals }
        fetchByCategory={ fetchMealByCategory }
        fetchAll={ fetchMeals }
      />}
      {canRenderCards && <Cards recipes={ Recipes.meals } type="Meal" link="comidas" />}
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
