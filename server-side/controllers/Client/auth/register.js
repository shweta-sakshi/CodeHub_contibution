const bcrypt = require('bcrypt');
const Joi = require('joi');
const axios = require("axios");

const AsyncErrorHandler = require("../../../ErrorHandlers/async_error_handler");
const utils = require("../../../utils/auth/auth.utils")
const SendEmail = require("../../../utils/auth/sendEmail")
const User = require("../../../model/userModel");
const VerificationToken = require("../../../model/verificationTokenModel");

/**
 * @desc Register controller for client.
 * @purpose
 *        -Register a new user and send verification email.
 *        -Verify the authenticity of codeforces ID.
 *        -Delete existing user if email is not verified and create a new entry.
 */
const Register = AsyncErrorHandler(async (req, res, next) => {
    // Input schema defined using Joi(validation library).
    const schema = Joi.object({
        username: Joi.string().required(),
        cfID: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    // check if the input is valid.
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: "Invalid input", error: error.details[0].message });

    const { username, cfID, email, password } = req.body;

    try {

        //Check authenticity of codeforces ID.
        try {
            const cfResponse = await axios.get(` https://codeforces.com/api/user.info?handles=${cfID}`)
            if (!cfResponse.data || cfResponse.data.status !== 'OK') {
                return res.status(400).json({ success: false, message: "Invalid codeforces ID" });
            }
        } catch (error) {
            if (error.response.data.status === "FAILED") {
                return res.status(400).json({ success: false, message: "Invalid codeforces ID" });
            }
            return res.status(500).json({ success: false, message: "An error occurred while verifying codeforces ID" });
        }

        //Check if the user already exists in database .
        const existingUser = await User.findOne({ $or: [{ email }, { cfID }, { username }] });
        if (existingUser && !existingUser.emailVerified) {
            //Delete user and verification token from database if user email is not verified.
            await User.deleteOne({ _id: existingUser._id });
            await VerificationToken.deleteOne({ email: existingUser.email });
        }
        else if (existingUser && existingUser.cfVerified) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        //Hash the password.
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        let user = {
            username,
            cfID,
            email,
            password: hashedPassword
        };
        const newUser = new User(user);
        await newUser.save(); //Save user to database.

        //Generate Verification tokens(OTP).
        const verificationCode = utils.generateVerificationCode();

        //Create a new entry in verification token model.
        const token = new VerificationToken({
            email: email,
            code: verificationCode
        })
        await token.save();

        // create email content for verification email.
        const subject = "Email Verification";
        const text = utils.createVerificationEmail({ verificationCode, subject });

        //Send email
        await SendEmail(email, subject, text);

        //Send response to client
        res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify your codeforces Id",
            emailVerified: false
        })
    } catch (error) {
        //Error response to custom Async error handler.
        next(error);
    }
});

module.exports = Register;
