import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AuthService from '../../services/AuthService';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('jwtToken');
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogin = () => {
        navigate('/login');
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = (
        <List>
            {location.pathname !== '/' && (
                <ListItem component="button" onClick={() => { navigate('/'); setDrawerOpen(false); }}>
                    <ListItemText primary="Home" />
                </ListItem>
            )}
            {location.pathname !== '/profile' && (
                <ListItem component="button" onClick={() => { navigate('/profile'); setDrawerOpen(false); }}>
                    <ListItemText primary="Profile" />
                </ListItem>
            )}
            {isLoggedIn ? (
                <ListItem component="button" onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                </ListItem>
            ) : (
                location.pathname !== '/login' && (
                    <ListItem component="button" onClick={handleLogin}>
                        <ListItemText primary="Login" />
                    </ListItem>
                )
            )}
        </List>
    );

    return (
        <AppBar position="sticky" className="header-appbar">
            <Toolbar className="header-toolbar">
                <IconButton edge="start" color="inherit" aria-label="home" className="header-logo-button" onClick={() => navigate('/')}>
                    <img src="/evs-logoName.png" alt="EventBazaar Logo" className="header-logo" />
                </IconButton>

                {isSmallScreen ? (
                    <>
                        <div className="header-menu-button">
                            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} className="header-drawer">
                            {menuItems}
                        </Drawer>
                    </>
                ) : (
                    <div className="header-buttons">
                        {location.pathname !== '/' && (
                            <Button color="inherit" className="header-button" onClick={() => navigate('/')}>Home</Button>
                        )}
                        {location.pathname !== '/profile' && (
                            <Button color="inherit" className="header-button" onClick={() => navigate('/profile')}>Profile</Button>
                        )}
                        {isLoggedIn ? (
                            <Button color="inherit" className="header-button" onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            location.pathname !== '/login' && (
                                <Button color="inherit" className="header-button" onClick={handleLogin}>
                                    Login
                                </Button>
                            )
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;


