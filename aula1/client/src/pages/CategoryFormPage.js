import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import CategoryService from '../services/CategoryService';

export const CategoryFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        name: '',
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            CategoryService.findOne(id)
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            name: response.data.name
                        });
                        setApiError();
                    } else {
                        setApiError('Falha ao editar a categoria.');
                    }
                })
                .catch(() => {
                    setApiError('Falha ao editar a categoria.');
                });
        }
    }, [id]);


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

    const onSubmit = () => {
        const category = {
            id: form.id,
            name: form.name
        };
        setPendingApiCall(true);
        CategoryService.save(category)
            .then(() => {
                setPendingApiCall(false);
                setApiError();
                navigate('/categories');
            })
            .catch((error) => {
                setPendingApiCall(false);
                if (error.response.data && error.response.data.validationErrors) {
                    setErrors(error.response.data.validationErrors);
                    setApiError();
                } else {
                    setApiError('Falha ao salvar a categoria.');
                }
        });
    }

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Categoria</h1>
            <div className="col-12 mb-3">
                <Input
                    name="name"
                    label="Nome"
                    placeholder="Informe o nome"
                    value={form.name}
                    onChange={onChange}
                    hasError={errors.name && true}
                    error={errors.name} 
                />
            </div>
            <div className="text-center">
                <ButtonWithProgress
                    onClick={onSubmit}
                    disabled={pendingApiCall ? true : false}
                    pendingApiCall={pendingApiCall}
                    text="Cadastrar" />
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/categories" />
            </div>
        </div>
    );
}
export default CategoryFormPage;