import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';
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
    // this.getSongs();
  }

  async fetchData() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      albumSongs: songs,
      artistName: songs[0].artistName,
      collectionName: songs[0].collectionName,
    });
  }

  render() {
    const {
      albumSongs,
      artistName,
      collectionName,
      isLoading,
    } = this.state;

    return (
      <>
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <div data-testid="page-album">
              <h3 data-testid="artist-name">{artistName}</h3>
              <h4 data-testid="album-name">{collectionName}</h4>
            </div>
            {albumSongs.map((song) => (
              song.trackName !== undefined && <MusicCard
                key={ song.previewUrl }
                trackId={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                song={ song }
              />))}
          </>)}
      </>
    );
  }
}

Album.propTypes = {
  id: propTypes.string,
}.isRequired;
