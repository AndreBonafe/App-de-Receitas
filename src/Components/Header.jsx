import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

export default function Header({ pageName, showSerachIcon, fetchFunction }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      <div className="header">
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
        <button
          type="button"
          className="button"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        >
          <img
            className="lupa"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search-icon"
          />
        </button>
      )}
      </div>
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
