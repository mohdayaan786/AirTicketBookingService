class AppError extends Error {
    constructor(
        name,
        message,
        explanation,
        statusCode
    ) {
        super();
        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
        this.explanation = explanation;
    }
}

module.exports = AppError;