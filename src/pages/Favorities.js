import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          Favorities
        </div>
      </div>
    );
  }
}

export default Favorites;
