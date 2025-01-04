import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

import AuthService from '../../services/AuthService';
import withAuth from './WithAuth';

const PasswordUpdate: React.FC = () => {
    const [alert, setAlert] = useState({ visible: false, message: '' });
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Old password is required'),
            newPassword: Yup.string()
                .required('New password is required')
                .test('password-strength', 'Password must meet the following criteria:', function (value) {
                    const errors = [];
                    if (!value) return true; // Skip validation if the value is empty (required will handle it)

                    if (value.length < 8) {
                        errors.push('Password must be at least 8 characters');
                    }
                    if (!/[a-z]/.test(value)) {
                        errors.push('Password must contain at least one lowercase letter');
                    }
                    if (!/[A-Z]/.test(value)) {
                        errors.push('Password must contain at least one uppercase letter');
                    }
                    if (!/[0-9]/.test(value)) {
                        errors.push('Password must contain at least one number');
                    }
                    if (!/[@$!%*?&]/.test(value)) {
                        errors.push('Password must contain at least one special character');
                    }

                    if (errors.length > 0) {
                        return this.createError({
                            message: errors.join('\n'),
                        });
                    }

                    return true;
                }),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
                .required('Confirm password is required'),
        }),

        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                setSubmitting(true);
                const response = await AuthService.passwordUpdate(values);
                console.log(response);
                navigate('/login');
            } catch (error: string | any) {
                    console.log(error);
                    setAlert({ visible: true, message: error.message });
                
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            {alert.visible && <Alert severity="error">{alert.message}</Alert>}
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Your Password
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                        required
                    />
                    <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword?.split('\n').map((msg, index) => (
                            <li key={index} style={{ listStyleType: 'disc' }}>{msg}</li>
                        ))}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        required
                    />

                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={formik.isSubmitting}>
                            Update Password
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default withAuth(PasswordUpdate);
