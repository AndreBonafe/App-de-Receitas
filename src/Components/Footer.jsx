import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <div className="icones">
        <Link to="/bebidas">
          <img
            className="icon"
            src={ drinkIcon }
            alt="Drink Icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            className="icon"
            src={ exploreIcon }
            alt="Explore Icon"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">
          <img
            className="icon"
            src={ mealIcon }
            alt="Meal Icon"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}
