import React from 'react';
import authService from '../../services/authService';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: authService.isAuthenticated()
    };
  }

  render = () => {
    const { target } = this.props.location.state || { target: { pathname: '/private' } };

    if (this.state.loggedIn) {
      return <Redirect to={target} />;
    }

    return (
      <div style={{ width: '600px', textAlign: 'left' }}>
        <h2>Sign In</h2>
        <hr />
        <form>
          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-2 offset-1 col-form-label">Email</label>
            <div className="col-6">
              <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-2 offset-1 col-form-label">Password</label>
            <div className="col-6">
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-8 offset-3">
              <button type="submit" className="btn btn-primary" onClick={this.login}>Sign in</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  login = () => {
    authService.signIn(() => {
      this.setState({
        loggedIn: authService.isAuthenticated()
      });
    });
  };
}

export default Login;