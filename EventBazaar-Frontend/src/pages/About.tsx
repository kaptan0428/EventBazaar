import React from 'react';
import { Container, Typography, Box, Link, Paper, Avatar } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';

const About: React.FC = () => {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'primary.main' }}>
                    About EventBazaar
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        Mission Statement
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        At EventBazaar, our mission is to simplify event management and ticket booking for both organizers and attendees, providing a seamless experience for all.
                    </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        Vision
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        We envision a world where event planning, registration, and participation are effortless, enabling more memorable experiences for everyone involved.
                    </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        What We Do
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        EventBazaar allows organizers to create and manage events easily, attendees to find and register for events, and admins to oversee the entire ecosystem.
                    </Typography>
                    <ul>
                        <li>Event creation and management</li>
                        <li>Ticket booking</li>
                        <li>Event browsing and search</li>
                        <li>User and organizer dashboards</li>
                    </ul>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        Who We Serve
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        Our platform is designed for event organizers, attendees, and administrators to easily manage and participate in events of all kinds—from conferences and workshops to festivals and parties.
                    </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        Core Values
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        Our core values include simplicity, reliability, and user-centric design. We believe that every event should be easy to organize, attend, and enjoy.
                    </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        Technology Stack
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        Powered by cutting-edge technologies like React, Spring Boot, PostgreSQL, and JWT, EventBazaar ensures a secure and efficient experience for all users.
                    </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        Testimonials/Case Studies
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        Hundreds of organizers have successfully hosted events on EventBazaar, from local community meetups to large-scale conferences.
                    </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        How to Get Started
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'text.primary' }}>
                        Ready to take your events to the next level? Sign up today and explore EventBazaar's features!
                    </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main' }}>
                        The Team Behind EventBazaar
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: 'background.paper' }}>
                            <Avatar alt="Kaptan Singh" src="/kaptan.jpeg" sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: 'primary.main' }}>Kaptan Singh</Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>Lead Developer</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
                                <Link href="https://www.linkedin.com/in/kaptan-singh-kp/" color="inherit" target="_blank" rel="noopener noreferrer">
                                    <LinkedIn sx={{ color: 'primary.main' }} />
                                </Link>
                                <Link href="https://github.com/kaptan-singh" color="inherit" target="_blank" rel="noopener noreferrer">
                                    <GitHub sx={{ color: 'primary.main' }} />
                                </Link>
                                <Link href="mailto:kaptan.singh5084@gmail.com" color="inherit" target="_blank" rel="noopener noreferrer">
                                    <Email sx={{ color: 'primary.main' }} />
                                </Link>
                            </Box>
                        </Paper>
                        {/* Add more team members here if needed */}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default About;
