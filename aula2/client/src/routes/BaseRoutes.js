import React from 'react';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import SignRoutes from './SignRoutes';

const BaseRoutes = () => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? <AuthenticatedRoutes /> : <SignRoutes />;
}

export default BaseRoutes;