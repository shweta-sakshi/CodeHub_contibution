const mongoose = require("mongoose");

/**
 * @model Verification Token Schema.
 * @desc Verification tokens are stored here until they expire.
 */
const VerificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject:{
    type: String,
    required: true,
    default: "Email Verification",
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10000,
  },
});

const VerificationToken = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema
);

module.exports = VerificationToken;