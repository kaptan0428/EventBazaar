import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './PermissionDenied.css';

const PermissionDenied: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); 
    };

    return (
        <Box className="permission-denied-container">
            <Typography variant="h2" gutterBottom className="error-text">
                Permission Denied
            </Typography>
            <Typography variant="body1" gutterBottom className="description-text">
                You do not have the necessary permissions to access this page.
            </Typography>
            <Button variant="contained" onClick={handleGoBack} className="go-back-button">
                Go Back to Homepage
            </Button>
        </Box>
    );
};

export default PermissionDenied;
