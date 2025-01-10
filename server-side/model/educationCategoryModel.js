const mongoose = require("mongoose");

/**
 * @desc Education Category Schema.
 * All educational categories are stored here.
 */
const educationCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true,
    }
});

module.exports = mongoose.model("EducationCategories", educationCategorySchema);