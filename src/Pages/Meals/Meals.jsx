import React, { useContext } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function Meals() {
  const { fetchAPIMeals } = useContext(Context);

  return (
    <div>
      <Header pageName="Comidas" showSerachIcon fetchFunction={ fetchAPIMeals } />
      COMIDINHAS NHAM NHAM
    </div>
  );
}
