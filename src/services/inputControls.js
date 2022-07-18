export default onInputChange = ({ target }) => {
  const { userName } = this.state;
  const { name, value } = target;
  const minCharacters = 2;
  this.setState({
    [name]: value,
    isBtnDisabled: userName.length < minCharacters,
  });
};
