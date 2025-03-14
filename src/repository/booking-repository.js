const {Booking} = require('../models/index');
const {statusCodes} = require('http-status-codes');
const {AppError, ValidationError} = require('../utils/errors/index');

class BookingRepository {
    async create(data){
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
                statusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(data){
        try {
            return await Booking.update(data, {where : {id : data.id}});
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'Repository error',
                'An error occurred while updating the booking', 
                'Booking update error', 
                statusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository; 