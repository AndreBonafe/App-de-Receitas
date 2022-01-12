import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function ExploreMeals(props) {
  const TIME = 200;
  const { history } = props;

  const { fetchSurpriseMeal, Detail, fetchDrinks } = useContext(Context);

  useEffect(() => {
    if (Detail.meals === undefined) {
      fetchSurpriseMeal();
      fetchDrinks();
    }
  }, [fetchSurpriseMeal, fetchDrinks, Detail]);

  return (
    <div>
      <Header pageName="Explorar Comidas" showSerachIcon={ false } />
      <div className="cont-explore">
        <button
          className="btn-explore"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          className="btn-explore"
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          className="btn-explore"
          data-testid="explore-surprise"
          type="button"
          onClick={ () => {
            setTimeout(() => {
              history.push(`/comidas/${Detail.meals[0].idMeal}`);
            }, TIME);
          } }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExploreMeals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
