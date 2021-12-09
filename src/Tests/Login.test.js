import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const EMAIL = 'user@email.com';
const PASSWORD = '1234567';

describe('Testa a tela de login', () => {
  test('Verifica se os campos de Titulo, Email e Senha existem', () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/login/i);
    const inputEmail = screen.getByRole('textbox', { name: /email:/i });
    const inputSenha = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Verifica se a validação está correta', () => {
    const { history } = renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByRole('textbox', { name: /email:/i });
    const inputSenha = screen.getByLabelText(/senha:/i);

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputSenha, PASSWORD);

    expect(button).not.toBeDisabled();
    userEvent.click(button);
    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
