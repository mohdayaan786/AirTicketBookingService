const { statusCodes } = require('http-status-codes');

class ServiceError extends Error {
    constructor(
        name = 'ServiceError',
        message = 'An error occurred while processing your request',
        explanation = 'Service layer error',
        statusCode = statusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
        this.explanation = explanation;
    }
}

module.exports = ServiceError;
