const ErrorHandler = require("./error_class")

/**
 * @function errorHandler
 * @desc This middleware handles all the errors that are thrown in the application.
 * @param {Object} err - The error object, default is set if err is null.
 * @returns {Object} - Returns the error message and status code.
 */

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path} [MongoDB]`;
    err = new Errorhandler(message, 400);
  }

  if (err.code === 1) {
    const message = `Internal Server Error [MongoDB]`;
    err = new Errorhandler(message, 500);
  }

  if (err.code === 8) {
    const message = `Unknown Error [MongoDB]`;
    err = new Errorhandler(message, 500);
  }

  if (err.name === "jsonWebTokenError") {
    const message = `Wrong JWT try again!`;
    err = new Errorhandler(message, 500);
  }

  if (err.name === "TokenExpiredError") {
    const message = `JWT has been expired!`;
    err = new Errorhandler(message, 500);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler;