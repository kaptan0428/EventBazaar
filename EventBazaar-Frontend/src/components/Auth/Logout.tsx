import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import AuthService from '../../services/AuthService';


const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;