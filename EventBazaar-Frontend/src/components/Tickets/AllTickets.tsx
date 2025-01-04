import React, { useEffect, useState } from 'react';
import { Container, Box, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import styled from '@emotion/styled';
import TicketService from '../../services/TicketService';

const TicketCard = styled(Card)`
    margin: 16px;
`;

const AllTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const ticketsData = await TicketService.allTickets();
                setTickets(ticketsData);
            } catch (err) {
                setError('Failed to fetch tickets');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleCancel = async (ticketId: number) => {
        try {
            await TicketService.cancelTicket(ticketId);
            setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        } catch (err) {
            setError('Failed to cancel ticket');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                All Tickets
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {tickets.map((ticket) => (
                    <Box key={ticket.id} width={{ xs: '100%', sm: '48%', md: '30%' }} mb={2}>
                        <TicketCard>
                            <CardContent>
                                <Typography variant="h6">{ticket.event.title}</Typography>
                                <Typography>TicketId: {ticket.id}</Typography>
                                <Typography>Start Time: {ticket.event.startTime}</Typography>
                                <Typography>User: {ticket.user.firstName}</Typography>
                                <Typography>Quantity: {ticket.quantity}</Typography>
                                <Typography>Total Price: ${ticket.totalPrice}</Typography>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => handleCancel(ticket.id)}
                                >
                                    Cancel
                                </Button>
                            </CardContent>
                        </TicketCard>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default AllTickets;
