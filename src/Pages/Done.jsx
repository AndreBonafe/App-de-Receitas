import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Context from '../Context/Context';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Details.css';
import '../styles/Done.css';

export default function Done() {
  const { setDoneRecipes, doneRecipes } = useContext(Context);
  const TIME = 800;

  const [showMessageCopy, setShowMessageCopy] = useState(false);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('doneRecipes') !== null) {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, [setDoneRecipes]);

  useEffect(() => {
    if (showMessageCopy) setTimeout(() => setShowMessageCopy(false), TIME);
  }, [showMessageCopy]);

  return (
    <div>
      <Header pageName="Receitas Feitas" showSerachIcon={ false } />
      <button
        className="done-btn"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        className="done-btn"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        className="done-btn"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      {doneRecipes.filter((c) => (filter !== '' ? c.type === filter : c.type !== filter))
        .map((curr, i) => (
          <div key={ i } className="done-card">
            <Link
              to={ curr.type === 'comida'
                ? `/comidas/${curr.id}` : `/bebidas/${curr.id}` }
            >
              <h3 className="title-done" data-testid={ `${i}-horizontal-name` }>
                {curr.name}
              </h3>
            </Link>
            <div className="done-img">
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
            </div>
            <h4 data-testid={ `${i}-horizontal-top-text` }>
              {curr.type === 'comida' ? `${curr.area} - ${curr.category}`
                : curr.alcoholicOrNot}
            </h4>
            <div className="text">
              <p>{'Data de Finalização: '}</p>
              <p className="info" data-testid={ `${i}-horizontal-done-date` }>
                {curr.doneDate}
              </p>
              <button
                className="done-share"
                type="button"
                onClick={ () => {
                  if (curr.type === 'comida') navigator.clipboard.writeText(`http://localhost:3000/comidas/${curr.id}`);
                  else navigator.clipboard.writeText(`http://localhost:3000/bebidas/${curr.id}`);
                  setShowMessageCopy(true);
                } }
              >
                <img
                  src={ shareIcon }
                  alt={ `${i}-ShareIcon` }
                  data-testid={ `${i}-horizontal-share-btn` }
                />
              </button>
            </div>
            <div className="tag">
              {showMessageCopy && <span>Link copiado!</span>}
              {curr.tags.length > 0 && <h3>Tags:</h3>}
              {curr.tags.map((c, index) => (
                index <= 1 && (
                  <div key={ c }>
                    <span
                      className="info"
                      data-testid={ `${i}-${c}-horizontal-tag` }
                    >
                      {c}
                    </span>
                  </div>)
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
