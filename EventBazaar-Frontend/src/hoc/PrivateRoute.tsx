import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface PrivateRouteProps {
    element: React.ReactElement;
    role: string;
}

interface DecodedToken {
    exp: number;
    roles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, role }) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        return <Navigate to="/login" />;
    }

    const decodedToken: DecodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        return <Navigate to="/login" />;
    }

    const hasRequiredRole = decodedToken.roles.includes(role);

    return hasRequiredRole ? element : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;