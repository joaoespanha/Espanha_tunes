import React from 'react';
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
        <h3 data-testid="header-user-name">{user.name}</h3>
      </header>
    );
  }
}

export default Header;
