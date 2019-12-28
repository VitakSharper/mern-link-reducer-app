const AppError = require('../utils/appError');

const handleCastErrorDb = err => {
    const message = `Invalid ${err.path}: ${err.value}!`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value : ${value} Please use another value!`;
    return new AppError(message, 400);
};
const handleValidationErrorDb = err => {
    const errors = Object.values(err.errors).map(e => e.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const handleJsonWebTokenError = () =>
    new AppError('Invalid token. Please log in again!', 401);
const handleTokenExpiredError = () =>
    new AppError('Your session is expired! Please log in again!', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        // Programming or other unknown error: don't leak error details
    } else {
        // Log error
        console.error('ERROR ༼ つ ◕_◕ ༽つ', err);
        // Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);

    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err};

        if (error.name === 'CastError') error = handleCastErrorDb(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDb(error);
        if (error.name === 'JsonWebTokenError') error = handleJsonWebTokenError();
        if (error.name === 'TokenExpiredError') error = handleTokenExpiredError();

        sendErrorProd(error, res);
    }
};
