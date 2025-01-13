import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { selectEmail } from '../../features/user/userSelectors';
import { jwtDecode } from 'jwt-decode';

import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Box } from '@mui/material';
import { LoginOutlined, LogoutOutlined, AccountBoxOutlined } from '@mui/icons-material';
import AuthService from '../../services/AuthService';
import './Header.css';
import { AccountCircle } from '@mui/icons-material';

const Header: React.FC = () => {
    const email = useSelector(selectEmail);

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('jwtToken');

    let firstName: string | null = null;
    let roles: string[] = [];
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
        const decodedToken: { firstName: string; roles: string[] } = jwtDecode(jwtToken);
        firstName = decodedToken.firstName;
        roles = decodedToken.roles;
    }

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        AuthService.logout(dispatch);
        window.location.reload();
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" className="header-appbar">
            <Toolbar className="header-toolbar">
                <IconButton edge="start" color="inherit" aria-label="home" className="header-logo-button" onClick={() => navigate('/')}>
                    <img src="/evs-logoName.png" alt="EventBazaar Logo" className="header-logo" />
                </IconButton>

                <div className='header-buttons'>
                    {isLoggedIn ? (
                        <div>
                            <IconButton
                                aria-controls='manu-appbar'
                                onClick={handleMenu}
                                color="inherit">
                                <Box component="span" mr={1}>
                                    {firstName}
                                </Box>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >

                                <MenuItem onClick={() => navigate('/profile')}>
                                    <Box>
                                        <AccountBoxOutlined />  Account
                                    </Box>
                                </MenuItem>
                                {roles.includes('ADMIN') && (
                                    <MenuItem onClick={() => navigate('/users')}>
                                        <Box>
                                            <AccountBoxOutlined /> All Users
                                        </Box>
                                    </MenuItem>
                                )}

                                <MenuItem onClick={() => navigate('/events')}>
                                    <Box>
                                        <AccountBoxOutlined /> All Events
                                    </Box>
                                </MenuItem>

                                {roles.includes('ADMIN') && (
                                    <MenuItem onClick={() => navigate('/tickets')}>
                                        <Box>
                                            <AccountBoxOutlined /> All Tickets
                                        </Box>
                                    </MenuItem>
                                )}
                                {roles.includes('ORGANIZER') && (
                                    <MenuItem onClick={() => navigate('/create-event')}>
                                        <Box>
                                            <AccountBoxOutlined /> Create Event
                                        </Box>
                                    </MenuItem>
                                )}
                                {roles.includes('ORGANIZER') && (
                                    <MenuItem onClick={() => navigate('/my-events')}>
                                        <Box>
                                            <AccountBoxOutlined /> My Events
                                        </Box>
                                    </MenuItem>
                                )}

                                {roles.includes('USER') && (
                                    <MenuItem onClick={() => navigate('/my-tickets')}>
                                        <Box>
                                            <AccountBoxOutlined /> My Tickets
                                        </Box>
                                    </MenuItem>
                                )}



                                <MenuItem onClick={handleLogout}>
                                    <Box>
                                        <LogoutOutlined />  Logout
                                    </Box>
                                </MenuItem>
                            </Menu>
                        </div>

                    ) : (
                        location.pathname !== '/login' && (
                            <Button color="inherit" className="header-button" onClick={handleLogin}>
                                <LoginOutlined />
                            </Button>
                        )
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;


