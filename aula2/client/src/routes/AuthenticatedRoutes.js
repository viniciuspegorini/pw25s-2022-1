import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HomePage from '../pages/HomePage';

import CategoryListPage from '../pages/CategoryListPage';
import ProductListPage from '../pages/ProductListPage';
import CategoryFormPage from '../pages/CategoryFormPage';
import ProductFormPage from '../pages/ProductFormPage';

import ProductListPageV2 from '../pages/products.v2/ProductListPageV2';
import ProductFormPageV2 from '../pages/products.v2/ProductFormPageV2';

const AuthenticatedRoutes = () => {

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<HomePage />} />

                <Route path='/categories' element={<CategoryListPage />} />
                <Route path='/categories/new' element={<CategoryFormPage />} />
                <Route path='/categories/:id' element={<CategoryFormPage />} />

                <Route path='/products' element={<ProductListPage />} />
                <Route path='/products/new' element={<ProductFormPage />} />
                <Route path='/products/:id' element={<ProductFormPage />} />

                <Route path="/product-v2" element={<ProductListPageV2 />} />
                <Route path="/product-v2/new" element={<ProductFormPageV2 />} />
                <Route path="/product-v2/:id" element={<ProductFormPageV2 />} />

                <Route path='*' element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default AuthenticatedRoutes;