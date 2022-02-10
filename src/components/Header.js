import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      // email: '',
    };
    // this.func = this.func.bind(this);
  }

  render() {
    const { email } = this.props;

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
              0
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
});

export default connect(mapStateToProps)(Header);
