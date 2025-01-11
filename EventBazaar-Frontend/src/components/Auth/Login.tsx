import React from 'react';
import {useDispatch} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

import AuthService from '../../services/AuthService';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
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
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await AuthService.login(values, dispatch);
                if (response.jwtToken) {
                    navigate('/');
                } else {
                    setErrors({ email: 'Failed to login' });
                }
            } catch (error) {
                setErrors({ email: 'Failed to login' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password?.split('\n').map((msg, index) => (
                            <li key={index} style={{ listStyleType: 'disc' }}>{msg}</li>
                        ))}
                        required
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={formik.isSubmitting}>
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Login;

//////////////////////// If we have not used 'Formik + Yup' ////////////////////////

// const Login: React.FC = () => {
//     const navigate = useNavigate();
    
//     const [loginRequest, setLoginRequest] = useState<LoginRequest>({ email: '', password: '' });
//     const [error, setError] = useState<string>('');

//     const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault(); // Prevent Default Form Submission
//         setError(''); // Reset Error

//         try{
//             const response = await AuthService.login(loginRequest);

//             if(response.jwtToken) {
//                 navigate('/');
//             } else {
//                 setError('Failed to login');
//             }
//             navigate('/');

//         } catch (error) {
//             setError('Failed to login');
//         }

//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setLoginRequest(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     return (
//         <Container maxWidth="sm">
//             <Box mt={5}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Login
//                 </Typography>
//                 <form onSubmit={handleLogin}>
//                     <TextField
//                         label="Email"
//                         name="email"
//                         type="email"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                         value={loginRequest.email}
//                         onChange={handleChange}
//                         required
//                     />
//                     <TextField
//                         label="Password"
//                         name="password"
//                         type="password"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                         value={loginRequest.password}
//                         onChange={handleChange}
//                         required
//                     />
//                     {error && (
//                         <Typography color="error" variant="body2">
//                             {error}
//                         </Typography>
//                     )}
//                     <Box mt={2}>
//                         <Button type="submit" variant="contained" color="primary" fullWidth>
//                             Login
//                         </Button>
//                     </Box>
//                 </form>
//             </Box>
//         </Container>
//     );
// };

// export default Login;