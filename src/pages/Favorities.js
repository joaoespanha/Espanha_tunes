import React from 'react';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setFavoriteSongs();
  }

  toogleLoading =() => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  addRemoveSongToFavorites = async (musicObj) => {
    const { favoriteSongs } = this.state;

    // chckar se e favorita
    const isFavorite = favoriteSongs.some((music) => music.trackId === musicObj.trackId);
    this.toogleLoading();
    if (isFavorite) { await removeSong(musicObj); } else { await addSong(musicObj); }
    await this.setFavoriteSongs();
    this.toogleLoading();
  }

  setFavoriteSongs = async () => {
    // this.toogleLoading();
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
    // this.toogleLoading();
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div>
        <Header />
        {
          loading ? (
            <Loading />)
            : (
              <div data-testid="page-favorites">
                {
                  favoriteSongs.map((song) => (<MusicCard
                    isFavorite
                    addRemoveSongToFavorites={ this.addRemoveSongToFavorites }
                    key={ song.trackId }
                    music={ song }
                  />))
                }
              </div>)
        }

      </div>
    );
  }
}

export default Favorites;
