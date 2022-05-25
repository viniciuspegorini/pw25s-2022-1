import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import UserSignupPage from '../pages/UserSignupPage';

const SignRoutes = () => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/signup' element={<UserSignupPage />} />
                <Route path='*' element={<LoginPage />} />
            </Routes>
        </div>
    );
};

export default SignRoutes;