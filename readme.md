# AirTicketBookingService

## Overview
AirTicketBookingService is a backend service for managing flight ticket bookings. It handles operations like booking a flight, updating booking statuses, canceling reservations, and managing seat availability.

## Features
- Book a flight ticket
- Update booking status
- Cancel a booking and update seat availability
- Retrieve booking details

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (via Sequelize ORM)
- **External Services:** Axios (for API calls to Flight Service)
- **Error Handling:** Custom error classes (`AppError`, `ValidationError`)
- **Authentication & Security:** JWT (if applicable)

## Installation
### Prerequisites
- Node.js (>= 14.x)
- MySQL2

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/mohdayaan786/AirTicketBookingService.git
   cd AirTicketBookingService
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the `.env` file with the necessary environment variables:
   ```env
   DATABASE_URL=BOOKING_DB_DEV
   PORT = 3002
   FLIGHT_SERVICE_PATH='http://localhost:3000'
   ```
4. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### Booking
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/v1/bookings` | Create a new booking |
| GET | `/api/v1/bookings/:id` | Get booking details by ID |
| PATCH | `/api/v1/bookings/:id` | Update booking status |
| DELETE | `/api/v1/bookings/:id` | Cancel a booking |

## Error Handling
- Uses `AppError` for structured error responses.
- Returns appropriate HTTP status codes.

## Contributing
1. Fork the repo
2. Create a new feature branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -m "Added feature xyz"`)
4. Push and create a pull request

## License
This project is licensed under the MIT License.

