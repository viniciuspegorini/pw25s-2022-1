import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CategoryListPage from '../pages/CategoryListPage';
import HomePage from '../pages/HomePage';

const AuthenticatedRoutes = () => {

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/categories" element={<CategoryListPage />} />
                
                <Route path="*" element={<HomePage />} />
            </Routes>
        </div>
    );
};
export default AuthenticatedRoutes;