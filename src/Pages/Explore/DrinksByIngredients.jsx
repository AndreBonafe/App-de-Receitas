import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

export default function DrinksByIngredients() {
  return (
    <div>
      <Header pageName="Explorar Ingredientes" showSerachIcon={ false } />
      <h1>Drinks By Ingredients</h1>
      <Footer />
    </div>
  );
}
