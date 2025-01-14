
/**
 * Error class to handle errors.
 * @extends Error
 * @param {String} message - Error message.
 * @param {Number} statusCode - Error status code.
 * @returns {Errorhandler} An instance of Errorhandler.
*/

class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //this.constructor argument - Ensures the stack trace omits the constructor call and points to the actual error location.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = Errorhandler;