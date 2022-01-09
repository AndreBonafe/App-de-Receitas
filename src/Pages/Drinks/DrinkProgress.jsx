import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ShareAndFavoriteBtn from '../../Components/ShareAndFavoriteBtn';
import Context from '../../Context/Context';
import '../../styles/Progress.css';

export default function DrinkProgress(props) {
  const { match, history } = props;
  const { id } = match.params;

  const [canRender, setCanRender] = useState(false);

  const [checkboxes, setCheckboxes] = useState({});

  const [canSaveCheckBox, setCanSaveCheckbox] = useState(false);

  const { setInProgress, fetchDetailsDrinks, inProgress,
    Detail, favoritesRecipes, setFavoritesRecipes } = useContext(Context);

  useEffect(() => {
    if (Detail.drinks === undefined || Detail.drinks[0].idDrink !== id) {
      fetchDetailsDrinks(id);
    }
    if (Detail.drinks !== undefined && !Object.keys(inProgress.cocktails).includes(id)) {
      const Ingredients = Object.keys(Detail.drinks[0])
        .filter((key) => key.includes('Ingredient'));
      const Measures = Object.keys(Detail.drinks[0])
        .filter((key) => key.includes('Measure'));
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
    }
    if (Detail.drinks !== undefined) setCanRender(true);
    if (canSaveCheckBox) {
      localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
      setCanSaveCheckbox(false);
    }
  }, [Detail, fetchDetailsDrinks, id, favoritesRecipes,
    setInProgress, inProgress, canSaveCheckBox, checkboxes]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
    if (localStorage.getItem('favoriteRecipes') !== null) {
      setFavoritesRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
    if (localStorage.getItem('checkboxes') !== null) {
      setCheckboxes(JSON.parse(localStorage.getItem('checkboxes')));
    }
  }, [setInProgress, setFavoritesRecipes]);

  return (
    <div>
      {canRender
      && (
        <>
          <img
            src={ Detail.drinks[0].strDrinkThumb }
            alt="recipe-img"
            className="img-recipe"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{Detail.drinks[0].strMeal}</h1>
          <ShareAndFavoriteBtn
            link={ history.location.pathname.split('/in')[0] }
            categoryP={ Detail.drinks[0].strCategory }
            alcoholicOrNotP={ Detail.drinks[0].strAlcoholic }
            nameP={ Detail.drinks[0].strDrink }
            imageP={ Detail.drinks[0].strDrinkThumb }
            id={ id }
            recipe="drink"
          />
          <h4 data-testid="recipe-category">
            {`Category: ${Detail.drinks[0].strCategory}`}
          </h4>
          <ul>
            {inProgress.cocktails[id].map((ing, i) => (
              <li key={ i } data-testid={ `${i}-ingredient-step` }>
                <label
                  htmlFor={ i }
                  className={ checkboxes[i] ? 'checked' : 'unchecked' }
                >
                  <input
                    type="checkbox"
                    id={ i }
                    onClick={ () => {
                      if (checkboxes[i]) {
                        setCheckboxes({ ...checkboxes, [i]: false });
                        setCanSaveCheckbox(true);
                      } else {
                        setCheckboxes({ ...checkboxes, [i]: true });
                        setCanSaveCheckbox(true);
                      }
                    } }
                    checked={ checkboxes[i] }
                  />
                  { ing }
                </label>
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={
              !(Object.keys(checkboxes).length === inProgress.cocktails[id].length
              && Object.values(checkboxes).every((e) => e === true))
            }
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar Receita
          </button>
          <h4>Instructions:</h4>
          <p data-testid="instructions">{Detail.drinks[0].strInstructions}</p>
          {console.log('a')}
        </>
      )}
    </div>
  );
}

DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
}.isRequired;
