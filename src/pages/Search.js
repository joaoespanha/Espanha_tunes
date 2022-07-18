import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBtnDisabled: true,
      searchInput: '',
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

  render() {
    const { searchInput, isBtnDisabled } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
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
          >
            Pesquisar

          </button>

        </div>
      </div>
    );
  }
}

export default Search;
