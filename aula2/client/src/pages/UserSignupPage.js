import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
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
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();


    const onChange = (event) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: undefined,
            };
        });
    };

    const onClickSignup = () => {
        const user = {
            displayName: form.displayName,
            username: form.username,
            password: form.password
        }
        setPendingApiCall(true);
        AuthService.signup(user).then(response => {
            setPendingApiCall(false);
            navigate('/');
        }).catch(apiError => {
            if (apiError.response.data && apiError.response.data.validationErrors) {
                setErrors(apiError.response.data.validationErrors);
            }
            setPendingApiCall(false);
        });
    };

    let passwordRepeatError;
    const { password, passwordRepeat } = form;
    if (password || passwordRepeat) {
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
                    className="form-control"
                    type="text"
                    placeholder="Informe seu nome"
                    onChange={onChange}
                    value={form.displayName}
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
                    onChange={onChange}
                    value={form.username}
                    hasError={errors.username && true}
                    error={errors.username}
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="password"
                    label="Informe a sua senha"
                    className="form-control"
                    type="password"
                    placeholder="Informe sua senha"
                    onChange={onChange}
                    value={form.password}
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
                    onChange={onChange}
                    value={form.passwordRepeat}
                    hasError={passwordRepeatError && true}
                    error={passwordRepeatError}
                />
            </div>
            <div className="text-center">
                <ButtonWithProgress
                    onClick={onClickSignup}
                    disabled={pendingApiCall || passwordRepeatError ? true : false}
                    text="Cadastrar"
                    pendingApiCall={pendingApiCall}
                />
            </div>
            <div className="text-center">
                já possui cadastro? <Link to="/">Login</Link>
            </div>
        </div>
    );
};
UserSignupPage.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({});
            })
    }
};
export default UserSignupPage;