const express = require('express');
const router = express.Router();
const { BookingController } = require('../../controllers/index');
const { updateValidator, createValidator } = require('../../middlewares/index');
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

router.get(
    '/check',
    (req, res) => {
        res.status(200).send('Booking Service is healthy');
    }
);

module.exports = router;