import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function DrinksByIngredients(props) {
  const MAX_CARDS = 11;
  const { history } = props;

  const { ingredientsList, fetchDrinksIngredients, fetchAPIDrinks, SearchValues,
    setSearchValues, Recipes } = useContext(Context);

  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (ingredientsList.drinks === undefined) fetchDrinksIngredients();
    if (ingredientsList.drinks !== undefined) setCanRender(true);
    if (SearchValues.filter === '') {
      setSearchValues({
        ...SearchValues,
        filter: 'Ingrediente',
      });
    }
    if (SearchValues.filter === 'Ingrediente' && SearchValues.input !== '') {
      fetchAPIDrinks();
    }
    if (Recipes.drinks !== undefined) {
      history.push('/bebidas');
    }
  }, [ingredientsList, fetchDrinksIngredients, SearchValues, setSearchValues, Recipes,
    history, fetchAPIDrinks]);

  return (
    <div>
      <Header pageName="Explorar Ingredientes" showSerachIcon={ false } />
      <div className="cont-explore-ing">
        {canRender && ingredientsList.drinks.map((curr, i) => (
          i <= MAX_CARDS && (
            <button
              className="btn-explore-ing"
              key={ i }
              data-testid={ `${i}-ingredient-card` }
              type="button"
              onClick={ () => {
                setSearchValues({
                  ...SearchValues,
                  input: curr.strIngredient1,
                });
              } }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${curr.strIngredient1}-Small.png` }
                alt={ i }
                data-testid={ `${i}-card-img` }
              />
              <span data-testid={ `${i}-card-name` }>{curr.strIngredient1}</span>
            </button>)
        ))}
      </div>
      <Footer />
    </div>
  );
}

DrinksByIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
