import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';

import './style.scss';

class LoginView extends React.Component {

  static propTypes = {
    isAuthenticating: React.PropTypes.bool.isRequired,
    statusText: React.PropTypes.string,
    actions: React.PropTypes.object.isRequired,
    location: React.PropTypes.object // this comes from react-router, not required
  };

  constructor(props) {
    super(props);

    const redirectRoute = this.props.location ? this.props.location.query.next || '/' : '/';
    this.state = {
      email: '',
      password: '',
      redirectTo: redirectRoute
    };
  }

  login_demo = (e) => {
    e.preventDefault();
    this.setState( { email: "", password: "" } );

    const email = "alan.schaaf@imgur.com";
    const password = "safestpassword";
    let delay = 0;

    for (let i = 0; i < email.length; i++) {
      window.setTimeout( () => {
        this.setState( { email: email.substring(0, i+1) } );
      }, delay );
      delay += 150
    }

    for (let j = 0; j < password.length; j++) {
      window.setTimeout( () => {
        this.setState( { password: password.substring(0, j+1) } );
      }, delay );
      delay += 150;
    }

    window.setTimeout( () => {
      this.props.actions.authLoginUser(this.state.email, this.state.password, this.state.redirectTo);
    }, delay += 100);
  };

  login = (e) => {
    e.preventDefault();
    this.props.actions.authLoginUser(this.state.email, this.state.password, this.state.redirectTo);
  };

  handleInputChange = (e, state) => {
    this.setState({
      [state]: e.currentTarget.value
    });
  };

  render() {
    let statusText = null;
    if (this.props.statusText) {
      const statusTextClassNames = classNames({
        alert: true,
        alert__error: this.props.statusText.indexOf('Authentication Error') === 0,
        alert__success: this.props.statusText.indexOf('Authentication Error') !== 0
      });

      statusText = (
        <div className="row">
          <div className="small-12 columns">
            <div className={statusTextClassNames}>
              {this.props.statusText}
            </div>
          </div>
        </div>
        );
      }

      return (
          <div className="container">
              <div className="row margin-top-large">
                  <div className="small-6 small-centered columns login-form-container">
                      <div className="row">
                          <div className="small-12 columns">
                              <h1>P<span>i</span>xpy: P<span>i</span>cs in Py</h1>
                              <h4>A Django/Redux photo-sharing app developed by <a href="https://github.com/joyjing1">Joy Jing</a> and <a href="https://github.com/corleyma">Matt Corley</a>.</h4>
                          </div>
                      </div>

                      {statusText}

                      <form>
                          <div className="row margin-top-small">
                              <div className="small-12 columns">
                                  <input type="text"
                                         value={this.state.email}
                                         className="form-control input-lg"
                                         placeholder="Email"
                                         onChange={(e) => { this.handleInputChange(e, 'email'); }}
                                  />
                              </div>
                          </div>
                          <div className="row margin-top-small">
                              <div className="small-12 columns">
                                  <input type="password"
                                         value={this.state.password}
                                         className="form-control input-lg"
                                         placeholder="Password"
                                         onChange={(e) => { this.handleInputChange(e, 'password'); }}
                                  />
                              </div>
                          </div>
                          <div className="row margin-top-small">
                              <div className="small-12 columns">
                                  <button type="submit"
                                          className="button button-medium float-right login-button"
                                          disabled={this.props.isAuthenticating}
                                          onClick={this.login_demo}
                                  >
                                      Demo
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
export { LoginView as LoginViewNotConnected };
