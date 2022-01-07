import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import RecomendedCards from '../../Components/RecomendedCards';
import '../../styles/Details.css';

export default function MealsDetails(props) {
  const { match, history } = props;
  const { id } = match.params;
  const TIME = 800;
  const TIME_REDIRECT = 200;

  const { Detail, fetchDetailsMeals, inProgress, setInProgress,
    fetchDrinks, Recipes, favoritesRecipes, setFavoritesRecipes } = useContext(Context);

  const [canRenderDatails, setCanRenderDetails] = useState(false);

  const [showMessageCopy, setShowMessageCopy] = useState(false);

  const [canSave, setCanSave] = useState(false);

  const [canSaveProgress, setCanSaveProgress] = useState(false);

  useEffect(() => {
    if (Detail.meals === undefined || Detail.meals[0].idMeal !== id) {
      fetchDetailsMeals(id);
      fetchDrinks();
    }
    if (Detail.meals !== undefined
      && Recipes.drinks !== undefined) setCanRenderDetails(true);
    if (showMessageCopy) setTimeout(() => setShowMessageCopy(false), TIME);
    if (canSave) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favoritesRecipes));
      setCanSave(false);
    }
    if (canSaveProgress) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(inProgress));
    }
  }, [fetchDetailsMeals, setCanRenderDetails, showMessageCopy,
    Detail, id, Recipes, fetchDrinks, canSave, favoritesRecipes,
    canSaveProgress, inProgress]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  }, [setFavoritesRecipes, setInProgress]);

  function redirect() {
    // Ingredients.map((Ing, i) => (
    //   setIngredientsRecipe([...ingredientsRecipe,
    //     Detail.meals[0][Ing], Detail.meals[0][Measures[i]]])
    // ));
    // console.log(Detail.meals[0][Measures[0]]);
    setInProgress({
      ...inProgress,
      meals: { ...inProgress.meals, [id]: [] },
    });
    setCanSaveProgress(true);
    setTimeout(() => history.push(`/comidas/${id}/in-progress`), TIME_REDIRECT);
  }

  function handleClickFavorite(category, area, name, image) {
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
      {canRenderDatails && Detail.meals.map((curr) => {
        const Ingredients = Object.keys(Detail.meals[0])
          .filter((key) => key.includes('Ingredient'));
        const Measures = Object.keys(Detail.meals[0])
          .filter((key) => key.includes('Measure'));
        return (
          <div key="a">
            <h2 data-testid="recipe-title">{curr.strMeal}</h2>
            <img
              src={ curr.strMealThumb }
              alt={ curr.strMeal }
              data-testid="recipe-photo"
              className="img-recipe"
            />
            <h4 data-testid="recipe-category">{`Category: ${curr.strCategory}`}</h4>
            <div>
              <button
                type="button"
                onClick={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
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
                onClick={ () => handleClickFavorite(curr.strCategory,
                  curr.strArea, curr.strMeal, curr.strMealThumb) }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favoritesRecipes.some((c) => c.id === id)
                    ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite-icon"
                />
              </button>
            </div>
            <ul>
              {Ingredients.map((Ing, i) => {
                if (curr[Ing] !== '') {
                  return (
                    <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                      {`${curr[Ing]} - ${curr[Measures[i]] === null ? ''
                        : curr[Measures[i]]}`}
                    </li>);
                }
                return '';
              })}
            </ul>
            <h4>Instructions:</h4>
            <p data-testid="instructions">{curr.strInstructions}</p>
            <iframe src={ `https://www.youtube.com/embed/${curr.strYoutube.split('=')[1]}` } title="youtube-video" data-testid="video" />
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="btn-start"
              onClick={ redirect }
            >
              {Object.keys(inProgress.meals).includes(id)
                ? 'Continuar Receita' : 'Começar Receita'}
            </button>
            <h3>Recomendados:</h3>
            <RecomendedCards
              rec="drinks"
              type="Drink"
              link="bebidas"
            />
            {console.log(Detail)}
          </div>
        );
      })}
    </div>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
