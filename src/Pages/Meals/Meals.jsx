import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';
import Cards from '../../Components/Cards';
import Footer from '../../Components/Footer';

export default function Meals(props) {
  const { fetchAPIMeals, Recipes, setRecipes } = useContext(Context);

  const [canRenderCards, setcanRenderCards] = useState(false);

  useEffect(
    () => {
      if (Recipes.meals !== undefined
        && Recipes.meals !== null && Recipes.meals.length === 1) {
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
    [Recipes, props, setRecipes],
  );

  return (
    <div>
      <Header pageName="Comidas" showSerachIcon fetchFunction={ fetchAPIMeals } />
      {canRenderCards && <Cards recipes={ Recipes.meals } type="Meal" />}
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
