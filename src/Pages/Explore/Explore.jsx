import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import '../../styles/Explorar.css';

export default function Explore(props) {
  const { history } = props;

  return (
    <div>
      <Header pageName="Explorar" showSerachIcon={ false } />
      <div className="cont-explore">
        <button
          className="btn-explore"
          data-testid="explore-food"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          className="btn-explore"
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.any,
}.isRequired;
