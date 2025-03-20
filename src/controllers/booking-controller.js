const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const { createChannel, publishMessage } = require('../utils/message-queue');
const { REMAINDER_BINDING_KEY } = require('../config/server-config');

const bookingService = new BookingService();

class BookingController {

    constructor() {
       
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const data = {message : 'success'};
        publishMessage(channel, REMAINDER_BINDING_KEY, JSON.stringify(data));
        res.status(StatusCodes.OK).json({
            data: {},
            message: 'Message sent to queue',
            success: true,
            err: {}
        });
    }

    async create(req, res) {
        console.log('REQ.BODY:', req.body);
        try {
            const response = await bookingService.createBooking(req.body);

            console.log("From Booking Controller ", response);
            res.status(StatusCodes.CREATED).json({
                data: response.data,
                message: 'Booking created successfully',
                success: true,
                err: {}
            });
        } catch (error) {
            console.log("From Booking Controller ", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                message: 'Failed to create booking',
                success: false,
                err: error.message || error
            });
        }
    }

    async update(req, res) {
        try {
            const response = await bookingService.updateBooking(req.params.id, req.body);
            res.status(StatusCodes.OK).json({
                data: response.data,
                message: 'Booking updated successfully',
                success: true,
                err: {}
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                message: 'Failed to update booking',
                success: false,
                err: error.message || error
            });
        }
    }

}

module.exports = BookingController;
