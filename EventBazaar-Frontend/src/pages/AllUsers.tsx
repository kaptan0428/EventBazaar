import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton, Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import UserService from '../services/UserService';

const AllUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAdmins, setShowAdmins] = useState<boolean>(true);
    const [showOrganizers, setShowOrganizers] = useState<boolean>(true);
    const [showUsers, setShowUsers] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await UserService.getAllUsers();
                setUsers(userData);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const admins = users.filter(user => user.roles.includes('ADMIN'));
    const organizers = users.filter(user => user.roles.includes('ORGANIZER') && !user.roles.includes('ADMIN'));
    const regularUsers = users.filter(user => user.roles.includes('USER') && !user.roles.includes('ADMIN') && !user.roles.includes('ORGANIZER'));

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
                    All Registered Users
                </Typography>
                <Box mb={2}>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => setShowAdmins(!showAdmins)}
                        endIcon={showAdmins ? <ExpandLess /> : <ExpandMore />}
                        style={{ marginBottom: '8px' }}
                    >
                        Admins
                    </Button>
                    {showAdmins && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Roles</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {admins.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.roles.join(', ')}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Box mb={2}>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => setShowOrganizers(!showOrganizers)}
                        endIcon={showOrganizers ? <ExpandLess /> : <ExpandMore />}
                        style={{ marginBottom: '8px' }}
                    >
                        Organizers
                    </Button>
                    {showOrganizers && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Roles</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {organizers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.roles.join(', ')}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Box mb={2}>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => setShowUsers(!showUsers)}
                        endIcon={showUsers ? <ExpandLess /> : <ExpandMore />}
                        style={{ marginBottom: '8px' }}
                    >
                        Users
                    </Button>
                    {showUsers && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Roles</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {regularUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.roles.join(', ')}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default AllUsers;