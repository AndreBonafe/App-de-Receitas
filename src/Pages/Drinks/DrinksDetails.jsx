import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import RecomendedCards from '../../Components/RecomendedCards';
import '../../styles/Details.css';
import ShareAndFavoriteBtn from '../../Components/ShareAndFavoriteBtn';

export default function DrinksDetails(props) {
  const { match, history } = props;
  const { id } = match.params;
  const TIME_REDIRECT = 200;

  const { Detail, fetchDetailsDrinks, setInProgress,
    fetchMeals, Recipes, inProgress,
    favoritesRecipes, setFavoritesRecipes } = useContext(Context);

  const [canRenderDatails, setCanRenderDetails] = useState(false);

  const [canSaveProgress, setCanSaveProgress] = useState(false);

  useEffect(() => {
    if (Detail.drinks === undefined || Detail.drinks[0].idDrink !== id) {
      fetchDetailsDrinks(id);
      fetchMeals();
    }
    if (Detail.drinks !== undefined
      && Recipes.meals !== undefined) setCanRenderDetails(true);
    if (canSaveProgress) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(inProgress));
    }
  }, [fetchDetailsDrinks, setCanRenderDetails,
    Detail, id, fetchMeals, Recipes,
    favoritesRecipes, canSaveProgress, inProgress]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  }, [setFavoritesRecipes, setInProgress]);

  function redirect(Ingredients, Measures) {
    setInProgress({
      ...inProgress,
      cocktails: { ...inProgress.cocktails,
        [id]: Ingredients.map((ing, i) => {
          if (Detail.drinks[0][ing] !== '' && Detail.drinks[0][ing] !== null) {
            return (`${Detail.drinks[0][ing]} ${Detail.drinks[0][Measures[i]] === null
              ? '' : Detail.drinks[0][Measures[i]]}`);
          }
          return '';
        }).filter((c) => c !== '') },
    });
    setCanSaveProgress(true);
    setTimeout(() => history.push(`/bebidas/${id}/in-progress`), TIME_REDIRECT);
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
            <img
              src={ curr.strDrinkThumb }
              alt={ curr.strDrink }
              className="img-recipe2"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{curr.strDrink}</h2>
            <h4 data-testid="recipe-category">{`Category: ${curr.strAlcoholic}`}</h4>
            <ShareAndFavoriteBtn
              link={ history.location.pathname }
              categoryP={ curr.strCategory }
              alcoholicOrNotP={ curr.strAlcoholic }
              nameP={ curr.strDrink }
              areaP=""
              imageP={ curr.strDrinkThumb }
              id={ id }
              recipe="drink"
            />
            <ul>
              {Ingredients.map((Ing, i) => {
                if (curr[Ing] !== '' && curr[Ing] !== null) {
                  return (
                    curr[Ing] !== null && (
                      <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                        {`${curr[Ing]} - ${curr[Measures[i]] === null ? ''
                          : curr[Measures[i]]}`}
                      </li>));
                }
                return '';
              })}
            </ul>
            <h4>Instructions:</h4>
            <p className="p-details" data-testid="instructions">{curr.strInstructions}</p>
            <button
              data-testid="start-recipe-btn"
              type="button"
              className="btn-start2"
              onClick={ () => redirect(Ingredients, Measures) }
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
