import React from 'react';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';

export class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    apiError: undefined,
    pendingApiCall: false
  }

  onChangeUsername = (event) => {
    const value = event.target.value;
    this.setState({ username: value, apiError: undefined });
  }
  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value, apiError: undefined });
  }

  onClickLogin = () => {
    this.setState({ pendingApiCall: true });
    const body = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.actions.postLogin(body).then((response) => {
      this.setState({ pendingApiCall: false });
    }).catch((error) => {
      this.setState({ pendingApiCall: false, apiError: 'Login failed' });
    });
  }

  render() {
    let disableSubmit = false;
    if (this.state.username === '') {
      disableSubmit = true;
    }
    if (this.state.password === '') {
      disableSubmit = true;
    }
    return (
      <div className="container">
        <h1 className="text-center">Login</h1>
        <div className="col-12 mb-3">
          <Input
            label="Informe o usuário"
            placeholder="Your username"
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="col-12 mb-3">
          <Input
            label="Informe a senha"
            placeholder="Your password"
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>
        {this.state.apiError && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger">{this.state.apiError}</div>
          </div>
        )}

        <div className="text-center">
          <ButtonWithProgress
            disabled={this.state.pendingApiCall || disableSubmit}
            onClick={this.onClickLogin}
            pendingApiCall={this.state.pendingApiCall}
            text="Login"
          />
        </div>
      </div>
    )
  }
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({}))
  }
};

export default LoginPage;