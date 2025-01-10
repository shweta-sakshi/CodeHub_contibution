const mongoose = require("mongoose");

/**
 * @model User Schema.
 * All client user data is stored here.
 */
const userSchema = new mongoose.Schema({
    cfID: {
        type: String,
        required: true,
        min: 1,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    cfVerified: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);