import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface AuthenticatedRouteProps {
    element: React.ReactElement;
}

interface DecodedToken {
    exp: number;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ element }) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        return <Navigate to="/login" />;
    }

    const decodedToken: DecodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default AuthenticatedRoute;