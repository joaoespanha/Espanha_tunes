import React from 'react';
import PropTypes, { shape } from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      musicsData: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getMusicsData();
    this.setFavoriteSongs();
  }

  componentDidUpdate() {
    this.renderLoading();
  }

  setFavoriteSongs= async () => {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({ favoriteSongs: [...favoriteMusics] });
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

getMusicsData = async () => {
  const { match: { params: { id } } } = this.props;
  this.toogleLoading();

  const data = await getMusics(id);
  this.setState({ musicsData: [...data] });

  this.toogleLoading();
}

toogleLoading = () => {
  const { loading } = this.state;

  this.setState(() => ({
    loading: !loading,
  }));
  // console.log('toogle', loading);
}

renderLoading = () => {
  const { loading } = this.state;
  // console.log('render', loading);
  return loading ? (<Loading />) : (<Album />);
}

renderMusicsInfo = () => {
  const { musicsData, favoriteSongs } = this.state;
  return musicsData.map((music) => {
    const isFavorite = favoriteSongs.some(
      (favMusic) => favMusic.trackId === music.trackId,
    );
    return music.trackId ? (<MusicCard
      favoriteSongs={ favoriteSongs }
      isFavorite={ isFavorite }
      addRemoveSongToFavorites={ this.addRemoveSongToFavorites }
      key={ music.trackId }
      music={ music }
    />) : null;
  });
}

render() {
  const { musicsData, loading } = this.state;
  return (
    <div>
      <Header />
      {
        loading
          ? <Loading /> : (
            <>
              <div data-testid="page-album">

                <img
                  src={ musicsData[0]?.artworkUrl100 }
                  alt={ musicsData[0]?.collectionName }
                />
                <h3 data-testid="album-name">
                  { musicsData[0]?.collectionName }
                </h3>

                <h4 data-testid="artist-name">
                  {/*         perguntar ao thisgo barbosa dps */}
                  { musicsData[0]?.artistName }
                </h4>
              </div>
              <div>{ this.renderMusicsInfo()}</div>

            </>
          )
      }

    </div>
  );
}
}

Album.propTypes = {
  match: shape({
    params: shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
