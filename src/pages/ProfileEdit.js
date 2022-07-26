import React from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      emailInput: '',
      descriptionInput: '',
      picInput: '',
      // redirect: false,
      // userInfo: {},
      isDisabled: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
    this.startInputCheck();
  }

  startInputCheck =() => {
    const inputCheck = this.checkInputs();

    this.setState({
      isDisabled: !inputCheck,
    });
    console.log(inputCheck);
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
    const userData = await getUser();

    this.setState({
      nameInput: userData.name,
      emailInput: userData.email,
      descriptionInput: userData.description,
      picInput: userData.image
      ,
    });
    // console.log(userInfo);
    this.toogleLoading();
  }

  updateUserInfo = async () => {
    const { nameInput, emailInput, descriptionInput, picInput } = this.state;

    const profileObj = {
      name: nameInput,
      email: emailInput,
      description: descriptionInput,
      image: picInput,
    };

    await updateUser(profileObj);

    // this.setState({ userInfo: newInformation, redirect: !redirect });
    const { history } = this.props;

    history.push('/profile');

    // this.toogleLoading();
  }

  checkInputs = () => {
    const { nameInput, emailInput, descriptionInput, picInput } = this.state;
    const inputsArry = [nameInput, emailInput, descriptionInput, picInput];

    const isEmpty = inputsArry.every((input) => input.length > 0);
    const checkEmail = emailInput.includes('@');

    const checksArry = [isEmpty, checkEmail];

    return checksArry.every((check) => check === true);
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const inputCheck = this.checkInputs();

    this.setState({
      [name]: value,
      isDisabled: !inputCheck,
    });
  }

  render() {
    const {
      nameInput,
      emailInput,
      descriptionInput,
      picInput,
      loading,
      isDisabled,
    } = this.state;
    // if (redirect) { <Redirect to="/profile" />; }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? (<Loading />)
            : (
              <main>
                <form>
                  <label htmlFor="nameInput">
                    Name:
                    <input
                      type="text"
                      data-testid="edit-input-name"
                      value={ nameInput }
                      onChange={ this.handleInputChange }
                      name="nameInput"
                      required
                      id="nameInput"
                    />
                  </label>
                  <label htmlFor="emailInput">
                    Email:
                    <input
                      type="email"
                      value={ emailInput }
                      data-testid="edit-input-email"
                      onChange={ this.handleInputChange }
                      name="emailInput"
                      required
                      id="emailInput"
                    />
                  </label>
                  <label htmlFor="descriptionInput">
                    Description:
                    <textarea
                      data-testid="edit-input-description"
                      onChange={ this.handleInputChange }
                      value={ descriptionInput }
                      name="descriptionInput"
                      required
                      id="descriptionInput"
                    />
                  </label>
                  <label htmlFor="imgInput">
                    Profile Picture:
                    <input
                      type="text"
                      data-testid="edit-input-image"
                      value={ picInput }
                      onChange={ this.handleInputChange }
                      name="picInput"
                      id="imgInput"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={ isDisabled }
                    data-testid="edit-button-save"
                    onClick={ this.updateUserInfo }
                  >
                    Save
                  </button>
                </form>
              </main>
            )
        }

      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: shape({
    push: PropTypes.func,
  }),

}.isRequired;
export default ProfileEdit;
