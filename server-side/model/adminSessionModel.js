const mongoose = require("mongoose");

/**
 * @desc Admin Session Schema. keep track of admin session.
 */
const adminSessionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        max: 50,
        unique: true,
    },
    cookieID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("AdminSessions", adminSessionSchema);