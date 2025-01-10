const mongoose = require("mongoose");

/**
 * @desc Codeforces Verification Schema.
 * codeforces verification requests are stored here until they expire.
 */
const cfVerificationRequestSchema = new mongoose.Schema({
    cfID: { type: String, required: true },
    problemID: { type: String, required: true }, 
    requestTime: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10000,
    },
});

module.exports = mongoose.model(
    "CfVerificationRequestToken",
    cfVerificationRequestSchema);