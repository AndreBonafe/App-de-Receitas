import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ShareAndFavoriteBtn from '../../Components/ShareAndFavoriteBtn';
import Context from '../../Context/Context';
import '../../styles/Progress.css';
import getCurrentDate from '../../functions/getCurrentDate';

export default function MealsProgress(props) {
  const { match, history } = props;
  const { id } = match.params;
  const TIME = 200;

  const [canRender, setCanRender] = useState(false);

  const [canSaveCheckBox, setCanSaveCheckbox] = useState(false);

  const [canSaveDone, setCanSaveDone] = useState(false);

  const { setInProgress, fetchDetailsMeals, inProgress,
    Detail, favoritesRecipes, setFavoritesRecipes,
    doneRecipes, setDoneRecipes, checkboxes, setCheckboxes } = useContext(Context);

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
    if (canSaveDone) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      setCanSaveDone(false);
    }
  }, [Detail, fetchDetailsMeals, id, favoritesRecipes,
    setInProgress, inProgress, canSaveCheckBox, checkboxes, canSaveDone,
    doneRecipes]);

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
    const { idMeal, strArea, strCategory,
      strMeal, strMealThumb, strTags } = Detail.meals[0];
    if (!doneRecipes.some((c) => c.id === id)) {
      const newObj = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: getCurrentDate(),
        tags: strTags.split(' '),
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
            src={ Detail.meals[0].strMealThumb }
            alt="recipe-img"
            className="img-recipe2"
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
            className="btn-start2"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={
              !(Object.keys(checkboxes[id]).length === inProgress.meals[id].length
              && Object.values(checkboxes[id]).every((e) => e === true))
            }
            onClick={ addToDoneAndRedirect }
          >
            Finalizar Receita
          </button>
          <h4>Instructions:</h4>
          <p
            className="p-details"
            data-testid="instructions"
          >
            {Detail.meals[0].strInstructions}
          </p>
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
