import React from 'react';

export class LoginPage extends React.Component {
   render() { }
}

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({}))
  }
};

export default LoginPage;