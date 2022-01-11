import React, { useContext, useEffect, useState } from 'react';
import Cards from '../../Components/Cards';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function MealsByOrigin() {
  const { Areas, fetchAreas, fetchMeals, Recipes, fetchByArea } = useContext(Context);

  const [canRender, setCanRender] = useState(false);
  const [canRenderCards, setCanRenderCards] = useState(false);

  useEffect(() => {
    if (Areas.meals === undefined) fetchAreas();
    if (Areas.meals !== undefined) setCanRender(true);
    if (Recipes.meals === undefined) fetchMeals();
    if (Recipes.meals !== undefined) setCanRenderCards(true);
  }, [Areas, fetchAreas, Recipes, fetchMeals, fetchByArea]);

  return (
    <div>
      <Header pageName="Explorar Origem" showSerachIcon />
      <Footer />
      {canRender && (
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target: { value } }) => {
            if (value === 'All') {
              fetchMeals();
            } else {
              fetchByArea(value);
            }
          } }
        >
          <option data-testid="All-option">All</option>
          {Areas.meals.map((c, i) => (
            <option
              key={ i }
              data-testid={ `${c.strArea}-option` }
            >
              { c.strArea }
            </option>
          ))}
        </select>
      )}
      {canRenderCards && (
        <Cards
          recipes={ Recipes.meals }
          type="Meal"
          link="comidas"
        />
      )}
      {console.log('a')}
    </div>
  );
}
