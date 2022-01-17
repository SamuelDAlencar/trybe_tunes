import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      artistName: '',
      searchResults: [],
      isDisabled: true,
      isLoading: false,
      isReady: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }

  handleChange({ target: { value } }) {
    const MIN_LENGTH = 2;

    this.setState({
      input: value,
      artistName: value,
      isDisabled: value.length < MIN_LENGTH,
    });
  }

  async searchArtist() {
    this.setState({ isLoading: true });
    const { input } = this.state;
    const results = await searchAlbumsAPIs(input);
    console.log(results);

    if (results.length === 0) {
      this.setState({ error404: true });
    } else {
      this.setState({
        error404: false,
      });
    }

    this.setState({
      isLoading: false,
      isReady: true,
      searchResults: [...results],
      input: '',
    });
  }

  render() {
    const {
      input,
      artistName,
      isDisabled,
      isLoading,
      isReady,
      searchResults,
      error404 } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          {isLoading ? <Loading />
            : (
              <>
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
                  onClick={ this.searchArtist }
                >
                  Pesquisar
                </button>
                {error404 && <p>Nenhum álbum foi encontrado</p>}
                {(isReady === true && error404 === false) && (
                  <span>
                    Resultado de álbuns de:
                    {' '}
                    {artistName}
                  </span>)}
                {searchResults.map((result) => (
                  <Link
                    data-testid={ `link-to-album-${result.collectionId}` }
                    key={ result.collectionId }
                    to={ `/album/${result.collectionId}` }
                  >
                    <h2>{result.collectionName}</h2>
                    <h4>{result.artistName}</h4>
                    <p>{result.releaseDate}</p>
                    <h3>{result.collectionPrice}</h3>
                  </Link>
                ))}
              </>)}
        </div>
      </>
    );
  }
}
