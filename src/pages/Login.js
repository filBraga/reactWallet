import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../actions';

const EMAIL_REGEX = /^[a-z0-9._-]+@[a-z0-9]+?\.[a-z]+\.?[a-z]+?$/i;
const MIN_LENGHT = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      isBtnDisabled: true,
    };
    // this.func = this.func.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validationButton = this.validationButton.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(event) {
    event.preventDefault();
    const { history, dispatchSetValue } = this.props;
    dispatchSetValue(this.state);
    history.push('/carteira');
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    }, () => this.validationButton());
  }

  validationButton() {
    const { email, pass } = this.state;
    const validateEmail = EMAIL_REGEX.test(email);
    const validatePass = pass.length < MIN_LENGHT;

    this.setState({ isBtnDisabled: !validateEmail || validatePass });
    // ver na aula do dia 14/01/22 do Moises Santana no discord
  }

  render() {
    const { email, pass, isBtnDisabled } = this.state;

    return (
      <section className="register-form">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              type="Text"
              name="email"
              id=""
              value={ email }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label>
          <label htmlFor="pass">
            Password
            <input
              data-testid="password-input"
              type="password"
              name="pass"
              id=""
              value={ pass }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label>
          <button
            type="submit"
            disabled={ isBtnDisabled }
            onClick={ this.onSubmitForm }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (value) => dispatch(setUser(value)),
});

export default connect(null, mapDispatchToProps)(Login);
