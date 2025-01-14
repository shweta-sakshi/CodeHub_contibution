const Joi = require("joi");

const AsyncErrorHandler = require("../../ErrorHandlers/async_error_handler");
const Feedback = require("../../model/feedbackModel");

/**
 * @desc User feedback controller. submit feedback from clients.
 */
const UserFeedBack = AsyncErrorHandler(async (req, res, next) => {
    const { name, email, message } = req.body;

    //Input schema defined using Joi(validation library).
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        message: Joi.string().required(),
    });

    //Check if the input is valid.
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            error: error.details[0].message,
        });
    }

    //Create a new feedback.
    try {
        const newFeedback = await Feedback.create({
            name, email, message
        })

        await newFeedback.save();

        //Success Response
        res.status(200).json({ success: true, message: "Feedback submitted successfully" });
    } catch (error) {
        //Error response to custom Async error handler.
        next(error);
    }

});

module.exports = UserFeedBack;