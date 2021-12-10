import PropTypes from 'prop-types';
import React from 'react';

export default function DrinksDetails(props) {
  const { match } = props;
  const { id } = match.params;
  console.log(id);

  return (
    <div>
      <h1>Drink Details</h1>
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
