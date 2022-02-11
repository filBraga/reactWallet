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

const apiFetchCurrency = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  // this.setState({ currencies: Object.keys(requestJson) });
  console.log(Object.keys(requestJson));
  // return Object.keys(requestJson);
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valor: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      exchangeRates: '',
      INITIAL_VALUE: 0,
      currencies: '',
    };
    // this.func = this.func.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    // this.apiFetchCurrency = this.apiFetchCurrency.bind(this);
  }

  componentDidMount() {
    apiFetchCurrency();
  }

  onSubmitForm = async (e) => {
    e.preventDefault();

    const { dispatchSetValue } = this.props;
    const { id, INITIAL_VALUE } = this.state;

    console.log(INITIAL_VALUE);

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
              type="Text"
              name="valor"
              id=""
              value={ valor || 0 }
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

          {/* <label htmlFor="currency">
            Moeda
            <input
              data-testid="currency-input"
              type="Text"
              name="currency"
              id=""
              value={ currency }
              onChange={ ({ target }) => this.handleChange(target) }
            />
          </label> */}

          <label htmlFor="combobox">
            Moeda
            <select
              data-testid="currency-input"
              name="combobox"
              id="combobox"
              value={ currency }
              onChange={ ({ target }) => this.handleChange(target) }
            >
              <option value="USD" data-testid="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="ARS">ARS</option>
              <option value="BTC">BTC</option>
              <option value="LTC">LTC</option>
              <option value="JPY">JPY</option>
              <option value="CHF">CHF</option>
              <option value="AUD">AUD</option>
              <option value="CNY">CNY</option>
              <option value="ILS">ILS</option>
              <option value="ETH">ETH</option>
              <option value="XRP">XRP</option>
            </select>
          </label>

          <label htmlFor="methodInput">
            Metodo
            <select
              data-testid="method-input"
              name="methodInput"
              id="methodInput"
              value={ method }
              onChange={ ({ target }) => this.handleChange(target) }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tagInput">
            Tag
            <select
              data-testid="tag-input"
              name="tagInput"
              id="tagInput"
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

        <hr />

        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tr>
            <td>Teste</td>
          </tr>
        </table>

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
