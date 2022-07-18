import React from 'react';
import PropTypes, { shape } from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      musicsData: [],
    };
  }

  componentDidMount() {
    this.getMusicsData();
  }

getMusicsData = async () => {
  const { match: { params: { id } } } = this.props;
  this.toogleLoading();

  const data = await getMusics(id);
  this.setState({ musicsData: [...data] });

  this.toogleLoading();
}

toogleLoading = () => {
  this.setState((prevState) => ({
    loading: !prevState.loading,
  }));
}

renderMusicsInfo = () => {
  const { musicsData } = this.state;

  return musicsData.map((music) => <MusicCard key={ music.trackId } music={ music } />);
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
              <div>{this.renderMusicsInfo()}</div>
            </>)
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
