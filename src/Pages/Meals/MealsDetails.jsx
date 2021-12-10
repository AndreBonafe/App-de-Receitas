import PropTypes from 'prop-types';
import React from 'react';

export default function MealsDetails(props) {
  const { match } = props;
  const { id } = match.params;
  console.log(id);

  return (
    <div>
      <h1>Food Details</h1>
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
