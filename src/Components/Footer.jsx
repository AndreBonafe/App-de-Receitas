import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  function checkClass(path) {
    return (window.location.pathname === path
      ? 'selected icon' : 'icon');
  }

  return (
    <footer data-testid="footer" className="footer">
      <div className="icones">
        <Link to="/bebidas">
          <img
            className={ checkClass('/bebidas') }
            src={ drinkIcon }
            alt="Drink Icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            className={ checkClass('/explorar') }
            src={ exploreIcon }
            alt="Explore Icon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">
          <img
            className={ checkClass('/comidas') }
            src={ mealIcon }
            alt="Meal Icon"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}
