const express = require('express');
const router = express.Router();
const { BookingController } = require('../../controllers/index');
const {updateValidator, createValidator} = require('../../middlewares/index');


router.post(
    '/bookings', 
    createValidator.createValidator,
    BookingController.create
);
router.patch(
    '/bookings/:id', 
    updateValidator.updateValidator,
    BookingController.update
);

module.exports = router;