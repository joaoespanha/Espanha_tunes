import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  toogleLoading = () => {
    const { loading } = this.state;

    this.setState(() => ({
      loading: !loading,
    }));
    // console.log('toogle', loading);
  }

  getUserInfo = async () => {
    this.toogleLoading();
    const userInfo = await getUser();
    this.setState({
      userInfo,
    });
    this.toogleLoading();
  }

  render() {
    const { userInfo, loading } = this.state;
    // const imgUrl = 'https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg';
    return (

      <div>
        <Header />
        {
          loading ? (<Loading />) : (
            <div data-testid="page-profile">
              <img src="url-to-image" alt="user-pic" data-testid="profile-image" />
              <h3>Nome:</h3>
              <p>{userInfo.name}</p>
              <h3>Email:</h3>
              <p>{userInfo.email}</p>
              <h3>Descricao:</h3>
              <p>{userInfo.description}</p>

              <Link to="/profile/edit">Editar perfil</Link>

            </div>)
        }

      </div>
    );
  }
}

export default Profile;
