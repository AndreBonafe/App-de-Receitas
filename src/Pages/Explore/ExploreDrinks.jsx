import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function ExploreDrinks(props) {
  const { history } = props;

  const { fetchSurpriseDrink, Detail, Recipes, fetchMeals } = useContext(Context);

  useEffect(() => {
    if (Detail.drinks !== undefined && Recipes.meals !== undefined) {
      history.push(`/bebidas/${Detail.drinks[0].idDrink}`);
    }
  }, [Detail, history, Recipes]);

  return (
    <div>
      <Header pageName="Explorar Bebidas" showSerachIcon={ false } />
      <div className="cont-explore">
        <button
          className="btn-explore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          className="btn-explore"
          data-testid="explore-surprise"
          type="button"
          onClick={ () => {
            fetchSurpriseDrink();
            fetchMeals();
          } }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.any,
}.isRequired;
