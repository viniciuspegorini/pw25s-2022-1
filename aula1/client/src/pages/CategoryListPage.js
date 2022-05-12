import React, { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';

export const CategoryListPage = (props) => {
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


    return (
        <div className="container">
            <h1 className="text-center">Lista de Categorias</h1>
            
            <table className="table">
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
                            <td>...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </div>
    );
}

export default CategoryListPage;