import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';

export const ProductListPage = (props) => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        ProductService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de produtos');
            });
    };


    return (
        <div className="container">
            <h1 className="text-center">Lista de Produtos</h1>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category.name}</td>
                            <td>...</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </div>
    );
}

export default ProductListPage;