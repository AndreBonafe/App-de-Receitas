import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Context from '../Context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Favorites.css';

export default function Favorites() {
  const { setFavoritesRecipes, favoritesRecipes } = useContext(Context);
  const TIME = 800;

  const [showMessageCopy, setShowMessageCopy] = useState(false);

  const [canSave, setCanSave] = useState(false);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, [setFavoritesRecipes]);

  useEffect(() => {
    if (showMessageCopy) setTimeout(() => setShowMessageCopy(false), TIME);
    if (canSave) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
      setCanSave(false);
    }
  }, [showMessageCopy, favoritesRecipes, canSave]);

  return (
    <div>
      <Header pageName="Receitas Favoritas" showSerachIcon={ false } />
      <button
        className="fav-btn"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        className="fav-btn"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        className="fav-btn"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      <div>
        {favoritesRecipes
          .filter((c) => (filter !== '' ? c.type === filter : c.type !== filter))
          .map((curr, i) => (
            <div key={ i } className="fav-Card">
              <div>
                <h3 data-testid={ `${i}-horizontal-name` } className="title-fav">
                  <Link
                    className="title-fav"
                    to={ curr.type === 'comida'
                      ? `/comidas/${curr.id}` : `/bebidas/${curr.id}` }
                  >

                    {curr.name}

                  </Link>
                </h3>
                <div className="img-fav">
                  <Link
                    to={ curr.type === 'comida'
                      ? `/comidas/${curr.id}` : `/bebidas/${curr.id}` }
                  >
                    <img
                      src={ curr.image }
                      alt={ `${curr.name}-thumb` }
                      data-testid={ `${i}-horizontal-image` }
                      className="img-recipe"
                    />
                  </Link>
                </div>
                <h4 data-testid={ `${i}-horizontal-top-text` }>
                  {curr.type === 'comida' ? `${curr.area} - ${curr.category}`
                    : curr.alcoholicOrNot}
                </h4>
              </div>
              <div className="cont-btn">
                <button
                  className="share-fav"
                  type="button"
                  onClick={ () => {
                    if (curr.type === 'comida') navigator.clipboard.writeText(`http://localhost:3000/comidas/${curr.id}`);
                    else navigator.clipboard.writeText(`http://localhost:3000/bebidas/${curr.id}`);
                    setShowMessageCopy(true);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt={ `${i}-ShareIcon` }
                    data-testid={ `${i}-horizontal-share-btn` }
                  />
                </button>
                {showMessageCopy && <span>Link copiado!</span>}
                <button
                  className="fav-fav"
                  type="button"
                  onClick={ () => {
                    setFavoritesRecipes(favoritesRecipes.filter((c) => c.id !== curr.id));
                    setCanSave(true);
                  } }
                >
                  <img
                    src={ blackHeartIcon }
                    alt={ `${i}-ShareIcon` }
                    data-testid={ `${i}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
