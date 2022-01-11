import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

export default function Explore(props) {
  const { history } = props;

  return (
    <div>
      <Header pageName="Explorar" showSerachIcon={ false } />
      <button
        data-testid="explore-food"
        type="button"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.any,
}.isRequired;
