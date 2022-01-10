import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ShareAndFavoriteBtn from '../../Components/ShareAndFavoriteBtn';
import Context from '../../Context/Context';
import '../../styles/Progress.css';

export default function MealsProgress(props) {
  const { match, history } = props;
  const { id } = match.params;

  const [canRender, setCanRender] = useState(false);

  const [checkboxes, setCheckboxes] = useState({});

  const [canSaveCheckBox, setCanSaveCheckbox] = useState(false);

  const { setInProgress, fetchDetailsMeals, inProgress,
    Detail, favoritesRecipes, setFavoritesRecipes } = useContext(Context);

  useEffect(() => {
    if (Detail.meals === undefined || Detail.meals[0].idMeal !== id) {
      fetchDetailsMeals(id);
    }
    if (Detail.meals !== undefined && !Object.keys(inProgress.meals).includes(id)) {
      const Ingredients = Object.keys(Detail.meals[0])
        .filter((key) => key.includes('Ingredient'));
      const Measures = Object.keys(Detail.meals[0])
        .filter((key) => key.includes('Measure'));
      setInProgress({
        ...inProgress,
        meals: { ...inProgress.meals,
          [id]: Ingredients.map((ing, i) => {
            if (Detail.meals[0][ing] !== '' && Detail.meals[0][ing] !== null) {
              return (`${Detail.meals[0][ing]} ${Detail.meals[0][Measures[i]] === null
                ? '' : Detail.meals[0][Measures[i]]}`);
            }
            return '';
          }).filter((c) => c !== '') },
      });
    }
    if (Detail.meals !== undefined) setCanRender(true);
    if (canSaveCheckBox) {
      localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
      setCanSaveCheckbox(false);
    }
  }, [Detail, fetchDetailsMeals, id, favoritesRecipes,
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
            src={ Detail.meals[0].strMealThumb }
            alt="recipe-img"
            className="img-recipe"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{Detail.meals[0].strMeal}</h1>
          <ShareAndFavoriteBtn
            link={ history.location.pathname.split('/in')[0] }
            categoryP={ Detail.meals[0].strCategory }
            areaP={ Detail.meals[0].strArea }
            nameP={ Detail.meals[0].strMeal }
            imageP={ Detail.meals[0].strMealThumb }
            id={ id }
            recipe="meal"
          />
          <h4 data-testid="recipe-category">
            {`Category: ${Detail.meals[0].strCategory}`}
          </h4>
          <ul>
            {inProgress.meals[id].map((ing, i) => (
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
              !(Object.keys(checkboxes).length === inProgress.meals[id].length
              && Object.values(checkboxes).every((e) => e === true))
            }
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar Receita
          </button>
          <h4>Instructions:</h4>
          <p data-testid="instructions">{Detail.meals[0].strInstructions}</p>
          {console.log('a')}
        </>
      )}
    </div>
  );
}

MealsProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
}.isRequired;
