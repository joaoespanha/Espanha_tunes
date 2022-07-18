import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loading: false,
      isBtnDisabled: true,
    };
  }

  changeLoading = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  handleLogin = async () => {
    const { history } = this.props;
    const { userName } = this.state;

    const loginObj = { name: userName };

    this.changeLoading();

    await createUser(loginObj);
    history.push('/search');

    this.changeLoading();
  };

  onLoginInputChange = ({ target }) => {
    const { userName } = this.state;
    const { name, value } = target;
    const minCharacters = 2;
    this.setState({
      [name]: value,
      isBtnDisabled: userName.length < minCharacters,
    });
  }

  render() {
    const { isBtnDisabled, userName, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Name
            <input
              data-testid="login-name-input"
              value={ userName }
              name="userName"
              onChange={ this.onLoginInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isBtnDisabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
  loginButton: PropTypes.func,

}.isRequired;

export default Login;
