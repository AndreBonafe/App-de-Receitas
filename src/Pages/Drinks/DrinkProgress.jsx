import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ShareAndFavoriteBtn from '../../Components/ShareAndFavoriteBtn';
import Context from '../../Context/Context';
import '../../styles/Progress.css';
import getCurrentDate from '../../functions/getCurrentDate';

export default function DrinkProgress(props) {
  const { match, history } = props;
  const { id } = match.params;
  const TIME = 200;

  const [canRender, setCanRender] = useState(false);

  const [canSaveCheckBox, setCanSaveCheckbox] = useState(false);

  const [canSaveDone, setCanSaveDone] = useState(false);

  const { setInProgress, fetchDetailsDrinks, inProgress,
    Detail, favoritesRecipes, setFavoritesRecipes, doneRecipes,
    setDoneRecipes, checkboxes, setCheckboxes } = useContext(Context);

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
    if (canSaveDone) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      setCanSaveDone(false);
    }
  }, [Detail, fetchDetailsDrinks, id, favoritesRecipes,
    setInProgress, inProgress, canSaveCheckBox, checkboxes,
    canSaveDone, doneRecipes]);

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
    if (localStorage.getItem('doneRecipes') !== null) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, [setInProgress, setFavoritesRecipes, setDoneRecipes, setCheckboxes]);

  useEffect(() => {
    if (checkboxes[id] === undefined) {
      if (JSON.parse(localStorage.getItem('checkboxes')) === null) {
        setCheckboxes({ ...JSON.parse(localStorage.getItem('checkboxes')),
          [id]: {} });
      } else {
        setCheckboxes({ ...JSON.parse(localStorage.getItem('checkboxes')),
          [id]: { ...JSON.parse(localStorage.getItem('checkboxes'))[id] } });
      }
    }
  }, [checkboxes, setCheckboxes, id]);

  function addToDoneAndRedirect() {
    const { idDrink, strAlcoholic, strCategory,
      strDrink, strDrinkThumb } = Detail.drinks[0];
    if (!doneRecipes.some((c) => c.id === id)) {
      const newObj = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: getCurrentDate(),
        tags: [],
      };
      setDoneRecipes([...doneRecipes, newObj]);
    }
    setCanSaveDone(true);
    setTimeout(() => history.push('/receitas-feitas'), TIME);
  }

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
                  className={ checkboxes[id] !== undefined && checkboxes[id][i]
                    ? 'checked' : 'unchecked' }
                >
                  <input
                    type="checkbox"
                    id={ i }
                    onClick={ () => {
                      if (checkboxes[id] !== undefined && checkboxes[id][i]) {
                        setCheckboxes({ ...checkboxes,
                          [id]: { ...checkboxes[id], [i]: false } });
                        setCanSaveCheckbox(true);
                      } else {
                        setCheckboxes({ ...checkboxes,
                          [id]: { ...checkboxes[id], [i]: true } });
                        setCanSaveCheckbox(true);
                      }
                    } }
                    defaultChecked={ checkboxes[id] !== undefined && checkboxes[id][i] }
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
              !(Object.keys(checkboxes[id]).length === inProgress.cocktails[id].length
              && Object.values(checkboxes[id]).every((e) => e === true))
            }
            onClick={ addToDoneAndRedirect }
          >
            Finalizar Receita
          </button>
          <h4>Instructions:</h4>
          <p data-testid="instructions">{Detail.drinks[0].strInstructions}</p>
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
