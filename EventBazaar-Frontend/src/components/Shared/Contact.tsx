
import React from 'react';
import { Container, Typography, Box, TextField, Button, Link } from '@mui/material';
import { LinkedIn, GitHub, Email, Facebook, Twitter, Instagram } from '@mui/icons-material';

const Contact: React.FC = () => {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" component="p">
                    Have questions or need support? Feel free to reach out to us using the form below or through our social media channels.
                </Typography>
                
                <Box component="form" sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ flex: '1 1 100%', flexBasis: { xs: '100%', sm: '48%' } }}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 100%', flexBasis: { xs: '100%', sm: '48%' } }}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 100%' }}>
                            <TextField
                                required
                                fullWidth
                                id="message"
                                label="Message"
                                name="message"
                                multiline
                                rows={4}
                            />
                        </Box>
                        <Box sx={{ flex: '1 1 100%' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Send Message
                            </Button>
                        </Box>
                    </Box>
                </Box>
                
                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                    Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link href="#" color="inherit" target="_blank" rel="noopener noreferrer">
                        <Facebook fontSize="large" />
                    </Link>
                    <Link href="#" color="inherit" target="_blank" rel="noopener noreferrer">
                        <Twitter fontSize="large" />
                    </Link>
                    <Link href="https://www.instagram.com/eventbazaar.app/" color="inherit" target="_blank" rel="noopener noreferrer">
                        <Instagram fontSize="large" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/kaptan-singh-kp/" color="inherit" target="_blank" rel="noopener noreferrer">
                        <LinkedIn fontSize="large" />
                    </Link>
                    <Link href="https://github.com/kaptan-singh" color="inherit" target="_blank" rel="noopener noreferrer">
                        <GitHub fontSize="large" />
                    </Link>
                    <Link href="mailto:support@eventbazaar.com" color="inherit" target="_blank" rel="noopener noreferrer">
                        <Email fontSize="large" />
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Contact;