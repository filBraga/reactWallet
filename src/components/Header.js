import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      // currencies: '',
    };
    // this.func = this.func.bind(this);
  }

  render() {
    const { email, total } = this.props;

    return (
      <div data-testid="">
        <header className="Header">
          <div>
            <h4 data-testid="email-field">
              { email }
            </h4>
          </div>
          <div>
            <h4 data-testid="header-currency-field">
              BRL
            </h4>
          </div>
          <div>
            <h4 data-testid="total-field">
              { total || '0' }
            </h4>
            {/* <Link to="/search" data-testid="link-to-search">Search </Link> */}
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.objectOf(PropTypes.string).isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
