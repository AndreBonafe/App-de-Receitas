import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Context from '../Context/Context';

export default function ShareAndFavoriteBtn({ link, categoryP, areaP,
  nameP, imageP, alcoholicOrNotP, id, recipe }) {
  const TIME = 800;

  const { favoritesRecipes, canSave,
    setCanSave, setFavoritesRecipes } = useContext(Context);

  const [showMessageCopy, setShowMessageCopy] = useState(false);

  useEffect(() => {
    if (showMessageCopy) setTimeout(() => setShowMessageCopy(false), TIME);
    if (canSave) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favoritesRecipes));
      setCanSave(false);
    }
  }, [showMessageCopy, canSave, favoritesRecipes, setCanSave]);

  function handleClickFavoriteDrink(category, alcoholicOrNot, name, image) {
    if (!favoritesRecipes.some((c) => c.id === id)) {
      const newObj = {
        id,
        type: 'bebida',
        area: '',
        category,
        alcoholicOrNot,
        name,
        image,
      };
      setFavoritesRecipes([...favoritesRecipes, newObj]);
    } else {
      setFavoritesRecipes(favoritesRecipes.filter((c) => c.id !== id));
    }
    setCanSave(true);
  }

  function handleClickFavoriteMeal(category, area, name, image) {
    if (!favoritesRecipes.some((c) => c.id === id)) {
      const newObj = {
        id,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name,
        image,
      };
      setFavoritesRecipes([...favoritesRecipes, newObj]);
    } else {
      setFavoritesRecipes(favoritesRecipes.filter((c) => c.id !== id));
    }
    setCanSave(true);
  }

  return (
    <div>
      <button
        type="button"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000${link}`);
          setShowMessageCopy(true);
        } }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share-icon"
        />
      </button>
      {showMessageCopy && <span>Link copiado!</span>}
      <button
        type="button"
        onClick={ () => (recipe === 'drink'
          ? handleClickFavoriteDrink(categoryP, alcoholicOrNotP, nameP, imageP)
          : handleClickFavoriteMeal(categoryP, areaP, nameP, imageP)) }
      >
        <img
          data-testid="favorite-btn"
          src={ favoritesRecipes.some((c) => c.id === id)
            ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-icon"
        />
      </button>
    </div>
  );
}

ShareAndFavoriteBtn.propTypes = {
  alcoholicOrNot: PropTypes.any,
  area: PropTypes.any,
  category: PropTypes.any,
  handleClickFavorite: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.shape({}),
  }),
  id: PropTypes.any,
  image: PropTypes.any,
  name: PropTypes.any,
}.isRequired;
