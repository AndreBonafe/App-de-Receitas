import React, { useContext } from 'react';
import Header from '../../Components/Header';
import Context from '../../Context/Context';

export default function Drinks() {
  const { fetchAPIDrinks } = useContext(Context);

  return (
    <div>
      <Header pageName="Bebidas" showSerachIcon fetchFunction={ fetchAPIDrinks } />
      BEBIDAS GLUB GLUB
    </div>
  );
}
