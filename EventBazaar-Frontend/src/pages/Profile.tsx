import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Paper, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '../services/UserService';

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            phone: Yup.string().required('Phone is required').matches(/^[0-9]+$/, 'Phone must be a number'),
        }),
        onSubmit: async (values) => {
            try {
                await UserService.updateUserDetails(values);
                setUser({ ...user, ...values } as User);
                setEditMode(false);
            } catch (err) {
                setError('Failed to update user details');
            }
        },
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userData = await UserService.getUserDetails();
                setUser(userData);
                formik.setValues({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phone: userData.phone,
                });
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, []);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="h4" gutterBottom>
                    User Profile
                </Typography>
                {user && (
                    <Box>
                        <form onSubmit={formik.handleSubmit}>
                            <Box mb={2}>
                                {editMode ? (
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h6">First Name: {user.firstName}</Typography>
                                )}
                            </Box>
                            <Box mb={2}>
                                {editMode ? (
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h6">Last Name: {user.lastName}</Typography>
                                )}
                            </Box>
                            <Box mb={2}>
                                <Typography variant="h6">Email: {user.email}</Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="h6">Roles: {user.roles.join(', ')}</Typography>
                            </Box>
                            <Box mb={2}>
                                {editMode ? (
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h6">Phone: {user.phone}</Typography>
                                )}
                            </Box>
                            <Box mt={4}>
                                <Button variant="contained" color="primary" onClick={() => navigate('/update-password')}>
                                    Update Password
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setEditMode(!editMode)}
                                    style={{ marginLeft: '16px' }}
                                >
                                    {editMode ? 'Cancel' : 'Update User Details'}
                                </Button>
                                {editMode && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{ marginLeft: '16px' }}
                                    >
                                        Save
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Profile;