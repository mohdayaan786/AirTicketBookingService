const axios = require('axios');
const { BookingRepository } = require('../repository/index');
const { FlightServicePath } = require('../config/server-config');
const { ServiceError } = require('../utils/errors/index');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestUrl = `${FlightServicePath}/api/v1/flight/${flightId}`;
            const response = await axios.get(getFlightRequestUrl);
            const flightData = response.data.data;
            console.log("FLIGHT DATA FETCHED:", flightData);
            let priceoftheflight = flightData.price;
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError(
                    'Service error',
                    'No of seats requested are more than available seats',
                    'Seats not available',
                    400
                );
            }
            const totalCost = priceoftheflight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestUrl = `${FlightServicePath}/api/v1/flight/${flightId}`;
            const remainingSeats = flightData.totalSeats - booking.noOfSeats; // 396 - 2 = 394
            console.log("REMAINING SEATS:", remainingSeats);
            await axios.patch(updateFlightRequestUrl, { totalSeats: flightData.totalSeats - booking.noOfSeats })
            const updatedBooking = await this.bookingRepository.update(Number(booking.id), { status: 'Completed' });
            return updatedBooking;

        } catch (error) {
            console.error("Error occurred in createBooking:", error.message);

            throw new ServiceError(
                'Service error',
                'An error occurred during the booking process',
                error.message || 'Booking process failed',
                error.response?.status || 500
            );

        }
    }
}

module.exports = BookingService;
