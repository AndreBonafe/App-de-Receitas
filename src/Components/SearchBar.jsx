import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Context from '../Context/Context';

export default function SearchBar({ fetchFunction }) {
  const { setSearchValues, SearchValues } = useContext(Context);

  return (
    <div>
      <input
        data-testid="search-input"
        placeholder="Search Recipe"
        onChange={ ({ target: { value } }) => (
          setSearchValues({ ...SearchValues, input: value })) }
      />
      <label htmlFor="ingredient-search-radio">
        Ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          name="search-radio"
          value="Ingrediente"
          onClick={ ({ target: { value } }) => (
            setSearchValues({ ...SearchValues, filter: value })) }
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search-radio"
          name="search-radio"
          value="Nome"
          onClick={ ({ target: { value } }) => (
            setSearchValues({ ...SearchValues, filter: value })) }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira Letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          name="search-radio"
          value="Primeira letra"
          onClick={ ({ target: { value } }) => (
            setSearchValues({ ...SearchValues, filter: value })) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ fetchFunction }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  fetchFunction: PropTypes.func,
};

SearchBar.defaultProps = {
  fetchFunction: undefined,
};
