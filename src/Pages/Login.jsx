import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <h1>Login</h1>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          id="email"
          data-testid="email-input"
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </label>
      <label htmlFor="senha">
        Senha:
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validateSubmit() }
        onClick={ handleButton }
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape([]),
}.isRequired;
