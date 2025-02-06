// error.middleware.js
const ApiError = require('./api.error');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.httpStatusCode).json({
            status: "error",
            name: err.name,
            message: err.message,
            optional: err.isOptional
        });
    }
    // to work with unexpected errors
    return res.status(500).json({
        status: "error",
        name: "InternalServerError",
        message: "Something went wrong!",
    });
    next();
};

module.exports = errorHandler;
// to use it you just after all routes and before app.listen write this (app.use(errorhandler)) don't forget require it :
// const errorhandler = require('./errorHandler');