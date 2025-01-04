import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import Profile from './pages/Profile';
import Footer from './components/Shared/Footer';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Shared/Header';
import PasswordUpdate from './components/Auth/PasswordUpdate';
import './App.css';
import AllUsers from './pages/AllUsers';
import CreateEvent from './components/Events/CreateEvent';
import AllEvents from './components/Events/AllEvents';
import MyEvents from './components/Events/Myevents';
import Event from './components/Events/Event';
import BookTicket from './components/Events/BookTicket';
import AllTickets from './components/Tickets/AllTickets';
import MyTickets from './components/Tickets/MyTickets';
import UserDetails from './pages/UserDetails';
import About from './pages/About';
import Contact from './components/Shared/Contact';

const App: React.FC = () => {
    return (
        <Router>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <CssBaseline />

                <Header />

                <Box sx={{ flex: 1 }}>
                    {
                        /* Main content goes here */

                        <Routes>
                            <Route path="*" element={<div>Not Found</div>} />
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/update-password" element={<PasswordUpdate />} />
                            <Route path="/users" element={<AllUsers />} />
                            <Route path="/create-event" element={<CreateEvent />} />
                            <Route path="/events" element={<AllEvents />} />
                            <Route path="/my-events" element={<MyEvents />} />
                            <Route path="/events/:eventId" element={<Event />} />
                            <Route path="/events/:eventId/book" element={<BookTicket />} />
                            <Route path="/tickets" element={<AllTickets />} />
                            <Route path="/my-tickets" element={<MyTickets />} />
                            <Route path="/users/:userId" element={<UserDetails />} />
                        </Routes>

                    }
                </Box>

                <Footer />
            </Box>
        </Router>
    );
};

export default App;