import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumSongs: [],
      artistName: '',
      collectionName: '',
      isLoading: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      albumSongs: songs,
      artistName: songs[0].artistName,
      collectionName: songs[0].collectionName,
      artworkUrl100: songs[0].artworkUrl100,
    });
  }

  render() {
    const {
      albumSongs,
      artistName,
      collectionName,
      isLoading,
      artworkUrl100,
    } = this.state;

    return (
      <>
        <Header />
        {isLoading ? <Loading /> : (
          <div className="main">
            <section data-testid="page-album" className="albumHeader">
              <img src={ artworkUrl100 } alt={ collectionName } />
              <section className="albumInfo">
                <h1 data-testid="album-name">{collectionName}</h1>
                <span data-testid="artist-name">{artistName}</span>
              </section>
            </section>
            <div className="songs">
              {albumSongs.map((song) => (
                song.trackName !== undefined && <MusicCard
                  key={ song.previewUrl }
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  artist={ song.artistName }
                  previewUrl={ song.previewUrl }
                  song={ song }
                  thumb={ song.artworkUrl100 }
                />))}
            </div>
          </div>)}
      </>
    );
  }
}

Album.propTypes = {
  id: propTypes.string,
}.isRequired;
