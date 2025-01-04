import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import EventService from '../../services/EventService';

const validationSchema = Yup.object({
    quantity: Yup.number().min(1, 'Quantity should be at least 1').required('Quantity is required'),
    totalPrice: Yup.number().min(0, 'Total Price should be at least 0').required('Total Price is required'),
});

const BookTicket: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const initialQuantity = 1;
    const initialTotalPrice = 0;

    useEffect(() => {
        if (eventId) {
            if (!eventId || isNaN(Number(eventId))) {
                console.error('Invalid event ID');
                return;
            }
            console.log('Event ID from URL:', eventId);
        }
    }, [eventId]);

    const handleBookTicket = async (values: { quantity: number; totalPrice: number }) => {
        const ticketDto: TicketCreateRequest = {
            quantity: values.quantity,
            totalPrice: values.totalPrice,
        };

        try {
            const ticket = await EventService.bookEvent(Number(eventId), ticketDto);
            console.log('Ticket booked successfully:', ticket);
        } catch (error) {
            console.error('Error booking ticket:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Book Ticket
            </Typography>
            <Formik
                initialValues={{ quantity: initialQuantity, totalPrice: initialTotalPrice }}
                validationSchema={validationSchema}
                onSubmit={handleBookTicket}
            >
                {({ errors, touched, handleChange }) => (
                    <Form>
                        <Field
                            as={TextField}
                            label="Quantity"
                            type="number"
                            name="quantity"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            error={touched.quantity && Boolean(errors.quantity)}
                            helperText={touched.quantity && errors.quantity}
                        />
                        <Field
                            as={TextField}
                            label="Total Price"
                            type="number"
                            name="totalPrice"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            error={touched.totalPrice && Boolean(errors.totalPrice)}
                            helperText={touched.totalPrice && errors.totalPrice}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Book Ticket
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default BookTicket;