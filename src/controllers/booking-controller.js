const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');

const bookingService = new BookingService();

const create = async (req, res) => {
    console.log('REQ.BODY:', req.body);
    try {
        const response = await bookingService.createBooking(req.body);
        
        console.log("From Booking Controller ",response);
        res.status(StatusCodes.CREATED).json({
            data: response.data,
            message: 'Booking created successfully',
            success: true,
            err: {}
        });
    } catch (error) {
        console.log("From Booking Controller ",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            message: 'Failed to create booking',
            success: false,
            err: error.message || error
        });
    }
    
}

module.exports = {
    create
};
