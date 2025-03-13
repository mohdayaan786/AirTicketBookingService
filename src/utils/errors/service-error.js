const { statusCodes } = require('http-status-codes');

class ServiceError extends Error {
    constructor(
        message = 'An error occurred while processing your request',
        explanation = 'Service layer error',
        statusCode = statusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = 'ServiceError';
        this.statusCode = statusCode;
        this.message = message;
        this.explanation = explanation;
    }
}

module.exports = ServiceError;