import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
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

  render() {
    const { music } = this.props;
    return (
      <div>
        <p>{music.trackName}</p>
        {this.renderMusicPlayer(music.previewUrl)}

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
