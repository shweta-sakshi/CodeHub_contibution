const mongoose = require("mongoose");

/**
 * @desc Client Session Schema. keep track of client session.
 */
const clientSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cookieID: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("ClientSessions", clientSessionSchema);