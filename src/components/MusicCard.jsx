import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" label={ trackName } />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string,
  trackName: propTypes.string,
}.isRequired;
