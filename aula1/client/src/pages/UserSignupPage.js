import React from "react";

export class UserSignupPage extends React.Component {
    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
    }

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({ displayName: value });
    }

    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({ username: value });
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    }
    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({ passwordRepeat: value });
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <div>
                    <input type="text" placeholder="Informe o seu nome"
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName} />
                </div>
                <div>
                    <input type="text" placeholder="Informe o usuário"
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                </div>
                <div>
                    <input type="password" placeholder="Informe a sua senha"
                        value={this.state.password}
                        onChange={this.onChangePassword} />
                </div>
                <div>
                    <input type="password" placeholder="Confirme sua senha"
                        value={this.state.passwordRepeat}
                        onChange={this.onChangePasswordRepeat} />
                </div>
                <div>
                    <button>Cadastrar</button>
                </div>
            </div>
        )
    }
}

export default UserSignupPage;