import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SongsList extends React.Component {
  render() {
    const { arryOfAlbums, artistName } = this.props;
    // console.log(arryOfAlbums);
    return (
      <div>
        <h2>

          {arryOfAlbums.length > 0
            ? `Resultado de álbuns de: ${artistName} ` : 'Nenhum álbum foi encontrado' }
        </h2>
        {/* <h3>
          {arryOfAlbums.length === 0 && }
        </h3> */}

        <div>
          {
            arryOfAlbums.map((album, index) => (
              <div
                className="album-card"
                key={ index }
              >
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                </Link>
                <p>{album.collectionName}</p>
                <p>{album.artistName}</p>

              </div>
            ))

          }
        </div>
      </div>
    );
  }
}

SongsList.propTypes = {
  arryOfAlbums: PropTypes.arrayOf(Object),
  artistName: PropTypes.string,
  artworkUrl60: PropTypes.string,
}.isRequired;

export default SongsList;
