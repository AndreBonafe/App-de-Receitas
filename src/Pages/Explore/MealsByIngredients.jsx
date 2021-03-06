import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function MealsByIngredients(props) {
  const MAX_CARDS = 11;
  const { history } = props;

  const { ingredientsList, fetchMealIngredients, fetchAPIMeals, SearchValues,
    setSearchValues, Recipes } = useContext(Context);

  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (ingredientsList.meals === undefined) fetchMealIngredients();
    if (ingredientsList.meals !== undefined) setCanRender(true);
    if (SearchValues.filter === '') {
      setSearchValues({
        ...SearchValues,
        filter: 'Ingrediente',
      });
    }
    if (SearchValues.filter === 'Ingrediente' && SearchValues.input !== '') {
      fetchAPIMeals();
    }
  }, [ingredientsList, fetchMealIngredients, SearchValues, setSearchValues, Recipes,
    history, fetchAPIMeals]);

  return (
    <div>
      <Header pageName="Explorar Ingredientes" showSerachIcon={ false } />
      <div className="cont-explore-ing">
        {canRender && ingredientsList.meals.map((curr, i) => (
          i <= MAX_CARDS && (
            <button
              className="btn-explore-ing"
              key={ i }
              data-testid={ `${i}-ingredient-card` }
              type="button"
              onClick={ () => {
                setSearchValues({
                  ...SearchValues,
                  input: curr.strIngredient,
                });
              } }
            >
              <img
                className="img-explore"
                src={ `https://www.themealdb.com/images/ingredients/${curr.strIngredient}-Small.png` }
                alt={ i }
                data-testid={ `${i}-card-img` }
              />
              <span data-testid={ `${i}-card-name` }>{curr.strIngredient}</span>
            </button>)
        ))}
      </div>
      <Footer />
    </div>
  );
}

MealsByIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
