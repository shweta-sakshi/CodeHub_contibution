const nodemailer = require("nodemailer")

/**
 * @desc Send Email function.
 */
async function SendEmail(to, subject, text) {

    // Create a transporter object using the default SMTP transport.
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSCODE,
        },
    });

    // Create mail options object to send email with the given information.
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: text, // html body
    };

    try {
        // Send email.
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email: " + error);
    }
}

module.exports = SendEmail;
