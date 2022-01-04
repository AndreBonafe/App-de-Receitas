import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';
import Cards from '../../Components/Cards';
import Footer from '../../Components/Footer';

export default function Drinks(props) {
  const { fetchAPIDrinks, Recipes, setRecipes } = useContext(Context);

  const [canRenderCards, setcanRenderCards] = useState(false);

  useEffect(
    () => {
      if (Recipes.drinks !== undefined && Recipes.drinks !== null
        && Recipes.drinks.length === 1) {
        const { history } = props;
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
    [Recipes, props, setRecipes],
  );

  return (
    <div>
      <Header pageName="Bebidas" showSerachIcon fetchFunction={ fetchAPIDrinks } />
      {canRenderCards && <Cards recipes={ Recipes.drinks } type="Drink" />}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
