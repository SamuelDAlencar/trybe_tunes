import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    const MIN_LENGTH = 2;

    this.setState({
      input: value,
      isDisabled: value.length < MIN_LENGTH,
    });
  }

  render() {
    const { input, isDisabled } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <label htmlFor="search-artist">
            Artist
            <input
              data-testid="search-artist-input"
              id="search-artist"
              onChange={ this.handleChange }
              value={ input }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ isDisabled }
            type="button"
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}
