import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SongsList from '../components/SongsList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBtnDisabled: true,
      searchInput: '',
      loading: false,
      artistName: '',
      arryOfAlbums: [],
    };
  }

  onInputChange = ({ target }) => {
    const { searchInput } = this.state;
    const { name, value } = target;
    const minCharacters = 1;
    this.setState({
      [name]: value,
      isBtnDisabled: searchInput.length < minCharacters,
    });
  }

  onSearchClick = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;

    this.setState((prevState) => ({
      loading: !prevState.loading,
      artistName: searchInput,
    }));

    const artistsInfo = await searchAlbumsAPI(searchInput);

    this.setState((prevState) => ({
      arryOfAlbums: artistsInfo,
      loading: !prevState.loading,
      searchInput: '',
    }));
  }

  render() {
    const { searchInput, isBtnDisabled, loading, arryOfAlbums, artistName } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          {
            !loading
              ? (
                <div className="searchForms">
                  <label htmlFor="search-input">
                    <input
                      data-testid="search-artist-input"
                      name="searchInput"
                      id="search-input"
                      value={ searchInput }
                      onChange={ this.onInputChange }
                    />
                  </label>
                  <button
                    data-testid="search-artist-button"
                    type="button"
                    disabled={ isBtnDisabled }
                    onClick={ this.onSearchClick }
                  >
                    Pesquisar

                  </button>
                </div>) : <Loading />
          }

          <SongsList
            arryOfAlbums={ arryOfAlbums }
            artistName={ artistName }
            searchInput={ searchInput }
          />

        </div>

      </div>

    );
  }
}

export default Search;
