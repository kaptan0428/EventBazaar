import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../../services/EventService';
import { Container, Typography, CircularProgress, Alert, Card, CardMedia, CardContent, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const categories = [
    'CONCERT', 'CONFERENCE', 'MUSIC', 'SPORTS', 'ART', 'EDUCATION', 'ENTERTAINMENT', 'FOOD', 'TECHNOLOGY', 'TRAVEL', 'CHARITY', 'BUSINESS', 'WORKSHOP', 'SEMINAR', 'FESTIVAL', 'EXHIBITION', 'THEATER', 'NETWORKING', 'PARTY', 'COMPETITION', 'FUNDRAISER', 'WEBINAR', 'OTHER'
];

const formatDateTimeLocal = (dateTime: string) => {
    const date = new Date(dateTime);
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    location: Yup.string().required('Location is required'),
    startTime: Yup.date().required('Start Time is required'),
    category: Yup.string().required('Category is required'),
    endTime: Yup.date(),
    contact: Yup.string().length(10, 'Contact must be exactly 10 digits').required('Contact is required'),
    quantity: Yup.number().min(1, 'Quantity should be at least 1').required('Quantity is required'),
    price: Yup.number().required('Price is required'),
    imageUrl: Yup.string().url('Invalid URL'),
    status: Yup.string().required('Status is required'),
});

const Event: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const fetchedEvent = await EventService.getEventById(Number(eventId));
                setEvent(fetchedEvent);
            } catch (err) {
                setError('Failed to fetch event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleUpdateEvent = async (values: Event) => {
        if (event) {
            try {
                await EventService.updateEvent({ ...event, ...values });
                setEvent({ ...event, ...values });
                setIsEditing(false);
            } catch (err) {
                setError('Failed to update event.');
            }
        }
    };

    const handleDeleteEvent = async () => {
        if (event) {
            try {
                await EventService.deleteEvent(event.id);
                navigate('/');
            } catch (err) {
                setError('Failed to delete event.');
            }
        }
    };
    const handleBookTicket = () => {
        navigate(`/events/${eventId}/book`);
    };

    if (loading) {
        return (
            <Container sx={{ mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!event) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="warning">No event found.</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Card sx={{ boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={event.imageUrl}
                    alt={event.title}
                />
                <CardContent>
                    {isEditing ? (
                        <Formik
                            initialValues={{
                                title: event.title || '',
                                description: event.description || '',
                                location: event.location || '',
                                startTime: formatDateTimeLocal(event.startTime) || '',
                                endTime: formatDateTimeLocal(event.endTime) || '',
                                contact: event.contact || '',
                                quantity: event.quantity || 0,
                                price: event.price || 0,
                                imageUrl: event.imageUrl || '',
                                category: event.category || '',
                                status: event.status || ''
                            } as Event}
                            validationSchema={validationSchema}
                            onSubmit={handleUpdateEvent}
                        >
                            {({ values, handleChange, errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        label="Title"
                                        fullWidth
                                        margin="normal"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        error={touched.title && Boolean(errors.title)}
                                        helperText={touched.title && errors.title}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Description"
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        rows={4}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        error={touched.description && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Location"
                                        fullWidth
                                        margin="normal"
                                        name="location"
                                        value={values.location}
                                        onChange={handleChange}
                                        error={touched.location && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Start Time"
                                        fullWidth
                                        margin="normal"
                                        name="startTime"
                                        type="datetime-local"
                                        value={values.startTime}
                                        onChange={handleChange}
                                        error={touched.startTime && Boolean(errors.startTime)}
                                        helperText={touched.startTime && errors.startTime}
                                    />
                                    <Field
                                        as={TextField}
                                        label="End Time"
                                        fullWidth
                                        margin="normal"
                                        name="endTime"
                                        type="datetime-local"
                                        value={values.endTime}
                                        onChange={handleChange}
                                        error={touched.endTime && Boolean(errors.endTime)}
                                        helperText={touched.endTime && errors.endTime}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Contact"
                                        fullWidth
                                        margin="normal"
                                        name="contact"
                                        value={values.contact}
                                        onChange={handleChange}
                                        error={touched.contact && Boolean(errors.contact)}
                                        helperText={touched.contact && errors.contact}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Quantity"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        name="quantity"
                                        value={values.quantity}
                                        onChange={handleChange}
                                        error={touched.quantity && Boolean(errors.quantity)}
                                        helperText={touched.quantity && errors.quantity}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Price"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        error={touched.price && Boolean(errors.price)}
                                        helperText={touched.price && errors.price}
                                    />
                                    <Field
                                        as={TextField}
                                        label="Image URL"
                                        fullWidth
                                        margin="normal"
                                        name="imageUrl"
                                        value={values.imageUrl}
                                        onChange={handleChange}
                                        error={touched.imageUrl && Boolean(errors.imageUrl)}
                                        helperText={touched.imageUrl && errors.imageUrl}
                                    />
                                    <FormControl fullWidth margin="normal" error={touched.category && Boolean(errors.category)}>
                                        <InputLabel>Category</InputLabel>
                                        <Field
                                            as={Select}
                                            name="category"
                                            value={values.category}
                                            onChange={handleChange}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {touched.category && errors.category && <Typography color="error">{errors.category}</Typography>}
                                    </FormControl>
                                    <FormControl fullWidth margin="normal" error={touched.status && Boolean(errors.status)}>
                                        <InputLabel>Status</InputLabel>
                                        <Field
                                            as={Select}
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="UPCOMING">Upcoming</MenuItem>
                                            <MenuItem value="ONGOING">Ongoing</MenuItem>
                                            <MenuItem value="COMPLETED">Completed</MenuItem>
                                            <MenuItem value="RESCHEDULED">Rescheduled</MenuItem>
                                            <MenuItem value="CANCELLED">Cancelled</MenuItem>
                                        </Field>
                                        {touched.status && errors.status && <Typography color="error">{errors.status}</Typography>}
                                    </FormControl>
                                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)} sx={{ mt: 2, ml: 2 }}>
                                        Cancel
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <Typography variant="h3" component="div" gutterBottom>
                                {event.title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" paragraph>
                                {event.description}
                            </Typography>
                            <Box display="flex" flexWrap="wrap" mt={2}>
                                <Box flex="1 1 50%" mb={2}>
                                    <Typography variant="body1"><strong>Location:</strong> {event.location}</Typography>
                                    <Typography variant="body1"><strong>Time:</strong> {event.startTime} - {event.endTime}</Typography>
                                </Box>
                                <Box flex="1 1 50%" mb={2}>
                                    <Typography variant="body1"><strong>Contact:</strong> {event.contact}</Typography>
                                    <Typography variant="body1"><strong>Quantity:</strong> {event.quantity}</Typography>
                                    <Typography variant="body1"><strong>Price:</strong> ${event.price}</Typography>
                                    <Typography variant="body1"><strong>Category:</strong> {event.category}</Typography>
                                    <Typography variant="body1"><strong>Status:</strong> {event.status}</Typography>
                                </Box>
                            </Box>
                            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
                                Update Event
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleDeleteEvent} sx={{ mt: 2, ml: 2 }}>
                                Delete Event
                            </Button>
                            <Button variant="contained" color="success" onClick={handleBookTicket} sx={{ mt: 2, ml: 2 }}>
                                Book Ticket
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Event;