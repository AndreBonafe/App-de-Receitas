import PropTypes from 'prop-types';
import React from 'react';
// import Context from '../../Context/Context';

export default function MealsDetails(props) {
  const { match } = props;
  const { id } = match.params;

  // const { Recipes } = useContext(Context);

  return (
    <div>
      {/* {Recipes.meals.filter((c) => c.idMeal === id).map((curr) => (
        <img src={ curr.strMealThumb } alt="a" key={ curr.strMealThumb } />
      ))} */}
      {id}
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
