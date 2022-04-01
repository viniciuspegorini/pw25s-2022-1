import React from "react";
import Input from '../components/input';

export class UserSignupPage extends React.Component {
    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false,
        errors: {},
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

    onClickSignup = () => {
        const user = {
            displayName: this.state.displayName,
            username: this.state.username,
            password: this.state.password,
        }
        this.setState({ pendingApiCall: true });
        this.props.actions.postSignup(user).then(response => {
            this.setState({ pendingApiCall: false });
        })
            .catch(apiError => {
                let errors = { ...this.state.errors }
                if (apiError.response.data && apiError.response.data.validationErrors) {
                    errors = { ...apiError.response.data.validationErrors }
                }
                this.setState({ pendingApiCall: false, errors });
            });

    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe o seu nome"
                        type="text"
                        placeholder="Informe o seu nome"
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}
                    />

                </div>
                <div className="col-12 mb-3">
                    <label>Informe o usuário</label>
                    <input className="form-control"
                        type="text" placeholder="Informe o usuário"
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                </div>
                <div className="col-12 mb-3">
                    <label>Informe o sua senha</label>
                    <input className="form-control"
                        type="password" placeholder="Informe a sua senha"
                        value={this.state.password}
                        onChange={this.onChangePassword} />
                </div>
                <div className="col-12 mb-3">
                    <label>Confirme sua senha</label>
                    <input className="form-control"
                        type="password" placeholder="Confirme sua senha"
                        value={this.state.passwordRepeat}
                        onChange={this.onChangePasswordRepeat} />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary"
                        disabled={this.state.pendingApiCall}
                        onClick={this.onClickSignup}
                    >
                        {this.state.pendingApiCall && (
                            <div className="spinner-border text-light spinner-border-sm mr-sm-1"
                                role="status">
                                <span className="visually-hidden">Aguarde...</span>
                            </div>
                        )}
                        Cadastrar
                    </button>
                </div>
            </div>
        )
    }
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({});
            }),
    }
}
export default UserSignupPage;