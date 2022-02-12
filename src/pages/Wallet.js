import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { array } from 'prop-types';
import Header from '../components/Header';
import { setExpenses, setCurrencies } from '../actions';

const apiFetch = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  return requestJson;
};

const apiFetchCurrency = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  // this.setState({ currencies: Object.keys(requestJson) });
  // console.log(Object.keys(requestJson));
  return Object.keys(requestJson);
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: '',
    };
    // this.func = this.func.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    // this.apiFetchCurrency = this.apiFetchCurrency.bind(this);
  }

  componentDidMount = async () => {
    const { dispatchCurrencies } = this.props;
    const arr = await apiFetchCurrency();
    const currencies = arr.filter((value) => value !== 'USDT');
    dispatchCurrencies({ currencies });
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
    this.setState({ value: 0 });
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <div>
        <Header />
        <h1>TrybeWallet</h1>
        <form>

          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              type="Number"
              name="value"
              id=""
              value={ value }
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

          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ ({ target }) => this.handleChange(target) }
            >
              {currencies.map(
                (curr) => (
                  <option key={ curr } value={ curr } data-testid={ curr }>
                    {curr}
                  </option>
                ),
              )}
              {/* <option value="USD" data-testid="USD">USD</option>
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
              <option value="XRP">XRP</option> */}
            </select>
          </label>

          <label htmlFor="method">
            Metodo
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ ({ target }) => this.handleChange(target) }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ ({ target }) => this.handleChange(target) }
            >
              <option value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
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
  dispatchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.shapeOf(array.isRequired).isRequired,
  map: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (value) => dispatch(setExpenses(value)),
  dispatchCurrencies: (value) => dispatch(setCurrencies(value)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
