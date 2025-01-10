const mongoose = require("mongoose");

/**
 * @desc Feedback Schema.
 * All feedback given by client is stored here.
 */
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
    },
    message: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);