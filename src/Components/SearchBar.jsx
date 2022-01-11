import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Context from '../Context/Context';
import '../styles/SearchBar.css';

export default function SearchBar({ fetchFunction }) {
  const { setSearchValues, SearchValues, setCanRedirect } = useContext(Context);

  return (
    <div className="searchContainer">
      <input
        className="searchInput"
        data-testid="search-input"
        placeholder="Search Recipe"
        onChange={ ({ target: { value } }) => (
          setSearchValues({ ...SearchValues, input: value })) }
      />
      <label htmlFor="ingredient-search-radio" className="item">
        Ingrediente
        <input
          className="radio"
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          name="search-radio"
          value="Ingrediente"
          onClick={ ({ target: { value } }) => (
            setSearchValues({ ...SearchValues, filter: value })) }
        />
      </label>
      <label htmlFor="name-search-radio" className="item">
        Nome
        <input
          className="radio"
          type="radio"
          data-testid="name-search-radio"
          id="name-search-radio"
          name="search-radio"
          value="Nome"
          onClick={ ({ target: { value } }) => (
            setSearchValues({ ...SearchValues, filter: value })) }
        />
      </label>
      <label htmlFor="first-letter-search-radio" className="item">
        Primeira Letra
        <input
          className="radio"
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
        className="searchButton"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          setCanRedirect(true);
          fetchFunction();
        } }
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
