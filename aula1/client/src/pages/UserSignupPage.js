import React, { useState } from "react";
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import AuthService from '../services/auth.service';

export const UserSignupPage = (props) => {
    const [form, setForm] = useState({
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: '',
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [errors, setErrors] = useState({});

    const onChange = (event) => {
        const { value, name } = event.target;

        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        });
        setErrors((previousError) => {
            return {
                ...previousError,
                [name]: undefined,
            }
        });
    };

    const onClickSignup = () => {
        const user = {
            displayName: form.displayName,
            username: form.username,
            password: form.password,
        }
        setPendingApiCall(true);
        AuthService.signup(user).then(response => {
            setPendingApiCall(false);
        })
            .catch(apiError => {
                if (apiError.response.data && apiError.response.data.validationErrors) {
                    setErrors(apiError.response.data.validationErrors);
                }
                setPendingApiCall(false);
            });
    };

    let passwordRepeatError;
    const { passwordRepeat, password } = form;
    if (passwordRepeat || password) {
        passwordRepeatError =
            password === passwordRepeat ? '' : 'As senhas devem ser iguais';
    }

    return (
        <div className="container">
            <h1 className="text-center">Sign Up</h1>
            <div className="col-12 mb-3">
                <Input
                    name="displayName"
                    label="Informe o seu nome"
                    type="text"
                    placeholder="Informe seu nome"
                    value={form.displayName}
                    onChange={onChange}
                    hasError={errors.displayName && true}
                    error={errors.displayName}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="username"
                    label="Informe o usuário"
                    className="form-control"
                    type="text" 
                    placeholder="Informe o usuário"
                    value={form.username}
                    onChange={onChange} 
                    hasError={errors.username && true}
                    error={errors.username}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="password"
                    label="Informe o sua senha"
                    className="form-control"
                    type="password" 
                    placeholder="Informe sua senha"
                    value={form.password}
                    onChange={onChange}
                    hasError={errors.password && true}
                    error={errors.password}    
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="passwordRepeat"
                    label="Confirme sua senha"
                    className="form-control"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={form.passwordRepeat}
                    onChange={onChange}
                    hasError={passwordRepeatError && true}
                    error={passwordRepeatError} 
                />
            </div>
            <div className="text-center">
                <ButtonWithProgress
                    disabled={pendingApiCall || passwordRepeatError ? true : false}
                    onClick={onClickSignup}
                    pendingApiCall={pendingApiCall}
                    text="Cadastrar"
                />
            </div>
        </div>
    );
};

UserSignupPage.defaultProps = {}
export default UserSignupPage;