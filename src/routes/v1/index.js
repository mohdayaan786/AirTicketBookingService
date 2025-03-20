const express = require('express');
const router = express.Router();
const {BookingController}  = require('../../controllers/index');
const {updateValidator, createValidator} = require('../../middlewares/index');
// const {createChannel} = require('../../utils/message-queue');

// const channel = await createChannel();
const bookingController = new BookingController();


router.post(
    '/bookings', 
    createValidator.createValidator,
    bookingController.create
);
router.patch(
    '/bookings/:id', 
    updateValidator.updateValidator,
    bookingController.update
);
router.post(
    '/publish',
    bookingController.sendMessageToQueue
);

module.exports = router;