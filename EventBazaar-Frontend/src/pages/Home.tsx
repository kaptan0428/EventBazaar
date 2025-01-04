import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [eventId, setEventId] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    return (
        <Container className="container">
            <Box className="flex-container">

                <Box className="left-side" sx={{ display: { xs: 'none', md: 'block' } }}>
                    <img src="../../images/evs-long.png" alt="Logo" loading="lazy" />
                </Box>

                <Box className="right-side">
                    <Typography variant="h4" className="typography-h4" gutterBottom>
                        Welcome to EventBazaar
                    </Typography>
                    <Typography variant="h5" className="typography-h5" gutterBottom>
                        Your Ultimate Event Management Platform
                    </Typography>
                    <Typography variant="body1" className="typography-body1" component="p">
                        EventBazaar is your one-stop solution for managing and participating in events.
                        Whether you are an admin, user, or organizer, we have the tools you need to make your event experience seamless and enjoyable.
                    </Typography>

                    <Box className="divider" sx={{ width: '100%', height: '2px', backgroundColor: '#000', margin: '20px 0' }} />

                    <List subheader={<Typography variant="h6" className="list-subheader">Our Features</Typography>}>
                        <ListItem className="list-item">
                            <ListItemText primary="Easy Signup & Seamless Sign-in Experience" secondary={<span className="list-item-secondary">Admins, Users, and Organizers can quickly register and access necessary features.</span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Personalize Your Experience"
                                secondary={<span className="list-item-secondary">
                                    Manage your User or Organizer profile with easy creation, updating, and deletion options.
                                </span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Create and Manage Events Like a Pro" secondary={<span className="list-item-secondary">Organizers can create, update, and delete events, managing every detail including categories, locations, and dates.</span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Smart Event Search" secondary={<span className="list-item-secondary">Discover events based on name, location, category, or date with intuitive search features.</span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Get Involved in Event Discussions" secondary={<span className="list-item-secondary">Join public Q&A discussions about each event to engage with other attendees.</span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Effortless Booking System" secondary={<span className="list-item-secondary">Easily book tickets for events with a smooth and efficient booking experience.</span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Powerful Dashboards for Admins & Organizers" secondary={<span className="list-item-secondary">Admins and Organizers can track event performance, ticket sales, and total revenue with powerful dashboards.</span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Event Feedback & Ratings" secondary={<span className="list-item-secondary">Users can rate events and leave feedback, providing insights for others and helping organizers improve.</span>} />
                        </ListItem>
                        <ListItem className="list-item">
                            <ListItemText primary="Detailed Event & Booking History" secondary={<span className="list-item-secondary">Users can view their booking history, and Organizers can keep track of event histories for deeper insights.</span>} />
                        </ListItem>
                    </List>

                    <Box className="divider" sx={{ width: '100%', height: '2px', backgroundColor: '#000', margin: '20px 0' }} />

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/profile')}>
                            Profile
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/users')}>
                            All Users
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/events')}>
                            Events
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/create-event')}>
                            Create Event
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/events')}>
                            All Events
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/my-events')}>
                            My Events
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/tickets')}>
                            All Tickets
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate('/my-tickets')}>
                            My Tickets
                        </Button>
                        <Box>
                            <input
                                type="number"
                                placeholder="Enter Event ID"
                                onChange={(e) => setEventId(e.target.value)}
                                style={{ marginRight: '10px', padding: '5px', width: '100%' }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/events/${eventId}`)}
                            style={{ width: '100%' }}
                        >
                            Event Details
                        </Button>
                        
                        
                        <Box>
                            <input
                                type="number"
                                placeholder="Enter User ID"
                                onChange={(e) => setUserId(e.target.value)}
                                style={{ marginRight: '10px', padding: '5px', width: '100%' }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/users/${userId}`)}
                            style={{ width: '100%' }}
                        >
                            User Details
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
