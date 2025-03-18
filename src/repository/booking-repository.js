const { Booking } = require('../models/index');
const { StatusCodes } = require('http-status-codes');
const { AppError, ValidationError } = require('../utils/errors/index');
const { FlightServicePath } = require('../config/server-config');
const axios = require('axios');

class BookingRepository {
    async create(data) {
        try {
            return await Booking.create(data);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'Repository error',
                'An error occurred while creating the booking',
                'Booking creation error',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                throw new AppError(
                    'Repository error',
                    'No booking found with given ID',
                    'Booking not found',
                    StatusCodes.NOT_FOUND
                );
            }

            booking.status = data.status;
            if (data.status === 'Cancelled') {
                booking.totalCost = 0;
                const flightId = booking.flightId;
                const getFlightRequestUrl = `${FlightServicePath}/api/v1/flight/${flightId}`;
                const response = await axios.get(getFlightRequestUrl);
                const flightData = response.data.data;
                const updateFlightRequestUrl = `${FlightServicePath}/api/v1/flight/${flightId}`;
                const freeSeats = flightData.totalSeats + booking.noOfSeats;
                await axios.patch(updateFlightRequestUrl, { totalSeats: freeSeats });
            }
            await booking.save();
            return booking;

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'Repository error',
                'An error occurred while updating the booking',
                'Booking update error',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;
