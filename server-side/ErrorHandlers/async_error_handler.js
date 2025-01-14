/**
 * Asynchronous error handler middleware.
 * Wraps an asynchronous function and catches any errors, passing them to the next middleware.
 *
 * @param {Function} theFunc - The asynchronous function to be wrapped.
 * @returns {Function} A function that handles the request, response, and next middleware.
 */

const AsyncErrorHandler = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};

module.exports = AsyncErrorHandler;
