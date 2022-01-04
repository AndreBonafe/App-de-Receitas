import PropTypes from 'prop-types';
import React from 'react';

export default function Cards({ recipes, type }) {
  const MAX_CARDS = 11;

  return (
    <div>
      {recipes && recipes.map((curr, index) => (
        index <= MAX_CARDS && (
          <div key={ curr[`id${type}`] } data-testid={ `${index}-recipe-card` }>
            <img
              src={ curr[`str${type}Thumb`] }
              alt={ `${curr[`str${type}`]}` }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ curr[`str${type}`] }</p>
          </div>)
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
