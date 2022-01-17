import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.addFavorite = this.addFavorite.bind(this);
    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  async addFavorite(song) {
    this.setState({ isLoading: true, checked: true });
    await addSong(song);
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, checked } = this.state;

    const {
      trackId,
      trackName,
      previewUrl,
      song,
    } = this.props;

    return (
      isLoading ? <Loading /> : (
        <>
          <span>{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" label={ trackName } />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              checked={ checked }
              onChange={ (() => this.addFavorite(song)) }
              name="favoriteCheckbox"
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </>)
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string,
  trackName: propTypes.string,
}.isRequired;
