import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search">Search</div>
      </div>
    );
  }
}

export default Search;
