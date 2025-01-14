const mongoose = require("mongoose");

/**
 * @desc Notice Schema.
 * Stores all notices created by the admin.
 */
const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
    },
    body: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Notices", noticeSchema);