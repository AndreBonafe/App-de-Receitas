import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Context from '../Context/Context';

export default function CategoriesButtons({ cat, fetchByCategory, fetchAll }) {
  const MAX_CATEGORIES = 4;

  const { setFilterCategory, filterCategory } = useContext(Context);

  function ToggleFilter(category) {
    if (category === filterCategory) {
      fetchAll();
      setFilterCategory('');
    } else {
      fetchByCategory(category);
      setFilterCategory(category);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={ () => {
          fetchAll();
          setFilterCategory('');
        } }
        data-testid="All-category-filter"
      >
        All
      </button>
      {cat.map((curr, index) => (
        index <= MAX_CATEGORIES && (
          <button
            type="button"
            key={ index }
            data-testid={ `${curr.strCategory}-category-filter` }
            onClick={ () => ToggleFilter(curr.strCategory) }
          >
            {curr.strCategory}
          </button>)
      ))}
    </div>
  );
}

CategoriesButtons.propTypes = {
  cat: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
