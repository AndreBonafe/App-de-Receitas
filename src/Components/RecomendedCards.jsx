import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import '../styles/Details.css';

export default function RecomendedCards({ type, rec, link }) {
  const { Recipes } = useContext(Context);
  const MAX_CARDS = 5;

  return (
    <div>
      {Recipes[rec].map(((curr, index) => (
        index <= MAX_CARDS && (
          <Link to={ `/${link}/${curr[`id${type}`]}` } key={ curr[`id${type}`] }>
            <div
              style={ { width: '500px' } }
              data-testid={ `${index}-recomendation-card` }
              className={ index > 1 ? 'hidden' : 'show' }
            >
              <img
                src={ curr[`str${type}Thumb`] }
                alt={ `${curr[`str${type}`]}` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-recomendation-title` }>
                { curr[`str${type}`] }
              </p>
            </div>
          </Link>))))}
    </div>
  );
}

RecomendedCards.propTypes = {
  rec: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
