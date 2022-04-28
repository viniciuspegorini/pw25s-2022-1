import React, { useEffect, useState } from 'react';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import AuthService from '../services/auth.service';


export const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() =>{
    setApiError();
  }, [username, password]);
 
  const onClickLogin = () => {
    setPendingApiCall(true);
    const body = {
      username,
      password
    };
    AuthService.login(body).then((response) => {
      setPendingApiCall(false);
    }).catch((error) => {
      setApiError('Login failed');
      setPendingApiCall(false);
    });
  }

  let disableSubmit = false;
  if (username === '') {
    disableSubmit = true;
  }
  if (password === '') {
    disableSubmit = true;
  }
  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <div className="col-12 mb-3">
        <Input
          label="Informe o usuário"
          placeholder="Your username"
          value={username}
          onChange={ (event) => { setUsername(event.target.value) }}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Informe a senha"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={ (event) => { setPassword(event.target.value) }}
        />
      </div>
      {apiError && (
        <div className="col-12 mb-3">
          <div className="alert alert-danger">{apiError}</div>
        </div>
      )}

      <div className="text-center">
        <ButtonWithProgress
          disabled={pendingApiCall || disableSubmit}
          onClick={onClickLogin}
          pendingApiCall={pendingApiCall}
          text="Login"
        />
      </div>
    </div>
  );
};

LoginPage.defaultProps = {};

export default LoginPage;