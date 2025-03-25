const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    FlightServicePath: process.env.FLIGHT_SERVICE_PATH,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMAINDER_BINDING_KEY: process.env.REMAINDER_BINDING_KEY,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL
}
