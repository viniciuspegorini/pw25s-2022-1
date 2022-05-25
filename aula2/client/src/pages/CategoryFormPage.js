import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import CategoryService from '../services/CategoryService';

export const CategoryFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        name: ''
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            CategoryService.findOne(id).then( (response) => {
                if (response.data) {
                    setForm({
                        id: response.data.id,
                        name: response.data.name}); // ...response.data
                    setApiError();
                } else {
                    setApiError('Falha ao carregar a categoria');
                }
            }).catch((erro) => {
                setApiError('Falha ao carregar a categoria');
            });
        }
    }, [id]);


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

    const onSubmit = () => {
        const category = {
            id: form.id,
            name: form.name
        };
        setPendingApiCall(true);
        CategoryService.save(category).then( (response) => {
            setPendingApiCall(false);
            navigate('/categories');
            /*setForm((previousForm) => {
                return {
                    ...previousForm,
                    id: response.data.id,
                };
            }); */
        }).catch( (error) => {
            if (error.response.data && error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            } else {
                setApiError('Falha ao salvar categoria.');
            }
            setPendingApiCall(false);
        });
        
    };

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Categoria</h1>
            <div className="col-12 mb-3">
                <Input
                    name="name"
                    label="Name"
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
                    text="Salvar"
                />
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/categories">Voltar</Link>
            </div>
        </div>
    );
}

export default CategoryFormPage;