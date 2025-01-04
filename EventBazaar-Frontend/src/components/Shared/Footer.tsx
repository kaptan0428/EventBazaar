import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#2D4059;',
                color: 'white',
                py: 1,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2">
                        © {new Date().getFullYear()} EventBazaar. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link href="#" color="inherit" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon fontSize="small" />
                        </Link>
                        <Link href="#" color="inherit" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon fontSize="small" />
                        </Link>
                        <Link href="#" color="inherit" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon fontSize="small" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/kaptan-singh-kp/" color="inherit" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon fontSize="small" />
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
