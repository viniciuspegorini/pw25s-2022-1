import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryService from '../services/CategoryService';

export const CategoryListPage = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        CategoryService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de categorias');
            });
    };

    const onRemove = (id) => {
        CategoryService.remove(id).then((response) => {
            loadData();
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao remover a categoria');
        });
    }

    return (
        <div className="container">
            <h1 className="text-center">Lista de Categorias</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/categories/new">Nova Categoria</Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link className="btn btn-primary"
                                    to={`/categories/${category.id}`}>Editar</Link>

                                <button className="btn btn-danger"
                                    onClick={() => onRemove(category.id)}>
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
        </div>
    );
}

export default CategoryListPage;