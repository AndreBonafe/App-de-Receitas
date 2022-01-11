import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import RecomendedCards from '../../Components/RecomendedCards';
import '../../styles/Details.css';
import ShareAndFavoriteBtn from '../../Components/ShareAndFavoriteBtn';

export default function MealsDetails(props) {
  const { match, history } = props;
  const { id } = match.params;
  const TIME_REDIRECT = 200;

  const { Detail, fetchDetailsMeals, inProgress, setInProgress,
    fetchDrinks, Recipes, favoritesRecipes, setFavoritesRecipes } = useContext(Context);

  const [canRenderDatails, setCanRenderDetails] = useState(false);

  const [canSaveProgress, setCanSaveProgress] = useState(false);

  useEffect(() => {
    if (Detail.meals === undefined || Detail.meals[0].idMeal !== id) {
      fetchDetailsMeals(id);
      fetchDrinks();
    }
    if (Detail.meals !== undefined
      && Recipes.drinks !== undefined) setCanRenderDetails(true);
    if (canSaveProgress) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(inProgress));
    }
  }, [fetchDetailsMeals, setCanRenderDetails,
    Detail, id, Recipes, fetchDrinks, favoritesRecipes,
    canSaveProgress, inProgress]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  }, [setFavoritesRecipes, setInProgress]);

  function redirect(Ingredients, Measures) {
    console.log(Detail.meals[0][Ingredients[0]], Detail.meals[0][Measures[0]]);
    setInProgress({
      ...inProgress,
      meals: { ...inProgress.meals,
        [id]: Ingredients.map((ing, i) => {
          if (Detail.meals[0][ing] !== '' && Detail.meals[0][ing] !== null) {
            return (`${Detail.meals[0][ing]} ${Detail.meals[0][Measures[i]]}`);
          }
          return '';
        }).filter((c) => c !== '') },
    });
    setCanSaveProgress(true);
    setTimeout(() => history.push(`/comidas/${id}/in-progress`), TIME_REDIRECT);
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
            <img
              src={ curr.strMealThumb }
              alt={ curr.strMeal }
              data-testid="recipe-photo"
              className="img-recipe2"
            />
            <h2 data-testid="recipe-title">{curr.strMeal}</h2>
            <h4 data-testid="recipe-category">{`Category: ${curr.strCategory}`}</h4>
            <ShareAndFavoriteBtn
              link={ history.location.pathname }
              categoryP={ curr.strCategory }
              areaP={ curr.strArea }
              alcoholicOrNotP=""
              nameP={ curr.strMeal }
              imageP={ curr.strMealThumb }
              id={ id }
              recipe="meal"
            />
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
            <p data-testid="instructions" className="p-details">{curr.strInstructions}</p>
            <iframe src={ `https://www.youtube.com/embed/${curr.strYoutube.split('=')[1]}` } title="youtube-video" data-testid="video" />
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="btn-start"
              onClick={ () => redirect(Ingredients, Measures) }
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
