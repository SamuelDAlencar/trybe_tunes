import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Login extends Component {
  render() {
    const { input,
      inputHandler,
      isDisabled,
      createUser,
    } = this.props;

    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          Nome
          <input
            type="text"
            data-testid="login-name-input"
            id="name"
            onChange={ inputHandler }
            value={ input }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ createUser }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  input: propTypes.string,
  inputHandler: propTypes.func,
  isDisabled: propTypes.bool,
}.isRequired;
