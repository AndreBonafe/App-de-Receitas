import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import RecomendedCards from '../../Components/RecomendedCards';
import '../../styles/Details.css';

export default function DrinksDetails(props) {
  const { match, history } = props;
  const { id } = match.params;
  const TIME = 800;
  const TIME_REDIRECT = 200;

  const { Detail, fetchDetailsDrinks, setInProgress,
    fetchMeals, Recipes, inProgress,
    favoritesRecipes, setFavoritesRecipes } = useContext(Context);

  const [canRenderDatails, setCanRenderDetails] = useState(false);

  const [showMessageCopy, setShowMessageCopy] = useState(false);

  const [canSave, setCanSave] = useState(false);

  const [canSaveProgress, setCanSaveProgress] = useState(false);

  // const [ingredientsRecipe, setIngredientsRecipe] = useState([]);

  useEffect(() => {
    if (Detail.drinks === undefined || Detail.drinks[0].idDrink !== id) {
      fetchDetailsDrinks(id);
      fetchMeals();
    }
    if (Detail.drinks !== undefined
      && Recipes.meals !== undefined) setCanRenderDetails(true);
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
  }, [fetchDetailsDrinks, setCanRenderDetails,
    Detail, id, fetchMeals, Recipes, showMessageCopy,
    canSave, favoritesRecipes, canSaveProgress, inProgress]);

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
    //     Detail.drinks[0][Ing], Detail.drinks[0][Measures[i]]])
    // ));
    // console.log(Detail.drinks[0][Measures[0]]);
    setInProgress({
      ...inProgress,
      cocktails: { ...inProgress.cocktails, [id]: [] },
    });
    setCanSaveProgress(true);
    setTimeout(() => history.push(`/bebidas/${id}/in-progress`), TIME_REDIRECT);
  }

  function handleClickFavorite(category, alcoholicOrNot, name, image) {
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

  return (
    <div>
      {canRenderDatails && Detail.drinks.map((curr) => {
        const Ingredients = Object.keys(Detail.drinks[0])
          .filter((key) => key.includes('Ingredient'));
        const Measures = Object.keys(Detail.drinks[0])
          .filter((key) => key.includes('Measure'));
        return (
          <div key="a">
            <h2 data-testid="recipe-title">{curr.strDrink}</h2>
            <img
              src={ curr.strDrinkThumb }
              alt={ curr.strDrink }
              className="img-recipe"
              data-testid="recipe-photo"
            />
            <h4 data-testid="recipe-category">{`Category: ${curr.strAlcoholic}`}</h4>
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
                  alt="share-img"
                />
              </button>
              {showMessageCopy && <span>Link copiado!</span>}
              <button
                type="button"
                onClick={ () => handleClickFavorite(curr.strCategory,
                  curr.strAlcoholic, curr.strDrink, curr.strDrinkThumb) }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favoritesRecipes.some((c) => c.id === id)
                    ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite-img"
                />
              </button>
            </div>
            <ul>
              {Ingredients.map((Ing, i) => {
                if (curr[Ing] !== '' && curr[Ing] !== null) {
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
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="btn-start"
              onClick={ redirect }
            >
              {Object.keys(inProgress.cocktails).includes(id)
                ? 'Continuar Receita' : 'Começar Receita'}
            </button>
            <h3>Recomendados:</h3>
            <RecomendedCards
              rec="meals"
              type="Meal"
              link="comidas"
            />
            {console.log(Detail.drinks[0])}
          </div>
        );
      })}
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
