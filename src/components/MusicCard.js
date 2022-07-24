import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      isFavorite: () => { },

    };
  } */

  /*  componentDidUpdate() {
    const { toogleLoading } = this.props;
    toogleLoading();
  } */

  /*  componentDidMount() {
    this.setFavoriteSongs();
  } */

  renderMusicPlayer = (previewUrl) => (
    previewUrl !== undefined
      ? (
        <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
          <track kind="captions" />
          <code>audio</code>
          .
        </audio>)
      : null
  )

  /*  isFavorite = async () => {
    const { music, favoriteSongs } = this.props;
    const isChecked = favoriteSongs.some(
      (favMusic) => favMusic.trackId === music.trackId,
    );
    if (favoriteSongs.length > 0) {
      this.setState({
        isFavorite: isChecked,

      });
    }
  } */

  onCheckBoxChange = () => {};

  render() {
    const { music, addRemoveSongToFavorites, isFavorite } = this.props;
    // const { isFavorite } = this.state;
    // console.log(this.isFavorite());
    return (

      <div>
        <p>{music.trackName}</p>
        {this.renderMusicPlayer(music.previewUrl)}
        <label htmlFor={ `favorites${music.trackId}` }>
          Favorita
          <input
            data-testid={ `checkbox-music-${music.trackId}` }
            type="checkbox"
            name={ `favorites${music.trackId}` }
            id={ `favorites${music.trackId}` }
            value={ music }
            checked={ isFavorite }
            onChange={ () => { addRemoveSongToFavorites(music); } }
          />
        </label>
      </div>);
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,

  }),
}.isRequired;

export default MusicCard;
