import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { setExpenses } from '../actions';

const apiFetch = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  return requestJson;
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valor: 100,
      description: 'teste',
      currency: 'BRL',
      method: 'dinheiro',
      tag: 'alimentacao',
      exchangeRates: '',
      total: 0,
    };
    // this.func = this.func.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm = async (e) => {
    e.preventDefault();

    const { dispatchSetValue } = this.props;
    const { id, total } = this.state;

    console.log(total);

    const apiReturn = await apiFetch();
    console.log(apiReturn);

    this.setState({ exchangeRates: apiReturn });
    dispatchSetValue(this.state);
    this.setState({ id: id + 1 });
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { valor, description, currency, method, tag } = this.state;

    return (
      <div>
        <Header />
        <h1>TrybeWallet</h1>
        <form>

          <label htmlFor="valor">
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="valor"
              id=""
              value={ valor }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              type="Text"
              name="description"
              id=""
              value={ description }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <input
              data-testid="currency-input"
              type="Text"
              name="currency"
              id=""
              value={ currency }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label>

          <label htmlFor="method">
            Metodo
            <select
              data-testid="method-input"
              name="method"
              id=""
              value={ method }
              onChange={ ({ target }) => this.handleChange(target) }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag
            <select
              data-testid="tag-input"
              name="tag"
              id=""
              value={ tag }
              onChange={ ({ target }) => this.handleChange(target) }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>

          <button
            type="submit"
            // disabled={ isBtnDisabled }
            onClick={ this.onSubmitForm }
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (value) => dispatch(setExpenses(value)),
});

export default connect(null, mapDispatchToProps)(Wallet);
