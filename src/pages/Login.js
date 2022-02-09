import React from 'react';

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
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    }, () => this.validationButton());
  }

  validationButton() {
    const { email, pass } = this.state;
    const validateEmail = EMAIL_REGEX.test(email);
    const validatePass = pass >= MIN_LENGHT;

    this.setState({ isBtnDisabled: !validateEmail || validatePass });
    // ver na aula do dia 14/01/22 do Moises Santana no discord
  }

  render() {
    const { email, pass, isBtnDisabled } = this.state;

    return (
      <section className="register-form">
        <h1>Login</h1>
        <form>
          {/* Acima onSubmit={this.handleSubmit} */}
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
            data-testid="login-submit-button"
            type="submit"
            disabled={ isBtnDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
