import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthHOC: React.FC = (props) => {
        const navigate = useNavigate();
        const isLoggedIn = !!localStorage.getItem('jwtToken');

        useEffect(() => {
            if (!isLoggedIn) {
                navigate('/login');
            }
        }, [isLoggedIn, navigate]);

        return isLoggedIn ? <WrappedComponent {...props} /> : null;
    };

    return AuthHOC;
};

export default withAuth;