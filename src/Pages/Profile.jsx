import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/Profile.css';

export default function Profile(props) {
  const { history } = props;

  const [User, setUser] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUser(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  return (
    <div>
      <Header pageName="Perfil" showSerachIcon={ false } />
      <div className="cont-profile ">
        <h1 data-testid="profile-email">{User}</h1>
        <button
          className="btn-profile"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          className="btn-profile"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          className="btn-profile"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.any,
}.isRequired;
