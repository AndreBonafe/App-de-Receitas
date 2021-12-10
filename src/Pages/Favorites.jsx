import React from 'react';
import Header from '../Components/Header';

export default function Favorites() {
  return (
    <div>
      <Header pageName="Receitas Favoritas" showSerachIcon={ false } />
      <h1>Receitas favoritas</h1>
    </div>
  );
}
