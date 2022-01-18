import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checked: false,
      favoriteSongs: [],
    };

    this.addFavorite = this.addFavorite.bind(this);
    this.getSongs = this.getSongs.bind(this);
  }

  async componentDidMount() {
    this.getSongs();
  }

  async getSongs() {
    this.setState({ isLoading: true });
    this.setState({
      favoriteSongs: await getFavoriteSongs(),
      isLoading: false,
    });

    const { favoriteSongs } = this.state;
    const { trackName } = this.props;

    favoriteSongs.forEach((song) => {
      if (trackName === song.trackName) {
        this.setState({ isFav: true });
      }
    });
  }

  async addFavorite(song) {
    this.setState({ isLoading: true, checked: true });
    await addSong(song);
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading,
      checked,
      isFav,
    } = this.state;

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
              checked={ isFav ? true : checked }
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
  trackId: propTypes.string,
  song: propTypes.string,
  previewUrl: propTypes.string,
  trackName: propTypes.string,
}.isRequired;
