import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl, FormHelperText, Checkbox, ListItemText } from '@mui/material';
import AuthService from '../../services/AuthService';


interface RegisterFormValues extends RegisterRequest {
    submitError?: string;
}

const roles = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Organizer', value: 'ORGANIZER' },
    { label: 'User', value: 'USER' }
];

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string()
        .required('Required')
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
    roles: Yup.array().min(1, 'Please select at least one role'),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .min(10, 'Phone number must be exactly 10 digits')
        .max(10, 'Phone number must be exactly 10 digits'),
});

const Register: React.FC = () => {
    const navigate = useNavigate();

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            roles: [],
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await AuthService.register(values);
                navigate('/login');
            } catch (err) {
                setErrors({ submitError: 'Registration failed. Please try again.' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        margin="normal"
                        required
                    />

                    <FormControl 
                        fullWidth 
                        margin="normal" 
                        required
                        error={formik.touched.roles && Boolean(formik.errors.roles)}
                    >
                        <InputLabel>Roles</InputLabel>
                        <Select
                            labelId="roles-label"
                            id="roles"
                            name="roles"
                            multiple
                            value={formik.values.roles}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            renderValue={(selected) => (selected as string[]).map(role => roles.find(r => r.value === role)?.label).join(', ')}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    <Checkbox checked={formik.values.roles.includes(role.value)} />
                                    <ListItemText primary={role.label} />
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.roles && formik.errors.roles && (
                            <FormHelperText>{formik.errors.roles}</FormHelperText>
                        )}
                    </FormControl>


                    {formik.errors.submitError && (
                        <Typography color="error" variant="body2">
                            {formik.errors.submitError}
                        </Typography>
                    )}
                    <Button color="primary" variant="contained" fullWidth type="submit" disabled={formik.isSubmitting}>
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Register;