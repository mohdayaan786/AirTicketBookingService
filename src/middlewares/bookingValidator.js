const updateValidator = (req, res, next) => {
    if (!req.body.status) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'status is required',
            err: {}
        });
    }
    next();
}

const createValidator = (req, res, next) => {
    if (!req.body.flightId || !req.body.userId || !req.body.noOfSeats) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'flightId, userId and noOfSeats are required',
            err: {}
        });
    }
    next();
}

module.exports = {
    updateValidator,
    createValidator
};