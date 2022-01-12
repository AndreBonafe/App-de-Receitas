import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import '../styles/Details.css';
import '../styles/Cards.css';

export default function RecomendedCards({ type, rec, link }) {
  const [MinimunCard, setMinimunCard] = useState(0);
  const [MaximumCard, setMaximumCard] = useState(1);

  const { Recipes } = useContext(Context);
  const MAX_CARDS = 5;

  function carousel(order) {
    if (order === 'foward') {
      if (MinimunCard < MAX_CARDS - 1) setMinimunCard(MinimunCard + 1);
      if (MaximumCard < MAX_CARDS) setMaximumCard(MaximumCard + 1);
    } else {
      if (MinimunCard > 0) setMinimunCard(MinimunCard - 1);
      if (MaximumCard > 1) setMaximumCard(MaximumCard - 1);
    }
  }

  return (
    <div className="card-container">
      <button
        type="button"
        onClick={ () => carousel('backward') }
        disabled={ MaximumCard === 1 }
        className="carousel-btn"
      >
        {'<'}
      </button>
      {Recipes[rec].map(((curr, index) => (
        index <= MAX_CARDS && (
          <Link to={ `/${link}/${curr[`id${type}`]}` } key={ curr[`id${type}`] }>
            <div
              style={ { width: '500px' } }
              data-testid={ `${index}-recomendation-card` }
              className={ index === MinimunCard || index === MaximumCard
                ? 'show card' : 'hidden card' }
            >
              <img
                className="card-image"
                src={ curr[`str${type}Thumb`] }
                alt={ `${curr[`str${type}`]}` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-recomendation-title` } className="card-p">
                { curr[`str${type}`] }
              </p>
            </div>
          </Link>))))}
      <button
        type="button"
        onClick={ () => carousel('foward') }
        disabled={ MaximumCard === MAX_CARDS }
        className="carousel-btn"
      >
        {'>'}
      </button>
    </div>
  );
}

RecomendedCards.propTypes = {
  rec: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
