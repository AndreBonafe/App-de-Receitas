import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Context from '../Context/Context';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Details.css';
import '../styles/Cards.css';

export default function Done() {
  const { setDoneRecipes, doneRecipes } = useContext(Context);
  const TIME = 800;

  const [showMessageCopy, setShowMessageCopy] = useState({});

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') !== null) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, [setDoneRecipes]);

  useEffect(() => {
    if (Object.values(showMessageCopy).some((c) => c === true)) {
      setTimeout(() => setShowMessageCopy({}), TIME);
    }
  }, [showMessageCopy]);

  return (
    <div>
      <Header pageName="Receitas Feitas" showSerachIcon={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      {doneRecipes.filter((c) => (filter !== '' ? c.type === filter : c.type !== filter))
        .map((curr, i) => (
          <div key={ i } className="card-container">
            <Link
              to={ curr.type === 'comida'
                ? `/comidas/${curr.id}` : `/bebidas/${curr.id}` }
            >
              <img
                src={ curr.image }
                alt={ `${curr.name}-thumb` }
                data-testid={ `${i}-horizontal-image` }
                className="img-recipe"
              />
            </Link>
            <h4 data-testid={ `${i}-horizontal-top-text` }>
              {curr.type === 'comida' ? `${curr.area} - ${curr.category}`
                : curr.alcoholicOrNot}
            </h4>
            <Link
              to={ curr.type === 'comida'
                ? `/comidas/${curr.id}` : `/bebidas/${curr.id}` }
            >
              <h3 data-testid={ `${i}-horizontal-name` }>
                {curr.name}
              </h3>
            </Link>
            <p>{'Data de Finalização: '}</p>
            <p data-testid={ `${i}-horizontal-done-date` }>
              {curr.doneDate}
            </p>
            <button
              type="button"
              onClick={ () => {
                if (curr.type === 'comida') navigator.clipboard.writeText(`http://localhost:3000/comidas/${curr.id}`);
                else navigator.clipboard.writeText(`http://localhost:3000/bebidas/${curr.id}`);
                setShowMessageCopy({ [i]: true });
              } }
            >
              <img
                src={ shareIcon }
                alt={ `${i}-ShareIcon` }
                data-testid={ `${i}-horizontal-share-btn` }
              />
            </button>
            {showMessageCopy[i] && <span>Link copiado!</span>}
            {curr.tags.length > 0 && <h3>Tags:</h3>}
            {curr.tags.map((c, index) => (
              index <= 1 && (
                <div key={ c }>
                  <span data-testid={ `${i}-${c}-horizontal-tag` }>{c}</span>
                </div>)
            ))}
          </div>
        ))}
    </div>
  );
}
