import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/Cards.css';

export default function Cards({ recipes, type, link }) {
  const MAX_CARDS = 11;

  return (
    <div className="card-container">
      {recipes && recipes.map((curr, index) => (
        index <= MAX_CARDS && (
          <Link to={ `/${link}/${curr[`id${type}`]}` } key={ curr[`id${type}`] }>
            <div data-testid={ `${index}-recipe-card` } className="card">
              <img
                className="card-image"
                src={ curr[`str${type}Thumb`] }
                alt={ `${curr[`str${type}`]}` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` } className="card-p">{ curr[`str${type}`] }</p>
            </div>
          </Link>)
      ))}
    </div>
  );
}

Cards.propTypes = {
  recipes: PropTypes.shape({
    map: PropTypes.func,
  }),
  type: PropTypes.any,
}.isRequired;
