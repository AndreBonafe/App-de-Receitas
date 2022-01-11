import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import '../styles/Details.css';
import '../styles/Cards.css';

export default function RecomendedCards({ type, rec, link }) {
  const { Recipes } = useContext(Context);
  const MAX_CARDS = 5;

  return (
    <div className="card-container">
      {Recipes[rec].map(((curr, index) => (
        index <= MAX_CARDS && (
          <Link to={ `/${link}/${curr[`id${type}`]}` } key={ curr[`id${type}`] }>
            <div
              style={ { width: '500px' } }
              data-testid={ `${index}-recomendation-card` }
              className={ index > 1 ? 'hidden card' : 'show card' }
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
    </div>
  );
}

RecomendedCards.propTypes = {
  rec: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
