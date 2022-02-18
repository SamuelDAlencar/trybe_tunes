import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
    };
    this.fetchSongs = this.fetchSongs.bind(this);
  }

  componentDidMount() {
    this.fetchSongs();
  }

  componentDidUpdate() {
    this.fetchSongs();
  }

  async fetchSongs() {
    const songs = await getFavoriteSongs();
    this.setState({ songs });
  }

  render() {
    const { songs } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="main">
          <ol className="musics">
            {
              songs.map((song) => (<MusicCard
                key={ song.previewUrl }
                trackId={ song.trackId }
                trackName={ song.trackName }
                artist={ song.artistName }
                previewUrl={ song.previewUrl }
                song={ song }
                thumb={ song.artworkUrl100 }
              />))
            }
          </ol>
        </div>
      </>
    );
  }
}
