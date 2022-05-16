import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import logo from '../images/logo-temp.png';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateSubmit = () => {
    const MIN_LNG_PSWD = 7;
    return !(email.includes('@')
    && email.endsWith('.com')
    && password.length >= MIN_LNG_PSWD);
  };

  const handleButton = () => {
    const { history } = props;

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/comidas');
  };

  return (
    <div className="body-login">
      <img src={ logo } alt="logo" className="logo" />
      <div className="center">
        <label htmlFor="email" className="label-login">
          Email:
          <input
            className="input-login email"
            type="text"
            id="email"
            data-testid="email-input"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="senha" className="label-login">
          Senha:
          <input
            className="input-login senha"
            type="password"
            id="senha"
            data-testid="password-input"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <button
          className="botao"
          type="button"
          data-testid="login-submit-btn"
          disabled={ validateSubmit() }
          onClick={ handleButton }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape([]),
}.isRequired;
