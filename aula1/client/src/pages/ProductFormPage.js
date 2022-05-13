import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';

export const ProductFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        name: '',
        description: '',
        price: null,
        category: null,
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (id) {
            ProductService.findOne(id)
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            name: response.data.name,
                            description: response.data.description,
                            price: response.data.price,
                            category: response.data.category.id
                        });
                        setApiError();
                    } else {
                        setApiError('Falha ao editar o produto.');
                    }
                })
                .catch(() => {
                    setApiError('Falha ao editar o produto.');
                });
        }
        CategoryService.findAll()
            .then((response) => {
                setCategories(response.data);
                if (!form.category) {
                    setForm((previousForm) => {
                        return {
                            ...previousForm,
                            category: response.data[0],
                        }
                    });
                }
                setApiError();
            })
            .catch(() => {
                setApiError('Falha ao carregar categorias.');
            });
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
        const product = {
            id: form.id,
            name: form.name,
            description: form.description,
            price: form.price,
            category: { id: form.category }
        };
        setPendingApiCall(true);
        ProductService.save(product)
            .then(() => {
                setPendingApiCall(false);
                setApiError();
                navigate('/products');
            })
            .catch((error) => {
                setPendingApiCall(false);
                if (error.response.data && error.response.data.validationErrors) {
                    setErrors(error.response.data.validationErrors);
                    setApiError();
                } else {
                    setApiError('Falha ao salvar o produto.');
                }
            });
    }

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Produto</h1>
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
            <div className="col-12 mb-3">
                <Input
                    name="price"
                    label="Preço"
                    placeholder="Informe o preço"
                    value={form.price}
                    onChange={onChange}
                    hasError={errors.price && true}
                    error={errors.price}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Descrição</label>
                <textarea
                    name="description"
                    placeholder="Informe o preço"
                    value={form.description}
                    onChange={onChange}
                    rows="5"
                    className="form-control"
                />
                {errors.description && (
                    <span className="invalid-feedback d-block">{errors.description}</span>
                )}
            </div>
            <div className="col-12 mb-3">
                <label>Categoria</label>
                <select
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
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
                <Link to="/products" />
            </div>
        </div>
    );
}
export default ProductFormPage;