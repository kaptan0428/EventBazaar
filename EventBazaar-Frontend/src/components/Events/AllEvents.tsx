import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import EventService from '../../services/EventService';

const AllEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventData = await EventService.getEvents();
                setEvents(eventData);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

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
                    All Events
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.title}</TableCell>
                                    <TableCell>{event.description}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.startTime} - {event.endTime}</TableCell>
                                    <TableCell>{event.quantity}</TableCell>
                                    <TableCell>{event.price}</TableCell>
                                    <TableCell>{event.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default AllEvents;