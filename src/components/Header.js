import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.setUserInfo();
  }

  setUserInfo = async () => {
    const info = await getUser();
    this.setState({
      user: info,
    });
    this.changeLoading();
  }

  changeLoading = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Loading />;
    return (

      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>

        <h3 data-testid="header-user-name">{user.name}</h3>
      </header>
    );
  }
}

export default Header;
