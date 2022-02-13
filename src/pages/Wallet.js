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
      currency: '',
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
    const { currencies, expenses } = this.props;

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
          <tr className="TableHeader">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

          {expenses.map((item) => (
            <div key={ item.id }>
              <tr>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>
                  { Number(item.value).toFixed(2)}
                </td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>
                  {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>Editar</td>
              </tr>
            </div>
          ))}

        </table>

      </div>
    );
  }
}

Wallet.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
  dispatchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.shape(array.isRequired).isRequired,
  expenses: PropTypes.shape(array.isRequired).isRequired,
  map: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (value) => dispatch(setExpenses(value)),
  dispatchCurrencies: (value) => dispatch(setCurrencies(value)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
