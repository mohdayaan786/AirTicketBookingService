const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    FlightServicePath : process.env.FLIGHT_SERVICE_PATH,
}
