import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ pageName, showSerachIcon, fetchFunction }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile-icon"
        />
      </Link>
      <h2 data-testid="page-title">{ pageName }</h2>
      { showSerachIcon
      && (
        <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search-icon"
          />
        </button>
      )}
      <br />
      {showSearchBar && <SearchBar fetchFunction={ fetchFunction } />}
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  showSerachIcon: PropTypes.bool.isRequired,
  fetchFunction: PropTypes.func,
};

Header.defaultProps = {
  fetchFunction: undefined,
};
