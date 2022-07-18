import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorities';
import Profile from './pages/Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleInputChange: this.handleInputChange,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      handleInputChange,
    } = this.state;
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ... props }
              handleInputChange={ handleInputChange }
              loading={ loading }
              changeLoading={ this.changeLoading }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="" component={ NotFound } />
        </Switch>
      </main>

    );
  }
}

export default App;
