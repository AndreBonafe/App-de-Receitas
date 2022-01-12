import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function ExploreDrinks(props) {
  const TIME = 200;
  const { history } = props;

  const { fetchSurpriseDrink, Detail, fetchMeals } = useContext(Context);

  useEffect(() => {
    if (Detail.drinks === undefined) {
      fetchSurpriseDrink();
      fetchMeals();
    }
  }, [fetchSurpriseDrink, fetchMeals, Detail]);

  return (
    <div>
      <Header pageName="Explorar Bebidas" showSerachIcon={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => {
          setTimeout(() => {
            history.push(`/bebidas/${Detail.drinks[0].idDrink}`);
          }, TIME);
        } }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.any,
}.isRequired;
