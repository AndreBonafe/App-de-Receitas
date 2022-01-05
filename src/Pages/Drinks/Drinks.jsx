import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';
import Cards from '../../Components/Cards';
import Footer from '../../Components/Footer';
import CategoriesButtons from '../../Components/CategoriesButtons';

export default function Drinks(props) {
  const { fetchAPIDrinks, Recipes, setRecipes, fetchDrinksByCategory,
    fetchDrinks, Categories, fetchCategoriesDrinks, canRedirect } = useContext(Context);

  const [canRenderCards, setcanRenderCards] = useState(false);
  const [canRenderCategories, setcanRenderCategories] = useState(false);

  useEffect(
    () => {
      if (Categories.drinks === undefined) {
        fetchCategoriesDrinks();
      }
      if (Object.keys(Categories).length > 0) setcanRenderCategories(true);
      if (Object.keys(Recipes).length === 0) fetchDrinks();
      if (Recipes.drinks !== undefined && Recipes.drinks !== null
        && Recipes.drinks.length === 1 && canRedirect) {
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
    [Recipes, props, setRecipes,
      fetchDrinks, Categories, fetchCategoriesDrinks, canRedirect],
  );

  return (
    <div>
      <Header pageName="Bebidas" showSerachIcon fetchFunction={ fetchAPIDrinks } />
      {canRenderCategories && <CategoriesButtons
        cat={ Categories.drinks }
        fetchByCategory={ fetchDrinksByCategory }
        fetchAll={ fetchDrinks }
      />}
      {canRenderCards && <Cards recipes={ Recipes.drinks } type="Drink" link="bebidas" />}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
