import React from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import EventService from '../../services/EventService';

const categories = [
    'CONCERT', 'CONFERENCE', 'MUSIC', 'SPORTS', 'ART', 'EDUCATION', 'ENTERTAINMENT', 'FOOD', 'TECHNOLOGY', 'TRAVEL', 'CHARITY', 'BUSINESS', 'WORKSHOP', 'SEMINAR', 'FESTIVAL', 'EXHIBITION', 'THEATER', 'NETWORKING', 'PARTY', 'COMPETITION', 'FUNDRAISER', 'WEBINAR', 'OTHER'
];

const CreateEvent: React.FC = () => {
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        location: Yup.string().required('Location is required'),
        startTime: Yup.date().required('Start Time is required'),
        category: Yup.string().required('Category is required'),
        endTime: Yup.date(),
        contact: Yup.string().required('Contact is required'),
        quantity: Yup.number().min(1, 'Quantity should be at least 1').required('Quantity is required'),
        price: Yup.number().required('Price is required'),
        imageUrl: Yup.string().url('Invalid URL'),
        status: Yup.string().required('Status is required'),
    });

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create Event
            </Typography>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    location: '',
                    startTime: '',
                    endTime: '',
                    contact: '',
                    quantity: 0,
                    price: 0,
                    imageUrl: '',
                    category: '',
                    status: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        const eventData = {
                            ...values,
                            quantity: Number(values.quantity),
                            price: Number(values.price),
                        };
                        await EventService.createEvent(eventData);
                        alert('Event created successfully');
                        resetForm();
                    } catch (error) {
                        alert('Failed to create event');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                    <Form>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="title"
                                label="Title"
                                fullWidth
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="description"
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="location"
                                label="Location"
                                fullWidth
                                error={touched.location && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="startTime"
                                label="Start Time"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={touched.startTime && Boolean(errors.startTime)}
                                helperText={touched.startTime && errors.startTime}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="endTime"
                                label="End Time"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={touched.endTime && Boolean(errors.endTime)}
                                helperText={touched.endTime && errors.endTime}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="contact"
                                label="Contact"
                                fullWidth
                                error={touched.contact && Boolean(errors.contact)}
                                helperText={touched.contact && errors.contact}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="quantity"
                                label="Quantity"
                                type="number"
                                fullWidth
                                error={touched.quantity && Boolean(errors.quantity)}
                                helperText={touched.quantity && errors.quantity}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="price"
                                label="Price"
                                type="number"
                                fullWidth
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                name="imageUrl"
                                label="Image URL"
                                fullWidth
                                error={touched.imageUrl && Boolean(errors.imageUrl)}
                                helperText={touched.imageUrl && errors.imageUrl}
                            />
                        </Box>
                        <Box mb={2}>
                            <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                                <InputLabel>Category</InputLabel>
                                <Field
                                    as={Select}
                                    name="category"
                                    label="Category"
                                    value={values.category}
                                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                                        setFieldValue('category', e.target.value);
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Field>
                                {touched.category && errors.category && <Typography color="error">{errors.category}</Typography>}
                            </FormControl>
                        </Box>
                        <Box mb={2}>
                            <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                                <InputLabel>Status</InputLabel>
                                <Field
                                    as={Select}
                                    name="status"
                                    label="Status"
                                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => setFieldValue('status', e.target.value)}
                                >
                                    <MenuItem value="UPCOMING">Upcoming</MenuItem>
                                    <MenuItem value="ONGOING">Ongoing</MenuItem>
                                    <MenuItem value="COMPLETED">Completed</MenuItem>
                                    <MenuItem value="RESCHEDULED">Rescheduled</MenuItem>
                                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                                </Field>
                                {touched.status && errors.status && <Typography color="error">{errors.status}</Typography>}
                            </FormControl>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Create Event
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default CreateEvent;
